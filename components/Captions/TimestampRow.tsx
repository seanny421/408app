import { VideoObject } from "../../global/types"
import Image from "next/image"
import { styled } from "@mui/system"
import TimestampCard from "./TimestampCard";
import { Paper } from "@mui/material";
import { lightTheme } from "../../styles/themes";

interface RootProps {
  lastItem?: boolean;
  isMobile?: boolean;
}

const CaptionListRowContainer = styled('div', {shouldForwardProp:(prop) => prop !== 'lastItem' && prop !== 'isMobile'})<RootProps>(({ theme, lastItem, isMobile }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'relative',
  marginTop: '1rem',
  borderBottom: !lastItem ? `2px solid ${theme.palette.primary.main}` : 'none',
  paddingBottom: !lastItem ? '1.5rem' : '',
}));

const PaperContainer = styled('div')(({ theme }) => ({
  width: window.innerWidth > 800 ? 200 : 400, 
  padding: '0.1rem', 
  borderRadius: 10, 
  border: theme == lightTheme ? `2px solid ${theme.palette.primary.main}`: '',
  "*::-webkit-scrollbar-thumb":{
    backgroundColor: `${theme == lightTheme ? 'rgba(150, 153, 151, 1)': 'rgba(150, 153, 151, 0.1)'}`,
    borderRadius: 100,
  },
}));

interface Props {
  timestamps: number[],
  url: VideoObject,
  lastItem: boolean,
}

const PaperStyles = {
    "::-webkit-scrollbar":{
      backgroundColor: 'rgba(0,0,0,0)',
      borderRadius: 2,
    },
    "::-webkit-scrollbar-track":{
      backgroundColor: 'rgba(0,0,0,0)',
      borderRadius: 2,
    },
    // "::-webkit-scrollbar-thumb":{
    //   backgroundColor: 'primary.main',
    //   // backgroundColor: 'rgba(150, 153, 151, 0.1)',
    //   borderRadius: 2,
    // }
}

export default function TimestampRow(props:Props){
  //generate a url that will autoplay vid at given time
  function getTimestampUrl(url:string, time:number){
    //typical url is https://youtube.com/watch?v=VIDEOID&ab_channel=CHANNELNAME 
    return "https://youtu.be/" + (url.split('?v=')[1].split('&')[0]) + '?t=' + time.toFixed(0);
  }

  return(
      <CaptionListRowContainer lastItem={props.lastItem} isMobile={window.innerWidth < 800}>
        <div className="image-wrapper" style={{width: 400, height: 200}}>
          <Image width={300} height={200} layout="fill" objectFit="cover" src={props.url.videoInfo.snippet.thumbnails.maxres.url} alt="some pic"/>
        </div>
        <PaperContainer className="w-3">
          <Paper className="custom-scrollbar" style={{maxHeight: 200, overflow: 'auto'}}>
            {props.timestamps && props.timestamps.map(function(timestamp:number, i:number){
              return(<TimestampCard key={i} timestamp={timestamp} url={getTimestampUrl(props.url.url, timestamp)}/>)
            })}
          </Paper>
        </PaperContainer>
      </CaptionListRowContainer>
  )
}
