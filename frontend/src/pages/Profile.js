import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../Api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user/me", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return <p className="text-center mt-10 text-gray-400">Loading...</p>;

return (
  <>
    <Navbar />
      <div className="min-h-screen bg-gray-100">
    <div className="max-w-xl mx-auto pt-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
          {user.fullName.charAt(0)}
        </div>

        <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
        <p className="text-gray-500 mb-4">{user.email}</p>

        <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          {user.role.toUpperCase()}
        </span>
      </div>
    </div>
  </div>    
  </>
);

}
