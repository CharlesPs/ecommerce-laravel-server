
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Reducers from './Reducers'

const logger = (store: any) => (next: any) => (action: any) => {

    let result = next(action)


    if (typeof action === 'function') return result

    console.group('State modified')

    console.log('%cType: %c' + action.type, 'font-weight: bold;', 'color: red')

    if (action.content) console.log('%cContent', 'font-weight: bold;', action.content)

    console.log('%cNew state', 'font-weight: bold;', store.getState())

    console.groupEnd()

    return result
}

export default createStore(Reducers, applyMiddleware(logger, thunk))