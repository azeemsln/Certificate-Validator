import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, UserCog } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col items-center justify-center px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-2">
          Certificate Validator
        </h1>
        <p className="text-gray-600 text-lg">
          Verify authenticity or manage certificates securely
        </p>
      </div>

      {/* Option Cards */}
      <div className="grid sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Validate Certificate */}
        <div
          onClick={() => navigate("/validate")}
          className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-indigo-300"
        >
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-16 h-16 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Validate Certificate
          </h2>
          <p className="text-gray-600 text-sm">
            Check if a certificate is genuine using its certificate number.
          </p>
        </div>

        {/* Admin Panel */}
        <div
          onClick={() => navigate("/admin")}
          className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-indigo-300"
        >
          <div className="flex justify-center mb-4">
            <UserCog className="w-16 h-16 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Admin Panel
          </h2>
          <p className="text-gray-600 text-sm">
            Add, view, and manage certificate records with secure access.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Certificate Validator. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
