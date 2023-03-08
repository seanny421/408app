import {CutVideoObject} from "../../global/types";
import Image from "next/image";
import VideoSelectionItem from "./VideoSelectionItem";
import { Paper } from "@mui/material";
import { darkTheme, lightTheme } from "../../styles/themes";
import { styled } from "@mui/system"

interface Props {
  videos: CutVideoObject[]
}


const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme === lightTheme ? `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: '',
  border: theme === lightTheme ? `2px solid ${theme.palette.primary.main}`: "",
  background: `${theme == darkTheme ? '' : '#fff'}`,
  color: `${theme == darkTheme ? '#fff' : '#000'}`,
  width: '40%', height: '100%', padding: '0.5rem', maxHeight: 480/2, minHeight: 480/2, overflow: 'auto', overflowX: 'hidden'
}));

export default function VideoSelectionList(props:Props){
  return (
    <StyledPaper>
      <div style={{width: '100%'}}>
        {props.videos.map(function(video: CutVideoObject, i:number){
          return(
            <VideoSelectionItem key={i} video={video}/>
          )
        })}
      </div>
    </StyledPaper>

  )

}
