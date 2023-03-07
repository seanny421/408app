import {useEffect, useState} from "react"
import {CutVideoObject} from "../../global/types"
import useStore from "../../global/state"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
const ffmpeg = createFFmpeg({
  // log: true,
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
    console.log(store.timelineVideos)
  }, [store.timelineVideos])

  //loop through all the timelinevideos and concat with ffmpeg
  async function updateMainPreview(){
    console.log('updating mainpreview....')
    if(!ffmpeg.isLoaded())
      await ffmpeg.load()
    for(let i = 0; i < store.timelineVideos.length; i++){
      const buffer = new Uint8Array(JSON.parse(store.timelineVideos[i].doc.bufferData)).buffer
      const vid = new Blob([buffer], {type: 'video/mp4'})
      try{
        const mainpreview = ffmpeg.FS('readFile', 'mainpreview.mp4')
        ffmpeg.FS('writeFile', 'tempVid.mp4', await fetchFile(vid))

        await ffmpeg.run('-i', 'mainpreview.mp4', '-vcodec', 'copy', '-vbsf', 'h264_mp4toannexb', '-acodec', 'copy', 'part1.ts')
        await ffmpeg.run('-i', 'tempVid.mp4', '-vcodec', 'copy', '-vbsf', 'h264_mp4toannexb', '-acodec', 'copy', 'part2.ts')
        await ffmpeg.run('-i', 'concat:part1.ts|part2.ts', '-codec', 'copy', 'output.mkv')

        const output = ffmpeg.FS('readFile', 'output.mkv')
        ffmpeg.FS('writeFile', 'mainpreview.mp4', output)
      } catch(err){//if mainpreview.mp4 is not defined yet
        ffmpeg.FS('writeFile', 'mainpreview.mp4', await fetchFile(vid))
      }
    }
    updateVideo()
  }

  async function updateVideo(){
    if(!ffmpeg.isLoaded())
      await ffmpeg.load()
    try {
      const vid = ffmpeg.FS('readFile', 'mainpreview.mp4')
      setMainPreviewVideo(createVideoUrl(vid.buffer))
      ffmpeg.FS('unlink', 'mainpreview.mp4')
    } catch(err){ //if mainpreview isn't defined
        setMainPreviewVideo('')
    }
  }

  return (
    <div>
      {mainpreviewVideo != '' &&
        <video style={{padding: '1rem', width: '100%'}} controls src={mainpreviewVideo} />}
      {mainpreviewVideo == '' &&
        <video style={{padding: '1rem', width: '100%'}} controls src={''} />}

    </div>

  )
}
