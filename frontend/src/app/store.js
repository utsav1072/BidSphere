import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/authentication/authSlice"
import winnerReducer from "../features/authentication/winnerSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    winner: winnerReducer,
  },
})