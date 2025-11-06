const Navbar = ({ onLogout }) => {
  const adminName = localStorage.getItem("adminName");
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-2xl font-semibold">{adminName}</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};
export default Navbar;
