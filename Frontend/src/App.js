import Navbar from './Component/NavBar/Navbar';
import Home from './Component/Home/Home';
import Footer from './Component/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login/Login';
import FogotPWD from './Component/FogotPWD/FogotPWD';
import Form from './Component/SignUpForm/SignUpForm';
import App_Css from './App.module.css';
import EmailVerification from './Component/EmailVerification/EmailVerification';
import LandPage from './Component/LandPage/LandPage';
import ViewFacility from './Component/ViewFacility/ViewFacility';
import UserProfile from "./Component/NavBar/UserProfile";
import Facility from "./Component/Facility/Facility";
import UserHistory from "./Component/History/UserHistory";
import Profile from "./Component/UserProfile/Profile";
import Booking from "./Component/Booking/Booking";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className={App_Css.content}>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Form />} />

            <Route path="/pwdReset/:userEmail" element={<FogotPWD />} />

            <Route
              path="/verifyEmail/:userEmail"
              element={<EmailVerification />}
            />
            <Route path="/landpage" element={<LandPage />} />
            <Route path="/viewFacilities" element={<ViewFacility />} />
            <Route path="/facility/:facilityId" element={<Facility />} />
            <Route path="/history" element={<UserHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/userProfile' element={<UserProfile />} />
            <Route path='/bookingForm' element={<Booking />} />

            <Route path="/userProfile" element={<UserProfile />} />

            

            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer /> {/* Assuming Footer is a common component */}
      </div>
    </Router>
  );
}

export default App;
