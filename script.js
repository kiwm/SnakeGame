canvas = document.getElementById("canvas")
context = canvas.getContext('2d')
context.scale(10, 10)
context.strokeStyle = '#09f'
context.lineCap = 'round'
snake = [
    [1, 6],
    [1, 5],
    [1, 4],
    [1, 3],
    [1, 2],
]

direction = [0, 0]
food = [5, 5]

document.addEventListener('keypress', move)

function move(e) {
    var code = e.which || e.keyCode;
    if (code == '119' && !(direction[0] == 0 && direction[1] == 1)) { //cima
        direction = [0, -1]
        updateLoop()
    }
    else if (code == '115' && !(direction[0] == 0 && direction[1] == -1)) { //baixo
        direction = [0, 1] 
        updateLoop()
    }
    else if (code == '97' && !(direction[0] == 1 && direction[1] == 0)) { //esquerda
        direction = [-1, 0]
        updateLoop()
    }
    else if (code == '100' && !(direction[0] == -1 && direction[1] == 0)) { //direita
        direction = [1, 0]
        updateLoop()
    } 
}

function verifymove() {
    head = snake[0]
    if(head[0] > 49 || head[0] < 0 || head[1] > 49 || head[1] < 0){
        gameOver()
    }
    for(i = 1; i < snake.length; i++) {      
        if(snake[i][0] == head[0] && snake[i][1] == head[1]) {
            gameOver()
        }
    }
}

function gameOver() {
    document.removeEventListener('keypress', move)
    window.alert("Game Over")
}

function grow() {
    snake.push([1, 1])
}

function updateLoop() {
    tail = snake.pop()
    head = snake[0]
    tail[0] = head[0] + direction[0]
    tail[1] = head[1] + direction[1]
    snake.unshift(tail)
    verifymove()
    if(head[0] == food[0] && head[1] == food[1]) {
        food = [(Math.random() * 40) | 0 , (Math.random() * 40) | 0]
    }
    draw()
}

function draw() {
    context.clearRect(0, 0, 500, 500)

    context.fillStyle = 'red'
    context.fillRect(food[0], food[1], 1, 1)
    context.fillStyle = 'black'
    snake.forEach(function([x, y]) {
        context.fillRect(x, y, 1, 1)
        
    })
}



