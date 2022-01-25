
let randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min
}

let createBall = () => {

    let divWidth = document.querySelector('.bottom').offsetWidth
    let divHeight = document.querySelector('.bottom').offsetHeight
    let divContainer = document.querySelector('.bottom')

    let horizontal = randomNumber(0, divWidth)
    let vertical = randomNumber(0, divHeight)
    let size = randomNumber(3, 50)

    let newBall = document.createElement('div')
    newBall.classList.add('circle')
    newBall.style.right = horizontal + 'px'   
    newBall.style.bottom = vertical + 'px'
    newBall.style.width = size + 'px'
    newBall.style.height = size + 'px'


    divContainer.appendChild(newBall)
}

const myInterval = setInterval(createBall, 2000)