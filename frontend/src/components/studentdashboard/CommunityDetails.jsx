import React from 'react';
import CommunityPosts from './CommunityPosts';

const CommunityDetails = ({ community, onBack, onJoin, onLeave, currentUserName }) => {
    const { id, name, description, membersCount, isJoined } = community;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <button
                onClick={onBack}
                className="text-blue-600 hover:underline mb-4"
            >
                &larr; Back to communities
            </button>

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                    <p className="text-gray-600 mt-1">{description}</p>
                    <p className="text-gray-700 mt-2">{membersCount} members</p>
                </div>
                <button
                    onClick={() => (isJoined ? onLeave(id) : onJoin(id))}
                    className={`${
                        isJoined ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white px-4 py-2 rounded-lg transition duration-300`}
                >
                    {isJoined ? 'Leave' : 'Join'}
                </button>
            </div>

            {isJoined ? (
                <CommunityPosts currentUserName={currentUserName} />
            ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                    Join this community to view and write posts.
                </p>
            )}
        </div>
    );
};

export default CommunityDetails;
