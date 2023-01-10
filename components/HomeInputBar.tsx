import { Input, InputAdornment, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import useStore from "../global/state";
import { lightTheme } from '../styles/themes'
import { useState } from "react";

export default function HomeInputBar(){
  const store = useStore();
  const [inputBarText, setInputBarText] = useState<string>("");

  function addToUrlList(){
    // store.addToUrlList(inputBarText);

    //get videoinformation
    getVidInformation(inputBarText);  

    //add to urllist if response is ok

    //report any errors to user


    //reset input
    setInputBarText("");
  }

  //from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
  function youtube_parser(url:string){ 
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return (match&&match[7].length==11)? match[7] : false;
  }

  async function getCaptionForId(vidId: string){
    return await fetch('http://localhost:8080?vidId='+vidId)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
  }

  async function getVidInformation(urlInput:string){
    const vidId = youtube_parser(urlInput);
    const captions = await getCaptionForId((vidId as string));
    const url = 'https://www.googleapis.com/youtube/v3/videos?id=' + vidId + '&key=' + process.env.NEXT_PUBLIC_API_KEY + '&part=snippet';  
    const res = await fetch(url)
    .then(res => res.json())
    .then(data => store.addToUrlList({videoInfo: data.items[0], url: urlInput, captions: captions}))
    .catch(err => console.log(err));

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
              <Button data-testid="submitbtn" variant="contained" onClick={addToUrlList} className="primary-btn"><AddIcon/></Button>
            </InputAdornment>
            }  
          className='text-input text-input-home'/>
      </div>
  )

}
