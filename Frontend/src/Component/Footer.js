import website from '../Images/website1.png';
import email from '../Images/email.png';
import facebook from '../Images/facebook.png';
import address from '../Images/address.png';
const Footer = () =>{
    return(
        <div className="footer">
            <img src={email}></img><a href='physicaleducation81000@gmail.com'>physicaleducation81000@gmail.com</a><br></br>
            <img src={facebook}></img><a href='https://www.facebook.com/profile.php?id=100075382467582'>Physical Education Unit UOR</a><br></br>
            <img src={website}></img><a href='https://adm.ruh.ac.lk/physicaledu/'>https://adm.ruh.ac.lk/physicaledu/</a><br></br>
            <img src={address}></img><a href=''>University of Ruhuna, Matara, Sri Lanka, 81000</a>
            
        </div>
    )
}

export default Footer;