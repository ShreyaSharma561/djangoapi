import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}/`);
      setBlog(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      alert('Blog deleted!');
      navigate('/dashboard');
      
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  if (loading) {
    return <div className="loading">Loading blog...</div>;
  }

  if (!blog) {
    return (
      <div className="error-page">
        <h2>Blog not found</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go Home
        </button>
      </div>
    );
  }

  const isAuthor = currentUser === blog.author_name;

  return (
    <div className="blog-detail">
      {/* Header */}
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        {isAuthor && (
          <div className="action-buttons">
            <button 
              onClick={() => navigate(`/edit/${id}`)} 
              className="btn-edit"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </div>
        )}
      </header>

      <article className="blog-article">
        
        {blog.featured_image && (
          <div className="featured-image-container">
            <img src={blog.featured_image} alt={blog.title} className="featured-image" />
          </div>
        )}

        
        <h1 className="blog-title">{blog.title}</h1>

        
        <div className="blog-meta-info">
          <span className="author-info">
            By <strong>{blog.author_name || 'Anonymous'}</strong>
          </span>
          <span className="separator">•</span>
          <span className="date-info">
            {new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          {blog.category && (
            <>
              <span className="separator">•</span>
              <span className="category-badge">{blog.category}</span>
            </>
          )}
          <span className="separator">•</span>
          <span className={`status-badge ${blog.status}`}>
            {blog.status}
          </span>
        </div>

        
        <div className="blog-content-text">
          {blog.content}
        </div>

        
        {blog.updated_at !== blog.created_at && (
          <div className="updated-info">
            Last updated: {new Date(blog.updated_at).toLocaleDateString()}
          </div>
        )}
      </article>
    </div>
  );
}

export default BlogDetail;