import { useDispatch } from "react-redux"
import { addNew } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""

        dispatch(addNew(content))
        dispatch(setNotification(`you added '${content}'`, 5000))
    }

    return (
        <form onSubmit={submitAnecdote}>
            <h2>create new</h2>
            <div>
                <input name="anecdote" />
            </div>
            <button>create</button>
        </form>
    )
}

export default AnecdoteForm
