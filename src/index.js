import App from './draw.js'
import {
    randomNum,
    randomColor
} from 'outils';
const $app = document.querySelector('#app')
const $bg = document.querySelector('#bg')
const $people = document.querySelector('#people')
const $ruler = document.querySelector('.J_ruler')


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
    console.log(app.options.people)
    app.showPath = true
    app.updateCanvas('move')
})
document.querySelector('.J_hidden').addEventListener('click', () => {
    app.showPath = false
    app.updateCanvas('move')
})

// 比例尺
$ruler.innerHTML = `x${app.options.imgScale} 倍`
$app.addEventListener('mousewheel', () => {
    $ruler.innerHTML = `x${app.options.imgScale} 倍`
})

// 动画
let animation
let step = () => {
    app.updateCanvas('people')
    app.updateCanvas('move')
    animation = requestAnimationFrame(step)
}
animation = requestAnimationFrame(step)


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