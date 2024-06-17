import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate;

  function decodeJWTToken(token) {
    // Split the token into its three parts: header, payload, and signature
    const [header, payload, signature] = token.split(".");
    // Decode the payload (second part)
    const decodedPayload = atob(payload);
    // Parse the JSON payload into an object
    const decodedPayloadObject = JSON.parse(decodedPayload);
    return decodedPayloadObject;
  }

  const [totalCount, setTotalCount] = useState(0);
  const [doneCount, setdoneCount] = useState(null);
  const [todoCount, settodoCount] = useState(null);
  const [pendingCount, setpendingCount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
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

    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/tasks/total-count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response2 = await axios.get(
        "http://localhost:3000/tasks/done-count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response3 = await axios.get(
        "http://localhost:3000/tasks/pending-count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const response4 = await axios.get(
        "http://localhost:3000/tasks/todo-count",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalCount(response.data.reuslt);
      setdoneCount(response2.data.reuslt);
      setpendingCount(response3.data.reuslt);
      settodoCount(response4.data.reuslt);
    };

    fetchData();
  });
  return (
    <>
      <div
        tabIndex="0"
        role="region"
        data-testid="dashboard-welcome"
        className="mb-8"
      >
        <h1
          tabIndex="0"
          title="Welcome to the Dashboard"
          data-testid="dashboard-welcome-title"
          className="mt-10 text-center text-2xl font-bold"
        >
          Welcome to the Dashboard!
        </h1>
      </div>
       <div className="flex gap-5">
        <div
          tabIndex="0"
          role="region"
          data-testid="pending-tasks-card"
          className="flex-1"
        >
          <div className="rounded overflow-hidden shadow-lg h-40 w-1/2  mt-20 bg-green-700  mx-auto">
            <div className="px-6 py-4 flex flex-col items-center text-center mt-8">
              <div>
              <div
                className="font-bold text-2xl mb-2 text-white"
                data-testid="pending-tasks-title"
              >
                Completed
              </div>
              <p
                className="text-gray-700 text-lg text-white"
                data-testid="pending-tasks-count"
              >
                {doneCount}
              </p>

              </div>
            </div>
          </div>
        </div>
        <div
          tabIndex="0"
          role="region"
          data-testid="pending-tasks-card"
          className="flex-1"
        >
          <div className="rounded overflow-hidden shadow-lg h-40 w-1/2  mt-20 bg-red-700  mx-auto">
            <div className="px-6 py-4 text-center mt-8">
              <div
                className="font-bold text-2xl mb-2  text-white"
                data-testid="pending-tasks-title"
              >
                Pending
              </div>
              <p
                className="text-gray-700 text-lg  text-white"
                data-testid="pending-tasks-count"
              >
                {pendingCount}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div
          tabIndex="0"
          role="region"
          data-testid="pending-tasks-card"
          className="flex-1"
        >
          <div className="rounded overflow-hidden shadow-lg h-40 w-1/2  mt-20 bg-yellow-300  mx-auto">
            <div className="px-6 py-4 text-center mt-8">
              <div
                className="font-bold text-2xl mb-2 text-white"
                data-testid="pending-tasks-title"
              >
                To-Do
              </div>
              <p
                className="text-gray-700 text-lg text-white"
                data-testid="pending-tasks-count"
              >
                {todoCount}
              </p>
            </div>
          </div>
        </div>
        <div
          tabIndex="0"
          role="region"
          data-testid="pending-tasks-card"
          className="flex-1"
        >
          <div className="rounded overflow-hidden shadow-lg h-40 w-1/2  mt-20 bg-blue-700  mx-auto">
            <div className="px-6 py-4 text-center">
              <div
                className="font-bold text-2xl mb-2 text-white mt-8"
                data-testid="pending-tasks-title"
              >
                Total Tasks
              </div>
              <p
                className="text-gray-700 text-lg text-white"
                data-testid="pending-tasks-count"
              >
                {totalCount}
              </p>
            </div>
          </div>
        </div>
      </div> 
     
    </>
  );
};
export default Profile;
