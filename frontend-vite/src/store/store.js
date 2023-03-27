import { 
    configureStore, 
    createSerializableStateInvariantMiddleware 
    } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import userReducer from './userReducer'

// const middleware = [createSerializableStateInvariantMiddleware()];

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
  },
//   middleware,
})
