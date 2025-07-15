
const Persons = ({ personsToShow, removePerson }) => {
  return (
    <ul>
      {personsToShow.map(person => {
        return (
          <li key={person.name}>
            {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
          </li>
        )
      })}
    </ul>
  )
}

export default Persons