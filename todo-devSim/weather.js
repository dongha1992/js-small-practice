const weatherSpan = document.querySelector(".weather")
const COORDS = "coords"
const API_KEY = "f20b980603cf5c8700dfff398b2c001b"

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        .then(function(response) {
            return response.json().then(function(json) {
                const temperature = json.main.temp
                const place = json.name
                weatherSpan.innerText = `${temperature} ${place}`
            })
        })
}





function saveCoords(coordObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordObj))
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordObj = {
        latitude,
        longitude
    }
    saveCoords(coordObj)
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("error")
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)
    if (loadedCoords === null) {
        askCoords()
    } else {
        const parseCoord = JSON.parse(loadedCoords)
        getWeather(parseCoord.latitude, parseCoord.longitude)
    }
}
loadCoords()