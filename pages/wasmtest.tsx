import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useStore from '../global/state'
import {useEffect, useState} from 'react'
import { ThemeProvider, CssBaseline, Button } from '@mui/material'
import {darkTheme, lightTheme} from '../styles/themes'
import SettingsMenu from '../components/SettingsMenu'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@latest/dist/ffmpeg-core.js'
})

const WASMTest: NextPage = () => {
  const store = useStore();
  const [isLight, setIsLight] = useState(true); //default is darkmode
  const [video, setVideo] = useState()
  const [gif, setGif] = useState()


  //run on store.isLight update
  useEffect(() => {
    setIsLight(store.isLight);
  }, [store.isLight]);


  const load = async() => {
    ffmpeg.load()
  }

  const convertToGif = async() => {
    //write file to memory
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))
    //run the FFMpeg command
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');
    // await ffmpeg.run('-i', 'test.mp4', '-c', 'copy', '-map', '0', '-segment_time 00:00:00', '-f', 'segment output.mp4');

// ffmpeg -i input.mp4 -c copy -map 0 -segment_time 00:20:00 -f segment output%03d.mp4

    const data = ffmpeg.FS('readFile', 'out.gif')
    //creat a URL
    const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}))
    setGif(url)
  }


  //run once on store.urlList update
  useEffect(() => {
    load()
  }, []);


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
          <h2 className={styles.title}>WASMTest</h2>
          {
            video && <video controls width="400" src={URL.createObjectURL(video)}></video>
          }
          <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))}/>
          <button onClick={convertToGif}>Convert</button>
          {
            gif && <img width={400} src={gif}/>
          }
        </main>
      </div>
    </ThemeProvider>
  )
}

export default WASMTest