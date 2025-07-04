// ✅ All imports must come first
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ GitHub Pages routing fix (after imports)
if (
  window.location.pathname !== "/" &&
  !window.location.pathname.includes(".") &&
  !window.location.pathname.includes("/?") &&
  !window.location.pathname.includes("#")
) {
  sessionStorage.redirect = window.location.href;
  window.location.replace("/");
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="292464458505-t7chllr9afqao35bdvcbtcdnekqcd7h8.apps.googleusercontent.com"> {/* Replace this */}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
