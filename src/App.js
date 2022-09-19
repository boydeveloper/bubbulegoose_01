import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDarkMode } from './context/ContextDarkmode';
import 'react-toastify/dist/ReactToastify.css';

import {
  Adding,
  UpdateProfile,
  Home,
  Profile,
  ViewProfile,
  SignUp,
  SignIn,
  Gallery,
  Turf,
} from './pages/index';

import PrivateRoute from './utils/PrivateRoute';
import { Navbar, Footer } from './components/index';
import Switchin from './components/switch/Switch';
import { useLayoutEffect } from 'react';

function App() {
  const { theme } = useDarkMode();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="App" theme={theme}>
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
            <Route path="/turf" element={<Turf />} />
            <Route path="/profileSettings" element={<UpdateProfile />} />
            <Route path="/profile/:id" element={<ViewProfile />} />
          </Routes>
          <div className="theme">
            <Switchin />
          </div>
          <Footer />
          <ToastContainer className="Toast" />
        </Router>
      </div>
    </>
  );
}

export default App;
