import { API_KEY } from "./utils.js";
import { searchStates } from "./search.js";
//state

let currCity='Lima, PE'
let units='M'

//selector

let city = document.querySelector('.weather__city')
let dateTime = document.querySelector('.weather__datetime')
let weather__forecast = document.querySelector('.weather__forecast');
let weather__icon = document.querySelector(".weather__icon");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__minmax = document.querySelector(".weather__minmax")
let weather__info=document.querySelector('.weather__info')
export let search = document.querySelector('.weather__searchform')
export let matchList = document.getElementById('match-list')

//debounce
const debounce =(fn,delay)=>{
  let timeoutID;
  return function(...args){
    if(timeoutID){
      clearTimeout(timeoutID)
    }
    timeoutID= setTimeout(()=>{
      fn(...args)
    },delay)
  }
}

//search
search.addEventListener('keyup',debounce(()=> searchStates(search.value),500))

//change code country to name country
function convertCountryCode(country){
  let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
  return regionNames.of(country)
}
//date 
function getTimeByZone(timezone){
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12:true};
  options.timeZone=timezone
  return date.toLocaleString('en-US', options);
}
//date car
function getWeekDay(date){
  const infodate = new Date(`${date}T00:00-0800`);
  const options = { weekday: 'long', day:'numeric'};
  return infodate.toLocaleString('en-US', options)
}
//search
document.querySelector(".weather__search").addEventListener('submit', e => {
  let search = document.querySelector(".weather__searchform");
  // prevent default action
  e.preventDefault();
  // change current city
  currCity = search.value;
  // get weather forecast 
  weather__info.innerHTML=''
  getWeather();
  // clear form
  search.value = ""
})

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
  if(units !== "M"){
      // change to metric
      units = "M"
      // get weather forecast 
      weather__info.innerHTML=''
      getWeather()
  }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
  if(units !== "I"){
      // change to imperial
      units = "I"
      // get weather forecast
      weather__info.innerHTML=''
      getWeather()
  }
})
function getWeather() {
  fetch(`https://api.weatherbit.io/v2.0/current?city=${currCity}&units=${units}&key=${API_KEY}`).then(res=>res.json()).then(data=>{
    console.log(data);
    city.innerHTML = `${data.data[0].city_name}, ${convertCountryCode(data.data[0].country_code)}`
    dateTime.innerHTML = getTimeByZone(data.data[0].timezone)
    weather__forecast.innerHTML = `<p>${data.data[0].weather.description}`
    weather__icon.innerHTML = `<img src="https://cdn.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png" />`
    weather__temperature.innerHTML = `${data.data[0].temp.toFixed()}&#176`
  })
  fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${currCity}&days=6&units=${units}&key=${API_KEY}`).then(res=>res.json()).then(data=>{
    weather__minmax.innerHTML = `<p>Min: ${data.data[0].min_temp.toFixed()}&#176</p><p>Max: ${data.data[0].max_temp.toFixed()}&#176</p>`
    
    const nextDays=data.data.slice(1)
    console.log(nextDays);
    nextDays.forEach(info=>{
      console.log(info);

      const cardInfo=document.createElement('div')
      cardInfo.classList.add('weather__card')
      weather__info.appendChild(cardInfo)

      cardInfo.innerHTML=`
        <p class="weather__card_date day${info.datetime}">
        </p>
        <div class="weather__card_icon icon${info.datetime}"> </div>
        <p class="weather__card_temperature temp${info.datetime}">
        </p>
        <div class="weather__card_minmax minmax${info.datetime}">
            <p>Min: 12&#176</p>
            <p>Max: 16&#176</p>
        </div>`
      //slector date
      const weather__card_date = document.querySelector(`.day${info.datetime}`)
      const weather__card_icon = document.querySelector(`.icon${info.datetime}`)
      const weather__card_temperature = document.querySelector(`.temp${info.datetime}`)
      const weather__card_minmax = document.querySelector(`.minmax${info.datetime}`)
      console.log();
      console.log(getWeekDay(info.datetime,data.timezone));
      weather__card_date.innerHTML= getWeekDay(info.datetime,data.timezone)
      weather__card_icon.innerHTML= `<img src="https://cdn.weatherbit.io/static/img/icons/${info.weather.icon}.png" />`
      weather__card_temperature.innerHTML=`${info.temp.toFixed()}&#176`
      weather__card_minmax.innerHTML= `<p>Min: ${info.min_temp.toFixed()}&#176</p><p>Max: ${info.max_temp.toFixed()}&#176</p>`
    })
  })
}

document.body.addEventListener('load', getWeather())