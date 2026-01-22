import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [view, setView] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (storedUsers) setUsers(storedUsers);

    if (storedCurrentUser) {
      setCurrentUser(storedCurrentUser);
      setView(storedCurrentUser.role === "admin" ? "admin-dashboard" : "user-dashboard");
    }
  }, []);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Save currentUser to localStorage
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setView("login");
  };

  // Login function
  const handleLogin = (phone, pin) => {
    // Admin login
    if (phone === "NAME.BIGG" && pin === "4039") {
      const admin = { role: "admin", name: "NAME.BIGG" };
      setCurrentUser(admin);
      setView("admin-dashboard");
      return;
    }

    // Normal user login / register
    const existingUser = users.find((u) => u.phone === phone);

    if (existingUser) {
      if (existingUser.pin === pin) {
        setCurrentUser({ ...existingUser, role: "user" });
        setView("user-dashboard");
      } else {
        alert("Invalid PIN!");
      }
    } else {
      const newUser = {
        id: Date.now(),
        phone,
        pin,
        destination: null,
        status: "New",
      };

      setUsers([...users, newUser]);
      setCurrentUser({ ...newUser, role: "user" });
      setView("user-dashboard");
    }
  };

  // Admin update status
  const updateStatus = (userId, newStatus) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
  };

  return (
    <div className="min-h-screen">
      {view === "login" && <Login onLogin={handleLogin} />}
      {view === "user-dashboard" && (
        <UserDashboard user={currentUser} onLogout={handleLogout} />
      )}
      {view === "admin-dashboard" && (
        <AdminDashboard
          users={users}
          onLogout={handleLogout}
          onUpdateStatus={updateStatus}
        />
      )}
    </div>
  );
}
