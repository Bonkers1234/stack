
import { useSelector, useDispatch } from "react-redux"
import { anecdoteVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === '' 
      ? anecdotes
      : anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(anecdoteVote(id))
  }

  return (
    <div>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList