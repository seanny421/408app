import { VideoObject } from "../../global/types"
import Image from "next/image"
import { styled } from "@mui/system"
import TimestampCard from "./TimestampCard";
import { Paper } from "@mui/material";

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

const PaperStyles = {
    "::-webkit-scrollbar":{
      backgroundColor: '#1f1e1f',
    },
    "::-webkit-scrollbar-track":{
      backgroundColor: '#1f1e1f',
    },
    "::-webkit-scrollbar-thumb":{
      backgroundColor: 'rgba(150, 153, 151, 0.1)',
      borderRadius: 2,
    }

}

export default function TimestampRow(props:Props){

  //generate a url that will autoplay vid at given time
  function getTimestampUrl(url:string, time:number){
    //typical url is https://youtube.com/watch?v=VIDEOID&ab_channel=CHANNELNAME 
    return "https://youtu.be/" + (url.split('?v=')[1].split('&')[0]) + '?t=' + time.toFixed(0);
  }

  return(
    <section>
      <CaptionListRowContainer>
        <div className="image-wrapper" style={{position: 'relative', height: 200, borderRadius: '10px', width:'30%', overflow: 'hidden'}}>
          <Image width={200} height={200} layout="fill"  objectFit="cover" style={{}} src={props.url.videoInfo.snippet.thumbnails.maxres.url} alt="some pic"/>
        </div>
        <div className="w-30" >
          <h1>{props.url.videoInfo.snippet.title}</h1>
        </div>
        <div className="w-30">
          <Paper sx={PaperStyles} className="custom-scrollbar" style={{maxHeight: 200, overflow: 'auto'}}>
            {props.timestamps && props.timestamps.map(function(timestamp:number, i:number){
              return(<TimestampCard key={i} timestamp={timestamp} url={getTimestampUrl(props.url.url, timestamp)}/>)
            })}
          </Paper>
        </div>
      </CaptionListRowContainer>
    </section>
  )
}
