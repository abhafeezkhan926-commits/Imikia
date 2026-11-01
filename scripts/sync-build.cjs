// The production build directory holds the real node_modules; mirror the editable source there first.
const path=require('node:path');
const fs=require('node:fs');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const target=process.env.IMIKIA_BUILD_DIRECTORY||'D:\\CodexBuilds\\imikia-deps';
const folders=['app','components','lib','public'];
const files=['next.config.ts','tsconfig.json','postcss.config.mjs','proxy.ts','next-env.d.ts','package.json'];
const skip=(source)=>{const relative=path.relative(root,source);return !relative.split(path.sep).some(part=>['node_modules','.next','tmp','.env','.env.local','.env.example'].includes(part));};
for(const folder of folders){const from=path.join(root,folder);if(!fs.existsSync(from))continue;fs.cpSync(from,path.join(target,folder),{recursive:true,force:true,filter:skip});}
for(const file of files){const from=path.join(root,file);if(fs.existsSync(from))fs.copyFileSync(from,path.join(target,file));}
const cli=path.join(target,'node_modules','next','dist','bin','next');
if(!fs.existsSync(cli)){console.error('Next.js is not installed in '+target);process.exit(1);}
const child=spawn(process.execPath,[cli,'build','--webpack'],{cwd:target,env:{...process.env,NODE_ENV:'production'},stdio:'inherit',windowsHide:true});
child.on('error',()=>{console.error('Could not start the production build.');process.exitCode=1});
child.on('exit',code=>{process.exitCode=code||0});
