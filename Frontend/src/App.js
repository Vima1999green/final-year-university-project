import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Footer from './Component/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import FogotPWD from './Component/FogotPWD';
import Form from './Component/Form';
import './App.css';


import ReactDOM from 'react-dom/client';
import EmailVerification from './Component/EmailVerification';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />

        <div className='content'>
          <Routes>

            <Route exact path="/" element={<Home />} />




            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Form />} />

            <Route path="/pwdReset" element={<FogotPWD />} />

            <Route path='/verifyEmail' element={<EmailVerification />} />




            {/* Add more routes as needed */}

          </Routes>
        </div>

        <Footer /> {/* Assuming Footer is a common component */}

      </div>
    </Router>
  );
}

export default App;
