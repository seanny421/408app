import { Input, InputAdornment, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import useStore from "../global/state";
import { lightTheme } from '../styles/themes'
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
          style={{border:`${store.isLight ? `1px solid ${lightTheme.palette.primary.main}`: 'none'}` , borderRadius: '100px', boxShadow: `${store.isLight ? `-5px 10px 17px -10px ${lightTheme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: ''}`}} 
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" onClick={addToUrlList} style={{borderRadius: 100}}><AddIcon/></Button>
            </InputAdornment>
            }  
          className='text-input text-input-home'/>
      </div>
  )

}
