import assert from 'node:assert/strict';
import {BIOMES, DEVICES, TECH, rng} from './src/data.mjs';
import {generateRegion, neighbors, routeBetween} from './src/world.mjs';
import {organism} from './src/biology.mjs';

const blank={discovered:['estuary','river','roots'],abilities:[],shortcuts:[]};
assert.equal(BIOMES.length,12,'world has twelve authored regions');
assert.equal(neighbors('estuary').length,2,'starting habitat has multiple routes');
assert.equal(generateRegion('seed','estuary').sites.length,3,'regions have sample sites');
assert.deepEqual(routeBetween(blank,'estuary','river'),['estuary','river'],'mapped route resolves');
assert.equal(routeBetween(blank,'estuary','trench'),null,'undiscovered regions remain hidden');
blank.discovered.push('lake','salt');
assert.equal(routeBetween(blank,'estuary','salt').at(-1),'salt','interconnected map route resolves');
const a=organism('seed','estuary',0),b=organism('seed','estuary',0);
assert.deepEqual(a,b,'organism generation is deterministic');
assert.ok(Object.keys(DEVICES).length>=10,'device catalogue has distinct systems');
assert.ok(Object.keys(TECH).length>=8,'technology tree has progression branches');
assert.equal(rng('x')(),rng('x')(),'seeded random is deterministic');
console.log('PHYCOFRONTIER logic: world graph, seeded habitats, organisms, devices and tech passed');
