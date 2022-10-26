import create from 'zustand'
import {devtools, persist} from 'zustand/middleware';

type Store = {
  isLight: boolean;
  shown: boolean;
  toggleTheme: () => void;
  toggleSettings: () => void;

  urlList: string[];
  addToUrlList: (item:string) => void; //should this be boolean?
  removeFromUrlList: (item:string) => void;
}

const useStore = create<Store>()(
  devtools(
    persist((set) => ({
      isLight: false,
      shown: false,
      urlList: [],
      toggleTheme: () => set((state) => ({isLight: !state.isLight})),
      toggleSettings: () => set((state) => ({shown: !state.shown})),
      addToUrlList: (item:string) => set((state) => ({urlList: [...state.urlList, item]})),
      removeFromUrlList: (item:string) => set((state) => ({urlList: state.urlList.filter(url => url != item)})),
    }), {name: 'boolean-storage'})
  )
)

export default useStore;

