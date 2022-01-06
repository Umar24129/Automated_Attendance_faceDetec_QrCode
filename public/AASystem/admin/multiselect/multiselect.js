function multiselectTapped() {
    let hidden = document.getElementById('multiselect_style_list_ul').hidden
    document.getElementById('multiselect_style_list_ul').hidden = !hidden
}

function multiselect() {
    // #0074D9
    const length = document.getElementById('multiselect_style').getAttribute('data-length')
    let selected = Object.keys(Array.from(Array(Number(length)+1))).map(() => false)
    let doneIcons = hideDoneImage()
    let multiselect_values = getMultiSelectValues()
    const placeholder = document.getElementById('multiselect_style_p').innerText
    console.log(multiselect_values)
    
    document.getElementById('multiselect_style_list_ul').addEventListener('click', (e) => {
      
        if (e.target.nodeName === 'UL' || e.target.nodeName === 'I')  { return }
        let id = Number(e.target.id)
        console.log(id + ',' + e.target.getAttribute('value'))
        console.log(e.target.nodeName)
        if(e.target.nodeName == "LI" && e.target.getAttribute('value') !== 'SA') {
            selected[id] = !selected[id]
            doneIcons[id - 1].style.color = selected[id] ? 'white' : '#0074D9'
            document.getElementById('multiselect_style_p').innerText = getSelectedText()
            document.getElementById('multiselect_style').setAttribute('selected-index', getSelectedIndex())
        } else {
            selected[0] = !selected[0]
            document.getElementById('multiselect_style_p').innerText = selected[0] ? 'All Selected' : placeholder
            selected = Object.keys(Array.from(Array(Number(length)+1))).map(() => selected[0])
            doneIcons.forEach(e => { e.style.color = selected[0] ? 'white' : '#0074D9' })
            document.getElementById('multiselect_style').setAttribute('selected-index', getSelectedIndex())
        }
    })

    function getSelectedIndex() {
        let index = []
        for(let i=1;i<selected.length;i++){
            if (selected[i]) index.push(i-1)
        }
        return index
    }

    function getSelectedText() {
        let value = ''
        let count = 1
        for(let i=1;i<selected.length;i++) {
            if(selected[i]) {
                value += multiselect_values[i] + ','
                count +=1
            }
        }
        if (count == selected.length) { selected[0] = true ; return 'All Selected'}
        else {value.length == 0} {selected[0] = false } 
        value = value.substring(0, value.length-1)
        return value.length === 0 ? placeholder : value
    }
}

function hideDoneImage() {
    let doneicon = [...document.getElementById('multiselect_style_list_ul').getElementsByTagName('i')].slice(1)
    doneicon.forEach(e => {
        e.style.color = '#0074D9'
    })
    return doneicon
}

function getMultiSelectValues() {
    let values = [...document.getElementById('multiselect_style_list_ul').getElementsByTagName('li')]
    return values.map(e => e.innerText.replace('done','').trim())
}