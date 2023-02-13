import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { lightTheme } from '../../styles/themes'
import { styled } from "@mui/system"
import {useEffect, useState} from 'react';
import useStore from '../../global/state';
interface CutVideoProps {
  vid: string, 
}

export default function CutVideoCard(props:CutVideoProps){
  const [selected, setSelected] = useState(true);
  const store = useStore()

  function toggleSelected(){
    store.removeFromDownloadedClips(props.vid)
    setSelected(!selected)
  }

  //FIXME - used for testing
  // useEffect(() => {
  //   console.log(store.downloadedClips)
  // }, [store.downloadedClips])

  const Card = styled('div')(({ theme }) => ({
    position: 'relative',
    boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
    borderRadius: '20px',
    // padding: '1rem',
    marginBottom: '2.5rem',
    background: theme === lightTheme ? '#fff': '#000',
    color: theme === lightTheme ? '#000': '#fff',
    border: `2px solid ${theme.palette.primary.main}`
  }));

  const DivUnderlinedThemed = styled('div')(({ theme }) => ({
    paddingInline: '1rem',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    borderBottomWidth: '100%',
    marginBottom: '1rem',
  }));

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
        <video style={{padding: '1rem'}} controls src={props.vid} />

      </Card>


  )

}
