canvas = document.getElementById("canvas")
context = canvas.getContext('2d')
context.scale(10, 10)
document.body.style.backgroundImage = "url('background.jpg')"
snake = [
    [1, 6],
    [1, 5],
    [1, 4],
    [1, 3],
    [1, 2],
]

direction = [1, 0]
food = [5, 5]
score = 0

function start() {
    document.getElementById('btn1').style.display = "none"
    document.getElementById('div1').style.display = "block"
    document.addEventListener('keypress', move)
    var handle = setInterval(updateLoop, 60) 
}

function move(e) {
    var code = e.which || e.keyCode;
    console.log(code)
    if (code == '119' && !(direction[0] == 0 && direction[1] == 1)) { //cima
        direction = [0, -1]       
    }
    else if (code == '115' && !(direction[0] == 0 && direction[1] == -1)) { //baixo
        direction = [0, 1]  
    }
    else if (code == '97' && !(direction[0] == 1 && direction[1] == 0)) { //esquerda
        direction = [-1, 0] 
    }
    else if (code == '100' && !(direction[0] == -1 && direction[1] == 0)) { //direita
        direction = [1, 0]  
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
    text = document.getElementById('score')
    text.innerText = 'Game Over! \n Score: ' + score
    document.getElementById('btn2').style.display = "block"
    direction = [0, 0]
    clearInterval(handle)
    
}

function replay() {
    location.reload()
}
function updateLoop() {
    tail = snake.pop()
    head = snake[0]
    tail[0] = head[0] + direction[0]
    tail[1] = head[1] + direction[1]
    snake.unshift(tail)
    if(head[0] == food[0] && head[1] == food[1] || head[0] == food[0] && head[1] == food[1] + 1 || head[0] == food[0] + 1 && head[1] == food[1] || head[0] == food[0] + 1 && head[1] == food[1] + 1) {
        food = [(Math.random() * 40) | 0 , (Math.random() * 40) | 0]
        snake.push([-19, -19])
        snake.push([-19, -19])
        score++
    }
    verifymove()
    draw()
}

function draw() {
    context.clearRect(0, 0, 500, 500)
    var img = document.getElementById('food')
    context.drawImage(img, food[0], food[1], 2, 2)
    context.fillStyle = 'green'
    snake.forEach(function([x, y]) {
        context.fillRect(x, y, 1, 1)
        
    })
}



