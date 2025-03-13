import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const isNewUser = true; // Assume the user is new
        if (isNewUser) {
            setShowProfileModal(true); // Show the profile completion modal
        } else {
            // Redirect to the dashboard or home page
        }
    };

    const handleProfileSubmit = (formData) => {
        console.log('Profile Data:', formData);
        setShowProfileModal(false);
        // Redirect to the dashboard or home page
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animated-gradient">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Login Form */}
                {isLogin ? (
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                        <div>
                            <label className="block text-gray-700 mb-2">Username:</label>
                            <input
                                type="text"
                                className="w-full minimal-input"
                                placeholder="Type your username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Password:</label>
                            <input
                                type="password"
                                className="w-full minimal-input"
                                placeholder="Type your password"
                                required
                            />
                        </div>
                        <div className="text-right">
                            <button type="button" className="text-blue-600 hover:underline">
                                Forgot password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            LOGIN
                        </button>
                        <div className="text-center text-gray-600">
                            <p className="mb-4">Or Sign In Using</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    type="button"
                                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-300"
                                >
                                    <FontAwesomeIcon icon={faGoogle} />
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
                                >
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300"
                                >
                                    <FontAwesomeIcon icon={faTwitter} />
                                </button>
                            </div>
                        </div>
                        <div className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-purple-600 hover:underline"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
                        <div>
                            <label className="block text-gray-700 mb-2">Name:</label>
                            <input
                                type="text"
                                className="w-full minimal-input"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email:</label>
                            <input
                                type="email"
                                className="w-full minimal-input"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Password:</label>
                            <input
                                type="password"
                                className="w-full minimal-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Confirm Password:</label>
                            <input
                                type="password"
                                className="w-full minimal-input"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                        >
                            SIGN UP
                        </button>
                        <div className="text-center text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Profile Completion Modal */}
            {showProfileModal && (
                <ProfileCompletionModal
                    onClose={() => setShowProfileModal(false)}
                    onSubmit={handleProfileSubmit}
                />
            )}
        </div>
    );
};

export default AuthPage;