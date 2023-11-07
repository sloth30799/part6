import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, voteAnecdote } from './services/anecdotes'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const { data: anecdotes, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotesFromQuery = queryClient.getQueryData(['anecdotes'])

      queryClient.setQueryData(
        ['anecdotes'],
        anecdotesFromQuery.map((an) =>
          an.id === newAnecdote.id ? newAnecdote : an
        )
      )

      dispatch({
        type: 'SET',
        payload: `Anecdote ${newAnecdote.content} voted!`,
      })

      setTimeout(() => {
        dispatch({ type: 'REMOVE' })
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (isError) {
    return <div>Anecdote Service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
