const button = document.querySelector('#change-bg')
const date_place = document.querySelector('.date')
const time_place = document.querySelector('.time')
const bg_banner = document.querySelector('#banner')

let bagrounds = [
    '#0d6efd',
    '#6610f2',
    '#6f42c1',
    '#d63384',
    '#dc3545',
    '#fd7e14',
    '#ffc107',
    '#198754',
    '#20c997',
    '#0dcaf0'
]


function curClock(){
    function isZeroNeeded(_val){
        if (_val < 10){
            return `0${_val}`
        } else{
            return _val
        }
    }
    let _date = new Date()
    let h = isZeroNeeded(_date.getHours())  
    let m = isZeroNeeded(_date.getMinutes())
    let s = isZeroNeeded(_date.getSeconds())

    let day = isZeroNeeded(_date.getDate())
    let month = isZeroNeeded(_date.getMonth())
    let year = isZeroNeeded(_date.getFullYear())

    time_place.innerHTML = `${h} : ${m} : ${s}`
    date_place.innerHTML = `${day} / ${month} / ${year}`

    // changeColor()

    setTimeout(() => {
        curClock()
    }, 1000)
}

function changeColor(){
    let _temp = bagrounds.pop()
    bg_banner.style.background = _temp
    bagrounds.unshift(_temp)
}

button.addEventListener('click', changeColor)
curClock()