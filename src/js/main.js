const KEY_API = `2c12b249a669b7804fa1acafecfc7274`;

const city = document.querySelector("#city");
const currentTemp = document.querySelector("#current-temperature");
const input = document.querySelector("#search-input");
const btnFarenheit = document.querySelector('#btn-fahrenheit')
const weatherFutereList = document.querySelector('#list')
btnFarenheit.addEventListener('click',convertTemp)
const btnCelsius = document.querySelector('#btn-celsius')
btnCelsius.addEventListener('click',searchCity)
const currentDay = document.querySelector("#current-day");
const currentWeaterDescripton = document.querySelector("#weather-description");
const windSpeed = document.querySelector('#wind-speed')
const humidity = document.querySelector('#humidity')
const iconWeather = document.querySelector(".action-icon");
const displayWeatherInfo = document.querySelector('.content')

function searchCity(event) {
   event.preventDefault();
   (async () => {
    displayWeatherInfo.style.display = 'flex'
     const data = await getData(input.value);
     if (input.value) {
      await getFutureWeather(data.coord.lat,data.coord.lon)
      btnCelsius.classList.add('active')
      btnFarenheit.classList.remove('active')
      let str = `${input.value}`
       city.innerHTML = capitalizeFirstLetter(str)
       currentDay.innerHTML=`${formatDate()}`
       humidity.innerHTML=`${data.main.humidity} %`
       windSpeed.innerHTML=`${data.wind.speed} km/h`
       currentWeaterDescripton.innerHTML=`${capitalizeFirstLetter(data.weather[0].description)}`
       currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
       iconWeather.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      iconWeather.setAttribute("alt", `${data.weather[0].description}`);
      iconWeather.style.display = "block";
      } 
   })();
 }

 function convertTemp() {
  (async () => {
    if (input.value) {
    const data = await getData(input.value);
    currentTemp.innerHTML = `${Math.round(celsiusToFahrenheit(data.main.temp))}`;
    btnFarenheit.classList.add('active');
    btnCelsius.classList.remove('active');
  }
  })();
}

 function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
 
 const form = document.querySelector("#search-form");
 form.addEventListener("submit", searchCity);
 
 const getData = async (val) => {
   try {
     let URL = `https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&appid=${KEY_API}`;
     const res = await fetch(URL);
     const data = await res.json();
     return data;
   } catch (err) {
     console.log(err);
   }
 };
 
 //
 function formatDate() {
  let now = new Date();
  const daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = daysNames[now.getDay()];
  let hoursValue = now.getHours();
  if (hoursValue < 10) {
    hoursValue = "0" + hoursValue;
  }
  let minutesValue = now.getMinutes();
  if (minutesValue < 10) {
    minutesValue = "0" + minutesValue;
  }
  let myDate = `${day} ${hoursValue}:${minutesValue}`;
  return myDate;
}
let value = formatDate();
const time = document.querySelector("#current-date");
if (time) {
  time.innerHTML = `${value}`;
}
 
 function celsiusToFahrenheit(celsius) {
    let fahrenheit = celsius * 9/5 + 32;
    return fahrenheit;
 }
  
 function fahrenheitToCelsius(fahrenheit) {
  let celsius = (fahrenheit - 32) * 5/9;;
  return Math.round(celsius);
}


async function getFutureWeather(lat,lon) {
  const API_key = `6a0bac9dced487830ce6066218a5481c`
  try {
    const URL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_key}`
    const res = await fetch(URL);
    const futureData = await res.json();
    console.log(futureData);
    return  renderListWithWeather (futureData.daily,'jjjjjjjjjjjjjjj')
  } catch (err) {
    console.log(err);
  }
};


function renderListWithWeather (data) {
 const slicedArray = data.slice(0, 5);
 let item = slicedArray.map(((item, i)=> (
  //console.log(item.weather[0].description)
  `<div class="col day-wrapper">
  <div class="weather-info">${fahrenheitToCelsius(item.temp.day)} °C</div>
  <div class="weather-info">${item.temp.day} °F</div>
<img class='icon' src=http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png></img>
<div class="weather-info">${capitalizeFirstLetter(item.weather[0].description)}</div>
<div class="weather-info">Humidity:
<span>${item.humidity} %</span>
</div>
<div class="weather-info">Wild:
<span>${item.wind_speed} km/h</span>
</div>
</div>`
)));
  weatherFutereList.innerHTML=item;
}

