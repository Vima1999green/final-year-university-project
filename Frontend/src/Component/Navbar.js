import logo from '../Images/logo.png';
import header_css from "./header.module.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
//import { useNavigate } from "react-router-dom";
//import { Button } from "@mui/material";

const Navbar = () => {

    //const navigate = useNavigate();
    return (
        < div className={header_css.navbar}>
            <div>
                <img src={logo} alt='logopic'></img>
            </div>
            <text> University of Ruhuna <br></br>
                Physical Education Unit<br></br>
                PlayGround and Gym Facility Scheduler
            </text>
            <div className={header_css.links}>
                <Link to="/login" className={header_css.log}>Login</Link>
                <Link to="/Signup" className={header_css.signup}>Sign Up</Link>

            </div>
        </div>
    );
}

export default Navbar;