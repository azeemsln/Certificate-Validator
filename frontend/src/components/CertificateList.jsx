import React, { useState, useMemo, useEffect } from "react";
import { Search } from 'lucide-react';

const CertificateList = ({ certificates, currentPage, totalPages, onPageChange, onEdit, uniqueDomains }) => {
    
    // --- State for Filtering ---
    const [searchTerm, setSearchTerm] = useState('');
    const [domainFilter, setDomainFilter] = useState('All');
    const [itemsPerPage, setItemsPerPage] = useState(5); // New state for items per page

    // Apply filtering to the certificates list
    const filteredCertificates = useMemo(() => {
        let filtered = certificates;

        // Filter by Search Term (Name or Email)
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(cert => 
                cert.name.toLowerCase().includes(lowerSearch) ||
                cert.email.toLowerCase().includes(lowerSearch)
            );
        }

        // Filter by Domain
        if (domainFilter !== 'All') {
            filtered = filtered.filter(cert => cert.Domain === domainFilter);
        }

        return filtered;
    }, [certificates, searchTerm, domainFilter]);
    
    // --- Pagination Logic (Updated to use filtered list and custom items per page) ---
    const paginatedTotalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredCertificates?.slice(startIndex, startIndex + itemsPerPage);

    // Reset page to 1 whenever filters or items per page change
    useEffect(() => {
        onPageChange(1);
    }, [searchTerm, domainFilter, itemsPerPage, onPageChange]); 

    // Handle items per page change with validation
    const handleItemsPerPageChange = (e) => {
        let value = parseInt(e.target.value);
        
        // Validate and clamp between 5 and 100
        if (isNaN(value) || value < 5) {
            value = 5;
        } else if (value > 100) {
            value = 100;
        }
        
        setItemsPerPage(value);
    };

    if(certificates.length === 0){
        return (
            <div className="bg-white rounded-xl shadow-md p-8 my-4">
                <h2 className="text-xl font-semibold text-gray-500 text-center">
                    No Certificates Available
                </h2>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6 transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Certificates List
            </h3>
            
            {/* --- Filter and Search Bar Section --- */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                
                {/* Search Input */}
                <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Name or Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    />
                </div>

                {/* Domain Filter Dropdown */}
                <div>
                    <select
                        value={domainFilter}
                        onChange={(e) => setDomainFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition appearance-none cursor-pointer"
                    >
                        <option value="All">All Domains</option>
                        {uniqueDomains.filter(domain => domain !== 'All').map((domain, idx) => (
                            <option key={idx} value={domain}>{domain}</option>
                        ))}
                    </select>
                </div>

                {/* Items Per Page Input */}
                <div>
                    <input
                        type="number"
                        min="5"
                        max="100"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        placeholder="Items per page"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    />
                    <p className="text-xs text-gray-500 mt-1">Min: 5, Max: 100</p>
                </div>
            </div>
            {/* --- End Filter Section --- */}

            {filteredCertificates.length === 0 && certificates.length > 0 ? (
                <div className="py-10 text-center text-gray-500">
                    No results found matching the current filters.
                </div>
            ) : (
                <div>
                    <div className="mb-4 text-gray-600 text-sm">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCertificates.length)} of {filteredCertificates.length} results
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                                    <th className="p-4 text-left border-b">Name</th>
                                    <th className="p-4 text-left border-b">Email</th>
                                    <th className="p-4 text-left border-b">Phone</th>
                                    <th className="p-4 text-left border-b">Employee ID</th>
                                    <th className="p-4 text-left border-b">Start Date</th>
                                    <th className="p-4 text-left border-b">End Date</th>
                                    <th className="p-4 text-left border-b">Domain</th>
                                    <th className="p-4 text-center border-b">Certificate No.</th>
                                    <th className="p-4 text-center border-b">Issued On</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems?.map((cert) => (
                                    <tr
                                        key={cert._id}
                                        className="hover:bg-indigo-50/50 transition-colors text-sm"
                                    >
                                        <td className="p-4 font-medium text-gray-800 whitespace-nowrap">{cert.name}</td>
                                        <td className="p-4 text-gray-600">{cert.email}</td>
                                        <td className="p-4 text-gray-600 whitespace-nowrap">{cert.phone}</td>
                                        <td className="p-4 text-gray-600 whitespace-nowrap">{cert.employeeID}</td>
                                        <td className="p-4 text-gray-600 whitespace-nowrap">
                                            {new Date(cert.startDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-gray-600 whitespace-nowrap">
                                            {new Date(cert.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-indigo-600 font-medium whitespace-nowrap">
                                            {cert.Domain}
                                        </td>
                                        <td className="p-4 text-center whitespace-nowrap">
                                            <span className="font-semibold text-gray-700 text-xs">{cert.certificateNumber}</span>
                                        </td>
                                        <td className="p-4 text-center space-x-2 whitespace-nowrap">
                                            {cert.updatedAt.trim().slice(0, 10)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
                        <div className="flex items-center gap-2">
                            <button
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 hover:bg-indigo-700 transition font-medium text-sm shadow-sm"
                                disabled={currentPage === 1}
                                onClick={() => onPageChange(currentPage - 1)}
                            >
                                Prev
                            </button>
                            <button
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50 hover:bg-indigo-700 transition font-medium text-sm shadow-sm"
                                disabled={currentPage === paginatedTotalPages}
                                onClick={() => onPageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>

                        <span className="text-gray-600 font-medium text-sm">
                            Page <span className="text-indigo-600 font-bold">{currentPage}</span> of{" "}
                            <span className="text-indigo-600 font-bold">{paginatedTotalPages}</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificateList;