const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');

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

window.addEventListener('keydown', flyShip);