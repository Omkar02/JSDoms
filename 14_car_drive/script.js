const carGame = {}

carGame.startPage = document.querySelector('.start-page')
carGame.gamePage = document.querySelector('.game-page')
carGame.gameOver = document.querySelector('.game-over-page')
carGame.stats = document.querySelector('.score')
carGame.play = document.querySelector('.play')
carGame.startButton = document.querySelector('.start')
carGame.Started = false

let speed = 10
let line_speed = 8
let game_score = 0

const keyPressed = {
    "ArrowLeft": false,
    "ArrowUp": false,
    "ArrowRight": false,
    "ArrowDown": false
}

function class_adder(ele, class_str){
    let arr = class_str.split(" ")
    for (i in arr){
        ele.classList.add(arr[i])
    }
}

document.addEventListener('keydown', (e) => {
    keyPressed[e.key] = true
})

document.addEventListener('keyup', (e) => {
    keyPressed[e.key] = false
    
})

function startGame(){
    carGame.startPage.classList.add('d-none')
    carGame.gamePage.classList.remove('d-none')
    create_road()
    let car = document.createElement('div')
    class_adder(car, "bg-light shadow rounded position-absolute")
    car.style.height = '40px'
    car.style.width = '25px'
    car.style.left = '50%'
    car.style.right = '50%'
    car.style.top = '75%'
    car.style.bottom = '25%'
    carGame.car = car
    carGame.startButton
    carGame.Started = true
    carGame.play.appendChild(car)
    window.requestAnimationFrame(playGame)
    spawn_car_and_move()
    colision_detection()
}

function create_road(){
    let lanes = 7
    let lines = 6

    let bound = carGame.play.getBoundingClientRect()
    let minX = bound['x']
    let maxX = bound['width'] + bound['x']
    let minY = bound['y']
    let maxY = bound['height'] + bound['y'] 
    
    
    let _bottom = minY

    const lane_gap = Math.floor((minX + minY) / lines)
    for(let i=0; i < lanes; i++){
        let _lane = document.createElement("div")
        class_adder(_lane, "w-100 d-flex justify-content-evenly")
        let left = lane_gap + 300//- (maxX / lines) + 220
        for(let j=0; j < lines; j++){
            let _line = document.createElement("div")
            class_adder(_line, "bg-dark move-lines position-absolute")
            _line.style.height = '70px'
            _line.style.width = '10px'
            _line.style.opacity = '0.5'
            
            left += lane_gap + 50
            _line.style.left = left
            _line.style.top = _bottom


            _lane.appendChild(_line)
        }
        _bottom += (maxY - minY) / lanes
        carGame.play.appendChild(_lane)
    }
}

function move_line(){
    let lines = document.querySelectorAll('.move-lines')

    let bound = carGame.play.getBoundingClientRect()
    let minY = bound['y']
    let maxY = bound['height'] + bound['y']

    lines.forEach((ele) => {
        let curPos = ele.offsetTop
        curPos += line_speed
        if (curPos > maxY - 75) { curPos = minY }
        ele.style.top = curPos
    })

}

function move_obj_car(){
    let obj_car = document.querySelectorAll('.remove-done')
    obj_car.forEach((ele) => {
        let curPos = ele.offsetTop
        curPos += line_speed
        ele.style.top = curPos
    })
}

function remove_ouside_play_area(){
    let bound = carGame.play.getBoundingClientRect()
    let maxY = bound['height'] + bound['y'] - 40 
    let obj_car = document.querySelectorAll('.remove-done')
    obj_car.forEach((ele) => {
        if (ele.offsetTop > maxY){
            carGame.play.removeChild(ele)
        }
        
    })
}

async function spawn_car_and_move(){

    let bound = carGame.play.getBoundingClientRect()
    let minX = bound['x']
    let maxX = bound['width'] + bound['x']  - 25
    let minY = bound['y']
    let maxY = bound['height'] + bound['y'] - 40 

    let hardness = 120
    let level_change_step = 20
    let cur_level_step = 0
    while (1){
        await new Promise(resolve => setTimeout(resolve, hardness));
        let other_car = document.createElement('div')
        class_adder(other_car, "bg-warning shadow rounded position-absolute remove-done")
        other_car.style.height = '40px'
        other_car.style.width = '25px'
        other_car.style.right = `${Math.floor(Math.random() * (maxX - minX + 1)) + minX}`
        other_car.style.top = minY
        other_car.style.bottom = '25%'
        carGame.play.appendChild(other_car)
        cur_level_step += 1
        console.log(hardness)
        if (cur_level_step == level_change_step){
            hardness -= 1
            cur_level_step = 0
            line_speed += 0.5
            speed += 0.5
        }
        if (!carGame.Started){
            break
        }
        
    }
}

async function colision_detection(){
    not_to_break = true
    while (not_to_break){
        await new Promise(resolve => setTimeout(resolve, 1))
        let carPos = carGame.car.getBoundingClientRect()
        let carObst = document.querySelectorAll('.remove-done')
        carObst.forEach(ele => { 
            let obstPos = ele.getBoundingClientRect()
            if (!((carPos.bottom < obstPos.top) || (carPos.top > obstPos.bottom) || (carPos.right < obstPos.left) || (carPos.left > obstPos.right))){
                carGame.Started = false
                not_to_break = false
                carGame.gamePage.classList.add('d-none')
                carGame.gameOver.classList.remove('d-none')
                let final_score = document.querySelector('.final-score')
                final_score.textContent = carGame.stats.textContent
                    }
                }
            )
        }
}

function score(){
    game_score += 1
    carGame.stats.textContent = game_score
}

function playGame(){

    if (carGame.Started){
        let bound = carGame.play.getBoundingClientRect()
        let minX = bound['x']
        // to get max we need to add min + max - innerObj i.e car height
        let maxX = bound['width'] + bound['x'] - 25

        let minY = bound['y']
        // to get max we need to add min + max - innerObj i.e car width
        let maxY = bound['height'] + bound['y'] - 40 
        if (keyPressed['ArrowRight']){
            let curPos = carGame.car.offsetLeft
            curPos += speed
            if (curPos < minX) { curPos = minX}
            if (curPos > maxX) { curPos = maxX}
            carGame.car.style.left = `${curPos}px`

        } if (keyPressed['ArrowLeft']) {
            let curPos = carGame.car.offsetLeft
            curPos -= speed
            if (curPos < minX) { curPos = minX}
            if (curPos > maxX) { curPos = maxX}
            carGame.car.style.left = `${curPos}px`

        } if (keyPressed['ArrowUp']) {
            let curPos = carGame.car.offsetTop
            curPos -= speed
            if (curPos < minY) { curPos = minY}
            if (curPos > maxY) { curPos = maxY}
            carGame.car.style.top = `${curPos}px`

        } if (keyPressed['ArrowDown']) {
            let curPos = carGame.car.offsetTop
            curPos += speed
            if (curPos < minY) { curPos = minY}
            if (curPos > maxY) { curPos = maxY}
            carGame.car.style.top = `${curPos}px`
        }

        move_line()
        setTimeout(() => {
            requestAnimationFrame(playGame)
            move_obj_car()
            remove_ouside_play_area()
            score()
          }, 1000 / 60 );
    }
}

carGame.startButton.addEventListener('click', startGame)

