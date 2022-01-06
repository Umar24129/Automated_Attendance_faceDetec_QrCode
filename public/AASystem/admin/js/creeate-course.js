
async function createsubjects(){
   let sbt_id= document.getElementById("sbt_id").value
   let sbt_name=document.getElementById("sbt_name").value
console.log(sbt_id)
console.log(sbt_name)  //insertsubject
let obj={
    sbt_id:sbt_id,
    sbt_name:sbt_name
}
console.log(JSON.stringify(obj))


await fetch(`http://${location.hostname}:2000/insertsubject`,
{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST", 
    body: JSON.stringify(obj)
},{cache: "no-store"}).then(res => res.json())
.then(obj => alert(obj.message))
.catch(err => console.error(err))

}

