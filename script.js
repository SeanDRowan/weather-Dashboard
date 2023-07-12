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


const forecastWeatherEl = document.createElement("img"); 
const forecastHumidityEl = document.createElement("p");


function nameToLatLon (savedName){
    var cityName = searchBar.value
 if (searchBar.value)
    { var request = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+ '&appid=749f3025aff34829991e7168b6bd4f9a'
    appendCitySearch(cityName) }
 else {var request = 'http://api.openweathermap.org/geo/1.0/direct?q='+savedName+ '&appid=749f3025aff34829991e7168b6bd4f9a'

 }
    console.log(cityName)
    
   
    fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (var i= 0; i < data.length; i++){
         lat= (data[i].lat);
         lon = (data[i].lon); 
         
         getApi() 
    }}); 
    
}

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
          
    });
    
}


function parseApi(data){
    
    for ( var i = 0;i<data.list.length;i++ ) {
        
        city =data.city.name
       time = data.list[i].dt_txt
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
        currentDate.textContent=time
        weatherBox.appendChild(weatherIcon)
        
       }
       
       if (i== 8 || i== 16 || i ==24 || i ==32 || i ==39){
        
        createForcast(i)
        
        }
        
    
       }
       
    console.log(time)
    console.log(wind)
    console.log(temp)
    console.log(humid)
}



function createForcast(i){
   
    console.log(i)  
    const forecastWeatherEl = document.createElement("img");  
    forecastWeatherEl.setAttribute('src','https://openweathermap.org/img/wn/'+ weather+'@2x.png')
    var forecastTempEl = document.createElement("p")
   var forecastDateEl = document.createElement("p");
   var forecastWindEl = document.createElement("p");
   var forecastHumidityEl = document.createElement("p");
   forecastDateEl.innerHTML =time
   forecastWindEl.innerHTML =  'Wind speed ' +wind
    forecastTempEl.innerHTML = 'Temperture ' +temp
    forecastHumidityEl.innerHTML = 'Humidity '+ humid +'%'
    console.log(forecastTempEl)
  
if ( i == 8 ){
    forecastEls[0].append(forecastDateEl); 
    forecastEls[0].append(forecastTempEl) 
    forecastEls[0].append(forecastWeatherEl);
    forecastEls[0].append(forecastWindEl);
    forecastEls[0].append(forecastHumidityEl);
    
}
if ( i== 16) {
    forecastEls[1].append(forecastDateEl); 
    forecastEls[1].append(forecastTempEl)
    forecastEls[1].append(forecastWeatherEl);
    forecastEls[1].append(forecastWindEl);
    forecastEls[1].append(forecastHumidityEl); 
}
if ( i== 24) {
    forecastEls[2].append(forecastDateEl); 
    forecastEls[2].append(forecastTempEl)
    forecastEls[2].append(forecastWeatherEl);
    forecastEls[2].append(forecastWindEl);
    forecastEls[2].append(forecastHumidityEl); 
}
if ( i== 32) {
    forecastEls[3].append(forecastDateEl); 
    forecastEls[3].append(forecastTempEl)
    forecastEls[3].append(forecastWeatherEl);
    forecastEls[3].append(forecastWindEl);
    forecastEls[3].append(forecastHumidityEl); 
}
if ( i== 39) {
    forecastEls[4].append(forecastDateEl); 
    forecastEls[4].append(forecastTempEl)
    forecastEls[4].append(forecastWeatherEl);
    forecastEls[4].append(forecastWindEl);
    forecastEls[4].append(forecastHumidityEl); 
}
    
    
    
   console.log(time)
 
    }



function appendForcast(){

}

function appendCitySearch(cityName){
    console.log(cityName)
CitySave= document.createElement("button");
CitySave.innerHTML= cityName
citySearch.append(CitySave)

CitySave.addEventListener('click',searchSavedCity)
}
function searchSavedCity(){
   var savedName = event.target.innerHTML
nameToLatLon(savedName)
}


searchButton.addEventListener('click', nameToLatLon);
