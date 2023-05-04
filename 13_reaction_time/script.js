const start = document.querySelector('.start')
const gameArea = document.querySelector('.gamearea')
const seconds = document.querySelector('.time-in-sec')

const CHANCE_COUNT = 10
let totalAvg = []

let width_min = gameArea.offsetLeft
let height_min = gameArea.offsetTop
let width_max = gameArea.offsetWidth
let height_max = gameArea.offsetHeight


console.log( width_min,
    height_min,
    width_max,
    height_max)

function class_adder(ele, class_str){
    let arr = class_str.split(" ")
    for (i in arr){
        ele.classList.add(arr[i])
    }
}

function spawnTarget(){
    function getRandom(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }
    let target = document.createElement('div')
    class_adder(target, "target bg-warning rounded shadow position-absolute")
    target.style.height = '50px'
    target.style.width = '50px'

    let curPos = target.offsetLeft
    let xPos = curPos + getRandom(width_min, width_max)
    let yPos = curPos + getRandom(height_min, height_max)

    target.style.left = xPos
    target.style.top = yPos
    target.startTime = new Date().getTime()

    target.addEventListener('click', timeFunction)

    gameArea.appendChild(target)  
    console.log(totalAvg)  
}

function timeFunction(ele){
    let endTime = new Date().getTime()
    let startTime = ele.target.startTime

    gameArea.removeChild(this)
    
    let totalTime = (endTime - startTime)/1000
    
    totalAvg.push(totalTime)
    seconds.textContent = `${totalTime} sec`
}

function avg(arr){
    return Math.floor(arr.reduce((p, c) => p + c, 0) / arr.length)
}

async function startGame(){
    let targetCount = CHANCE_COUNT
    totalAvg = []
    start.classList.add('invisible')
    while (targetCount){
        await new Promise(resolve => setTimeout(resolve, 1000));
        spawnTarget()
        targetCount -= 1
    }
    start.classList.remove('invisible')
    let executed = false
    while(!executed){
        console.log(totalAvg.length , targetCount)
        if (totalAvg.length == CHANCE_COUNT){
            executed = true
            seconds.textContent = `${avg(totalAvg)} sec/click`
            break
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
}

start.addEventListener('click', startGame)
