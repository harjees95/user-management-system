import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">UserManager</h1>
      <div className="space-x-4">
        <Link to="/profile" className="hover:text-indigo-400">Profile</Link>
        <Link to="/admin" className="hover:text-indigo-400">Admin</Link>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
