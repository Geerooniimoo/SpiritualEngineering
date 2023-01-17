
let questions = [
	{
		Q: "What is the spirit?",
		A: ["a ghost", "what we become once we die", "what God and the Devil are fighting for", "the nonphysical part of a person"],
		C: "the nonphysical part of a person"
	},
	{
		Q: "What is God if it's not defined by religion?",
		A: ["Jesus", "nothing", "Allah", "the universe"],
		C: "the universe"
	},
	// {
		// Q: "If iternal life begins with an eternal sleep, when will the spirit wake up?",
		// A: ["right away but it cannot be seen because is in a nonphysical form", "right away somewhere else", "after an eternity", "never"],
		// C: "never"
	// },
	// {
	// 	Q: "Why is humanity interested in religion?",
	// 	A: ["For the pursue of of iternity","For the pursue of peace","For the pursue of hapiness","For the pursue of a higher power"],
	// 	A: "For the pursue of a higher power",
	// },
	{
		Q: "Can the flow of enery teach us about right and wrong?",
		A: ["no, because enery cannot reason", "yes, because enery always follow the shortest path", "no, because enery is not alive", "yes, because it can inspire purpose by it's persuit of balance"],
		C: "yes, because it can inspire purpose by it's persuit of balance"
	},
	{
		Q: "What is the meaning of evil?",
		A: ["the absence of good", "all the Devil does", "ignorance", "depravity"],
		C: "depravity"
	},
	{
		Q: "What is the meaning of good?",
		A: ["light", "what is needed to go to heaven", "the absence of evil", "righteousness"],
		C: "righteousness"
	},
	{
		Q: "What is God?",
		A: ["What my religion says", "Everything", "Nothing", "Suprime intelligence"],
		C: "Suprime intelligence"
	},
	{
		Q: "What is the meaning of life?",
		A: ["to discover the creator", "to focus on spiritual growth and serive to humanity", "to seek devine salvation through the grace of God", "to resolve the imbalance of the mind by understanding the nature of reality"],
		C: "to resolve the imbalance of the mind by understanding the nature of reality"
	},
	{
		Q: "What is life?",
		A: ["The creation of a man and a woman", "to seek devine salvation through the grace of God", "life is the power to feel","A state of change during a perio of time"],
		C: "A state of change during a perio of time"
	},
	{
		Q: "What is the meaning of infinity?",
		A: ["everything","nothing","the universe","what has no begining nor end"],
		C: "what has no begining nor end"
	},
	{
		Q: "Can man understand God's intimate nature?",
		A: ["Yes, religion teaches us.", "No, man is too ingnorant.", "Yes, man is smart enough.","No, man is missing a sense."],
		C: "No, man is missing a sense."
	},
	{
		Q: "What is the spirit?",
		A: ["A ghost","A creation of religion","The after life","the universe's intellectual begining"],
		C: "the universe's intellectual begining"
	},
	{
		Q: "Does the universal space have a limit?",
		A: ["Yes, everything does.","No, because the Bible says so.","Yes, everything that has a begining, most have an end.","No, because if it did, what came next would still be part of it."],
		C: "No, because if it did, what came next would still be part of it."
	},
	{
		Q: "Does absolute emptiness exist?",
		A: ["Yes, when God is not present.","No, air will remain.","Yes, when nothing can be seen.","No, what seems empty is occupied by matter which escapes current instruments."],
		C: "No, what seems empty is occupied by matter which escapes current instruments."
	}
];

// const themeSong = document.createElement('audio');
// $(themeSong).attr('src', "assets/sounds/Halo Theme Song Original.mp3");
// const rightAnsSong = document.createElement('audio');
// $(rightAnsSong).attr('src', 'assets/sounds/filling-your-inbox.mp3');
// const wrongAnsSong = document.createElement('audio');
// $(wrongAnsSong).attr('src', 'assets/sounds/nasty-error-long.mp3');
// const winSong = document.createElement('audio');
// $(winSong).attr('src', 'assets/sounds/12-days-of-christmas.mp3');
// const winTrump = document.createElement('audio');
// $(winTrump).attr('src', 'assets/sounds/bugle-3.mp3');
// const winBells = document.createElement('audio');
// $(winBells).attr('src', 'assets/sounds/tower-clock.mp3');
// const lostSong = document.createElement('audio');
// $(lostSong).attr('src', 'assets/sounds/Corpse Party - Gameover.mp3')
// const lostLaugh = document.createElement('audio');
// $(lostLaugh).attr('src', 'assets/sounds/man-laughing.mp3')
// const lostDoor = document.createElement('audio');
// $(lostDoor).attr('src', 'assets/sounds/creaky-wood-door.mp3')
// var updates = { lastVisit: new Date(), questions: [] };
const ground = ['./assets/images/bg0.png', './assets/images/bg1.png', './assets/images/bg2.png', './assets/images/bg3.png', './assets/images/bg4.png', './assets/images/bg5.png', './assets/images/bg6.png', './assets/images/bg7.png'];
const handRight = ['assets/images/rightHand0.png', 'assets/images/rightHand1.png', 'assets/images/rightHand2.png', 'assets/images/rightHand3.png'];
const handLeft = ['assets/images/leftHand0.png', 'assets/images/leftHand1.png', 'assets/images/leftHand2.png', 'assets/images/leftHand3.png'];

questions = questions.sort(() => 0.5 - Math.random());