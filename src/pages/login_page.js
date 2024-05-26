import React, { useState } from "react";
import { useAuth } from "../contexts/auth_context"; // Import useAuth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useWallet } from "../contexts/wallet_context";

function LoginPage() {
  const { signin, currentUser } = useAuth(); // Destructure signin function and currentUser from useAuth
  const { wallet } = useWallet();
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Get navigate function from useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(password);
    // Navigate based on user role
    if (currentUser && currentUser.role === 0n) {
      navigate("/admin");
    } else if (currentUser && currentUser.role === 1n) {
      navigate("/patient");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <div className="rounded-md shadow-sm -space-y-px p-3 bg-gray-200 text-gray-900">
                {wallet.length > 0
                  ? wallet 
                  : "Connect Wallet"}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
