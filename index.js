// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //defino 'ctx' como a area do canvas que posso desenhar em 2d
const h4 = document.querySelector('h4')
const container = document.querySelector('.gameWindow')
const startBtn = document.querySelector('#start')
const levelDiv = document.querySelector('#difficulty')
const btnEasy = document.querySelector('#btnEasy')
const btnMedium = document.querySelector('#btnMedium')
const btnHard = document.querySelector('#btnHard')
const endGame = document.querySelector('#endGame')

let actual = {
    ballQty: 6,
    speed: 4,
    totalTime: 21,
    timeout: 4000,
    start: false
}

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


const balls = []
const timeoutArray = []


let decreaseBallQty = () => {
    if (actual.ballQty > 0) {
        actual.ballQty -= 1
    }
}

let increaseBallQty = () => {
    actual.ballQty += 1
    createBall()
    startBallTimer()
}

let createBall = () => {
    if (balls.length === 0 && actual.ballQty > 0) {
        let size = random(10, 20)
        let ball = new Ball(
            random(size, width - size),
            random(size, height - size),
            random(actual.speed * -1, actual.speed),
            random(actual.speed * -1, actual.speed),
            'red',
            size
        )
        balls.push(ball)
    }
    while (balls.length < actual.ballQty) {
        let size = random(10, 20)
        let ball = new Ball(
            random(size, width - size),
            random(size, height - size),
            random(actual.speed * -1, actual.speed),
            random(actual.speed * -1, actual.speed),
            'rgb' + '(' + random(0, 220) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            size
        )
        balls.push(ball)
    }
    ballsLeft()
}




let removeBall = () => {
    removeBallTimer()
    decreaseBallQty()
    balls.splice(0, balls.length)
    startBallTimer()
    return createBall()
}

let startBallTimer = () => {
    const timer = setTimeout(increaseBallQty, actual.timeout)
    timeoutArray.push(timer)
}


// clear running timeouts. Starts from 2, because the timeout id#1 is always the total timer
let removeBallTimer = () => {
    for (i = 2; i < timeoutArray.length + 2; i++) {
        clearTimeout(i)
    }
}



let ballsLeft = () => {
    let remainingBalls = actual.ballQty
    let text = document.querySelector('#ballqty')
    text.innerText = 'Current: ' + remainingBalls

    if (remainingBalls === 0) {
        removeBallTimer()
        winner()
    }
}

let winner = () => {
    clearInterval(totalTimer)
    removeBallTimer()
    canvas.style.visibility = 'hidden'
    endGame.innerText = `Congrats! You won with ${actual.totalTime} seconds of spare time!`
    endGame.style.visibility = 'visible'
    setTimeout(reStart, 5000)
}

let loser = () => {
    clearInterval(totalTimer)
    removeBallTimer()
    canvas.style.visibility = 'hidden'
    endGame.innerText = `You lost..... Maybe an easier level?`
    endGame.style.visibility = 'visible'
    setTimeout(reStart, 5000)
}


let reStart = () => {

    location.reload()

}





let totalTimer = () => {
    if (actual.totalTime > 0 && actual.ballQty > 0) {
        actual.totalTime--
        let timerText = document.querySelector('#timeleft')
        timerText.innerText = 'Actual: ' + actual.totalTime
    } else if (actual.totalTime === 0) {
        loser()
    }
}

totalTimer()
ballsLeft()


function loop() {

    ctx.fillStyle = 'rgba(0, 0, 0, 0.13)' //set the color to transparent
    ctx.fillRect(0, 0, width, height) // make the canvas 

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw()
        balls[i].update()
    }
    requestAnimationFrame(loop) //calls loop  
}


let start = () => {
    levelDiv.style.visibility = 'hidden'
    createBall()
    loop()
    setInterval(totalTimer, 1000)
    startBallTimer()
}


function getClickedBall(canvas, event) {
    const rect = canvas.getBoundingClientRect() //return position relative to canvas viewport
    const plus = 20
    let xPlus = event.clientX + plus
    let xMinus = event.clientX - plus
    let yPlus = event.clientY + plus - 80
    let yMinus = event.clientY - plus - 80

    if (balls.length > 0) {
        if (balls[0].x <= xPlus && balls[0].x >= xMinus && balls[0].y <= yPlus && balls[0].y >= yMinus) {
            console.log(balls[0])
            return removeBall()
        }
    }
}



canvas.addEventListener('mousedown', function (e) {
    getClickedBall(canvas, e)
})

startBtn.addEventListener('click', start)

btnEasy.addEventListener('click', () => {
    actual.ballQty = 6
    actual.speed = 4
    actual.totalTime = 21
    actual.timeout = 5000
    ballsLeft()
})

btnMedium.addEventListener('click', () => {
    actual.ballQty = 10
    actual.speed = 6
    actual.totalTime = 21
    actual.timeout = 4000
    ballsLeft()
})

btnHard.addEventListener('click', () => {
    actual.ballQty = 14
    actual.speed = 8
    actual.totalTime = 21
    actual.timeout = 3000
    ballsLeft()
})