
import { useDispatch } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdoteSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    const newAnecdote = await anecdotesService.create({ content, votes: 0 })
    dispatch(anecdoteCreate(newAnecdote))
    dispatch(setNotification(`New anecdote '${content}' has been created!`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={anecdoteSubmit}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm