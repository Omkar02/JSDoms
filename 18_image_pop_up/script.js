const image_section = document.querySelector('.images')
const pop_section = document.querySelector('.pop')
const images = document.querySelectorAll('.to-pop-image')
const img_out = document.querySelector('.out')
const pop_image_close = document.querySelector('.close')



function popUpImage(ele){
    let src = ele.target.src
    image_section.style.opacity = '0.5'
    image_section.style.filter = 'blur(10px)'
    image_section.style.pointerEvents = 'none'
    img_out.src = src
    pop_section.classList.remove('d-none')
}

images.forEach(ele => {
    ele.addEventListener('click', popUpImage)
})

function popDownImage(){
    image_section.style.opacity = '1'
    image_section.style.filter = 'blur(0px)'
    image_section.style.pointerEvents = 'auto'
    pop_section.classList.add('d-none')
    img_out.src = ""

}


pop_image_close.addEventListener('click', popDownImage)