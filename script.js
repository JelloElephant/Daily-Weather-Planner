
const search = document.querySelector(".searchBar button")
const sHistory = document.querySelector(".searchBar .searched")
const searchHistory = []



search.addEventListener('click', () => {
  const local = document.querySelector('.searchBar input').value

  if (!local) {
    alert('Local not found')
    return
  }

  searchHistory.push(local)
  localStorage.setItem('searched', JSON.stringify(searchHistory))

  todayWeather(local)
  previousSearchs()

})

// single day fetch

function todayWeather(local) {
  const key = '3d81a03d1a16ff751a44888d76e80814';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&units=imperial&appid=${key}`)
  .then(ans => ans.json()).then(json => {
    if (json.cod != '200') {
      alert('Somethings not quite right')
      return
    }
    console.log(json)
    
    const localDate = document.querySelector('.weatherMain .localDate')
    const blurb = document.querySelector('.weatherMain img')
    const currTemp = document.querySelector('.weatherMain .currTemp')
    const hot = document.querySelector('.weatherMain .maxTemp')
    const cold = document.querySelector('.weatherMain .minTemp')
    const humid = document.querySelector('.weatherMain .humidity')
    const wind = document.querySelector('.weatherMain .wind')

    localDate.innerHTML = `${new Date(json.dt * 1000)}`
    blurb.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
    currTemp.innerHTML = `<span>Currently ${json.main.temp}°F</span>`
    hot.innerHTML = `<span>High ${json.main.temp_max}°F</span>`
    cold.innerHTML = `<span>Low ${json.main.temp_min}°F</span>`
    humid.innerHTML = `${json.main.humidity}% Humidity`
    wind.innerHTML = `${json.wind.speed} mph`

    let lon = json.coord.lon
    let lat = json.coord.lat

    forcast(lon, lat)

    
  })
}

// forcast fetch
function forcast(lon, lat) {
  const key = '3d81a03d1a16ff751a44888d76e80814';
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`)
  .then(ans => ans.json()).then(data => {
    if(data.cod === '404') {
      alert('Error!  Response not found!')
      return
    }
    console.log(data)

    const fiveDays = data.list
    const fiveWeather = []

    fiveDays.forEach(value => {
      const testObj = {
        date: value.dt_txt.split(' ')[0],
        time: value.dt_txt.split(' ')[1],
        temp: parseInt(value.main.temp),
        tempMax: parseInt(value.main.temp_max),
        tempMin: parseInt(value.main.temp_min),
        icon: value.weather[0].icon,
        humidity: value.main.humidity,
        speed: value.wind.speed
      }

      if (value.dt_txt.split(' ')[1] === '12:00:00') {
        fiveWeather.push(testObj)
      }
    })

    for (let i = 0; i < fiveWeather.length; i ++) {
      const date = document.querySelector(`.weather${i} .localDate`)
      const blurb = document.querySelector(`.weather${i} img`)
      const hot = document.querySelector(`.weather${i} .maxTemp`)
      const cold = document.querySelector(`.weather${i} .minTemp`)
      const humid = document.querySelector(`.weather${i} .humidity`)
      const wind = document.querySelector(`.weather${i} .wind`)
      
      date.innerHTML = `${fiveWeather[i].date}`
      blurb.src = `https://openweathermap.org/img/wn/${fiveWeather[i].icon}@2x.png`
      hot.innerHTML = `<span>High ${fiveWeather[i].tempMax}°F</span>`
      cold.innerHTML = `<span>Low ${fiveWeather[i].tempMin}°F</span>`
      humid.innerHTML = `${fiveWeather[i].humidity}% Humidity`
      wind.innerHTML = `${fiveWeather[i].speed} mph`
    }

    console.log(fiveWeather)
  })
}



function previousSearchs() {
  sHistory.innerHTML = ''
  for (let i=0; i < searchHistory.length; i++) {
    let button = document.createElement("button")
    button.textContent = searchHistory[i]
    button.classList.add('searchedHistory')
    if (i > 4) {
      searchHistory.shift()
      console.log(searchHistory)
    }
    sHistory.prepend(button)
  }

  const sHistBtn = document.querySelector(".searchBar .searched .searchedHistory")
  sHistBtn.addEventListener('click', (event) => {
    let local = event.target.textContent
    todayWeather(local)
    previousSearchs()
  })
}


//app.init();
