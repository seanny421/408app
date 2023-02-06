import {Url} from 'url';
import create from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import { DownloadQueueItem, VideoObject } from './types';

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
      addToDownloadQueue: (item:DownloadQueueItem) => set((state) => ({downloadQueue: [...state.downloadQueue, item]})),
      removeFromDownloadQueue: (item:DownloadQueueItem) => set((state) => ({downloadQueue: state.downloadQueue.filter(queueItem => JSON.stringify(queueItem) != JSON.stringify(item))})),
    }), {name: 'boolean-storage'})
  )
)

export default useStore;

