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

export const History = ({ allClicks, total }) => {
  if(allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      <p>button press history: {allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )
}

const App = () => {
  console.log('Hello from component')
  const [counter, setCounter] = useState(0)

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(left + 1)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(right + 1)
    setTotal(left + updatedRight)
  }

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
      <br></br>
      <hr></hr>
      {left}
      <Button text='left' onClick={handleLeftClick} />
      <Button text='right' onClick={handleRightClick} />
      {right}
      <History allClicks={allClicks} total={total} />
    </div>
  )
}

export default App