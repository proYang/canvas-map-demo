//画线段
function drawLine(ctx, color, x1, y1, x2, y2) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

const defaultOptions = {
    container: null, //创建canvas的容器，如果不填，自动在 body 上创建覆盖全屏的层
    people: [], // 人
    backgroundImage: undefined, // 背景图
    imgScale: 1,
    imgX: 0,
    imgY: 0
};

class App {
    constructor(options = {}) {
        options = Object.assign({}, defaultOptions, options);
        this.isShowPath = false; // 是否显示 运动轨迹
        this.options = options;

        this.render();
        this.loadBgImg();
        this.loadPeopleImg();
        if (this.isShowPath) this.drawMove();
        this.addEvent();

    }

    set showPath(val) {
        this.isShowPath = val
    }

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
                if (this.isShowPath) this.drawMove();
                break;
            case 'all':
                this.drawMap();
                this.drawPeople();
                this.clearCanvas(this.moveCanvas.getContext('2d'))
                if (this.isShowPath) this.drawMove();
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

        container.appendChild(mapCanvas);
        container.appendChild(moveCanvas);
        container.appendChild(peopleCanvas);

        this.mapCanvas = mapCanvas;
        this.moveCanvas = moveCanvas;
        this.peopleCanvas = peopleCanvas;
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
            this.clearCanvas(this.moveCanvas.getContext('2d'))
            if (this.isShowPath) this.drawMove();

        })
        // 地图移动
        $container.addEventListener('mousedown', event => {
            let that = this
            let pos = this.windowToCanvas(this.mapCanvas, event.clientX, event.clientY);
            let mousemoveListener = event => {
                $container.style.cursor = "move";
                let pos1 = this.windowToCanvas(this.mapCanvas, event.clientX, event.clientY);
                let x = pos1.x - pos.x;
                let y = pos1.y - pos.y;
                pos = pos1;
                this.options.imgX += x;
                this.options.imgY += y;
                this.drawMap();
                this.drawPeople();
                this.clearCanvas(this.moveCanvas.getContext('2d'))
                if (this.isShowPath) this.drawMove();
            }
            let mouseupListener = event => {
                judgeBorder()
                this.drawMap();
                this.drawPeople();
                this.clearCanvas(this.moveCanvas.getContext('2d'))
                if (this.isShowPath) this.drawMove();
                $container.removeEventListener('mousemove', mousemoveListener)
                $container.removeEventListener('mouseup', mouseupListener)
                $container.style.cursor = "default";
            }
            $container.addEventListener('mousemove', mousemoveListener)
            $container.addEventListener('mouseup', mouseupListener)
            $container.addEventListener('mouseleave', mouseupListener)
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
        let img = new Image();
        img.src = this.options.peopleImage;
        this.peopleImage = img
        img.addEventListener('load', () => {
            this.drawPeople()
        })
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
        //画移动轨迹
        let context = this.moveCanvas.getContext('2d');
        this.options.people.forEach(({
            move,
            color
        }) => {
            let current, last;
            for (let index in move) {
                current = move[index];
                if (index === '0') {
                    last = move[index]
                } else {
                    last = move[--index]
                }
                if (!color) 'red'
                drawLine(context, color, last.x * this.options.imgScale + this.options.imgX, last.y * this.options.imgScale + this.options.imgY, current.x * this.options.imgScale + this.options.imgX, current.y * this.options.imgScale + this.options.imgY)
            }
        });
    }

    drawPeople() {
        let {
            options,
            peopleCanvas,
            peopleImage
        } = this
        let context = peopleCanvas.getContext('2d');
        this.clearCanvas(context);
        options.people.forEach(({
            move
        }) => {
            // let position = {
            //     x,
            //     y
            // }
            let position = move[move.length - 1]
            context.drawImage(peopleImage, position.x * options.imgScale - 16 + this.options.imgX, position.y * options.imgScale - 16 + this.options.imgY, 30, 43);
            // context.drawImage(peopleImage, 0, 0, peopleImage.width * options.imgScale, peopleImage.height * options.imgScale, person.x * options.imgScale, person.y * options.imgScale, peopleImage.width * options.imgScale, peopleImage.height * options.imgScale);
        });
    }
    /**
     * @desc 清除{context}画布
     * @param {*} context 
     */
    clearCanvas(context) {
        let {
            mapCanvas,
            moveCanvas,
            peopleCanvas
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
        }
    }
}

export default App