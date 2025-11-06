// const mockCertificates = [
//   {
//     id: 1,
//     name: "Aarav Sharma",
//     email: "aarav.sharma@mail.com",
//     phone: "9876543210",
//     employeeId: "EMP-101",
//     startDate: "2024-01-10",
//     endDate: "2024-12-10",
//     domain: "Frontend Development",
//     certNumber: 1001,
//   },
//   {
//     id: 2,
//     name: "Priya Verma",
//     email: "priya.verma@mail.com",
//     phone: "9823456789",
//     employeeId: "EMP-102",
//     startDate: "2024-02-15",
//     endDate: "2025-02-15",
//     domain: "Backend Development",
//     certNumber: 1002,
//   },
//   {
//     id: 3,
//     name: "Rohit Kumar",
//     email: "rohit.kumar@mail.com",
//     phone: "9812345678",
//     employeeId: "EMP-103",
//     startDate: "2024-03-01",
//     endDate: "2025-03-01",
//     domain: "Data Analytics",
//     certNumber: 1003,
//   },
//   {
//     id: 4,
//     name: "Sneha Patel",
//     email: "sneha.patel@mail.com",
//     phone: "9908765432",
//     employeeId: "EMP-104",
//     startDate: "2024-05-20",
//     endDate: "2025-05-20",
//     domain: "Cloud Computing",
//     certNumber: 1004,
//   },
//   {
//     id: 5,
//     name: "Vikram Singh",
//     email: "vikram.singh@mail.com",
//     phone: "9934567890",
//     employeeId: "EMP-105",
//     startDate: "2024-06-10",
//     endDate: "2025-06-10",
//     domain: "UI/UX Design",
//     certNumber: 1005,
//   },
//   {
//     id: 6,
//     name: "Ananya Das",
//     email: "ananya.das@mail.com",
//     phone: "9871234567",
//     employeeId: "EMP-106",
//     startDate: "2024-07-01",
//     endDate: "2025-07-01",
//     domain: "Full Stack Development",
//     certNumber: 1006,
//   },
// ];
// import { useDispatch, useSelector } from "react-redux"

// import { apiConnector } from "../services/apiConnector";
// const { token } = useSelector((state) => state.auth)
let mockCertificates = [];
const API_URL = "http://localhost:5000/api/v1/admin/getalluser";

async function fetchUser() {
  console.log(localStorage.token);
  if (!localStorage.token) return;
  if (localStorage.token) {
    try {
      const response = await fetch(API_URL);
      // const response=await apiConnector("GET",API_URL)
      console.log(response);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log(data);

        mockCertificates = data;
        console.log(mockCertificates);
        return mockCertificates
      } else {
        const errorMessage = data.message;
        console.error(errorMessage);
      }
    } catch (err) {
      console.error("Fetch certificate Data Error:", err);
    }
  }
}

const data = await fetchUser();
console.log(data);
 mockCertificates = data;
setInterval(fetchUser, 1000);
console.log(mockCertificates);

export { mockCertificates };
