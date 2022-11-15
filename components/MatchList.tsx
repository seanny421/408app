import {useEffect, useState} from "react";
import useStore from "../global/state"
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../styles/themes";
import Paper  from "@mui/material/Paper";

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

export default function MatchList(){
  const store = useStore(); 
  const [localTermList, setLocalTermList] = useState<string[]>();
  const [localCaptionList, setLocalCaptionList] = useState<string[]>();

  //runs every time store.urlList is changed 
  useEffect(() => {
    setLocalTermList(store.termsList);
  }, [store.termsList]);

  return (
    <section id="url-list">
      {localTermList?.map(function(term, i){
        return(
          <Card className="url-list-" key={i}>
            <h3 className="url-link">{term}</h3>
            <div id="flex-container" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            </div>
          </Card>
        );
      })}
    </section>
  );
}

