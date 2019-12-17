canvas = document.getElementById("canvas")
context = canvas.getContext('2d')
context.scale(10, 10)

snake = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 3],
    [1, 4],
]
    direction = [0, 0]

document.addEventListener('keypress', move)

function move(e) {
    var code = e.which || e.keyCode;
    console.log(code)
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



function gameover() {
    document.removeEventListener('keypress', move)
}

function updateLoop() {
    tail = snake.pop()
    head = snake[0]
    tail[0] = head[0] + direction[0]
    tail[1] = head[1] + direction[1]
    snake.unshift(tail)
    draw()
}

function draw() {
    context.clearRect(0, 0, 500, 500)
    snake.forEach(function([x, y]) {
        context.fillRect(x, y, 1, 1)
    })
}

