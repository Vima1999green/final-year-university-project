import userHistory_css from './userHistory.module.css';
import { Link } from 'react-router-dom';
import TopNav from '../TopNav/TopNav';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
const UserHistory = () => {
    return (
        <div>
            <TopNav />
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