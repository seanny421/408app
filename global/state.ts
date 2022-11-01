import {Url} from 'url';
import create from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import { UrlObject } from './types';

type Store = {
  isLight: boolean;
  shown: boolean;
  toggleTheme: () => void;
  toggleSettings: () => void;

  urlList: UrlObject[];
  addToUrlList: (item:UrlObject) => void; //should this be boolean?
  removeFromUrlList: (item:UrlObject) => void;
}

const useStore = create<Store>()(
  devtools(
    persist((set) => ({
      isLight: false,
      shown: false,
      urlList: [],
      toggleTheme: () => set((state) => ({isLight: !state.isLight})),
      toggleSettings: () => set((state) => ({shown: !state.shown})),
      addToUrlList: (item:UrlObject) => set((state) => ({urlList: [...state.urlList, item]})),
      removeFromUrlList: (item:UrlObject) => set((state) => ({urlList: state.urlList.filter(url => url != item)})),
    }), {name: 'boolean-storage'})
  )
)

export default useStore;

