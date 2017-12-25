
let i = 0;
let i2 = -1;
let ans1;
let ans2;
let ans3;
let ans4;
let rightAns = 0;
let wrongAns = 0;
const time = 5;
let tim;
let intervalId;

//random background
let ground = ['assets/images/background1.png', 'assets/images/background2.png', 'assets/images/background3.png', 'assets/images/background4.png', 'assets/images/background5.png', 'assets/images/background6.png', 'assets/images/background7.png'];
let background = ground[Math.floor(Math.random() * 7)];
$('body').css('background-image' , 'url(' + background + ')');
//hide scoreBoard
$('#scoreBoard').css("opacity", '0');

const qAndA = [
["What is the spirit?",
"a ghost",
"what we become once we die",
"what God and the Devil are fighting for",
"the nonphysical part of a person"
],
["If iternal life begins with an eternal sleep, when will the spirit wake up?", 
"right away but it cannot be seen because is in a nonphysical form",
"right away somewhere else",
"after an eternity",
"never"
],
["Can the flow of enery teach us about right and wrong?",
"no, because enery cannot reason",
"yes, because enery always follow the shortest path",
"no, because enery is not alive",
"yes, because it can inspire purpose by it's persuit of balance"
],
["What is the meaning evil?",
"the absence of good",
"all the Devil does",
"ignorance",
"depravity"
],
["What is the meaning of good",
"light",
"what is needed to go to heaven",
"the absence of evil",
"righteousness"
]];



timer();

function nextQ() {
	//display scoreboard at the end
	if (i == qAndA.length) {
		$('#rightAns').html(rightAns);
		$('#wrongAns').html(wrongAns);
		$('#scoreBoard').css('opacity', '1');
		$('#bodyRows').css('opacity', '0');
	}
	//submit question
	$('#Question').html(qAndA[i][0]);
	//submit and contain answers
	for (let x = 1; x < 5; x++) {
		$('#ans' + x).html(qAndA[i][x]);
	};
	i++;
	timer();
}

function timer() {
		tim = time + 1;
		clearInterval(intervalId);			
      	intervalId = setInterval(decrement, 1000);
    }

function decrement() {
	    tim--;
    	$("#timer").html(tim);
		if (tim === 0) {
			clearInterval(intervalId);
			nextQ();
		}
}
//check answer
$('#ans1').on('click', check);
$('#ans2').on('click', check);
$('#ans3').on('click', check);
$('#ans4').on('click', check);


function check() {
	if (this == qAndA[i][4]) {
		rightAns++
		nextQ();
	}
	else {
		wrongAns++;
		nextQ();
	}
} 