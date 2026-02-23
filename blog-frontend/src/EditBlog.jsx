import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];


  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      const blog = response.data;
      setTitle(blog.title);
      setContent(blog.content);
      setCategory(blog.category || '');
      setStatus(blog.status);
      setCurrentImage(blog.featured_image);
      setLoading(false);
      
    } catch (err) {
      console.error('Error:', err);
      alert('Error loading blog');
      navigate('/dashboard');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('status', status);
    
    if (newImage) {
      formData.append('featured_image', newImage);
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/posts/${id}/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Blog updated successfully!');
      navigate('/dashboard');
      
    } catch (err) {
      console.error('Error:', err);
      alert('Error updating blog');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-blog-container">
      <div className="edit-header">
        <h2>Edit Blog Post</h2>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">
          Cancel
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="form-group">
          <label>Content *</label>
          <ReactQuill 
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Write your blog content here..."
            className="quill-editor"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Featured Image</label>
          
          
          {currentImage && !imagePreview && (
            <div className="current-image">
              <p>Current image:</p>
              <img src={currentImage} alt="Current" />
            </div>
          )}
          
          
          {imagePreview && (
            <div className="image-preview">
              <p>New image preview:</p>
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
          
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          <small className="help-text">
            Leave empty to keep current image
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/dashboard')} 
            className="btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Update Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;