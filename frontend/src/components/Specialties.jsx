import React from 'react';
import FeatureBox from './FeatureBox';

const Specialties = () => {
    const specialties = [
        {
            icon: '📚', // You can replace this with an icon library like FontAwesome
            title: 'Curated Test Materials',
            description: 'Access thousands of GATE-specific questions and study materials curated by experts.',
        },
        {
            icon: '🎓',
            title: 'Expert Professors',
            description: 'Get personalized feedback and guidance from experienced professors.',
        },
        {
            icon: '📊',
            title: 'Progress Tracking',
            description: 'Track your performance and identify areas for improvement with detailed analytics.',
        },
        {
            icon: '⏱️',
            title: 'Mock Tests',
            description: 'Simulate the real GATE exam experience with timed mock tests.',
        },
        {
            icon: '💡',
            title: 'Doubt Resolution',
            description: 'Get your doubts resolved quickly by our team of experts.',
        },
        {
            icon: '🏆',
            title: 'Achievements',
            description: 'Earn badges and certificates as you progress through your GATE preparation.',
        },
    ];

    return (
        <div className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specialties.map((specialty, index) => (
                        <FeatureBox
                            key={index}
                            icon={specialty.icon}
                            title={specialty.title}
                            description={specialty.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Specialties;