import './addArt.css';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import useGetData from '../../hooks/useGetData';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import Preloader from '../../utils/Preloader';
function AddArt() {
  const [image, setImage] = useState();

  const auth = getAuth();

  const [handle, setHandle] = useState('');

  const [discordId, setDiscordId] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState('');
  const storage = getStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  if (loading) {
    return <Preloader />;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setEmail(auth.currentUser.email);
    const storageRef = ref(storage, `${image.name}--${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const formData = {
              discordId,
              handle,
              email,
              image: downloadURL,
              timestamp: serverTimestamp(),
            };
            const docRef = collection(db, 'cards');
            return addDoc(docRef, formData);
            setLoading(true);
          })

          .then(() => {
            setLoading(false);
            navigate('/gallery');
          })
          .catch((err) => {
            console.log(`error`, err);
          });
      }
    );
  };
  return (
    <>
      <section className="add-section">
        <div className="Addart-box">
          <div className="text-center">
            <div className="add-heading">Add to the community💎</div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="add">
              <label htmlFor="discordId">Discordid</label>
              <input
                type="text"
                id="discordId"
                value={discordId}
                onChange={(e) => setDiscordId(discordId)}
                required
              />
            </div>
            <div className="add">
              <label htmlFor="discordId">Twitter</label>
              <input
                type="text"
                id="discordId"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
                placeholder="weirdstoner_eth"
              />
            </div>
            <div className="add">
              <label htmlFor="discordId">
                Add piece
                <input
                  type="file"
                  id="discordId"
                  required
                  className="formInputFile"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>

            <button type="submit" className="btn-upload">
              Upload art
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddArt;
