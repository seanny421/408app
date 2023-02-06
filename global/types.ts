import { FFmpeg } from "@ffmpeg/ffmpeg"
export type VideoObject = Object & {
  videoInfo: VidInfoObject,
  url: string,
  captions: string[]
}
type VidInfoObject = Object & {snippet: SnippetObject} 
type SnippetObject = Object & {
  thumbnails: ThumbnailObject, 
  description: string, 
  title: string
} 
type ThumbnailObject = Object & {
  default: {url: string},
  medium: {url: string},
  high: {url: string},
  standard: {url:string}
  maxres: {url: string},

}

export interface EditorComponentProps {
  ffmpeg: FFmpeg
}

export type TimeStampObject = {
  text: string,
  start:number,
  duration: number,
}

export type DownloadQueueItem = {
  url: string,
  timestampData: TimeStampObject[],
}
