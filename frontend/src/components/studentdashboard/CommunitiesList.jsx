import React from 'react';
import CommunityCard from './CommunityCard';

const CommunitiesList = ({ communities, onJoin, onLeave }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
                <CommunityCard
                    key={community.id}
                    community={community}
                    onJoin={onJoin}
                    onLeave={onLeave}
                />
            ))}
        </div>
    );
};

export default CommunitiesList;