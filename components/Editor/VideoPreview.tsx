import { EditorProps } from "../../global/types"
import { useEffect, useState } from "react"
import { fetchFile } from "@ffmpeg/ffmpeg"
import useStore from "../../global/state"

export default function VideoPreview(props: EditorProps){
  const store = useStore()
  const [video, setVideo] = useState()

  useEffect(() => {
  }, [store.currentFile])

  useEffect(() => {
    if(store.lastMouseEvent == "mouseup")
      updatePreviewVideo()
  }, [store.lastMouseEvent])


  const updatePreviewVideo = async() => {
    //write file to memory
    // props.ffmpeg.FS('writeFile', 'mainpreview.mp4')
    //run the FFMpeg command
    // await props.ffmpeg.run('-i', 'mainpreview.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    // await ffmpeg.run('-i', 'test.mp4', '-c', 'copy', '-map', '0', '-segment_time 00:00:00', '-f', 'segment output.mp4');

// ffmpeg -i input.mp4 -c copy -map 0 -segment_time 00:20:00 -f segment output%03d.mp4

    const video = props.ffmpeg.FS('readFile', 'mainpreview.mp4')
    //creat a URL
    const url = URL.createObjectURL(new Blob([video.buffer], {type: 'video/mp4'}))
    setVideo(url)
  }

  return(
    <div>
      {!video && <button onClick={updatePreviewVideo}>Get Video</button>}
        { video && <video controls width="400" src={(video)}></video> }
    </div>
  )
}
