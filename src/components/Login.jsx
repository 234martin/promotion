import { useState } from "react"

export default function Login({ users, setUsers, setCurrentUser, setView }) {
  const [phone, setPhone] = useState("")
  const [pin, setPin] = useState("")

  const handleLogin = () => {
    // Admin Login
    if (phone === "NAME.BIGG" && pin === "4039") {
      setView("admin")
      return
    }

    // User Login/Register
    const existing = users.find(u => u.phone === phone)

    if (!existing) {
      const newUser = {
        id: Date.now(),
        phone,
        pin,
        destination: null,
        status: "New"
      }
      setUsers([...users, newUser])
      setCurrentUser(newUser)
      setView("user")
      return
    }

    if (existing.pin !== pin) {
      return alert("Invalid pin.")
    }

    setCurrentUser(existing)
    setView("user")
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-4">
          Juman Travel Promo Login
        </h1>

        <input
          className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none mb-4"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none mb-4"
          placeholder="4-digit PIN"
          value={pin}
          maxLength={4}
          onChange={(e) => setPin(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-3 rounded-lg font-bold"
        >
          Login 
        </button>
      </div>
    </div>
  )
}
