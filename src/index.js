// src/index.js
if (
  window.location.pathname !== "/" &&
  !window.location.pathname.includes(".") &&
  !window.location.pathname.includes("/?") &&
  !window.location.pathname.includes("#")
) {
  sessionStorage.redirect = window.location.href;
  window.location.replace("/");
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="292464458505-t7chllr9afqao35bdvcbtcdnekqcd7h8.apps.googleusercontent.com"> {/* replace with real client ID */}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
