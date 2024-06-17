import React, { useState } from 'react';
import "../App.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      contactInfo,
      fullName,
    };

    try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
  
        if (!response.ok) {
          alert.error("User Not Created");
        }
        // Redirect to profile page
        navigate("/login");
      } catch (error) {
        console.error("Login error:", error);
      }
    };

  return (
    <div className="signup-container"> {/* Apply container class */}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Apply form group class */}
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required /> {/* Apply form control class */}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Contact Info:</label>
          <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button> {/* Apply button and button primary classes */}
      </form>
    </div>
  );
};

export default Signup;