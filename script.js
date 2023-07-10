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
const weatherIcon =document.createElement('img')



function nameToLatLon (){
    var cityName = searchBar.value
    console.log(cityName)
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
       if (i ==0){
        cityText.textContent= city
        tempText.textContent= temp
        windText.textContent= wind
        humidText.textContent=humid
        currentDate.textContent=time
        weatherBox.appendChild(weatherIcon)
       }
        }
        console.log(time)
        console.log(wind)
        console.log(temp)
        console.log(humid)
        
}
function assembleData(){
  

}
function appendtoHtml(){
    

}
searchButton.addEventListener('click', nameToLatLon);