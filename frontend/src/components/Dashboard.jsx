import  {React, useEffect, useState } from "react";
// import { mockCertificates } from "../utils/certificateData";
import AddCertificateForm from "./AddCertificateForm";
import CertificateList from "./CertificateList";
import { FileTextIcon, Plus, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";
import { apiConnector } from "../services/apiConnector";
const ADD_API = "http://localhost:5000/api/v1/admin/adduser";
const ALL_CERTIFICATES_API = "http://localhost:5000/api/v1/admin/getalluser";


const Dashboard = () => {
  const [view, setView] = useState("");
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await apiConnector("GET", ALL_CERTIFICATES_API);
        
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
  
  
  
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(certificates?.length / 5);


  const handleAdd = async (formData) => {
    // const newCertificate = {
    //   id: certificates.length + 1,
    //   ...formData,
    //   certNumber: `CERT-${(certificates.length + 1)
    //     .toString()
    //     .padStart(3, "0")}`,
    // };
    // mockCertificates.push(newCertificate); // Update mock data
    //   Swal.fire({
    //      icon: "success",
    //      title: `Certificate added successfully!`,
    //      showConfirmButton: false,
    //      timer: 2000,
    //    });

    try {
      const response = await apiConnector("POST", ADD_API,formData)

      console.log("User added RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      Swal.fire({
         icon: "success",
         title: `Certificate added successfully!`,
         showConfirmButton: false,
         timer: 2000,
       });
    } catch (error) {
      console.log("User added API ERROR............", error)
    }
    setView("view");
  };
  
   const handleEdit = (cert) => {
       Swal.fire({
         icon: "info",
         title: `Opening ${cert.name}'s certificate for editing!`,
         showConfirmButton: false,
         timer: 2000,
       });
     };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>
      <div className="flex gap-6 mb-8 ">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
          onClick={() => setView("add")}
        >
          Add Certificate
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
          onClick={() => setView("view")}
        >
          View All Certificates
        </button>
      </div>

       {!view && (
        <div className="flex flex-col items-center justify-center text-center bg-white p-10 rounded-2xl shadow-md">
          <ShieldCheck className="text-blue-500 mb-4" size={64} />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome to Certificate Validator Admin Panel
          </h3>
          <p className="text-gray-600 max-w-xl mb-6">
            Manage and validate certificates easily from this dashboard. You can add new
            certificates, review all issued ones, and keep track of your data securely.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => setView("add")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex gap-2"
            >
              <Plus/>  Add New Certificate
            </button>
            <button
              onClick={() => setView("view")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex gap-2"
            >
             <FileTextIcon />  View Certificates
            </button>
          </div>
        </div>
      )}

      {view === "add" && <AddCertificateForm onAdd={handleAdd} />}

      {view === "view" && (
        <CertificateList
          certificates={certificates}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Dashboard;


