const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

// IMPORTANT: Make sure your API key is in your environment variables.
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY environment variable is not set.");
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the route to handle chat requests
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Use the gemini-pro model for text-only input
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ aiResponse: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Sorry, I'm having trouble responding right now." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
            
