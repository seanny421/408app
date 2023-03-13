import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useStore from '../global/state'
import {useEffect, useState} from 'react'
import { ThemeProvider, CssBaseline, Button } from '@mui/material'
import {darkTheme, lightTheme} from '../styles/themes'
import SettingsMenu from '../components/SettingsMenu'
import HomeInputBar from '../components/HomeInputBar'
import URL_List from '../components/URL/URL_List'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home: NextPage = () => {
  const store = useStore();
  const [isLight, setIsLight] = useState(false); //default is darkmode

  //run on store.isLight update
  useEffect(() => {
    setIsLight(store.isLight);
  }, [store.isLight]);

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <CssBaseline/>
      <div className={styles.container}>
        <Head>
          <title>Vashup</title>
          <meta name="description" content="Vahsup - a video parody & mashup tool" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className="main-content-container">
            <ToastContainer className="toast" theme={isLight ? "light" : "dark"}/>
            <SettingsMenu/>
            <h2 className={styles.title}>Vashup</h2>
            <p>Please enter a url to get started.</p>
            <div className='input-container'>
              <HomeInputBar isLight={isLight}/>
              <URL_List/>
              <div className='button-container'>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Home
