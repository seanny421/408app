// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'
import fs from 'fs'
const ffmpeg = require('ffmpeg-static')
import cp from 'child_process'

type Data = {
  videoData:any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body)
  const url = body.videourl
  const timestampData = body.timestampData
  console.log(body.timestampData)
  // console.log(url)
  // const url = req.body;
  const vid = ytdl(url)
  try{
    // ytdl(url, {begin:'1:30'}).pipe(fs.createWriteStream('video.mp4'))
    vid.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded/total;
      console.log(percent * 100)
    })
    vid.pipe(fs.createWriteStream('inputvideo.mp4'))
    .on('finish', () => {
      console.log('cutting..')
      const ffmpegProcess = cp.spawn(ffmpeg, [
        // '-y', '-v', 'error',
        // '-progress', 'pipe:3',
        
        //APPROACH 1
        // '-i', `inputvideo.mp4`,
        // '-vcodec', 'copy', '-acodec', 'copy',
        // '-ss', ('00:00:' + (timestampData.start - 1)), '-t', ('00:00:' + (timestampData.duration + 1)),
        // '-c:v', 'copy', '-c:a', 'copy', 'video.mkv'
        //
        //APPROACH 2 - THIS WORKS BETTER FOR VIDEO
        '-i', `inputvideo.mp4`,
        // '-vcodec', 'copy', '-acodec', 'copy',
        '-ss', ('00:00:' + (timestampData.start - 1)), '-map_chapters', '-1', 
        '-c:v', 'libx264', '-c:a', 'copy', '-crf', '18', '-t', ('00:00:' +(timestampData.duration + 1)),  'video.mkv'
        
        //for reference
    // $ ffmpeg -i source.mkv -ss 01:02:37.754 -map_chapters -1 -c:v libx264-c:a copy -crf 18 -t 00:04:52.292 output.mkv
    // await ffmpeg.run('-i', 'initVid.mp4', '-ss', '00:00:30', '-to', '00:01:30', '-c:v', 'copy', '-c:a', 'copy', 'outputvid.mp4')
      ], {
        windowsHide: true,
        stdio: [
          'inherit', 'inherit', 'inherit',
          'pipe', 'pipe',
        ],
      });

      // let d = fs.readFileSync('video.mp4')
      // console.log(d)
      ffmpegProcess.on('close', () => {
        console.log('done cutting')
        // setTimeout(() => {
          res.status(200).json({ videoData: fs.readFileSync('video.mkv')})
          fs.unlink('video.mkv', (err) => err != null ? console.log('wit ' + err) : console.log(''))
          fs.unlink('inputvideo.mp4', (err) => console.log('wit ' + err))
        // }, 10000)
      })
    })
    .on('close', () => {
      console.log('done')
      //delete the file
      // fs.unlink('video.mp4', (err) => console.log(err))
      // fs.unlink('inputvideo.mp4', (err) => console.log(err))
    })
  }
  catch(e){
    console.log(e)
    res.status(404)
  }
}

//for reference
// const getImage = async () => await new Promise<Buffer>((resolve, reject) => 
//   streamVariable.createWriteStream('test.jpeg')
//     .on('finish',() => resolve(readFileSync('test.jpeg')))
//     .on(''error, (e) => reject(e))
// )
