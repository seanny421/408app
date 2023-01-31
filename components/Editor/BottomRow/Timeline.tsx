import {useEffect, useState} from "react";
import useStore from "../../../global/state"
import { EditorProps } from "../../../global/types";
import { Paper } from "@mui/material";
import { fetchFile } from "@ffmpeg/ffmpeg";

export default function Timeline(props: EditorProps){
  const store = useStore();
  const [timelineVideoList, setTimelineVideoList] = useState<File[]>([])


  const addToTimeline = async () => {
    if(store.currentFile && store.lastMouseEvent == "mousedown"){
      setTimelineVideoList([...timelineVideoList, store.currentFile])
      props.ffmpeg.FS('writeFile', 'mainpreview.mp4', await fetchFile(store.currentFile))
      store.setLastMouseEvent("mouseup")
    }
  }

  return (
    <Paper onMouseUp={addToTimeline} style={{width: '50%', textAlign: 'center'}}>
      <h1>Timeline</h1>
      <input type="text" onChange={(e) => store.setCurrentTimeStamp(e.target.value)} />
      {timelineVideoList.map(function(videoFile, i){
        return(<h1 key={i}>{videoFile.name}</h1>)
      })}
    </Paper>
  )
}
