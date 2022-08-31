import { useState } from 'react';
import { getAuth, updateCurrentUser, updateProfile } from 'firebase/auth';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import ListingItem from '../components/Listingitem';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import useGetData from '../hooks/useGetData';
import Spinner from '../components/Spinner';

function EditProfille() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const { cards, loading } = useGetData();

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        })
          .then((res) => {
            toast.success('updated!');
          })
          .then(() => {
            navigate('/profile');
          });
      }
      cards.forEach(async (card) => {
        if (auth.currentUser.email === card.email) {
          await updateProfile(auth.currentUser, {
            discordId: name,
          });
          const colref = doc(db, 'cards', card.id);
          await updateDoc(colref, {
            discordId: name,
          }).then(() => {
            toast.success('updated!');
            navigate('/profile');
          });
        }
      });
    } catch (error) {
      toast.error('Could not update');
    }
  };
  return (
    <div className="container">
      <div className="section-mirrors">
        <Link to="/profile" className="backLink">
          &larr;back
        </Link>
        <aside>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
          </div>
          <div className="profileCard">
            <form className="form" onSubmit={onSubmit}>
              <label>New DiscordID</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={onChange}
                required
              />

              <button className="changePersonalDetails" type="submit">
                Update Discord
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EditProfille;
