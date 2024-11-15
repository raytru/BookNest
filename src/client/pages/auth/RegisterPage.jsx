import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ToastConfig from "../../components/ToastConfig.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../../../supabaseClient.js';
import { Link } from 'react-router-dom';
import '../../styles/forms.css';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const checkPasswordMatch = () => {
    setPasswordMatch(password === confirmPassword);
  }

  
  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!passwordMatch) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ 
      email, 
      username, 
      password
    })

    setLoading(false);

    if (error) {
      toast.error(error.error_description || error.message);
    } else {
      toast.success('Check your email for the verification link!');
      
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">BookNest</h1>
        <form className="form-widget" onSubmit={handleSignUp}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Email address"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="Username"
              placeholder="Username"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="Password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="Password"
              placeholder="Confirm password"
              value={confirmPassword}
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={checkPasswordMatch} // Check password match when the user leaves the confirm password field
            />
          </div>
        
          <div>
            <button className={'button block'} disabled={loading || !passwordMatch}>
              {loading ? <span>Loading</span> : <span>Register</span>}
            </button>
          </div>
          
           {/* Include the ToastConfig component */}
          <ToastConfig />
          <div className='form-footer'>
            <Link to="/LoginPage" className='unstyled-link'>Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}