import { TrendingUp } from "lucide-react";
import logo from "../assets/the-entrepreneurship-network-cover.jpg";
import { Link } from "react-router-dom";

const UserNav = () => (
<nav className="w-full bg-black ">
        <div className="max-w-7xl  px-3 py-3">
          <div className="flex justify-between items-center ">
            <Link to="/"> <img src={logo} alt="logo"  className="w-28" /></Link> 
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-indigo-800" />
              <span className="text-xl font-bold text-gray-100">TEN Certificate Validator</span>
            </div>
          </div>
        </div>
      </nav>
)
export default UserNav;