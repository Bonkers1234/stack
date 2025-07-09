
import { useState } from 'react'

export const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

export const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {total ? (good - bad) / total : '0'}</p>
      <p>Positive {total ? (good / total * 100) : '0'} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='Good' onClick={handleGood} />
      <Button text='Neutral' onClick={handleNeutral} />
      <Button text='Bad' onClick={handleBad} />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total}

      />
    </div>
  )
}

export default App