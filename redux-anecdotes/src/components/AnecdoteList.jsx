import { useSelector, useDispatch } from "react-redux"
import { voteOne } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, vote }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filteredDotes = useSelector((state) =>
        state.anecdotes.filter((dote) => dote.content.includes(state.filter))
    )

    const anecdotes = filteredDotes.sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
        dispatch(voteOne(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }

    return (
        <div>
            {anecdotes.map((anecdote) => (
                <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id} />
            ))}
        </div>
    )
}

export default AnecdoteList
