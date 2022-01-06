
async function submitBtnTapped() {
    console.log("Test 1")

    let id = document.getElementById("id").value
    let password = document.getElementById("passd").value

    let url = `http://${location.hostname}:2000/getadfff?id=${id}&passd=${password}`


    // delete
    // localStorage.removeItem("user")

   await fetch(url).then(res => res.json())
    .then(obj => {
        console.log(obj.message)
        if(!obj.message){
        localStorage.setItem("adminssrrone", JSON.stringify(obj))
        
        location.replace('admin') 
         

    }else{
        alert(obj.message)
    }
    }).catch(error => console.error(error)) 
}