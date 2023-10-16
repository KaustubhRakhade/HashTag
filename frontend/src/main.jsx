import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FeedContextProvider } from './context/FeedContext.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <FeedContextProvider>
        <App />
      </FeedContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)
