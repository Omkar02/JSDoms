const accordion = document.querySelectorAll('.panel')

function toggleElement(e) {
    
    accordion.forEach((ele) => {
        if (e.target.parentElement === ele){
            ele.classList.toggle('active')
            console.log(e.target.parentElement)
        } else {
            ele.classList.remove('active')
        }
    })
}

accordion.forEach((e) => {
    e.addEventListener('click', toggleElement)
})
