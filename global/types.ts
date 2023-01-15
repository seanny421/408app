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
  maxres: {url: string}
}
