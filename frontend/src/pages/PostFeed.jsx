import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PostFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(res => {
                const incomingData = res.data;
                console.log("📥 F12 RAW SERVER DATA:", incomingData);

                let extractedPosts = [];

                if (Array.isArray(incomingData)) {
                    extractedPosts = incomingData;
                } else if (incomingData && typeof incomingData === 'object') {
                    const objectKeys = Object.keys(incomingData);
                    let foundArray = null;

                    for (let key of objectKeys) {
                        if (Array.isArray(incomingData[key])) {
                            foundArray = incomingData[key];
                            break;
                        }
                    }

                    if (foundArray) {
                        extractedPosts = foundArray;
                    } else if (incomingData.image || incomingData.url || incomingData.imageUrl) {
                        extractedPosts = [incomingData];
                    }
                }

                setPosts(extractedPosts);
            })
            .catch(err => {
                console.error("Feed API error status:", err);
                setError('Could not load the community feed.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>Loading Community Feed...</div>;
    if (error) return <div className="status-msg error" style={{ textAlign: 'center', margin: '20px' }}>{error}</div>;

    return (
        <div className="feed-wrapper" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <header className="feed-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '26px', margin: 0 }}>Community Feed</h2>
                <Link to="/create-post" className="nav-btn" style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>+ Create New Post</Link>
            </header>

            {posts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '16px', marginTop: '40px' }}>No posts shared yet. Be the first!</p>
            ) : (
                <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                    {posts.map((post, index) => (
                        <div key={post._id || `post-${index}`} className="post-card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <img
                                // 🚨 MAXIMUM MULTI-KEY KEY FALLBACK BACKUP
                                src={post.image || post.url || post.imageUrl || post.img || "https://placehold.co"}
                                alt="Live Post Card"
                                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                            />
                            <div className="card-content" style={{ padding: '15px' }}>
                                <p className="caption-text" style={{ margin: 0, color: '#334155', fontSize: '15px', lineHeight: '1.5' }}>
                                    {post.description || post.caption || 'No caption available'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
