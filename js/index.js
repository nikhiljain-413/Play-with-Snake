document.addEventListener('DOMContentLoaded', () => {
    // Game constants and variables
    const inputDir = { x: 0, y: 0 };
    const speed = 10;
    let score = 0;
    let hiscoreval = 0;
    let lastPaintTime = 0;
    let snakeArr = [{ x: 15, y: 13 }];
    let food = { x: 7, y: 6 };

    // Get DOM elements
    const board = document.getElementById('board');
    const scoreBox = document.getElementById('scoreBox');
    const hiscoreBox = document.getElementById('hiscoreBox');

    // Game Functions
    function main(ctime) {
        window.requestAnimationFrame(main);

        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }

        lastPaintTime = ctime;
        gameEngine();
    }

    function isCollide(snake) {
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }

        if (
            snake[0].x >= 18 ||
            snake[0].x <= 0 ||
            snake[0].y >= 18 ||
            snake[0].y <= 0
        ) {
            return true;
        }

        return false;
    }

    function generateFoodPosition() {
        const a = 2;
        const b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };
    }

    function gameEngine() {
        if (isCollide(snakeArr)) {
            inputDir.x = 0;
            inputDir.y = 0;
            alert('Game Over. Press any key to play again!');
            snakeArr = [{ x: 15, y: 13 }];
            score = 0;
        }

        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            score += 1;

            if (score > hiscoreval) {
                hiscoreval = score;
                localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = 'Hi SCORE: ' + hiscoreval;
            }

            scoreBox.innerHTML = 'Score: ' + score;

            snakeArr.unshift({
                x: snakeArr[0].x + inputDir.x,
                y: snakeArr[0].y + inputDir.y,
            });

            generateFoodPosition();
        }

        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

        renderBoard();
    }

    function renderBoard() {
        board.innerHTML = '';

        snakeArr.forEach((segment, index) => {
            const element = createGameElement(segment, index === 0 ? 'head' : 'snake');
            board.appendChild(element);
        });

        board.appendChild(createGameElement(food, 'food'));
    }

    function createGameElement(position, className) {
        const element = document.createElement('div');
        element.style.gridRowStart = position.y;
        element.style.gridColumnStart = position.x;
        element.classList.add(className);
        return element;
    }

    // Main logic starts here
    const storedHiscore = localStorage.getItem('hiscore');
    if (storedHiscore !== null) {
        hiscoreval = JSON.parse(storedHiscore);
        hiscoreBox.innerHTML = 'Hi SCORE: ' + hiscoreval;
    }

    window.requestAnimationFrame(main);

    window.addEventListener('keydown', (e) => {
        inputDir.x = 0;
        inputDir.y = 1; // Start the game

        switch (e.key) {
            case 'ArrowLeft':
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case 'ArrowRight':
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            case 'ArrowUp':
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case 'ArrowDown':
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            default:
                break;
        }
    });
});
