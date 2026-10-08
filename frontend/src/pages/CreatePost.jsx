import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]); // Safe individual file indexing payload selection
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        try {
            await axios.post('http://localhost:3000/create-post', formData);
            alert('🎉 Post Uploaded!');
            navigate('/');
        } catch (err) {
            console.error("Upload process crashed:", err);
            alert('Upload Failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container" style={{ padding: '35px 25px', maxWidth: '450px', margin: '40px auto', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>Create a New Post</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600' }}>Select Photo</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} required style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600' }}>Caption Description</label>
                    <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write details..." required style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', resize: 'none' }} />
                </div>

                <button type="submit" disabled={loading} style={{ padding: '12px', fontWeight: 'bold', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    {loading ? 'Uploading...' : 'Share Post'}
                </button>

                <Link to="/" style={{ padding: '10px', textAlign: 'center', display: 'block', color: '#64748b', textDecoration: 'none' }}>Cancel</Link>
            </form>
        </div>
    );
}
