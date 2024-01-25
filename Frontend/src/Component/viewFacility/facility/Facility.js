import React, { useState, useEffect } from "react";
import Facility_css from "./facility.module.css";
import Gymnasium01 from "../../../Images/gym9.jpg";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";



const Facility = () => {
    const [data, setData] = useState({
        name: "",
        location: "",
        description: "",
        cost: "",
        capacity: "",
    });

    const [editableFields, setEditableFields] = useState({
        name: false,
        location: false,
        description: false,
        cost: false,
        capacity: false,
    });

    const fetchDataFromDatabase = async () => {
        try {
            // Fetch data from  backend API endpoint
            const response = await fetch("backend_api_url");
            const result = await response.json();

            // Update state with data from the database
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Fetch data from the database on component mount
        fetchDataFromDatabase();
    }, []);

    const handleInputChange = (field, value) => {
        setData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleEdit = (field) => {
        setEditableFields((prevEditableFields) => ({
            ...prevEditableFields,
            [field]: true,
        }));
    };

    const handleSave = async (field) => {
        try {
            // Send updated data to your backend API for saving
            await fetch("backend_api_url", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [field]: data[field] }),
            });

            // Update editable state
            setEditableFields((prevEditableFields) => ({
                ...prevEditableFields,
                [field]: false,
            }));
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };



    return (
        <div className={Facility_css.content}>
            <div className={Facility_css.container}>
                <div className={Facility_css.left}>
                    {/* 1 .  Name field */}
                    <div>
                        <label>Name : </label>
                        <TextField
                            fullWidth
                            label=""
                            variant="standard"
                            color="warning"
                            value={data.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            disabled={!editableFields.name}
                            InputProps={{
                                endAdornment: (
                                    <>
                                        {editableFields.name ? (
                                            <>
                                                <Button onClick={() => handleSave("name")} size="small">
                                                    Save
                                                </Button>{" "}
                                                <Button onClick={() => handleEdit("name")} size="small">
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button onClick={() => handleEdit("name")} size="small">
                                                Edit
                                            </Button>
                                        )}
                                    </>
                                ),
                            }}
                        />
                    </div>
                    {/* 2 .  Location field */}
                    <div>
                        <label>Location : </label>
                        <TextField
                            fullWidth
                            label=""
                            variant="standard"
                            color="warning"
                            value={data.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            disabled={!editableFields.location}
                            InputProps={{
                                endAdornment: (
                                    <>
                                        {editableFields.location ? (
                                            <>
                                                <Button
                                                    onClick={() => handleSave("location")}
                                                    size="small"
                                                >
                                                    Save
                                                </Button>{" "}
                                                <Button
                                                    onClick={() => handleEdit("location")}
                                                    size="small"
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => handleEdit("location")}
                                                size="small"
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </>
                                ),
                            }}
                        />
                    </div>
                    {/* 3.  Description field*/}
                    <div>
                        <label>Description : </label>
                        <TextField
                            fullWidth
                            multiline
                            variant="standard"
                            color="warning"
                            value={data.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            disabled={!editableFields.description}
                            InputProps={{
                                endAdornment: (
                                    <>
                                        {editableFields.description ? (
                                            <>
                                                <Button
                                                    onClick={() => handleSave("description")}
                                                    size="small"
                                                >
                                                    Save
                                                </Button>{" "}
                                                <Button
                                                    onClick={() => handleEdit("description")}
                                                    size="small"
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => handleEdit("description")}
                                                size="small"
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </>
                                ),
                            }}
                        />
                    </div>
                    {/* 4 . Cost field */}
                    <div>
                        <label>Cost : </label>
                        <TextField
                            fullWidth
                            variant="standard"
                            color="warning"
                            value={data.cost}
                            onChange={(e) => handleInputChange("cost", e.target.value)}
                            disabled={!editableFields.cost}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">Rs </InputAdornment>
                                ),

                                endAdornment: (
                                    <>
                                        {editableFields.cost ? (
                                            <>
                                                <Button onClick={() => handleSave("cost")} size="small">
                                                    Save
                                                </Button>{" "}
                                                <Button onClick={() => handleEdit("cost")} size="small">
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button onClick={() => handleEdit("cost")} size="small">
                                                Edit
                                            </Button>
                                        )}
                                    </>
                                ),
                            }}
                        />
                    </div>
                    {/*  5. Capacity field */}
                    <div>
                        <label>Capcity : </label>
                        <TextField
                            fullWidth
                            label=""
                            variant="standard"
                            color="warning"
                            value={data.capacity}
                            onChange={(e) => handleInputChange("capacity", e.target.value)}
                            disabled={!editableFields.capacity}
                            InputProps={{
                                endAdornment: (
                                    <>
                                        {editableFields.capacity ? (
                                            <>
                                                <Button
                                                    onClick={() => handleSave("capacity")}
                                                    size="small"
                                                >
                                                    Save
                                                </Button>{" "}
                                                <Button
                                                    onClick={() => handleEdit("capacity")}
                                                    size="small"
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                onClick={() => handleEdit("capacity")}
                                                size="small"
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </>
                                ),
                            }}
                        />
                    </div>

                    <div className={Facility_css.booking_btn}>
                        <Button variant="contained" color="warning">
                            Booking
                        </Button>
                    </div>
                </div>


                <div className={Facility_css.right}>
                    <div className={Facility_css.gym_header}>GYMNASIUM</div>
                    <div className={Facility_css.gym_img_box}>
                        <img
                            src={Gymnasium01}
                            className="img-thumbnail"
                            alt="A sample image"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Facility;
