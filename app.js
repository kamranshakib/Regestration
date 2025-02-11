const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const multer = require('multer')
const {StudentDB, teacherDB} = require('./model/mongo')
// const teacherDB = require('./model/mongoTeacher')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine' ,'ejs')
app.use(express.static('public'))
const upload = multer({dest: 'public/image/'})

app.get('/',(req,res)=>{
    res.render('Regester_student')
})  
 
app.post('/Regester_Student',upload.single('photo_student'),(req,res)=>{
  
   const studentInfo = new StudentDB(req.body)  
   const photo = `/image/${req.file.filename}`;
   if(photo == "") {
        photo = '../public/user.png'
   }
   
   studentInfo.photo_student = photo;
   studentInfo.save()
   .then((result)=> console.log(result))
   .catch((err)=> console.log(err))
    res.redirect('/')
})
app.get('/findStudents',(req,res)=>{
    res.render('findStudents')
})
     
 
app.post('/findStudent',(req,res)=>{
    const nameStudent = req.body.search;
    StudentDB.find(
            {
                    name_student: `${nameStudent}`
                }
            )
            .then((result)=>res.render('findStudents',{studentInfo:result}))
            .catch((err)=>console.log(err))
})
 

app.get('/teacher',(req,res)=>{
    res.render('Regestration_teacher')
})
app.post('/Regester_teacher', upload.single('photo_teacher'),(req,res)=>{
    const teacherInfo = new teacherDB(req.body)
    const photo = `/image/${req.file.filename}`;
    teacherInfo.photo_teacher = photo;
    teacherInfo.save()
    .then((result)=>console.log(result))
    .catch((err)=>console.log(err))

    res.redirect('/teacher')
})
app.listen(3000,()=>{
    console.log('Server on port 3000')
})
