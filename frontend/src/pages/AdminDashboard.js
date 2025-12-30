import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import API from "../Api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await API.get("/admin/users", {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const activate = async (id) => {
    await API.put(`/admin/activate/${id}`, {}, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    loadUsers();
  };

  const deactivate = async (id) => {
    await API.put(`/admin/deactivate/${id}`, {}, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    loadUsers();
  };
  const changeRole = async (id, role) => {
    await API.put(`/admin/role/${id}`, { role });
    loadUsers();
  };

  return (
  <>
  <Navbar />
  <div className="min-h-screen bg-gray-100 p-10">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="p-4 font-medium">{u.fullName}</td>
              <td className="p-4 text-gray-600">{u.email}</td>
              <td className="p-4">{u.role}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  u.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {u.status ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-4 space-x-2">
                {u.status ? (
                  <button
                    onClick={() => deactivate(u._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => activate(u._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                  >
                    Activate
                  </button>
                )}

                <button
                  onClick={() =>
                    changeRole(u._id, u.role === "admin" ? "user" : "admin")
                  }
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg"
                >
                  {u.role === "admin" ? "Make User" : "Make Admin"}
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </>
);

}
