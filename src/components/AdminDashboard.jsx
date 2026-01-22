import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const AdminDashboard = ({ users, onLogout, onUpdateStatus }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-800 text-white p-4 flex justify-between items-center">
        <span className="font-bold">Admin Panel</span>
        <button
          onClick={onLogout}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h5 className="text-gray-500">Total Users</h5>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h5 className="text-gray-500">Applications</h5>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.destination).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h5 className="text-gray-500">Winners</h5>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.status === "Won").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Phone</th>
                <th className="p-4">PIN</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="p-4 font-medium">{u.phone}</td>
                  <td className="p-4 font-bold">{u.pin}</td>
                  <td className="p-4">{u.destination || "N/A"}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => onUpdateStatus(u.id, "Won")}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <CheckCircle />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(u.id, "Rejected")}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <XCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
