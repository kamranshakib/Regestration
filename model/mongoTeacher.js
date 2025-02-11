const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const teacherInfo = new Schema({

    name_teacher: {
        type: String,
        maxwidth: 50,
        minWidth: 3,
      },
      fatherName_teacher: {
        type: String,
        maxwidth: 50,
        minWidth: 3,
      },
      LastName_teacher: {
        type: String,
        maxwidth: 100,
        minWidth: 3,
      },
     
      number_teacher: {
        type: Number,
        minWidth: 10,
        maxwidth: 10,
      },
     
      number_pasport_teacher: {
        type: Number,
        minWidth: 50,
        maxwidth: 8,
      },
      address_teacher: {
        type: String,
      },
      photo_teacher: {
          type: String,
          required: false,
        },
      subject_teacher: {
        type: String,
      },
      edu_teacher: {
        type: String,
      },
      salary_teacher: {
        type: String,
      },
      class_teacher: {
        type: String,
      },

},{timestamps: true})

module.exports = mongoose.model('teacher',teacherInfo )