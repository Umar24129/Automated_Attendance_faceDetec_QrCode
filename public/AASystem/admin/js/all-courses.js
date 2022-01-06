// let user_string = localStorage.getItem("user")
// if(!user_string){
//     location.replace("loginadmin")
// }


// function logoutcheckk(){
// alert("Logout Pressed")
// let user_string = localStorage.getItem("user")
// console.log(user_string)
// localStorage.clear("user")
// // location.replace('tad')
// //window.location.replace(path.join(__dirname+'\\d.html'))
// }

async function stni(){
    // const url = ("http://localhost:2000/allcourses"); 
    // let respoce = await fetch(url);
     let jresp = ""
    // console.log(jresp)
  await  fetch(`http://${location.hostname}:2000/allcoursesone`)
    .then(res => res.json())
    .then(body => { jresp=body });
    console.log(jresp[0])
    
    // if(jresp.message){
    //     alert(jresp.message + " Subject = ")
    //     return
    // }
        
    console.log(JSON.stringify(jresp) + "asdf");
    let html = jresp.map((value, index) => {
        if (value.sbt_id === "") return ""
        console.log(value.attendance_status)
        return `<tr> <td scope='col'>${index}</td><td scope='col'>${value.sbt_name}</td><td scope='col'> ${value.sbt_id}</td><td scope='col'> ${value.semester}</td>
        </tr>`
      }).join("\n")
      document.getElementById('content').innerHTML = html




}
stni();