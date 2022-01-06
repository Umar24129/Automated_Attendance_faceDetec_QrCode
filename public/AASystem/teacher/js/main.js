
let user_string = localStorage.getItem("teacherrone")
if (!user_string) {
    location.replace("loginteacher")
}


function logoutcheck() {
    alert("Logout Pressed")
    let user_string = localStorage.getItem("teacherrone")
    console.log(user_string)
    localStorage.clear()
    location.replace('/loginteacher')
    // window.location.href = '/path';
    //_dirname+ '\\public' + '\\AASystem' + '\\teacher' + '\\pages' + '\\teacher-login.html'
    //window.location.href='\\AASystem' + '\\teacher' + '\\pages' + '\\teacher-login.html';

}
function generateqrrr(subj) {
    localStorage.setItem('subjectqr', JSON.stringify(subj))
    location.replace('generateqr');
}
function manualattendancerr(subj) {
    localStorage.setItem('subjectma', JSON.stringify(subj))
    location.replace('manualattendance');
}
function studentlistrr(subj) {
    localStorage.setItem('subjectsl', JSON.stringify(subj))
    location.replace('studentlistteacher');
}




