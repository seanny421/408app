import Link from "next/link";
import { styled } from "@mui/system"

const TimestampList = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '1rem',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.primary.main}`
}));

interface Props {
  timestamp: number,
  key: number,
  url: string,
}

//takes our timestamp number in seconds and returns  
//string in format x minutes x seconds
function formatTimestamp(timestamp: number):string{
  let timestampString = ""; 
  const splitDecimalArr = (timestamp/60).toString().split(".")
  if(splitDecimalArr.length > 1)
    timestampString = splitDecimalArr[0] + "m " + (Number("0." + splitDecimalArr[1])*60).toFixed(0) + "s"
  else
    timestampString = splitDecimalArr[0] + "m " + Number("0") + "s"

  return timestampString;
}

export default function TimestampCard(props:Props){
  return(
    <section>
      <Link href={props.url} className="link" passHref>
        <a target="blank" rel="noopener noreferrer">
          <TimestampList style={{display: 'flex', padding: '1rem', width: '100%', justifyContent: 'center'}}>
            <strong style={{fontSize: '1.2rem'}} className="link-text">{formatTimestamp(props.timestamp)}</strong>
          </TimestampList>
        </a>
      </Link>
    </section>
  )
}
