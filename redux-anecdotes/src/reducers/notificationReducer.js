import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        addNotification(state, action) {
            return action.payload
        },

        removeNotification() {
            return ""
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (text, seconds) => {
    return dispatch => {
        dispatch(addNotification(text))
        setTimeout(() => dispatch(removeNotification()), seconds) 
    }
}

export default notificationSlice.reducer