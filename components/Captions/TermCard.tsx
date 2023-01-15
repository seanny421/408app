import useStore from "../../global/state";
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../styles/themes";
import TimestampCard from "./TimestampCard";
import {useEffect, useState} from "react";
import TimestampRow from "./TimestampRow";

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  borderRadius: '20px',
  padding: '1rem',
  marginBottom: '1rem',
  background: `${theme.palette.background.default}`,
  color: `${theme.palette.mode == 'light' ? '#000' : '#fff'}`,
  // border: `${theme.palette.mode == 'light' ? `2px solid ${theme.palette.primary.main}` : 'none'}`
  border: `2px solid ${theme.palette.primary.main}`
}));

const TermHeadingContainer = styled('div')(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  // margin: '1rem',
  alignItems: 'center',
  borderBottom: `2px solid ${theme.palette.primary.main}`
}));

const MatchesCountHeading = styled('h3')(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main}`,
  paddingInline: '2rem',
  borderRadius: 100,
}));

interface Props {
  key: number,
  term: string,
  matchDict: MatchDictionary,
}

interface MatchDictionary {
  [term: string]: {
    [videoId: number]: {
      timestamps: number[]
    }
  }
}

export default function TermCard(props:Props){
  const store = useStore();

  useEffect(() => {
    // for(let i = 0; i < store.urlList.length; i++){
    //   console.log(store.urlList[i].videoInfo.snippet.title)
    //   console.log(props.matchDict[props.term][i]?.timestamps)
    // }

  }, [])
  return(
      <section key={props.key}>
        <Card className="url-list-card" >
          <div style={{margin: '1rem'}}>
            <TermHeadingContainer className="term-heading-container">
              <h2 className="">{props.term}</h2>
              <MatchesCountHeading>{props.matchDict[props.term][1]?.timestamps.length} matches</MatchesCountHeading>
            </TermHeadingContainer>
            

            {store.urlList.map(function(url, i){
              //only render video rows we have caption matches for
              // console.log(props.matchDict[props.term][i]?.timestamps)
              if(props.matchDict[props.term][i]?.timestamps){
                return(
                  <TimestampRow key={i} url={url} timestamps={props.matchDict[props.term][i]?.timestamps}/>
                );
              }

            })}

            {/*props.matchDict[props.term][1]?.timestamps.map(function(timestamp:number, i:number){
              return(
                // <TimestampCard key={i} timestamp={timestamp}/>
                <TimestampRow key={i} timestamps={props.matchDict[props.term][1].timestamps}/>
              )
            })*/}
          </div>
        </Card>
      </section>

  )

  

}
