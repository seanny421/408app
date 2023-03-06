import {useEffect, useState} from "react"
import {CutVideoObject} from "../../global/types"
import { CheckCircle, Cancel } from "@mui/icons-material"
import useStore from "../../global/state"

interface Props{
  video:CutVideoObject
}

export default function VideoSelectionItem(props:Props){
  const [inTimeline, setInTimeline] = useState<boolean>(false);
  const store = useStore()

  function handleToggle(){
    if(inTimeline)
      removeFromTimeline()
    else
      addToTimeline()
    setInTimeline(!inTimeline)
  }

  useEffect(() => {
    console.log(store.timelineVideos)
  }, [store.timelineVideos])
  
  function removeFromTimeline(){
    store.removeFromTimeline(props.video)
  }

  function addToTimeline(){
    store.addToTimeline(props.video)
  }


  return (
    // <Image layout="fill" key={i} src={createImage(video.doc.bufferData)} alt={'image'+i}/>
    <div style={{display: 'flex', alignItems: 'center'}}>
    <h4>{props.video.id}</h4>
    {inTimeline && <CheckCircle className="hover-cursor" style={{color:'green'}} onClick={handleToggle}/> }
    {!inTimeline && <Cancel className="hover-cursor" style={{color:'red'}} onClick={handleToggle}/> }

    </div>
  )
}
