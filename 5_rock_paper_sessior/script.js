const player_choice = document.querySelector('.player-choice')
const buttons_arr = document.querySelectorAll('button')
const score_board = document.querySelector('.score-board')

let score = {
    'player': 0, 
    'computer': 0
}

function play(btn){
    let coin = ['rock', 'paper', 'scissors']
    let player_val = btn.target.value
    let choice = coin[Math.floor(Math.random() * 3)]

    if (choice == 'rock' & player_val == 'paper'){
        score['player'] += 1
    } else if (choice == 'paper' & player_val == 'scissors'){
        score['player'] += 1
    } else if (choice == 'scissors' & player_val == 'rock'){
        score['player'] += 1
    } else if (choice == player_val){
        player_choice.textContent = `Draw`
    } else {
        score['computer'] += 1
    }

    player_choice.textContent = `Player Choice: ${player_val} | Computer Choice: ${choice}`
    score_board.textContent = `Player = ${score['player']} | Computer = ${score['computer']}`
    
}

buttons_arr.forEach((btn) => {
    btn.addEventListener('click', play)
})