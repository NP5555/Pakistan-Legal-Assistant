import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Scale, Book, ArrowRight, AlertTriangle, RefreshCw } from 'lucide-react';
import LegalReference from './LegalReference';
import { analyzeCaseWithAI, type AIAnalysis } from '../services/gemini';

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const caseDetails = location.state?.caseDetails;

  useEffect(() => {
    if (!caseDetails) {
      setError('No case details provided. Please go back and fill in the case information.');
      setLoading(false);
      return;
    }

    const performAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        const analysis = await analyzeCaseWithAI(caseDetails);
        setAiAnalysis(analysis);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    performAnalysis();
  }, [caseDetails, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleContinue = () => {
    if (!aiAnalysis) return;
    
    navigate('/verdict', { 
      state: { 
        caseDetails,
        aiAnalysis 
      } 
    });
  };

  if (!caseDetails) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-900/20 p-6 rounded-lg border border-red-700">
          <div className="flex items-center text-red-400 mb-4">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Missing Case Details</h3>
          </div>
          <p className="text-gray-300">Please return to the previous page and provide case details.</p>
          <button
            onClick={() => navigate('/case-input')}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
        <p className="mt-4 text-white text-lg">Analyzing your case with AI...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-900/20 p-6 rounded-lg border border-red-700">
          <div className="flex items-center text-red-400 mb-4">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Analysis Error</h3>
          </div>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Scale className="h-6 w-6 mr-2 text-emerald-500" />
          AI-Powered Case Analysis
        </h2>

        <div className="space-y-6">
          <div className="bg-black/20 p-6 rounded-lg border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">Case Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <p><span className="text-white font-medium">Case Type:</span> {caseDetails.caseType}</p>
              <p><span className="text-white font-medium">Date:</span> {caseDetails.date}</p>
              <p><span className="text-white font-medium">Location:</span> {caseDetails.location}</p>
            </div>
          </div>

          {aiAnalysis && (
            <>
              <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-emerald-400 mb-4">AI Analysis Results</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Applicable Laws:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {aiAnalysis.applicableLaws.map((law, index) => (
                        <li key={index}>{law}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Legal Implications:</h4>
                    <p className="text-gray-300">{aiAnalysis.legalImplications}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {aiAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-white">Risk Level:</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      aiAnalysis.risk === 'high' ? 'bg-red-900/50 text-red-400' :
                      aiAnalysis.risk === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-green-900/50 text-green-400'
                    }`}>
                      {aiAnalysis.risk.toUpperCase()}
                    </span>
                  </div>

                  {aiAnalysis.additionalNotes && (
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Additional Notes:</h4>
                      <p className="text-gray-300">{aiAnalysis.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              <LegalReference caseType={caseDetails.caseType} />

              <button
                onClick={handleContinue}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                <span>View Detailed Verdict</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;