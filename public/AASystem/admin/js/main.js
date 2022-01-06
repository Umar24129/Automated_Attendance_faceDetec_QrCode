
let user_string = localStorage.getItem("adminssrrone")
if(!user_string){
    location.replace("loginadmin")
}


function logoutcheckk(){
if(confirm("You are about to be loged out")){
let user_string = localStorage.getItem("adminssrrone")
console.log(user_string)
localStorage.clear()
location.replace('loginadmin')
}else {
    return
}
}
function admindashss(){
    location.replace('admin')
}
function createcoursess(){
    location.replace('createcourse')
}
function allcoursess(){
    location.replace('allcourses')
}
function allteacherr(){
    location.replace('allteacher')
}
 function assigncoursess(){
    location.assign('assigncourse')
}

function createcoursess(){
    location.replace('createcourse')
}
function createteachers(){
    location.replace('createteacher')
}
function deletecoursess(){
    location.replace('deletecourse')
}
function deletestudentss(){
    location.replace('deletestudent')
}
function deleteteacherss(){
    location.replace('deleteteacher')
}
function registerstudentss(){
    location.replace('registerstudent')
}

function studentlistss(){
    location.replace('studentlist')
}

function updatestudentss(){
    location.replace('updatestudent')
}

function updateteacherss(){
    location.replace('updateteacher')
}



