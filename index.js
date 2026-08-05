// Weather app
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "730a4fefc5c6dea74bad57fd7e4f82f3";
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error.log(error);
            displayError(error);
            
        }

    }else{
        displayError("Please enter a vali city name");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("could not fetch weather data");
    } else{
        return await response.json();
    }
   
}

function displayWeatherInfo(data){
    console.log(data);
    const {name: city, 
           main:{temp, humidity}, 
           weather: [{description, id}]}= data;
           card.textContent="";
           card.style.display="flex";
           const cityDisplay = document.createElement("h1");
           const tempDisplay = document.createElement("p");
           const humidityDisplay = document.createElement("p");
           const descDisplay = document.createElement("p");
           const  weahterEmoji = document.createElement("p");
           
           cityDisplay.textContent=city;
           tempDisplay.textContent= `${((temp - 273.15)* 9/5 + 32).toFixed(0)}F`;
           humidityDisplay.textContent = `Humidity: ${humidity}%`;
           descDisplay.textContent = description;
           weahterEmoji.textContent = getWeatherEmoji(id);


           cityDisplay.classList.add("cityDisplay");
           tempDisplay.classList.add("tempDisplay");
           humidityDisplay.classList.add("humidityDisplay");
           descDisplay.classList.add("descDisplay");
           weahterEmoji.classList.add("weatherEmoji");

           card.appendChild(cityDisplay);
           card.appendChild(tempDisplay);
           card.appendChild(humidityDisplay);
           card.appendChild(descDisplay);
           card.appendChild(weahterEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >=200 && weatherId < 300): return "⛈️";
        case(weatherId >=300 && weatherId < 400): return "☔";
        case(weatherId >=500 && weatherId < 600): return "🌨️";
        case(weatherId >=600 && weatherId < 700): return "❄️";
        case(weatherId >=700 && weatherId < 800): return "🌁";
        case(weatherId == 800): return "☀️";
        case(weatherId >=801 && weatherId < 810): return "☁️";
        default: return "❓";
    }
    
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}