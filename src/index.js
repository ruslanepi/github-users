import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { GithubProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-rrm17zk9.us.auth0.com
// wMvrFVBQgdYdo5335pLl5ZitibIcOf0h

ReactDOM.render(
  <Auth0Provider
    domain='dev-rrm17zk9.us.auth0.com'
    clientId='wMvrFVBQgdYdo5335pLl5ZitibIcOf0h'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <React.StrictMode>
      <GithubProvider>
        <App />
      </GithubProvider>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
