const textBox = document.querySelector('textarea')
const validFeedback = document.querySelector('.valid-feedback')
const invalidFeedback = document.querySelector('.invalid-feedback')


const charLimit = 30
const textEventListners = ['keyup', 'change']

function check(){
    let curCount = textBox.value.length
    let curVal = textBox.value
    if (curCount >= charLimit){
        textBox.value = curVal.substring(0, charLimit)
        invalidFeedback.textContent = `Total char limit = ${charLimit}`
        textBox.classList.remove('is-valid')
        textBox.classList.add('is-invalid')


    } else {
        validFeedback.textContent = `Remaning char = ${charLimit - curCount}`
        textBox.classList.remove('is-invalid')
        textBox.classList.add('is-valid')
    }
}

textEventListners.forEach(e => {
    textBox.addEventListener(e, check)
})
