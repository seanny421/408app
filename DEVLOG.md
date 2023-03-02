Most recent changes first
---------------------------------------------------------------------
[02/03]

- reworked adding to download queue so user can choose what timestamp they want to download on the captions page
  (reduces work done cutting videos on the server)

- not been keeping up with DEVLOG, need to remember to do this

## TODO
## [1] make start on videoEditing page
## [1] change breakpoints in captions page
## [1] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [2] decouple url fetches from client to server 
## [3] style url list responsively 

---------------------------------------------------------------------
[13/02]

- made download page where we call the server, download the video, and cut any
parts we need and send back in reponse
- added downloadedClips to global state
- added CutVideoCard for frontend
- removed strict mode from next.config.js

## TODO
## [1] make start on videoEditing page
## [1] change breakpoints in captions page
## [1] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [2] decouple url fetches from client to server 
## [3] style url list responsively 

---------------------------------------------------------------------
[07/02]

- reworked downloadQueue to avoid redownloading youtube vids
      - when adding to state check for existing url and concat timestamp data if it exists 
      - changed how we update UI to check if downloadQueue contains timestampData 

## TODO
## [1] change breakpoints in captions page
## [1] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [2] decouple url fetches from client to server 
## [3] style url list responsively 

---------------------------------------------------------------------
[06/02]

- reworked timestamp data in preperation for downloading video snippets
- implemented downloadQueue and accompanying functions in global state
- added AddToDownloadQueue row in captions page 
- added empty download page

## TODO
## [1] change breakpoints in captions page
## [1] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [2] decouple url fetches from client to server 
## [3] style url list responsively 

---------------------------------------------------------------------
[23/01]

- added formatTimestamp function to display timestamps in minutes/seconds 
- made captions page list a bit more responsive

## TODO
## [1] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [2] decouple url fetches from client to server 
## [3] style url list responsively 
---------------------------------------------------------------------
[18/01]

- added passing of isLastItem prop to TimestampRow for conditional borderBottom render

## TODO
## [1] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [2] decouple url fetches from client to server 
## [3] style url list responsively 
---------------------------------------------------------------------
[17/01]

- added checking to url input with feedback msg to user 
- styled feedback msg to user
- added home button next to settingsmenu for better UX
- implemented foldable caption list items
- styled scrollbar for timestamps list
- ammended store to update urlList with most recent at [0] in array
- made timestamp link open in new tab
- updated styling for termsinput page

## TODO
## [1] make each caption list item foldable <!DONE
## [2] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [3] decouple url fetches from client to server 
## [4] style url list responsively 

---------------------------------------------------------------------
[15/01]

- fixed no maxres thumbnail bug
- cleaned up captionRework code

## TODO
## [1] decouple url fetches from client to server 
## [2] inform user of error if url is input incorrectly 
## [3] style url list responsively 

---------------------------------------------------------------------

[14/01]

- updated input bar themes
- reworked how we stored/handled caption data
    caption data is stored as such:
      - we have a matches dictionary that captures all data per term
        i.e. matchDict[term], it is structured like so:
        matchDict: {
          [term:string]: {
            [videoId: string]: {
              timestamps: number[]
            }
          }
        }
      - so if we wanted to get the timestamps for the 2nd video for the term "hello":
      const timeStampArr = matchDict["hello"][1].timestamps
- styled caption page

## STEP ONE (minimum viable product) ALMOST COMPLETE
  - just need to clean up some bugs

---------------------------------------------------------------------

[12/01]

Thinking about how we are matching terms
Let's start with showing exact matches

How is our caption data structured:
  array of JSON data? []  
  each item in arr has .duration .start .text
  e.g.
  0:
    duration: 7.56
    start: 0.12
    text: "some string here"

- implemented term matching
- we now display all timestamps term occurs at to user
<! phrases may be different? as phrases can carry over from one caption line to the next>
---------------------------------------------------------------------

[07/01]

- implemented partial testing for termsinput page

---------------------------------------------------------------------

[05/01]

- starting implementation of testing 
- implemented component testing on index

---------------------------------------------------------------------

[15/11]

- restructured url list to be a list of custom videoObjects
- created text/phrase input page.
- created captions page.
- allows us to include multiple urls
- implemented adding caption data to videoObjects
- functionality as of today:
    user inputs multiple URLs (still not checking if input is valid URL)
      - once user inputs URL we fetch appropriate data 
        from YoutubeDataAPI and display this in the videolist shown to the user
    user clicks next page to input words phrases to work on
    user can click next page to captions page where we can see each videos captions in the console

## TODO
## [1] implement testing (Jest / MochaJS) !IMPORTANT
## [2] style url list responsively 
## [3] make sure if we don't have high quality thumbnail then we 
##     substitute (can maybe make a catchall function that searches if something exists and if it does returns it if not we return something else within the object)
##     function getBestThumbnailOption()
## [4] decouple url fetches from client to server 
## [5] inform user of error if url is input incorrectly 
---------------------------------------------------------------------

[11/11]

- spent all day yesterday (10/11) on youtubeDataAPI and found out that we cannot get captions unless we own the video
- set up a python server that will get captions for us
- made sure we can call this from the front end (we can)

---------------------------------------------------------------------

[1/11]

- almost finished styling url list 
- implemented youtubeDataAPI with fetching data (thumbnail, title, description etc)

---------------------------------------------------------------------

[27/10]

- stared styling url list 

---------------------------------------------------------------------

[26/10]

- created homepage
- implemented global state
- implemented theming
- implemented url_list functionality (add/remove items)

---------------------------------------------------------------------
