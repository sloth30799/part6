import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createOne = async (content) => {
    const anecdote = {
        content,
        votes: 0,
        id: getId()
    }

    const res = await axios.post(baseUrl, anecdote)
    return res.data
}

const voteOne = async (id, anecdote) => {
    const newAnec = {
        ...anecdote,
        votes: anecdote.votes + 1
    }

    const res = await axios.put(`${baseUrl}/${id}`, newAnec)
    return res.data
}

export default { getAll, createOne, voteOne }