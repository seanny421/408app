// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'
import fs from 'fs'
const ffmpeg = require('ffmpeg-static')
import cp from 'child_process'
import {time} from 'console'

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
  const vid = ytdl(url)

  let response = [];
  try{
    vid.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded/total;
      console.log(percent * 100)
    })

    vid.pipe(fs.createWriteStream('inputvideo.mp4'))
    .on('finish', () => {
      for(let i = 0; i < timestampData.length; i++){
        console.log('cutting for ' + (timestampData[i]))
        const ffmpegProcess = cp.spawn(ffmpeg, [
          //APPROACH 2 - THIS WORKS BETTER FOR VIDEO
          '-i', `inputvideo.mp4`,
          '-ss', (String(timestampData[i].start - 1)), '-map_chapters', '-1', 
          '-c:v', 'libx264', '-c:a', 'copy', '-crf', '18', '-t', (String(timestampData[i].duration + 1)),  ('video' + i + '.mkv')
        ], {
          windowsHide: true,
          stdio: [
            'inherit', 'inherit', 'inherit',
            'pipe', 'pipe',
          ],
        })

        ffmpegProcess.on('close', () => {
          console.log('done cutting')
          response.push(fs.readFileSync('video' + i + '.mkv'))
          // res.status(200).json({ videoData: fs.readFileSync('video' + i + '.mkv')})
          // fs.unlink('video.mkv', (err) => err != null ? console.log('wit ' + err) : console.log(''))
          fs.unlink(('video' + i + '.mkv'), (err) => err != null ? console.log('wit ' + err) : console.log(''))
          console.log(response.length === timestampData.length)
          console.log(response.length)
          console.log(response)
          console.log(timestampData.length)
          console.log(timestampData)
          if(response.length === timestampData.length)
            res.status(200).json({ videoData: response})
          // fs.unlink('inputvideo.mp4', (err) => console.log('wit ' + err))
        })
      }

    })
    .on('close', () => {
      console.log('SEAN LOOK HERE SEAN LOOK HERE!!!!! DONE')
      // res.status(200).json({ videoData: response})
    })
  }
  catch(e){
    console.log(e)
    res.status(404)
  }
}

