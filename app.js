const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const multer = require("multer");
const { StudentDB, teacherDB, classDB } = require("./model/mongo");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const upload = multer({ dest: "public/image/" });

app.get("/", (req, res) => {
  res.render("menu");
});
//   برای استفاده از برنامه  body parser , ejs , mongoose , express , multer را نصب کنید

//  نشان دادن صفحه ثبت نام شاگردان **

app.post("/searchStudents", (req, res) => {
  const { teacherSearchStudents, classesSearch, nameSearch } = req.body; // teacher_name:`${teacherSearchStudents}`,// class_student: `${classesSearch}
  let query = {};
  if (nameSearch) query.name_student = nameSearch;
  if (classesSearch && classesSearch !== "")
    query.class_student = classesSearch;
  if (teacherSearchStudents && teacherSearchStudents !== "")
    query.teacher_name = teacherSearchStudents;

  StudentDB.find(query)
    .sort({ createdAt: -1 })
    .then((result) => res.render("showStudents2", { students: result }))
    .catch((err) => console.log(err));
});

app.get("/searchStudent", (req, res) => {
  classDB
    .find()
    .then((result) => {
      StudentDB.find().then((students) => {
        res.render("searchStudent", { result, students });
      });
    })
    .catch((err) => console.log(err));
});

app.get("/tableOFStudentss", (req, res) => {
  const { teacherSearchStudents, classesSearch, nameSearch } = req.body; // teacher_name:`${teacherSearchStudents}`,// class_student: `${classesSearch}

  StudentDB.find({ class_student: `${classesSearch}` })
    .then((result) => res.render("tableOFStudents", { students: result }))
    .catch((err) => console.log(err));
});

app.get("/regestrationStudent", (req, res) => {
  classDB
    .find()
    .then((result) => res.render("studentRegestration", { result }))
    .catch((err) => console.log(err));
});

app.get("/showStudents/:id", (req, res) => {
  const id = req.params.id;

  StudentDB.find({ _id: `${id}` })
    .then((result) => res.render("showStudent", { result }))
    .catch((err) => console.log(err));
});

//       **  ثبت نام شاگردان در دیتایس*****
app.post("/RegestrationStudent", upload.single("photo_student"), (req, res) => {
  const studentInfo = new StudentDB(req.body);
  const photo = `/image/${req.file.filename}`;

  studentInfo.photo_student = photo;
  studentInfo
    .save()
    .then((result) => console.log("save data"))
    .catch((err) => console.log(err));
  res.redirect("/regestrationStudent");
});

//  delete students

app.get("/deleteStudents/:id", (req, res) => {
  const id = req.params.id;
  StudentDB.findByIdAndDelete(id)
    .then((err) => res.redirect("/searchStudent"))
    .catch((err) => console.log(err));
});

// edit students

app.get("/editStudents/:id", (req, res) => {
  const id = req.params.id;
  StudentDB.find({
    _id: `${id}`,
  })
    .then((result) => res.render("editStudents", { result }))
    .catch((err) => console.log(err));
});

app.post("/takeEditInfo/:id", (req, res) => {
  const id = req.params.id; const name = req.body.name;
  const lastname = req.body.lastname;const ID = req.body.ID;
  const number = req.body.number;const subjectEDIT = req.body.subjectEDIT;
  const Class = req.body.Class;const teacher = req.body.teacher;
  const time = req.body.time;const fiss = req.body.fiss;
  const payment_fiss = req.body.payment_fiss;const baqi_fiss = req.body.baqi_fiss;

  StudentDB.findByIdAndUpdate(
    id,
    {
      $set: {
        name_student: name,LastName_student: lastname,id_number: ID,number_student: number,
        subject: subjectEDIT,class_student: Class,teacher_name: teacher,time_student: time,
        all_money: fiss,payment_money: payment_fiss,remaining_money: baqi_fiss,
      },
    },
    { new: true }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// payment money of students
app.get("/tableStudentsforPayment", (req, res) => {
  classDB
    .find()
    .then((result) => {
      StudentDB.find().then((students) => {
        res.render("tableStudentsforPayment", { result, students });
      });
    })
    .catch((err) => console.log(err));
});

//  teacher
app.get("/regestrationTeacher", (req, res) => {
  classDB
    .find()
    .then((result) => res.render("teacherRegestration", { result }))
    .catch((err) => console.log(err));
});

app.get("/showTeacher", (req, res) => {
  teacherDB
    .find()
    .then((result) => res.render("showTeacher", { result }))
    .catch((err) => console.log(err));
});
//   ثبت نام کردن استاد

app.post("/Regester_teacher", upload.single("photo_teacher"), (req, res) => {
  const teacherInfo = new teacherDB(req.body);
  let photo = `/image/${req.file.filename}`;
  teacherInfo.photo_teacher = photo;
  teacherInfo
    .save()
    .then((result) => console.log("regester"))
    .catch((err) => console.log(err));
  res.redirect("/regestrationTeacher");
});

app.get("/showTeacher22/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  teacherDB
    .find({
      _id: `${id}`,
    })
    .then((result) => res.render("showTeacher2", { result1: result }))
    .catch((err) => console.log(err));
});

//                      create class **

app.get("/createClass", (req, res) => {
  res.render("createClass");
});

app.post("/createClass", (req, res) => {
  const saveClass = new classDB(req.body);

  saveClass
    .save()
    .then((result) => console.log("okey every think is good"))
    .catch((err) => console.log(err));
  res.redirect("/createClass");
});



app.get("/runForClass", (req, res) => {
  classDB
    .find()
    .then((result) => res.render("ShowOfClasses", { result }))
    .catch((err) => console.log(err));
});

//  search class

app.post("/searchClass", (req, res) => {
  const { classesSearch, teacherSearchStudents } = req.body;
  let query = {};
  if (classesSearch && classesSearch !== "") query.nameOfClass = classesSearch;
  if (teacherSearchStudents && teacherSearchStudents !== "")
    query.teacherNameOfClass = teacherSearchStudents;

  classDB
    .find(query)
    .then((result) => res.render("ShowClass2", { result }))
    .catch((err) => console.log(err));
});

// show classes of academi

app.get("/showClass", (rea, res) => {
  res.render("showClass");

  // StudentDB.find()
  // .then((result)=> res.render('showClass',{result}) )
  // .catch((err)=> console.log(err))
});
var conter = 0;
StudentDB.find({
  class_student: "وب سایت",
  teacher_name: "ادریس تاجی",
})
  .then((result) => {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].name_student);
      conter++;
    }
    console.log(conter);
  })
  .catch((err) => console.log(err));

app.post("/sssss", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.get("/Class/:string", async (req, res) => {
  try {
    const className = req.params.string;
    const classWithTeachers = await StudentDB.aggregate([
      {
        $match: { class_student: className },
      },
      {
        $group: {
          _id: "$class_student",
          teacher: { $addToSet: "$teacher_name" },
          // students:{$push:"$name_student"},
        },
      },
    ]);

    res.render("showClass", { result: classWithTeachers[0], className });
  } catch (err) {
    console.log(err);
  }

 
});

app.get("/showInformationOfClass/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  var money = 0;
  classDB
    .find({
      _id: `${id}`,
    })
    .then((classSelect) => {
      classSelect.forEach((el) => {
        StudentDB.find({
          time_student: `${el.TimeOfClass}`,
          teacher_name: `${el.teacherNameOfClass}`,
        }).then((students) => {
          students.forEach((el) => {
            money = money + Number(el.payment_money);
          });
          console.log(money);
          res.render("informationOfClass", { students, money });
        });
      });
    })
    .catch((err) => console.log(err));
});

          //  delete class

app.get("/deleteClass/:id",(req,res)=>{
  let id = req.params.id
  classDB
    .findByIdAndDelete(id)
    .then(() => res.redirect("/runForClass"))
    .catch((err) => console.log(err));
});










// salary part
app.get("/salaryPart", (req, res) => {
  res.render("classes");
}); 
var message = "";
app.get("/paymentMoneySt", (req, res) => {
  classDB
    .find()
    .then((result) => res.render("paymentMoneySt", { result, message }))
    .catch((err) => console.log(err));
});

app.post("/PaymentMoneySt", (req, res) => {
  const ns = req.body.name_student;
  const fs = req.body.fatherName_student;
  const id_number = req.body.id_number;
  StudentDB.find({
    id_number: `${id_number}`,
  })
    .then((result) => {
      result.forEach((element) => {
        if (element.name_student == ns && element.fatherName_student == fs) {
          classDB.find().then((result) => {
            res.render("paymentMoneySt", {
              result,
              message: "شاگرد پرداخت کرد",
            });
          });
        } else {
          classDB.find().then((result) => {
            res.render("paymentMoneySt", {
              result,
              message: "شاگرد  اسم و ولد مشخص ندارد",
            });
          });
        }
      });
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});


