import React from "react";
import Swal from "sweetalert2";

const CertificateList = ({ certificates, currentPage, totalPages, onPageChange }) => {
  const startIndex = (currentPage - 1) * 5;
  const currentItems = certificates.slice(startIndex, startIndex + 5);
 
  console.log(currentItems,"currentItems");
 
  const handleEdit = (cert) => {
    Swal.fire({
      icon: "info",
      title: `Opening  ${cert.name}'s record for  updated!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDocument = (cert) => {
    Swal.fire({
      icon: "info",
      title: `Viewing document for ${cert.name}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Certificates List
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Employee ID</th>
              <th className="p-3 border">Start Date</th>
              <th className="p-3 border">End Date</th>
              <th className="p-3 border">Domain</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((cert) => (
              <tr
                key={cert.id}
                className="hover:bg-gray-50 transition-colors text-sm"
              >
                <td className="p-3 border font-medium text-gray-800">
                  {cert.name}
                </td>
                <td className="p-3 border text-gray-600">{cert.email}</td>
                <td className="p-3 border text-gray-600">{cert.phone}</td>
                <td className="p-3 border text-gray-600">{cert.employeeId}</td>
                <td className="p-3 border text-gray-600">
                  {new Date(cert.startDate).toLocaleDateString()}
                </td>
                <td className="p-3 border text-gray-600">
                  {new Date(cert.endDate).toLocaleDateString()}
                </td>
                <td className="p-3 border text-indigo-600 font-medium">
                  {cert.domain}
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDocument(cert)}
                    className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                  >
                    Document
                  </button>
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
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600 transition"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600 transition"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <span className="text-gray-600 font-medium">
          Page <span className="text-indigo-600">{currentPage}</span> of{" "}
          <span className="text-indigo-600">{totalPages}</span>
        </span>
      </div>
    </div>
  );
};

export default CertificateList;
