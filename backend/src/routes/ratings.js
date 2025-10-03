const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for demo ratings (in production, use a database)
const ratings = [];

// POST /api/ratings - Submit a review/rating
router.post('/', (req, res) => {
  try {
    const { tool_id, user_name, rating, review, title } = req.body;
    
    // Validate required fields
    if (!tool_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing tool_id',
        message: 'tool_id is required to submit a rating'
      });
    }
    
    if (!user_name) {
      return res.status(400).json({
        success: false,
        error: 'Missing user_name',
        message: 'user_name is required to submit a rating'
      });
    }
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Invalid rating',
        message: 'rating must be a number between 1 and 5'
      });
    }
    
    // Create new rating
    const newRating = {
      id: uuidv4(),
      tool_id: tool_id.toString(),
      user_name: user_name.trim(),
      rating: parseFloat(rating),
      review: review ? review.trim() : null,
      title: title ? title.trim() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      helpful_votes: 0,
      verified_purchase: Math.random() > 0.7 // Random verification for demo
    };
    
    // Store the rating
    ratings.push(newRating);
    
    res.status(201).json({
      success: true,
      message: 'Rating submitted successfully',
      rating: newRating
    });
    
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit rating',
      message: error.message
    });
  }
});

// GET /api/ratings/:tool_id - Get ratings for a specific tool
router.get('/:tool_id', (req, res) => {
  try {
    const { tool_id } = req.params;
    const { limit = 10, offset = 0, sort = 'newest' } = req.query;
    
    // Filter ratings for the specific tool
    let toolRatings = ratings.filter(r => r.tool_id === tool_id);
    
    // Sort ratings
    switch (sort) {
      case 'oldest':
        toolRatings.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'highest':
        toolRatings.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        toolRatings.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful':
        toolRatings.sort((a, b) => b.helpful_votes - a.helpful_votes);
        break;
      case 'newest':
      default:
        toolRatings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }
    
    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedRatings = toolRatings.slice(startIndex, endIndex);
    
    // Calculate rating statistics
    const totalRatings = toolRatings.length;
    const averageRating = totalRatings > 0 
      ? toolRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
      : 0;
    
    const ratingDistribution = {
      5: toolRatings.filter(r => r.rating === 5).length,
      4: toolRatings.filter(r => r.rating === 4).length,
      3: toolRatings.filter(r => r.rating === 3).length,
      2: toolRatings.filter(r => r.rating === 2).length,
      1: toolRatings.filter(r => r.rating === 1).length
    };
    
    res.status(200).json({
      success: true,
      ratings: paginatedRatings,
      statistics: {
        total_ratings: totalRatings,
        average_rating: Math.round(averageRating * 10) / 10,
        rating_distribution: ratingDistribution
      },
      pagination: {
        current_page: Math.floor(startIndex / parseInt(limit)) + 1,
        per_page: parseInt(limit),
        total_items: totalRatings,
        total_pages: Math.ceil(totalRatings / parseInt(limit))
      }
    });
    
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ratings',
      message: error.message
    });
  }
});

// GET /api/ratings - Get all ratings (with pagination)
router.get('/', (req, res) => {
  try {
    const { limit = 20, offset = 0, tool_id } = req.query;
    
    let filteredRatings = [...ratings];
    
    // Filter by tool_id if provided
    if (tool_id) {
      filteredRatings = filteredRatings.filter(r => r.tool_id === tool_id);
    }
    
    // Sort by newest first
    filteredRatings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedRatings = filteredRatings.slice(startIndex, endIndex);
    
    res.status(200).json({
      success: true,
      count: filteredRatings.length,
      ratings: paginatedRatings,
      pagination: {
        current_page: Math.floor(startIndex / parseInt(limit)) + 1,
        per_page: parseInt(limit),
        total_items: filteredRatings.length,
        total_pages: Math.ceil(filteredRatings.length / parseInt(limit))
      }
    });
    
  } catch (error) {
    console.error('Error fetching all ratings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ratings',
      message: error.message
    });
  }
});

// PUT /api/ratings/:id/helpful - Mark rating as helpful
router.put('/:id/helpful', (req, res) => {
  try {
    const { id } = req.params;
    
    const rating = ratings.find(r => r.id === id);
    
    if (!rating) {
      return res.status(404).json({
        success: false,
        error: 'Rating not found',
        message: `No rating found with id: ${id}`
      });
    }
    
    rating.helpful_votes += 1;
    rating.updated_at = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      message: 'Rating marked as helpful',
      rating: rating
    });
    
  } catch (error) {
    console.error('Error marking rating as helpful:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark rating as helpful',
      message: error.message
    });
  }
});

module.exports = router;
