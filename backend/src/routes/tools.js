const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Demo tools data - In production, this would come from a database
const demoTools = [
  {
    id: '1',
    name: 'Text Summarizer',
    description: 'Summarizes long text into concise key points using AI',
    category: 'Natural Language Processing',
    tags: ['text', 'summary', 'nlp'],
    rating: 4.5,
    usage_count: 1250,
    author: 'AI Labs',
    version: '1.2.0',
    demo_available: true,
    pricing: 'free',
    created_at: '2023-08-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Image Generator',
    description: 'Generate stunning images from text descriptions using advanced AI',
    category: 'Computer Vision',
    tags: ['image', 'generation', 'ai-art'],
    rating: 4.8,
    usage_count: 3420,
    author: 'CreativeAI',
    version: '2.1.3',
    demo_available: true,
    pricing: 'premium',
    created_at: '2023-09-22T14:30:00Z'
  },
  {
    id: '3',
    name: 'Code Assistant',
    description: 'AI-powered code completion and bug detection tool',
    category: 'Development Tools',
    tags: ['code', 'programming', 'debugging'],
    rating: 4.3,
    usage_count: 2100,
    author: 'DevTools Inc',
    version: '1.8.7',
    demo_available: true,
    pricing: 'freemium',
    created_at: '2023-07-10T09:15:00Z'
  },
  {
    id: '4',
    name: 'Voice Translator',
    description: 'Real-time voice translation supporting 50+ languages',
    category: 'Audio Processing',
    tags: ['voice', 'translation', 'multilingual'],
    rating: 4.6,
    usage_count: 890,
    author: 'LinguaAI',
    version: '3.0.1',
    demo_available: true,
    pricing: 'premium',
    created_at: '2023-10-01T16:45:00Z'
  },
  {
    id: '5',
    name: 'Data Analyzer',
    description: 'Automated data analysis and visualization tool',
    category: 'Analytics',
    tags: ['data', 'analysis', 'visualization'],
    rating: 4.2,
    usage_count: 1567,
    author: 'DataSoft',
    version: '2.5.2',
    demo_available: false,
    pricing: 'premium',
    created_at: '2023-06-18T11:20:00Z'
  }
];

// GET /api/tools - List all demo tools
router.get('/', (req, res) => {
  try {
    const { category, pricing, demo_only, limit = 20, offset = 0 } = req.query;
    
    let filteredTools = [...demoTools];
    
    // Apply filters
    if (category) {
      filteredTools = filteredTools.filter(tool => 
        tool.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (pricing) {
      filteredTools = filteredTools.filter(tool => 
        tool.pricing === pricing.toLowerCase()
      );
    }
    
    if (demo_only === 'true') {
      filteredTools = filteredTools.filter(tool => tool.demo_available);
    }
    
    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedTools = filteredTools.slice(startIndex, endIndex);
    
    res.status(200).json({
      success: true,
      count: filteredTools.length,
      tools: paginatedTools,
      pagination: {
        current_page: Math.floor(startIndex / parseInt(limit)) + 1,
        per_page: parseInt(limit),
        total_items: filteredTools.length,
        total_pages: Math.ceil(filteredTools.length / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tools',
      message: error.message
    });
  }
});

// GET /api/tools/:id - Get specific tool details
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const tool = demoTools.find(t => t.id === id);
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found',
        message: `No tool found with id: ${id}`
      });
    }
    
    res.status(200).json({
      success: true,
      tool: tool
    });
  } catch (error) {
    console.error('Error fetching tool details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tool details',
      message: error.message
    });
  }
});

// POST /api/tools/run - Execute demo tool
router.post('/run', (req, res) => {
  try {
    const { tool_id, input_data, parameters = {} } = req.body;
    
    // Validate required fields
    if (!tool_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing tool_id',
        message: 'tool_id is required to run a demo tool'
      });
    }
    
    if (!input_data) {
      return res.status(400).json({
        success: false,
        error: 'Missing input_data',
        message: 'input_data is required to run the tool'
      });
    }
    
    // Find the tool
    const tool = demoTools.find(t => t.id === tool_id);
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found',
        message: `No tool found with id: ${tool_id}`
      });
    }
    
    if (!tool.demo_available) {
      return res.status(403).json({
        success: false,
        error: 'Demo not available',
        message: `Demo is not available for tool: ${tool.name}`
      });
    }
    
    // Simulate tool execution with demo results
    const executionId = uuidv4();
    const startTime = new Date();
    
    // Mock processing time (100ms to 2s)
    const processingTime = Math.floor(Math.random() * 1900) + 100;
    
    // Generate mock results based on tool type
    let mockResult;
    switch (tool_id) {
      case '1': // Text Summarizer
        mockResult = {
          summary: "This is a demo summary of the provided text. Key points have been identified and condensed.",
          key_points: [
            "Main concept identified",
            "Secondary themes extracted",
            "Conclusion summarized"
          ],
          confidence_score: 0.85
        };
        break;
      case '2': // Image Generator
        mockResult = {
          image_url: "https://example.com/generated-image-demo.jpg",
          prompt_used: input_data.toString().substring(0, 100),
          style: parameters.style || "default",
          dimensions: "512x512"
        };
        break;
      case '3': // Code Assistant
        mockResult = {
          suggestions: [
            "Consider adding error handling",
            "Variable naming could be improved",
            "Function could be optimized"
          ],
          bugs_detected: 1,
          code_quality_score: 7.5
        };
        break;
      case '4': // Voice Translator
        mockResult = {
          translated_text: "This is a demo translation of the provided audio.",
          source_language: "English",
          target_language: parameters.target_language || "Spanish",
          confidence: 0.92
        };
        break;
      default:
        mockResult = {
          message: "Demo execution completed successfully",
          data: "Mock result for demonstration purposes"
        };
    }
    
    setTimeout(() => {
      // This would normally be handled asynchronously, but for demo we'll return immediately
    }, processingTime);
    
    res.status(200).json({
      success: true,
      execution_id: executionId,
      tool_name: tool.name,
      status: 'completed',
      result: mockResult,
      execution_time_ms: processingTime,
      timestamp: startTime.toISOString(),
      credits_used: 1,
      message: 'Demo execution completed successfully'
    });
    
  } catch (error) {
    console.error('Error running demo tool:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to run demo tool',
      message: error.message
    });
  }
});

module.exports = router;
