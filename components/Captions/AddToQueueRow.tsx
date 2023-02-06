import CancelIcon from '@mui/icons-material/Cancel';
import { useState, useEffect } from 'react';
import useStore from '../../global/state';
import {DownloadQueueItem, TimeStampObject} from '../../global/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Props {
  url:string,
  timestampData: TimeStampObject[]
}

export default function AddToQueueRow(props:Props){
  const store = useStore()
  const [isInQueue, setIsInQueue] = useState<boolean>(false);

  useEffect(() => {
    checkDownloadQueue()
  }, [store.downloadQueue])

  //run once on component load
  useEffect(() => {
    checkDownloadQueue()
  }, []) 

  function checkDownloadQueue(){
    const queueItem = {
      url: props.url,
      timestampData: props.timestampData
    }
    setIsInQueue(downloadQueueContains(queueItem))
  }



  function downloadQueueContains(item:DownloadQueueItem):boolean{
    let result = false;
    for(let i = 0; i < store.downloadQueue.length; i++){
      if(JSON.stringify(store.downloadQueue[i]) === JSON.stringify(item))
        result = true;
    }
    return result;
  }


  function toggleInQueue(){
    const queueItem = {
      url: props.url,
      timestampData: props.timestampData
    }
    console.log(queueItem)
    if(isInQueue)
      removeFromDownloadQueue(queueItem)
    else
      addToDownloadQueue(queueItem)

    setIsInQueue(!isInQueue);
  }

  function addToDownloadQueue(item:DownloadQueueItem){
    if(!downloadQueueContains(item))//check if we already have it in queue
      store.addToDownloadQueue(item)
  }

  function removeFromDownloadQueue(item:DownloadQueueItem){
    store.removeFromDownloadQueue(item)
  }

  return (
    <section>
      { !isInQueue &&
        <div style={{display: 'flex', alignItems: 'center'}}>
          <CancelIcon style={{color: 'red'}} className="hover-cursor" onClick={toggleInQueue}/>
          <h1 style={{margin: '1rem'}}>Video NOT currently in download queue</h1>
        </div>
      }
      { isInQueue &&
        <div style={{display: 'flex', alignItems: 'center'}}>
          <CheckCircleIcon style={{color: 'green'}} className="hover-cursor" onClick={toggleInQueue}/>
          <h1 style={{margin: '1rem'}}>Video currently in download queue</h1>
        </div>
      }
    </section>
  )
}
