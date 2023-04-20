const player_choice = document.querySelector('.player-choice')
const buttons_arr = document.querySelectorAll('button')
const score_board = document.querySelector('.score-board')

let score = {
    'player': 0, 
    'computer': 0
}

function tossCoin(btn){
    let coin = ['heads', 'tails']
    let player_val = btn.target.value
    let choice = coin[Math.floor(Math.random() * 2)]

    if (choice == player_val){
        score['player'] = 1 + score['player']
    } else {
        score['computer'] = 1 + score['computer']
    }
    player_choice.textContent = `Player Choice: ${player_val} | Computer Choice: ${choice}`
    score_board.textContent = `Player = ${score['player']} | Computer = ${score['computer']}`
    
}

buttons_arr.forEach((btn) => {
    btn.addEventListener('click', tossCoin)
})