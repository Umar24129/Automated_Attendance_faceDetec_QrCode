

async function deletestudent() {
    if (confirm('Are you sure you want to Delete this Student')) {
         // let t_id = document.getElementById('t_id').value
    var e = document.getElementById("studentnameid");
    var resulta = e.options[e.selectedIndex].text;


    //  return
    result = resulta.split(",")[1]
    console.log(result + "  A")
    //  let sbt_name = document.getElementById('sbt_name').value
    let obj = {
        obj: result
    }
    console.log(obj)


    console.log(JSON.stringify(obj) + " testing")


    await fetch(`http://${location.hostname}:2000/delstd`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(obj)
        }).then(res => res.json())
        .then(obj => {alert(obj.message)
          location.replace('deletestudent')
         // document.window.
        })
        .catch(err => console.error(err))

    } else {
        return
    }
}

async function addallstudentwithids() {
    await fetch(`http://${location.hostname}:2000/getalstd`)
        .then(res => res.json())
        .then(obj => {
            console.log(obj[0].id + " Student check")
            let html = obj.map((value, index) => {

                let a = (value.name_student + "," + value.id)
                console.log(a + "test checj student")
                if (value.t_id === "") return ""
                return `<option value="${index}">${a}</option>`

            }).join("\n")
            document.getElementById('studentnameid').innerHTML = html


        })


}

addallstudentwithids()
