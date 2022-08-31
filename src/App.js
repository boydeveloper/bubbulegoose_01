import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BarLoader from 'react-spinners/ClimbingBoxLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Adding,
  Gallery,
  EditProfile,
  Home,
  Profile,
  ViewProfile,
  SignUp,
  SignIn,
} from './pages/index';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 4000);
  }, []);

  return (
    <>
      {preloader ? (
        <div className="preloader">
          <BarLoader color={'#fff'} width="200" height={10} size={40} />
        </div>
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/adding" element={<PrivateRoute />}>
              <Route path="/adding" element={<Adding />} />
            </Route>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/myProfile" element={<PrivateRoute />}>
              <Route path="/myProfile" element={<Profile />} />
            </Route>

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profileSettings" element={<EditProfile />} />
            <Route path="/profile/:id" element={<ViewProfile />} />
          </Routes>

          <ToastContainer className="Toast" />
        </Router>
      )}
    </>
  );
}

export default App;
