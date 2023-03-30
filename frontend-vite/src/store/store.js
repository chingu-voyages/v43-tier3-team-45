import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import issueReducer from './issueReducer'
import projectReducer from './projectReducer'
import teamReducer from './teamReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    issue: issueReducer,
    project: projectReducer,
    team: teamReducer,
  },
})

export default store

