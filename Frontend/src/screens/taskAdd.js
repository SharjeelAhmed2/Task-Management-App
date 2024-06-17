// Tasks.js
import React from 'react';
import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskAdd = () => {
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority,setPriority] = useState('');
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
                return;
            }
    
            // Decode the token to check expiry
            const decodedToken = decodeJWTToken(token);
            if (decodedToken.exp < Date.now() / 1000) {
                // Token has expired, redirect to login
                navigate("/login");
                return;
            }
    
            // Make API call to update profile
            const response = await fetch('http://localhost:3000/taskAdd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, description,dueDate,priority })
            });

            if (!response.ok) {
                throw new Error('Failed to add task ');
            }

            // Handle successful response
            alert('Task added successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error Adding tasks: ', error);
            alert('An error occurred while adding task');
        }
    };

  return (
    <div className="details-container" style={{marginTop:"50px"}}>
      <h1>Enter Your Tasks</h1>
      <form onSubmit={handleSubmit} style={{margin:"20px"}}>
        <label htmlFor="taskName">Task Name:</label>
        <input 
        type="text" id="taskName" value={title} onChange={(event) => setTitle(event.target.value)} required/>
        <br />
        <label htmlFor="description">Description:</label>
        <input type="text" id="descritpion" value={description} onChange={(event)=>setDescription(event.target.value)}/>
        <br />
        <label className='priorityL' for="priorityL">Priority</label>
    <select className='priority' id="priority" name="priority" value={priority} onChange={(event)=>setPriority(event.target.value)} required>
        <option value="medium">medium</option>
        <option value="high">high</option>
        <option value="low">low</option>
    </select>
        <br />
        <label className='priorityL' htmlFor="description">Due Date</label>
        <input className='priority' type="datetime-local" id="descritpion" value={dueDate} onChange={(event) =>setDueDate(event.target.value)} required/>
        <br />
        {/* Add more fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskAdd;