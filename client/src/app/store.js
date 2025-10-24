import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice.js'
import houseReducer from '../feature/house/houseSlice.js'
import taskReducer from '../feature/task/taskSlice.js'
 const store = configureStore({
    reducer:{
        auth : authReducer,
        house : houseReducer,
        tasks: taskReducer,
    }
})

export default store;