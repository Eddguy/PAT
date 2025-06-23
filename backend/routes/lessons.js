const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lessons');

// GET all lessons (optional: paginate or filter later)
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ section: 1, subsection: 1, exerciseNum: 1 });
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET lessons by section and subsection
router.get('/:section/:subsection', async (req, res) => {
  const { section, subsection } = req.params;
  try {
    const lessons = await Lesson.find({ section, subsection }).sort({ exerciseNum: 1 });
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons by section/subsection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new lesson (for future AI-generated content or user submissions)
router.post('/', async (req, res) => {
  const { section, subsection, exerciseNum, title, desc, solution, skill_level, author } = req.body;

  if (!section || !subsection || !exerciseNum || !title || !desc || !solution) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newLesson = new Lesson({
      section,
      subsection,
      exerciseNum,
      title,
      desc,
      solution,
      skill_level: skill_level || 1,
      author: author || 'system',
    });

    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH to update a lesson (e.g., approval, edits)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedLesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(updatedLesson);
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a lesson (optional, for admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Lesson.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Lesson not found' });
    res.json({ message: 'Lesson deleted' });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
