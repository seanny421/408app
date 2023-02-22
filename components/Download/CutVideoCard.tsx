import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { lightTheme } from '../../styles/themes'
import { styled } from "@mui/system"
import {useEffect, useState} from 'react';
import useStore from '../../global/state';
import {DownloadedClip} from '../../global/types';
import { compress, decompress } from '@amoutonbrady/lz-string'

interface CutVideoProps {
  vid: DownloadedClip, 
}

export default function CutVideoCard(props:CutVideoProps){
  const [selected, setSelected] = useState(false); //default is false
  const store = useStore()

  useEffect(() => {
    setSelected(downloadClipContains(props.vid))
  }, [])

  function downloadClipContains(item: DownloadedClip):boolean{
    let result = false;
    for(let i = 0; i < store.downloadedClips.length; i++){
      if(JSON.stringify(store.downloadedClips[i].timestamp) === JSON.stringify(item.timestamp))
        result = true;
    }
    return result
  }

  function toggleSelected(){
    console.log(selected)
    if(selected){
      console.log('removing')
      store.removeFromDownloadedClips(props.vid)
    }
    else if(!selected)
      store.addToDownloadedClips(props.vid)
    setSelected(!selected)
  }

  //FIXME - used for testing
  useEffect(() => {
    console.log(store.downloadedClips)
  }, [store.downloadedClips])

  const Card = styled('div')(({ theme }) => ({
    position: 'relative',
    boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
    borderRadius: '20px',
    // padding: '1rem',
    marginBottom: '2.5rem',
    background: theme === lightTheme ? '#fff': '#000',
    color: theme === lightTheme ? '#000': '#fff',
    border: `2px solid ${theme.palette.primary.main}`,
    width: '90%'
  }));

  const DivUnderlinedThemed = styled('div')(({ theme }) => ({
    paddingInline: '1rem',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    borderBottomWidth: '100%',
    marginBottom: '1rem',
  }));

  function createVideoUrl(buffer:string){
    const x = new Uint8Array((decompress(buffer)).split(','))
    console.log(x)
    console.log(URL.createObjectURL(new Blob([x.buffer], {type: 'video/mp4'})))
    return String(URL.createObjectURL(new Blob([x.buffer], {type: 'video/mp4'})))
  }

  return (
      <Card>
        <div>
        { selected &&
          <DivUnderlinedThemed style={{display: 'flex', alignItems: 'center'}}>
            <CheckCircleIcon style={{color: 'green'}} className="hover-cursor" onClick={toggleSelected}/> 
            <h2>Keep this clip</h2>
          </DivUnderlinedThemed>
        }
        
        { !selected &&
          <DivUnderlinedThemed style={{display: 'flex', alignItems: 'center'}}>
            <CancelIcon style={{color: 'red'}} onClick={toggleSelected}/> 
            <div style={{display: 'flex', alignItems: 'center', marginInline: '0.5rem'}}>
              <h2>Discard this clip</h2>
              <h3 style={{opacity: '0.5'}}>(removed)</h3>
            </div>
          </DivUnderlinedThemed>
        }

        </div>
        <video style={{padding: '1rem', width: '100%'}} controls src={createVideoUrl(props.vid.bufferData)} />
      </Card>


  )

}
