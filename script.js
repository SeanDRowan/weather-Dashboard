const weatherBox =document.getElementById('weather-box')
const cardContainer =document.getElementById('cardContainer')
const citySearch =document.getElementById('citySearch')
const searchButton =document.getElementById('searchButton')
const currentDate =document.getElementById('currentdate')
const cityText =document.getElementById('citytext')
const tempText =document.getElementById('temptext')
const humidText =document.getElementById('humidtext')
const windText =document.getElementById('windtext')
const searchBar =document.getElementById('searchBar')
const searchedCity =document.getElementsByClassName('searchedCity')
const weatherIcon =document.createElement('img')
const forecastEls = document.querySelectorAll(".forecast");
//
function nameToLatLon (savedName){
    var cityName = searchBar.value
 if (searchBar.value)
    { var request = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+ '&appid=749f3025aff34829991e7168b6bd4f9a'
    appendCitySearch(cityName) 
 }
 else {var request = 'http://api.openweathermap.org/geo/1.0/direct?q='+savedName+ '&appid=749f3025aff34829991e7168b6bd4f9a'
 }   
    fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (var i= 0; i < data.length; i++){
         lat= (data[i].lat);
         lon = (data[i].lon); 
         getApi() 
    }});}
//
function getApi(){
    console.log()
    requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=749f3025aff34829991e7168b6bd4f9a'
    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data)
            parseApi(data) 
            searchBar.value= ''  
    });}
    //
function parseApi(data){
   clearForcast()
    for ( var i = 0;i<data.list.length;i++ ) { 
        city =data.city.name
       time = data.list[i].dt_txt.substr(0,11)
       wind = data.list[i].wind.speed
       temp = data.list[i].main.temp
       humid = data.list[i].main.humidity
       weather = data.list[i].weather[0].icon
       weatherIcon.setAttribute('src','https://openweathermap.org/img/wn/'+ weather+'@2x.png')
       if (i ==0 ){
        cityText.textContent= city
        tempText.textContent= 'Temperture ' +temp
        windText.textContent= 'Wind speed ' +wind
        humidText.textContent= 'Humidity '+ humid +'%'
        currentDate.textContent='('+time+')'
        weatherBox.appendChild(weatherIcon)
       }
       if (i== 8 || i== 16 || i ==24 || i ==32 || i ==39){
        createForcast(i)
         }}}
//
function createForcast(i){
    let x= i
    const forecastWeatherEl = document.createElement("img");  
    forecastWeatherEl.setAttribute('src','https://openweathermap.org/img/wn/'+ weather+'@2x.png')
    var forecastTempEl = document.createElement("p")
   var forecastDateEl = document.createElement("p");
   var forecastWindEl = document.createElement("p");
   var forecastHumidityEl = document.createElement("p");
   forecastDateEl.innerHTML ='('+time+')'
   forecastWindEl.innerHTML =  'Wind speed ' +wind
    forecastTempEl.innerHTML = 'Temperture ' +temp
    forecastHumidityEl.innerHTML = 'Humidity '+ humid +'%'
    let forecast = {'date':forecastDateEl, 'wind': forecastWindEl,'temp': forecastTempEl,'humid':forecastHumidityEl,'weather':forecastWeatherEl}
    console.log(i)
    appendForecast(forecast,i)
  
}
//
function clearForcast(){
for ( let i=0; forecastEls.length > i; i++){
    forecastEls[i].innerHTML=''
}

}
function appendForecast(forecast,i){
    let x= i
    console.log(i)
    for ( let i=0; forecastEls.length > i; i++){
       if ((i+1)*8==x || x==39){ console.log(x)
        forecastEls[i].append(forecast.date); 
        forecastEls[i].append(forecast.temp) 
        forecastEls[i].append(forecast.weather);
        forecastEls[i].append(forecast.wind);
        forecastEls[i].append(forecast.humid);
       }
    }
}
//
function appendCitySearch(cityName){
    console.log(cityName)
CitySave= document.createElement("button");
CitySave.innerHTML= cityName
citySearch.append(CitySave)
CitySave.addEventListener('click',searchSavedCity)
}
//
function searchSavedCity(){
   var savedName = event.target.innerHTML
nameToLatLon(savedName)
}
//
searchButton.addEventListener('click', nameToLatLon);

