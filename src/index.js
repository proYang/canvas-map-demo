import App from './draw.js'
import {
    randomNum,
    randomColor
} from 'outils';
const $app = document.querySelector('#app')
const $bg = document.querySelector('#bg')
const $people = document.querySelector('#people')


const options = {
    container: $app,
    people: [],
    backgroundImage: $bg.getAttribute('src'),
    peopleImage: $people.getAttribute('src')
}
let app = new App(options)

// 添加机器人
document.querySelector('.J_add').addEventListener('click', () => {
    let {
        width,
        height
    } = $app.getBoundingClientRect();
    let x = randomNum(0, width)
    let y = randomNum(0, height)
    options.people.push({
        name: 'yxl',
        color: randomColor(),
        move: [{
            x,
            y
        }]
    })
    // 重绘轨迹，人
    app.updateCanvas('people')
    app.updateCanvas('move')
})

// 是否展示运动轨迹
app.showPath = true
document.querySelector('.J_show').addEventListener('click', () => {
    app.showPath = true
    app.updateCanvas('move')
})
document.querySelector('.J_hidden').addEventListener('click', () => {
    app.showPath = false
    app.updateCanvas('move')
})

// 比例尺
const $ruler = document.querySelector('.J_ruler')
$ruler.innerHTML = `x${app.options.imgScale} 倍`
$app.addEventListener('mousewheel', () => {
    $ruler.innerHTML = `x${app.options.imgScale} 倍`
})

// 鼠标坐标
const $pointerX = document.querySelector('.J_pointer-x')
const $pointerY = document.querySelector('.J_pointer-y')
$app.addEventListener('mousemove', () => {
    $pointerX.innerHTML = `X:${app.options.pointerX}`
    $pointerY.innerHTML = `Y:${app.options.pointerY}`
})


const $measure = document.querySelector('.J_measure')
$measure.addEventListener('click', () => {
    app.measure()
})
const $measureCancel = document.querySelector('.J_measure-cancel')
$measureCancel.addEventListener('click', () => {
    app.options.measure = []
    app.updateCanvas('measure')
})

// 数据模拟器
let mockServer1 = setInterval(() => {
    app.options.people.forEach((person, index) => {
        let length = person.move.length
        let last = person.move[--length]
        let next = {
            x: last.x + randomNum(-10, 10),
            y: last.y + randomNum(-10, 10)
        }
        app.options.people[index].move.push(next)
    });
}, 500)
let mockServer2 = setInterval(() => {
    app.options.people.forEach((person, index) => {
        let length = person.move.length
        let last = person.move[--length]
        let next = {
            x: last.x + randomNum(-10, 10),
            y: last.y + randomNum(-10, 10)
        }
        app.options.people[index].move.push(next)
    });
}, 300)
let mockServer3 = setInterval(() => {
    app.options.people.forEach((person, index) => {
        let length = person.move.length
        let last = person.move[--length]
        let next = {
            x: last.x + randomNum(-10, 10),
            y: last.y + randomNum(-10, 10)
        }
        app.options.people[index].move.push(next)
    });
}, 1000)