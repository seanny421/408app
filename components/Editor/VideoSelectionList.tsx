import {CutVideoObject} from "../../global/types";
import Image from "next/image";
import VideoSelectionItem from "./VideoSelectionItem";
import { Paper } from "@mui/material";

interface Props {
  videos: CutVideoObject[]
}

export default function VideoSelectionList(props:Props){
  return (
    <Paper style={{width: '40%', height: '100%', backgroundColor: 'rgba(39,39,39,255)', padding: '0.5rem', maxHeight: 480/2, minHeight: 480/2, overflow: 'auto', overflowX: 'hidden'}}>
      <div style={{width: '100%'}}>
        {props.videos.map(function(video: CutVideoObject, i:number){
          return(
            <VideoSelectionItem key={i} video={video}/>
          )
        })}
      </div>
    </Paper>

  )

}
