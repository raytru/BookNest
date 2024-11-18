import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import '../styles/HomePage.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function HomePage() {
  

    return (
        <div className='homepage'>
            <section className='hero'> 
                <h1>Welcome to BookNest</h1>
                <p>Your cozy haven for all things books. Organize, track, and nurture your reading journey—one book at a time.</p>
            </section>
            <button type="button">Sign up</button>
            <button type="button">Sign in</button>
        </div>
    
    );
}

