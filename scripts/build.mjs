import {mkdir,rm,writeFile,cp,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import {profile,projects} from '../src/content/portfolio.mjs';
import {homePage,projectPage,notFoundPage} from '../src/templates.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export function normalizeBasePath(value){
 if(value===''||value==='/')return '';
 if(!/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*\/?$/.test(value))throw new Error(`Invalid BASE_PATH: ${value}`);
 return value.replace(/\/$/,'');
}
export function validateContent(items){
 const slugs=new Set();
 for(const p of items){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)||slugs.has(p.slug))throw new Error(`Invalid or duplicate slug: ${p.slug}`);slugs.add(p.slug);
  for(const key of ['title','subtitle','summary','role','period','status','takeaway'])if(!p[key]?.trim())throw new Error(`${p.slug}: ${key} required`);
  if(!p.sections.length||!p.tags.length)throw new Error(`${p.slug}: sections and tags required`);
  if(p.media){const m=p.media;if(!/^media\/[\w/-]+\.(webp|png|jpg|jpeg|avif|mp4)$/.test(m.src))throw new Error(`${p.slug}: invalid media path`);if(!m.alt?.trim()||!m.caption?.trim()||!Number.isInteger(m.width)||!Number.isInteger(m.height)||m.width<=0||m.height<=0)throw new Error(`${p.slug}: media needs alt, caption, width and height`);if(m.type==='video'&&(!m.poster||!/^media\/[\w/-]+\.(webp|png|jpg|jpeg|avif)$/.test(m.poster)))throw new Error(`${p.slug}: video needs a poster`);}
  for(const link of p.links||[])if(new URL(link.href).protocol!=='https:')throw new Error(`${p.slug}: links must use https`);
 }
}
export async function build(){
 const base=normalizeBasePath(process.env.BASE_PATH??profile.basePath),out=resolve(root,'dist');
 validateContent(projects);
 for(const p of projects)if(p.media){await access(resolve(root,'public',p.media.src));if(p.media.poster)await access(resolve(root,'public',p.media.poster));}
 await rm(out,{recursive:true,force:true});await mkdir(resolve(out,'assets'),{recursive:true});
 await cp(resolve(root,'public'),out,{recursive:true,filter:path=>!path.endsWith('README.md')});
 await cp(resolve(root,'src/styles/site.css'),resolve(out,'assets/site.css'));
 await cp(resolve(root,'src/scripts/site.js'),resolve(out,'assets/site.js'));
 // Preserve existing repository branding when building inside the original checkout.
 for(const name of ['favicon.png','logo.png','og-image.png']){try{await access(resolve(root,name));await cp(resolve(root,name),resolve(out,name));}catch(error){if(error.code!=='ENOENT')throw error;}}
 await writeFile(resolve(out,'index.html'),homePage(base));
 for(const p of projects){const dir=resolve(out,'projects',p.slug);await mkdir(dir,{recursive:true});await writeFile(resolve(dir,'index.html'),projectPage(p,base));}
 await writeFile(resolve(out,'404.html'),notFoundPage(base));await writeFile(resolve(out,'.nojekyll'),'');
 await writeFile(resolve(out,'robots.txt'),'# Each page requests noindex; this is not access control.\nUser-agent: *\nAllow: /\n');
 await writeFile(resolve(out,'build-info.json'),JSON.stringify({basePath:base,pages:projects.length+2,contentUpdated:profile.updated},null,2)+'\n');
 console.log(`Built ${projects.length+2} static pages -> dist (base: ${base||'/'})`);return out;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await build();
