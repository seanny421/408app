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
  const vid = ytdl(url, {filter: 'audioandvideo'})

  let response = [];
  try{
    vid.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded/total;
      console.log(percent * 100)
    })

    vid.pipe(fs.createWriteStream('inputvideo.mp4'))
    .on('finish', () => {
      for(let i = 0; i < timestampData.length; i++){
        const ffmpegProcess = cp.spawn(ffmpeg, [
          //APPROACH 2 - THIS WORKS BETTER FOR VIDEO
          '-i', `inputvideo.mp4`,
          '-ss', (String(timestampData[i].start - 1)), '-map_chapters', '-1', 
          '-c:v', 'libx264', '-c:a', 'copy', '-crf', '23', '-t', (String(timestampData[i].duration + 1)),  ('video' + i + '.mkv')
        ], {
          windowsHide: true,
          stdio: [
            'inherit', 'inherit', 'inherit',
            'pipe', 'pipe',
          ],
        })

        ffmpegProcess.on('close', () => {
          response.push({
           video: fs.readFileSync('video' + i + '.mkv'),
           timestamp: timestampData[i]
          })
          fs.unlink(('video' + i + '.mkv'), (err) => err != null ? console.log(err) : console.log(''))
          if(response.length === timestampData.length)
            res.status(200).json({ videoData: response})
        })
      }

    })
  }
  catch(e){
    console.log(e)
    res.status(404)
  }
}

