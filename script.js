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
            for ( var i = 0;i<data.length;i++ ) {
               var cityName = 
                console.log(cityName)
            }
    });

}




    

function parseApi(){

}
function assembleData(){

}
function appendtoHtml(){

}
searchButton.addEventListener('click', nameToLatLon);