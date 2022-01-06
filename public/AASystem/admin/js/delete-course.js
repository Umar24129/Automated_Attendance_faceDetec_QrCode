async function putingcourseofteacher() {

   // let t_id = document.getElementById('t_id').value
    let objj = document.getElementById('sbt_id').value
  //  let sbt_name = document.getElementById('sbt_name').value
  let obj={
      obj:objj
  }
    console.log(obj)
    
    
    console.log(JSON.stringify(obj) + " testing")
   

    await fetch(`http://${location.hostname}:2000/delsbj`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(obj)
        }).then(res => res.json())
        .then(obj => alert(obj.message))
        .catch(err => console.error(err))


}