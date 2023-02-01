import {useEffect, useState} from "react";
import useStore from "../../../global/state"
import { EditorComponentProps } from "../../../global/types";
import { Paper } from "@mui/material";
import { fetchFile } from "@ffmpeg/ffmpeg";
// import concat from "ffmpeg-concat";

export default function Timeline(props: EditorComponentProps){
  const store = useStore();
  const [timelineVideoList, setTimelineVideoList] = useState<File[]>([])


  const addToTimeline = async () => {
    if(store.currentFile && store.lastMouseEvent == "mousedown"){
      setTimelineVideoList([...timelineVideoList, store.currentFile])
      try {
        //this will raise error if we don't have mainpreview
        const mainPrevFile = props.ffmpeg.FS('readFile', 'mainpreview.mp4')
        props.ffmpeg.FS('writeFile', 'fileToConcat.mp4', await fetchFile(store.currentFile))

        //approach 2
        // ffmpeg -i part1.mp4 -vcodec copy -vbsf h264_mp4toannexb -acodec copy part1.ts
        // ffmpeg -i part2.mp4 -vcodec copy -vbsf h264_mp4toannexb -acodec copy part2.ts
        await props.ffmpeg.run('-i', 'mainpreview.mp4', '-vcodec', 'copy', '-vbsf', 'h264_mp4toannexb', '-acodec', 'copy', 'part1.ts')
        await props.ffmpeg.run('-i', 'fileToConcat.mp4', '-vcodec', 'copy', '-vbsf', 'h264_mp4toannexb', '-acodec', 'copy', 'part2.ts')
        // await props.ffmpeg.run('ffmpeg -i "concat:part1|part2" -codec copy output.mkv')
        await props.ffmpeg.run('-i', 'concat:part1.ts|part2.ts', '-codec', 'copy', 'output.mkv')


        const output = props.ffmpeg.FS('readFile', 'output.mkv')

        //now make sure this video is the one we're showing to user
        props.ffmpeg.FS('writeFile', 'mainpreview.mp4', output)

      } catch(err){

        console.log(err)
        props.ffmpeg.FS('writeFile', 'mainpreview.mp4', await fetchFile(store.currentFile))
      }


      // props.ffmpeg.FS('writeFile', 'mainpreview.mp4', await fetchFile(store.currentFile))
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
