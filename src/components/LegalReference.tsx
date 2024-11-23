import React from 'react';
import { Book, BookOpen, Scale } from 'lucide-react';
import { legalReferences } from '../data/legalReferences';

interface LegalReferenceProps {
  caseType: string;
  section?: string;
}

const LegalReference: React.FC<LegalReferenceProps> = ({ caseType, section }) => {
  const getLawReferences = () => {
    const laws = legalReferences[caseType as keyof typeof legalReferences];
    if (!laws) return [];

    return Object.entries(laws).flatMap(([key, sections]) => 
      sections.filter(s => !section || s.section === section)
    );
  };

  const references = getLawReferences();

  return (
    <div className="space-y-6">
      {references.map((ref, index) => (
        <div key={index} className="bg-black/20 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-emerald-400 flex items-center">
              <Scale className="h-5 w-5 mr-2" />
              {ref.title}
            </h3>
            <span className="text-sm text-gray-400">Section {ref.section}</span>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">{ref.description}</p>
            
            {ref.punishment && (
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
                <h4 className="font-medium text-red-400 mb-2">Punishment</h4>
                <p className="text-gray-300">{ref.punishment}</p>
              </div>
            )}

            <div className="border-t border-gray-700 pt-4">
              <h4 className="font-medium text-white flex items-center mb-3">
                <Book className="h-4 w-4 mr-2" />
                Book References
              </h4>
              
              {ref.bookReferences.map((book, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-lg mb-3">
                  <h5 className="font-medium text-emerald-400 mb-2">{book.title}</h5>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>Author: {book.author}</li>
                    <li>Edition: {book.edition}</li>
                    <li>Pages: {book.pages}</li>
                  </ul>
                  {book.relevantCases && (
                    <div className="mt-2">
                      <h6 className="text-sm font-medium text-gray-400 mb-1">Relevant Cases:</h6>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {book.relevantCases.map((case_, caseIdx) => (
                          <li key={caseIdx}>{case_}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegalReference;