import useStore from "../../global/state"
import {CutVideoObject} from "../../global/types"

export default function Timeline(){
  const store = useStore()
  return(
    <div>
      <h3>Timeline</h3>
      {store.timelineVideos.map(function(video:CutVideoObject, i:number){
        return (
          <h4 key={i}>{video.id}</h4>
        )
      })}
    </div>
  )
}
