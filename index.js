import { API_KEY } from "./utils.js";
function getWeather() {
  fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Lima,PE&days=5&key=${API_KEY}`).then(res=>res.json()).then(data=>console.log(data))
}

getWeather()