"""Bounded, verified downloads and immutable dataset manifests."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import os
import urllib.request

FLYWIRE = {
    'proofread_connections_783.feather': (852022274, 'f48f972d262323a102aed49af1396b8a'),
    'proofread_root_ids_783.npy': (1114168, 'e0e6c19732fd8c7a4e39a2d170105421'),
}
TVB_REV = 'f1a3e7dc5370158df721f206c9c9bfad55d98172'
NEUROML_REV = '99a32ac3b23e71fb9c1a77d65dc24fbe1afd5aea'


def sha256(path):
    h=hashlib.sha256()
    with Path(path).open('rb') as stream:
        for chunk in iter(lambda:stream.read(4*1024*1024),b''): h.update(chunk)
    return h.hexdigest()


def download(url,path,expected_size=None,expected_md5=None,max_bytes=900_000_000):
    """Never replace an existing file, even on an interrupted download.

    A .partial is retained on failure for diagnosis; reruns require explicitly
    removing that partial, never silently treating it as valid source data.
    """
    path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
    if path.exists() or path.with_name(path.name+'.partial').exists():
        raise FileExistsError('Source or partial already exists: '+str(path))
    partial=path.with_name(path.name+'.partial')
    h=hashlib.md5();size=0
    request=urllib.request.Request(url,headers={'User-Agent':'Neuro-ML-research/0.1'})
    with urllib.request.urlopen(request,timeout=60) as response, partial.open('xb') as out:
        for chunk in iter(lambda:response.read(1024*1024),b''):
            size+=len(chunk)
            if size>max_bytes: raise ValueError('Download exceeds bounded size')
            out.write(chunk);h.update(chunk)
    if expected_size is not None and size!=expected_size: raise ValueError('Download length mismatch')
    if expected_md5 and h.hexdigest()!=expected_md5: raise ValueError('Publisher MD5 mismatch')
    os.rename(partial,path)
    return {'file':path.name,'source':url,'bytes':size,'sha256':sha256(path),
            'publisher_md5':expected_md5,'download_utc':datetime.now(timezone.utc).isoformat()}


def fetch_flywire(directory):
    directory=Path(directory)
    if (directory/'manifest.json').exists(): raise FileExistsError('Dataset manifest already exists')
    files=[]
    for name,(size,md5) in FLYWIRE.items():
        print('Downloading',name,size,'bytes',flush=True)
        files.append(download('https://zenodo.org/api/records/10676866/files/'+name+'/content',directory/name,size,md5))
    manifest={'schema_version':1,'name':'FlyWire proofread connectivity','organism':'Drosophila melanogaster',
              'version':'783.0','source':'https://zenodo.org/records/10676866','license':'CC-BY-4.0',
              'citation':'FlyWire Consortium, DOI:10.5281/zenodo.10676866; Dorkenwald et al. Nature 2024',
              'units':{'ids':'uint64 root IDs','syn_count':'anatomical synapses','nt':'predicted probability'},
              'data_quality':'proofread segmentation; predicted synapses/transmitters; not physiology',
              'processing_history':[],'dimensions':'computed during import','files':files}
    (directory/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    return manifest


def fetch_tvb(directory):
    directory=Path(directory)
    base='https://raw.githubusercontent.com/the-virtual-brain/tvb-data/'+TVB_REV+'/'
    file=download(base+'tvb_data/connectivity/connectivity_96.zip',directory/'connectivity_96.zip',max_bytes=1000000)
    download(base+'LICENSE',directory/'SOURCE_LICENSE.txt',max_bytes=100000)
    manifest={'schema_version':1,'name':'TVB 96-region demonstration connectivity','organism':'Homo sapiens',
              'version':TVB_REV,'source':base,'license':'GPL-3.0-or-later (repository license; see SOURCE_LICENSE.txt)',
              'citation':'Sanz Leon et al. 2013, doi:10.3389/fninf.2013.00010; source archive info.txt',
              'units':'weights and tract lengths as supplied; original acquisition units require review',
              'data_quality':'demonstration dataset; NOT comprehensive whole-brain anatomy',
              'processing_history':[],'dimensions':[96,96],'files':[file]}
    (directory/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    return manifest


def import_tvb(directory,output):
    import zipfile
    import numpy as np
    from scipy import sparse
    from .connectome import Connectome,validate_human
    directory=Path(directory);output=Path(output)
    manifest=json.loads((directory/'manifest.json').read_text(encoding='utf-8'))
    with zipfile.ZipFile(directory/'connectivity_96.zip') as z:
        lines=z.read('centres.txt').decode().splitlines()
        labels=[x.split()[0] for x in lines]
        positions=np.array([[float(v) for v in x.split()[1:4]] for x in lines])
        weights=np.loadtxt(z.open('weights.txt'));lengths=np.loadtxt(z.open('tract_lengths.txt'))
        info=z.read('info.txt').decode()
    regions=[]
    # Only recognizable source labels are mapped; ambiguous abbreviations remain unknown.
    mappings={'RM-TC':'temporal','RM-Amyg':'amygdala','RM-PFC':'frontal','RM-PMC':'frontal',
              'RM-IA':'insula','RM-Ip':'insula','RM-PHC':'hippocampus','RM-HC':'hippocampus',
              'RM-CC':'cingulate','RM-V':'occipital','RM-PC':'parietal','RM-S':'parietal',
              'RM-A':'temporal','RM-M1':'frontal','RM-FEF':'frontal','TM-':'thalamus',
              'BG-Cd':'caudate','BG-Pu':'putamen','BG-Pa':'pallidum'}
    for label in labels:
        group=next((g for prefix,g in mappings.items() if label.startswith(prefix)),'unknown')
        regions.append({'id':label,'name':label,'group':group,'hemisphere':label.rsplit('_',1)[-1],
                        'uncertainty':'abbreviation mapping; full atlas/source interpretation pending'})
    if lengths.shape!=weights.shape or positions.shape!=(len(labels),3) or not np.isfinite(lengths).all() or (lengths<0).any():
        raise ValueError('Invalid tract lengths or region centers')
    graph=Connectome(np.array(labels),sparse.csr_matrix(weights),{**manifest,'source_info':info,
        'matrix_orientation':'target rows, source columns (TVB convention); asymmetry retained',
        'processing_history':['source label preservation','conservative anatomical group mapping']})
    graph.save(output)
    np.save(output/'tract_lengths.npy',lengths,allow_pickle=False)
    np.save(output/'positions.npy',positions,allow_pickle=False)
    (output/'regions.json').write_text(json.dumps(regions,indent=2),encoding='utf-8')
    (output/'coverage.json').write_text(json.dumps(validate_human(graph,regions,strict=False),indent=2),encoding='utf-8')
    return graph
