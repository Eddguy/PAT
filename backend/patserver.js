/*
*  _________        _________       ________________
* |         |      |         |     |                |
* |   ____   |    |   _____   |    |                |
* |  |    |  |   |   |     |   |   |____        ____|
* |  |    |  |   |   |     |   |        |      |
* |  |____|  |   |   |_____|   |        |      |
* |     ____|    |   _______   |        |      |
* |    |         |  |      |   |        |      |
* |    |         |  |      |   |        |      |
* |____|         |__|      |___|        |______|    
* 
*
* NODE.js Server for PAT - Programming AI Tutor
* --------------------------------------------------
* This file serves the main server for PAT
* 
* Features:
* - Express to handle routing
* - OpenAI integration
* 
*
* Author: Eddie Cubas
* Created: September 2024
* License: MIT   
* 
*/


// Import dependencies
const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const crypto = require("crypto");
require("dotenv").config();

// Initialize express
const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use direct process.env access
});

// Import Routes
const userRoutes = require("./routes/users");
const lessonsRouter = require('./routes/lessons');
const courseOutlineRouter = require('./routes/courseOutline');

// Enable routes
app.use("/users", userRoutes); 
app.use('/lessons', lessonsRouter);
app.use('/course-outline', courseOutlineRouter);

// Function to get a response from OpenAI
async function getResponse(message) {
  try {
    const params = {
      messages: [
        {
          role: "system",
          content:
            "You are a Python tutor. Respond in the context of Python programming. Refuse non-programming related requests aside from pleasantries. 300 max tokens",
        },
        { role: "user", content: message },
      ],
      model: "gpt-4o-mini",
      max_tokens: 400,
      temperature: 0,
    };

    const chatCompletion = await client.chat.completions.create(params);

    if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    return chatCompletion.choices[0].message.content; // Extract content
  } catch (error) {
    console.error(
      "OpenAI API error:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propagate the error
  }
}

// Endpoint to handle chat requests
app.post("/pat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const responseText = await getResponse(message);
    res.status(200).json({ responseText });
  } catch (error) {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error: "Internal server error",
      details: error.response ? error.response.data : "Unknown error",
    });
  }
});

app.post("/execute", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const docker = spawn(
  "C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe",
  [
    "run",
    "--rm",
    "-i",
    "--network",
    "none",
    "--memory=100m",
    "--cpus=0.5",
    "python:3.11-alpine",
    "python",
    "-"
  ]
);

  let stdout = "";
  let stderr = "";

  docker.stdout.on("data", (data) => {
    stdout += data.toString();
  });

  docker.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  docker.on("close", (code) => {
    if (stderr) {
      return res.status(500).json({ error: stderr.trim() });
    }

    res.json({
      output: stdout.trim()
    });
  });

  docker.on("error", (err) => {
  console.error("Failed to start Docker:", err);
});

  docker.stdin.write(code);
  docker.stdin.end();
});

// Define Port
const PORT = process.env.PORT || 8000;

// Start server
// Intialize connection to patdb -> startup node server
// NOTE: MongoDB connection is defined in .env 
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to patdb (MongoDB)");

    // Routes
    app.get("/users", async (req, res) => {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        res.status(500).json({ error: "Failed to retrieve users" });
      }
    });

    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });