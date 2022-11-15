import {useEffect, useState} from "react";
import useStore from "../../global/state"
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../../styles/themes";
import { Button } from "@mui/material";

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  borderRadius: '50px',
  padding: '1rem',
  marginBottom: '1rem',
  marginRight: '1.5rem',
  background: '#000',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));


const removeBtnStyle = (isLight: boolean) => ({
  fontSize: 20, 
  // position: 'absolute', 
  // top: '10px', 
  // right: '5px', 
  color: (isLight) ? `${lightTheme.palette.primary.main}` : `${darkTheme.palette.primary.main}`,
  cursor: 'pointer',
  marginRight: '0.5rem',
});

export default function TermList(){
  const store = useStore(); 
  const [localList, setLocalList] = useState<string[]>();

  //runs every time store.urlList is changed 
  useEffect(() => {
    setLocalList(store.termsList);
  }, [store.termsList]);

  return (
    <section id="term-list">
      <div style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem'}}>
        {localList?.map(function(term, i){
          return(
            <Card className="" key={i}>
              <CancelIcon onClick={() => store.removeFromTermsList(term)} sx={removeBtnStyle(store.isLight)}/>
              <h3 className="url-link">{term}</h3>
            </Card>
          );
        })}
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 70}}>
        <Button href="/captions" variant="contained" className="primary-btn">Next</Button>
      </div>
    </section>
  );
}

