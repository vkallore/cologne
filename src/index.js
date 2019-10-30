import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxToastr from 'react-redux-toastr'
import thunk from 'redux-thunk'

import rootReducer from 'reducers'
import App from 'App'
import * as serviceWorker from 'serviceWorker'

import 'react-redux-toastr/src/styles/index.scss'
import 'bulma/css/bulma.css'
import 'assets/css/custom.scss'
import { checkAndSetLogin } from 'actions'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="bottom-right"
      getState={state => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById('root')
)

store.dispatch(dispatch => {
  checkAndSetLogin(dispatch, true, true)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
