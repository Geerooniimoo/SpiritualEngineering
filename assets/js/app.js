
let qI = 0;
let clock;
let clockId;
let time = 60;
let correct = 0;
let chances = 3;

const win = document.createElement('audio');
const fail = document.createElement('audio');
const theme = document.createElement('audio');
const glass = document.createElement('audio');
const laugh = document.createElement('audio');
const title = document.getElementById('title');
const victory = document.createElement('audio');
const trumpet = document.createElement('audio');

laugh.src = './assets/sounds/man-laughing.mp3';
trumpet.src = './assets/sounds/tower-clock.mp3';
fail.src = './assets/sounds/nasty-error-long.mp3';
win.src = './assets/sounds/filling-your-inbox.mp3';
theme.src = './assets/sounds/Halo Theme Song Original.mp3';
victory.src = './assets/sounds/Halo Reach - 18 - Walking Away.mp3';
glass.src = './assets/sounds/Glass-Breaking--www.fesliyanstudios.com.mp3';

const hanAns = () =>
    this.addEventListener('click', ({ target: { innerText: answer } }) => {
        answer == questions[qI].C ? (
            qI++,
            correct++,
            win.play(),
            renderQA()
        ) : (
            qI++,
            chances--,
            time -= 10,
            fail.play(),
            time < 0 ? time = 0 : '',
            clearInterval(clockId),
            chances ? (
                setTimeout(renderQA, 5000),
                setTimeout(() => {
                    clock.style.animation = 'clock2 1s';
                    setTimeout(() => { clock.innerText = `:${time < 10 ? '0' + time : time}` }, 800);
                    glass.play();
                }, 2500)
            ) : '',
            chances == 2 ? (
                setTimeout(() => { rightHand.style.animation = 'rightHand3 5s' }, 300),
                setTimeout(() => { rightHand.style.animation = "rightHand2 40s infinite ease-in-out" }, 5000)
            ) :
                chances == 1 ? (
                    setTimeout(() => { leftHand.style.animation = 'leftHand3 5s' }, 300),
                    setTimeout(() => { leftHand.style.animation = "leftHand2 30s infinite ease-in-out" }, 5000)
                ) : endGame()
        );
    }, { once: true });

const endGame = () => {
    clearInterval(clockId);
    main.innerHTML = `<h1 id="score" class="question font-effect-3d">Score: ${Math.floor(correct / 7 * 100)} %</h1>`;

    if (!chances || !time || correct < 5) {
        fail.play();
        localStorage.se = Date.now();

        setTimeout(() => {
            leftHand.style.animation = 'leftHand4 7s';
            rightHand.style.animation = 'rightHand4 7s';
            leftHand.style.opacity = 0;
            rightHand.style.opacity = 0;
        }, 2000);

        setTimeout(() => {
            document.body.style.animation = 'clock2 1s'
            title.style.opacity = 0;
            main.innerHTML = '';
            glass.play();
        }, 4000);

        setTimeout(() => {
            title.classList.toggle('font-effect-fire-animation');
            title.style = 'color:darkred;opacity:1';
            laugh.play();
        }, 5000)

        setTimeout(() => {
            main.innerHTML = '';
            main.style.animation = 'main 4s';
            main.innerHTML = `<h1 id="reflect" class="font-effect-fire-animation">Time to reflect before<br> next game<br><br><span id="remain">23:59</span></h1>`;
        }, 10000)
    } else {
        localStorage.removeItem('se');
        setTimeout(() => {
            trumpet.play();
            main.innerHTML = '';
            document.body.style.animation = 'victory 5s'
            title.style = 'color:#424040;letter-spacing:1rem;opacity:0.5;word-spacing:1rem;'
        }, 2000);
        setTimeout(() => {
            leftHand.style = 'animation:unset,opacity:0';
            rightHand.style = 'animation:unset,opacity:0';
        }, 3000);
        setTimeout(() => {
            theme.pause();
            victory.play();
            img.src = './assets/images/bg1.png';
        }, 4000)
    };
};

const renderQA = () => {
    if (qI == 7 || !chances || !time) return endGame();
    let { Q, A } = questions[qI];

    main.innerHTML = `
    <h1 class="question font-effect-3d" id="clock">:${time < 10 ? '0' + time : time}</h1>
    <h1 class="question font-effect-3d"> ${Q} </h1>
    <div id="answersDiv"></div>
    `;
    clock = document.getElementById('clock');

    clearInterval(clockId);
    clockId = setInterval(() => {
        if (time < 1) time = 0;
        if (!time) return endGame();
        time--;
        clock.innerText = `:${time < 10 ? '0' + time : time}`;
    }, 1000)

    A.sort(() => .5 - Math.random()).forEach(ans => {
        answersDiv.innerHTML += `<button onclick="hanAns()">${ans}</button>`
    });
};

const startGame = () => {

    if (localStorage.se) {
        laugh.play();
        let oneDay = 86400000;
        startBtn.style.display = 'none';
        title.style = 'color:darkred;opacity:1';
        let lastVisit = Date.now() - localStorage.se;
        title.classList.toggle('font-effect-fire-animation');

        if (lastVisit < oneDay) {
            let rH = (oneDay-lastVisit)/3600000;
            main.innerHTML = '';
            main.style.animation = 'main 4s';
            main.innerHTML = `<h1 id="reflect" class="font-effect-fire-animation">Time to reflect before<br> next game<br><br><span id="remain">${Math.floor(rH)}:${Math.floor(rH%1*60)}</span></h1>`;
            return;
        }
    }
    theme.play();
    main.innerHTML = '';
    startBtn.style.animation = "startBtn 5s";
    setTimeout(() => { startBtn.style.display = 'none'; }, 5000);

    setTimeout(() => {
        main.innerHTML = `<h1 class="question font-effect-3d" id="clock">⌚:${time < 10 ? '0' + time : time}</h1>`;
        clock = document.getElementById('clock');
        clock.style.animation = 'clock 10s';
        setTimeout(() => { clock.style.animation = 'unset' }, 10000)
    }, 9000);

    leftHand.style.animation = "leftHand1 25s";
    rightHand.style.animation = "rightHand1 25s";
    leftHand.style.opacity = 1;
    rightHand.style.opacity = 1;

    setTimeout(() => {
        leftHand.style.animation = "leftHand2 30s 1s infinite ease-in-out"
    }, 34000);
    setTimeout(() => {
        rightHand.style.animation = "rightHand2 40s infinite ease-in-out"
    }, 34000);

    setTimeout(() => {
        main.style.animation = 'main 4s';
        if (qI == questions.length || !chances) return endGame();
        let { Q, A } = questions[qI];

        main.innerHTML = `
        <h1 class="question font-effect-3d" id="clock">:${time < 10 ? '0' + time : time}</h1>
        <h1 class="question font-effect-3d"> ${questions[qI].Q} </h1>
        <div id="answersDiv"></div>
        `;
        clock = document.getElementById('clock');
        setTimeout(renderQA, 8000);
    }, 25000)
}

startBtn.addEventListener('click', startGame);
