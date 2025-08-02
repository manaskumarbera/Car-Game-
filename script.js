const car = document.getElementById('car');
const road = document.getElementById('road');
const scoreDisplay = document.getElementById('score');

let score = 0;
let left = 175;
let enemySpeed = 3;
let gameInterval;
let enemies = [];

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && left > 0) left -= 10;
  if (e.key === 'ArrowRight' && left < 350) left += 10;
  car.style.left = left + 'px';
});

function createEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.left = Math.floor(Math.random() * 350) + 'px';
  road.appendChild(enemy);
  enemies.push(enemy);
}

function gameLoop() {
  enemies.forEach((enemy, index) => {
    let top = parseInt(enemy.style.top || "-100");
    enemy.style.top = top + enemySpeed + 'px';

    if (top > 600) {
      road.removeChild(enemy);
      enemies.splice(index, 1);
      score++;
      scoreDisplay.innerText = score;
    }

    // Collision Detection
    const carRect = car.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    if (
      carRect.left < enemyRect.right &&
      carRect.right > enemyRect.left &&
      carRect.top < enemyRect.bottom &&
      carRect.bottom > enemyRect.top
    ) {
      clearInterval(gameInterval);
      alert('Game Over! Final Score: ' + score);
      window.location.reload();
    }
  });

  if (Math.random() < 0.02) {
    createEnemy();
  }
}

gameInterval = setInterval(gameLoop, 20);
