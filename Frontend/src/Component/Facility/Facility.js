import React, { useState, useEffect, useRef } from "react";
import Facility_css from "./facility.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import isEmpty from '../../isEmpty';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';

const Facility = () => {
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




    // const fetchDataFromDatabase = async () => {

    //     // try {
    //     //     // Fetch data from backend API endpoint
    //     //     const response = await fetch(`http://localhost:4000/api/facility/getFacility/${data._id}`, {
    //     //         method: 'GET',
    //     //         headers: {
    //     //             "Content-Type": "application/json",
    //     //         },
    //     //         body: JSON.stringify(data),
    //     //     });
    //     //     const result = await response.json();

    //     //     // Update state with data from the database
    //     //     setData(result);
    //     // } catch (error) {
    //     //     console.error("Error fetching data:", error);
    //     // }

    //     // await axios.get(`http://localhost:4000/api/facility/getFacility/${facilityId}`)
    //     //     .then(res => {
    //     //         console.log(res.data)
    //     //     })
    //     //     .catch(err => {
    //     //         alert(err.response.data)
    //     //     })


    // };

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

        if (!isEmpty(facilityId)) {
            try {
                await uploadImages(facilityId);
                console.log('images uploaded succesfully');
            } catch (error) {
                console.log(error.message)
                alert(error.message + '\r\n' + 'Uploading images failed');
                return
            }
        }

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
                    alert(res.data)
                })
                .catch(error => {
                    alert(error.response.data)
                })
        };
    };



    const handleDelete = async () => {
        //     //     try {
        //     //         if (data._id) {
        //     //             // Perform the delete operation
        //     //             await fetch(`backend_api_url/${data._id}`, {
        //     //                 method: "DELETE",
        //     //             });

        //     //             // Clear the form and reset the state
        //     //             setData({
        //     //                 _id: "",
        //     //                 name: "",
        //     //                 location: "",
        //     //                 description: "",
        //     //                 cost: "",
        //     //                 capacity: "",
        //     //                 address: "",
        //     //                 rules: "",
        //     //                 imageUrl: "",
        //     //             });
        //     //             setSelectedImage(null);
        //     //             setEditable(false);
        //     //         }
        //     //     } catch (error) {
        //     //         console.error("Error deleting data:", error);
        //     //     }
        //     // };
        // useEffect(() => {
        //     fetchImages();
        // }, []);
        await axios.delete(`http://localhost:4000/api/facility/deleteSingleFacility/${facilityId}`)
            .then(res => {
                console.log(res.data)
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
                alert(error.response.data)
            })
    }



    // }
    const handleChooseImage = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event) => {
        // Handle the selected file(s) here
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log('Selected File:', selectedFile);
            // Add your logic to handle the selected file
        }
    };

    // create ImageSlider component
    const ImageSlider = () => {
        console.log('image slider renderd')
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        if (!Array.isArray(data.images) || data.images.length === 0) {
            console.error("No images available or data.images is not an array:", data.images);

            return null;
        }
        // const serverBaseUrl = "http://localhost:4000";
        // const imagesFolder = "Backend/uploads";


        return (
            <Slider {...settings} className={Facility_css.gym_img_slider}>
                {data.images.map((imageUrl, index) => (
                    <div key={index}>
                        {console.log(imageUrl)}
                        <img
                            src={imageUrl}
                            width={"700px"}
                            height={"350px"}
                            style={{ padding: "10px", border: "2px solid #ccc", borderRadius: "9px" }}
                            alt={`Image ${index}`}
                        />
                    </div>
                ))}
            </Slider>
        );
    };

    return (
        <div>
            <div className={Facility_css.topNav}>
                <nav>
                    <ul className={Facility_css.navLinks}>
                        <li><Link to="/viewFacilities" style={{ textDecoration: "none", color: "white" }}>Facility</Link></li>
                        <li><Link to="/service" style={{ textDecoration: "none", color: "white" }}>Service</Link>
                            <ul className={Facility_css.sublinks}>
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

                            <div className={Facility_css.buttonGroup}>
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
                            </div>
                            <br />
                            <div className={Facility_css.booking_btn}>
                                <Button variant="contained" color="warning" size="large">
                                    Booking
                                </Button>
                            </div>
                        </div>

                        <div className={Facility_css.right}>
                            <div className={Facility_css.header}>
                                <h1>{data.name}</h1>
                            </div>
                            <div className={Facility_css.img_container}>

                                <div className={Facility_css.gym_img_box}>
                                    <ImageSlider />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <IconButton color="primary" onClick={handleChooseImage}>
                                    <AddPhotoAlternateIcon />
                                </IconButton>
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
