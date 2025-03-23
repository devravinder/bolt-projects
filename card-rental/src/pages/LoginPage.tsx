import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';
import { useStore } from '../store';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useStore(state => state.login);
  const darkMode = useStore(state => state.darkMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/vehicles');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-8 rounded-lg shadow-lg max-w-md w-full`}>
        <div className="flex flex-col items-center mb-8">
          <Car size={48} className="text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold">Welcome to VehicleRent</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
              }`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>

          <div className="text-sm text-center mt-4">
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Demo accounts:
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Admin: admin@example.com / admin123
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Customer: customer@example.com / customer123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};