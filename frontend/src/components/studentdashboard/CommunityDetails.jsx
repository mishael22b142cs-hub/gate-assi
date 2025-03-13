import React from 'react';
import CommunityPosts from './CommunityPosts';

const CommunityDetails = ({ community }) => {
    const { name, description, membersCount } = community;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-700 mb-6">{membersCount} members</p>
            <CommunityPosts communityId={community.id} />
        </div>
    );
};

export default CommunityDetails;