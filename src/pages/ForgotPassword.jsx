import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log(email);
      toast.success('Email was sent');
    } catch (error) {
      toast.error('could not send reset email');
    }
  };

  return (
    <>
      <div className="container">
        <div className="pageContainer">
          <h1 className="pageHeader">Forgot Password</h1>

          <div className="main">
            <form onSubmit={onSubmit}>
              <input
                type="email"
                className="input-forgot form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
              />

              <div className="cta-btns">
                <Link className="ForgotPasswordbtn " to="/sign-in">
                  Sign In
                </Link>

                <button type="submit" className="signIntext">
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
