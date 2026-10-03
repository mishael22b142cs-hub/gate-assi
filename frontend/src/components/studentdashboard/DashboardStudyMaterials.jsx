import React from 'react';

// Free external resources, grouped by GATE subject. Links point to the
// platforms' home pages so they stay valid as courses are updated.
const MATERIALS = [
    {
        subject: 'Mathematics',
        resources: [
            { name: 'NPTEL (IIT video lectures)', url: 'https://nptel.ac.in', note: 'Search "Engineering Mathematics"' },
            { name: 'SWAYAM (free MOOC courses)', url: 'https://swayam.gov.in', note: 'Search "Engineering Mathematics"' },
        ],
    },
    {
        subject: 'General Aptitude',
        resources: [
            { name: 'GATE Overflow (previous year questions)', url: 'https://gateoverflow.in', note: 'Practice questions with solutions' },
        ],
    },
    {
        subject: 'Computer Science',
        resources: [
            { name: 'NPTEL (Data Structures, Algorithms, OS)', url: 'https://nptel.ac.in', note: 'Search the CS course you need' },
            { name: 'GeeksforGeeks (GATE CS notes)', url: 'https://www.geeksforgeeks.org', note: 'Topic notes and practice problems' },
            { name: 'GATE Overflow (previous year questions)', url: 'https://gateoverflow.in', note: 'Practice questions with solutions' },
        ],
    },
    {
        subject: 'Electronics and Communication',
        resources: [
            { name: 'NPTEL (Electronics and Communication courses)', url: 'https://nptel.ac.in', note: 'Search "Signals and Systems" or "Digital Circuits"' },
            { name: 'GATE Overflow (previous year questions)', url: 'https://gateoverflow.in', note: 'Practice questions with solutions' },
        ],
    },
];

const DashboardStudyMaterials = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Study Materials</h2>
            <p className="text-gray-700 mb-6">Free resources to start with, grouped by subject:</p>

            <div className="space-y-6">
                {MATERIALS.map((group) => (
                    <div key={group.subject}>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">{group.subject}</h3>
                        <ul className="space-y-2">
                            {group.resources.map((resource) => (
                                <li key={resource.name} className="text-sm">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        {resource.name}
                                    </a>
                                    <span className="text-gray-500"> — {resource.note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStudyMaterials;
