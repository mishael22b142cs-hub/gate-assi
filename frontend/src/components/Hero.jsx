import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/hero-image.jpg')" }}>
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Ace Your GATE Exam with Expert Guidance
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Access curated quizzes, track your progress, and get personalized feedback from professors.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/quizzes" // Link to quizzes page (you can create this later)
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Explore Quizzes
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;