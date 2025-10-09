
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdoteSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(createAnecdote({ content, votes: 0 }))
    dispatch(setNotification(`New anecdote '${content}' has been created!`, 5))
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