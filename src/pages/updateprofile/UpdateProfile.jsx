import './updateprofile.css';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import useGetData from '../../hooks/useGetData';

function UpdateProfile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const { cards } = useGetData();
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
            navigate('/myProfile');
          });
        }
      });
    } catch (error) {
      toast.error('Could not update');
    }
  };
  return (
    <div className="container updateProfile">
      <div className="section-mirrors">
        <Link to="/myProfile" className="backLink">
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
                onChange={(e) => setName(e.target.value)}
                required
              />

              <button className="updateBtn" type="submit">
                Update Discord
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default UpdateProfile;
