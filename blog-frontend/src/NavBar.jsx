import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isLoggedIn = !!token; 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

 
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
       
        <div className="navbar-logo" onClick={() => navigate('/')}>
          📝 BlogApp
        </div>

        
        <div className="navbar-menu">
          <a 
            onClick={() => navigate('/')} 
            className={isActive('/')}
          >
            Home
          </a>

          {isLoggedIn ? (
            // LOGGED IN MENU
            <>
              <a 
                onClick={() => navigate('/dashboard')} 
                className={isActive('/dashboard')}
              >
                My Blogs
              </a>
              
              <a 
                onClick={() => navigate('/create')} 
                className={isActive('/create')}
              >
                Create
              </a>

              <div className="navbar-user">
                <span className="username">👤 {username}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            
            <>
              <a 
                onClick={() => navigate('/login')} 
                className={isActive('/login')}
              >
                Login
              </a>
              
              <button 
                onClick={() => navigate('/signup')} 
                className="btn-signup"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;