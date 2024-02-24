import axios from "axios";
const isEmpty = require("./isEmpty");

const getUserData = async () => {
  const facilityUser = JSON.parse(localStorage.getItem("facilityUser"));

  if (!facilityUser) {
    return "Unauthorized";
  }

  const bearerToken = facilityUser.token;

  if (isEmpty(bearerToken)) {
    return "Unauthorized";
  }
  //  const bearerToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzA3NTczNGQ0NjhiYmEyMmMyYzNlMiIsImVtYWlsIjoibGFoaXJ1cHJhc2FuZ2FzcmltYWxAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoibmltYWFsIiwidXNlclR5cGUiOiJHdWVzdCIsImlhdCI6MTcwNzk2OTc0NywiZXhwIjoxNzA3OTczMzQ3fQ.ozXTRlG9MMDsuXwrjRCGv7QDQ7b3AMK1ognSlsuhON8';

  const apiUrl = "http://localhost:4000/api/users/current";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: bearerToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fecthing user data", error);
    return error.response;
  }
};

// module.exports = getUserData;
export default getUserData;
