// Use the editable project's environment without copying credentials to the build directory.
const path=require('node:path');
const fs=require('node:fs');
const {spawn}=require('node:child_process');
const {loadEnvConfig}=require('@next/env');
const root=path.resolve(__dirname,'..');
loadEnvConfig(root,false);
const buildRoot=process.env.IMIKIA_BUILD_DIRECTORY||'D:\\CodexBuilds\\imikia-deps';
const cli=path.join(buildRoot,'node_modules','next','dist','bin','next');
if(!fs.existsSync(cli)||!fs.existsSync(path.join(buildRoot,'.next','BUILD_ID'))){console.error('A production build is required before starting this preview.');process.exit(1)}
const child=spawn(process.execPath,[cli,'start','--hostname','127.0.0.1','--port',process.env.PORT||'3000'],{cwd:buildRoot,env:{...process.env,NODE_ENV:'production'},stdio:'inherit',windowsHide:true});
child.on('error',()=>{console.error('Could not start the local preview.');process.exitCode=1});
child.on('exit',code=>{process.exitCode=code||0});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
