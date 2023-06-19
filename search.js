import { search, matchList } from "./index.js";


const searchStates = async searchtText=>{
  const res = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=7&offset=0&types=CITY&namePrefix=${searchtText}&sort=-population`)
  const cities= await res.json()
  let data = cities.data.map(city=>({
    name: city.name,
    stateCode: city.regionCode,
    countryCode: city.countryCode
  }))
  if(searchtText.length === 0){
    data=[]
    matchList.innerHTML=''
  }
  console.log(data);
  
  outputHtml(data)
}
//show results in Html
const outputHtml= matches=>{
  if(matches.length > 0){
    const html= matches.map(match=>`
      <div class='search_match' omclick=selectInput(this)>
        <h4>${match.name},${match.stateCode},${match.countryCode}</h4>
      </div>
    `).join('')
    matchList.innerHTML=html;
  }
}
export {searchStates}