import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import ListingItem from '../components/Listingitem';

import useGetData from '../hooks/useGetData';
import { FaSignOutAlt, FaPen } from 'react-icons/fa';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
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
            <div className="profile-btns">
              <button className="logout" type="button" onClick={onLogout}>
                <span className="flex">
                  Logout <FaSignOutAlt />
                </span>
              </button>
              <button
                className="logout"
                type="button"
                onClick={(e) => navigate('/profileSettings')}
              >
                <span className="flex">
                  UpdateProfile
                  <FaPen />
                </span>
              </button>
            </div>
          </div>
        </div>
        <main>
          <div className="profileDetailsHeader flex">
            <p className="profileDetailsText">Personal Details</p>
          </div>
          <div className="profileCard">
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
          </div>
        </main>
        <div className="section">
          {loading ? (
            <div className="error">
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
