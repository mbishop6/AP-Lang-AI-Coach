import React, { useState, useCallback } from 'react';
import PromptPanel from './components/PromptPanel';
import WritingPanel from './components/WritingPanel';
import FeedbackPanel from './components/FeedbackPanel';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { evaluateCommentary } from './services/geminiService';
import { CLAIM, EVIDENCE } from './constants';
import type { Feedback } from './types';

const App: React.FC = () => {
  const [commentary, setCommentary] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!commentary.trim()) {
      setError('Please write some commentary before analyzing.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const result = await evaluateCommentary(commentary, CLAIM, EVIDENCE);
      setFeedback(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred while analyzing your commentary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [commentary]);

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <main className="container mx-auto p-4 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">AP® Rhetorical Analysis Commentary Coach</h1>
          <p className="text-lg text-slate-600 mt-2">Hone your synthesis essay skills with AI feedback aligned with the official AP® English Language rubric.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <PromptPanel />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1 flex flex-col">
              <WritingPanel
                commentary={commentary}
                onCommentaryChange={setCommentary}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
            </div>
            <div className="md:col-span-1 flex flex-col">
              <FeedbackPanel
                feedback={feedback}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Powered by Google Gemini. AP® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this product.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
