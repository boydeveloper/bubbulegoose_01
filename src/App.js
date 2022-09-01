import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';
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
import useLocalStorage from 'use-local-storage';

function App() {
  const [preloader, setPreloader] = useState(false);
  const defaultDark = window.matchMedia('(prefers-color-scheme: Dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'Dark' : 'light'
  );
  const swithTheme = () => {
    const newTheme = theme === 'light' ? 'Dark' : 'light';

    setTheme(newTheme);
  };

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
            <Navbar swithTheme={swithTheme} theme={theme} />
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
      </div>
    </>
  );
}

export default App;
