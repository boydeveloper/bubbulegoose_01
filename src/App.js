import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { ToastContainer } from 'react-toastify';
import { DarkmodeContext, useDarkMode } from './context/ContextDarkmode';
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
import Switchin from './components/switch/Switch';

function App() {
  const [preloader, setPreloader] = useState(false);
  const { theme } = useDarkMode();
  useEffect(() => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="App" theme={theme}>
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
            <div className="theme">
              <Switchin />
            </div>
            <ToastContainer className="Toast" />
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
