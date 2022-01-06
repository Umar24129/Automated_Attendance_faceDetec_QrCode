
let url = new URL(location.href)
if (url.searchParams.get("message")) {

}
// if (url.searchParams.get("message")) {
//     alert(url.searchParams.get("message"))
// }
if (url.searchParams.get("message")) {
    alert(url.searchParams.get("message"))
    location.replace("/createteacher")
}
var strngehtmetter= 0
async function addAllSubjects() {

    await fetch(`http://${location.hostname}:2000/getallsubjects`)
        .then(res => res.json())
        .then(obj => {
            let html = `<div style="width: 500;"><select name="subjects_select" class="selectpicker dropdown-dense" multiple data-width="100%" data-size="${obj.length}" data-selected-text-format="count > 3" data-style="btn-primary" title="Choose one of the following..." data-actions-box="true" data-header="Select Subjects" data-live-search="true"
            data-live-search-placeholder="Search ..."> <optgroup label="Subjects" id="dynamic_subjects"> `
            let options = obj.map((value, index) => `<option value="${value.sbt_id}">${value.sbt_id}-${value.sbt_name}-${value.semester}</option>`)
            options = options.join('\n') + "</optgroup>"
            html += options + "</select></div>"
            console.log(html)
            document.getElementById("form-group").innerHTML = html
        })
}

async function submitBtnTapped() {
    if(strngehtmetter<3){
        alert("Please Chose a Stronger Password")
        return
    }

    

    console.log("testing check  ")
  //  let selectSelector = 'body > div > div:nth-child(2) > div.col-md-10 > div > div > div > div > form > div > div:nth-child(6) > div > div > div > div > select'
  //  document.querySelector("#form-group > div > div > select")
    let selectors = document.querySelectorAll("#form-group > div > div > select")["0"]
    let keys = Object.keys(selectors)
    keys.pop()
    keys.pop()

    let values = []
    keys.forEach(key => {
        if (selectors[key].selected) {
            values.push({ sbt_id: selectors[key].value, sbt_name: selectors[key].innerText.split('-')[1], semester: selectors[key].innerText.split('-')[2] })
        }
    })
    document.getElementById("subject").value = JSON.stringify(values)

    await document.getElementById('register-form').submit()
    //  var myHeaders = new Headers();

    //  myHeaders.append('trash', 'text/xml');


}

function paswordmeter() {
    var strength = {
        0: "Worst ☹",
        1: "Bad ☹",
        2: "Weak ☹",
        3: "Good ☺",
        4: "Strong ☻"
    }
    console.log("testing if pass")
    var password = document.getElementById('passd');
    var meter = document.getElementById('password-strength-meter');
    var text = document.getElementById('password-strength-text');

    password.addEventListener('input', function () {
        var val = password.value;
        var result = zxcvbn(val);

        // Update the password strength meter
        strngehtmetter = result.score
        console.log(strngehtmetter)
        meter.value = result.score;

        // Update the text indicator
        if (val !== "") {
            text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span";

        }
        else {
            text.innerHTML = "";
        }
    });
}
paswordmeter()

addAllSubjects()