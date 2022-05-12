window.addEventListener('load', () => {
	// UI
	const gamebody = document.querySelector('#game-body');
	// btns
	const choicebtns = document.querySelectorAll('.btn-group .btn');
	const startbtn = document.querySelector('#btn-start');

	// progress-bars
	const pliveborder = document.querySelector('#player-detail .progress');
	const cliveborder = document.querySelector('#computer-detail .progress');
	const plivebar = document.querySelector('#player-live');
	const clivebar = document.querySelector('#computer-live');

	// imgs
	const pimg = document.querySelector('#player-img');
	const cimg = document.querySelector('#computer-img');

	// lives
	let plive = 100;
	let clive = 100;

	// choices
	let choices = ['paper', 'rock', 'scissors'];
	let pchoice = '';
	let cchoice = '';

	startbtn.addEventListener('click', () => {
		getCchoice();

		//  Every Start btn click should start with rock
		pimg.src = `./img/rock.png`;
		cimg.src = `./img/rock.png`;

		doPanimation();
		doCanimation();

		setTimeout(() => {
			pimg.src = `./img/${pchoice}.png`;
			cimg.src = `./img/${cchoice}.png`;

			winlose();

			plivebar.style.width = `${plive}%`;
			clivebar.style.width = `${clive}%`;

			liveColor(); // Change color of live when livebar is low
		}, 1500);

		setTimeout(gameStatus,2300)
	});

	choicebtns.forEach((c) => {
		c.addEventListener('focus', () => {
			removeDisable();
			getPchoice(c);
			getCchoice();
		});
    });
    
    document.body.addEventListener('click', (e) => { 
        if (e.target.classList.contains('btn-again')) {
            location.reload();
        }
     });

	function removeDisable() {
		startbtn.classList.remove('disable');
		startbtn.disabled = false;
	}

	function getPchoice(c) {
		pchoice = c.id;
	}

	function getCchoice() {
		cchoice = randChoice();
	}

	function randChoice() {
		return choices[Math.floor(Math.random() * 3)];
	}

	function doPanimation() {

		pimg.animate(
			[
				{ transform: 'translateX(-100%) rotateY(180deg) rotateZ(0deg)' },
				{ transform: 'translateX(-100%) rotateY(180deg) rotateZ(30deg)' },
				{ transform: 'translateX(-100%) rotateY(180deg) rotateZ(0deg)' },
			],
			{
				duration: 500,
				direction: 'normal',
				easing: 'ease-out',
				iterations: 3,
			},
		);

	}

	function doCanimation() {

		cimg.animate([{ transform: 'rotateZ(0deg)' }, { transform: 'rotateZ(30deg)' }, { transform: 'rotateZ(0deg)' }], {
			duration: 500,
			direction: 'normal',
			easing: 'ease-out',
			iterations: 3,
		});

	}

	function winlose() {

		if (plive !== 0 || clive !== 0) {
			if (pchoice === cchoice) console.log('Draw');
			else if (pchoice === 'paper' && cchoice === 'rock') clive -= 25;
			else if (pchoice === 'paper' && cchoice === 'scissors') plive -= 25;
			else if (pchoice === 'rock' && cchoice === 'paper') plive -= 25;
			else if (pchoice === 'rock' && cchoice === 'scissors') clive -= 25;
			else if (pchoice === 'scissors' && cchoice === 'paper') clive -= 25;
			else plive -= 25;
		} 

	}

	function liveColor() {

		if (plive == 100) {
			pliveborder.style.borderColor = '#1cef00';
			plivebar.style.backgroundColor = '#1cef00';
		} else if (plive == 75 || plive == 50) {
			pliveborder.style.borderColor = '#ffd000';
			plivebar.style.backgroundColor = '#ffd000';
		} else {
			pliveborder.style.borderColor = '#ff0000';
			plivebar.style.backgroundColor = '#ff0000';
		}

		if (clive == 100) {
			cliveborder.style.borderColor = '#1cef00';
			clivebar.style.backgroundColor = '#1cef00';
		} else if (clive == 75 || clive == 50) {
			cliveborder.style.borderColor = '#ffd000';
			clivebar.style.backgroundColor = '#ffd000';
		} else {
			cliveborder.style.borderColor = '#ff0000';
			clivebar.style.backgroundColor = '#ff0000';
		}

	}

	function gameStatus() {

		if (plive === 0) {
			gamebody.innerHTML = `
                <h2>Game Over</h2>
                <button class="btn btn-again">Try Again?</button>
            `;
		}
		if (clive === 0) {
			gamebody.innerHTML = `
                <h2>Congratuation You won 🥳</h2>
                <button class="btn btn-again">Play Again?</button>
            `;
		}

	}
});
