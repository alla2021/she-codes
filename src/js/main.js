function searchCity(event) {
   event.preventDefault();
   const city = document.querySelector("#city");
   const currentTemp = document.querySelector("#current-temperature");
   const input = document.querySelector("#search-input");
   (async () => {
     const data = await getData(input.value);
     if (input.value) {
       city.innerHTML = `${input.value}`;
       currentTemp.innerHTML = `${data.main.temp}`;
       input.value = "";
     }
   })();
 }
 
 const form = document.querySelector("#search-form");
 form.addEventListener("click", searchCity);
 
 const getData = async (val) => {
   try {
     const KEY_API = `2c12b249a669b7804fa1acafecfc7274`;
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
 