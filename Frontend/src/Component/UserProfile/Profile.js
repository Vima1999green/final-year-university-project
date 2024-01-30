// import { Link } from 'react-router-dom';
// import profile_css from './Profile.module.css';
// import React,{ useState } from 'react';
// import { Dialog } from 'primereact/dialog';      
// import { InputText } from 'primereact/inputtext';
// import { Avatar } from 'primereact/avatar';
// import { Badge } from 'primereact/badge';
// import UserProfile from '../NavBar/UserProfile';
  
        

// const Profile = () => {
//     const [pro_pic, setpro_pic] = useState(null);

//     return (
       
//         <div className={profile_css.im_bg}>
//             <div className={profile_css.topNav}>
//                 <nav>
//                     <ul className={profile_css.navLinks}>
//                         <li><Link to="/viewFacilities" style={{ textDecoration: "none", color: "white" }}>Facility</Link></li>
//                         <li><Link to="/service" style={{ textDecoration: "none", color: "white" }}>Service</Link>
//                             <ul className={profile_css.sublinks}>
//                                 <li>
//                                     <Link to="/booking" style={{ textDecoration: "none", color: "white" }}>Booking</Link>
//                                 </li>
//                                 <li>
//                                     <Link to="/membership" style={{ textDecoration: "none", color: "white" }}>Membership</Link>
//                                 </li>
//                             </ul>
//                         </li>
//                         <li><Link to="/profile" style={{ textDecoration: "none", color: "white" }}>Profile</Link></li>
//                         <li><Link to="/history" style={{ textDecoration: "none", color: "white" }}>History</Link></li>
//                         <li><Link to="/logout" style={{ textDecoration: "none", color: "white" }}>Logout</Link></li>
//                     </ul>
//                 </nav>
//             </div>

//             {/* <div>
//             <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle"
//   alt="Avatar" />
//             </div> */}

//             <div className='profile_img text-center p-4'>
//             <div className="flex flex-column justify-content-left align-items-left">
//                 {/* <img 
//                  style={{
//                     width:"200px",
//                     height:"200px",
//                     borderRadius:"50%",
//                     objectFit:"cover",
//                     border:"2px solid black"
//                 }}
//                  src={UserProfile}  
//               /> */}
               
//                 <div className={profile_css.userProfileContainer}>
//                     <UserProfile />
//                 </div>
           
//                 <input type="file" 
//                 accept='/image/*'
//                 onChange={(event) => {
//                     const file = event.target.files[0];
//                     if(file && file.type.substring(0,5)==="image"){
//                         setpro_pic(file);
//                     }else{
//                         setpro_pic(null)
//                     }
                   
//                 }}
//                 /> 
//             </div>
//             </div>
//         </div>
            
//     );
// }

// export default Profile;