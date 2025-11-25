
import { useState } from 'react'
import { Eye, Mail } from 'lucide-react'
import { apiConnector } from '../services/apiConnector';



const LoginForm = ({onLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
   const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   
  // const adminData = {
  //   email: "admin@example.com",
  //   password: "admin123", // ideally, passwords should be hashed in a real app
  // };

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }


  const handleSubmit = async e => {
    e.preventDefault() 
    setError("");
    setIsLoading(true);
     const { email, password } = formData;  

    // Simple check
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
  }
  try {
    const response = await apiConnector("POST", import.meta.env.VITE_LOGIN_API,{
      email,password
    })
    
    if (!response.data.success) {
        throw new Error(response.data.message)
      }
    const data = await response.data;
    
    if (data.success==true) {
        // Assuming your backend returns a token on success, e.g., { success: true, token: "...", email: "..." }
        const { token,admin } = data; 
        const {email: email } = data.admin; 
        
        // 1. Store the actual token from the server
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("adminName", (admin.name));
        localStorage.setItem("adminEmail", email); // Store email for display
        
        // 2. Clear error and trigger login success
        onLogin(true);

    } else {
        // Handle non-200 responses (e.g., 401 Unauthorized)
        const errorMessage = data.message || "Login failed. Check credentials.";
        setError(errorMessage);
    }
} catch (err) {
    // Handle network errors (e.g., server is down)
    // console.error("Login API Error:", err);
    setError(err.response.data.message
 || "An error occurred during login.");
} finally {
    setIsLoading(false); // Stop loading regardless of success/failure
    setFormData({ email: "", password: "" }); // Clear form fields
}
};

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
     <div className='w-full sm:max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl'>
        <div className='text-3xl font-bold text-center mb-6 text-gray-800'>Admin Login</div>
          <form className='w-full  flex flex-col gap-4'>
        <div className='bg-gray-100 p-3 flex items-center gap-3 rounded-lg border border-gray-300 focus-within:border-indigo-500 transition-all'>
          <Mail size={20} className='text-gray-500' />
          <input
          name='email'
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e)=>handleChange(e)}
            className='font-medium bg-transparent focus:outline-none w-full'
          />
        </div>
        <div className='bg-gray-100 p-3 flex items-center gap-3 rounded-lg border border-gray-300 focus-within:border-indigo-500 transition-all'>
          <Eye size={20} className='text-gray-500' />
          <input
          name='password'
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={(e)=>handleChange(e) }
            className='font-medium bg-transparent focus:outline-none w-full'
          />
        </div>
        {error && (
            <p className="text-red-600 text-center text-sm font-medium p-2 bg-red-100 rounded-lg">{error}</p>
          )}

        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full p-3 text-white font-semibold rounded-lg transition duration-200  ${isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'}`}
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </form>

     {/* <p> {`${adminData.email}    ${adminData.password}`}</p>  */}
    </div>
    </div>
    
  )
}

export default LoginForm
