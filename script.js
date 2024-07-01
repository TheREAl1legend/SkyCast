document.getElementById('location-form').addEventListener('submit', getWeather);

async function getWeather(e) {
    e.preventDefault();
    
    const locationInput = document.getElementById('location-input');
    const location = locationInput.value.trim();
    
    if (!location) {
        alert('Please enter a valid location');
        return;
    }

    const apiKey = '80545ceb2b1bba727b82e6a120229a36'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Error: City not found');
            } else {
                throw new Error('Error: Failed to fetch weather data');
            }
        }
        const data = await response.json();
        displayWeather(data);
        changeBackground(data.weather[0].main);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError(error.message);
    }

    locationInput.value = '';
}

function displayWeather(data) {
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const weatherDescriptionElement = document.getElementById('weather-description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');

    cityElement.textContent = data.name;
    temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
    weatherDescriptionElement.textContent = `Weather: ${data.weather[0].description}`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayError(message) {
    const cityElement = document.getElementById('city');
    cityElement.textContent = 'Error';

    const temperatureElement = document.getElementById('temperature');
    temperatureElement.textContent = message;

    const weatherDescriptionElement = document.getElementById('weather-description');
    weatherDescriptionElement.textContent = '';

    const humidityElement = document.getElementById('humidity');
    humidityElement.textContent = '';

    const windSpeedElement = document.getElementById('wind-speed');
    windSpeedElement.textContent = '';
}

function changeBackground(weatherMain) {
    const body = document.body;

    switch (weatherMain.toLowerCase()) {
        case 'clear':
        case 'clear sky':
        case 'sunny':
            body.style.backgroundImage = 'url("clear.png")';
            break;
        case 'overcast clouds':
        case 'scattered clouds':
        case 'clouds':
        case 'squalls':
        case 'broken clouds':
            body.style.backgroundImage = 'url("clouds.jpeg")';
            break;
        case 'rain':
        case 'heavy rain':
            case 'moderate rain':
            case 'light rain':
            case 'drizzle':
            case 'mist':
            body.style.backgroundImage = 'url("rainy.jpeg")';
            break;
        default:
            body.style.backgroundImage = 'url("default.jpg")';
            break;
    }

    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'fixed';
}
