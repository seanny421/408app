import {useEffect, useState} from "react"
import {CutVideoObject} from "../../global/types"
import useStore from "../../global/state"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
const ffmpeg = createFFmpeg({
  log: true,
})

interface Props {
  //this is only temporary
  video:CutVideoObject
}

function createVideoUrl(buffer:ArrayBuffer){
  return String(URL.createObjectURL(new Blob([buffer], {type: 'video/mp4'})))
}


export default function MainPreview(props:Props){
  const store = useStore()
  const [mainpreviewVideo, setMainPreviewVideo] = useState('')

  useEffect(() => {
    load()

  }, [])

  const load = async() => {
    await ffmpeg.load()
  }

  useEffect(() => {
    updateMainPreview()
  }, [store.timelineVideos])

  //loop through all the timelinevideos and concat with ffmpeg
  async function updateMainPreview(){
    console.log('updating mainpreview....')
    for(let i = 0; i < store.timelineVideos.length; i++){
      if(ffmpeg.isLoaded()){
        try{
          ffmpeg.FS('readFile', 'mainpreview.mp4')
        } catch(err){//if mainpreview.mp4 is not defined yet
          ffmpeg.FS('writeFile', 'mainpreview.mp4', await fetchFile(new Blob([store.timelineVideos[i].doc.bufferData], {type: 'video/mp4'})))
        }
      }
    }
    updateVideo()
    if(store.timelineVideos.length < 1)
      setMainPreviewVideo('')
  }

  function updateVideo(){
    if(ffmpeg.isLoaded()){
      try {
        const vid = ffmpeg.FS('readFile', 'mainpreview.mp4')
        setMainPreviewVideo(createVideoUrl(vid.buffer))
      } catch(err){
          console.log(err)
          setMainPreviewVideo('')
      }

    }
  }

  return (
    <video style={{padding: '1rem', width: '100%'}} controls src={mainpreviewVideo} />

  )
}
