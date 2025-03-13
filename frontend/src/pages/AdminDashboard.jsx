import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
            <p className="text-lg text-gray-600 mb-8">Welcome to the admin dashboard!</p>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Student Progress</h3>
                <ul className="text-gray-600">
                    <li>Student A: 80%</li>
                    <li>Student B: 65%</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;