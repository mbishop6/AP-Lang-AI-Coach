import React from 'react';
import type { Feedback } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface FeedbackPanelProps {
  feedback: Feedback | null;
  isLoading: boolean;
  error: string | null;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h3 className="text-lg font-semibold text-slate-700">Your coach is thinking...</h3>
          <p className="text-slate-500">Analyzing your commentary against the AP® rubric.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-red-50 p-4 rounded-lg">
          <XCircleIcon className="w-12 h-12 text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-red-800">Oops!</h3>
          <p className="text-red-700">{error}</p>
        </div>
      );
    }
    
    if (!feedback) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          <h3 className="text-lg font-semibold text-slate-700">Feedback Appears Here</h3>
          <p className="text-slate-500">Write your commentary and click "Analyze" to get instant feedback based on the AP® rubric.</p>
        </div>
      );
    }
    
    const getScoreColor = (score: number) => {
        switch (score) {
            case 4: return 'bg-green-500';
            case 3: return 'bg-lime-500';
            case 2: return 'bg-yellow-500';
            default: return 'bg-red-500'; // For 0 and 1
        }
    }
    const scoreColor = getScoreColor(feedback.overallScore);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-slate-800">Evidence & Commentary Score: {feedback.overallScore}/4</h3>
          <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
            <div className={`${scoreColor} h-2.5 rounded-full`} style={{ width: `${feedback.overallScore * 25}%` }}></div>
          </div>
        </div>

        <div>
            <h3 className="font-semibold text-slate-800 mb-2">Coach's Summary:</h3>
            <p className="text-slate-700 bg-slate-50 p-3 rounded-md">{feedback.overallFeedback}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-green-700 flex items-center mb-2"><CheckCircleIcon className="w-5 h-5 mr-2"/>Strengths</h3>
          <ul className="list-none space-y-2 pl-0">
            {feedback.strengths.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">&#10003;</span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-yellow-700 flex items-center mb-2"><XCircleIcon className="w-5 h-5 mr-2"/>Areas for Improvement</h3>
          <ul className="list-none space-y-2 pl-0">
            {feedback.areasForImprovement.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-500 mr-2 mt-1">&#8680;</span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">AP® Rubric Feedback</h2>
      <div className="h-full min-h-[300px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default FeedbackPanel;
