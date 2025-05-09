import React from 'react';
import { useLocation } from 'react-router-dom';
import { Gavel, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import type { AIAnalysis } from '../services/gemini';

const Verdict = () => {
  const location = useLocation();
  const { caseDetails, aiAnalysis } = location.state as { 
    caseDetails: any;
    aiAnalysis: AIAnalysis;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-gray-700">
        <div className="flex items-center justify-center mb-8">
          <Gavel className="h-12 w-12 text-emerald-500" />
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Legal Assessment and Recommendations
        </h2>

        <div className="space-y-8">
          <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Applicable Laws
            </h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-medium text-white">Primary Sections:</h4>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  {aiAnalysis.applicableLaws.map((law, index) => (
                    <li key={index}>{law}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Legal Implications
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>{aiAnalysis.legalImplications}</p>
            </div>
          </div>

          <div className="bg-black/20 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Recommended Actions
            </h3>
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3">
                {aiAnalysis.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-emerald-900/20 p-6 rounded-lg border border-emerald-700">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">
              Important Notice
            </h3>
            <p className="text-gray-300">
              This analysis is based on the information provided and serves as a preliminary
              legal assessment generated by AI. It is strongly recommended to consult with a qualified legal
              practitioner for detailed guidance specific to your case. Laws and their
              interpretation may vary based on specific circumstances and jurisdiction.
            </p>
            {aiAnalysis.additionalNotes && (
              <div className="mt-4 pt-4 border-t border-emerald-700">
                <h4 className="font-medium text-emerald-400 mb-2">Additional Notes:</h4>
                <p className="text-gray-300">{aiAnalysis.additionalNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verdict;