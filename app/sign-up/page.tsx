'use client';

import { useState } from 'react';
import './Signup.css';

export default function SignupPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joinDate: '',
    totalDonations: '$0.00'
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign-up
    setIsSignedIn(true);
    setUserData({
      name: 'New User',
      email: 'newuser@example.com',
      phone: '',
      address: '',
      joinDate: new Date().toLocaleDateString(),
      totalDonations: '$0.00'
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile changes
    setIsSignedIn(true);
  };

  if (isSignedIn) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button 
            className="edit-btn"
            onClick={() => setIsSignedIn(false)}
          >
            Edit Profile
          </button>
        </div>
        
        <div className="profile-card">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{userData.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <span className="info-value">{userData.phone || 'Not provided'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Address:</span>
                <span className="info-value">{userData.address || 'Not provided'}</span>
              </div>
            </div>
          </div>
          
          <div className="profile-section">
            <h2>Donation History</h2>
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Member Since:</span>
                <span className="info-value">{userData.joinDate}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Donated:</span>
                <span className="info-value highlight">{userData.totalDonations}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <h1>Create Your Account</h1>
      
      <div className="signup-card">
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          
          <p className="login-prompt">
            Already have an account?{' '}
            <button 
              type="button" 
              className="demo-btn"
              onClick={() => setIsSignedIn(true)}
            >
              View Profile Demo
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
