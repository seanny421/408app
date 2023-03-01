import PouchDB from 'pouchdb'
import { DownloadedClip, ContainedDBRes } from './types'

export function getDB(db_name:string){
  if(process.browser){
    return new PouchDB(db_name, {auto_compaction: true})
  }
}

//takes db_name & item (must be of type any as this is a generic function) as params 
//adds item from db
export async function addToDB(db_name: string, item:any):Promise<string>{
  const db = getDB(db_name)
  let id = ''
  let rev = ''
  await db?.post(item)
  .then((res) => {
    id = res.id;
    rev = res.rev;
  })
  return id + '`' + rev
}

//takes db_name & item (must be of type any as this is a generic function) as params 
//removes item from db
export async function removeFromDB(db_name: string, item: any){
  console.log(item)
  const db = getDB(db_name)
  await db?.remove(item.id, item.rev)
  .catch((err) => console.log(err))
}

//takes videoItem as param
//returns ContainedBDRes type which includes id, rev & result (is the item already in DB)
export async function cutVideodDBContains(item:DownloadedClip):Promise<ContainedDBRes>{
  const db = getDB('cutVideos')
  let response:ContainedDBRes = {
    result: false,
  }
  await db?.allDocs({include_docs: true})
  .then((res) => {
    for(let i = 0; i < res.total_rows; i++){
      if(JSON.stringify(res.rows[i].doc?.timestamp) === JSON.stringify(item.timestamp)){
        response.result = true;
        response.id = res.rows[i].id
        response.rev = res.rows[i].doc?._rev
      }
    }
  })
  return response
}

//gets all documents from given db_name
export async function getAllDocs(db_name: string):Promise<Object[]>{
  const db = getDB(db_name)
  let response:Object[] = [] //default empty array to return
  await db?.allDocs({include_docs: true})
  .then((res) => {
    response = res.rows
  })
  return response
}
