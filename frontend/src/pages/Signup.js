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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-[380px]">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create your account
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={handleSignup}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Sign Up
      </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
    </div>
  </div>
);

}
