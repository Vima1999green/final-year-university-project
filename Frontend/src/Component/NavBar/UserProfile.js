import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "@mui/material";
import isEmpty from "../../Support/isEmpty";
import getUserData from "../../Support/getUserData";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Retrieve user details
    const fetchUserData = async () => {
      const data = await getUserData();

      if (data) {
        setUserData(data);
        setUserEmail(data.email);
      }
      if (isEmpty(data)) {
        navigate("/login");
      }
    };
    fetchUserData();
  }, []);

  const getEmailAvatarColor = (email) => {
    if (!userEmail) {
      return null;
    }
    // Use the email to generate a hash (or any unique identifier)
    const hash = userEmail
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0, 1), 0);
    return `#${hash.toString(16).slice(0, 6)}`;
  };

  return (
    <div>
      {/* Retrieve and display the user details from local storage */}
      {localStorage.getItem("facilityUser") && (
        <div>
          {/* Display the user's avatar from local storage */}
          <Avatar
            style={{
              backgroundColor: JSON.parse(localStorage.getItem("facilityUser"))
                .avatarColor,
            }}
          >
            {userEmail.slice(0, 2).toUpperCase()}
          </Avatar>

          {/* Display the user's email */}
          <p> {userEmail}</p>
          <Link
            to="/logout"
            style={{ textDecoration: "none", color: "yellow" }}
          >
            LogOut
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
