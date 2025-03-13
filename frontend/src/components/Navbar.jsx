import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation(); // Get the current route

    return (
        <nav className="bg-transparent absolute top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo or Brand Name */}
                <Link to="/" className="text-2xl font-bold text-white">
                    GATE Prep Hub
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-4">
                    {/* Hide Login link if the current route is /login */}
                    {location.pathname === '/' && (
                        <Link
                            to="/login"
                            className="text-white hover:text-blue-200 transition duration-300"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;