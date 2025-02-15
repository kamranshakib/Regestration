const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const multer = require("multer");
const { StudentDB, teacherDB } = require("./model/mongo");
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

app.get("/searchStudent", (req, res) => {

  StudentDB.find().sort({createdAt:-1})
  .then((result) => res.render("tableOFStudents", { students: result }))
  .catch((err) => console.log(err));
}); 

app.post("/searchStudents", (req, res) => {
  const { teacherSearchStudents, classesSearch, nameSearch } = req.body; // teacher_name:`${teacherSearchStudents}`,// class_student: `${classesSearch}
  let query = {};
  if(nameSearch) query.name_student = nameSearch;
  if(classesSearch && classesSearch !=="")
    query.class_student = classesSearch;
  if(teacherSearchStudents && teacherSearchStudents !=="") query.teacher_name = teacherSearchStudents;

  StudentDB.find(query).sort({createdAt : -1})
    .then((result) => res.render("tableOFStudents", { students: result }))
    .catch((err) => console.log(err));

});










// app.post("/searchStudents", (req, res) => {
//   const { teacherSearchStudents, classesSearch, nameSearch } = req.body; // teacher_name:`${teacherSearchStudents}`,// class_student: `${classesSearch}
//   console.log(nameSearch)
//   StudentDB.find({ name_student: `${nameSearch}` })
//     .then((result) => res.render("tableOFStudents", { students: result }))
//     .catch((err) => console.log(err));

// });


app.get('/tableOFStudentss',(req,res)=>{
    const { teacherSearchStudents, classesSearch, nameSearch } = req.body; // teacher_name:`${teacherSearchStudents}`,// class_student: `${classesSearch}

    StudentDB.find({ class_student: `${classesSearch}` })
      .then((result) => res.render("tableOFStudents", { students: result }))
      .catch((err) => console.log(err));
})


app.get("/regestrationStudent", (req, res) => {
  res.render("studentRegestration");
});

app.get("/showStudents/:id", (req, res) => {
  const id = req.params.id;

  StudentDB
  .find({_id : `${id}`})
  .then((result) => res.render('showStudent' , {result}) )
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







// app.get('/findStudents',(req,res)=>{
//     res.render('showStudent')
// })

//            **                      **   پیدا کردن شاگردان از دیتابیس از طریق نام **
// app.post('/findStudent',(req,res)=>{
//     const nameStudent = req.body.search;
//     StudentDB.find(
//             {
//                     name_student: `${nameStudent}`
//                 }
//             )
//             .then((result)=>res.render('showStudent',{studentInfo:result}))
//             .catch((err)=>console.log(err))
// })

//  teacher
app.get("/regestrationTeacher", (req, res) => {
  res.render("teacherRegestration");
});

//   ثبت نام کردن استاد

// app.post('/Regester_teacher', upload.single('photo_teacher'),(req,res)=>{
//     const teacherInfo = new teacherDB(req.body)
//     const photo = `/image/${req.file.filename}`;
//     teacherInfo.photo_teacher = photo;
//     teacherInfo.save()
//     .then((result)=>console.log(result))
//     .catch((err)=>console.log(err))

//     res.redirect('/teacher')
// })






















                      // show classes of academi

 app.get('/showClass',(rea,res)=>{
  res.render('classes')

  // StudentDB.find()
  // .then((result)=> res.render('showClass',{result}) )
  // .catch((err)=> console.log(err))

 })                     
            
//   search classes 

app.post('/searchClass',(req,res)=>{
  let {classesSearch , teacherSearchStudents} = req.body;
  let query = {}
  if(classesSearch && classesSearch !=="") query.class_student = classesSearch;
  if(teacherSearchStudents && teacherSearchStudents !== "") query.teacher_name = teacherSearchStudents

  StudentDB.find(query)
  .then((result) => res.render('showClass',{result}))
  .catch((err)=> console.log(err))

})
                      


app.get('/Class/:string',(req,res)=>{
  const clas = req.params.string;
 
  StudentDB.find({
    class_student: `${clas}`
  })
  .then((result)=> res.render('showClass',{result}))
  .catch((err)=> console.log(err))
  
})





app.listen(3000, () => {
  console.log("Server on port 3000");
});
