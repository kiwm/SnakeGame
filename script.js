canvas = document.getElementById("canvas")
context = canvas.getContext('2d')
context.scale(10, 10)
snake = [
    [1, 6],
    [1, 5],
    [1, 4],
    [1, 3],
    [1, 2],
]

direction = [0, 0]

document.addEventListener('keypress', move)

function move(e) {
    var code = e.which || e.keyCode;
    if (code == '87') {
        direction = [0, -1]
        updateLoop()
    }
    else if (code == '83') {
        direction = [0, 1] 
        updateLoop()
    }
    else if (code == '65') {
        direction = [-1, 0]
        updateLoop()
    }
    else if (code == '68') {
        direction = [1, 0]
        updateLoop()
    } 
}

function verifymove() {
    head = snake[0]
    if(head[0] > 49 || head[0] < 0 || head[1] > 49 || head[1] < 0){
        gameOver()
    }
    console.log(head)
    for(i = 1; i < snake.length; i++) {
        console.log(snake[i])
        if(snake[i][0] == head[0] && snake[i][1] == head[1]) {
            console.log("sldkfjsld")
            gameOver()
        }
    }
}

function gameOver() {
    document.removeEventListener('keypress', move)
    window.alert("Game Over")
}

function updateLoop() {
    tail = snake.pop()
    head = snake[0]
    tail[0] = head[0] + direction[0]
    tail[1] = head[1] + direction[1]
    snake.unshift(tail)
    verifymove()
    draw()
}

function draw() {
    context.clearRect(0, 0, 500, 500)
    snake.forEach(function([x, y]) {
        context.fillRect(x, y, 1, 1)
    })
}

