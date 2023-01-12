import {useEffect, useState} from "react";
import useStore from "../global/state"
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../styles/themes";
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

export default function MatchList(){
  const store = useStore(); 
  const [localTermList, setLocalTermList] = useState<string[]>([]);
  const [matchDict, setMatchDict] = useState({}) //does this need to be in state?
  const [finishedMatching, setFinishedMatching] = useState(false)

  //runs every time store.urlList is changed 
  useEffect(() => {
    setLocalTermList(store.termsList);
  }, [store.termsList]);

  //run once on component load
  useEffect(() => {
    //iterate through caption data
    //look for words or phrases within data
    //should we look for exacts or like 80% match?
    store.urlList.forEach(url => matchCaptions(localTermList, url.captions))
  }, [localTermList])
  

  //takes 2 params: timestamp, term
  //adds timestamp to the array for corresponding term in dictionary 
  function addToMatchDict(timestamp:number, term:string){
    if(matchDict[term] && !matchDict[term].includes(timestamp)){ //prevent duplicates
      const arr = matchDict[term]
      arr.push(timestamp)
    }
    //if term is empty, initialise it
    else {matchDict[term] = [timestamp]}
  }
  //takes string arr, loops through captions arr and finds matches
  function matchCaptions(terms:string[], captions:object[]){
      for(let i = 0; i < captions.length; i++){
        for(let j = 0; j < terms.length; j++){
          if(captions[i].text.includes(terms[j])){
            addToMatchDict(captions[i].start, terms[j])
            setFinishedMatching(true);
          }
        }
      }
  }

  return (
    <section id="url-list">
      {finishedMatching && Object.keys(matchDict).map(function(term, i){
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
      })}
    </section>
  );
}

