import '../styles/App.css';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import RequestPasswordReset from '../pages/auth/RequestPasswordReset.jsx';
//import UpdatePassword from '../pages/auth/UpdatePassword.jsx';
import Account from '../pages/auth/Account.jsx';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginPage" element={!session ? <LoginPage /> : <Navigate to="/Account" />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/RequestPasswordReset" element={<RequestPasswordReset />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
          <Route path="/Account" element={session ? <Account session={session} /> : <Navigate to="/LoginPage" />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
