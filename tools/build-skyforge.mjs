import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await build({entryPoints:['js/skyforge/app.mjs'],outfile:'dist/skyforge.js',bundle:true,format:'esm',target:'es2022',minify:true,legalComments:'linked',sourcemap:false});
// Three.js embeds multiline GLSL; remove insignificant trailing line whitespace.
const output = await readFile('dist/skyforge.js', 'utf8');
await writeFile('dist/skyforge.js', output.replace(/[\t ]+$/gm, ''));
console.log('Built dist/skyforge.js (self-hosted; no runtime build or CDN required).');
