document.addEventListener('DOMContentLoaded', function () {
    const temp = document.querySelector('.temp');
    const dateOutput = document.querySelector('.date');
    const timeOutput = document.querySelector('.time');
    const conditionOutput = document.querySelector('.condition');
    const nameOutput = document.querySelector('.name');
    const icon = document.querySelector('.icon');
    const cloudOutput = document.querySelector('.cloud');
    const humidityOutput = document.querySelector('.humidity');
    const windOutput = document.querySelector('.wind');
    const form = document.getElementById('locationInput');
    const search = document.querySelector('.search');
    const cities = document.querySelectorAll('.city');

    let cityInput = "karimnagar"; // Default city

    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            cityInput = e.target.innerHTML;
            fetchWeatherData();
            document.querySelector('.weather-app').style.opacity = "0";
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (search.value.trim().length === 0) {
            alert('Please type in a city name');
        } else {
            cityInput = search.value.trim();
            fetchWeatherData();
            search.value = "";
            document.querySelector('.weather-app').style.opacity = "0";
        }
    });

    function fetchWeatherData() {
        fetch(`https://api.weatherapi.com/v1/current.json?key=fb36be2e55ef4a959b291203231812&q=${cityInput}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                temp.innerHTML = data.current.temp_c + '&#176;';
                conditionOutput.innerHTML = data.current.condition.text;
                dateOutput.innerHTML = data.location.localtime.split(' ')[0];
                timeOutput.innerHTML = data.location.localtime.split(' ')[1];
                nameOutput.innerHTML = data.location.name;
                const iconId = data.current.condition.icon; // Icon code from the API
                const iconUrl = `https:${iconId}`; // Constructing the URL for the icon
                const iconElement = document.querySelector('.icon');
                iconElement.src = iconUrl;
                iconElement.alt = data.current.condition.text;

                cloudOutput.innerHTML = data.current.cloud + "%";
                humidityOutput.innerHTML = data.current.humidity + "%";
                windOutput.innerHTML = data.current.wind_kph + "km/h";

                let timeOfDay = "day";
                if (!data.current.is_day) {
                    timeOfDay = "night";
                }

                const code = data.current.condition.code;
                // Adjust background and button colors based on weather condition codes
                if (!data.current.is_day) {
                    timeOfDay = "night";
                }

                if (code === 1000) {
                    document.querySelector('.weather-app').style.backgroundImage = `url(./images/${timeOfDay}/Clear.jpg)`;
                    document.querySelector('.submit').style.background = (timeOfDay === "day") ? "#e5ba92" : "#181e27";
                } else if (
                    code == 1003 ||
                    code == 1006 ||
                    code == 1009 ||
                    code == 1030 ||
                    code == 1069 ||
                    code == 1087 ||
                    code == 1135 ||
                    code == 1273 ||
                    code == 1276 ||
                    code == 1279 ||
                    code == 1283
                ) {
                    document.querySelector('.weather-app').style.backgroundImage = `url(./images/${timeOfDay}/clouds.jpg)`;
                    document.querySelector('.submit').style.background = (timeOfDay === "day") ? "#fa6d1b" : "#181e27";
                } else if (
                    code == 1065 ||
                    code == 1069 ||
                    code == 1072 ||
                    code == 1150 ||
                    code == 1153 ||
                    code == 1180 ||
                    code == 1183 ||
                    code == 1186 ||
                    code == 1189 ||
                    code == 1192 ||
                    code == 1195 ||
                    code == 1204 ||
                    code == 1207 ||
                    code == 1240 ||
                    code == 1243 ||
                    code == 1246 ||
                    code == 1249 ||
                    code == 1252
                ) {
                    document.querySelector('.weather-app').style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                    document.querySelector('.submit').style.background = (timeOfDay === "day") ? "#647d75" : "#325c80";
                } else {
                    // Default background and button colors if the code doesn't match specific conditions
                    document.querySelector('.weather-app').style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                    document.querySelector('.submit').style.background = (timeOfDay === "day") ? "#4d72aa" : "#1b1b1b";
                }

                document.querySelector('.weather-app').style.opacity = "1";
            })
            .catch(() => {
                alert('City not found, please try again');
                document.querySelector('.weather-app').style.opacity = "1";
            });
    }

    fetchWeatherData();
    document.querySelector('.weather-app').style.opacity = "1";
});
