import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css'; // Import global styles

/**
 * The main entry point for the React application.
 * This file initializes the React root, sets up the router,
 * and renders the main App component into the DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode is a wrapper that helps identify potential problems in an application.
  // It activates additional checks and warnings for its descendants in development mode.
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);