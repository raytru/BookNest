import { useState } from 'react';
import { supabase } from '../../../supabaseClient.js';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/forms.css';

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    if (!newPassword) {
        setMessage("Password cannot be empty.");
        setLoading(false);
        return;
    }

    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    })

    setLoading(false);

    if (data) {
        setMessage('Password updated successfully');
        navigate('/LoginPage');
    } else {
        setMessage(error.message || 'There was an error updating your password.');
    }
  }
    

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">BookNest</h1>
        <form className="form-widget" onSubmit={handlePasswordUpdate}>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Your email"
              value={newPassword}
              required={true}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Update password</span>}
            </button>
          </div>
          <div className='form-footer'>
            <Link to="/LoginPage" className="unstyled-link">Already have an account?</Link>
            <Link to="/RegisterPage" className="unstyled-link">Don&apos;t have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}