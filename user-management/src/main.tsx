import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./provider/AuthProvider.tsx";
import ToastProvider from "./provider/ToastProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
          <ToastProvider>
              <App />
          </ToastProvider>
      </AuthProvider>
  </React.StrictMode>,
)
