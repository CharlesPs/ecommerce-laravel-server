
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import store from './react-src/Redux/store'

import App from './react-src/App'

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
)
