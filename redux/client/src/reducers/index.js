import { combineReducers } from 'redux'

export default combineReducers({
  inc: (state = 0) => state + 1,
  dec: (state = 0) => state - 1,
})