import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import OAuth from '../components/OAuth';
import heroimage from '../img/heroimage.png';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const { email, password, confirmPassword, name } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('passwords do not Match ');
    }
    if (password.length <= 6) {
      toast.error('password should exceed 6 characters!');
    }
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      delete formDataCopy.confirmPassword;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/adding');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong with reg');
    }
  };
  return (
    <>
      <div className="container">
        <div className="sign-form">
          <form onSubmit={onSubmit} className="form">
            <div className="move-center">
              <h1>Sign Up</h1>
              <p>Enter the following details to signup</p>
            </div>
            <div className="form-box">
              <label>Discord id</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={onChange}
                placeholder="DiscordId"
              />
            </div>
            <div className="form-box">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={onChange}
                placeholder="Email"
              />
            </div>
            <div className="form-box">
              <label>passsword </label>
              <input
                type="password"
                name="passsword"
                id="password"
                placeholder="password"
                value={password}
                onChange={onChange}
              />
              <label>confirm Passsword </label>
              <input
                type="password"
                name="passsword"
                id="confirmPassword"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="login-btn">
              SignUp
            </button>

            <span className="precaution-text"> Have an account?</span>
            <Link to="/sign-in" className="signup-link">
              login
            </Link>
          </form>
          <div className="login-right">
            <div className="img-box">
              <img src={heroimage} alt="img" className="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
