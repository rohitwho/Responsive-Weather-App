
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
var apiKey = 'd5cd8cdd4dbe22cb39d5685c1ac0118c';

var city = search;


function getInformation() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // console.log(data.name);
            currentCity.innerHTML = `${data.name} (${showDate})`;
            currentTemp.innerHTML = "Temp:" + Math.floor(data.main.temp) + "  °C";
            getWind.innerHTML = "Wind:" + (data.wind.speed) + "MPH";
            getHumidity.innerHTML = "Humidity:" + (data.main.humidity) + "%";
            description.innerHTML = (data.weather[0].description);


        });
}



function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Success callback function
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

          

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
             
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // console.log(data);
                    // console.log(data.name);


                    currentCity.innerHTML = `${data.name} (${showDate})`;
                    currentTemp.innerHTML = "Temp:" + Math.floor(data.main.temp) + "°C";
                    getWind.innerHTML = "Wind:" + (data.wind.speed) + "MPH";
                    getHumidity.innerHTML = "Humidity:" + (data.main.humidity) + "%";
                    description.innerHTML = (data.weather[0].description);
                    // icon.innerHTML = (list.weather.icon);



                })
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=20&units=metric`)
                .then(function (response) {
                  return response.json();
              }).then(function (data){
                  console.log(data);
                  futureDate.innerHTML = (data.list[18].dt_txt);
                  futureTemp.innerHTML = (data.list[18].main.temp);
                 futureHumidity.innerHTML=(data.list[18].main.humidity);
                  console.log(data.list[18].weather[0].description);
                 futureWind.innerHTML=(data.list[18].wind.speed);
                //   console.log(list.dt_txt);
              });

        }, function (error) {

            console.error("Error getting location:", error);

        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}












//   {
//     "temp": 6.51,
//     "feels_like": 4.26,
//     "temp_min": 5.2,
//     "temp_max": 7.36,
//     "pressure": 1011,
//     "humidity": 94
//   }