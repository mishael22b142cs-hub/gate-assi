import React from 'react';
import { FaHome, FaUser, FaBook, FaChartLine, FaUsers } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="w-64 bg-white shadow-md p-4">
            <nav className="space-y-2">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`w-full flex items-center p-2 rounded-lg ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <FaHome className="mr-2" />
                    Home
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center p-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <FaUser className="mr-2" />
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab('studyMaterials')}
                    className={`w-full flex items-center p-2 rounded-lg ${activeTab === 'studyMaterials' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <FaBook className="mr-2" />
                    Study Materials
                </button>
                <button
                    onClick={() => setActiveTab('mockTests')}
                    className={`w-full flex items-center p-2 rounded-lg ${activeTab === 'mockTests' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <FaChartLine className="mr-2" />
                    Mock Tests
                </button>
                <button
                    onClick={() => setActiveTab('communities')}
                    className={`w-full flex items-center p-2 rounded-lg ${activeTab === 'communities' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <FaUsers className="mr-2" />
                    Communities
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;