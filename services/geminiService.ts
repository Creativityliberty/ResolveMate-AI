import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AnalysisReport, Message } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Initialize a chat session with a specific persona
export const startNegotiationChat = (systemInstruction: string) => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
      temperature: 0.9, // Higher temperature for more emotional/volatile customer behavior
    },
  });
};

// Analyze the transcript as a QA Supervisor
export const analyzeNegotiation = async (messages: Message[]): Promise<AnalysisReport> => {
  const transcript = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.text}`)
    .join('\n');

  const prompt = `
    You are an expert Quality Assurance Supervisor for a Customer Support Center.
    Analyze the following conversation between a SUPPORT AGENT (User) and a CUSTOMER (Model).
    
    Evaluate the Agent based on:
    1. De-escalation techniques (did they calm the customer down?).
    2. Empathy and tone (did they apologize sincerely without being robotic?).
    3. Solution relevance (did they actually solve the problem or just stall?).
    4. Compliance (did they use negative phrasing like "Calm down" instead of "I understand your frustration"?).

    Return a structured JSON report.
    
    Transcript:
    ${transcript}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          csatScore: { type: Type.NUMBER, description: "Customer Satisfaction Score from 1 to 5 (can be float, e.g. 4.5)" },
          empathyScore: { type: Type.NUMBER, description: "Score out of 100 on emotional intelligence" },
          patienceScore: { type: Type.NUMBER, description: "Score out of 100 on keeping cool" },
          solutionRelevance: { type: Type.NUMBER, description: "Score out of 100 on technical accuracy of solution" },
          deEscalationScore: { type: Type.NUMBER, description: "Score out of 100 on ability to reduce tension" },
          keyMoments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Approximate relative time ex: 'Turn 3'" },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['positive', 'negative', 'neutral'] }
              }
            }
          },
          feedback: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              toneAnalysis: { type: Type.STRING, description: "Summary of the agent's tone of voice" },
              forbiddenWordsUsed: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of words/phrases the agent shouldn't have used (e.g. 'Calm down', 'No', 'Impossible')" }
            }
          },
          coachTip: { type: Type.STRING, description: "One golden rule for the next call" }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as AnalysisReport;
  }
  
  throw new Error("Failed to generate report");
};

// --- AUDIO FEATURES ---

/**
 * Transcribes audio blob using Gemini 2.5 Flash
 */
export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Audio,
          },
        },
        {
          text: "Transcribe the following audio exactly as spoken. Do not add any commentary.",
        },
      ],
    },
  });

  return response.text || "";
};

/**
 * Generates speech from text using Gemini 2.5 Flash TTS
 */
export const generateSpeech = async (text: string, voiceName: string = 'Kore'): Promise<ArrayBuffer> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voiceName },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("No audio generated");

  // Decode Base64 to ArrayBuffer
  const binaryString = atob(base64Audio);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * Helper to play audio buffer
 */
export const playAudioBuffer = async (audioBuffer: ArrayBuffer) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const buffer = await audioContext.decodeAudioData(audioBuffer);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
};