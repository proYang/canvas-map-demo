import App from './app.js'
import {
    Random
} from 'mockjs'
import {
    randomNum,
    randomColor,
    addClass,
    removeClass,
    deepClone
} from 'outils';
const $app = document.querySelector('#app')

const options = {
    container: $app,
    people: [],
    backgroundImage: './assert/images/map.jpg',
    peopleImage: ['./assert/images/people-1.png', './assert/images/people-2.png', './assert/images/people-3.png']
}
let app = new App(options)

// function mockPeopleServer() {
//     let people = []
//     let {
//         width,
//         height
//     } = $app.getBoundingClientRect();
//     let peopleNum = randomNum(5, 15)
//     // 添加人
//     let id = 1000
//     for (let i = 0; i < peopleNum; i++) {
//         let x = randomNum(0, width)
//         let y = randomNum(0, height)
//         people.push({
//             id: id++,
//             imgIndex: randomNum(0, 2),
//             name: Random.cname(),
//             color: randomColor(),
//             move: [{
//                 x,
//                 y
//             }]
//         })
//     }
//     // 模拟运动轨迹
//     people.forEach((person, index) => {
//         let moveNum = randomNum(50, 100)
//         for (let i = 0; i < moveNum; i++) {
//             let last = person.move[person.move.length - 1]
//             let next = {
//                 x: last.x + randomNum(-12, 12),
//                 y: last.y + randomNum(-12, 12)
//             }
//             people[index].move.push(next)
//         }
//     });
//     return people
// }
// let mockPeople = mockPeopleServer()
// 添加机器人
document.querySelector('.J_add').addEventListener('click', () => {

    // app.options.people = mockPeople
    let {
        width,
        height
    } = $app.getBoundingClientRect();
    let id = 1000
    let peopleNum = randomNum(5, 15)
    for (let i = 0; i < peopleNum; i++) {
        let x = randomNum(0, width)
        let y = randomNum(0, height)
        app.options.people.push({
            id: id++,
            imgIndex: randomNum(0, 2),
            name: Random.cname(),
            color: randomColor(),
            move: [{
                x,
                y
            }]
        })
    }

    // 重绘轨迹，人
    // app.updateCanvas('people')
    // app.updateCanvas('move')
})

// 是否展示运动轨迹
// let mockServer4
let $show = document.querySelector('.J_show');
$show.addEventListener('click', () => {
    // document.querySelector('.J_add').click()
    // clearInterval(mockServer4)
    app.showPath = !app.showPath
    if (app.showPath === false) {
        $show.innerHTML = '运动轨迹'
        removeClass($show, 'btn-warning')
        addClass($show, 'btn-primary')
    } else {
        $show.innerHTML = '关闭轨迹'
        removeClass($show, 'btn-primary')
        addClass($show, 'btn-warning')
    }

    // let people = deepClone(app.options.people);
    // app.options.people.forEach((person, index, array) => {
    //     array[index].move = []
    // })
    // mockServer4 = setInterval(() => {
    //     people.forEach((person, index, array) => {
    //         let point = array[index].move.shift()
    //         if (point === undefined) return
    //         app.options.people[index].move.push(point)
    //     })
    // }, 200)
    // app.updateCanvas('move')
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
            x: last.x + randomNum(-5, 5),
            y: last.y + randomNum(-5, 5)
        }
        app.options.people[index].move.push(next)
        if (length > 100) app.options.people[index].move.shift()
    });
}, 500)
let mockServer2 = setInterval(() => {
    app.options.people.forEach((person, index) => {
        let length = person.move.length
        let last = person.move[--length]
        let next = {
            x: last.x + randomNum(-5, 5),
            y: last.y + randomNum(-5, 5)
        }
        app.options.people[index].move.push(next)
        if (length > 100) app.options.people[index].move.shift()
    });
}, 300)
let mockServer3 = setInterval(() => {
    app.options.people.forEach((person, index) => {
        let length = person.move.length
        let last = person.move[--length]
        let next = {
            x: last.x + randomNum(-5, 5),
            y: last.y + randomNum(-5, 5)
        }
        app.options.people[index].move.push(next)
        if (length > 100) app.options.people[index].move.shift()
    });
}, 1000)