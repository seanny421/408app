Most recent changes first
---------------------------------------------------------------------

[05/01]

- starting implementation of testing 

## TODO
## [1] implement testing (Jest / MochaJS) !IMPORTANT
## [2] style url list responsively 
## [3] make sure if we don't have high quality thumbnail then we 
##     substitute (can maybe make a catchall function that searches if something exists and if it does returns it if not we return something else within the object)
##     function getBestThumbnailOption()
## [4] decouple url fetches from client to server 
## [5] inform user of error if url is input incorrectly 
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
