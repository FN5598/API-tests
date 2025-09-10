let date = dayjs().format('dddd, MMMM, D, YYYY');

const weatherHTML = `
        <div class="weather-info-wrapper">
            <div class="weather-info">
                <h1 class="forecast"></h1>
                <p class="date"></p>
                <p class="temperature" id="temperature"></p>
                <p class="feels-like"></p>
                <p class="wind-speed"></p>
                <p class="weather"></p>
                <p class="sunrise"></p>
                <p class="sunset"></p>
            </div>
            <div class="emoji"></div>
        </div>
        `;

let weatherContainer = document.querySelector('.weather-info-container');
weatherContainer.innerHTML += weatherHTML;
const weatherForecast = document.querySelector('.forecast');
const cityTemperature = document.querySelector('.temperature');
const button = document.querySelector('button');
let longitude;
let latitude;

button.addEventListener('click', async () => {
    let city = document.querySelector('.input').value;
    if (!city) return;

    await getWeatherByCity(city);
    document.querySelector('.input').value = '';
    document.querySelector('.date').innerHTML = date;
    });

document.querySelector(`.input`).addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        let city = document.querySelector('.input').value;
        await getWeatherByCity(city);
        document.querySelector('.input').value = '';
        document.querySelector('.date').innerHTML = date;
    }
});


async function getCoordinates(city) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country } = data.results[0];
        return { latitude, longitude, name, country };
    } else {
        return null;
    }
}

async function getWeatherByCity(city) {
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
        weatherForecast.textContent = 'City not found';
        cityTemperature.textContent = '';
        return;
    } 
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&daily=sunrise,sunset&hourly=apparent_temperature`);
    const data = await response.json();

    weatherForecast.innerHTML = `${coordinates.country}, ${coordinates.name}`;
    cityTemperature.innerHTML = `Temperature: ${data.current_weather.temperature}°C`;
    document.querySelector('.wind-speed').innerHTML = `Wind Speed: ${data.current_weather.windspeed} km/h`;
    let weatherCode = data.current_weather.weathercode;
    document.querySelector('.weather').textContent = `Weather: ${getWeatherDescription(weatherCode)}`;
    document.querySelector('.sunrise').innerHTML = `Sunrise: ${data.daily.sunrise[0].slice(11)}`;
    document.querySelector('.sunset').innerHTML = `Sunset: ${data.daily.sunset[0].slice(11)}`;
    let hourlyTemperatures = data.hourly.apparent_temperature;
    let currentHour = new Date().getHours();
    let feelsLikeTemperature = hourlyTemperatures[currentHour];
    document.querySelector('.feels-like').innerHTML = `Feels like: ${feelsLikeTemperature}°C`;
};

function getWeatherDescription(code) {
    const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    60: "Slight rain",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
    };
    
    let currentEmoji;
    if (code === 55 || code === 61 || code === 63 || code === 65) {
        currentEmoji = '🌧️';
    } else if (code === 71 || code === 73 || code === 75) {
        currentEmoji = '❄️';
    } else if (code === 80 || code === 81 || code === 82) {
        currentEmoji = '🌦️'; 
    } else if (code === 95 || code === 96 || code === 99) {
        currentEmoji = '⛈️'; 
    } else if (code === 0) {
        currentEmoji = '☀️'; 
    }   else if (code === 1 || code === 2) {
        currentEmoji = '🌤️'; 
    } else if (code === 3) {
        currentEmoji = '☁️'; 
    } else if (code === 45 || code === 48) {
        currentEmoji = '🌫️'; 
    } else {
        currentEmoji = '🌨️';
    };
    document.querySelector('.emoji').innerHTML = currentEmoji;
    return weatherDescriptions[code] || "Unknown weather condition";
}