import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/user.models.js";
import { ChatHistory } from "../models/chatHistory.models.js";

dotenv.config({ path: "../.env" });

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyC2pDfAX_o5HUb-kLd6CCG83Q7NTn55K3E"
);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let stressCount = 0;

// Detect stress in the user's message
export const detectStress = async (userInput) => {
  const prompt = `
  You are a mental health AI assistant. Based on the user's input, analyze their stress level on a scale from 0 to 1.
  Respond ONLY with a JSON object in the following format: { "stress_score": <number> }

  User input: "${userInput}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // console.log("Raw Gemini response for stress detection:", text);

    let parsed;
    try {
      // Extract JSON if surrounded by explanation
      const match = text.match(/\{[\s\S]*?\}/);
      if (!match) throw new Error("No JSON found in Gemini response.");
      parsed = JSON.parse(match[0]);
    } catch (jsonErr) {
      console.error("Failed to parse Gemini output as JSON:", jsonErr);
      return 0;
    }

    // console.log("Gemini Emotion Response:", parsed);
    return parsed.stress_score || 0;
  } catch (error) {
    console.error("Gemini stress analysis failed:", error);
    return 0;
  }
};

// Generate AI response for normal conversation
export const generateAIResponse = async (modifiedInput) => {
  const prompt = `
  You are a kind and supportive mental health assistant. Provide suggestions in a CLEAR NUMBERED LIST format like this:
1. First suggestion
2. Second suggestion
3. Third suggestion

Avoid using asterisks (*), markdown, or bullet points. Keep each point brief and short.

  User says: "${modifiedInput}"
  Assistant:
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    const cleaned = text
      // Remove markdown formatting (**, *, etc.)
      .replace(/\*+/g, "") // Remove ALL asterisks (**, *, etc.)
      .replace(/^["']+|["']+$/g, "") // Trim quotes
      .replace(/\s{2,}/g, " ") // Collapse multiple spaces
      .replace(/^Assistant:\s*/i, "") // Remove "Assistant:" prefix
      .trim();

    return cleaned;
  } catch (error) {
    console.error("Gemini response failed:", error);
    return "I'm having trouble responding right now. Could you try again in a moment?";
  }
};

// Handle main chat request from frontend
export const handleMessage = async (req, res) => {
  const { userInput } = req.body;
  const userId = req.user._id;

  if (!userInput || !userId) {
    return res.status(400).json({ error: "userInput and userId are required" });
  }

  try {
    let chatHistory = await ChatHistory.findOne({ userId });

    if (!chatHistory) {
      chatHistory = await ChatHistory.create({
        userId,
        messages: [],
      });
    }

    const stressScore = await detectStress(userInput);
    console.log(`Stress Score: `, stressScore);

    if (stressScore > 0.998) {
      return res.json({
        message:
          "I'm really concerned about you. I'm connecting you to an expert immediately.",
      });
    }

    if (stressScore > 0.95) {
      return res.json({
        message:
          "I noticed a high level of stress. Would you like to talk to an expert for support?",
      });
    }

    if (stressScore > 0.8) {
      stressCount += 1;

      if (stressCount >= 3) {
        stressCount = 0;
        return res.json({
          message:
            "You've mentioned signs of stress a few times. I'm connecting you to an expert who can help you further.",
        });
      }

      const responseText = await generateAIResponse(
        `${userInput}. Please help the user with a calming response and ask them to share more about what's bothering them.`
      );

      return res.json({
        message: responseText,
      });
    }

    // Format history for Gemini
    const history = chatHistory.messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    // Send message properly
    const result = await chat.sendMessage(userInput);
    const geminiResponse = await result.response.text();

    chatHistory.messages.push({ role: "user", content: userInput });
    chatHistory.messages.push({ role: "model", content: geminiResponse });

    const saved = await chatHistory.save();
    console.log("Saved chat:", saved);

    return res.json({ message: geminiResponse });
  } catch (error) {
    console.error("Chat handling failed:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
