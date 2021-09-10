
import { Suspense, lazy } from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import store from './react-src/Redux/store'

import Spinner from './react-src/Components/Spinner/Spinner'

import 'bootstrap/scss/bootstrap.scss'

const LazyApp = lazy(() => import('./react-src/App'))

render(
    <Provider store={store}>
        <Suspense fallback={<Spinner />}>
            <LazyApp />
        </Suspense>
    </Provider>
    ,
    document.getElementById('root')
)
