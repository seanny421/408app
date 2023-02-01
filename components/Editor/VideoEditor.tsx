import VideoPreview from './VideoPreview';
import SelectedPreview from './SelectedPreview';
import VideoSelectionList from './BottomRow/VideoSelectionList';
import Timeline from './BottomRow/Timeline';
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import {useEffect} from 'react';
const ffmpeg = createFFmpeg({
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@latest/dist/ffmpeg-core.js'
})

export default function VideoEditor(){
  const load = async() => {
    await ffmpeg.load()
  }

  //run once on store.urlList update
  useEffect(() => {
    //load ffmpeg
    load()
  }, []);

  return(
  <div id="editor-container" style={{maxWidth: '85vw', maxHeight: '90vw', userSelect: 'none'}}>
    <div id="editor-top-row" style={{display: 'flex', justifyContent: 'space-between', height: 400, minWidth: '85vw', border: '2px solid red'}}>
      <SelectedPreview ffmpeg={ffmpeg}/>
      <VideoPreview ffmpeg={ffmpeg}/>
    </div>
    <div id="editor-bottom-row" style={{display: 'flex', justifyContent: 'space-between', height: 300, minWidth: '85vw', border: '2px solid blue'}}>
      <VideoSelectionList ffmpeg={ffmpeg}/>
      <Timeline ffmpeg={ffmpeg}/>
    </div>
  </div>
  )
}
