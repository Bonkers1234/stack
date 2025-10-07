
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import anecdotesService from '../src/services/anecdotes'
import { anecdotesSet } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => {
      dispatch(anecdotesSet(anecdotes))
    })
  },[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App