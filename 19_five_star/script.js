const stars = document.querySelectorAll('.star')
const msg = document.querySelector('.message')
const _eventListner = ['click', 'mouseover', 'mouseout']
let isNotClicked = true

function addValues(){
    for(let i in stars){
        stars[i].starValue = Number.parseInt(i) 
    }
}


function ratingFunction(ele){
    
    function setColor(val){
        for(let i in stars){
            if (stars[i]){
                stars[i].style.color = val
            }
            if (i == Number.parseInt(ele.target.starValue)){
                break
            }
        }
    }

    function resetColor(){
        stars.forEach(s => {
            s.style.color = ''
        })
    }

    if(ele.type == 'mouseover'){
        resetColor()
        setColor('#E8AA42')
        isNotClicked = true
        msg.textContent = ''

    } else if (ele.type == 'mouseout' & isNotClicked) {
        setColor('')
            
    } else {
        setColor('#E8AA42')
        isNotClicked = false
        msg.textContent = `Rated ${ele.target.starValue + 1} Stars!`

    }
}

_eventListner.forEach(event => {
    stars.forEach(s => {
        s.addEventListener(event, ratingFunction)
    })
})

addValues()