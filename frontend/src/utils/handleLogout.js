
import { apiConnector } from '../services/apiConnector'; 

// Define the API endpoint for logout
const LOGOUT_ENDPOINT = '/api/v1/admin/logout'; 
export const handleLogout = async (onLogoutSuccess, navigate) => {
    
    // 1. Clear Local Storage First (Ensures immediate client-side log out)
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");

    // 2. Update React State to reflect log out
    if (typeof onLogoutSuccess === 'function') {
        onLogoutSuccess(false);
    }
    
    // 3. Redirect the user to the login/landing page
    if (typeof navigate==='function') {
        navigate("/"); 
    }

    // 4. Call the Backend to Clear the Secure HTTP-Only Cookie
    // We intentionally put this last because we want the UI to update immediately,
    // and the backend call primarily clears the secure cookie that the browser manages.
    try {
        await apiConnector.post(LOGOUT_ENDPOINT, {});
        // console.log("Backend cookie successfully cleared.");
    } catch (error) {
        // Log the error but don't prevent client-side cleanup
        console.error("Backend Logout API Error:", error.message);
        // The user is logged out on the client-side even if this fails.
    }
};