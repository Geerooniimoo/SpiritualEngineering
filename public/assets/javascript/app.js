
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
const ground = ['./assets/images/background0.png', './assets/images/background1.png', './assets/images/background2.png', './assets/images/background3.png', './assets/images/background4.png', './assets/images/background5.png', './assets/images/background6.png', './assets/images/background7.png'];
const handRight = ['assets/images/rightHand0.png', 'assets/images/rightHand1.png', 'assets/images/rightHand2.png', 'assets/images/rightHand3.png'];
const handLeft = ['assets/images/leftHand0.png', 'assets/images/leftHand1.png', 'assets/images/leftHand2.png', 'assets/images/leftHand3.png'];

// =================================VARIBLES======================================================
let questionIndex = 0;
let intervalId;
let correctAns;
let time = 16;
let mins = 0;
let rightAnsTotal = 0;
let wrongAnsTotal = 0;
var sound = 0;

// ==================================Q&A==========================================================
let qAndA = [
	{
		question: "What is the spirit?",
		answers: ["a ghost", "what we become once we die", "what God and the Devil are fighting for", "the nonphysical part of a person"]
	},
	{
		question: "What is God if it's not defined by religion?",
		answers: ["Jesus", "nothing", "Allah", "the universe"]
	},
	{
		question: "If iternal life begins with an eternal sleep, when will the spirit wake up?",
		answers: ["right away but it cannot be seen because is in a nonphysical form", "right away somewhere else", "after an eternity", "never"]
	},
	{
		question: "Can the flow of enery teach us about right and wrong?",
		answers: ["no, because enery cannot reason", "yes, because enery always follow the shortest path", "no, because enery is not alive", "yes, because it can inspire purpose by it's persuit of balance"]
	},
	{
		question: "What is the meaning of evil?",
		answers: ["the absence of good", "all the Devil does", "ignorance", "depravity"]
	},
	{
		question: "What is the meaning of good?",
		answers: ["light", "what is needed to go to heaven", "the absence of evil", "righteousness"]
	},
	{
		question: "According to popular views, what is the meaning of life?",
		answers: ["to discover the creator", "to focus on spiritual growth and serive to humanity", "to seek devine salvation through the grace of God", "to resolve the imbalance of the mind by understanding the nature of reality"]
	}
];

// =====================================START=APP=================================================
// Handle visit
// handleVisit();
// Random question
qAndA = qAndA.sort(() => 0.5 - Math.random());
// Random background
$('body').css("background-image", `url('${ground[Math.floor(Math.random() * ground.length)]}')`);
// move hands
const moveHands = setInterval(move, 3000);
// Start Triva Game
$('#startButton').on("click", handleVisit);
//check answer
$('.ans').on('click', check);

// =========================LOCAL=AND=REMOTE=STORAGE=HANDLING=====================================
function count() {
	mins--;
	var h = mins > 60 ? `${Math.floor(mins / 60)}` : '00';
	var m = mins % 60 > 9 ? `${mins % 60}` : `0${mins % 60}`;

	$('#startDiv').html(
		`<h2 class="clockP">Time remaining <br> to play again.</h2> 
		<div><h1 class="font-effect-fire-animation">${h}:${m}</h1></div>`
	);
	console.log('Sound', sound);

	switch (true) {
		case sound == 0:
			return lostLaugh.play();
		case sound == 3:
			return lostDoor.play();
		case sound == 5:
			return winBells.play();
		case sound == 7:
			return lostLaugh.play();
		// case sound > 9:
		// 	return sound = 0;
	};

	sound++;
};

function clock() {
	intervalId = setInterval(count, 5000);
};

function handleVisit() {
	var userIP = localStorage.getItem('userIP');
	var lastVisit = parseInt(localStorage.getItem('lastVisit'));

	if (lastVisit) {
		var minsLastVisit = Math.floor((Date.now() - lastVisit) / 60000);

		if (minsLastVisit < 1440) {
			mins = 1440 - minsLastVisit;
			return clock();
		};
	};

	localStorage.setItem('lastVisit', Date.now())
	startGame();
};



// 	$.ajax({
// 		url: "https://api.ipify.org?format=json",
// 		method: 'GET'
// 	}).then(res => {
// 		console.log(res);
// 		localStorage.setItem('userIP', res.ip);
// 		localStorage.setItem('lastVisit', Date.now());
// 		$.ajax({
// 			url: "/api/user",
// 			method: 'POST',
// 			data: res
// 		});
// 	});
// };


// $.ajax({
// 	url: "/api/user",
// 	method: 'GET',
// }).then(res => console.log(res))

function startGame() {
	themeSong.play();
	$("#startDiv").hide();
	$("#bodyRows").show(5000);
	displayQuestions();
};

function displayQuestions() {
	timer();
	//display randomized question
	$('#Question').html(qAndA[questionIndex].question);
	//correct answer
	correctAns = qAndA[questionIndex].answers[3];
	//display randomized answers 
	let randomAnswers = qAndA[questionIndex].answers.sort(() => 0.5 - Math.random());
	randomAnswers.forEach((answer, i) => {
		$('#ans' + (i + 1)).html(answer);
	});
};

function nextQuestion() {
	questionIndex++;
	if (questionIndex >= qAndA.length) {
		clearInterval(intervalId);
		$('#bodyRows').hide();
		themeSong.pause();
		score();
	}
	else {
		displayQuestions();
	};
};

function score() {
	$('#scoreBoard').show(1000);
	$('#rightAns').html(rightAnsTotal);
	$('#wrongAns').html(wrongAnsTotal);
	clearInterval(moveHands);

	if (rightAnsTotal > wrongAnsTotal) {
		winSong.play();
		winTrump.play();
		winBells.play();
		$('#title1').css('color', 'white');
		$('#rightHand').attr('src', handRight[3]);
		$('#rightHand').animate({ height: '+=5%', width: '+=5%' }, 3000);
		$('#leftHand').attr('src', handLeft[3]);
		$('#leftHand').animate({ height: '+=10%', width: '+=10%', right: '-=5%' }, 3000);
	}
	else {
		lostSong.play();
		lostDoor.play();
		lostLaugh.play();
		$('#title1').addClass('font-effect-fire-animation');
		move2();
	};
};
function move2() {
	$('#rightHand').attr('src', handRight[1]);
	$('#rightHand').animate({ height: '500px', width: '500px', top: '0%', left: '0%' }, 3000);
	$('#rightHand').promise().done(function () {
		$('#rightHand').attr('src', handRight[2]);
		$('#rightHand').animate({ height: '150px', width: '150px', top: '50%', left: '35%' }, 3000);
	});

	$('#leftHand').attr('src', handLeft[1]);
	$('#leftHand').animate({ height: '500px', width: '500px', top: '0%', right: '0%' }, 3000);
	$('#leftHand').promise().done(function () {
		$('#leftHand').attr('src', handLeft[2]);
		$('#leftHand').animate({ height: '150px', width: '150px', top: '50%', right: '35%' }, 3000);
	});
};

function timer() {
	time = 16;
	clearInterval(intervalId);
	intervalId = setInterval(decrement, 1000);
};

function decrement() {
	time--;
	$("#timer").html(time);
	if (time === 0) {
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

function check() {
	const userAns = event.target.innerHTML;
	console.log(qAndA[questionIndex].question)
	console.log("User Answer: ", userAns);
	console.log("Correct Answer: ", qAndA[questionIndex].answers[3]);
	if (userAns === correctAns) {
		rightAnsTotal++
		rightAnsSong.play();
	} else {
		wrongAnsTotal++;
		wrongAnsSong.play();
	};
	nextQuestion();
};