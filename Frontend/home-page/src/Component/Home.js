//import home from '../Images/home.png';
import sport1 from '../Images/sports1.jpg';
import sport2 from '../Images/sports2.jpg';
import sport3 from '../Images/sports3.jpg';
import sport4 from '../Images/sports4.jpg';
import sport5 from '../Images/sports5.jpg';
import sport6 from '../Images/sports6.jpg';

//import { useWindowSize } from 'react-use';


const Home = () => {
    
    const imageStyle = {
        width: '100%',
        height: '100%',
        maxWidth:'300px',
        maxHeight: '200px', // Optional: Limit image width if needed
      };
   
    
    return ( 
        <>
            <div className="content">
            
            <div className="home">
            <table>
            <tr>
                <td style={{ width: '75%' }}>
                    
                        {/* <img src={home1} alt='home background' ></img> */}
                        
                        <p>Welcome<br></br>
                            to<br></br>
                            the<br></br>
                            PlayGround and Gym Facility Scheduler</p>
                    
                </td>
                <div className='events'>
                    <td style={{ width: '25%' }}>

                        <h3>Up coming Events</h3>
                            <div>
                            <img src={sport1} alt='upcoming_event_pic' style={imageStyle}></img>
                            </div>
                    </td>
                </div>
            </tr>
            </table>
        </div>

        <br></br>
        <br></br> 

        <div className='about'>
            <h1>About</h1>
            <br></br>
            <br></br>
            <p>Faculty of Science is one of the pioneering faculties at the 
                University of Ruhuna, which was founded in 1978 and has made 
                an immense contribution for the country’s tertiary education 
                throughout the last 44 years. The Faculty of Science offers 
                learning and research opportunities for undergraduate and 
                postgraduate students in the fields of Biological Science, 
                Physical Science and Computer Science.</p>
        </div>
        <br></br>
        <br></br>
        
        <div className='images'>
            <center>
            <tr>
                <td>
                    <div className='img1'>
                        <img src={sport1} alt='sport_pic_1'style={imageStyle}
                         ></img>
                    </div>
                </td>
                <td>
                    <div className='img2'>
                    <img src={sport2} alt='sport_pic_2'
                    style={imageStyle} 
                    ></img>
                    </div>
                </td>
                <td>
                    <div className='img3'>
                    <img src={sport3} alt='sport_pic_3'
                    style={imageStyle} 
                    ></img>
                    </div>
                </td>
            </tr>
            <br></br>
            <br></br>
            <tr>
                <td>
                    <div className='img4'>
                    <img src={sport4} alt='sport_pic_4'
                    style={imageStyle} 
                    ></img>
                    </div>
                </td>
                <td>
                    <div className='img5'>
                    <img src={sport5} alt='sport_pic_5'
                    style={imageStyle}
                     ></img>
                    </div>
                </td>
                <td>
                    <div className='img6'>
                    <img src={sport6} alt='sport_pic_6'
                    style={imageStyle} 
                    ></img>
                    </div>
                </td>
            </tr>
            </center>
        
        </div>
        <br></br>
        <br></br>
        <div className='map'>
            <center>
            <p><iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3679.398934615926!2d80.57359697919456!3d5.938110746027745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1suniversity%20of%20ruhuna%20gymnasium%20and%20play%20ground!5e0!3m2!1sen!2slk!4v1703666049154!5m2!1sen!2slk"
             width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='locaton of the playground and gym'></iframe></p>
             </center>
        </div>

        </div></>
     );
}


export default Home;