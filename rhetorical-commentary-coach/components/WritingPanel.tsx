
import React from 'react';
import { CLAIM, EVIDENCE } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface WritingPanelProps {
  commentary: string;
  onCommentaryChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const WritingPanel: React.FC<WritingPanelProps> = ({
  commentary,
  onCommentaryChange,
  onAnalyze,
  isLoading,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Your Writing</h2>
      
      <div className="flex-grow flex flex-col">
        <div className="bg-slate-50 p-4 rounded-md mb-4 prose prose-slate max-w-none">
          <p>
            <strong className="text-indigo-600">Claim:</strong> {CLAIM}
          </p>
          <p>
            <strong className="text-teal-600">Evidence:</strong> {EVIDENCE}
          </p>
        </div>

        <label htmlFor="commentary" className="text-lg font-semibold text-slate-800 mb-2">
          Your Commentary:
        </label>
        <textarea
          id="commentary"
          value={commentary}
          onChange={(e) => onCommentaryChange(e.target.value)}
          placeholder="Explain HOW and WHY this evidence proves your claim..."
          className="w-full h-48 p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out flex-grow"
          disabled={isLoading}
        />
      </div>

      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="mt-4 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            Analyze Commentary
          </>
        )}
      </button>
    </div>
  );
};

export default WritingPanel;
