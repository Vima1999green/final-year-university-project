import getUserData from '../../Support/getUserData';
import TopNav_css from './TopNav.module.css';
import { useEffect, useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import isEmpty from "../../Support/isEmpty";


const TopNav = () => {
    const navigate=useNavigate()
    const [userData,setUserData] = useState(null);
    const user = getUserData()
    useEffect(()=>{
        const fetchUserData= async ()=>{
            const data =   await getUserData();
            setUserData(data);
        };
        fetchUserData();
       },[]);
      
       if(isEmpty(userData)){
        navigate('/login');
        return null;
       }
    const userType = userData.userType;

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
                        {/* <li><Link to="/profile" style={{ textDecoration: "none", color: "white" }}>Profile</Link></li> */}
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

