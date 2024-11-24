import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../../supabaseClient.js"; // Importing the Supabase client to handle authentication
import { Link } from "react-router-dom"; // Importing Link for routing to other pages
import "../../styles/forms.css"; // Importing the form styles

export default function Auth() {
  // useState hooks to manage the component's state for loading, email, and password
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // Store email input value
  const [password, setPassword] = useState(""); // Store password input value

  /**
   * handleLogin function is triggered when the user submits the login form.
   * It sends the email and password to Supabase for authentication.
   * @param {Event} event - The form submit event
   */
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page refresh on form submit

    setLoading(true); // Set loading state to true to disable button during authentication
    // Call Supabase auth to sign in with email and password
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // If there's an error, show an alert
    if (error) {
      toast.error(error.error_description || error.message);
    } else {
      toast.success("Login successful!"); // Show success message
    }
    setLoading(false); // Set loading state back to false after operation
  };

  return (
    <div className="bg-gray-200 flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
  {/* Card container */}
  <div className="bg-white rounded-lg shadow-lg max-w-md w-3/4 p-10">
    {/* Heading */}
    <h1 className="mb-9 text-3xl font-semibold">Login</h1>
    
    {/* Login form */}
    <form className="space-y-6" onSubmit={handleLogin}>
      {/* Email input */}
      <div className="flex flex-col items-start">
        <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
      </div>

      {/* Password input */}
      <div className="flex flex-col items-start">
        <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        {/* Forgot password link */}
        <div className="flex justify-end w-full mt-1">
        <Link to="/ForgotPassword" className="text-blue-500 text-sm hover:underline mt-1">
          Forgot your password?
        </Link>
        </div>
      </div>

      {/* Login button */}
      <button
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
        disabled={loading}
      >
        {loading ? "Loading..." : "Log in"}
      </button>
    </form>

    {/* Footer with register link */}
    <div className="mt-6 flex items-center justify-center">
      <p className="mr-1.5 text-sm">Don&apos;t have an account?</p>
      <Link to="/Register" className="text-blue-500 text-sm hover:underline">
        Sign up
      </Link>
    </div>
  </div>
</div>
  );
}
