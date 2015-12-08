# AsyncAPI-Marko
#Abstract
A Responsive website using Node.js.
Purpose of this site is to showcase - calling of multiple APIs asynchronously and progressively rendering in html using Marko.js templating engine.

#List of government APIs called through APPhonics:
1. Teachers in position in secondary schools in Urban area
2. Class-wise enrolment in classes IX and X in Urban area
3. Progress Report of Village Electrification
#Outcome
Performance Improvements - User sees NO wait / NO blank screen even on calling multiple APIs

#Below changes needs to be done in local
1. Goto AsyncAPI-Marko/home/index.js - Replace with YOUR ConsumerKey / ConsumerSecret from APPhonics
2. Goto AsyncAPI-Marko/api/index.js - Replace with YOUR APIKey from data.gov.in

#Tech Stack:
1. Node.js - Install stable build
2. bower - Install
3. gulp (added as a dependency through application)

#How to run in local: (Move to project folder then run below commands)
1. bower install typeahead.js
2. bower install bootstrap
3. bower install jquery
4. npm install
5. gulp
6. node server.js
7. Launch : http://localhost:8080

#Brief info about each component
Desc covers components usage specific to this site... Not in general.
  * Node.js
    Go through desc in site.
  * bower
    Fetch and installs the third party components used in this site. 
  * typeahead.js
    A JS library from twitter for auto populating textbox contents based on user key-in values.
  * bootstrap
    A framework for developing responsive sites
  * gulp
    Moves 'dist' version of assets(js/css) from thirdparty sites to 'static' folder of this site.
  * Marko.js
    A templating engine used eBay. Used here to make API calls asynchronously and render results progressively in Html.
