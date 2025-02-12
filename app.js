const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const multer = require('multer')
const {StudentDB, teacherDB} = require('./model/mongo')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine' ,'ejs')
app.use(express.static('public'))
const upload = multer({dest: 'public/image/'})

app.get('/',(req,res)=>{
    res.render('menu')
})  
    //   برای استفاده از برنامه  body parser , ejs , mongoose , express , multer را نصب کنید

 
                                        //  نشان دادن صفحه ثبت نام شاگردان **

app.get('/regestrationStudent',(req,res)=>{
    res.render('studentRegestration')


})

                                //       **  ثبت نام شاگردان در دیتایس***** 
app.post('/RegestrationStudent',upload.single('photo_student'),(req,res)=>{

   const studentInfo = new StudentDB(req.body)  
   const photo = `/image/${req.file.filename}`;
    
   studentInfo.photo_student = photo;
   studentInfo.save()
   .then((result)=> console.log('save data'))
   .catch((err)=> console.log(err))
    res.redirect('/regestrationStudent')
}) 

 
// app.get('/findStudents',(req,res)=>{
//     res.render('showStudent')
// })
     
  
//            **                      **   پیدا کردن شاگردان از دیتابیس از طریق نام **
app.post('/findStudent',(req,res)=>{
    const nameStudent = req.body.search;
    StudentDB.find(
            {
                    name_student: `${nameStudent}`
                }
            )
            .then((result)=>res.render('showStudent',{studentInfo:result}))
            .catch((err)=>console.log(err))
})
 

                                //  teacher 
app.get('/regestrationTeacher',(req,res)=>{
    res.render('teacherRegestration')
})


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







app.listen(3000,()=>{
    console.log('Server on port 3000')
})
