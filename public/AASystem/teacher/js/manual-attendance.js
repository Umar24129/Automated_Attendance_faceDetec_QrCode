function gettingsbjid() {
    let subjectsnum = JSON.parse(localStorage.getItem('subjectma'))

    console.log(subjectsnum + " QR page")
    let temp = JSON.parse(localStorage.getItem('teacherrone'))
    // let temp=localStorage.getItem('teacherrone')

    
    return temp.subject[subjectsnum].sbt_id

}
function gettingsbjsemester() {
    let subjectsnum = JSON.parse(localStorage.getItem('subjectma'))

    console.log(subjectsnum + " QR page")
    let temp = JSON.parse(localStorage.getItem('teacherrone'))
    // let temp=localStorage.getItem('teacherrone')


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
            console.info("123")
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

testing()