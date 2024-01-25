import viewFacility_css from './ViewFacility.module.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Grid, TextField, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from 'react';
import axios from 'axios';
import gym_image from '../../Images/gym9.jpg'
import playground_image from '../../Images/playground1.jpeg';
import add_facility_image from '../../Images/add_facility.png';
import { Link, useParams } from 'react-router-dom';

const ViewFacility = () => {

    const [facility, setFacility] = useState('');
    const [options, setOptions] = useState([]);//to fill  menu items in the select Box component
    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);


    //get AllFacilities from backend api endpoint
    useEffect(() => {
        axios.get('http://localhost:4000/api/facility/getAllFacilities')
            .then(response =>
                setOptions(response.data)
            )

            .catch(error =>
                console.error(error)
            )
    }, []);

    const handleChange = (event) => {
        setFacility(event.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleFileChange = (event) => {
        if (event.target.files.length > 5) {
            alert('You can only upload maximum of 5 images')
        } else {
            setSelectedFiles(prevFiles => [...prevFiles, ...event.target.files])
        }
    }

    const handleRemove = (indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((file, index) => index !== indexToRemove));
    }


    return (

        <div>

            <div className={viewFacility_css.topNav}>
                <nav>
                    <ul className={viewFacility_css.navLinks}>
                        <li><Link to="/viewFacilities" style={{ textDecoration: "none", color: "white" }}>Facility</Link></li>
                        <li><Link to="/service" style={{ textDecoration: "none", color: "white" }}>Service</Link>
                            <ul className={viewFacility_css.sublinks}>
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
            <div className={viewFacility_css.content}>
                <div className={viewFacility_css.contentImage}>
                    <div className={viewFacility_css.body}>

                        <Box className={viewFacility_css.selectBoxContainer} sx={{ marginBottom: 0 }} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Facility</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={facility}
                                    label="Select Facility"
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {options.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Grid container spacing={2} sx={{ margin: 0, padding: 0, marginTop: '20px' }}>
                            <Grid item xs={12} lg={6}>

                                <Card sx={{ maxWidth: 550 }} className={viewFacility_css.card}>
                                    <CardActionArea>

                                        <CardMedia className={viewFacility_css.cardMedia}
                                            component="img"
                                            image={gym_image}
                                            alt="gymnasium university of ruhuna"
                                        />

                                        <CardContent>

                                            <h2 className={viewFacility_css.cardText}>
                                                Gymnasium
                                            </h2>
                                        </CardContent>


                                    </CardActionArea>

                                </Card>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Card sx={{ maxWidth: 550 }} className={viewFacility_css.card}>
                                    <CardActionArea>

                                        <CardMedia className={viewFacility_css.cardMedia}
                                            component="img"
                                            image={playground_image}
                                            alt="playground university of ruhuna"
                                        />

                                        <CardContent>

                                            <h2 className={viewFacility_css.cardText}>
                                                Playground
                                            </h2>
                                        </CardContent>


                                    </CardActionArea>

                                </Card>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Card sx={{ maxWidth: 550 }} className={viewFacility_css.card} onClick={handleClickOpen} >
                                    <CardActionArea>

                                        <CardMedia className={viewFacility_css.cardMedia}
                                            component="img"
                                            image={add_facility_image}
                                            alt="Add Facility here"
                                        />

                                        <CardContent>

                                            <h2 className={viewFacility_css.cardText}>
                                                Add a Facility
                                            </h2>
                                        </CardContent>


                                    </CardActionArea>

                                </Card>
                            </Grid>



                        </Grid>





                        {/* <Grid container spacing={2} sx={{ margin: 0, padding: 0 }}>
                        {options.map((facility, index) => (
                            <Grid item xs={6} key={index}>
                                <Card sx={{ maxWidth: 550 }} className={viewFacility_css.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={viewFacility_css.cardMedia}
                                            component="img"
                                            image={facility.image[0]} // Assuming the facility object has an 'image' property
                                            alt={facility.label}
                                        />
                                        <CardContent>
                                            <h2 className={viewFacility_css.cardText}>
                                                {facility.label}
                                            </h2>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
 */}                <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Add Facility</DialogTitle>
                            <DialogContent>
                                <div className={viewFacility_css.formContainer}>


                                    <div>
                                        <label>Facility Name : </label>
                                        <TextField
                                            fullWidth
                                            label=""
                                            variant="filled"
                                            color="primary"
                                        />

                                    </div>

                                    <div>
                                        <label>Facility Description : </label>
                                        <TextField
                                            fullWidth
                                            label=""
                                            variant="filled"
                                            color="primary"
                                        />

                                    </div>


                                    <div>
                                        <label>Cost : </label>
                                        <TextField
                                            fullWidth
                                            label=""
                                            variant="filled"
                                            color="primary"
                                        />

                                    </div>

                                    <div>
                                        <label>Location : </label>
                                        <TextField
                                            fullWidth
                                            label=""
                                            variant="filled"
                                            color="primary"
                                        />

                                    </div>

                                    <div>
                                        <label>Capacity : </label>
                                        <TextField
                                            fullWidth
                                            label=""
                                            variant="filled"
                                            color="primary"
                                        />

                                    </div>
                                </div>
                                <br></br>
                                {/*handle image uploads*/}
                                <div>

                                    <label>Images :</label>
                                    <input accept="image/*" type="file" multiple onChange={handleFileChange} />
                                </div>
                                <br></br>
                                {/*prview selected images*/}
                                {Array.from(selectedFiles).map((file, index) => (
                                    <div key={index} >
                                        <img src={URL.createObjectURL(file)} key={index} alt="" style={{ width: '100px', marginLeft: '5px' }} />
                                        <button onClick={() => handleRemove(index)} style={{ color: 'red' }}>Remove</button>
                                    </div>


                                ))}

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Add</Button>
                            </DialogActions>
                        </Dialog>







                    </div>
                </div>
            </div>

        </div>

    );
}

export default ViewFacility;