import {useEffect, useState} from "react";
import useStore from "../global/state"
import { Button } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';



export default function URL_List(){
  const store = useStore(); 
  const [localList, setLocalList] = useState<string[]>();
  useEffect(() => {
    setLocalList(store.urlList);
  }, [store.urlList]);
   

  return (
    <section id="url-list">
      {localList?.map(function(url, i){
        return(
          <div style={{display: 'flex'}} key={i}>
            <h1>{url}</h1>
            <Button variant="contained" onClick={() => store.removeFromUrlList(url)}><RemoveIcon/></Button>
          </div>
        );
      })}
    </section>
    
    
  );
}
