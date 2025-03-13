import React from 'react';
import aboutVideo from '../assets/videos/about-video.mp4'; // Adjust the path
import videoThumbnail from '../assets/video-thumbnail.jpg'; // Optional: Add a thumbnail

const AboutUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">About Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Description Section */}
                <div className="space-y-6">
                    <p className="text-gray-600 text-lg">
                        Welcome to <span className="font-semibold text-blue-600">GATE Prep</span>, your ultimate destination for
                        mastering the GATE exam. Our platform is designed to help students from all branches of engineering
                        achieve their dreams by providing high-quality study materials, practice tests, and expert guidance.
                    </p>
                    <p className="text-gray-600 text-lg">
                        Our team of experienced professors and educators is dedicated to helping you succeed. Whether you're
                        looking for detailed explanations, solved examples, or mock tests, we've got you covered.
                    </p>
                    <p className="text-gray-600 text-lg">
                        Join us today and take the first step towards cracking the GATE exam with confidence!
                    </p>
                </div>

                {/* Video Section */}
                <div className="relative aspect-w-16 aspect-h-9">
                    <video
                        controls
                        className="rounded-lg shadow-lg"
                        poster={videoThumbnail} // Optional: Add a thumbnail
                    >
                        <source src={aboutVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;