import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Spinner from '../components/Spinner';

import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

import { uuidv4 } from '@firebase/util';

function Adding() {
  const [discordId, setDiscordId] = useState('');
  const [handle, setHandle] = useState('');
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const storage = getStorage();

  if (loading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `images/${image.name}--${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (progress <= 99) {
          setLoading(true);
        }
        if (progress === 100) {
          setLoading(false);
          navigate('/gallery');

          toast.success('art was uploaded');
        }
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;


          case 'storage/unknown':
     
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          console.log('File available at', downloadURL);
        });
      }
    );

    const formData = { discordId, handle, image, timestamp: serverTimestamp() };
    const docRef = collection(db, 'cards');
    addDoc(docRef, formData);
  };

  return (
    <>
      <section className="add-section">
        <div className="container Addart-box">
          <div className="text-center">
            <h1 className="add-heading">ADD FAN ART 💎</h1>
            <p className="add-subtext">Take a look at the mirror</p>
          </div>
          <form onSubmit={onSubmit} className="form-add">
            <div className="details">
              <label>Discord id </label>
              <input
                className="input-add"
                type="text"
                name="discord"
                id="name"
                value={discordId}
                onChange={(e) => setDiscordId(e.target.value)}
                placeholder="weirdstoner.eth"
                required
              />

              <label>Twitter handle</label>
              <input
                className="input-add"
                type="text"
                name="twitter"
                id="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="weirdstoner_eth"
                required
              />
            </div>
            <div className="file">
              <label>Art piece</label>
              <input
                type="file"
                id="file"
                name="htmlFileUpload"
                className="input-add"
                onChange={(e) => setImage(e.target.files[0])}
                required
                max="1"
                accept=".jpg, .jpeg, .png"
              />
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
