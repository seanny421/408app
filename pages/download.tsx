import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useStore from '../global/state'
import {useEffect, useState} from 'react'
import { ThemeProvider, CssBaseline, Button } from '@mui/material'
import {darkTheme, lightTheme} from '../styles/themes'
import SettingsMenu from '../components/SettingsMenu'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import {TimestampObject} from '../global/types'
const ffmpeg = createFFmpeg({
  log:true,
})

const Download: NextPage = () => {
  const store = useStore();
  const [isLight, setIsLight] = useState(true); //default is darkmode
  const [video, setVideo] = useState<string>()//TEST TODO - REMOVE THIS

  const [downloadedVids, setDownloadedVids] = useState<string[]>([])

  //run on store.isLight update
  useEffect(() => {
    setIsLight(store.isLight);
  }, [store.isLight]);

  useEffect(() => {
    downloadVideos()
  }, [])

  function downloadVideos(){
    console.log(store.downloadQueue)
  }

  const downloadVids = async() => {
    for(let i = 0; i < store.downloadQueue.length; i++){
      await callToApi(store.downloadQueue[i].url, i, store.downloadQueue[i].timestampData[0])
    }
  }

  // function downloadVids(){
  //   store.downloadQueue.forEach((queueItem, i) => await callToApi(queueItem.url, i))
  // }

  const callToApi = async(videourl:string, videoIndex:number, timestampData: TimestampObject) => {
    console.log(videourl)
    const data = {videourl: videourl, timestampData: timestampData}
    console.log(JSON.stringify(data))
    await fetch('http://localhost:3000/api/download',
    {
      method: "POST", 
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((data) => {
      console.log(typeof(data.videoData.data))
      console.log(data.videoData.data)
      // console.log('downloaded')
      const rawData = new Uint8Array(data.videoData.data)
      console.log(rawData)
      const vid = URL.createObjectURL(new Blob([rawData.buffer], {type: 'video/mp4'}))
      setDownloadedVids((downloadedVids) => [...downloadedVids, vid])
      
      // cutVideo(vid, videoIndex)
      // setVideo(vid)
    })
  }

  const cutVideo = async(video:string, videoIndex:number) => {
    if(!ffmpeg.isLoaded())
      await ffmpeg.load()
    ffmpeg.FS('writeFile', 'initVid.mp4', await fetchFile(video))
    await ffmpeg.run('-i', 'initVid.mp4', '-ss', '00:00:30', '-to', '00:01:30', '-c:v', 'copy', '-c:a', 'copy', 'outputvid.mp4')
    .then(() => {
      const x = ffmpeg.FS('readFile', 'outputvid.mp4')
      const v = URL.createObjectURL(new Blob([x.buffer], {type: 'video/mp4'}))
      setVideo(v)
      setDownloadedVids((downloadedVids) => [...downloadedVids, v])
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
          <h2 className={styles.title}>Download</h2>
          <button onClick={downloadVids}>Download</button>
          {downloadedVids.map(function(vid, key){
            return(
              <video controls src={vid} key={key}/>
            )
          })}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Download
