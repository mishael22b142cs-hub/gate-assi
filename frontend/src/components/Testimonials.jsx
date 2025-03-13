import React, { useState } from 'react';

// Import user photos
import AnilMehta from '../assets/testimonials1.jpg';
import PriyaSharma from '../assets/testimonials2.jpg';
import RameshIyer from '../assets/testimonials3.jpg';
import KavitaRao from '../assets/testimonials4.jpg';
import ArunVerma from '../assets/testimonials5.jpg';
import SnehaPatil from '../assets/testimonials6.jpg';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Dr. Anil Mehta',
            role: 'Professor, IIT Bombay',
            quote: 'This platform is a game-changer in GATE preparation. The personalized tests and progress tracking provide students with a clear roadmap to success. By analyzing performance metrics, it helps aspirants focus on their weaker areas, making their study plans more effective. Such an innovation is exactly what students need in today’s competitive landscape.',
            image: AnilMehta, // Use the imported image
        },
        {
            id: 2,
            name: 'Dr. Priyan Sharma',
            role: 'Senior Educator, NIT Trichy',
            quote: 'An innovative initiative that brings adaptive learning and open-source collaboration to GATE aspirants. This startup is not just another test series but a well-thought-out system designed to enhance learning through real-time feedback. The ability to track improvement over time makes it a powerful tool for self-assessment, something I strongly believe in.',
            image: PriyaSharma, // Use the imported image
        },
        {
            id: 3,
            name: 'Prof. Ramesh Iyer',
            role: 'Ex-GATE Examiner & Mentor',
            quote: 'With AI-driven personalization and detailed analytics, this platform empowers students to prepare smarter, not just harder. Many students struggle with identifying their weaknesses, and this system offers a unique way to address them systematically. The fact that this initiative is open-source and free to use makes it even more commendable, ensuring accessibility for all aspirants.',
            image: RameshIyer, // Use the imported image
        },
        {
            id: 4,
            name: 'Prof. Arun Verma',
            role: 'HOD, CSE, IIIT Hyderabad',
            quote: 'By offering free access and open-source support, this startup is democratizing quality GATE preparation for all. Many students are unable to afford expensive coaching, and this initiative levels the playing field by providing top-notch test series and performance monitoring tools. Such an approach is crucial for the future of education, and I wholeheartedly support this endeavor.',
            image: KavitaRao, // Use the imported image
        },
        {
            id: 5,
            name: 'Dr. Kavita Rao',
            role: 'Senior Professor, IISc Bangalore',
            quote: 'The emphasis on student-centric learning through customized testing is exactly what GATE aspirants need. Unlike traditional mock tests, this platform adapts to the student’s needs, making learning more efficient. I strongly believe that this will change the way students approach competitive exams, making preparation more strategic and less stressful.',
            image: ArunVerma, // Use the imported image
        },
        {
            id: 6,
            name: 'Dr. Sandeep Patil',
            role: 'Researcher & Academic Advisor',
            quote: 'With AI-driven personalization and detailed analytics, this platform empowers students to prepare smarter, not just harder. Many students struggle with identifying their weaknesses, and this system offers a unique way to address them systematically. The fact that this initiative is open-source and free to use makes it even more commendable, ensuring accessibility for all aspirants.',
            image: SnehaPatil, // Use the imported image
        },
    ];

    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - 2));
    };

    const handlePrevious = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + (testimonials.length - 2)) % (testimonials.length - 2));
    };

    return (
        <div className="py-12 bg-white relative">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Users Say</h2>
                <div className="relative overflow-hidden">
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 z-10"
                    >
                        &lt;
                    </button>

                    {/* Testimonials Container */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${startIndex * 33.33}%)` }}
                    >
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="w-1/3 flex-shrink-0 p-4">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <img
                                        src={testimonial.image} // Use the imported image
                                        alt={testimonial.name}
                                        className="w-20 h-20 rounded-full mx-auto mb-4"
                                    />
                                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                                    <p className="text-gray-800 font-semibold mt-4">- {testimonial.name}, {testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300 z-10"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;