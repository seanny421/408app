import { useTheme } from "@emotion/react"
import { styled } from "@mui/system"
import Image from "next/image"
import { useEffect, useState } from "react"
import useStore from "../../global/state"
import { CutVideoObject } from "../../global/types"
import { darkTheme } from "../../styles/themes"

interface Props{
  video:CutVideoObject,
}

export default function VideoSelectionItem(props:Props){
  const store = useStore()
  const theme = useTheme()

  function addToTimeline(){
    store.addToTimeline(props.video)
  }

  function createVidUrl(buffer:ArrayBuffer){
    return String(URL.createObjectURL(new Blob([buffer], {type: 'video/mp4'})))
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
    marginLeft: '0.75rem'
  }));

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', borderBottom: `${theme === darkTheme ? '2px solid rgba(105, 105, 105, 0.1)': '2px solid rgba(105, 105, 105, 0.5)'}`}}>
      <video width='70%' controls src={createVidUrl(props.video.doc.bufferData)}/>
      <StyledButton data-testid="add-to-timeline-btn" onClick={addToTimeline}>Add to timeline</StyledButton>
    </div>
  )
}
