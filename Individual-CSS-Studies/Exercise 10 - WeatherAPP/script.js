let cardIsDisplaying = false;
let animationIsPlaying = false;

const APIlink = "http://api.openweathermap.org/data/2.5/forecast?id=524901";

/* ----------------------------------------------------- */
const APIkey = "<insert your openweather api key here>"; //
/* ----------------------------------------------------- */

const styles = getComputedStyle(document.body);

const weatherCard = document.querySelector(".weather-info-container");
const sunIcon = document.querySelector(".sun-icon");

const cardOpacityAnimDuration = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--appearAnimDuration').slice(0, -1)) * 1000;
const cardAppearAnimDur = Number(window.getComputedStyle(document.documentElement).getPropertyValue('--card-height-anim-duration').slice(0, -1)) * 1000;

async function getFormData(event) {
    // to not reload the page:
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());    
    const cityName = data.location;

    if (!cityName) {
        displayErrorMessage("Please, select an valid non-empty city name.");
        return null;
    }

    try {
        let weatherInfo = await getWeatherData(cityName);
        displayWeatherInfo(weatherInfo);
    } catch(error) {
        displayErrorMessage(error);
        return null;
    }

    return;
}

async function getWeatherData(cityName) {
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
    const response = await fetch(APIurl);
    if (!response.ok) throw new Error("Could not fetch weather data");

    return await response.json();
}

async function animateWeatherInfoEntrace() {
    // change the card opacity:
    return applyAppearAnimation(weatherCard, cardOpacityAnimDuration)
    .then(result => {
        // change card height:
        return applyDisplayAnim(weatherCard, cardAppearAnimDur);
    })
    .then(result => {
        // change card items opacity:
        Array.from(weatherCard.children).forEach(element => {
            applyAppearAnimation(element, cardOpacityAnimDuration);
        });

        return;
    })
    .then(result => {
        // change opacity from sun icon:
        return applyAppearAnimation(sunIcon, cardOpacityAnimDuration);
    })
    .then(result => {
        // TODO: improve this later
        if (weatherCard.children.length > 1) {
            // apply spinning animation to sun icon:
            sunIcon.classList.remove("visible-element");
            sunIcon.classList.remove("sunIconAnimation");
            sunIcon.classList.add("sunIconAnimation");
        }  
    });
}

async function animateWeatherInfoExit() {
    return new Promise((resolve, reject) => {
        // TODO: improve this later
        if (weatherCard.children.length > 1) {
            sunIcon.style.opacity = "1";
            sunIcon.classList.remove("sunIconAnimation");
        }
        setTimeout(() => { resolve("finished"); }, 500);
    }).then(result => {
        return applyDissapearAnim(sunIcon, cardOpacityAnimDuration);
    })
    .then(result => {
        Array.from(weatherCard.children).forEach(element => {
            applyDissapearAnim(element, cardOpacityAnimDuration);
        });

        return;
    })
    .then(result => {
        return applyCollapseAnim(weatherCard, cardAppearAnimDur);
    })
    .then(result => {
        return applyDissapearAnim(weatherCard, cardOpacityAnimDuration);
    })
}

function applyAppearAnimation(DOMelement, durationMS) {
    return new Promise((resolve, reject) => {
        DOMelement.classList.remove("card-height-close-animation");
        DOMelement.classList.remove("hidden-element");
        DOMelement.classList.remove("visible-element");
        DOMelement.classList.add("visible-element");
        
        setTimeout(() => { resolve("finished"); }, durationMS);
    });
}

function applyDissapearAnim(DOMelement, durationMS) {
    return new Promise((resolve, reject) => {
        DOMelement.classList.remove("card-height-close-animation");
        DOMelement.classList.remove("visible-element");
        DOMelement.classList.remove("hidden-element");
        DOMelement.classList.add("hidden-element");

        setTimeout(() => { resolve("finished"); }, durationMS);
    });
}

function applyDisplayAnim(DOMelement, msDelay) {
    return new Promise((resolve, reject) => {
        DOMelement.classList.remove("card-height-close-animation");
        DOMelement.classList.remove("card-height-open-animation");
        DOMelement.classList.add("card-height-open-animation")

        setTimeout(() => { resolve("finished"); }, msDelay);
    })
}

function applyCollapseAnim(DOMelement, msDelay) {
    return new Promise((resolve, reject) => {
        DOMelement.classList.remove("card-height-open-animation");
        DOMelement.classList.remove("card-height-close-animation");
        DOMelement.classList.add("card-height-close-animation");
        
        setTimeout(() => { resolve("finished"); }, msDelay + 2000);
    })
}

function displayWeatherInfo(weatherInfo) {
    if (animationIsPlaying) return;
    
    animationIsPlaying = true;

    if (!cardIsDisplaying) {
        const {
            name: city,
            main: { temp, humidity },
            weather: [{ description, id }]
        } = weatherInfo;

        const celsiusTemperature = (Number(temp) - 273.15).toFixed(1);
        const fahrenheitTemperature = (Number(celsiusTemperature) * 9 / 5 + 32).toFixed(1);

        // cleaning the previous content:
        weatherCard.innerHTML = "";

        let newWeatherInformations = [];
        let newWeatherInformationElement;

        for (let i = 0; i < 5; i++) {
            newWeatherInformationElement = document.createElement("p");
            newWeatherInformationElement.className = "weather-data";
            newWeatherInformations.push(newWeatherInformationElement);
        }

        // capitalize the first letter of citi's name:
        newWeatherInformations[0].textContent = city.slice(0, 1).toUpperCase().concat(city.slice(1));
        newWeatherInformations[1].textContent = (fahrenheitTemperature.concat("°F")).concat(" / ").concat(celsiusTemperature.concat("°C"));
        newWeatherInformations[2].textContent = "Humidity: ".concat(humidity).concat("%");
        newWeatherInformations[3].textContent = description;
        newWeatherInformations[4].textContent = getWeatherEmoji(id);

        newWeatherInformations.forEach(element => {
            weatherCard.appendChild(element);
        })

        // TODO: refactor this mess later
        animateWeatherInfoEntrace()
        .then(result => { 
            animationIsPlaying = false; 
            cardIsDisplaying = true;
            return; 
        }).then(result => {
            if (weatherCard.children.length > 1) weatherCard.children[4].classList.add("upDownAnim");
        });

        return;
    }

    // TODO: fix this mess later on
    if (weatherCard.children.length > 1) {
        weatherCard.children[4].style.opacity = "1";
        weatherCard.children[4].classList.remove("visible-element");
        weatherCard.children[4].classList.remove("hidden-element");
        weatherCard.children[4].classList.remove("upDownAnim");
    }

    // card is displating:
    animateWeatherInfoExit()
    .then(result => {
        const {
            name: city,
            main: { temp, humidity },
            weather: [{ description, id }]
        } = weatherInfo;

        const celsiusTemperature = (Number(temp) - 273.15).toFixed(1);
        const fahrenheitTemperature = (Number(celsiusTemperature) * 9 / 5 + 32).toFixed(1);

        // cleaning the previous content:
        weatherCard.innerHTML = "";

        let newWeatherInformations = [];
        let newWeatherInformationElement;

        for (let i = 0; i < 5; i++) {
            newWeatherInformationElement = document.createElement("p");
            newWeatherInformationElement.className = "weather-data";
            newWeatherInformations.push(newWeatherInformationElement);
        }

        // capitalize the first letter of citi's name:
        newWeatherInformations[0].textContent = city.slice(0, 1).toUpperCase().concat(city.slice(1));
        newWeatherInformations[1].textContent = (fahrenheitTemperature.concat("°F")).concat(" / ").concat(celsiusTemperature.concat("°C"));
        newWeatherInformations[2].textContent = "Humidity: ".concat(humidity).concat("%");
        newWeatherInformations[3].textContent = description;
        newWeatherInformations[4].textContent = getWeatherEmoji(id);

        newWeatherInformations.forEach(element => {
            weatherCard.appendChild(element);
        })

        return;
    })
    .then(result => {
        return animateWeatherInfoEntrace();
    })
    .then(result => {
        cardIsDisplaying = true;
        animationIsPlaying = false;
        return;
    })
    .then(result => {
        if (weatherCard.children.length > 1) weatherCard.children[4].classList.add("upDownAnim");
        return
    });

    return;
}

function displayErrorMessage(message) {
    if (animationIsPlaying) return;

    animationIsPlaying = true;

    if (!cardIsDisplaying) {
        let errorMessage = document.createElement("p");
        errorMessage.className = "weather-data";
        errorMessage.textContent = message;

        weatherCard.innerHTML = "";
        weatherCard.appendChild(errorMessage);

        animateWeatherInfoEntrace()
        .then(result => { animationIsPlaying = false; cardIsDisplaying = true; return; });

        return;
    }

    // TODO: fix this mess later on
    if (weatherCard.children.length > 1) {
        weatherCard.children[4].style.opacity = "1";
        weatherCard.children[4].classList.remove("visible-element");
        weatherCard.children[4].classList.remove("hidden-element");
        weatherCard.children[4].classList.remove("upDownAnim");
    }
    // card is displating:
    animateWeatherInfoExit()
    .then(result => {
        let errorMessage = document.createElement("p");
        errorMessage.className = "weather-data";
        errorMessage.textContent = message;

        weatherCard.innerHTML = "";
        weatherCard.appendChild(errorMessage);

        return;
    })
    .then(result => {
        return animateWeatherInfoEntrace();
    })
    .then(result => { 
        animationIsPlaying = false;
        cardIsDisplaying = true;
        return;
    })
    .then(result => {
        if (weatherCard.children.length > 1) weatherCard.children[4].classList.add("upDownAnim");
    });

    return;
}

function getWeatherEmoji(weatherId) {
    let emoji;

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            emoji = "⛈️";
            break;

        case (weatherId >= 300 && weatherId < 400):
            emoji = "🌦️";
            break;

        case (weatherId >= 500 && weatherId < 600):
            emoji = "🌧️";
            break;

        case (weatherId >= 600 && weatherId < 700):
            emoji = "❄️";
            break;

        case (weatherId >= 700 && weatherId < 800):
            emoji = "🌫️";
            break;

        case (weatherId === 800):
            emoji = "☀️";
            break;

        case (weatherId >= 801 && weatherId < 900):
            emoji = "☁️";
            break;

        case (weatherId >= 900 && weatherId < 950):
            emoji = "🌪️";
            break;

        default:
            emoji = "🌍";
            break;
    }

    return emoji;
}