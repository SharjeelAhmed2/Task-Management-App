// Layout.js
import React from "react";
import Navbar from "./screens/navbar";
import Footer from "./screens/footer";

const Layout = ({ children }) => {
  return (
    <div>
      {window.location.pathname !== "/signup" &&
        window.location.pathname !== "/login" && <Navbar />}
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
