//returning subject id only
function gettingdata() {
    let subjectsnum = JSON.parse(localStorage.getItem('subjectqr'))

    console.log(subjectsnum + " QR page")
    let temp = JSON.parse(localStorage.getItem('teacherrone'))
    // let temp=localStorage.getItem('teacherrone')

    console.log(temp)
    console.log(temp.subject[subjectsnum].sbt_id)
    return temp.subject[subjectsnum].sbt_id 

}
//returning subject semesterbelow
function getsubtsemest(){
    let subjectsnum = JSON.parse(localStorage.getItem('subjectqr'))

    console.log(subjectsnum + " QR page")
    let temp = JSON.parse(localStorage.getItem('teacherrone'))
    // let temp=localStorage.getItem('teacherrone')

    console.log(temp)
    console.log(temp.subject[subjectsnum].sbt_id)
    return temp.subject[subjectsnum].semester 

}
function testing() {

    let temp = JSON.parse(localStorage.getItem('teacherrone'))
    // let temp=localStorage.getItem('teacherrone')

    console.log(temp)
    console.log(temp.subject[1].sbt_id)
    let temptwo = " It shouldnt be  this one"

    console.info("test")
    var newHTML = "";
    for (i = 0; i < temp.subject.length; i++) {
        temptwo = temp.subject[i].sbt_name
        console.log(temptwo + " test" + i)
        newHTML += `<button class="dropdown-btn new-buttons">
    <i class="fa fa-sticky-note left-icon"></i>${temptwo + " " + temp.subject[i].sbt_id}<i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-container" >
    <a onclick="generateqrrr(${i});" style="color:white;">Generate QRcode</a>
    <a onclick="studentlistrr(${i});" style="color:white;">Student list</a>
    <a onclick="manualattendancerr(${i});" style="color:white;">Manual Attendance</a>
    </div>
    `
    }
    document.getElementById('testd').innerHTML += newHTML;




    var newButtons = document.querySelectorAll(".dropdown-btn.new-buttons");
    var i;
    console.info(newButtons)
    for (i = 0; i < newButtons.length; i++) {
        newButtons[i].addEventListener("click", function () {
          //  console.info("123")
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
}
async function logofattedance(){
    let sbt_id= gettingdata();
    let semester=getsubtsemest();

   // console.log(sbt_id+" Testing forlog")

   // console.log(semester+" Testing forlog")
     const url = (`http://${location.hostname}:2000/getLogattendance?sbt_id=` + sbt_id + `&semester=` + semester);  // record of people having recorded attendance
     let respoce = await fetch(url,{cache: "no-store"});
      let jresp = await respoce.json();
    //  console.log(jresp)

      let html = jresp.map((value, index) => {
        if (value.attendance_status === "") return ""
        console.log(value.attendance_status)
        return `<li class="list-group-item">Attendace marked of <b><p style="color: red;">${value.student_name}</p></b></li>`
      }).join("\n")

   //   console.log(html)
      document.getElementById('ulitem').innerHTML=html







}

function autorefresh(){
    setInterval(function () {
        logofattedance();
    }, 4000);

}

testing()
logofattedance();
autorefresh()