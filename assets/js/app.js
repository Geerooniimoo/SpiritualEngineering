let qI = 0;
let clockId;
let correct = 0;
let chances = 3;

const win = document.createElement('audio');
win.src = './assets/sounds/filling-your-inbox.mp3';
const lose = document.createElement('audio');
lose.src = './assets/sounds/nasty-error-long.mp3';
const fail = document.createElement('audio');
fail.src = './assets/sounds/man-laughing.mp3';
const theme = document.createElement('audio');
theme.src = './assets/sounds/Halo Theme Song Original.mp3';

const hanAns = () =>
    this.addEventListener('click', ({ target: { innerText: answer } }) => {
        answer == questions[qI].C ? (
            correct++
//sound             win.play(),
        ) : (
            chances--
//sound             lose.play(),
        );
        qI++;
        renderQA();
    }, { once: true });

const endGame = () => {
    clearInterval(clockId);
    if(!chances) fail.play();

    main.innerHTML = `
        <h1 class="end question font-effect-3d">Score: ${Math.floor(correct / 7 * 100)} %</h1>
    `;
}

const renderQA = () => {
    let time = 0;
    if (qI == questions.length ) qI=0; //remove
    if (qI == questions.length || !chances) return endGame();
    let { Q, A } = questions[qI];

    main.innerHTML = `
    <h1 class="question font-effect-3d"> :<span id="clock">${time}</span></h1>
    <h1 class="question font-effect-3d"> ${Q} </h1>
    <div id="answersDiv"></div>
    `;

    clearInterval(clockId);
    clockId = setInterval(() => {
        if (!time) return (
            qI++,
//sound             lose.play(),
            renderQA()
        );
        time--;
        clock.innerText = time;
    }, 200)

    A.sort(() => .5 - Math.random()).forEach(ans => {
        answersDiv.innerHTML += `<button onclick="hanAns()">${ans}</button>`
    });
};

const startGame = () => {
//sound     theme.play();
    startBtn.style.display = "none";
//move    leftHand.style.animation = "leftHand1 15s";
    leftHand.style.animation = "leftHand1 5s"; //remove
//move      rightHand.style.animation = "rightHand1 15s";
    rightHand.style.animation = "rightHand1 5s"; //remove
    leftHand.style.opacity =  1;
    rightHand.style.opacity = 1;
    setTimeout(()=>{
//move        leftHand.style.animation = "leftHand2 30s 1s infinite ease-in-out"
        leftHand.style.animation = "leftHand2 5s 1s infinite ease-in-out"
    },5000);
    setTimeout(()=>{
//move        rightHand.style.animation = "rightHand2 40s infinite ease-in-out"
        rightHand.style.animation = "rightHand2 5s infinite ease-in-out"
    },5000);
    /* animation: leftHand2 25s 1s infinite ease-in-out; */
    /* animation: rightHand2 30s infinite ease-in-out; */

    setTimeout(renderQA,32000);
    
}

startGame();
 setInterval(startGame,15000);

startBtn.addEventListener('click', startGame);

renderQA()
