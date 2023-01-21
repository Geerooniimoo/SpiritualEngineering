let qI = 0;
let clockId;
let time = 60;
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
            correct++,
             win.play()
        ) : (
            chances--,
            lose.play(),
            chances == 2 ? (
                setTimeout(()=>{rightHand.style.animation = 'rightHand3 5s infinite'},300),
                setTimeout(()=>{rightHand.style.animation = "rightHand2 40s infinite ease-in-out"},5000)
                ): (
                setTimeout(()=>{rightHand.style.animation = 'rightHand3 5s infinite'},300),
                setTimeout(()=>{rightHand.style.animation = "rightHand2 40s infinite ease-in-out"},5000)
            )
        );
        qI++;
        renderQA();
    }, { once: true });

const endGame = () => {
    clearInterval(clockId);
    if (!chances) fail.play();

    main.innerHTML = `
        <h1 class="end question font-effect-3d">Score: ${Math.floor(correct / 7 * 100)} %</h1>
    `;
}

const renderQA = () => {
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
             lose.play(),
            endGame()
        );
        time--;
        clock.innerText = time;
    }, 1000)

    A.sort(() => .5 - Math.random()).forEach(ans => {
        answersDiv.innerHTML += `<button onclick="hanAns()">${ans}</button>`
    });
};

const startGame = () => {
    theme.play();
    startBtn.style.animation = "startBtn 5s";
    setTimeout(()=>{startBtn.style.display = 'none';},5000);

    setTimeout(()=>{main.innerHTML = `
    <h1 class="question font-effect-3d" id="clock">⌚:60</h1>`},9000);

    leftHand.style.animation = "leftHand1 25s";
    rightHand.style.animation = "rightHand1 25s";
    leftHand.style.opacity = 1;
    rightHand.style.opacity = 1;

    setTimeout(()=>{
        leftHand.style.animation = "leftHand2 30s 1s infinite ease-in-out"
    },34000);
    setTimeout(()=>{
        rightHand.style.animation = "rightHand2 40s infinite ease-in-out"
    },34000);

    setTimeout(() => {
        main.style.animation = 'main 4s';
        if (qI == questions.length || !chances) return endGame();
        let { Q, A } = questions[qI];
    
        main.innerHTML = `
        <h1 class="question font-effect-3d"> :<span id="clock">${time}</span></h1>
        <h1 class="question font-effect-3d"> ${questions[qI].Q} </h1>
        <div id="answersDiv"></div>
        `;
        setTimeout(renderQA,8000);
    }, 25000)
}

startBtn.addEventListener('click', startGame);
