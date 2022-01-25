
// let randomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min) ) + min
// }


// let createBall = () => {

//     let divWidth = document.querySelector('.gameWindow').offsetWidth
//     let divHeight = document.querySelector('.gameWindow').offsetHeight
//     let divContainer = document.querySelector('.gameWindow')

//     let horizontal = randomNumber(0, divWidth)
//     let vertical = randomNumber(0, divHeight)
//     let size = randomNumber(10, 30)

//     let newBall = document.createElement('div')
//     newBall.classList.add('circle')
//     newBall.style.right = horizontal + 'px'   
//     newBall.style.bottom = vertical + 'px'
//     newBall.style.width = size + 'px'
//     newBall.style.height = size + 'px'

//     divContainer.appendChild(newBall)
// }


// let test = () => {
//     let circle = document.getElementsByClassName('circle')[0]
//     let container = document.getElementsByClassName('gameWindow')
//     let positionX = circle.style.right.slice(0, -2)
//     let positionY = circle.style.bottom.slice(0, -2)

//     if (positionX < container.offsetWidth) {
//         circle.style.right = (Number(positionX) + 1) + 'px'
//     } else {
//         circle.style.right = (Number(positionX) - 1) + 'px'
//     }






//     // circle.style.bottom = (Number(positionY) + 1) + 'px'
// }


// let a = () => {
// let interval = setInterval(test, 2)}








// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //defino 'ctx' como a area do canvas que posso desenhar em 2d
const h4 = document.querySelector('h4')
const container = document.querySelector('.gameWindow')

const width = canvas.width = container.offsetWidth - 10;
const height = canvas.height = window.innerHeight - h4.offsetHeight - 70;

// function to generate random number

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// constructor balls
// x and y -> screen coordinates
// velx e vely -> horizontal and vertical speed


function Ball(x, y, velX, velY, color, size) {
    this.x = x
    this.y = y
    this.velX = velX
    this.velY = velY
    this.color = color
    this.size = size
}

// draw a ball

Ball.prototype.draw = function () { //draw method defined in the constructor above
    ctx.beginPath() // 'beginPath' -> initiate a draw in the canvas
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill() //actually start the draw
}


// ball movement routine

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) { //ball in the right side
        this.velX = -(this.velX) // change direction
    }

    if ((this.x - this.size) <= 0) { // ball in the left side
        this.velX = -(this.velX)
    }

    if ((this.y + this.size) >= height) { // ball in top
        this.velY = -(this.velY)
    }

    if ((this.y - this.size) <= 0) { // ball in floor
        this.velY = -(this.velY)
    }

    this.x += this.velX
    this.y += this.velY
}

//collision detection

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x
            const dy = this.y - balls[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < this.size + balls[j].size) {
                // balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')'
            }
        }
    }
}






const balls = []


let createBall = () => {
    const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'gray']
    let size = random(10, 20)
    let ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-7, 7),
        random(-7, 7), colors[balls.length], size
    )

    balls.push(ball)
}

while (balls.length < 5) {
    createBall()
}

function loop() {
    // zera o quandro antes de criar o elemento atualizado
    ctx.fillStyle = 'rgba(0, 0, 0, 0.13)' //seta a cor do canvas em semi-transparente
    ctx.fillRect(0, 0, width, height) // faz o retangulo definido acima

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw()
        balls[i].update()
        balls[i].collisionDetect()
    }
    requestAnimationFrame(loop) //chama a função loop de forma repetitiva
}


let a = () => {
    loop()
}




function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect() //retorna a posicao relativa ao viewport
    console.log(event.clientX)
    // const xClick = event.clientX - rect.left
    // const yClick = event.clientY - rect.top
    // let xLeft = xClick - 20
    // let xRight = xClick + 20
    // let yUp = yClick - 20
    // let yDown = yClick + 20
    //alert("x: " + x + " y: " + y)
}

canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e)
})