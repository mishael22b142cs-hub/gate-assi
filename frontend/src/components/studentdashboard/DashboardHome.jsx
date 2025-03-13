import React from 'react';

const DashboardHome = ({ student }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            <div className="space-y-4">
                <p className="text-gray-700">
                    Welcome back, <span className="font-semibold">{student.name}</span>!
                </p>
                <p className="text-gray-700">
                    You are currently in your <span className="font-semibold">{student.year}</span> of{' '}
                    <span className="font-semibold">{student.branch}</span>.
                </p>
                <p className="text-gray-700">
                    Explore study materials, take mock tests, and track your progress to ace the GATE exam!
                </p>
            </div>
        </div>
    );
};

export default DashboardHome;