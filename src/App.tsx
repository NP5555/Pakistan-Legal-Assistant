import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Scale, Shield } from 'lucide-react';
import Welcome from './components/Welcome';
import CaseInput from './components/CaseInput';
import Analysis from './components/Analysis';
import Verdict from './components/Verdict';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <nav className="bg-black/40 backdrop-blur-sm border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Scale className="h-8 w-8 text-emerald-500" />
                <span className="ml-2 text-xl font-bold text-white">Digital Lawyer PK</span>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="h-6 w-6 text-emerald-500" />
                <span className="text-gray-300">Pakistan Legal Assistant</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/case-input" element={<CaseInput />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/verdict" element={<Verdict />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;