import React from 'react';
import { BRANCH_LABELS, YEAR_LABELS } from '../../lib/studentMeta';

const DashboardHome = ({ student }) => {
    const branch = BRANCH_LABELS[student.branch] || student.branch;
    const year = YEAR_LABELS[student.yearOfStudy] || student.yearOfStudy;
    const hasStudyInfo = branch && year;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            <div className="space-y-4">
                <p className="text-gray-700">
                    Welcome back, <span className="font-semibold">{student.name}</span>!
                </p>
                {hasStudyInfo ? (
                    <p className="text-gray-700">
                        You are currently in your <span className="font-semibold">{year}</span> of{' '}
                        <span className="font-semibold">{branch}</span>.
                    </p>
                ) : (
                    <p className="text-gray-700">
                        Add your branch and year of study in the{' '}
                        <span className="font-semibold">Profile</span> tab to personalize your dashboard.
                    </p>
                )}
                {student.collegeName && (
                    <p className="text-gray-700">
                        College: <span className="font-semibold">{student.collegeName}</span>
                    </p>
                )}
                <p className="text-gray-700">
                    Explore study materials, take mock tests, and track your progress to ace the GATE exam!
                </p>
            </div>
        </div>
    );
};

export default DashboardHome;
