import { Button } from "@mui/material"
import useStore from "../global/state"
import { useState, useEffect } from "react"
import axios from 'axios'

export default function NextPageBtn(){
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

  useEffect(() => {

    console.log('fetching')
    // axios.get('http://localhost:8080')
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.log(err))


    fetch('http://localhost:8080')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

  }, [])

    return(
      <div style={{display: `${display}`, justifyContent: 'flex-end'}}>
        <Button href="/captions" variant="contained" className="primary-btn">Next</Button>
      </div>
    )
}
