import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Button, InputGroup } from 'react-bootstrap'

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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data)
    })
  },[])

  const create = (resource) => {
    axios.post(baseUrl, resource).then(response => {
      setResources(resources.concat(response.data))
    })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3003/notes')
  const [persons, personService] = useResource('http://localhost:3003/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div className='container'>
      <h2>notes</h2>
      <Form onSubmit={handleNoteSubmit}>
        <Form.Group className='w-25'>
          <Form.Label>Note:</Form.Label>
          <InputGroup className='my-1'>
            <Form.Control {...content} />
            <Button  variant='primary' type='submit'>create</Button>
          </InputGroup>
        </Form.Group>
      </Form>
      <Table striped className='w-50'>
        <tbody>
         {notes.map(n => 
            <tr key={n.id}>
              <td>
                {n.content}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <h2>persons</h2>
      <Form onSubmit={handlePersonSubmit}>
        <Form.Group className='w-25'>
          <Form.Label>name:</Form.Label>
          <Form.Control {...name} />
          <Form.Label>number:</Form.Label>
          <Form.Control {...number} />
          <Button className='my-2' variant='primary' type='submit'>create</Button>
        </Form.Group>        
      </Form>
      <Table striped className='w-50'>
        <tbody>
          {persons.map(n => 
            <tr key={n.id}>
              <td>{n.name}</td>
              <td>{n.number}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default App