import { useState } from "react"

const Hello = ({ name, age }) => {  

  const bornYear = () => new Date().getFullYear() - age

  return (    
    <div>      
      <p>Hello {name}, you are {age} years old</p>    
      <p>So you were probably born in {bornYear()}</p>
    </div>  
  )
}

export const Display = ({ counter }) => <div>{counter}</div>

export const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  console.log('Hello from component')
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)

  const age = 10
  const name = 'Peter'
  return (
    <div>
      <p>Hello world</p>
      <Hello name='George' age={26 + 10}/>
      <Hello name={name} age={age}/>
      <Display counter={counter} />
      <Button text='plus' onClick={increaseByOne} />
      <Button text='zero' onClick={setToZero} />
      <Button text='minus' onClick={decreaseByOne} />
    </div>
  )
}

export default App