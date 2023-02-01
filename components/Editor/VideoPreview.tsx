import { EditorComponentProps } from "../../global/types"
import { useEffect, useState } from "react"
import useStore from "../../global/state"

export default function VideoPreview(props: EditorComponentProps){
  const store = useStore()
  const [video, setVideo] = useState()

  useEffect(() => {
  }, [store.currentFile])

  useEffect(() => {
    if(store.lastMouseEvent == "mouseup")
      updatePreviewVideo()
  }, [store.lastMouseEvent])


  const updatePreviewVideo = async() => {
    try{
      const tempvideo = props.ffmpeg.FS('readFile', 'mainpreview.mp4')
      const url = URL.createObjectURL(new Blob([tempvideo.buffer], {type: 'video/mkv'}))
      setVideo(url)
    } catch(e) {

      // const tempvideo = props.ffmpeg.FS('readFile', 'mainpreview.mp4')
      // const url = URL.createObjectURL(new Blob([tempvideo.buffer], {type: 'video/mp4'}))
      // setVideo(url)
    }
  }

  return(
    <div>
        { video && <video controls width="400" src={(video)}></video> }
    </div>
  )
}
