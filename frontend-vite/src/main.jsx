import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux';
import { store }from './store/store'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const redirectUri = window.location.origin

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={"dev-qaiod8jqqrcfugv2.us.auth0.com"}
      clientId={"2ZA7vHttMavOhbvbvZ49tFTzpLdhVdg5"}
      redirectUri={"http://127.0.0.1:5173/"}
      >
      <Provider store={store} >
        <App />
      </Provider>
    </Auth0Provider>
    <App />
  </React.StrictMode>,
)
