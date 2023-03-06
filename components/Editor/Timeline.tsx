import useStore from "../../global/state"
import {CutVideoObject} from "../../global/types"
import { useState, useEffect } from "react"

export default function Timeline(){
  const store = useStore()
  const [timelineVideos, setTimelineVideos] = useState<CutVideoObject[]>([])

  useEffect(() => {
    setTimelineVideos(store.timelineVideos)
  }, [])

  return(
    <div>
      <h3>Timeline</h3>
      {timelineVideos.map(function(video:CutVideoObject, i:number){
        return (
          <h4 key={i}>{video.id}</h4>
        )
      })}
    </div>
  )
}
