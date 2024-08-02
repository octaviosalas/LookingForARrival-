import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './components/Welcome';
import { ToastContainer } from 'react-toastify';
import Main from './components/Main';
import NavBarComponent from './components/Navbar';
import MyTeams from './components/MyTeams';

function App() {


 const location = useLocation();



  return (
    <>
         <div className='h-screen w-screen'>
        {location.pathname !== '/' && <NavBarComponent />}
        <Routes>       
          <Route path="/" element={<Welcome />} />   
          <Route path="/main" element={<Main/>}/>
          <Route path="/myTeams" element={<MyTeams/>}/>
        </Routes>
        <ToastContainer /> 
      </div>
    </>
  )
}

export default App
