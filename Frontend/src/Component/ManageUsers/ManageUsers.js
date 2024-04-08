import getUserData from "../../Support/getUserData";
import Button from "@mui/material/Button";
import isEmpty from "../../Support/isEmpty";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography, TextField, Card, CardContent } from "@mui/material";
import TopNav from "../TopNav/TopNav";
import ManageUsers_css from "./ManageUsers.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const ManageUsers = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [universityID, setUniversityID] = useState("");
  const [universityEmail, setUniversityEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("admin");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("create");
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const data = await getUserData();
    console.log(data);
    if (isEmpty(data) || data === "Unauthorized") {
      console.log(isEmpty(data));
      navigate("/login");
    }
    if (data) {
      setUserData(data);
      setUserRole(data.userType);
    }
  };

  //hanlde form data

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUniversityIDChange = (event) => {
    setUniversityID(event.target.value);
  };

  const handleUniversityEmailChange = (event) => {
    setUniversityEmail(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleSearchEmailChange = (event) => {
    setSearchEmail(event.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleClear();
  };

  const handleSportsChange = (event) => {
    const selectedSports = event.target.value.split(",");
    setSports(selectedSports);
  };

  const searchUserByEmail = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      const allUsers = response.data;
      //filter the users array based on the email
      const userWithEmail = allUsers.find((user) => user.email === searchEmail);
      if (userWithEmail) {
        setFirstName(userWithEmail.firstName);
        setLastName(userWithEmail.lastName);
        setEmail(userWithEmail.email);
        setUserType(userWithEmail.userType);
        setUniversityID(userWithEmail.universityID);
        setUniversityEmail(userWithEmail.universityEmail);
        setUserID(userWithEmail._id);
      } else {
        console.log("User not found");
        alert("User does not exists");
      }
    } catch (error) {
      console.error("error fetching user", error);
    }
  };

  //hanlde submitting form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handle submit");

    console.log("======submitting data====");
    console.log("Submitted data:", {
      firstName: firstName,
      lastName: lastName,
      UniversityID: universityID,
      UniversityEmail: universityEmail,
      email: email,
      password: password,
      confPassword: confirmPassword,
      userType: userType,
    });

    console.log("=============");

    await axios
      .post("http://localhost:4000/api/users/register", {
        firstName: firstName,
        lastName: lastName,
        UniversityID: universityID,
        UniversityEmail: universityEmail,
        email: email,
        password: password,
        userType: userType,
      })

      .then((res) => {
        console.log(res.data);
        alert("User Registered succesfully");
        handleClear();
        navigate(`/verifyEmail/${email}`);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data + "\r\n" + "Registration failed");
      });
  };
  //updating the user
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    console.log("hanlde submit update");
    console.log("submitting data");
    console.log("=============");
    console.log("Submitted data:", {
      firstName: firstName,
      lastName: lastName,
      UniversityID: universityID,
      UniversityEmail: universityEmail,
      email: email,
      password: password,
      confPassword: confirmPassword,
      userType: userType,
    });
    const formData = {
      firstName: firstName,
      lastName: lastName,
      UniversityID: universityID,
      UniversityEmail: universityEmail,
      password: password,
      confPassword: confirmPassword,
    };
    const token = JSON.parse(localStorage.getItem("facilityUser")).token;

    await axios
      .put(
        `http://localhost:4000/api/users/update/${userID}`,
        formData,

        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("User updated succesfuly");
        handleClear();
        setSearchEmail("");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data + "\r\n" + "User update failed");
      });
  };

  //Delete the user
  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    console.log("handle delete");
    console.log("========");
    console.log("deleted Data", {
      firstName: firstName,
      lastName: lastName,
      UniversityID: universityID,
      UniversityEmail: universityEmail,
      email: email,
      password: password,
      confPassword: confirmPassword,
      userType: userType,
    });
    console.log(userID);

    const token = JSON.parse(localStorage.getItem("facilityUser")).token;
    await axios
      .delete(`http://localhost:4000/api/users/delete/${userID}`, {
        headers: {
          Authorization: token,
        },
      })

      .then((res) => {
        console.log(res.data);
        alert("User deleted succesfully");
        handleClear();
        setSearchEmail("");
      })

      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data + "\r\n" + "User delete failed");
      });
  };

  // Clear form
  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setUniversityID("");
    setUniversityEmail("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div>
      <TopNav />
      <div className={ManageUsers_css.content}>
        {userRole === "admin" ? (
          <div
            className={ManageUsers_css.body}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div
              style={{ display: "flex", direction: "column" }}
              className={ManageUsers_css.list}
            >
              <List
                component="nav"
                style={{ marginRight: "40px" }}
                className={ManageUsers_css.list}
              >
                <ListItem
                  button
                  style={{
                    marginTop: "30px",
                    backgroundColor: "#6F2121",
                    borderRadius: "8px",
                  }}
                  className={ManageUsers_css.listItem}
                  onClick={() => {
                    setSelectedOption("create");
                  }}
                >
                  <ListItemText
                    primary="Create User"
                    style={{ color: "white", fontSize: "18px" }}
                  />
                </ListItem>

                <ListItem
                  button
                  style={{
                    marginTop: "30px",
                    backgroundColor: "#6F2121",
                    borderRadius: "8px",
                  }}
                  className={ManageUsers_css.listItem}
                  onClick={() => handleOptionSelect("edit")}
                >
                  <ListItemText
                    primary="Edit User"
                    style={{ color: "white", fontSize: "18px" }}
                  />
                </ListItem>
                <ListItem
                  button
                  style={{
                    marginTop: "30px",
                    backgroundColor: "#6F2121",
                    borderRadius: "8px",
                  }}
                  className={ManageUsers_css.listItem}
                  onClick={() => handleOptionSelect("archive")}
                >
                  <ListItemText
                    primary="Archive User"
                    style={{ color: "white", fontSize: "18px" }}
                  />
                </ListItem>
                <ListItem
                  button
                  style={{
                    marginTop: "30px",
                    backgroundColor: "#6F2121",
                    borderRadius: "8px",
                  }}
                  className={ManageUsers_css.listItem}
                  onClick={() => handleOptionSelect("delete")}
                >
                  <ListItemText
                    primary="Delete User"
                    style={{ color: "white", fontSize: "18px" }}
                  />
                </ListItem>
              </List>
            </div>

            <div
              style={{ flex: 1, margin: "0" }}
              className={ManageUsers_css.card}
            >
              <Typography variant="h3" style={{ color: "black" }}>
                User Profile Settings
              </Typography>

              <Card>
                <CardContent className={ManageUsers_css.cardContent}>
                  {selectedOption === "delete" ||
                  selectedOption === "archive" ||
                  selectedOption === "edit" ? (
                    <div>
                      <TextField
                        label="Search by Email"
                        fullWidth
                        value={searchEmail}
                        onChange={handleSearchEmailChange}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            searchUserByEmail();
                          }
                        }}
                        style={{ marginBottom: "20px" }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={searchUserByEmail}
                      >
                        Search
                      </Button>
                    </div>
                  ) : null}
                  <br></br>
                  <label>
                    User Type :<br></br>
                    <select
                      value={userType}
                      onChange={handleUserTypeChange}
                      name="userType"
                      style={{ color: "black" }}
                      fullWidth
                    >
                      <option value="Guest" style={{ color: "black" }}>
                        Guest
                      </option>
                      <option value="university" style={{ color: "black" }}>
                        University
                      </option>
                      <option value="admin" style={{ color: "black" }}>
                        Admin
                      </option>
                      <option value="director" style={{ color: "black" }}>
                        Director
                      </option>
                      <option value="dvc" style={{ color: "black" }}>
                        Dvc
                      </option>
                      <option value="instructor" style={{ color: "black" }}>
                        Instructor
                      </option>
                    </select>
                    <br />
                  </label>
                  <TextField
                    label="First Name"
                    fullWidth
                    className={ManageUsers_css.text}
                    style={{ marginTop: "50px" }}
                    value={firstName}
                    onChange={handleFirstNameChange}
                    autoComplete="false"
                  />

                  <TextField
                    label="Last Name"
                    fullWidth
                    className={ManageUsers_css.text}
                    style={{ marginTop: "20px" }}
                    value={lastName}
                    onChange={handleLastNameChange}
                    autoComplete="false"
                  />

                  <TextField
                    label="email"
                    fullWidth
                    className={ManageUsers_css.text}
                    style={{ marginTop: "20px" }}
                    value={email}
                    onChange={handleEmailChange}
                    disabled={selectedOption !== "create"}
                    autoComplete="false"
                  />

                  <TextField
                    label="university ID"
                    fullWidth
                    className={ManageUsers_css.text}
                    style={{ marginTop: "20px" }}
                    value={universityID}
                    onChange={handleUniversityIDChange}
                    autoComplete="false"
                  />

                  <TextField
                    label=" university email"
                    fullWidth
                    className={ManageUsers_css.text}
                    style={{ marginTop: "20px" }}
                    value={universityEmail}
                    onChange={handleUniversityEmailChange}
                    autoComplete="false"
                  />

                  {userType === "instructor" && (
                    <TextField
                      label="Sports"
                      fullWidth
                      className={ManageUsers_css.text}
                      style={{ marginTop: "20px" }}
                      value={sports.join(",")}
                      onChange={handleSportsChange}
                    />
                  )}

                  {selectedOption !== "delete" ? (
                    <>
                      <TextField
                        label="password"
                        type="password"
                        fullWidth
                        className={ManageUsers_css.text}
                        style={{ marginTop: "20px" }}
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="false"
                      />

                      <TextField
                        label="confirm password"
                        type="password"
                        fullWidth
                        className={ManageUsers_css.text}
                        style={{ marginTop: "20px" }}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        autoComplete="false"
                      />
                    </>
                  ) : null}

                  {selectedOption === "create" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={ManageUsers_css.button}
                        onClick={handleSubmit}
                      >
                        Create
                      </Button>
                    </div>
                  ) : null}

                  {selectedOption === "edit" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={ManageUsers_css.button}
                        onClick={handleSubmitUpdate}
                      >
                        Save Changes
                      </Button>
                    </div>
                  ) : null}

                  {selectedOption === "archive" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        className={ManageUsers_css.button}
                        onClick={handleSubmit}
                      >
                        Archive User
                      </Button>
                    </div>
                  ) : null}

                  {selectedOption === "delete" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        className={ManageUsers_css.button}
                        onClick={handleSubmitDelete}
                      >
                        Delete User
                      </Button>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ManageUsers;
