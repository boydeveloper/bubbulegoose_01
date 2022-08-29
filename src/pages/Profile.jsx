import { useState } from 'react';
import { getAuth, updateCurrentUser, updateProfile } from 'firebase/auth';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc, documentId, setDoc } from 'firebase/firestore';
import ListingItem from '../components/Listingitem';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import useGetData from '../hooks/useGetData';
import { FaSignOutAlt } from 'react-icons/fa';
import { async } from '@firebase/util';
import Spinner from '../components/Spinner';
function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
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

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });

        toast.success('updated!');
        cards.filter((card) => card.discordId === name);
      }
      cards.forEach(async (card) => {
        if (auth.currentUser.email === card.email) {
          await updateProfile(auth.currentUser, {
            discordId: name,
          });
          const colref = doc(db, 'cards', card.id);
          await updateDoc(colref, {
            discordId: name,
          });
        }
      });
    } catch (error) {
      toast.error('Could not update');
    }
  };

  return (
    <>
      <div className="container">
        <div className="profile">
          <div className="profileHeader">
            <p className="pageHeader">Baller Profile</p>
            <button className="logout" type="button" onClick={onLogout}>
              Logout <FaSignOutAlt />
            </button>
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
                disabled={!changeDetails}
                onChange={onChange}
              />
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                disabled={!changeDetails}
                onChange={onChange}
              />
            </form>
            <button
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? 'Done' : 'Update'}
            </button>
          </div>
        </main>
        <div className="section">
          {loading ? (
            <>
              <p className="section-subtext">Baller arts</p>
              <div className="error">
                <h1>Loading....</h1>
              </div>
            </>
          ) : cards && cards.length > 0 ? (
            <div className="grid--3--cols" id="image-container">
              <ListingItem
                cards={cards.filter((card) => card.discordId === name)}
              />
            </div>
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
