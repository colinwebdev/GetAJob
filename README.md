# Get A job - v 1.1

This is my first React-redux project, bear with me. 

## Concept
A personal dashboard for collecting and tracking job applications, with a double purpose of being a portfolio showpiece. 

## Progress
Starting - Technically my 3rd attempt, as I've refactored this project a few times over as I've learned more about React. It was getting unruly in just straight React so for this version I introduced Redux and Express, and brought in MongoDB.

2/22/24 - Back end skeleton set up with schemas, controllers, and routes for the major aspects of companies, listings and skills. 

2/23/24 - Created frontend framework for listings and companies, along with DB schemas. Can create companies, working on edits and listing creation.

2/25/24 - Created company display page. Added ability to include maps just from the address of a location and several global options. Process.env variables refused to work in frontend code, so I have them stored in global  services for now (added it gitIgnore so keys won't be revealed). Global services includes a function to handle and format dates properly. Added the ability to make notes on companies and store them with the date they were made, need to work on styling for them. Also added ability to cross-reference between companies and listings, specifically getting data about listings related to a specific company--requires some wizardry in the backend controllers to return additional data. Can't be done in components in the current state, causes data collision and overwriting. 