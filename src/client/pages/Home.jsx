import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="homepage">
            {/* Navbar */}
            <nav className="bg-blue-600 p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h2 className="text-white text-2xl font-semibold">BookNest</h2>
                    <div className="space-x-6">
                        <button className="text-white">Home</button>
                        <button className="text-white">Books</button>
                        <button className="text-white">About</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to BookNest</h1>
                    <p className="text-xl mb-8">Your cozy haven for all things books. Organize, track, and nurture your reading journey—one book at a time.</p>
                    <div className="space-x-4">
                        <button className="bg-white text-blue-600 py-2 px-6 rounded-full">Sign Up</button>
                        <button className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-full">Sign In</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
