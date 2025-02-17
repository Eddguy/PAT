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
const express = require('express');
const OpenAI = require('openai'); // New import syntax for version 4.63.0
const cors = require('cors'); // Import CORS
require('dotenv').config(); // Load environment variables

// Initialize express
const app = express();

// Apply middleware
app.use(cors()); // Allow cross-origin requests (necessary for frontend)
app.use(express.json()); // Middleware to parse JSON body

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use direct process.env access
});

// Function to get a response from OpenAI
async function getResponse(message) {
  try {
    const params = {
      messages: [
        { role: 'system', content: 'You are a Python tutor. Respond in the context of Python programming. Refuse non-programming related requests aside from pleasantries. 300 max tokens' },
        { role: 'user', content: message },
      ],
      model: 'gpt-4o-mini', // Adjust the model name if needed
      max_tokens: 400, // Limit length of response
      temperature: 0,
    };

    const chatCompletion = await client.chat.completions.create(params);

    if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    return chatCompletion.choices[0].message.content; // Extract content
  } catch (error) {
    console.error("OpenAI API error:", error.response ? error.response.data : error.message);
    throw error; // Propagate the error
  }
}

// Endpoint to handle chat requests
app.post('/pat', async (req, res) => {
  const { message } = req.body; // Extract message from request body

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const responseText = await getResponse(message);
    res.status(200).json({ responseText });
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    res.status(500).json({
      error: "Internal server error",
      details: error.response ? error.response.data : "Unknown error",
    });
  }
});

// Define local port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/pat`);
});
