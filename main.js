/*Containers*/
const startBtn = document.querySelector('#start');
const startBtnContainer = document.querySelector('.start-btn-container');
const rules = document.querySelector('.rules');
const letsGo = document.querySelector('#letsGo');
const table = document.querySelector('.table');
const scoreboard = document.querySelector('.scoreboard');
const replay = document.querySelector('#replay');
/*Dice*/
const dice = document.querySelector('.dice');
const diceTwo = document.querySelector('.dice-two');
/*Choice Btns*/
const upBtn = document.querySelector('#up');
const downBtn = document.querySelector('#down');
const equalBtn = document.querySelector('#equal');
/* HTML Elements for updates */
const total = document.querySelector('#total');
const userRecentChoice = document.querySelector('#user-choice');
const cpuRecentChoice = document.querySelector('#computer-choice');
const cpuScoreDisplay = document.querySelector('#computer-score');
const userScoreDisplay = document.querySelector('#user-score');
const cpuScAtEnd = document.querySelector('#computer-sc');
const userScAtEnd = document.querySelector('#user-sc');
const roundCounter = document.querySelector('#round');
const message = document.querySelector("#message");
/* Generates a random Number */
const randomNumber = () => {
	return Math.floor(Math.random() * 6) + 1;
}
/* Generate a random choice for CPU*/
const randomChoice = () => {
	const choices = ["up","equal","down"];
	for (let i = choices.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
	const random = Math.floor(Math.random() * 3);
	return choices[random];
}
/* Initial Variables */
let cpuScore = 0;
let userScore = 0;
let round = 0;
let totalNumber = 0;

const renderData = (answer) => {
	total.innerText = answer;
	roundCounter.innerText = round;
    userScoreDisplay.innerText = userScore;
    cpuScoreDisplay.innerText = cpuScore;
}
renderData(totalNumber);

const toggleBtnStatus = (status) => {
	upBtn.disabled = status;
	downBtn.disabled = status;
	equalBtn.disabled = status;
}

const gameStarted = (e) => {
	const options = [{word: 'up',symbol: '>'},{word: 'down',symbol: '<'},{word: 'equal',symbol: '=='}];
	const computerChoosed = randomChoice();
	const userChoosed = e.target.id;

	const userChoice = options.filter((option) => option.word == userChoosed);
	const computerChoice = options.filter((option) => option.word == computerChoosed);

	const userSymbol = userChoice[0].symbol;
	const computerSymbol = computerChoice[0].symbol;
	userRecentChoice.innerText = userChoosed;
	cpuRecentChoice.innerText = computerChoosed;
	round++;
	const dummy = '';
	renderData(dummy);
	rollDice(userSymbol, computerSymbol);
}
const rollDice = (user, comp) => {
	dice.style.animation = 'rotate 0.4s linear 3';
	diceTwo.style.animation = 'rotateTwo 0.4s linear 3';
	toggleBtnStatus(true);
	setTimeout(() => {
		let randomNOne = randomNumber();
		let randomNTwo = randomNumber();
		dice.style.backgroundImage = `url('./img/dice-${randomNOne}.png')`;
		diceTwo.style.backgroundImage = `url('./img/dice-${randomNTwo}.png')`;
		dice.style.animation = '';
		diceTwo.style.animation = '';
		totalNumber = randomNOne + randomNTwo;
		findTheRoundWinner(totalNumber, user, comp);
		if (round >= 10) {
	        setTimeout(() => gameEnds(),1500);
	    } else {
		    toggleBtnStatus(false);
	    }
	},1000);
}
const findTheRoundWinner = (ans, user, cpu) => {
	const messages = ["Its a draw! Both Gets One Point","User Gets a Point",
	"CPU Gets a Point!","Both Wrong! No one gets a point"];
	const seven = 7;
	const sum = eval(`${ans} ${user} ${seven}`);
	const cpuSum = eval(`${ans} ${cpu} ${seven}`);
	if (sum && cpuSum) {
		userScore += 2;
        cpuScore += 2;
        renderData(ans);
		message.innerText = messages[0];
	  } else if (sum) {
	  	userScore += 2;
	  	renderData(ans);
		message.innerText = messages[1];
	  } else if(cpuSum) {
	  	cpuScore += 2;
	  	renderData(ans);
		message.innerText = messages[2];
	  } else {
	  	renderData(ans);
		message.innerText = messages[3];
	}
}
const gameEnds = () => {
	toggleBtnStatus(true);
	table.classList.remove('display');
	scoreboard.classList.add('display');
	cpuScAtEnd.innerText = cpuScore;
    userScAtEnd.innerText = userScore;
    if (cpuScore > userScore) {
        document.getElementById('winner').innerText = 'CPU Wins!';
    } else if (userScore > cpuScore) {
    	document.getElementById('winner').innerText = 'You Win!';
    } else {
    	document.getElementById('winner').innerText = "It's a Draw";
    }
}

startBtn.addEventListener('click',() => {
	startBtnContainer.classList.remove('display');
	rules.classList.add('display');
});
letsGo.addEventListener('click',() => {
	rules.classList.remove('display');
	table.classList.add('display');
});
replay.addEventListener('click',() => {
	scoreboard.classList.remove('display');
	startBtnContainer.classList.add('display');
	cpuScore = 0;
	userScore = 0;
	round = 0;
	totalNumber = 0;
	userRecentChoice.innerText = '';
    cpuRecentChoice.innerText = '';
	renderData(totalNumber);
	toggleBtnStatus(false);
});
upBtn.addEventListener('click', gameStarted);
downBtn.addEventListener('click',gameStarted);
equalBtn.addEventListener('click',gameStarted);
