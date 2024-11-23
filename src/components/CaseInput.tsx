import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Calendar, MapPin, ArrowRight } from 'lucide-react';

const CaseInput = () => {
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState({
    caseType: '',
    plaintiff: '',
    defendant: '',
    incident: '',
    date: '',
    location: '',
    witnesses: '',
    evidence: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/analysis', { state: { caseDetails } });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <FileText className="h-6 w-6 mr-2 text-emerald-500" />
        Case Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Case Type
            </label>
            <select
              required
              className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
              value={caseDetails.caseType}
              onChange={(e) => setCaseDetails({...caseDetails, caseType: e.target.value})}
            >
              <option value="">Select case type</option>
              <option value="criminal">Criminal</option>
              <option value="civil">Civil</option>
              <option value="family">Family</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Plaintiff Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
              placeholder="Enter plaintiff's name"
              value={caseDetails.plaintiff}
              onChange={(e) => setCaseDetails({...caseDetails, plaintiff: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Defendant Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
              placeholder="Enter defendant's name"
              value={caseDetails.defendant}
              onChange={(e) => setCaseDetails({...caseDetails, defendant: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Incident Date
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
              value={caseDetails.date}
              onChange={(e) => setCaseDetails({...caseDetails, date: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Incident Location
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
            placeholder="Enter incident location"
            value={caseDetails.location}
            onChange={(e) => setCaseDetails({...caseDetails, location: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Incident Description
          </label>
          <textarea
            required
            className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white h-32"
            placeholder="Describe the incident in detail"
            value={caseDetails.incident}
            onChange={(e) => setCaseDetails({...caseDetails, incident: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Witnesses (if any)
          </label>
          <textarea
            className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
            placeholder="List witness names and contact information"
            value={caseDetails.witnesses}
            onChange={(e) => setCaseDetails({...caseDetails, witnesses: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Evidence Description
          </label>
          <textarea
            className="w-full px-4 py-2 bg-black/20 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white"
            placeholder="Describe any evidence you have"
            value={caseDetails.evidence}
            onChange={(e) => setCaseDetails({...caseDetails, evidence: e.target.value})}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          <span>Analyze Case</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default CaseInput;