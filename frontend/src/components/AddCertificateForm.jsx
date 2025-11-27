// AddCertificateForm.jsx (Fully Updated)

import React, { useState } from "react";

const DOMAIN_OPTIONS = [
    "HR Finance", 
    "Digital Marketing", 
    "Content Writing", 
    "Sales Marketing",
    "MEAN Stack",
    "MERN Stack", 
    "Java Developer", 
    "ReactJs", 
    "Python", 
    "Data Science", 
    "Django",
    "Software/QA Tester",
    "Flutter",
    "React Native",
    "UI/UX",
    "AI Tool"
];

const DOMAIN_CODES = {
    "HR Finance": "HR",
    "Digital Marketing": "DM",
    "Content Writing": "CR",
    "Sales Marketing": "SM",
    "MEAN Stack": "MEAN",
    "MERN Stack": "MERN",
    "Java Developer": "JAVA",
    "ReactJs": "TECH",
    "Python": "PY",
    "Data Science": "DS",
    "Django": "DJ",
    "Software/QA Tester": "MQ",
    "Flutter": "FL",
    "React Native": "RN",
    "UI/UX": "UI",
    "AI Tool": "AI"
};

const AddCertificateForm = ({ onAdd, onCancel }) => {
    const [domainCode, setDomainCode] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        employeeNumber: "",  // user enters only last digits
        startDate: "",
        endDate: new Date().toISOString().slice(0, 10),
        Domain: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "Domain") {
            const code = DOMAIN_CODES[value];
            setDomainCode(code); 
            setFormData({ ...formData, Domain: value });
            return;
        }

        // Restrict employee digits input
        if (name === "employeeNumber") {
            if (/^\d{0,8}$/.test(value)) {
                setFormData({ ...formData, employeeNumber: value });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate empty fields
        if (Object.values(formData).some(val => val === "")) {
            return window.Swal?.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please fill out all fields.",
                timer: 1500,
            });
        }

        // Validate domain
        if (!domainCode) {
            return window.Swal?.fire({
                icon: "warning",
                title: "Missing Domain",
                text: "Please select a domain.",
                timer: 1500,
            });
        }

        // Validate employee number
        if (formData.employeeNumber.length < 4 || formData.employeeNumber.length > 6) {
            return window.Swal?.fire({
                icon: "warning",
                title: "Invalid Employee Number",
                text: "Must be between 4–6 digits.",
                timer: 1500,
            });
        }

        // Build final employee ID
        const finalEmployeeID = `TEN/${domainCode}/${formData.employeeNumber}`;

        const dataToSave = {
            ...formData,
            employeeID: finalEmployeeID,
        };

        delete dataToSave.employeeNumber;

        onAdd(dataToSave);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl w-full mx-auto">

            <h3 className="text-3xl font-bold text-gray-800 mb-8">
                Add New Certificate
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Name <span className="text-xl text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Email <span className="text-xl text-red-700">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Domain */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-gray-700 font-medium">
                            Domain <span className="text-xl text-red-700">*</span>
                        </label>
                        <select
                            name="Domain"
                            value={formData.Domain}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                        >
                            <option value="" disabled>
                                --- Select a Domain ---
                            </option>
                            {DOMAIN_OPTIONS.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Phone <span className="text-xl text-red-700">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Employee ID */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Employee ID <span className="text-xl text-red-700">*</span>
                        </label>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-3">
                            <span className="font-semibold text-gray-700">
                                TEN/{domainCode || "___"}/
                            </span>

                            <input
                                type="text"
                                name="employeeNumber"
                                value={formData.employeeNumber}
                                onChange={handleChange}
                                placeholder="1234"
                                className="w-full border-0 outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Start Date <span className="text-xl text-red-700">*</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            End Date <span className="text-xl text-red-700">*</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
                    >
                        Save Certificate
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCertificateForm;
