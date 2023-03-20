import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
  </React.StrictMode>, 
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={windown.location.origin}
    > 
    
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
