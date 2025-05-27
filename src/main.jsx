import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter> {/* ✅ This is the correct place to put Router */}
      <App />
    </BrowserRouter>
 
  </StrictMode>,
)
