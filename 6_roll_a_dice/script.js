const button = document.querySelector('button')
const dice = document.querySelector('.dice')

button.addEventListener('click', () => {
    let rNum = Math.floor(Math.random() * 6) + 1
    dice.innerHTML = `&#${9855 + rNum};`
})