import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

// Set API config from injected globals (set by Vite)
window.__VITE_API_BASE_URL__ = typeof __VITE_API_BASE_URL__ !== 'undefined' ? __VITE_API_BASE_URL__ : 'http://20.207.122.201/evaluation-service'
window.__VITE_API_TOKEN__ = typeof __VITE_API_TOKEN__ !== 'undefined' ? __VITE_API_TOKEN__ : null

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
