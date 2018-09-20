import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { promiseMiddleware } from '../../src/handle-async-action'
import reducers from './reducers'

const reducer = combineReducers(reducers)

const middlewares = [promiseMiddleware]

const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(reducer, enhancer)

export default store