import { useEffect, useState } from "react"
import axios from 'axios'

const API = import.meta.env.VITE_WEATHER_APP

const Weather = ({ country }) => {
  const [data, setData] = useState(null)
  const [lat, lng] = country.capitalInfo.latlng

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API}&units=metric`)
      .then(response => {
        setData(response.data)
      })
  }, [lat,lng])

  if(!data) return null

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature {data.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`} />
      <p>Wind {data.wind.speed} m/s</p>
    </div>
  )

}

export default Weather