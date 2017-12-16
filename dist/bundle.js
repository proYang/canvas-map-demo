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
function drawLine(ctx, color, x1, y1, x2, y2) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
//画空心圆
function drawCircle(ctx, color, x, y, radius) {
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
        this.drawMove();
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
                    this.drawMove();
                    break;
                case 'measure':
                    this.clearCanvas(this.measureCanvas.getContext('2d'));
                    this.drawMeasure();
                    break;
                case 'all':
                    this.drawMap();
                    this.drawPeople();
                    this.clearCanvas(this.moveCanvas.getContext('2d'));
                    this.drawMove();
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
                pos = {
                    x: (pos.x - _this.options.imgX) / _this.options.imgScale,
                    y: (pos.y - _this.options.imgY) / _this.options.imgScale
                    // console.log(pos)
                    // drawCircle(this.measureCanvas.getContext('2d'), '#ff6922', pos.x, pos.y, 5)
                    // 未选择第一个点，直接return
                };if (clickNum === 0) return;
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
                    clickNum = 0;
                    clickTime = 0;
                } else {
                    var pos = _this.windowToCanvas(_this.measureCanvas, event.clientX, event.clientY);
                    // 单击开始测距
                    // console.log((pos.x - this.options.imgX) / this.options.imgScale, (pos.y - this.options.imgY) / this.options.imgScale)
                    pos = {
                        x: (pos.x - _this.options.imgX) / _this.options.imgScale,
                        y: (pos.y - _this.options.imgY) / _this.options.imgScale
                    };
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
                _this2.drawMove();
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
                    _this2.drawMove();
                };
                var mouseupListener = function mouseupListener(event) {
                    judgeBorder();
                    _this2.drawMap();
                    _this2.drawPeople();
                    // 重绘测距图层
                    _this2.clearCanvas(_this2.moveCanvas.getContext('2d'));
                    _this2.drawMove();
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

            if (this.isShowPath !== true) return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlZTM0ODY3YzEwZWU3ZjczODU3MSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyJdLCJuYW1lcyI6WyIkYXBwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJGJnIiwiJHBlb3BsZSIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJwZW9wbGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJnZXRBdHRyaWJ1dGUiLCJwZW9wbGVJbWFnZSIsImFwcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsIngiLCJ5IiwicHVzaCIsIm5hbWUiLCJjb2xvciIsIm1vdmUiLCJ1cGRhdGVDYW52YXMiLCJzaG93UGF0aCIsIiRydWxlciIsImlubmVySFRNTCIsImltZ1NjYWxlIiwiJHBvaW50ZXJYIiwiJHBvaW50ZXJZIiwicG9pbnRlclgiLCJwb2ludGVyWSIsIiRtZWFzdXJlIiwibWVhc3VyZSIsIiRtZWFzdXJlQ2FuY2VsIiwibW9ja1NlcnZlcjEiLCJzZXRJbnRlcnZhbCIsImZvckVhY2giLCJwZXJzb24iLCJpbmRleCIsImxlbmd0aCIsImxhc3QiLCJuZXh0IiwibW9ja1NlcnZlcjIiLCJtb2NrU2VydmVyMyIsImRyYXdMaW5lIiwiY3R4IiwieDEiLCJ5MSIsIngyIiwieTIiLCJzdHJva2VTdHlsZSIsImJlZ2luUGF0aCIsImxpbmVXaWR0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImNsb3NlUGF0aCIsImRyYXdDaXJjbGUiLCJyYWRpdXMiLCJhcmMiLCJmaWxsU3R5bGUiLCJmaWxsIiwiZHJhd1RleHQiLCJ0ZXh0IiwiZm9udCIsImZpbGxUZXh0IiwiY2FsY3VsYXRlTGVuZ3RoIiwiTWF0aCIsInNxcnQiLCJwb3ciLCJkZWZhdWx0T3B0aW9ucyIsInVuZGVmaW5lZCIsImltZ1giLCJpbWdZIiwiYW5pbWF0aW9uIiwiaXNNZWFzdXJpbmciLCJBcHAiLCJpc1Nob3dQYXRoIiwicmVuZGVyIiwibG9hZEJnSW1nIiwibG9hZFBlb3BsZUltZyIsImRyYXdNb3ZlIiwiYWRkRXZlbnQiLCJydW4iLCJiaW5kTWVhc3VyZUV2ZW50IiwiY29udGV4dCIsImRyYXdNYXAiLCJkcmF3UGVvcGxlIiwiY2xlYXJDYW52YXMiLCJtb3ZlQ2FudmFzIiwiZ2V0Q29udGV4dCIsIm1lYXN1cmVDYW52YXMiLCJkcmF3TWVhc3VyZSIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImxpbmVIZWlnaHQiLCJvdmVyZmxvdyIsImJhY2tncm91bmRDb2xvciIsImJnQ29sb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJtYXBDYW52YXMiLCJzZXRBdHRyaWJ1dGUiLCJjbG9uZU5vZGUiLCJwZW9wbGVDYW52YXMiLCIkY29udGFpbmVyIiwiY2xpY2tUaW1lIiwiY2xpY2tOdW0iLCJtb3ZlTnVtIiwibW91c2Vtb3ZlTGlzdGVuZXIiLCJjdXJzb3IiLCJwb3MiLCJ3aW5kb3dUb0NhbnZhcyIsImV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJwb2ludGVyIiwibW92ZUFyciIsImxhc3RQb2ludCIsImNsaWNrTGlzdGVuZXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwicG9wIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvYmoiLCJhcnIiLCJqdWRnZUJvcmRlciIsImJnSW1nIiwid2hlZWxEZWx0YSIsImRlbHRhWSIsInRoYXQiLCJwb3MxIiwibW91c2V1cExpc3RlbmVyIiwiY2FudmFzIiwiYmJveCIsImltZyIsIkltYWdlIiwic3JjIiwiZHJhd0ltYWdlIiwiY3VycmVudCIsInBlb3BsZUltZ1dpZHRoIiwicGVvcGxlSW1nSGVpZ2h0IiwidG90YWxMZW5ndGgiLCJ0b0ZpeGVkIiwiY2xlYXJSZWN0Iiwic3RlcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInZhbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVEsbUJBQW1CLFVBQVUsRUFBRSxFQUFFO0FBQzFFLENBQUM7Ozs7Ozs7QUNIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDOzs7Ozs7O0FDTHpDLDZCQUE2QjtBQUM3Qix1Q0FBdUM7Ozs7Ozs7QUNEdkM7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsZUFBZTtBQUNmLGVBQWU7QUFDZixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCOzs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ0xBOzs7O0FBQ0E7Ozs7QUFJQSxJQUFNQSxPQUFPQyxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxJQUFNQyxNQUFNRixTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxJQUFNRSxVQUFVSCxTQUFTQyxhQUFULENBQXVCLFNBQXZCLENBQWhCOztBQUdBLElBQU1HLFVBQVU7QUFDWkMsZUFBV04sSUFEQztBQUVaTyxZQUFRLEVBRkk7QUFHWkMscUJBQWlCTCxJQUFJTSxZQUFKLENBQWlCLEtBQWpCLENBSEw7QUFJWkMsaUJBQWFOLFFBQVFLLFlBQVIsQ0FBcUIsS0FBckI7QUFKRCxDQUFoQjtBQU1BLElBQUlFLE1BQU0sbUJBQVFOLE9BQVIsQ0FBVjs7QUFFQTtBQUNBSixTQUFTQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDVSxnQkFBakMsQ0FBa0QsT0FBbEQsRUFBMkQsWUFBTTtBQUFBLGdDQUl6RFosS0FBS2EscUJBQUwsRUFKeUQ7QUFBQSxRQUV6REMsS0FGeUQseUJBRXpEQSxLQUZ5RDtBQUFBLFFBR3pEQyxNQUh5RCx5QkFHekRBLE1BSHlEOztBQUs3RCxRQUFJQyxJQUFJLHVCQUFVLENBQVYsRUFBYUYsS0FBYixDQUFSO0FBQ0EsUUFBSUcsSUFBSSx1QkFBVSxDQUFWLEVBQWFGLE1BQWIsQ0FBUjtBQUNBVixZQUFRRSxNQUFSLENBQWVXLElBQWYsQ0FBb0I7QUFDaEJDLGNBQU0sS0FEVTtBQUVoQkMsZUFBTywwQkFGUztBQUdoQkMsY0FBTSxDQUFDO0FBQ0hMLGdCQURHO0FBRUhDO0FBRkcsU0FBRDtBQUhVLEtBQXBCO0FBUUE7QUFDQU4sUUFBSVcsWUFBSixDQUFpQixRQUFqQjtBQUNBWCxRQUFJVyxZQUFKLENBQWlCLE1BQWpCO0FBQ0gsQ0FsQkQ7O0FBb0JBO0FBQ0FYLElBQUlZLFFBQUosR0FBZSxJQUFmO0FBQ0F0QixTQUFTQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDVSxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNEQsWUFBTTtBQUM5REQsUUFBSVksUUFBSixHQUFlLElBQWY7QUFDQVosUUFBSVcsWUFBSixDQUFpQixNQUFqQjtBQUNILENBSEQ7QUFJQXJCLFNBQVNDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0NVLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxZQUFNO0FBQ2hFRCxRQUFJWSxRQUFKLEdBQWUsS0FBZjtBQUNBWixRQUFJVyxZQUFKLENBQWlCLE1BQWpCO0FBQ0gsQ0FIRDs7QUFLQTtBQUNBLElBQU1FLFNBQVN2QixTQUFTQyxhQUFULENBQXVCLFVBQXZCLENBQWY7QUFDQXNCLE9BQU9DLFNBQVAsU0FBdUJkLElBQUlOLE9BQUosQ0FBWXFCLFFBQW5DO0FBQ0ExQixLQUFLWSxnQkFBTCxDQUFzQixZQUF0QixFQUFvQyxZQUFNO0FBQ3RDWSxXQUFPQyxTQUFQLFNBQXVCZCxJQUFJTixPQUFKLENBQVlxQixRQUFuQztBQUNILENBRkQ7O0FBSUE7QUFDQSxJQUFNQyxZQUFZMUIsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUFsQjtBQUNBLElBQU0wQixZQUFZM0IsU0FBU0MsYUFBVCxDQUF1QixjQUF2QixDQUFsQjtBQUNBRixLQUFLWSxnQkFBTCxDQUFzQixXQUF0QixFQUFtQyxZQUFNO0FBQ3JDZSxjQUFVRixTQUFWLFVBQTJCZCxJQUFJTixPQUFKLENBQVl3QixRQUF2QztBQUNBRCxjQUFVSCxTQUFWLFVBQTJCZCxJQUFJTixPQUFKLENBQVl5QixRQUF2QztBQUNILENBSEQ7O0FBTUEsSUFBTUMsV0FBVzlCLFNBQVNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBakI7QUFDQTZCLFNBQVNuQixnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFNO0FBQ3JDRCxRQUFJcUIsT0FBSjtBQUNILENBRkQ7QUFHQSxJQUFNQyxpQkFBaUJoQyxTQUFTQyxhQUFULENBQXVCLG1CQUF2QixDQUF2QjtBQUNBK0IsZUFBZXJCLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDLFlBQU07QUFDM0NELFFBQUlOLE9BQUosQ0FBWTJCLE9BQVosR0FBc0IsRUFBdEI7QUFDQXJCLFFBQUlXLFlBQUosQ0FBaUIsU0FBakI7QUFDSCxDQUhEOztBQUtBO0FBQ0EsSUFBSVksY0FBY0MsWUFBWSxZQUFNO0FBQ2hDeEIsUUFBSU4sT0FBSixDQUFZRSxNQUFaLENBQW1CNkIsT0FBbkIsQ0FBMkIsVUFBQ0MsTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQzFDLFlBQUlDLFNBQVNGLE9BQU9oQixJQUFQLENBQVlrQixNQUF6QjtBQUNBLFlBQUlDLE9BQU9ILE9BQU9oQixJQUFQLENBQVksRUFBRWtCLE1BQWQsQ0FBWDtBQUNBLFlBQUlFLE9BQU87QUFDUHpCLGVBQUd3QixLQUFLeEIsQ0FBTCxHQUFTLHVCQUFVLENBQUMsRUFBWCxFQUFlLEVBQWYsQ0FETDtBQUVQQyxlQUFHdUIsS0FBS3ZCLENBQUwsR0FBUyx1QkFBVSxDQUFDLEVBQVgsRUFBZSxFQUFmO0FBRkwsU0FBWDtBQUlBTixZQUFJTixPQUFKLENBQVlFLE1BQVosQ0FBbUIrQixLQUFuQixFQUEwQmpCLElBQTFCLENBQStCSCxJQUEvQixDQUFvQ3VCLElBQXBDO0FBQ0gsS0FSRDtBQVNILENBVmlCLEVBVWYsR0FWZSxDQUFsQjtBQVdBLElBQUlDLGNBQWNQLFlBQVksWUFBTTtBQUNoQ3hCLFFBQUlOLE9BQUosQ0FBWUUsTUFBWixDQUFtQjZCLE9BQW5CLENBQTJCLFVBQUNDLE1BQUQsRUFBU0MsS0FBVCxFQUFtQjtBQUMxQyxZQUFJQyxTQUFTRixPQUFPaEIsSUFBUCxDQUFZa0IsTUFBekI7QUFDQSxZQUFJQyxPQUFPSCxPQUFPaEIsSUFBUCxDQUFZLEVBQUVrQixNQUFkLENBQVg7QUFDQSxZQUFJRSxPQUFPO0FBQ1B6QixlQUFHd0IsS0FBS3hCLENBQUwsR0FBUyx1QkFBVSxDQUFDLEVBQVgsRUFBZSxFQUFmLENBREw7QUFFUEMsZUFBR3VCLEtBQUt2QixDQUFMLEdBQVMsdUJBQVUsQ0FBQyxFQUFYLEVBQWUsRUFBZjtBQUZMLFNBQVg7QUFJQU4sWUFBSU4sT0FBSixDQUFZRSxNQUFaLENBQW1CK0IsS0FBbkIsRUFBMEJqQixJQUExQixDQUErQkgsSUFBL0IsQ0FBb0N1QixJQUFwQztBQUNILEtBUkQ7QUFTSCxDQVZpQixFQVVmLEdBVmUsQ0FBbEI7QUFXQSxJQUFJRSxjQUFjUixZQUFZLFlBQU07QUFDaEN4QixRQUFJTixPQUFKLENBQVlFLE1BQVosQ0FBbUI2QixPQUFuQixDQUEyQixVQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDMUMsWUFBSUMsU0FBU0YsT0FBT2hCLElBQVAsQ0FBWWtCLE1BQXpCO0FBQ0EsWUFBSUMsT0FBT0gsT0FBT2hCLElBQVAsQ0FBWSxFQUFFa0IsTUFBZCxDQUFYO0FBQ0EsWUFBSUUsT0FBTztBQUNQekIsZUFBR3dCLEtBQUt4QixDQUFMLEdBQVMsdUJBQVUsQ0FBQyxFQUFYLEVBQWUsRUFBZixDQURMO0FBRVBDLGVBQUd1QixLQUFLdkIsQ0FBTCxHQUFTLHVCQUFVLENBQUMsRUFBWCxFQUFlLEVBQWY7QUFGTCxTQUFYO0FBSUFOLFlBQUlOLE9BQUosQ0FBWUUsTUFBWixDQUFtQitCLEtBQW5CLEVBQTBCakIsSUFBMUIsQ0FBK0JILElBQS9CLENBQW9DdUIsSUFBcEM7QUFDSCxLQVJEO0FBU0gsQ0FWaUIsRUFVZixJQVZlLENBQWxCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25HQTtBQUNBLFNBQVNHLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCekIsS0FBdkIsRUFBOEIwQixFQUE5QixFQUFrQ0MsRUFBbEMsRUFBc0NDLEVBQXRDLEVBQTBDQyxFQUExQyxFQUE4QztBQUMxQ0osUUFBSUssV0FBSixHQUFrQjlCLEtBQWxCO0FBQ0F5QixRQUFJTSxTQUFKO0FBQ0FOLFFBQUlPLFNBQUosR0FBZ0IsQ0FBaEI7QUFDQVAsUUFBSVEsTUFBSixDQUFXUCxFQUFYLEVBQWVDLEVBQWY7QUFDQUYsUUFBSVMsTUFBSixDQUFXTixFQUFYLEVBQWVDLEVBQWY7QUFDQUosUUFBSVUsTUFBSjtBQUNBVixRQUFJVyxTQUFKO0FBQ0g7QUFDRDtBQUNBLFNBQVNDLFVBQVQsQ0FBb0JaLEdBQXBCLEVBQXlCekIsS0FBekIsRUFBZ0NKLENBQWhDLEVBQW1DQyxDQUFuQyxFQUFzQ3lDLE1BQXRDLEVBQThDO0FBQzFDO0FBQ0FiLFFBQUlNLFNBQUo7QUFDQU4sUUFBSWMsR0FBSixDQUFRM0MsQ0FBUixFQUFXQyxDQUFYLEVBQWN5QyxNQUFkLEVBQXNCLENBQXRCLEVBQXlCLEdBQXpCLEVBQThCLEtBQTlCO0FBQ0FiLFFBQUllLFNBQUosR0FBZ0IsTUFBaEIsQ0FKMEMsQ0FJbEI7QUFDeEJmLFFBQUlnQixJQUFKLEdBTDBDLENBSzlCO0FBQ1poQixRQUFJTyxTQUFKLEdBQWdCLENBQWhCO0FBQ0FQLFFBQUlLLFdBQUosR0FBa0I5QixLQUFsQjtBQUNBeUIsUUFBSVUsTUFBSixHQVIwQyxDQVE1QjtBQUNkVixRQUFJVyxTQUFKO0FBQ0g7O0FBRUQsU0FBU00sUUFBVCxDQUFrQmpCLEdBQWxCLEVBQXVCN0IsQ0FBdkIsRUFBMEJDLENBQTFCLEVBQTZCOEMsSUFBN0IsRUFBbUM7QUFDL0JsQixRQUFJbUIsSUFBSixHQUFXLFlBQVg7QUFDQW5CLFFBQUllLFNBQUosR0FBZ0IsU0FBaEI7QUFDQWYsUUFBSW9CLFFBQUosQ0FBYUYsSUFBYixFQUFtQi9DLElBQUksQ0FBdkIsRUFBMEJDLElBQUksQ0FBOUI7QUFDSDtBQUNEO0FBQ0EsU0FBU2lELGVBQVQsQ0FBeUJwQixFQUF6QixFQUE2QkMsRUFBN0IsRUFBaUNDLEVBQWpDLEVBQXFDQyxFQUFyQyxFQUF5QztBQUNyQyxRQUFJakMsSUFBSThCLEtBQUtFLEVBQWI7QUFDQSxRQUFJL0IsSUFBSThCLEtBQUtFLEVBQWI7QUFDQSxXQUFPa0IsS0FBS0MsSUFBTCxDQUFVRCxLQUFLRSxHQUFMLENBQVNyRCxDQUFULEVBQVksQ0FBWixJQUFpQm1ELEtBQUtFLEdBQUwsQ0FBU3BELENBQVQsRUFBWSxDQUFaLENBQTNCLENBQVA7QUFDSDs7QUFFRCxJQUFNcUQsaUJBQWlCO0FBQ25CaEUsZUFBVyxJQURRLEVBQ0Y7QUFDakJDLFlBQVEsRUFGVyxFQUVQO0FBQ1p5QixhQUFTLEVBSFUsRUFHTjtBQUNieEIscUJBQWlCK0QsU0FKRSxFQUlTO0FBQzVCN0MsY0FBVSxDQUxTLEVBS047QUFDYjhDLFVBQU0sQ0FOYSxFQU1WO0FBQ1RDLFVBQU0sQ0FQYSxFQU9WO0FBQ1Q1QyxjQUFVLENBUlM7QUFTbkJDLGNBQVUsQ0FUUztBQVVuQjRDLGVBQVdILFNBVlE7QUFXbkJJLGlCQUFhLEtBWE0sQ0FXQTtBQVhBLENBQXZCOztJQWNNQyxHO0FBQ0YsbUJBQTBCO0FBQUEsWUFBZHZFLE9BQWMsdUVBQUosRUFBSTtBQUFBOztBQUN0QkEsa0JBQVUsc0JBQWMsRUFBZCxFQUFrQmlFLGNBQWxCLEVBQWtDakUsT0FBbEMsQ0FBVjtBQUNBLGFBQUt3RSxVQUFMLEdBQWtCLEtBQWxCLENBRnNCLENBRUc7QUFDekIsYUFBS3hFLE9BQUwsR0FBZUEsT0FBZjs7QUFFQSxhQUFLeUUsTUFBTDtBQUNBLGFBQUtDLFNBQUw7QUFDQSxhQUFLQyxhQUFMO0FBQ0EsYUFBS0MsUUFBTDtBQUNBLGFBQUtDLFFBQUw7QUFDQSxhQUFLQyxHQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztBQU9BOzs7O2tDQUlVO0FBQ047QUFDQTtBQUNBLGdCQUFJLEtBQUs5RSxPQUFMLENBQWFzRSxXQUFiLEtBQTZCLElBQWpDLEVBQXVDO0FBQ3ZDLGlCQUFLUyxnQkFBTDtBQUNBLGlCQUFLL0UsT0FBTCxDQUFhc0UsV0FBYixHQUEyQixJQUEzQjtBQUNIOztBQUVEOzs7Ozs7OztxQ0FLYVUsTyxFQUFTO0FBQ2xCO0FBQ0Esb0JBQVFBLE9BQVI7QUFDSSxxQkFBSyxLQUFMO0FBQ0kseUJBQUtDLE9BQUw7QUFDQTtBQUNKLHFCQUFLLFFBQUw7QUFDSSx5QkFBS0MsVUFBTDtBQUNBO0FBQ0oscUJBQUssTUFBTDtBQUNJLHlCQUFLQyxXQUFMLENBQWlCLEtBQUtDLFVBQUwsQ0FBZ0JDLFVBQWhCLENBQTJCLElBQTNCLENBQWpCO0FBQ0EseUJBQUtULFFBQUw7QUFDQTtBQUNKLHFCQUFLLFNBQUw7QUFDSSx5QkFBS08sV0FBTCxDQUFpQixLQUFLRyxhQUFMLENBQW1CRCxVQUFuQixDQUE4QixJQUE5QixDQUFqQjtBQUNBLHlCQUFLRSxXQUFMO0FBQ0E7QUFDSixxQkFBSyxLQUFMO0FBQ0kseUJBQUtOLE9BQUw7QUFDQSx5QkFBS0MsVUFBTDtBQUNBLHlCQUFLQyxXQUFMLENBQWlCLEtBQUtDLFVBQUwsQ0FBZ0JDLFVBQWhCLENBQTJCLElBQTNCLENBQWpCO0FBQ0EseUJBQUtULFFBQUw7QUFDQTtBQUNKO0FBQ0k7QUF0QlI7QUF3Qkg7OztpQ0FFUTtBQUNMLGdCQUFJNUUsVUFBVSxLQUFLQSxPQUFuQjtBQUNBLGdCQUFJQyxZQUFZRCxRQUFRQyxTQUFSLElBQXFCTCxTQUFTNEYsYUFBVCxDQUF1QixLQUF2QixDQUFyQztBQUNBLGdCQUFJLENBQUN4RixRQUFRQyxTQUFiLEVBQXdCO0FBQ3BCLHNDQUFjQSxVQUFVd0YsS0FBeEIsRUFBK0I7QUFDM0JDLDhCQUFVLFVBRGlCO0FBRTNCQyx5QkFBSyxDQUZzQjtBQUczQkMsMEJBQU0sQ0FIcUI7QUFJM0JuRiwyQkFBTyxNQUpvQjtBQUszQkMsNEJBQVEsTUFMbUI7QUFNM0JtRixnQ0FBWSxNQU5lO0FBTzNCQyw4QkFBVSxRQVBpQjtBQVEzQkMscUNBQWlCL0YsUUFBUWdHO0FBUkUsaUJBQS9CO0FBVUFwRyx5QkFBU3FHLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmpHLFNBQTFCO0FBQ0g7O0FBRUQsaUJBQUtBLFNBQUwsR0FBaUJBLFNBQWpCOztBQWpCSyx3Q0FzQkRBLFVBQVVPLHFCQUFWLEVBdEJDO0FBQUEsZ0JBb0JEQyxLQXBCQyx5QkFvQkRBLEtBcEJDO0FBQUEsZ0JBcUJEQyxNQXJCQyx5QkFxQkRBLE1BckJDOztBQXdCTDs7O0FBQ0EsZ0JBQUl5RixZQUFZdkcsU0FBUzRGLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBaEI7QUFDQSxrQ0FBY1csVUFBVVYsS0FBeEIsRUFBK0I7QUFDM0JDLDBCQUFVLFVBRGlCO0FBRTNCQyxxQkFBSyxHQUZzQjtBQUczQkMsc0JBQU0sR0FIcUI7QUFJM0JuRix1QkFBVUEsS0FBVixPQUoyQjtBQUszQkMsd0JBQVdBLE1BQVg7QUFMMkIsYUFBL0I7QUFPQXlGLHNCQUFVQyxZQUFWLENBQXVCLE9BQXZCLEVBQW1DM0YsS0FBbkM7QUFDQTBGLHNCQUFVQyxZQUFWLENBQXVCLFFBQXZCLEVBQW9DMUYsTUFBcEM7O0FBRUE7QUFDQSxnQkFBSTBFLGFBQWFlLFVBQVVFLFNBQVYsQ0FBb0IsSUFBcEIsQ0FBakI7O0FBRUE7QUFDQSxnQkFBSUMsZUFBZUgsVUFBVUUsU0FBVixDQUFvQixJQUFwQixDQUFuQjtBQUNBO0FBQ0EsZ0JBQUlmLGdCQUFnQmEsVUFBVUUsU0FBVixDQUFvQixJQUFwQixDQUFwQjs7QUFFQXBHLHNCQUFVaUcsV0FBVixDQUFzQkMsU0FBdEI7QUFDQWxHLHNCQUFVaUcsV0FBVixDQUFzQmQsVUFBdEI7QUFDQW5GLHNCQUFVaUcsV0FBVixDQUFzQkksWUFBdEI7QUFDQXJHLHNCQUFVaUcsV0FBVixDQUFzQlosYUFBdEI7O0FBRUEsaUJBQUthLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsaUJBQUtmLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsaUJBQUtrQixZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLGlCQUFLaEIsYUFBTCxHQUFxQkEsYUFBckI7QUFDSDs7OzJDQUVrQjtBQUFBOztBQUNmLGdCQUFJaUIsYUFBYSxLQUFLdEcsU0FBdEI7QUFDQSxnQkFBSXVHLFlBQVksQ0FBaEI7QUFDQSxnQkFBSUMsV0FBVyxDQUFmO0FBQ0EsZ0JBQUlDLFVBQVUsQ0FBZDtBQUNBLGdCQUFJQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixRQUFTO0FBQzdCSiwyQkFBV2QsS0FBWCxDQUFpQm1CLE1BQWpCLEdBQTBCLFNBQTFCO0FBQ0Esb0JBQUlDLE1BQU0sTUFBS0MsY0FBTCxDQUFvQixNQUFLeEIsYUFBekIsRUFBd0N5QixNQUFNQyxPQUE5QyxFQUF1REQsTUFBTUUsT0FBN0QsQ0FBVjtBQUNBSixzQkFBTTtBQUNGbEcsdUJBQUcsQ0FBQ2tHLElBQUlsRyxDQUFKLEdBQVEsTUFBS1gsT0FBTCxDQUFhbUUsSUFBdEIsSUFBOEIsTUFBS25FLE9BQUwsQ0FBYXFCLFFBRDVDO0FBRUZULHVCQUFHLENBQUNpRyxJQUFJakcsQ0FBSixHQUFRLE1BQUtaLE9BQUwsQ0FBYW9FLElBQXRCLElBQThCLE1BQUtwRSxPQUFMLENBQWFxQjtBQUVsRDtBQUNBO0FBQ0E7QUFOTSxpQkFBTixDQU9BLElBQUlvRixhQUFhLENBQWpCLEVBQW9CO0FBQ3BCLG9CQUFJUyxVQUFVLE1BQUtsSCxPQUFMLENBQWEyQixPQUFiLENBQXFCLE1BQUszQixPQUFMLENBQWEyQixPQUFiLENBQXFCTyxNQUFyQixHQUE4QixDQUFuRCxFQUFzRGdGLE9BQXBFO0FBQ0Esb0JBQUlDLFVBQVUsTUFBS25ILE9BQUwsQ0FBYTJCLE9BQWIsQ0FBcUIsTUFBSzNCLE9BQUwsQ0FBYTJCLE9BQWIsQ0FBcUJPLE1BQXJCLEdBQThCLENBQW5ELEVBQXNEbEIsSUFBcEU7QUFDQSxvQkFBSW9HLFlBQVlELFFBQVFBLFFBQVFqRixNQUFSLEdBQWlCLENBQXpCLENBQWhCO0FBQ0Esc0NBQWNnRixPQUFkLEVBQXVCTCxHQUF2QjtBQUNBQSxzQkFBTTtBQUNGbEcsdUJBQUdrRyxJQUFJbEcsQ0FETDtBQUVGQyx1QkFBR2lHLElBQUlqRztBQUZMLGlCQUFOO0FBSUEsb0JBQUk4RixZQUFZLENBQWhCLEVBQW1CO0FBQ2ZTLDRCQUFRdEcsSUFBUixDQUFhZ0csR0FBYjtBQUNBSCw4QkFBVSxDQUFWO0FBQ0gsaUJBSEQsTUFHTztBQUNIUyw0QkFBUUEsUUFBUWpGLE1BQVIsR0FBaUIsQ0FBekIsSUFBOEIyRSxHQUE5QjtBQUNIO0FBQ0osYUF6QkQ7QUEwQkEsZ0JBQUlRLGdCQUFnQixTQUFoQkEsYUFBZ0IsUUFBUztBQUN6QmQsMkJBQVdkLEtBQVgsQ0FBaUJtQixNQUFqQixHQUEwQixTQUExQjtBQUNBLG9CQUFJVSxjQUFjLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUFsQjtBQUNBLG9CQUFJRixjQUFjZCxTQUFkLElBQTJCLEdBQTNCLElBQWtDYyxjQUFjZCxTQUFkLElBQTJCLEdBQWpFLEVBQXNFO0FBQ2xFO0FBQ0Esd0JBQUlXLFVBQVUsTUFBS25ILE9BQUwsQ0FBYTJCLE9BQWIsQ0FBcUIsTUFBSzNCLE9BQUwsQ0FBYTJCLE9BQWIsQ0FBcUJPLE1BQXJCLEdBQThCLENBQW5ELEVBQXNEbEIsSUFBcEU7QUFDQW1HLDRCQUFRTSxHQUFSO0FBQ0FDLDRCQUFRQyxHQUFSLENBQVksTUFBSzNILE9BQUwsQ0FBYTJCLE9BQXpCO0FBQ0E0RSwrQkFBV3FCLG1CQUFYLENBQStCLFdBQS9CLEVBQTRDakIsaUJBQTVDO0FBQ0FKLCtCQUFXcUIsbUJBQVgsQ0FBK0IsT0FBL0IsRUFBd0NQLGFBQXhDO0FBQ0EsMEJBQUtySCxPQUFMLENBQWFzRSxXQUFiLEdBQTJCLEtBQTNCO0FBQ0FtQywrQkFBVyxDQUFYO0FBQ0FELGdDQUFZLENBQVo7QUFDSCxpQkFWRCxNQVVPO0FBQ0gsd0JBQUlLLE1BQU0sTUFBS0MsY0FBTCxDQUFvQixNQUFLeEIsYUFBekIsRUFBd0N5QixNQUFNQyxPQUE5QyxFQUF1REQsTUFBTUUsT0FBN0QsQ0FBVjtBQUNBO0FBQ0E7QUFDQUosMEJBQU07QUFDRmxHLDJCQUFHLENBQUNrRyxJQUFJbEcsQ0FBSixHQUFRLE1BQUtYLE9BQUwsQ0FBYW1FLElBQXRCLElBQThCLE1BQUtuRSxPQUFMLENBQWFxQixRQUQ1QztBQUVGVCwyQkFBRyxDQUFDaUcsSUFBSWpHLENBQUosR0FBUSxNQUFLWixPQUFMLENBQWFvRSxJQUF0QixJQUE4QixNQUFLcEUsT0FBTCxDQUFhcUI7QUFGNUMscUJBQU47QUFJQSx3QkFBSW9GLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEI7QUFDQSw0QkFBSW9CLE1BQU07QUFDTlgscUNBQVM7QUFDTHZHLG1DQUFHa0csSUFBSWxHLENBREY7QUFFTEMsbUNBQUdpRyxJQUFJakc7QUFGRiw2QkFESDtBQUtOSSxrQ0FBTSxDQUFDO0FBQ0hMLG1DQUFHa0csSUFBSWxHLENBREo7QUFFSEMsbUNBQUdpRyxJQUFJakc7QUFGSiw2QkFBRDtBQUxBLHlCQUFWO0FBVUEsOEJBQUtaLE9BQUwsQ0FBYTJCLE9BQWIsQ0FBcUJkLElBQXJCLENBQTBCZ0gsR0FBMUI7QUFDQXBCO0FBQ0gscUJBZEQsTUFjTztBQUNIO0FBQ0EsNEJBQUl4RSxRQUFRLE1BQUtqQyxPQUFMLENBQWEyQixPQUFiLENBQXFCTyxNQUFqQztBQUNBLDRCQUFJZ0YsVUFBVSxNQUFLbEgsT0FBTCxDQUFhMkIsT0FBYixDQUFxQk0sUUFBUSxDQUE3QixFQUFnQ2lGLE9BQTlDO0FBQ0EsNEJBQUlZLE1BQU0sTUFBSzlILE9BQUwsQ0FBYTJCLE9BQWIsQ0FBcUJNLFFBQVEsQ0FBN0IsRUFBZ0NqQixJQUExQztBQUNBO0FBQ0EsNEJBQUlvRyxZQUFZVSxJQUFJQSxJQUFJNUYsTUFBSixHQUFhLENBQWpCLENBQWhCO0FBQ0EyRSw4QkFBTTtBQUNGbEcsK0JBQUdrRyxJQUFJbEcsQ0FETDtBQUVGQywrQkFBR2lHLElBQUlqRztBQUZMLHlCQUFOO0FBSUEsOENBQWNzRyxPQUFkLEVBQXVCTCxHQUF2QjtBQUNBaUIsNEJBQUlqSCxJQUFKLENBQVNnRyxHQUFUO0FBQ0g7QUFFSjtBQUNETCw0QkFBWSxJQUFJZSxJQUFKLEdBQVdDLE9BQVgsRUFBWjtBQUNILGFBcEREO0FBcURBakIsdUJBQVdoRyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQzhHLGFBQXJDO0FBQ0FkLHVCQUFXaEcsZ0JBQVgsQ0FBNEIsV0FBNUIsRUFBeUNvRyxpQkFBekM7QUFDSDs7O21DQUNVO0FBQUE7O0FBQ1AsZ0JBQUlKLGFBQWEsS0FBS3RHLFNBQXRCO0FBQ0EsZ0JBQUk4SCxjQUFjLFNBQWRBLFdBQWMsR0FBTTtBQUNwQjtBQURvQiw0Q0FLaEIsT0FBSzVCLFNBQUwsQ0FBZTNGLHFCQUFmLEVBTGdCO0FBQUEsb0JBR2hCQyxLQUhnQix5QkFHaEJBLEtBSGdCO0FBQUEsb0JBSWhCQyxNQUpnQix5QkFJaEJBLE1BSmdCOztBQU1wQixvQkFBSSxPQUFLVixPQUFMLENBQWFtRSxJQUFiLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLDJCQUFLbkUsT0FBTCxDQUFhbUUsSUFBYixHQUFvQixDQUFwQjtBQUNIO0FBQ0Qsb0JBQUksT0FBS25FLE9BQUwsQ0FBYW9FLElBQWIsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkIsMkJBQUtwRSxPQUFMLENBQWFvRSxJQUFiLEdBQW9CLENBQXBCO0FBQ0g7QUFDRCxvQkFBSSxPQUFLcEUsT0FBTCxDQUFhb0UsSUFBYixHQUFvQjFELE1BQXBCLEdBQTZCLENBQUMsT0FBS3NILEtBQUwsQ0FBV3RILE1BQVosR0FBcUIsT0FBS1YsT0FBTCxDQUFhcUIsUUFBbkUsRUFBNkU7QUFDekUsMkJBQUtyQixPQUFMLENBQWFvRSxJQUFiLEdBQW9CLENBQUMsT0FBSzRELEtBQUwsQ0FBV3RILE1BQVosR0FBcUIsT0FBS1YsT0FBTCxDQUFhcUIsUUFBbEMsR0FBNkNYLE1BQWpFO0FBQ0g7QUFDRCxvQkFBSSxPQUFLVixPQUFMLENBQWFtRSxJQUFiLEdBQW9CMUQsS0FBcEIsR0FBNEIsQ0FBQyxPQUFLdUgsS0FBTCxDQUFXdkgsS0FBWixHQUFvQixPQUFLVCxPQUFMLENBQWFxQixRQUFqRSxFQUEyRTtBQUN2RSwyQkFBS3JCLE9BQUwsQ0FBYW1FLElBQWIsR0FBb0IsQ0FBQyxPQUFLNkQsS0FBTCxDQUFXdkgsS0FBWixHQUFvQixPQUFLVCxPQUFMLENBQWFxQixRQUFqQyxHQUE0Q1osS0FBaEU7QUFDSDtBQUNKLGFBbEJEO0FBbUJBO0FBQ0E4Rix1QkFBV2hHLGdCQUFYLENBQTRCLFlBQTVCLEVBQTBDLGlCQUFTO0FBQUEsNkNBSTNDLE9BQUs0RixTQUFMLENBQWUzRixxQkFBZixFQUoyQztBQUFBLG9CQUUzQ0MsS0FGMkMsMEJBRTNDQSxLQUYyQztBQUFBLG9CQUczQ0MsTUFIMkMsMEJBRzNDQSxNQUgyQzs7QUFLL0Msb0JBQUltRyxNQUFNLE9BQUtDLGNBQUwsQ0FBb0IsT0FBS1gsU0FBekIsRUFBb0NZLE1BQU1DLE9BQTFDLEVBQW1ERCxNQUFNRSxPQUF6RCxDQUFWO0FBQ0Esb0JBQUlnQixhQUFhbEIsTUFBTWtCLFVBQU4sR0FBbUJsQixNQUFNa0IsVUFBekIsR0FBdUNsQixNQUFNbUIsTUFBTixHQUFnQixDQUFDLEVBQXpFO0FBQ0Esb0JBQUlELGFBQWEsQ0FBakIsRUFBb0I7QUFDaEI7QUFDQSx3QkFBSSxPQUFLRCxLQUFMLENBQVd2SCxLQUFYLEdBQW1CLE9BQUtULE9BQUwsQ0FBYXFCLFFBQWhDLEdBQTJDLENBQTNDLElBQWdELE9BQUsyRyxLQUFMLENBQVd2SCxLQUFYLEdBQW1CLENBQW5FLElBQXdFLE9BQUt1SCxLQUFMLENBQVd0SCxNQUFYLEdBQW9CLE9BQUtWLE9BQUwsQ0FBYXFCLFFBQWpDLEdBQTRDLENBQTVDLElBQWlELE9BQUsyRyxLQUFMLENBQVd0SCxNQUFYLEdBQW9CLENBQWpKLEVBQW9KO0FBQ2hKO0FBQ0EsK0JBQUtWLE9BQUwsQ0FBYXFCLFFBQWIsSUFBeUIsQ0FBekI7QUFDQSwrQkFBS3JCLE9BQUwsQ0FBYW1FLElBQWIsR0FBb0IsT0FBS25FLE9BQUwsQ0FBYW1FLElBQWIsR0FBb0IsQ0FBcEIsR0FBd0IwQyxJQUFJbEcsQ0FBaEQ7QUFDQSwrQkFBS1gsT0FBTCxDQUFhb0UsSUFBYixHQUFvQixPQUFLcEUsT0FBTCxDQUFhb0UsSUFBYixHQUFvQixDQUFwQixHQUF3QnlDLElBQUlqRyxDQUFoRDtBQUNILHFCQUxELE1BS087QUFDVixpQkFSRCxNQVFPO0FBQ0g7QUFDQSx3QkFBSSxPQUFLb0gsS0FBTCxDQUFXdkgsS0FBWCxHQUFtQixPQUFLVCxPQUFMLENBQWFxQixRQUFoQyxHQUEyQyxDQUEzQyxJQUFnRFosS0FBaEQsSUFBeUQsT0FBS3VILEtBQUwsQ0FBV3RILE1BQVgsR0FBb0IsT0FBS1YsT0FBTCxDQUFhcUIsUUFBakMsR0FBNEMsQ0FBNUMsSUFBaURYLE1BQTlHLEVBQXNIO0FBQ2xIO0FBQ0EsK0JBQUtWLE9BQUwsQ0FBYXFCLFFBQWIsSUFBeUIsQ0FBekI7QUFDQSwrQkFBS3JCLE9BQUwsQ0FBYW1FLElBQWIsR0FBb0IsT0FBS25FLE9BQUwsQ0FBYW1FLElBQWIsR0FBb0IsR0FBcEIsR0FBMEIwQyxJQUFJbEcsQ0FBSixHQUFRLEdBQXREO0FBQ0EsK0JBQUtYLE9BQUwsQ0FBYW9FLElBQWIsR0FBb0IsT0FBS3BFLE9BQUwsQ0FBYW9FLElBQWIsR0FBb0IsR0FBcEIsR0FBMEJ5QyxJQUFJakcsQ0FBSixHQUFRLEdBQXREO0FBQ0gscUJBTEQsTUFLTztBQUNWO0FBQ0RtSDtBQUNBLHVCQUFLOUMsT0FBTDtBQUNBLHVCQUFLQyxVQUFMO0FBQ0E7QUFDQSx1QkFBS0MsV0FBTCxDQUFpQixPQUFLRyxhQUFMLENBQW1CRCxVQUFuQixDQUE4QixJQUE5QixDQUFqQjtBQUNBLHVCQUFLRSxXQUFMO0FBQ0EsdUJBQUtKLFdBQUwsQ0FBaUIsT0FBS0MsVUFBTCxDQUFnQkMsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBakI7QUFDQSx1QkFBS1QsUUFBTDtBQUVILGFBakNEO0FBa0NBO0FBQ0EyQix1QkFBV2hHLGdCQUFYLENBQTRCLFdBQTVCLEVBQXlDLGlCQUFTO0FBQzlDLG9CQUFJNEgsYUFBSjtBQUNBLG9CQUFJdEIsTUFBTSxPQUFLQyxjQUFMLENBQW9CLE9BQUtYLFNBQXpCLEVBQW9DWSxNQUFNQyxPQUExQyxFQUFtREQsTUFBTUUsT0FBekQsQ0FBVjtBQUNBLG9CQUFJTixvQkFBb0IsU0FBcEJBLGlCQUFvQixRQUFTO0FBQzdCSiwrQkFBV2QsS0FBWCxDQUFpQm1CLE1BQWpCLEdBQTBCLE1BQTFCO0FBQ0Esd0JBQUl3QixPQUFPLE9BQUt0QixjQUFMLENBQW9CLE9BQUtYLFNBQXpCLEVBQW9DWSxNQUFNQyxPQUExQyxFQUFtREQsTUFBTUUsT0FBekQsQ0FBWDtBQUNBLHdCQUFJdEcsSUFBSXlILEtBQUt6SCxDQUFMLEdBQVNrRyxJQUFJbEcsQ0FBckI7QUFDQSx3QkFBSUMsSUFBSXdILEtBQUt4SCxDQUFMLEdBQVNpRyxJQUFJakcsQ0FBckI7QUFDQWlHLDBCQUFNdUIsSUFBTjtBQUNBLDJCQUFLcEksT0FBTCxDQUFhbUUsSUFBYixJQUFxQnhELENBQXJCO0FBQ0EsMkJBQUtYLE9BQUwsQ0FBYW9FLElBQWIsSUFBcUJ4RCxDQUFyQjtBQUNBLDJCQUFLcUUsT0FBTDtBQUNBLDJCQUFLQyxVQUFMO0FBQ0E7QUFDQSwyQkFBS0MsV0FBTCxDQUFpQixPQUFLRyxhQUFMLENBQW1CRCxVQUFuQixDQUE4QixJQUE5QixDQUFqQjtBQUNBLDJCQUFLRSxXQUFMO0FBQ0EsMkJBQUtKLFdBQUwsQ0FBaUIsT0FBS0MsVUFBTCxDQUFnQkMsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBakI7QUFDQSwyQkFBS1QsUUFBTDtBQUNILGlCQWZEO0FBZ0JBLG9CQUFJeUQsa0JBQWtCLFNBQWxCQSxlQUFrQixRQUFTO0FBQzNCTjtBQUNBLDJCQUFLOUMsT0FBTDtBQUNBLDJCQUFLQyxVQUFMO0FBQ0E7QUFDQSwyQkFBS0MsV0FBTCxDQUFpQixPQUFLQyxVQUFMLENBQWdCQyxVQUFoQixDQUEyQixJQUEzQixDQUFqQjtBQUNBLDJCQUFLVCxRQUFMO0FBQ0EyQiwrQkFBV3FCLG1CQUFYLENBQStCLFdBQS9CLEVBQTRDakIsaUJBQTVDO0FBQ0FKLCtCQUFXcUIsbUJBQVgsQ0FBK0IsU0FBL0IsRUFBMENTLGVBQTFDO0FBQ0E5QiwrQkFBV2QsS0FBWCxDQUFpQm1CLE1BQWpCLEdBQTBCLFNBQTFCO0FBQ0gsaUJBVkQ7QUFXQUwsMkJBQVdoRyxnQkFBWCxDQUE0QixXQUE1QixFQUF5Q29HLGlCQUF6QztBQUNBSiwyQkFBV2hHLGdCQUFYLENBQTRCLFNBQTVCLEVBQXVDOEgsZUFBdkM7QUFDQTlCLDJCQUFXaEcsZ0JBQVgsQ0FBNEIsWUFBNUIsRUFBMEM4SCxlQUExQztBQUNILGFBakNEO0FBa0NBO0FBQ0E5Qix1QkFBV2hHLGdCQUFYLENBQTRCLFdBQTVCLEVBQXlDLFlBQU07QUFBQSw2Q0FHdkMsT0FBSzRGLFNBQUwsQ0FBZTNGLHFCQUFmLEVBSHVDO0FBQUEsb0JBRXZDRSxNQUZ1QywwQkFFdkNBLE1BRnVDOztBQUkzQyxvQkFBSW1HLE1BQU0sT0FBS0MsY0FBTCxDQUFvQixPQUFLWCxTQUF6QixFQUFvQ1ksTUFBTUMsT0FBMUMsRUFBbURELE1BQU1FLE9BQXpELENBQVY7QUFDQSx1QkFBS2pILE9BQUwsQ0FBYXdCLFFBQWIsR0FBd0JxRixJQUFJbEcsQ0FBNUI7QUFDQSx1QkFBS1gsT0FBTCxDQUFheUIsUUFBYixHQUF3QmYsU0FBU21HLElBQUlqRyxDQUFyQztBQUNILGFBUEQ7QUFRSDs7O3VDQUVjMEgsTSxFQUFRM0gsQyxFQUFHQyxDLEVBQUc7QUFDekIsZ0JBQUkySCxPQUFPRCxPQUFPOUgscUJBQVAsRUFBWDtBQUNBLG1CQUFPO0FBQ0hHLG1CQUFHQSxJQUFJNEgsS0FBSzNDLElBQVQsR0FBZ0IsQ0FBQzJDLEtBQUs5SCxLQUFMLEdBQWE2SCxPQUFPN0gsS0FBckIsSUFBOEIsQ0FEOUM7QUFFSEcsbUJBQUdBLElBQUkySCxLQUFLNUMsR0FBVCxHQUFlLENBQUM0QyxLQUFLN0gsTUFBTCxHQUFjNEgsT0FBTzVILE1BQXRCLElBQWdDO0FBRi9DLGFBQVA7QUFJSDs7O29DQUVXO0FBQUE7O0FBQ1IsZ0JBQUk4SCxNQUFNLElBQUlDLEtBQUosRUFBVjtBQUNBRCxnQkFBSUUsR0FBSixHQUFVLEtBQUsxSSxPQUFMLENBQWFHLGVBQXZCO0FBQ0EsaUJBQUs2SCxLQUFMLEdBQWFRLEdBQWI7QUFDQUEsZ0JBQUlqSSxnQkFBSixDQUFxQixNQUFyQixFQUE2QixZQUFNO0FBQy9CLHVCQUFLMEUsT0FBTDtBQUNILGFBRkQ7QUFHSDs7O3dDQUNlO0FBQUE7O0FBQ1osZ0JBQUl1RCxNQUFNLElBQUlDLEtBQUosRUFBVjtBQUNBRCxnQkFBSUUsR0FBSixHQUFVLEtBQUsxSSxPQUFMLENBQWFLLFdBQXZCO0FBQ0EsaUJBQUtBLFdBQUwsR0FBbUJtSSxHQUFuQjtBQUNBQSxnQkFBSWpJLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLFlBQU07QUFDL0IsdUJBQUsyRSxVQUFMO0FBQ0gsYUFGRDtBQUdIO0FBQ0Q7Ozs7OztrQ0FHVTtBQUNOLGdCQUFJN0QsV0FBVyxLQUFLckIsT0FBTCxDQUFhcUIsUUFBNUI7QUFDQSxnQkFBSThDLE9BQU8sS0FBS25FLE9BQUwsQ0FBYW1FLElBQXhCO0FBQ0EsZ0JBQUlDLE9BQU8sS0FBS3BFLE9BQUwsQ0FBYW9FLElBQXhCO0FBQ0EsZ0JBQUlvRSxNQUFNLEtBQUtSLEtBQWY7QUFDQSxnQkFBSU0sU0FBUyxLQUFLbkMsU0FBbEI7QUFDQSxnQkFBSW5CLFVBQVUsS0FBS21CLFNBQUwsQ0FBZWQsVUFBZixDQUEwQixJQUExQixDQUFkO0FBQ0EsaUJBQUtGLFdBQUwsQ0FBaUJILE9BQWpCO0FBQ0FBLG9CQUFRMkQsU0FBUixDQUFrQkgsR0FBbEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkJBLElBQUkvSCxLQUFqQyxFQUF3QytILElBQUk5SCxNQUE1QyxFQUFvRHlELElBQXBELEVBQTBEQyxJQUExRCxFQUFnRW9FLElBQUkvSCxLQUFKLEdBQVlZLFFBQTVFLEVBQXNGbUgsSUFBSTlILE1BQUosR0FBYVcsUUFBbkc7QUFDSDs7O21DQUVVO0FBQUE7O0FBQ1AsZ0JBQUksS0FBS21ELFVBQUwsS0FBb0IsSUFBeEIsRUFBOEI7QUFDOUI7QUFDQSxnQkFBSVEsVUFBVSxLQUFLSSxVQUFMLENBQWdCQyxVQUFoQixDQUEyQixJQUEzQixDQUFkOztBQUhPLHlDQU1ILEtBQUtjLFNBQUwsQ0FBZTNGLHFCQUFmLEVBTkc7QUFBQSxnQkFLSEUsTUFMRywwQkFLSEEsTUFMRzs7QUFPUCxpQkFBS1YsT0FBTCxDQUFhRSxNQUFiLENBQW9CNkIsT0FBcEIsQ0FBNEIsZ0JBR3RCO0FBQUEsb0JBRkZmLElBRUUsUUFGRkEsSUFFRTtBQUFBLG9CQURGRCxLQUNFLFFBREZBLEtBQ0U7O0FBQ0Ysb0JBQUk2SCxnQkFBSjtBQUFBLG9CQUFhekcsYUFBYjtBQUNBLHFCQUFLLElBQUlGLEtBQVQsSUFBa0JqQixJQUFsQixFQUF3QjtBQUNwQjRILDhCQUFVNUgsS0FBS2lCLEtBQUwsQ0FBVjtBQUNBLHdCQUFJQSxVQUFVLEdBQWQsRUFBbUI7QUFDZkUsK0JBQU9uQixLQUFLaUIsS0FBTCxDQUFQO0FBQ0gscUJBRkQsTUFFTztBQUNIRSwrQkFBT25CLEtBQUssRUFBRWlCLEtBQVAsQ0FBUDtBQUNIO0FBQ0Qsd0JBQUksQ0FBQ2xCLEtBQUwsRUFBWTtBQUNaO0FBQ0FvQiwyQkFBTztBQUNIeEIsMkJBQUd3QixLQUFLeEIsQ0FBTCxHQUFTLE9BQUtYLE9BQUwsQ0FBYXFCLFFBQXRCLEdBQWlDLE9BQUtyQixPQUFMLENBQWFtRSxJQUQ5QztBQUVIdkQsMkJBQUcsQ0FBQ0YsU0FBU3lCLEtBQUt2QixDQUFmLElBQW9CLE9BQUtaLE9BQUwsQ0FBYXFCLFFBQWpDLEdBQTRDLE9BQUtyQixPQUFMLENBQWFvRTtBQUZ6RCxxQkFBUDtBQUlBd0UsOEJBQVU7QUFDTmpJLDJCQUFHaUksUUFBUWpJLENBQVIsR0FBWSxPQUFLWCxPQUFMLENBQWFxQixRQUF6QixHQUFvQyxPQUFLckIsT0FBTCxDQUFhbUUsSUFEOUM7QUFFTnZELDJCQUFHLENBQUNGLFNBQVNrSSxRQUFRaEksQ0FBbEIsSUFBdUIsT0FBS1osT0FBTCxDQUFhcUIsUUFBcEMsR0FBK0MsT0FBS3JCLE9BQUwsQ0FBYW9FO0FBRnpELHFCQUFWO0FBSUE3Qiw2QkFBU3lDLE9BQVQsRUFBa0JqRSxLQUFsQixFQUF5Qm9CLEtBQUt4QixDQUE5QixFQUFpQ3dCLEtBQUt2QixDQUF0QyxFQUF5Q2dJLFFBQVFqSSxDQUFqRCxFQUFvRGlJLFFBQVFoSSxDQUE1RCxFQUErRCxDQUEvRDtBQUNIO0FBQ0osYUF4QkQ7QUF5Qkg7OztxQ0FFWTtBQUFBOztBQUFBLGdCQUVMWixPQUZLLEdBS0wsSUFMSyxDQUVMQSxPQUZLO0FBQUEsZ0JBR0xzRyxZQUhLLEdBS0wsSUFMSyxDQUdMQSxZQUhLO0FBQUEsZ0JBSUxqRyxXQUpLLEdBS0wsSUFMSyxDQUlMQSxXQUpLOztBQU1ULGdCQUFJd0ksaUJBQWlCLEVBQXJCO0FBQ0EsZ0JBQUlDLGtCQUFrQixFQUF0QjtBQUNBLGdCQUFJOUQsVUFBVXNCLGFBQWFqQixVQUFiLENBQXdCLElBQXhCLENBQWQ7O0FBUlMseUNBV0wsS0FBS2MsU0FBTCxDQUFlM0YscUJBQWYsRUFYSztBQUFBLGdCQVVMRSxNQVZLLDBCQVVMQSxNQVZLOztBQVlULGlCQUFLeUUsV0FBTCxDQUFpQkgsT0FBakI7QUFDQWhGLG9CQUFRRSxNQUFSLENBQWU2QixPQUFmLENBQXVCLGlCQUVqQjtBQUFBLG9CQURGZixJQUNFLFNBREZBLElBQ0U7O0FBQ0Ysb0JBQUkwRSxXQUFXMUUsS0FBS0EsS0FBS2tCLE1BQUwsR0FBYyxDQUFuQixDQUFmO0FBQ0E7QUFDQXdELDJCQUFXO0FBQ1AvRSx1QkFBRytFLFNBQVMvRSxDQUFULEdBQWFYLFFBQVFxQixRQUFyQixHQUFnQyxPQUFLckIsT0FBTCxDQUFhbUUsSUFBN0MsR0FBb0QwRSxpQkFBaUIsQ0FEakU7QUFFUGpJLHVCQUFHLENBQUNGLFNBQVNnRixTQUFTOUUsQ0FBbkIsSUFBd0JaLFFBQVFxQixRQUFoQyxHQUEyQyxPQUFLckIsT0FBTCxDQUFhb0UsSUFBeEQsR0FBK0QwRSxrQkFBa0I7QUFGN0UsaUJBQVg7QUFJQTlELHdCQUFRMkQsU0FBUixDQUFrQnRJLFdBQWxCLEVBQStCcUYsU0FBUy9FLENBQXhDLEVBQTJDK0UsU0FBUzlFLENBQXBELEVBQXVEaUksY0FBdkQsRUFBdUVDLGVBQXZFO0FBQ0gsYUFWRDtBQVdIOzs7c0NBRWE7QUFBQTs7QUFDVjtBQURVLHlDQUlOLEtBQUszQyxTQUFMLENBQWUzRixxQkFBZixFQUpNO0FBQUEsZ0JBR05FLE1BSE0sMEJBR05BLE1BSE07O0FBQUEsZ0JBTU5WLE9BTk0sR0FRTixJQVJNLENBTU5BLE9BTk07QUFBQSxnQkFPTnNGLGFBUE0sR0FRTixJQVJNLENBT05BLGFBUE07QUFTVjs7QUFDQSxnQkFBSU4sVUFBVSxLQUFLTSxhQUFMLENBQW1CRCxVQUFuQixDQUE4QixJQUE5QixDQUFkO0FBQ0EsaUJBQUtyRixPQUFMLENBQWEyQixPQUFiLENBQXFCSSxPQUFyQixDQUE2QixpQkFFdkI7QUFBQSxvQkFERmYsSUFDRSxTQURGQSxJQUNFOztBQUNGLG9CQUFJNEgsZ0JBQUo7QUFBQSxvQkFBYXpHLGFBQWI7QUFBQSxvQkFBbUI0RyxjQUFjLENBQWpDO0FBQ0EscUJBQUssSUFBSTlHLEtBQVQsSUFBa0JqQixJQUFsQixFQUF3QjtBQUNwQjRILDhCQUFVNUgsS0FBS2lCLEtBQUwsQ0FBVjtBQUNBLHdCQUFJQSxVQUFVLEdBQWQsRUFBbUI7QUFDZkUsK0JBQU9uQixLQUFLaUIsS0FBTCxDQUFQO0FBQ0gscUJBRkQsTUFFTztBQUNIRSwrQkFBT25CLEtBQUssRUFBRWlCLEtBQVAsQ0FBUDtBQUNIO0FBQ0RFLDJCQUFPO0FBQ0h4QiwyQkFBR3dCLEtBQUt4QixDQUFMLEdBQVMsT0FBS1gsT0FBTCxDQUFhcUIsUUFBdEIsR0FBaUMsT0FBS3JCLE9BQUwsQ0FBYW1FLElBRDlDO0FBRUh2RCwyQkFBR3VCLEtBQUt2QixDQUFMLEdBQVMsT0FBS1osT0FBTCxDQUFhcUIsUUFBdEIsR0FBaUMsT0FBS3JCLE9BQUwsQ0FBYW9FO0FBRXJEO0FBSk8scUJBQVAsQ0FLQXdFLFVBQVU7QUFDTmpJLDJCQUFHaUksUUFBUWpJLENBQVIsR0FBWSxPQUFLWCxPQUFMLENBQWFxQixRQUF6QixHQUFvQyxPQUFLckIsT0FBTCxDQUFhbUUsSUFEOUM7QUFFTnZELDJCQUFHZ0ksUUFBUWhJLENBQVIsR0FBWSxPQUFLWixPQUFMLENBQWFxQixRQUF6QixHQUFvQyxPQUFLckIsT0FBTCxDQUFhb0U7QUFFeEQ7QUFKVSxxQkFBVixDQUtBN0IsU0FBU3lDLE9BQVQsRUFBa0IsU0FBbEIsRUFBNkI3QyxLQUFLeEIsQ0FBbEMsRUFBcUN3QixLQUFLdkIsQ0FBMUMsRUFBNkNnSSxRQUFRakksQ0FBckQsRUFBd0RpSSxRQUFRaEksQ0FBaEU7QUFDQXdDLCtCQUFXNEIsT0FBWCxFQUFvQixTQUFwQixFQUErQjRELFFBQVFqSSxDQUF2QyxFQUEwQ2lJLFFBQVFoSSxDQUFsRCxFQUFxRCxDQUFyRDtBQUNBLHdCQUFJOEMsT0FBTyxFQUFYO0FBQ0Esd0JBQUl6QixVQUFVLEdBQWQsRUFBbUI7QUFDZjtBQUNBeUIsK0JBQU8sSUFBUDtBQUNILHFCQUhELE1BR087QUFDSHFGLHNDQUFjQSxjQUFjbEYsZ0JBQWdCMUIsS0FBS3hCLENBQXJCLEVBQXdCd0IsS0FBS3ZCLENBQTdCLEVBQWdDZ0ksUUFBUWpJLENBQXhDLEVBQTJDaUksUUFBUWhJLENBQW5ELENBQTVCO0FBQ0E4QywrQkFBVSxDQUFDcUYsY0FBWSxPQUFLL0ksT0FBTCxDQUFhcUIsUUFBMUIsRUFBb0MySCxPQUFwQyxDQUE0QyxDQUE1QyxDQUFWO0FBQ0g7QUFDRHZGLDZCQUFTdUIsT0FBVCxFQUFrQjRELFFBQVFqSSxDQUExQixFQUE2QmlJLFFBQVFoSSxDQUFyQyxFQUF3QzhDLElBQXhDO0FBQ0g7QUFDSixhQWpDRDtBQWtDSDtBQUNEOzs7Ozs7OztvQ0FLWXNCLE8sRUFBUztBQUFBLGdCQUVibUIsU0FGYSxHQU1iLElBTmEsQ0FFYkEsU0FGYTtBQUFBLGdCQUdiZixVQUhhLEdBTWIsSUFOYSxDQUdiQSxVQUhhO0FBQUEsZ0JBSWJrQixZQUphLEdBTWIsSUFOYSxDQUliQSxZQUphO0FBQUEsZ0JBS2JoQixhQUxhLEdBTWIsSUFOYSxDQUtiQSxhQUxhOztBQUFBLHlDQVViLEtBQUthLFNBQUwsQ0FBZTNGLHFCQUFmLEVBVmE7QUFBQSxnQkFRYkMsS0FSYSwwQkFRYkEsS0FSYTtBQUFBLGdCQVNiQyxNQVRhLDBCQVNiQSxNQVRhOztBQVdqQixnQkFBSXNFLE9BQUosRUFBYTtBQUNUQSx3QkFBUWlFLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0J4SSxLQUF4QixFQUErQkMsTUFBL0I7QUFDSCxhQUZELE1BRU87QUFDSHlGLDBCQUFVOEMsU0FBVixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQnhJLEtBQTFCLEVBQWlDQyxNQUFqQztBQUNBMEUsMkJBQVc2RCxTQUFYLENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCeEksS0FBM0IsRUFBa0NDLE1BQWxDO0FBQ0E0Riw2QkFBYTJDLFNBQWIsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkJ4SSxLQUE3QixFQUFvQ0MsTUFBcEM7QUFDQTRFLDhCQUFjMkQsU0FBZCxDQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QnhJLEtBQTlCLEVBQXFDQyxNQUFyQztBQUNIO0FBQ0o7Ozs4QkFDSztBQUFBOztBQUNGO0FBQ0EsZ0JBQUksS0FBS1YsT0FBTCxDQUFhcUUsU0FBakIsRUFBNEI7QUFDNUIsZ0JBQUk2RSxPQUFPLFNBQVBBLElBQU8sR0FBTTtBQUNiLHVCQUFLakksWUFBTCxDQUFrQixRQUFsQjtBQUNBLHVCQUFLQSxZQUFMLENBQWtCLE1BQWxCO0FBQ0E7QUFDQSx1QkFBS0EsWUFBTCxDQUFrQixTQUFsQjtBQUNBLHVCQUFLakIsT0FBTCxDQUFhcUUsU0FBYixHQUF5QjhFLHNCQUFzQkQsSUFBdEIsQ0FBekI7QUFDSCxhQU5EO0FBT0EsaUJBQUtsSixPQUFMLENBQWFxRSxTQUFiLEdBQXlCOEUsc0JBQXNCRCxJQUF0QixDQUF6QjtBQUNIOzs7MEJBemRZRSxHLEVBQUs7QUFDZCxpQkFBSzVFLFVBQUwsR0FBa0I0RSxHQUFsQjtBQUNIOzs7OztrQkEwZFU3RSxHOzs7Ozs7QUM5aEJmLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBOztBQUVBLDBDQUEwQyxrQ0FBc0M7Ozs7Ozs7QUNIaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBLHFFQUFzRSxtQkFBbUIsVUFBVSxFQUFFLEVBQUU7QUFDdkcsQ0FBQzs7Ozs7OztBQ0ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsVUFBVSxFQUFFO0FBQ2hELG1CQUFtQixzQ0FBc0M7QUFDekQsQ0FBQyxxQ0FBcUM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7Ozs7Ozs7QUNqQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBOzs7Ozs7O0FDSEEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFlBQVksZUFBZTtBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEOzs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBLHVDQUF1QztBQUN2Qzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBOzs7Ozs7O0FDQUEsY0FBYzs7Ozs7OztBQ0FkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDUkE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEc7Ozs7OztBQzFCRCxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBLG9FQUF1RSwyQ0FBNEM7Ozs7Ozs7QUNGbkgsZUFBZSxxSUFBaUwsaUJBQWlCLG1CQUFtQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxpQkFBaUIsZ0JBQWdCLGdCQUFnQiwyREFBMkQsWUFBWSxlQUFlLGtCQUFrQixlQUFlLG1EQUFtRCxZQUFZLFlBQVksZUFBZSxhQUFhLDZGQUE2RixZQUFZLGVBQWUsY0FBYyw4QkFBOEIsWUFBWSxlQUFlLDRCQUE0QixhQUFhLGFBQWEsZ0NBQWdDLGFBQWEsU0FBUyw0Q0FBNEMsaUdBQWlHLFVBQVUsaURBQWlELGlCQUFpQixtUEFBbVAsV0FBVyxnYUFBZ2EsZUFBZSxnQkFBZ0Isa0JBQWtCLCtCQUErQixZQUFZLFdBQVcsNEJBQTRCLFNBQVMsWUFBWSxpQkFBaUIsZ0JBQWdCLDZCQUE2QixXQUFXLFlBQVksaUJBQWlCLGdCQUFnQixXQUFXLHdDQUF3Qyx3Q0FBd0MsV0FBVyxZQUFZLGVBQWUsY0FBYyxvREFBb0QsT0FBTyxXQUFXLEtBQUssc0JBQXNCLDJDQUEyQyxTQUFTLFlBQVksaUJBQWlCLGNBQWMsWUFBWSxXQUFXLFlBQVksZUFBZSxhQUFhLGlRQUFpUSwwTkFBME4sWUFBWSxlQUFlLGFBQWEsVUFBVSxxQ0FBcUMsZ2dCQUFnZ0IsWUFBWSxlQUFlLGNBQWMsV0FBVyxjQUFjLEVBQUUsMERBQTBELFNBQVMsWUFBWSxpQkFBaUIsZ0JBQWdCLHdCQUF3QixZQUFZLFVBQVUsYUFBYSxpQ0FBaUMsZ0RBQWdELDZDQUE2QyxHQUFHLGtCQUFrQixZQUFZLGtHQUFrRyxHQUFHLFlBQVksZUFBZSxnQkFBZ0IseUJBQXlCLHFDQUFxQyxzQ0FBc0MsNkNBQTZDLHlCQUF5QixvQkFBb0IsRUFBRSxZQUFZLGlCQUFpQixrQkFBa0IsMENBQTBDLFdBQVcsWUFBWSxlQUFlLGNBQWMsZ0VBQWdFLE9BQU8sbTZCQUFtNkIsb0ZBQW9GLFlBQVksZUFBZSxjQUFjLE1BQU0sNkRBQTZELGdFQUFnRSx1QkFBdUIsS0FBSyx1QkFBdUIsSUFBSSxpQkFBaUIsU0FBUyx3QkFBd0IsS0FBSyxtREFBbUQsU0FBUyxvRUFBb0UsOEVBQThFLGdCQUFnQixhQUFhLHFHQUFxRyxZQUFZLGVBQWUsY0FBYyxnR0FBZ0csOEVBQThFLGdCQUFnQixhQUFhLHFHQUFxRyxZQUFZLGVBQWUsYUFBYSx1RUFBdUUsWUFBWSxlQUFlLGdCQUFnQiwyQ0FBMkMsWUFBWSxlQUFlLGNBQWMsNERBQTRELFlBQVksZUFBZSxjQUFjLGtCQUFrQixFQUFFLHVDQUF1QyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUseUNBQXlDLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixZQUFZLGVBQWUsY0FBYyx5RUFBeUUsRUFBRSxXQUFXLFlBQVksZUFBZSxjQUFjLDhCQUE4QixNQUFNLFFBQVEsSUFBSSw0Q0FBNEMsWUFBWSxlQUFlLGNBQWMsNEdBQTRHLGNBQWMsaUJBQWlCLFdBQVcscUVBQXFFLHlCQUF5QixZQUFZLG1CQUFtQixLQUFLLGlCQUFpQixtQkFBbUIsMkNBQTJDLHNEQUFzRCw2RUFBNkUsWUFBWSxlQUFlLGFBQWEsdUdBQXVHLFlBQVksZUFBZSxjQUFjLDRIQUE0SCw0REFBNEQsWUFBWSxlQUFlLGNBQWMsdUVBQXVFLHNKQUFzSixZQUFZLGVBQWUsY0FBYyxpQ0FBaUMsd0NBQXdDLHNCQUFzQix3RkFBd0YsTUFBTSxZQUFZLGVBQWUsY0FBYyxlQUFlLFNBQVMsZ0JBQWdCLFdBQVcsa0NBQWtDLFdBQVcseUVBQXlFLGdFQUFnRSxtQkFBbUIsWUFBWSxHQUFHLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYnVuZGxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJ1bmRsZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlMzQ4NjdjMTBlZTdmNzM4NTcxIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjMnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEFwcCBmcm9tICcuL2RyYXcuanMnXHJcbmltcG9ydCB7XHJcbiAgICByYW5kb21OdW0sXHJcbiAgICByYW5kb21Db2xvclxyXG59IGZyb20gJ291dGlscyc7XHJcbmNvbnN0ICRhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJylcclxuY29uc3QgJGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JnJylcclxuY29uc3QgJHBlb3BsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZW9wbGUnKVxyXG5cclxuXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBjb250YWluZXI6ICRhcHAsXHJcbiAgICBwZW9wbGU6IFtdLFxyXG4gICAgYmFja2dyb3VuZEltYWdlOiAkYmcuZ2V0QXR0cmlidXRlKCdzcmMnKSxcclxuICAgIHBlb3BsZUltYWdlOiAkcGVvcGxlLmdldEF0dHJpYnV0ZSgnc3JjJylcclxufVxyXG5sZXQgYXBwID0gbmV3IEFwcChvcHRpb25zKVxyXG5cclxuLy8g5re75Yqg5py65Zmo5Lq6XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX2FkZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbGV0IHtcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHRcclxuICAgIH0gPSAkYXBwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHggPSByYW5kb21OdW0oMCwgd2lkdGgpXHJcbiAgICBsZXQgeSA9IHJhbmRvbU51bSgwLCBoZWlnaHQpXHJcbiAgICBvcHRpb25zLnBlb3BsZS5wdXNoKHtcclxuICAgICAgICBuYW1lOiAneXhsJyxcclxuICAgICAgICBjb2xvcjogcmFuZG9tQ29sb3IoKSxcclxuICAgICAgICBtb3ZlOiBbe1xyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5XHJcbiAgICAgICAgfV1cclxuICAgIH0pXHJcbiAgICAvLyDph43nu5jovajov7nvvIzkurpcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ3Blb3BsZScpXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOaYr+WQpuWxleekuui/kOWKqOi9qOi/uVxyXG5hcHAuc2hvd1BhdGggPSB0cnVlXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3Nob3cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFwcC5zaG93UGF0aCA9IHRydWVcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9oaWRkZW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFwcC5zaG93UGF0aCA9IGZhbHNlXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOavlOS+i+WwulxyXG5jb25zdCAkcnVsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9ydWxlcicpXHJcbiRydWxlci5pbm5lckhUTUwgPSBgeCR7YXBwLm9wdGlvbnMuaW1nU2NhbGV9IOWAjWBcclxuJGFwcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgKCkgPT4ge1xyXG4gICAgJHJ1bGVyLmlubmVySFRNTCA9IGB4JHthcHAub3B0aW9ucy5pbWdTY2FsZX0g5YCNYFxyXG59KVxyXG5cclxuLy8g6byg5qCH5Z2Q5qCHXHJcbmNvbnN0ICRwb2ludGVyWCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3BvaW50ZXIteCcpXHJcbmNvbnN0ICRwb2ludGVyWSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3BvaW50ZXIteScpXHJcbiRhcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKCkgPT4ge1xyXG4gICAgJHBvaW50ZXJYLmlubmVySFRNTCA9IGBYOiR7YXBwLm9wdGlvbnMucG9pbnRlclh9YFxyXG4gICAgJHBvaW50ZXJZLmlubmVySFRNTCA9IGBZOiR7YXBwLm9wdGlvbnMucG9pbnRlcll9YFxyXG59KVxyXG5cclxuXHJcbmNvbnN0ICRtZWFzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfbWVhc3VyZScpXHJcbiRtZWFzdXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYXBwLm1lYXN1cmUoKVxyXG59KVxyXG5jb25zdCAkbWVhc3VyZUNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX21lYXN1cmUtY2FuY2VsJylcclxuJG1lYXN1cmVDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5tZWFzdXJlID0gW11cclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ21lYXN1cmUnKVxyXG59KVxyXG5cclxuLy8g5pWw5o2u5qih5ouf5ZmoXHJcbmxldCBtb2NrU2VydmVyMSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4gICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbiAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtMTAsIDEwKSxcclxuICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC0xMCwgMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbiAgICB9KTtcclxufSwgNTAwKVxyXG5sZXQgbW9ja1NlcnZlcjIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4gICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTEwLCAxMCksXHJcbiAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtMTAsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgfSk7XHJcbn0sIDMwMClcclxubGV0IG1vY2tTZXJ2ZXIzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbiAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC0xMCwgMTApLFxyXG4gICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTEwLCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuICAgIH0pO1xyXG59LCAxMDAwKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIi8v55S757q/5q61XHJcbmZ1bmN0aW9uIGRyYXdMaW5lKGN0eCwgY29sb3IsIHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgY3R4Lm1vdmVUbyh4MSwgeTEpO1xyXG4gICAgY3R4LmxpbmVUbyh4MiwgeTIpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xyXG59XHJcbi8v55S756m65b+D5ZyGXHJcbmZ1bmN0aW9uIGRyYXdDaXJjbGUoY3R4LCBjb2xvciwgeCwgeSwgcmFkaXVzKSB7XHJcbiAgICAvL+eUu+S4gOS4quepuuW/g+WchlxyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyh4LCB5LCByYWRpdXMsIDAsIDM2MCwgZmFsc2UpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiOyAvL+Whq+WFheminOiJsizpu5jorqTmmK/pu5HoibJcclxuICAgIGN0eC5maWxsKCk7IC8v55S75a6e5b+D5ZyGXHJcbiAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LnN0cm9rZSgpOyAvL+eUu+epuuW/g+WchlxyXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3VGV4dChjdHgsIHgsIHksIHRleHQpIHtcclxuICAgIGN0eC5mb250ID0gJzE0cHggQXJpYWwnO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDA5OUNDJztcclxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCB4ICsgNSwgeSAtIDgpO1xyXG59XHJcbi8vIOWLvuiCoeWumueQhueul+i3neemu1xyXG5mdW5jdGlvbiBjYWxjdWxhdGVMZW5ndGgoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIGxldCB4ID0geDEgLSB4MjtcclxuICAgIGxldCB5ID0geTEgLSB5MjtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKSk7XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgY29udGFpbmVyOiBudWxsLCAvL+WIm+W7umNhbnZhc+eahOWuueWZqO+8jOWmguaenOS4jeWhq++8jOiHquWKqOWcqCBib2R5IOS4iuWIm+W7uuimhuebluWFqOWxj+eahOWxglxyXG4gICAgcGVvcGxlOiBbXSwgLy8g5Lq6XHJcbiAgICBtZWFzdXJlOiBbXSwgLy8g5rWL6Led6K6w5b2VXHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6IHVuZGVmaW5lZCwgLy8g6IOM5pmv5Zu+XHJcbiAgICBpbWdTY2FsZTogMSwgLy8g6buY6K6k5pS+5aSn5YCN5pWwXHJcbiAgICBpbWdYOiAwLCAvLyDog4zmma/lm77mi5JjYW52YXPljp/ngrlY5pa55ZCR6Led56a7XHJcbiAgICBpbWdZOiAwLCAvLyDog4zmma/lm77mi5JjYW52YXPljp/ngrlZ5pa55ZCR6Led56a7XHJcbiAgICBwb2ludGVyWDogMCxcclxuICAgIHBvaW50ZXJZOiAwLFxyXG4gICAgYW5pbWF0aW9uOiB1bmRlZmluZWQsXHJcbiAgICBpc01lYXN1cmluZzogZmFsc2UgLy/mraPlnKjmtYvot51cclxufTtcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93UGF0aCA9IGZhbHNlOyAvLyDmmK/lkKbmmL7npLog6L+Q5Yqo6L2o6L+5XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLmxvYWRCZ0ltZygpO1xyXG4gICAgICAgIHRoaXMubG9hZFBlb3BsZUltZygpO1xyXG4gICAgICAgIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqL1xyXG4gICAgc2V0IHNob3dQYXRoKHZhbCkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93UGF0aCA9IHZhbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQGRlc2Mg5byA5aeL5rWL6LedXHJcbiAgICAgKi9cclxuICAgIG1lYXN1cmUoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5pc1Nob3dQYXRoID0gdmFsXHJcbiAgICAgICAgLy8g57uR5a6a5rWL6Led5LqL5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc01lYXN1cmluZyA9PT0gdHJ1ZSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5iaW5kTWVhc3VyZUV2ZW50KClcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaXNNZWFzdXJpbmcgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHVibGljIFxyXG4gICAgICogQGRlc2Mg5Y2V5qyh6YeN57uYY2FudmFzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUNhbnZhcyhjb250ZXh0KSB7XHJcbiAgICAgICAgLy8g6YeN57uYQ2FudmFzXHJcbiAgICAgICAgc3dpdGNoIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwZW9wbGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbW92ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21lYXN1cmUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01lYXN1cmUoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJnQ29sb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgLy/nlLvlnLDlm77nmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IG1hcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWFwQ2FudmFzLnN0eWxlLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6ICcwJyxcclxuICAgICAgICAgICAgbGVmdDogJzAnLFxyXG4gICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXBDYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGAke3dpZHRofXB4YClcclxuICAgICAgICBtYXBDYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKVxyXG5cclxuICAgICAgICAvL+eUu+i9qOi/uee6v+adoeeahCBjYW52YXNcclxuICAgICAgICBsZXQgbW92ZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v55S75Lq655qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBwZW9wbGVDYW52YXMgPSBtYXBDYW52YXMuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIC8vIOa1i+i3nSBjYW52YXNcclxuICAgICAgICBsZXQgbWVhc3VyZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYXBDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtb3ZlQ2FudmFzKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGVvcGxlQ2FudmFzKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVhc3VyZUNhbnZhcyk7XHJcblxyXG4gICAgICAgIHRoaXMubWFwQ2FudmFzID0gbWFwQ2FudmFzO1xyXG4gICAgICAgIHRoaXMubW92ZUNhbnZhcyA9IG1vdmVDYW52YXM7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVDYW52YXMgPSBwZW9wbGVDYW52YXM7XHJcbiAgICAgICAgdGhpcy5tZWFzdXJlQ2FudmFzID0gbWVhc3VyZUNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBiaW5kTWVhc3VyZUV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQgY2xpY2tUaW1lID0gMDtcclxuICAgICAgICBsZXQgY2xpY2tOdW0gPSAwO1xyXG4gICAgICAgIGxldCBtb3ZlTnVtID0gMDtcclxuICAgICAgICBsZXQgbW91c2Vtb3ZlTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIHBvcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IChwb3MueCAtIHRoaXMub3B0aW9ucy5pbWdYKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSxcclxuICAgICAgICAgICAgICAgIHk6IChwb3MueSAtIHRoaXMub3B0aW9ucy5pbWdZKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcylcclxuICAgICAgICAgICAgLy8gZHJhd0NpcmNsZSh0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSwgJyNmZjY5MjInLCBwb3MueCwgcG9zLnksIDUpXHJcbiAgICAgICAgICAgIC8vIOacqumAieaLqeesrOS4gOS4queCue+8jOebtOaOpXJldHVyblxyXG4gICAgICAgICAgICBpZiAoY2xpY2tOdW0gPT09IDApIHJldHVyblxyXG4gICAgICAgICAgICBsZXQgcG9pbnRlciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW3RoaXMub3B0aW9ucy5tZWFzdXJlLmxlbmd0aCAtIDFdLnBvaW50ZXJcclxuICAgICAgICAgICAgbGV0IG1vdmVBcnIgPSB0aGlzLm9wdGlvbnMubWVhc3VyZVt0aGlzLm9wdGlvbnMubWVhc3VyZS5sZW5ndGggLSAxXS5tb3ZlXHJcbiAgICAgICAgICAgIGxldCBsYXN0UG9pbnQgPSBtb3ZlQXJyW21vdmVBcnIubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwb2ludGVyLCBwb3MpXHJcbiAgICAgICAgICAgIHBvcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHBvcy54LFxyXG4gICAgICAgICAgICAgICAgeTogcG9zLnlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobW92ZU51bSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbW92ZUFyci5wdXNoKHBvcylcclxuICAgICAgICAgICAgICAgIG1vdmVOdW0gPSAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlQXJyW21vdmVBcnIubGVuZ3RoIC0gMV0gPSBwb3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2xpY2tMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lIC0gY2xpY2tUaW1lIDw9IDMwMCAmJiBjdXJyZW50VGltZSAtIGNsaWNrVGltZSA+PSAxNTApIHtcclxuICAgICAgICAgICAgICAgIC8vIOWPjOWHu+e7k+adn+a1i+i3nVxyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVBcnIgPSB0aGlzLm9wdGlvbnMubWVhc3VyZVt0aGlzLm9wdGlvbnMubWVhc3VyZS5sZW5ndGggLSAxXS5tb3ZlXHJcbiAgICAgICAgICAgICAgICBtb3ZlQXJyLnBvcCgpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbnMubWVhc3VyZSlcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pc01lYXN1cmluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjbGlja051bSA9IDBcclxuICAgICAgICAgICAgICAgIGNsaWNrVGltZSA9IDBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICAvLyDljZXlh7vlvIDlp4vmtYvot51cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKChwb3MueCAtIHRoaXMub3B0aW9ucy5pbWdYKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSwgKHBvcy55IC0gdGhpcy5vcHRpb25zLmltZ1kpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlKVxyXG4gICAgICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IChwb3MueCAtIHRoaXMub3B0aW9ucy5pbWdYKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICB5OiAocG9zLnkgLSB0aGlzLm9wdGlvbnMuaW1nWSkgLyB0aGlzLm9wdGlvbnMuaW1nU2NhbGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjbGlja051bSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOesrOS4gOasoeWNleWHu1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9zLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZTogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9zLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1lYXN1cmUucHVzaChvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tOdW0rK1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlpJrmrKHpgInngrlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm9wdGlvbnMubWVhc3VyZS5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9pbnRlciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW2luZGV4IC0gMV0ucG9pbnRlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLm9wdGlvbnMubWVhc3VyZVtpbmRleCAtIDFdLm1vdmVcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UG9pbnQgPSBhcnJbYXJyLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9zLnksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocG9pbnRlciwgcG9zKVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHBvcylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xpY2tUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB9XHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrTGlzdGVuZXIpXHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgIH1cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQganVkZ2VCb3JkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOi+ueeVjOajgOa1i1xyXG4gICAgICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1ggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWSAtIGhlaWdodCA8IC10aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAtdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdYIC0gd2lkdGggPCAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWcsOWbvue8qeaUvlxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgd2hlZWxEZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgPyBldmVudC53aGVlbERlbHRhIDogKGV2ZW50LmRlbHRhWSAqICgtNDApKTtcclxuICAgICAgICAgICAgaWYgKHdoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlL7lpKdcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICogMiA8PSB0aGlzLmJnSW1nLndpZHRoICogOCB8fCB0aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqIDIgPD0gdGhpcy5iZ0ltZy5oZWlnaHQgKiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pS+5aSn6L6555WM5Yik5patXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1NjYWxlICo9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWCAqIDIgLSBwb3MueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMiAtIHBvcy55O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g57yp5bCPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvIDIgPj0gd2lkdGggfHwgdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLyAyID49IGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOe8qeWwj+i+ueeVjOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gdGhpcy5vcHRpb25zLmltZ1ggKiAwLjUgKyBwb3MueCAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMC41ICsgcG9zLnkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAganVkZ2VCb3JkZXIoKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgIC8vIOmHjee7mOa1i+i3neWbvuWxglxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNZWFzdXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01vdmUoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDlnLDlm77np7vliqhcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgbGV0IG1vdXNlbW92ZUxpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcIm1vdmVcIjtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MxID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBvczEueCAtIHBvcy54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwb3MxLnkgLSBwb3MueTtcclxuICAgICAgICAgICAgICAgIHBvcyA9IHBvczE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCArPSB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgKz0geTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDph43nu5jmtYvot53lm77lsYJcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNZWFzdXJlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtb3VzZXVwTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBqdWRnZUJvcmRlcigpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8g6YeN57uY5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDpvKDmoIfmjIfpkojlnZDmoIdcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvaW50ZXJYID0gcG9zLnhcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvaW50ZXJZID0gaGVpZ2h0IC0gcG9zLnlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1RvQ2FudmFzKGNhbnZhcywgeCwgeSkge1xyXG4gICAgICAgIGxldCBiYm94ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IHggLSBiYm94LmxlZnQgLSAoYmJveC53aWR0aCAtIGNhbnZhcy53aWR0aCkgLyAyLFxyXG4gICAgICAgICAgICB5OiB5IC0gYmJveC50b3AgLSAoYmJveC5oZWlnaHQgLSBjYW52YXMuaGVpZ2h0KSAvIDJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRCZ0ltZygpIHtcclxuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5iZ0ltZyA9IGltZ1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdNYXAoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBsb2FkUGVvcGxlSW1nKCkge1xyXG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gdGhpcy5vcHRpb25zLnBlb3BsZUltYWdlO1xyXG4gICAgICAgIHRoaXMucGVvcGxlSW1hZ2UgPSBpbWdcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDnlLvog4zmma/lnLDlm75cclxuICAgICAqL1xyXG4gICAgZHJhd01hcCgpIHtcclxuICAgICAgICBsZXQgaW1nU2NhbGUgPSB0aGlzLm9wdGlvbnMuaW1nU2NhbGU7XHJcbiAgICAgICAgbGV0IGltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWDtcclxuICAgICAgICBsZXQgaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZO1xyXG4gICAgICAgIGxldCBpbWcgPSB0aGlzLmJnSW1nO1xyXG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLm1hcENhbnZhcztcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubWFwQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbnZhcyhjb250ZXh0KVxyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0LCBpbWdYLCBpbWdZLCBpbWcud2lkdGggKiBpbWdTY2FsZSwgaW1nLmhlaWdodCAqIGltZ1NjYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoICE9PSB0cnVlKSByZXR1cm5cclxuICAgICAgICAvL+eUu+enu+WKqOi9qOi/uVxyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgoe1xyXG4gICAgICAgICAgICBtb3ZlLFxyXG4gICAgICAgICAgICBjb2xvclxyXG4gICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnQsIGxhc3Q7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb3ZlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG1vdmVbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlWy0taW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSAncmVkJ1xyXG4gICAgICAgICAgICAgICAgLy8g5YiH5o2i5bem5LiL6KeS5Li65Z2Q5qCH5Y6f54K5XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGxhc3QueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChoZWlnaHQgLSBsYXN0LnkpICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogY3VycmVudC54ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1gsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogKGhlaWdodCAtIGN1cnJlbnQueSkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHJhd0xpbmUoY29udGV4dCwgY29sb3IsIGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQZW9wbGUoKSB7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLFxyXG4gICAgICAgICAgICBwZW9wbGVJbWFnZVxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBwZW9wbGVJbWdXaWR0aCA9IDMwO1xyXG4gICAgICAgIGxldCBwZW9wbGVJbWdIZWlnaHQgPSA0MztcclxuICAgICAgICBsZXQgY29udGV4dCA9IHBlb3BsZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGNvbnRleHQpO1xyXG4gICAgICAgIG9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZVxyXG4gICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gbW92ZVttb3ZlLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgIC8vIOWIh+aNouW3puS4i+inkuS4uuWdkOagh+WOn+eCuVxyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHBvc2l0aW9uLnggKiBvcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1ggLSBwZW9wbGVJbWdXaWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICB5OiAoaGVpZ2h0IC0gcG9zaXRpb24ueSkgKiBvcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1kgLSBwZW9wbGVJbWdIZWlnaHQgLyAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UocGVvcGxlSW1hZ2UsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBlb3BsZUltZ1dpZHRoLCBwZW9wbGVJbWdIZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNZWFzdXJlKCkge1xyXG4gICAgICAgIC8vIOeUu+a1i+i3nei9qOi/uVxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzLFxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIC8v55S756e75Yqo6L2o6L+5XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMubWVhc3VyZS5mb3JFYWNoKCh7XHJcbiAgICAgICAgICAgIG1vdmVcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50LCBsYXN0LCB0b3RhbExlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb3ZlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG1vdmVbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlWy0taW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGxhc3QueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGxhc3QueSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAvLyBpZiAoaW5kZXggPT09IGAke21vdmUubGVuZ3RoLTF9YCAmJiBpbmRleCAhPT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGN1cnJlbnQueSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICBkcmF3TGluZShjb250ZXh0LCAnI2ZmNjkyMicsIGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSlcclxuICAgICAgICAgICAgICAgIGRyYXdDaXJjbGUoY29udGV4dCwgJyNmZjY5MjInLCBjdXJyZW50LngsIGN1cnJlbnQueSwgNSlcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJydcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6LW354K5XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICfotbfngrknXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsTGVuZ3RoID0gdG90YWxMZW5ndGggKyBjYWxjdWxhdGVMZW5ndGgobGFzdC54LCBsYXN0LnksIGN1cnJlbnQueCwgY3VycmVudC55KVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHsodG90YWxMZW5ndGgvdGhpcy5vcHRpb25zLmltZ1NjYWxlKS50b0ZpeGVkKDIpfSBtYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHJhd1RleHQoY29udGV4dCwgY3VycmVudC54LCBjdXJyZW50LnksIHRleHQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBkZXNjIOa4hemZpHtjb250ZXh0feeUu+W4g1xyXG4gICAgICogQHBhcmFtIHsqfSBjb250ZXh0IFxyXG4gICAgICovXHJcbiAgICBjbGVhckNhbnZhcyhjb250ZXh0KSB7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgbWFwQ2FudmFzLFxyXG4gICAgICAgICAgICBtb3ZlQ2FudmFzLFxyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMsXHJcbiAgICAgICAgICAgIG1lYXN1cmVDYW52YXNcclxuICAgICAgICB9ID0gdGhpc1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFwQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgbW92ZUNhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHBlb3BsZUNhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIG1lYXN1cmVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICAvLyDliqjnlLtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbikgcmV0dXJuXHJcbiAgICAgICAgbGV0IHN0ZXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzKCdwZW9wbGUnKVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbiAgICAgICAgICAgIC8vIOabtOaWsCDmtYvot53lm77lsYJcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW52YXMoJ21lYXN1cmUnKVxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RyYXcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5vdXRpbHM9dCgpOmUub3V0aWxzPXQoKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KG8pe2lmKG5bb10pcmV0dXJuIG5bb10uZXhwb3J0czt2YXIgcj1uW29dPXtpOm8sbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtvXS5jYWxsKHIuZXhwb3J0cyxyLHIuZXhwb3J0cyx0KSxyLmw9ITAsci5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLG8pe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6b30pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9NSl9KFtmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtyZXR1cm4gbmV3IFJlZ0V4cChcIihcXFxcc3xeKVwiK3QrXCIoXFxcXHN8JClcIikudGVzdChlLmNsYXNzTmFtZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQsbil7dmFyIG89bmV3IERhdGU7by5zZXREYXRlKG8uZ2V0RGF0ZSgpK24pLGRvY3VtZW50LmNvb2tpZT1lK1wiPVwiK3QrXCI7ZXhwaXJlcz1cIitvfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiB3aW5kb3cuc2Nyb2xsVG8oMCxlKSxlfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixvKXtmdW5jdGlvbiByKCl7ZnVuY3Rpb24gcigpe2E9TnVtYmVyKG5ldyBEYXRlKSxuLmFwcGx5KGYscyl9ZnVuY3Rpb24gdSgpe2k9dm9pZCAwfXZhciBmPXRoaXMsYz1OdW1iZXIobmV3IERhdGUpLWEscz1hcmd1bWVudHM7byYmIWkmJnIoKSxpJiZjbGVhclRpbWVvdXQoaSksdm9pZCAwPT09byYmYz5lP3IoKTohMCE9PXQmJihpPXNldFRpbWVvdXQobz91OnIsdm9pZCAwPT09bz9lLWM6ZSkpfXZhciBpLGE9MDtyZXR1cm5cImJvb2xlYW5cIiE9dHlwZW9mIHQmJihvPW4sbj10LHQ9dm9pZCAwKSxyfX0sZnVuY3Rpb24oZSx0LG4pe3ZhciBvPW4oNikscj1uKDcpLGk9bigwKSxhPW4oOCksdT1uKDkpLGY9bigxMCksYz1uKDEpLHM9bigxMSkscD1uKDEyKSxkPW4oMiksbD1uKDEzKSxtPW4oMTQpLHY9bigzKSx3PW4oMTUpLGc9bigxNikseT1uKDQpLGg9bigxNykseD1uKDE4KSxiPW4oMTkpLEM9bigyMCksTj1uKDIxKSxTPW4oMjIpLE09bigyMyksRT1uKDI0KSxGPW4oMjUpLEQ9bigyNiksST1uKDI3KSxUPW4oMjgpLGs9bigyOSksUj1uKDMwKSxBPW4oMzEpO2UuZXhwb3J0cz17YXJyYXlFcXVhbDpvLGFkZENsYXNzOnIsaGFzQ2xhc3M6aSxyZW1vdmVDbGFzczphLGdldENvb2tpZTp1LHJlbW92ZUNvb2tpZTpmLHNldENvb2tpZTpjLGdldE9TOnMsZ2V0RXhwbG9yZTpwLGdldFNjcm9sbFRvcDpkLG9mZnNldDpsLHNjcm9sbFRvOm0sc2V0U2Nyb2xsVG9wOnYsd2luZG93UmVzaXplOncsZGVib3VuY2U6Zyx0aHJvdHRsZTp5LGdldEtleU5hbWU6aCxkZWVwQ2xvbmU6eCxpc0VtcHR5T2JqZWN0OmIscmFuZG9tQ29sb3I6QyxyYW5kb21OdW06Tixpc0VtYWlsOlMsaXNJZENhcmQ6TSxpc1Bob25lTnVtOkUsaXNVcmw6RixkaWdpdFVwcGVyY2FzZTpELGlzU3VwcG9ydFdlYlA6SSxmb3JtYXRQYXNzVGltZTpULGZvcm1hdFJlbWFpblRpbWU6ayxwYXJzZVF1ZXJ5U3RyaW5nOlIsc3RyaW5nZnlRdWVyeVN0cmluZzpBfX0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7aWYoZT09PXQpcmV0dXJuITA7aWYoZS5sZW5ndGghPXQubGVuZ3RoKXJldHVybiExO2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7KytuKWlmKGVbbl0hPT10W25dKXJldHVybiExO3JldHVybiEwfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe3IoZSx0KXx8KGUuY2xhc3NOYW1lKz1cIiBcIit0KX12YXIgcj1uKDApO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe2lmKHIoZSx0KSl7dmFyIG49bmV3IFJlZ0V4cChcIihcXFxcc3xeKVwiK3QrXCIoXFxcXHN8JClcIik7ZS5jbGFzc05hbWU9ZS5jbGFzc05hbWUucmVwbGFjZShuLFwiIFwiKX19dmFyIHI9bigwKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD1kb2N1bWVudC5jb29raWUucmVwbGFjZSgvXFxzL2csXCJcIikuc3BsaXQoXCI7XCIpLG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIG89dFtuXS5zcGxpdChcIj1cIik7aWYob1swXT09ZSlyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KG9bMV0pfXJldHVyblwiXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUpe3IoZSxcIjFcIiwtMSl9dmFyIHI9bigxKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7dmFyIGU9XCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJ1c2VyQWdlbnRcImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpfHxcIlwiLHQ9KFwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwidmVuZG9yXCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci52ZW5kb3IudG9Mb3dlckNhc2UoKSxcIm5hdmlnYXRvclwiaW4gd2luZG93JiZcImFwcFZlcnNpb25cImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLmFwcFZlcnNpb24udG9Mb3dlckNhc2UoKXx8XCJcIik7cmV0dXJuL21hYy9pLnRlc3QodCk/XCJNYWNPU1hcIjovd2luL2kudGVzdCh0KT9cIndpbmRvd3NcIjovbGludXgvaS50ZXN0KHQpP1wibGludXhcIjooL2lwaG9uZS9pLnRlc3QoZSl8fC9pcGFkL2kudGVzdChlKXx8L2lwb2QvaS50ZXN0KGUpLC9hbmRyb2lkL2kudGVzdChlKT9cImFuZHJvaWRcIjovd2luL2kudGVzdCh0KSYmL3Bob25lL2kudGVzdChlKT9cIndpbmRvd3NQaG9uZVwiOnZvaWQgMCl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3ZhciBlLHQ9e30sbj1uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7cmV0dXJuKGU9bi5tYXRjaCgvcnY6KFtcXGQuXSspXFwpIGxpa2UgZ2Vja28vKSk/dC5pZT1lWzFdOihlPW4ubWF0Y2goL21zaWUgKFtcXGRcXC5dKykvKSk/dC5pZT1lWzFdOihlPW4ubWF0Y2goL2VkZ2VcXC8oW1xcZFxcLl0rKS8pKT90LmVkZ2U9ZVsxXTooZT1uLm1hdGNoKC9maXJlZm94XFwvKFtcXGRcXC5dKykvKSk/dC5maXJlZm94PWVbMV06KGU9bi5tYXRjaCgvKD86b3BlcmF8b3ByKS4oW1xcZFxcLl0rKS8pKT90Lm9wZXJhPWVbMV06KGU9bi5tYXRjaCgvY2hyb21lXFwvKFtcXGRcXC5dKykvKSk/dC5jaHJvbWU9ZVsxXTooZT1uLm1hdGNoKC92ZXJzaW9uXFwvKFtcXGRcXC5dKykuKnNhZmFyaS8pKSYmKHQuc2FmYXJpPWVbMV0pLHQuaWU/XCJJRTogXCIrdC5pZTp0LmVkZ2U/XCJFREdFOiBcIit0LmVkZ2U6dC5maXJlZm94P1wiRmlyZWZveDogXCIrdC5maXJlZm94OnQuY2hyb21lP1wiQ2hyb21lOiBcIit0LmNocm9tZTp0Lm9wZXJhP1wiT3BlcmE6IFwiK3Qub3BlcmE6dC5zYWZhcmk/XCJTYWZhcmk6IFwiK3Quc2FmYXJpOlwiVW5rb253blwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7Zm9yKHZhciB0PXtsZWZ0OjAsdG9wOjB9O2U7KXQubGVmdCs9ZS5vZmZzZXRMZWZ0LHQudG9wKz1lLm9mZnNldFRvcCxlPWUub2Zmc2V0UGFyZW50O3JldHVybiB0fWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe2lmKHQ8MClyZXR1cm4gdm9pZCBpKGUpO3ZhciBuPWUtcigpO2lmKDAhPT1uKXt2YXIgYT1uL3QqMTA7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7aWYoTWF0aC5hYnMoYSk+TWF0aC5hYnMobikpcmV0dXJuIHZvaWQgaShyKCkrbik7aShyKCkrYSksbj4wJiZyKCk+PWV8fG48MCYmcigpPD1lfHxvKGUsdC0xNil9KX19dmFyIHI9bigyKSxpPW4oMyk7IWZ1bmN0aW9uKCl7d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZX0oKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7dmFyIG49d2luZG93LmlubmVySGVpZ2h0O2U9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lOmZ1bmN0aW9uKCl7fSx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dDpmdW5jdGlvbigpe30sd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbigpe3ZhciBvPXdpbmRvdy5pbm5lckhlaWdodDtvPT09biYmZSgpLG88biYmdCgpfSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCxuKXtyZXR1cm4gdm9pZCAwPT09bj9yKGUsdCwhMSk6cihlLG4sITEhPT10KX12YXIgcj1uKDQpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuIG9bZV0/b1tlXTooY29uc29sZS5sb2coXCJVbmtub3cgS2V5KEtleSBDb2RlOlwiK2UrXCIpXCIpLFwiXCIpfXZhciBvPXs4OlwiQmFja3NwYWNlXCIsOTpcIlRhYlwiLDEzOlwiRW50ZXJcIiwxNjpcIlNoaWZ0XCIsMTc6XCJDdHJsXCIsMTg6XCJBbHRcIiwxOTpcIlBhdXNlXCIsMjA6XCJDYXBzIExvY2tcIiwyNzpcIkVzY2FwZVwiLDMyOlwiU3BhY2VcIiwzMzpcIlBhZ2UgVXBcIiwzNDpcIlBhZ2UgRG93blwiLDM1OlwiRW5kXCIsMzY6XCJIb21lXCIsMzc6XCJMZWZ0XCIsMzg6XCJVcFwiLDM5OlwiUmlnaHRcIiw0MDpcIkRvd25cIiw0MjpcIlByaW50IFNjcmVlblwiLDQ1OlwiSW5zZXJ0XCIsNDY6XCJEZWxldGVcIiw0ODpcIjBcIiw0OTpcIjFcIiw1MDpcIjJcIiw1MTpcIjNcIiw1MjpcIjRcIiw1MzpcIjVcIiw1NDpcIjZcIiw1NTpcIjdcIiw1NjpcIjhcIiw1NzpcIjlcIiw2NTpcIkFcIiw2NjpcIkJcIiw2NzpcIkNcIiw2ODpcIkRcIiw2OTpcIkVcIiw3MDpcIkZcIiw3MTpcIkdcIiw3MjpcIkhcIiw3MzpcIklcIiw3NDpcIkpcIiw3NTpcIktcIiw3NjpcIkxcIiw3NzpcIk1cIiw3ODpcIk5cIiw3OTpcIk9cIiw4MDpcIlBcIiw4MTpcIlFcIiw4MjpcIlJcIiw4MzpcIlNcIiw4NDpcIlRcIiw4NTpcIlVcIiw4NjpcIlZcIiw4NzpcIldcIiw4ODpcIlhcIiw4OTpcIllcIiw5MDpcIlpcIiw5MTpcIldpbmRvd3NcIiw5MzpcIlJpZ2h0IENsaWNrXCIsOTY6XCJOdW1wYWQgMFwiLDk3OlwiTnVtcGFkIDFcIiw5ODpcIk51bXBhZCAyXCIsOTk6XCJOdW1wYWQgM1wiLDEwMDpcIk51bXBhZCA0XCIsMTAxOlwiTnVtcGFkIDVcIiwxMDI6XCJOdW1wYWQgNlwiLDEwMzpcIk51bXBhZCA3XCIsMTA0OlwiTnVtcGFkIDhcIiwxMDU6XCJOdW1wYWQgOVwiLDEwNjpcIk51bXBhZCAqXCIsMTA3OlwiTnVtcGFkICtcIiwxMDk6XCJOdW1wYWQgLVwiLDExMDpcIk51bXBhZCAuXCIsMTExOlwiTnVtcGFkIC9cIiwxMTI6XCJGMVwiLDExMzpcIkYyXCIsMTE0OlwiRjNcIiwxMTU6XCJGNFwiLDExNjpcIkY1XCIsMTE3OlwiRjZcIiwxMTg6XCJGN1wiLDExOTpcIkY4XCIsMTIwOlwiRjlcIiwxMjE6XCJGMTBcIiwxMjI6XCJGMTFcIiwxMjM6XCJGMTJcIiwxNDQ6XCJOdW0gTG9ja1wiLDE0NTpcIlNjcm9sbCBMb2NrXCIsMTgyOlwiTXkgQ29tcHV0ZXJcIiwxODM6XCJNeSBDYWxjdWxhdG9yXCIsMTg2OlwiO1wiLDE4NzpcIj1cIiwxODg6XCIsXCIsMTg5OlwiLVwiLDE5MDpcIi5cIiwxOTE6XCIvXCIsMTkyOlwiYFwiLDIxOTpcIltcIiwyMjA6XCJcXFxcXCIsMjIxOlwiXVwiLDIyMjpcIidcIn07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdDtpZihudWxsPT1lfHxcIm9iamVjdFwiIT0odm9pZCAwPT09ZT9cInVuZGVmaW5lZFwiOm8oZSkpKXJldHVybiBlO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiB0PW5ldyBEYXRlLHQuc2V0VGltZShlLmdldFRpbWUoKSksdDtpZihlIGluc3RhbmNlb2YgQXJyYXkpe3Q9W107Zm9yKHZhciByPTAsaT1lLmxlbmd0aDtyPGk7cisrKXRbcl09bihlW3JdKTtyZXR1cm4gdH1pZihlIGluc3RhbmNlb2YgT2JqZWN0KXt0PXt9O2Zvcih2YXIgYSBpbiBlKWUuaGFzT3duUHJvcGVydHkoYSkmJih0W2FdPW4oZVthXSkpO3JldHVybiB0fXRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBjb3B5IHZhbHVlcyEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKX12YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiEoIWV8fFwib2JqZWN0XCIhPT0odm9pZCAwPT09ZT9cInVuZGVmaW5lZFwiOm8oZSkpfHxBcnJheS5pc0FycmF5KGUpKSYmIU9iamVjdC5rZXlzKGUpLmxlbmd0aH12YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuXCIjXCIrKFwiMDAwMDBcIisoMTY3NzcyMTYqTWF0aC5yYW5kb20oKTw8MCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3JldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHQtZSsxKSkrZX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9cXHcrKFstKy5dXFx3KykqQFxcdysoWy0uXVxcdyspKlxcLlxcdysoWy0uXVxcdyspKi8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9eKF5bMS05XVxcZHs3fSgoMFxcZCl8KDFbMC0yXSkpKChbMHwxfDJdXFxkKXwzWzAtMV0pXFxkezN9JCl8KF5bMS05XVxcZHs1fVsxLTldXFxkezN9KCgwXFxkKXwoMVswLTJdKSkoKFswfDF8Ml1cXGQpfDNbMC0xXSkoKFxcZHs0fSl8XFxkezN9W1h4XSkkKSQvLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXigwfDg2fDE3OTUxKT8oMTNbMC05XXwxNVswMTIzNTY3ODldfDE3WzY3OF18MThbMC05XXwxNFs1N10pWzAtOV17OH0kLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL1stYS16QS1aMC05QDolLl9cXCt+Iz1dezIsMjU2fVxcLlthLXpdezIsNn1cXGIoWy1hLXpBLVowLTlAOiVfXFwrLn4jPyZcXC9cXC89XSopL2kudGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PVtcIuinklwiLFwi5YiGXCJdLG49W1wi6Zu2XCIsXCLlo7lcIixcIui0sFwiLFwi5Y+BXCIsXCLogoZcIixcIuS8jVwiLFwi6ZmGXCIsXCLmn5JcIixcIuaNjFwiLFwi546WXCJdLG89W1tcIuWFg1wiLFwi5LiHXCIsXCLkur9cIl0sW1wiXCIsXCLmi75cIixcIuS9sFwiLFwi5LufXCJdXSxyPWU8MD9cIuasoFwiOlwiXCI7ZT1NYXRoLmFicyhlKTtmb3IodmFyIGk9XCJcIixhPTA7YTx0Lmxlbmd0aDthKyspaSs9KG5bTWF0aC5mbG9vcigxMCplKk1hdGgucG93KDEwLGEpKSUxMF0rdFthXSkucmVwbGFjZSgv6Zu2Li8sXCJcIik7aT1pfHxcIuaVtFwiLGU9TWF0aC5mbG9vcihlKTtmb3IodmFyIGE9MDthPG9bMF0ubGVuZ3RoJiZlPjA7YSsrKXtmb3IodmFyIHU9XCJcIixmPTA7ZjxvWzFdLmxlbmd0aCYmZT4wO2YrKyl1PW5bZSUxMF0rb1sxXVtmXSt1LGU9TWF0aC5mbG9vcihlLzEwKTtpPXUucmVwbGFjZSgvKOmbti4pKumbtiQvLFwiXCIpLnJlcGxhY2UoL14kLyxcIumbtlwiKStvWzBdW2FdK2l9cmV0dXJuIHIraS5yZXBsYWNlKC8o6Zu2Likq6Zu25YWDLyxcIuWFg1wiKS5yZXBsYWNlKC8o6Zu2LikrL2csXCLpm7ZcIikucmVwbGFjZSgvXuaVtCQvLFwi6Zu25YWD5pW0XCIpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm4hIVtdLm1hcCYmMD09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIpLmluZGV4T2YoXCJkYXRhOmltYWdlL3dlYnBcIil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1EYXRlLnBhcnNlKG5ldyBEYXRlKSxuPXQtZSxvPXBhcnNlSW50KG4vODY0ZTUpLHI9cGFyc2VJbnQobi8zNmU1KSxpPXBhcnNlSW50KG4vNmU0KSxhPXBhcnNlSW50KG8vMzApLHU9cGFyc2VJbnQoYS8xMik7cmV0dXJuIHU/dStcIuW5tOWJjVwiOmE/YStcIuS4quaciOWJjVwiOm8/bytcIuWkqeWJjVwiOnI/citcIuWwj+aXtuWJjVwiOmk/aStcIuWIhumSn+WJjVwiOlwi5Yia5YiaXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1uZXcgRGF0ZSxuPW5ldyBEYXRlKGUpLG89bi5nZXRUaW1lKCktdC5nZXRUaW1lKCkscj0wLGk9MCxhPTAsdT0wO3JldHVybiBvPj0wJiYocj1NYXRoLmZsb29yKG8vMWUzLzM2MDAvMjQpLGk9TWF0aC5mbG9vcihvLzFlMy82MC82MCUyNCksYT1NYXRoLmZsb29yKG8vMWUzLzYwJTYwKSx1PU1hdGguZmxvb3Ioby8xZTMlNjApKSxyK1wi5aSpIFwiK2krXCLlsI/ml7YgXCIrYStcIuWIhumSnyBcIit1K1wi56eSXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtlPW51bGw9PWU/d2luZG93LmxvY2F0aW9uLmhyZWY6ZTt2YXIgdD1lLnN1YnN0cmluZyhlLmxhc3RJbmRleE9mKFwiP1wiKSsxKTtyZXR1cm4gdD9KU09OLnBhcnNlKCd7XCInK2RlY29kZVVSSUNvbXBvbmVudCh0KS5yZXBsYWNlKC9cIi9nLCdcXFxcXCInKS5yZXBsYWNlKC8mL2csJ1wiLFwiJykucmVwbGFjZSgvPS9nLCdcIjpcIicpKydcIn0nKTp7fX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2lmKCFlKXJldHVyblwiXCI7dmFyIHQ9W107Zm9yKHZhciBuIGluIGUpe3ZhciBvPWVbbl07aWYobyBpbnN0YW5jZW9mIEFycmF5KWZvcih2YXIgcj0wO3I8by5sZW5ndGg7KytyKXQucHVzaChlbmNvZGVVUklDb21wb25lbnQobitcIltcIityK1wiXVwiKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQob1tyXSkpO2Vsc2UgdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQoZVtuXSkpfXJldHVybiB0LmpvaW4oXCImXCIpfWUuZXhwb3J0cz1ufV0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvb3V0aWxzL21pbi9vdXRpbHMubWluLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9