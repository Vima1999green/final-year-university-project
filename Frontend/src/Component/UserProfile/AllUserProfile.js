import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import alluser_css from "./Profile.module.css";
import axios from "axios";
import Card from "@mui/material/Card";
import getUserData from "../../Support/getUserData";
import isEmpty from "../../Support/isEmpty";
import { useNavigate } from "react-router-dom";

const AllUserProfile = () => {
  //const [pro_pic, setpro_pic] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      console.log(data);
      if (data) {
        setUserData(data);
        setUserID(data.id);
      }
      if (isEmpty(data) || data === "Unauthorized") {
        console.log(isEmpty(data));
        navigate("/login");
      }
    };
    fetchUserData();
  }, []);
  console.log(userID);

  //   const filteredUserData = userData.filter((user) => user._id === id);

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row" style={{ color: "black" }}>
        <div className="col-2">
          <Avatar
            //src={pro_pic}
            style={{
              width: "120px",
              height: "120px",
              fontSize: "35px",
              marginLeft: "100px",
            }}
          >
            <br></br>
          </Avatar>
        </div>

        <div className="col-lg-6 col-md-4 col-8">
          {userData ? (
            <Card key={userID}>
              Name : {userData.firstName} {userData.lastName}
              <br />
              Email : {userData.email}
              <br />
              {/* University ID : {user.universityID}
             <br />
             University Email : {user.universityEmail} */}
            </Card>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUserProfile;

//     <div>
//         {/* Retrieve and display the user details from local storage */}
//         {userData && (
//             <div className={alluser_css.avatar_container}>
//                 {pro_pic ? (
//                     <img src={pro_pic}
//                         alt=""
//                         style={{
//                             width: '120px',
//                             height:'120px',
//                             borderRadius:'50%',
//                             marginLeft: '100px' ,}}/>
//                 ) : (
//                 <Avatar
//                     onClick={handleAvatarClick}
//                     src={pro_pic}
//                     style={{backgroundColor: JSON.parse(storedUserDetails).avatarColor ,
//                             width:'120px',
//                             height:'120px',
//                             fontSize:'35px',
//                             marginLeft: '100px'}}>
//                     {userData.email.slice(0, 2).toUpperCase()}
//                     <br></br>
//                 </Avatar>

//                 )}
//                 <input
//                     type="file"
//                     id="fileInput"
//                     accept="image/*"
//                     onChange={handleChange}
//                     style={{ display: 'none' }} />

//                 {pro_pic && (
//                 <label classname={alluser_css.avatar_label} htmlFor="fileInput">Update Image</label>
//                 )}
//             </div>
//         )}

//         {/* Display the user's details */}
//         <br></br>
//         <br></br>
//         <div className={alluser_css.user_Details}>
//             {userData && userType === 'admin' && (
//                 userData.map(user_data => {
//                     console.log("user_data:", user_data);
//                     return (
//                     <div key={user_data}>
//                         <p>E-mail : {user_data.email && user_data.email.slice(0, 2).toUpperCase()}</p>
//                         <p>Name : {user_data.firstName} {user_data.lastName}</p>
//                     </div>
//                     );
//                     })
//             )}

//             {userData && userType === 'university' && (
//                 userData.map(user_data => (
//                     <div key={user_data}>
//                         <p>E-mail : {user_data.email && user_data.email.slice(0, 2).toUpperCase()}</p>
//                         <p>Name : {user_data.firstName} {user_data.lastName}</p>
//                         <p>University ID : {user_data.universityID}</p>
//                         <p>University E-mail : {user_data.universityEmail}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     </div>
