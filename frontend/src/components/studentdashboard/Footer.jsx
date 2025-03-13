import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Contact Us</h3>
                        <div className="flex items-center space-x-4">
                            <FaEnvelope className="text-blue-400 text-xl" />
                            <p>support@gateprep.com</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaPhone className="text-blue-400 text-xl" />
                            <p>+91 12345 67890</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaMapMarkerAlt className="text-blue-400 text-xl" />
                            <p>123 GATE Prep Street, Bangalore, India</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-blue-400">Home</a></li>
                            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="/services" className="hover:text-blue-400">Services</a></li>
                            <li><a href="/contact" className="hover:text-blue-400">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Follow Us</h3>
                        <div className="flex space-x-6">
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                <FaLinkedin className="text-2xl" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                <FaTwitter className="text-2xl" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-500"
                            >
                                <FaFacebook className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} GATE Prep. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;