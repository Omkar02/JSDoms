// getBoundingClientRect

// top: Represents the distance between the top edge of the 
//      element and the top edge of the viewport.
// right: Represents the distance between the right edge of 
//        the element and the right edge of the viewport.
// bottom: Represents the distance between the bottom edge 
//         of the element and the bottom edge of the viewport.
// left: Represents the distance between the left edge of the 
//       element and the left edge of the viewport.

// width: Represents the width of the element.
// height: Represents the height of the element.

const view_box = document.querySelector('.view-box')
const to_scroll = document.querySelector('.scroll-text-box')

const bounry = view_box.getClientRects()[0]
let scrolling = true


window.onload = setup_scroll


function setup_scroll(){
    to_scroll.style.top = bounry.height
    scroll_ele()
}

async function scroll_ele(){

    function get_speed_val(){
        let scroll_speed_val = document.querySelector('.scroll-speed-val').value
        document.querySelector('.scroll-speed-val-disp').textContent = scroll_speed_val
        return parseInt(scroll_speed_val)
    }

    function is_above(ele){
        if (ele.type == 'mouseenter'){
            scrolling = false
        } else {
            scrolling = true
        }
    }
    
    view_box.addEventListener('mouseenter', is_above)
    view_box.addEventListener('mouseleave', is_above)

    while (1){
        if (scrolling){
            let speed_val = get_speed_val()
            let to_scroll = (document.querySelector('.scroll-text-box'))
            let curPos = to_scroll.offsetTop
            to_scroll.style.top =  curPos - speed_val
            if (parseInt(to_scroll.clientHeight) + parseInt(to_scroll.style.top) < 0){
                to_scroll.style.top = bounry.height
            }
            // console.log(parseInt(to_scroll.clientHeight) + parseInt(to_scroll.style.top), speed_val, bounry.top, bounry.bottom)
        }
        await new Promise(resolve => setTimeout(resolve, 30))
    }
}