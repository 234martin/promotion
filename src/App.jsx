import { useEffect, useState } from "react"
import Login from "./components/Login"
import UserDashboard from "./components/UserDashboard"
import AdminDashboard from "./components/AdminDashboard"

export default function App() {
  const [view, setView] = useState("login")
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const storedAdmin = JSON.parse(localStorage.getItem("admin") || "null")

    if (storedUsers.length) setUsers(storedUsers)
    if (storedAdmin) console.log("Admin exists")

    const storedView = localStorage.getItem("view")
    if (storedView) setView(storedView)
  }, [])

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem("view", view)
  }, [view])

  if (view === "admin") {
    return (
      <AdminDashboard
        users={users}
        setUsers={setUsers}
        setView={setView}
      />
    )
  }

  if (view === "user") {
    return (
      <UserDashboard
        users={users}
        setUsers={setUsers}
        currentUser={currentUser}
        setView={setView}
      />
    )
  }

  return (
    <Login
      users={users}
      setUsers={setUsers}
      setCurrentUser={setCurrentUser}
      setView={setView}
    />
  )
}
