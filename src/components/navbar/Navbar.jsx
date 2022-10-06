import './navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
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
    <div className="Navigation">
      <header className={openNav ? 'header nav-open' : 'header'}>
        <div className="nav-brand" onClick={() => navigate('/')}>
          BubbleGoose 💎
        </div>

        <ul className="nav-links">
          <li className="nav-link">
            <Link to="/turf" className="nav-item">
              Turf
            </Link>
          </li>
          <li className="nav-link margin">
            <Link to="/gallery" className="nav-item">
              Mirror
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/myProfile" className="nav-item">
              Profile
            </Link>
          </li>
        </ul>
        <button className="menu-btn" onClick={() => setOpenav((prev) => !prev)}>
          <FaBars className="bar-btn" />
          <FaTimes className="close-btn" />
        </button>
      </header>
    </div>
  );
}

export default Navbar;
