import website from '../../Images/website1.png';
import email from '../../Images/email.png';
import facebook from '../../Images/facebook.png';
import address from '../../Images/address.png';
import footer_css from "./footer.module.css";
const Footer = () => {

    return (
        <>
            <div className={footer_css.footer}>

                <img src={email} alt='email'></img><a href='mailto:physicaleducation81000@gmail.com?subject=Subject&body=Message Content'>physicaleducation81000@gmail.com</a><br></br>
                <img src={facebook} alt='facebook'></img><a href='https://www.facebook.com/profile.php?id=100075382467582'>Physical Education Unit UOR</a><br></br>
                <img src={website} alt='website'></img><a href='https://adm.ruh.ac.lk/physicaledu/'>https://adm.ruh.ac.lk/physicaledu/</a><br></br>
                <img src={address} alt='address'></img><a href='https://maps.app.goo.gl/zFGSnrS91KE8QSGF8'>University of Ruhuna, Matara, Sri Lanka, 81000</a>

            </div>

        </>
    )
}

export default Footer;