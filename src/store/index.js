import { createStore , applyMiddleware } from 'redux'

import { createLogger } from 'redux-logger'

import promise from 'redux-promise'

import thunk from 'redux-thunk'

import reducer from './reducers/index'

import asyncAction from './asyncAction'

let middlewares = [
    thunk,
    promise,
    asyncAction
]

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger())
}

export default function() {
    return createStore(
        reducer,
        applyMiddleware(...middlewares)
    )
}
