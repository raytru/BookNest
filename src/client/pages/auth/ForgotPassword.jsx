import { useState } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '../../../supabaseClient.js';
import { Link } from 'react-router-dom';
import '../../styles/forms.css';

export default function RequestPasswordReset() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handlePasswordReset = async (event) => {
    event.preventDefault();
 
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/UpdatePassword',
    })

    setLoading(false)

    if (error) {
      toast.error(error.error_description || error.message)
    } else {
      toast.success('Password reset link sent! Please check your email and follow the instructions to reset your password.')
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">BookNest</h1>
        <form className="form-widget" onSubmit={handlePasswordReset}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send Reset Link</span>}
            </button>
          </div>
          <div className='form-footer'>
            <Link to="/RegisterPage" className='unstyled-link'>Don&apos;t have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}