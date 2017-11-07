import { combineReducers } from 'redux'

// Default
// export default {
//   example: (state = {}, { type, payload }) => {
//     switch (type) {
//       case 'EXAMPLE_ACTION':
//         return {
//           ...state
//         }
//       default:
//         return state
//     }
//   }
// }

import { PUSH_HISTORY, POP_HISTORY, GET_HISTORY } from './actions'

const history = (state = 0, action) => {
  switch (action.type) {
    case PUSH_HISTORY:
      return [...state.history, action.payload]
    case POP_HISTORY:
      return state.history.pop()
    case GET_HISTORY:
      return state.history
    default:
      return state
  }
}

const rootReducer = combineReducers({
  history
})

export default rootReducer