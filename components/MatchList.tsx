import {useEffect, useState} from "react";
import useStore from "../global/state"
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../styles/themes";
import TermCard from "./Captions/TermCard";
import Paper  from "@mui/material/Paper";

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  borderRadius: '20px',
  padding: '1rem',
  marginBottom: '1rem',
  background: '#000',
  color: '#fff'
}));


const removeBtnStyle = (isLight: boolean) => ({
  fontSize: 25, 
  position: 'absolute', 
  top: '10px', 
  left: '10px', 
  color: (isLight) ? `${lightTheme.palette.primary.main}` : `${darkTheme.palette.primary.main}`,
  cursor: 'pointer',
});

interface MatchDictionary {
  [term: string]: {
    [videoId: string]: {
      timestamps: number[]
    }
  }
}

export default function MatchList(){
  const store = useStore(); 
  const [localTermList, setLocalTermList] = useState<string[]>([]);
  const [matchDict, setMatchDict] = useState<MatchDictionary>({}) //does this need to be in state?
  const [finishedMatching, setFinishedMatching] = useState(false)

  //runs every time store.urlList is changed 
  // useEffect(() => {
  //   setLocalTermList(store.termsList);
  // }, [store.termsList]);

  useEffect(() => {
    for(let i = 0; i < store.urlList.length; i++){
      console.log(store.urlList[i])
      matchCaptions(store.termsList, store.urlList[i], i)
    }
  }, [])

  
  function addToMatchDict2(timestamp:number, term:string, videoPos:number){
    console.log(term)
    if(matchDict[term] == null){
      console.log("MATCHDICT[TERM] IS NULL")
      console.log(videoPos)
      console.log([timestamp])
      matchDict[term] = {[videoPos]: {timestamps: [timestamp]}}
    }
    else if(matchDict[term][videoPos] == null){
      matchDict[term][videoPos] = {timestamps: [timestamp]}
    }
    else if(!matchDict[term][videoPos].timestamps.includes(timestamp)){
      matchDict[term][videoPos].timestamps.push(timestamp);
      // arr.push(timestamp)
      console.log('yo ' + term + ' ' + videoPos)
    }
    console.log(matchDict[term])
    console.log('\n')
  }

  //takes 2 params: timestamp, term
  //adds timestamp to the array for corresponding term in dictionary 
  function addToMatchDict(timestamp:number, term:string, videoPos:number){
    if(matchDict[term] && matchDict[term][videoPos] && !matchDict[term][videoPos].timestamps.includes(timestamp)){ //prevent duplicates
      const arr = matchDict[term][videoPos].timestamps;
      arr.push(timestamp)
    }
    //if term is empty, initialise it
    // else {matchDict[term][videoPos].timestamps = [timestamp]}
    else {
      matchDict[term] = {[videoPos]: {timestamps: [timestamp]}}
    }
    // console.log(matchDict)
  }
  //takes string arr, loops through captions arr and finds matches
  function matchCaptions(terms:string[], video, videoPos:number){
      console.log("VIDEOPOS" + videoPos)

      for(let j = 0; j < terms.length; j++){
        for(let i = 0; i < video.captions.length; i++){
          // console.log(video.captions[i].text.includes(terms[j]))
          //if current term is in the video captions then 
          //add to matches dictionary
          if(video.captions[i].text.includes(terms[j])){
            console.log("HERE" + videoPos)
            addToMatchDict2(video.captions[i].start, terms[j], videoPos)
          }
        }
      }
      console.log(matchDict)
  }

  return (
    <section id="url-list">
      {Object.keys(matchDict).map(function(term, i){
        return(
          <div key={i}>
            <TermCard key={i} matchDict={matchDict} term={term} />
          </div>
        )
        })}
      {/*finishedMatching && Object.keys(matchDict).map(function(term, i){
        return(
          <Card className="url-list-" key={i}>
            <h3 className="">{term}</h3>
            <h4>Timestamps it appears:</h4>
            {matchDict[term]?.map(function(timestamp, i){
              return(<h4 key={i}>{timestamp}</h4>)
            })}
            <div id="flex-container" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            </div>
          </Card>
        );
      })*/}
    </section>
  );
}

