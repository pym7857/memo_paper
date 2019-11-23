const weather = document.querySelector(".js-weather");

const API_KEY = "d238287a6a427ee1963952e4cc91f551"; // https://home.openweathermap.org/api_keys
const COORDS = 'coords';

// https://openweathermap.org/current -> By geographic coordinates API Call()
// https://openweathermap.org/current#data -> 단위:Celsius 로 변경 (units=metric)
function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ). then(function(response){
        return response.json(); // 우리가 원하는것은 json형태의 data
    }). then(function(json){
        //console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}˚ @ ${place}`;
    }); 
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // localStorage는 string형태로 저장
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // Key, Value 같을때 표기법
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function hanldeGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){ 
    // 위치제공 동의 - 웹 알림창 (수락, 거절) 띄우기
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, hanldeGeoError); 
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();