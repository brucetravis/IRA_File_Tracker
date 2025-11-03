import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import FileProvider from './components/contexts/FileProvider';
import UserProvider from './components/contexts/UserProvider';
import AuthProvider from './components/contexts/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FileProvider>
          <UserProvider>
              <App />
          </UserProvider>
        </FileProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


