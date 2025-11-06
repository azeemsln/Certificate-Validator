import React, { useState } from "react";

const ADD_API = "http://localhost:5000/api/v1/admin/adduser";

const AddCertificateForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    certificateNumber:"",
    name: "",
    email: "",
    phone: "",
    employeeID: "",
    startDate: "",
    endDate: "",
    Domain: "",
  });

  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    formData.certNumber = Math.floor(1000 + Math.random() * 9000);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {name, email, password } = formData;

    onAdd(formData);
    
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8"
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Add New Certificate
        </h3>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            required
          />
        </div>

        {/* Employee ID */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            placeholder="Enter employee ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              required
            />
          </div>
        </div>

        {/* Domain */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Domain</label>
          <input
            type="text"
            name="Domain"
            value={formData.Domain}
            onChange={handleChange}
            placeholder="e.g., Web Development, Data Science"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCertificateForm;
