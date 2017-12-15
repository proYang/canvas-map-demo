(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bundle"] = factory();
	else
		root["bundle"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(2);
var ctx = __webpack_require__(16);
var hide = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(19);
var IE8_DOM_DEFINE = __webpack_require__(20);
var toPrimitive = __webpack_require__(22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(0) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(8);
var defined = __webpack_require__(9);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _draw = __webpack_require__(12);

var _draw2 = _interopRequireDefault(_draw);

var _outils = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $app = document.querySelector('#app');
var $bg = document.querySelector('#bg');
var $people = document.querySelector('#people');

var options = {
    container: $app,
    people: [],
    backgroundImage: $bg.getAttribute('src'),
    peopleImage: $people.getAttribute('src')
};
var app = new _draw2.default(options);

// 添加机器人
document.querySelector('.J_add').addEventListener('click', function () {
    var _$app$getBoundingClie = $app.getBoundingClientRect(),
        width = _$app$getBoundingClie.width,
        height = _$app$getBoundingClie.height;

    var x = (0, _outils.randomNum)(0, width);
    var y = (0, _outils.randomNum)(0, height);
    options.people.push({
        name: 'yxl',
        color: (0, _outils.randomColor)(),
        move: [{
            x: x,
            y: y
        }]
    });
    // 重绘轨迹，人
    app.updateCanvas('people');
    app.updateCanvas('move');
});

// 是否展示运动轨迹
app.showPath = true;
document.querySelector('.J_show').addEventListener('click', function () {
    app.showPath = true;
    app.updateCanvas('move');
});
document.querySelector('.J_hidden').addEventListener('click', function () {
    app.showPath = false;
    app.updateCanvas('move');
});

// 比例尺
var $ruler = document.querySelector('.J_ruler');
$ruler.innerHTML = 'x' + app.options.imgScale + ' \u500D';
$app.addEventListener('mousewheel', function () {
    $ruler.innerHTML = 'x' + app.options.imgScale + ' \u500D';
});

// 鼠标坐标
var $pointerX = document.querySelector('.J_pointer-x');
var $pointerY = document.querySelector('.J_pointer-y');
$app.addEventListener('mousemove', function () {
    $pointerX.innerHTML = 'X:' + app.options.pointerX;
    $pointerY.innerHTML = 'Y:' + app.options.pointerY;
});

var $measure = document.querySelector('.J_measure');
$measure.addEventListener('click', function () {
    app.measure();
});
var $measureCancel = document.querySelector('.J_measure-cancel');
$measureCancel.addEventListener('click', function () {
    app.options.measure = [];
    app.updateCanvas('measure');
});

// 数据模拟器
var mockServer1 = setInterval(function () {
    app.options.people.forEach(function (person, index) {
        var length = person.move.length;
        var last = person.move[--length];
        var next = {
            x: last.x + (0, _outils.randomNum)(-10, 10),
            y: last.y + (0, _outils.randomNum)(-10, 10)
        };
        app.options.people[index].move.push(next);
    });
}, 500);
var mockServer2 = setInterval(function () {
    app.options.people.forEach(function (person, index) {
        var length = person.move.length;
        var last = person.move[--length];
        var next = {
            x: last.x + (0, _outils.randomNum)(-10, 10),
            y: last.y + (0, _outils.randomNum)(-10, 10)
        };
        app.options.people[index].move.push(next);
    });
}, 300);
var mockServer3 = setInterval(function () {
    app.options.people.forEach(function (person, index) {
        var length = person.move.length;
        var last = person.move[--length];
        var next = {
            x: last.x + (0, _outils.randomNum)(-10, 10),
            y: last.y + (0, _outils.randomNum)(-10, 10)
        };
        app.options.people[index].move.push(next);
    });
}, 1000);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(13);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(39);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(40);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//画线段
function drawLine(ctx, color, x1, y1, x2, y2, scale) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
//画空心圆
function drawCircle(ctx, color, x, y, radius, scale) {
    //画一个空心圆
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 360, false);
    ctx.fillStyle = "#fff"; //填充颜色,默认是黑色
    ctx.fill(); //画实心圆
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke(); //画空心圆
    ctx.closePath();
}

function drawText(ctx, x, y, text) {
    ctx.font = '14px Arial';
    ctx.fillStyle = '#0099CC';
    ctx.fillText(text, x + 5, y - 8);
}
// 勾股定理算距离
function calculateLength(x1, y1, x2, y2) {
    var x = x1 - x2;
    var y = y1 - y2;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

var defaultOptions = {
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

var App = function () {
    function App() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, App);

        options = (0, _assign2.default)({}, defaultOptions, options);
        this.isShowPath = false; // 是否显示 运动轨迹
        this.options = options;

        this.render();
        this.loadBgImg();
        this.loadPeopleImg();
        if (this.isShowPath) this.drawMove();
        this.addEvent();
        this.run();
    }

    /**
     * @public
     */


    (0, _createClass3.default)(App, [{
        key: 'measure',


        /**
         * @public
         * @desc 开始测距
         */
        value: function measure() {
            // this.isShowPath = val
            // 绑定测距事件
            if (this.options.isMeasuring === true) return;
            this.bindMeasureEvent();
            this.options.isMeasuring = true;
        }

        /**
         * @public 
         * @desc 单次重绘canvas
         * @param {*} context 
         */

    }, {
        key: 'updateCanvas',
        value: function updateCanvas(context) {
            // 重绘Canvas
            switch (context) {
                case 'map':
                    this.drawMap();
                    break;
                case 'people':
                    this.drawPeople();
                    break;
                case 'move':
                    this.clearCanvas(this.moveCanvas.getContext('2d'));
                    if (this.isShowPath) this.drawMove();
                    break;
                case 'measure':
                    this.clearCanvas(this.measureCanvas.getContext('2d'));
                    this.drawMeasure();
                    break;
                case 'all':
                    this.drawMap();
                    this.drawPeople();
                    this.clearCanvas(this.moveCanvas.getContext('2d'));
                    if (this.isShowPath) this.drawMove();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var options = this.options;
            var container = options.container || document.createElement('div');
            if (!options.container) {
                (0, _assign2.default)(container.style, {
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

            var _container$getBoundin = container.getBoundingClientRect(),
                width = _container$getBoundin.width,
                height = _container$getBoundin.height;

            //画地图的 canvas


            var mapCanvas = document.createElement('canvas');
            (0, _assign2.default)(mapCanvas.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: width + 'px',
                height: height + 'px'
            });
            mapCanvas.setAttribute('width', width + 'px');
            mapCanvas.setAttribute('height', height + 'px');

            //画轨迹线条的 canvas
            var moveCanvas = mapCanvas.cloneNode(true);

            //画人的 canvas
            var peopleCanvas = mapCanvas.cloneNode(true);
            // 测距 canvas
            var measureCanvas = mapCanvas.cloneNode(true);

            container.appendChild(mapCanvas);
            container.appendChild(moveCanvas);
            container.appendChild(peopleCanvas);
            container.appendChild(measureCanvas);

            this.mapCanvas = mapCanvas;
            this.moveCanvas = moveCanvas;
            this.peopleCanvas = peopleCanvas;
            this.measureCanvas = measureCanvas;
        }
    }, {
        key: 'bindMeasureEvent',
        value: function bindMeasureEvent() {
            var _this = this;

            var $container = this.container;
            var clickTime = 0;
            var clickNum = 0;
            var moveNum = 0;
            var mousemoveListener = function mousemoveListener(event) {
                $container.style.cursor = "pointer";
                var pos = _this.windowToCanvas(_this.measureCanvas, event.clientX, event.clientY);
                // console.log(pos)
                // drawCircle(this.measureCanvas.getContext('2d'), '#ff6922', pos.x, pos.y, 5)
                // 未选择第一个点，直接return
                if (clickNum === 0) return;
                var pointer = _this.options.measure[_this.options.measure.length - 1].pointer;
                var moveArr = _this.options.measure[_this.options.measure.length - 1].move;
                var lastPoint = moveArr[moveArr.length - 1];
                (0, _assign2.default)(pointer, pos);
                pos = {
                    x: pos.x,
                    y: pos.y
                };
                if (moveNum === 0) {
                    moveArr.push(pos);
                    moveNum = 1;
                } else {
                    moveArr[moveArr.length - 1] = pos;
                }
            };
            var clickListener = function clickListener(event) {
                $container.style.cursor = "pointer";
                var currentTime = new Date().getTime();
                if (currentTime - clickTime <= 300 && currentTime - clickTime >= 150) {
                    // 双击结束测距
                    var moveArr = _this.options.measure[_this.options.measure.length - 1].move;
                    moveArr.pop();
                    console.log(_this.options.measure);
                    $container.removeEventListener('mousemove', mousemoveListener);
                    $container.removeEventListener('click', clickListener);
                    _this.options.isMeasuring = false;
                    clickNum === 0;
                    clickTime = 0;
                } else {
                    var pos = _this.windowToCanvas(_this.measureCanvas, event.clientX, event.clientY);
                    // 单击开始测距
                    // drawCircle(this.measureCanvas.getContext('2d'), '#ff6922', pos.x, pos.y, 5)
                    // console.log(pos)
                    // console.log(pos.x * this.options.imgScale + this.options.imgX, pos.y * this.options.imgScale + this.options.imgY)
                    if (clickNum === 0) {
                        // 第一次单击
                        var obj = {
                            pointer: {
                                x: pos.x,
                                y: pos.y
                            },
                            move: [{
                                x: pos.x,
                                y: pos.y
                            }]
                        };
                        _this.options.measure.push(obj);
                        clickNum++;
                    } else {
                        // 多次选点
                        var index = _this.options.measure.length;
                        var pointer = _this.options.measure[index - 1].pointer;
                        var arr = _this.options.measure[index - 1].move;
                        // debugger
                        var lastPoint = arr[arr.length - 1];
                        pos = {
                            x: pos.x,
                            y: pos.y
                        };
                        (0, _assign2.default)(pointer, pos);
                        arr.push(pos);
                    }
                }
                clickTime = new Date().getTime();
            };
            $container.addEventListener('click', clickListener);
            $container.addEventListener('mousemove', mousemoveListener);
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            var _this2 = this;

            var $container = this.container;
            var judgeBorder = function judgeBorder() {
                // 边界检测
                var _mapCanvas$getBoundin = _this2.mapCanvas.getBoundingClientRect(),
                    width = _mapCanvas$getBoundin.width,
                    height = _mapCanvas$getBoundin.height;

                if (_this2.options.imgX > 0) {
                    _this2.options.imgX = 0;
                }
                if (_this2.options.imgY > 0) {
                    _this2.options.imgY = 0;
                }
                if (_this2.options.imgY - height < -_this2.bgImg.height * _this2.options.imgScale) {
                    _this2.options.imgY = -_this2.bgImg.height * _this2.options.imgScale + height;
                }
                if (_this2.options.imgX - width < -_this2.bgImg.width * _this2.options.imgScale) {
                    _this2.options.imgX = -_this2.bgImg.width * _this2.options.imgScale + width;
                }
            };
            // 地图缩放
            $container.addEventListener('mousewheel', function (event) {
                var _mapCanvas$getBoundin2 = _this2.mapCanvas.getBoundingClientRect(),
                    width = _mapCanvas$getBoundin2.width,
                    height = _mapCanvas$getBoundin2.height;

                var pos = _this2.windowToCanvas(_this2.mapCanvas, event.clientX, event.clientY);
                var wheelDelta = event.wheelDelta ? event.wheelDelta : event.deltaY * -40;
                if (wheelDelta > 0) {
                    // 放大
                    if (_this2.bgImg.width * _this2.options.imgScale * 2 <= _this2.bgImg.width * 8 || _this2.bgImg.height * _this2.options.imgScale * 2 <= _this2.bgImg.height * 8) {
                        // 放大边界判断
                        _this2.options.imgScale *= 2;
                        _this2.options.imgX = _this2.options.imgX * 2 - pos.x;
                        _this2.options.imgY = _this2.options.imgY * 2 - pos.y;
                    } else return;
                } else {
                    // 缩小
                    if (_this2.bgImg.width * _this2.options.imgScale / 2 >= width || _this2.bgImg.height * _this2.options.imgScale / 2 >= height) {
                        // 缩小边界判断
                        _this2.options.imgScale /= 2;
                        _this2.options.imgX = _this2.options.imgX * 0.5 + pos.x * 0.5;
                        _this2.options.imgY = _this2.options.imgY * 0.5 + pos.y * 0.5;
                    } else return;
                }
                judgeBorder();
                _this2.drawMap();
                _this2.drawPeople();
                // 重绘测距图层
                _this2.clearCanvas(_this2.measureCanvas.getContext('2d'));
                _this2.drawMeasure();
                _this2.clearCanvas(_this2.moveCanvas.getContext('2d'));
                if (_this2.isShowPath) _this2.drawMove();
            });
            // 地图移动
            $container.addEventListener('mousedown', function (event) {
                var that = _this2;
                var pos = _this2.windowToCanvas(_this2.mapCanvas, event.clientX, event.clientY);
                var mousemoveListener = function mousemoveListener(event) {
                    $container.style.cursor = "move";
                    var pos1 = _this2.windowToCanvas(_this2.mapCanvas, event.clientX, event.clientY);
                    var x = pos1.x - pos.x;
                    var y = pos1.y - pos.y;
                    pos = pos1;
                    _this2.options.imgX += x;
                    _this2.options.imgY += y;
                    _this2.drawMap();
                    _this2.drawPeople();
                    // 重绘测距图层
                    _this2.clearCanvas(_this2.measureCanvas.getContext('2d'));
                    _this2.drawMeasure();
                    _this2.clearCanvas(_this2.moveCanvas.getContext('2d'));
                    if (_this2.isShowPath) _this2.drawMove();
                };
                var mouseupListener = function mouseupListener(event) {
                    judgeBorder();
                    _this2.drawMap();
                    _this2.drawPeople();
                    // 重绘测距图层
                    _this2.clearCanvas(_this2.moveCanvas.getContext('2d'));
                    if (_this2.isShowPath) _this2.drawMove();
                    $container.removeEventListener('mousemove', mousemoveListener);
                    $container.removeEventListener('mouseup', mouseupListener);
                    $container.style.cursor = "default";
                };
                $container.addEventListener('mousemove', mousemoveListener);
                $container.addEventListener('mouseup', mouseupListener);
                $container.addEventListener('mouseleave', mouseupListener);
            });
            // 鼠标指针坐标
            $container.addEventListener('mousemove', function () {
                var _mapCanvas$getBoundin3 = _this2.mapCanvas.getBoundingClientRect(),
                    height = _mapCanvas$getBoundin3.height;

                var pos = _this2.windowToCanvas(_this2.mapCanvas, event.clientX, event.clientY);
                _this2.options.pointerX = pos.x;
                _this2.options.pointerY = height - pos.y;
            });
        }
    }, {
        key: 'windowToCanvas',
        value: function windowToCanvas(canvas, x, y) {
            var bbox = canvas.getBoundingClientRect();
            return {
                x: x - bbox.left - (bbox.width - canvas.width) / 2,
                y: y - bbox.top - (bbox.height - canvas.height) / 2
            };
        }
    }, {
        key: 'loadBgImg',
        value: function loadBgImg() {
            var _this3 = this;

            var img = new Image();
            img.src = this.options.backgroundImage;
            this.bgImg = img;
            img.addEventListener('load', function () {
                _this3.drawMap();
            });
        }
    }, {
        key: 'loadPeopleImg',
        value: function loadPeopleImg() {
            var _this4 = this;

            var img = new Image();
            img.src = this.options.peopleImage;
            this.peopleImage = img;
            img.addEventListener('load', function () {
                _this4.drawPeople();
            });
        }
        /**
         * @desc 画背景地图
         */

    }, {
        key: 'drawMap',
        value: function drawMap() {
            var imgScale = this.options.imgScale;
            var imgX = this.options.imgX;
            var imgY = this.options.imgY;
            var img = this.bgImg;
            var canvas = this.mapCanvas;
            var context = this.mapCanvas.getContext('2d');
            this.clearCanvas(context);
            context.drawImage(img, 0, 0, img.width, img.height, imgX, imgY, img.width * imgScale, img.height * imgScale);
        }
    }, {
        key: 'drawMove',
        value: function drawMove() {
            var _this5 = this;

            //画移动轨迹
            var context = this.moveCanvas.getContext('2d');

            var _mapCanvas$getBoundin4 = this.mapCanvas.getBoundingClientRect(),
                height = _mapCanvas$getBoundin4.height;

            this.options.people.forEach(function (_ref) {
                var move = _ref.move,
                    color = _ref.color;

                var current = void 0,
                    last = void 0;
                for (var index in move) {
                    current = move[index];
                    if (index === '0') {
                        last = move[index];
                    } else {
                        last = move[--index];
                    }
                    if (!color) 'red';
                    // 切换左下角为坐标原点
                    last = {
                        x: last.x * _this5.options.imgScale + _this5.options.imgX,
                        y: (height - last.y) * _this5.options.imgScale + _this5.options.imgY
                    };
                    current = {
                        x: current.x * _this5.options.imgScale + _this5.options.imgX,
                        y: (height - current.y) * _this5.options.imgScale + _this5.options.imgY
                    };
                    drawLine(context, color, last.x, last.y, current.x, current.y, 1);
                }
            });
        }
    }, {
        key: 'drawPeople',
        value: function drawPeople() {
            var _this6 = this;

            var options = this.options,
                peopleCanvas = this.peopleCanvas,
                peopleImage = this.peopleImage;

            var peopleImgWidth = 30;
            var peopleImgHeight = 43;
            var context = peopleCanvas.getContext('2d');

            var _mapCanvas$getBoundin5 = this.mapCanvas.getBoundingClientRect(),
                height = _mapCanvas$getBoundin5.height;

            this.clearCanvas(context);
            options.people.forEach(function (_ref2) {
                var move = _ref2.move;

                var position = move[move.length - 1];
                // 切换左下角为坐标原点
                position = {
                    x: position.x * options.imgScale + _this6.options.imgX - peopleImgWidth / 2,
                    y: (height - position.y) * options.imgScale + _this6.options.imgY - peopleImgHeight / 2
                };
                context.drawImage(peopleImage, position.x, position.y, peopleImgWidth, peopleImgHeight);
            });
        }
    }, {
        key: 'drawMeasure',
        value: function drawMeasure() {
            var _this7 = this;

            // 画测距轨迹
            var _mapCanvas$getBoundin6 = this.mapCanvas.getBoundingClientRect(),
                height = _mapCanvas$getBoundin6.height;

            var options = this.options,
                measureCanvas = this.measureCanvas;
            //画移动轨迹

            var context = this.measureCanvas.getContext('2d');
            this.options.measure.forEach(function (_ref3) {
                var move = _ref3.move;

                var current = void 0,
                    last = void 0,
                    totalLength = 0;
                for (var index in move) {
                    current = move[index];
                    if (index === '0') {
                        last = move[index];
                    } else {
                        last = move[--index];
                    }
                    last = {
                        x: last.x * _this7.options.imgScale + _this7.options.imgX,
                        y: last.y * _this7.options.imgScale + _this7.options.imgY
                        // // if (index === `${move.length-1}` && index !== '0') {
                    };current = {
                        x: current.x * _this7.options.imgScale + _this7.options.imgX,
                        y: current.y * _this7.options.imgScale + _this7.options.imgY
                        // }
                    };drawLine(context, '#ff6922', last.x, last.y, current.x, current.y);
                    drawCircle(context, '#ff6922', current.x, current.y, 5);
                    var text = '';
                    if (index === '0') {
                        // 起点
                        text = '起点';
                    } else {
                        totalLength = totalLength + calculateLength(last.x, last.y, current.x, current.y);
                        text = (totalLength / _this7.options.imgScale).toFixed(2) + ' m';
                    }
                    drawText(context, current.x, current.y, text);
                }
            });
        }
        /**
         * @private
         * @desc 清除{context}画布
         * @param {*} context 
         */

    }, {
        key: 'clearCanvas',
        value: function clearCanvas(context) {
            var mapCanvas = this.mapCanvas,
                moveCanvas = this.moveCanvas,
                peopleCanvas = this.peopleCanvas,
                measureCanvas = this.measureCanvas;

            var _mapCanvas$getBoundin7 = this.mapCanvas.getBoundingClientRect(),
                width = _mapCanvas$getBoundin7.width,
                height = _mapCanvas$getBoundin7.height;

            if (context) {
                context.clearRect(0, 0, width, height);
            } else {
                mapCanvas.clearRect(0, 0, width, height);
                moveCanvas.clearRect(0, 0, width, height);
                peopleCanvas.clearRect(0, 0, width, height);
                measureCanvas.clearRect(0, 0, width, height);
            }
        }
    }, {
        key: 'run',
        value: function run() {
            var _this8 = this;

            // 动画
            if (this.options.animation) return;
            var step = function step() {
                _this8.updateCanvas('people');
                _this8.updateCanvas('move');
                // 更新 测距图层
                _this8.updateCanvas('measure');
                _this8.options.animation = requestAnimationFrame(step);
            };
            this.options.animation = requestAnimationFrame(step);
        }
    }, {
        key: 'showPath',
        set: function set(val) {
            this.isShowPath = val;
        }
    }]);
    return App;
}();

exports.default = App;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(24) });


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(17);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(23);
module.exports = __webpack_require__(0) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(0) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(21)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(25);
var gOPS = __webpack_require__(36);
var pIE = __webpack_require__(37);
var toObject = __webpack_require__(38);
var IObject = __webpack_require__(8);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(26);
var enumBugKeys = __webpack_require__(35);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(27);
var toIObject = __webpack_require__(7);
var arrayIndexOf = __webpack_require__(29)(false);
var IE_PROTO = __webpack_require__(32)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7);
var toLength = __webpack_require__(30);
var toAbsoluteIndex = __webpack_require__(31);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(10);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(10);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(33)('keys');
var uid = __webpack_require__(34);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(41);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(0), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.outils=t():e.outils=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t){function n(e,t){return new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)}e.exports=n},function(e,t){function n(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=e+"="+t+";expires="+o}e.exports=n},function(e,t){function n(){return document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop}e.exports=n},function(e,t){function n(e){return window.scrollTo(0,e),e}e.exports=n},function(e,t){e.exports=function(e,t,n,o){function r(){function r(){a=Number(new Date),n.apply(f,s)}function u(){i=void 0}var f=this,c=Number(new Date)-a,s=arguments;o&&!i&&r(),i&&clearTimeout(i),void 0===o&&c>e?r():!0!==t&&(i=setTimeout(o?u:r,void 0===o?e-c:e))}var i,a=0;return"boolean"!=typeof t&&(o=n,n=t,t=void 0),r}},function(e,t,n){var o=n(6),r=n(7),i=n(0),a=n(8),u=n(9),f=n(10),c=n(1),s=n(11),p=n(12),d=n(2),l=n(13),m=n(14),v=n(3),w=n(15),g=n(16),y=n(4),h=n(17),x=n(18),b=n(19),C=n(20),N=n(21),S=n(22),M=n(23),E=n(24),F=n(25),D=n(26),I=n(27),T=n(28),k=n(29),R=n(30),A=n(31);e.exports={arrayEqual:o,addClass:r,hasClass:i,removeClass:a,getCookie:u,removeCookie:f,setCookie:c,getOS:s,getExplore:p,getScrollTop:d,offset:l,scrollTo:m,setScrollTop:v,windowResize:w,debounce:g,throttle:y,getKeyName:h,deepClone:x,isEmptyObject:b,randomColor:C,randomNum:N,isEmail:S,isIdCard:M,isPhoneNum:E,isUrl:F,digitUppercase:D,isSupportWebP:I,formatPassTime:T,formatRemainTime:k,parseQueryString:R,stringfyQueryString:A}},function(e,t){function n(e,t){if(e===t)return!0;if(e.length!=t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}e.exports=n},function(e,t,n){function o(e,t){r(e,t)||(e.className+=" "+t)}var r=n(0);e.exports=o},function(e,t,n){function o(e,t){if(r(e,t)){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ")}}var r=n(0);e.exports=o},function(e,t){function n(e){for(var t=document.cookie.replace(/\s/g,"").split(";"),n=0;n<t.length;n++){var o=t[n].split("=");if(o[0]==e)return decodeURIComponent(o[1])}return""}e.exports=n},function(e,t,n){function o(e){r(e,"1",-1)}var r=n(1);e.exports=o},function(e,t){function n(){var e="navigator"in window&&"userAgent"in navigator&&navigator.userAgent.toLowerCase()||"",t=("navigator"in window&&"vendor"in navigator&&navigator.vendor.toLowerCase(),"navigator"in window&&"appVersion"in navigator&&navigator.appVersion.toLowerCase()||"");return/mac/i.test(t)?"MacOSX":/win/i.test(t)?"windows":/linux/i.test(t)?"linux":(/iphone/i.test(e)||/ipad/i.test(e)||/ipod/i.test(e),/android/i.test(e)?"android":/win/i.test(t)&&/phone/i.test(e)?"windowsPhone":void 0)}e.exports=n},function(e,t){function n(){var e,t={},n=navigator.userAgent.toLowerCase();return(e=n.match(/rv:([\d.]+)\) like gecko/))?t.ie=e[1]:(e=n.match(/msie ([\d\.]+)/))?t.ie=e[1]:(e=n.match(/edge\/([\d\.]+)/))?t.edge=e[1]:(e=n.match(/firefox\/([\d\.]+)/))?t.firefox=e[1]:(e=n.match(/(?:opera|opr).([\d\.]+)/))?t.opera=e[1]:(e=n.match(/chrome\/([\d\.]+)/))?t.chrome=e[1]:(e=n.match(/version\/([\d\.]+).*safari/))&&(t.safari=e[1]),t.ie?"IE: "+t.ie:t.edge?"EDGE: "+t.edge:t.firefox?"Firefox: "+t.firefox:t.chrome?"Chrome: "+t.chrome:t.opera?"Opera: "+t.opera:t.safari?"Safari: "+t.safari:"Unkonwn"}e.exports=n},function(e,t){function n(e){for(var t={left:0,top:0};e;)t.left+=e.offsetLeft,t.top+=e.offsetTop,e=e.offsetParent;return t}e.exports=n},function(e,t,n){function o(e,t){if(t<0)return void i(e);var n=e-r();if(0!==n){var a=n/t*10;requestAnimationFrame(function(){if(Math.abs(a)>Math.abs(n))return void i(r()+n);i(r()+a),n>0&&r()>=e||n<0&&r()<=e||o(e,t-16)})}}var r=n(2),i=n(3);!function(){window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}();e.exports=o},function(e,t){function n(e,t){var n=window.innerHeight;e="function"==typeof e?e:function(){},t="function"==typeof t?t:function(){},window.addEventListener("resize",function(){var o=window.innerHeight;o===n&&e(),o<n&&t()})}e.exports=n},function(e,t,n){function o(e,t,n){return void 0===n?r(e,t,!1):r(e,n,!1!==t)}var r=n(4);e.exports=o},function(e,t){function n(e){return o[e]?o[e]:(console.log("Unknow Key(Key Code:"+e+")"),"")}var o={8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"Caps Lock",27:"Escape",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",42:"Print Screen",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"};e.exports=n},function(e,t){function n(e){var t;if(null==e||"object"!=(void 0===e?"undefined":o(e)))return e;if(e instanceof Date)return t=new Date,t.setTime(e.getTime()),t;if(e instanceof Array){t=[];for(var r=0,i=e.length;r<i;r++)t[r]=n(e[r]);return t}if(e instanceof Object){t={};for(var a in e)e.hasOwnProperty(a)&&(t[a]=n(e[a]));return t}throw new Error("Unable to copy values! Its type isn't supported.")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=n},function(e,t){function n(e){return!(!e||"object"!==(void 0===e?"undefined":o(e))||Array.isArray(e))&&!Object.keys(e).length}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=n},function(e,t){function n(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)}e.exports=n},function(e,t){function n(e,t){return Math.floor(Math.random()*(t-e+1))+e}e.exports=n},function(e,t){function n(e){return/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(e)}e.exports=n},function(e,t){function n(e){return/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(e)}e.exports=n},function(e,t){function n(e){return/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e)}e.exports=n},function(e,t){function n(e){return/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i.test(e)}e.exports=n},function(e,t){function n(e){var t=["角","分"],n=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],o=[["元","万","亿"],["","拾","佰","仟"]],r=e<0?"欠":"";e=Math.abs(e);for(var i="",a=0;a<t.length;a++)i+=(n[Math.floor(10*e*Math.pow(10,a))%10]+t[a]).replace(/零./,"");i=i||"整",e=Math.floor(e);for(var a=0;a<o[0].length&&e>0;a++){for(var u="",f=0;f<o[1].length&&e>0;f++)u=n[e%10]+o[1][f]+u,e=Math.floor(e/10);i=u.replace(/(零.)*零$/,"").replace(/^$/,"零")+o[0][a]+i}return r+i.replace(/(零.)*零元/,"元").replace(/(零.)+/g,"零").replace(/^整$/,"零元整")}e.exports=n},function(e,t){function n(){return!![].map&&0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}e.exports=n},function(e,t){function n(e){var t=Date.parse(new Date),n=t-e,o=parseInt(n/864e5),r=parseInt(n/36e5),i=parseInt(n/6e4),a=parseInt(o/30),u=parseInt(a/12);return u?u+"年前":a?a+"个月前":o?o+"天前":r?r+"小时前":i?i+"分钟前":"刚刚"}e.exports=n},function(e,t){function n(e){var t=new Date,n=new Date(e),o=n.getTime()-t.getTime(),r=0,i=0,a=0,u=0;return o>=0&&(r=Math.floor(o/1e3/3600/24),i=Math.floor(o/1e3/60/60%24),a=Math.floor(o/1e3/60%60),u=Math.floor(o/1e3%60)),r+"天 "+i+"小时 "+a+"分钟 "+u+"秒"}e.exports=n},function(e,t){function n(e){e=null==e?window.location.href:e;var t=e.substring(e.lastIndexOf("?")+1);return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}e.exports=n},function(e,t){function n(e){if(!e)return"";var t=[];for(var n in e){var o=e[n];if(o instanceof Array)for(var r=0;r<o.length;++r)t.push(encodeURIComponent(n+"["+r+"]")+"="+encodeURIComponent(o[r]));else t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]))}return t.join("&")}e.exports=n}])});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NGM4ZmVkOGRmZmNjNjdkMDc2ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyJdLCJuYW1lcyI6WyIkYXBwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJGJnIiwiJHBlb3BsZSIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJwZW9wbGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJnZXRBdHRyaWJ1dGUiLCJwZW9wbGVJbWFnZSIsImFwcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsIngiLCJ5IiwicHVzaCIsIm5hbWUiLCJjb2xvciIsIm1vdmUiLCJ1cGRhdGVDYW52YXMiLCJzaG93UGF0aCIsIiRydWxlciIsImlubmVySFRNTCIsImltZ1NjYWxlIiwiJHBvaW50ZXJYIiwiJHBvaW50ZXJZIiwicG9pbnRlclgiLCJwb2ludGVyWSIsIiRtZWFzdXJlIiwibWVhc3VyZSIsIiRtZWFzdXJlQ2FuY2VsIiwibW9ja1NlcnZlcjEiLCJzZXRJbnRlcnZhbCIsImZvckVhY2giLCJwZXJzb24iLCJpbmRleCIsImxlbmd0aCIsImxhc3QiLCJuZXh0IiwibW9ja1NlcnZlcjIiLCJtb2NrU2VydmVyMyIsImRyYXdMaW5lIiwiY3R4IiwieDEiLCJ5MSIsIngyIiwieTIiLCJzY2FsZSIsInN0cm9rZVN0eWxlIiwiYmVnaW5QYXRoIiwibGluZVdpZHRoIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiY2xvc2VQYXRoIiwiZHJhd0NpcmNsZSIsInJhZGl1cyIsImFyYyIsImZpbGxTdHlsZSIsImZpbGwiLCJkcmF3VGV4dCIsInRleHQiLCJmb250IiwiZmlsbFRleHQiLCJjYWxjdWxhdGVMZW5ndGgiLCJNYXRoIiwic3FydCIsInBvdyIsImRlZmF1bHRPcHRpb25zIiwidW5kZWZpbmVkIiwiaW1nWCIsImltZ1kiLCJhbmltYXRpb24iLCJpc01lYXN1cmluZyIsIkFwcCIsImlzU2hvd1BhdGgiLCJyZW5kZXIiLCJsb2FkQmdJbWciLCJsb2FkUGVvcGxlSW1nIiwiZHJhd01vdmUiLCJhZGRFdmVudCIsInJ1biIsImJpbmRNZWFzdXJlRXZlbnQiLCJjb250ZXh0IiwiZHJhd01hcCIsImRyYXdQZW9wbGUiLCJjbGVhckNhbnZhcyIsIm1vdmVDYW52YXMiLCJnZXRDb250ZXh0IiwibWVhc3VyZUNhbnZhcyIsImRyYXdNZWFzdXJlIiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwibGluZUhlaWdodCIsIm92ZXJmbG93IiwiYmFja2dyb3VuZENvbG9yIiwiYmdDb2xvciIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm1hcENhbnZhcyIsInNldEF0dHJpYnV0ZSIsImNsb25lTm9kZSIsInBlb3BsZUNhbnZhcyIsIiRjb250YWluZXIiLCJjbGlja1RpbWUiLCJjbGlja051bSIsIm1vdmVOdW0iLCJtb3VzZW1vdmVMaXN0ZW5lciIsImN1cnNvciIsInBvcyIsIndpbmRvd1RvQ2FudmFzIiwiZXZlbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsInBvaW50ZXIiLCJtb3ZlQXJyIiwibGFzdFBvaW50IiwiY2xpY2tMaXN0ZW5lciIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJwb3AiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9iaiIsImFyciIsImp1ZGdlQm9yZGVyIiwiYmdJbWciLCJ3aGVlbERlbHRhIiwiZGVsdGFZIiwidGhhdCIsInBvczEiLCJtb3VzZXVwTGlzdGVuZXIiLCJjYW52YXMiLCJiYm94IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJkcmF3SW1hZ2UiLCJjdXJyZW50IiwicGVvcGxlSW1nV2lkdGgiLCJwZW9wbGVJbWdIZWlnaHQiLCJ0b3RhbExlbmd0aCIsInRvRml4ZWQiLCJjbGVhclJlY3QiLCJzdGVwIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidmFsIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUSxtQkFBbUIsVUFBVSxFQUFFLEVBQUU7QUFDMUUsQ0FBQzs7Ozs7OztBQ0hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7Ozs7Ozs7QUNMekMsNkJBQTZCO0FBQzdCLHVDQUF1Qzs7Ozs7OztBQ0R2QztBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LEVBQUUsS0FBSyxFQUFFLGtCQUFrQixZQUFZLGVBQWUsY0FBYyx5RUFBeUUsRUFBRSxXQUFXLFlBQVksZUFBZSxjQUFjLDhCQUE4QixNQUFNLFFBQVEsSUFBSSw0Q0FBNEMsWUFBWSxlQUFlLGNBQWMsNEdBQTRHLGNBQWMsaUJBQWlCLFdBQVcscUVBQXFFLHlCQUF5QixZQUFZLG1CQUFtQixLQUFLLGlCQUFpQixtQkFBbUIsMkNBQTJDLHNEQUFzRCw2RUFBNkUsWUFBWSxlQUFlLGFBQWEsdUdBQXVHLFlBQVksZUFBZSxjQUFjLDRIQUE0SCw0REFBNEQsWUFBWSxlQUFlLGNBQWMsdUVBQXVFLHNKQUFzSixZQUFZLGVBQWUsY0FBYyxpQ0FBaUMsd0NBQXdDLHNCQUFzQix3RkFBd0YsTUFBTSxZQUFZLGVBQWUsY0FBYyxlQUFlLFNBQVMsZ0JBQWdCLFdBQVcsa0NBQWtDLFdBQVcseUVBQXlFLGdFQUFnRSxtQkFBbUIsWUFBWSxHQUFHLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYnVuZGxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJ1bmRsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk0YzhmZWQ4ZGZmY2M2N2QwNzZlIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEFwcCBmcm9tICcuL2RyYXcuanMnXHJcbmltcG9ydCB7XHJcbiAgICByYW5kb21OdW0sXHJcbiAgICByYW5kb21Db2xvclxyXG59IGZyb20gJ291dGlscyc7XHJcbmNvbnN0ICRhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJylcclxuY29uc3QgJGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JnJylcclxuY29uc3QgJHBlb3BsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZW9wbGUnKVxyXG5cclxuXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBjb250YWluZXI6ICRhcHAsXHJcbiAgICBwZW9wbGU6IFtdLFxyXG4gICAgYmFja2dyb3VuZEltYWdlOiAkYmcuZ2V0QXR0cmlidXRlKCdzcmMnKSxcclxuICAgIHBlb3BsZUltYWdlOiAkcGVvcGxlLmdldEF0dHJpYnV0ZSgnc3JjJylcclxufVxyXG5sZXQgYXBwID0gbmV3IEFwcChvcHRpb25zKVxyXG5cclxuLy8g5re75Yqg5py65Zmo5Lq6XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX2FkZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbGV0IHtcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHRcclxuICAgIH0gPSAkYXBwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHggPSByYW5kb21OdW0oMCwgd2lkdGgpXHJcbiAgICBsZXQgeSA9IHJhbmRvbU51bSgwLCBoZWlnaHQpXHJcbiAgICBvcHRpb25zLnBlb3BsZS5wdXNoKHtcclxuICAgICAgICBuYW1lOiAneXhsJyxcclxuICAgICAgICBjb2xvcjogcmFuZG9tQ29sb3IoKSxcclxuICAgICAgICBtb3ZlOiBbe1xyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5XHJcbiAgICAgICAgfV1cclxuICAgIH0pXHJcbiAgICAvLyDph43nu5jovajov7nvvIzkurpcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ3Blb3BsZScpXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOaYr+WQpuWxleekuui/kOWKqOi9qOi/uVxyXG5hcHAuc2hvd1BhdGggPSB0cnVlXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3Nob3cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFwcC5zaG93UGF0aCA9IHRydWVcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9oaWRkZW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFwcC5zaG93UGF0aCA9IGZhbHNlXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOavlOS+i+WwulxyXG5jb25zdCAkcnVsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9ydWxlcicpXHJcbiRydWxlci5pbm5lckhUTUwgPSBgeCR7YXBwLm9wdGlvbnMuaW1nU2NhbGV9IOWAjWBcclxuJGFwcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgKCkgPT4ge1xyXG4gICAgJHJ1bGVyLmlubmVySFRNTCA9IGB4JHthcHAub3B0aW9ucy5pbWdTY2FsZX0g5YCNYFxyXG59KVxyXG5cclxuLy8g6byg5qCH5Z2Q5qCHXHJcbmNvbnN0ICRwb2ludGVyWCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3BvaW50ZXIteCcpXHJcbmNvbnN0ICRwb2ludGVyWSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3BvaW50ZXIteScpXHJcbiRhcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKCkgPT4ge1xyXG4gICAgJHBvaW50ZXJYLmlubmVySFRNTCA9IGBYOiR7YXBwLm9wdGlvbnMucG9pbnRlclh9YFxyXG4gICAgJHBvaW50ZXJZLmlubmVySFRNTCA9IGBZOiR7YXBwLm9wdGlvbnMucG9pbnRlcll9YFxyXG59KVxyXG5cclxuXHJcbmNvbnN0ICRtZWFzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfbWVhc3VyZScpXHJcbiRtZWFzdXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYXBwLm1lYXN1cmUoKVxyXG59KVxyXG5jb25zdCAkbWVhc3VyZUNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX21lYXN1cmUtY2FuY2VsJylcclxuJG1lYXN1cmVDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5tZWFzdXJlID0gW11cclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ21lYXN1cmUnKVxyXG59KVxyXG5cclxuLy8g5pWw5o2u5qih5ouf5ZmoXHJcbmxldCBtb2NrU2VydmVyMSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4gICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbiAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtMTAsIDEwKSxcclxuICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC0xMCwgMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbiAgICB9KTtcclxufSwgNTAwKVxyXG5sZXQgbW9ja1NlcnZlcjIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4gICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTEwLCAxMCksXHJcbiAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtMTAsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgfSk7XHJcbn0sIDMwMClcclxubGV0IG1vY2tTZXJ2ZXIzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbiAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC0xMCwgMTApLFxyXG4gICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTEwLCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuICAgIH0pO1xyXG59LCAxMDAwKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIi8v55S757q/5q61XHJcbmZ1bmN0aW9uIGRyYXdMaW5lKGN0eCwgY29sb3IsIHgxLCB5MSwgeDIsIHkyLCBzY2FsZSkge1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcclxuICAgIGN0eC5saW5lVG8oeDIsIHkyKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxufVxyXG4vL+eUu+epuuW/g+WchlxyXG5mdW5jdGlvbiBkcmF3Q2lyY2xlKGN0eCwgY29sb3IsIHgsIHksIHJhZGl1cywgc2NhbGUpIHtcclxuICAgIC8v55S75LiA5Liq56m65b+D5ZyGXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgMzYwLCBmYWxzZSk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7IC8v5aGr5YWF6aKc6ImyLOm7mOiupOaYr+m7keiJslxyXG4gICAgY3R4LmZpbGwoKTsgLy/nlLvlrp7lv4PlnIZcclxuICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICBjdHguc3Ryb2tlKCk7IC8v55S756m65b+D5ZyGXHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdUZXh0KGN0eCwgeCwgeSwgdGV4dCkge1xyXG4gICAgY3R4LmZvbnQgPSAnMTRweCBBcmlhbCc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDk5Q0MnO1xyXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIHggKyA1LCB5IC0gOCk7XHJcbn1cclxuLy8g5Yu+6IKh5a6a55CG566X6Led56a7XHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZUxlbmd0aCh4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgbGV0IHggPSB4MSAtIHgyO1xyXG4gICAgbGV0IHkgPSB5MSAtIHkyO1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKTtcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBjb250YWluZXI6IG51bGwsIC8v5Yib5bu6Y2FudmFz55qE5a655Zmo77yM5aaC5p6c5LiN5aGr77yM6Ieq5Yqo5ZyoIGJvZHkg5LiK5Yib5bu66KaG55uW5YWo5bGP55qE5bGCXHJcbiAgICBwZW9wbGU6IFtdLCAvLyDkurpcclxuICAgIG1lYXN1cmU6IFtdLCAvLyDmtYvot53orrDlvZVcclxuICAgIGJhY2tncm91bmRJbWFnZTogdW5kZWZpbmVkLCAvLyDog4zmma/lm75cclxuICAgIGltZ1NjYWxlOiAxLCAvLyDpu5jorqTmlL7lpKflgI3mlbBcclxuICAgIGltZ1g6IDAsIC8vIOiDjOaZr+WbvuaLkmNhbnZhc+WOn+eCuVjmlrnlkJHot53nprtcclxuICAgIGltZ1k6IDAsIC8vIOiDjOaZr+WbvuaLkmNhbnZhc+WOn+eCuVnmlrnlkJHot53nprtcclxuICAgIHBvaW50ZXJYOiAwLFxyXG4gICAgcG9pbnRlclk6IDAsXHJcbiAgICBhbmltYXRpb246IHVuZGVmaW5lZCxcclxuICAgIGlzTWVhc3VyaW5nOiBmYWxzZSAvL+ato+WcqOa1i+i3nVxyXG59O1xyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dQYXRoID0gZmFsc2U7IC8vIOaYr+WQpuaYvuekuiDov5Dliqjovajov7lcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubG9hZEJnSW1nKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUGVvcGxlSW1nKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93UGF0aCkgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICovXHJcbiAgICBzZXQgc2hvd1BhdGgodmFsKSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dQYXRoID0gdmFsXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAZGVzYyDlvIDlp4vmtYvot51cclxuICAgICAqL1xyXG4gICAgbWVhc3VyZSgpIHtcclxuICAgICAgICAvLyB0aGlzLmlzU2hvd1BhdGggPSB2YWxcclxuICAgICAgICAvLyDnu5HlrprmtYvot53kuovku7ZcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlzTWVhc3VyaW5nID09PSB0cnVlKSByZXR1cm5cclxuICAgICAgICB0aGlzLmJpbmRNZWFzdXJlRXZlbnQoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5pc01lYXN1cmluZyA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwdWJsaWMgXHJcbiAgICAgKiBAZGVzYyDljZXmrKHph43nu5hjYW52YXNcclxuICAgICAqIEBwYXJhbSB7Kn0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ2FudmFzKGNvbnRleHQpIHtcclxuICAgICAgICAvLyDph43nu5hDYW52YXNcclxuICAgICAgICBzd2l0Y2ggKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY2FzZSAnbWFwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Blb3BsZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb3ZlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWVhc3VyZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWVhc3VyZSgpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaG93UGF0aCkgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpZiAoIW9wdGlvbnMuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMuYmdDb2xvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAvL+eUu+WcsOWbvueahCBjYW52YXNcclxuICAgICAgICBsZXQgbWFwQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihtYXBDYW52YXMuc3R5bGUsIHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIHRvcDogJzAnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnMCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXHJcbiAgICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcENhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgYCR7d2lkdGh9cHhgKVxyXG4gICAgICAgIG1hcENhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGAke2hlaWdodH1weGApXHJcblxyXG4gICAgICAgIC8v55S76L2o6L+557q/5p2h55qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBtb3ZlQ2FudmFzID0gbWFwQ2FudmFzLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy/nlLvkurrnmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IHBlb3BsZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgLy8g5rWL6LedIGNhbnZhc1xyXG4gICAgICAgIGxldCBtZWFzdXJlQ2FudmFzID0gbWFwQ2FudmFzLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1hcENhbnZhcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwZW9wbGVDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWFzdXJlQ2FudmFzKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXBDYW52YXMgPSBtYXBDYW52YXM7XHJcbiAgICAgICAgdGhpcy5tb3ZlQ2FudmFzID0gbW92ZUNhbnZhcztcclxuICAgICAgICB0aGlzLnBlb3BsZUNhbnZhcyA9IHBlb3BsZUNhbnZhcztcclxuICAgICAgICB0aGlzLm1lYXN1cmVDYW52YXMgPSBtZWFzdXJlQ2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNZWFzdXJlRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0ICRjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lclxyXG4gICAgICAgIGxldCBjbGlja1RpbWUgPSAwO1xyXG4gICAgICAgIGxldCBjbGlja051bSA9IDA7XHJcbiAgICAgICAgbGV0IG1vdmVOdW0gPSAwO1xyXG4gICAgICAgIGxldCBtb3VzZW1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocG9zKVxyXG4gICAgICAgICAgICAvLyBkcmF3Q2lyY2xlKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLCAnI2ZmNjkyMicsIHBvcy54LCBwb3MueSwgNSlcclxuICAgICAgICAgICAgLy8g5pyq6YCJ5oup56ys5LiA5Liq54K577yM55u05o6lcmV0dXJuXHJcbiAgICAgICAgICAgIGlmIChjbGlja051bSA9PT0gMCkgcmV0dXJuXHJcbiAgICAgICAgICAgIGxldCBwb2ludGVyID0gdGhpcy5vcHRpb25zLm1lYXN1cmVbdGhpcy5vcHRpb25zLm1lYXN1cmUubGVuZ3RoIC0gMV0ucG9pbnRlclxyXG4gICAgICAgICAgICBsZXQgbW92ZUFyciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW3RoaXMub3B0aW9ucy5tZWFzdXJlLmxlbmd0aCAtIDFdLm1vdmVcclxuICAgICAgICAgICAgbGV0IGxhc3RQb2ludCA9IG1vdmVBcnJbbW92ZUFyci5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHBvaW50ZXIsIHBvcylcclxuICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgeDogcG9zLngsXHJcbiAgICAgICAgICAgICAgICB5OiBwb3MueVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtb3ZlTnVtID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlQXJyLnB1c2gocG9zKVxyXG4gICAgICAgICAgICAgICAgbW92ZU51bSA9IDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vdmVBcnJbbW92ZUFyci5sZW5ndGggLSAxXSA9IHBvc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbGlja0xpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAkY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbWUgLSBjbGlja1RpbWUgPD0gMzAwICYmIGN1cnJlbnRUaW1lIC0gY2xpY2tUaW1lID49IDE1MCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+M5Ye757uT5p2f5rWL6LedXHJcbiAgICAgICAgICAgICAgICBsZXQgbW92ZUFyciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW3RoaXMub3B0aW9ucy5tZWFzdXJlLmxlbmd0aCAtIDFdLm1vdmVcclxuICAgICAgICAgICAgICAgIG1vdmVBcnIucG9wKClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3B0aW9ucy5tZWFzdXJlKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlzTWVhc3VyaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNsaWNrTnVtID09PSAwXHJcbiAgICAgICAgICAgICAgICBjbGlja1RpbWUgPSAwXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1lYXN1cmVDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgLy8g5Y2V5Ye75byA5aeL5rWL6LedXHJcbiAgICAgICAgICAgICAgICAvLyBkcmF3Q2lyY2xlKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLCAnI2ZmNjkyMicsIHBvcy54LCBwb3MueSwgNSlcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcylcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcy54ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1gsIHBvcy55ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1kpXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2tOdW0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnrKzkuIDmrKHljZXlh7tcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmU6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tZWFzdXJlLnB1c2gob2JqKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrTnVtKytcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSa5qyh6YCJ54K5XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5vcHRpb25zLm1lYXN1cmUubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvaW50ZXIgPSB0aGlzLm9wdGlvbnMubWVhc3VyZVtpbmRleCAtIDFdLnBvaW50ZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5vcHRpb25zLm1lYXN1cmVbaW5kZXggLSAxXS5tb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdFBvaW50ID0gYXJyW2Fyci5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogcG9zLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvcy55LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHBvaW50ZXIsIHBvcylcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChwb3MpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsaWNrVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0xpc3RlbmVyKVxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICB9XHJcbiAgICBhZGRFdmVudCgpIHtcclxuICAgICAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyXHJcbiAgICAgICAgbGV0IGp1ZGdlQm9yZGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDovrnnlYzmo4DmtYtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdYID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1kgLSBoZWlnaHQgPCAtdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZID0gLXRoaXMuYmdJbWcuaGVpZ2h0ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWCAtIHdpZHRoIDwgLXRoaXMuYmdJbWcud2lkdGggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gLXRoaXMuYmdJbWcud2lkdGggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB3aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlnLDlm77nvKnmlL5cclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgbGV0IHdoZWVsRGVsdGEgPSBldmVudC53aGVlbERlbHRhID8gZXZlbnQud2hlZWxEZWx0YSA6IChldmVudC5kZWx0YVkgKiAoLTQwKSk7XHJcbiAgICAgICAgICAgIGlmICh3aGVlbERlbHRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5pS+5aSnXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqIDIgPD0gdGhpcy5iZ0ltZy53aWR0aCAqIDggfHwgdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKiAyIDw9IHRoaXMuYmdJbWcuaGVpZ2h0ICogOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaUvuWkp+i+ueeVjOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gdGhpcy5vcHRpb25zLmltZ1ggKiAyIC0gcG9zLng7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWSAqIDIgLSBwb3MueTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOe8qeWwj1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmdJbWcud2lkdGggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLyAyID49IHdpZHRoIHx8IHRoaXMuYmdJbWcuaGVpZ2h0ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlIC8gMiA+PSBoZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnvKnlsI/ovrnnlYzliKTmlq1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLz0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IHRoaXMub3B0aW9ucy5pbWdYICogMC41ICsgcG9zLnggKiAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWSAqIDAuNSArIHBvcy55ICogMC41O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGp1ZGdlQm9yZGVyKClcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAvLyDph43nu5jmtYvot53lm77lsYJcclxuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWVhc3VyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5Zyw5Zu+56e75YqoXHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZW1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJtb3ZlXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zMSA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBwb3MxLnggLSBwb3MueDtcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gcG9zMS55IC0gcG9zLnk7XHJcbiAgICAgICAgICAgICAgICBwb3MgPSBwb3MxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggKz0geDtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZICs9IHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8g6YeN57uY5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWVhc3VyZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbW91c2V1cExpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAganVkZ2VCb3JkZXIoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIOmHjee7mOa1i+i3neWbvuWxglxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBMaXN0ZW5lcilcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g6byg5qCH5oyH6ZKI5Z2Q5qCHXHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWCA9IHBvcy54XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWSA9IGhlaWdodCAtIHBvcy55XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3dUb0NhbnZhcyhjYW52YXMsIHgsIHkpIHtcclxuICAgICAgICBsZXQgYmJveCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiB4IC0gYmJveC5sZWZ0IC0gKGJib3gud2lkdGggLSBjYW52YXMud2lkdGgpIC8gMixcclxuICAgICAgICAgICAgeTogeSAtIGJib3gudG9wIC0gKGJib3guaGVpZ2h0IC0gY2FudmFzLmhlaWdodCkgLyAyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQmdJbWcoKSB7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgIHRoaXMuYmdJbWcgPSBpbWdcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgbG9hZFBlb3BsZUltZygpIHtcclxuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMub3B0aW9ucy5wZW9wbGVJbWFnZTtcclxuICAgICAgICB0aGlzLnBlb3BsZUltYWdlID0gaW1nXHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg55S76IOM5pmv5Zyw5Zu+XHJcbiAgICAgKi9cclxuICAgIGRyYXdNYXAoKSB7XHJcbiAgICAgICAgbGV0IGltZ1NjYWxlID0gdGhpcy5vcHRpb25zLmltZ1NjYWxlO1xyXG4gICAgICAgIGxldCBpbWdYID0gdGhpcy5vcHRpb25zLmltZ1g7XHJcbiAgICAgICAgbGV0IGltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWTtcclxuICAgICAgICBsZXQgaW1nID0gdGhpcy5iZ0ltZztcclxuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5tYXBDYW52YXM7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1hcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoY29udGV4dClcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCwgaW1nWCwgaW1nWSwgaW1nLndpZHRoICogaW1nU2NhbGUsIGltZy5oZWlnaHQgKiBpbWdTY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd01vdmUoKSB7XHJcbiAgICAgICAgLy/nlLvnp7vliqjovajov7lcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZSxcclxuICAgICAgICAgICAgY29sb3JcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50LCBsYXN0O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW92ZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbW92ZVstLWluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgJ3JlZCdcclxuICAgICAgICAgICAgICAgIC8vIOWIh+aNouW3puS4i+inkuS4uuWdkOagh+WOn+eCuVxyXG4gICAgICAgICAgICAgICAgbGFzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBsYXN0LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAoaGVpZ2h0IC0gbGFzdC55KSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChoZWlnaHQgLSBjdXJyZW50LnkpICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRyYXdMaW5lKGNvbnRleHQsIGNvbG9yLCBsYXN0LngsIGxhc3QueSwgY3VycmVudC54LCBjdXJyZW50LnksIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3UGVvcGxlKCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBlb3BsZUNhbnZhcyxcclxuICAgICAgICAgICAgcGVvcGxlSW1hZ2VcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICBsZXQgcGVvcGxlSW1nV2lkdGggPSAzMDtcclxuICAgICAgICBsZXQgcGVvcGxlSW1nSGVpZ2h0ID0gNDM7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSBwZW9wbGVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbnZhcyhjb250ZXh0KTtcclxuICAgICAgICBvcHRpb25zLnBlb3BsZS5mb3JFYWNoKCh7XHJcbiAgICAgICAgICAgIG1vdmVcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG1vdmVbbW92ZS5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAvLyDliIfmjaLlt6bkuIvop5LkuLrlnZDmoIfljp/ngrlcclxuICAgICAgICAgICAgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBwb3NpdGlvbi54ICogb3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYIC0gcGVvcGxlSW1nV2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgeTogKGhlaWdodCAtIHBvc2l0aW9uLnkpICogb3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZIC0gcGVvcGxlSW1nSGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHBlb3BsZUltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwZW9wbGVJbWdXaWR0aCwgcGVvcGxlSW1nSGVpZ2h0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TWVhc3VyZSgpIHtcclxuICAgICAgICAvLyDnlLvmtYvot53ovajov7lcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgbWVhc3VyZUNhbnZhcyxcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICAvL+eUu+enu+WKqOi9qOi/uVxyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tZWFzdXJlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm1lYXN1cmUuZm9yRWFjaCgoe1xyXG4gICAgICAgICAgICBtb3ZlXHJcbiAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudCwgbGFzdCwgdG90YWxMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW92ZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbW92ZVstLWluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBsYXN0LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBsYXN0LnkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gLy8gaWYgKGluZGV4ID09PSBgJHttb3ZlLmxlbmd0aC0xfWAgJiYgaW5kZXggIT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBjdXJyZW50LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBjdXJyZW50LnkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgZHJhd0xpbmUoY29udGV4dCwgJyNmZjY5MjInLCBsYXN0LngsIGxhc3QueSwgY3VycmVudC54LCBjdXJyZW50LnkpXHJcbiAgICAgICAgICAgICAgICBkcmF3Q2lyY2xlKGNvbnRleHQsICcjZmY2OTIyJywgY3VycmVudC54LCBjdXJyZW50LnksIDUpXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9ICcnXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi1t+eCuVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAn6LW354K5J1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbExlbmd0aCA9IHRvdGFsTGVuZ3RoICsgY2FsY3VsYXRlTGVuZ3RoKGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSlcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYCR7KHRvdGFsTGVuZ3RoL3RoaXMub3B0aW9ucy5pbWdTY2FsZSkudG9GaXhlZCgyKX0gbWBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRyYXdUZXh0KGNvbnRleHQsIGN1cnJlbnQueCwgY3VycmVudC55LCB0ZXh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZGVzYyDmuIXpmaR7Y29udGV4dH3nlLvluINcclxuICAgICAqIEBwYXJhbSB7Kn0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgY2xlYXJDYW52YXMoY29udGV4dCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcyxcclxuICAgICAgICAgICAgbW92ZUNhbnZhcyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLFxyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzXHJcbiAgICAgICAgfSA9IHRoaXNcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIG1vdmVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgLy8g5Yqo55S7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pIHJldHVyblxyXG4gICAgICAgIGxldCBzdGVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhcygncGVvcGxlJylcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG4gICAgICAgICAgICAvLyDmm7TmlrAg5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzKCdtZWFzdXJlJylcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kcmF3LmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMub3V0aWxzPXQoKTplLm91dGlscz10KCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChvKXtpZihuW29dKXJldHVybiBuW29dLmV4cG9ydHM7dmFyIHI9bltvXT17aTpvLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbb10uY2FsbChyLmV4cG9ydHMscixyLmV4cG9ydHMsdCksci5sPSEwLHIuZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixvKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Om99KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTUpfShbZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7cmV0dXJuIG5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIit0K1wiKFxcXFxzfCQpXCIpLnRlc3QoZS5jbGFzc05hbWUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0LG4pe3ZhciBvPW5ldyBEYXRlO28uc2V0RGF0ZShvLmdldERhdGUoKStuKSxkb2N1bWVudC5jb29raWU9ZStcIj1cIit0K1wiO2V4cGlyZXM9XCIrb31lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4gd2luZG93LnNjcm9sbFRvKDAsZSksZX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4sbyl7ZnVuY3Rpb24gcigpe2Z1bmN0aW9uIHIoKXthPU51bWJlcihuZXcgRGF0ZSksbi5hcHBseShmLHMpfWZ1bmN0aW9uIHUoKXtpPXZvaWQgMH12YXIgZj10aGlzLGM9TnVtYmVyKG5ldyBEYXRlKS1hLHM9YXJndW1lbnRzO28mJiFpJiZyKCksaSYmY2xlYXJUaW1lb3V0KGkpLHZvaWQgMD09PW8mJmM+ZT9yKCk6ITAhPT10JiYoaT1zZXRUaW1lb3V0KG8/dTpyLHZvaWQgMD09PW8/ZS1jOmUpKX12YXIgaSxhPTA7cmV0dXJuXCJib29sZWFuXCIhPXR5cGVvZiB0JiYobz1uLG49dCx0PXZvaWQgMCkscn19LGZ1bmN0aW9uKGUsdCxuKXt2YXIgbz1uKDYpLHI9big3KSxpPW4oMCksYT1uKDgpLHU9big5KSxmPW4oMTApLGM9bigxKSxzPW4oMTEpLHA9bigxMiksZD1uKDIpLGw9bigxMyksbT1uKDE0KSx2PW4oMyksdz1uKDE1KSxnPW4oMTYpLHk9big0KSxoPW4oMTcpLHg9bigxOCksYj1uKDE5KSxDPW4oMjApLE49bigyMSksUz1uKDIyKSxNPW4oMjMpLEU9bigyNCksRj1uKDI1KSxEPW4oMjYpLEk9bigyNyksVD1uKDI4KSxrPW4oMjkpLFI9bigzMCksQT1uKDMxKTtlLmV4cG9ydHM9e2FycmF5RXF1YWw6byxhZGRDbGFzczpyLGhhc0NsYXNzOmkscmVtb3ZlQ2xhc3M6YSxnZXRDb29raWU6dSxyZW1vdmVDb29raWU6ZixzZXRDb29raWU6YyxnZXRPUzpzLGdldEV4cGxvcmU6cCxnZXRTY3JvbGxUb3A6ZCxvZmZzZXQ6bCxzY3JvbGxUbzptLHNldFNjcm9sbFRvcDp2LHdpbmRvd1Jlc2l6ZTp3LGRlYm91bmNlOmcsdGhyb3R0bGU6eSxnZXRLZXlOYW1lOmgsZGVlcENsb25lOngsaXNFbXB0eU9iamVjdDpiLHJhbmRvbUNvbG9yOkMscmFuZG9tTnVtOk4saXNFbWFpbDpTLGlzSWRDYXJkOk0saXNQaG9uZU51bTpFLGlzVXJsOkYsZGlnaXRVcHBlcmNhc2U6RCxpc1N1cHBvcnRXZWJQOkksZm9ybWF0UGFzc1RpbWU6VCxmb3JtYXRSZW1haW5UaW1lOmsscGFyc2VRdWVyeVN0cmluZzpSLHN0cmluZ2Z5UXVlcnlTdHJpbmc6QX19LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe2lmKGU9PT10KXJldHVybiEwO2lmKGUubGVuZ3RoIT10Lmxlbmd0aClyZXR1cm4hMTtmb3IodmFyIG49MDtuPGUubGVuZ3RoOysrbilpZihlW25dIT09dFtuXSlyZXR1cm4hMTtyZXR1cm4hMH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtyKGUsdCl8fChlLmNsYXNzTmFtZSs9XCIgXCIrdCl9dmFyIHI9bigwKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtpZihyKGUsdCkpe3ZhciBuPW5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIit0K1wiKFxcXFxzfCQpXCIpO2UuY2xhc3NOYW1lPWUuY2xhc3NOYW1lLnJlcGxhY2UobixcIiBcIil9fXZhciByPW4oMCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9ZG9jdW1lbnQuY29va2llLnJlcGxhY2UoL1xccy9nLFwiXCIpLnNwbGl0KFwiO1wiKSxuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBvPXRbbl0uc3BsaXQoXCI9XCIpO2lmKG9bMF09PWUpcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChvWzFdKX1yZXR1cm5cIlwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlKXtyKGUsXCIxXCIsLTEpfXZhciByPW4oMSk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3ZhciBlPVwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwidXNlckFnZW50XCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKXx8XCJcIix0PShcIm5hdmlnYXRvclwiaW4gd2luZG93JiZcInZlbmRvclwiaW4gbmF2aWdhdG9yJiZuYXZpZ2F0b3IudmVuZG9yLnRvTG93ZXJDYXNlKCksXCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJhcHBWZXJzaW9uXCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5hcHBWZXJzaW9uLnRvTG93ZXJDYXNlKCl8fFwiXCIpO3JldHVybi9tYWMvaS50ZXN0KHQpP1wiTWFjT1NYXCI6L3dpbi9pLnRlc3QodCk/XCJ3aW5kb3dzXCI6L2xpbnV4L2kudGVzdCh0KT9cImxpbnV4XCI6KC9pcGhvbmUvaS50ZXN0KGUpfHwvaXBhZC9pLnRlc3QoZSl8fC9pcG9kL2kudGVzdChlKSwvYW5kcm9pZC9pLnRlc3QoZSk/XCJhbmRyb2lkXCI6L3dpbi9pLnRlc3QodCkmJi9waG9uZS9pLnRlc3QoZSk/XCJ3aW5kb3dzUGhvbmVcIjp2b2lkIDApfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXt2YXIgZSx0PXt9LG49bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO3JldHVybihlPW4ubWF0Y2goL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLykpP3QuaWU9ZVsxXTooZT1uLm1hdGNoKC9tc2llIChbXFxkXFwuXSspLykpP3QuaWU9ZVsxXTooZT1uLm1hdGNoKC9lZGdlXFwvKFtcXGRcXC5dKykvKSk/dC5lZGdlPWVbMV06KGU9bi5tYXRjaCgvZmlyZWZveFxcLyhbXFxkXFwuXSspLykpP3QuZmlyZWZveD1lWzFdOihlPW4ubWF0Y2goLyg/Om9wZXJhfG9wcikuKFtcXGRcXC5dKykvKSk/dC5vcGVyYT1lWzFdOihlPW4ubWF0Y2goL2Nocm9tZVxcLyhbXFxkXFwuXSspLykpP3QuY2hyb21lPWVbMV06KGU9bi5tYXRjaCgvdmVyc2lvblxcLyhbXFxkXFwuXSspLipzYWZhcmkvKSkmJih0LnNhZmFyaT1lWzFdKSx0LmllP1wiSUU6IFwiK3QuaWU6dC5lZGdlP1wiRURHRTogXCIrdC5lZGdlOnQuZmlyZWZveD9cIkZpcmVmb3g6IFwiK3QuZmlyZWZveDp0LmNocm9tZT9cIkNocm9tZTogXCIrdC5jaHJvbWU6dC5vcGVyYT9cIk9wZXJhOiBcIit0Lm9wZXJhOnQuc2FmYXJpP1wiU2FmYXJpOiBcIit0LnNhZmFyaTpcIlVua29ud25cIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD17bGVmdDowLHRvcDowfTtlOyl0LmxlZnQrPWUub2Zmc2V0TGVmdCx0LnRvcCs9ZS5vZmZzZXRUb3AsZT1lLm9mZnNldFBhcmVudDtyZXR1cm4gdH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtpZih0PDApcmV0dXJuIHZvaWQgaShlKTt2YXIgbj1lLXIoKTtpZigwIT09bil7dmFyIGE9bi90KjEwO3JlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2lmKE1hdGguYWJzKGEpPk1hdGguYWJzKG4pKXJldHVybiB2b2lkIGkocigpK24pO2kocigpK2EpLG4+MCYmcigpPj1lfHxuPDAmJnIoKTw9ZXx8byhlLHQtMTYpfSl9fXZhciByPW4oMiksaT1uKDMpOyFmdW5jdGlvbigpe3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV9KCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3ZhciBuPXdpbmRvdy5pbm5lckhlaWdodDtlPVwiZnVuY3Rpb25cIj09dHlwZW9mIGU/ZTpmdW5jdGlvbigpe30sdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6ZnVuY3Rpb24oKXt9LHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsZnVuY3Rpb24oKXt2YXIgbz13aW5kb3cuaW5uZXJIZWlnaHQ7bz09PW4mJmUoKSxvPG4mJnQoKX0pfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQsbil7cmV0dXJuIHZvaWQgMD09PW4/cihlLHQsITEpOnIoZSxuLCExIT09dCl9dmFyIHI9big0KTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiBvW2VdP29bZV06KGNvbnNvbGUubG9nKFwiVW5rbm93IEtleShLZXkgQ29kZTpcIitlK1wiKVwiKSxcIlwiKX12YXIgbz17ODpcIkJhY2tzcGFjZVwiLDk6XCJUYWJcIiwxMzpcIkVudGVyXCIsMTY6XCJTaGlmdFwiLDE3OlwiQ3RybFwiLDE4OlwiQWx0XCIsMTk6XCJQYXVzZVwiLDIwOlwiQ2FwcyBMb2NrXCIsMjc6XCJFc2NhcGVcIiwzMjpcIlNwYWNlXCIsMzM6XCJQYWdlIFVwXCIsMzQ6XCJQYWdlIERvd25cIiwzNTpcIkVuZFwiLDM2OlwiSG9tZVwiLDM3OlwiTGVmdFwiLDM4OlwiVXBcIiwzOTpcIlJpZ2h0XCIsNDA6XCJEb3duXCIsNDI6XCJQcmludCBTY3JlZW5cIiw0NTpcIkluc2VydFwiLDQ2OlwiRGVsZXRlXCIsNDg6XCIwXCIsNDk6XCIxXCIsNTA6XCIyXCIsNTE6XCIzXCIsNTI6XCI0XCIsNTM6XCI1XCIsNTQ6XCI2XCIsNTU6XCI3XCIsNTY6XCI4XCIsNTc6XCI5XCIsNjU6XCJBXCIsNjY6XCJCXCIsNjc6XCJDXCIsNjg6XCJEXCIsNjk6XCJFXCIsNzA6XCJGXCIsNzE6XCJHXCIsNzI6XCJIXCIsNzM6XCJJXCIsNzQ6XCJKXCIsNzU6XCJLXCIsNzY6XCJMXCIsNzc6XCJNXCIsNzg6XCJOXCIsNzk6XCJPXCIsODA6XCJQXCIsODE6XCJRXCIsODI6XCJSXCIsODM6XCJTXCIsODQ6XCJUXCIsODU6XCJVXCIsODY6XCJWXCIsODc6XCJXXCIsODg6XCJYXCIsODk6XCJZXCIsOTA6XCJaXCIsOTE6XCJXaW5kb3dzXCIsOTM6XCJSaWdodCBDbGlja1wiLDk2OlwiTnVtcGFkIDBcIiw5NzpcIk51bXBhZCAxXCIsOTg6XCJOdW1wYWQgMlwiLDk5OlwiTnVtcGFkIDNcIiwxMDA6XCJOdW1wYWQgNFwiLDEwMTpcIk51bXBhZCA1XCIsMTAyOlwiTnVtcGFkIDZcIiwxMDM6XCJOdW1wYWQgN1wiLDEwNDpcIk51bXBhZCA4XCIsMTA1OlwiTnVtcGFkIDlcIiwxMDY6XCJOdW1wYWQgKlwiLDEwNzpcIk51bXBhZCArXCIsMTA5OlwiTnVtcGFkIC1cIiwxMTA6XCJOdW1wYWQgLlwiLDExMTpcIk51bXBhZCAvXCIsMTEyOlwiRjFcIiwxMTM6XCJGMlwiLDExNDpcIkYzXCIsMTE1OlwiRjRcIiwxMTY6XCJGNVwiLDExNzpcIkY2XCIsMTE4OlwiRjdcIiwxMTk6XCJGOFwiLDEyMDpcIkY5XCIsMTIxOlwiRjEwXCIsMTIyOlwiRjExXCIsMTIzOlwiRjEyXCIsMTQ0OlwiTnVtIExvY2tcIiwxNDU6XCJTY3JvbGwgTG9ja1wiLDE4MjpcIk15IENvbXB1dGVyXCIsMTgzOlwiTXkgQ2FsY3VsYXRvclwiLDE4NjpcIjtcIiwxODc6XCI9XCIsMTg4OlwiLFwiLDE4OTpcIi1cIiwxOTA6XCIuXCIsMTkxOlwiL1wiLDE5MjpcImBcIiwyMTk6XCJbXCIsMjIwOlwiXFxcXFwiLDIyMTpcIl1cIiwyMjI6XCInXCJ9O2UuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ7aWYobnVsbD09ZXx8XCJvYmplY3RcIiE9KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpvKGUpKSlyZXR1cm4gZTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gdD1uZXcgRGF0ZSx0LnNldFRpbWUoZS5nZXRUaW1lKCkpLHQ7aWYoZSBpbnN0YW5jZW9mIEFycmF5KXt0PVtdO2Zvcih2YXIgcj0wLGk9ZS5sZW5ndGg7cjxpO3IrKyl0W3JdPW4oZVtyXSk7cmV0dXJuIHR9aWYoZSBpbnN0YW5jZW9mIE9iamVjdCl7dD17fTtmb3IodmFyIGEgaW4gZSllLmhhc093blByb3BlcnR5KGEpJiYodFthXT1uKGVbYV0pKTtyZXR1cm4gdH10aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29weSB2YWx1ZXMhIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIil9dmFyIG89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4hKCFlfHxcIm9iamVjdFwiIT09KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpvKGUpKXx8QXJyYXkuaXNBcnJheShlKSkmJiFPYmplY3Qua2V5cyhlKS5sZW5ndGh9dmFyIG89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3JldHVyblwiI1wiKyhcIjAwMDAwXCIrKDE2Nzc3MjE2Kk1hdGgucmFuZG9tKCk8PDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTYpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKih0LWUrMSkpK2V9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXFx3KyhbLSsuXVxcdyspKkBcXHcrKFstLl1cXHcrKSpcXC5cXHcrKFstLl1cXHcrKSovLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXiheWzEtOV1cXGR7N30oKDBcXGQpfCgxWzAtMl0pKSgoWzB8MXwyXVxcZCl8M1swLTFdKVxcZHszfSQpfCheWzEtOV1cXGR7NX1bMS05XVxcZHszfSgoMFxcZCl8KDFbMC0yXSkpKChbMHwxfDJdXFxkKXwzWzAtMV0pKChcXGR7NH0pfFxcZHszfVtYeF0pJCkkLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL14oMHw4NnwxNzk1MSk/KDEzWzAtOV18MTVbMDEyMzU2Nzg5XXwxN1s2NzhdfDE4WzAtOV18MTRbNTddKVswLTldezh9JC8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDZ9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mXFwvXFwvPV0qKS9pLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1bXCLop5JcIixcIuWIhlwiXSxuPVtcIumbtlwiLFwi5aO5XCIsXCLotLBcIixcIuWPgVwiLFwi6IKGXCIsXCLkvI1cIixcIumZhlwiLFwi5p+SXCIsXCLmjYxcIixcIueOllwiXSxvPVtbXCLlhYNcIixcIuS4h1wiLFwi5Lq/XCJdLFtcIlwiLFwi5ou+XCIsXCLkvbBcIixcIuS7n1wiXV0scj1lPDA/XCLmrKBcIjpcIlwiO2U9TWF0aC5hYnMoZSk7Zm9yKHZhciBpPVwiXCIsYT0wO2E8dC5sZW5ndGg7YSsrKWkrPShuW01hdGguZmxvb3IoMTAqZSpNYXRoLnBvdygxMCxhKSklMTBdK3RbYV0pLnJlcGxhY2UoL+mbti4vLFwiXCIpO2k9aXx8XCLmlbRcIixlPU1hdGguZmxvb3IoZSk7Zm9yKHZhciBhPTA7YTxvWzBdLmxlbmd0aCYmZT4wO2ErKyl7Zm9yKHZhciB1PVwiXCIsZj0wO2Y8b1sxXS5sZW5ndGgmJmU+MDtmKyspdT1uW2UlMTBdK29bMV1bZl0rdSxlPU1hdGguZmxvb3IoZS8xMCk7aT11LnJlcGxhY2UoLyjpm7YuKSrpm7YkLyxcIlwiKS5yZXBsYWNlKC9eJC8sXCLpm7ZcIikrb1swXVthXStpfXJldHVybiByK2kucmVwbGFjZSgvKOmbti4pKumbtuWFgy8sXCLlhYNcIikucmVwbGFjZSgvKOmbti4pKy9nLFwi6Zu2XCIpLnJlcGxhY2UoL17mlbQkLyxcIumbtuWFg+aVtFwiKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuISFbXS5tYXAmJjA9PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikudG9EYXRhVVJMKFwiaW1hZ2Uvd2VicFwiKS5pbmRleE9mKFwiZGF0YTppbWFnZS93ZWJwXCIpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9RGF0ZS5wYXJzZShuZXcgRGF0ZSksbj10LWUsbz1wYXJzZUludChuLzg2NGU1KSxyPXBhcnNlSW50KG4vMzZlNSksaT1wYXJzZUludChuLzZlNCksYT1wYXJzZUludChvLzMwKSx1PXBhcnNlSW50KGEvMTIpO3JldHVybiB1P3UrXCLlubTliY1cIjphP2ErXCLkuKrmnIjliY1cIjpvP28rXCLlpKnliY1cIjpyP3IrXCLlsI/ml7bliY1cIjppP2krXCLliIbpkp/liY1cIjpcIuWImuWImlwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9bmV3IERhdGUsbj1uZXcgRGF0ZShlKSxvPW4uZ2V0VGltZSgpLXQuZ2V0VGltZSgpLHI9MCxpPTAsYT0wLHU9MDtyZXR1cm4gbz49MCYmKHI9TWF0aC5mbG9vcihvLzFlMy8zNjAwLzI0KSxpPU1hdGguZmxvb3Ioby8xZTMvNjAvNjAlMjQpLGE9TWF0aC5mbG9vcihvLzFlMy82MCU2MCksdT1NYXRoLmZsb29yKG8vMWUzJTYwKSkscitcIuWkqSBcIitpK1wi5bCP5pe2IFwiK2ErXCLliIbpkp8gXCIrdStcIuenklwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7ZT1udWxsPT1lP3dpbmRvdy5sb2NhdGlvbi5ocmVmOmU7dmFyIHQ9ZS5zdWJzdHJpbmcoZS5sYXN0SW5kZXhPZihcIj9cIikrMSk7cmV0dXJuIHQ/SlNPTi5wYXJzZSgne1wiJytkZWNvZGVVUklDb21wb25lbnQodCkucmVwbGFjZSgvXCIvZywnXFxcXFwiJykucmVwbGFjZSgvJi9nLCdcIixcIicpLnJlcGxhY2UoLz0vZywnXCI6XCInKSsnXCJ9Jyk6e319ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtpZighZSlyZXR1cm5cIlwiO3ZhciB0PVtdO2Zvcih2YXIgbiBpbiBlKXt2YXIgbz1lW25dO2lmKG8gaW5zdGFuY2VvZiBBcnJheSlmb3IodmFyIHI9MDtyPG8ubGVuZ3RoOysrcil0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG4rXCJbXCIrcitcIl1cIikrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KG9bcl0pKTtlbHNlIHQucHVzaChlbmNvZGVVUklDb21wb25lbnQobikrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGVbbl0pKX1yZXR1cm4gdC5qb2luKFwiJlwiKX1lLmV4cG9ydHM9bn1dKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==