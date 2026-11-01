import {db} from './db';
export async function logActivity(action:string,detail:string){try{await(await db()).collection('activityLogs').insertOne({action,detail,at:new Date()})}catch{}}
