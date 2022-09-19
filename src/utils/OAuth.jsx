import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { FaGoogle } from 'react-icons/fa';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

import { toast } from 'react-toastify';

function OAuth() {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate('/Adding');
    } catch (error) {
      toast.error('could not authorize with google');
    }
  };
  return (
    <div>
      <div className="socialLogin" onClick={onGoogleClick}>
        <FaGoogle color="#ff77f7" fontSize="40px" />
        Google
      </div>
    </div>
  );
}

export default OAuth;
