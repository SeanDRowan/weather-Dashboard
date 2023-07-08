const weatherBox =document.getElementById('weather-box')
const cardContainer =document.getElementById('cardContainer')
const citySearch =document.getElementById('citySearch')
const searchButton =document.getElementById('searchButton')
const cityText =document.getElementById('citytext')


function nameToLatLon (){
    var cityName = 'SanAntonio'
    var request = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+ '&appid=749f3025aff34829991e7168b6bd4f9a'
    fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        for (var i= 0; i < data.length; i++){
         lat= (data[i].lat);
         lon = (data[i].lon);  
         console.log(data)
         getApi() 
    }}); 
    
}

function getApi(){
    requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=749f3025aff34829991e7168b6bd4f9a'
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
       cityText.textContent= city

       time = data.list[i].dt
       wind = data.list[i].wind.speed
       temp = data.list[i].main.temp
       humid = data.list[i].main.humidity
       weather = data.list[i].weather
       var d = new Date(time*1000);
       dateStamp = d.getDate() + '/' + (d.getMonth()) +  " " + d.getFullYear() + d.getHours();
        
      console.log(dateStamp)
      console.log(wind)
      console.log(temp)
      console.log(humid)
        }
}
function assembleData(){

}
function appendtoHtml(){

}
searchButton.addEventListener('click', nameToLatLon);