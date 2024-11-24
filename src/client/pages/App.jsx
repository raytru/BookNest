// 1. Core Libraries
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Assuming this is from a library or external file
import '../styles/App.css';  

import ToastConfig from "../components/ToastConfig.jsx";
import Home from './Home.jsx';
import Login from './auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import ForgotPassword from './auth/ForgotPassword.jsx';
import Account from '../pages/user/Account.jsx';
import UpdatePassword from './auth/UpdatePassword.jsx';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state to manage loading screen

  useEffect(() => {
    // Check session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session:', session);
      setSession(session);
      setLoading(false); // Stop loading once session is checked
    });

    // Listen for auth state changes and update session
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session);
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>; // Show a loading screen while checking session

  return (
    <Router>
      <ToastConfig />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!session ? <Login /> : <Navigate to="/account" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route path="/account" element={session ? <Account session={session} /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
