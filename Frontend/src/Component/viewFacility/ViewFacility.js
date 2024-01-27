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
import add_facility_image from '../../Images/facility.jpg';
import { Link, useNavigate } from 'react-router-dom';

const ViewFacility = () => {

    const user = JSON.parse(localStorage.getItem('facilityUser'));
    const userRole = user.userDetails.userType;
    const navigate = useNavigate();

    const [options, setOptions] = useState([]);//to fill  menu items in the select Box component
    const [selectedOption, setSelectedOption] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [facName, setFacName] = useState('');
    const [facDesc, setFacDesc] = useState('');
    const [facCost, setFacCost] = useState('');
    const [facLocation, setFacLocation] = useState('');
    const [facCapacity, setFacCapacity] = useState('');
    const [facAddress, setFacAddress] = useState('');
    const [facRules, setFacRules] = useState('');
    const [values, setValues] = useState({
        facName: "",
        description: "",
        cost: "",
        location: "",
        capacity: "",
        address: "",
        rules: ""
    })


    const handleInput = (event) => {
        event.preventDefault();
        setValues({ ...values, [event.target.name]: [event.target.value] });

        if (event.target.name === 'facName')
            setFacName(event.target.value)
        if (event.target.name === 'description')
            setFacDesc(event.target.value)

        if (event.target.name === 'cost')
            setFacCost(event.target.value)

        if (event.target.name === 'location')
            setFacLocation(event.target.value)

        if (event.target.name === 'capacity')
            setFacCapacity(event.target.value)

        if (event.target.name === 'address')
            setFacAddress(event.target.value)

        if (event.target.name === 'rules')
            setFacRules(event.target.value)


    };




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
        event.preventDefault();
        setSelectedOption(event.target.value)
        setSelectedCard(event.target.value)

    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleFileChange = (event) => {
        event.preventDefault();
        if (event.target.files.length > 5) {
            alert('You can only upload maximum of 5 images')
        } else {
            setSelectedFiles(prevFiles => [...prevFiles, ...event.target.files])
        }
    }

    const handleRemove = (indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((file, index) => index !== indexToRemove));
    }


    const handleClear = () => {
        setFacName('')
        setFacDesc('')
        setFacCapacity('')
        setFacCost('')
        setFacLocation('')
        setFacAddress('')
        setFacRules('')
    };

    const hanldeSubmit = async (event) => {
        event.preventDefault();
        console.log('hanlde submit');
        console.log('==================');
        console.log('submitted data', {
            FacilityName: facName,
            Description: facDesc,
            Cost: facCost,
            location: facLocation,
            Capacity: facCapacity,
            Address: facAddress,
            Rules: facRules

        })

        console.log('===================');
        // Create a FormData object to append the image files
        const formData = {
            name: facName,
            description: facDesc,
            cost: facCost,
            location: facLocation,
            capacity: facCapacity,
            address: facAddress,
            rules: facRules
        }



        // // Append facility data to the FormData object
        // formData.append('FacilityName', facName);
        // formData.append('Description', facDesc);
        // formData.append('Cost', facCost);
        // formData.append('location', facLocation);
        // formData.append('Capacity', facCapacity);
        // formData.append('Address', facAddress);
        // formData.append('Rules', facRules);

        // // Append each image file to the FormData object
        // for (const file of selectedFiles) {
        //     formData.append('images', file);
        // }

        // await axios.post('http://localhost:4000/api/facility/regsiter', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        //     },

        // })
        //     .then(response => {
        //         console.log(response.data)
        //         alert('Facility created succesfully');

        //     })

        //     .catch(error => {
        //         console.log(error.response.data);
        //         alert(error.response.data + '\r\n' + 'Fcaility creation failed')
        //     })
        const token = JSON.parse(localStorage.getItem('facilityUser')).token
        let facilityId = '';
        await axios
            .post(
                'http://localhost:4000/api/facility/register', formData,
                {
                    headers: {
                        Authorization: token
                    }
                })
            .then(res => {
                facilityId = res.data._id
                console.log('facilityId', facilityId)
                alert('Facility created succesfully')
                console.log('Facility created succesfully')
                console.log('Facility created succesfully ALERT Finished')
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data)
                }
            })
        //uploading photos
        try {
            await uploadImages(facilityId, selectedFiles);
            console.log('images uploaded succesfully');
            alert('Facility created succesfully');
        } catch (error) {
            console.log(error.message)
            alert(error.message + '\r\n' + 'Uploading images failed');
        }

        handleClear();

    };

    const uploadImages = async (facilityId, imageFiles) => {
        const formData = new FormData();

        // Append facility ID to the FormData object
        formData.append('facilityId', facilityId);

        // Append each image file to the FormData object
        for (const file of imageFiles) {
            formData.append('photos', file);
        }
        const token = JSON.parse(localStorage.getItem('facilityUser')).token
        await axios
            .post('http://localhost:4000/api/facility/uploadPhotos',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                        Authorization: token
                    },
                })
            .then(res => {
                alert(res.data)
            })
            .catch(error => {
                alert(error.response.data)
            })
    };


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
                                    value={selectedOption}
                                    label="Select Facility"
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {options.map((option, index) => (
                                        <MenuItem key={index} value={option.value} style={{ color: 'black' }}>{option.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Grid container spacing={2} sx={{ margin: 0, padding: 0, marginTop: '20px' }}>
                            <Grid item xs={12} lg={6}>

                                <Card sx={{ maxWidth: 550 }} className={viewFacility_css.card} >
                                    <Link to={'/facility/gymnasium'} className={viewFacility_css.cardLink}>
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
                                    </Link>

                                </Card>

                            </Grid>

                            <Grid item xs={12} lg={6}>

                                <Card sx={{ maxWidth: 550 }} className={viewFacility_css.card} >
                                    <Link to={'/facility/playground'} className={viewFacility_css.cardLink}>
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
                                    </Link>

                                </Card>

                            </Grid>


                            <Grid item xs={12} lg={6}>
                                {userRole === 'admin' && (
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
                                )}
                            </Grid>



                        </Grid>






                        <Grid container spacing={2} sx={{ margin: 0, padding: 0 }}>
                            {options.map((facility, index) => (
                                <Grid item xs={6} key={index}>

                                    <Card sx={{ maxWidth: 550 }} className={viewFacility_css.card} >
                                        <Link to={`/facility/${facility._id}`} className={viewFacility_css.cardLink}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={viewFacility_css.cardMedia}
                                                    component="img"
                                                    // Assuming the facility object has an 'image' property
                                                    alt={facility.name}

                                                />
                                                <CardContent>
                                                    <h2 className={viewFacility_css.cardText}>
                                                        {facility.name}
                                                    </h2>
                                                </CardContent>
                                            </CardActionArea>
                                        </Link>
                                    </Card>

                                </Grid>
                            ))}
                        </Grid>



                        <Dialog open={open} onClose={handleClose} className={viewFacility_css.dialogBox}>
                            <DialogTitle>Add Facility</DialogTitle>
                            <DialogContent>
                                <div className={viewFacility_css.formContainer}>


                                    <div>
                                        <label>Facility Name : </label>
                                        <TextField

                                            fullWidth
                                            name='facName'
                                            label=""
                                            variant="filled"
                                            color="primary"
                                            value={values.facName}
                                            onChange={handleInput}
                                        />

                                    </div>

                                    <div>
                                        <label>Facility Description : </label>
                                        <TextField
                                            fullWidth
                                            name='description'
                                            label=""
                                            variant="filled"
                                            color="primary"
                                            value={values.facDesc}
                                            onChange={handleInput}
                                        />

                                    </div>


                                    <div>
                                        <label>Cost : </label>
                                        <TextField
                                            fullWidth
                                            name='cost'
                                            label=""
                                            variant="filled"
                                            color="primary"
                                            type='number'
                                            value={values.facCost}
                                            onChange={handleInput}
                                        />

                                    </div>

                                    <div>
                                        <label>Location : </label>
                                        <TextField
                                            fullWidth
                                            name='location'
                                            label=""
                                            variant="filled"
                                            color="primary"
                                            value={values.facLocation}
                                            onChange={handleInput}
                                        />

                                    </div>

                                    <div>
                                        <label>Capacity : </label>
                                        <TextField
                                            fullWidth
                                            name='capacity'
                                            label=""
                                            variant="filled"
                                            color="primary"
                                            type='number'
                                            value={values.facCapacity}
                                            onChange={handleInput}
                                        />

                                    </div>

                                    <div>
                                        <label>Address : </label>
                                        <TextField
                                            fullWidth
                                            name='address'
                                            label=""
                                            variant="filled"
                                            color="primary"
                                            value={values.facAddress}
                                            onChange={handleInput}

                                        />

                                    </div>

                                    <div>
                                        <label>Rules : </label>
                                        <TextField
                                            fullWidth
                                            name='rules'
                                            label=""
                                            variant="filled"
                                            color="primary"
                                            value={values.facRules}
                                            onChange={handleInput}

                                        />

                                    </div>

                                </div>
                                <br></br>
                                {/*handle image uploads*/}
                                <div>

                                    <label>Images :</label>
                                    <input accept="image/*" type="file" multiple onChange={handleFileChange} name='img' />
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
                                <Button onClick={hanldeSubmit}>Add</Button>
                            </DialogActions>
                        </Dialog>







                    </div>
                </div>
            </div>

        </div>

    );
}

export default ViewFacility;