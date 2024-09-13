import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Real from './Real.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <Real/>
  </>,
)
