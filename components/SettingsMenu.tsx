import { Box, Switch, Modal, FormControlLabel } from '@mui/material/';
import { darkTheme, lightTheme } from "../styles/themes";
import SettingsIcon from '@mui/icons-material/Settings';
import useStore  from '../global/state';

const style = (isLight: boolean) => ({
  position: 'absolute' as 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: (!isLight) ? `2px solid ${darkTheme.palette.primary.main}`: `2px solid  ${lightTheme.palette.primary.main}`,
  borderRadius: 5,
  boxShadow: (!isLight) ? `0px 15px 17px -9px ${darkTheme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`: `0px 13px 17px -9px ${lightTheme.palette.primary.main},0px 5px 25px 9px rgba(238,228,233,0.2)`,
  p: 4,
});

const SettingsMenu: React.FunctionComponent = () => {
  const store = useStore(); //global state
  const handleClose = () => store.toggleSettings();

  return(
    <section id='settingsmenu' className='settingsmenu'>
      <SettingsIcon onClick={store.toggleSettings} style={{cursor: 'pointer', margin: '10px', opacity: store.shown ? 1.0 : 0.3}}/>
      <Modal onClose={handleClose} open={store.shown}>
        <Box sx={style(store.isLight)}>
          <FormControlLabel style={{marginLeft:'auto', marginRight:'auto'}} label='Dark mode' control={<Switch checked={!store.isLight} onChange={store.toggleTheme}/>}/>
        </Box>
      </Modal>
    </section>
  )
}


export default SettingsMenu;

