import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient.js";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/forms.css";
import { usePasswordMatch } from '../../hooks/usePasswordMatch.js';
import { usePasswordValidation } from '../../hooks/usePasswordValidation.js';

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Automatically check password match when the values changeS
  const passwordMatch = usePasswordMatch(password, confirmPassword);

  // Validate password length and special character/number requirement
  const passwordError = usePasswordValidation(password, passwordTouched);

  const navigate = useNavigate();

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!password) {
      toast.error("Password cannot be empty.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (data) {
      toast.success("Password updated successfully");

      // Add a delay to allow the toast to show before redirecting
      setTimeout(() => {
        navigate("/LoginPage");
      }, 2000); // 2 seconds delay
    } else {
      toast.error(
        error.message || "There was an error updating your password."
      );
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">BookNest</h1>
        <form className="form-widget" onSubmit={handlePasswordUpdate}>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordTouched(true); // Set passwordTouched when user types
              }}
            />
            {passwordTouched && passwordError && (
              <p className="form-inline-error-message ">{passwordError}</p>
            )}
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Password confirmation"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordMatch && confirmPassword && (
              <p className="form-inline-error-message ">Passwords do not match.</p>
            )}
          </div>
          <div>
            <button className={"button block"} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Update password</span>}
            </button>
          </div>
          <div className="form-footer">
            <Link to="/LoginPage" className="unstyled-link">
              Already have an account?
            </Link>
            <Link to="/RegisterPage" className="unstyled-link">
              Don&apos;t have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
