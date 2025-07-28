
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
let morgan = require('morgan')
const Person = require('./models/person')

morgan.token('data', (request) => {
  if(request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  const date = Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  // const id = request.params.id
  // const person = persons.find(p => p.id === id)

  // if(!person) {
  //   response.status(404).end()
  // } else {
  //   response.json(person)
  // }
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  // const isNameTaken = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())

  // if(!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'Name or Number is missing'
  //   })
  // } else if(isNameTaken) {
  //   return response.status(400).json({
  //     error: 'Name already in phonebook, name must be unique'
  //   })
  // }

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or Number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`)
})

