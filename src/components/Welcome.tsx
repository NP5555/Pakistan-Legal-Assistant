import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    cnic: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/case-input');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-gray-700">
        <div className="flex items-center justify-center mb-8">
          <UserCheck className="h-12 w-12 text-emerald-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome to Digital Lawyer PK
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
              placeholder="Enter your full name"
              value={credentials.name}
              onChange={(e) => setCredentials({...credentials, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CNIC Number
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
              placeholder="XXXXX-XXXXXXX-X"
              value={credentials.cnic}
              onChange={(e) => setCredentials({...credentials, cnic: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
              placeholder="+92 XXX XXXXXXX"
              value={credentials.phone}
              onChange={(e) => setCredentials({...credentials, phone: e.target.value})}
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;