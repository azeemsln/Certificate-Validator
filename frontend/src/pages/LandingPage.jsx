import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, TrendingUp } from "lucide-react";
// import logo from "../assets/the-entrepreneurship-network-cover.jpg";
import UserNav from "../components/UserNav";

const LandingPage = () => {
  const navigate = useNavigate();
  // console.log(logo);
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* 1. Navigation Bar (Nav Title) */}
      {/* <nav className=" w-full bg-black p-3 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3">
          <div className="flex justify-between items-center ">
             <img src={logo} alt="logo"  className="w-28"/>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-indigo-800" />
              <span className="text-xl font-bold text-gray-100">TEN Certificate Validator</span>
            </div>
          </div>
        </div>
      </nav> */}
      <UserNav/>

      {/* Main Content Area */}
      <main className="grow flex flex-col items-center justify-center p-4 sm:p-10">
        <div className="max-w-3xl text-center bg-white p-8 sm:p-12 rounded-xl shadow-2xl border border-gray-200">
          
          {/* 2. Company Info Section */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Welcome to the <span className="text-indigo-600">TEN</span> Verification Portal
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            This portal allows employers, educational institutions, and individuals to instantly verify the authenticity and status of any <span className="text-xl bg-amber-50 text-blue-600">Certificate</span>   using its unique identifier.
          </p>
          
          <p className="text-md text-gray-500 mb-10">
            Our system provides real-time, tamper-proof verification, ensuring trust in every credential issued by TEN.
          </p>

          {/* 3. Redirect Button */}
          <button
            onClick={() => navigate("/validate")}
            className="flex items-center justify-center mx-auto space-x-3 px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-[1.02]"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Validate Your Certificate Now</span>
          </button>
        </div>
      </main>

      {/* Footer (Optional but good practice) */}
      <footer className="text-center py-4 text-gray-500 text-xs bg-white border-t border-gray-100">
        © {new Date().getFullYear()} TEN Internships. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;