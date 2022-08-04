import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update displayname
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
            <p className="pageHeader">My Profile</p>
            <button className="logout" type="button" onClick={onLogout}>
              Logout
            </button>
          </div>

          <main>
            <div className="profileDetailsHeader flex">
              <p className="profileDetailsText">Personal Details</p>
              <p
                className="changePersonalDetails"
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? 'Done' : 'Change'}
              </p>
            </div>
            <div className="profileCard">
              <form className="form">
                <input
                  id="name"
                  type="text"
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
                />

                <input
                  type="text"
                  id="email"
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
                />
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Profile;
