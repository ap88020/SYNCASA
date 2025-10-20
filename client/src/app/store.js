import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice.js'
import houseReducer from '../feature/house/houseSlice.js'

 const store = configureStore({
    reducer:{
        auth : authReducer,
        house : houseReducer
    }
})

export default store;