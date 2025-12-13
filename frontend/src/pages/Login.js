import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import './Login.css'; // Create a new CSS file for login

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdmin') === 'true';
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  // In a real app, you'd have an API endpoint for authentication
  // For now, we'll use localStorage to store admin credentials
  const validateCredentials = (username, password) => {
    // Get stored admin credentials or use default
    const storedAdmin = JSON.parse(localStorage.getItem('adminCredentials') || 'null');
    
    if (storedAdmin) {
      return username === storedAdmin.username && password === storedAdmin.password;
    } else {
      // Default admin (first time setup)
      return username === 'moveglow' && password === 'moveglow&123';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (validateCredentials(username, password)) {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminName', username);
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle initial admin setup (optional feature)
  const handleSetupAdmin = () => {
    navigate('/setup-admin');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Manage products and inventory</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter username"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {/* Optional: Forgot password or setup */}
        <div className="login-footer">
          <button 
            onClick={() => alert('Contact system administrator')}
            className="forgot-button"
          >
            Forgot Password?
          </button>
          
          {/* Only show setup on first visit */}
          {!localStorage.getItem('adminCredentials') && (
            <button 
              onClick={handleSetupAdmin}
              className="setup-button"
            >
              First Time Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;