// location.reload(true)

// function eraseCache(){
//   window.location = window.location.href+'?eraseCache=true';
// }
// eraseCache()

// async function addAllSubjects() {
    

//     await fetch('http://localhost:2000/getallsubjects')
//         .then(async(res) => await res.json())
//         .then(async(obj) => {
//             let html = `<div style="width: 500;"> <select  name="subjects_select" class="selectpicker dropdown-dense" multiple data-width="100%" data-height="50%" data-size="${obj.length}" data-selected-text-format="count > 3" data-style="btn-primary" title="Choose one of the following..." data-actions-box="true" data-header="Select Subjects" data-live-search="true"
//               data-live-search-placeholder="Search ..."> <optgroup label="Subjects" id="dynamic_subjects"> `  // to set style of this selector u need to set styles through css file such as in asssign-course.css
//               let options =  await obj.map((value, index) => `<option value="${value.sbt_id}">${value.sbt_id}-${value.sbt_name}-${value.semester}</option>`)
//             options = options.join('\n') + "</optgroup>"
//             html += options + "</select></div>"
//             console.log(obj[1])
//             document.getElementById("form-group").innerHTML = html
//         }).catch(err => console.error(err))
    
// }

async function addAllSubjects() {
    try {
        const request = await fetch(`http://${location.hostname}:2000/getallsubjects`,{cache: "no-store"})
        const obj = await request.json()
        let html = `<div style="width: 500;"> <select  name="subjects_select" class="selectpicker dropdown-dense" multiple data-width="100%" data-height="50%" data-size="${obj.length}" data-selected-text-format="count > 3" data-style="btn-primary" title="Choose one of the following..." data-actions-box="true" data-header="Select Subjects" data-live-search="true"
        data-live-search-placeholder="Search ..."> <optgroup label="Subjects" id="dynamic_subjects"> `
        let options =  await obj.map((value, index) => `<option value="${value.sbt_id}">${value.sbt_id}-${value.sbt_name}-${value.semester}</option>`)
        options = options.join('\n') + "</optgroup>"
        html += options + "</select></div>"
        return html
    } catch (error) {
        console.error(error)
        return null
    }

}


addAllSubjects().then(html => {
    if(html !== null) document.getElementById('form-group').innerHTML = html
})



async function addallteacherswithids() {
    await fetch(`http://${location.hostname}:2000/allteachernameid`,{cache: "no-store"})
        .then(res => res.json())
        .then(obj => {
            console.log(obj[0].t_id + " Teacher check")
            let html = obj.map((value, index) => {

                let a = (value.t_name + "," + value.t_id)
                console.log(a + "test check teacher")
                if (value.t_id === "") return ""
                return `<option value="${index}">${a}</option>`

            }).join("\n")
            document.getElementById('teachernameid').innerHTML = html

            
        })


}



   // let html = `<select name="subjects_select" class="selectpicker dropdown-dense" multiple data-width="100%" data-size="${obj.length}" data-selected-text-format="count > 3" data-style="btn-primary" title="Choose one of the following..." data-actions-box="true" data-header="Select Subjects" data-live-search="true"
            //   data-live-search-placeholder="Search ..."> <optgroup label="Subjects" id="dynamic_subjects"> `
            // let options = obj.map((value, index) => `<option value="${value.sbt_id}">${value.sbt_id}-${value.sbt_name}-${value.semester}</option>`)
            // options = options.join('\n') + "</optgroup>"
            // html += options + "</select>"
            // console.log(html)
            // document.getElementById("form-group").innerHTML = html

async function submitBtnTapped() {
    // let selectSelector = 'body > div > div:nth-child(2) > div.col-md-10 > div > div > div > div > form > div > div:nth-child(6) > div > div > div > div > select'

    ///html/body/div/div[2]/div[2]/div/div/div/div/div[2]/div[2]/div/div/select
    let selectors = document.querySelectorAll("#form-group > div > div > select")["0"]  // to get this we have to copy JS path of a tag
    //  let selectors = document.querySelectorAll(selectSelector)["0"]
    let keys = Object.keys(selectors)
    keys.pop()
    keys.pop()

    let values = []
    keys.forEach(key => {
        if (selectors[key].selected) {
            values.push({ sbt_id: selectors[key].value, sbt_name: selectors[key].innerText.split('-')[1], semester: selectors[key].innerText.split('-')[2] })
        }
    })

    values.forEach(elem => {
        console.log(JSON.stringify(elem) + " XD testn")
    })


    var e = document.getElementById("teachernameid");
    var resulta = e.options[e.selectedIndex].text;


    //  return
    result = resulta.split(",")[1]
    console.log(result + "  A")

    // document.getElementById("subjects").value = JSON.stringify(values)
    //  await document.getElementById('register-form').submit()

    let obj = {
        t_id: result,
        subjects: values

    }
    await fetch(`http://${location.hostname}:2000/assignteacher`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(obj)
        }).then(res => res.json())
        .then(obj => alert(obj.message))
        .catch(err => console.error(err))






    // add header here to reirect to a page
    // add value of submite butoon and add it here so that u can use it for alert later on here



}



async function putingcourseofteacher() {

    let t_id = document.getElementById('t_id').value
    let sbt_id = document.getElementById('sbt_id').value
    let sbt_name = document.getElementById('sbt_name').value
    console.log(t_id)

    let obj = {
        t_id: t_id,
        sbt_id: sbt_id,
        sbt_name: sbt_name
    }
    console.log(JSON.stringify(obj) + " testing")

    await fetch(`http://${location.hostname}:2000/assignteacher`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(obj)
        }).then(res => res.json())
        .then(obj => alert(obj.message))
        .catch(err => console.error(err))


}



addallteacherswithids();