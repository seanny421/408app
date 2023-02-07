import {useEffect, useState} from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useStore from "../../global/state";
import {DownloadQueueItem, TimestampObject} from "../../global/types";

interface Props {
  url:string,
  timestampData: TimestampObject[]
}

export default function AddToQueueRow(props:Props){
  const store = useStore()
  const [isInQueue, setIsInQueue] = useState<boolean>(false);

  useEffect(() => {
    console.log(store.downloadQueue)
    checkDownloadQueue()
  }, [store.downloadQueue])

  useEffect(() => {
    checkDownloadQueue()

  }, [])

  function checkDownloadQueue(){
    const queueItem = createQueueItem()
    setIsInQueue(downloadQueueContains(queueItem))
  }

  function toggleInQueue(){
    if(isInQueue)
      removeFromDownloadQueue()
    else
      addToDownloadQueue()
    setIsInQueue(!isInQueue)
  }

  function createQueueItem():DownloadQueueItem{
    return {
      url:props.url,
      timestampData: props.timestampData
    }
  }

  function addToDownloadQueue(){
    const queueItem = createQueueItem()
    if(!downloadQueueContains(queueItem))
      store.addToDownloadQueue(queueItem)
  }

  function removeFromDownloadQueue(){
    const queueItem = createQueueItem()
    store.removeFromDownloadQueue(queueItem)
  }
  
  //helper function for dowloadQueueContains
  //returns true if param 2 is in param 1
  function xContainsY(inputX:TimestampObject[], inputY:TimestampObject[]){
    //stringify inputs
    let x = JSON.stringify(inputX)
    let y = JSON.stringify(inputY)
    let z = y.replace('[', '').replace(']', '')
    return x.includes(z)
  }

  //check if given param is in download queue in global state
  function downloadQueueContains(item:DownloadQueueItem):boolean{
    let result = false;
    for(let i = 0; i < store.downloadQueue.length; i++){
      if(xContainsY(store.downloadQueue[i].timestampData, item.timestampData)){ //need to use this so we can avoid redownloading videos
        result = true;
      }
    }
    return result
  }

  return(
    <section>
    { isInQueue &&
      <div style={{display: 'flex', alignItems: 'center'}}>
        <CheckCircleIcon style={{color: 'green'}} className="hover-cursor" onClick={toggleInQueue}/>
        <h1 style={{margin: '1rem'}}>section currently in download queue</h1>
      </div>
    }

    { !isInQueue &&
      <div style={{display: 'flex', alignItems: 'center'}}>
        <CancelIcon style={{color: 'red'}} className="hover-cursor" onClick={toggleInQueue}/>
        <h1 style={{margin: '1rem'}}>section NOT currently in download queue</h1>
      </div>
    }
    </section>

  )
}
