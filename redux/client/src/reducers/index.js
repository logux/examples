import { combineReducers } from 'redux'

export default combineReducers({
  counter: (state = 0, action) => {
    if (action.type === 'INC') {
        return state + 1;
    } 

    if (action.type === 'DEC') {
        return state - 1;
    }

    if (action.type === 'SET_COUNTER') {
      return action.payload.counter;
    }

    return state;
  },
})