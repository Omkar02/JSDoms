const reverse_button = document.querySelector('.reverse-btn')
const forward_button = document.querySelector('.forward-btn')
const image_page = document.querySelector('.image-slide')


const image_list = [
    {
        'url': "https://m.media-amazon.com/images/S/aplus-media-library-service-media/3896fc8a-6f23-49b2-aced-0014e0987f86.__CR0,0,1464,600_PT0_SX1464_V1___.jpg", 
        "caption": "some_caption", 
        "is_active": false
    },
    {
        "url": "https://m.media-amazon.com/images/I/518vel6lTLL._SL1000_.jpg", 
        "caption": "some_caption", 
        "is_active": false
    },
    {
        "url": "https://m.media-amazon.com/images/I/41MloPxj+VL._SL1000_.jpg",
        "caption": "some_caption", 
        "is_active": false
    }
]

let auto_slide = true
let curr_img = 0

function next_image(val){
    curr_img += val
    if (curr_img >= image_list.length ){
        curr_img = 0
        console.log('Reset Pointer For Image!')
    }

    if (curr_img < 0 ){
        curr_img = image_list.length - 1
        console.log('Reset Pointer For Image!')
    }

    console.log(image_list[curr_img], curr_img)
    image_page.src = image_list[curr_img].url
    
}

function manual_image_scroll(e){
    auto_slide = false
    if (e.target.value == 'R'){
        console.log('val-> R')
        next_image(-1)
    } else {
        next_image(1)
    }
    
    setTimeout(() => {
        auto_slide = true
        console.log('starting the loop')
        }, 9000)
}

function stop_img(e){
    if (e.type == 'mouseover'){
        auto_slide = false
    } else {
        auto_slide = true
    }
}

async function auto_image_scroll(){
    while (1){
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (!auto_slide){ 
            continue
        } else {
            next_image(1)
        }
    }
}

[reverse_button, forward_button].forEach(e => {
    e.addEventListener('click', manual_image_scroll)
    }
)


image_page.addEventListener('mouseover', stop_img)
image_page.addEventListener('mouseout', stop_img)

auto_image_scroll()