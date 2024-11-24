import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import "../../styles/forms.css";
import { usePasswordMatch } from "../../hooks/usePasswordMatch.js";
import { usePasswordValidation } from "../../hooks/usePasswordValidation.js";

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Validate password length and special character/number requirement
  const { passwordError, isValid: isPasswordValid } = usePasswordValidation(
    password,
    passwordTouched
  );

  // Automatically check password match when the values change
  const { passwordMatch, isValid: isPasswordMatch } = usePasswordMatch(
    password,
    confirmPassword
  );

  const formIsValid = isPasswordValid && isPasswordMatch;

  const navigate = useNavigate();

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!password) {
      toast.error("Password cannot be empty.");
      setLoading(false);
      return;
    }

    if (!formIsValid) {
      toast.error("Please fix the errors before submitting.");
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
        navigate("/Login");
      }, 2000); // 2 seconds delay
    } else {
      toast.error(
        error.message || "There was an error updating your password."
      );
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-3/4 p-11">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-8">BookNest</h1>

        {/* Password update form */}
        <form className="space-y-6" onSubmit={handlePasswordUpdate}>
          {/* Password input */}
          <div className="flex flex-col items-start">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              New Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Password confirmation input */}
          <div className="flex flex-col items-start">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="password"
              placeholder="Password confirmation"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordMatch && confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
          </div>

          {/* Submit button */}
          <div>
            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
