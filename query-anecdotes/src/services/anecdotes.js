import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
    id: getId(),
  }

  const res = await axios.post(baseUrl, newAnecdote)
  return res.data
}

const voteAnecdote = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}

export { getAll, createAnecdote, voteAnecdote }
