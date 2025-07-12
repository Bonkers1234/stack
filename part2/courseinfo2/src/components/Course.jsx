
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {

  const total = course.parts.reduce((sum, item) => {
    return sum + item.exercises
  }, 0)  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course