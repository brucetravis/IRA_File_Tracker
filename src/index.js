import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import FileProvider from './components/contexts/FileProvider';
import UserProvider from './components/contexts/UserProvider';
import AuthProvider from './components/contexts/AuthProvider';
import RequestProvider from './components/contexts/requestProvider';
import AuditProvider from './components/contexts/AuditProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuditProvider>
        <RequestProvider>
          <UserProvider>
            <AuthProvider>
              <FileProvider>
                <App />
              </FileProvider>
            </AuthProvider>
          </UserProvider>
        </RequestProvider>
      </AuditProvider>
    </BrowserRouter>
  </React.StrictMode>
);


