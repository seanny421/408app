import {useEffect, useState} from "react";
import useStore from "../../global/state"
import { Button } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from "@mui/system"

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  borderRadius: '20px',
  padding: '1rem',
  marginBottom: '1rem',
  background: '#000',
  color: '#fff'
}));

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
            <Button className='remove-url-btn' variant="contained"  onClick={() => store.removeFromUrlList(url)}><RemoveIcon/></Button>
          </Card>
        );
      })}
    </section>
  );
}

