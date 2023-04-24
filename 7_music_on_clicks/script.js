const button = document.querySelectorAll('button')

function playSound(e){
    let fName = e.target.value
    let btn = document.querySelector(`.${fName}`)
    
    btn.classList.add('btn-success')
    btn.classList.remove('btn-danger')
    
    let sound = new Audio(`assets/${fName}.wav`)
    sound.play()
    
    setTimeout(() => {
        btn.classList.remove('btn-success')
        btn.classList.add('btn-danger')
        console.log('removed')
    }, 1000)
}


button.forEach((btn) => {
    btn.addEventListener('click', playSound)
})