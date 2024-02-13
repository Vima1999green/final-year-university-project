import React, { useState, useEffect, useRef } from "react";
import Facility_css from "./facility.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import isEmpty from '../../isEmpty';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import ImageSlider from '../ImageSlider/ImageSlider';
import TopNav from '../TopNav/TopNav';

const Facility = () => {
    const userType = JSON.parse(localStorage.getItem('facilityUser')).userDetails.userType;
    const navigate = useNavigate()
    console.log('facility component renders')

    const fileInputRef = useRef(null);


    const { facilityId } = useParams();
    console.log(facilityId)
    const [data, setData] = useState({

        name: "",
        location: "",
        description: "",
        cost: "",
        capacity: "",
        address: "",
        rules: "",
        images: [],
    });

    const [editable, setEditable] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null)






    useEffect(() => {
        // Fetch data from the database



        console.log('facility component use effect')
        axios.get(`http://localhost:4000/api/facility/getFacility/${facilityId}`)

            .then(res => {
                console.log(res.data)
                setData(res.data);


            })
            .catch(err => {
                alert(err.response.data)
            })
    }, [facilityId]);

    const handleInputChange = (field, value) => {

        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const handleFileChange = (event) => {
        // Handle the selected file(s) here
        event.preventDefault();
        if (event.target.files.length > 5) {
            alert('You can only upload maximum of 5 images')
        } else {
            const filesArray = selectedFiles ? [...selectedFiles, ...event.target.files] : [...event.target.files];
            setSelectedFiles(filesArray);
        }
    };
    const handleChooseImage = () => {
        fileInputRef.current.click();
    }




    const handleEdit = () => {

        setEditable(true);
    };

    const handleSave = async () => {

        console.log('hanlde save');
        console.log('==================');
        console.log('submiting data', {
            name: data.name,
            description: data.desc,
            cost: data.cost,
            location: data.location,
            capacity: data.capacity,
            address: data.address,
            rules: data.rules

        })


        const formData = {
            name: data.name,
            description: data.description,
            cost: data.cost,
            location: data.location,
            capacity: data.capacity,
            address: data.address,
            rules: data.rules
        }
        const token = JSON.parse(localStorage.getItem('facilityUser')).token
        await axios.put(`http://localhost:4000/api/facility/updateFacility/${facilityId}`, formData, {
            headers: {
                Authorization: token
            }
        })

            .then(res => {
                console.log(res.data)
                alert('Facility updated succesfully');

            })

            .catch(error => {
                if (error.response) {
                    console.log(error.response.data)
                    alert(error.response.data)
                    console.log('Error alert')
                    return
                }
            })

        if (!isEmpty(facilityId) && selectedFiles) {
            try {
                await uploadImages(facilityId, selectedFiles);
                console.log('images uploaded succesfully');
            } catch (error) {
                console.log(error.message)
                alert(error.message + '\r\n' + 'Uploading images failed');
                return
            }
        }
    }

    const uploadImages = async (facilityId, imageFiles) => {
        const formData = new FormData();

        // Append facility ID to the FormData object
        formData.append('facilityId', facilityId);


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
                alert(res.data)
            })
            .catch(error => {
                alert(error.response.data)
            })
    };




    const handleDelete = async () => {
        const token = JSON.parse(localStorage.getItem('facilityUser')).token
        console.log('Delete facility')
        await axios.delete(
            `http://localhost:4000/api/facility/deleteSingleFacility/${facilityId}`,
            {
                headers: {
                    Authorization: token
                }
            })
            .then(res => {
                console.log(res.data)
                alert(res.data)
                setData({

                    name: "",
                    location: "",
                    description: "",
                    cost: "",
                    capacity: "",
                    address: "",
                    rules: "",
                    images: [],
                });
                setEditable(false)
            })
            .catch(error => {
                console.log(error)
                if (error.response && error.response.data) {
                    // The request was made and the server responded with a status code
                    console.error('Server response:', error.response.data);
                    alert(error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    alert('Error: No response received from the server');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error:', error.message);
                    alert('Error deleting facility');
                }
            })
        navigate('/viewFacilities')
    }



    // }



    return (
        <div>
            <TopNav />

            <div className={Facility_css.content}>
                <div className={Facility_css.contentImage}>
                    <div className={Facility_css.container}>
                        <div className={Facility_css.left}>
                            {/* 1. Name field */}
                            <div>
                                <label>Name : </label>
                                <TextField
                                    fullWidth
                                    label=""
                                    variant="standard"
                                    color="primary"
                                    value={data.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    disabled={!editable}


                                />
                            </div>
                            {/* 2. Location field */}
                            <div>
                                <label>Location : </label>
                                <TextField
                                    fullWidth
                                    label=""
                                    variant="standard"
                                    color="warning"
                                    value={data.location}
                                    onChange={(e) => handleInputChange("location", e.target.value)}
                                    disabled={!editable}
                                />
                            </div>
                            {/* 3. Description field */}
                            <div>
                                <label>Description : </label>
                                <TextField
                                    fullWidth
                                    multiline
                                    variant="standard"
                                    color="warning"
                                    value={data.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    disabled={!editable}
                                />
                            </div>
                            {/* 4. Cost field */}
                            <div>
                                <label>Cost : </label>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    color="warning"
                                    value={data.cost}
                                    onChange={(e) => handleInputChange("cost", e.target.value)}
                                    disabled={!editable}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">Rs </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            {/* 5. Capacity field */}
                            <div>
                                <label>Capacity : </label>
                                <TextField
                                    fullWidth
                                    label=""
                                    variant="standard"
                                    color="warning"
                                    value={data.capacity}
                                    onChange={(e) => handleInputChange("capacity", e.target.value)}
                                    disabled={!editable}
                                />
                            </div>

                            {/* 5. Address field */}
                            <div>
                                <label>Address : </label>
                                <TextField
                                    fullWidth
                                    multiline
                                    label=""
                                    variant="standard"
                                    color="warning"
                                    value={data.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    disabled={!editable}
                                />
                            </div>

                            {/* 5. Rules field */}
                            <div>
                                <label>Rules : </label>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={5}
                                    label=""
                                    variant="standard"
                                    color="warning"
                                    value={data.rules}
                                    onChange={(e) => handleInputChange("rules", e.target.value)}
                                    disabled={!editable}
                                />
                            </div>

                            <br />
                            {
                                userType === 'admin' ?
                                    (<div className={Facility_css.buttonGroup}>
                                        {
                                            <>
                                                <Button onClick={handleEdit} variant="contained">
                                                    Edit
                                                </Button>

                                                {data._id && ( // Display delete button only if there's an _id
                                                    <Button
                                                        // onClick={handleDelete}
                                                        variant="contained"
                                                        color="error"
                                                        onClick={handleDelete}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </>
                                        }
                                        {editable && (
                                            <Button onClick={handleSave} variant="contained">
                                                Save
                                            </Button>
                                        )}
                                    </div>) : null
                            }

                            <br />
                            <div className={Facility_css.booking_btn}>
                                <Link to='/bookingForm'>
                                <Button variant="contained" color="warning" size="large">
                                    Booking
                                </Button>
                                </Link>
                            </div>
                        </div>

                        <div className={Facility_css.right}>
                            <div className={Facility_css.header}>
                                <h1>{data.name}</h1>
                            </div>
                            <div className={Facility_css.img_container}>

                                <div className={Facility_css.gym_img_box}>
                                    {/* <ImageSlider /> */}
                                    {console.log(data.images)}
                                    {console.log(typeof data.images[0])}
                                    <ImageSlider images={data.images} />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    multiple
                                />
                                {userType === 'admin' ? (<IconButton color="primary" onClick={handleChooseImage} sx={{ color: 'black !important' }} >
                                    <AddPhotoAlternateIcon />
                                </IconButton>) : null

                                }

                            </div>


                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Facility;
