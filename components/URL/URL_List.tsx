import {useEffect, useState} from "react";
import useStore from "../../global/state"
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../../styles/themes";

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
  const [localList, setLocalList] = useState<string[]>();

  //runs every time store.urlList is changed 
  useEffect(() => {
    setLocalList(store.urlList);
  }, [store.urlList]);

  return (
    <section id="url-list">
      {localList?.map(function(url, i){
        return(
          <Card className="url-list-" key={i}>
            <h3 className="url-link"><a href={url} target="_blank" rel="noreferrer">{url}</a></h3>
            <CancelIcon onClick={() => store.removeFromUrlList(url)} sx={removeBtnStyle(store.isLight)}/>
          </Card>
        );
      })}
    </section>
  );
}

