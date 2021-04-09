const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $result = document.querySelector('#result');
const $gameTime = document.querySelector('#game-time');

const colors = [
  'radial-gradient(circle, rgba(68,208,57,1) 0%, rgba(148,237,246,0.8435749299719888) 100%)',
  'radial-gradient(circle, rgba(251,63,190,1) 0%, rgba(252,161,252,1) 100%)',
  'radial-gradient(circle, rgba(250,251,63,1) 0%, rgba(252,199,161,1) 100%)',
  'radial-gradient(circle, rgba(242,146,132,1) 20%, rgba(255,10,10,0.9051995798319328) 100%)'
];
const bgColors = [
  'rgb(68,208,57)',
  'rgb(251,63,190)',
  'rgb(250,251,63)',
  'rgb(242,146,132)'
]
let score = 0;
let isGameSatrted = false;

// Event Listener
$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime)

// Start Game
function startGame(){
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', true)
  isGameSatrted = true 
  $game.style.backgroundColor = '#fff'
  $start.classList.add('hide');
 
  let interval = setInterval(function(){
    let time = parseFloat($time.textContent)
    if (time <=0){
      clearInterval(interval)
      endGame()
    } else{
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)
  renderBox();
}
function setGameScore(){
  $result.textContent = score.toString();
}
function setGameTime(){
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  $timeHeader.classList.remove('hide')
  $resultHeader.classList.add('hide')
}
// End Game
function endGame(){
  isGameSatrted = false
  $gameTime.removeAttribute('disabled')
  setGameScore()
  $start.classList.remove('hide')
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  $timeHeader.classList.add('hide')
  $resultHeader.classList.remove('hide')
  
}
function handleBoxClick(event){
  if (!isGameSatrted){
    return 
  }
    if (event.target.dataset.box){
      score++
      renderBox();
    }
  }
function renderBox(){
  $game.innerHTML = ''
  const box = document.createElement('div');
  let boxSize = getRandom(50,150);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  let randomColorIndex = getRandom(0, colors.length);
  let randomBgColorIndex = getRandom(0, bgColors.length);
  box.style.height = box.style.width = `${boxSize}px`
  box.style.position = 'absolute'
  box.style.borderRadius = '100%'
  box.style.backgroundColor = bgColors[randomBgColorIndex]
  box.style.background = colors[randomColorIndex]
  box.style.top = `${getRandom(0, maxTop)}px`
  box.style.left = `${getRandom(0, maxLeft)}px`
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', true)

  $game.insertAdjacentElement('afterbegin', box)
}
function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min)
} 


