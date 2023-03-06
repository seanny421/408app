import {CutVideoObject} from "../../global/types";
import Image from "next/image";
import VideoSelectionItem from "./VideoSelectionItem";

interface Props {
  videos: CutVideoObject[]
}

export default function VideoSelectionList(props:Props){
  return (
    <div style={{width: '30%'}}>
      {props.videos.map(function(video: CutVideoObject, i:number){
        return(
          <VideoSelectionItem key={i} video={video}/>
        )
      })}

    </div>

  )

}
