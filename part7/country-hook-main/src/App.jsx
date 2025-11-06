import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if(name !== '') {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then(country => {
        setCountry(country)
      })
      .catch(err => {
        setCountry(err)
      })
    }
  },[name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country.name) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div className='mx-auto my-5'>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.svg} height='100' alt={`flag of ${country.data.flags.alt}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div className='my-5'>
      <Container>
        <Row lg={2}>
          <Form className='mx-auto' onSubmit={fetch}>
            <Form.Group>
              <InputGroup>
                <Form.Control {...nameInput} />
                <Button>find</Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Row>
        <Row lg={6} sm={4} xs={3}>
          <Country country={country} />
        </Row>
      </Container>
    </div>
  )
}

export default App