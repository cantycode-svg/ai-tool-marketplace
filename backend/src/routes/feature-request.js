const express = require('express');
const router = express.Router();

// POST /feature-request - Submit a feature request
router.post('/', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ 
        error: 'Title and description are required' 
      });
    }
    
    // Here you would typically save to database
    // For now, return a success response
    res.status(201).json({
      message: 'Feature request submitted successfully',
      featureRequest: {
        id: Date.now(), // Placeholder ID
        title,
        description,
        userId: userId || null,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error submitting feature request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
