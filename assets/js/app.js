// select selement
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

// app data objek weather
const weather = {};

weather.temperature = {
    unit : "celcius"
}

// app const and vars
const KELVIN = 273;
// api key dari akun OpenWeatherMap.org 
const key = "82005d27a116c2880c8f0fcb866998a0";

// cek jika browser mendukung penggunaan geolocation
if('geolocation in navigator'){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.getElementsByClassName.display("block");
    notificationElement.innerHTML = "<p> Browser doesn't Support Geolocation</p>";
}

// mengatur posisi pengguna
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// menampilkan error jika bermasalah dengan geolocation
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// mendapatkan weather dari api provider
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api).then(
        function(response){
            // diubah ke data json
            let data = response.json();
            return data;
    }).then(
        function(data){
            // update object properties
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
    }).then(
        function(){
            displayWeather();
        }
    );
}

// menampilkan weather
function displayWeather(){
    iconElement.innerHTML = `<img src="assets/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// konversi celcius ke fahrenheit
function celciusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celcius"){
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit); //agar menjadi bilangan yang bulat

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celcius"
    }
});