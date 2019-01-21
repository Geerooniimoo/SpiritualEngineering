
let tim;
let i = 0;
let i2 = -1;
let i3 =0;
let randomY;
let randomX;
let Ans = [];
let rightAns;
let handLeft;
let handRight;
let intervalId;
let correctAns;
const time = 15;
let rightAnsTotal = 0;
let wrongAnsTotal = 0;

const themeSong = document.createElement('audio');
$(themeSong).attr('src' , "assets/sounds/Halo Theme Song Original.mp3");
const rightAnsSong = document.createElement('audio');
$(rightAnsSong).attr('src', 'assets/sounds/filling-your-inbox.mp3');
const wrongAnsSong = document.createElement('audio');
$(wrongAnsSong).attr('src' , 'assets/sounds/nasty-error-long.mp3');
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


//random background
let ground = ['assets/images/background0.png', 'assets/images/background1.png', 'assets/images/background2.png', 'assets/images/background3.png', 'assets/images/background4.png', 'assets/images/background5.png', 'assets/images/background6.png', 'assets/images/background7.png'];
let background = ground[Math.floor(Math.random() * 8)];
$('body').css('background-image' , 'url(' + background + ')');

handRight = ['assets/images/rightHand0.png', 'assets/images/rightHand1.png', 'assets/images/rightHand2.png', 'assets/images/rightHand3.png'];
handLeft = ['assets/images/leftHand0.png', 'assets/images/leftHand1.png', 'assets/images/leftHand2.png', 'assets/images/leftHand3.png'];

//hide scoreBoard
$('#scoreBoard').css("opacity", '0');

const qAndA = [
	["What is the spirit?", "a ghost", "what we become once we die", "what God and the Devil are fighting for", "the nonphysical part of a person"],
	["What is God if it's not defined by religion?", "Jesus", "nothing", "Allah", "the universe"],
	["If iternal life begins with an eternal sleep, when will the spirit wake up?", "right away but it cannot be seen because is in a nonphysical form", "right away somewhere else", "after an eternity", "never"],
	["Can the flow of enery teach us about right and wrong?", "no, because enery cannot reason", "yes, because enery always follow the shortest path", "no, because enery is not alive", "yes, because it can inspire purpose by it's persuit of balance"],
	["What is the meaning of evil?", "the absence of good",	"all the Devil does", "ignorance", "depravity"], 
	["What is the meaning of good?", "light", "what is needed to go to heaven", "the absence of evil", "righteousness"],
	["According to popular views, what is the meaning of life?", "to discover the creator", "to focus on spiritual growth and serive to humanity", "to seek devine salvation through the grace of God", "to resolve the imbalance of the mind by understanding the nature of reality"]
	];

	let randomQ = Math.floor(Math.random() * qAndA.length);

themeSong.play();
displayQuestions();
					
function scoreboard() {
	if (i >= qAndA.length) {
		clearInterval(intervalId);
		$('#bodyRows').hide();
		score();
	}
	
	else {
		displayQuestions();
	};
};	
function score() {
	$('#scoreBoard').animate({opacity: '1'});
	$('#rightAns').html(rightAnsTotal);
	$('#wrongAns').html(wrongAnsTotal);
	
		if (rightAnsTotal > wrongAnsTotal) {
			themeSong.play();
			winSong.play();
			winTrump.play();
			winBells.play();

			$('#title1').css('color', 'white');
			$('#rightHand').attr('src', handRight[3]);
			$('#rightHand').animate({height: '+=5%', width: '+=5%'}, 3000);
			for (var i = 0; i < 5; i++) {
				$('#rightHand').animate({top: '+=5%'}, 1000);
				$('#rightHand').animate({top: '-=5%'}, 1000);
			}
			$('#leftHand').attr('src', handLeft[3]);
			$('#leftHand').animate({height: '+=10%', width: '+=10%', right: '-=5%'}, 3000);
			for (var i = 0; i < 5; i++) {
				$('#leftHand').animate({height: '+=10%', width: '+=10%', right: '-=5%'}, 3000);
				$('#leftHand').animate({height: '-=10%', width: '-=10%', right: '+=5%'}, 3000);
			}
		}
		else {
			themeSong.play();
			lostSong.play();
			lostDoor.play();
			lostLaugh.play();
			$('#title1').addClass('font-effect-fire-animation');
			move2();
		};
};	
function move2() {
	$('#rightHand').attr('src', handRight[1]);
	$('#rightHand').animate({height: '500px', width: '500px', top: '0%', left: '0%'}, 3000);
	$('#rightHand').promise().done(function() {
		$('#rightHand').attr('src', handRight[2]);	
		$('#rightHand').animate({height: '150px', width: '150px', top: '50%', left: '35%'}, 3000);
	});

	$('#leftHand').attr('src', handLeft[1]);
	$('#leftHand').animate({height: '500px', width: '500px', top: '0%', right: '0%'}, 3000);
	$('#leftHand').promise().done(function() {
		$('#leftHand').attr('src', handLeft[2]);
		$('#leftHand').animate({height: '150px', width: '150px', top: '50%', right: '35%'}, 3000);
	});
};

function displayQuestions() {

	//display randomized question
	randomQ++;
	if(randomQ >= qAndA.length) {
		randomQ = 0;
	}
	$('#Question').html(qAndA[randomQ][0]);

	//correct answer
	correctAns = qAndA[randomQ][4]; 	
	
	//randomize the answers in array
	i2 = Math.floor(Math.random() * 4 + 1);
	i3 = 0;
		for (let y = i2; y < 5; y++) {
			Ans[i3] = (qAndA[randomQ][y]);
			i3++
		};
		for (let y = 1; y < i2; y++) {
			Ans[i3] = (qAndA[randomQ][y]);
			i3++
		};
	//display randomized answers
	for (let y = 1; y < 5; y++) {
	 		$('#ans' + y).html(Ans[y - 1])
	};
	
	timer();
	move();
};

function nextQuestion() {
	i++;
	move();
	scoreboard();
}
function timer() {
		tim = time + 1;
		clearInterval(intervalId);			
      	intervalId = setInterval(decrement, 1000);
};
function decrement() {
	    tim--;
    	$("#timer").html(tim);
		if (tim === 0) {
			wrongAnsTotal++;
			wrongAnsSong.play();		
			clearInterval(intervalId);
			nextQuestion();
		};
};
//hands random position
function randomPosition() {
	randomY = Math.floor(Math.random() * 8 + 26);
	randomX = Math.floor(Math.random() * 4 + 8);
}
function move() {
	    randomPosition();
		$('#rightHand').animate({top: randomY + '%', left: randomX + '%'}, 3000);
		$('#leftHand').animate({top: randomY + '%'}, 3000);
};
//check answer
$('.ans').on('click', check);
function check(questionIndex){
	console.log(Ans);
	console.log(event.target.innerHTML)
	const userAns = event.target.innerHTML;
	if(userAns === correctAns) {
		rightAnsTotal++
		rightAnsSong.play();
		nextQuestion();
	} else {
		wrongAnsTotal++;
		wrongAnsSong.play();
		nextQuestion();	
	}
}