import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import Landing from './landing';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import CreateBlog from './createBlog';
import EditBlog from './EditBlog';
import BlogDetail from './BlogDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Navbar />
        
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;