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
require('dotenv').config(); // Load environment variables

// Initialize express
const app = express();

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // Make sure your API key is correctly loaded from .env
});

// Function to get a response from OpenAI
async function getResponse(message) {
  try {
    const params = {
      messages: [{ role: 'system', content: 'You are a Python tutor. Respond in the context of python programming. Refuse non-programming related requests aside from pleseantries.'},
        { role: 'user', content: message }],
      model: 'gpt-4o-mini', // Adjust the model name if needed
      max_tokens: 100, // Change to limit length of response
      temperature: 0,
    };

    const chatCompletion = await client.chat.completions.create(params);
    return chatCompletion.choices[0].message.content; // Extract the content from the response
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error; // Propagate the error to be caught in the route handler
  }
}

// Endpoint to send requests
app.get('/pat', async (req, res) => {
  const { message } = req.query; // Extract 'prompt' from query parameters
  if (!message) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const responseText = await getResponse(message);
    res.status(200).json({ responseText });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define local port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
