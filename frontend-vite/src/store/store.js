import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: () => import('./authReducer'),
    user: () => import('./userReducer'),
  },
})

export default store

