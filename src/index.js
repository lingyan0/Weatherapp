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

let unit = "celcius";
function convertUnit() {
  if (unit === "celcius") {
    temperature.innerHTML = "60 F";
    convertButton.innerHTML = "convert to Farenheit!";
    unit = "fahrenheit";
  } else if (unit === "fahrenheit") {
    temperature.innerHTML = "32 C";
    convertButton.innerHTML = "convert to Celcius!";
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
console.log(mainIcon);
searchBar.addEventListener("submit", function (event) {
  event.preventDefault();

  function changeSearchBarData(input) {
    //console.log(input);
    temperature.innerHTML = (input.data.main.temp - 272.15).toFixed(1);
    //console.log(input.data.weather[0].icon);
    mainIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${input.data.weather[0].icon}@2x.png`
    );
  }

  function getSearchBarData(input) {
    //console.log(input);
    let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${input.data[0].lat}&lon=${input.data[0].lon}&appid=1a6432c5ca7b6f9b0bee45c98d54ea71`;
    //console.log(apiWeatherUrl);
    axios.get(apiWeatherUrl).then(changeSearchBarData);
  }

  let searchValue = searchInput.value;
  //console.log("Search value:", searchValue);
  let apiCoordUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&appid=1a6432c5ca7b6f9b0bee45c98d54ea71`;
  //console.log(apiCoordUrl);
  axios.get(apiCoordUrl).then(getSearchBarData);

  let city = document.getElementById("cityName");

  city.innerHTML = `${searchValue}`;
});

//given name change data
function changeData(input) {
  console.log(input);
  temperature.innerHTML = (input.data.main.temp - 272.15).toFixed(1);
  mainIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${input.data.weather[0].icon}@2x.png`
  );
}

//geolocation changing name
function changeLocation(input) {
  let city = document.getElementById("cityName");
  //console.log(input);
  city.innerHTML = `${input.data.name}`;
}

function getLocation(input) {
  console.log(input.coords.latitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${input.coords.latitude}&lon=${input.coords.longitude}&appid=1a6432c5ca7b6f9b0bee45c98d54ea71`;
  axios.get(apiUrl).then((response) => {
    changeLocation(response);
    changeData(response);
  });
}

function localLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}
let locationButton = document.getElementById("locationButton");

locationButton.addEventListener("click", localLocation);

//making icons change
