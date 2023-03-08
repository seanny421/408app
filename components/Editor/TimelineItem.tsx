import {CutVideoObject} from "../../global/types"
import useStore from "../../global/state"
import { useDrag, useDrop } from "react-dnd"
import { darkTheme } from "../../styles/themes"
import { styled } from "@mui/system"
import { useTheme } from "@mui/system"
import { Modal, Box, Button } from "@mui/material"
import {useState} from "react"

interface Props {
  video: CutVideoObject,
  index: number
}

export default function TimelineItem(props:Props){
  const store = useStore()
  const theme = useTheme()
  const [trimMenuOpen, setTrimMenuOpen] = useState<boolean>(false)

  const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: 'Item',
        drop: (item:{indexFrom: number}) => {
          console.log(item)
          handleSwap(item.indexFrom)

        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      }),
      [],
    )
  const [{ isDragging }, drag] = useDrag(
      () => ({
        type: 'Item',
        item: {indexFrom: props.index},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
          indexFrom: props.index
        }),
      }),
      [],
    )

  function handleSwap(indexFrom:number){
    store.swapTimelineElements(indexFrom, props.index)
  }


  // const StyledSection = styled('section')(({ theme }) => ({
  //   background: `${isOver ? : ''}`, 
  //   borderRight: '2px solid rgba(105, 105, 105, 0.1)', 
  //   padding: '1rem'
  // }));
  //
  const StyledButton = styled('button')(({ theme }) => ({
    borderRadius: 100,
    border: `2px solid ${theme.palette.primary.main}`,
    color: `${theme == darkTheme ? '#fff' : '#000'}`,
    background: `${theme == darkTheme ? '#000': '#fff'}`,
    ":hover": {
      //on hover flip background theme
      background: `${theme == darkTheme ? '#fff': '#000'}`,
      color: `${theme == darkTheme ? '#000': '#fff'}`,
      cursor: 'pointer'
    },
  }));

  function handleClose(){
    setTrimMenuOpen(false)
  }

  function createVideoUrl(){
    console.log(props.video.doc.bufferData)
    const buff = new Uint8Array(JSON.parse(props.video.doc.bufferData))
    console.log(buff)
    const url = String(URL.createObjectURL(new Blob([buff], {type: 'video/mp4'})))
    return url
  }


  return (
      <section style={{background: `${isOver ? theme.palette.primary.main : ''}`, opacity: `${isOver ? '0.3': '1'}`,  borderRight: '2px solid rgba(105, 105, 105, 0.1)', padding: '1rem'}}>
      <div ref={drag} style={{margin: '0.5rem', opacity: isDragging ? '0.5': '1'}}>
        <div ref={drop}>
          <div className="thumbnail-container" style={{}}>
            <img src={store.timelineImages[props.index]} style={{width: '200px'}}/>
          </div>
          <StyledButton onClick={() => setTrimMenuOpen(true)}>Trim this clip</StyledButton>
          <StyledButton onClick={() => store.removeFromTimeline(props.index)}>Remove from edit</StyledButton>
        </div>
      </div>

      <Modal onClose={handleClose} open={trimMenuOpen}>
        <Box sx={{textAlign: 'center', p: 2, borderRadius: 10,position: 'absolute', top: '40%', left: "30%", bgcolor: "background.paper"}}>
          <h1>Trim this clip</h1>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <video style={{width: '50%'}} controls src={createVideoUrl()}/>
            <div>
              <h4>Cut from (seconds) </h4>
              <input type="number" />
              <h4>Cut to (seconds)</h4>
              <input type="number" />
            </div>
          </div>
          <StyledButton style={{margin: '1rem', paddingInline: '2rem'}}><p style={{fontWeight: 'bold'}}>Save</p></StyledButton>
        </Box>
      </Modal>

      </section>

  )
}
