//import home from '../../Images/home.png';
import sport1 from '../../Images/sports1.jpg';
import sport2 from '../../Images/sports2.jpg';
import sport3 from '../../Images/sports3.jpg';
import sport4 from '../../Images/sports4.jpg';
import sport5 from '../../Images/sports5.jpg';
import sport6 from '../../Images/sports6.jpg';
import home_css from "./home.module.css";
import { useState, useEffect } from 'react';

//import { useWindowSize } from 'react-use';


const Home = () => {

    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [eventImages, setEventImages] = useState([sport1, sport2, sport3]);
    const [eventDescriptions, setEventDescriptions] = useState([
        'Inter University Athletics',
        'Intra Faculty Swimming',
        'Inter Faculty Weightlifting',
    ]);
    useEffect(() => {
        const eventIntervalId = setInterval(() => {
            setCurrentEventIndex((prevIndex) => (prevIndex + 1) % eventImages.length);
        }, 5000);

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(eventIntervalId);
        };
    }, [eventImages]);


    return (
        <>
            <div className={home_css.content}>
                <div className={home_css.bg_img}>
                    <div className={home_css.home}>
                        <table>
                            <tr>
                                <td style={{ width: '75%' }} >
                                    <p className={home_css.p}>Welcome!!!<br></br></p>

                                </td>
                                <td style={{ width: '25%' }}>
                                    <div className={home_css.events}>
                                        <h3>Up coming Events</h3>

                                        {/* <img src={sport1} alt='upcoming_event_pic' ></img> */}
                                        <img src={eventImages[currentEventIndex]} alt='upcoming_event_pic'></img>
                                        <h5>{eventDescriptions[currentEventIndex]}</h5>

                                    </div>
                                </td>

                            </tr>
                        </table>
                    </div>

                    <br></br>
                    <br></br>

                    <div className={home_css.images}>
                        <center>
                            <tr>
                                <td>
                                    <div className={home_css.img1}>
                                        <img src={sport1} alt='sport_pic_1'
                                        //style={imageStyle}
                                        ></img>
                                    </div>
                                </td>
                                <td>
                                    <div className={home_css.img2}>
                                        <img src={sport2} alt='sport_pic_2'
                                        //style={imageStyle} 
                                        ></img>
                                    </div>
                                </td>
                                <td>
                                    <div className={home_css.img3}>
                                        <img src={sport3} alt='sport_pic_3'
                                        /// style={imageStyle} 
                                        ></img>
                                    </div>
                                </td>
                            </tr>
                            <br></br>
                            <br></br>
                            <tr>
                                <td>
                                    <div className={home_css.img4}>
                                        <img src={sport4} alt='sport_pic_4'
                                        //style={imageStyle} 
                                        ></img>
                                    </div>
                                </td>
                                <td>
                                    <div className={home_css.img5}>
                                        <img src={sport5} alt='sport_pic_5'
                                        //style={imageStyle}
                                        ></img>
                                    </div>
                                </td>
                                <td>
                                    <div className={home_css.img6}>
                                        <img src={sport6} alt='sport_pic_6'
                                        //style={imageStyle} 
                                        ></img>
                                    </div>
                                </td>
                            </tr>
                        </center>


                        <br></br>
                    </div>

                    <div className={home_css.about}>
                        <h1>About</h1>
                        <br></br>
                        <p>Welcome to our Sports Facility Scheduler,
                            where convenience meets excellence. Our platform simplifies
                            the process of reserving playgrounds and the gymnasium,
                            ensuring a seamless experience for users. Easily request bookings,
                            track the real-time status, and access the current schedule at your fingertips.
                            We prioritize transparency, enabling users to share proof of payment directly through the system.
                            <br></br>
                            <br></br>
                            Customer satisfaction is paramount, and in the rare event
                            of property damage during an activity, we promptly provide
                            customers with documented proof for transparency and resolution.
                            Our commitment lies in fostering a user-friendly environment that
                            empowers individuals to make the most of our state-of-the-art facilities.
                            <br></br>
                            <br></br>
                            Join us in creating memorable and hassle-free experiences
                            through our Sports Facility Scheduler.</p>
                    </div>
                    <br />
                    <br />

                    <br></br>
                    <br></br>


                    <div className={home_css.map}>
                        <center>
                            <p><iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3679.398934615926!2d80.57359697919456!3d5.938110746027745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1suniversity%20of%20ruhuna%20gymnasium%20and%20play%20ground!5e0!3m2!1sen!2slk!4v1703666049154!5m2!1sen!2slk"
                                width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='locaton of the Sports'></iframe></p>
                        </center>
                    </div>
                </div >
            </div >
        </>
    );
}


export default Home;