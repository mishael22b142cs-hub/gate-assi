import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import Hero from '../components/Hero'; // Import the Hero component
import Specialties from '../components/Specialties'; // Import the Specialties component
import Testimonials from '../components/Testimonials'; // Import the Testimonials component
import Footer from '../components/Footer';
import AboutUs from '../components/About';
import ProfileCompletionModal from '../components/ProfileCompletionModal';

const Home = () => {
    return (
        <div>
            {/* Navbar Component */}
            <Navbar />

            {/* Hero Component */}
            <Hero />

            <div className='container mx-auto px-5'>
                {/* Specialties Section */}
                <Specialties />

                <AboutUs />

                {/* Testimonials Section */}
                <Testimonials />


            </div>
            <Footer />


        </div>
    );
};

export default Home;