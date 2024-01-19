
import { Link } from 'react-router-dom';
import landPage_css from './land.module.css';

const LandPage = () => {
    return (
        <div className={landPage_css.content}>
            <div className={landPage_css.topNav}>
                <nav>
                    <ul className={landPage_css.navLinks}>
                        <li><Link to="#facility" style={{ textDecoration: "none", color: "white" }}>Facility</Link></li>
                        <li><Link to="#service" style={{ textDecoration: "none", color: "white" }}>Service</Link></li>
                        <li><Link to="#profile" style={{ textDecoration: "none", color: "white" }}>Profile</Link></li>
                        <li><Link to="#history" style={{ textDecoration: "none", color: "white" }}>History</Link></li>
                        <li><Link to="#logout" style={{ textDecoration: "none", color: "white" }}>Logout</Link></li>
                    </ul>
                </nav>
            </div>

            <div className={landPage_css.body}>
                {/* Your page content goes here */}
            </div>
        </div>
    );
}

export default LandPage;
