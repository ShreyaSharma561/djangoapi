import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Landing() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/posts/');

            
            const publishedBlogs = response.data.filter(blog => blog.status === 'published');
            setBlogs(publishedBlogs);
            setLoading(false);

        } catch (err) {
            console.error('Error:', err);
            setLoading(false);
        }
    };

    
    const filteredBlogs = blogs.filter(blog => {
        const matchesFilter = filter === 'all' || blog.category === filter;
        const matchesSearch =
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return <div className="loading">Loading blogs...</div>;
    }

    return (
       <div className="landing">
            <h1>
                <marquee behavior="scroll" direction="left" scrollamount="5">
                    Welcome to BlogApp! Explore amazing blogs or create your own!
                </marquee>
            </h1>


            <section className="blogs-section">
                <div className="container">
                    {filteredBlogs.length === 0 ? (
                        <div className="empty-state">
                            <h3>No blogs found</h3>
                            <p>Try a different search or filter</p>
                        </div>
                    ) : (
                        <div className="blog-grid">
                            {filteredBlogs.map(blog => (
                                <article
                                    key={blog.id}
                                    className="blog-card"
                                    onClick={() => navigate(`/blog/${blog.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {blog.featured_image ? (
                                        <img src={blog.featured_image} alt={blog.title} className="blog-image" />
                                    ) : (
                                        <div className="blog-image-placeholder">
                                            {blog.title.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    <div className="blog-content">
                                        <div className="blog-category">
                                            {blog.category || 'General'}
                                        </div>

                                        <h3>{blog.title}</h3>

                                        <p className="blog-excerpt">
                                            {blog.content.substring(0, 150)}...
                                        </p>

                                        <div className="blog-footer">
                                            <span className="author">By {blog.author_name || 'Anonymous'}</span>
                                            <span className="date">
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            
            <footer className="footer">
                <p>&copy; 2026 BlogApp. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Landing;