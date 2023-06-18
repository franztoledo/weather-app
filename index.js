import { API_KEY } from "./utils.js";
//state

let currCity='Lima,PE'
let units='M'

//selector

let city = document.querySelector('.weather__city')
let dateTime = document.querySelector('.weather__datetime')
let weather__forecast = document.querySelector('.weather__forecast');

//change code country to name country
function convertCountryCode(country){
  let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
  return regionNames.of(country)
}
//date 
function getTimeByZone(timezone){
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: `${timezone}`, hour12:true};
  return date.toLocaleString('en-US', options);
}




function getWeather() {
  fetch(`https://api.weatherbit.io/v2.0/current?city=${currCity}&units=${units}&key=${API_KEY}`).then(res=>res.json()).then(data=>{
    console.log(data);
    city.innerHTML = `${data.data[0].city_name}, ${convertCountryCode(data.data[0].country_code)}`
    dateTime.innerHTML = getTimeByZone(data.data[0].timezone)
    weather__forecast.innerHTML = `<p>${data.data[0].weather.description}`
    
  })
}

getWeather()