async function stni(){
    let subjectsnum = JSON.parse(localStorage.getItem('subjectsl'))

    console.log(subjectsnum + " QR page")
    let temp = JSON.parse(localStorage.getItem('teacherrone'))
    // let temp=localStorage.getItem('teacherrone')

    console.log(temp)
    console.log(temp.subject[subjectsnum].sbt_id)
    let sbt_id=temp.subject[subjectsnum].sbt_id
    let semester=temp.subject[subjectsnum].semester
    const url = (`http://${location.hostname}:2000/getstregisteredinsub?sbt_id=` + sbt_id + `&semester=` + semester);  // record of people having recorded attendance
      console.log(url+"check url")
    let respoce = await fetch(url);
    let jresp = await respoce.json();
    if(jresp.message){
        alert(jresp.message + " Subject = "+temp.subject[subjectsnum].sbt_name)
        return
    }

    
    console.log(JSON.stringify(jresp) + "asdf");
    let html = jresp.map((value, index) => {
        if (value.id === "") return ""
        console.log(value.attendance_status)
        return `<tr> <td scope='col'>${index}</td><td scope='col'>${value.name_student}</td><td scope='col'> ${value.id}</td>
        </tr>`
      }).join("\n")
      document.getElementById('content').innerHTML = html





}





function testing(){

    let temp=JSON.parse(localStorage.getItem('teacherrone'))
   // let temp=localStorage.getItem('teacherrone')
    
    console.log(temp)
    console.log(temp.subject[1].sbt_id)
    let temptwo=" It shouldnt be  this one"
    
    console.info("test")
    var newHTML = "";
    for(i=0;i<temp.subject.length;i++){
         temptwo=temp.subject[i].sbt_name
         console.log(temptwo+" test" + i)
    newHTML +=`<button class="dropdown-btn new-buttons">
    <i class="fa fa-sticky-note left-icon"></i>${temptwo+" "+temp.subject[i].sbt_id}<i class="fa fa-caret-down"></i>
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
    stni()