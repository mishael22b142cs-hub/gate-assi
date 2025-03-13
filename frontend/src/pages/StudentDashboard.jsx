import React, { useState } from 'react';
import Header from '../components/studentdashboard/Header';
import Sidebar from '../components/studentdashboard/Sidebar';
import DashboardHome from '../components/studentdashboard/DashboardHome';
import DashboardProfile from '../components/studentdashboard/DashboardProfile';
import DashboardStudyMaterials from '../components/studentdashboard/DashboardStudyMaterials';
import DashboardMockTests from '../components/studentdashboard/DashboardMockTests';
import CommunitiesList from '../components/studentdashboard/CommunitiesList'; // New component
import CommunityDetails from '../components/studentdashboard/CommunityDetails'; // New component
import Footer from '../components/studentdashboard/Footer';

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('home'); // State to track active tab
    const [selectedCommunity, setSelectedCommunity] = useState(null); // State to track selected community

    // Dummy student data (replace with actual data from backend)
    const student = {
        name: 'John Doe',
        branch: 'Computer Science',
        year: '3rd Year',
    };

    // Dummy data for communities
    const [communities, setCommunities] = useState([
        {
            id: 1,
            name: 'GATE CSE Aspirants',
            description: 'A community for Computer Science GATE aspirants.',
            membersCount: 120,
            isJoined: false,
        },
        {
            id: 2,
            name: 'GATE ECE Aspirants',
            description: 'A community for Electronics and Communication GATE aspirants.',
            membersCount: 80,
            isJoined: true,
        },
    ]);

    // Handle joining a community
    const handleJoinCommunity = (id) => {
        setCommunities((prev) =>
            prev.map((community) =>
                community.id === id
                    ? { ...community, isJoined: true, membersCount: community.membersCount + 1 }
                    : community
            )
        );
    };

    // Handle leaving a community
    const handleLeaveCommunity = (id) => {
        setCommunities((prev) =>
            prev.map((community) =>
                community.id === id
                    ? { ...community, isJoined: false, membersCount: community.membersCount - 1 }
                    : community
            )
        );
    };

    // Handle logout
    const handleLogout = () => {
        console.log('User logged out');
        // Redirect to login page or clear session
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <Header studentName={student.name} onLogout={handleLogout} />

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    {activeTab === 'home' && <DashboardHome student={student} />}
                    {activeTab === 'profile' && <DashboardProfile student={student} />}
                    {activeTab === 'studyMaterials' && <DashboardStudyMaterials />}
                    {activeTab === 'mockTests' && <DashboardMockTests />}
                    {activeTab === 'communities' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Communities</h2>
                            {selectedCommunity ? (
                                <CommunityDetails
                                    community={selectedCommunity}
                                    onBack={() => setSelectedCommunity(null)}
                                />
                            ) : (
                                <CommunitiesList
                                    communities={communities}
                                    onJoin={handleJoinCommunity}
                                    onLeave={handleLeaveCommunity}
                                    onSelectCommunity={setSelectedCommunity}
                                />
                            )}
                        </div>
                    )}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default StudentDashboard;