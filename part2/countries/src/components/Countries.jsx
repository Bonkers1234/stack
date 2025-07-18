
import Country from "./Country"

const Countries = ({ countriesToShow, setCountry }) => {
  if(!countriesToShow) {
    return null
  }

  if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if(countriesToShow.length !== 1) {
    return countriesToShow.map(c => {
      return (
        <p key={c.name.common}>
          {c.name.common} 
          <button onClick={() => setCountry(c.name.common)}>SHOW</button>
        </p>
      )
    })
  } else {
    return (
      <Country country={countriesToShow[0]} />
    )
  }
}

export default Countries