//get elements from HTML
const weatherBox =document.getElementById('weather-box')
const cardContainer =document.getElementById('cardContainer')
const citySearch =document.getElementById('citySearch')
const searchButton =document.getElementById('searchButton')
const currentDate =document.getElementById('currentdate')
const cityText =document.getElementById('citytext')
const tempText =document.getElementById('temptext')
const humidText =document.getElementById('humidtext')
const iconSpace =document.getElementById('icon')
const windText =document.getElementById('windtext')
const searchBar =document.getElementById('searchBar')
const searchedCity =document.getElementsByClassName('searchedCity')
const weatherIcon =document.createElement('img')
const forecastEls = document.querySelectorAll(".forecast");
//if there is text in searchbar take searchbar value and input it in api request, else input savedName.
function nameToLatLon (savedName){
    var cityName = searchBar.value
 if (searchBar.value !=='')
    { var request = 'https://api.openweathermap.org/geo/1.0/direct?q='+cityName+ '&appid=749f3025aff34829991e7168b6bd4f9a'
 }
 else {var request = 'https://api.openweathermap.org/geo/1.0/direct?q='+savedName+ '&appid=749f3025aff34829991e7168b6bd4f9a'
 }   
    fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
// if there is no data (user input a value that dosent return a city) set searchbar value to "", return.
        if (!data[0]){ searchBar.value="";
        return;} 
//looks through data to find lattiude and longitude of selected city, then call getApi.
         lat= (data[0].lat);
         lon = (data[0].lon); 
         getApi()
//if there is a city name in searchbar, call appendCitySearch and pass cityName
         if (cityName !==""){ 
         appendCitySearch(cityName)}
    });}
//Use lat and lon to request weather data, call parseApi, reset searchbar value.
function getApi(){
    requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=749f3025aff34829991e7168b6bd4f9a'
    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            parseApi(data) 
            searchBar.value= ''  
    });}
 // clear forcast elements, then set forcast elements using data from getApi. if i ==0, append elements to weatherbox
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
        iconSpace.append(weatherIcon)
       }
       if (i== 8 || i== 16 || i ==24 || i ==32 || i ==39){
        createForcast(i)
         }}}
//create html elements for forecast and set their text using forcast data from parseApi. call append forcast and pass through forecast object + i.
function createForcast(i){
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
    appendForecast(forecast,i)
}
//iterates thorugh forcast elements and resets text.
function clearForcast(){
for ( let i=0; forecastEls.length > i; i++){
    forecastEls[i].innerHTML=''
}}
//sets i = x, then iterates through forcastels.length using math to match x data with proper forcast element (i0=x8,i1=x16,i2=x24,i3=x32).
function appendForecast(forecast,i){
    let x= i
    for ( let i=0; forecastEls.length > i; i++){
       if ((i+1)*8==x || x==39){ 
        forecastEls[i].append(forecast.date); 
        forecastEls[i].append(forecast.temp) 
        forecastEls[i].append(forecast.weather);
        forecastEls[i].append(forecast.wind);
        forecastEls[i].append(forecast.humid);
       }
    }
}
//appends last searched cityname to a functioning button under the search button.
function appendCitySearch(cityName){
CitySave= document.createElement("button");
CitySave.classList.add('button')
CitySave.innerHTML= cityName
citySearch.append(CitySave)
CitySave.addEventListener('click',searchSavedCity)
}
//creates savedName variable from innertext of button that user targets, calls nametolatlon function and passes SavedName trough.
function searchSavedCity(){
   var savedName = event.target.innerHTML
nameToLatLon(savedName)
}
searchButton.addEventListener('click', nameToLatLon);

