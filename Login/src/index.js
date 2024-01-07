import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   
import Login from './Components/Login.js'
import FogotPWD from './Components/FogotPWD.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Login/> */}
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pwdReset" element={<FogotPWD />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
);


