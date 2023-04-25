const commands = document.querySelector('.cmd-array')
let circle = document.querySelector('.circle')

const default_circle_left = circle.offsetLeft
const default_circle_top = circle.offsetTop

let w = window.innerWidth - 100;
let h = window.innerHeight - 100;

let cmd_array = []
let child_btns = []
let idx = 0

function reset(e){
    if (e.keyCode == 27){
        console.log(e.keyCode)
        circle.style.left = 0
        circle.style.top = 200
    }
}

function keyMover(e){
    let key_code = e.keyCode
    if (key_code === 37) {
        cmd_array.push(goRight)
        let btn = create_button('right')
        child_btns.push(btn)
    }
    else if (key_code === 39) {
        cmd_array.push(goLeft)
        let btn = create_button('left')
        child_btns.push(btn)
    }
    else if (key_code === 38) {
        cmd_array.push(goUp)
        let btn = create_button('up')
        child_btns.push(btn)
    }
    else if (key_code === 40) {
        cmd_array.push(goDown)
        let btn = create_button('down')
        child_btns.push(btn)
    }
}

function goLeft(){
    let curPos = circle.offsetLeft
    curPos += 100
    if (curPos > w) { curPos = default_circle_left }
    circle.style.left = `${curPos}px`
}

function goRight(){
    let curPos = circle.offsetLeft
    curPos -= 100
    if (curPos < 0) { curPos = w }
    circle.style.left = `${curPos}px`
}
function goUp(){
    let curPos = circle.offsetTop
    curPos -= 100
    if (curPos < 200) { curPos = h }
    circle.style.top = `${curPos}px`
}

function goDown(){
    let curPos = circle.offsetTop
    curPos += 100
    if (curPos > h) { curPos = default_circle_top }
    circle.style.top = `${curPos}px`
}

function toRemove(e){
    let curIndex = child_btns.indexOf(this)
    cmd_array.splice(curIndex, 1)
    child_btns.splice(curIndex, 1)
    commands.removeChild(this)
    idx -= 1
    console.log(cmd_array, idx)
}

function create_button(val){
    let btn = document.createElement('button')
    let clases = ['btn-danger', 'btn', 'fw-bold', 'fs-4', 'm-1']
    for (let x in clases){
        btn.classList.add(clases[x])
    }
    btn.innerText = val
    btn.id = idx
    idx += 1
    commands.appendChild(btn)

    btn.addEventListener('click', toRemove)
    return btn
}  

async function run(e){
    if (e.keyCode === 32) {
        while (cmd_array){
            let tmp = cmd_array.pop()
            let b = child_btns.pop()
            if (tmp){
                tmp()
                commands.removeChild(b)
                await new Promise(resolve => setTimeout(resolve, 50));
            } else{
                idx = 0
                break
            }
        }
        console.log(cmd_array)
        console.log(idx)
    }
}

document.addEventListener('keydown', keyMover)
document.addEventListener('keydown', run)
document.addEventListener('keydown', reset)