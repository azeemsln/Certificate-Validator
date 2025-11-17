// AdminPage.jsx (Cleaned up Import)

import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar"; 
import LoginForm from "../components/LoginForm"; 
// Renamed import to match the component name used in rendering
import AdminDashboardPage from "../components/Dashboard"; 


const AdminPage = () => {
    // ... (State and handlers remain the same)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []); 

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("adminEmail");
        setIsLoggedIn(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {!isLoggedIn ? (
                <div className="w-full h-screen flex flex-col">
                    {/* ... Login Content ... */} 
                    <div className="flex-grow flex items-center justify-center">
                        <LoginForm onLogin={handleLogin} />
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen">
                    {/* Uses the intended component name */}
                    <AdminDashboardPage handleLogout={handleLogout} /> 
                </div>
            )}
        </div>
    );
};

export default AdminPage;