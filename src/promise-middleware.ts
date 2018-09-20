import { Middleware } from 'redux'

function isPromise(obj: any) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

const promiseMiddlware: Middleware = ({ dispatch }) => {
  return next => action => {
    if (isPromise(action.payload)) {
      dispatch({ type: action.type, meta: { loading: true } })
      return action.payload
        .then((result: any) => dispatch({ ...action, payload: result, meta: { loading: false } }))
        .catch((error: Error) => {
          dispatch({ ...action, payload: error, error: true, meta: { loading: false } })
          return Promise.reject(error)
        })
    }
    return next(action)
  }
}

export default promiseMiddlware