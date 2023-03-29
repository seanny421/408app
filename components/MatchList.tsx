import {useEffect, useState} from "react";
import useStore from "../global/state"
import { lightTheme, darkTheme } from "../styles/themes";
import TermCard from "./Captions/TermCard";
import { MatchDictionary, TimestampObject } from "../global/types";
import NextPageBtn from "./NextPageBtn";

const removeBtnStyle = (isLight: boolean) => ({
  fontSize: 25, 
  position: 'absolute', 
  top: '10px', 
  left: '10px', 
  color: (isLight) ? `${lightTheme.palette.primary.main}` : `${darkTheme.palette.primary.main}`,
  cursor: 'pointer',
});

export default function MatchList(){
  const store = useStore(); 
  const [matchDict, setMatchDict] = useState<MatchDictionary>({}) //does this need to be in state?


  useEffect(() => {
    for(let i = 0; i < store.urlList.length; i++){
      matchCaptions(store.termsList, store.urlList[i], i)
    }
  }, [])
  
  //takes 2 params: timestamp, term
  function addToMatchDict(timestampData:TimestampObject, term:string, videoPos:number){
    //if dict[term] is empty then we initialise it
    if(matchDict[term] == null){
      matchDict[term] = {[videoPos]: {timestamps: [timestampData]}}
    }
    //if dict[term][videoPos] is empty then initialise it
    else if(matchDict[term][videoPos] == null){
      matchDict[term][videoPos] = {timestamps: [timestampData]}
    }
    //otherwise add our timestamps arr to dictionary
    else if(!matchDict[term][videoPos].timestamps.includes(timestampData)){
      matchDict[term][videoPos].timestamps.push(timestampData);
    }
  }

  //takes string arr, loops through captions arr and finds matches
  function matchCaptions(terms:string[], video, videoPos:number){
      //FIXME - is there a more efficient way to loop through this?
      for(let j = 0; j < terms.length; j++){
        for(let i = 0; i < video.captions?.length; i++){
          //if current term is in the video captions then add to matches dictionary
          if(video.captions[i].text.replace(/[,!?#%.]/g, "").toUpperCase().split(/[' '\n]/g).includes(terms[j].toUpperCase())){//this could be more advanced
            addToMatchDict(video.captions[i], terms[j], videoPos)
          }
        }
      }
  }

  return (
    <section id="url-list">
      {(Object.keys(matchDict).length < 1) && <h1>Loading</h1>}
      {Object.keys(matchDict).map(function(term, i){
        return(
          <div key={i}>
            <TermCard key={i} matchDict={matchDict} term={term} />
          </div>
        )
        })}
      {(Object.keys(matchDict).length > 0) && <NextPageBtn url="/download"/>}
    </section>
  );
}

