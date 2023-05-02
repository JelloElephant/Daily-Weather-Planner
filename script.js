let lang = 0
let long = 0

const app = {

    init: () => {
        document.getElementById('local').addEventListener('click', app.Search);
    },

    // Get locations lat and lon from Geocoding API
    getLocation: () => {
        let city = document.getElementById('local').value
        let key = '3d81a03d1a16ff751a44888d76e80814';
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`;
        fetch(url)
        .then(Response =>{
            if(!Response.ok) throw new Error(Response.statusText);
            return Response.json();
        })
        .then(data => {
            lang = data.lat;
            long = data.lon;
        })
        .catch(console.err);
    },

    //Search: (ev) => {
//      getLocation()
//      getWeather()
//    }


    // Gets weather object from OpenWeather API
    getWeather: () => {
        let key = 'b275e1ea202493b69a7ea5954c475022'
        let lang = 'en'
        let units = 'imperial'
        let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lang}&lon=${long}&appid=${key}&units=${units}&lang=${lang}`
        fetch(url)
        .then(resp => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then(data => {
            app.buildWeather(data);
        })
        .catch(console.err)
    },

    // Fills cards with weather info from getWeather()
    buildWeather: (resp) => {
        for (var i = 0; i < 5; i++) {
            if (i === 0 ) {
                let toady = document.getElementById('weather0')

            }else {
                let day = document.getElementById(`weather${[i]}`)

            }
        }

    }
}

app.init();