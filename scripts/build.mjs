import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('src/main.js', 'dist/main.js');
await cp('src/styles.css', 'dist/styles.css');
await cp('manifest.json', 'dist/manifest.json');
console.log('Built dist/');
