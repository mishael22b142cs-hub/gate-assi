import React from 'react';

const DashboardStudyMaterials = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Study Materials</h2>
            <div className="space-y-4">
                <p className="text-gray-700">Here are your study materials:</p>
                <ul className="list-disc list-inside text-gray-700">
                    <li>Mathematics</li>
                    <li>General Aptitude</li>
                    <li>Computer Science</li>
                    <li>Electronics and Communication</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardStudyMaterials;