import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient.js";
import { Link } from "react-router-dom";
import "../../styles/forms.css";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/updatepassword",
    });

    setLoading(false);

    if (error) {
      toast.error(error.error_description || error.message);
    } else {
      toast.success(
        "Password reset link sent! Please check your email and follow the instructions to reset your password."
      );
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-3/4 p-12">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-8">Forgot password?</h1>

        {/* Password reset form */}
        <form className="space-y-6" onSubmit={handlePasswordReset}>
          <div className="flex flex-col items-start">
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset password"}
            </button>
          </div>

          {/* Footer with link */}
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
