import useStore from "../../global/state"
import { VideoObject } from "../../global/types"
import Image from "next/image"
import { styled } from "@mui/system"
import TimestampCard from "./TimestampCard";
import { List, Paper } from "@mui/material";

const CaptionListRowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  marginTop: '1rem'
}));

interface Props {
  timestamps: number[],
  url: VideoObject,
}


export default function TimestampRow(props:Props){

  function getTimestampUrl(url:string, time:number){
    // console.log(url.split('?v=')[1].split('&')[0])
    return "https://youtu.be/" + (url.split('?v=')[1].split('&')[0]) + '?t=' + time.toFixed(0);

  }
  return(

    <section>
      <CaptionListRowContainer>
        <div className="captionslist-image-container image-wrapper" style={{position: 'relative', height: 200, borderRadius: '10px', width:'30%', overflow: 'hidden'}}>
          <Image width={200} height={200} layout="fill"  objectFit="cover" style={{}} src={props.url.videoInfo.snippet.thumbnails.maxres.url} alt="some pic"/>
        </div>
        <div style={{width: '30%'}}>
          <h1>{props.url.videoInfo.snippet.title}</h1>
        </div>
        <div style={{width: '30%'}}>
          <Paper className="" style={{maxHeight: 200, overflow: 'auto'}}>
            {props.timestamps && props.timestamps.map(function(timestamp:number, i:number){
              return(
                  <TimestampCard key={i} timestamp={timestamp} url={getTimestampUrl(props.url.url, timestamp)}/>
              )
            })}
          </Paper>

        </div>
      </CaptionListRowContainer>
    </section>
  )
}
