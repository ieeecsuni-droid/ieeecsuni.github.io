import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Outlet } from 'react-router-dom'
import App from './App'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/ieeecsuni.github.io">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)