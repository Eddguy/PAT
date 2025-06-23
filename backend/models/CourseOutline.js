const mongoose = require('mongoose');

const courseOutlineSchema = new mongoose.Schema({
  _id: String,
  sectionTitle: String,
  subsections: [
    {
      id: String,
      title: String
    }
  ]
}, { versionKey: false });

module.exports = mongoose.model('CourseOutline', courseOutlineSchema, 'course_outline');