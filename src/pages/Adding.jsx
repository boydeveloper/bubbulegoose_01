import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

function Adding() {
  const [discordId, setDiscordId] = useState('');
  const [handle, setHandle] = useState('');
  const [image, setImage] = useState();
  const storage = getStorage();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const formData = {
              discordId,
              handle,
              image: downloadURL,
              timestamp: serverTimestamp(),
            };

            const docRef = collection(db, 'cards');

            return addDoc(docRef, formData);
          })
          .then((res) => navigate('/gallery'))
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
            <div className="add-heading">ADD FAN ART💎</div>
          </div>

          <form onSubmit={onSubmit}>
            <div className="add">
              <label htmlFor="discordId">Discordid</label>
              <input
                type="text"
                id="discordId"
                value={discordId}
                onChange={(e) => setDiscordId(e.target.value)}
                required
                placeholder="Daniel456#7"
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
                placeholder="weirdstoner_45#"
              />
            </div>
            <div className="add">
              <label htmlFor="discordId">
                Add piece
                <input
                  type="file"
                  id="discordId"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>

            <button type="submit" className="btn-upload">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Adding;
