import useStore from "../../global/state"
import {CutVideoObject} from "../../global/types"
import { useState, useEffect } from "react"
import {Paper} from "@mui/material"
import TimelineItem from "./TimelineItem"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { lightTheme, darkTheme } from "../../styles/themes"
import { styled } from "@mui/system"

export default function Timeline(){
  const store = useStore()
  const [timelineVideos, setTimelineVideos] = useState<CutVideoObject[]>([])

  useEffect(() => {
    setTimelineVideos(store.timelineVideos)
    console.log(store.timelineVideos)
  }, [store.timelineVideos])

  const StyledPaper = styled(Paper)(({ theme }) => ({
    boxShadow: theme === lightTheme ? `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: '',
    border: theme === lightTheme ? `2px solid ${theme.palette.primary.main}`: "",
    background: `${theme == darkTheme ? '' : '#fff'}`,
    // color: `${theme == darkTheme ? '#fff' : '#000'}`,
    display: 'flex',alignItems: 'center', overflow: 'auto', overflowX: 'scroll', width: '80%'
  }));

  return(
    <section style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
    <h2>Timeline</h2>
    <StyledPaper style={{display: 'flex',alignItems: 'center', overflow: 'auto', overflowX: 'scroll', width: '80%'}}>
      <DndProvider backend={HTML5Backend}>
      {timelineVideos.map(function(video:CutVideoObject, i:number){
        return (
            <TimelineItem video={video} index={i} key={i}/>
          )
      })}
      </DndProvider>
    </StyledPaper>

    </section>
  )
}
