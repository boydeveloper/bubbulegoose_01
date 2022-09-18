import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/home.css';
import './css/signIn.css';
import './css/footer.css';
import './css/signUp.css';
import './css/add.css';
import './css/profile.css';
import './css/queries.css';
import App from './App';
import { DarkmodeContext } from './context/ContextDarkmode';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DarkmodeContext>
      <App />
    </DarkmodeContext>
  </React.StrictMode>
);
reportWebVitals();
