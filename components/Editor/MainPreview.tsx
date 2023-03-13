import {useEffect, useState} from "react"
import {CutVideoObject} from "../../global/types"
import useStore from "../../global/state"
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
import { Button } from "@mui/material"
import { styled } from "@mui/system"
import { lightTheme, darkTheme } from "../../styles/themes"
const ffmpeg = createFFmpeg({
  // log: true,
})

interface Props {
  //this is only temporary
  video:CutVideoObject
}

function createVideoUrl(buffer:ArrayBuffer){
  return String(URL.createObjectURL(new Blob([buffer], {type: 'video/mp4'})))
}

export default function MainPreview(props:Props){
  const store = useStore()
  const [mainpreviewVideo, setMainPreviewVideo] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = async() => {
    await ffmpeg.load()
  }

  useEffect(() => {
    updateMainPreview()
  }, [store.timelineVideos])

  //loop through all the timelinevideos and concat with ffmpeg
  async function updateMainPreview(){
    if(!ffmpeg.isLoaded())
      await ffmpeg.load()
    store.resetImages()//reset in case we end up with duplicates
    for(let i = 0; i < store.timelineVideos.length; i++){
      const buffer = new Uint8Array(JSON.parse(store.timelineVideos[i].doc.bufferData)).buffer
      const vid = new Blob([buffer], {type: 'video/mp4'})
      try{
        const mainpreview = ffmpeg.FS('readFile', 'mainpreview.mp4')
        ffmpeg.FS('writeFile', 'tempVid.mp4', await fetchFile(vid))
        await ffmpeg.run('-i', 'mainpreview.mp4', '-vcodec', 'copy', '-vbsf', 'h264_mp4toannexb', '-acodec', 'copy', 'part1.ts')
        await ffmpeg.run('-i', 'tempVid.mp4', '-vcodec', 'copy', '-vbsf', 'h264_mp4toannexb', '-acodec', 'copy', 'part2.ts')
        await ffmpeg.run('-i', 'concat:part1.ts|part2.ts', '-codec', 'copy', 'output.mkv')
        const output = ffmpeg.FS('readFile', 'output.mkv')
        ffmpeg.FS('writeFile', 'mainpreview.mp4', output)

      } catch(err){//if mainpreview.mp4 is not defined yet
        ffmpeg.FS('writeFile', 'mainpreview.mp4', await fetchFile(vid))
      }
      //create our images for our timeline
      await createTimelineImage(vid)
    }
    updateVideo()
  }

  //create thumbnail for timeline item, takes the video Blob object and uses ffmpeg to create jpg image
  async function createTimelineImage(vid:Blob){
    if(!ffmpeg.isLoaded())
      await ffmpeg.load()
    try {
      ffmpeg.FS('writeFile', 'vidForTimelineImage.mp4', await fetchFile(vid))
      await ffmpeg.run('-i', 'vidForTimelineImage.mp4', '-frames:v', '1', 'image.jpg')
      const image = ffmpeg.FS('readFile', 'image.jpg')
      const url = String(URL.createObjectURL(new Blob([image.buffer], {type: 'image/jpg'})))
      store.addToTimelineImages(url)
    } catch(err){
      console.log(err)
    }
  }

  async function updateVideo(){
    if(!ffmpeg.isLoaded())
      await ffmpeg.load()
    try {
      const vid = ffmpeg.FS('readFile', 'mainpreview.mp4')
      setMainPreviewVideo(createVideoUrl(vid.buffer))
      ffmpeg.FS('unlink', 'mainpreview.mp4')
    } catch(err){ //if mainpreview isn't defined
        setMainPreviewVideo('')
    }
  }

const StyledButton = styled(Button)(({ theme }) => ({
  boxShadow: `0px 10px 17px -10px ${theme.palette.primary.main},0px 5px 20px 0px rgba(238,228,233,0.2)`,
  border: `2px solid ${theme.palette.primary.main}`,
  background: `${theme == darkTheme ? '#000' : '#fff'}`,
  color: `${theme == darkTheme ? '#fff' : '#000'}`,
  ":hover": {
    //on hover flip background theme
    background: `${theme == darkTheme ? '#fff': '#000'}`,
    color: `${theme == darkTheme ? '#000': '#fff'}`,
    cursor: 'pointer'
  },
}));


  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '3rem', textAlign: 'center'}}>
      {mainpreviewVideo != '' &&
        <video id="previewVideo" style={{padding: '1rem', width: '100%'}} controls src={mainpreviewVideo} />}
      {mainpreviewVideo == '' &&
        <video style={{padding: '1rem', width: '100%'}} controls src={''} />}
      <a className="primary-btn" download="Vashup-file.mp4" href={mainpreviewVideo}><StyledButton variant="outlined" className="primary-btn">Download</StyledButton></a>

    </div>

  )
}
