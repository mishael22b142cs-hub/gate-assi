import React from 'react';

const CommunityCard = ({ community, onJoin, onLeave }) => {
    const { id, name, description, membersCount, isJoined } = community;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-gray-700">{membersCount} members</span>
                {isJoined ? (
                    <button
                        onClick={() => onLeave(id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Leave
                    </button>
                ) : (
                    <button
                        onClick={() => onJoin(id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Join
                    </button>
                )}
            </div>
        </div>
    );
};

export default CommunityCard;