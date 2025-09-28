export interface Feedback {
  overallScore: number; // A score from 0 to 4 based on the AP Rubric for Evidence & Commentary
  overallFeedback: string;
  strengths: string[];
  areasForImprovement: string[];
}
