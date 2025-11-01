import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import FileProvider from './components/contexts/FileProvider';
// import FileProvider from './components/contexts/FileProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <FileProvider> */}
      <FileProvider>
        <App />
      </FileProvider>
      {/* </FileProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);


