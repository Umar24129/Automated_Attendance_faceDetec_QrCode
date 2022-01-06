
function submitBtnTapped() {
    console.log("Test 1")

    let id = document.getElementById("id").value
    let password = document.getElementById("passd").value

    let url = `http://${location.hostname}:2000/gett?id=${id}&passd=${password}`


    // delete
    // localStorage.removeItem("user")

    fetch(url).then(res => res.json())
    .then(obj => {
        console.log(obj.message)
        if(!obj.message){
        localStorage.setItem("teacherrone", JSON.stringify(obj))
        location.replace('teacherdash')
    }else{
        alert(obj.message)
    }
    }).catch(error => console.error(error))
}