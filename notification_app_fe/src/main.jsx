import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

// Set API config from Vite env variables
try {
  window.__VITE_API_BASE_URL__ = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/evaluation-service'
  window.__VITE_API_TOKEN__ = import.meta.env.VITE_API_TOKEN || null
} catch (e) {
  // Fallback for environments where import.meta is not available
  window.__VITE_API_BASE_URL__ = 'http://localhost:4000/evaluation-service'
  window.__VITE_API_TOKEN__ = null
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
