//Open Wheather API

const apiKeyWeather = 'API-KEY-OPEN-WEATHER';
const inputCity = document.querySelector('.inputCity');
const btnSearch = document.querySelector('#btnSearch');
const tempNow = document.querySelector('#tempNow');
const tempMax = document.querySelector('#tempMax');
const tempMin = document.querySelector('#tempMin');
const humidity = document.querySelector('#txtHumidity');
const windVel = document.querySelector('#windVel');
const windDir = document.querySelector('#windDir');
let iconWeather = document.querySelector('#iconWeather');


btnSearch.addEventListener("click", async (e) =>{
    e.preventDefault();
    const city = inputCity.value;
    getWeather(city);
});

const getWeather = async (city) => {
   const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyWeather}&lang=pt_br`;
   const answer = await fetch(urlApi);
   const dataJson = await answer.json();
   console.log(dataJson);
   displayResult(dataJson);
};

function displayResult(dataJson){
    tempNow.innerHTML = "Atual: " + String(dataJson.main.temp) + " °C" ; 
    tempMax.innerHTML = "Max: " + String(dataJson.main.temp_max) + " °C" ;
    tempMin.innerHTML = "Min: " + String(dataJson.main.temp_min) + " °C";
    humidity.innerHTML = String(dataJson.main.humidity)+" %";
    windVel.innerHTML = "Velocidade: " + String(dataJson.wind.speed) + " m/s";
    
    //Wind direction
    let directions = ["N(Norte)", "NNE(nor-nordeste)", "NE(Nordeste)", "ENE(lés-nordeste)", "E(Leste)", "ESE(lés-sudeste)", "SE(Sudeste)", "SSE(sul-sudeste)",
                        "S(Sul)", "SSW(sul-sudoeste)", "SW(Sudoeste)", "WSW(oés-sudoeste)", "W(Oeste)", "WNW(oés-noroeste)", "NW(Noroeste)", "NNW(nor-noroeste)", "N(Norte)"];
    
    windDir.innerHTML = "Direção: " + directions[(dataJson.wind.deg / 22.5).toFixed(0)];

    //Weather Icon
    let iconW = String(dataJson.weather[0].icon);
    iconWeather.src = "./media/icons/"+iconW+".png"
};


//Tom Tom API

const apiKeyMap = 'API-KEY-TOM-TOM';
const appName = 'PrevisaoTempo';
const appVersion = '1.0';
tt.setProductInfo(appName, appVersion);


var map = tt.map({
  key: apiKeyMap,
  container: 'map-div',
  center: [10, 10],
  zoom: 0,
});


var moveMap = function(lnglat){
    map.flyTo({
        center:lnglat,
        zoom: 12,
    })
}

function callbackFn(result) {
    if(result.results){
        moveMap(result.results[0].position)
    }
};

var search =function(){ 
    tt.services.fuzzySearch({
        key: apiKeyMap,
        query: inputCity.value,
    }).then(callbackFn);
}

