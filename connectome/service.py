"""Read-only, bounded HTTP query engine over an independently validated SQLite import.

All FlyWire root IDs are serialized as STRINGS (they exceed JS's safe integer range).
No endpoint interprets a missing, incomplete or failed import as a complete brain.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import re
import sqlite3
import time
from urllib.parse import parse_qs

from . import portable

DEFAULT_DB = Path(__file__).resolve().parent.parent / "data" / "connectome.sqlite"
MAX_PAGE = 100
MAX_OFFSET = 1000000
MAX_TRACE_EDGES = 500000
MAX_TRACE_NODES = 80000


class QueryError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status


def db_path():
    return Path(os.getenv("NEUROML_DB_PATH", str(DEFAULT_DB))).resolve()


def portable_mode():
    # An explicit NEUROML_DB_PATH always wins, even when it is missing: a broken
    # override must not silently fall back to a different reconstruction.
    return ("NEUROML_DB_PATH" not in os.environ and portable.available() and
            (os.getenv("NEUROML_FORCE_PORTABLE") == "1" or not DEFAULT_DB.is_file()))


def connect():
    if portable_mode():
        try:
            path = portable.metadata_path()
        except (OSError, ValueError, KeyError) as exc:
            raise QueryError(503, f"Validated portable connectome cannot be loaded: {exc}") from exc
    else:
        path = db_path()
    if not path.is_file():
        raise QueryError(503, "No validated connectome database is configured. Import the pinned v783 source files first.")
    db = sqlite3.connect(f"file:{path}?mode=ro", uri=True, timeout=10)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA query_only=ON")
    db.execute("PRAGMA busy_timeout=10000")
    return db


def meta(db, key):
    row = db.execute("SELECT value FROM meta WHERE key=?", (key,)).fetchone()
    data = json.loads(row[0]) if row else None
    if data and key in ("integrity", "manifest") and not portable_mode() and portable.available():
        # The local 1.55 GB import predates the separately audited official
        # index. Report the crosscheck only when its *verified* package has
        # exactly the same imported pair fingerprint, roster and checksum-
        # verified source. Do not mutate or silently substitute the local DB.
        try:
            audited = portable.manifest()["crosscheck"]
            source = data if key == "integrity" else json.loads(db.execute(
                "SELECT value FROM meta WHERE key='integrity'").fetchone()[0])
            if (audited["matched"] and source["validated"] and source["source_files_checksum_verified"] and
                    source["imported_record_fingerprint"] == audited["record_fingerprint"] and
                    source["directed_pairs"] == audited["matched_directed_pairs"] and
                    source["imported_neurons"] == audited["matched_neurons"]):
                data["official_pair_asset_crosscheck"] = audited
                if key == "integrity":
                    data["scope"] = "Checksum-verified v783 pair import independently matched to the official-derived pair index; neuropil attribution remains a partial Codex subset"
                else:
                    data["source_note"] = "Checksum-verified Shiu v783 all-pair table crosschecked record-for-record against the official-Zenodo-derived pair index. Neuropil attribution is partial Codex coverage, not the full Zenodo neuropil table."
        except (OSError, ValueError, KeyError, sqlite3.Error):
            pass  # A failed optional comparison cannot invalidate a separate validated local import.
    return data


def parameter(q, name, default=None):
    return q.get(name, [default])[0]


def number(q, name, default, low, high):
    raw = parameter(q, name, default)
    try:
        value = int(raw)
    except (ValueError, TypeError):
        raise QueryError(400, f"{name} must be an integer")
    if not low <= value <= high:
        raise QueryError(400, f"{name} must be between {low} and {high}")
    return value


def root_id(q, name):
    raw = str(parameter(q, name, ""))
    if not re.fullmatch(r"[0-9]{1,19}", raw) or int(raw) > 2**63 - 1:
        raise QueryError(400, f"{name} must be a valid decimal FlyWire root ID")
    return int(raw)


def require_neuron(db, id_):
    row = db.execute("SELECT root_id FROM neurons WHERE root_id=?", (id_,)).fetchone()
    if not row:
        raise QueryError(404, f"Neuron {id_} is not in this dataset")


def status():
    path = db_path()
    packaged = portable_mode()
    progress = None
    state_file = path.parent / "import_status.json"
    if not packaged and state_file.is_file():
        try:
            progress = json.loads(state_file.read_text(encoding="utf-8"))
        except (ValueError, OSError):
            progress = {"stage": "failed", "error": "Import status file could not be read"}
    active = None
    if path.is_file() or packaged:
        try:
            with connect() as db:
                integrity = meta(db, "integrity")
                manifest = meta(db, "manifest")
                if integrity and manifest and integrity.get("validated"):
                    active = {"stage": "ready", "validated": True,
                              "canonical_zenodo_verified": integrity.get("canonical_zenodo_verified", False),
                              "official_pair_asset_crosschecked": bool(integrity.get("official_pair_asset_crosscheck", {}).get("matched")),
                              "source_file_complete": manifest.get("source_file_completeness", False),
                              "mode": manifest.get("mode"), "storage": "portable-index" if packaged else "sqlite",
                              "imported_at": manifest.get("imported_at"),
                              "neurons": integrity["imported_neurons"],
                              "directed_pairs": integrity["directed_pairs"]}
        except (sqlite3.Error, QueryError):
            progress = {"stage": "failed", "error": "Active dataset cannot be read or has not been validated"}
    return {"stage": progress["stage"] if progress and progress.get("stage") not in ("ready",) else
                     ("ready" if active else "not_configured"),
            "active": active, "pending": progress if progress and progress.get("stage") not in ("ready",) else None,
            "configured": active is not None}


def serialize_neuron(row):
    d = dict(row)
    d["id"] = str(d.pop("root_id"))
    d.pop("idx", None)
    return d


def neuron(db, q):
    id_ = root_id(q, "id")
    row = db.execute("SELECT n.*,d.in_degree,d.out_degree,d.in_synapses,d.out_synapses "
                     "FROM neurons n JOIN degrees d USING(root_id) WHERE n.root_id=?", (id_,)).fetchone()
    if not row:
        raise QueryError(404, f"Neuron {id_} is not in this dataset")
    d = serialize_neuron(row)
    d["neuropils"] = [dict(region=r[0], presynaptic_contacts=r[1], postsynaptic_contacts=r[2])
                       for r in db.execute("SELECT region,pre_syn,post_syn FROM neuron_regions "
                                           "WHERE root_id=? ORDER BY pre_syn+post_syn DESC", (id_,))]
    d["presynaptic_sites"] = None  # pairwise contacts are NOT equivalent to presynaptic sites
    d["postsynaptic_sites"] = None
    swc_dir = os.getenv("NEUROML_SWC_DIR")
    d["morphology_available"] = bool(swc_dir and (Path(swc_dir) / f"{id_}.swc").is_file())
    d["provenance"] = {"neuron": "Codex v783 neuron record + classification / Schlegel et al. annotations",
                       "connections": meta(db, "manifest")["source_note"],
                       "coordinates": d["position_source"],
                       "nt": "Source-provided neurotransmitter prediction, not an experimentally confirmed transmitter" if d["nt_type"] else None}
    return d


def morphology(db, q):
    id_ = root_id(q, "id")
    require_neuron(db, id_)
    folder = os.getenv("NEUROML_SWC_DIR")
    path = Path(folder) / f"{id_}.swc" if folder else None
    if not path or not path.is_file():
        return {"id": str(id_), "available": False,
                "reason": "Skeleton morphology is not provided by the imported connectivity/annotation tables. No version-matched SWC is configured."}
    segments = []
    nodes = {}
    with path.open(encoding="utf-8") as f:
        for line in f:
            if line.lstrip().startswith("#") or not line.strip():
                continue
            parts = line.split()
            if len(parts) < 7:
                raise QueryError(422, "Invalid SWC record; refusing to show malformed morphology")
            try:
                node, parent = int(parts[0]), int(parts[6])
                xyz = tuple(float(v) for v in parts[2:5])
                if node in nodes:
                    raise ValueError("duplicate SWC node")
            except ValueError:
                raise QueryError(422, "Invalid SWC coordinates or duplicate node")
            nodes[node] = (xyz, parent)
            if len(nodes) > 100000:
                raise QueryError(413, "SWC has more than 100,000 vertices; do not truncate its morphology")
    for xyz, parent in nodes.values():
        if parent >= 0:
            if parent not in nodes:
                raise QueryError(422, "SWC has a missing parent vertex")
            segments.append([list(nodes[parent][0]), list(xyz)])
    return {"id": str(id_), "available": True, "segments": segments,
            "units": os.getenv("NEUROML_SWC_UNITS", "source SWC units (operator must document)"),
            "provenance": "Operator-supplied, version-matched SWC file; not part of the FlyWire pair table"}


def list_neurons(db, q):
    limit = number(q, "limit", 25, 1, MAX_PAGE)
    page = number(q, "page", 1, 1, MAX_OFFSET // limit)
    query = (parameter(q, "q", "") or "").strip()[:120]
    where, args, joins, prefix = [], [], "", ""
    if query:
        if query.isdecimal() and len(query) > 13:
            if int(query) > 2**63 - 1:
                raise QueryError(400, "q is larger than the supported root-ID range")
            where.append("n.root_id=?")
            args.append(int(query))
        else:
            tokens = re.findall(r"[\w]+", query, flags=re.UNICODE)
            if not tokens:
                return {"total": 0, "page": page, "limit": limit, "results": []}
            # SQLite otherwise chooses degree_out as the outer loop and executes an
            # FTS lookup *for every neuron* (~100 seconds for a common query).
            # Materializing the FTS hits first makes typeahead proportional to hits.
            prefix = "WITH matched AS MATERIALIZED (SELECT rowid-1 idx FROM neurons_fts WHERE neurons_fts MATCH ?) "
            joins += " JOIN matched m ON m.idx=n.idx"
            args.append(" ".join('"' + token.replace('"', '') + '"*' for token in tokens[:8]))
    filters = {"class": "super_class", "cell_type": "cell_type", "side": "side",
               "group": "group_name", "flow": "flow"}
    for key, col in filters.items():
        val = parameter(q, key)
        if val:
            if len(val) > 120:
                raise QueryError(400, f"{key} filter is too long")
            where.append(f"n.{col}=?")
            args.append(val)
    region = parameter(q, "region")
    if region:
        where.append("EXISTS(SELECT 1 FROM neuron_regions r WHERE r.root_id=n.root_id AND r.region=?)")
        args.append(region)
    connected = parameter(q, "connected_to")
    if connected:
        if not re.fullmatch(r"\d{1,19}", connected) or int(connected) > 2**63 - 1:
            raise QueryError(400, "connected_to must be a root ID")
        if portable_mode():
            # json_each gives SQLite one indexed lookup per real partner and
            # avoids an unbounded IN placeholder list for high-degree cells.
            where.append("n.root_id IN (SELECT CAST(value AS INTEGER) FROM json_each(?))")
            args.append(json.dumps(portable.graph().partners(int(connected))))
        else:
            where.append("(EXISTS(SELECT 1 FROM edges e WHERE e.pre=? AND e.post=n.root_id) OR "
                         "EXISTS(SELECT 1 FROM edges e WHERE e.post=? AND e.pre=n.root_id))")
            args.extend((int(connected), int(connected)))
    min_in = number(q, "min_in", 0, 0, 15091983)
    min_out = number(q, "min_out", 0, 0, 15091983)
    if min_in:
        where.append("d.in_degree>=?"); args.append(min_in)
    if min_out:
        where.append("d.out_degree>=?"); args.append(min_out)
    condition = " WHERE " + " AND ".join(where) if where else ""
    common = " FROM neurons n JOIN degrees d ON d.root_id=n.root_id" + joins + condition
    total = db.execute(prefix + "SELECT COUNT(*)" + common, args).fetchone()[0]
    rows = db.execute(prefix + "SELECT n.root_id,n.cell_type,n.hemibrain_type,n.group_name,n.super_class,"
                      "n.cell_class,n.side,n.nt_type,d.in_degree,d.out_degree,d.in_synapses,d.out_synapses" +
                      common + " ORDER BY d.out_degree DESC,n.root_id LIMIT ? OFFSET ?",
                      [*args, limit, (page - 1) * limit]).fetchall()
    return {"total": total, "page": page, "limit": limit,
            "results": [serialize_neuron(row) for row in rows],
            "regional_filter_scope": "Neuropil membership derives only from source-attributed pairs; see integrity panel." if region else None}


def connections(db, q, direction):
    if portable_mode():
        return portable_connections(db, q, direction)
    id_ = root_id(q, "id")
    require_neuron(db, id_)
    limit = number(q, "limit", 40, 1, 200)
    offset = number(q, "offset", 0, 0, MAX_OFFSET)
    minimum = number(q, "min_synapses", 1, 1, 10000000)
    col = "pre" if direction == "outgoing" else "post"
    other = "post" if direction == "outgoing" else "pre"
    region = parameter(q, "region")
    if region:
        sql = (f" FROM region_edges r JOIN edges e ON e.pre=r.pre AND e.post=r.post "
               f"JOIN neurons n ON n.root_id=e.{other} "
               f"WHERE e.{col}=? AND r.region=? AND e.syn_count>=?")
        args = [id_, region, minimum]
    else:
        sql = (f" FROM edges e JOIN neurons n ON n.root_id=e.{other} "
               f"WHERE e.{col}=? AND e.syn_count>=?")
        args = [id_, minimum]
    total = db.execute("SELECT COUNT(*)" + sql, args).fetchone()[0]
    rows = db.execute("SELECT e.pre,e.post,e.syn_count,n.cell_type,n.super_class,n.group_name" +
                      (",r.syn_count AS region_contacts" if region else "") + sql +
                      " ORDER BY e.syn_count DESC,e.pre,e.post LIMIT ? OFFSET ?",
                      [*args, limit, offset]).fetchall()
    return {"neuron": str(id_), "direction": direction, "total": total,
            "shown": len(rows), "offset": offset, "limit": limit, "min_synapses": minimum,
            "region": region, "filter_notice": "This only changes displayed results; no stored edge is removed." if minimum > 1 or region else None,
            "connections": [dict(source=str(r[0]), target=str(r[1]), synapse_count=r[2],
                                 partner_type=r[3], partner_class=r[4], partner_group=r[5],
                                 region_synapses=r[6] if region else None) for r in rows],
            "provenance": meta(db, "manifest")["source_note"]}


def portable_connections(db, q, direction):
    id_ = root_id(q, "id")
    require_neuron(db, id_)
    limit = number(q, "limit", 40, 1, 200)
    offset = number(q, "offset", 0, 0, MAX_OFFSET)
    minimum = number(q, "min_synapses", 1, 1, 10000000)
    region = parameter(q, "region")
    if region and len(region) > 80:
        raise QueryError(400, "region filter is too long")
    graph = portable.graph()
    partners, weights = graph.row(graph.resolve(id_), forward=direction == "outgoing")
    selected = []
    for partner, weight in zip(partners, weights):
        weight = int(weight)
        if weight < minimum:
            continue
        other = int(graph.ids[partner])
        regional = None
        if region:
            pre, post = (id_, other) if direction == "outgoing" else (other, id_)
            row = db.execute("SELECT syn_count FROM region_edges WHERE pre=? AND post=? AND region=?",
                             (pre, post, region)).fetchone()
            if not row:
                continue
            regional = row[0]
        selected.append((other, weight, regional))
    # Weight-descending with an exact-ID tiebreaker, identical to the SQLite API.
    selected.sort(key=lambda item: (-item[1], item[0]))
    page = selected[offset:offset + limit]
    ids = [item[0] for item in page]
    details = {r[0]: r for r in db.execute(
        "SELECT root_id,cell_type,super_class,group_name FROM neurons "
        "WHERE root_id IN (SELECT CAST(value AS INTEGER) FROM json_each(?))", (json.dumps(ids),))}
    records = []
    for other, weight, regional in page:
        row = details[other]
        pre, post = (id_, other) if direction == "outgoing" else (other, id_)
        records.append(dict(source=str(pre), target=str(post), synapse_count=weight,
                            partner_type=row[1], partner_class=row[2], partner_group=row[3],
                            region_synapses=regional))
    return {"neuron": str(id_), "direction": direction, "total": len(selected),
            "shown": len(records), "offset": offset, "limit": limit, "min_synapses": minimum,
            "region": region, "filter_notice": "This only changes displayed results; no stored edge is removed." if minimum > 1 or region else None,
            "connections": records, "provenance": meta(db, "manifest")["source_note"]}


def edge(db, q):
    pre = root_id(q, "source")
    post = root_id(q, "target")
    if portable_mode():
        weight = portable.graph().weight(pre, post)
        row = (weight,) if weight is not None else None
    else:
        row = db.execute("SELECT syn_count FROM edges WHERE pre=? AND post=?", (pre, post)).fetchone()
    if not row:
        raise QueryError(404, f"No observed directed connection from {pre} to {post}")
    region_rows = [dict(neuropil=r[0], synapses=r[1]) for r in db.execute(
        "SELECT region,syn_count FROM region_edges WHERE pre=? AND post=? ORDER BY syn_count DESC", (pre, post))]
    observed = sum(r["synapses"] for r in region_rows)
    if observed > row[0]:
        raise QueryError(500, "Regional attribution exceeds source edge weight")
    return {"source": str(pre), "target": str(post), "synapse_count": row[0],
            "neuropils": region_rows, "unattributed_synapses": row[0] - observed,
            "provenance": meta(db, "manifest")["source_note"],
            "note": "Regional data may be absent for low-weight pairs in the Shiu import; the directed pair still exists."}


def region_mask(db, q):
    region = parameter(q, "region", "")
    if not region or len(region) > 80:
        raise QueryError(400, "region is required")
    n = db.execute("SELECT COUNT(*) FROM neurons").fetchone()[0]
    mask = bytearray(n)
    members = 0
    for r in db.execute("SELECT n.idx FROM neuron_regions r JOIN neurons n ON n.root_id=r.root_id WHERE r.region=?", (region,)):
        mask[r[0]] = 1
        members += 1
    if not members:
        raise QueryError(404, "No source-attributed neurons in this neuropil")
    return bytes(mask), {"Content-Type": "application/octet-stream", "X-Neurons-In-Region": str(members)}


def overview(db):
    path = (portable.PORTABLE_DIR if portable_mode() else db_path().parent) / "overview.bin"
    if not path.is_file():
        raise QueryError(503, "Overview binary has not been indexed for this import")
    size = path.stat().st_size
    expected = 8 + 24 * meta(db, "integrity")["imported_neurons"]
    if size != expected:
        raise QueryError(503, f"Overview is incomplete ({size} != {expected} bytes)")
    return path.read_bytes(), {"Content-Type": "application/octet-stream", "Cache-Control": "public, max-age=3600"}


def expand(db, frontier, seen, forward, minimum, budget):
    if portable_mode():
        return expand_portable(frontier, seen, forward, minimum, budget)
    next_frontier = set()
    col, dest = ("pre", "post") if forward else ("post", "pre")
    ids = list(frontier)
    for i in range(0, len(ids), 250):
        chunk = ids[i:i + 250]
        sql = f"SELECT pre,post,syn_count FROM edges WHERE {col} IN ({','.join('?' for _ in chunk)}) AND syn_count>=?"
        rows = db.execute(sql + " LIMIT ?", [*chunk, minimum, budget["edges_left"] + 1]).fetchall()
        if len(rows) > budget["edges_left"]:
            return None
        budget["edges_left"] -= len(rows)
        for pre, post, weight in rows:
            source, target = (pre, post) if forward else (post, pre)
            if target not in seen:
                seen[target] = (source, weight)
                next_frontier.add(target)
                if len(seen) > MAX_TRACE_NODES:
                    return None
    return next_frontier


def expand_portable(frontier, seen, forward, minimum, budget):
    graph = portable.graph()
    next_frontier = set()
    for root in frontier:
        partners, weights = graph.row(graph.resolve(root), forward=forward)
        included = weights >= minimum
        count = int(included.sum())
        if count > budget["edges_left"]:
            return None
        budget["edges_left"] -= count
        for partner, weight in zip(partners[included], weights[included]):
            other = int(graph.ids[partner])
            if other not in seen:
                seen[other] = (root, int(weight))
                next_frontier.add(other)
                if len(seen) > MAX_TRACE_NODES:
                    return None
    return next_frontier


def best_path(forward, backward, source, target):
    meeting = forward.keys() & backward.keys()
    if not meeting:
        return None
    def depth(mapping, node):
        d = 0
        while mapping[node][0] is not None:
            node = mapping[node][0]; d += 1
        return d
    mid = min(meeting, key=lambda node: (depth(forward, node) + depth(backward, node), node))
    path = []
    current = mid
    while forward[current][0] is not None:
        parent, weight = forward[current]
        path.append((parent, current, weight))
        current = parent
    path.reverse()
    current = mid
    while backward[current][0] is not None:
        following, weight = backward[current]
        path.append((current, following, weight))
        current = following
    assert (not path and source == target) or (path[0][0] == source and path[-1][1] == target)
    return path


def trace(db, q):
    src, dst = root_id(q, "source"), root_id(q, "target")
    require_neuron(db, src); require_neuron(db, dst)
    max_hops = number(q, "max_hops", 4, 1, 4)
    minimum = number(q, "min_synapses", 1, 1, 10000000)
    if src == dst:
        return {"found": True, "hops": 0, "path": [str(src)], "connections": [],
                "note": "Same neuron; zero-hop identity is not a synaptic pathway."}
    forward = {src: (None, 0)}
    backward = {dst: (None, 0)}
    f_front, b_front = {src}, {dst}
    f_depth = b_depth = 0
    budget = {"edges_left": MAX_TRACE_EDGES}
    started = time.monotonic()
    # Exact shortest path within requested hop bound WHEN all expansions finish.
    # Alternating frontiers yields 1, 2, 3, then 4 hops; no fabricated links.
    for step in range(1, max_hops + 1):
        use_forward = step % 2 == 1
        if use_forward:
            result = expand(db, f_front, forward, True, minimum, budget)
            if result is None:
                return {"found": False, "incomplete": True, "reason": "Graph expansion exceeded the 500,000-edge / 80,000-node safety budget. Try a higher *view* threshold; source data remain intact."}
            f_front = result; f_depth += 1
        else:
            result = expand(db, b_front, backward, False, minimum, budget)
            if result is None:
                return {"found": False, "incomplete": True, "reason": "Graph expansion exceeded the 500,000-edge / 80,000-node safety budget. Try a higher *view* threshold; source data remain intact."}
            b_front = result; b_depth += 1
        path = best_path(forward, backward, src, dst)
        if path and len(path) <= max_hops:
            return {"found": True, "incomplete": False, "hops": len(path),
                    "path": [str(src), *[str(r[1]) for r in path]],
                    "connections": [dict(source=str(a), target=str(b), synapse_count=w) for a, b, w in path],
                    "min_synapses": minimum, "edges_examined": MAX_TRACE_EDGES - budget["edges_left"],
                    "provenance": meta(db, "manifest")["source_note"]}
        if time.monotonic() - started > 9:
            return {"found": False, "incomplete": True, "reason": "Graph expansion exceeded the 9-second safety budget; no absence of path is asserted."}
        if (not f_front and use_forward) or (not b_front and not use_forward):
            break
    return {"found": False, "incomplete": False, "max_hops": max_hops,
            "min_synapses": minimum, "note": "No path within the requested hop bound in the imported directed graph."}


def filter_count(db, q):
    minimum = number(q, "min_synapses", 1, 1, 10000000)
    if portable_mode():
        visible, contacts = portable.graph().filter_count(minimum)
    else:
        visible, contacts = db.execute("SELECT COUNT(*),COALESCE(SUM(syn_count),0) FROM edges "
                                       "WHERE syn_count>=?", (minimum,)).fetchone()
    integrity = meta(db, "integrity")
    return {"min_synapses": minimum, "visible_pairs": visible,
            "hidden_pairs": integrity["directed_pairs"] - visible,
            "visible_contacts": contacts,
            "total_pairs": integrity["directed_pairs"],
            "note": "Display/query threshold only. Every source pair, including 1-contact pairs, remains stored."}


def neighborhood(db, q):
    id_ = root_id(q, "id")
    require_neuron(db, id_)
    direction = parameter(q, "direction", "out")
    if direction not in ("in", "out"):
        raise QueryError(400, "direction must be in or out")
    hops = number(q, "hops", 2, 1, 2)
    minimum = number(q, "min_synapses", 1, 1, 10000000)
    seen = {id_: (None, 0)}
    frontier = {id_}
    budget = {"edges_left": 100000}
    levels = []
    for depth in range(1, hops + 1):
        expanded = expand(db, frontier, seen, direction == "out", minimum, budget)
        if expanded is None:
            return {"id": str(id_), "levels": levels, "incomplete": True,
                    "reason": "100,000-edge safety budget reached; this is not a complete neighborhood."}
        frontier = expanded
        levels.append({"hops": depth, "new_neurons": len(frontier),
                       "sample_ids": [str(v) for v in sorted(frontier)[:30]],
                       "sample_is_truncated": len(frontier) > 30})
        if not frontier:
            break
    return {"id": str(id_), "direction": direction, "min_synapses": minimum,
            "levels": levels, "incomplete": False, "edges_examined": 100000 - budget["edges_left"]}


def dispatch(params):
    """Return (bytes, http_status, headers). Only committed/validated DB is queried."""
    try:
        q = params if isinstance(params, dict) else parse_qs(params, keep_blank_values=True)
        resource = parameter(q, "resource", "status")
        if resource == "status":
            result = status()
            return json_bytes(result), 200, {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"}
        if resource in ("metadata", "integrity") and not db_path().is_file() and not portable_mode():
            return json_bytes({"data": None, "status": status()}), 200, {"Content-Type": "application/json; charset=utf-8"}
        with connect() as db:
            if not meta(db, "integrity") or not meta(db, "integrity")["validated"]:
                raise QueryError(503, "Database exists but source reconciliation has not passed")
            if resource == "metadata":
                result = {"data": meta(db, "manifest"), "status": status()}
            elif resource == "integrity":
                result = {"data": meta(db, "integrity"), "status": status()}
            elif resource == "overview":
                body, headers = overview(db)
                return body, 200, headers
            elif resource == "regions":
                result = {"regions": meta(db, "analytics")["regions"],
                          "scope": meta(db, "analytics")["regional_scope"]}
            elif resource == "region-mask":
                body, headers = region_mask(db, q)
                return body, 200, headers
            elif resource == "analytics":
                result = meta(db, "analytics")
            elif resource == "filter-count":
                result = filter_count(db, q)
            elif resource in ("neurons", "search"):
                result = list_neurons(db, q)
            elif resource == "neuron":
                result = neuron(db, q)
            elif resource == "morphology":
                result = morphology(db, q)
            elif resource in ("incoming", "outgoing"):
                result = connections(db, q, resource)
            elif resource == "edge":
                result = edge(db, q)
            elif resource == "trace":
                result = trace(db, q)
            elif resource == "neighborhood":
                result = neighborhood(db, q)
            else:
                raise QueryError(404, f"Unknown connectome resource: {resource}")
        return json_bytes(result), 200, {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"}
    except QueryError as exc:
        return json_bytes({"error": str(exc), "status": exc.status}), exc.status, {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"}
    except sqlite3.Error:
        return json_bytes({"error": "Connectome database query failed; inspect server logs", "status": 500}), 500, {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"}
    except (ValueError, OSError) as exc:
        return json_bytes({"error": f"Validated connectome asset failed an integrity or read check: {exc}", "status": 503}), 503, {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"}


def json_bytes(value):
    return json.dumps(value, allow_nan=False, separators=(",", ":")).encode("utf-8")
