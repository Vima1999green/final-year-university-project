import React, { useState, useEffect } from "react";
import Facility_css from "./facility.module.css";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import ImageSlider01 from "./ImageSlider";



const Facility = () => {

    const [data, setData] = useState({
        _id: "",
        name: "",
        location: "",
        description: "",
        cost: "",
        capacity: "",
        address: "",
        rules: "",
        imageUrl: "",
      });

      const [editable, setEditable] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
  
  const [allImage, setAllImage] = useState([]);

  

  const fetchDataFromDatabase = async () => {
    try {
      // Fetch data from backend API endpoint
      const response = await fetch("backend_api_url");
      const result = await response.json();

      // Update state with data from the database
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the database
    fetchDataFromDatabase();
  }, []);

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
    try {
      const method = data._id ? "PUT" : "POST";

      await fetch("backend_api_url", {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setEditable(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:8080/");
      const data = await response.json();
      setAllImage(data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (data._id) {
        // Perform the delete operation
        await fetch(`backend_api_url/${data._id}`, {
          method: "DELETE",
        });

        // Clear the form and reset the state
        setData({
          _id: "",
          name: "",
          location: "",
          description: "",
          cost: "",
          capacity: "",
          address: "",
          rules: "",
          imageUrl: "",
        });
        setSelectedImage(null);
        setEditable(false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);


    return (
        <div className={Facility_css.content}>
<<<<<<< HEAD
            <div className={Facility_css.container}>
        <div className={Facility_css.left}>
          {/* 1. Name field */}
          <div>
            <label>Name : </label>
            <TextField
              fullWidth
              label=""
              variant="standard"
              color="warning"
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
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
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
  <ImageSlider01 allImage={allImage}  />
</div>
</div>


          <br />
        </div>
      </div>
=======
            <div className={Facility_css.contentImage}>
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
>>>>>>> 2e21ecd863f60d7ed9e5b1e4af69ba49b6a6bb78
        </div>
    );
}

export default Facility;
