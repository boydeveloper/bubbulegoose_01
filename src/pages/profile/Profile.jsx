import './profile.css';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../../components/card/Card';
import useGetData from '../../hooks/useGetData';
import { FaSignOutAlt, FaPen } from 'react-icons/fa';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [display, setDisplay] = useState(false);
  const { name, email } = formData;

  const { cards, loading } = useGetData();
  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="profile">
          <div className="profileHeader">
            <p className="pageHeader">Baller's Profile</p>
            <div className="settings">
              <button
                className="settingsBtn"
                onClick={() => setDisplay(!display)}
              >
                <ion-icon name="settings-outline"></ion-icon>
              </button>
              <div
                className={
                  display ? ' settingsOverlay' : 'settingsOverlay none'
                }
              >
                <div className="profile-btns">
                  <button
                    className="profile-btn"
                    type="button"
                    onClick={onLogout}
                  >
                    <span className="flex">
                      Logout <FaSignOutAlt />
                    </span>
                  </button>
                  <button
                    className="profile-btn"
                    type="button"
                    onClick={() => navigate('/profileSettings')}
                  >
                    <span className="flex">
                      UpdateProfile
                      <FaPen />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main>
          <form className="form">
            <label>Discordid</label>
            <input
              id="name"
              type="text"
              value={name}
              disabled={true}
              onChange={onChange}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              value={email}
              disabled={true}
              onChange={onChange}
            />
          </form>
        </main>
        <div className="section">
          {loading ? (
            <div className="preloader">
              <h1>Loading....</h1>
            </div>
          ) : cards && cards.length > 0 ? (
            <>
              <p className="section-subtext">Baller arts</p>
              <div className="grid--3--cols" id="image-container">
                <ListingItem
                  cards={cards.filter((card) => card.discordId === name)}
                />
              </div>
            </>
          ) : (
            <div className="error">
              <h1>No art found</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
