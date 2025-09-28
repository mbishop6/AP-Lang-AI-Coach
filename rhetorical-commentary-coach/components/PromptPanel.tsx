
import React from 'react';
import { ESSAY_PROMPT, SOURCES } from '../constants';

const PromptPanel: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Your Task</h2>
      <div className="prose prose-slate max-w-none flex-grow overflow-y-auto" style={{maxHeight: '80vh'}}>
        <div className="bg-slate-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Essay Prompt</h3>
          <p className="text-slate-700 whitespace-pre-wrap">{ESSAY_PROMPT}</p>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Sources</h3>
        <div className="space-y-4">
          {SOURCES.map(source => (
            <details key={source.id} className="bg-white border border-slate-200 rounded-md">
              <summary className="font-semibold p-3 cursor-pointer">
                Source {source.id}: {source.author}
              </summary>
              <div className="p-3 border-t border-slate-200">
                <p className="italic text-sm text-slate-600">"{source.title}"</p>
                <p className="mt-2 text-slate-700">{source.text}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptPanel;
