import { useState } from 'react';
import { Link } from 'react-router-dom';
import landPage_css from './land.module.css';
import { ImageList, ImageListItem, Grid, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import sport1 from '../../Images/sports1.jpg';
import sport2 from '../../Images/sports2.jpg';
import sport3 from '../../Images/sports3.jpg';
import sport4 from '../../Images/sports4.jpg';
import sport5 from '../../Images/sports5.jpg';
import sport6 from '../../Images/sports6.jpg';
import dayjs from 'dayjs';


const LandPage = () => {
    const [value, setValue] = useState(new Date())
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
                <Grid container spacing={0} direction="column">
                    <Grid container spacing={3} direction="raw">
                        <Grid item xs={12} md={8} >
                            <ImageList className={landPage_css.imageListContainer} cols={3} rowHeight={160}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img} className={landPage_css.ImageListItem}>
                                        <img src={`${item.img}`} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Grid>
                        <Grid className={landPage_css.buttonContainer}>

                            <Grid className={landPage_css.overAllCalendarbtnConatiner} >
                                <Button className={landPage_css.overallBtn} variant="contained" size='large' fullWidth>Overall Calendar</Button>
                            </Grid>
                            <Grid className={landPage_css.playgroundbtnConatiner} >
                                <Button className={landPage_css.playgroundBtn} variant="contained" size='large' fullWidth>Playground</Button>
                            </Grid>
                            <Grid className={landPage_css.gymnasiumbtnConatiner}>
                                <Button className={landPage_css.gymnasiumBtn} variant="contained" size='large' fullWidth>Gymnasium</Button>
                            </Grid>
                        </Grid>

                    </Grid>


                    <Grid item xs={12} md={8} className={landPage_css.calendarContainer}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                className={landPage_css.calendar}
                                minDate={dayjs('2024-01-01').startOf('day')}
                                maxDate={dayjs('2024-12-31').endOf('day')}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>


            </div>
        </div>
    );
}

const itemData = [
    {
        img: sport1,

    },
    {
        img: sport2,

    },
    {
        img: sport3

    },
    {
        img: sport4

    },
    {
        img: sport5

    },
    {
        img: sport6

    }

];

export default LandPage;
