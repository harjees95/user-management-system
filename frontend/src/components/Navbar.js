export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const role = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).role;

  return (
    <div style={{padding:10, background:"#222", color:"white"}}>
      <span style={{marginRight:20}}>User Management System</span>
      <button onClick={() => window.location.href="/profile"}>Profile</button>
      {role === "admin" && <button onClick={() => window.location.href="/admin"}>Admin</button>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
