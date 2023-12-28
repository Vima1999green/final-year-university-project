import home1 from '../Images/home1.png';


const Home = () => {

    return ( 
        <><div className="home">
            <tr>
                <td width='75%'>
                        <img src={home1}></img>
                    
                        <h1>Welcome<br></br>
                            to<br></br>
                            the<br></br>
                            PlayGround and Gym Facility Scheduler</h1>
                    
                </td>
                <td width='25%' id='events'>

                        <h3>Up coming Events</h3>
                    
                </td>
            </tr>
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
        <div>
            <tr>
                <td>
                    <div className='img1'>
                        hhgg
                    </div>
                </td>
                <td>
                    <div className='img2'>
                        hhgg
                    </div>
                </td>
            </tr>
        </div>
        <div className='map'>

        </div></>
     );
}
 
export default Home;