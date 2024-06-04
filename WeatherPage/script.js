const apiKey = 'API KEY HERE '

//UI ELEMENTS
//search-box elements
const btnSearch = document.querySelector("#search-button");
const search = document.querySelector(`#Search`);


//div elements
const notFound = document.querySelector('.not-found');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.details');
const weatherImg = document.querySelector('.weather-box img');


//weather informations elements
const temperature = document.querySelector('#temperature');
const wind = document.querySelector('#wind-speed');
const description = document.querySelector('#descripiton');
const humidity = document.querySelector('#humidity');
//UI ELEMENTS

btnSearch.addEventListener("click", async () => {
    try {
        const city = search.value;
        //Fetch cordianates of the City
        const cordinateResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`);
        if (!cordinateResponse.ok) {
            const message = `Cordinates response error: ${cordinateResponse.statusText}`;
            getNotFound(notFound, weatherBox, weatherDetails);
            throw new Error(message);
        }
        const cordinateData = await cordinateResponse.json();
        //Fetch weather 
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cordinateData[0].lat}&lon=${cordinateData[0].lon}&appid=${apiKey}`)
        if (!weatherResponse.ok) {
            const message = `Weather response error: ${weatherResponse.statusText}`;
            getNotFound(notFound, weatherBox, weatherDetails);
            throw new Error(message);
        }
        const weatherData = await weatherResponse.json();
        getFound(notFound, weatherBox, weatherDetails);
        console.log(weatherData);

        content(temperature, GetCelsius(weatherData.main.temp));
        content(description, weatherData.weather[0].description);
        content(wind, weatherData.wind.speed);
        content(humidity, weatherData.main.humidity);
        changeImg(weatherImg, weatherData.weather[0].main);

    }
    catch (err) {
        getNotFound(notFound, weatherBox, weatherDetails);
        console.log(err.message);
    }
});




function GetCelsius(data) {
    return Math.round(data - 273.15);
}



function getNotFound(notFound, weatherBox, weatherDetails) {
    notFound.style.display = 'block';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
}

function getFound(notFound, weatherBox, weatherDetails) {
    notFound.style.display = 'none';
    weatherBox.style.display = 'block';
    weatherDetails.style.display = 'block';
}


function content(divSelector, value) {
    divSelector.innerText = value;
}


function changeImg(div, type) {
    switch (type) {
        case 'Clear':
            div.src = '/Pages/WeatherPage/images/clear.png';
            break;
        case 'Clouds':
            div.src = '/Pages/WeatherPage/images/cloud.png';
            break;

        case 'Rain':
            div.src = '/Pages/WeatherPage/images/rain.png';
            break;
        case 'Snow':
            div.src = '/Pages/WeatherPage/images/snow.png';
            break;
        case 'Storm':
            div.src = '/Pages/WeatherPage/images/storm.png';
            break;
        case 'Mist':
            div.src = '/Pages/WeatherPage/images/mist.png';
            break;

        default:
            div.src = '/Pages/WeatherPage/images/mist.png';
    }

}


