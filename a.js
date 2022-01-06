const express = require('express')
const app = express()
const debug = require('debug')('myapp:server')
const path = require('path')
const multer = require('multer')
const logger = require('morgan')
const serveIndex = require('serve-index')
const bodyparser = require('body-parser')
const cors = require('cors')
const request = require('request')
const fs = require('fs')
const db = require("./dbmult")
const firebase = require("./firebase")
const port = 2000

////////Now working on Facedetect api stuff so all within this bar//
const faceapi = require('face-api.js')
const { canvas, faceDetectionNet, faceDetectionOptions, saveFile } = require('./commons')


////////////////////////////////////////////////////////////////////////////

app.use(bodyparser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

var storage = multer.diskStorage({
    destination: (req, file, cb) => {


        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//will be using this for uplading
const upload = multer({ storage: storage }).single('usr')

//get the router
//const userRouter =require('./routes/user.route');

app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));

app.use('/ftp', express.static('public'), serveIndex('public', { 'icons': true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\sections' + '\\loginform.html')
})

// app.post('/testUpload', upload.single('file'), function (req, res) {
//     //debug(req.files)
//     console.log("filename " + req.file.filename)

//     // now this will give us the file name
//     // db.insertMultiUser()


//     ///////// test work //////////////


//     //     for(var key in req) {
//     //         var value = req[key];

//     // console.log(value+" LOL look at this potato")


//     //       }
//     //console.log(JSON.stringify(req, null, 4))

//     // console.log("Session: %j", req.files[0].filename);  // the right way to send an recieve path
//     // stuff from an array object dictionary circular structure


//     // prettyJSON(req)


//     ///////// test work //////////////

//     // db.insertMulterUser(req.file).then((result) => res.send(result))
//     //     .catch((error) => res.status(400).send(error))

//     let filepath = path.join('public','uploads',req.file.filename)

//     // users collections send userid find userid if fined then update set {imagepath: filepath}

//     res.send({path: filepath})


//     ///DB WORK///

//     // return res.send(req.files)
// })


// function prettyJSON(req) {
//     console.log(JSON.stringify(req, null, 2) + "??/////");
// }

// app.get('/rasheed', (req, res) => {
//     res.send
// })

//if end point is /users/, use the router.
//app.use('/users', userRouter);



// app.get('/getallusers', (req, res) => {
//     db.getallusr((result) => res.send(result))
//     // fs.mkdirSync(__dirname+'/getnone')
// })


////////Now working on Facedetect api stuff so all within this bar//

app.get('/facedetection', (req, res) => {

    run().then(data => res.send(data)).catch(error => console.log(error))
    //  run().then(data => res.send("Hello")).catch(error => console.log(error))
    // db.getallusr((result) => res.send(result))
    // fs.mkdirSync(__dirname+'/getnone')
})

async function run() {
    await faceDetectionNet.loadFromDisk('./weights')

    const img = await canvas.canvas.loadImage('a.jpg')
    detections = await faceapi.detectAllFaces(img, faceDetectionOptions)
    out = faceapi.createCanvasFromMedia(img)
    faceapi.draw.drawDetections(out, detections)
    return out.toBuffer('image/jpeg')
    // return detections
}




app.get('/facer', async (req, res, next) => {
    try {
        // query get the user by id

        runrec().then(data => res.send(data)).catch(error => console.log(error))
    } catch (err) {
        next(err)

    }



})


//////////////////////////////////////Databse work below////////////////////////////////////////


app.post("/insertSudent", (req, res) => {
    //console.log(req.header().token)
    console.log(req.get("token")) // token for verification so that not anyone can send data in registration



    let user = req.body
    db.inserst(user).then((result) => {
        if (result.error) {
            res.status(400).send(result)
        } else {
            res.send(result)
        }
    }).catch((error) => res.status(400).send(error))


})


app.post("/insertteacher", async (req, res) => {
    //console.log(req.header().token)
    //   console.log(req.get("token")) // token for verification so that not anyone can send data in registration

    let usert1 = req.body

    if (usert1 === null) {
        res.send({ message: "fields missing in given" })
        //res.header()

        //  location.replace("teachrg")
    }

    let user = {
        t_name: usert1.t_name,
        t_id: usert1.t_id,
        passd: usert1.passd,
        depart: usert1.depart,
        subject: JSON.parse(req.body.subject)
    }
    console.log(user)




    /////////////// ///////////////////////////////  
    let flag = true

    let idcheck = user.t_id
    console.log(idcheck + " ABC")
    let attendancefr = firebase.admin.firestore().collection('teacher')
        .where('t_id', '==', idcheck)
    await attendancefr.get().then(snap => {
        snap.forEach(doc => {
            if (!doc.empty) {
                console.log('teacher found');
                flag = false
                return
            }
        })
    }).catch(err => { res.send({ message: 'error while gettin data from FireBase' }) })

    console.log(flag + " TEST ")



    if (flag === true) {


        await firebase.admin.firestore().collection('teacher').doc().set(user)

        await db.insertteach(user).then((result) => {
            console.log(result)
            if (result.error) {

                res.status(400).send({ message: "Error while adding to Mongodb" })
                //D:\FYPstuff\servermaking\f_I_upoadt2\public\uploads

            }
        }).catch((error) => res.status(400).send(error))

        res.redirect(`http://${location.hostname}:2000/createteacher?message=Teacher Added in Record`)
    } else {
        res.redirect(`http://${location.hostname}:2000/createteacher?message=Teacher Already in Record`)
    }





    // db.insertteach(user).then((result) => {
    //     if (result.error) {
    //         res.status(400).send(result)
    //     } else {
    //         res.send(result)
    //     }
    // }).catch((error) => res.status(400).send(error))
})

//adding admin
app.post("/insertadmin", (req, res) => {
    //console.log(req.header().token)
    //   console.log(req.get("token")) // token for verification so that not anyone can send data in registration



    let user = req.body





    db.insertadmin(user).then((result) => {
        if (result.error) {
            res.status(400).send(result)
        } else {
            res.send(result)
        }
    }).catch((error) => res.status(400).send(error))


})

// app.post("/insertsubject",(req,res)=>{


// })



/////////////register student below ->> :P
app.post("/l", async (req, res) => {
    let IP=req.connection.remoteAddress
    console.log(IP)
    res.send("Hello")

    upload(req, res, async (err) => {
        if (err) {
            return res.send("error uploading")
        }
        else {
            let filepath = path.join('public', 'uploads', req.file.filename)

            // users collections send userid find userid if fined then update set {imagepath: filepath}
            let x = { imagepath: filepath }

            console.log(x)



            // console.log(req.body.name_student)
            console.log(req.body.id)
            console.log(req.body)
            console.log(req.body.subjects)
            console.log(typeof (req.body.subjects))

            let test = JSON.parse(req.body.subjects)
            let arr = []

            test.forEach(element => {
                arr.push(element.sbt_id)


            })

            //    arr.forEach(element=>{
            //        console.log(element+ " XD ")
            //    })



            //  return


            let student = {
                name_student: req.body.name_student,
                id: req.body.id,
                passd: req.body.passd,
                dpt: req.body.depart,
                sbj: JSON.parse(req.body.subjects),
                imagepath: filepath,
                arrid: arr
            }

            // function trimObjValues(obj) {
            //     return Object.keys(obj).reduce((acc, curr) => {
            //       acc[curr] = obj[curr].trim()
            //       return acc;
            //     }, {});
            //   }


            //   const ex = {a: ' a', b: ' b', c: ' c'};
            //   console.log(trimObjValues(ex));


            // student=JSON.stringify(student)


            let flag = true

            let idcheck = req.body.id
            let attendancefr = firebase.admin.firestore().collection('student')
                .where('id', '==', idcheck)
            await attendancefr.get().then(snap => {
                snap.forEach(doc => {
                    if (!doc.empty) {
                        console.log('student found');
                        flag = false
                        return
                    }
                })
            }).catch(err => { res.redirect(`http://${location.hostname}:2000/getstregister?message=error while gettin data from`) })
            // res.send({ message: 'error while gettin data from' }) })





            if (flag === true) {


                await firebase.admin.firestore().collection('student').doc().set(student)

                await db.inserstt1(student).then((result) => {
                    console.log(result)
                    if (result.error) {
                        let filepathh = path.join(__dirname, filepath)
                        console.log(filepathh)
                        fs.unlink(filepathh, (err) => {
                            if (err) res.status(400).send({ message: 'unable to delete image' })
                            else res.status(400).send(result)

                        })    //D:\FYPstuff\servermaking\f_I_upoadt2\public\uploads

                    }
                }).catch((error) => res.status(400).send(error))


                res.redirect(`http://localhost:2000/getstregister?message=Student Added in Record`)
            } else {
                res.redirect(`http://localhost:2000/getstregister?message=Student Already in Record`)
            }
        }
    })
})

//insert subject below
app.post("/insertsubject", (req, res) => {
    console.log(JSON.stringify(req.body))

    let d = new Date()
    let month = d.getMonth().toString()
    let year = d.getFullYear()

    console.log(month)

    console.log(year)

  
    let semester = "Null"    // here month starts from 11
    switch (month) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
            semester = ("Spring " + year)

            break
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
        case '11':
            semester = ("Fall " + year)
            break
    }
    console.log(semester)






    // sub.semester=semster



  //  let subjectone = req.body
    let subject = {
        sbt_id: req.body.sbt_id,
        sbt_name: req.body.sbt_name,
        semester: semester
    }





    console.log(subject.sbt_id)
    db.insertsub(subject).then((result) => {   //Object.keys(obj).length === 0
    //     if(result.keys(message).length !==0) res.send(result)
    //    else if(result.error) res.status(400).send({message:"An error occured while adding record"})
    //     else if(result.result.n !== 1) res.send({message:"Subjects wern't added into storage"})
    //     else res.send({message:"Subjects added in record"})

    res.send(result)
        



    }).catch((error) => res.status(400).send(error))
    // res.send(subject)


})


app.get("/getsubjectsbyid", (req, res) => {
    let id = req.query.sbt_id


})

app.get("/getallsubjects", async (req, res) => {


    let result = await db.getallSub()
    console.log(result[1])
    res.send(JSON.stringify(result))


})


// check type of input in get and convert to number etc
app.get("/getadfff", async (req, res) => {
    // let ida=req.body.id
    // console.log(ida.message+"Test  4")


    // if(Object.keys(ida.message).length === 0){
    //     res.send({message:"Missing email or Password"})
    //     return
    // }

    let id = req.query.id
    let passd = req.query.passd

    //  let passd=req.query.passd 
    let result = await db.getadd(id, passd)

    // if(Object.entries(result).length===0){
    //     res.send({message:"Enter certain ID and Password PLease"})
    // }
    console.log("It IS coming here")

    if (result < 1) res.status(400).send("Db error")
    else if (result.message) {
        res.status(400).send(result)
    }

    else {
        console.log(result)   // res.sendFile(__dirname + '\\public' +'\\AASystem'+'admin'+'pages'+'\\admin-dashboard.html')
        // let timestampadmin={
        //     timestampadmin: Date.now()
        // }
        // await firebase.admin.firestore().collection('adminLog').doc().set(timestampadmin).catch((err)=>res.status(404).send({message:"Firebase data entry error occured"}))


       

        


        res.send(result) // res.sendFile(__dirname + '\\public' + '\\admin-menu.html')
    }



})
app.get("/gett", async (req, res) => {


    if (Object.keys(req).length === 0) {
        res.send({ message: "Missing email or Password" })
    }

    let id = req.query.id
    let passd = req.query.passd

    //  let passd=req.query.passd 
    let result = await db.gettdd(id, passd)

    // if(Object.entries(result).length===0){
    //     res.send({message:"Enter certain ID and Password PLease"})
    // }

    if (result < 1) res.status(400).send("Db error")
    else if (result.message) {
        res.status(400).send(result)
    }

    else {
        // console.log(result)   // res.sendFile(__dirname + '\\public' +'\\AASystem'+'admin'+'pages'+'\\admin-dashboard.html')
        // let timestampadmin={
        //     timestampadmin: Date.now()
        // }
        // await firebase.admin.firestore().collection('adminLog').doc().set(timestampadmin).catch(async(err)=>res.status(404).send({message:"Firebase data entry error occured"}))
      
      
        res.send(result) // res.sendFile(__dirname + '\\public' + '\\admin-menu.html')
    }



})


app.get('/getallusers', (req, res) => {
    db.getallusr((result) => res.send(result))
    // fs.mkdirSync(__dirname+'/getnone')
})
app.get("/getTempattendance", async (req, res) => {

    let sbt_id = req.query.sbt_id
    let semester = req.query.semester
    //  let sbt_semester=

    let record = await db.gettempattendanceManualattendance(sbt_id, semester)
    res.send(record)
})

app.get("/getstregisteredinsub", async (req, res) => {
    let sbt_id = req.query.sbt_id
    let semester = req.query.semester

    let record = await db.getregisterstinsub(sbt_id, semester)
    if (record.message) {
        res.status(400).send({ message: "No Student reecord or Temporary Database" })
    } else res.send(record)
})



//studentreginatsub  given students with the id and match ids to get absent and then store in temp
app.get("/studentreginatsub", async (req, res) => {
    let sbt_id = req.query.sbt_id
    let semester = req.query.semester

    let record = await db.getregisterstinsub(sbt_id, semester)
    // console.log(record[2])  //so record is an array
    //res.send(record)

    let temp_attend_record = await db.gettempattendanceManualattendance(sbt_id, semester)
    //res.send(temp_attend_record)

    console.log(typeof (record.id))


    //console.log(record[0].id)
    //res.send(temp_attend_record)


    console.log(JSON.stringify(record.length) + " Length of record")

    let i = 0



    if (record.message) {
        res.send({ message: "No Student reecord or Temporary Database" })
    }
    if (temp_attend_record.message) {
        res.send({ message: "No Student reecord or Temporary Database" })

    }

    while (i < record.length) {
        console.log(record[i].id + " STtuden ID on check ")
        if (temp_attend_record.some(item => item.student_id === record[i].id)) {


            console.log(record[i].id + "attendance marked")
            i++
        } else {   //for people absent in class
            let timestamp = Date.now()
            // console.log(timestamp)
            //   let month = month = document.forms.date.month.value;
            //inserting into temporary db
            // let d = new Date()
            // let month = d.getMonth().toString()
            // let year = d.getFullYear()

            // console.log(month)

            // console.log(year)


            // let semester = "Null"    // here month starts from 11
            // switch (month) {
            //     case '0':
            //     case '1':
            //     case '2':
            //     case '3':
            //     case '4':
            //     case '5':
            //         semester = ("Spring " + year)

            //         break
            //     case '6':
            //     case '7':
            //     case '8':
            //     case '9':
            //     case '10':
            //     case '11':
            //         semester = ("Fall " + year)
            //         break
            // }
            // console.log(semester)


            //   console.log(typeof (timestamp))

            let temp_attendance = {
                student_name: record[i].name_student,
                student_id: record[i].id,
                attendance_status: "A",
                subject_id: sbt_id,
                timestamp: timestamp,
                semester: semester

            }
            console.log(temp_attendance.student_id + " is Absent with iteration number= " + i)

            let temp_attendance_check = await db.temporarydb(temp_attendance)

            if (temp_attendance_check) {
                i++
            }

            // console.log(temp_attendance_check + " lol checking ")

            //  res.send(temp_attendance_check)

        }

    }




    let temp_attend_record_final = await db.gettempattendanceManualattendance(sbt_id, semester)

    res.send(temp_attend_record_final)











})

// app.get(for)



/////////////////////////////////////Databse work above///////////////////////////////////////


//////////////////////////////////Authentications start///////////////////////////////////////
app.get('/androidloginst', (req, res) => {

    let id = req.query.id
    let passd = req.query.passd
    // let id= JSON.stringify(req.query.id)
    //let passd= JSON.stringify(req.query.passd)
    console.log(typeof (id))

    console.log(typeof (passd))

    //  let passd=req.query.passd 
    db.authenticateAndroidst(id, passd, (result) => {
        if (result.length > 1)
            res.status(400).send({ message: "something went wrong" })
        else if (result.message) {
            console.log("check android authentication" + result.message)

            res.status(400).send(result)
        }
        else {
            //     let x= ""
            // let i=0

            //     result.sbj.forEach(element=>{
            //         console.log(element.sbt_id)
            //         x[i]= element.sbt_id
            //         i++

            //     })
            //console.log( x[1] )

            console.log(result.sbj[0].sbt_id)

            res.send(result)
        } // res.sendFile(__dirname + '\\public' + '\\admin-menu.html')


    })

})



app.post("/facerecog", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.send(err)
        }
        else {
            let filepath = path.join('public', 'uploads', req.file.filename)

            // users collections send userid find userid if fined then update set {imagepath: filepath}
            //   let x = { imagepath: filepath }

            //    console.log(x)
            console.log(filepath)

            runrec(req.query.id, req.query.sbt_id, filepath, (result) => {
                res.send(result)
            })

        }
    })

    //res.send("Hello World")





})
/////////////////////FUnctions in server start//////////////////
async function runrec(id, sbt_id, imagepath, completion) {



    //  let id = "24129" //Number(user.query.id)
    await db.getstimagepath(id, async (result) => {
        if (result.length > 1)
            console.log("RIP db on image path") // res.status(400).send({ message: "war gai" })
        else if (result.message) {
            // console.log("image path  " + result.message)

            return result
        }
        else {
            // console.log(result.imagepath + "result_ img path")
            //  res.send(result)
            ////face stufff start/////////////////////////////////////////
            const reference_img1 = path.join(__dirname, result.imagepath)
            const query_img1 = path.join(__dirname, imagepath) //image coming from cellphoen












            await faceDetectionNet.loadFromDisk('./weights')
            await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights')
            await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights')

            const reference_img2 = await canvas.canvas.loadImage(reference_img1)
            const query_img2 = await canvas.canvas.loadImage(query_img1)


            const resullt_ref = await faceapi.detectAllFaces(reference_img2, new faceapi.SsdMobilenetv1Options())
                .withFaceLandmarks().withFaceDescriptors()



            const result_query = await faceapi.detectAllFaces(query_img2, new faceapi.SsdMobilenetv1Options())
                .withFaceLandmarks().withFaceDescriptors()

            if (!resullt_ref.length) {
                //     console.log("Damn")
                completion({ message: "face Not recognised" })
            }

            const faceMatcher = new faceapi.FaceMatcher(resullt_ref)

            //   console.log(JSON.stringify(faceMatcher))




            labels = faceMatcher.labeledDescriptors.map(ld => ld.label)
            const refDrawboxes = resullt_ref
                .map(res => res.detection.box)
                .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }))


            console.log(labels)  //label of reference image

            const out_ref = faceapi.createCanvasFromMedia(reference_img2)
            refDrawboxes.forEach(drawBox => drawBox.draw(out_ref))



            //return out_ref.toBuffer('image/jpeg')
            let threshold_final = 1


            const queryDrawBoxes = result_query.map(res => {
                const bestMatch = faceMatcher.findBestMatch(res.descriptor)
                threshold_final = bestMatch._distance
                return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })

            })
            //   console.log(threshold_final)
            //    console.log(typeof (threshold_final))


            if (threshold_final < 0.5) {
                //   console.log(sbt_id + "   subj id check")
                //  let subjectnametest= " none "


                let sbt_name = await db.getsubject(sbt_id)
                //   console.log(sbt_name + " main file test")

                //   console.log(result.name_student + "Check")

                // console.log(result.sbj[1].sbt_id)   
                let timestamp = Date.now()
                console.log(timestamp)
                //   let month = month = document.forms.date.month.value;
                //inserting into temporary db
                let d = new Date()
                let month = d.getMonth().toString()
                let year = d.getFullYear()

                //  console.log(month)

                //    console.log(year)


                let semester = "Null"    // here month starts from 11
                switch (month) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                        semester = ("Spring " + year)

                        break
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '10':
                    case '11':
                        semester = ("Fall " + year)
                        break
                }
                // console.log(semester)




                console.log(typeof (timestamp))

                let temp_attendance = {
                    student_name: result.name_student,
                    student_id: result.id,
                    attendance_status: "P",
                    subject_id: sbt_id,
                    timestamp: timestamp,
                    semester: semester

                }
                console.log(temp_attendance)
                let student_id=result.id

                let temp_attend_timestampcheck = await db.checktempattendancemarking(student_id,sbt_id, semester, timestamp)
                console.log(temp_attend_timestampcheck.x + " = temp_attend_timestampcheck.x ")
                if (temp_attend_timestampcheck.x===true) {
                    console.log(threshold_final + " Threshold Face didnt work")
                    console.log("it is coming here for some reason"+"LL")
                    completion({ message: "Attendance Not Marked DUPLICATE attempt" })
                    return
                }






                let temp_attendance_forLog = await db.tempattendanceforlog(temp_attendance)
                console.log(temp_attendance_forLog + "ABC")


                let temp_attendance_check = await db.temporarydb(temp_attendance)
                //       if(temp_attendance_check.message){
                console.log(temp_attendance_check.message)
                //           console.log("shouldnt be on no message")

                //       }else {
                //           console.log("Student present")
                //       }

                //    console.log(Date.now()-1573425537678)
                //5400000 - 1.5 hrs in ms



                // let temp_attendance = {
                //     name_student: req.body.name_student,
                //     id: req.body.id,
                //     passd: req.body.passd,
                //     dpt: req.body.depart,
                //     sbj: JSON.parse(req.body.subjects),
                //     imagepath: filepath,
                // }






                console.log(threshold_final + " Threshold Face work")
                completion({ message: "Attendance Marked Face Recognised" })



            } else {
                console.log(threshold_final + " Threshold Face didnt work")
                completion({ message: "Attendance Not Marked Face Not Recognised" })


            }






            return
            const out_query = faceapi.createCanvasFromMedia(query_img2)

            queryDrawBoxes.forEach(drawBox => drawBox.draw(out_query))



            ///face stuff end/////////////////////////////////////////////
        }
    })

    //  console.log(x)

    //  console.log(x.imagepath)



    //  let passd=req.query.passd 
    // db.getstdd(id, passd, (result) => {
    //     if (result > 1)
    //         res.send("war gai")
    //     else {
    //         console.log(result)
    //         res.send(result) // res.sendFile(__dirname + '\\public' + '\\admin-menu.html')
    //     }

    // })






}
app.get("/getLogattendance", async (req, res) => {
    let sbt_id = req.query.sbt_id
    let semester = req.query.semester

    //  console.log(sbt_id+ " WHAT")
    //  console.log(semester+ " WHAT")

    let resullt = await db.gettempattendanceforLog(sbt_id, semester)
    if (resullt.message) res.send(resullt.message)
    else {
        //  console.log(resullt)   
        res.send(resullt)
    }
})





//////////////////////function server end/////////////////////////////////////







/////////////////////////////////////Authentications end///////////////////////////////////////
///////////Other web stuff/////////////
app.put("/assignteacher", async (req, res) => {
    let assigncourses = req.body
    console.log(assigncourses.t_id + " XD")
    console.log(assigncourses.subjects[0] + " XD")
    let t_id = assigncourses.t_id
    let subject = assigncourses.subjects

    let result = await db.assigncoursetoteacher(assigncourses)
    // console.log(result)
    if (result.a === "0") {
        res.send({ message: "Some Error Occured While Assigning Course" })
    } else if (result.a === "1") {
        res.send({ message: "Teacher not found" })
    } else if (result.a === "2") {

        console.log("Adding into firebase below")
        let attendancefr = firebase.admin.firestore().collection('teacher')
            .where('t_id', '==', t_id)
        await attendancefr.get().then(snap => {
            snap.forEach(doc => {
                if (!doc.empty) {
                    console.log(doc.id)
                    subject.forEach(async (lolsbjnum) => {
                        firebase.admin.firestore().collection('teacher').doc(doc.id).update({
                            subject: firebase.admin.firestore.FieldValue.arrayUnion(lolsbjnum)         //always use firebase.admin.firestore before usuall stuff
                        })
                    })
                    // flag = false     // so to add an object in an array first we have to get the location of where teacher is  why .where stuf  
                    //so we have the doc location of him and after that we will simply send 1 by one number of subjects that we need to add

                }
            })
        }).catch(err => { res.send({ message: 'error while gettin data from' }) })
        res.send({ message: "Course/Courses has been assigned to " + assigncourses.t_id })



    }

    //res.send(result)

})

app.delete("/delsbj", async (req, res) => {
    let sbt_id = req.body.obj
    console.log(sbt_id + " ABCD ")

    let result = await db.deletesubjectone(sbt_id)
    res.send(result)


})
app.get("/allcoursesone", async (req, res) => {

    let result = await db.getallSubtoshow()
    console.log(result)
    res.send(JSON.stringify(result))



})

app.get("/allteachernameid", async (req, res) => {
    let result = await db.getallteachersnameid()
    console.log(result[1])
    //res.send(JSON.stringify(result))
    
    res.send(result)
})










///////////////////////////////////////

// web file
/////// android perm attendance fetch below/////////////////////

app.get("/getpermattforandrr", async (req, res) => {
    let std_id = req.query.student_id
    let sbt_id = req.query.sbt_id
    let semester = req.query.semester

    console.log(std_id)
    console.log(sbt_id)
    console.log(semester)

    let resullt = await db.getpermattendanceforandr(std_id, sbt_id, semester)
    console.log(JSON.stringify(resullt) + "test ")
    if (resullt.message) {
        res.status(400).send(resullt)
    } else res.send(resullt)

})


app.get("/getalstd", async (req, res) => {

    let result = await db.getallstd()
    res.send(result)
})

app.delete("/delstd", async (req, res) => {
    let std_id = req.body.obj
    console.log(std_id + " ABCD ")

    let result = await db.deletestd(std_id)
    if (result.result.n !== 1) {
        res.send(result)
    } else {




        let studenttodelete = firebase.admin.firestore().collection('student')
            .where('id', '==', std_id)
        await studenttodelete.get().then(snap => {
            snap.forEach(doc => {
                if (!doc.empty) {
                    console.log(doc.id)

                    firebase.admin.firestore().collection('student').doc(doc.id).delete()
                    res.send({ message: "Student " + std_id + "Have been deleted" })
                    // flag = false     // so to add an object in an array first we have to get the location of where teacher is  why .where stuf  
                    //so we have the doc location of him and after that we will simply send 1 by one number of subjects that we need to add

                }
            })
        }).catch(err => { res.send({ message: 'error while gettin data from' }) })
       
    }
    

})


/////// android perm attendance fetch above/////////////////////



app.get('/loginadmin', (req, res) => {
    //\public\AASystem\admin\sections\loginform.html
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\admin-login.html')
})
app.get('/admin', (req, res) => {   //admin dashboard
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\admin-dashboard.html')
})
app.get('/allcourses', (req, res) => {
    //\public\AASystem\admin\sections\loginform.html
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\all-courses.html')
})

app.get('/allteacher', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\all-teacher.html')
})
app.get('/assigncourse', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\assign-course.html',{cache: "no-store"})
})

app.get('/createcourse', (req, res) => {
    res.status(200).sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\create-course.html')
})
app.get('/createteacher', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\create-teacher.html')
})
app.get('/deletecourse', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\delete-course.html')
})
app.get('/deletestudent', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\delete-student.html')
})
app.get('/deleteteacher', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\delete-teacher.html')
})
app.get('/registerstudent', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\register-student.html')
})
app.get('/studentlist', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\student-list.html')
})
app.get('/updatestudent', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\update-student.html')
})
app.get('/updateteacher', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\update-teacher.html')
})
//////////////////////below are for teacher, above were for admin
app.get('/generateqr', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\generate-qr.html')
})
app.get('/manualattendance', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\manual-attendance.html')
})
app.get('/studentlistteacher', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\student-list.html')
})
app.get('/teacherdashboard', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\teacher-dashboard.html')
})
app.get('/teacherlogin', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\teacher-login.html')
})





////















app.get('/str', (req, res) => {

})
app.get('/strg', (re, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\register-student.html')
})

app.get('/teachrg', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\create-teacher.html')
})

app.get('/getstregister', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\register-student.html')
})




app.get('/tad', (req, res) => {
    res.sendFile('../../../')
})
app.get('/loginteacher', (req, res) => {
    //\public\AASystem\admin\sections\loginform.html
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\teacher-login.html')
})

app.get('/admindash', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\admin-dashboard.html')
})

app.get('/createteacher', (req, res) => {
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\admin' + '\\pages' + '\\create-teacher.html')
})

app.get('/teacherdash', (req, res) => {
    // res.send("hello world")
    res.sendFile(__dirname + '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\teacher-dashboard.html')
})


app.get('/image', (req, res) => {
    let name = req.query.name
    res.sendFile(path.join(__dirname, 'public', 'uploads', name))
})



// web file above/////////



//server test
app.get("/ts", (req, res) => {
    res.send({ message: "Server is alive" })
})

// firestore every doc have a uique id/////////////////////////////////
//adding attendance data to firebase and to mongodb in firebase

app.post('/pt', async (req, res) => {





    let flag = true

    let subcheck = req.body[0].subject_id
    let semstercheck = req.body[0].semester
    console.log(subcheck + " LOL ")
    console.log(semstercheck + " LOL")
    let timestampcheck = (req.body[0].timestamp) - 3600000//1800000    //within written time cant comence attendance
    console.log(timestampcheck + " === A ")
    let attendancefr = firebase.admin.firestore().collection('hh')
        .where('subject_id', '==', subcheck)
        .where('semester', '==', semstercheck)
        .where('timestamp', '>=', timestampcheck)
    await attendancefr.get().then(snap => {
        snap.forEach(doc => {

            if (!doc.empty) {
                console.log('Documents found');
                flag = false
                return
            }



            // console.log(doc.data())

        })
    }).catch(err => { res.send({ message: 'error while gettin data from' }) })
    let ii = 0

    if (flag === true) {
        req.body.forEach(async (element) => {
            await firebase.admin.firestore().collection('hh').doc().set(element)
            let dbperm = await db.permAttrec(element)
            console.log(element + " " + ii)
            console.log(dbperm.message + " dbperm")
            console.log("Added to Firebase")
            ii++
        })
        res.send({ message: "Attendance Added in Record" })


    } else {
        res.send({ message: "Attendance Already in Record" })
    }

    console.log(flag)
    res.send(req.body)
})






app.listen(port, '0.0.0.0', () => console.log(`potato is being listened on port ${port} `))


// module.exports = {

// }

