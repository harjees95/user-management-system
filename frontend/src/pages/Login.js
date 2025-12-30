import { useState } from "react";
import API from "../Api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password
    });
    localStorage.setItem("token", res.data.token);
    alert("Login success");
    window.location.href = "/profile";
  } catch (err) {
    alert(err.response?.data?.msg || "Server error");
  }
};


  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
