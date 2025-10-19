const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// GET /me endpoint
app.get('/me', async (req, res) => {
  try {
    // Fetch cat fact from external API
    const catFactResponse = await axios.get('https://catfact.ninja/fact', {
      timeout: 5000, // 5 second timeout
    });

    const catFact = catFactResponse.data.fact;

    // Generate current UTC timestamp in ISO 8601 format
    const timestamp = new Date().toISOString();

    // Build response object
    const response = {
      status: 'success',
      user: {
        email: process.env.USER_EMAIL || 'your.email@example.com',
        name: process.env.USER_NAME || 'Your Full Name',
        stack: process.env.USER_STACK || 'Node.js/Express',
      },
      timestamp: timestamp,
      fact: catFact,
    };

    // Set Content-Type header and send response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);

  } catch (error) {
    console.error('Error fetching cat fact:', error.message);

    // Fallback response if Cat Facts API fails
    const timestamp = new Date().toISOString();
    
    res.status(200).json({
      status: 'success',
      user: {
        email: process.env.USER_EMAIL || 'your.email@example.com',
        name: process.env.USER_NAME || 'Your Full Name',
        stack: process.env.USER_STACK || 'Node.js/Express',
      },
      timestamp: timestamp,
      fact: 'Cats are amazing creatures! (Cat Facts API temporarily unavailable)',
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend Wizards API is running!',
    endpoints: {
      profile: '/me'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Endpoint not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the profile endpoint at: http://localhost:${PORT}/me`);
});

module.exports = app;
