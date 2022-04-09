

// $('#startDiv').html(`<h4>According to popular views, what is the meaning of life?</h4>
// <h5>to resolve the imbalance of the mind by understanding the nature of reality</h5>`);

// ===============================SOUNDS=======================================================
const themeSong = document.createElement('audio');
$(themeSong).attr('src', "assets/sounds/Halo Theme Song Original.mp3");
const rightAnsSong = document.createElement('audio');
$(rightAnsSong).attr('src', 'assets/sounds/filling-your-inbox.mp3');
const wrongAnsSong = document.createElement('audio');
$(wrongAnsSong).attr('src', 'assets/sounds/nasty-error-long.mp3');
const winSong = document.createElement('audio');
$(winSong).attr('src', 'assets/sounds/12-days-of-christmas.mp3');
const winTrump = document.createElement('audio');
$(winTrump).attr('src', 'assets/sounds/bugle-3.mp3');
const winBells = document.createElement('audio');
$(winBells).attr('src', 'assets/sounds/tower-clock.mp3');
const lostSong = document.createElement('audio');
$(lostSong).attr('src', 'assets/sounds/Corpse Party - Gameover.mp3')
const lostLaugh = document.createElement('audio');
$(lostLaugh).attr('src', 'assets/sounds/man-laughing.mp3')
const lostDoor = document.createElement('audio');
$(lostDoor).attr('src', 'assets/sounds/creaky-wood-door.mp3')

// =================================VARIBLES======================================================
var updates = { qAndA: [] };
const ground = ['./assets/images/background0.png', './assets/images/background1.png', './assets/images/background2.png', './assets/images/background3.png', './assets/images/background4.png', './assets/images/background5.png', './assets/images/background6.png', './assets/images/background7.png'];
const handRight = ['assets/images/rightHand0.png', 'assets/images/rightHand1.png', 'assets/images/rightHand2.png', 'assets/images/rightHand3.png'];
const handLeft = ['assets/images/leftHand0.png', 'assets/images/leftHand1.png', 'assets/images/leftHand2.png', 'assets/images/leftHand3.png'];
let qI = 0;
let intervalId;
let correctAns;
let time = 16;
let mins = 0;
let rightAnsTotal = 0;
let wrongAnsTotal = 0;
var sound = 0;

// =====================================START=APP=================================================
// Handle visit
// handleVisit();
// Random question
qAndA = qAndA.sort(() => 0.5 - Math.random());
// Random background
$('body').css("background-image", `url('./assets/images/bg1.png')`);
// move hands
const moveHands = setInterval(move, 3000);
// Start Triva Game
$('#startButton').on("click", handleVisit);
//check answer
$('.ans').on('click', check);

// =========================LOCAL=AND=REMOTE=STORAGE=HANDLING=====================================
function handleVisit() {
	if(localStorage.sessionId == undefined){


	};

	var lastVisit = parseInt(localStorage.lastVisit);
	var minsLastVisit = Math.floor((Date.now() - lastVisit) / 60000);

	if (minsLastVisit < 1440) {
		mins = 1440 - minsLastVisit;
		$('.title1').addClass('font-effect-fire-animation');
		clock();
		return setInterval(clock, 60000);

	} else { register() };

};

function clock() {
	mins--;
	var h = mins > 60 ? `${Math.floor(mins / 60)}` : '00';
	var m = mins % 60 > 9 ? `${mins % 60}` : `0${mins % 60}`;
	$('#startDiv').html(
		`<h2 class="clockP">THIS IS A GOOD TIME TO REFLECT</h2> 
		<div><h1 class="font-effect-fire-animation">${h}:${m}</h1></div>`
	);

	sound++;
	switch (true) {
		case mins == 2:
			return lostDoor.play();
		case mins == 1:
			return winBells.play();
		case mins == 0:
			return location.reload();
		case sound == 1:
			return lostLaugh.play();
		case sound == 3:
			return winBells.play();
		case sound == 5:
			return lostDoor.play();
		case sound == 7:
			return lostLaugh.play();
		case sound > 12:
			return sound = 0;
	};
};

function register() {
	$.ajax({
		url: "https://api.ipify.org?format=json",
		method: 'GET'
	}).then(ip => {
		console.log('IP: ',JSON.stringify(ip));
		$.ajax({
			url: '/api/user',
			method: 'POST',
			data: ip
		}).then(console.log);
	});
};

function startGame() {
	localStorage.lastVisit = new Date;
	updates.lastVisit = new Date;
	themeSong.play();
	$("#startDiv").hide();
	$("#bodyRows").show(5000);
	$('#leftHand').show(5000);
	$('#rightHand').show(5000);
	displayQuestions();
};

function displayQuestions() {
	timer();
	$('#Question').html(qAndA[qI].question);
	correctAns = qAndA[qI].answers[3];
	let randomAnswers = qAndA[qI].answers.sort(() => 0.5 - Math.random());
	randomAnswers.forEach((answer, i) => {
		$('#ans' + (i + 1)).html(answer);
	});
};

function nextQuestion() {
	qI++;
	if (qI >= 7) {
		score();
	}
	else {
		displayQuestions();
	};
};

function score() {
	clearInterval(intervalId);
	clearInterval(moveHands);
	$('#bodyRows').hide();
	themeSong.pause();
	$('#startDiv').hide();
	$('#rightAns').html(rightAnsTotal);
	$('#wrongAns').html(wrongAnsTotal);
	$('#scoreBoard').css('opacity', 0);
	$('#scoreBoard').show();
	$('#scoreBoard').animate({ opacity: 1 }, 2000);
	setTimeout(() => { $('#scoreBoard').hide() }, 5000);

	rightAnsTotal > wrongAnsTotal ? move1() : move2();

	handleUpdates();	
};

function handleUpates() {
	$.ajax('/api/user/id', {
		method:'GET',
	}).then(data=>{

		data != null 
		? console.log('Data: ',data) : '';
	});
}

function move1() {
	// winTrump.play();
	winBells.play();
	$('.title1').css('color', 'white');
	$('#rightHand').attr('src', handRight[3]);
	$('#leftHand').attr('src', handLeft[3]);
	localStorage.setItem('lastVisit', 1440);
	setTimeout(() => {
		winBells.pause()
		$('#scoreBoard').hide(1000);
		winSong.play();
		$('#leftHand').attr('src', handLeft[1]);
		$('#rightHand').attr('src', handRight[1]);
		$('#leftHand').css('transform', `rotate(${100}deg)`);
		$('#rightHand').css('transform', `rotate(${260}deg)`);
		$('#rightHand').animate({ height: '+=20%', width: '+=20%', left: '-=5%' }, 3000);
		$('#leftHand').animate({ height: '+=20%', width: '+=20%', right: '-=5%' }, 3000);
		$('#startDiv').css('opacity', 0);
		$('#startDiv').show();
		setTimeout(() => { $('#startDiv').animate({ opacity: 1 }, 2000) }, 3000);
		$('#startDiv').html(rewards[Math.floor(Math.random() * rewards.length)]);
		setTimeout(() => {
			$('#leftHand').hide(5000);
			$('#rightHand').hide(5000);
			$('#startDiv').animate({ opacity: 0 }, 5000);
		}, 10000);
	}, 10000);
	setTimeout(() => {
		$('.title1').text('Thank you for playing!');
	}, 25000);
};

function move2() {
	lostSong.play();
	lostDoor.play();
	lostLaugh.play();
	$('.title1').addClass('font-effect-fire-animation');
	$('#rightHand').attr('src', handRight[1]);
	$('#rightHand').animate({ height: '1500px', width: '1500px', top: '0%', left: '-50%' }, 3000);
	$('#rightHand').promise().done(function () {
		$('#rightHand').attr('src', handRight[2]);
		$('#rightHand').animate({ height: '150px', width: '150px', top: '50%', left: '35%' }, 3000);
		setTimeout(() => {
			$('#rightHand').animate({ opacity: 0 }, 2000);
		}, 2500);
	});

	$('#leftHand').attr('src', handLeft[1]);
	$('#leftHand').animate({ height: '1500px', width: '1500px', top: '0%', right: '-50%' }, 3000);
	$('#leftHand').promise().done(function () {
		$('#leftHand').attr('src', handLeft[2]);
		$('#leftHand').animate({ height: '150px', width: '150px', top: '50%', right: '35%' }, 3000);
		setTimeout(() => {
			$('#leftHand').animate({ opacity: 0 }, 2000);
		}, 2500);
	});
	setTimeout(() => {
		$('.title1').text('Thank you for playing!')
		setTimeout(() => {
			$('#startDiv').html(rewards[Math.floor(Math.random() * rewards.length)]);
			$('#startDiv').css('opacity', 0);
			$('#startDiv').show();
			$('#startDiv').animate({ opacity: 1 }, 3000);
			$('#startDiv').animate({ opacity: 0 }, 13000);
		}, 3000);
	}, 16000);
};

function timer() {
	time = 16;
	clearInterval(intervalId);
	intervalId = setInterval(decrement, 1000);
};

function decrement() {
	time--;
	$("#timer").html(time);
	if (time == 0) {
		rewards.push(`<h4>${qAndA[qI].question}</h4><h4>${correctAns}</h4>`)
		wrongAnsTotal++;
		wrongAnsSong.play();
		clearInterval(intervalId);
		nextQuestion();
	};
};

//hands random position
function move() {
	$('#rightHand').animate({ top: `${Math.random() * 8 + 26}%`, left: `${Math.random() * 4 + 8}%` }, 3000);
	$('#leftHand').animate({ top: `${Math.random() * 8 + 26}%`, right: `${Math.random() * 4 + 8}%` }, 3000);
};

function check(event) {
	const userAns = event.target.innerText;
	updates.qAndA.push({ question: qAndA[qI].question, answer: userAns })
	if (userAns === correctAns) {
		rightAnsTotal++
		rightAnsSong.play();
	} else {
		wrongAnsTotal++;
		rewards.push(`<h4>${qAndA[qI].question}</h4><h4>${correctAns}</h4>`)
		wrongAnsSong.play();
	};
	nextQuestion();
};