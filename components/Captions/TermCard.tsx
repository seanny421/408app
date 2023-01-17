import useStore from "../../global/state";
import { styled } from "@mui/system"
import TimestampRow from "./TimestampRow";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useState} from "react";

const Card = styled('div')(({ theme }) => ({
  position: 'relative',
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  borderRadius: '20px',
  padding: '1rem',
  marginBottom: '1rem',
  background: `${theme.palette.background.default}`,
  color: `${theme.palette.mode == 'light' ? '#000' : '#fff'}`,
  border: `2px solid ${theme.palette.primary.main}`
}));

const TermHeadingContainer = styled('div')(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  // borderBottom: `2px solid ${theme.palette.primary.main}`
}));

const BorderBottom = styled('div')(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.main}`,
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function calculateMatchCount(timestampslist:object):number{
    let total = 0;
    for(let i = 0; i < store.urlList.length; i++){
      if(timestampslist[i]?.timestamps.length != null)
        total += timestampslist[i]?.timestamps?.length
    }
    return total;
  }

  function handleArrowClick(){
    setIsOpen(!isOpen)
  }
  return(
      <section key={props.key}>
        <Card className="url-list-card" >
          <div style={{margin: `${isOpen ? '1rem' : ''} `}}>
            <TermHeadingContainer className="term-heading-container">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <h2>{props.term}</h2>
                {!isOpen && <ArrowRightIcon style={{fontSize: '2rem'}} onClick={handleArrowClick}/>}
                {isOpen && <ArrowDropDownIcon style={{fontSize: '2rem'}} onClick={handleArrowClick}/>}
              </div>
              <MatchesCountHeading>{calculateMatchCount(props.matchDict[props.term])} matches</MatchesCountHeading>
            </TermHeadingContainer>
            {isOpen && <BorderBottom/>}
            {/*for each video in the list render: */}
            {isOpen && store.urlList.map(function(url, i){
              //only render video rows we have caption matches for
              if(props.matchDict[props.term][i]?.timestamps){
                return(
                  <TimestampRow key={i} url={url} timestamps={props.matchDict[props.term][i]?.timestamps}/>
                );
              }
            })}
          </div>
        </Card>
      </section>

  )

  

}
