
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

  fiveDayFetch(local)
  previousSearchs()

})



function fiveDayFetch(local) {
  const key = '3d81a03d1a16ff751a44888d76e80814';
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${local}&units=imperial&cnt=6&appid=${key}`)
  .then(ans => ans.json()).then(json => {
    if(json.cod === '404') {
      alert('Error!  Response not found!')
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

    localDate.innerHTML = `${new Date(json.list[0].dt * 1000)}`
    blurb.src = `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png`
    currTemp.innerHTML = `<span>Currently ${json.list[0].main.temp}°F</span>`
    hot.innerHTML = `<span>High ${json.list[0].main.temp_max}°F</span>`
    cold.innerHTML = `<span>Low ${json.list[0].main.temp_min}°F</span>`
    humid.innerHTML = `${json.list[0].main.humidity}% Humidity`
    wind.innerHTML = `${json.list[0].wind.speed} mph`


    for (i=1; i < 6; i++) {
      const date = document.querySelector(`.weather${i} .localDate`)
      const blurb = document.querySelector(`.weather${i} img`)
      const hot = document.querySelector(`.weather${i} .maxTemp`)
      const cold = document.querySelector(`.weather${i} .minTemp`)
      const humid = document.querySelector(`.weather${i} .humidity`)
      const wind = document.querySelector(`.weather${i} .wind`)

      date.innerHTML = `${new Date(json.list[i].dt * 1000)}`
      blurb.src = `https://openweathermap.org/img/wn/${json.list[i].weather[0].icon}@2x.png`
      currTemp.innerHTML = `${parseInt(json.list[i].main.temp)}<span>°F</span>`
      hot.innerHTML = `<span>High ${parseInt(json.list[i].main.temp_max)}°F</span>`
      cold.innerHTML = `<span>Low ${parseInt(json.list[i].main.temp_min)}°F</span>`
      humid.innerHTML = `${parseInt(json.list[i].main.humidity)}% Humidity`
      wind.innerHTML = `${parseInt(json.list[i].wind.speed)} mph`
    }
  })
}



function previousSearchs() {
  sHistory.innerHTML = ''
  for (let i=0; i < searchHistory.length; i++) {
    let button = document.createElement("button")
    button.textContent = searchHistory[i]
    button.classList.add('searchedHistory')
    sHistory.append(button)
  }

  const sHistBtn = document.querySelector(".searchBar .searched .searchedHistory")
  sHistBtn.addEventListener('click', (event) => {
    event.preventDefault()
    let local = event.target.textContent
    fiveDayFetch(local)
  })
}


//app.init();
