import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from "../services/anecdotes"


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },

    createAnecdote(state, action) {
      const anecdote = action.payload
      
      state.push(anecdote)
    },

    voteAnecdote(state, action) {
      const id = action.payload.id
      return state.map(an => an.id === id ? action.payload : an)
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createOne(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteOne = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.voteOne(anecdote.id, anecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer