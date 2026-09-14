import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {watch} from 'node:fs';
import {resolve,extname,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {build,normalizeBasePath} from './build.mjs';
import {profile} from '../src/content/portfolio.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),out=resolve(root,'dist');
const base=normalizeBasePath(process.env.BASE_PATH??profile.basePath),port=Number(process.env.PORT||4173);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Invalid PORT');
await build();
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
  const url=new URL(req.url,'http://localhost');let path=decodeURIComponent(url.pathname);
  if((base&&path==='/')||path===base){res.writeHead(302,{Location:`${base}/`});res.end();return;}
  if(base&&!path.startsWith(base+'/')){res.writeHead(404);res.end('Not found');return;}
  path=path.slice(base.length);if(path.includes('\0')||path.includes('\\')){res.writeHead(400);res.end('Invalid path');return;}
  let file=resolve(out,'.'+path);if(file!==out&&!file.startsWith(out+sep)){res.writeHead(403);res.end('Forbidden');return;}
  const info=await stat(file);
  if(info.isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(308,{Location:url.pathname+'/'+url.search});res.end();return;}file=resolve(file,'index.html');}
  const bytes=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Content-Length':bytes.length,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:bytes);
 }catch(error){
  if(error instanceof URIError){res.writeHead(400);res.end('Invalid URL');return;}
  if(error.code==='ENOENT'){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?undefined:await readFile(resolve(out,'404.html')));}
  else{console.error('Preview:',error.message);res.writeHead(500);res.end('Preview server error');}
 }
});
server.listen(port,'127.0.0.1',()=>console.log(`Preview: http://localhost:${port}${base}/`));
if(process.argv.includes('--watch')){
 let timer,building=false,queued=false;
 const rebuild=()=>{if(building){queued=true;return;}building=true;const child=spawn(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'inherit'});child.on('exit',()=>{building=false;if(queued){queued=false;rebuild();}});};
 for(const dir of ['src','public'])watch(resolve(root,dir),{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(rebuild,180);});
 console.log('Watching src/ and public/. Refresh the browser after rebuilding.');
}
