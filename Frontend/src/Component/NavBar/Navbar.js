import logo from "../../Images/logo.png";
import header_css from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";

//import { useState } from 'react';
//import { useNavigate } from "react-router-dom";
//import { Button } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  //const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("facilityUser"));
  const isAuthenticated = user && user.isAutheticate;

  const showAuthLinks =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/pwdReset") ||
    location.pathname.startsWith("/verifyEmail") ||
    location.pathname === "/";

  const showUserProfile = isAuthenticated && !showAuthLinks;

  return (
    <div className={header_css.navbar}>
      <div>
        <img src={logo} alt="logopic" style={{ width: "140px" }}></img>
      </div>
      {/* <text> University of Ruhuna <br></br>
                Physical Education Unit<br></br>
                PlayGround and Gym Facility Scheduler
            </text> */}
            
                {/* <Link to='/landpage' style={{ textDecoration: 'none' }}><h2 style={{ color: 'yellow' }}> UNIVERSITY OF RUHUNA</h2>
                    <h4 style={{ color: 'white' }}>Physical Education Unit<br></br>
                        SPORTS FACILITY SCHEDULER</h4>
                </Link> */}
                

      <Link to="/landpage" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "yellow" }}> UNIVERSITY OF RUHUNA</h2>
        <h4 style={{ color: "white" }}>
          Physical Education Unit<br></br>
          SPORTS FACILITY SCHEDULER
        </h4>
      </Link>

      {showUserProfile && (
        <div className={header_css.userProfileContainer}>
          <UserProfile />
        </div>
      )}

      { showAuthLinks && (
        <div className={header_css.links}>
          <Link to="/login" className="btn btn-light">
            Login
          </Link>
          &nbsp;
          <Link to="/signup" className="btn btn-warning">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
