import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenRouter setup (uses OpenAI SDK format)
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const completion = await client.chat.completions.create({
     model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a travel assistant. Give tour plans, budgets, and itineraries."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("ERROR:", error.message);
    res.json({
      reply: "OpenRouter API error 😢 check key or internet"
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});