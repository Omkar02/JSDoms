const main = document.querySelector('main')
const add_button = document.querySelector('.add-item')
const delete_area = document.querySelector('.delete-area')
const drag_obj_area = document.querySelector('.drag-area')

let drag_obj = []
let color = ['danger', 'primary', 'warning', 'success', 'dark']
let cnt = 0

function class_adder(ele, class_str){
    let arr = class_str.split(" ")
    for (i in arr){
        ele.classList.add(arr[i])
    }
}

function bounry_resolver(parentDiv){

    const maxTop = parentDiv.clientHeight - 50 // Subtract 50 to account for the height of the new div
    const maxLeft = parentDiv.clientWidth - 50 // Subtract 50 to account for the width of the new div

    // Generate random top and left positions
    const randomTop = Math.floor(Math.random() * maxTop)
    const randomLeft = Math.floor(Math.random() * maxLeft)

    return {'x': randomLeft, 'y': randomTop}
}

function add_object(){
    let res = bounry_resolver(drag_obj_area)
    let polygon = document.createElement('div')
    class_adder(polygon, `drag-obj bg-${color[cnt]} rounded shadow border border-${color[cnt]} position-absolute`)
    polygon.style.height = '50px'
    polygon.style.width = '50px'
    polygon.style.opacity = '0.5'
    polygon.style.top = `${res['y']}px`
    polygon.style.left = `${res['x']}px`
    polygon.style.cursor = 'move'

    // console.log(polygon)
    drag_obj_area.appendChild(polygon)
    polygon.addEventListener('click', drag_it)
    cnt += 1
    if (cnt >= color.length){ cnt = 0}
}


function drag_it(ele){
    function isCollide(a) {
        let aRect = a.target.getBoundingClientRect();
        let bRect = delete_area.getBoundingClientRect();
        return !(
            (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
    }

    function move(event){
        let mouseX = event.clientX
        let mouseY = event.clientY

        let containerRect = drag_obj_area.getBoundingClientRect()

        let myDivRect = ele.target.getBoundingClientRect()

        let offsetX = mouseX - containerRect.left - (myDivRect.width / 2)
        let offsetY = mouseY - containerRect.top - (myDivRect.height / 2)

        // Limit the position within the container's boundaries
        offsetX = Math.max(0, Math.min(offsetX, containerRect.width - myDivRect.width))
        offsetY = Math.max(0, Math.min(offsetY, containerRect.height - myDivRect.height))

        ele.target.style.left = offsetX + 'px'
        ele.target.style.top = offsetY + 'px'

        if (isCollide(ele)){
            drag_obj_area.removeChild(ele.target)
        }
    }
    main.addEventListener('mousemove', move)
}

add_button.addEventListener('click', add_object)
