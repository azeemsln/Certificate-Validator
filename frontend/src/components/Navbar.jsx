import { TrendingUp } from "lucide-react";

const Navbar = ({ handleLogout }) => {
  
  const ADMIN_EMAIL = localStorage.getItem("adminEmail") || "";
  const DEFAULT_PROFILE_PIC = "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"; 
  const ADMIN_NAME = localStorage.getItem("adminName");
  const token = localStorage.getItem("token");
  return (
    <header className="flex justify-end items-center bg-white p-4 shadow-md sticky top-0 z-10">
                    <div className="flex items-center space-x-6">
                        {/* Admin Name and Profile Pic */}
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800">{ADMIN_NAME}</p>
                            <p className="text-xs text-gray-500">{ADMIN_EMAIL}</p>
                        </div>
                        <img 
                            src={DEFAULT_PROFILE_PIC} 
                            alt="Admin Profile" 
                            className="w-10 h-10 rounded-full border-2 border-indigo-400" 
                        />
                        
                        {/* Logout Button */}
                      {token? <button
                            onClick={handleLogout} 
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition shadow-sm"
                        >
                            Logout
                        </button> : null} 
                    </div>
                </header>
  );
};
export default Navbar;
