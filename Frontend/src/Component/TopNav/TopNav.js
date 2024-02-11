import TopNav_css from './TopNav.module.css';
import { Link } from 'react-router-dom';


const TopNav = () => {
    const user = JSON.parse(localStorage.getItem('facilityUser'));
    const userType = user.userDetails.userType;

    return (
        <div>
            <div className={TopNav_css.topNav}>
                <nav>
                    <ul className={TopNav_css.navLinks}>
                        <li><Link to="/viewFacilities" style={{ textDecoration: "none", color: "white" }}>Facility</Link></li>
                        <li><Link  style={{ textDecoration: "none", color: "white" }}>Service</Link>
                            <ul className={TopNav_css.sublinks}>
                                <li>
                                    <Link to="/booking" style={{ textDecoration: "none", color: "white" }}>Booking</Link>
                                </li>
                                <li>
                                    <Link to="/membership" style={{ textDecoration: "none", color: "white" }}>Membership</Link>
                                </li>
                            </ul>
                        </li>
                        <li><Link to="/profile" style={{ textDecoration: "none", color: "white" }}>Profile</Link></li>
                        <li><Link to="/history" style={{ textDecoration: "none", color: "white" }}>History</Link></li>
                        {
                            (userType === 'DVC' || userType === 'director') ?
                                (<li><Link to="/requests" style={{ textDecoration: "none", color: "white" }}>Requests</Link></li>) :
                                null
                        }
                        <li><Link to="/yearplan" style={{ textDecoration: "none", color: "white" }}>Year Plan</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default TopNav;

