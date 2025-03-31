import { GoogleGenerativeAI } from "@google/generative-ai";
import * as Application from 'expo-application';

// Method 1: Direct from Expo config
// const API_KEY = Application.applicationId === 'dev.client' 
//   ? 'your_dev_key' 
//   : 'your_prod_key';

// Method 2: From app.config.js (recommended)
import Constants from 'expo-constants';
// const API_KEY = Constants.expoConfig?.extra?.geminiApiKey;
const API_KEY = "AIzaSyDhYsH_VveegB0tkXDvLw9ukdxU2xBp1UI";


if (!API_KEY) {
  throw new Error("Missing Gemini API Key configuration");
}

const genAI = new GoogleGenerativeAI(API_KEY);


// const genAI = new GoogleGenerativeAI(EXPO_PUBLIC_GEMINI_API_KEY);

// const genAI = new GoogleGenerativeAI(API_KEY || "default_key_if_needed");

// Define chat history structure
interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

// Store conversation history
let chatHistory: ChatMessage[] = [];

export const getChatbotResponse = async (userMessage: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
    });

    // Send message and get response
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    // Update history
    chatHistory.push({
      role: "user",
      parts: [{ text: userMessage }],
    });
    chatHistory.push({
      role: "model",
      parts: [{ text }],
    });

    // Limit response to 2-4 lines
    const trimmedResponse = text.split('\n').slice(0, 4).join('\n');
    return trimmedResponse;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "I'm having trouble responding right now. Could you try again?";
  }
};

export const clearChatHistory = (): void => {
  chatHistory = [];
};