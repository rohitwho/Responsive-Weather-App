const showDate = dayjs().format("DD/MMM/YY");
const heading = document.querySelector(".Heading");
const section0 = document.querySelector(".Primary-Section");
var doSum = document.querySelector(".submit-btn");

/////////////////////////////////////////////////////////////////////////////
const hour = dayjs().hour();

const modeSel = document.querySelector(".Dark");
var selectMode = modeSel.getAttribute("Data-mode");
if (hour < 17) {
  modeSel.setAttribute("Data-mode", "true");
}

///////////////////////////////////////////////////////////////////////
function showRecent() {
  var push = document.querySelector(".Recent");
  push.setAttribute("Data-Visible", "true");
}
//////////////////////////////////////////////////////////////////////////////
function hideAgain() {
  var push = document.querySelector(".Recent");
  push.setAttribute("Data-Visible", "false");
}

////////////////////////////////////////////////////////

function getRecentCity(event){
event.preventDefault();
getInformation(event.target.innerText);
}

function saveCity(cityName){
 
  const key = "searchHistory";
  let searchHistory = JSON.parse(localStorage.getItem(key)) || [];


  const maxLimit = 10;

  // Add the new search value to the search history array
  searchHistory.push(cityName);

  // If the search history array exceeds the maximum limit, remove the oldest search value
  if (searchHistory.length > maxLimit) {
    searchHistory.shift();
  }

  // Store the updated search history array in local storage
  localStorage.setItem(key, JSON.stringify(searchHistory));
  let intoThis =  document.getElementById("Show-History");
  intoThis.innerHTML = "";
  for (const element of searchHistory){

    // const intoThis =  document.getElementById("Show-History");
    let recentSearch = document.createElement("button");
    recentSearch.classList.add("Dropdown");
    recentSearch.textContent = element;
    intoThis.appendChild(recentSearch);
    recentSearch.addEventListener("click",getRecentCity)
    
  }

}



var apiKey = "d5cd8cdd4dbe22cb39d5685c1ac0118c";

function getInformation(cityName) {
  document.querySelector(".main").innerHTML = "";
  document.querySelector(".Heading").innerHTML = "";
  document.querySelector(".Primary-Section").innerHTML = "";

  // let city = search;


  
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    
      if (data.cod !== 200) {
        alert("Error: " + data.message);

        return;
      } else {
        let currentCity = document.createElement("div");
        const weatherIcon = data.weather[0].icon;
        const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
        const iconElement = document.createElement("div");
        let showThis =  iconElement.innerHTML = `<img src="${ weatherIconUrl}">`;
        currentCity.classList.add("city-name");
        currentCity.innerHTML = `<h1>${data.name} (${showDate}) ${showThis} </h1>`;
        let weatherInfo = document.createElement("div");
        let tempEl = document.createElement("p");
        tempEl.textContent = `Temp: ${Math.floor(data.main.temp)}°C`;
        let windEl = document.createElement("p");
        windEl.textContent = `Wind: ${Math.floor(data.wind.speed)} m/s`;
        let humidityEl = document.createElement("p");
        humidityEl.textContent = `Humidity: ${Math.floor(
          data.main.humidity
        )} %`;
        let description = document.createElement("p");
        description.textContent = ` ${data.weather[0].description}`;
        
        weatherInfo.appendChild(tempEl);
        weatherInfo.appendChild(windEl);
        weatherInfo.appendChild(humidityEl);
        weatherInfo.appendChild(description);
        currentCity.appendChild(weatherInfo);
        document.querySelector(".main").appendChild(currentCity);
      }
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector(".Heading");
      let heading = document.createElement("div");

      heading.textContent = `5 Day Forecast for :  ${cityName}`;
      document.querySelector(".Heading").appendChild(heading);

      for (var i = 0; i < data.list.length; i++) {
  
       
        if (data.list[i].dt_txt.split(" ").pop() === "12:00:00") {
          var createEl = document.createElement("div");
          createEl.className = "Primary-Row";
          createEl.innerHTML += `<p>${data.list[i].dt_txt}</p>`;
          const weatherIconNew = data.list[i].weather[0].icon;
          const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIconNew}.png`;
         const iconElement = document.createElement("div");
         let showThis =  iconElement.innerHTML = `<img src="${ weatherIconUrl}">`;
          createEl.innerHTML += `<p>Temp: ${Math.floor(data.list[i].main.temp)}°C</p>${showThis}`;
          createEl.innerHTML += `<p>Humidity: ${data.list[i].main.humidity}%</p>`;
          createEl.innerHTML += `<p>Wind: ${data.list[i].wind.speed} MPH</p>`;
          
     
          section0.appendChild(createEl);
         
        }
        
      }
    });


}
doSum.addEventListener("click",function(){
  let search = document.getElementById("Primary-search").value;
  getInformation(search);
  saveCity(search);
} );







////BELOW CODE CAN BE USED TO GET LIVE LOCATION FROMM THE USER////////////////

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
// https://calendly.com/fsf-tutor-team/alistair-rowden
