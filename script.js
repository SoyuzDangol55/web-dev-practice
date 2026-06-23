console.log("✅ External script.js loaded successfully!");

const inputBox = document.getElementById('SearchBar');
const searchbtn = document.getElementById('button1');
const weather_img = document.getElementById('weather-image');
const temperature = document.getElementById('temperature');
const description = document.getElementById('Description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');

const apikey = "";//OpenWeather.com

async function checkWeather(city) {
    if (!city || city.trim() === "") {
        console.log("Please enter a city name");
        alert("Please enter a city name");
        return;
    }

    console.log("Fetching weather for:", city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        console.log("Full weather data:", weather_data);

        if (weather_data.cod !== 200) {
            alert(weather_data.message || "City not found!");
            return;
        }

        // Update the UI
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}<sup>°C</sup>`;
        description.textContent = weather_data.weather[0].description.charAt(0).toUpperCase() + 
                                 weather_data.weather[0].description.slice(1);
        
        humidity.textContent = `${weather_data.main.humidity}%`;
        wind.textContent = `${(weather_data.wind.speed * 3.6).toFixed(1)} km/H`;


let weatherCondition = weather_data.weather[0].main.toLowerCase(); 

let imagePath = "images/default.png"; 


switch (weatherCondition) {
    case "clear":
        imagePath = "images/sun.png";
        break;
    case "clouds":
        imagePath = "images/clouds.png";
        break;
    case "rain":
    case "drizzle":
        imagePath = "images/rain.png";
        break;
    case "thunderstorm":
        imagePath = "images/storm.png";
        break;
    case "snow":
        imagePath = "images/snowy.png";
        break;  

    case "mist":
    case "fog":
    case "haze":
    case "smoke":
        imagePath = "images/mist.png";
        break;
    default:
        imagePath = "images/default.png"
}

weather_img.src = imagePath;
weather_img.alt = weather_data.weather[0].description;
    } catch (error) {
        console.error("🚨 Error:", error);
        alert("Failed to fetch weather. Check API key and internet.");
    }
}

// Event listeners
searchbtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        checkWeather(inputBox.value);
    }
});

// Load Kathmandu by default when page opens
window.addEventListener('load', () => {
    checkWeather("Kathmandu");
});