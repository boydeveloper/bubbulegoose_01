import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Switchin from './Switch';
function Navbar({ swithTheme, theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openNav, setOpenav] = useState(false);
  const handleNavClose = () => {
    setOpenav(false);
  };
  useEffect(() => {
    handleNavClose();
  }, [location]);
  return (
    <div className="head">
      <header className={openNav ? 'header nav-open' : 'header'}>
        <div className="container">
          <nav className="nav">
            <div className="nav-brand" onClick={() => navigate('/')}>
              BubbleGoose 💎
            </div>

            <ul className="nav-links">
              <div onClick={swithTheme}>
                <Switchin />
              </div>

              <li className="nav-link margin">
                <Link to="/gallery" className="nav-item">
                  Ballers mirror
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/myProfile" className="nav-item">
                  Profile
                </Link>
              </li>
            </ul>
            <button
              className="menu-btn"
              onClick={() => setOpenav((prev) => !prev)}
            >
              <FaBars className="bar-btn" />
              <FaTimes className="close-btn" />
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
