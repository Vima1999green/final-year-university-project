import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Footer from './Component/Footer';


function App() {
  return (
    <><div className="App">
    <Navbar></Navbar>
  </div><div className="content">
      <Home></Home>
    </div><div className='footnote'>
      <Footer></Footer>
    </div></>  
  );
}

export default App;
