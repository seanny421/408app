import {createTheme, styled} from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C523B4',
    },
    secondary: {
      main: '#0c7d1f',
    },
  },
})

// darkTheme.shadows.push(
//   "0px 13px 17px -9px rgba(f,f,f,0.4),0px 26px 40px 4px rgba(0,0,0,0.2),0px 10px 48px 9px rgba(0,0,0,0.13)"
// );

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
    },
    primary: {
      main: '#0c7d1f',
    },
    secondary: {
      main: '#5ea',
    },
  },
})
