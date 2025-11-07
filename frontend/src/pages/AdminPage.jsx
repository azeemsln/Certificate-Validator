
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";  
import Dashboard from "../components/Dashboard";



const AdminPage = () => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogin = (status) => {
    // console.log(status);
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    setIsLoggedIn(false);
  };

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!isLoggedIn ? (
         <div className="w-full h-screen">
          <Navbar onLogout={handleLogout} />
        <LoginForm onLogin={handleLogin} />

           </div>
      ) : (
        <div className="w-full">
          <Navbar onLogout={handleLogout} />
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
