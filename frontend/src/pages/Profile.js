import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/user/me", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div style={{padding:20}}>
        <h2>My Profile</h2>
        <p><b>Name:</b> {user.fullName}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </>
  );
}
