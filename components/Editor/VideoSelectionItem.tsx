import {useEffect, useState} from "react"
import {CutVideoObject} from "../../global/types"
import useStore from "../../global/state"
import Image from "next/image"

interface Props{
  video:CutVideoObject,
}

export default function VideoSelectionItem(props:Props){
  const store = useStore()

  function addToTimeline(){
    store.addToTimeline(props.video)
  }

  function createVidUrl(buffer:ArrayBuffer){
    return String(URL.createObjectURL(new Blob([buffer], {type: 'video/mp4'})))
  }

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
    <video width='70%' controls src={createVidUrl(props.video.doc.bufferData)}/>
    <button onClick={addToTimeline}>Add</button>

    </div>
  )
}
