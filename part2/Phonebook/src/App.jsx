
import './index.css'
import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if(newPerson) {
      if(window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number?`)) {
        personsService
          .update(newPerson.id, {...newPerson, number: newNumber})
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setMessage({
              text: `${newPerson.name} number successfully changed!`,
              type: 'info'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
          .catch(error => {
            console.log(error)
            if(error.status === 404) {
              setPersons(persons.filter(p => p.id !== newPerson.id))
              setMessage({
                text: `Information of ${newPerson.name} has already been removed from server!`,
                type: 'error'
              })
              setTimeout(() => {
                setMessage(null)
              }, 5000);
            } else if(error.status === 400) {
              setMessage({
                text: error.response.data.error,
                type: 'error'
              })
            }
          })
      }
      setNewName('')
      setNewNumber('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({
            text: `Added ${returnedPerson.name}!`,
            type: 'info'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch(error => {
          setMessage({
            text: error.response.data.error,
            type: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        
      setNewName('')
      setNewNumber('')
    }
  }

  const handleRemove = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
  
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleFilter} filter={filter} />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={handleRemove} />
    </div>
  )
}

export default App