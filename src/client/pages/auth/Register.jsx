import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient.js";
import { Link } from "react-router-dom";
import "../../styles/forms.css";
import { usePasswordMatch } from "../../hooks/usePasswordMatch.js";
import { usePasswordValidation } from "../../hooks/usePasswordValidation.js";
import { useUsernameValidation } from "../../hooks/useUsernameValidation.js";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);

 
  // Validate username length and check for special characters
  const { usernameError, isValid: isUsernameValid } = useUsernameValidation(username, usernameTouched);

  // Validate password length and special character/number requirement
  const { passwordError, isValid: isPasswordValid } = usePasswordValidation(password, passwordTouched);

  // Automatically check password match when the values change
  const { passwordMatch, isValid: isPasswordMatch } = usePasswordMatch(password, confirmPassword);

  const formIsValid = isUsernameValid && isPasswordValid && isPasswordMatch;

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formIsValid) {
      toast.error("Please fix the errors before submitting.");
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
      console.log("Success!");  // Log success
      toast.success("Check your email for the verification link!");
    }
  };

  return (
  <div className="bg-gray-200 flex min-h-screen flex-col justify-center items-center px-6 py-5 lg:px-8">
  {/* Card container */}
  <div className="bg-white rounded-lg shadow-lg max-w-md w-3/4 p-10">
    {/* Heading */}
    <h1 className="mb-9 text-3xl font-semibold">Sign up</h1>
    
    {/* Registration form */}
    <form className="space-y-6" onSubmit={handleSignUp}>

      {/* Username input */}
      <div className="flex flex-col items-start">
        <label className="block text-gray-700 text-sm font-semibold mb-1">Username</label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={username}
          required
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameTouched(true);
          }}
        />
        {usernameTouched && usernameError && (
          <p className="text-red-500 text-sm">{usernameError}</p>
        )}
      </div>
      
      {/* Email input */}
      <div className="flex flex-col items-start">
        <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password input */}
      <div className="flex flex-col items-start">
        <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          value={password}
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordTouched(true);
          }}
        />
        {passwordTouched && passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
      </div>

      {/* Password confirmation input */}
      <div className="flex flex-col items-start">
        <label className="block text-gray-700 text-sm font-semibold mb-1">Confirm Password</label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!passwordMatch && confirmPassword && (
          <p className="text-red-500 text-sm">Passwords do not match.</p>
        )}
      </div>

      {/* Register button */}
      <button
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
        disabled={loading || !formIsValid}
      >
        {loading ? "Loading..." : "Register"}
      </button>

      {/* Footer with login link */}
      <div className="mt-6 flex items-center justify-center">
        <p className="mr-1.5 text-sm">Already have an account?</p>
        <Link to="/Login" className="text-blue-500 text-sm hover:underline">
          Log in
        </Link>
      </div>
    </form>
  </div>
</div>

  );
}
