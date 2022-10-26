import { Input, InputAdornment, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import useStore from "../global/state";
import { useState } from "react";

export default function HomeInputBar(){
  const store = useStore();
  const [inputBarText, setInputBarText] = useState("");

  function addToUrlList(){
    store.addToUrlList(inputBarText);
    setInputBarText("");
  }

  return (
      <div className='input-bar-container'>
        <Input 
          onChange={(e) => setInputBarText(e.target.value)}
          value={inputBarText}
          placeholder="Enter url here"
          disableUnderline={true} 
          style={{borderRadius: '100px', border: `${store.isLight ? '2px solid red': ''}`}} 
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" onClick={addToUrlList} style={{borderRadius: 100}}><AddIcon/></Button>
            </InputAdornment>
            }  
          className='text-input text-input-home'/>
      </div>
  )

}
