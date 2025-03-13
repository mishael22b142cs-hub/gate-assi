import React from 'react';

const DashboardMockTests = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mock Tests</h2>
            <div className="space-y-4">
                <p className="text-gray-700">Take a mock test to assess your preparation:</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Start Mock Test
                </button>
            </div>
        </div>
    );
};

export default DashboardMockTests;