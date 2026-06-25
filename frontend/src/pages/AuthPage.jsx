import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneno: '',
        password: '',
        confirmpassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/student/auth/login`,
                {
                    email: formData.email,
                    password: formData.password,
                },
                { withCredentials: true }
            );

            if (data?.success) {
                navigate('/student-dashboard');
                return;
            }

            setError(data?.message || 'Login failed');
        } catch (loginError) {
            setError(loginError?.response?.data?.message || 'Unable to connect to the server');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/student/auth/signup`,
                {
                    name: formData.name,
                    email: formData.email,
                    phoneno: formData.phoneno,
                    password: formData.password,
                    confirmpassword: formData.confirmpassword,
                },
                { withCredentials: true }
            );

            if (data?.success) {
                setShowProfileModal(true);
                return;
            }

            setError(data?.message || 'Signup failed');
        } catch (signupError) {
            setError(signupError?.response?.data?.message || 'Unable to connect to the server');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSubmit = (formData) => {
        console.log('Profile Data:', formData);
        setShowProfileModal(false);
        navigate('/student-dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animated-gradient">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {error && (
                    <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                {isLogin ? (
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                        <div>
                            <label className="block text-gray-700 mb-2">Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full minimal-input"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full minimal-input"
                                placeholder="Enter your password"
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
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {loading ? 'LOADING...' : 'LOGIN'}
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
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className="text-purple-600 hover:underline"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="space-y-6" onSubmit={handleSignup}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
                        <div>
                            <label className="block text-gray-700 mb-2">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full minimal-input"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full minimal-input"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Phone Number:</label>
                            <input
                                type="tel"
                                name="phoneno"
                                value={formData.phoneno}
                                onChange={handleChange}
                                className="w-full minimal-input"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full minimal-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmpassword"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                className="w-full minimal-input"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                        >
                            {loading ? 'LOADING...' : 'SIGN UP'}
                        </button>
                        <div className="text-center text-gray-600">
                            Already have an account?{' '}
                            <button
                                type="button"
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