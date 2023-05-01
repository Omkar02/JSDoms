const playArea = {}
const player = {}
const ids = [
    'one', 'two', 'three', 'four', 
    'five', 'six', 'seven', 'eight', 
    'eleven', 'twelve'
]
const gameData = {
    "data": [
        {
            "icon": "\u0026#8902;",
            "value": 10
        },
        {
            "icon": "\u0026#10031;",
            "value": -30
        },
        {
            "icon": "\u0026#10036;",
            "value": 50
        },
        {
            "icon": "\u0026#10042;",
            "value": 70
        },
        {
            "icon": "\u0026#10084;",
            "value": -75
        },
        {
            "icon": "\u0026#9813;",
            "value": 50
        },
        {
            "icon": "\u0026#9822;",
            "value": 60
        },
        {
            "icon": "\u0026#9924;",
            "value": -40
        },
        {
            "icon": "\u0026#9971;",
            "value": 100
        },
        {
            "icon": "\u0026#9729;",
            "value": -50
        },
        {
            "icon": "\u0026#9785;",
            "value": -100
        },
        {
            "icon": "\u0026#9760;",
            "value": -250
        }
    ]
}

// classer adder
function class_adder(ele, class_str){
    let arr = class_str.split(" ")
    for (i in arr){
        ele.classList.add(arr[i])
    }
}


// setting up playArea obj
playArea.stats = document.querySelector('.stats')
playArea.main = document.querySelector('.main')
playArea.game = document.querySelector('.game')
playArea.over = document.querySelector('.over')
playArea.btns = Array.from(document.querySelectorAll('.btn'))
playArea.pages = Array.from(document.querySelectorAll('.page'))


// adding eventlistner for btn
playArea.btns.forEach((ele) => {
    ele.addEventListener('click', handleBtn)
})

function handleBtn(e) {
    if (e.target.value == 'newGame') {
        console.log('Starting New Game!')
        startGame()
    } else if (e.target.classList.contains('pop')){
        // game logic
        player['score'] += e.target.value
        if (player['score'] < 0){
            player['life'] -= 1
            player['score'] = 0
            if (player['life'] == 0){
                player.gameOver = true
            }
        }
        renderStats()
    } else if (e.target.value == 'retry'){
        console.log('Retrying Game!')
        startGame(newGame=false)
    }
}

async function startGame(newGame=true) {
    // setting up player obj
    player.score = 0
    player.life = 2
    player.gameOver = false
    playArea.over.classList.add('d-none')
    playArea.main.classList.add('d-none')
    playArea.stats.classList.remove('d-none')
    playArea.game.classList.remove('d-none')
    renderStats()
    if (newGame){
        renderBoard()
    }
    while(!player.gameOver){
        console.log(1)
        popLogic()
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    gameOver()
    

}

function renderStats(){
    playArea.stats.innerHTML = `Score: ${player.score}<br>Life: ${player.life}`
}

function renderBoard(){
    let row = document.createElement('div')
    class_adder(row, "row row-cols-4 align-items-center w-100 h-100 mx-auto")
    for (let i=0; i<12; i++){
        let col = document.createElement('div')
        class_adder(col, "btn col m-2 d-flex align-items-center justify-content-center rounded bg-light fs-5 fw-bold")
        col.style.width = '215px'
        col.style.height = '80px'
        col.textContent = 'X'
        col.style.opacity = '0.5'
        col.id = `${ids[i]}block`

        row.appendChild(col)
    }
    playArea.game.appendChild(row)
    playArea.btns = Array.from(document.querySelectorAll('.btn'))
    playArea.btns.forEach((ele) => {
        ele.addEventListener('click', handleBtn)
    })
    
}

async function popLogic(){
    let random = Math.floor(Math.random() * 12)
    let block = document.querySelector(`#${ids[random]}Block`)
     
    block.style.opacity = '1'
    block.innerHTML = `${gameData['data'][random]['icon']}<br>${gameData['data'][random]['value']}`
    block.value = gameData['data'][random]['value']
    block.classList.add('pop')

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`removing from ${ids[random]}Block}`)
    block.style.opacity = '0.5'
    block.innerHTML = 'X'
    block.value = 0
    block.classList.remove('pop')

}

async function gameOver(){
    playArea.stats.classList.add('d-none')
    playArea.game.classList.add('d-none')
    playArea.over.classList.remove('d-none')
    await new Promise(resolve => setTimeout(resolve, 5000))

    playArea.btns = Array.from(document.querySelectorAll('.btn'))
    playArea.btns.forEach((ele) => {
        ele.addEventListener('click', handleBtn)
    })
}