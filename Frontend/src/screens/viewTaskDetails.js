// src/TaskDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    statuts: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };
  useEffect(() => {
    
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

    fetch(`http://localhost:3000/getTask/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTask(data.result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  // src/components/Task.js


  const handleMarkAsComplete = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/tasks/${id}/status/done`);
      console.log('Task updated:', response.data);
      navigate("/viewTask");
    } catch (error) {
      console.error('There was a problem with the axios operation:', error);
      alert("Can't mark complete");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      navigate("/viewTask");
    } catch (error) {
      console.error('There was a problem with the axios operation:', error);
      alert("Can't be deleted");
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="text-xl">Loading...</span>
        <span className="loader" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-100 text-red-800 border border-red-200 rounded-md">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p>Failed to load task details: {error.message}</p>
      </div>
    );
  }

  if (task) {
    const { title, description, dueDate, priority, status } = task;
    return (
      <div className="max-w-2xl p-6 rounded-md ml-2.5">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="mb-2">
          <span className="font-semibold">Description:</span> {description}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Due Date:</span> {dueDate}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Priority:</span> {priority}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Status:</span> {status}
        </p>
        {status !=='done' && (
        <button onClick={handleMarkAsComplete}
              class="w-80 h-10 inline-flex items-center text-sm mt-5 font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Mark as Complete</button>)}
        <button onClick={handleDeleteTask}
        class="w-80 h-10 inline-flex items-center text-sm mt-5 font-medium text-center text-white bg-red-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Delete this Task</button>
      </div>
    );
  }


  return null;
};

export default TaskDetails;
