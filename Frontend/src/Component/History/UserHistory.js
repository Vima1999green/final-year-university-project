import userHistory_css from './userHistory.module.css';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
const UserHistory = () => {
    return (
        <div>
            <div className={userHistory_css.topNav}>
                <nav>
                    <ul className={userHistory_css.navLinks}>
                        <li><Link to="/viewFacilities" style={{ textDecoration: "none", color: "white" }}>Facility</Link></li>
                        <li><Link to="/service" style={{ textDecoration: "none", color: "white" }}>Service</Link>
                            <ul className={userHistory_css.sublinks}>
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
                        <li><Link to="/logout" style={{ textDecoration: "none", color: "white" }}>Logout</Link></li>
                    </ul>
                </nav>
            </div>
            <div className={userHistory_css.content}>
                <div className={userHistory_css.contentImage}>

                    <div className={userHistory_css.body}>

                        <Grid item xs={12}>
                            <Grid>
                                <h4>My booking List</h4>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {/* Add your table headers here */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* Add your table rows here */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>




                    </div>

                </div>
            </div>


        </div>

    );
}

export default UserHistory;