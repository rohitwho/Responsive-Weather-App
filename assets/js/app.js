const showDate = dayjs().format("DD/MMM/YY");
const heading = document.querySelector(".Heading");
const section0 = document.querySelector(".Primary-Section");
var doSum = document.querySelector(".submit-btn");

/////////////////////////////////////////////////////////////////////////////
const hour = dayjs().hour();
const modeSel = document.querySelector(".Dark");
var selectMode = modeSel.getAttribute("Data-mode");
if (hour <= 17) {
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
var apiKey = "d5cd8cdd4dbe22cb39d5685c1ac0118c";

function getInformation() {
  let search = document.getElementById("Primary-search").value;
  let city = search;

  const key = "searchHistory";
  let searchHistory = JSON.parse(localStorage.getItem(key)) || [];

  // Set maximum limit of 10 search history items
  const maxLimit = 10;

  // Add the new search value to the search history array
  searchHistory.push(search);

  // If the search history array exceeds the maximum limit, remove the oldest search value
  if (searchHistory.length > maxLimit) {
    searchHistory.shift();
  }

  // Store the updated search history array in local storage
  localStorage.setItem(key, JSON.stringify(searchHistory));
  for (const element of searchHistory){
    // console.log(element);
    const intoThis =  document.getElementById("Show-History");
    let recentSearch = document.createElement("button");
    recentSearch.classList.add("Dropdown");
    recentSearch.textContent = element;
    intoThis.appendChild(recentSearch);
    // console.log(element);
    // // console.log(intoThis);
  }


  // console.log(intoThis);

  // searchHistory.forEach((element) => {
   
  //   let recentSearch = document.createElement("button");
  //   recentSearch.classList.add("Dropdown");
  //   recentSearch.textContent = element;
  //   intoThis.appendChild(recentSearch);
  //   console.log(recentSearch);
  // });

  document.querySelector(".main").innerHTML = "";
  document.querySelector(".Heading").innerHTML = "";
  document.querySelector(".Primary-Section").innerHTML = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.cod !== 200) {
        alert("Error: " + data.message);

        // return;
      } else {
        let currentCity = document.createElement("div");
        currentCity.classList.add("city-name");

        currentCity.innerHTML = `<h1>${data.name} (${showDate})</h1>`;

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
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector(".Heading");
      let heading = document.createElement("div");

      heading.textContent = `5 Day Forecast for :  ${city}`;
      document.querySelector(".Heading").appendChild(heading);

      for (var i = 0; i < data.list.length; i++) {
        // console.log(data.list[i]);
        if (data.list[i].dt_txt.split(" ").pop() === "12:00:00") {
          var createEl = document.createElement("div");
          createEl.className = "Primary-Row";
          createEl.innerHTML += `<p>${data.list[i].dt_txt}</p>`;
          createEl.innerHTML += `<p>Temp: ${Math.floor(
            data.list[i].main.temp
          )}°C</p>`;
          createEl.innerHTML += `<p>Humidity: ${data.list[i].main.humidity}%</p>`;
          createEl.innerHTML += `<p>Wind: ${data.list[i].wind.speed} MPH</p>`;
          section0.appendChild(createEl);
         
        }
        
      }
    });


}
doSum.addEventListener("click", getInformation);







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
