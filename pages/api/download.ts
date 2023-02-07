// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'
import fs from 'fs'

type Data = {
  videoData:any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = JSON.parse(req.body)
  // const url = req.body;
  console.log('download', + url)
  try{
    ytdl(url).pipe(fs.createWriteStream('video.mp4'))
    .on('finish', () => {
      // let d = fs.readFileSync('video.mp4')
      res.status(200).json({ videoData: fs.readFileSync('video.mp4')})
    })
    .on('close', () => {
      //delete the file
      fs.unlink('video.mp4', (err) => console.log(err))
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
