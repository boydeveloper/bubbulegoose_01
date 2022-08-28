import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import ListingItem from '../components/Listingitem';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { FaSignOutAlt } from 'react-icons/fa';
function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);

  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  useEffect(() => {
    console.log('hi');
    const colref = collection(db, 'cards');
    getDocs(colref)
      .then((snapshot) => {
        let cards = [];
        snapshot.docs.forEach((doc) => {
          cards.push({ ...doc.data(), id: doc.id });
        });
        setCards(
          cards.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
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
      }
    } catch (error) {
      console.log(error);
      toast.error('Could not update');
    }
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
            <p className="pageHeader">Baller Profile</p>
            <button className="logout" type="button" onClick={onLogout}>
              Logout <FaSignOutAlt />
            </button>
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
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
                />
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  disabled={!changeDetails}
                  value={email}
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

          <p className="section-subtext">Baller arts</p>
          {cards?.length > 0 ? (
            <div className="grid--3--cols" id="image-container">
              <ListingItem cards={cards.filter((card) => card.name !== name)} />
            </div>
          ) : (
            <div className="error">
              <h1>Arts not Found</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
