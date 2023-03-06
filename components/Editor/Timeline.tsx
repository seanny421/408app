import useStore from "../../global/state"
import {CutVideoObject} from "../../global/types"
import { useState, useEffect } from "react"
import {Paper} from "@mui/material"
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../../styles/themes"
import TimelineItem from "./TimelineItem"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

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

  const PaperContainer = styled('div')(({ theme }) => ({
    width: window.innerWidth > 800 ? 200 : 400, 
    padding: '0.1rem', 
    borderRadius: 10, 
    border: theme == lightTheme ? `2px solid ${theme.palette.primary.main}`: '',
    "*::-webkit-scrollbar-thumb":{
      backgroundColor: `${theme == lightTheme ? 'rgba(150, 153, 151, 1)': 'rgba(150, 153, 151, 0.1)'}`,
      borderRadius: 100,
    },
  }));

  return(
    // <h3>Timeline</h3>
    <Paper style={{display: 'flex',alignItems: 'center', overflow: 'auto', overflowX: 'scroll', width: '50%'}}>
      <DndProvider backend={HTML5Backend}>
      {timelineVideos.map(function(video:CutVideoObject, i:number){
        return (
          <TimelineItem video={video} index={i} key={i}/>
          )
          {/*<div key={i} style={{margin: '0.5rem'}}>
            <h4>{video.id}</h4>
            <button onClick={() => store.removeFromTimeline(i)}>Remove</button>
          </div>*/}
      })}
      </DndProvider>
    </Paper>
  )
}
