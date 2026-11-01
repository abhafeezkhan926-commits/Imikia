const attempts=new Map<string,{count:number;expires:number}>();
// Per-process protection. Add a shared gateway limiter for multi-instance hosting.
export function allowAttempt(key:string,limit=10,windowMs=60000){const now=Date.now();if(attempts.size>10000)for(const[k,v]of attempts)if(v.expires<now)attempts.delete(k);const record=attempts.get(key);if(!record||record.expires<now){attempts.set(key,{count:1,expires:now+windowMs});return true}record.count++;return record.count<=limit}
