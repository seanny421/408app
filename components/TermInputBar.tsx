import { Input, InputAdornment, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import useStore from "../global/state";
import { lightTheme } from '../styles/themes'
import { useState } from "react";
import { FormEvent } from "react";

interface Props {
  isLight: boolean
}

export default function TermInputBar(props:Props){
  const store = useStore();
  const [termInput, setTermInput] = useState<string>("");

  //optional parameter if user presses "enter" to submit form
  function addToTermsList(e?:FormEvent){
    e?.preventDefault()//prevent page reload
    if(termInput.split(' ').length > 1 && termInput.split(' ')[1] != ''){
      termInput.split(' ').forEach((term) => {
        store.addToTermsList(term)
      })
    }
    else 
      store.addToTermsList(termInput);
    //report any errors to user
    //reset input
    setTermInput("");
  }

  return (
      <form onSubmit={(e) => addToTermsList(e)} className='input-bar-container'>
        <Input 
          onChange={(e) => setTermInput(e.target.value)}
          value={termInput}
          placeholder="Enter words/phrases here"
          disableUnderline={true} 
          style={{border:`${props.isLight ? `1px solid ${lightTheme.palette.primary.main}`: 'none'}` , borderRadius: '100px', boxShadow: `${store.isLight ? `-5px 10px 17px -10px ${lightTheme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: ''}`}} 
          endAdornment={
            <InputAdornment position="end">
              <Button data-testid="addbtn" variant="contained" onClick={addToTermsList} className="primary-btn"><AddIcon/></Button>
            </InputAdornment>
            }  
          className='text-input text-input-home'/>
      </form>
  )

}
