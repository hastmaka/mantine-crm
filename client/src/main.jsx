import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import ThemeController from "./theme/ThemeController.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeController>
          <App />
      </ThemeController>
  </React.StrictMode>,
)
