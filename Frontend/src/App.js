import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Footer from './Component/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import FogotPWD from './Component/FogotPWD';
import Form from './Component/Form';
import App_Css from './App.module.css';
import EmailVerification from './Component/EmailVerification';
import LandPage from './Component/LandPage/LandPage';
import ViewFacility from './Component/viewFacility/ViewFacility';

import UserProfile from './Component/UserProfile';


function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />

        <div className={App_Css.content}>
          <Routes>

            <Route exact path="/" element={<Home />} />




            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Form />} />



            <Route path="/pwdReset/:userEmail" element={<FogotPWD />} />

            <Route path='/verifyEmail/:userEmail' element={<EmailVerification />} />
            <Route path="/landpage" element={<LandPage />} />
            <Route path="/viewFacilities" element={<ViewFacility />} />

            <Route path='/userProfile' element={<UserProfile />} />






            {/* Add more routes as needed */}

          </Routes>
        </div>

        <Footer /> {/* Assuming Footer is a common component */}

      </div>
    </Router>
  );
}

export default App;
