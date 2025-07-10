
import { useState } from 'react'

export const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

export const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
       {value}
      </td>
    </tr>
  )
}

export const Statistics = ({ good, neutral, bad, total }) => {
  if(!total) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={total} />
          <StatisticLine text='Average' value={total ? (good - bad) / total : '0'} />
          <StatisticLine text='Positive' value={total ? (good - bad) / total + ' %' : '0 %'} />
        </tbody>
      </table>
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