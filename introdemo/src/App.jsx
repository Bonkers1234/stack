
const Hello = (props) => {  
  console.log(props)
  return (    
    <div>      
      <p>Hello {props.name}, you are {props.age} years old</p>    
    </div>  
  )
}

const App = () => {
  console.log('Hello from component')

  const age = 10
  const name = 'Peter'
  return (
    <div>
      <p>Hello world</p>
      <Hello name='George' age={26 + 10}/>
      <Hello name={name} age={age}/>
    </div>
  )
}

export default App