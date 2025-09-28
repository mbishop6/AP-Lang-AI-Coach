import { GoogleGenAI, Type } from "@google/genai";
import type { Feedback } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const feedbackSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: {
            type: Type.INTEGER,
            description: "A score from 0 to 4 based on the AP English Language rubric for Row B: Evidence and Commentary."
        },
        overallFeedback: {
            type: Type.STRING,
            description: "A concise, one-to-two sentence summary of the commentary's effectiveness in relation to the AP rubric's criteria."
        },
        strengths: {
            type: Type.ARRAY,
            description: "A list of 2-3 specific things the commentary does well, using language from the AP rubric (e.g., 'effectively explains significance of evidence').",
            items: { type: Type.STRING }
        },
        areasForImprovement: {
            type: Type.ARRAY,
            description: "A list of 2-3 specific, actionable suggestions for improvement, using language from the AP rubric (e.g., 'move beyond summary to explain how the evidence supports the claim').",
            items: { type: Type.STRING }
        }
    },
    required: ["overallScore", "overallFeedback", "strengths", "areasForImprovement"]
};


export const evaluateCommentary = async (
    commentary: string,
    claim: string,
    evidence: string
): Promise<Feedback> => {
    
    const prompt = `
        You are an expert AP English Language grader. A student is writing a rhetorical synthesis essay. Your task is to evaluate ONLY the student's commentary and provide a score for Row B (Evidence and Commentary) of the official 6-point rubric.

        Here is the student's work:

        **Claim:** "${claim}"
        
        **Evidence:** "${evidence}"
        
        **Student's Commentary:** "${commentary}"
        
        Please evaluate the student's commentary based on the 0-4 point scale for Row B: Evidence and Commentary.
        
        **AP Rubric Criteria for Row B:**
        - **0 points:** Restates the prompt, paraphrases, or offers irrelevant commentary.
        - **1 point:** Summarizes the evidence but does not explain how it supports the claim.
        - **2 points:** Explains how some of the evidence relates to the claim, but commentary is simplistic or repetitive.
        - **3 points:** Provides commentary that explains how the evidence supports the claim and line of reasoning.
        - **4 points:** Provides commentary that consistently and explicitly explains the significance and relevance of the evidence to the claim and line of reasoning. Demonstrates sophistication of thought.
        
        Based on these criteria, analyze the student's commentary and provide a score and detailed feedback in the requested JSON format. The feedback should be constructive and help the student understand how to improve their score on the AP exam.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: feedbackSchema,
                temperature: 0.4,
            }
        });
        
        const jsonText = response.text.trim();
        const feedbackData = JSON.parse(jsonText);

        // Basic validation to ensure the parsed object matches the Feedback interface
        if (
            typeof feedbackData.overallScore !== 'number' ||
            feedbackData.overallScore < 0 ||
            feedbackData.overallScore > 4 ||
            typeof feedbackData.overallFeedback !== 'string' ||
            !Array.isArray(feedbackData.strengths) ||
            !Array.isArray(feedbackData.areasForImprovement)
        ) {
            throw new Error("Parsed JSON does not match the expected Feedback structure for the AP rubric.");
        }

        return feedbackData as Feedback;

    } catch (error) {
        console.error("Error calling Gemini API or parsing response:", error);
        throw new Error("Failed to get feedback from the AI coach.");
    }
};
