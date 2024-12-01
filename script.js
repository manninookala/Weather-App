document.addEventListener('DOMContentLoaded', () => {
    const captureInput = document.getElementById('city-input');
    const submitBtn = document.getElementById('get-weather-btn');
    const resultInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const tempInfo = document.getElementById('temperature');
    const weatherInfo = document.getElementById('description');
    const errorMsg = document.getElementById('error-message');

    const API_KEY = '09428d8b105cd76b12bb8b68f6d4cae0';
    
    submitBtn.addEventListener('click', async function(){
        const inputCity = captureInput.value.trim();
        captureInput.value = ''; //clears the input
        if (!inputCity) return;
        console.log(inputCity);      
        try {
            const weatherData = await fetchWeatherData(inputCity);
            displayWeatherData(weatherData);
        } catch (error) {
            showErrorMsg();
        }

    });

    async function fetchWeatherData(city){
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(URL);
        console.log(response);
        if(!response.ok)  throw new Error(`${city} not found.`);
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        console.log(data);

        // Unlock the hidden bolck
        resultInfo.classList.remove('hidden');
        errorMsg.classList.add('hidden');
        
        const {main, name, weather} = data;
        cityName.textContent = name;
        tempInfo.textContent = `Temperature : ${main.temp}`;
        weatherInfo.textContent = `Weather : ${weather[0].description}`;       
    }

    function showErrorMsg(){
        resultInfo.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
});