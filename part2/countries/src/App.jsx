
import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = country
    ? countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))
    : null

  return (
    <div>
      <h1>Countries:</h1>
      find countries: <input onChange={(e) => setCountry(e.target.value)} value={country} />
      <Countries countriesToShow={countriesToShow} setCountry={setCountry} />
    </div>
  )

}

export default App
