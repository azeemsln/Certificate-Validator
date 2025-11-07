import { TrendingUp } from "lucide-react";
import logo from "../assets/the-entrepreneurship-network-cover.jpg";

const Navbar = ({ onLogout }) => {
  const adminName = localStorage.getItem("adminName");
  const token = localStorage.getItem("token");
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
        <div className="flex justify-center items-center space-x-10">
          <img src={logo} alt="logo"  className="w-28"/>
         
      <h1 className="text-2xl font-semibold">{adminName}</h1>

        </div>
         <div className="flex items-center space-x-10">
              <TrendingUp className="w-6 h-6 text-indigo-800" />
              <span className="text-xl font-bold text-gray-100">TEN Certificate Validator</span>
               {token?<button
        onClick={onLogout}
        className="bg-red-500 px-4 py-1 mx-2 rounded hover:bg-red-600"
      >
        Logout
      </button>:null} 
            </div>
    
    </nav>
  );
};
export default Navbar;
