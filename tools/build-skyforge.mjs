import { build } from 'esbuild';
import { mkdir, readFile, writeFile, readdir, cp } from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await build({entryPoints:['js/skyforge/app.mjs'],outfile:'dist/skyforge.js',bundle:true,format:'esm',target:'es2022',minify:true,legalComments:'linked',sourcemap:false});
// Three.js embeds multiline GLSL; remove insignificant trailing line whitespace.
const output = await readFile('dist/skyforge.js', 'utf8');
await writeFile('dist/skyforge.js', output.replace(/[\t ]+$/gm, ''));
// Publish only runtime assets: never copy node_modules, source tooling, or secrets.
await mkdir('public', { recursive: true });
for (const entry of await readdir('.', { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.html')) await cp(entry.name, `public/${entry.name}`);
}
for (const directory of ['css', 'js', 'games', 'dist']) {
  await cp(directory, `public/${directory}`, { recursive: true });
}
console.log('Built self-hosted dist/skyforge.js and Vercel public/ static website.');
