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
  const [matches, setMatches] = useState([]);
  const [matches2, setMatches2] = useState({});
  const [matchDict, setMatchDict] = useState({
    "shank":[5.02, 4.10]
    })

  //runs every time store.urlList is changed 
  useEffect(() => {
    setLocalTermList(store.termsList);
  }, [store.termsList]);

  useEffect(() => {
    //logging captions for dev
    store.urlList.forEach(url => console.log(url.captions))
  }, [store.urlList]);

  //run once on component load
  useEffect(() => {
    //iterate through caption data
    //look for words or phrases within data
    //should we look for exacts or like 80% match?
    store.urlList.forEach(url => matchCaptions(localTermList, url.captions))
  }, [localTermList])
  

  //takes string arr, loops through captions arr and finds matches
  function matchCaptions(terms:string[], captions:object[]){
      for(let j = 0; j < captions.length; j++){
        for(let i = 0; i < terms.length; i++){
          if(captions[j].text.includes(terms[i])){
            const timestamp = captions[j].start;
            console.log(matchDict[terms[i]])
            if(matchDict[terms[i]] && !matchDict[terms[i]].includes(timestamp)){
              const arr = matchDict[terms[i]]
              arr.push(timestamp)
            }
            else {
              matchDict[terms[i]] = [timestamp]
            }

          }
        }
      }
  }


  return (
    <section id="url-list">
      {localTermList?.map(function(term, i){
        return(
          <Card className="url-list-" key={i}>
            <h3 className="url-link">{term}</h3>
            <h4>{matchDict[term]}</h4>
            <div id="flex-container" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            </div>
          </Card>
        );
      })}

    </section>
  );
}

