
$('#startButton').on("click", handleVisit);
$('.ans').on('click', check);

function handleVisit() {
	localStorage.sessionId == undefined
		? (register(), startGame())
		: getSessionId();
};

function reflection(hoursFromVisit) {
	mins = (24 - hoursFromVisit) * 60;
	$('.title1').addClass('font-effect-fire-animation');
	clock();
	clockId = setInterval(clock, 60000);
}

async function register() {
	let ip = await $.ajax("https://api.ipify.org?format=json");
	let { id } = await $.ajax({ url: '/api/user', method: 'POST', data: ip });

	updates.id = id;
	updates.ip = ip.ip;
	localStorage.sessionId = id;
};

async function getSessionId() {
	let data = await $.ajax(`/api/user/${localStorage.sessionId}`);
	
	if (!data) return startGame();
	let hoursFromVisit = (Date.now() - new Date(data.lastVisit)) / 3600000;
	hoursFromVisit < 24	? reflection(hoursFromVisit) : startGame();
};

function changeLevel() {
	level++;
	let bg = $('<img>',{class:'bg',src:`assets/images/bg${level}.png`});
	$('body').prepend(bg);
	bg.css({top:'-100vh'});
	$('.bg').animate({top:'+=100vh'},5000);
	setTimeout(()=>{
		$('.bg').eq($('.bg').length-1).remove()
	},4000);
	showLevel(level)
	setInterval(giveOrTake,5000);
};

function giveOrTake() {
	lHand.attr('src','assets/images/leftHand4.png')
	rHand.attr('src','assets/images/rightHand4.png')
	rHand.css('transform','rotate(-30deg)')
};

function clock() {
	mins--;
	var h = mins > 60 ? `${Math.floor(mins / 60)}` : '00';
	var m = (mins % 60 > 9 ? `` : `0`) + Math.floor(mins % 60);
	$('#startDiv').html(
		`<h2 class="clockP">TIME</h2> 
		<div><h1 class="font-effect-fire-animation">${h}:${m}</h1></div>
		<h2 class="clockP">TO REFLECT</h2>`
	);

	sound++;
	switch (true) {
		case mins == 2:
			return lostDoor.play();
		case mins == 1:
			return winBells.play();
		case mins == 0:
			clearInterval(clockId);
			return startGame();
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

function showOpacity(str) {
	let opacity = 0;
	let	opacityId = setInterval(()=>{
		document.querySelector(str).style.opacity = opacity; 
		opacity+=.05; 
		if(opacity>1)clearInterval(opacityId)},100);
};

function startGame() {
	updates.lastVisit = new Date;
	themeSong.play();
	$("#startDiv").hide();
	$('.title1').slideUp(1000);
	changeLevel();
	setTimeout(()=>{showOpacity('#bodyRows')},4000);
	showHands();
	setTimeout(displayQuestions,4000);
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
	qI >= 7 ? score() : displayQuestions();
};

function score() {
	clearInterval(intervalId);
	$('#bodyRows').hide();
	themeSong.pause();
	$('#startDiv').hide();
	$('#rightAns').html(rightAnsTotal);
	$('#wrongAns').html(wrongAnsTotal);
	$('#scoreBoard').css('opacity', 0);
	$('#scoreBoard').show();
	$('#scoreBoard').animate({ opacity: 1 }, 2000);
	setTimeout(() => { $('#scoreBoard').hide() }, 5000);

	move1();
	// rightAnsTotal > wrongAnsTotal ? move1() : move2();

	// handleUpdates();
};

async function handleUpdates() {
	let store = await $.ajax(`/api/user/${localStorage.sessionId}`);
	if (store == null) register();

	store.lastVisit = updates.lastVisit;
	let qA = eval(store.qAndA);
	qA.push(updates.qAndA);
	store.ip = updates.ip;
	store.qAndA = JSON.stringify(qA);
	store.visits++;

	$.ajax({
		url: `/api/user/$	{store.id}`,
		method: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(store)
	});
};

function move1() {
	// winTrump.play();
	winBells.play();
	$('.title1').css('color', 'white');
	// $('.title1').slideDown(1000);

	rHand.attr('src', handRight[3]).show();
	lHand.attr('src', handLeft[3]).show();

	setTimeout(() => {
		winBells.pause()
		$('#scoreBoard').hide(1000);
		winSong.play();

		['-=10%','+=20%','-=20%','+=10%']
			.forEach(hight => rHand
			.animate({top:hight},1000));
			changeLevel();
	}, 10000);


	
	// setTimeout(() => {
	// 	$('.title1').text('Thank you for playing!');
	// }, 25000);
};

function move2() {
	lostSong.play();
	lostDoor.play();
	lostLaugh.play();
	$('.title1').addClass('font-effect-fire-animation');
	rHand.attr('src', handRight[1]);
	rHand.animate({ height: '1500px', width: '1500px', top: '0%', left: '-50%' }, 3000);
	rHand.promise().done(function () {
		rHand.attr('src', handRight[2]);
		rHand.animate({ height: '150px', width: '150px', top: '50%', left: '35%' }, 3000);
		setTimeout(() => {
			rHand.animate({ opacity: 0 }, 2000);
		}, 2500);
	});

	lHand.attr('src', handLeft[1]);
	lHand.animate({ height: '1500px', width: '1500px', top: '0%', right: '-50%' }, 3000);
	lHand.promise().done(function () {
		lHand.attr('src', handLeft[2]);
		lHand.animate({ height: '150px', width: '150px', top: '50%', right: '35%' }, 3000);
		setTimeout(() => {
			lHand.animate({ opacity: 0 }, 2000);
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
function showHands() {
	lHand.show(4000);
	rHand.show(4000);
	rHand.animate({ top: `${Math.random() * 8 + 26}%`, left: `${Math.random() * 4 + 8}%` }, 3000);
	lHand.animate({ top: `${Math.random() * 8 + 26}%`, right: `${Math.random() * 4 + 8}%` }, 3000);
	handsId = setTimeout(showHands,3000);
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

function showLevel(num) {
	let prompt = document.getElementById('level');

	prompt.innerHTML = `<h4 class='level title1 font-effect-3d'>Level ${num}</h4>`
}