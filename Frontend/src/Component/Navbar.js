import logo from '../Images/logo.png';
import header_css from "./header.module.css";
import { Link } from 'react-router-dom';
//import { useState } from 'react';
//import { useNavigate } from "react-router-dom";
//import { Button } from "@mui/material";

const Navbar = () => {

    //const navigate = useNavigate();
    return (
        < div className={header_css.navbar}>
            <div>
                <img src={logo} alt='logopic'style={{width:'140px'}}></img>
            </div>
            {/* <text> University of Ruhuna <br></br>
                Physical Education Unit<br></br>
                PlayGround and Gym Facility Scheduler
            </text> */}
            <text><h2 style={{color:'yellow'}}> UNIVERSITY OF RUHUNA</h2> 
                <h4>Physical Education Unit<br></br>
                PLAYGROUND & GYM FACILITY SCHEDULER</h4>
            </text>

            <div className={header_css.links}>
                <Link to="/login" className="btn btn-light">Login</Link>&nbsp;
                <Link to="/Signup" className="btn btn-warning">Sign Up</Link>

            </div>
        </div>
    );
}

export default Navbar;