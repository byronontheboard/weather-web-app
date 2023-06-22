# Weather Watcher | (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
By creating this web application, I intended to make the weather of any city in the U.S., accessible to the user. With the help of a weather API, I was able to accomplish just that, as well as allowing the user to access their previous searches, that were saved to Local Storage.  

<img width="1792" alt="Screen Shot 2023-06-21 at 7 57 21 PM" src="https://github.com/byronontheboard/weather-web-app/assets/127366720/8207a04b-329d-4028-8cd1-5d5770650658">

----

## Acceptance Criteria  
As a traveler, I want to see the weather outlook for multiple cities, so that I can plan a trip accordingly.

### *GIVEN* a weather dashboard with form inputs:  

***WHEN*** I search for a city  
- [x] ***THEN*** I am presented with current and future conditions for that city and that city is added to the search history  

***WHEN*** I view current weather conditions for that city  
- [x] ***THEN*** I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

***WHEN*** I view future weather conditions for that city
- [x] ***THEN*** I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity 

***WHEN*** I click on a city in the search history
- [x] ***THEN*** I am again presented with current and future conditions for that city

-----

## Search for a City
Upon entering the webpage, the user will be met with a search bar. Here the user can enter the name of a city in the U.S. to be informed about the city's current forecast, as well as its 5-day forecast. In order to help the user find the city that they are looking for, I incorporated an autofill function that displays the city and state(due to the fact that their are states that contain cities with the same name) below the search bar, so that they can click the correct city for their weather inquiry. 

<img width="1792" alt="Screen Shot 2023-06-21 at 7 58 27 PM" src="https://github.com/byronontheboard/weather-web-app/assets/127366720/37c4e09d-51dd-45f1-b474-b613305d0042">

----

## Weather Forecast
After entering the name of a city and clicking the "Search," button, the application will then display the current(above) & 5-Day(below) forecast for that city. 
The user will then see the name of the city, day/date, weather, temperature, wind speed, and humidity.

<img width="1792" alt="Screen Shot 2023-06-21 at 7 58 52 PM" src="https://github.com/byronontheboard/weather-web-app/assets/127366720/c18f78e0-240b-40fa-8930-7988ac2bae31">

----

## History
On top of the web application having searching capabilities, I wanted to allow the user to access the searches that were saved to Local Storage. To do so, each inquiry is stored and then appended under the "History," button. To access the past searches, all the user has to do is click the "History," button; this will open the accordion that displays the user's search history for cities.

Additionally, this feature can be accessed from the homepage on refresh as well, or if the user reopens the application for any reason.

<img width="1792" alt="Screen Shot 2023-06-21 at 7 59 12 PM" src="https://github.com/byronontheboard/weather-web-app/assets/127366720/5976b804-10b0-460e-8eac-3a4808a237e2">


<img width="1792" alt="Screen Shot 2023-06-21 at 7 59 26 PM" src="https://github.com/byronontheboard/weather-web-app/assets/127366720/2d6cd263-2663-46a7-bd40-5b8b6be7d6cd">
