import { Button } from "@mui/material"
import useStore from "../global/state"
import { useState, useEffect } from "react"

interface Props {
  url:string
}

export default function NextPageBtn(props:Props){
  const store = useStore()
  const [display, setDisplay] = useState('none');

  //make sure we're not showing btn if no urls been given
  //runs once every time urlList is updated
  useEffect(() => {
    if(store.urlList.length < 1)
      setDisplay('none')
    else
      setDisplay('flex')
  }, [store.urlList]);

    return(
      <div style={{display: `${display}`, justifyContent: 'flex-end'}}>
        <Button href={props.url} variant="contained" className="primary-btn">Next</Button>
      </div>
    )
}
