const body = document.querySelector('body')
const gamearea = document.querySelector('.gamearea')
const game = document.querySelector('.game')
const startBtn = document.querySelector('.start')

function class_adder(ele, class_str){
    let arr = class_str.split(" ")
    for (i in arr){
        ele.classList.add(arr[i])
    }
}

async function gameLogic(n=2){
    function getRandomNumForLen(n){
        let arr = []
        for (let i=0; i < n; i++){
            arr.push(Math.floor(Math.random() * 4))
        }
        return arr
    }

    async function runSeq(ele){
        ele.style.opacity = '1'
        await new Promise(resolve => setTimeout(resolve, 1000));
        ele.style.opacity = '0.5'
    }

    let comp_press = getRandomNumForLen(n)
    let user_press = []
    const innerBlock = document.querySelectorAll('.innerBlock')
    console.log(user_press, comp_press)
    for(let i=0; i<comp_press.length; i++){
        console.log(12)
        let idx = comp_press[i]
        let block_to_toggle = innerBlock[idx]
        await runSeq(block_to_toggle)
    }

    document.addEventListener('click', async (ele) => {
        ele.target.style.opacity = '1'
        user_press.push(ele.target.value)
        await new Promise(resolve => setTimeout(resolve, 500));
        ele.target.style.opacity = '0.5'
        console.log(user_press)

        if (user_press.length === comp_press.length){
            let checkBtn = document.createElement('button')
            checkBtn.textContent = 'Check'
            checkBtn.style.margin = '0 auto'
            class_adder(checkBtn, 'check btn btn-lg btn-primary m-4')
            
            gamearea.appendChild(checkBtn)

            document.querySelector('.check').addEventListener('click', async () => {
                console.log(user_press.join(), comp_press.join())
                let endPage = document.createElement('div')
                class_adder(endPage, "rounded-3 fs-1 fw-bold text-center")
                endPage.style.width = '500px'
                endPage.style.width = '500px'
                let gamearea = document.querySelector('.gamearea')
                if (user_press.join() == comp_press.join()){
                    gamearea.classList.add('invisible')
                
                    endPage.innerHTML = "CORRECT"
                    endPage.classList.add('bg-success')
                    
                }
                else {
                    user_press = []
                    gamearea.classList.add('invisible')
                
                    endPage.innerHTML = "IN-CORRECT"
                    endPage.classList.add('bg-danger')
                    
                }
                body.replaceChild(endPage, gamearea)
            })
        }


    })
    

}

function createGameArea(){
    let area = document.createElement('div')
    class_adder(area, "game border d-flex flex-wrap rounded-3 bg-light bg-gradient")
    area.style.width = '400px'
    area.style.height = '400px'
    // area.style.width = '100%'

    const color = ['bg-success', 'bg-warning', 'bg-danger', 'bg-primary']
    for (let i=0; i < 4; i++){
        let innerBox = document.createElement('div')
        class_adder(innerBox, `innerBlock ${color[i]} border border-light border-5`)
        innerBox.style.width = '50%'
        innerBox.style.height = '50%'
        innerBox.value = i
        innerBox.style.opacity = '0.5'

        area.appendChild(innerBox)
    }

    gamearea.appendChild(area)
    

}

function start(ele){
    ele.target.classList.add('invisible')
    createGameArea()
    gameLogic()
}

startBtn.addEventListener('click', start)