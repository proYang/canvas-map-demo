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


var _app = __webpack_require__(12);

var _app2 = _interopRequireDefault(_app);

var _mockjs = __webpack_require__(45);

var _outils = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $app = document.querySelector('#app');

var options = {
    container: $app,
    people: [],
    backgroundImage: './assert/images/map.jpg',
    peopleImage: ['./assert/images/people-1.png', './assert/images/people-2.png', './assert/images/people-3.png']
};
var app = new _app2.default(options);

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
document.querySelector('.J_add').addEventListener('click', function () {

    // app.options.people = mockPeople
    var _$app$getBoundingClie = $app.getBoundingClientRect(),
        width = _$app$getBoundingClie.width,
        height = _$app$getBoundingClie.height;

    var id = 1000;
    var x = (0, _outils.randomNum)(0, width);
    var y = (0, _outils.randomNum)(0, height);
    app.options.people.push({
        id: id++,
        imgIndex: (0, _outils.randomNum)(0, 2),
        name: _mockjs.Random.cname(),
        color: (0, _outils.randomColor)(),
        move: [{
            x: x,
            y: y
        }]
    });
    // 重绘轨迹，人
    // app.updateCanvas('people')
    // app.updateCanvas('move')
});

// 是否展示运动轨迹
// let mockServer4
var $show = document.querySelector('.J_show');
$show.addEventListener('click', function () {
    // document.querySelector('.J_add').click()
    // clearInterval(mockServer4)
    app.showPath = !app.showPath;
    if (app.showPath === false) {
        $show.innerHTML = '运动轨迹';
        (0, _outils.removeClass)($show, 'btn-warning');
        (0, _outils.addClass)($show, 'btn-primary');
    } else {
        $show.innerHTML = '关闭轨迹';
        (0, _outils.removeClass)($show, 'btn-primary');
        (0, _outils.addClass)($show, 'btn-warning');
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
            x: last.x + (0, _outils.randomNum)(-5, 5),
            y: last.y + (0, _outils.randomNum)(-5, 5)
        };
        app.options.people[index].move.push(next);
        if (length > 100) app.options.people[index].move.shift();
    });
}, 500);
var mockServer2 = setInterval(function () {
    app.options.people.forEach(function (person, index) {
        var length = person.move.length;
        var last = person.move[--length];
        var next = {
            x: last.x + (0, _outils.randomNum)(-5, 5),
            y: last.y + (0, _outils.randomNum)(-5, 5)
        };
        app.options.people[index].move.push(next);
        if (length > 100) app.options.people[index].move.shift();
    });
}, 300);
var mockServer3 = setInterval(function () {
    app.options.people.forEach(function (person, index) {
        var length = person.move.length;
        var last = person.move[--length];
        var next = {
            x: last.x + (0, _outils.randomNum)(-5, 5),
            y: last.y + (0, _outils.randomNum)(-5, 5)
        };
        app.options.people[index].move.push(next);
        if (length > 100) app.options.people[index].move.shift();
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

var _utils = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var isMoveMap = false; // 正在拖拽移动地图

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
                    // 未选择第一个点，直接return
                };if (clickNum === 0) return;
                var moveArr = _this.options.measure[_this.options.measure.length - 1].move;
                var lastPoint = moveArr[moveArr.length - 1];
                if (moveNum === 0) {
                    moveArr.push(pos);
                    moveNum = 1;
                } else {
                    moveArr[moveArr.length - 1] = pos;
                }
            };
            var clickListener = function clickListener(event) {
                if (isMoveMap) return;
                $container.style.cursor = "pointer";
                var currentTime = new Date().getTime();
                if (currentTime - clickTime <= 300 && currentTime - clickTime >= 150) {
                    // 双击结束测距
                    var moveArr = _this.options.measure[_this.options.measure.length - 1].move;
                    moveArr.pop();
                    $container.removeEventListener('mousemove', mousemoveListener);
                    $container.removeEventListener('click', clickListener);
                    _this.options.isMeasuring = false;
                    clickNum = 0;
                    clickTime = 0;
                } else {
                    var pos = _this.windowToCanvas(_this.measureCanvas, event.clientX, event.clientY);
                    // 单击开始测距
                    pos = {
                        x: (pos.x - _this.options.imgX) / _this.options.imgScale,
                        y: (pos.y - _this.options.imgY) / _this.options.imgScale
                    };
                    if (clickNum === 0) {
                        // 第一次单击
                        var obj = {
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
                        var arr = _this.options.measure[index - 1].move;
                        var lastPoint = arr[arr.length - 1];
                        pos = {
                            x: pos.x,
                            y: pos.y
                        };
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
                    isMoveMap = true;
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
                    // 屏蔽移动地图后触发的测距点击事件
                    setTimeout(function () {
                        isMoveMap = false;
                    }, 200);
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
                // 实时鼠标位置
                var _mapCanvas$getBoundin3 = _this2.mapCanvas.getBoundingClientRect(),
                    height = _mapCanvas$getBoundin3.height;

                var pos = _this2.windowToCanvas(_this2.mapCanvas, event.clientX, event.clientY);
                _this2.options.pointerX = pos.x;
                _this2.options.pointerY = height - pos.y;

                // 鼠标移动显示人物信息

                // 转换为左下角坐标系
                pos = {
                    x: (pos.x - _this2.options.imgX) / _this2.options.imgScale,
                    y: height - (pos.y - _this2.options.imgY) / _this2.options.imgScale
                };
                _this2.options.people.forEach(function (person, i, people) {
                    person.showInfo = false;
                });
                var index = (0, _utils.directPeople)(pos, _this2.options.people, 10 / _this2.options.imgScale);
                if (index === undefined) return;
                _this2.options.people[index].showInfo = true;
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

            var imgArr = void 0;
            if (typeof this.options.peopleImage === 'string') {
                imgArr = [this.options.peopleImage];
            } else if (Array.isArray(this.options.peopleImage)) {
                imgArr = this.options.peopleImage;
            } else throw 'Type [options.peopleImage] can not support';
            var loadNum = 0;
            var peopleImage = imgArr.map(function (src) {
                var img = new Image();
                img.src = src;
                img.addEventListener('load', function () {
                    loadNum++;
                    if (loadNum === imgArr.length) {
                        _this4.drawPeople();
                    }
                });
                return img;
            });
            this.peopleImage = peopleImage;
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
                if (move.length === 0) return;
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
                    (0, _utils.drawLine)(context, color, last.x, last.y, current.x, current.y, 1);
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


            var peopleImgWidth = 16;
            var peopleImgHeight = 18;
            var context = peopleCanvas.getContext('2d');

            var _mapCanvas$getBoundin5 = this.mapCanvas.getBoundingClientRect(),
                height = _mapCanvas$getBoundin5.height;

            this.clearCanvas(context);
            options.people.forEach(function (_ref2) {
                var move = _ref2.move,
                    name = _ref2.name,
                    id = _ref2.id,
                    imgIndex = _ref2.imgIndex,
                    showInfo = _ref2.showInfo;

                if (move.length === 0) return;
                var position = move[move.length - 1];
                // 切换左下角为坐标原点
                position = {
                    x: position.x * options.imgScale + _this6.options.imgX - peopleImgWidth / 2,
                    y: (height - position.y) * options.imgScale + _this6.options.imgY - peopleImgHeight / 2
                };
                if (showInfo) {
                    (0, _utils.drawPeopleInfo)(context, position.x, position.y, {
                        name: name,
                        id: id
                    });
                }
                context.drawImage(peopleImage[imgIndex], position.x, position.y, peopleImgWidth, peopleImgHeight);
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
                    };
                    current = {
                        x: current.x * _this7.options.imgScale + _this7.options.imgX,
                        y: current.y * _this7.options.imgScale + _this7.options.imgY
                    };
                    (0, _utils.drawLine)(context, '#ff6922', last.x, last.y, current.x, current.y, 2);
                    (0, _utils.drawCircle)(context, '#ff6922', current.x, current.y, 5);
                    var text = '';
                    if (index === '0') {
                        // 起点
                        text = '起点';
                    } else {
                        totalLength = totalLength + (0, _utils.calculateLength)(last.x, last.y, current.x, current.y);
                        text = (totalLength / _this7.options.imgScale).toFixed(2) + ' m';
                    }
                    (0, _utils.drawMeasureInfo)(context, current.x, current.y, text);
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
        },
        get: function get() {
            return this.isShowPath;
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

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawLine = drawLine;
exports.drawCircle = drawCircle;
exports.drawMeasureInfo = drawMeasureInfo;
exports.drawPeopleInfo = drawPeopleInfo;
exports.calculateLength = calculateLength;
exports.directPeople = directPeople;
//画线段
function drawLine(ctx, color, x1, y1, x2, y2, lineWidth) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
//画圆
function drawCircle(ctx, color, x, y, radius) {
    //画一个空心圆
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 360, false);
    ctx.fillStyle = "#fff"; //填充颜色
    ctx.fill(); //画实心圆
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke(); //画空心圆
    ctx.closePath();
}

// 画文字
function drawMeasureInfo(ctx, x, y, text) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 8, y - 30, 75, 25);
    ctx.strokeStyle = '#eee';
    ctx.strokeRect(x + 8, y - 30, 75, 25);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#0099CC';
    ctx.fillText(text, x + 12, y - 12);
}

// 画用户信息
function drawPeopleInfo(ctx, x, y, info) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 18, y - 30, 100, 50);
    ctx.strokeStyle = '#eee';
    ctx.strokeRect(x + 18, y - 30, 100, 50);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#0099CC';
    ctx.fillText('\u7F16\u53F7\uFF1A' + info.id, x + 23, y - 10);
    ctx.fillText('\u59D3\u540D\uFF1A' + info.name, x + 23, y + 10);
}

// 勾股定理算两点距离
function calculateLength(x1, y1, x2, y2) {
    var x = x1 - x2;
    var y = y1 - y2;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function directPeople(pos, people, r) {
    var peopleIndex = void 0;
    people.forEach(function (_ref, index) {
        var move = _ref.move;

        if (move.length <= 0) return;
        var peoplePos = move[move.length - 1];
        var pointLength = calculateLength(pos.x, pos.y, peoplePos.x, peoplePos.y);
        if (pointLength < r) peopleIndex = index;
    });

    return peopleIndex;
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mock"] = factory();
	else
		root["Mock"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* global require, module, window */
	var Handler = __webpack_require__(1)
	var Util = __webpack_require__(3)
	var Random = __webpack_require__(5)
	var RE = __webpack_require__(20)
	var toJSONSchema = __webpack_require__(23)
	var valid = __webpack_require__(25)

	var XHR
	if (typeof window !== 'undefined') XHR = __webpack_require__(27)

	/*!
	    Mock - 模拟请求 & 模拟数据
	    https://github.com/nuysoft/Mock
	    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
	*/
	var Mock = {
	    Handler: Handler,
	    Random: Random,
	    Util: Util,
	    XHR: XHR,
	    RE: RE,
	    toJSONSchema: toJSONSchema,
	    valid: valid,
	    heredoc: Util.heredoc,
	    setup: function(settings) {
	        return XHR.setup(settings)
	    },
	    _mocked: {}
	}

	Mock.version = '1.0.1-beta3'

	// 避免循环依赖
	if (XHR) XHR.Mock = Mock

	/*
	    * Mock.mock( template )
	    * Mock.mock( function() )
	    * Mock.mock( rurl, template )
	    * Mock.mock( rurl, function(options) )
	    * Mock.mock( rurl, rtype, template )
	    * Mock.mock( rurl, rtype, function(options) )

	    根据数据模板生成模拟数据。
	*/
	Mock.mock = function(rurl, rtype, template) {
	    // Mock.mock(template)
	    if (arguments.length === 1) {
	        return Handler.gen(rurl)
	    }
	    // Mock.mock(rurl, template)
	    if (arguments.length === 2) {
	        template = rtype
	        rtype = undefined
	    }
	    // 拦截 XHR
	    if (XHR) window.XMLHttpRequest = XHR
	    Mock._mocked[rurl + (rtype || '')] = {
	        rurl: rurl,
	        rtype: rtype,
	        template: template
	    }
	    return Mock
	}

	module.exports = Mock

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* 
	    ## Handler

	    处理数据模板。
	    
	    * Handler.gen( template, name?, context? )

	        入口方法。

	    * Data Template Definition, DTD
	        
	        处理数据模板定义。

	        * Handler.array( options )
	        * Handler.object( options )
	        * Handler.number( options )
	        * Handler.boolean( options )
	        * Handler.string( options )
	        * Handler.function( options )
	        * Handler.regexp( options )
	        
	        处理路径（相对和绝对）。

	        * Handler.getValueByKeyPath( key, options )

	    * Data Placeholder Definition, DPD

	        处理数据占位符定义

	        * Handler.placeholder( placeholder, context, templateContext, options )

	*/

	var Constant = __webpack_require__(2)
	var Util = __webpack_require__(3)
	var Parser = __webpack_require__(4)
	var Random = __webpack_require__(5)
	var RE = __webpack_require__(20)

	var Handler = {
	    extend: Util.extend
	}

	/*
	    template        属性值（即数据模板）
	    name            属性名
	    context         数据上下文，生成后的数据
	    templateContext 模板上下文，

	    Handle.gen(template, name, options)
	    context
	        currentContext, templateCurrentContext, 
	        path, templatePath
	        root, templateRoot
	*/
	Handler.gen = function(template, name, context) {
	    /* jshint -W041 */
	    name = name == undefined ? '' : (name + '')

	    context = context || {}
	    context = {
	            // 当前访问路径，只有属性名，不包括生成规则
	            path: context.path || [Constant.GUID],
	            templatePath: context.templatePath || [Constant.GUID++],
	            // 最终属性值的上下文
	            currentContext: context.currentContext,
	            // 属性值模板的上下文
	            templateCurrentContext: context.templateCurrentContext || template,
	            // 最终值的根
	            root: context.root || context.currentContext,
	            // 模板的根
	            templateRoot: context.templateRoot || context.templateCurrentContext || template
	        }
	        // console.log('path:', context.path.join('.'), template)

	    var rule = Parser.parse(name)
	    var type = Util.type(template)
	    var data

	    if (Handler[type]) {
	        data = Handler[type]({
	            // 属性值类型
	            type: type,
	            // 属性值模板
	            template: template,
	            // 属性名 + 生成规则
	            name: name,
	            // 属性名
	            parsedName: name ? name.replace(Constant.RE_KEY, '$1') : name,

	            // 解析后的生成规则
	            rule: rule,
	            // 相关上下文
	            context: context
	        })

	        if (!context.root) context.root = data
	        return data
	    }

	    return template
	}

	Handler.extend({
	    array: function(options) {
	        var result = [],
	            i, ii;

	        // 'name|1': []
	        // 'name|count': []
	        // 'name|min-max': []
	        if (options.template.length === 0) return result

	        // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
	        if (!options.rule.parameters) {
	            for (i = 0; i < options.template.length; i++) {
	                options.context.path.push(i)
	                options.context.templatePath.push(i)
	                result.push(
	                    Handler.gen(options.template[i], i, {
	                        path: options.context.path,
	                        templatePath: options.context.templatePath,
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        root: options.context.root || result,
	                        templateRoot: options.context.templateRoot || options.template
	                    })
	                )
	                options.context.path.pop()
	                options.context.templatePath.pop()
	            }
	        } else {
	            // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
	            if (options.rule.min === 1 && options.rule.max === undefined) {
	                // fix #17
	                options.context.path.push(options.name)
	                options.context.templatePath.push(options.name)
	                result = Random.pick(
	                    Handler.gen(options.template, undefined, {
	                        path: options.context.path,
	                        templatePath: options.context.templatePath,
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        root: options.context.root || result,
	                        templateRoot: options.context.templateRoot || options.template
	                    })
	                )
	                options.context.path.pop()
	                options.context.templatePath.pop()
	            } else {
	                // 'data|+1': [{}, {}]
	                if (options.rule.parameters[2]) {
	                    options.template.__order_index = options.template.__order_index || 0

	                    options.context.path.push(options.name)
	                    options.context.templatePath.push(options.name)
	                    result = Handler.gen(options.template, undefined, {
	                        path: options.context.path,
	                        templatePath: options.context.templatePath,
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        root: options.context.root || result,
	                        templateRoot: options.context.templateRoot || options.template
	                    })[
	                        options.template.__order_index % options.template.length
	                    ]

	                    options.template.__order_index += +options.rule.parameters[2]

	                    options.context.path.pop()
	                    options.context.templatePath.pop()

	                } else {
	                    // 'data|1-10': [{}]
	                    for (i = 0; i < options.rule.count; i++) {
	                        // 'data|1-10': [{}, {}]
	                        for (ii = 0; ii < options.template.length; ii++) {
	                            options.context.path.push(result.length)
	                            options.context.templatePath.push(ii)
	                            result.push(
	                                Handler.gen(options.template[ii], result.length, {
	                                    path: options.context.path,
	                                    templatePath: options.context.templatePath,
	                                    currentContext: result,
	                                    templateCurrentContext: options.template,
	                                    root: options.context.root || result,
	                                    templateRoot: options.context.templateRoot || options.template
	                                })
	                            )
	                            options.context.path.pop()
	                            options.context.templatePath.pop()
	                        }
	                    }
	                }
	            }
	        }
	        return result
	    },
	    object: function(options) {
	        var result = {},
	            keys, fnKeys, key, parsedKey, inc, i;

	        // 'obj|min-max': {}
	        /* jshint -W041 */
	        if (options.rule.min != undefined) {
	            keys = Util.keys(options.template)
	            keys = Random.shuffle(keys)
	            keys = keys.slice(0, options.rule.count)
	            for (i = 0; i < keys.length; i++) {
	                key = keys[i]
	                parsedKey = key.replace(Constant.RE_KEY, '$1')
	                options.context.path.push(parsedKey)
	                options.context.templatePath.push(key)
	                result[parsedKey] = Handler.gen(options.template[key], key, {
	                    path: options.context.path,
	                    templatePath: options.context.templatePath,
	                    currentContext: result,
	                    templateCurrentContext: options.template,
	                    root: options.context.root || result,
	                    templateRoot: options.context.templateRoot || options.template
	                })
	                options.context.path.pop()
	                options.context.templatePath.pop()
	            }

	        } else {
	            // 'obj': {}
	            keys = []
	            fnKeys = [] // #25 改变了非函数属性的顺序，查找起来不方便
	            for (key in options.template) {
	                (typeof options.template[key] === 'function' ? fnKeys : keys).push(key)
	            }
	            keys = keys.concat(fnKeys)

	            /*
	                会改变非函数属性的顺序
	                keys = Util.keys(options.template)
	                keys.sort(function(a, b) {
	                    var afn = typeof options.template[a] === 'function'
	                    var bfn = typeof options.template[b] === 'function'
	                    if (afn === bfn) return 0
	                    if (afn && !bfn) return 1
	                    if (!afn && bfn) return -1
	                })
	            */

	            for (i = 0; i < keys.length; i++) {
	                key = keys[i]
	                parsedKey = key.replace(Constant.RE_KEY, '$1')
	                options.context.path.push(parsedKey)
	                options.context.templatePath.push(key)
	                result[parsedKey] = Handler.gen(options.template[key], key, {
	                    path: options.context.path,
	                    templatePath: options.context.templatePath,
	                    currentContext: result,
	                    templateCurrentContext: options.template,
	                    root: options.context.root || result,
	                    templateRoot: options.context.templateRoot || options.template
	                })
	                options.context.path.pop()
	                options.context.templatePath.pop()
	                    // 'id|+1': 1
	                inc = key.match(Constant.RE_KEY)
	                if (inc && inc[2] && Util.type(options.template[key]) === 'number') {
	                    options.template[key] += parseInt(inc[2], 10)
	                }
	            }
	        }
	        return result
	    },
	    number: function(options) {
	        var result, parts;
	        if (options.rule.decimal) { // float
	            options.template += ''
	            parts = options.template.split('.')
	                // 'float1|.1-10': 10,
	                // 'float2|1-100.1-10': 1,
	                // 'float3|999.1-10': 1,
	                // 'float4|.3-10': 123.123,
	            parts[0] = options.rule.range ? options.rule.count : parts[0]
	            parts[1] = (parts[1] || '').slice(0, options.rule.dcount)
	            while (parts[1].length < options.rule.dcount) {
	                parts[1] += (
	                    // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
	                    (parts[1].length < options.rule.dcount - 1) ? Random.character('number') : Random.character('123456789')
	                )
	            }
	            result = parseFloat(parts.join('.'), 10)
	        } else { // integer
	            // 'grade1|1-100': 1,
	            result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template
	        }
	        return result
	    },
	    boolean: function(options) {
	        var result;
	        // 'prop|multiple': false, 当前值是相反值的概率倍数
	        // 'prop|probability-probability': false, 当前值与相反值的概率
	        result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template
	        return result
	    },
	    string: function(options) {
	        var result = '',
	            i, placeholders, ph, phed;
	        if (options.template.length) {

	            //  'foo': '★',
	            /* jshint -W041 */
	            if (options.rule.count == undefined) {
	                result += options.template
	            }

	            // 'star|1-5': '★',
	            for (i = 0; i < options.rule.count; i++) {
	                result += options.template
	            }
	            // 'email|1-10': '@EMAIL, ',
	            placeholders = result.match(Constant.RE_PLACEHOLDER) || [] // A-Z_0-9 > \w_
	            for (i = 0; i < placeholders.length; i++) {
	                ph = placeholders[i]

	                // 遇到转义斜杠，不需要解析占位符
	                if (/^\\/.test(ph)) {
	                    placeholders.splice(i--, 1)
	                    continue
	                }

	                phed = Handler.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext, options)

	                // 只有一个占位符，并且没有其他字符
	                if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) { // 
	                    result = phed
	                    break

	                    if (Util.isNumeric(phed)) {
	                        result = parseFloat(phed, 10)
	                        break
	                    }
	                    if (/^(true|false)$/.test(phed)) {
	                        result = phed === 'true' ? true :
	                            phed === 'false' ? false :
	                            phed // 已经是布尔值
	                        break
	                    }
	                }
	                result = result.replace(ph, phed)
	            }

	        } else {
	            // 'ASCII|1-10': '',
	            // 'ASCII': '',
	            result = options.rule.range ? Random.string(options.rule.count) : options.template
	        }
	        return result
	    },
	    'function': function(options) {
	        // ( context, options )
	        return options.template.call(options.context.currentContext, options)
	    },
	    'regexp': function(options) {
	        var source = ''

	        // 'name': /regexp/,
	        /* jshint -W041 */
	        if (options.rule.count == undefined) {
	            source += options.template.source // regexp.source
	        }

	        // 'name|1-5': /regexp/,
	        for (var i = 0; i < options.rule.count; i++) {
	            source += options.template.source
	        }

	        return RE.Handler.gen(
	            RE.Parser.parse(
	                source
	            )
	        )
	    }
	})

	Handler.extend({
	    _all: function() {
	        var re = {};
	        for (var key in Random) re[key.toLowerCase()] = key
	        return re
	    },
	    // 处理占位符，转换为最终值
	    placeholder: function(placeholder, obj, templateContext, options) {
	        // console.log(options.context.path)
	        // 1 key, 2 params
	        Constant.RE_PLACEHOLDER.exec('')
	        var parts = Constant.RE_PLACEHOLDER.exec(placeholder),
	            key = parts && parts[1],
	            lkey = key && key.toLowerCase(),
	            okey = this._all()[lkey],
	            params = parts && parts[2] || ''
	        var pathParts = this.splitPathToArray(key)

	        // 解析占位符的参数
	        try {
	            // 1. 尝试保持参数的类型
	            /*
	                #24 [Window Firefox 30.0 引用 占位符 抛错](https://github.com/nuysoft/Mock/issues/24)
	                [BX9056: 各浏览器下 window.eval 方法的执行上下文存在差异](http://www.w3help.org/zh-cn/causes/BX9056)
	                应该属于 Window Firefox 30.0 的 BUG
	            */
	            /* jshint -W061 */
	            params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + params + ')')
	        } catch (error) {
	            // 2. 如果失败，只能解析为字符串
	            // console.error(error)
	            // if (error instanceof ReferenceError) params = parts[2].split(/,\s*/);
	            // else throw error
	            params = parts[2].split(/,\s*/)
	        }

	        // 占位符优先引用数据模板中的属性
	        if (obj && (key in obj)) return obj[key]

	        // @index @key
	        // if (Constant.RE_INDEX.test(key)) return +options.name
	        // if (Constant.RE_KEY.test(key)) return options.name

	        // 绝对路径 or 相对路径
	        if (
	            key.charAt(0) === '/' ||
	            pathParts.length > 1
	        ) return this.getValueByKeyPath(key, options)

	        // 递归引用数据模板中的属性
	        if (templateContext &&
	            (typeof templateContext === 'object') &&
	            (key in templateContext) &&
	            (placeholder !== templateContext[key]) // fix #15 避免自己依赖自己
	        ) {
	            // 先计算被引用的属性值
	            templateContext[key] = Handler.gen(templateContext[key], key, {
	                currentContext: obj,
	                templateCurrentContext: templateContext
	            })
	            return templateContext[key]
	        }

	        // 如果未找到，则原样返回
	        if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return placeholder

	        // 递归解析参数中的占位符
	        for (var i = 0; i < params.length; i++) {
	            Constant.RE_PLACEHOLDER.exec('')
	            if (Constant.RE_PLACEHOLDER.test(params[i])) {
	                params[i] = Handler.placeholder(params[i], obj, templateContext, options)
	            }
	        }

	        var handle = Random[key] || Random[lkey] || Random[okey]
	        switch (Util.type(handle)) {
	            case 'array':
	                // 自动从数组中取一个，例如 @areas
	                return Random.pick(handle)
	            case 'function':
	                // 执行占位符方法（大多数情况）
	                handle.options = options
	                var re = handle.apply(Random, params)
	                if (re === undefined) re = '' // 因为是在字符串中，所以默认为空字符串。
	                delete handle.options
	                return re
	        }
	    },
	    getValueByKeyPath: function(key, options) {
	        var originalKey = key
	        var keyPathParts = this.splitPathToArray(key)
	        var absolutePathParts = []

	        // 绝对路径
	        if (key.charAt(0) === '/') {
	            absolutePathParts = [options.context.path[0]].concat(
	                this.normalizePath(keyPathParts)
	            )
	        } else {
	            // 相对路径
	            if (keyPathParts.length > 1) {
	                absolutePathParts = options.context.path.slice(0)
	                absolutePathParts.pop()
	                absolutePathParts = this.normalizePath(
	                    absolutePathParts.concat(keyPathParts)
	                )

	            }
	        }

	        key = keyPathParts[keyPathParts.length - 1]
	        var currentContext = options.context.root
	        var templateCurrentContext = options.context.templateRoot
	        for (var i = 1; i < absolutePathParts.length - 1; i++) {
	            currentContext = currentContext[absolutePathParts[i]]
	            templateCurrentContext = templateCurrentContext[absolutePathParts[i]]
	        }
	        // 引用的值已经计算好
	        if (currentContext && (key in currentContext)) return currentContext[key]

	        // 尚未计算，递归引用数据模板中的属性
	        if (templateCurrentContext &&
	            (typeof templateCurrentContext === 'object') &&
	            (key in templateCurrentContext) &&
	            (originalKey !== templateCurrentContext[key]) // fix #15 避免自己依赖自己
	        ) {
	            // 先计算被引用的属性值
	            templateCurrentContext[key] = Handler.gen(templateCurrentContext[key], key, {
	                currentContext: currentContext,
	                templateCurrentContext: templateCurrentContext
	            })
	            return templateCurrentContext[key]
	        }
	    },
	    // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
	    normalizePath: function(pathParts) {
	        var newPathParts = []
	        for (var i = 0; i < pathParts.length; i++) {
	            switch (pathParts[i]) {
	                case '..':
	                    newPathParts.pop()
	                    break
	                case '.':
	                    break
	                default:
	                    newPathParts.push(pathParts[i])
	            }
	        }
	        return newPathParts
	    },
	    splitPathToArray: function(path) {
	        var parts = path.split(/\/+/);
	        if (!parts[parts.length - 1]) parts = parts.slice(0, -1)
	        if (!parts[0]) parts = parts.slice(1)
	        return parts;
	    }
	})

	module.exports = Handler

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	    ## Constant

	    常量集合。
	 */
	/*
	    RE_KEY
	        'name|min-max': value
	        'name|count': value
	        'name|min-max.dmin-dmax': value
	        'name|min-max.dcount': value
	        'name|count.dmin-dmax': value
	        'name|count.dcount': value
	        'name|+step': value

	        1 name, 2 step, 3 range [ min, max ], 4 drange [ dmin, dmax ]

	    RE_PLACEHOLDER
	        placeholder(*)

	    [正则查看工具](http://www.regexper.com/)

	    #26 生成规则 支持 负数，例如 number|-100-100
	*/
	module.exports = {
	    GUID: 1,
	    RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
	    RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
	    RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
	    // /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g
	    // RE_INDEX: /^index$/,
	    // RE_KEY: /^key$/
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	    ## Utilities
	*/
	var Util = {}

	Util.extend = function extend() {
	    var target = arguments[0] || {},
	        i = 1,
	        length = arguments.length,
	        options, name, src, copy, clone

	    if (length === 1) {
	        target = this
	        i = 0
	    }

	    for (; i < length; i++) {
	        options = arguments[i]
	        if (!options) continue

	        for (name in options) {
	            src = target[name]
	            copy = options[name]

	            if (target === copy) continue
	            if (copy === undefined) continue

	            if (Util.isArray(copy) || Util.isObject(copy)) {
	                if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : []
	                if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {}

	                target[name] = Util.extend(clone, copy)
	            } else {
	                target[name] = copy
	            }
	        }
	    }

	    return target
	}

	Util.each = function each(obj, iterator, context) {
	    var i, key
	    if (this.type(obj) === 'number') {
	        for (i = 0; i < obj; i++) {
	            iterator(i, i)
	        }
	    } else if (obj.length === +obj.length) {
	        for (i = 0; i < obj.length; i++) {
	            if (iterator.call(context, obj[i], i, obj) === false) break
	        }
	    } else {
	        for (key in obj) {
	            if (iterator.call(context, obj[key], key, obj) === false) break
	        }
	    }
	}

	Util.type = function type(obj) {
	    return (obj === null || obj === undefined) ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase()
	}

	Util.each('String Object Array RegExp Function'.split(' '), function(value) {
	    Util['is' + value] = function(obj) {
	        return Util.type(obj) === value.toLowerCase()
	    }
	})

	Util.isObjectOrArray = function(value) {
	    return Util.isObject(value) || Util.isArray(value)
	}

	Util.isNumeric = function(value) {
	    return !isNaN(parseFloat(value)) && isFinite(value)
	}

	Util.keys = function(obj) {
	    var keys = [];
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) keys.push(key)
	    }
	    return keys;
	}
	Util.values = function(obj) {
	    var values = [];
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) values.push(obj[key])
	    }
	    return values;
	}

	/*
	    ### Mock.heredoc(fn)

	    * Mock.heredoc(fn)

	    以直观、安全的方式书写（多行）HTML 模板。

	    **使用示例**如下所示：

	        var tpl = Mock.heredoc(function() {
	            /*!
	        {{email}}{{age}}
	        <!-- Mock { 
	            email: '@EMAIL',
	            age: '@INT(1,100)'
	        } -->
	            *\/
	        })
	    
	    **相关阅读**
	    * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)、
	*/
	Util.heredoc = function heredoc(fn) {
	    // 1. 移除起始的 function(){ /*!
	    // 2. 移除末尾的 */ }
	    // 3. 移除起始和末尾的空格
	    return fn.toString()
	        .replace(/^[^\/]+\/\*!?/, '')
	        .replace(/\*\/[^\/]+$/, '')
	        .replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '') // .trim()
	}

	Util.noop = function() {}

	module.exports = Util

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		## Parser

		解析数据模板（属性名部分）。

		* Parser.parse( name )
			
			```json
			{
				parameters: [ name, inc, range, decimal ],
				rnage: [ min , max ],

				min: min,
				max: max,
				count : count,

				decimal: decimal,
				dmin: dmin,
				dmax: dmax,
				dcount: dcount
			}
			```
	 */

	var Constant = __webpack_require__(2)
	var Random = __webpack_require__(5)

	/* jshint -W041 */
	module.exports = {
		parse: function(name) {
			name = name == undefined ? '' : (name + '')

			var parameters = (name || '').match(Constant.RE_KEY)

			var range = parameters && parameters[3] && parameters[3].match(Constant.RE_RANGE)
			var min = range && range[1] && parseInt(range[1], 10) // || 1
			var max = range && range[2] && parseInt(range[2], 10) // || 1
				// repeat || min-max || 1
				// var count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1
			var count = range ? !range[2] ? parseInt(range[1], 10) : Random.integer(min, max) : undefined

			var decimal = parameters && parameters[4] && parameters[4].match(Constant.RE_RANGE)
			var dmin = decimal && decimal[1] && parseInt(decimal[1], 10) // || 0,
			var dmax = decimal && decimal[2] && parseInt(decimal[2], 10) // || 0,
				// int || dmin-dmax || 0
			var dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : undefined

			var result = {
				// 1 name, 2 inc, 3 range, 4 decimal
				parameters: parameters,
				// 1 min, 2 max
				range: range,
				min: min,
				max: max,
				// min-max
				count: count,
				// 是否有 decimal
				decimal: decimal,
				dmin: dmin,
				dmax: dmax,
				// dmin-dimax
				dcount: dcount
			}

			for (var r in result) {
				if (result[r] != undefined) return result
			}

			return {}
		}
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## Mock.Random
	    
	    工具类，用于生成各种随机数据。
	*/

	var Util = __webpack_require__(3)

	var Random = {
	    extend: Util.extend
	}

	Random.extend(__webpack_require__(6))
	Random.extend(__webpack_require__(7))
	Random.extend(__webpack_require__(8))
	Random.extend(__webpack_require__(10))
	Random.extend(__webpack_require__(13))
	Random.extend(__webpack_require__(15))
	Random.extend(__webpack_require__(16))
	Random.extend(__webpack_require__(17))
	Random.extend(__webpack_require__(14))
	Random.extend(__webpack_require__(19))

	module.exports = Random

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
	    ## Basics
	*/
	module.exports = {
	    // 返回一个随机的布尔值。
	    boolean: function(min, max, cur) {
	        if (cur !== undefined) {
	            min = typeof min !== 'undefined' && !isNaN(min) ? parseInt(min, 10) : 1
	            max = typeof max !== 'undefined' && !isNaN(max) ? parseInt(max, 10) : 1
	            return Math.random() > 1.0 / (min + max) * min ? !cur : cur
	        }

	        return Math.random() >= 0.5
	    },
	    bool: function(min, max, cur) {
	        return this.boolean(min, max, cur)
	    },
	    // 返回一个随机的自然数（大于等于 0 的整数）。
	    natural: function(min, max) {
	        min = typeof min !== 'undefined' ? parseInt(min, 10) : 0
	        max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
	        return Math.round(Math.random() * (max - min)) + min
	    },
	    // 返回一个随机的整数。
	    integer: function(min, max) {
	        min = typeof min !== 'undefined' ? parseInt(min, 10) : -9007199254740992
	        max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
	        return Math.round(Math.random() * (max - min)) + min
	    },
	    int: function(min, max) {
	        return this.integer(min, max)
	    },
	    // 返回一个随机的浮点数。
	    float: function(min, max, dmin, dmax) {
	        dmin = dmin === undefined ? 0 : dmin
	        dmin = Math.max(Math.min(dmin, 17), 0)
	        dmax = dmax === undefined ? 17 : dmax
	        dmax = Math.max(Math.min(dmax, 17), 0)
	        var ret = this.integer(min, max) + '.';
	        for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
	            ret += (
	                // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
	                (i < dcount - 1) ? this.character('number') : this.character('123456789')
	            )
	        }
	        return parseFloat(ret, 10)
	    },
	    // 返回一个随机字符。
	    character: function(pool) {
	        var pools = {
	            lower: 'abcdefghijklmnopqrstuvwxyz',
	            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	            number: '0123456789',
	            symbol: '!@#$%^&*()[]'
	        }
	        pools.alpha = pools.lower + pools.upper
	        pools['undefined'] = pools.lower + pools.upper + pools.number + pools.symbol

	        pool = pools[('' + pool).toLowerCase()] || pool
	        return pool.charAt(this.natural(0, pool.length - 1))
	    },
	    char: function(pool) {
	        return this.character(pool)
	    },
	    // 返回一个随机字符串。
	    string: function(pool, min, max) {
	        var len
	        switch (arguments.length) {
	            case 0: // ()
	                len = this.natural(3, 7)
	                break
	            case 1: // ( length )
	                len = pool
	                pool = undefined
	                break
	            case 2:
	                // ( pool, length )
	                if (typeof arguments[0] === 'string') {
	                    len = min
	                } else {
	                    // ( min, max )
	                    len = this.natural(pool, min)
	                    pool = undefined
	                }
	                break
	            case 3:
	                len = this.natural(min, max)
	                break
	        }

	        var text = ''
	        for (var i = 0; i < len; i++) {
	            text += this.character(pool)
	        }

	        return text
	    },
	    str: function( /*pool, min, max*/ ) {
	        return this.string.apply(this, arguments)
	    },
	    // 返回一个整型数组。
	    range: function(start, stop, step) {
	        // range( stop )
	        if (arguments.length <= 1) {
	            stop = start || 0;
	            start = 0;
	        }
	        // range( start, stop )
	        step = arguments[2] || 1;

	        start = +start
	        stop = +stop
	        step = +step

	        var len = Math.max(Math.ceil((stop - start) / step), 0);
	        var idx = 0;
	        var range = new Array(len);

	        while (idx < len) {
	            range[idx++] = start;
	            start += step;
	        }

	        return range;
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
	    ## Date
	*/
	var patternLetters = {
	    yyyy: 'getFullYear',
	    yy: function(date) {
	        return ('' + date.getFullYear()).slice(2)
	    },
	    y: 'yy',

	    MM: function(date) {
	        var m = date.getMonth() + 1
	        return m < 10 ? '0' + m : m
	    },
	    M: function(date) {
	        return date.getMonth() + 1
	    },

	    dd: function(date) {
	        var d = date.getDate()
	        return d < 10 ? '0' + d : d
	    },
	    d: 'getDate',

	    HH: function(date) {
	        var h = date.getHours()
	        return h < 10 ? '0' + h : h
	    },
	    H: 'getHours',
	    hh: function(date) {
	        var h = date.getHours() % 12
	        return h < 10 ? '0' + h : h
	    },
	    h: function(date) {
	        return date.getHours() % 12
	    },

	    mm: function(date) {
	        var m = date.getMinutes()
	        return m < 10 ? '0' + m : m
	    },
	    m: 'getMinutes',

	    ss: function(date) {
	        var s = date.getSeconds()
	        return s < 10 ? '0' + s : s
	    },
	    s: 'getSeconds',

	    SS: function(date) {
	        var ms = date.getMilliseconds()
	        return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms
	    },
	    S: 'getMilliseconds',

	    A: function(date) {
	        return date.getHours() < 12 ? 'AM' : 'PM'
	    },
	    a: function(date) {
	        return date.getHours() < 12 ? 'am' : 'pm'
	    },
	    T: 'getTime'
	}
	module.exports = {
	    // 日期占位符集合。
	    _patternLetters: patternLetters,
	    // 日期占位符正则。
	    _rformat: new RegExp((function() {
	        var re = []
	        for (var i in patternLetters) re.push(i)
	        return '(' + re.join('|') + ')'
	    })(), 'g'),
	    // 格式化日期。
	    _formatDate: function(date, format) {
	        return format.replace(this._rformat, function creatNewSubString($0, flag) {
	            return typeof patternLetters[flag] === 'function' ? patternLetters[flag](date) :
	                patternLetters[flag] in patternLetters ? creatNewSubString($0, patternLetters[flag]) :
	                date[patternLetters[flag]]()
	        })
	    },
	    // 生成一个随机的 Date 对象。
	    _randomDate: function(min, max) { // min, max
	        min = min === undefined ? new Date(0) : min
	        max = max === undefined ? new Date() : max
	        return new Date(Math.random() * (max.getTime() - min.getTime()))
	    },
	    // 返回一个随机的日期字符串。
	    date: function(format) {
	        format = format || 'yyyy-MM-dd'
	        return this._formatDate(this._randomDate(), format)
	    },
	    // 返回一个随机的时间字符串。
	    time: function(format) {
	        format = format || 'HH:mm:ss'
	        return this._formatDate(this._randomDate(), format)
	    },
	    // 返回一个随机的日期和时间字符串。
	    datetime: function(format) {
	        format = format || 'yyyy-MM-dd HH:mm:ss'
	        return this._formatDate(this._randomDate(), format)
	    },
	    // 返回当前的日期和时间字符串。
	    now: function(unit, format) {
	        // now(unit) now(format)
	        if (arguments.length === 1) {
	            // now(format)
	            if (!/year|month|day|hour|minute|second|week/.test(unit)) {
	                format = unit
	                unit = ''
	            }
	        }
	        unit = (unit || '').toLowerCase()
	        format = format || 'yyyy-MM-dd HH:mm:ss'

	        var date = new Date()

	        /* jshint -W086 */
	        // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/
	        switch (unit) {
	            case 'year':
	                date.setMonth(0)
	            case 'month':
	                date.setDate(1)
	            case 'week':
	            case 'day':
	                date.setHours(0)
	            case 'hour':
	                date.setMinutes(0)
	            case 'minute':
	                date.setSeconds(0)
	            case 'second':
	                date.setMilliseconds(0)
	        }
	        switch (unit) {
	            case 'week':
	                date.setDate(date.getDate() - date.getDay())
	        }

	        return this._formatDate(date, format)
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* global document  */
	/*
	    ## Image
	*/
	module.exports = {
	    // 常见的广告宽高
	    _adSize: [
	        '300x250', '250x250', '240x400', '336x280', '180x150',
	        '720x300', '468x60', '234x60', '88x31', '120x90',
	        '120x60', '120x240', '125x125', '728x90', '160x600',
	        '120x600', '300x600'
	    ],
	    // 常见的屏幕宽高
	    _screenSize: [
	        '320x200', '320x240', '640x480', '800x480', '800x480',
	        '1024x600', '1024x768', '1280x800', '1440x900', '1920x1200',
	        '2560x1600'
	    ],
	    // 常见的视频宽高
	    _videoSize: ['720x480', '768x576', '1280x720', '1920x1080'],
	    /*
	        生成一个随机的图片地址。

	        替代图片源
	            http://fpoimg.com/
	        参考自 
	            http://rensanning.iteye.com/blog/1933310
	            http://code.tutsplus.com/articles/the-top-8-placeholders-for-web-designers--net-19485
	    */
	    image: function(size, background, foreground, format, text) {
	        // Random.image( size, background, foreground, text )
	        if (arguments.length === 4) {
	            text = format
	            format = undefined
	        }
	        // Random.image( size, background, text )
	        if (arguments.length === 3) {
	            text = foreground
	            foreground = undefined
	        }
	        // Random.image()
	        if (!size) size = this.pick(this._adSize)

	        if (background && ~background.indexOf('#')) background = background.slice(1)
	        if (foreground && ~foreground.indexOf('#')) foreground = foreground.slice(1)

	        // http://dummyimage.com/600x400/cc00cc/470047.png&text=hello
	        return 'http://dummyimage.com/' + size +
	            (background ? '/' + background : '') +
	            (foreground ? '/' + foreground : '') +
	            (format ? '.' + format : '') +
	            (text ? '&text=' + text : '')
	    },
	    img: function() {
	        return this.image.apply(this, arguments)
	    },

	    /*
	        BrandColors
	        http://brandcolors.net/
	        A collection of major brand color codes curated by Galen Gidman.
	        大牌公司的颜色集合

	        // 获取品牌和颜色
	        $('h2').each(function(index, item){
	            item = $(item)
	            console.log('\'' + item.text() + '\'', ':', '\'' + item.next().text() + '\'', ',')
	        })
	    */
	    _brandColors: {
	        '4ormat': '#fb0a2a',
	        '500px': '#02adea',
	        'About.me (blue)': '#00405d',
	        'About.me (yellow)': '#ffcc33',
	        'Addvocate': '#ff6138',
	        'Adobe': '#ff0000',
	        'Aim': '#fcd20b',
	        'Amazon': '#e47911',
	        'Android': '#a4c639',
	        'Angie\'s List': '#7fbb00',
	        'AOL': '#0060a3',
	        'Atlassian': '#003366',
	        'Behance': '#053eff',
	        'Big Cartel': '#97b538',
	        'bitly': '#ee6123',
	        'Blogger': '#fc4f08',
	        'Boeing': '#0039a6',
	        'Booking.com': '#003580',
	        'Carbonmade': '#613854',
	        'Cheddar': '#ff7243',
	        'Code School': '#3d4944',
	        'Delicious': '#205cc0',
	        'Dell': '#3287c1',
	        'Designmoo': '#e54a4f',
	        'Deviantart': '#4e6252',
	        'Designer News': '#2d72da',
	        'Devour': '#fd0001',
	        'DEWALT': '#febd17',
	        'Disqus (blue)': '#59a3fc',
	        'Disqus (orange)': '#db7132',
	        'Dribbble': '#ea4c89',
	        'Dropbox': '#3d9ae8',
	        'Drupal': '#0c76ab',
	        'Dunked': '#2a323a',
	        'eBay': '#89c507',
	        'Ember': '#f05e1b',
	        'Engadget': '#00bdf6',
	        'Envato': '#528036',
	        'Etsy': '#eb6d20',
	        'Evernote': '#5ba525',
	        'Fab.com': '#dd0017',
	        'Facebook': '#3b5998',
	        'Firefox': '#e66000',
	        'Flickr (blue)': '#0063dc',
	        'Flickr (pink)': '#ff0084',
	        'Forrst': '#5b9a68',
	        'Foursquare': '#25a0ca',
	        'Garmin': '#007cc3',
	        'GetGlue': '#2d75a2',
	        'Gimmebar': '#f70078',
	        'GitHub': '#171515',
	        'Google Blue': '#0140ca',
	        'Google Green': '#16a61e',
	        'Google Red': '#dd1812',
	        'Google Yellow': '#fcca03',
	        'Google+': '#dd4b39',
	        'Grooveshark': '#f77f00',
	        'Groupon': '#82b548',
	        'Hacker News': '#ff6600',
	        'HelloWallet': '#0085ca',
	        'Heroku (light)': '#c7c5e6',
	        'Heroku (dark)': '#6567a5',
	        'HootSuite': '#003366',
	        'Houzz': '#73ba37',
	        'HTML5': '#ec6231',
	        'IKEA': '#ffcc33',
	        'IMDb': '#f3ce13',
	        'Instagram': '#3f729b',
	        'Intel': '#0071c5',
	        'Intuit': '#365ebf',
	        'Kickstarter': '#76cc1e',
	        'kippt': '#e03500',
	        'Kodery': '#00af81',
	        'LastFM': '#c3000d',
	        'LinkedIn': '#0e76a8',
	        'Livestream': '#cf0005',
	        'Lumo': '#576396',
	        'Mixpanel': '#a086d3',
	        'Meetup': '#e51937',
	        'Nokia': '#183693',
	        'NVIDIA': '#76b900',
	        'Opera': '#cc0f16',
	        'Path': '#e41f11',
	        'PayPal (dark)': '#1e477a',
	        'PayPal (light)': '#3b7bbf',
	        'Pinboard': '#0000e6',
	        'Pinterest': '#c8232c',
	        'PlayStation': '#665cbe',
	        'Pocket': '#ee4056',
	        'Prezi': '#318bff',
	        'Pusha': '#0f71b4',
	        'Quora': '#a82400',
	        'QUOTE.fm': '#66ceff',
	        'Rdio': '#008fd5',
	        'Readability': '#9c0000',
	        'Red Hat': '#cc0000',
	        'Resource': '#7eb400',
	        'Rockpack': '#0ba6ab',
	        'Roon': '#62b0d9',
	        'RSS': '#ee802f',
	        'Salesforce': '#1798c1',
	        'Samsung': '#0c4da2',
	        'Shopify': '#96bf48',
	        'Skype': '#00aff0',
	        'Snagajob': '#f47a20',
	        'Softonic': '#008ace',
	        'SoundCloud': '#ff7700',
	        'Space Box': '#f86960',
	        'Spotify': '#81b71a',
	        'Sprint': '#fee100',
	        'Squarespace': '#121212',
	        'StackOverflow': '#ef8236',
	        'Staples': '#cc0000',
	        'Status Chart': '#d7584f',
	        'Stripe': '#008cdd',
	        'StudyBlue': '#00afe1',
	        'StumbleUpon': '#f74425',
	        'T-Mobile': '#ea0a8e',
	        'Technorati': '#40a800',
	        'The Next Web': '#ef4423',
	        'Treehouse': '#5cb868',
	        'Trulia': '#5eab1f',
	        'Tumblr': '#34526f',
	        'Twitch.tv': '#6441a5',
	        'Twitter': '#00acee',
	        'TYPO3': '#ff8700',
	        'Ubuntu': '#dd4814',
	        'Ustream': '#3388ff',
	        'Verizon': '#ef1d1d',
	        'Vimeo': '#86c9ef',
	        'Vine': '#00a478',
	        'Virb': '#06afd8',
	        'Virgin Media': '#cc0000',
	        'Wooga': '#5b009c',
	        'WordPress (blue)': '#21759b',
	        'WordPress (orange)': '#d54e21',
	        'WordPress (grey)': '#464646',
	        'Wunderlist': '#2b88d9',
	        'XBOX': '#9bc848',
	        'XING': '#126567',
	        'Yahoo!': '#720e9e',
	        'Yandex': '#ffcc00',
	        'Yelp': '#c41200',
	        'YouTube': '#c4302b',
	        'Zalongo': '#5498dc',
	        'Zendesk': '#78a300',
	        'Zerply': '#9dcc7a',
	        'Zootool': '#5e8b1d'
	    },
	    _brandNames: function() {
	        var brands = [];
	        for (var b in this._brandColors) {
	            brands.push(b)
	        }
	        return brands
	    },
	    /*
	        生成一段随机的 Base64 图片编码。

	        https://github.com/imsky/holder
	        Holder renders image placeholders entirely on the client side.

	        dataImageHolder: function(size) {
	            return 'holder.js/' + size
	        },
	    */
	    dataImage: function(size, text) {
	        var canvas
	        if (typeof document !== 'undefined') {
	            canvas = document.createElement('canvas')
	        } else {
	            /*
	                https://github.com/Automattic/node-canvas
	                    npm install canvas --save
	                安装问题：
	                * http://stackoverflow.com/questions/22953206/gulp-issues-with-cario-install-command-not-found-when-trying-to-installing-canva
	                * https://github.com/Automattic/node-canvas/issues/415
	                * https://github.com/Automattic/node-canvas/wiki/_pages

	                PS：node-canvas 的安装过程实在是太繁琐了，所以不放入 package.json 的 dependencies。
	             */
	            var Canvas = module.require('canvas')
	            canvas = new Canvas()
	        }

	        var ctx = canvas && canvas.getContext && canvas.getContext("2d")
	        if (!canvas || !ctx) return ''

	        if (!size) size = this.pick(this._adSize)
	        text = text !== undefined ? text : size

	        size = size.split('x')

	        var width = parseInt(size[0], 10),
	            height = parseInt(size[1], 10),
	            background = this._brandColors[this.pick(this._brandNames())],
	            foreground = '#FFF',
	            text_height = 14,
	            font = 'sans-serif';

	        canvas.width = width
	        canvas.height = height
	        ctx.textAlign = 'center'
	        ctx.textBaseline = 'middle'
	        ctx.fillStyle = background
	        ctx.fillRect(0, 0, width, height)
	        ctx.fillStyle = foreground
	        ctx.font = 'bold ' + text_height + 'px ' + font
	        ctx.fillText(text, (width / 2), (height / 2), width)
	        return canvas.toDataURL('image/png')
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## Color

	    http://llllll.li/randomColor/
	        A color generator for JavaScript.
	        randomColor generates attractive colors by default. More specifically, randomColor produces bright colors with a reasonably high saturation. This makes randomColor particularly useful for data visualizations and generative art.

	    http://randomcolour.com/
	        var bg_colour = Math.floor(Math.random() * 16777215).toString(16);
	        bg_colour = "#" + ("000000" + bg_colour).slice(-6);
	        document.bgColor = bg_colour;
	    
	    http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
	        Creating random colors is actually more difficult than it seems. The randomness itself is easy, but aesthetically pleasing randomness is more difficult.
	        https://github.com/devongovett/color-generator

	    http://www.paulirish.com/2009/random-hex-color-code-snippets/
	        Random Hex Color Code Generator in JavaScript

	    http://chancejs.com/#color
	        chance.color()
	        // => '#79c157'
	        chance.color({format: 'hex'})
	        // => '#d67118'
	        chance.color({format: 'shorthex'})
	        // => '#60f'
	        chance.color({format: 'rgb'})
	        // => 'rgb(110,52,164)'

	    http://tool.c7sky.com/webcolor
	        网页设计常用色彩搭配表
	    
	    https://github.com/One-com/one-color
	        An OO-based JavaScript color parser/computation toolkit with support for RGB, HSV, HSL, CMYK, and alpha channels.
	        API 很赞

	    https://github.com/harthur/color
	        JavaScript color conversion and manipulation library

	    https://github.com/leaverou/css-colors
	        Share & convert CSS colors
	    http://leaverou.github.io/css-colors/#slategray
	        Type a CSS color keyword, #hex, hsl(), rgba(), whatever:

	    色调 hue
	        http://baike.baidu.com/view/23368.htm
	        色调指的是一幅画中画面色彩的总体倾向，是大的色彩效果。
	    饱和度 saturation
	        http://baike.baidu.com/view/189644.htm
	        饱和度是指色彩的鲜艳程度，也称色彩的纯度。饱和度取决于该色中含色成分和消色成分（灰色）的比例。含色成分越大，饱和度越大；消色成分越大，饱和度越小。
	    亮度 brightness
	        http://baike.baidu.com/view/34773.htm
	        亮度是指发光体（反光体）表面发光（反光）强弱的物理量。
	    照度 luminosity
	        物体被照亮的程度,采用单位面积所接受的光通量来表示,表示单位为勒[克斯](Lux,lx) ,即 1m / m2 。

	    http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
	        var letters = '0123456789ABCDEF'.split('')
	        var color = '#'
	        for (var i = 0; i < 6; i++) {
	            color += letters[Math.floor(Math.random() * 16)]
	        }
	        return color
	    
	        // 随机生成一个无脑的颜色，格式为 '#RRGGBB'。
	        // _brainlessColor()
	        var color = Math.floor(
	            Math.random() *
	            (16 * 16 * 16 * 16 * 16 * 16 - 1)
	        ).toString(16)
	        color = "#" + ("000000" + color).slice(-6)
	        return color.toUpperCase()
	*/

	var Convert = __webpack_require__(11)
	var DICT = __webpack_require__(12)

	module.exports = {
	    // 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
	    color: function(name) {
	        if (name || DICT[name]) return DICT[name].nicer
	        return this.hex()
	    },
	    // #DAC0DE
	    hex: function() {
	        var hsv = this._goldenRatioColor()
	        var rgb = Convert.hsv2rgb(hsv)
	        var hex = Convert.rgb2hex(rgb[0], rgb[1], rgb[2])
	        return hex
	    },
	    // rgb(128,255,255)
	    rgb: function() {
	        var hsv = this._goldenRatioColor()
	        var rgb = Convert.hsv2rgb(hsv)
	        return 'rgb(' +
	            parseInt(rgb[0], 10) + ', ' +
	            parseInt(rgb[1], 10) + ', ' +
	            parseInt(rgb[2], 10) + ')'
	    },
	    // rgba(128,255,255,0.3)
	    rgba: function() {
	        var hsv = this._goldenRatioColor()
	        var rgb = Convert.hsv2rgb(hsv)
	        return 'rgba(' +
	            parseInt(rgb[0], 10) + ', ' +
	            parseInt(rgb[1], 10) + ', ' +
	            parseInt(rgb[2], 10) + ', ' +
	            Math.random().toFixed(2) + ')'
	    },
	    // hsl(300,80%,90%)
	    hsl: function() {
	        var hsv = this._goldenRatioColor()
	        var hsl = Convert.hsv2hsl(hsv)
	        return 'hsl(' +
	            parseInt(hsl[0], 10) + ', ' +
	            parseInt(hsl[1], 10) + ', ' +
	            parseInt(hsl[2], 10) + ')'
	    },
	    // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
	    // https://github.com/devongovett/color-generator/blob/master/index.js
	    // 随机生成一个有吸引力的颜色。
	    _goldenRatioColor: function(saturation, value) {
	        this._goldenRatio = 0.618033988749895
	        this._hue = this._hue || Math.random()
	        this._hue += this._goldenRatio
	        this._hue %= 1

	        if (typeof saturation !== "number") saturation = 0.5;
	        if (typeof value !== "number") value = 0.95;

	        return [
	            this._hue * 360,
	            saturation * 100,
	            value * 100
	        ]
	    }
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
	    ## Color Convert

	    http://blog.csdn.net/idfaya/article/details/6770414
	        颜色空间RGB与HSV(HSL)的转换
	*/
	// https://github.com/harthur/color-convert/blob/master/conversions.js
	module.exports = {
		rgb2hsl: function rgb2hsl(rgb) {
			var r = rgb[0] / 255,
				g = rgb[1] / 255,
				b = rgb[2] / 255,
				min = Math.min(r, g, b),
				max = Math.max(r, g, b),
				delta = max - min,
				h, s, l;

			if (max == min)
				h = 0;
			else if (r == max)
				h = (g - b) / delta;
			else if (g == max)
				h = 2 + (b - r) / delta;
			else if (b == max)
				h = 4 + (r - g) / delta;

			h = Math.min(h * 60, 360);

			if (h < 0)
				h += 360;

			l = (min + max) / 2;

			if (max == min)
				s = 0;
			else if (l <= 0.5)
				s = delta / (max + min);
			else
				s = delta / (2 - max - min);

			return [h, s * 100, l * 100];
		},
		rgb2hsv: function rgb2hsv(rgb) {
			var r = rgb[0],
				g = rgb[1],
				b = rgb[2],
				min = Math.min(r, g, b),
				max = Math.max(r, g, b),
				delta = max - min,
				h, s, v;

			if (max === 0)
				s = 0;
			else
				s = (delta / max * 1000) / 10;

			if (max == min)
				h = 0;
			else if (r == max)
				h = (g - b) / delta;
			else if (g == max)
				h = 2 + (b - r) / delta;
			else if (b == max)
				h = 4 + (r - g) / delta;

			h = Math.min(h * 60, 360);

			if (h < 0)
				h += 360;

			v = ((max / 255) * 1000) / 10;

			return [h, s, v];
		},
		hsl2rgb: function hsl2rgb(hsl) {
			var h = hsl[0] / 360,
				s = hsl[1] / 100,
				l = hsl[2] / 100,
				t1, t2, t3, rgb, val;

			if (s === 0) {
				val = l * 255;
				return [val, val, val];
			}

			if (l < 0.5)
				t2 = l * (1 + s);
			else
				t2 = l + s - l * s;
			t1 = 2 * l - t2;

			rgb = [0, 0, 0];
			for (var i = 0; i < 3; i++) {
				t3 = h + 1 / 3 * -(i - 1);
				if (t3 < 0) t3++;
				if (t3 > 1) t3--;

				if (6 * t3 < 1)
					val = t1 + (t2 - t1) * 6 * t3;
				else if (2 * t3 < 1)
					val = t2;
				else if (3 * t3 < 2)
					val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
				else
					val = t1;

				rgb[i] = val * 255;
			}

			return rgb;
		},
		hsl2hsv: function hsl2hsv(hsl) {
			var h = hsl[0],
				s = hsl[1] / 100,
				l = hsl[2] / 100,
				sv, v;
			l *= 2;
			s *= (l <= 1) ? l : 2 - l;
			v = (l + s) / 2;
			sv = (2 * s) / (l + s);
			return [h, sv * 100, v * 100];
		},
		hsv2rgb: function hsv2rgb(hsv) {
			var h = hsv[0] / 60
			var s = hsv[1] / 100
			var v = hsv[2] / 100
			var hi = Math.floor(h) % 6

			var f = h - Math.floor(h)
			var p = 255 * v * (1 - s)
			var q = 255 * v * (1 - (s * f))
			var t = 255 * v * (1 - (s * (1 - f)))

			v = 255 * v

			switch (hi) {
				case 0:
					return [v, t, p]
				case 1:
					return [q, v, p]
				case 2:
					return [p, v, t]
				case 3:
					return [p, q, v]
				case 4:
					return [t, p, v]
				case 5:
					return [v, p, q]
			}
		},
		hsv2hsl: function hsv2hsl(hsv) {
			var h = hsv[0],
				s = hsv[1] / 100,
				v = hsv[2] / 100,
				sl, l;

			l = (2 - s) * v;
			sl = s * v;
			sl /= (l <= 1) ? l : 2 - l;
			l /= 2;
			return [h, sl * 100, l * 100];
		},
		// http://www.140byt.es/keywords/color
		rgb2hex: function(
			a, // red, as a number from 0 to 255
			b, // green, as a number from 0 to 255
			c // blue, as a number from 0 to 255
		) {
			return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1)
		},
		hex2rgb: function(
			a // take a "#xxxxxx" hex string,
		) {
			a = '0x' + a.slice(1).replace(a.length > 4 ? a : /./g, '$&$&') | 0;
			return [a >> 16, a >> 8 & 255, a & 255]
		}
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
	    ## Color 字典数据

	    字典数据来源 [A nicer color palette for the web](http://clrs.cc/)
	*/
	module.exports = {
	    // name value nicer
	    navy: {
	        value: '#000080',
	        nicer: '#001F3F'
	    },
	    blue: {
	        value: '#0000ff',
	        nicer: '#0074D9'
	    },
	    aqua: {
	        value: '#00ffff',
	        nicer: '#7FDBFF'
	    },
	    teal: {
	        value: '#008080',
	        nicer: '#39CCCC'
	    },
	    olive: {
	        value: '#008000',
	        nicer: '#3D9970'
	    },
	    green: {
	        value: '#008000',
	        nicer: '#2ECC40'
	    },
	    lime: {
	        value: '#00ff00',
	        nicer: '#01FF70'
	    },
	    yellow: {
	        value: '#ffff00',
	        nicer: '#FFDC00'
	    },
	    orange: {
	        value: '#ffa500',
	        nicer: '#FF851B'
	    },
	    red: {
	        value: '#ff0000',
	        nicer: '#FF4136'
	    },
	    maroon: {
	        value: '#800000',
	        nicer: '#85144B'
	    },
	    fuchsia: {
	        value: '#ff00ff',
	        nicer: '#F012BE'
	    },
	    purple: {
	        value: '#800080',
	        nicer: '#B10DC9'
	    },
	    silver: {
	        value: '#c0c0c0',
	        nicer: '#DDDDDD'
	    },
	    gray: {
	        value: '#808080',
	        nicer: '#AAAAAA'
	    },
	    black: {
	        value: '#000000',
	        nicer: '#111111'
	    },
	    white: {
	        value: '#FFFFFF',
	        nicer: '#FFFFFF'
	    }
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## Text

	    http://www.lipsum.com/
	*/
	var Basic = __webpack_require__(6)
	var Helper = __webpack_require__(14)

	function range(defaultMin, defaultMax, min, max) {
	    return min === undefined ? Basic.natural(defaultMin, defaultMax) : // ()
	        max === undefined ? min : // ( len )
	        Basic.natural(parseInt(min, 10), parseInt(max, 10)) // ( min, max )
	}

	module.exports = {
	    // 随机生成一段文本。
	    paragraph: function(min, max) {
	        var len = range(3, 7, min, max)
	        var result = []
	        for (var i = 0; i < len; i++) {
	            result.push(this.sentence())
	        }
	        return result.join(' ')
	    },
	    // 
	    cparagraph: function(min, max) {
	        var len = range(3, 7, min, max)
	        var result = []
	        for (var i = 0; i < len; i++) {
	            result.push(this.csentence())
	        }
	        return result.join('')
	    },
	    // 随机生成一个句子，第一个单词的首字母大写。
	    sentence: function(min, max) {
	        var len = range(12, 18, min, max)
	        var result = []
	        for (var i = 0; i < len; i++) {
	            result.push(this.word())
	        }
	        return Helper.capitalize(result.join(' ')) + '.'
	    },
	    // 随机生成一个中文句子。
	    csentence: function(min, max) {
	        var len = range(12, 18, min, max)
	        var result = []
	        for (var i = 0; i < len; i++) {
	            result.push(this.cword())
	        }

	        return result.join('') + '。'
	    },
	    // 随机生成一个单词。
	    word: function(min, max) {
	        var len = range(3, 10, min, max)
	        var result = '';
	        for (var i = 0; i < len; i++) {
	            result += Basic.character('lower')
	        }
	        return result
	    },
	    // 随机生成一个或多个汉字。
	    cword: function(pool, min, max) {
	        // 最常用的 500 个汉字 http://baike.baidu.com/view/568436.htm
	        var DICT_KANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞'

	        var len
	        switch (arguments.length) {
	            case 0: // ()
	                pool = DICT_KANZI
	                len = 1
	                break
	            case 1: // ( pool )
	                if (typeof arguments[0] === 'string') {
	                    len = 1
	                } else {
	                    // ( length )
	                    len = pool
	                    pool = DICT_KANZI
	                }
	                break
	            case 2:
	                // ( pool, length )
	                if (typeof arguments[0] === 'string') {
	                    len = min
	                } else {
	                    // ( min, max )
	                    len = this.natural(pool, min)
	                    pool = DICT_KANZI
	                }
	                break
	            case 3:
	                len = this.natural(min, max)
	                break
	        }

	        var result = ''
	        for (var i = 0; i < len; i++) {
	            result += pool.charAt(this.natural(0, pool.length - 1))
	        }
	        return result
	    },
	    // 随机生成一句标题，其中每个单词的首字母大写。
	    title: function(min, max) {
	        var len = range(3, 7, min, max)
	        var result = []
	        for (var i = 0; i < len; i++) {
	            result.push(this.capitalize(this.word()))
	        }
	        return result.join(' ')
	    },
	    // 随机生成一句中文标题。
	    ctitle: function(min, max) {
	        var len = range(3, 7, min, max)
	        var result = []
	        for (var i = 0; i < len; i++) {
	            result.push(this.cword())
	        }
	        return result.join('')
	    }
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## Helpers
	*/

	var Util = __webpack_require__(3)

	module.exports = {
		// 把字符串的第一个字母转换为大写。
		capitalize: function(word) {
			return (word + '').charAt(0).toUpperCase() + (word + '').substr(1)
		},
		// 把字符串转换为大写。
		upper: function(str) {
			return (str + '').toUpperCase()
		},
		// 把字符串转换为小写。
		lower: function(str) {
			return (str + '').toLowerCase()
		},
		// 从数组中随机选取一个元素，并返回。
		pick: function pick(arr, min, max) {
			// pick( item1, item2 ... )
			if (!Util.isArray(arr)) {
				arr = [].slice.call(arguments)
				min = 1
				max = 1
			} else {
				// pick( [ item1, item2 ... ] )
				if (min === undefined) min = 1

				// pick( [ item1, item2 ... ], count )
				if (max === undefined) max = min
			}

			if (min === 1 && max === 1) return arr[this.natural(0, arr.length - 1)]

			// pick( [ item1, item2 ... ], min, max )
			return this.shuffle(arr, min, max)

			// 通过参数个数判断方法签名，扩展性太差！#90
			// switch (arguments.length) {
			// 	case 1:
			// 		// pick( [ item1, item2 ... ] )
			// 		return arr[this.natural(0, arr.length - 1)]
			// 	case 2:
			// 		// pick( [ item1, item2 ... ], count )
			// 		max = min
			// 			/* falls through */
			// 	case 3:
			// 		// pick( [ item1, item2 ... ], min, max )
			// 		return this.shuffle(arr, min, max)
			// }
		},
		/*
		    打乱数组中元素的顺序，并返回。
		    Given an array, scramble the order and return it.

		    其他的实现思路：
		        // https://code.google.com/p/jslibs/wiki/JavascriptTips
		        result = result.sort(function() {
		            return Math.random() - 0.5
		        })
		*/
		shuffle: function shuffle(arr, min, max) {
			arr = arr || []
			var old = arr.slice(0),
				result = [],
				index = 0,
				length = old.length;
			for (var i = 0; i < length; i++) {
				index = this.natural(0, old.length - 1)
				result.push(old[index])
				old.splice(index, 1)
			}
			switch (arguments.length) {
				case 0:
				case 1:
					return result
				case 2:
					max = min
						/* falls through */
				case 3:
					min = parseInt(min, 10)
					max = parseInt(max, 10)
					return result.slice(0, this.natural(min, max))
			}
		},
		/*
		    * Random.order(item, item)
		    * Random.order([item, item ...])

		    顺序获取数组中的元素

		    [JSON导入数组支持数组数据录入](https://github.com/thx/RAP/issues/22)

		    不支持单独调用！
		*/
		order: function order(array) {
			order.cache = order.cache || {}

			if (arguments.length > 1) array = [].slice.call(arguments, 0)

			// options.context.path/templatePath
			var options = order.options
			var templatePath = options.context.templatePath.join('.')

			var cache = (
				order.cache[templatePath] = order.cache[templatePath] || {
					index: 0,
					array: array
				}
			)

			return cache.array[cache.index++ % cache.array.length]
		}
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
	    ## Name

	    [Beyond the Top 1000 Names](http://www.ssa.gov/oact/babynames/limits.html)
	*/
	module.exports = {
		// 随机生成一个常见的英文名。
		first: function() {
			var names = [
				// male
				"James", "John", "Robert", "Michael", "William",
				"David", "Richard", "Charles", "Joseph", "Thomas",
				"Christopher", "Daniel", "Paul", "Mark", "Donald",
				"George", "Kenneth", "Steven", "Edward", "Brian",
				"Ronald", "Anthony", "Kevin", "Jason", "Matthew",
				"Gary", "Timothy", "Jose", "Larry", "Jeffrey",
				"Frank", "Scott", "Eric"
			].concat([
				// female
				"Mary", "Patricia", "Linda", "Barbara", "Elizabeth",
				"Jennifer", "Maria", "Susan", "Margaret", "Dorothy",
				"Lisa", "Nancy", "Karen", "Betty", "Helen",
				"Sandra", "Donna", "Carol", "Ruth", "Sharon",
				"Michelle", "Laura", "Sarah", "Kimberly", "Deborah",
				"Jessica", "Shirley", "Cynthia", "Angela", "Melissa",
				"Brenda", "Amy", "Anna"
			])
			return this.pick(names)
				// or this.capitalize(this.word())
		},
		// 随机生成一个常见的英文姓。
		last: function() {
			var names = [
				"Smith", "Johnson", "Williams", "Brown", "Jones",
				"Miller", "Davis", "Garcia", "Rodriguez", "Wilson",
				"Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
				"Moore", "Martin", "Jackson", "Thompson", "White",
				"Lopez", "Lee", "Gonzalez", "Harris", "Clark",
				"Lewis", "Robinson", "Walker", "Perez", "Hall",
				"Young", "Allen"
			]
			return this.pick(names)
				// or this.capitalize(this.word())
		},
		// 随机生成一个常见的英文姓名。
		name: function(middle) {
			return this.first() + ' ' +
				(middle ? this.first() + ' ' : '') +
				this.last()
		},
		/*
		    随机生成一个常见的中文姓。
		    [世界常用姓氏排行](http://baike.baidu.com/view/1719115.htm)
		    [玄派网 - 网络小说创作辅助平台](http://xuanpai.sinaapp.com/)
		 */
		cfirst: function() {
			var names = (
				'王 李 张 刘 陈 杨 赵 黄 周 吴 ' +
				'徐 孙 胡 朱 高 林 何 郭 马 罗 ' +
				'梁 宋 郑 谢 韩 唐 冯 于 董 萧 ' +
				'程 曹 袁 邓 许 傅 沈 曾 彭 吕 ' +
				'苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 ' +
				'余 潘 杜 戴 夏 锺 汪 田 任 姜 ' +
				'范 方 石 姚 谭 廖 邹 熊 金 陆 ' +
				'郝 孔 白 崔 康 毛 邱 秦 江 史 ' +
				'顾 侯 邵 孟 龙 万 段 雷 钱 汤 ' +
				'尹 黎 易 常 武 乔 贺 赖 龚 文'
			).split(' ')
			return this.pick(names)
		},
		/*
		    随机生成一个常见的中文名。
		    [中国最常见名字前50名_三九算命网](http://www.name999.net/xingming/xingshi/20131004/48.html)
		 */
		clast: function() {
			var names = (
				'伟 芳 娜 秀英 敏 静 丽 强 磊 军 ' +
				'洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 ' +
				'平 刚 桂英'
			).split(' ')
			return this.pick(names)
		},
		// 随机生成一个常见的中文姓名。
		cname: function() {
			return this.cfirst() + this.clast()
		}
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	/*
	    ## Web
	*/
	module.exports = {
	    /*
	        随机生成一个 URL。

	        [URL 规范](http://www.w3.org/Addressing/URL/url-spec.txt)
	            http                    Hypertext Transfer Protocol 
	            ftp                     File Transfer protocol 
	            gopher                  The Gopher protocol 
	            mailto                  Electronic mail address 
	            mid                     Message identifiers for electronic mail 
	            cid                     Content identifiers for MIME body part 
	            news                    Usenet news 
	            nntp                    Usenet news for local NNTP access only 
	            prospero                Access using the prospero protocols 
	            telnet rlogin tn3270    Reference to interactive sessions
	            wais                    Wide Area Information Servers 
	    */
	    url: function(protocol, host) {
	        return (protocol || this.protocol()) + '://' + // protocol?
	            (host || this.domain()) + // host?
	            '/' + this.word()
	    },
	    // 随机生成一个 URL 协议。
	    protocol: function() {
	        return this.pick(
	            // 协议簇
	            'http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais'.split(' ')
	        )
	    },
	    // 随机生成一个域名。
	    domain: function(tld) {
	        return this.word() + '.' + (tld || this.tld())
	    },
	    /*
	        随机生成一个顶级域名。
	        国际顶级域名 international top-level domain-names, iTLDs
	        国家顶级域名 national top-level domainnames, nTLDs
	        [域名后缀大全](http://www.163ns.com/zixun/post/4417.html)
	    */
	    tld: function() { // Top Level Domain
	        return this.pick(
	            (
	                // 域名后缀
	                'com net org edu gov int mil cn ' +
	                // 国内域名
	                'com.cn net.cn gov.cn org.cn ' +
	                // 中文国内域名
	                '中国 中国互联.公司 中国互联.网络 ' +
	                // 新国际域名
	                'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
	                // 世界各国域名后缀
	                'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw'
	            ).split(' ')
	        )
	    },
	    // 随机生成一个邮件地址。
	    email: function(domain) {
	        return this.character('lower') + '.' + this.word() + '@' +
	            (
	                domain ||
	                (this.word() + '.' + this.tld())
	            )
	            // return this.character('lower') + '.' + this.last().toLowerCase() + '@' + this.last().toLowerCase() + '.' + this.tld()
	            // return this.word() + '@' + (domain || this.domain())
	    },
	    // 随机生成一个 IP 地址。
	    ip: function() {
	        return this.natural(0, 255) + '.' +
	            this.natural(0, 255) + '.' +
	            this.natural(0, 255) + '.' +
	            this.natural(0, 255)
	    }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## Address
	*/

	var DICT = __webpack_require__(18)
	var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北']

	module.exports = {
	    // 随机生成一个大区。
	    region: function() {
	        return this.pick(REGION)
	    },
	    // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
	    province: function() {
	        return this.pick(DICT).name
	    },
	    // 随机生成一个（中国）市。
	    city: function(prefix) {
	        var province = this.pick(DICT)
	        var city = this.pick(province.children)
	        return prefix ? [province.name, city.name].join(' ') : city.name
	    },
	    // 随机生成一个（中国）县。
	    county: function(prefix) {
	        var province = this.pick(DICT)
	        var city = this.pick(province.children)
	        var county = this.pick(city.children) || {
	            name: '-'
	        }
	        return prefix ? [province.name, city.name, county.name].join(' ') : county.name
	    },
	    // 随机生成一个邮政编码（六位数字）。
	    zip: function(len) {
	        var zip = ''
	        for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9)
	        return zip
	    }

	    // address: function() {},
	    // phone: function() {},
	    // areacode: function() {},
	    // street: function() {},
	    // street_suffixes: function() {},
	    // street_suffix: function() {},
	    // states: function() {},
	    // state: function() {},
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
	    ## Address 字典数据

	    字典数据来源 http://www.atatech.org/articles/30028?rnd=254259856

	    国标 省（市）级行政区划码表

	    华北   北京市 天津市 河北省 山西省 内蒙古自治区
	    东北   辽宁省 吉林省 黑龙江省
	    华东   上海市 江苏省 浙江省 安徽省 福建省 江西省 山东省
	    华南   广东省 广西壮族自治区 海南省
	    华中   河南省 湖北省 湖南省
	    西南   重庆市 四川省 贵州省 云南省 西藏自治区
	    西北   陕西省 甘肃省 青海省 宁夏回族自治区 新疆维吾尔自治区
	    港澳台 香港特别行政区 澳门特别行政区 台湾省
	    
	    **排序**
	    
	    ```js
	    var map = {}
	    _.each(_.keys(REGIONS),function(id){
	      map[id] = REGIONS[ID]
	    })
	    JSON.stringify(map)
	    ```
	*/
	var DICT = {
	    "110000": "北京",
	    "110100": "北京市",
	    "110101": "东城区",
	    "110102": "西城区",
	    "110105": "朝阳区",
	    "110106": "丰台区",
	    "110107": "石景山区",
	    "110108": "海淀区",
	    "110109": "门头沟区",
	    "110111": "房山区",
	    "110112": "通州区",
	    "110113": "顺义区",
	    "110114": "昌平区",
	    "110115": "大兴区",
	    "110116": "怀柔区",
	    "110117": "平谷区",
	    "110228": "密云县",
	    "110229": "延庆县",
	    "110230": "其它区",
	    "120000": "天津",
	    "120100": "天津市",
	    "120101": "和平区",
	    "120102": "河东区",
	    "120103": "河西区",
	    "120104": "南开区",
	    "120105": "河北区",
	    "120106": "红桥区",
	    "120110": "东丽区",
	    "120111": "西青区",
	    "120112": "津南区",
	    "120113": "北辰区",
	    "120114": "武清区",
	    "120115": "宝坻区",
	    "120116": "滨海新区",
	    "120221": "宁河县",
	    "120223": "静海县",
	    "120225": "蓟县",
	    "120226": "其它区",
	    "130000": "河北省",
	    "130100": "石家庄市",
	    "130102": "长安区",
	    "130103": "桥东区",
	    "130104": "桥西区",
	    "130105": "新华区",
	    "130107": "井陉矿区",
	    "130108": "裕华区",
	    "130121": "井陉县",
	    "130123": "正定县",
	    "130124": "栾城县",
	    "130125": "行唐县",
	    "130126": "灵寿县",
	    "130127": "高邑县",
	    "130128": "深泽县",
	    "130129": "赞皇县",
	    "130130": "无极县",
	    "130131": "平山县",
	    "130132": "元氏县",
	    "130133": "赵县",
	    "130181": "辛集市",
	    "130182": "藁城市",
	    "130183": "晋州市",
	    "130184": "新乐市",
	    "130185": "鹿泉市",
	    "130186": "其它区",
	    "130200": "唐山市",
	    "130202": "路南区",
	    "130203": "路北区",
	    "130204": "古冶区",
	    "130205": "开平区",
	    "130207": "丰南区",
	    "130208": "丰润区",
	    "130223": "滦县",
	    "130224": "滦南县",
	    "130225": "乐亭县",
	    "130227": "迁西县",
	    "130229": "玉田县",
	    "130230": "曹妃甸区",
	    "130281": "遵化市",
	    "130283": "迁安市",
	    "130284": "其它区",
	    "130300": "秦皇岛市",
	    "130302": "海港区",
	    "130303": "山海关区",
	    "130304": "北戴河区",
	    "130321": "青龙满族自治县",
	    "130322": "昌黎县",
	    "130323": "抚宁县",
	    "130324": "卢龙县",
	    "130398": "其它区",
	    "130400": "邯郸市",
	    "130402": "邯山区",
	    "130403": "丛台区",
	    "130404": "复兴区",
	    "130406": "峰峰矿区",
	    "130421": "邯郸县",
	    "130423": "临漳县",
	    "130424": "成安县",
	    "130425": "大名县",
	    "130426": "涉县",
	    "130427": "磁县",
	    "130428": "肥乡县",
	    "130429": "永年县",
	    "130430": "邱县",
	    "130431": "鸡泽县",
	    "130432": "广平县",
	    "130433": "馆陶县",
	    "130434": "魏县",
	    "130435": "曲周县",
	    "130481": "武安市",
	    "130482": "其它区",
	    "130500": "邢台市",
	    "130502": "桥东区",
	    "130503": "桥西区",
	    "130521": "邢台县",
	    "130522": "临城县",
	    "130523": "内丘县",
	    "130524": "柏乡县",
	    "130525": "隆尧县",
	    "130526": "任县",
	    "130527": "南和县",
	    "130528": "宁晋县",
	    "130529": "巨鹿县",
	    "130530": "新河县",
	    "130531": "广宗县",
	    "130532": "平乡县",
	    "130533": "威县",
	    "130534": "清河县",
	    "130535": "临西县",
	    "130581": "南宫市",
	    "130582": "沙河市",
	    "130583": "其它区",
	    "130600": "保定市",
	    "130602": "新市区",
	    "130603": "北市区",
	    "130604": "南市区",
	    "130621": "满城县",
	    "130622": "清苑县",
	    "130623": "涞水县",
	    "130624": "阜平县",
	    "130625": "徐水县",
	    "130626": "定兴县",
	    "130627": "唐县",
	    "130628": "高阳县",
	    "130629": "容城县",
	    "130630": "涞源县",
	    "130631": "望都县",
	    "130632": "安新县",
	    "130633": "易县",
	    "130634": "曲阳县",
	    "130635": "蠡县",
	    "130636": "顺平县",
	    "130637": "博野县",
	    "130638": "雄县",
	    "130681": "涿州市",
	    "130682": "定州市",
	    "130683": "安国市",
	    "130684": "高碑店市",
	    "130699": "其它区",
	    "130700": "张家口市",
	    "130702": "桥东区",
	    "130703": "桥西区",
	    "130705": "宣化区",
	    "130706": "下花园区",
	    "130721": "宣化县",
	    "130722": "张北县",
	    "130723": "康保县",
	    "130724": "沽源县",
	    "130725": "尚义县",
	    "130726": "蔚县",
	    "130727": "阳原县",
	    "130728": "怀安县",
	    "130729": "万全县",
	    "130730": "怀来县",
	    "130731": "涿鹿县",
	    "130732": "赤城县",
	    "130733": "崇礼县",
	    "130734": "其它区",
	    "130800": "承德市",
	    "130802": "双桥区",
	    "130803": "双滦区",
	    "130804": "鹰手营子矿区",
	    "130821": "承德县",
	    "130822": "兴隆县",
	    "130823": "平泉县",
	    "130824": "滦平县",
	    "130825": "隆化县",
	    "130826": "丰宁满族自治县",
	    "130827": "宽城满族自治县",
	    "130828": "围场满族蒙古族自治县",
	    "130829": "其它区",
	    "130900": "沧州市",
	    "130902": "新华区",
	    "130903": "运河区",
	    "130921": "沧县",
	    "130922": "青县",
	    "130923": "东光县",
	    "130924": "海兴县",
	    "130925": "盐山县",
	    "130926": "肃宁县",
	    "130927": "南皮县",
	    "130928": "吴桥县",
	    "130929": "献县",
	    "130930": "孟村回族自治县",
	    "130981": "泊头市",
	    "130982": "任丘市",
	    "130983": "黄骅市",
	    "130984": "河间市",
	    "130985": "其它区",
	    "131000": "廊坊市",
	    "131002": "安次区",
	    "131003": "广阳区",
	    "131022": "固安县",
	    "131023": "永清县",
	    "131024": "香河县",
	    "131025": "大城县",
	    "131026": "文安县",
	    "131028": "大厂回族自治县",
	    "131081": "霸州市",
	    "131082": "三河市",
	    "131083": "其它区",
	    "131100": "衡水市",
	    "131102": "桃城区",
	    "131121": "枣强县",
	    "131122": "武邑县",
	    "131123": "武强县",
	    "131124": "饶阳县",
	    "131125": "安平县",
	    "131126": "故城县",
	    "131127": "景县",
	    "131128": "阜城县",
	    "131181": "冀州市",
	    "131182": "深州市",
	    "131183": "其它区",
	    "140000": "山西省",
	    "140100": "太原市",
	    "140105": "小店区",
	    "140106": "迎泽区",
	    "140107": "杏花岭区",
	    "140108": "尖草坪区",
	    "140109": "万柏林区",
	    "140110": "晋源区",
	    "140121": "清徐县",
	    "140122": "阳曲县",
	    "140123": "娄烦县",
	    "140181": "古交市",
	    "140182": "其它区",
	    "140200": "大同市",
	    "140202": "城区",
	    "140203": "矿区",
	    "140211": "南郊区",
	    "140212": "新荣区",
	    "140221": "阳高县",
	    "140222": "天镇县",
	    "140223": "广灵县",
	    "140224": "灵丘县",
	    "140225": "浑源县",
	    "140226": "左云县",
	    "140227": "大同县",
	    "140228": "其它区",
	    "140300": "阳泉市",
	    "140302": "城区",
	    "140303": "矿区",
	    "140311": "郊区",
	    "140321": "平定县",
	    "140322": "盂县",
	    "140323": "其它区",
	    "140400": "长治市",
	    "140421": "长治县",
	    "140423": "襄垣县",
	    "140424": "屯留县",
	    "140425": "平顺县",
	    "140426": "黎城县",
	    "140427": "壶关县",
	    "140428": "长子县",
	    "140429": "武乡县",
	    "140430": "沁县",
	    "140431": "沁源县",
	    "140481": "潞城市",
	    "140482": "城区",
	    "140483": "郊区",
	    "140485": "其它区",
	    "140500": "晋城市",
	    "140502": "城区",
	    "140521": "沁水县",
	    "140522": "阳城县",
	    "140524": "陵川县",
	    "140525": "泽州县",
	    "140581": "高平市",
	    "140582": "其它区",
	    "140600": "朔州市",
	    "140602": "朔城区",
	    "140603": "平鲁区",
	    "140621": "山阴县",
	    "140622": "应县",
	    "140623": "右玉县",
	    "140624": "怀仁县",
	    "140625": "其它区",
	    "140700": "晋中市",
	    "140702": "榆次区",
	    "140721": "榆社县",
	    "140722": "左权县",
	    "140723": "和顺县",
	    "140724": "昔阳县",
	    "140725": "寿阳县",
	    "140726": "太谷县",
	    "140727": "祁县",
	    "140728": "平遥县",
	    "140729": "灵石县",
	    "140781": "介休市",
	    "140782": "其它区",
	    "140800": "运城市",
	    "140802": "盐湖区",
	    "140821": "临猗县",
	    "140822": "万荣县",
	    "140823": "闻喜县",
	    "140824": "稷山县",
	    "140825": "新绛县",
	    "140826": "绛县",
	    "140827": "垣曲县",
	    "140828": "夏县",
	    "140829": "平陆县",
	    "140830": "芮城县",
	    "140881": "永济市",
	    "140882": "河津市",
	    "140883": "其它区",
	    "140900": "忻州市",
	    "140902": "忻府区",
	    "140921": "定襄县",
	    "140922": "五台县",
	    "140923": "代县",
	    "140924": "繁峙县",
	    "140925": "宁武县",
	    "140926": "静乐县",
	    "140927": "神池县",
	    "140928": "五寨县",
	    "140929": "岢岚县",
	    "140930": "河曲县",
	    "140931": "保德县",
	    "140932": "偏关县",
	    "140981": "原平市",
	    "140982": "其它区",
	    "141000": "临汾市",
	    "141002": "尧都区",
	    "141021": "曲沃县",
	    "141022": "翼城县",
	    "141023": "襄汾县",
	    "141024": "洪洞县",
	    "141025": "古县",
	    "141026": "安泽县",
	    "141027": "浮山县",
	    "141028": "吉县",
	    "141029": "乡宁县",
	    "141030": "大宁县",
	    "141031": "隰县",
	    "141032": "永和县",
	    "141033": "蒲县",
	    "141034": "汾西县",
	    "141081": "侯马市",
	    "141082": "霍州市",
	    "141083": "其它区",
	    "141100": "吕梁市",
	    "141102": "离石区",
	    "141121": "文水县",
	    "141122": "交城县",
	    "141123": "兴县",
	    "141124": "临县",
	    "141125": "柳林县",
	    "141126": "石楼县",
	    "141127": "岚县",
	    "141128": "方山县",
	    "141129": "中阳县",
	    "141130": "交口县",
	    "141181": "孝义市",
	    "141182": "汾阳市",
	    "141183": "其它区",
	    "150000": "内蒙古自治区",
	    "150100": "呼和浩特市",
	    "150102": "新城区",
	    "150103": "回民区",
	    "150104": "玉泉区",
	    "150105": "赛罕区",
	    "150121": "土默特左旗",
	    "150122": "托克托县",
	    "150123": "和林格尔县",
	    "150124": "清水河县",
	    "150125": "武川县",
	    "150126": "其它区",
	    "150200": "包头市",
	    "150202": "东河区",
	    "150203": "昆都仑区",
	    "150204": "青山区",
	    "150205": "石拐区",
	    "150206": "白云鄂博矿区",
	    "150207": "九原区",
	    "150221": "土默特右旗",
	    "150222": "固阳县",
	    "150223": "达尔罕茂明安联合旗",
	    "150224": "其它区",
	    "150300": "乌海市",
	    "150302": "海勃湾区",
	    "150303": "海南区",
	    "150304": "乌达区",
	    "150305": "其它区",
	    "150400": "赤峰市",
	    "150402": "红山区",
	    "150403": "元宝山区",
	    "150404": "松山区",
	    "150421": "阿鲁科尔沁旗",
	    "150422": "巴林左旗",
	    "150423": "巴林右旗",
	    "150424": "林西县",
	    "150425": "克什克腾旗",
	    "150426": "翁牛特旗",
	    "150428": "喀喇沁旗",
	    "150429": "宁城县",
	    "150430": "敖汉旗",
	    "150431": "其它区",
	    "150500": "通辽市",
	    "150502": "科尔沁区",
	    "150521": "科尔沁左翼中旗",
	    "150522": "科尔沁左翼后旗",
	    "150523": "开鲁县",
	    "150524": "库伦旗",
	    "150525": "奈曼旗",
	    "150526": "扎鲁特旗",
	    "150581": "霍林郭勒市",
	    "150582": "其它区",
	    "150600": "鄂尔多斯市",
	    "150602": "东胜区",
	    "150621": "达拉特旗",
	    "150622": "准格尔旗",
	    "150623": "鄂托克前旗",
	    "150624": "鄂托克旗",
	    "150625": "杭锦旗",
	    "150626": "乌审旗",
	    "150627": "伊金霍洛旗",
	    "150628": "其它区",
	    "150700": "呼伦贝尔市",
	    "150702": "海拉尔区",
	    "150703": "扎赉诺尔区",
	    "150721": "阿荣旗",
	    "150722": "莫力达瓦达斡尔族自治旗",
	    "150723": "鄂伦春自治旗",
	    "150724": "鄂温克族自治旗",
	    "150725": "陈巴尔虎旗",
	    "150726": "新巴尔虎左旗",
	    "150727": "新巴尔虎右旗",
	    "150781": "满洲里市",
	    "150782": "牙克石市",
	    "150783": "扎兰屯市",
	    "150784": "额尔古纳市",
	    "150785": "根河市",
	    "150786": "其它区",
	    "150800": "巴彦淖尔市",
	    "150802": "临河区",
	    "150821": "五原县",
	    "150822": "磴口县",
	    "150823": "乌拉特前旗",
	    "150824": "乌拉特中旗",
	    "150825": "乌拉特后旗",
	    "150826": "杭锦后旗",
	    "150827": "其它区",
	    "150900": "乌兰察布市",
	    "150902": "集宁区",
	    "150921": "卓资县",
	    "150922": "化德县",
	    "150923": "商都县",
	    "150924": "兴和县",
	    "150925": "凉城县",
	    "150926": "察哈尔右翼前旗",
	    "150927": "察哈尔右翼中旗",
	    "150928": "察哈尔右翼后旗",
	    "150929": "四子王旗",
	    "150981": "丰镇市",
	    "150982": "其它区",
	    "152200": "兴安盟",
	    "152201": "乌兰浩特市",
	    "152202": "阿尔山市",
	    "152221": "科尔沁右翼前旗",
	    "152222": "科尔沁右翼中旗",
	    "152223": "扎赉特旗",
	    "152224": "突泉县",
	    "152225": "其它区",
	    "152500": "锡林郭勒盟",
	    "152501": "二连浩特市",
	    "152502": "锡林浩特市",
	    "152522": "阿巴嘎旗",
	    "152523": "苏尼特左旗",
	    "152524": "苏尼特右旗",
	    "152525": "东乌珠穆沁旗",
	    "152526": "西乌珠穆沁旗",
	    "152527": "太仆寺旗",
	    "152528": "镶黄旗",
	    "152529": "正镶白旗",
	    "152530": "正蓝旗",
	    "152531": "多伦县",
	    "152532": "其它区",
	    "152900": "阿拉善盟",
	    "152921": "阿拉善左旗",
	    "152922": "阿拉善右旗",
	    "152923": "额济纳旗",
	    "152924": "其它区",
	    "210000": "辽宁省",
	    "210100": "沈阳市",
	    "210102": "和平区",
	    "210103": "沈河区",
	    "210104": "大东区",
	    "210105": "皇姑区",
	    "210106": "铁西区",
	    "210111": "苏家屯区",
	    "210112": "东陵区",
	    "210113": "新城子区",
	    "210114": "于洪区",
	    "210122": "辽中县",
	    "210123": "康平县",
	    "210124": "法库县",
	    "210181": "新民市",
	    "210184": "沈北新区",
	    "210185": "其它区",
	    "210200": "大连市",
	    "210202": "中山区",
	    "210203": "西岗区",
	    "210204": "沙河口区",
	    "210211": "甘井子区",
	    "210212": "旅顺口区",
	    "210213": "金州区",
	    "210224": "长海县",
	    "210281": "瓦房店市",
	    "210282": "普兰店市",
	    "210283": "庄河市",
	    "210298": "其它区",
	    "210300": "鞍山市",
	    "210302": "铁东区",
	    "210303": "铁西区",
	    "210304": "立山区",
	    "210311": "千山区",
	    "210321": "台安县",
	    "210323": "岫岩满族自治县",
	    "210381": "海城市",
	    "210382": "其它区",
	    "210400": "抚顺市",
	    "210402": "新抚区",
	    "210403": "东洲区",
	    "210404": "望花区",
	    "210411": "顺城区",
	    "210421": "抚顺县",
	    "210422": "新宾满族自治县",
	    "210423": "清原满族自治县",
	    "210424": "其它区",
	    "210500": "本溪市",
	    "210502": "平山区",
	    "210503": "溪湖区",
	    "210504": "明山区",
	    "210505": "南芬区",
	    "210521": "本溪满族自治县",
	    "210522": "桓仁满族自治县",
	    "210523": "其它区",
	    "210600": "丹东市",
	    "210602": "元宝区",
	    "210603": "振兴区",
	    "210604": "振安区",
	    "210624": "宽甸满族自治县",
	    "210681": "东港市",
	    "210682": "凤城市",
	    "210683": "其它区",
	    "210700": "锦州市",
	    "210702": "古塔区",
	    "210703": "凌河区",
	    "210711": "太和区",
	    "210726": "黑山县",
	    "210727": "义县",
	    "210781": "凌海市",
	    "210782": "北镇市",
	    "210783": "其它区",
	    "210800": "营口市",
	    "210802": "站前区",
	    "210803": "西市区",
	    "210804": "鲅鱼圈区",
	    "210811": "老边区",
	    "210881": "盖州市",
	    "210882": "大石桥市",
	    "210883": "其它区",
	    "210900": "阜新市",
	    "210902": "海州区",
	    "210903": "新邱区",
	    "210904": "太平区",
	    "210905": "清河门区",
	    "210911": "细河区",
	    "210921": "阜新蒙古族自治县",
	    "210922": "彰武县",
	    "210923": "其它区",
	    "211000": "辽阳市",
	    "211002": "白塔区",
	    "211003": "文圣区",
	    "211004": "宏伟区",
	    "211005": "弓长岭区",
	    "211011": "太子河区",
	    "211021": "辽阳县",
	    "211081": "灯塔市",
	    "211082": "其它区",
	    "211100": "盘锦市",
	    "211102": "双台子区",
	    "211103": "兴隆台区",
	    "211121": "大洼县",
	    "211122": "盘山县",
	    "211123": "其它区",
	    "211200": "铁岭市",
	    "211202": "银州区",
	    "211204": "清河区",
	    "211221": "铁岭县",
	    "211223": "西丰县",
	    "211224": "昌图县",
	    "211281": "调兵山市",
	    "211282": "开原市",
	    "211283": "其它区",
	    "211300": "朝阳市",
	    "211302": "双塔区",
	    "211303": "龙城区",
	    "211321": "朝阳县",
	    "211322": "建平县",
	    "211324": "喀喇沁左翼蒙古族自治县",
	    "211381": "北票市",
	    "211382": "凌源市",
	    "211383": "其它区",
	    "211400": "葫芦岛市",
	    "211402": "连山区",
	    "211403": "龙港区",
	    "211404": "南票区",
	    "211421": "绥中县",
	    "211422": "建昌县",
	    "211481": "兴城市",
	    "211482": "其它区",
	    "220000": "吉林省",
	    "220100": "长春市",
	    "220102": "南关区",
	    "220103": "宽城区",
	    "220104": "朝阳区",
	    "220105": "二道区",
	    "220106": "绿园区",
	    "220112": "双阳区",
	    "220122": "农安县",
	    "220181": "九台市",
	    "220182": "榆树市",
	    "220183": "德惠市",
	    "220188": "其它区",
	    "220200": "吉林市",
	    "220202": "昌邑区",
	    "220203": "龙潭区",
	    "220204": "船营区",
	    "220211": "丰满区",
	    "220221": "永吉县",
	    "220281": "蛟河市",
	    "220282": "桦甸市",
	    "220283": "舒兰市",
	    "220284": "磐石市",
	    "220285": "其它区",
	    "220300": "四平市",
	    "220302": "铁西区",
	    "220303": "铁东区",
	    "220322": "梨树县",
	    "220323": "伊通满族自治县",
	    "220381": "公主岭市",
	    "220382": "双辽市",
	    "220383": "其它区",
	    "220400": "辽源市",
	    "220402": "龙山区",
	    "220403": "西安区",
	    "220421": "东丰县",
	    "220422": "东辽县",
	    "220423": "其它区",
	    "220500": "通化市",
	    "220502": "东昌区",
	    "220503": "二道江区",
	    "220521": "通化县",
	    "220523": "辉南县",
	    "220524": "柳河县",
	    "220581": "梅河口市",
	    "220582": "集安市",
	    "220583": "其它区",
	    "220600": "白山市",
	    "220602": "浑江区",
	    "220621": "抚松县",
	    "220622": "靖宇县",
	    "220623": "长白朝鲜族自治县",
	    "220625": "江源区",
	    "220681": "临江市",
	    "220682": "其它区",
	    "220700": "松原市",
	    "220702": "宁江区",
	    "220721": "前郭尔罗斯蒙古族自治县",
	    "220722": "长岭县",
	    "220723": "乾安县",
	    "220724": "扶余市",
	    "220725": "其它区",
	    "220800": "白城市",
	    "220802": "洮北区",
	    "220821": "镇赉县",
	    "220822": "通榆县",
	    "220881": "洮南市",
	    "220882": "大安市",
	    "220883": "其它区",
	    "222400": "延边朝鲜族自治州",
	    "222401": "延吉市",
	    "222402": "图们市",
	    "222403": "敦化市",
	    "222404": "珲春市",
	    "222405": "龙井市",
	    "222406": "和龙市",
	    "222424": "汪清县",
	    "222426": "安图县",
	    "222427": "其它区",
	    "230000": "黑龙江省",
	    "230100": "哈尔滨市",
	    "230102": "道里区",
	    "230103": "南岗区",
	    "230104": "道外区",
	    "230106": "香坊区",
	    "230108": "平房区",
	    "230109": "松北区",
	    "230111": "呼兰区",
	    "230123": "依兰县",
	    "230124": "方正县",
	    "230125": "宾县",
	    "230126": "巴彦县",
	    "230127": "木兰县",
	    "230128": "通河县",
	    "230129": "延寿县",
	    "230181": "阿城区",
	    "230182": "双城市",
	    "230183": "尚志市",
	    "230184": "五常市",
	    "230186": "其它区",
	    "230200": "齐齐哈尔市",
	    "230202": "龙沙区",
	    "230203": "建华区",
	    "230204": "铁锋区",
	    "230205": "昂昂溪区",
	    "230206": "富拉尔基区",
	    "230207": "碾子山区",
	    "230208": "梅里斯达斡尔族区",
	    "230221": "龙江县",
	    "230223": "依安县",
	    "230224": "泰来县",
	    "230225": "甘南县",
	    "230227": "富裕县",
	    "230229": "克山县",
	    "230230": "克东县",
	    "230231": "拜泉县",
	    "230281": "讷河市",
	    "230282": "其它区",
	    "230300": "鸡西市",
	    "230302": "鸡冠区",
	    "230303": "恒山区",
	    "230304": "滴道区",
	    "230305": "梨树区",
	    "230306": "城子河区",
	    "230307": "麻山区",
	    "230321": "鸡东县",
	    "230381": "虎林市",
	    "230382": "密山市",
	    "230383": "其它区",
	    "230400": "鹤岗市",
	    "230402": "向阳区",
	    "230403": "工农区",
	    "230404": "南山区",
	    "230405": "兴安区",
	    "230406": "东山区",
	    "230407": "兴山区",
	    "230421": "萝北县",
	    "230422": "绥滨县",
	    "230423": "其它区",
	    "230500": "双鸭山市",
	    "230502": "尖山区",
	    "230503": "岭东区",
	    "230505": "四方台区",
	    "230506": "宝山区",
	    "230521": "集贤县",
	    "230522": "友谊县",
	    "230523": "宝清县",
	    "230524": "饶河县",
	    "230525": "其它区",
	    "230600": "大庆市",
	    "230602": "萨尔图区",
	    "230603": "龙凤区",
	    "230604": "让胡路区",
	    "230605": "红岗区",
	    "230606": "大同区",
	    "230621": "肇州县",
	    "230622": "肇源县",
	    "230623": "林甸县",
	    "230624": "杜尔伯特蒙古族自治县",
	    "230625": "其它区",
	    "230700": "伊春市",
	    "230702": "伊春区",
	    "230703": "南岔区",
	    "230704": "友好区",
	    "230705": "西林区",
	    "230706": "翠峦区",
	    "230707": "新青区",
	    "230708": "美溪区",
	    "230709": "金山屯区",
	    "230710": "五营区",
	    "230711": "乌马河区",
	    "230712": "汤旺河区",
	    "230713": "带岭区",
	    "230714": "乌伊岭区",
	    "230715": "红星区",
	    "230716": "上甘岭区",
	    "230722": "嘉荫县",
	    "230781": "铁力市",
	    "230782": "其它区",
	    "230800": "佳木斯市",
	    "230803": "向阳区",
	    "230804": "前进区",
	    "230805": "东风区",
	    "230811": "郊区",
	    "230822": "桦南县",
	    "230826": "桦川县",
	    "230828": "汤原县",
	    "230833": "抚远县",
	    "230881": "同江市",
	    "230882": "富锦市",
	    "230883": "其它区",
	    "230900": "七台河市",
	    "230902": "新兴区",
	    "230903": "桃山区",
	    "230904": "茄子河区",
	    "230921": "勃利县",
	    "230922": "其它区",
	    "231000": "牡丹江市",
	    "231002": "东安区",
	    "231003": "阳明区",
	    "231004": "爱民区",
	    "231005": "西安区",
	    "231024": "东宁县",
	    "231025": "林口县",
	    "231081": "绥芬河市",
	    "231083": "海林市",
	    "231084": "宁安市",
	    "231085": "穆棱市",
	    "231086": "其它区",
	    "231100": "黑河市",
	    "231102": "爱辉区",
	    "231121": "嫩江县",
	    "231123": "逊克县",
	    "231124": "孙吴县",
	    "231181": "北安市",
	    "231182": "五大连池市",
	    "231183": "其它区",
	    "231200": "绥化市",
	    "231202": "北林区",
	    "231221": "望奎县",
	    "231222": "兰西县",
	    "231223": "青冈县",
	    "231224": "庆安县",
	    "231225": "明水县",
	    "231226": "绥棱县",
	    "231281": "安达市",
	    "231282": "肇东市",
	    "231283": "海伦市",
	    "231284": "其它区",
	    "232700": "大兴安岭地区",
	    "232702": "松岭区",
	    "232703": "新林区",
	    "232704": "呼中区",
	    "232721": "呼玛县",
	    "232722": "塔河县",
	    "232723": "漠河县",
	    "232724": "加格达奇区",
	    "232725": "其它区",
	    "310000": "上海",
	    "310100": "上海市",
	    "310101": "黄浦区",
	    "310104": "徐汇区",
	    "310105": "长宁区",
	    "310106": "静安区",
	    "310107": "普陀区",
	    "310108": "闸北区",
	    "310109": "虹口区",
	    "310110": "杨浦区",
	    "310112": "闵行区",
	    "310113": "宝山区",
	    "310114": "嘉定区",
	    "310115": "浦东新区",
	    "310116": "金山区",
	    "310117": "松江区",
	    "310118": "青浦区",
	    "310120": "奉贤区",
	    "310230": "崇明县",
	    "310231": "其它区",
	    "320000": "江苏省",
	    "320100": "南京市",
	    "320102": "玄武区",
	    "320104": "秦淮区",
	    "320105": "建邺区",
	    "320106": "鼓楼区",
	    "320111": "浦口区",
	    "320113": "栖霞区",
	    "320114": "雨花台区",
	    "320115": "江宁区",
	    "320116": "六合区",
	    "320124": "溧水区",
	    "320125": "高淳区",
	    "320126": "其它区",
	    "320200": "无锡市",
	    "320202": "崇安区",
	    "320203": "南长区",
	    "320204": "北塘区",
	    "320205": "锡山区",
	    "320206": "惠山区",
	    "320211": "滨湖区",
	    "320281": "江阴市",
	    "320282": "宜兴市",
	    "320297": "其它区",
	    "320300": "徐州市",
	    "320302": "鼓楼区",
	    "320303": "云龙区",
	    "320305": "贾汪区",
	    "320311": "泉山区",
	    "320321": "丰县",
	    "320322": "沛县",
	    "320323": "铜山区",
	    "320324": "睢宁县",
	    "320381": "新沂市",
	    "320382": "邳州市",
	    "320383": "其它区",
	    "320400": "常州市",
	    "320402": "天宁区",
	    "320404": "钟楼区",
	    "320405": "戚墅堰区",
	    "320411": "新北区",
	    "320412": "武进区",
	    "320481": "溧阳市",
	    "320482": "金坛市",
	    "320483": "其它区",
	    "320500": "苏州市",
	    "320505": "虎丘区",
	    "320506": "吴中区",
	    "320507": "相城区",
	    "320508": "姑苏区",
	    "320581": "常熟市",
	    "320582": "张家港市",
	    "320583": "昆山市",
	    "320584": "吴江区",
	    "320585": "太仓市",
	    "320596": "其它区",
	    "320600": "南通市",
	    "320602": "崇川区",
	    "320611": "港闸区",
	    "320612": "通州区",
	    "320621": "海安县",
	    "320623": "如东县",
	    "320681": "启东市",
	    "320682": "如皋市",
	    "320684": "海门市",
	    "320694": "其它区",
	    "320700": "连云港市",
	    "320703": "连云区",
	    "320705": "新浦区",
	    "320706": "海州区",
	    "320721": "赣榆县",
	    "320722": "东海县",
	    "320723": "灌云县",
	    "320724": "灌南县",
	    "320725": "其它区",
	    "320800": "淮安市",
	    "320802": "清河区",
	    "320803": "淮安区",
	    "320804": "淮阴区",
	    "320811": "清浦区",
	    "320826": "涟水县",
	    "320829": "洪泽县",
	    "320830": "盱眙县",
	    "320831": "金湖县",
	    "320832": "其它区",
	    "320900": "盐城市",
	    "320902": "亭湖区",
	    "320903": "盐都区",
	    "320921": "响水县",
	    "320922": "滨海县",
	    "320923": "阜宁县",
	    "320924": "射阳县",
	    "320925": "建湖县",
	    "320981": "东台市",
	    "320982": "大丰市",
	    "320983": "其它区",
	    "321000": "扬州市",
	    "321002": "广陵区",
	    "321003": "邗江区",
	    "321023": "宝应县",
	    "321081": "仪征市",
	    "321084": "高邮市",
	    "321088": "江都区",
	    "321093": "其它区",
	    "321100": "镇江市",
	    "321102": "京口区",
	    "321111": "润州区",
	    "321112": "丹徒区",
	    "321181": "丹阳市",
	    "321182": "扬中市",
	    "321183": "句容市",
	    "321184": "其它区",
	    "321200": "泰州市",
	    "321202": "海陵区",
	    "321203": "高港区",
	    "321281": "兴化市",
	    "321282": "靖江市",
	    "321283": "泰兴市",
	    "321284": "姜堰区",
	    "321285": "其它区",
	    "321300": "宿迁市",
	    "321302": "宿城区",
	    "321311": "宿豫区",
	    "321322": "沭阳县",
	    "321323": "泗阳县",
	    "321324": "泗洪县",
	    "321325": "其它区",
	    "330000": "浙江省",
	    "330100": "杭州市",
	    "330102": "上城区",
	    "330103": "下城区",
	    "330104": "江干区",
	    "330105": "拱墅区",
	    "330106": "西湖区",
	    "330108": "滨江区",
	    "330109": "萧山区",
	    "330110": "余杭区",
	    "330122": "桐庐县",
	    "330127": "淳安县",
	    "330182": "建德市",
	    "330183": "富阳市",
	    "330185": "临安市",
	    "330186": "其它区",
	    "330200": "宁波市",
	    "330203": "海曙区",
	    "330204": "江东区",
	    "330205": "江北区",
	    "330206": "北仑区",
	    "330211": "镇海区",
	    "330212": "鄞州区",
	    "330225": "象山县",
	    "330226": "宁海县",
	    "330281": "余姚市",
	    "330282": "慈溪市",
	    "330283": "奉化市",
	    "330284": "其它区",
	    "330300": "温州市",
	    "330302": "鹿城区",
	    "330303": "龙湾区",
	    "330304": "瓯海区",
	    "330322": "洞头县",
	    "330324": "永嘉县",
	    "330326": "平阳县",
	    "330327": "苍南县",
	    "330328": "文成县",
	    "330329": "泰顺县",
	    "330381": "瑞安市",
	    "330382": "乐清市",
	    "330383": "其它区",
	    "330400": "嘉兴市",
	    "330402": "南湖区",
	    "330411": "秀洲区",
	    "330421": "嘉善县",
	    "330424": "海盐县",
	    "330481": "海宁市",
	    "330482": "平湖市",
	    "330483": "桐乡市",
	    "330484": "其它区",
	    "330500": "湖州市",
	    "330502": "吴兴区",
	    "330503": "南浔区",
	    "330521": "德清县",
	    "330522": "长兴县",
	    "330523": "安吉县",
	    "330524": "其它区",
	    "330600": "绍兴市",
	    "330602": "越城区",
	    "330621": "绍兴县",
	    "330624": "新昌县",
	    "330681": "诸暨市",
	    "330682": "上虞市",
	    "330683": "嵊州市",
	    "330684": "其它区",
	    "330700": "金华市",
	    "330702": "婺城区",
	    "330703": "金东区",
	    "330723": "武义县",
	    "330726": "浦江县",
	    "330727": "磐安县",
	    "330781": "兰溪市",
	    "330782": "义乌市",
	    "330783": "东阳市",
	    "330784": "永康市",
	    "330785": "其它区",
	    "330800": "衢州市",
	    "330802": "柯城区",
	    "330803": "衢江区",
	    "330822": "常山县",
	    "330824": "开化县",
	    "330825": "龙游县",
	    "330881": "江山市",
	    "330882": "其它区",
	    "330900": "舟山市",
	    "330902": "定海区",
	    "330903": "普陀区",
	    "330921": "岱山县",
	    "330922": "嵊泗县",
	    "330923": "其它区",
	    "331000": "台州市",
	    "331002": "椒江区",
	    "331003": "黄岩区",
	    "331004": "路桥区",
	    "331021": "玉环县",
	    "331022": "三门县",
	    "331023": "天台县",
	    "331024": "仙居县",
	    "331081": "温岭市",
	    "331082": "临海市",
	    "331083": "其它区",
	    "331100": "丽水市",
	    "331102": "莲都区",
	    "331121": "青田县",
	    "331122": "缙云县",
	    "331123": "遂昌县",
	    "331124": "松阳县",
	    "331125": "云和县",
	    "331126": "庆元县",
	    "331127": "景宁畲族自治县",
	    "331181": "龙泉市",
	    "331182": "其它区",
	    "340000": "安徽省",
	    "340100": "合肥市",
	    "340102": "瑶海区",
	    "340103": "庐阳区",
	    "340104": "蜀山区",
	    "340111": "包河区",
	    "340121": "长丰县",
	    "340122": "肥东县",
	    "340123": "肥西县",
	    "340192": "其它区",
	    "340200": "芜湖市",
	    "340202": "镜湖区",
	    "340203": "弋江区",
	    "340207": "鸠江区",
	    "340208": "三山区",
	    "340221": "芜湖县",
	    "340222": "繁昌县",
	    "340223": "南陵县",
	    "340224": "其它区",
	    "340300": "蚌埠市",
	    "340302": "龙子湖区",
	    "340303": "蚌山区",
	    "340304": "禹会区",
	    "340311": "淮上区",
	    "340321": "怀远县",
	    "340322": "五河县",
	    "340323": "固镇县",
	    "340324": "其它区",
	    "340400": "淮南市",
	    "340402": "大通区",
	    "340403": "田家庵区",
	    "340404": "谢家集区",
	    "340405": "八公山区",
	    "340406": "潘集区",
	    "340421": "凤台县",
	    "340422": "其它区",
	    "340500": "马鞍山市",
	    "340503": "花山区",
	    "340504": "雨山区",
	    "340506": "博望区",
	    "340521": "当涂县",
	    "340522": "其它区",
	    "340600": "淮北市",
	    "340602": "杜集区",
	    "340603": "相山区",
	    "340604": "烈山区",
	    "340621": "濉溪县",
	    "340622": "其它区",
	    "340700": "铜陵市",
	    "340702": "铜官山区",
	    "340703": "狮子山区",
	    "340711": "郊区",
	    "340721": "铜陵县",
	    "340722": "其它区",
	    "340800": "安庆市",
	    "340802": "迎江区",
	    "340803": "大观区",
	    "340811": "宜秀区",
	    "340822": "怀宁县",
	    "340823": "枞阳县",
	    "340824": "潜山县",
	    "340825": "太湖县",
	    "340826": "宿松县",
	    "340827": "望江县",
	    "340828": "岳西县",
	    "340881": "桐城市",
	    "340882": "其它区",
	    "341000": "黄山市",
	    "341002": "屯溪区",
	    "341003": "黄山区",
	    "341004": "徽州区",
	    "341021": "歙县",
	    "341022": "休宁县",
	    "341023": "黟县",
	    "341024": "祁门县",
	    "341025": "其它区",
	    "341100": "滁州市",
	    "341102": "琅琊区",
	    "341103": "南谯区",
	    "341122": "来安县",
	    "341124": "全椒县",
	    "341125": "定远县",
	    "341126": "凤阳县",
	    "341181": "天长市",
	    "341182": "明光市",
	    "341183": "其它区",
	    "341200": "阜阳市",
	    "341202": "颍州区",
	    "341203": "颍东区",
	    "341204": "颍泉区",
	    "341221": "临泉县",
	    "341222": "太和县",
	    "341225": "阜南县",
	    "341226": "颍上县",
	    "341282": "界首市",
	    "341283": "其它区",
	    "341300": "宿州市",
	    "341302": "埇桥区",
	    "341321": "砀山县",
	    "341322": "萧县",
	    "341323": "灵璧县",
	    "341324": "泗县",
	    "341325": "其它区",
	    "341400": "巢湖市",
	    "341421": "庐江县",
	    "341422": "无为县",
	    "341423": "含山县",
	    "341424": "和县",
	    "341500": "六安市",
	    "341502": "金安区",
	    "341503": "裕安区",
	    "341521": "寿县",
	    "341522": "霍邱县",
	    "341523": "舒城县",
	    "341524": "金寨县",
	    "341525": "霍山县",
	    "341526": "其它区",
	    "341600": "亳州市",
	    "341602": "谯城区",
	    "341621": "涡阳县",
	    "341622": "蒙城县",
	    "341623": "利辛县",
	    "341624": "其它区",
	    "341700": "池州市",
	    "341702": "贵池区",
	    "341721": "东至县",
	    "341722": "石台县",
	    "341723": "青阳县",
	    "341724": "其它区",
	    "341800": "宣城市",
	    "341802": "宣州区",
	    "341821": "郎溪县",
	    "341822": "广德县",
	    "341823": "泾县",
	    "341824": "绩溪县",
	    "341825": "旌德县",
	    "341881": "宁国市",
	    "341882": "其它区",
	    "350000": "福建省",
	    "350100": "福州市",
	    "350102": "鼓楼区",
	    "350103": "台江区",
	    "350104": "仓山区",
	    "350105": "马尾区",
	    "350111": "晋安区",
	    "350121": "闽侯县",
	    "350122": "连江县",
	    "350123": "罗源县",
	    "350124": "闽清县",
	    "350125": "永泰县",
	    "350128": "平潭县",
	    "350181": "福清市",
	    "350182": "长乐市",
	    "350183": "其它区",
	    "350200": "厦门市",
	    "350203": "思明区",
	    "350205": "海沧区",
	    "350206": "湖里区",
	    "350211": "集美区",
	    "350212": "同安区",
	    "350213": "翔安区",
	    "350214": "其它区",
	    "350300": "莆田市",
	    "350302": "城厢区",
	    "350303": "涵江区",
	    "350304": "荔城区",
	    "350305": "秀屿区",
	    "350322": "仙游县",
	    "350323": "其它区",
	    "350400": "三明市",
	    "350402": "梅列区",
	    "350403": "三元区",
	    "350421": "明溪县",
	    "350423": "清流县",
	    "350424": "宁化县",
	    "350425": "大田县",
	    "350426": "尤溪县",
	    "350427": "沙县",
	    "350428": "将乐县",
	    "350429": "泰宁县",
	    "350430": "建宁县",
	    "350481": "永安市",
	    "350482": "其它区",
	    "350500": "泉州市",
	    "350502": "鲤城区",
	    "350503": "丰泽区",
	    "350504": "洛江区",
	    "350505": "泉港区",
	    "350521": "惠安县",
	    "350524": "安溪县",
	    "350525": "永春县",
	    "350526": "德化县",
	    "350527": "金门县",
	    "350581": "石狮市",
	    "350582": "晋江市",
	    "350583": "南安市",
	    "350584": "其它区",
	    "350600": "漳州市",
	    "350602": "芗城区",
	    "350603": "龙文区",
	    "350622": "云霄县",
	    "350623": "漳浦县",
	    "350624": "诏安县",
	    "350625": "长泰县",
	    "350626": "东山县",
	    "350627": "南靖县",
	    "350628": "平和县",
	    "350629": "华安县",
	    "350681": "龙海市",
	    "350682": "其它区",
	    "350700": "南平市",
	    "350702": "延平区",
	    "350721": "顺昌县",
	    "350722": "浦城县",
	    "350723": "光泽县",
	    "350724": "松溪县",
	    "350725": "政和县",
	    "350781": "邵武市",
	    "350782": "武夷山市",
	    "350783": "建瓯市",
	    "350784": "建阳市",
	    "350785": "其它区",
	    "350800": "龙岩市",
	    "350802": "新罗区",
	    "350821": "长汀县",
	    "350822": "永定县",
	    "350823": "上杭县",
	    "350824": "武平县",
	    "350825": "连城县",
	    "350881": "漳平市",
	    "350882": "其它区",
	    "350900": "宁德市",
	    "350902": "蕉城区",
	    "350921": "霞浦县",
	    "350922": "古田县",
	    "350923": "屏南县",
	    "350924": "寿宁县",
	    "350925": "周宁县",
	    "350926": "柘荣县",
	    "350981": "福安市",
	    "350982": "福鼎市",
	    "350983": "其它区",
	    "360000": "江西省",
	    "360100": "南昌市",
	    "360102": "东湖区",
	    "360103": "西湖区",
	    "360104": "青云谱区",
	    "360105": "湾里区",
	    "360111": "青山湖区",
	    "360121": "南昌县",
	    "360122": "新建县",
	    "360123": "安义县",
	    "360124": "进贤县",
	    "360128": "其它区",
	    "360200": "景德镇市",
	    "360202": "昌江区",
	    "360203": "珠山区",
	    "360222": "浮梁县",
	    "360281": "乐平市",
	    "360282": "其它区",
	    "360300": "萍乡市",
	    "360302": "安源区",
	    "360313": "湘东区",
	    "360321": "莲花县",
	    "360322": "上栗县",
	    "360323": "芦溪县",
	    "360324": "其它区",
	    "360400": "九江市",
	    "360402": "庐山区",
	    "360403": "浔阳区",
	    "360421": "九江县",
	    "360423": "武宁县",
	    "360424": "修水县",
	    "360425": "永修县",
	    "360426": "德安县",
	    "360427": "星子县",
	    "360428": "都昌县",
	    "360429": "湖口县",
	    "360430": "彭泽县",
	    "360481": "瑞昌市",
	    "360482": "其它区",
	    "360483": "共青城市",
	    "360500": "新余市",
	    "360502": "渝水区",
	    "360521": "分宜县",
	    "360522": "其它区",
	    "360600": "鹰潭市",
	    "360602": "月湖区",
	    "360622": "余江县",
	    "360681": "贵溪市",
	    "360682": "其它区",
	    "360700": "赣州市",
	    "360702": "章贡区",
	    "360721": "赣县",
	    "360722": "信丰县",
	    "360723": "大余县",
	    "360724": "上犹县",
	    "360725": "崇义县",
	    "360726": "安远县",
	    "360727": "龙南县",
	    "360728": "定南县",
	    "360729": "全南县",
	    "360730": "宁都县",
	    "360731": "于都县",
	    "360732": "兴国县",
	    "360733": "会昌县",
	    "360734": "寻乌县",
	    "360735": "石城县",
	    "360781": "瑞金市",
	    "360782": "南康市",
	    "360783": "其它区",
	    "360800": "吉安市",
	    "360802": "吉州区",
	    "360803": "青原区",
	    "360821": "吉安县",
	    "360822": "吉水县",
	    "360823": "峡江县",
	    "360824": "新干县",
	    "360825": "永丰县",
	    "360826": "泰和县",
	    "360827": "遂川县",
	    "360828": "万安县",
	    "360829": "安福县",
	    "360830": "永新县",
	    "360881": "井冈山市",
	    "360882": "其它区",
	    "360900": "宜春市",
	    "360902": "袁州区",
	    "360921": "奉新县",
	    "360922": "万载县",
	    "360923": "上高县",
	    "360924": "宜丰县",
	    "360925": "靖安县",
	    "360926": "铜鼓县",
	    "360981": "丰城市",
	    "360982": "樟树市",
	    "360983": "高安市",
	    "360984": "其它区",
	    "361000": "抚州市",
	    "361002": "临川区",
	    "361021": "南城县",
	    "361022": "黎川县",
	    "361023": "南丰县",
	    "361024": "崇仁县",
	    "361025": "乐安县",
	    "361026": "宜黄县",
	    "361027": "金溪县",
	    "361028": "资溪县",
	    "361029": "东乡县",
	    "361030": "广昌县",
	    "361031": "其它区",
	    "361100": "上饶市",
	    "361102": "信州区",
	    "361121": "上饶县",
	    "361122": "广丰县",
	    "361123": "玉山县",
	    "361124": "铅山县",
	    "361125": "横峰县",
	    "361126": "弋阳县",
	    "361127": "余干县",
	    "361128": "鄱阳县",
	    "361129": "万年县",
	    "361130": "婺源县",
	    "361181": "德兴市",
	    "361182": "其它区",
	    "370000": "山东省",
	    "370100": "济南市",
	    "370102": "历下区",
	    "370103": "市中区",
	    "370104": "槐荫区",
	    "370105": "天桥区",
	    "370112": "历城区",
	    "370113": "长清区",
	    "370124": "平阴县",
	    "370125": "济阳县",
	    "370126": "商河县",
	    "370181": "章丘市",
	    "370182": "其它区",
	    "370200": "青岛市",
	    "370202": "市南区",
	    "370203": "市北区",
	    "370211": "黄岛区",
	    "370212": "崂山区",
	    "370213": "李沧区",
	    "370214": "城阳区",
	    "370281": "胶州市",
	    "370282": "即墨市",
	    "370283": "平度市",
	    "370285": "莱西市",
	    "370286": "其它区",
	    "370300": "淄博市",
	    "370302": "淄川区",
	    "370303": "张店区",
	    "370304": "博山区",
	    "370305": "临淄区",
	    "370306": "周村区",
	    "370321": "桓台县",
	    "370322": "高青县",
	    "370323": "沂源县",
	    "370324": "其它区",
	    "370400": "枣庄市",
	    "370402": "市中区",
	    "370403": "薛城区",
	    "370404": "峄城区",
	    "370405": "台儿庄区",
	    "370406": "山亭区",
	    "370481": "滕州市",
	    "370482": "其它区",
	    "370500": "东营市",
	    "370502": "东营区",
	    "370503": "河口区",
	    "370521": "垦利县",
	    "370522": "利津县",
	    "370523": "广饶县",
	    "370591": "其它区",
	    "370600": "烟台市",
	    "370602": "芝罘区",
	    "370611": "福山区",
	    "370612": "牟平区",
	    "370613": "莱山区",
	    "370634": "长岛县",
	    "370681": "龙口市",
	    "370682": "莱阳市",
	    "370683": "莱州市",
	    "370684": "蓬莱市",
	    "370685": "招远市",
	    "370686": "栖霞市",
	    "370687": "海阳市",
	    "370688": "其它区",
	    "370700": "潍坊市",
	    "370702": "潍城区",
	    "370703": "寒亭区",
	    "370704": "坊子区",
	    "370705": "奎文区",
	    "370724": "临朐县",
	    "370725": "昌乐县",
	    "370781": "青州市",
	    "370782": "诸城市",
	    "370783": "寿光市",
	    "370784": "安丘市",
	    "370785": "高密市",
	    "370786": "昌邑市",
	    "370787": "其它区",
	    "370800": "济宁市",
	    "370802": "市中区",
	    "370811": "任城区",
	    "370826": "微山县",
	    "370827": "鱼台县",
	    "370828": "金乡县",
	    "370829": "嘉祥县",
	    "370830": "汶上县",
	    "370831": "泗水县",
	    "370832": "梁山县",
	    "370881": "曲阜市",
	    "370882": "兖州市",
	    "370883": "邹城市",
	    "370884": "其它区",
	    "370900": "泰安市",
	    "370902": "泰山区",
	    "370903": "岱岳区",
	    "370921": "宁阳县",
	    "370923": "东平县",
	    "370982": "新泰市",
	    "370983": "肥城市",
	    "370984": "其它区",
	    "371000": "威海市",
	    "371002": "环翠区",
	    "371081": "文登市",
	    "371082": "荣成市",
	    "371083": "乳山市",
	    "371084": "其它区",
	    "371100": "日照市",
	    "371102": "东港区",
	    "371103": "岚山区",
	    "371121": "五莲县",
	    "371122": "莒县",
	    "371123": "其它区",
	    "371200": "莱芜市",
	    "371202": "莱城区",
	    "371203": "钢城区",
	    "371204": "其它区",
	    "371300": "临沂市",
	    "371302": "兰山区",
	    "371311": "罗庄区",
	    "371312": "河东区",
	    "371321": "沂南县",
	    "371322": "郯城县",
	    "371323": "沂水县",
	    "371324": "苍山县",
	    "371325": "费县",
	    "371326": "平邑县",
	    "371327": "莒南县",
	    "371328": "蒙阴县",
	    "371329": "临沭县",
	    "371330": "其它区",
	    "371400": "德州市",
	    "371402": "德城区",
	    "371421": "陵县",
	    "371422": "宁津县",
	    "371423": "庆云县",
	    "371424": "临邑县",
	    "371425": "齐河县",
	    "371426": "平原县",
	    "371427": "夏津县",
	    "371428": "武城县",
	    "371481": "乐陵市",
	    "371482": "禹城市",
	    "371483": "其它区",
	    "371500": "聊城市",
	    "371502": "东昌府区",
	    "371521": "阳谷县",
	    "371522": "莘县",
	    "371523": "茌平县",
	    "371524": "东阿县",
	    "371525": "冠县",
	    "371526": "高唐县",
	    "371581": "临清市",
	    "371582": "其它区",
	    "371600": "滨州市",
	    "371602": "滨城区",
	    "371621": "惠民县",
	    "371622": "阳信县",
	    "371623": "无棣县",
	    "371624": "沾化县",
	    "371625": "博兴县",
	    "371626": "邹平县",
	    "371627": "其它区",
	    "371700": "菏泽市",
	    "371702": "牡丹区",
	    "371721": "曹县",
	    "371722": "单县",
	    "371723": "成武县",
	    "371724": "巨野县",
	    "371725": "郓城县",
	    "371726": "鄄城县",
	    "371727": "定陶县",
	    "371728": "东明县",
	    "371729": "其它区",
	    "410000": "河南省",
	    "410100": "郑州市",
	    "410102": "中原区",
	    "410103": "二七区",
	    "410104": "管城回族区",
	    "410105": "金水区",
	    "410106": "上街区",
	    "410108": "惠济区",
	    "410122": "中牟县",
	    "410181": "巩义市",
	    "410182": "荥阳市",
	    "410183": "新密市",
	    "410184": "新郑市",
	    "410185": "登封市",
	    "410188": "其它区",
	    "410200": "开封市",
	    "410202": "龙亭区",
	    "410203": "顺河回族区",
	    "410204": "鼓楼区",
	    "410205": "禹王台区",
	    "410211": "金明区",
	    "410221": "杞县",
	    "410222": "通许县",
	    "410223": "尉氏县",
	    "410224": "开封县",
	    "410225": "兰考县",
	    "410226": "其它区",
	    "410300": "洛阳市",
	    "410302": "老城区",
	    "410303": "西工区",
	    "410304": "瀍河回族区",
	    "410305": "涧西区",
	    "410306": "吉利区",
	    "410307": "洛龙区",
	    "410322": "孟津县",
	    "410323": "新安县",
	    "410324": "栾川县",
	    "410325": "嵩县",
	    "410326": "汝阳县",
	    "410327": "宜阳县",
	    "410328": "洛宁县",
	    "410329": "伊川县",
	    "410381": "偃师市",
	    "410400": "平顶山市",
	    "410402": "新华区",
	    "410403": "卫东区",
	    "410404": "石龙区",
	    "410411": "湛河区",
	    "410421": "宝丰县",
	    "410422": "叶县",
	    "410423": "鲁山县",
	    "410425": "郏县",
	    "410481": "舞钢市",
	    "410482": "汝州市",
	    "410483": "其它区",
	    "410500": "安阳市",
	    "410502": "文峰区",
	    "410503": "北关区",
	    "410505": "殷都区",
	    "410506": "龙安区",
	    "410522": "安阳县",
	    "410523": "汤阴县",
	    "410526": "滑县",
	    "410527": "内黄县",
	    "410581": "林州市",
	    "410582": "其它区",
	    "410600": "鹤壁市",
	    "410602": "鹤山区",
	    "410603": "山城区",
	    "410611": "淇滨区",
	    "410621": "浚县",
	    "410622": "淇县",
	    "410623": "其它区",
	    "410700": "新乡市",
	    "410702": "红旗区",
	    "410703": "卫滨区",
	    "410704": "凤泉区",
	    "410711": "牧野区",
	    "410721": "新乡县",
	    "410724": "获嘉县",
	    "410725": "原阳县",
	    "410726": "延津县",
	    "410727": "封丘县",
	    "410728": "长垣县",
	    "410781": "卫辉市",
	    "410782": "辉县市",
	    "410783": "其它区",
	    "410800": "焦作市",
	    "410802": "解放区",
	    "410803": "中站区",
	    "410804": "马村区",
	    "410811": "山阳区",
	    "410821": "修武县",
	    "410822": "博爱县",
	    "410823": "武陟县",
	    "410825": "温县",
	    "410881": "济源市",
	    "410882": "沁阳市",
	    "410883": "孟州市",
	    "410884": "其它区",
	    "410900": "濮阳市",
	    "410902": "华龙区",
	    "410922": "清丰县",
	    "410923": "南乐县",
	    "410926": "范县",
	    "410927": "台前县",
	    "410928": "濮阳县",
	    "410929": "其它区",
	    "411000": "许昌市",
	    "411002": "魏都区",
	    "411023": "许昌县",
	    "411024": "鄢陵县",
	    "411025": "襄城县",
	    "411081": "禹州市",
	    "411082": "长葛市",
	    "411083": "其它区",
	    "411100": "漯河市",
	    "411102": "源汇区",
	    "411103": "郾城区",
	    "411104": "召陵区",
	    "411121": "舞阳县",
	    "411122": "临颍县",
	    "411123": "其它区",
	    "411200": "三门峡市",
	    "411202": "湖滨区",
	    "411221": "渑池县",
	    "411222": "陕县",
	    "411224": "卢氏县",
	    "411281": "义马市",
	    "411282": "灵宝市",
	    "411283": "其它区",
	    "411300": "南阳市",
	    "411302": "宛城区",
	    "411303": "卧龙区",
	    "411321": "南召县",
	    "411322": "方城县",
	    "411323": "西峡县",
	    "411324": "镇平县",
	    "411325": "内乡县",
	    "411326": "淅川县",
	    "411327": "社旗县",
	    "411328": "唐河县",
	    "411329": "新野县",
	    "411330": "桐柏县",
	    "411381": "邓州市",
	    "411382": "其它区",
	    "411400": "商丘市",
	    "411402": "梁园区",
	    "411403": "睢阳区",
	    "411421": "民权县",
	    "411422": "睢县",
	    "411423": "宁陵县",
	    "411424": "柘城县",
	    "411425": "虞城县",
	    "411426": "夏邑县",
	    "411481": "永城市",
	    "411482": "其它区",
	    "411500": "信阳市",
	    "411502": "浉河区",
	    "411503": "平桥区",
	    "411521": "罗山县",
	    "411522": "光山县",
	    "411523": "新县",
	    "411524": "商城县",
	    "411525": "固始县",
	    "411526": "潢川县",
	    "411527": "淮滨县",
	    "411528": "息县",
	    "411529": "其它区",
	    "411600": "周口市",
	    "411602": "川汇区",
	    "411621": "扶沟县",
	    "411622": "西华县",
	    "411623": "商水县",
	    "411624": "沈丘县",
	    "411625": "郸城县",
	    "411626": "淮阳县",
	    "411627": "太康县",
	    "411628": "鹿邑县",
	    "411681": "项城市",
	    "411682": "其它区",
	    "411700": "驻马店市",
	    "411702": "驿城区",
	    "411721": "西平县",
	    "411722": "上蔡县",
	    "411723": "平舆县",
	    "411724": "正阳县",
	    "411725": "确山县",
	    "411726": "泌阳县",
	    "411727": "汝南县",
	    "411728": "遂平县",
	    "411729": "新蔡县",
	    "411730": "其它区",
	    "420000": "湖北省",
	    "420100": "武汉市",
	    "420102": "江岸区",
	    "420103": "江汉区",
	    "420104": "硚口区",
	    "420105": "汉阳区",
	    "420106": "武昌区",
	    "420107": "青山区",
	    "420111": "洪山区",
	    "420112": "东西湖区",
	    "420113": "汉南区",
	    "420114": "蔡甸区",
	    "420115": "江夏区",
	    "420116": "黄陂区",
	    "420117": "新洲区",
	    "420118": "其它区",
	    "420200": "黄石市",
	    "420202": "黄石港区",
	    "420203": "西塞山区",
	    "420204": "下陆区",
	    "420205": "铁山区",
	    "420222": "阳新县",
	    "420281": "大冶市",
	    "420282": "其它区",
	    "420300": "十堰市",
	    "420302": "茅箭区",
	    "420303": "张湾区",
	    "420321": "郧县",
	    "420322": "郧西县",
	    "420323": "竹山县",
	    "420324": "竹溪县",
	    "420325": "房县",
	    "420381": "丹江口市",
	    "420383": "其它区",
	    "420500": "宜昌市",
	    "420502": "西陵区",
	    "420503": "伍家岗区",
	    "420504": "点军区",
	    "420505": "猇亭区",
	    "420506": "夷陵区",
	    "420525": "远安县",
	    "420526": "兴山县",
	    "420527": "秭归县",
	    "420528": "长阳土家族自治县",
	    "420529": "五峰土家族自治县",
	    "420581": "宜都市",
	    "420582": "当阳市",
	    "420583": "枝江市",
	    "420584": "其它区",
	    "420600": "襄阳市",
	    "420602": "襄城区",
	    "420606": "樊城区",
	    "420607": "襄州区",
	    "420624": "南漳县",
	    "420625": "谷城县",
	    "420626": "保康县",
	    "420682": "老河口市",
	    "420683": "枣阳市",
	    "420684": "宜城市",
	    "420685": "其它区",
	    "420700": "鄂州市",
	    "420702": "梁子湖区",
	    "420703": "华容区",
	    "420704": "鄂城区",
	    "420705": "其它区",
	    "420800": "荆门市",
	    "420802": "东宝区",
	    "420804": "掇刀区",
	    "420821": "京山县",
	    "420822": "沙洋县",
	    "420881": "钟祥市",
	    "420882": "其它区",
	    "420900": "孝感市",
	    "420902": "孝南区",
	    "420921": "孝昌县",
	    "420922": "大悟县",
	    "420923": "云梦县",
	    "420981": "应城市",
	    "420982": "安陆市",
	    "420984": "汉川市",
	    "420985": "其它区",
	    "421000": "荆州市",
	    "421002": "沙市区",
	    "421003": "荆州区",
	    "421022": "公安县",
	    "421023": "监利县",
	    "421024": "江陵县",
	    "421081": "石首市",
	    "421083": "洪湖市",
	    "421087": "松滋市",
	    "421088": "其它区",
	    "421100": "黄冈市",
	    "421102": "黄州区",
	    "421121": "团风县",
	    "421122": "红安县",
	    "421123": "罗田县",
	    "421124": "英山县",
	    "421125": "浠水县",
	    "421126": "蕲春县",
	    "421127": "黄梅县",
	    "421181": "麻城市",
	    "421182": "武穴市",
	    "421183": "其它区",
	    "421200": "咸宁市",
	    "421202": "咸安区",
	    "421221": "嘉鱼县",
	    "421222": "通城县",
	    "421223": "崇阳县",
	    "421224": "通山县",
	    "421281": "赤壁市",
	    "421283": "其它区",
	    "421300": "随州市",
	    "421302": "曾都区",
	    "421321": "随县",
	    "421381": "广水市",
	    "421382": "其它区",
	    "422800": "恩施土家族苗族自治州",
	    "422801": "恩施市",
	    "422802": "利川市",
	    "422822": "建始县",
	    "422823": "巴东县",
	    "422825": "宣恩县",
	    "422826": "咸丰县",
	    "422827": "来凤县",
	    "422828": "鹤峰县",
	    "422829": "其它区",
	    "429004": "仙桃市",
	    "429005": "潜江市",
	    "429006": "天门市",
	    "429021": "神农架林区",
	    "430000": "湖南省",
	    "430100": "长沙市",
	    "430102": "芙蓉区",
	    "430103": "天心区",
	    "430104": "岳麓区",
	    "430105": "开福区",
	    "430111": "雨花区",
	    "430121": "长沙县",
	    "430122": "望城区",
	    "430124": "宁乡县",
	    "430181": "浏阳市",
	    "430182": "其它区",
	    "430200": "株洲市",
	    "430202": "荷塘区",
	    "430203": "芦淞区",
	    "430204": "石峰区",
	    "430211": "天元区",
	    "430221": "株洲县",
	    "430223": "攸县",
	    "430224": "茶陵县",
	    "430225": "炎陵县",
	    "430281": "醴陵市",
	    "430282": "其它区",
	    "430300": "湘潭市",
	    "430302": "雨湖区",
	    "430304": "岳塘区",
	    "430321": "湘潭县",
	    "430381": "湘乡市",
	    "430382": "韶山市",
	    "430383": "其它区",
	    "430400": "衡阳市",
	    "430405": "珠晖区",
	    "430406": "雁峰区",
	    "430407": "石鼓区",
	    "430408": "蒸湘区",
	    "430412": "南岳区",
	    "430421": "衡阳县",
	    "430422": "衡南县",
	    "430423": "衡山县",
	    "430424": "衡东县",
	    "430426": "祁东县",
	    "430481": "耒阳市",
	    "430482": "常宁市",
	    "430483": "其它区",
	    "430500": "邵阳市",
	    "430502": "双清区",
	    "430503": "大祥区",
	    "430511": "北塔区",
	    "430521": "邵东县",
	    "430522": "新邵县",
	    "430523": "邵阳县",
	    "430524": "隆回县",
	    "430525": "洞口县",
	    "430527": "绥宁县",
	    "430528": "新宁县",
	    "430529": "城步苗族自治县",
	    "430581": "武冈市",
	    "430582": "其它区",
	    "430600": "岳阳市",
	    "430602": "岳阳楼区",
	    "430603": "云溪区",
	    "430611": "君山区",
	    "430621": "岳阳县",
	    "430623": "华容县",
	    "430624": "湘阴县",
	    "430626": "平江县",
	    "430681": "汨罗市",
	    "430682": "临湘市",
	    "430683": "其它区",
	    "430700": "常德市",
	    "430702": "武陵区",
	    "430703": "鼎城区",
	    "430721": "安乡县",
	    "430722": "汉寿县",
	    "430723": "澧县",
	    "430724": "临澧县",
	    "430725": "桃源县",
	    "430726": "石门县",
	    "430781": "津市市",
	    "430782": "其它区",
	    "430800": "张家界市",
	    "430802": "永定区",
	    "430811": "武陵源区",
	    "430821": "慈利县",
	    "430822": "桑植县",
	    "430823": "其它区",
	    "430900": "益阳市",
	    "430902": "资阳区",
	    "430903": "赫山区",
	    "430921": "南县",
	    "430922": "桃江县",
	    "430923": "安化县",
	    "430981": "沅江市",
	    "430982": "其它区",
	    "431000": "郴州市",
	    "431002": "北湖区",
	    "431003": "苏仙区",
	    "431021": "桂阳县",
	    "431022": "宜章县",
	    "431023": "永兴县",
	    "431024": "嘉禾县",
	    "431025": "临武县",
	    "431026": "汝城县",
	    "431027": "桂东县",
	    "431028": "安仁县",
	    "431081": "资兴市",
	    "431082": "其它区",
	    "431100": "永州市",
	    "431102": "零陵区",
	    "431103": "冷水滩区",
	    "431121": "祁阳县",
	    "431122": "东安县",
	    "431123": "双牌县",
	    "431124": "道县",
	    "431125": "江永县",
	    "431126": "宁远县",
	    "431127": "蓝山县",
	    "431128": "新田县",
	    "431129": "江华瑶族自治县",
	    "431130": "其它区",
	    "431200": "怀化市",
	    "431202": "鹤城区",
	    "431221": "中方县",
	    "431222": "沅陵县",
	    "431223": "辰溪县",
	    "431224": "溆浦县",
	    "431225": "会同县",
	    "431226": "麻阳苗族自治县",
	    "431227": "新晃侗族自治县",
	    "431228": "芷江侗族自治县",
	    "431229": "靖州苗族侗族自治县",
	    "431230": "通道侗族自治县",
	    "431281": "洪江市",
	    "431282": "其它区",
	    "431300": "娄底市",
	    "431302": "娄星区",
	    "431321": "双峰县",
	    "431322": "新化县",
	    "431381": "冷水江市",
	    "431382": "涟源市",
	    "431383": "其它区",
	    "433100": "湘西土家族苗族自治州",
	    "433101": "吉首市",
	    "433122": "泸溪县",
	    "433123": "凤凰县",
	    "433124": "花垣县",
	    "433125": "保靖县",
	    "433126": "古丈县",
	    "433127": "永顺县",
	    "433130": "龙山县",
	    "433131": "其它区",
	    "440000": "广东省",
	    "440100": "广州市",
	    "440103": "荔湾区",
	    "440104": "越秀区",
	    "440105": "海珠区",
	    "440106": "天河区",
	    "440111": "白云区",
	    "440112": "黄埔区",
	    "440113": "番禺区",
	    "440114": "花都区",
	    "440115": "南沙区",
	    "440116": "萝岗区",
	    "440183": "增城市",
	    "440184": "从化市",
	    "440189": "其它区",
	    "440200": "韶关市",
	    "440203": "武江区",
	    "440204": "浈江区",
	    "440205": "曲江区",
	    "440222": "始兴县",
	    "440224": "仁化县",
	    "440229": "翁源县",
	    "440232": "乳源瑶族自治县",
	    "440233": "新丰县",
	    "440281": "乐昌市",
	    "440282": "南雄市",
	    "440283": "其它区",
	    "440300": "深圳市",
	    "440303": "罗湖区",
	    "440304": "福田区",
	    "440305": "南山区",
	    "440306": "宝安区",
	    "440307": "龙岗区",
	    "440308": "盐田区",
	    "440309": "其它区",
	    "440320": "光明新区",
	    "440321": "坪山新区",
	    "440322": "大鹏新区",
	    "440323": "龙华新区",
	    "440400": "珠海市",
	    "440402": "香洲区",
	    "440403": "斗门区",
	    "440404": "金湾区",
	    "440488": "其它区",
	    "440500": "汕头市",
	    "440507": "龙湖区",
	    "440511": "金平区",
	    "440512": "濠江区",
	    "440513": "潮阳区",
	    "440514": "潮南区",
	    "440515": "澄海区",
	    "440523": "南澳县",
	    "440524": "其它区",
	    "440600": "佛山市",
	    "440604": "禅城区",
	    "440605": "南海区",
	    "440606": "顺德区",
	    "440607": "三水区",
	    "440608": "高明区",
	    "440609": "其它区",
	    "440700": "江门市",
	    "440703": "蓬江区",
	    "440704": "江海区",
	    "440705": "新会区",
	    "440781": "台山市",
	    "440783": "开平市",
	    "440784": "鹤山市",
	    "440785": "恩平市",
	    "440786": "其它区",
	    "440800": "湛江市",
	    "440802": "赤坎区",
	    "440803": "霞山区",
	    "440804": "坡头区",
	    "440811": "麻章区",
	    "440823": "遂溪县",
	    "440825": "徐闻县",
	    "440881": "廉江市",
	    "440882": "雷州市",
	    "440883": "吴川市",
	    "440884": "其它区",
	    "440900": "茂名市",
	    "440902": "茂南区",
	    "440903": "茂港区",
	    "440923": "电白县",
	    "440981": "高州市",
	    "440982": "化州市",
	    "440983": "信宜市",
	    "440984": "其它区",
	    "441200": "肇庆市",
	    "441202": "端州区",
	    "441203": "鼎湖区",
	    "441223": "广宁县",
	    "441224": "怀集县",
	    "441225": "封开县",
	    "441226": "德庆县",
	    "441283": "高要市",
	    "441284": "四会市",
	    "441285": "其它区",
	    "441300": "惠州市",
	    "441302": "惠城区",
	    "441303": "惠阳区",
	    "441322": "博罗县",
	    "441323": "惠东县",
	    "441324": "龙门县",
	    "441325": "其它区",
	    "441400": "梅州市",
	    "441402": "梅江区",
	    "441421": "梅县",
	    "441422": "大埔县",
	    "441423": "丰顺县",
	    "441424": "五华县",
	    "441426": "平远县",
	    "441427": "蕉岭县",
	    "441481": "兴宁市",
	    "441482": "其它区",
	    "441500": "汕尾市",
	    "441502": "城区",
	    "441521": "海丰县",
	    "441523": "陆河县",
	    "441581": "陆丰市",
	    "441582": "其它区",
	    "441600": "河源市",
	    "441602": "源城区",
	    "441621": "紫金县",
	    "441622": "龙川县",
	    "441623": "连平县",
	    "441624": "和平县",
	    "441625": "东源县",
	    "441626": "其它区",
	    "441700": "阳江市",
	    "441702": "江城区",
	    "441721": "阳西县",
	    "441723": "阳东县",
	    "441781": "阳春市",
	    "441782": "其它区",
	    "441800": "清远市",
	    "441802": "清城区",
	    "441821": "佛冈县",
	    "441823": "阳山县",
	    "441825": "连山壮族瑶族自治县",
	    "441826": "连南瑶族自治县",
	    "441827": "清新区",
	    "441881": "英德市",
	    "441882": "连州市",
	    "441883": "其它区",
	    "441900": "东莞市",
	    "442000": "中山市",
	    "442101": "东沙群岛",
	    "445100": "潮州市",
	    "445102": "湘桥区",
	    "445121": "潮安区",
	    "445122": "饶平县",
	    "445186": "其它区",
	    "445200": "揭阳市",
	    "445202": "榕城区",
	    "445221": "揭东区",
	    "445222": "揭西县",
	    "445224": "惠来县",
	    "445281": "普宁市",
	    "445285": "其它区",
	    "445300": "云浮市",
	    "445302": "云城区",
	    "445321": "新兴县",
	    "445322": "郁南县",
	    "445323": "云安县",
	    "445381": "罗定市",
	    "445382": "其它区",
	    "450000": "广西壮族自治区",
	    "450100": "南宁市",
	    "450102": "兴宁区",
	    "450103": "青秀区",
	    "450105": "江南区",
	    "450107": "西乡塘区",
	    "450108": "良庆区",
	    "450109": "邕宁区",
	    "450122": "武鸣县",
	    "450123": "隆安县",
	    "450124": "马山县",
	    "450125": "上林县",
	    "450126": "宾阳县",
	    "450127": "横县",
	    "450128": "其它区",
	    "450200": "柳州市",
	    "450202": "城中区",
	    "450203": "鱼峰区",
	    "450204": "柳南区",
	    "450205": "柳北区",
	    "450221": "柳江县",
	    "450222": "柳城县",
	    "450223": "鹿寨县",
	    "450224": "融安县",
	    "450225": "融水苗族自治县",
	    "450226": "三江侗族自治县",
	    "450227": "其它区",
	    "450300": "桂林市",
	    "450302": "秀峰区",
	    "450303": "叠彩区",
	    "450304": "象山区",
	    "450305": "七星区",
	    "450311": "雁山区",
	    "450321": "阳朔县",
	    "450322": "临桂区",
	    "450323": "灵川县",
	    "450324": "全州县",
	    "450325": "兴安县",
	    "450326": "永福县",
	    "450327": "灌阳县",
	    "450328": "龙胜各族自治县",
	    "450329": "资源县",
	    "450330": "平乐县",
	    "450331": "荔浦县",
	    "450332": "恭城瑶族自治县",
	    "450333": "其它区",
	    "450400": "梧州市",
	    "450403": "万秀区",
	    "450405": "长洲区",
	    "450406": "龙圩区",
	    "450421": "苍梧县",
	    "450422": "藤县",
	    "450423": "蒙山县",
	    "450481": "岑溪市",
	    "450482": "其它区",
	    "450500": "北海市",
	    "450502": "海城区",
	    "450503": "银海区",
	    "450512": "铁山港区",
	    "450521": "合浦县",
	    "450522": "其它区",
	    "450600": "防城港市",
	    "450602": "港口区",
	    "450603": "防城区",
	    "450621": "上思县",
	    "450681": "东兴市",
	    "450682": "其它区",
	    "450700": "钦州市",
	    "450702": "钦南区",
	    "450703": "钦北区",
	    "450721": "灵山县",
	    "450722": "浦北县",
	    "450723": "其它区",
	    "450800": "贵港市",
	    "450802": "港北区",
	    "450803": "港南区",
	    "450804": "覃塘区",
	    "450821": "平南县",
	    "450881": "桂平市",
	    "450882": "其它区",
	    "450900": "玉林市",
	    "450902": "玉州区",
	    "450903": "福绵区",
	    "450921": "容县",
	    "450922": "陆川县",
	    "450923": "博白县",
	    "450924": "兴业县",
	    "450981": "北流市",
	    "450982": "其它区",
	    "451000": "百色市",
	    "451002": "右江区",
	    "451021": "田阳县",
	    "451022": "田东县",
	    "451023": "平果县",
	    "451024": "德保县",
	    "451025": "靖西县",
	    "451026": "那坡县",
	    "451027": "凌云县",
	    "451028": "乐业县",
	    "451029": "田林县",
	    "451030": "西林县",
	    "451031": "隆林各族自治县",
	    "451032": "其它区",
	    "451100": "贺州市",
	    "451102": "八步区",
	    "451119": "平桂管理区",
	    "451121": "昭平县",
	    "451122": "钟山县",
	    "451123": "富川瑶族自治县",
	    "451124": "其它区",
	    "451200": "河池市",
	    "451202": "金城江区",
	    "451221": "南丹县",
	    "451222": "天峨县",
	    "451223": "凤山县",
	    "451224": "东兰县",
	    "451225": "罗城仫佬族自治县",
	    "451226": "环江毛南族自治县",
	    "451227": "巴马瑶族自治县",
	    "451228": "都安瑶族自治县",
	    "451229": "大化瑶族自治县",
	    "451281": "宜州市",
	    "451282": "其它区",
	    "451300": "来宾市",
	    "451302": "兴宾区",
	    "451321": "忻城县",
	    "451322": "象州县",
	    "451323": "武宣县",
	    "451324": "金秀瑶族自治县",
	    "451381": "合山市",
	    "451382": "其它区",
	    "451400": "崇左市",
	    "451402": "江州区",
	    "451421": "扶绥县",
	    "451422": "宁明县",
	    "451423": "龙州县",
	    "451424": "大新县",
	    "451425": "天等县",
	    "451481": "凭祥市",
	    "451482": "其它区",
	    "460000": "海南省",
	    "460100": "海口市",
	    "460105": "秀英区",
	    "460106": "龙华区",
	    "460107": "琼山区",
	    "460108": "美兰区",
	    "460109": "其它区",
	    "460200": "三亚市",
	    "460300": "三沙市",
	    "460321": "西沙群岛",
	    "460322": "南沙群岛",
	    "460323": "中沙群岛的岛礁及其海域",
	    "469001": "五指山市",
	    "469002": "琼海市",
	    "469003": "儋州市",
	    "469005": "文昌市",
	    "469006": "万宁市",
	    "469007": "东方市",
	    "469025": "定安县",
	    "469026": "屯昌县",
	    "469027": "澄迈县",
	    "469028": "临高县",
	    "469030": "白沙黎族自治县",
	    "469031": "昌江黎族自治县",
	    "469033": "乐东黎族自治县",
	    "469034": "陵水黎族自治县",
	    "469035": "保亭黎族苗族自治县",
	    "469036": "琼中黎族苗族自治县",
	    "471005": "其它区",
	    "500000": "重庆",
	    "500100": "重庆市",
	    "500101": "万州区",
	    "500102": "涪陵区",
	    "500103": "渝中区",
	    "500104": "大渡口区",
	    "500105": "江北区",
	    "500106": "沙坪坝区",
	    "500107": "九龙坡区",
	    "500108": "南岸区",
	    "500109": "北碚区",
	    "500110": "万盛区",
	    "500111": "双桥区",
	    "500112": "渝北区",
	    "500113": "巴南区",
	    "500114": "黔江区",
	    "500115": "长寿区",
	    "500222": "綦江区",
	    "500223": "潼南县",
	    "500224": "铜梁县",
	    "500225": "大足区",
	    "500226": "荣昌县",
	    "500227": "璧山县",
	    "500228": "梁平县",
	    "500229": "城口县",
	    "500230": "丰都县",
	    "500231": "垫江县",
	    "500232": "武隆县",
	    "500233": "忠县",
	    "500234": "开县",
	    "500235": "云阳县",
	    "500236": "奉节县",
	    "500237": "巫山县",
	    "500238": "巫溪县",
	    "500240": "石柱土家族自治县",
	    "500241": "秀山土家族苗族自治县",
	    "500242": "酉阳土家族苗族自治县",
	    "500243": "彭水苗族土家族自治县",
	    "500381": "江津区",
	    "500382": "合川区",
	    "500383": "永川区",
	    "500384": "南川区",
	    "500385": "其它区",
	    "510000": "四川省",
	    "510100": "成都市",
	    "510104": "锦江区",
	    "510105": "青羊区",
	    "510106": "金牛区",
	    "510107": "武侯区",
	    "510108": "成华区",
	    "510112": "龙泉驿区",
	    "510113": "青白江区",
	    "510114": "新都区",
	    "510115": "温江区",
	    "510121": "金堂县",
	    "510122": "双流县",
	    "510124": "郫县",
	    "510129": "大邑县",
	    "510131": "蒲江县",
	    "510132": "新津县",
	    "510181": "都江堰市",
	    "510182": "彭州市",
	    "510183": "邛崃市",
	    "510184": "崇州市",
	    "510185": "其它区",
	    "510300": "自贡市",
	    "510302": "自流井区",
	    "510303": "贡井区",
	    "510304": "大安区",
	    "510311": "沿滩区",
	    "510321": "荣县",
	    "510322": "富顺县",
	    "510323": "其它区",
	    "510400": "攀枝花市",
	    "510402": "东区",
	    "510403": "西区",
	    "510411": "仁和区",
	    "510421": "米易县",
	    "510422": "盐边县",
	    "510423": "其它区",
	    "510500": "泸州市",
	    "510502": "江阳区",
	    "510503": "纳溪区",
	    "510504": "龙马潭区",
	    "510521": "泸县",
	    "510522": "合江县",
	    "510524": "叙永县",
	    "510525": "古蔺县",
	    "510526": "其它区",
	    "510600": "德阳市",
	    "510603": "旌阳区",
	    "510623": "中江县",
	    "510626": "罗江县",
	    "510681": "广汉市",
	    "510682": "什邡市",
	    "510683": "绵竹市",
	    "510684": "其它区",
	    "510700": "绵阳市",
	    "510703": "涪城区",
	    "510704": "游仙区",
	    "510722": "三台县",
	    "510723": "盐亭县",
	    "510724": "安县",
	    "510725": "梓潼县",
	    "510726": "北川羌族自治县",
	    "510727": "平武县",
	    "510781": "江油市",
	    "510782": "其它区",
	    "510800": "广元市",
	    "510802": "利州区",
	    "510811": "昭化区",
	    "510812": "朝天区",
	    "510821": "旺苍县",
	    "510822": "青川县",
	    "510823": "剑阁县",
	    "510824": "苍溪县",
	    "510825": "其它区",
	    "510900": "遂宁市",
	    "510903": "船山区",
	    "510904": "安居区",
	    "510921": "蓬溪县",
	    "510922": "射洪县",
	    "510923": "大英县",
	    "510924": "其它区",
	    "511000": "内江市",
	    "511002": "市中区",
	    "511011": "东兴区",
	    "511024": "威远县",
	    "511025": "资中县",
	    "511028": "隆昌县",
	    "511029": "其它区",
	    "511100": "乐山市",
	    "511102": "市中区",
	    "511111": "沙湾区",
	    "511112": "五通桥区",
	    "511113": "金口河区",
	    "511123": "犍为县",
	    "511124": "井研县",
	    "511126": "夹江县",
	    "511129": "沐川县",
	    "511132": "峨边彝族自治县",
	    "511133": "马边彝族自治县",
	    "511181": "峨眉山市",
	    "511182": "其它区",
	    "511300": "南充市",
	    "511302": "顺庆区",
	    "511303": "高坪区",
	    "511304": "嘉陵区",
	    "511321": "南部县",
	    "511322": "营山县",
	    "511323": "蓬安县",
	    "511324": "仪陇县",
	    "511325": "西充县",
	    "511381": "阆中市",
	    "511382": "其它区",
	    "511400": "眉山市",
	    "511402": "东坡区",
	    "511421": "仁寿县",
	    "511422": "彭山县",
	    "511423": "洪雅县",
	    "511424": "丹棱县",
	    "511425": "青神县",
	    "511426": "其它区",
	    "511500": "宜宾市",
	    "511502": "翠屏区",
	    "511521": "宜宾县",
	    "511522": "南溪区",
	    "511523": "江安县",
	    "511524": "长宁县",
	    "511525": "高县",
	    "511526": "珙县",
	    "511527": "筠连县",
	    "511528": "兴文县",
	    "511529": "屏山县",
	    "511530": "其它区",
	    "511600": "广安市",
	    "511602": "广安区",
	    "511603": "前锋区",
	    "511621": "岳池县",
	    "511622": "武胜县",
	    "511623": "邻水县",
	    "511681": "华蓥市",
	    "511683": "其它区",
	    "511700": "达州市",
	    "511702": "通川区",
	    "511721": "达川区",
	    "511722": "宣汉县",
	    "511723": "开江县",
	    "511724": "大竹县",
	    "511725": "渠县",
	    "511781": "万源市",
	    "511782": "其它区",
	    "511800": "雅安市",
	    "511802": "雨城区",
	    "511821": "名山区",
	    "511822": "荥经县",
	    "511823": "汉源县",
	    "511824": "石棉县",
	    "511825": "天全县",
	    "511826": "芦山县",
	    "511827": "宝兴县",
	    "511828": "其它区",
	    "511900": "巴中市",
	    "511902": "巴州区",
	    "511903": "恩阳区",
	    "511921": "通江县",
	    "511922": "南江县",
	    "511923": "平昌县",
	    "511924": "其它区",
	    "512000": "资阳市",
	    "512002": "雁江区",
	    "512021": "安岳县",
	    "512022": "乐至县",
	    "512081": "简阳市",
	    "512082": "其它区",
	    "513200": "阿坝藏族羌族自治州",
	    "513221": "汶川县",
	    "513222": "理县",
	    "513223": "茂县",
	    "513224": "松潘县",
	    "513225": "九寨沟县",
	    "513226": "金川县",
	    "513227": "小金县",
	    "513228": "黑水县",
	    "513229": "马尔康县",
	    "513230": "壤塘县",
	    "513231": "阿坝县",
	    "513232": "若尔盖县",
	    "513233": "红原县",
	    "513234": "其它区",
	    "513300": "甘孜藏族自治州",
	    "513321": "康定县",
	    "513322": "泸定县",
	    "513323": "丹巴县",
	    "513324": "九龙县",
	    "513325": "雅江县",
	    "513326": "道孚县",
	    "513327": "炉霍县",
	    "513328": "甘孜县",
	    "513329": "新龙县",
	    "513330": "德格县",
	    "513331": "白玉县",
	    "513332": "石渠县",
	    "513333": "色达县",
	    "513334": "理塘县",
	    "513335": "巴塘县",
	    "513336": "乡城县",
	    "513337": "稻城县",
	    "513338": "得荣县",
	    "513339": "其它区",
	    "513400": "凉山彝族自治州",
	    "513401": "西昌市",
	    "513422": "木里藏族自治县",
	    "513423": "盐源县",
	    "513424": "德昌县",
	    "513425": "会理县",
	    "513426": "会东县",
	    "513427": "宁南县",
	    "513428": "普格县",
	    "513429": "布拖县",
	    "513430": "金阳县",
	    "513431": "昭觉县",
	    "513432": "喜德县",
	    "513433": "冕宁县",
	    "513434": "越西县",
	    "513435": "甘洛县",
	    "513436": "美姑县",
	    "513437": "雷波县",
	    "513438": "其它区",
	    "520000": "贵州省",
	    "520100": "贵阳市",
	    "520102": "南明区",
	    "520103": "云岩区",
	    "520111": "花溪区",
	    "520112": "乌当区",
	    "520113": "白云区",
	    "520121": "开阳县",
	    "520122": "息烽县",
	    "520123": "修文县",
	    "520151": "观山湖区",
	    "520181": "清镇市",
	    "520182": "其它区",
	    "520200": "六盘水市",
	    "520201": "钟山区",
	    "520203": "六枝特区",
	    "520221": "水城县",
	    "520222": "盘县",
	    "520223": "其它区",
	    "520300": "遵义市",
	    "520302": "红花岗区",
	    "520303": "汇川区",
	    "520321": "遵义县",
	    "520322": "桐梓县",
	    "520323": "绥阳县",
	    "520324": "正安县",
	    "520325": "道真仡佬族苗族自治县",
	    "520326": "务川仡佬族苗族自治县",
	    "520327": "凤冈县",
	    "520328": "湄潭县",
	    "520329": "余庆县",
	    "520330": "习水县",
	    "520381": "赤水市",
	    "520382": "仁怀市",
	    "520383": "其它区",
	    "520400": "安顺市",
	    "520402": "西秀区",
	    "520421": "平坝县",
	    "520422": "普定县",
	    "520423": "镇宁布依族苗族自治县",
	    "520424": "关岭布依族苗族自治县",
	    "520425": "紫云苗族布依族自治县",
	    "520426": "其它区",
	    "522200": "铜仁市",
	    "522201": "碧江区",
	    "522222": "江口县",
	    "522223": "玉屏侗族自治县",
	    "522224": "石阡县",
	    "522225": "思南县",
	    "522226": "印江土家族苗族自治县",
	    "522227": "德江县",
	    "522228": "沿河土家族自治县",
	    "522229": "松桃苗族自治县",
	    "522230": "万山区",
	    "522231": "其它区",
	    "522300": "黔西南布依族苗族自治州",
	    "522301": "兴义市",
	    "522322": "兴仁县",
	    "522323": "普安县",
	    "522324": "晴隆县",
	    "522325": "贞丰县",
	    "522326": "望谟县",
	    "522327": "册亨县",
	    "522328": "安龙县",
	    "522329": "其它区",
	    "522400": "毕节市",
	    "522401": "七星关区",
	    "522422": "大方县",
	    "522423": "黔西县",
	    "522424": "金沙县",
	    "522425": "织金县",
	    "522426": "纳雍县",
	    "522427": "威宁彝族回族苗族自治县",
	    "522428": "赫章县",
	    "522429": "其它区",
	    "522600": "黔东南苗族侗族自治州",
	    "522601": "凯里市",
	    "522622": "黄平县",
	    "522623": "施秉县",
	    "522624": "三穗县",
	    "522625": "镇远县",
	    "522626": "岑巩县",
	    "522627": "天柱县",
	    "522628": "锦屏县",
	    "522629": "剑河县",
	    "522630": "台江县",
	    "522631": "黎平县",
	    "522632": "榕江县",
	    "522633": "从江县",
	    "522634": "雷山县",
	    "522635": "麻江县",
	    "522636": "丹寨县",
	    "522637": "其它区",
	    "522700": "黔南布依族苗族自治州",
	    "522701": "都匀市",
	    "522702": "福泉市",
	    "522722": "荔波县",
	    "522723": "贵定县",
	    "522725": "瓮安县",
	    "522726": "独山县",
	    "522727": "平塘县",
	    "522728": "罗甸县",
	    "522729": "长顺县",
	    "522730": "龙里县",
	    "522731": "惠水县",
	    "522732": "三都水族自治县",
	    "522733": "其它区",
	    "530000": "云南省",
	    "530100": "昆明市",
	    "530102": "五华区",
	    "530103": "盘龙区",
	    "530111": "官渡区",
	    "530112": "西山区",
	    "530113": "东川区",
	    "530121": "呈贡区",
	    "530122": "晋宁县",
	    "530124": "富民县",
	    "530125": "宜良县",
	    "530126": "石林彝族自治县",
	    "530127": "嵩明县",
	    "530128": "禄劝彝族苗族自治县",
	    "530129": "寻甸回族彝族自治县",
	    "530181": "安宁市",
	    "530182": "其它区",
	    "530300": "曲靖市",
	    "530302": "麒麟区",
	    "530321": "马龙县",
	    "530322": "陆良县",
	    "530323": "师宗县",
	    "530324": "罗平县",
	    "530325": "富源县",
	    "530326": "会泽县",
	    "530328": "沾益县",
	    "530381": "宣威市",
	    "530382": "其它区",
	    "530400": "玉溪市",
	    "530402": "红塔区",
	    "530421": "江川县",
	    "530422": "澄江县",
	    "530423": "通海县",
	    "530424": "华宁县",
	    "530425": "易门县",
	    "530426": "峨山彝族自治县",
	    "530427": "新平彝族傣族自治县",
	    "530428": "元江哈尼族彝族傣族自治县",
	    "530429": "其它区",
	    "530500": "保山市",
	    "530502": "隆阳区",
	    "530521": "施甸县",
	    "530522": "腾冲县",
	    "530523": "龙陵县",
	    "530524": "昌宁县",
	    "530525": "其它区",
	    "530600": "昭通市",
	    "530602": "昭阳区",
	    "530621": "鲁甸县",
	    "530622": "巧家县",
	    "530623": "盐津县",
	    "530624": "大关县",
	    "530625": "永善县",
	    "530626": "绥江县",
	    "530627": "镇雄县",
	    "530628": "彝良县",
	    "530629": "威信县",
	    "530630": "水富县",
	    "530631": "其它区",
	    "530700": "丽江市",
	    "530702": "古城区",
	    "530721": "玉龙纳西族自治县",
	    "530722": "永胜县",
	    "530723": "华坪县",
	    "530724": "宁蒗彝族自治县",
	    "530725": "其它区",
	    "530800": "普洱市",
	    "530802": "思茅区",
	    "530821": "宁洱哈尼族彝族自治县",
	    "530822": "墨江哈尼族自治县",
	    "530823": "景东彝族自治县",
	    "530824": "景谷傣族彝族自治县",
	    "530825": "镇沅彝族哈尼族拉祜族自治县",
	    "530826": "江城哈尼族彝族自治县",
	    "530827": "孟连傣族拉祜族佤族自治县",
	    "530828": "澜沧拉祜族自治县",
	    "530829": "西盟佤族自治县",
	    "530830": "其它区",
	    "530900": "临沧市",
	    "530902": "临翔区",
	    "530921": "凤庆县",
	    "530922": "云县",
	    "530923": "永德县",
	    "530924": "镇康县",
	    "530925": "双江拉祜族佤族布朗族傣族自治县",
	    "530926": "耿马傣族佤族自治县",
	    "530927": "沧源佤族自治县",
	    "530928": "其它区",
	    "532300": "楚雄彝族自治州",
	    "532301": "楚雄市",
	    "532322": "双柏县",
	    "532323": "牟定县",
	    "532324": "南华县",
	    "532325": "姚安县",
	    "532326": "大姚县",
	    "532327": "永仁县",
	    "532328": "元谋县",
	    "532329": "武定县",
	    "532331": "禄丰县",
	    "532332": "其它区",
	    "532500": "红河哈尼族彝族自治州",
	    "532501": "个旧市",
	    "532502": "开远市",
	    "532522": "蒙自市",
	    "532523": "屏边苗族自治县",
	    "532524": "建水县",
	    "532525": "石屏县",
	    "532526": "弥勒市",
	    "532527": "泸西县",
	    "532528": "元阳县",
	    "532529": "红河县",
	    "532530": "金平苗族瑶族傣族自治县",
	    "532531": "绿春县",
	    "532532": "河口瑶族自治县",
	    "532533": "其它区",
	    "532600": "文山壮族苗族自治州",
	    "532621": "文山市",
	    "532622": "砚山县",
	    "532623": "西畴县",
	    "532624": "麻栗坡县",
	    "532625": "马关县",
	    "532626": "丘北县",
	    "532627": "广南县",
	    "532628": "富宁县",
	    "532629": "其它区",
	    "532800": "西双版纳傣族自治州",
	    "532801": "景洪市",
	    "532822": "勐海县",
	    "532823": "勐腊县",
	    "532824": "其它区",
	    "532900": "大理白族自治州",
	    "532901": "大理市",
	    "532922": "漾濞彝族自治县",
	    "532923": "祥云县",
	    "532924": "宾川县",
	    "532925": "弥渡县",
	    "532926": "南涧彝族自治县",
	    "532927": "巍山彝族回族自治县",
	    "532928": "永平县",
	    "532929": "云龙县",
	    "532930": "洱源县",
	    "532931": "剑川县",
	    "532932": "鹤庆县",
	    "532933": "其它区",
	    "533100": "德宏傣族景颇族自治州",
	    "533102": "瑞丽市",
	    "533103": "芒市",
	    "533122": "梁河县",
	    "533123": "盈江县",
	    "533124": "陇川县",
	    "533125": "其它区",
	    "533300": "怒江傈僳族自治州",
	    "533321": "泸水县",
	    "533323": "福贡县",
	    "533324": "贡山独龙族怒族自治县",
	    "533325": "兰坪白族普米族自治县",
	    "533326": "其它区",
	    "533400": "迪庆藏族自治州",
	    "533421": "香格里拉县",
	    "533422": "德钦县",
	    "533423": "维西傈僳族自治县",
	    "533424": "其它区",
	    "540000": "西藏自治区",
	    "540100": "拉萨市",
	    "540102": "城关区",
	    "540121": "林周县",
	    "540122": "当雄县",
	    "540123": "尼木县",
	    "540124": "曲水县",
	    "540125": "堆龙德庆县",
	    "540126": "达孜县",
	    "540127": "墨竹工卡县",
	    "540128": "其它区",
	    "542100": "昌都地区",
	    "542121": "昌都县",
	    "542122": "江达县",
	    "542123": "贡觉县",
	    "542124": "类乌齐县",
	    "542125": "丁青县",
	    "542126": "察雅县",
	    "542127": "八宿县",
	    "542128": "左贡县",
	    "542129": "芒康县",
	    "542132": "洛隆县",
	    "542133": "边坝县",
	    "542134": "其它区",
	    "542200": "山南地区",
	    "542221": "乃东县",
	    "542222": "扎囊县",
	    "542223": "贡嘎县",
	    "542224": "桑日县",
	    "542225": "琼结县",
	    "542226": "曲松县",
	    "542227": "措美县",
	    "542228": "洛扎县",
	    "542229": "加查县",
	    "542231": "隆子县",
	    "542232": "错那县",
	    "542233": "浪卡子县",
	    "542234": "其它区",
	    "542300": "日喀则地区",
	    "542301": "日喀则市",
	    "542322": "南木林县",
	    "542323": "江孜县",
	    "542324": "定日县",
	    "542325": "萨迦县",
	    "542326": "拉孜县",
	    "542327": "昂仁县",
	    "542328": "谢通门县",
	    "542329": "白朗县",
	    "542330": "仁布县",
	    "542331": "康马县",
	    "542332": "定结县",
	    "542333": "仲巴县",
	    "542334": "亚东县",
	    "542335": "吉隆县",
	    "542336": "聂拉木县",
	    "542337": "萨嘎县",
	    "542338": "岗巴县",
	    "542339": "其它区",
	    "542400": "那曲地区",
	    "542421": "那曲县",
	    "542422": "嘉黎县",
	    "542423": "比如县",
	    "542424": "聂荣县",
	    "542425": "安多县",
	    "542426": "申扎县",
	    "542427": "索县",
	    "542428": "班戈县",
	    "542429": "巴青县",
	    "542430": "尼玛县",
	    "542431": "其它区",
	    "542432": "双湖县",
	    "542500": "阿里地区",
	    "542521": "普兰县",
	    "542522": "札达县",
	    "542523": "噶尔县",
	    "542524": "日土县",
	    "542525": "革吉县",
	    "542526": "改则县",
	    "542527": "措勤县",
	    "542528": "其它区",
	    "542600": "林芝地区",
	    "542621": "林芝县",
	    "542622": "工布江达县",
	    "542623": "米林县",
	    "542624": "墨脱县",
	    "542625": "波密县",
	    "542626": "察隅县",
	    "542627": "朗县",
	    "542628": "其它区",
	    "610000": "陕西省",
	    "610100": "西安市",
	    "610102": "新城区",
	    "610103": "碑林区",
	    "610104": "莲湖区",
	    "610111": "灞桥区",
	    "610112": "未央区",
	    "610113": "雁塔区",
	    "610114": "阎良区",
	    "610115": "临潼区",
	    "610116": "长安区",
	    "610122": "蓝田县",
	    "610124": "周至县",
	    "610125": "户县",
	    "610126": "高陵县",
	    "610127": "其它区",
	    "610200": "铜川市",
	    "610202": "王益区",
	    "610203": "印台区",
	    "610204": "耀州区",
	    "610222": "宜君县",
	    "610223": "其它区",
	    "610300": "宝鸡市",
	    "610302": "渭滨区",
	    "610303": "金台区",
	    "610304": "陈仓区",
	    "610322": "凤翔县",
	    "610323": "岐山县",
	    "610324": "扶风县",
	    "610326": "眉县",
	    "610327": "陇县",
	    "610328": "千阳县",
	    "610329": "麟游县",
	    "610330": "凤县",
	    "610331": "太白县",
	    "610332": "其它区",
	    "610400": "咸阳市",
	    "610402": "秦都区",
	    "610403": "杨陵区",
	    "610404": "渭城区",
	    "610422": "三原县",
	    "610423": "泾阳县",
	    "610424": "乾县",
	    "610425": "礼泉县",
	    "610426": "永寿县",
	    "610427": "彬县",
	    "610428": "长武县",
	    "610429": "旬邑县",
	    "610430": "淳化县",
	    "610431": "武功县",
	    "610481": "兴平市",
	    "610482": "其它区",
	    "610500": "渭南市",
	    "610502": "临渭区",
	    "610521": "华县",
	    "610522": "潼关县",
	    "610523": "大荔县",
	    "610524": "合阳县",
	    "610525": "澄城县",
	    "610526": "蒲城县",
	    "610527": "白水县",
	    "610528": "富平县",
	    "610581": "韩城市",
	    "610582": "华阴市",
	    "610583": "其它区",
	    "610600": "延安市",
	    "610602": "宝塔区",
	    "610621": "延长县",
	    "610622": "延川县",
	    "610623": "子长县",
	    "610624": "安塞县",
	    "610625": "志丹县",
	    "610626": "吴起县",
	    "610627": "甘泉县",
	    "610628": "富县",
	    "610629": "洛川县",
	    "610630": "宜川县",
	    "610631": "黄龙县",
	    "610632": "黄陵县",
	    "610633": "其它区",
	    "610700": "汉中市",
	    "610702": "汉台区",
	    "610721": "南郑县",
	    "610722": "城固县",
	    "610723": "洋县",
	    "610724": "西乡县",
	    "610725": "勉县",
	    "610726": "宁强县",
	    "610727": "略阳县",
	    "610728": "镇巴县",
	    "610729": "留坝县",
	    "610730": "佛坪县",
	    "610731": "其它区",
	    "610800": "榆林市",
	    "610802": "榆阳区",
	    "610821": "神木县",
	    "610822": "府谷县",
	    "610823": "横山县",
	    "610824": "靖边县",
	    "610825": "定边县",
	    "610826": "绥德县",
	    "610827": "米脂县",
	    "610828": "佳县",
	    "610829": "吴堡县",
	    "610830": "清涧县",
	    "610831": "子洲县",
	    "610832": "其它区",
	    "610900": "安康市",
	    "610902": "汉滨区",
	    "610921": "汉阴县",
	    "610922": "石泉县",
	    "610923": "宁陕县",
	    "610924": "紫阳县",
	    "610925": "岚皋县",
	    "610926": "平利县",
	    "610927": "镇坪县",
	    "610928": "旬阳县",
	    "610929": "白河县",
	    "610930": "其它区",
	    "611000": "商洛市",
	    "611002": "商州区",
	    "611021": "洛南县",
	    "611022": "丹凤县",
	    "611023": "商南县",
	    "611024": "山阳县",
	    "611025": "镇安县",
	    "611026": "柞水县",
	    "611027": "其它区",
	    "620000": "甘肃省",
	    "620100": "兰州市",
	    "620102": "城关区",
	    "620103": "七里河区",
	    "620104": "西固区",
	    "620105": "安宁区",
	    "620111": "红古区",
	    "620121": "永登县",
	    "620122": "皋兰县",
	    "620123": "榆中县",
	    "620124": "其它区",
	    "620200": "嘉峪关市",
	    "620300": "金昌市",
	    "620302": "金川区",
	    "620321": "永昌县",
	    "620322": "其它区",
	    "620400": "白银市",
	    "620402": "白银区",
	    "620403": "平川区",
	    "620421": "靖远县",
	    "620422": "会宁县",
	    "620423": "景泰县",
	    "620424": "其它区",
	    "620500": "天水市",
	    "620502": "秦州区",
	    "620503": "麦积区",
	    "620521": "清水县",
	    "620522": "秦安县",
	    "620523": "甘谷县",
	    "620524": "武山县",
	    "620525": "张家川回族自治县",
	    "620526": "其它区",
	    "620600": "武威市",
	    "620602": "凉州区",
	    "620621": "民勤县",
	    "620622": "古浪县",
	    "620623": "天祝藏族自治县",
	    "620624": "其它区",
	    "620700": "张掖市",
	    "620702": "甘州区",
	    "620721": "肃南裕固族自治县",
	    "620722": "民乐县",
	    "620723": "临泽县",
	    "620724": "高台县",
	    "620725": "山丹县",
	    "620726": "其它区",
	    "620800": "平凉市",
	    "620802": "崆峒区",
	    "620821": "泾川县",
	    "620822": "灵台县",
	    "620823": "崇信县",
	    "620824": "华亭县",
	    "620825": "庄浪县",
	    "620826": "静宁县",
	    "620827": "其它区",
	    "620900": "酒泉市",
	    "620902": "肃州区",
	    "620921": "金塔县",
	    "620922": "瓜州县",
	    "620923": "肃北蒙古族自治县",
	    "620924": "阿克塞哈萨克族自治县",
	    "620981": "玉门市",
	    "620982": "敦煌市",
	    "620983": "其它区",
	    "621000": "庆阳市",
	    "621002": "西峰区",
	    "621021": "庆城县",
	    "621022": "环县",
	    "621023": "华池县",
	    "621024": "合水县",
	    "621025": "正宁县",
	    "621026": "宁县",
	    "621027": "镇原县",
	    "621028": "其它区",
	    "621100": "定西市",
	    "621102": "安定区",
	    "621121": "通渭县",
	    "621122": "陇西县",
	    "621123": "渭源县",
	    "621124": "临洮县",
	    "621125": "漳县",
	    "621126": "岷县",
	    "621127": "其它区",
	    "621200": "陇南市",
	    "621202": "武都区",
	    "621221": "成县",
	    "621222": "文县",
	    "621223": "宕昌县",
	    "621224": "康县",
	    "621225": "西和县",
	    "621226": "礼县",
	    "621227": "徽县",
	    "621228": "两当县",
	    "621229": "其它区",
	    "622900": "临夏回族自治州",
	    "622901": "临夏市",
	    "622921": "临夏县",
	    "622922": "康乐县",
	    "622923": "永靖县",
	    "622924": "广河县",
	    "622925": "和政县",
	    "622926": "东乡族自治县",
	    "622927": "积石山保安族东乡族撒拉族自治县",
	    "622928": "其它区",
	    "623000": "甘南藏族自治州",
	    "623001": "合作市",
	    "623021": "临潭县",
	    "623022": "卓尼县",
	    "623023": "舟曲县",
	    "623024": "迭部县",
	    "623025": "玛曲县",
	    "623026": "碌曲县",
	    "623027": "夏河县",
	    "623028": "其它区",
	    "630000": "青海省",
	    "630100": "西宁市",
	    "630102": "城东区",
	    "630103": "城中区",
	    "630104": "城西区",
	    "630105": "城北区",
	    "630121": "大通回族土族自治县",
	    "630122": "湟中县",
	    "630123": "湟源县",
	    "630124": "其它区",
	    "632100": "海东市",
	    "632121": "平安县",
	    "632122": "民和回族土族自治县",
	    "632123": "乐都区",
	    "632126": "互助土族自治县",
	    "632127": "化隆回族自治县",
	    "632128": "循化撒拉族自治县",
	    "632129": "其它区",
	    "632200": "海北藏族自治州",
	    "632221": "门源回族自治县",
	    "632222": "祁连县",
	    "632223": "海晏县",
	    "632224": "刚察县",
	    "632225": "其它区",
	    "632300": "黄南藏族自治州",
	    "632321": "同仁县",
	    "632322": "尖扎县",
	    "632323": "泽库县",
	    "632324": "河南蒙古族自治县",
	    "632325": "其它区",
	    "632500": "海南藏族自治州",
	    "632521": "共和县",
	    "632522": "同德县",
	    "632523": "贵德县",
	    "632524": "兴海县",
	    "632525": "贵南县",
	    "632526": "其它区",
	    "632600": "果洛藏族自治州",
	    "632621": "玛沁县",
	    "632622": "班玛县",
	    "632623": "甘德县",
	    "632624": "达日县",
	    "632625": "久治县",
	    "632626": "玛多县",
	    "632627": "其它区",
	    "632700": "玉树藏族自治州",
	    "632721": "玉树市",
	    "632722": "杂多县",
	    "632723": "称多县",
	    "632724": "治多县",
	    "632725": "囊谦县",
	    "632726": "曲麻莱县",
	    "632727": "其它区",
	    "632800": "海西蒙古族藏族自治州",
	    "632801": "格尔木市",
	    "632802": "德令哈市",
	    "632821": "乌兰县",
	    "632822": "都兰县",
	    "632823": "天峻县",
	    "632824": "其它区",
	    "640000": "宁夏回族自治区",
	    "640100": "银川市",
	    "640104": "兴庆区",
	    "640105": "西夏区",
	    "640106": "金凤区",
	    "640121": "永宁县",
	    "640122": "贺兰县",
	    "640181": "灵武市",
	    "640182": "其它区",
	    "640200": "石嘴山市",
	    "640202": "大武口区",
	    "640205": "惠农区",
	    "640221": "平罗县",
	    "640222": "其它区",
	    "640300": "吴忠市",
	    "640302": "利通区",
	    "640303": "红寺堡区",
	    "640323": "盐池县",
	    "640324": "同心县",
	    "640381": "青铜峡市",
	    "640382": "其它区",
	    "640400": "固原市",
	    "640402": "原州区",
	    "640422": "西吉县",
	    "640423": "隆德县",
	    "640424": "泾源县",
	    "640425": "彭阳县",
	    "640426": "其它区",
	    "640500": "中卫市",
	    "640502": "沙坡头区",
	    "640521": "中宁县",
	    "640522": "海原县",
	    "640523": "其它区",
	    "650000": "新疆维吾尔自治区",
	    "650100": "乌鲁木齐市",
	    "650102": "天山区",
	    "650103": "沙依巴克区",
	    "650104": "新市区",
	    "650105": "水磨沟区",
	    "650106": "头屯河区",
	    "650107": "达坂城区",
	    "650109": "米东区",
	    "650121": "乌鲁木齐县",
	    "650122": "其它区",
	    "650200": "克拉玛依市",
	    "650202": "独山子区",
	    "650203": "克拉玛依区",
	    "650204": "白碱滩区",
	    "650205": "乌尔禾区",
	    "650206": "其它区",
	    "652100": "吐鲁番地区",
	    "652101": "吐鲁番市",
	    "652122": "鄯善县",
	    "652123": "托克逊县",
	    "652124": "其它区",
	    "652200": "哈密地区",
	    "652201": "哈密市",
	    "652222": "巴里坤哈萨克自治县",
	    "652223": "伊吾县",
	    "652224": "其它区",
	    "652300": "昌吉回族自治州",
	    "652301": "昌吉市",
	    "652302": "阜康市",
	    "652323": "呼图壁县",
	    "652324": "玛纳斯县",
	    "652325": "奇台县",
	    "652327": "吉木萨尔县",
	    "652328": "木垒哈萨克自治县",
	    "652329": "其它区",
	    "652700": "博尔塔拉蒙古自治州",
	    "652701": "博乐市",
	    "652702": "阿拉山口市",
	    "652722": "精河县",
	    "652723": "温泉县",
	    "652724": "其它区",
	    "652800": "巴音郭楞蒙古自治州",
	    "652801": "库尔勒市",
	    "652822": "轮台县",
	    "652823": "尉犁县",
	    "652824": "若羌县",
	    "652825": "且末县",
	    "652826": "焉耆回族自治县",
	    "652827": "和静县",
	    "652828": "和硕县",
	    "652829": "博湖县",
	    "652830": "其它区",
	    "652900": "阿克苏地区",
	    "652901": "阿克苏市",
	    "652922": "温宿县",
	    "652923": "库车县",
	    "652924": "沙雅县",
	    "652925": "新和县",
	    "652926": "拜城县",
	    "652927": "乌什县",
	    "652928": "阿瓦提县",
	    "652929": "柯坪县",
	    "652930": "其它区",
	    "653000": "克孜勒苏柯尔克孜自治州",
	    "653001": "阿图什市",
	    "653022": "阿克陶县",
	    "653023": "阿合奇县",
	    "653024": "乌恰县",
	    "653025": "其它区",
	    "653100": "喀什地区",
	    "653101": "喀什市",
	    "653121": "疏附县",
	    "653122": "疏勒县",
	    "653123": "英吉沙县",
	    "653124": "泽普县",
	    "653125": "莎车县",
	    "653126": "叶城县",
	    "653127": "麦盖提县",
	    "653128": "岳普湖县",
	    "653129": "伽师县",
	    "653130": "巴楚县",
	    "653131": "塔什库尔干塔吉克自治县",
	    "653132": "其它区",
	    "653200": "和田地区",
	    "653201": "和田市",
	    "653221": "和田县",
	    "653222": "墨玉县",
	    "653223": "皮山县",
	    "653224": "洛浦县",
	    "653225": "策勒县",
	    "653226": "于田县",
	    "653227": "民丰县",
	    "653228": "其它区",
	    "654000": "伊犁哈萨克自治州",
	    "654002": "伊宁市",
	    "654003": "奎屯市",
	    "654021": "伊宁县",
	    "654022": "察布查尔锡伯自治县",
	    "654023": "霍城县",
	    "654024": "巩留县",
	    "654025": "新源县",
	    "654026": "昭苏县",
	    "654027": "特克斯县",
	    "654028": "尼勒克县",
	    "654029": "其它区",
	    "654200": "塔城地区",
	    "654201": "塔城市",
	    "654202": "乌苏市",
	    "654221": "额敏县",
	    "654223": "沙湾县",
	    "654224": "托里县",
	    "654225": "裕民县",
	    "654226": "和布克赛尔蒙古自治县",
	    "654227": "其它区",
	    "654300": "阿勒泰地区",
	    "654301": "阿勒泰市",
	    "654321": "布尔津县",
	    "654322": "富蕴县",
	    "654323": "福海县",
	    "654324": "哈巴河县",
	    "654325": "青河县",
	    "654326": "吉木乃县",
	    "654327": "其它区",
	    "659001": "石河子市",
	    "659002": "阿拉尔市",
	    "659003": "图木舒克市",
	    "659004": "五家渠市",
	    "710000": "台湾",
	    "710100": "台北市",
	    "710101": "中正区",
	    "710102": "大同区",
	    "710103": "中山区",
	    "710104": "松山区",
	    "710105": "大安区",
	    "710106": "万华区",
	    "710107": "信义区",
	    "710108": "士林区",
	    "710109": "北投区",
	    "710110": "内湖区",
	    "710111": "南港区",
	    "710112": "文山区",
	    "710113": "其它区",
	    "710200": "高雄市",
	    "710201": "新兴区",
	    "710202": "前金区",
	    "710203": "芩雅区",
	    "710204": "盐埕区",
	    "710205": "鼓山区",
	    "710206": "旗津区",
	    "710207": "前镇区",
	    "710208": "三民区",
	    "710209": "左营区",
	    "710210": "楠梓区",
	    "710211": "小港区",
	    "710212": "其它区",
	    "710241": "苓雅区",
	    "710242": "仁武区",
	    "710243": "大社区",
	    "710244": "冈山区",
	    "710245": "路竹区",
	    "710246": "阿莲区",
	    "710247": "田寮区",
	    "710248": "燕巢区",
	    "710249": "桥头区",
	    "710250": "梓官区",
	    "710251": "弥陀区",
	    "710252": "永安区",
	    "710253": "湖内区",
	    "710254": "凤山区",
	    "710255": "大寮区",
	    "710256": "林园区",
	    "710257": "鸟松区",
	    "710258": "大树区",
	    "710259": "旗山区",
	    "710260": "美浓区",
	    "710261": "六龟区",
	    "710262": "内门区",
	    "710263": "杉林区",
	    "710264": "甲仙区",
	    "710265": "桃源区",
	    "710266": "那玛夏区",
	    "710267": "茂林区",
	    "710268": "茄萣区",
	    "710300": "台南市",
	    "710301": "中西区",
	    "710302": "东区",
	    "710303": "南区",
	    "710304": "北区",
	    "710305": "安平区",
	    "710306": "安南区",
	    "710307": "其它区",
	    "710339": "永康区",
	    "710340": "归仁区",
	    "710341": "新化区",
	    "710342": "左镇区",
	    "710343": "玉井区",
	    "710344": "楠西区",
	    "710345": "南化区",
	    "710346": "仁德区",
	    "710347": "关庙区",
	    "710348": "龙崎区",
	    "710349": "官田区",
	    "710350": "麻豆区",
	    "710351": "佳里区",
	    "710352": "西港区",
	    "710353": "七股区",
	    "710354": "将军区",
	    "710355": "学甲区",
	    "710356": "北门区",
	    "710357": "新营区",
	    "710358": "后壁区",
	    "710359": "白河区",
	    "710360": "东山区",
	    "710361": "六甲区",
	    "710362": "下营区",
	    "710363": "柳营区",
	    "710364": "盐水区",
	    "710365": "善化区",
	    "710366": "大内区",
	    "710367": "山上区",
	    "710368": "新市区",
	    "710369": "安定区",
	    "710400": "台中市",
	    "710401": "中区",
	    "710402": "东区",
	    "710403": "南区",
	    "710404": "西区",
	    "710405": "北区",
	    "710406": "北屯区",
	    "710407": "西屯区",
	    "710408": "南屯区",
	    "710409": "其它区",
	    "710431": "太平区",
	    "710432": "大里区",
	    "710433": "雾峰区",
	    "710434": "乌日区",
	    "710435": "丰原区",
	    "710436": "后里区",
	    "710437": "石冈区",
	    "710438": "东势区",
	    "710439": "和平区",
	    "710440": "新社区",
	    "710441": "潭子区",
	    "710442": "大雅区",
	    "710443": "神冈区",
	    "710444": "大肚区",
	    "710445": "沙鹿区",
	    "710446": "龙井区",
	    "710447": "梧栖区",
	    "710448": "清水区",
	    "710449": "大甲区",
	    "710450": "外埔区",
	    "710451": "大安区",
	    "710500": "金门县",
	    "710507": "金沙镇",
	    "710508": "金湖镇",
	    "710509": "金宁乡",
	    "710510": "金城镇",
	    "710511": "烈屿乡",
	    "710512": "乌坵乡",
	    "710600": "南投县",
	    "710614": "南投市",
	    "710615": "中寮乡",
	    "710616": "草屯镇",
	    "710617": "国姓乡",
	    "710618": "埔里镇",
	    "710619": "仁爱乡",
	    "710620": "名间乡",
	    "710621": "集集镇",
	    "710622": "水里乡",
	    "710623": "鱼池乡",
	    "710624": "信义乡",
	    "710625": "竹山镇",
	    "710626": "鹿谷乡",
	    "710700": "基隆市",
	    "710701": "仁爱区",
	    "710702": "信义区",
	    "710703": "中正区",
	    "710704": "中山区",
	    "710705": "安乐区",
	    "710706": "暖暖区",
	    "710707": "七堵区",
	    "710708": "其它区",
	    "710800": "新竹市",
	    "710801": "东区",
	    "710802": "北区",
	    "710803": "香山区",
	    "710804": "其它区",
	    "710900": "嘉义市",
	    "710901": "东区",
	    "710902": "西区",
	    "710903": "其它区",
	    "711100": "新北市",
	    "711130": "万里区",
	    "711131": "金山区",
	    "711132": "板桥区",
	    "711133": "汐止区",
	    "711134": "深坑区",
	    "711135": "石碇区",
	    "711136": "瑞芳区",
	    "711137": "平溪区",
	    "711138": "双溪区",
	    "711139": "贡寮区",
	    "711140": "新店区",
	    "711141": "坪林区",
	    "711142": "乌来区",
	    "711143": "永和区",
	    "711144": "中和区",
	    "711145": "土城区",
	    "711146": "三峡区",
	    "711147": "树林区",
	    "711148": "莺歌区",
	    "711149": "三重区",
	    "711150": "新庄区",
	    "711151": "泰山区",
	    "711152": "林口区",
	    "711153": "芦洲区",
	    "711154": "五股区",
	    "711155": "八里区",
	    "711156": "淡水区",
	    "711157": "三芝区",
	    "711158": "石门区",
	    "711200": "宜兰县",
	    "711214": "宜兰市",
	    "711215": "头城镇",
	    "711216": "礁溪乡",
	    "711217": "壮围乡",
	    "711218": "员山乡",
	    "711219": "罗东镇",
	    "711220": "三星乡",
	    "711221": "大同乡",
	    "711222": "五结乡",
	    "711223": "冬山乡",
	    "711224": "苏澳镇",
	    "711225": "南澳乡",
	    "711226": "钓鱼台",
	    "711300": "新竹县",
	    "711314": "竹北市",
	    "711315": "湖口乡",
	    "711316": "新丰乡",
	    "711317": "新埔镇",
	    "711318": "关西镇",
	    "711319": "芎林乡",
	    "711320": "宝山乡",
	    "711321": "竹东镇",
	    "711322": "五峰乡",
	    "711323": "横山乡",
	    "711324": "尖石乡",
	    "711325": "北埔乡",
	    "711326": "峨眉乡",
	    "711400": "桃园县",
	    "711414": "中坜市",
	    "711415": "平镇市",
	    "711416": "龙潭乡",
	    "711417": "杨梅市",
	    "711418": "新屋乡",
	    "711419": "观音乡",
	    "711420": "桃园市",
	    "711421": "龟山乡",
	    "711422": "八德市",
	    "711423": "大溪镇",
	    "711424": "复兴乡",
	    "711425": "大园乡",
	    "711426": "芦竹乡",
	    "711500": "苗栗县",
	    "711519": "竹南镇",
	    "711520": "头份镇",
	    "711521": "三湾乡",
	    "711522": "南庄乡",
	    "711523": "狮潭乡",
	    "711524": "后龙镇",
	    "711525": "通霄镇",
	    "711526": "苑里镇",
	    "711527": "苗栗市",
	    "711528": "造桥乡",
	    "711529": "头屋乡",
	    "711530": "公馆乡",
	    "711531": "大湖乡",
	    "711532": "泰安乡",
	    "711533": "铜锣乡",
	    "711534": "三义乡",
	    "711535": "西湖乡",
	    "711536": "卓兰镇",
	    "711700": "彰化县",
	    "711727": "彰化市",
	    "711728": "芬园乡",
	    "711729": "花坛乡",
	    "711730": "秀水乡",
	    "711731": "鹿港镇",
	    "711732": "福兴乡",
	    "711733": "线西乡",
	    "711734": "和美镇",
	    "711735": "伸港乡",
	    "711736": "员林镇",
	    "711737": "社头乡",
	    "711738": "永靖乡",
	    "711739": "埔心乡",
	    "711740": "溪湖镇",
	    "711741": "大村乡",
	    "711742": "埔盐乡",
	    "711743": "田中镇",
	    "711744": "北斗镇",
	    "711745": "田尾乡",
	    "711746": "埤头乡",
	    "711747": "溪州乡",
	    "711748": "竹塘乡",
	    "711749": "二林镇",
	    "711750": "大城乡",
	    "711751": "芳苑乡",
	    "711752": "二水乡",
	    "711900": "嘉义县",
	    "711919": "番路乡",
	    "711920": "梅山乡",
	    "711921": "竹崎乡",
	    "711922": "阿里山乡",
	    "711923": "中埔乡",
	    "711924": "大埔乡",
	    "711925": "水上乡",
	    "711926": "鹿草乡",
	    "711927": "太保市",
	    "711928": "朴子市",
	    "711929": "东石乡",
	    "711930": "六脚乡",
	    "711931": "新港乡",
	    "711932": "民雄乡",
	    "711933": "大林镇",
	    "711934": "溪口乡",
	    "711935": "义竹乡",
	    "711936": "布袋镇",
	    "712100": "云林县",
	    "712121": "斗南镇",
	    "712122": "大埤乡",
	    "712123": "虎尾镇",
	    "712124": "土库镇",
	    "712125": "褒忠乡",
	    "712126": "东势乡",
	    "712127": "台西乡",
	    "712128": "仑背乡",
	    "712129": "麦寮乡",
	    "712130": "斗六市",
	    "712131": "林内乡",
	    "712132": "古坑乡",
	    "712133": "莿桐乡",
	    "712134": "西螺镇",
	    "712135": "二仑乡",
	    "712136": "北港镇",
	    "712137": "水林乡",
	    "712138": "口湖乡",
	    "712139": "四湖乡",
	    "712140": "元长乡",
	    "712400": "屏东县",
	    "712434": "屏东市",
	    "712435": "三地门乡",
	    "712436": "雾台乡",
	    "712437": "玛家乡",
	    "712438": "九如乡",
	    "712439": "里港乡",
	    "712440": "高树乡",
	    "712441": "盐埔乡",
	    "712442": "长治乡",
	    "712443": "麟洛乡",
	    "712444": "竹田乡",
	    "712445": "内埔乡",
	    "712446": "万丹乡",
	    "712447": "潮州镇",
	    "712448": "泰武乡",
	    "712449": "来义乡",
	    "712450": "万峦乡",
	    "712451": "崁顶乡",
	    "712452": "新埤乡",
	    "712453": "南州乡",
	    "712454": "林边乡",
	    "712455": "东港镇",
	    "712456": "琉球乡",
	    "712457": "佳冬乡",
	    "712458": "新园乡",
	    "712459": "枋寮乡",
	    "712460": "枋山乡",
	    "712461": "春日乡",
	    "712462": "狮子乡",
	    "712463": "车城乡",
	    "712464": "牡丹乡",
	    "712465": "恒春镇",
	    "712466": "满州乡",
	    "712500": "台东县",
	    "712517": "台东市",
	    "712518": "绿岛乡",
	    "712519": "兰屿乡",
	    "712520": "延平乡",
	    "712521": "卑南乡",
	    "712522": "鹿野乡",
	    "712523": "关山镇",
	    "712524": "海端乡",
	    "712525": "池上乡",
	    "712526": "东河乡",
	    "712527": "成功镇",
	    "712528": "长滨乡",
	    "712529": "金峰乡",
	    "712530": "大武乡",
	    "712531": "达仁乡",
	    "712532": "太麻里乡",
	    "712600": "花莲县",
	    "712615": "花莲市",
	    "712616": "新城乡",
	    "712617": "太鲁阁",
	    "712618": "秀林乡",
	    "712619": "吉安乡",
	    "712620": "寿丰乡",
	    "712621": "凤林镇",
	    "712622": "光复乡",
	    "712623": "丰滨乡",
	    "712624": "瑞穗乡",
	    "712625": "万荣乡",
	    "712626": "玉里镇",
	    "712627": "卓溪乡",
	    "712628": "富里乡",
	    "712700": "澎湖县",
	    "712707": "马公市",
	    "712708": "西屿乡",
	    "712709": "望安乡",
	    "712710": "七美乡",
	    "712711": "白沙乡",
	    "712712": "湖西乡",
	    "712800": "连江县",
	    "712805": "南竿乡",
	    "712806": "北竿乡",
	    "712807": "莒光乡",
	    "712808": "东引乡",
	    "810000": "香港特别行政区",
	    "810100": "香港岛",
	    "810101": "中西区",
	    "810102": "湾仔",
	    "810103": "东区",
	    "810104": "南区",
	    "810200": "九龙",
	    "810201": "九龙城区",
	    "810202": "油尖旺区",
	    "810203": "深水埗区",
	    "810204": "黄大仙区",
	    "810205": "观塘区",
	    "810300": "新界",
	    "810301": "北区",
	    "810302": "大埔区",
	    "810303": "沙田区",
	    "810304": "西贡区",
	    "810305": "元朗区",
	    "810306": "屯门区",
	    "810307": "荃湾区",
	    "810308": "葵青区",
	    "810309": "离岛区",
	    "820000": "澳门特别行政区",
	    "820100": "澳门半岛",
	    "820200": "离岛",
	    "990000": "海外",
	    "990100": "海外"
	}

	// id pid/parentId name children
	function tree(list) {
	    var mapped = {}
	    for (var i = 0, item; i < list.length; i++) {
	        item = list[i]
	        if (!item || !item.id) continue
	        mapped[item.id] = item
	    }

	    var result = []
	    for (var ii = 0; ii < list.length; ii++) {
	        item = list[ii]

	        if (!item) continue
	            /* jshint -W041 */
	        if (item.pid == undefined && item.parentId == undefined) {
	            result.push(item)
	            continue
	        }
	        var parent = mapped[item.pid] || mapped[item.parentId]
	        if (!parent) continue
	        if (!parent.children) parent.children = []
	        parent.children.push(item)
	    }
	    return result
	}

	var DICT_FIXED = function() {
	    var fixed = []
	    for (var id in DICT) {
	        var pid = id.slice(2, 6) === '0000' ? undefined :
	            id.slice(4, 6) == '00' ? (id.slice(0, 2) + '0000') :
	            id.slice(0, 4) + '00'
	        fixed.push({
	            id: id,
	            pid: pid,
	            name: DICT[id]
	        })
	    }
	    return tree(fixed)
	}()

	module.exports = DICT_FIXED

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## Miscellaneous
	*/
	var DICT = __webpack_require__(18)
	module.exports = {
		// Dice
		d4: function() {
			return this.natural(1, 4)
		},
		d6: function() {
			return this.natural(1, 6)
		},
		d8: function() {
			return this.natural(1, 8)
		},
		d12: function() {
			return this.natural(1, 12)
		},
		d20: function() {
			return this.natural(1, 20)
		},
		d100: function() {
			return this.natural(1, 100)
		},
		/*
		    随机生成一个 GUID。

		    http://www.broofa.com/2008/09/javascript-uuid-function/
		    [UUID 规范](http://www.ietf.org/rfc/rfc4122.txt)
		        UUIDs (Universally Unique IDentifier)
		        GUIDs (Globally Unique IDentifier)
		        The formal definition of the UUID string representation is provided by the following ABNF [7]:
		            UUID                   = time-low "-" time-mid "-"
		                                   time-high-and-version "-"
		                                   clock-seq-and-reserved
		                                   clock-seq-low "-" node
		            time-low               = 4hexOctet
		            time-mid               = 2hexOctet
		            time-high-and-version  = 2hexOctet
		            clock-seq-and-reserved = hexOctet
		            clock-seq-low          = hexOctet
		            node                   = 6hexOctet
		            hexOctet               = hexDigit hexDigit
		            hexDigit =
		                "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
		                "a" / "b" / "c" / "d" / "e" / "f" /
		                "A" / "B" / "C" / "D" / "E" / "F"
		    
		    https://github.com/victorquinn/chancejs/blob/develop/chance.js#L1349
		*/
		guid: function() {
			var pool = "abcdefABCDEF1234567890",
				guid = this.string(pool, 8) + '-' +
				this.string(pool, 4) + '-' +
				this.string(pool, 4) + '-' +
				this.string(pool, 4) + '-' +
				this.string(pool, 12);
			return guid
		},
		uuid: function() {
			return this.guid()
		},
		/*
		    随机生成一个 18 位身份证。

		    [身份证](http://baike.baidu.com/view/1697.htm#4)
		        地址码 6 + 出生日期码 8 + 顺序码 3 + 校验码 1
		    [《中华人民共和国行政区划代码》国家标准(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
		*/
		id: function() {
			var id,
				sum = 0,
				rank = [
					"7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"
				],
				last = [
					"1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"
				]

			id = this.pick(DICT).id +
				this.date('yyyyMMdd') +
				this.string('number', 3)

			for (var i = 0; i < id.length; i++) {
				sum += id[i] * rank[i];
			}
			id += last[sum % 11];

			return id
		},

		/*
		    生成一个全局的自增整数。
		    类似自增主键（auto increment primary key）。
		*/
		increment: function() {
			var key = 0
			return function(step) {
				return key += (+step || 1) // step?
			}
		}(),
		inc: function(step) {
			return this.increment(step)
		}
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Parser = __webpack_require__(21)
	var Handler = __webpack_require__(22)
	module.exports = {
		Parser: Parser,
		Handler: Handler
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	// https://github.com/nuysoft/regexp
	// forked from https://github.com/ForbesLindesay/regexp

	function parse(n) {
	    if ("string" != typeof n) {
	        var l = new TypeError("The regexp to parse must be represented as a string.");
	        throw l;
	    }
	    return index = 1, cgs = {}, parser.parse(n);
	}

	function Token(n) {
	    this.type = n, this.offset = Token.offset(), this.text = Token.text();
	}

	function Alternate(n, l) {
	    Token.call(this, "alternate"), this.left = n, this.right = l;
	}

	function Match(n) {
	    Token.call(this, "match"), this.body = n.filter(Boolean);
	}

	function Group(n, l) {
	    Token.call(this, n), this.body = l;
	}

	function CaptureGroup(n) {
	    Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index++), 
	    this.body = n;
	}

	function Quantified(n, l) {
	    Token.call(this, "quantified"), this.body = n, this.quantifier = l;
	}

	function Quantifier(n, l) {
	    Token.call(this, "quantifier"), this.min = n, this.max = l, this.greedy = !0;
	}

	function CharSet(n, l) {
	    Token.call(this, "charset"), this.invert = n, this.body = l;
	}

	function CharacterRange(n, l) {
	    Token.call(this, "range"), this.start = n, this.end = l;
	}

	function Literal(n) {
	    Token.call(this, "literal"), this.body = n, this.escaped = this.body != this.text;
	}

	function Unicode(n) {
	    Token.call(this, "unicode"), this.code = n.toUpperCase();
	}

	function Hex(n) {
	    Token.call(this, "hex"), this.code = n.toUpperCase();
	}

	function Octal(n) {
	    Token.call(this, "octal"), this.code = n.toUpperCase();
	}

	function BackReference(n) {
	    Token.call(this, "back-reference"), this.code = n.toUpperCase();
	}

	function ControlCharacter(n) {
	    Token.call(this, "control-character"), this.code = n.toUpperCase();
	}

	var parser = function() {
	    function n(n, l) {
	        function u() {
	            this.constructor = n;
	        }
	        u.prototype = l.prototype, n.prototype = new u();
	    }
	    function l(n, l, u, t, r) {
	        function e(n, l) {
	            function u(n) {
	                function l(n) {
	                    return n.charCodeAt(0).toString(16).toUpperCase();
	                }
	                return n.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n) {
	                    return "\\x0" + l(n);
	                }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n) {
	                    return "\\x" + l(n);
	                }).replace(/[\u0180-\u0FFF]/g, function(n) {
	                    return "\\u0" + l(n);
	                }).replace(/[\u1080-\uFFFF]/g, function(n) {
	                    return "\\u" + l(n);
	                });
	            }
	            var t, r;
	            switch (n.length) {
	              case 0:
	                t = "end of input";
	                break;

	              case 1:
	                t = n[0];
	                break;

	              default:
	                t = n.slice(0, -1).join(", ") + " or " + n[n.length - 1];
	            }
	            return r = l ? '"' + u(l) + '"' : "end of input", "Expected " + t + " but " + r + " found.";
	        }
	        this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r, 
	        this.name = "SyntaxError", this.message = e(n, l);
	    }
	    function u(n) {
	        function u() {
	            return n.substring(Lt, qt);
	        }
	        function t() {
	            return Lt;
	        }
	        function r(l) {
	            function u(l, u, t) {
	                var r, e;
	                for (r = u; t > r; r++) e = n.charAt(r), "\n" === e ? (l.seenCR || l.line++, l.column = 1, 
	                l.seenCR = !1) : "\r" === e || "\u2028" === e || "\u2029" === e ? (l.line++, l.column = 1, 
	                l.seenCR = !0) : (l.column++, l.seenCR = !1);
	            }
	            return Mt !== l && (Mt > l && (Mt = 0, Dt = {
	                line: 1,
	                column: 1,
	                seenCR: !1
	            }), u(Dt, Mt, l), Mt = l), Dt;
	        }
	        function e(n) {
	            Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n));
	        }
	        function o(n) {
	            var l = 0;
	            for (n.sort(); l < n.length; ) n[l - 1] === n[l] ? n.splice(l, 1) : l++;
	        }
	        function c() {
	            var l, u, t, r, o;
	            return l = qt, u = i(), null !== u ? (t = qt, 124 === n.charCodeAt(qt) ? (r = fl, 
	            qt++) : (r = null, 0 === Wt && e(sl)), null !== r ? (o = c(), null !== o ? (r = [ r, o ], 
	            t = r) : (qt = t, t = il)) : (qt = t, t = il), null === t && (t = al), null !== t ? (Lt = l, 
	            u = hl(u, t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l, 
	            l = il), l;
	        }
	        function i() {
	            var n, l, u, t, r;
	            if (n = qt, l = f(), null === l && (l = al), null !== l) if (u = qt, Wt++, t = d(), 
	            Wt--, null === t ? u = al : (qt = u, u = il), null !== u) {
	                for (t = [], r = h(), null === r && (r = a()); null !== r; ) t.push(r), r = h(), 
	                null === r && (r = a());
	                null !== t ? (r = s(), null === r && (r = al), null !== r ? (Lt = n, l = dl(l, t, r), 
	                null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il);
	            } else qt = n, n = il; else qt = n, n = il;
	            return n;
	        }
	        function a() {
	            var n;
	            return n = x(), null === n && (n = Q(), null === n && (n = B())), n;
	        }
	        function f() {
	            var l, u;
	            return l = qt, 94 === n.charCodeAt(qt) ? (u = pl, qt++) : (u = null, 0 === Wt && e(vl)), 
	            null !== u && (Lt = l, u = wl()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function s() {
	            var l, u;
	            return l = qt, 36 === n.charCodeAt(qt) ? (u = Al, qt++) : (u = null, 0 === Wt && e(Cl)), 
	            null !== u && (Lt = l, u = gl()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function h() {
	            var n, l, u;
	            return n = qt, l = a(), null !== l ? (u = d(), null !== u ? (Lt = n, l = bl(l, u), 
	            null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n;
	        }
	        function d() {
	            var n, l, u;
	            return Wt++, n = qt, l = p(), null !== l ? (u = k(), null === u && (u = al), null !== u ? (Lt = n, 
	            l = Tl(l, u), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, 
	            n = il), Wt--, null === n && (l = null, 0 === Wt && e(kl)), n;
	        }
	        function p() {
	            var n;
	            return n = v(), null === n && (n = w(), null === n && (n = A(), null === n && (n = C(), 
	            null === n && (n = g(), null === n && (n = b()))))), n;
	        }
	        function v() {
	            var l, u, t, r, o, c;
	            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), 
	            null !== u ? (t = T(), null !== t ? (44 === n.charCodeAt(qt) ? (r = ml, qt++) : (r = null, 
	            0 === Wt && e(Rl)), null !== r ? (o = T(), null !== o ? (125 === n.charCodeAt(qt) ? (c = Fl, 
	            qt++) : (c = null, 0 === Wt && e(Ql)), null !== c ? (Lt = l, u = Sl(t, o), null === u ? (qt = l, 
	            l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, 
	            l = il)) : (qt = l, l = il), l;
	        }
	        function w() {
	            var l, u, t, r;
	            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), 
	            null !== u ? (t = T(), null !== t ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null, 
	            0 === Wt && e(El)), null !== r ? (Lt = l, u = Gl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
	        }
	        function A() {
	            var l, u, t, r;
	            return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)), 
	            null !== u ? (t = T(), null !== t ? (125 === n.charCodeAt(qt) ? (r = Fl, qt++) : (r = null, 
	            0 === Wt && e(Ql)), null !== r ? (Lt = l, u = Bl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
	        }
	        function C() {
	            var l, u;
	            return l = qt, 43 === n.charCodeAt(qt) ? (u = jl, qt++) : (u = null, 0 === Wt && e($l)), 
	            null !== u && (Lt = l, u = ql()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function g() {
	            var l, u;
	            return l = qt, 42 === n.charCodeAt(qt) ? (u = Ll, qt++) : (u = null, 0 === Wt && e(Ml)), 
	            null !== u && (Lt = l, u = Dl()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function b() {
	            var l, u;
	            return l = qt, 63 === n.charCodeAt(qt) ? (u = Hl, qt++) : (u = null, 0 === Wt && e(Ol)), 
	            null !== u && (Lt = l, u = Wl()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function k() {
	            var l;
	            return 63 === n.charCodeAt(qt) ? (l = Hl, qt++) : (l = null, 0 === Wt && e(Ol)), 
	            l;
	        }
	        function T() {
	            var l, u, t;
	            if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 
	            0 === Wt && e(Il)), null !== t) for (;null !== t; ) u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt), 
	            qt++) : (t = null, 0 === Wt && e(Il)); else u = il;
	            return null !== u && (Lt = l, u = Jl(u)), null === u ? (qt = l, l = u) : l = u, 
	            l;
	        }
	        function x() {
	            var l, u, t, r;
	            return l = qt, 40 === n.charCodeAt(qt) ? (u = Kl, qt++) : (u = null, 0 === Wt && e(Nl)), 
	            null !== u ? (t = R(), null === t && (t = F(), null === t && (t = m(), null === t && (t = y()))), 
	            null !== t ? (41 === n.charCodeAt(qt) ? (r = Pl, qt++) : (r = null, 0 === Wt && e(Vl)), 
	            null !== r ? (Lt = l, u = Xl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
	        }
	        function y() {
	            var n, l;
	            return n = qt, l = c(), null !== l && (Lt = n, l = Yl(l)), null === l ? (qt = n, 
	            n = l) : n = l, n;
	        }
	        function m() {
	            var l, u, t;
	            return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, 0 === Wt && e(_l)), 
	            null !== u ? (t = c(), null !== t ? (Lt = l, u = nu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il), l;
	        }
	        function R() {
	            var l, u, t;
	            return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, 0 === Wt && e(uu)), 
	            null !== u ? (t = c(), null !== t ? (Lt = l, u = tu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il), l;
	        }
	        function F() {
	            var l, u, t;
	            return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, 0 === Wt && e(eu)), 
	            null !== u ? (t = c(), null !== t ? (Lt = l, u = ou(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il), l;
	        }
	        function Q() {
	            var l, u, t, r, o;
	            if (Wt++, l = qt, 91 === n.charCodeAt(qt) ? (u = iu, qt++) : (u = null, 0 === Wt && e(au)), 
	            null !== u) if (94 === n.charCodeAt(qt) ? (t = pl, qt++) : (t = null, 0 === Wt && e(vl)), 
	            null === t && (t = al), null !== t) {
	                for (r = [], o = S(), null === o && (o = U()); null !== o; ) r.push(o), o = S(), 
	                null === o && (o = U());
	                null !== r ? (93 === n.charCodeAt(qt) ? (o = fu, qt++) : (o = null, 0 === Wt && e(su)), 
	                null !== o ? (Lt = l, u = hu(t, r), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	                l = il)) : (qt = l, l = il);
	            } else qt = l, l = il; else qt = l, l = il;
	            return Wt--, null === l && (u = null, 0 === Wt && e(cu)), l;
	        }
	        function S() {
	            var l, u, t, r;
	            return Wt++, l = qt, u = U(), null !== u ? (45 === n.charCodeAt(qt) ? (t = pu, qt++) : (t = null, 
	            0 === Wt && e(vu)), null !== t ? (r = U(), null !== r ? (Lt = l, u = wu(u, r), null === u ? (qt = l, 
	            l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--, 
	            null === l && (u = null, 0 === Wt && e(du)), l;
	        }
	        function U() {
	            var n, l;
	            return Wt++, n = G(), null === n && (n = E()), Wt--, null === n && (l = null, 0 === Wt && e(Au)), 
	            n;
	        }
	        function E() {
	            var l, u;
	            return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 0 === Wt && e(gu)), 
	            null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function G() {
	            var n;
	            return n = L(), null === n && (n = Y(), null === n && (n = H(), null === n && (n = O(), 
	            null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(), 
	            null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(), 
	            null === n && (n = X(), null === n && (n = _(), null === n && (n = nl(), null === n && (n = ll(), 
	            null === n && (n = ul(), null === n && (n = tl()))))))))))))))))), n;
	        }
	        function B() {
	            var n;
	            return n = j(), null === n && (n = q(), null === n && (n = $())), n;
	        }
	        function j() {
	            var l, u;
	            return l = qt, 46 === n.charCodeAt(qt) ? (u = ku, qt++) : (u = null, 0 === Wt && e(Tu)), 
	            null !== u && (Lt = l, u = xu()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function $() {
	            var l, u;
	            return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 
	            0 === Wt && e(Ru)), null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, 
	            Wt--, null === l && (u = null, 0 === Wt && e(yu)), l;
	        }
	        function q() {
	            var n;
	            return n = M(), null === n && (n = D(), null === n && (n = Y(), null === n && (n = H(), 
	            null === n && (n = O(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), 
	            null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), 
	            null === n && (n = V(), null === n && (n = X(), null === n && (n = Z(), null === n && (n = _(), 
	            null === n && (n = nl(), null === n && (n = ll(), null === n && (n = ul(), null === n && (n = tl()))))))))))))))))))), 
	            n;
	        }
	        function L() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)), 
	            null !== u && (Lt = l, u = Su()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function M() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)), 
	            null !== u && (Lt = l, u = Uu()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function D() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, 0 === Wt && e(Gu)), 
	            null !== u && (Lt = l, u = Bu()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function H() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, 0 === Wt && e($u)), 
	            null !== u && (Lt = l, u = qu()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function O() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, 0 === Wt && e(Mu)), 
	            null !== u && (Lt = l, u = Du()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function W() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, 0 === Wt && e(Ou)), 
	            null !== u && (Lt = l, u = Wu()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function z() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, 0 === Wt && e(Iu)), 
	            null !== u && (Lt = l, u = Ju()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function I() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, 0 === Wt && e(Nu)), 
	            null !== u && (Lt = l, u = Pu()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function J() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, 0 === Wt && e(Xu)), 
	            null !== u && (Lt = l, u = Yu()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function K() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, 0 === Wt && e(_u)), 
	            null !== u && (Lt = l, u = nt()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function N() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, 0 === Wt && e(ut)), 
	            null !== u && (Lt = l, u = tt()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function P() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, 0 === Wt && e(et)), 
	            null !== u && (Lt = l, u = ot()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function V() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, 0 === Wt && e(it)), 
	            null !== u && (Lt = l, u = at()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function X() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, 0 === Wt && e(st)), 
	            null !== u && (Lt = l, u = ht()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function Y() {
	            var l, u, t;
	            return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, 0 === Wt && e(pt)), 
	            null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)), 
	            null !== t ? (Lt = l, u = wt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il), l;
	        }
	        function Z() {
	            var l, u, t;
	            return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)), 
	            null !== u ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(bt)), 
	            null !== t ? (Lt = l, u = kt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il), l;
	        }
	        function _() {
	            var l, u, t, r;
	            if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)), 
	            null !== u) {
	                if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(mt)), 
	                null !== r) for (;null !== r; ) t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt), 
	                qt++) : (r = null, 0 === Wt && e(mt)); else t = il;
	                null !== t ? (Lt = l, u = Rt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	                l = il);
	            } else qt = l, l = il;
	            return l;
	        }
	        function nl() {
	            var l, u, t, r;
	            if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, 0 === Wt && e(Qt)), 
	            null !== u) {
	                if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)), 
	                null !== r) for (;null !== r; ) t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt), 
	                qt++) : (r = null, 0 === Wt && e(Ut)); else t = il;
	                null !== t ? (Lt = l, u = Et(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	                l = il);
	            } else qt = l, l = il;
	            return l;
	        }
	        function ll() {
	            var l, u, t, r;
	            if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, 0 === Wt && e(Bt)), 
	            null !== u) {
	                if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)), 
	                null !== r) for (;null !== r; ) t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt), 
	                qt++) : (r = null, 0 === Wt && e(Ut)); else t = il;
	                null !== t ? (Lt = l, u = jt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	                l = il);
	            } else qt = l, l = il;
	            return l;
	        }
	        function ul() {
	            var l, u;
	            return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)), 
	            null !== u && (Lt = l, u = $t()), null === u ? (qt = l, l = u) : l = u, l;
	        }
	        function tl() {
	            var l, u, t;
	            return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)), 
	            null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)), 
	            null !== t ? (Lt = l, u = bu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l, 
	            l = il)) : (qt = l, l = il), l;
	        }
	        var rl, el = arguments.length > 1 ? arguments[1] : {}, ol = {
	            regexp: c
	        }, cl = c, il = null, al = "", fl = "|", sl = '"|"', hl = function(n, l) {
	            return l ? new Alternate(n, l[1]) : n;
	        }, dl = function(n, l, u) {
	            return new Match([ n ].concat(l).concat([ u ]));
	        }, pl = "^", vl = '"^"', wl = function() {
	            return new Token("start");
	        }, Al = "$", Cl = '"$"', gl = function() {
	            return new Token("end");
	        }, bl = function(n, l) {
	            return new Quantified(n, l);
	        }, kl = "Quantifier", Tl = function(n, l) {
	            return l && (n.greedy = !1), n;
	        }, xl = "{", yl = '"{"', ml = ",", Rl = '","', Fl = "}", Ql = '"}"', Sl = function(n, l) {
	            return new Quantifier(n, l);
	        }, Ul = ",}", El = '",}"', Gl = function(n) {
	            return new Quantifier(n, 1/0);
	        }, Bl = function(n) {
	            return new Quantifier(n, n);
	        }, jl = "+", $l = '"+"', ql = function() {
	            return new Quantifier(1, 1/0);
	        }, Ll = "*", Ml = '"*"', Dl = function() {
	            return new Quantifier(0, 1/0);
	        }, Hl = "?", Ol = '"?"', Wl = function() {
	            return new Quantifier(0, 1);
	        }, zl = /^[0-9]/, Il = "[0-9]", Jl = function(n) {
	            return +n.join("");
	        }, Kl = "(", Nl = '"("', Pl = ")", Vl = '")"', Xl = function(n) {
	            return n;
	        }, Yl = function(n) {
	            return new CaptureGroup(n);
	        }, Zl = "?:", _l = '"?:"', nu = function(n) {
	            return new Group("non-capture-group", n);
	        }, lu = "?=", uu = '"?="', tu = function(n) {
	            return new Group("positive-lookahead", n);
	        }, ru = "?!", eu = '"?!"', ou = function(n) {
	            return new Group("negative-lookahead", n);
	        }, cu = "CharacterSet", iu = "[", au = '"["', fu = "]", su = '"]"', hu = function(n, l) {
	            return new CharSet(!!n, l);
	        }, du = "CharacterRange", pu = "-", vu = '"-"', wu = function(n, l) {
	            return new CharacterRange(n, l);
	        }, Au = "Character", Cu = /^[^\\\]]/, gu = "[^\\\\\\]]", bu = function(n) {
	            return new Literal(n);
	        }, ku = ".", Tu = '"."', xu = function() {
	            return new Token("any-character");
	        }, yu = "Literal", mu = /^[^|\\\/.[()?+*$\^]/, Ru = "[^|\\\\\\/.[()?+*$\\^]", Fu = "\\b", Qu = '"\\\\b"', Su = function() {
	            return new Token("backspace");
	        }, Uu = function() {
	            return new Token("word-boundary");
	        }, Eu = "\\B", Gu = '"\\\\B"', Bu = function() {
	            return new Token("non-word-boundary");
	        }, ju = "\\d", $u = '"\\\\d"', qu = function() {
	            return new Token("digit");
	        }, Lu = "\\D", Mu = '"\\\\D"', Du = function() {
	            return new Token("non-digit");
	        }, Hu = "\\f", Ou = '"\\\\f"', Wu = function() {
	            return new Token("form-feed");
	        }, zu = "\\n", Iu = '"\\\\n"', Ju = function() {
	            return new Token("line-feed");
	        }, Ku = "\\r", Nu = '"\\\\r"', Pu = function() {
	            return new Token("carriage-return");
	        }, Vu = "\\s", Xu = '"\\\\s"', Yu = function() {
	            return new Token("white-space");
	        }, Zu = "\\S", _u = '"\\\\S"', nt = function() {
	            return new Token("non-white-space");
	        }, lt = "\\t", ut = '"\\\\t"', tt = function() {
	            return new Token("tab");
	        }, rt = "\\v", et = '"\\\\v"', ot = function() {
	            return new Token("vertical-tab");
	        }, ct = "\\w", it = '"\\\\w"', at = function() {
	            return new Token("word");
	        }, ft = "\\W", st = '"\\\\W"', ht = function() {
	            return new Token("non-word");
	        }, dt = "\\c", pt = '"\\\\c"', vt = "any character", wt = function(n) {
	            return new ControlCharacter(n);
	        }, At = "\\", Ct = '"\\\\"', gt = /^[1-9]/, bt = "[1-9]", kt = function(n) {
	            return new BackReference(n);
	        }, Tt = "\\0", xt = '"\\\\0"', yt = /^[0-7]/, mt = "[0-7]", Rt = function(n) {
	            return new Octal(n.join(""));
	        }, Ft = "\\x", Qt = '"\\\\x"', St = /^[0-9a-fA-F]/, Ut = "[0-9a-fA-F]", Et = function(n) {
	            return new Hex(n.join(""));
	        }, Gt = "\\u", Bt = '"\\\\u"', jt = function(n) {
	            return new Unicode(n.join(""));
	        }, $t = function() {
	            return new Token("null-character");
	        }, qt = 0, Lt = 0, Mt = 0, Dt = {
	            line: 1,
	            column: 1,
	            seenCR: !1
	        }, Ht = 0, Ot = [], Wt = 0;
	        if ("startRule" in el) {
	            if (!(el.startRule in ol)) throw new Error("Can't start parsing from rule \"" + el.startRule + '".');
	            cl = ol[el.startRule];
	        }
	        if (Token.offset = t, Token.text = u, rl = cl(), null !== rl && qt === n.length) return rl;
	        throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
	    }
	    return n(l, Error), {
	        SyntaxError: l,
	        parse: u
	    };
	}(), index = 1, cgs = {};

	module.exports = parser

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## RegExp Handler

	    https://github.com/ForbesLindesay/regexp
	    https://github.com/dmajda/pegjs
	    http://www.regexper.com/

	    每个节点的结构
	        {
	            type: '',
	            offset: number,
	            text: '',
	            body: {},
	            escaped: true/false
	        }

	    type 可选值
	        alternate             |         选择
	        match                 匹配
	        capture-group         ()        捕获组
	        non-capture-group     (?:...)   非捕获组
	        positive-lookahead    (?=p)     零宽正向先行断言
	        negative-lookahead    (?!p)     零宽负向先行断言
	        quantified            a*        重复节点
	        quantifier            *         量词
	        charset               []        字符集
	        range                 {m, n}    范围
	        literal               a         直接量字符
	        unicode               \uxxxx    Unicode
	        hex                   \x        十六进制
	        octal                 八进制
	        back-reference        \n        反向引用
	        control-character     \cX       控制字符

	        // Token
	        start               ^       开头
	        end                 $       结尾
	        any-character       .       任意字符
	        backspace           [\b]    退格直接量
	        word-boundary       \b      单词边界
	        non-word-boundary   \B      非单词边界
	        digit               \d      ASCII 数字，[0-9]
	        non-digit           \D      非 ASCII 数字，[^0-9]
	        form-feed           \f      换页符
	        line-feed           \n      换行符
	        carriage-return     \r      回车符
	        white-space         \s      空白符
	        non-white-space     \S      非空白符
	        tab                 \t      制表符
	        vertical-tab        \v      垂直制表符
	        word                \w      ASCII 字符，[a-zA-Z0-9]
	        non-word            \W      非 ASCII 字符，[^a-zA-Z0-9]
	        null-character      \o      NUL 字符
	 */

	var Util = __webpack_require__(3)
	var Random = __webpack_require__(5)
	    /*
	        
	    */
	var Handler = {
	    extend: Util.extend
	}

	// http://en.wikipedia.org/wiki/ASCII#ASCII_printable_code_chart
	/*var ASCII_CONTROL_CODE_CHART = {
	    '@': ['\u0000'],
	    A: ['\u0001'],
	    B: ['\u0002'],
	    C: ['\u0003'],
	    D: ['\u0004'],
	    E: ['\u0005'],
	    F: ['\u0006'],
	    G: ['\u0007', '\a'],
	    H: ['\u0008', '\b'],
	    I: ['\u0009', '\t'],
	    J: ['\u000A', '\n'],
	    K: ['\u000B', '\v'],
	    L: ['\u000C', '\f'],
	    M: ['\u000D', '\r'],
	    N: ['\u000E'],
	    O: ['\u000F'],
	    P: ['\u0010'],
	    Q: ['\u0011'],
	    R: ['\u0012'],
	    S: ['\u0013'],
	    T: ['\u0014'],
	    U: ['\u0015'],
	    V: ['\u0016'],
	    W: ['\u0017'],
	    X: ['\u0018'],
	    Y: ['\u0019'],
	    Z: ['\u001A'],
	    '[': ['\u001B', '\e'],
	    '\\': ['\u001C'],
	    ']': ['\u001D'],
	    '^': ['\u001E'],
	    '_': ['\u001F']
	}*/

	// ASCII printable code chart
	// var LOWER = 'abcdefghijklmnopqrstuvwxyz'
	// var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	// var NUMBER = '0123456789'
	// var SYMBOL = ' !"#$%&\'()*+,-./' + ':;<=>?@' + '[\\]^_`' + '{|}~'
	var LOWER = ascii(97, 122)
	var UPPER = ascii(65, 90)
	var NUMBER = ascii(48, 57)
	var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126) // 排除 95 _ ascii(91, 94) + ascii(96, 96)
	var PRINTABLE = ascii(32, 126)
	var SPACE = ' \f\n\r\t\v\u00A0\u2028\u2029'
	var CHARACTER_CLASSES = {
	    '\\w': LOWER + UPPER + NUMBER + '_', // ascii(95, 95)
	    '\\W': OTHER.replace('_', ''),
	    '\\s': SPACE,
	    '\\S': function() {
	        var result = PRINTABLE
	        for (var i = 0; i < SPACE.length; i++) {
	            result = result.replace(SPACE[i], '')
	        }
	        return result
	    }(),
	    '\\d': NUMBER,
	    '\\D': LOWER + UPPER + OTHER
	}

	function ascii(from, to) {
	    var result = ''
	    for (var i = from; i <= to; i++) {
	        result += String.fromCharCode(i)
	    }
	    return result
	}

	// var ast = RegExpParser.parse(regexp.source)
	Handler.gen = function(node, result, cache) {
	    cache = cache || {
	        guid: 1
	    }
	    return Handler[node.type] ? Handler[node.type](node, result, cache) :
	        Handler.token(node, result, cache)
	}

	Handler.extend({
	    /* jshint unused:false */
	    token: function(node, result, cache) {
	        switch (node.type) {
	            case 'start':
	            case 'end':
	                return ''
	            case 'any-character':
	                return Random.character()
	            case 'backspace':
	                return ''
	            case 'word-boundary': // TODO
	                return ''
	            case 'non-word-boundary': // TODO
	                break
	            case 'digit':
	                return Random.pick(
	                    NUMBER.split('')
	                )
	            case 'non-digit':
	                return Random.pick(
	                    (LOWER + UPPER + OTHER).split('')
	                )
	            case 'form-feed':
	                break
	            case 'line-feed':
	                return node.body || node.text
	            case 'carriage-return':
	                break
	            case 'white-space':
	                return Random.pick(
	                    SPACE.split('')
	                )
	            case 'non-white-space':
	                return Random.pick(
	                    (LOWER + UPPER + NUMBER).split('')
	                )
	            case 'tab':
	                break
	            case 'vertical-tab':
	                break
	            case 'word': // \w [a-zA-Z0-9]
	                return Random.pick(
	                    (LOWER + UPPER + NUMBER).split('')
	                )
	            case 'non-word': // \W [^a-zA-Z0-9]
	                return Random.pick(
	                    OTHER.replace('_', '').split('')
	                )
	            case 'null-character':
	                break
	        }
	        return node.body || node.text
	    },
	    /*
	        {
	            type: 'alternate',
	            offset: 0,
	            text: '',
	            left: {
	                boyd: []
	            },
	            right: {
	                boyd: []
	            }
	        }
	    */
	    alternate: function(node, result, cache) {
	        // node.left/right {}
	        return this.gen(
	            Random.boolean() ? node.left : node.right,
	            result,
	            cache
	        )
	    },
	    /*
	        {
	            type: 'match',
	            offset: 0,
	            text: '',
	            body: []
	        }
	    */
	    match: function(node, result, cache) {
	        result = ''
	            // node.body []
	        for (var i = 0; i < node.body.length; i++) {
	            result += this.gen(node.body[i], result, cache)
	        }
	        return result
	    },
	    // ()
	    'capture-group': function(node, result, cache) {
	        // node.body {}
	        result = this.gen(node.body, result, cache)
	        cache[cache.guid++] = result
	        return result
	    },
	    // (?:...)
	    'non-capture-group': function(node, result, cache) {
	        // node.body {}
	        return this.gen(node.body, result, cache)
	    },
	    // (?=p)
	    'positive-lookahead': function(node, result, cache) {
	        // node.body
	        return this.gen(node.body, result, cache)
	    },
	    // (?!p)
	    'negative-lookahead': function(node, result, cache) {
	        // node.body
	        return ''
	    },
	    /*
	        {
	            type: 'quantified',
	            offset: 3,
	            text: 'c*',
	            body: {
	                type: 'literal',
	                offset: 3,
	                text: 'c',
	                body: 'c',
	                escaped: false
	            },
	            quantifier: {
	                type: 'quantifier',
	                offset: 4,
	                text: '*',
	                min: 0,
	                max: Infinity,
	                greedy: true
	            }
	        }
	    */
	    quantified: function(node, result, cache) {
	        result = ''
	            // node.quantifier {}
	        var count = this.quantifier(node.quantifier);
	        // node.body {}
	        for (var i = 0; i < count; i++) {
	            result += this.gen(node.body, result, cache)
	        }
	        return result
	    },
	    /*
	        quantifier: {
	            type: 'quantifier',
	            offset: 4,
	            text: '*',
	            min: 0,
	            max: Infinity,
	            greedy: true
	        }
	    */
	    quantifier: function(node, result, cache) {
	        var min = Math.max(node.min, 0)
	        var max = isFinite(node.max) ? node.max :
	            min + Random.integer(3, 7)
	        return Random.integer(min, max)
	    },
	    /*
	        
	    */
	    charset: function(node, result, cache) {
	        // node.invert
	        if (node.invert) return this['invert-charset'](node, result, cache)

	        // node.body []
	        var literal = Random.pick(node.body)
	        return this.gen(literal, result, cache)
	    },
	    'invert-charset': function(node, result, cache) {
	        var pool = PRINTABLE
	        for (var i = 0, item; i < node.body.length; i++) {
	            item = node.body[i]
	            switch (item.type) {
	                case 'literal':
	                    pool = pool.replace(item.body, '')
	                    break
	                case 'range':
	                    var min = this.gen(item.start, result, cache).charCodeAt()
	                    var max = this.gen(item.end, result, cache).charCodeAt()
	                    for (var ii = min; ii <= max; ii++) {
	                        pool = pool.replace(String.fromCharCode(ii), '')
	                    }
	                    /* falls through */
	                default:
	                    var characters = CHARACTER_CLASSES[item.text]
	                    if (characters) {
	                        for (var iii = 0; iii <= characters.length; iii++) {
	                            pool = pool.replace(characters[iii], '')
	                        }
	                    }
	            }
	        }
	        return Random.pick(pool.split(''))
	    },
	    range: function(node, result, cache) {
	        // node.start, node.end
	        var min = this.gen(node.start, result, cache).charCodeAt()
	        var max = this.gen(node.end, result, cache).charCodeAt()
	        return String.fromCharCode(
	            Random.integer(min, max)
	        )
	    },
	    literal: function(node, result, cache) {
	        return node.escaped ? node.body : node.text
	    },
	    // Unicode \u
	    unicode: function(node, result, cache) {
	        return String.fromCharCode(
	            parseInt(node.code, 16)
	        )
	    },
	    // 十六进制 \xFF
	    hex: function(node, result, cache) {
	        return String.fromCharCode(
	            parseInt(node.code, 16)
	        )
	    },
	    // 八进制 \0
	    octal: function(node, result, cache) {
	        return String.fromCharCode(
	            parseInt(node.code, 8)
	        )
	    },
	    // 反向引用
	    'back-reference': function(node, result, cache) {
	        return cache[node.code] || ''
	    },
	    /*
	        http://en.wikipedia.org/wiki/C0_and_C1_control_codes
	    */
	    CONTROL_CHARACTER_MAP: function() {
	        var CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ')
	        var CONTROL_CHARACTER_UNICODE = '\u0000 \u0001 \u0002 \u0003 \u0004 \u0005 \u0006 \u0007 \u0008 \u0009 \u000A \u000B \u000C \u000D \u000E \u000F \u0010 \u0011 \u0012 \u0013 \u0014 \u0015 \u0016 \u0017 \u0018 \u0019 \u001A \u001B \u001C \u001D \u001E \u001F'.split(' ')
	        var map = {}
	        for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
	            map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i]
	        }
	        return map
	    }(),
	    'control-character': function(node, result, cache) {
	        return this.CONTROL_CHARACTER_MAP[node.code]
	    }
	})

	module.exports = Handler

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24)

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## toJSONSchema

	    把 Mock.js 风格的数据模板转换成 JSON Schema。

	    > [JSON Schema](http://json-schema.org/)
	 */
	var Constant = __webpack_require__(2)
	var Util = __webpack_require__(3)
	var Parser = __webpack_require__(4)

	function toJSONSchema(template, name, path /* Internal Use Only */ ) {
	    // type rule properties items
	    path = path || []
	    var result = {
	        name: typeof name === 'string' ? name.replace(Constant.RE_KEY, '$1') : name,
	        template: template,
	        type: Util.type(template), // 可能不准确，例如 { 'name|1': [{}, {} ...] }
	        rule: Parser.parse(name)
	    }
	    result.path = path.slice(0)
	    result.path.push(name === undefined ? 'ROOT' : result.name)

	    switch (result.type) {
	        case 'array':
	            result.items = []
	            Util.each(template, function(value, index) {
	                result.items.push(
	                    toJSONSchema(value, index, result.path)
	                )
	            })
	            break
	        case 'object':
	            result.properties = []
	            Util.each(template, function(value, name) {
	                result.properties.push(
	                    toJSONSchema(value, name, result.path)
	                )
	            })
	            break
	    }

	    return result

	}

	module.exports = toJSONSchema


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26)

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    ## valid(template, data)

	    校验真实数据 data 是否与数据模板 template 匹配。
	    
	    实现思路：
	    1. 解析规则。
	        先把数据模板 template 解析为更方便机器解析的 JSON-Schame
	        name               属性名 
	        type               属性值类型
	        template           属性值模板
	        properties         对象属性数组
	        items              数组元素数组
	        rule               属性值生成规则
	    2. 递归验证规则。
	        然后用 JSON-Schema 校验真实数据，校验项包括属性名、值类型、值、值生成规则。

	    提示信息 
	    https://github.com/fge/json-schema-validator/blob/master/src/main/resources/com/github/fge/jsonschema/validator/validation.properties
	    [JSON-Schama validator](http://json-schema-validator.herokuapp.com/)
	    [Regexp Demo](http://demos.forbeslindesay.co.uk/regexp/)
	*/
	var Constant = __webpack_require__(2)
	var Util = __webpack_require__(3)
	var toJSONSchema = __webpack_require__(23)

	function valid(template, data) {
	    var schema = toJSONSchema(template)
	    var result = Diff.diff(schema, data)
	    for (var i = 0; i < result.length; i++) {
	        // console.log(template, data)
	        // console.warn(Assert.message(result[i]))
	    }
	    return result
	}

	/*
	    ## name
	        有生成规则：比较解析后的 name
	        无生成规则：直接比较
	    ## type
	        无类型转换：直接比较
	        有类型转换：先试着解析 template，然后再检查？
	    ## value vs. template
	        基本类型
	            无生成规则：直接比较
	            有生成规则：
	                number
	                    min-max.dmin-dmax
	                    min-max.dcount
	                    count.dmin-dmax
	                    count.dcount
	                    +step
	                    整数部分
	                    小数部分
	                boolean 
	                string  
	                    min-max
	                    count
	    ## properties
	        对象
	            有生成规则：检测期望的属性个数，继续递归
	            无生成规则：检测全部的属性个数，继续递归
	    ## items
	        数组
	            有生成规则：
	                `'name|1': [{}, {} ...]`            其中之一，继续递归
	                `'name|+1': [{}, {} ...]`           顺序检测，继续递归
	                `'name|min-max': [{}, {} ...]`      检测个数，继续递归
	                `'name|count': [{}, {} ...]`        检测个数，继续递归
	            无生成规则：检测全部的元素个数，继续递归
	*/
	var Diff = {
	    diff: function diff(schema, data, name /* Internal Use Only */ ) {
	        var result = []

	        // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测
	        if (
	            this.name(schema, data, name, result) &&
	            this.type(schema, data, name, result)
	        ) {
	            this.value(schema, data, name, result)
	            this.properties(schema, data, name, result)
	            this.items(schema, data, name, result)
	        }

	        return result
	    },
	    /* jshint unused:false */
	    name: function(schema, data, name, result) {
	        var length = result.length

	        Assert.equal('name', schema.path, name + '', schema.name + '', result)

	        return result.length === length
	    },
	    type: function(schema, data, name, result) {
	        var length = result.length

	        switch (schema.type) {
	            case 'string':
	                // 跳过含有『占位符』的属性值，因为『占位符』返回值的类型可能和模板不一致，例如 '@int' 会返回一个整形值
	                if (schema.template.match(Constant.RE_PLACEHOLDER)) return true
	                break
	            case 'array':
	                if (schema.rule.parameters) {
	                    // name|count: array
	                    if (schema.rule.min !== undefined && schema.rule.max === undefined) {
	                        // 跳过 name|1: array，因为最终值的类型（很可能）不是数组，也不一定与 `array` 中的类型一致
	                        if (schema.rule.count === 1) return true
	                    }
	                    // 跳过 name|+inc: array
	                    if (schema.rule.parameters[2]) return true
	                }
	                break
	            case 'function':
	                // 跳过 `'name': function`，因为函数可以返回任何类型的值。
	                return true
	        }

	        Assert.equal('type', schema.path, Util.type(data), schema.type, result)

	        return result.length === length
	    },
	    value: function(schema, data, name, result) {
	        var length = result.length

	        var rule = schema.rule
	        var templateType = schema.type
	        if (templateType === 'object' || templateType === 'array' || templateType === 'function') return true

	        // 无生成规则
	        if (!rule.parameters) {
	            switch (templateType) {
	                case 'regexp':
	                    Assert.match('value', schema.path, data, schema.template, result)
	                    return result.length === length
	                case 'string':
	                    // 同样跳过含有『占位符』的属性值，因为『占位符』的返回值会通常会与模板不一致
	                    if (schema.template.match(Constant.RE_PLACEHOLDER)) return result.length === length
	                    break
	            }
	            Assert.equal('value', schema.path, data, schema.template, result)
	            return result.length === length
	        }

	        // 有生成规则
	        var actualRepeatCount
	        switch (templateType) {
	            case 'number':
	                var parts = (data + '').split('.')
	                parts[0] = +parts[0]

	                // 整数部分
	                // |min-max
	                if (rule.min !== undefined && rule.max !== undefined) {
	                    Assert.greaterThanOrEqualTo('value', schema.path, parts[0], Math.min(rule.min, rule.max), result)
	                        // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
	                    Assert.lessThanOrEqualTo('value', schema.path, parts[0], Math.max(rule.min, rule.max), result)
	                }
	                // |count
	                if (rule.min !== undefined && rule.max === undefined) {
	                    Assert.equal('value', schema.path, parts[0], rule.min, result, '[value] ' + name)
	                }

	                // 小数部分
	                if (rule.decimal) {
	                    // |dmin-dmax
	                    if (rule.dmin !== undefined && rule.dmax !== undefined) {
	                        Assert.greaterThanOrEqualTo('value', schema.path, parts[1].length, rule.dmin, result)
	                        Assert.lessThanOrEqualTo('value', schema.path, parts[1].length, rule.dmax, result)
	                    }
	                    // |dcount
	                    if (rule.dmin !== undefined && rule.dmax === undefined) {
	                        Assert.equal('value', schema.path, parts[1].length, rule.dmin, result)
	                    }
	                }

	                break

	            case 'boolean':
	                break

	            case 'string':
	                // 'aaa'.match(/a/g)
	                actualRepeatCount = data.match(new RegExp(schema.template, 'g'))
	                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0

	                // |min-max
	                if (rule.min !== undefined && rule.max !== undefined) {
	                    Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result)
	                    Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result)
	                }
	                // |count
	                if (rule.min !== undefined && rule.max === undefined) {
	                    Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result)
	                }

	                break

	            case 'regexp':
	                actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'))
	                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0

	                // |min-max
	                if (rule.min !== undefined && rule.max !== undefined) {
	                    Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result)
	                    Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result)
	                }
	                // |count
	                if (rule.min !== undefined && rule.max === undefined) {
	                    Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result)
	                }
	                break
	        }

	        return result.length === length
	    },
	    properties: function(schema, data, name, result) {
	        var length = result.length

	        var rule = schema.rule
	        var keys = Util.keys(data)
	        if (!schema.properties) return

	        // 无生成规则
	        if (!schema.rule.parameters) {
	            Assert.equal('properties length', schema.path, keys.length, schema.properties.length, result)
	        } else {
	            // 有生成规则
	            // |min-max
	            if (rule.min !== undefined && rule.max !== undefined) {
	                Assert.greaterThanOrEqualTo('properties length', schema.path, keys.length, Math.min(rule.min, rule.max), result)
	                Assert.lessThanOrEqualTo('properties length', schema.path, keys.length, Math.max(rule.min, rule.max), result)
	            }
	            // |count
	            if (rule.min !== undefined && rule.max === undefined) {
	                // |1, |>1
	                if (rule.count !== 1) Assert.equal('properties length', schema.path, keys.length, rule.min, result)
	            }
	        }

	        if (result.length !== length) return false

	        for (var i = 0; i < keys.length; i++) {
	            result.push.apply(
	                result,
	                this.diff(
	                    function() {
	                        var property
	                        Util.each(schema.properties, function(item /*, index*/ ) {
	                            if (item.name === keys[i]) property = item
	                        })
	                        return property || schema.properties[i]
	                    }(),
	                    data[keys[i]],
	                    keys[i]
	                )
	            )
	        }

	        return result.length === length
	    },
	    items: function(schema, data, name, result) {
	        var length = result.length

	        if (!schema.items) return

	        var rule = schema.rule

	        // 无生成规则
	        if (!schema.rule.parameters) {
	            Assert.equal('items length', schema.path, data.length, schema.items.length, result)
	        } else {
	            // 有生成规则
	            // |min-max
	            if (rule.min !== undefined && rule.max !== undefined) {
	                Assert.greaterThanOrEqualTo('items', schema.path, data.length, (Math.min(rule.min, rule.max) * schema.items.length), result,
	                    '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements')
	                Assert.lessThanOrEqualTo('items', schema.path, data.length, (Math.max(rule.min, rule.max) * schema.items.length), result,
	                    '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements')
	            }
	            // |count
	            if (rule.min !== undefined && rule.max === undefined) {
	                // |1, |>1
	                if (rule.count === 1) return result.length === length
	                else Assert.equal('items length', schema.path, data.length, (rule.min * schema.items.length), result)
	            }
	            // |+inc
	            if (rule.parameters[2]) return result.length === length
	        }

	        if (result.length !== length) return false

	        for (var i = 0; i < data.length; i++) {
	            result.push.apply(
	                result,
	                this.diff(
	                    schema.items[i % schema.items.length],
	                    data[i],
	                    i % schema.items.length
	                )
	            )
	        }

	        return result.length === length
	    }
	}

	/*
	    完善、友好的提示信息
	    
	    Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
	    路径 验证类型 描述 

	    Expect path.name is less than or equal to expected, but path.name is actual.

	    Expect path.name is less than or equal to expected, but path.name is actual.
	    Expect path.name is greater than or equal to expected, but path.name is actual.

	*/
	var Assert = {
	    message: function(item) {
	        return (item.message ||
	                '[{utype}] Expect {path}\'{ltype} {action} {expected}, but is {actual}')
	            .replace('{utype}', item.type.toUpperCase())
	            .replace('{ltype}', item.type.toLowerCase())
	            .replace('{path}', Util.isArray(item.path) && item.path.join('.') || item.path)
	            .replace('{action}', item.action)
	            .replace('{expected}', item.expected)
	            .replace('{actual}', item.actual)
	    },
	    equal: function(type, path, actual, expected, result, message) {
	        if (actual === expected) return true
	        switch (type) {
	            case 'type':
	                // 正则模板 === 字符串最终值
	                if (expected === 'regexp' && actual === 'string') return true
	                break
	        }

	        var item = {
	            path: path,
	            type: type,
	            actual: actual,
	            expected: expected,
	            action: 'is equal to',
	            message: message
	        }
	        item.message = Assert.message(item)
	        result.push(item)
	        return false
	    },
	    // actual matches expected
	    match: function(type, path, actual, expected, result, message) {
	        if (expected.test(actual)) return true

	        var item = {
	            path: path,
	            type: type,
	            actual: actual,
	            expected: expected,
	            action: 'matches',
	            message: message
	        }
	        item.message = Assert.message(item)
	        result.push(item)
	        return false
	    },
	    notEqual: function(type, path, actual, expected, result, message) {
	        if (actual !== expected) return true
	        var item = {
	            path: path,
	            type: type,
	            actual: actual,
	            expected: expected,
	            action: 'is not equal to',
	            message: message
	        }
	        item.message = Assert.message(item)
	        result.push(item)
	        return false
	    },
	    greaterThan: function(type, path, actual, expected, result, message) {
	        if (actual > expected) return true
	        var item = {
	            path: path,
	            type: type,
	            actual: actual,
	            expected: expected,
	            action: 'is greater than',
	            message: message
	        }
	        item.message = Assert.message(item)
	        result.push(item)
	        return false
	    },
	    lessThan: function(type, path, actual, expected, result, message) {
	        if (actual < expected) return true
	        var item = {
	            path: path,
	            type: type,
	            actual: actual,
	            expected: expected,
	            action: 'is less to',
	            message: message
	        }
	        item.message = Assert.message(item)
	        result.push(item)
	        return false
	    },
	    greaterThanOrEqualTo: function(type, path, actual, expected, result, message) {
	        if (actual >= expected) return true
	        var item = {
	            path: path,
	            type: type,
	            actual: actual,
	            expected: expected,
	            action: 'is greater than or equal to',
	            message: message
	        }
	        item.message = Assert.message(item)
	        result.push(item)
	        return false
	    },
	    lessThanOrEqualTo: function(type, path, actual, expected, result, message) {
	        if (actual <= expected) return true
	        var item = {
	            path: path,
	            type: type,
	            actual: actual,
	            expected: expected,
	            action: 'is less than or equal to',
	            message: message
	        }
	        item.message = Assert.message(item)
	        result.push(item)
	        return false
	    }
	}

	valid.Diff = Diff
	valid.Assert = Assert

	module.exports = valid

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28)

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* global window, document, location, Event, setTimeout */
	/*
	    ## MockXMLHttpRequest

	    期望的功能：
	    1. 完整地覆盖原生 XHR 的行为
	    2. 完整地模拟原生 XHR 的行为
	    3. 在发起请求时，自动检测是否需要拦截
	    4. 如果不必拦截，则执行原生 XHR 的行为
	    5. 如果需要拦截，则执行虚拟 XHR 的行为
	    6. 兼容 XMLHttpRequest 和 ActiveXObject
	        new window.XMLHttpRequest()
	        new window.ActiveXObject("Microsoft.XMLHTTP")

	    关键方法的逻辑：
	    * new   此时尚无法确定是否需要拦截，所以创建原生 XHR 对象是必须的。
	    * open  此时可以取到 URL，可以决定是否进行拦截。
	    * send  此时已经确定了请求方式。

	    规范：
	    http://xhr.spec.whatwg.org/
	    http://www.w3.org/TR/XMLHttpRequest2/

	    参考实现：
	    https://github.com/philikon/MockHttpRequest/blob/master/lib/mock.js
	    https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js
	    https://github.com/ilinsky/xmlhttprequest/blob/master/XMLHttpRequest.js
	    https://github.com/firebug/firebug-lite/blob/master/content/lite/xhr.js
	    https://github.com/thx/RAP/blob/master/lab/rap.plugin.xinglie.js

	    **需不需要全面重写 XMLHttpRequest？**
	        http://xhr.spec.whatwg.org/#interface-xmlhttprequest
	        关键属性 readyState、status、statusText、response、responseText、responseXML 是 readonly，所以，试图通过修改这些状态，来模拟响应是不可行的。
	        因此，唯一的办法是模拟整个 XMLHttpRequest，就像 jQuery 对事件模型的封装。

	    // Event handlers
	    onloadstart         loadstart
	    onprogress          progress
	    onabort             abort
	    onerror             error
	    onload              load
	    ontimeout           timeout
	    onloadend           loadend
	    onreadystatechange  readystatechange
	 */

	var Util = __webpack_require__(3)

	// 备份原生 XMLHttpRequest
	window._XMLHttpRequest = window.XMLHttpRequest
	window._ActiveXObject = window.ActiveXObject

	/*
	    PhantomJS
	    TypeError: '[object EventConstructor]' is not a constructor (evaluating 'new Event("readystatechange")')

	    https://github.com/bluerail/twitter-bootstrap-rails-confirm/issues/18
	    https://github.com/ariya/phantomjs/issues/11289
	*/
	try {
	    new window.Event('custom')
	} catch (exception) {
	    window.Event = function(type, bubbles, cancelable, detail) {
	        var event = document.createEvent('CustomEvent') // MUST be 'CustomEvent'
	        event.initCustomEvent(type, bubbles, cancelable, detail)
	        return event
	    }
	}

	var XHR_STATES = {
	    // The object has been constructed.
	    UNSENT: 0,
	    // The open() method has been successfully invoked.
	    OPENED: 1,
	    // All redirects (if any) have been followed and all HTTP headers of the response have been received.
	    HEADERS_RECEIVED: 2,
	    // The response's body is being received.
	    LOADING: 3,
	    // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
	    DONE: 4
	}

	var XHR_EVENTS = 'readystatechange loadstart progress abort error load timeout loadend'.split(' ')
	var XHR_REQUEST_PROPERTIES = 'timeout withCredentials'.split(' ')
	var XHR_RESPONSE_PROPERTIES = 'readyState responseURL status statusText responseType response responseText responseXML'.split(' ')

	// https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js#L32
	var HTTP_STATUS_CODES = {
	    100: "Continue",
	    101: "Switching Protocols",
	    200: "OK",
	    201: "Created",
	    202: "Accepted",
	    203: "Non-Authoritative Information",
	    204: "No Content",
	    205: "Reset Content",
	    206: "Partial Content",
	    300: "Multiple Choice",
	    301: "Moved Permanently",
	    302: "Found",
	    303: "See Other",
	    304: "Not Modified",
	    305: "Use Proxy",
	    307: "Temporary Redirect",
	    400: "Bad Request",
	    401: "Unauthorized",
	    402: "Payment Required",
	    403: "Forbidden",
	    404: "Not Found",
	    405: "Method Not Allowed",
	    406: "Not Acceptable",
	    407: "Proxy Authentication Required",
	    408: "Request Timeout",
	    409: "Conflict",
	    410: "Gone",
	    411: "Length Required",
	    412: "Precondition Failed",
	    413: "Request Entity Too Large",
	    414: "Request-URI Too Long",
	    415: "Unsupported Media Type",
	    416: "Requested Range Not Satisfiable",
	    417: "Expectation Failed",
	    422: "Unprocessable Entity",
	    500: "Internal Server Error",
	    501: "Not Implemented",
	    502: "Bad Gateway",
	    503: "Service Unavailable",
	    504: "Gateway Timeout",
	    505: "HTTP Version Not Supported"
	}

	/*
	    MockXMLHttpRequest
	*/

	function MockXMLHttpRequest() {
	    // 初始化 custom 对象，用于存储自定义属性
	    this.custom = {
	        events: {},
	        requestHeaders: {},
	        responseHeaders: {}
	    }
	}

	MockXMLHttpRequest._settings = {
	    timeout: '10-100',
	    /*
	        timeout: 50,
	        timeout: '10-100',
	     */
	}

	MockXMLHttpRequest.setup = function(settings) {
	    Util.extend(MockXMLHttpRequest._settings, settings)
	    return MockXMLHttpRequest._settings
	}

	Util.extend(MockXMLHttpRequest, XHR_STATES)
	Util.extend(MockXMLHttpRequest.prototype, XHR_STATES)

	// 标记当前对象为 MockXMLHttpRequest
	MockXMLHttpRequest.prototype.mock = true

	// 是否拦截 Ajax 请求
	MockXMLHttpRequest.prototype.match = false

	// 初始化 Request 相关的属性和方法
	Util.extend(MockXMLHttpRequest.prototype, {
	    // https://xhr.spec.whatwg.org/#the-open()-method
	    // Sets the request method, request URL, and synchronous flag.
	    open: function(method, url, async, username, password) {
	        var that = this

	        Util.extend(this.custom, {
	            method: method,
	            url: url,
	            async: typeof async === 'boolean' ? async : true,
	            username: username,
	            password: password,
	            options: {
	                url: url,
	                type: method
	            }
	        })

	        this.custom.timeout = function(timeout) {
	            if (typeof timeout === 'number') return timeout
	            if (typeof timeout === 'string' && !~timeout.indexOf('-')) return parseInt(timeout, 10)
	            if (typeof timeout === 'string' && ~timeout.indexOf('-')) {
	                var tmp = timeout.split('-')
	                var min = parseInt(tmp[0], 10)
	                var max = parseInt(tmp[1], 10)
	                return Math.round(Math.random() * (max - min)) + min
	            }
	        }(MockXMLHttpRequest._settings.timeout)

	        // 查找与请求参数匹配的数据模板
	        var item = find(this.custom.options)

	        function handle(event) {
	            // 同步属性 NativeXMLHttpRequest => MockXMLHttpRequest
	            for (var i = 0; i < XHR_RESPONSE_PROPERTIES.length; i++) {
	                try {
	                    that[XHR_RESPONSE_PROPERTIES[i]] = xhr[XHR_RESPONSE_PROPERTIES[i]]
	                } catch (e) {}
	            }
	            // 触发 MockXMLHttpRequest 上的同名事件
	            that.dispatchEvent(new Event(event.type /*, false, false, that*/ ))
	        }

	        // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。
	        if (!item) {
	            // 创建原生 XHR 对象，调用原生 open()，监听所有原生事件
	            var xhr = createNativeXMLHttpRequest()
	            this.custom.xhr = xhr

	            // 初始化所有事件，用于监听原生 XHR 对象的事件
	            for (var i = 0; i < XHR_EVENTS.length; i++) {
	                xhr.addEventListener(XHR_EVENTS[i], handle)
	            }

	            // xhr.open()
	            if (username) xhr.open(method, url, async, username, password)
	            else xhr.open(method, url, async)

	            // 同步属性 MockXMLHttpRequest => NativeXMLHttpRequest
	            for (var j = 0; j < XHR_REQUEST_PROPERTIES.length; j++) {
	                try {
	                    xhr[XHR_REQUEST_PROPERTIES[j]] = that[XHR_REQUEST_PROPERTIES[j]]
	                } catch (e) {}
	            }

	            return
	        }

	        // 找到了匹配的数据模板，开始拦截 XHR 请求
	        this.match = true
	        this.custom.template = item
	        this.readyState = MockXMLHttpRequest.OPENED
	        this.dispatchEvent(new Event('readystatechange' /*, false, false, this*/ ))
	    },
	    // https://xhr.spec.whatwg.org/#the-setrequestheader()-method
	    // Combines a header in author request headers.
	    setRequestHeader: function(name, value) {
	        // 原生 XHR
	        if (!this.match) {
	            this.custom.xhr.setRequestHeader(name, value)
	            return
	        }

	        // 拦截 XHR
	        var requestHeaders = this.custom.requestHeaders
	        if (requestHeaders[name]) requestHeaders[name] += ',' + value
	        else requestHeaders[name] = value
	    },
	    timeout: 0,
	    withCredentials: false,
	    upload: {},
	    // https://xhr.spec.whatwg.org/#the-send()-method
	    // Initiates the request.
	    send: function send(data) {
	        var that = this
	        this.custom.options.body = data

	        // 原生 XHR
	        if (!this.match) {
	            this.custom.xhr.send(data)
	            return
	        }

	        // 拦截 XHR

	        // X-Requested-With header
	        this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest')

	        // loadstart The fetch initiates.
	        this.dispatchEvent(new Event('loadstart' /*, false, false, this*/ ))

	        if (this.custom.async) setTimeout(done, this.custom.timeout) // 异步
	        else done() // 同步

	        function done() {
	            that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED
	            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))
	            that.readyState = MockXMLHttpRequest.LOADING
	            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))

	            that.status = 200
	            that.statusText = HTTP_STATUS_CODES[200]

	            // fix #92 #93 by @qddegtya
	            that.response = that.responseText = JSON.stringify(
	                convert(that.custom.template, that.custom.options),
	                null, 4
	            )

	            that.readyState = MockXMLHttpRequest.DONE
	            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/ ))
	            that.dispatchEvent(new Event('load' /*, false, false, that*/ ));
	            that.dispatchEvent(new Event('loadend' /*, false, false, that*/ ));
	        }
	    },
	    // https://xhr.spec.whatwg.org/#the-abort()-method
	    // Cancels any network activity.
	    abort: function abort() {
	        // 原生 XHR
	        if (!this.match) {
	            this.custom.xhr.abort()
	            return
	        }

	        // 拦截 XHR
	        this.readyState = MockXMLHttpRequest.UNSENT
	        this.dispatchEvent(new Event('abort', false, false, this))
	        this.dispatchEvent(new Event('error', false, false, this))
	    }
	})

	// 初始化 Response 相关的属性和方法
	Util.extend(MockXMLHttpRequest.prototype, {
	    responseURL: '',
	    status: MockXMLHttpRequest.UNSENT,
	    statusText: '',
	    // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
	    getResponseHeader: function(name) {
	        // 原生 XHR
	        if (!this.match) {
	            return this.custom.xhr.getResponseHeader(name)
	        }

	        // 拦截 XHR
	        return this.custom.responseHeaders[name.toLowerCase()]
	    },
	    // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
	    // http://www.utf8-chartable.de/
	    getAllResponseHeaders: function() {
	        // 原生 XHR
	        if (!this.match) {
	            return this.custom.xhr.getAllResponseHeaders()
	        }

	        // 拦截 XHR
	        var responseHeaders = this.custom.responseHeaders
	        var headers = ''
	        for (var h in responseHeaders) {
	            if (!responseHeaders.hasOwnProperty(h)) continue
	            headers += h + ': ' + responseHeaders[h] + '\r\n'
	        }
	        return headers
	    },
	    overrideMimeType: function( /*mime*/ ) {},
	    responseType: '', // '', 'text', 'arraybuffer', 'blob', 'document', 'json'
	    response: null,
	    responseText: '',
	    responseXML: null
	})

	// EventTarget
	Util.extend(MockXMLHttpRequest.prototype, {
	    addEventListener: function addEventListener(type, handle) {
	        var events = this.custom.events
	        if (!events[type]) events[type] = []
	        events[type].push(handle)
	    },
	    removeEventListener: function removeEventListener(type, handle) {
	        var handles = this.custom.events[type] || []
	        for (var i = 0; i < handles.length; i++) {
	            if (handles[i] === handle) {
	                handles.splice(i--, 1)
	            }
	        }
	    },
	    dispatchEvent: function dispatchEvent(event) {
	        var handles = this.custom.events[event.type] || []
	        for (var i = 0; i < handles.length; i++) {
	            handles[i].call(this, event)
	        }

	        var ontype = 'on' + event.type
	        if (this[ontype]) this[ontype](event)
	    }
	})

	// Inspired by jQuery
	function createNativeXMLHttpRequest() {
	    var isLocal = function() {
	        var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
	        var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/
	        var ajaxLocation = location.href
	        var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
	        return rlocalProtocol.test(ajaxLocParts[1])
	    }()

	    return window.ActiveXObject ?
	        (!isLocal && createStandardXHR() || createActiveXHR()) : createStandardXHR()

	    function createStandardXHR() {
	        try {
	            return new window._XMLHttpRequest();
	        } catch (e) {}
	    }

	    function createActiveXHR() {
	        try {
	            return new window._ActiveXObject("Microsoft.XMLHTTP");
	        } catch (e) {}
	    }
	}


	// 查找与请求参数匹配的数据模板：URL，Type
	function find(options) {

	    for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
	        var item = MockXMLHttpRequest.Mock._mocked[sUrlType]
	        if (
	            (!item.rurl || match(item.rurl, options.url)) &&
	            (!item.rtype || match(item.rtype, options.type.toLowerCase()))
	        ) {
	            // console.log('[mock]', options.url, '>', item.rurl)
	            return item
	        }
	    }

	    function match(expected, actual) {
	        if (Util.type(expected) === 'string') {
	            return expected === actual
	        }
	        if (Util.type(expected) === 'regexp') {
	            return expected.test(actual)
	        }
	    }

	}

	// 数据模板 ＝> 响应数据
	function convert(item, options) {
	    return Util.isFunction(item.template) ?
	        item.template(options) : MockXMLHttpRequest.Mock.mock(item.template)
	}

	module.exports = MockXMLHttpRequest

/***/ }
/******/ ])
});
;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.outils=t():e.outils=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t){function n(e,t){return new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)}e.exports=n},function(e,t){function n(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=e+"="+t+";expires="+o}e.exports=n},function(e,t){function n(){return document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop}e.exports=n},function(e,t){function n(e){return window.scrollTo(0,e),e}e.exports=n},function(e,t){e.exports=function(e,t,n,o){function r(){function r(){a=Number(new Date),n.apply(f,s)}function u(){i=void 0}var f=this,c=Number(new Date)-a,s=arguments;o&&!i&&r(),i&&clearTimeout(i),void 0===o&&c>e?r():!0!==t&&(i=setTimeout(o?u:r,void 0===o?e-c:e))}var i,a=0;return"boolean"!=typeof t&&(o=n,n=t,t=void 0),r}},function(e,t,n){var o=n(6),r=n(7),i=n(0),a=n(8),u=n(9),f=n(10),c=n(1),s=n(11),p=n(12),d=n(2),l=n(13),m=n(14),v=n(3),w=n(15),g=n(16),y=n(4),h=n(17),x=n(18),b=n(19),C=n(20),N=n(21),S=n(22),M=n(23),E=n(24),F=n(25),D=n(26),I=n(27),T=n(28),k=n(29),R=n(30),A=n(31);e.exports={arrayEqual:o,addClass:r,hasClass:i,removeClass:a,getCookie:u,removeCookie:f,setCookie:c,getOS:s,getExplore:p,getScrollTop:d,offset:l,scrollTo:m,setScrollTop:v,windowResize:w,debounce:g,throttle:y,getKeyName:h,deepClone:x,isEmptyObject:b,randomColor:C,randomNum:N,isEmail:S,isIdCard:M,isPhoneNum:E,isUrl:F,digitUppercase:D,isSupportWebP:I,formatPassTime:T,formatRemainTime:k,parseQueryString:R,stringfyQueryString:A}},function(e,t){function n(e,t){if(e===t)return!0;if(e.length!=t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}e.exports=n},function(e,t,n){function o(e,t){r(e,t)||(e.className+=" "+t)}var r=n(0);e.exports=o},function(e,t,n){function o(e,t){if(r(e,t)){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ")}}var r=n(0);e.exports=o},function(e,t){function n(e){for(var t=document.cookie.replace(/\s/g,"").split(";"),n=0;n<t.length;n++){var o=t[n].split("=");if(o[0]==e)return decodeURIComponent(o[1])}return""}e.exports=n},function(e,t,n){function o(e){r(e,"1",-1)}var r=n(1);e.exports=o},function(e,t){function n(){var e="navigator"in window&&"userAgent"in navigator&&navigator.userAgent.toLowerCase()||"",t=("navigator"in window&&"vendor"in navigator&&navigator.vendor.toLowerCase(),"navigator"in window&&"appVersion"in navigator&&navigator.appVersion.toLowerCase()||"");return/mac/i.test(t)?"MacOSX":/win/i.test(t)?"windows":/linux/i.test(t)?"linux":(/iphone/i.test(e)||/ipad/i.test(e)||/ipod/i.test(e),/android/i.test(e)?"android":/win/i.test(t)&&/phone/i.test(e)?"windowsPhone":void 0)}e.exports=n},function(e,t){function n(){var e,t={},n=navigator.userAgent.toLowerCase();return(e=n.match(/rv:([\d.]+)\) like gecko/))?t.ie=e[1]:(e=n.match(/msie ([\d\.]+)/))?t.ie=e[1]:(e=n.match(/edge\/([\d\.]+)/))?t.edge=e[1]:(e=n.match(/firefox\/([\d\.]+)/))?t.firefox=e[1]:(e=n.match(/(?:opera|opr).([\d\.]+)/))?t.opera=e[1]:(e=n.match(/chrome\/([\d\.]+)/))?t.chrome=e[1]:(e=n.match(/version\/([\d\.]+).*safari/))&&(t.safari=e[1]),t.ie?"IE: "+t.ie:t.edge?"EDGE: "+t.edge:t.firefox?"Firefox: "+t.firefox:t.chrome?"Chrome: "+t.chrome:t.opera?"Opera: "+t.opera:t.safari?"Safari: "+t.safari:"Unkonwn"}e.exports=n},function(e,t){function n(e){for(var t={left:0,top:0};e;)t.left+=e.offsetLeft,t.top+=e.offsetTop,e=e.offsetParent;return t}e.exports=n},function(e,t,n){function o(e,t){if(t<0)return void i(e);var n=e-r();if(0!==n){var a=n/t*10;requestAnimationFrame(function(){if(Math.abs(a)>Math.abs(n))return void i(r()+n);i(r()+a),n>0&&r()>=e||n<0&&r()<=e||o(e,t-16)})}}var r=n(2),i=n(3);!function(){window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}();e.exports=o},function(e,t){function n(e,t){var n=window.innerHeight;e="function"==typeof e?e:function(){},t="function"==typeof t?t:function(){},window.addEventListener("resize",function(){var o=window.innerHeight;o===n&&e(),o<n&&t()})}e.exports=n},function(e,t,n){function o(e,t,n){return void 0===n?r(e,t,!1):r(e,n,!1!==t)}var r=n(4);e.exports=o},function(e,t){function n(e){return o[e]?o[e]:(console.log("Unknow Key(Key Code:"+e+")"),"")}var o={8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"Caps Lock",27:"Escape",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",42:"Print Screen",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"};e.exports=n},function(e,t){function n(e){var t;if(null==e||"object"!=(void 0===e?"undefined":o(e)))return e;if(e instanceof Date)return t=new Date,t.setTime(e.getTime()),t;if(e instanceof Array){t=[];for(var r=0,i=e.length;r<i;r++)t[r]=n(e[r]);return t}if(e instanceof Object){t={};for(var a in e)e.hasOwnProperty(a)&&(t[a]=n(e[a]));return t}throw new Error("Unable to copy values! Its type isn't supported.")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=n},function(e,t){function n(e){return!(!e||"object"!==(void 0===e?"undefined":o(e))||Array.isArray(e))&&!Object.keys(e).length}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=n},function(e,t){function n(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)}e.exports=n},function(e,t){function n(e,t){return Math.floor(Math.random()*(t-e+1))+e}e.exports=n},function(e,t){function n(e){return/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(e)}e.exports=n},function(e,t){function n(e){return/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(e)}e.exports=n},function(e,t){function n(e){return/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e)}e.exports=n},function(e,t){function n(e){return/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i.test(e)}e.exports=n},function(e,t){function n(e){var t=["角","分"],n=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],o=[["元","万","亿"],["","拾","佰","仟"]],r=e<0?"欠":"";e=Math.abs(e);for(var i="",a=0;a<t.length;a++)i+=(n[Math.floor(10*e*Math.pow(10,a))%10]+t[a]).replace(/零./,"");i=i||"整",e=Math.floor(e);for(var a=0;a<o[0].length&&e>0;a++){for(var u="",f=0;f<o[1].length&&e>0;f++)u=n[e%10]+o[1][f]+u,e=Math.floor(e/10);i=u.replace(/(零.)*零$/,"").replace(/^$/,"零")+o[0][a]+i}return r+i.replace(/(零.)*零元/,"元").replace(/(零.)+/g,"零").replace(/^整$/,"零元整")}e.exports=n},function(e,t){function n(){return!![].map&&0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}e.exports=n},function(e,t){function n(e){var t=Date.parse(new Date),n=t-e,o=parseInt(n/864e5),r=parseInt(n/36e5),i=parseInt(n/6e4),a=parseInt(o/30),u=parseInt(a/12);return u?u+"年前":a?a+"个月前":o?o+"天前":r?r+"小时前":i?i+"分钟前":"刚刚"}e.exports=n},function(e,t){function n(e){var t=new Date,n=new Date(e),o=n.getTime()-t.getTime(),r=0,i=0,a=0,u=0;return o>=0&&(r=Math.floor(o/1e3/3600/24),i=Math.floor(o/1e3/60/60%24),a=Math.floor(o/1e3/60%60),u=Math.floor(o/1e3%60)),r+"天 "+i+"小时 "+a+"分钟 "+u+"秒"}e.exports=n},function(e,t){function n(e){e=null==e?window.location.href:e;var t=e.substring(e.lastIndexOf("?")+1);return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}e.exports=n},function(e,t){function n(e){if(!e)return"";var t=[];for(var n in e){var o=e[n];if(o instanceof Array)for(var r=0;r<o.length;++r)t.push(encodeURIComponent(n+"["+r+"]")+"="+encodeURIComponent(o[r]));else t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]))}return t.join("&")}e.exports=n}])});

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmM2M1NDE3ZTIwZWU3YmYwYTZhNSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vY2tqcy9kaXN0L21vY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyJdLCJuYW1lcyI6WyIkYXBwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwib3B0aW9ucyIsImNvbnRhaW5lciIsInBlb3BsZSIsImJhY2tncm91bmRJbWFnZSIsInBlb3BsZUltYWdlIiwiYXBwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiaWQiLCJ4IiwieSIsInB1c2giLCJpbWdJbmRleCIsIm5hbWUiLCJjbmFtZSIsImNvbG9yIiwibW92ZSIsIiRzaG93Iiwic2hvd1BhdGgiLCJpbm5lckhUTUwiLCIkcnVsZXIiLCJpbWdTY2FsZSIsIiRwb2ludGVyWCIsIiRwb2ludGVyWSIsInBvaW50ZXJYIiwicG9pbnRlclkiLCIkbWVhc3VyZSIsIm1lYXN1cmUiLCIkbWVhc3VyZUNhbmNlbCIsInVwZGF0ZUNhbnZhcyIsIm1vY2tTZXJ2ZXIxIiwic2V0SW50ZXJ2YWwiLCJmb3JFYWNoIiwicGVyc29uIiwiaW5kZXgiLCJsZW5ndGgiLCJsYXN0IiwibmV4dCIsInNoaWZ0IiwibW9ja1NlcnZlcjIiLCJtb2NrU2VydmVyMyIsImRlZmF1bHRPcHRpb25zIiwidW5kZWZpbmVkIiwiaW1nWCIsImltZ1kiLCJhbmltYXRpb24iLCJpc01lYXN1cmluZyIsImlzTW92ZU1hcCIsIkFwcCIsImlzU2hvd1BhdGgiLCJyZW5kZXIiLCJsb2FkQmdJbWciLCJsb2FkUGVvcGxlSW1nIiwiZHJhd01vdmUiLCJhZGRFdmVudCIsInJ1biIsImJpbmRNZWFzdXJlRXZlbnQiLCJjb250ZXh0IiwiZHJhd01hcCIsImRyYXdQZW9wbGUiLCJjbGVhckNhbnZhcyIsIm1vdmVDYW52YXMiLCJnZXRDb250ZXh0IiwibWVhc3VyZUNhbnZhcyIsImRyYXdNZWFzdXJlIiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwibGluZUhlaWdodCIsIm92ZXJmbG93IiwiYmFja2dyb3VuZENvbG9yIiwiYmdDb2xvciIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm1hcENhbnZhcyIsInNldEF0dHJpYnV0ZSIsImNsb25lTm9kZSIsInBlb3BsZUNhbnZhcyIsIiRjb250YWluZXIiLCJjbGlja1RpbWUiLCJjbGlja051bSIsIm1vdmVOdW0iLCJtb3VzZW1vdmVMaXN0ZW5lciIsImN1cnNvciIsInBvcyIsIndpbmRvd1RvQ2FudmFzIiwiZXZlbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsIm1vdmVBcnIiLCJsYXN0UG9pbnQiLCJjbGlja0xpc3RlbmVyIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInBvcCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvYmoiLCJhcnIiLCJqdWRnZUJvcmRlciIsImJnSW1nIiwid2hlZWxEZWx0YSIsImRlbHRhWSIsInRoYXQiLCJwb3MxIiwibW91c2V1cExpc3RlbmVyIiwic2V0VGltZW91dCIsImkiLCJzaG93SW5mbyIsImNhbnZhcyIsImJib3giLCJpbWciLCJJbWFnZSIsInNyYyIsImltZ0FyciIsIkFycmF5IiwiaXNBcnJheSIsImxvYWROdW0iLCJtYXAiLCJkcmF3SW1hZ2UiLCJjdXJyZW50IiwicGVvcGxlSW1nV2lkdGgiLCJwZW9wbGVJbWdIZWlnaHQiLCJ0b3RhbExlbmd0aCIsInRleHQiLCJ0b0ZpeGVkIiwiY2xlYXJSZWN0Iiwic3RlcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInZhbCIsImRyYXdMaW5lIiwiZHJhd0NpcmNsZSIsImRyYXdNZWFzdXJlSW5mbyIsImRyYXdQZW9wbGVJbmZvIiwiY2FsY3VsYXRlTGVuZ3RoIiwiZGlyZWN0UGVvcGxlIiwiY3R4IiwieDEiLCJ5MSIsIngyIiwieTIiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImNsb3NlUGF0aCIsInJhZGl1cyIsImFyYyIsImZpbGxTdHlsZSIsImZpbGwiLCJmaWxsUmVjdCIsInN0cm9rZVJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJpbmZvIiwiTWF0aCIsInNxcnQiLCJwb3ciLCJyIiwicGVvcGxlSW5kZXgiLCJwZW9wbGVQb3MiLCJwb2ludExlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVEs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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsb0I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsWUFBWTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsTUFBTTtBQUNOO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQSx1QkFBdUIsY0FBYztBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDRCQUE0QjtBQUM1QiwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHNDQUFzQztBQUN0QyxvQ0FBb0M7QUFDcEMsNkJBQTZCO0FBQzdCLDRCQUE0QjtBQUM1Qjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsWUFBWTtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsV0FBVztBQUM5RCxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELFlBQVk7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFdBQVc7QUFDOUMsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsV0FBVztBQUM5Qyx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxXQUFXO0FBQzlDLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVLFNBQVMsV0FBVyxpQ0FBaUMsV0FBVztBQUMxRTtBQUNBLFVBQVUsVUFBVSxZQUFZO0FBQ2hDO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHVCQUF1QixFQUFFO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQzs7Ozs7O0FDMTFRQSxlQUFlLHFJQUFpTCxpQkFBaUIsbUJBQW1CLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCxTQUFTLHVDQUF1QyxxQ0FBcUMsb0NBQW9DLEVBQUUsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELGlCQUFpQixnQkFBZ0IsZ0JBQWdCLDJEQUEyRCxZQUFZLGVBQWUsa0JBQWtCLGVBQWUsbURBQW1ELFlBQVksWUFBWSxlQUFlLGFBQWEsNkZBQTZGLFlBQVksZUFBZSxjQUFjLDhCQUE4QixZQUFZLGVBQWUsNEJBQTRCLGFBQWEsYUFBYSxnQ0FBZ0MsYUFBYSxTQUFTLDRDQUE0QyxpR0FBaUcsVUFBVSxpREFBaUQsaUJBQWlCLG1QQUFtUCxXQUFXLGdhQUFnYSxlQUFlLGdCQUFnQixrQkFBa0IsK0JBQStCLFlBQVksV0FBVyw0QkFBNEIsU0FBUyxZQUFZLGlCQUFpQixnQkFBZ0IsNkJBQTZCLFdBQVcsWUFBWSxpQkFBaUIsZ0JBQWdCLFdBQVcsd0NBQXdDLHdDQUF3QyxXQUFXLFlBQVksZUFBZSxjQUFjLG9EQUFvRCxPQUFPLFdBQVcsS0FBSyxzQkFBc0IsMkNBQTJDLFNBQVMsWUFBWSxpQkFBaUIsY0FBYyxZQUFZLFdBQVcsWUFBWSxlQUFlLGFBQWEsaVFBQWlRLDBOQUEwTixZQUFZLGVBQWUsYUFBYSxVQUFVLHFDQUFxQyxnZ0JBQWdnQixZQUFZLGVBQWUsY0FBYyxXQUFXLGNBQWMsRUFBRSwwREFBMEQsU0FBUyxZQUFZLGlCQUFpQixnQkFBZ0Isd0JBQXdCLFlBQVksVUFBVSxhQUFhLGlDQUFpQyxnREFBZ0QsNkNBQTZDLEdBQUcsa0JBQWtCLFlBQVksa0dBQWtHLEdBQUcsWUFBWSxlQUFlLGdCQUFnQix5QkFBeUIscUNBQXFDLHNDQUFzQyw2Q0FBNkMseUJBQXlCLG9CQUFvQixFQUFFLFlBQVksaUJBQWlCLGtCQUFrQiwwQ0FBMEMsV0FBVyxZQUFZLGVBQWUsY0FBYyxnRUFBZ0UsT0FBTyxtNkJBQW02QixvRkFBb0YsWUFBWSxlQUFlLGNBQWMsTUFBTSw2REFBNkQsZ0VBQWdFLHVCQUF1QixLQUFLLHVCQUF1QixJQUFJLGlCQUFpQixTQUFTLHdCQUF3QixLQUFLLG1EQUFtRCxTQUFTLG9FQUFvRSw4RUFBOEUsZ0JBQWdCLGFBQWEscUdBQXFHLFlBQVksZUFBZSxjQUFjLGdHQUFnRyw4RUFBOEUsZ0JBQWdCLGFBQWEscUdBQXFHLFlBQVksZUFBZSxhQUFhLHVFQUF1RSxZQUFZLGVBQWUsZ0JBQWdCLDJDQUEyQyxZQUFZLGVBQWUsY0FBYyw0REFBNEQsWUFBWSxlQUFlLGNBQWMsa0JBQWtCLEVBQUUsdUNBQXVDLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSx5Q0FBeUMsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLFlBQVksZUFBZSxjQUFjLHlFQUF5RSxFQUFFLFdBQVcsWUFBWSxlQUFlLGNBQWMsOEJBQThCLE1BQU0sUUFBUSxJQUFJLDRDQUE0QyxZQUFZLGVBQWUsY0FBYyw0R0FBNEcsY0FBYyxpQkFBaUIsV0FBVyxxRUFBcUUseUJBQXlCLFlBQVksbUJBQW1CLEtBQUssaUJBQWlCLG1CQUFtQiwyQ0FBMkMsc0RBQXNELDZFQUE2RSxZQUFZLGVBQWUsYUFBYSx1R0FBdUcsWUFBWSxlQUFlLGNBQWMsNEhBQTRILDREQUE0RCxZQUFZLGVBQWUsY0FBYyx1RUFBdUUsc0pBQXNKLFlBQVksZUFBZSxjQUFjLGlDQUFpQyx3Q0FBd0Msc0JBQXNCLHdGQUF3RixNQUFNLFlBQVksZUFBZSxjQUFjLGVBQWUsU0FBUyxnQkFBZ0IsV0FBVyxrQ0FBa0MsV0FBVyx5RUFBeUUsZ0VBQWdFLG1CQUFtQixZQUFZLEdBQUcsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJidW5kbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYnVuZGxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjNjNTQxN2UyMGVlN2JmMGE2YTUiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQXBwIGZyb20gJy4vYXBwLmpzJ1xyXG5pbXBvcnQge1xyXG4gICAgUmFuZG9tXHJcbn0gZnJvbSAnbW9ja2pzJ1xyXG5pbXBvcnQge1xyXG4gICAgcmFuZG9tTnVtLFxyXG4gICAgcmFuZG9tQ29sb3IsXHJcbiAgICBhZGRDbGFzcyxcclxuICAgIHJlbW92ZUNsYXNzLFxyXG4gICAgZGVlcENsb25lXHJcbn0gZnJvbSAnb3V0aWxzJztcclxuY29uc3QgJGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKVxyXG5cclxuY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIGNvbnRhaW5lcjogJGFwcCxcclxuICAgIHBlb3BsZTogW10sXHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6ICcuL2Fzc2VydC9pbWFnZXMvbWFwLmpwZycsXHJcbiAgICBwZW9wbGVJbWFnZTogWycuL2Fzc2VydC9pbWFnZXMvcGVvcGxlLTEucG5nJywgJy4vYXNzZXJ0L2ltYWdlcy9wZW9wbGUtMi5wbmcnLCAnLi9hc3NlcnQvaW1hZ2VzL3Blb3BsZS0zLnBuZyddXHJcbn1cclxubGV0IGFwcCA9IG5ldyBBcHAob3B0aW9ucylcclxuXHJcbi8vIGZ1bmN0aW9uIG1vY2tQZW9wbGVTZXJ2ZXIoKSB7XHJcbi8vICAgICBsZXQgcGVvcGxlID0gW11cclxuLy8gICAgIGxldCB7XHJcbi8vICAgICAgICAgd2lkdGgsXHJcbi8vICAgICAgICAgaGVpZ2h0XHJcbi8vICAgICB9ID0gJGFwcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuLy8gICAgIGxldCBwZW9wbGVOdW0gPSByYW5kb21OdW0oNSwgMTUpXHJcbi8vICAgICAvLyDmt7vliqDkurpcclxuLy8gICAgIGxldCBpZCA9IDEwMDBcclxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGVvcGxlTnVtOyBpKyspIHtcclxuLy8gICAgICAgICBsZXQgeCA9IHJhbmRvbU51bSgwLCB3aWR0aClcclxuLy8gICAgICAgICBsZXQgeSA9IHJhbmRvbU51bSgwLCBoZWlnaHQpXHJcbi8vICAgICAgICAgcGVvcGxlLnB1c2goe1xyXG4vLyAgICAgICAgICAgICBpZDogaWQrKyxcclxuLy8gICAgICAgICAgICAgaW1nSW5kZXg6IHJhbmRvbU51bSgwLCAyKSxcclxuLy8gICAgICAgICAgICAgbmFtZTogUmFuZG9tLmNuYW1lKCksXHJcbi8vICAgICAgICAgICAgIGNvbG9yOiByYW5kb21Db2xvcigpLFxyXG4vLyAgICAgICAgICAgICBtb3ZlOiBbe1xyXG4vLyAgICAgICAgICAgICAgICAgeCxcclxuLy8gICAgICAgICAgICAgICAgIHlcclxuLy8gICAgICAgICAgICAgfV1cclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgfVxyXG4vLyAgICAgLy8g5qih5ouf6L+Q5Yqo6L2o6L+5XHJcbi8vICAgICBwZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgIGxldCBtb3ZlTnVtID0gcmFuZG9tTnVtKDUwLCAxMDApXHJcbi8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3ZlTnVtOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVtwZXJzb24ubW92ZS5sZW5ndGggLSAxXVxyXG4vLyAgICAgICAgICAgICBsZXQgbmV4dCA9IHtcclxuLy8gICAgICAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtMTIsIDEyKSxcclxuLy8gICAgICAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtMTIsIDEyKVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vICAgICByZXR1cm4gcGVvcGxlXHJcbi8vIH1cclxuLy8gbGV0IG1vY2tQZW9wbGUgPSBtb2NrUGVvcGxlU2VydmVyKClcclxuLy8g5re75Yqg5py65Zmo5Lq6XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX2FkZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgIC8vIGFwcC5vcHRpb25zLnBlb3BsZSA9IG1vY2tQZW9wbGVcclxuICAgIGxldCB7XHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0XHJcbiAgICB9ID0gJGFwcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCBpZCA9IDEwMDBcclxuICAgIGxldCB4ID0gcmFuZG9tTnVtKDAsIHdpZHRoKVxyXG4gICAgbGV0IHkgPSByYW5kb21OdW0oMCwgaGVpZ2h0KVxyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLnB1c2goe1xyXG4gICAgICAgIGlkOiBpZCsrLFxyXG4gICAgICAgIGltZ0luZGV4OiByYW5kb21OdW0oMCwgMiksXHJcbiAgICAgICAgbmFtZTogUmFuZG9tLmNuYW1lKCksXHJcbiAgICAgICAgY29sb3I6IHJhbmRvbUNvbG9yKCksXHJcbiAgICAgICAgbW92ZTogW3tcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeVxyXG4gICAgICAgIH1dXHJcbiAgICB9KVxyXG4gICAgLy8g6YeN57uY6L2o6L+577yM5Lq6XHJcbiAgICAvLyBhcHAudXBkYXRlQ2FudmFzKCdwZW9wbGUnKVxyXG4gICAgLy8gYXBwLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbn0pXHJcblxyXG4vLyDmmK/lkKblsZXnpLrov5Dliqjovajov7lcclxuLy8gbGV0IG1vY2tTZXJ2ZXI0XHJcbmxldCAkc2hvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3Nob3cnKTtcclxuJHNob3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9hZGQnKS5jbGljaygpXHJcbiAgICAvLyBjbGVhckludGVydmFsKG1vY2tTZXJ2ZXI0KVxyXG4gICAgYXBwLnNob3dQYXRoID0gIWFwcC5zaG93UGF0aFxyXG4gICAgaWYgKGFwcC5zaG93UGF0aCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAkc2hvdy5pbm5lckhUTUwgPSAn6L+Q5Yqo6L2o6L+5J1xyXG4gICAgICAgIHJlbW92ZUNsYXNzKCRzaG93LCAnYnRuLXdhcm5pbmcnKVxyXG4gICAgICAgIGFkZENsYXNzKCRzaG93LCAnYnRuLXByaW1hcnknKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkc2hvdy5pbm5lckhUTUwgPSAn5YWz6Zet6L2o6L+5J1xyXG4gICAgICAgIHJlbW92ZUNsYXNzKCRzaG93LCAnYnRuLXByaW1hcnknKVxyXG4gICAgICAgIGFkZENsYXNzKCRzaG93LCAnYnRuLXdhcm5pbmcnKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldCBwZW9wbGUgPSBkZWVwQ2xvbmUoYXBwLm9wdGlvbnMucGVvcGxlKTtcclxuICAgIC8vIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgLy8gICAgIGFycmF5W2luZGV4XS5tb3ZlID0gW11cclxuICAgIC8vIH0pXHJcbiAgICAvLyBtb2NrU2VydmVyNCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIC8vICAgICBwZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgIC8vICAgICAgICAgbGV0IHBvaW50ID0gYXJyYXlbaW5kZXhdLm1vdmUuc2hpZnQoKVxyXG4gICAgLy8gICAgICAgICBpZiAocG9pbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuXHJcbiAgICAvLyAgICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKHBvaW50KVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9LCAyMDApXHJcbiAgICAvLyBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOavlOS+i+WwulxyXG5jb25zdCAkcnVsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9ydWxlcicpXHJcbiRydWxlci5pbm5lckhUTUwgPSBgeCR7YXBwLm9wdGlvbnMuaW1nU2NhbGV9IOWAjWBcclxuJGFwcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgKCkgPT4ge1xyXG4gICAgJHJ1bGVyLmlubmVySFRNTCA9IGB4JHthcHAub3B0aW9ucy5pbWdTY2FsZX0g5YCNYFxyXG59KVxyXG5cclxuLy8g6byg5qCH5Z2Q5qCHXHJcbmNvbnN0ICRwb2ludGVyWCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3BvaW50ZXIteCcpXHJcbmNvbnN0ICRwb2ludGVyWSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3BvaW50ZXIteScpXHJcbiRhcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKCkgPT4ge1xyXG4gICAgJHBvaW50ZXJYLmlubmVySFRNTCA9IGBYOiR7YXBwLm9wdGlvbnMucG9pbnRlclh9YFxyXG4gICAgJHBvaW50ZXJZLmlubmVySFRNTCA9IGBZOiR7YXBwLm9wdGlvbnMucG9pbnRlcll9YFxyXG59KVxyXG5cclxuXHJcbmNvbnN0ICRtZWFzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfbWVhc3VyZScpXHJcbiRtZWFzdXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYXBwLm1lYXN1cmUoKVxyXG59KVxyXG5jb25zdCAkbWVhc3VyZUNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX21lYXN1cmUtY2FuY2VsJylcclxuJG1lYXN1cmVDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5tZWFzdXJlID0gW11cclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ21lYXN1cmUnKVxyXG59KVxyXG5cclxuLy8g5pWw5o2u5qih5ouf5ZmoXHJcbmxldCBtb2NrU2VydmVyMSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4gICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbiAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtNSwgNSksXHJcbiAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtNSwgNSlcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuICAgICAgICBpZiAobGVuZ3RoID4gMTAwKSBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUuc2hpZnQoKVxyXG4gICAgfSk7XHJcbn0sIDUwMClcclxubGV0IG1vY2tTZXJ2ZXIyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbiAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC01LCA1KSxcclxuICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC01LCA1KVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgICAgIGlmIChsZW5ndGggPiAxMDApIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5zaGlmdCgpXHJcbiAgICB9KTtcclxufSwgMzAwKVxyXG5sZXQgbW9ja1NlcnZlcjMgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4gICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTUsIDUpLFxyXG4gICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTUsIDUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDEwMCkgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnNoaWZ0KClcclxuICAgIH0pO1xyXG59LCAxMDAwKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCB7XHJcbiAgICBkcmF3Q2lyY2xlLFxyXG4gICAgZHJhd0xpbmUsXHJcbiAgICBkcmF3TWVhc3VyZUluZm8sXHJcbiAgICBkcmF3UGVvcGxlSW5mbyxcclxuICAgIGNhbGN1bGF0ZUxlbmd0aCxcclxuICAgIGRpcmVjdFBlb3BsZVxyXG59IGZyb20gJy4vdXRpbHMnXHJcblxyXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIGNvbnRhaW5lcjogbnVsbCwgLy/liJvlu7pjYW52YXPnmoTlrrnlmajvvIzlpoLmnpzkuI3loavvvIzoh6rliqjlnKggYm9keSDkuIrliJvlu7ropobnm5blhajlsY/nmoTlsYJcclxuICAgIHBlb3BsZTogW10sIC8vIOS6ulxyXG4gICAgbWVhc3VyZTogW10sIC8vIOa1i+i3neiusOW9lVxyXG4gICAgYmFja2dyb3VuZEltYWdlOiB1bmRlZmluZWQsIC8vIOiDjOaZr+WbvlxyXG4gICAgaW1nU2NhbGU6IDEsIC8vIOm7mOiupOaUvuWkp+WAjeaVsFxyXG4gICAgaW1nWDogMCwgLy8g6IOM5pmv5Zu+5ouSY2FudmFz5Y6f54K5WOaWueWQkei3neemu1xyXG4gICAgaW1nWTogMCwgLy8g6IOM5pmv5Zu+5ouSY2FudmFz5Y6f54K5WeaWueWQkei3neemu1xyXG4gICAgcG9pbnRlclg6IDAsXHJcbiAgICBwb2ludGVyWTogMCxcclxuICAgIGFuaW1hdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgaXNNZWFzdXJpbmc6IGZhbHNlIC8v5q2j5Zyo5rWL6LedXHJcbn07XHJcblxyXG5sZXQgaXNNb3ZlTWFwID0gZmFsc2UgLy8g5q2j5Zyo5ouW5ou956e75Yqo5Zyw5Zu+XHJcblxyXG5jbGFzcyBBcHAge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmlzU2hvd1BhdGggPSBmYWxzZTsgLy8g5piv5ZCm5pi+56S6IOi/kOWKqOi9qOi/uVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkQmdJbWcoKTtcclxuICAgICAgICB0aGlzLmxvYWRQZW9wbGVJbWcoKTtcclxuICAgICAgICB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgICAgIHRoaXMucnVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKi9cclxuICAgIHNldCBzaG93UGF0aCh2YWwpIHtcclxuICAgICAgICB0aGlzLmlzU2hvd1BhdGggPSB2YWxcclxuICAgIH1cclxuICAgIGdldCBzaG93UGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1Nob3dQYXRoXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHVibGljXHJcbiAgICAgKiBAZGVzYyDlvIDlp4vmtYvot51cclxuICAgICAqL1xyXG4gICAgbWVhc3VyZSgpIHtcclxuICAgICAgICAvLyB0aGlzLmlzU2hvd1BhdGggPSB2YWxcclxuICAgICAgICAvLyDnu5HlrprmtYvot53kuovku7ZcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlzTWVhc3VyaW5nID09PSB0cnVlKSByZXR1cm5cclxuICAgICAgICB0aGlzLmJpbmRNZWFzdXJlRXZlbnQoKVxyXG4gICAgICAgIHRoaXMub3B0aW9ucy5pc01lYXN1cmluZyA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwdWJsaWMgXHJcbiAgICAgKiBAZGVzYyDljZXmrKHph43nu5hjYW52YXNcclxuICAgICAqIEBwYXJhbSB7Kn0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQ2FudmFzKGNvbnRleHQpIHtcclxuICAgICAgICAvLyDph43nu5hDYW52YXNcclxuICAgICAgICBzd2l0Y2ggKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY2FzZSAnbWFwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Blb3BsZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb3ZlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWVhc3VyZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWVhc3VyZSgpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpZiAoIW9wdGlvbnMuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMuYmdDb2xvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAvL+eUu+WcsOWbvueahCBjYW52YXNcclxuICAgICAgICBsZXQgbWFwQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihtYXBDYW52YXMuc3R5bGUsIHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIHRvcDogJzAnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnMCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXHJcbiAgICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcENhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgYCR7d2lkdGh9cHhgKVxyXG4gICAgICAgIG1hcENhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGAke2hlaWdodH1weGApXHJcblxyXG4gICAgICAgIC8v55S76L2o6L+557q/5p2h55qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBtb3ZlQ2FudmFzID0gbWFwQ2FudmFzLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy/nlLvkurrnmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IHBlb3BsZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgLy8g5rWL6LedIGNhbnZhc1xyXG4gICAgICAgIGxldCBtZWFzdXJlQ2FudmFzID0gbWFwQ2FudmFzLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1hcENhbnZhcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwZW9wbGVDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWFzdXJlQ2FudmFzKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXBDYW52YXMgPSBtYXBDYW52YXM7XHJcbiAgICAgICAgdGhpcy5tb3ZlQ2FudmFzID0gbW92ZUNhbnZhcztcclxuICAgICAgICB0aGlzLnBlb3BsZUNhbnZhcyA9IHBlb3BsZUNhbnZhcztcclxuICAgICAgICB0aGlzLm1lYXN1cmVDYW52YXMgPSBtZWFzdXJlQ2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNZWFzdXJlRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0ICRjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lclxyXG4gICAgICAgIGxldCBjbGlja1RpbWUgPSAwO1xyXG4gICAgICAgIGxldCBjbGlja051bSA9IDA7XHJcbiAgICAgICAgbGV0IG1vdmVOdW0gPSAwO1xyXG4gICAgICAgIGxldCBtb3VzZW1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgeDogKHBvcy54IC0gdGhpcy5vcHRpb25zLmltZ1gpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlLFxyXG4gICAgICAgICAgICAgICAgeTogKHBvcy55IC0gdGhpcy5vcHRpb25zLmltZ1kpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5pyq6YCJ5oup56ys5LiA5Liq54K577yM55u05o6lcmV0dXJuXHJcbiAgICAgICAgICAgIGlmIChjbGlja051bSA9PT0gMCkgcmV0dXJuXHJcbiAgICAgICAgICAgIGxldCBtb3ZlQXJyID0gdGhpcy5vcHRpb25zLm1lYXN1cmVbdGhpcy5vcHRpb25zLm1lYXN1cmUubGVuZ3RoIC0gMV0ubW92ZVxyXG4gICAgICAgICAgICBsZXQgbGFzdFBvaW50ID0gbW92ZUFyclttb3ZlQXJyLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgIGlmIChtb3ZlTnVtID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlQXJyLnB1c2gocG9zKVxyXG4gICAgICAgICAgICAgICAgbW92ZU51bSA9IDFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vdmVBcnJbbW92ZUFyci5sZW5ndGggLSAxXSA9IHBvc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbGlja0xpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNNb3ZlTWFwKSByZXR1cm5cclxuICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaW1lIC0gY2xpY2tUaW1lIDw9IDMwMCAmJiBjdXJyZW50VGltZSAtIGNsaWNrVGltZSA+PSAxNTApIHtcclxuICAgICAgICAgICAgICAgIC8vIOWPjOWHu+e7k+adn+a1i+i3nVxyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmVBcnIgPSB0aGlzLm9wdGlvbnMubWVhc3VyZVt0aGlzLm9wdGlvbnMubWVhc3VyZS5sZW5ndGggLSAxXS5tb3ZlXHJcbiAgICAgICAgICAgICAgICBtb3ZlQXJyLnBvcCgpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUxpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaXNNZWFzdXJpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2xpY2tOdW0gPSAwXHJcbiAgICAgICAgICAgICAgICBjbGlja1RpbWUgPSAwXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1lYXN1cmVDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgLy8g5Y2V5Ye75byA5aeL5rWL6LedXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogKHBvcy54IC0gdGhpcy5vcHRpb25zLmltZ1gpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChwb3MueSAtIHRoaXMub3B0aW9ucy5pbWdZKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrTnVtID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g56ys5LiA5qyh5Y2V5Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZTogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9zLnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1lYXN1cmUucHVzaChvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tOdW0rK1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlpJrmrKHpgInngrlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm9wdGlvbnMubWVhc3VyZS5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5vcHRpb25zLm1lYXN1cmVbaW5kZXggLSAxXS5tb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RQb2ludCA9IGFyclthcnIubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgICAgICAgICBwb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHBvcy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBwb3MueSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gocG9zKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbGlja1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tMaXN0ZW5lcilcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUxpc3RlbmVyKVxyXG4gICAgfVxyXG4gICAgYWRkRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0ICRjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lclxyXG4gICAgICAgIGxldCBqdWRnZUJvcmRlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgLy8g6L6555WM5qOA5rWLXHJcbiAgICAgICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1kgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdZIC0gaGVpZ2h0IDwgLXRoaXMuYmdJbWcuaGVpZ2h0ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IC10aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1ggLSB3aWR0aCA8IC10aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IC10aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgd2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Zyw5Zu+57yp5pS+XHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIGxldCB3aGVlbERlbHRhID0gZXZlbnQud2hlZWxEZWx0YSA/IGV2ZW50LndoZWVsRGVsdGEgOiAoZXZlbnQuZGVsdGFZICogKC00MCkpO1xyXG4gICAgICAgICAgICBpZiAod2hlZWxEZWx0YSA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIOaUvuWkp1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmdJbWcud2lkdGggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKiAyIDw9IHRoaXMuYmdJbWcud2lkdGggKiA4IHx8IHRoaXMuYmdJbWcuaGVpZ2h0ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICogMiA8PSB0aGlzLmJnSW1nLmhlaWdodCAqIDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmlL7lpKfovrnnlYzliKTmlq1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKj0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IHRoaXMub3B0aW9ucy5pbWdYICogMiAtIHBvcy54O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZID0gdGhpcy5vcHRpb25zLmltZ1kgKiAyIC0gcG9zLnk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDnvKnlsI9cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlIC8gMiA+PSB3aWR0aCB8fCB0aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvIDIgPj0gaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g57yp5bCP6L6555WM5Yik5patXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1NjYWxlIC89IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWCAqIDAuNSArIHBvcy54ICogMC41O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZID0gdGhpcy5vcHRpb25zLmltZ1kgKiAwLjUgKyBwb3MueSAqIDAuNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqdWRnZUJvcmRlcigpXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgLy8g6YeN57uY5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01lYXN1cmUoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOWcsOWbvuenu+WKqFxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgbW91c2Vtb3ZlTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IFwibW92ZVwiO1xyXG4gICAgICAgICAgICAgICAgaXNNb3ZlTWFwID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgbGV0IHBvczEgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gcG9zMS54IC0gcG9zLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHBvczEueSAtIHBvcy55O1xyXG4gICAgICAgICAgICAgICAgcG9zID0gcG9zMTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYICs9IHg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSArPSB5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIOmHjee7mOa1i+i3neWbvuWxglxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01lYXN1cmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG1vdXNldXBMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGp1ZGdlQm9yZGVyKClcclxuICAgICAgICAgICAgICAgIC8vIOWxj+iUveenu+WKqOWcsOWbvuWQjuinpuWPkeeahOa1i+i3neeCueWHu+S6i+S7tlxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlTWFwID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDph43nu5jmtYvot53lm77lsYJcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUxpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUxpc3RlbmVyKVxyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG1vdXNldXBMaXN0ZW5lcilcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOm8oOagh+aMh+mSiOWdkOagh1xyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDlrp7ml7bpvKDmoIfkvY3nva5cclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvaW50ZXJYID0gcG9zLnhcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvaW50ZXJZID0gaGVpZ2h0IC0gcG9zLnlcclxuXHJcblxyXG4gICAgICAgICAgICAvLyDpvKDmoIfnp7vliqjmmL7npLrkurrniankv6Hmga9cclxuXHJcbiAgICAgICAgICAgIC8vIOi9rOaNouS4uuW3puS4i+inkuWdkOagh+ezu1xyXG4gICAgICAgICAgICBwb3MgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiAocG9zLnggLSB0aGlzLm9wdGlvbnMuaW1nWCkgLyB0aGlzLm9wdGlvbnMuaW1nU2NhbGUsXHJcbiAgICAgICAgICAgICAgICB5OiBoZWlnaHQgLSAocG9zLnkgLSB0aGlzLm9wdGlvbnMuaW1nWSkgLyB0aGlzLm9wdGlvbnMuaW1nU2NhbGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaSwgcGVvcGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwZXJzb24uc2hvd0luZm8gPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBkaXJlY3RQZW9wbGUocG9zLCB0aGlzLm9wdGlvbnMucGVvcGxlLCAxMCAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSlcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHJldHVyblxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucGVvcGxlW2luZGV4XS5zaG93SW5mbyA9IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1RvQ2FudmFzKGNhbnZhcywgeCwgeSkge1xyXG4gICAgICAgIGxldCBiYm94ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IHggLSBiYm94LmxlZnQgLSAoYmJveC53aWR0aCAtIGNhbnZhcy53aWR0aCkgLyAyLFxyXG4gICAgICAgICAgICB5OiB5IC0gYmJveC50b3AgLSAoYmJveC5oZWlnaHQgLSBjYW52YXMuaGVpZ2h0KSAvIDJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRCZ0ltZygpIHtcclxuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5iZ0ltZyA9IGltZ1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdNYXAoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBsb2FkUGVvcGxlSW1nKCkge1xyXG4gICAgICAgIGxldCBpbWdBcnJcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5wZW9wbGVJbWFnZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaW1nQXJyID0gW3RoaXMub3B0aW9ucy5wZW9wbGVJbWFnZV1cclxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLnBlb3BsZUltYWdlKSkge1xyXG4gICAgICAgICAgICBpbWdBcnIgPSB0aGlzLm9wdGlvbnMucGVvcGxlSW1hZ2VcclxuICAgICAgICB9IGVsc2UgdGhyb3cgJ1R5cGUgW29wdGlvbnMucGVvcGxlSW1hZ2VdIGNhbiBub3Qgc3VwcG9ydCdcclxuICAgICAgICBsZXQgbG9hZE51bSA9IDA7XHJcbiAgICAgICAgbGV0IHBlb3BsZUltYWdlID0gaW1nQXJyLm1hcCgoc3JjKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2FkTnVtKytcclxuICAgICAgICAgICAgICAgIGlmIChsb2FkTnVtID09PSBpbWdBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGltZ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5wZW9wbGVJbWFnZSA9IHBlb3BsZUltYWdlXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOeUu+iDjOaZr+WcsOWbvlxyXG4gICAgICovXHJcbiAgICBkcmF3TWFwKCkge1xyXG4gICAgICAgIGxldCBpbWdTY2FsZSA9IHRoaXMub3B0aW9ucy5pbWdTY2FsZTtcclxuICAgICAgICBsZXQgaW1nWCA9IHRoaXMub3B0aW9ucy5pbWdYO1xyXG4gICAgICAgIGxldCBpbWdZID0gdGhpcy5vcHRpb25zLmltZ1k7XHJcbiAgICAgICAgbGV0IGltZyA9IHRoaXMuYmdJbWc7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMubWFwQ2FudmFzO1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tYXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGNvbnRleHQpXHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQsIGltZ1gsIGltZ1ksIGltZy53aWR0aCAqIGltZ1NjYWxlLCBpbWcuaGVpZ2h0ICogaW1nU2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNb3ZlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGggIT09IHRydWUpIHJldHVyblxyXG4gICAgICAgIC8v55S756e75Yqo6L2o6L+5XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKCh7XHJcbiAgICAgICAgICAgIG1vdmUsXHJcbiAgICAgICAgICAgIGNvbG9yXHJcbiAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudCwgbGFzdDtcclxuICAgICAgICAgICAgaWYgKG1vdmUubGVuZ3RoID09PSAwKSByZXR1cm5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IG1vdmVbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbW92ZVtpbmRleF1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG1vdmVbLS1pbmRleF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghY29sb3IpICdyZWQnXHJcbiAgICAgICAgICAgICAgICAvLyDliIfmjaLlt6bkuIvop5LkuLrlnZDmoIfljp/ngrlcclxuICAgICAgICAgICAgICAgIGxhc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogbGFzdC54ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1gsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogKGhlaWdodCAtIGxhc3QueSkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBjdXJyZW50LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAoaGVpZ2h0IC0gY3VycmVudC55KSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkcmF3TGluZShjb250ZXh0LCBjb2xvciwgbGFzdC54LCBsYXN0LnksIGN1cnJlbnQueCwgY3VycmVudC55LCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1Blb3BsZSgpIHtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMsXHJcbiAgICAgICAgICAgIHBlb3BsZUltYWdlXHJcbiAgICAgICAgfSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBwZW9wbGVJbWdXaWR0aCA9IDE2O1xyXG4gICAgICAgIGxldCBwZW9wbGVJbWdIZWlnaHQgPSAxODtcclxuICAgICAgICBsZXQgY29udGV4dCA9IHBlb3BsZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGNvbnRleHQpO1xyXG4gICAgICAgIG9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZSxcclxuICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIGltZ0luZGV4LFxyXG4gICAgICAgICAgICBzaG93SW5mb1xyXG4gICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgaWYgKG1vdmUubGVuZ3RoID09PSAwKSByZXR1cm5cclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gbW92ZVttb3ZlLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgIC8vIOWIh+aNouW3puS4i+inkuS4uuWdkOagh+WOn+eCuVxyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHBvc2l0aW9uLnggKiBvcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1ggLSBwZW9wbGVJbWdXaWR0aCAvIDIsXHJcbiAgICAgICAgICAgICAgICB5OiAoaGVpZ2h0IC0gcG9zaXRpb24ueSkgKiBvcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1kgLSBwZW9wbGVJbWdIZWlnaHQgLyAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNob3dJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBkcmF3UGVvcGxlSW5mbyhjb250ZXh0LCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBpZFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShwZW9wbGVJbWFnZVtpbWdJbmRleF0sIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBlb3BsZUltZ1dpZHRoLCBwZW9wbGVJbWdIZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNZWFzdXJlKCkge1xyXG4gICAgICAgIC8vIOeUu+a1i+i3nei9qOi/uVxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzLFxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIC8v55S756e75Yqo6L2o6L+5XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMubWVhc3VyZS5mb3JFYWNoKCh7XHJcbiAgICAgICAgICAgIG1vdmVcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50LCBsYXN0LCB0b3RhbExlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb3ZlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG1vdmVbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlWy0taW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGxhc3QueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGxhc3QueSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGN1cnJlbnQueSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkcmF3TGluZShjb250ZXh0LCAnI2ZmNjkyMicsIGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSwgMilcclxuICAgICAgICAgICAgICAgIGRyYXdDaXJjbGUoY29udGV4dCwgJyNmZjY5MjInLCBjdXJyZW50LngsIGN1cnJlbnQueSwgNSlcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJydcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6LW354K5XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICfotbfngrknXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsTGVuZ3RoID0gdG90YWxMZW5ndGggKyBjYWxjdWxhdGVMZW5ndGgobGFzdC54LCBsYXN0LnksIGN1cnJlbnQueCwgY3VycmVudC55KVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHsodG90YWxMZW5ndGgvdGhpcy5vcHRpb25zLmltZ1NjYWxlKS50b0ZpeGVkKDIpfSBtYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHJhd01lYXN1cmVJbmZvKGNvbnRleHQsIGN1cnJlbnQueCwgY3VycmVudC55LCB0ZXh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZGVzYyDmuIXpmaR7Y29udGV4dH3nlLvluINcclxuICAgICAqIEBwYXJhbSB7Kn0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgY2xlYXJDYW52YXMoY29udGV4dCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcyxcclxuICAgICAgICAgICAgbW92ZUNhbnZhcyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLFxyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzXHJcbiAgICAgICAgfSA9IHRoaXNcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIG1vdmVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgLy8g5Yqo55S7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pIHJldHVyblxyXG4gICAgICAgIGxldCBzdGVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhcygncGVvcGxlJylcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG4gICAgICAgICAgICAvLyDmm7TmlrAg5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzKCdtZWFzdXJlJylcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy/nlLvnur/mrrVcclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdMaW5lKGN0eCwgY29sb3IsIHgxLCB5MSwgeDIsIHkyLCBsaW5lV2lkdGgpIHtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcclxuICAgIGN0eC5saW5lVG8oeDIsIHkyKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxufVxyXG4vL+eUu+WchlxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0NpcmNsZShjdHgsIGNvbG9yLCB4LCB5LCByYWRpdXMpIHtcclxuICAgIC8v55S75LiA5Liq56m65b+D5ZyGXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgMzYwLCBmYWxzZSk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7IC8v5aGr5YWF6aKc6ImyXHJcbiAgICBjdHguZmlsbCgpOyAvL+eUu+WunuW/g+WchlxyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5zdHJva2UoKTsgLy/nlLvnqbrlv4PlnIZcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxufVxyXG5cclxuLy8g55S75paH5a2XXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3TWVhc3VyZUluZm8oY3R4LCB4LCB5LCB0ZXh0KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnXHJcbiAgICBjdHguZmlsbFJlY3QoeCArIDgsIHkgLSAzMCwgNzUsIDI1KTtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZWVlJ1xyXG4gICAgY3R4LnN0cm9rZVJlY3QoeCArIDgsIHkgLSAzMCwgNzUsIDI1KVxyXG4gICAgY3R4LmZvbnQgPSAnMTRweCBBcmlhbCc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDk5Q0MnO1xyXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIHggKyAxMiwgeSAtIDEyKTtcclxufVxyXG5cclxuLy8g55S755So5oi35L+h5oGvXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3UGVvcGxlSW5mbyhjdHgsIHgsIHksIGluZm8pIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZidcclxuICAgIGN0eC5maWxsUmVjdCh4ICsgMTgsIHkgLSAzMCwgMTAwLCA1MCk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2VlZSdcclxuICAgIGN0eC5zdHJva2VSZWN0KHggKyAxOCwgeSAtIDMwLCAxMDAsIDUwKVxyXG4gICAgY3R4LmZvbnQgPSAnMTRweCBBcmlhbCc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDk5Q0MnO1xyXG4gICAgY3R4LmZpbGxUZXh0KGDnvJblj7fvvJoke2luZm8uaWR9YCwgeCArIDIzLCB5IC0gMTApO1xyXG4gICAgY3R4LmZpbGxUZXh0KGDlp5PlkI3vvJoke2luZm8ubmFtZX1gLCB4ICsgMjMsIHkgKyAxMCk7XHJcbn1cclxuXHJcblxyXG4vLyDli77ogqHlrprnkIbnrpfkuKTngrnot53nprtcclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUxlbmd0aCh4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgbGV0IHggPSB4MSAtIHgyO1xyXG4gICAgbGV0IHkgPSB5MSAtIHkyO1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdFBlb3BsZShwb3MsIHBlb3BsZSwgcikge1xyXG4gICAgbGV0IHBlb3BsZUluZGV4XHJcbiAgICBwZW9wbGUuZm9yRWFjaCgoe1xyXG4gICAgICAgIG1vdmVcclxuICAgIH0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKG1vdmUubGVuZ3RoIDw9IDApIHJldHVyblxyXG4gICAgICAgIGxldCBwZW9wbGVQb3MgPSBtb3ZlW21vdmUubGVuZ3RoIC0gMV1cclxuICAgICAgICBsZXQgcG9pbnRMZW5ndGggPSBjYWxjdWxhdGVMZW5ndGgocG9zLngsIHBvcy55LCBwZW9wbGVQb3MueCwgcGVvcGxlUG9zLnkpXHJcbiAgICAgICAgaWYgKHBvaW50TGVuZ3RoIDwgcikgcGVvcGxlSW5kZXggPSBpbmRleFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBlb3BsZUluZGV4XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiLCIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJNb2NrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk1vY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogZ2xvYmFsIHJlcXVpcmUsIG1vZHVsZSwgd2luZG93ICovXG5cdHZhciBIYW5kbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblx0dmFyIFJhbmRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcblx0dmFyIFJFID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcblx0dmFyIHRvSlNPTlNjaGVtYSA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpXG5cdHZhciB2YWxpZCA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpXG5cblx0dmFyIFhIUlxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIFhIUiA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpXG5cblx0LyohXG5cdCAgICBNb2NrIC0g5qih5ouf6K+35rGCICYg5qih5ouf5pWw5o2uXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vbnV5c29mdC9Nb2NrXG5cdCAgICDloqjmmbogbW96aGkuZ3l5QHRhb2Jhby5jb20gbnV5c29mdEBnbWFpbC5jb21cblx0Ki9cblx0dmFyIE1vY2sgPSB7XG5cdCAgICBIYW5kbGVyOiBIYW5kbGVyLFxuXHQgICAgUmFuZG9tOiBSYW5kb20sXG5cdCAgICBVdGlsOiBVdGlsLFxuXHQgICAgWEhSOiBYSFIsXG5cdCAgICBSRTogUkUsXG5cdCAgICB0b0pTT05TY2hlbWE6IHRvSlNPTlNjaGVtYSxcblx0ICAgIHZhbGlkOiB2YWxpZCxcblx0ICAgIGhlcmVkb2M6IFV0aWwuaGVyZWRvYyxcblx0ICAgIHNldHVwOiBmdW5jdGlvbihzZXR0aW5ncykge1xuXHQgICAgICAgIHJldHVybiBYSFIuc2V0dXAoc2V0dGluZ3MpXG5cdCAgICB9LFxuXHQgICAgX21vY2tlZDoge31cblx0fVxuXG5cdE1vY2sudmVyc2lvbiA9ICcxLjAuMS1iZXRhMydcblxuXHQvLyDpgb/lhY3lvqrnjq/kvp3otZZcblx0aWYgKFhIUikgWEhSLk1vY2sgPSBNb2NrXG5cblx0Lypcblx0ICAgICogTW9jay5tb2NrKCB0ZW1wbGF0ZSApXG5cdCAgICAqIE1vY2subW9jayggZnVuY3Rpb24oKSApXG5cdCAgICAqIE1vY2subW9jayggcnVybCwgdGVtcGxhdGUgKVxuXHQgICAgKiBNb2NrLm1vY2soIHJ1cmwsIGZ1bmN0aW9uKG9wdGlvbnMpIClcblx0ICAgICogTW9jay5tb2NrKCBydXJsLCBydHlwZSwgdGVtcGxhdGUgKVxuXHQgICAgKiBNb2NrLm1vY2soIHJ1cmwsIHJ0eXBlLCBmdW5jdGlvbihvcHRpb25zKSApXG5cblx0ICAgIOagueaNruaVsOaNruaooeadv+eUn+aIkOaooeaLn+aVsOaNruOAglxuXHQqL1xuXHRNb2NrLm1vY2sgPSBmdW5jdGlvbihydXJsLCBydHlwZSwgdGVtcGxhdGUpIHtcblx0ICAgIC8vIE1vY2subW9jayh0ZW1wbGF0ZSlcblx0ICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdCAgICAgICAgcmV0dXJuIEhhbmRsZXIuZ2VuKHJ1cmwpXG5cdCAgICB9XG5cdCAgICAvLyBNb2NrLm1vY2socnVybCwgdGVtcGxhdGUpXG5cdCAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuXHQgICAgICAgIHRlbXBsYXRlID0gcnR5cGVcblx0ICAgICAgICBydHlwZSA9IHVuZGVmaW5lZFxuXHQgICAgfVxuXHQgICAgLy8g5oum5oiqIFhIUlxuXHQgICAgaWYgKFhIUikgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gWEhSXG5cdCAgICBNb2NrLl9tb2NrZWRbcnVybCArIChydHlwZSB8fCAnJyldID0ge1xuXHQgICAgICAgIHJ1cmw6IHJ1cmwsXG5cdCAgICAgICAgcnR5cGU6IHJ0eXBlLFxuXHQgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIE1vY2tcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gTW9ja1xuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogXG5cdCAgICAjIyBIYW5kbGVyXG5cblx0ICAgIOWkhOeQhuaVsOaNruaooeadv+OAglxuXHQgICAgXG5cdCAgICAqIEhhbmRsZXIuZ2VuKCB0ZW1wbGF0ZSwgbmFtZT8sIGNvbnRleHQ/IClcblxuXHQgICAgICAgIOWFpeWPo+aWueazleOAglxuXG5cdCAgICAqIERhdGEgVGVtcGxhdGUgRGVmaW5pdGlvbiwgRFREXG5cdCAgICAgICAgXG5cdCAgICAgICAg5aSE55CG5pWw5o2u5qih5p2/5a6a5LmJ44CCXG5cblx0ICAgICAgICAqIEhhbmRsZXIuYXJyYXkoIG9wdGlvbnMgKVxuXHQgICAgICAgICogSGFuZGxlci5vYmplY3QoIG9wdGlvbnMgKVxuXHQgICAgICAgICogSGFuZGxlci5udW1iZXIoIG9wdGlvbnMgKVxuXHQgICAgICAgICogSGFuZGxlci5ib29sZWFuKCBvcHRpb25zIClcblx0ICAgICAgICAqIEhhbmRsZXIuc3RyaW5nKCBvcHRpb25zIClcblx0ICAgICAgICAqIEhhbmRsZXIuZnVuY3Rpb24oIG9wdGlvbnMgKVxuXHQgICAgICAgICogSGFuZGxlci5yZWdleHAoIG9wdGlvbnMgKVxuXHQgICAgICAgIFxuXHQgICAgICAgIOWkhOeQhui3r+W+hO+8iOebuOWvueWSjOe7neWvue+8ieOAglxuXG5cdCAgICAgICAgKiBIYW5kbGVyLmdldFZhbHVlQnlLZXlQYXRoKCBrZXksIG9wdGlvbnMgKVxuXG5cdCAgICAqIERhdGEgUGxhY2Vob2xkZXIgRGVmaW5pdGlvbiwgRFBEXG5cblx0ICAgICAgICDlpITnkIbmlbDmja7ljaDkvY3nrKblrprkuYlcblxuXHQgICAgICAgICogSGFuZGxlci5wbGFjZWhvbGRlciggcGxhY2Vob2xkZXIsIGNvbnRleHQsIHRlbXBsYXRlQ29udGV4dCwgb3B0aW9ucyApXG5cblx0Ki9cblxuXHR2YXIgQ29uc3RhbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXHR2YXIgUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KVxuXHR2YXIgUmFuZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuXHR2YXIgUkUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXG5cdHZhciBIYW5kbGVyID0ge1xuXHQgICAgZXh0ZW5kOiBVdGlsLmV4dGVuZFxuXHR9XG5cblx0Lypcblx0ICAgIHRlbXBsYXRlICAgICAgICDlsZ7mgKflgLzvvIjljbPmlbDmja7mqKHmnb/vvIlcblx0ICAgIG5hbWUgICAgICAgICAgICDlsZ7mgKflkI1cblx0ICAgIGNvbnRleHQgICAgICAgICDmlbDmja7kuIrkuIvmlofvvIznlJ/miJDlkI7nmoTmlbDmja5cblx0ICAgIHRlbXBsYXRlQ29udGV4dCDmqKHmnb/kuIrkuIvmlofvvIxcblxuXHQgICAgSGFuZGxlLmdlbih0ZW1wbGF0ZSwgbmFtZSwgb3B0aW9ucylcblx0ICAgIGNvbnRleHRcblx0ICAgICAgICBjdXJyZW50Q29udGV4dCwgdGVtcGxhdGVDdXJyZW50Q29udGV4dCwgXG5cdCAgICAgICAgcGF0aCwgdGVtcGxhdGVQYXRoXG5cdCAgICAgICAgcm9vdCwgdGVtcGxhdGVSb290XG5cdCovXG5cdEhhbmRsZXIuZ2VuID0gZnVuY3Rpb24odGVtcGxhdGUsIG5hbWUsIGNvbnRleHQpIHtcblx0ICAgIC8qIGpzaGludCAtVzA0MSAqL1xuXHQgICAgbmFtZSA9IG5hbWUgPT0gdW5kZWZpbmVkID8gJycgOiAobmFtZSArICcnKVxuXG5cdCAgICBjb250ZXh0ID0gY29udGV4dCB8fCB7fVxuXHQgICAgY29udGV4dCA9IHtcblx0ICAgICAgICAgICAgLy8g5b2T5YmN6K6/6Zeu6Lev5b6E77yM5Y+q5pyJ5bGe5oCn5ZCN77yM5LiN5YyF5ous55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgICAgIHBhdGg6IGNvbnRleHQucGF0aCB8fCBbQ29uc3RhbnQuR1VJRF0sXG5cdCAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogY29udGV4dC50ZW1wbGF0ZVBhdGggfHwgW0NvbnN0YW50LkdVSUQrK10sXG5cdCAgICAgICAgICAgIC8vIOacgOe7iOWxnuaAp+WAvOeahOS4iuS4i+aWh1xuXHQgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogY29udGV4dC5jdXJyZW50Q29udGV4dCxcblx0ICAgICAgICAgICAgLy8g5bGe5oCn5YC85qih5p2/55qE5LiK5LiL5paHXG5cdCAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IGNvbnRleHQudGVtcGxhdGVDdXJyZW50Q29udGV4dCB8fCB0ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgLy8g5pyA57uI5YC855qE5qC5XG5cdCAgICAgICAgICAgIHJvb3Q6IGNvbnRleHQucm9vdCB8fCBjb250ZXh0LmN1cnJlbnRDb250ZXh0LFxuXHQgICAgICAgICAgICAvLyDmqKHmnb/nmoTmoLlcblx0ICAgICAgICAgICAgdGVtcGxhdGVSb290OiBjb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBjb250ZXh0LnRlbXBsYXRlQ3VycmVudENvbnRleHQgfHwgdGVtcGxhdGVcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gY29uc29sZS5sb2coJ3BhdGg6JywgY29udGV4dC5wYXRoLmpvaW4oJy4nKSwgdGVtcGxhdGUpXG5cblx0ICAgIHZhciBydWxlID0gUGFyc2VyLnBhcnNlKG5hbWUpXG5cdCAgICB2YXIgdHlwZSA9IFV0aWwudHlwZSh0ZW1wbGF0ZSlcblx0ICAgIHZhciBkYXRhXG5cblx0ICAgIGlmIChIYW5kbGVyW3R5cGVdKSB7XG5cdCAgICAgICAgZGF0YSA9IEhhbmRsZXJbdHlwZV0oe1xuXHQgICAgICAgICAgICAvLyDlsZ7mgKflgLznsbvlnotcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgLy8g5bGe5oCn5YC85qih5p2/XG5cdCAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgLy8g5bGe5oCn5ZCNICsg55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgICAgIG5hbWU6IG5hbWUsXG5cdCAgICAgICAgICAgIC8vIOWxnuaAp+WQjVxuXHQgICAgICAgICAgICBwYXJzZWROYW1lOiBuYW1lID8gbmFtZS5yZXBsYWNlKENvbnN0YW50LlJFX0tFWSwgJyQxJykgOiBuYW1lLFxuXG5cdCAgICAgICAgICAgIC8vIOino+aekOWQjueahOeUn+aIkOinhOWImVxuXHQgICAgICAgICAgICBydWxlOiBydWxlLFxuXHQgICAgICAgICAgICAvLyDnm7jlhbPkuIrkuIvmlodcblx0ICAgICAgICAgICAgY29udGV4dDogY29udGV4dFxuXHQgICAgICAgIH0pXG5cblx0ICAgICAgICBpZiAoIWNvbnRleHQucm9vdCkgY29udGV4dC5yb290ID0gZGF0YVxuXHQgICAgICAgIHJldHVybiBkYXRhXG5cdCAgICB9XG5cblx0ICAgIHJldHVybiB0ZW1wbGF0ZVxuXHR9XG5cblx0SGFuZGxlci5leHRlbmQoe1xuXHQgICAgYXJyYXk6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW10sXG5cdCAgICAgICAgICAgIGksIGlpO1xuXG5cdCAgICAgICAgLy8gJ25hbWV8MSc6IFtdXG5cdCAgICAgICAgLy8gJ25hbWV8Y291bnQnOiBbXVxuXHQgICAgICAgIC8vICduYW1lfG1pbi1tYXgnOiBbXVxuXHQgICAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc3VsdFxuXG5cdCAgICAgICAgLy8gJ2Fycic6IFt7ICdlbWFpbCc6ICdARU1BSUwnIH0sIHsgJ2VtYWlsJzogJ0BFTUFJTCcgfV1cblx0ICAgICAgICBpZiAoIW9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzKSB7XG5cdCAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLnRlbXBsYXRlLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKGkpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnB1c2goaSlcblx0ICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuXHQgICAgICAgICAgICAgICAgICAgIEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGVbaV0sIGksIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcm9vdDogb3B0aW9ucy5jb250ZXh0LnJvb3QgfHwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8gJ21ldGhvZHwxJzogWydHRVQnLCAnUE9TVCcsICdIRUFEJywgJ0RFTEVURSddXG5cdCAgICAgICAgICAgIGlmIChvcHRpb25zLnJ1bGUubWluID09PSAxICYmIG9wdGlvbnMucnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgLy8gZml4ICMxN1xuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChvcHRpb25zLm5hbWUpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnB1c2gob3B0aW9ucy5uYW1lKVxuXHQgICAgICAgICAgICAgICAgcmVzdWx0ID0gUmFuZG9tLnBpY2soXG5cdCAgICAgICAgICAgICAgICAgICAgSGFuZGxlci5nZW4ob3B0aW9ucy50ZW1wbGF0ZSwgdW5kZWZpbmVkLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucG9wKClcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vICdkYXRhfCsxJzogW3t9LCB7fV1cblx0ICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJ1bGUucGFyYW1ldGVyc1syXSkge1xuXHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUuX19vcmRlcl9pbmRleCA9IG9wdGlvbnMudGVtcGxhdGUuX19vcmRlcl9pbmRleCB8fCAwXG5cblx0ICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKG9wdGlvbnMubmFtZSlcblx0ICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnB1c2gob3B0aW9ucy5uYW1lKVxuXHQgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGUsIHVuZGVmaW5lZCwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICByb290OiBvcHRpb25zLmNvbnRleHQucm9vdCB8fCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICAgICAgfSlbXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUuX19vcmRlcl9pbmRleCAlIG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoXG5cdCAgICAgICAgICAgICAgICAgICAgXVxuXG5cdCAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZS5fX29yZGVyX2luZGV4ICs9ICtvcHRpb25zLnJ1bGUucGFyYW1ldGVyc1syXVxuXG5cdCAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnBvcCgpXG5cblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gJ2RhdGF8MS0xMCc6IFt7fV1cblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5ydWxlLmNvdW50OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gJ2RhdGF8MS0xMCc6IFt7fSwge31dXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaWkgPSAwOyBpaSA8IG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoOyBpaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHJlc3VsdC5sZW5ndGgpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnB1c2goaWkpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGVyLmdlbihvcHRpb25zLnRlbXBsYXRlW2lpXSwgcmVzdWx0Lmxlbmd0aCwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290OiBvcHRpb25zLmNvbnRleHQucm9vdCB8fCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIG9iamVjdDogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSB7fSxcblx0ICAgICAgICAgICAga2V5cywgZm5LZXlzLCBrZXksIHBhcnNlZEtleSwgaW5jLCBpO1xuXG5cdCAgICAgICAgLy8gJ29ianxtaW4tbWF4Jzoge31cblx0ICAgICAgICAvKiBqc2hpbnQgLVcwNDEgKi9cblx0ICAgICAgICBpZiAob3B0aW9ucy5ydWxlLm1pbiAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAga2V5cyA9IFV0aWwua2V5cyhvcHRpb25zLnRlbXBsYXRlKVxuXHQgICAgICAgICAgICBrZXlzID0gUmFuZG9tLnNodWZmbGUoa2V5cylcblx0ICAgICAgICAgICAga2V5cyA9IGtleXMuc2xpY2UoMCwgb3B0aW9ucy5ydWxlLmNvdW50KVxuXHQgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0ga2V5c1tpXVxuXHQgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0ga2V5LnJlcGxhY2UoQ29uc3RhbnQuUkVfS0VZLCAnJDEnKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChwYXJzZWRLZXkpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnB1c2goa2V5KVxuXHQgICAgICAgICAgICAgICAgcmVzdWx0W3BhcnNlZEtleV0gPSBIYW5kbGVyLmdlbihvcHRpb25zLnRlbXBsYXRlW2tleV0sIGtleSwge1xuXHQgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG5cdCAgICAgICAgICAgICAgICAgICAgcm9vdDogb3B0aW9ucy5jb250ZXh0LnJvb3QgfHwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucG9wKClcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8gJ29iaic6IHt9XG5cdCAgICAgICAgICAgIGtleXMgPSBbXVxuXHQgICAgICAgICAgICBmbktleXMgPSBbXSAvLyAjMjUg5pS55Y+Y5LqG6Z2e5Ye95pWw5bGe5oCn55qE6aG65bqP77yM5p+l5om+6LW35p2l5LiN5pa55L6/XG5cdCAgICAgICAgICAgIGZvciAoa2V5IGluIG9wdGlvbnMudGVtcGxhdGUpIHtcblx0ICAgICAgICAgICAgICAgICh0eXBlb2Ygb3B0aW9ucy50ZW1wbGF0ZVtrZXldID09PSAnZnVuY3Rpb24nID8gZm5LZXlzIDoga2V5cykucHVzaChrZXkpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGZuS2V5cylcblxuXHQgICAgICAgICAgICAvKlxuXHQgICAgICAgICAgICAgICAg5Lya5pS55Y+Y6Z2e5Ye95pWw5bGe5oCn55qE6aG65bqPXG5cdCAgICAgICAgICAgICAgICBrZXlzID0gVXRpbC5rZXlzKG9wdGlvbnMudGVtcGxhdGUpXG5cdCAgICAgICAgICAgICAgICBrZXlzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBhZm4gPSB0eXBlb2Ygb3B0aW9ucy50ZW1wbGF0ZVthXSA9PT0gJ2Z1bmN0aW9uJ1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBiZm4gPSB0eXBlb2Ygb3B0aW9ucy50ZW1wbGF0ZVtiXSA9PT0gJ2Z1bmN0aW9uJ1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChhZm4gPT09IGJmbikgcmV0dXJuIDBcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoYWZuICYmICFiZm4pIHJldHVybiAxXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCFhZm4gJiYgYmZuKSByZXR1cm4gLTFcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICovXG5cblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV1cblx0ICAgICAgICAgICAgICAgIHBhcnNlZEtleSA9IGtleS5yZXBsYWNlKENvbnN0YW50LlJFX0tFWSwgJyQxJylcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gocGFyc2VkS2V5KVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGtleSlcblx0ICAgICAgICAgICAgICAgIHJlc3VsdFtwYXJzZWRLZXldID0gSGFuZGxlci5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtrZXldLCBrZXksIHtcblx0ICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxuXHQgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gJ2lkfCsxJzogMVxuXHQgICAgICAgICAgICAgICAgaW5jID0ga2V5Lm1hdGNoKENvbnN0YW50LlJFX0tFWSlcblx0ICAgICAgICAgICAgICAgIGlmIChpbmMgJiYgaW5jWzJdICYmIFV0aWwudHlwZShvcHRpb25zLnRlbXBsYXRlW2tleV0pID09PSAnbnVtYmVyJykge1xuXHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGVba2V5XSArPSBwYXJzZUludChpbmNbMl0sIDEwKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICBudW1iZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgcmVzdWx0LCBwYXJ0cztcblx0ICAgICAgICBpZiAob3B0aW9ucy5ydWxlLmRlY2ltYWwpIHsgLy8gZmxvYXRcblx0ICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSArPSAnJ1xuXHQgICAgICAgICAgICBwYXJ0cyA9IG9wdGlvbnMudGVtcGxhdGUuc3BsaXQoJy4nKVxuXHQgICAgICAgICAgICAgICAgLy8gJ2Zsb2F0MXwuMS0xMCc6IDEwLFxuXHQgICAgICAgICAgICAgICAgLy8gJ2Zsb2F0MnwxLTEwMC4xLTEwJzogMSxcblx0ICAgICAgICAgICAgICAgIC8vICdmbG9hdDN8OTk5LjEtMTAnOiAxLFxuXHQgICAgICAgICAgICAgICAgLy8gJ2Zsb2F0NHwuMy0xMCc6IDEyMy4xMjMsXG5cdCAgICAgICAgICAgIHBhcnRzWzBdID0gb3B0aW9ucy5ydWxlLnJhbmdlID8gb3B0aW9ucy5ydWxlLmNvdW50IDogcGFydHNbMF1cblx0ICAgICAgICAgICAgcGFydHNbMV0gPSAocGFydHNbMV0gfHwgJycpLnNsaWNlKDAsIG9wdGlvbnMucnVsZS5kY291bnQpXG5cdCAgICAgICAgICAgIHdoaWxlIChwYXJ0c1sxXS5sZW5ndGggPCBvcHRpb25zLnJ1bGUuZGNvdW50KSB7XG5cdCAgICAgICAgICAgICAgICBwYXJ0c1sxXSArPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgLy8g5pyA5ZCO5LiA5L2N5LiN6IO95Li6IDDvvJrlpoLmnpzmnIDlkI7kuIDkvY3kuLogMO+8jOS8muiiqyBKUyDlvJXmk47lv73nlaXmjonjgIJcblx0ICAgICAgICAgICAgICAgICAgICAocGFydHNbMV0ubGVuZ3RoIDwgb3B0aW9ucy5ydWxlLmRjb3VudCAtIDEpID8gUmFuZG9tLmNoYXJhY3RlcignbnVtYmVyJykgOiBSYW5kb20uY2hhcmFjdGVyKCcxMjM0NTY3ODknKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJlc3VsdCA9IHBhcnNlRmxvYXQocGFydHMuam9pbignLicpLCAxMClcblx0ICAgICAgICB9IGVsc2UgeyAvLyBpbnRlZ2VyXG5cdCAgICAgICAgICAgIC8vICdncmFkZTF8MS0xMDAnOiAxLFxuXHQgICAgICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucmFuZ2UgJiYgIW9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzWzJdID8gb3B0aW9ucy5ydWxlLmNvdW50IDogb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgYm9vbGVhbjogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgICAgIHZhciByZXN1bHQ7XG5cdCAgICAgICAgLy8gJ3Byb3B8bXVsdGlwbGUnOiBmYWxzZSwg5b2T5YmN5YC85piv55u45Y+N5YC855qE5qaC546H5YCN5pWwXG5cdCAgICAgICAgLy8gJ3Byb3B8cHJvYmFiaWxpdHktcHJvYmFiaWxpdHknOiBmYWxzZSwg5b2T5YmN5YC85LiO55u45Y+N5YC855qE5qaC546HXG5cdCAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnMgPyBSYW5kb20uYm9vbChvcHRpb25zLnJ1bGUubWluLCBvcHRpb25zLnJ1bGUubWF4LCBvcHRpb25zLnRlbXBsYXRlKSA6IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgc3RyaW5nOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9ICcnLFxuXHQgICAgICAgICAgICBpLCBwbGFjZWhvbGRlcnMsIHBoLCBwaGVkO1xuXHQgICAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlLmxlbmd0aCkge1xuXG5cdCAgICAgICAgICAgIC8vICAnZm9vJzogJ+KYhScsXG5cdCAgICAgICAgICAgIC8qIGpzaGludCAtVzA0MSAqL1xuXHQgICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLmNvdW50ID09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0ICs9IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vICdzdGFyfDEtNSc6ICfimIUnLFxuXHQgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5ydWxlLmNvdW50OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCArPSBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gJ2VtYWlsfDEtMTAnOiAnQEVNQUlMLCAnLFxuXHQgICAgICAgICAgICBwbGFjZWhvbGRlcnMgPSByZXN1bHQubWF0Y2goQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIpIHx8IFtdIC8vIEEtWl8wLTkgPiBcXHdfXG5cdCAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwbGFjZWhvbGRlcnMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHBoID0gcGxhY2Vob2xkZXJzW2ldXG5cblx0ICAgICAgICAgICAgICAgIC8vIOmBh+WIsOi9rOS5ieaWnOadoO+8jOS4jemcgOimgeino+aekOWNoOS9jeesplxuXHQgICAgICAgICAgICAgICAgaWYgKC9eXFxcXC8udGVzdChwaCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcnMuc3BsaWNlKGktLSwgMSlcblx0ICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBwaGVkID0gSGFuZGxlci5wbGFjZWhvbGRlcihwaCwgb3B0aW9ucy5jb250ZXh0LmN1cnJlbnRDb250ZXh0LCBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVDdXJyZW50Q29udGV4dCwgb3B0aW9ucylcblxuXHQgICAgICAgICAgICAgICAgLy8g5Y+q5pyJ5LiA5Liq5Y2g5L2N56ym77yM5bm25LiU5rKh5pyJ5YW25LuW5a2X56ymXG5cdCAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJzLmxlbmd0aCA9PT0gMSAmJiBwaCA9PT0gcmVzdWx0ICYmIHR5cGVvZiBwaGVkICE9PSB0eXBlb2YgcmVzdWx0KSB7IC8vIFxuXHQgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBoZWRcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNOdW1lcmljKHBoZWQpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBhcnNlRmxvYXQocGhlZCwgMTApXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGlmICgvXih0cnVlfGZhbHNlKSQvLnRlc3QocGhlZCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGhlZCA9PT0gJ3RydWUnID8gdHJ1ZSA6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaGVkID09PSAnZmFsc2UnID8gZmFsc2UgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhlZCAvLyDlt7Lnu4/mmK/luIPlsJTlgLxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShwaCwgcGhlZClcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8gJ0FTQ0lJfDEtMTAnOiAnJyxcblx0ICAgICAgICAgICAgLy8gJ0FTQ0lJJzogJycsXG5cdCAgICAgICAgICAgIHJlc3VsdCA9IG9wdGlvbnMucnVsZS5yYW5nZSA/IFJhbmRvbS5zdHJpbmcob3B0aW9ucy5ydWxlLmNvdW50KSA6IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgICdmdW5jdGlvbic6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ICAgICAgICAvLyAoIGNvbnRleHQsIG9wdGlvbnMgKVxuXHQgICAgICAgIHJldHVybiBvcHRpb25zLnRlbXBsYXRlLmNhbGwob3B0aW9ucy5jb250ZXh0LmN1cnJlbnRDb250ZXh0LCBvcHRpb25zKVxuXHQgICAgfSxcblx0ICAgICdyZWdleHAnOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIHNvdXJjZSA9ICcnXG5cblx0ICAgICAgICAvLyAnbmFtZSc6IC9yZWdleHAvLFxuXHQgICAgICAgIC8qIGpzaGludCAtVzA0MSAqL1xuXHQgICAgICAgIGlmIChvcHRpb25zLnJ1bGUuY291bnQgPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgIHNvdXJjZSArPSBvcHRpb25zLnRlbXBsYXRlLnNvdXJjZSAvLyByZWdleHAuc291cmNlXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gJ25hbWV8MS01JzogL3JlZ2V4cC8sXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLnJ1bGUuY291bnQ7IGkrKykge1xuXHQgICAgICAgICAgICBzb3VyY2UgKz0gb3B0aW9ucy50ZW1wbGF0ZS5zb3VyY2Vcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gUkUuSGFuZGxlci5nZW4oXG5cdCAgICAgICAgICAgIFJFLlBhcnNlci5wYXJzZShcblx0ICAgICAgICAgICAgICAgIHNvdXJjZVxuXHQgICAgICAgICAgICApXG5cdCAgICAgICAgKVxuXHQgICAgfVxuXHR9KVxuXG5cdEhhbmRsZXIuZXh0ZW5kKHtcblx0ICAgIF9hbGw6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciByZSA9IHt9O1xuXHQgICAgICAgIGZvciAodmFyIGtleSBpbiBSYW5kb20pIHJlW2tleS50b0xvd2VyQ2FzZSgpXSA9IGtleVxuXHQgICAgICAgIHJldHVybiByZVxuXHQgICAgfSxcblx0ICAgIC8vIOWkhOeQhuWNoOS9jeespu+8jOi9rOaNouS4uuacgOe7iOWAvFxuXHQgICAgcGxhY2Vob2xkZXI6IGZ1bmN0aW9uKHBsYWNlaG9sZGVyLCBvYmosIHRlbXBsYXRlQ29udGV4dCwgb3B0aW9ucykge1xuXHQgICAgICAgIC8vIGNvbnNvbGUubG9nKG9wdGlvbnMuY29udGV4dC5wYXRoKVxuXHQgICAgICAgIC8vIDEga2V5LCAyIHBhcmFtc1xuXHQgICAgICAgIENvbnN0YW50LlJFX1BMQUNFSE9MREVSLmV4ZWMoJycpXG5cdCAgICAgICAgdmFyIHBhcnRzID0gQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIuZXhlYyhwbGFjZWhvbGRlciksXG5cdCAgICAgICAgICAgIGtleSA9IHBhcnRzICYmIHBhcnRzWzFdLFxuXHQgICAgICAgICAgICBsa2V5ID0ga2V5ICYmIGtleS50b0xvd2VyQ2FzZSgpLFxuXHQgICAgICAgICAgICBva2V5ID0gdGhpcy5fYWxsKClbbGtleV0sXG5cdCAgICAgICAgICAgIHBhcmFtcyA9IHBhcnRzICYmIHBhcnRzWzJdIHx8ICcnXG5cdCAgICAgICAgdmFyIHBhdGhQYXJ0cyA9IHRoaXMuc3BsaXRQYXRoVG9BcnJheShrZXkpXG5cblx0ICAgICAgICAvLyDop6PmnpDljaDkvY3nrKbnmoTlj4LmlbBcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAvLyAxLiDlsJ3or5Xkv53mjIHlj4LmlbDnmoTnsbvlnotcblx0ICAgICAgICAgICAgLypcblx0ICAgICAgICAgICAgICAgICMyNCBbV2luZG93IEZpcmVmb3ggMzAuMCDlvJXnlKgg5Y2g5L2N56ymIOaKm+mUmV0oaHR0cHM6Ly9naXRodWIuY29tL251eXNvZnQvTW9jay9pc3N1ZXMvMjQpXG5cdCAgICAgICAgICAgICAgICBbQlg5MDU2OiDlkITmtY/op4jlmajkuIsgd2luZG93LmV2YWwg5pa55rOV55qE5omn6KGM5LiK5LiL5paH5a2Y5Zyo5beu5byCXShodHRwOi8vd3d3LnczaGVscC5vcmcvemgtY24vY2F1c2VzL0JYOTA1Nilcblx0ICAgICAgICAgICAgICAgIOW6lOivpeWxnuS6jiBXaW5kb3cgRmlyZWZveCAzMC4wIOeahCBCVUdcblx0ICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgLyoganNoaW50IC1XMDYxICovXG5cdCAgICAgICAgICAgIHBhcmFtcyA9IGV2YWwoJyhmdW5jdGlvbigpeyByZXR1cm4gW10uc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAwICkgfSkoJyArIHBhcmFtcyArICcpJylcblx0ICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXHQgICAgICAgICAgICAvLyAyLiDlpoLmnpzlpLHotKXvvIzlj6rog73op6PmnpDkuLrlrZfnrKbkuLJcblx0ICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnJvcilcblx0ICAgICAgICAgICAgLy8gaWYgKGVycm9yIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpIHBhcmFtcyA9IHBhcnRzWzJdLnNwbGl0KC8sXFxzKi8pO1xuXHQgICAgICAgICAgICAvLyBlbHNlIHRocm93IGVycm9yXG5cdCAgICAgICAgICAgIHBhcmFtcyA9IHBhcnRzWzJdLnNwbGl0KC8sXFxzKi8pXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5Y2g5L2N56ym5LyY5YWI5byV55So5pWw5o2u5qih5p2/5Lit55qE5bGe5oCnXG5cdCAgICAgICAgaWYgKG9iaiAmJiAoa2V5IGluIG9iaikpIHJldHVybiBvYmpba2V5XVxuXG5cdCAgICAgICAgLy8gQGluZGV4IEBrZXlcblx0ICAgICAgICAvLyBpZiAoQ29uc3RhbnQuUkVfSU5ERVgudGVzdChrZXkpKSByZXR1cm4gK29wdGlvbnMubmFtZVxuXHQgICAgICAgIC8vIGlmIChDb25zdGFudC5SRV9LRVkudGVzdChrZXkpKSByZXR1cm4gb3B0aW9ucy5uYW1lXG5cblx0ICAgICAgICAvLyDnu53lr7not6/lvoQgb3Ig55u45a+56Lev5b6EXG5cdCAgICAgICAgaWYgKFxuXHQgICAgICAgICAgICBrZXkuY2hhckF0KDApID09PSAnLycgfHxcblx0ICAgICAgICAgICAgcGF0aFBhcnRzLmxlbmd0aCA+IDFcblx0ICAgICAgICApIHJldHVybiB0aGlzLmdldFZhbHVlQnlLZXlQYXRoKGtleSwgb3B0aW9ucylcblxuXHQgICAgICAgIC8vIOmAkuW9kuW8leeUqOaVsOaNruaooeadv+S4reeahOWxnuaAp1xuXHQgICAgICAgIGlmICh0ZW1wbGF0ZUNvbnRleHQgJiZcblx0ICAgICAgICAgICAgKHR5cGVvZiB0ZW1wbGF0ZUNvbnRleHQgPT09ICdvYmplY3QnKSAmJlxuXHQgICAgICAgICAgICAoa2V5IGluIHRlbXBsYXRlQ29udGV4dCkgJiZcblx0ICAgICAgICAgICAgKHBsYWNlaG9sZGVyICE9PSB0ZW1wbGF0ZUNvbnRleHRba2V5XSkgLy8gZml4ICMxNSDpgb/lhY3oh6rlt7Hkvp3otZboh6rlt7Fcblx0ICAgICAgICApIHtcblx0ICAgICAgICAgICAgLy8g5YWI6K6h566X6KKr5byV55So55qE5bGe5oCn5YC8XG5cdCAgICAgICAgICAgIHRlbXBsYXRlQ29udGV4dFtrZXldID0gSGFuZGxlci5nZW4odGVtcGxhdGVDb250ZXh0W2tleV0sIGtleSwge1xuXHQgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IG9iaixcblx0ICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IHRlbXBsYXRlQ29udGV4dFxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGVDb250ZXh0W2tleV1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDlpoLmnpzmnKrmib7liLDvvIzliJnljp/moLfov5Tlm55cblx0ICAgICAgICBpZiAoIShrZXkgaW4gUmFuZG9tKSAmJiAhKGxrZXkgaW4gUmFuZG9tKSAmJiAhKG9rZXkgaW4gUmFuZG9tKSkgcmV0dXJuIHBsYWNlaG9sZGVyXG5cblx0ICAgICAgICAvLyDpgJLlvZLop6PmnpDlj4LmlbDkuK3nmoTljaDkvY3nrKZcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBDb25zdGFudC5SRV9QTEFDRUhPTERFUi5leGVjKCcnKVxuXHQgICAgICAgICAgICBpZiAoQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIudGVzdChwYXJhbXNbaV0pKSB7XG5cdCAgICAgICAgICAgICAgICBwYXJhbXNbaV0gPSBIYW5kbGVyLnBsYWNlaG9sZGVyKHBhcmFtc1tpXSwgb2JqLCB0ZW1wbGF0ZUNvbnRleHQsIG9wdGlvbnMpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgaGFuZGxlID0gUmFuZG9tW2tleV0gfHwgUmFuZG9tW2xrZXldIHx8IFJhbmRvbVtva2V5XVxuXHQgICAgICAgIHN3aXRjaCAoVXRpbC50eXBlKGhhbmRsZSkpIHtcblx0ICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuXHQgICAgICAgICAgICAgICAgLy8g6Ieq5Yqo5LuO5pWw57uE5Lit5Y+W5LiA5Liq77yM5L6L5aaCIEBhcmVhc1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKGhhbmRsZSlcblx0ICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuXHQgICAgICAgICAgICAgICAgLy8g5omn6KGM5Y2g5L2N56ym5pa55rOV77yI5aSn5aSa5pWw5oOF5Ya177yJXG5cdCAgICAgICAgICAgICAgICBoYW5kbGUub3B0aW9ucyA9IG9wdGlvbnNcblx0ICAgICAgICAgICAgICAgIHZhciByZSA9IGhhbmRsZS5hcHBseShSYW5kb20sIHBhcmFtcylcblx0ICAgICAgICAgICAgICAgIGlmIChyZSA9PT0gdW5kZWZpbmVkKSByZSA9ICcnIC8vIOWboOS4uuaYr+WcqOWtl+espuS4suS4re+8jOaJgOS7pem7mOiupOS4uuepuuWtl+espuS4suOAglxuXHQgICAgICAgICAgICAgICAgZGVsZXRlIGhhbmRsZS5vcHRpb25zXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gcmVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZ2V0VmFsdWVCeUtleVBhdGg6IGZ1bmN0aW9uKGtleSwgb3B0aW9ucykge1xuXHQgICAgICAgIHZhciBvcmlnaW5hbEtleSA9IGtleVxuXHQgICAgICAgIHZhciBrZXlQYXRoUGFydHMgPSB0aGlzLnNwbGl0UGF0aFRvQXJyYXkoa2V5KVxuXHQgICAgICAgIHZhciBhYnNvbHV0ZVBhdGhQYXJ0cyA9IFtdXG5cblx0ICAgICAgICAvLyDnu53lr7not6/lvoRcblx0ICAgICAgICBpZiAoa2V5LmNoYXJBdCgwKSA9PT0gJy8nKSB7XG5cdCAgICAgICAgICAgIGFic29sdXRlUGF0aFBhcnRzID0gW29wdGlvbnMuY29udGV4dC5wYXRoWzBdXS5jb25jYXQoXG5cdCAgICAgICAgICAgICAgICB0aGlzLm5vcm1hbGl6ZVBhdGgoa2V5UGF0aFBhcnRzKVxuXHQgICAgICAgICAgICApXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8g55u45a+56Lev5b6EXG5cdCAgICAgICAgICAgIGlmIChrZXlQYXRoUGFydHMubGVuZ3RoID4gMSkge1xuXHQgICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMgPSBvcHRpb25zLmNvbnRleHQucGF0aC5zbGljZSgwKVxuXHQgICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMucG9wKClcblx0ICAgICAgICAgICAgICAgIGFic29sdXRlUGF0aFBhcnRzID0gdGhpcy5ub3JtYWxpemVQYXRoKFxuXHQgICAgICAgICAgICAgICAgICAgIGFic29sdXRlUGF0aFBhcnRzLmNvbmNhdChrZXlQYXRoUGFydHMpXG5cdCAgICAgICAgICAgICAgICApXG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGtleSA9IGtleVBhdGhQYXJ0c1trZXlQYXRoUGFydHMubGVuZ3RoIC0gMV1cblx0ICAgICAgICB2YXIgY3VycmVudENvbnRleHQgPSBvcHRpb25zLmNvbnRleHQucm9vdFxuXHQgICAgICAgIHZhciB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdFxuXHQgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYWJzb2x1dGVQYXRoUGFydHMubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdCAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbYWJzb2x1dGVQYXRoUGFydHNbaV1dXG5cdCAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQgPSB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0W2Fic29sdXRlUGF0aFBhcnRzW2ldXVxuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyDlvJXnlKjnmoTlgLzlt7Lnu4/orqHnrpflpb1cblx0ICAgICAgICBpZiAoY3VycmVudENvbnRleHQgJiYgKGtleSBpbiBjdXJyZW50Q29udGV4dCkpIHJldHVybiBjdXJyZW50Q29udGV4dFtrZXldXG5cblx0ICAgICAgICAvLyDlsJrmnKrorqHnrpfvvIzpgJLlvZLlvJXnlKjmlbDmja7mqKHmnb/kuK3nmoTlsZ7mgKdcblx0ICAgICAgICBpZiAodGVtcGxhdGVDdXJyZW50Q29udGV4dCAmJlxuXHQgICAgICAgICAgICAodHlwZW9mIHRlbXBsYXRlQ3VycmVudENvbnRleHQgPT09ICdvYmplY3QnKSAmJlxuXHQgICAgICAgICAgICAoa2V5IGluIHRlbXBsYXRlQ3VycmVudENvbnRleHQpICYmXG5cdCAgICAgICAgICAgIChvcmlnaW5hbEtleSAhPT0gdGVtcGxhdGVDdXJyZW50Q29udGV4dFtrZXldKSAvLyBmaXggIzE1IOmBv+WFjeiHquW3seS+nei1luiHquW3sVxuXHQgICAgICAgICkge1xuXHQgICAgICAgICAgICAvLyDlhYjorqHnrpfooqvlvJXnlKjnmoTlsZ7mgKflgLxcblx0ICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dFtrZXldID0gSGFuZGxlci5nZW4odGVtcGxhdGVDdXJyZW50Q29udGV4dFtrZXldLCBrZXksIHtcblx0ICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiBjdXJyZW50Q29udGV4dCxcblx0ICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IHRlbXBsYXRlQ3VycmVudENvbnRleHRcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ3VycmVudENvbnRleHRba2V5XVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICAvLyBodHRwczovL2dpdGh1Yi5jb20va2lzc3l0ZWFtL2tpc3N5L2Jsb2IvbWFzdGVyL3NyYy9wYXRoL3NyYy9wYXRoLmpzXG5cdCAgICBub3JtYWxpemVQYXRoOiBmdW5jdGlvbihwYXRoUGFydHMpIHtcblx0ICAgICAgICB2YXIgbmV3UGF0aFBhcnRzID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhQYXJ0cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBzd2l0Y2ggKHBhdGhQYXJ0c1tpXSkge1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnLi4nOlxuXHQgICAgICAgICAgICAgICAgICAgIG5ld1BhdGhQYXJ0cy5wb3AoKVxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICBjYXNlICcuJzpcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICBuZXdQYXRoUGFydHMucHVzaChwYXRoUGFydHNbaV0pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIG5ld1BhdGhQYXJ0c1xuXHQgICAgfSxcblx0ICAgIHNwbGl0UGF0aFRvQXJyYXk6IGZ1bmN0aW9uKHBhdGgpIHtcblx0ICAgICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KC9cXC8rLyk7XG5cdCAgICAgICAgaWYgKCFwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSkgcGFydHMgPSBwYXJ0cy5zbGljZSgwLCAtMSlcblx0ICAgICAgICBpZiAoIXBhcnRzWzBdKSBwYXJ0cyA9IHBhcnRzLnNsaWNlKDEpXG5cdCAgICAgICAgcmV0dXJuIHBhcnRzO1xuXHQgICAgfVxuXHR9KVxuXG5cdG1vZHVsZS5leHBvcnRzID0gSGFuZGxlclxuXG4vKioqLyB9LFxuLyogMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIENvbnN0YW50XG5cblx0ICAgIOW4uOmHj+mbhuWQiOOAglxuXHQgKi9cblx0Lypcblx0ICAgIFJFX0tFWVxuXHQgICAgICAgICduYW1lfG1pbi1tYXgnOiB2YWx1ZVxuXHQgICAgICAgICduYW1lfGNvdW50JzogdmFsdWVcblx0ICAgICAgICAnbmFtZXxtaW4tbWF4LmRtaW4tZG1heCc6IHZhbHVlXG5cdCAgICAgICAgJ25hbWV8bWluLW1heC5kY291bnQnOiB2YWx1ZVxuXHQgICAgICAgICduYW1lfGNvdW50LmRtaW4tZG1heCc6IHZhbHVlXG5cdCAgICAgICAgJ25hbWV8Y291bnQuZGNvdW50JzogdmFsdWVcblx0ICAgICAgICAnbmFtZXwrc3RlcCc6IHZhbHVlXG5cblx0ICAgICAgICAxIG5hbWUsIDIgc3RlcCwgMyByYW5nZSBbIG1pbiwgbWF4IF0sIDQgZHJhbmdlIFsgZG1pbiwgZG1heCBdXG5cblx0ICAgIFJFX1BMQUNFSE9MREVSXG5cdCAgICAgICAgcGxhY2Vob2xkZXIoKilcblxuXHQgICAgW+ato+WImeafpeeci+W3peWFt10oaHR0cDovL3d3dy5yZWdleHBlci5jb20vKVxuXG5cdCAgICAjMjYg55Sf5oiQ6KeE5YiZIOaUr+aMgSDotJ/mlbDvvIzkvovlpoIgbnVtYmVyfC0xMDAtMTAwXG5cdCovXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgR1VJRDogMSxcblx0ICAgIFJFX0tFWTogLyguKylcXHwoPzpcXCsoXFxkKyl8KFtcXCtcXC1dP1xcZCstP1tcXCtcXC1dP1xcZCopPyg/OlxcLihcXGQrLT9cXGQqKSk/KS8sXG5cdCAgICBSRV9SQU5HRTogLyhbXFwrXFwtXT9cXGQrKS0/KFtcXCtcXC1dP1xcZCspPy8sXG5cdCAgICBSRV9QTEFDRUhPTERFUjogL1xcXFwqQChbXkAjJSYoKVxcP1xcc10rKSg/OlxcKCguKj8pXFwpKT8vZ1xuXHQgICAgLy8gL1xcXFwqQChbXkAjJSYoKVxcP1xcc1xcL1xcLl0rKSg/OlxcKCguKj8pXFwpKT8vZ1xuXHQgICAgLy8gUkVfSU5ERVg6IC9eaW5kZXgkLyxcblx0ICAgIC8vIFJFX0tFWTogL15rZXkkL1xuXHR9XG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgVXRpbGl0aWVzXG5cdCovXG5cdHZhciBVdGlsID0ge31cblxuXHRVdGlsLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0ICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG5cdCAgICAgICAgaSA9IDEsXG5cdCAgICAgICAgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0ICAgICAgICBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNsb25lXG5cblx0ICAgIGlmIChsZW5ndGggPT09IDEpIHtcblx0ICAgICAgICB0YXJnZXQgPSB0aGlzXG5cdCAgICAgICAgaSA9IDBcblx0ICAgIH1cblxuXHQgICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbaV1cblx0ICAgICAgICBpZiAoIW9wdGlvbnMpIGNvbnRpbnVlXG5cblx0ICAgICAgICBmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHQgICAgICAgICAgICBzcmMgPSB0YXJnZXRbbmFtZV1cblx0ICAgICAgICAgICAgY29weSA9IG9wdGlvbnNbbmFtZV1cblxuXHQgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBjb3B5KSBjb250aW51ZVxuXHQgICAgICAgICAgICBpZiAoY29weSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZVxuXG5cdCAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29weSkgfHwgVXRpbC5pc09iamVjdChjb3B5KSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjb3B5KSkgY2xvbmUgPSBzcmMgJiYgVXRpbC5pc0FycmF5KHNyYykgPyBzcmMgOiBbXVxuXHQgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNPYmplY3QoY29weSkpIGNsb25lID0gc3JjICYmIFV0aWwuaXNPYmplY3Qoc3JjKSA/IHNyYyA6IHt9XG5cblx0ICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IFV0aWwuZXh0ZW5kKGNsb25lLCBjb3B5KVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gdGFyZ2V0XG5cdH1cblxuXHRVdGlsLmVhY2ggPSBmdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcblx0ICAgIHZhciBpLCBrZXlcblx0ICAgIGlmICh0aGlzLnR5cGUob2JqKSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqOyBpKyspIHtcblx0ICAgICAgICAgICAgaXRlcmF0b3IoaSwgaSlcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XG5cdCAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGZhbHNlKSBicmVha1xuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG5cdCAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGZhbHNlKSBicmVha1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdFV0aWwudHlwZSA9IGZ1bmN0aW9uIHR5cGUob2JqKSB7XG5cdCAgICByZXR1cm4gKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkgPyBTdHJpbmcob2JqKSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXFtvYmplY3QgKFxcdyspXFxdLylbMV0udG9Mb3dlckNhc2UoKVxuXHR9XG5cblx0VXRpbC5lYWNoKCdTdHJpbmcgT2JqZWN0IEFycmF5IFJlZ0V4cCBGdW5jdGlvbicuc3BsaXQoJyAnKSwgZnVuY3Rpb24odmFsdWUpIHtcblx0ICAgIFV0aWxbJ2lzJyArIHZhbHVlXSA9IGZ1bmN0aW9uKG9iaikge1xuXHQgICAgICAgIHJldHVybiBVdGlsLnR5cGUob2JqKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKVxuXHQgICAgfVxuXHR9KVxuXG5cdFV0aWwuaXNPYmplY3RPckFycmF5ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0ICAgIHJldHVybiBVdGlsLmlzT2JqZWN0KHZhbHVlKSB8fCBVdGlsLmlzQXJyYXkodmFsdWUpXG5cdH1cblxuXHRVdGlsLmlzTnVtZXJpYyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdCAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSlcblx0fVxuXG5cdFV0aWwua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xuXHQgICAgdmFyIGtleXMgPSBbXTtcblx0ICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0ICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIGtleXMucHVzaChrZXkpXG5cdCAgICB9XG5cdCAgICByZXR1cm4ga2V5cztcblx0fVxuXHRVdGlsLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuXHQgICAgdmFyIHZhbHVlcyA9IFtdO1xuXHQgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuXHQgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgdmFsdWVzLnB1c2gob2JqW2tleV0pXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdmFsdWVzO1xuXHR9XG5cblx0Lypcblx0ICAgICMjIyBNb2NrLmhlcmVkb2MoZm4pXG5cblx0ICAgICogTW9jay5oZXJlZG9jKGZuKVxuXG5cdCAgICDku6Xnm7Top4LjgIHlronlhajnmoTmlrnlvI/kuablhpnvvIjlpJrooYzvvIlIVE1MIOaooeadv+OAglxuXG5cdCAgICAqKuS9v+eUqOekuuS+iyoq5aaC5LiL5omA56S677yaXG5cblx0ICAgICAgICB2YXIgdHBsID0gTW9jay5oZXJlZG9jKGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICAvKiFcblx0ICAgICAgICB7e2VtYWlsfX17e2FnZX19XG5cdCAgICAgICAgPCEtLSBNb2NrIHsgXG5cdCAgICAgICAgICAgIGVtYWlsOiAnQEVNQUlMJyxcblx0ICAgICAgICAgICAgYWdlOiAnQElOVCgxLDEwMCknXG5cdCAgICAgICAgfSAtLT5cblx0ICAgICAgICAgICAgKlxcL1xuXHQgICAgICAgIH0pXG5cdCAgICBcblx0ICAgICoq55u45YWz6ZiF6K+7Kipcblx0ICAgICogW0NyZWF0aW5nIG11bHRpbGluZSBzdHJpbmdzIGluIEphdmFTY3JpcHRdKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODA1MTA3L2NyZWF0aW5nLW11bHRpbGluZS1zdHJpbmdzLWluLWphdmFzY3JpcHQp44CBXG5cdCovXG5cdFV0aWwuaGVyZWRvYyA9IGZ1bmN0aW9uIGhlcmVkb2MoZm4pIHtcblx0ICAgIC8vIDEuIOenu+mZpOi1t+Wni+eahCBmdW5jdGlvbigpeyAvKiFcblx0ICAgIC8vIDIuIOenu+mZpOacq+WwvueahCAqLyB9XG5cdCAgICAvLyAzLiDnp7vpmaTotbflp4vlkozmnKvlsL7nmoTnqbrmoLxcblx0ICAgIHJldHVybiBmbi50b1N0cmluZygpXG5cdCAgICAgICAgLnJlcGxhY2UoL15bXlxcL10rXFwvXFwqIT8vLCAnJylcblx0ICAgICAgICAucmVwbGFjZSgvXFwqXFwvW15cXC9dKyQvLCAnJylcblx0ICAgICAgICAucmVwbGFjZSgvXltcXHNcXHhBMF0rLywgJycpLnJlcGxhY2UoL1tcXHNcXHhBMF0rJC8sICcnKSAvLyAudHJpbSgpXG5cdH1cblxuXHRVdGlsLm5vb3AgPSBmdW5jdGlvbigpIHt9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBVdGlsXG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHRcdCMjIFBhcnNlclxuXG5cdFx06Kej5p6Q5pWw5o2u5qih5p2/77yI5bGe5oCn5ZCN6YOo5YiG77yJ44CCXG5cblx0XHQqIFBhcnNlci5wYXJzZSggbmFtZSApXG5cdFx0XHRcblx0XHRcdGBgYGpzb25cblx0XHRcdHtcblx0XHRcdFx0cGFyYW1ldGVyczogWyBuYW1lLCBpbmMsIHJhbmdlLCBkZWNpbWFsIF0sXG5cdFx0XHRcdHJuYWdlOiBbIG1pbiAsIG1heCBdLFxuXG5cdFx0XHRcdG1pbjogbWluLFxuXHRcdFx0XHRtYXg6IG1heCxcblx0XHRcdFx0Y291bnQgOiBjb3VudCxcblxuXHRcdFx0XHRkZWNpbWFsOiBkZWNpbWFsLFxuXHRcdFx0XHRkbWluOiBkbWluLFxuXHRcdFx0XHRkbWF4OiBkbWF4LFxuXHRcdFx0XHRkY291bnQ6IGRjb3VudFxuXHRcdFx0fVxuXHRcdFx0YGBgXG5cdCAqL1xuXG5cdHZhciBDb25zdGFudCA9IF9fd2VicGFja19yZXF1aXJlX18oMilcblx0dmFyIFJhbmRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcblxuXHQvKiBqc2hpbnQgLVcwNDEgKi9cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0cGFyc2U6IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHRcdG5hbWUgPSBuYW1lID09IHVuZGVmaW5lZCA/ICcnIDogKG5hbWUgKyAnJylcblxuXHRcdFx0dmFyIHBhcmFtZXRlcnMgPSAobmFtZSB8fCAnJykubWF0Y2goQ29uc3RhbnQuUkVfS0VZKVxuXG5cdFx0XHR2YXIgcmFuZ2UgPSBwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnNbM10gJiYgcGFyYW1ldGVyc1szXS5tYXRjaChDb25zdGFudC5SRV9SQU5HRSlcblx0XHRcdHZhciBtaW4gPSByYW5nZSAmJiByYW5nZVsxXSAmJiBwYXJzZUludChyYW5nZVsxXSwgMTApIC8vIHx8IDFcblx0XHRcdHZhciBtYXggPSByYW5nZSAmJiByYW5nZVsyXSAmJiBwYXJzZUludChyYW5nZVsyXSwgMTApIC8vIHx8IDFcblx0XHRcdFx0Ly8gcmVwZWF0IHx8IG1pbi1tYXggfHwgMVxuXHRcdFx0XHQvLyB2YXIgY291bnQgPSByYW5nZSA/ICFyYW5nZVsyXSAmJiBwYXJzZUludChyYW5nZVsxXSwgMTApIHx8IFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KSA6IDFcblx0XHRcdHZhciBjb3VudCA9IHJhbmdlID8gIXJhbmdlWzJdID8gcGFyc2VJbnQocmFuZ2VbMV0sIDEwKSA6IFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KSA6IHVuZGVmaW5lZFxuXG5cdFx0XHR2YXIgZGVjaW1hbCA9IHBhcmFtZXRlcnMgJiYgcGFyYW1ldGVyc1s0XSAmJiBwYXJhbWV0ZXJzWzRdLm1hdGNoKENvbnN0YW50LlJFX1JBTkdFKVxuXHRcdFx0dmFyIGRtaW4gPSBkZWNpbWFsICYmIGRlY2ltYWxbMV0gJiYgcGFyc2VJbnQoZGVjaW1hbFsxXSwgMTApIC8vIHx8IDAsXG5cdFx0XHR2YXIgZG1heCA9IGRlY2ltYWwgJiYgZGVjaW1hbFsyXSAmJiBwYXJzZUludChkZWNpbWFsWzJdLCAxMCkgLy8gfHwgMCxcblx0XHRcdFx0Ly8gaW50IHx8IGRtaW4tZG1heCB8fCAwXG5cdFx0XHR2YXIgZGNvdW50ID0gZGVjaW1hbCA/ICFkZWNpbWFsWzJdICYmIHBhcnNlSW50KGRlY2ltYWxbMV0sIDEwKSB8fCBSYW5kb20uaW50ZWdlcihkbWluLCBkbWF4KSA6IHVuZGVmaW5lZFxuXG5cdFx0XHR2YXIgcmVzdWx0ID0ge1xuXHRcdFx0XHQvLyAxIG5hbWUsIDIgaW5jLCAzIHJhbmdlLCA0IGRlY2ltYWxcblx0XHRcdFx0cGFyYW1ldGVyczogcGFyYW1ldGVycyxcblx0XHRcdFx0Ly8gMSBtaW4sIDIgbWF4XG5cdFx0XHRcdHJhbmdlOiByYW5nZSxcblx0XHRcdFx0bWluOiBtaW4sXG5cdFx0XHRcdG1heDogbWF4LFxuXHRcdFx0XHQvLyBtaW4tbWF4XG5cdFx0XHRcdGNvdW50OiBjb3VudCxcblx0XHRcdFx0Ly8g5piv5ZCm5pyJIGRlY2ltYWxcblx0XHRcdFx0ZGVjaW1hbDogZGVjaW1hbCxcblx0XHRcdFx0ZG1pbjogZG1pbixcblx0XHRcdFx0ZG1heDogZG1heCxcblx0XHRcdFx0Ly8gZG1pbi1kaW1heFxuXHRcdFx0XHRkY291bnQ6IGRjb3VudFxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKHZhciByIGluIHJlc3VsdCkge1xuXHRcdFx0XHRpZiAocmVzdWx0W3JdICE9IHVuZGVmaW5lZCkgcmV0dXJuIHJlc3VsdFxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4ge31cblx0XHR9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyBNb2NrLlJhbmRvbVxuXHQgICAgXG5cdCAgICDlt6XlhbfnsbvvvIznlKjkuo7nlJ/miJDlkITnp43pmo/mnLrmlbDmja7jgIJcblx0Ki9cblxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblxuXHR2YXIgUmFuZG9tID0ge1xuXHQgICAgZXh0ZW5kOiBVdGlsLmV4dGVuZFxuXHR9XG5cblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDYpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oNykpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXyg4KSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IFJhbmRvbVxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIEJhc2ljc1xuXHQqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuueahOW4g+WwlOWAvOOAglxuXHQgICAgYm9vbGVhbjogZnVuY3Rpb24obWluLCBtYXgsIGN1cikge1xuXHQgICAgICAgIGlmIChjdXIgIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICBtaW4gPSB0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyAmJiAhaXNOYU4obWluKSA/IHBhcnNlSW50KG1pbiwgMTApIDogMVxuXHQgICAgICAgICAgICBtYXggPSB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJyAmJiAhaXNOYU4obWF4KSA/IHBhcnNlSW50KG1heCwgMTApIDogMVxuXHQgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDEuMCAvIChtaW4gKyBtYXgpICogbWluID8gIWN1ciA6IGN1clxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID49IDAuNVxuXHQgICAgfSxcblx0ICAgIGJvb2w6IGZ1bmN0aW9uKG1pbiwgbWF4LCBjdXIpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5ib29sZWFuKG1pbiwgbWF4LCBjdXIpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE6Ieq54S25pWw77yI5aSn5LqO562J5LqOIDAg55qE5pW05pWw77yJ44CCXG5cdCAgICBuYXR1cmFsOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnID8gcGFyc2VJbnQobWluLCAxMCkgOiAwXG5cdCAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgPyBwYXJzZUludChtYXgsIDEwKSA6IDkwMDcxOTkyNTQ3NDA5OTIgLy8gMl41M1xuXHQgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW5cblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTmlbTmlbDjgIJcblx0ICAgIGludGVnZXI6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgbWluID0gdHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgPyBwYXJzZUludChtaW4sIDEwKSA6IC05MDA3MTk5MjU0NzQwOTkyXG5cdCAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgPyBwYXJzZUludChtYXgsIDEwKSA6IDkwMDcxOTkyNTQ3NDA5OTIgLy8gMl41M1xuXHQgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW5cblx0ICAgIH0sXG5cdCAgICBpbnQ6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuaW50ZWdlcihtaW4sIG1heClcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTmta7ngrnmlbDjgIJcblx0ICAgIGZsb2F0OiBmdW5jdGlvbihtaW4sIG1heCwgZG1pbiwgZG1heCkge1xuXHQgICAgICAgIGRtaW4gPSBkbWluID09PSB1bmRlZmluZWQgPyAwIDogZG1pblxuXHQgICAgICAgIGRtaW4gPSBNYXRoLm1heChNYXRoLm1pbihkbWluLCAxNyksIDApXG5cdCAgICAgICAgZG1heCA9IGRtYXggPT09IHVuZGVmaW5lZCA/IDE3IDogZG1heFxuXHQgICAgICAgIGRtYXggPSBNYXRoLm1heChNYXRoLm1pbihkbWF4LCAxNyksIDApXG5cdCAgICAgICAgdmFyIHJldCA9IHRoaXMuaW50ZWdlcihtaW4sIG1heCkgKyAnLic7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDAsIGRjb3VudCA9IHRoaXMubmF0dXJhbChkbWluLCBkbWF4KTsgaSA8IGRjb3VudDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJldCArPSAoXG5cdCAgICAgICAgICAgICAgICAvLyDmnIDlkI7kuIDkvY3kuI3og73kuLogMO+8muWmguaenOacgOWQjuS4gOS9jeS4uiAw77yM5Lya6KKrIEpTIOW8leaTjuW/veeVpeaOieOAglxuXHQgICAgICAgICAgICAgICAgKGkgPCBkY291bnQgLSAxKSA/IHRoaXMuY2hhcmFjdGVyKCdudW1iZXInKSA6IHRoaXMuY2hhcmFjdGVyKCcxMjM0NTY3ODknKVxuXHQgICAgICAgICAgICApXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHJldCwgMTApXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py65a2X56ym44CCXG5cdCAgICBjaGFyYWN0ZXI6IGZ1bmN0aW9uKHBvb2wpIHtcblx0ICAgICAgICB2YXIgcG9vbHMgPSB7XG5cdCAgICAgICAgICAgIGxvd2VyOiAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonLFxuXHQgICAgICAgICAgICB1cHBlcjogJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJyxcblx0ICAgICAgICAgICAgbnVtYmVyOiAnMDEyMzQ1Njc4OScsXG5cdCAgICAgICAgICAgIHN5bWJvbDogJyFAIyQlXiYqKClbXSdcblx0ICAgICAgICB9XG5cdCAgICAgICAgcG9vbHMuYWxwaGEgPSBwb29scy5sb3dlciArIHBvb2xzLnVwcGVyXG5cdCAgICAgICAgcG9vbHNbJ3VuZGVmaW5lZCddID0gcG9vbHMubG93ZXIgKyBwb29scy51cHBlciArIHBvb2xzLm51bWJlciArIHBvb2xzLnN5bWJvbFxuXG5cdCAgICAgICAgcG9vbCA9IHBvb2xzWygnJyArIHBvb2wpLnRvTG93ZXJDYXNlKCldIHx8IHBvb2xcblx0ICAgICAgICByZXR1cm4gcG9vbC5jaGFyQXQodGhpcy5uYXR1cmFsKDAsIHBvb2wubGVuZ3RoIC0gMSkpXG5cdCAgICB9LFxuXHQgICAgY2hhcjogZnVuY3Rpb24ocG9vbCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3Rlcihwb29sKVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuuWtl+espuS4suOAglxuXHQgICAgc3RyaW5nOiBmdW5jdGlvbihwb29sLCBtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW5cblx0ICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgY2FzZSAwOiAvLyAoKVxuXHQgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5uYXR1cmFsKDMsIDcpXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDE6IC8vICggbGVuZ3RoIClcblx0ICAgICAgICAgICAgICAgIGxlbiA9IHBvb2xcblx0ICAgICAgICAgICAgICAgIHBvb2wgPSB1bmRlZmluZWRcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMjpcblx0ICAgICAgICAgICAgICAgIC8vICggcG9vbCwgbGVuZ3RoIClcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxlbiA9IG1pblxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyAoIG1pbiwgbWF4IClcblx0ICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLm5hdHVyYWwocG9vbCwgbWluKVxuXHQgICAgICAgICAgICAgICAgICAgIHBvb2wgPSB1bmRlZmluZWRcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMzpcblx0ICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubmF0dXJhbChtaW4sIG1heClcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIHRleHQgPSAnJ1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgdGV4dCArPSB0aGlzLmNoYXJhY3Rlcihwb29sKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiB0ZXh0XG5cdCAgICB9LFxuXHQgICAgc3RyOiBmdW5jdGlvbiggLypwb29sLCBtaW4sIG1heCovICkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnN0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq5pW05Z6L5pWw57uE44CCXG5cdCAgICByYW5nZTogZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcblx0ICAgICAgICAvLyByYW5nZSggc3RvcCApXG5cdCAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSkge1xuXHQgICAgICAgICAgICBzdG9wID0gc3RhcnQgfHwgMDtcblx0ICAgICAgICAgICAgc3RhcnQgPSAwO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyByYW5nZSggc3RhcnQsIHN0b3AgKVxuXHQgICAgICAgIHN0ZXAgPSBhcmd1bWVudHNbMl0gfHwgMTtcblxuXHQgICAgICAgIHN0YXJ0ID0gK3N0YXJ0XG5cdCAgICAgICAgc3RvcCA9ICtzdG9wXG5cdCAgICAgICAgc3RlcCA9ICtzdGVwXG5cblx0ICAgICAgICB2YXIgbGVuID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xuXHQgICAgICAgIHZhciBpZHggPSAwO1xuXHQgICAgICAgIHZhciByYW5nZSA9IG5ldyBBcnJheShsZW4pO1xuXG5cdCAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuXHQgICAgICAgICAgICByYW5nZVtpZHgrK10gPSBzdGFydDtcblx0ICAgICAgICAgICAgc3RhcnQgKz0gc3RlcDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gcmFuZ2U7XG5cdCAgICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBEYXRlXG5cdCovXG5cdHZhciBwYXR0ZXJuTGV0dGVycyA9IHtcblx0ICAgIHl5eXk6ICdnZXRGdWxsWWVhcicsXG5cdCAgICB5eTogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHJldHVybiAoJycgKyBkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKDIpXG5cdCAgICB9LFxuXHQgICAgeTogJ3l5JyxcblxuXHQgICAgTU06IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDFcblx0ICAgICAgICByZXR1cm4gbSA8IDEwID8gJzAnICsgbSA6IG1cblx0ICAgIH0sXG5cdCAgICBNOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDFcblx0ICAgIH0sXG5cblx0ICAgIGRkOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgdmFyIGQgPSBkYXRlLmdldERhdGUoKVxuXHQgICAgICAgIHJldHVybiBkIDwgMTAgPyAnMCcgKyBkIDogZFxuXHQgICAgfSxcblx0ICAgIGQ6ICdnZXREYXRlJyxcblxuXHQgICAgSEg6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKVxuXHQgICAgICAgIHJldHVybiBoIDwgMTAgPyAnMCcgKyBoIDogaFxuXHQgICAgfSxcblx0ICAgIEg6ICdnZXRIb3VycycsXG5cdCAgICBoaDogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpICUgMTJcblx0ICAgICAgICByZXR1cm4gaCA8IDEwID8gJzAnICsgaCA6IGhcblx0ICAgIH0sXG5cdCAgICBoOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSAlIDEyXG5cdCAgICB9LFxuXG5cdCAgICBtbTogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNaW51dGVzKClcblx0ICAgICAgICByZXR1cm4gbSA8IDEwID8gJzAnICsgbSA6IG1cblx0ICAgIH0sXG5cdCAgICBtOiAnZ2V0TWludXRlcycsXG5cblx0ICAgIHNzOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgdmFyIHMgPSBkYXRlLmdldFNlY29uZHMoKVxuXHQgICAgICAgIHJldHVybiBzIDwgMTAgPyAnMCcgKyBzIDogc1xuXHQgICAgfSxcblx0ICAgIHM6ICdnZXRTZWNvbmRzJyxcblxuXHQgICAgU1M6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICB2YXIgbXMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdCAgICAgICAgcmV0dXJuIG1zIDwgMTAgJiYgJzAwJyArIG1zIHx8IG1zIDwgMTAwICYmICcwJyArIG1zIHx8IG1zXG5cdCAgICB9LFxuXHQgICAgUzogJ2dldE1pbGxpc2Vjb25kcycsXG5cblx0ICAgIEE6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyAnQU0nIDogJ1BNJ1xuXHQgICAgfSxcblx0ICAgIGE6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyAnYW0nIDogJ3BtJ1xuXHQgICAgfSxcblx0ICAgIFQ6ICdnZXRUaW1lJ1xuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy8g5pel5pyf5Y2g5L2N56ym6ZuG5ZCI44CCXG5cdCAgICBfcGF0dGVybkxldHRlcnM6IHBhdHRlcm5MZXR0ZXJzLFxuXHQgICAgLy8g5pel5pyf5Y2g5L2N56ym5q2j5YiZ44CCXG5cdCAgICBfcmZvcm1hdDogbmV3IFJlZ0V4cCgoZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIHJlID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpIGluIHBhdHRlcm5MZXR0ZXJzKSByZS5wdXNoKGkpXG5cdCAgICAgICAgcmV0dXJuICcoJyArIHJlLmpvaW4oJ3wnKSArICcpJ1xuXHQgICAgfSkoKSwgJ2cnKSxcblx0ICAgIC8vIOagvOW8j+WMluaXpeacn+OAglxuXHQgICAgX2Zvcm1hdERhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCkge1xuXHQgICAgICAgIHJldHVybiBmb3JtYXQucmVwbGFjZSh0aGlzLl9yZm9ybWF0LCBmdW5jdGlvbiBjcmVhdE5ld1N1YlN0cmluZygkMCwgZmxhZykge1xuXHQgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBhdHRlcm5MZXR0ZXJzW2ZsYWddID09PSAnZnVuY3Rpb24nID8gcGF0dGVybkxldHRlcnNbZmxhZ10oZGF0ZSkgOlxuXHQgICAgICAgICAgICAgICAgcGF0dGVybkxldHRlcnNbZmxhZ10gaW4gcGF0dGVybkxldHRlcnMgPyBjcmVhdE5ld1N1YlN0cmluZygkMCwgcGF0dGVybkxldHRlcnNbZmxhZ10pIDpcblx0ICAgICAgICAgICAgICAgIGRhdGVbcGF0dGVybkxldHRlcnNbZmxhZ11dKClcblx0ICAgICAgICB9KVxuXHQgICAgfSxcblx0ICAgIC8vIOeUn+aIkOS4gOS4qumaj+acuueahCBEYXRlIOWvueixoeOAglxuXHQgICAgX3JhbmRvbURhdGU6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7IC8vIG1pbiwgbWF4XG5cdCAgICAgICAgbWluID0gbWluID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgwKSA6IG1pblxuXHQgICAgICAgIG1heCA9IG1heCA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUoKSA6IG1heFxuXHQgICAgICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLnJhbmRvbSgpICogKG1heC5nZXRUaW1lKCkgLSBtaW4uZ2V0VGltZSgpKSlcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTml6XmnJ/lrZfnrKbkuLLjgIJcblx0ICAgIGRhdGU6IGZ1bmN0aW9uKGZvcm1hdCkge1xuXHQgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXl5eS1NTS1kZCdcblx0ICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0RGF0ZSh0aGlzLl9yYW5kb21EYXRlKCksIGZvcm1hdClcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTml7bpl7TlrZfnrKbkuLLjgIJcblx0ICAgIHRpbWU6IGZ1bmN0aW9uKGZvcm1hdCkge1xuXHQgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnSEg6bW06c3MnXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fcmFuZG9tRGF0ZSgpLCBmb3JtYXQpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE5pel5pyf5ZKM5pe26Ze05a2X56ym5Liy44CCXG5cdCAgICBkYXRldGltZTogZnVuY3Rpb24oZm9ybWF0KSB7XG5cdCAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xuXHQgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXREYXRlKHRoaXMuX3JhbmRvbURhdGUoKSwgZm9ybWF0KVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuW9k+WJjeeahOaXpeacn+WSjOaXtumXtOWtl+espuS4suOAglxuXHQgICAgbm93OiBmdW5jdGlvbih1bml0LCBmb3JtYXQpIHtcblx0ICAgICAgICAvLyBub3codW5pdCkgbm93KGZvcm1hdClcblx0ICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHQgICAgICAgICAgICAvLyBub3coZm9ybWF0KVxuXHQgICAgICAgICAgICBpZiAoIS95ZWFyfG1vbnRofGRheXxob3VyfG1pbnV0ZXxzZWNvbmR8d2Vlay8udGVzdCh1bml0KSkge1xuXHQgICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5pdFxuXHQgICAgICAgICAgICAgICAgdW5pdCA9ICcnXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdW5pdCA9ICh1bml0IHx8ICcnKS50b0xvd2VyQ2FzZSgpXG5cdCAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xuXG5cdCAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG5cblx0ICAgICAgICAvKiBqc2hpbnQgLVcwODYgKi9cblx0ICAgICAgICAvLyDlj4LogIPoh6ogaHR0cDovL21vbWVudGpzLmNuL2RvY3MvIy9tYW5pcHVsYXRpbmcvc3RhcnQtb2YvXG5cdCAgICAgICAgc3dpdGNoICh1bml0KSB7XG5cdCAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuXHQgICAgICAgICAgICAgICAgZGF0ZS5zZXRNb250aCgwKVxuXHQgICAgICAgICAgICBjYXNlICdtb250aCc6XG5cdCAgICAgICAgICAgICAgICBkYXRlLnNldERhdGUoMSlcblx0ICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG5cdCAgICAgICAgICAgIGNhc2UgJ2RheSc6XG5cdCAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKDApXG5cdCAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuXHQgICAgICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKDApXG5cdCAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG5cdCAgICAgICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoMClcblx0ICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcblx0ICAgICAgICAgICAgICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHN3aXRjaCAodW5pdCkge1xuXHQgICAgICAgICAgICBjYXNlICd3ZWVrJzpcblx0ICAgICAgICAgICAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIGRhdGUuZ2V0RGF5KCkpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdERhdGUoZGF0ZSwgZm9ybWF0KVxuXHQgICAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiA4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24obW9kdWxlKSB7LyogZ2xvYmFsIGRvY3VtZW50ICAqL1xuXHQvKlxuXHQgICAgIyMgSW1hZ2Vcblx0Ki9cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvLyDluLjop4HnmoTlub/lkYrlrr3pq5hcblx0ICAgIF9hZFNpemU6IFtcblx0ICAgICAgICAnMzAweDI1MCcsICcyNTB4MjUwJywgJzI0MHg0MDAnLCAnMzM2eDI4MCcsICcxODB4MTUwJyxcblx0ICAgICAgICAnNzIweDMwMCcsICc0Njh4NjAnLCAnMjM0eDYwJywgJzg4eDMxJywgJzEyMHg5MCcsXG5cdCAgICAgICAgJzEyMHg2MCcsICcxMjB4MjQwJywgJzEyNXgxMjUnLCAnNzI4eDkwJywgJzE2MHg2MDAnLFxuXHQgICAgICAgICcxMjB4NjAwJywgJzMwMHg2MDAnXG5cdCAgICBdLFxuXHQgICAgLy8g5bi46KeB55qE5bGP5bmV5a696auYXG5cdCAgICBfc2NyZWVuU2l6ZTogW1xuXHQgICAgICAgICczMjB4MjAwJywgJzMyMHgyNDAnLCAnNjQweDQ4MCcsICc4MDB4NDgwJywgJzgwMHg0ODAnLFxuXHQgICAgICAgICcxMDI0eDYwMCcsICcxMDI0eDc2OCcsICcxMjgweDgwMCcsICcxNDQweDkwMCcsICcxOTIweDEyMDAnLFxuXHQgICAgICAgICcyNTYweDE2MDAnXG5cdCAgICBdLFxuXHQgICAgLy8g5bi46KeB55qE6KeG6aKR5a696auYXG5cdCAgICBfdmlkZW9TaXplOiBbJzcyMHg0ODAnLCAnNzY4eDU3NicsICcxMjgweDcyMCcsICcxOTIweDEwODAnXSxcblx0ICAgIC8qXG5cdCAgICAgICAg55Sf5oiQ5LiA5Liq6ZqP5py655qE5Zu+54mH5Zyw5Z2A44CCXG5cblx0ICAgICAgICDmm7/ku6Plm77niYfmupBcblx0ICAgICAgICAgICAgaHR0cDovL2Zwb2ltZy5jb20vXG5cdCAgICAgICAg5Y+C6ICD6IeqIFxuXHQgICAgICAgICAgICBodHRwOi8vcmVuc2FubmluZy5pdGV5ZS5jb20vYmxvZy8xOTMzMzEwXG5cdCAgICAgICAgICAgIGh0dHA6Ly9jb2RlLnR1dHNwbHVzLmNvbS9hcnRpY2xlcy90aGUtdG9wLTgtcGxhY2Vob2xkZXJzLWZvci13ZWItZGVzaWduZXJzLS1uZXQtMTk0ODVcblx0ICAgICovXG5cdCAgICBpbWFnZTogZnVuY3Rpb24oc2l6ZSwgYmFja2dyb3VuZCwgZm9yZWdyb3VuZCwgZm9ybWF0LCB0ZXh0KSB7XG5cdCAgICAgICAgLy8gUmFuZG9tLmltYWdlKCBzaXplLCBiYWNrZ3JvdW5kLCBmb3JlZ3JvdW5kLCB0ZXh0IClcblx0ICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuXHQgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0XG5cdCAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZFxuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBSYW5kb20uaW1hZ2UoIHNpemUsIGJhY2tncm91bmQsIHRleHQgKVxuXHQgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG5cdCAgICAgICAgICAgIHRleHQgPSBmb3JlZ3JvdW5kXG5cdCAgICAgICAgICAgIGZvcmVncm91bmQgPSB1bmRlZmluZWRcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gUmFuZG9tLmltYWdlKClcblx0ICAgICAgICBpZiAoIXNpemUpIHNpemUgPSB0aGlzLnBpY2sodGhpcy5fYWRTaXplKVxuXG5cdCAgICAgICAgaWYgKGJhY2tncm91bmQgJiYgfmJhY2tncm91bmQuaW5kZXhPZignIycpKSBiYWNrZ3JvdW5kID0gYmFja2dyb3VuZC5zbGljZSgxKVxuXHQgICAgICAgIGlmIChmb3JlZ3JvdW5kICYmIH5mb3JlZ3JvdW5kLmluZGV4T2YoJyMnKSkgZm9yZWdyb3VuZCA9IGZvcmVncm91bmQuc2xpY2UoMSlcblxuXHQgICAgICAgIC8vIGh0dHA6Ly9kdW1teWltYWdlLmNvbS82MDB4NDAwL2NjMDBjYy80NzAwNDcucG5nJnRleHQ9aGVsbG9cblx0ICAgICAgICByZXR1cm4gJ2h0dHA6Ly9kdW1teWltYWdlLmNvbS8nICsgc2l6ZSArXG5cdCAgICAgICAgICAgIChiYWNrZ3JvdW5kID8gJy8nICsgYmFja2dyb3VuZCA6ICcnKSArXG5cdCAgICAgICAgICAgIChmb3JlZ3JvdW5kID8gJy8nICsgZm9yZWdyb3VuZCA6ICcnKSArXG5cdCAgICAgICAgICAgIChmb3JtYXQgPyAnLicgKyBmb3JtYXQgOiAnJykgK1xuXHQgICAgICAgICAgICAodGV4dCA/ICcmdGV4dD0nICsgdGV4dCA6ICcnKVxuXHQgICAgfSxcblx0ICAgIGltZzogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2UuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHQgICAgfSxcblxuXHQgICAgLypcblx0ICAgICAgICBCcmFuZENvbG9yc1xuXHQgICAgICAgIGh0dHA6Ly9icmFuZGNvbG9ycy5uZXQvXG5cdCAgICAgICAgQSBjb2xsZWN0aW9uIG9mIG1ham9yIGJyYW5kIGNvbG9yIGNvZGVzIGN1cmF0ZWQgYnkgR2FsZW4gR2lkbWFuLlxuXHQgICAgICAgIOWkp+eJjOWFrOWPuOeahOminOiJsumbhuWQiFxuXG5cdCAgICAgICAgLy8g6I635Y+W5ZOB54mM5ZKM6aKc6ImyXG5cdCAgICAgICAgJCgnaDInKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBpdGVtKXtcblx0ICAgICAgICAgICAgaXRlbSA9ICQoaXRlbSlcblx0ICAgICAgICAgICAgY29uc29sZS5sb2coJ1xcJycgKyBpdGVtLnRleHQoKSArICdcXCcnLCAnOicsICdcXCcnICsgaXRlbS5uZXh0KCkudGV4dCgpICsgJ1xcJycsICcsJylcblx0ICAgICAgICB9KVxuXHQgICAgKi9cblx0ICAgIF9icmFuZENvbG9yczoge1xuXHQgICAgICAgICc0b3JtYXQnOiAnI2ZiMGEyYScsXG5cdCAgICAgICAgJzUwMHB4JzogJyMwMmFkZWEnLFxuXHQgICAgICAgICdBYm91dC5tZSAoYmx1ZSknOiAnIzAwNDA1ZCcsXG5cdCAgICAgICAgJ0Fib3V0Lm1lICh5ZWxsb3cpJzogJyNmZmNjMzMnLFxuXHQgICAgICAgICdBZGR2b2NhdGUnOiAnI2ZmNjEzOCcsXG5cdCAgICAgICAgJ0Fkb2JlJzogJyNmZjAwMDAnLFxuXHQgICAgICAgICdBaW0nOiAnI2ZjZDIwYicsXG5cdCAgICAgICAgJ0FtYXpvbic6ICcjZTQ3OTExJyxcblx0ICAgICAgICAnQW5kcm9pZCc6ICcjYTRjNjM5Jyxcblx0ICAgICAgICAnQW5naWVcXCdzIExpc3QnOiAnIzdmYmIwMCcsXG5cdCAgICAgICAgJ0FPTCc6ICcjMDA2MGEzJyxcblx0ICAgICAgICAnQXRsYXNzaWFuJzogJyMwMDMzNjYnLFxuXHQgICAgICAgICdCZWhhbmNlJzogJyMwNTNlZmYnLFxuXHQgICAgICAgICdCaWcgQ2FydGVsJzogJyM5N2I1MzgnLFxuXHQgICAgICAgICdiaXRseSc6ICcjZWU2MTIzJyxcblx0ICAgICAgICAnQmxvZ2dlcic6ICcjZmM0ZjA4Jyxcblx0ICAgICAgICAnQm9laW5nJzogJyMwMDM5YTYnLFxuXHQgICAgICAgICdCb29raW5nLmNvbSc6ICcjMDAzNTgwJyxcblx0ICAgICAgICAnQ2FyYm9ubWFkZSc6ICcjNjEzODU0Jyxcblx0ICAgICAgICAnQ2hlZGRhcic6ICcjZmY3MjQzJyxcblx0ICAgICAgICAnQ29kZSBTY2hvb2wnOiAnIzNkNDk0NCcsXG5cdCAgICAgICAgJ0RlbGljaW91cyc6ICcjMjA1Y2MwJyxcblx0ICAgICAgICAnRGVsbCc6ICcjMzI4N2MxJyxcblx0ICAgICAgICAnRGVzaWdubW9vJzogJyNlNTRhNGYnLFxuXHQgICAgICAgICdEZXZpYW50YXJ0JzogJyM0ZTYyNTInLFxuXHQgICAgICAgICdEZXNpZ25lciBOZXdzJzogJyMyZDcyZGEnLFxuXHQgICAgICAgICdEZXZvdXInOiAnI2ZkMDAwMScsXG5cdCAgICAgICAgJ0RFV0FMVCc6ICcjZmViZDE3Jyxcblx0ICAgICAgICAnRGlzcXVzIChibHVlKSc6ICcjNTlhM2ZjJyxcblx0ICAgICAgICAnRGlzcXVzIChvcmFuZ2UpJzogJyNkYjcxMzInLFxuXHQgICAgICAgICdEcmliYmJsZSc6ICcjZWE0Yzg5Jyxcblx0ICAgICAgICAnRHJvcGJveCc6ICcjM2Q5YWU4Jyxcblx0ICAgICAgICAnRHJ1cGFsJzogJyMwYzc2YWInLFxuXHQgICAgICAgICdEdW5rZWQnOiAnIzJhMzIzYScsXG5cdCAgICAgICAgJ2VCYXknOiAnIzg5YzUwNycsXG5cdCAgICAgICAgJ0VtYmVyJzogJyNmMDVlMWInLFxuXHQgICAgICAgICdFbmdhZGdldCc6ICcjMDBiZGY2Jyxcblx0ICAgICAgICAnRW52YXRvJzogJyM1MjgwMzYnLFxuXHQgICAgICAgICdFdHN5JzogJyNlYjZkMjAnLFxuXHQgICAgICAgICdFdmVybm90ZSc6ICcjNWJhNTI1Jyxcblx0ICAgICAgICAnRmFiLmNvbSc6ICcjZGQwMDE3Jyxcblx0ICAgICAgICAnRmFjZWJvb2snOiAnIzNiNTk5OCcsXG5cdCAgICAgICAgJ0ZpcmVmb3gnOiAnI2U2NjAwMCcsXG5cdCAgICAgICAgJ0ZsaWNrciAoYmx1ZSknOiAnIzAwNjNkYycsXG5cdCAgICAgICAgJ0ZsaWNrciAocGluayknOiAnI2ZmMDA4NCcsXG5cdCAgICAgICAgJ0ZvcnJzdCc6ICcjNWI5YTY4Jyxcblx0ICAgICAgICAnRm91cnNxdWFyZSc6ICcjMjVhMGNhJyxcblx0ICAgICAgICAnR2FybWluJzogJyMwMDdjYzMnLFxuXHQgICAgICAgICdHZXRHbHVlJzogJyMyZDc1YTInLFxuXHQgICAgICAgICdHaW1tZWJhcic6ICcjZjcwMDc4Jyxcblx0ICAgICAgICAnR2l0SHViJzogJyMxNzE1MTUnLFxuXHQgICAgICAgICdHb29nbGUgQmx1ZSc6ICcjMDE0MGNhJyxcblx0ICAgICAgICAnR29vZ2xlIEdyZWVuJzogJyMxNmE2MWUnLFxuXHQgICAgICAgICdHb29nbGUgUmVkJzogJyNkZDE4MTInLFxuXHQgICAgICAgICdHb29nbGUgWWVsbG93JzogJyNmY2NhMDMnLFxuXHQgICAgICAgICdHb29nbGUrJzogJyNkZDRiMzknLFxuXHQgICAgICAgICdHcm9vdmVzaGFyayc6ICcjZjc3ZjAwJyxcblx0ICAgICAgICAnR3JvdXBvbic6ICcjODJiNTQ4Jyxcblx0ICAgICAgICAnSGFja2VyIE5ld3MnOiAnI2ZmNjYwMCcsXG5cdCAgICAgICAgJ0hlbGxvV2FsbGV0JzogJyMwMDg1Y2EnLFxuXHQgICAgICAgICdIZXJva3UgKGxpZ2h0KSc6ICcjYzdjNWU2Jyxcblx0ICAgICAgICAnSGVyb2t1IChkYXJrKSc6ICcjNjU2N2E1Jyxcblx0ICAgICAgICAnSG9vdFN1aXRlJzogJyMwMDMzNjYnLFxuXHQgICAgICAgICdIb3V6eic6ICcjNzNiYTM3Jyxcblx0ICAgICAgICAnSFRNTDUnOiAnI2VjNjIzMScsXG5cdCAgICAgICAgJ0lLRUEnOiAnI2ZmY2MzMycsXG5cdCAgICAgICAgJ0lNRGInOiAnI2YzY2UxMycsXG5cdCAgICAgICAgJ0luc3RhZ3JhbSc6ICcjM2Y3MjliJyxcblx0ICAgICAgICAnSW50ZWwnOiAnIzAwNzFjNScsXG5cdCAgICAgICAgJ0ludHVpdCc6ICcjMzY1ZWJmJyxcblx0ICAgICAgICAnS2lja3N0YXJ0ZXInOiAnIzc2Y2MxZScsXG5cdCAgICAgICAgJ2tpcHB0JzogJyNlMDM1MDAnLFxuXHQgICAgICAgICdLb2RlcnknOiAnIzAwYWY4MScsXG5cdCAgICAgICAgJ0xhc3RGTSc6ICcjYzMwMDBkJyxcblx0ICAgICAgICAnTGlua2VkSW4nOiAnIzBlNzZhOCcsXG5cdCAgICAgICAgJ0xpdmVzdHJlYW0nOiAnI2NmMDAwNScsXG5cdCAgICAgICAgJ0x1bW8nOiAnIzU3NjM5NicsXG5cdCAgICAgICAgJ01peHBhbmVsJzogJyNhMDg2ZDMnLFxuXHQgICAgICAgICdNZWV0dXAnOiAnI2U1MTkzNycsXG5cdCAgICAgICAgJ05va2lhJzogJyMxODM2OTMnLFxuXHQgICAgICAgICdOVklESUEnOiAnIzc2YjkwMCcsXG5cdCAgICAgICAgJ09wZXJhJzogJyNjYzBmMTYnLFxuXHQgICAgICAgICdQYXRoJzogJyNlNDFmMTEnLFxuXHQgICAgICAgICdQYXlQYWwgKGRhcmspJzogJyMxZTQ3N2EnLFxuXHQgICAgICAgICdQYXlQYWwgKGxpZ2h0KSc6ICcjM2I3YmJmJyxcblx0ICAgICAgICAnUGluYm9hcmQnOiAnIzAwMDBlNicsXG5cdCAgICAgICAgJ1BpbnRlcmVzdCc6ICcjYzgyMzJjJyxcblx0ICAgICAgICAnUGxheVN0YXRpb24nOiAnIzY2NWNiZScsXG5cdCAgICAgICAgJ1BvY2tldCc6ICcjZWU0MDU2Jyxcblx0ICAgICAgICAnUHJlemknOiAnIzMxOGJmZicsXG5cdCAgICAgICAgJ1B1c2hhJzogJyMwZjcxYjQnLFxuXHQgICAgICAgICdRdW9yYSc6ICcjYTgyNDAwJyxcblx0ICAgICAgICAnUVVPVEUuZm0nOiAnIzY2Y2VmZicsXG5cdCAgICAgICAgJ1JkaW8nOiAnIzAwOGZkNScsXG5cdCAgICAgICAgJ1JlYWRhYmlsaXR5JzogJyM5YzAwMDAnLFxuXHQgICAgICAgICdSZWQgSGF0JzogJyNjYzAwMDAnLFxuXHQgICAgICAgICdSZXNvdXJjZSc6ICcjN2ViNDAwJyxcblx0ICAgICAgICAnUm9ja3BhY2snOiAnIzBiYTZhYicsXG5cdCAgICAgICAgJ1Jvb24nOiAnIzYyYjBkOScsXG5cdCAgICAgICAgJ1JTUyc6ICcjZWU4MDJmJyxcblx0ICAgICAgICAnU2FsZXNmb3JjZSc6ICcjMTc5OGMxJyxcblx0ICAgICAgICAnU2Ftc3VuZyc6ICcjMGM0ZGEyJyxcblx0ICAgICAgICAnU2hvcGlmeSc6ICcjOTZiZjQ4Jyxcblx0ICAgICAgICAnU2t5cGUnOiAnIzAwYWZmMCcsXG5cdCAgICAgICAgJ1NuYWdham9iJzogJyNmNDdhMjAnLFxuXHQgICAgICAgICdTb2Z0b25pYyc6ICcjMDA4YWNlJyxcblx0ICAgICAgICAnU291bmRDbG91ZCc6ICcjZmY3NzAwJyxcblx0ICAgICAgICAnU3BhY2UgQm94JzogJyNmODY5NjAnLFxuXHQgICAgICAgICdTcG90aWZ5JzogJyM4MWI3MWEnLFxuXHQgICAgICAgICdTcHJpbnQnOiAnI2ZlZTEwMCcsXG5cdCAgICAgICAgJ1NxdWFyZXNwYWNlJzogJyMxMjEyMTInLFxuXHQgICAgICAgICdTdGFja092ZXJmbG93JzogJyNlZjgyMzYnLFxuXHQgICAgICAgICdTdGFwbGVzJzogJyNjYzAwMDAnLFxuXHQgICAgICAgICdTdGF0dXMgQ2hhcnQnOiAnI2Q3NTg0ZicsXG5cdCAgICAgICAgJ1N0cmlwZSc6ICcjMDA4Y2RkJyxcblx0ICAgICAgICAnU3R1ZHlCbHVlJzogJyMwMGFmZTEnLFxuXHQgICAgICAgICdTdHVtYmxlVXBvbic6ICcjZjc0NDI1Jyxcblx0ICAgICAgICAnVC1Nb2JpbGUnOiAnI2VhMGE4ZScsXG5cdCAgICAgICAgJ1RlY2hub3JhdGknOiAnIzQwYTgwMCcsXG5cdCAgICAgICAgJ1RoZSBOZXh0IFdlYic6ICcjZWY0NDIzJyxcblx0ICAgICAgICAnVHJlZWhvdXNlJzogJyM1Y2I4NjgnLFxuXHQgICAgICAgICdUcnVsaWEnOiAnIzVlYWIxZicsXG5cdCAgICAgICAgJ1R1bWJscic6ICcjMzQ1MjZmJyxcblx0ICAgICAgICAnVHdpdGNoLnR2JzogJyM2NDQxYTUnLFxuXHQgICAgICAgICdUd2l0dGVyJzogJyMwMGFjZWUnLFxuXHQgICAgICAgICdUWVBPMyc6ICcjZmY4NzAwJyxcblx0ICAgICAgICAnVWJ1bnR1JzogJyNkZDQ4MTQnLFxuXHQgICAgICAgICdVc3RyZWFtJzogJyMzMzg4ZmYnLFxuXHQgICAgICAgICdWZXJpem9uJzogJyNlZjFkMWQnLFxuXHQgICAgICAgICdWaW1lbyc6ICcjODZjOWVmJyxcblx0ICAgICAgICAnVmluZSc6ICcjMDBhNDc4Jyxcblx0ICAgICAgICAnVmlyYic6ICcjMDZhZmQ4Jyxcblx0ICAgICAgICAnVmlyZ2luIE1lZGlhJzogJyNjYzAwMDAnLFxuXHQgICAgICAgICdXb29nYSc6ICcjNWIwMDljJyxcblx0ICAgICAgICAnV29yZFByZXNzIChibHVlKSc6ICcjMjE3NTliJyxcblx0ICAgICAgICAnV29yZFByZXNzIChvcmFuZ2UpJzogJyNkNTRlMjEnLFxuXHQgICAgICAgICdXb3JkUHJlc3MgKGdyZXkpJzogJyM0NjQ2NDYnLFxuXHQgICAgICAgICdXdW5kZXJsaXN0JzogJyMyYjg4ZDknLFxuXHQgICAgICAgICdYQk9YJzogJyM5YmM4NDgnLFxuXHQgICAgICAgICdYSU5HJzogJyMxMjY1NjcnLFxuXHQgICAgICAgICdZYWhvbyEnOiAnIzcyMGU5ZScsXG5cdCAgICAgICAgJ1lhbmRleCc6ICcjZmZjYzAwJyxcblx0ICAgICAgICAnWWVscCc6ICcjYzQxMjAwJyxcblx0ICAgICAgICAnWW91VHViZSc6ICcjYzQzMDJiJyxcblx0ICAgICAgICAnWmFsb25nbyc6ICcjNTQ5OGRjJyxcblx0ICAgICAgICAnWmVuZGVzayc6ICcjNzhhMzAwJyxcblx0ICAgICAgICAnWmVycGx5JzogJyM5ZGNjN2EnLFxuXHQgICAgICAgICdab290b29sJzogJyM1ZThiMWQnXG5cdCAgICB9LFxuXHQgICAgX2JyYW5kTmFtZXM6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciBicmFuZHMgPSBbXTtcblx0ICAgICAgICBmb3IgKHZhciBiIGluIHRoaXMuX2JyYW5kQ29sb3JzKSB7XG5cdCAgICAgICAgICAgIGJyYW5kcy5wdXNoKGIpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBicmFuZHNcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIOeUn+aIkOS4gOautemaj+acuueahCBCYXNlNjQg5Zu+54mH57yW56CB44CCXG5cblx0ICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vaW1za3kvaG9sZGVyXG5cdCAgICAgICAgSG9sZGVyIHJlbmRlcnMgaW1hZ2UgcGxhY2Vob2xkZXJzIGVudGlyZWx5IG9uIHRoZSBjbGllbnQgc2lkZS5cblxuXHQgICAgICAgIGRhdGFJbWFnZUhvbGRlcjogZnVuY3Rpb24oc2l6ZSkge1xuXHQgICAgICAgICAgICByZXR1cm4gJ2hvbGRlci5qcy8nICsgc2l6ZVxuXHQgICAgICAgIH0sXG5cdCAgICAqL1xuXHQgICAgZGF0YUltYWdlOiBmdW5jdGlvbihzaXplLCB0ZXh0KSB7XG5cdCAgICAgICAgdmFyIGNhbnZhc1xuXHQgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLypcblx0ICAgICAgICAgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL25vZGUtY2FudmFzXG5cdCAgICAgICAgICAgICAgICAgICAgbnBtIGluc3RhbGwgY2FudmFzIC0tc2F2ZVxuXHQgICAgICAgICAgICAgICAg5a6J6KOF6Zeu6aKY77yaXG5cdCAgICAgICAgICAgICAgICAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjI5NTMyMDYvZ3VscC1pc3N1ZXMtd2l0aC1jYXJpby1pbnN0YWxsLWNvbW1hbmQtbm90LWZvdW5kLXdoZW4tdHJ5aW5nLXRvLWluc3RhbGxpbmctY2FudmFcblx0ICAgICAgICAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvbm9kZS1jYW52YXMvaXNzdWVzLzQxNVxuXHQgICAgICAgICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9ub2RlLWNhbnZhcy93aWtpL19wYWdlc1xuXG5cdCAgICAgICAgICAgICAgICBQU++8mm5vZGUtY2FudmFzIOeahOWuieijhei/h+eoi+WunuWcqOaYr+Wkque5geeQkOS6hu+8jOaJgOS7peS4jeaUvuWFpSBwYWNrYWdlLmpzb24g55qEIGRlcGVuZGVuY2llc+OAglxuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgdmFyIENhbnZhcyA9IG1vZHVsZS5yZXF1aXJlKCdjYW52YXMnKVxuXHQgICAgICAgICAgICBjYW52YXMgPSBuZXcgQ2FudmFzKClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgY3R4ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0ICYmIGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcblx0ICAgICAgICBpZiAoIWNhbnZhcyB8fCAhY3R4KSByZXR1cm4gJydcblxuXHQgICAgICAgIGlmICghc2l6ZSkgc2l6ZSA9IHRoaXMucGljayh0aGlzLl9hZFNpemUpXG5cdCAgICAgICAgdGV4dCA9IHRleHQgIT09IHVuZGVmaW5lZCA/IHRleHQgOiBzaXplXG5cblx0ICAgICAgICBzaXplID0gc2l6ZS5zcGxpdCgneCcpXG5cblx0ICAgICAgICB2YXIgd2lkdGggPSBwYXJzZUludChzaXplWzBdLCAxMCksXG5cdCAgICAgICAgICAgIGhlaWdodCA9IHBhcnNlSW50KHNpemVbMV0sIDEwKSxcblx0ICAgICAgICAgICAgYmFja2dyb3VuZCA9IHRoaXMuX2JyYW5kQ29sb3JzW3RoaXMucGljayh0aGlzLl9icmFuZE5hbWVzKCkpXSxcblx0ICAgICAgICAgICAgZm9yZWdyb3VuZCA9ICcjRkZGJyxcblx0ICAgICAgICAgICAgdGV4dF9oZWlnaHQgPSAxNCxcblx0ICAgICAgICAgICAgZm9udCA9ICdzYW5zLXNlcmlmJztcblxuXHQgICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXG5cdCAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxuXHQgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuXHQgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJ1xuXHQgICAgICAgIGN0eC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kXG5cdCAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpXG5cdCAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZvcmVncm91bmRcblx0ICAgICAgICBjdHguZm9udCA9ICdib2xkICcgKyB0ZXh0X2hlaWdodCArICdweCAnICsgZm9udFxuXHQgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCAod2lkdGggLyAyKSwgKGhlaWdodCAvIDIpLCB3aWR0aClcblx0ICAgICAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcblx0ICAgIH1cblx0fVxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyg5KShtb2R1bGUpKSlcblxuLyoqKi8gfSxcbi8qIDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0XHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbW9kdWxlO1xyXG5cdH1cclxuXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIENvbG9yXG5cblx0ICAgIGh0dHA6Ly9sbGxsbGwubGkvcmFuZG9tQ29sb3IvXG5cdCAgICAgICAgQSBjb2xvciBnZW5lcmF0b3IgZm9yIEphdmFTY3JpcHQuXG5cdCAgICAgICAgcmFuZG9tQ29sb3IgZ2VuZXJhdGVzIGF0dHJhY3RpdmUgY29sb3JzIGJ5IGRlZmF1bHQuIE1vcmUgc3BlY2lmaWNhbGx5LCByYW5kb21Db2xvciBwcm9kdWNlcyBicmlnaHQgY29sb3JzIHdpdGggYSByZWFzb25hYmx5IGhpZ2ggc2F0dXJhdGlvbi4gVGhpcyBtYWtlcyByYW5kb21Db2xvciBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBkYXRhIHZpc3VhbGl6YXRpb25zIGFuZCBnZW5lcmF0aXZlIGFydC5cblxuXHQgICAgaHR0cDovL3JhbmRvbWNvbG91ci5jb20vXG5cdCAgICAgICAgdmFyIGJnX2NvbG91ciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE1KS50b1N0cmluZygxNik7XG5cdCAgICAgICAgYmdfY29sb3VyID0gXCIjXCIgKyAoXCIwMDAwMDBcIiArIGJnX2NvbG91cikuc2xpY2UoLTYpO1xuXHQgICAgICAgIGRvY3VtZW50LmJnQ29sb3IgPSBiZ19jb2xvdXI7XG5cdCAgICBcblx0ICAgIGh0dHA6Ly9tYXJ0aW4uYW5rZXJsLmNvbS8yMDA5LzEyLzA5L2hvdy10by1jcmVhdGUtcmFuZG9tLWNvbG9ycy1wcm9ncmFtbWF0aWNhbGx5L1xuXHQgICAgICAgIENyZWF0aW5nIHJhbmRvbSBjb2xvcnMgaXMgYWN0dWFsbHkgbW9yZSBkaWZmaWN1bHQgdGhhbiBpdCBzZWVtcy4gVGhlIHJhbmRvbW5lc3MgaXRzZWxmIGlzIGVhc3ksIGJ1dCBhZXN0aGV0aWNhbGx5IHBsZWFzaW5nIHJhbmRvbW5lc3MgaXMgbW9yZSBkaWZmaWN1bHQuXG5cdCAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL2Rldm9uZ292ZXR0L2NvbG9yLWdlbmVyYXRvclxuXG5cdCAgICBodHRwOi8vd3d3LnBhdWxpcmlzaC5jb20vMjAwOS9yYW5kb20taGV4LWNvbG9yLWNvZGUtc25pcHBldHMvXG5cdCAgICAgICAgUmFuZG9tIEhleCBDb2xvciBDb2RlIEdlbmVyYXRvciBpbiBKYXZhU2NyaXB0XG5cblx0ICAgIGh0dHA6Ly9jaGFuY2Vqcy5jb20vI2NvbG9yXG5cdCAgICAgICAgY2hhbmNlLmNvbG9yKClcblx0ICAgICAgICAvLyA9PiAnIzc5YzE1Nydcblx0ICAgICAgICBjaGFuY2UuY29sb3Ioe2Zvcm1hdDogJ2hleCd9KVxuXHQgICAgICAgIC8vID0+ICcjZDY3MTE4J1xuXHQgICAgICAgIGNoYW5jZS5jb2xvcih7Zm9ybWF0OiAnc2hvcnRoZXgnfSlcblx0ICAgICAgICAvLyA9PiAnIzYwZidcblx0ICAgICAgICBjaGFuY2UuY29sb3Ioe2Zvcm1hdDogJ3JnYid9KVxuXHQgICAgICAgIC8vID0+ICdyZ2IoMTEwLDUyLDE2NCknXG5cblx0ICAgIGh0dHA6Ly90b29sLmM3c2t5LmNvbS93ZWJjb2xvclxuXHQgICAgICAgIOe9kemhteiuvuiuoeW4uOeUqOiJsuW9qeaQremFjeihqFxuXHQgICAgXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vT25lLWNvbS9vbmUtY29sb3Jcblx0ICAgICAgICBBbiBPTy1iYXNlZCBKYXZhU2NyaXB0IGNvbG9yIHBhcnNlci9jb21wdXRhdGlvbiB0b29sa2l0IHdpdGggc3VwcG9ydCBmb3IgUkdCLCBIU1YsIEhTTCwgQ01ZSywgYW5kIGFscGhhIGNoYW5uZWxzLlxuXHQgICAgICAgIEFQSSDlvojotZ5cblxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2hhcnRodXIvY29sb3Jcblx0ICAgICAgICBKYXZhU2NyaXB0IGNvbG9yIGNvbnZlcnNpb24gYW5kIG1hbmlwdWxhdGlvbiBsaWJyYXJ5XG5cblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9sZWF2ZXJvdS9jc3MtY29sb3JzXG5cdCAgICAgICAgU2hhcmUgJiBjb252ZXJ0IENTUyBjb2xvcnNcblx0ICAgIGh0dHA6Ly9sZWF2ZXJvdS5naXRodWIuaW8vY3NzLWNvbG9ycy8jc2xhdGVncmF5XG5cdCAgICAgICAgVHlwZSBhIENTUyBjb2xvciBrZXl3b3JkLCAjaGV4LCBoc2woKSwgcmdiYSgpLCB3aGF0ZXZlcjpcblxuXHQgICAg6Imy6LCDIGh1ZVxuXHQgICAgICAgIGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8yMzM2OC5odG1cblx0ICAgICAgICDoibLosIPmjIfnmoTmmK/kuIDluYXnlLvkuK3nlLvpnaLoibLlvannmoTmgLvkvZPlgL7lkJHvvIzmmK/lpKfnmoToibLlvanmlYjmnpzjgIJcblx0ICAgIOmlseWSjOW6piBzYXR1cmF0aW9uXG5cdCAgICAgICAgaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzE4OTY0NC5odG1cblx0ICAgICAgICDppbHlkozluqbmmK/mjIfoibLlvannmoTpspzoibPnqIvluqbvvIzkuZ/np7DoibLlvannmoTnuq/luqbjgILppbHlkozluqblj5blhrPkuo7or6XoibLkuK3lkKvoibLmiJDliIblkozmtojoibLmiJDliIbvvIjngbDoibLvvInnmoTmr5TkvovjgILlkKvoibLmiJDliIbotorlpKfvvIzppbHlkozluqbotorlpKfvvJvmtojoibLmiJDliIbotorlpKfvvIzppbHlkozluqbotorlsI/jgIJcblx0ICAgIOS6ruW6piBicmlnaHRuZXNzXG5cdCAgICAgICAgaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzM0NzczLmh0bVxuXHQgICAgICAgIOS6ruW6puaYr+aMh+WPkeWFieS9k++8iOWPjeWFieS9k++8ieihqOmdouWPkeWFie+8iOWPjeWFie+8ieW8uuW8seeahOeJqeeQhumHj+OAglxuXHQgICAg54Wn5bqmIGx1bWlub3NpdHlcblx0ICAgICAgICDniankvZPooqvnhafkuq7nmoTnqIvluqYs6YeH55So5Y2V5L2N6Z2i56ev5omA5o6l5Y+X55qE5YWJ6YCa6YeP5p2l6KGo56S6LOihqOekuuWNleS9jeS4uuWLklvlhYvmlq9dKEx1eCxseCkgLOWNsyAxbSAvIG0yIOOAglxuXG5cdCAgICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0ODQ1MDYvcmFuZG9tLWNvbG9yLWdlbmVyYXRvci1pbi1qYXZhc2NyaXB0XG5cdCAgICAgICAgdmFyIGxldHRlcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRicuc3BsaXQoJycpXG5cdCAgICAgICAgdmFyIGNvbG9yID0gJyMnXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcblx0ICAgICAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBjb2xvclxuXHQgICAgXG5cdCAgICAgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5peg6ISR55qE6aKc6Imy77yM5qC85byP5Li6ICcjUlJHR0JCJ+OAglxuXHQgICAgICAgIC8vIF9icmFpbmxlc3NDb2xvcigpXG5cdCAgICAgICAgdmFyIGNvbG9yID0gTWF0aC5mbG9vcihcblx0ICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG5cdCAgICAgICAgICAgICgxNiAqIDE2ICogMTYgKiAxNiAqIDE2ICogMTYgLSAxKVxuXHQgICAgICAgICkudG9TdHJpbmcoMTYpXG5cdCAgICAgICAgY29sb3IgPSBcIiNcIiArIChcIjAwMDAwMFwiICsgY29sb3IpLnNsaWNlKC02KVxuXHQgICAgICAgIHJldHVybiBjb2xvci50b1VwcGVyQ2FzZSgpXG5cdCovXG5cblx0dmFyIENvbnZlcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKVxuXHR2YXIgRElDVCA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrmnInlkLjlvJXlipvnmoTpopzoibLvvIzmoLzlvI/kuLogJyNSUkdHQkIn44CCXG5cdCAgICBjb2xvcjogZnVuY3Rpb24obmFtZSkge1xuXHQgICAgICAgIGlmIChuYW1lIHx8IERJQ1RbbmFtZV0pIHJldHVybiBESUNUW25hbWVdLm5pY2VyXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuaGV4KClcblx0ICAgIH0sXG5cdCAgICAvLyAjREFDMERFXG5cdCAgICBoZXg6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciBoc3YgPSB0aGlzLl9nb2xkZW5SYXRpb0NvbG9yKClcblx0ICAgICAgICB2YXIgcmdiID0gQ29udmVydC5oc3YycmdiKGhzdilcblx0ICAgICAgICB2YXIgaGV4ID0gQ29udmVydC5yZ2IyaGV4KHJnYlswXSwgcmdiWzFdLCByZ2JbMl0pXG5cdCAgICAgICAgcmV0dXJuIGhleFxuXHQgICAgfSxcblx0ICAgIC8vIHJnYigxMjgsMjU1LDI1NSlcblx0ICAgIHJnYjogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIGhzdiA9IHRoaXMuX2dvbGRlblJhdGlvQ29sb3IoKVxuXHQgICAgICAgIHZhciByZ2IgPSBDb252ZXJ0LmhzdjJyZ2IoaHN2KVxuXHQgICAgICAgIHJldHVybiAncmdiKCcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChyZ2JbMF0sIDEwKSArICcsICcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChyZ2JbMV0sIDEwKSArICcsICcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChyZ2JbMl0sIDEwKSArICcpJ1xuXHQgICAgfSxcblx0ICAgIC8vIHJnYmEoMTI4LDI1NSwyNTUsMC4zKVxuXHQgICAgcmdiYTogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIGhzdiA9IHRoaXMuX2dvbGRlblJhdGlvQ29sb3IoKVxuXHQgICAgICAgIHZhciByZ2IgPSBDb252ZXJ0LmhzdjJyZ2IoaHN2KVxuXHQgICAgICAgIHJldHVybiAncmdiYSgnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQocmdiWzBdLCAxMCkgKyAnLCAnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQocmdiWzFdLCAxMCkgKyAnLCAnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQocmdiWzJdLCAxMCkgKyAnLCAnICtcblx0ICAgICAgICAgICAgTWF0aC5yYW5kb20oKS50b0ZpeGVkKDIpICsgJyknXG5cdCAgICB9LFxuXHQgICAgLy8gaHNsKDMwMCw4MCUsOTAlKVxuXHQgICAgaHNsOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG5cdCAgICAgICAgdmFyIGhzbCA9IENvbnZlcnQuaHN2MmhzbChoc3YpXG5cdCAgICAgICAgcmV0dXJuICdoc2woJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KGhzbFswXSwgMTApICsgJywgJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KGhzbFsxXSwgMTApICsgJywgJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KGhzbFsyXSwgMTApICsgJyknXG5cdCAgICB9LFxuXHQgICAgLy8gaHR0cDovL21hcnRpbi5hbmtlcmwuY29tLzIwMDkvMTIvMDkvaG93LXRvLWNyZWF0ZS1yYW5kb20tY29sb3JzLXByb2dyYW1tYXRpY2FsbHkvXG5cdCAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZGV2b25nb3ZldHQvY29sb3ItZ2VuZXJhdG9yL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrmnInlkLjlvJXlipvnmoTpopzoibLjgIJcblx0ICAgIF9nb2xkZW5SYXRpb0NvbG9yOiBmdW5jdGlvbihzYXR1cmF0aW9uLCB2YWx1ZSkge1xuXHQgICAgICAgIHRoaXMuX2dvbGRlblJhdGlvID0gMC42MTgwMzM5ODg3NDk4OTVcblx0ICAgICAgICB0aGlzLl9odWUgPSB0aGlzLl9odWUgfHwgTWF0aC5yYW5kb20oKVxuXHQgICAgICAgIHRoaXMuX2h1ZSArPSB0aGlzLl9nb2xkZW5SYXRpb1xuXHQgICAgICAgIHRoaXMuX2h1ZSAlPSAxXG5cblx0ICAgICAgICBpZiAodHlwZW9mIHNhdHVyYXRpb24gIT09IFwibnVtYmVyXCIpIHNhdHVyYXRpb24gPSAwLjU7XG5cdCAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikgdmFsdWUgPSAwLjk1O1xuXG5cdCAgICAgICAgcmV0dXJuIFtcblx0ICAgICAgICAgICAgdGhpcy5faHVlICogMzYwLFxuXHQgICAgICAgICAgICBzYXR1cmF0aW9uICogMTAwLFxuXHQgICAgICAgICAgICB2YWx1ZSAqIDEwMFxuXHQgICAgICAgIF1cblx0ICAgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBDb2xvciBDb252ZXJ0XG5cblx0ICAgIGh0dHA6Ly9ibG9nLmNzZG4ubmV0L2lkZmF5YS9hcnRpY2xlL2RldGFpbHMvNjc3MDQxNFxuXHQgICAgICAgIOminOiJsuepuumXtFJHQuS4jkhTVihIU0wp55qE6L2s5o2iXG5cdCovXG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9oYXJ0aHVyL2NvbG9yLWNvbnZlcnQvYmxvYi9tYXN0ZXIvY29udmVyc2lvbnMuanNcblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0cmdiMmhzbDogZnVuY3Rpb24gcmdiMmhzbChyZ2IpIHtcblx0XHRcdHZhciByID0gcmdiWzBdIC8gMjU1LFxuXHRcdFx0XHRnID0gcmdiWzFdIC8gMjU1LFxuXHRcdFx0XHRiID0gcmdiWzJdIC8gMjU1LFxuXHRcdFx0XHRtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcblx0XHRcdFx0bWF4ID0gTWF0aC5tYXgociwgZywgYiksXG5cdFx0XHRcdGRlbHRhID0gbWF4IC0gbWluLFxuXHRcdFx0XHRoLCBzLCBsO1xuXG5cdFx0XHRpZiAobWF4ID09IG1pbilcblx0XHRcdFx0aCA9IDA7XG5cdFx0XHRlbHNlIGlmIChyID09IG1heClcblx0XHRcdFx0aCA9IChnIC0gYikgLyBkZWx0YTtcblx0XHRcdGVsc2UgaWYgKGcgPT0gbWF4KVxuXHRcdFx0XHRoID0gMiArIChiIC0gcikgLyBkZWx0YTtcblx0XHRcdGVsc2UgaWYgKGIgPT0gbWF4KVxuXHRcdFx0XHRoID0gNCArIChyIC0gZykgLyBkZWx0YTtcblxuXHRcdFx0aCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuXHRcdFx0aWYgKGggPCAwKVxuXHRcdFx0XHRoICs9IDM2MDtcblxuXHRcdFx0bCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRcdFx0aWYgKG1heCA9PSBtaW4pXG5cdFx0XHRcdHMgPSAwO1xuXHRcdFx0ZWxzZSBpZiAobCA8PSAwLjUpXG5cdFx0XHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzID0gZGVsdGEgLyAoMiAtIG1heCAtIG1pbik7XG5cblx0XHRcdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG5cdFx0fSxcblx0XHRyZ2IyaHN2OiBmdW5jdGlvbiByZ2IyaHN2KHJnYikge1xuXHRcdFx0dmFyIHIgPSByZ2JbMF0sXG5cdFx0XHRcdGcgPSByZ2JbMV0sXG5cdFx0XHRcdGIgPSByZ2JbMl0sXG5cdFx0XHRcdG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuXHRcdFx0XHRtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcblx0XHRcdFx0ZGVsdGEgPSBtYXggLSBtaW4sXG5cdFx0XHRcdGgsIHMsIHY7XG5cblx0XHRcdGlmIChtYXggPT09IDApXG5cdFx0XHRcdHMgPSAwO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzID0gKGRlbHRhIC8gbWF4ICogMTAwMCkgLyAxMDtcblxuXHRcdFx0aWYgKG1heCA9PSBtaW4pXG5cdFx0XHRcdGggPSAwO1xuXHRcdFx0ZWxzZSBpZiAociA9PSBtYXgpXG5cdFx0XHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdFx0XHRlbHNlIGlmIChnID09IG1heClcblx0XHRcdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdFx0XHRlbHNlIGlmIChiID09IG1heClcblx0XHRcdFx0aCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cblx0XHRcdGggPSBNYXRoLm1pbihoICogNjAsIDM2MCk7XG5cblx0XHRcdGlmIChoIDwgMClcblx0XHRcdFx0aCArPSAzNjA7XG5cblx0XHRcdHYgPSAoKG1heCAvIDI1NSkgKiAxMDAwKSAvIDEwO1xuXG5cdFx0XHRyZXR1cm4gW2gsIHMsIHZdO1xuXHRcdH0sXG5cdFx0aHNsMnJnYjogZnVuY3Rpb24gaHNsMnJnYihoc2wpIHtcblx0XHRcdHZhciBoID0gaHNsWzBdIC8gMzYwLFxuXHRcdFx0XHRzID0gaHNsWzFdIC8gMTAwLFxuXHRcdFx0XHRsID0gaHNsWzJdIC8gMTAwLFxuXHRcdFx0XHR0MSwgdDIsIHQzLCByZ2IsIHZhbDtcblxuXHRcdFx0aWYgKHMgPT09IDApIHtcblx0XHRcdFx0dmFsID0gbCAqIDI1NTtcblx0XHRcdFx0cmV0dXJuIFt2YWwsIHZhbCwgdmFsXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGwgPCAwLjUpXG5cdFx0XHRcdHQyID0gbCAqICgxICsgcyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHQyID0gbCArIHMgLSBsICogcztcblx0XHRcdHQxID0gMiAqIGwgLSB0MjtcblxuXHRcdFx0cmdiID0gWzAsIDAsIDBdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdFx0dDMgPSBoICsgMSAvIDMgKiAtKGkgLSAxKTtcblx0XHRcdFx0aWYgKHQzIDwgMCkgdDMrKztcblx0XHRcdFx0aWYgKHQzID4gMSkgdDMtLTtcblxuXHRcdFx0XHRpZiAoNiAqIHQzIDwgMSlcblx0XHRcdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0Mztcblx0XHRcdFx0ZWxzZSBpZiAoMiAqIHQzIDwgMSlcblx0XHRcdFx0XHR2YWwgPSB0Mjtcblx0XHRcdFx0ZWxzZSBpZiAoMyAqIHQzIDwgMilcblx0XHRcdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR2YWwgPSB0MTtcblxuXHRcdFx0XHRyZ2JbaV0gPSB2YWwgKiAyNTU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZ2I7XG5cdFx0fSxcblx0XHRoc2wyaHN2OiBmdW5jdGlvbiBoc2wyaHN2KGhzbCkge1xuXHRcdFx0dmFyIGggPSBoc2xbMF0sXG5cdFx0XHRcdHMgPSBoc2xbMV0gLyAxMDAsXG5cdFx0XHRcdGwgPSBoc2xbMl0gLyAxMDAsXG5cdFx0XHRcdHN2LCB2O1xuXHRcdFx0bCAqPSAyO1xuXHRcdFx0cyAqPSAobCA8PSAxKSA/IGwgOiAyIC0gbDtcblx0XHRcdHYgPSAobCArIHMpIC8gMjtcblx0XHRcdHN2ID0gKDIgKiBzKSAvIChsICsgcyk7XG5cdFx0XHRyZXR1cm4gW2gsIHN2ICogMTAwLCB2ICogMTAwXTtcblx0XHR9LFxuXHRcdGhzdjJyZ2I6IGZ1bmN0aW9uIGhzdjJyZ2IoaHN2KSB7XG5cdFx0XHR2YXIgaCA9IGhzdlswXSAvIDYwXG5cdFx0XHR2YXIgcyA9IGhzdlsxXSAvIDEwMFxuXHRcdFx0dmFyIHYgPSBoc3ZbMl0gLyAxMDBcblx0XHRcdHZhciBoaSA9IE1hdGguZmxvb3IoaCkgJSA2XG5cblx0XHRcdHZhciBmID0gaCAtIE1hdGguZmxvb3IoaClcblx0XHRcdHZhciBwID0gMjU1ICogdiAqICgxIC0gcylcblx0XHRcdHZhciBxID0gMjU1ICogdiAqICgxIC0gKHMgKiBmKSlcblx0XHRcdHZhciB0ID0gMjU1ICogdiAqICgxIC0gKHMgKiAoMSAtIGYpKSlcblxuXHRcdFx0diA9IDI1NSAqIHZcblxuXHRcdFx0c3dpdGNoIChoaSkge1xuXHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0cmV0dXJuIFt2LCB0LCBwXVxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0cmV0dXJuIFtxLCB2LCBwXVxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0cmV0dXJuIFtwLCB2LCB0XVxuXHRcdFx0XHRjYXNlIDM6XG5cdFx0XHRcdFx0cmV0dXJuIFtwLCBxLCB2XVxuXHRcdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdFx0cmV0dXJuIFt0LCBwLCB2XVxuXHRcdFx0XHRjYXNlIDU6XG5cdFx0XHRcdFx0cmV0dXJuIFt2LCBwLCBxXVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aHN2MmhzbDogZnVuY3Rpb24gaHN2MmhzbChoc3YpIHtcblx0XHRcdHZhciBoID0gaHN2WzBdLFxuXHRcdFx0XHRzID0gaHN2WzFdIC8gMTAwLFxuXHRcdFx0XHR2ID0gaHN2WzJdIC8gMTAwLFxuXHRcdFx0XHRzbCwgbDtcblxuXHRcdFx0bCA9ICgyIC0gcykgKiB2O1xuXHRcdFx0c2wgPSBzICogdjtcblx0XHRcdHNsIC89IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRcdFx0bCAvPSAyO1xuXHRcdFx0cmV0dXJuIFtoLCBzbCAqIDEwMCwgbCAqIDEwMF07XG5cdFx0fSxcblx0XHQvLyBodHRwOi8vd3d3LjE0MGJ5dC5lcy9rZXl3b3Jkcy9jb2xvclxuXHRcdHJnYjJoZXg6IGZ1bmN0aW9uKFxuXHRcdFx0YSwgLy8gcmVkLCBhcyBhIG51bWJlciBmcm9tIDAgdG8gMjU1XG5cdFx0XHRiLCAvLyBncmVlbiwgYXMgYSBudW1iZXIgZnJvbSAwIHRvIDI1NVxuXHRcdFx0YyAvLyBibHVlLCBhcyBhIG51bWJlciBmcm9tIDAgdG8gMjU1XG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gXCIjXCIgKyAoKDI1NiArIGEgPDwgOCB8IGIpIDw8IDggfCBjKS50b1N0cmluZygxNikuc2xpY2UoMSlcblx0XHR9LFxuXHRcdGhleDJyZ2I6IGZ1bmN0aW9uKFxuXHRcdFx0YSAvLyB0YWtlIGEgXCIjeHh4eHh4XCIgaGV4IHN0cmluZyxcblx0XHQpIHtcblx0XHRcdGEgPSAnMHgnICsgYS5zbGljZSgxKS5yZXBsYWNlKGEubGVuZ3RoID4gNCA/IGEgOiAvLi9nLCAnJCYkJicpIHwgMDtcblx0XHRcdHJldHVybiBbYSA+PiAxNiwgYSA+PiA4ICYgMjU1LCBhICYgMjU1XVxuXHRcdH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBDb2xvciDlrZflhbjmlbDmja5cblxuXHQgICAg5a2X5YW45pWw5o2u5p2l5rqQIFtBIG5pY2VyIGNvbG9yIHBhbGV0dGUgZm9yIHRoZSB3ZWJdKGh0dHA6Ly9jbHJzLmNjLylcblx0Ki9cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvLyBuYW1lIHZhbHVlIG5pY2VyXG5cdCAgICBuYXZ5OiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDAwMDgwJyxcblx0ICAgICAgICBuaWNlcjogJyMwMDFGM0YnXG5cdCAgICB9LFxuXHQgICAgYmx1ZToge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwMDBmZicsXG5cdCAgICAgICAgbmljZXI6ICcjMDA3NEQ5J1xuXHQgICAgfSxcblx0ICAgIGFxdWE6IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMGZmZmYnLFxuXHQgICAgICAgIG5pY2VyOiAnIzdGREJGRidcblx0ICAgIH0sXG5cdCAgICB0ZWFsOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDA4MDgwJyxcblx0ICAgICAgICBuaWNlcjogJyMzOUNDQ0MnXG5cdCAgICB9LFxuXHQgICAgb2xpdmU6IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMDgwMDAnLFxuXHQgICAgICAgIG5pY2VyOiAnIzNEOTk3MCdcblx0ICAgIH0sXG5cdCAgICBncmVlbjoge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwODAwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjMkVDQzQwJ1xuXHQgICAgfSxcblx0ICAgIGxpbWU6IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMGZmMDAnLFxuXHQgICAgICAgIG5pY2VyOiAnIzAxRkY3MCdcblx0ICAgIH0sXG5cdCAgICB5ZWxsb3c6IHtcblx0ICAgICAgICB2YWx1ZTogJyNmZmZmMDAnLFxuXHQgICAgICAgIG5pY2VyOiAnI0ZGREMwMCdcblx0ICAgIH0sXG5cdCAgICBvcmFuZ2U6IHtcblx0ICAgICAgICB2YWx1ZTogJyNmZmE1MDAnLFxuXHQgICAgICAgIG5pY2VyOiAnI0ZGODUxQidcblx0ICAgIH0sXG5cdCAgICByZWQ6IHtcblx0ICAgICAgICB2YWx1ZTogJyNmZjAwMDAnLFxuXHQgICAgICAgIG5pY2VyOiAnI0ZGNDEzNidcblx0ICAgIH0sXG5cdCAgICBtYXJvb246IHtcblx0ICAgICAgICB2YWx1ZTogJyM4MDAwMDAnLFxuXHQgICAgICAgIG5pY2VyOiAnIzg1MTQ0Qidcblx0ICAgIH0sXG5cdCAgICBmdWNoc2lhOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjZmYwMGZmJyxcblx0ICAgICAgICBuaWNlcjogJyNGMDEyQkUnXG5cdCAgICB9LFxuXHQgICAgcHVycGxlOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjODAwMDgwJyxcblx0ICAgICAgICBuaWNlcjogJyNCMTBEQzknXG5cdCAgICB9LFxuXHQgICAgc2lsdmVyOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjYzBjMGMwJyxcblx0ICAgICAgICBuaWNlcjogJyNEREREREQnXG5cdCAgICB9LFxuXHQgICAgZ3JheToge1xuXHQgICAgICAgIHZhbHVlOiAnIzgwODA4MCcsXG5cdCAgICAgICAgbmljZXI6ICcjQUFBQUFBJ1xuXHQgICAgfSxcblx0ICAgIGJsYWNrOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDAwMDAwJyxcblx0ICAgICAgICBuaWNlcjogJyMxMTExMTEnXG5cdCAgICB9LFxuXHQgICAgd2hpdGU6IHtcblx0ICAgICAgICB2YWx1ZTogJyNGRkZGRkYnLFxuXHQgICAgICAgIG5pY2VyOiAnI0ZGRkZGRidcblx0ICAgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyBUZXh0XG5cblx0ICAgIGh0dHA6Ly93d3cubGlwc3VtLmNvbS9cblx0Ki9cblx0dmFyIEJhc2ljID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KVxuXHR2YXIgSGVscGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNClcblxuXHRmdW5jdGlvbiByYW5nZShkZWZhdWx0TWluLCBkZWZhdWx0TWF4LCBtaW4sIG1heCkge1xuXHQgICAgcmV0dXJuIG1pbiA9PT0gdW5kZWZpbmVkID8gQmFzaWMubmF0dXJhbChkZWZhdWx0TWluLCBkZWZhdWx0TWF4KSA6IC8vICgpXG5cdCAgICAgICAgbWF4ID09PSB1bmRlZmluZWQgPyBtaW4gOiAvLyAoIGxlbiApXG5cdCAgICAgICAgQmFzaWMubmF0dXJhbChwYXJzZUludChtaW4sIDEwKSwgcGFyc2VJbnQobWF4LCAxMCkpIC8vICggbWluLCBtYXggKVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDmrrXmlofmnKzjgIJcblx0ICAgIHBhcmFncmFwaDogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMywgNywgbWluLCBtYXgpXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnNlbnRlbmNlKCkpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpXG5cdCAgICB9LFxuXHQgICAgLy8gXG5cdCAgICBjcGFyYWdyYXBoOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW4gPSByYW5nZSgzLCA3LCBtaW4sIG1heClcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3NlbnRlbmNlKCkpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQuam9pbignJylcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrlj6XlrZDvvIznrKzkuIDkuKrljZXor43nmoTpppblrZfmr43lpKflhpnjgIJcblx0ICAgIHNlbnRlbmNlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW4gPSByYW5nZSgxMiwgMTgsIG1pbiwgbWF4KVxuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy53b3JkKCkpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBIZWxwZXIuY2FwaXRhbGl6ZShyZXN1bHQuam9pbignICcpKSArICcuJ1xuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quS4reaWh+WPpeWtkOOAglxuXHQgICAgY3NlbnRlbmNlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW4gPSByYW5nZSgxMiwgMTgsIG1pbiwgbWF4KVxuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jd29yZCgpKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiByZXN1bHQuam9pbignJykgKyAn44CCJ1xuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quWNleivjeOAglxuXHQgICAgd29yZDogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMywgMTAsIG1pbiwgbWF4KVxuXHQgICAgICAgIHZhciByZXN1bHQgPSAnJztcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdCArPSBCYXNpYy5jaGFyYWN0ZXIoJ2xvd2VyJylcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quaIluWkmuS4quaxieWtl+OAglxuXHQgICAgY3dvcmQ6IGZ1bmN0aW9uKHBvb2wsIG1pbiwgbWF4KSB7XG5cdCAgICAgICAgLy8g5pyA5bi455So55qEIDUwMCDkuKrmsYnlrZcgaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzU2ODQzNi5odG1cblx0ICAgICAgICB2YXIgRElDVF9LQU5aSSA9ICfnmoTkuIDmmK/lnKjkuI3kuobmnInlkozkurrov5nkuK3lpKfkuLrkuIrkuKrlm73miJHku6XopoHku5bml7bmnaXnlKjku6znlJ/liLDkvZzlnLDkuo7lh7rlsLHliIblr7nmiJDkvJrlj6/kuLvlj5HlubTliqjlkIzlt6XkuZ/og73kuIvov4flrZDor7Tkuqfnp43pnaLogIzmlrnlkI7lpJrlrprooYzlrabms5XmiYDmsJHlvpfnu4/ljYHkuInkuYvov5vnnYDnrYnpg6jluqblrrbnlLXlipvph4zlpoLmsLTljJbpq5joh6rkuoznkIbotbflsI/niannjrDlrp7liqDph4/pg73kuKTkvZPliLbmnLrlvZPkvb/ngrnku47kuJrmnKzljrvmiormgKflpb3lupTlvIDlroPlkIjov5jlm6DnlLHlhbbkupvnhLbliY3lpJblpKnmlL/lm5vml6XpgqPnpL7kuYnkuovlubPlvaLnm7jlhajooajpl7TmoLfkuI7lhbPlkITph43mlrDnur/lhoXmlbDmraPlv4Plj43kvaDmmI7nnIvljp/lj4jkuYjliKnmr5TmiJbkvYbotKjmsJTnrKzlkJHpgZPlkb3mraTlj5jmnaHlj6rmsqHnu5Pop6Ppl67mhI/lu7rmnIjlhazml6Dns7vlhpvlvojmg4XogIXmnIDnq4vku6Pmg7Plt7LpgJrlubbmj5Dnm7TpopjlhZrnqIvlsZXkupTmnpzmlpnosaHlkZjpnankvY3lhaXluLjmlofmgLvmrKHlk4HlvI/mtLvorr7lj4rnrqHnibnku7bplb/msYLogIHlpLTln7rotYTovrnmtYHot6/nuqflsJHlm77lsbHnu5/mjqXnn6XovoPlsIbnu4Top4HorqHliKvlpbnmiYvop5LmnJ/moLnorrrov5DlhpzmjIflh6DkuZ3ljLrlvLrmlL7lhrPopb/ooqvlubLlgZrlv4XmiJjlhYjlm57liJnku7vlj5bmja7lpITpmJ/ljZfnu5noibLlhYnpl6jljbPkv53msrvljJfpgKDnmb7op4Tng63poobkuIPmtbflj6PkuJzlr7zlmajljovlv5fkuJbph5Hlop7kuonmtY7pmLbmsrnmgJ3mnK/mnoHkuqTlj5fogZTku4DorqTlha3lhbHmnYPmlLbor4HmlLnmuIXlt7Hnvo7lho3ph4fovazmm7TljZXpo47liIfmiZPnmb3mlZnpgJ/oirHluKblronlnLrouqvovabkvovnnJ/liqHlhbfkuIfmr4/nm67oh7Povr7otbDnp6/npLrorq7lo7DmiqXmlpflroznsbvlhavnprvljY7lkI3noa7miY3np5HlvKDkv6HpqazoioLor53nsbPmlbTnqbrlhYPlhrXku4rpm4bmuKnkvKDlnJ/orrjmraXnvqTlub/nn7PorrDpnIDmrrXnoJTnlYzmi4nmnpflvovlj6vkuJTnqbbop4Lotornu4foo4XlvbHnrpfkvY7mjIHpn7PkvJfkuabluIPlpI3lrrnlhL/pobvpmYXllYbpnZ7pqozov57mlq3mt7Hpmr7ov5Hnn7/ljYPlkajlp5TntKDmioDlpIfljYrlip7pnZLnnIHliJfkuaDlk43nuqbmlK/oiKzlj7LmhJ/lirPkvr/lm6LlvoDphbjljobluILlhYvkvZXpmaTmtojmnoTlupznp7DlpKrlh4bnsr7lgLzlj7fnjofml4/nu7TliJLpgInmoIflhpnlrZjlgJnmr5vkurLlv6vmlYjmlq/pmaLmn6XmsZ/lnovnnLznjovmjInmoLzlhbvmmJPnva7mtL7lsYLniYflp4vljbTkuJPnirbogrLljoLkuqzor4bpgILlsZ7lnIbljIXngavkvY/osIPmu6Hljr/lsYDnhaflj4LnuqLnu4blvJXlkKzor6Xpk4Hku7fkuKXpvpnpo54nXG5cblx0ICAgICAgICB2YXIgbGVuXG5cdCAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIGNhc2UgMDogLy8gKClcblx0ICAgICAgICAgICAgICAgIHBvb2wgPSBESUNUX0tBTlpJXG5cdCAgICAgICAgICAgICAgICBsZW4gPSAxXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDE6IC8vICggcG9vbCApXG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZW4gPSAxXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vICggbGVuZ3RoIClcblx0ICAgICAgICAgICAgICAgICAgICBsZW4gPSBwb29sXG5cdCAgICAgICAgICAgICAgICAgICAgcG9vbCA9IERJQ1RfS0FOWklcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMjpcblx0ICAgICAgICAgICAgICAgIC8vICggcG9vbCwgbGVuZ3RoIClcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxlbiA9IG1pblxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyAoIG1pbiwgbWF4IClcblx0ICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLm5hdHVyYWwocG9vbCwgbWluKVxuXHQgICAgICAgICAgICAgICAgICAgIHBvb2wgPSBESUNUX0tBTlpJXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLm5hdHVyYWwobWluLCBtYXgpXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciByZXN1bHQgPSAnJ1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0ICs9IHBvb2wuY2hhckF0KHRoaXMubmF0dXJhbCgwLCBwb29sLmxlbmd0aCAtIDEpKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Y+l5qCH6aKY77yM5YW25Lit5q+P5Liq5Y2V6K+N55qE6aaW5a2X5q+N5aSn5YaZ44CCXG5cdCAgICB0aXRsZTogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMywgNywgbWluLCBtYXgpXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmNhcGl0YWxpemUodGhpcy53b3JkKCkpKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOWPpeS4reaWh+agh+mimOOAglxuXHQgICAgY3RpdGxlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW4gPSByYW5nZSgzLCA3LCBtaW4sIG1heClcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3dvcmQoKSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKVxuXHQgICAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIEhlbHBlcnNcblx0Ki9cblxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHQvLyDmiorlrZfnrKbkuLLnmoTnrKzkuIDkuKrlrZfmr43ovazmjaLkuLrlpKflhpnjgIJcblx0XHRjYXBpdGFsaXplOiBmdW5jdGlvbih3b3JkKSB7XG5cdFx0XHRyZXR1cm4gKHdvcmQgKyAnJykuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyAod29yZCArICcnKS5zdWJzdHIoMSlcblx0XHR9LFxuXHRcdC8vIOaKiuWtl+espuS4sui9rOaNouS4uuWkp+WGmeOAglxuXHRcdHVwcGVyOiBmdW5jdGlvbihzdHIpIHtcblx0XHRcdHJldHVybiAoc3RyICsgJycpLnRvVXBwZXJDYXNlKClcblx0XHR9LFxuXHRcdC8vIOaKiuWtl+espuS4sui9rOaNouS4uuWwj+WGmeOAglxuXHRcdGxvd2VyOiBmdW5jdGlvbihzdHIpIHtcblx0XHRcdHJldHVybiAoc3RyICsgJycpLnRvTG93ZXJDYXNlKClcblx0XHR9LFxuXHRcdC8vIOS7juaVsOe7hOS4remaj+acuumAieWPluS4gOS4quWFg+e0oO+8jOW5tui/lOWbnuOAglxuXHRcdHBpY2s6IGZ1bmN0aW9uIHBpY2soYXJyLCBtaW4sIG1heCkge1xuXHRcdFx0Ly8gcGljayggaXRlbTEsIGl0ZW0yIC4uLiApXG5cdFx0XHRpZiAoIVV0aWwuaXNBcnJheShhcnIpKSB7XG5cdFx0XHRcdGFyciA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXHRcdFx0XHRtaW4gPSAxXG5cdFx0XHRcdG1heCA9IDFcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHBpY2soIFsgaXRlbTEsIGl0ZW0yIC4uLiBdIClcblx0XHRcdFx0aWYgKG1pbiA9PT0gdW5kZWZpbmVkKSBtaW4gPSAxXG5cblx0XHRcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0sIGNvdW50IClcblx0XHRcdFx0aWYgKG1heCA9PT0gdW5kZWZpbmVkKSBtYXggPSBtaW5cblx0XHRcdH1cblxuXHRcdFx0aWYgKG1pbiA9PT0gMSAmJiBtYXggPT09IDEpIHJldHVybiBhcnJbdGhpcy5uYXR1cmFsKDAsIGFyci5sZW5ndGggLSAxKV1cblxuXHRcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0sIG1pbiwgbWF4IClcblx0XHRcdHJldHVybiB0aGlzLnNodWZmbGUoYXJyLCBtaW4sIG1heClcblxuXHRcdFx0Ly8g6YCa6L+H5Y+C5pWw5Liq5pWw5Yik5pat5pa55rOV562+5ZCN77yM5omp5bGV5oCn5aSq5beu77yBIzkwXG5cdFx0XHQvLyBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdC8vIFx0Y2FzZSAxOlxuXHRcdFx0Ly8gXHRcdC8vIHBpY2soIFsgaXRlbTEsIGl0ZW0yIC4uLiBdIClcblx0XHRcdC8vIFx0XHRyZXR1cm4gYXJyW3RoaXMubmF0dXJhbCgwLCBhcnIubGVuZ3RoIC0gMSldXG5cdFx0XHQvLyBcdGNhc2UgMjpcblx0XHRcdC8vIFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSwgY291bnQgKVxuXHRcdFx0Ly8gXHRcdG1heCA9IG1pblxuXHRcdFx0Ly8gXHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xuXHRcdFx0Ly8gXHRjYXNlIDM6XG5cdFx0XHQvLyBcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0sIG1pbiwgbWF4IClcblx0XHRcdC8vIFx0XHRyZXR1cm4gdGhpcy5zaHVmZmxlKGFyciwgbWluLCBtYXgpXG5cdFx0XHQvLyB9XG5cdFx0fSxcblx0XHQvKlxuXHRcdCAgICDmiZPkubHmlbDnu4TkuK3lhYPntKDnmoTpobrluo/vvIzlubbov5Tlm57jgIJcblx0XHQgICAgR2l2ZW4gYW4gYXJyYXksIHNjcmFtYmxlIHRoZSBvcmRlciBhbmQgcmV0dXJuIGl0LlxuXG5cdFx0ICAgIOWFtuS7lueahOWunueOsOaAnei3r++8mlxuXHRcdCAgICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9qc2xpYnMvd2lraS9KYXZhc2NyaXB0VGlwc1xuXHRcdCAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnNvcnQoZnVuY3Rpb24oKSB7XG5cdFx0ICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjVcblx0XHQgICAgICAgIH0pXG5cdFx0Ki9cblx0XHRzaHVmZmxlOiBmdW5jdGlvbiBzaHVmZmxlKGFyciwgbWluLCBtYXgpIHtcblx0XHRcdGFyciA9IGFyciB8fCBbXVxuXHRcdFx0dmFyIG9sZCA9IGFyci5zbGljZSgwKSxcblx0XHRcdFx0cmVzdWx0ID0gW10sXG5cdFx0XHRcdGluZGV4ID0gMCxcblx0XHRcdFx0bGVuZ3RoID0gb2xkLmxlbmd0aDtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aW5kZXggPSB0aGlzLm5hdHVyYWwoMCwgb2xkLmxlbmd0aCAtIDEpXG5cdFx0XHRcdHJlc3VsdC5wdXNoKG9sZFtpbmRleF0pXG5cdFx0XHRcdG9sZC5zcGxpY2UoaW5kZXgsIDEpXG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRjYXNlIDE6XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdFxuXHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0bWF4ID0gbWluXG5cdFx0XHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXG5cdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRtaW4gPSBwYXJzZUludChtaW4sIDEwKVxuXHRcdFx0XHRcdG1heCA9IHBhcnNlSW50KG1heCwgMTApXG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdC5zbGljZSgwLCB0aGlzLm5hdHVyYWwobWluLCBtYXgpKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgICAgKiBSYW5kb20ub3JkZXIoaXRlbSwgaXRlbSlcblx0XHQgICAgKiBSYW5kb20ub3JkZXIoW2l0ZW0sIGl0ZW0gLi4uXSlcblxuXHRcdCAgICDpobrluo/ojrflj5bmlbDnu4TkuK3nmoTlhYPntKBcblxuXHRcdCAgICBbSlNPTuWvvOWFpeaVsOe7hOaUr+aMgeaVsOe7hOaVsOaNruW9leWFpV0oaHR0cHM6Ly9naXRodWIuY29tL3RoeC9SQVAvaXNzdWVzLzIyKVxuXG5cdFx0ICAgIOS4jeaUr+aMgeWNleeLrOiwg+eUqO+8gVxuXHRcdCovXG5cdFx0b3JkZXI6IGZ1bmN0aW9uIG9yZGVyKGFycmF5KSB7XG5cdFx0XHRvcmRlci5jYWNoZSA9IG9yZGVyLmNhY2hlIHx8IHt9XG5cblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgYXJyYXkgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcblxuXHRcdFx0Ly8gb3B0aW9ucy5jb250ZXh0LnBhdGgvdGVtcGxhdGVQYXRoXG5cdFx0XHR2YXIgb3B0aW9ucyA9IG9yZGVyLm9wdGlvbnNcblx0XHRcdHZhciB0ZW1wbGF0ZVBhdGggPSBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLmpvaW4oJy4nKVxuXG5cdFx0XHR2YXIgY2FjaGUgPSAoXG5cdFx0XHRcdG9yZGVyLmNhY2hlW3RlbXBsYXRlUGF0aF0gPSBvcmRlci5jYWNoZVt0ZW1wbGF0ZVBhdGhdIHx8IHtcblx0XHRcdFx0XHRpbmRleDogMCxcblx0XHRcdFx0XHRhcnJheTogYXJyYXlcblx0XHRcdFx0fVxuXHRcdFx0KVxuXG5cdFx0XHRyZXR1cm4gY2FjaGUuYXJyYXlbY2FjaGUuaW5kZXgrKyAlIGNhY2hlLmFycmF5Lmxlbmd0aF1cblx0XHR9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDE1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgTmFtZVxuXG5cdCAgICBbQmV5b25kIHRoZSBUb3AgMTAwMCBOYW1lc10oaHR0cDovL3d3dy5zc2EuZ292L29hY3QvYmFieW5hbWVzL2xpbWl0cy5odG1sKVxuXHQqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoToi7HmloflkI3jgIJcblx0XHRmaXJzdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmFtZXMgPSBbXG5cdFx0XHRcdC8vIG1hbGVcblx0XHRcdFx0XCJKYW1lc1wiLCBcIkpvaG5cIiwgXCJSb2JlcnRcIiwgXCJNaWNoYWVsXCIsIFwiV2lsbGlhbVwiLFxuXHRcdFx0XHRcIkRhdmlkXCIsIFwiUmljaGFyZFwiLCBcIkNoYXJsZXNcIiwgXCJKb3NlcGhcIiwgXCJUaG9tYXNcIixcblx0XHRcdFx0XCJDaHJpc3RvcGhlclwiLCBcIkRhbmllbFwiLCBcIlBhdWxcIiwgXCJNYXJrXCIsIFwiRG9uYWxkXCIsXG5cdFx0XHRcdFwiR2VvcmdlXCIsIFwiS2VubmV0aFwiLCBcIlN0ZXZlblwiLCBcIkVkd2FyZFwiLCBcIkJyaWFuXCIsXG5cdFx0XHRcdFwiUm9uYWxkXCIsIFwiQW50aG9ueVwiLCBcIktldmluXCIsIFwiSmFzb25cIiwgXCJNYXR0aGV3XCIsXG5cdFx0XHRcdFwiR2FyeVwiLCBcIlRpbW90aHlcIiwgXCJKb3NlXCIsIFwiTGFycnlcIiwgXCJKZWZmcmV5XCIsXG5cdFx0XHRcdFwiRnJhbmtcIiwgXCJTY290dFwiLCBcIkVyaWNcIlxuXHRcdFx0XS5jb25jYXQoW1xuXHRcdFx0XHQvLyBmZW1hbGVcblx0XHRcdFx0XCJNYXJ5XCIsIFwiUGF0cmljaWFcIiwgXCJMaW5kYVwiLCBcIkJhcmJhcmFcIiwgXCJFbGl6YWJldGhcIixcblx0XHRcdFx0XCJKZW5uaWZlclwiLCBcIk1hcmlhXCIsIFwiU3VzYW5cIiwgXCJNYXJnYXJldFwiLCBcIkRvcm90aHlcIixcblx0XHRcdFx0XCJMaXNhXCIsIFwiTmFuY3lcIiwgXCJLYXJlblwiLCBcIkJldHR5XCIsIFwiSGVsZW5cIixcblx0XHRcdFx0XCJTYW5kcmFcIiwgXCJEb25uYVwiLCBcIkNhcm9sXCIsIFwiUnV0aFwiLCBcIlNoYXJvblwiLFxuXHRcdFx0XHRcIk1pY2hlbGxlXCIsIFwiTGF1cmFcIiwgXCJTYXJhaFwiLCBcIktpbWJlcmx5XCIsIFwiRGVib3JhaFwiLFxuXHRcdFx0XHRcIkplc3NpY2FcIiwgXCJTaGlybGV5XCIsIFwiQ3ludGhpYVwiLCBcIkFuZ2VsYVwiLCBcIk1lbGlzc2FcIixcblx0XHRcdFx0XCJCcmVuZGFcIiwgXCJBbXlcIiwgXCJBbm5hXCJcblx0XHRcdF0pXG5cdFx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHRcdFx0XHQvLyBvciB0aGlzLmNhcGl0YWxpemUodGhpcy53b3JkKCkpXG5cdFx0fSxcblx0XHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoToi7Hmloflp5PjgIJcblx0XHRsYXN0OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuYW1lcyA9IFtcblx0XHRcdFx0XCJTbWl0aFwiLCBcIkpvaG5zb25cIiwgXCJXaWxsaWFtc1wiLCBcIkJyb3duXCIsIFwiSm9uZXNcIixcblx0XHRcdFx0XCJNaWxsZXJcIiwgXCJEYXZpc1wiLCBcIkdhcmNpYVwiLCBcIlJvZHJpZ3VlelwiLCBcIldpbHNvblwiLFxuXHRcdFx0XHRcIk1hcnRpbmV6XCIsIFwiQW5kZXJzb25cIiwgXCJUYXlsb3JcIiwgXCJUaG9tYXNcIiwgXCJIZXJuYW5kZXpcIixcblx0XHRcdFx0XCJNb29yZVwiLCBcIk1hcnRpblwiLCBcIkphY2tzb25cIiwgXCJUaG9tcHNvblwiLCBcIldoaXRlXCIsXG5cdFx0XHRcdFwiTG9wZXpcIiwgXCJMZWVcIiwgXCJHb256YWxlelwiLCBcIkhhcnJpc1wiLCBcIkNsYXJrXCIsXG5cdFx0XHRcdFwiTGV3aXNcIiwgXCJSb2JpbnNvblwiLCBcIldhbGtlclwiLCBcIlBlcmV6XCIsIFwiSGFsbFwiLFxuXHRcdFx0XHRcIllvdW5nXCIsIFwiQWxsZW5cIlxuXHRcdFx0XVxuXHRcdFx0cmV0dXJuIHRoaXMucGljayhuYW1lcylcblx0XHRcdFx0Ly8gb3IgdGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKVxuXHRcdH0sXG5cdFx0Ly8g6ZqP5py655Sf5oiQ5LiA5Liq5bi46KeB55qE6Iux5paH5aeT5ZCN44CCXG5cdFx0bmFtZTogZnVuY3Rpb24obWlkZGxlKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5maXJzdCgpICsgJyAnICtcblx0XHRcdFx0KG1pZGRsZSA/IHRoaXMuZmlyc3QoKSArICcgJyA6ICcnKSArXG5cdFx0XHRcdHRoaXMubGFzdCgpXG5cdFx0fSxcblx0XHQvKlxuXHRcdCAgICDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoTkuK3mloflp5PjgIJcblx0XHQgICAgW+S4lueVjOW4uOeUqOWnk+awj+aOkuihjF0oaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzE3MTkxMTUuaHRtKVxuXHRcdCAgICBb546E5rS+572RIC0g572R57uc5bCP6K+05Yib5L2c6L6F5Yqp5bmz5Y+wXShodHRwOi8veHVhbnBhaS5zaW5hYXBwLmNvbS8pXG5cdFx0ICovXG5cdFx0Y2ZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuYW1lcyA9IChcblx0XHRcdFx0J+eOiyDmnY4g5bygIOWImCDpmYgg5p2oIOi1tSDpu4Qg5ZGoIOWQtCAnICtcblx0XHRcdFx0J+W+kCDlrZkg6IOhIOacsSDpq5gg5p6XIOS9lSDpg60g6amsIOe9lyAnICtcblx0XHRcdFx0J+aigSDlrosg6YORIOiwoiDpn6kg5ZSQIOWGryDkuo4g6JGjIOiQpyAnICtcblx0XHRcdFx0J+eoiyDmm7kg6KKBIOmCkyDorrgg5YKFIOayiCDmm74g5b2tIOWQlSAnICtcblx0XHRcdFx0J+iLjyDljaIg6JKLIOiUoSDotL4g5LiBIOmtjyDolpsg5Y+2IOmYjiAnICtcblx0XHRcdFx0J+S9mSDmvZgg5p2cIOaItCDlpI8g6ZS6IOaxqiDnlLAg5Lu7IOWnnCAnICtcblx0XHRcdFx0J+iMgyDmlrkg55+zIOWnmiDosK0g5buWIOmCuSDnhoog6YeRIOmZhiAnICtcblx0XHRcdFx0J+mDnSDlrZQg55m9IOW0lCDlurcg5q+bIOmCsSDnp6Yg5rGfIOWPsiAnICtcblx0XHRcdFx0J+mhviDkvq8g6YK1IOWtnyDpvpkg5LiHIOautSDpm7cg6ZKxIOaxpCAnICtcblx0XHRcdFx0J+WwuSDpu44g5piTIOW4uCDmraYg5LmUIOi0uiDotZYg6b6aIOaWhydcblx0XHRcdCkuc3BsaXQoJyAnKVxuXHRcdFx0cmV0dXJuIHRoaXMucGljayhuYW1lcylcblx0XHR9LFxuXHRcdC8qXG5cdFx0ICAgIOmaj+acuueUn+aIkOS4gOS4quW4uOingeeahOS4reaWh+WQjeOAglxuXHRcdCAgICBb5Lit5Zu95pyA5bi46KeB5ZCN5a2X5YmNNTDlkI1f5LiJ5Lmd566X5ZG9572RXShodHRwOi8vd3d3Lm5hbWU5OTkubmV0L3hpbmdtaW5nL3hpbmdzaGkvMjAxMzEwMDQvNDguaHRtbClcblx0XHQgKi9cblx0XHRjbGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmFtZXMgPSAoXG5cdFx0XHRcdCfkvJ8g6IqzIOWonCDnp4Doi7Eg5pWPIOmdmSDkuL0g5by6IOejiiDlhpsgJyArXG5cdFx0XHRcdCfmtIsg5YuHIOiJsyDmnbAg5aifIOa2myDmmI4g6LaFIOengOWFsCDpnJ4gJyArXG5cdFx0XHRcdCflubMg5YiaIOahguiLsSdcblx0XHRcdCkuc3BsaXQoJyAnKVxuXHRcdFx0cmV0dXJuIHRoaXMucGljayhuYW1lcylcblx0XHR9LFxuXHRcdC8vIOmaj+acuueUn+aIkOS4gOS4quW4uOingeeahOS4reaWh+Wnk+WQjeOAglxuXHRcdGNuYW1lOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmNmaXJzdCgpICsgdGhpcy5jbGFzdCgpXG5cdFx0fVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIFdlYlxuXHQqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8qXG5cdCAgICAgICAg6ZqP5py655Sf5oiQ5LiA5LiqIFVSTOOAglxuXG5cdCAgICAgICAgW1VSTCDop4TojINdKGh0dHA6Ly93d3cudzMub3JnL0FkZHJlc3NpbmcvVVJML3VybC1zcGVjLnR4dClcblx0ICAgICAgICAgICAgaHR0cCAgICAgICAgICAgICAgICAgICAgSHlwZXJ0ZXh0IFRyYW5zZmVyIFByb3RvY29sIFxuXHQgICAgICAgICAgICBmdHAgICAgICAgICAgICAgICAgICAgICBGaWxlIFRyYW5zZmVyIHByb3RvY29sIFxuXHQgICAgICAgICAgICBnb3BoZXIgICAgICAgICAgICAgICAgICBUaGUgR29waGVyIHByb3RvY29sIFxuXHQgICAgICAgICAgICBtYWlsdG8gICAgICAgICAgICAgICAgICBFbGVjdHJvbmljIG1haWwgYWRkcmVzcyBcblx0ICAgICAgICAgICAgbWlkICAgICAgICAgICAgICAgICAgICAgTWVzc2FnZSBpZGVudGlmaWVycyBmb3IgZWxlY3Ryb25pYyBtYWlsIFxuXHQgICAgICAgICAgICBjaWQgICAgICAgICAgICAgICAgICAgICBDb250ZW50IGlkZW50aWZpZXJzIGZvciBNSU1FIGJvZHkgcGFydCBcblx0ICAgICAgICAgICAgbmV3cyAgICAgICAgICAgICAgICAgICAgVXNlbmV0IG5ld3MgXG5cdCAgICAgICAgICAgIG5udHAgICAgICAgICAgICAgICAgICAgIFVzZW5ldCBuZXdzIGZvciBsb2NhbCBOTlRQIGFjY2VzcyBvbmx5IFxuXHQgICAgICAgICAgICBwcm9zcGVybyAgICAgICAgICAgICAgICBBY2Nlc3MgdXNpbmcgdGhlIHByb3NwZXJvIHByb3RvY29scyBcblx0ICAgICAgICAgICAgdGVsbmV0IHJsb2dpbiB0bjMyNzAgICAgUmVmZXJlbmNlIHRvIGludGVyYWN0aXZlIHNlc3Npb25zXG5cdCAgICAgICAgICAgIHdhaXMgICAgICAgICAgICAgICAgICAgIFdpZGUgQXJlYSBJbmZvcm1hdGlvbiBTZXJ2ZXJzIFxuXHQgICAgKi9cblx0ICAgIHVybDogZnVuY3Rpb24ocHJvdG9jb2wsIGhvc3QpIHtcblx0ICAgICAgICByZXR1cm4gKHByb3RvY29sIHx8IHRoaXMucHJvdG9jb2woKSkgKyAnOi8vJyArIC8vIHByb3RvY29sP1xuXHQgICAgICAgICAgICAoaG9zdCB8fCB0aGlzLmRvbWFpbigpKSArIC8vIGhvc3Q/XG5cdCAgICAgICAgICAgICcvJyArIHRoaXMud29yZCgpXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5LiqIFVSTCDljY/orq7jgIJcblx0ICAgIHByb3RvY29sOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5waWNrKFxuXHQgICAgICAgICAgICAvLyDljY/orq7nsIdcblx0ICAgICAgICAgICAgJ2h0dHAgZnRwIGdvcGhlciBtYWlsdG8gbWlkIGNpZCBuZXdzIG5udHAgcHJvc3Blcm8gdGVsbmV0IHJsb2dpbiB0bjMyNzAgd2Fpcycuc3BsaXQoJyAnKVxuXHQgICAgICAgIClcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrln5/lkI3jgIJcblx0ICAgIGRvbWFpbjogZnVuY3Rpb24odGxkKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMud29yZCgpICsgJy4nICsgKHRsZCB8fCB0aGlzLnRsZCgpKVxuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAg6ZqP5py655Sf5oiQ5LiA5Liq6aG257qn5Z+f5ZCN44CCXG5cdCAgICAgICAg5Zu96ZmF6aG257qn5Z+f5ZCNIGludGVybmF0aW9uYWwgdG9wLWxldmVsIGRvbWFpbi1uYW1lcywgaVRMRHNcblx0ICAgICAgICDlm73lrrbpobbnuqfln5/lkI0gbmF0aW9uYWwgdG9wLWxldmVsIGRvbWFpbm5hbWVzLCBuVExEc1xuXHQgICAgICAgIFvln5/lkI3lkI7nvIDlpKflhahdKGh0dHA6Ly93d3cuMTYzbnMuY29tL3ppeHVuL3Bvc3QvNDQxNy5odG1sKVxuXHQgICAgKi9cblx0ICAgIHRsZDogZnVuY3Rpb24oKSB7IC8vIFRvcCBMZXZlbCBEb21haW5cblx0ICAgICAgICByZXR1cm4gdGhpcy5waWNrKFxuXHQgICAgICAgICAgICAoXG5cdCAgICAgICAgICAgICAgICAvLyDln5/lkI3lkI7nvIBcblx0ICAgICAgICAgICAgICAgICdjb20gbmV0IG9yZyBlZHUgZ292IGludCBtaWwgY24gJyArXG5cdCAgICAgICAgICAgICAgICAvLyDlm73lhoXln5/lkI1cblx0ICAgICAgICAgICAgICAgICdjb20uY24gbmV0LmNuIGdvdi5jbiBvcmcuY24gJyArXG5cdCAgICAgICAgICAgICAgICAvLyDkuK3mloflm73lhoXln5/lkI1cblx0ICAgICAgICAgICAgICAgICfkuK3lm70g5Lit5Zu95LqS6IGULuWFrOWPuCDkuK3lm73kupLogZQu572R57ucICcgK1xuXHQgICAgICAgICAgICAgICAgLy8g5paw5Zu96ZmF5Z+f5ZCNXG5cdCAgICAgICAgICAgICAgICAndGVsIGJpeiBjYyB0diBpbmZvIG5hbWUgaGsgbW9iaSBhc2lhIGNkIHRyYXZlbCBwcm8gbXVzZXVtIGNvb3AgYWVybyAnICtcblx0ICAgICAgICAgICAgICAgIC8vIOS4lueVjOWQhOWbveWfn+WQjeWQjue8gFxuXHQgICAgICAgICAgICAgICAgJ2FkIGFlIGFmIGFnIGFpIGFsIGFtIGFuIGFvIGFxIGFyIGFzIGF0IGF1IGF3IGF6IGJhIGJiIGJkIGJlIGJmIGJnIGJoIGJpIGJqIGJtIGJuIGJvIGJyIGJzIGJ0IGJ2IGJ3IGJ5IGJ6IGNhIGNjIGNmIGNnIGNoIGNpIGNrIGNsIGNtIGNuIGNvIGNxIGNyIGN1IGN2IGN4IGN5IGN6IGRlIGRqIGRrIGRtIGRvIGR6IGVjIGVlIGVnIGVoIGVzIGV0IGV2IGZpIGZqIGZrIGZtIGZvIGZyIGdhIGdiIGdkIGdlIGdmIGdoIGdpIGdsIGdtIGduIGdwIGdyIGd0IGd1IGd3IGd5IGhrIGhtIGhuIGhyIGh0IGh1IGlkIGllIGlsIGluIGlvIGlxIGlyIGlzIGl0IGptIGpvIGpwIGtlIGtnIGtoIGtpIGttIGtuIGtwIGtyIGt3IGt5IGt6IGxhIGxiIGxjIGxpIGxrIGxyIGxzIGx0IGx1IGx2IGx5IG1hIG1jIG1kIG1nIG1oIG1sIG1tIG1uIG1vIG1wIG1xIG1yIG1zIG10IG12IG13IG14IG15IG16IG5hIG5jIG5lIG5mIG5nIG5pIG5sIG5vIG5wIG5yIG50IG51IG56IG9tIHFhIHBhIHBlIHBmIHBnIHBoIHBrIHBsIHBtIHBuIHByIHB0IHB3IHB5IHJlIHJvIHJ1IHJ3IHNhIHNiIHNjIHNkIHNlIHNnIHNoIHNpIHNqIHNrIHNsIHNtIHNuIHNvIHNyIHN0IHN1IHN5IHN6IHRjIHRkIHRmIHRnIHRoIHRqIHRrIHRtIHRuIHRvIHRwIHRyIHR0IHR2IHR3IHR6IHVhIHVnIHVrIHVzIHV5IHZhIHZjIHZlIHZnIHZuIHZ1IHdmIHdzIHllIHl1IHphIHptIHpyIHp3J1xuXHQgICAgICAgICAgICApLnNwbGl0KCcgJylcblx0ICAgICAgICApXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq6YKu5Lu25Zyw5Z2A44CCXG5cdCAgICBlbWFpbDogZnVuY3Rpb24oZG9tYWluKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyKCdsb3dlcicpICsgJy4nICsgdGhpcy53b3JkKCkgKyAnQCcgK1xuXHQgICAgICAgICAgICAoXG5cdCAgICAgICAgICAgICAgICBkb21haW4gfHxcblx0ICAgICAgICAgICAgICAgICh0aGlzLndvcmQoKSArICcuJyArIHRoaXMudGxkKCkpXG5cdCAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuY2hhcmFjdGVyKCdsb3dlcicpICsgJy4nICsgdGhpcy5sYXN0KCkudG9Mb3dlckNhc2UoKSArICdAJyArIHRoaXMubGFzdCgpLnRvTG93ZXJDYXNlKCkgKyAnLicgKyB0aGlzLnRsZCgpXG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLndvcmQoKSArICdAJyArIChkb21haW4gfHwgdGhpcy5kb21haW4oKSlcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKogSVAg5Zyw5Z2A44CCXG5cdCAgICBpcDogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgJy4nICtcblx0ICAgICAgICAgICAgdGhpcy5uYXR1cmFsKDAsIDI1NSkgKyAnLicgK1xuXHQgICAgICAgICAgICB0aGlzLm5hdHVyYWwoMCwgMjU1KSArICcuJyArXG5cdCAgICAgICAgICAgIHRoaXMubmF0dXJhbCgwLCAyNTUpXG5cdCAgICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDE3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgQWRkcmVzc1xuXHQqL1xuXG5cdHZhciBESUNUID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOClcblx0dmFyIFJFR0lPTiA9IFsn5Lic5YyXJywgJ+WNjuWMlycsICfljY7kuJwnLCAn5Y2O5LitJywgJ+WNjuWNlycsICfopb/ljZcnLCAn6KW/5YyXJ11cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quWkp+WMuuOAglxuXHQgICAgcmVnaW9uOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5waWNrKFJFR0lPTilcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrvvIjkuK3lm73vvInnnIHvvIjmiJbnm7TovpbluILjgIHoh6rmsrvljLrjgIHnibnliKvooYzmlL/ljLrvvInjgIJcblx0ICAgIHByb3ZpbmNlOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5waWNrKERJQ1QpLm5hbWVcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrvvIjkuK3lm73vvInluILjgIJcblx0ICAgIGNpdHk6IGZ1bmN0aW9uKHByZWZpeCkge1xuXHQgICAgICAgIHZhciBwcm92aW5jZSA9IHRoaXMucGljayhESUNUKVxuXHQgICAgICAgIHZhciBjaXR5ID0gdGhpcy5waWNrKHByb3ZpbmNlLmNoaWxkcmVuKVxuXHQgICAgICAgIHJldHVybiBwcmVmaXggPyBbcHJvdmluY2UubmFtZSwgY2l0eS5uYW1lXS5qb2luKCcgJykgOiBjaXR5Lm5hbWVcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrvvIjkuK3lm73vvInljr/jgIJcblx0ICAgIGNvdW50eTogZnVuY3Rpb24ocHJlZml4KSB7XG5cdCAgICAgICAgdmFyIHByb3ZpbmNlID0gdGhpcy5waWNrKERJQ1QpXG5cdCAgICAgICAgdmFyIGNpdHkgPSB0aGlzLnBpY2socHJvdmluY2UuY2hpbGRyZW4pXG5cdCAgICAgICAgdmFyIGNvdW50eSA9IHRoaXMucGljayhjaXR5LmNoaWxkcmVuKSB8fCB7XG5cdCAgICAgICAgICAgIG5hbWU6ICctJ1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcHJlZml4ID8gW3Byb3ZpbmNlLm5hbWUsIGNpdHkubmFtZSwgY291bnR5Lm5hbWVdLmpvaW4oJyAnKSA6IGNvdW50eS5uYW1lXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq6YKu5pS/57yW56CB77yI5YWt5L2N5pWw5a2X77yJ44CCXG5cdCAgICB6aXA6IGZ1bmN0aW9uKGxlbikge1xuXHQgICAgICAgIHZhciB6aXAgPSAnJ1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKGxlbiB8fCA2KTsgaSsrKSB6aXAgKz0gdGhpcy5uYXR1cmFsKDAsIDkpXG5cdCAgICAgICAgcmV0dXJuIHppcFxuXHQgICAgfVxuXG5cdCAgICAvLyBhZGRyZXNzOiBmdW5jdGlvbigpIHt9LFxuXHQgICAgLy8gcGhvbmU6IGZ1bmN0aW9uKCkge30sXG5cdCAgICAvLyBhcmVhY29kZTogZnVuY3Rpb24oKSB7fSxcblx0ICAgIC8vIHN0cmVldDogZnVuY3Rpb24oKSB7fSxcblx0ICAgIC8vIHN0cmVldF9zdWZmaXhlczogZnVuY3Rpb24oKSB7fSxcblx0ICAgIC8vIHN0cmVldF9zdWZmaXg6IGZ1bmN0aW9uKCkge30sXG5cdCAgICAvLyBzdGF0ZXM6IGZ1bmN0aW9uKCkge30sXG5cdCAgICAvLyBzdGF0ZTogZnVuY3Rpb24oKSB7fSxcblx0fVxuXG4vKioqLyB9LFxuLyogMTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBBZGRyZXNzIOWtl+WFuOaVsOaNrlxuXG5cdCAgICDlrZflhbjmlbDmja7mnaXmupAgaHR0cDovL3d3dy5hdGF0ZWNoLm9yZy9hcnRpY2xlcy8zMDAyOD9ybmQ9MjU0MjU5ODU2XG5cblx0ICAgIOWbveaghyDnnIHvvIjluILvvInnuqfooYzmlL/ljLrliJLnoIHooahcblxuXHQgICAg5Y2O5YyXICAg5YyX5Lqs5biCIOWkqea0peW4giDmsrPljJfnnIEg5bGx6KW/55yBIOWGheiSmeWPpOiHquayu+WMulxuXHQgICAg5Lic5YyXICAg6L695a6B55yBIOWQieael+ecgSDpu5HpvpnmsZ/nnIFcblx0ICAgIOWNjuS4nCAgIOS4iua1t+W4giDmsZ/oi4/nnIEg5rWZ5rGf55yBIOWuieW+veecgSDnpo/lu7rnnIEg5rGf6KW/55yBIOWxseS4nOecgVxuXHQgICAg5Y2O5Y2XICAg5bm/5Lic55yBIOW5v+ilv+WjruaXj+iHquayu+WMuiDmtbfljZfnnIFcblx0ICAgIOWNjuS4rSAgIOays+WNl+ecgSDmuZbljJfnnIEg5rmW5Y2X55yBXG5cdCAgICDopb/ljZcgICDph43luobluIIg5Zub5bed55yBIOi0teW3nuecgSDkupHljZfnnIEg6KW/6JeP6Ieq5rK75Yy6XG5cdCAgICDopb/ljJcgICDpmZXopb/nnIEg55SY6IKD55yBIOmdkua1t+ecgSDlroHlpI/lm57ml4/oh6rmsrvljLog5paw55aG57u05ZC+5bCU6Ieq5rK75Yy6XG5cdCAgICDmuK/mvrPlj7Ag6aaZ5riv54m55Yir6KGM5pS/5Yy6IOa+s+mXqOeJueWIq+ihjOaUv+WMuiDlj7Dmub7nnIFcblx0ICAgIFxuXHQgICAgKirmjpLluo8qKlxuXHQgICAgXG5cdCAgICBgYGBqc1xuXHQgICAgdmFyIG1hcCA9IHt9XG5cdCAgICBfLmVhY2goXy5rZXlzKFJFR0lPTlMpLGZ1bmN0aW9uKGlkKXtcblx0ICAgICAgbWFwW2lkXSA9IFJFR0lPTlNbSURdXG5cdCAgICB9KVxuXHQgICAgSlNPTi5zdHJpbmdpZnkobWFwKVxuXHQgICAgYGBgXG5cdCovXG5cdHZhciBESUNUID0ge1xuXHQgICAgXCIxMTAwMDBcIjogXCLljJfkuqxcIixcblx0ICAgIFwiMTEwMTAwXCI6IFwi5YyX5Lqs5biCXCIsXG5cdCAgICBcIjExMDEwMVwiOiBcIuS4nOWfjuWMulwiLFxuXHQgICAgXCIxMTAxMDJcIjogXCLopb/ln47ljLpcIixcblx0ICAgIFwiMTEwMTA1XCI6IFwi5pyd6Ziz5Yy6XCIsXG5cdCAgICBcIjExMDEwNlwiOiBcIuS4sOWPsOWMulwiLFxuXHQgICAgXCIxMTAxMDdcIjogXCLnn7Pmma/lsbHljLpcIixcblx0ICAgIFwiMTEwMTA4XCI6IFwi5rW35reA5Yy6XCIsXG5cdCAgICBcIjExMDEwOVwiOiBcIumXqOWktOayn+WMulwiLFxuXHQgICAgXCIxMTAxMTFcIjogXCLmiL/lsbHljLpcIixcblx0ICAgIFwiMTEwMTEyXCI6IFwi6YCa5bee5Yy6XCIsXG5cdCAgICBcIjExMDExM1wiOiBcIumhuuS5ieWMulwiLFxuXHQgICAgXCIxMTAxMTRcIjogXCLmmIzlubPljLpcIixcblx0ICAgIFwiMTEwMTE1XCI6IFwi5aSn5YW05Yy6XCIsXG5cdCAgICBcIjExMDExNlwiOiBcIuaAgOaflOWMulwiLFxuXHQgICAgXCIxMTAxMTdcIjogXCLlubPosLfljLpcIixcblx0ICAgIFwiMTEwMjI4XCI6IFwi5a+G5LqR5Y6/XCIsXG5cdCAgICBcIjExMDIyOVwiOiBcIuW7tuW6huWOv1wiLFxuXHQgICAgXCIxMTAyMzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTIwMDAwXCI6IFwi5aSp5rSlXCIsXG5cdCAgICBcIjEyMDEwMFwiOiBcIuWkqea0peW4glwiLFxuXHQgICAgXCIxMjAxMDFcIjogXCLlkozlubPljLpcIixcblx0ICAgIFwiMTIwMTAyXCI6IFwi5rKz5Lic5Yy6XCIsXG5cdCAgICBcIjEyMDEwM1wiOiBcIuays+ilv+WMulwiLFxuXHQgICAgXCIxMjAxMDRcIjogXCLljZflvIDljLpcIixcblx0ICAgIFwiMTIwMTA1XCI6IFwi5rKz5YyX5Yy6XCIsXG5cdCAgICBcIjEyMDEwNlwiOiBcIue6ouahpeWMulwiLFxuXHQgICAgXCIxMjAxMTBcIjogXCLkuJzkuL3ljLpcIixcblx0ICAgIFwiMTIwMTExXCI6IFwi6KW/6Z2S5Yy6XCIsXG5cdCAgICBcIjEyMDExMlwiOiBcIua0peWNl+WMulwiLFxuXHQgICAgXCIxMjAxMTNcIjogXCLljJfovrDljLpcIixcblx0ICAgIFwiMTIwMTE0XCI6IFwi5q2m5riF5Yy6XCIsXG5cdCAgICBcIjEyMDExNVwiOiBcIuWuneWdu+WMulwiLFxuXHQgICAgXCIxMjAxMTZcIjogXCLmu6jmtbfmlrDljLpcIixcblx0ICAgIFwiMTIwMjIxXCI6IFwi5a6B5rKz5Y6/XCIsXG5cdCAgICBcIjEyMDIyM1wiOiBcIumdmea1t+WOv1wiLFxuXHQgICAgXCIxMjAyMjVcIjogXCLok5/ljr9cIixcblx0ICAgIFwiMTIwMjI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDAwMFwiOiBcIuays+WMl+ecgVwiLFxuXHQgICAgXCIxMzAxMDBcIjogXCLnn7PlrrbluoTluIJcIixcblx0ICAgIFwiMTMwMTAyXCI6IFwi6ZW/5a6J5Yy6XCIsXG5cdCAgICBcIjEzMDEwM1wiOiBcIuahpeS4nOWMulwiLFxuXHQgICAgXCIxMzAxMDRcIjogXCLmoaXopb/ljLpcIixcblx0ICAgIFwiMTMwMTA1XCI6IFwi5paw5Y2O5Yy6XCIsXG5cdCAgICBcIjEzMDEwN1wiOiBcIuS6lemZieefv+WMulwiLFxuXHQgICAgXCIxMzAxMDhcIjogXCLoo5XljY7ljLpcIixcblx0ICAgIFwiMTMwMTIxXCI6IFwi5LqV6ZmJ5Y6/XCIsXG5cdCAgICBcIjEzMDEyM1wiOiBcIuato+WumuWOv1wiLFxuXHQgICAgXCIxMzAxMjRcIjogXCLmoL7ln47ljr9cIixcblx0ICAgIFwiMTMwMTI1XCI6IFwi6KGM5ZSQ5Y6/XCIsXG5cdCAgICBcIjEzMDEyNlwiOiBcIueBteWvv+WOv1wiLFxuXHQgICAgXCIxMzAxMjdcIjogXCLpq5jpgpHljr9cIixcblx0ICAgIFwiMTMwMTI4XCI6IFwi5rex5rO95Y6/XCIsXG5cdCAgICBcIjEzMDEyOVwiOiBcIui1nueah+WOv1wiLFxuXHQgICAgXCIxMzAxMzBcIjogXCLml6DmnoHljr9cIixcblx0ICAgIFwiMTMwMTMxXCI6IFwi5bmz5bGx5Y6/XCIsXG5cdCAgICBcIjEzMDEzMlwiOiBcIuWFg+awj+WOv1wiLFxuXHQgICAgXCIxMzAxMzNcIjogXCLotbXljr9cIixcblx0ICAgIFwiMTMwMTgxXCI6IFwi6L6b6ZuG5biCXCIsXG5cdCAgICBcIjEzMDE4MlwiOiBcIuiXgeWfjuW4glwiLFxuXHQgICAgXCIxMzAxODNcIjogXCLmmYvlt57luIJcIixcblx0ICAgIFwiMTMwMTg0XCI6IFwi5paw5LmQ5biCXCIsXG5cdCAgICBcIjEzMDE4NVwiOiBcIum5v+azieW4glwiLFxuXHQgICAgXCIxMzAxODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwMjAwXCI6IFwi5ZSQ5bGx5biCXCIsXG5cdCAgICBcIjEzMDIwMlwiOiBcIui3r+WNl+WMulwiLFxuXHQgICAgXCIxMzAyMDNcIjogXCLot6/ljJfljLpcIixcblx0ICAgIFwiMTMwMjA0XCI6IFwi5Y+k5Ya25Yy6XCIsXG5cdCAgICBcIjEzMDIwNVwiOiBcIuW8gOW5s+WMulwiLFxuXHQgICAgXCIxMzAyMDdcIjogXCLkuLDljZfljLpcIixcblx0ICAgIFwiMTMwMjA4XCI6IFwi5Liw5ram5Yy6XCIsXG5cdCAgICBcIjEzMDIyM1wiOiBcIua7puWOv1wiLFxuXHQgICAgXCIxMzAyMjRcIjogXCLmu6bljZfljr9cIixcblx0ICAgIFwiMTMwMjI1XCI6IFwi5LmQ5Lqt5Y6/XCIsXG5cdCAgICBcIjEzMDIyN1wiOiBcIui/geilv+WOv1wiLFxuXHQgICAgXCIxMzAyMjlcIjogXCLnjonnlLDljr9cIixcblx0ICAgIFwiMTMwMjMwXCI6IFwi5pu55aaD55S45Yy6XCIsXG5cdCAgICBcIjEzMDI4MVwiOiBcIumBteWMluW4glwiLFxuXHQgICAgXCIxMzAyODNcIjogXCLov4HlronluIJcIixcblx0ICAgIFwiMTMwMjg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDMwMFwiOiBcIuenpueah+Wym+W4glwiLFxuXHQgICAgXCIxMzAzMDJcIjogXCLmtbfmuK/ljLpcIixcblx0ICAgIFwiMTMwMzAzXCI6IFwi5bGx5rW35YWz5Yy6XCIsXG5cdCAgICBcIjEzMDMwNFwiOiBcIuWMl+aItOays+WMulwiLFxuXHQgICAgXCIxMzAzMjFcIjogXCLpnZLpvpnmu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMTMwMzIyXCI6IFwi5piM6buO5Y6/XCIsXG5cdCAgICBcIjEzMDMyM1wiOiBcIuaKmuWugeWOv1wiLFxuXHQgICAgXCIxMzAzMjRcIjogXCLljaLpvpnljr9cIixcblx0ICAgIFwiMTMwMzk4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDQwMFwiOiBcIumCr+mDuOW4glwiLFxuXHQgICAgXCIxMzA0MDJcIjogXCLpgq/lsbHljLpcIixcblx0ICAgIFwiMTMwNDAzXCI6IFwi5Lib5Y+w5Yy6XCIsXG5cdCAgICBcIjEzMDQwNFwiOiBcIuWkjeWFtOWMulwiLFxuXHQgICAgXCIxMzA0MDZcIjogXCLls7Dls7Dnn7/ljLpcIixcblx0ICAgIFwiMTMwNDIxXCI6IFwi6YKv6YO45Y6/XCIsXG5cdCAgICBcIjEzMDQyM1wiOiBcIuS4tOa8s+WOv1wiLFxuXHQgICAgXCIxMzA0MjRcIjogXCLmiJDlronljr9cIixcblx0ICAgIFwiMTMwNDI1XCI6IFwi5aSn5ZCN5Y6/XCIsXG5cdCAgICBcIjEzMDQyNlwiOiBcIua2ieWOv1wiLFxuXHQgICAgXCIxMzA0MjdcIjogXCLno4Hljr9cIixcblx0ICAgIFwiMTMwNDI4XCI6IFwi6IKl5Lmh5Y6/XCIsXG5cdCAgICBcIjEzMDQyOVwiOiBcIuawuOW5tOWOv1wiLFxuXHQgICAgXCIxMzA0MzBcIjogXCLpgrHljr9cIixcblx0ICAgIFwiMTMwNDMxXCI6IFwi6bih5rO95Y6/XCIsXG5cdCAgICBcIjEzMDQzMlwiOiBcIuW5v+W5s+WOv1wiLFxuXHQgICAgXCIxMzA0MzNcIjogXCLppobpmbbljr9cIixcblx0ICAgIFwiMTMwNDM0XCI6IFwi6a2P5Y6/XCIsXG5cdCAgICBcIjEzMDQzNVwiOiBcIuabsuWRqOWOv1wiLFxuXHQgICAgXCIxMzA0ODFcIjogXCLmrablronluIJcIixcblx0ICAgIFwiMTMwNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDUwMFwiOiBcIumCouWPsOW4glwiLFxuXHQgICAgXCIxMzA1MDJcIjogXCLmoaXkuJzljLpcIixcblx0ICAgIFwiMTMwNTAzXCI6IFwi5qGl6KW/5Yy6XCIsXG5cdCAgICBcIjEzMDUyMVwiOiBcIumCouWPsOWOv1wiLFxuXHQgICAgXCIxMzA1MjJcIjogXCLkuLTln47ljr9cIixcblx0ICAgIFwiMTMwNTIzXCI6IFwi5YaF5LiY5Y6/XCIsXG5cdCAgICBcIjEzMDUyNFwiOiBcIuafj+S5oeWOv1wiLFxuXHQgICAgXCIxMzA1MjVcIjogXCLpmoblsKfljr9cIixcblx0ICAgIFwiMTMwNTI2XCI6IFwi5Lu75Y6/XCIsXG5cdCAgICBcIjEzMDUyN1wiOiBcIuWNl+WSjOWOv1wiLFxuXHQgICAgXCIxMzA1MjhcIjogXCLlroHmmYvljr9cIixcblx0ICAgIFwiMTMwNTI5XCI6IFwi5beo6bm/5Y6/XCIsXG5cdCAgICBcIjEzMDUzMFwiOiBcIuaWsOays+WOv1wiLFxuXHQgICAgXCIxMzA1MzFcIjogXCLlub/lrpfljr9cIixcblx0ICAgIFwiMTMwNTMyXCI6IFwi5bmz5Lmh5Y6/XCIsXG5cdCAgICBcIjEzMDUzM1wiOiBcIuWogeWOv1wiLFxuXHQgICAgXCIxMzA1MzRcIjogXCLmuIXmsrPljr9cIixcblx0ICAgIFwiMTMwNTM1XCI6IFwi5Li06KW/5Y6/XCIsXG5cdCAgICBcIjEzMDU4MVwiOiBcIuWNl+Wuq+W4glwiLFxuXHQgICAgXCIxMzA1ODJcIjogXCLmspnmsrPluIJcIixcblx0ICAgIFwiMTMwNTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDYwMFwiOiBcIuS/neWumuW4glwiLFxuXHQgICAgXCIxMzA2MDJcIjogXCLmlrDluILljLpcIixcblx0ICAgIFwiMTMwNjAzXCI6IFwi5YyX5biC5Yy6XCIsXG5cdCAgICBcIjEzMDYwNFwiOiBcIuWNl+W4guWMulwiLFxuXHQgICAgXCIxMzA2MjFcIjogXCLmu6Hln47ljr9cIixcblx0ICAgIFwiMTMwNjIyXCI6IFwi5riF6IuR5Y6/XCIsXG5cdCAgICBcIjEzMDYyM1wiOiBcIua2nuawtOWOv1wiLFxuXHQgICAgXCIxMzA2MjRcIjogXCLpmJzlubPljr9cIixcblx0ICAgIFwiMTMwNjI1XCI6IFwi5b6Q5rC05Y6/XCIsXG5cdCAgICBcIjEzMDYyNlwiOiBcIuWumuWFtOWOv1wiLFxuXHQgICAgXCIxMzA2MjdcIjogXCLllJDljr9cIixcblx0ICAgIFwiMTMwNjI4XCI6IFwi6auY6Ziz5Y6/XCIsXG5cdCAgICBcIjEzMDYyOVwiOiBcIuWuueWfjuWOv1wiLFxuXHQgICAgXCIxMzA2MzBcIjogXCLmtp7mupDljr9cIixcblx0ICAgIFwiMTMwNjMxXCI6IFwi5pyb6YO95Y6/XCIsXG5cdCAgICBcIjEzMDYzMlwiOiBcIuWuieaWsOWOv1wiLFxuXHQgICAgXCIxMzA2MzNcIjogXCLmmJPljr9cIixcblx0ICAgIFwiMTMwNjM0XCI6IFwi5puy6Ziz5Y6/XCIsXG5cdCAgICBcIjEzMDYzNVwiOiBcIuigoeWOv1wiLFxuXHQgICAgXCIxMzA2MzZcIjogXCLpobrlubPljr9cIixcblx0ICAgIFwiMTMwNjM3XCI6IFwi5Y2a6YeO5Y6/XCIsXG5cdCAgICBcIjEzMDYzOFwiOiBcIumbhOWOv1wiLFxuXHQgICAgXCIxMzA2ODFcIjogXCLmtr/lt57luIJcIixcblx0ICAgIFwiMTMwNjgyXCI6IFwi5a6a5bee5biCXCIsXG5cdCAgICBcIjEzMDY4M1wiOiBcIuWuieWbveW4glwiLFxuXHQgICAgXCIxMzA2ODRcIjogXCLpq5jnopHlupfluIJcIixcblx0ICAgIFwiMTMwNjk5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDcwMFwiOiBcIuW8oOWutuWPo+W4glwiLFxuXHQgICAgXCIxMzA3MDJcIjogXCLmoaXkuJzljLpcIixcblx0ICAgIFwiMTMwNzAzXCI6IFwi5qGl6KW/5Yy6XCIsXG5cdCAgICBcIjEzMDcwNVwiOiBcIuWuo+WMluWMulwiLFxuXHQgICAgXCIxMzA3MDZcIjogXCLkuIvoirHlm63ljLpcIixcblx0ICAgIFwiMTMwNzIxXCI6IFwi5a6j5YyW5Y6/XCIsXG5cdCAgICBcIjEzMDcyMlwiOiBcIuW8oOWMl+WOv1wiLFxuXHQgICAgXCIxMzA3MjNcIjogXCLlurfkv53ljr9cIixcblx0ICAgIFwiMTMwNzI0XCI6IFwi5rK95rqQ5Y6/XCIsXG5cdCAgICBcIjEzMDcyNVwiOiBcIuWwmuS5ieWOv1wiLFxuXHQgICAgXCIxMzA3MjZcIjogXCLolJrljr9cIixcblx0ICAgIFwiMTMwNzI3XCI6IFwi6Ziz5Y6f5Y6/XCIsXG5cdCAgICBcIjEzMDcyOFwiOiBcIuaAgOWuieWOv1wiLFxuXHQgICAgXCIxMzA3MjlcIjogXCLkuIflhajljr9cIixcblx0ICAgIFwiMTMwNzMwXCI6IFwi5oCA5p2l5Y6/XCIsXG5cdCAgICBcIjEzMDczMVwiOiBcIua2v+m5v+WOv1wiLFxuXHQgICAgXCIxMzA3MzJcIjogXCLotaTln47ljr9cIixcblx0ICAgIFwiMTMwNzMzXCI6IFwi5bSH56S85Y6/XCIsXG5cdCAgICBcIjEzMDczNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzA4MDBcIjogXCLmib/lvrfluIJcIixcblx0ICAgIFwiMTMwODAyXCI6IFwi5Y+M5qGl5Yy6XCIsXG5cdCAgICBcIjEzMDgwM1wiOiBcIuWPjOa7puWMulwiLFxuXHQgICAgXCIxMzA4MDRcIjogXCLpubDmiYvokKXlrZDnn7/ljLpcIixcblx0ICAgIFwiMTMwODIxXCI6IFwi5om/5b635Y6/XCIsXG5cdCAgICBcIjEzMDgyMlwiOiBcIuWFtOmahuWOv1wiLFxuXHQgICAgXCIxMzA4MjNcIjogXCLlubPms4nljr9cIixcblx0ICAgIFwiMTMwODI0XCI6IFwi5rum5bmz5Y6/XCIsXG5cdCAgICBcIjEzMDgyNVwiOiBcIumahuWMluWOv1wiLFxuXHQgICAgXCIxMzA4MjZcIjogXCLkuLDlroHmu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMTMwODI3XCI6IFwi5a695Z+O5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjEzMDgyOFwiOiBcIuWbtOWcuua7oeaXj+iSmeWPpOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIxMzA4MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwOTAwXCI6IFwi5rKn5bee5biCXCIsXG5cdCAgICBcIjEzMDkwMlwiOiBcIuaWsOWNjuWMulwiLFxuXHQgICAgXCIxMzA5MDNcIjogXCLov5DmsrPljLpcIixcblx0ICAgIFwiMTMwOTIxXCI6IFwi5rKn5Y6/XCIsXG5cdCAgICBcIjEzMDkyMlwiOiBcIumdkuWOv1wiLFxuXHQgICAgXCIxMzA5MjNcIjogXCLkuJzlhYnljr9cIixcblx0ICAgIFwiMTMwOTI0XCI6IFwi5rW35YW05Y6/XCIsXG5cdCAgICBcIjEzMDkyNVwiOiBcIuebkOWxseWOv1wiLFxuXHQgICAgXCIxMzA5MjZcIjogXCLogoPlroHljr9cIixcblx0ICAgIFwiMTMwOTI3XCI6IFwi5Y2X55qu5Y6/XCIsXG5cdCAgICBcIjEzMDkyOFwiOiBcIuWQtOahpeWOv1wiLFxuXHQgICAgXCIxMzA5MjlcIjogXCLnjK7ljr9cIixcblx0ICAgIFwiMTMwOTMwXCI6IFwi5a2f5p2R5Zue5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjEzMDk4MVwiOiBcIuaziuWktOW4glwiLFxuXHQgICAgXCIxMzA5ODJcIjogXCLku7vkuJjluIJcIixcblx0ICAgIFwiMTMwOTgzXCI6IFwi6buE6aqF5biCXCIsXG5cdCAgICBcIjEzMDk4NFwiOiBcIuays+mXtOW4glwiLFxuXHQgICAgXCIxMzA5ODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMxMDAwXCI6IFwi5buK5Z2K5biCXCIsXG5cdCAgICBcIjEzMTAwMlwiOiBcIuWuieasoeWMulwiLFxuXHQgICAgXCIxMzEwMDNcIjogXCLlub/pmLPljLpcIixcblx0ICAgIFwiMTMxMDIyXCI6IFwi5Zu65a6J5Y6/XCIsXG5cdCAgICBcIjEzMTAyM1wiOiBcIuawuOa4heWOv1wiLFxuXHQgICAgXCIxMzEwMjRcIjogXCLpppnmsrPljr9cIixcblx0ICAgIFwiMTMxMDI1XCI6IFwi5aSn5Z+O5Y6/XCIsXG5cdCAgICBcIjEzMTAyNlwiOiBcIuaWh+WuieWOv1wiLFxuXHQgICAgXCIxMzEwMjhcIjogXCLlpKfljoLlm57ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMTMxMDgxXCI6IFwi6Zy45bee5biCXCIsXG5cdCAgICBcIjEzMTA4MlwiOiBcIuS4ieays+W4glwiLFxuXHQgICAgXCIxMzEwODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMxMTAwXCI6IFwi6KGh5rC05biCXCIsXG5cdCAgICBcIjEzMTEwMlwiOiBcIuahg+WfjuWMulwiLFxuXHQgICAgXCIxMzExMjFcIjogXCLmnqPlvLrljr9cIixcblx0ICAgIFwiMTMxMTIyXCI6IFwi5q2m6YKR5Y6/XCIsXG5cdCAgICBcIjEzMTEyM1wiOiBcIuatpuW8uuWOv1wiLFxuXHQgICAgXCIxMzExMjRcIjogXCLppbbpmLPljr9cIixcblx0ICAgIFwiMTMxMTI1XCI6IFwi5a6J5bmz5Y6/XCIsXG5cdCAgICBcIjEzMTEyNlwiOiBcIuaVheWfjuWOv1wiLFxuXHQgICAgXCIxMzExMjdcIjogXCLmma/ljr9cIixcblx0ICAgIFwiMTMxMTI4XCI6IFwi6Zic5Z+O5Y6/XCIsXG5cdCAgICBcIjEzMTE4MVwiOiBcIuWGgOW3nuW4glwiLFxuXHQgICAgXCIxMzExODJcIjogXCLmt7Hlt57luIJcIixcblx0ICAgIFwiMTMxMTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDAwMFwiOiBcIuWxseilv+ecgVwiLFxuXHQgICAgXCIxNDAxMDBcIjogXCLlpKrljp/luIJcIixcblx0ICAgIFwiMTQwMTA1XCI6IFwi5bCP5bqX5Yy6XCIsXG5cdCAgICBcIjE0MDEwNlwiOiBcIui/juazveWMulwiLFxuXHQgICAgXCIxNDAxMDdcIjogXCLmnY/oirHlsq3ljLpcIixcblx0ICAgIFwiMTQwMTA4XCI6IFwi5bCW6I2J5Z2q5Yy6XCIsXG5cdCAgICBcIjE0MDEwOVwiOiBcIuS4h+afj+ael+WMulwiLFxuXHQgICAgXCIxNDAxMTBcIjogXCLmmYvmupDljLpcIixcblx0ICAgIFwiMTQwMTIxXCI6IFwi5riF5b6Q5Y6/XCIsXG5cdCAgICBcIjE0MDEyMlwiOiBcIumYs+absuWOv1wiLFxuXHQgICAgXCIxNDAxMjNcIjogXCLlqITng6bljr9cIixcblx0ICAgIFwiMTQwMTgxXCI6IFwi5Y+k5Lqk5biCXCIsXG5cdCAgICBcIjE0MDE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDAyMDBcIjogXCLlpKflkIzluIJcIixcblx0ICAgIFwiMTQwMjAyXCI6IFwi5Z+O5Yy6XCIsXG5cdCAgICBcIjE0MDIwM1wiOiBcIuefv+WMulwiLFxuXHQgICAgXCIxNDAyMTFcIjogXCLljZfpg4rljLpcIixcblx0ICAgIFwiMTQwMjEyXCI6IFwi5paw6I2j5Yy6XCIsXG5cdCAgICBcIjE0MDIyMVwiOiBcIumYs+mrmOWOv1wiLFxuXHQgICAgXCIxNDAyMjJcIjogXCLlpKnplYfljr9cIixcblx0ICAgIFwiMTQwMjIzXCI6IFwi5bm/54G15Y6/XCIsXG5cdCAgICBcIjE0MDIyNFwiOiBcIueBteS4mOWOv1wiLFxuXHQgICAgXCIxNDAyMjVcIjogXCLmtZHmupDljr9cIixcblx0ICAgIFwiMTQwMjI2XCI6IFwi5bem5LqR5Y6/XCIsXG5cdCAgICBcIjE0MDIyN1wiOiBcIuWkp+WQjOWOv1wiLFxuXHQgICAgXCIxNDAyMjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwMzAwXCI6IFwi6Ziz5rOJ5biCXCIsXG5cdCAgICBcIjE0MDMwMlwiOiBcIuWfjuWMulwiLFxuXHQgICAgXCIxNDAzMDNcIjogXCLnn7/ljLpcIixcblx0ICAgIFwiMTQwMzExXCI6IFwi6YOK5Yy6XCIsXG5cdCAgICBcIjE0MDMyMVwiOiBcIuW5s+WumuWOv1wiLFxuXHQgICAgXCIxNDAzMjJcIjogXCLnm4Lljr9cIixcblx0ICAgIFwiMTQwMzIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDQwMFwiOiBcIumVv+ayu+W4glwiLFxuXHQgICAgXCIxNDA0MjFcIjogXCLplb/msrvljr9cIixcblx0ICAgIFwiMTQwNDIzXCI6IFwi6KWE5Z6j5Y6/XCIsXG5cdCAgICBcIjE0MDQyNFwiOiBcIuWxr+eVmeWOv1wiLFxuXHQgICAgXCIxNDA0MjVcIjogXCLlubPpobrljr9cIixcblx0ICAgIFwiMTQwNDI2XCI6IFwi6buO5Z+O5Y6/XCIsXG5cdCAgICBcIjE0MDQyN1wiOiBcIuWjtuWFs+WOv1wiLFxuXHQgICAgXCIxNDA0MjhcIjogXCLplb/lrZDljr9cIixcblx0ICAgIFwiMTQwNDI5XCI6IFwi5q2m5Lmh5Y6/XCIsXG5cdCAgICBcIjE0MDQzMFwiOiBcIuaygeWOv1wiLFxuXHQgICAgXCIxNDA0MzFcIjogXCLmsoHmupDljr9cIixcblx0ICAgIFwiMTQwNDgxXCI6IFwi5r2e5Z+O5biCXCIsXG5cdCAgICBcIjE0MDQ4MlwiOiBcIuWfjuWMulwiLFxuXHQgICAgXCIxNDA0ODNcIjogXCLpg4rljLpcIixcblx0ICAgIFwiMTQwNDg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDUwMFwiOiBcIuaZi+WfjuW4glwiLFxuXHQgICAgXCIxNDA1MDJcIjogXCLln47ljLpcIixcblx0ICAgIFwiMTQwNTIxXCI6IFwi5rKB5rC05Y6/XCIsXG5cdCAgICBcIjE0MDUyMlwiOiBcIumYs+WfjuWOv1wiLFxuXHQgICAgXCIxNDA1MjRcIjogXCLpmbXlt53ljr9cIixcblx0ICAgIFwiMTQwNTI1XCI6IFwi5rO95bee5Y6/XCIsXG5cdCAgICBcIjE0MDU4MVwiOiBcIumrmOW5s+W4glwiLFxuXHQgICAgXCIxNDA1ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwNjAwXCI6IFwi5pyU5bee5biCXCIsXG5cdCAgICBcIjE0MDYwMlwiOiBcIuaclOWfjuWMulwiLFxuXHQgICAgXCIxNDA2MDNcIjogXCLlubPpsoHljLpcIixcblx0ICAgIFwiMTQwNjIxXCI6IFwi5bGx6Zi05Y6/XCIsXG5cdCAgICBcIjE0MDYyMlwiOiBcIuW6lOWOv1wiLFxuXHQgICAgXCIxNDA2MjNcIjogXCLlj7Pnjonljr9cIixcblx0ICAgIFwiMTQwNjI0XCI6IFwi5oCA5LuB5Y6/XCIsXG5cdCAgICBcIjE0MDYyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDA3MDBcIjogXCLmmYvkuK3luIJcIixcblx0ICAgIFwiMTQwNzAyXCI6IFwi5qaG5qyh5Yy6XCIsXG5cdCAgICBcIjE0MDcyMVwiOiBcIuamhuekvuWOv1wiLFxuXHQgICAgXCIxNDA3MjJcIjogXCLlt6bmnYPljr9cIixcblx0ICAgIFwiMTQwNzIzXCI6IFwi5ZKM6aG65Y6/XCIsXG5cdCAgICBcIjE0MDcyNFwiOiBcIuaYlOmYs+WOv1wiLFxuXHQgICAgXCIxNDA3MjVcIjogXCLlr7/pmLPljr9cIixcblx0ICAgIFwiMTQwNzI2XCI6IFwi5aSq6LC35Y6/XCIsXG5cdCAgICBcIjE0MDcyN1wiOiBcIuelgeWOv1wiLFxuXHQgICAgXCIxNDA3MjhcIjogXCLlubPpgaXljr9cIixcblx0ICAgIFwiMTQwNzI5XCI6IFwi54G155+z5Y6/XCIsXG5cdCAgICBcIjE0MDc4MVwiOiBcIuS7i+S8keW4glwiLFxuXHQgICAgXCIxNDA3ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwODAwXCI6IFwi6L+Q5Z+O5biCXCIsXG5cdCAgICBcIjE0MDgwMlwiOiBcIuebkOa5luWMulwiLFxuXHQgICAgXCIxNDA4MjFcIjogXCLkuLTnjJfljr9cIixcblx0ICAgIFwiMTQwODIyXCI6IFwi5LiH6I2j5Y6/XCIsXG5cdCAgICBcIjE0MDgyM1wiOiBcIumXu+WWnOWOv1wiLFxuXHQgICAgXCIxNDA4MjRcIjogXCLnqLflsbHljr9cIixcblx0ICAgIFwiMTQwODI1XCI6IFwi5paw57ub5Y6/XCIsXG5cdCAgICBcIjE0MDgyNlwiOiBcIue7m+WOv1wiLFxuXHQgICAgXCIxNDA4MjdcIjogXCLlnqPmm7Lljr9cIixcblx0ICAgIFwiMTQwODI4XCI6IFwi5aSP5Y6/XCIsXG5cdCAgICBcIjE0MDgyOVwiOiBcIuW5s+mZhuWOv1wiLFxuXHQgICAgXCIxNDA4MzBcIjogXCLoiq7ln47ljr9cIixcblx0ICAgIFwiMTQwODgxXCI6IFwi5rC45rWO5biCXCIsXG5cdCAgICBcIjE0MDg4MlwiOiBcIuays+a0peW4glwiLFxuXHQgICAgXCIxNDA4ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwOTAwXCI6IFwi5b+75bee5biCXCIsXG5cdCAgICBcIjE0MDkwMlwiOiBcIuW/u+W6nOWMulwiLFxuXHQgICAgXCIxNDA5MjFcIjogXCLlrpropYTljr9cIixcblx0ICAgIFwiMTQwOTIyXCI6IFwi5LqU5Y+w5Y6/XCIsXG5cdCAgICBcIjE0MDkyM1wiOiBcIuS7o+WOv1wiLFxuXHQgICAgXCIxNDA5MjRcIjogXCLnuYHls5nljr9cIixcblx0ICAgIFwiMTQwOTI1XCI6IFwi5a6B5q2m5Y6/XCIsXG5cdCAgICBcIjE0MDkyNlwiOiBcIumdmeS5kOWOv1wiLFxuXHQgICAgXCIxNDA5MjdcIjogXCLnpZ7msaDljr9cIixcblx0ICAgIFwiMTQwOTI4XCI6IFwi5LqU5a+o5Y6/XCIsXG5cdCAgICBcIjE0MDkyOVwiOiBcIuWyouWymuWOv1wiLFxuXHQgICAgXCIxNDA5MzBcIjogXCLmsrPmm7Lljr9cIixcblx0ICAgIFwiMTQwOTMxXCI6IFwi5L+d5b635Y6/XCIsXG5cdCAgICBcIjE0MDkzMlwiOiBcIuWBj+WFs+WOv1wiLFxuXHQgICAgXCIxNDA5ODFcIjogXCLljp/lubPluIJcIixcblx0ICAgIFwiMTQwOTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MTAwMFwiOiBcIuS4tOaxvuW4glwiLFxuXHQgICAgXCIxNDEwMDJcIjogXCLlsKfpg73ljLpcIixcblx0ICAgIFwiMTQxMDIxXCI6IFwi5puy5rKD5Y6/XCIsXG5cdCAgICBcIjE0MTAyMlwiOiBcIue/vOWfjuWOv1wiLFxuXHQgICAgXCIxNDEwMjNcIjogXCLopYTmsb7ljr9cIixcblx0ICAgIFwiMTQxMDI0XCI6IFwi5rSq5rSe5Y6/XCIsXG5cdCAgICBcIjE0MTAyNVwiOiBcIuWPpOWOv1wiLFxuXHQgICAgXCIxNDEwMjZcIjogXCLlronms73ljr9cIixcblx0ICAgIFwiMTQxMDI3XCI6IFwi5rWu5bGx5Y6/XCIsXG5cdCAgICBcIjE0MTAyOFwiOiBcIuWQieWOv1wiLFxuXHQgICAgXCIxNDEwMjlcIjogXCLkuaHlroHljr9cIixcblx0ICAgIFwiMTQxMDMwXCI6IFwi5aSn5a6B5Y6/XCIsXG5cdCAgICBcIjE0MTAzMVwiOiBcIumasOWOv1wiLFxuXHQgICAgXCIxNDEwMzJcIjogXCLmsLjlkozljr9cIixcblx0ICAgIFwiMTQxMDMzXCI6IFwi6JKy5Y6/XCIsXG5cdCAgICBcIjE0MTAzNFwiOiBcIuaxvuilv+WOv1wiLFxuXHQgICAgXCIxNDEwODFcIjogXCLkvq/pqazluIJcIixcblx0ICAgIFwiMTQxMDgyXCI6IFwi6ZyN5bee5biCXCIsXG5cdCAgICBcIjE0MTA4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDExMDBcIjogXCLlkJXmooHluIJcIixcblx0ICAgIFwiMTQxMTAyXCI6IFwi56a755+z5Yy6XCIsXG5cdCAgICBcIjE0MTEyMVwiOiBcIuaWh+awtOWOv1wiLFxuXHQgICAgXCIxNDExMjJcIjogXCLkuqTln47ljr9cIixcblx0ICAgIFwiMTQxMTIzXCI6IFwi5YW05Y6/XCIsXG5cdCAgICBcIjE0MTEyNFwiOiBcIuS4tOWOv1wiLFxuXHQgICAgXCIxNDExMjVcIjogXCLmn7Pmnpfljr9cIixcblx0ICAgIFwiMTQxMTI2XCI6IFwi55+z5qW85Y6/XCIsXG5cdCAgICBcIjE0MTEyN1wiOiBcIuWymuWOv1wiLFxuXHQgICAgXCIxNDExMjhcIjogXCLmlrnlsbHljr9cIixcblx0ICAgIFwiMTQxMTI5XCI6IFwi5Lit6Ziz5Y6/XCIsXG5cdCAgICBcIjE0MTEzMFwiOiBcIuS6pOWPo+WOv1wiLFxuXHQgICAgXCIxNDExODFcIjogXCLlrZ3kuYnluIJcIixcblx0ICAgIFwiMTQxMTgyXCI6IFwi5rG+6Ziz5biCXCIsXG5cdCAgICBcIjE0MTE4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTAwMDBcIjogXCLlhoXokpnlj6Toh6rmsrvljLpcIixcblx0ICAgIFwiMTUwMTAwXCI6IFwi5ZG85ZKM5rWp54m55biCXCIsXG5cdCAgICBcIjE1MDEwMlwiOiBcIuaWsOWfjuWMulwiLFxuXHQgICAgXCIxNTAxMDNcIjogXCLlm57msJHljLpcIixcblx0ICAgIFwiMTUwMTA0XCI6IFwi546J5rOJ5Yy6XCIsXG5cdCAgICBcIjE1MDEwNVwiOiBcIui1m+e9leWMulwiLFxuXHQgICAgXCIxNTAxMjFcIjogXCLlnJ/pu5jnibnlt6bml5dcIixcblx0ICAgIFwiMTUwMTIyXCI6IFwi5omY5YWL5omY5Y6/XCIsXG5cdCAgICBcIjE1MDEyM1wiOiBcIuWSjOael+agvOWwlOWOv1wiLFxuXHQgICAgXCIxNTAxMjRcIjogXCLmuIXmsLTmsrPljr9cIixcblx0ICAgIFwiMTUwMTI1XCI6IFwi5q2m5bed5Y6/XCIsXG5cdCAgICBcIjE1MDEyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTAyMDBcIjogXCLljIXlpLTluIJcIixcblx0ICAgIFwiMTUwMjAyXCI6IFwi5Lic5rKz5Yy6XCIsXG5cdCAgICBcIjE1MDIwM1wiOiBcIuaYhumDveS7keWMulwiLFxuXHQgICAgXCIxNTAyMDRcIjogXCLpnZLlsbHljLpcIixcblx0ICAgIFwiMTUwMjA1XCI6IFwi55+z5ouQ5Yy6XCIsXG5cdCAgICBcIjE1MDIwNlwiOiBcIueZveS6kemEguWNmuefv+WMulwiLFxuXHQgICAgXCIxNTAyMDdcIjogXCLkuZ3ljp/ljLpcIixcblx0ICAgIFwiMTUwMjIxXCI6IFwi5Zyf6buY54m55Y+z5peXXCIsXG5cdCAgICBcIjE1MDIyMlwiOiBcIuWbuumYs+WOv1wiLFxuXHQgICAgXCIxNTAyMjNcIjogXCLovr7lsJTnvZXojILmmI7lronogZTlkIjml5dcIixcblx0ICAgIFwiMTUwMjI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDMwMFwiOiBcIuS5jOa1t+W4glwiLFxuXHQgICAgXCIxNTAzMDJcIjogXCLmtbfli4Pmub7ljLpcIixcblx0ICAgIFwiMTUwMzAzXCI6IFwi5rW35Y2X5Yy6XCIsXG5cdCAgICBcIjE1MDMwNFwiOiBcIuS5jOi+vuWMulwiLFxuXHQgICAgXCIxNTAzMDVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwNDAwXCI6IFwi6LWk5bOw5biCXCIsXG5cdCAgICBcIjE1MDQwMlwiOiBcIue6ouWxseWMulwiLFxuXHQgICAgXCIxNTA0MDNcIjogXCLlhYPlrp3lsbHljLpcIixcblx0ICAgIFwiMTUwNDA0XCI6IFwi5p2+5bGx5Yy6XCIsXG5cdCAgICBcIjE1MDQyMVwiOiBcIumYv+mygeenkeWwlOaygeaXl1wiLFxuXHQgICAgXCIxNTA0MjJcIjogXCLlt7Tmnpflt6bml5dcIixcblx0ICAgIFwiMTUwNDIzXCI6IFwi5be05p6X5Y+z5peXXCIsXG5cdCAgICBcIjE1MDQyNFwiOiBcIuael+ilv+WOv1wiLFxuXHQgICAgXCIxNTA0MjVcIjogXCLlhYvku4DlhYvohb7ml5dcIixcblx0ICAgIFwiMTUwNDI2XCI6IFwi57+B54mb54m55peXXCIsXG5cdCAgICBcIjE1MDQyOFwiOiBcIuWWgOWWh+aygeaXl1wiLFxuXHQgICAgXCIxNTA0MjlcIjogXCLlroHln47ljr9cIixcblx0ICAgIFwiMTUwNDMwXCI6IFwi5pWW5rGJ5peXXCIsXG5cdCAgICBcIjE1MDQzMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTA1MDBcIjogXCLpgJrovr3luIJcIixcblx0ICAgIFwiMTUwNTAyXCI6IFwi56eR5bCU5rKB5Yy6XCIsXG5cdCAgICBcIjE1MDUyMVwiOiBcIuenkeWwlOaygeW3pue/vOS4reaXl1wiLFxuXHQgICAgXCIxNTA1MjJcIjogXCLnp5HlsJTmsoHlt6bnv7zlkI7ml5dcIixcblx0ICAgIFwiMTUwNTIzXCI6IFwi5byA6bKB5Y6/XCIsXG5cdCAgICBcIjE1MDUyNFwiOiBcIuW6k+S8puaXl1wiLFxuXHQgICAgXCIxNTA1MjVcIjogXCLlpYjmm7zml5dcIixcblx0ICAgIFwiMTUwNTI2XCI6IFwi5omO6bKB54m55peXXCIsXG5cdCAgICBcIjE1MDU4MVwiOiBcIumcjeael+mDreWLkuW4glwiLFxuXHQgICAgXCIxNTA1ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwNjAwXCI6IFwi6YSC5bCU5aSa5pav5biCXCIsXG5cdCAgICBcIjE1MDYwMlwiOiBcIuS4nOiDnOWMulwiLFxuXHQgICAgXCIxNTA2MjFcIjogXCLovr7mi4nnibnml5dcIixcblx0ICAgIFwiMTUwNjIyXCI6IFwi5YeG5qC85bCU5peXXCIsXG5cdCAgICBcIjE1MDYyM1wiOiBcIumEguaJmOWFi+WJjeaXl1wiLFxuXHQgICAgXCIxNTA2MjRcIjogXCLphILmiZjlhYvml5dcIixcblx0ICAgIFwiMTUwNjI1XCI6IFwi5p2t6ZSm5peXXCIsXG5cdCAgICBcIjE1MDYyNlwiOiBcIuS5jOWuoeaXl1wiLFxuXHQgICAgXCIxNTA2MjdcIjogXCLkvIrph5HpnI3mtJvml5dcIixcblx0ICAgIFwiMTUwNjI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDcwMFwiOiBcIuWRvOS8pui0neWwlOW4glwiLFxuXHQgICAgXCIxNTA3MDJcIjogXCLmtbfmi4nlsJTljLpcIixcblx0ICAgIFwiMTUwNzAzXCI6IFwi5omO6LWJ6K+65bCU5Yy6XCIsXG5cdCAgICBcIjE1MDcyMVwiOiBcIumYv+iNo+aXl1wiLFxuXHQgICAgXCIxNTA3MjJcIjogXCLojqvlipvovr7nk6bovr7mlqHlsJTml4/oh6rmsrvml5dcIixcblx0ICAgIFwiMTUwNzIzXCI6IFwi6YSC5Lym5pil6Ieq5rK75peXXCIsXG5cdCAgICBcIjE1MDcyNFwiOiBcIumEgua4qeWFi+aXj+iHquayu+aXl1wiLFxuXHQgICAgXCIxNTA3MjVcIjogXCLpmYjlt7TlsJTomY7ml5dcIixcblx0ICAgIFwiMTUwNzI2XCI6IFwi5paw5be05bCU6JmO5bem5peXXCIsXG5cdCAgICBcIjE1MDcyN1wiOiBcIuaWsOW3tOWwlOiZjuWPs+aXl1wiLFxuXHQgICAgXCIxNTA3ODFcIjogXCLmu6HmtLLph4zluIJcIixcblx0ICAgIFwiMTUwNzgyXCI6IFwi54mZ5YWL55+z5biCXCIsXG5cdCAgICBcIjE1MDc4M1wiOiBcIuaJjuWFsOWxr+W4glwiLFxuXHQgICAgXCIxNTA3ODRcIjogXCLpop3lsJTlj6TnurPluIJcIixcblx0ICAgIFwiMTUwNzg1XCI6IFwi5qC55rKz5biCXCIsXG5cdCAgICBcIjE1MDc4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTA4MDBcIjogXCLlt7Tlvabmt5blsJTluIJcIixcblx0ICAgIFwiMTUwODAyXCI6IFwi5Li05rKz5Yy6XCIsXG5cdCAgICBcIjE1MDgyMVwiOiBcIuS6lOWOn+WOv1wiLFxuXHQgICAgXCIxNTA4MjJcIjogXCLno7Tlj6Pljr9cIixcblx0ICAgIFwiMTUwODIzXCI6IFwi5LmM5ouJ54m55YmN5peXXCIsXG5cdCAgICBcIjE1MDgyNFwiOiBcIuS5jOaLieeJueS4reaXl1wiLFxuXHQgICAgXCIxNTA4MjVcIjogXCLkuYzmi4nnibnlkI7ml5dcIixcblx0ICAgIFwiMTUwODI2XCI6IFwi5p2t6ZSm5ZCO5peXXCIsXG5cdCAgICBcIjE1MDgyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTA5MDBcIjogXCLkuYzlhbDlr5/luIPluIJcIixcblx0ICAgIFwiMTUwOTAyXCI6IFwi6ZuG5a6B5Yy6XCIsXG5cdCAgICBcIjE1MDkyMVwiOiBcIuWNk+i1hOWOv1wiLFxuXHQgICAgXCIxNTA5MjJcIjogXCLljJblvrfljr9cIixcblx0ICAgIFwiMTUwOTIzXCI6IFwi5ZWG6YO95Y6/XCIsXG5cdCAgICBcIjE1MDkyNFwiOiBcIuWFtOWSjOWOv1wiLFxuXHQgICAgXCIxNTA5MjVcIjogXCLlh4nln47ljr9cIixcblx0ICAgIFwiMTUwOTI2XCI6IFwi5a+f5ZOI5bCU5Y+z57+85YmN5peXXCIsXG5cdCAgICBcIjE1MDkyN1wiOiBcIuWvn+WTiOWwlOWPs+e/vOS4reaXl1wiLFxuXHQgICAgXCIxNTA5MjhcIjogXCLlr5/lk4jlsJTlj7Pnv7zlkI7ml5dcIixcblx0ICAgIFwiMTUwOTI5XCI6IFwi5Zub5a2Q546L5peXXCIsXG5cdCAgICBcIjE1MDk4MVwiOiBcIuS4sOmVh+W4glwiLFxuXHQgICAgXCIxNTA5ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUyMjAwXCI6IFwi5YW05a6J55ufXCIsXG5cdCAgICBcIjE1MjIwMVwiOiBcIuS5jOWFsOa1qeeJueW4glwiLFxuXHQgICAgXCIxNTIyMDJcIjogXCLpmL/lsJTlsbHluIJcIixcblx0ICAgIFwiMTUyMjIxXCI6IFwi56eR5bCU5rKB5Y+z57+85YmN5peXXCIsXG5cdCAgICBcIjE1MjIyMlwiOiBcIuenkeWwlOaygeWPs+e/vOS4reaXl1wiLFxuXHQgICAgXCIxNTIyMjNcIjogXCLmiY7otYnnibnml5dcIixcblx0ICAgIFwiMTUyMjI0XCI6IFwi56qB5rOJ5Y6/XCIsXG5cdCAgICBcIjE1MjIyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTI1MDBcIjogXCLplKHmnpfpg63li5Lnm59cIixcblx0ICAgIFwiMTUyNTAxXCI6IFwi5LqM6L+e5rWp54m55biCXCIsXG5cdCAgICBcIjE1MjUwMlwiOiBcIumUoeael+a1qeeJueW4glwiLFxuXHQgICAgXCIxNTI1MjJcIjogXCLpmL/lt7TlmI7ml5dcIixcblx0ICAgIFwiMTUyNTIzXCI6IFwi6IuP5bC854m55bem5peXXCIsXG5cdCAgICBcIjE1MjUyNFwiOiBcIuiLj+WwvOeJueWPs+aXl1wiLFxuXHQgICAgXCIxNTI1MjVcIjogXCLkuJzkuYznj6DnqYbmsoHml5dcIixcblx0ICAgIFwiMTUyNTI2XCI6IFwi6KW/5LmM54+g56mG5rKB5peXXCIsXG5cdCAgICBcIjE1MjUyN1wiOiBcIuWkquS7huWvuuaXl1wiLFxuXHQgICAgXCIxNTI1MjhcIjogXCLplbbpu4Tml5dcIixcblx0ICAgIFwiMTUyNTI5XCI6IFwi5q2j6ZW255m95peXXCIsXG5cdCAgICBcIjE1MjUzMFwiOiBcIuato+iTneaXl1wiLFxuXHQgICAgXCIxNTI1MzFcIjogXCLlpJrkvKbljr9cIixcblx0ICAgIFwiMTUyNTMyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MjkwMFwiOiBcIumYv+aLieWWhOebn1wiLFxuXHQgICAgXCIxNTI5MjFcIjogXCLpmL/mi4nlloTlt6bml5dcIixcblx0ICAgIFwiMTUyOTIyXCI6IFwi6Zi/5ouJ5ZaE5Y+z5peXXCIsXG5cdCAgICBcIjE1MjkyM1wiOiBcIuminea1jue6s+aXl1wiLFxuXHQgICAgXCIxNTI5MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwMDAwXCI6IFwi6L695a6B55yBXCIsXG5cdCAgICBcIjIxMDEwMFwiOiBcIuayiOmYs+W4glwiLFxuXHQgICAgXCIyMTAxMDJcIjogXCLlkozlubPljLpcIixcblx0ICAgIFwiMjEwMTAzXCI6IFwi5rKI5rKz5Yy6XCIsXG5cdCAgICBcIjIxMDEwNFwiOiBcIuWkp+S4nOWMulwiLFxuXHQgICAgXCIyMTAxMDVcIjogXCLnmoflp5HljLpcIixcblx0ICAgIFwiMjEwMTA2XCI6IFwi6ZOB6KW/5Yy6XCIsXG5cdCAgICBcIjIxMDExMVwiOiBcIuiLj+WutuWxr+WMulwiLFxuXHQgICAgXCIyMTAxMTJcIjogXCLkuJzpmbXljLpcIixcblx0ICAgIFwiMjEwMTEzXCI6IFwi5paw5Z+O5a2Q5Yy6XCIsXG5cdCAgICBcIjIxMDExNFwiOiBcIuS6jua0quWMulwiLFxuXHQgICAgXCIyMTAxMjJcIjogXCLovr3kuK3ljr9cIixcblx0ICAgIFwiMjEwMTIzXCI6IFwi5bq35bmz5Y6/XCIsXG5cdCAgICBcIjIxMDEyNFwiOiBcIuazleW6k+WOv1wiLFxuXHQgICAgXCIyMTAxODFcIjogXCLmlrDmsJHluIJcIixcblx0ICAgIFwiMjEwMTg0XCI6IFwi5rKI5YyX5paw5Yy6XCIsXG5cdCAgICBcIjIxMDE4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTAyMDBcIjogXCLlpKfov57luIJcIixcblx0ICAgIFwiMjEwMjAyXCI6IFwi5Lit5bGx5Yy6XCIsXG5cdCAgICBcIjIxMDIwM1wiOiBcIuilv+Wyl+WMulwiLFxuXHQgICAgXCIyMTAyMDRcIjogXCLmspnmsrPlj6PljLpcIixcblx0ICAgIFwiMjEwMjExXCI6IFwi55SY5LqV5a2Q5Yy6XCIsXG5cdCAgICBcIjIxMDIxMlwiOiBcIuaXhemhuuWPo+WMulwiLFxuXHQgICAgXCIyMTAyMTNcIjogXCLph5Hlt57ljLpcIixcblx0ICAgIFwiMjEwMjI0XCI6IFwi6ZW/5rW35Y6/XCIsXG5cdCAgICBcIjIxMDI4MVwiOiBcIueTpuaIv+W6l+W4glwiLFxuXHQgICAgXCIyMTAyODJcIjogXCLmma7lhbDlupfluIJcIixcblx0ICAgIFwiMjEwMjgzXCI6IFwi5bqE5rKz5biCXCIsXG5cdCAgICBcIjIxMDI5OFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTAzMDBcIjogXCLpno3lsbHluIJcIixcblx0ICAgIFwiMjEwMzAyXCI6IFwi6ZOB5Lic5Yy6XCIsXG5cdCAgICBcIjIxMDMwM1wiOiBcIumTgeilv+WMulwiLFxuXHQgICAgXCIyMTAzMDRcIjogXCLnq4vlsbHljLpcIixcblx0ICAgIFwiMjEwMzExXCI6IFwi5Y2D5bGx5Yy6XCIsXG5cdCAgICBcIjIxMDMyMVwiOiBcIuWPsOWuieWOv1wiLFxuXHQgICAgXCIyMTAzMjNcIjogXCLlsqvlsqnmu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjEwMzgxXCI6IFwi5rW35Z+O5biCXCIsXG5cdCAgICBcIjIxMDM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTA0MDBcIjogXCLmiprpobrluIJcIixcblx0ICAgIFwiMjEwNDAyXCI6IFwi5paw5oqa5Yy6XCIsXG5cdCAgICBcIjIxMDQwM1wiOiBcIuS4nOa0suWMulwiLFxuXHQgICAgXCIyMTA0MDRcIjogXCLmnJvoirHljLpcIixcblx0ICAgIFwiMjEwNDExXCI6IFwi6aG65Z+O5Yy6XCIsXG5cdCAgICBcIjIxMDQyMVwiOiBcIuaKmumhuuWOv1wiLFxuXHQgICAgXCIyMTA0MjJcIjogXCLmlrDlrr7mu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjEwNDIzXCI6IFwi5riF5Y6f5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMDQyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTA1MDBcIjogXCLmnKzmuqrluIJcIixcblx0ICAgIFwiMjEwNTAyXCI6IFwi5bmz5bGx5Yy6XCIsXG5cdCAgICBcIjIxMDUwM1wiOiBcIua6qua5luWMulwiLFxuXHQgICAgXCIyMTA1MDRcIjogXCLmmI7lsbHljLpcIixcblx0ICAgIFwiMjEwNTA1XCI6IFwi5Y2X6Iqs5Yy6XCIsXG5cdCAgICBcIjIxMDUyMVwiOiBcIuacrOa6qua7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTA1MjJcIjogXCLmoZPku4Hmu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjEwNTIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDYwMFwiOiBcIuS4ueS4nOW4glwiLFxuXHQgICAgXCIyMTA2MDJcIjogXCLlhYPlrp3ljLpcIixcblx0ICAgIFwiMjEwNjAzXCI6IFwi5oyv5YW05Yy6XCIsXG5cdCAgICBcIjIxMDYwNFwiOiBcIuaMr+WuieWMulwiLFxuXHQgICAgXCIyMTA2MjRcIjogXCLlrr3nlLjmu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjEwNjgxXCI6IFwi5Lic5riv5biCXCIsXG5cdCAgICBcIjIxMDY4MlwiOiBcIuWHpOWfjuW4glwiLFxuXHQgICAgXCIyMTA2ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwNzAwXCI6IFwi6ZSm5bee5biCXCIsXG5cdCAgICBcIjIxMDcwMlwiOiBcIuWPpOWhlOWMulwiLFxuXHQgICAgXCIyMTA3MDNcIjogXCLlh4zmsrPljLpcIixcblx0ICAgIFwiMjEwNzExXCI6IFwi5aSq5ZKM5Yy6XCIsXG5cdCAgICBcIjIxMDcyNlwiOiBcIum7keWxseWOv1wiLFxuXHQgICAgXCIyMTA3MjdcIjogXCLkuYnljr9cIixcblx0ICAgIFwiMjEwNzgxXCI6IFwi5YeM5rW35biCXCIsXG5cdCAgICBcIjIxMDc4MlwiOiBcIuWMl+mVh+W4glwiLFxuXHQgICAgXCIyMTA3ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwODAwXCI6IFwi6JCl5Y+j5biCXCIsXG5cdCAgICBcIjIxMDgwMlwiOiBcIuermeWJjeWMulwiLFxuXHQgICAgXCIyMTA4MDNcIjogXCLopb/luILljLpcIixcblx0ICAgIFwiMjEwODA0XCI6IFwi6bKF6bG85ZyI5Yy6XCIsXG5cdCAgICBcIjIxMDgxMVwiOiBcIuiAgei+ueWMulwiLFxuXHQgICAgXCIyMTA4ODFcIjogXCLnm5blt57luIJcIixcblx0ICAgIFwiMjEwODgyXCI6IFwi5aSn55+z5qGl5biCXCIsXG5cdCAgICBcIjIxMDg4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTA5MDBcIjogXCLpmJzmlrDluIJcIixcblx0ICAgIFwiMjEwOTAyXCI6IFwi5rW35bee5Yy6XCIsXG5cdCAgICBcIjIxMDkwM1wiOiBcIuaWsOmCseWMulwiLFxuXHQgICAgXCIyMTA5MDRcIjogXCLlpKrlubPljLpcIixcblx0ICAgIFwiMjEwOTA1XCI6IFwi5riF5rKz6Zeo5Yy6XCIsXG5cdCAgICBcIjIxMDkxMVwiOiBcIue7huays+WMulwiLFxuXHQgICAgXCIyMTA5MjFcIjogXCLpmJzmlrDokpnlj6Tml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjEwOTIyXCI6IFwi5b2w5q2m5Y6/XCIsXG5cdCAgICBcIjIxMDkyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTEwMDBcIjogXCLovr3pmLPluIJcIixcblx0ICAgIFwiMjExMDAyXCI6IFwi55m95aGU5Yy6XCIsXG5cdCAgICBcIjIxMTAwM1wiOiBcIuaWh+Wco+WMulwiLFxuXHQgICAgXCIyMTEwMDRcIjogXCLlro/kvJ/ljLpcIixcblx0ICAgIFwiMjExMDA1XCI6IFwi5byT6ZW/5bKt5Yy6XCIsXG5cdCAgICBcIjIxMTAxMVwiOiBcIuWkquWtkOays+WMulwiLFxuXHQgICAgXCIyMTEwMjFcIjogXCLovr3pmLPljr9cIixcblx0ICAgIFwiMjExMDgxXCI6IFwi54Gv5aGU5biCXCIsXG5cdCAgICBcIjIxMTA4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTExMDBcIjogXCLnm5jplKbluIJcIixcblx0ICAgIFwiMjExMTAyXCI6IFwi5Y+M5Y+w5a2Q5Yy6XCIsXG5cdCAgICBcIjIxMTEwM1wiOiBcIuWFtOmahuWPsOWMulwiLFxuXHQgICAgXCIyMTExMjFcIjogXCLlpKfmtLzljr9cIixcblx0ICAgIFwiMjExMTIyXCI6IFwi55uY5bGx5Y6/XCIsXG5cdCAgICBcIjIxMTEyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTEyMDBcIjogXCLpk4Hlsq3luIJcIixcblx0ICAgIFwiMjExMjAyXCI6IFwi6ZO25bee5Yy6XCIsXG5cdCAgICBcIjIxMTIwNFwiOiBcIua4heays+WMulwiLFxuXHQgICAgXCIyMTEyMjFcIjogXCLpk4Hlsq3ljr9cIixcblx0ICAgIFwiMjExMjIzXCI6IFwi6KW/5Liw5Y6/XCIsXG5cdCAgICBcIjIxMTIyNFwiOiBcIuaYjOWbvuWOv1wiLFxuXHQgICAgXCIyMTEyODFcIjogXCLosIPlhbXlsbHluIJcIixcblx0ICAgIFwiMjExMjgyXCI6IFwi5byA5Y6f5biCXCIsXG5cdCAgICBcIjIxMTI4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTEzMDBcIjogXCLmnJ3pmLPluIJcIixcblx0ICAgIFwiMjExMzAyXCI6IFwi5Y+M5aGU5Yy6XCIsXG5cdCAgICBcIjIxMTMwM1wiOiBcIum+meWfjuWMulwiLFxuXHQgICAgXCIyMTEzMjFcIjogXCLmnJ3pmLPljr9cIixcblx0ICAgIFwiMjExMzIyXCI6IFwi5bu65bmz5Y6/XCIsXG5cdCAgICBcIjIxMTMyNFwiOiBcIuWWgOWWh+aygeW3pue/vOiSmeWPpOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTEzODFcIjogXCLljJfnpajluIJcIixcblx0ICAgIFwiMjExMzgyXCI6IFwi5YeM5rqQ5biCXCIsXG5cdCAgICBcIjIxMTM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTE0MDBcIjogXCLokavoiqblspvluIJcIixcblx0ICAgIFwiMjExNDAyXCI6IFwi6L+e5bGx5Yy6XCIsXG5cdCAgICBcIjIxMTQwM1wiOiBcIum+mea4r+WMulwiLFxuXHQgICAgXCIyMTE0MDRcIjogXCLljZfnpajljLpcIixcblx0ICAgIFwiMjExNDIxXCI6IFwi57ul5Lit5Y6/XCIsXG5cdCAgICBcIjIxMTQyMlwiOiBcIuW7uuaYjOWOv1wiLFxuXHQgICAgXCIyMTE0ODFcIjogXCLlhbTln47luIJcIixcblx0ICAgIFwiMjExNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDAwMFwiOiBcIuWQieael+ecgVwiLFxuXHQgICAgXCIyMjAxMDBcIjogXCLplb/mmKXluIJcIixcblx0ICAgIFwiMjIwMTAyXCI6IFwi5Y2X5YWz5Yy6XCIsXG5cdCAgICBcIjIyMDEwM1wiOiBcIuWuveWfjuWMulwiLFxuXHQgICAgXCIyMjAxMDRcIjogXCLmnJ3pmLPljLpcIixcblx0ICAgIFwiMjIwMTA1XCI6IFwi5LqM6YGT5Yy6XCIsXG5cdCAgICBcIjIyMDEwNlwiOiBcIue7v+WbreWMulwiLFxuXHQgICAgXCIyMjAxMTJcIjogXCLlj4zpmLPljLpcIixcblx0ICAgIFwiMjIwMTIyXCI6IFwi5Yac5a6J5Y6/XCIsXG5cdCAgICBcIjIyMDE4MVwiOiBcIuS5neWPsOW4glwiLFxuXHQgICAgXCIyMjAxODJcIjogXCLmpobmoJHluIJcIixcblx0ICAgIFwiMjIwMTgzXCI6IFwi5b635oOg5biCXCIsXG5cdCAgICBcIjIyMDE4OFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjAyMDBcIjogXCLlkInmnpfluIJcIixcblx0ICAgIFwiMjIwMjAyXCI6IFwi5piM6YKR5Yy6XCIsXG5cdCAgICBcIjIyMDIwM1wiOiBcIum+mea9reWMulwiLFxuXHQgICAgXCIyMjAyMDRcIjogXCLoiLnokKXljLpcIixcblx0ICAgIFwiMjIwMjExXCI6IFwi5Liw5ruh5Yy6XCIsXG5cdCAgICBcIjIyMDIyMVwiOiBcIuawuOWQieWOv1wiLFxuXHQgICAgXCIyMjAyODFcIjogXCLom5/msrPluIJcIixcblx0ICAgIFwiMjIwMjgyXCI6IFwi5qGm55S45biCXCIsXG5cdCAgICBcIjIyMDI4M1wiOiBcIuiIkuWFsOW4glwiLFxuXHQgICAgXCIyMjAyODRcIjogXCLno5Dnn7PluIJcIixcblx0ICAgIFwiMjIwMjg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDMwMFwiOiBcIuWbm+W5s+W4glwiLFxuXHQgICAgXCIyMjAzMDJcIjogXCLpk4Hopb/ljLpcIixcblx0ICAgIFwiMjIwMzAzXCI6IFwi6ZOB5Lic5Yy6XCIsXG5cdCAgICBcIjIyMDMyMlwiOiBcIuaiqOagkeWOv1wiLFxuXHQgICAgXCIyMjAzMjNcIjogXCLkvIrpgJrmu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjIwMzgxXCI6IFwi5YWs5Li75bKt5biCXCIsXG5cdCAgICBcIjIyMDM4MlwiOiBcIuWPjOi+veW4glwiLFxuXHQgICAgXCIyMjAzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwNDAwXCI6IFwi6L695rqQ5biCXCIsXG5cdCAgICBcIjIyMDQwMlwiOiBcIum+meWxseWMulwiLFxuXHQgICAgXCIyMjA0MDNcIjogXCLopb/lronljLpcIixcblx0ICAgIFwiMjIwNDIxXCI6IFwi5Lic5Liw5Y6/XCIsXG5cdCAgICBcIjIyMDQyMlwiOiBcIuS4nOi+veWOv1wiLFxuXHQgICAgXCIyMjA0MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwNTAwXCI6IFwi6YCa5YyW5biCXCIsXG5cdCAgICBcIjIyMDUwMlwiOiBcIuS4nOaYjOWMulwiLFxuXHQgICAgXCIyMjA1MDNcIjogXCLkuozpgZPmsZ/ljLpcIixcblx0ICAgIFwiMjIwNTIxXCI6IFwi6YCa5YyW5Y6/XCIsXG5cdCAgICBcIjIyMDUyM1wiOiBcIui+ieWNl+WOv1wiLFxuXHQgICAgXCIyMjA1MjRcIjogXCLmn7PmsrPljr9cIixcblx0ICAgIFwiMjIwNTgxXCI6IFwi5qKF5rKz5Y+j5biCXCIsXG5cdCAgICBcIjIyMDU4MlwiOiBcIumbhuWuieW4glwiLFxuXHQgICAgXCIyMjA1ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwNjAwXCI6IFwi55m95bGx5biCXCIsXG5cdCAgICBcIjIyMDYwMlwiOiBcIua1keaxn+WMulwiLFxuXHQgICAgXCIyMjA2MjFcIjogXCLmiprmnb7ljr9cIixcblx0ICAgIFwiMjIwNjIyXCI6IFwi6Z2W5a6H5Y6/XCIsXG5cdCAgICBcIjIyMDYyM1wiOiBcIumVv+eZveacnemynOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMjA2MjVcIjogXCLmsZ/mupDljLpcIixcblx0ICAgIFwiMjIwNjgxXCI6IFwi5Li05rGf5biCXCIsXG5cdCAgICBcIjIyMDY4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjA3MDBcIjogXCLmnb7ljp/luIJcIixcblx0ICAgIFwiMjIwNzAyXCI6IFwi5a6B5rGf5Yy6XCIsXG5cdCAgICBcIjIyMDcyMVwiOiBcIuWJjemDreWwlOe9l+aWr+iSmeWPpOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMjA3MjJcIjogXCLplb/lsq3ljr9cIixcblx0ICAgIFwiMjIwNzIzXCI6IFwi5Lm+5a6J5Y6/XCIsXG5cdCAgICBcIjIyMDcyNFwiOiBcIuaJtuS9meW4glwiLFxuXHQgICAgXCIyMjA3MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwODAwXCI6IFwi55m95Z+O5biCXCIsXG5cdCAgICBcIjIyMDgwMlwiOiBcIua0ruWMl+WMulwiLFxuXHQgICAgXCIyMjA4MjFcIjogXCLplYfotYnljr9cIixcblx0ICAgIFwiMjIwODIyXCI6IFwi6YCa5qaG5Y6/XCIsXG5cdCAgICBcIjIyMDg4MVwiOiBcIua0ruWNl+W4glwiLFxuXHQgICAgXCIyMjA4ODJcIjogXCLlpKflronluIJcIixcblx0ICAgIFwiMjIwODgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMjQwMFwiOiBcIuW7tui+ueacnemynOaXj+iHquayu+W3nlwiLFxuXHQgICAgXCIyMjI0MDFcIjogXCLlu7blkInluIJcIixcblx0ICAgIFwiMjIyNDAyXCI6IFwi5Zu+5Lus5biCXCIsXG5cdCAgICBcIjIyMjQwM1wiOiBcIuaVpuWMluW4glwiLFxuXHQgICAgXCIyMjI0MDRcIjogXCLnj7LmmKXluIJcIixcblx0ICAgIFwiMjIyNDA1XCI6IFwi6b6Z5LqV5biCXCIsXG5cdCAgICBcIjIyMjQwNlwiOiBcIuWSjOm+meW4glwiLFxuXHQgICAgXCIyMjI0MjRcIjogXCLmsarmuIXljr9cIixcblx0ICAgIFwiMjIyNDI2XCI6IFwi5a6J5Zu+5Y6/XCIsXG5cdCAgICBcIjIyMjQyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzAwMDBcIjogXCLpu5HpvpnmsZ/nnIFcIixcblx0ICAgIFwiMjMwMTAwXCI6IFwi5ZOI5bCU5ruo5biCXCIsXG5cdCAgICBcIjIzMDEwMlwiOiBcIumBk+mHjOWMulwiLFxuXHQgICAgXCIyMzAxMDNcIjogXCLljZflspfljLpcIixcblx0ICAgIFwiMjMwMTA0XCI6IFwi6YGT5aSW5Yy6XCIsXG5cdCAgICBcIjIzMDEwNlwiOiBcIummmeWdiuWMulwiLFxuXHQgICAgXCIyMzAxMDhcIjogXCLlubPmiL/ljLpcIixcblx0ICAgIFwiMjMwMTA5XCI6IFwi5p2+5YyX5Yy6XCIsXG5cdCAgICBcIjIzMDExMVwiOiBcIuWRvOWFsOWMulwiLFxuXHQgICAgXCIyMzAxMjNcIjogXCLkvp3lhbDljr9cIixcblx0ICAgIFwiMjMwMTI0XCI6IFwi5pa55q2j5Y6/XCIsXG5cdCAgICBcIjIzMDEyNVwiOiBcIuWuvuWOv1wiLFxuXHQgICAgXCIyMzAxMjZcIjogXCLlt7Tlvabljr9cIixcblx0ICAgIFwiMjMwMTI3XCI6IFwi5pyo5YWw5Y6/XCIsXG5cdCAgICBcIjIzMDEyOFwiOiBcIumAmuays+WOv1wiLFxuXHQgICAgXCIyMzAxMjlcIjogXCLlu7blr7/ljr9cIixcblx0ICAgIFwiMjMwMTgxXCI6IFwi6Zi/5Z+O5Yy6XCIsXG5cdCAgICBcIjIzMDE4MlwiOiBcIuWPjOWfjuW4glwiLFxuXHQgICAgXCIyMzAxODNcIjogXCLlsJrlv5fluIJcIixcblx0ICAgIFwiMjMwMTg0XCI6IFwi5LqU5bi45biCXCIsXG5cdCAgICBcIjIzMDE4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzAyMDBcIjogXCLpvZDpvZDlk4jlsJTluIJcIixcblx0ICAgIFwiMjMwMjAyXCI6IFwi6b6Z5rKZ5Yy6XCIsXG5cdCAgICBcIjIzMDIwM1wiOiBcIuW7uuWNjuWMulwiLFxuXHQgICAgXCIyMzAyMDRcIjogXCLpk4HplIvljLpcIixcblx0ICAgIFwiMjMwMjA1XCI6IFwi5piC5piC5rqq5Yy6XCIsXG5cdCAgICBcIjIzMDIwNlwiOiBcIuWvjOaLieWwlOWfuuWMulwiLFxuXHQgICAgXCIyMzAyMDdcIjogXCLnor7lrZDlsbHljLpcIixcblx0ICAgIFwiMjMwMjA4XCI6IFwi5qKF6YeM5pav6L6+5pah5bCU5peP5Yy6XCIsXG5cdCAgICBcIjIzMDIyMVwiOiBcIum+meaxn+WOv1wiLFxuXHQgICAgXCIyMzAyMjNcIjogXCLkvp3lronljr9cIixcblx0ICAgIFwiMjMwMjI0XCI6IFwi5rOw5p2l5Y6/XCIsXG5cdCAgICBcIjIzMDIyNVwiOiBcIueUmOWNl+WOv1wiLFxuXHQgICAgXCIyMzAyMjdcIjogXCLlr4zoo5Xljr9cIixcblx0ICAgIFwiMjMwMjI5XCI6IFwi5YWL5bGx5Y6/XCIsXG5cdCAgICBcIjIzMDIzMFwiOiBcIuWFi+S4nOWOv1wiLFxuXHQgICAgXCIyMzAyMzFcIjogXCLmi5zms4nljr9cIixcblx0ICAgIFwiMjMwMjgxXCI6IFwi6K635rKz5biCXCIsXG5cdCAgICBcIjIzMDI4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzAzMDBcIjogXCLpuKHopb/luIJcIixcblx0ICAgIFwiMjMwMzAyXCI6IFwi6bih5Yag5Yy6XCIsXG5cdCAgICBcIjIzMDMwM1wiOiBcIuaBkuWxseWMulwiLFxuXHQgICAgXCIyMzAzMDRcIjogXCLmu7TpgZPljLpcIixcblx0ICAgIFwiMjMwMzA1XCI6IFwi5qKo5qCR5Yy6XCIsXG5cdCAgICBcIjIzMDMwNlwiOiBcIuWfjuWtkOays+WMulwiLFxuXHQgICAgXCIyMzAzMDdcIjogXCLpurvlsbHljLpcIixcblx0ICAgIFwiMjMwMzIxXCI6IFwi6bih5Lic5Y6/XCIsXG5cdCAgICBcIjIzMDM4MVwiOiBcIuiZjuael+W4glwiLFxuXHQgICAgXCIyMzAzODJcIjogXCLlr4blsbHluIJcIixcblx0ICAgIFwiMjMwMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDQwMFwiOiBcIum5pOWyl+W4glwiLFxuXHQgICAgXCIyMzA0MDJcIjogXCLlkJHpmLPljLpcIixcblx0ICAgIFwiMjMwNDAzXCI6IFwi5bel5Yac5Yy6XCIsXG5cdCAgICBcIjIzMDQwNFwiOiBcIuWNl+WxseWMulwiLFxuXHQgICAgXCIyMzA0MDVcIjogXCLlhbTlronljLpcIixcblx0ICAgIFwiMjMwNDA2XCI6IFwi5Lic5bGx5Yy6XCIsXG5cdCAgICBcIjIzMDQwN1wiOiBcIuWFtOWxseWMulwiLFxuXHQgICAgXCIyMzA0MjFcIjogXCLokJ3ljJfljr9cIixcblx0ICAgIFwiMjMwNDIyXCI6IFwi57ul5ruo5Y6/XCIsXG5cdCAgICBcIjIzMDQyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzA1MDBcIjogXCLlj4zpuK3lsbHluIJcIixcblx0ICAgIFwiMjMwNTAyXCI6IFwi5bCW5bGx5Yy6XCIsXG5cdCAgICBcIjIzMDUwM1wiOiBcIuWyreS4nOWMulwiLFxuXHQgICAgXCIyMzA1MDVcIjogXCLlm5vmlrnlj7DljLpcIixcblx0ICAgIFwiMjMwNTA2XCI6IFwi5a6d5bGx5Yy6XCIsXG5cdCAgICBcIjIzMDUyMVwiOiBcIumbhui0pOWOv1wiLFxuXHQgICAgXCIyMzA1MjJcIjogXCLlj4vosIrljr9cIixcblx0ICAgIFwiMjMwNTIzXCI6IFwi5a6d5riF5Y6/XCIsXG5cdCAgICBcIjIzMDUyNFwiOiBcIumltuays+WOv1wiLFxuXHQgICAgXCIyMzA1MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwNjAwXCI6IFwi5aSn5bqG5biCXCIsXG5cdCAgICBcIjIzMDYwMlwiOiBcIuiQqOWwlOWbvuWMulwiLFxuXHQgICAgXCIyMzA2MDNcIjogXCLpvpnlh6TljLpcIixcblx0ICAgIFwiMjMwNjA0XCI6IFwi6K6p6IOh6Lev5Yy6XCIsXG5cdCAgICBcIjIzMDYwNVwiOiBcIue6ouWyl+WMulwiLFxuXHQgICAgXCIyMzA2MDZcIjogXCLlpKflkIzljLpcIixcblx0ICAgIFwiMjMwNjIxXCI6IFwi6IKH5bee5Y6/XCIsXG5cdCAgICBcIjIzMDYyMlwiOiBcIuiCh+a6kOWOv1wiLFxuXHQgICAgXCIyMzA2MjNcIjogXCLmnpfnlLjljr9cIixcblx0ICAgIFwiMjMwNjI0XCI6IFwi5p2c5bCU5Lyv54m56JKZ5Y+k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIzMDYyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzA3MDBcIjogXCLkvIrmmKXluIJcIixcblx0ICAgIFwiMjMwNzAyXCI6IFwi5LyK5pil5Yy6XCIsXG5cdCAgICBcIjIzMDcwM1wiOiBcIuWNl+WylOWMulwiLFxuXHQgICAgXCIyMzA3MDRcIjogXCLlj4vlpb3ljLpcIixcblx0ICAgIFwiMjMwNzA1XCI6IFwi6KW/5p6X5Yy6XCIsXG5cdCAgICBcIjIzMDcwNlwiOiBcIue/oOWzpuWMulwiLFxuXHQgICAgXCIyMzA3MDdcIjogXCLmlrDpnZLljLpcIixcblx0ICAgIFwiMjMwNzA4XCI6IFwi576O5rqq5Yy6XCIsXG5cdCAgICBcIjIzMDcwOVwiOiBcIumHkeWxseWxr+WMulwiLFxuXHQgICAgXCIyMzA3MTBcIjogXCLkupTokKXljLpcIixcblx0ICAgIFwiMjMwNzExXCI6IFwi5LmM6ams5rKz5Yy6XCIsXG5cdCAgICBcIjIzMDcxMlwiOiBcIuaxpOaXuuays+WMulwiLFxuXHQgICAgXCIyMzA3MTNcIjogXCLluKblsq3ljLpcIixcblx0ICAgIFwiMjMwNzE0XCI6IFwi5LmM5LyK5bKt5Yy6XCIsXG5cdCAgICBcIjIzMDcxNVwiOiBcIue6ouaYn+WMulwiLFxuXHQgICAgXCIyMzA3MTZcIjogXCLkuIrnlJjlsq3ljLpcIixcblx0ICAgIFwiMjMwNzIyXCI6IFwi5ZiJ6I2r5Y6/XCIsXG5cdCAgICBcIjIzMDc4MVwiOiBcIumTgeWKm+W4glwiLFxuXHQgICAgXCIyMzA3ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwODAwXCI6IFwi5L2z5pyo5pav5biCXCIsXG5cdCAgICBcIjIzMDgwM1wiOiBcIuWQkemYs+WMulwiLFxuXHQgICAgXCIyMzA4MDRcIjogXCLliY3ov5vljLpcIixcblx0ICAgIFwiMjMwODA1XCI6IFwi5Lic6aOO5Yy6XCIsXG5cdCAgICBcIjIzMDgxMVwiOiBcIumDiuWMulwiLFxuXHQgICAgXCIyMzA4MjJcIjogXCLmoabljZfljr9cIixcblx0ICAgIFwiMjMwODI2XCI6IFwi5qGm5bed5Y6/XCIsXG5cdCAgICBcIjIzMDgyOFwiOiBcIuaxpOWOn+WOv1wiLFxuXHQgICAgXCIyMzA4MzNcIjogXCLmiprov5zljr9cIixcblx0ICAgIFwiMjMwODgxXCI6IFwi5ZCM5rGf5biCXCIsXG5cdCAgICBcIjIzMDg4MlwiOiBcIuWvjOmUpuW4glwiLFxuXHQgICAgXCIyMzA4ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwOTAwXCI6IFwi5LiD5Y+w5rKz5biCXCIsXG5cdCAgICBcIjIzMDkwMlwiOiBcIuaWsOWFtOWMulwiLFxuXHQgICAgXCIyMzA5MDNcIjogXCLmoYPlsbHljLpcIixcblx0ICAgIFwiMjMwOTA0XCI6IFwi6IyE5a2Q5rKz5Yy6XCIsXG5cdCAgICBcIjIzMDkyMVwiOiBcIuWLg+WIqeWOv1wiLFxuXHQgICAgXCIyMzA5MjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMxMDAwXCI6IFwi54mh5Li55rGf5biCXCIsXG5cdCAgICBcIjIzMTAwMlwiOiBcIuS4nOWuieWMulwiLFxuXHQgICAgXCIyMzEwMDNcIjogXCLpmLPmmI7ljLpcIixcblx0ICAgIFwiMjMxMDA0XCI6IFwi54ix5rCR5Yy6XCIsXG5cdCAgICBcIjIzMTAwNVwiOiBcIuilv+WuieWMulwiLFxuXHQgICAgXCIyMzEwMjRcIjogXCLkuJzlroHljr9cIixcblx0ICAgIFwiMjMxMDI1XCI6IFwi5p6X5Y+j5Y6/XCIsXG5cdCAgICBcIjIzMTA4MVwiOiBcIue7peiKrOays+W4glwiLFxuXHQgICAgXCIyMzEwODNcIjogXCLmtbfmnpfluIJcIixcblx0ICAgIFwiMjMxMDg0XCI6IFwi5a6B5a6J5biCXCIsXG5cdCAgICBcIjIzMTA4NVwiOiBcIuephuajseW4glwiLFxuXHQgICAgXCIyMzEwODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMxMTAwXCI6IFwi6buR5rKz5biCXCIsXG5cdCAgICBcIjIzMTEwMlwiOiBcIueIsei+ieWMulwiLFxuXHQgICAgXCIyMzExMjFcIjogXCLlq6nmsZ/ljr9cIixcblx0ICAgIFwiMjMxMTIzXCI6IFwi6YCK5YWL5Y6/XCIsXG5cdCAgICBcIjIzMTEyNFwiOiBcIuWtmeWQtOWOv1wiLFxuXHQgICAgXCIyMzExODFcIjogXCLljJflronluIJcIixcblx0ICAgIFwiMjMxMTgyXCI6IFwi5LqU5aSn6L+e5rGg5biCXCIsXG5cdCAgICBcIjIzMTE4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzEyMDBcIjogXCLnu6XljJbluIJcIixcblx0ICAgIFwiMjMxMjAyXCI6IFwi5YyX5p6X5Yy6XCIsXG5cdCAgICBcIjIzMTIyMVwiOiBcIuacm+WljuWOv1wiLFxuXHQgICAgXCIyMzEyMjJcIjogXCLlhbDopb/ljr9cIixcblx0ICAgIFwiMjMxMjIzXCI6IFwi6Z2S5YaI5Y6/XCIsXG5cdCAgICBcIjIzMTIyNFwiOiBcIuW6huWuieWOv1wiLFxuXHQgICAgXCIyMzEyMjVcIjogXCLmmI7msLTljr9cIixcblx0ICAgIFwiMjMxMjI2XCI6IFwi57ul5qOx5Y6/XCIsXG5cdCAgICBcIjIzMTI4MVwiOiBcIuWuiei+vuW4glwiLFxuXHQgICAgXCIyMzEyODJcIjogXCLogofkuJzluIJcIixcblx0ICAgIFwiMjMxMjgzXCI6IFwi5rW35Lym5biCXCIsXG5cdCAgICBcIjIzMTI4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzI3MDBcIjogXCLlpKflhbTlronlsq3lnLDljLpcIixcblx0ICAgIFwiMjMyNzAyXCI6IFwi5p2+5bKt5Yy6XCIsXG5cdCAgICBcIjIzMjcwM1wiOiBcIuaWsOael+WMulwiLFxuXHQgICAgXCIyMzI3MDRcIjogXCLlkbzkuK3ljLpcIixcblx0ICAgIFwiMjMyNzIxXCI6IFwi5ZG8546b5Y6/XCIsXG5cdCAgICBcIjIzMjcyMlwiOiBcIuWhlOays+WOv1wiLFxuXHQgICAgXCIyMzI3MjNcIjogXCLmvKDmsrPljr9cIixcblx0ICAgIFwiMjMyNzI0XCI6IFwi5Yqg5qC86L6+5aWH5Yy6XCIsXG5cdCAgICBcIjIzMjcyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMTAwMDBcIjogXCLkuIrmtbdcIixcblx0ICAgIFwiMzEwMTAwXCI6IFwi5LiK5rW35biCXCIsXG5cdCAgICBcIjMxMDEwMVwiOiBcIum7hOa1puWMulwiLFxuXHQgICAgXCIzMTAxMDRcIjogXCLlvpDmsYfljLpcIixcblx0ICAgIFwiMzEwMTA1XCI6IFwi6ZW/5a6B5Yy6XCIsXG5cdCAgICBcIjMxMDEwNlwiOiBcIumdmeWuieWMulwiLFxuXHQgICAgXCIzMTAxMDdcIjogXCLmma7pmYDljLpcIixcblx0ICAgIFwiMzEwMTA4XCI6IFwi6Ze45YyX5Yy6XCIsXG5cdCAgICBcIjMxMDEwOVwiOiBcIuiZueWPo+WMulwiLFxuXHQgICAgXCIzMTAxMTBcIjogXCLmnajmtabljLpcIixcblx0ICAgIFwiMzEwMTEyXCI6IFwi6Ze16KGM5Yy6XCIsXG5cdCAgICBcIjMxMDExM1wiOiBcIuWuneWxseWMulwiLFxuXHQgICAgXCIzMTAxMTRcIjogXCLlmInlrprljLpcIixcblx0ICAgIFwiMzEwMTE1XCI6IFwi5rWm5Lic5paw5Yy6XCIsXG5cdCAgICBcIjMxMDExNlwiOiBcIumHkeWxseWMulwiLFxuXHQgICAgXCIzMTAxMTdcIjogXCLmnb7msZ/ljLpcIixcblx0ICAgIFwiMzEwMTE4XCI6IFwi6Z2S5rWm5Yy6XCIsXG5cdCAgICBcIjMxMDEyMFwiOiBcIuWliei0pOWMulwiLFxuXHQgICAgXCIzMTAyMzBcIjogXCLltIfmmI7ljr9cIixcblx0ICAgIFwiMzEwMjMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDAwMFwiOiBcIuaxn+iLj+ecgVwiLFxuXHQgICAgXCIzMjAxMDBcIjogXCLljZfkuqzluIJcIixcblx0ICAgIFwiMzIwMTAyXCI6IFwi546E5q2m5Yy6XCIsXG5cdCAgICBcIjMyMDEwNFwiOiBcIuenpua3ruWMulwiLFxuXHQgICAgXCIzMjAxMDVcIjogXCLlu7rpgrrljLpcIixcblx0ICAgIFwiMzIwMTA2XCI6IFwi6byT5qW85Yy6XCIsXG5cdCAgICBcIjMyMDExMVwiOiBcIua1puWPo+WMulwiLFxuXHQgICAgXCIzMjAxMTNcIjogXCLmoJbpnJ7ljLpcIixcblx0ICAgIFwiMzIwMTE0XCI6IFwi6Zuo6Iqx5Y+w5Yy6XCIsXG5cdCAgICBcIjMyMDExNVwiOiBcIuaxn+WugeWMulwiLFxuXHQgICAgXCIzMjAxMTZcIjogXCLlha3lkIjljLpcIixcblx0ICAgIFwiMzIwMTI0XCI6IFwi5rqn5rC05Yy6XCIsXG5cdCAgICBcIjMyMDEyNVwiOiBcIumrmOa3s+WMulwiLFxuXHQgICAgXCIzMjAxMjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwMjAwXCI6IFwi5peg6ZSh5biCXCIsXG5cdCAgICBcIjMyMDIwMlwiOiBcIuW0h+WuieWMulwiLFxuXHQgICAgXCIzMjAyMDNcIjogXCLljZfplb/ljLpcIixcblx0ICAgIFwiMzIwMjA0XCI6IFwi5YyX5aGY5Yy6XCIsXG5cdCAgICBcIjMyMDIwNVwiOiBcIumUoeWxseWMulwiLFxuXHQgICAgXCIzMjAyMDZcIjogXCLmg6DlsbHljLpcIixcblx0ICAgIFwiMzIwMjExXCI6IFwi5ruo5rmW5Yy6XCIsXG5cdCAgICBcIjMyMDI4MVwiOiBcIuaxn+mYtOW4glwiLFxuXHQgICAgXCIzMjAyODJcIjogXCLlrpzlhbTluIJcIixcblx0ICAgIFwiMzIwMjk3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDMwMFwiOiBcIuW+kOW3nuW4glwiLFxuXHQgICAgXCIzMjAzMDJcIjogXCLpvJPmpbzljLpcIixcblx0ICAgIFwiMzIwMzAzXCI6IFwi5LqR6b6Z5Yy6XCIsXG5cdCAgICBcIjMyMDMwNVwiOiBcIui0vuaxquWMulwiLFxuXHQgICAgXCIzMjAzMTFcIjogXCLms4nlsbHljLpcIixcblx0ICAgIFwiMzIwMzIxXCI6IFwi5Liw5Y6/XCIsXG5cdCAgICBcIjMyMDMyMlwiOiBcIuaym+WOv1wiLFxuXHQgICAgXCIzMjAzMjNcIjogXCLpk5zlsbHljLpcIixcblx0ICAgIFwiMzIwMzI0XCI6IFwi552i5a6B5Y6/XCIsXG5cdCAgICBcIjMyMDM4MVwiOiBcIuaWsOayguW4glwiLFxuXHQgICAgXCIzMjAzODJcIjogXCLpgrPlt57luIJcIixcblx0ICAgIFwiMzIwMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDQwMFwiOiBcIuW4uOW3nuW4glwiLFxuXHQgICAgXCIzMjA0MDJcIjogXCLlpKnlroHljLpcIixcblx0ICAgIFwiMzIwNDA0XCI6IFwi6ZKf5qW85Yy6XCIsXG5cdCAgICBcIjMyMDQwNVwiOiBcIuaImuWiheWgsOWMulwiLFxuXHQgICAgXCIzMjA0MTFcIjogXCLmlrDljJfljLpcIixcblx0ICAgIFwiMzIwNDEyXCI6IFwi5q2m6L+b5Yy6XCIsXG5cdCAgICBcIjMyMDQ4MVwiOiBcIua6p+mYs+W4glwiLFxuXHQgICAgXCIzMjA0ODJcIjogXCLph5HlnZvluIJcIixcblx0ICAgIFwiMzIwNDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDUwMFwiOiBcIuiLj+W3nuW4glwiLFxuXHQgICAgXCIzMjA1MDVcIjogXCLomY7kuJjljLpcIixcblx0ICAgIFwiMzIwNTA2XCI6IFwi5ZC05Lit5Yy6XCIsXG5cdCAgICBcIjMyMDUwN1wiOiBcIuebuOWfjuWMulwiLFxuXHQgICAgXCIzMjA1MDhcIjogXCLlp5Hoi4/ljLpcIixcblx0ICAgIFwiMzIwNTgxXCI6IFwi5bi454af5biCXCIsXG5cdCAgICBcIjMyMDU4MlwiOiBcIuW8oOWutua4r+W4glwiLFxuXHQgICAgXCIzMjA1ODNcIjogXCLmmIblsbHluIJcIixcblx0ICAgIFwiMzIwNTg0XCI6IFwi5ZC05rGf5Yy6XCIsXG5cdCAgICBcIjMyMDU4NVwiOiBcIuWkquS7k+W4glwiLFxuXHQgICAgXCIzMjA1OTZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwNjAwXCI6IFwi5Y2X6YCa5biCXCIsXG5cdCAgICBcIjMyMDYwMlwiOiBcIuW0h+W3neWMulwiLFxuXHQgICAgXCIzMjA2MTFcIjogXCLmuK/pl7jljLpcIixcblx0ICAgIFwiMzIwNjEyXCI6IFwi6YCa5bee5Yy6XCIsXG5cdCAgICBcIjMyMDYyMVwiOiBcIua1t+WuieWOv1wiLFxuXHQgICAgXCIzMjA2MjNcIjogXCLlpoLkuJzljr9cIixcblx0ICAgIFwiMzIwNjgxXCI6IFwi5ZCv5Lic5biCXCIsXG5cdCAgICBcIjMyMDY4MlwiOiBcIuWmgueai+W4glwiLFxuXHQgICAgXCIzMjA2ODRcIjogXCLmtbfpl6jluIJcIixcblx0ICAgIFwiMzIwNjk0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDcwMFwiOiBcIui/nuS6kea4r+W4glwiLFxuXHQgICAgXCIzMjA3MDNcIjogXCLov57kupHljLpcIixcblx0ICAgIFwiMzIwNzA1XCI6IFwi5paw5rWm5Yy6XCIsXG5cdCAgICBcIjMyMDcwNlwiOiBcIua1t+W3nuWMulwiLFxuXHQgICAgXCIzMjA3MjFcIjogXCLotaPmpobljr9cIixcblx0ICAgIFwiMzIwNzIyXCI6IFwi5Lic5rW35Y6/XCIsXG5cdCAgICBcIjMyMDcyM1wiOiBcIueBjOS6keWOv1wiLFxuXHQgICAgXCIzMjA3MjRcIjogXCLngYzljZfljr9cIixcblx0ICAgIFwiMzIwNzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDgwMFwiOiBcIua3ruWuieW4glwiLFxuXHQgICAgXCIzMjA4MDJcIjogXCLmuIXmsrPljLpcIixcblx0ICAgIFwiMzIwODAzXCI6IFwi5reu5a6J5Yy6XCIsXG5cdCAgICBcIjMyMDgwNFwiOiBcIua3rumYtOWMulwiLFxuXHQgICAgXCIzMjA4MTFcIjogXCLmuIXmtabljLpcIixcblx0ICAgIFwiMzIwODI2XCI6IFwi5raf5rC05Y6/XCIsXG5cdCAgICBcIjMyMDgyOVwiOiBcIua0quazveWOv1wiLFxuXHQgICAgXCIzMjA4MzBcIjogXCLnm7HnnJnljr9cIixcblx0ICAgIFwiMzIwODMxXCI6IFwi6YeR5rmW5Y6/XCIsXG5cdCAgICBcIjMyMDgzMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjA5MDBcIjogXCLnm5Dln47luIJcIixcblx0ICAgIFwiMzIwOTAyXCI6IFwi5Lqt5rmW5Yy6XCIsXG5cdCAgICBcIjMyMDkwM1wiOiBcIuebkOmDveWMulwiLFxuXHQgICAgXCIzMjA5MjFcIjogXCLlk43msLTljr9cIixcblx0ICAgIFwiMzIwOTIyXCI6IFwi5ruo5rW35Y6/XCIsXG5cdCAgICBcIjMyMDkyM1wiOiBcIumYnOWugeWOv1wiLFxuXHQgICAgXCIzMjA5MjRcIjogXCLlsITpmLPljr9cIixcblx0ICAgIFwiMzIwOTI1XCI6IFwi5bu65rmW5Y6/XCIsXG5cdCAgICBcIjMyMDk4MVwiOiBcIuS4nOWPsOW4glwiLFxuXHQgICAgXCIzMjA5ODJcIjogXCLlpKfkuLDluIJcIixcblx0ICAgIFwiMzIwOTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMTAwMFwiOiBcIuaJrOW3nuW4glwiLFxuXHQgICAgXCIzMjEwMDJcIjogXCLlub/pmbXljLpcIixcblx0ICAgIFwiMzIxMDAzXCI6IFwi6YKX5rGf5Yy6XCIsXG5cdCAgICBcIjMyMTAyM1wiOiBcIuWuneW6lOWOv1wiLFxuXHQgICAgXCIzMjEwODFcIjogXCLku6rlvoHluIJcIixcblx0ICAgIFwiMzIxMDg0XCI6IFwi6auY6YKu5biCXCIsXG5cdCAgICBcIjMyMTA4OFwiOiBcIuaxn+mDveWMulwiLFxuXHQgICAgXCIzMjEwOTNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIxMTAwXCI6IFwi6ZWH5rGf5biCXCIsXG5cdCAgICBcIjMyMTEwMlwiOiBcIuS6rOWPo+WMulwiLFxuXHQgICAgXCIzMjExMTFcIjogXCLmtqblt57ljLpcIixcblx0ICAgIFwiMzIxMTEyXCI6IFwi5Li55b6S5Yy6XCIsXG5cdCAgICBcIjMyMTE4MVwiOiBcIuS4uemYs+W4glwiLFxuXHQgICAgXCIzMjExODJcIjogXCLmiazkuK3luIJcIixcblx0ICAgIFwiMzIxMTgzXCI6IFwi5Y+l5a655biCXCIsXG5cdCAgICBcIjMyMTE4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjEyMDBcIjogXCLms7Dlt57luIJcIixcblx0ICAgIFwiMzIxMjAyXCI6IFwi5rW36Zm15Yy6XCIsXG5cdCAgICBcIjMyMTIwM1wiOiBcIumrmOa4r+WMulwiLFxuXHQgICAgXCIzMjEyODFcIjogXCLlhbTljJbluIJcIixcblx0ICAgIFwiMzIxMjgyXCI6IFwi6Z2W5rGf5biCXCIsXG5cdCAgICBcIjMyMTI4M1wiOiBcIuazsOWFtOW4glwiLFxuXHQgICAgXCIzMjEyODRcIjogXCLlp5zloLDljLpcIixcblx0ICAgIFwiMzIxMjg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMTMwMFwiOiBcIuWuv+i/geW4glwiLFxuXHQgICAgXCIzMjEzMDJcIjogXCLlrr/ln47ljLpcIixcblx0ICAgIFwiMzIxMzExXCI6IFwi5a6/6LGr5Yy6XCIsXG5cdCAgICBcIjMyMTMyMlwiOiBcIuayremYs+WOv1wiLFxuXHQgICAgXCIzMjEzMjNcIjogXCLms5fpmLPljr9cIixcblx0ICAgIFwiMzIxMzI0XCI6IFwi5rOX5rSq5Y6/XCIsXG5cdCAgICBcIjMyMTMyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzAwMDBcIjogXCLmtZnmsZ/nnIFcIixcblx0ICAgIFwiMzMwMTAwXCI6IFwi5p2t5bee5biCXCIsXG5cdCAgICBcIjMzMDEwMlwiOiBcIuS4iuWfjuWMulwiLFxuXHQgICAgXCIzMzAxMDNcIjogXCLkuIvln47ljLpcIixcblx0ICAgIFwiMzMwMTA0XCI6IFwi5rGf5bmy5Yy6XCIsXG5cdCAgICBcIjMzMDEwNVwiOiBcIuaLseWiheWMulwiLFxuXHQgICAgXCIzMzAxMDZcIjogXCLopb/muZbljLpcIixcblx0ICAgIFwiMzMwMTA4XCI6IFwi5ruo5rGf5Yy6XCIsXG5cdCAgICBcIjMzMDEwOVwiOiBcIuiQp+WxseWMulwiLFxuXHQgICAgXCIzMzAxMTBcIjogXCLkvZnmna3ljLpcIixcblx0ICAgIFwiMzMwMTIyXCI6IFwi5qGQ5bqQ5Y6/XCIsXG5cdCAgICBcIjMzMDEyN1wiOiBcIua3s+WuieWOv1wiLFxuXHQgICAgXCIzMzAxODJcIjogXCLlu7rlvrfluIJcIixcblx0ICAgIFwiMzMwMTgzXCI6IFwi5a+M6Ziz5biCXCIsXG5cdCAgICBcIjMzMDE4NVwiOiBcIuS4tOWuieW4glwiLFxuXHQgICAgXCIzMzAxODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwMjAwXCI6IFwi5a6B5rOi5biCXCIsXG5cdCAgICBcIjMzMDIwM1wiOiBcIua1t+abmeWMulwiLFxuXHQgICAgXCIzMzAyMDRcIjogXCLmsZ/kuJzljLpcIixcblx0ICAgIFwiMzMwMjA1XCI6IFwi5rGf5YyX5Yy6XCIsXG5cdCAgICBcIjMzMDIwNlwiOiBcIuWMl+S7keWMulwiLFxuXHQgICAgXCIzMzAyMTFcIjogXCLplYfmtbfljLpcIixcblx0ICAgIFwiMzMwMjEyXCI6IFwi6YSe5bee5Yy6XCIsXG5cdCAgICBcIjMzMDIyNVwiOiBcIuixoeWxseWOv1wiLFxuXHQgICAgXCIzMzAyMjZcIjogXCLlroHmtbfljr9cIixcblx0ICAgIFwiMzMwMjgxXCI6IFwi5L2Z5aea5biCXCIsXG5cdCAgICBcIjMzMDI4MlwiOiBcIuaFiOa6quW4glwiLFxuXHQgICAgXCIzMzAyODNcIjogXCLlpYnljJbluIJcIixcblx0ICAgIFwiMzMwMjg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDMwMFwiOiBcIua4qeW3nuW4glwiLFxuXHQgICAgXCIzMzAzMDJcIjogXCLpub/ln47ljLpcIixcblx0ICAgIFwiMzMwMzAzXCI6IFwi6b6Z5rm+5Yy6XCIsXG5cdCAgICBcIjMzMDMwNFwiOiBcIueTr+a1t+WMulwiLFxuXHQgICAgXCIzMzAzMjJcIjogXCLmtJ7lpLTljr9cIixcblx0ICAgIFwiMzMwMzI0XCI6IFwi5rC45ZiJ5Y6/XCIsXG5cdCAgICBcIjMzMDMyNlwiOiBcIuW5s+mYs+WOv1wiLFxuXHQgICAgXCIzMzAzMjdcIjogXCLoi43ljZfljr9cIixcblx0ICAgIFwiMzMwMzI4XCI6IFwi5paH5oiQ5Y6/XCIsXG5cdCAgICBcIjMzMDMyOVwiOiBcIuazsOmhuuWOv1wiLFxuXHQgICAgXCIzMzAzODFcIjogXCLnkZ7lronluIJcIixcblx0ICAgIFwiMzMwMzgyXCI6IFwi5LmQ5riF5biCXCIsXG5cdCAgICBcIjMzMDM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzA0MDBcIjogXCLlmInlhbTluIJcIixcblx0ICAgIFwiMzMwNDAyXCI6IFwi5Y2X5rmW5Yy6XCIsXG5cdCAgICBcIjMzMDQxMVwiOiBcIuengOa0suWMulwiLFxuXHQgICAgXCIzMzA0MjFcIjogXCLlmInlloTljr9cIixcblx0ICAgIFwiMzMwNDI0XCI6IFwi5rW355uQ5Y6/XCIsXG5cdCAgICBcIjMzMDQ4MVwiOiBcIua1t+WugeW4glwiLFxuXHQgICAgXCIzMzA0ODJcIjogXCLlubPmuZbluIJcIixcblx0ICAgIFwiMzMwNDgzXCI6IFwi5qGQ5Lmh5biCXCIsXG5cdCAgICBcIjMzMDQ4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzA1MDBcIjogXCLmuZblt57luIJcIixcblx0ICAgIFwiMzMwNTAyXCI6IFwi5ZC05YW05Yy6XCIsXG5cdCAgICBcIjMzMDUwM1wiOiBcIuWNl+a1lOWMulwiLFxuXHQgICAgXCIzMzA1MjFcIjogXCLlvrfmuIXljr9cIixcblx0ICAgIFwiMzMwNTIyXCI6IFwi6ZW/5YW05Y6/XCIsXG5cdCAgICBcIjMzMDUyM1wiOiBcIuWuieWQieWOv1wiLFxuXHQgICAgXCIzMzA1MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwNjAwXCI6IFwi57uN5YW05biCXCIsXG5cdCAgICBcIjMzMDYwMlwiOiBcIui2iuWfjuWMulwiLFxuXHQgICAgXCIzMzA2MjFcIjogXCLnu43lhbTljr9cIixcblx0ICAgIFwiMzMwNjI0XCI6IFwi5paw5piM5Y6/XCIsXG5cdCAgICBcIjMzMDY4MVwiOiBcIuivuOaaqOW4glwiLFxuXHQgICAgXCIzMzA2ODJcIjogXCLkuIromZ7luIJcIixcblx0ICAgIFwiMzMwNjgzXCI6IFwi5bWK5bee5biCXCIsXG5cdCAgICBcIjMzMDY4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzA3MDBcIjogXCLph5HljY7luIJcIixcblx0ICAgIFwiMzMwNzAyXCI6IFwi5am65Z+O5Yy6XCIsXG5cdCAgICBcIjMzMDcwM1wiOiBcIumHkeS4nOWMulwiLFxuXHQgICAgXCIzMzA3MjNcIjogXCLmrabkuYnljr9cIixcblx0ICAgIFwiMzMwNzI2XCI6IFwi5rWm5rGf5Y6/XCIsXG5cdCAgICBcIjMzMDcyN1wiOiBcIuejkOWuieWOv1wiLFxuXHQgICAgXCIzMzA3ODFcIjogXCLlhbDmuqrluIJcIixcblx0ICAgIFwiMzMwNzgyXCI6IFwi5LmJ5LmM5biCXCIsXG5cdCAgICBcIjMzMDc4M1wiOiBcIuS4nOmYs+W4glwiLFxuXHQgICAgXCIzMzA3ODRcIjogXCLmsLjlurfluIJcIixcblx0ICAgIFwiMzMwNzg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDgwMFwiOiBcIuihouW3nuW4glwiLFxuXHQgICAgXCIzMzA4MDJcIjogXCLmn6/ln47ljLpcIixcblx0ICAgIFwiMzMwODAzXCI6IFwi6KGi5rGf5Yy6XCIsXG5cdCAgICBcIjMzMDgyMlwiOiBcIuW4uOWxseWOv1wiLFxuXHQgICAgXCIzMzA4MjRcIjogXCLlvIDljJbljr9cIixcblx0ICAgIFwiMzMwODI1XCI6IFwi6b6Z5ri45Y6/XCIsXG5cdCAgICBcIjMzMDg4MVwiOiBcIuaxn+WxseW4glwiLFxuXHQgICAgXCIzMzA4ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwOTAwXCI6IFwi6Iif5bGx5biCXCIsXG5cdCAgICBcIjMzMDkwMlwiOiBcIuWumua1t+WMulwiLFxuXHQgICAgXCIzMzA5MDNcIjogXCLmma7pmYDljLpcIixcblx0ICAgIFwiMzMwOTIxXCI6IFwi5bKx5bGx5Y6/XCIsXG5cdCAgICBcIjMzMDkyMlwiOiBcIuW1iuazl+WOv1wiLFxuXHQgICAgXCIzMzA5MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMxMDAwXCI6IFwi5Y+w5bee5biCXCIsXG5cdCAgICBcIjMzMTAwMlwiOiBcIuakkuaxn+WMulwiLFxuXHQgICAgXCIzMzEwMDNcIjogXCLpu4TlsqnljLpcIixcblx0ICAgIFwiMzMxMDA0XCI6IFwi6Lev5qGl5Yy6XCIsXG5cdCAgICBcIjMzMTAyMVwiOiBcIueOieeOr+WOv1wiLFxuXHQgICAgXCIzMzEwMjJcIjogXCLkuInpl6jljr9cIixcblx0ICAgIFwiMzMxMDIzXCI6IFwi5aSp5Y+w5Y6/XCIsXG5cdCAgICBcIjMzMTAyNFwiOiBcIuS7meWxheWOv1wiLFxuXHQgICAgXCIzMzEwODFcIjogXCLmuKnlsq3luIJcIixcblx0ICAgIFwiMzMxMDgyXCI6IFwi5Li05rW35biCXCIsXG5cdCAgICBcIjMzMTA4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzExMDBcIjogXCLkuL3msLTluIJcIixcblx0ICAgIFwiMzMxMTAyXCI6IFwi6I6y6YO95Yy6XCIsXG5cdCAgICBcIjMzMTEyMVwiOiBcIumdkueUsOWOv1wiLFxuXHQgICAgXCIzMzExMjJcIjogXCLnvJnkupHljr9cIixcblx0ICAgIFwiMzMxMTIzXCI6IFwi6YGC5piM5Y6/XCIsXG5cdCAgICBcIjMzMTEyNFwiOiBcIuadvumYs+WOv1wiLFxuXHQgICAgXCIzMzExMjVcIjogXCLkupHlkozljr9cIixcblx0ICAgIFwiMzMxMTI2XCI6IFwi5bqG5YWD5Y6/XCIsXG5cdCAgICBcIjMzMTEyN1wiOiBcIuaZr+WugeeVsuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIzMzExODFcIjogXCLpvpnms4nluIJcIixcblx0ICAgIFwiMzMxMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDAwMFwiOiBcIuWuieW+veecgVwiLFxuXHQgICAgXCIzNDAxMDBcIjogXCLlkIjogqXluIJcIixcblx0ICAgIFwiMzQwMTAyXCI6IFwi55G25rW35Yy6XCIsXG5cdCAgICBcIjM0MDEwM1wiOiBcIuW6kOmYs+WMulwiLFxuXHQgICAgXCIzNDAxMDRcIjogXCLonIDlsbHljLpcIixcblx0ICAgIFwiMzQwMTExXCI6IFwi5YyF5rKz5Yy6XCIsXG5cdCAgICBcIjM0MDEyMVwiOiBcIumVv+S4sOWOv1wiLFxuXHQgICAgXCIzNDAxMjJcIjogXCLogqXkuJzljr9cIixcblx0ICAgIFwiMzQwMTIzXCI6IFwi6IKl6KW/5Y6/XCIsXG5cdCAgICBcIjM0MDE5MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDAyMDBcIjogXCLoipzmuZbluIJcIixcblx0ICAgIFwiMzQwMjAyXCI6IFwi6ZWc5rmW5Yy6XCIsXG5cdCAgICBcIjM0MDIwM1wiOiBcIuW8i+axn+WMulwiLFxuXHQgICAgXCIzNDAyMDdcIjogXCLpuKDmsZ/ljLpcIixcblx0ICAgIFwiMzQwMjA4XCI6IFwi5LiJ5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDIyMVwiOiBcIuiKnOa5luWOv1wiLFxuXHQgICAgXCIzNDAyMjJcIjogXCLnuYHmmIzljr9cIixcblx0ICAgIFwiMzQwMjIzXCI6IFwi5Y2X6Zm15Y6/XCIsXG5cdCAgICBcIjM0MDIyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDAzMDBcIjogXCLomozln6DluIJcIixcblx0ICAgIFwiMzQwMzAyXCI6IFwi6b6Z5a2Q5rmW5Yy6XCIsXG5cdCAgICBcIjM0MDMwM1wiOiBcIuiajOWxseWMulwiLFxuXHQgICAgXCIzNDAzMDRcIjogXCLnprnkvJrljLpcIixcblx0ICAgIFwiMzQwMzExXCI6IFwi5reu5LiK5Yy6XCIsXG5cdCAgICBcIjM0MDMyMVwiOiBcIuaAgOi/nOWOv1wiLFxuXHQgICAgXCIzNDAzMjJcIjogXCLkupTmsrPljr9cIixcblx0ICAgIFwiMzQwMzIzXCI6IFwi5Zu66ZWH5Y6/XCIsXG5cdCAgICBcIjM0MDMyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDA0MDBcIjogXCLmt67ljZfluIJcIixcblx0ICAgIFwiMzQwNDAyXCI6IFwi5aSn6YCa5Yy6XCIsXG5cdCAgICBcIjM0MDQwM1wiOiBcIueUsOWutuW6teWMulwiLFxuXHQgICAgXCIzNDA0MDRcIjogXCLosKLlrrbpm4bljLpcIixcblx0ICAgIFwiMzQwNDA1XCI6IFwi5YWr5YWs5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDQwNlwiOiBcIua9mOmbhuWMulwiLFxuXHQgICAgXCIzNDA0MjFcIjogXCLlh6Tlj7Dljr9cIixcblx0ICAgIFwiMzQwNDIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDUwMFwiOiBcIumprOmejeWxseW4glwiLFxuXHQgICAgXCIzNDA1MDNcIjogXCLoirHlsbHljLpcIixcblx0ICAgIFwiMzQwNTA0XCI6IFwi6Zuo5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDUwNlwiOiBcIuWNmuacm+WMulwiLFxuXHQgICAgXCIzNDA1MjFcIjogXCLlvZPmtoLljr9cIixcblx0ICAgIFwiMzQwNTIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDYwMFwiOiBcIua3ruWMl+W4glwiLFxuXHQgICAgXCIzNDA2MDJcIjogXCLmnZzpm4bljLpcIixcblx0ICAgIFwiMzQwNjAzXCI6IFwi55u45bGx5Yy6XCIsXG5cdCAgICBcIjM0MDYwNFwiOiBcIueDiOWxseWMulwiLFxuXHQgICAgXCIzNDA2MjFcIjogXCLmv4nmuqrljr9cIixcblx0ICAgIFwiMzQwNjIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDcwMFwiOiBcIumTnOmZteW4glwiLFxuXHQgICAgXCIzNDA3MDJcIjogXCLpk5zlrpjlsbHljLpcIixcblx0ICAgIFwiMzQwNzAzXCI6IFwi54uu5a2Q5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDcxMVwiOiBcIumDiuWMulwiLFxuXHQgICAgXCIzNDA3MjFcIjogXCLpk5zpmbXljr9cIixcblx0ICAgIFwiMzQwNzIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDgwMFwiOiBcIuWuieW6huW4glwiLFxuXHQgICAgXCIzNDA4MDJcIjogXCLov47msZ/ljLpcIixcblx0ICAgIFwiMzQwODAzXCI6IFwi5aSn6KeC5Yy6XCIsXG5cdCAgICBcIjM0MDgxMVwiOiBcIuWunOengOWMulwiLFxuXHQgICAgXCIzNDA4MjJcIjogXCLmgIDlroHljr9cIixcblx0ICAgIFwiMzQwODIzXCI6IFwi5p6e6Ziz5Y6/XCIsXG5cdCAgICBcIjM0MDgyNFwiOiBcIua9nOWxseWOv1wiLFxuXHQgICAgXCIzNDA4MjVcIjogXCLlpKrmuZbljr9cIixcblx0ICAgIFwiMzQwODI2XCI6IFwi5a6/5p2+5Y6/XCIsXG5cdCAgICBcIjM0MDgyN1wiOiBcIuacm+axn+WOv1wiLFxuXHQgICAgXCIzNDA4MjhcIjogXCLlsrPopb/ljr9cIixcblx0ICAgIFwiMzQwODgxXCI6IFwi5qGQ5Z+O5biCXCIsXG5cdCAgICBcIjM0MDg4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDEwMDBcIjogXCLpu4TlsbHluIJcIixcblx0ICAgIFwiMzQxMDAyXCI6IFwi5bGv5rqq5Yy6XCIsXG5cdCAgICBcIjM0MTAwM1wiOiBcIum7hOWxseWMulwiLFxuXHQgICAgXCIzNDEwMDRcIjogXCLlvr3lt57ljLpcIixcblx0ICAgIFwiMzQxMDIxXCI6IFwi5q2Z5Y6/XCIsXG5cdCAgICBcIjM0MTAyMlwiOiBcIuS8keWugeWOv1wiLFxuXHQgICAgXCIzNDEwMjNcIjogXCLpu5/ljr9cIixcblx0ICAgIFwiMzQxMDI0XCI6IFwi56WB6Zeo5Y6/XCIsXG5cdCAgICBcIjM0MTAyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDExMDBcIjogXCLmu4Hlt57luIJcIixcblx0ICAgIFwiMzQxMTAyXCI6IFwi55CF55CK5Yy6XCIsXG5cdCAgICBcIjM0MTEwM1wiOiBcIuWNl+iwr+WMulwiLFxuXHQgICAgXCIzNDExMjJcIjogXCLmnaXlronljr9cIixcblx0ICAgIFwiMzQxMTI0XCI6IFwi5YWo5qSS5Y6/XCIsXG5cdCAgICBcIjM0MTEyNVwiOiBcIuWumui/nOWOv1wiLFxuXHQgICAgXCIzNDExMjZcIjogXCLlh6TpmLPljr9cIixcblx0ICAgIFwiMzQxMTgxXCI6IFwi5aSp6ZW/5biCXCIsXG5cdCAgICBcIjM0MTE4MlwiOiBcIuaYjuWFieW4glwiLFxuXHQgICAgXCIzNDExODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxMjAwXCI6IFwi6Zic6Ziz5biCXCIsXG5cdCAgICBcIjM0MTIwMlwiOiBcIumijeW3nuWMulwiLFxuXHQgICAgXCIzNDEyMDNcIjogXCLpoo3kuJzljLpcIixcblx0ICAgIFwiMzQxMjA0XCI6IFwi6aKN5rOJ5Yy6XCIsXG5cdCAgICBcIjM0MTIyMVwiOiBcIuS4tOazieWOv1wiLFxuXHQgICAgXCIzNDEyMjJcIjogXCLlpKrlkozljr9cIixcblx0ICAgIFwiMzQxMjI1XCI6IFwi6Zic5Y2X5Y6/XCIsXG5cdCAgICBcIjM0MTIyNlwiOiBcIumijeS4iuWOv1wiLFxuXHQgICAgXCIzNDEyODJcIjogXCLnlYzpppbluIJcIixcblx0ICAgIFwiMzQxMjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTMwMFwiOiBcIuWuv+W3nuW4glwiLFxuXHQgICAgXCIzNDEzMDJcIjogXCLln4fmoaXljLpcIixcblx0ICAgIFwiMzQxMzIxXCI6IFwi56CA5bGx5Y6/XCIsXG5cdCAgICBcIjM0MTMyMlwiOiBcIuiQp+WOv1wiLFxuXHQgICAgXCIzNDEzMjNcIjogXCLngbXnkqfljr9cIixcblx0ICAgIFwiMzQxMzI0XCI6IFwi5rOX5Y6/XCIsXG5cdCAgICBcIjM0MTMyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDE0MDBcIjogXCLlt6LmuZbluIJcIixcblx0ICAgIFwiMzQxNDIxXCI6IFwi5bqQ5rGf5Y6/XCIsXG5cdCAgICBcIjM0MTQyMlwiOiBcIuaXoOS4uuWOv1wiLFxuXHQgICAgXCIzNDE0MjNcIjogXCLlkKvlsbHljr9cIixcblx0ICAgIFwiMzQxNDI0XCI6IFwi5ZKM5Y6/XCIsXG5cdCAgICBcIjM0MTUwMFwiOiBcIuWFreWuieW4glwiLFxuXHQgICAgXCIzNDE1MDJcIjogXCLph5HlronljLpcIixcblx0ICAgIFwiMzQxNTAzXCI6IFwi6KOV5a6J5Yy6XCIsXG5cdCAgICBcIjM0MTUyMVwiOiBcIuWvv+WOv1wiLFxuXHQgICAgXCIzNDE1MjJcIjogXCLpnI3pgrHljr9cIixcblx0ICAgIFwiMzQxNTIzXCI6IFwi6IiS5Z+O5Y6/XCIsXG5cdCAgICBcIjM0MTUyNFwiOiBcIumHkeWvqOWOv1wiLFxuXHQgICAgXCIzNDE1MjVcIjogXCLpnI3lsbHljr9cIixcblx0ICAgIFwiMzQxNTI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTYwMFwiOiBcIuS6s+W3nuW4glwiLFxuXHQgICAgXCIzNDE2MDJcIjogXCLosK/ln47ljLpcIixcblx0ICAgIFwiMzQxNjIxXCI6IFwi5rah6Ziz5Y6/XCIsXG5cdCAgICBcIjM0MTYyMlwiOiBcIuiSmeWfjuWOv1wiLFxuXHQgICAgXCIzNDE2MjNcIjogXCLliKnovpvljr9cIixcblx0ICAgIFwiMzQxNjI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTcwMFwiOiBcIuaxoOW3nuW4glwiLFxuXHQgICAgXCIzNDE3MDJcIjogXCLotLXmsaDljLpcIixcblx0ICAgIFwiMzQxNzIxXCI6IFwi5Lic6Iez5Y6/XCIsXG5cdCAgICBcIjM0MTcyMlwiOiBcIuefs+WPsOWOv1wiLFxuXHQgICAgXCIzNDE3MjNcIjogXCLpnZLpmLPljr9cIixcblx0ICAgIFwiMzQxNzI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTgwMFwiOiBcIuWuo+WfjuW4glwiLFxuXHQgICAgXCIzNDE4MDJcIjogXCLlrqPlt57ljLpcIixcblx0ICAgIFwiMzQxODIxXCI6IFwi6YOO5rqq5Y6/XCIsXG5cdCAgICBcIjM0MTgyMlwiOiBcIuW5v+W+t+WOv1wiLFxuXHQgICAgXCIzNDE4MjNcIjogXCLms77ljr9cIixcblx0ICAgIFwiMzQxODI0XCI6IFwi57up5rqq5Y6/XCIsXG5cdCAgICBcIjM0MTgyNVwiOiBcIuaXjOW+t+WOv1wiLFxuXHQgICAgXCIzNDE4ODFcIjogXCLlroHlm73luIJcIixcblx0ICAgIFwiMzQxODgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDAwMFwiOiBcIuemj+W7uuecgVwiLFxuXHQgICAgXCIzNTAxMDBcIjogXCLnpo/lt57luIJcIixcblx0ICAgIFwiMzUwMTAyXCI6IFwi6byT5qW85Yy6XCIsXG5cdCAgICBcIjM1MDEwM1wiOiBcIuWPsOaxn+WMulwiLFxuXHQgICAgXCIzNTAxMDRcIjogXCLku5PlsbHljLpcIixcblx0ICAgIFwiMzUwMTA1XCI6IFwi6ams5bC+5Yy6XCIsXG5cdCAgICBcIjM1MDExMVwiOiBcIuaZi+WuieWMulwiLFxuXHQgICAgXCIzNTAxMjFcIjogXCLpl73kvq/ljr9cIixcblx0ICAgIFwiMzUwMTIyXCI6IFwi6L+e5rGf5Y6/XCIsXG5cdCAgICBcIjM1MDEyM1wiOiBcIue9l+a6kOWOv1wiLFxuXHQgICAgXCIzNTAxMjRcIjogXCLpl73muIXljr9cIixcblx0ICAgIFwiMzUwMTI1XCI6IFwi5rC45rOw5Y6/XCIsXG5cdCAgICBcIjM1MDEyOFwiOiBcIuW5s+a9reWOv1wiLFxuXHQgICAgXCIzNTAxODFcIjogXCLnpo/muIXluIJcIixcblx0ICAgIFwiMzUwMTgyXCI6IFwi6ZW/5LmQ5biCXCIsXG5cdCAgICBcIjM1MDE4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTAyMDBcIjogXCLljqbpl6jluIJcIixcblx0ICAgIFwiMzUwMjAzXCI6IFwi5oCd5piO5Yy6XCIsXG5cdCAgICBcIjM1MDIwNVwiOiBcIua1t+ayp+WMulwiLFxuXHQgICAgXCIzNTAyMDZcIjogXCLmuZbph4zljLpcIixcblx0ICAgIFwiMzUwMjExXCI6IFwi6ZuG576O5Yy6XCIsXG5cdCAgICBcIjM1MDIxMlwiOiBcIuWQjOWuieWMulwiLFxuXHQgICAgXCIzNTAyMTNcIjogXCLnv5TlronljLpcIixcblx0ICAgIFwiMzUwMjE0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDMwMFwiOiBcIuiOhueUsOW4glwiLFxuXHQgICAgXCIzNTAzMDJcIjogXCLln47ljqLljLpcIixcblx0ICAgIFwiMzUwMzAzXCI6IFwi5ra15rGf5Yy6XCIsXG5cdCAgICBcIjM1MDMwNFwiOiBcIuiNlOWfjuWMulwiLFxuXHQgICAgXCIzNTAzMDVcIjogXCLnp4Dlsb/ljLpcIixcblx0ICAgIFwiMzUwMzIyXCI6IFwi5LuZ5ri45Y6/XCIsXG5cdCAgICBcIjM1MDMyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTA0MDBcIjogXCLkuInmmI7luIJcIixcblx0ICAgIFwiMzUwNDAyXCI6IFwi5qKF5YiX5Yy6XCIsXG5cdCAgICBcIjM1MDQwM1wiOiBcIuS4ieWFg+WMulwiLFxuXHQgICAgXCIzNTA0MjFcIjogXCLmmI7muqrljr9cIixcblx0ICAgIFwiMzUwNDIzXCI6IFwi5riF5rWB5Y6/XCIsXG5cdCAgICBcIjM1MDQyNFwiOiBcIuWugeWMluWOv1wiLFxuXHQgICAgXCIzNTA0MjVcIjogXCLlpKfnlLDljr9cIixcblx0ICAgIFwiMzUwNDI2XCI6IFwi5bCk5rqq5Y6/XCIsXG5cdCAgICBcIjM1MDQyN1wiOiBcIuaymeWOv1wiLFxuXHQgICAgXCIzNTA0MjhcIjogXCLlsIbkuZDljr9cIixcblx0ICAgIFwiMzUwNDI5XCI6IFwi5rOw5a6B5Y6/XCIsXG5cdCAgICBcIjM1MDQzMFwiOiBcIuW7uuWugeWOv1wiLFxuXHQgICAgXCIzNTA0ODFcIjogXCLmsLjlronluIJcIixcblx0ICAgIFwiMzUwNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDUwMFwiOiBcIuazieW3nuW4glwiLFxuXHQgICAgXCIzNTA1MDJcIjogXCLpsqTln47ljLpcIixcblx0ICAgIFwiMzUwNTAzXCI6IFwi5Liw5rO95Yy6XCIsXG5cdCAgICBcIjM1MDUwNFwiOiBcIua0m+axn+WMulwiLFxuXHQgICAgXCIzNTA1MDVcIjogXCLms4nmuK/ljLpcIixcblx0ICAgIFwiMzUwNTIxXCI6IFwi5oOg5a6J5Y6/XCIsXG5cdCAgICBcIjM1MDUyNFwiOiBcIuWuiea6quWOv1wiLFxuXHQgICAgXCIzNTA1MjVcIjogXCLmsLjmmKXljr9cIixcblx0ICAgIFwiMzUwNTI2XCI6IFwi5b635YyW5Y6/XCIsXG5cdCAgICBcIjM1MDUyN1wiOiBcIumHkemXqOWOv1wiLFxuXHQgICAgXCIzNTA1ODFcIjogXCLnn7Pni67luIJcIixcblx0ICAgIFwiMzUwNTgyXCI6IFwi5pmL5rGf5biCXCIsXG5cdCAgICBcIjM1MDU4M1wiOiBcIuWNl+WuieW4glwiLFxuXHQgICAgXCIzNTA1ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwNjAwXCI6IFwi5ryz5bee5biCXCIsXG5cdCAgICBcIjM1MDYwMlwiOiBcIuiKl+WfjuWMulwiLFxuXHQgICAgXCIzNTA2MDNcIjogXCLpvpnmlofljLpcIixcblx0ICAgIFwiMzUwNjIyXCI6IFwi5LqR6ZyE5Y6/XCIsXG5cdCAgICBcIjM1MDYyM1wiOiBcIua8s+a1puWOv1wiLFxuXHQgICAgXCIzNTA2MjRcIjogXCLor4/lronljr9cIixcblx0ICAgIFwiMzUwNjI1XCI6IFwi6ZW/5rOw5Y6/XCIsXG5cdCAgICBcIjM1MDYyNlwiOiBcIuS4nOWxseWOv1wiLFxuXHQgICAgXCIzNTA2MjdcIjogXCLljZfpnZbljr9cIixcblx0ICAgIFwiMzUwNjI4XCI6IFwi5bmz5ZKM5Y6/XCIsXG5cdCAgICBcIjM1MDYyOVwiOiBcIuWNjuWuieWOv1wiLFxuXHQgICAgXCIzNTA2ODFcIjogXCLpvpnmtbfluIJcIixcblx0ICAgIFwiMzUwNjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDcwMFwiOiBcIuWNl+W5s+W4glwiLFxuXHQgICAgXCIzNTA3MDJcIjogXCLlu7blubPljLpcIixcblx0ICAgIFwiMzUwNzIxXCI6IFwi6aG65piM5Y6/XCIsXG5cdCAgICBcIjM1MDcyMlwiOiBcIua1puWfjuWOv1wiLFxuXHQgICAgXCIzNTA3MjNcIjogXCLlhYnms73ljr9cIixcblx0ICAgIFwiMzUwNzI0XCI6IFwi5p2+5rqq5Y6/XCIsXG5cdCAgICBcIjM1MDcyNVwiOiBcIuaUv+WSjOWOv1wiLFxuXHQgICAgXCIzNTA3ODFcIjogXCLpgrXmrabluIJcIixcblx0ICAgIFwiMzUwNzgyXCI6IFwi5q2m5aS35bGx5biCXCIsXG5cdCAgICBcIjM1MDc4M1wiOiBcIuW7uueTr+W4glwiLFxuXHQgICAgXCIzNTA3ODRcIjogXCLlu7rpmLPluIJcIixcblx0ICAgIFwiMzUwNzg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDgwMFwiOiBcIum+meWyqeW4glwiLFxuXHQgICAgXCIzNTA4MDJcIjogXCLmlrDnvZfljLpcIixcblx0ICAgIFwiMzUwODIxXCI6IFwi6ZW/5rGA5Y6/XCIsXG5cdCAgICBcIjM1MDgyMlwiOiBcIuawuOWumuWOv1wiLFxuXHQgICAgXCIzNTA4MjNcIjogXCLkuIrmna3ljr9cIixcblx0ICAgIFwiMzUwODI0XCI6IFwi5q2m5bmz5Y6/XCIsXG5cdCAgICBcIjM1MDgyNVwiOiBcIui/nuWfjuWOv1wiLFxuXHQgICAgXCIzNTA4ODFcIjogXCLmvLPlubPluIJcIixcblx0ICAgIFwiMzUwODgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDkwMFwiOiBcIuWugeW+t+W4glwiLFxuXHQgICAgXCIzNTA5MDJcIjogXCLolYnln47ljLpcIixcblx0ICAgIFwiMzUwOTIxXCI6IFwi6Zye5rWm5Y6/XCIsXG5cdCAgICBcIjM1MDkyMlwiOiBcIuWPpOeUsOWOv1wiLFxuXHQgICAgXCIzNTA5MjNcIjogXCLlsY/ljZfljr9cIixcblx0ICAgIFwiMzUwOTI0XCI6IFwi5a+/5a6B5Y6/XCIsXG5cdCAgICBcIjM1MDkyNVwiOiBcIuWRqOWugeWOv1wiLFxuXHQgICAgXCIzNTA5MjZcIjogXCLmn5jojaPljr9cIixcblx0ICAgIFwiMzUwOTgxXCI6IFwi56aP5a6J5biCXCIsXG5cdCAgICBcIjM1MDk4MlwiOiBcIuemj+m8juW4glwiLFxuXHQgICAgXCIzNTA5ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwMDAwXCI6IFwi5rGf6KW/55yBXCIsXG5cdCAgICBcIjM2MDEwMFwiOiBcIuWNl+aYjOW4glwiLFxuXHQgICAgXCIzNjAxMDJcIjogXCLkuJzmuZbljLpcIixcblx0ICAgIFwiMzYwMTAzXCI6IFwi6KW/5rmW5Yy6XCIsXG5cdCAgICBcIjM2MDEwNFwiOiBcIumdkuS6keiwseWMulwiLFxuXHQgICAgXCIzNjAxMDVcIjogXCLmub7ph4zljLpcIixcblx0ICAgIFwiMzYwMTExXCI6IFwi6Z2S5bGx5rmW5Yy6XCIsXG5cdCAgICBcIjM2MDEyMVwiOiBcIuWNl+aYjOWOv1wiLFxuXHQgICAgXCIzNjAxMjJcIjogXCLmlrDlu7rljr9cIixcblx0ICAgIFwiMzYwMTIzXCI6IFwi5a6J5LmJ5Y6/XCIsXG5cdCAgICBcIjM2MDEyNFwiOiBcIui/m+i0pOWOv1wiLFxuXHQgICAgXCIzNjAxMjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwMjAwXCI6IFwi5pmv5b636ZWH5biCXCIsXG5cdCAgICBcIjM2MDIwMlwiOiBcIuaYjOaxn+WMulwiLFxuXHQgICAgXCIzNjAyMDNcIjogXCLnj6DlsbHljLpcIixcblx0ICAgIFwiMzYwMjIyXCI6IFwi5rWu5qKB5Y6/XCIsXG5cdCAgICBcIjM2MDI4MVwiOiBcIuS5kOW5s+W4glwiLFxuXHQgICAgXCIzNjAyODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwMzAwXCI6IFwi6JCN5Lmh5biCXCIsXG5cdCAgICBcIjM2MDMwMlwiOiBcIuWuiea6kOWMulwiLFxuXHQgICAgXCIzNjAzMTNcIjogXCLmuZjkuJzljLpcIixcblx0ICAgIFwiMzYwMzIxXCI6IFwi6I6y6Iqx5Y6/XCIsXG5cdCAgICBcIjM2MDMyMlwiOiBcIuS4iuagl+WOv1wiLFxuXHQgICAgXCIzNjAzMjNcIjogXCLoiqbmuqrljr9cIixcblx0ICAgIFwiMzYwMzI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDQwMFwiOiBcIuS5neaxn+W4glwiLFxuXHQgICAgXCIzNjA0MDJcIjogXCLlupDlsbHljLpcIixcblx0ICAgIFwiMzYwNDAzXCI6IFwi5rWU6Ziz5Yy6XCIsXG5cdCAgICBcIjM2MDQyMVwiOiBcIuS5neaxn+WOv1wiLFxuXHQgICAgXCIzNjA0MjNcIjogXCLmrablroHljr9cIixcblx0ICAgIFwiMzYwNDI0XCI6IFwi5L+u5rC05Y6/XCIsXG5cdCAgICBcIjM2MDQyNVwiOiBcIuawuOS/ruWOv1wiLFxuXHQgICAgXCIzNjA0MjZcIjogXCLlvrflronljr9cIixcblx0ICAgIFwiMzYwNDI3XCI6IFwi5pif5a2Q5Y6/XCIsXG5cdCAgICBcIjM2MDQyOFwiOiBcIumDveaYjOWOv1wiLFxuXHQgICAgXCIzNjA0MjlcIjogXCLmuZblj6Pljr9cIixcblx0ICAgIFwiMzYwNDMwXCI6IFwi5b2t5rO95Y6/XCIsXG5cdCAgICBcIjM2MDQ4MVwiOiBcIueRnuaYjOW4glwiLFxuXHQgICAgXCIzNjA0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwNDgzXCI6IFwi5YWx6Z2S5Z+O5biCXCIsXG5cdCAgICBcIjM2MDUwMFwiOiBcIuaWsOS9meW4glwiLFxuXHQgICAgXCIzNjA1MDJcIjogXCLmuJ3msLTljLpcIixcblx0ICAgIFwiMzYwNTIxXCI6IFwi5YiG5a6c5Y6/XCIsXG5cdCAgICBcIjM2MDUyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjA2MDBcIjogXCLpubDmva3luIJcIixcblx0ICAgIFwiMzYwNjAyXCI6IFwi5pyI5rmW5Yy6XCIsXG5cdCAgICBcIjM2MDYyMlwiOiBcIuS9meaxn+WOv1wiLFxuXHQgICAgXCIzNjA2ODFcIjogXCLotLXmuqrluIJcIixcblx0ICAgIFwiMzYwNjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDcwMFwiOiBcIui1o+W3nuW4glwiLFxuXHQgICAgXCIzNjA3MDJcIjogXCLnq6DotKHljLpcIixcblx0ICAgIFwiMzYwNzIxXCI6IFwi6LWj5Y6/XCIsXG5cdCAgICBcIjM2MDcyMlwiOiBcIuS/oeS4sOWOv1wiLFxuXHQgICAgXCIzNjA3MjNcIjogXCLlpKfkvZnljr9cIixcblx0ICAgIFwiMzYwNzI0XCI6IFwi5LiK54q55Y6/XCIsXG5cdCAgICBcIjM2MDcyNVwiOiBcIuW0h+S5ieWOv1wiLFxuXHQgICAgXCIzNjA3MjZcIjogXCLlronov5zljr9cIixcblx0ICAgIFwiMzYwNzI3XCI6IFwi6b6Z5Y2X5Y6/XCIsXG5cdCAgICBcIjM2MDcyOFwiOiBcIuWumuWNl+WOv1wiLFxuXHQgICAgXCIzNjA3MjlcIjogXCLlhajljZfljr9cIixcblx0ICAgIFwiMzYwNzMwXCI6IFwi5a6B6YO95Y6/XCIsXG5cdCAgICBcIjM2MDczMVwiOiBcIuS6jumDveWOv1wiLFxuXHQgICAgXCIzNjA3MzJcIjogXCLlhbTlm73ljr9cIixcblx0ICAgIFwiMzYwNzMzXCI6IFwi5Lya5piM5Y6/XCIsXG5cdCAgICBcIjM2MDczNFwiOiBcIuWvu+S5jOWOv1wiLFxuXHQgICAgXCIzNjA3MzVcIjogXCLnn7Pln47ljr9cIixcblx0ICAgIFwiMzYwNzgxXCI6IFwi55Ge6YeR5biCXCIsXG5cdCAgICBcIjM2MDc4MlwiOiBcIuWNl+W6t+W4glwiLFxuXHQgICAgXCIzNjA3ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwODAwXCI6IFwi5ZCJ5a6J5biCXCIsXG5cdCAgICBcIjM2MDgwMlwiOiBcIuWQieW3nuWMulwiLFxuXHQgICAgXCIzNjA4MDNcIjogXCLpnZLljp/ljLpcIixcblx0ICAgIFwiMzYwODIxXCI6IFwi5ZCJ5a6J5Y6/XCIsXG5cdCAgICBcIjM2MDgyMlwiOiBcIuWQieawtOWOv1wiLFxuXHQgICAgXCIzNjA4MjNcIjogXCLls6HmsZ/ljr9cIixcblx0ICAgIFwiMzYwODI0XCI6IFwi5paw5bmy5Y6/XCIsXG5cdCAgICBcIjM2MDgyNVwiOiBcIuawuOS4sOWOv1wiLFxuXHQgICAgXCIzNjA4MjZcIjogXCLms7Dlkozljr9cIixcblx0ICAgIFwiMzYwODI3XCI6IFwi6YGC5bed5Y6/XCIsXG5cdCAgICBcIjM2MDgyOFwiOiBcIuS4h+WuieWOv1wiLFxuXHQgICAgXCIzNjA4MjlcIjogXCLlronnpo/ljr9cIixcblx0ICAgIFwiMzYwODMwXCI6IFwi5rC45paw5Y6/XCIsXG5cdCAgICBcIjM2MDg4MVwiOiBcIuS6leWGiOWxseW4glwiLFxuXHQgICAgXCIzNjA4ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwOTAwXCI6IFwi5a6c5pil5biCXCIsXG5cdCAgICBcIjM2MDkwMlwiOiBcIuiigeW3nuWMulwiLFxuXHQgICAgXCIzNjA5MjFcIjogXCLlpYnmlrDljr9cIixcblx0ICAgIFwiMzYwOTIyXCI6IFwi5LiH6L295Y6/XCIsXG5cdCAgICBcIjM2MDkyM1wiOiBcIuS4iumrmOWOv1wiLFxuXHQgICAgXCIzNjA5MjRcIjogXCLlrpzkuLDljr9cIixcblx0ICAgIFwiMzYwOTI1XCI6IFwi6Z2W5a6J5Y6/XCIsXG5cdCAgICBcIjM2MDkyNlwiOiBcIumTnOm8k+WOv1wiLFxuXHQgICAgXCIzNjA5ODFcIjogXCLkuLDln47luIJcIixcblx0ICAgIFwiMzYwOTgyXCI6IFwi5qif5qCR5biCXCIsXG5cdCAgICBcIjM2MDk4M1wiOiBcIumrmOWuieW4glwiLFxuXHQgICAgXCIzNjA5ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYxMDAwXCI6IFwi5oqa5bee5biCXCIsXG5cdCAgICBcIjM2MTAwMlwiOiBcIuS4tOW3neWMulwiLFxuXHQgICAgXCIzNjEwMjFcIjogXCLljZfln47ljr9cIixcblx0ICAgIFwiMzYxMDIyXCI6IFwi6buO5bed5Y6/XCIsXG5cdCAgICBcIjM2MTAyM1wiOiBcIuWNl+S4sOWOv1wiLFxuXHQgICAgXCIzNjEwMjRcIjogXCLltIfku4Hljr9cIixcblx0ICAgIFwiMzYxMDI1XCI6IFwi5LmQ5a6J5Y6/XCIsXG5cdCAgICBcIjM2MTAyNlwiOiBcIuWunOm7hOWOv1wiLFxuXHQgICAgXCIzNjEwMjdcIjogXCLph5Hmuqrljr9cIixcblx0ICAgIFwiMzYxMDI4XCI6IFwi6LWE5rqq5Y6/XCIsXG5cdCAgICBcIjM2MTAyOVwiOiBcIuS4nOS5oeWOv1wiLFxuXHQgICAgXCIzNjEwMzBcIjogXCLlub/mmIzljr9cIixcblx0ICAgIFwiMzYxMDMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MTEwMFwiOiBcIuS4iumltuW4glwiLFxuXHQgICAgXCIzNjExMDJcIjogXCLkv6Hlt57ljLpcIixcblx0ICAgIFwiMzYxMTIxXCI6IFwi5LiK6aW25Y6/XCIsXG5cdCAgICBcIjM2MTEyMlwiOiBcIuW5v+S4sOWOv1wiLFxuXHQgICAgXCIzNjExMjNcIjogXCLnjonlsbHljr9cIixcblx0ICAgIFwiMzYxMTI0XCI6IFwi6ZOF5bGx5Y6/XCIsXG5cdCAgICBcIjM2MTEyNVwiOiBcIuaoquWzsOWOv1wiLFxuXHQgICAgXCIzNjExMjZcIjogXCLlvIvpmLPljr9cIixcblx0ICAgIFwiMzYxMTI3XCI6IFwi5L2Z5bmy5Y6/XCIsXG5cdCAgICBcIjM2MTEyOFwiOiBcIumEsemYs+WOv1wiLFxuXHQgICAgXCIzNjExMjlcIjogXCLkuIflubTljr9cIixcblx0ICAgIFwiMzYxMTMwXCI6IFwi5am65rqQ5Y6/XCIsXG5cdCAgICBcIjM2MTE4MVwiOiBcIuW+t+WFtOW4glwiLFxuXHQgICAgXCIzNjExODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwMDAwXCI6IFwi5bGx5Lic55yBXCIsXG5cdCAgICBcIjM3MDEwMFwiOiBcIua1juWNl+W4glwiLFxuXHQgICAgXCIzNzAxMDJcIjogXCLljobkuIvljLpcIixcblx0ICAgIFwiMzcwMTAzXCI6IFwi5biC5Lit5Yy6XCIsXG5cdCAgICBcIjM3MDEwNFwiOiBcIuankOiNq+WMulwiLFxuXHQgICAgXCIzNzAxMDVcIjogXCLlpKnmoaXljLpcIixcblx0ICAgIFwiMzcwMTEyXCI6IFwi5Y6G5Z+O5Yy6XCIsXG5cdCAgICBcIjM3MDExM1wiOiBcIumVv+a4heWMulwiLFxuXHQgICAgXCIzNzAxMjRcIjogXCLlubPpmLTljr9cIixcblx0ICAgIFwiMzcwMTI1XCI6IFwi5rWO6Ziz5Y6/XCIsXG5cdCAgICBcIjM3MDEyNlwiOiBcIuWVhuays+WOv1wiLFxuXHQgICAgXCIzNzAxODFcIjogXCLnq6DkuJjluIJcIixcblx0ICAgIFwiMzcwMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDIwMFwiOiBcIumdkuWym+W4glwiLFxuXHQgICAgXCIzNzAyMDJcIjogXCLluILljZfljLpcIixcblx0ICAgIFwiMzcwMjAzXCI6IFwi5biC5YyX5Yy6XCIsXG5cdCAgICBcIjM3MDIxMVwiOiBcIum7hOWym+WMulwiLFxuXHQgICAgXCIzNzAyMTJcIjogXCLltILlsbHljLpcIixcblx0ICAgIFwiMzcwMjEzXCI6IFwi5p2O5rKn5Yy6XCIsXG5cdCAgICBcIjM3MDIxNFwiOiBcIuWfjumYs+WMulwiLFxuXHQgICAgXCIzNzAyODFcIjogXCLog7blt57luIJcIixcblx0ICAgIFwiMzcwMjgyXCI6IFwi5Y2z5aKo5biCXCIsXG5cdCAgICBcIjM3MDI4M1wiOiBcIuW5s+W6puW4glwiLFxuXHQgICAgXCIzNzAyODVcIjogXCLojrHopb/luIJcIixcblx0ICAgIFwiMzcwMjg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDMwMFwiOiBcIua3hOWNmuW4glwiLFxuXHQgICAgXCIzNzAzMDJcIjogXCLmt4Tlt53ljLpcIixcblx0ICAgIFwiMzcwMzAzXCI6IFwi5byg5bqX5Yy6XCIsXG5cdCAgICBcIjM3MDMwNFwiOiBcIuWNmuWxseWMulwiLFxuXHQgICAgXCIzNzAzMDVcIjogXCLkuLTmt4TljLpcIixcblx0ICAgIFwiMzcwMzA2XCI6IFwi5ZGo5p2R5Yy6XCIsXG5cdCAgICBcIjM3MDMyMVwiOiBcIuahk+WPsOWOv1wiLFxuXHQgICAgXCIzNzAzMjJcIjogXCLpq5jpnZLljr9cIixcblx0ICAgIFwiMzcwMzIzXCI6IFwi5rKC5rqQ5Y6/XCIsXG5cdCAgICBcIjM3MDMyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzA0MDBcIjogXCLmnqPluoTluIJcIixcblx0ICAgIFwiMzcwNDAyXCI6IFwi5biC5Lit5Yy6XCIsXG5cdCAgICBcIjM3MDQwM1wiOiBcIuiWm+WfjuWMulwiLFxuXHQgICAgXCIzNzA0MDRcIjogXCLls4Tln47ljLpcIixcblx0ICAgIFwiMzcwNDA1XCI6IFwi5Y+w5YS/5bqE5Yy6XCIsXG5cdCAgICBcIjM3MDQwNlwiOiBcIuWxseS6reWMulwiLFxuXHQgICAgXCIzNzA0ODFcIjogXCLmu5Xlt57luIJcIixcblx0ICAgIFwiMzcwNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDUwMFwiOiBcIuS4nOiQpeW4glwiLFxuXHQgICAgXCIzNzA1MDJcIjogXCLkuJzokKXljLpcIixcblx0ICAgIFwiMzcwNTAzXCI6IFwi5rKz5Y+j5Yy6XCIsXG5cdCAgICBcIjM3MDUyMVwiOiBcIuWepuWIqeWOv1wiLFxuXHQgICAgXCIzNzA1MjJcIjogXCLliKnmtKXljr9cIixcblx0ICAgIFwiMzcwNTIzXCI6IFwi5bm/6aW25Y6/XCIsXG5cdCAgICBcIjM3MDU5MVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzA2MDBcIjogXCLng5/lj7DluIJcIixcblx0ICAgIFwiMzcwNjAyXCI6IFwi6Iqd572Y5Yy6XCIsXG5cdCAgICBcIjM3MDYxMVwiOiBcIuemj+WxseWMulwiLFxuXHQgICAgXCIzNzA2MTJcIjogXCLniZ/lubPljLpcIixcblx0ICAgIFwiMzcwNjEzXCI6IFwi6I6x5bGx5Yy6XCIsXG5cdCAgICBcIjM3MDYzNFwiOiBcIumVv+Wym+WOv1wiLFxuXHQgICAgXCIzNzA2ODFcIjogXCLpvpnlj6PluIJcIixcblx0ICAgIFwiMzcwNjgyXCI6IFwi6I6x6Ziz5biCXCIsXG5cdCAgICBcIjM3MDY4M1wiOiBcIuiOseW3nuW4glwiLFxuXHQgICAgXCIzNzA2ODRcIjogXCLok6zojrHluIJcIixcblx0ICAgIFwiMzcwNjg1XCI6IFwi5oub6L+c5biCXCIsXG5cdCAgICBcIjM3MDY4NlwiOiBcIuaglumcnuW4glwiLFxuXHQgICAgXCIzNzA2ODdcIjogXCLmtbfpmLPluIJcIixcblx0ICAgIFwiMzcwNjg4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDcwMFwiOiBcIua9jeWdiuW4glwiLFxuXHQgICAgXCIzNzA3MDJcIjogXCLmvY3ln47ljLpcIixcblx0ICAgIFwiMzcwNzAzXCI6IFwi5a+S5Lqt5Yy6XCIsXG5cdCAgICBcIjM3MDcwNFwiOiBcIuWdiuWtkOWMulwiLFxuXHQgICAgXCIzNzA3MDVcIjogXCLlpY7mlofljLpcIixcblx0ICAgIFwiMzcwNzI0XCI6IFwi5Li05pyQ5Y6/XCIsXG5cdCAgICBcIjM3MDcyNVwiOiBcIuaYjOS5kOWOv1wiLFxuXHQgICAgXCIzNzA3ODFcIjogXCLpnZLlt57luIJcIixcblx0ICAgIFwiMzcwNzgyXCI6IFwi6K+45Z+O5biCXCIsXG5cdCAgICBcIjM3MDc4M1wiOiBcIuWvv+WFieW4glwiLFxuXHQgICAgXCIzNzA3ODRcIjogXCLlronkuJjluIJcIixcblx0ICAgIFwiMzcwNzg1XCI6IFwi6auY5a+G5biCXCIsXG5cdCAgICBcIjM3MDc4NlwiOiBcIuaYjOmCkeW4glwiLFxuXHQgICAgXCIzNzA3ODdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwODAwXCI6IFwi5rWO5a6B5biCXCIsXG5cdCAgICBcIjM3MDgwMlwiOiBcIuW4guS4reWMulwiLFxuXHQgICAgXCIzNzA4MTFcIjogXCLku7vln47ljLpcIixcblx0ICAgIFwiMzcwODI2XCI6IFwi5b6u5bGx5Y6/XCIsXG5cdCAgICBcIjM3MDgyN1wiOiBcIumxvOWPsOWOv1wiLFxuXHQgICAgXCIzNzA4MjhcIjogXCLph5HkuaHljr9cIixcblx0ICAgIFwiMzcwODI5XCI6IFwi5ZiJ56Wl5Y6/XCIsXG5cdCAgICBcIjM3MDgzMFwiOiBcIuaxtuS4iuWOv1wiLFxuXHQgICAgXCIzNzA4MzFcIjogXCLms5fmsLTljr9cIixcblx0ICAgIFwiMzcwODMyXCI6IFwi5qKB5bGx5Y6/XCIsXG5cdCAgICBcIjM3MDg4MVwiOiBcIuabsumYnOW4glwiLFxuXHQgICAgXCIzNzA4ODJcIjogXCLlhZblt57luIJcIixcblx0ICAgIFwiMzcwODgzXCI6IFwi6YK55Z+O5biCXCIsXG5cdCAgICBcIjM3MDg4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzA5MDBcIjogXCLms7DlronluIJcIixcblx0ICAgIFwiMzcwOTAyXCI6IFwi5rOw5bGx5Yy6XCIsXG5cdCAgICBcIjM3MDkwM1wiOiBcIuWyseWys+WMulwiLFxuXHQgICAgXCIzNzA5MjFcIjogXCLlroHpmLPljr9cIixcblx0ICAgIFwiMzcwOTIzXCI6IFwi5Lic5bmz5Y6/XCIsXG5cdCAgICBcIjM3MDk4MlwiOiBcIuaWsOazsOW4glwiLFxuXHQgICAgXCIzNzA5ODNcIjogXCLogqXln47luIJcIixcblx0ICAgIFwiMzcwOTg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTAwMFwiOiBcIuWogea1t+W4glwiLFxuXHQgICAgXCIzNzEwMDJcIjogXCLnjq/nv6DljLpcIixcblx0ICAgIFwiMzcxMDgxXCI6IFwi5paH55m75biCXCIsXG5cdCAgICBcIjM3MTA4MlwiOiBcIuiNo+aIkOW4glwiLFxuXHQgICAgXCIzNzEwODNcIjogXCLkubPlsbHluIJcIixcblx0ICAgIFwiMzcxMDg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTEwMFwiOiBcIuaXpeeFp+W4glwiLFxuXHQgICAgXCIzNzExMDJcIjogXCLkuJzmuK/ljLpcIixcblx0ICAgIFwiMzcxMTAzXCI6IFwi5bKa5bGx5Yy6XCIsXG5cdCAgICBcIjM3MTEyMVwiOiBcIuS6lOiOsuWOv1wiLFxuXHQgICAgXCIzNzExMjJcIjogXCLojpLljr9cIixcblx0ICAgIFwiMzcxMTIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTIwMFwiOiBcIuiOseiKnOW4glwiLFxuXHQgICAgXCIzNzEyMDJcIjogXCLojrHln47ljLpcIixcblx0ICAgIFwiMzcxMjAzXCI6IFwi6ZKi5Z+O5Yy6XCIsXG5cdCAgICBcIjM3MTIwNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzEzMDBcIjogXCLkuLTmsoLluIJcIixcblx0ICAgIFwiMzcxMzAyXCI6IFwi5YWw5bGx5Yy6XCIsXG5cdCAgICBcIjM3MTMxMVwiOiBcIue9l+W6hOWMulwiLFxuXHQgICAgXCIzNzEzMTJcIjogXCLmsrPkuJzljLpcIixcblx0ICAgIFwiMzcxMzIxXCI6IFwi5rKC5Y2X5Y6/XCIsXG5cdCAgICBcIjM3MTMyMlwiOiBcIumDr+WfjuWOv1wiLFxuXHQgICAgXCIzNzEzMjNcIjogXCLmsoLmsLTljr9cIixcblx0ICAgIFwiMzcxMzI0XCI6IFwi6IuN5bGx5Y6/XCIsXG5cdCAgICBcIjM3MTMyNVwiOiBcIui0ueWOv1wiLFxuXHQgICAgXCIzNzEzMjZcIjogXCLlubPpgpHljr9cIixcblx0ICAgIFwiMzcxMzI3XCI6IFwi6I6S5Y2X5Y6/XCIsXG5cdCAgICBcIjM3MTMyOFwiOiBcIuiSmemYtOWOv1wiLFxuXHQgICAgXCIzNzEzMjlcIjogXCLkuLTmsq3ljr9cIixcblx0ICAgIFwiMzcxMzMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTQwMFwiOiBcIuW+t+W3nuW4glwiLFxuXHQgICAgXCIzNzE0MDJcIjogXCLlvrfln47ljLpcIixcblx0ICAgIFwiMzcxNDIxXCI6IFwi6Zm15Y6/XCIsXG5cdCAgICBcIjM3MTQyMlwiOiBcIuWugea0peWOv1wiLFxuXHQgICAgXCIzNzE0MjNcIjogXCLluobkupHljr9cIixcblx0ICAgIFwiMzcxNDI0XCI6IFwi5Li06YKR5Y6/XCIsXG5cdCAgICBcIjM3MTQyNVwiOiBcIum9kOays+WOv1wiLFxuXHQgICAgXCIzNzE0MjZcIjogXCLlubPljp/ljr9cIixcblx0ICAgIFwiMzcxNDI3XCI6IFwi5aSP5rSl5Y6/XCIsXG5cdCAgICBcIjM3MTQyOFwiOiBcIuatpuWfjuWOv1wiLFxuXHQgICAgXCIzNzE0ODFcIjogXCLkuZDpmbXluIJcIixcblx0ICAgIFwiMzcxNDgyXCI6IFwi56a55Z+O5biCXCIsXG5cdCAgICBcIjM3MTQ4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzE1MDBcIjogXCLogYrln47luIJcIixcblx0ICAgIFwiMzcxNTAyXCI6IFwi5Lic5piM5bqc5Yy6XCIsXG5cdCAgICBcIjM3MTUyMVwiOiBcIumYs+iwt+WOv1wiLFxuXHQgICAgXCIzNzE1MjJcIjogXCLojpjljr9cIixcblx0ICAgIFwiMzcxNTIzXCI6IFwi6IyM5bmz5Y6/XCIsXG5cdCAgICBcIjM3MTUyNFwiOiBcIuS4nOmYv+WOv1wiLFxuXHQgICAgXCIzNzE1MjVcIjogXCLlhqDljr9cIixcblx0ICAgIFwiMzcxNTI2XCI6IFwi6auY5ZSQ5Y6/XCIsXG5cdCAgICBcIjM3MTU4MVwiOiBcIuS4tOa4heW4glwiLFxuXHQgICAgXCIzNzE1ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxNjAwXCI6IFwi5ruo5bee5biCXCIsXG5cdCAgICBcIjM3MTYwMlwiOiBcIua7qOWfjuWMulwiLFxuXHQgICAgXCIzNzE2MjFcIjogXCLmg6DmsJHljr9cIixcblx0ICAgIFwiMzcxNjIyXCI6IFwi6Ziz5L+h5Y6/XCIsXG5cdCAgICBcIjM3MTYyM1wiOiBcIuaXoOajo+WOv1wiLFxuXHQgICAgXCIzNzE2MjRcIjogXCLmsr7ljJbljr9cIixcblx0ICAgIFwiMzcxNjI1XCI6IFwi5Y2a5YW05Y6/XCIsXG5cdCAgICBcIjM3MTYyNlwiOiBcIumCueW5s+WOv1wiLFxuXHQgICAgXCIzNzE2MjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxNzAwXCI6IFwi6I+P5rO95biCXCIsXG5cdCAgICBcIjM3MTcwMlwiOiBcIueJoeS4ueWMulwiLFxuXHQgICAgXCIzNzE3MjFcIjogXCLmm7nljr9cIixcblx0ICAgIFwiMzcxNzIyXCI6IFwi5Y2V5Y6/XCIsXG5cdCAgICBcIjM3MTcyM1wiOiBcIuaIkOatpuWOv1wiLFxuXHQgICAgXCIzNzE3MjRcIjogXCLlt6jph47ljr9cIixcblx0ICAgIFwiMzcxNzI1XCI6IFwi6YOT5Z+O5Y6/XCIsXG5cdCAgICBcIjM3MTcyNlwiOiBcIumEhOWfjuWOv1wiLFxuXHQgICAgXCIzNzE3MjdcIjogXCLlrprpmbbljr9cIixcblx0ICAgIFwiMzcxNzI4XCI6IFwi5Lic5piO5Y6/XCIsXG5cdCAgICBcIjM3MTcyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTAwMDBcIjogXCLmsrPljZfnnIFcIixcblx0ICAgIFwiNDEwMTAwXCI6IFwi6YOR5bee5biCXCIsXG5cdCAgICBcIjQxMDEwMlwiOiBcIuS4reWOn+WMulwiLFxuXHQgICAgXCI0MTAxMDNcIjogXCLkuozkuIPljLpcIixcblx0ICAgIFwiNDEwMTA0XCI6IFwi566h5Z+O5Zue5peP5Yy6XCIsXG5cdCAgICBcIjQxMDEwNVwiOiBcIumHkeawtOWMulwiLFxuXHQgICAgXCI0MTAxMDZcIjogXCLkuIrooZfljLpcIixcblx0ICAgIFwiNDEwMTA4XCI6IFwi5oOg5rWO5Yy6XCIsXG5cdCAgICBcIjQxMDEyMlwiOiBcIuS4reeJn+WOv1wiLFxuXHQgICAgXCI0MTAxODFcIjogXCLlt6nkuYnluIJcIixcblx0ICAgIFwiNDEwMTgyXCI6IFwi6I2l6Ziz5biCXCIsXG5cdCAgICBcIjQxMDE4M1wiOiBcIuaWsOWvhuW4glwiLFxuXHQgICAgXCI0MTAxODRcIjogXCLmlrDpg5HluIJcIixcblx0ICAgIFwiNDEwMTg1XCI6IFwi55m75bCB5biCXCIsXG5cdCAgICBcIjQxMDE4OFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTAyMDBcIjogXCLlvIDlsIHluIJcIixcblx0ICAgIFwiNDEwMjAyXCI6IFwi6b6Z5Lqt5Yy6XCIsXG5cdCAgICBcIjQxMDIwM1wiOiBcIumhuuays+WbnuaXj+WMulwiLFxuXHQgICAgXCI0MTAyMDRcIjogXCLpvJPmpbzljLpcIixcblx0ICAgIFwiNDEwMjA1XCI6IFwi56a5546L5Y+w5Yy6XCIsXG5cdCAgICBcIjQxMDIxMVwiOiBcIumHkeaYjuWMulwiLFxuXHQgICAgXCI0MTAyMjFcIjogXCLmnZ7ljr9cIixcblx0ICAgIFwiNDEwMjIyXCI6IFwi6YCa6K645Y6/XCIsXG5cdCAgICBcIjQxMDIyM1wiOiBcIuWwieawj+WOv1wiLFxuXHQgICAgXCI0MTAyMjRcIjogXCLlvIDlsIHljr9cIixcblx0ICAgIFwiNDEwMjI1XCI6IFwi5YWw6ICD5Y6/XCIsXG5cdCAgICBcIjQxMDIyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTAzMDBcIjogXCLmtJvpmLPluIJcIixcblx0ICAgIFwiNDEwMzAyXCI6IFwi6ICB5Z+O5Yy6XCIsXG5cdCAgICBcIjQxMDMwM1wiOiBcIuilv+W3peWMulwiLFxuXHQgICAgXCI0MTAzMDRcIjogXCLngI3msrPlm57ml4/ljLpcIixcblx0ICAgIFwiNDEwMzA1XCI6IFwi5ran6KW/5Yy6XCIsXG5cdCAgICBcIjQxMDMwNlwiOiBcIuWQieWIqeWMulwiLFxuXHQgICAgXCI0MTAzMDdcIjogXCLmtJvpvpnljLpcIixcblx0ICAgIFwiNDEwMzIyXCI6IFwi5a2f5rSl5Y6/XCIsXG5cdCAgICBcIjQxMDMyM1wiOiBcIuaWsOWuieWOv1wiLFxuXHQgICAgXCI0MTAzMjRcIjogXCLmoL7lt53ljr9cIixcblx0ICAgIFwiNDEwMzI1XCI6IFwi5bWp5Y6/XCIsXG5cdCAgICBcIjQxMDMyNlwiOiBcIuaxnemYs+WOv1wiLFxuXHQgICAgXCI0MTAzMjdcIjogXCLlrpzpmLPljr9cIixcblx0ICAgIFwiNDEwMzI4XCI6IFwi5rSb5a6B5Y6/XCIsXG5cdCAgICBcIjQxMDMyOVwiOiBcIuS8iuW3neWOv1wiLFxuXHQgICAgXCI0MTAzODFcIjogXCLlgYPluIjluIJcIixcblx0ICAgIFwiNDEwNDAwXCI6IFwi5bmz6aG25bGx5biCXCIsXG5cdCAgICBcIjQxMDQwMlwiOiBcIuaWsOWNjuWMulwiLFxuXHQgICAgXCI0MTA0MDNcIjogXCLljavkuJzljLpcIixcblx0ICAgIFwiNDEwNDA0XCI6IFwi55+z6b6Z5Yy6XCIsXG5cdCAgICBcIjQxMDQxMVwiOiBcIua5m+ays+WMulwiLFxuXHQgICAgXCI0MTA0MjFcIjogXCLlrp3kuLDljr9cIixcblx0ICAgIFwiNDEwNDIyXCI6IFwi5Y+25Y6/XCIsXG5cdCAgICBcIjQxMDQyM1wiOiBcIumygeWxseWOv1wiLFxuXHQgICAgXCI0MTA0MjVcIjogXCLpg4/ljr9cIixcblx0ICAgIFwiNDEwNDgxXCI6IFwi6Iie6ZKi5biCXCIsXG5cdCAgICBcIjQxMDQ4MlwiOiBcIuaxneW3nuW4glwiLFxuXHQgICAgXCI0MTA0ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwNTAwXCI6IFwi5a6J6Ziz5biCXCIsXG5cdCAgICBcIjQxMDUwMlwiOiBcIuaWh+WzsOWMulwiLFxuXHQgICAgXCI0MTA1MDNcIjogXCLljJflhbPljLpcIixcblx0ICAgIFwiNDEwNTA1XCI6IFwi5q636YO95Yy6XCIsXG5cdCAgICBcIjQxMDUwNlwiOiBcIum+meWuieWMulwiLFxuXHQgICAgXCI0MTA1MjJcIjogXCLlronpmLPljr9cIixcblx0ICAgIFwiNDEwNTIzXCI6IFwi5rGk6Zi05Y6/XCIsXG5cdCAgICBcIjQxMDUyNlwiOiBcIua7keWOv1wiLFxuXHQgICAgXCI0MTA1MjdcIjogXCLlhoXpu4Tljr9cIixcblx0ICAgIFwiNDEwNTgxXCI6IFwi5p6X5bee5biCXCIsXG5cdCAgICBcIjQxMDU4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTA2MDBcIjogXCLpuaTlo4HluIJcIixcblx0ICAgIFwiNDEwNjAyXCI6IFwi6bmk5bGx5Yy6XCIsXG5cdCAgICBcIjQxMDYwM1wiOiBcIuWxseWfjuWMulwiLFxuXHQgICAgXCI0MTA2MTFcIjogXCLmt4fmu6jljLpcIixcblx0ICAgIFwiNDEwNjIxXCI6IFwi5rWa5Y6/XCIsXG5cdCAgICBcIjQxMDYyMlwiOiBcIua3h+WOv1wiLFxuXHQgICAgXCI0MTA2MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwNzAwXCI6IFwi5paw5Lmh5biCXCIsXG5cdCAgICBcIjQxMDcwMlwiOiBcIue6ouaXl+WMulwiLFxuXHQgICAgXCI0MTA3MDNcIjogXCLljavmu6jljLpcIixcblx0ICAgIFwiNDEwNzA0XCI6IFwi5Yek5rOJ5Yy6XCIsXG5cdCAgICBcIjQxMDcxMVwiOiBcIueJp+mHjuWMulwiLFxuXHQgICAgXCI0MTA3MjFcIjogXCLmlrDkuaHljr9cIixcblx0ICAgIFwiNDEwNzI0XCI6IFwi6I635ZiJ5Y6/XCIsXG5cdCAgICBcIjQxMDcyNVwiOiBcIuWOn+mYs+WOv1wiLFxuXHQgICAgXCI0MTA3MjZcIjogXCLlu7bmtKXljr9cIixcblx0ICAgIFwiNDEwNzI3XCI6IFwi5bCB5LiY5Y6/XCIsXG5cdCAgICBcIjQxMDcyOFwiOiBcIumVv+Weo+WOv1wiLFxuXHQgICAgXCI0MTA3ODFcIjogXCLljavovonluIJcIixcblx0ICAgIFwiNDEwNzgyXCI6IFwi6L6J5Y6/5biCXCIsXG5cdCAgICBcIjQxMDc4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTA4MDBcIjogXCLnhKbkvZzluIJcIixcblx0ICAgIFwiNDEwODAyXCI6IFwi6Kej5pS+5Yy6XCIsXG5cdCAgICBcIjQxMDgwM1wiOiBcIuS4reermeWMulwiLFxuXHQgICAgXCI0MTA4MDRcIjogXCLpqazmnZHljLpcIixcblx0ICAgIFwiNDEwODExXCI6IFwi5bGx6Ziz5Yy6XCIsXG5cdCAgICBcIjQxMDgyMVwiOiBcIuS/ruatpuWOv1wiLFxuXHQgICAgXCI0MTA4MjJcIjogXCLljZrniLHljr9cIixcblx0ICAgIFwiNDEwODIzXCI6IFwi5q2m6Zmf5Y6/XCIsXG5cdCAgICBcIjQxMDgyNVwiOiBcIua4qeWOv1wiLFxuXHQgICAgXCI0MTA4ODFcIjogXCLmtY7mupDluIJcIixcblx0ICAgIFwiNDEwODgyXCI6IFwi5rKB6Ziz5biCXCIsXG5cdCAgICBcIjQxMDg4M1wiOiBcIuWtn+W3nuW4glwiLFxuXHQgICAgXCI0MTA4ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwOTAwXCI6IFwi5r+u6Ziz5biCXCIsXG5cdCAgICBcIjQxMDkwMlwiOiBcIuWNjum+meWMulwiLFxuXHQgICAgXCI0MTA5MjJcIjogXCLmuIXkuLDljr9cIixcblx0ICAgIFwiNDEwOTIzXCI6IFwi5Y2X5LmQ5Y6/XCIsXG5cdCAgICBcIjQxMDkyNlwiOiBcIuiMg+WOv1wiLFxuXHQgICAgXCI0MTA5MjdcIjogXCLlj7DliY3ljr9cIixcblx0ICAgIFwiNDEwOTI4XCI6IFwi5r+u6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMDkyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTEwMDBcIjogXCLorrjmmIzluIJcIixcblx0ICAgIFwiNDExMDAyXCI6IFwi6a2P6YO95Yy6XCIsXG5cdCAgICBcIjQxMTAyM1wiOiBcIuiuuOaYjOWOv1wiLFxuXHQgICAgXCI0MTEwMjRcIjogXCLphKLpmbXljr9cIixcblx0ICAgIFwiNDExMDI1XCI6IFwi6KWE5Z+O5Y6/XCIsXG5cdCAgICBcIjQxMTA4MVwiOiBcIuemueW3nuW4glwiLFxuXHQgICAgXCI0MTEwODJcIjogXCLplb/okZvluIJcIixcblx0ICAgIFwiNDExMDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTEwMFwiOiBcIua8r+ays+W4glwiLFxuXHQgICAgXCI0MTExMDJcIjogXCLmupDmsYfljLpcIixcblx0ICAgIFwiNDExMTAzXCI6IFwi6YO+5Z+O5Yy6XCIsXG5cdCAgICBcIjQxMTEwNFwiOiBcIuWPrOmZteWMulwiLFxuXHQgICAgXCI0MTExMjFcIjogXCLoiJ7pmLPljr9cIixcblx0ICAgIFwiNDExMTIyXCI6IFwi5Li06aKN5Y6/XCIsXG5cdCAgICBcIjQxMTEyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTEyMDBcIjogXCLkuInpl6jls6HluIJcIixcblx0ICAgIFwiNDExMjAyXCI6IFwi5rmW5ruo5Yy6XCIsXG5cdCAgICBcIjQxMTIyMVwiOiBcIua4keaxoOWOv1wiLFxuXHQgICAgXCI0MTEyMjJcIjogXCLpmZXljr9cIixcblx0ICAgIFwiNDExMjI0XCI6IFwi5Y2i5rCP5Y6/XCIsXG5cdCAgICBcIjQxMTI4MVwiOiBcIuS5iemprOW4glwiLFxuXHQgICAgXCI0MTEyODJcIjogXCLngbXlrp3luIJcIixcblx0ICAgIFwiNDExMjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTMwMFwiOiBcIuWNl+mYs+W4glwiLFxuXHQgICAgXCI0MTEzMDJcIjogXCLlrpvln47ljLpcIixcblx0ICAgIFwiNDExMzAzXCI6IFwi5Y2n6b6Z5Yy6XCIsXG5cdCAgICBcIjQxMTMyMVwiOiBcIuWNl+WPrOWOv1wiLFxuXHQgICAgXCI0MTEzMjJcIjogXCLmlrnln47ljr9cIixcblx0ICAgIFwiNDExMzIzXCI6IFwi6KW/5bOh5Y6/XCIsXG5cdCAgICBcIjQxMTMyNFwiOiBcIumVh+W5s+WOv1wiLFxuXHQgICAgXCI0MTEzMjVcIjogXCLlhoXkuaHljr9cIixcblx0ICAgIFwiNDExMzI2XCI6IFwi5reF5bed5Y6/XCIsXG5cdCAgICBcIjQxMTMyN1wiOiBcIuekvuaXl+WOv1wiLFxuXHQgICAgXCI0MTEzMjhcIjogXCLllJDmsrPljr9cIixcblx0ICAgIFwiNDExMzI5XCI6IFwi5paw6YeO5Y6/XCIsXG5cdCAgICBcIjQxMTMzMFwiOiBcIuahkOafj+WOv1wiLFxuXHQgICAgXCI0MTEzODFcIjogXCLpgpPlt57luIJcIixcblx0ICAgIFwiNDExMzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTQwMFwiOiBcIuWVhuS4mOW4glwiLFxuXHQgICAgXCI0MTE0MDJcIjogXCLmooHlm63ljLpcIixcblx0ICAgIFwiNDExNDAzXCI6IFwi552i6Ziz5Yy6XCIsXG5cdCAgICBcIjQxMTQyMVwiOiBcIuawkeadg+WOv1wiLFxuXHQgICAgXCI0MTE0MjJcIjogXCLnnaLljr9cIixcblx0ICAgIFwiNDExNDIzXCI6IFwi5a6B6Zm15Y6/XCIsXG5cdCAgICBcIjQxMTQyNFwiOiBcIuafmOWfjuWOv1wiLFxuXHQgICAgXCI0MTE0MjVcIjogXCLomZ7ln47ljr9cIixcblx0ICAgIFwiNDExNDI2XCI6IFwi5aSP6YKR5Y6/XCIsXG5cdCAgICBcIjQxMTQ4MVwiOiBcIuawuOWfjuW4glwiLFxuXHQgICAgXCI0MTE0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExNTAwXCI6IFwi5L+h6Ziz5biCXCIsXG5cdCAgICBcIjQxMTUwMlwiOiBcIua1ieays+WMulwiLFxuXHQgICAgXCI0MTE1MDNcIjogXCLlubPmoaXljLpcIixcblx0ICAgIFwiNDExNTIxXCI6IFwi572X5bGx5Y6/XCIsXG5cdCAgICBcIjQxMTUyMlwiOiBcIuWFieWxseWOv1wiLFxuXHQgICAgXCI0MTE1MjNcIjogXCLmlrDljr9cIixcblx0ICAgIFwiNDExNTI0XCI6IFwi5ZWG5Z+O5Y6/XCIsXG5cdCAgICBcIjQxMTUyNVwiOiBcIuWbuuWni+WOv1wiLFxuXHQgICAgXCI0MTE1MjZcIjogXCLmvaLlt53ljr9cIixcblx0ICAgIFwiNDExNTI3XCI6IFwi5reu5ruo5Y6/XCIsXG5cdCAgICBcIjQxMTUyOFwiOiBcIuaBr+WOv1wiLFxuXHQgICAgXCI0MTE1MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExNjAwXCI6IFwi5ZGo5Y+j5biCXCIsXG5cdCAgICBcIjQxMTYwMlwiOiBcIuW3neaxh+WMulwiLFxuXHQgICAgXCI0MTE2MjFcIjogXCLmibbmsp/ljr9cIixcblx0ICAgIFwiNDExNjIyXCI6IFwi6KW/5Y2O5Y6/XCIsXG5cdCAgICBcIjQxMTYyM1wiOiBcIuWVhuawtOWOv1wiLFxuXHQgICAgXCI0MTE2MjRcIjogXCLmsojkuJjljr9cIixcblx0ICAgIFwiNDExNjI1XCI6IFwi6YO45Z+O5Y6/XCIsXG5cdCAgICBcIjQxMTYyNlwiOiBcIua3rumYs+WOv1wiLFxuXHQgICAgXCI0MTE2MjdcIjogXCLlpKrlurfljr9cIixcblx0ICAgIFwiNDExNjI4XCI6IFwi6bm/6YKR5Y6/XCIsXG5cdCAgICBcIjQxMTY4MVwiOiBcIumhueWfjuW4glwiLFxuXHQgICAgXCI0MTE2ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExNzAwXCI6IFwi6am76ams5bqX5biCXCIsXG5cdCAgICBcIjQxMTcwMlwiOiBcIumpv+WfjuWMulwiLFxuXHQgICAgXCI0MTE3MjFcIjogXCLopb/lubPljr9cIixcblx0ICAgIFwiNDExNzIyXCI6IFwi5LiK6JSh5Y6/XCIsXG5cdCAgICBcIjQxMTcyM1wiOiBcIuW5s+iIhuWOv1wiLFxuXHQgICAgXCI0MTE3MjRcIjogXCLmraPpmLPljr9cIixcblx0ICAgIFwiNDExNzI1XCI6IFwi56Gu5bGx5Y6/XCIsXG5cdCAgICBcIjQxMTcyNlwiOiBcIuazjOmYs+WOv1wiLFxuXHQgICAgXCI0MTE3MjdcIjogXCLmsZ3ljZfljr9cIixcblx0ICAgIFwiNDExNzI4XCI6IFwi6YGC5bmz5Y6/XCIsXG5cdCAgICBcIjQxMTcyOVwiOiBcIuaWsOiUoeWOv1wiLFxuXHQgICAgXCI0MTE3MzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwMDAwXCI6IFwi5rmW5YyX55yBXCIsXG5cdCAgICBcIjQyMDEwMFwiOiBcIuatpuaxieW4glwiLFxuXHQgICAgXCI0MjAxMDJcIjogXCLmsZ/lsrjljLpcIixcblx0ICAgIFwiNDIwMTAzXCI6IFwi5rGf5rGJ5Yy6XCIsXG5cdCAgICBcIjQyMDEwNFwiOiBcIuehmuWPo+WMulwiLFxuXHQgICAgXCI0MjAxMDVcIjogXCLmsYnpmLPljLpcIixcblx0ICAgIFwiNDIwMTA2XCI6IFwi5q2m5piM5Yy6XCIsXG5cdCAgICBcIjQyMDEwN1wiOiBcIumdkuWxseWMulwiLFxuXHQgICAgXCI0MjAxMTFcIjogXCLmtKrlsbHljLpcIixcblx0ICAgIFwiNDIwMTEyXCI6IFwi5Lic6KW/5rmW5Yy6XCIsXG5cdCAgICBcIjQyMDExM1wiOiBcIuaxieWNl+WMulwiLFxuXHQgICAgXCI0MjAxMTRcIjogXCLolKHnlLjljLpcIixcblx0ICAgIFwiNDIwMTE1XCI6IFwi5rGf5aSP5Yy6XCIsXG5cdCAgICBcIjQyMDExNlwiOiBcIum7hOmZguWMulwiLFxuXHQgICAgXCI0MjAxMTdcIjogXCLmlrDmtLLljLpcIixcblx0ICAgIFwiNDIwMTE4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDIwMFwiOiBcIum7hOefs+W4glwiLFxuXHQgICAgXCI0MjAyMDJcIjogXCLpu4Tnn7PmuK/ljLpcIixcblx0ICAgIFwiNDIwMjAzXCI6IFwi6KW/5aGe5bGx5Yy6XCIsXG5cdCAgICBcIjQyMDIwNFwiOiBcIuS4i+mZhuWMulwiLFxuXHQgICAgXCI0MjAyMDVcIjogXCLpk4HlsbHljLpcIixcblx0ICAgIFwiNDIwMjIyXCI6IFwi6Ziz5paw5Y6/XCIsXG5cdCAgICBcIjQyMDI4MVwiOiBcIuWkp+WGtuW4glwiLFxuXHQgICAgXCI0MjAyODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwMzAwXCI6IFwi5Y2B5aCw5biCXCIsXG5cdCAgICBcIjQyMDMwMlwiOiBcIuiMheeureWMulwiLFxuXHQgICAgXCI0MjAzMDNcIjogXCLlvKDmub7ljLpcIixcblx0ICAgIFwiNDIwMzIxXCI6IFwi6YOn5Y6/XCIsXG5cdCAgICBcIjQyMDMyMlwiOiBcIumDp+ilv+WOv1wiLFxuXHQgICAgXCI0MjAzMjNcIjogXCLnq7nlsbHljr9cIixcblx0ICAgIFwiNDIwMzI0XCI6IFwi56u55rqq5Y6/XCIsXG5cdCAgICBcIjQyMDMyNVwiOiBcIuaIv+WOv1wiLFxuXHQgICAgXCI0MjAzODFcIjogXCLkuLnmsZ/lj6PluIJcIixcblx0ICAgIFwiNDIwMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDUwMFwiOiBcIuWunOaYjOW4glwiLFxuXHQgICAgXCI0MjA1MDJcIjogXCLopb/pmbXljLpcIixcblx0ICAgIFwiNDIwNTAzXCI6IFwi5LyN5a625bKX5Yy6XCIsXG5cdCAgICBcIjQyMDUwNFwiOiBcIueCueWGm+WMulwiLFxuXHQgICAgXCI0MjA1MDVcIjogXCLnjIfkuq3ljLpcIixcblx0ICAgIFwiNDIwNTA2XCI6IFwi5aS36Zm15Yy6XCIsXG5cdCAgICBcIjQyMDUyNVwiOiBcIui/nOWuieWOv1wiLFxuXHQgICAgXCI0MjA1MjZcIjogXCLlhbTlsbHljr9cIixcblx0ICAgIFwiNDIwNTI3XCI6IFwi56et5b2S5Y6/XCIsXG5cdCAgICBcIjQyMDUyOFwiOiBcIumVv+mYs+Wcn+WutuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MjA1MjlcIjogXCLkupTls7DlnJ/lrrbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDIwNTgxXCI6IFwi5a6c6YO95biCXCIsXG5cdCAgICBcIjQyMDU4MlwiOiBcIuW9k+mYs+W4glwiLFxuXHQgICAgXCI0MjA1ODNcIjogXCLmnp3msZ/luIJcIixcblx0ICAgIFwiNDIwNTg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDYwMFwiOiBcIuilhOmYs+W4glwiLFxuXHQgICAgXCI0MjA2MDJcIjogXCLopYTln47ljLpcIixcblx0ICAgIFwiNDIwNjA2XCI6IFwi5qiK5Z+O5Yy6XCIsXG5cdCAgICBcIjQyMDYwN1wiOiBcIuilhOW3nuWMulwiLFxuXHQgICAgXCI0MjA2MjRcIjogXCLljZfmvLPljr9cIixcblx0ICAgIFwiNDIwNjI1XCI6IFwi6LC35Z+O5Y6/XCIsXG5cdCAgICBcIjQyMDYyNlwiOiBcIuS/neW6t+WOv1wiLFxuXHQgICAgXCI0MjA2ODJcIjogXCLogIHmsrPlj6PluIJcIixcblx0ICAgIFwiNDIwNjgzXCI6IFwi5p6j6Ziz5biCXCIsXG5cdCAgICBcIjQyMDY4NFwiOiBcIuWunOWfjuW4glwiLFxuXHQgICAgXCI0MjA2ODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwNzAwXCI6IFwi6YSC5bee5biCXCIsXG5cdCAgICBcIjQyMDcwMlwiOiBcIuaigeWtkOa5luWMulwiLFxuXHQgICAgXCI0MjA3MDNcIjogXCLljY7lrrnljLpcIixcblx0ICAgIFwiNDIwNzA0XCI6IFwi6YSC5Z+O5Yy6XCIsXG5cdCAgICBcIjQyMDcwNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjA4MDBcIjogXCLojYbpl6jluIJcIixcblx0ICAgIFwiNDIwODAyXCI6IFwi5Lic5a6d5Yy6XCIsXG5cdCAgICBcIjQyMDgwNFwiOiBcIuaOh+WIgOWMulwiLFxuXHQgICAgXCI0MjA4MjFcIjogXCLkuqzlsbHljr9cIixcblx0ICAgIFwiNDIwODIyXCI6IFwi5rKZ5rSL5Y6/XCIsXG5cdCAgICBcIjQyMDg4MVwiOiBcIumSn+elpeW4glwiLFxuXHQgICAgXCI0MjA4ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwOTAwXCI6IFwi5a2d5oSf5biCXCIsXG5cdCAgICBcIjQyMDkwMlwiOiBcIuWtneWNl+WMulwiLFxuXHQgICAgXCI0MjA5MjFcIjogXCLlrZ3mmIzljr9cIixcblx0ICAgIFwiNDIwOTIyXCI6IFwi5aSn5oKf5Y6/XCIsXG5cdCAgICBcIjQyMDkyM1wiOiBcIuS6keaipuWOv1wiLFxuXHQgICAgXCI0MjA5ODFcIjogXCLlupTln47luIJcIixcblx0ICAgIFwiNDIwOTgyXCI6IFwi5a6J6ZmG5biCXCIsXG5cdCAgICBcIjQyMDk4NFwiOiBcIuaxieW3neW4glwiLFxuXHQgICAgXCI0MjA5ODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIxMDAwXCI6IFwi6I2G5bee5biCXCIsXG5cdCAgICBcIjQyMTAwMlwiOiBcIuaymeW4guWMulwiLFxuXHQgICAgXCI0MjEwMDNcIjogXCLojYblt57ljLpcIixcblx0ICAgIFwiNDIxMDIyXCI6IFwi5YWs5a6J5Y6/XCIsXG5cdCAgICBcIjQyMTAyM1wiOiBcIuebkeWIqeWOv1wiLFxuXHQgICAgXCI0MjEwMjRcIjogXCLmsZ/pmbXljr9cIixcblx0ICAgIFwiNDIxMDgxXCI6IFwi55+z6aaW5biCXCIsXG5cdCAgICBcIjQyMTA4M1wiOiBcIua0qua5luW4glwiLFxuXHQgICAgXCI0MjEwODdcIjogXCLmnb7mu4vluIJcIixcblx0ICAgIFwiNDIxMDg4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMTEwMFwiOiBcIum7hOWGiOW4glwiLFxuXHQgICAgXCI0MjExMDJcIjogXCLpu4Tlt57ljLpcIixcblx0ICAgIFwiNDIxMTIxXCI6IFwi5Zui6aOO5Y6/XCIsXG5cdCAgICBcIjQyMTEyMlwiOiBcIue6ouWuieWOv1wiLFxuXHQgICAgXCI0MjExMjNcIjogXCLnvZfnlLDljr9cIixcblx0ICAgIFwiNDIxMTI0XCI6IFwi6Iux5bGx5Y6/XCIsXG5cdCAgICBcIjQyMTEyNVwiOiBcIua1oOawtOWOv1wiLFxuXHQgICAgXCI0MjExMjZcIjogXCLolbLmmKXljr9cIixcblx0ICAgIFwiNDIxMTI3XCI6IFwi6buE5qKF5Y6/XCIsXG5cdCAgICBcIjQyMTE4MVwiOiBcIum6u+WfjuW4glwiLFxuXHQgICAgXCI0MjExODJcIjogXCLmrabnqbTluIJcIixcblx0ICAgIFwiNDIxMTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMTIwMFwiOiBcIuWSuOWugeW4glwiLFxuXHQgICAgXCI0MjEyMDJcIjogXCLlkrjlronljLpcIixcblx0ICAgIFwiNDIxMjIxXCI6IFwi5ZiJ6bG85Y6/XCIsXG5cdCAgICBcIjQyMTIyMlwiOiBcIumAmuWfjuWOv1wiLFxuXHQgICAgXCI0MjEyMjNcIjogXCLltIfpmLPljr9cIixcblx0ICAgIFwiNDIxMjI0XCI6IFwi6YCa5bGx5Y6/XCIsXG5cdCAgICBcIjQyMTI4MVwiOiBcIui1pOWjgeW4glwiLFxuXHQgICAgXCI0MjEyODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIxMzAwXCI6IFwi6ZqP5bee5biCXCIsXG5cdCAgICBcIjQyMTMwMlwiOiBcIuabvumDveWMulwiLFxuXHQgICAgXCI0MjEzMjFcIjogXCLpmo/ljr9cIixcblx0ICAgIFwiNDIxMzgxXCI6IFwi5bm/5rC05biCXCIsXG5cdCAgICBcIjQyMTM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjI4MDBcIjogXCLmganmlr3lnJ/lrrbml4/oi5fml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNDIyODAxXCI6IFwi5oGp5pa95biCXCIsXG5cdCAgICBcIjQyMjgwMlwiOiBcIuWIqeW3neW4glwiLFxuXHQgICAgXCI0MjI4MjJcIjogXCLlu7rlp4vljr9cIixcblx0ICAgIFwiNDIyODIzXCI6IFwi5be05Lic5Y6/XCIsXG5cdCAgICBcIjQyMjgyNVwiOiBcIuWuo+aBqeWOv1wiLFxuXHQgICAgXCI0MjI4MjZcIjogXCLlkrjkuLDljr9cIixcblx0ICAgIFwiNDIyODI3XCI6IFwi5p2l5Yek5Y6/XCIsXG5cdCAgICBcIjQyMjgyOFwiOiBcIum5pOWzsOWOv1wiLFxuXHQgICAgXCI0MjI4MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDI5MDA0XCI6IFwi5LuZ5qGD5biCXCIsXG5cdCAgICBcIjQyOTAwNVwiOiBcIua9nOaxn+W4glwiLFxuXHQgICAgXCI0MjkwMDZcIjogXCLlpKnpl6jluIJcIixcblx0ICAgIFwiNDI5MDIxXCI6IFwi56We5Yac5p625p6X5Yy6XCIsXG5cdCAgICBcIjQzMDAwMFwiOiBcIua5luWNl+ecgVwiLFxuXHQgICAgXCI0MzAxMDBcIjogXCLplb/mspnluIJcIixcblx0ICAgIFwiNDMwMTAyXCI6IFwi6IqZ6JOJ5Yy6XCIsXG5cdCAgICBcIjQzMDEwM1wiOiBcIuWkqeW/g+WMulwiLFxuXHQgICAgXCI0MzAxMDRcIjogXCLlsrPpupPljLpcIixcblx0ICAgIFwiNDMwMTA1XCI6IFwi5byA56aP5Yy6XCIsXG5cdCAgICBcIjQzMDExMVwiOiBcIumbqOiKseWMulwiLFxuXHQgICAgXCI0MzAxMjFcIjogXCLplb/mspnljr9cIixcblx0ICAgIFwiNDMwMTIyXCI6IFwi5pyb5Z+O5Yy6XCIsXG5cdCAgICBcIjQzMDEyNFwiOiBcIuWugeS5oeWOv1wiLFxuXHQgICAgXCI0MzAxODFcIjogXCLmtY/pmLPluIJcIixcblx0ICAgIFwiNDMwMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDIwMFwiOiBcIuagqua0suW4glwiLFxuXHQgICAgXCI0MzAyMDJcIjogXCLojbfloZjljLpcIixcblx0ICAgIFwiNDMwMjAzXCI6IFwi6Iqm5ree5Yy6XCIsXG5cdCAgICBcIjQzMDIwNFwiOiBcIuefs+WzsOWMulwiLFxuXHQgICAgXCI0MzAyMTFcIjogXCLlpKnlhYPljLpcIixcblx0ICAgIFwiNDMwMjIxXCI6IFwi5qCq5rSy5Y6/XCIsXG5cdCAgICBcIjQzMDIyM1wiOiBcIuaUuOWOv1wiLFxuXHQgICAgXCI0MzAyMjRcIjogXCLojLbpmbXljr9cIixcblx0ICAgIFwiNDMwMjI1XCI6IFwi54KO6Zm15Y6/XCIsXG5cdCAgICBcIjQzMDI4MVwiOiBcIumGtOmZteW4glwiLFxuXHQgICAgXCI0MzAyODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwMzAwXCI6IFwi5rmY5r2t5biCXCIsXG5cdCAgICBcIjQzMDMwMlwiOiBcIumbqOa5luWMulwiLFxuXHQgICAgXCI0MzAzMDRcIjogXCLlsrPloZjljLpcIixcblx0ICAgIFwiNDMwMzIxXCI6IFwi5rmY5r2t5Y6/XCIsXG5cdCAgICBcIjQzMDM4MVwiOiBcIua5mOS5oeW4glwiLFxuXHQgICAgXCI0MzAzODJcIjogXCLpn7blsbHluIJcIixcblx0ICAgIFwiNDMwMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDQwMFwiOiBcIuihoemYs+W4glwiLFxuXHQgICAgXCI0MzA0MDVcIjogXCLnj6DmmZbljLpcIixcblx0ICAgIFwiNDMwNDA2XCI6IFwi6ZuB5bOw5Yy6XCIsXG5cdCAgICBcIjQzMDQwN1wiOiBcIuefs+m8k+WMulwiLFxuXHQgICAgXCI0MzA0MDhcIjogXCLokrjmuZjljLpcIixcblx0ICAgIFwiNDMwNDEyXCI6IFwi5Y2X5bKz5Yy6XCIsXG5cdCAgICBcIjQzMDQyMVwiOiBcIuihoemYs+WOv1wiLFxuXHQgICAgXCI0MzA0MjJcIjogXCLooaHljZfljr9cIixcblx0ICAgIFwiNDMwNDIzXCI6IFwi6KGh5bGx5Y6/XCIsXG5cdCAgICBcIjQzMDQyNFwiOiBcIuihoeS4nOWOv1wiLFxuXHQgICAgXCI0MzA0MjZcIjogXCLnpYHkuJzljr9cIixcblx0ICAgIFwiNDMwNDgxXCI6IFwi6ICS6Ziz5biCXCIsXG5cdCAgICBcIjQzMDQ4MlwiOiBcIuW4uOWugeW4glwiLFxuXHQgICAgXCI0MzA0ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwNTAwXCI6IFwi6YK16Ziz5biCXCIsXG5cdCAgICBcIjQzMDUwMlwiOiBcIuWPjOa4heWMulwiLFxuXHQgICAgXCI0MzA1MDNcIjogXCLlpKfnpaXljLpcIixcblx0ICAgIFwiNDMwNTExXCI6IFwi5YyX5aGU5Yy6XCIsXG5cdCAgICBcIjQzMDUyMVwiOiBcIumCteS4nOWOv1wiLFxuXHQgICAgXCI0MzA1MjJcIjogXCLmlrDpgrXljr9cIixcblx0ICAgIFwiNDMwNTIzXCI6IFwi6YK16Ziz5Y6/XCIsXG5cdCAgICBcIjQzMDUyNFwiOiBcIumahuWbnuWOv1wiLFxuXHQgICAgXCI0MzA1MjVcIjogXCLmtJ7lj6Pljr9cIixcblx0ICAgIFwiNDMwNTI3XCI6IFwi57ul5a6B5Y6/XCIsXG5cdCAgICBcIjQzMDUyOFwiOiBcIuaWsOWugeWOv1wiLFxuXHQgICAgXCI0MzA1MjlcIjogXCLln47mraXoi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDMwNTgxXCI6IFwi5q2m5YaI5biCXCIsXG5cdCAgICBcIjQzMDU4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzA2MDBcIjogXCLlsrPpmLPluIJcIixcblx0ICAgIFwiNDMwNjAyXCI6IFwi5bKz6Ziz5qW85Yy6XCIsXG5cdCAgICBcIjQzMDYwM1wiOiBcIuS6kea6quWMulwiLFxuXHQgICAgXCI0MzA2MTFcIjogXCLlkJvlsbHljLpcIixcblx0ICAgIFwiNDMwNjIxXCI6IFwi5bKz6Ziz5Y6/XCIsXG5cdCAgICBcIjQzMDYyM1wiOiBcIuWNjuWuueWOv1wiLFxuXHQgICAgXCI0MzA2MjRcIjogXCLmuZjpmLTljr9cIixcblx0ICAgIFwiNDMwNjI2XCI6IFwi5bmz5rGf5Y6/XCIsXG5cdCAgICBcIjQzMDY4MVwiOiBcIuaxqOe9l+W4glwiLFxuXHQgICAgXCI0MzA2ODJcIjogXCLkuLTmuZjluIJcIixcblx0ICAgIFwiNDMwNjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDcwMFwiOiBcIuW4uOW+t+W4glwiLFxuXHQgICAgXCI0MzA3MDJcIjogXCLmrabpmbXljLpcIixcblx0ICAgIFwiNDMwNzAzXCI6IFwi6byO5Z+O5Yy6XCIsXG5cdCAgICBcIjQzMDcyMVwiOiBcIuWuieS5oeWOv1wiLFxuXHQgICAgXCI0MzA3MjJcIjogXCLmsYnlr7/ljr9cIixcblx0ICAgIFwiNDMwNzIzXCI6IFwi5r6n5Y6/XCIsXG5cdCAgICBcIjQzMDcyNFwiOiBcIuS4tOa+p+WOv1wiLFxuXHQgICAgXCI0MzA3MjVcIjogXCLmoYPmupDljr9cIixcblx0ICAgIFwiNDMwNzI2XCI6IFwi55+z6Zeo5Y6/XCIsXG5cdCAgICBcIjQzMDc4MVwiOiBcIua0peW4guW4glwiLFxuXHQgICAgXCI0MzA3ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwODAwXCI6IFwi5byg5a6255WM5biCXCIsXG5cdCAgICBcIjQzMDgwMlwiOiBcIuawuOWumuWMulwiLFxuXHQgICAgXCI0MzA4MTFcIjogXCLmrabpmbXmupDljLpcIixcblx0ICAgIFwiNDMwODIxXCI6IFwi5oWI5Yip5Y6/XCIsXG5cdCAgICBcIjQzMDgyMlwiOiBcIuahkeakjeWOv1wiLFxuXHQgICAgXCI0MzA4MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwOTAwXCI6IFwi55uK6Ziz5biCXCIsXG5cdCAgICBcIjQzMDkwMlwiOiBcIui1hOmYs+WMulwiLFxuXHQgICAgXCI0MzA5MDNcIjogXCLotavlsbHljLpcIixcblx0ICAgIFwiNDMwOTIxXCI6IFwi5Y2X5Y6/XCIsXG5cdCAgICBcIjQzMDkyMlwiOiBcIuahg+axn+WOv1wiLFxuXHQgICAgXCI0MzA5MjNcIjogXCLlronljJbljr9cIixcblx0ICAgIFwiNDMwOTgxXCI6IFwi5rKF5rGf5biCXCIsXG5cdCAgICBcIjQzMDk4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzEwMDBcIjogXCLpg7Tlt57luIJcIixcblx0ICAgIFwiNDMxMDAyXCI6IFwi5YyX5rmW5Yy6XCIsXG5cdCAgICBcIjQzMTAwM1wiOiBcIuiLj+S7meWMulwiLFxuXHQgICAgXCI0MzEwMjFcIjogXCLmoYLpmLPljr9cIixcblx0ICAgIFwiNDMxMDIyXCI6IFwi5a6c56ug5Y6/XCIsXG5cdCAgICBcIjQzMTAyM1wiOiBcIuawuOWFtOWOv1wiLFxuXHQgICAgXCI0MzEwMjRcIjogXCLlmInnpr7ljr9cIixcblx0ICAgIFwiNDMxMDI1XCI6IFwi5Li05q2m5Y6/XCIsXG5cdCAgICBcIjQzMTAyNlwiOiBcIuaxneWfjuWOv1wiLFxuXHQgICAgXCI0MzEwMjdcIjogXCLmoYLkuJzljr9cIixcblx0ICAgIFwiNDMxMDI4XCI6IFwi5a6J5LuB5Y6/XCIsXG5cdCAgICBcIjQzMTA4MVwiOiBcIui1hOWFtOW4glwiLFxuXHQgICAgXCI0MzEwODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMxMTAwXCI6IFwi5rC45bee5biCXCIsXG5cdCAgICBcIjQzMTEwMlwiOiBcIumbtumZteWMulwiLFxuXHQgICAgXCI0MzExMDNcIjogXCLlhrfmsLTmu6nljLpcIixcblx0ICAgIFwiNDMxMTIxXCI6IFwi56WB6Ziz5Y6/XCIsXG5cdCAgICBcIjQzMTEyMlwiOiBcIuS4nOWuieWOv1wiLFxuXHQgICAgXCI0MzExMjNcIjogXCLlj4zniYzljr9cIixcblx0ICAgIFwiNDMxMTI0XCI6IFwi6YGT5Y6/XCIsXG5cdCAgICBcIjQzMTEyNVwiOiBcIuaxn+awuOWOv1wiLFxuXHQgICAgXCI0MzExMjZcIjogXCLlroHov5zljr9cIixcblx0ICAgIFwiNDMxMTI3XCI6IFwi6JOd5bGx5Y6/XCIsXG5cdCAgICBcIjQzMTEyOFwiOiBcIuaWsOeUsOWOv1wiLFxuXHQgICAgXCI0MzExMjlcIjogXCLmsZ/ljY7nkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDMxMTMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMTIwMFwiOiBcIuaAgOWMluW4glwiLFxuXHQgICAgXCI0MzEyMDJcIjogXCLpuaTln47ljLpcIixcblx0ICAgIFwiNDMxMjIxXCI6IFwi5Lit5pa55Y6/XCIsXG5cdCAgICBcIjQzMTIyMlwiOiBcIuayhemZteWOv1wiLFxuXHQgICAgXCI0MzEyMjNcIjogXCLovrDmuqrljr9cIixcblx0ICAgIFwiNDMxMjI0XCI6IFwi5rqG5rWm5Y6/XCIsXG5cdCAgICBcIjQzMTIyNVwiOiBcIuS8muWQjOWOv1wiLFxuXHQgICAgXCI0MzEyMjZcIjogXCLpurvpmLPoi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDMxMjI3XCI6IFwi5paw5pmD5L6X5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQzMTIyOFwiOiBcIuiKt+axn+S+l+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MzEyMjlcIjogXCLpnZblt57oi5fml4/kvpfml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDMxMjMwXCI6IFwi6YCa6YGT5L6X5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQzMTI4MVwiOiBcIua0quaxn+W4glwiLFxuXHQgICAgXCI0MzEyODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMxMzAwXCI6IFwi5aiE5bqV5biCXCIsXG5cdCAgICBcIjQzMTMwMlwiOiBcIuWohOaYn+WMulwiLFxuXHQgICAgXCI0MzEzMjFcIjogXCLlj4zls7Dljr9cIixcblx0ICAgIFwiNDMxMzIyXCI6IFwi5paw5YyW5Y6/XCIsXG5cdCAgICBcIjQzMTM4MVwiOiBcIuWGt+awtOaxn+W4glwiLFxuXHQgICAgXCI0MzEzODJcIjogXCLmtp/mupDluIJcIixcblx0ICAgIFwiNDMxMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMzEwMFwiOiBcIua5mOilv+Wcn+WutuaXj+iLl+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI0MzMxMDFcIjogXCLlkInpppbluIJcIixcblx0ICAgIFwiNDMzMTIyXCI6IFwi5rO45rqq5Y6/XCIsXG5cdCAgICBcIjQzMzEyM1wiOiBcIuWHpOWHsOWOv1wiLFxuXHQgICAgXCI0MzMxMjRcIjogXCLoirHlnqPljr9cIixcblx0ICAgIFwiNDMzMTI1XCI6IFwi5L+d6Z2W5Y6/XCIsXG5cdCAgICBcIjQzMzEyNlwiOiBcIuWPpOS4iOWOv1wiLFxuXHQgICAgXCI0MzMxMjdcIjogXCLmsLjpobrljr9cIixcblx0ICAgIFwiNDMzMTMwXCI6IFwi6b6Z5bGx5Y6/XCIsXG5cdCAgICBcIjQzMzEzMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDAwMDBcIjogXCLlub/kuJznnIFcIixcblx0ICAgIFwiNDQwMTAwXCI6IFwi5bm/5bee5biCXCIsXG5cdCAgICBcIjQ0MDEwM1wiOiBcIuiNlOa5vuWMulwiLFxuXHQgICAgXCI0NDAxMDRcIjogXCLotornp4DljLpcIixcblx0ICAgIFwiNDQwMTA1XCI6IFwi5rW354+g5Yy6XCIsXG5cdCAgICBcIjQ0MDEwNlwiOiBcIuWkqeays+WMulwiLFxuXHQgICAgXCI0NDAxMTFcIjogXCLnmb3kupHljLpcIixcblx0ICAgIFwiNDQwMTEyXCI6IFwi6buE5Z+U5Yy6XCIsXG5cdCAgICBcIjQ0MDExM1wiOiBcIueVquemuuWMulwiLFxuXHQgICAgXCI0NDAxMTRcIjogXCLoirHpg73ljLpcIixcblx0ICAgIFwiNDQwMTE1XCI6IFwi5Y2X5rKZ5Yy6XCIsXG5cdCAgICBcIjQ0MDExNlwiOiBcIuiQneWyl+WMulwiLFxuXHQgICAgXCI0NDAxODNcIjogXCLlop7ln47luIJcIixcblx0ICAgIFwiNDQwMTg0XCI6IFwi5LuO5YyW5biCXCIsXG5cdCAgICBcIjQ0MDE4OVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDAyMDBcIjogXCLpn7blhbPluIJcIixcblx0ICAgIFwiNDQwMjAzXCI6IFwi5q2m5rGf5Yy6XCIsXG5cdCAgICBcIjQ0MDIwNFwiOiBcIua1iOaxn+WMulwiLFxuXHQgICAgXCI0NDAyMDVcIjogXCLmm7LmsZ/ljLpcIixcblx0ICAgIFwiNDQwMjIyXCI6IFwi5aeL5YW05Y6/XCIsXG5cdCAgICBcIjQ0MDIyNFwiOiBcIuS7geWMluWOv1wiLFxuXHQgICAgXCI0NDAyMjlcIjogXCLnv4HmupDljr9cIixcblx0ICAgIFwiNDQwMjMyXCI6IFwi5Lmz5rqQ55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ0MDIzM1wiOiBcIuaWsOS4sOWOv1wiLFxuXHQgICAgXCI0NDAyODFcIjogXCLkuZDmmIzluIJcIixcblx0ICAgIFwiNDQwMjgyXCI6IFwi5Y2X6ZuE5biCXCIsXG5cdCAgICBcIjQ0MDI4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDAzMDBcIjogXCLmt7HlnLPluIJcIixcblx0ICAgIFwiNDQwMzAzXCI6IFwi572X5rmW5Yy6XCIsXG5cdCAgICBcIjQ0MDMwNFwiOiBcIuemj+eUsOWMulwiLFxuXHQgICAgXCI0NDAzMDVcIjogXCLljZflsbHljLpcIixcblx0ICAgIFwiNDQwMzA2XCI6IFwi5a6d5a6J5Yy6XCIsXG5cdCAgICBcIjQ0MDMwN1wiOiBcIum+meWyl+WMulwiLFxuXHQgICAgXCI0NDAzMDhcIjogXCLnm5DnlLDljLpcIixcblx0ICAgIFwiNDQwMzA5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDMyMFwiOiBcIuWFieaYjuaWsOWMulwiLFxuXHQgICAgXCI0NDAzMjFcIjogXCLlnarlsbHmlrDljLpcIixcblx0ICAgIFwiNDQwMzIyXCI6IFwi5aSn6bmP5paw5Yy6XCIsXG5cdCAgICBcIjQ0MDMyM1wiOiBcIum+meWNjuaWsOWMulwiLFxuXHQgICAgXCI0NDA0MDBcIjogXCLnj6DmtbfluIJcIixcblx0ICAgIFwiNDQwNDAyXCI6IFwi6aaZ5rSy5Yy6XCIsXG5cdCAgICBcIjQ0MDQwM1wiOiBcIuaWl+mXqOWMulwiLFxuXHQgICAgXCI0NDA0MDRcIjogXCLph5Hmub7ljLpcIixcblx0ICAgIFwiNDQwNDg4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDUwMFwiOiBcIuaxleWktOW4glwiLFxuXHQgICAgXCI0NDA1MDdcIjogXCLpvpnmuZbljLpcIixcblx0ICAgIFwiNDQwNTExXCI6IFwi6YeR5bmz5Yy6XCIsXG5cdCAgICBcIjQ0MDUxMlwiOiBcIua/oOaxn+WMulwiLFxuXHQgICAgXCI0NDA1MTNcIjogXCLmva7pmLPljLpcIixcblx0ICAgIFwiNDQwNTE0XCI6IFwi5r2u5Y2X5Yy6XCIsXG5cdCAgICBcIjQ0MDUxNVwiOiBcIua+hOa1t+WMulwiLFxuXHQgICAgXCI0NDA1MjNcIjogXCLljZfmvrPljr9cIixcblx0ICAgIFwiNDQwNTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDYwMFwiOiBcIuS9m+WxseW4glwiLFxuXHQgICAgXCI0NDA2MDRcIjogXCLnpoXln47ljLpcIixcblx0ICAgIFwiNDQwNjA1XCI6IFwi5Y2X5rW35Yy6XCIsXG5cdCAgICBcIjQ0MDYwNlwiOiBcIumhuuW+t+WMulwiLFxuXHQgICAgXCI0NDA2MDdcIjogXCLkuInmsLTljLpcIixcblx0ICAgIFwiNDQwNjA4XCI6IFwi6auY5piO5Yy6XCIsXG5cdCAgICBcIjQ0MDYwOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDA3MDBcIjogXCLmsZ/pl6jluIJcIixcblx0ICAgIFwiNDQwNzAzXCI6IFwi6JOs5rGf5Yy6XCIsXG5cdCAgICBcIjQ0MDcwNFwiOiBcIuaxn+a1t+WMulwiLFxuXHQgICAgXCI0NDA3MDVcIjogXCLmlrDkvJrljLpcIixcblx0ICAgIFwiNDQwNzgxXCI6IFwi5Y+w5bGx5biCXCIsXG5cdCAgICBcIjQ0MDc4M1wiOiBcIuW8gOW5s+W4glwiLFxuXHQgICAgXCI0NDA3ODRcIjogXCLpuaTlsbHluIJcIixcblx0ICAgIFwiNDQwNzg1XCI6IFwi5oGp5bmz5biCXCIsXG5cdCAgICBcIjQ0MDc4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDA4MDBcIjogXCLmuZvmsZ/luIJcIixcblx0ICAgIFwiNDQwODAyXCI6IFwi6LWk5Z2O5Yy6XCIsXG5cdCAgICBcIjQ0MDgwM1wiOiBcIumcnuWxseWMulwiLFxuXHQgICAgXCI0NDA4MDRcIjogXCLlnaHlpLTljLpcIixcblx0ICAgIFwiNDQwODExXCI6IFwi6bq756ug5Yy6XCIsXG5cdCAgICBcIjQ0MDgyM1wiOiBcIumBgua6quWOv1wiLFxuXHQgICAgXCI0NDA4MjVcIjogXCLlvpDpl7vljr9cIixcblx0ICAgIFwiNDQwODgxXCI6IFwi5buJ5rGf5biCXCIsXG5cdCAgICBcIjQ0MDg4MlwiOiBcIumbt+W3nuW4glwiLFxuXHQgICAgXCI0NDA4ODNcIjogXCLlkLTlt53luIJcIixcblx0ICAgIFwiNDQwODg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDkwMFwiOiBcIuiMguWQjeW4glwiLFxuXHQgICAgXCI0NDA5MDJcIjogXCLojILljZfljLpcIixcblx0ICAgIFwiNDQwOTAzXCI6IFwi6IyC5riv5Yy6XCIsXG5cdCAgICBcIjQ0MDkyM1wiOiBcIueUteeZveWOv1wiLFxuXHQgICAgXCI0NDA5ODFcIjogXCLpq5jlt57luIJcIixcblx0ICAgIFwiNDQwOTgyXCI6IFwi5YyW5bee5biCXCIsXG5cdCAgICBcIjQ0MDk4M1wiOiBcIuS/oeWunOW4glwiLFxuXHQgICAgXCI0NDA5ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxMjAwXCI6IFwi6IKH5bqG5biCXCIsXG5cdCAgICBcIjQ0MTIwMlwiOiBcIuerr+W3nuWMulwiLFxuXHQgICAgXCI0NDEyMDNcIjogXCLpvI7muZbljLpcIixcblx0ICAgIFwiNDQxMjIzXCI6IFwi5bm/5a6B5Y6/XCIsXG5cdCAgICBcIjQ0MTIyNFwiOiBcIuaAgOmbhuWOv1wiLFxuXHQgICAgXCI0NDEyMjVcIjogXCLlsIHlvIDljr9cIixcblx0ICAgIFwiNDQxMjI2XCI6IFwi5b635bqG5Y6/XCIsXG5cdCAgICBcIjQ0MTI4M1wiOiBcIumrmOimgeW4glwiLFxuXHQgICAgXCI0NDEyODRcIjogXCLlm5vkvJrluIJcIixcblx0ICAgIFwiNDQxMjg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTMwMFwiOiBcIuaDoOW3nuW4glwiLFxuXHQgICAgXCI0NDEzMDJcIjogXCLmg6Dln47ljLpcIixcblx0ICAgIFwiNDQxMzAzXCI6IFwi5oOg6Ziz5Yy6XCIsXG5cdCAgICBcIjQ0MTMyMlwiOiBcIuWNmue9l+WOv1wiLFxuXHQgICAgXCI0NDEzMjNcIjogXCLmg6DkuJzljr9cIixcblx0ICAgIFwiNDQxMzI0XCI6IFwi6b6Z6Zeo5Y6/XCIsXG5cdCAgICBcIjQ0MTMyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDE0MDBcIjogXCLmooXlt57luIJcIixcblx0ICAgIFwiNDQxNDAyXCI6IFwi5qKF5rGf5Yy6XCIsXG5cdCAgICBcIjQ0MTQyMVwiOiBcIuaiheWOv1wiLFxuXHQgICAgXCI0NDE0MjJcIjogXCLlpKfln5Tljr9cIixcblx0ICAgIFwiNDQxNDIzXCI6IFwi5Liw6aG65Y6/XCIsXG5cdCAgICBcIjQ0MTQyNFwiOiBcIuS6lOWNjuWOv1wiLFxuXHQgICAgXCI0NDE0MjZcIjogXCLlubPov5zljr9cIixcblx0ICAgIFwiNDQxNDI3XCI6IFwi6JWJ5bKt5Y6/XCIsXG5cdCAgICBcIjQ0MTQ4MVwiOiBcIuWFtOWugeW4glwiLFxuXHQgICAgXCI0NDE0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxNTAwXCI6IFwi5rGV5bC+5biCXCIsXG5cdCAgICBcIjQ0MTUwMlwiOiBcIuWfjuWMulwiLFxuXHQgICAgXCI0NDE1MjFcIjogXCLmtbfkuLDljr9cIixcblx0ICAgIFwiNDQxNTIzXCI6IFwi6ZmG5rKz5Y6/XCIsXG5cdCAgICBcIjQ0MTU4MVwiOiBcIumZhuS4sOW4glwiLFxuXHQgICAgXCI0NDE1ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxNjAwXCI6IFwi5rKz5rqQ5biCXCIsXG5cdCAgICBcIjQ0MTYwMlwiOiBcIua6kOWfjuWMulwiLFxuXHQgICAgXCI0NDE2MjFcIjogXCLntKvph5Hljr9cIixcblx0ICAgIFwiNDQxNjIyXCI6IFwi6b6Z5bed5Y6/XCIsXG5cdCAgICBcIjQ0MTYyM1wiOiBcIui/nuW5s+WOv1wiLFxuXHQgICAgXCI0NDE2MjRcIjogXCLlkozlubPljr9cIixcblx0ICAgIFwiNDQxNjI1XCI6IFwi5Lic5rqQ5Y6/XCIsXG5cdCAgICBcIjQ0MTYyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDE3MDBcIjogXCLpmLPmsZ/luIJcIixcblx0ICAgIFwiNDQxNzAyXCI6IFwi5rGf5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0MTcyMVwiOiBcIumYs+ilv+WOv1wiLFxuXHQgICAgXCI0NDE3MjNcIjogXCLpmLPkuJzljr9cIixcblx0ICAgIFwiNDQxNzgxXCI6IFwi6Ziz5pil5biCXCIsXG5cdCAgICBcIjQ0MTc4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDE4MDBcIjogXCLmuIXov5zluIJcIixcblx0ICAgIFwiNDQxODAyXCI6IFwi5riF5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0MTgyMVwiOiBcIuS9m+WGiOWOv1wiLFxuXHQgICAgXCI0NDE4MjNcIjogXCLpmLPlsbHljr9cIixcblx0ICAgIFwiNDQxODI1XCI6IFwi6L+e5bGx5aOu5peP55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ0MTgyNlwiOiBcIui/nuWNl+eRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NDE4MjdcIjogXCLmuIXmlrDljLpcIixcblx0ICAgIFwiNDQxODgxXCI6IFwi6Iux5b635biCXCIsXG5cdCAgICBcIjQ0MTg4MlwiOiBcIui/nuW3nuW4glwiLFxuXHQgICAgXCI0NDE4ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxOTAwXCI6IFwi5Lic6I6e5biCXCIsXG5cdCAgICBcIjQ0MjAwMFwiOiBcIuS4reWxseW4glwiLFxuXHQgICAgXCI0NDIxMDFcIjogXCLkuJzmspnnvqTlsptcIixcblx0ICAgIFwiNDQ1MTAwXCI6IFwi5r2u5bee5biCXCIsXG5cdCAgICBcIjQ0NTEwMlwiOiBcIua5mOahpeWMulwiLFxuXHQgICAgXCI0NDUxMjFcIjogXCLmva7lronljLpcIixcblx0ICAgIFwiNDQ1MTIyXCI6IFwi6aW25bmz5Y6/XCIsXG5cdCAgICBcIjQ0NTE4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDUyMDBcIjogXCLmj63pmLPluIJcIixcblx0ICAgIFwiNDQ1MjAyXCI6IFwi5qaV5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0NTIyMVwiOiBcIuaPreS4nOWMulwiLFxuXHQgICAgXCI0NDUyMjJcIjogXCLmj63opb/ljr9cIixcblx0ICAgIFwiNDQ1MjI0XCI6IFwi5oOg5p2l5Y6/XCIsXG5cdCAgICBcIjQ0NTI4MVwiOiBcIuaZruWugeW4glwiLFxuXHQgICAgXCI0NDUyODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQ1MzAwXCI6IFwi5LqR5rWu5biCXCIsXG5cdCAgICBcIjQ0NTMwMlwiOiBcIuS6keWfjuWMulwiLFxuXHQgICAgXCI0NDUzMjFcIjogXCLmlrDlhbTljr9cIixcblx0ICAgIFwiNDQ1MzIyXCI6IFwi6YOB5Y2X5Y6/XCIsXG5cdCAgICBcIjQ0NTMyM1wiOiBcIuS6keWuieWOv1wiLFxuXHQgICAgXCI0NDUzODFcIjogXCLnvZflrprluIJcIixcblx0ICAgIFwiNDQ1MzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDAwMFwiOiBcIuW5v+ilv+WjruaXj+iHquayu+WMulwiLFxuXHQgICAgXCI0NTAxMDBcIjogXCLljZflroHluIJcIixcblx0ICAgIFwiNDUwMTAyXCI6IFwi5YW05a6B5Yy6XCIsXG5cdCAgICBcIjQ1MDEwM1wiOiBcIumdkuengOWMulwiLFxuXHQgICAgXCI0NTAxMDVcIjogXCLmsZ/ljZfljLpcIixcblx0ICAgIFwiNDUwMTA3XCI6IFwi6KW/5Lmh5aGY5Yy6XCIsXG5cdCAgICBcIjQ1MDEwOFwiOiBcIuiJr+W6huWMulwiLFxuXHQgICAgXCI0NTAxMDlcIjogXCLpgpXlroHljLpcIixcblx0ICAgIFwiNDUwMTIyXCI6IFwi5q2m6bij5Y6/XCIsXG5cdCAgICBcIjQ1MDEyM1wiOiBcIumahuWuieWOv1wiLFxuXHQgICAgXCI0NTAxMjRcIjogXCLpqazlsbHljr9cIixcblx0ICAgIFwiNDUwMTI1XCI6IFwi5LiK5p6X5Y6/XCIsXG5cdCAgICBcIjQ1MDEyNlwiOiBcIuWuvumYs+WOv1wiLFxuXHQgICAgXCI0NTAxMjdcIjogXCLmqKrljr9cIixcblx0ICAgIFwiNDUwMTI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDIwMFwiOiBcIuafs+W3nuW4glwiLFxuXHQgICAgXCI0NTAyMDJcIjogXCLln47kuK3ljLpcIixcblx0ICAgIFwiNDUwMjAzXCI6IFwi6bG85bOw5Yy6XCIsXG5cdCAgICBcIjQ1MDIwNFwiOiBcIuafs+WNl+WMulwiLFxuXHQgICAgXCI0NTAyMDVcIjogXCLmn7PljJfljLpcIixcblx0ICAgIFwiNDUwMjIxXCI6IFwi5p+z5rGf5Y6/XCIsXG5cdCAgICBcIjQ1MDIyMlwiOiBcIuafs+WfjuWOv1wiLFxuXHQgICAgXCI0NTAyMjNcIjogXCLpub/lr6jljr9cIixcblx0ICAgIFwiNDUwMjI0XCI6IFwi6J6N5a6J5Y6/XCIsXG5cdCAgICBcIjQ1MDIyNVwiOiBcIuiejeawtOiLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTAyMjZcIjogXCLkuInmsZ/kvpfml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUwMjI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDMwMFwiOiBcIuahguael+W4glwiLFxuXHQgICAgXCI0NTAzMDJcIjogXCLnp4Dls7DljLpcIixcblx0ICAgIFwiNDUwMzAzXCI6IFwi5Y+g5b2p5Yy6XCIsXG5cdCAgICBcIjQ1MDMwNFwiOiBcIuixoeWxseWMulwiLFxuXHQgICAgXCI0NTAzMDVcIjogXCLkuIPmmJ/ljLpcIixcblx0ICAgIFwiNDUwMzExXCI6IFwi6ZuB5bGx5Yy6XCIsXG5cdCAgICBcIjQ1MDMyMVwiOiBcIumYs+aclOWOv1wiLFxuXHQgICAgXCI0NTAzMjJcIjogXCLkuLTmoYLljLpcIixcblx0ICAgIFwiNDUwMzIzXCI6IFwi54G15bed5Y6/XCIsXG5cdCAgICBcIjQ1MDMyNFwiOiBcIuWFqOW3nuWOv1wiLFxuXHQgICAgXCI0NTAzMjVcIjogXCLlhbTlronljr9cIixcblx0ICAgIFwiNDUwMzI2XCI6IFwi5rC456aP5Y6/XCIsXG5cdCAgICBcIjQ1MDMyN1wiOiBcIueBjOmYs+WOv1wiLFxuXHQgICAgXCI0NTAzMjhcIjogXCLpvpnog5zlkITml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUwMzI5XCI6IFwi6LWE5rqQ5Y6/XCIsXG5cdCAgICBcIjQ1MDMzMFwiOiBcIuW5s+S5kOWOv1wiLFxuXHQgICAgXCI0NTAzMzFcIjogXCLojZTmtabljr9cIixcblx0ICAgIFwiNDUwMzMyXCI6IFwi5oGt5Z+O55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MDMzM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTA0MDBcIjogXCLmoqflt57luIJcIixcblx0ICAgIFwiNDUwNDAzXCI6IFwi5LiH56eA5Yy6XCIsXG5cdCAgICBcIjQ1MDQwNVwiOiBcIumVv+a0suWMulwiLFxuXHQgICAgXCI0NTA0MDZcIjogXCLpvpnlnKnljLpcIixcblx0ICAgIFwiNDUwNDIxXCI6IFwi6IuN5qKn5Y6/XCIsXG5cdCAgICBcIjQ1MDQyMlwiOiBcIuiXpOWOv1wiLFxuXHQgICAgXCI0NTA0MjNcIjogXCLokpnlsbHljr9cIixcblx0ICAgIFwiNDUwNDgxXCI6IFwi5bKR5rqq5biCXCIsXG5cdCAgICBcIjQ1MDQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTA1MDBcIjogXCLljJfmtbfluIJcIixcblx0ICAgIFwiNDUwNTAyXCI6IFwi5rW35Z+O5Yy6XCIsXG5cdCAgICBcIjQ1MDUwM1wiOiBcIumTtua1t+WMulwiLFxuXHQgICAgXCI0NTA1MTJcIjogXCLpk4HlsbHmuK/ljLpcIixcblx0ICAgIFwiNDUwNTIxXCI6IFwi5ZCI5rWm5Y6/XCIsXG5cdCAgICBcIjQ1MDUyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTA2MDBcIjogXCLpmLLln47muK/luIJcIixcblx0ICAgIFwiNDUwNjAyXCI6IFwi5riv5Y+j5Yy6XCIsXG5cdCAgICBcIjQ1MDYwM1wiOiBcIumYsuWfjuWMulwiLFxuXHQgICAgXCI0NTA2MjFcIjogXCLkuIrmgJ3ljr9cIixcblx0ICAgIFwiNDUwNjgxXCI6IFwi5Lic5YW05biCXCIsXG5cdCAgICBcIjQ1MDY4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTA3MDBcIjogXCLpkqblt57luIJcIixcblx0ICAgIFwiNDUwNzAyXCI6IFwi6ZKm5Y2X5Yy6XCIsXG5cdCAgICBcIjQ1MDcwM1wiOiBcIumSpuWMl+WMulwiLFxuXHQgICAgXCI0NTA3MjFcIjogXCLngbXlsbHljr9cIixcblx0ICAgIFwiNDUwNzIyXCI6IFwi5rWm5YyX5Y6/XCIsXG5cdCAgICBcIjQ1MDcyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTA4MDBcIjogXCLotLXmuK/luIJcIixcblx0ICAgIFwiNDUwODAyXCI6IFwi5riv5YyX5Yy6XCIsXG5cdCAgICBcIjQ1MDgwM1wiOiBcIua4r+WNl+WMulwiLFxuXHQgICAgXCI0NTA4MDRcIjogXCLopoPloZjljLpcIixcblx0ICAgIFwiNDUwODIxXCI6IFwi5bmz5Y2X5Y6/XCIsXG5cdCAgICBcIjQ1MDg4MVwiOiBcIuahguW5s+W4glwiLFxuXHQgICAgXCI0NTA4ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwOTAwXCI6IFwi546J5p6X5biCXCIsXG5cdCAgICBcIjQ1MDkwMlwiOiBcIueOieW3nuWMulwiLFxuXHQgICAgXCI0NTA5MDNcIjogXCLnpo/nu7XljLpcIixcblx0ICAgIFwiNDUwOTIxXCI6IFwi5a655Y6/XCIsXG5cdCAgICBcIjQ1MDkyMlwiOiBcIumZhuW3neWOv1wiLFxuXHQgICAgXCI0NTA5MjNcIjogXCLljZrnmb3ljr9cIixcblx0ICAgIFwiNDUwOTI0XCI6IFwi5YW05Lia5Y6/XCIsXG5cdCAgICBcIjQ1MDk4MVwiOiBcIuWMl+a1geW4glwiLFxuXHQgICAgXCI0NTA5ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUxMDAwXCI6IFwi55m+6Imy5biCXCIsXG5cdCAgICBcIjQ1MTAwMlwiOiBcIuWPs+axn+WMulwiLFxuXHQgICAgXCI0NTEwMjFcIjogXCLnlLDpmLPljr9cIixcblx0ICAgIFwiNDUxMDIyXCI6IFwi55Sw5Lic5Y6/XCIsXG5cdCAgICBcIjQ1MTAyM1wiOiBcIuW5s+aenOWOv1wiLFxuXHQgICAgXCI0NTEwMjRcIjogXCLlvrfkv53ljr9cIixcblx0ICAgIFwiNDUxMDI1XCI6IFwi6Z2W6KW/5Y6/XCIsXG5cdCAgICBcIjQ1MTAyNlwiOiBcIumCo+WdoeWOv1wiLFxuXHQgICAgXCI0NTEwMjdcIjogXCLlh4zkupHljr9cIixcblx0ICAgIFwiNDUxMDI4XCI6IFwi5LmQ5Lia5Y6/XCIsXG5cdCAgICBcIjQ1MTAyOVwiOiBcIueUsOael+WOv1wiLFxuXHQgICAgXCI0NTEwMzBcIjogXCLopb/mnpfljr9cIixcblx0ICAgIFwiNDUxMDMxXCI6IFwi6ZqG5p6X5ZCE5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTAzMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTExMDBcIjogXCLotLrlt57luIJcIixcblx0ICAgIFwiNDUxMTAyXCI6IFwi5YWr5q2l5Yy6XCIsXG5cdCAgICBcIjQ1MTExOVwiOiBcIuW5s+ahgueuoeeQhuWMulwiLFxuXHQgICAgXCI0NTExMjFcIjogXCLmmK3lubPljr9cIixcblx0ICAgIFwiNDUxMTIyXCI6IFwi6ZKf5bGx5Y6/XCIsXG5cdCAgICBcIjQ1MTEyM1wiOiBcIuWvjOW3neeRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTExMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUxMjAwXCI6IFwi5rKz5rGg5biCXCIsXG5cdCAgICBcIjQ1MTIwMlwiOiBcIumHkeWfjuaxn+WMulwiLFxuXHQgICAgXCI0NTEyMjFcIjogXCLljZfkuLnljr9cIixcblx0ICAgIFwiNDUxMjIyXCI6IFwi5aSp5bOo5Y6/XCIsXG5cdCAgICBcIjQ1MTIyM1wiOiBcIuWHpOWxseWOv1wiLFxuXHQgICAgXCI0NTEyMjRcIjogXCLkuJzlhbDljr9cIixcblx0ICAgIFwiNDUxMjI1XCI6IFwi572X5Z+O5Lur5L2s5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTIyNlwiOiBcIueOr+axn+avm+WNl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTEyMjdcIjogXCLlt7Tpqaznkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMjI4XCI6IFwi6YO95a6J55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTIyOVwiOiBcIuWkp+WMlueRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTEyODFcIjogXCLlrpzlt57luIJcIixcblx0ICAgIFwiNDUxMjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MTMwMFwiOiBcIuadpeWuvuW4glwiLFxuXHQgICAgXCI0NTEzMDJcIjogXCLlhbTlrr7ljLpcIixcblx0ICAgIFwiNDUxMzIxXCI6IFwi5b+75Z+O5Y6/XCIsXG5cdCAgICBcIjQ1MTMyMlwiOiBcIuixoeW3nuWOv1wiLFxuXHQgICAgXCI0NTEzMjNcIjogXCLmrablrqPljr9cIixcblx0ICAgIFwiNDUxMzI0XCI6IFwi6YeR56eA55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTM4MVwiOiBcIuWQiOWxseW4glwiLFxuXHQgICAgXCI0NTEzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUxNDAwXCI6IFwi5bSH5bem5biCXCIsXG5cdCAgICBcIjQ1MTQwMlwiOiBcIuaxn+W3nuWMulwiLFxuXHQgICAgXCI0NTE0MjFcIjogXCLmibbnu6Xljr9cIixcblx0ICAgIFwiNDUxNDIyXCI6IFwi5a6B5piO5Y6/XCIsXG5cdCAgICBcIjQ1MTQyM1wiOiBcIum+meW3nuWOv1wiLFxuXHQgICAgXCI0NTE0MjRcIjogXCLlpKfmlrDljr9cIixcblx0ICAgIFwiNDUxNDI1XCI6IFwi5aSp562J5Y6/XCIsXG5cdCAgICBcIjQ1MTQ4MVwiOiBcIuWHreelpeW4glwiLFxuXHQgICAgXCI0NTE0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDYwMDAwXCI6IFwi5rW35Y2X55yBXCIsXG5cdCAgICBcIjQ2MDEwMFwiOiBcIua1t+WPo+W4glwiLFxuXHQgICAgXCI0NjAxMDVcIjogXCLnp4Doi7HljLpcIixcblx0ICAgIFwiNDYwMTA2XCI6IFwi6b6Z5Y2O5Yy6XCIsXG5cdCAgICBcIjQ2MDEwN1wiOiBcIueQvOWxseWMulwiLFxuXHQgICAgXCI0NjAxMDhcIjogXCLnvo7lhbDljLpcIixcblx0ICAgIFwiNDYwMTA5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ2MDIwMFwiOiBcIuS4ieS6muW4glwiLFxuXHQgICAgXCI0NjAzMDBcIjogXCLkuInmspnluIJcIixcblx0ICAgIFwiNDYwMzIxXCI6IFwi6KW/5rKZ576k5bKbXCIsXG5cdCAgICBcIjQ2MDMyMlwiOiBcIuWNl+aymee+pOWym1wiLFxuXHQgICAgXCI0NjAzMjNcIjogXCLkuK3mspnnvqTlspvnmoTlspvnpIHlj4rlhbbmtbfln59cIixcblx0ICAgIFwiNDY5MDAxXCI6IFwi5LqU5oyH5bGx5biCXCIsXG5cdCAgICBcIjQ2OTAwMlwiOiBcIueQvOa1t+W4glwiLFxuXHQgICAgXCI0NjkwMDNcIjogXCLlhIvlt57luIJcIixcblx0ICAgIFwiNDY5MDA1XCI6IFwi5paH5piM5biCXCIsXG5cdCAgICBcIjQ2OTAwNlwiOiBcIuS4h+WugeW4glwiLFxuXHQgICAgXCI0NjkwMDdcIjogXCLkuJzmlrnluIJcIixcblx0ICAgIFwiNDY5MDI1XCI6IFwi5a6a5a6J5Y6/XCIsXG5cdCAgICBcIjQ2OTAyNlwiOiBcIuWxr+aYjOWOv1wiLFxuXHQgICAgXCI0NjkwMjdcIjogXCLmvoTov4jljr9cIixcblx0ICAgIFwiNDY5MDI4XCI6IFwi5Li06auY5Y6/XCIsXG5cdCAgICBcIjQ2OTAzMFwiOiBcIueZveaymem7juaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NjkwMzFcIjogXCLmmIzmsZ/pu47ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDY5MDMzXCI6IFwi5LmQ5Lic6buO5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ2OTAzNFwiOiBcIumZteawtOm7juaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NjkwMzVcIjogXCLkv53kuq3pu47ml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDY5MDM2XCI6IFwi55C85Lit6buO5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ3MTAwNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MDAwMDBcIjogXCLph43luoZcIixcblx0ICAgIFwiNTAwMTAwXCI6IFwi6YeN5bqG5biCXCIsXG5cdCAgICBcIjUwMDEwMVwiOiBcIuS4h+W3nuWMulwiLFxuXHQgICAgXCI1MDAxMDJcIjogXCLmtqrpmbXljLpcIixcblx0ICAgIFwiNTAwMTAzXCI6IFwi5rid5Lit5Yy6XCIsXG5cdCAgICBcIjUwMDEwNFwiOiBcIuWkp+a4oeWPo+WMulwiLFxuXHQgICAgXCI1MDAxMDVcIjogXCLmsZ/ljJfljLpcIixcblx0ICAgIFwiNTAwMTA2XCI6IFwi5rKZ5Z2q5Z2d5Yy6XCIsXG5cdCAgICBcIjUwMDEwN1wiOiBcIuS5nem+meWdoeWMulwiLFxuXHQgICAgXCI1MDAxMDhcIjogXCLljZflsrjljLpcIixcblx0ICAgIFwiNTAwMTA5XCI6IFwi5YyX56Ka5Yy6XCIsXG5cdCAgICBcIjUwMDExMFwiOiBcIuS4h+ebm+WMulwiLFxuXHQgICAgXCI1MDAxMTFcIjogXCLlj4zmoaXljLpcIixcblx0ICAgIFwiNTAwMTEyXCI6IFwi5rid5YyX5Yy6XCIsXG5cdCAgICBcIjUwMDExM1wiOiBcIuW3tOWNl+WMulwiLFxuXHQgICAgXCI1MDAxMTRcIjogXCLpu5TmsZ/ljLpcIixcblx0ICAgIFwiNTAwMTE1XCI6IFwi6ZW/5a+/5Yy6XCIsXG5cdCAgICBcIjUwMDIyMlwiOiBcIue2puaxn+WMulwiLFxuXHQgICAgXCI1MDAyMjNcIjogXCLmvbzljZfljr9cIixcblx0ICAgIFwiNTAwMjI0XCI6IFwi6ZOc5qKB5Y6/XCIsXG5cdCAgICBcIjUwMDIyNVwiOiBcIuWkp+i2s+WMulwiLFxuXHQgICAgXCI1MDAyMjZcIjogXCLojaPmmIzljr9cIixcblx0ICAgIFwiNTAwMjI3XCI6IFwi55Kn5bGx5Y6/XCIsXG5cdCAgICBcIjUwMDIyOFwiOiBcIuaigeW5s+WOv1wiLFxuXHQgICAgXCI1MDAyMjlcIjogXCLln47lj6Pljr9cIixcblx0ICAgIFwiNTAwMjMwXCI6IFwi5Liw6YO95Y6/XCIsXG5cdCAgICBcIjUwMDIzMVwiOiBcIuWeq+axn+WOv1wiLFxuXHQgICAgXCI1MDAyMzJcIjogXCLmrabpmobljr9cIixcblx0ICAgIFwiNTAwMjMzXCI6IFwi5b+g5Y6/XCIsXG5cdCAgICBcIjUwMDIzNFwiOiBcIuW8gOWOv1wiLFxuXHQgICAgXCI1MDAyMzVcIjogXCLkupHpmLPljr9cIixcblx0ICAgIFwiNTAwMjM2XCI6IFwi5aWJ6IqC5Y6/XCIsXG5cdCAgICBcIjUwMDIzN1wiOiBcIuW3q+WxseWOv1wiLFxuXHQgICAgXCI1MDAyMzhcIjogXCLlt6vmuqrljr9cIixcblx0ICAgIFwiNTAwMjQwXCI6IFwi55+z5p+x5Zyf5a625peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUwMDI0MVwiOiBcIuengOWxseWcn+WutuaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MDAyNDJcIjogXCLphYnpmLPlnJ/lrrbml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTAwMjQzXCI6IFwi5b2t5rC06IuX5peP5Zyf5a625peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUwMDM4MVwiOiBcIuaxn+a0peWMulwiLFxuXHQgICAgXCI1MDAzODJcIjogXCLlkIjlt53ljLpcIixcblx0ICAgIFwiNTAwMzgzXCI6IFwi5rC45bed5Yy6XCIsXG5cdCAgICBcIjUwMDM4NFwiOiBcIuWNl+W3neWMulwiLFxuXHQgICAgXCI1MDAzODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwMDAwXCI6IFwi5Zub5bed55yBXCIsXG5cdCAgICBcIjUxMDEwMFwiOiBcIuaIkOmDveW4glwiLFxuXHQgICAgXCI1MTAxMDRcIjogXCLplKbmsZ/ljLpcIixcblx0ICAgIFwiNTEwMTA1XCI6IFwi6Z2S576K5Yy6XCIsXG5cdCAgICBcIjUxMDEwNlwiOiBcIumHkeeJm+WMulwiLFxuXHQgICAgXCI1MTAxMDdcIjogXCLmrabkvq/ljLpcIixcblx0ICAgIFwiNTEwMTA4XCI6IFwi5oiQ5Y2O5Yy6XCIsXG5cdCAgICBcIjUxMDExMlwiOiBcIum+meaziempv+WMulwiLFxuXHQgICAgXCI1MTAxMTNcIjogXCLpnZLnmb3msZ/ljLpcIixcblx0ICAgIFwiNTEwMTE0XCI6IFwi5paw6YO95Yy6XCIsXG5cdCAgICBcIjUxMDExNVwiOiBcIua4qeaxn+WMulwiLFxuXHQgICAgXCI1MTAxMjFcIjogXCLph5HloILljr9cIixcblx0ICAgIFwiNTEwMTIyXCI6IFwi5Y+M5rWB5Y6/XCIsXG5cdCAgICBcIjUxMDEyNFwiOiBcIumDq+WOv1wiLFxuXHQgICAgXCI1MTAxMjlcIjogXCLlpKfpgpHljr9cIixcblx0ICAgIFwiNTEwMTMxXCI6IFwi6JKy5rGf5Y6/XCIsXG5cdCAgICBcIjUxMDEzMlwiOiBcIuaWsOa0peWOv1wiLFxuXHQgICAgXCI1MTAxODFcIjogXCLpg73msZ/loLDluIJcIixcblx0ICAgIFwiNTEwMTgyXCI6IFwi5b2t5bee5biCXCIsXG5cdCAgICBcIjUxMDE4M1wiOiBcIumCm+W0g+W4glwiLFxuXHQgICAgXCI1MTAxODRcIjogXCLltIflt57luIJcIixcblx0ICAgIFwiNTEwMTg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDMwMFwiOiBcIuiHqui0oeW4glwiLFxuXHQgICAgXCI1MTAzMDJcIjogXCLoh6rmtYHkupXljLpcIixcblx0ICAgIFwiNTEwMzAzXCI6IFwi6LSh5LqV5Yy6XCIsXG5cdCAgICBcIjUxMDMwNFwiOiBcIuWkp+WuieWMulwiLFxuXHQgICAgXCI1MTAzMTFcIjogXCLmsr/mu6nljLpcIixcblx0ICAgIFwiNTEwMzIxXCI6IFwi6I2j5Y6/XCIsXG5cdCAgICBcIjUxMDMyMlwiOiBcIuWvjOmhuuWOv1wiLFxuXHQgICAgXCI1MTAzMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwNDAwXCI6IFwi5pSA5p6d6Iqx5biCXCIsXG5cdCAgICBcIjUxMDQwMlwiOiBcIuS4nOWMulwiLFxuXHQgICAgXCI1MTA0MDNcIjogXCLopb/ljLpcIixcblx0ICAgIFwiNTEwNDExXCI6IFwi5LuB5ZKM5Yy6XCIsXG5cdCAgICBcIjUxMDQyMVwiOiBcIuexs+aYk+WOv1wiLFxuXHQgICAgXCI1MTA0MjJcIjogXCLnm5Dovrnljr9cIixcblx0ICAgIFwiNTEwNDIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDUwMFwiOiBcIuazuOW3nuW4glwiLFxuXHQgICAgXCI1MTA1MDJcIjogXCLmsZ/pmLPljLpcIixcblx0ICAgIFwiNTEwNTAzXCI6IFwi57qz5rqq5Yy6XCIsXG5cdCAgICBcIjUxMDUwNFwiOiBcIum+memprOa9reWMulwiLFxuXHQgICAgXCI1MTA1MjFcIjogXCLms7jljr9cIixcblx0ICAgIFwiNTEwNTIyXCI6IFwi5ZCI5rGf5Y6/XCIsXG5cdCAgICBcIjUxMDUyNFwiOiBcIuWPmeawuOWOv1wiLFxuXHQgICAgXCI1MTA1MjVcIjogXCLlj6TolLrljr9cIixcblx0ICAgIFwiNTEwNTI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDYwMFwiOiBcIuW+t+mYs+W4glwiLFxuXHQgICAgXCI1MTA2MDNcIjogXCLml4zpmLPljLpcIixcblx0ICAgIFwiNTEwNjIzXCI6IFwi5Lit5rGf5Y6/XCIsXG5cdCAgICBcIjUxMDYyNlwiOiBcIue9l+axn+WOv1wiLFxuXHQgICAgXCI1MTA2ODFcIjogXCLlub/msYnluIJcIixcblx0ICAgIFwiNTEwNjgyXCI6IFwi5LuA6YKh5biCXCIsXG5cdCAgICBcIjUxMDY4M1wiOiBcIue7teerueW4glwiLFxuXHQgICAgXCI1MTA2ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwNzAwXCI6IFwi57u16Ziz5biCXCIsXG5cdCAgICBcIjUxMDcwM1wiOiBcIua2quWfjuWMulwiLFxuXHQgICAgXCI1MTA3MDRcIjogXCLmuLjku5nljLpcIixcblx0ICAgIFwiNTEwNzIyXCI6IFwi5LiJ5Y+w5Y6/XCIsXG5cdCAgICBcIjUxMDcyM1wiOiBcIuebkOS6reWOv1wiLFxuXHQgICAgXCI1MTA3MjRcIjogXCLlronljr9cIixcblx0ICAgIFwiNTEwNzI1XCI6IFwi5qKT5r285Y6/XCIsXG5cdCAgICBcIjUxMDcyNlwiOiBcIuWMl+W3nee+jOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MTA3MjdcIjogXCLlubPmrabljr9cIixcblx0ICAgIFwiNTEwNzgxXCI6IFwi5rGf5rK55biCXCIsXG5cdCAgICBcIjUxMDc4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTA4MDBcIjogXCLlub/lhYPluIJcIixcblx0ICAgIFwiNTEwODAyXCI6IFwi5Yip5bee5Yy6XCIsXG5cdCAgICBcIjUxMDgxMVwiOiBcIuaYreWMluWMulwiLFxuXHQgICAgXCI1MTA4MTJcIjogXCLmnJ3lpKnljLpcIixcblx0ICAgIFwiNTEwODIxXCI6IFwi5pe66IuN5Y6/XCIsXG5cdCAgICBcIjUxMDgyMlwiOiBcIumdkuW3neWOv1wiLFxuXHQgICAgXCI1MTA4MjNcIjogXCLliZHpmIHljr9cIixcblx0ICAgIFwiNTEwODI0XCI6IFwi6IuN5rqq5Y6/XCIsXG5cdCAgICBcIjUxMDgyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTA5MDBcIjogXCLpgYLlroHluIJcIixcblx0ICAgIFwiNTEwOTAzXCI6IFwi6Ii55bGx5Yy6XCIsXG5cdCAgICBcIjUxMDkwNFwiOiBcIuWuieWxheWMulwiLFxuXHQgICAgXCI1MTA5MjFcIjogXCLok6zmuqrljr9cIixcblx0ICAgIFwiNTEwOTIyXCI6IFwi5bCE5rSq5Y6/XCIsXG5cdCAgICBcIjUxMDkyM1wiOiBcIuWkp+iLseWOv1wiLFxuXHQgICAgXCI1MTA5MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExMDAwXCI6IFwi5YaF5rGf5biCXCIsXG5cdCAgICBcIjUxMTAwMlwiOiBcIuW4guS4reWMulwiLFxuXHQgICAgXCI1MTEwMTFcIjogXCLkuJzlhbTljLpcIixcblx0ICAgIFwiNTExMDI0XCI6IFwi5aiB6L+c5Y6/XCIsXG5cdCAgICBcIjUxMTAyNVwiOiBcIui1hOS4reWOv1wiLFxuXHQgICAgXCI1MTEwMjhcIjogXCLpmobmmIzljr9cIixcblx0ICAgIFwiNTExMDI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTEwMFwiOiBcIuS5kOWxseW4glwiLFxuXHQgICAgXCI1MTExMDJcIjogXCLluILkuK3ljLpcIixcblx0ICAgIFwiNTExMTExXCI6IFwi5rKZ5rm+5Yy6XCIsXG5cdCAgICBcIjUxMTExMlwiOiBcIuS6lOmAmuahpeWMulwiLFxuXHQgICAgXCI1MTExMTNcIjogXCLph5Hlj6PmsrPljLpcIixcblx0ICAgIFwiNTExMTIzXCI6IFwi54qN5Li65Y6/XCIsXG5cdCAgICBcIjUxMTEyNFwiOiBcIuS6leeglOWOv1wiLFxuXHQgICAgXCI1MTExMjZcIjogXCLlpLnmsZ/ljr9cIixcblx0ICAgIFwiNTExMTI5XCI6IFwi5rKQ5bed5Y6/XCIsXG5cdCAgICBcIjUxMTEzMlwiOiBcIuWzqOi+ueW9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MTExMzNcIjogXCLpqazovrnlvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTExMTgxXCI6IFwi5bOo55yJ5bGx5biCXCIsXG5cdCAgICBcIjUxMTE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTEzMDBcIjogXCLljZflhYXluIJcIixcblx0ICAgIFwiNTExMzAyXCI6IFwi6aG65bqG5Yy6XCIsXG5cdCAgICBcIjUxMTMwM1wiOiBcIumrmOWdquWMulwiLFxuXHQgICAgXCI1MTEzMDRcIjogXCLlmInpmbXljLpcIixcblx0ICAgIFwiNTExMzIxXCI6IFwi5Y2X6YOo5Y6/XCIsXG5cdCAgICBcIjUxMTMyMlwiOiBcIuiQpeWxseWOv1wiLFxuXHQgICAgXCI1MTEzMjNcIjogXCLok6zlronljr9cIixcblx0ICAgIFwiNTExMzI0XCI6IFwi5Luq6ZmH5Y6/XCIsXG5cdCAgICBcIjUxMTMyNVwiOiBcIuilv+WFheWOv1wiLFxuXHQgICAgXCI1MTEzODFcIjogXCLpmIbkuK3luIJcIixcblx0ICAgIFwiNTExMzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTQwMFwiOiBcIuecieWxseW4glwiLFxuXHQgICAgXCI1MTE0MDJcIjogXCLkuJzlnaHljLpcIixcblx0ICAgIFwiNTExNDIxXCI6IFwi5LuB5a+/5Y6/XCIsXG5cdCAgICBcIjUxMTQyMlwiOiBcIuW9reWxseWOv1wiLFxuXHQgICAgXCI1MTE0MjNcIjogXCLmtKrpm4Xljr9cIixcblx0ICAgIFwiNTExNDI0XCI6IFwi5Li55qOx5Y6/XCIsXG5cdCAgICBcIjUxMTQyNVwiOiBcIumdkuelnuWOv1wiLFxuXHQgICAgXCI1MTE0MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExNTAwXCI6IFwi5a6c5a6+5biCXCIsXG5cdCAgICBcIjUxMTUwMlwiOiBcIue/oOWxj+WMulwiLFxuXHQgICAgXCI1MTE1MjFcIjogXCLlrpzlrr7ljr9cIixcblx0ICAgIFwiNTExNTIyXCI6IFwi5Y2X5rqq5Yy6XCIsXG5cdCAgICBcIjUxMTUyM1wiOiBcIuaxn+WuieWOv1wiLFxuXHQgICAgXCI1MTE1MjRcIjogXCLplb/lroHljr9cIixcblx0ICAgIFwiNTExNTI1XCI6IFwi6auY5Y6/XCIsXG5cdCAgICBcIjUxMTUyNlwiOiBcIuePmeWOv1wiLFxuXHQgICAgXCI1MTE1MjdcIjogXCLnraDov57ljr9cIixcblx0ICAgIFwiNTExNTI4XCI6IFwi5YW05paH5Y6/XCIsXG5cdCAgICBcIjUxMTUyOVwiOiBcIuWxj+WxseWOv1wiLFxuXHQgICAgXCI1MTE1MzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExNjAwXCI6IFwi5bm/5a6J5biCXCIsXG5cdCAgICBcIjUxMTYwMlwiOiBcIuW5v+WuieWMulwiLFxuXHQgICAgXCI1MTE2MDNcIjogXCLliY3plIvljLpcIixcblx0ICAgIFwiNTExNjIxXCI6IFwi5bKz5rGg5Y6/XCIsXG5cdCAgICBcIjUxMTYyMlwiOiBcIuatpuiDnOWOv1wiLFxuXHQgICAgXCI1MTE2MjNcIjogXCLpgrvmsLTljr9cIixcblx0ICAgIFwiNTExNjgxXCI6IFwi5Y2O6JOl5biCXCIsXG5cdCAgICBcIjUxMTY4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTE3MDBcIjogXCLovr7lt57luIJcIixcblx0ICAgIFwiNTExNzAyXCI6IFwi6YCa5bed5Yy6XCIsXG5cdCAgICBcIjUxMTcyMVwiOiBcIui+vuW3neWMulwiLFxuXHQgICAgXCI1MTE3MjJcIjogXCLlrqPmsYnljr9cIixcblx0ICAgIFwiNTExNzIzXCI6IFwi5byA5rGf5Y6/XCIsXG5cdCAgICBcIjUxMTcyNFwiOiBcIuWkp+erueWOv1wiLFxuXHQgICAgXCI1MTE3MjVcIjogXCLmuKDljr9cIixcblx0ICAgIFwiNTExNzgxXCI6IFwi5LiH5rqQ5biCXCIsXG5cdCAgICBcIjUxMTc4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTE4MDBcIjogXCLpm4XlronluIJcIixcblx0ICAgIFwiNTExODAyXCI6IFwi6Zuo5Z+O5Yy6XCIsXG5cdCAgICBcIjUxMTgyMVwiOiBcIuWQjeWxseWMulwiLFxuXHQgICAgXCI1MTE4MjJcIjogXCLojaXnu4/ljr9cIixcblx0ICAgIFwiNTExODIzXCI6IFwi5rGJ5rqQ5Y6/XCIsXG5cdCAgICBcIjUxMTgyNFwiOiBcIuefs+ajieWOv1wiLFxuXHQgICAgXCI1MTE4MjVcIjogXCLlpKnlhajljr9cIixcblx0ICAgIFwiNTExODI2XCI6IFwi6Iqm5bGx5Y6/XCIsXG5cdCAgICBcIjUxMTgyN1wiOiBcIuWuneWFtOWOv1wiLFxuXHQgICAgXCI1MTE4MjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExOTAwXCI6IFwi5be05Lit5biCXCIsXG5cdCAgICBcIjUxMTkwMlwiOiBcIuW3tOW3nuWMulwiLFxuXHQgICAgXCI1MTE5MDNcIjogXCLmganpmLPljLpcIixcblx0ICAgIFwiNTExOTIxXCI6IFwi6YCa5rGf5Y6/XCIsXG5cdCAgICBcIjUxMTkyMlwiOiBcIuWNl+axn+WOv1wiLFxuXHQgICAgXCI1MTE5MjNcIjogXCLlubPmmIzljr9cIixcblx0ICAgIFwiNTExOTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMjAwMFwiOiBcIui1hOmYs+W4glwiLFxuXHQgICAgXCI1MTIwMDJcIjogXCLpm4HmsZ/ljLpcIixcblx0ICAgIFwiNTEyMDIxXCI6IFwi5a6J5bKz5Y6/XCIsXG5cdCAgICBcIjUxMjAyMlwiOiBcIuS5kOiHs+WOv1wiLFxuXHQgICAgXCI1MTIwODFcIjogXCLnroDpmLPluIJcIixcblx0ICAgIFwiNTEyMDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMzIwMFwiOiBcIumYv+WdneiXj+aXj+e+jOaXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MTMyMjFcIjogXCLmsbblt53ljr9cIixcblx0ICAgIFwiNTEzMjIyXCI6IFwi55CG5Y6/XCIsXG5cdCAgICBcIjUxMzIyM1wiOiBcIuiMguWOv1wiLFxuXHQgICAgXCI1MTMyMjRcIjogXCLmnb7mvZjljr9cIixcblx0ICAgIFwiNTEzMjI1XCI6IFwi5Lmd5a+o5rKf5Y6/XCIsXG5cdCAgICBcIjUxMzIyNlwiOiBcIumHkeW3neWOv1wiLFxuXHQgICAgXCI1MTMyMjdcIjogXCLlsI/ph5Hljr9cIixcblx0ICAgIFwiNTEzMjI4XCI6IFwi6buR5rC05Y6/XCIsXG5cdCAgICBcIjUxMzIyOVwiOiBcIumprOWwlOW6t+WOv1wiLFxuXHQgICAgXCI1MTMyMzBcIjogXCLlo6TloZjljr9cIixcblx0ICAgIFwiNTEzMjMxXCI6IFwi6Zi/5Z2d5Y6/XCIsXG5cdCAgICBcIjUxMzIzMlwiOiBcIuiLpeWwlOebluWOv1wiLFxuXHQgICAgXCI1MTMyMzNcIjogXCLnuqLljp/ljr9cIixcblx0ICAgIFwiNTEzMjM0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMzMwMFwiOiBcIueUmOWtnOiXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MTMzMjFcIjogXCLlurflrprljr9cIixcblx0ICAgIFwiNTEzMzIyXCI6IFwi5rO45a6a5Y6/XCIsXG5cdCAgICBcIjUxMzMyM1wiOiBcIuS4ueW3tOWOv1wiLFxuXHQgICAgXCI1MTMzMjRcIjogXCLkuZ3pvpnljr9cIixcblx0ICAgIFwiNTEzMzI1XCI6IFwi6ZuF5rGf5Y6/XCIsXG5cdCAgICBcIjUxMzMyNlwiOiBcIumBk+WtmuWOv1wiLFxuXHQgICAgXCI1MTMzMjdcIjogXCLngonpnI3ljr9cIixcblx0ICAgIFwiNTEzMzI4XCI6IFwi55SY5a2c5Y6/XCIsXG5cdCAgICBcIjUxMzMyOVwiOiBcIuaWsOm+meWOv1wiLFxuXHQgICAgXCI1MTMzMzBcIjogXCLlvrfmoLzljr9cIixcblx0ICAgIFwiNTEzMzMxXCI6IFwi55m9546J5Y6/XCIsXG5cdCAgICBcIjUxMzMzMlwiOiBcIuefs+a4oOWOv1wiLFxuXHQgICAgXCI1MTMzMzNcIjogXCLoibLovr7ljr9cIixcblx0ICAgIFwiNTEzMzM0XCI6IFwi55CG5aGY5Y6/XCIsXG5cdCAgICBcIjUxMzMzNVwiOiBcIuW3tOWhmOWOv1wiLFxuXHQgICAgXCI1MTMzMzZcIjogXCLkuaHln47ljr9cIixcblx0ICAgIFwiNTEzMzM3XCI6IFwi56i75Z+O5Y6/XCIsXG5cdCAgICBcIjUxMzMzOFwiOiBcIuW+l+iNo+WOv1wiLFxuXHQgICAgXCI1MTMzMzlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEzNDAwXCI6IFwi5YeJ5bGx5b2d5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUxMzQwMVwiOiBcIuilv+aYjOW4glwiLFxuXHQgICAgXCI1MTM0MjJcIjogXCLmnKjph4zol4/ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTEzNDIzXCI6IFwi55uQ5rqQ5Y6/XCIsXG5cdCAgICBcIjUxMzQyNFwiOiBcIuW+t+aYjOWOv1wiLFxuXHQgICAgXCI1MTM0MjVcIjogXCLkvJrnkIbljr9cIixcblx0ICAgIFwiNTEzNDI2XCI6IFwi5Lya5Lic5Y6/XCIsXG5cdCAgICBcIjUxMzQyN1wiOiBcIuWugeWNl+WOv1wiLFxuXHQgICAgXCI1MTM0MjhcIjogXCLmma7moLzljr9cIixcblx0ICAgIFwiNTEzNDI5XCI6IFwi5biD5ouW5Y6/XCIsXG5cdCAgICBcIjUxMzQzMFwiOiBcIumHkemYs+WOv1wiLFxuXHQgICAgXCI1MTM0MzFcIjogXCLmmK3op4nljr9cIixcblx0ICAgIFwiNTEzNDMyXCI6IFwi5Zac5b635Y6/XCIsXG5cdCAgICBcIjUxMzQzM1wiOiBcIuWGleWugeWOv1wiLFxuXHQgICAgXCI1MTM0MzRcIjogXCLotoropb/ljr9cIixcblx0ICAgIFwiNTEzNDM1XCI6IFwi55SY5rSb5Y6/XCIsXG5cdCAgICBcIjUxMzQzNlwiOiBcIue+juWnkeWOv1wiLFxuXHQgICAgXCI1MTM0MzdcIjogXCLpm7fms6Lljr9cIixcblx0ICAgIFwiNTEzNDM4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMDAwMFwiOiBcIui0teW3nuecgVwiLFxuXHQgICAgXCI1MjAxMDBcIjogXCLotLXpmLPluIJcIixcblx0ICAgIFwiNTIwMTAyXCI6IFwi5Y2X5piO5Yy6XCIsXG5cdCAgICBcIjUyMDEwM1wiOiBcIuS6keWyqeWMulwiLFxuXHQgICAgXCI1MjAxMTFcIjogXCLoirHmuqrljLpcIixcblx0ICAgIFwiNTIwMTEyXCI6IFwi5LmM5b2T5Yy6XCIsXG5cdCAgICBcIjUyMDExM1wiOiBcIueZveS6keWMulwiLFxuXHQgICAgXCI1MjAxMjFcIjogXCLlvIDpmLPljr9cIixcblx0ICAgIFwiNTIwMTIyXCI6IFwi5oGv54O95Y6/XCIsXG5cdCAgICBcIjUyMDEyM1wiOiBcIuS/ruaWh+WOv1wiLFxuXHQgICAgXCI1MjAxNTFcIjogXCLop4LlsbHmuZbljLpcIixcblx0ICAgIFwiNTIwMTgxXCI6IFwi5riF6ZWH5biCXCIsXG5cdCAgICBcIjUyMDE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjAyMDBcIjogXCLlha3nm5jmsLTluIJcIixcblx0ICAgIFwiNTIwMjAxXCI6IFwi6ZKf5bGx5Yy6XCIsXG5cdCAgICBcIjUyMDIwM1wiOiBcIuWFreaeneeJueWMulwiLFxuXHQgICAgXCI1MjAyMjFcIjogXCLmsLTln47ljr9cIixcblx0ICAgIFwiNTIwMjIyXCI6IFwi55uY5Y6/XCIsXG5cdCAgICBcIjUyMDIyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjAzMDBcIjogXCLpgbXkuYnluIJcIixcblx0ICAgIFwiNTIwMzAyXCI6IFwi57qi6Iqx5bKX5Yy6XCIsXG5cdCAgICBcIjUyMDMwM1wiOiBcIuaxh+W3neWMulwiLFxuXHQgICAgXCI1MjAzMjFcIjogXCLpgbXkuYnljr9cIixcblx0ICAgIFwiNTIwMzIyXCI6IFwi5qGQ5qKT5Y6/XCIsXG5cdCAgICBcIjUyMDMyM1wiOiBcIue7pemYs+WOv1wiLFxuXHQgICAgXCI1MjAzMjRcIjogXCLmraPlronljr9cIixcblx0ICAgIFwiNTIwMzI1XCI6IFwi6YGT55yf5Luh5L2s5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMDMyNlwiOiBcIuWKoeW3neS7oeS9rOaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjAzMjdcIjogXCLlh6Tlhojljr9cIixcblx0ICAgIFwiNTIwMzI4XCI6IFwi5rmE5r2t5Y6/XCIsXG5cdCAgICBcIjUyMDMyOVwiOiBcIuS9meW6huWOv1wiLFxuXHQgICAgXCI1MjAzMzBcIjogXCLkuaDmsLTljr9cIixcblx0ICAgIFwiNTIwMzgxXCI6IFwi6LWk5rC05biCXCIsXG5cdCAgICBcIjUyMDM4MlwiOiBcIuS7geaAgOW4glwiLFxuXHQgICAgXCI1MjAzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIwNDAwXCI6IFwi5a6J6aG65biCXCIsXG5cdCAgICBcIjUyMDQwMlwiOiBcIuilv+engOWMulwiLFxuXHQgICAgXCI1MjA0MjFcIjogXCLlubPlnZ3ljr9cIixcblx0ICAgIFwiNTIwNDIyXCI6IFwi5pmu5a6a5Y6/XCIsXG5cdCAgICBcIjUyMDQyM1wiOiBcIumVh+WugeW4g+S+neaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjA0MjRcIjogXCLlhbPlsq3luIPkvp3ml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIwNDI1XCI6IFwi57Sr5LqR6IuX5peP5biD5L6d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMDQyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjIyMDBcIjogXCLpk5zku4HluIJcIixcblx0ICAgIFwiNTIyMjAxXCI6IFwi56Kn5rGf5Yy6XCIsXG5cdCAgICBcIjUyMjIyMlwiOiBcIuaxn+WPo+WOv1wiLFxuXHQgICAgXCI1MjIyMjNcIjogXCLnjonlsY/kvpfml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIyMjI0XCI6IFwi55+z6Zih5Y6/XCIsXG5cdCAgICBcIjUyMjIyNVwiOiBcIuaAneWNl+WOv1wiLFxuXHQgICAgXCI1MjIyMjZcIjogXCLljbDmsZ/lnJ/lrrbml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIyMjI3XCI6IFwi5b635rGf5Y6/XCIsXG5cdCAgICBcIjUyMjIyOFwiOiBcIuayv+ays+Wcn+WutuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjIyMjlcIjogXCLmnb7moYPoi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIyMjMwXCI6IFwi5LiH5bGx5Yy6XCIsXG5cdCAgICBcIjUyMjIzMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjIzMDBcIjogXCLpu5Topb/ljZfluIPkvp3ml4/oi5fml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTIyMzAxXCI6IFwi5YW05LmJ5biCXCIsXG5cdCAgICBcIjUyMjMyMlwiOiBcIuWFtOS7geWOv1wiLFxuXHQgICAgXCI1MjIzMjNcIjogXCLmma7lronljr9cIixcblx0ICAgIFwiNTIyMzI0XCI6IFwi5pm06ZqG5Y6/XCIsXG5cdCAgICBcIjUyMjMyNVwiOiBcIui0nuS4sOWOv1wiLFxuXHQgICAgXCI1MjIzMjZcIjogXCLmnJvosJ/ljr9cIixcblx0ICAgIFwiNTIyMzI3XCI6IFwi5YaM5Lqo5Y6/XCIsXG5cdCAgICBcIjUyMjMyOFwiOiBcIuWuiem+meWOv1wiLFxuXHQgICAgXCI1MjIzMjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIyNDAwXCI6IFwi5q+V6IqC5biCXCIsXG5cdCAgICBcIjUyMjQwMVwiOiBcIuS4g+aYn+WFs+WMulwiLFxuXHQgICAgXCI1MjI0MjJcIjogXCLlpKfmlrnljr9cIixcblx0ICAgIFwiNTIyNDIzXCI6IFwi6buU6KW/5Y6/XCIsXG5cdCAgICBcIjUyMjQyNFwiOiBcIumHkeaymeWOv1wiLFxuXHQgICAgXCI1MjI0MjVcIjogXCLnu4fph5Hljr9cIixcblx0ICAgIFwiNTIyNDI2XCI6IFwi57qz6ZuN5Y6/XCIsXG5cdCAgICBcIjUyMjQyN1wiOiBcIuWogeWugeW9neaXj+WbnuaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjI0MjhcIjogXCLotavnq6Dljr9cIixcblx0ICAgIFwiNTIyNDI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMjYwMFwiOiBcIum7lOS4nOWNl+iLl+aXj+S+l+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MjI2MDFcIjogXCLlh6/ph4zluIJcIixcblx0ICAgIFwiNTIyNjIyXCI6IFwi6buE5bmz5Y6/XCIsXG5cdCAgICBcIjUyMjYyM1wiOiBcIuaWveenieWOv1wiLFxuXHQgICAgXCI1MjI2MjRcIjogXCLkuInnqZfljr9cIixcblx0ICAgIFwiNTIyNjI1XCI6IFwi6ZWH6L+c5Y6/XCIsXG5cdCAgICBcIjUyMjYyNlwiOiBcIuWykeW3qeWOv1wiLFxuXHQgICAgXCI1MjI2MjdcIjogXCLlpKnmn7Hljr9cIixcblx0ICAgIFwiNTIyNjI4XCI6IFwi6ZSm5bGP5Y6/XCIsXG5cdCAgICBcIjUyMjYyOVwiOiBcIuWJkeays+WOv1wiLFxuXHQgICAgXCI1MjI2MzBcIjogXCLlj7DmsZ/ljr9cIixcblx0ICAgIFwiNTIyNjMxXCI6IFwi6buO5bmz5Y6/XCIsXG5cdCAgICBcIjUyMjYzMlwiOiBcIuamleaxn+WOv1wiLFxuXHQgICAgXCI1MjI2MzNcIjogXCLku47msZ/ljr9cIixcblx0ICAgIFwiNTIyNjM0XCI6IFwi6Zu35bGx5Y6/XCIsXG5cdCAgICBcIjUyMjYzNVwiOiBcIum6u+axn+WOv1wiLFxuXHQgICAgXCI1MjI2MzZcIjogXCLkuLnlr6jljr9cIixcblx0ICAgIFwiNTIyNjM3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMjcwMFwiOiBcIum7lOWNl+W4g+S+neaXj+iLl+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MjI3MDFcIjogXCLpg73ljIDluIJcIixcblx0ICAgIFwiNTIyNzAyXCI6IFwi56aP5rOJ5biCXCIsXG5cdCAgICBcIjUyMjcyMlwiOiBcIuiNlOazouWOv1wiLFxuXHQgICAgXCI1MjI3MjNcIjogXCLotLXlrprljr9cIixcblx0ICAgIFwiNTIyNzI1XCI6IFwi55Ou5a6J5Y6/XCIsXG5cdCAgICBcIjUyMjcyNlwiOiBcIueLrOWxseWOv1wiLFxuXHQgICAgXCI1MjI3MjdcIjogXCLlubPloZjljr9cIixcblx0ICAgIFwiNTIyNzI4XCI6IFwi572X55S45Y6/XCIsXG5cdCAgICBcIjUyMjcyOVwiOiBcIumVv+mhuuWOv1wiLFxuXHQgICAgXCI1MjI3MzBcIjogXCLpvpnph4zljr9cIixcblx0ICAgIFwiNTIyNzMxXCI6IFwi5oOg5rC05Y6/XCIsXG5cdCAgICBcIjUyMjczMlwiOiBcIuS4iemDveawtOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjI3MzNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwMDAwXCI6IFwi5LqR5Y2X55yBXCIsXG5cdCAgICBcIjUzMDEwMFwiOiBcIuaYhuaYjuW4glwiLFxuXHQgICAgXCI1MzAxMDJcIjogXCLkupTljY7ljLpcIixcblx0ICAgIFwiNTMwMTAzXCI6IFwi55uY6b6Z5Yy6XCIsXG5cdCAgICBcIjUzMDExMVwiOiBcIuWumOa4oeWMulwiLFxuXHQgICAgXCI1MzAxMTJcIjogXCLopb/lsbHljLpcIixcblx0ICAgIFwiNTMwMTEzXCI6IFwi5Lic5bed5Yy6XCIsXG5cdCAgICBcIjUzMDEyMVwiOiBcIuWRiOi0oeWMulwiLFxuXHQgICAgXCI1MzAxMjJcIjogXCLmmYvlroHljr9cIixcblx0ICAgIFwiNTMwMTI0XCI6IFwi5a+M5rCR5Y6/XCIsXG5cdCAgICBcIjUzMDEyNVwiOiBcIuWunOiJr+WOv1wiLFxuXHQgICAgXCI1MzAxMjZcIjogXCLnn7PmnpflvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwMTI3XCI6IFwi5bWp5piO5Y6/XCIsXG5cdCAgICBcIjUzMDEyOFwiOiBcIuemhOWKneW9neaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzAxMjlcIjogXCLlr7vnlLjlm57ml4/lvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwMTgxXCI6IFwi5a6J5a6B5biCXCIsXG5cdCAgICBcIjUzMDE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzAzMDBcIjogXCLmm7LpnZbluIJcIixcblx0ICAgIFwiNTMwMzAyXCI6IFwi6bqS6bqf5Yy6XCIsXG5cdCAgICBcIjUzMDMyMVwiOiBcIumprOm+meWOv1wiLFxuXHQgICAgXCI1MzAzMjJcIjogXCLpmYboia/ljr9cIixcblx0ICAgIFwiNTMwMzIzXCI6IFwi5biI5a6X5Y6/XCIsXG5cdCAgICBcIjUzMDMyNFwiOiBcIue9l+W5s+WOv1wiLFxuXHQgICAgXCI1MzAzMjVcIjogXCLlr4zmupDljr9cIixcblx0ICAgIFwiNTMwMzI2XCI6IFwi5Lya5rO95Y6/XCIsXG5cdCAgICBcIjUzMDMyOFwiOiBcIuayvuebiuWOv1wiLFxuXHQgICAgXCI1MzAzODFcIjogXCLlrqPlqIHluIJcIixcblx0ICAgIFwiNTMwMzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDQwMFwiOiBcIueOiea6quW4glwiLFxuXHQgICAgXCI1MzA0MDJcIjogXCLnuqLloZTljLpcIixcblx0ICAgIFwiNTMwNDIxXCI6IFwi5rGf5bed5Y6/XCIsXG5cdCAgICBcIjUzMDQyMlwiOiBcIua+hOaxn+WOv1wiLFxuXHQgICAgXCI1MzA0MjNcIjogXCLpgJrmtbfljr9cIixcblx0ICAgIFwiNTMwNDI0XCI6IFwi5Y2O5a6B5Y6/XCIsXG5cdCAgICBcIjUzMDQyNVwiOiBcIuaYk+mXqOWOv1wiLFxuXHQgICAgXCI1MzA0MjZcIjogXCLls6jlsbHlvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwNDI3XCI6IFwi5paw5bmz5b2d5peP5YKj5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDQyOFwiOiBcIuWFg+axn+WTiOWwvOaXj+W9neaXj+WCo+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA0MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwNTAwXCI6IFwi5L+d5bGx5biCXCIsXG5cdCAgICBcIjUzMDUwMlwiOiBcIumahumYs+WMulwiLFxuXHQgICAgXCI1MzA1MjFcIjogXCLmlr3nlLjljr9cIixcblx0ICAgIFwiNTMwNTIyXCI6IFwi6IW+5Yay5Y6/XCIsXG5cdCAgICBcIjUzMDUyM1wiOiBcIum+memZteWOv1wiLFxuXHQgICAgXCI1MzA1MjRcIjogXCLmmIzlroHljr9cIixcblx0ICAgIFwiNTMwNTI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDYwMFwiOiBcIuaYremAmuW4glwiLFxuXHQgICAgXCI1MzA2MDJcIjogXCLmmK3pmLPljLpcIixcblx0ICAgIFwiNTMwNjIxXCI6IFwi6bKB55S45Y6/XCIsXG5cdCAgICBcIjUzMDYyMlwiOiBcIuW3p+WutuWOv1wiLFxuXHQgICAgXCI1MzA2MjNcIjogXCLnm5DmtKXljr9cIixcblx0ICAgIFwiNTMwNjI0XCI6IFwi5aSn5YWz5Y6/XCIsXG5cdCAgICBcIjUzMDYyNVwiOiBcIuawuOWWhOWOv1wiLFxuXHQgICAgXCI1MzA2MjZcIjogXCLnu6XmsZ/ljr9cIixcblx0ICAgIFwiNTMwNjI3XCI6IFwi6ZWH6ZuE5Y6/XCIsXG5cdCAgICBcIjUzMDYyOFwiOiBcIuW9neiJr+WOv1wiLFxuXHQgICAgXCI1MzA2MjlcIjogXCLlqIHkv6Hljr9cIixcblx0ICAgIFwiNTMwNjMwXCI6IFwi5rC05a+M5Y6/XCIsXG5cdCAgICBcIjUzMDYzMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzA3MDBcIjogXCLkuL3msZ/luIJcIixcblx0ICAgIFwiNTMwNzAyXCI6IFwi5Y+k5Z+O5Yy6XCIsXG5cdCAgICBcIjUzMDcyMVwiOiBcIueOiem+mee6s+ilv+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA3MjJcIjogXCLmsLjog5zljr9cIixcblx0ICAgIFwiNTMwNzIzXCI6IFwi5Y2O5Z2q5Y6/XCIsXG5cdCAgICBcIjUzMDcyNFwiOiBcIuWugeiSl+W9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA3MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwODAwXCI6IFwi5pmu5rSx5biCXCIsXG5cdCAgICBcIjUzMDgwMlwiOiBcIuaAneiMheWMulwiLFxuXHQgICAgXCI1MzA4MjFcIjogXCLlroHmtLHlk4jlsLzml4/lvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODIyXCI6IFwi5aKo5rGf5ZOI5bC85peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyM1wiOiBcIuaZr+S4nOW9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjRcIjogXCLmma/osLflgqPml4/lvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODI1XCI6IFwi6ZWH5rKF5b2d5peP5ZOI5bC85peP5ouJ56Wc5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyNlwiOiBcIuaxn+WfjuWTiOWwvOaXj+W9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjdcIjogXCLlrZ/ov57lgqPml4/mi4nnpZzml4/kvaTml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODI4XCI6IFwi5r6c5rKn5ouJ56Wc5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyOVwiOiBcIuilv+ebn+S9pOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwOTAwXCI6IFwi5Li05rKn5biCXCIsXG5cdCAgICBcIjUzMDkwMlwiOiBcIuS4tOe/lOWMulwiLFxuXHQgICAgXCI1MzA5MjFcIjogXCLlh6Tluobljr9cIixcblx0ICAgIFwiNTMwOTIyXCI6IFwi5LqR5Y6/XCIsXG5cdCAgICBcIjUzMDkyM1wiOiBcIuawuOW+t+WOv1wiLFxuXHQgICAgXCI1MzA5MjRcIjogXCLplYflurfljr9cIixcblx0ICAgIFwiNTMwOTI1XCI6IFwi5Y+M5rGf5ouJ56Wc5peP5L2k5peP5biD5pyX5peP5YKj5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDkyNlwiOiBcIuiAv+mprOWCo+aXj+S9pOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA5MjdcIjogXCLmsqfmupDkvaTml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwOTI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMjMwMFwiOiBcIualmumbhOW9neaXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzIzMDFcIjogXCLmpZrpm4TluIJcIixcblx0ICAgIFwiNTMyMzIyXCI6IFwi5Y+M5p+P5Y6/XCIsXG5cdCAgICBcIjUzMjMyM1wiOiBcIueJn+WumuWOv1wiLFxuXHQgICAgXCI1MzIzMjRcIjogXCLljZfljY7ljr9cIixcblx0ICAgIFwiNTMyMzI1XCI6IFwi5aea5a6J5Y6/XCIsXG5cdCAgICBcIjUzMjMyNlwiOiBcIuWkp+WnmuWOv1wiLFxuXHQgICAgXCI1MzIzMjdcIjogXCLmsLjku4Hljr9cIixcblx0ICAgIFwiNTMyMzI4XCI6IFwi5YWD6LCL5Y6/XCIsXG5cdCAgICBcIjUzMjMyOVwiOiBcIuatpuWumuWOv1wiLFxuXHQgICAgXCI1MzIzMzFcIjogXCLnpoTkuLDljr9cIixcblx0ICAgIFwiNTMyMzMyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMjUwMFwiOiBcIue6ouays+WTiOWwvOaXj+W9neaXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzI1MDFcIjogXCLkuKrml6fluIJcIixcblx0ICAgIFwiNTMyNTAyXCI6IFwi5byA6L+c5biCXCIsXG5cdCAgICBcIjUzMjUyMlwiOiBcIuiSmeiHquW4glwiLFxuXHQgICAgXCI1MzI1MjNcIjogXCLlsY/ovrnoi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMyNTI0XCI6IFwi5bu65rC05Y6/XCIsXG5cdCAgICBcIjUzMjUyNVwiOiBcIuefs+Wxj+WOv1wiLFxuXHQgICAgXCI1MzI1MjZcIjogXCLlvKXli5LluIJcIixcblx0ICAgIFwiNTMyNTI3XCI6IFwi5rO46KW/5Y6/XCIsXG5cdCAgICBcIjUzMjUyOFwiOiBcIuWFg+mYs+WOv1wiLFxuXHQgICAgXCI1MzI1MjlcIjogXCLnuqLmsrPljr9cIixcblx0ICAgIFwiNTMyNTMwXCI6IFwi6YeR5bmz6IuX5peP55G25peP5YKj5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMjUzMVwiOiBcIue7v+aYpeWOv1wiLFxuXHQgICAgXCI1MzI1MzJcIjogXCLmsrPlj6Pnkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMyNTMzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMjYwMFwiOiBcIuaWh+WxseWjruaXj+iLl+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzI2MjFcIjogXCLmloflsbHluIJcIixcblx0ICAgIFwiNTMyNjIyXCI6IFwi56Ca5bGx5Y6/XCIsXG5cdCAgICBcIjUzMjYyM1wiOiBcIuilv+eVtOWOv1wiLFxuXHQgICAgXCI1MzI2MjRcIjogXCLpurvmoJflnaHljr9cIixcblx0ICAgIFwiNTMyNjI1XCI6IFwi6ams5YWz5Y6/XCIsXG5cdCAgICBcIjUzMjYyNlwiOiBcIuS4mOWMl+WOv1wiLFxuXHQgICAgXCI1MzI2MjdcIjogXCLlub/ljZfljr9cIixcblx0ICAgIFwiNTMyNjI4XCI6IFwi5a+M5a6B5Y6/XCIsXG5cdCAgICBcIjUzMjYyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzI4MDBcIjogXCLopb/lj4zniYjnurPlgqPml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMyODAxXCI6IFwi5pmv5rSq5biCXCIsXG5cdCAgICBcIjUzMjgyMlwiOiBcIuWLkOa1t+WOv1wiLFxuXHQgICAgXCI1MzI4MjNcIjogXCLli5DohYrljr9cIixcblx0ICAgIFwiNTMyODI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMjkwMFwiOiBcIuWkp+eQhueZveaXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzI5MDFcIjogXCLlpKfnkIbluIJcIixcblx0ICAgIFwiNTMyOTIyXCI6IFwi5ry+5r+e5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMjkyM1wiOiBcIuelpeS6keWOv1wiLFxuXHQgICAgXCI1MzI5MjRcIjogXCLlrr7lt53ljr9cIixcblx0ICAgIFwiNTMyOTI1XCI6IFwi5byl5rih5Y6/XCIsXG5cdCAgICBcIjUzMjkyNlwiOiBcIuWNl+a2p+W9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzI5MjdcIjogXCLlt43lsbHlvZ3ml4/lm57ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMyOTI4XCI6IFwi5rC45bmz5Y6/XCIsXG5cdCAgICBcIjUzMjkyOVwiOiBcIuS6kem+meWOv1wiLFxuXHQgICAgXCI1MzI5MzBcIjogXCLmtLHmupDljr9cIixcblx0ICAgIFwiNTMyOTMxXCI6IFwi5YmR5bed5Y6/XCIsXG5cdCAgICBcIjUzMjkzMlwiOiBcIum5pOW6huWOv1wiLFxuXHQgICAgXCI1MzI5MzNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMzMTAwXCI6IFwi5b635a6P5YKj5peP5pmv6aKH5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMzEwMlwiOiBcIueRnuS4veW4glwiLFxuXHQgICAgXCI1MzMxMDNcIjogXCLoipLluIJcIixcblx0ICAgIFwiNTMzMTIyXCI6IFwi5qKB5rKz5Y6/XCIsXG5cdCAgICBcIjUzMzEyM1wiOiBcIuebiOaxn+WOv1wiLFxuXHQgICAgXCI1MzMxMjRcIjogXCLpmYflt53ljr9cIixcblx0ICAgIFwiNTMzMTI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMzMwMFwiOiBcIuaAkuaxn+WCiOWDs+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzMzMjFcIjogXCLms7jmsLTljr9cIixcblx0ICAgIFwiNTMzMzIzXCI6IFwi56aP6LSh5Y6/XCIsXG5cdCAgICBcIjUzMzMyNFwiOiBcIui0oeWxseeLrOm+meaXj+aAkuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzMzMjVcIjogXCLlhbDlnarnmb3ml4/mma7nsbPml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMzMzI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMzQwMFwiOiBcIui/quW6huiXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzM0MjFcIjogXCLpppnmoLzph4zmi4nljr9cIixcblx0ICAgIFwiNTMzNDIyXCI6IFwi5b636ZKm5Y6/XCIsXG5cdCAgICBcIjUzMzQyM1wiOiBcIue7tOilv+WCiOWDs+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzM0MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTQwMDAwXCI6IFwi6KW/6JeP6Ieq5rK75Yy6XCIsXG5cdCAgICBcIjU0MDEwMFwiOiBcIuaLieiQqOW4glwiLFxuXHQgICAgXCI1NDAxMDJcIjogXCLln47lhbPljLpcIixcblx0ICAgIFwiNTQwMTIxXCI6IFwi5p6X5ZGo5Y6/XCIsXG5cdCAgICBcIjU0MDEyMlwiOiBcIuW9k+mbhOWOv1wiLFxuXHQgICAgXCI1NDAxMjNcIjogXCLlsLzmnKjljr9cIixcblx0ICAgIFwiNTQwMTI0XCI6IFwi5puy5rC05Y6/XCIsXG5cdCAgICBcIjU0MDEyNVwiOiBcIuWghum+meW+t+W6huWOv1wiLFxuXHQgICAgXCI1NDAxMjZcIjogXCLovr7lrZzljr9cIixcblx0ICAgIFwiNTQwMTI3XCI6IFwi5aKo56u55bel5Y2h5Y6/XCIsXG5cdCAgICBcIjU0MDEyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1NDIxMDBcIjogXCLmmIzpg73lnLDljLpcIixcblx0ICAgIFwiNTQyMTIxXCI6IFwi5piM6YO95Y6/XCIsXG5cdCAgICBcIjU0MjEyMlwiOiBcIuaxn+i+vuWOv1wiLFxuXHQgICAgXCI1NDIxMjNcIjogXCLotKHop4nljr9cIixcblx0ICAgIFwiNTQyMTI0XCI6IFwi57G75LmM6b2Q5Y6/XCIsXG5cdCAgICBcIjU0MjEyNVwiOiBcIuS4gemdkuWOv1wiLFxuXHQgICAgXCI1NDIxMjZcIjogXCLlr5/pm4Xljr9cIixcblx0ICAgIFwiNTQyMTI3XCI6IFwi5YWr5a6/5Y6/XCIsXG5cdCAgICBcIjU0MjEyOFwiOiBcIuW3pui0oeWOv1wiLFxuXHQgICAgXCI1NDIxMjlcIjogXCLoipLlurfljr9cIixcblx0ICAgIFwiNTQyMTMyXCI6IFwi5rSb6ZqG5Y6/XCIsXG5cdCAgICBcIjU0MjEzM1wiOiBcIui+ueWdneWOv1wiLFxuXHQgICAgXCI1NDIxMzRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTQyMjAwXCI6IFwi5bGx5Y2X5Zyw5Yy6XCIsXG5cdCAgICBcIjU0MjIyMVwiOiBcIuS5g+S4nOWOv1wiLFxuXHQgICAgXCI1NDIyMjJcIjogXCLmiY7lm4rljr9cIixcblx0ICAgIFwiNTQyMjIzXCI6IFwi6LSh5ZiO5Y6/XCIsXG5cdCAgICBcIjU0MjIyNFwiOiBcIuahkeaXpeWOv1wiLFxuXHQgICAgXCI1NDIyMjVcIjogXCLnkLznu5Pljr9cIixcblx0ICAgIFwiNTQyMjI2XCI6IFwi5puy5p2+5Y6/XCIsXG5cdCAgICBcIjU0MjIyN1wiOiBcIuaOque+juWOv1wiLFxuXHQgICAgXCI1NDIyMjhcIjogXCLmtJvmiY7ljr9cIixcblx0ICAgIFwiNTQyMjI5XCI6IFwi5Yqg5p+l5Y6/XCIsXG5cdCAgICBcIjU0MjIzMVwiOiBcIumahuWtkOWOv1wiLFxuXHQgICAgXCI1NDIyMzJcIjogXCLplJnpgqPljr9cIixcblx0ICAgIFwiNTQyMjMzXCI6IFwi5rWq5Y2h5a2Q5Y6/XCIsXG5cdCAgICBcIjU0MjIzNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1NDIzMDBcIjogXCLml6XlloDliJnlnLDljLpcIixcblx0ICAgIFwiNTQyMzAxXCI6IFwi5pel5ZaA5YiZ5biCXCIsXG5cdCAgICBcIjU0MjMyMlwiOiBcIuWNl+acqOael+WOv1wiLFxuXHQgICAgXCI1NDIzMjNcIjogXCLmsZ/lrZzljr9cIixcblx0ICAgIFwiNTQyMzI0XCI6IFwi5a6a5pel5Y6/XCIsXG5cdCAgICBcIjU0MjMyNVwiOiBcIuiQqOi/puWOv1wiLFxuXHQgICAgXCI1NDIzMjZcIjogXCLmi4nlrZzljr9cIixcblx0ICAgIFwiNTQyMzI3XCI6IFwi5piC5LuB5Y6/XCIsXG5cdCAgICBcIjU0MjMyOFwiOiBcIuiwoumAmumXqOWOv1wiLFxuXHQgICAgXCI1NDIzMjlcIjogXCLnmb3mnJfljr9cIixcblx0ICAgIFwiNTQyMzMwXCI6IFwi5LuB5biD5Y6/XCIsXG5cdCAgICBcIjU0MjMzMVwiOiBcIuW6t+mprOWOv1wiLFxuXHQgICAgXCI1NDIzMzJcIjogXCLlrprnu5Pljr9cIixcblx0ICAgIFwiNTQyMzMzXCI6IFwi5Luy5be05Y6/XCIsXG5cdCAgICBcIjU0MjMzNFwiOiBcIuS6muS4nOWOv1wiLFxuXHQgICAgXCI1NDIzMzVcIjogXCLlkInpmobljr9cIixcblx0ICAgIFwiNTQyMzM2XCI6IFwi6IGC5ouJ5pyo5Y6/XCIsXG5cdCAgICBcIjU0MjMzN1wiOiBcIuiQqOWYjuWOv1wiLFxuXHQgICAgXCI1NDIzMzhcIjogXCLlspflt7Tljr9cIixcblx0ICAgIFwiNTQyMzM5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjU0MjQwMFwiOiBcIumCo+absuWcsOWMulwiLFxuXHQgICAgXCI1NDI0MjFcIjogXCLpgqPmm7Lljr9cIixcblx0ICAgIFwiNTQyNDIyXCI6IFwi5ZiJ6buO5Y6/XCIsXG5cdCAgICBcIjU0MjQyM1wiOiBcIuavlOWmguWOv1wiLFxuXHQgICAgXCI1NDI0MjRcIjogXCLogYLojaPljr9cIixcblx0ICAgIFwiNTQyNDI1XCI6IFwi5a6J5aSa5Y6/XCIsXG5cdCAgICBcIjU0MjQyNlwiOiBcIueUs+aJjuWOv1wiLFxuXHQgICAgXCI1NDI0MjdcIjogXCLntKLljr9cIixcblx0ICAgIFwiNTQyNDI4XCI6IFwi54+t5oiI5Y6/XCIsXG5cdCAgICBcIjU0MjQyOVwiOiBcIuW3tOmdkuWOv1wiLFxuXHQgICAgXCI1NDI0MzBcIjogXCLlsLznjpvljr9cIixcblx0ICAgIFwiNTQyNDMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjU0MjQzMlwiOiBcIuWPjOa5luWOv1wiLFxuXHQgICAgXCI1NDI1MDBcIjogXCLpmL/ph4zlnLDljLpcIixcblx0ICAgIFwiNTQyNTIxXCI6IFwi5pmu5YWw5Y6/XCIsXG5cdCAgICBcIjU0MjUyMlwiOiBcIuacrei+vuWOv1wiLFxuXHQgICAgXCI1NDI1MjNcIjogXCLlmbblsJTljr9cIixcblx0ICAgIFwiNTQyNTI0XCI6IFwi5pel5Zyf5Y6/XCIsXG5cdCAgICBcIjU0MjUyNVwiOiBcIumdqeWQieWOv1wiLFxuXHQgICAgXCI1NDI1MjZcIjogXCLmlLnliJnljr9cIixcblx0ICAgIFwiNTQyNTI3XCI6IFwi5o6q5Yuk5Y6/XCIsXG5cdCAgICBcIjU0MjUyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1NDI2MDBcIjogXCLmnpfoip3lnLDljLpcIixcblx0ICAgIFwiNTQyNjIxXCI6IFwi5p6X6Iqd5Y6/XCIsXG5cdCAgICBcIjU0MjYyMlwiOiBcIuW3peW4g+axn+i+vuWOv1wiLFxuXHQgICAgXCI1NDI2MjNcIjogXCLnsbPmnpfljr9cIixcblx0ICAgIFwiNTQyNjI0XCI6IFwi5aKo6ISx5Y6/XCIsXG5cdCAgICBcIjU0MjYyNVwiOiBcIuazouWvhuWOv1wiLFxuXHQgICAgXCI1NDI2MjZcIjogXCLlr5/pmoXljr9cIixcblx0ICAgIFwiNTQyNjI3XCI6IFwi5pyX5Y6/XCIsXG5cdCAgICBcIjU0MjYyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTAwMDBcIjogXCLpmZXopb/nnIFcIixcblx0ICAgIFwiNjEwMTAwXCI6IFwi6KW/5a6J5biCXCIsXG5cdCAgICBcIjYxMDEwMlwiOiBcIuaWsOWfjuWMulwiLFxuXHQgICAgXCI2MTAxMDNcIjogXCLnopHmnpfljLpcIixcblx0ICAgIFwiNjEwMTA0XCI6IFwi6I6y5rmW5Yy6XCIsXG5cdCAgICBcIjYxMDExMVwiOiBcIueBnuahpeWMulwiLFxuXHQgICAgXCI2MTAxMTJcIjogXCLmnKrlpK7ljLpcIixcblx0ICAgIFwiNjEwMTEzXCI6IFwi6ZuB5aGU5Yy6XCIsXG5cdCAgICBcIjYxMDExNFwiOiBcIumYjuiJr+WMulwiLFxuXHQgICAgXCI2MTAxMTVcIjogXCLkuLTmvbzljLpcIixcblx0ICAgIFwiNjEwMTE2XCI6IFwi6ZW/5a6J5Yy6XCIsXG5cdCAgICBcIjYxMDEyMlwiOiBcIuiTneeUsOWOv1wiLFxuXHQgICAgXCI2MTAxMjRcIjogXCLlkajoh7Pljr9cIixcblx0ICAgIFwiNjEwMTI1XCI6IFwi5oi35Y6/XCIsXG5cdCAgICBcIjYxMDEyNlwiOiBcIumrmOmZteWOv1wiLFxuXHQgICAgXCI2MTAxMjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwMjAwXCI6IFwi6ZOc5bed5biCXCIsXG5cdCAgICBcIjYxMDIwMlwiOiBcIueOi+ebiuWMulwiLFxuXHQgICAgXCI2MTAyMDNcIjogXCLljbDlj7DljLpcIixcblx0ICAgIFwiNjEwMjA0XCI6IFwi6ICA5bee5Yy6XCIsXG5cdCAgICBcIjYxMDIyMlwiOiBcIuWunOWQm+WOv1wiLFxuXHQgICAgXCI2MTAyMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwMzAwXCI6IFwi5a6d6bih5biCXCIsXG5cdCAgICBcIjYxMDMwMlwiOiBcIua4rea7qOWMulwiLFxuXHQgICAgXCI2MTAzMDNcIjogXCLph5Hlj7DljLpcIixcblx0ICAgIFwiNjEwMzA0XCI6IFwi6ZmI5LuT5Yy6XCIsXG5cdCAgICBcIjYxMDMyMlwiOiBcIuWHpOe/lOWOv1wiLFxuXHQgICAgXCI2MTAzMjNcIjogXCLlspDlsbHljr9cIixcblx0ICAgIFwiNjEwMzI0XCI6IFwi5om26aOO5Y6/XCIsXG5cdCAgICBcIjYxMDMyNlwiOiBcIuecieWOv1wiLFxuXHQgICAgXCI2MTAzMjdcIjogXCLpmYfljr9cIixcblx0ICAgIFwiNjEwMzI4XCI6IFwi5Y2D6Ziz5Y6/XCIsXG5cdCAgICBcIjYxMDMyOVwiOiBcIum6n+a4uOWOv1wiLFxuXHQgICAgXCI2MTAzMzBcIjogXCLlh6Tljr9cIixcblx0ICAgIFwiNjEwMzMxXCI6IFwi5aSq55m95Y6/XCIsXG5cdCAgICBcIjYxMDMzMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTA0MDBcIjogXCLlkrjpmLPluIJcIixcblx0ICAgIFwiNjEwNDAyXCI6IFwi56em6YO95Yy6XCIsXG5cdCAgICBcIjYxMDQwM1wiOiBcIuadqOmZteWMulwiLFxuXHQgICAgXCI2MTA0MDRcIjogXCLmuK3ln47ljLpcIixcblx0ICAgIFwiNjEwNDIyXCI6IFwi5LiJ5Y6f5Y6/XCIsXG5cdCAgICBcIjYxMDQyM1wiOiBcIuazvumYs+WOv1wiLFxuXHQgICAgXCI2MTA0MjRcIjogXCLkub7ljr9cIixcblx0ICAgIFwiNjEwNDI1XCI6IFwi56S85rOJ5Y6/XCIsXG5cdCAgICBcIjYxMDQyNlwiOiBcIuawuOWvv+WOv1wiLFxuXHQgICAgXCI2MTA0MjdcIjogXCLlvazljr9cIixcblx0ICAgIFwiNjEwNDI4XCI6IFwi6ZW/5q2m5Y6/XCIsXG5cdCAgICBcIjYxMDQyOVwiOiBcIuaXrOmCkeWOv1wiLFxuXHQgICAgXCI2MTA0MzBcIjogXCLmt7PljJbljr9cIixcblx0ICAgIFwiNjEwNDMxXCI6IFwi5q2m5Yqf5Y6/XCIsXG5cdCAgICBcIjYxMDQ4MVwiOiBcIuWFtOW5s+W4glwiLFxuXHQgICAgXCI2MTA0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwNTAwXCI6IFwi5rit5Y2X5biCXCIsXG5cdCAgICBcIjYxMDUwMlwiOiBcIuS4tOa4reWMulwiLFxuXHQgICAgXCI2MTA1MjFcIjogXCLljY7ljr9cIixcblx0ICAgIFwiNjEwNTIyXCI6IFwi5r285YWz5Y6/XCIsXG5cdCAgICBcIjYxMDUyM1wiOiBcIuWkp+iNlOWOv1wiLFxuXHQgICAgXCI2MTA1MjRcIjogXCLlkIjpmLPljr9cIixcblx0ICAgIFwiNjEwNTI1XCI6IFwi5r6E5Z+O5Y6/XCIsXG5cdCAgICBcIjYxMDUyNlwiOiBcIuiSsuWfjuWOv1wiLFxuXHQgICAgXCI2MTA1MjdcIjogXCLnmb3msLTljr9cIixcblx0ICAgIFwiNjEwNTI4XCI6IFwi5a+M5bmz5Y6/XCIsXG5cdCAgICBcIjYxMDU4MVwiOiBcIumfqeWfjuW4glwiLFxuXHQgICAgXCI2MTA1ODJcIjogXCLljY7pmLTluIJcIixcblx0ICAgIFwiNjEwNTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDYwMFwiOiBcIuW7tuWuieW4glwiLFxuXHQgICAgXCI2MTA2MDJcIjogXCLlrp3loZTljLpcIixcblx0ICAgIFwiNjEwNjIxXCI6IFwi5bu26ZW/5Y6/XCIsXG5cdCAgICBcIjYxMDYyMlwiOiBcIuW7tuW3neWOv1wiLFxuXHQgICAgXCI2MTA2MjNcIjogXCLlrZDplb/ljr9cIixcblx0ICAgIFwiNjEwNjI0XCI6IFwi5a6J5aGe5Y6/XCIsXG5cdCAgICBcIjYxMDYyNVwiOiBcIuW/l+S4ueWOv1wiLFxuXHQgICAgXCI2MTA2MjZcIjogXCLlkLTotbfljr9cIixcblx0ICAgIFwiNjEwNjI3XCI6IFwi55SY5rOJ5Y6/XCIsXG5cdCAgICBcIjYxMDYyOFwiOiBcIuWvjOWOv1wiLFxuXHQgICAgXCI2MTA2MjlcIjogXCLmtJvlt53ljr9cIixcblx0ICAgIFwiNjEwNjMwXCI6IFwi5a6c5bed5Y6/XCIsXG5cdCAgICBcIjYxMDYzMVwiOiBcIum7hOm+meWOv1wiLFxuXHQgICAgXCI2MTA2MzJcIjogXCLpu4TpmbXljr9cIixcblx0ICAgIFwiNjEwNjMzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDcwMFwiOiBcIuaxieS4reW4glwiLFxuXHQgICAgXCI2MTA3MDJcIjogXCLmsYnlj7DljLpcIixcblx0ICAgIFwiNjEwNzIxXCI6IFwi5Y2X6YOR5Y6/XCIsXG5cdCAgICBcIjYxMDcyMlwiOiBcIuWfjuWbuuWOv1wiLFxuXHQgICAgXCI2MTA3MjNcIjogXCLmtIvljr9cIixcblx0ICAgIFwiNjEwNzI0XCI6IFwi6KW/5Lmh5Y6/XCIsXG5cdCAgICBcIjYxMDcyNVwiOiBcIuWLieWOv1wiLFxuXHQgICAgXCI2MTA3MjZcIjogXCLlroHlvLrljr9cIixcblx0ICAgIFwiNjEwNzI3XCI6IFwi55Wl6Ziz5Y6/XCIsXG5cdCAgICBcIjYxMDcyOFwiOiBcIumVh+W3tOWOv1wiLFxuXHQgICAgXCI2MTA3MjlcIjogXCLnlZnlnZ3ljr9cIixcblx0ICAgIFwiNjEwNzMwXCI6IFwi5L2b5Z2q5Y6/XCIsXG5cdCAgICBcIjYxMDczMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTA4MDBcIjogXCLmpobmnpfluIJcIixcblx0ICAgIFwiNjEwODAyXCI6IFwi5qaG6Ziz5Yy6XCIsXG5cdCAgICBcIjYxMDgyMVwiOiBcIuelnuacqOWOv1wiLFxuXHQgICAgXCI2MTA4MjJcIjogXCLlupzosLfljr9cIixcblx0ICAgIFwiNjEwODIzXCI6IFwi5qiq5bGx5Y6/XCIsXG5cdCAgICBcIjYxMDgyNFwiOiBcIumdlui+ueWOv1wiLFxuXHQgICAgXCI2MTA4MjVcIjogXCLlrprovrnljr9cIixcblx0ICAgIFwiNjEwODI2XCI6IFwi57ul5b635Y6/XCIsXG5cdCAgICBcIjYxMDgyN1wiOiBcIuexs+iEguWOv1wiLFxuXHQgICAgXCI2MTA4MjhcIjogXCLkvbPljr9cIixcblx0ICAgIFwiNjEwODI5XCI6IFwi5ZC05aCh5Y6/XCIsXG5cdCAgICBcIjYxMDgzMFwiOiBcIua4hea2p+WOv1wiLFxuXHQgICAgXCI2MTA4MzFcIjogXCLlrZDmtLLljr9cIixcblx0ICAgIFwiNjEwODMyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDkwMFwiOiBcIuWuieW6t+W4glwiLFxuXHQgICAgXCI2MTA5MDJcIjogXCLmsYnmu6jljLpcIixcblx0ICAgIFwiNjEwOTIxXCI6IFwi5rGJ6Zi05Y6/XCIsXG5cdCAgICBcIjYxMDkyMlwiOiBcIuefs+azieWOv1wiLFxuXHQgICAgXCI2MTA5MjNcIjogXCLlroHpmZXljr9cIixcblx0ICAgIFwiNjEwOTI0XCI6IFwi57Sr6Ziz5Y6/XCIsXG5cdCAgICBcIjYxMDkyNVwiOiBcIuWymueai+WOv1wiLFxuXHQgICAgXCI2MTA5MjZcIjogXCLlubPliKnljr9cIixcblx0ICAgIFwiNjEwOTI3XCI6IFwi6ZWH5Z2q5Y6/XCIsXG5cdCAgICBcIjYxMDkyOFwiOiBcIuaXrOmYs+WOv1wiLFxuXHQgICAgXCI2MTA5MjlcIjogXCLnmb3msrPljr9cIixcblx0ICAgIFwiNjEwOTMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMTAwMFwiOiBcIuWVhua0m+W4glwiLFxuXHQgICAgXCI2MTEwMDJcIjogXCLllYblt57ljLpcIixcblx0ICAgIFwiNjExMDIxXCI6IFwi5rSb5Y2X5Y6/XCIsXG5cdCAgICBcIjYxMTAyMlwiOiBcIuS4ueWHpOWOv1wiLFxuXHQgICAgXCI2MTEwMjNcIjogXCLllYbljZfljr9cIixcblx0ICAgIFwiNjExMDI0XCI6IFwi5bGx6Ziz5Y6/XCIsXG5cdCAgICBcIjYxMTAyNVwiOiBcIumVh+WuieWOv1wiLFxuXHQgICAgXCI2MTEwMjZcIjogXCLmn57msLTljr9cIixcblx0ICAgIFwiNjExMDI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDAwMFwiOiBcIueUmOiCg+ecgVwiLFxuXHQgICAgXCI2MjAxMDBcIjogXCLlhbDlt57luIJcIixcblx0ICAgIFwiNjIwMTAyXCI6IFwi5Z+O5YWz5Yy6XCIsXG5cdCAgICBcIjYyMDEwM1wiOiBcIuS4g+mHjOays+WMulwiLFxuXHQgICAgXCI2MjAxMDRcIjogXCLopb/lm7rljLpcIixcblx0ICAgIFwiNjIwMTA1XCI6IFwi5a6J5a6B5Yy6XCIsXG5cdCAgICBcIjYyMDExMVwiOiBcIue6ouWPpOWMulwiLFxuXHQgICAgXCI2MjAxMjFcIjogXCLmsLjnmbvljr9cIixcblx0ICAgIFwiNjIwMTIyXCI6IFwi55qL5YWw5Y6/XCIsXG5cdCAgICBcIjYyMDEyM1wiOiBcIuamhuS4reWOv1wiLFxuXHQgICAgXCI2MjAxMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwMjAwXCI6IFwi5ZiJ5bOq5YWz5biCXCIsXG5cdCAgICBcIjYyMDMwMFwiOiBcIumHkeaYjOW4glwiLFxuXHQgICAgXCI2MjAzMDJcIjogXCLph5Hlt53ljLpcIixcblx0ICAgIFwiNjIwMzIxXCI6IFwi5rC45piM5Y6/XCIsXG5cdCAgICBcIjYyMDMyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjA0MDBcIjogXCLnmb3pk7bluIJcIixcblx0ICAgIFwiNjIwNDAyXCI6IFwi55m96ZO25Yy6XCIsXG5cdCAgICBcIjYyMDQwM1wiOiBcIuW5s+W3neWMulwiLFxuXHQgICAgXCI2MjA0MjFcIjogXCLpnZbov5zljr9cIixcblx0ICAgIFwiNjIwNDIyXCI6IFwi5Lya5a6B5Y6/XCIsXG5cdCAgICBcIjYyMDQyM1wiOiBcIuaZr+azsOWOv1wiLFxuXHQgICAgXCI2MjA0MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwNTAwXCI6IFwi5aSp5rC05biCXCIsXG5cdCAgICBcIjYyMDUwMlwiOiBcIuenpuW3nuWMulwiLFxuXHQgICAgXCI2MjA1MDNcIjogXCLpuqbnp6/ljLpcIixcblx0ICAgIFwiNjIwNTIxXCI6IFwi5riF5rC05Y6/XCIsXG5cdCAgICBcIjYyMDUyMlwiOiBcIuenpuWuieWOv1wiLFxuXHQgICAgXCI2MjA1MjNcIjogXCLnlJjosLfljr9cIixcblx0ICAgIFwiNjIwNTI0XCI6IFwi5q2m5bGx5Y6/XCIsXG5cdCAgICBcIjYyMDUyNVwiOiBcIuW8oOWutuW3neWbnuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MjA1MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwNjAwXCI6IFwi5q2m5aiB5biCXCIsXG5cdCAgICBcIjYyMDYwMlwiOiBcIuWHieW3nuWMulwiLFxuXHQgICAgXCI2MjA2MjFcIjogXCLmsJHli6Tljr9cIixcblx0ICAgIFwiNjIwNjIyXCI6IFwi5Y+k5rWq5Y6/XCIsXG5cdCAgICBcIjYyMDYyM1wiOiBcIuWkqeelneiXj+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MjA2MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwNzAwXCI6IFwi5byg5o6W5biCXCIsXG5cdCAgICBcIjYyMDcwMlwiOiBcIueUmOW3nuWMulwiLFxuXHQgICAgXCI2MjA3MjFcIjogXCLogoPljZfoo5Xlm7rml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjIwNzIyXCI6IFwi5rCR5LmQ5Y6/XCIsXG5cdCAgICBcIjYyMDcyM1wiOiBcIuS4tOazveWOv1wiLFxuXHQgICAgXCI2MjA3MjRcIjogXCLpq5jlj7Dljr9cIixcblx0ICAgIFwiNjIwNzI1XCI6IFwi5bGx5Li55Y6/XCIsXG5cdCAgICBcIjYyMDcyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjA4MDBcIjogXCLlubPlh4nluIJcIixcblx0ICAgIFwiNjIwODAyXCI6IFwi5bSG5bOS5Yy6XCIsXG5cdCAgICBcIjYyMDgyMVwiOiBcIuazvuW3neWOv1wiLFxuXHQgICAgXCI2MjA4MjJcIjogXCLngbXlj7Dljr9cIixcblx0ICAgIFwiNjIwODIzXCI6IFwi5bSH5L+h5Y6/XCIsXG5cdCAgICBcIjYyMDgyNFwiOiBcIuWNjuS6reWOv1wiLFxuXHQgICAgXCI2MjA4MjVcIjogXCLluoTmtarljr9cIixcblx0ICAgIFwiNjIwODI2XCI6IFwi6Z2Z5a6B5Y6/XCIsXG5cdCAgICBcIjYyMDgyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjA5MDBcIjogXCLphZLms4nluIJcIixcblx0ICAgIFwiNjIwOTAyXCI6IFwi6IKD5bee5Yy6XCIsXG5cdCAgICBcIjYyMDkyMVwiOiBcIumHkeWhlOWOv1wiLFxuXHQgICAgXCI2MjA5MjJcIjogXCLnk5zlt57ljr9cIixcblx0ICAgIFwiNjIwOTIzXCI6IFwi6IKD5YyX6JKZ5Y+k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYyMDkyNFwiOiBcIumYv+WFi+WhnuWTiOiQqOWFi+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MjA5ODFcIjogXCLnjonpl6jluIJcIixcblx0ICAgIFwiNjIwOTgyXCI6IFwi5pWm54WM5biCXCIsXG5cdCAgICBcIjYyMDk4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjEwMDBcIjogXCLluobpmLPluIJcIixcblx0ICAgIFwiNjIxMDAyXCI6IFwi6KW/5bOw5Yy6XCIsXG5cdCAgICBcIjYyMTAyMVwiOiBcIuW6huWfjuWOv1wiLFxuXHQgICAgXCI2MjEwMjJcIjogXCLnjq/ljr9cIixcblx0ICAgIFwiNjIxMDIzXCI6IFwi5Y2O5rGg5Y6/XCIsXG5cdCAgICBcIjYyMTAyNFwiOiBcIuWQiOawtOWOv1wiLFxuXHQgICAgXCI2MjEwMjVcIjogXCLmraPlroHljr9cIixcblx0ICAgIFwiNjIxMDI2XCI6IFwi5a6B5Y6/XCIsXG5cdCAgICBcIjYyMTAyN1wiOiBcIumVh+WOn+WOv1wiLFxuXHQgICAgXCI2MjEwMjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIxMTAwXCI6IFwi5a6a6KW/5biCXCIsXG5cdCAgICBcIjYyMTEwMlwiOiBcIuWuieWumuWMulwiLFxuXHQgICAgXCI2MjExMjFcIjogXCLpgJrmuK3ljr9cIixcblx0ICAgIFwiNjIxMTIyXCI6IFwi6ZmH6KW/5Y6/XCIsXG5cdCAgICBcIjYyMTEyM1wiOiBcIua4rea6kOWOv1wiLFxuXHQgICAgXCI2MjExMjRcIjogXCLkuLTmtK7ljr9cIixcblx0ICAgIFwiNjIxMTI1XCI6IFwi5ryz5Y6/XCIsXG5cdCAgICBcIjYyMTEyNlwiOiBcIuWyt+WOv1wiLFxuXHQgICAgXCI2MjExMjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIxMjAwXCI6IFwi6ZmH5Y2X5biCXCIsXG5cdCAgICBcIjYyMTIwMlwiOiBcIuatpumDveWMulwiLFxuXHQgICAgXCI2MjEyMjFcIjogXCLmiJDljr9cIixcblx0ICAgIFwiNjIxMjIyXCI6IFwi5paH5Y6/XCIsXG5cdCAgICBcIjYyMTIyM1wiOiBcIuWuleaYjOWOv1wiLFxuXHQgICAgXCI2MjEyMjRcIjogXCLlurfljr9cIixcblx0ICAgIFwiNjIxMjI1XCI6IFwi6KW/5ZKM5Y6/XCIsXG5cdCAgICBcIjYyMTIyNlwiOiBcIuekvOWOv1wiLFxuXHQgICAgXCI2MjEyMjdcIjogXCLlvr3ljr9cIixcblx0ICAgIFwiNjIxMjI4XCI6IFwi5Lik5b2T5Y6/XCIsXG5cdCAgICBcIjYyMTIyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjI5MDBcIjogXCLkuLTlpI/lm57ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjIyOTAxXCI6IFwi5Li05aSP5biCXCIsXG5cdCAgICBcIjYyMjkyMVwiOiBcIuS4tOWkj+WOv1wiLFxuXHQgICAgXCI2MjI5MjJcIjogXCLlurfkuZDljr9cIixcblx0ICAgIFwiNjIyOTIzXCI6IFwi5rC46Z2W5Y6/XCIsXG5cdCAgICBcIjYyMjkyNFwiOiBcIuW5v+ays+WOv1wiLFxuXHQgICAgXCI2MjI5MjVcIjogXCLlkozmlL/ljr9cIixcblx0ICAgIFwiNjIyOTI2XCI6IFwi5Lic5Lmh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYyMjkyN1wiOiBcIuenr+efs+WxseS/neWuieaXj+S4nOS5oeaXj+aSkuaLieaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MjI5MjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIzMDAwXCI6IFwi55SY5Y2X6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYyMzAwMVwiOiBcIuWQiOS9nOW4glwiLFxuXHQgICAgXCI2MjMwMjFcIjogXCLkuLTmva3ljr9cIixcblx0ICAgIFwiNjIzMDIyXCI6IFwi5Y2T5bC85Y6/XCIsXG5cdCAgICBcIjYyMzAyM1wiOiBcIuiIn+absuWOv1wiLFxuXHQgICAgXCI2MjMwMjRcIjogXCLov63pg6jljr9cIixcblx0ICAgIFwiNjIzMDI1XCI6IFwi546b5puy5Y6/XCIsXG5cdCAgICBcIjYyMzAyNlwiOiBcIueijOabsuWOv1wiLFxuXHQgICAgXCI2MjMwMjdcIjogXCLlpI/msrPljr9cIixcblx0ICAgIFwiNjIzMDI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMDAwMFwiOiBcIumdkua1t+ecgVwiLFxuXHQgICAgXCI2MzAxMDBcIjogXCLopb/lroHluIJcIixcblx0ICAgIFwiNjMwMTAyXCI6IFwi5Z+O5Lic5Yy6XCIsXG5cdCAgICBcIjYzMDEwM1wiOiBcIuWfjuS4reWMulwiLFxuXHQgICAgXCI2MzAxMDRcIjogXCLln47opb/ljLpcIixcblx0ICAgIFwiNjMwMTA1XCI6IFwi5Z+O5YyX5Yy6XCIsXG5cdCAgICBcIjYzMDEyMVwiOiBcIuWkp+mAmuWbnuaXj+Wcn+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MzAxMjJcIjogXCLmuZ/kuK3ljr9cIixcblx0ICAgIFwiNjMwMTIzXCI6IFwi5rmf5rqQ5Y6/XCIsXG5cdCAgICBcIjYzMDEyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzIxMDBcIjogXCLmtbfkuJzluIJcIixcblx0ICAgIFwiNjMyMTIxXCI6IFwi5bmz5a6J5Y6/XCIsXG5cdCAgICBcIjYzMjEyMlwiOiBcIuawkeWSjOWbnuaXj+Wcn+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MzIxMjNcIjogXCLkuZDpg73ljLpcIixcblx0ICAgIFwiNjMyMTI2XCI6IFwi5LqS5Yqp5Zyf5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYzMjEyN1wiOiBcIuWMlumahuWbnuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MzIxMjhcIjogXCLlvqrljJbmkpLmi4nml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjMyMTI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMjIwMFwiOiBcIua1t+WMl+iXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MzIyMjFcIjogXCLpl6jmupDlm57ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjMyMjIyXCI6IFwi56WB6L+e5Y6/XCIsXG5cdCAgICBcIjYzMjIyM1wiOiBcIua1t+aZj+WOv1wiLFxuXHQgICAgXCI2MzIyMjRcIjogXCLliJrlr5/ljr9cIixcblx0ICAgIFwiNjMyMjI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMjMwMFwiOiBcIum7hOWNl+iXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MzIzMjFcIjogXCLlkIzku4Hljr9cIixcblx0ICAgIFwiNjMyMzIyXCI6IFwi5bCW5omO5Y6/XCIsXG5cdCAgICBcIjYzMjMyM1wiOiBcIuazveW6k+WOv1wiLFxuXHQgICAgXCI2MzIzMjRcIjogXCLmsrPljZfokpnlj6Tml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjMyMzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMjUwMFwiOiBcIua1t+WNl+iXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MzI1MjFcIjogXCLlhbHlkozljr9cIixcblx0ICAgIFwiNjMyNTIyXCI6IFwi5ZCM5b635Y6/XCIsXG5cdCAgICBcIjYzMjUyM1wiOiBcIui0teW+t+WOv1wiLFxuXHQgICAgXCI2MzI1MjRcIjogXCLlhbTmtbfljr9cIixcblx0ICAgIFwiNjMyNTI1XCI6IFwi6LS15Y2X5Y6/XCIsXG5cdCAgICBcIjYzMjUyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzI2MDBcIjogXCLmnpzmtJvol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjMyNjIxXCI6IFwi546b5rKB5Y6/XCIsXG5cdCAgICBcIjYzMjYyMlwiOiBcIuePreeOm+WOv1wiLFxuXHQgICAgXCI2MzI2MjNcIjogXCLnlJjlvrfljr9cIixcblx0ICAgIFwiNjMyNjI0XCI6IFwi6L6+5pel5Y6/XCIsXG5cdCAgICBcIjYzMjYyNVwiOiBcIuS5heayu+WOv1wiLFxuXHQgICAgXCI2MzI2MjZcIjogXCLnjpvlpJrljr9cIixcblx0ICAgIFwiNjMyNjI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMjcwMFwiOiBcIueOieagkeiXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MzI3MjFcIjogXCLnjonmoJHluIJcIixcblx0ICAgIFwiNjMyNzIyXCI6IFwi5p2C5aSa5Y6/XCIsXG5cdCAgICBcIjYzMjcyM1wiOiBcIuensOWkmuWOv1wiLFxuXHQgICAgXCI2MzI3MjRcIjogXCLmsrvlpJrljr9cIixcblx0ICAgIFwiNjMyNzI1XCI6IFwi5ZuK6LCm5Y6/XCIsXG5cdCAgICBcIjYzMjcyNlwiOiBcIuabsum6u+iOseWOv1wiLFxuXHQgICAgXCI2MzI3MjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMyODAwXCI6IFwi5rW36KW/6JKZ5Y+k5peP6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYzMjgwMVwiOiBcIuagvOWwlOacqOW4glwiLFxuXHQgICAgXCI2MzI4MDJcIjogXCLlvrfku6Tlk4jluIJcIixcblx0ICAgIFwiNjMyODIxXCI6IFwi5LmM5YWw5Y6/XCIsXG5cdCAgICBcIjYzMjgyMlwiOiBcIumDveWFsOWOv1wiLFxuXHQgICAgXCI2MzI4MjNcIjogXCLlpKnls7vljr9cIixcblx0ICAgIFwiNjMyODI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY0MDAwMFwiOiBcIuWugeWkj+WbnuaXj+iHquayu+WMulwiLFxuXHQgICAgXCI2NDAxMDBcIjogXCLpk7blt53luIJcIixcblx0ICAgIFwiNjQwMTA0XCI6IFwi5YW05bqG5Yy6XCIsXG5cdCAgICBcIjY0MDEwNVwiOiBcIuilv+Wkj+WMulwiLFxuXHQgICAgXCI2NDAxMDZcIjogXCLph5Hlh6TljLpcIixcblx0ICAgIFwiNjQwMTIxXCI6IFwi5rC45a6B5Y6/XCIsXG5cdCAgICBcIjY0MDEyMlwiOiBcIui0uuWFsOWOv1wiLFxuXHQgICAgXCI2NDAxODFcIjogXCLngbXmrabluIJcIixcblx0ICAgIFwiNjQwMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY0MDIwMFwiOiBcIuefs+WYtOWxseW4glwiLFxuXHQgICAgXCI2NDAyMDJcIjogXCLlpKfmrablj6PljLpcIixcblx0ICAgIFwiNjQwMjA1XCI6IFwi5oOg5Yac5Yy6XCIsXG5cdCAgICBcIjY0MDIyMVwiOiBcIuW5s+e9l+WOv1wiLFxuXHQgICAgXCI2NDAyMjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjQwMzAwXCI6IFwi5ZC05b+g5biCXCIsXG5cdCAgICBcIjY0MDMwMlwiOiBcIuWIqemAmuWMulwiLFxuXHQgICAgXCI2NDAzMDNcIjogXCLnuqLlr7rloKHljLpcIixcblx0ICAgIFwiNjQwMzIzXCI6IFwi55uQ5rGg5Y6/XCIsXG5cdCAgICBcIjY0MDMyNFwiOiBcIuWQjOW/g+WOv1wiLFxuXHQgICAgXCI2NDAzODFcIjogXCLpnZLpk5zls6HluIJcIixcblx0ICAgIFwiNjQwMzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY0MDQwMFwiOiBcIuWbuuWOn+W4glwiLFxuXHQgICAgXCI2NDA0MDJcIjogXCLljp/lt57ljLpcIixcblx0ICAgIFwiNjQwNDIyXCI6IFwi6KW/5ZCJ5Y6/XCIsXG5cdCAgICBcIjY0MDQyM1wiOiBcIumahuW+t+WOv1wiLFxuXHQgICAgXCI2NDA0MjRcIjogXCLms77mupDljr9cIixcblx0ICAgIFwiNjQwNDI1XCI6IFwi5b2t6Ziz5Y6/XCIsXG5cdCAgICBcIjY0MDQyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NDA1MDBcIjogXCLkuK3ljavluIJcIixcblx0ICAgIFwiNjQwNTAyXCI6IFwi5rKZ5Z2h5aS05Yy6XCIsXG5cdCAgICBcIjY0MDUyMVwiOiBcIuS4reWugeWOv1wiLFxuXHQgICAgXCI2NDA1MjJcIjogXCLmtbfljp/ljr9cIixcblx0ICAgIFwiNjQwNTIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MDAwMFwiOiBcIuaWsOeWhue7tOWQvuWwlOiHquayu+WMulwiLFxuXHQgICAgXCI2NTAxMDBcIjogXCLkuYzpsoHmnKjpvZDluIJcIixcblx0ICAgIFwiNjUwMTAyXCI6IFwi5aSp5bGx5Yy6XCIsXG5cdCAgICBcIjY1MDEwM1wiOiBcIuaymeS+neW3tOWFi+WMulwiLFxuXHQgICAgXCI2NTAxMDRcIjogXCLmlrDluILljLpcIixcblx0ICAgIFwiNjUwMTA1XCI6IFwi5rC056Oo5rKf5Yy6XCIsXG5cdCAgICBcIjY1MDEwNlwiOiBcIuWktOWxr+ays+WMulwiLFxuXHQgICAgXCI2NTAxMDdcIjogXCLovr7lnYLln47ljLpcIixcblx0ICAgIFwiNjUwMTA5XCI6IFwi57Gz5Lic5Yy6XCIsXG5cdCAgICBcIjY1MDEyMVwiOiBcIuS5jOmygeacqOm9kOWOv1wiLFxuXHQgICAgXCI2NTAxMjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUwMjAwXCI6IFwi5YWL5ouJ546b5L6d5biCXCIsXG5cdCAgICBcIjY1MDIwMlwiOiBcIueLrOWxseWtkOWMulwiLFxuXHQgICAgXCI2NTAyMDNcIjogXCLlhYvmi4nnjpvkvp3ljLpcIixcblx0ICAgIFwiNjUwMjA0XCI6IFwi55m956Kx5rup5Yy6XCIsXG5cdCAgICBcIjY1MDIwNVwiOiBcIuS5jOWwlOemvuWMulwiLFxuXHQgICAgXCI2NTAyMDZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUyMTAwXCI6IFwi5ZCQ6bKB55Wq5Zyw5Yy6XCIsXG5cdCAgICBcIjY1MjEwMVwiOiBcIuWQkOmygeeVquW4glwiLFxuXHQgICAgXCI2NTIxMjJcIjogXCLphK/lloTljr9cIixcblx0ICAgIFwiNjUyMTIzXCI6IFwi5omY5YWL6YCK5Y6/XCIsXG5cdCAgICBcIjY1MjEyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTIyMDBcIjogXCLlk4jlr4blnLDljLpcIixcblx0ICAgIFwiNjUyMjAxXCI6IFwi5ZOI5a+G5biCXCIsXG5cdCAgICBcIjY1MjIyMlwiOiBcIuW3tOmHjOWdpOWTiOiQqOWFi+iHquayu+WOv1wiLFxuXHQgICAgXCI2NTIyMjNcIjogXCLkvIrlkL7ljr9cIixcblx0ICAgIFwiNjUyMjI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MjMwMFwiOiBcIuaYjOWQieWbnuaXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2NTIzMDFcIjogXCLmmIzlkInluIJcIixcblx0ICAgIFwiNjUyMzAyXCI6IFwi6Zic5bq35biCXCIsXG5cdCAgICBcIjY1MjMyM1wiOiBcIuWRvOWbvuWjgeWOv1wiLFxuXHQgICAgXCI2NTIzMjRcIjogXCLnjpvnurPmlq/ljr9cIixcblx0ICAgIFwiNjUyMzI1XCI6IFwi5aWH5Y+w5Y6/XCIsXG5cdCAgICBcIjY1MjMyN1wiOiBcIuWQieacqOiQqOWwlOWOv1wiLFxuXHQgICAgXCI2NTIzMjhcIjogXCLmnKjlnpLlk4jokKjlhYvoh6rmsrvljr9cIixcblx0ICAgIFwiNjUyMzI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MjcwMFwiOiBcIuWNmuWwlOWhlOaLieiSmeWPpOiHquayu+W3nlwiLFxuXHQgICAgXCI2NTI3MDFcIjogXCLljZrkuZDluIJcIixcblx0ICAgIFwiNjUyNzAyXCI6IFwi6Zi/5ouJ5bGx5Y+j5biCXCIsXG5cdCAgICBcIjY1MjcyMlwiOiBcIueyvuays+WOv1wiLFxuXHQgICAgXCI2NTI3MjNcIjogXCLmuKnms4nljr9cIixcblx0ICAgIFwiNjUyNzI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MjgwMFwiOiBcIuW3tOmfs+mDrealnuiSmeWPpOiHquayu+W3nlwiLFxuXHQgICAgXCI2NTI4MDFcIjogXCLlupPlsJTli5LluIJcIixcblx0ICAgIFwiNjUyODIyXCI6IFwi6L2u5Y+w5Y6/XCIsXG5cdCAgICBcIjY1MjgyM1wiOiBcIuWwieeKgeWOv1wiLFxuXHQgICAgXCI2NTI4MjRcIjogXCLoi6Xnvozljr9cIixcblx0ICAgIFwiNjUyODI1XCI6IFwi5LiU5pyr5Y6/XCIsXG5cdCAgICBcIjY1MjgyNlwiOiBcIueEieiAhuWbnuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2NTI4MjdcIjogXCLlkozpnZnljr9cIixcblx0ICAgIFwiNjUyODI4XCI6IFwi5ZKM56GV5Y6/XCIsXG5cdCAgICBcIjY1MjgyOVwiOiBcIuWNmua5luWOv1wiLFxuXHQgICAgXCI2NTI4MzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUyOTAwXCI6IFwi6Zi/5YWL6IuP5Zyw5Yy6XCIsXG5cdCAgICBcIjY1MjkwMVwiOiBcIumYv+WFi+iLj+W4glwiLFxuXHQgICAgXCI2NTI5MjJcIjogXCLmuKnlrr/ljr9cIixcblx0ICAgIFwiNjUyOTIzXCI6IFwi5bqT6L2m5Y6/XCIsXG5cdCAgICBcIjY1MjkyNFwiOiBcIuaymembheWOv1wiLFxuXHQgICAgXCI2NTI5MjVcIjogXCLmlrDlkozljr9cIixcblx0ICAgIFwiNjUyOTI2XCI6IFwi5ouc5Z+O5Y6/XCIsXG5cdCAgICBcIjY1MjkyN1wiOiBcIuS5jOS7gOWOv1wiLFxuXHQgICAgXCI2NTI5MjhcIjogXCLpmL/nk6bmj5Dljr9cIixcblx0ICAgIFwiNjUyOTI5XCI6IFwi5p+v5Z2q5Y6/XCIsXG5cdCAgICBcIjY1MjkzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTMwMDBcIjogXCLlhYvlrZzli5Loi4/mn6/lsJTlhYvlrZzoh6rmsrvlt55cIixcblx0ICAgIFwiNjUzMDAxXCI6IFwi6Zi/5Zu+5LuA5biCXCIsXG5cdCAgICBcIjY1MzAyMlwiOiBcIumYv+WFi+mZtuWOv1wiLFxuXHQgICAgXCI2NTMwMjNcIjogXCLpmL/lkIjlpYfljr9cIixcblx0ICAgIFwiNjUzMDI0XCI6IFwi5LmM5oGw5Y6/XCIsXG5cdCAgICBcIjY1MzAyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTMxMDBcIjogXCLlloDku4DlnLDljLpcIixcblx0ICAgIFwiNjUzMTAxXCI6IFwi5ZaA5LuA5biCXCIsXG5cdCAgICBcIjY1MzEyMVwiOiBcIueWj+mZhOWOv1wiLFxuXHQgICAgXCI2NTMxMjJcIjogXCLnlo/li5Lljr9cIixcblx0ICAgIFwiNjUzMTIzXCI6IFwi6Iux5ZCJ5rKZ5Y6/XCIsXG5cdCAgICBcIjY1MzEyNFwiOiBcIuazveaZruWOv1wiLFxuXHQgICAgXCI2NTMxMjVcIjogXCLojo7ovabljr9cIixcblx0ICAgIFwiNjUzMTI2XCI6IFwi5Y+25Z+O5Y6/XCIsXG5cdCAgICBcIjY1MzEyN1wiOiBcIum6puebluaPkOWOv1wiLFxuXHQgICAgXCI2NTMxMjhcIjogXCLlsrPmma7muZbljr9cIixcblx0ICAgIFwiNjUzMTI5XCI6IFwi5Ly95biI5Y6/XCIsXG5cdCAgICBcIjY1MzEzMFwiOiBcIuW3tOalmuWOv1wiLFxuXHQgICAgXCI2NTMxMzFcIjogXCLloZTku4DlupPlsJTlubLloZTlkInlhYvoh6rmsrvljr9cIixcblx0ICAgIFwiNjUzMTMyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MzIwMFwiOiBcIuWSjOeUsOWcsOWMulwiLFxuXHQgICAgXCI2NTMyMDFcIjogXCLlkoznlLDluIJcIixcblx0ICAgIFwiNjUzMjIxXCI6IFwi5ZKM55Sw5Y6/XCIsXG5cdCAgICBcIjY1MzIyMlwiOiBcIuWiqOeOieWOv1wiLFxuXHQgICAgXCI2NTMyMjNcIjogXCLnmq7lsbHljr9cIixcblx0ICAgIFwiNjUzMjI0XCI6IFwi5rSb5rWm5Y6/XCIsXG5cdCAgICBcIjY1MzIyNVwiOiBcIuetluWLkuWOv1wiLFxuXHQgICAgXCI2NTMyMjZcIjogXCLkuo7nlLDljr9cIixcblx0ICAgIFwiNjUzMjI3XCI6IFwi5rCR5Liw5Y6/XCIsXG5cdCAgICBcIjY1MzIyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTQwMDBcIjogXCLkvIrnioHlk4jokKjlhYvoh6rmsrvlt55cIixcblx0ICAgIFwiNjU0MDAyXCI6IFwi5LyK5a6B5biCXCIsXG5cdCAgICBcIjY1NDAwM1wiOiBcIuWljuWxr+W4glwiLFxuXHQgICAgXCI2NTQwMjFcIjogXCLkvIrlroHljr9cIixcblx0ICAgIFwiNjU0MDIyXCI6IFwi5a+f5biD5p+l5bCU6ZSh5Lyv6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjY1NDAyM1wiOiBcIumcjeWfjuWOv1wiLFxuXHQgICAgXCI2NTQwMjRcIjogXCLlt6nnlZnljr9cIixcblx0ICAgIFwiNjU0MDI1XCI6IFwi5paw5rqQ5Y6/XCIsXG5cdCAgICBcIjY1NDAyNlwiOiBcIuaYreiLj+WOv1wiLFxuXHQgICAgXCI2NTQwMjdcIjogXCLnibnlhYvmlq/ljr9cIixcblx0ICAgIFwiNjU0MDI4XCI6IFwi5bC85YuS5YWL5Y6/XCIsXG5cdCAgICBcIjY1NDAyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTQyMDBcIjogXCLloZTln47lnLDljLpcIixcblx0ICAgIFwiNjU0MjAxXCI6IFwi5aGU5Z+O5biCXCIsXG5cdCAgICBcIjY1NDIwMlwiOiBcIuS5jOiLj+W4glwiLFxuXHQgICAgXCI2NTQyMjFcIjogXCLpop3mlY/ljr9cIixcblx0ICAgIFwiNjU0MjIzXCI6IFwi5rKZ5rm+5Y6/XCIsXG5cdCAgICBcIjY1NDIyNFwiOiBcIuaJmOmHjOWOv1wiLFxuXHQgICAgXCI2NTQyMjVcIjogXCLoo5XmsJHljr9cIixcblx0ICAgIFwiNjU0MjI2XCI6IFwi5ZKM5biD5YWL6LWb5bCU6JKZ5Y+k6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjY1NDIyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTQzMDBcIjogXCLpmL/li5Lms7DlnLDljLpcIixcblx0ICAgIFwiNjU0MzAxXCI6IFwi6Zi/5YuS5rOw5biCXCIsXG5cdCAgICBcIjY1NDMyMVwiOiBcIuW4g+WwlOa0peWOv1wiLFxuXHQgICAgXCI2NTQzMjJcIjogXCLlr4zolbTljr9cIixcblx0ICAgIFwiNjU0MzIzXCI6IFwi56aP5rW35Y6/XCIsXG5cdCAgICBcIjY1NDMyNFwiOiBcIuWTiOW3tOays+WOv1wiLFxuXHQgICAgXCI2NTQzMjVcIjogXCLpnZLmsrPljr9cIixcblx0ICAgIFwiNjU0MzI2XCI6IFwi5ZCJ5pyo5LmD5Y6/XCIsXG5cdCAgICBcIjY1NDMyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTkwMDFcIjogXCLnn7PmsrPlrZDluIJcIixcblx0ICAgIFwiNjU5MDAyXCI6IFwi6Zi/5ouJ5bCU5biCXCIsXG5cdCAgICBcIjY1OTAwM1wiOiBcIuWbvuacqOiIkuWFi+W4glwiLFxuXHQgICAgXCI2NTkwMDRcIjogXCLkupTlrrbmuKDluIJcIixcblx0ICAgIFwiNzEwMDAwXCI6IFwi5Y+w5rm+XCIsXG5cdCAgICBcIjcxMDEwMFwiOiBcIuWPsOWMl+W4glwiLFxuXHQgICAgXCI3MTAxMDFcIjogXCLkuK3mraPljLpcIixcblx0ICAgIFwiNzEwMTAyXCI6IFwi5aSn5ZCM5Yy6XCIsXG5cdCAgICBcIjcxMDEwM1wiOiBcIuS4reWxseWMulwiLFxuXHQgICAgXCI3MTAxMDRcIjogXCLmnb7lsbHljLpcIixcblx0ICAgIFwiNzEwMTA1XCI6IFwi5aSn5a6J5Yy6XCIsXG5cdCAgICBcIjcxMDEwNlwiOiBcIuS4h+WNjuWMulwiLFxuXHQgICAgXCI3MTAxMDdcIjogXCLkv6HkuYnljLpcIixcblx0ICAgIFwiNzEwMTA4XCI6IFwi5aOr5p6X5Yy6XCIsXG5cdCAgICBcIjcxMDEwOVwiOiBcIuWMl+aKleWMulwiLFxuXHQgICAgXCI3MTAxMTBcIjogXCLlhoXmuZbljLpcIixcblx0ICAgIFwiNzEwMTExXCI6IFwi5Y2X5riv5Yy6XCIsXG5cdCAgICBcIjcxMDExMlwiOiBcIuaWh+WxseWMulwiLFxuXHQgICAgXCI3MTAxMTNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNzEwMjAwXCI6IFwi6auY6ZuE5biCXCIsXG5cdCAgICBcIjcxMDIwMVwiOiBcIuaWsOWFtOWMulwiLFxuXHQgICAgXCI3MTAyMDJcIjogXCLliY3ph5HljLpcIixcblx0ICAgIFwiNzEwMjAzXCI6IFwi6Iqp6ZuF5Yy6XCIsXG5cdCAgICBcIjcxMDIwNFwiOiBcIuebkOWfleWMulwiLFxuXHQgICAgXCI3MTAyMDVcIjogXCLpvJPlsbHljLpcIixcblx0ICAgIFwiNzEwMjA2XCI6IFwi5peX5rSl5Yy6XCIsXG5cdCAgICBcIjcxMDIwN1wiOiBcIuWJjemVh+WMulwiLFxuXHQgICAgXCI3MTAyMDhcIjogXCLkuInmsJHljLpcIixcblx0ICAgIFwiNzEwMjA5XCI6IFwi5bem6JCl5Yy6XCIsXG5cdCAgICBcIjcxMDIxMFwiOiBcIualoOaik+WMulwiLFxuXHQgICAgXCI3MTAyMTFcIjogXCLlsI/muK/ljLpcIixcblx0ICAgIFwiNzEwMjEyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjcxMDI0MVwiOiBcIuiLk+mbheWMulwiLFxuXHQgICAgXCI3MTAyNDJcIjogXCLku4HmrabljLpcIixcblx0ICAgIFwiNzEwMjQzXCI6IFwi5aSn56S+5Yy6XCIsXG5cdCAgICBcIjcxMDI0NFwiOiBcIuWGiOWxseWMulwiLFxuXHQgICAgXCI3MTAyNDVcIjogXCLot6/nq7nljLpcIixcblx0ICAgIFwiNzEwMjQ2XCI6IFwi6Zi/6I6y5Yy6XCIsXG5cdCAgICBcIjcxMDI0N1wiOiBcIueUsOWvruWMulwiLFxuXHQgICAgXCI3MTAyNDhcIjogXCLnh5Xlt6LljLpcIixcblx0ICAgIFwiNzEwMjQ5XCI6IFwi5qGl5aS05Yy6XCIsXG5cdCAgICBcIjcxMDI1MFwiOiBcIuaik+WumOWMulwiLFxuXHQgICAgXCI3MTAyNTFcIjogXCLlvKXpmYDljLpcIixcblx0ICAgIFwiNzEwMjUyXCI6IFwi5rC45a6J5Yy6XCIsXG5cdCAgICBcIjcxMDI1M1wiOiBcIua5luWGheWMulwiLFxuXHQgICAgXCI3MTAyNTRcIjogXCLlh6TlsbHljLpcIixcblx0ICAgIFwiNzEwMjU1XCI6IFwi5aSn5a+u5Yy6XCIsXG5cdCAgICBcIjcxMDI1NlwiOiBcIuael+WbreWMulwiLFxuXHQgICAgXCI3MTAyNTdcIjogXCLpuJ/mnb7ljLpcIixcblx0ICAgIFwiNzEwMjU4XCI6IFwi5aSn5qCR5Yy6XCIsXG5cdCAgICBcIjcxMDI1OVwiOiBcIuaXl+WxseWMulwiLFxuXHQgICAgXCI3MTAyNjBcIjogXCLnvo7mtZPljLpcIixcblx0ICAgIFwiNzEwMjYxXCI6IFwi5YWt6b6f5Yy6XCIsXG5cdCAgICBcIjcxMDI2MlwiOiBcIuWGhemXqOWMulwiLFxuXHQgICAgXCI3MTAyNjNcIjogXCLmnYnmnpfljLpcIixcblx0ICAgIFwiNzEwMjY0XCI6IFwi55Sy5LuZ5Yy6XCIsXG5cdCAgICBcIjcxMDI2NVwiOiBcIuahg+a6kOWMulwiLFxuXHQgICAgXCI3MTAyNjZcIjogXCLpgqPnjpvlpI/ljLpcIixcblx0ICAgIFwiNzEwMjY3XCI6IFwi6IyC5p6X5Yy6XCIsXG5cdCAgICBcIjcxMDI2OFwiOiBcIuiMhOiQo+WMulwiLFxuXHQgICAgXCI3MTAzMDBcIjogXCLlj7DljZfluIJcIixcblx0ICAgIFwiNzEwMzAxXCI6IFwi5Lit6KW/5Yy6XCIsXG5cdCAgICBcIjcxMDMwMlwiOiBcIuS4nOWMulwiLFxuXHQgICAgXCI3MTAzMDNcIjogXCLljZfljLpcIixcblx0ICAgIFwiNzEwMzA0XCI6IFwi5YyX5Yy6XCIsXG5cdCAgICBcIjcxMDMwNVwiOiBcIuWuieW5s+WMulwiLFxuXHQgICAgXCI3MTAzMDZcIjogXCLlronljZfljLpcIixcblx0ICAgIFwiNzEwMzA3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjcxMDMzOVwiOiBcIuawuOW6t+WMulwiLFxuXHQgICAgXCI3MTAzNDBcIjogXCLlvZLku4HljLpcIixcblx0ICAgIFwiNzEwMzQxXCI6IFwi5paw5YyW5Yy6XCIsXG5cdCAgICBcIjcxMDM0MlwiOiBcIuW3pumVh+WMulwiLFxuXHQgICAgXCI3MTAzNDNcIjogXCLnjonkupXljLpcIixcblx0ICAgIFwiNzEwMzQ0XCI6IFwi5qWg6KW/5Yy6XCIsXG5cdCAgICBcIjcxMDM0NVwiOiBcIuWNl+WMluWMulwiLFxuXHQgICAgXCI3MTAzNDZcIjogXCLku4HlvrfljLpcIixcblx0ICAgIFwiNzEwMzQ3XCI6IFwi5YWz5bqZ5Yy6XCIsXG5cdCAgICBcIjcxMDM0OFwiOiBcIum+meW0juWMulwiLFxuXHQgICAgXCI3MTAzNDlcIjogXCLlrpjnlLDljLpcIixcblx0ICAgIFwiNzEwMzUwXCI6IFwi6bq76LGG5Yy6XCIsXG5cdCAgICBcIjcxMDM1MVwiOiBcIuS9s+mHjOWMulwiLFxuXHQgICAgXCI3MTAzNTJcIjogXCLopb/muK/ljLpcIixcblx0ICAgIFwiNzEwMzUzXCI6IFwi5LiD6IKh5Yy6XCIsXG5cdCAgICBcIjcxMDM1NFwiOiBcIuWwhuWGm+WMulwiLFxuXHQgICAgXCI3MTAzNTVcIjogXCLlrabnlLLljLpcIixcblx0ICAgIFwiNzEwMzU2XCI6IFwi5YyX6Zeo5Yy6XCIsXG5cdCAgICBcIjcxMDM1N1wiOiBcIuaWsOiQpeWMulwiLFxuXHQgICAgXCI3MTAzNThcIjogXCLlkI7lo4HljLpcIixcblx0ICAgIFwiNzEwMzU5XCI6IFwi55m95rKz5Yy6XCIsXG5cdCAgICBcIjcxMDM2MFwiOiBcIuS4nOWxseWMulwiLFxuXHQgICAgXCI3MTAzNjFcIjogXCLlha3nlLLljLpcIixcblx0ICAgIFwiNzEwMzYyXCI6IFwi5LiL6JCl5Yy6XCIsXG5cdCAgICBcIjcxMDM2M1wiOiBcIuafs+iQpeWMulwiLFxuXHQgICAgXCI3MTAzNjRcIjogXCLnm5DmsLTljLpcIixcblx0ICAgIFwiNzEwMzY1XCI6IFwi5ZaE5YyW5Yy6XCIsXG5cdCAgICBcIjcxMDM2NlwiOiBcIuWkp+WGheWMulwiLFxuXHQgICAgXCI3MTAzNjdcIjogXCLlsbHkuIrljLpcIixcblx0ICAgIFwiNzEwMzY4XCI6IFwi5paw5biC5Yy6XCIsXG5cdCAgICBcIjcxMDM2OVwiOiBcIuWuieWumuWMulwiLFxuXHQgICAgXCI3MTA0MDBcIjogXCLlj7DkuK3luIJcIixcblx0ICAgIFwiNzEwNDAxXCI6IFwi5Lit5Yy6XCIsXG5cdCAgICBcIjcxMDQwMlwiOiBcIuS4nOWMulwiLFxuXHQgICAgXCI3MTA0MDNcIjogXCLljZfljLpcIixcblx0ICAgIFwiNzEwNDA0XCI6IFwi6KW/5Yy6XCIsXG5cdCAgICBcIjcxMDQwNVwiOiBcIuWMl+WMulwiLFxuXHQgICAgXCI3MTA0MDZcIjogXCLljJflsa/ljLpcIixcblx0ICAgIFwiNzEwNDA3XCI6IFwi6KW/5bGv5Yy6XCIsXG5cdCAgICBcIjcxMDQwOFwiOiBcIuWNl+Wxr+WMulwiLFxuXHQgICAgXCI3MTA0MDlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNzEwNDMxXCI6IFwi5aSq5bmz5Yy6XCIsXG5cdCAgICBcIjcxMDQzMlwiOiBcIuWkp+mHjOWMulwiLFxuXHQgICAgXCI3MTA0MzNcIjogXCLpm77ls7DljLpcIixcblx0ICAgIFwiNzEwNDM0XCI6IFwi5LmM5pel5Yy6XCIsXG5cdCAgICBcIjcxMDQzNVwiOiBcIuS4sOWOn+WMulwiLFxuXHQgICAgXCI3MTA0MzZcIjogXCLlkI7ph4zljLpcIixcblx0ICAgIFwiNzEwNDM3XCI6IFwi55+z5YaI5Yy6XCIsXG5cdCAgICBcIjcxMDQzOFwiOiBcIuS4nOWKv+WMulwiLFxuXHQgICAgXCI3MTA0MzlcIjogXCLlkozlubPljLpcIixcblx0ICAgIFwiNzEwNDQwXCI6IFwi5paw56S+5Yy6XCIsXG5cdCAgICBcIjcxMDQ0MVwiOiBcIua9reWtkOWMulwiLFxuXHQgICAgXCI3MTA0NDJcIjogXCLlpKfpm4XljLpcIixcblx0ICAgIFwiNzEwNDQzXCI6IFwi56We5YaI5Yy6XCIsXG5cdCAgICBcIjcxMDQ0NFwiOiBcIuWkp+iCmuWMulwiLFxuXHQgICAgXCI3MTA0NDVcIjogXCLmspnpub/ljLpcIixcblx0ICAgIFwiNzEwNDQ2XCI6IFwi6b6Z5LqV5Yy6XCIsXG5cdCAgICBcIjcxMDQ0N1wiOiBcIuaip+agluWMulwiLFxuXHQgICAgXCI3MTA0NDhcIjogXCLmuIXmsLTljLpcIixcblx0ICAgIFwiNzEwNDQ5XCI6IFwi5aSn55Sy5Yy6XCIsXG5cdCAgICBcIjcxMDQ1MFwiOiBcIuWkluWflOWMulwiLFxuXHQgICAgXCI3MTA0NTFcIjogXCLlpKflronljLpcIixcblx0ICAgIFwiNzEwNTAwXCI6IFwi6YeR6Zeo5Y6/XCIsXG5cdCAgICBcIjcxMDUwN1wiOiBcIumHkeaymemVh1wiLFxuXHQgICAgXCI3MTA1MDhcIjogXCLph5HmuZbplYdcIixcblx0ICAgIFwiNzEwNTA5XCI6IFwi6YeR5a6B5LmhXCIsXG5cdCAgICBcIjcxMDUxMFwiOiBcIumHkeWfjumVh1wiLFxuXHQgICAgXCI3MTA1MTFcIjogXCLng4jlsb/kuaFcIixcblx0ICAgIFwiNzEwNTEyXCI6IFwi5LmM5Z215LmhXCIsXG5cdCAgICBcIjcxMDYwMFwiOiBcIuWNl+aKleWOv1wiLFxuXHQgICAgXCI3MTA2MTRcIjogXCLljZfmipXluIJcIixcblx0ICAgIFwiNzEwNjE1XCI6IFwi5Lit5a+u5LmhXCIsXG5cdCAgICBcIjcxMDYxNlwiOiBcIuiNieWxr+mVh1wiLFxuXHQgICAgXCI3MTA2MTdcIjogXCLlm73lp5PkuaFcIixcblx0ICAgIFwiNzEwNjE4XCI6IFwi5Z+U6YeM6ZWHXCIsXG5cdCAgICBcIjcxMDYxOVwiOiBcIuS7geeIseS5oVwiLFxuXHQgICAgXCI3MTA2MjBcIjogXCLlkI3pl7TkuaFcIixcblx0ICAgIFwiNzEwNjIxXCI6IFwi6ZuG6ZuG6ZWHXCIsXG5cdCAgICBcIjcxMDYyMlwiOiBcIuawtOmHjOS5oVwiLFxuXHQgICAgXCI3MTA2MjNcIjogXCLpsbzmsaDkuaFcIixcblx0ICAgIFwiNzEwNjI0XCI6IFwi5L+h5LmJ5LmhXCIsXG5cdCAgICBcIjcxMDYyNVwiOiBcIuerueWxsemVh1wiLFxuXHQgICAgXCI3MTA2MjZcIjogXCLpub/osLfkuaFcIixcblx0ICAgIFwiNzEwNzAwXCI6IFwi5Z+66ZqG5biCXCIsXG5cdCAgICBcIjcxMDcwMVwiOiBcIuS7geeIseWMulwiLFxuXHQgICAgXCI3MTA3MDJcIjogXCLkv6HkuYnljLpcIixcblx0ICAgIFwiNzEwNzAzXCI6IFwi5Lit5q2j5Yy6XCIsXG5cdCAgICBcIjcxMDcwNFwiOiBcIuS4reWxseWMulwiLFxuXHQgICAgXCI3MTA3MDVcIjogXCLlronkuZDljLpcIixcblx0ICAgIFwiNzEwNzA2XCI6IFwi5pqW5pqW5Yy6XCIsXG5cdCAgICBcIjcxMDcwN1wiOiBcIuS4g+WgteWMulwiLFxuXHQgICAgXCI3MTA3MDhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNzEwODAwXCI6IFwi5paw56u55biCXCIsXG5cdCAgICBcIjcxMDgwMVwiOiBcIuS4nOWMulwiLFxuXHQgICAgXCI3MTA4MDJcIjogXCLljJfljLpcIixcblx0ICAgIFwiNzEwODAzXCI6IFwi6aaZ5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDgwNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI3MTA5MDBcIjogXCLlmInkuYnluIJcIixcblx0ICAgIFwiNzEwOTAxXCI6IFwi5Lic5Yy6XCIsXG5cdCAgICBcIjcxMDkwMlwiOiBcIuilv+WMulwiLFxuXHQgICAgXCI3MTA5MDNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNzExMTAwXCI6IFwi5paw5YyX5biCXCIsXG5cdCAgICBcIjcxMTEzMFwiOiBcIuS4h+mHjOWMulwiLFxuXHQgICAgXCI3MTExMzFcIjogXCLph5HlsbHljLpcIixcblx0ICAgIFwiNzExMTMyXCI6IFwi5p2/5qGl5Yy6XCIsXG5cdCAgICBcIjcxMTEzM1wiOiBcIuaxkOatouWMulwiLFxuXHQgICAgXCI3MTExMzRcIjogXCLmt7HlnZHljLpcIixcblx0ICAgIFwiNzExMTM1XCI6IFwi55+z56KH5Yy6XCIsXG5cdCAgICBcIjcxMTEzNlwiOiBcIueRnuiKs+WMulwiLFxuXHQgICAgXCI3MTExMzdcIjogXCLlubPmuqrljLpcIixcblx0ICAgIFwiNzExMTM4XCI6IFwi5Y+M5rqq5Yy6XCIsXG5cdCAgICBcIjcxMTEzOVwiOiBcIui0oeWvruWMulwiLFxuXHQgICAgXCI3MTExNDBcIjogXCLmlrDlupfljLpcIixcblx0ICAgIFwiNzExMTQxXCI6IFwi5Z2q5p6X5Yy6XCIsXG5cdCAgICBcIjcxMTE0MlwiOiBcIuS5jOadpeWMulwiLFxuXHQgICAgXCI3MTExNDNcIjogXCLmsLjlkozljLpcIixcblx0ICAgIFwiNzExMTQ0XCI6IFwi5Lit5ZKM5Yy6XCIsXG5cdCAgICBcIjcxMTE0NVwiOiBcIuWcn+WfjuWMulwiLFxuXHQgICAgXCI3MTExNDZcIjogXCLkuInls6HljLpcIixcblx0ICAgIFwiNzExMTQ3XCI6IFwi5qCR5p6X5Yy6XCIsXG5cdCAgICBcIjcxMTE0OFwiOiBcIuiOuuatjOWMulwiLFxuXHQgICAgXCI3MTExNDlcIjogXCLkuInph43ljLpcIixcblx0ICAgIFwiNzExMTUwXCI6IFwi5paw5bqE5Yy6XCIsXG5cdCAgICBcIjcxMTE1MVwiOiBcIuazsOWxseWMulwiLFxuXHQgICAgXCI3MTExNTJcIjogXCLmnpflj6PljLpcIixcblx0ICAgIFwiNzExMTUzXCI6IFwi6Iqm5rSy5Yy6XCIsXG5cdCAgICBcIjcxMTE1NFwiOiBcIuS6lOiCoeWMulwiLFxuXHQgICAgXCI3MTExNTVcIjogXCLlhavph4zljLpcIixcblx0ICAgIFwiNzExMTU2XCI6IFwi5reh5rC05Yy6XCIsXG5cdCAgICBcIjcxMTE1N1wiOiBcIuS4ieiKneWMulwiLFxuXHQgICAgXCI3MTExNThcIjogXCLnn7Ppl6jljLpcIixcblx0ICAgIFwiNzExMjAwXCI6IFwi5a6c5YWw5Y6/XCIsXG5cdCAgICBcIjcxMTIxNFwiOiBcIuWunOWFsOW4glwiLFxuXHQgICAgXCI3MTEyMTVcIjogXCLlpLTln47plYdcIixcblx0ICAgIFwiNzExMjE2XCI6IFwi56SB5rqq5LmhXCIsXG5cdCAgICBcIjcxMTIxN1wiOiBcIuWjruWbtOS5oVwiLFxuXHQgICAgXCI3MTEyMThcIjogXCLlkZjlsbHkuaFcIixcblx0ICAgIFwiNzExMjE5XCI6IFwi572X5Lic6ZWHXCIsXG5cdCAgICBcIjcxMTIyMFwiOiBcIuS4ieaYn+S5oVwiLFxuXHQgICAgXCI3MTEyMjFcIjogXCLlpKflkIzkuaFcIixcblx0ICAgIFwiNzExMjIyXCI6IFwi5LqU57uT5LmhXCIsXG5cdCAgICBcIjcxMTIyM1wiOiBcIuWGrOWxseS5oVwiLFxuXHQgICAgXCI3MTEyMjRcIjogXCLoi4/mvrPplYdcIixcblx0ICAgIFwiNzExMjI1XCI6IFwi5Y2X5r6z5LmhXCIsXG5cdCAgICBcIjcxMTIyNlwiOiBcIumSk+mxvOWPsFwiLFxuXHQgICAgXCI3MTEzMDBcIjogXCLmlrDnq7nljr9cIixcblx0ICAgIFwiNzExMzE0XCI6IFwi56u55YyX5biCXCIsXG5cdCAgICBcIjcxMTMxNVwiOiBcIua5luWPo+S5oVwiLFxuXHQgICAgXCI3MTEzMTZcIjogXCLmlrDkuLDkuaFcIixcblx0ICAgIFwiNzExMzE3XCI6IFwi5paw5Z+U6ZWHXCIsXG5cdCAgICBcIjcxMTMxOFwiOiBcIuWFs+ilv+mVh1wiLFxuXHQgICAgXCI3MTEzMTlcIjogXCLoio7mnpfkuaFcIixcblx0ICAgIFwiNzExMzIwXCI6IFwi5a6d5bGx5LmhXCIsXG5cdCAgICBcIjcxMTMyMVwiOiBcIuerueS4nOmVh1wiLFxuXHQgICAgXCI3MTEzMjJcIjogXCLkupTls7DkuaFcIixcblx0ICAgIFwiNzExMzIzXCI6IFwi5qiq5bGx5LmhXCIsXG5cdCAgICBcIjcxMTMyNFwiOiBcIuWwluefs+S5oVwiLFxuXHQgICAgXCI3MTEzMjVcIjogXCLljJfln5TkuaFcIixcblx0ICAgIFwiNzExMzI2XCI6IFwi5bOo55yJ5LmhXCIsXG5cdCAgICBcIjcxMTQwMFwiOiBcIuahg+WbreWOv1wiLFxuXHQgICAgXCI3MTE0MTRcIjogXCLkuK3lnZzluIJcIixcblx0ICAgIFwiNzExNDE1XCI6IFwi5bmz6ZWH5biCXCIsXG5cdCAgICBcIjcxMTQxNlwiOiBcIum+mea9reS5oVwiLFxuXHQgICAgXCI3MTE0MTdcIjogXCLmnajmooXluIJcIixcblx0ICAgIFwiNzExNDE4XCI6IFwi5paw5bGL5LmhXCIsXG5cdCAgICBcIjcxMTQxOVwiOiBcIuingumfs+S5oVwiLFxuXHQgICAgXCI3MTE0MjBcIjogXCLmoYPlm63luIJcIixcblx0ICAgIFwiNzExNDIxXCI6IFwi6b6f5bGx5LmhXCIsXG5cdCAgICBcIjcxMTQyMlwiOiBcIuWFq+W+t+W4glwiLFxuXHQgICAgXCI3MTE0MjNcIjogXCLlpKfmuqrplYdcIixcblx0ICAgIFwiNzExNDI0XCI6IFwi5aSN5YW05LmhXCIsXG5cdCAgICBcIjcxMTQyNVwiOiBcIuWkp+WbreS5oVwiLFxuXHQgICAgXCI3MTE0MjZcIjogXCLoiqbnq7nkuaFcIixcblx0ICAgIFwiNzExNTAwXCI6IFwi6IuX5qCX5Y6/XCIsXG5cdCAgICBcIjcxMTUxOVwiOiBcIuerueWNl+mVh1wiLFxuXHQgICAgXCI3MTE1MjBcIjogXCLlpLTku73plYdcIixcblx0ICAgIFwiNzExNTIxXCI6IFwi5LiJ5rm+5LmhXCIsXG5cdCAgICBcIjcxMTUyMlwiOiBcIuWNl+W6hOS5oVwiLFxuXHQgICAgXCI3MTE1MjNcIjogXCLni67mva3kuaFcIixcblx0ICAgIFwiNzExNTI0XCI6IFwi5ZCO6b6Z6ZWHXCIsXG5cdCAgICBcIjcxMTUyNVwiOiBcIumAmumchOmVh1wiLFxuXHQgICAgXCI3MTE1MjZcIjogXCLoi5Hph4zplYdcIixcblx0ICAgIFwiNzExNTI3XCI6IFwi6IuX5qCX5biCXCIsXG5cdCAgICBcIjcxMTUyOFwiOiBcIumAoOahpeS5oVwiLFxuXHQgICAgXCI3MTE1MjlcIjogXCLlpLTlsYvkuaFcIixcblx0ICAgIFwiNzExNTMwXCI6IFwi5YWs6aaG5LmhXCIsXG5cdCAgICBcIjcxMTUzMVwiOiBcIuWkp+a5luS5oVwiLFxuXHQgICAgXCI3MTE1MzJcIjogXCLms7DlronkuaFcIixcblx0ICAgIFwiNzExNTMzXCI6IFwi6ZOc6ZSj5LmhXCIsXG5cdCAgICBcIjcxMTUzNFwiOiBcIuS4ieS5ieS5oVwiLFxuXHQgICAgXCI3MTE1MzVcIjogXCLopb/muZbkuaFcIixcblx0ICAgIFwiNzExNTM2XCI6IFwi5Y2T5YWw6ZWHXCIsXG5cdCAgICBcIjcxMTcwMFwiOiBcIuW9sOWMluWOv1wiLFxuXHQgICAgXCI3MTE3MjdcIjogXCLlvbDljJbluIJcIixcblx0ICAgIFwiNzExNzI4XCI6IFwi6Iqs5Zut5LmhXCIsXG5cdCAgICBcIjcxMTcyOVwiOiBcIuiKseWdm+S5oVwiLFxuXHQgICAgXCI3MTE3MzBcIjogXCLnp4DmsLTkuaFcIixcblx0ICAgIFwiNzExNzMxXCI6IFwi6bm/5riv6ZWHXCIsXG5cdCAgICBcIjcxMTczMlwiOiBcIuemj+WFtOS5oVwiLFxuXHQgICAgXCI3MTE3MzNcIjogXCLnur/opb/kuaFcIixcblx0ICAgIFwiNzExNzM0XCI6IFwi5ZKM576O6ZWHXCIsXG5cdCAgICBcIjcxMTczNVwiOiBcIuS8uOa4r+S5oVwiLFxuXHQgICAgXCI3MTE3MzZcIjogXCLlkZjmnpfplYdcIixcblx0ICAgIFwiNzExNzM3XCI6IFwi56S+5aS05LmhXCIsXG5cdCAgICBcIjcxMTczOFwiOiBcIuawuOmdluS5oVwiLFxuXHQgICAgXCI3MTE3MzlcIjogXCLln5Tlv4PkuaFcIixcblx0ICAgIFwiNzExNzQwXCI6IFwi5rqq5rmW6ZWHXCIsXG5cdCAgICBcIjcxMTc0MVwiOiBcIuWkp+adkeS5oVwiLFxuXHQgICAgXCI3MTE3NDJcIjogXCLln5Tnm5DkuaFcIixcblx0ICAgIFwiNzExNzQzXCI6IFwi55Sw5Lit6ZWHXCIsXG5cdCAgICBcIjcxMTc0NFwiOiBcIuWMl+aWl+mVh1wiLFxuXHQgICAgXCI3MTE3NDVcIjogXCLnlLDlsL7kuaFcIixcblx0ICAgIFwiNzExNzQ2XCI6IFwi5Z+k5aS05LmhXCIsXG5cdCAgICBcIjcxMTc0N1wiOiBcIua6quW3nuS5oVwiLFxuXHQgICAgXCI3MTE3NDhcIjogXCLnq7nloZjkuaFcIixcblx0ICAgIFwiNzExNzQ5XCI6IFwi5LqM5p6X6ZWHXCIsXG5cdCAgICBcIjcxMTc1MFwiOiBcIuWkp+WfjuS5oVwiLFxuXHQgICAgXCI3MTE3NTFcIjogXCLoirPoi5HkuaFcIixcblx0ICAgIFwiNzExNzUyXCI6IFwi5LqM5rC05LmhXCIsXG5cdCAgICBcIjcxMTkwMFwiOiBcIuWYieS5ieWOv1wiLFxuXHQgICAgXCI3MTE5MTlcIjogXCLnlarot6/kuaFcIixcblx0ICAgIFwiNzExOTIwXCI6IFwi5qKF5bGx5LmhXCIsXG5cdCAgICBcIjcxMTkyMVwiOiBcIuerueW0juS5oVwiLFxuXHQgICAgXCI3MTE5MjJcIjogXCLpmL/ph4zlsbHkuaFcIixcblx0ICAgIFwiNzExOTIzXCI6IFwi5Lit5Z+U5LmhXCIsXG5cdCAgICBcIjcxMTkyNFwiOiBcIuWkp+WflOS5oVwiLFxuXHQgICAgXCI3MTE5MjVcIjogXCLmsLTkuIrkuaFcIixcblx0ICAgIFwiNzExOTI2XCI6IFwi6bm/6I2J5LmhXCIsXG5cdCAgICBcIjcxMTkyN1wiOiBcIuWkquS/neW4glwiLFxuXHQgICAgXCI3MTE5MjhcIjogXCLmnLTlrZDluIJcIixcblx0ICAgIFwiNzExOTI5XCI6IFwi5Lic55+z5LmhXCIsXG5cdCAgICBcIjcxMTkzMFwiOiBcIuWFreiEmuS5oVwiLFxuXHQgICAgXCI3MTE5MzFcIjogXCLmlrDmuK/kuaFcIixcblx0ICAgIFwiNzExOTMyXCI6IFwi5rCR6ZuE5LmhXCIsXG5cdCAgICBcIjcxMTkzM1wiOiBcIuWkp+ael+mVh1wiLFxuXHQgICAgXCI3MTE5MzRcIjogXCLmuqrlj6PkuaFcIixcblx0ICAgIFwiNzExOTM1XCI6IFwi5LmJ56u55LmhXCIsXG5cdCAgICBcIjcxMTkzNlwiOiBcIuW4g+iii+mVh1wiLFxuXHQgICAgXCI3MTIxMDBcIjogXCLkupHmnpfljr9cIixcblx0ICAgIFwiNzEyMTIxXCI6IFwi5paX5Y2X6ZWHXCIsXG5cdCAgICBcIjcxMjEyMlwiOiBcIuWkp+WfpOS5oVwiLFxuXHQgICAgXCI3MTIxMjNcIjogXCLomY7lsL7plYdcIixcblx0ICAgIFwiNzEyMTI0XCI6IFwi5Zyf5bqT6ZWHXCIsXG5cdCAgICBcIjcxMjEyNVwiOiBcIuikkuW/oOS5oVwiLFxuXHQgICAgXCI3MTIxMjZcIjogXCLkuJzlir/kuaFcIixcblx0ICAgIFwiNzEyMTI3XCI6IFwi5Y+w6KW/5LmhXCIsXG5cdCAgICBcIjcxMjEyOFwiOiBcIuS7keiDjOS5oVwiLFxuXHQgICAgXCI3MTIxMjlcIjogXCLpuqblr67kuaFcIixcblx0ICAgIFwiNzEyMTMwXCI6IFwi5paX5YWt5biCXCIsXG5cdCAgICBcIjcxMjEzMVwiOiBcIuael+WGheS5oVwiLFxuXHQgICAgXCI3MTIxMzJcIjogXCLlj6TlnZHkuaFcIixcblx0ICAgIFwiNzEyMTMzXCI6IFwi6I6/5qGQ5LmhXCIsXG5cdCAgICBcIjcxMjEzNFwiOiBcIuilv+ieuumVh1wiLFxuXHQgICAgXCI3MTIxMzVcIjogXCLkuozku5HkuaFcIixcblx0ICAgIFwiNzEyMTM2XCI6IFwi5YyX5riv6ZWHXCIsXG5cdCAgICBcIjcxMjEzN1wiOiBcIuawtOael+S5oVwiLFxuXHQgICAgXCI3MTIxMzhcIjogXCLlj6PmuZbkuaFcIixcblx0ICAgIFwiNzEyMTM5XCI6IFwi5Zub5rmW5LmhXCIsXG5cdCAgICBcIjcxMjE0MFwiOiBcIuWFg+mVv+S5oVwiLFxuXHQgICAgXCI3MTI0MDBcIjogXCLlsY/kuJzljr9cIixcblx0ICAgIFwiNzEyNDM0XCI6IFwi5bGP5Lic5biCXCIsXG5cdCAgICBcIjcxMjQzNVwiOiBcIuS4ieWcsOmXqOS5oVwiLFxuXHQgICAgXCI3MTI0MzZcIjogXCLpm77lj7DkuaFcIixcblx0ICAgIFwiNzEyNDM3XCI6IFwi546b5a625LmhXCIsXG5cdCAgICBcIjcxMjQzOFwiOiBcIuS5neWmguS5oVwiLFxuXHQgICAgXCI3MTI0MzlcIjogXCLph4zmuK/kuaFcIixcblx0ICAgIFwiNzEyNDQwXCI6IFwi6auY5qCR5LmhXCIsXG5cdCAgICBcIjcxMjQ0MVwiOiBcIuebkOWflOS5oVwiLFxuXHQgICAgXCI3MTI0NDJcIjogXCLplb/msrvkuaFcIixcblx0ICAgIFwiNzEyNDQzXCI6IFwi6bqf5rSb5LmhXCIsXG5cdCAgICBcIjcxMjQ0NFwiOiBcIuerueeUsOS5oVwiLFxuXHQgICAgXCI3MTI0NDVcIjogXCLlhoXln5TkuaFcIixcblx0ICAgIFwiNzEyNDQ2XCI6IFwi5LiH5Li55LmhXCIsXG5cdCAgICBcIjcxMjQ0N1wiOiBcIua9ruW3numVh1wiLFxuXHQgICAgXCI3MTI0NDhcIjogXCLms7DmrabkuaFcIixcblx0ICAgIFwiNzEyNDQ5XCI6IFwi5p2l5LmJ5LmhXCIsXG5cdCAgICBcIjcxMjQ1MFwiOiBcIuS4h+WzpuS5oVwiLFxuXHQgICAgXCI3MTI0NTFcIjogXCLltIHpobbkuaFcIixcblx0ICAgIFwiNzEyNDUyXCI6IFwi5paw5Z+k5LmhXCIsXG5cdCAgICBcIjcxMjQ1M1wiOiBcIuWNl+W3nuS5oVwiLFxuXHQgICAgXCI3MTI0NTRcIjogXCLmnpfovrnkuaFcIixcblx0ICAgIFwiNzEyNDU1XCI6IFwi5Lic5riv6ZWHXCIsXG5cdCAgICBcIjcxMjQ1NlwiOiBcIueQieeQg+S5oVwiLFxuXHQgICAgXCI3MTI0NTdcIjogXCLkvbPlhqzkuaFcIixcblx0ICAgIFwiNzEyNDU4XCI6IFwi5paw5Zut5LmhXCIsXG5cdCAgICBcIjcxMjQ1OVwiOiBcIuaei+WvruS5oVwiLFxuXHQgICAgXCI3MTI0NjBcIjogXCLmnovlsbHkuaFcIixcblx0ICAgIFwiNzEyNDYxXCI6IFwi5pil5pel5LmhXCIsXG5cdCAgICBcIjcxMjQ2MlwiOiBcIueLruWtkOS5oVwiLFxuXHQgICAgXCI3MTI0NjNcIjogXCLovabln47kuaFcIixcblx0ICAgIFwiNzEyNDY0XCI6IFwi54mh5Li55LmhXCIsXG5cdCAgICBcIjcxMjQ2NVwiOiBcIuaBkuaYpemVh1wiLFxuXHQgICAgXCI3MTI0NjZcIjogXCLmu6Hlt57kuaFcIixcblx0ICAgIFwiNzEyNTAwXCI6IFwi5Y+w5Lic5Y6/XCIsXG5cdCAgICBcIjcxMjUxN1wiOiBcIuWPsOS4nOW4glwiLFxuXHQgICAgXCI3MTI1MThcIjogXCLnu7/lspvkuaFcIixcblx0ICAgIFwiNzEyNTE5XCI6IFwi5YWw5bG/5LmhXCIsXG5cdCAgICBcIjcxMjUyMFwiOiBcIuW7tuW5s+S5oVwiLFxuXHQgICAgXCI3MTI1MjFcIjogXCLljZHljZfkuaFcIixcblx0ICAgIFwiNzEyNTIyXCI6IFwi6bm/6YeO5LmhXCIsXG5cdCAgICBcIjcxMjUyM1wiOiBcIuWFs+WxsemVh1wiLFxuXHQgICAgXCI3MTI1MjRcIjogXCLmtbfnq6/kuaFcIixcblx0ICAgIFwiNzEyNTI1XCI6IFwi5rGg5LiK5LmhXCIsXG5cdCAgICBcIjcxMjUyNlwiOiBcIuS4nOays+S5oVwiLFxuXHQgICAgXCI3MTI1MjdcIjogXCLmiJDlip/plYdcIixcblx0ICAgIFwiNzEyNTI4XCI6IFwi6ZW/5ruo5LmhXCIsXG5cdCAgICBcIjcxMjUyOVwiOiBcIumHkeWzsOS5oVwiLFxuXHQgICAgXCI3MTI1MzBcIjogXCLlpKfmrabkuaFcIixcblx0ICAgIFwiNzEyNTMxXCI6IFwi6L6+5LuB5LmhXCIsXG5cdCAgICBcIjcxMjUzMlwiOiBcIuWkqum6u+mHjOS5oVwiLFxuXHQgICAgXCI3MTI2MDBcIjogXCLoirHojrLljr9cIixcblx0ICAgIFwiNzEyNjE1XCI6IFwi6Iqx6I6y5biCXCIsXG5cdCAgICBcIjcxMjYxNlwiOiBcIuaWsOWfjuS5oVwiLFxuXHQgICAgXCI3MTI2MTdcIjogXCLlpKrpsoHpmIFcIixcblx0ICAgIFwiNzEyNjE4XCI6IFwi56eA5p6X5LmhXCIsXG5cdCAgICBcIjcxMjYxOVwiOiBcIuWQieWuieS5oVwiLFxuXHQgICAgXCI3MTI2MjBcIjogXCLlr7/kuLDkuaFcIixcblx0ICAgIFwiNzEyNjIxXCI6IFwi5Yek5p6X6ZWHXCIsXG5cdCAgICBcIjcxMjYyMlwiOiBcIuWFieWkjeS5oVwiLFxuXHQgICAgXCI3MTI2MjNcIjogXCLkuLDmu6jkuaFcIixcblx0ICAgIFwiNzEyNjI0XCI6IFwi55Ge56mX5LmhXCIsXG5cdCAgICBcIjcxMjYyNVwiOiBcIuS4h+iNo+S5oVwiLFxuXHQgICAgXCI3MTI2MjZcIjogXCLnjonph4zplYdcIixcblx0ICAgIFwiNzEyNjI3XCI6IFwi5Y2T5rqq5LmhXCIsXG5cdCAgICBcIjcxMjYyOFwiOiBcIuWvjOmHjOS5oVwiLFxuXHQgICAgXCI3MTI3MDBcIjogXCLmvo7muZbljr9cIixcblx0ICAgIFwiNzEyNzA3XCI6IFwi6ams5YWs5biCXCIsXG5cdCAgICBcIjcxMjcwOFwiOiBcIuilv+Wxv+S5oVwiLFxuXHQgICAgXCI3MTI3MDlcIjogXCLmnJvlronkuaFcIixcblx0ICAgIFwiNzEyNzEwXCI6IFwi5LiD576O5LmhXCIsXG5cdCAgICBcIjcxMjcxMVwiOiBcIueZveaymeS5oVwiLFxuXHQgICAgXCI3MTI3MTJcIjogXCLmuZbopb/kuaFcIixcblx0ICAgIFwiNzEyODAwXCI6IFwi6L+e5rGf5Y6/XCIsXG5cdCAgICBcIjcxMjgwNVwiOiBcIuWNl+erv+S5oVwiLFxuXHQgICAgXCI3MTI4MDZcIjogXCLljJfnq7/kuaFcIixcblx0ICAgIFwiNzEyODA3XCI6IFwi6I6S5YWJ5LmhXCIsXG5cdCAgICBcIjcxMjgwOFwiOiBcIuS4nOW8leS5oVwiLFxuXHQgICAgXCI4MTAwMDBcIjogXCLpppnmuK/nibnliKvooYzmlL/ljLpcIixcblx0ICAgIFwiODEwMTAwXCI6IFwi6aaZ5riv5bKbXCIsXG5cdCAgICBcIjgxMDEwMVwiOiBcIuS4reilv+WMulwiLFxuXHQgICAgXCI4MTAxMDJcIjogXCLmub7ku5RcIixcblx0ICAgIFwiODEwMTAzXCI6IFwi5Lic5Yy6XCIsXG5cdCAgICBcIjgxMDEwNFwiOiBcIuWNl+WMulwiLFxuXHQgICAgXCI4MTAyMDBcIjogXCLkuZ3pvplcIixcblx0ICAgIFwiODEwMjAxXCI6IFwi5Lmd6b6Z5Z+O5Yy6XCIsXG5cdCAgICBcIjgxMDIwMlwiOiBcIuayueWwluaXuuWMulwiLFxuXHQgICAgXCI4MTAyMDNcIjogXCLmt7HmsLTln5fljLpcIixcblx0ICAgIFwiODEwMjA0XCI6IFwi6buE5aSn5LuZ5Yy6XCIsXG5cdCAgICBcIjgxMDIwNVwiOiBcIuinguWhmOWMulwiLFxuXHQgICAgXCI4MTAzMDBcIjogXCLmlrDnlYxcIixcblx0ICAgIFwiODEwMzAxXCI6IFwi5YyX5Yy6XCIsXG5cdCAgICBcIjgxMDMwMlwiOiBcIuWkp+WflOWMulwiLFxuXHQgICAgXCI4MTAzMDNcIjogXCLmspnnlLDljLpcIixcblx0ICAgIFwiODEwMzA0XCI6IFwi6KW/6LSh5Yy6XCIsXG5cdCAgICBcIjgxMDMwNVwiOiBcIuWFg+acl+WMulwiLFxuXHQgICAgXCI4MTAzMDZcIjogXCLlsa/pl6jljLpcIixcblx0ICAgIFwiODEwMzA3XCI6IFwi6I2D5rm+5Yy6XCIsXG5cdCAgICBcIjgxMDMwOFwiOiBcIuiRtemdkuWMulwiLFxuXHQgICAgXCI4MTAzMDlcIjogXCLnprvlspvljLpcIixcblx0ICAgIFwiODIwMDAwXCI6IFwi5r6z6Zeo54m55Yir6KGM5pS/5Yy6XCIsXG5cdCAgICBcIjgyMDEwMFwiOiBcIua+s+mXqOWNiuWym1wiLFxuXHQgICAgXCI4MjAyMDBcIjogXCLnprvlsptcIixcblx0ICAgIFwiOTkwMDAwXCI6IFwi5rW35aSWXCIsXG5cdCAgICBcIjk5MDEwMFwiOiBcIua1t+WkllwiXG5cdH1cblxuXHQvLyBpZCBwaWQvcGFyZW50SWQgbmFtZSBjaGlsZHJlblxuXHRmdW5jdGlvbiB0cmVlKGxpc3QpIHtcblx0ICAgIHZhciBtYXBwZWQgPSB7fVxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGl0ZW07IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgaXRlbSA9IGxpc3RbaV1cblx0ICAgICAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaWQpIGNvbnRpbnVlXG5cdCAgICAgICAgbWFwcGVkW2l0ZW0uaWRdID0gaXRlbVxuXHQgICAgfVxuXG5cdCAgICB2YXIgcmVzdWx0ID0gW11cblx0ICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBsaXN0Lmxlbmd0aDsgaWkrKykge1xuXHQgICAgICAgIGl0ZW0gPSBsaXN0W2lpXVxuXG5cdCAgICAgICAgaWYgKCFpdGVtKSBjb250aW51ZVxuXHQgICAgICAgICAgICAvKiBqc2hpbnQgLVcwNDEgKi9cblx0ICAgICAgICBpZiAoaXRlbS5waWQgPT0gdW5kZWZpbmVkICYmIGl0ZW0ucGFyZW50SWQgPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBwYXJlbnQgPSBtYXBwZWRbaXRlbS5waWRdIHx8IG1hcHBlZFtpdGVtLnBhcmVudElkXVxuXHQgICAgICAgIGlmICghcGFyZW50KSBjb250aW51ZVxuXHQgICAgICAgIGlmICghcGFyZW50LmNoaWxkcmVuKSBwYXJlbnQuY2hpbGRyZW4gPSBbXVxuXHQgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGl0ZW0pXG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmVzdWx0XG5cdH1cblxuXHR2YXIgRElDVF9GSVhFRCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgdmFyIGZpeGVkID0gW11cblx0ICAgIGZvciAodmFyIGlkIGluIERJQ1QpIHtcblx0ICAgICAgICB2YXIgcGlkID0gaWQuc2xpY2UoMiwgNikgPT09ICcwMDAwJyA/IHVuZGVmaW5lZCA6XG5cdCAgICAgICAgICAgIGlkLnNsaWNlKDQsIDYpID09ICcwMCcgPyAoaWQuc2xpY2UoMCwgMikgKyAnMDAwMCcpIDpcblx0ICAgICAgICAgICAgaWQuc2xpY2UoMCwgNCkgKyAnMDAnXG5cdCAgICAgICAgZml4ZWQucHVzaCh7XG5cdCAgICAgICAgICAgIGlkOiBpZCxcblx0ICAgICAgICAgICAgcGlkOiBwaWQsXG5cdCAgICAgICAgICAgIG5hbWU6IERJQ1RbaWRdXG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0ICAgIHJldHVybiB0cmVlKGZpeGVkKVxuXHR9KClcblxuXHRtb2R1bGUuZXhwb3J0cyA9IERJQ1RfRklYRURcblxuLyoqKi8gfSxcbi8qIDE5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgTWlzY2VsbGFuZW91c1xuXHQqL1xuXHR2YXIgRElDVCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHRcdC8vIERpY2Vcblx0XHRkNDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDQpXG5cdFx0fSxcblx0XHRkNjogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDYpXG5cdFx0fSxcblx0XHRkODogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDgpXG5cdFx0fSxcblx0XHRkMTI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubmF0dXJhbCgxLCAxMilcblx0XHR9LFxuXHRcdGQyMDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDIwKVxuXHRcdH0sXG5cdFx0ZDEwMDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDEwMClcblx0XHR9LFxuXHRcdC8qXG5cdFx0ICAgIOmaj+acuueUn+aIkOS4gOS4qiBHVUlE44CCXG5cblx0XHQgICAgaHR0cDovL3d3dy5icm9vZmEuY29tLzIwMDgvMDkvamF2YXNjcmlwdC11dWlkLWZ1bmN0aW9uL1xuXHRcdCAgICBbVVVJRCDop4TojINdKGh0dHA6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzQxMjIudHh0KVxuXHRcdCAgICAgICAgVVVJRHMgKFVuaXZlcnNhbGx5IFVuaXF1ZSBJRGVudGlmaWVyKVxuXHRcdCAgICAgICAgR1VJRHMgKEdsb2JhbGx5IFVuaXF1ZSBJRGVudGlmaWVyKVxuXHRcdCAgICAgICAgVGhlIGZvcm1hbCBkZWZpbml0aW9uIG9mIHRoZSBVVUlEIHN0cmluZyByZXByZXNlbnRhdGlvbiBpcyBwcm92aWRlZCBieSB0aGUgZm9sbG93aW5nIEFCTkYgWzddOlxuXHRcdCAgICAgICAgICAgIFVVSUQgICAgICAgICAgICAgICAgICAgPSB0aW1lLWxvdyBcIi1cIiB0aW1lLW1pZCBcIi1cIlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZS1oaWdoLWFuZC12ZXJzaW9uIFwiLVwiXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9jay1zZXEtYW5kLXJlc2VydmVkXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9jay1zZXEtbG93IFwiLVwiIG5vZGVcblx0XHQgICAgICAgICAgICB0aW1lLWxvdyAgICAgICAgICAgICAgID0gNGhleE9jdGV0XG5cdFx0ICAgICAgICAgICAgdGltZS1taWQgICAgICAgICAgICAgICA9IDJoZXhPY3RldFxuXHRcdCAgICAgICAgICAgIHRpbWUtaGlnaC1hbmQtdmVyc2lvbiAgPSAyaGV4T2N0ZXRcblx0XHQgICAgICAgICAgICBjbG9jay1zZXEtYW5kLXJlc2VydmVkID0gaGV4T2N0ZXRcblx0XHQgICAgICAgICAgICBjbG9jay1zZXEtbG93ICAgICAgICAgID0gaGV4T2N0ZXRcblx0XHQgICAgICAgICAgICBub2RlICAgICAgICAgICAgICAgICAgID0gNmhleE9jdGV0XG5cdFx0ICAgICAgICAgICAgaGV4T2N0ZXQgICAgICAgICAgICAgICA9IGhleERpZ2l0IGhleERpZ2l0XG5cdFx0ICAgICAgICAgICAgaGV4RGlnaXQgPVxuXHRcdCAgICAgICAgICAgICAgICBcIjBcIiAvIFwiMVwiIC8gXCIyXCIgLyBcIjNcIiAvIFwiNFwiIC8gXCI1XCIgLyBcIjZcIiAvIFwiN1wiIC8gXCI4XCIgLyBcIjlcIiAvXG5cdFx0ICAgICAgICAgICAgICAgIFwiYVwiIC8gXCJiXCIgLyBcImNcIiAvIFwiZFwiIC8gXCJlXCIgLyBcImZcIiAvXG5cdFx0ICAgICAgICAgICAgICAgIFwiQVwiIC8gXCJCXCIgLyBcIkNcIiAvIFwiRFwiIC8gXCJFXCIgLyBcIkZcIlxuXHRcdCAgICBcblx0XHQgICAgaHR0cHM6Ly9naXRodWIuY29tL3ZpY3RvcnF1aW5uL2NoYW5jZWpzL2Jsb2IvZGV2ZWxvcC9jaGFuY2UuanMjTDEzNDlcblx0XHQqL1xuXHRcdGd1aWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHBvb2wgPSBcImFiY2RlZkFCQ0RFRjEyMzQ1Njc4OTBcIixcblx0XHRcdFx0Z3VpZCA9IHRoaXMuc3RyaW5nKHBvb2wsIDgpICsgJy0nICtcblx0XHRcdFx0dGhpcy5zdHJpbmcocG9vbCwgNCkgKyAnLScgK1xuXHRcdFx0XHR0aGlzLnN0cmluZyhwb29sLCA0KSArICctJyArXG5cdFx0XHRcdHRoaXMuc3RyaW5nKHBvb2wsIDQpICsgJy0nICtcblx0XHRcdFx0dGhpcy5zdHJpbmcocG9vbCwgMTIpO1xuXHRcdFx0cmV0dXJuIGd1aWRcblx0XHR9LFxuXHRcdHV1aWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ3VpZCgpXG5cdFx0fSxcblx0XHQvKlxuXHRcdCAgICDpmo/mnLrnlJ/miJDkuIDkuKogMTgg5L2N6Lqr5Lu96K+B44CCXG5cblx0XHQgICAgW+i6q+S7veivgV0oaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzE2OTcuaHRtIzQpXG5cdFx0ICAgICAgICDlnLDlnYDnoIEgNiArIOWHuueUn+aXpeacn+eggSA4ICsg6aG65bqP56CBIDMgKyDmoKHpqoznoIEgMVxuXHRcdCAgICBb44CK5Lit5Y2O5Lq65rCR5YWx5ZKM5Zu96KGM5pS/5Yy65YiS5Luj56CB44CL5Zu95a625qCH5YeGKEdCL1QyMjYwKV0oaHR0cDovL3poaWRhby5iYWlkdS5jb20vcXVlc3Rpb24vMTk1NDU2MS5odG1sKVxuXHRcdCovXG5cdFx0aWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGlkLFxuXHRcdFx0XHRzdW0gPSAwLFxuXHRcdFx0XHRyYW5rID0gW1xuXHRcdFx0XHRcdFwiN1wiLCBcIjlcIiwgXCIxMFwiLCBcIjVcIiwgXCI4XCIsIFwiNFwiLCBcIjJcIiwgXCIxXCIsIFwiNlwiLCBcIjNcIiwgXCI3XCIsIFwiOVwiLCBcIjEwXCIsIFwiNVwiLCBcIjhcIiwgXCI0XCIsIFwiMlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGxhc3QgPSBbXG5cdFx0XHRcdFx0XCIxXCIsIFwiMFwiLCBcIlhcIiwgXCI5XCIsIFwiOFwiLCBcIjdcIiwgXCI2XCIsIFwiNVwiLCBcIjRcIiwgXCIzXCIsIFwiMlwiXG5cdFx0XHRcdF1cblxuXHRcdFx0aWQgPSB0aGlzLnBpY2soRElDVCkuaWQgK1xuXHRcdFx0XHR0aGlzLmRhdGUoJ3l5eXlNTWRkJykgK1xuXHRcdFx0XHR0aGlzLnN0cmluZygnbnVtYmVyJywgMylcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzdW0gKz0gaWRbaV0gKiByYW5rW2ldO1xuXHRcdFx0fVxuXHRcdFx0aWQgKz0gbGFzdFtzdW0gJSAxMV07XG5cblx0XHRcdHJldHVybiBpZFxuXHRcdH0sXG5cblx0XHQvKlxuXHRcdCAgICDnlJ/miJDkuIDkuKrlhajlsYDnmoToh6rlop7mlbTmlbDjgIJcblx0XHQgICAg57G75Ly86Ieq5aKe5Li76ZSu77yIYXV0byBpbmNyZW1lbnQgcHJpbWFyeSBrZXnvvInjgIJcblx0XHQqL1xuXHRcdGluY3JlbWVudDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIga2V5ID0gMFxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHN0ZXApIHtcblx0XHRcdFx0cmV0dXJuIGtleSArPSAoK3N0ZXAgfHwgMSkgLy8gc3RlcD9cblx0XHRcdH1cblx0XHR9KCksXG5cdFx0aW5jOiBmdW5jdGlvbihzdGVwKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pbmNyZW1lbnQoc3RlcClcblx0XHR9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDIwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcblx0dmFyIEhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHRQYXJzZXI6IFBhcnNlcixcblx0XHRIYW5kbGVyOiBIYW5kbGVyXG5cdH1cblxuLyoqKi8gfSxcbi8qIDIxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vbnV5c29mdC9yZWdleHBcblx0Ly8gZm9ya2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL0ZvcmJlc0xpbmRlc2F5L3JlZ2V4cFxuXG5cdGZ1bmN0aW9uIHBhcnNlKG4pIHtcblx0ICAgIGlmIChcInN0cmluZ1wiICE9IHR5cGVvZiBuKSB7XG5cdCAgICAgICAgdmFyIGwgPSBuZXcgVHlwZUVycm9yKFwiVGhlIHJlZ2V4cCB0byBwYXJzZSBtdXN0IGJlIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nLlwiKTtcblx0ICAgICAgICB0aHJvdyBsO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGluZGV4ID0gMSwgY2dzID0ge30sIHBhcnNlci5wYXJzZShuKTtcblx0fVxuXG5cdGZ1bmN0aW9uIFRva2VuKG4pIHtcblx0ICAgIHRoaXMudHlwZSA9IG4sIHRoaXMub2Zmc2V0ID0gVG9rZW4ub2Zmc2V0KCksIHRoaXMudGV4dCA9IFRva2VuLnRleHQoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIEFsdGVybmF0ZShuLCBsKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwiYWx0ZXJuYXRlXCIpLCB0aGlzLmxlZnQgPSBuLCB0aGlzLnJpZ2h0ID0gbDtcblx0fVxuXG5cdGZ1bmN0aW9uIE1hdGNoKG4pIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJtYXRjaFwiKSwgdGhpcy5ib2R5ID0gbi5maWx0ZXIoQm9vbGVhbik7XG5cdH1cblxuXHRmdW5jdGlvbiBHcm91cChuLCBsKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIG4pLCB0aGlzLmJvZHkgPSBsO1xuXHR9XG5cblx0ZnVuY3Rpb24gQ2FwdHVyZUdyb3VwKG4pIHtcblx0ICAgIEdyb3VwLmNhbGwodGhpcywgXCJjYXB0dXJlLWdyb3VwXCIpLCB0aGlzLmluZGV4ID0gY2dzW3RoaXMub2Zmc2V0XSB8fCAoY2dzW3RoaXMub2Zmc2V0XSA9IGluZGV4KyspLCBcblx0ICAgIHRoaXMuYm9keSA9IG47XG5cdH1cblxuXHRmdW5jdGlvbiBRdWFudGlmaWVkKG4sIGwpIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJxdWFudGlmaWVkXCIpLCB0aGlzLmJvZHkgPSBuLCB0aGlzLnF1YW50aWZpZXIgPSBsO1xuXHR9XG5cblx0ZnVuY3Rpb24gUXVhbnRpZmllcihuLCBsKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwicXVhbnRpZmllclwiKSwgdGhpcy5taW4gPSBuLCB0aGlzLm1heCA9IGwsIHRoaXMuZ3JlZWR5ID0gITA7XG5cdH1cblxuXHRmdW5jdGlvbiBDaGFyU2V0KG4sIGwpIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJjaGFyc2V0XCIpLCB0aGlzLmludmVydCA9IG4sIHRoaXMuYm9keSA9IGw7XG5cdH1cblxuXHRmdW5jdGlvbiBDaGFyYWN0ZXJSYW5nZShuLCBsKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwicmFuZ2VcIiksIHRoaXMuc3RhcnQgPSBuLCB0aGlzLmVuZCA9IGw7XG5cdH1cblxuXHRmdW5jdGlvbiBMaXRlcmFsKG4pIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJsaXRlcmFsXCIpLCB0aGlzLmJvZHkgPSBuLCB0aGlzLmVzY2FwZWQgPSB0aGlzLmJvZHkgIT0gdGhpcy50ZXh0O1xuXHR9XG5cblx0ZnVuY3Rpb24gVW5pY29kZShuKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwidW5pY29kZVwiKSwgdGhpcy5jb2RlID0gbi50b1VwcGVyQ2FzZSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gSGV4KG4pIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJoZXhcIiksIHRoaXMuY29kZSA9IG4udG9VcHBlckNhc2UoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIE9jdGFsKG4pIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJvY3RhbFwiKSwgdGhpcy5jb2RlID0gbi50b1VwcGVyQ2FzZSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gQmFja1JlZmVyZW5jZShuKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwiYmFjay1yZWZlcmVuY2VcIiksIHRoaXMuY29kZSA9IG4udG9VcHBlckNhc2UoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIENvbnRyb2xDaGFyYWN0ZXIobikge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcImNvbnRyb2wtY2hhcmFjdGVyXCIpLCB0aGlzLmNvZGUgPSBuLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHR2YXIgcGFyc2VyID0gZnVuY3Rpb24oKSB7XG5cdCAgICBmdW5jdGlvbiBuKG4sIGwpIHtcblx0ICAgICAgICBmdW5jdGlvbiB1KCkge1xuXHQgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdS5wcm90b3R5cGUgPSBsLnByb3RvdHlwZSwgbi5wcm90b3R5cGUgPSBuZXcgdSgpO1xuXHQgICAgfVxuXHQgICAgZnVuY3Rpb24gbChuLCBsLCB1LCB0LCByKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gZShuLCBsKSB7XG5cdCAgICAgICAgICAgIGZ1bmN0aW9uIHUobikge1xuXHQgICAgICAgICAgICAgICAgZnVuY3Rpb24gbChuKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG4uY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHJldHVybiBuLnJlcGxhY2UoL1xcXFwvZywgXCJcXFxcXFxcXFwiKS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFx4MDgvZywgXCJcXFxcYlwiKS5yZXBsYWNlKC9cXHQvZywgXCJcXFxcdFwiKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKS5yZXBsYWNlKC9cXGYvZywgXCJcXFxcZlwiKS5yZXBsYWNlKC9cXHIvZywgXCJcXFxcclwiKS5yZXBsYWNlKC9bXFx4MDAtXFx4MDdcXHgwQlxceDBFXFx4MEZdL2csIGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcXFxceDBcIiArIGwobik7XG5cdCAgICAgICAgICAgICAgICB9KS5yZXBsYWNlKC9bXFx4MTAtXFx4MUZcXHg4MC1cXHhGRl0vZywgZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlxcXFx4XCIgKyBsKG4pO1xuXHQgICAgICAgICAgICAgICAgfSkucmVwbGFjZSgvW1xcdTAxODAtXFx1MEZGRl0vZywgZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlxcXFx1MFwiICsgbChuKTtcblx0ICAgICAgICAgICAgICAgIH0pLnJlcGxhY2UoL1tcXHUxMDgwLVxcdUZGRkZdL2csIGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcXFxcdVwiICsgbChuKTtcblx0ICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciB0LCByO1xuXHQgICAgICAgICAgICBzd2l0Y2ggKG4ubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgICAgY2FzZSAwOlxuXHQgICAgICAgICAgICAgICAgdCA9IFwiZW5kIG9mIGlucHV0XCI7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblxuXHQgICAgICAgICAgICAgIGNhc2UgMTpcblx0ICAgICAgICAgICAgICAgIHQgPSBuWzBdO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cblx0ICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgdCA9IG4uc2xpY2UoMCwgLTEpLmpvaW4oXCIsIFwiKSArIFwiIG9yIFwiICsgbltuLmxlbmd0aCAtIDFdO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiByID0gbCA/ICdcIicgKyB1KGwpICsgJ1wiJyA6IFwiZW5kIG9mIGlucHV0XCIsIFwiRXhwZWN0ZWQgXCIgKyB0ICsgXCIgYnV0IFwiICsgciArIFwiIGZvdW5kLlwiO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLmV4cGVjdGVkID0gbiwgdGhpcy5mb3VuZCA9IGwsIHRoaXMub2Zmc2V0ID0gdSwgdGhpcy5saW5lID0gdCwgdGhpcy5jb2x1bW4gPSByLCBcblx0ICAgICAgICB0aGlzLm5hbWUgPSBcIlN5bnRheEVycm9yXCIsIHRoaXMubWVzc2FnZSA9IGUobiwgbCk7XG5cdCAgICB9XG5cdCAgICBmdW5jdGlvbiB1KG4pIHtcblx0ICAgICAgICBmdW5jdGlvbiB1KCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbi5zdWJzdHJpbmcoTHQsIHF0KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gdCgpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIEx0O1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiByKGwpIHtcblx0ICAgICAgICAgICAgZnVuY3Rpb24gdShsLCB1LCB0KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgciwgZTtcblx0ICAgICAgICAgICAgICAgIGZvciAociA9IHU7IHQgPiByOyByKyspIGUgPSBuLmNoYXJBdChyKSwgXCJcXG5cIiA9PT0gZSA/IChsLnNlZW5DUiB8fCBsLmxpbmUrKywgbC5jb2x1bW4gPSAxLCBcblx0ICAgICAgICAgICAgICAgIGwuc2VlbkNSID0gITEpIDogXCJcXHJcIiA9PT0gZSB8fCBcIlxcdTIwMjhcIiA9PT0gZSB8fCBcIlxcdTIwMjlcIiA9PT0gZSA/IChsLmxpbmUrKywgbC5jb2x1bW4gPSAxLCBcblx0ICAgICAgICAgICAgICAgIGwuc2VlbkNSID0gITApIDogKGwuY29sdW1uKyssIGwuc2VlbkNSID0gITEpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBNdCAhPT0gbCAmJiAoTXQgPiBsICYmIChNdCA9IDAsIER0ID0ge1xuXHQgICAgICAgICAgICAgICAgbGluZTogMSxcblx0ICAgICAgICAgICAgICAgIGNvbHVtbjogMSxcblx0ICAgICAgICAgICAgICAgIHNlZW5DUjogITFcblx0ICAgICAgICAgICAgfSksIHUoRHQsIE10LCBsKSwgTXQgPSBsKSwgRHQ7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGUobikge1xuXHQgICAgICAgICAgICBIdCA+IHF0IHx8IChxdCA+IEh0ICYmIChIdCA9IHF0LCBPdCA9IFtdKSwgT3QucHVzaChuKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIG8obikge1xuXHQgICAgICAgICAgICB2YXIgbCA9IDA7XG5cdCAgICAgICAgICAgIGZvciAobi5zb3J0KCk7IGwgPCBuLmxlbmd0aDsgKSBuW2wgLSAxXSA9PT0gbltsXSA/IG4uc3BsaWNlKGwsIDEpIDogbCsrO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBjKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgciwgbztcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgdSA9IGkoKSwgbnVsbCAhPT0gdSA/ICh0ID0gcXQsIDEyNCA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/IChyID0gZmwsIFxuXHQgICAgICAgICAgICBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShzbCkpLCBudWxsICE9PSByID8gKG8gPSBjKCksIG51bGwgIT09IG8gPyAociA9IFsgciwgbyBdLCBcblx0ICAgICAgICAgICAgdCA9IHIpIDogKHF0ID0gdCwgdCA9IGlsKSkgOiAocXQgPSB0LCB0ID0gaWwpLCBudWxsID09PSB0ICYmICh0ID0gYWwpLCBudWxsICE9PSB0ID8gKEx0ID0gbCwgXG5cdCAgICAgICAgICAgIHUgPSBobCh1LCB0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGkoKSB7XG5cdCAgICAgICAgICAgIHZhciBuLCBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICBpZiAobiA9IHF0LCBsID0gZigpLCBudWxsID09PSBsICYmIChsID0gYWwpLCBudWxsICE9PSBsKSBpZiAodSA9IHF0LCBXdCsrLCB0ID0gZCgpLCBcblx0ICAgICAgICAgICAgV3QtLSwgbnVsbCA9PT0gdCA/IHUgPSBhbCA6IChxdCA9IHUsIHUgPSBpbCksIG51bGwgIT09IHUpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodCA9IFtdLCByID0gaCgpLCBudWxsID09PSByICYmIChyID0gYSgpKTsgbnVsbCAhPT0gcjsgKSB0LnB1c2gociksIHIgPSBoKCksIFxuXHQgICAgICAgICAgICAgICAgbnVsbCA9PT0gciAmJiAociA9IGEoKSk7XG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSB0ID8gKHIgPSBzKCksIG51bGwgPT09IHIgJiYgKHIgPSBhbCksIG51bGwgIT09IHIgPyAoTHQgPSBuLCBsID0gZGwobCwgdCwgciksIFxuXHQgICAgICAgICAgICAgICAgbnVsbCA9PT0gbCA/IChxdCA9IG4sIG4gPSBsKSA6IG4gPSBsKSA6IChxdCA9IG4sIG4gPSBpbCkpIDogKHF0ID0gbiwgbiA9IGlsKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHF0ID0gbiwgbiA9IGlsOyBlbHNlIHF0ID0gbiwgbiA9IGlsO1xuXHQgICAgICAgICAgICByZXR1cm4gbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gYSgpIHtcblx0ICAgICAgICAgICAgdmFyIG47XG5cdCAgICAgICAgICAgIHJldHVybiBuID0geCgpLCBudWxsID09PSBuICYmIChuID0gUSgpLCBudWxsID09PSBuICYmIChuID0gQigpKSksIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGYoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA5NCA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gcGwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHZsKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSB3bCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBzKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgMzYgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IEFsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShDbCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gZ2woKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gaCgpIHtcblx0ICAgICAgICAgICAgdmFyIG4sIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBuID0gcXQsIGwgPSBhKCksIG51bGwgIT09IGwgPyAodSA9IGQoKSwgbnVsbCAhPT0gdSA/IChMdCA9IG4sIGwgPSBibChsLCB1KSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IGwgPyAocXQgPSBuLCBuID0gbCkgOiBuID0gbCkgOiAocXQgPSBuLCBuID0gaWwpKSA6IChxdCA9IG4sIG4gPSBpbCksIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGQoKSB7XG5cdCAgICAgICAgICAgIHZhciBuLCBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gV3QrKywgbiA9IHF0LCBsID0gcCgpLCBudWxsICE9PSBsID8gKHUgPSBrKCksIG51bGwgPT09IHUgJiYgKHUgPSBhbCksIG51bGwgIT09IHUgPyAoTHQgPSBuLCBcblx0ICAgICAgICAgICAgbCA9IFRsKGwsIHUpLCBudWxsID09PSBsID8gKHF0ID0gbiwgbiA9IGwpIDogbiA9IGwpIDogKHF0ID0gbiwgbiA9IGlsKSkgOiAocXQgPSBuLCBcblx0ICAgICAgICAgICAgbiA9IGlsKSwgV3QtLSwgbnVsbCA9PT0gbiAmJiAobCA9IG51bGwsIDAgPT09IFd0ICYmIGUoa2wpKSwgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gcCgpIHtcblx0ICAgICAgICAgICAgdmFyIG47XG5cdCAgICAgICAgICAgIHJldHVybiBuID0gdigpLCBudWxsID09PSBuICYmIChuID0gdygpLCBudWxsID09PSBuICYmIChuID0gQSgpLCBudWxsID09PSBuICYmIChuID0gQygpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IGcoKSwgbnVsbCA9PT0gbiAmJiAobiA9IGIoKSkpKSkpLCBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB2KCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgciwgbywgYztcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgMTIzID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSB4bCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoeWwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAodCA9IFQoKSwgbnVsbCAhPT0gdCA/ICg0NCA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/IChyID0gbWwsIHF0KyspIDogKHIgPSBudWxsLCBcblx0ICAgICAgICAgICAgMCA9PT0gV3QgJiYgZShSbCkpLCBudWxsICE9PSByID8gKG8gPSBUKCksIG51bGwgIT09IG8gPyAoMTI1ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKGMgPSBGbCwgXG5cdCAgICAgICAgICAgIHF0KyspIDogKGMgPSBudWxsLCAwID09PSBXdCAmJiBlKFFsKSksIG51bGwgIT09IGMgPyAoTHQgPSBsLCB1ID0gU2wodCwgbyksIG51bGwgPT09IHUgPyAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gdygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDEyMyA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0geGwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHlsKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKHQgPSBUKCksIG51bGwgIT09IHQgPyAobi5zdWJzdHIocXQsIDIpID09PSBVbCA/IChyID0gVWwsIHF0ICs9IDIpIDogKHIgPSBudWxsLCBcblx0ICAgICAgICAgICAgMCA9PT0gV3QgJiYgZShFbCkpLCBudWxsICE9PSByID8gKEx0ID0gbCwgdSA9IEdsKHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBBKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgMTIzID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSB4bCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoeWwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAodCA9IFQoKSwgbnVsbCAhPT0gdCA/ICgxMjUgPT09IG4uY2hhckNvZGVBdChxdCkgPyAociA9IEZsLCBxdCsrKSA6IChyID0gbnVsbCwgXG5cdCAgICAgICAgICAgIDAgPT09IFd0ICYmIGUoUWwpKSwgbnVsbCAhPT0gciA/IChMdCA9IGwsIHUgPSBCbCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gQygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDQzID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBqbCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoJGwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IHFsKCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGcoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA0MiA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gTGwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKE1sKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBEbCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBiKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgNjMgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IEhsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShPbCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gV2woKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gaygpIHtcblx0ICAgICAgICAgICAgdmFyIGw7XG5cdCAgICAgICAgICAgIHJldHVybiA2MyA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/IChsID0gSGwsIHF0KyspIDogKGwgPSBudWxsLCAwID09PSBXdCAmJiBlKE9sKSksIFxuXHQgICAgICAgICAgICBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBUKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdDtcblx0ICAgICAgICAgICAgaWYgKGwgPSBxdCwgdSA9IFtdLCB6bC50ZXN0KG4uY2hhckF0KHF0KSkgPyAodCA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAodCA9IG51bGwsIFxuXHQgICAgICAgICAgICAwID09PSBXdCAmJiBlKElsKSksIG51bGwgIT09IHQpIGZvciAoO251bGwgIT09IHQ7ICkgdS5wdXNoKHQpLCB6bC50ZXN0KG4uY2hhckF0KHF0KSkgPyAodCA9IG4uY2hhckF0KHF0KSwgXG5cdCAgICAgICAgICAgIHF0KyspIDogKHQgPSBudWxsLCAwID09PSBXdCAmJiBlKElsKSk7IGVsc2UgdSA9IGlsO1xuXHQgICAgICAgICAgICByZXR1cm4gbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gSmwodSkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIFxuXHQgICAgICAgICAgICBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB4KCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgNDAgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IEtsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShObCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/ICh0ID0gUigpLCBudWxsID09PSB0ICYmICh0ID0gRigpLCBudWxsID09PSB0ICYmICh0ID0gbSgpLCBudWxsID09PSB0ICYmICh0ID0geSgpKSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdCA/ICg0MSA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/IChyID0gUGwsIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKFZsKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSByID8gKEx0ID0gbCwgdSA9IFhsKHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB5KCkge1xuXHQgICAgICAgICAgICB2YXIgbiwgbDtcblx0ICAgICAgICAgICAgcmV0dXJuIG4gPSBxdCwgbCA9IGMoKSwgbnVsbCAhPT0gbCAmJiAoTHQgPSBuLCBsID0gWWwobCkpLCBudWxsID09PSBsID8gKHF0ID0gbiwgXG5cdCAgICAgICAgICAgIG4gPSBsKSA6IG4gPSBsLCBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBtKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdDtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBabCA/ICh1ID0gWmwsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKF9sKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKHQgPSBjKCksIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0gbnUodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBSKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdDtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBsdSA/ICh1ID0gbHUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHV1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKHQgPSBjKCksIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0gdHUodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBGKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdDtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBydSA/ICh1ID0gcnUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKGV1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKHQgPSBjKCksIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0gb3UodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBRKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgciwgbztcblx0ICAgICAgICAgICAgaWYgKFd0KyssIGwgPSBxdCwgOTEgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IGl1LCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShhdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSkgaWYgKDk0ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHQgPSBwbCwgcXQrKykgOiAodCA9IG51bGwsIDAgPT09IFd0ICYmIGUodmwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IHQgJiYgKHQgPSBhbCksIG51bGwgIT09IHQpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAociA9IFtdLCBvID0gUygpLCBudWxsID09PSBvICYmIChvID0gVSgpKTsgbnVsbCAhPT0gbzsgKSByLnB1c2gobyksIG8gPSBTKCksIFxuXHQgICAgICAgICAgICAgICAgbnVsbCA9PT0gbyAmJiAobyA9IFUoKSk7XG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSByID8gKDkzID09PSBuLmNoYXJDb2RlQXQocXQpID8gKG8gPSBmdSwgcXQrKykgOiAobyA9IG51bGwsIDAgPT09IFd0ICYmIGUoc3UpKSwgXG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSBvID8gKEx0ID0gbCwgdSA9IGh1KHQsIHIpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSBxdCA9IGwsIGwgPSBpbDsgZWxzZSBxdCA9IGwsIGwgPSBpbDtcblx0ICAgICAgICAgICAgcmV0dXJuIFd0LS0sIG51bGwgPT09IGwgJiYgKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKGN1KSksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFMoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICByZXR1cm4gV3QrKywgbCA9IHF0LCB1ID0gVSgpLCBudWxsICE9PSB1ID8gKDQ1ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHQgPSBwdSwgcXQrKykgOiAodCA9IG51bGwsIFxuXHQgICAgICAgICAgICAwID09PSBXdCAmJiBlKHZ1KSksIG51bGwgIT09IHQgPyAociA9IFUoKSwgbnVsbCAhPT0gciA/IChMdCA9IGwsIHUgPSB3dSh1LCByKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgV3QtLSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IGwgJiYgKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKGR1KSksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFUoKSB7XG5cdCAgICAgICAgICAgIHZhciBuLCBsO1xuXHQgICAgICAgICAgICByZXR1cm4gV3QrKywgbiA9IEcoKSwgbnVsbCA9PT0gbiAmJiAobiA9IEUoKSksIFd0LS0sIG51bGwgPT09IG4gJiYgKGwgPSBudWxsLCAwID09PSBXdCAmJiBlKEF1KSksIFxuXHQgICAgICAgICAgICBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBFKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgQ3UudGVzdChuLmNoYXJBdChxdCkpID8gKHUgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKGd1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBidSh1KSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gRygpIHtcblx0ICAgICAgICAgICAgdmFyIG47XG5cdCAgICAgICAgICAgIHJldHVybiBuID0gTCgpLCBudWxsID09PSBuICYmIChuID0gWSgpLCBudWxsID09PSBuICYmIChuID0gSCgpLCBudWxsID09PSBuICYmIChuID0gTygpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IFcoKSwgbnVsbCA9PT0gbiAmJiAobiA9IHooKSwgbnVsbCA9PT0gbiAmJiAobiA9IEkoKSwgbnVsbCA9PT0gbiAmJiAobiA9IEooKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBLKCksIG51bGwgPT09IG4gJiYgKG4gPSBOKCksIG51bGwgPT09IG4gJiYgKG4gPSBQKCksIG51bGwgPT09IG4gJiYgKG4gPSBWKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gWCgpLCBudWxsID09PSBuICYmIChuID0gXygpLCBudWxsID09PSBuICYmIChuID0gbmwoKSwgbnVsbCA9PT0gbiAmJiAobiA9IGxsKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gdWwoKSwgbnVsbCA9PT0gbiAmJiAobiA9IHRsKCkpKSkpKSkpKSkpKSkpKSkpKSwgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gQigpIHtcblx0ICAgICAgICAgICAgdmFyIG47XG5cdCAgICAgICAgICAgIHJldHVybiBuID0gaigpLCBudWxsID09PSBuICYmIChuID0gcSgpLCBudWxsID09PSBuICYmIChuID0gJCgpKSksIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGooKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA0NiA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0ga3UsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKFR1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSB4dSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiAkKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIFd0KyssIGwgPSBxdCwgbXUudGVzdChuLmNoYXJBdChxdCkpID8gKHUgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHUgPSBudWxsLCBcblx0ICAgICAgICAgICAgMCA9PT0gV3QgJiYgZShSdSkpLCBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBidSh1KSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgXG5cdCAgICAgICAgICAgIFd0LS0sIG51bGwgPT09IGwgJiYgKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHl1KSksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHEoKSB7XG5cdCAgICAgICAgICAgIHZhciBuO1xuXHQgICAgICAgICAgICByZXR1cm4gbiA9IE0oKSwgbnVsbCA9PT0gbiAmJiAobiA9IEQoKSwgbnVsbCA9PT0gbiAmJiAobiA9IFkoKSwgbnVsbCA9PT0gbiAmJiAobiA9IEgoKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBPKCksIG51bGwgPT09IG4gJiYgKG4gPSBXKCksIG51bGwgPT09IG4gJiYgKG4gPSB6KCksIG51bGwgPT09IG4gJiYgKG4gPSBJKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gSigpLCBudWxsID09PSBuICYmIChuID0gSygpLCBudWxsID09PSBuICYmIChuID0gTigpLCBudWxsID09PSBuICYmIChuID0gUCgpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IFYoKSwgbnVsbCA9PT0gbiAmJiAobiA9IFgoKSwgbnVsbCA9PT0gbiAmJiAobiA9IFooKSwgbnVsbCA9PT0gbiAmJiAobiA9IF8oKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBubCgpLCBudWxsID09PSBuICYmIChuID0gbGwoKSwgbnVsbCA9PT0gbiAmJiAobiA9IHVsKCksIG51bGwgPT09IG4gJiYgKG4gPSB0bCgpKSkpKSkpKSkpKSkpKSkpKSkpKSwgXG5cdCAgICAgICAgICAgIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEwoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEZ1ID8gKHUgPSBGdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoUXUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IFN1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIE0oKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEZ1ID8gKHUgPSBGdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoUXUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IFV1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEQoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEV1ID8gKHUgPSBFdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoR3UpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IEJ1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEgoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IGp1ID8gKHUgPSBqdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoJHUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IHF1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIE8oKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEx1ID8gKHUgPSBMdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoTXUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IER1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFcoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEh1ID8gKHUgPSBIdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoT3UpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IFd1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHooKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IHp1ID8gKHUgPSB6dSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoSXUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IEp1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEkoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEt1ID8gKHUgPSBLdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoTnUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IFB1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEooKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IFZ1ID8gKHUgPSBWdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoWHUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IFl1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEsoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IFp1ID8gKHUgPSBadSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoX3UpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IG50KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIE4oKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IGx0ID8gKHUgPSBsdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUodXQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IHR0KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFAoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IHJ0ID8gKHUgPSBydCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoZXQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IG90KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFYoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IGN0ID8gKHUgPSBjdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoaXQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IGF0KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFgoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IGZ0ID8gKHUgPSBmdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoc3QpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IGh0KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFkoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IGR0ID8gKHUgPSBkdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUocHQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAobi5sZW5ndGggPiBxdCA/ICh0ID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6ICh0ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh2dCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSB3dCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFooKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA5MiA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gQXQsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKEN0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKGd0LnRlc3Qobi5jaGFyQXQocXQpKSA/ICh0ID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6ICh0ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShidCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSBrdCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIF8oKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICBpZiAobCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IFR0ID8gKHUgPSBUdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoeHQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUpIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0ID0gW10sIHl0LnRlc3Qobi5jaGFyQXQocXQpKSA/IChyID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShtdCkpLCBcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHIpIGZvciAoO251bGwgIT09IHI7ICkgdC5wdXNoKHIpLCB5dC50ZXN0KG4uY2hhckF0KHF0KSkgPyAociA9IG4uY2hhckF0KHF0KSwgXG5cdCAgICAgICAgICAgICAgICBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShtdCkpOyBlbHNlIHQgPSBpbDtcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0gUnQodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgICAgIGwgPSBpbCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSBxdCA9IGwsIGwgPSBpbDtcblx0ICAgICAgICAgICAgcmV0dXJuIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIG5sKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgaWYgKGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBGdCA/ICh1ID0gRnQsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKFF0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodCA9IFtdLCBTdC50ZXN0KG4uY2hhckF0KHF0KSkgPyAociA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUoVXQpKSwgXG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSByKSBmb3IgKDtudWxsICE9PSByOyApIHQucHVzaChyKSwgU3QudGVzdChuLmNoYXJBdChxdCkpID8gKHIgPSBuLmNoYXJBdChxdCksIFxuXHQgICAgICAgICAgICAgICAgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUoVXQpKTsgZWxzZSB0ID0gaWw7XG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IEV0KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgICAgICBsID0gaWwpO1xuXHQgICAgICAgICAgICB9IGVsc2UgcXQgPSBsLCBsID0gaWw7XG5cdCAgICAgICAgICAgIHJldHVybiBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBsbCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIGlmIChsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gR3QgPyAodSA9IEd0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShCdCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHQgPSBbXSwgU3QudGVzdChuLmNoYXJBdChxdCkpID8gKHIgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKFV0KSksIFxuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gcikgZm9yICg7bnVsbCAhPT0gcjsgKSB0LnB1c2gociksIFN0LnRlc3Qobi5jaGFyQXQocXQpKSA/IChyID0gbi5jaGFyQXQocXQpLCBcblx0ICAgICAgICAgICAgICAgIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKFV0KSk7IGVsc2UgdCA9IGlsO1xuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSBqdCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICAgICAgbCA9IGlsKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHF0ID0gbCwgbCA9IGlsO1xuXHQgICAgICAgICAgICByZXR1cm4gbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gdWwoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IFR0ID8gKHUgPSBUdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoeHQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9ICR0KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHRsKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdDtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgOTIgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IEF0LCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShDdCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/IChuLmxlbmd0aCA+IHF0ID8gKHQgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHQgPSBudWxsLCAwID09PSBXdCAmJiBlKHZ0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IGJ1KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHJsLCBlbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDoge30sIG9sID0ge1xuXHQgICAgICAgICAgICByZWdleHA6IGNcblx0ICAgICAgICB9LCBjbCA9IGMsIGlsID0gbnVsbCwgYWwgPSBcIlwiLCBmbCA9IFwifFwiLCBzbCA9ICdcInxcIicsIGhsID0gZnVuY3Rpb24obiwgbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbCA/IG5ldyBBbHRlcm5hdGUobiwgbFsxXSkgOiBuO1xuXHQgICAgICAgIH0sIGRsID0gZnVuY3Rpb24obiwgbCwgdSkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IE1hdGNoKFsgbiBdLmNvbmNhdChsKS5jb25jYXQoWyB1IF0pKTtcblx0ICAgICAgICB9LCBwbCA9IFwiXlwiLCB2bCA9ICdcIl5cIicsIHdsID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJzdGFydFwiKTtcblx0ICAgICAgICB9LCBBbCA9IFwiJFwiLCBDbCA9ICdcIiRcIicsIGdsID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJlbmRcIik7XG5cdCAgICAgICAgfSwgYmwgPSBmdW5jdGlvbihuLCBsKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUXVhbnRpZmllZChuLCBsKTtcblx0ICAgICAgICB9LCBrbCA9IFwiUXVhbnRpZmllclwiLCBUbCA9IGZ1bmN0aW9uKG4sIGwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgJiYgKG4uZ3JlZWR5ID0gITEpLCBuO1xuXHQgICAgICAgIH0sIHhsID0gXCJ7XCIsIHlsID0gJ1wie1wiJywgbWwgPSBcIixcIiwgUmwgPSAnXCIsXCInLCBGbCA9IFwifVwiLCBRbCA9ICdcIn1cIicsIFNsID0gZnVuY3Rpb24obiwgbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFF1YW50aWZpZXIobiwgbCk7XG5cdCAgICAgICAgfSwgVWwgPSBcIix9XCIsIEVsID0gJ1wiLH1cIicsIEdsID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFF1YW50aWZpZXIobiwgMS8wKTtcblx0ICAgICAgICB9LCBCbCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWFudGlmaWVyKG4sIG4pO1xuXHQgICAgICAgIH0sIGpsID0gXCIrXCIsICRsID0gJ1wiK1wiJywgcWwgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWFudGlmaWVyKDEsIDEvMCk7XG5cdCAgICAgICAgfSwgTGwgPSBcIipcIiwgTWwgPSAnXCIqXCInLCBEbCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFF1YW50aWZpZXIoMCwgMS8wKTtcblx0ICAgICAgICB9LCBIbCA9IFwiP1wiLCBPbCA9ICdcIj9cIicsIFdsID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUXVhbnRpZmllcigwLCAxKTtcblx0ICAgICAgICB9LCB6bCA9IC9eWzAtOV0vLCBJbCA9IFwiWzAtOV1cIiwgSmwgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiArbi5qb2luKFwiXCIpO1xuXHQgICAgICAgIH0sIEtsID0gXCIoXCIsIE5sID0gJ1wiKFwiJywgUGwgPSBcIilcIiwgVmwgPSAnXCIpXCInLCBYbCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG47XG5cdCAgICAgICAgfSwgWWwgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgQ2FwdHVyZUdyb3VwKG4pO1xuXHQgICAgICAgIH0sIFpsID0gXCI/OlwiLCBfbCA9ICdcIj86XCInLCBudSA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBHcm91cChcIm5vbi1jYXB0dXJlLWdyb3VwXCIsIG4pO1xuXHQgICAgICAgIH0sIGx1ID0gXCI/PVwiLCB1dSA9ICdcIj89XCInLCB0dSA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBHcm91cChcInBvc2l0aXZlLWxvb2thaGVhZFwiLCBuKTtcblx0ICAgICAgICB9LCBydSA9IFwiPyFcIiwgZXUgPSAnXCI/IVwiJywgb3UgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgR3JvdXAoXCJuZWdhdGl2ZS1sb29rYWhlYWRcIiwgbik7XG5cdCAgICAgICAgfSwgY3UgPSBcIkNoYXJhY3RlclNldFwiLCBpdSA9IFwiW1wiLCBhdSA9ICdcIltcIicsIGZ1ID0gXCJdXCIsIHN1ID0gJ1wiXVwiJywgaHUgPSBmdW5jdGlvbihuLCBsKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhclNldCghIW4sIGwpO1xuXHQgICAgICAgIH0sIGR1ID0gXCJDaGFyYWN0ZXJSYW5nZVwiLCBwdSA9IFwiLVwiLCB2dSA9ICdcIi1cIicsIHd1ID0gZnVuY3Rpb24obiwgbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IENoYXJhY3RlclJhbmdlKG4sIGwpO1xuXHQgICAgICAgIH0sIEF1ID0gXCJDaGFyYWN0ZXJcIiwgQ3UgPSAvXlteXFxcXFxcXV0vLCBndSA9IFwiW15cXFxcXFxcXFxcXFxdXVwiLCBidSA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBMaXRlcmFsKG4pO1xuXHQgICAgICAgIH0sIGt1ID0gXCIuXCIsIFR1ID0gJ1wiLlwiJywgeHUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcImFueS1jaGFyYWN0ZXJcIik7XG5cdCAgICAgICAgfSwgeXUgPSBcIkxpdGVyYWxcIiwgbXUgPSAvXltefFxcXFxcXC8uWygpPysqJFxcXl0vLCBSdSA9IFwiW158XFxcXFxcXFxcXFxcLy5bKCk/KyokXFxcXF5dXCIsIEZ1ID0gXCJcXFxcYlwiLCBRdSA9ICdcIlxcXFxcXFxcYlwiJywgU3UgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcImJhY2tzcGFjZVwiKTtcblx0ICAgICAgICB9LCBVdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwid29yZC1ib3VuZGFyeVwiKTtcblx0ICAgICAgICB9LCBFdSA9IFwiXFxcXEJcIiwgR3UgPSAnXCJcXFxcXFxcXEJcIicsIEJ1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJub24td29yZC1ib3VuZGFyeVwiKTtcblx0ICAgICAgICB9LCBqdSA9IFwiXFxcXGRcIiwgJHUgPSAnXCJcXFxcXFxcXGRcIicsIHF1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJkaWdpdFwiKTtcblx0ICAgICAgICB9LCBMdSA9IFwiXFxcXERcIiwgTXUgPSAnXCJcXFxcXFxcXERcIicsIER1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJub24tZGlnaXRcIik7XG5cdCAgICAgICAgfSwgSHUgPSBcIlxcXFxmXCIsIE91ID0gJ1wiXFxcXFxcXFxmXCInLCBXdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwiZm9ybS1mZWVkXCIpO1xuXHQgICAgICAgIH0sIHp1ID0gXCJcXFxcblwiLCBJdSA9ICdcIlxcXFxcXFxcblwiJywgSnUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcImxpbmUtZmVlZFwiKTtcblx0ICAgICAgICB9LCBLdSA9IFwiXFxcXHJcIiwgTnUgPSAnXCJcXFxcXFxcXHJcIicsIFB1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJjYXJyaWFnZS1yZXR1cm5cIik7XG5cdCAgICAgICAgfSwgVnUgPSBcIlxcXFxzXCIsIFh1ID0gJ1wiXFxcXFxcXFxzXCInLCBZdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwid2hpdGUtc3BhY2VcIik7XG5cdCAgICAgICAgfSwgWnUgPSBcIlxcXFxTXCIsIF91ID0gJ1wiXFxcXFxcXFxTXCInLCBudCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwibm9uLXdoaXRlLXNwYWNlXCIpO1xuXHQgICAgICAgIH0sIGx0ID0gXCJcXFxcdFwiLCB1dCA9ICdcIlxcXFxcXFxcdFwiJywgdHQgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcInRhYlwiKTtcblx0ICAgICAgICB9LCBydCA9IFwiXFxcXHZcIiwgZXQgPSAnXCJcXFxcXFxcXHZcIicsIG90ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJ2ZXJ0aWNhbC10YWJcIik7XG5cdCAgICAgICAgfSwgY3QgPSBcIlxcXFx3XCIsIGl0ID0gJ1wiXFxcXFxcXFx3XCInLCBhdCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwid29yZFwiKTtcblx0ICAgICAgICB9LCBmdCA9IFwiXFxcXFdcIiwgc3QgPSAnXCJcXFxcXFxcXFdcIicsIGh0ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJub24td29yZFwiKTtcblx0ICAgICAgICB9LCBkdCA9IFwiXFxcXGNcIiwgcHQgPSAnXCJcXFxcXFxcXGNcIicsIHZ0ID0gXCJhbnkgY2hhcmFjdGVyXCIsIHd0ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IENvbnRyb2xDaGFyYWN0ZXIobik7XG5cdCAgICAgICAgfSwgQXQgPSBcIlxcXFxcIiwgQ3QgPSAnXCJcXFxcXFxcXFwiJywgZ3QgPSAvXlsxLTldLywgYnQgPSBcIlsxLTldXCIsIGt0ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IEJhY2tSZWZlcmVuY2Uobik7XG5cdCAgICAgICAgfSwgVHQgPSBcIlxcXFwwXCIsIHh0ID0gJ1wiXFxcXFxcXFwwXCInLCB5dCA9IC9eWzAtN10vLCBtdCA9IFwiWzAtN11cIiwgUnQgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgT2N0YWwobi5qb2luKFwiXCIpKTtcblx0ICAgICAgICB9LCBGdCA9IFwiXFxcXHhcIiwgUXQgPSAnXCJcXFxcXFxcXHhcIicsIFN0ID0gL15bMC05YS1mQS1GXS8sIFV0ID0gXCJbMC05YS1mQS1GXVwiLCBFdCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBIZXgobi5qb2luKFwiXCIpKTtcblx0ICAgICAgICB9LCBHdCA9IFwiXFxcXHVcIiwgQnQgPSAnXCJcXFxcXFxcXHVcIicsIGp0ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFVuaWNvZGUobi5qb2luKFwiXCIpKTtcblx0ICAgICAgICB9LCAkdCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwibnVsbC1jaGFyYWN0ZXJcIik7XG5cdCAgICAgICAgfSwgcXQgPSAwLCBMdCA9IDAsIE10ID0gMCwgRHQgPSB7XG5cdCAgICAgICAgICAgIGxpbmU6IDEsXG5cdCAgICAgICAgICAgIGNvbHVtbjogMSxcblx0ICAgICAgICAgICAgc2VlbkNSOiAhMVxuXHQgICAgICAgIH0sIEh0ID0gMCwgT3QgPSBbXSwgV3QgPSAwO1xuXHQgICAgICAgIGlmIChcInN0YXJ0UnVsZVwiIGluIGVsKSB7XG5cdCAgICAgICAgICAgIGlmICghKGVsLnN0YXJ0UnVsZSBpbiBvbCkpIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHN0YXJ0IHBhcnNpbmcgZnJvbSBydWxlIFxcXCJcIiArIGVsLnN0YXJ0UnVsZSArICdcIi4nKTtcblx0ICAgICAgICAgICAgY2wgPSBvbFtlbC5zdGFydFJ1bGVdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoVG9rZW4ub2Zmc2V0ID0gdCwgVG9rZW4udGV4dCA9IHUsIHJsID0gY2woKSwgbnVsbCAhPT0gcmwgJiYgcXQgPT09IG4ubGVuZ3RoKSByZXR1cm4gcmw7XG5cdCAgICAgICAgdGhyb3cgbyhPdCksIEx0ID0gTWF0aC5tYXgocXQsIEh0KSwgbmV3IGwoT3QsIEx0IDwgbi5sZW5ndGggPyBuLmNoYXJBdChMdCkgOiBudWxsLCBMdCwgcihMdCkubGluZSwgcihMdCkuY29sdW1uKTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBuKGwsIEVycm9yKSwge1xuXHQgICAgICAgIFN5bnRheEVycm9yOiBsLFxuXHQgICAgICAgIHBhcnNlOiB1XG5cdCAgICB9O1xuXHR9KCksIGluZGV4ID0gMSwgY2dzID0ge307XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBwYXJzZXJcblxuLyoqKi8gfSxcbi8qIDIyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgUmVnRXhwIEhhbmRsZXJcblxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL0ZvcmJlc0xpbmRlc2F5L3JlZ2V4cFxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2RtYWpkYS9wZWdqc1xuXHQgICAgaHR0cDovL3d3dy5yZWdleHBlci5jb20vXG5cblx0ICAgIOavj+S4quiKgueCueeahOe7k+aehFxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgdHlwZTogJycsXG5cdCAgICAgICAgICAgIG9mZnNldDogbnVtYmVyLFxuXHQgICAgICAgICAgICB0ZXh0OiAnJyxcblx0ICAgICAgICAgICAgYm9keToge30sXG5cdCAgICAgICAgICAgIGVzY2FwZWQ6IHRydWUvZmFsc2Vcblx0ICAgICAgICB9XG5cblx0ICAgIHR5cGUg5Y+v6YCJ5YC8XG5cdCAgICAgICAgYWx0ZXJuYXRlICAgICAgICAgICAgIHwgICAgICAgICDpgInmi6lcblx0ICAgICAgICBtYXRjaCAgICAgICAgICAgICAgICAg5Yy56YWNXG5cdCAgICAgICAgY2FwdHVyZS1ncm91cCAgICAgICAgICgpICAgICAgICDmjZXojrfnu4Rcblx0ICAgICAgICBub24tY2FwdHVyZS1ncm91cCAgICAgKD86Li4uKSAgIOmdnuaNleiOt+e7hFxuXHQgICAgICAgIHBvc2l0aXZlLWxvb2thaGVhZCAgICAoPz1wKSAgICAg6Zu25a695q2j5ZCR5YWI6KGM5pat6KiAXG5cdCAgICAgICAgbmVnYXRpdmUtbG9va2FoZWFkICAgICg/IXApICAgICDpm7blrr3otJ/lkJHlhYjooYzmlq3oqIBcblx0ICAgICAgICBxdWFudGlmaWVkICAgICAgICAgICAgYSogICAgICAgIOmHjeWkjeiKgueCuVxuXHQgICAgICAgIHF1YW50aWZpZXIgICAgICAgICAgICAqICAgICAgICAg6YeP6K+NXG5cdCAgICAgICAgY2hhcnNldCAgICAgICAgICAgICAgIFtdICAgICAgICDlrZfnrKbpm4Zcblx0ICAgICAgICByYW5nZSAgICAgICAgICAgICAgICAge20sIG59ICAgIOiMg+WbtFxuXHQgICAgICAgIGxpdGVyYWwgICAgICAgICAgICAgICBhICAgICAgICAg55u05o6l6YeP5a2X56ymXG5cdCAgICAgICAgdW5pY29kZSAgICAgICAgICAgICAgIFxcdXh4eHggICAgVW5pY29kZVxuXHQgICAgICAgIGhleCAgICAgICAgICAgICAgICAgICBcXHggICAgICAgIOWNgeWFrei/m+WItlxuXHQgICAgICAgIG9jdGFsICAgICAgICAgICAgICAgICDlhavov5vliLZcblx0ICAgICAgICBiYWNrLXJlZmVyZW5jZSAgICAgICAgXFxuICAgICAgICDlj43lkJHlvJXnlKhcblx0ICAgICAgICBjb250cm9sLWNoYXJhY3RlciAgICAgXFxjWCAgICAgICDmjqfliLblrZfnrKZcblxuXHQgICAgICAgIC8vIFRva2VuXG5cdCAgICAgICAgc3RhcnQgICAgICAgICAgICAgICBeICAgICAgIOW8gOWktFxuXHQgICAgICAgIGVuZCAgICAgICAgICAgICAgICAgJCAgICAgICDnu5PlsL5cblx0ICAgICAgICBhbnktY2hhcmFjdGVyICAgICAgIC4gICAgICAg5Lu75oSP5a2X56ymXG5cdCAgICAgICAgYmFja3NwYWNlICAgICAgICAgICBbXFxiXSAgICDpgIDmoLznm7TmjqXph49cblx0ICAgICAgICB3b3JkLWJvdW5kYXJ5ICAgICAgIFxcYiAgICAgIOWNleivjei+ueeVjFxuXHQgICAgICAgIG5vbi13b3JkLWJvdW5kYXJ5ICAgXFxCICAgICAg6Z2e5Y2V6K+N6L6555WMXG5cdCAgICAgICAgZGlnaXQgICAgICAgICAgICAgICBcXGQgICAgICBBU0NJSSDmlbDlrZfvvIxbMC05XVxuXHQgICAgICAgIG5vbi1kaWdpdCAgICAgICAgICAgXFxEICAgICAg6Z2eIEFTQ0lJIOaVsOWtl++8jFteMC05XVxuXHQgICAgICAgIGZvcm0tZmVlZCAgICAgICAgICAgXFxmICAgICAg5o2i6aG156ymXG5cdCAgICAgICAgbGluZS1mZWVkICAgICAgICAgICBcXG4gICAgICDmjaLooYznrKZcblx0ICAgICAgICBjYXJyaWFnZS1yZXR1cm4gICAgIFxcciAgICAgIOWbnui9puesplxuXHQgICAgICAgIHdoaXRlLXNwYWNlICAgICAgICAgXFxzICAgICAg56m655m956ymXG5cdCAgICAgICAgbm9uLXdoaXRlLXNwYWNlICAgICBcXFMgICAgICDpnZ7nqbrnmb3nrKZcblx0ICAgICAgICB0YWIgICAgICAgICAgICAgICAgIFxcdCAgICAgIOWItuihqOesplxuXHQgICAgICAgIHZlcnRpY2FsLXRhYiAgICAgICAgXFx2ICAgICAg5Z6C55u05Yi26KGo56ymXG5cdCAgICAgICAgd29yZCAgICAgICAgICAgICAgICBcXHcgICAgICBBU0NJSSDlrZfnrKbvvIxbYS16QS1aMC05XVxuXHQgICAgICAgIG5vbi13b3JkICAgICAgICAgICAgXFxXICAgICAg6Z2eIEFTQ0lJIOWtl+espu+8jFteYS16QS1aMC05XVxuXHQgICAgICAgIG51bGwtY2hhcmFjdGVyICAgICAgXFxvICAgICAgTlVMIOWtl+esplxuXHQgKi9cblxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblx0dmFyIFJhbmRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcblx0ICAgIC8qXG5cdCAgICAgICAgXG5cdCAgICAqL1xuXHR2YXIgSGFuZGxlciA9IHtcblx0ICAgIGV4dGVuZDogVXRpbC5leHRlbmRcblx0fVxuXG5cdC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQVNDSUkjQVNDSUlfcHJpbnRhYmxlX2NvZGVfY2hhcnRcblx0Lyp2YXIgQVNDSUlfQ09OVFJPTF9DT0RFX0NIQVJUID0ge1xuXHQgICAgJ0AnOiBbJ1xcdTAwMDAnXSxcblx0ICAgIEE6IFsnXFx1MDAwMSddLFxuXHQgICAgQjogWydcXHUwMDAyJ10sXG5cdCAgICBDOiBbJ1xcdTAwMDMnXSxcblx0ICAgIEQ6IFsnXFx1MDAwNCddLFxuXHQgICAgRTogWydcXHUwMDA1J10sXG5cdCAgICBGOiBbJ1xcdTAwMDYnXSxcblx0ICAgIEc6IFsnXFx1MDAwNycsICdcXGEnXSxcblx0ICAgIEg6IFsnXFx1MDAwOCcsICdcXGInXSxcblx0ICAgIEk6IFsnXFx1MDAwOScsICdcXHQnXSxcblx0ICAgIEo6IFsnXFx1MDAwQScsICdcXG4nXSxcblx0ICAgIEs6IFsnXFx1MDAwQicsICdcXHYnXSxcblx0ICAgIEw6IFsnXFx1MDAwQycsICdcXGYnXSxcblx0ICAgIE06IFsnXFx1MDAwRCcsICdcXHInXSxcblx0ICAgIE46IFsnXFx1MDAwRSddLFxuXHQgICAgTzogWydcXHUwMDBGJ10sXG5cdCAgICBQOiBbJ1xcdTAwMTAnXSxcblx0ICAgIFE6IFsnXFx1MDAxMSddLFxuXHQgICAgUjogWydcXHUwMDEyJ10sXG5cdCAgICBTOiBbJ1xcdTAwMTMnXSxcblx0ICAgIFQ6IFsnXFx1MDAxNCddLFxuXHQgICAgVTogWydcXHUwMDE1J10sXG5cdCAgICBWOiBbJ1xcdTAwMTYnXSxcblx0ICAgIFc6IFsnXFx1MDAxNyddLFxuXHQgICAgWDogWydcXHUwMDE4J10sXG5cdCAgICBZOiBbJ1xcdTAwMTknXSxcblx0ICAgIFo6IFsnXFx1MDAxQSddLFxuXHQgICAgJ1snOiBbJ1xcdTAwMUInLCAnXFxlJ10sXG5cdCAgICAnXFxcXCc6IFsnXFx1MDAxQyddLFxuXHQgICAgJ10nOiBbJ1xcdTAwMUQnXSxcblx0ICAgICdeJzogWydcXHUwMDFFJ10sXG5cdCAgICAnXyc6IFsnXFx1MDAxRiddXG5cdH0qL1xuXG5cdC8vIEFTQ0lJIHByaW50YWJsZSBjb2RlIGNoYXJ0XG5cdC8vIHZhciBMT1dFUiA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eidcblx0Ly8gdmFyIFVQUEVSID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJ1xuXHQvLyB2YXIgTlVNQkVSID0gJzAxMjM0NTY3ODknXG5cdC8vIHZhciBTWU1CT0wgPSAnICFcIiMkJSZcXCcoKSorLC0uLycgKyAnOjs8PT4/QCcgKyAnW1xcXFxdXl9gJyArICd7fH1+J1xuXHR2YXIgTE9XRVIgPSBhc2NpaSg5NywgMTIyKVxuXHR2YXIgVVBQRVIgPSBhc2NpaSg2NSwgOTApXG5cdHZhciBOVU1CRVIgPSBhc2NpaSg0OCwgNTcpXG5cdHZhciBPVEhFUiA9IGFzY2lpKDMyLCA0NykgKyBhc2NpaSg1OCwgNjQpICsgYXNjaWkoOTEsIDk2KSArIGFzY2lpKDEyMywgMTI2KSAvLyDmjpLpmaQgOTUgXyBhc2NpaSg5MSwgOTQpICsgYXNjaWkoOTYsIDk2KVxuXHR2YXIgUFJJTlRBQkxFID0gYXNjaWkoMzIsIDEyNilcblx0dmFyIFNQQUNFID0gJyBcXGZcXG5cXHJcXHRcXHZcXHUwMEEwXFx1MjAyOFxcdTIwMjknXG5cdHZhciBDSEFSQUNURVJfQ0xBU1NFUyA9IHtcblx0ICAgICdcXFxcdyc6IExPV0VSICsgVVBQRVIgKyBOVU1CRVIgKyAnXycsIC8vIGFzY2lpKDk1LCA5NSlcblx0ICAgICdcXFxcVyc6IE9USEVSLnJlcGxhY2UoJ18nLCAnJyksXG5cdCAgICAnXFxcXHMnOiBTUEFDRSxcblx0ICAgICdcXFxcUyc6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSBQUklOVEFCTEVcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFNQQUNFLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKFNQQUNFW2ldLCAnJylcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSgpLFxuXHQgICAgJ1xcXFxkJzogTlVNQkVSLFxuXHQgICAgJ1xcXFxEJzogTE9XRVIgKyBVUFBFUiArIE9USEVSXG5cdH1cblxuXHRmdW5jdGlvbiBhc2NpaShmcm9tLCB0bykge1xuXHQgICAgdmFyIHJlc3VsdCA9ICcnXG5cdCAgICBmb3IgKHZhciBpID0gZnJvbTsgaSA8PSB0bzsgaSsrKSB7XG5cdCAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSlcblx0ICAgIH1cblx0ICAgIHJldHVybiByZXN1bHRcblx0fVxuXG5cdC8vIHZhciBhc3QgPSBSZWdFeHBQYXJzZXIucGFyc2UocmVnZXhwLnNvdXJjZSlcblx0SGFuZGxlci5nZW4gPSBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICBjYWNoZSA9IGNhY2hlIHx8IHtcblx0ICAgICAgICBndWlkOiAxXG5cdCAgICB9XG5cdCAgICByZXR1cm4gSGFuZGxlcltub2RlLnR5cGVdID8gSGFuZGxlcltub2RlLnR5cGVdKG5vZGUsIHJlc3VsdCwgY2FjaGUpIDpcblx0ICAgICAgICBIYW5kbGVyLnRva2VuKG5vZGUsIHJlc3VsdCwgY2FjaGUpXG5cdH1cblxuXHRIYW5kbGVyLmV4dGVuZCh7XG5cdCAgICAvKiBqc2hpbnQgdW51c2VkOmZhbHNlICovXG5cdCAgICB0b2tlbjogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgJ3N0YXJ0Jzpcblx0ICAgICAgICAgICAgY2FzZSAnZW5kJzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuXHQgICAgICAgICAgICBjYXNlICdhbnktY2hhcmFjdGVyJzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20uY2hhcmFjdGVyKClcblx0ICAgICAgICAgICAgY2FzZSAnYmFja3NwYWNlJzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuXHQgICAgICAgICAgICBjYXNlICd3b3JkLWJvdW5kYXJ5JzogLy8gVE9ET1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuICcnXG5cdCAgICAgICAgICAgIGNhc2UgJ25vbi13b3JkLWJvdW5kYXJ5JzogLy8gVE9ET1xuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAnZGlnaXQnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuXHQgICAgICAgICAgICAgICAgICAgIE5VTUJFUi5zcGxpdCgnJylcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgY2FzZSAnbm9uLWRpZ2l0Jzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcblx0ICAgICAgICAgICAgICAgICAgICAoTE9XRVIgKyBVUFBFUiArIE9USEVSKS5zcGxpdCgnJylcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgY2FzZSAnZm9ybS1mZWVkJzpcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ2xpbmUtZmVlZCc6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5ib2R5IHx8IG5vZGUudGV4dFxuXHQgICAgICAgICAgICBjYXNlICdjYXJyaWFnZS1yZXR1cm4nOlxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAnd2hpdGUtc3BhY2UnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuXHQgICAgICAgICAgICAgICAgICAgIFNQQUNFLnNwbGl0KCcnKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICBjYXNlICdub24td2hpdGUtc3BhY2UnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuXHQgICAgICAgICAgICAgICAgICAgIChMT1dFUiArIFVQUEVSICsgTlVNQkVSKS5zcGxpdCgnJylcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgY2FzZSAndGFiJzpcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsLXRhYic6XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICd3b3JkJzogLy8gXFx3IFthLXpBLVowLTldXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG5cdCAgICAgICAgICAgICAgICAgICAgKExPV0VSICsgVVBQRVIgKyBOVU1CRVIpLnNwbGl0KCcnKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICBjYXNlICdub24td29yZCc6IC8vIFxcVyBbXmEtekEtWjAtOV1cblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcblx0ICAgICAgICAgICAgICAgICAgICBPVEhFUi5yZXBsYWNlKCdfJywgJycpLnNwbGl0KCcnKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICBjYXNlICdudWxsLWNoYXJhY3Rlcic6XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gbm9kZS5ib2R5IHx8IG5vZGUudGV4dFxuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICB0eXBlOiAnYWx0ZXJuYXRlJyxcblx0ICAgICAgICAgICAgb2Zmc2V0OiAwLFxuXHQgICAgICAgICAgICB0ZXh0OiAnJyxcblx0ICAgICAgICAgICAgbGVmdDoge1xuXHQgICAgICAgICAgICAgICAgYm95ZDogW11cblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgcmlnaHQ6IHtcblx0ICAgICAgICAgICAgICAgIGJveWQ6IFtdXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAqL1xuXHQgICAgYWx0ZXJuYXRlOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgLy8gbm9kZS5sZWZ0L3JpZ2h0IHt9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZ2VuKFxuXHQgICAgICAgICAgICBSYW5kb20uYm9vbGVhbigpID8gbm9kZS5sZWZ0IDogbm9kZS5yaWdodCxcblx0ICAgICAgICAgICAgcmVzdWx0LFxuXHQgICAgICAgICAgICBjYWNoZVxuXHQgICAgICAgIClcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgdHlwZTogJ21hdGNoJyxcblx0ICAgICAgICAgICAgb2Zmc2V0OiAwLFxuXHQgICAgICAgICAgICB0ZXh0OiAnJyxcblx0ICAgICAgICAgICAgYm9keTogW11cblx0ICAgICAgICB9XG5cdCAgICAqL1xuXHQgICAgbWF0Y2g6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXN1bHQgPSAnJ1xuXHQgICAgICAgICAgICAvLyBub2RlLmJvZHkgW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5nZW4obm9kZS5ib2R5W2ldLCByZXN1bHQsIGNhY2hlKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgLy8gKClcblx0ICAgICdjYXB0dXJlLWdyb3VwJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIC8vIG5vZGUuYm9keSB7fVxuXHQgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2VuKG5vZGUuYm9keSwgcmVzdWx0LCBjYWNoZSlcblx0ICAgICAgICBjYWNoZVtjYWNoZS5ndWlkKytdID0gcmVzdWx0XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIC8vICg/Oi4uLilcblx0ICAgICdub24tY2FwdHVyZS1ncm91cCc6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICAvLyBub2RlLmJvZHkge31cblx0ICAgICAgICByZXR1cm4gdGhpcy5nZW4obm9kZS5ib2R5LCByZXN1bHQsIGNhY2hlKVxuXHQgICAgfSxcblx0ICAgIC8vICg/PXApXG5cdCAgICAncG9zaXRpdmUtbG9va2FoZWFkJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIC8vIG5vZGUuYm9keVxuXHQgICAgICAgIHJldHVybiB0aGlzLmdlbihub2RlLmJvZHksIHJlc3VsdCwgY2FjaGUpXG5cdCAgICB9LFxuXHQgICAgLy8gKD8hcClcblx0ICAgICduZWdhdGl2ZS1sb29rYWhlYWQnOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgLy8gbm9kZS5ib2R5XG5cdCAgICAgICAgcmV0dXJuICcnXG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIHR5cGU6ICdxdWFudGlmaWVkJyxcblx0ICAgICAgICAgICAgb2Zmc2V0OiAzLFxuXHQgICAgICAgICAgICB0ZXh0OiAnYyonLFxuXHQgICAgICAgICAgICBib2R5OiB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiAnbGl0ZXJhbCcsXG5cdCAgICAgICAgICAgICAgICBvZmZzZXQ6IDMsXG5cdCAgICAgICAgICAgICAgICB0ZXh0OiAnYycsXG5cdCAgICAgICAgICAgICAgICBib2R5OiAnYycsXG5cdCAgICAgICAgICAgICAgICBlc2NhcGVkOiBmYWxzZVxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICBxdWFudGlmaWVyOiB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiAncXVhbnRpZmllcicsXG5cdCAgICAgICAgICAgICAgICBvZmZzZXQ6IDQsXG5cdCAgICAgICAgICAgICAgICB0ZXh0OiAnKicsXG5cdCAgICAgICAgICAgICAgICBtaW46IDAsXG5cdCAgICAgICAgICAgICAgICBtYXg6IEluZmluaXR5LFxuXHQgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAqL1xuXHQgICAgcXVhbnRpZmllZDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJlc3VsdCA9ICcnXG5cdCAgICAgICAgICAgIC8vIG5vZGUucXVhbnRpZmllciB7fVxuXHQgICAgICAgIHZhciBjb3VudCA9IHRoaXMucXVhbnRpZmllcihub2RlLnF1YW50aWZpZXIpO1xuXHQgICAgICAgIC8vIG5vZGUuYm9keSB7fVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5nZW4obm9kZS5ib2R5LCByZXN1bHQsIGNhY2hlKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICBxdWFudGlmaWVyOiB7XG5cdCAgICAgICAgICAgIHR5cGU6ICdxdWFudGlmaWVyJyxcblx0ICAgICAgICAgICAgb2Zmc2V0OiA0LFxuXHQgICAgICAgICAgICB0ZXh0OiAnKicsXG5cdCAgICAgICAgICAgIG1pbjogMCxcblx0ICAgICAgICAgICAgbWF4OiBJbmZpbml0eSxcblx0ICAgICAgICAgICAgZ3JlZWR5OiB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgKi9cblx0ICAgIHF1YW50aWZpZXI6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICB2YXIgbWluID0gTWF0aC5tYXgobm9kZS5taW4sIDApXG5cdCAgICAgICAgdmFyIG1heCA9IGlzRmluaXRlKG5vZGUubWF4KSA/IG5vZGUubWF4IDpcblx0ICAgICAgICAgICAgbWluICsgUmFuZG9tLmludGVnZXIoMywgNylcblx0ICAgICAgICByZXR1cm4gUmFuZG9tLmludGVnZXIobWluLCBtYXgpXG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICBcblx0ICAgICovXG5cdCAgICBjaGFyc2V0OiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgLy8gbm9kZS5pbnZlcnRcblx0ICAgICAgICBpZiAobm9kZS5pbnZlcnQpIHJldHVybiB0aGlzWydpbnZlcnQtY2hhcnNldCddKG5vZGUsIHJlc3VsdCwgY2FjaGUpXG5cblx0ICAgICAgICAvLyBub2RlLmJvZHkgW11cblx0ICAgICAgICB2YXIgbGl0ZXJhbCA9IFJhbmRvbS5waWNrKG5vZGUuYm9keSlcblx0ICAgICAgICByZXR1cm4gdGhpcy5nZW4obGl0ZXJhbCwgcmVzdWx0LCBjYWNoZSlcblx0ICAgIH0sXG5cdCAgICAnaW52ZXJ0LWNoYXJzZXQnOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgdmFyIHBvb2wgPSBQUklOVEFCTEVcblx0ICAgICAgICBmb3IgKHZhciBpID0gMCwgaXRlbTsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBpdGVtID0gbm9kZS5ib2R5W2ldXG5cdCAgICAgICAgICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG5cdCAgICAgICAgICAgICAgICBjYXNlICdsaXRlcmFsJzpcblx0ICAgICAgICAgICAgICAgICAgICBwb29sID0gcG9vbC5yZXBsYWNlKGl0ZW0uYm9keSwgJycpXG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbWluID0gdGhpcy5nZW4oaXRlbS5zdGFydCwgcmVzdWx0LCBjYWNoZSkuY2hhckNvZGVBdCgpXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG1heCA9IHRoaXMuZ2VuKGl0ZW0uZW5kLCByZXN1bHQsIGNhY2hlKS5jaGFyQ29kZUF0KClcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpaSA9IG1pbjsgaWkgPD0gbWF4OyBpaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBvb2wgPSBwb29sLnJlcGxhY2UoU3RyaW5nLmZyb21DaGFyQ29kZShpaSksICcnKVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG5cdCAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJzID0gQ0hBUkFDVEVSX0NMQVNTRVNbaXRlbS50ZXh0XVxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlpaSA9IDA7IGlpaSA8PSBjaGFyYWN0ZXJzLmxlbmd0aDsgaWlpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvb2wgPSBwb29sLnJlcGxhY2UoY2hhcmFjdGVyc1tpaWldLCAnJylcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2socG9vbC5zcGxpdCgnJykpXG5cdCAgICB9LFxuXHQgICAgcmFuZ2U6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICAvLyBub2RlLnN0YXJ0LCBub2RlLmVuZFxuXHQgICAgICAgIHZhciBtaW4gPSB0aGlzLmdlbihub2RlLnN0YXJ0LCByZXN1bHQsIGNhY2hlKS5jaGFyQ29kZUF0KClcblx0ICAgICAgICB2YXIgbWF4ID0gdGhpcy5nZW4obm9kZS5lbmQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuXHQgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHQgICAgICAgICAgICBSYW5kb20uaW50ZWdlcihtaW4sIG1heClcblx0ICAgICAgICApXG5cdCAgICB9LFxuXHQgICAgbGl0ZXJhbDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJldHVybiBub2RlLmVzY2FwZWQgPyBub2RlLmJvZHkgOiBub2RlLnRleHRcblx0ICAgIH0sXG5cdCAgICAvLyBVbmljb2RlIFxcdVxuXHQgICAgdW5pY29kZTogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHQgICAgICAgICAgICBwYXJzZUludChub2RlLmNvZGUsIDE2KVxuXHQgICAgICAgIClcblx0ICAgIH0sXG5cdCAgICAvLyDljYHlha3ov5vliLYgXFx4RkZcblx0ICAgIGhleDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHQgICAgICAgICAgICBwYXJzZUludChub2RlLmNvZGUsIDE2KVxuXHQgICAgICAgIClcblx0ICAgIH0sXG5cdCAgICAvLyDlhavov5vliLYgXFwwXG5cdCAgICBvY3RhbDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHQgICAgICAgICAgICBwYXJzZUludChub2RlLmNvZGUsIDgpXG5cdCAgICAgICAgKVxuXHQgICAgfSxcblx0ICAgIC8vIOWPjeWQkeW8leeUqFxuXHQgICAgJ2JhY2stcmVmZXJlbmNlJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJldHVybiBjYWNoZVtub2RlLmNvZGVdIHx8ICcnXG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0MwX2FuZF9DMV9jb250cm9sX2NvZGVzXG5cdCAgICAqL1xuXHQgICAgQ09OVFJPTF9DSEFSQUNURVJfTUFQOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgQ09OVFJPTF9DSEFSQUNURVIgPSAnQCBBIEIgQyBEIEUgRiBHIEggSSBKIEsgTCBNIE4gTyBQIFEgUiBTIFQgVSBWIFcgWCBZIFogWyBcXFxcIF0gXiBfJy5zcGxpdCgnICcpXG5cdCAgICAgICAgdmFyIENPTlRST0xfQ0hBUkFDVEVSX1VOSUNPREUgPSAnXFx1MDAwMCBcXHUwMDAxIFxcdTAwMDIgXFx1MDAwMyBcXHUwMDA0IFxcdTAwMDUgXFx1MDAwNiBcXHUwMDA3IFxcdTAwMDggXFx1MDAwOSBcXHUwMDBBIFxcdTAwMEIgXFx1MDAwQyBcXHUwMDBEIFxcdTAwMEUgXFx1MDAwRiBcXHUwMDEwIFxcdTAwMTEgXFx1MDAxMiBcXHUwMDEzIFxcdTAwMTQgXFx1MDAxNSBcXHUwMDE2IFxcdTAwMTcgXFx1MDAxOCBcXHUwMDE5IFxcdTAwMUEgXFx1MDAxQiBcXHUwMDFDIFxcdTAwMUQgXFx1MDAxRSBcXHUwMDFGJy5zcGxpdCgnICcpXG5cdCAgICAgICAgdmFyIG1hcCA9IHt9XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBDT05UUk9MX0NIQVJBQ1RFUi5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBtYXBbQ09OVFJPTF9DSEFSQUNURVJbaV1dID0gQ09OVFJPTF9DSEFSQUNURVJfVU5JQ09ERVtpXVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gbWFwXG5cdCAgICB9KCksXG5cdCAgICAnY29udHJvbC1jaGFyYWN0ZXInOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuQ09OVFJPTF9DSEFSQUNURVJfTUFQW25vZGUuY29kZV1cblx0ICAgIH1cblx0fSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEhhbmRsZXJcblxuLyoqKi8gfSxcbi8qIDIzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpXG5cbi8qKiovIH0sXG4vKiAyNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIHRvSlNPTlNjaGVtYVxuXG5cdCAgICDmioogTW9jay5qcyDpo47moLznmoTmlbDmja7mqKHmnb/ovazmjaLmiJAgSlNPTiBTY2hlbWHjgIJcblxuXHQgICAgPiBbSlNPTiBTY2hlbWFdKGh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvKVxuXHQgKi9cblx0dmFyIENvbnN0YW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKVxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblx0dmFyIFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNClcblxuXHRmdW5jdGlvbiB0b0pTT05TY2hlbWEodGVtcGxhdGUsIG5hbWUsIHBhdGggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdCAgICAvLyB0eXBlIHJ1bGUgcHJvcGVydGllcyBpdGVtc1xuXHQgICAgcGF0aCA9IHBhdGggfHwgW11cblx0ICAgIHZhciByZXN1bHQgPSB7XG5cdCAgICAgICAgbmFtZTogdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnID8gbmFtZS5yZXBsYWNlKENvbnN0YW50LlJFX0tFWSwgJyQxJykgOiBuYW1lLFxuXHQgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0ICAgICAgICB0eXBlOiBVdGlsLnR5cGUodGVtcGxhdGUpLCAvLyDlj6/og73kuI3lh4bnoa7vvIzkvovlpoIgeyAnbmFtZXwxJzogW3t9LCB7fSAuLi5dIH1cblx0ICAgICAgICBydWxlOiBQYXJzZXIucGFyc2UobmFtZSlcblx0ICAgIH1cblx0ICAgIHJlc3VsdC5wYXRoID0gcGF0aC5zbGljZSgwKVxuXHQgICAgcmVzdWx0LnBhdGgucHVzaChuYW1lID09PSB1bmRlZmluZWQgPyAnUk9PVCcgOiByZXN1bHQubmFtZSlcblxuXHQgICAgc3dpdGNoIChyZXN1bHQudHlwZSkge1xuXHQgICAgICAgIGNhc2UgJ2FycmF5Jzpcblx0ICAgICAgICAgICAgcmVzdWx0Lml0ZW1zID0gW11cblx0ICAgICAgICAgICAgVXRpbC5lYWNoKHRlbXBsYXRlLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcblx0ICAgICAgICAgICAgICAgIHJlc3VsdC5pdGVtcy5wdXNoKFxuXHQgICAgICAgICAgICAgICAgICAgIHRvSlNPTlNjaGVtYSh2YWx1ZSwgaW5kZXgsIHJlc3VsdC5wYXRoKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIGNhc2UgJ29iamVjdCc6XG5cdCAgICAgICAgICAgIHJlc3VsdC5wcm9wZXJ0aWVzID0gW11cblx0ICAgICAgICAgICAgVXRpbC5lYWNoKHRlbXBsYXRlLCBmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0LnByb3BlcnRpZXMucHVzaChcblx0ICAgICAgICAgICAgICAgICAgICB0b0pTT05TY2hlbWEodmFsdWUsIG5hbWUsIHJlc3VsdC5wYXRoKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gcmVzdWx0XG5cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gdG9KU09OU2NoZW1hXG5cblxuLyoqKi8gfSxcbi8qIDI1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpXG5cbi8qKiovIH0sXG4vKiAyNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIHZhbGlkKHRlbXBsYXRlLCBkYXRhKVxuXG5cdCAgICDmoKHpqoznnJ/lrp7mlbDmja4gZGF0YSDmmK/lkKbkuI7mlbDmja7mqKHmnb8gdGVtcGxhdGUg5Yy56YWN44CCXG5cdCAgICBcblx0ICAgIOWunueOsOaAnei3r++8mlxuXHQgICAgMS4g6Kej5p6Q6KeE5YiZ44CCXG5cdCAgICAgICAg5YWI5oqK5pWw5o2u5qih5p2/IHRlbXBsYXRlIOino+aekOS4uuabtOaWueS+v+acuuWZqOino+aekOeahCBKU09OLVNjaGFtZVxuXHQgICAgICAgIG5hbWUgICAgICAgICAgICAgICDlsZ7mgKflkI0gXG5cdCAgICAgICAgdHlwZSAgICAgICAgICAgICAgIOWxnuaAp+WAvOexu+Wei1xuXHQgICAgICAgIHRlbXBsYXRlICAgICAgICAgICDlsZ7mgKflgLzmqKHmnb9cblx0ICAgICAgICBwcm9wZXJ0aWVzICAgICAgICAg5a+56LGh5bGe5oCn5pWw57uEXG5cdCAgICAgICAgaXRlbXMgICAgICAgICAgICAgIOaVsOe7hOWFg+e0oOaVsOe7hFxuXHQgICAgICAgIHJ1bGUgICAgICAgICAgICAgICDlsZ7mgKflgLznlJ/miJDop4TliJlcblx0ICAgIDIuIOmAkuW9kumqjOivgeinhOWImeOAglxuXHQgICAgICAgIOeEtuWQjueUqCBKU09OLVNjaGVtYSDmoKHpqoznnJ/lrp7mlbDmja7vvIzmoKHpqozpobnljIXmi6zlsZ7mgKflkI3jgIHlgLznsbvlnovjgIHlgLzjgIHlgLznlJ/miJDop4TliJnjgIJcblxuXHQgICAg5o+Q56S65L+h5oGvIFxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2ZnZS9qc29uLXNjaGVtYS12YWxpZGF0b3IvYmxvYi9tYXN0ZXIvc3JjL21haW4vcmVzb3VyY2VzL2NvbS9naXRodWIvZmdlL2pzb25zY2hlbWEvdmFsaWRhdG9yL3ZhbGlkYXRpb24ucHJvcGVydGllc1xuXHQgICAgW0pTT04tU2NoYW1hIHZhbGlkYXRvcl0oaHR0cDovL2pzb24tc2NoZW1hLXZhbGlkYXRvci5oZXJva3VhcHAuY29tLylcblx0ICAgIFtSZWdleHAgRGVtb10oaHR0cDovL2RlbW9zLmZvcmJlc2xpbmRlc2F5LmNvLnVrL3JlZ2V4cC8pXG5cdCovXG5cdHZhciBDb25zdGFudCA9IF9fd2VicGFja19yZXF1aXJlX18oMilcblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cdHZhciB0b0pTT05TY2hlbWEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuXG5cdGZ1bmN0aW9uIHZhbGlkKHRlbXBsYXRlLCBkYXRhKSB7XG5cdCAgICB2YXIgc2NoZW1hID0gdG9KU09OU2NoZW1hKHRlbXBsYXRlKVxuXHQgICAgdmFyIHJlc3VsdCA9IERpZmYuZGlmZihzY2hlbWEsIGRhdGEpXG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbXBsYXRlLCBkYXRhKVxuXHQgICAgICAgIC8vIGNvbnNvbGUud2FybihBc3NlcnQubWVzc2FnZShyZXN1bHRbaV0pKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0Lypcblx0ICAgICMjIG5hbWVcblx0ICAgICAgICDmnInnlJ/miJDop4TliJnvvJrmr5TovoPop6PmnpDlkI7nmoQgbmFtZVxuXHQgICAgICAgIOaXoOeUn+aIkOinhOWIme+8muebtOaOpeavlOi+g1xuXHQgICAgIyMgdHlwZVxuXHQgICAgICAgIOaXoOexu+Wei+i9rOaNou+8muebtOaOpeavlOi+g1xuXHQgICAgICAgIOacieexu+Wei+i9rOaNou+8muWFiOivleedgOino+aekCB0ZW1wbGF0Ze+8jOeEtuWQjuWGjeajgOafpe+8n1xuXHQgICAgIyMgdmFsdWUgdnMuIHRlbXBsYXRlXG5cdCAgICAgICAg5Z+65pys57G75Z6LXG5cdCAgICAgICAgICAgIOaXoOeUn+aIkOinhOWIme+8muebtOaOpeavlOi+g1xuXHQgICAgICAgICAgICDmnInnlJ/miJDop4TliJnvvJpcblx0ICAgICAgICAgICAgICAgIG51bWJlclxuXHQgICAgICAgICAgICAgICAgICAgIG1pbi1tYXguZG1pbi1kbWF4XG5cdCAgICAgICAgICAgICAgICAgICAgbWluLW1heC5kY291bnRcblx0ICAgICAgICAgICAgICAgICAgICBjb3VudC5kbWluLWRtYXhcblx0ICAgICAgICAgICAgICAgICAgICBjb3VudC5kY291bnRcblx0ICAgICAgICAgICAgICAgICAgICArc3RlcFxuXHQgICAgICAgICAgICAgICAgICAgIOaVtOaVsOmDqOWIhlxuXHQgICAgICAgICAgICAgICAgICAgIOWwj+aVsOmDqOWIhlxuXHQgICAgICAgICAgICAgICAgYm9vbGVhbiBcblx0ICAgICAgICAgICAgICAgIHN0cmluZyAgXG5cdCAgICAgICAgICAgICAgICAgICAgbWluLW1heFxuXHQgICAgICAgICAgICAgICAgICAgIGNvdW50XG5cdCAgICAjIyBwcm9wZXJ0aWVzXG5cdCAgICAgICAg5a+56LGhXG5cdCAgICAgICAgICAgIOacieeUn+aIkOinhOWIme+8muajgOa1i+acn+acm+eahOWxnuaAp+S4quaVsO+8jOe7p+e7remAkuW9klxuXHQgICAgICAgICAgICDml6DnlJ/miJDop4TliJnvvJrmo4DmtYvlhajpg6jnmoTlsZ7mgKfkuKrmlbDvvIznu6fnu63pgJLlvZJcblx0ICAgICMjIGl0ZW1zXG5cdCAgICAgICAg5pWw57uEXG5cdCAgICAgICAgICAgIOacieeUn+aIkOinhOWIme+8mlxuXHQgICAgICAgICAgICAgICAgYCduYW1lfDEnOiBbe30sIHt9IC4uLl1gICAgICAgICAgICAg5YW25Lit5LmL5LiA77yM57un57ut6YCS5b2SXG5cdCAgICAgICAgICAgICAgICBgJ25hbWV8KzEnOiBbe30sIHt9IC4uLl1gICAgICAgICAgICDpobrluo/mo4DmtYvvvIznu6fnu63pgJLlvZJcblx0ICAgICAgICAgICAgICAgIGAnbmFtZXxtaW4tbWF4JzogW3t9LCB7fSAuLi5dYCAgICAgIOajgOa1i+S4quaVsO+8jOe7p+e7remAkuW9klxuXHQgICAgICAgICAgICAgICAgYCduYW1lfGNvdW50JzogW3t9LCB7fSAuLi5dYCAgICAgICAg5qOA5rWL5Liq5pWw77yM57un57ut6YCS5b2SXG5cdCAgICAgICAgICAgIOaXoOeUn+aIkOinhOWIme+8muajgOa1i+WFqOmDqOeahOWFg+e0oOS4quaVsO+8jOe7p+e7remAkuW9klxuXHQqL1xuXHR2YXIgRGlmZiA9IHtcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIGRpZmYoc2NoZW1hLCBkYXRhLCBuYW1lIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXVxuXG5cdCAgICAgICAgLy8g5YWI5qOA5rWL5ZCN56ewIG5hbWUg5ZKM57G75Z6LIHR5cGXvvIzlpoLmnpzljLnphY3vvIzmiY3mnInlv4XopoHnu6fnu63mo4DmtYtcblx0ICAgICAgICBpZiAoXG5cdCAgICAgICAgICAgIHRoaXMubmFtZShzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkgJiZcblx0ICAgICAgICAgICAgdGhpcy50eXBlKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KVxuXHQgICAgICAgICkge1xuXHQgICAgICAgICAgICB0aGlzLnZhbHVlKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KVxuXHQgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpXG5cdCAgICAgICAgICAgIHRoaXMuaXRlbXMoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIC8qIGpzaGludCB1bnVzZWQ6ZmFsc2UgKi9cblx0ICAgIG5hbWU6IGZ1bmN0aW9uKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KSB7XG5cdCAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGhcblxuXHQgICAgICAgIEFzc2VydC5lcXVhbCgnbmFtZScsIHNjaGVtYS5wYXRoLCBuYW1lICsgJycsIHNjaGVtYS5uYW1lICsgJycsIHJlc3VsdClcblxuXHQgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgIH0sXG5cdCAgICB0eXBlOiBmdW5jdGlvbihzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkge1xuXHQgICAgICAgIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoXG5cblx0ICAgICAgICBzd2l0Y2ggKHNjaGVtYS50eXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG5cdCAgICAgICAgICAgICAgICAvLyDot7Pov4flkKvmnInjgI7ljaDkvY3nrKbjgI/nmoTlsZ7mgKflgLzvvIzlm6DkuLrjgI7ljaDkvY3nrKbjgI/ov5Tlm57lgLznmoTnsbvlnovlj6/og73lkozmqKHmnb/kuI3kuIDoh7TvvIzkvovlpoIgJ0BpbnQnIOS8mui/lOWbnuS4gOS4quaVtOW9ouWAvFxuXHQgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS50ZW1wbGF0ZS5tYXRjaChDb25zdGFudC5SRV9QTEFDRUhPTERFUikpIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICdhcnJheSc6XG5cdCAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnJ1bGUucGFyYW1ldGVycykge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIG5hbWV8Y291bnQ6IGFycmF5XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS5ydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHNjaGVtYS5ydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi3s+i/hyBuYW1lfDE6IGFycmF577yM5Zug5Li65pyA57uI5YC855qE57G75Z6L77yI5b6I5Y+v6IO977yJ5LiN5piv5pWw57uE77yM5Lmf5LiN5LiA5a6a5LiOIGBhcnJheWAg5Lit55qE57G75Z6L5LiA6Ie0XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWEucnVsZS5jb3VudCA9PT0gMSkgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L+HIG5hbWV8K2luYzogYXJyYXlcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnJ1bGUucGFyYW1ldGVyc1syXSkgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcblx0ICAgICAgICAgICAgICAgIC8vIOi3s+i/hyBgJ25hbWUnOiBmdW5jdGlvbmDvvIzlm6DkuLrlh73mlbDlj6/ku6Xov5Tlm57ku7vkvZXnsbvlnovnmoTlgLzjgIJcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgQXNzZXJ0LmVxdWFsKCd0eXBlJywgc2NoZW1hLnBhdGgsIFV0aWwudHlwZShkYXRhKSwgc2NoZW1hLnR5cGUsIHJlc3VsdClcblxuXHQgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgIH0sXG5cdCAgICB2YWx1ZTogZnVuY3Rpb24oc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpIHtcblx0ICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aFxuXG5cdCAgICAgICAgdmFyIHJ1bGUgPSBzY2hlbWEucnVsZVxuXHQgICAgICAgIHZhciB0ZW1wbGF0ZVR5cGUgPSBzY2hlbWEudHlwZVxuXHQgICAgICAgIGlmICh0ZW1wbGF0ZVR5cGUgPT09ICdvYmplY3QnIHx8IHRlbXBsYXRlVHlwZSA9PT0gJ2FycmF5JyB8fCB0ZW1wbGF0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHJldHVybiB0cnVlXG5cblx0ICAgICAgICAvLyDml6DnlJ/miJDop4TliJlcblx0ICAgICAgICBpZiAoIXJ1bGUucGFyYW1ldGVycykge1xuXHQgICAgICAgICAgICBzd2l0Y2ggKHRlbXBsYXRlVHlwZSkge1xuXHQgICAgICAgICAgICAgICAgY2FzZSAncmVnZXhwJzpcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQubWF0Y2goJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIGRhdGEsIHNjaGVtYS50ZW1wbGF0ZSwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG5cdCAgICAgICAgICAgICAgICAgICAgLy8g5ZCM5qC36Lez6L+H5ZCr5pyJ44CO5Y2g5L2N56ym44CP55qE5bGe5oCn5YC877yM5Zug5Li644CO5Y2g5L2N56ym44CP55qE6L+U5Zue5YC85Lya6YCa5bi45Lya5LiO5qih5p2/5LiN5LiA6Ie0XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS50ZW1wbGF0ZS5tYXRjaChDb25zdGFudC5SRV9QTEFDRUhPTERFUikpIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIEFzc2VydC5lcXVhbCgndmFsdWUnLCBzY2hlbWEucGF0aCwgZGF0YSwgc2NoZW1hLnRlbXBsYXRlLCByZXN1bHQpXG5cdCAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDmnInnlJ/miJDop4TliJlcblx0ICAgICAgICB2YXIgYWN0dWFsUmVwZWF0Q291bnRcblx0ICAgICAgICBzd2l0Y2ggKHRlbXBsYXRlVHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuXHQgICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gKGRhdGEgKyAnJykuc3BsaXQoJy4nKVxuXHQgICAgICAgICAgICAgICAgcGFydHNbMF0gPSArcGFydHNbMF1cblxuXHQgICAgICAgICAgICAgICAgLy8g5pW05pWw6YOo5YiGXG5cdCAgICAgICAgICAgICAgICAvLyB8bWluLW1heFxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMF0sIE1hdGgubWluKHJ1bGUubWluLCBydWxlLm1heCksIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gLCAnbnVtZXJpYyBpbnN0YW5jZSBpcyBsb3dlciB0aGFuIHRoZSByZXF1aXJlZCBtaW5pbXVtIChtaW5pbXVtOiB7ZXhwZWN0ZWR9LCBmb3VuZDoge2FjdHVhbH0pJylcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzBdLCBNYXRoLm1heChydWxlLm1pbiwgcnVsZS5tYXgpLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvLyB8Y291bnRcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzBdLCBydWxlLm1pbiwgcmVzdWx0LCAnW3ZhbHVlXSAnICsgbmFtZSlcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8g5bCP5pWw6YOo5YiGXG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5kZWNpbWFsKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gfGRtaW4tZG1heFxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmRtaW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLmRtYXggIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzFdLmxlbmd0aCwgcnVsZS5kbWluLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMV0ubGVuZ3RoLCBydWxlLmRtYXgsIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gfGRjb3VudFxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmRtaW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLmRtYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzFdLmxlbmd0aCwgcnVsZS5kbWluLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXG5cdCAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblxuXHQgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuXHQgICAgICAgICAgICAgICAgLy8gJ2FhYScubWF0Y2goL2EvZylcblx0ICAgICAgICAgICAgICAgIGFjdHVhbFJlcGVhdENvdW50ID0gZGF0YS5tYXRjaChuZXcgUmVnRXhwKHNjaGVtYS50ZW1wbGF0ZSwgJ2cnKSlcblx0ICAgICAgICAgICAgICAgIGFjdHVhbFJlcGVhdENvdW50ID0gYWN0dWFsUmVwZWF0Q291bnQgPyBhY3R1YWxSZXBlYXRDb3VudC5sZW5ndGggOiAwXG5cblx0ICAgICAgICAgICAgICAgIC8vIHxtaW4tbWF4XG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWluLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWF4LCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvLyB8Y291bnRcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5taW4sIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblxuXHQgICAgICAgICAgICBjYXNlICdyZWdleHAnOlxuXHQgICAgICAgICAgICAgICAgYWN0dWFsUmVwZWF0Q291bnQgPSBkYXRhLm1hdGNoKG5ldyBSZWdFeHAoc2NoZW1hLnRlbXBsYXRlLnNvdXJjZS5yZXBsYWNlKC9eXFxefFxcJCQvZywgJycpLCAnZycpKVxuXHQgICAgICAgICAgICAgICAgYWN0dWFsUmVwZWF0Q291bnQgPSBhY3R1YWxSZXBlYXRDb3VudCA/IGFjdHVhbFJlcGVhdENvdW50Lmxlbmd0aCA6IDBcblxuXHQgICAgICAgICAgICAgICAgLy8gfG1pbi1tYXhcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5taW4sIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5tYXgsIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIC8vIHxjb3VudFxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5lcXVhbCgncmVwZWF0IGNvdW50Jywgc2NoZW1hLnBhdGgsIGFjdHVhbFJlcGVhdENvdW50LCBydWxlLm1pbiwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICB9LFxuXHQgICAgcHJvcGVydGllczogZnVuY3Rpb24oc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpIHtcblx0ICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aFxuXG5cdCAgICAgICAgdmFyIHJ1bGUgPSBzY2hlbWEucnVsZVxuXHQgICAgICAgIHZhciBrZXlzID0gVXRpbC5rZXlzKGRhdGEpXG5cdCAgICAgICAgaWYgKCFzY2hlbWEucHJvcGVydGllcykgcmV0dXJuXG5cblx0ICAgICAgICAvLyDml6DnlJ/miJDop4TliJlcblx0ICAgICAgICBpZiAoIXNjaGVtYS5ydWxlLnBhcmFtZXRlcnMpIHtcblx0ICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCdwcm9wZXJ0aWVzIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBrZXlzLmxlbmd0aCwgc2NoZW1hLnByb3BlcnRpZXMubGVuZ3RoLCByZXN1bHQpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8g5pyJ55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgICAgIC8vIHxtaW4tbWF4XG5cdCAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygncHJvcGVydGllcyBsZW5ndGgnLCBzY2hlbWEucGF0aCwga2V5cy5sZW5ndGgsIE1hdGgubWluKHJ1bGUubWluLCBydWxlLm1heCksIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygncHJvcGVydGllcyBsZW5ndGgnLCBzY2hlbWEucGF0aCwga2V5cy5sZW5ndGgsIE1hdGgubWF4KHJ1bGUubWluLCBydWxlLm1heCksIHJlc3VsdClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAvLyB8Y291bnRcblx0ICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgLy8gfDEsIHw+MVxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUuY291bnQgIT09IDEpIEFzc2VydC5lcXVhbCgncHJvcGVydGllcyBsZW5ndGgnLCBzY2hlbWEucGF0aCwga2V5cy5sZW5ndGgsIHJ1bGUubWluLCByZXN1bHQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gbGVuZ3RoKSByZXR1cm4gZmFsc2VcblxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaC5hcHBseShcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgIHRoaXMuZGlmZihcblx0ICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZWFjaChzY2hlbWEucHJvcGVydGllcywgZnVuY3Rpb24oaXRlbSAvKiwgaW5kZXgqLyApIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09IGtleXNbaV0pIHByb3BlcnR5ID0gaXRlbVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHkgfHwgc2NoZW1hLnByb3BlcnRpZXNbaV1cblx0ICAgICAgICAgICAgICAgICAgICB9KCksXG5cdCAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXlzW2ldXSxcblx0ICAgICAgICAgICAgICAgICAgICBrZXlzW2ldXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICB9LFxuXHQgICAgaXRlbXM6IGZ1bmN0aW9uKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KSB7XG5cdCAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGhcblxuXHQgICAgICAgIGlmICghc2NoZW1hLml0ZW1zKSByZXR1cm5cblxuXHQgICAgICAgIHZhciBydWxlID0gc2NoZW1hLnJ1bGVcblxuXHQgICAgICAgIC8vIOaXoOeUn+aIkOinhOWImVxuXHQgICAgICAgIGlmICghc2NoZW1hLnJ1bGUucGFyYW1ldGVycykge1xuXHQgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ2l0ZW1zIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBkYXRhLmxlbmd0aCwgc2NoZW1hLml0ZW1zLmxlbmd0aCwgcmVzdWx0KVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8vIOacieeUn+aIkOinhOWImVxuXHQgICAgICAgICAgICAvLyB8bWluLW1heFxuXHQgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ2l0ZW1zJywgc2NoZW1hLnBhdGgsIGRhdGEubGVuZ3RoLCAoTWF0aC5taW4ocnVsZS5taW4sIHJ1bGUubWF4KSAqIHNjaGVtYS5pdGVtcy5sZW5ndGgpLCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgJ1t7dXR5cGV9XSBhcnJheSBpcyB0b28gc2hvcnQ6IHtwYXRofSBtdXN0IGhhdmUgYXQgbGVhc3Qge2V4cGVjdGVkfSBlbGVtZW50cyBidXQgaW5zdGFuY2UgaGFzIHthY3R1YWx9IGVsZW1lbnRzJylcblx0ICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygnaXRlbXMnLCBzY2hlbWEucGF0aCwgZGF0YS5sZW5ndGgsIChNYXRoLm1heChydWxlLm1pbiwgcnVsZS5tYXgpICogc2NoZW1hLml0ZW1zLmxlbmd0aCksIHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAnW3t1dHlwZX1dIGFycmF5IGlzIHRvbyBsb25nOiB7cGF0aH0gbXVzdCBoYXZlIGF0IG1vc3Qge2V4cGVjdGVkfSBlbGVtZW50cyBidXQgaW5zdGFuY2UgaGFzIHthY3R1YWx9IGVsZW1lbnRzJylcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAvLyB8Y291bnRcblx0ICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgLy8gfDEsIHw+MVxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUuY291bnQgPT09IDEpIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgICAgICAgICAgICAgIGVsc2UgQXNzZXJ0LmVxdWFsKCdpdGVtcyBsZW5ndGgnLCBzY2hlbWEucGF0aCwgZGF0YS5sZW5ndGgsIChydWxlLm1pbiAqIHNjaGVtYS5pdGVtcy5sZW5ndGgpLCByZXN1bHQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gfCtpbmNcblx0ICAgICAgICAgICAgaWYgKHJ1bGUucGFyYW1ldGVyc1syXSkgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSBsZW5ndGgpIHJldHVybiBmYWxzZVxuXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoLmFwcGx5KFxuXHQgICAgICAgICAgICAgICAgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgdGhpcy5kaWZmKFxuXHQgICAgICAgICAgICAgICAgICAgIHNjaGVtYS5pdGVtc1tpICUgc2NoZW1hLml0ZW1zLmxlbmd0aF0sXG5cdCAgICAgICAgICAgICAgICAgICAgZGF0YVtpXSxcblx0ICAgICAgICAgICAgICAgICAgICBpICUgc2NoZW1hLml0ZW1zLmxlbmd0aFxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICApXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgfVxuXHR9XG5cblx0Lypcblx0ICAgIOWujOWWhOOAgeWPi+WlveeahOaPkOekuuS/oeaBr1xuXHQgICAgXG5cdCAgICBFcXVhbCwgbm90IGVxdWFsIHRvLCBncmVhdGVyIHRoYW4sIGxlc3MgdGhhbiwgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG9cblx0ICAgIOi3r+W+hCDpqozor4Hnsbvlnosg5o+P6L+wIFxuXG5cdCAgICBFeHBlY3QgcGF0aC5uYW1lIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBleHBlY3RlZCwgYnV0IHBhdGgubmFtZSBpcyBhY3R1YWwuXG5cblx0ICAgIEV4cGVjdCBwYXRoLm5hbWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGV4cGVjdGVkLCBidXQgcGF0aC5uYW1lIGlzIGFjdHVhbC5cblx0ICAgIEV4cGVjdCBwYXRoLm5hbWUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGV4cGVjdGVkLCBidXQgcGF0aC5uYW1lIGlzIGFjdHVhbC5cblxuXHQqL1xuXHR2YXIgQXNzZXJ0ID0ge1xuXHQgICAgbWVzc2FnZTogZnVuY3Rpb24oaXRlbSkge1xuXHQgICAgICAgIHJldHVybiAoaXRlbS5tZXNzYWdlIHx8XG5cdCAgICAgICAgICAgICAgICAnW3t1dHlwZX1dIEV4cGVjdCB7cGF0aH1cXCd7bHR5cGV9IHthY3Rpb259IHtleHBlY3RlZH0sIGJ1dCBpcyB7YWN0dWFsfScpXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKCd7dXR5cGV9JywgaXRlbS50eXBlLnRvVXBwZXJDYXNlKCkpXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKCd7bHR5cGV9JywgaXRlbS50eXBlLnRvTG93ZXJDYXNlKCkpXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKCd7cGF0aH0nLCBVdGlsLmlzQXJyYXkoaXRlbS5wYXRoKSAmJiBpdGVtLnBhdGguam9pbignLicpIHx8IGl0ZW0ucGF0aClcblx0ICAgICAgICAgICAgLnJlcGxhY2UoJ3thY3Rpb259JywgaXRlbS5hY3Rpb24pXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKCd7ZXhwZWN0ZWR9JywgaXRlbS5leHBlY3RlZClcblx0ICAgICAgICAgICAgLnJlcGxhY2UoJ3thY3R1YWx9JywgaXRlbS5hY3R1YWwpXG5cdCAgICB9LFxuXHQgICAgZXF1YWw6IGZ1bmN0aW9uKHR5cGUsIHBhdGgsIGFjdHVhbCwgZXhwZWN0ZWQsIHJlc3VsdCwgbWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIHN3aXRjaCAodHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlICd0eXBlJzpcblx0ICAgICAgICAgICAgICAgIC8vIOato+WImeaooeadvyA9PT0g5a2X56ym5Liy5pyA57uI5YC8XG5cdCAgICAgICAgICAgICAgICBpZiAoZXhwZWN0ZWQgPT09ICdyZWdleHAnICYmIGFjdHVhbCA9PT0gJ3N0cmluZycpIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBpdGVtID0ge1xuXHQgICAgICAgICAgICBwYXRoOiBwYXRoLFxuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuXHQgICAgICAgICAgICBhY3Rpb246ICdpcyBlcXVhbCB0bycsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Vcblx0ICAgICAgICB9XG5cdCAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcblx0ICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfSxcblx0ICAgIC8vIGFjdHVhbCBtYXRjaGVzIGV4cGVjdGVkXG5cdCAgICBtYXRjaDogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG5cdCAgICAgICAgaWYgKGV4cGVjdGVkLnRlc3QoYWN0dWFsKSkgcmV0dXJuIHRydWVcblxuXHQgICAgICAgIHZhciBpdGVtID0ge1xuXHQgICAgICAgICAgICBwYXRoOiBwYXRoLFxuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuXHQgICAgICAgICAgICBhY3Rpb246ICdtYXRjaGVzJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuXHQgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9LFxuXHQgICAgbm90RXF1YWw6IGZ1bmN0aW9uKHR5cGUsIHBhdGgsIGFjdHVhbCwgZXhwZWN0ZWQsIHJlc3VsdCwgbWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIHZhciBpdGVtID0ge1xuXHQgICAgICAgICAgICBwYXRoOiBwYXRoLFxuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuXHQgICAgICAgICAgICBhY3Rpb246ICdpcyBub3QgZXF1YWwgdG8nLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGl0ZW0ubWVzc2FnZSA9IEFzc2VydC5tZXNzYWdlKGl0ZW0pXG5cdCAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH0sXG5cdCAgICBncmVhdGVyVGhhbjogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG5cdCAgICAgICAgaWYgKGFjdHVhbCA+IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIHZhciBpdGVtID0ge1xuXHQgICAgICAgICAgICBwYXRoOiBwYXRoLFxuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuXHQgICAgICAgICAgICBhY3Rpb246ICdpcyBncmVhdGVyIHRoYW4nLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGl0ZW0ubWVzc2FnZSA9IEFzc2VydC5tZXNzYWdlKGl0ZW0pXG5cdCAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH0sXG5cdCAgICBsZXNzVGhhbjogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG5cdCAgICAgICAgaWYgKGFjdHVhbCA8IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIHZhciBpdGVtID0ge1xuXHQgICAgICAgICAgICBwYXRoOiBwYXRoLFxuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuXHQgICAgICAgICAgICBhY3Rpb246ICdpcyBsZXNzIHRvJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuXHQgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9LFxuXHQgICAgZ3JlYXRlclRoYW5PckVxdWFsVG86IGZ1bmN0aW9uKHR5cGUsIHBhdGgsIGFjdHVhbCwgZXhwZWN0ZWQsIHJlc3VsdCwgbWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChhY3R1YWwgPj0gZXhwZWN0ZWQpIHJldHVybiB0cnVlXG5cdCAgICAgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgICAgIHBhdGg6IHBhdGgsXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG5cdCAgICAgICAgICAgIGFjdGlvbjogJ2lzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0bycsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Vcblx0ICAgICAgICB9XG5cdCAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcblx0ICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfSxcblx0ICAgIGxlc3NUaGFuT3JFcXVhbFRvOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAoYWN0dWFsIDw9IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIHZhciBpdGVtID0ge1xuXHQgICAgICAgICAgICBwYXRoOiBwYXRoLFxuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuXHQgICAgICAgICAgICBhY3Rpb246ICdpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8nLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGl0ZW0ubWVzc2FnZSA9IEFzc2VydC5tZXNzYWdlKGl0ZW0pXG5cdCAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH1cblx0fVxuXG5cdHZhbGlkLkRpZmYgPSBEaWZmXG5cdHZhbGlkLkFzc2VydCA9IEFzc2VydFxuXG5cdG1vZHVsZS5leHBvcnRzID0gdmFsaWRcblxuLyoqKi8gfSxcbi8qIDI3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG5cbi8qKiovIH0sXG4vKiAyOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogZ2xvYmFsIHdpbmRvdywgZG9jdW1lbnQsIGxvY2F0aW9uLCBFdmVudCwgc2V0VGltZW91dCAqL1xuXHQvKlxuXHQgICAgIyMgTW9ja1hNTEh0dHBSZXF1ZXN0XG5cblx0ICAgIOacn+acm+eahOWKn+iDve+8mlxuXHQgICAgMS4g5a6M5pW05Zyw6KaG55uW5Y6f55SfIFhIUiDnmoTooYzkuLpcblx0ICAgIDIuIOWujOaVtOWcsOaooeaLn+WOn+eUnyBYSFIg55qE6KGM5Li6XG5cdCAgICAzLiDlnKjlj5Hotbfor7fmsYLml7bvvIzoh6rliqjmo4DmtYvmmK/lkKbpnIDopoHmi6bmiKpcblx0ICAgIDQuIOWmguaenOS4jeW/heaLpuaIqu+8jOWImeaJp+ihjOWOn+eUnyBYSFIg55qE6KGM5Li6XG5cdCAgICA1LiDlpoLmnpzpnIDopoHmi6bmiKrvvIzliJnmiafooYzomZrmi58gWEhSIOeahOihjOS4ulxuXHQgICAgNi4g5YW85a65IFhNTEh0dHBSZXF1ZXN0IOWSjCBBY3RpdmVYT2JqZWN0XG5cdCAgICAgICAgbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG5cdCAgICAgICAgbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIilcblxuXHQgICAg5YWz6ZSu5pa55rOV55qE6YC76L6R77yaXG5cdCAgICAqIG5ldyAgIOatpOaXtuWwmuaXoOazleehruWumuaYr+WQpumcgOimgeaLpuaIqu+8jOaJgOS7peWIm+W7uuWOn+eUnyBYSFIg5a+56LGh5piv5b+F6aG755qE44CCXG5cdCAgICAqIG9wZW4gIOatpOaXtuWPr+S7peWPluWIsCBVUkzvvIzlj6/ku6XlhrPlrprmmK/lkKbov5vooYzmi6bmiKrjgIJcblx0ICAgICogc2VuZCAg5q2k5pe25bey57uP56Gu5a6a5LqG6K+35rGC5pa55byP44CCXG5cblx0ICAgIOinhOiMg++8mlxuXHQgICAgaHR0cDovL3hoci5zcGVjLndoYXR3Zy5vcmcvXG5cdCAgICBodHRwOi8vd3d3LnczLm9yZy9UUi9YTUxIdHRwUmVxdWVzdDIvXG5cblx0ICAgIOWPguiAg+WunueOsO+8mlxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL3BoaWxpa29uL01vY2tIdHRwUmVxdWVzdC9ibG9iL21hc3Rlci9saWIvbW9jay5qc1xuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL3RyZWsvRmFrZVhNTEh0dHBSZXF1ZXN0L2Jsb2IvbWFzdGVyL2Zha2VfeG1sX2h0dHBfcmVxdWVzdC5qc1xuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2lsaW5za3kveG1saHR0cHJlcXVlc3QvYmxvYi9tYXN0ZXIvWE1MSHR0cFJlcXVlc3QuanNcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9maXJlYnVnL2ZpcmVidWctbGl0ZS9ibG9iL21hc3Rlci9jb250ZW50L2xpdGUveGhyLmpzXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vdGh4L1JBUC9ibG9iL21hc3Rlci9sYWIvcmFwLnBsdWdpbi54aW5nbGllLmpzXG5cblx0ICAgICoq6ZyA5LiN6ZyA6KaB5YWo6Z2i6YeN5YaZIFhNTEh0dHBSZXF1ZXN077yfKipcblx0ICAgICAgICBodHRwOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLXhtbGh0dHByZXF1ZXN0XG5cdCAgICAgICAg5YWz6ZSu5bGe5oCnIHJlYWR5U3RhdGXjgIFzdGF0dXPjgIFzdGF0dXNUZXh044CBcmVzcG9uc2XjgIFyZXNwb25zZVRleHTjgIFyZXNwb25zZVhNTCDmmK8gcmVhZG9ubHnvvIzmiYDku6XvvIzor5Xlm77pgJrov4fkv67mlLnov5nkupvnirbmgIHvvIzmnaXmqKHmi5/lk43lupTmmK/kuI3lj6/ooYznmoTjgIJcblx0ICAgICAgICDlm6DmraTvvIzllK/kuIDnmoTlip7ms5XmmK/mqKHmi5/mlbTkuKogWE1MSHR0cFJlcXVlc3TvvIzlsLHlg48galF1ZXJ5IOWvueS6i+S7tuaooeWei+eahOWwgeijheOAglxuXG5cdCAgICAvLyBFdmVudCBoYW5kbGVyc1xuXHQgICAgb25sb2Fkc3RhcnQgICAgICAgICBsb2Fkc3RhcnRcblx0ICAgIG9ucHJvZ3Jlc3MgICAgICAgICAgcHJvZ3Jlc3Ncblx0ICAgIG9uYWJvcnQgICAgICAgICAgICAgYWJvcnRcblx0ICAgIG9uZXJyb3IgICAgICAgICAgICAgZXJyb3Jcblx0ICAgIG9ubG9hZCAgICAgICAgICAgICAgbG9hZFxuXHQgICAgb250aW1lb3V0ICAgICAgICAgICB0aW1lb3V0XG5cdCAgICBvbmxvYWRlbmQgICAgICAgICAgIGxvYWRlbmRcblx0ICAgIG9ucmVhZHlzdGF0ZWNoYW5nZSAgcmVhZHlzdGF0ZWNoYW5nZVxuXHQgKi9cblxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblxuXHQvLyDlpIfku73ljp/nlJ8gWE1MSHR0cFJlcXVlc3Rcblx0d2luZG93Ll9YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdFxuXHR3aW5kb3cuX0FjdGl2ZVhPYmplY3QgPSB3aW5kb3cuQWN0aXZlWE9iamVjdFxuXG5cdC8qXG5cdCAgICBQaGFudG9tSlNcblx0ICAgIFR5cGVFcnJvcjogJ1tvYmplY3QgRXZlbnRDb25zdHJ1Y3Rvcl0nIGlzIG5vdCBhIGNvbnN0cnVjdG9yIChldmFsdWF0aW5nICduZXcgRXZlbnQoXCJyZWFkeXN0YXRlY2hhbmdlXCIpJylcblxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2JsdWVyYWlsL3R3aXR0ZXItYm9vdHN0cmFwLXJhaWxzLWNvbmZpcm0vaXNzdWVzLzE4XG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTI4OVxuXHQqL1xuXHR0cnkge1xuXHQgICAgbmV3IHdpbmRvdy5FdmVudCgnY3VzdG9tJylcblx0fSBjYXRjaCAoZXhjZXB0aW9uKSB7XG5cdCAgICB3aW5kb3cuRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkZXRhaWwpIHtcblx0ICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKSAvLyBNVVNUIGJlICdDdXN0b21FdmVudCdcblx0ICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGV0YWlsKVxuXHQgICAgICAgIHJldHVybiBldmVudFxuXHQgICAgfVxuXHR9XG5cblx0dmFyIFhIUl9TVEFURVMgPSB7XG5cdCAgICAvLyBUaGUgb2JqZWN0IGhhcyBiZWVuIGNvbnN0cnVjdGVkLlxuXHQgICAgVU5TRU5UOiAwLFxuXHQgICAgLy8gVGhlIG9wZW4oKSBtZXRob2QgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGludm9rZWQuXG5cdCAgICBPUEVORUQ6IDEsXG5cdCAgICAvLyBBbGwgcmVkaXJlY3RzIChpZiBhbnkpIGhhdmUgYmVlbiBmb2xsb3dlZCBhbmQgYWxsIEhUVFAgaGVhZGVycyBvZiB0aGUgcmVzcG9uc2UgaGF2ZSBiZWVuIHJlY2VpdmVkLlxuXHQgICAgSEVBREVSU19SRUNFSVZFRDogMixcblx0ICAgIC8vIFRoZSByZXNwb25zZSdzIGJvZHkgaXMgYmVpbmcgcmVjZWl2ZWQuXG5cdCAgICBMT0FESU5HOiAzLFxuXHQgICAgLy8gVGhlIGRhdGEgdHJhbnNmZXIgaGFzIGJlZW4gY29tcGxldGVkIG9yIHNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyB0aGUgdHJhbnNmZXIgKGUuZy4gaW5maW5pdGUgcmVkaXJlY3RzKS5cblx0ICAgIERPTkU6IDRcblx0fVxuXG5cdHZhciBYSFJfRVZFTlRTID0gJ3JlYWR5c3RhdGVjaGFuZ2UgbG9hZHN0YXJ0IHByb2dyZXNzIGFib3J0IGVycm9yIGxvYWQgdGltZW91dCBsb2FkZW5kJy5zcGxpdCgnICcpXG5cdHZhciBYSFJfUkVRVUVTVF9QUk9QRVJUSUVTID0gJ3RpbWVvdXQgd2l0aENyZWRlbnRpYWxzJy5zcGxpdCgnICcpXG5cdHZhciBYSFJfUkVTUE9OU0VfUFJPUEVSVElFUyA9ICdyZWFkeVN0YXRlIHJlc3BvbnNlVVJMIHN0YXR1cyBzdGF0dXNUZXh0IHJlc3BvbnNlVHlwZSByZXNwb25zZSByZXNwb25zZVRleHQgcmVzcG9uc2VYTUwnLnNwbGl0KCcgJylcblxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vdHJlay9GYWtlWE1MSHR0cFJlcXVlc3QvYmxvYi9tYXN0ZXIvZmFrZV94bWxfaHR0cF9yZXF1ZXN0LmpzI0wzMlxuXHR2YXIgSFRUUF9TVEFUVVNfQ09ERVMgPSB7XG5cdCAgICAxMDA6IFwiQ29udGludWVcIixcblx0ICAgIDEwMTogXCJTd2l0Y2hpbmcgUHJvdG9jb2xzXCIsXG5cdCAgICAyMDA6IFwiT0tcIixcblx0ICAgIDIwMTogXCJDcmVhdGVkXCIsXG5cdCAgICAyMDI6IFwiQWNjZXB0ZWRcIixcblx0ICAgIDIwMzogXCJOb24tQXV0aG9yaXRhdGl2ZSBJbmZvcm1hdGlvblwiLFxuXHQgICAgMjA0OiBcIk5vIENvbnRlbnRcIixcblx0ICAgIDIwNTogXCJSZXNldCBDb250ZW50XCIsXG5cdCAgICAyMDY6IFwiUGFydGlhbCBDb250ZW50XCIsXG5cdCAgICAzMDA6IFwiTXVsdGlwbGUgQ2hvaWNlXCIsXG5cdCAgICAzMDE6IFwiTW92ZWQgUGVybWFuZW50bHlcIixcblx0ICAgIDMwMjogXCJGb3VuZFwiLFxuXHQgICAgMzAzOiBcIlNlZSBPdGhlclwiLFxuXHQgICAgMzA0OiBcIk5vdCBNb2RpZmllZFwiLFxuXHQgICAgMzA1OiBcIlVzZSBQcm94eVwiLFxuXHQgICAgMzA3OiBcIlRlbXBvcmFyeSBSZWRpcmVjdFwiLFxuXHQgICAgNDAwOiBcIkJhZCBSZXF1ZXN0XCIsXG5cdCAgICA0MDE6IFwiVW5hdXRob3JpemVkXCIsXG5cdCAgICA0MDI6IFwiUGF5bWVudCBSZXF1aXJlZFwiLFxuXHQgICAgNDAzOiBcIkZvcmJpZGRlblwiLFxuXHQgICAgNDA0OiBcIk5vdCBGb3VuZFwiLFxuXHQgICAgNDA1OiBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiLFxuXHQgICAgNDA2OiBcIk5vdCBBY2NlcHRhYmxlXCIsXG5cdCAgICA0MDc6IFwiUHJveHkgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIixcblx0ICAgIDQwODogXCJSZXF1ZXN0IFRpbWVvdXRcIixcblx0ICAgIDQwOTogXCJDb25mbGljdFwiLFxuXHQgICAgNDEwOiBcIkdvbmVcIixcblx0ICAgIDQxMTogXCJMZW5ndGggUmVxdWlyZWRcIixcblx0ICAgIDQxMjogXCJQcmVjb25kaXRpb24gRmFpbGVkXCIsXG5cdCAgICA0MTM6IFwiUmVxdWVzdCBFbnRpdHkgVG9vIExhcmdlXCIsXG5cdCAgICA0MTQ6IFwiUmVxdWVzdC1VUkkgVG9vIExvbmdcIixcblx0ICAgIDQxNTogXCJVbnN1cHBvcnRlZCBNZWRpYSBUeXBlXCIsXG5cdCAgICA0MTY6IFwiUmVxdWVzdGVkIFJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxuXHQgICAgNDE3OiBcIkV4cGVjdGF0aW9uIEZhaWxlZFwiLFxuXHQgICAgNDIyOiBcIlVucHJvY2Vzc2FibGUgRW50aXR5XCIsXG5cdCAgICA1MDA6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG5cdCAgICA1MDE6IFwiTm90IEltcGxlbWVudGVkXCIsXG5cdCAgICA1MDI6IFwiQmFkIEdhdGV3YXlcIixcblx0ICAgIDUwMzogXCJTZXJ2aWNlIFVuYXZhaWxhYmxlXCIsXG5cdCAgICA1MDQ6IFwiR2F0ZXdheSBUaW1lb3V0XCIsXG5cdCAgICA1MDU6IFwiSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWRcIlxuXHR9XG5cblx0Lypcblx0ICAgIE1vY2tYTUxIdHRwUmVxdWVzdFxuXHQqL1xuXG5cdGZ1bmN0aW9uIE1vY2tYTUxIdHRwUmVxdWVzdCgpIHtcblx0ICAgIC8vIOWIneWni+WMliBjdXN0b20g5a+56LGh77yM55So5LqO5a2Y5YKo6Ieq5a6a5LmJ5bGe5oCnXG5cdCAgICB0aGlzLmN1c3RvbSA9IHtcblx0ICAgICAgICBldmVudHM6IHt9LFxuXHQgICAgICAgIHJlcXVlc3RIZWFkZXJzOiB7fSxcblx0ICAgICAgICByZXNwb25zZUhlYWRlcnM6IHt9XG5cdCAgICB9XG5cdH1cblxuXHRNb2NrWE1MSHR0cFJlcXVlc3QuX3NldHRpbmdzID0ge1xuXHQgICAgdGltZW91dDogJzEwLTEwMCcsXG5cdCAgICAvKlxuXHQgICAgICAgIHRpbWVvdXQ6IDUwLFxuXHQgICAgICAgIHRpbWVvdXQ6ICcxMC0xMDAnLFxuXHQgICAgICovXG5cdH1cblxuXHRNb2NrWE1MSHR0cFJlcXVlc3Quc2V0dXAgPSBmdW5jdGlvbihzZXR0aW5ncykge1xuXHQgICAgVXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0Ll9zZXR0aW5ncywgc2V0dGluZ3MpXG5cdCAgICByZXR1cm4gTW9ja1hNTEh0dHBSZXF1ZXN0Ll9zZXR0aW5nc1xuXHR9XG5cblx0VXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LCBYSFJfU1RBVEVTKVxuXHRVdGlsLmV4dGVuZChNb2NrWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCBYSFJfU1RBVEVTKVxuXG5cdC8vIOagh+iusOW9k+WJjeWvueixoeS4uiBNb2NrWE1MSHR0cFJlcXVlc3Rcblx0TW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5tb2NrID0gdHJ1ZVxuXG5cdC8vIOaYr+WQpuaLpuaIqiBBamF4IOivt+axglxuXHRNb2NrWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm1hdGNoID0gZmFsc2VcblxuXHQvLyDliJ3lp4vljJYgUmVxdWVzdCDnm7jlhbPnmoTlsZ7mgKflkozmlrnms5Vcblx0VXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHQgICAgLy8gaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtb3BlbigpLW1ldGhvZFxuXHQgICAgLy8gU2V0cyB0aGUgcmVxdWVzdCBtZXRob2QsIHJlcXVlc3QgVVJMLCBhbmQgc3luY2hyb25vdXMgZmxhZy5cblx0ICAgIG9wZW46IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cdCAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG5cblx0ICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLmN1c3RvbSwge1xuXHQgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcblx0ICAgICAgICAgICAgdXJsOiB1cmwsXG5cdCAgICAgICAgICAgIGFzeW5jOiB0eXBlb2YgYXN5bmMgPT09ICdib29sZWFuJyA/IGFzeW5jIDogdHJ1ZSxcblx0ICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuXHQgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG5cdCAgICAgICAgICAgIG9wdGlvbnM6IHtcblx0ICAgICAgICAgICAgICAgIHVybDogdXJsLFxuXHQgICAgICAgICAgICAgICAgdHlwZTogbWV0aG9kXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KVxuXG5cdCAgICAgICAgdGhpcy5jdXN0b20udGltZW91dCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnbnVtYmVyJykgcmV0dXJuIHRpbWVvdXRcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnc3RyaW5nJyAmJiAhfnRpbWVvdXQuaW5kZXhPZignLScpKSByZXR1cm4gcGFyc2VJbnQodGltZW91dCwgMTApXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZW91dCA9PT0gJ3N0cmluZycgJiYgfnRpbWVvdXQuaW5kZXhPZignLScpKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGltZW91dC5zcGxpdCgnLScpXG5cdCAgICAgICAgICAgICAgICB2YXIgbWluID0gcGFyc2VJbnQodG1wWzBdLCAxMClcblx0ICAgICAgICAgICAgICAgIHZhciBtYXggPSBwYXJzZUludCh0bXBbMV0sIDEwKVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfShNb2NrWE1MSHR0cFJlcXVlc3QuX3NldHRpbmdzLnRpbWVvdXQpXG5cblx0ICAgICAgICAvLyDmn6Xmib7kuI7or7fmsYLlj4LmlbDljLnphY3nmoTmlbDmja7mqKHmnb9cblx0ICAgICAgICB2YXIgaXRlbSA9IGZpbmQodGhpcy5jdXN0b20ub3B0aW9ucylcblxuXHQgICAgICAgIGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuXHQgICAgICAgICAgICAvLyDlkIzmraXlsZ7mgKcgTmF0aXZlWE1MSHR0cFJlcXVlc3QgPT4gTW9ja1hNTEh0dHBSZXF1ZXN0XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgWEhSX1JFU1BPTlNFX1BST1BFUlRJRVMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhhdFtYSFJfUkVTUE9OU0VfUFJPUEVSVElFU1tpXV0gPSB4aHJbWEhSX1JFU1BPTlNFX1BST1BFUlRJRVNbaV1dXG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIOinpuWPkSBNb2NrWE1MSHR0cFJlcXVlc3Qg5LiK55qE5ZCM5ZCN5LqL5Lu2XG5cdCAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZXZlbnQudHlwZSAvKiwgZmFsc2UsIGZhbHNlLCB0aGF0Ki8gKSlcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDlpoLmnpzmnKrmib7liLDljLnphY3nmoTmlbDmja7mqKHmnb/vvIzliJnph4fnlKjljp/nlJ8gWEhSIOWPkemAgeivt+axguOAglxuXHQgICAgICAgIGlmICghaXRlbSkge1xuXHQgICAgICAgICAgICAvLyDliJvlu7rljp/nlJ8gWEhSIOWvueixoe+8jOiwg+eUqOWOn+eUnyBvcGVuKCnvvIznm5HlkKzmiYDmnInljp/nlJ/kuovku7Zcblx0ICAgICAgICAgICAgdmFyIHhociA9IGNyZWF0ZU5hdGl2ZVhNTEh0dHBSZXF1ZXN0KClcblx0ICAgICAgICAgICAgdGhpcy5jdXN0b20ueGhyID0geGhyXG5cblx0ICAgICAgICAgICAgLy8g5Yid5aeL5YyW5omA5pyJ5LqL5Lu277yM55So5LqO55uR5ZCs5Y6f55SfIFhIUiDlr7nosaHnmoTkuovku7Zcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBYSFJfRVZFTlRTLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihYSFJfRVZFTlRTW2ldLCBoYW5kbGUpXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyB4aHIub3BlbigpXG5cdCAgICAgICAgICAgIGlmICh1c2VybmFtZSkgeGhyLm9wZW4obWV0aG9kLCB1cmwsIGFzeW5jLCB1c2VybmFtZSwgcGFzc3dvcmQpXG5cdCAgICAgICAgICAgIGVsc2UgeGhyLm9wZW4obWV0aG9kLCB1cmwsIGFzeW5jKVxuXG5cdCAgICAgICAgICAgIC8vIOWQjOatpeWxnuaApyBNb2NrWE1MSHR0cFJlcXVlc3QgPT4gTmF0aXZlWE1MSHR0cFJlcXVlc3Rcblx0ICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBYSFJfUkVRVUVTVF9QUk9QRVJUSUVTLmxlbmd0aDsgaisrKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHhocltYSFJfUkVRVUVTVF9QUk9QRVJUSUVTW2pdXSA9IHRoYXRbWEhSX1JFUVVFU1RfUFJPUEVSVElFU1tqXV1cblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDmib7liLDkuobljLnphY3nmoTmlbDmja7mqKHmnb/vvIzlvIDlp4vmi6bmiKogWEhSIOivt+axglxuXHQgICAgICAgIHRoaXMubWF0Y2ggPSB0cnVlXG5cdCAgICAgICAgdGhpcy5jdXN0b20udGVtcGxhdGUgPSBpdGVtXG5cdCAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0Lk9QRU5FRFxuXHQgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoaXMqLyApKVxuXHQgICAgfSxcblx0ICAgIC8vIGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLXNldHJlcXVlc3RoZWFkZXIoKS1tZXRob2Rcblx0ICAgIC8vIENvbWJpbmVzIGEgaGVhZGVyIGluIGF1dGhvciByZXF1ZXN0IGhlYWRlcnMuXG5cdCAgICBzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuXHQgICAgICAgIC8vIOWOn+eUnyBYSFJcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2gpIHtcblx0ICAgICAgICAgICAgdGhpcy5jdXN0b20ueGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOaLpuaIqiBYSFJcblx0ICAgICAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSB0aGlzLmN1c3RvbS5yZXF1ZXN0SGVhZGVyc1xuXHQgICAgICAgIGlmIChyZXF1ZXN0SGVhZGVyc1tuYW1lXSkgcmVxdWVzdEhlYWRlcnNbbmFtZV0gKz0gJywnICsgdmFsdWVcblx0ICAgICAgICBlbHNlIHJlcXVlc3RIZWFkZXJzW25hbWVdID0gdmFsdWVcblx0ICAgIH0sXG5cdCAgICB0aW1lb3V0OiAwLFxuXHQgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcblx0ICAgIHVwbG9hZDoge30sXG5cdCAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1zZW5kKCktbWV0aG9kXG5cdCAgICAvLyBJbml0aWF0ZXMgdGhlIHJlcXVlc3QuXG5cdCAgICBzZW5kOiBmdW5jdGlvbiBzZW5kKGRhdGEpIHtcblx0ICAgICAgICB2YXIgdGhhdCA9IHRoaXNcblx0ICAgICAgICB0aGlzLmN1c3RvbS5vcHRpb25zLmJvZHkgPSBkYXRhXG5cblx0ICAgICAgICAvLyDljp/nlJ8gWEhSXG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuY3VzdG9tLnhoci5zZW5kKGRhdGEpXG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOaLpuaIqiBYSFJcblxuXHQgICAgICAgIC8vIFgtUmVxdWVzdGVkLVdpdGggaGVhZGVyXG5cdCAgICAgICAgdGhpcy5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ01vY2tYTUxIdHRwUmVxdWVzdCcpXG5cblx0ICAgICAgICAvLyBsb2Fkc3RhcnQgVGhlIGZldGNoIGluaXRpYXRlcy5cblx0ICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2Fkc3RhcnQnIC8qLCBmYWxzZSwgZmFsc2UsIHRoaXMqLyApKVxuXG5cdCAgICAgICAgaWYgKHRoaXMuY3VzdG9tLmFzeW5jKSBzZXRUaW1lb3V0KGRvbmUsIHRoaXMuY3VzdG9tLnRpbWVvdXQpIC8vIOW8guatpVxuXHQgICAgICAgIGVsc2UgZG9uZSgpIC8vIOWQjOatpVxuXG5cdCAgICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcblx0ICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0LkhFQURFUlNfUkVDRUlWRURcblx0ICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVhZHlzdGF0ZWNoYW5nZScgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpXG5cdCAgICAgICAgICAgIHRoYXQucmVhZHlTdGF0ZSA9IE1vY2tYTUxIdHRwUmVxdWVzdC5MT0FESU5HXG5cdCAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKVxuXG5cdCAgICAgICAgICAgIHRoYXQuc3RhdHVzID0gMjAwXG5cdCAgICAgICAgICAgIHRoYXQuc3RhdHVzVGV4dCA9IEhUVFBfU1RBVFVTX0NPREVTWzIwMF1cblxuXHQgICAgICAgICAgICAvLyBmaXggIzkyICM5MyBieSBAcWRkZWd0eWFcblx0ICAgICAgICAgICAgdGhhdC5yZXNwb25zZSA9IHRoYXQucmVzcG9uc2VUZXh0ID0gSlNPTi5zdHJpbmdpZnkoXG5cdCAgICAgICAgICAgICAgICBjb252ZXJ0KHRoYXQuY3VzdG9tLnRlbXBsYXRlLCB0aGF0LmN1c3RvbS5vcHRpb25zKSxcblx0ICAgICAgICAgICAgICAgIG51bGwsIDRcblx0ICAgICAgICAgICAgKVxuXG5cdCAgICAgICAgICAgIHRoYXQucmVhZHlTdGF0ZSA9IE1vY2tYTUxIdHRwUmVxdWVzdC5ET05FXG5cdCAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKVxuXHQgICAgICAgICAgICB0aGF0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2FkJyAvKiwgZmFsc2UsIGZhbHNlLCB0aGF0Ki8gKSk7XG5cdCAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvYWRlbmQnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKTtcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgLy8gaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtYWJvcnQoKS1tZXRob2Rcblx0ICAgIC8vIENhbmNlbHMgYW55IG5ldHdvcmsgYWN0aXZpdHkuXG5cdCAgICBhYm9ydDogZnVuY3Rpb24gYWJvcnQoKSB7XG5cdCAgICAgICAgLy8g5Y6f55SfIFhIUlxuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCkge1xuXHQgICAgICAgICAgICB0aGlzLmN1c3RvbS54aHIuYWJvcnQoKVxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDmi6bmiKogWEhSXG5cdCAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0LlVOU0VOVFxuXHQgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Fib3J0JywgZmFsc2UsIGZhbHNlLCB0aGlzKSlcblx0ICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdlcnJvcicsIGZhbHNlLCBmYWxzZSwgdGhpcykpXG5cdCAgICB9XG5cdH0pXG5cblx0Ly8g5Yid5aeL5YyWIFJlc3BvbnNlIOebuOWFs+eahOWxnuaAp+WSjOaWueazlVxuXHRVdGlsLmV4dGVuZChNb2NrWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCB7XG5cdCAgICByZXNwb25zZVVSTDogJycsXG5cdCAgICBzdGF0dXM6IE1vY2tYTUxIdHRwUmVxdWVzdC5VTlNFTlQsXG5cdCAgICBzdGF0dXNUZXh0OiAnJyxcblx0ICAgIC8vIGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLWdldHJlc3BvbnNlaGVhZGVyKCktbWV0aG9kXG5cdCAgICBnZXRSZXNwb25zZUhlYWRlcjogZnVuY3Rpb24obmFtZSkge1xuXHQgICAgICAgIC8vIOWOn+eUnyBYSFJcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2gpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tLnhoci5nZXRSZXNwb25zZUhlYWRlcihuYW1lKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOaLpuaIqiBYSFJcblx0ICAgICAgICByZXR1cm4gdGhpcy5jdXN0b20ucmVzcG9uc2VIZWFkZXJzW25hbWUudG9Mb3dlckNhc2UoKV1cblx0ICAgIH0sXG5cdCAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1nZXRhbGxyZXNwb25zZWhlYWRlcnMoKS1tZXRob2Rcblx0ICAgIC8vIGh0dHA6Ly93d3cudXRmOC1jaGFydGFibGUuZGUvXG5cdCAgICBnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIC8vIOWOn+eUnyBYSFJcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2gpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOaLpuaIqiBYSFJcblx0ICAgICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gdGhpcy5jdXN0b20ucmVzcG9uc2VIZWFkZXJzXG5cdCAgICAgICAgdmFyIGhlYWRlcnMgPSAnJ1xuXHQgICAgICAgIGZvciAodmFyIGggaW4gcmVzcG9uc2VIZWFkZXJzKSB7XG5cdCAgICAgICAgICAgIGlmICghcmVzcG9uc2VIZWFkZXJzLmhhc093blByb3BlcnR5KGgpKSBjb250aW51ZVxuXHQgICAgICAgICAgICBoZWFkZXJzICs9IGggKyAnOiAnICsgcmVzcG9uc2VIZWFkZXJzW2hdICsgJ1xcclxcbidcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGhlYWRlcnNcblx0ICAgIH0sXG5cdCAgICBvdmVycmlkZU1pbWVUeXBlOiBmdW5jdGlvbiggLyptaW1lKi8gKSB7fSxcblx0ICAgIHJlc3BvbnNlVHlwZTogJycsIC8vICcnLCAndGV4dCcsICdhcnJheWJ1ZmZlcicsICdibG9iJywgJ2RvY3VtZW50JywgJ2pzb24nXG5cdCAgICByZXNwb25zZTogbnVsbCxcblx0ICAgIHJlc3BvbnNlVGV4dDogJycsXG5cdCAgICByZXNwb25zZVhNTDogbnVsbFxuXHR9KVxuXG5cdC8vIEV2ZW50VGFyZ2V0XG5cdFV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsIHtcblx0ICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlKSB7XG5cdCAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuY3VzdG9tLmV2ZW50c1xuXHQgICAgICAgIGlmICghZXZlbnRzW3R5cGVdKSBldmVudHNbdHlwZV0gPSBbXVxuXHQgICAgICAgIGV2ZW50c1t0eXBlXS5wdXNoKGhhbmRsZSlcblx0ICAgIH0sXG5cdCAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZSkge1xuXHQgICAgICAgIHZhciBoYW5kbGVzID0gdGhpcy5jdXN0b20uZXZlbnRzW3R5cGVdIHx8IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGlmIChoYW5kbGVzW2ldID09PSBoYW5kbGUpIHtcblx0ICAgICAgICAgICAgICAgIGhhbmRsZXMuc3BsaWNlKGktLSwgMSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBkaXNwYXRjaEV2ZW50OiBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50KSB7XG5cdCAgICAgICAgdmFyIGhhbmRsZXMgPSB0aGlzLmN1c3RvbS5ldmVudHNbZXZlbnQudHlwZV0gfHwgW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgaGFuZGxlc1tpXS5jYWxsKHRoaXMsIGV2ZW50KVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBvbnR5cGUgPSAnb24nICsgZXZlbnQudHlwZVxuXHQgICAgICAgIGlmICh0aGlzW29udHlwZV0pIHRoaXNbb250eXBlXShldmVudClcblx0ICAgIH1cblx0fSlcblxuXHQvLyBJbnNwaXJlZCBieSBqUXVlcnlcblx0ZnVuY3Rpb24gY3JlYXRlTmF0aXZlWE1MSHR0cFJlcXVlc3QoKSB7XG5cdCAgICB2YXIgaXNMb2NhbCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciBybG9jYWxQcm90b2NvbCA9IC9eKD86YWJvdXR8YXBwfGFwcC1zdG9yYWdlfC4rLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvXG5cdCAgICAgICAgdmFyIHJ1cmwgPSAvXihbXFx3ListXSs6KSg/OlxcL1xcLyhbXlxcLz8jOl0qKSg/OjooXFxkKyl8KXwpL1xuXHQgICAgICAgIHZhciBhamF4TG9jYXRpb24gPSBsb2NhdGlvbi5ocmVmXG5cdCAgICAgICAgdmFyIGFqYXhMb2NQYXJ0cyA9IHJ1cmwuZXhlYyhhamF4TG9jYXRpb24udG9Mb3dlckNhc2UoKSkgfHwgW11cblx0ICAgICAgICByZXR1cm4gcmxvY2FsUHJvdG9jb2wudGVzdChhamF4TG9jUGFydHNbMV0pXG5cdCAgICB9KClcblxuXHQgICAgcmV0dXJuIHdpbmRvdy5BY3RpdmVYT2JqZWN0ID9cblx0ICAgICAgICAoIWlzTG9jYWwgJiYgY3JlYXRlU3RhbmRhcmRYSFIoKSB8fCBjcmVhdGVBY3RpdmVYSFIoKSkgOiBjcmVhdGVTdGFuZGFyZFhIUigpXG5cblx0ICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YW5kYXJkWEhSKCkge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93Ll9YTUxIdHRwUmVxdWVzdCgpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVhIUigpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5fQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgICB9XG5cdH1cblxuXG5cdC8vIOafpeaJvuS4juivt+axguWPguaVsOWMuemFjeeahOaVsOaNruaooeadv++8mlVSTO+8jFR5cGVcblx0ZnVuY3Rpb24gZmluZChvcHRpb25zKSB7XG5cblx0ICAgIGZvciAodmFyIHNVcmxUeXBlIGluIE1vY2tYTUxIdHRwUmVxdWVzdC5Nb2NrLl9tb2NrZWQpIHtcblx0ICAgICAgICB2YXIgaXRlbSA9IE1vY2tYTUxIdHRwUmVxdWVzdC5Nb2NrLl9tb2NrZWRbc1VybFR5cGVdXG5cdCAgICAgICAgaWYgKFxuXHQgICAgICAgICAgICAoIWl0ZW0ucnVybCB8fCBtYXRjaChpdGVtLnJ1cmwsIG9wdGlvbnMudXJsKSkgJiZcblx0ICAgICAgICAgICAgKCFpdGVtLnJ0eXBlIHx8IG1hdGNoKGl0ZW0ucnR5cGUsIG9wdGlvbnMudHlwZS50b0xvd2VyQ2FzZSgpKSlcblx0ICAgICAgICApIHtcblx0ICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1ttb2NrXScsIG9wdGlvbnMudXJsLCAnPicsIGl0ZW0ucnVybClcblx0ICAgICAgICAgICAgcmV0dXJuIGl0ZW1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIG1hdGNoKGV4cGVjdGVkLCBhY3R1YWwpIHtcblx0ICAgICAgICBpZiAoVXRpbC50eXBlKGV4cGVjdGVkKSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkID09PSBhY3R1YWxcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKFV0aWwudHlwZShleHBlY3RlZCkgPT09ICdyZWdleHAnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbClcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0fVxuXG5cdC8vIOaVsOaNruaooeadvyDvvJ0+IOWTjeW6lOaVsOaNrlxuXHRmdW5jdGlvbiBjb252ZXJ0KGl0ZW0sIG9wdGlvbnMpIHtcblx0ICAgIHJldHVybiBVdGlsLmlzRnVuY3Rpb24oaXRlbS50ZW1wbGF0ZSkgP1xuXHQgICAgICAgIGl0ZW0udGVtcGxhdGUob3B0aW9ucykgOiBNb2NrWE1MSHR0cFJlcXVlc3QuTW9jay5tb2NrKGl0ZW0udGVtcGxhdGUpXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IE1vY2tYTUxIdHRwUmVxdWVzdFxuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbW9ja2pzL2Rpc3QvbW9jay5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5vdXRpbHM9dCgpOmUub3V0aWxzPXQoKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KG8pe2lmKG5bb10pcmV0dXJuIG5bb10uZXhwb3J0czt2YXIgcj1uW29dPXtpOm8sbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtvXS5jYWxsKHIuZXhwb3J0cyxyLHIuZXhwb3J0cyx0KSxyLmw9ITAsci5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLG8pe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6b30pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9NSl9KFtmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtyZXR1cm4gbmV3IFJlZ0V4cChcIihcXFxcc3xeKVwiK3QrXCIoXFxcXHN8JClcIikudGVzdChlLmNsYXNzTmFtZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQsbil7dmFyIG89bmV3IERhdGU7by5zZXREYXRlKG8uZ2V0RGF0ZSgpK24pLGRvY3VtZW50LmNvb2tpZT1lK1wiPVwiK3QrXCI7ZXhwaXJlcz1cIitvfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiB3aW5kb3cuc2Nyb2xsVG8oMCxlKSxlfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixvKXtmdW5jdGlvbiByKCl7ZnVuY3Rpb24gcigpe2E9TnVtYmVyKG5ldyBEYXRlKSxuLmFwcGx5KGYscyl9ZnVuY3Rpb24gdSgpe2k9dm9pZCAwfXZhciBmPXRoaXMsYz1OdW1iZXIobmV3IERhdGUpLWEscz1hcmd1bWVudHM7byYmIWkmJnIoKSxpJiZjbGVhclRpbWVvdXQoaSksdm9pZCAwPT09byYmYz5lP3IoKTohMCE9PXQmJihpPXNldFRpbWVvdXQobz91OnIsdm9pZCAwPT09bz9lLWM6ZSkpfXZhciBpLGE9MDtyZXR1cm5cImJvb2xlYW5cIiE9dHlwZW9mIHQmJihvPW4sbj10LHQ9dm9pZCAwKSxyfX0sZnVuY3Rpb24oZSx0LG4pe3ZhciBvPW4oNikscj1uKDcpLGk9bigwKSxhPW4oOCksdT1uKDkpLGY9bigxMCksYz1uKDEpLHM9bigxMSkscD1uKDEyKSxkPW4oMiksbD1uKDEzKSxtPW4oMTQpLHY9bigzKSx3PW4oMTUpLGc9bigxNikseT1uKDQpLGg9bigxNykseD1uKDE4KSxiPW4oMTkpLEM9bigyMCksTj1uKDIxKSxTPW4oMjIpLE09bigyMyksRT1uKDI0KSxGPW4oMjUpLEQ9bigyNiksST1uKDI3KSxUPW4oMjgpLGs9bigyOSksUj1uKDMwKSxBPW4oMzEpO2UuZXhwb3J0cz17YXJyYXlFcXVhbDpvLGFkZENsYXNzOnIsaGFzQ2xhc3M6aSxyZW1vdmVDbGFzczphLGdldENvb2tpZTp1LHJlbW92ZUNvb2tpZTpmLHNldENvb2tpZTpjLGdldE9TOnMsZ2V0RXhwbG9yZTpwLGdldFNjcm9sbFRvcDpkLG9mZnNldDpsLHNjcm9sbFRvOm0sc2V0U2Nyb2xsVG9wOnYsd2luZG93UmVzaXplOncsZGVib3VuY2U6Zyx0aHJvdHRsZTp5LGdldEtleU5hbWU6aCxkZWVwQ2xvbmU6eCxpc0VtcHR5T2JqZWN0OmIscmFuZG9tQ29sb3I6QyxyYW5kb21OdW06Tixpc0VtYWlsOlMsaXNJZENhcmQ6TSxpc1Bob25lTnVtOkUsaXNVcmw6RixkaWdpdFVwcGVyY2FzZTpELGlzU3VwcG9ydFdlYlA6SSxmb3JtYXRQYXNzVGltZTpULGZvcm1hdFJlbWFpblRpbWU6ayxwYXJzZVF1ZXJ5U3RyaW5nOlIsc3RyaW5nZnlRdWVyeVN0cmluZzpBfX0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7aWYoZT09PXQpcmV0dXJuITA7aWYoZS5sZW5ndGghPXQubGVuZ3RoKXJldHVybiExO2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7KytuKWlmKGVbbl0hPT10W25dKXJldHVybiExO3JldHVybiEwfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe3IoZSx0KXx8KGUuY2xhc3NOYW1lKz1cIiBcIit0KX12YXIgcj1uKDApO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe2lmKHIoZSx0KSl7dmFyIG49bmV3IFJlZ0V4cChcIihcXFxcc3xeKVwiK3QrXCIoXFxcXHN8JClcIik7ZS5jbGFzc05hbWU9ZS5jbGFzc05hbWUucmVwbGFjZShuLFwiIFwiKX19dmFyIHI9bigwKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD1kb2N1bWVudC5jb29raWUucmVwbGFjZSgvXFxzL2csXCJcIikuc3BsaXQoXCI7XCIpLG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIG89dFtuXS5zcGxpdChcIj1cIik7aWYob1swXT09ZSlyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KG9bMV0pfXJldHVyblwiXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUpe3IoZSxcIjFcIiwtMSl9dmFyIHI9bigxKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7dmFyIGU9XCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJ1c2VyQWdlbnRcImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpfHxcIlwiLHQ9KFwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwidmVuZG9yXCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci52ZW5kb3IudG9Mb3dlckNhc2UoKSxcIm5hdmlnYXRvclwiaW4gd2luZG93JiZcImFwcFZlcnNpb25cImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLmFwcFZlcnNpb24udG9Mb3dlckNhc2UoKXx8XCJcIik7cmV0dXJuL21hYy9pLnRlc3QodCk/XCJNYWNPU1hcIjovd2luL2kudGVzdCh0KT9cIndpbmRvd3NcIjovbGludXgvaS50ZXN0KHQpP1wibGludXhcIjooL2lwaG9uZS9pLnRlc3QoZSl8fC9pcGFkL2kudGVzdChlKXx8L2lwb2QvaS50ZXN0KGUpLC9hbmRyb2lkL2kudGVzdChlKT9cImFuZHJvaWRcIjovd2luL2kudGVzdCh0KSYmL3Bob25lL2kudGVzdChlKT9cIndpbmRvd3NQaG9uZVwiOnZvaWQgMCl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3ZhciBlLHQ9e30sbj1uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7cmV0dXJuKGU9bi5tYXRjaCgvcnY6KFtcXGQuXSspXFwpIGxpa2UgZ2Vja28vKSk/dC5pZT1lWzFdOihlPW4ubWF0Y2goL21zaWUgKFtcXGRcXC5dKykvKSk/dC5pZT1lWzFdOihlPW4ubWF0Y2goL2VkZ2VcXC8oW1xcZFxcLl0rKS8pKT90LmVkZ2U9ZVsxXTooZT1uLm1hdGNoKC9maXJlZm94XFwvKFtcXGRcXC5dKykvKSk/dC5maXJlZm94PWVbMV06KGU9bi5tYXRjaCgvKD86b3BlcmF8b3ByKS4oW1xcZFxcLl0rKS8pKT90Lm9wZXJhPWVbMV06KGU9bi5tYXRjaCgvY2hyb21lXFwvKFtcXGRcXC5dKykvKSk/dC5jaHJvbWU9ZVsxXTooZT1uLm1hdGNoKC92ZXJzaW9uXFwvKFtcXGRcXC5dKykuKnNhZmFyaS8pKSYmKHQuc2FmYXJpPWVbMV0pLHQuaWU/XCJJRTogXCIrdC5pZTp0LmVkZ2U/XCJFREdFOiBcIit0LmVkZ2U6dC5maXJlZm94P1wiRmlyZWZveDogXCIrdC5maXJlZm94OnQuY2hyb21lP1wiQ2hyb21lOiBcIit0LmNocm9tZTp0Lm9wZXJhP1wiT3BlcmE6IFwiK3Qub3BlcmE6dC5zYWZhcmk/XCJTYWZhcmk6IFwiK3Quc2FmYXJpOlwiVW5rb253blwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7Zm9yKHZhciB0PXtsZWZ0OjAsdG9wOjB9O2U7KXQubGVmdCs9ZS5vZmZzZXRMZWZ0LHQudG9wKz1lLm9mZnNldFRvcCxlPWUub2Zmc2V0UGFyZW50O3JldHVybiB0fWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe2lmKHQ8MClyZXR1cm4gdm9pZCBpKGUpO3ZhciBuPWUtcigpO2lmKDAhPT1uKXt2YXIgYT1uL3QqMTA7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7aWYoTWF0aC5hYnMoYSk+TWF0aC5hYnMobikpcmV0dXJuIHZvaWQgaShyKCkrbik7aShyKCkrYSksbj4wJiZyKCk+PWV8fG48MCYmcigpPD1lfHxvKGUsdC0xNil9KX19dmFyIHI9bigyKSxpPW4oMyk7IWZ1bmN0aW9uKCl7d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZX0oKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7dmFyIG49d2luZG93LmlubmVySGVpZ2h0O2U9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lOmZ1bmN0aW9uKCl7fSx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dDpmdW5jdGlvbigpe30sd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbigpe3ZhciBvPXdpbmRvdy5pbm5lckhlaWdodDtvPT09biYmZSgpLG88biYmdCgpfSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCxuKXtyZXR1cm4gdm9pZCAwPT09bj9yKGUsdCwhMSk6cihlLG4sITEhPT10KX12YXIgcj1uKDQpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuIG9bZV0/b1tlXTooY29uc29sZS5sb2coXCJVbmtub3cgS2V5KEtleSBDb2RlOlwiK2UrXCIpXCIpLFwiXCIpfXZhciBvPXs4OlwiQmFja3NwYWNlXCIsOTpcIlRhYlwiLDEzOlwiRW50ZXJcIiwxNjpcIlNoaWZ0XCIsMTc6XCJDdHJsXCIsMTg6XCJBbHRcIiwxOTpcIlBhdXNlXCIsMjA6XCJDYXBzIExvY2tcIiwyNzpcIkVzY2FwZVwiLDMyOlwiU3BhY2VcIiwzMzpcIlBhZ2UgVXBcIiwzNDpcIlBhZ2UgRG93blwiLDM1OlwiRW5kXCIsMzY6XCJIb21lXCIsMzc6XCJMZWZ0XCIsMzg6XCJVcFwiLDM5OlwiUmlnaHRcIiw0MDpcIkRvd25cIiw0MjpcIlByaW50IFNjcmVlblwiLDQ1OlwiSW5zZXJ0XCIsNDY6XCJEZWxldGVcIiw0ODpcIjBcIiw0OTpcIjFcIiw1MDpcIjJcIiw1MTpcIjNcIiw1MjpcIjRcIiw1MzpcIjVcIiw1NDpcIjZcIiw1NTpcIjdcIiw1NjpcIjhcIiw1NzpcIjlcIiw2NTpcIkFcIiw2NjpcIkJcIiw2NzpcIkNcIiw2ODpcIkRcIiw2OTpcIkVcIiw3MDpcIkZcIiw3MTpcIkdcIiw3MjpcIkhcIiw3MzpcIklcIiw3NDpcIkpcIiw3NTpcIktcIiw3NjpcIkxcIiw3NzpcIk1cIiw3ODpcIk5cIiw3OTpcIk9cIiw4MDpcIlBcIiw4MTpcIlFcIiw4MjpcIlJcIiw4MzpcIlNcIiw4NDpcIlRcIiw4NTpcIlVcIiw4NjpcIlZcIiw4NzpcIldcIiw4ODpcIlhcIiw4OTpcIllcIiw5MDpcIlpcIiw5MTpcIldpbmRvd3NcIiw5MzpcIlJpZ2h0IENsaWNrXCIsOTY6XCJOdW1wYWQgMFwiLDk3OlwiTnVtcGFkIDFcIiw5ODpcIk51bXBhZCAyXCIsOTk6XCJOdW1wYWQgM1wiLDEwMDpcIk51bXBhZCA0XCIsMTAxOlwiTnVtcGFkIDVcIiwxMDI6XCJOdW1wYWQgNlwiLDEwMzpcIk51bXBhZCA3XCIsMTA0OlwiTnVtcGFkIDhcIiwxMDU6XCJOdW1wYWQgOVwiLDEwNjpcIk51bXBhZCAqXCIsMTA3OlwiTnVtcGFkICtcIiwxMDk6XCJOdW1wYWQgLVwiLDExMDpcIk51bXBhZCAuXCIsMTExOlwiTnVtcGFkIC9cIiwxMTI6XCJGMVwiLDExMzpcIkYyXCIsMTE0OlwiRjNcIiwxMTU6XCJGNFwiLDExNjpcIkY1XCIsMTE3OlwiRjZcIiwxMTg6XCJGN1wiLDExOTpcIkY4XCIsMTIwOlwiRjlcIiwxMjE6XCJGMTBcIiwxMjI6XCJGMTFcIiwxMjM6XCJGMTJcIiwxNDQ6XCJOdW0gTG9ja1wiLDE0NTpcIlNjcm9sbCBMb2NrXCIsMTgyOlwiTXkgQ29tcHV0ZXJcIiwxODM6XCJNeSBDYWxjdWxhdG9yXCIsMTg2OlwiO1wiLDE4NzpcIj1cIiwxODg6XCIsXCIsMTg5OlwiLVwiLDE5MDpcIi5cIiwxOTE6XCIvXCIsMTkyOlwiYFwiLDIxOTpcIltcIiwyMjA6XCJcXFxcXCIsMjIxOlwiXVwiLDIyMjpcIidcIn07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdDtpZihudWxsPT1lfHxcIm9iamVjdFwiIT0odm9pZCAwPT09ZT9cInVuZGVmaW5lZFwiOm8oZSkpKXJldHVybiBlO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiB0PW5ldyBEYXRlLHQuc2V0VGltZShlLmdldFRpbWUoKSksdDtpZihlIGluc3RhbmNlb2YgQXJyYXkpe3Q9W107Zm9yKHZhciByPTAsaT1lLmxlbmd0aDtyPGk7cisrKXRbcl09bihlW3JdKTtyZXR1cm4gdH1pZihlIGluc3RhbmNlb2YgT2JqZWN0KXt0PXt9O2Zvcih2YXIgYSBpbiBlKWUuaGFzT3duUHJvcGVydHkoYSkmJih0W2FdPW4oZVthXSkpO3JldHVybiB0fXRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBjb3B5IHZhbHVlcyEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKX12YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiEoIWV8fFwib2JqZWN0XCIhPT0odm9pZCAwPT09ZT9cInVuZGVmaW5lZFwiOm8oZSkpfHxBcnJheS5pc0FycmF5KGUpKSYmIU9iamVjdC5rZXlzKGUpLmxlbmd0aH12YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuXCIjXCIrKFwiMDAwMDBcIisoMTY3NzcyMTYqTWF0aC5yYW5kb20oKTw8MCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3JldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHQtZSsxKSkrZX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9cXHcrKFstKy5dXFx3KykqQFxcdysoWy0uXVxcdyspKlxcLlxcdysoWy0uXVxcdyspKi8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9eKF5bMS05XVxcZHs3fSgoMFxcZCl8KDFbMC0yXSkpKChbMHwxfDJdXFxkKXwzWzAtMV0pXFxkezN9JCl8KF5bMS05XVxcZHs1fVsxLTldXFxkezN9KCgwXFxkKXwoMVswLTJdKSkoKFswfDF8Ml1cXGQpfDNbMC0xXSkoKFxcZHs0fSl8XFxkezN9W1h4XSkkKSQvLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXigwfDg2fDE3OTUxKT8oMTNbMC05XXwxNVswMTIzNTY3ODldfDE3WzY3OF18MThbMC05XXwxNFs1N10pWzAtOV17OH0kLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL1stYS16QS1aMC05QDolLl9cXCt+Iz1dezIsMjU2fVxcLlthLXpdezIsNn1cXGIoWy1hLXpBLVowLTlAOiVfXFwrLn4jPyZcXC9cXC89XSopL2kudGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PVtcIuinklwiLFwi5YiGXCJdLG49W1wi6Zu2XCIsXCLlo7lcIixcIui0sFwiLFwi5Y+BXCIsXCLogoZcIixcIuS8jVwiLFwi6ZmGXCIsXCLmn5JcIixcIuaNjFwiLFwi546WXCJdLG89W1tcIuWFg1wiLFwi5LiHXCIsXCLkur9cIl0sW1wiXCIsXCLmi75cIixcIuS9sFwiLFwi5LufXCJdXSxyPWU8MD9cIuasoFwiOlwiXCI7ZT1NYXRoLmFicyhlKTtmb3IodmFyIGk9XCJcIixhPTA7YTx0Lmxlbmd0aDthKyspaSs9KG5bTWF0aC5mbG9vcigxMCplKk1hdGgucG93KDEwLGEpKSUxMF0rdFthXSkucmVwbGFjZSgv6Zu2Li8sXCJcIik7aT1pfHxcIuaVtFwiLGU9TWF0aC5mbG9vcihlKTtmb3IodmFyIGE9MDthPG9bMF0ubGVuZ3RoJiZlPjA7YSsrKXtmb3IodmFyIHU9XCJcIixmPTA7ZjxvWzFdLmxlbmd0aCYmZT4wO2YrKyl1PW5bZSUxMF0rb1sxXVtmXSt1LGU9TWF0aC5mbG9vcihlLzEwKTtpPXUucmVwbGFjZSgvKOmbti4pKumbtiQvLFwiXCIpLnJlcGxhY2UoL14kLyxcIumbtlwiKStvWzBdW2FdK2l9cmV0dXJuIHIraS5yZXBsYWNlKC8o6Zu2Likq6Zu25YWDLyxcIuWFg1wiKS5yZXBsYWNlKC8o6Zu2LikrL2csXCLpm7ZcIikucmVwbGFjZSgvXuaVtCQvLFwi6Zu25YWD5pW0XCIpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm4hIVtdLm1hcCYmMD09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIpLmluZGV4T2YoXCJkYXRhOmltYWdlL3dlYnBcIil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1EYXRlLnBhcnNlKG5ldyBEYXRlKSxuPXQtZSxvPXBhcnNlSW50KG4vODY0ZTUpLHI9cGFyc2VJbnQobi8zNmU1KSxpPXBhcnNlSW50KG4vNmU0KSxhPXBhcnNlSW50KG8vMzApLHU9cGFyc2VJbnQoYS8xMik7cmV0dXJuIHU/dStcIuW5tOWJjVwiOmE/YStcIuS4quaciOWJjVwiOm8/bytcIuWkqeWJjVwiOnI/citcIuWwj+aXtuWJjVwiOmk/aStcIuWIhumSn+WJjVwiOlwi5Yia5YiaXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1uZXcgRGF0ZSxuPW5ldyBEYXRlKGUpLG89bi5nZXRUaW1lKCktdC5nZXRUaW1lKCkscj0wLGk9MCxhPTAsdT0wO3JldHVybiBvPj0wJiYocj1NYXRoLmZsb29yKG8vMWUzLzM2MDAvMjQpLGk9TWF0aC5mbG9vcihvLzFlMy82MC82MCUyNCksYT1NYXRoLmZsb29yKG8vMWUzLzYwJTYwKSx1PU1hdGguZmxvb3Ioby8xZTMlNjApKSxyK1wi5aSpIFwiK2krXCLlsI/ml7YgXCIrYStcIuWIhumSnyBcIit1K1wi56eSXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtlPW51bGw9PWU/d2luZG93LmxvY2F0aW9uLmhyZWY6ZTt2YXIgdD1lLnN1YnN0cmluZyhlLmxhc3RJbmRleE9mKFwiP1wiKSsxKTtyZXR1cm4gdD9KU09OLnBhcnNlKCd7XCInK2RlY29kZVVSSUNvbXBvbmVudCh0KS5yZXBsYWNlKC9cIi9nLCdcXFxcXCInKS5yZXBsYWNlKC8mL2csJ1wiLFwiJykucmVwbGFjZSgvPS9nLCdcIjpcIicpKydcIn0nKTp7fX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2lmKCFlKXJldHVyblwiXCI7dmFyIHQ9W107Zm9yKHZhciBuIGluIGUpe3ZhciBvPWVbbl07aWYobyBpbnN0YW5jZW9mIEFycmF5KWZvcih2YXIgcj0wO3I8by5sZW5ndGg7KytyKXQucHVzaChlbmNvZGVVUklDb21wb25lbnQobitcIltcIityK1wiXVwiKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQob1tyXSkpO2Vsc2UgdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQoZVtuXSkpfXJldHVybiB0LmpvaW4oXCImXCIpfWUuZXhwb3J0cz1ufV0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvb3V0aWxzL21pbi9vdXRpbHMubWluLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9