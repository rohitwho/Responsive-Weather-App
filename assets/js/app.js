
const currentTemp = document.getElementById("Current-temp")
const description = document.getElementById("Description")
const getWind = document.getElementById("Current-wind");
const getHumidity = document.getElementById("Current-humidity");
const futureDate = document.getElementById("Future-Date");
const futureTemp = document.getElementById("Future-temp");
const futureWind = document.getElementById("Future-wind");
const futureHumidity = document.getElementById("Future-humidity");
const icon = document.getElementById("stamp");
const currentCity = document.getElementById("Current-city");
const showDate = dayjs().format('DD/MMM/YY');
const search = document.getElementById("Primary-search").value;
const heading =document.querySelector(".Heading")
const section0 = document.querySelector(".Primary-Section0")
const section1 = document.querySelector(".Primary-Section1");
const section2 = document.querySelector(".Primary-Section2")
const section3 = document.querySelector(".Primary-Section3")
const section4 = document.querySelector(".Primary-Section4")
const push = document.getElementById(".Recent")



/////////////////////////////////////////////////////////////////////////////
const hour = dayjs().hour();
const modeSel = document.querySelector(".Dark");
var selectMode = modeSel.getAttribute("Data-mode");
if(hour <= 17){

    modeSel.setAttribute("Data-mode","true");
};


///////////////////////////////////////////////////////////////////////
const key = "searchHistory";
let searchHistory = JSON.parse(localStorage.getItem(key)) || [];

// add the new search value to the search history array
searchHistory.push(search.toLowerCase());

// store the updated search history array in local storage
localStorage.setItem(key, JSON.stringify(searchHistory));
var recentSearch = document.createElement("li");
console.log(recentSearch);



// recentSearch.innerHTML = searchHistory;
// push.appendChild(recentSearch);


console.log(searchHistory); // outputs the search history array








var apiKey = 'd5cd8cdd4dbe22cb39d5685c1ac0118c';

var city = search;


function getInformation() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
   
            currentCity.innerHTML = `${data.name} (${showDate})`;
            currentTemp.innerHTML += `<p>Temp: ${Math.floor(data.main.temp)}°C</p>`;
            getWind.innerHTML += `<p> Wind: ${data.wind.speed} MPH</P>`;
            getHumidity.innerHTML += `<p>Humidity: ${data.main.humidity} %</p>`;
            description.innerHTML += `<p>${data.weather[0].description}</p>`;
            heading.innerHTML += `<p>5 Day Forecast For ${data.name}</p> `;


        });
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(function (response) {
          return response.json();
      }).then(function (data){
          console.log(data);

var createEl = document.createElement("div");
createEl.className = "Primary-Section";
createEl.innerHTML += `<p>${data.list[2].dt_txt}</p>`;
createEl.innerHTML += `<p>Temp: ${Math.floor(data.list[2].main.temp)}°C</p>`;
createEl.innerHTML += `<p>Humidity: ${data.list[2].main.humidity}%</p>`;
createEl.innerHTML += `<p>Wind: ${data.list[2].wind.speed} MPH</p>`;
section0.appendChild(createEl);
/////////////////////////////////////////////////////         
var createDiv = document.createElement("div");
createDiv.className = "Primary-Section";
createDiv.innerHTML += `<p>${data.list[10].dt_txt}</p>`;
createDiv.innerHTML += `<p>Temp: ${Math.floor(data.list[10].main.temp)}°C</p>`;
createDiv.innerHTML += `<p>Humidity: ${data.list[10].main.humidity}%</p>`;
createDiv.innerHTML += `<p>Wind: ${data.list[10].wind.speed} MPH</p>`;
section1.appendChild(createDiv);

 ////////////////////////////////////////////////////////////
 var createOne = document.createElement("div");
 createOne.className = "Primary-Section";
 createOne.innerHTML += `<p>${data.list[18].dt_txt}</p>`;
 createOne.innerHTML += `<p>Temp: ${Math.floor(data.list[18].main.temp)}°C</p>`;
 createOne.innerHTML += `<p>Humidity: ${data.list[18].main.humidity}%</p>`;
 createOne.innerHTML += `<p>Wind: ${data.list[18].wind.speed} MPH</p>`;
 section2.appendChild(createOne);
 ///////////////////////////////////////////////////


 var createAnother = document.createElement("div");
createAnother.className = "Primary-Section";
createAnother.innerHTML += `<p>${data.list[26].dt_txt}</p>`;
createAnother.innerHTML += `<p>Temp: ${Math.floor(data.list[26].main.temp)}°C</p>`;
createAnother.innerHTML += `<p>Humidity: ${data.list[26].main.humidity}%</p>`;
createAnother.innerHTML += `<p>Wind: ${data.list[26].wind.speed} MPH</p>`;
section3.appendChild(createAnother);


///////////////////////////////////////////////
var createAnotherOne = document.createElement("div");
createAnotherOne.className = "Primary-Section";
createAnotherOne.innerHTML += `<p>${data.list[34].dt_txt}</p>`;
createAnotherOne.innerHTML += `<p>Temp: ${Math.floor(data.list[34].main.temp)}°C</p>`;
createAnotherOne.innerHTML += `<p>Humidity: ${data.list[34].main.humidity}%</p>`;
createAnotherOne.innerHTML += `<p>Wind: ${data.list[34].wind.speed} MPH</p>`;
section4.appendChild(createAnotherOne);

      });
}



// function getlocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {

//             var latitude = position.coords.latitude;
//             var longitude = position.coords.longitude;

          

//             fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
             
//                 .then(function (response) {
//                     return response.json();
//                 })
//                 .then(function (data) {
                   


//                     currentCity.innerHTML = `${data.name} (${showDate})`;
//                     currentTemp.innerHTML = "Temp:" + Math.floor(data.main.temp) + "°C";
//                     getWind.innerHTML = "Wind:" + (data.wind.speed) + "MPH";
//                     getHumidity.innerHTML = "Humidity:" + (data.main.humidity) + "%";
//                     description.innerHTML = (data.weather[0].description);
//                     // icon.innerHTML = (list.weather.icon);



//                 })
//                 fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=20&units=metric`)
//                 .then(function (response) {
//                   return response.json();
//               }).then(function (data){
//                   console.log(data);
//                   futureDate.innerHTML = (data.list[18].dt_txt);
//                   futureTemp.innerHTML = (data.list[18].main.temp);
//                  futureHumidity.innerHTML=(data.list[18].main.humidity);
//                   console.log(data.list[18].weather[0].description);
//                  futureWind.innerHTML=(data.list[18].wind.speed);
//                 //   console.log(list.dt_txt);
//               });

//         }, function (error) {

//             console.error("Error getting location:", error);

//         });
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//     }
// }









