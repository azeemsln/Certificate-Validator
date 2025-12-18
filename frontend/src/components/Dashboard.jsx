import React, { useEffect, useMemo, useState } from "react";
import AddCertificateForm from "./AddCertificateForm";
import CertificateList from "./CertificateList";
import { FileTextIcon, Plus, Menu, X } from "lucide-react"; // Added Menu and X icons
import Swal from "sweetalert2";
import { apiConnector } from "../services/apiConnector";
import Navbar from "./Navbar";
import logo from "../assets/the-entrepreneurship-network-cover.jpg";
import { endpoints } from '../services/apis'

const {
  ADD_API,
  ALL_CERTIFICATES_API,
} = endpoints

const AdminDashboardPage = ({ handleLogout }) => { 
    const [view, setView] = useState("view"); 
    const [certificates, setCertificates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // NEW STATE for mobile menu
    // const itemsPerPage = 5;
    // const totalPages = Math.ceil(certificates?.length / itemsPerPage);

    // --- Data Fetching Logic (Omitted for brevity, assumed unchanged) ---
    useEffect(() => {
        // ... (your fetchCertificates function remains here)
        async function fetchCertificates() {
            try {
                const response = await apiConnector("GET",ALL_CERTIFICATES_API);
                if (response.data && response.data.success) {
                    setCertificates(response.data.data);
                } else {
                    console.error("Failed to fetch certificates", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
            }
        }
        fetchCertificates();
    }, []);
 const uniqueDomains = useMemo(() => {
        const domains = certificates?.map(cert => cert.Domain) || [];
        return ['All', ...new Set(domains)].sort();
    }, [certificates]);
    const handleAdd = async (formData) => {
         // ... (your handleAdd function remains here)
         console.log(formData);
         
        try {
            const response = await apiConnector("POST",ADD_API, formData, formData);
            console.log(response);
            

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            const newCert = response.data.data;
            setCertificates(prev => [newCert, ...prev]);
            setView("view");
            
            Swal.fire({
                title: `Certificate added successfully!`,
                html: `
                    <div style="text-align: left; margin: 0 auto; width: fit-content;">
                        <strong>Name:</strong> ${newCert.name}<br>
                        <strong>Certificate No:</strong> ${newCert.certificateNumber}
                    </div>
                `,
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response?.data?.message || `Failed to add certificate.`,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };
    
    // const handleEdit = (cert) => {
    //     Swal.fire({
    //         icon: "info",
    //         title: `Opening ${cert.name}'s certificate for editing!`,
    //         showConfirmButton: false,
    //         timer: 2000,
    //     });
    // };

    const handleNavClick = (newView) => {
        setView(newView);
        setIsSidebarOpen(false); // Close sidebar after clicking a link on mobile
    };

    const cardData = [
        { title: 'Total Certificates', count: certificates.length, color: 'border-indigo-500' },
        { 
        title: 'Total Domains', 
        count: uniqueDomains.length - 1, // Exclude 'All' from count
        color: 'border-yellow-500' // Changed color for visual distinction
    },
     
    ];

    const navItems = [
        { name: 'Certificates List', view: 'view', icon: <FileTextIcon className="w-5 h-5" /> },
        { name: 'Add New Certificate', view: 'add', icon: <Plus className="w-5 h-5" /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            
            {/* 1. Mobile Menu Button (Only visible on small screens) */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>


            {/* 2. Sidebar (Figma Style - Collapsible) */}
            <div 
                className={`w-64 bg-gray-800 text-white flex flex-col p-4 shadow-2xl z-40
                    fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out 
                    lg:relative lg:translate-x-0 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Logo/Title Area */}
                <div className="text-2xl flex font-bold mb-8 pb-3 -mx-2 text-indigo-400 border-b border-gray-700 ">
                   <img 
                            src={logo} 
                            alt="Logo" 
                            className="w-12 h-12 rounded-full object-cover" 
                        />  <span className="ml-3 pt-1">TEN Validator</span>
                </div>
                
                {/* Navigation Links */}
                <nav className="flex-1">
                    {navItems.map((item) => {
                        const isActive = item.view === view;
                        return (
                            <button
                                key={item.view}
                                onClick={() => handleNavClick(item.view)}
                                className={`group flex items-center w-full text-left p-3 my-1 rounded-lg transition-all text-sm font-medium 
                                    ${isActive 
                                        ? 'bg-indigo-600 text-white shadow-md' 
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
            
            {/* 3. Main Content Area */}
            {/* Added margin-left for mobile so content starts after the menu button */}
            <div className="flex-1 overflow-y-auto lg:ml-0 ml-16"> 
                
               <Navbar handleLogout={handleLogout} />

                {/* Content Area */}
                <main className="p-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {cardData.map((card, index) => (
                             <div 
                                key={index} 
                                className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${card.color}`}
                            >
                                <p className="text-sm font-medium text-gray-500 uppercase">{card.title}</p>
                                <p className="text-4xl font-extrabold text-gray-800 mt-1">{card.count}</p>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Content */}
                    {view === "add" && <AddCertificateForm onAdd={handleAdd} onCancel={() => setView("view")} />}
                    {view === "view" && (
                        <CertificateList
                            certificates={certificates}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            uniqueDomains={uniqueDomains}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardPage;