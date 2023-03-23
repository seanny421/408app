import {CutVideoObject} from "../../global/types"
import useStore from "../../global/state"
import { useDrag, useDrop } from "react-dnd"
import { darkTheme } from "../../styles/themes"
import { styled } from "@mui/system"
import { useTheme } from "@mui/system"
import { Modal, Box, Button } from "@mui/material"
import {ChangeEvent, useEffect, useState} from "react"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
const LZString = require('lz-string')
const ffmpeg = createFFmpeg({
  // log: true,
})

interface Props {
  video: CutVideoObject,
  index: number
}

export default function TimelineItem(props:Props){
  const store = useStore()
  const theme = useTheme()
  const [trimMenuOpen, setTrimMenuOpen] = useState<boolean>(false)
  const [cutFrom, setCutFrom] = useState<string>('0') //default here is going to be 0
  const [cutTo, setCutTo] = useState<string>()

  useEffect(() => {
    console.log('TimlineItem.tsx has bufferData as string')
  }, [])

  const [{ isOver, canDrop }, drop] = useDrop(
      () => ({
        accept: 'Item',
        drop: (item:{indexFrom: number}) => {
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
    const buff = new Uint8Array(JSON.parse(LZString.decompress(props.video.doc.bufferData)))
    const url = String(URL.createObjectURL(new Blob([buff], {type: 'video/mp4'})))
    return url
  }

  function handleCutState(e:ChangeEvent<HTMLInputElement>, targetState:string){
    e.preventDefault()
    if(targetState === 'cutFrom')
      setCutFrom(e.target.value)
    else if(targetState === 'cutTo')
      setCutTo(e.target.value)
  }

  //trim our video based on cutFrom & cutTo state - set by user
  async function trimVideo(){
    //check if we have a cutTo, we don't need to worry about cutFrom as default is 0
    if(cutTo){
      const array = new Uint8Array(JSON.parse(LZString.decompress(props.video.doc.bufferData)))
      if(!ffmpeg.isLoaded())
        await ffmpeg.load()
      ffmpeg.FS('writeFile', 'tempTrimFile.mp4', await fetchFile(new Blob([array.buffer], {type: 'video/mp4'})))
      await ffmpeg.run('-i', 'tempTrimFile.mp4', '-ss', (cutFrom), '-t', (cutTo), '-y','-avoid_negative_ts','1','-acodec', 'copy', 'outputTrimFile.mp4')
      .then(() => {
        const outputFile = ffmpeg.FS('readFile', 'outputTrimFile.mp4')
        props.video.doc.bufferData = JSON.stringify(Array.from(new Uint8Array(outputFile.buffer)))
        store.trimTimelineElement(props.index, outputFile.buffer)
      })
    }

  }

  return (
      <section style={{background: `${isOver ? theme.palette.primary.main : ''}`, opacity: `${isOver ? '0.3': '1'}`,  borderRight: '2px solid rgba(105, 105, 105, 0.1)', padding: '1rem'}}>
      <div ref={drag} style={{margin: '0.5rem', opacity: isDragging ? '0.5': '1'}}>
        <div ref={drop}>
          <div className="thumbnail-container">
            <img src={store.timelineImages[props.index]} style={{width: '200px', minHeight: '100px'}} alt={'timeline-thumbnail-image-' + props.index}/>
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
              <input value={cutFrom} onChange={(e) => handleCutState(e, 'cutFrom')} type="number" />
              <h4>Cut to (seconds)</h4>
              <input onChange={(e) => handleCutState(e, 'cutTo')} type="number" />
            </div>
          </div>
          <StyledButton onClick={trimVideo} style={{margin: '1rem', paddingInline: '2rem'}}><p style={{fontWeight: 'bold'}}>Save</p></StyledButton>
        </Box>
      </Modal>

      </section>

  )
}
