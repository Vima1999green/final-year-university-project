import { Link } from 'react-router-dom';
import profile_css from './Profile.module.css';
import React,{ useState } from 'react';
import AllUserProfile from '../UserProfile/AllUserProfile';
import BookingCard from './UserBookingDetails';
import TopNav from "../TopNav/TopNav";
        
const Profile = () => {

    return (
       
        <div className={profile_css.im_bg}>
            <TopNav />
            <div className='profile_img text-left p-4'>
                <div className="flex flex-column justify-content-left align-items-left">
                    <div className={profile_css.userProfileContainer}>
                        <AllUserProfile />
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                        <BookingCard/>
                    </div>
                </div>
            </div>
        </div>     
    );
}

export default Profile;