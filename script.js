canvas = document.getElementById("canvas")
context = canvas.getContext('2d')
context.scale(16, 16)
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
marcador = false
 var handle
function start() {
    document.getElementById('btn1').style.display = "none"
    document.getElementById('div1').style.display = "block"
    document.addEventListener('keydown', move)
    handle = setInterval(updateLoop, 60)
} 

function move(e) {
    if(marcador == true) {
        var code = e.keyCode;
        if (code == '87' && !(direction[1] == 1)) { //cima
            direction = [0, -1]    
        }
        else if (code == '83' && !(direction[1] == -1)) { //baixo
            direction = [0, 1]             
        }
        else if (code == '65' && !(direction[0] == 1)) { //esquerda
            direction = [-1, 0] 
        }
        else if (code == '68' && !(direction[0] == -1)) { //direita
            direction = [1, 0] 
        }
        marcador = false
    }
}


function verifymove() {
    head = snake[0]
    console.log(head)
    if(head[0] > 31 || head[0] < 0 || head[1] > 31 || head[1] < 0){
        gameOver()
    }
    for(i = 1; i < snake.length; i++) {      
        if(snake[i][0] == head[0] && snake[i][1] == head[1]) {
            gameOver()
        }
    }
}

function gameOver() {
    text = document.getElementById('score')
    text.innerText = 'Game Over! \n Score: ' + score
    document.getElementById('btn2').style.display = "block"
    clearInterval(handle)
    document.removeEventListener('keydown', move)
    
}

function replay() {
    location.reload()
}

function updateLoop() {
    tail = snake.pop()
    head = snake[0]
    snake.unshift([
        snake[0][0] + direction[0],
        snake[0][1] + direction[1]
    ])
    if(head[0] == food[0] && head[1] == food[1] || head[0] == food[0] && head[1] == food[1] + 1 || head[0] == food[0] + 1 && head[1] == food[1] || head[0] == food[0] + 1 && head[1] == food[1] + 1) {
        food = [(Math.random() * 30) | 0 , (Math.random() * 30) | 0]
        snake.push([-19, -19])
        snake.push([-19, -19])
        score++
    }
    verifymove()
    draw()
    marcador = true
}

function draw() {
    context.clearRect(0, 0, 500, 500)
    var img = document.getElementById('food')
    var headD = document.getElementById('headD')
    context.drawImage(img, food[0], food[1], 2, 2)
    context.fillStyle = 'green'

    for(i = 0; i < snake.length; i++) {
        if (i == 0) {
            if (direction[1] == 1) {
                context.drawImage(headB, snake[i][0], snake[i][1], 1, 1)
            } 
            
            if (direction[1] == -1) { 
                context.drawImage(headU, snake[i][0], snake[i][1], 1, 1)             
            } 
            
            if (direction[0] == 1) { 
                context.drawImage(headR, snake[i][0], snake[i][1], 1, 1) 
            } 
            
            if (direction[0] == -1) { 
                context.drawImage(headL, snake[i][0], snake[i][1], 1, 1)  
            }
        } else{
            context.fillRect(snake[i][0], snake[i][1], 1, 1)
        }     
    }
}



