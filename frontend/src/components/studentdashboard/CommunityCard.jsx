import React from 'react';

const CommunityCard = ({ community, onJoin, onLeave, onSelect }) => {
    const { id, name, description, membersCount, isJoined } = community;

    const handleJoinClick = (e) => {
        e.stopPropagation();
        if (isJoined) {
            onLeave(id);
        } else {
            onJoin(id);
        }
    };

    return (
        <div
            onClick={() => onSelect?.(community)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col"
        >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
            <p className="text-gray-600 mb-4 flex-1">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-gray-700">{membersCount} members</span>
                <button
                    onClick={handleJoinClick}
                    className={`${
                        isJoined
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                    } text-white px-4 py-2 rounded-lg transition duration-300`}
                >
                    {isJoined ? 'Leave' : 'Join'}
                </button>
            </div>
            {isJoined && (
                <p className="mt-2 text-sm text-green-600 font-medium">You are a member</p>
            )}
        </div>
    );
};

export default CommunityCard;
