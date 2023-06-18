import { API_KEY } from "./utils.js";
//state

let currCity='Lima,PE'
let units='M'

function getWeather() {
  fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${currCity}&days=5&units=${units}&key=${API_KEY}`).then(res=>res.json()).then(data=>console.log(data))
}

getWeather()