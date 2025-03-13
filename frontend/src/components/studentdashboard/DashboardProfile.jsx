import React from 'react';

const DashboardProfile = ({ student }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Profile</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700">Full Name:</label>
                    <p className="text-gray-900 font-semibold">{student.name}</p>
                </div>
                <div>
                    <label className="block text-gray-700">Branch:</label>
                    <p className="text-gray-900 font-semibold">{student.branch}</p>
                </div>
                <div>
                    <label className="block text-gray-700">Year of Study:</label>
                    <p className="text-gray-900 font-semibold">{student.year}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;