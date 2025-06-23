const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  section: String,
  subsection: String,
  exerciseNum: Number,
  title: String,
  desc: String,
  solution: String,
  skill_level: { type: Number, default: 1 },
  author: String,
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Lesson', lessonSchema, 'lessons');