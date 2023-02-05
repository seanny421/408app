// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'
import fs from 'fs'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({
  corePath: 'http://localhost:3000/ffmpeg.core.js',
  log: true,
})
let ready = false;

type Data = {
  videoData: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  //approach 2
  const url = JSON.parse(req.body)
  console.log('download: ' +url)
  ytdl(url, {begin: '1m'}).pipe(fs.createWriteStream('video2.mp4'))
  let d = fs.readFileSync('video2.mp4')
  res.status(200).json({ videoData: d})
}

const cutVideo = async() => {
  await ffmpeg.load()
  ffmpeg.FS('writeFile', 'vid.mp4', await fetchFile('video2.mp4'))
  await ffmpeg.run('-i', 'video2.mp4', '-ss', '00:00:00', '-t', '00:00:30', '-c:v', 'copy', '-c:a', 'copy', 'video2.mp4')
  await fs.promises.writeFile('video2.mp4', ffmpeg.FS('readFile', 'vid.mp4'))
}

