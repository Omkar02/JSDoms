const startButton = document.querySelector('#start')
const gameplay = document.querySelector('.game-play')
const safeKeyLen = 6
let guess = 0

function generateArray(length) {
    const arr = []
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 9) + 1)
    }
    return arr;
  }
  
const genKey = generateArray(safeKeyLen)

function class_adder(ele, class_str){
    let arr = class_str.split(" ")
    for (i in arr){
        ele.classList.add(arr[i])
    }
}

function create_safe(){
    function create_col(idx){
        let col = document.createElement('input')
        col.type = 'number'
        col.id = `input${idx}`
        class_adder(col, "form-control col m-2 fs-1 text-center fw-bold")
        col.min = 0
        col.max = 9

        return col
    }

    let title = document.createElement('div')
    class_adder(title, "fs-1 fw-bold text-center")
    title.style.width = '100%'
    title.textContent = '!Safe Cracker!'
    gameplay.appendChild(title)

    let guess = document.createElement('div')
    class_adder(guess, "fs-3 text-left")
    guess.style.width = '100%'
    guess.textContent = "Number of Guess = 0"
    guess.id = 'guess'
    gameplay.appendChild(guess)

    let row = document.createElement('div')
    row.classList.add('row')
    row.style.height = '120px'
    row.style.width = '100%'

    for (let idx = 0; idx < safeKeyLen; idx++){
        col = create_col(idx)
        row.appendChild(col)
    }

    gameplay.appendChild(row)

    let bottomRow = document.createElement('div')
    class_adder(bottomRow, "mt-3 d-flex flex-wrap align-items-center justify-content-evenly")
    bottomRow.style.width = '100%'

    let badgeLower = document.createElement('div')
    class_adder(badgeLower, "badge bg-primary fs-4")
    badgeLower.textContent = "Guess Lower"

    bottomRow.appendChild(badgeLower)

    let confirmBtn = document.createElement('button')
    confirmBtn.type = "button"
    confirmBtn.id = "submit"
    class_adder(confirmBtn, "btn btn-success btn-lg shadow-lg fs-3 mt-5")
    confirmBtn.textContent = "Submit"

    bottomRow.appendChild(confirmBtn)

    

    let badgeHigher = document.createElement('div')
    class_adder(badgeHigher, "badge bg-danger fs-4")
    badgeHigher.textContent = "Guess Higher"

    bottomRow.appendChild(badgeHigher)

    gameplay.appendChild(bottomRow)

}

function check_lock(){
    function _check_if_equal(ele, idx){
        if (genKey[idx] == ele.value){
            ele.classList.remove('bg-primary')
            ele.classList.remove('bg-danger')
            ele.classList.add('bg-success')
        }
        else {
            if (genKey[idx] > ele.value){
                ele.classList.remove('bg-primary')
                ele.classList.add('bg-danger')
                
            } else {
                ele.classList.remove('bg-danger')
                ele.classList.add('bg-primary')
            }
            guess ++
            document.querySelector('#guess').textContent = `Number of Guess = ${guess}`
        }
    }
    let input_vals = document.querySelectorAll('.col')

    input_vals.forEach(_check_if_equal)
}

function startPlay(e){
    console.log(genKey)
    e.target.classList.toggle('invisible')
    create_safe()
    let submitBtn = document.querySelector('#submit')
    submitBtn.addEventListener('click', check_lock)
    

}

startButton.addEventListener('click', startPlay)