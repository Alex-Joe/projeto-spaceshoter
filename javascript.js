const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];


function flyShip() {
	if (event.key === 'ArrowUp') {
		event.preventDefault();
		moveUp();
	} else if (event.key === 'ArrowDown') {
		event.preventDefault();
		moveDown();
	}else if (event.key === " ") {
		event.preventDefault();
		fireLaser();
	}
}

// função de subir
function moveUp() {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if (topPosition === "0px") {
		return
	} else {
		let position = parseInt(topPosition);
		position -= 50;
		yourShip.style.top = `${position}px`;
	}
}

// função de descer
function moveDown () {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if (topPosition === "550px") {
	return
	} else {
		let position = parseInt(topPosition);
		position += 50;
		yourShip.style.top = `${position}px`;
	}
}

// função de tiro
function fireLaser() {
	let laser = creatLaserElement();
	playArea.appendChild(laser);
	moveLaser(laser);
}
function creatLaserElement() {
	let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
	let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
	let newLaser = document.createElement('img');
	newLaser.src = 'img/shoot.png';
	newLaser.classList.add('laser');
	newLaser.style.left = `${xPosition}px`;
	newLaser.style.top = `${yPosition - 10}px`;
	return newLaser;
}

function moveLaser (laser) {
	let laserInterval = setInterval(() => {
	    let xPosition = parseInt(laser.style.left);
		let aliens = document.querySelectorAll('.alien');
		
		// compara se cada alien foi atingido, se sim, troca a imagem.
		aliens.forEach((alien) => {
			if(checkLaserCollision(laser, alien)) {
				alien.src = 'img/explosion.png';
				alien.classList.remove('alien');
				alien.classList.add('dead-alien');
			}
		})
		
		if(xPosition === 404) {
			laser.remove();
		} else { 
		    laser.style.left = `${xPosition + 8}px`;
		}
	}, 10);
}
	
	//função para criar inimigos aleatórios
function creatAliens() {
	let newAlien = document.createElement('img');
	let alienSprite = aliensImg[Math.floor (Math.randon[] * aliensImg.length)];  //sorteio de imagens
	newAlien.src = alienSprite;
	newAlien.classList.add('alien');
	newAlien.classList.add('alien-transition');
	newAlien.style.left = '370px';
	newAlien.style.top = `${Math.floor(Math.randon() * 330) + 30}px`;
	play-area.appendChild(newAlien);
	moveAlien(newAlien);
	
}
	
//função para movimentar inimigos
function moveAlien(alien) {
   let moveAlienIinterval = setInterval(() => {
	  let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
	  if (xPosition <= 50) {
		  if(Array.from(alien.classList).includes('dead-alien')) {
			  alien.remove();
		  } else {
			  gameOver();
		  }
	  }else {
			  alien.style.left = `${xPosition - 4}px`;
		  }
   }, 30);

}

//função para colisão
function checkLaserCollision(laser,alien) {
	let laserTop = parseInt(laser.style.top);
	let laserLeft = parseInt(laser.style.left);
	let laserBotton = laserTop - 20;
	let alienTop = parseInt(alien.style.top);
	let alienLeft = parseInt(alien.style.left);
	let alienBotton = alienTop - 30;
	if(laserLeft != 348 && laserLeft + 48 >= alienLeft) {
		if(laserTop <= alienTop && laserTop >= alienBotton) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
	


window.addEventListener('keydown', flyShip);

creatAliens();
