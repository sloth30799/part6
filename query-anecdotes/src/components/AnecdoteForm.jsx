import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotesFromQuery = queryClient.getQueryData(['anecdotes'])

      queryClient.setQueryData(
        ['anecdotes'],
        anecdotesFromQuery.concat(newAnecdote)
      )

      dispatch({
        type: 'SET',
        payload: `Anecdote ${newAnecdote.content} is created!`,
      })

      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
    },
    onError: (err) => {
      dispatch({
        type: 'SET',
        payload: err.response.data.error,
      })

      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
