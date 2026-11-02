// Check staged contents without printing credential values.
const {execFileSync}=require('node:child_process');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
require('@next/env').loadEnvConfig(root,false);
const prefix=['-c','safe.directory='+root.replaceAll('\\','/')];
const git=(args)=>execFileSync('git',[...prefix,...args],{cwd:root,maxBuffer:30*1024*1024});
const files=git(['diff','--cached','--diff-filter=ACMRT','--name-only','-z']).toString().split('\0').filter(Boolean);
const values=Object.entries(process.env).filter(([key,value])=>/SECRET|PASSWORD|API_KEY|MONGODB_URI|ACCESS_TOKEN/.test(key)&&value&&value.length>=8).map(([,value])=>value);
const issues=[];
for(const file of files){if(/(^|\/)(\.env[^/]*|env(?:\.[^/]*)?|node_modules(?:\.incomplete)?|\.next|tmp|\.aws|\.ssh|\.codex|\.agents)(\/|$)/i.test(file)||/\.(pem|key|p12|pfx|keystore)$/i.test(file)){issues.push({file,reason:'Excluded file staged'});continue}const contents=git(['show',':'+file]);if(values.some(value=>contents.includes(Buffer.from(value))))issues.push({file,reason:'Configured credential detected'});const text=contents.toString();if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9]{30,}|mongodb(?:\+srv)?:\/\/[^\s"']+:[^\s"']+@/.test(text))issues.push({file,reason:'Credential pattern detected'})}
if(issues.length){console.error(JSON.stringify({ok:false,issues}));process.exitCode=1}else console.log(JSON.stringify({ok:true,stagedFiles:files.length,excludedFilesStaged:0,credentialMatches:0}));
