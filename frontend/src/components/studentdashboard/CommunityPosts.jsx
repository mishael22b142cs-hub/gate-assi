import React, { useState } from 'react';

const CommunityPosts = ({ communityId }) => {
    const [posts, setPosts] = useState([
        { id: 1, author: 'John Doe', content: 'How do I solve this problem?', timestamp: '2 hours ago' },
        { id: 2, author: 'Jane Smith', content: 'Here’s a great resource for GATE prep!', timestamp: '1 day ago' },
    ]);

    const [newPost, setNewPost] = useState('');

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (newPost.trim()) {
            setPosts([
                { id: posts.length + 1, author: 'You', content: newPost, timestamp: 'Just now' },
                ...posts,
            ]);
            setNewPost('');
        }
    };

    return (
        <div>
            <form onSubmit={handlePostSubmit} className="mb-6">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Write a post..."
                    rows="3"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Post
                </button>
            </form>

            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800">{post.content}</p>
                        <p className="text-sm text-gray-600">
                            Posted by {post.author} • {post.timestamp}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityPosts;