import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../../utils/OAuth';
import heroimage from '../../img/heroimage.png';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate('/adding');
      }
    } catch (error) {
      toast.error('wrong Credentials');
    }
  };
  return (
    <>
      <div className="container">
        <div className="login-form">
          <form onSubmit={onSubmit} className="form">
            <div className="move-center">
              <h1>Login</h1>
              <p>Enter the following details to login</p>
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
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
            </div>
            <button className="login-btn">Login</button>
            <OAuth />
            <span className="precaution-text"> Don't have an account?</span>
            <Link to="/sign-up" className="signup-link">
              Sign-Up
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

export default SignIn;
