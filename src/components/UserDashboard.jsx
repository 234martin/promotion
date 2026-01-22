import React from "react";

const UserDashboard = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Thank you for choosing Tigo
        </h1>

        <p className="text-gray-600 mb-6">
          You will receive your loan limit soon.
        </p>

        <button
          onClick={onLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
