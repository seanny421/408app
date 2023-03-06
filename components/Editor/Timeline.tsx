import useStore from "../../global/state"
import {CutVideoObject} from "../../global/types"
import { useState, useEffect } from "react"

export default function Timeline(){
  const store = useStore()
  const [timelineVideos, setTimelineVideos] = useState<CutVideoObject[]>([])

  useEffect(() => {
    setTimelineVideos(store.timelineVideos)
    console.log(store.timelineVideos)
  }, [store.timelineVideos])


  function removeFromTimeline(index:number){
    store.removeFromTimeline(index)
  }

  return(
    <div>
      <h3>Timeline</h3>
      {timelineVideos.map(function(video:CutVideoObject, i:number){
        return (
          <div key={i}>
            <h4>{video.id}</h4>
            <button onClick={() => removeFromTimeline(i)}>Remove</button>
          </div>
        )
      })}
    </div>
  )
}
