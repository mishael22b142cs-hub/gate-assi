import React, { useState } from 'react';

const ProfileCompletionModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        branch: '',
        yearOfStudy: '',
        interests: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full minimal-input"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Branch of Study:</label>
                        <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="w-full minimal-input"
                            required
                        >
                            <option value="">Select your branch</option>
                            <option value="CSE">Computer Science</option>
                            <option value="ECE">Electronics and Communication</option>
                            <option value="ME">Mechanical Engineering</option>
                            <option value="CE">Civil Engineering</option>
                            <option value="EE">Electrical Engineering</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Year of Study:</label>
                        <select
                            name="yearOfStudy"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            className="w-full minimal-input"
                            required
                        >
                            <option value="">Select your year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Interests:</label>
                        <input
                            type="text"
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            className="w-full minimal-input"
                            placeholder="Enter your interests (e.g., AI, Robotics)"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileCompletionModal; // Correct export