const mongodb = require("mongodb")

let url = 'mongodb://127.0.0.1:27017/'

let db = null
let x = false

mongodb.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {

        if (error !== null) {
            console.log("there are some rotten potatoes", error)
            process.exit(1)

        }
        console.log("Connected to the db")

        db = client.db("tOfinaldb")


    })



async function insertMulterUser(reqi) {

    console.log(reqi.path + "???///")
    //console.log(user.gpa)
    // const usr = await db.collection("users").find({ name: user.name }).toArray()
    // if (usr.length >= 1) return { error: "user with this name exits please provide another name" }

    // return await db.collection("users").insertOne(user)
    const usr = await db.collection("users").find({ imagePath: reqi.path }).toArray()
    if (reqi.length >= 1) return { error: "user with this name exits please provide another name" }


    /* 
       object is coming as req  with whole gile then we check if path already exists  and then
       if no error then we just add it to DB
       
    */

    let asd = { "imagePath": reqi.path }

    // console.log(asd+"??????????????????????????")



    return await db.collection("users").insertOne(asd)

}
function getallusr(completion) {
    db.collection('teacherdbOne').find({}).toArray((error, result) => {
        if (error != null) completion({ message: "unable to find that name" })
        else { completion(result) }

    })

}


async function inserst(user) {
    console.log(user.id)
    const usr = await db.collection("student").find({ id: user.id }).toArray()
    if (usr.length >= 1) return { message: "Student with this name already exists, please proide another name" }

    return await db.collection("student").insertOne(user)

}

async function getadd(nid, npsd) {
    console.log(typeof (nid))
    console.log(typeof (npsd))


    let query = { $and: [{ a_id: nid }, { passd: npsd }] }
    let result = await db.collection('adonemin').find(query).toArray()

    if (result.error != null) return ({ message: "unable to find user" })
    else if (result.length === 0) return ({ message: "Wrond ID or Password" })

    else return result[0]
}
async function gettdd(nid, npsd) {
    console.log(typeof (nid))
    console.log(typeof (npsd))


    let query = { $and: [{ t_id: nid }, { passd: npsd }] }
    let result = await db.collection('teacherdbOne').find(query).toArray()

    if (result.error != null) return ({ message: "unable to find user" })
    else if (result.length === 0) return ({ message: "Wrond ID or Password" })

    else return result[0]
}

// async function imgsavestd(req)

/////////////////////////Inserting into db start/////////////////////////////
//Below inserting stuent or /l  request in a.js
async function inserstt1(user) {
    // console.log(user)

    const usr = await db.collection("studentfinal").find({ id: user.id }).toArray()
    console.log("user" + usr)
    if (usr.length >= 1) return { message: "Student with this name already exists, please proide another name" }

    return await db.collection("studentfinal").insertOne(user)

}

async function getstimagepath(nid, completion) {

    await db.collection('studentfinal').find({ id: nid }).toArray((error, result) => {
        console.log(result)
        if (error != null) completion({ message: "unable to find user" })
        else if (result.length < 1) completion({ message: "war gai" })

        else completion(result[0])
    })

}

//inserting teacher
async function insertteach(user) {
    // console.log(user)

    const usr = await db.collection("teacherdbOne").find({ t_id: user.t_id }).toArray()
    console.log("user" + usr)
    if (usr.length >= 1) return { message: "Teacher with this name already exists, please proide another name" }

    return await db.collection("teacherdbOne").insertOne(user)

}

////adding admin
async function insertadmin(user) {
    // console.log(user)

    const usr = await db.collection("adonemin").find({ a_id: user.a_id }).toArray()
    console.log("user" + usr)
    if (usr.length >= 1) return { message: "Admin with this name already exists, please provide another name" }

    return await db.collection("adonemin").insertOne(user)

}
//Below inserting Subjects or /s  request in a.js

async function insertsub(sub) {

    const usr = await db.collection("subjectfinal").find({ sbt_id: sub.sbt_id }).toArray()
    // console.log("subjecttone"+usr)
    if (usr.length >= 1) return { message: "Subject with this ID already exists, please provide another ID" }

    let result = await db.collection("subjectfinal").insertOne(sub)
    if (result.error) return { message: "An error occured while adding SUbject to therecord" }
    else if (result.result.n !== 1) return { message: "Subject wern't added into the record" }
    else return { message: "Subject was added to the record" }

}
////////Temp_db insert// down
async function temporarydb(sub) {

    let st_id = sub.student_id
    let sub_id = sub.sbt_id
    let timestamp = sub.timestamp

    console.log("You called temp db to add absent to " + st_id)



    //   let query = { $and: [{ id: nid }, { passd: npsd }] }

    query = { $and: [{ student_id: st_id }, { sbt_id: sub_id }] }


    const usr = await db.collection("tempattendancetest6").find(query).toArray()
    //console.log("subjecttone" + usr[0].timestamp)
    let x = 0

    for (i = 0; i < usr.length; i++) {
        //  console.log("subjecttone" + usr[i].timestamp)
        if ((timestamp - usr[i].timestamp) < 1) { //5400000
            x = 1

            return { message: "Already entered in last 1.5 hour" }
        }
    } if (x === 0) {
        console.log("its adding")
        return await db.collection("tempattendancetest6").insertOne(sub)
    }


    //  if (usr.length >= 1) return { message: "Subject with this name already exists, please proide another name" }

    // return await db.collection("tempattendance").insertOne(sub)
}
async function tempattendanceforlog(sub) {

    let st_id = sub.student_id
    let sub_id = sub.sbt_id
    let timestamp = sub.timestamp

    // console.log("You called temp db to add absent to " + st_id)



    //   let query = { $and: [{ id: nid }, { passd: npsd }] }

    query = { $and: [{ student_id: st_id }, { sbt_id: sub_id }] }


    const usr = await db.collection("tempattendanceforLog").find(query).toArray()
    //console.log("subjecttone" + usr[0].timestamp)
    let x = 0

    for (i = 0; i < usr.length; i++) {
        //  console.log("subjecttone" + usr[i].timestamp)
        if ((timestamp - usr[i].timestamp) < 1) { //5400000
            x = 1

            return { message: "Already entered in last 1.5 hour" }
        }
    } if (x === 0) {
        // console.log("its adding")
        return await db.collection("tempattendanceforLog").insertOne(sub)
    }


    //  if (usr.length >= 1) return { message: "Subject with this name already exists, please proide another name" }

    // return await db.collection("tempattendance").insertOne(sub)
}

async function gettempattendanceforLog(sbt_id, semester) {
    timestampone = Date.now()

    timestampmin = timestampone - 28800000               //^$%^$%^$%^$%^$%^$%^ TIme Stamper of saving attendance 8h= 2800000
    // console.log(timestampmin)

    // let d = new Date()
    // let month = d.getMonth().toString()
    // let year = d.getFullYear()

    //console.log(month)

    //console.log(year)


    // let semesternew = "Null"    // here month starts from 11
    // switch (month) {
    //     case '0':
    //     case '1':
    //     case '2':
    //     case '3':
    //     case '4':
    //     case '5':
    //         semesternew = ("Spring " + year)

    //         break
    //     case '6':
    //     case '7':
    //     case '8':
    //     case '9':
    //     case '10':
    //     case '11':
    //         semesternew = ("Fall " + year)
    //         break
    // }
    //  // console.log(timestampone)
    //  //console.log(timestampmin)
    // //console.log(semester)

    // //items.find({
    // created_at: {
    //     $gte:"Mon May 30 18:47:00 +0000 2015",
    //     $lt: "Sun May 30 20:40:36 +0000 2010"
    // }

    query = {
        $and: [{ subject_id: sbt_id }, { semester: semester },
        { timestamp: { $gte: timestampmin, $lt: timestampone } }]
    }

    const usr = await db.collection("tempattendanceforLog").find(query).toArray()
    // for(i =0;i<usr.length;i++){
    //     console.log(usr[i])
    // }
    if (usr.length < 1) {
        return { message: "No record Found" }
    } else if (usr.error) {
        return { message: "Some Error" }
    } else {
        return usr
    }


}
async function checktempattendancemarking(student_id, sbt_id, semester, timestampone) {
    let timestampmin = timestampone - 3600000

    query = {
        $and: [{ student_id: student_id }, { subject_id: sbt_id }, { semester: semester },
        { timestamp: { $gte: timestampmin, $lt: timestampone } }]
    }

    const usr = await db.collection("tempattendancetest6").find(query).toArray()
    // for(i =0;i<usr.length;i++){
    //     console.log(usr[i])
    // }
    if (usr.length < 1) {
        console.log(JSON.stringify(usr) + " TD1")
        return { x: false }
    } else if (usr.error) {
        console.log(JSON.stringify(usr) + " TD2")
        return { x: true }
    } else if (usr.length === 0) { return { x: false } }
    else {
        console.log(JSON.stringify(usr) + " TD3")
        return { x: true }
    }

    //false means no record found and data can be entered



}
/////////////tempdb data insert end////////////////

//////////////////////////get data from temp start //////////////////

async function gettempattendanceManualattendance(sbt_id, semester) {
    timestampone = Date.now()

    timestampmin = timestampone - 28800000               //^$%^$%^$%^$%^$%^$%^ TIme Stamper of saving attendance 8h= 2800000
    console.log(timestampmin)

    // let d = new Date()
    // let month = d.getMonth().toString()
    // let year = d.getFullYear()

    //console.log(month)

    //console.log(year)


    // let semesternew = "Null"    // here month starts from 11
    // switch (month) {
    //     case '0':
    //     case '1':
    //     case '2':
    //     case '3':
    //     case '4':
    //     case '5':
    //         semesternew = ("Spring " + year)

    //         break
    //     case '6':
    //     case '7':
    //     case '8':
    //     case '9':
    //     case '10':
    //     case '11':
    //         semesternew = ("Fall " + year)
    //         break
    // }
    console.log(timestampone)
    console.log(timestampmin)
    console.log(semester)

    // //items.find({
    // created_at: {
    //     $gte:"Mon May 30 18:47:00 +0000 2015",
    //     $lt: "Sun May 30 20:40:36 +0000 2010"
    // }

    query = {
        $and: [{ subject_id: sbt_id }, { semester: semester },
        { timestamp: { $gte: timestampmin, $lt: timestampone } }]
    }

    const usr = await db.collection("tempattendancetest6").find(query).toArray()
    // for(i =0;i<usr.length;i++){
    //     console.log(usr[i])
    // }
    if (usr.length < 1) {
        return { message: "No record Found" }
    } else if (usr.error) {
        return { message: "Some Error" }
    } else {

        return usr
    }


}




//////////////////////////get data from temp end ///////////////////

// async function getallSub(completion) {
//     await db.collection('subjectfinal').find({}).toArray((error, result) => {
//         if (error != null) completion({ message: "unable to find that name" })
//         else { completion(result) }

//     })
// }
async function getallSub() {
    let result = await db.collection('subjectfinal').find({}).toArray()
    if (result.error != null) return { message: "unable to find that name" }
    else return result
}
async function getallSubtoshow() {
    let result = await db.collection('subjectfinal').find({}).toArray()
    if (result.error != null) return { message: "unable to find that subjects" }
    else return result


}
/////////////////////////Inserting into db End/////////////////////////////

////////////////////////////////Authentications start/////////////////////////


async function authenticateAndroidst(nid, npsd, completion) {

    console.log(typeof (nid))

    console.log(typeof (npsd))

    let query = { $and: [{ id: nid }, { passd: npsd }] }

    // let n= "1234"


    await db.collection('studentfinal').find(query).toArray((error, result) => {
        console.log("adjhad " + result)
        if (error != null) completion({ message: "unable to find user" })
        else if (result.length === 0) completion({ message: "Wrong Login or Password" })

        else {
            completion(result[0])
        }
    })
}
////////////////////////////get ssubject start///////////////////
async function getsubject(id) {
    //id= JSON.stringify(id)
    //  id=Number(id)

    let result = await db.collection('subjectfinal').find({ sbt_id: id }).toArray() //(error, result) => {
    console.log(result)
    //     if (error != null) return { message: "unable to find that name" }
    //     else {
    //        // console.log(result)
    //         return result }

    // })
    // result=JSON.stringify(result)
    console.log(result[0].sbt_name + " db check")
    return result[0].sbt_name
}
async function getregisterstinsub(sbt_id, semester) {



    query = {
        sbj: {
            $all: [
                { $elemMatch: { sbt_id: sbt_id } },
                { $elemMatch: { semester: semester } }
            ]
        }
    }
    //  let query = { $and: [{ sbj : nid }, { passd: npsd }] }
    const usr = await db.collection("studentfinal").find(query).toArray()
    // for(i =0;i<usr.length;i++){
    //     console.log(usr[i])
    // }
    if (usr.length < 1) {
        return { message: "No record Found" }
    } else if (usr.error) {
        return { message: "Some Error" }
    } else {
        return usr
    }


}
// permanent attendance record  below
async function permAttrec(sub) {
    console.log(sub)
    let x = await db.collection("permattendancereord").insertOne(sub)

    if (x) { return { message: "Data Added In record" } }
    else if (x.error) return { message: "error while adding into database" }
}


////////////////////////////get ssubject end///////////////////







////////////////////////////////Authentications end///////////////////////////
////////////////////web other stuff////////////////
async function assigncoursetoteacher(obj) {


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


    // let x={
    //     sbt_id: obj.sbt_id,
    //     sbt_name:obj.sbt_name,
    //     semester:semester
    // }
    let values = obj.subjects
    let t_id = obj.t_id

    //console.log(values[0])
    let b = true


    values.forEach(async (element) => {
        console.log(element + " Checking")



        let result = await db.collection('teacherdbOne').updateOne({ t_id: t_id }, { $addToSet: { subject: element } })
        if (result.error) {
            b = false
            return { a: "0" }
        }//{ message: "Some Error Occured While Assigning Course" }
        else if (result.result.n !== 1) {
            b = false
            return { a: "1" }
        }// { message: "Teacher not found" }
        // else 
        // console.log(result.result.n+ " O K ")
        // return result
    });
    if (b === true) {
        return { a: "2" }
    }  //

}




async function deletesubjectone(sbt_id) {
    let result = await db.collection('subjectfinal').deleteOne({ sbt_id: sbt_id })
    if (result.error) return { message: "Some error occured" }
    else if (result.result.n !== 1) return { message: "Subject not found" }
    else return { message: "Subject " + sbt_id + " have been deleted" }



}
async function getallteachersnameid() {
    let result = await db.collection("teacherdbOne").find({}).toArray()
    if (result.error) return { message: "Some error occured while getting teacher" }
    else return result

}

async function getpermattendanceforandr(std_id, sbt_id, semester) {
    console.log(std_id + " " + sbt_id + " " + semester)
    console.log(typeof (std_id))
    console.log(typeof (sbt_id))
    console.log(typeof (semester))

    let query = { $and: [{ student_id: std_id }, { subject_id: sbt_id }, { semester: semester }] }

    let result = await db.collection("permattendancereord").find(query).toArray()
    if (result.error) {
        console.log(result.error + " XD")
        return { message: "Error while fetching record" }
    }
    else if (result.length === 0) return { message: "No record in databse" }
    else return result

}

async function getallstd() {
    let result = await db.collection('studentfinal').find({}).toArray()
    //if(result.error===null){
    return result
    // }
}

async function deletestd(nid) {


    console.log(nid)



    let result = await db.collection('studentfinal').deleteOne({ id: nid })
    //if (result.error) return { message: "Some error occured" }
    //  else if (result.result.n !== 1) return { message: "Student not found" }
    return result

}



////////web other stuff end.//////////////////////




module.exports = {
    insertMulterUser,
    getallusr,
    inserst,
    getadd,
    inserstt1,
    insertsub,
    authenticateAndroidst,
    insertteach,
    insertadmin,
    getallSub,
    getstimagepath,
    getsubject,
    temporarydb,
    tempattendanceforlog,
    gettempattendanceforLog,
    gettempattendanceManualattendance,
    getregisterstinsub,
    permAttrec,
    gettdd,
    assigncoursetoteacher,
    getallSubtoshow,
    deletesubjectone,
    getallteachersnameid,
    checktempattendancemarking,
    getpermattendanceforandr,
    getallstd,
    deletestd


}

