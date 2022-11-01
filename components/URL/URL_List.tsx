import {useEffect, useState} from "react";
import useStore from "../../global/state"
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../../styles/themes";
import Paper  from "@mui/material/Paper";
import Thumbnail from "./Thumbnail";
import { UrlObject } from "../../global/types";

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  borderRadius: '20px',
  padding: '1rem',
  marginBottom: '1rem',
  background: '#000',
  color: '#fff'
}));


const removeBtnStyle = (isLight: boolean) => ({
  fontSize: 25, 
  position: 'absolute', 
  top: '10px', 
  left: '10px', 
  color: (isLight) ? `${lightTheme.palette.primary.main}` : `${darkTheme.palette.primary.main}`,
  cursor: 'pointer',
});

export default function URL_List(){
  const store = useStore(); 
  const [localList, setLocalList] = useState<UrlObject[]>();

  //runs every time store.urlList is changed 
  useEffect(() => {
    setLocalList(store.urlList);
  }, [store.urlList]);

  return (
    <section id="url-list">
      {localList?.map(function(url, i){
        return(
          <Card className="url-list-" key={i}>
            <h3 className="url-link"><a href={'#'} target="_blank" rel="noreferrer">{url.videoInfo.snippet.title}</a></h3>
            <CancelIcon onClick={() => store.removeFromUrlList(url)} sx={removeBtnStyle(store.isLight)}/>
            <div id="flex-container" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <div style={{width: '50%'}}>
                <Thumbnail imageURL={url.videoInfo.snippet.thumbnails.maxres.url}/>
              </div>
              <Paper style={{width: '50%', backgroundColor: 'rgba(39,39,39,255)', borderRadius: '20px', padding: '0.5rem', maxHeight: 480/2, minHeight: 480/2, overflow: 'auto', overflowX: 'hidden'}}>
                <p style={{color: 'white'}}>{url.videoInfo.snippet.description}</p>
              </Paper>
            </div>
          </Card>
        );
      })}
    </section>
  );
}

