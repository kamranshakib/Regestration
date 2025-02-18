const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Regestration")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name_student: {
      type: String,
      required: true,
      maxwidth: 50,
      minWidth: 3,
    },
    fatherName_student: {
      type: String,
      required: true,
      maxwidth: 50,
      minWidth: 3,
    },

    LastName_student: {
      type: String,
      required: true,
      maxwidth: 100,
      minWidth: 3,
    },
   
    number_student: {
      type: Number,
      required: true,
      minWidth: 10,
      maxwidth: 10,
    },
   
    number_father: {
      type: Number,
      required: true,
      minWidth: 10,
      maxwidth: 10,
    },
    number_pasport: {
      type: Number,
      required: true,
      minWidth: 50,
      maxwidth: 8,
    },
    address_student: {
      type: String,
      required: true,
    },
    photo_student: {
        type: String,
        required: false,
      },
    subject: {
      type: String,
      required: true,
    },
    teacher_name: {
      type: String,
      required: false,
    },
    id_number: {
      type: String,
      required: false,
    },
    date_student: {
      type: String,
      required: false,
    },
    time_student: {
      type: String,
      required: false,
    },
    all_money: {
      type: String,
      required: false,
    },
    payment_money: {
      type: String,
      required: false,
    },
    remaining_money: {
      type: String,
      required: false,
    },
    matigate: {
      type: String,
      required: false,
    },
    class_student: {
      type: String,
      required: false,
    }
   
  },
  { timestamps: true }
);


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
      email_teacher: {
        type: String,
      },
     
      number_pasport_teacher: {
        type: Number,
        minWidth: 2,
        maxwidth: 50,
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
      
      salary_fisad:{
        type:String
      },
      salary_hour:{
        type:String
      },
      salary_month:{
        type:String
      },

      subject_salary_teacher:{
        type: String
      }

},{timestamps: true})



        //   DB for classes 
        
  const classes = new Schema({
    nameOfClass: {
      type: String
    },
    teacherNameOfClass: {
      type: String
    },
    TimeOfClass : {
      type: String
    },
    moneyOfeveryStClass : {
      type: String
    },
    startDateOfClass : {
      type: String
    },
    FinishDateOfClass : {
      type: String
    }
   
  },{timestamps:true})




const classDB = mongoose.model('Class',classes)
const teacherDB = mongoose.model('teacher',teacherInfo )

const StudentDB = mongoose.model("Students", studentSchema);

module.exports={teacherDB, StudentDB,classDB}