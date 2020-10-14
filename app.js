(() => {
    const getRandom = () => Math.ceil(Math.random() * (19 - 0));

    const board = document.getElementById('board');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = board.offsetWidth;
    canvas.height = board.offsetHeight;
    board.appendChild(canvas);

    let score = 0;
    const points = document.createElement('div');
    points.innerText = score;
    board.appendChild(points);

    const updateScore = () => {
        score++;
        points.innerText = score;
    };

    const rectSize = 20;
    const distance = {
        x: rectSize,
        y: rectSize
    }
    const position = {
        x: rectSize,
        y: rectSize
    };

    let direction = 'right';
    const arrowKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    const keyDownHandler = (e) => {
        if (arrowKeys.includes(e.key)) {
            direction = e.key.toLowerCase().replace('arrow', '');
        }
    };
    document.addEventListener('keydown', keyDownHandler);

    const gameOver = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearInterval(gameInterval);

        const alert = document.createElement('button');
        alert.innerText = 'Try again!';
        alert.addEventListener('click', () => {
            window.location.reload();
        });
        board.appendChild(alert);
    };

    const drawUserRect = () => {
        ctx.beginPath();
        ctx.rect(position.x, position.y, rectSize, rectSize);
        ctx.fillStyle = '#17A589';
        ctx.fill();
        ctx.closePath();
    }

    const getPointPosition = () => ({
        x: getRandom() * rectSize,
        y: getRandom() * rectSize
    });

    let pointPosition = getPointPosition();
    const drawPointRect = (x, y) => {
        ctx.beginPath();
        ctx.rect(x, y, rectSize, rectSize);
        ctx.fillStyle = '#CB4335';
        ctx.fill();
        ctx.closePath();
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawUserRect();
        drawPointRect(pointPosition.x, pointPosition.y);

        switch (direction) {
            case 'left':
                position.x -= distance.x;
                break;
            case 'right':
                position.x += distance.x;
                break;
            case 'up':
                position.y -= distance.y;
                break;
            case 'down':
                position.y += distance.y;
                break;
        }

        if (position.x === pointPosition.x && position.y === pointPosition.y) {
            updateScore();
            pointPosition = getPointPosition();
        }

        // if (isKeyPressed) {
        //     switch (direction) {
        //         case 'left':
        //             position.x -= distance.x;
        //             break;
        //         case 'right':
        //             position.x += distance.x;
        //             break;
        //         case 'up':
        //             position.y -= distance.y;
        //             break;
        //         case 'down':
        //             position.y += distance.y;
        //             break;
        //     }
        // }

        if (position.y < 0) {
            position.y = 0;
            gameOver();
        }

        if (position.y > canvas.height - rectSize) {
            position.y = canvas.height - rectSize;
            gameOver();
        }

        if (position.x < 0) {
            position.x = 0;
            gameOver();
        }

        if (position.x > canvas.width - rectSize) {
            position.x = canvas.width - rectSize;
            gameOver();
        }
    };

    const gameInterval = setInterval(draw, 180);
})();
