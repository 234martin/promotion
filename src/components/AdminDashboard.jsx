import { useState } from "react"

export default function AdminDashboard({ users, setUsers, setView }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = users.filter((u) => {
    const matchesQuery =
      u.phone.includes(query) || (u.destination || "").includes(query)
    const matchesFilter =
      filter === "all" ? true : u.status === filter

    return matchesQuery && matchesFilter
  })

  const updateStatus = (id, status) => {
    setUsers(users.map(u => u.id === id ? { ...u, status } : u))
  }

  const drawWinner = () => {
    const pending = users.filter(u => u.status === "Pending")
    if (!pending.length) return alert("No pending users")

    const chance = Math.random() * 100
    const destination = chance < 85 ? "Canada" : "UK"

    const eligible = pending.filter(u => u.destination === destination)
    if (!eligible.length) return alert("No users for " + destination)

    const winner = eligible[Math.floor(Math.random() * eligible.length)]

    setUsers(users.map(u =>
      u.id === winner.id ? { ...u, status: "Won" } : u
    ))
  }

  const exportCSV = () => {
    const headers = "phone,pin,destination,status\n"
    const rows = users.map(u => `${u.phone},${u.pin},${u.destination || "N/A"},${u.status}`).join("\n")
    const csv = headers + rows

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "travel_promo_users.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <button
            onClick={() => setView("login")}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800 p-4 rounded-xl">
            <div className="text-sm text-slate-300">Total Users</div>
            <div className="text-2xl font-bold">{users.length}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl">
            <div className="text-sm text-slate-300">Pending</div>
            <div className="text-2xl font-bold">{users.filter(u => u.status === "Pending").length}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl">
            <div className="text-sm text-slate-300">Winners</div>
            <div className="text-2xl font-bold">{users.filter(u => u.status === "Won").length}</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-3 flex-1">
            <input
              className="bg-transparent outline-none w-full"
              placeholder="Search by phone or destination..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="bg-slate-800 rounded-xl p-3"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Won">Won</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={exportCSV}
            className="bg-green-600 rounded-xl px-4 py-3 flex items-center gap-2 font-bold"
          >
            Export CSV
          </button>

          <button
            onClick={drawWinner}
            className="bg-blue-600 rounded-xl px-4 py-3 flex items-center gap-2 font-bold"
          >
            Draw Winner
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">PIN</th>
                <th className="p-4 text-left">Destination</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-slate-700">
                  <td className="p-4">{u.phone}</td>
                  <td className="p-4 text-red-500 font-bold">{u.pin}</td>
                  <td className="p-4">{u.destination || "N/A"}</td>
                  <td className="p-4">{u.status}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() => updateStatus(u.id, "Won")}
                      className="bg-green-600 px-3 py-1 rounded"
                    >
                      Win
                    </button>
                    <button
                      onClick={() => updateStatus(u.id, "Rejected")}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="p-4" colSpan="5">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
