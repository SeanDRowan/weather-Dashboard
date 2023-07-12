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
const forecastDateEl = document.createElement("p");
const forecastWindEl = document.createElement("p");

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
       
       if (i== 8 || i== 16){
        createForcast(i)
        appendForcast(i)
        }
        
    
       }
       
    console.log(time)
    console.log(wind)
    console.log(temp)
    console.log(humid)
}



function createForcast(i){
     x = i
    console.log(i)
    forecastDateEl[i] = document.createElement("p");
    forecastWindEl[i] = document.createElement("p");
    forecastTempEl = document.createElement("p");
    forecastWeatherEl[i] = document.createElement("img"); 
    forecastHumidityEl[i] = document.createElement("p");
   forecastTempEl.innerHTML = 'Temperture ' +temp
   forecastDateEl.innerHTML =time
   forecastWindEl.innerHTML =  'Wind speed ' +wind
   forecastWeatherEl.img = weatherIcon
   forecastHumidityEl.innerHTML = 'Humidity '+ humid +'%'
  
  
   console.log(time)
 
    }





function appendForcast(){
    console.log(forecastTempEl)
    for (i=0; i<forecastEls.length; i++) {
        
      
 forecastEls[i].append(forecastTempEl) 

 forecastEls[i].append(forecastDateEl);       

forecastEls[i].append(forecastWindEl);
forecastEls[i].append(forecastWeatherEl);
forecastEls[i].append(forecastHumidityEl); 
}


}

function appendCitySearch(cityName){
    console.log(cityName)
CitySave= document.createElement("button");
CitySave.innerHTML= cityName
citySearch.append(CitySave)
localStorage.setItem('city','cityName')
CitySave.addEventListener('click',searchSavedCity)
}
 
function searchSavedCity(){
   var savedName = event.target.innerHTML

nameToLatLon(savedName)
}


searchButton.addEventListener('click', nameToLatLon);
