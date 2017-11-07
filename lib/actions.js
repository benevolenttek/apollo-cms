export const PUSH_HISTORY = 'PUSH_HISTORY'
export const POP_HISTORY = 'POP_HISTORY'
export const GET_HISTORY = 'GET_HISTORY'

export const push_history = (value) => ({
  type: PUSH_HISTORY,
  payload: value
})

export const pop_history = () => ({
  type: POP_HISTORY
})

export const get_history = () => ({
  type: GET_HISTORY
})


