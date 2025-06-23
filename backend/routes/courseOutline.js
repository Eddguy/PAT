const express = require('express');
const router = express.Router();
const CourseOutline = require('../models/CourseOutline');

// GET full course outline
router.get('/', async (req, res) => {
  try {
    const outline = await CourseOutline.find({});
    res.json(outline);
  } catch (error) {
    console.error('Error fetching course outline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET specific section by ID (optional)
router.get('/:sectionId', async (req, res) => {
  const { sectionId } = req.params;
  try {
    const section = await CourseOutline.findById(sectionId);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
