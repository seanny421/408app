import useStore from "../../global/state";
import { lightTheme, darkTheme } from "../styles/themes";
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

export default function TimestampCard(props:Props){
  const store = useStore();
  return(
    <section>
      <Link href={props.url} className="link">
        <TimestampList style={{display: 'flex', padding: '1rem', width: '100%', justifyContent: 'center'}}>
          <strong style={{fontSize: '1.2rem'}} className="link-text">{props.timestamp}</strong>
        </TimestampList>
      </Link>
    </section>
  )
}
