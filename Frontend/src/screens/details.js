import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const [fullName, setFullName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [emailId, setEmailId] = useState('');
    const navigate = useNavigate(); // useNavigate hook
    function decodeJWTToken(token) {
      // Split the token into its three parts: header, payload, and signature
      const [header, payload, signature] = token.split('.');
  
      // Decode the payload (second part)
      const decodedPayload = atob(payload);
  
      // Parse the JSON payload into an object
      const decodedPayloadObject = JSON.parse(decodedPayload);
  
      return decodedPayloadObject;
  }


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
          const token = localStorage.getItem('token');
          if (!token) {
              // Token not found, redirect to login
              navigate("/login");
              // Refresh the page
              window.location.reload();
              return;
          }
  
          // Decode the token to check expiry
          const decodedToken = decodeJWTToken(token);
          if (decodedToken.exp < Date.now() / 1000) {
              // Token has expired, redirect to login
              navigate("/login");
                  // Refresh the page
                  window.location.reload();
              return;
          }

            if (!/\b[A-Z0-9._%+-]+@(?:gmail|outlook)\.com\b/i.test(emailId)) {
              alert('Invalid email address! Please enter a valid Gmail or Outlook email.');
              return;
            }
            else {
            // Make API call to update profile
            const response = await fetch('http://localhost:3000/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ fullName, contactInfo, emailId })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            // Handle successful response
            alert('Profile updated successfully');
            window.location.reload();
         }
       }
        catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating profile');
        }
    };

    return (
      <div className="details-container w-[500px] mx-auto rounded-sm border-2 px-6 py-6 mt-20 bg-[#f9f9f9] shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Enter Your Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block mb-1">Full Name:</label>
            <input 
              type="text" 
              id="fullName" 
              value={fullName} 
              onChange={(event) => setFullName(event.target.value)} 
              className="border border-gray-300 rounded px-4 py-2 w-full" 
               
            />
          </div>
          <div>
            <label htmlFor="contactInfo" className="block mb-1">Contact Info:</label>
            <input 
              type="text" 
              id="contactInfo" 
              value={contactInfo} 
              onChange={(event) => setContactInfo(event.target.value)} 
              className="border border-gray-300 rounded px-4 py-2 w-full" 
               
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input 
              type="text" 
              id="emailId" 
              value={emailId} 
              onChange={(event) => setEmailId(event.target.value)} 
              className="border border-gray-300 rounded px-4 py-2 w-full" 
              required 
            />
          </div>
          {/* Add more fields as needed */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </form>
      </div>
    );
    
    
};

export default Details;
