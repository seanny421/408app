import {Url} from 'url';
import create from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import { CutVideoObject, DownloadedClip, DownloadQueueItem, VideoObject } from './types';

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

  //for editor
  timelineVideos: CutVideoObject[],
  addToTimeline: (item: CutVideoObject) => void;
  removeFromTimeline:(index:number) => void;
  swapTimelineElements:(indexFrom:number, indexTo:number) => void;
  //timelineimages
  timelineImages: string[],
  addToTimelineImages: (url: string) => void;
  resetImages: () => void;
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
      addToDownloadedClips: (item:DownloadedClip) => set((state) => ({downloadedClips: checkForDownloadedClipDuplicates(state.downloadedClips, item)})),
      removeFromDownloadedClips: (item:DownloadedClip) => set((state) => ({downloadedClips: state.downloadedClips.filter(clip => clip.timestamp != item.timestamp)})),

      //editor
      timelineVideos: [],
      addToTimeline: (item: CutVideoObject) => set((state) => ({timelineVideos: checkTimelineAndAdd(item, state.timelineVideos)})),
      removeFromTimeline:(index:number) => set((state) => ({timelineVideos: removeAtIndex(index, state.timelineVideos)})),
      swapTimelineElements:(indexFrom:number, indexTo:number) => set((state) => ({timelineVideos: swapElements(indexFrom, indexTo, state.timelineVideos)})),
      //timelineImages
      timelineImages: [],
      addToTimelineImages: (url: string) => set((state) => ({timelineImages: [...state.timelineImages, url]})),
      resetImages: () => set((state) => ({timelineImages: []}))
    }), {name: 'boolean-storage'})
  )
)

function swapElements(indexFrom:number, indexTo: number, timelineVideos: CutVideoObject[]):CutVideoObject[]{
  let temp = timelineVideos[indexFrom]
  timelineVideos[indexFrom] = timelineVideos[indexTo]
  timelineVideos[indexTo] = temp
  return [...timelineVideos]
}

function removeAtIndex(index:number, timelineVideos:CutVideoObject[]):CutVideoObject[]{
  timelineVideos.splice(index, 1)
  return [...timelineVideos]
}

function checkTimelineAndAdd(item:CutVideoObject, timelineVideos:CutVideoObject[]){
  const newItem:CutVideoObject = {
    id: item.id,
    doc: {
      timestamp: item.doc.timestamp,
      bufferData: JSON.stringify(Array.from(new Uint8Array(item.doc.bufferData)))
    },
    key: item.key,
    value: item.value
  }
  return [...timelineVideos, newItem]

}

//checks if the clip is already in the list, adds clip if so
function checkForDownloadedClipDuplicates(downloadedClips: DownloadedClip[], item: DownloadedClip){
  for(let i = 0; i < downloadedClips.length; i++){
    if(JSON.stringify(downloadedClips[i].timestamp) === JSON.stringify(item.timestamp))
      return downloadedClips
  }
  return [...downloadedClips, item]
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

