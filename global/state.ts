import {Url} from 'url';
import create from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import { DownloadedClip, DownloadQueueItem, VideoObject } from './types';

type Store = {
  isLight: boolean;
  shown: boolean;
  toggleTheme: () => void;
  toggleSettings: () => void;

  urlList: VideoObject[];
  addToUrlList: (item:VideoObject) => void; //should this be boolean?
  removeFromUrlList: (item:VideoObject) => void;
  addCaptionToObject: (item: VideoObject, captionlist: string[]) => void;

  termsList: string[];
  addToTermsList: (item:string) => void;
  removeFromTermsList: (item: string) => void;
  
  //downloadQueue
  downloadQueue: DownloadQueueItem[],
  addToDownloadQueue: (item:DownloadQueueItem) => void; //should this be boolean?
  removeFromDownloadQueue: (item:DownloadQueueItem) => void;

  //actual downloaded clips
  downloadedClips: DownloadedClip[],
  addToDownloadedClips: (item:DownloadedClip) => void; //should this be boolean?
  removeFromDownloadedClips: (item:DownloadedClip) => void;
}

const useStore = create<Store>()(
  devtools(
    persist((set) => ({
      isLight: false,
      shown: false,
      toggleTheme: () => set((state) => ({isLight: !state.isLight})),
      toggleSettings: () => set((state) => ({shown: !state.shown})),

      urlList: [],
      addToUrlList: (item:VideoObject) => set((state) => ({urlList: [item, ...state.urlList]})),
      removeFromUrlList: (item:VideoObject) => set((state) => ({urlList: state.urlList.filter(url => url != item)})),
      addCaptionToObject: (item: VideoObject, captionlist: string[]) => {
        const newItem = item;
        newItem.captions = captionlist;
        set((state) => ({
            urlList: [...state.urlList.filter(url => url != item), newItem]
          })
        );
      },

      termsList: [],
      addToTermsList: (item:string) => set((state) => ({termsList: [...state.termsList, item]})),
      removeFromTermsList: (item:string) => set((state) => ({termsList: state.termsList.filter(term => term != item)})),

      //downloadQueue
      downloadQueue: [],
      addToDownloadQueue: (item:DownloadQueueItem) => set(
        (state) => ({
          downloadQueue: checkQueueForAndAdd(state.downloadQueue, item) //check for existing urls
        })
      ),
      removeFromDownloadQueue: (item:DownloadQueueItem) => set(
        (state) => ({downloadQueue: checkQueueForAndRemove(state.downloadQueue, item)})
      ),

      downloadedClips: [],
      addToDownloadedClips: (item:DownloadedClip) => set((state) => ({downloadedClips: checkDownloadedAndAdd(state.downloadedClips, item)})),
      removeFromDownloadedClips: (item:DownloadedClip) => set((state) => ({downloadedClips: state.downloadedClips.filter(clip => clip !== item)})),

    }), {name: 'boolean-storage'})
  )
)

function checkDownloadedAndAdd(downloadedClips: DownloadedClip[], item:DownloadedClip){
  console.log(item.timestamp)
  for(let i = 0; i < downloadedClips.length; i++){
    console.log(i)
    console.log(downloadedClips[i].timestamp)
    // console.log(item.rawData === downloadedClips[i].rawData)
    console.log(JSON.stringify(item.timestamp) === JSON.stringify(downloadedClips[i].timestamp))
    if(JSON.stringify(item.timestamp) === JSON.stringify(downloadedClips[i].timestamp)){
      return downloadedClips;
    }
  }
  console.log('we here')
  return [...downloadedClips, item];

}

//checks if the url is already in the queue, adds timestamp data to relevant url if so
//if not then add new item to queue
//so we don't need to redownload youtube videos
function checkQueueForAndAdd(downloadQueue:DownloadQueueItem[], item:DownloadQueueItem):DownloadQueueItem[]{
  for(let i = 0; i < downloadQueue.length; i++){
    if(item.url === downloadQueue[i].url){
      downloadQueue[i].timestampData = downloadQueue[i].timestampData.concat(item.timestampData)
      return downloadQueue;
    }
  }
  return [...downloadQueue, item];
}

function checkQueueForAndRemove(downloadQueue:DownloadQueueItem[], item:DownloadQueueItem):DownloadQueueItem[]{
  for(let i = 0; i < downloadQueue.length; i++){
    if(item.url === downloadQueue[i].url){
      item.timestampData.forEach((timestampObj) => {
        downloadQueue[i].timestampData = downloadQueue[i].timestampData.filter(timestamp => JSON.stringify(timestamp) !== JSON.stringify(timestampObj))
      })
      if(downloadQueue[i].timestampData.length > 0)
        return downloadQueue;
    }
  }
  return downloadQueue.filter(queueItem => queueItem.url !== item.url)
}

export default useStore;

