
{/* <div id="multiselect_style" onclick="multiselectTapped();" data="[Computer Science,Data Science,Computer Vision]">
        <p id="multiselect_style_p">Select Subjects</p>
        <i class="material-icons" id="multiselect_style_i"> keyboard_arrow_down </i>
    </div>

    <div id="multiselect_style_list">
        <ul id="multiselect_style_list_ul">
                <li id="0"><i class="material-icons">done</i> <p>Select All</p></li>
                <li id="1"><i class="material-icons" >done</i> <p>Computer Science</p></li>
                <li id="2"><i class="material-icons" >done</i> <p>Data Science</p></li>
                <li id="3"><i class="material-icons" >done</i> <p>Computer Vision</p></li>
            </ul>
</div> */}

async function addDataToMultiSelect() {
    try {
        const request = await fetch('http://localhost:2000/getallsubjects')
        const data = await request.json()

        let otherHtml = `<div id="multiselect_style" onclick="multiselectTapped();" data-length=${data.length} selected-index="">
                            <p id="multiselect_style_p">Select Subjects</p>
                            <i class="material-icons" id="multiselect_style_i"> keyboard_arrow_down </i>
                            </div>`
        let listHtml = `<div id="multiselect_style_list"> <ul id="multiselect_style_list_ul">`
        let list = data.map((value, index) => `<li id=${index + 1} value=${value.sbt_id}><i class="material-icons">done</i> <p>${value.sbt_id}-${value.sbt_name}-${value.semester}</p></li>`).join('')
        list = `<li id=0 value=SA><i class="material-icons">done</i> <p>Select All</p></li>` + list

        return otherHtml + listHtml + list + "</ul></div>"
    } catch (error) {
        console.error(error)
        return null;
    }
}

addDataToMultiSelect().then(html => {
    if(html !=null ) {
        console.log(html)
        document.getElementById('multiselect').innerHTML = html
        document.getElementById('multiselect_style_list_ul').hidden = true
        multiselect()
    }
})