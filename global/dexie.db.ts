
// import Dexie, {Table} from "dexie";
// import {indexedDB} from "fake-indexeddb";
// import { TimestampObject } from "./types"; 
// import { IDBKeyRange } from "fake-indexeddb";

// export interface DownloadedClip {
//   id?: number,
//   timestamp: TimestampObject,
//   bufferData: ArrayBuffer
// }

// export class MySubClassedDexie extends Dexie {
//   cutVideos!: Table<DownloadedClip>;

//   constructor(){
//     // let dbReq = indexedDB.open('mydatabase', 1)
//     super('mydatabase');
//     this.version(1).stores({
//       cutVideos: '++id, timestamp, bufferData'
//     })
//   }
// }

// export const db = new MySubClassedDexie()

// const database = new Dexie("database");
// database.version(1).stores({
//   customers: '++id, name, dept',
// });

// export const customerTable = database.table('customers');

// export default database;
