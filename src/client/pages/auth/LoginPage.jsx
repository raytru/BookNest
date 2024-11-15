import { useState } from 'react';
import { supabase } from '../../../supabaseClient.js'; // Importing the Supabase client to handle authentication
import { Link } from 'react-router-dom'; // Importing Link for routing to other pages
import '../../styles/forms.css'; // Importing the form styles

export default function Auth() {
  // useState hooks to manage the component's state for loading, email, and password
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); // Store email input value
  const [password, setPassword] = useState(''); // Store password input value

  /**
   * handleLogin function is triggered when the user submits the login form.
   * It sends the email and password to Supabase for authentication.
   * @param {Event} event - The form submit event
   */
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit

    setLoading(true); // Set loading state to true to disable button during authentication
    // Call Supabase auth to sign in with email and password
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    // If there's an error, show an alert
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert('Login successful!'); // Show success message
    }
    setLoading(false); // Set loading state back to false after operation
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">BookNest</h1> {/* Page title */}
        <form className="form-widget" onSubmit={handleLogin}> {/* Login form */}
          {/* Email input field */}
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)} // Update email state when the input changes
            />
          </div>
          {/* Password input field */}
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)} // Update password state when the input changes
            />
          </div>
          {/* Login button */}
          <div>
            <button className={'button block'} disabled={loading}> {/* Disable button when loading */}
              {loading ? <span>Loading</span> : <span>Log in</span>} {/* Show loading text when authentication is in progress */}
            </button>
          </div>
          {/* Footer with links for forgotten password and account registration */}
          <div className='form-footer'>
            <Link to="/RegisterPage" className='unstyled-link'>Don&apos;t have an account?</Link> {/* Link to registration page */}
            <Link to="/RequestPasswordReset" className='unstyled-link'>Forgot your password?</Link> {/* Link to password reset page */}
          </div>
        </form>
      </div>
    </div>
  );
}
