import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useStore from '../global/state'
import {useEffect, useState} from 'react'
import { ThemeProvider, CssBaseline, Button } from '@mui/material'
import {darkTheme, lightTheme} from '../styles/themes'
import SettingsMenu from '../components/SettingsMenu'
import {DownloadedClip, TimestampObject} from '../global/types'
import CutVideoCard from '../components/Download/CutVideoCard'
import RotateRightIcon from '@mui/icons-material/RotateRight';

const Download: NextPage = () => {
  const store = useStore();
  const [isLight, setIsLight] = useState(true); //default is darkmode
  const [downloadedVids, setDownloadedVids] = useState<DownloadedClip[]>([]) //for local use - user must be able to see both included/removed clips in case they change their mind
  const [areVidsDownloaded, setAreVidsDownloaded] = useState(false)

  //run on store.isLight update
  useEffect(() => {
    setIsLight(store.isLight);
  }, [store.isLight]);

  useEffect(() => {
    if(!areVidsDownloaded)
      downloadVids()
  }, [])

  const downloadVids = async() => {
    for(let i = 0; i < store.downloadQueue.length; i++){
      await callToApi(store.downloadQueue[i].url, store.downloadQueue[i].timestampData)
    }
    setAreVidsDownloaded(true)
  }

  //call our server to download each video and cut it up using the timestampdata
  const callToApi = async(videourl:string, timestampData: TimestampObject[]) => {
    const data = {videourl: videourl, timestampData: timestampData}
    await fetch('http://localhost:3000/api/download',
    {
      method: "POST", 
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((data) => {
      for(let i = 0; i < data.videoData.length; i++){
        const rawData = new Uint8Array(data.videoData[i].video.data)
        const downloadedObject = {timestamp: data.videoData[i].timestamp, bufferData: rawData.buffer}
        setDownloadedVids((downloadedVids) => [...downloadedVids, downloadedObject])
      }
    })
  }

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <CssBaseline/>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <SettingsMenu/>
          {downloadedVids.length > 1 &&
            <h2>Decide what clips to keep or get rid of</h2>
          }
          {downloadedVids.map(function(vid, key){
            return(
              <CutVideoCard vid={vid} key={key}/>
            )
          })}
          {!areVidsDownloaded &&
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h1>Loading your selected videos, please wait</h1>
              <RotateRightIcon style={{fontSize: '3rem'}} className="rotate"/>
            </div>
          }
        </main>
        {areVidsDownloaded &&
          <div data-testid="nextpage-btn-container" style={{display: `flex`, justifyContent: 'flex-end', position: 'absolute', right: 70}}>
            <Button href="/editor" variant="contained" className="primary-btn">Next</Button>
          </div>
        }
      </div>
    </ThemeProvider>
  )
}

export default Download
