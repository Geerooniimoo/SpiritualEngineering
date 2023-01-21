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
const glass = document.createElement('audio');
glass.src = './assets/sounds/Glass-Breaking--www.fesliyanstudios.com.mp3';
const laugh = document.createElement('audio');
laugh.src = './assets/sounds/man-laughing.mp3';

const hanAns = () =>
    this.addEventListener('click', ({ target: { innerText: answer } }) => {
        answer == questions[qI].C ? (
            qI++,
            correct++,
            win.play(),
            renderQA()
        ) : (
            chances--,
            time -= 10,
            lose.play(),
            clearInterval(clockId),
            setTimeout(renderQA,5000),
            setTimeout(()=>{
                clock.style.animation = 'clock2 1s';
                setTimeout(()=>{clock.innerText = `:${time}`},800);
                glass.play();
            },2500),
            chances == 2 ? (
                setTimeout(()=>{rightHand.style.animation = 'rightHand3 5s'},300),
                setTimeout(()=>{rightHand.style.animation = "rightHand2 40s infinite ease-in-out"},5000)
                ) : 
            chances == 1 ? (
                setTimeout(()=>{leftHand.style.animation = 'leftHand3 5s'},300),
                setTimeout(()=>{leftHand.style.animation = "leftHand2 30s infinite ease-in-out"},5000)
                ) : (
                    laugh.play(),
                    main.innerHTML = '',
                    leftHand.style.animation = 'leftHand4 7s',
                    rightHand.style.animation = 'rightHand4 7s',
                    leftHand.style.opacity = 0,
                    rightHand.style.opacity = 0
                )
        );
    }, { once: true });

const endGame = () => {
    clearInterval(clockId);
    if (!chances) fail.play();
    setTimeout(()=> {
        main.innerHTML = `
            <h1 class="end question font-effect-3d">Score: ${Math.floor(correct / 7 * 100)} %</h1>
        `;
    },2000)
}

const renderQA = () => {
    if (qI == questions.length || !chances) return endGame();
    let { Q, A } = questions[qI];

    main.innerHTML = `
    <h1 class="question font-effect-3d" id="clock">:${time}</h1>
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
        clock.innerText = `:${time}`;
    }, 1000)

    A.sort(() => .5 - Math.random()).forEach(ans => {
        answersDiv.innerHTML += `<button onclick="hanAns()">${ans}</button>`
    });
};

const startGame = () => {
    main.innerHTML = '';
    theme.play();
    startBtn.style.animation = "startBtn 5s";
    setTimeout(()=>{startBtn.style.display = 'none';},5000);

    setTimeout(()=>{
        main.innerHTML = `<h1 class="question font-effect-3d" id="clock">⌚:60</h1>`;
        clock.style.animation = 'clock 10s';
        setTimeout(()=>{clock.style.animation = 'unset'},10000)
    },9000);

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
        <h1 class="question font-effect-3d" id="clock">:${time}</h1>
        <h1 class="question font-effect-3d"> ${questions[qI].Q} </h1>
        <div id="answersDiv"></div>
        `;
        setTimeout(renderQA,8000);
    }, 25000)
}

// startGame();

startBtn.addEventListener('click', startGame);
