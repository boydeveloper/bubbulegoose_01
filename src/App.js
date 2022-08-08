import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BarLoader from 'react-spinners/ClimbingBoxLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Adding from './pages/Adding';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import Card from './pages/Card';

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
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/card/:id" element={<Card />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>

          <ToastContainer className="Toast" />
        </Router>
      )}
    </>
  );
}

export default App;
