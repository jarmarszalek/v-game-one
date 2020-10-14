(() => {
    const board = document.getElementById('board');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = board.offsetWidth;
    canvas.height = board.offsetHeight;
    board.appendChild(canvas);

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

    const drawRect = () => {
        ctx.beginPath();
        ctx.rect(position.x, position.y, rectSize, rectSize);
        ctx.fillStyle = '#17A589';
        ctx.fill();
        ctx.closePath();
    }

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect();

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
