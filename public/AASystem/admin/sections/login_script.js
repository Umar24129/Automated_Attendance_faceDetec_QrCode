
function submitBtnTapped() {

    let id = document.getElementById("id").value
    let password = document.getElementById("passd").value

    let url = `http://localhost:2000/getstd?id=${id}&passd=${password}`


    // delete
    // localStorage.removeItem("user")

    fetch(url).then(res => res.json())
    .then(obj => {
        if(!obj.message){
        localStorage.setItem("user", JSON.stringify(obj))
        location.replace('admin')
    }else{
        alert(obj.message)
    }
    }).catch(error => console.error(error))
}