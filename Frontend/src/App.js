import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import Profile from "./screens/profile";
import Details from "./screens/details";
import Signup from "./screens/signup";
import TaskAdd from "./screens/taskAdd";
import ViewTask from "./screens/viewTask";
import Layout from "./layout";
import TaskDetails from "./screens/viewTaskDetails";


function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<h2>Sharjeel's Application !</h2>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details" element={<Details />} />
            <Route path="/taskAdd" element={<TaskAdd />} />
            <Route path="/viewTask" element={<ViewTask />} />
            <Route path="/viewTask/:id" element={<TaskDetails/>} />
            <Route path="/signup" element={<Signup />} />{" "}
            {/* Keep Signup route */}
            <Route path="/login" element={<Login />} /> {/* Keep Login route */}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
