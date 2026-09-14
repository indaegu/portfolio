import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {gzipSync} from 'node:zlib';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
const {basePath}=JSON.parse(await readFile(resolve(root,'build-info.json'),'utf8'));
const documents=new Map();
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,entry.name);if(entry.isDirectory())await walk(path);else if(path.endsWith('.html'))documents.set(path,await readFile(path,'utf8'));}}
await walk(root);let links=0;
for(const [file,html] of documents){
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)throw new Error(`${file}: duplicate id`);
 if((html.match(/<h1\b/g)||[]).length!==1)throw new Error(`${file}: expected one h1`);
 if(!html.includes('<html lang="ko">')||!html.includes('noindex, nofollow'))throw new Error(`${file}: missing metadata`);
 const relative=file.slice(root.length).replace(/\\/g,'/').replace(/index\.html$/,'');const page=new URL(basePath+relative,'https://portfolio.test');
 for(const [,raw] of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)){
  if(/^(https?:|mailto:|data:)/.test(raw))continue;const url=new URL(raw.replaceAll('&amp;','&'),page);
  if(basePath&&!url.pathname.startsWith(basePath+'/'))throw new Error(`${file}: missing base for ${raw}`);
  let target=resolve(root,'.'+url.pathname.slice(basePath.length));if((await stat(target).catch(()=>null))?.isDirectory())target=resolve(target,'index.html');
  if(!await stat(target).catch(()=>null))throw new Error(`${file}: missing ${raw}`);
  if(url.hash&&!documents.get(target)?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))throw new Error(`${file}: missing anchor ${raw}`);links++;
 }
}
const sizes={};for(const file of ['assets/site.css','assets/site.js']){const data=await readFile(resolve(root,file));sizes[file]={bytes:data.length,gzipBytes:gzipSync(data).length};}
console.log(JSON.stringify({result:'PASS',pages:documents.size,localReferencesChecked:links,sizes},null,2));
