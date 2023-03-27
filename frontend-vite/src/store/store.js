import { configureStore, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import authReducer from './authReducer'

// const middleware = [createSerializableStateInvariantMiddleware()];

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
  },
//   middleware,
})
