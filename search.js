import { search, matchList } from "./index.js";


const searchStates = async searchtText=>{
  const res = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=7&offset=0&types=CITY&namePrefix=${searchtText}&sort=-population`)
  const cities= await res.json()
  const data = cities.data.map(city=>({
    name: city.name,
    stateCode: city.regionCode,
    countryCode: city.countryCode
  }))
  console.log(data);
}
export {searchStates}