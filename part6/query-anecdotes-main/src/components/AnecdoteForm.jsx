
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { create } from '../services/anecdotes'
import { useNotify } from "../contexts/NotificationContext"

const AnecdoteForm = () => {
  const notifyWith = useNotify()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notifyWith(`Anecdote '${newAnecdote.content}' has been added!`)
    },
    onError: (err) => {
      notifyWith(err.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content,
      votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
