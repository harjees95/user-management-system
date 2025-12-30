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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-[360px]">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login to your account
      </h2>

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
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Login
      </button>
      <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
      </p>
    </div>
  </div>
);

}
