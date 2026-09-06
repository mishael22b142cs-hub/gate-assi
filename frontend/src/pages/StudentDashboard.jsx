import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import Header from '../components/studentdashboard/Header';
import Sidebar from '../components/studentdashboard/Sidebar';
import DashboardHome from '../components/studentdashboard/DashboardHome';
import DashboardProfile from '../components/studentdashboard/DashboardProfile';
import DashboardStudyMaterials from '../components/studentdashboard/DashboardStudyMaterials';
import DashboardMockTests from '../components/studentdashboard/DashboardMockTests';
import CommunitiesList from '../components/studentdashboard/CommunitiesList';
import CommunityDetails from '../components/studentdashboard/CommunityDetails';
import Footer from '../components/studentdashboard/Footer';

const StudentDashboard = () => {
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('home');
    const [selectedCommunity, setSelectedCommunity] = useState(null);

    // Dummy data for communities (no community backend yet)
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

    // Load the logged-in student's real details
    useEffect(() => {
        let active = true;

        const loadProfile = async () => {
            try {
                const { data } = await api.get('/api/student/auth/profile');
                if (!active) return;

                if (data?.success && data.student) {
                    setStudent(data.student);
                } else {
                    navigate('/login');
                }
            } catch {
                if (active) navigate('/login');
            } finally {
                if (active) setLoading(false);
            }
        };

        loadProfile();
        return () => {
            active = false;
        };
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.post('/api/student/auth/logout');
        } catch {
            // ignore network errors on logout
        }
        navigate('/login');
    };

    const handleProfileUpdate = async (updates) => {
        const { data } = await api.put('/api/student/auth/profile', updates);
        if (data?.success && data.student) {
            setStudent(data.student);
        }
        return data;
    };

    const handleJoinCommunity = (id) => {
        setCommunities((prev) =>
            prev.map((community) =>
                community.id === id
                    ? { ...community, isJoined: true, membersCount: community.membersCount + 1 }
                    : community
            )
        );
    };

    const handleLeaveCommunity = (id) => {
        setCommunities((prev) =>
            prev.map((community) =>
                community.id === id
                    ? { ...community, isJoined: false, membersCount: Math.max(0, community.membersCount - 1) }
                    : community
            )
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
                Loading your dashboard...
            </div>
        );
    }

    if (!student) return null;

    const displayName = student.name || 'Student';
    // Keep the currently selected community in sync with join/leave changes
    const currentCommunity = selectedCommunity
        ? communities.find((c) => c.id === selectedCommunity.id) || selectedCommunity
        : null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header studentName={displayName} onLogout={handleLogout} />

            <div className="flex flex-1">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="flex-1 p-6">
                    {activeTab === 'home' && <DashboardHome student={student} />}
                    {activeTab === 'profile' && (
                        <DashboardProfile student={student} onUpdate={handleProfileUpdate} />
                    )}
                    {activeTab === 'studyMaterials' && <DashboardStudyMaterials />}
                    {activeTab === 'mockTests' && <DashboardMockTests />}
                    {activeTab === 'communities' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Communities</h2>
                            {currentCommunity ? (
                                <CommunityDetails
                                    community={currentCommunity}
                                    onBack={() => setSelectedCommunity(null)}
                                    onJoin={handleJoinCommunity}
                                    onLeave={handleLeaveCommunity}
                                    currentUserName={displayName}
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

            <Footer />
        </div>
    );
};

export default StudentDashboard;
