let qI = 0;
let intervalId;
let correctAns;
let time = 16;
let mins = 0;
let rightAnsTotal = 0;
let wrongAnsTotal = 0;
var sound = 0;
let clockId;
let level = 0;
var qAndA = [
	{
		question: "What is the spirit?",
		answers: ["a ghost", "what we become once we die", "what God and the Devil are fighting for", "the nonphysical part of a person"]
	},
	{
		question: "What is God if it's not defined by religion?",
		answers: ["Jesus", "nothing", "Allah", "the universe"]
	},
	// {
		// question: "If iternal life begins with an eternal sleep, when will the spirit wake up?",
		// answers: ["right away but it cannot be seen because is in a nonphysical form", "right away somewhere else", "after an eternity", "never"]
	// },
	{
		question: "Can the flow of enery teach us about right and wrong?",
		answers: ["no, because enery cannot reason", "yes, because enery always follow the shortest path", "no, because enery is not alive", "yes, because it can inspire purpose by it's persuit of balance"]
	},
	{
		question: "Is the universal space infinite?",
		answers: ['No, nothing is.','Yes, because the Bible says so.','No, everything that has a begining, most have an end.','Yes, because if it wasn\'t, what came next would still be part of it.']
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
		question: "What is God?",
		answers: ["What my religion says", "Everything", "Nothing", "Suprime intelligence"]
	},
	{
		question: "What is the meaning of life?",
		answers: ["to discover the creator", "to focus on spiritual growth and serive to humanity", "to seek devine salvation through the grace of God", "to resolve the imbalance of the mind by understanding the nature of reality"]
	},
	{
		question: 'What is the meaning of infinity?',
		answers: ['everything','nothing','the universe','what has no begining nor end']
	},
	{
		question: 'Can man understand God\'s intimate nature?',
		answers: ['Yes, religion teaches us.', 'No, man is too ingnorant.', 'Yes, man is smart enough.','No, man is missing a sense.']
	},
	{
		question: 'What is the spirit?',
		answers: ['A ghost','A creation of religion','The after life','the universe\'s intellectual begining']
	},
	{
		question: 'Does the universal space have a limit?',
		answers: ['Yes, everything does.','No, because the Bible says so.','Yes, everything that has a begining, most have an end.','No, because if it did, what came next would still be part of it.']
	},
	{
		question: 'Does absolute emptiness exist?',
		answers: ['Yes, when God is not present.','No, air will remain.','Yes, when nothing can be seen.','No, what seems empty is occupied by matter which escapes instruments or sense.']
	}
];

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
var updates = { lastVisit: new Date(), qAndA: [] };
const ground = ['./assets/images/bg0.png', './assets/images/bg1.png', './assets/images/bg2.png', './assets/images/bg3.png', './assets/images/bg4.png', './assets/images/bg5.png', './assets/images/bg6.png', './assets/images/bg7.png'];
const handRight = ['assets/images/rightHand0.png', 'assets/images/rightHand1.png', 'assets/images/rightHand2.png', 'assets/images/rightHand3.png'];
const handLeft = ['assets/images/leftHand0.png', 'assets/images/leftHand1.png', 'assets/images/leftHand2.png', 'assets/images/leftHand3.png'];

qAndA = qAndA.sort(() => 0.5 - Math.random());
