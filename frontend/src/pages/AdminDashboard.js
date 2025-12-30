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

  return (
    <>
      <Navbar />
      <div>
        <h2>Admin Dashboard</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status ? "Active" : "Inactive"}</td>
                <td>
                  {u.status
                    ? <button onClick={() => deactivate(u._id)}>Deactivate</button>
                    : <button onClick={() => activate(u._id)}>Activate</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
