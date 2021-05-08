import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { AuthProvider } from './Auth.js'
import { AppProvider } from './context'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>

      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

