import { Input, InputAdornment, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import useStore from "../global/state";
import { lightTheme } from '../styles/themes'
import { useEffect, useState } from "react";

export default function TermInputBar(){
  const store = useStore();
  const [termInput, setTermInput] = useState<string>("");

  function addToTermsList(){
    store.addToTermsList(termInput);
    //report any errors to user


    //reset input
    setTermInput("");
  }

  useEffect(() => {
    console.log(store.termsList);
  }, [store.termsList])


  return (
      <div className='input-bar-container'>
        <Input 
          onChange={(e) => setTermInput(e.target.value)}
          value={termInput}
          placeholder="Enter words/phrases here"
          disableUnderline={true} 
          style={{border:`${store.isLight ? `1px solid ${lightTheme.palette.primary.main}`: 'none'}` , borderRadius: '100px', boxShadow: `${store.isLight ? `-5px 10px 17px -10px ${lightTheme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: ''}`}} 
          endAdornment={
            <InputAdornment position="end">
              <Button data-testid="addbtn" variant="contained" onClick={addToTermsList} className="primary-btn"><AddIcon/></Button>
            </InputAdornment>
            }  
          className='text-input text-input-home'/>
      </div>
  )

}
