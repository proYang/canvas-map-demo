import {
    drawCircle,
    drawLine,
    drawMeasureInfo,
    drawPeopleInfo,
    calculateLength,
    directPeople
} from './utils'

const defaultOptions = {
    container: null, //创建canvas的容器，如果不填，自动在 body 上创建覆盖全屏的层
    people: [], // 人
    measure: [], // 测距记录
    backgroundImage: undefined, // 背景图
    imgScale: 1, // 默认放大倍数
    imgX: 0, // 背景图拒canvas原点X方向距离
    imgY: 0, // 背景图拒canvas原点Y方向距离
    pointerX: 0,
    pointerY: 0,
    animation: undefined,
    isMeasuring: false //正在测距
};

let isMoveMap = false // 正在拖拽移动地图

class App {
    constructor(options = {}) {
        options = Object.assign({}, defaultOptions, options);
        this.isShowPath = false; // 是否显示 运动轨迹
        this.options = options;

        this.render();
        this.loadBgImg();
        this.loadPeopleImg();
        this.drawMove();
        this.addEvent();
        this.run();
    }

    /**
     * @public
     */
    set showPath(val) {
        this.isShowPath = val
    }
    get showPath() {
        return this.isShowPath
    }

    /**
     * @public
     * @desc 开始测距
     */
    measure() {
        // this.isShowPath = val
        // 绑定测距事件
        if (this.options.isMeasuring === true) return
        this.bindMeasureEvent()
        this.options.isMeasuring = true
    }

    /**
     * @public 
     * @desc 单次重绘canvas
     * @param {*} context 
     */
    updateCanvas(context) {
        // 重绘Canvas
        switch (context) {
            case 'map':
                this.drawMap();
                break;
            case 'people':
                this.drawPeople();
                break;
            case 'move':
                this.clearCanvas(this.moveCanvas.getContext('2d'))
                this.drawMove();
                break;
            case 'measure':
                this.clearCanvas(this.measureCanvas.getContext('2d'))
                this.drawMeasure()
                break;
            case 'all':
                this.drawMap();
                this.drawPeople();
                this.clearCanvas(this.moveCanvas.getContext('2d'))
                this.drawMove();
                break;
            default:
                break;
        }
    }

    render() {
        let options = this.options;
        let container = options.container || document.createElement('div');
        if (!options.container) {
            Object.assign(container.style, {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                lineHeight: '100%',
                overflow: 'hidden',
                backgroundColor: options.bgColor
            });
            document.body.appendChild(container);
        }

        this.container = container;

        let {
            width,
            height
        } = container.getBoundingClientRect();

        //画地图的 canvas
        let mapCanvas = document.createElement('canvas');
        Object.assign(mapCanvas.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: `${width}px`,
            height: `${height}px`
        });
        mapCanvas.setAttribute('width', `${width}px`)
        mapCanvas.setAttribute('height', `${height}px`)

        //画轨迹线条的 canvas
        let moveCanvas = mapCanvas.cloneNode(true);

        //画人的 canvas
        let peopleCanvas = mapCanvas.cloneNode(true);
        // 测距 canvas
        let measureCanvas = mapCanvas.cloneNode(true);

        container.appendChild(mapCanvas);
        container.appendChild(moveCanvas);
        container.appendChild(peopleCanvas);
        container.appendChild(measureCanvas);

        this.mapCanvas = mapCanvas;
        this.moveCanvas = moveCanvas;
        this.peopleCanvas = peopleCanvas;
        this.measureCanvas = measureCanvas;
    }

    bindMeasureEvent() {
        let $container = this.container
        let clickTime = 0;
        let clickNum = 0;
        let moveNum = 0;
        let mousemoveListener = event => {
            $container.style.cursor = "pointer";
            let pos = this.windowToCanvas(this.measureCanvas, event.clientX, event.clientY);
            pos = {
                x: (pos.x - this.options.imgX) / this.options.imgScale,
                y: (pos.y - this.options.imgY) / this.options.imgScale
            }
            // 未选择第一个点，直接return
            if (clickNum === 0) return
            let moveArr = this.options.measure[this.options.measure.length - 1].move
            let lastPoint = moveArr[moveArr.length - 1]
            if (moveNum === 0) {
                moveArr.push(pos)
                moveNum = 1
            } else {
                moveArr[moveArr.length - 1] = pos
            }
        }
        let clickListener = event => {
            if (isMoveMap) return
            $container.style.cursor = "pointer";
            let currentTime = new Date().getTime()
            if (currentTime - clickTime <= 300 && currentTime - clickTime >= 150) {
                // 双击结束测距
                let moveArr = this.options.measure[this.options.measure.length - 1].move
                moveArr.pop()
                $container.removeEventListener('mousemove', mousemoveListener)
                $container.removeEventListener('click', clickListener)
                this.options.isMeasuring = false
                clickNum = 0
                clickTime = 0
            } else {
                let pos = this.windowToCanvas(this.measureCanvas, event.clientX, event.clientY);
                // 单击开始测距
                pos = {
                    x: (pos.x - this.options.imgX) / this.options.imgScale,
                    y: (pos.y - this.options.imgY) / this.options.imgScale
                }
                if (clickNum === 0) {
                    // 第一次单击
                    let obj = {
                        move: [{
                            x: pos.x,
                            y: pos.y
                        }]
                    }
                    this.options.measure.push(obj)
                    clickNum++
                } else {
                    // 多次选点
                    let index = this.options.measure.length
                    let arr = this.options.measure[index - 1].move
                    let lastPoint = arr[arr.length - 1]
                    pos = {
                        x: pos.x,
                        y: pos.y,
                    }
                    arr.push(pos)
                }

            }
            clickTime = new Date().getTime()
        }
        $container.addEventListener('click', clickListener)
        $container.addEventListener('mousemove', mousemoveListener)
    }
    addEvent() {
        let $container = this.container
        let judgeBorder = () => {
            // 边界检测
            let {
                width,
                height
            } = this.mapCanvas.getBoundingClientRect();
            if (this.options.imgX > 0) {
                this.options.imgX = 0;
            }
            if (this.options.imgY > 0) {
                this.options.imgY = 0;
            }
            if (this.options.imgY - height < -this.bgImg.height * this.options.imgScale) {
                this.options.imgY = -this.bgImg.height * this.options.imgScale + height;
            }
            if (this.options.imgX - width < -this.bgImg.width * this.options.imgScale) {
                this.options.imgX = -this.bgImg.width * this.options.imgScale + width;
            }
        }
        // 地图缩放
        $container.addEventListener('mousewheel', event => {
            let {
                width,
                height
            } = this.mapCanvas.getBoundingClientRect();
            let pos = this.windowToCanvas(this.mapCanvas, event.clientX, event.clientY);
            let wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));
            if (wheelDelta > 0) {
                // 放大
                if (this.bgImg.width * this.options.imgScale * 2 <= this.bgImg.width * 8 || this.bgImg.height * this.options.imgScale * 2 <= this.bgImg.height * 8) {
                    // 放大边界判断
                    this.options.imgScale *= 2;
                    this.options.imgX = this.options.imgX * 2 - pos.x;
                    this.options.imgY = this.options.imgY * 2 - pos.y;
                } else return
            } else {
                // 缩小
                if (this.bgImg.width * this.options.imgScale / 2 >= width || this.bgImg.height * this.options.imgScale / 2 >= height) {
                    // 缩小边界判断
                    this.options.imgScale /= 2;
                    this.options.imgX = this.options.imgX * 0.5 + pos.x * 0.5;
                    this.options.imgY = this.options.imgY * 0.5 + pos.y * 0.5;
                } else return
            }
            judgeBorder()
            this.drawMap();
            this.drawPeople();
            // 重绘测距图层
            this.clearCanvas(this.measureCanvas.getContext('2d'))
            this.drawMeasure();
            this.clearCanvas(this.moveCanvas.getContext('2d'))
            this.drawMove();

        })
        // 地图移动
        $container.addEventListener('mousedown', event => {
            let that = this
            let pos = this.windowToCanvas(this.mapCanvas, event.clientX, event.clientY);
            let mousemoveListener = event => {
                $container.style.cursor = "move";
                isMoveMap = true
                let pos1 = this.windowToCanvas(this.mapCanvas, event.clientX, event.clientY);
                let x = pos1.x - pos.x;
                let y = pos1.y - pos.y;
                pos = pos1;
                this.options.imgX += x;
                this.options.imgY += y;
                this.drawMap();
                this.drawPeople();
                // 重绘测距图层
                this.clearCanvas(this.measureCanvas.getContext('2d'))
                this.drawMeasure();
                this.clearCanvas(this.moveCanvas.getContext('2d'))
                this.drawMove();
            }
            let mouseupListener = event => {
                judgeBorder()
                // 屏蔽移动地图后触发的测距点击事件
                setTimeout(() => {
                    isMoveMap = false
                }, 200)
                this.drawMap();
                this.drawPeople();
                // 重绘测距图层
                this.clearCanvas(this.moveCanvas.getContext('2d'))
                this.drawMove();
                $container.removeEventListener('mousemove', mousemoveListener)
                $container.removeEventListener('mouseup', mouseupListener)
                $container.style.cursor = "default";
            }
            $container.addEventListener('mousemove', mousemoveListener)
            $container.addEventListener('mouseup', mouseupListener)
            $container.addEventListener('mouseleave', mouseupListener)
        })
        // 鼠标指针坐标
        $container.addEventListener('mousemove', () => {
            // 实时鼠标位置
            let {
                height
            } = this.mapCanvas.getBoundingClientRect();
            let pos = this.windowToCanvas(this.mapCanvas, event.clientX, event.clientY);
            this.options.pointerX = pos.x
            this.options.pointerY = height - pos.y


            // 鼠标移动显示人物信息

            // 转换为左下角坐标系
            pos = {
                x: (pos.x - this.options.imgX) / this.options.imgScale,
                y: height - (pos.y - this.options.imgY) / this.options.imgScale
            }
            this.options.people.forEach((person, i, people) => {
                person.showInfo = false
            })
            let index = directPeople(pos, this.options.people, 10 / this.options.imgScale)
            if (index === undefined) return
            this.options.people[index].showInfo = true
        })
    }

    windowToCanvas(canvas, x, y) {
        let bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left - (bbox.width - canvas.width) / 2,
            y: y - bbox.top - (bbox.height - canvas.height) / 2
        };
    }

    loadBgImg() {
        let img = new Image();
        img.src = this.options.backgroundImage;
        this.bgImg = img
        img.addEventListener('load', () => {
            this.drawMap()
        })
    }
    loadPeopleImg() {
        let imgArr
        if (typeof this.options.peopleImage === 'string') {
            imgArr = [this.options.peopleImage]
        } else if (Array.isArray(this.options.peopleImage)) {
            imgArr = this.options.peopleImage
        } else throw 'Type [options.peopleImage] can not support'
        let loadNum = 0;
        let peopleImage = imgArr.map((src) => {
            let img = new Image();
            img.src = src;
            img.addEventListener('load', () => {
                loadNum++
                if (loadNum === imgArr.length) {
                    this.drawPeople()
                }
            })
            return img
        })
        this.peopleImage = peopleImage
    }
    /**
     * @desc 画背景地图
     */
    drawMap() {
        let imgScale = this.options.imgScale;
        let imgX = this.options.imgX;
        let imgY = this.options.imgY;
        let img = this.bgImg;
        let canvas = this.mapCanvas;
        let context = this.mapCanvas.getContext('2d');
        this.clearCanvas(context)
        context.drawImage(img, 0, 0, img.width, img.height, imgX, imgY, img.width * imgScale, img.height * imgScale);
    }

    drawMove() {
        if (this.isShowPath !== true) return
        //画移动轨迹
        let context = this.moveCanvas.getContext('2d');
        let {
            height
        } = this.mapCanvas.getBoundingClientRect();
        this.options.people.forEach(({
            move,
            color
        }) => {
            let current, last;
            if (move.length === 0) return
            for (let index in move) {
                current = move[index];
                if (index === '0') {
                    last = move[index]
                } else {
                    last = move[--index]
                }
                if (!color) 'red'
                // 切换左下角为坐标原点
                last = {
                    x: last.x * this.options.imgScale + this.options.imgX,
                    y: (height - last.y) * this.options.imgScale + this.options.imgY
                }
                current = {
                    x: current.x * this.options.imgScale + this.options.imgX,
                    y: (height - current.y) * this.options.imgScale + this.options.imgY
                }
                drawLine(context, color, last.x, last.y, current.x, current.y, 1)
            }
        });
    }

    drawPeople() {
        let {
            options,
            peopleCanvas,
            peopleImage
        } = this;

        let peopleImgWidth = 16;
        let peopleImgHeight = 18;
        let context = peopleCanvas.getContext('2d');
        let {
            height
        } = this.mapCanvas.getBoundingClientRect();
        this.clearCanvas(context);
        options.people.forEach(({
            move,
            name,
            id,
            imgIndex,
            showInfo
        }) => {
            if (move.length === 0) return
            let position = move[move.length - 1]
            // 切换左下角为坐标原点
            position = {
                x: position.x * options.imgScale + this.options.imgX - peopleImgWidth / 2,
                y: (height - position.y) * options.imgScale + this.options.imgY - peopleImgHeight / 2
            }
            if (showInfo) {
                drawPeopleInfo(context, position.x, position.y, {
                    name,
                    id
                })
            }
            context.drawImage(peopleImage[imgIndex], position.x, position.y, peopleImgWidth, peopleImgHeight);
        });
    }

    drawMeasure() {
        // 画测距轨迹
        let {
            height
        } = this.mapCanvas.getBoundingClientRect();
        let {
            options,
            measureCanvas,
        } = this;
        //画移动轨迹
        let context = this.measureCanvas.getContext('2d');
        this.options.measure.forEach(({
            move
        }) => {
            let current, last, totalLength = 0;
            for (let index in move) {
                current = move[index];
                if (index === '0') {
                    last = move[index]
                } else {
                    last = move[--index]
                }
                last = {
                    x: last.x * this.options.imgScale + this.options.imgX,
                    y: last.y * this.options.imgScale + this.options.imgY
                }
                current = {
                    x: current.x * this.options.imgScale + this.options.imgX,
                    y: current.y * this.options.imgScale + this.options.imgY
                }
                drawLine(context, '#ff6922', last.x, last.y, current.x, current.y, 2)
                drawCircle(context, '#ff6922', current.x, current.y, 5)
                let text = ''
                if (index === '0') {
                    // 起点
                    text = '起点'
                } else {
                    totalLength = totalLength + calculateLength(last.x, last.y, current.x, current.y)
                    text = `${(totalLength/this.options.imgScale).toFixed(2)} m`
                }
                drawMeasureInfo(context, current.x, current.y, text)
            }
        });
    }
    /**
     * @private
     * @desc 清除{context}画布
     * @param {*} context 
     */
    clearCanvas(context) {
        let {
            mapCanvas,
            moveCanvas,
            peopleCanvas,
            measureCanvas
        } = this
        let {
            width,
            height
        } = this.mapCanvas.getBoundingClientRect();
        if (context) {
            context.clearRect(0, 0, width, height);
        } else {
            mapCanvas.clearRect(0, 0, width, height);
            moveCanvas.clearRect(0, 0, width, height);
            peopleCanvas.clearRect(0, 0, width, height);
            measureCanvas.clearRect(0, 0, width, height);
        }
    }
    run() {
        // 动画
        if (this.options.animation) return
        let step = () => {
            this.updateCanvas('people')
            this.updateCanvas('move')
            // 更新 测距图层
            this.updateCanvas('measure')
            this.options.animation = requestAnimationFrame(step)
        }
        this.options.animation = requestAnimationFrame(step)
    }
}

export default App