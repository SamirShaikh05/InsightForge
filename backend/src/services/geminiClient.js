import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateEnhancedContent(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

  try {
    const { response } = await model.generateContent(prompt);
    return response.text();
  } catch (error) {
    throw new Error(`Gemini failed: ${error.message}`);
  }
}