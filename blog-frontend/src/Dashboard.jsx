import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      const myBlogs = response.data.filter(blog => blog.author_name === username);
      setBlogs(myBlogs);
      setLoading(false);
      
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      setBlogs(blogs.filter(blog => blog.id !== id));
      alert('Blog deleted!');
      
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      
      <div className="dashboard-welcome">
        <h1>Welcome back, {username}! 👋</h1>
        <p>Manage your blog posts</p>
      </div>

      <div className="blog-grid">
        {blogs.length === 0 ? (
          <div className="empty-state">
            <p>No blogs yet. Create your first one!</p>
            <button onClick={() => navigate('/create')} className="btn-primary">
              Create Blog
            </button>
          </div>
        ) : (
          blogs.map(blog => (
            <div 
              key={blog.id} 
              className="blog-card"
              onClick={() => navigate(`/blog/${blog.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {blog.featured_image && (
                <img src={blog.featured_image} alt={blog.title} />
              )}
              
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 150)}...</p>
              
              <div className="blog-meta">
                <span className={`badge ${blog.status}`}>{blog.status}</span>
                <span>{blog.category}</span>
              </div>
              
              <div className="blog-actions" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => navigate(`/edit/${blog.id}`)} 
                  className="btn-edit"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(blog.id)} className="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;