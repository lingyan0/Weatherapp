//getting dates and times
let dateToday = document.querySelector(".date");
let now = new Date();
let day = now.getDate();
let year = now.getFullYear();
let month = now.getMonth();
dateToday.innerHTML = `${day}-${month + 1}-${year}`;

//convert button
let temperature = document.getElementById("deg_cel");
let convertButton = document.getElementById("convertButton");
let temperatureNumber = `oOh whAt TeMP?`; //this is just a placeholder
let unit = "celcius";
function convertUnit() {
  if (unit === "celcius") {
    temperature.innerHTML = `${(temperatureNumber * 33.8).toFixed(0)} F`;
    convertButton.innerHTML = "convert to Celcius!";
    unit = "fahrenheit";
  } else if (unit === "fahrenheit") {
    temperature.innerHTML = `${temperatureNumber} C`;
    convertButton.innerHTML = "convert to Farenheit!";
    unit = "celcius";
  } else {
    alert(`sth ain't right buddy`);
  }
}

convertButton.addEventListener("click", function (event) {
  convertUnit();
});

//search bar change name and data
let searchBar = document.getElementById("searchBar");
let searchInput = document.getElementById("searchInput");
let mainIcon = document.getElementById("main-icon-img");
let weatherDesc = document.getElementById("weather_desc");
let windSpeed = document.getElementById("wind_speed");
let humidity = document.getElementById("humidity");

searchBar.addEventListener("submit", function (event) {
  event.preventDefault();

  function getSearchBarData(input) {
    let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${input.data[0].lat}&lon=${input.data[0].lon}&appid=1a6432c5ca7b6f9b0bee45c98d54ea71`;
    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${input.data[0].lon}&lat=${input.data[0].lat}&key=o833de0tab73f267b382c320471b62cb`;
    axios.get(apiWeatherUrl).then(changeData);
    axios.get(forecastApiUrl).then(changeForecast);
  }

  let searchValue = searchInput.value;

  let apiCoordUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&appid=1a6432c5ca7b6f9b0bee45c98d54ea71`;

  axios.get(apiCoordUrl).then(getSearchBarData);

  let city = document.getElementById("cityName");

  city.innerHTML = `${searchValue}`;
});

//change forecast
function changeForecast(response) {
  console.log(response);
  let weekdays = [
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
    `Sat`,
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
    `Sat`,
  ];
  for (let i = 0; i < 5; i++) {
    console.log(i);
    let unit = document.getElementById(i);
    unit.innerHTML = `${weekdays[now.getDay() + i]}
    <img
            src="${response.data.daily[i].condition.icon_url}"
            alt="${response.data.daily[i].condition.description}"
          /> 
              <div><span>${response.data.daily[i].temperature.maximum.toFixed(
                0
              )}</span>  <span class="min">${response.data.daily[
      i
    ].temperature.minimum.toFixed(0)}</span></div>`;
  }
}

//given name change data
function changeData(input) {
  //console.log(input);
  temperatureNumber = (input.data.main.temp - 272.15).toFixed(0);
  temperature.innerHTML = `${temperatureNumber} C`;
  weatherDesc.innerHTML = input.data.weather[0].description;
  windSpeed.innerHTML = `windspeed: ${input.data.wind.speed} km/h`;
  humidity.innerHTML = `humidity: ${input.data.main.humidity}%`;
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${input.data.weather[0].icon}@2x.png`
  );
}

//geolocation changing name
function changeLocation(input) {
  let city = document.getElementById("cityName");
  city.innerHTML = `${input.data.name}`;
}

function getLocation(input) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${input.coords.latitude}&lon=${input.coords.longitude}&appid=1a6432c5ca7b6f9b0bee45c98d54ea71`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${input.coords.longitude}&lat=${input.coords.latitude}&key=o833de0tab73f267b382c320471b62cb`;

  //console.log(forecastApiUrl);
  axios.get(apiUrl).then((response) => {
    changeLocation(response);
    changeData(response);
  });
  axios.get(forecastApiUrl).then(changeForecast);
}

function localLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}
let locationButton = document.getElementById("locationButton");

locationButton.addEventListener("click", localLocation);

//weather forecast
