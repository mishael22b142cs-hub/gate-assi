import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = ({ studentName, onLogout }) => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {studentName}!</h1>
            <button
                onClick={onLogout}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
                <FaSignOutAlt className="mr-2" />
                Logout
            </button>
        </header>
    );
};

export default Header;