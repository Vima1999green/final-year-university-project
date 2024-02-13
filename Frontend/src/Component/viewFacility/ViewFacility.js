import viewFacility_css from './ViewFacility.module.css'
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
import { Link, useNavigate } from 'react-router-dom';
import isEmpty from '../../isEmpty';
import TopNav from '../TopNav/TopNav';

const ViewFacility = () => {

    const user = JSON.parse(localStorage.getItem('facilityUser'));
    const userRole = user.userDetails.userType;

    const navigate = useNavigate();

    const [options, setOptions] = useState([]);//to fill  menu items in the select Box component

    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

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
        setValues({ ...values, [event.target.name]: event.target.value });

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


    const reloadPage = () => {
        console.log('reloadPage')
        axios.get('http://localhost:4000/api/facility/getAllFacilities')
            .then(response => {
                console.log(response.data)
                setOptions(response.data)
            }
            )

            .catch(error =>
                console.error(error)
            )
    }
    // get AllFacilities from backend api endpoint
    useEffect(reloadPage, []);



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
        console.log('handleClear')
        setFacName('')
        setFacDesc('')
        setFacCapacity('')
        setFacCost('')
        setFacLocation('')
        setFacAddress('')
        setFacRules('')
        setSelectedFiles([])
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
                handleClear();
                reloadPage();
                handleClose();
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data)
                    console.log('Error alert')
                    return
                }
            })
        //uploading photos
        console.log(selectedFiles)
        if (!isEmpty(facilityId)) {
            try {
                await uploadImages(facilityId, selectedFiles);
                console.log('images uploaded succesfully');
                handleClear();
                reloadPage();
                handleClose();
            } catch (error) {
                console.log(error.message)
                alert(error.message + '\r\n' + 'Uploading images failed');
                return
            }
        }
        // handleClear();
        // reloadPage();
        // handleClose();



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
            .post(`http://localhost:4000/api/facility/uploadPhotos/${facilityId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                        Authorization: token
                    },
                })
            .then(res => {
                console.log('Uopload success')
                alert(res.data)
            })
            .catch(error => {
                console.log('Uopload Failes')
                alert(error.response.data)
            })
    };


    return (

        <div>
            <TopNav />

            <div className={viewFacility_css.content}>
                <div className={viewFacility_css.contentImage}>
                    <div className={viewFacility_css.body}>

                        <Grid item xs={12} lg={6} >
                            {userRole === 'admin' ? (
                                <Button
                                    variant="contained"
                                    sx={{ width: '100%' }}
                                    className={viewFacility_css.button}
                                    onClick={handleClickOpen}
                                >Add Facility </Button>




                            ) : (
                                null
                            )}
                        </Grid>
















                        <Grid container spacing={2} sx={{ margin: 0, padding: 0 }}>
                            {options.map((facility, index) => {
                                console.log('facility', facility)
                                return (
                                    <Grid item xs={6} key={index}>
                                        <Card sx={{ maxWidth: 550,maxHeight:400 }} className={viewFacility_css.card}>
                                            <Link to={`/facility/${facility._id}`} className={viewFacility_css.cardLink}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={viewFacility_css.cardMedia}
                                                        component="img"
                                                        alt={facility.name}
                                                        image={facility.images[0]}
                                                            style={{ height: '300px', width: '550px' }}
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
                                )
                            })}
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
                                            name="rules"
                                            label=""
                                            multiline
                                            rows={5}  // You can adjust the number of rows as needed

                                            value={values.rules}
                                            onChange={handleInput}
                                            fullWidth
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