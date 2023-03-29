import { TimestampObject, VideoObject } from "../../global/types"
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
  timestamps: TimestampObject[],
  vidObject: VideoObject,
  lastItem: boolean,
}

export default function TimestampRow(props:Props){
  return(
      <CaptionListRowContainer lastItem={props.lastItem} isMobile={window.innerWidth < 800}>
        <div className="image-wrapper" style={{width: 400, height: 200}}>
          <Image width={300} height={200} layout="fill" objectFit="cover" src={props.vidObject.videoInfo.snippet.thumbnails.maxres.url} alt="some pic"/>
        </div>
        <PaperContainer className="w-3">
          <Paper className="custom-scrollbar" style={{maxHeight: 200, overflow: 'auto'}}>
            {props.timestamps && props.timestamps.map(function(timestamp:TimestampObject, i:number){
              return(<TimestampCard timestampData={props.timestamps} key={i} timestamp={timestamp.start} url={props.vidObject.url}/>)
            })}
          </Paper>
        </PaperContainer>
      </CaptionListRowContainer>
  )
}
