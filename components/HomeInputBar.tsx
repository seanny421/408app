import { Input, InputAdornment, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import useStore from "../global/state";
import { lightTheme } from '../styles/themes'
import { useState, useEffect } from "react";

export default function HomeInputBar(){
  const store = useStore();
  const [inputBarText, setInputBarText] = useState("");
  const [responseData, setResponseData] = useState();

  function addToUrlList(){
    store.addToUrlList(inputBarText);
    setInputBarText("");
    getVidInformation(inputBarText); 
  }

  //from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
  function youtube_parser(url:string){ 
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return (match&&match[7].length==11)? match[7] : false;
  }

  async function getVidInformation(urlInput:string){
    const vidId = youtube_parser(urlInput);
    const url = 'https://www.googleapis.com/youtube/v3/videos?id=' + vidId + '&key=' + process.env.NEXT_PUBLIC_API_KEY + '&part=snippet';  
    // const url = 'https://www.googleapis.com/youtube/v3/videos?id=XxfkIwoj2aM&ab_&key=AIzaSyDFpr-xF2rKyt72CkNFQC8I7YtQKrzz-dI&part=snippet'
    // const res = await window.fetch("https://www.googleapis.com/youtube/v3/videos?id="+ vidId + "&key=" + process.env.NEXT_PUBLIC_API_KEY);
    const res = await fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.items[0].snippet.title));
    // const {data, errors} = await res.json();
    // if(res.ok){
    //   console.log(data.title);

    // }
    // setResponseData(data);
  }

  useEffect(() => {
    console.log(responseData);
  }, [responseData]);


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
