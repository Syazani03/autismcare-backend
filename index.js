// Trigger deploy test

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('AutismCare API is live 🚀');
});

// Chat route
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  // ✅ Debug log to confirm key is loaded
  console.log("🔑 OpenAI Key Present:", !!process.env.OPENAI_API_KEY);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
              You are a supportive autism care assistant for Malaysian mothers raising children with autism.
              Answer only autism-related questions — such as diagnosis, behavior, therapies, emotional support, or local context in Malaysia.
              Always be kind, respectful, and informative.
              Refer to research like: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10774556/
              Do not answer unrelated questions.
            `
          },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply });

  } catch (error) {
    console.error("🔴 OpenAI API error:");
    console.error(error.response?.status);      // HTTP status code
    console.error(error.response?.data);        // Error details
    console.error(error.message);               // Fallback message

    res.status(500).json({ error: 'Failed to fetch reply from OpenAI' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
