import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIHint = async (
  question: string,
  userAnswer: string,
  correctAnswer: string,
  language: Language
): Promise<string> => {
  return "AI hint is temporarily disabled";
};
