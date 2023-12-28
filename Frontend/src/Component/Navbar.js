import logo from '../Images/logo.png';

const Navbar = () => {
  
    return ( 
       < nav className="navbar">
        <div>
            <img src={logo}></img>
        </div>
        <text> University of Ruhuna <br></br>
        Physical Education Unit<br></br>
        PlayGround and Gym Facility Scheduler
        </text>
        <div className="links">
           <button id="log"> Login</button>
           <button id="signup">Sign Up</button>
        </div>
       </nav>
     );
}
 
export default Navbar;