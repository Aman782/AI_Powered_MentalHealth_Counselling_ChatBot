import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/user.models.js";
import { Session } from "../models/session.models.js";
import generateRoomName from "../utils/generateRoomName.js";

dotenv.config({ path: "../.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyC2pDfAX_o5HUb-kLd6CCG83Q7NTn55K3E");
const model = genAI.getGenerativeModel({  model: "gemini-2.0-flash"  });

let stressCount = 0;

export const detectStress = async (userInput) => {
    const prompt = `
  You are a kind and supportive mental health assistant. Respond briefly and directly to the user.The user says:
  "${userInput}"
  `;
  
    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
  
      const parsed = JSON.parse(text);
      console.log("Gemini Emotion Response:", parsed);
  
      return parsed.stress_score || 0;
    } catch (error) {
      console.error("Gemini stress analysis failed:", error);
      return 0;
    }
  };

  
  export const generateAIResponse = async (modifiedInput) => {
    const prompt = `
  You are a kind and supportive mental health assistant. Keep your responses friendly, brief, and helpful.
  
  User says: "${modifiedInput}"
  Assistant:
  `;
  
    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
  
      const cleaned = text
        .replace(/^["']+|["']+$/g, "")
        .replace(/\s+/g, " ")
        .replace(/^.*Assistant:\s*/i, "")
        .trim();
  
      return cleaned;
    } catch (error) {
      console.error("Gemini response failed:", error);
      return "I'm having trouble responding right now. Could you try again in a moment?";
    }
  };

export const handleMessage = async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "userInput is required" });
  }

  try {
    const stressScore = await detectStress(userInput);
    console.log(`Stress Score: `, stressScore);

    // Immediate high-stress response
    if (stressScore > 0.998) {
      return res.json({
        message: "I'm really concerned about you. I'm connecting you to an expert immediately.",
      });
    }

    // High-stress warning
    if (stressScore > 0.95) {
      return res.json({
        message: "I noticed a high level of stress. Would you like to talk to an expert for support?",
      });
    }

    // Repeated stress detection
    if (stressScore > 0.8) {
      stressCount += 1;

      if (stressCount >= 3) {
        stressCount = 0;
        return res.json({
          message: "You've mentioned signs of stress a few times. I'm connecting you to an expert who can help you further.",
        });
      }

      const responseText = await generateAIResponse(
        `${userInput}. Please help the user with a calming response and ask them to share more about what's bothering them.`
      );

      return res.json({
        message: responseText,
      });
    }

    // Regular low-stress conversation
    const responseText = await generateAIResponse(userInput);
    return res.json({ message: responseText });
  } catch (error) {
    console.error("Error handling message:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
