import React,{ useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import alluser_css from './Profile.module.css';

const AllUserProfile = () => {
    const [pro_pic, setpro_pic] = useState(null);
    const storedUserDetails = localStorage.getItem('facilityUser');
    const storedUser = JSON.parse(storedUserDetails);
    const userType = JSON.parse(storedUserDetails).userDetails.userType;
    // const firstName=JSON.parse(storedUserDetails).userDetails.firstName;
    // const lastName=JSON.parse(storedUserDetails).userDetails.lastName;

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = function (event) {
                setpro_pic(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    useEffect(() => {

        if (storedUser) {
            const avatarColor = getEmailAvatarColor(storedUser.userDetails.email);
            localStorage.setItem('facilityUser', JSON.stringify({ ...storedUser, avatarColor }));
        }
    }, []);

    const getEmailAvatarColor = (email) => {
        if (!email) {
            return null;
        }
        // Use the email to generate a hash (or any unique identifier)
        const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0, 1), 0);
        return `#${hash.toString(16).slice(0, 6)}`;
    };

    const handleAvatarClick = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div>
            {/* Retrieve and display the user details from local storage */}
            {storedUserDetails && (
                <div className={alluser_css.avatar_container}>
                    {pro_pic ? (
                        <img src={pro_pic} 
                            alt="" 
                            style={{ 
                                width: '120px', 
                                height:'120px',
                                borderRadius:'50%',
                                marginLeft: '100px' ,}}/>
                    ) : (
                    <Avatar 
                        onClick={handleAvatarClick}
                        src={pro_pic}
                        style={{backgroundColor: JSON.parse(storedUserDetails).avatarColor ,
                                width:'120px',
                                height:'120px',
                                fontSize:'35px',
                                marginLeft: '100px'}}>
                        {storedUser.userDetails.email.slice(0, 2).toUpperCase()}
                        <br></br>
                    </Avatar>
                    
                    )}
                    <input 
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: 'none' }} />
                    
                    {pro_pic && (
                    <label classname={alluser_css.avatar_label} htmlFor="fileInput">Update Image</label>
                    )}
                </div>
            )}


            {/* Display the user's details */}
            <br></br>
            <br></br>
            <div className={alluser_css.user_Details}>
               {userType === 'admin' && (
                    <div>
                        <p>E-mail : {storedUser.userDetails.email}</p>
                        <p>Name : {storedUser.userDetails.firstName} {storedUser.userDetails.lastName}</p>
                    </div>                       
                )}

                {userType === 'university' && (
                    <div>
                        <p>E-mail : {storedUser.userDetails.email}</p>
                        <p>Name : {storedUser.userDetails.firstName} {storedUser.userDetails.lastName}</p>
                        <p>University ID : {storedUser.userDetails.universityID}</p>
                        <p>University E-mail : {storedUser.userDetails.universityEmail}</p>
                    </div>
                )}

                {userType === 'Guest' && (
                    <div>
                        <p>E-mail : {storedUser.userDetails.email}</p>
                        <p>Name : {storedUser.userDetails.firstName} {storedUser.userDetails.lastName}</p>
                    </div> 
                )}
            </div>
        </div>
    );
}

export default AllUserProfile;
