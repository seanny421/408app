import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from "@mui/system";
import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "../../global/state";
import { DownloadQueueItem, TimestampObject } from "../../global/types";

const TimestampList = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '1rem',
  justifyContent: 'center',
}));

interface Props {
  timestamp: number,
  key: number,
  url: string,
  timestampData: TimestampObject[]
}

function getTimestampUrl(url:string, time:number){
  //typical url is https://youtube.com/watch?v=VIDEOID&ab_channel=CHANNELNAME 
  return "https://youtu.be/" + (url.split('?v=')[1].split('&')[0]) + '?t=' + time.toFixed(0);
}

//takes our timestamp number in seconds and returns  
//string in format x minutes x seconds
function formatTimestamp(timestamp: number):string{
  let timestampString = ""; 
  const splitDecimalArr = (timestamp/60).toString().split(".")
  if(splitDecimalArr.length > 1)
    timestampString = splitDecimalArr[0] + "m " + (Number("0." + splitDecimalArr[1])*60).toFixed(0) + "s"
  else
    timestampString = splitDecimalArr[0] + "m " + Number("0") + "s"

  return timestampString;
}

const CustomSection = styled('section')(({ theme }) => ({
  display: 'flex',
  padding: '0.5rem',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.primary.main}`
}));

export default function TimestampCard(props:Props){
  const [isInQueue, setIsInQueue] = useState<boolean>(false);//is our timestamp clip already in queue
  const store = useStore()

  useEffect(() => {
    checkDownloadQueue()
  }, [store.downloadQueue])

  useEffect(() => {
    checkDownloadQueue()
  }, [])

  //checking our download queue to see if we already have clip in queue
  function checkDownloadQueue(){
    const queueItem = createQueueItem()
    setIsInQueue(downloadQueueContains(queueItem))
  }

  //toggles if our clip is in the download queue
  function toggleInQueue(){
    if(isInQueue)
      removeFromDownloadQueue()
    else
      addToDownloadQueue()
    setIsInQueue(!isInQueue)
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

  //helper function, creates appropriate object to be used
  function createQueueItem():DownloadQueueItem{
    return {
      url:props.url,
      timestampData: props.timestampData.filter(t => t.start === props.timestamp)
    }
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

  //helper function for dowloadQueueContains
  //returns true if param 2 is in param 1
  function xContainsY(inputX:TimestampObject[], inputY:TimestampObject[]){
    //stringify inputs
    let x = JSON.stringify(inputX)
    let y = JSON.stringify(inputY)
    let z = y.replace('[', '').replace(']', '')
    return x.includes(z)
  }

  return(
    <CustomSection>
      {isInQueue &&
        <div style={{display: 'flex', alignItems: 'center'}}>
          <CheckCircleIcon data-testid="CheckCircleIcon" style={{color: 'green'}} className="hover-cursor" onClick={toggleInQueue}/>
        </div>
      }
      {!isInQueue &&
        <CancelIcon data-testid="CancelIcon" className="hover-cursor" style={{color: 'red'}} onClick={toggleInQueue}/> 
      }
      <Link href={getTimestampUrl(props.url, props.timestamp)} className="link" passHref style={{width: '80%'}}>
        <a target="blank" rel="noopener noreferrer">
          <TimestampList style={{display: 'flex', padding: '1rem', width: '100%', justifyContent: 'center'}}>
            <strong style={{fontSize: '1.2rem'}} className="link-text">{formatTimestamp(props.timestamp)}</strong>
          </TimestampList>
        </a>
      </Link>
    </CustomSection>
  )
}
