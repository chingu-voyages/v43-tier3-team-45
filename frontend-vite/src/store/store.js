import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: () => import('./authReducer'),
    user: () => import('./userReducer'),
    issue: () => import('./issueReducer'),
    project: () => import('./projectReducer'),
    team: () => import('./teamReducer'),
  },
})

export default store

