import { useState } from "react";
import API from "../Api";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        fullName,
        email,
        password
      });
      alert("Signup successful. Wait for admin activation.");
      window.location.href = "/";

    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Full Name" onChange={e => setFullName(e.target.value)} /><br/>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
