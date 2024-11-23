import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAlAhvg07qmKKVfB1UVpgDATV6_kWYZy2k');

export interface CaseDetails {
  caseType: string;
  plaintiff: string;
  defendant: string;
  incident: string;
  date: string;
  location: string;
  witnesses: string;
  evidence: string;
}

export interface AIAnalysis {
  applicableLaws: string[];
  legalImplications: string;
  recommendations: string[];
  risk: 'low' | 'medium' | 'high';
  additionalNotes?: string;
}

const validateAIResponse = (response: any): AIAnalysis => {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid AI response format');
  }

  if (!Array.isArray(response.applicableLaws) || !response.applicableLaws.length) {
    throw new Error('Missing or invalid applicable laws in AI response');
  }

  if (typeof response.legalImplications !== 'string' || !response.legalImplications) {
    throw new Error('Missing or invalid legal implications in AI response');
  }

  if (!Array.isArray(response.recommendations) || !response.recommendations.length) {
    throw new Error('Missing or invalid recommendations in AI response');
  }

  if (!['low', 'medium', 'high'].includes(response.risk)) {
    throw new Error('Invalid risk level in AI response');
  }

  return response as AIAnalysis;
};

export async function analyzeCaseWithAI(caseDetails: CaseDetails): Promise<AIAnalysis> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    You are a legal expert in Pakistani law. Analyze this case and provide a response in valid JSON format only.
    Do not include any additional text before or after the JSON.
    
    Case Details:
    - Type: ${caseDetails.caseType}
    - Description: ${caseDetails.incident}
    - Date: ${caseDetails.date}
    - Location: ${caseDetails.location}
    - Evidence: ${caseDetails.evidence}
    - Witnesses: ${caseDetails.witnesses}

    Respond with a JSON object containing:
    {
      "applicableLaws": ["Specific sections from Pakistani law that apply"],
      "legalImplications": "Detailed analysis of legal consequences",
      "recommendations": ["List of specific actions to take"],
      "risk": "low|medium|high",
      "additionalNotes": "Any important considerations"
    }

    Ensure all laws referenced are from actual Pakistani legal codes.
    Base risk assessment on severity and evidence strength.
    Keep responses focused on Pakistani jurisdiction.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    try {
      const parsedResponse = JSON.parse(text.trim());
      return validateAIResponse(parsedResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      throw new Error('The AI response was not in the expected format. Please try again.');
    }
  } catch (error) {
    console.error('Error during AI analysis:', error);
    if (error instanceof Error) {
      throw new Error(`AI Analysis failed: ${error.message}`);
    }
    throw new Error('Failed to analyze case. Please try again later.');
  }
}