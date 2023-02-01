import {useEffect, useState} from "react";
import SelectionListItem from "./SelectionListItem";
import { EditorComponentProps } from "../../../global/types";


export default function VideoSelectionList(props:EditorComponentProps){
  //temp list REMOVE FOR PRODUCTION
  const [videoList, setVideoList] = useState<File[]>([]);

  function addToList(videoElement:File){
    setVideoList([...videoList, videoElement])
  }

  useEffect(() => {
    console.log(videoList)
  }, [videoList])

  return(
  <div>
    <input type="file" onChange={(e) => addToList(e.target.files.item(0))}/>
    <h1>VideoSelectionList</h1>
    {videoList.map(function(file, i){
      return(
        <div key={i}>
          <SelectionListItem file={file}/>
        </div>
      )
    })}
  </div>
  );
}
