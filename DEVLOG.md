Most recent changes first
---------------------------------------------------------------------
[05/02]


## TODO
## [1] catch up with testing
## [1] find way to implement video downloading
        (ideally user doesn't have to download to their machine
        but not sure if this is realistically achievable)
## [2] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [3] decouple url fetches from client to server 
## [4] style url list responsively 
---------------------------------------------------------------------
[03/02]

- got a version of videodownloading to work,
  might not be the best way to deal with this though

## TODO
## [1] catch up with testing
## [1] find way to implement video downloading
        (ideally user doesn't have to download to their machine
        but not sure if this is realistically achievable)
## [2] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [3] decouple url fetches from client to server 
## [4] style url list responsively 

---------------------------------------------------------------------
[01/02]

## TODO
## [1] catch up with testing
## [1] find way to implement video downloading
        (ideally user doesn't have to download to their machine
        but not sure if this is realistically achievable)
## [2] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [3] decouple url fetches from client to server 
## [4] style url list responsively 

---------------------------------------------------------------------
[31/01]

- figured out way to concatenate 2 vids together (IMPORTANT for vid editing)
- played around with timeline ui (added mouse events to handle dragging)

## TODO
## change EditorProps to EditorComponentProps
## [1] find way to implement video downloading
        (ideally user doesn't have to download to their machine
        but not sure if this is realistically achievable)
## [2] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [3] decouple url fetches from client to server 
## [4] style url list responsively 

---------------------------------------------------------------------
[30/01]

- successfully tested way to cut videos  
- started front end on editor page

## TODO
## [1] find way to implement video downloading
        (ideally user doesn't have to download to their machine
        but not sure if this is realistically achievable)
## [2] adjust margins so things line up nicely (i.e. like plus btn on input and nextpage btn)
## [3] decouple url fetches from client to server 
## [4] style url list responsively 

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
