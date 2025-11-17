import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice.js'
import houseReducer from '../feature/house/houseSlice.js'
import taskReducer from '../feature/task/taskSlice.js'
import socketReducer from '../feature/socket/socketSlice.js'
import chatReducer from '../feature/chat/chatSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        house: houseReducer,
        tasks: taskReducer,
        socket: socketReducer,
        chat: chatReducer, // Add chat reducer
    }
})

export default store;