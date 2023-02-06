import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useStore from '../global/state'
import {useEffect, useState} from 'react'
import { ThemeProvider, CssBaseline, Button } from '@mui/material'
import {darkTheme, lightTheme} from '../styles/themes'
import SettingsMenu from '../components/SettingsMenu'

const Download: NextPage = () => {
  const store = useStore();
  const [isLight, setIsLight] = useState(true); //default is darkmode
  //run on store.isLight update
  useEffect(() => {
    setIsLight(store.isLight);
  }, [store.isLight]);

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
        </main>
      </div>
    </ThemeProvider>
  )
}

export default Download
