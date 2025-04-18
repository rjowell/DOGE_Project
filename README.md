# Russ’ eCFR Analyzer
## README

**PROJECT OVERVIEW:**
This is a simple Expo React Web console that pulls data from various APIs on www.ecfr.gov, caches certain data on an Express.js server, and analyzes it in a simple UI.

**STRUCTURE**\
Server: This repo\
Web App: https://github.com/rjowell/DOGE_App

**ARCHITECTURE:**\
Front-End: Expo React\
Server/APIs: Express.js

**TO RUN:**\
Express server is stored in the root directory (/DOGE_Project). It can be run locally using “node app.js.” React web app is located in the “Russ-DOGE-App” directory and can be run with “npm run web” AFTER the server is started.

**APP FEATURES:**\
The app pulls a list of agencies from the ecfr website and stores them locally on the server. When the onChange function is called, the React app will download the relevant titles pertaining to that agency and return a total word count for them. Also, there is a “Change Log” that lists all changes made in a lazy-loading scroll list.

**MOTIVATION:**\
This assignment builds on a a number of my skillsets as an independent developer. My most recent career experiences have allowed me to oversee all aspects of project development, from data analysis to system/architecture design, language selection, UI design, and final delivery. I particularly enjoyed this project because I think is allows me to showcase the full range of my leadership and decision making processes in development instead of just focusing on certain coding exercises. I really enjoy diving into complex APIs to derive unique, actionable data insights for my users, as I have done here. I have used React and Express in a number of recent projects and felt that these frameworks were appropriate for this assignment. I elected to implement Express.js for my APIs to utilize the ‘session’ feature to store data server-side and avoid the overhead of implementing a database instance like Mongoose. React Expo is also a very robust framework, which I think works well for a data analysis project like this. 

I think this was an exciting project to complete because I believe it gives great insight into what would be expected of me at the U.S. DOGE Service; bringing speed and efficiency to U.S. Government services. I think my independent development experience and my ability to make important front and back-end decisions on my own were a great asset in completing this effort. 

This project took me about 3 hours over a span of 3 days. I worked on it a little bit at a time.

Thank You! I look forward to participating in the next steps.
