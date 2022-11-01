export type UrlObject = Object & {videoInfo: VidInfoObject}
type VidInfoObject = Object & {snippet: SnippetObject} 
type SnippetObject = Object & {
  thumbnails: ThumbnailObject, 
  description: string, 
  title: string
} 
type ThumbnailObject = Object & {
  maxres: {url: string}
}
