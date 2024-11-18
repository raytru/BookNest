import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient.js";
import { Link } from "react-router-dom";
import "../../styles/forms.css";
import { usePasswordMatch } from "../../hooks/usePasswordMatch.js";
import { usePasswordValidation } from "../../hooks/usePasswordValidation.js";
import { useUsernameValidation } from "../../hooks/useUsernameValidation.js";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsenameTouched] = useState(false);

  // Automatically check password match when the values change
  const passwordMatch = usePasswordMatch(password, confirmPassword);

  // Validate username length and check for special characters
  const usernameError = useUsernameValidation(username, usernameTouched);

  // Validate password length and special character/number requirement
  const passwordError = usePasswordValidation(password, passwordTouched);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!passwordMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.error_description || error.message);
    } else {
      toast.success("Check your email for the verification link!");
    }
  };

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
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => {
                setUsername(e.target.value);
                setUsenameTouched(true);
              }}
            />
            {usernameTouched && usernameError && (
              <p className="form-inline-error-message">{usernameError}</p>
            )}
          </div>
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
              <p className="form-inline-error-message ">
                Passwords do not match.
              </p>
            )}
          </div>
          <div>
            <button
              className="button block"
              disabled={loading || !passwordMatch || passwordError}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
          <div className="form-footer">
            <Link to="/LoginPage" className="unstyled-link">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
