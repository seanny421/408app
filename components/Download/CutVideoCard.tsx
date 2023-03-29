import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { lightTheme } from '../../styles/themes'
import { styled } from "@mui/system"
import {useEffect, useState} from 'react';
import useStore from '../../global/state';
import {DownloadedClip} from '../../global/types';
import { addToDB, removeFromDB, cutVideodDBContains } from '../../global/pouch.db'

interface CutVideoProps {
  vid: DownloadedClip, 
}

export default function CutVideoCard(props:CutVideoProps){
  const [selected, setSelected] = useState(false); //default is false
  const store = useStore()

  useEffect(() => {
    setAppropriateSelected()
  }, [])

  //check if we already have clip in db
  async function setAppropriateSelected(){
    const res = await cutVideodDBContains(props.vid)
    if(res.result){
      props.vid.id = res.id
      props.vid.rev = res.rev
    }
    setSelected(res.result)
  }

  //handles user selection
  async function toggleSelected(){
    if(selected){
      removeFromDB('cutVideos', props.vid)
    }
    else if(!selected){//if we don't have clip in db
      const res = await addToDB('cutVideos', props.vid)
      props.vid.id = res.split('`')[0];
      props.vid.rev = res.split('`')[1];
      console.log(props.vid)
    }
    setSelected(!selected)
  }

  const Card = styled('div')(({ theme }) => ({
    position: 'relative',
    boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
    borderRadius: '20px',
    // padding: '1rem',
    marginBottom: '2.5rem',
    background: theme === lightTheme ? '#fff': '#000',
    color: theme === lightTheme ? '#000': '#fff',
    border: `2px solid ${theme.palette.primary.main}`,
    width: '50%'
  }));

  const DivUnderlinedThemed = styled('div')(({ theme }) => ({
    paddingInline: '1rem',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    borderBottomWidth: '100%',
    marginBottom: '1rem',
  }));

  function createVideoUrl(buffer:ArrayBuffer){//create our url for video tag
    return String(URL.createObjectURL(new Blob([buffer], {type: 'video/mp4'})))
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
