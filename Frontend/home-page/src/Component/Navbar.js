import logo from '../Images/logo.png';
import header_css from "./header.module.css";

const Navbar = () => {
  
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
           <button id={header_css.log}> Login</button>
           <button id={header_css.signup}>Sign Up</button>
        </div>
       </div>
     );
}
 
export default Navbar;