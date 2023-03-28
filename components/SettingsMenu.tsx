import { useTheme } from "@emotion/react";
import { Cancel, CheckCircle } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, FormControlLabel, Modal, Switch } from '@mui/material/';
import Link from 'next/link';
import { useState } from 'react';
import useStore from '../global/state';
import { darkTheme, lightTheme } from "../styles/themes";

const style = (isLight: boolean) => ({
  position: 'absolute' as 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: (!isLight) ? `2px solid ${darkTheme.palette.primary.main}`: `2px solid  ${lightTheme.palette.primary.main}`,
  borderRadius: 5,
  boxShadow: (!isLight) ? `0px 15px 17px -9px ${darkTheme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: `0px 13px 17px -9px ${lightTheme.palette.primary.main},0px 5px 25px 9px rgba(238,228,233,0.2)`,
  p: 4,
});

const helpStyles = (isLight: boolean) => ({
  position: 'absolute' as 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: (!isLight) ? `2px solid ${darkTheme.palette.primary.main}`: `2px solid  ${lightTheme.palette.primary.main}`,
  borderRadius: 5,
  boxShadow: (!isLight) ? `0px 15px 17px -9px ${darkTheme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: `0px 13px 17px -9px ${lightTheme.palette.primary.main},0px 5px 25px 9px rgba(238,228,233,0.2)`,
  p: 4,
});

const SettingsMenu: React.FunctionComponent = () => {
  const store = useStore(); //global state
  const handleClose = () => store.toggleSettings();
  const [helpShown, setHelpShown] = useState<boolean>(false)
  const theme = useTheme();

  function handleHelpToggle(){
    setHelpShown(!helpShown)
  }
  
  //returns the appropriate help messages depending on the page we are on
  //if we are deploying this we will need to use environmental variables for the url
  function ConditionalHelpRender(){
    if(window.location.href === 'http://localhost:3000/editor'){
      return(
        <div>
          <h2>How do I edit videos?</h2>
          <p>You can add multiple of your clips to the timeline</p>
          <p>Click and drag the timeline videos to change the order</p>
          <p>You can also trim the videos in the timeline to your desired length</p>
          <p>Your progress will automatically be saved as long as you don't clear cache for this site</p>
          <p>Once your finished, click the download button to save to your machine</p>
        </div>
      )
    }
    else if(window.location.href === 'http://localhost:3000/termsinput'){
      return(
        <div>
          <h2>Caption Search</h2>
          <p>Input any words that you wish to search the video for here</p>
          <p>You can enter multiple words if you wish as long as they are separated by a space</p>
          <p>Click 'NEXT' when you are ready to move on</p>
        </div>
      )
    }
    else if(window.location.href === 'http://localhost:3000/captions'){
      return(
        <div>
          <h2>Your Search Results</h2>
          <p>This page shows you the results of your caption search</p>
          <p>It is categorised by the words you inputed</p>
          <p>Click on the timestamp to open up the video at that time</p>
          <p>Add or remove the clip at that timestamp to the download queue</p>
          <p>Click 'NEXT' when you are ready to move on</p>
          <strong><p>It is recommended that you download an adblocker for your browser for ease of use - it allows you to bypass the youtube ads when viewing these clips</p></strong>
        </div>
      )
    }
    else if(window.location.href === 'http://localhost:3000/download'){
      return(
        <div>
          <h2>This page is dedicated to the downloaded clips you have selected</h2>
          <p>Please go through each clip and decide if you want to keep this for your edit</p>
          <p>You can toggle this by clicking the<CheckCircle/> or <Cancel/></p>
          <p>Click 'NEXT' when you are ready to move on</p>
        </div>
      )
    }
    else {
      return(
        <div>
          <h2>Welcome to Vashup</h2>
          <strong><p>Vashup is a tool to help you make parody & mashup videos, it allows you to perform caption search on any given youtube videos and allows you to edit the clips together</p></strong>
          <p>You can add as many youtube urls that you want to search through, <br/> copy and paste them into the search bar seperated by a space</p>
          <p>Once you think you're happy, click 'Next' to move on</p>
          <p>Your progress will automatically be saved as long as you don't clear cache for this site</p>
          <p>You can always come back and add more videos here</p>
        </div>
      )
    }
  }

  return(
    <section id='settingsmenu' data-testid="settingsmenu" className='settingsmenu'>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link href="/"><HomeIcon style={{cursor: 'pointer', margin: '10px'}}/></Link>
        <HelpIcon data-testid="helpicon" onClick={handleHelpToggle} style={{marginBottom: '10px', cursor: 'pointer', marginInline: '10px', opacity: 0.3}}/>
        <SettingsIcon data-testid="settingsicon" onClick={store.toggleSettings} style={{cursor: 'pointer', marginInline: '10px', opacity: store.shown ? 1.0 : 0.3}}/>
      </div>
      <Modal onClose={handleClose} open={store.shown}>
        <Box sx={style(store.isLight)}>
          <FormControlLabel style={{marginLeft:'auto', marginRight:'auto'}} label='Dark mode' control={<Switch checked={!store.isLight} onChange={store.toggleTheme}/>}/>
        </Box>
      </Modal>
      <Modal onClose={() => setHelpShown(false)} open={helpShown}>
        <Box sx={helpStyles(store.isLight)}>
          <CancelIcon onClick={() => setHelpShown(false)} sx={{color: theme.palette.primary.main}}/>
          <ConditionalHelpRender/>
        </Box>
      </Modal>
    </section>
  )
}


export default SettingsMenu;

