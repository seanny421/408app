import {useEffect, useState} from "react";
import useStore from "../../global/state"
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../../styles/themes";
import { Button } from "@mui/material";

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '50px',
  paddingInline: '1rem',
  marginBottom: '1rem',
  marginRight: '1.5rem',
  background: `${theme == darkTheme ? '#000' : '#fff'}`,
  color: `${theme == darkTheme ? '#fff' : '#000'}`,
  ":hover": {
    //on hover flip background theme
    background: `${theme == darkTheme ? '#fff': '#000'}`,
    color: `${theme == darkTheme ? '#000': '#fff'}`,
    cursor: 'pointer'
  },
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
      <div data-testid="terms-card-container" style={{display: 'flex', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem'}}>
        {localList?.map(function(term, i){
          return(
            <Card className="" key={i}>
              <CancelIcon data-testid={`remove-btn-`+i} onClick={() => store.removeFromTermsList(term)} sx={removeBtnStyle(store.isLight)}/>
              <h3 className="">{term}</h3>
            </Card>
          );
        })}
      </div>
      <div data-testid="nextpage-btn-container" style={{display: `${localList?.length > 0 ? 'flex': 'none'}`, justifyContent: 'flex-end', position: 'absolute', right: 70}}>
        <Button href="/captions" variant="contained" className="primary-btn">Next</Button>
      </div>
    </section>
  );
}

