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
    var peopleNum = (0, _outils.randomNum)(5, 15);
    for (var i = 0; i < peopleNum; i++) {
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
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkMWYzYzYzNzFhMTI0MjdmNzM4YiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vY2tqcy9kaXN0L21vY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyJdLCJuYW1lcyI6WyIkYXBwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwib3B0aW9ucyIsImNvbnRhaW5lciIsInBlb3BsZSIsImJhY2tncm91bmRJbWFnZSIsInBlb3BsZUltYWdlIiwiYXBwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiaWQiLCJwZW9wbGVOdW0iLCJpIiwieCIsInkiLCJwdXNoIiwiaW1nSW5kZXgiLCJuYW1lIiwiY25hbWUiLCJjb2xvciIsIm1vdmUiLCIkc2hvdyIsInNob3dQYXRoIiwiaW5uZXJIVE1MIiwiJHJ1bGVyIiwiaW1nU2NhbGUiLCIkcG9pbnRlclgiLCIkcG9pbnRlclkiLCJwb2ludGVyWCIsInBvaW50ZXJZIiwiJG1lYXN1cmUiLCJtZWFzdXJlIiwiJG1lYXN1cmVDYW5jZWwiLCJ1cGRhdGVDYW52YXMiLCJtb2NrU2VydmVyMSIsInNldEludGVydmFsIiwiZm9yRWFjaCIsInBlcnNvbiIsImluZGV4IiwibGVuZ3RoIiwibGFzdCIsIm5leHQiLCJzaGlmdCIsIm1vY2tTZXJ2ZXIyIiwibW9ja1NlcnZlcjMiLCJkZWZhdWx0T3B0aW9ucyIsInVuZGVmaW5lZCIsImltZ1giLCJpbWdZIiwiYW5pbWF0aW9uIiwiaXNNZWFzdXJpbmciLCJpc01vdmVNYXAiLCJBcHAiLCJpc1Nob3dQYXRoIiwicmVuZGVyIiwibG9hZEJnSW1nIiwibG9hZFBlb3BsZUltZyIsImRyYXdNb3ZlIiwiYWRkRXZlbnQiLCJydW4iLCJiaW5kTWVhc3VyZUV2ZW50IiwiY29udGV4dCIsImRyYXdNYXAiLCJkcmF3UGVvcGxlIiwiY2xlYXJDYW52YXMiLCJtb3ZlQ2FudmFzIiwiZ2V0Q29udGV4dCIsIm1lYXN1cmVDYW52YXMiLCJkcmF3TWVhc3VyZSIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImxpbmVIZWlnaHQiLCJvdmVyZmxvdyIsImJhY2tncm91bmRDb2xvciIsImJnQ29sb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJtYXBDYW52YXMiLCJzZXRBdHRyaWJ1dGUiLCJjbG9uZU5vZGUiLCJwZW9wbGVDYW52YXMiLCIkY29udGFpbmVyIiwiY2xpY2tUaW1lIiwiY2xpY2tOdW0iLCJtb3ZlTnVtIiwibW91c2Vtb3ZlTGlzdGVuZXIiLCJjdXJzb3IiLCJwb3MiLCJ3aW5kb3dUb0NhbnZhcyIsImV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJtb3ZlQXJyIiwibGFzdFBvaW50IiwiY2xpY2tMaXN0ZW5lciIsImN1cnJlbnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJwb3AiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib2JqIiwiYXJyIiwianVkZ2VCb3JkZXIiLCJiZ0ltZyIsIndoZWVsRGVsdGEiLCJkZWx0YVkiLCJ0aGF0IiwicG9zMSIsIm1vdXNldXBMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJzaG93SW5mbyIsImNhbnZhcyIsImJib3giLCJpbWciLCJJbWFnZSIsInNyYyIsImltZ0FyciIsIkFycmF5IiwiaXNBcnJheSIsImxvYWROdW0iLCJtYXAiLCJkcmF3SW1hZ2UiLCJjdXJyZW50IiwicGVvcGxlSW1nV2lkdGgiLCJwZW9wbGVJbWdIZWlnaHQiLCJ0b3RhbExlbmd0aCIsInRleHQiLCJ0b0ZpeGVkIiwiY2xlYXJSZWN0Iiwic3RlcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInZhbCIsImRyYXdMaW5lIiwiZHJhd0NpcmNsZSIsImRyYXdNZWFzdXJlSW5mbyIsImRyYXdQZW9wbGVJbmZvIiwiY2FsY3VsYXRlTGVuZ3RoIiwiZGlyZWN0UGVvcGxlIiwiY3R4IiwieDEiLCJ5MSIsIngyIiwieTIiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImNsb3NlUGF0aCIsInJhZGl1cyIsImFyYyIsImZpbGxTdHlsZSIsImZpbGwiLCJmaWxsUmVjdCIsInN0cm9rZVJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJpbmZvIiwiTWF0aCIsInNxcnQiLCJwb3ciLCJyIiwicGVvcGxlSW5kZXgiLCJwZW9wbGVQb3MiLCJwb2ludExlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0Es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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0JBQW9CLEdBQUcsb0JBQW9CO0FBQ2hFO0FBQ0Esd0JBQXdCLDZCQUE2QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxZQUFZO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixNQUFNO0FBQ047QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0IsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBLHVCQUF1QixjQUFjO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUIsNEJBQTRCO0FBQzVCLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0Isc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBQzVCOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpQkFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsa0JBQWtCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxZQUFZO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxXQUFXO0FBQzlELG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsWUFBWTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsV0FBVztBQUM5Qyx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxXQUFXO0FBQzlDLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFdBQVc7QUFDOUMsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVUsU0FBUyxXQUFXLGlDQUFpQyxXQUFXO0FBQzFFO0FBQ0EsVUFBVSxVQUFVLFlBQVk7QUFDaEM7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxLQUFLO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsdUJBQXVCLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxN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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUFjLDRHQUE0RyxjQUFjLGlCQUFpQixXQUFXLHFFQUFxRSx5QkFBeUIsWUFBWSxtQkFBbUIsS0FBSyxpQkFBaUIsbUJBQW1CLDJDQUEyQyxzREFBc0QsNkVBQTZFLFlBQVksZUFBZSxhQUFhLHVHQUF1RyxZQUFZLGVBQWUsY0FBYyw0SEFBNEgsNERBQTRELFlBQVksZUFBZSxjQUFjLHVFQUF1RSxzSkFBc0osWUFBWSxlQUFlLGNBQWMsaUNBQWlDLHdDQUF3QyxzQkFBc0Isd0ZBQXdGLE1BQU0sWUFBWSxlQUFlLGNBQWMsZUFBZSxTQUFTLGdCQUFnQixXQUFXLGtDQUFrQyxXQUFXLHlFQUF5RSxnRUFBZ0UsbUJBQW1CLFlBQVksR0FBRyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1bmRsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJidW5kbGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMWYzYzYzNzFhMTI0MjdmNzM4YiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4zJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBBcHAgZnJvbSAnLi9hcHAuanMnXHJcbmltcG9ydCB7XHJcbiAgICBSYW5kb21cclxufSBmcm9tICdtb2NranMnXHJcbmltcG9ydCB7XHJcbiAgICByYW5kb21OdW0sXHJcbiAgICByYW5kb21Db2xvcixcclxuICAgIGFkZENsYXNzLFxyXG4gICAgcmVtb3ZlQ2xhc3MsXHJcbiAgICBkZWVwQ2xvbmVcclxufSBmcm9tICdvdXRpbHMnO1xyXG5jb25zdCAkYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpXHJcblxyXG5jb25zdCBvcHRpb25zID0ge1xyXG4gICAgY29udGFpbmVyOiAkYXBwLFxyXG4gICAgcGVvcGxlOiBbXSxcclxuICAgIGJhY2tncm91bmRJbWFnZTogJy4vYXNzZXJ0L2ltYWdlcy9tYXAuanBnJyxcclxuICAgIHBlb3BsZUltYWdlOiBbJy4vYXNzZXJ0L2ltYWdlcy9wZW9wbGUtMS5wbmcnLCAnLi9hc3NlcnQvaW1hZ2VzL3Blb3BsZS0yLnBuZycsICcuL2Fzc2VydC9pbWFnZXMvcGVvcGxlLTMucG5nJ11cclxufVxyXG5sZXQgYXBwID0gbmV3IEFwcChvcHRpb25zKVxyXG5cclxuLy8gZnVuY3Rpb24gbW9ja1Blb3BsZVNlcnZlcigpIHtcclxuLy8gICAgIGxldCBwZW9wbGUgPSBbXVxyXG4vLyAgICAgbGV0IHtcclxuLy8gICAgICAgICB3aWR0aCxcclxuLy8gICAgICAgICBoZWlnaHRcclxuLy8gICAgIH0gPSAkYXBwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4vLyAgICAgbGV0IHBlb3BsZU51bSA9IHJhbmRvbU51bSg1LCAxNSlcclxuLy8gICAgIC8vIOa3u+WKoOS6ulxyXG4vLyAgICAgbGV0IGlkID0gMTAwMFxyXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwZW9wbGVOdW07IGkrKykge1xyXG4vLyAgICAgICAgIGxldCB4ID0gcmFuZG9tTnVtKDAsIHdpZHRoKVxyXG4vLyAgICAgICAgIGxldCB5ID0gcmFuZG9tTnVtKDAsIGhlaWdodClcclxuLy8gICAgICAgICBwZW9wbGUucHVzaCh7XHJcbi8vICAgICAgICAgICAgIGlkOiBpZCsrLFxyXG4vLyAgICAgICAgICAgICBpbWdJbmRleDogcmFuZG9tTnVtKDAsIDIpLFxyXG4vLyAgICAgICAgICAgICBuYW1lOiBSYW5kb20uY25hbWUoKSxcclxuLy8gICAgICAgICAgICAgY29sb3I6IHJhbmRvbUNvbG9yKCksXHJcbi8vICAgICAgICAgICAgIG1vdmU6IFt7XHJcbi8vICAgICAgICAgICAgICAgICB4LFxyXG4vLyAgICAgICAgICAgICAgICAgeVxyXG4vLyAgICAgICAgICAgICB9XVxyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9XHJcbi8vICAgICAvLyDmqKHmi5/ov5Dliqjovajov7lcclxuLy8gICAgIHBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgbGV0IG1vdmVOdW0gPSByYW5kb21OdW0oNTAsIDEwMClcclxuLy8gICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVOdW07IGkrKykge1xyXG4vLyAgICAgICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlW3BlcnNvbi5tb3ZlLmxlbmd0aCAtIDFdXHJcbi8vICAgICAgICAgICAgIGxldCBuZXh0ID0ge1xyXG4vLyAgICAgICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC0xMiwgMTIpLFxyXG4vLyAgICAgICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC0xMiwgMTIpXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gICAgIHJldHVybiBwZW9wbGVcclxuLy8gfVxyXG4vLyBsZXQgbW9ja1Blb3BsZSA9IG1vY2tQZW9wbGVTZXJ2ZXIoKVxyXG4vLyDmt7vliqDmnLrlmajkurpcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfYWRkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblxyXG4gICAgLy8gYXBwLm9wdGlvbnMucGVvcGxlID0gbW9ja1Blb3BsZVxyXG4gICAgbGV0IHtcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHRcclxuICAgIH0gPSAkYXBwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IGlkID0gMTAwMFxyXG4gICAgbGV0IHBlb3BsZU51bSA9IHJhbmRvbU51bSg1LCAxNSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGVvcGxlTnVtOyBpKyspIHtcclxuICAgICAgICBsZXQgeCA9IHJhbmRvbU51bSgwLCB3aWR0aClcclxuICAgICAgICBsZXQgeSA9IHJhbmRvbU51bSgwLCBoZWlnaHQpXHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogaWQrKyxcclxuICAgICAgICAgICAgaW1nSW5kZXg6IHJhbmRvbU51bSgwLCAyKSxcclxuICAgICAgICAgICAgbmFtZTogUmFuZG9tLmNuYW1lKCksXHJcbiAgICAgICAgICAgIGNvbG9yOiByYW5kb21Db2xvcigpLFxyXG4gICAgICAgICAgICBtb3ZlOiBbe1xyXG4gICAgICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgICAgIHlcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmHjee7mOi9qOi/ue+8jOS6ulxyXG4gICAgLy8gYXBwLnVwZGF0ZUNhbnZhcygncGVvcGxlJylcclxuICAgIC8vIGFwcC51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG59KVxyXG5cclxuLy8g5piv5ZCm5bGV56S66L+Q5Yqo6L2o6L+5XHJcbi8vIGxldCBtb2NrU2VydmVyNFxyXG5sZXQgJHNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9zaG93Jyk7XHJcbiRzaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfYWRkJykuY2xpY2soKVxyXG4gICAgLy8gY2xlYXJJbnRlcnZhbChtb2NrU2VydmVyNClcclxuICAgIGFwcC5zaG93UGF0aCA9ICFhcHAuc2hvd1BhdGhcclxuICAgIGlmIChhcHAuc2hvd1BhdGggPT09IGZhbHNlKSB7XHJcbiAgICAgICAgJHNob3cuaW5uZXJIVE1MID0gJ+i/kOWKqOi9qOi/uSdcclxuICAgICAgICByZW1vdmVDbGFzcygkc2hvdywgJ2J0bi13YXJuaW5nJylcclxuICAgICAgICBhZGRDbGFzcygkc2hvdywgJ2J0bi1wcmltYXJ5JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHNob3cuaW5uZXJIVE1MID0gJ+WFs+mXrei9qOi/uSdcclxuICAgICAgICByZW1vdmVDbGFzcygkc2hvdywgJ2J0bi1wcmltYXJ5JylcclxuICAgICAgICBhZGRDbGFzcygkc2hvdywgJ2J0bi13YXJuaW5nJylcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgcGVvcGxlID0gZGVlcENsb25lKGFwcC5vcHRpb25zLnBlb3BsZSk7XHJcbiAgICAvLyBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgIC8vICAgICBhcnJheVtpbmRleF0ubW92ZSA9IFtdXHJcbiAgICAvLyB9KVxyXG4gICAgLy8gbW9ja1NlcnZlcjQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAvLyAgICAgcGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGxldCBwb2ludCA9IGFycmF5W2luZGV4XS5tb3ZlLnNoaWZ0KClcclxuICAgIC8vICAgICAgICAgaWYgKHBvaW50ID09PSB1bmRlZmluZWQpIHJldHVyblxyXG4gICAgLy8gICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChwb2ludClcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfSwgMjAwKVxyXG4gICAgLy8gYXBwLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbn0pXHJcblxyXG4vLyDmr5TkvovlsLpcclxuY29uc3QgJHJ1bGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfcnVsZXInKVxyXG4kcnVsZXIuaW5uZXJIVE1MID0gYHgke2FwcC5vcHRpb25zLmltZ1NjYWxlfSDlgI1gXHJcbiRhcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsICgpID0+IHtcclxuICAgICRydWxlci5pbm5lckhUTUwgPSBgeCR7YXBwLm9wdGlvbnMuaW1nU2NhbGV9IOWAjWBcclxufSlcclxuXHJcbi8vIOm8oOagh+WdkOagh1xyXG5jb25zdCAkcG9pbnRlclggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9wb2ludGVyLXgnKVxyXG5jb25zdCAkcG9pbnRlclkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9wb2ludGVyLXknKVxyXG4kYXBwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcclxuICAgICRwb2ludGVyWC5pbm5lckhUTUwgPSBgWDoke2FwcC5vcHRpb25zLnBvaW50ZXJYfWBcclxuICAgICRwb2ludGVyWS5pbm5lckhUTUwgPSBgWToke2FwcC5vcHRpb25zLnBvaW50ZXJZfWBcclxufSlcclxuXHJcblxyXG5jb25zdCAkbWVhc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX21lYXN1cmUnKVxyXG4kbWVhc3VyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFwcC5tZWFzdXJlKClcclxufSlcclxuY29uc3QgJG1lYXN1cmVDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9tZWFzdXJlLWNhbmNlbCcpXHJcbiRtZWFzdXJlQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMubWVhc3VyZSA9IFtdXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtZWFzdXJlJylcclxufSlcclxuXHJcbi8vIOaVsOaNruaooeaLn+WZqFxyXG5sZXQgbW9ja1NlcnZlcjEgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4gICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTUsIDUpLFxyXG4gICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTUsIDUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDEwMCkgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnNoaWZ0KClcclxuICAgIH0pO1xyXG59LCA1MDApXHJcbmxldCBtb2NrU2VydmVyMiA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4gICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbiAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtNSwgNSksXHJcbiAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtNSwgNSlcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuICAgICAgICBpZiAobGVuZ3RoID4gMTAwKSBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUuc2hpZnQoKVxyXG4gICAgfSk7XHJcbn0sIDMwMClcclxubGV0IG1vY2tTZXJ2ZXIzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbiAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC01LCA1KSxcclxuICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC01LCA1KVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgICAgIGlmIChsZW5ndGggPiAxMDApIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5zaGlmdCgpXHJcbiAgICB9KTtcclxufSwgMTAwMClcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQge1xyXG4gICAgZHJhd0NpcmNsZSxcclxuICAgIGRyYXdMaW5lLFxyXG4gICAgZHJhd01lYXN1cmVJbmZvLFxyXG4gICAgZHJhd1Blb3BsZUluZm8sXHJcbiAgICBjYWxjdWxhdGVMZW5ndGgsXHJcbiAgICBkaXJlY3RQZW9wbGVcclxufSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBjb250YWluZXI6IG51bGwsIC8v5Yib5bu6Y2FudmFz55qE5a655Zmo77yM5aaC5p6c5LiN5aGr77yM6Ieq5Yqo5ZyoIGJvZHkg5LiK5Yib5bu66KaG55uW5YWo5bGP55qE5bGCXHJcbiAgICBwZW9wbGU6IFtdLCAvLyDkurpcclxuICAgIG1lYXN1cmU6IFtdLCAvLyDmtYvot53orrDlvZVcclxuICAgIGJhY2tncm91bmRJbWFnZTogdW5kZWZpbmVkLCAvLyDog4zmma/lm75cclxuICAgIGltZ1NjYWxlOiAxLCAvLyDpu5jorqTmlL7lpKflgI3mlbBcclxuICAgIGltZ1g6IDAsIC8vIOiDjOaZr+WbvuaLkmNhbnZhc+WOn+eCuVjmlrnlkJHot53nprtcclxuICAgIGltZ1k6IDAsIC8vIOiDjOaZr+WbvuaLkmNhbnZhc+WOn+eCuVnmlrnlkJHot53nprtcclxuICAgIHBvaW50ZXJYOiAwLFxyXG4gICAgcG9pbnRlclk6IDAsXHJcbiAgICBhbmltYXRpb246IHVuZGVmaW5lZCxcclxuICAgIGlzTWVhc3VyaW5nOiBmYWxzZSAvL+ato+WcqOa1i+i3nVxyXG59O1xyXG5cclxubGV0IGlzTW92ZU1hcCA9IGZhbHNlIC8vIOato+WcqOaLluaLveenu+WKqOWcsOWbvlxyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dQYXRoID0gZmFsc2U7IC8vIOaYr+WQpuaYvuekuiDov5Dliqjovajov7lcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubG9hZEJnSW1nKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUGVvcGxlSW1nKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICovXHJcbiAgICBzZXQgc2hvd1BhdGgodmFsKSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dQYXRoID0gdmFsXHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd1BhdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTaG93UGF0aFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQGRlc2Mg5byA5aeL5rWL6LedXHJcbiAgICAgKi9cclxuICAgIG1lYXN1cmUoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5pc1Nob3dQYXRoID0gdmFsXHJcbiAgICAgICAgLy8g57uR5a6a5rWL6Led5LqL5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc01lYXN1cmluZyA9PT0gdHJ1ZSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5iaW5kTWVhc3VyZUV2ZW50KClcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaXNNZWFzdXJpbmcgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHVibGljIFxyXG4gICAgICogQGRlc2Mg5Y2V5qyh6YeN57uYY2FudmFzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUNhbnZhcyhjb250ZXh0KSB7XHJcbiAgICAgICAgLy8g6YeN57uYQ2FudmFzXHJcbiAgICAgICAgc3dpdGNoIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwZW9wbGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbW92ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21lYXN1cmUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01lYXN1cmUoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJnQ29sb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgLy/nlLvlnLDlm77nmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IG1hcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWFwQ2FudmFzLnN0eWxlLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6ICcwJyxcclxuICAgICAgICAgICAgbGVmdDogJzAnLFxyXG4gICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXBDYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGAke3dpZHRofXB4YClcclxuICAgICAgICBtYXBDYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKVxyXG5cclxuICAgICAgICAvL+eUu+i9qOi/uee6v+adoeeahCBjYW52YXNcclxuICAgICAgICBsZXQgbW92ZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v55S75Lq655qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBwZW9wbGVDYW52YXMgPSBtYXBDYW52YXMuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIC8vIOa1i+i3nSBjYW52YXNcclxuICAgICAgICBsZXQgbWVhc3VyZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYXBDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtb3ZlQ2FudmFzKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGVvcGxlQ2FudmFzKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVhc3VyZUNhbnZhcyk7XHJcblxyXG4gICAgICAgIHRoaXMubWFwQ2FudmFzID0gbWFwQ2FudmFzO1xyXG4gICAgICAgIHRoaXMubW92ZUNhbnZhcyA9IG1vdmVDYW52YXM7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVDYW52YXMgPSBwZW9wbGVDYW52YXM7XHJcbiAgICAgICAgdGhpcy5tZWFzdXJlQ2FudmFzID0gbWVhc3VyZUNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBiaW5kTWVhc3VyZUV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQgY2xpY2tUaW1lID0gMDtcclxuICAgICAgICBsZXQgY2xpY2tOdW0gPSAwO1xyXG4gICAgICAgIGxldCBtb3ZlTnVtID0gMDtcclxuICAgICAgICBsZXQgbW91c2Vtb3ZlTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIHBvcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IChwb3MueCAtIHRoaXMub3B0aW9ucy5pbWdYKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSxcclxuICAgICAgICAgICAgICAgIHk6IChwb3MueSAtIHRoaXMub3B0aW9ucy5pbWdZKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOacqumAieaLqeesrOS4gOS4queCue+8jOebtOaOpXJldHVyblxyXG4gICAgICAgICAgICBpZiAoY2xpY2tOdW0gPT09IDApIHJldHVyblxyXG4gICAgICAgICAgICBsZXQgbW92ZUFyciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW3RoaXMub3B0aW9ucy5tZWFzdXJlLmxlbmd0aCAtIDFdLm1vdmVcclxuICAgICAgICAgICAgbGV0IGxhc3RQb2ludCA9IG1vdmVBcnJbbW92ZUFyci5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICBpZiAobW92ZU51bSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbW92ZUFyci5wdXNoKHBvcylcclxuICAgICAgICAgICAgICAgIG1vdmVOdW0gPSAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlQXJyW21vdmVBcnIubGVuZ3RoIC0gMV0gPSBwb3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2xpY2tMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzTW92ZU1hcCkgcmV0dXJuXHJcbiAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZSAtIGNsaWNrVGltZSA8PSAzMDAgJiYgY3VycmVudFRpbWUgLSBjbGlja1RpbWUgPj0gMTUwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlj4zlh7vnu5PmnZ/mtYvot51cclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlQXJyID0gdGhpcy5vcHRpb25zLm1lYXN1cmVbdGhpcy5vcHRpb25zLm1lYXN1cmUubGVuZ3RoIC0gMV0ubW92ZVxyXG4gICAgICAgICAgICAgICAgbW92ZUFyci5wb3AoKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlzTWVhc3VyaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNsaWNrTnVtID0gMFxyXG4gICAgICAgICAgICAgICAgY2xpY2tUaW1lID0gMFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIC8vIOWNleWHu+W8gOWni+a1i+i3nVxyXG4gICAgICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IChwb3MueCAtIHRoaXMub3B0aW9ucy5pbWdYKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICB5OiAocG9zLnkgLSB0aGlzLm9wdGlvbnMuaW1nWSkgLyB0aGlzLm9wdGlvbnMuaW1nU2NhbGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjbGlja051bSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOesrOS4gOasoeWNleWHu1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmU6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tZWFzdXJlLnB1c2gob2JqKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrTnVtKytcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSa5qyh6YCJ54K5XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5vcHRpb25zLm1lYXN1cmUubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW2luZGV4IC0gMV0ubW92ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UG9pbnQgPSBhcnJbYXJyLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9zLnksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHBvcylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xpY2tUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB9XHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrTGlzdGVuZXIpXHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgIH1cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQganVkZ2VCb3JkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOi+ueeVjOajgOa1i1xyXG4gICAgICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1ggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWSAtIGhlaWdodCA8IC10aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAtdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdYIC0gd2lkdGggPCAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWcsOWbvue8qeaUvlxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgd2hlZWxEZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgPyBldmVudC53aGVlbERlbHRhIDogKGV2ZW50LmRlbHRhWSAqICgtNDApKTtcclxuICAgICAgICAgICAgaWYgKHdoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlL7lpKdcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICogMiA8PSB0aGlzLmJnSW1nLndpZHRoICogOCB8fCB0aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqIDIgPD0gdGhpcy5iZ0ltZy5oZWlnaHQgKiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pS+5aSn6L6555WM5Yik5patXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1NjYWxlICo9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWCAqIDIgLSBwb3MueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMiAtIHBvcy55O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g57yp5bCPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvIDIgPj0gd2lkdGggfHwgdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLyAyID49IGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOe8qeWwj+i+ueeVjOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gdGhpcy5vcHRpb25zLmltZ1ggKiAwLjUgKyBwb3MueCAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMC41ICsgcG9zLnkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAganVkZ2VCb3JkZXIoKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgIC8vIOmHjee7mOa1i+i3neWbvuWxglxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNZWFzdXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01vdmUoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDlnLDlm77np7vliqhcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgbGV0IG1vdXNlbW92ZUxpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcIm1vdmVcIjtcclxuICAgICAgICAgICAgICAgIGlzTW92ZU1hcCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGxldCBwb3MxID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBvczEueCAtIHBvcy54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwb3MxLnkgLSBwb3MueTtcclxuICAgICAgICAgICAgICAgIHBvcyA9IHBvczE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCArPSB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgKz0geTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDph43nu5jmtYvot53lm77lsYJcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNZWFzdXJlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtb3VzZXVwTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBqdWRnZUJvcmRlcigpXHJcbiAgICAgICAgICAgICAgICAvLyDlsY/olL3np7vliqjlnLDlm77lkI7op6blj5HnmoTmtYvot53ngrnlh7vkuovku7ZcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZU1hcCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCAyMDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8g6YeN57uY5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDpvKDmoIfmjIfpkojlnZDmoIdcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcclxuICAgICAgICAgICAgLy8g5a6e5pe26byg5qCH5L2N572uXHJcbiAgICAgICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWCA9IHBvcy54XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWSA9IGhlaWdodCAtIHBvcy55XHJcblxyXG5cclxuICAgICAgICAgICAgLy8g6byg5qCH56e75Yqo5pi+56S65Lq654mp5L+h5oGvXHJcblxyXG4gICAgICAgICAgICAvLyDovazmjaLkuLrlt6bkuIvop5LlnZDmoIfns7tcclxuICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgeDogKHBvcy54IC0gdGhpcy5vcHRpb25zLmltZ1gpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlLFxyXG4gICAgICAgICAgICAgICAgeTogaGVpZ2h0IC0gKHBvcy55IC0gdGhpcy5vcHRpb25zLmltZ1kpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGksIHBlb3BsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGVyc29uLnNob3dJbmZvID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gZGlyZWN0UGVvcGxlKHBvcywgdGhpcy5vcHRpb25zLnBlb3BsZSwgMTAgLyB0aGlzLm9wdGlvbnMuaW1nU2NhbGUpXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBlb3BsZVtpbmRleF0uc2hvd0luZm8gPSB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3dUb0NhbnZhcyhjYW52YXMsIHgsIHkpIHtcclxuICAgICAgICBsZXQgYmJveCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiB4IC0gYmJveC5sZWZ0IC0gKGJib3gud2lkdGggLSBjYW52YXMud2lkdGgpIC8gMixcclxuICAgICAgICAgICAgeTogeSAtIGJib3gudG9wIC0gKGJib3guaGVpZ2h0IC0gY2FudmFzLmhlaWdodCkgLyAyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQmdJbWcoKSB7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgIHRoaXMuYmdJbWcgPSBpbWdcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgbG9hZFBlb3BsZUltZygpIHtcclxuICAgICAgICBsZXQgaW1nQXJyXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucGVvcGxlSW1hZ2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGltZ0FyciA9IFt0aGlzLm9wdGlvbnMucGVvcGxlSW1hZ2VdXHJcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5wZW9wbGVJbWFnZSkpIHtcclxuICAgICAgICAgICAgaW1nQXJyID0gdGhpcy5vcHRpb25zLnBlb3BsZUltYWdlXHJcbiAgICAgICAgfSBlbHNlIHRocm93ICdUeXBlIFtvcHRpb25zLnBlb3BsZUltYWdlXSBjYW4gbm90IHN1cHBvcnQnXHJcbiAgICAgICAgbGV0IGxvYWROdW0gPSAwO1xyXG4gICAgICAgIGxldCBwZW9wbGVJbWFnZSA9IGltZ0Fyci5tYXAoKHNyYykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9hZE51bSsrXHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZE51bSA9PT0gaW1nQXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBpbWdcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMucGVvcGxlSW1hZ2UgPSBwZW9wbGVJbWFnZVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDnlLvog4zmma/lnLDlm75cclxuICAgICAqL1xyXG4gICAgZHJhd01hcCgpIHtcclxuICAgICAgICBsZXQgaW1nU2NhbGUgPSB0aGlzLm9wdGlvbnMuaW1nU2NhbGU7XHJcbiAgICAgICAgbGV0IGltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWDtcclxuICAgICAgICBsZXQgaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZO1xyXG4gICAgICAgIGxldCBpbWcgPSB0aGlzLmJnSW1nO1xyXG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLm1hcENhbnZhcztcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubWFwQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbnZhcyhjb250ZXh0KVxyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0LCBpbWdYLCBpbWdZLCBpbWcud2lkdGggKiBpbWdTY2FsZSwgaW1nLmhlaWdodCAqIGltZ1NjYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TW92ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoICE9PSB0cnVlKSByZXR1cm5cclxuICAgICAgICAvL+eUu+enu+WKqOi9qOi/uVxyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgoe1xyXG4gICAgICAgICAgICBtb3ZlLFxyXG4gICAgICAgICAgICBjb2xvclxyXG4gICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnQsIGxhc3Q7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb3ZlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG1vdmVbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlWy0taW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSAncmVkJ1xyXG4gICAgICAgICAgICAgICAgLy8g5YiH5o2i5bem5LiL6KeS5Li65Z2Q5qCH5Y6f54K5XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGxhc3QueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChoZWlnaHQgLSBsYXN0LnkpICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogY3VycmVudC54ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1gsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogKGhlaWdodCAtIGN1cnJlbnQueSkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHJhd0xpbmUoY29udGV4dCwgY29sb3IsIGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQZW9wbGUoKSB7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLFxyXG4gICAgICAgICAgICBwZW9wbGVJbWFnZVxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG5cclxuICAgICAgICBsZXQgcGVvcGxlSW1nV2lkdGggPSAxNjtcclxuICAgICAgICBsZXQgcGVvcGxlSW1nSGVpZ2h0ID0gMTg7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSBwZW9wbGVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckNhbnZhcyhjb250ZXh0KTtcclxuICAgICAgICBvcHRpb25zLnBlb3BsZS5mb3JFYWNoKCh7XHJcbiAgICAgICAgICAgIG1vdmUsXHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBpbWdJbmRleCxcclxuICAgICAgICAgICAgc2hvd0luZm9cclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG1vdmVbbW92ZS5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAvLyDliIfmjaLlt6bkuIvop5LkuLrlnZDmoIfljp/ngrlcclxuICAgICAgICAgICAgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBwb3NpdGlvbi54ICogb3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYIC0gcGVvcGxlSW1nV2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgeTogKGhlaWdodCAtIHBvc2l0aW9uLnkpICogb3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZIC0gcGVvcGxlSW1nSGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaG93SW5mbykge1xyXG4gICAgICAgICAgICAgICAgZHJhd1Blb3BsZUluZm8oY29udGV4dCwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UocGVvcGxlSW1hZ2VbaW1nSW5kZXhdLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwZW9wbGVJbWdXaWR0aCwgcGVvcGxlSW1nSGVpZ2h0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TWVhc3VyZSgpIHtcclxuICAgICAgICAvLyDnlLvmtYvot53ovajov7lcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgbWVhc3VyZUNhbnZhcyxcclxuICAgICAgICB9ID0gdGhpcztcclxuICAgICAgICAvL+eUu+enu+WKqOi9qOi/uVxyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tZWFzdXJlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm1lYXN1cmUuZm9yRWFjaCgoe1xyXG4gICAgICAgICAgICBtb3ZlXHJcbiAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudCwgbGFzdCwgdG90YWxMZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW92ZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbW92ZVstLWluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBsYXN0LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBsYXN0LnkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBjdXJyZW50LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBjdXJyZW50LnkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHJhd0xpbmUoY29udGV4dCwgJyNmZjY5MjInLCBsYXN0LngsIGxhc3QueSwgY3VycmVudC54LCBjdXJyZW50LnksIDIpXHJcbiAgICAgICAgICAgICAgICBkcmF3Q2lyY2xlKGNvbnRleHQsICcjZmY2OTIyJywgY3VycmVudC54LCBjdXJyZW50LnksIDUpXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dCA9ICcnXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi1t+eCuVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAn6LW354K5J1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbExlbmd0aCA9IHRvdGFsTGVuZ3RoICsgY2FsY3VsYXRlTGVuZ3RoKGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSlcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYCR7KHRvdGFsTGVuZ3RoL3RoaXMub3B0aW9ucy5pbWdTY2FsZSkudG9GaXhlZCgyKX0gbWBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRyYXdNZWFzdXJlSW5mbyhjb250ZXh0LCBjdXJyZW50LngsIGN1cnJlbnQueSwgdGV4dClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGRlc2Mg5riF6Zmke2NvbnRleHR955S75biDXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIGNsZWFyQ2FudmFzKGNvbnRleHQpIHtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBtYXBDYW52YXMsXHJcbiAgICAgICAgICAgIG1vdmVDYW52YXMsXHJcbiAgICAgICAgICAgIHBlb3BsZUNhbnZhcyxcclxuICAgICAgICAgICAgbWVhc3VyZUNhbnZhc1xyXG4gICAgICAgIH0gPSB0aGlzXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBpZiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXBDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBtb3ZlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgbWVhc3VyZUNhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIC8vIOWKqOeUu1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSByZXR1cm5cclxuICAgICAgICBsZXQgc3RlcCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW52YXMoJ3Blb3BsZScpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxuICAgICAgICAgICAgLy8g5pu05pawIOa1i+i3neWbvuWxglxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhcygnbWVhc3VyZScpXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8v55S757q/5q61XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3TGluZShjdHgsIGNvbG9yLCB4MSwgeTEsIHgyLCB5MiwgbGluZVdpZHRoKSB7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcbiAgICBjdHgubW92ZVRvKHgxLCB5MSk7XHJcbiAgICBjdHgubGluZVRvKHgyLCB5Mik7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cclxuLy/nlLvlnIZcclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdDaXJjbGUoY3R4LCBjb2xvciwgeCwgeSwgcmFkaXVzKSB7XHJcbiAgICAvL+eUu+S4gOS4quepuuW/g+WchlxyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmFyYyh4LCB5LCByYWRpdXMsIDAsIDM2MCwgZmFsc2UpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiOyAvL+Whq+WFheminOiJslxyXG4gICAgY3R4LmZpbGwoKTsgLy/nlLvlrp7lv4PlnIZcclxuICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICBjdHguc3Ryb2tlKCk7IC8v55S756m65b+D5ZyGXHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cclxuXHJcbi8vIOeUu+aWh+Wtl1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhd01lYXN1cmVJbmZvKGN0eCwgeCwgeSwgdGV4dCkge1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJ1xyXG4gICAgY3R4LmZpbGxSZWN0KHggKyA4LCB5IC0gMzAsIDc1LCAyNSk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2VlZSdcclxuICAgIGN0eC5zdHJva2VSZWN0KHggKyA4LCB5IC0gMzAsIDc1LCAyNSlcclxuICAgIGN0eC5mb250ID0gJzE0cHggQXJpYWwnO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDA5OUNDJztcclxuICAgIGN0eC5maWxsVGV4dCh0ZXh0LCB4ICsgMTIsIHkgLSAxMik7XHJcbn1cclxuXHJcbi8vIOeUu+eUqOaIt+S/oeaBr1xyXG5leHBvcnQgZnVuY3Rpb24gZHJhd1Blb3BsZUluZm8oY3R4LCB4LCB5LCBpbmZvKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnXHJcbiAgICBjdHguZmlsbFJlY3QoeCArIDE4LCB5IC0gMzAsIDEwMCwgNTApO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyNlZWUnXHJcbiAgICBjdHguc3Ryb2tlUmVjdCh4ICsgMTgsIHkgLSAzMCwgMTAwLCA1MClcclxuICAgIGN0eC5mb250ID0gJzE0cHggQXJpYWwnO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDA5OUNDJztcclxuICAgIGN0eC5maWxsVGV4dChg57yW5Y+377yaJHtpbmZvLmlkfWAsIHggKyAyMywgeSAtIDEwKTtcclxuICAgIGN0eC5maWxsVGV4dChg5aeT5ZCN77yaJHtpbmZvLm5hbWV9YCwgeCArIDIzLCB5ICsgMTApO1xyXG59XHJcblxyXG5cclxuLy8g5Yu+6IKh5a6a55CG566X5Lik54K56Led56a7XHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVMZW5ndGgoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIGxldCB4ID0geDEgLSB4MjtcclxuICAgIGxldCB5ID0geTEgLSB5MjtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RQZW9wbGUocG9zLCBwZW9wbGUsIHIpIHtcclxuICAgIGxldCBwZW9wbGVJbmRleFxyXG4gICAgcGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICBtb3ZlXHJcbiAgICB9LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmIChtb3ZlLmxlbmd0aCA8PSAwKSByZXR1cm5cclxuICAgICAgICBsZXQgcGVvcGxlUG9zID0gbW92ZVttb3ZlLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgbGV0IHBvaW50TGVuZ3RoID0gY2FsY3VsYXRlTGVuZ3RoKHBvcy54LCBwb3MueSwgcGVvcGxlUG9zLngsIHBlb3BsZVBvcy55KVxyXG4gICAgICAgIGlmIChwb2ludExlbmd0aCA8IHIpIHBlb3BsZUluZGV4ID0gaW5kZXhcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwZW9wbGVJbmRleFxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzLmpzIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTW9ja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJNb2NrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIGdsb2JhbCByZXF1aXJlLCBtb2R1bGUsIHdpbmRvdyAqL1xuXHR2YXIgSGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMSlcblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cdHZhciBSYW5kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cdHZhciBSRSA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG5cdHZhciB0b0pTT05TY2hlbWEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuXHR2YXIgdmFsaWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KVxuXG5cdHZhciBYSFJcblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSBYSFIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuXG5cdC8qIVxuXHQgICAgTW9jayAtIOaooeaLn+ivt+axgiAmIOaooeaLn+aVsOaNrlxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL251eXNvZnQvTW9ja1xuXHQgICAg5aKo5pm6IG1vemhpLmd5eUB0YW9iYW8uY29tIG51eXNvZnRAZ21haWwuY29tXG5cdCovXG5cdHZhciBNb2NrID0ge1xuXHQgICAgSGFuZGxlcjogSGFuZGxlcixcblx0ICAgIFJhbmRvbTogUmFuZG9tLFxuXHQgICAgVXRpbDogVXRpbCxcblx0ICAgIFhIUjogWEhSLFxuXHQgICAgUkU6IFJFLFxuXHQgICAgdG9KU09OU2NoZW1hOiB0b0pTT05TY2hlbWEsXG5cdCAgICB2YWxpZDogdmFsaWQsXG5cdCAgICBoZXJlZG9jOiBVdGlsLmhlcmVkb2MsXG5cdCAgICBzZXR1cDogZnVuY3Rpb24oc2V0dGluZ3MpIHtcblx0ICAgICAgICByZXR1cm4gWEhSLnNldHVwKHNldHRpbmdzKVxuXHQgICAgfSxcblx0ICAgIF9tb2NrZWQ6IHt9XG5cdH1cblxuXHRNb2NrLnZlcnNpb24gPSAnMS4wLjEtYmV0YTMnXG5cblx0Ly8g6YG/5YWN5b6q546v5L6d6LWWXG5cdGlmIChYSFIpIFhIUi5Nb2NrID0gTW9ja1xuXG5cdC8qXG5cdCAgICAqIE1vY2subW9jayggdGVtcGxhdGUgKVxuXHQgICAgKiBNb2NrLm1vY2soIGZ1bmN0aW9uKCkgKVxuXHQgICAgKiBNb2NrLm1vY2soIHJ1cmwsIHRlbXBsYXRlIClcblx0ICAgICogTW9jay5tb2NrKCBydXJsLCBmdW5jdGlvbihvcHRpb25zKSApXG5cdCAgICAqIE1vY2subW9jayggcnVybCwgcnR5cGUsIHRlbXBsYXRlIClcblx0ICAgICogTW9jay5tb2NrKCBydXJsLCBydHlwZSwgZnVuY3Rpb24ob3B0aW9ucykgKVxuXG5cdCAgICDmoLnmja7mlbDmja7mqKHmnb/nlJ/miJDmqKHmi5/mlbDmja7jgIJcblx0Ki9cblx0TW9jay5tb2NrID0gZnVuY3Rpb24ocnVybCwgcnR5cGUsIHRlbXBsYXRlKSB7XG5cdCAgICAvLyBNb2NrLm1vY2sodGVtcGxhdGUpXG5cdCAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHQgICAgICAgIHJldHVybiBIYW5kbGVyLmdlbihydXJsKVxuXHQgICAgfVxuXHQgICAgLy8gTW9jay5tb2NrKHJ1cmwsIHRlbXBsYXRlKVxuXHQgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcblx0ICAgICAgICB0ZW1wbGF0ZSA9IHJ0eXBlXG5cdCAgICAgICAgcnR5cGUgPSB1bmRlZmluZWRcblx0ICAgIH1cblx0ICAgIC8vIOaLpuaIqiBYSFJcblx0ICAgIGlmIChYSFIpIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9IFhIUlxuXHQgICAgTW9jay5fbW9ja2VkW3J1cmwgKyAocnR5cGUgfHwgJycpXSA9IHtcblx0ICAgICAgICBydXJsOiBydXJsLFxuXHQgICAgICAgIHJ0eXBlOiBydHlwZSxcblx0ICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcblx0ICAgIH1cblx0ICAgIHJldHVybiBNb2NrXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IE1vY2tcblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIFxuXHQgICAgIyMgSGFuZGxlclxuXG5cdCAgICDlpITnkIbmlbDmja7mqKHmnb/jgIJcblx0ICAgIFxuXHQgICAgKiBIYW5kbGVyLmdlbiggdGVtcGxhdGUsIG5hbWU/LCBjb250ZXh0PyApXG5cblx0ICAgICAgICDlhaXlj6Pmlrnms5XjgIJcblxuXHQgICAgKiBEYXRhIFRlbXBsYXRlIERlZmluaXRpb24sIERURFxuXHQgICAgICAgIFxuXHQgICAgICAgIOWkhOeQhuaVsOaNruaooeadv+WumuS5ieOAglxuXG5cdCAgICAgICAgKiBIYW5kbGVyLmFycmF5KCBvcHRpb25zIClcblx0ICAgICAgICAqIEhhbmRsZXIub2JqZWN0KCBvcHRpb25zIClcblx0ICAgICAgICAqIEhhbmRsZXIubnVtYmVyKCBvcHRpb25zIClcblx0ICAgICAgICAqIEhhbmRsZXIuYm9vbGVhbiggb3B0aW9ucyApXG5cdCAgICAgICAgKiBIYW5kbGVyLnN0cmluZyggb3B0aW9ucyApXG5cdCAgICAgICAgKiBIYW5kbGVyLmZ1bmN0aW9uKCBvcHRpb25zIClcblx0ICAgICAgICAqIEhhbmRsZXIucmVnZXhwKCBvcHRpb25zIClcblx0ICAgICAgICBcblx0ICAgICAgICDlpITnkIbot6/lvoTvvIjnm7jlr7nlkoznu53lr7nvvInjgIJcblxuXHQgICAgICAgICogSGFuZGxlci5nZXRWYWx1ZUJ5S2V5UGF0aCgga2V5LCBvcHRpb25zIClcblxuXHQgICAgKiBEYXRhIFBsYWNlaG9sZGVyIERlZmluaXRpb24sIERQRFxuXG5cdCAgICAgICAg5aSE55CG5pWw5o2u5Y2g5L2N56ym5a6a5LmJXG5cblx0ICAgICAgICAqIEhhbmRsZXIucGxhY2Vob2xkZXIoIHBsYWNlaG9sZGVyLCBjb250ZXh0LCB0ZW1wbGF0ZUNvbnRleHQsIG9wdGlvbnMgKVxuXG5cdCovXG5cblx0dmFyIENvbnN0YW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKVxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblx0dmFyIFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNClcblx0dmFyIFJhbmRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oNSlcblx0dmFyIFJFID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMClcblxuXHR2YXIgSGFuZGxlciA9IHtcblx0ICAgIGV4dGVuZDogVXRpbC5leHRlbmRcblx0fVxuXG5cdC8qXG5cdCAgICB0ZW1wbGF0ZSAgICAgICAg5bGe5oCn5YC877yI5Y2z5pWw5o2u5qih5p2/77yJXG5cdCAgICBuYW1lICAgICAgICAgICAg5bGe5oCn5ZCNXG5cdCAgICBjb250ZXh0ICAgICAgICAg5pWw5o2u5LiK5LiL5paH77yM55Sf5oiQ5ZCO55qE5pWw5o2uXG5cdCAgICB0ZW1wbGF0ZUNvbnRleHQg5qih5p2/5LiK5LiL5paH77yMXG5cblx0ICAgIEhhbmRsZS5nZW4odGVtcGxhdGUsIG5hbWUsIG9wdGlvbnMpXG5cdCAgICBjb250ZXh0XG5cdCAgICAgICAgY3VycmVudENvbnRleHQsIHRlbXBsYXRlQ3VycmVudENvbnRleHQsIFxuXHQgICAgICAgIHBhdGgsIHRlbXBsYXRlUGF0aFxuXHQgICAgICAgIHJvb3QsIHRlbXBsYXRlUm9vdFxuXHQqL1xuXHRIYW5kbGVyLmdlbiA9IGZ1bmN0aW9uKHRlbXBsYXRlLCBuYW1lLCBjb250ZXh0KSB7XG5cdCAgICAvKiBqc2hpbnQgLVcwNDEgKi9cblx0ICAgIG5hbWUgPSBuYW1lID09IHVuZGVmaW5lZCA/ICcnIDogKG5hbWUgKyAnJylcblxuXHQgICAgY29udGV4dCA9IGNvbnRleHQgfHwge31cblx0ICAgIGNvbnRleHQgPSB7XG5cdCAgICAgICAgICAgIC8vIOW9k+WJjeiuv+mXrui3r+W+hO+8jOWPquacieWxnuaAp+WQje+8jOS4jeWMheaLrOeUn+aIkOinhOWImVxuXHQgICAgICAgICAgICBwYXRoOiBjb250ZXh0LnBhdGggfHwgW0NvbnN0YW50LkdVSURdLFxuXHQgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGNvbnRleHQudGVtcGxhdGVQYXRoIHx8IFtDb25zdGFudC5HVUlEKytdLFxuXHQgICAgICAgICAgICAvLyDmnIDnu4jlsZ7mgKflgLznmoTkuIrkuIvmlodcblx0ICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IGNvbnRleHQuY3VycmVudENvbnRleHQsXG5cdCAgICAgICAgICAgIC8vIOWxnuaAp+WAvOaooeadv+eahOS4iuS4i+aWh1xuXHQgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBjb250ZXh0LnRlbXBsYXRlQ3VycmVudENvbnRleHQgfHwgdGVtcGxhdGUsXG5cdCAgICAgICAgICAgIC8vIOacgOe7iOWAvOeahOaguVxuXHQgICAgICAgICAgICByb290OiBjb250ZXh0LnJvb3QgfHwgY29udGV4dC5jdXJyZW50Q29udGV4dCxcblx0ICAgICAgICAgICAgLy8g5qih5p2/55qE5qC5XG5cdCAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgY29udGV4dC50ZW1wbGF0ZUN1cnJlbnRDb250ZXh0IHx8IHRlbXBsYXRlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwYXRoOicsIGNvbnRleHQucGF0aC5qb2luKCcuJyksIHRlbXBsYXRlKVxuXG5cdCAgICB2YXIgcnVsZSA9IFBhcnNlci5wYXJzZShuYW1lKVxuXHQgICAgdmFyIHR5cGUgPSBVdGlsLnR5cGUodGVtcGxhdGUpXG5cdCAgICB2YXIgZGF0YVxuXG5cdCAgICBpZiAoSGFuZGxlclt0eXBlXSkge1xuXHQgICAgICAgIGRhdGEgPSBIYW5kbGVyW3R5cGVdKHtcblx0ICAgICAgICAgICAgLy8g5bGe5oCn5YC857G75Z6LXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIC8vIOWxnuaAp+WAvOaooeadv1xuXHQgICAgICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG5cdCAgICAgICAgICAgIC8vIOWxnuaAp+WQjSArIOeUn+aIkOinhOWImVxuXHQgICAgICAgICAgICBuYW1lOiBuYW1lLFxuXHQgICAgICAgICAgICAvLyDlsZ7mgKflkI1cblx0ICAgICAgICAgICAgcGFyc2VkTmFtZTogbmFtZSA/IG5hbWUucmVwbGFjZShDb25zdGFudC5SRV9LRVksICckMScpIDogbmFtZSxcblxuXHQgICAgICAgICAgICAvLyDop6PmnpDlkI7nmoTnlJ/miJDop4TliJlcblx0ICAgICAgICAgICAgcnVsZTogcnVsZSxcblx0ICAgICAgICAgICAgLy8g55u45YWz5LiK5LiL5paHXG5cdCAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHRcblx0ICAgICAgICB9KVxuXG5cdCAgICAgICAgaWYgKCFjb250ZXh0LnJvb3QpIGNvbnRleHQucm9vdCA9IGRhdGFcblx0ICAgICAgICByZXR1cm4gZGF0YVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gdGVtcGxhdGVcblx0fVxuXG5cdEhhbmRsZXIuZXh0ZW5kKHtcblx0ICAgIGFycmF5OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdLFxuXHQgICAgICAgICAgICBpLCBpaTtcblxuXHQgICAgICAgIC8vICduYW1lfDEnOiBbXVxuXHQgICAgICAgIC8vICduYW1lfGNvdW50JzogW11cblx0ICAgICAgICAvLyAnbmFtZXxtaW4tbWF4JzogW11cblx0ICAgICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGggPT09IDApIHJldHVybiByZXN1bHRcblxuXHQgICAgICAgIC8vICdhcnInOiBbeyAnZW1haWwnOiAnQEVNQUlMJyB9LCB7ICdlbWFpbCc6ICdARU1BSUwnIH1dXG5cdCAgICAgICAgaWYgKCFvcHRpb25zLnJ1bGUucGFyYW1ldGVycykge1xuXHQgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChpKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGkpXG5cdCAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcblx0ICAgICAgICAgICAgICAgICAgICBIYW5kbGVyLmdlbihvcHRpb25zLnRlbXBsYXRlW2ldLCBpLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucG9wKClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8vICdtZXRob2R8MSc6IFsnR0VUJywgJ1BPU1QnLCAnSEVBRCcsICdERUxFVEUnXVxuXHQgICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLm1pbiA9PT0gMSAmJiBvcHRpb25zLnJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIGZpeCAjMTdcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gob3B0aW9ucy5uYW1lKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKG9wdGlvbnMubmFtZSlcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCA9IFJhbmRvbS5waWNrKFxuXHQgICAgICAgICAgICAgICAgICAgIEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGUsIHVuZGVmaW5lZCwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICByb290OiBvcHRpb25zLmNvbnRleHQucm9vdCB8fCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnBvcCgpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyAnZGF0YXwrMSc6IFt7fSwge31dXG5cdCAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLnBhcmFtZXRlcnNbMl0pIHtcblx0ICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlLl9fb3JkZXJfaW5kZXggPSBvcHRpb25zLnRlbXBsYXRlLl9fb3JkZXJfaW5kZXggfHwgMFxuXG5cdCAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChvcHRpb25zLm5hbWUpXG5cdCAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKG9wdGlvbnMubmFtZSlcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBIYW5kbGVyLmdlbihvcHRpb25zLnRlbXBsYXRlLCB1bmRlZmluZWQsIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcm9vdDogb3B0aW9ucy5jb250ZXh0LnJvb3QgfHwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgICAgIH0pW1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlLl9fb3JkZXJfaW5kZXggJSBvcHRpb25zLnRlbXBsYXRlLmxlbmd0aFxuXHQgICAgICAgICAgICAgICAgICAgIF1cblxuXHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUuX19vcmRlcl9pbmRleCArPSArb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnNbMl1cblxuXHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vICdkYXRhfDEtMTAnOiBbe31dXG5cdCAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vICdkYXRhfDEtMTAnOiBbe30sIHt9XVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGlpID0gMDsgaWkgPCBvcHRpb25zLnRlbXBsYXRlLmxlbmd0aDsgaWkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChyZXN1bHQubGVuZ3RoKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGlpKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGFuZGxlci5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtpaV0sIHJlc3VsdC5sZW5ndGgsIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdDogb3B0aW9ucy5jb250ZXh0LnJvb3QgfHwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICBvYmplY3Q6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgcmVzdWx0ID0ge30sXG5cdCAgICAgICAgICAgIGtleXMsIGZuS2V5cywga2V5LCBwYXJzZWRLZXksIGluYywgaTtcblxuXHQgICAgICAgIC8vICdvYmp8bWluLW1heCc6IHt9XG5cdCAgICAgICAgLyoganNoaW50IC1XMDQxICovXG5cdCAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5taW4gIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgIGtleXMgPSBVdGlsLmtleXMob3B0aW9ucy50ZW1wbGF0ZSlcblx0ICAgICAgICAgICAga2V5cyA9IFJhbmRvbS5zaHVmZmxlKGtleXMpXG5cdCAgICAgICAgICAgIGtleXMgPSBrZXlzLnNsaWNlKDAsIG9wdGlvbnMucnVsZS5jb3VudClcblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV1cblx0ICAgICAgICAgICAgICAgIHBhcnNlZEtleSA9IGtleS5yZXBsYWNlKENvbnN0YW50LlJFX0tFWSwgJyQxJylcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gocGFyc2VkS2V5KVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGtleSlcblx0ICAgICAgICAgICAgICAgIHJlc3VsdFtwYXJzZWRLZXldID0gSGFuZGxlci5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtrZXldLCBrZXksIHtcblx0ICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxuXHQgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnBvcCgpXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8vICdvYmonOiB7fVxuXHQgICAgICAgICAgICBrZXlzID0gW11cblx0ICAgICAgICAgICAgZm5LZXlzID0gW10gLy8gIzI1IOaUueWPmOS6humdnuWHveaVsOWxnuaAp+eahOmhuuW6j++8jOafpeaJvui1t+adpeS4jeaWueS+v1xuXHQgICAgICAgICAgICBmb3IgKGtleSBpbiBvcHRpb25zLnRlbXBsYXRlKSB7XG5cdCAgICAgICAgICAgICAgICAodHlwZW9mIG9wdGlvbnMudGVtcGxhdGVba2V5XSA9PT0gJ2Z1bmN0aW9uJyA/IGZuS2V5cyA6IGtleXMpLnB1c2goa2V5KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChmbktleXMpXG5cblx0ICAgICAgICAgICAgLypcblx0ICAgICAgICAgICAgICAgIOS8muaUueWPmOmdnuWHveaVsOWxnuaAp+eahOmhuuW6j1xuXHQgICAgICAgICAgICAgICAga2V5cyA9IFV0aWwua2V5cyhvcHRpb25zLnRlbXBsYXRlKVxuXHQgICAgICAgICAgICAgICAga2V5cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgYWZuID0gdHlwZW9mIG9wdGlvbnMudGVtcGxhdGVbYV0gPT09ICdmdW5jdGlvbidcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgYmZuID0gdHlwZW9mIG9wdGlvbnMudGVtcGxhdGVbYl0gPT09ICdmdW5jdGlvbidcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoYWZuID09PSBiZm4pIHJldHVybiAwXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGFmbiAmJiAhYmZuKSByZXR1cm4gMVxuXHQgICAgICAgICAgICAgICAgICAgIGlmICghYWZuICYmIGJmbikgcmV0dXJuIC0xXG5cdCAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAqL1xuXG5cdCAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICAgICAgICAgICAgICBwYXJzZWRLZXkgPSBrZXkucmVwbGFjZShDb25zdGFudC5SRV9LRVksICckMScpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHBhcnNlZEtleSlcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChrZXkpXG5cdCAgICAgICAgICAgICAgICByZXN1bHRbcGFyc2VkS2V5XSA9IEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XG5cdCAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgICAgICAgICByb290OiBvcHRpb25zLmNvbnRleHQucm9vdCB8fCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgICAgIC8vICdpZHwrMSc6IDFcblx0ICAgICAgICAgICAgICAgIGluYyA9IGtleS5tYXRjaChDb25zdGFudC5SRV9LRVkpXG5cdCAgICAgICAgICAgICAgICBpZiAoaW5jICYmIGluY1syXSAmJiBVdGlsLnR5cGUob3B0aW9ucy50ZW1wbGF0ZVtrZXldKSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlW2tleV0gKz0gcGFyc2VJbnQoaW5jWzJdLCAxMClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgbnVtYmVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIHJlc3VsdCwgcGFydHM7XG5cdCAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5kZWNpbWFsKSB7IC8vIGZsb2F0XG5cdCAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUgKz0gJydcblx0ICAgICAgICAgICAgcGFydHMgPSBvcHRpb25zLnRlbXBsYXRlLnNwbGl0KCcuJylcblx0ICAgICAgICAgICAgICAgIC8vICdmbG9hdDF8LjEtMTAnOiAxMCxcblx0ICAgICAgICAgICAgICAgIC8vICdmbG9hdDJ8MS0xMDAuMS0xMCc6IDEsXG5cdCAgICAgICAgICAgICAgICAvLyAnZmxvYXQzfDk5OS4xLTEwJzogMSxcblx0ICAgICAgICAgICAgICAgIC8vICdmbG9hdDR8LjMtMTAnOiAxMjMuMTIzLFxuXHQgICAgICAgICAgICBwYXJ0c1swXSA9IG9wdGlvbnMucnVsZS5yYW5nZSA/IG9wdGlvbnMucnVsZS5jb3VudCA6IHBhcnRzWzBdXG5cdCAgICAgICAgICAgIHBhcnRzWzFdID0gKHBhcnRzWzFdIHx8ICcnKS5zbGljZSgwLCBvcHRpb25zLnJ1bGUuZGNvdW50KVxuXHQgICAgICAgICAgICB3aGlsZSAocGFydHNbMV0ubGVuZ3RoIDwgb3B0aW9ucy5ydWxlLmRjb3VudCkge1xuXHQgICAgICAgICAgICAgICAgcGFydHNbMV0gKz0gKFxuXHQgICAgICAgICAgICAgICAgICAgIC8vIOacgOWQjuS4gOS9jeS4jeiDveS4uiAw77ya5aaC5p6c5pyA5ZCO5LiA5L2N5Li6IDDvvIzkvJrooqsgSlMg5byV5pOO5b+955Wl5o6J44CCXG5cdCAgICAgICAgICAgICAgICAgICAgKHBhcnRzWzFdLmxlbmd0aCA8IG9wdGlvbnMucnVsZS5kY291bnQgLSAxKSA/IFJhbmRvbS5jaGFyYWN0ZXIoJ251bWJlcicpIDogUmFuZG9tLmNoYXJhY3RlcignMTIzNDU2Nzg5Jylcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXN1bHQgPSBwYXJzZUZsb2F0KHBhcnRzLmpvaW4oJy4nKSwgMTApXG5cdCAgICAgICAgfSBlbHNlIHsgLy8gaW50ZWdlclxuXHQgICAgICAgICAgICAvLyAnZ3JhZGUxfDEtMTAwJzogMSxcblx0ICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnJhbmdlICYmICFvcHRpb25zLnJ1bGUucGFyYW1ldGVyc1syXSA/IG9wdGlvbnMucnVsZS5jb3VudCA6IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIGJvb2xlYW46IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgcmVzdWx0O1xuXHQgICAgICAgIC8vICdwcm9wfG11bHRpcGxlJzogZmFsc2UsIOW9k+WJjeWAvOaYr+ebuOWPjeWAvOeahOamgueOh+WAjeaVsFxuXHQgICAgICAgIC8vICdwcm9wfHByb2JhYmlsaXR5LXByb2JhYmlsaXR5JzogZmFsc2UsIOW9k+WJjeWAvOS4juebuOWPjeWAvOeahOamgueOh1xuXHQgICAgICAgIHJlc3VsdCA9IG9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzID8gUmFuZG9tLmJvb2wob3B0aW9ucy5ydWxlLm1pbiwgb3B0aW9ucy5ydWxlLm1heCwgb3B0aW9ucy50ZW1wbGF0ZSkgOiBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIHN0cmluZzogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSAnJyxcblx0ICAgICAgICAgICAgaSwgcGxhY2Vob2xkZXJzLCBwaCwgcGhlZDtcblx0ICAgICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGgpIHtcblxuXHQgICAgICAgICAgICAvLyAgJ2Zvbyc6ICfimIUnLFxuXHQgICAgICAgICAgICAvKiBqc2hpbnQgLVcwNDEgKi9cblx0ICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5jb3VudCA9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCArPSBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyAnc3RhcnwxLTUnOiAn4piFJyxcblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICByZXN1bHQgKz0gb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vICdlbWFpbHwxLTEwJzogJ0BFTUFJTCwgJyxcblx0ICAgICAgICAgICAgcGxhY2Vob2xkZXJzID0gcmVzdWx0Lm1hdGNoKENvbnN0YW50LlJFX1BMQUNFSE9MREVSKSB8fCBbXSAvLyBBLVpfMC05ID4gXFx3X1xuXHQgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGxhY2Vob2xkZXJzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBwaCA9IHBsYWNlaG9sZGVyc1tpXVxuXG5cdCAgICAgICAgICAgICAgICAvLyDpgYfliLDovazkuYnmlpzmnaDvvIzkuI3pnIDopoHop6PmnpDljaDkvY3nrKZcblx0ICAgICAgICAgICAgICAgIGlmICgvXlxcXFwvLnRlc3QocGgpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJzLnNwbGljZShpLS0sIDEpXG5cdCAgICAgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgcGhlZCA9IEhhbmRsZXIucGxhY2Vob2xkZXIocGgsIG9wdGlvbnMuY29udGV4dC5jdXJyZW50Q29udGV4dCwgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlQ3VycmVudENvbnRleHQsIG9wdGlvbnMpXG5cblx0ICAgICAgICAgICAgICAgIC8vIOWPquacieS4gOS4quWNoOS9jeespu+8jOW5tuS4lOayoeacieWFtuS7luWtl+esplxuXHQgICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVycy5sZW5ndGggPT09IDEgJiYgcGggPT09IHJlc3VsdCAmJiB0eXBlb2YgcGhlZCAhPT0gdHlwZW9mIHJlc3VsdCkgeyAvLyBcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwaGVkXG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzTnVtZXJpYyhwaGVkKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwYXJzZUZsb2F0KHBoZWQsIDEwKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoL14odHJ1ZXxmYWxzZSkkLy50ZXN0KHBoZWQpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBoZWQgPT09ICd0cnVlJyA/IHRydWUgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhlZCA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBoZWQgLy8g5bey57uP5piv5biD5bCU5YC8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocGgsIHBoZWQpXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8vICdBU0NJSXwxLTEwJzogJycsXG5cdCAgICAgICAgICAgIC8vICdBU0NJSSc6ICcnLFxuXHQgICAgICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucmFuZ2UgPyBSYW5kb20uc3RyaW5nKG9wdGlvbnMucnVsZS5jb3VudCkgOiBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICAnZnVuY3Rpb24nOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdCAgICAgICAgLy8gKCBjb250ZXh0LCBvcHRpb25zIClcblx0ICAgICAgICByZXR1cm4gb3B0aW9ucy50ZW1wbGF0ZS5jYWxsKG9wdGlvbnMuY29udGV4dC5jdXJyZW50Q29udGV4dCwgb3B0aW9ucylcblx0ICAgIH0sXG5cdCAgICAncmVnZXhwJzogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgICAgIHZhciBzb3VyY2UgPSAnJ1xuXG5cdCAgICAgICAgLy8gJ25hbWUnOiAvcmVnZXhwLyxcblx0ICAgICAgICAvKiBqc2hpbnQgLVcwNDEgKi9cblx0ICAgICAgICBpZiAob3B0aW9ucy5ydWxlLmNvdW50ID09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICBzb3VyY2UgKz0gb3B0aW9ucy50ZW1wbGF0ZS5zb3VyY2UgLy8gcmVnZXhwLnNvdXJjZVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vICduYW1lfDEtNSc6IC9yZWdleHAvLFxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5ydWxlLmNvdW50OyBpKyspIHtcblx0ICAgICAgICAgICAgc291cmNlICs9IG9wdGlvbnMudGVtcGxhdGUuc291cmNlXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIFJFLkhhbmRsZXIuZ2VuKFxuXHQgICAgICAgICAgICBSRS5QYXJzZXIucGFyc2UoXG5cdCAgICAgICAgICAgICAgICBzb3VyY2Vcblx0ICAgICAgICAgICAgKVxuXHQgICAgICAgIClcblx0ICAgIH1cblx0fSlcblxuXHRIYW5kbGVyLmV4dGVuZCh7XG5cdCAgICBfYWxsOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgcmUgPSB7fTtcblx0ICAgICAgICBmb3IgKHZhciBrZXkgaW4gUmFuZG9tKSByZVtrZXkudG9Mb3dlckNhc2UoKV0gPSBrZXlcblx0ICAgICAgICByZXR1cm4gcmVcblx0ICAgIH0sXG5cdCAgICAvLyDlpITnkIbljaDkvY3nrKbvvIzovazmjaLkuLrmnIDnu4jlgLxcblx0ICAgIHBsYWNlaG9sZGVyOiBmdW5jdGlvbihwbGFjZWhvbGRlciwgb2JqLCB0ZW1wbGF0ZUNvbnRleHQsIG9wdGlvbnMpIHtcblx0ICAgICAgICAvLyBjb25zb2xlLmxvZyhvcHRpb25zLmNvbnRleHQucGF0aClcblx0ICAgICAgICAvLyAxIGtleSwgMiBwYXJhbXNcblx0ICAgICAgICBDb25zdGFudC5SRV9QTEFDRUhPTERFUi5leGVjKCcnKVxuXHQgICAgICAgIHZhciBwYXJ0cyA9IENvbnN0YW50LlJFX1BMQUNFSE9MREVSLmV4ZWMocGxhY2Vob2xkZXIpLFxuXHQgICAgICAgICAgICBrZXkgPSBwYXJ0cyAmJiBwYXJ0c1sxXSxcblx0ICAgICAgICAgICAgbGtleSA9IGtleSAmJiBrZXkudG9Mb3dlckNhc2UoKSxcblx0ICAgICAgICAgICAgb2tleSA9IHRoaXMuX2FsbCgpW2xrZXldLFxuXHQgICAgICAgICAgICBwYXJhbXMgPSBwYXJ0cyAmJiBwYXJ0c1syXSB8fCAnJ1xuXHQgICAgICAgIHZhciBwYXRoUGFydHMgPSB0aGlzLnNwbGl0UGF0aFRvQXJyYXkoa2V5KVxuXG5cdCAgICAgICAgLy8g6Kej5p6Q5Y2g5L2N56ym55qE5Y+C5pWwXG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgLy8gMS4g5bCd6K+V5L+d5oyB5Y+C5pWw55qE57G75Z6LXG5cdCAgICAgICAgICAgIC8qXG5cdCAgICAgICAgICAgICAgICAjMjQgW1dpbmRvdyBGaXJlZm94IDMwLjAg5byV55SoIOWNoOS9jeespiDmipvplJldKGh0dHBzOi8vZ2l0aHViLmNvbS9udXlzb2Z0L01vY2svaXNzdWVzLzI0KVxuXHQgICAgICAgICAgICAgICAgW0JYOTA1Njog5ZCE5rWP6KeI5Zmo5LiLIHdpbmRvdy5ldmFsIOaWueazleeahOaJp+ihjOS4iuS4i+aWh+WtmOWcqOW3ruW8gl0oaHR0cDovL3d3dy53M2hlbHAub3JnL3poLWNuL2NhdXNlcy9CWDkwNTYpXG5cdCAgICAgICAgICAgICAgICDlupTor6XlsZ7kuo4gV2luZG93IEZpcmVmb3ggMzAuMCDnmoQgQlVHXG5cdCAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIC8qIGpzaGludCAtVzA2MSAqL1xuXHQgICAgICAgICAgICBwYXJhbXMgPSBldmFsKCcoZnVuY3Rpb24oKXsgcmV0dXJuIFtdLnNwbGljZS5jYWxsKGFyZ3VtZW50cywgMCApIH0pKCcgKyBwYXJhbXMgKyAnKScpXG5cdCAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcblx0ICAgICAgICAgICAgLy8gMi4g5aaC5p6c5aSx6LSl77yM5Y+q6IO96Kej5p6Q5Li65a2X56ym5LiyXG5cdCAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cdCAgICAgICAgICAgIC8vIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSBwYXJhbXMgPSBwYXJ0c1syXS5zcGxpdCgvLFxccyovKTtcblx0ICAgICAgICAgICAgLy8gZWxzZSB0aHJvdyBlcnJvclxuXHQgICAgICAgICAgICBwYXJhbXMgPSBwYXJ0c1syXS5zcGxpdCgvLFxccyovKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOWNoOS9jeespuS8mOWFiOW8leeUqOaVsOaNruaooeadv+S4reeahOWxnuaAp1xuXHQgICAgICAgIGlmIChvYmogJiYgKGtleSBpbiBvYmopKSByZXR1cm4gb2JqW2tleV1cblxuXHQgICAgICAgIC8vIEBpbmRleCBAa2V5XG5cdCAgICAgICAgLy8gaWYgKENvbnN0YW50LlJFX0lOREVYLnRlc3Qoa2V5KSkgcmV0dXJuICtvcHRpb25zLm5hbWVcblx0ICAgICAgICAvLyBpZiAoQ29uc3RhbnQuUkVfS0VZLnRlc3Qoa2V5KSkgcmV0dXJuIG9wdGlvbnMubmFtZVxuXG5cdCAgICAgICAgLy8g57ud5a+56Lev5b6EIG9yIOebuOWvuei3r+W+hFxuXHQgICAgICAgIGlmIChcblx0ICAgICAgICAgICAga2V5LmNoYXJBdCgwKSA9PT0gJy8nIHx8XG5cdCAgICAgICAgICAgIHBhdGhQYXJ0cy5sZW5ndGggPiAxXG5cdCAgICAgICAgKSByZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5S2V5UGF0aChrZXksIG9wdGlvbnMpXG5cblx0ICAgICAgICAvLyDpgJLlvZLlvJXnlKjmlbDmja7mqKHmnb/kuK3nmoTlsZ7mgKdcblx0ICAgICAgICBpZiAodGVtcGxhdGVDb250ZXh0ICYmXG5cdCAgICAgICAgICAgICh0eXBlb2YgdGVtcGxhdGVDb250ZXh0ID09PSAnb2JqZWN0JykgJiZcblx0ICAgICAgICAgICAgKGtleSBpbiB0ZW1wbGF0ZUNvbnRleHQpICYmXG5cdCAgICAgICAgICAgIChwbGFjZWhvbGRlciAhPT0gdGVtcGxhdGVDb250ZXh0W2tleV0pIC8vIGZpeCAjMTUg6YG/5YWN6Ieq5bex5L6d6LWW6Ieq5bexXG5cdCAgICAgICAgKSB7XG5cdCAgICAgICAgICAgIC8vIOWFiOiuoeeul+iiq+W8leeUqOeahOWxnuaAp+WAvFxuXHQgICAgICAgICAgICB0ZW1wbGF0ZUNvbnRleHRba2V5XSA9IEhhbmRsZXIuZ2VuKHRlbXBsYXRlQ29udGV4dFtrZXldLCBrZXksIHtcblx0ICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiBvYmosXG5cdCAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiB0ZW1wbGF0ZUNvbnRleHRcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ29udGV4dFtrZXldXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5aaC5p6c5pyq5om+5Yiw77yM5YiZ5Y6f5qC36L+U5ZueXG5cdCAgICAgICAgaWYgKCEoa2V5IGluIFJhbmRvbSkgJiYgIShsa2V5IGluIFJhbmRvbSkgJiYgIShva2V5IGluIFJhbmRvbSkpIHJldHVybiBwbGFjZWhvbGRlclxuXG5cdCAgICAgICAgLy8g6YCS5b2S6Kej5p6Q5Y+C5pWw5Lit55qE5Y2g5L2N56ymXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIuZXhlYygnJylcblx0ICAgICAgICAgICAgaWYgKENvbnN0YW50LlJFX1BMQUNFSE9MREVSLnRlc3QocGFyYW1zW2ldKSkge1xuXHQgICAgICAgICAgICAgICAgcGFyYW1zW2ldID0gSGFuZGxlci5wbGFjZWhvbGRlcihwYXJhbXNbaV0sIG9iaiwgdGVtcGxhdGVDb250ZXh0LCBvcHRpb25zKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIGhhbmRsZSA9IFJhbmRvbVtrZXldIHx8IFJhbmRvbVtsa2V5XSB8fCBSYW5kb21bb2tleV1cblx0ICAgICAgICBzd2l0Y2ggKFV0aWwudHlwZShoYW5kbGUpKSB7XG5cdCAgICAgICAgICAgIGNhc2UgJ2FycmF5Jzpcblx0ICAgICAgICAgICAgICAgIC8vIOiHquWKqOS7juaVsOe7hOS4reWPluS4gOS4qu+8jOS+i+WmgiBAYXJlYXNcblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhoYW5kbGUpXG5cdCAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcblx0ICAgICAgICAgICAgICAgIC8vIOaJp+ihjOWNoOS9jeespuaWueazle+8iOWkp+WkmuaVsOaDheWGte+8iVxuXHQgICAgICAgICAgICAgICAgaGFuZGxlLm9wdGlvbnMgPSBvcHRpb25zXG5cdCAgICAgICAgICAgICAgICB2YXIgcmUgPSBoYW5kbGUuYXBwbHkoUmFuZG9tLCBwYXJhbXMpXG5cdCAgICAgICAgICAgICAgICBpZiAocmUgPT09IHVuZGVmaW5lZCkgcmUgPSAnJyAvLyDlm6DkuLrmmK/lnKjlrZfnrKbkuLLkuK3vvIzmiYDku6Xpu5jorqTkuLrnqbrlrZfnrKbkuLLjgIJcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGUub3B0aW9uc1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHJlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGdldFZhbHVlQnlLZXlQYXRoOiBmdW5jdGlvbihrZXksIG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgb3JpZ2luYWxLZXkgPSBrZXlcblx0ICAgICAgICB2YXIga2V5UGF0aFBhcnRzID0gdGhpcy5zcGxpdFBhdGhUb0FycmF5KGtleSlcblx0ICAgICAgICB2YXIgYWJzb2x1dGVQYXRoUGFydHMgPSBbXVxuXG5cdCAgICAgICAgLy8g57ud5a+56Lev5b6EXG5cdCAgICAgICAgaWYgKGtleS5jaGFyQXQoMCkgPT09ICcvJykge1xuXHQgICAgICAgICAgICBhYnNvbHV0ZVBhdGhQYXJ0cyA9IFtvcHRpb25zLmNvbnRleHQucGF0aFswXV0uY29uY2F0KFxuXHQgICAgICAgICAgICAgICAgdGhpcy5ub3JtYWxpemVQYXRoKGtleVBhdGhQYXJ0cylcblx0ICAgICAgICAgICAgKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8vIOebuOWvuei3r+W+hFxuXHQgICAgICAgICAgICBpZiAoa2V5UGF0aFBhcnRzLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgICAgICAgICAgIGFic29sdXRlUGF0aFBhcnRzID0gb3B0aW9ucy5jb250ZXh0LnBhdGguc2xpY2UoMClcblx0ICAgICAgICAgICAgICAgIGFic29sdXRlUGF0aFBhcnRzLnBvcCgpXG5cdCAgICAgICAgICAgICAgICBhYnNvbHV0ZVBhdGhQYXJ0cyA9IHRoaXMubm9ybWFsaXplUGF0aChcblx0ICAgICAgICAgICAgICAgICAgICBhYnNvbHV0ZVBhdGhQYXJ0cy5jb25jYXQoa2V5UGF0aFBhcnRzKVxuXHQgICAgICAgICAgICAgICAgKVxuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICBrZXkgPSBrZXlQYXRoUGFydHNba2V5UGF0aFBhcnRzLmxlbmd0aCAtIDFdXG5cdCAgICAgICAgdmFyIGN1cnJlbnRDb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0LnJvb3Rcblx0ICAgICAgICB2YXIgdGVtcGxhdGVDdXJyZW50Q29udGV4dCA9IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3Rcblx0ICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFic29sdXRlUGF0aFBhcnRzLmxlbmd0aCAtIDE7IGkrKykge1xuXHQgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2Fic29sdXRlUGF0aFBhcnRzW2ldXVxuXHQgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0ID0gdGVtcGxhdGVDdXJyZW50Q29udGV4dFthYnNvbHV0ZVBhdGhQYXJ0c1tpXV1cblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8g5byV55So55qE5YC85bey57uP6K6h566X5aW9XG5cdCAgICAgICAgaWYgKGN1cnJlbnRDb250ZXh0ICYmIChrZXkgaW4gY3VycmVudENvbnRleHQpKSByZXR1cm4gY3VycmVudENvbnRleHRba2V5XVxuXG5cdCAgICAgICAgLy8g5bCa5pyq6K6h566X77yM6YCS5b2S5byV55So5pWw5o2u5qih5p2/5Lit55qE5bGe5oCnXG5cdCAgICAgICAgaWYgKHRlbXBsYXRlQ3VycmVudENvbnRleHQgJiZcblx0ICAgICAgICAgICAgKHR5cGVvZiB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0ID09PSAnb2JqZWN0JykgJiZcblx0ICAgICAgICAgICAgKGtleSBpbiB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0KSAmJlxuXHQgICAgICAgICAgICAob3JpZ2luYWxLZXkgIT09IHRlbXBsYXRlQ3VycmVudENvbnRleHRba2V5XSkgLy8gZml4ICMxNSDpgb/lhY3oh6rlt7Hkvp3otZboh6rlt7Fcblx0ICAgICAgICApIHtcblx0ICAgICAgICAgICAgLy8g5YWI6K6h566X6KKr5byV55So55qE5bGe5oCn5YC8XG5cdCAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHRba2V5XSA9IEhhbmRsZXIuZ2VuKHRlbXBsYXRlQ3VycmVudENvbnRleHRba2V5XSwga2V5LCB7XG5cdCAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogY3VycmVudENvbnRleHQsXG5cdCAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0XG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0W2tleV1cblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2tpc3N5dGVhbS9raXNzeS9ibG9iL21hc3Rlci9zcmMvcGF0aC9zcmMvcGF0aC5qc1xuXHQgICAgbm9ybWFsaXplUGF0aDogZnVuY3Rpb24ocGF0aFBhcnRzKSB7XG5cdCAgICAgICAgdmFyIG5ld1BhdGhQYXJ0cyA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoUGFydHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgc3dpdGNoIChwYXRoUGFydHNbaV0pIHtcblx0ICAgICAgICAgICAgICAgIGNhc2UgJy4uJzpcblx0ICAgICAgICAgICAgICAgICAgICBuZXdQYXRoUGFydHMucG9wKClcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnLic6XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICAgICAgbmV3UGF0aFBhcnRzLnB1c2gocGF0aFBhcnRzW2ldKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBuZXdQYXRoUGFydHNcblx0ICAgIH0sXG5cdCAgICBzcGxpdFBhdGhUb0FycmF5OiBmdW5jdGlvbihwYXRoKSB7XG5cdCAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgvXFwvKy8pO1xuXHQgICAgICAgIGlmICghcGFydHNbcGFydHMubGVuZ3RoIC0gMV0pIHBhcnRzID0gcGFydHMuc2xpY2UoMCwgLTEpXG5cdCAgICAgICAgaWYgKCFwYXJ0c1swXSkgcGFydHMgPSBwYXJ0cy5zbGljZSgxKVxuXHQgICAgICAgIHJldHVybiBwYXJ0cztcblx0ICAgIH1cblx0fSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEhhbmRsZXJcblxuLyoqKi8gfSxcbi8qIDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBDb25zdGFudFxuXG5cdCAgICDluLjph4/pm4blkIjjgIJcblx0ICovXG5cdC8qXG5cdCAgICBSRV9LRVlcblx0ICAgICAgICAnbmFtZXxtaW4tbWF4JzogdmFsdWVcblx0ICAgICAgICAnbmFtZXxjb3VudCc6IHZhbHVlXG5cdCAgICAgICAgJ25hbWV8bWluLW1heC5kbWluLWRtYXgnOiB2YWx1ZVxuXHQgICAgICAgICduYW1lfG1pbi1tYXguZGNvdW50JzogdmFsdWVcblx0ICAgICAgICAnbmFtZXxjb3VudC5kbWluLWRtYXgnOiB2YWx1ZVxuXHQgICAgICAgICduYW1lfGNvdW50LmRjb3VudCc6IHZhbHVlXG5cdCAgICAgICAgJ25hbWV8K3N0ZXAnOiB2YWx1ZVxuXG5cdCAgICAgICAgMSBuYW1lLCAyIHN0ZXAsIDMgcmFuZ2UgWyBtaW4sIG1heCBdLCA0IGRyYW5nZSBbIGRtaW4sIGRtYXggXVxuXG5cdCAgICBSRV9QTEFDRUhPTERFUlxuXHQgICAgICAgIHBsYWNlaG9sZGVyKCopXG5cblx0ICAgIFvmraPliJnmn6XnnIvlt6XlhbddKGh0dHA6Ly93d3cucmVnZXhwZXIuY29tLylcblxuXHQgICAgIzI2IOeUn+aIkOinhOWImSDmlK/mjIEg6LSf5pWw77yM5L6L5aaCIG51bWJlcnwtMTAwLTEwMFxuXHQqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIEdVSUQ6IDEsXG5cdCAgICBSRV9LRVk6IC8oLispXFx8KD86XFwrKFxcZCspfChbXFwrXFwtXT9cXGQrLT9bXFwrXFwtXT9cXGQqKT8oPzpcXC4oXFxkKy0/XFxkKikpPykvLFxuXHQgICAgUkVfUkFOR0U6IC8oW1xcK1xcLV0/XFxkKyktPyhbXFwrXFwtXT9cXGQrKT8vLFxuXHQgICAgUkVfUExBQ0VIT0xERVI6IC9cXFxcKkAoW15AIyUmKClcXD9cXHNdKykoPzpcXCgoLio/KVxcKSk/L2dcblx0ICAgIC8vIC9cXFxcKkAoW15AIyUmKClcXD9cXHNcXC9cXC5dKykoPzpcXCgoLio/KVxcKSk/L2dcblx0ICAgIC8vIFJFX0lOREVYOiAvXmluZGV4JC8sXG5cdCAgICAvLyBSRV9LRVk6IC9ea2V5JC9cblx0fVxuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIFV0aWxpdGllc1xuXHQqL1xuXHR2YXIgVXRpbCA9IHt9XG5cblx0VXRpbC5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdCAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LFxuXHQgICAgICAgIGkgPSAxLFxuXHQgICAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdCAgICAgICAgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjbG9uZVxuXG5cdCAgICBpZiAobGVuZ3RoID09PSAxKSB7XG5cdCAgICAgICAgdGFyZ2V0ID0gdGhpc1xuXHQgICAgICAgIGkgPSAwXG5cdCAgICB9XG5cblx0ICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2ldXG5cdCAgICAgICAgaWYgKCFvcHRpb25zKSBjb250aW51ZVxuXG5cdCAgICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0ICAgICAgICAgICAgc3JjID0gdGFyZ2V0W25hbWVdXG5cdCAgICAgICAgICAgIGNvcHkgPSBvcHRpb25zW25hbWVdXG5cblx0ICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gY29weSkgY29udGludWVcblx0ICAgICAgICAgICAgaWYgKGNvcHkgPT09IHVuZGVmaW5lZCkgY29udGludWVcblxuXHQgICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGNvcHkpIHx8IFV0aWwuaXNPYmplY3QoY29weSkpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29weSkpIGNsb25lID0gc3JjICYmIFV0aWwuaXNBcnJheShzcmMpID8gc3JjIDogW11cblx0ICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzT2JqZWN0KGNvcHkpKSBjbG9uZSA9IHNyYyAmJiBVdGlsLmlzT2JqZWN0KHNyYykgPyBzcmMgOiB7fVxuXG5cdCAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBVdGlsLmV4dGVuZChjbG9uZSwgY29weSlcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IGNvcHlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHRhcmdldFxuXHR9XG5cblx0VXRpbC5lYWNoID0gZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG5cdCAgICB2YXIgaSwga2V5XG5cdCAgICBpZiAodGhpcy50eXBlKG9iaikgPT09ICdudW1iZXInKSB7XG5cdCAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iajsgaSsrKSB7XG5cdCAgICAgICAgICAgIGl0ZXJhdG9yKGksIGkpXG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkge1xuXHQgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopID09PSBmYWxzZSkgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuXHQgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopID09PSBmYWxzZSkgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRVdGlsLnR5cGUgPSBmdW5jdGlvbiB0eXBlKG9iaikge1xuXHQgICAgcmV0dXJuIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpID8gU3RyaW5nKG9iaikgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxbb2JqZWN0IChcXHcrKVxcXS8pWzFdLnRvTG93ZXJDYXNlKClcblx0fVxuXG5cdFV0aWwuZWFjaCgnU3RyaW5nIE9iamVjdCBBcnJheSBSZWdFeHAgRnVuY3Rpb24nLnNwbGl0KCcgJyksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdCAgICBVdGlsWydpcycgKyB2YWx1ZV0gPSBmdW5jdGlvbihvYmopIHtcblx0ICAgICAgICByZXR1cm4gVXRpbC50eXBlKG9iaikgPT09IHZhbHVlLnRvTG93ZXJDYXNlKClcblx0ICAgIH1cblx0fSlcblxuXHRVdGlsLmlzT2JqZWN0T3JBcnJheSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdCAgICByZXR1cm4gVXRpbC5pc09iamVjdCh2YWx1ZSkgfHwgVXRpbC5pc0FycmF5KHZhbHVlKVxuXHR9XG5cblx0VXRpbC5pc051bWVyaWMgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHQgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpXG5cdH1cblxuXHRVdGlsLmtleXMgPSBmdW5jdGlvbihvYmopIHtcblx0ICAgIHZhciBrZXlzID0gW107XG5cdCAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdCAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBrZXlzLnB1c2goa2V5KVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGtleXM7XG5cdH1cblx0VXRpbC52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcblx0ICAgIHZhciB2YWx1ZXMgPSBbXTtcblx0ICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0ICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHZhbHVlcy5wdXNoKG9ialtrZXldKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHZhbHVlcztcblx0fVxuXG5cdC8qXG5cdCAgICAjIyMgTW9jay5oZXJlZG9jKGZuKVxuXG5cdCAgICAqIE1vY2suaGVyZWRvYyhmbilcblxuXHQgICAg5Lul55u06KeC44CB5a6J5YWo55qE5pa55byP5Lmm5YaZ77yI5aSa6KGM77yJSFRNTCDmqKHmnb/jgIJcblxuXHQgICAgKirkvb/nlKjnpLrkvosqKuWmguS4i+aJgOekuu+8mlxuXG5cdCAgICAgICAgdmFyIHRwbCA9IE1vY2suaGVyZWRvYyhmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgLyohXG5cdCAgICAgICAge3tlbWFpbH19e3thZ2V9fVxuXHQgICAgICAgIDwhLS0gTW9jayB7IFxuXHQgICAgICAgICAgICBlbWFpbDogJ0BFTUFJTCcsXG5cdCAgICAgICAgICAgIGFnZTogJ0BJTlQoMSwxMDApJ1xuXHQgICAgICAgIH0gLS0+XG5cdCAgICAgICAgICAgICpcXC9cblx0ICAgICAgICB9KVxuXHQgICAgXG5cdCAgICAqKuebuOWFs+mYheivuyoqXG5cdCAgICAqIFtDcmVhdGluZyBtdWx0aWxpbmUgc3RyaW5ncyBpbiBKYXZhU2NyaXB0XShodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzgwNTEwNy9jcmVhdGluZy1tdWx0aWxpbmUtc3RyaW5ncy1pbi1qYXZhc2NyaXB0KeOAgVxuXHQqL1xuXHRVdGlsLmhlcmVkb2MgPSBmdW5jdGlvbiBoZXJlZG9jKGZuKSB7XG5cdCAgICAvLyAxLiDnp7vpmaTotbflp4vnmoQgZnVuY3Rpb24oKXsgLyohXG5cdCAgICAvLyAyLiDnp7vpmaTmnKvlsL7nmoQgKi8gfVxuXHQgICAgLy8gMy4g56e76Zmk6LW35aeL5ZKM5pyr5bC+55qE56m65qC8XG5cdCAgICByZXR1cm4gZm4udG9TdHJpbmcoKVxuXHQgICAgICAgIC5yZXBsYWNlKC9eW15cXC9dK1xcL1xcKiE/LywgJycpXG5cdCAgICAgICAgLnJlcGxhY2UoL1xcKlxcL1teXFwvXSskLywgJycpXG5cdCAgICAgICAgLnJlcGxhY2UoL15bXFxzXFx4QTBdKy8sICcnKS5yZXBsYWNlKC9bXFxzXFx4QTBdKyQvLCAnJykgLy8gLnRyaW0oKVxuXHR9XG5cblx0VXRpbC5ub29wID0gZnVuY3Rpb24oKSB7fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gVXRpbFxuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0XHQjIyBQYXJzZXJcblxuXHRcdOino+aekOaVsOaNruaooeadv++8iOWxnuaAp+WQjemDqOWIhu+8ieOAglxuXG5cdFx0KiBQYXJzZXIucGFyc2UoIG5hbWUgKVxuXHRcdFx0XG5cdFx0XHRgYGBqc29uXG5cdFx0XHR7XG5cdFx0XHRcdHBhcmFtZXRlcnM6IFsgbmFtZSwgaW5jLCByYW5nZSwgZGVjaW1hbCBdLFxuXHRcdFx0XHRybmFnZTogWyBtaW4gLCBtYXggXSxcblxuXHRcdFx0XHRtaW46IG1pbixcblx0XHRcdFx0bWF4OiBtYXgsXG5cdFx0XHRcdGNvdW50IDogY291bnQsXG5cblx0XHRcdFx0ZGVjaW1hbDogZGVjaW1hbCxcblx0XHRcdFx0ZG1pbjogZG1pbixcblx0XHRcdFx0ZG1heDogZG1heCxcblx0XHRcdFx0ZGNvdW50OiBkY291bnRcblx0XHRcdH1cblx0XHRcdGBgYFxuXHQgKi9cblxuXHR2YXIgQ29uc3RhbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpXG5cdHZhciBSYW5kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cblx0LyoganNoaW50IC1XMDQxICovXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHRcdHBhcnNlOiBmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHRuYW1lID0gbmFtZSA9PSB1bmRlZmluZWQgPyAnJyA6IChuYW1lICsgJycpXG5cblx0XHRcdHZhciBwYXJhbWV0ZXJzID0gKG5hbWUgfHwgJycpLm1hdGNoKENvbnN0YW50LlJFX0tFWSlcblxuXHRcdFx0dmFyIHJhbmdlID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzNdICYmIHBhcmFtZXRlcnNbM10ubWF0Y2goQ29uc3RhbnQuUkVfUkFOR0UpXG5cdFx0XHR2YXIgbWluID0gcmFuZ2UgJiYgcmFuZ2VbMV0gJiYgcGFyc2VJbnQocmFuZ2VbMV0sIDEwKSAvLyB8fCAxXG5cdFx0XHR2YXIgbWF4ID0gcmFuZ2UgJiYgcmFuZ2VbMl0gJiYgcGFyc2VJbnQocmFuZ2VbMl0sIDEwKSAvLyB8fCAxXG5cdFx0XHRcdC8vIHJlcGVhdCB8fCBtaW4tbWF4IHx8IDFcblx0XHRcdFx0Ly8gdmFyIGNvdW50ID0gcmFuZ2UgPyAhcmFuZ2VbMl0gJiYgcGFyc2VJbnQocmFuZ2VbMV0sIDEwKSB8fCBSYW5kb20uaW50ZWdlcihtaW4sIG1heCkgOiAxXG5cdFx0XHR2YXIgY291bnQgPSByYW5nZSA/ICFyYW5nZVsyXSA/IHBhcnNlSW50KHJhbmdlWzFdLCAxMCkgOiBSYW5kb20uaW50ZWdlcihtaW4sIG1heCkgOiB1bmRlZmluZWRcblxuXHRcdFx0dmFyIGRlY2ltYWwgPSBwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnNbNF0gJiYgcGFyYW1ldGVyc1s0XS5tYXRjaChDb25zdGFudC5SRV9SQU5HRSlcblx0XHRcdHZhciBkbWluID0gZGVjaW1hbCAmJiBkZWNpbWFsWzFdICYmIHBhcnNlSW50KGRlY2ltYWxbMV0sIDEwKSAvLyB8fCAwLFxuXHRcdFx0dmFyIGRtYXggPSBkZWNpbWFsICYmIGRlY2ltYWxbMl0gJiYgcGFyc2VJbnQoZGVjaW1hbFsyXSwgMTApIC8vIHx8IDAsXG5cdFx0XHRcdC8vIGludCB8fCBkbWluLWRtYXggfHwgMFxuXHRcdFx0dmFyIGRjb3VudCA9IGRlY2ltYWwgPyAhZGVjaW1hbFsyXSAmJiBwYXJzZUludChkZWNpbWFsWzFdLCAxMCkgfHwgUmFuZG9tLmludGVnZXIoZG1pbiwgZG1heCkgOiB1bmRlZmluZWRcblxuXHRcdFx0dmFyIHJlc3VsdCA9IHtcblx0XHRcdFx0Ly8gMSBuYW1lLCAyIGluYywgMyByYW5nZSwgNCBkZWNpbWFsXG5cdFx0XHRcdHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXG5cdFx0XHRcdC8vIDEgbWluLCAyIG1heFxuXHRcdFx0XHRyYW5nZTogcmFuZ2UsXG5cdFx0XHRcdG1pbjogbWluLFxuXHRcdFx0XHRtYXg6IG1heCxcblx0XHRcdFx0Ly8gbWluLW1heFxuXHRcdFx0XHRjb3VudDogY291bnQsXG5cdFx0XHRcdC8vIOaYr+WQpuaciSBkZWNpbWFsXG5cdFx0XHRcdGRlY2ltYWw6IGRlY2ltYWwsXG5cdFx0XHRcdGRtaW46IGRtaW4sXG5cdFx0XHRcdGRtYXg6IGRtYXgsXG5cdFx0XHRcdC8vIGRtaW4tZGltYXhcblx0XHRcdFx0ZGNvdW50OiBkY291bnRcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgciBpbiByZXN1bHQpIHtcblx0XHRcdFx0aWYgKHJlc3VsdFtyXSAhPSB1bmRlZmluZWQpIHJldHVybiByZXN1bHRcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHt9XG5cdFx0fVxuXHR9XG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgTW9jay5SYW5kb21cblx0ICAgIFxuXHQgICAg5bel5YW357G777yM55So5LqO55Sf5oiQ5ZCE56eN6ZqP5py65pWw5o2u44CCXG5cdCovXG5cblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cblx0dmFyIFJhbmRvbSA9IHtcblx0ICAgIGV4dGVuZDogVXRpbC5leHRlbmRcblx0fVxuXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXyg2KSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDcpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oOCkpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXygxMCkpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXygxMykpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXygxNSkpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXygxNikpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXygxNykpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXygxNCkpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXygxOSkpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBSYW5kb21cblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBCYXNpY3Ncblx0Ki9cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTluIPlsJTlgLzjgIJcblx0ICAgIGJvb2xlYW46IGZ1bmN0aW9uKG1pbiwgbWF4LCBjdXIpIHtcblx0ICAgICAgICBpZiAoY3VyICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgbWluID0gdHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzTmFOKG1pbikgPyBwYXJzZUludChtaW4sIDEwKSA6IDFcblx0ICAgICAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzTmFOKG1heCkgPyBwYXJzZUludChtYXgsIDEwKSA6IDFcblx0ICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAxLjAgLyAobWluICsgbWF4KSAqIG1pbiA/ICFjdXIgOiBjdXJcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+PSAwLjVcblx0ICAgIH0sXG5cdCAgICBib29sOiBmdW5jdGlvbihtaW4sIG1heCwgY3VyKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbihtaW4sIG1heCwgY3VyKVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuueahOiHqueEtuaVsO+8iOWkp+S6juetieS6jiAwIOeahOaVtOaVsO+8ieOAglxuXHQgICAgbmF0dXJhbDogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICBtaW4gPSB0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyA/IHBhcnNlSW50KG1pbiwgMTApIDogMFxuXHQgICAgICAgIG1heCA9IHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnID8gcGFyc2VJbnQobWF4LCAxMCkgOiA5MDA3MTk5MjU0NzQwOTkyIC8vIDJeNTNcblx0ICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE5pW05pWw44CCXG5cdCAgICBpbnRlZ2VyOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnID8gcGFyc2VJbnQobWluLCAxMCkgOiAtOTAwNzE5OTI1NDc0MDk5MlxuXHQgICAgICAgIG1heCA9IHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnID8gcGFyc2VJbnQobWF4LCAxMCkgOiA5MDA3MTk5MjU0NzQwOTkyIC8vIDJeNTNcblx0ICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXG5cdCAgICB9LFxuXHQgICAgaW50OiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmludGVnZXIobWluLCBtYXgpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE5rWu54K55pWw44CCXG5cdCAgICBmbG9hdDogZnVuY3Rpb24obWluLCBtYXgsIGRtaW4sIGRtYXgpIHtcblx0ICAgICAgICBkbWluID0gZG1pbiA9PT0gdW5kZWZpbmVkID8gMCA6IGRtaW5cblx0ICAgICAgICBkbWluID0gTWF0aC5tYXgoTWF0aC5taW4oZG1pbiwgMTcpLCAwKVxuXHQgICAgICAgIGRtYXggPSBkbWF4ID09PSB1bmRlZmluZWQgPyAxNyA6IGRtYXhcblx0ICAgICAgICBkbWF4ID0gTWF0aC5tYXgoTWF0aC5taW4oZG1heCwgMTcpLCAwKVxuXHQgICAgICAgIHZhciByZXQgPSB0aGlzLmludGVnZXIobWluLCBtYXgpICsgJy4nO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwLCBkY291bnQgPSB0aGlzLm5hdHVyYWwoZG1pbiwgZG1heCk7IGkgPCBkY291bnQ7IGkrKykge1xuXHQgICAgICAgICAgICByZXQgKz0gKFxuXHQgICAgICAgICAgICAgICAgLy8g5pyA5ZCO5LiA5L2N5LiN6IO95Li6IDDvvJrlpoLmnpzmnIDlkI7kuIDkvY3kuLogMO+8jOS8muiiqyBKUyDlvJXmk47lv73nlaXmjonjgIJcblx0ICAgICAgICAgICAgICAgIChpIDwgZGNvdW50IC0gMSkgPyB0aGlzLmNoYXJhY3RlcignbnVtYmVyJykgOiB0aGlzLmNoYXJhY3RlcignMTIzNDU2Nzg5Jylcblx0ICAgICAgICAgICAgKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChyZXQsIDEwKVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuuWtl+espuOAglxuXHQgICAgY2hhcmFjdGVyOiBmdW5jdGlvbihwb29sKSB7XG5cdCAgICAgICAgdmFyIHBvb2xzID0ge1xuXHQgICAgICAgICAgICBsb3dlcjogJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Jyxcblx0ICAgICAgICAgICAgdXBwZXI6ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWicsXG5cdCAgICAgICAgICAgIG51bWJlcjogJzAxMjM0NTY3ODknLFxuXHQgICAgICAgICAgICBzeW1ib2w6ICchQCMkJV4mKigpW10nXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHBvb2xzLmFscGhhID0gcG9vbHMubG93ZXIgKyBwb29scy51cHBlclxuXHQgICAgICAgIHBvb2xzWyd1bmRlZmluZWQnXSA9IHBvb2xzLmxvd2VyICsgcG9vbHMudXBwZXIgKyBwb29scy5udW1iZXIgKyBwb29scy5zeW1ib2xcblxuXHQgICAgICAgIHBvb2wgPSBwb29sc1soJycgKyBwb29sKS50b0xvd2VyQ2FzZSgpXSB8fCBwb29sXG5cdCAgICAgICAgcmV0dXJuIHBvb2wuY2hhckF0KHRoaXMubmF0dXJhbCgwLCBwb29sLmxlbmd0aCAtIDEpKVxuXHQgICAgfSxcblx0ICAgIGNoYXI6IGZ1bmN0aW9uKHBvb2wpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXIocG9vbClcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrlrZfnrKbkuLLjgIJcblx0ICAgIHN0cmluZzogZnVuY3Rpb24ocG9vbCwgbWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuXG5cdCAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIGNhc2UgMDogLy8gKClcblx0ICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubmF0dXJhbCgzLCA3KVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAxOiAvLyAoIGxlbmd0aCApXG5cdCAgICAgICAgICAgICAgICBsZW4gPSBwb29sXG5cdCAgICAgICAgICAgICAgICBwb29sID0gdW5kZWZpbmVkXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDI6XG5cdCAgICAgICAgICAgICAgICAvLyAoIHBvb2wsIGxlbmd0aCApXG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZW4gPSBtaW5cblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gKCBtaW4sIG1heCApXG5cdCAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5uYXR1cmFsKHBvb2wsIG1pbilcblx0ICAgICAgICAgICAgICAgICAgICBwb29sID0gdW5kZWZpbmVkXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLm5hdHVyYWwobWluLCBtYXgpXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciB0ZXh0ID0gJydcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHRleHQgKz0gdGhpcy5jaGFyYWN0ZXIocG9vbClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gdGV4dFxuXHQgICAgfSxcblx0ICAgIHN0cjogZnVuY3Rpb24oIC8qcG9vbCwgbWluLCBtYXgqLyApIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4quaVtOWei+aVsOe7hOOAglxuXHQgICAgcmFuZ2U6IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG5cdCAgICAgICAgLy8gcmFuZ2UoIHN0b3AgKVxuXHQgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcblx0ICAgICAgICAgICAgc3RvcCA9IHN0YXJ0IHx8IDA7XG5cdCAgICAgICAgICAgIHN0YXJ0ID0gMDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gcmFuZ2UoIHN0YXJ0LCBzdG9wIClcblx0ICAgICAgICBzdGVwID0gYXJndW1lbnRzWzJdIHx8IDE7XG5cblx0ICAgICAgICBzdGFydCA9ICtzdGFydFxuXHQgICAgICAgIHN0b3AgPSArc3RvcFxuXHQgICAgICAgIHN0ZXAgPSArc3RlcFxuXG5cdCAgICAgICAgdmFyIGxlbiA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcblx0ICAgICAgICB2YXIgaWR4ID0gMDtcblx0ICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgQXJyYXkobGVuKTtcblxuXHQgICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcblx0ICAgICAgICAgICAgcmFuZ2VbaWR4KytdID0gc3RhcnQ7XG5cdCAgICAgICAgICAgIHN0YXJ0ICs9IHN0ZXA7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHJhbmdlO1xuXHQgICAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgRGF0ZVxuXHQqL1xuXHR2YXIgcGF0dGVybkxldHRlcnMgPSB7XG5cdCAgICB5eXl5OiAnZ2V0RnVsbFllYXInLFxuXHQgICAgeXk6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICByZXR1cm4gKCcnICsgZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgyKVxuXHQgICAgfSxcblx0ICAgIHk6ICd5eScsXG5cblx0ICAgIE1NOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkgKyAxXG5cdCAgICAgICAgcmV0dXJuIG0gPCAxMCA/ICcwJyArIG0gOiBtXG5cdCAgICB9LFxuXHQgICAgTTogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCkgKyAxXG5cdCAgICB9LFxuXG5cdCAgICBkZDogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHZhciBkID0gZGF0ZS5nZXREYXRlKClcblx0ICAgICAgICByZXR1cm4gZCA8IDEwID8gJzAnICsgZCA6IGRcblx0ICAgIH0sXG5cdCAgICBkOiAnZ2V0RGF0ZScsXG5cblx0ICAgIEhIOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKClcblx0ICAgICAgICByZXR1cm4gaCA8IDEwID8gJzAnICsgaCA6IGhcblx0ICAgIH0sXG5cdCAgICBIOiAnZ2V0SG91cnMnLFxuXHQgICAgaGg6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKSAlIDEyXG5cdCAgICAgICAgcmV0dXJuIGggPCAxMCA/ICcwJyArIGggOiBoXG5cdCAgICB9LFxuXHQgICAgaDogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgJSAxMlxuXHQgICAgfSxcblxuXHQgICAgbW06IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TWludXRlcygpXG5cdCAgICAgICAgcmV0dXJuIG0gPCAxMCA/ICcwJyArIG0gOiBtXG5cdCAgICB9LFxuXHQgICAgbTogJ2dldE1pbnV0ZXMnLFxuXG5cdCAgICBzczogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHZhciBzID0gZGF0ZS5nZXRTZWNvbmRzKClcblx0ICAgICAgICByZXR1cm4gcyA8IDEwID8gJzAnICsgcyA6IHNcblx0ICAgIH0sXG5cdCAgICBzOiAnZ2V0U2Vjb25kcycsXG5cblx0ICAgIFNTOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgdmFyIG1zID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuXHQgICAgICAgIHJldHVybiBtcyA8IDEwICYmICcwMCcgKyBtcyB8fCBtcyA8IDEwMCAmJiAnMCcgKyBtcyB8fCBtc1xuXHQgICAgfSxcblx0ICAgIFM6ICdnZXRNaWxsaXNlY29uZHMnLFxuXG5cdCAgICBBOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gJ0FNJyA6ICdQTSdcblx0ICAgIH0sXG5cdCAgICBhOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gJ2FtJyA6ICdwbSdcblx0ICAgIH0sXG5cdCAgICBUOiAnZ2V0VGltZSdcblx0fVxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8vIOaXpeacn+WNoOS9jeespumbhuWQiOOAglxuXHQgICAgX3BhdHRlcm5MZXR0ZXJzOiBwYXR0ZXJuTGV0dGVycyxcblx0ICAgIC8vIOaXpeacn+WNoOS9jeespuato+WImeOAglxuXHQgICAgX3Jmb3JtYXQ6IG5ldyBSZWdFeHAoKGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciByZSA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiBwYXR0ZXJuTGV0dGVycykgcmUucHVzaChpKVxuXHQgICAgICAgIHJldHVybiAnKCcgKyByZS5qb2luKCd8JykgKyAnKSdcblx0ICAgIH0pKCksICdnJyksXG5cdCAgICAvLyDmoLzlvI/ljJbml6XmnJ/jgIJcblx0ICAgIF9mb3JtYXREYXRlOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpIHtcblx0ICAgICAgICByZXR1cm4gZm9ybWF0LnJlcGxhY2UodGhpcy5fcmZvcm1hdCwgZnVuY3Rpb24gY3JlYXROZXdTdWJTdHJpbmcoJDAsIGZsYWcpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXR0ZXJuTGV0dGVyc1tmbGFnXSA9PT0gJ2Z1bmN0aW9uJyA/IHBhdHRlcm5MZXR0ZXJzW2ZsYWddKGRhdGUpIDpcblx0ICAgICAgICAgICAgICAgIHBhdHRlcm5MZXR0ZXJzW2ZsYWddIGluIHBhdHRlcm5MZXR0ZXJzID8gY3JlYXROZXdTdWJTdHJpbmcoJDAsIHBhdHRlcm5MZXR0ZXJzW2ZsYWddKSA6XG5cdCAgICAgICAgICAgICAgICBkYXRlW3BhdHRlcm5MZXR0ZXJzW2ZsYWddXSgpXG5cdCAgICAgICAgfSlcblx0ICAgIH0sXG5cdCAgICAvLyDnlJ/miJDkuIDkuKrpmo/mnLrnmoQgRGF0ZSDlr7nosaHjgIJcblx0ICAgIF9yYW5kb21EYXRlOiBmdW5jdGlvbihtaW4sIG1heCkgeyAvLyBtaW4sIG1heFxuXHQgICAgICAgIG1pbiA9IG1pbiA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUoMCkgOiBtaW5cblx0ICAgICAgICBtYXggPSBtYXggPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKCkgOiBtYXhcblx0ICAgICAgICByZXR1cm4gbmV3IERhdGUoTWF0aC5yYW5kb20oKSAqIChtYXguZ2V0VGltZSgpIC0gbWluLmdldFRpbWUoKSkpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE5pel5pyf5a2X56ym5Liy44CCXG5cdCAgICBkYXRlOiBmdW5jdGlvbihmb3JtYXQpIHtcblx0ICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ3l5eXktTU0tZGQnXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fcmFuZG9tRGF0ZSgpLCBmb3JtYXQpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE5pe26Ze05a2X56ym5Liy44CCXG5cdCAgICB0aW1lOiBmdW5jdGlvbihmb3JtYXQpIHtcblx0ICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ0hIOm1tOnNzJ1xuXHQgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXREYXRlKHRoaXMuX3JhbmRvbURhdGUoKSwgZm9ybWF0KVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuueahOaXpeacn+WSjOaXtumXtOWtl+espuS4suOAglxuXHQgICAgZGF0ZXRpbWU6IGZ1bmN0aW9uKGZvcm1hdCkge1xuXHQgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXl5eS1NTS1kZCBISDptbTpzcydcblx0ICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0RGF0ZSh0aGlzLl9yYW5kb21EYXRlKCksIGZvcm1hdClcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57lvZPliY3nmoTml6XmnJ/lkozml7bpl7TlrZfnrKbkuLLjgIJcblx0ICAgIG5vdzogZnVuY3Rpb24odW5pdCwgZm9ybWF0KSB7XG5cdCAgICAgICAgLy8gbm93KHVuaXQpIG5vdyhmb3JtYXQpXG5cdCAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0ICAgICAgICAgICAgLy8gbm93KGZvcm1hdClcblx0ICAgICAgICAgICAgaWYgKCEveWVhcnxtb250aHxkYXl8aG91cnxtaW51dGV8c2Vjb25kfHdlZWsvLnRlc3QodW5pdCkpIHtcblx0ICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuaXRcblx0ICAgICAgICAgICAgICAgIHVuaXQgPSAnJ1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHVuaXQgPSAodW5pdCB8fCAnJykudG9Mb3dlckNhc2UoKVxuXHQgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXl5eS1NTS1kZCBISDptbTpzcydcblxuXHQgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuXG5cdCAgICAgICAgLyoganNoaW50IC1XMDg2ICovXG5cdCAgICAgICAgLy8g5Y+C6ICD6IeqIGh0dHA6Ly9tb21lbnRqcy5jbi9kb2NzLyMvbWFuaXB1bGF0aW5nL3N0YXJ0LW9mL1xuXHQgICAgICAgIHN3aXRjaCAodW5pdCkge1xuXHQgICAgICAgICAgICBjYXNlICd5ZWFyJzpcblx0ICAgICAgICAgICAgICAgIGRhdGUuc2V0TW9udGgoMClcblx0ICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuXHQgICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKDEpXG5cdCAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuXHQgICAgICAgICAgICBjYXNlICdkYXknOlxuXHQgICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3VycygwKVxuXHQgICAgICAgICAgICBjYXNlICdob3VyJzpcblx0ICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcygwKVxuXHQgICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuXHQgICAgICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKDApXG5cdCAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG5cdCAgICAgICAgICAgICAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcblx0ICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG5cdCAgICAgICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBkYXRlLmdldERheSgpKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXREYXRlKGRhdGUsIGZvcm1hdClcblx0ICAgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKG1vZHVsZSkgey8qIGdsb2JhbCBkb2N1bWVudCAgKi9cblx0Lypcblx0ICAgICMjIEltYWdlXG5cdCovXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy8g5bi46KeB55qE5bm/5ZGK5a696auYXG5cdCAgICBfYWRTaXplOiBbXG5cdCAgICAgICAgJzMwMHgyNTAnLCAnMjUweDI1MCcsICcyNDB4NDAwJywgJzMzNngyODAnLCAnMTgweDE1MCcsXG5cdCAgICAgICAgJzcyMHgzMDAnLCAnNDY4eDYwJywgJzIzNHg2MCcsICc4OHgzMScsICcxMjB4OTAnLFxuXHQgICAgICAgICcxMjB4NjAnLCAnMTIweDI0MCcsICcxMjV4MTI1JywgJzcyOHg5MCcsICcxNjB4NjAwJyxcblx0ICAgICAgICAnMTIweDYwMCcsICczMDB4NjAwJ1xuXHQgICAgXSxcblx0ICAgIC8vIOW4uOingeeahOWxj+W5leWuvemrmFxuXHQgICAgX3NjcmVlblNpemU6IFtcblx0ICAgICAgICAnMzIweDIwMCcsICczMjB4MjQwJywgJzY0MHg0ODAnLCAnODAweDQ4MCcsICc4MDB4NDgwJyxcblx0ICAgICAgICAnMTAyNHg2MDAnLCAnMTAyNHg3NjgnLCAnMTI4MHg4MDAnLCAnMTQ0MHg5MDAnLCAnMTkyMHgxMjAwJyxcblx0ICAgICAgICAnMjU2MHgxNjAwJ1xuXHQgICAgXSxcblx0ICAgIC8vIOW4uOingeeahOinhumikeWuvemrmFxuXHQgICAgX3ZpZGVvU2l6ZTogWyc3MjB4NDgwJywgJzc2OHg1NzYnLCAnMTI4MHg3MjAnLCAnMTkyMHgxMDgwJ10sXG5cdCAgICAvKlxuXHQgICAgICAgIOeUn+aIkOS4gOS4qumaj+acuueahOWbvueJh+WcsOWdgOOAglxuXG5cdCAgICAgICAg5pu/5Luj5Zu+54mH5rqQXG5cdCAgICAgICAgICAgIGh0dHA6Ly9mcG9pbWcuY29tL1xuXHQgICAgICAgIOWPguiAg+iHqiBcblx0ICAgICAgICAgICAgaHR0cDovL3JlbnNhbm5pbmcuaXRleWUuY29tL2Jsb2cvMTkzMzMxMFxuXHQgICAgICAgICAgICBodHRwOi8vY29kZS50dXRzcGx1cy5jb20vYXJ0aWNsZXMvdGhlLXRvcC04LXBsYWNlaG9sZGVycy1mb3Itd2ViLWRlc2lnbmVycy0tbmV0LTE5NDg1XG5cdCAgICAqL1xuXHQgICAgaW1hZ2U6IGZ1bmN0aW9uKHNpemUsIGJhY2tncm91bmQsIGZvcmVncm91bmQsIGZvcm1hdCwgdGV4dCkge1xuXHQgICAgICAgIC8vIFJhbmRvbS5pbWFnZSggc2l6ZSwgYmFja2dyb3VuZCwgZm9yZWdyb3VuZCwgdGV4dCApXG5cdCAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcblx0ICAgICAgICAgICAgdGV4dCA9IGZvcm1hdFxuXHQgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWRcblx0ICAgICAgICB9XG5cdCAgICAgICAgLy8gUmFuZG9tLmltYWdlKCBzaXplLCBiYWNrZ3JvdW5kLCB0ZXh0IClcblx0ICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuXHQgICAgICAgICAgICB0ZXh0ID0gZm9yZWdyb3VuZFxuXHQgICAgICAgICAgICBmb3JlZ3JvdW5kID0gdW5kZWZpbmVkXG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIFJhbmRvbS5pbWFnZSgpXG5cdCAgICAgICAgaWYgKCFzaXplKSBzaXplID0gdGhpcy5waWNrKHRoaXMuX2FkU2l6ZSlcblxuXHQgICAgICAgIGlmIChiYWNrZ3JvdW5kICYmIH5iYWNrZ3JvdW5kLmluZGV4T2YoJyMnKSkgYmFja2dyb3VuZCA9IGJhY2tncm91bmQuc2xpY2UoMSlcblx0ICAgICAgICBpZiAoZm9yZWdyb3VuZCAmJiB+Zm9yZWdyb3VuZC5pbmRleE9mKCcjJykpIGZvcmVncm91bmQgPSBmb3JlZ3JvdW5kLnNsaWNlKDEpXG5cblx0ICAgICAgICAvLyBodHRwOi8vZHVtbXlpbWFnZS5jb20vNjAweDQwMC9jYzAwY2MvNDcwMDQ3LnBuZyZ0ZXh0PWhlbGxvXG5cdCAgICAgICAgcmV0dXJuICdodHRwOi8vZHVtbXlpbWFnZS5jb20vJyArIHNpemUgK1xuXHQgICAgICAgICAgICAoYmFja2dyb3VuZCA/ICcvJyArIGJhY2tncm91bmQgOiAnJykgK1xuXHQgICAgICAgICAgICAoZm9yZWdyb3VuZCA/ICcvJyArIGZvcmVncm91bmQgOiAnJykgK1xuXHQgICAgICAgICAgICAoZm9ybWF0ID8gJy4nICsgZm9ybWF0IDogJycpICtcblx0ICAgICAgICAgICAgKHRleHQgPyAnJnRleHQ9JyArIHRleHQgOiAnJylcblx0ICAgIH0sXG5cdCAgICBpbWc6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmltYWdlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICAgIH0sXG5cblx0ICAgIC8qXG5cdCAgICAgICAgQnJhbmRDb2xvcnNcblx0ICAgICAgICBodHRwOi8vYnJhbmRjb2xvcnMubmV0L1xuXHQgICAgICAgIEEgY29sbGVjdGlvbiBvZiBtYWpvciBicmFuZCBjb2xvciBjb2RlcyBjdXJhdGVkIGJ5IEdhbGVuIEdpZG1hbi5cblx0ICAgICAgICDlpKfniYzlhazlj7jnmoTpopzoibLpm4blkIhcblxuXHQgICAgICAgIC8vIOiOt+WPluWTgeeJjOWSjOminOiJslxuXHQgICAgICAgICQoJ2gyJykuZWFjaChmdW5jdGlvbihpbmRleCwgaXRlbSl7XG5cdCAgICAgICAgICAgIGl0ZW0gPSAkKGl0ZW0pXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcXCcnICsgaXRlbS50ZXh0KCkgKyAnXFwnJywgJzonLCAnXFwnJyArIGl0ZW0ubmV4dCgpLnRleHQoKSArICdcXCcnLCAnLCcpXG5cdCAgICAgICAgfSlcblx0ICAgICovXG5cdCAgICBfYnJhbmRDb2xvcnM6IHtcblx0ICAgICAgICAnNG9ybWF0JzogJyNmYjBhMmEnLFxuXHQgICAgICAgICc1MDBweCc6ICcjMDJhZGVhJyxcblx0ICAgICAgICAnQWJvdXQubWUgKGJsdWUpJzogJyMwMDQwNWQnLFxuXHQgICAgICAgICdBYm91dC5tZSAoeWVsbG93KSc6ICcjZmZjYzMzJyxcblx0ICAgICAgICAnQWRkdm9jYXRlJzogJyNmZjYxMzgnLFxuXHQgICAgICAgICdBZG9iZSc6ICcjZmYwMDAwJyxcblx0ICAgICAgICAnQWltJzogJyNmY2QyMGInLFxuXHQgICAgICAgICdBbWF6b24nOiAnI2U0NzkxMScsXG5cdCAgICAgICAgJ0FuZHJvaWQnOiAnI2E0YzYzOScsXG5cdCAgICAgICAgJ0FuZ2llXFwncyBMaXN0JzogJyM3ZmJiMDAnLFxuXHQgICAgICAgICdBT0wnOiAnIzAwNjBhMycsXG5cdCAgICAgICAgJ0F0bGFzc2lhbic6ICcjMDAzMzY2Jyxcblx0ICAgICAgICAnQmVoYW5jZSc6ICcjMDUzZWZmJyxcblx0ICAgICAgICAnQmlnIENhcnRlbCc6ICcjOTdiNTM4Jyxcblx0ICAgICAgICAnYml0bHknOiAnI2VlNjEyMycsXG5cdCAgICAgICAgJ0Jsb2dnZXInOiAnI2ZjNGYwOCcsXG5cdCAgICAgICAgJ0JvZWluZyc6ICcjMDAzOWE2Jyxcblx0ICAgICAgICAnQm9va2luZy5jb20nOiAnIzAwMzU4MCcsXG5cdCAgICAgICAgJ0NhcmJvbm1hZGUnOiAnIzYxMzg1NCcsXG5cdCAgICAgICAgJ0NoZWRkYXInOiAnI2ZmNzI0MycsXG5cdCAgICAgICAgJ0NvZGUgU2Nob29sJzogJyMzZDQ5NDQnLFxuXHQgICAgICAgICdEZWxpY2lvdXMnOiAnIzIwNWNjMCcsXG5cdCAgICAgICAgJ0RlbGwnOiAnIzMyODdjMScsXG5cdCAgICAgICAgJ0Rlc2lnbm1vbyc6ICcjZTU0YTRmJyxcblx0ICAgICAgICAnRGV2aWFudGFydCc6ICcjNGU2MjUyJyxcblx0ICAgICAgICAnRGVzaWduZXIgTmV3cyc6ICcjMmQ3MmRhJyxcblx0ICAgICAgICAnRGV2b3VyJzogJyNmZDAwMDEnLFxuXHQgICAgICAgICdERVdBTFQnOiAnI2ZlYmQxNycsXG5cdCAgICAgICAgJ0Rpc3F1cyAoYmx1ZSknOiAnIzU5YTNmYycsXG5cdCAgICAgICAgJ0Rpc3F1cyAob3JhbmdlKSc6ICcjZGI3MTMyJyxcblx0ICAgICAgICAnRHJpYmJibGUnOiAnI2VhNGM4OScsXG5cdCAgICAgICAgJ0Ryb3Bib3gnOiAnIzNkOWFlOCcsXG5cdCAgICAgICAgJ0RydXBhbCc6ICcjMGM3NmFiJyxcblx0ICAgICAgICAnRHVua2VkJzogJyMyYTMyM2EnLFxuXHQgICAgICAgICdlQmF5JzogJyM4OWM1MDcnLFxuXHQgICAgICAgICdFbWJlcic6ICcjZjA1ZTFiJyxcblx0ICAgICAgICAnRW5nYWRnZXQnOiAnIzAwYmRmNicsXG5cdCAgICAgICAgJ0VudmF0byc6ICcjNTI4MDM2Jyxcblx0ICAgICAgICAnRXRzeSc6ICcjZWI2ZDIwJyxcblx0ICAgICAgICAnRXZlcm5vdGUnOiAnIzViYTUyNScsXG5cdCAgICAgICAgJ0ZhYi5jb20nOiAnI2RkMDAxNycsXG5cdCAgICAgICAgJ0ZhY2Vib29rJzogJyMzYjU5OTgnLFxuXHQgICAgICAgICdGaXJlZm94JzogJyNlNjYwMDAnLFxuXHQgICAgICAgICdGbGlja3IgKGJsdWUpJzogJyMwMDYzZGMnLFxuXHQgICAgICAgICdGbGlja3IgKHBpbmspJzogJyNmZjAwODQnLFxuXHQgICAgICAgICdGb3Jyc3QnOiAnIzViOWE2OCcsXG5cdCAgICAgICAgJ0ZvdXJzcXVhcmUnOiAnIzI1YTBjYScsXG5cdCAgICAgICAgJ0dhcm1pbic6ICcjMDA3Y2MzJyxcblx0ICAgICAgICAnR2V0R2x1ZSc6ICcjMmQ3NWEyJyxcblx0ICAgICAgICAnR2ltbWViYXInOiAnI2Y3MDA3OCcsXG5cdCAgICAgICAgJ0dpdEh1Yic6ICcjMTcxNTE1Jyxcblx0ICAgICAgICAnR29vZ2xlIEJsdWUnOiAnIzAxNDBjYScsXG5cdCAgICAgICAgJ0dvb2dsZSBHcmVlbic6ICcjMTZhNjFlJyxcblx0ICAgICAgICAnR29vZ2xlIFJlZCc6ICcjZGQxODEyJyxcblx0ICAgICAgICAnR29vZ2xlIFllbGxvdyc6ICcjZmNjYTAzJyxcblx0ICAgICAgICAnR29vZ2xlKyc6ICcjZGQ0YjM5Jyxcblx0ICAgICAgICAnR3Jvb3Zlc2hhcmsnOiAnI2Y3N2YwMCcsXG5cdCAgICAgICAgJ0dyb3Vwb24nOiAnIzgyYjU0OCcsXG5cdCAgICAgICAgJ0hhY2tlciBOZXdzJzogJyNmZjY2MDAnLFxuXHQgICAgICAgICdIZWxsb1dhbGxldCc6ICcjMDA4NWNhJyxcblx0ICAgICAgICAnSGVyb2t1IChsaWdodCknOiAnI2M3YzVlNicsXG5cdCAgICAgICAgJ0hlcm9rdSAoZGFyayknOiAnIzY1NjdhNScsXG5cdCAgICAgICAgJ0hvb3RTdWl0ZSc6ICcjMDAzMzY2Jyxcblx0ICAgICAgICAnSG91enonOiAnIzczYmEzNycsXG5cdCAgICAgICAgJ0hUTUw1JzogJyNlYzYyMzEnLFxuXHQgICAgICAgICdJS0VBJzogJyNmZmNjMzMnLFxuXHQgICAgICAgICdJTURiJzogJyNmM2NlMTMnLFxuXHQgICAgICAgICdJbnN0YWdyYW0nOiAnIzNmNzI5YicsXG5cdCAgICAgICAgJ0ludGVsJzogJyMwMDcxYzUnLFxuXHQgICAgICAgICdJbnR1aXQnOiAnIzM2NWViZicsXG5cdCAgICAgICAgJ0tpY2tzdGFydGVyJzogJyM3NmNjMWUnLFxuXHQgICAgICAgICdraXBwdCc6ICcjZTAzNTAwJyxcblx0ICAgICAgICAnS29kZXJ5JzogJyMwMGFmODEnLFxuXHQgICAgICAgICdMYXN0Rk0nOiAnI2MzMDAwZCcsXG5cdCAgICAgICAgJ0xpbmtlZEluJzogJyMwZTc2YTgnLFxuXHQgICAgICAgICdMaXZlc3RyZWFtJzogJyNjZjAwMDUnLFxuXHQgICAgICAgICdMdW1vJzogJyM1NzYzOTYnLFxuXHQgICAgICAgICdNaXhwYW5lbCc6ICcjYTA4NmQzJyxcblx0ICAgICAgICAnTWVldHVwJzogJyNlNTE5MzcnLFxuXHQgICAgICAgICdOb2tpYSc6ICcjMTgzNjkzJyxcblx0ICAgICAgICAnTlZJRElBJzogJyM3NmI5MDAnLFxuXHQgICAgICAgICdPcGVyYSc6ICcjY2MwZjE2Jyxcblx0ICAgICAgICAnUGF0aCc6ICcjZTQxZjExJyxcblx0ICAgICAgICAnUGF5UGFsIChkYXJrKSc6ICcjMWU0NzdhJyxcblx0ICAgICAgICAnUGF5UGFsIChsaWdodCknOiAnIzNiN2JiZicsXG5cdCAgICAgICAgJ1BpbmJvYXJkJzogJyMwMDAwZTYnLFxuXHQgICAgICAgICdQaW50ZXJlc3QnOiAnI2M4MjMyYycsXG5cdCAgICAgICAgJ1BsYXlTdGF0aW9uJzogJyM2NjVjYmUnLFxuXHQgICAgICAgICdQb2NrZXQnOiAnI2VlNDA1NicsXG5cdCAgICAgICAgJ1ByZXppJzogJyMzMThiZmYnLFxuXHQgICAgICAgICdQdXNoYSc6ICcjMGY3MWI0Jyxcblx0ICAgICAgICAnUXVvcmEnOiAnI2E4MjQwMCcsXG5cdCAgICAgICAgJ1FVT1RFLmZtJzogJyM2NmNlZmYnLFxuXHQgICAgICAgICdSZGlvJzogJyMwMDhmZDUnLFxuXHQgICAgICAgICdSZWFkYWJpbGl0eSc6ICcjOWMwMDAwJyxcblx0ICAgICAgICAnUmVkIEhhdCc6ICcjY2MwMDAwJyxcblx0ICAgICAgICAnUmVzb3VyY2UnOiAnIzdlYjQwMCcsXG5cdCAgICAgICAgJ1JvY2twYWNrJzogJyMwYmE2YWInLFxuXHQgICAgICAgICdSb29uJzogJyM2MmIwZDknLFxuXHQgICAgICAgICdSU1MnOiAnI2VlODAyZicsXG5cdCAgICAgICAgJ1NhbGVzZm9yY2UnOiAnIzE3OThjMScsXG5cdCAgICAgICAgJ1NhbXN1bmcnOiAnIzBjNGRhMicsXG5cdCAgICAgICAgJ1Nob3BpZnknOiAnIzk2YmY0OCcsXG5cdCAgICAgICAgJ1NreXBlJzogJyMwMGFmZjAnLFxuXHQgICAgICAgICdTbmFnYWpvYic6ICcjZjQ3YTIwJyxcblx0ICAgICAgICAnU29mdG9uaWMnOiAnIzAwOGFjZScsXG5cdCAgICAgICAgJ1NvdW5kQ2xvdWQnOiAnI2ZmNzcwMCcsXG5cdCAgICAgICAgJ1NwYWNlIEJveCc6ICcjZjg2OTYwJyxcblx0ICAgICAgICAnU3BvdGlmeSc6ICcjODFiNzFhJyxcblx0ICAgICAgICAnU3ByaW50JzogJyNmZWUxMDAnLFxuXHQgICAgICAgICdTcXVhcmVzcGFjZSc6ICcjMTIxMjEyJyxcblx0ICAgICAgICAnU3RhY2tPdmVyZmxvdyc6ICcjZWY4MjM2Jyxcblx0ICAgICAgICAnU3RhcGxlcyc6ICcjY2MwMDAwJyxcblx0ICAgICAgICAnU3RhdHVzIENoYXJ0JzogJyNkNzU4NGYnLFxuXHQgICAgICAgICdTdHJpcGUnOiAnIzAwOGNkZCcsXG5cdCAgICAgICAgJ1N0dWR5Qmx1ZSc6ICcjMDBhZmUxJyxcblx0ICAgICAgICAnU3R1bWJsZVVwb24nOiAnI2Y3NDQyNScsXG5cdCAgICAgICAgJ1QtTW9iaWxlJzogJyNlYTBhOGUnLFxuXHQgICAgICAgICdUZWNobm9yYXRpJzogJyM0MGE4MDAnLFxuXHQgICAgICAgICdUaGUgTmV4dCBXZWInOiAnI2VmNDQyMycsXG5cdCAgICAgICAgJ1RyZWVob3VzZSc6ICcjNWNiODY4Jyxcblx0ICAgICAgICAnVHJ1bGlhJzogJyM1ZWFiMWYnLFxuXHQgICAgICAgICdUdW1ibHInOiAnIzM0NTI2ZicsXG5cdCAgICAgICAgJ1R3aXRjaC50dic6ICcjNjQ0MWE1Jyxcblx0ICAgICAgICAnVHdpdHRlcic6ICcjMDBhY2VlJyxcblx0ICAgICAgICAnVFlQTzMnOiAnI2ZmODcwMCcsXG5cdCAgICAgICAgJ1VidW50dSc6ICcjZGQ0ODE0Jyxcblx0ICAgICAgICAnVXN0cmVhbSc6ICcjMzM4OGZmJyxcblx0ICAgICAgICAnVmVyaXpvbic6ICcjZWYxZDFkJyxcblx0ICAgICAgICAnVmltZW8nOiAnIzg2YzllZicsXG5cdCAgICAgICAgJ1ZpbmUnOiAnIzAwYTQ3OCcsXG5cdCAgICAgICAgJ1ZpcmInOiAnIzA2YWZkOCcsXG5cdCAgICAgICAgJ1ZpcmdpbiBNZWRpYSc6ICcjY2MwMDAwJyxcblx0ICAgICAgICAnV29vZ2EnOiAnIzViMDA5YycsXG5cdCAgICAgICAgJ1dvcmRQcmVzcyAoYmx1ZSknOiAnIzIxNzU5YicsXG5cdCAgICAgICAgJ1dvcmRQcmVzcyAob3JhbmdlKSc6ICcjZDU0ZTIxJyxcblx0ICAgICAgICAnV29yZFByZXNzIChncmV5KSc6ICcjNDY0NjQ2Jyxcblx0ICAgICAgICAnV3VuZGVybGlzdCc6ICcjMmI4OGQ5Jyxcblx0ICAgICAgICAnWEJPWCc6ICcjOWJjODQ4Jyxcblx0ICAgICAgICAnWElORyc6ICcjMTI2NTY3Jyxcblx0ICAgICAgICAnWWFob28hJzogJyM3MjBlOWUnLFxuXHQgICAgICAgICdZYW5kZXgnOiAnI2ZmY2MwMCcsXG5cdCAgICAgICAgJ1llbHAnOiAnI2M0MTIwMCcsXG5cdCAgICAgICAgJ1lvdVR1YmUnOiAnI2M0MzAyYicsXG5cdCAgICAgICAgJ1phbG9uZ28nOiAnIzU0OThkYycsXG5cdCAgICAgICAgJ1plbmRlc2snOiAnIzc4YTMwMCcsXG5cdCAgICAgICAgJ1plcnBseSc6ICcjOWRjYzdhJyxcblx0ICAgICAgICAnWm9vdG9vbCc6ICcjNWU4YjFkJ1xuXHQgICAgfSxcblx0ICAgIF9icmFuZE5hbWVzOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgYnJhbmRzID0gW107XG5cdCAgICAgICAgZm9yICh2YXIgYiBpbiB0aGlzLl9icmFuZENvbG9ycykge1xuXHQgICAgICAgICAgICBicmFuZHMucHVzaChiKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYnJhbmRzXG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICDnlJ/miJDkuIDmrrXpmo/mnLrnmoQgQmFzZTY0IOWbvueJh+e8lueggeOAglxuXG5cdCAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL2ltc2t5L2hvbGRlclxuXHQgICAgICAgIEhvbGRlciByZW5kZXJzIGltYWdlIHBsYWNlaG9sZGVycyBlbnRpcmVseSBvbiB0aGUgY2xpZW50IHNpZGUuXG5cblx0ICAgICAgICBkYXRhSW1hZ2VIb2xkZXI6IGZ1bmN0aW9uKHNpemUpIHtcblx0ICAgICAgICAgICAgcmV0dXJuICdob2xkZXIuanMvJyArIHNpemVcblx0ICAgICAgICB9LFxuXHQgICAgKi9cblx0ICAgIGRhdGFJbWFnZTogZnVuY3Rpb24oc2l6ZSwgdGV4dCkge1xuXHQgICAgICAgIHZhciBjYW52YXNcblx0ICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuXHQgICAgICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8qXG5cdCAgICAgICAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9ub2RlLWNhbnZhc1xuXHQgICAgICAgICAgICAgICAgICAgIG5wbSBpbnN0YWxsIGNhbnZhcyAtLXNhdmVcblx0ICAgICAgICAgICAgICAgIOWuieijhemXrumimO+8mlxuXHQgICAgICAgICAgICAgICAgKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIyOTUzMjA2L2d1bHAtaXNzdWVzLXdpdGgtY2FyaW8taW5zdGFsbC1jb21tYW5kLW5vdC1mb3VuZC13aGVuLXRyeWluZy10by1pbnN0YWxsaW5nLWNhbnZhXG5cdCAgICAgICAgICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL25vZGUtY2FudmFzL2lzc3Vlcy80MTVcblx0ICAgICAgICAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvbm9kZS1jYW52YXMvd2lraS9fcGFnZXNcblxuXHQgICAgICAgICAgICAgICAgUFPvvJpub2RlLWNhbnZhcyDnmoTlronoo4Xov4fnqIvlrp7lnKjmmK/lpKrnuYHnkJDkuobvvIzmiYDku6XkuI3mlL7lhaUgcGFja2FnZS5qc29uIOeahCBkZXBlbmRlbmNpZXPjgIJcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIHZhciBDYW52YXMgPSBtb2R1bGUucmVxdWlyZSgnY2FudmFzJylcblx0ICAgICAgICAgICAgY2FudmFzID0gbmV3IENhbnZhcygpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIGN0eCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCAmJiBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG5cdCAgICAgICAgaWYgKCFjYW52YXMgfHwgIWN0eCkgcmV0dXJuICcnXG5cblx0ICAgICAgICBpZiAoIXNpemUpIHNpemUgPSB0aGlzLnBpY2sodGhpcy5fYWRTaXplKVxuXHQgICAgICAgIHRleHQgPSB0ZXh0ICE9PSB1bmRlZmluZWQgPyB0ZXh0IDogc2l6ZVxuXG5cdCAgICAgICAgc2l6ZSA9IHNpemUuc3BsaXQoJ3gnKVxuXG5cdCAgICAgICAgdmFyIHdpZHRoID0gcGFyc2VJbnQoc2l6ZVswXSwgMTApLFxuXHQgICAgICAgICAgICBoZWlnaHQgPSBwYXJzZUludChzaXplWzFdLCAxMCksXG5cdCAgICAgICAgICAgIGJhY2tncm91bmQgPSB0aGlzLl9icmFuZENvbG9yc1t0aGlzLnBpY2sodGhpcy5fYnJhbmROYW1lcygpKV0sXG5cdCAgICAgICAgICAgIGZvcmVncm91bmQgPSAnI0ZGRicsXG5cdCAgICAgICAgICAgIHRleHRfaGVpZ2h0ID0gMTQsXG5cdCAgICAgICAgICAgIGZvbnQgPSAnc2Fucy1zZXJpZic7XG5cblx0ICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aFxuXHQgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcblx0ICAgICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcidcblx0ICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSdcblx0ICAgICAgICBjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZFxuXHQgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuXHQgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmb3JlZ3JvdW5kXG5cdCAgICAgICAgY3R4LmZvbnQgPSAnYm9sZCAnICsgdGV4dF9oZWlnaHQgKyAncHggJyArIGZvbnRcblx0ICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgKHdpZHRoIC8gMiksIChoZWlnaHQgLyAyKSwgd2lkdGgpXG5cdCAgICAgICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpXG5cdCAgICB9XG5cdH1cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oOSkobW9kdWxlKSkpXG5cbi8qKiovIH0sXG4vKiA5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdFx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdFx0bW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG1vZHVsZTtcclxuXHR9XHJcblxuXG4vKioqLyB9LFxuLyogMTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyBDb2xvclxuXG5cdCAgICBodHRwOi8vbGxsbGxsLmxpL3JhbmRvbUNvbG9yL1xuXHQgICAgICAgIEEgY29sb3IgZ2VuZXJhdG9yIGZvciBKYXZhU2NyaXB0LlxuXHQgICAgICAgIHJhbmRvbUNvbG9yIGdlbmVyYXRlcyBhdHRyYWN0aXZlIGNvbG9ycyBieSBkZWZhdWx0LiBNb3JlIHNwZWNpZmljYWxseSwgcmFuZG9tQ29sb3IgcHJvZHVjZXMgYnJpZ2h0IGNvbG9ycyB3aXRoIGEgcmVhc29uYWJseSBoaWdoIHNhdHVyYXRpb24uIFRoaXMgbWFrZXMgcmFuZG9tQ29sb3IgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgZGF0YSB2aXN1YWxpemF0aW9ucyBhbmQgZ2VuZXJhdGl2ZSBhcnQuXG5cblx0ICAgIGh0dHA6Ly9yYW5kb21jb2xvdXIuY29tL1xuXHQgICAgICAgIHZhciBiZ19jb2xvdXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNSkudG9TdHJpbmcoMTYpO1xuXHQgICAgICAgIGJnX2NvbG91ciA9IFwiI1wiICsgKFwiMDAwMDAwXCIgKyBiZ19jb2xvdXIpLnNsaWNlKC02KTtcblx0ICAgICAgICBkb2N1bWVudC5iZ0NvbG9yID0gYmdfY29sb3VyO1xuXHQgICAgXG5cdCAgICBodHRwOi8vbWFydGluLmFua2VybC5jb20vMjAwOS8xMi8wOS9ob3ctdG8tY3JlYXRlLXJhbmRvbS1jb2xvcnMtcHJvZ3JhbW1hdGljYWxseS9cblx0ICAgICAgICBDcmVhdGluZyByYW5kb20gY29sb3JzIGlzIGFjdHVhbGx5IG1vcmUgZGlmZmljdWx0IHRoYW4gaXQgc2VlbXMuIFRoZSByYW5kb21uZXNzIGl0c2VsZiBpcyBlYXN5LCBidXQgYWVzdGhldGljYWxseSBwbGVhc2luZyByYW5kb21uZXNzIGlzIG1vcmUgZGlmZmljdWx0LlxuXHQgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZvbmdvdmV0dC9jb2xvci1nZW5lcmF0b3JcblxuXHQgICAgaHR0cDovL3d3dy5wYXVsaXJpc2guY29tLzIwMDkvcmFuZG9tLWhleC1jb2xvci1jb2RlLXNuaXBwZXRzL1xuXHQgICAgICAgIFJhbmRvbSBIZXggQ29sb3IgQ29kZSBHZW5lcmF0b3IgaW4gSmF2YVNjcmlwdFxuXG5cdCAgICBodHRwOi8vY2hhbmNlanMuY29tLyNjb2xvclxuXHQgICAgICAgIGNoYW5jZS5jb2xvcigpXG5cdCAgICAgICAgLy8gPT4gJyM3OWMxNTcnXG5cdCAgICAgICAgY2hhbmNlLmNvbG9yKHtmb3JtYXQ6ICdoZXgnfSlcblx0ICAgICAgICAvLyA9PiAnI2Q2NzExOCdcblx0ICAgICAgICBjaGFuY2UuY29sb3Ioe2Zvcm1hdDogJ3Nob3J0aGV4J30pXG5cdCAgICAgICAgLy8gPT4gJyM2MGYnXG5cdCAgICAgICAgY2hhbmNlLmNvbG9yKHtmb3JtYXQ6ICdyZ2InfSlcblx0ICAgICAgICAvLyA9PiAncmdiKDExMCw1MiwxNjQpJ1xuXG5cdCAgICBodHRwOi8vdG9vbC5jN3NreS5jb20vd2ViY29sb3Jcblx0ICAgICAgICDnvZHpobXorr7orqHluLjnlKjoibLlvanmkK3phY3ooahcblx0ICAgIFxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL09uZS1jb20vb25lLWNvbG9yXG5cdCAgICAgICAgQW4gT08tYmFzZWQgSmF2YVNjcmlwdCBjb2xvciBwYXJzZXIvY29tcHV0YXRpb24gdG9vbGtpdCB3aXRoIHN1cHBvcnQgZm9yIFJHQiwgSFNWLCBIU0wsIENNWUssIGFuZCBhbHBoYSBjaGFubmVscy5cblx0ICAgICAgICBBUEkg5b6I6LWeXG5cblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9oYXJ0aHVyL2NvbG9yXG5cdCAgICAgICAgSmF2YVNjcmlwdCBjb2xvciBjb252ZXJzaW9uIGFuZCBtYW5pcHVsYXRpb24gbGlicmFyeVxuXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vbGVhdmVyb3UvY3NzLWNvbG9yc1xuXHQgICAgICAgIFNoYXJlICYgY29udmVydCBDU1MgY29sb3JzXG5cdCAgICBodHRwOi8vbGVhdmVyb3UuZ2l0aHViLmlvL2Nzcy1jb2xvcnMvI3NsYXRlZ3JheVxuXHQgICAgICAgIFR5cGUgYSBDU1MgY29sb3Iga2V5d29yZCwgI2hleCwgaHNsKCksIHJnYmEoKSwgd2hhdGV2ZXI6XG5cblx0ICAgIOiJsuiwgyBodWVcblx0ICAgICAgICBodHRwOi8vYmFpa2UuYmFpZHUuY29tL3ZpZXcvMjMzNjguaHRtXG5cdCAgICAgICAg6Imy6LCD5oyH55qE5piv5LiA5bmF55S75Lit55S76Z2i6Imy5b2p55qE5oC75L2T5YC+5ZCR77yM5piv5aSn55qE6Imy5b2p5pWI5p6c44CCXG5cdCAgICDppbHlkozluqYgc2F0dXJhdGlvblxuXHQgICAgICAgIGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8xODk2NDQuaHRtXG5cdCAgICAgICAg6aWx5ZKM5bqm5piv5oyH6Imy5b2p55qE6bKc6Imz56iL5bqm77yM5Lmf56ew6Imy5b2p55qE57qv5bqm44CC6aWx5ZKM5bqm5Y+W5Yaz5LqO6K+l6Imy5Lit5ZCr6Imy5oiQ5YiG5ZKM5raI6Imy5oiQ5YiG77yI54Gw6Imy77yJ55qE5q+U5L6L44CC5ZCr6Imy5oiQ5YiG6LaK5aSn77yM6aWx5ZKM5bqm6LaK5aSn77yb5raI6Imy5oiQ5YiG6LaK5aSn77yM6aWx5ZKM5bqm6LaK5bCP44CCXG5cdCAgICDkuq7luqYgYnJpZ2h0bmVzc1xuXHQgICAgICAgIGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8zNDc3My5odG1cblx0ICAgICAgICDkuq7luqbmmK/mjIflj5HlhYnkvZPvvIjlj43lhYnkvZPvvInooajpnaLlj5HlhYnvvIjlj43lhYnvvInlvLrlvLHnmoTniannkIbph4/jgIJcblx0ICAgIOeFp+W6piBsdW1pbm9zaXR5XG5cdCAgICAgICAg54mp5L2T6KKr54Wn5Lqu55qE56iL5bqmLOmHh+eUqOWNleS9jemdouenr+aJgOaOpeWPl+eahOWFiemAmumHj+adpeihqOekuizooajnpLrljZXkvY3kuLrli5Jb5YWL5pavXShMdXgsbHgpICzljbMgMW0gLyBtMiDjgIJcblxuXHQgICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDg0NTA2L3JhbmRvbS1jb2xvci1nZW5lcmF0b3ItaW4tamF2YXNjcmlwdFxuXHQgICAgICAgIHZhciBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnLnNwbGl0KCcnKVxuXHQgICAgICAgIHZhciBjb2xvciA9ICcjJ1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG5cdCAgICAgICAgICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gY29sb3Jcblx0ICAgIFxuXHQgICAgICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quaXoOiEkeeahOminOiJsu+8jOagvOW8j+S4uiAnI1JSR0dCQifjgIJcblx0ICAgICAgICAvLyBfYnJhaW5sZXNzQ29sb3IoKVxuXHQgICAgICAgIHZhciBjb2xvciA9IE1hdGguZmxvb3IoXG5cdCAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuXHQgICAgICAgICAgICAoMTYgKiAxNiAqIDE2ICogMTYgKiAxNiAqIDE2IC0gMSlcblx0ICAgICAgICApLnRvU3RyaW5nKDE2KVxuXHQgICAgICAgIGNvbG9yID0gXCIjXCIgKyAoXCIwMDAwMDBcIiArIGNvbG9yKS5zbGljZSgtNilcblx0ICAgICAgICByZXR1cm4gY29sb3IudG9VcHBlckNhc2UoKVxuXHQqL1xuXG5cdHZhciBDb252ZXJ0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSlcblx0dmFyIERJQ1QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5pyJ5ZC45byV5Yqb55qE6aKc6Imy77yM5qC85byP5Li6ICcjUlJHR0JCJ+OAglxuXHQgICAgY29sb3I6IGZ1bmN0aW9uKG5hbWUpIHtcblx0ICAgICAgICBpZiAobmFtZSB8fCBESUNUW25hbWVdKSByZXR1cm4gRElDVFtuYW1lXS5uaWNlclxuXHQgICAgICAgIHJldHVybiB0aGlzLmhleCgpXG5cdCAgICB9LFxuXHQgICAgLy8gI0RBQzBERVxuXHQgICAgaGV4OiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG5cdCAgICAgICAgdmFyIHJnYiA9IENvbnZlcnQuaHN2MnJnYihoc3YpXG5cdCAgICAgICAgdmFyIGhleCA9IENvbnZlcnQucmdiMmhleChyZ2JbMF0sIHJnYlsxXSwgcmdiWzJdKVxuXHQgICAgICAgIHJldHVybiBoZXhcblx0ICAgIH0sXG5cdCAgICAvLyByZ2IoMTI4LDI1NSwyNTUpXG5cdCAgICByZ2I6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciBoc3YgPSB0aGlzLl9nb2xkZW5SYXRpb0NvbG9yKClcblx0ICAgICAgICB2YXIgcmdiID0gQ29udmVydC5oc3YycmdiKGhzdilcblx0ICAgICAgICByZXR1cm4gJ3JnYignICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQocmdiWzBdLCAxMCkgKyAnLCAnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQocmdiWzFdLCAxMCkgKyAnLCAnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQocmdiWzJdLCAxMCkgKyAnKSdcblx0ICAgIH0sXG5cdCAgICAvLyByZ2JhKDEyOCwyNTUsMjU1LDAuMylcblx0ICAgIHJnYmE6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciBoc3YgPSB0aGlzLl9nb2xkZW5SYXRpb0NvbG9yKClcblx0ICAgICAgICB2YXIgcmdiID0gQ29udmVydC5oc3YycmdiKGhzdilcblx0ICAgICAgICByZXR1cm4gJ3JnYmEoJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KHJnYlswXSwgMTApICsgJywgJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KHJnYlsxXSwgMTApICsgJywgJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KHJnYlsyXSwgMTApICsgJywgJyArXG5cdCAgICAgICAgICAgIE1hdGgucmFuZG9tKCkudG9GaXhlZCgyKSArICcpJ1xuXHQgICAgfSxcblx0ICAgIC8vIGhzbCgzMDAsODAlLDkwJSlcblx0ICAgIGhzbDogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIGhzdiA9IHRoaXMuX2dvbGRlblJhdGlvQ29sb3IoKVxuXHQgICAgICAgIHZhciBoc2wgPSBDb252ZXJ0LmhzdjJoc2woaHN2KVxuXHQgICAgICAgIHJldHVybiAnaHNsKCcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChoc2xbMF0sIDEwKSArICcsICcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChoc2xbMV0sIDEwKSArICcsICcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChoc2xbMl0sIDEwKSArICcpJ1xuXHQgICAgfSxcblx0ICAgIC8vIGh0dHA6Ly9tYXJ0aW4uYW5rZXJsLmNvbS8yMDA5LzEyLzA5L2hvdy10by1jcmVhdGUtcmFuZG9tLWNvbG9ycy1wcm9ncmFtbWF0aWNhbGx5L1xuXHQgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rldm9uZ292ZXR0L2NvbG9yLWdlbmVyYXRvci9ibG9iL21hc3Rlci9pbmRleC5qc1xuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5pyJ5ZC45byV5Yqb55qE6aKc6Imy44CCXG5cdCAgICBfZ29sZGVuUmF0aW9Db2xvcjogZnVuY3Rpb24oc2F0dXJhdGlvbiwgdmFsdWUpIHtcblx0ICAgICAgICB0aGlzLl9nb2xkZW5SYXRpbyA9IDAuNjE4MDMzOTg4NzQ5ODk1XG5cdCAgICAgICAgdGhpcy5faHVlID0gdGhpcy5faHVlIHx8IE1hdGgucmFuZG9tKClcblx0ICAgICAgICB0aGlzLl9odWUgKz0gdGhpcy5fZ29sZGVuUmF0aW9cblx0ICAgICAgICB0aGlzLl9odWUgJT0gMVxuXG5cdCAgICAgICAgaWYgKHR5cGVvZiBzYXR1cmF0aW9uICE9PSBcIm51bWJlclwiKSBzYXR1cmF0aW9uID0gMC41O1xuXHQgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHZhbHVlID0gMC45NTtcblxuXHQgICAgICAgIHJldHVybiBbXG5cdCAgICAgICAgICAgIHRoaXMuX2h1ZSAqIDM2MCxcblx0ICAgICAgICAgICAgc2F0dXJhdGlvbiAqIDEwMCxcblx0ICAgICAgICAgICAgdmFsdWUgKiAxMDBcblx0ICAgICAgICBdXG5cdCAgICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgQ29sb3IgQ29udmVydFxuXG5cdCAgICBodHRwOi8vYmxvZy5jc2RuLm5ldC9pZGZheWEvYXJ0aWNsZS9kZXRhaWxzLzY3NzA0MTRcblx0ICAgICAgICDpopzoibLnqbrpl7RSR0LkuI5IU1YoSFNMKeeahOi9rOaNolxuXHQqL1xuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vaGFydGh1ci9jb2xvci1jb252ZXJ0L2Jsb2IvbWFzdGVyL2NvbnZlcnNpb25zLmpzXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHRcdHJnYjJoc2w6IGZ1bmN0aW9uIHJnYjJoc2wocmdiKSB7XG5cdFx0XHR2YXIgciA9IHJnYlswXSAvIDI1NSxcblx0XHRcdFx0ZyA9IHJnYlsxXSAvIDI1NSxcblx0XHRcdFx0YiA9IHJnYlsyXSAvIDI1NSxcblx0XHRcdFx0bWluID0gTWF0aC5taW4ociwgZywgYiksXG5cdFx0XHRcdG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuXHRcdFx0XHRkZWx0YSA9IG1heCAtIG1pbixcblx0XHRcdFx0aCwgcywgbDtcblxuXHRcdFx0aWYgKG1heCA9PSBtaW4pXG5cdFx0XHRcdGggPSAwO1xuXHRcdFx0ZWxzZSBpZiAociA9PSBtYXgpXG5cdFx0XHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdFx0XHRlbHNlIGlmIChnID09IG1heClcblx0XHRcdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdFx0XHRlbHNlIGlmIChiID09IG1heClcblx0XHRcdFx0aCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cblx0XHRcdGggPSBNYXRoLm1pbihoICogNjAsIDM2MCk7XG5cblx0XHRcdGlmIChoIDwgMClcblx0XHRcdFx0aCArPSAzNjA7XG5cblx0XHRcdGwgPSAobWluICsgbWF4KSAvIDI7XG5cblx0XHRcdGlmIChtYXggPT0gbWluKVxuXHRcdFx0XHRzID0gMDtcblx0XHRcdGVsc2UgaWYgKGwgPD0gMC41KVxuXHRcdFx0XHRzID0gZGVsdGEgLyAobWF4ICsgbWluKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0cyA9IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pO1xuXG5cdFx0XHRyZXR1cm4gW2gsIHMgKiAxMDAsIGwgKiAxMDBdO1xuXHRcdH0sXG5cdFx0cmdiMmhzdjogZnVuY3Rpb24gcmdiMmhzdihyZ2IpIHtcblx0XHRcdHZhciByID0gcmdiWzBdLFxuXHRcdFx0XHRnID0gcmdiWzFdLFxuXHRcdFx0XHRiID0gcmdiWzJdLFxuXHRcdFx0XHRtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcblx0XHRcdFx0bWF4ID0gTWF0aC5tYXgociwgZywgYiksXG5cdFx0XHRcdGRlbHRhID0gbWF4IC0gbWluLFxuXHRcdFx0XHRoLCBzLCB2O1xuXG5cdFx0XHRpZiAobWF4ID09PSAwKVxuXHRcdFx0XHRzID0gMDtcblx0XHRcdGVsc2Vcblx0XHRcdFx0cyA9IChkZWx0YSAvIG1heCAqIDEwMDApIC8gMTA7XG5cblx0XHRcdGlmIChtYXggPT0gbWluKVxuXHRcdFx0XHRoID0gMDtcblx0XHRcdGVsc2UgaWYgKHIgPT0gbWF4KVxuXHRcdFx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHRcdFx0ZWxzZSBpZiAoZyA9PSBtYXgpXG5cdFx0XHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHRcdFx0ZWxzZSBpZiAoYiA9PSBtYXgpXG5cdFx0XHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXG5cdFx0XHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdFx0XHRpZiAoaCA8IDApXG5cdFx0XHRcdGggKz0gMzYwO1xuXG5cdFx0XHR2ID0gKChtYXggLyAyNTUpICogMTAwMCkgLyAxMDtcblxuXHRcdFx0cmV0dXJuIFtoLCBzLCB2XTtcblx0XHR9LFxuXHRcdGhzbDJyZ2I6IGZ1bmN0aW9uIGhzbDJyZ2IoaHNsKSB7XG5cdFx0XHR2YXIgaCA9IGhzbFswXSAvIDM2MCxcblx0XHRcdFx0cyA9IGhzbFsxXSAvIDEwMCxcblx0XHRcdFx0bCA9IGhzbFsyXSAvIDEwMCxcblx0XHRcdFx0dDEsIHQyLCB0MywgcmdiLCB2YWw7XG5cblx0XHRcdGlmIChzID09PSAwKSB7XG5cdFx0XHRcdHZhbCA9IGwgKiAyNTU7XG5cdFx0XHRcdHJldHVybiBbdmFsLCB2YWwsIHZhbF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChsIDwgMC41KVxuXHRcdFx0XHR0MiA9IGwgKiAoMSArIHMpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0MiA9IGwgKyBzIC0gbCAqIHM7XG5cdFx0XHR0MSA9IDIgKiBsIC0gdDI7XG5cblx0XHRcdHJnYiA9IFswLCAwLCAwXTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHRcdHQzID0gaCArIDEgLyAzICogLShpIC0gMSk7XG5cdFx0XHRcdGlmICh0MyA8IDApIHQzKys7XG5cdFx0XHRcdGlmICh0MyA+IDEpIHQzLS07XG5cblx0XHRcdFx0aWYgKDYgKiB0MyA8IDEpXG5cdFx0XHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG5cdFx0XHRcdGVsc2UgaWYgKDIgKiB0MyA8IDEpXG5cdFx0XHRcdFx0dmFsID0gdDI7XG5cdFx0XHRcdGVsc2UgaWYgKDMgKiB0MyA8IDIpXG5cdFx0XHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiAoMiAvIDMgLSB0MykgKiA2O1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dmFsID0gdDE7XG5cblx0XHRcdFx0cmdiW2ldID0gdmFsICogMjU1O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmdiO1xuXHRcdH0sXG5cdFx0aHNsMmhzdjogZnVuY3Rpb24gaHNsMmhzdihoc2wpIHtcblx0XHRcdHZhciBoID0gaHNsWzBdLFxuXHRcdFx0XHRzID0gaHNsWzFdIC8gMTAwLFxuXHRcdFx0XHRsID0gaHNsWzJdIC8gMTAwLFxuXHRcdFx0XHRzdiwgdjtcblx0XHRcdGwgKj0gMjtcblx0XHRcdHMgKj0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG5cdFx0XHR2ID0gKGwgKyBzKSAvIDI7XG5cdFx0XHRzdiA9ICgyICogcykgLyAobCArIHMpO1xuXHRcdFx0cmV0dXJuIFtoLCBzdiAqIDEwMCwgdiAqIDEwMF07XG5cdFx0fSxcblx0XHRoc3YycmdiOiBmdW5jdGlvbiBoc3YycmdiKGhzdikge1xuXHRcdFx0dmFyIGggPSBoc3ZbMF0gLyA2MFxuXHRcdFx0dmFyIHMgPSBoc3ZbMV0gLyAxMDBcblx0XHRcdHZhciB2ID0gaHN2WzJdIC8gMTAwXG5cdFx0XHR2YXIgaGkgPSBNYXRoLmZsb29yKGgpICUgNlxuXG5cdFx0XHR2YXIgZiA9IGggLSBNYXRoLmZsb29yKGgpXG5cdFx0XHR2YXIgcCA9IDI1NSAqIHYgKiAoMSAtIHMpXG5cdFx0XHR2YXIgcSA9IDI1NSAqIHYgKiAoMSAtIChzICogZikpXG5cdFx0XHR2YXIgdCA9IDI1NSAqIHYgKiAoMSAtIChzICogKDEgLSBmKSkpXG5cblx0XHRcdHYgPSAyNTUgKiB2XG5cblx0XHRcdHN3aXRjaCAoaGkpIHtcblx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdHJldHVybiBbdiwgdCwgcF1cblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdHJldHVybiBbcSwgdiwgcF1cblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdHJldHVybiBbcCwgdiwgdF1cblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdHJldHVybiBbcCwgcSwgdl1cblx0XHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRcdHJldHVybiBbdCwgcCwgdl1cblx0XHRcdFx0Y2FzZSA1OlxuXHRcdFx0XHRcdHJldHVybiBbdiwgcCwgcV1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGhzdjJoc2w6IGZ1bmN0aW9uIGhzdjJoc2woaHN2KSB7XG5cdFx0XHR2YXIgaCA9IGhzdlswXSxcblx0XHRcdFx0cyA9IGhzdlsxXSAvIDEwMCxcblx0XHRcdFx0diA9IGhzdlsyXSAvIDEwMCxcblx0XHRcdFx0c2wsIGw7XG5cblx0XHRcdGwgPSAoMiAtIHMpICogdjtcblx0XHRcdHNsID0gcyAqIHY7XG5cdFx0XHRzbCAvPSAobCA8PSAxKSA/IGwgOiAyIC0gbDtcblx0XHRcdGwgLz0gMjtcblx0XHRcdHJldHVybiBbaCwgc2wgKiAxMDAsIGwgKiAxMDBdO1xuXHRcdH0sXG5cdFx0Ly8gaHR0cDovL3d3dy4xNDBieXQuZXMva2V5d29yZHMvY29sb3Jcblx0XHRyZ2IyaGV4OiBmdW5jdGlvbihcblx0XHRcdGEsIC8vIHJlZCwgYXMgYSBudW1iZXIgZnJvbSAwIHRvIDI1NVxuXHRcdFx0YiwgLy8gZ3JlZW4sIGFzIGEgbnVtYmVyIGZyb20gMCB0byAyNTVcblx0XHRcdGMgLy8gYmx1ZSwgYXMgYSBudW1iZXIgZnJvbSAwIHRvIDI1NVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIFwiI1wiICsgKCgyNTYgKyBhIDw8IDggfCBiKSA8PCA4IHwgYykudG9TdHJpbmcoMTYpLnNsaWNlKDEpXG5cdFx0fSxcblx0XHRoZXgycmdiOiBmdW5jdGlvbihcblx0XHRcdGEgLy8gdGFrZSBhIFwiI3h4eHh4eFwiIGhleCBzdHJpbmcsXG5cdFx0KSB7XG5cdFx0XHRhID0gJzB4JyArIGEuc2xpY2UoMSkucmVwbGFjZShhLmxlbmd0aCA+IDQgPyBhIDogLy4vZywgJyQmJCYnKSB8IDA7XG5cdFx0XHRyZXR1cm4gW2EgPj4gMTYsIGEgPj4gOCAmIDI1NSwgYSAmIDI1NV1cblx0XHR9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDEyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgQ29sb3Ig5a2X5YW45pWw5o2uXG5cblx0ICAgIOWtl+WFuOaVsOaNruadpea6kCBbQSBuaWNlciBjb2xvciBwYWxldHRlIGZvciB0aGUgd2ViXShodHRwOi8vY2xycy5jYy8pXG5cdCovXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy8gbmFtZSB2YWx1ZSBuaWNlclxuXHQgICAgbmF2eToge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwMDA4MCcsXG5cdCAgICAgICAgbmljZXI6ICcjMDAxRjNGJ1xuXHQgICAgfSxcblx0ICAgIGJsdWU6IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMDAwZmYnLFxuXHQgICAgICAgIG5pY2VyOiAnIzAwNzREOSdcblx0ICAgIH0sXG5cdCAgICBhcXVhOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDBmZmZmJyxcblx0ICAgICAgICBuaWNlcjogJyM3RkRCRkYnXG5cdCAgICB9LFxuXHQgICAgdGVhbDoge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwODA4MCcsXG5cdCAgICAgICAgbmljZXI6ICcjMzlDQ0NDJ1xuXHQgICAgfSxcblx0ICAgIG9saXZlOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDA4MDAwJyxcblx0ICAgICAgICBuaWNlcjogJyMzRDk5NzAnXG5cdCAgICB9LFxuXHQgICAgZ3JlZW46IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMDgwMDAnLFxuXHQgICAgICAgIG5pY2VyOiAnIzJFQ0M0MCdcblx0ICAgIH0sXG5cdCAgICBsaW1lOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDBmZjAwJyxcblx0ICAgICAgICBuaWNlcjogJyMwMUZGNzAnXG5cdCAgICB9LFxuXHQgICAgeWVsbG93OiB7XG5cdCAgICAgICAgdmFsdWU6ICcjZmZmZjAwJyxcblx0ICAgICAgICBuaWNlcjogJyNGRkRDMDAnXG5cdCAgICB9LFxuXHQgICAgb3JhbmdlOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjZmZhNTAwJyxcblx0ICAgICAgICBuaWNlcjogJyNGRjg1MUInXG5cdCAgICB9LFxuXHQgICAgcmVkOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjZmYwMDAwJyxcblx0ICAgICAgICBuaWNlcjogJyNGRjQxMzYnXG5cdCAgICB9LFxuXHQgICAgbWFyb29uOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjODAwMDAwJyxcblx0ICAgICAgICBuaWNlcjogJyM4NTE0NEInXG5cdCAgICB9LFxuXHQgICAgZnVjaHNpYToge1xuXHQgICAgICAgIHZhbHVlOiAnI2ZmMDBmZicsXG5cdCAgICAgICAgbmljZXI6ICcjRjAxMkJFJ1xuXHQgICAgfSxcblx0ICAgIHB1cnBsZToge1xuXHQgICAgICAgIHZhbHVlOiAnIzgwMDA4MCcsXG5cdCAgICAgICAgbmljZXI6ICcjQjEwREM5J1xuXHQgICAgfSxcblx0ICAgIHNpbHZlcjoge1xuXHQgICAgICAgIHZhbHVlOiAnI2MwYzBjMCcsXG5cdCAgICAgICAgbmljZXI6ICcjREREREREJ1xuXHQgICAgfSxcblx0ICAgIGdyYXk6IHtcblx0ICAgICAgICB2YWx1ZTogJyM4MDgwODAnLFxuXHQgICAgICAgIG5pY2VyOiAnI0FBQUFBQSdcblx0ICAgIH0sXG5cdCAgICBibGFjazoge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwMDAwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjMTExMTExJ1xuXHQgICAgfSxcblx0ICAgIHdoaXRlOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjRkZGRkZGJyxcblx0ICAgICAgICBuaWNlcjogJyNGRkZGRkYnXG5cdCAgICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDEzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgVGV4dFxuXG5cdCAgICBodHRwOi8vd3d3LmxpcHN1bS5jb20vXG5cdCovXG5cdHZhciBCYXNpYyA9IF9fd2VicGFja19yZXF1aXJlX18oNilcblx0dmFyIEhlbHBlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpXG5cblx0ZnVuY3Rpb24gcmFuZ2UoZGVmYXVsdE1pbiwgZGVmYXVsdE1heCwgbWluLCBtYXgpIHtcblx0ICAgIHJldHVybiBtaW4gPT09IHVuZGVmaW5lZCA/IEJhc2ljLm5hdHVyYWwoZGVmYXVsdE1pbiwgZGVmYXVsdE1heCkgOiAvLyAoKVxuXHQgICAgICAgIG1heCA9PT0gdW5kZWZpbmVkID8gbWluIDogLy8gKCBsZW4gKVxuXHQgICAgICAgIEJhc2ljLm5hdHVyYWwocGFyc2VJbnQobWluLCAxMCksIHBhcnNlSW50KG1heCwgMTApKSAvLyAoIG1pbiwgbWF4IClcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5q615paH5pys44CCXG5cdCAgICBwYXJhZ3JhcGg6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDcsIG1pbiwgbWF4KVxuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5zZW50ZW5jZSgpKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKVxuXHQgICAgfSxcblx0ICAgIC8vIFxuXHQgICAgY3BhcmFncmFwaDogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMywgNywgbWluLCBtYXgpXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmNzZW50ZW5jZSgpKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5Y+l5a2Q77yM56ys5LiA5Liq5Y2V6K+N55qE6aaW5a2X5q+N5aSn5YaZ44CCXG5cdCAgICBzZW50ZW5jZTogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMTIsIDE4LCBtaW4sIG1heClcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMud29yZCgpKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gSGVscGVyLmNhcGl0YWxpemUocmVzdWx0LmpvaW4oJyAnKSkgKyAnLidcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrkuK3mloflj6XlrZDjgIJcblx0ICAgIGNzZW50ZW5jZTogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMTIsIDE4LCBtaW4sIG1heClcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3dvcmQoKSlcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpICsgJ+OAgidcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrljZXor43jgIJcblx0ICAgIHdvcmQ6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDEwLCBtaW4sIG1heClcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQgKz0gQmFzaWMuY2hhcmFjdGVyKCdsb3dlcicpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrmiJblpJrkuKrmsYnlrZfjgIJcblx0ICAgIGN3b3JkOiBmdW5jdGlvbihwb29sLCBtaW4sIG1heCkge1xuXHQgICAgICAgIC8vIOacgOW4uOeUqOeahCA1MDAg5Liq5rGJ5a2XIGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy81Njg0MzYuaHRtXG5cdCAgICAgICAgdmFyIERJQ1RfS0FOWkkgPSAn55qE5LiA5piv5Zyo5LiN5LqG5pyJ5ZKM5Lq66L+Z5Lit5aSn5Li65LiK5Liq5Zu95oiR5Lul6KaB5LuW5pe25p2l55So5Lus55Sf5Yiw5L2c5Zyw5LqO5Ye65bCx5YiG5a+55oiQ5Lya5Y+v5Li75Y+R5bm05Yqo5ZCM5bel5Lmf6IO95LiL6L+H5a2Q6K+05Lqn56eN6Z2i6ICM5pa55ZCO5aSa5a6a6KGM5a2m5rOV5omA5rCR5b6X57uP5Y2B5LiJ5LmL6L+b552A562J6YOo5bqm5a6255S15Yqb6YeM5aaC5rC05YyW6auY6Ieq5LqM55CG6LW35bCP54mp546w5a6e5Yqg6YeP6YO95Lik5L2T5Yi25py65b2T5L2/54K55LuO5Lia5pys5Y675oqK5oCn5aW95bqU5byA5a6D5ZCI6L+Y5Zug55Sx5YW25Lqb54S25YmN5aSW5aSp5pS/5Zub5pel6YKj56S+5LmJ5LqL5bmz5b2i55u45YWo6KGo6Ze05qC35LiO5YWz5ZCE6YeN5paw57q/5YaF5pWw5q2j5b+D5Y+N5L2g5piO55yL5Y6f5Y+I5LmI5Yip5q+U5oiW5L2G6LSo5rCU56ys5ZCR6YGT5ZG95q2k5Y+Y5p2h5Y+q5rKh57uT6Kej6Zeu5oSP5bu65pyI5YWs5peg57O75Yab5b6I5oOF6ICF5pyA56uL5Luj5oOz5bey6YCa5bm25o+Q55u06aKY5YWa56iL5bGV5LqU5p6c5paZ6LGh5ZGY6Z2p5L2N5YWl5bi45paH5oC75qyh5ZOB5byP5rS76K6+5Y+K566h54m55Lu26ZW/5rGC6ICB5aS05Z+66LWE6L655rWB6Lev57qn5bCR5Zu+5bGx57uf5o6l55+l6L6D5bCG57uE6KeB6K6h5Yir5aW55omL6KeS5pyf5qC56K666L+Q5Yac5oyH5Yeg5Lmd5Yy65by65pS+5Yaz6KW/6KKr5bmy5YGa5b+F5oiY5YWI5Zue5YiZ5Lu75Y+W5o2u5aSE6Zif5Y2X57uZ6Imy5YWJ6Zeo5Y2z5L+d5rK75YyX6YCg55m+6KeE54Ot6aKG5LiD5rW35Y+j5Lic5a+85Zmo5Y6L5b+X5LiW6YeR5aKe5LqJ5rWO6Zi25rK55oCd5pyv5p6B5Lqk5Y+X6IGU5LuA6K6k5YWt5YWx5p2D5pS26K+B5pS55riF5bex576O5YaN6YeH6L2s5pu05Y2V6aOO5YiH5omT55m95pWZ6YCf6Iqx5bim5a6J5Zy66Lqr6L2m5L6L55yf5Yqh5YW35LiH5q+P55uu6Iez6L6+6LWw56ev56S66K6u5aOw5oql5paX5a6M57G75YWr56a75Y2O5ZCN56Gu5omN56eR5byg5L+h6ams6IqC6K+d57Gz5pW056m65YWD5Ya15LuK6ZuG5rip5Lyg5Zyf6K645q2l576k5bm/55+z6K6w6ZyA5q6156CU55WM5ouJ5p6X5b6L5Y+r5LiU56m26KeC6LaK57uH6KOF5b2x566X5L2O5oyB6Z+z5LyX5Lmm5biD5aSN5a655YS/6aG76ZmF5ZWG6Z2e6aqM6L+e5pat5rex6Zq+6L+R55+/5Y2D5ZGo5aeU57Sg5oqA5aSH5Y2K5Yqe6Z2S55yB5YiX5Lmg5ZON57qm5pSv6Iis5Y+y5oSf5Yqz5L6/5Zui5b6A6YW45Y6G5biC5YWL5L2V6Zmk5raI5p6E5bqc56ew5aSq5YeG57K+5YC85Y+3546H5peP57u05YiS6YCJ5qCH5YaZ5a2Y5YCZ5q+b5Lqy5b+r5pWI5pav6Zmi5p+l5rGf5Z6L55y8546L5oyJ5qC85YW75piT572u5rS+5bGC54mH5aeL5Y205LiT54q26IKy5Y6C5Lqs6K+G6YCC5bGe5ZyG5YyF54Gr5L2P6LCD5ruh5Y6/5bGA54Wn5Y+C57qi57uG5byV5ZCs6K+l6ZOB5Lu35Lil6b6Z6aOeJ1xuXG5cdCAgICAgICAgdmFyIGxlblxuXHQgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHQgICAgICAgICAgICBjYXNlIDA6IC8vICgpXG5cdCAgICAgICAgICAgICAgICBwb29sID0gRElDVF9LQU5aSVxuXHQgICAgICAgICAgICAgICAgbGVuID0gMVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAxOiAvLyAoIHBvb2wgKVxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGVuID0gMVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyAoIGxlbmd0aCApXG5cdCAgICAgICAgICAgICAgICAgICAgbGVuID0gcG9vbFxuXHQgICAgICAgICAgICAgICAgICAgIHBvb2wgPSBESUNUX0tBTlpJXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDI6XG5cdCAgICAgICAgICAgICAgICAvLyAoIHBvb2wsIGxlbmd0aCApXG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZW4gPSBtaW5cblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gKCBtaW4sIG1heCApXG5cdCAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5uYXR1cmFsKHBvb2wsIG1pbilcblx0ICAgICAgICAgICAgICAgICAgICBwb29sID0gRElDVF9LQU5aSVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5uYXR1cmFsKG1pbiwgbWF4KVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgcmVzdWx0ID0gJydcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdCArPSBwb29sLmNoYXJBdCh0aGlzLm5hdHVyYWwoMCwgcG9vbC5sZW5ndGggLSAxKSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOWPpeagh+mimO+8jOWFtuS4reavj+S4quWNleivjeeahOmmluWtl+avjeWkp+WGmeOAglxuXHQgICAgdGl0bGU6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDcsIG1pbiwgbWF4KVxuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJylcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDlj6XkuK3mlofmoIfpopjjgIJcblx0ICAgIGN0aXRsZTogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICB2YXIgbGVuID0gcmFuZ2UoMywgNywgbWluLCBtYXgpXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmN3b3JkKCkpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQuam9pbignJylcblx0ICAgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyBIZWxwZXJzXG5cdCovXG5cblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0Ly8g5oqK5a2X56ym5Liy55qE56ys5LiA5Liq5a2X5q+N6L2s5o2i5Li65aSn5YaZ44CCXG5cdFx0Y2FwaXRhbGl6ZTogZnVuY3Rpb24od29yZCkge1xuXHRcdFx0cmV0dXJuICh3b3JkICsgJycpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgKHdvcmQgKyAnJykuc3Vic3RyKDEpXG5cdFx0fSxcblx0XHQvLyDmiorlrZfnrKbkuLLovazmjaLkuLrlpKflhpnjgIJcblx0XHR1cHBlcjogZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRyZXR1cm4gKHN0ciArICcnKS50b1VwcGVyQ2FzZSgpXG5cdFx0fSxcblx0XHQvLyDmiorlrZfnrKbkuLLovazmjaLkuLrlsI/lhpnjgIJcblx0XHRsb3dlcjogZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRyZXR1cm4gKHN0ciArICcnKS50b0xvd2VyQ2FzZSgpXG5cdFx0fSxcblx0XHQvLyDku47mlbDnu4TkuK3pmo/mnLrpgInlj5bkuIDkuKrlhYPntKDvvIzlubbov5Tlm57jgIJcblx0XHRwaWNrOiBmdW5jdGlvbiBwaWNrKGFyciwgbWluLCBtYXgpIHtcblx0XHRcdC8vIHBpY2soIGl0ZW0xLCBpdGVtMiAuLi4gKVxuXHRcdFx0aWYgKCFVdGlsLmlzQXJyYXkoYXJyKSkge1xuXHRcdFx0XHRhcnIgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblx0XHRcdFx0bWluID0gMVxuXHRcdFx0XHRtYXggPSAxXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSApXG5cdFx0XHRcdGlmIChtaW4gPT09IHVuZGVmaW5lZCkgbWluID0gMVxuXG5cdFx0XHRcdC8vIHBpY2soIFsgaXRlbTEsIGl0ZW0yIC4uLiBdLCBjb3VudCApXG5cdFx0XHRcdGlmIChtYXggPT09IHVuZGVmaW5lZCkgbWF4ID0gbWluXG5cdFx0XHR9XG5cblx0XHRcdGlmIChtaW4gPT09IDEgJiYgbWF4ID09PSAxKSByZXR1cm4gYXJyW3RoaXMubmF0dXJhbCgwLCBhcnIubGVuZ3RoIC0gMSldXG5cblx0XHRcdC8vIHBpY2soIFsgaXRlbTEsIGl0ZW0yIC4uLiBdLCBtaW4sIG1heCApXG5cdFx0XHRyZXR1cm4gdGhpcy5zaHVmZmxlKGFyciwgbWluLCBtYXgpXG5cblx0XHRcdC8vIOmAmui/h+WPguaVsOS4quaVsOWIpOaWreaWueazleetvuWQje+8jOaJqeWxleaAp+WkquW3ru+8gSM5MFxuXHRcdFx0Ly8gc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHQvLyBcdGNhc2UgMTpcblx0XHRcdC8vIFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSApXG5cdFx0XHQvLyBcdFx0cmV0dXJuIGFyclt0aGlzLm5hdHVyYWwoMCwgYXJyLmxlbmd0aCAtIDEpXVxuXHRcdFx0Ly8gXHRjYXNlIDI6XG5cdFx0XHQvLyBcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0sIGNvdW50IClcblx0XHRcdC8vIFx0XHRtYXggPSBtaW5cblx0XHRcdC8vIFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cblx0XHRcdC8vIFx0Y2FzZSAzOlxuXHRcdFx0Ly8gXHRcdC8vIHBpY2soIFsgaXRlbTEsIGl0ZW0yIC4uLiBdLCBtaW4sIG1heCApXG5cdFx0XHQvLyBcdFx0cmV0dXJuIHRoaXMuc2h1ZmZsZShhcnIsIG1pbiwgbWF4KVxuXHRcdFx0Ly8gfVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgICAg5omT5Lmx5pWw57uE5Lit5YWD57Sg55qE6aG65bqP77yM5bm26L+U5Zue44CCXG5cdFx0ICAgIEdpdmVuIGFuIGFycmF5LCBzY3JhbWJsZSB0aGUgb3JkZXIgYW5kIHJldHVybiBpdC5cblxuXHRcdCAgICDlhbbku5bnmoTlrp7njrDmgJ3ot6/vvJpcblx0XHQgICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvanNsaWJzL3dpa2kvSmF2YXNjcmlwdFRpcHNcblx0XHQgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zb3J0KGZ1bmN0aW9uKCkge1xuXHRcdCAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIC0gMC41XG5cdFx0ICAgICAgICB9KVxuXHRcdCovXG5cdFx0c2h1ZmZsZTogZnVuY3Rpb24gc2h1ZmZsZShhcnIsIG1pbiwgbWF4KSB7XG5cdFx0XHRhcnIgPSBhcnIgfHwgW11cblx0XHRcdHZhciBvbGQgPSBhcnIuc2xpY2UoMCksXG5cdFx0XHRcdHJlc3VsdCA9IFtdLFxuXHRcdFx0XHRpbmRleCA9IDAsXG5cdFx0XHRcdGxlbmd0aCA9IG9sZC5sZW5ndGg7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGluZGV4ID0gdGhpcy5uYXR1cmFsKDAsIG9sZC5sZW5ndGggLSAxKVxuXHRcdFx0XHRyZXN1bHQucHVzaChvbGRbaW5kZXhdKVxuXHRcdFx0XHRvbGQuc3BsaWNlKGluZGV4LCAxKVxuXHRcdFx0fVxuXHRcdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRcdHJldHVybiByZXN1bHRcblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdG1heCA9IG1pblxuXHRcdFx0XHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xuXHRcdFx0XHRjYXNlIDM6XG5cdFx0XHRcdFx0bWluID0gcGFyc2VJbnQobWluLCAxMClcblx0XHRcdFx0XHRtYXggPSBwYXJzZUludChtYXgsIDEwKVxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQuc2xpY2UoMCwgdGhpcy5uYXR1cmFsKG1pbiwgbWF4KSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qXG5cdFx0ICAgICogUmFuZG9tLm9yZGVyKGl0ZW0sIGl0ZW0pXG5cdFx0ICAgICogUmFuZG9tLm9yZGVyKFtpdGVtLCBpdGVtIC4uLl0pXG5cblx0XHQgICAg6aG65bqP6I635Y+W5pWw57uE5Lit55qE5YWD57SgXG5cblx0XHQgICAgW0pTT07lr7zlhaXmlbDnu4TmlK/mjIHmlbDnu4TmlbDmja7lvZXlhaVdKGh0dHBzOi8vZ2l0aHViLmNvbS90aHgvUkFQL2lzc3Vlcy8yMilcblxuXHRcdCAgICDkuI3mlK/mjIHljZXni6zosIPnlKjvvIFcblx0XHQqL1xuXHRcdG9yZGVyOiBmdW5jdGlvbiBvcmRlcihhcnJheSkge1xuXHRcdFx0b3JkZXIuY2FjaGUgPSBvcmRlci5jYWNoZSB8fCB7fVxuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIGFycmF5ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cblx0XHRcdC8vIG9wdGlvbnMuY29udGV4dC5wYXRoL3RlbXBsYXRlUGF0aFxuXHRcdFx0dmFyIG9wdGlvbnMgPSBvcmRlci5vcHRpb25zXG5cdFx0XHR2YXIgdGVtcGxhdGVQYXRoID0gb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5qb2luKCcuJylcblxuXHRcdFx0dmFyIGNhY2hlID0gKFxuXHRcdFx0XHRvcmRlci5jYWNoZVt0ZW1wbGF0ZVBhdGhdID0gb3JkZXIuY2FjaGVbdGVtcGxhdGVQYXRoXSB8fCB7XG5cdFx0XHRcdFx0aW5kZXg6IDAsXG5cdFx0XHRcdFx0YXJyYXk6IGFycmF5XG5cdFx0XHRcdH1cblx0XHRcdClcblxuXHRcdFx0cmV0dXJuIGNhY2hlLmFycmF5W2NhY2hlLmluZGV4KysgJSBjYWNoZS5hcnJheS5sZW5ndGhdXG5cdFx0fVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIE5hbWVcblxuXHQgICAgW0JleW9uZCB0aGUgVG9wIDEwMDAgTmFtZXNdKGh0dHA6Ly93d3cuc3NhLmdvdi9vYWN0L2JhYnluYW1lcy9saW1pdHMuaHRtbClcblx0Ki9cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0Ly8g6ZqP5py655Sf5oiQ5LiA5Liq5bi46KeB55qE6Iux5paH5ZCN44CCXG5cdFx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5hbWVzID0gW1xuXHRcdFx0XHQvLyBtYWxlXG5cdFx0XHRcdFwiSmFtZXNcIiwgXCJKb2huXCIsIFwiUm9iZXJ0XCIsIFwiTWljaGFlbFwiLCBcIldpbGxpYW1cIixcblx0XHRcdFx0XCJEYXZpZFwiLCBcIlJpY2hhcmRcIiwgXCJDaGFybGVzXCIsIFwiSm9zZXBoXCIsIFwiVGhvbWFzXCIsXG5cdFx0XHRcdFwiQ2hyaXN0b3BoZXJcIiwgXCJEYW5pZWxcIiwgXCJQYXVsXCIsIFwiTWFya1wiLCBcIkRvbmFsZFwiLFxuXHRcdFx0XHRcIkdlb3JnZVwiLCBcIktlbm5ldGhcIiwgXCJTdGV2ZW5cIiwgXCJFZHdhcmRcIiwgXCJCcmlhblwiLFxuXHRcdFx0XHRcIlJvbmFsZFwiLCBcIkFudGhvbnlcIiwgXCJLZXZpblwiLCBcIkphc29uXCIsIFwiTWF0dGhld1wiLFxuXHRcdFx0XHRcIkdhcnlcIiwgXCJUaW1vdGh5XCIsIFwiSm9zZVwiLCBcIkxhcnJ5XCIsIFwiSmVmZnJleVwiLFxuXHRcdFx0XHRcIkZyYW5rXCIsIFwiU2NvdHRcIiwgXCJFcmljXCJcblx0XHRcdF0uY29uY2F0KFtcblx0XHRcdFx0Ly8gZmVtYWxlXG5cdFx0XHRcdFwiTWFyeVwiLCBcIlBhdHJpY2lhXCIsIFwiTGluZGFcIiwgXCJCYXJiYXJhXCIsIFwiRWxpemFiZXRoXCIsXG5cdFx0XHRcdFwiSmVubmlmZXJcIiwgXCJNYXJpYVwiLCBcIlN1c2FuXCIsIFwiTWFyZ2FyZXRcIiwgXCJEb3JvdGh5XCIsXG5cdFx0XHRcdFwiTGlzYVwiLCBcIk5hbmN5XCIsIFwiS2FyZW5cIiwgXCJCZXR0eVwiLCBcIkhlbGVuXCIsXG5cdFx0XHRcdFwiU2FuZHJhXCIsIFwiRG9ubmFcIiwgXCJDYXJvbFwiLCBcIlJ1dGhcIiwgXCJTaGFyb25cIixcblx0XHRcdFx0XCJNaWNoZWxsZVwiLCBcIkxhdXJhXCIsIFwiU2FyYWhcIiwgXCJLaW1iZXJseVwiLCBcIkRlYm9yYWhcIixcblx0XHRcdFx0XCJKZXNzaWNhXCIsIFwiU2hpcmxleVwiLCBcIkN5bnRoaWFcIiwgXCJBbmdlbGFcIiwgXCJNZWxpc3NhXCIsXG5cdFx0XHRcdFwiQnJlbmRhXCIsIFwiQW15XCIsIFwiQW5uYVwiXG5cdFx0XHRdKVxuXHRcdFx0cmV0dXJuIHRoaXMucGljayhuYW1lcylcblx0XHRcdFx0Ly8gb3IgdGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKVxuXHRcdH0sXG5cdFx0Ly8g6ZqP5py655Sf5oiQ5LiA5Liq5bi46KeB55qE6Iux5paH5aeT44CCXG5cdFx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmFtZXMgPSBbXG5cdFx0XHRcdFwiU21pdGhcIiwgXCJKb2huc29uXCIsIFwiV2lsbGlhbXNcIiwgXCJCcm93blwiLCBcIkpvbmVzXCIsXG5cdFx0XHRcdFwiTWlsbGVyXCIsIFwiRGF2aXNcIiwgXCJHYXJjaWFcIiwgXCJSb2RyaWd1ZXpcIiwgXCJXaWxzb25cIixcblx0XHRcdFx0XCJNYXJ0aW5lelwiLCBcIkFuZGVyc29uXCIsIFwiVGF5bG9yXCIsIFwiVGhvbWFzXCIsIFwiSGVybmFuZGV6XCIsXG5cdFx0XHRcdFwiTW9vcmVcIiwgXCJNYXJ0aW5cIiwgXCJKYWNrc29uXCIsIFwiVGhvbXBzb25cIiwgXCJXaGl0ZVwiLFxuXHRcdFx0XHRcIkxvcGV6XCIsIFwiTGVlXCIsIFwiR29uemFsZXpcIiwgXCJIYXJyaXNcIiwgXCJDbGFya1wiLFxuXHRcdFx0XHRcIkxld2lzXCIsIFwiUm9iaW5zb25cIiwgXCJXYWxrZXJcIiwgXCJQZXJlelwiLCBcIkhhbGxcIixcblx0XHRcdFx0XCJZb3VuZ1wiLCBcIkFsbGVuXCJcblx0XHRcdF1cblx0XHRcdHJldHVybiB0aGlzLnBpY2sobmFtZXMpXG5cdFx0XHRcdC8vIG9yIHRoaXMuY2FwaXRhbGl6ZSh0aGlzLndvcmQoKSlcblx0XHR9LFxuXHRcdC8vIOmaj+acuueUn+aIkOS4gOS4quW4uOingeeahOiLseaWh+Wnk+WQjeOAglxuXHRcdG5hbWU6IGZ1bmN0aW9uKG1pZGRsZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZmlyc3QoKSArICcgJyArXG5cdFx0XHRcdChtaWRkbGUgPyB0aGlzLmZpcnN0KCkgKyAnICcgOiAnJykgK1xuXHRcdFx0XHR0aGlzLmxhc3QoKVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgICAg6ZqP5py655Sf5oiQ5LiA5Liq5bi46KeB55qE5Lit5paH5aeT44CCXG5cdFx0ICAgIFvkuJbnlYzluLjnlKjlp5PmsI/mjpLooYxdKGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8xNzE5MTE1Lmh0bSlcblx0XHQgICAgW+eOhOa0vue9kSAtIOe9kee7nOWwj+ivtOWIm+S9nOi+heWKqeW5s+WPsF0oaHR0cDovL3h1YW5wYWkuc2luYWFwcC5jb20vKVxuXHRcdCAqL1xuXHRcdGNmaXJzdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmFtZXMgPSAoXG5cdFx0XHRcdCfnjosg5p2OIOW8oCDliJgg6ZmIIOadqCDotbUg6buEIOWRqCDlkLQgJyArXG5cdFx0XHRcdCflvpAg5a2ZIOiDoSDmnLEg6auYIOaelyDkvZUg6YOtIOmprCDnvZcgJyArXG5cdFx0XHRcdCfmooEg5a6LIOmDkSDosKIg6Z+pIOWUkCDlhq8g5LqOIOiRoyDokKcgJyArXG5cdFx0XHRcdCfnqIsg5pu5IOiigSDpgpMg6K64IOWChSDmsogg5pu+IOW9rSDlkJUgJyArXG5cdFx0XHRcdCfoi48g5Y2iIOiSiyDolKEg6LS+IOS4gSDprY8g6JabIOWPtiDpmI4gJyArXG5cdFx0XHRcdCfkvZkg5r2YIOadnCDmiLQg5aSPIOmUuiDmsaog55SwIOS7uyDlp5wgJyArXG5cdFx0XHRcdCfojIMg5pa5IOefsyDlp5og6LCtIOW7liDpgrkg54aKIOmHkSDpmYYgJyArXG5cdFx0XHRcdCfpg50g5a2UIOeZvSDltJQg5bq3IOavmyDpgrEg56emIOaxnyDlj7IgJyArXG5cdFx0XHRcdCfpob4g5L6vIOmCtSDlrZ8g6b6ZIOS4hyDmrrUg6Zu3IOmSsSDmsaQgJyArXG5cdFx0XHRcdCflsLkg6buOIOaYkyDluLgg5q2mIOS5lCDotLog6LWWIOm+miDmlocnXG5cdFx0XHQpLnNwbGl0KCcgJylcblx0XHRcdHJldHVybiB0aGlzLnBpY2sobmFtZXMpXG5cdFx0fSxcblx0XHQvKlxuXHRcdCAgICDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoTkuK3mloflkI3jgIJcblx0XHQgICAgW+S4reWbveacgOW4uOingeWQjeWtl+WJjTUw5ZCNX+S4ieS5neeul+WRvee9kV0oaHR0cDovL3d3dy5uYW1lOTk5Lm5ldC94aW5nbWluZy94aW5nc2hpLzIwMTMxMDA0LzQ4Lmh0bWwpXG5cdFx0ICovXG5cdFx0Y2xhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5hbWVzID0gKFxuXHRcdFx0XHQn5LyfIOiKsyDlqJwg56eA6IuxIOaVjyDpnZkg5Li9IOW8uiDno4og5YabICcgK1xuXHRcdFx0XHQn5rSLIOWLhyDoibMg5p2wIOWonyDmtpsg5piOIOi2hSDnp4DlhbAg6ZyeICcgK1xuXHRcdFx0XHQn5bmzIOWImiDmoYLoi7EnXG5cdFx0XHQpLnNwbGl0KCcgJylcblx0XHRcdHJldHVybiB0aGlzLnBpY2sobmFtZXMpXG5cdFx0fSxcblx0XHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoTkuK3mloflp5PlkI3jgIJcblx0XHRjbmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jZmlyc3QoKSArIHRoaXMuY2xhc3QoKVxuXHRcdH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBXZWJcblx0Ki9cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvKlxuXHQgICAgICAgIOmaj+acuueUn+aIkOS4gOS4qiBVUkzjgIJcblxuXHQgICAgICAgIFtVUkwg6KeE6IyDXShodHRwOi8vd3d3LnczLm9yZy9BZGRyZXNzaW5nL1VSTC91cmwtc3BlYy50eHQpXG5cdCAgICAgICAgICAgIGh0dHAgICAgICAgICAgICAgICAgICAgIEh5cGVydGV4dCBUcmFuc2ZlciBQcm90b2NvbCBcblx0ICAgICAgICAgICAgZnRwICAgICAgICAgICAgICAgICAgICAgRmlsZSBUcmFuc2ZlciBwcm90b2NvbCBcblx0ICAgICAgICAgICAgZ29waGVyICAgICAgICAgICAgICAgICAgVGhlIEdvcGhlciBwcm90b2NvbCBcblx0ICAgICAgICAgICAgbWFpbHRvICAgICAgICAgICAgICAgICAgRWxlY3Ryb25pYyBtYWlsIGFkZHJlc3MgXG5cdCAgICAgICAgICAgIG1pZCAgICAgICAgICAgICAgICAgICAgIE1lc3NhZ2UgaWRlbnRpZmllcnMgZm9yIGVsZWN0cm9uaWMgbWFpbCBcblx0ICAgICAgICAgICAgY2lkICAgICAgICAgICAgICAgICAgICAgQ29udGVudCBpZGVudGlmaWVycyBmb3IgTUlNRSBib2R5IHBhcnQgXG5cdCAgICAgICAgICAgIG5ld3MgICAgICAgICAgICAgICAgICAgIFVzZW5ldCBuZXdzIFxuXHQgICAgICAgICAgICBubnRwICAgICAgICAgICAgICAgICAgICBVc2VuZXQgbmV3cyBmb3IgbG9jYWwgTk5UUCBhY2Nlc3Mgb25seSBcblx0ICAgICAgICAgICAgcHJvc3Blcm8gICAgICAgICAgICAgICAgQWNjZXNzIHVzaW5nIHRoZSBwcm9zcGVybyBwcm90b2NvbHMgXG5cdCAgICAgICAgICAgIHRlbG5ldCBybG9naW4gdG4zMjcwICAgIFJlZmVyZW5jZSB0byBpbnRlcmFjdGl2ZSBzZXNzaW9uc1xuXHQgICAgICAgICAgICB3YWlzICAgICAgICAgICAgICAgICAgICBXaWRlIEFyZWEgSW5mb3JtYXRpb24gU2VydmVycyBcblx0ICAgICovXG5cdCAgICB1cmw6IGZ1bmN0aW9uKHByb3RvY29sLCBob3N0KSB7XG5cdCAgICAgICAgcmV0dXJuIChwcm90b2NvbCB8fCB0aGlzLnByb3RvY29sKCkpICsgJzovLycgKyAvLyBwcm90b2NvbD9cblx0ICAgICAgICAgICAgKGhvc3QgfHwgdGhpcy5kb21haW4oKSkgKyAvLyBob3N0P1xuXHQgICAgICAgICAgICAnLycgKyB0aGlzLndvcmQoKVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qiBVUkwg5Y2P6K6u44CCXG5cdCAgICBwcm90b2NvbDogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMucGljayhcblx0ICAgICAgICAgICAgLy8g5Y2P6K6u57CHXG5cdCAgICAgICAgICAgICdodHRwIGZ0cCBnb3BoZXIgbWFpbHRvIG1pZCBjaWQgbmV3cyBubnRwIHByb3NwZXJvIHRlbG5ldCBybG9naW4gdG4zMjcwIHdhaXMnLnNwbGl0KCcgJylcblx0ICAgICAgICApXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5Z+f5ZCN44CCXG5cdCAgICBkb21haW46IGZ1bmN0aW9uKHRsZCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLndvcmQoKSArICcuJyArICh0bGQgfHwgdGhpcy50bGQoKSlcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIOmaj+acuueUn+aIkOS4gOS4qumhtue6p+Wfn+WQjeOAglxuXHQgICAgICAgIOWbvemZhemhtue6p+Wfn+WQjSBpbnRlcm5hdGlvbmFsIHRvcC1sZXZlbCBkb21haW4tbmFtZXMsIGlUTERzXG5cdCAgICAgICAg5Zu95a626aG257qn5Z+f5ZCNIG5hdGlvbmFsIHRvcC1sZXZlbCBkb21haW5uYW1lcywgblRMRHNcblx0ICAgICAgICBb5Z+f5ZCN5ZCO57yA5aSn5YWoXShodHRwOi8vd3d3LjE2M25zLmNvbS96aXh1bi9wb3N0LzQ0MTcuaHRtbClcblx0ICAgICovXG5cdCAgICB0bGQ6IGZ1bmN0aW9uKCkgeyAvLyBUb3AgTGV2ZWwgRG9tYWluXG5cdCAgICAgICAgcmV0dXJuIHRoaXMucGljayhcblx0ICAgICAgICAgICAgKFxuXHQgICAgICAgICAgICAgICAgLy8g5Z+f5ZCN5ZCO57yAXG5cdCAgICAgICAgICAgICAgICAnY29tIG5ldCBvcmcgZWR1IGdvdiBpbnQgbWlsIGNuICcgK1xuXHQgICAgICAgICAgICAgICAgLy8g5Zu95YaF5Z+f5ZCNXG5cdCAgICAgICAgICAgICAgICAnY29tLmNuIG5ldC5jbiBnb3YuY24gb3JnLmNuICcgK1xuXHQgICAgICAgICAgICAgICAgLy8g5Lit5paH5Zu95YaF5Z+f5ZCNXG5cdCAgICAgICAgICAgICAgICAn5Lit5Zu9IOS4reWbveS6kuiBlC7lhazlj7gg5Lit5Zu95LqS6IGULue9kee7nCAnICtcblx0ICAgICAgICAgICAgICAgIC8vIOaWsOWbvemZheWfn+WQjVxuXHQgICAgICAgICAgICAgICAgJ3RlbCBiaXogY2MgdHYgaW5mbyBuYW1lIGhrIG1vYmkgYXNpYSBjZCB0cmF2ZWwgcHJvIG11c2V1bSBjb29wIGFlcm8gJyArXG5cdCAgICAgICAgICAgICAgICAvLyDkuJbnlYzlkITlm73ln5/lkI3lkI7nvIBcblx0ICAgICAgICAgICAgICAgICdhZCBhZSBhZiBhZyBhaSBhbCBhbSBhbiBhbyBhcSBhciBhcyBhdCBhdSBhdyBheiBiYSBiYiBiZCBiZSBiZiBiZyBiaCBiaSBiaiBibSBibiBibyBiciBicyBidCBidiBidyBieSBieiBjYSBjYyBjZiBjZyBjaCBjaSBjayBjbCBjbSBjbiBjbyBjcSBjciBjdSBjdiBjeCBjeSBjeiBkZSBkaiBkayBkbSBkbyBkeiBlYyBlZSBlZyBlaCBlcyBldCBldiBmaSBmaiBmayBmbSBmbyBmciBnYSBnYiBnZCBnZSBnZiBnaCBnaSBnbCBnbSBnbiBncCBnciBndCBndSBndyBneSBoayBobSBobiBociBodCBodSBpZCBpZSBpbCBpbiBpbyBpcSBpciBpcyBpdCBqbSBqbyBqcCBrZSBrZyBraCBraSBrbSBrbiBrcCBrciBrdyBreSBreiBsYSBsYiBsYyBsaSBsayBsciBscyBsdCBsdSBsdiBseSBtYSBtYyBtZCBtZyBtaCBtbCBtbSBtbiBtbyBtcCBtcSBtciBtcyBtdCBtdiBtdyBteCBteSBteiBuYSBuYyBuZSBuZiBuZyBuaSBubCBubyBucCBuciBudCBudSBueiBvbSBxYSBwYSBwZSBwZiBwZyBwaCBwayBwbCBwbSBwbiBwciBwdCBwdyBweSByZSBybyBydSBydyBzYSBzYiBzYyBzZCBzZSBzZyBzaCBzaSBzaiBzayBzbCBzbSBzbiBzbyBzciBzdCBzdSBzeSBzeiB0YyB0ZCB0ZiB0ZyB0aCB0aiB0ayB0bSB0biB0byB0cCB0ciB0dCB0diB0dyB0eiB1YSB1ZyB1ayB1cyB1eSB2YSB2YyB2ZSB2ZyB2biB2dSB3ZiB3cyB5ZSB5dSB6YSB6bSB6ciB6dydcblx0ICAgICAgICAgICAgKS5zcGxpdCgnICcpXG5cdCAgICAgICAgKVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qumCruS7tuWcsOWdgOOAglxuXHQgICAgZW1haWw6IGZ1bmN0aW9uKGRvbWFpbikge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlcignbG93ZXInKSArICcuJyArIHRoaXMud29yZCgpICsgJ0AnICtcblx0ICAgICAgICAgICAgKFxuXHQgICAgICAgICAgICAgICAgZG9tYWluIHx8XG5cdCAgICAgICAgICAgICAgICAodGhpcy53b3JkKCkgKyAnLicgKyB0aGlzLnRsZCgpKVxuXHQgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmNoYXJhY3RlcignbG93ZXInKSArICcuJyArIHRoaXMubGFzdCgpLnRvTG93ZXJDYXNlKCkgKyAnQCcgKyB0aGlzLmxhc3QoKS50b0xvd2VyQ2FzZSgpICsgJy4nICsgdGhpcy50bGQoKVxuXHQgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy53b3JkKCkgKyAnQCcgKyAoZG9tYWluIHx8IHRoaXMuZG9tYWluKCkpXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5LiqIElQIOWcsOWdgOOAglxuXHQgICAgaXA6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMCwgMjU1KSArICcuJyArXG5cdCAgICAgICAgICAgIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgJy4nICtcblx0ICAgICAgICAgICAgdGhpcy5uYXR1cmFsKDAsIDI1NSkgKyAnLicgK1xuXHQgICAgICAgICAgICB0aGlzLm5hdHVyYWwoMCwgMjU1KVxuXHQgICAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIEFkZHJlc3Ncblx0Ki9cblxuXHR2YXIgRElDVCA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpXG5cdHZhciBSRUdJT04gPSBbJ+S4nOWMlycsICfljY7ljJcnLCAn5Y2O5LicJywgJ+WNjuS4rScsICfljY7ljZcnLCAn6KW/5Y2XJywgJ+ilv+WMlyddXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrlpKfljLrjgIJcblx0ICAgIHJlZ2lvbjogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMucGljayhSRUdJT04pXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq77yI5Lit5Zu977yJ55yB77yI5oiW55u06L6W5biC44CB6Ieq5rK75Yy644CB54m55Yir6KGM5pS/5Yy677yJ44CCXG5cdCAgICBwcm92aW5jZTogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMucGljayhESUNUKS5uYW1lXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq77yI5Lit5Zu977yJ5biC44CCXG5cdCAgICBjaXR5OiBmdW5jdGlvbihwcmVmaXgpIHtcblx0ICAgICAgICB2YXIgcHJvdmluY2UgPSB0aGlzLnBpY2soRElDVClcblx0ICAgICAgICB2YXIgY2l0eSA9IHRoaXMucGljayhwcm92aW5jZS5jaGlsZHJlbilcblx0ICAgICAgICByZXR1cm4gcHJlZml4ID8gW3Byb3ZpbmNlLm5hbWUsIGNpdHkubmFtZV0uam9pbignICcpIDogY2l0eS5uYW1lXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq77yI5Lit5Zu977yJ5Y6/44CCXG5cdCAgICBjb3VudHk6IGZ1bmN0aW9uKHByZWZpeCkge1xuXHQgICAgICAgIHZhciBwcm92aW5jZSA9IHRoaXMucGljayhESUNUKVxuXHQgICAgICAgIHZhciBjaXR5ID0gdGhpcy5waWNrKHByb3ZpbmNlLmNoaWxkcmVuKVxuXHQgICAgICAgIHZhciBjb3VudHkgPSB0aGlzLnBpY2soY2l0eS5jaGlsZHJlbikgfHwge1xuXHQgICAgICAgICAgICBuYW1lOiAnLSdcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHByZWZpeCA/IFtwcm92aW5jZS5uYW1lLCBjaXR5Lm5hbWUsIGNvdW50eS5uYW1lXS5qb2luKCcgJykgOiBjb3VudHkubmFtZVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qumCruaUv+e8luegge+8iOWFreS9jeaVsOWtl++8ieOAglxuXHQgICAgemlwOiBmdW5jdGlvbihsZW4pIHtcblx0ICAgICAgICB2YXIgemlwID0gJydcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IChsZW4gfHwgNik7IGkrKykgemlwICs9IHRoaXMubmF0dXJhbCgwLCA5KVxuXHQgICAgICAgIHJldHVybiB6aXBcblx0ICAgIH1cblxuXHQgICAgLy8gYWRkcmVzczogZnVuY3Rpb24oKSB7fSxcblx0ICAgIC8vIHBob25lOiBmdW5jdGlvbigpIHt9LFxuXHQgICAgLy8gYXJlYWNvZGU6IGZ1bmN0aW9uKCkge30sXG5cdCAgICAvLyBzdHJlZXQ6IGZ1bmN0aW9uKCkge30sXG5cdCAgICAvLyBzdHJlZXRfc3VmZml4ZXM6IGZ1bmN0aW9uKCkge30sXG5cdCAgICAvLyBzdHJlZXRfc3VmZml4OiBmdW5jdGlvbigpIHt9LFxuXHQgICAgLy8gc3RhdGVzOiBmdW5jdGlvbigpIHt9LFxuXHQgICAgLy8gc3RhdGU6IGZ1bmN0aW9uKCkge30sXG5cdH1cblxuLyoqKi8gfSxcbi8qIDE4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgQWRkcmVzcyDlrZflhbjmlbDmja5cblxuXHQgICAg5a2X5YW45pWw5o2u5p2l5rqQIGh0dHA6Ly93d3cuYXRhdGVjaC5vcmcvYXJ0aWNsZXMvMzAwMjg/cm5kPTI1NDI1OTg1NlxuXG5cdCAgICDlm73moIcg55yB77yI5biC77yJ57qn6KGM5pS/5Yy65YiS56CB6KGoXG5cblx0ICAgIOWNjuWMlyAgIOWMl+S6rOW4giDlpKnmtKXluIIg5rKz5YyX55yBIOWxseilv+ecgSDlhoXokpnlj6Toh6rmsrvljLpcblx0ICAgIOS4nOWMlyAgIOi+veWugeecgSDlkInmnpfnnIEg6buR6b6Z5rGf55yBXG5cdCAgICDljY7kuJwgICDkuIrmtbfluIIg5rGf6IuP55yBIOa1meaxn+ecgSDlronlvr3nnIEg56aP5bu655yBIOaxn+ilv+ecgSDlsbHkuJznnIFcblx0ICAgIOWNjuWNlyAgIOW5v+S4nOecgSDlub/opb/lo67ml4/oh6rmsrvljLog5rW35Y2X55yBXG5cdCAgICDljY7kuK0gICDmsrPljZfnnIEg5rmW5YyX55yBIOa5luWNl+ecgVxuXHQgICAg6KW/5Y2XICAg6YeN5bqG5biCIOWbm+W3neecgSDotLXlt57nnIEg5LqR5Y2X55yBIOilv+iXj+iHquayu+WMulxuXHQgICAg6KW/5YyXICAg6ZmV6KW/55yBIOeUmOiCg+ecgSDpnZLmtbfnnIEg5a6B5aSP5Zue5peP6Ieq5rK75Yy6IOaWsOeWhue7tOWQvuWwlOiHquayu+WMulxuXHQgICAg5riv5r6z5Y+wIOmmmea4r+eJueWIq+ihjOaUv+WMuiDmvrPpl6jnibnliKvooYzmlL/ljLog5Y+w5rm+55yBXG5cdCAgICBcblx0ICAgICoq5o6S5bqPKipcblx0ICAgIFxuXHQgICAgYGBganNcblx0ICAgIHZhciBtYXAgPSB7fVxuXHQgICAgXy5lYWNoKF8ua2V5cyhSRUdJT05TKSxmdW5jdGlvbihpZCl7XG5cdCAgICAgIG1hcFtpZF0gPSBSRUdJT05TW0lEXVxuXHQgICAgfSlcblx0ICAgIEpTT04uc3RyaW5naWZ5KG1hcClcblx0ICAgIGBgYFxuXHQqL1xuXHR2YXIgRElDVCA9IHtcblx0ICAgIFwiMTEwMDAwXCI6IFwi5YyX5LqsXCIsXG5cdCAgICBcIjExMDEwMFwiOiBcIuWMl+S6rOW4glwiLFxuXHQgICAgXCIxMTAxMDFcIjogXCLkuJzln47ljLpcIixcblx0ICAgIFwiMTEwMTAyXCI6IFwi6KW/5Z+O5Yy6XCIsXG5cdCAgICBcIjExMDEwNVwiOiBcIuacnemYs+WMulwiLFxuXHQgICAgXCIxMTAxMDZcIjogXCLkuLDlj7DljLpcIixcblx0ICAgIFwiMTEwMTA3XCI6IFwi55+z5pmv5bGx5Yy6XCIsXG5cdCAgICBcIjExMDEwOFwiOiBcIua1t+a3gOWMulwiLFxuXHQgICAgXCIxMTAxMDlcIjogXCLpl6jlpLTmsp/ljLpcIixcblx0ICAgIFwiMTEwMTExXCI6IFwi5oi/5bGx5Yy6XCIsXG5cdCAgICBcIjExMDExMlwiOiBcIumAmuW3nuWMulwiLFxuXHQgICAgXCIxMTAxMTNcIjogXCLpobrkuYnljLpcIixcblx0ICAgIFwiMTEwMTE0XCI6IFwi5piM5bmz5Yy6XCIsXG5cdCAgICBcIjExMDExNVwiOiBcIuWkp+WFtOWMulwiLFxuXHQgICAgXCIxMTAxMTZcIjogXCLmgIDmn5TljLpcIixcblx0ICAgIFwiMTEwMTE3XCI6IFwi5bmz6LC35Yy6XCIsXG5cdCAgICBcIjExMDIyOFwiOiBcIuWvhuS6keWOv1wiLFxuXHQgICAgXCIxMTAyMjlcIjogXCLlu7bluobljr9cIixcblx0ICAgIFwiMTEwMjMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEyMDAwMFwiOiBcIuWkqea0pVwiLFxuXHQgICAgXCIxMjAxMDBcIjogXCLlpKnmtKXluIJcIixcblx0ICAgIFwiMTIwMTAxXCI6IFwi5ZKM5bmz5Yy6XCIsXG5cdCAgICBcIjEyMDEwMlwiOiBcIuays+S4nOWMulwiLFxuXHQgICAgXCIxMjAxMDNcIjogXCLmsrPopb/ljLpcIixcblx0ICAgIFwiMTIwMTA0XCI6IFwi5Y2X5byA5Yy6XCIsXG5cdCAgICBcIjEyMDEwNVwiOiBcIuays+WMl+WMulwiLFxuXHQgICAgXCIxMjAxMDZcIjogXCLnuqLmoaXljLpcIixcblx0ICAgIFwiMTIwMTEwXCI6IFwi5Lic5Li95Yy6XCIsXG5cdCAgICBcIjEyMDExMVwiOiBcIuilv+mdkuWMulwiLFxuXHQgICAgXCIxMjAxMTJcIjogXCLmtKXljZfljLpcIixcblx0ICAgIFwiMTIwMTEzXCI6IFwi5YyX6L6w5Yy6XCIsXG5cdCAgICBcIjEyMDExNFwiOiBcIuatpua4heWMulwiLFxuXHQgICAgXCIxMjAxMTVcIjogXCLlrp3lnbvljLpcIixcblx0ICAgIFwiMTIwMTE2XCI6IFwi5ruo5rW35paw5Yy6XCIsXG5cdCAgICBcIjEyMDIyMVwiOiBcIuWugeays+WOv1wiLFxuXHQgICAgXCIxMjAyMjNcIjogXCLpnZnmtbfljr9cIixcblx0ICAgIFwiMTIwMjI1XCI6IFwi6JOf5Y6/XCIsXG5cdCAgICBcIjEyMDIyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzAwMDBcIjogXCLmsrPljJfnnIFcIixcblx0ICAgIFwiMTMwMTAwXCI6IFwi55+z5a625bqE5biCXCIsXG5cdCAgICBcIjEzMDEwMlwiOiBcIumVv+WuieWMulwiLFxuXHQgICAgXCIxMzAxMDNcIjogXCLmoaXkuJzljLpcIixcblx0ICAgIFwiMTMwMTA0XCI6IFwi5qGl6KW/5Yy6XCIsXG5cdCAgICBcIjEzMDEwNVwiOiBcIuaWsOWNjuWMulwiLFxuXHQgICAgXCIxMzAxMDdcIjogXCLkupXpmYnnn7/ljLpcIixcblx0ICAgIFwiMTMwMTA4XCI6IFwi6KOV5Y2O5Yy6XCIsXG5cdCAgICBcIjEzMDEyMVwiOiBcIuS6lemZieWOv1wiLFxuXHQgICAgXCIxMzAxMjNcIjogXCLmraPlrprljr9cIixcblx0ICAgIFwiMTMwMTI0XCI6IFwi5qC+5Z+O5Y6/XCIsXG5cdCAgICBcIjEzMDEyNVwiOiBcIuihjOWUkOWOv1wiLFxuXHQgICAgXCIxMzAxMjZcIjogXCLngbXlr7/ljr9cIixcblx0ICAgIFwiMTMwMTI3XCI6IFwi6auY6YKR5Y6/XCIsXG5cdCAgICBcIjEzMDEyOFwiOiBcIua3seazveWOv1wiLFxuXHQgICAgXCIxMzAxMjlcIjogXCLotZ7nmofljr9cIixcblx0ICAgIFwiMTMwMTMwXCI6IFwi5peg5p6B5Y6/XCIsXG5cdCAgICBcIjEzMDEzMVwiOiBcIuW5s+WxseWOv1wiLFxuXHQgICAgXCIxMzAxMzJcIjogXCLlhYPmsI/ljr9cIixcblx0ICAgIFwiMTMwMTMzXCI6IFwi6LW15Y6/XCIsXG5cdCAgICBcIjEzMDE4MVwiOiBcIui+m+mbhuW4glwiLFxuXHQgICAgXCIxMzAxODJcIjogXCLol4Hln47luIJcIixcblx0ICAgIFwiMTMwMTgzXCI6IFwi5pmL5bee5biCXCIsXG5cdCAgICBcIjEzMDE4NFwiOiBcIuaWsOS5kOW4glwiLFxuXHQgICAgXCIxMzAxODVcIjogXCLpub/ms4nluIJcIixcblx0ICAgIFwiMTMwMTg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDIwMFwiOiBcIuWUkOWxseW4glwiLFxuXHQgICAgXCIxMzAyMDJcIjogXCLot6/ljZfljLpcIixcblx0ICAgIFwiMTMwMjAzXCI6IFwi6Lev5YyX5Yy6XCIsXG5cdCAgICBcIjEzMDIwNFwiOiBcIuWPpOWGtuWMulwiLFxuXHQgICAgXCIxMzAyMDVcIjogXCLlvIDlubPljLpcIixcblx0ICAgIFwiMTMwMjA3XCI6IFwi5Liw5Y2X5Yy6XCIsXG5cdCAgICBcIjEzMDIwOFwiOiBcIuS4sOa2puWMulwiLFxuXHQgICAgXCIxMzAyMjNcIjogXCLmu6bljr9cIixcblx0ICAgIFwiMTMwMjI0XCI6IFwi5rum5Y2X5Y6/XCIsXG5cdCAgICBcIjEzMDIyNVwiOiBcIuS5kOS6reWOv1wiLFxuXHQgICAgXCIxMzAyMjdcIjogXCLov4Hopb/ljr9cIixcblx0ICAgIFwiMTMwMjI5XCI6IFwi546J55Sw5Y6/XCIsXG5cdCAgICBcIjEzMDIzMFwiOiBcIuabueWmg+eUuOWMulwiLFxuXHQgICAgXCIxMzAyODFcIjogXCLpgbXljJbluIJcIixcblx0ICAgIFwiMTMwMjgzXCI6IFwi6L+B5a6J5biCXCIsXG5cdCAgICBcIjEzMDI4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzAzMDBcIjogXCLnp6bnmoflspvluIJcIixcblx0ICAgIFwiMTMwMzAyXCI6IFwi5rW35riv5Yy6XCIsXG5cdCAgICBcIjEzMDMwM1wiOiBcIuWxsea1t+WFs+WMulwiLFxuXHQgICAgXCIxMzAzMDRcIjogXCLljJfmiLTmsrPljLpcIixcblx0ICAgIFwiMTMwMzIxXCI6IFwi6Z2S6b6Z5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjEzMDMyMlwiOiBcIuaYjOm7juWOv1wiLFxuXHQgICAgXCIxMzAzMjNcIjogXCLmiprlroHljr9cIixcblx0ICAgIFwiMTMwMzI0XCI6IFwi5Y2i6b6Z5Y6/XCIsXG5cdCAgICBcIjEzMDM5OFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzA0MDBcIjogXCLpgq/pg7jluIJcIixcblx0ICAgIFwiMTMwNDAyXCI6IFwi6YKv5bGx5Yy6XCIsXG5cdCAgICBcIjEzMDQwM1wiOiBcIuS4m+WPsOWMulwiLFxuXHQgICAgXCIxMzA0MDRcIjogXCLlpI3lhbTljLpcIixcblx0ICAgIFwiMTMwNDA2XCI6IFwi5bOw5bOw55+/5Yy6XCIsXG5cdCAgICBcIjEzMDQyMVwiOiBcIumCr+mDuOWOv1wiLFxuXHQgICAgXCIxMzA0MjNcIjogXCLkuLTmvLPljr9cIixcblx0ICAgIFwiMTMwNDI0XCI6IFwi5oiQ5a6J5Y6/XCIsXG5cdCAgICBcIjEzMDQyNVwiOiBcIuWkp+WQjeWOv1wiLFxuXHQgICAgXCIxMzA0MjZcIjogXCLmtonljr9cIixcblx0ICAgIFwiMTMwNDI3XCI6IFwi56OB5Y6/XCIsXG5cdCAgICBcIjEzMDQyOFwiOiBcIuiCpeS5oeWOv1wiLFxuXHQgICAgXCIxMzA0MjlcIjogXCLmsLjlubTljr9cIixcblx0ICAgIFwiMTMwNDMwXCI6IFwi6YKx5Y6/XCIsXG5cdCAgICBcIjEzMDQzMVwiOiBcIum4oeazveWOv1wiLFxuXHQgICAgXCIxMzA0MzJcIjogXCLlub/lubPljr9cIixcblx0ICAgIFwiMTMwNDMzXCI6IFwi6aaG6Zm25Y6/XCIsXG5cdCAgICBcIjEzMDQzNFwiOiBcIumtj+WOv1wiLFxuXHQgICAgXCIxMzA0MzVcIjogXCLmm7Llkajljr9cIixcblx0ICAgIFwiMTMwNDgxXCI6IFwi5q2m5a6J5biCXCIsXG5cdCAgICBcIjEzMDQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzA1MDBcIjogXCLpgqLlj7DluIJcIixcblx0ICAgIFwiMTMwNTAyXCI6IFwi5qGl5Lic5Yy6XCIsXG5cdCAgICBcIjEzMDUwM1wiOiBcIuahpeilv+WMulwiLFxuXHQgICAgXCIxMzA1MjFcIjogXCLpgqLlj7Dljr9cIixcblx0ICAgIFwiMTMwNTIyXCI6IFwi5Li05Z+O5Y6/XCIsXG5cdCAgICBcIjEzMDUyM1wiOiBcIuWGheS4mOWOv1wiLFxuXHQgICAgXCIxMzA1MjRcIjogXCLmn4/kuaHljr9cIixcblx0ICAgIFwiMTMwNTI1XCI6IFwi6ZqG5bCn5Y6/XCIsXG5cdCAgICBcIjEzMDUyNlwiOiBcIuS7u+WOv1wiLFxuXHQgICAgXCIxMzA1MjdcIjogXCLljZflkozljr9cIixcblx0ICAgIFwiMTMwNTI4XCI6IFwi5a6B5pmL5Y6/XCIsXG5cdCAgICBcIjEzMDUyOVwiOiBcIuW3qOm5v+WOv1wiLFxuXHQgICAgXCIxMzA1MzBcIjogXCLmlrDmsrPljr9cIixcblx0ICAgIFwiMTMwNTMxXCI6IFwi5bm/5a6X5Y6/XCIsXG5cdCAgICBcIjEzMDUzMlwiOiBcIuW5s+S5oeWOv1wiLFxuXHQgICAgXCIxMzA1MzNcIjogXCLlqIHljr9cIixcblx0ICAgIFwiMTMwNTM0XCI6IFwi5riF5rKz5Y6/XCIsXG5cdCAgICBcIjEzMDUzNVwiOiBcIuS4tOilv+WOv1wiLFxuXHQgICAgXCIxMzA1ODFcIjogXCLljZflrqvluIJcIixcblx0ICAgIFwiMTMwNTgyXCI6IFwi5rKZ5rKz5biCXCIsXG5cdCAgICBcIjEzMDU4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzA2MDBcIjogXCLkv53lrprluIJcIixcblx0ICAgIFwiMTMwNjAyXCI6IFwi5paw5biC5Yy6XCIsXG5cdCAgICBcIjEzMDYwM1wiOiBcIuWMl+W4guWMulwiLFxuXHQgICAgXCIxMzA2MDRcIjogXCLljZfluILljLpcIixcblx0ICAgIFwiMTMwNjIxXCI6IFwi5ruh5Z+O5Y6/XCIsXG5cdCAgICBcIjEzMDYyMlwiOiBcIua4heiLkeWOv1wiLFxuXHQgICAgXCIxMzA2MjNcIjogXCLmtp7msLTljr9cIixcblx0ICAgIFwiMTMwNjI0XCI6IFwi6Zic5bmz5Y6/XCIsXG5cdCAgICBcIjEzMDYyNVwiOiBcIuW+kOawtOWOv1wiLFxuXHQgICAgXCIxMzA2MjZcIjogXCLlrprlhbTljr9cIixcblx0ICAgIFwiMTMwNjI3XCI6IFwi5ZSQ5Y6/XCIsXG5cdCAgICBcIjEzMDYyOFwiOiBcIumrmOmYs+WOv1wiLFxuXHQgICAgXCIxMzA2MjlcIjogXCLlrrnln47ljr9cIixcblx0ICAgIFwiMTMwNjMwXCI6IFwi5rae5rqQ5Y6/XCIsXG5cdCAgICBcIjEzMDYzMVwiOiBcIuacm+mDveWOv1wiLFxuXHQgICAgXCIxMzA2MzJcIjogXCLlronmlrDljr9cIixcblx0ICAgIFwiMTMwNjMzXCI6IFwi5piT5Y6/XCIsXG5cdCAgICBcIjEzMDYzNFwiOiBcIuabsumYs+WOv1wiLFxuXHQgICAgXCIxMzA2MzVcIjogXCLooKHljr9cIixcblx0ICAgIFwiMTMwNjM2XCI6IFwi6aG65bmz5Y6/XCIsXG5cdCAgICBcIjEzMDYzN1wiOiBcIuWNmumHjuWOv1wiLFxuXHQgICAgXCIxMzA2MzhcIjogXCLpm4Tljr9cIixcblx0ICAgIFwiMTMwNjgxXCI6IFwi5ra/5bee5biCXCIsXG5cdCAgICBcIjEzMDY4MlwiOiBcIuWumuW3nuW4glwiLFxuXHQgICAgXCIxMzA2ODNcIjogXCLlronlm73luIJcIixcblx0ICAgIFwiMTMwNjg0XCI6IFwi6auY56KR5bqX5biCXCIsXG5cdCAgICBcIjEzMDY5OVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzA3MDBcIjogXCLlvKDlrrblj6PluIJcIixcblx0ICAgIFwiMTMwNzAyXCI6IFwi5qGl5Lic5Yy6XCIsXG5cdCAgICBcIjEzMDcwM1wiOiBcIuahpeilv+WMulwiLFxuXHQgICAgXCIxMzA3MDVcIjogXCLlrqPljJbljLpcIixcblx0ICAgIFwiMTMwNzA2XCI6IFwi5LiL6Iqx5Zut5Yy6XCIsXG5cdCAgICBcIjEzMDcyMVwiOiBcIuWuo+WMluWOv1wiLFxuXHQgICAgXCIxMzA3MjJcIjogXCLlvKDljJfljr9cIixcblx0ICAgIFwiMTMwNzIzXCI6IFwi5bq35L+d5Y6/XCIsXG5cdCAgICBcIjEzMDcyNFwiOiBcIuayvea6kOWOv1wiLFxuXHQgICAgXCIxMzA3MjVcIjogXCLlsJrkuYnljr9cIixcblx0ICAgIFwiMTMwNzI2XCI6IFwi6JSa5Y6/XCIsXG5cdCAgICBcIjEzMDcyN1wiOiBcIumYs+WOn+WOv1wiLFxuXHQgICAgXCIxMzA3MjhcIjogXCLmgIDlronljr9cIixcblx0ICAgIFwiMTMwNzI5XCI6IFwi5LiH5YWo5Y6/XCIsXG5cdCAgICBcIjEzMDczMFwiOiBcIuaAgOadpeWOv1wiLFxuXHQgICAgXCIxMzA3MzFcIjogXCLmtr/pub/ljr9cIixcblx0ICAgIFwiMTMwNzMyXCI6IFwi6LWk5Z+O5Y6/XCIsXG5cdCAgICBcIjEzMDczM1wiOiBcIuW0h+ekvOWOv1wiLFxuXHQgICAgXCIxMzA3MzRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwODAwXCI6IFwi5om/5b635biCXCIsXG5cdCAgICBcIjEzMDgwMlwiOiBcIuWPjOahpeWMulwiLFxuXHQgICAgXCIxMzA4MDNcIjogXCLlj4zmu6bljLpcIixcblx0ICAgIFwiMTMwODA0XCI6IFwi6bmw5omL6JCl5a2Q55+/5Yy6XCIsXG5cdCAgICBcIjEzMDgyMVwiOiBcIuaJv+W+t+WOv1wiLFxuXHQgICAgXCIxMzA4MjJcIjogXCLlhbTpmobljr9cIixcblx0ICAgIFwiMTMwODIzXCI6IFwi5bmz5rOJ5Y6/XCIsXG5cdCAgICBcIjEzMDgyNFwiOiBcIua7puW5s+WOv1wiLFxuXHQgICAgXCIxMzA4MjVcIjogXCLpmobljJbljr9cIixcblx0ICAgIFwiMTMwODI2XCI6IFwi5Liw5a6B5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjEzMDgyN1wiOiBcIuWuveWfjua7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIxMzA4MjhcIjogXCLlm7TlnLrmu6Hml4/okpnlj6Tml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMTMwODI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDkwMFwiOiBcIuayp+W3nuW4glwiLFxuXHQgICAgXCIxMzA5MDJcIjogXCLmlrDljY7ljLpcIixcblx0ICAgIFwiMTMwOTAzXCI6IFwi6L+Q5rKz5Yy6XCIsXG5cdCAgICBcIjEzMDkyMVwiOiBcIuayp+WOv1wiLFxuXHQgICAgXCIxMzA5MjJcIjogXCLpnZLljr9cIixcblx0ICAgIFwiMTMwOTIzXCI6IFwi5Lic5YWJ5Y6/XCIsXG5cdCAgICBcIjEzMDkyNFwiOiBcIua1t+WFtOWOv1wiLFxuXHQgICAgXCIxMzA5MjVcIjogXCLnm5DlsbHljr9cIixcblx0ICAgIFwiMTMwOTI2XCI6IFwi6IKD5a6B5Y6/XCIsXG5cdCAgICBcIjEzMDkyN1wiOiBcIuWNl+earuWOv1wiLFxuXHQgICAgXCIxMzA5MjhcIjogXCLlkLTmoaXljr9cIixcblx0ICAgIFwiMTMwOTI5XCI6IFwi54yu5Y6/XCIsXG5cdCAgICBcIjEzMDkzMFwiOiBcIuWtn+adkeWbnuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIxMzA5ODFcIjogXCLms4rlpLTluIJcIixcblx0ICAgIFwiMTMwOTgyXCI6IFwi5Lu75LiY5biCXCIsXG5cdCAgICBcIjEzMDk4M1wiOiBcIum7hOmqheW4glwiLFxuXHQgICAgXCIxMzA5ODRcIjogXCLmsrPpl7TluIJcIixcblx0ICAgIFwiMTMwOTg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMTAwMFwiOiBcIuW7iuWdiuW4glwiLFxuXHQgICAgXCIxMzEwMDJcIjogXCLlronmrKHljLpcIixcblx0ICAgIFwiMTMxMDAzXCI6IFwi5bm/6Ziz5Yy6XCIsXG5cdCAgICBcIjEzMTAyMlwiOiBcIuWbuuWuieWOv1wiLFxuXHQgICAgXCIxMzEwMjNcIjogXCLmsLjmuIXljr9cIixcblx0ICAgIFwiMTMxMDI0XCI6IFwi6aaZ5rKz5Y6/XCIsXG5cdCAgICBcIjEzMTAyNVwiOiBcIuWkp+WfjuWOv1wiLFxuXHQgICAgXCIxMzEwMjZcIjogXCLmloflronljr9cIixcblx0ICAgIFwiMTMxMDI4XCI6IFwi5aSn5Y6C5Zue5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjEzMTA4MVwiOiBcIumcuOW3nuW4glwiLFxuXHQgICAgXCIxMzEwODJcIjogXCLkuInmsrPluIJcIixcblx0ICAgIFwiMTMxMDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMTEwMFwiOiBcIuihoeawtOW4glwiLFxuXHQgICAgXCIxMzExMDJcIjogXCLmoYPln47ljLpcIixcblx0ICAgIFwiMTMxMTIxXCI6IFwi5p6j5by65Y6/XCIsXG5cdCAgICBcIjEzMTEyMlwiOiBcIuatpumCkeWOv1wiLFxuXHQgICAgXCIxMzExMjNcIjogXCLmrablvLrljr9cIixcblx0ICAgIFwiMTMxMTI0XCI6IFwi6aW26Ziz5Y6/XCIsXG5cdCAgICBcIjEzMTEyNVwiOiBcIuWuieW5s+WOv1wiLFxuXHQgICAgXCIxMzExMjZcIjogXCLmlYXln47ljr9cIixcblx0ICAgIFwiMTMxMTI3XCI6IFwi5pmv5Y6/XCIsXG5cdCAgICBcIjEzMTEyOFwiOiBcIumYnOWfjuWOv1wiLFxuXHQgICAgXCIxMzExODFcIjogXCLlhoDlt57luIJcIixcblx0ICAgIFwiMTMxMTgyXCI6IFwi5rex5bee5biCXCIsXG5cdCAgICBcIjEzMTE4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDAwMDBcIjogXCLlsbHopb/nnIFcIixcblx0ICAgIFwiMTQwMTAwXCI6IFwi5aSq5Y6f5biCXCIsXG5cdCAgICBcIjE0MDEwNVwiOiBcIuWwj+W6l+WMulwiLFxuXHQgICAgXCIxNDAxMDZcIjogXCLov47ms73ljLpcIixcblx0ICAgIFwiMTQwMTA3XCI6IFwi5p2P6Iqx5bKt5Yy6XCIsXG5cdCAgICBcIjE0MDEwOFwiOiBcIuWwluiNieWdquWMulwiLFxuXHQgICAgXCIxNDAxMDlcIjogXCLkuIfmn4/mnpfljLpcIixcblx0ICAgIFwiMTQwMTEwXCI6IFwi5pmL5rqQ5Yy6XCIsXG5cdCAgICBcIjE0MDEyMVwiOiBcIua4heW+kOWOv1wiLFxuXHQgICAgXCIxNDAxMjJcIjogXCLpmLPmm7Lljr9cIixcblx0ICAgIFwiMTQwMTIzXCI6IFwi5aiE54Om5Y6/XCIsXG5cdCAgICBcIjE0MDE4MVwiOiBcIuWPpOS6pOW4glwiLFxuXHQgICAgXCIxNDAxODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwMjAwXCI6IFwi5aSn5ZCM5biCXCIsXG5cdCAgICBcIjE0MDIwMlwiOiBcIuWfjuWMulwiLFxuXHQgICAgXCIxNDAyMDNcIjogXCLnn7/ljLpcIixcblx0ICAgIFwiMTQwMjExXCI6IFwi5Y2X6YOK5Yy6XCIsXG5cdCAgICBcIjE0MDIxMlwiOiBcIuaWsOiNo+WMulwiLFxuXHQgICAgXCIxNDAyMjFcIjogXCLpmLPpq5jljr9cIixcblx0ICAgIFwiMTQwMjIyXCI6IFwi5aSp6ZWH5Y6/XCIsXG5cdCAgICBcIjE0MDIyM1wiOiBcIuW5v+eBteWOv1wiLFxuXHQgICAgXCIxNDAyMjRcIjogXCLngbXkuJjljr9cIixcblx0ICAgIFwiMTQwMjI1XCI6IFwi5rWR5rqQ5Y6/XCIsXG5cdCAgICBcIjE0MDIyNlwiOiBcIuW3puS6keWOv1wiLFxuXHQgICAgXCIxNDAyMjdcIjogXCLlpKflkIzljr9cIixcblx0ICAgIFwiMTQwMjI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDMwMFwiOiBcIumYs+azieW4glwiLFxuXHQgICAgXCIxNDAzMDJcIjogXCLln47ljLpcIixcblx0ICAgIFwiMTQwMzAzXCI6IFwi55+/5Yy6XCIsXG5cdCAgICBcIjE0MDMxMVwiOiBcIumDiuWMulwiLFxuXHQgICAgXCIxNDAzMjFcIjogXCLlubPlrprljr9cIixcblx0ICAgIFwiMTQwMzIyXCI6IFwi55uC5Y6/XCIsXG5cdCAgICBcIjE0MDMyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDA0MDBcIjogXCLplb/msrvluIJcIixcblx0ICAgIFwiMTQwNDIxXCI6IFwi6ZW/5rK75Y6/XCIsXG5cdCAgICBcIjE0MDQyM1wiOiBcIuilhOWeo+WOv1wiLFxuXHQgICAgXCIxNDA0MjRcIjogXCLlsa/nlZnljr9cIixcblx0ICAgIFwiMTQwNDI1XCI6IFwi5bmz6aG65Y6/XCIsXG5cdCAgICBcIjE0MDQyNlwiOiBcIum7juWfjuWOv1wiLFxuXHQgICAgXCIxNDA0MjdcIjogXCLlo7blhbPljr9cIixcblx0ICAgIFwiMTQwNDI4XCI6IFwi6ZW/5a2Q5Y6/XCIsXG5cdCAgICBcIjE0MDQyOVwiOiBcIuatpuS5oeWOv1wiLFxuXHQgICAgXCIxNDA0MzBcIjogXCLmsoHljr9cIixcblx0ICAgIFwiMTQwNDMxXCI6IFwi5rKB5rqQ5Y6/XCIsXG5cdCAgICBcIjE0MDQ4MVwiOiBcIua9nuWfjuW4glwiLFxuXHQgICAgXCIxNDA0ODJcIjogXCLln47ljLpcIixcblx0ICAgIFwiMTQwNDgzXCI6IFwi6YOK5Yy6XCIsXG5cdCAgICBcIjE0MDQ4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDA1MDBcIjogXCLmmYvln47luIJcIixcblx0ICAgIFwiMTQwNTAyXCI6IFwi5Z+O5Yy6XCIsXG5cdCAgICBcIjE0MDUyMVwiOiBcIuaygeawtOWOv1wiLFxuXHQgICAgXCIxNDA1MjJcIjogXCLpmLPln47ljr9cIixcblx0ICAgIFwiMTQwNTI0XCI6IFwi6Zm15bed5Y6/XCIsXG5cdCAgICBcIjE0MDUyNVwiOiBcIuazveW3nuWOv1wiLFxuXHQgICAgXCIxNDA1ODFcIjogXCLpq5jlubPluIJcIixcblx0ICAgIFwiMTQwNTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDYwMFwiOiBcIuaclOW3nuW4glwiLFxuXHQgICAgXCIxNDA2MDJcIjogXCLmnJTln47ljLpcIixcblx0ICAgIFwiMTQwNjAzXCI6IFwi5bmz6bKB5Yy6XCIsXG5cdCAgICBcIjE0MDYyMVwiOiBcIuWxsemYtOWOv1wiLFxuXHQgICAgXCIxNDA2MjJcIjogXCLlupTljr9cIixcblx0ICAgIFwiMTQwNjIzXCI6IFwi5Y+z546J5Y6/XCIsXG5cdCAgICBcIjE0MDYyNFwiOiBcIuaAgOS7geWOv1wiLFxuXHQgICAgXCIxNDA2MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwNzAwXCI6IFwi5pmL5Lit5biCXCIsXG5cdCAgICBcIjE0MDcwMlwiOiBcIuamhuasoeWMulwiLFxuXHQgICAgXCIxNDA3MjFcIjogXCLmpobnpL7ljr9cIixcblx0ICAgIFwiMTQwNzIyXCI6IFwi5bem5p2D5Y6/XCIsXG5cdCAgICBcIjE0MDcyM1wiOiBcIuWSjOmhuuWOv1wiLFxuXHQgICAgXCIxNDA3MjRcIjogXCLmmJTpmLPljr9cIixcblx0ICAgIFwiMTQwNzI1XCI6IFwi5a+/6Ziz5Y6/XCIsXG5cdCAgICBcIjE0MDcyNlwiOiBcIuWkquiwt+WOv1wiLFxuXHQgICAgXCIxNDA3MjdcIjogXCLnpYHljr9cIixcblx0ICAgIFwiMTQwNzI4XCI6IFwi5bmz6YGl5Y6/XCIsXG5cdCAgICBcIjE0MDcyOVwiOiBcIueBteefs+WOv1wiLFxuXHQgICAgXCIxNDA3ODFcIjogXCLku4vkvJHluIJcIixcblx0ICAgIFwiMTQwNzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDgwMFwiOiBcIui/kOWfjuW4glwiLFxuXHQgICAgXCIxNDA4MDJcIjogXCLnm5DmuZbljLpcIixcblx0ICAgIFwiMTQwODIxXCI6IFwi5Li054yX5Y6/XCIsXG5cdCAgICBcIjE0MDgyMlwiOiBcIuS4h+iNo+WOv1wiLFxuXHQgICAgXCIxNDA4MjNcIjogXCLpl7vllpzljr9cIixcblx0ICAgIFwiMTQwODI0XCI6IFwi56i35bGx5Y6/XCIsXG5cdCAgICBcIjE0MDgyNVwiOiBcIuaWsOe7m+WOv1wiLFxuXHQgICAgXCIxNDA4MjZcIjogXCLnu5vljr9cIixcblx0ICAgIFwiMTQwODI3XCI6IFwi5Z6j5puy5Y6/XCIsXG5cdCAgICBcIjE0MDgyOFwiOiBcIuWkj+WOv1wiLFxuXHQgICAgXCIxNDA4MjlcIjogXCLlubPpmYbljr9cIixcblx0ICAgIFwiMTQwODMwXCI6IFwi6Iqu5Z+O5Y6/XCIsXG5cdCAgICBcIjE0MDg4MVwiOiBcIuawuOa1juW4glwiLFxuXHQgICAgXCIxNDA4ODJcIjogXCLmsrPmtKXluIJcIixcblx0ICAgIFwiMTQwODgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDkwMFwiOiBcIuW/u+W3nuW4glwiLFxuXHQgICAgXCIxNDA5MDJcIjogXCLlv7vlupzljLpcIixcblx0ICAgIFwiMTQwOTIxXCI6IFwi5a6a6KWE5Y6/XCIsXG5cdCAgICBcIjE0MDkyMlwiOiBcIuS6lOWPsOWOv1wiLFxuXHQgICAgXCIxNDA5MjNcIjogXCLku6Pljr9cIixcblx0ICAgIFwiMTQwOTI0XCI6IFwi57mB5bOZ5Y6/XCIsXG5cdCAgICBcIjE0MDkyNVwiOiBcIuWugeatpuWOv1wiLFxuXHQgICAgXCIxNDA5MjZcIjogXCLpnZnkuZDljr9cIixcblx0ICAgIFwiMTQwOTI3XCI6IFwi56We5rGg5Y6/XCIsXG5cdCAgICBcIjE0MDkyOFwiOiBcIuS6lOWvqOWOv1wiLFxuXHQgICAgXCIxNDA5MjlcIjogXCLlsqLlsprljr9cIixcblx0ICAgIFwiMTQwOTMwXCI6IFwi5rKz5puy5Y6/XCIsXG5cdCAgICBcIjE0MDkzMVwiOiBcIuS/neW+t+WOv1wiLFxuXHQgICAgXCIxNDA5MzJcIjogXCLlgY/lhbPljr9cIixcblx0ICAgIFwiMTQwOTgxXCI6IFwi5Y6f5bmz5biCXCIsXG5cdCAgICBcIjE0MDk4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDEwMDBcIjogXCLkuLTmsb7luIJcIixcblx0ICAgIFwiMTQxMDAyXCI6IFwi5bCn6YO95Yy6XCIsXG5cdCAgICBcIjE0MTAyMVwiOiBcIuabsuayg+WOv1wiLFxuXHQgICAgXCIxNDEwMjJcIjogXCLnv7zln47ljr9cIixcblx0ICAgIFwiMTQxMDIzXCI6IFwi6KWE5rG+5Y6/XCIsXG5cdCAgICBcIjE0MTAyNFwiOiBcIua0qua0nuWOv1wiLFxuXHQgICAgXCIxNDEwMjVcIjogXCLlj6Tljr9cIixcblx0ICAgIFwiMTQxMDI2XCI6IFwi5a6J5rO95Y6/XCIsXG5cdCAgICBcIjE0MTAyN1wiOiBcIua1ruWxseWOv1wiLFxuXHQgICAgXCIxNDEwMjhcIjogXCLlkInljr9cIixcblx0ICAgIFwiMTQxMDI5XCI6IFwi5Lmh5a6B5Y6/XCIsXG5cdCAgICBcIjE0MTAzMFwiOiBcIuWkp+WugeWOv1wiLFxuXHQgICAgXCIxNDEwMzFcIjogXCLpmrDljr9cIixcblx0ICAgIFwiMTQxMDMyXCI6IFwi5rC45ZKM5Y6/XCIsXG5cdCAgICBcIjE0MTAzM1wiOiBcIuiSsuWOv1wiLFxuXHQgICAgXCIxNDEwMzRcIjogXCLmsb7opb/ljr9cIixcblx0ICAgIFwiMTQxMDgxXCI6IFwi5L6v6ams5biCXCIsXG5cdCAgICBcIjE0MTA4MlwiOiBcIumcjeW3nuW4glwiLFxuXHQgICAgXCIxNDEwODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQxMTAwXCI6IFwi5ZCV5qKB5biCXCIsXG5cdCAgICBcIjE0MTEwMlwiOiBcIuemu+efs+WMulwiLFxuXHQgICAgXCIxNDExMjFcIjogXCLmlofmsLTljr9cIixcblx0ICAgIFwiMTQxMTIyXCI6IFwi5Lqk5Z+O5Y6/XCIsXG5cdCAgICBcIjE0MTEyM1wiOiBcIuWFtOWOv1wiLFxuXHQgICAgXCIxNDExMjRcIjogXCLkuLTljr9cIixcblx0ICAgIFwiMTQxMTI1XCI6IFwi5p+z5p6X5Y6/XCIsXG5cdCAgICBcIjE0MTEyNlwiOiBcIuefs+alvOWOv1wiLFxuXHQgICAgXCIxNDExMjdcIjogXCLlsprljr9cIixcblx0ICAgIFwiMTQxMTI4XCI6IFwi5pa55bGx5Y6/XCIsXG5cdCAgICBcIjE0MTEyOVwiOiBcIuS4remYs+WOv1wiLFxuXHQgICAgXCIxNDExMzBcIjogXCLkuqTlj6Pljr9cIixcblx0ICAgIFwiMTQxMTgxXCI6IFwi5a2d5LmJ5biCXCIsXG5cdCAgICBcIjE0MTE4MlwiOiBcIuaxvumYs+W4glwiLFxuXHQgICAgXCIxNDExODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwMDAwXCI6IFwi5YaF6JKZ5Y+k6Ieq5rK75Yy6XCIsXG5cdCAgICBcIjE1MDEwMFwiOiBcIuWRvOWSjOa1qeeJueW4glwiLFxuXHQgICAgXCIxNTAxMDJcIjogXCLmlrDln47ljLpcIixcblx0ICAgIFwiMTUwMTAzXCI6IFwi5Zue5rCR5Yy6XCIsXG5cdCAgICBcIjE1MDEwNFwiOiBcIueOieazieWMulwiLFxuXHQgICAgXCIxNTAxMDVcIjogXCLotZvnvZXljLpcIixcblx0ICAgIFwiMTUwMTIxXCI6IFwi5Zyf6buY54m55bem5peXXCIsXG5cdCAgICBcIjE1MDEyMlwiOiBcIuaJmOWFi+aJmOWOv1wiLFxuXHQgICAgXCIxNTAxMjNcIjogXCLlkozmnpfmoLzlsJTljr9cIixcblx0ICAgIFwiMTUwMTI0XCI6IFwi5riF5rC05rKz5Y6/XCIsXG5cdCAgICBcIjE1MDEyNVwiOiBcIuatpuW3neWOv1wiLFxuXHQgICAgXCIxNTAxMjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwMjAwXCI6IFwi5YyF5aS05biCXCIsXG5cdCAgICBcIjE1MDIwMlwiOiBcIuS4nOays+WMulwiLFxuXHQgICAgXCIxNTAyMDNcIjogXCLmmIbpg73ku5HljLpcIixcblx0ICAgIFwiMTUwMjA0XCI6IFwi6Z2S5bGx5Yy6XCIsXG5cdCAgICBcIjE1MDIwNVwiOiBcIuefs+aLkOWMulwiLFxuXHQgICAgXCIxNTAyMDZcIjogXCLnmb3kupHphILljZrnn7/ljLpcIixcblx0ICAgIFwiMTUwMjA3XCI6IFwi5Lmd5Y6f5Yy6XCIsXG5cdCAgICBcIjE1MDIyMVwiOiBcIuWcn+m7mOeJueWPs+aXl1wiLFxuXHQgICAgXCIxNTAyMjJcIjogXCLlm7rpmLPljr9cIixcblx0ICAgIFwiMTUwMjIzXCI6IFwi6L6+5bCU572V6IyC5piO5a6J6IGU5ZCI5peXXCIsXG5cdCAgICBcIjE1MDIyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTAzMDBcIjogXCLkuYzmtbfluIJcIixcblx0ICAgIFwiMTUwMzAyXCI6IFwi5rW35YuD5rm+5Yy6XCIsXG5cdCAgICBcIjE1MDMwM1wiOiBcIua1t+WNl+WMulwiLFxuXHQgICAgXCIxNTAzMDRcIjogXCLkuYzovr7ljLpcIixcblx0ICAgIFwiMTUwMzA1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDQwMFwiOiBcIui1pOWzsOW4glwiLFxuXHQgICAgXCIxNTA0MDJcIjogXCLnuqLlsbHljLpcIixcblx0ICAgIFwiMTUwNDAzXCI6IFwi5YWD5a6d5bGx5Yy6XCIsXG5cdCAgICBcIjE1MDQwNFwiOiBcIuadvuWxseWMulwiLFxuXHQgICAgXCIxNTA0MjFcIjogXCLpmL/psoHnp5HlsJTmsoHml5dcIixcblx0ICAgIFwiMTUwNDIyXCI6IFwi5be05p6X5bem5peXXCIsXG5cdCAgICBcIjE1MDQyM1wiOiBcIuW3tOael+WPs+aXl1wiLFxuXHQgICAgXCIxNTA0MjRcIjogXCLmnpfopb/ljr9cIixcblx0ICAgIFwiMTUwNDI1XCI6IFwi5YWL5LuA5YWL6IW+5peXXCIsXG5cdCAgICBcIjE1MDQyNlwiOiBcIue/geeJm+eJueaXl1wiLFxuXHQgICAgXCIxNTA0MjhcIjogXCLlloDllofmsoHml5dcIixcblx0ICAgIFwiMTUwNDI5XCI6IFwi5a6B5Z+O5Y6/XCIsXG5cdCAgICBcIjE1MDQzMFwiOiBcIuaVluaxieaXl1wiLFxuXHQgICAgXCIxNTA0MzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwNTAwXCI6IFwi6YCa6L695biCXCIsXG5cdCAgICBcIjE1MDUwMlwiOiBcIuenkeWwlOaygeWMulwiLFxuXHQgICAgXCIxNTA1MjFcIjogXCLnp5HlsJTmsoHlt6bnv7zkuK3ml5dcIixcblx0ICAgIFwiMTUwNTIyXCI6IFwi56eR5bCU5rKB5bem57+85ZCO5peXXCIsXG5cdCAgICBcIjE1MDUyM1wiOiBcIuW8gOmygeWOv1wiLFxuXHQgICAgXCIxNTA1MjRcIjogXCLlupPkvKbml5dcIixcblx0ICAgIFwiMTUwNTI1XCI6IFwi5aWI5pu85peXXCIsXG5cdCAgICBcIjE1MDUyNlwiOiBcIuaJjumygeeJueaXl1wiLFxuXHQgICAgXCIxNTA1ODFcIjogXCLpnI3mnpfpg63li5LluIJcIixcblx0ICAgIFwiMTUwNTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDYwMFwiOiBcIumEguWwlOWkmuaWr+W4glwiLFxuXHQgICAgXCIxNTA2MDJcIjogXCLkuJzog5zljLpcIixcblx0ICAgIFwiMTUwNjIxXCI6IFwi6L6+5ouJ54m55peXXCIsXG5cdCAgICBcIjE1MDYyMlwiOiBcIuWHhuagvOWwlOaXl1wiLFxuXHQgICAgXCIxNTA2MjNcIjogXCLphILmiZjlhYvliY3ml5dcIixcblx0ICAgIFwiMTUwNjI0XCI6IFwi6YSC5omY5YWL5peXXCIsXG5cdCAgICBcIjE1MDYyNVwiOiBcIuadremUpuaXl1wiLFxuXHQgICAgXCIxNTA2MjZcIjogXCLkuYzlrqHml5dcIixcblx0ICAgIFwiMTUwNjI3XCI6IFwi5LyK6YeR6ZyN5rSb5peXXCIsXG5cdCAgICBcIjE1MDYyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTA3MDBcIjogXCLlkbzkvKbotJ3lsJTluIJcIixcblx0ICAgIFwiMTUwNzAyXCI6IFwi5rW35ouJ5bCU5Yy6XCIsXG5cdCAgICBcIjE1MDcwM1wiOiBcIuaJjui1ieivuuWwlOWMulwiLFxuXHQgICAgXCIxNTA3MjFcIjogXCLpmL/ojaPml5dcIixcblx0ICAgIFwiMTUwNzIyXCI6IFwi6I6r5Yqb6L6+55Om6L6+5pah5bCU5peP6Ieq5rK75peXXCIsXG5cdCAgICBcIjE1MDcyM1wiOiBcIumEguS8puaYpeiHquayu+aXl1wiLFxuXHQgICAgXCIxNTA3MjRcIjogXCLphILmuKnlhYvml4/oh6rmsrvml5dcIixcblx0ICAgIFwiMTUwNzI1XCI6IFwi6ZmI5be05bCU6JmO5peXXCIsXG5cdCAgICBcIjE1MDcyNlwiOiBcIuaWsOW3tOWwlOiZjuW3puaXl1wiLFxuXHQgICAgXCIxNTA3MjdcIjogXCLmlrDlt7TlsJTomY7lj7Pml5dcIixcblx0ICAgIFwiMTUwNzgxXCI6IFwi5ruh5rSy6YeM5biCXCIsXG5cdCAgICBcIjE1MDc4MlwiOiBcIueJmeWFi+efs+W4glwiLFxuXHQgICAgXCIxNTA3ODNcIjogXCLmiY7lhbDlsa/luIJcIixcblx0ICAgIFwiMTUwNzg0XCI6IFwi6aKd5bCU5Y+k57qz5biCXCIsXG5cdCAgICBcIjE1MDc4NVwiOiBcIuagueays+W4glwiLFxuXHQgICAgXCIxNTA3ODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwODAwXCI6IFwi5be05b2m5reW5bCU5biCXCIsXG5cdCAgICBcIjE1MDgwMlwiOiBcIuS4tOays+WMulwiLFxuXHQgICAgXCIxNTA4MjFcIjogXCLkupTljp/ljr9cIixcblx0ICAgIFwiMTUwODIyXCI6IFwi56O05Y+j5Y6/XCIsXG5cdCAgICBcIjE1MDgyM1wiOiBcIuS5jOaLieeJueWJjeaXl1wiLFxuXHQgICAgXCIxNTA4MjRcIjogXCLkuYzmi4nnibnkuK3ml5dcIixcblx0ICAgIFwiMTUwODI1XCI6IFwi5LmM5ouJ54m55ZCO5peXXCIsXG5cdCAgICBcIjE1MDgyNlwiOiBcIuadremUpuWQjuaXl1wiLFxuXHQgICAgXCIxNTA4MjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwOTAwXCI6IFwi5LmM5YWw5a+f5biD5biCXCIsXG5cdCAgICBcIjE1MDkwMlwiOiBcIumbhuWugeWMulwiLFxuXHQgICAgXCIxNTA5MjFcIjogXCLljZPotYTljr9cIixcblx0ICAgIFwiMTUwOTIyXCI6IFwi5YyW5b635Y6/XCIsXG5cdCAgICBcIjE1MDkyM1wiOiBcIuWVhumDveWOv1wiLFxuXHQgICAgXCIxNTA5MjRcIjogXCLlhbTlkozljr9cIixcblx0ICAgIFwiMTUwOTI1XCI6IFwi5YeJ5Z+O5Y6/XCIsXG5cdCAgICBcIjE1MDkyNlwiOiBcIuWvn+WTiOWwlOWPs+e/vOWJjeaXl1wiLFxuXHQgICAgXCIxNTA5MjdcIjogXCLlr5/lk4jlsJTlj7Pnv7zkuK3ml5dcIixcblx0ICAgIFwiMTUwOTI4XCI6IFwi5a+f5ZOI5bCU5Y+z57+85ZCO5peXXCIsXG5cdCAgICBcIjE1MDkyOVwiOiBcIuWbm+WtkOeOi+aXl1wiLFxuXHQgICAgXCIxNTA5ODFcIjogXCLkuLDplYfluIJcIixcblx0ICAgIFwiMTUwOTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MjIwMFwiOiBcIuWFtOWuieebn1wiLFxuXHQgICAgXCIxNTIyMDFcIjogXCLkuYzlhbDmtannibnluIJcIixcblx0ICAgIFwiMTUyMjAyXCI6IFwi6Zi/5bCU5bGx5biCXCIsXG5cdCAgICBcIjE1MjIyMVwiOiBcIuenkeWwlOaygeWPs+e/vOWJjeaXl1wiLFxuXHQgICAgXCIxNTIyMjJcIjogXCLnp5HlsJTmsoHlj7Pnv7zkuK3ml5dcIixcblx0ICAgIFwiMTUyMjIzXCI6IFwi5omO6LWJ54m55peXXCIsXG5cdCAgICBcIjE1MjIyNFwiOiBcIueqgeazieWOv1wiLFxuXHQgICAgXCIxNTIyMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUyNTAwXCI6IFwi6ZSh5p6X6YOt5YuS55ufXCIsXG5cdCAgICBcIjE1MjUwMVwiOiBcIuS6jOi/nua1qeeJueW4glwiLFxuXHQgICAgXCIxNTI1MDJcIjogXCLplKHmnpfmtannibnluIJcIixcblx0ICAgIFwiMTUyNTIyXCI6IFwi6Zi/5be05ZiO5peXXCIsXG5cdCAgICBcIjE1MjUyM1wiOiBcIuiLj+WwvOeJueW3puaXl1wiLFxuXHQgICAgXCIxNTI1MjRcIjogXCLoi4/lsLznibnlj7Pml5dcIixcblx0ICAgIFwiMTUyNTI1XCI6IFwi5Lic5LmM54+g56mG5rKB5peXXCIsXG5cdCAgICBcIjE1MjUyNlwiOiBcIuilv+S5jOePoOephuaygeaXl1wiLFxuXHQgICAgXCIxNTI1MjdcIjogXCLlpKrku4blr7rml5dcIixcblx0ICAgIFwiMTUyNTI4XCI6IFwi6ZW26buE5peXXCIsXG5cdCAgICBcIjE1MjUyOVwiOiBcIuato+mVtueZveaXl1wiLFxuXHQgICAgXCIxNTI1MzBcIjogXCLmraPok53ml5dcIixcblx0ICAgIFwiMTUyNTMxXCI6IFwi5aSa5Lym5Y6/XCIsXG5cdCAgICBcIjE1MjUzMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTI5MDBcIjogXCLpmL/mi4nlloTnm59cIixcblx0ICAgIFwiMTUyOTIxXCI6IFwi6Zi/5ouJ5ZaE5bem5peXXCIsXG5cdCAgICBcIjE1MjkyMlwiOiBcIumYv+aLieWWhOWPs+aXl1wiLFxuXHQgICAgXCIxNTI5MjNcIjogXCLpop3mtY7nurPml5dcIixcblx0ICAgIFwiMTUyOTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDAwMFwiOiBcIui+veWugeecgVwiLFxuXHQgICAgXCIyMTAxMDBcIjogXCLmsojpmLPluIJcIixcblx0ICAgIFwiMjEwMTAyXCI6IFwi5ZKM5bmz5Yy6XCIsXG5cdCAgICBcIjIxMDEwM1wiOiBcIuayiOays+WMulwiLFxuXHQgICAgXCIyMTAxMDRcIjogXCLlpKfkuJzljLpcIixcblx0ICAgIFwiMjEwMTA1XCI6IFwi55qH5aeR5Yy6XCIsXG5cdCAgICBcIjIxMDEwNlwiOiBcIumTgeilv+WMulwiLFxuXHQgICAgXCIyMTAxMTFcIjogXCLoi4/lrrblsa/ljLpcIixcblx0ICAgIFwiMjEwMTEyXCI6IFwi5Lic6Zm15Yy6XCIsXG5cdCAgICBcIjIxMDExM1wiOiBcIuaWsOWfjuWtkOWMulwiLFxuXHQgICAgXCIyMTAxMTRcIjogXCLkuo7mtKrljLpcIixcblx0ICAgIFwiMjEwMTIyXCI6IFwi6L695Lit5Y6/XCIsXG5cdCAgICBcIjIxMDEyM1wiOiBcIuW6t+W5s+WOv1wiLFxuXHQgICAgXCIyMTAxMjRcIjogXCLms5XlupPljr9cIixcblx0ICAgIFwiMjEwMTgxXCI6IFwi5paw5rCR5biCXCIsXG5cdCAgICBcIjIxMDE4NFwiOiBcIuayiOWMl+aWsOWMulwiLFxuXHQgICAgXCIyMTAxODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwMjAwXCI6IFwi5aSn6L+e5biCXCIsXG5cdCAgICBcIjIxMDIwMlwiOiBcIuS4reWxseWMulwiLFxuXHQgICAgXCIyMTAyMDNcIjogXCLopb/lspfljLpcIixcblx0ICAgIFwiMjEwMjA0XCI6IFwi5rKZ5rKz5Y+j5Yy6XCIsXG5cdCAgICBcIjIxMDIxMVwiOiBcIueUmOS6leWtkOWMulwiLFxuXHQgICAgXCIyMTAyMTJcIjogXCLml4Xpobrlj6PljLpcIixcblx0ICAgIFwiMjEwMjEzXCI6IFwi6YeR5bee5Yy6XCIsXG5cdCAgICBcIjIxMDIyNFwiOiBcIumVv+a1t+WOv1wiLFxuXHQgICAgXCIyMTAyODFcIjogXCLnk6bmiL/lupfluIJcIixcblx0ICAgIFwiMjEwMjgyXCI6IFwi5pmu5YWw5bqX5biCXCIsXG5cdCAgICBcIjIxMDI4M1wiOiBcIuW6hOays+W4glwiLFxuXHQgICAgXCIyMTAyOThcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwMzAwXCI6IFwi6Z6N5bGx5biCXCIsXG5cdCAgICBcIjIxMDMwMlwiOiBcIumTgeS4nOWMulwiLFxuXHQgICAgXCIyMTAzMDNcIjogXCLpk4Hopb/ljLpcIixcblx0ICAgIFwiMjEwMzA0XCI6IFwi56uL5bGx5Yy6XCIsXG5cdCAgICBcIjIxMDMxMVwiOiBcIuWNg+WxseWMulwiLFxuXHQgICAgXCIyMTAzMjFcIjogXCLlj7Dlronljr9cIixcblx0ICAgIFwiMjEwMzIzXCI6IFwi5bKr5bKp5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMDM4MVwiOiBcIua1t+WfjuW4glwiLFxuXHQgICAgXCIyMTAzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwNDAwXCI6IFwi5oqa6aG65biCXCIsXG5cdCAgICBcIjIxMDQwMlwiOiBcIuaWsOaKmuWMulwiLFxuXHQgICAgXCIyMTA0MDNcIjogXCLkuJzmtLLljLpcIixcblx0ICAgIFwiMjEwNDA0XCI6IFwi5pyb6Iqx5Yy6XCIsXG5cdCAgICBcIjIxMDQxMVwiOiBcIumhuuWfjuWMulwiLFxuXHQgICAgXCIyMTA0MjFcIjogXCLmiprpobrljr9cIixcblx0ICAgIFwiMjEwNDIyXCI6IFwi5paw5a6+5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMDQyM1wiOiBcIua4heWOn+a7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTA0MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwNTAwXCI6IFwi5pys5rqq5biCXCIsXG5cdCAgICBcIjIxMDUwMlwiOiBcIuW5s+WxseWMulwiLFxuXHQgICAgXCIyMTA1MDNcIjogXCLmuqrmuZbljLpcIixcblx0ICAgIFwiMjEwNTA0XCI6IFwi5piO5bGx5Yy6XCIsXG5cdCAgICBcIjIxMDUwNVwiOiBcIuWNl+iKrOWMulwiLFxuXHQgICAgXCIyMTA1MjFcIjogXCLmnKzmuqrmu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjEwNTIyXCI6IFwi5qGT5LuB5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMDUyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTA2MDBcIjogXCLkuLnkuJzluIJcIixcblx0ICAgIFwiMjEwNjAyXCI6IFwi5YWD5a6d5Yy6XCIsXG5cdCAgICBcIjIxMDYwM1wiOiBcIuaMr+WFtOWMulwiLFxuXHQgICAgXCIyMTA2MDRcIjogXCLmjK/lronljLpcIixcblx0ICAgIFwiMjEwNjI0XCI6IFwi5a6955S45ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMDY4MVwiOiBcIuS4nOa4r+W4glwiLFxuXHQgICAgXCIyMTA2ODJcIjogXCLlh6Tln47luIJcIixcblx0ICAgIFwiMjEwNjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDcwMFwiOiBcIumUpuW3nuW4glwiLFxuXHQgICAgXCIyMTA3MDJcIjogXCLlj6TloZTljLpcIixcblx0ICAgIFwiMjEwNzAzXCI6IFwi5YeM5rKz5Yy6XCIsXG5cdCAgICBcIjIxMDcxMVwiOiBcIuWkquWSjOWMulwiLFxuXHQgICAgXCIyMTA3MjZcIjogXCLpu5HlsbHljr9cIixcblx0ICAgIFwiMjEwNzI3XCI6IFwi5LmJ5Y6/XCIsXG5cdCAgICBcIjIxMDc4MVwiOiBcIuWHjOa1t+W4glwiLFxuXHQgICAgXCIyMTA3ODJcIjogXCLljJfplYfluIJcIixcblx0ICAgIFwiMjEwNzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDgwMFwiOiBcIuiQpeWPo+W4glwiLFxuXHQgICAgXCIyMTA4MDJcIjogXCLnq5nliY3ljLpcIixcblx0ICAgIFwiMjEwODAzXCI6IFwi6KW/5biC5Yy6XCIsXG5cdCAgICBcIjIxMDgwNFwiOiBcIumyhemxvOWciOWMulwiLFxuXHQgICAgXCIyMTA4MTFcIjogXCLogIHovrnljLpcIixcblx0ICAgIFwiMjEwODgxXCI6IFwi55uW5bee5biCXCIsXG5cdCAgICBcIjIxMDg4MlwiOiBcIuWkp+efs+ahpeW4glwiLFxuXHQgICAgXCIyMTA4ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwOTAwXCI6IFwi6Zic5paw5biCXCIsXG5cdCAgICBcIjIxMDkwMlwiOiBcIua1t+W3nuWMulwiLFxuXHQgICAgXCIyMTA5MDNcIjogXCLmlrDpgrHljLpcIixcblx0ICAgIFwiMjEwOTA0XCI6IFwi5aSq5bmz5Yy6XCIsXG5cdCAgICBcIjIxMDkwNVwiOiBcIua4heays+mXqOWMulwiLFxuXHQgICAgXCIyMTA5MTFcIjogXCLnu4bmsrPljLpcIixcblx0ICAgIFwiMjEwOTIxXCI6IFwi6Zic5paw6JKZ5Y+k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMDkyMlwiOiBcIuW9sOatpuWOv1wiLFxuXHQgICAgXCIyMTA5MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjExMDAwXCI6IFwi6L696Ziz5biCXCIsXG5cdCAgICBcIjIxMTAwMlwiOiBcIueZveWhlOWMulwiLFxuXHQgICAgXCIyMTEwMDNcIjogXCLmloflnKPljLpcIixcblx0ICAgIFwiMjExMDA0XCI6IFwi5a6P5Lyf5Yy6XCIsXG5cdCAgICBcIjIxMTAwNVwiOiBcIuW8k+mVv+WyreWMulwiLFxuXHQgICAgXCIyMTEwMTFcIjogXCLlpKrlrZDmsrPljLpcIixcblx0ICAgIFwiMjExMDIxXCI6IFwi6L696Ziz5Y6/XCIsXG5cdCAgICBcIjIxMTA4MVwiOiBcIueBr+WhlOW4glwiLFxuXHQgICAgXCIyMTEwODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjExMTAwXCI6IFwi55uY6ZSm5biCXCIsXG5cdCAgICBcIjIxMTEwMlwiOiBcIuWPjOWPsOWtkOWMulwiLFxuXHQgICAgXCIyMTExMDNcIjogXCLlhbTpmoblj7DljLpcIixcblx0ICAgIFwiMjExMTIxXCI6IFwi5aSn5rS85Y6/XCIsXG5cdCAgICBcIjIxMTEyMlwiOiBcIuebmOWxseWOv1wiLFxuXHQgICAgXCIyMTExMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjExMjAwXCI6IFwi6ZOB5bKt5biCXCIsXG5cdCAgICBcIjIxMTIwMlwiOiBcIumTtuW3nuWMulwiLFxuXHQgICAgXCIyMTEyMDRcIjogXCLmuIXmsrPljLpcIixcblx0ICAgIFwiMjExMjIxXCI6IFwi6ZOB5bKt5Y6/XCIsXG5cdCAgICBcIjIxMTIyM1wiOiBcIuilv+S4sOWOv1wiLFxuXHQgICAgXCIyMTEyMjRcIjogXCLmmIzlm77ljr9cIixcblx0ICAgIFwiMjExMjgxXCI6IFwi6LCD5YW15bGx5biCXCIsXG5cdCAgICBcIjIxMTI4MlwiOiBcIuW8gOWOn+W4glwiLFxuXHQgICAgXCIyMTEyODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjExMzAwXCI6IFwi5pyd6Ziz5biCXCIsXG5cdCAgICBcIjIxMTMwMlwiOiBcIuWPjOWhlOWMulwiLFxuXHQgICAgXCIyMTEzMDNcIjogXCLpvpnln47ljLpcIixcblx0ICAgIFwiMjExMzIxXCI6IFwi5pyd6Ziz5Y6/XCIsXG5cdCAgICBcIjIxMTMyMlwiOiBcIuW7uuW5s+WOv1wiLFxuXHQgICAgXCIyMTEzMjRcIjogXCLlloDllofmsoHlt6bnv7zokpnlj6Tml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjExMzgxXCI6IFwi5YyX56Wo5biCXCIsXG5cdCAgICBcIjIxMTM4MlwiOiBcIuWHjOa6kOW4glwiLFxuXHQgICAgXCIyMTEzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjExNDAwXCI6IFwi6JGr6Iqm5bKb5biCXCIsXG5cdCAgICBcIjIxMTQwMlwiOiBcIui/nuWxseWMulwiLFxuXHQgICAgXCIyMTE0MDNcIjogXCLpvpnmuK/ljLpcIixcblx0ICAgIFwiMjExNDA0XCI6IFwi5Y2X56Wo5Yy6XCIsXG5cdCAgICBcIjIxMTQyMVwiOiBcIue7peS4reWOv1wiLFxuXHQgICAgXCIyMTE0MjJcIjogXCLlu7rmmIzljr9cIixcblx0ICAgIFwiMjExNDgxXCI6IFwi5YW05Z+O5biCXCIsXG5cdCAgICBcIjIxMTQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjAwMDBcIjogXCLlkInmnpfnnIFcIixcblx0ICAgIFwiMjIwMTAwXCI6IFwi6ZW/5pil5biCXCIsXG5cdCAgICBcIjIyMDEwMlwiOiBcIuWNl+WFs+WMulwiLFxuXHQgICAgXCIyMjAxMDNcIjogXCLlrr3ln47ljLpcIixcblx0ICAgIFwiMjIwMTA0XCI6IFwi5pyd6Ziz5Yy6XCIsXG5cdCAgICBcIjIyMDEwNVwiOiBcIuS6jOmBk+WMulwiLFxuXHQgICAgXCIyMjAxMDZcIjogXCLnu7/lm63ljLpcIixcblx0ICAgIFwiMjIwMTEyXCI6IFwi5Y+M6Ziz5Yy6XCIsXG5cdCAgICBcIjIyMDEyMlwiOiBcIuWGnOWuieWOv1wiLFxuXHQgICAgXCIyMjAxODFcIjogXCLkuZ3lj7DluIJcIixcblx0ICAgIFwiMjIwMTgyXCI6IFwi5qaG5qCR5biCXCIsXG5cdCAgICBcIjIyMDE4M1wiOiBcIuW+t+aDoOW4glwiLFxuXHQgICAgXCIyMjAxODhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwMjAwXCI6IFwi5ZCJ5p6X5biCXCIsXG5cdCAgICBcIjIyMDIwMlwiOiBcIuaYjOmCkeWMulwiLFxuXHQgICAgXCIyMjAyMDNcIjogXCLpvpnmva3ljLpcIixcblx0ICAgIFwiMjIwMjA0XCI6IFwi6Ii56JCl5Yy6XCIsXG5cdCAgICBcIjIyMDIxMVwiOiBcIuS4sOa7oeWMulwiLFxuXHQgICAgXCIyMjAyMjFcIjogXCLmsLjlkInljr9cIixcblx0ICAgIFwiMjIwMjgxXCI6IFwi6Juf5rKz5biCXCIsXG5cdCAgICBcIjIyMDI4MlwiOiBcIuahpueUuOW4glwiLFxuXHQgICAgXCIyMjAyODNcIjogXCLoiJLlhbDluIJcIixcblx0ICAgIFwiMjIwMjg0XCI6IFwi56OQ55+z5biCXCIsXG5cdCAgICBcIjIyMDI4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjAzMDBcIjogXCLlm5vlubPluIJcIixcblx0ICAgIFwiMjIwMzAyXCI6IFwi6ZOB6KW/5Yy6XCIsXG5cdCAgICBcIjIyMDMwM1wiOiBcIumTgeS4nOWMulwiLFxuXHQgICAgXCIyMjAzMjJcIjogXCLmoqjmoJHljr9cIixcblx0ICAgIFwiMjIwMzIzXCI6IFwi5LyK6YCa5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIyMDM4MVwiOiBcIuWFrOS4u+WyreW4glwiLFxuXHQgICAgXCIyMjAzODJcIjogXCLlj4zovr3luIJcIixcblx0ICAgIFwiMjIwMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDQwMFwiOiBcIui+vea6kOW4glwiLFxuXHQgICAgXCIyMjA0MDJcIjogXCLpvpnlsbHljLpcIixcblx0ICAgIFwiMjIwNDAzXCI6IFwi6KW/5a6J5Yy6XCIsXG5cdCAgICBcIjIyMDQyMVwiOiBcIuS4nOS4sOWOv1wiLFxuXHQgICAgXCIyMjA0MjJcIjogXCLkuJzovr3ljr9cIixcblx0ICAgIFwiMjIwNDIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDUwMFwiOiBcIumAmuWMluW4glwiLFxuXHQgICAgXCIyMjA1MDJcIjogXCLkuJzmmIzljLpcIixcblx0ICAgIFwiMjIwNTAzXCI6IFwi5LqM6YGT5rGf5Yy6XCIsXG5cdCAgICBcIjIyMDUyMVwiOiBcIumAmuWMluWOv1wiLFxuXHQgICAgXCIyMjA1MjNcIjogXCLovonljZfljr9cIixcblx0ICAgIFwiMjIwNTI0XCI6IFwi5p+z5rKz5Y6/XCIsXG5cdCAgICBcIjIyMDU4MVwiOiBcIuaiheays+WPo+W4glwiLFxuXHQgICAgXCIyMjA1ODJcIjogXCLpm4blronluIJcIixcblx0ICAgIFwiMjIwNTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDYwMFwiOiBcIueZveWxseW4glwiLFxuXHQgICAgXCIyMjA2MDJcIjogXCLmtZHmsZ/ljLpcIixcblx0ICAgIFwiMjIwNjIxXCI6IFwi5oqa5p2+5Y6/XCIsXG5cdCAgICBcIjIyMDYyMlwiOiBcIumdluWuh+WOv1wiLFxuXHQgICAgXCIyMjA2MjNcIjogXCLplb/nmb3mnJ3pspzml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjIwNjI1XCI6IFwi5rGf5rqQ5Yy6XCIsXG5cdCAgICBcIjIyMDY4MVwiOiBcIuS4tOaxn+W4glwiLFxuXHQgICAgXCIyMjA2ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwNzAwXCI6IFwi5p2+5Y6f5biCXCIsXG5cdCAgICBcIjIyMDcwMlwiOiBcIuWugeaxn+WMulwiLFxuXHQgICAgXCIyMjA3MjFcIjogXCLliY3pg63lsJTnvZfmlq/okpnlj6Tml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjIwNzIyXCI6IFwi6ZW/5bKt5Y6/XCIsXG5cdCAgICBcIjIyMDcyM1wiOiBcIuS5vuWuieWOv1wiLFxuXHQgICAgXCIyMjA3MjRcIjogXCLmibbkvZnluIJcIixcblx0ICAgIFwiMjIwNzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDgwMFwiOiBcIueZveWfjuW4glwiLFxuXHQgICAgXCIyMjA4MDJcIjogXCLmtK7ljJfljLpcIixcblx0ICAgIFwiMjIwODIxXCI6IFwi6ZWH6LWJ5Y6/XCIsXG5cdCAgICBcIjIyMDgyMlwiOiBcIumAmuamhuWOv1wiLFxuXHQgICAgXCIyMjA4ODFcIjogXCLmtK7ljZfluIJcIixcblx0ICAgIFwiMjIwODgyXCI6IFwi5aSn5a6J5biCXCIsXG5cdCAgICBcIjIyMDg4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjI0MDBcIjogXCLlu7bovrnmnJ3pspzml4/oh6rmsrvlt55cIixcblx0ICAgIFwiMjIyNDAxXCI6IFwi5bu25ZCJ5biCXCIsXG5cdCAgICBcIjIyMjQwMlwiOiBcIuWbvuS7rOW4glwiLFxuXHQgICAgXCIyMjI0MDNcIjogXCLmlabljJbluIJcIixcblx0ICAgIFwiMjIyNDA0XCI6IFwi54+y5pil5biCXCIsXG5cdCAgICBcIjIyMjQwNVwiOiBcIum+meS6leW4glwiLFxuXHQgICAgXCIyMjI0MDZcIjogXCLlkozpvpnluIJcIixcblx0ICAgIFwiMjIyNDI0XCI6IFwi5rGq5riF5Y6/XCIsXG5cdCAgICBcIjIyMjQyNlwiOiBcIuWuieWbvuWOv1wiLFxuXHQgICAgXCIyMjI0MjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwMDAwXCI6IFwi6buR6b6Z5rGf55yBXCIsXG5cdCAgICBcIjIzMDEwMFwiOiBcIuWTiOWwlOa7qOW4glwiLFxuXHQgICAgXCIyMzAxMDJcIjogXCLpgZPph4zljLpcIixcblx0ICAgIFwiMjMwMTAzXCI6IFwi5Y2X5bKX5Yy6XCIsXG5cdCAgICBcIjIzMDEwNFwiOiBcIumBk+WkluWMulwiLFxuXHQgICAgXCIyMzAxMDZcIjogXCLpppnlnYrljLpcIixcblx0ICAgIFwiMjMwMTA4XCI6IFwi5bmz5oi/5Yy6XCIsXG5cdCAgICBcIjIzMDEwOVwiOiBcIuadvuWMl+WMulwiLFxuXHQgICAgXCIyMzAxMTFcIjogXCLlkbzlhbDljLpcIixcblx0ICAgIFwiMjMwMTIzXCI6IFwi5L6d5YWw5Y6/XCIsXG5cdCAgICBcIjIzMDEyNFwiOiBcIuaWueato+WOv1wiLFxuXHQgICAgXCIyMzAxMjVcIjogXCLlrr7ljr9cIixcblx0ICAgIFwiMjMwMTI2XCI6IFwi5be05b2m5Y6/XCIsXG5cdCAgICBcIjIzMDEyN1wiOiBcIuacqOWFsOWOv1wiLFxuXHQgICAgXCIyMzAxMjhcIjogXCLpgJrmsrPljr9cIixcblx0ICAgIFwiMjMwMTI5XCI6IFwi5bu25a+/5Y6/XCIsXG5cdCAgICBcIjIzMDE4MVwiOiBcIumYv+WfjuWMulwiLFxuXHQgICAgXCIyMzAxODJcIjogXCLlj4zln47luIJcIixcblx0ICAgIFwiMjMwMTgzXCI6IFwi5bCa5b+X5biCXCIsXG5cdCAgICBcIjIzMDE4NFwiOiBcIuS6lOW4uOW4glwiLFxuXHQgICAgXCIyMzAxODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwMjAwXCI6IFwi6b2Q6b2Q5ZOI5bCU5biCXCIsXG5cdCAgICBcIjIzMDIwMlwiOiBcIum+meaymeWMulwiLFxuXHQgICAgXCIyMzAyMDNcIjogXCLlu7rljY7ljLpcIixcblx0ICAgIFwiMjMwMjA0XCI6IFwi6ZOB6ZSL5Yy6XCIsXG5cdCAgICBcIjIzMDIwNVwiOiBcIuaYguaYgua6quWMulwiLFxuXHQgICAgXCIyMzAyMDZcIjogXCLlr4zmi4nlsJTln7rljLpcIixcblx0ICAgIFwiMjMwMjA3XCI6IFwi56K+5a2Q5bGx5Yy6XCIsXG5cdCAgICBcIjIzMDIwOFwiOiBcIuaihemHjOaWr+i+vuaWoeWwlOaXj+WMulwiLFxuXHQgICAgXCIyMzAyMjFcIjogXCLpvpnmsZ/ljr9cIixcblx0ICAgIFwiMjMwMjIzXCI6IFwi5L6d5a6J5Y6/XCIsXG5cdCAgICBcIjIzMDIyNFwiOiBcIuazsOadpeWOv1wiLFxuXHQgICAgXCIyMzAyMjVcIjogXCLnlJjljZfljr9cIixcblx0ICAgIFwiMjMwMjI3XCI6IFwi5a+M6KOV5Y6/XCIsXG5cdCAgICBcIjIzMDIyOVwiOiBcIuWFi+WxseWOv1wiLFxuXHQgICAgXCIyMzAyMzBcIjogXCLlhYvkuJzljr9cIixcblx0ICAgIFwiMjMwMjMxXCI6IFwi5ouc5rOJ5Y6/XCIsXG5cdCAgICBcIjIzMDI4MVwiOiBcIuiut+ays+W4glwiLFxuXHQgICAgXCIyMzAyODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwMzAwXCI6IFwi6bih6KW/5biCXCIsXG5cdCAgICBcIjIzMDMwMlwiOiBcIum4oeWGoOWMulwiLFxuXHQgICAgXCIyMzAzMDNcIjogXCLmgZLlsbHljLpcIixcblx0ICAgIFwiMjMwMzA0XCI6IFwi5ru06YGT5Yy6XCIsXG5cdCAgICBcIjIzMDMwNVwiOiBcIuaiqOagkeWMulwiLFxuXHQgICAgXCIyMzAzMDZcIjogXCLln47lrZDmsrPljLpcIixcblx0ICAgIFwiMjMwMzA3XCI6IFwi6bq75bGx5Yy6XCIsXG5cdCAgICBcIjIzMDMyMVwiOiBcIum4oeS4nOWOv1wiLFxuXHQgICAgXCIyMzAzODFcIjogXCLomY7mnpfluIJcIixcblx0ICAgIFwiMjMwMzgyXCI6IFwi5a+G5bGx5biCXCIsXG5cdCAgICBcIjIzMDM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzA0MDBcIjogXCLpuaTlspfluIJcIixcblx0ICAgIFwiMjMwNDAyXCI6IFwi5ZCR6Ziz5Yy6XCIsXG5cdCAgICBcIjIzMDQwM1wiOiBcIuW3peWGnOWMulwiLFxuXHQgICAgXCIyMzA0MDRcIjogXCLljZflsbHljLpcIixcblx0ICAgIFwiMjMwNDA1XCI6IFwi5YW05a6J5Yy6XCIsXG5cdCAgICBcIjIzMDQwNlwiOiBcIuS4nOWxseWMulwiLFxuXHQgICAgXCIyMzA0MDdcIjogXCLlhbTlsbHljLpcIixcblx0ICAgIFwiMjMwNDIxXCI6IFwi6JCd5YyX5Y6/XCIsXG5cdCAgICBcIjIzMDQyMlwiOiBcIue7pea7qOWOv1wiLFxuXHQgICAgXCIyMzA0MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwNTAwXCI6IFwi5Y+M6bit5bGx5biCXCIsXG5cdCAgICBcIjIzMDUwMlwiOiBcIuWwluWxseWMulwiLFxuXHQgICAgXCIyMzA1MDNcIjogXCLlsq3kuJzljLpcIixcblx0ICAgIFwiMjMwNTA1XCI6IFwi5Zub5pa55Y+w5Yy6XCIsXG5cdCAgICBcIjIzMDUwNlwiOiBcIuWuneWxseWMulwiLFxuXHQgICAgXCIyMzA1MjFcIjogXCLpm4botKTljr9cIixcblx0ICAgIFwiMjMwNTIyXCI6IFwi5Y+L6LCK5Y6/XCIsXG5cdCAgICBcIjIzMDUyM1wiOiBcIuWunea4heWOv1wiLFxuXHQgICAgXCIyMzA1MjRcIjogXCLppbbmsrPljr9cIixcblx0ICAgIFwiMjMwNTI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDYwMFwiOiBcIuWkp+W6huW4glwiLFxuXHQgICAgXCIyMzA2MDJcIjogXCLokKjlsJTlm77ljLpcIixcblx0ICAgIFwiMjMwNjAzXCI6IFwi6b6Z5Yek5Yy6XCIsXG5cdCAgICBcIjIzMDYwNFwiOiBcIuiuqeiDoei3r+WMulwiLFxuXHQgICAgXCIyMzA2MDVcIjogXCLnuqLlspfljLpcIixcblx0ICAgIFwiMjMwNjA2XCI6IFwi5aSn5ZCM5Yy6XCIsXG5cdCAgICBcIjIzMDYyMVwiOiBcIuiCh+W3nuWOv1wiLFxuXHQgICAgXCIyMzA2MjJcIjogXCLogofmupDljr9cIixcblx0ICAgIFwiMjMwNjIzXCI6IFwi5p6X55S45Y6/XCIsXG5cdCAgICBcIjIzMDYyNFwiOiBcIuadnOWwlOS8r+eJueiSmeWPpOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMzA2MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwNzAwXCI6IFwi5LyK5pil5biCXCIsXG5cdCAgICBcIjIzMDcwMlwiOiBcIuS8iuaYpeWMulwiLFxuXHQgICAgXCIyMzA3MDNcIjogXCLljZflspTljLpcIixcblx0ICAgIFwiMjMwNzA0XCI6IFwi5Y+L5aW95Yy6XCIsXG5cdCAgICBcIjIzMDcwNVwiOiBcIuilv+ael+WMulwiLFxuXHQgICAgXCIyMzA3MDZcIjogXCLnv6Dls6bljLpcIixcblx0ICAgIFwiMjMwNzA3XCI6IFwi5paw6Z2S5Yy6XCIsXG5cdCAgICBcIjIzMDcwOFwiOiBcIue+jua6quWMulwiLFxuXHQgICAgXCIyMzA3MDlcIjogXCLph5HlsbHlsa/ljLpcIixcblx0ICAgIFwiMjMwNzEwXCI6IFwi5LqU6JCl5Yy6XCIsXG5cdCAgICBcIjIzMDcxMVwiOiBcIuS5jOmprOays+WMulwiLFxuXHQgICAgXCIyMzA3MTJcIjogXCLmsaTml7rmsrPljLpcIixcblx0ICAgIFwiMjMwNzEzXCI6IFwi5bim5bKt5Yy6XCIsXG5cdCAgICBcIjIzMDcxNFwiOiBcIuS5jOS8iuWyreWMulwiLFxuXHQgICAgXCIyMzA3MTVcIjogXCLnuqLmmJ/ljLpcIixcblx0ICAgIFwiMjMwNzE2XCI6IFwi5LiK55SY5bKt5Yy6XCIsXG5cdCAgICBcIjIzMDcyMlwiOiBcIuWYieiNq+WOv1wiLFxuXHQgICAgXCIyMzA3ODFcIjogXCLpk4HlipvluIJcIixcblx0ICAgIFwiMjMwNzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDgwMFwiOiBcIuS9s+acqOaWr+W4glwiLFxuXHQgICAgXCIyMzA4MDNcIjogXCLlkJHpmLPljLpcIixcblx0ICAgIFwiMjMwODA0XCI6IFwi5YmN6L+b5Yy6XCIsXG5cdCAgICBcIjIzMDgwNVwiOiBcIuS4nOmjjuWMulwiLFxuXHQgICAgXCIyMzA4MTFcIjogXCLpg4rljLpcIixcblx0ICAgIFwiMjMwODIyXCI6IFwi5qGm5Y2X5Y6/XCIsXG5cdCAgICBcIjIzMDgyNlwiOiBcIuahpuW3neWOv1wiLFxuXHQgICAgXCIyMzA4MjhcIjogXCLmsaTljp/ljr9cIixcblx0ICAgIFwiMjMwODMzXCI6IFwi5oqa6L+c5Y6/XCIsXG5cdCAgICBcIjIzMDg4MVwiOiBcIuWQjOaxn+W4glwiLFxuXHQgICAgXCIyMzA4ODJcIjogXCLlr4zplKbluIJcIixcblx0ICAgIFwiMjMwODgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDkwMFwiOiBcIuS4g+WPsOays+W4glwiLFxuXHQgICAgXCIyMzA5MDJcIjogXCLmlrDlhbTljLpcIixcblx0ICAgIFwiMjMwOTAzXCI6IFwi5qGD5bGx5Yy6XCIsXG5cdCAgICBcIjIzMDkwNFwiOiBcIuiMhOWtkOays+WMulwiLFxuXHQgICAgXCIyMzA5MjFcIjogXCLli4PliKnljr9cIixcblx0ICAgIFwiMjMwOTIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMTAwMFwiOiBcIueJoeS4ueaxn+W4glwiLFxuXHQgICAgXCIyMzEwMDJcIjogXCLkuJzlronljLpcIixcblx0ICAgIFwiMjMxMDAzXCI6IFwi6Ziz5piO5Yy6XCIsXG5cdCAgICBcIjIzMTAwNFwiOiBcIueIseawkeWMulwiLFxuXHQgICAgXCIyMzEwMDVcIjogXCLopb/lronljLpcIixcblx0ICAgIFwiMjMxMDI0XCI6IFwi5Lic5a6B5Y6/XCIsXG5cdCAgICBcIjIzMTAyNVwiOiBcIuael+WPo+WOv1wiLFxuXHQgICAgXCIyMzEwODFcIjogXCLnu6XoiqzmsrPluIJcIixcblx0ICAgIFwiMjMxMDgzXCI6IFwi5rW35p6X5biCXCIsXG5cdCAgICBcIjIzMTA4NFwiOiBcIuWugeWuieW4glwiLFxuXHQgICAgXCIyMzEwODVcIjogXCLnqYbmo7HluIJcIixcblx0ICAgIFwiMjMxMDg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMTEwMFwiOiBcIum7keays+W4glwiLFxuXHQgICAgXCIyMzExMDJcIjogXCLniLHovonljLpcIixcblx0ICAgIFwiMjMxMTIxXCI6IFwi5aup5rGf5Y6/XCIsXG5cdCAgICBcIjIzMTEyM1wiOiBcIumAiuWFi+WOv1wiLFxuXHQgICAgXCIyMzExMjRcIjogXCLlrZnlkLTljr9cIixcblx0ICAgIFwiMjMxMTgxXCI6IFwi5YyX5a6J5biCXCIsXG5cdCAgICBcIjIzMTE4MlwiOiBcIuS6lOWkp+i/nuaxoOW4glwiLFxuXHQgICAgXCIyMzExODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMxMjAwXCI6IFwi57ul5YyW5biCXCIsXG5cdCAgICBcIjIzMTIwMlwiOiBcIuWMl+ael+WMulwiLFxuXHQgICAgXCIyMzEyMjFcIjogXCLmnJvlpY7ljr9cIixcblx0ICAgIFwiMjMxMjIyXCI6IFwi5YWw6KW/5Y6/XCIsXG5cdCAgICBcIjIzMTIyM1wiOiBcIumdkuWGiOWOv1wiLFxuXHQgICAgXCIyMzEyMjRcIjogXCLluoblronljr9cIixcblx0ICAgIFwiMjMxMjI1XCI6IFwi5piO5rC05Y6/XCIsXG5cdCAgICBcIjIzMTIyNlwiOiBcIue7peajseWOv1wiLFxuXHQgICAgXCIyMzEyODFcIjogXCLlronovr7luIJcIixcblx0ICAgIFwiMjMxMjgyXCI6IFwi6IKH5Lic5biCXCIsXG5cdCAgICBcIjIzMTI4M1wiOiBcIua1t+S8puW4glwiLFxuXHQgICAgXCIyMzEyODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMyNzAwXCI6IFwi5aSn5YW05a6J5bKt5Zyw5Yy6XCIsXG5cdCAgICBcIjIzMjcwMlwiOiBcIuadvuWyreWMulwiLFxuXHQgICAgXCIyMzI3MDNcIjogXCLmlrDmnpfljLpcIixcblx0ICAgIFwiMjMyNzA0XCI6IFwi5ZG85Lit5Yy6XCIsXG5cdCAgICBcIjIzMjcyMVwiOiBcIuWRvOeOm+WOv1wiLFxuXHQgICAgXCIyMzI3MjJcIjogXCLloZTmsrPljr9cIixcblx0ICAgIFwiMjMyNzIzXCI6IFwi5ryg5rKz5Y6/XCIsXG5cdCAgICBcIjIzMjcyNFwiOiBcIuWKoOagvOi+vuWlh+WMulwiLFxuXHQgICAgXCIyMzI3MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzEwMDAwXCI6IFwi5LiK5rW3XCIsXG5cdCAgICBcIjMxMDEwMFwiOiBcIuS4iua1t+W4glwiLFxuXHQgICAgXCIzMTAxMDFcIjogXCLpu4TmtabljLpcIixcblx0ICAgIFwiMzEwMTA0XCI6IFwi5b6Q5rGH5Yy6XCIsXG5cdCAgICBcIjMxMDEwNVwiOiBcIumVv+WugeWMulwiLFxuXHQgICAgXCIzMTAxMDZcIjogXCLpnZnlronljLpcIixcblx0ICAgIFwiMzEwMTA3XCI6IFwi5pmu6ZmA5Yy6XCIsXG5cdCAgICBcIjMxMDEwOFwiOiBcIumXuOWMl+WMulwiLFxuXHQgICAgXCIzMTAxMDlcIjogXCLombnlj6PljLpcIixcblx0ICAgIFwiMzEwMTEwXCI6IFwi5p2o5rWm5Yy6XCIsXG5cdCAgICBcIjMxMDExMlwiOiBcIumXteihjOWMulwiLFxuXHQgICAgXCIzMTAxMTNcIjogXCLlrp3lsbHljLpcIixcblx0ICAgIFwiMzEwMTE0XCI6IFwi5ZiJ5a6a5Yy6XCIsXG5cdCAgICBcIjMxMDExNVwiOiBcIua1puS4nOaWsOWMulwiLFxuXHQgICAgXCIzMTAxMTZcIjogXCLph5HlsbHljLpcIixcblx0ICAgIFwiMzEwMTE3XCI6IFwi5p2+5rGf5Yy6XCIsXG5cdCAgICBcIjMxMDExOFwiOiBcIumdkua1puWMulwiLFxuXHQgICAgXCIzMTAxMjBcIjogXCLlpYnotKTljLpcIixcblx0ICAgIFwiMzEwMjMwXCI6IFwi5bSH5piO5Y6/XCIsXG5cdCAgICBcIjMxMDIzMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjAwMDBcIjogXCLmsZ/oi4/nnIFcIixcblx0ICAgIFwiMzIwMTAwXCI6IFwi5Y2X5Lqs5biCXCIsXG5cdCAgICBcIjMyMDEwMlwiOiBcIueOhOatpuWMulwiLFxuXHQgICAgXCIzMjAxMDRcIjogXCLnp6bmt67ljLpcIixcblx0ICAgIFwiMzIwMTA1XCI6IFwi5bu66YK65Yy6XCIsXG5cdCAgICBcIjMyMDEwNlwiOiBcIum8k+alvOWMulwiLFxuXHQgICAgXCIzMjAxMTFcIjogXCLmtablj6PljLpcIixcblx0ICAgIFwiMzIwMTEzXCI6IFwi5qCW6Zye5Yy6XCIsXG5cdCAgICBcIjMyMDExNFwiOiBcIumbqOiKseWPsOWMulwiLFxuXHQgICAgXCIzMjAxMTVcIjogXCLmsZ/lroHljLpcIixcblx0ICAgIFwiMzIwMTE2XCI6IFwi5YWt5ZCI5Yy6XCIsXG5cdCAgICBcIjMyMDEyNFwiOiBcIua6p+awtOWMulwiLFxuXHQgICAgXCIzMjAxMjVcIjogXCLpq5jmt7PljLpcIixcblx0ICAgIFwiMzIwMTI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDIwMFwiOiBcIuaXoOmUoeW4glwiLFxuXHQgICAgXCIzMjAyMDJcIjogXCLltIflronljLpcIixcblx0ICAgIFwiMzIwMjAzXCI6IFwi5Y2X6ZW/5Yy6XCIsXG5cdCAgICBcIjMyMDIwNFwiOiBcIuWMl+WhmOWMulwiLFxuXHQgICAgXCIzMjAyMDVcIjogXCLplKHlsbHljLpcIixcblx0ICAgIFwiMzIwMjA2XCI6IFwi5oOg5bGx5Yy6XCIsXG5cdCAgICBcIjMyMDIxMVwiOiBcIua7qOa5luWMulwiLFxuXHQgICAgXCIzMjAyODFcIjogXCLmsZ/pmLTluIJcIixcblx0ICAgIFwiMzIwMjgyXCI6IFwi5a6c5YW05biCXCIsXG5cdCAgICBcIjMyMDI5N1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjAzMDBcIjogXCLlvpDlt57luIJcIixcblx0ICAgIFwiMzIwMzAyXCI6IFwi6byT5qW85Yy6XCIsXG5cdCAgICBcIjMyMDMwM1wiOiBcIuS6kem+meWMulwiLFxuXHQgICAgXCIzMjAzMDVcIjogXCLotL7msarljLpcIixcblx0ICAgIFwiMzIwMzExXCI6IFwi5rOJ5bGx5Yy6XCIsXG5cdCAgICBcIjMyMDMyMVwiOiBcIuS4sOWOv1wiLFxuXHQgICAgXCIzMjAzMjJcIjogXCLmspvljr9cIixcblx0ICAgIFwiMzIwMzIzXCI6IFwi6ZOc5bGx5Yy6XCIsXG5cdCAgICBcIjMyMDMyNFwiOiBcIuedouWugeWOv1wiLFxuXHQgICAgXCIzMjAzODFcIjogXCLmlrDmsoLluIJcIixcblx0ICAgIFwiMzIwMzgyXCI6IFwi6YKz5bee5biCXCIsXG5cdCAgICBcIjMyMDM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjA0MDBcIjogXCLluLjlt57luIJcIixcblx0ICAgIFwiMzIwNDAyXCI6IFwi5aSp5a6B5Yy6XCIsXG5cdCAgICBcIjMyMDQwNFwiOiBcIumSn+alvOWMulwiLFxuXHQgICAgXCIzMjA0MDVcIjogXCLmiJrlooXloLDljLpcIixcblx0ICAgIFwiMzIwNDExXCI6IFwi5paw5YyX5Yy6XCIsXG5cdCAgICBcIjMyMDQxMlwiOiBcIuatpui/m+WMulwiLFxuXHQgICAgXCIzMjA0ODFcIjogXCLmuqfpmLPluIJcIixcblx0ICAgIFwiMzIwNDgyXCI6IFwi6YeR5Z2b5biCXCIsXG5cdCAgICBcIjMyMDQ4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjA1MDBcIjogXCLoi4/lt57luIJcIixcblx0ICAgIFwiMzIwNTA1XCI6IFwi6JmO5LiY5Yy6XCIsXG5cdCAgICBcIjMyMDUwNlwiOiBcIuWQtOS4reWMulwiLFxuXHQgICAgXCIzMjA1MDdcIjogXCLnm7jln47ljLpcIixcblx0ICAgIFwiMzIwNTA4XCI6IFwi5aeR6IuP5Yy6XCIsXG5cdCAgICBcIjMyMDU4MVwiOiBcIuW4uOeGn+W4glwiLFxuXHQgICAgXCIzMjA1ODJcIjogXCLlvKDlrrbmuK/luIJcIixcblx0ICAgIFwiMzIwNTgzXCI6IFwi5piG5bGx5biCXCIsXG5cdCAgICBcIjMyMDU4NFwiOiBcIuWQtOaxn+WMulwiLFxuXHQgICAgXCIzMjA1ODVcIjogXCLlpKrku5PluIJcIixcblx0ICAgIFwiMzIwNTk2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDYwMFwiOiBcIuWNl+mAmuW4glwiLFxuXHQgICAgXCIzMjA2MDJcIjogXCLltIflt53ljLpcIixcblx0ICAgIFwiMzIwNjExXCI6IFwi5riv6Ze45Yy6XCIsXG5cdCAgICBcIjMyMDYxMlwiOiBcIumAmuW3nuWMulwiLFxuXHQgICAgXCIzMjA2MjFcIjogXCLmtbflronljr9cIixcblx0ICAgIFwiMzIwNjIzXCI6IFwi5aaC5Lic5Y6/XCIsXG5cdCAgICBcIjMyMDY4MVwiOiBcIuWQr+S4nOW4glwiLFxuXHQgICAgXCIzMjA2ODJcIjogXCLlpoLnmovluIJcIixcblx0ICAgIFwiMzIwNjg0XCI6IFwi5rW36Zeo5biCXCIsXG5cdCAgICBcIjMyMDY5NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjA3MDBcIjogXCLov57kupHmuK/luIJcIixcblx0ICAgIFwiMzIwNzAzXCI6IFwi6L+e5LqR5Yy6XCIsXG5cdCAgICBcIjMyMDcwNVwiOiBcIuaWsOa1puWMulwiLFxuXHQgICAgXCIzMjA3MDZcIjogXCLmtbflt57ljLpcIixcblx0ICAgIFwiMzIwNzIxXCI6IFwi6LWj5qaG5Y6/XCIsXG5cdCAgICBcIjMyMDcyMlwiOiBcIuS4nOa1t+WOv1wiLFxuXHQgICAgXCIzMjA3MjNcIjogXCLngYzkupHljr9cIixcblx0ICAgIFwiMzIwNzI0XCI6IFwi54GM5Y2X5Y6/XCIsXG5cdCAgICBcIjMyMDcyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjA4MDBcIjogXCLmt67lronluIJcIixcblx0ICAgIFwiMzIwODAyXCI6IFwi5riF5rKz5Yy6XCIsXG5cdCAgICBcIjMyMDgwM1wiOiBcIua3ruWuieWMulwiLFxuXHQgICAgXCIzMjA4MDRcIjogXCLmt67pmLTljLpcIixcblx0ICAgIFwiMzIwODExXCI6IFwi5riF5rWm5Yy6XCIsXG5cdCAgICBcIjMyMDgyNlwiOiBcIua2n+awtOWOv1wiLFxuXHQgICAgXCIzMjA4MjlcIjogXCLmtKrms73ljr9cIixcblx0ICAgIFwiMzIwODMwXCI6IFwi55ux55yZ5Y6/XCIsXG5cdCAgICBcIjMyMDgzMVwiOiBcIumHkea5luWOv1wiLFxuXHQgICAgXCIzMjA4MzJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwOTAwXCI6IFwi55uQ5Z+O5biCXCIsXG5cdCAgICBcIjMyMDkwMlwiOiBcIuS6rea5luWMulwiLFxuXHQgICAgXCIzMjA5MDNcIjogXCLnm5Dpg73ljLpcIixcblx0ICAgIFwiMzIwOTIxXCI6IFwi5ZON5rC05Y6/XCIsXG5cdCAgICBcIjMyMDkyMlwiOiBcIua7qOa1t+WOv1wiLFxuXHQgICAgXCIzMjA5MjNcIjogXCLpmJzlroHljr9cIixcblx0ICAgIFwiMzIwOTI0XCI6IFwi5bCE6Ziz5Y6/XCIsXG5cdCAgICBcIjMyMDkyNVwiOiBcIuW7uua5luWOv1wiLFxuXHQgICAgXCIzMjA5ODFcIjogXCLkuJzlj7DluIJcIixcblx0ICAgIFwiMzIwOTgyXCI6IFwi5aSn5Liw5biCXCIsXG5cdCAgICBcIjMyMDk4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjEwMDBcIjogXCLmiazlt57luIJcIixcblx0ICAgIFwiMzIxMDAyXCI6IFwi5bm/6Zm15Yy6XCIsXG5cdCAgICBcIjMyMTAwM1wiOiBcIumCl+axn+WMulwiLFxuXHQgICAgXCIzMjEwMjNcIjogXCLlrp3lupTljr9cIixcblx0ICAgIFwiMzIxMDgxXCI6IFwi5Luq5b6B5biCXCIsXG5cdCAgICBcIjMyMTA4NFwiOiBcIumrmOmCruW4glwiLFxuXHQgICAgXCIzMjEwODhcIjogXCLmsZ/pg73ljLpcIixcblx0ICAgIFwiMzIxMDkzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMTEwMFwiOiBcIumVh+axn+W4glwiLFxuXHQgICAgXCIzMjExMDJcIjogXCLkuqzlj6PljLpcIixcblx0ICAgIFwiMzIxMTExXCI6IFwi5ram5bee5Yy6XCIsXG5cdCAgICBcIjMyMTExMlwiOiBcIuS4ueW+kuWMulwiLFxuXHQgICAgXCIzMjExODFcIjogXCLkuLnpmLPluIJcIixcblx0ICAgIFwiMzIxMTgyXCI6IFwi5oms5Lit5biCXCIsXG5cdCAgICBcIjMyMTE4M1wiOiBcIuWPpeWuueW4glwiLFxuXHQgICAgXCIzMjExODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIxMjAwXCI6IFwi5rOw5bee5biCXCIsXG5cdCAgICBcIjMyMTIwMlwiOiBcIua1t+mZteWMulwiLFxuXHQgICAgXCIzMjEyMDNcIjogXCLpq5jmuK/ljLpcIixcblx0ICAgIFwiMzIxMjgxXCI6IFwi5YW05YyW5biCXCIsXG5cdCAgICBcIjMyMTI4MlwiOiBcIumdluaxn+W4glwiLFxuXHQgICAgXCIzMjEyODNcIjogXCLms7DlhbTluIJcIixcblx0ICAgIFwiMzIxMjg0XCI6IFwi5aec5aCw5Yy6XCIsXG5cdCAgICBcIjMyMTI4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjEzMDBcIjogXCLlrr/ov4HluIJcIixcblx0ICAgIFwiMzIxMzAyXCI6IFwi5a6/5Z+O5Yy6XCIsXG5cdCAgICBcIjMyMTMxMVwiOiBcIuWuv+ixq+WMulwiLFxuXHQgICAgXCIzMjEzMjJcIjogXCLmsq3pmLPljr9cIixcblx0ICAgIFwiMzIxMzIzXCI6IFwi5rOX6Ziz5Y6/XCIsXG5cdCAgICBcIjMyMTMyNFwiOiBcIuazl+a0quWOv1wiLFxuXHQgICAgXCIzMjEzMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwMDAwXCI6IFwi5rWZ5rGf55yBXCIsXG5cdCAgICBcIjMzMDEwMFwiOiBcIuadreW3nuW4glwiLFxuXHQgICAgXCIzMzAxMDJcIjogXCLkuIrln47ljLpcIixcblx0ICAgIFwiMzMwMTAzXCI6IFwi5LiL5Z+O5Yy6XCIsXG5cdCAgICBcIjMzMDEwNFwiOiBcIuaxn+W5suWMulwiLFxuXHQgICAgXCIzMzAxMDVcIjogXCLmi7HlooXljLpcIixcblx0ICAgIFwiMzMwMTA2XCI6IFwi6KW/5rmW5Yy6XCIsXG5cdCAgICBcIjMzMDEwOFwiOiBcIua7qOaxn+WMulwiLFxuXHQgICAgXCIzMzAxMDlcIjogXCLokKflsbHljLpcIixcblx0ICAgIFwiMzMwMTEwXCI6IFwi5L2Z5p2t5Yy6XCIsXG5cdCAgICBcIjMzMDEyMlwiOiBcIuahkOW6kOWOv1wiLFxuXHQgICAgXCIzMzAxMjdcIjogXCLmt7Plronljr9cIixcblx0ICAgIFwiMzMwMTgyXCI6IFwi5bu65b635biCXCIsXG5cdCAgICBcIjMzMDE4M1wiOiBcIuWvjOmYs+W4glwiLFxuXHQgICAgXCIzMzAxODVcIjogXCLkuLTlronluIJcIixcblx0ICAgIFwiMzMwMTg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDIwMFwiOiBcIuWugeazouW4glwiLFxuXHQgICAgXCIzMzAyMDNcIjogXCLmtbfmm5nljLpcIixcblx0ICAgIFwiMzMwMjA0XCI6IFwi5rGf5Lic5Yy6XCIsXG5cdCAgICBcIjMzMDIwNVwiOiBcIuaxn+WMl+WMulwiLFxuXHQgICAgXCIzMzAyMDZcIjogXCLljJfku5HljLpcIixcblx0ICAgIFwiMzMwMjExXCI6IFwi6ZWH5rW35Yy6XCIsXG5cdCAgICBcIjMzMDIxMlwiOiBcIumEnuW3nuWMulwiLFxuXHQgICAgXCIzMzAyMjVcIjogXCLosaHlsbHljr9cIixcblx0ICAgIFwiMzMwMjI2XCI6IFwi5a6B5rW35Y6/XCIsXG5cdCAgICBcIjMzMDI4MVwiOiBcIuS9meWnmuW4glwiLFxuXHQgICAgXCIzMzAyODJcIjogXCLmhYjmuqrluIJcIixcblx0ICAgIFwiMzMwMjgzXCI6IFwi5aWJ5YyW5biCXCIsXG5cdCAgICBcIjMzMDI4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzAzMDBcIjogXCLmuKnlt57luIJcIixcblx0ICAgIFwiMzMwMzAyXCI6IFwi6bm/5Z+O5Yy6XCIsXG5cdCAgICBcIjMzMDMwM1wiOiBcIum+mea5vuWMulwiLFxuXHQgICAgXCIzMzAzMDRcIjogXCLnk6/mtbfljLpcIixcblx0ICAgIFwiMzMwMzIyXCI6IFwi5rSe5aS05Y6/XCIsXG5cdCAgICBcIjMzMDMyNFwiOiBcIuawuOWYieWOv1wiLFxuXHQgICAgXCIzMzAzMjZcIjogXCLlubPpmLPljr9cIixcblx0ICAgIFwiMzMwMzI3XCI6IFwi6IuN5Y2X5Y6/XCIsXG5cdCAgICBcIjMzMDMyOFwiOiBcIuaWh+aIkOWOv1wiLFxuXHQgICAgXCIzMzAzMjlcIjogXCLms7Dpobrljr9cIixcblx0ICAgIFwiMzMwMzgxXCI6IFwi55Ge5a6J5biCXCIsXG5cdCAgICBcIjMzMDM4MlwiOiBcIuS5kOa4heW4glwiLFxuXHQgICAgXCIzMzAzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwNDAwXCI6IFwi5ZiJ5YW05biCXCIsXG5cdCAgICBcIjMzMDQwMlwiOiBcIuWNl+a5luWMulwiLFxuXHQgICAgXCIzMzA0MTFcIjogXCLnp4DmtLLljLpcIixcblx0ICAgIFwiMzMwNDIxXCI6IFwi5ZiJ5ZaE5Y6/XCIsXG5cdCAgICBcIjMzMDQyNFwiOiBcIua1t+ebkOWOv1wiLFxuXHQgICAgXCIzMzA0ODFcIjogXCLmtbflroHluIJcIixcblx0ICAgIFwiMzMwNDgyXCI6IFwi5bmz5rmW5biCXCIsXG5cdCAgICBcIjMzMDQ4M1wiOiBcIuahkOS5oeW4glwiLFxuXHQgICAgXCIzMzA0ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwNTAwXCI6IFwi5rmW5bee5biCXCIsXG5cdCAgICBcIjMzMDUwMlwiOiBcIuWQtOWFtOWMulwiLFxuXHQgICAgXCIzMzA1MDNcIjogXCLljZfmtZTljLpcIixcblx0ICAgIFwiMzMwNTIxXCI6IFwi5b635riF5Y6/XCIsXG5cdCAgICBcIjMzMDUyMlwiOiBcIumVv+WFtOWOv1wiLFxuXHQgICAgXCIzMzA1MjNcIjogXCLlronlkInljr9cIixcblx0ICAgIFwiMzMwNTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDYwMFwiOiBcIue7jeWFtOW4glwiLFxuXHQgICAgXCIzMzA2MDJcIjogXCLotorln47ljLpcIixcblx0ICAgIFwiMzMwNjIxXCI6IFwi57uN5YW05Y6/XCIsXG5cdCAgICBcIjMzMDYyNFwiOiBcIuaWsOaYjOWOv1wiLFxuXHQgICAgXCIzMzA2ODFcIjogXCLor7jmmqjluIJcIixcblx0ICAgIFwiMzMwNjgyXCI6IFwi5LiK6Jme5biCXCIsXG5cdCAgICBcIjMzMDY4M1wiOiBcIuW1iuW3nuW4glwiLFxuXHQgICAgXCIzMzA2ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwNzAwXCI6IFwi6YeR5Y2O5biCXCIsXG5cdCAgICBcIjMzMDcwMlwiOiBcIuWpuuWfjuWMulwiLFxuXHQgICAgXCIzMzA3MDNcIjogXCLph5HkuJzljLpcIixcblx0ICAgIFwiMzMwNzIzXCI6IFwi5q2m5LmJ5Y6/XCIsXG5cdCAgICBcIjMzMDcyNlwiOiBcIua1puaxn+WOv1wiLFxuXHQgICAgXCIzMzA3MjdcIjogXCLno5Dlronljr9cIixcblx0ICAgIFwiMzMwNzgxXCI6IFwi5YWw5rqq5biCXCIsXG5cdCAgICBcIjMzMDc4MlwiOiBcIuS5ieS5jOW4glwiLFxuXHQgICAgXCIzMzA3ODNcIjogXCLkuJzpmLPluIJcIixcblx0ICAgIFwiMzMwNzg0XCI6IFwi5rC45bq35biCXCIsXG5cdCAgICBcIjMzMDc4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzA4MDBcIjogXCLooaLlt57luIJcIixcblx0ICAgIFwiMzMwODAyXCI6IFwi5p+v5Z+O5Yy6XCIsXG5cdCAgICBcIjMzMDgwM1wiOiBcIuihouaxn+WMulwiLFxuXHQgICAgXCIzMzA4MjJcIjogXCLluLjlsbHljr9cIixcblx0ICAgIFwiMzMwODI0XCI6IFwi5byA5YyW5Y6/XCIsXG5cdCAgICBcIjMzMDgyNVwiOiBcIum+mea4uOWOv1wiLFxuXHQgICAgXCIzMzA4ODFcIjogXCLmsZ/lsbHluIJcIixcblx0ICAgIFwiMzMwODgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDkwMFwiOiBcIuiIn+WxseW4glwiLFxuXHQgICAgXCIzMzA5MDJcIjogXCLlrprmtbfljLpcIixcblx0ICAgIFwiMzMwOTAzXCI6IFwi5pmu6ZmA5Yy6XCIsXG5cdCAgICBcIjMzMDkyMVwiOiBcIuWyseWxseWOv1wiLFxuXHQgICAgXCIzMzA5MjJcIjogXCLltYrms5fljr9cIixcblx0ICAgIFwiMzMwOTIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMTAwMFwiOiBcIuWPsOW3nuW4glwiLFxuXHQgICAgXCIzMzEwMDJcIjogXCLmpJLmsZ/ljLpcIixcblx0ICAgIFwiMzMxMDAzXCI6IFwi6buE5bKp5Yy6XCIsXG5cdCAgICBcIjMzMTAwNFwiOiBcIui3r+ahpeWMulwiLFxuXHQgICAgXCIzMzEwMjFcIjogXCLnjonnjq/ljr9cIixcblx0ICAgIFwiMzMxMDIyXCI6IFwi5LiJ6Zeo5Y6/XCIsXG5cdCAgICBcIjMzMTAyM1wiOiBcIuWkqeWPsOWOv1wiLFxuXHQgICAgXCIzMzEwMjRcIjogXCLku5nlsYXljr9cIixcblx0ICAgIFwiMzMxMDgxXCI6IFwi5rip5bKt5biCXCIsXG5cdCAgICBcIjMzMTA4MlwiOiBcIuS4tOa1t+W4glwiLFxuXHQgICAgXCIzMzEwODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMxMTAwXCI6IFwi5Li95rC05biCXCIsXG5cdCAgICBcIjMzMTEwMlwiOiBcIuiOsumDveWMulwiLFxuXHQgICAgXCIzMzExMjFcIjogXCLpnZLnlLDljr9cIixcblx0ICAgIFwiMzMxMTIyXCI6IFwi57yZ5LqR5Y6/XCIsXG5cdCAgICBcIjMzMTEyM1wiOiBcIumBguaYjOWOv1wiLFxuXHQgICAgXCIzMzExMjRcIjogXCLmnb7pmLPljr9cIixcblx0ICAgIFwiMzMxMTI1XCI6IFwi5LqR5ZKM5Y6/XCIsXG5cdCAgICBcIjMzMTEyNlwiOiBcIuW6huWFg+WOv1wiLFxuXHQgICAgXCIzMzExMjdcIjogXCLmma/lroHnlbLml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMzMxMTgxXCI6IFwi6b6Z5rOJ5biCXCIsXG5cdCAgICBcIjMzMTE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDAwMDBcIjogXCLlronlvr3nnIFcIixcblx0ICAgIFwiMzQwMTAwXCI6IFwi5ZCI6IKl5biCXCIsXG5cdCAgICBcIjM0MDEwMlwiOiBcIueRtua1t+WMulwiLFxuXHQgICAgXCIzNDAxMDNcIjogXCLlupDpmLPljLpcIixcblx0ICAgIFwiMzQwMTA0XCI6IFwi6JyA5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDExMVwiOiBcIuWMheays+WMulwiLFxuXHQgICAgXCIzNDAxMjFcIjogXCLplb/kuLDljr9cIixcblx0ICAgIFwiMzQwMTIyXCI6IFwi6IKl5Lic5Y6/XCIsXG5cdCAgICBcIjM0MDEyM1wiOiBcIuiCpeilv+WOv1wiLFxuXHQgICAgXCIzNDAxOTJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwMjAwXCI6IFwi6Iqc5rmW5biCXCIsXG5cdCAgICBcIjM0MDIwMlwiOiBcIumVnOa5luWMulwiLFxuXHQgICAgXCIzNDAyMDNcIjogXCLlvIvmsZ/ljLpcIixcblx0ICAgIFwiMzQwMjA3XCI6IFwi6big5rGf5Yy6XCIsXG5cdCAgICBcIjM0MDIwOFwiOiBcIuS4ieWxseWMulwiLFxuXHQgICAgXCIzNDAyMjFcIjogXCLoipzmuZbljr9cIixcblx0ICAgIFwiMzQwMjIyXCI6IFwi57mB5piM5Y6/XCIsXG5cdCAgICBcIjM0MDIyM1wiOiBcIuWNl+mZteWOv1wiLFxuXHQgICAgXCIzNDAyMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwMzAwXCI6IFwi6JqM5Z+g5biCXCIsXG5cdCAgICBcIjM0MDMwMlwiOiBcIum+meWtkOa5luWMulwiLFxuXHQgICAgXCIzNDAzMDNcIjogXCLomozlsbHljLpcIixcblx0ICAgIFwiMzQwMzA0XCI6IFwi56a55Lya5Yy6XCIsXG5cdCAgICBcIjM0MDMxMVwiOiBcIua3ruS4iuWMulwiLFxuXHQgICAgXCIzNDAzMjFcIjogXCLmgIDov5zljr9cIixcblx0ICAgIFwiMzQwMzIyXCI6IFwi5LqU5rKz5Y6/XCIsXG5cdCAgICBcIjM0MDMyM1wiOiBcIuWbuumVh+WOv1wiLFxuXHQgICAgXCIzNDAzMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwNDAwXCI6IFwi5reu5Y2X5biCXCIsXG5cdCAgICBcIjM0MDQwMlwiOiBcIuWkp+mAmuWMulwiLFxuXHQgICAgXCIzNDA0MDNcIjogXCLnlLDlrrblurXljLpcIixcblx0ICAgIFwiMzQwNDA0XCI6IFwi6LCi5a626ZuG5Yy6XCIsXG5cdCAgICBcIjM0MDQwNVwiOiBcIuWFq+WFrOWxseWMulwiLFxuXHQgICAgXCIzNDA0MDZcIjogXCLmvZjpm4bljLpcIixcblx0ICAgIFwiMzQwNDIxXCI6IFwi5Yek5Y+w5Y6/XCIsXG5cdCAgICBcIjM0MDQyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDA1MDBcIjogXCLpqazpno3lsbHluIJcIixcblx0ICAgIFwiMzQwNTAzXCI6IFwi6Iqx5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDUwNFwiOiBcIumbqOWxseWMulwiLFxuXHQgICAgXCIzNDA1MDZcIjogXCLljZrmnJvljLpcIixcblx0ICAgIFwiMzQwNTIxXCI6IFwi5b2T5raC5Y6/XCIsXG5cdCAgICBcIjM0MDUyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDA2MDBcIjogXCLmt67ljJfluIJcIixcblx0ICAgIFwiMzQwNjAyXCI6IFwi5p2c6ZuG5Yy6XCIsXG5cdCAgICBcIjM0MDYwM1wiOiBcIuebuOWxseWMulwiLFxuXHQgICAgXCIzNDA2MDRcIjogXCLng4jlsbHljLpcIixcblx0ICAgIFwiMzQwNjIxXCI6IFwi5r+J5rqq5Y6/XCIsXG5cdCAgICBcIjM0MDYyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDA3MDBcIjogXCLpk5zpmbXluIJcIixcblx0ICAgIFwiMzQwNzAyXCI6IFwi6ZOc5a6Y5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDcwM1wiOiBcIueLruWtkOWxseWMulwiLFxuXHQgICAgXCIzNDA3MTFcIjogXCLpg4rljLpcIixcblx0ICAgIFwiMzQwNzIxXCI6IFwi6ZOc6Zm15Y6/XCIsXG5cdCAgICBcIjM0MDcyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDA4MDBcIjogXCLlronluobluIJcIixcblx0ICAgIFwiMzQwODAyXCI6IFwi6L+O5rGf5Yy6XCIsXG5cdCAgICBcIjM0MDgwM1wiOiBcIuWkp+inguWMulwiLFxuXHQgICAgXCIzNDA4MTFcIjogXCLlrpznp4DljLpcIixcblx0ICAgIFwiMzQwODIyXCI6IFwi5oCA5a6B5Y6/XCIsXG5cdCAgICBcIjM0MDgyM1wiOiBcIuaenumYs+WOv1wiLFxuXHQgICAgXCIzNDA4MjRcIjogXCLmvZzlsbHljr9cIixcblx0ICAgIFwiMzQwODI1XCI6IFwi5aSq5rmW5Y6/XCIsXG5cdCAgICBcIjM0MDgyNlwiOiBcIuWuv+advuWOv1wiLFxuXHQgICAgXCIzNDA4MjdcIjogXCLmnJvmsZ/ljr9cIixcblx0ICAgIFwiMzQwODI4XCI6IFwi5bKz6KW/5Y6/XCIsXG5cdCAgICBcIjM0MDg4MVwiOiBcIuahkOWfjuW4glwiLFxuXHQgICAgXCIzNDA4ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxMDAwXCI6IFwi6buE5bGx5biCXCIsXG5cdCAgICBcIjM0MTAwMlwiOiBcIuWxr+a6quWMulwiLFxuXHQgICAgXCIzNDEwMDNcIjogXCLpu4TlsbHljLpcIixcblx0ICAgIFwiMzQxMDA0XCI6IFwi5b695bee5Yy6XCIsXG5cdCAgICBcIjM0MTAyMVwiOiBcIuatmeWOv1wiLFxuXHQgICAgXCIzNDEwMjJcIjogXCLkvJHlroHljr9cIixcblx0ICAgIFwiMzQxMDIzXCI6IFwi6buf5Y6/XCIsXG5cdCAgICBcIjM0MTAyNFwiOiBcIuelgemXqOWOv1wiLFxuXHQgICAgXCIzNDEwMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxMTAwXCI6IFwi5ruB5bee5biCXCIsXG5cdCAgICBcIjM0MTEwMlwiOiBcIueQheeQiuWMulwiLFxuXHQgICAgXCIzNDExMDNcIjogXCLljZfosK/ljLpcIixcblx0ICAgIFwiMzQxMTIyXCI6IFwi5p2l5a6J5Y6/XCIsXG5cdCAgICBcIjM0MTEyNFwiOiBcIuWFqOakkuWOv1wiLFxuXHQgICAgXCIzNDExMjVcIjogXCLlrprov5zljr9cIixcblx0ICAgIFwiMzQxMTI2XCI6IFwi5Yek6Ziz5Y6/XCIsXG5cdCAgICBcIjM0MTE4MVwiOiBcIuWkqemVv+W4glwiLFxuXHQgICAgXCIzNDExODJcIjogXCLmmI7lhYnluIJcIixcblx0ICAgIFwiMzQxMTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTIwMFwiOiBcIumYnOmYs+W4glwiLFxuXHQgICAgXCIzNDEyMDJcIjogXCLpoo3lt57ljLpcIixcblx0ICAgIFwiMzQxMjAzXCI6IFwi6aKN5Lic5Yy6XCIsXG5cdCAgICBcIjM0MTIwNFwiOiBcIumijeazieWMulwiLFxuXHQgICAgXCIzNDEyMjFcIjogXCLkuLTms4nljr9cIixcblx0ICAgIFwiMzQxMjIyXCI6IFwi5aSq5ZKM5Y6/XCIsXG5cdCAgICBcIjM0MTIyNVwiOiBcIumYnOWNl+WOv1wiLFxuXHQgICAgXCIzNDEyMjZcIjogXCLpoo3kuIrljr9cIixcblx0ICAgIFwiMzQxMjgyXCI6IFwi55WM6aaW5biCXCIsXG5cdCAgICBcIjM0MTI4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDEzMDBcIjogXCLlrr/lt57luIJcIixcblx0ICAgIFwiMzQxMzAyXCI6IFwi5Z+H5qGl5Yy6XCIsXG5cdCAgICBcIjM0MTMyMVwiOiBcIueggOWxseWOv1wiLFxuXHQgICAgXCIzNDEzMjJcIjogXCLokKfljr9cIixcblx0ICAgIFwiMzQxMzIzXCI6IFwi54G155Kn5Y6/XCIsXG5cdCAgICBcIjM0MTMyNFwiOiBcIuazl+WOv1wiLFxuXHQgICAgXCIzNDEzMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxNDAwXCI6IFwi5bei5rmW5biCXCIsXG5cdCAgICBcIjM0MTQyMVwiOiBcIuW6kOaxn+WOv1wiLFxuXHQgICAgXCIzNDE0MjJcIjogXCLml6DkuLrljr9cIixcblx0ICAgIFwiMzQxNDIzXCI6IFwi5ZCr5bGx5Y6/XCIsXG5cdCAgICBcIjM0MTQyNFwiOiBcIuWSjOWOv1wiLFxuXHQgICAgXCIzNDE1MDBcIjogXCLlha3lronluIJcIixcblx0ICAgIFwiMzQxNTAyXCI6IFwi6YeR5a6J5Yy6XCIsXG5cdCAgICBcIjM0MTUwM1wiOiBcIuijleWuieWMulwiLFxuXHQgICAgXCIzNDE1MjFcIjogXCLlr7/ljr9cIixcblx0ICAgIFwiMzQxNTIyXCI6IFwi6ZyN6YKx5Y6/XCIsXG5cdCAgICBcIjM0MTUyM1wiOiBcIuiIkuWfjuWOv1wiLFxuXHQgICAgXCIzNDE1MjRcIjogXCLph5Hlr6jljr9cIixcblx0ICAgIFwiMzQxNTI1XCI6IFwi6ZyN5bGx5Y6/XCIsXG5cdCAgICBcIjM0MTUyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDE2MDBcIjogXCLkurPlt57luIJcIixcblx0ICAgIFwiMzQxNjAyXCI6IFwi6LCv5Z+O5Yy6XCIsXG5cdCAgICBcIjM0MTYyMVwiOiBcIua2oemYs+WOv1wiLFxuXHQgICAgXCIzNDE2MjJcIjogXCLokpnln47ljr9cIixcblx0ICAgIFwiMzQxNjIzXCI6IFwi5Yip6L6b5Y6/XCIsXG5cdCAgICBcIjM0MTYyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDE3MDBcIjogXCLmsaDlt57luIJcIixcblx0ICAgIFwiMzQxNzAyXCI6IFwi6LS15rGg5Yy6XCIsXG5cdCAgICBcIjM0MTcyMVwiOiBcIuS4nOiHs+WOv1wiLFxuXHQgICAgXCIzNDE3MjJcIjogXCLnn7Plj7Dljr9cIixcblx0ICAgIFwiMzQxNzIzXCI6IFwi6Z2S6Ziz5Y6/XCIsXG5cdCAgICBcIjM0MTcyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDE4MDBcIjogXCLlrqPln47luIJcIixcblx0ICAgIFwiMzQxODAyXCI6IFwi5a6j5bee5Yy6XCIsXG5cdCAgICBcIjM0MTgyMVwiOiBcIumDjua6quWOv1wiLFxuXHQgICAgXCIzNDE4MjJcIjogXCLlub/lvrfljr9cIixcblx0ICAgIFwiMzQxODIzXCI6IFwi5rO+5Y6/XCIsXG5cdCAgICBcIjM0MTgyNFwiOiBcIue7qea6quWOv1wiLFxuXHQgICAgXCIzNDE4MjVcIjogXCLml4zlvrfljr9cIixcblx0ICAgIFwiMzQxODgxXCI6IFwi5a6B5Zu95biCXCIsXG5cdCAgICBcIjM0MTg4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTAwMDBcIjogXCLnpo/lu7rnnIFcIixcblx0ICAgIFwiMzUwMTAwXCI6IFwi56aP5bee5biCXCIsXG5cdCAgICBcIjM1MDEwMlwiOiBcIum8k+alvOWMulwiLFxuXHQgICAgXCIzNTAxMDNcIjogXCLlj7DmsZ/ljLpcIixcblx0ICAgIFwiMzUwMTA0XCI6IFwi5LuT5bGx5Yy6XCIsXG5cdCAgICBcIjM1MDEwNVwiOiBcIumprOWwvuWMulwiLFxuXHQgICAgXCIzNTAxMTFcIjogXCLmmYvlronljLpcIixcblx0ICAgIFwiMzUwMTIxXCI6IFwi6Ze95L6v5Y6/XCIsXG5cdCAgICBcIjM1MDEyMlwiOiBcIui/nuaxn+WOv1wiLFxuXHQgICAgXCIzNTAxMjNcIjogXCLnvZfmupDljr9cIixcblx0ICAgIFwiMzUwMTI0XCI6IFwi6Ze95riF5Y6/XCIsXG5cdCAgICBcIjM1MDEyNVwiOiBcIuawuOazsOWOv1wiLFxuXHQgICAgXCIzNTAxMjhcIjogXCLlubPmva3ljr9cIixcblx0ICAgIFwiMzUwMTgxXCI6IFwi56aP5riF5biCXCIsXG5cdCAgICBcIjM1MDE4MlwiOiBcIumVv+S5kOW4glwiLFxuXHQgICAgXCIzNTAxODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwMjAwXCI6IFwi5Y6m6Zeo5biCXCIsXG5cdCAgICBcIjM1MDIwM1wiOiBcIuaAneaYjuWMulwiLFxuXHQgICAgXCIzNTAyMDVcIjogXCLmtbfmsqfljLpcIixcblx0ICAgIFwiMzUwMjA2XCI6IFwi5rmW6YeM5Yy6XCIsXG5cdCAgICBcIjM1MDIxMVwiOiBcIumbhue+juWMulwiLFxuXHQgICAgXCIzNTAyMTJcIjogXCLlkIzlronljLpcIixcblx0ICAgIFwiMzUwMjEzXCI6IFwi57+U5a6J5Yy6XCIsXG5cdCAgICBcIjM1MDIxNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTAzMDBcIjogXCLojobnlLDluIJcIixcblx0ICAgIFwiMzUwMzAyXCI6IFwi5Z+O5Y6i5Yy6XCIsXG5cdCAgICBcIjM1MDMwM1wiOiBcIua2teaxn+WMulwiLFxuXHQgICAgXCIzNTAzMDRcIjogXCLojZTln47ljLpcIixcblx0ICAgIFwiMzUwMzA1XCI6IFwi56eA5bG/5Yy6XCIsXG5cdCAgICBcIjM1MDMyMlwiOiBcIuS7mea4uOWOv1wiLFxuXHQgICAgXCIzNTAzMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwNDAwXCI6IFwi5LiJ5piO5biCXCIsXG5cdCAgICBcIjM1MDQwMlwiOiBcIuaiheWIl+WMulwiLFxuXHQgICAgXCIzNTA0MDNcIjogXCLkuInlhYPljLpcIixcblx0ICAgIFwiMzUwNDIxXCI6IFwi5piO5rqq5Y6/XCIsXG5cdCAgICBcIjM1MDQyM1wiOiBcIua4hea1geWOv1wiLFxuXHQgICAgXCIzNTA0MjRcIjogXCLlroHljJbljr9cIixcblx0ICAgIFwiMzUwNDI1XCI6IFwi5aSn55Sw5Y6/XCIsXG5cdCAgICBcIjM1MDQyNlwiOiBcIuWwpOa6quWOv1wiLFxuXHQgICAgXCIzNTA0MjdcIjogXCLmspnljr9cIixcblx0ICAgIFwiMzUwNDI4XCI6IFwi5bCG5LmQ5Y6/XCIsXG5cdCAgICBcIjM1MDQyOVwiOiBcIuazsOWugeWOv1wiLFxuXHQgICAgXCIzNTA0MzBcIjogXCLlu7rlroHljr9cIixcblx0ICAgIFwiMzUwNDgxXCI6IFwi5rC45a6J5biCXCIsXG5cdCAgICBcIjM1MDQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTA1MDBcIjogXCLms4nlt57luIJcIixcblx0ICAgIFwiMzUwNTAyXCI6IFwi6bKk5Z+O5Yy6XCIsXG5cdCAgICBcIjM1MDUwM1wiOiBcIuS4sOazveWMulwiLFxuXHQgICAgXCIzNTA1MDRcIjogXCLmtJvmsZ/ljLpcIixcblx0ICAgIFwiMzUwNTA1XCI6IFwi5rOJ5riv5Yy6XCIsXG5cdCAgICBcIjM1MDUyMVwiOiBcIuaDoOWuieWOv1wiLFxuXHQgICAgXCIzNTA1MjRcIjogXCLlronmuqrljr9cIixcblx0ICAgIFwiMzUwNTI1XCI6IFwi5rC45pil5Y6/XCIsXG5cdCAgICBcIjM1MDUyNlwiOiBcIuW+t+WMluWOv1wiLFxuXHQgICAgXCIzNTA1MjdcIjogXCLph5Hpl6jljr9cIixcblx0ICAgIFwiMzUwNTgxXCI6IFwi55+z54uu5biCXCIsXG5cdCAgICBcIjM1MDU4MlwiOiBcIuaZi+axn+W4glwiLFxuXHQgICAgXCIzNTA1ODNcIjogXCLljZflronluIJcIixcblx0ICAgIFwiMzUwNTg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDYwMFwiOiBcIua8s+W3nuW4glwiLFxuXHQgICAgXCIzNTA2MDJcIjogXCLoipfln47ljLpcIixcblx0ICAgIFwiMzUwNjAzXCI6IFwi6b6Z5paH5Yy6XCIsXG5cdCAgICBcIjM1MDYyMlwiOiBcIuS6kemchOWOv1wiLFxuXHQgICAgXCIzNTA2MjNcIjogXCLmvLPmtabljr9cIixcblx0ICAgIFwiMzUwNjI0XCI6IFwi6K+P5a6J5Y6/XCIsXG5cdCAgICBcIjM1MDYyNVwiOiBcIumVv+azsOWOv1wiLFxuXHQgICAgXCIzNTA2MjZcIjogXCLkuJzlsbHljr9cIixcblx0ICAgIFwiMzUwNjI3XCI6IFwi5Y2X6Z2W5Y6/XCIsXG5cdCAgICBcIjM1MDYyOFwiOiBcIuW5s+WSjOWOv1wiLFxuXHQgICAgXCIzNTA2MjlcIjogXCLljY7lronljr9cIixcblx0ICAgIFwiMzUwNjgxXCI6IFwi6b6Z5rW35biCXCIsXG5cdCAgICBcIjM1MDY4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTA3MDBcIjogXCLljZflubPluIJcIixcblx0ICAgIFwiMzUwNzAyXCI6IFwi5bu25bmz5Yy6XCIsXG5cdCAgICBcIjM1MDcyMVwiOiBcIumhuuaYjOWOv1wiLFxuXHQgICAgXCIzNTA3MjJcIjogXCLmtabln47ljr9cIixcblx0ICAgIFwiMzUwNzIzXCI6IFwi5YWJ5rO95Y6/XCIsXG5cdCAgICBcIjM1MDcyNFwiOiBcIuadvua6quWOv1wiLFxuXHQgICAgXCIzNTA3MjVcIjogXCLmlL/lkozljr9cIixcblx0ICAgIFwiMzUwNzgxXCI6IFwi6YK15q2m5biCXCIsXG5cdCAgICBcIjM1MDc4MlwiOiBcIuatpuWkt+WxseW4glwiLFxuXHQgICAgXCIzNTA3ODNcIjogXCLlu7rnk6/luIJcIixcblx0ICAgIFwiMzUwNzg0XCI6IFwi5bu66Ziz5biCXCIsXG5cdCAgICBcIjM1MDc4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTA4MDBcIjogXCLpvpnlsqnluIJcIixcblx0ICAgIFwiMzUwODAyXCI6IFwi5paw572X5Yy6XCIsXG5cdCAgICBcIjM1MDgyMVwiOiBcIumVv+axgOWOv1wiLFxuXHQgICAgXCIzNTA4MjJcIjogXCLmsLjlrprljr9cIixcblx0ICAgIFwiMzUwODIzXCI6IFwi5LiK5p2t5Y6/XCIsXG5cdCAgICBcIjM1MDgyNFwiOiBcIuatpuW5s+WOv1wiLFxuXHQgICAgXCIzNTA4MjVcIjogXCLov57ln47ljr9cIixcblx0ICAgIFwiMzUwODgxXCI6IFwi5ryz5bmz5biCXCIsXG5cdCAgICBcIjM1MDg4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTA5MDBcIjogXCLlroHlvrfluIJcIixcblx0ICAgIFwiMzUwOTAyXCI6IFwi6JWJ5Z+O5Yy6XCIsXG5cdCAgICBcIjM1MDkyMVwiOiBcIumcnua1puWOv1wiLFxuXHQgICAgXCIzNTA5MjJcIjogXCLlj6TnlLDljr9cIixcblx0ICAgIFwiMzUwOTIzXCI6IFwi5bGP5Y2X5Y6/XCIsXG5cdCAgICBcIjM1MDkyNFwiOiBcIuWvv+WugeWOv1wiLFxuXHQgICAgXCIzNTA5MjVcIjogXCLlkajlroHljr9cIixcblx0ICAgIFwiMzUwOTI2XCI6IFwi5p+Y6I2j5Y6/XCIsXG5cdCAgICBcIjM1MDk4MVwiOiBcIuemj+WuieW4glwiLFxuXHQgICAgXCIzNTA5ODJcIjogXCLnpo/pvI7luIJcIixcblx0ICAgIFwiMzUwOTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDAwMFwiOiBcIuaxn+ilv+ecgVwiLFxuXHQgICAgXCIzNjAxMDBcIjogXCLljZfmmIzluIJcIixcblx0ICAgIFwiMzYwMTAyXCI6IFwi5Lic5rmW5Yy6XCIsXG5cdCAgICBcIjM2MDEwM1wiOiBcIuilv+a5luWMulwiLFxuXHQgICAgXCIzNjAxMDRcIjogXCLpnZLkupHosLHljLpcIixcblx0ICAgIFwiMzYwMTA1XCI6IFwi5rm+6YeM5Yy6XCIsXG5cdCAgICBcIjM2MDExMVwiOiBcIumdkuWxsea5luWMulwiLFxuXHQgICAgXCIzNjAxMjFcIjogXCLljZfmmIzljr9cIixcblx0ICAgIFwiMzYwMTIyXCI6IFwi5paw5bu65Y6/XCIsXG5cdCAgICBcIjM2MDEyM1wiOiBcIuWuieS5ieWOv1wiLFxuXHQgICAgXCIzNjAxMjRcIjogXCLov5votKTljr9cIixcblx0ICAgIFwiMzYwMTI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDIwMFwiOiBcIuaZr+W+t+mVh+W4glwiLFxuXHQgICAgXCIzNjAyMDJcIjogXCLmmIzmsZ/ljLpcIixcblx0ICAgIFwiMzYwMjAzXCI6IFwi54+g5bGx5Yy6XCIsXG5cdCAgICBcIjM2MDIyMlwiOiBcIua1ruaigeWOv1wiLFxuXHQgICAgXCIzNjAyODFcIjogXCLkuZDlubPluIJcIixcblx0ICAgIFwiMzYwMjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDMwMFwiOiBcIuiQjeS5oeW4glwiLFxuXHQgICAgXCIzNjAzMDJcIjogXCLlronmupDljLpcIixcblx0ICAgIFwiMzYwMzEzXCI6IFwi5rmY5Lic5Yy6XCIsXG5cdCAgICBcIjM2MDMyMVwiOiBcIuiOsuiKseWOv1wiLFxuXHQgICAgXCIzNjAzMjJcIjogXCLkuIrmoJfljr9cIixcblx0ICAgIFwiMzYwMzIzXCI6IFwi6Iqm5rqq5Y6/XCIsXG5cdCAgICBcIjM2MDMyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjA0MDBcIjogXCLkuZ3msZ/luIJcIixcblx0ICAgIFwiMzYwNDAyXCI6IFwi5bqQ5bGx5Yy6XCIsXG5cdCAgICBcIjM2MDQwM1wiOiBcIua1lOmYs+WMulwiLFxuXHQgICAgXCIzNjA0MjFcIjogXCLkuZ3msZ/ljr9cIixcblx0ICAgIFwiMzYwNDIzXCI6IFwi5q2m5a6B5Y6/XCIsXG5cdCAgICBcIjM2MDQyNFwiOiBcIuS/ruawtOWOv1wiLFxuXHQgICAgXCIzNjA0MjVcIjogXCLmsLjkv67ljr9cIixcblx0ICAgIFwiMzYwNDI2XCI6IFwi5b635a6J5Y6/XCIsXG5cdCAgICBcIjM2MDQyN1wiOiBcIuaYn+WtkOWOv1wiLFxuXHQgICAgXCIzNjA0MjhcIjogXCLpg73mmIzljr9cIixcblx0ICAgIFwiMzYwNDI5XCI6IFwi5rmW5Y+j5Y6/XCIsXG5cdCAgICBcIjM2MDQzMFwiOiBcIuW9reazveWOv1wiLFxuXHQgICAgXCIzNjA0ODFcIjogXCLnkZ7mmIzluIJcIixcblx0ICAgIFwiMzYwNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDQ4M1wiOiBcIuWFsemdkuWfjuW4glwiLFxuXHQgICAgXCIzNjA1MDBcIjogXCLmlrDkvZnluIJcIixcblx0ICAgIFwiMzYwNTAyXCI6IFwi5rid5rC05Yy6XCIsXG5cdCAgICBcIjM2MDUyMVwiOiBcIuWIhuWunOWOv1wiLFxuXHQgICAgXCIzNjA1MjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwNjAwXCI6IFwi6bmw5r2t5biCXCIsXG5cdCAgICBcIjM2MDYwMlwiOiBcIuaciOa5luWMulwiLFxuXHQgICAgXCIzNjA2MjJcIjogXCLkvZnmsZ/ljr9cIixcblx0ICAgIFwiMzYwNjgxXCI6IFwi6LS15rqq5biCXCIsXG5cdCAgICBcIjM2MDY4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjA3MDBcIjogXCLotaPlt57luIJcIixcblx0ICAgIFwiMzYwNzAyXCI6IFwi56ug6LSh5Yy6XCIsXG5cdCAgICBcIjM2MDcyMVwiOiBcIui1o+WOv1wiLFxuXHQgICAgXCIzNjA3MjJcIjogXCLkv6HkuLDljr9cIixcblx0ICAgIFwiMzYwNzIzXCI6IFwi5aSn5L2Z5Y6/XCIsXG5cdCAgICBcIjM2MDcyNFwiOiBcIuS4iueKueWOv1wiLFxuXHQgICAgXCIzNjA3MjVcIjogXCLltIfkuYnljr9cIixcblx0ICAgIFwiMzYwNzI2XCI6IFwi5a6J6L+c5Y6/XCIsXG5cdCAgICBcIjM2MDcyN1wiOiBcIum+meWNl+WOv1wiLFxuXHQgICAgXCIzNjA3MjhcIjogXCLlrprljZfljr9cIixcblx0ICAgIFwiMzYwNzI5XCI6IFwi5YWo5Y2X5Y6/XCIsXG5cdCAgICBcIjM2MDczMFwiOiBcIuWugemDveWOv1wiLFxuXHQgICAgXCIzNjA3MzFcIjogXCLkuo7pg73ljr9cIixcblx0ICAgIFwiMzYwNzMyXCI6IFwi5YW05Zu95Y6/XCIsXG5cdCAgICBcIjM2MDczM1wiOiBcIuS8muaYjOWOv1wiLFxuXHQgICAgXCIzNjA3MzRcIjogXCLlr7vkuYzljr9cIixcblx0ICAgIFwiMzYwNzM1XCI6IFwi55+z5Z+O5Y6/XCIsXG5cdCAgICBcIjM2MDc4MVwiOiBcIueRnumHkeW4glwiLFxuXHQgICAgXCIzNjA3ODJcIjogXCLljZflurfluIJcIixcblx0ICAgIFwiMzYwNzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDgwMFwiOiBcIuWQieWuieW4glwiLFxuXHQgICAgXCIzNjA4MDJcIjogXCLlkInlt57ljLpcIixcblx0ICAgIFwiMzYwODAzXCI6IFwi6Z2S5Y6f5Yy6XCIsXG5cdCAgICBcIjM2MDgyMVwiOiBcIuWQieWuieWOv1wiLFxuXHQgICAgXCIzNjA4MjJcIjogXCLlkInmsLTljr9cIixcblx0ICAgIFwiMzYwODIzXCI6IFwi5bOh5rGf5Y6/XCIsXG5cdCAgICBcIjM2MDgyNFwiOiBcIuaWsOW5suWOv1wiLFxuXHQgICAgXCIzNjA4MjVcIjogXCLmsLjkuLDljr9cIixcblx0ICAgIFwiMzYwODI2XCI6IFwi5rOw5ZKM5Y6/XCIsXG5cdCAgICBcIjM2MDgyN1wiOiBcIumBguW3neWOv1wiLFxuXHQgICAgXCIzNjA4MjhcIjogXCLkuIflronljr9cIixcblx0ICAgIFwiMzYwODI5XCI6IFwi5a6J56aP5Y6/XCIsXG5cdCAgICBcIjM2MDgzMFwiOiBcIuawuOaWsOWOv1wiLFxuXHQgICAgXCIzNjA4ODFcIjogXCLkupXlhojlsbHluIJcIixcblx0ICAgIFwiMzYwODgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDkwMFwiOiBcIuWunOaYpeW4glwiLFxuXHQgICAgXCIzNjA5MDJcIjogXCLoooHlt57ljLpcIixcblx0ICAgIFwiMzYwOTIxXCI6IFwi5aWJ5paw5Y6/XCIsXG5cdCAgICBcIjM2MDkyMlwiOiBcIuS4h+i9veWOv1wiLFxuXHQgICAgXCIzNjA5MjNcIjogXCLkuIrpq5jljr9cIixcblx0ICAgIFwiMzYwOTI0XCI6IFwi5a6c5Liw5Y6/XCIsXG5cdCAgICBcIjM2MDkyNVwiOiBcIumdluWuieWOv1wiLFxuXHQgICAgXCIzNjA5MjZcIjogXCLpk5zpvJPljr9cIixcblx0ICAgIFwiMzYwOTgxXCI6IFwi5Liw5Z+O5biCXCIsXG5cdCAgICBcIjM2MDk4MlwiOiBcIuaon+agkeW4glwiLFxuXHQgICAgXCIzNjA5ODNcIjogXCLpq5jlronluIJcIixcblx0ICAgIFwiMzYwOTg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MTAwMFwiOiBcIuaKmuW3nuW4glwiLFxuXHQgICAgXCIzNjEwMDJcIjogXCLkuLTlt53ljLpcIixcblx0ICAgIFwiMzYxMDIxXCI6IFwi5Y2X5Z+O5Y6/XCIsXG5cdCAgICBcIjM2MTAyMlwiOiBcIum7juW3neWOv1wiLFxuXHQgICAgXCIzNjEwMjNcIjogXCLljZfkuLDljr9cIixcblx0ICAgIFwiMzYxMDI0XCI6IFwi5bSH5LuB5Y6/XCIsXG5cdCAgICBcIjM2MTAyNVwiOiBcIuS5kOWuieWOv1wiLFxuXHQgICAgXCIzNjEwMjZcIjogXCLlrpzpu4Tljr9cIixcblx0ICAgIFwiMzYxMDI3XCI6IFwi6YeR5rqq5Y6/XCIsXG5cdCAgICBcIjM2MTAyOFwiOiBcIui1hOa6quWOv1wiLFxuXHQgICAgXCIzNjEwMjlcIjogXCLkuJzkuaHljr9cIixcblx0ICAgIFwiMzYxMDMwXCI6IFwi5bm/5piM5Y6/XCIsXG5cdCAgICBcIjM2MTAzMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjExMDBcIjogXCLkuIrppbbluIJcIixcblx0ICAgIFwiMzYxMTAyXCI6IFwi5L+h5bee5Yy6XCIsXG5cdCAgICBcIjM2MTEyMVwiOiBcIuS4iumltuWOv1wiLFxuXHQgICAgXCIzNjExMjJcIjogXCLlub/kuLDljr9cIixcblx0ICAgIFwiMzYxMTIzXCI6IFwi546J5bGx5Y6/XCIsXG5cdCAgICBcIjM2MTEyNFwiOiBcIumTheWxseWOv1wiLFxuXHQgICAgXCIzNjExMjVcIjogXCLmqKrls7Dljr9cIixcblx0ICAgIFwiMzYxMTI2XCI6IFwi5byL6Ziz5Y6/XCIsXG5cdCAgICBcIjM2MTEyN1wiOiBcIuS9meW5suWOv1wiLFxuXHQgICAgXCIzNjExMjhcIjogXCLphLHpmLPljr9cIixcblx0ICAgIFwiMzYxMTI5XCI6IFwi5LiH5bm05Y6/XCIsXG5cdCAgICBcIjM2MTEzMFwiOiBcIuWpuua6kOWOv1wiLFxuXHQgICAgXCIzNjExODFcIjogXCLlvrflhbTluIJcIixcblx0ICAgIFwiMzYxMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDAwMFwiOiBcIuWxseS4nOecgVwiLFxuXHQgICAgXCIzNzAxMDBcIjogXCLmtY7ljZfluIJcIixcblx0ICAgIFwiMzcwMTAyXCI6IFwi5Y6G5LiL5Yy6XCIsXG5cdCAgICBcIjM3MDEwM1wiOiBcIuW4guS4reWMulwiLFxuXHQgICAgXCIzNzAxMDRcIjogXCLmp5DojavljLpcIixcblx0ICAgIFwiMzcwMTA1XCI6IFwi5aSp5qGl5Yy6XCIsXG5cdCAgICBcIjM3MDExMlwiOiBcIuWOhuWfjuWMulwiLFxuXHQgICAgXCIzNzAxMTNcIjogXCLplb/muIXljLpcIixcblx0ICAgIFwiMzcwMTI0XCI6IFwi5bmz6Zi05Y6/XCIsXG5cdCAgICBcIjM3MDEyNVwiOiBcIua1jumYs+WOv1wiLFxuXHQgICAgXCIzNzAxMjZcIjogXCLllYbmsrPljr9cIixcblx0ICAgIFwiMzcwMTgxXCI6IFwi56ug5LiY5biCXCIsXG5cdCAgICBcIjM3MDE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzAyMDBcIjogXCLpnZLlspvluIJcIixcblx0ICAgIFwiMzcwMjAyXCI6IFwi5biC5Y2X5Yy6XCIsXG5cdCAgICBcIjM3MDIwM1wiOiBcIuW4guWMl+WMulwiLFxuXHQgICAgXCIzNzAyMTFcIjogXCLpu4TlspvljLpcIixcblx0ICAgIFwiMzcwMjEyXCI6IFwi5bSC5bGx5Yy6XCIsXG5cdCAgICBcIjM3MDIxM1wiOiBcIuadjuayp+WMulwiLFxuXHQgICAgXCIzNzAyMTRcIjogXCLln47pmLPljLpcIixcblx0ICAgIFwiMzcwMjgxXCI6IFwi6IO25bee5biCXCIsXG5cdCAgICBcIjM3MDI4MlwiOiBcIuWNs+WiqOW4glwiLFxuXHQgICAgXCIzNzAyODNcIjogXCLlubPluqbluIJcIixcblx0ICAgIFwiMzcwMjg1XCI6IFwi6I6x6KW/5biCXCIsXG5cdCAgICBcIjM3MDI4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzAzMDBcIjogXCLmt4TljZrluIJcIixcblx0ICAgIFwiMzcwMzAyXCI6IFwi5reE5bed5Yy6XCIsXG5cdCAgICBcIjM3MDMwM1wiOiBcIuW8oOW6l+WMulwiLFxuXHQgICAgXCIzNzAzMDRcIjogXCLljZrlsbHljLpcIixcblx0ICAgIFwiMzcwMzA1XCI6IFwi5Li05reE5Yy6XCIsXG5cdCAgICBcIjM3MDMwNlwiOiBcIuWRqOadkeWMulwiLFxuXHQgICAgXCIzNzAzMjFcIjogXCLmoZPlj7Dljr9cIixcblx0ICAgIFwiMzcwMzIyXCI6IFwi6auY6Z2S5Y6/XCIsXG5cdCAgICBcIjM3MDMyM1wiOiBcIuaygua6kOWOv1wiLFxuXHQgICAgXCIzNzAzMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwNDAwXCI6IFwi5p6j5bqE5biCXCIsXG5cdCAgICBcIjM3MDQwMlwiOiBcIuW4guS4reWMulwiLFxuXHQgICAgXCIzNzA0MDNcIjogXCLolpvln47ljLpcIixcblx0ICAgIFwiMzcwNDA0XCI6IFwi5bOE5Z+O5Yy6XCIsXG5cdCAgICBcIjM3MDQwNVwiOiBcIuWPsOWEv+W6hOWMulwiLFxuXHQgICAgXCIzNzA0MDZcIjogXCLlsbHkuq3ljLpcIixcblx0ICAgIFwiMzcwNDgxXCI6IFwi5ruV5bee5biCXCIsXG5cdCAgICBcIjM3MDQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzA1MDBcIjogXCLkuJzokKXluIJcIixcblx0ICAgIFwiMzcwNTAyXCI6IFwi5Lic6JCl5Yy6XCIsXG5cdCAgICBcIjM3MDUwM1wiOiBcIuays+WPo+WMulwiLFxuXHQgICAgXCIzNzA1MjFcIjogXCLlnqbliKnljr9cIixcblx0ICAgIFwiMzcwNTIyXCI6IFwi5Yip5rSl5Y6/XCIsXG5cdCAgICBcIjM3MDUyM1wiOiBcIuW5v+mltuWOv1wiLFxuXHQgICAgXCIzNzA1OTFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwNjAwXCI6IFwi54Of5Y+w5biCXCIsXG5cdCAgICBcIjM3MDYwMlwiOiBcIuiKnee9mOWMulwiLFxuXHQgICAgXCIzNzA2MTFcIjogXCLnpo/lsbHljLpcIixcblx0ICAgIFwiMzcwNjEyXCI6IFwi54mf5bmz5Yy6XCIsXG5cdCAgICBcIjM3MDYxM1wiOiBcIuiOseWxseWMulwiLFxuXHQgICAgXCIzNzA2MzRcIjogXCLplb/lspvljr9cIixcblx0ICAgIFwiMzcwNjgxXCI6IFwi6b6Z5Y+j5biCXCIsXG5cdCAgICBcIjM3MDY4MlwiOiBcIuiOsemYs+W4glwiLFxuXHQgICAgXCIzNzA2ODNcIjogXCLojrHlt57luIJcIixcblx0ICAgIFwiMzcwNjg0XCI6IFwi6JOs6I6x5biCXCIsXG5cdCAgICBcIjM3MDY4NVwiOiBcIuaLm+i/nOW4glwiLFxuXHQgICAgXCIzNzA2ODZcIjogXCLmoJbpnJ7luIJcIixcblx0ICAgIFwiMzcwNjg3XCI6IFwi5rW36Ziz5biCXCIsXG5cdCAgICBcIjM3MDY4OFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzA3MDBcIjogXCLmvY3lnYrluIJcIixcblx0ICAgIFwiMzcwNzAyXCI6IFwi5r2N5Z+O5Yy6XCIsXG5cdCAgICBcIjM3MDcwM1wiOiBcIuWvkuS6reWMulwiLFxuXHQgICAgXCIzNzA3MDRcIjogXCLlnYrlrZDljLpcIixcblx0ICAgIFwiMzcwNzA1XCI6IFwi5aWO5paH5Yy6XCIsXG5cdCAgICBcIjM3MDcyNFwiOiBcIuS4tOackOWOv1wiLFxuXHQgICAgXCIzNzA3MjVcIjogXCLmmIzkuZDljr9cIixcblx0ICAgIFwiMzcwNzgxXCI6IFwi6Z2S5bee5biCXCIsXG5cdCAgICBcIjM3MDc4MlwiOiBcIuivuOWfjuW4glwiLFxuXHQgICAgXCIzNzA3ODNcIjogXCLlr7/lhYnluIJcIixcblx0ICAgIFwiMzcwNzg0XCI6IFwi5a6J5LiY5biCXCIsXG5cdCAgICBcIjM3MDc4NVwiOiBcIumrmOWvhuW4glwiLFxuXHQgICAgXCIzNzA3ODZcIjogXCLmmIzpgpHluIJcIixcblx0ICAgIFwiMzcwNzg3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDgwMFwiOiBcIua1juWugeW4glwiLFxuXHQgICAgXCIzNzA4MDJcIjogXCLluILkuK3ljLpcIixcblx0ICAgIFwiMzcwODExXCI6IFwi5Lu75Z+O5Yy6XCIsXG5cdCAgICBcIjM3MDgyNlwiOiBcIuW+ruWxseWOv1wiLFxuXHQgICAgXCIzNzA4MjdcIjogXCLpsbzlj7Dljr9cIixcblx0ICAgIFwiMzcwODI4XCI6IFwi6YeR5Lmh5Y6/XCIsXG5cdCAgICBcIjM3MDgyOVwiOiBcIuWYieelpeWOv1wiLFxuXHQgICAgXCIzNzA4MzBcIjogXCLmsbbkuIrljr9cIixcblx0ICAgIFwiMzcwODMxXCI6IFwi5rOX5rC05Y6/XCIsXG5cdCAgICBcIjM3MDgzMlwiOiBcIuaigeWxseWOv1wiLFxuXHQgICAgXCIzNzA4ODFcIjogXCLmm7LpmJzluIJcIixcblx0ICAgIFwiMzcwODgyXCI6IFwi5YWW5bee5biCXCIsXG5cdCAgICBcIjM3MDg4M1wiOiBcIumCueWfjuW4glwiLFxuXHQgICAgXCIzNzA4ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwOTAwXCI6IFwi5rOw5a6J5biCXCIsXG5cdCAgICBcIjM3MDkwMlwiOiBcIuazsOWxseWMulwiLFxuXHQgICAgXCIzNzA5MDNcIjogXCLlsrHlsrPljLpcIixcblx0ICAgIFwiMzcwOTIxXCI6IFwi5a6B6Ziz5Y6/XCIsXG5cdCAgICBcIjM3MDkyM1wiOiBcIuS4nOW5s+WOv1wiLFxuXHQgICAgXCIzNzA5ODJcIjogXCLmlrDms7DluIJcIixcblx0ICAgIFwiMzcwOTgzXCI6IFwi6IKl5Z+O5biCXCIsXG5cdCAgICBcIjM3MDk4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzEwMDBcIjogXCLlqIHmtbfluIJcIixcblx0ICAgIFwiMzcxMDAyXCI6IFwi546v57+g5Yy6XCIsXG5cdCAgICBcIjM3MTA4MVwiOiBcIuaWh+eZu+W4glwiLFxuXHQgICAgXCIzNzEwODJcIjogXCLojaPmiJDluIJcIixcblx0ICAgIFwiMzcxMDgzXCI6IFwi5Lmz5bGx5biCXCIsXG5cdCAgICBcIjM3MTA4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzExMDBcIjogXCLml6XnhafluIJcIixcblx0ICAgIFwiMzcxMTAyXCI6IFwi5Lic5riv5Yy6XCIsXG5cdCAgICBcIjM3MTEwM1wiOiBcIuWymuWxseWMulwiLFxuXHQgICAgXCIzNzExMjFcIjogXCLkupTojrLljr9cIixcblx0ICAgIFwiMzcxMTIyXCI6IFwi6I6S5Y6/XCIsXG5cdCAgICBcIjM3MTEyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzEyMDBcIjogXCLojrHoipzluIJcIixcblx0ICAgIFwiMzcxMjAyXCI6IFwi6I6x5Z+O5Yy6XCIsXG5cdCAgICBcIjM3MTIwM1wiOiBcIumSouWfjuWMulwiLFxuXHQgICAgXCIzNzEyMDRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxMzAwXCI6IFwi5Li05rKC5biCXCIsXG5cdCAgICBcIjM3MTMwMlwiOiBcIuWFsOWxseWMulwiLFxuXHQgICAgXCIzNzEzMTFcIjogXCLnvZfluoTljLpcIixcblx0ICAgIFwiMzcxMzEyXCI6IFwi5rKz5Lic5Yy6XCIsXG5cdCAgICBcIjM3MTMyMVwiOiBcIuayguWNl+WOv1wiLFxuXHQgICAgXCIzNzEzMjJcIjogXCLpg6/ln47ljr9cIixcblx0ICAgIFwiMzcxMzIzXCI6IFwi5rKC5rC05Y6/XCIsXG5cdCAgICBcIjM3MTMyNFwiOiBcIuiLjeWxseWOv1wiLFxuXHQgICAgXCIzNzEzMjVcIjogXCLotLnljr9cIixcblx0ICAgIFwiMzcxMzI2XCI6IFwi5bmz6YKR5Y6/XCIsXG5cdCAgICBcIjM3MTMyN1wiOiBcIuiOkuWNl+WOv1wiLFxuXHQgICAgXCIzNzEzMjhcIjogXCLokpnpmLTljr9cIixcblx0ICAgIFwiMzcxMzI5XCI6IFwi5Li05rKt5Y6/XCIsXG5cdCAgICBcIjM3MTMzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzE0MDBcIjogXCLlvrflt57luIJcIixcblx0ICAgIFwiMzcxNDAyXCI6IFwi5b635Z+O5Yy6XCIsXG5cdCAgICBcIjM3MTQyMVwiOiBcIumZteWOv1wiLFxuXHQgICAgXCIzNzE0MjJcIjogXCLlroHmtKXljr9cIixcblx0ICAgIFwiMzcxNDIzXCI6IFwi5bqG5LqR5Y6/XCIsXG5cdCAgICBcIjM3MTQyNFwiOiBcIuS4tOmCkeWOv1wiLFxuXHQgICAgXCIzNzE0MjVcIjogXCLpvZDmsrPljr9cIixcblx0ICAgIFwiMzcxNDI2XCI6IFwi5bmz5Y6f5Y6/XCIsXG5cdCAgICBcIjM3MTQyN1wiOiBcIuWkj+a0peWOv1wiLFxuXHQgICAgXCIzNzE0MjhcIjogXCLmrabln47ljr9cIixcblx0ICAgIFwiMzcxNDgxXCI6IFwi5LmQ6Zm15biCXCIsXG5cdCAgICBcIjM3MTQ4MlwiOiBcIuemueWfjuW4glwiLFxuXHQgICAgXCIzNzE0ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxNTAwXCI6IFwi6IGK5Z+O5biCXCIsXG5cdCAgICBcIjM3MTUwMlwiOiBcIuS4nOaYjOW6nOWMulwiLFxuXHQgICAgXCIzNzE1MjFcIjogXCLpmLPosLfljr9cIixcblx0ICAgIFwiMzcxNTIyXCI6IFwi6I6Y5Y6/XCIsXG5cdCAgICBcIjM3MTUyM1wiOiBcIuiMjOW5s+WOv1wiLFxuXHQgICAgXCIzNzE1MjRcIjogXCLkuJzpmL/ljr9cIixcblx0ICAgIFwiMzcxNTI1XCI6IFwi5Yag5Y6/XCIsXG5cdCAgICBcIjM3MTUyNlwiOiBcIumrmOWUkOWOv1wiLFxuXHQgICAgXCIzNzE1ODFcIjogXCLkuLTmuIXluIJcIixcblx0ICAgIFwiMzcxNTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTYwMFwiOiBcIua7qOW3nuW4glwiLFxuXHQgICAgXCIzNzE2MDJcIjogXCLmu6jln47ljLpcIixcblx0ICAgIFwiMzcxNjIxXCI6IFwi5oOg5rCR5Y6/XCIsXG5cdCAgICBcIjM3MTYyMlwiOiBcIumYs+S/oeWOv1wiLFxuXHQgICAgXCIzNzE2MjNcIjogXCLml6Dmo6Pljr9cIixcblx0ICAgIFwiMzcxNjI0XCI6IFwi5rK+5YyW5Y6/XCIsXG5cdCAgICBcIjM3MTYyNVwiOiBcIuWNmuWFtOWOv1wiLFxuXHQgICAgXCIzNzE2MjZcIjogXCLpgrnlubPljr9cIixcblx0ICAgIFwiMzcxNjI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTcwMFwiOiBcIuiPj+azveW4glwiLFxuXHQgICAgXCIzNzE3MDJcIjogXCLniaHkuLnljLpcIixcblx0ICAgIFwiMzcxNzIxXCI6IFwi5pu55Y6/XCIsXG5cdCAgICBcIjM3MTcyMlwiOiBcIuWNleWOv1wiLFxuXHQgICAgXCIzNzE3MjNcIjogXCLmiJDmrabljr9cIixcblx0ICAgIFwiMzcxNzI0XCI6IFwi5beo6YeO5Y6/XCIsXG5cdCAgICBcIjM3MTcyNVwiOiBcIumDk+WfjuWOv1wiLFxuXHQgICAgXCIzNzE3MjZcIjogXCLphITln47ljr9cIixcblx0ICAgIFwiMzcxNzI3XCI6IFwi5a6a6Zm25Y6/XCIsXG5cdCAgICBcIjM3MTcyOFwiOiBcIuS4nOaYjuWOv1wiLFxuXHQgICAgXCIzNzE3MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwMDAwXCI6IFwi5rKz5Y2X55yBXCIsXG5cdCAgICBcIjQxMDEwMFwiOiBcIumDkeW3nuW4glwiLFxuXHQgICAgXCI0MTAxMDJcIjogXCLkuK3ljp/ljLpcIixcblx0ICAgIFwiNDEwMTAzXCI6IFwi5LqM5LiD5Yy6XCIsXG5cdCAgICBcIjQxMDEwNFwiOiBcIueuoeWfjuWbnuaXj+WMulwiLFxuXHQgICAgXCI0MTAxMDVcIjogXCLph5HmsLTljLpcIixcblx0ICAgIFwiNDEwMTA2XCI6IFwi5LiK6KGX5Yy6XCIsXG5cdCAgICBcIjQxMDEwOFwiOiBcIuaDoOa1juWMulwiLFxuXHQgICAgXCI0MTAxMjJcIjogXCLkuK3niZ/ljr9cIixcblx0ICAgIFwiNDEwMTgxXCI6IFwi5bep5LmJ5biCXCIsXG5cdCAgICBcIjQxMDE4MlwiOiBcIuiNpemYs+W4glwiLFxuXHQgICAgXCI0MTAxODNcIjogXCLmlrDlr4bluIJcIixcblx0ICAgIFwiNDEwMTg0XCI6IFwi5paw6YOR5biCXCIsXG5cdCAgICBcIjQxMDE4NVwiOiBcIueZu+WwgeW4glwiLFxuXHQgICAgXCI0MTAxODhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwMjAwXCI6IFwi5byA5bCB5biCXCIsXG5cdCAgICBcIjQxMDIwMlwiOiBcIum+meS6reWMulwiLFxuXHQgICAgXCI0MTAyMDNcIjogXCLpobrmsrPlm57ml4/ljLpcIixcblx0ICAgIFwiNDEwMjA0XCI6IFwi6byT5qW85Yy6XCIsXG5cdCAgICBcIjQxMDIwNVwiOiBcIuemueeOi+WPsOWMulwiLFxuXHQgICAgXCI0MTAyMTFcIjogXCLph5HmmI7ljLpcIixcblx0ICAgIFwiNDEwMjIxXCI6IFwi5p2e5Y6/XCIsXG5cdCAgICBcIjQxMDIyMlwiOiBcIumAmuiuuOWOv1wiLFxuXHQgICAgXCI0MTAyMjNcIjogXCLlsInmsI/ljr9cIixcblx0ICAgIFwiNDEwMjI0XCI6IFwi5byA5bCB5Y6/XCIsXG5cdCAgICBcIjQxMDIyNVwiOiBcIuWFsOiAg+WOv1wiLFxuXHQgICAgXCI0MTAyMjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwMzAwXCI6IFwi5rSb6Ziz5biCXCIsXG5cdCAgICBcIjQxMDMwMlwiOiBcIuiAgeWfjuWMulwiLFxuXHQgICAgXCI0MTAzMDNcIjogXCLopb/lt6XljLpcIixcblx0ICAgIFwiNDEwMzA0XCI6IFwi54CN5rKz5Zue5peP5Yy6XCIsXG5cdCAgICBcIjQxMDMwNVwiOiBcIua2p+ilv+WMulwiLFxuXHQgICAgXCI0MTAzMDZcIjogXCLlkInliKnljLpcIixcblx0ICAgIFwiNDEwMzA3XCI6IFwi5rSb6b6Z5Yy6XCIsXG5cdCAgICBcIjQxMDMyMlwiOiBcIuWtn+a0peWOv1wiLFxuXHQgICAgXCI0MTAzMjNcIjogXCLmlrDlronljr9cIixcblx0ICAgIFwiNDEwMzI0XCI6IFwi5qC+5bed5Y6/XCIsXG5cdCAgICBcIjQxMDMyNVwiOiBcIuW1qeWOv1wiLFxuXHQgICAgXCI0MTAzMjZcIjogXCLmsZ3pmLPljr9cIixcblx0ICAgIFwiNDEwMzI3XCI6IFwi5a6c6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMDMyOFwiOiBcIua0m+WugeWOv1wiLFxuXHQgICAgXCI0MTAzMjlcIjogXCLkvIrlt53ljr9cIixcblx0ICAgIFwiNDEwMzgxXCI6IFwi5YGD5biI5biCXCIsXG5cdCAgICBcIjQxMDQwMFwiOiBcIuW5s+mhtuWxseW4glwiLFxuXHQgICAgXCI0MTA0MDJcIjogXCLmlrDljY7ljLpcIixcblx0ICAgIFwiNDEwNDAzXCI6IFwi5Y2r5Lic5Yy6XCIsXG5cdCAgICBcIjQxMDQwNFwiOiBcIuefs+m+meWMulwiLFxuXHQgICAgXCI0MTA0MTFcIjogXCLmuZvmsrPljLpcIixcblx0ICAgIFwiNDEwNDIxXCI6IFwi5a6d5Liw5Y6/XCIsXG5cdCAgICBcIjQxMDQyMlwiOiBcIuWPtuWOv1wiLFxuXHQgICAgXCI0MTA0MjNcIjogXCLpsoHlsbHljr9cIixcblx0ICAgIFwiNDEwNDI1XCI6IFwi6YOP5Y6/XCIsXG5cdCAgICBcIjQxMDQ4MVwiOiBcIuiInumSouW4glwiLFxuXHQgICAgXCI0MTA0ODJcIjogXCLmsZ3lt57luIJcIixcblx0ICAgIFwiNDEwNDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDUwMFwiOiBcIuWuiemYs+W4glwiLFxuXHQgICAgXCI0MTA1MDJcIjogXCLmlofls7DljLpcIixcblx0ICAgIFwiNDEwNTAzXCI6IFwi5YyX5YWz5Yy6XCIsXG5cdCAgICBcIjQxMDUwNVwiOiBcIuaut+mDveWMulwiLFxuXHQgICAgXCI0MTA1MDZcIjogXCLpvpnlronljLpcIixcblx0ICAgIFwiNDEwNTIyXCI6IFwi5a6J6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMDUyM1wiOiBcIuaxpOmYtOWOv1wiLFxuXHQgICAgXCI0MTA1MjZcIjogXCLmu5Hljr9cIixcblx0ICAgIFwiNDEwNTI3XCI6IFwi5YaF6buE5Y6/XCIsXG5cdCAgICBcIjQxMDU4MVwiOiBcIuael+W3nuW4glwiLFxuXHQgICAgXCI0MTA1ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwNjAwXCI6IFwi6bmk5aOB5biCXCIsXG5cdCAgICBcIjQxMDYwMlwiOiBcIum5pOWxseWMulwiLFxuXHQgICAgXCI0MTA2MDNcIjogXCLlsbHln47ljLpcIixcblx0ICAgIFwiNDEwNjExXCI6IFwi5reH5ruo5Yy6XCIsXG5cdCAgICBcIjQxMDYyMVwiOiBcIua1muWOv1wiLFxuXHQgICAgXCI0MTA2MjJcIjogXCLmt4fljr9cIixcblx0ICAgIFwiNDEwNjIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDcwMFwiOiBcIuaWsOS5oeW4glwiLFxuXHQgICAgXCI0MTA3MDJcIjogXCLnuqLml5fljLpcIixcblx0ICAgIFwiNDEwNzAzXCI6IFwi5Y2r5ruo5Yy6XCIsXG5cdCAgICBcIjQxMDcwNFwiOiBcIuWHpOazieWMulwiLFxuXHQgICAgXCI0MTA3MTFcIjogXCLniafph47ljLpcIixcblx0ICAgIFwiNDEwNzIxXCI6IFwi5paw5Lmh5Y6/XCIsXG5cdCAgICBcIjQxMDcyNFwiOiBcIuiOt+WYieWOv1wiLFxuXHQgICAgXCI0MTA3MjVcIjogXCLljp/pmLPljr9cIixcblx0ICAgIFwiNDEwNzI2XCI6IFwi5bu25rSl5Y6/XCIsXG5cdCAgICBcIjQxMDcyN1wiOiBcIuWwgeS4mOWOv1wiLFxuXHQgICAgXCI0MTA3MjhcIjogXCLplb/lnqPljr9cIixcblx0ICAgIFwiNDEwNzgxXCI6IFwi5Y2r6L6J5biCXCIsXG5cdCAgICBcIjQxMDc4MlwiOiBcIui+ieWOv+W4glwiLFxuXHQgICAgXCI0MTA3ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDEwODAwXCI6IFwi54Sm5L2c5biCXCIsXG5cdCAgICBcIjQxMDgwMlwiOiBcIuino+aUvuWMulwiLFxuXHQgICAgXCI0MTA4MDNcIjogXCLkuK3nq5nljLpcIixcblx0ICAgIFwiNDEwODA0XCI6IFwi6ams5p2R5Yy6XCIsXG5cdCAgICBcIjQxMDgxMVwiOiBcIuWxsemYs+WMulwiLFxuXHQgICAgXCI0MTA4MjFcIjogXCLkv67mrabljr9cIixcblx0ICAgIFwiNDEwODIyXCI6IFwi5Y2a54ix5Y6/XCIsXG5cdCAgICBcIjQxMDgyM1wiOiBcIuatpumZn+WOv1wiLFxuXHQgICAgXCI0MTA4MjVcIjogXCLmuKnljr9cIixcblx0ICAgIFwiNDEwODgxXCI6IFwi5rWO5rqQ5biCXCIsXG5cdCAgICBcIjQxMDg4MlwiOiBcIuaygemYs+W4glwiLFxuXHQgICAgXCI0MTA4ODNcIjogXCLlrZ/lt57luIJcIixcblx0ICAgIFwiNDEwODg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDkwMFwiOiBcIua/rumYs+W4glwiLFxuXHQgICAgXCI0MTA5MDJcIjogXCLljY7pvpnljLpcIixcblx0ICAgIFwiNDEwOTIyXCI6IFwi5riF5Liw5Y6/XCIsXG5cdCAgICBcIjQxMDkyM1wiOiBcIuWNl+S5kOWOv1wiLFxuXHQgICAgXCI0MTA5MjZcIjogXCLojIPljr9cIixcblx0ICAgIFwiNDEwOTI3XCI6IFwi5Y+w5YmN5Y6/XCIsXG5cdCAgICBcIjQxMDkyOFwiOiBcIua/rumYs+WOv1wiLFxuXHQgICAgXCI0MTA5MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExMDAwXCI6IFwi6K645piM5biCXCIsXG5cdCAgICBcIjQxMTAwMlwiOiBcIumtj+mDveWMulwiLFxuXHQgICAgXCI0MTEwMjNcIjogXCLorrjmmIzljr9cIixcblx0ICAgIFwiNDExMDI0XCI6IFwi6YSi6Zm15Y6/XCIsXG5cdCAgICBcIjQxMTAyNVwiOiBcIuilhOWfjuWOv1wiLFxuXHQgICAgXCI0MTEwODFcIjogXCLnprnlt57luIJcIixcblx0ICAgIFwiNDExMDgyXCI6IFwi6ZW/6JGb5biCXCIsXG5cdCAgICBcIjQxMTA4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTExMDBcIjogXCLmvK/msrPluIJcIixcblx0ICAgIFwiNDExMTAyXCI6IFwi5rqQ5rGH5Yy6XCIsXG5cdCAgICBcIjQxMTEwM1wiOiBcIumDvuWfjuWMulwiLFxuXHQgICAgXCI0MTExMDRcIjogXCLlj6zpmbXljLpcIixcblx0ICAgIFwiNDExMTIxXCI6IFwi6Iie6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMTEyMlwiOiBcIuS4tOmijeWOv1wiLFxuXHQgICAgXCI0MTExMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExMjAwXCI6IFwi5LiJ6Zeo5bOh5biCXCIsXG5cdCAgICBcIjQxMTIwMlwiOiBcIua5lua7qOWMulwiLFxuXHQgICAgXCI0MTEyMjFcIjogXCLmuJHmsaDljr9cIixcblx0ICAgIFwiNDExMjIyXCI6IFwi6ZmV5Y6/XCIsXG5cdCAgICBcIjQxMTIyNFwiOiBcIuWNouawj+WOv1wiLFxuXHQgICAgXCI0MTEyODFcIjogXCLkuYnpqazluIJcIixcblx0ICAgIFwiNDExMjgyXCI6IFwi54G15a6d5biCXCIsXG5cdCAgICBcIjQxMTI4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTEzMDBcIjogXCLljZfpmLPluIJcIixcblx0ICAgIFwiNDExMzAyXCI6IFwi5a6b5Z+O5Yy6XCIsXG5cdCAgICBcIjQxMTMwM1wiOiBcIuWNp+m+meWMulwiLFxuXHQgICAgXCI0MTEzMjFcIjogXCLljZflj6zljr9cIixcblx0ICAgIFwiNDExMzIyXCI6IFwi5pa55Z+O5Y6/XCIsXG5cdCAgICBcIjQxMTMyM1wiOiBcIuilv+WzoeWOv1wiLFxuXHQgICAgXCI0MTEzMjRcIjogXCLplYflubPljr9cIixcblx0ICAgIFwiNDExMzI1XCI6IFwi5YaF5Lmh5Y6/XCIsXG5cdCAgICBcIjQxMTMyNlwiOiBcIua3heW3neWOv1wiLFxuXHQgICAgXCI0MTEzMjdcIjogXCLnpL7ml5fljr9cIixcblx0ICAgIFwiNDExMzI4XCI6IFwi5ZSQ5rKz5Y6/XCIsXG5cdCAgICBcIjQxMTMyOVwiOiBcIuaWsOmHjuWOv1wiLFxuXHQgICAgXCI0MTEzMzBcIjogXCLmoZDmn4/ljr9cIixcblx0ICAgIFwiNDExMzgxXCI6IFwi6YKT5bee5biCXCIsXG5cdCAgICBcIjQxMTM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTE0MDBcIjogXCLllYbkuJjluIJcIixcblx0ICAgIFwiNDExNDAyXCI6IFwi5qKB5Zut5Yy6XCIsXG5cdCAgICBcIjQxMTQwM1wiOiBcIuedoumYs+WMulwiLFxuXHQgICAgXCI0MTE0MjFcIjogXCLmsJHmnYPljr9cIixcblx0ICAgIFwiNDExNDIyXCI6IFwi552i5Y6/XCIsXG5cdCAgICBcIjQxMTQyM1wiOiBcIuWugemZteWOv1wiLFxuXHQgICAgXCI0MTE0MjRcIjogXCLmn5jln47ljr9cIixcblx0ICAgIFwiNDExNDI1XCI6IFwi6Jme5Z+O5Y6/XCIsXG5cdCAgICBcIjQxMTQyNlwiOiBcIuWkj+mCkeWOv1wiLFxuXHQgICAgXCI0MTE0ODFcIjogXCLmsLjln47luIJcIixcblx0ICAgIFwiNDExNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTUwMFwiOiBcIuS/oemYs+W4glwiLFxuXHQgICAgXCI0MTE1MDJcIjogXCLmtYnmsrPljLpcIixcblx0ICAgIFwiNDExNTAzXCI6IFwi5bmz5qGl5Yy6XCIsXG5cdCAgICBcIjQxMTUyMVwiOiBcIue9l+WxseWOv1wiLFxuXHQgICAgXCI0MTE1MjJcIjogXCLlhYnlsbHljr9cIixcblx0ICAgIFwiNDExNTIzXCI6IFwi5paw5Y6/XCIsXG5cdCAgICBcIjQxMTUyNFwiOiBcIuWVhuWfjuWOv1wiLFxuXHQgICAgXCI0MTE1MjVcIjogXCLlm7rlp4vljr9cIixcblx0ICAgIFwiNDExNTI2XCI6IFwi5r2i5bed5Y6/XCIsXG5cdCAgICBcIjQxMTUyN1wiOiBcIua3rua7qOWOv1wiLFxuXHQgICAgXCI0MTE1MjhcIjogXCLmga/ljr9cIixcblx0ICAgIFwiNDExNTI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTYwMFwiOiBcIuWRqOWPo+W4glwiLFxuXHQgICAgXCI0MTE2MDJcIjogXCLlt53msYfljLpcIixcblx0ICAgIFwiNDExNjIxXCI6IFwi5om25rKf5Y6/XCIsXG5cdCAgICBcIjQxMTYyMlwiOiBcIuilv+WNjuWOv1wiLFxuXHQgICAgXCI0MTE2MjNcIjogXCLllYbmsLTljr9cIixcblx0ICAgIFwiNDExNjI0XCI6IFwi5rKI5LiY5Y6/XCIsXG5cdCAgICBcIjQxMTYyNVwiOiBcIumDuOWfjuWOv1wiLFxuXHQgICAgXCI0MTE2MjZcIjogXCLmt67pmLPljr9cIixcblx0ICAgIFwiNDExNjI3XCI6IFwi5aSq5bq35Y6/XCIsXG5cdCAgICBcIjQxMTYyOFwiOiBcIum5v+mCkeWOv1wiLFxuXHQgICAgXCI0MTE2ODFcIjogXCLpobnln47luIJcIixcblx0ICAgIFwiNDExNjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTcwMFwiOiBcIumpu+mprOW6l+W4glwiLFxuXHQgICAgXCI0MTE3MDJcIjogXCLpqb/ln47ljLpcIixcblx0ICAgIFwiNDExNzIxXCI6IFwi6KW/5bmz5Y6/XCIsXG5cdCAgICBcIjQxMTcyMlwiOiBcIuS4iuiUoeWOv1wiLFxuXHQgICAgXCI0MTE3MjNcIjogXCLlubPoiIbljr9cIixcblx0ICAgIFwiNDExNzI0XCI6IFwi5q2j6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMTcyNVwiOiBcIuehruWxseWOv1wiLFxuXHQgICAgXCI0MTE3MjZcIjogXCLms4zpmLPljr9cIixcblx0ICAgIFwiNDExNzI3XCI6IFwi5rGd5Y2X5Y6/XCIsXG5cdCAgICBcIjQxMTcyOFwiOiBcIumBguW5s+WOv1wiLFxuXHQgICAgXCI0MTE3MjlcIjogXCLmlrDolKHljr9cIixcblx0ICAgIFwiNDExNzMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDAwMFwiOiBcIua5luWMl+ecgVwiLFxuXHQgICAgXCI0MjAxMDBcIjogXCLmrabmsYnluIJcIixcblx0ICAgIFwiNDIwMTAyXCI6IFwi5rGf5bK45Yy6XCIsXG5cdCAgICBcIjQyMDEwM1wiOiBcIuaxn+axieWMulwiLFxuXHQgICAgXCI0MjAxMDRcIjogXCLnoZrlj6PljLpcIixcblx0ICAgIFwiNDIwMTA1XCI6IFwi5rGJ6Ziz5Yy6XCIsXG5cdCAgICBcIjQyMDEwNlwiOiBcIuatpuaYjOWMulwiLFxuXHQgICAgXCI0MjAxMDdcIjogXCLpnZLlsbHljLpcIixcblx0ICAgIFwiNDIwMTExXCI6IFwi5rSq5bGx5Yy6XCIsXG5cdCAgICBcIjQyMDExMlwiOiBcIuS4nOilv+a5luWMulwiLFxuXHQgICAgXCI0MjAxMTNcIjogXCLmsYnljZfljLpcIixcblx0ICAgIFwiNDIwMTE0XCI6IFwi6JSh55S45Yy6XCIsXG5cdCAgICBcIjQyMDExNVwiOiBcIuaxn+Wkj+WMulwiLFxuXHQgICAgXCI0MjAxMTZcIjogXCLpu4TpmYLljLpcIixcblx0ICAgIFwiNDIwMTE3XCI6IFwi5paw5rSy5Yy6XCIsXG5cdCAgICBcIjQyMDExOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjAyMDBcIjogXCLpu4Tnn7PluIJcIixcblx0ICAgIFwiNDIwMjAyXCI6IFwi6buE55+z5riv5Yy6XCIsXG5cdCAgICBcIjQyMDIwM1wiOiBcIuilv+WhnuWxseWMulwiLFxuXHQgICAgXCI0MjAyMDRcIjogXCLkuIvpmYbljLpcIixcblx0ICAgIFwiNDIwMjA1XCI6IFwi6ZOB5bGx5Yy6XCIsXG5cdCAgICBcIjQyMDIyMlwiOiBcIumYs+aWsOWOv1wiLFxuXHQgICAgXCI0MjAyODFcIjogXCLlpKflhrbluIJcIixcblx0ICAgIFwiNDIwMjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDMwMFwiOiBcIuWNgeWgsOW4glwiLFxuXHQgICAgXCI0MjAzMDJcIjogXCLojIXnrq3ljLpcIixcblx0ICAgIFwiNDIwMzAzXCI6IFwi5byg5rm+5Yy6XCIsXG5cdCAgICBcIjQyMDMyMVwiOiBcIumDp+WOv1wiLFxuXHQgICAgXCI0MjAzMjJcIjogXCLpg6fopb/ljr9cIixcblx0ICAgIFwiNDIwMzIzXCI6IFwi56u55bGx5Y6/XCIsXG5cdCAgICBcIjQyMDMyNFwiOiBcIueruea6quWOv1wiLFxuXHQgICAgXCI0MjAzMjVcIjogXCLmiL/ljr9cIixcblx0ICAgIFwiNDIwMzgxXCI6IFwi5Li55rGf5Y+j5biCXCIsXG5cdCAgICBcIjQyMDM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjA1MDBcIjogXCLlrpzmmIzluIJcIixcblx0ICAgIFwiNDIwNTAyXCI6IFwi6KW/6Zm15Yy6XCIsXG5cdCAgICBcIjQyMDUwM1wiOiBcIuS8jeWutuWyl+WMulwiLFxuXHQgICAgXCI0MjA1MDRcIjogXCLngrnlhpvljLpcIixcblx0ICAgIFwiNDIwNTA1XCI6IFwi54yH5Lqt5Yy6XCIsXG5cdCAgICBcIjQyMDUwNlwiOiBcIuWkt+mZteWMulwiLFxuXHQgICAgXCI0MjA1MjVcIjogXCLov5zlronljr9cIixcblx0ICAgIFwiNDIwNTI2XCI6IFwi5YW05bGx5Y6/XCIsXG5cdCAgICBcIjQyMDUyN1wiOiBcIuenreW9kuWOv1wiLFxuXHQgICAgXCI0MjA1MjhcIjogXCLplb/pmLPlnJ/lrrbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDIwNTI5XCI6IFwi5LqU5bOw5Zyf5a625peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQyMDU4MVwiOiBcIuWunOmDveW4glwiLFxuXHQgICAgXCI0MjA1ODJcIjogXCLlvZPpmLPluIJcIixcblx0ICAgIFwiNDIwNTgzXCI6IFwi5p6d5rGf5biCXCIsXG5cdCAgICBcIjQyMDU4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjA2MDBcIjogXCLopYTpmLPluIJcIixcblx0ICAgIFwiNDIwNjAyXCI6IFwi6KWE5Z+O5Yy6XCIsXG5cdCAgICBcIjQyMDYwNlwiOiBcIuaoiuWfjuWMulwiLFxuXHQgICAgXCI0MjA2MDdcIjogXCLopYTlt57ljLpcIixcblx0ICAgIFwiNDIwNjI0XCI6IFwi5Y2X5ryz5Y6/XCIsXG5cdCAgICBcIjQyMDYyNVwiOiBcIuiwt+WfjuWOv1wiLFxuXHQgICAgXCI0MjA2MjZcIjogXCLkv53lurfljr9cIixcblx0ICAgIFwiNDIwNjgyXCI6IFwi6ICB5rKz5Y+j5biCXCIsXG5cdCAgICBcIjQyMDY4M1wiOiBcIuaeo+mYs+W4glwiLFxuXHQgICAgXCI0MjA2ODRcIjogXCLlrpzln47luIJcIixcblx0ICAgIFwiNDIwNjg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDcwMFwiOiBcIumEguW3nuW4glwiLFxuXHQgICAgXCI0MjA3MDJcIjogXCLmooHlrZDmuZbljLpcIixcblx0ICAgIFwiNDIwNzAzXCI6IFwi5Y2O5a655Yy6XCIsXG5cdCAgICBcIjQyMDcwNFwiOiBcIumEguWfjuWMulwiLFxuXHQgICAgXCI0MjA3MDVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwODAwXCI6IFwi6I2G6Zeo5biCXCIsXG5cdCAgICBcIjQyMDgwMlwiOiBcIuS4nOWuneWMulwiLFxuXHQgICAgXCI0MjA4MDRcIjogXCLmjofliIDljLpcIixcblx0ICAgIFwiNDIwODIxXCI6IFwi5Lqs5bGx5Y6/XCIsXG5cdCAgICBcIjQyMDgyMlwiOiBcIuaymea0i+WOv1wiLFxuXHQgICAgXCI0MjA4ODFcIjogXCLpkp/npaXluIJcIixcblx0ICAgIFwiNDIwODgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDkwMFwiOiBcIuWtneaEn+W4glwiLFxuXHQgICAgXCI0MjA5MDJcIjogXCLlrZ3ljZfljLpcIixcblx0ICAgIFwiNDIwOTIxXCI6IFwi5a2d5piM5Y6/XCIsXG5cdCAgICBcIjQyMDkyMlwiOiBcIuWkp+aCn+WOv1wiLFxuXHQgICAgXCI0MjA5MjNcIjogXCLkupHmoqbljr9cIixcblx0ICAgIFwiNDIwOTgxXCI6IFwi5bqU5Z+O5biCXCIsXG5cdCAgICBcIjQyMDk4MlwiOiBcIuWuiemZhuW4glwiLFxuXHQgICAgXCI0MjA5ODRcIjogXCLmsYnlt53luIJcIixcblx0ICAgIFwiNDIwOTg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMTAwMFwiOiBcIuiNhuW3nuW4glwiLFxuXHQgICAgXCI0MjEwMDJcIjogXCLmspnluILljLpcIixcblx0ICAgIFwiNDIxMDAzXCI6IFwi6I2G5bee5Yy6XCIsXG5cdCAgICBcIjQyMTAyMlwiOiBcIuWFrOWuieWOv1wiLFxuXHQgICAgXCI0MjEwMjNcIjogXCLnm5HliKnljr9cIixcblx0ICAgIFwiNDIxMDI0XCI6IFwi5rGf6Zm15Y6/XCIsXG5cdCAgICBcIjQyMTA4MVwiOiBcIuefs+mmluW4glwiLFxuXHQgICAgXCI0MjEwODNcIjogXCLmtKrmuZbluIJcIixcblx0ICAgIFwiNDIxMDg3XCI6IFwi5p2+5ruL5biCXCIsXG5cdCAgICBcIjQyMTA4OFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjExMDBcIjogXCLpu4TlhojluIJcIixcblx0ICAgIFwiNDIxMTAyXCI6IFwi6buE5bee5Yy6XCIsXG5cdCAgICBcIjQyMTEyMVwiOiBcIuWboumjjuWOv1wiLFxuXHQgICAgXCI0MjExMjJcIjogXCLnuqLlronljr9cIixcblx0ICAgIFwiNDIxMTIzXCI6IFwi572X55Sw5Y6/XCIsXG5cdCAgICBcIjQyMTEyNFwiOiBcIuiLseWxseWOv1wiLFxuXHQgICAgXCI0MjExMjVcIjogXCLmtaDmsLTljr9cIixcblx0ICAgIFwiNDIxMTI2XCI6IFwi6JWy5pil5Y6/XCIsXG5cdCAgICBcIjQyMTEyN1wiOiBcIum7hOaiheWOv1wiLFxuXHQgICAgXCI0MjExODFcIjogXCLpurvln47luIJcIixcblx0ICAgIFwiNDIxMTgyXCI6IFwi5q2m56m05biCXCIsXG5cdCAgICBcIjQyMTE4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjEyMDBcIjogXCLlkrjlroHluIJcIixcblx0ICAgIFwiNDIxMjAyXCI6IFwi5ZK45a6J5Yy6XCIsXG5cdCAgICBcIjQyMTIyMVwiOiBcIuWYiemxvOWOv1wiLFxuXHQgICAgXCI0MjEyMjJcIjogXCLpgJrln47ljr9cIixcblx0ICAgIFwiNDIxMjIzXCI6IFwi5bSH6Ziz5Y6/XCIsXG5cdCAgICBcIjQyMTIyNFwiOiBcIumAmuWxseWOv1wiLFxuXHQgICAgXCI0MjEyODFcIjogXCLotaTlo4HluIJcIixcblx0ICAgIFwiNDIxMjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMTMwMFwiOiBcIumaj+W3nuW4glwiLFxuXHQgICAgXCI0MjEzMDJcIjogXCLmm77pg73ljLpcIixcblx0ICAgIFwiNDIxMzIxXCI6IFwi6ZqP5Y6/XCIsXG5cdCAgICBcIjQyMTM4MVwiOiBcIuW5v+awtOW4glwiLFxuXHQgICAgXCI0MjEzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIyODAwXCI6IFwi5oGp5pa95Zyf5a625peP6IuX5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjQyMjgwMVwiOiBcIuaBqeaWveW4glwiLFxuXHQgICAgXCI0MjI4MDJcIjogXCLliKnlt53luIJcIixcblx0ICAgIFwiNDIyODIyXCI6IFwi5bu65aeL5Y6/XCIsXG5cdCAgICBcIjQyMjgyM1wiOiBcIuW3tOS4nOWOv1wiLFxuXHQgICAgXCI0MjI4MjVcIjogXCLlrqPmganljr9cIixcblx0ICAgIFwiNDIyODI2XCI6IFwi5ZK45Liw5Y6/XCIsXG5cdCAgICBcIjQyMjgyN1wiOiBcIuadpeWHpOWOv1wiLFxuXHQgICAgXCI0MjI4MjhcIjogXCLpuaTls7Dljr9cIixcblx0ICAgIFwiNDIyODI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyOTAwNFwiOiBcIuS7meahg+W4glwiLFxuXHQgICAgXCI0MjkwMDVcIjogXCLmvZzmsZ/luIJcIixcblx0ICAgIFwiNDI5MDA2XCI6IFwi5aSp6Zeo5biCXCIsXG5cdCAgICBcIjQyOTAyMVwiOiBcIuelnuWGnOaetuael+WMulwiLFxuXHQgICAgXCI0MzAwMDBcIjogXCLmuZbljZfnnIFcIixcblx0ICAgIFwiNDMwMTAwXCI6IFwi6ZW/5rKZ5biCXCIsXG5cdCAgICBcIjQzMDEwMlwiOiBcIuiKmeiTieWMulwiLFxuXHQgICAgXCI0MzAxMDNcIjogXCLlpKnlv4PljLpcIixcblx0ICAgIFwiNDMwMTA0XCI6IFwi5bKz6bqT5Yy6XCIsXG5cdCAgICBcIjQzMDEwNVwiOiBcIuW8gOemj+WMulwiLFxuXHQgICAgXCI0MzAxMTFcIjogXCLpm6joirHljLpcIixcblx0ICAgIFwiNDMwMTIxXCI6IFwi6ZW/5rKZ5Y6/XCIsXG5cdCAgICBcIjQzMDEyMlwiOiBcIuacm+WfjuWMulwiLFxuXHQgICAgXCI0MzAxMjRcIjogXCLlroHkuaHljr9cIixcblx0ICAgIFwiNDMwMTgxXCI6IFwi5rWP6Ziz5biCXCIsXG5cdCAgICBcIjQzMDE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzAyMDBcIjogXCLmoKrmtLLluIJcIixcblx0ICAgIFwiNDMwMjAyXCI6IFwi6I235aGY5Yy6XCIsXG5cdCAgICBcIjQzMDIwM1wiOiBcIuiKpua3nuWMulwiLFxuXHQgICAgXCI0MzAyMDRcIjogXCLnn7Pls7DljLpcIixcblx0ICAgIFwiNDMwMjExXCI6IFwi5aSp5YWD5Yy6XCIsXG5cdCAgICBcIjQzMDIyMVwiOiBcIuagqua0suWOv1wiLFxuXHQgICAgXCI0MzAyMjNcIjogXCLmlLjljr9cIixcblx0ICAgIFwiNDMwMjI0XCI6IFwi6Iy26Zm15Y6/XCIsXG5cdCAgICBcIjQzMDIyNVwiOiBcIueCjumZteWOv1wiLFxuXHQgICAgXCI0MzAyODFcIjogXCLphrTpmbXluIJcIixcblx0ICAgIFwiNDMwMjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDMwMFwiOiBcIua5mOa9reW4glwiLFxuXHQgICAgXCI0MzAzMDJcIjogXCLpm6jmuZbljLpcIixcblx0ICAgIFwiNDMwMzA0XCI6IFwi5bKz5aGY5Yy6XCIsXG5cdCAgICBcIjQzMDMyMVwiOiBcIua5mOa9reWOv1wiLFxuXHQgICAgXCI0MzAzODFcIjogXCLmuZjkuaHluIJcIixcblx0ICAgIFwiNDMwMzgyXCI6IFwi6Z+25bGx5biCXCIsXG5cdCAgICBcIjQzMDM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzA0MDBcIjogXCLooaHpmLPluIJcIixcblx0ICAgIFwiNDMwNDA1XCI6IFwi54+g5pmW5Yy6XCIsXG5cdCAgICBcIjQzMDQwNlwiOiBcIumbgeWzsOWMulwiLFxuXHQgICAgXCI0MzA0MDdcIjogXCLnn7PpvJPljLpcIixcblx0ICAgIFwiNDMwNDA4XCI6IFwi6JK45rmY5Yy6XCIsXG5cdCAgICBcIjQzMDQxMlwiOiBcIuWNl+Wys+WMulwiLFxuXHQgICAgXCI0MzA0MjFcIjogXCLooaHpmLPljr9cIixcblx0ICAgIFwiNDMwNDIyXCI6IFwi6KGh5Y2X5Y6/XCIsXG5cdCAgICBcIjQzMDQyM1wiOiBcIuihoeWxseWOv1wiLFxuXHQgICAgXCI0MzA0MjRcIjogXCLooaHkuJzljr9cIixcblx0ICAgIFwiNDMwNDI2XCI6IFwi56WB5Lic5Y6/XCIsXG5cdCAgICBcIjQzMDQ4MVwiOiBcIuiAkumYs+W4glwiLFxuXHQgICAgXCI0MzA0ODJcIjogXCLluLjlroHluIJcIixcblx0ICAgIFwiNDMwNDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDUwMFwiOiBcIumCtemYs+W4glwiLFxuXHQgICAgXCI0MzA1MDJcIjogXCLlj4zmuIXljLpcIixcblx0ICAgIFwiNDMwNTAzXCI6IFwi5aSn56Wl5Yy6XCIsXG5cdCAgICBcIjQzMDUxMVwiOiBcIuWMl+WhlOWMulwiLFxuXHQgICAgXCI0MzA1MjFcIjogXCLpgrXkuJzljr9cIixcblx0ICAgIFwiNDMwNTIyXCI6IFwi5paw6YK15Y6/XCIsXG5cdCAgICBcIjQzMDUyM1wiOiBcIumCtemYs+WOv1wiLFxuXHQgICAgXCI0MzA1MjRcIjogXCLpmoblm57ljr9cIixcblx0ICAgIFwiNDMwNTI1XCI6IFwi5rSe5Y+j5Y6/XCIsXG5cdCAgICBcIjQzMDUyN1wiOiBcIue7peWugeWOv1wiLFxuXHQgICAgXCI0MzA1MjhcIjogXCLmlrDlroHljr9cIixcblx0ICAgIFwiNDMwNTI5XCI6IFwi5Z+O5q2l6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQzMDU4MVwiOiBcIuatpuWGiOW4glwiLFxuXHQgICAgXCI0MzA1ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwNjAwXCI6IFwi5bKz6Ziz5biCXCIsXG5cdCAgICBcIjQzMDYwMlwiOiBcIuWys+mYs+alvOWMulwiLFxuXHQgICAgXCI0MzA2MDNcIjogXCLkupHmuqrljLpcIixcblx0ICAgIFwiNDMwNjExXCI6IFwi5ZCb5bGx5Yy6XCIsXG5cdCAgICBcIjQzMDYyMVwiOiBcIuWys+mYs+WOv1wiLFxuXHQgICAgXCI0MzA2MjNcIjogXCLljY7lrrnljr9cIixcblx0ICAgIFwiNDMwNjI0XCI6IFwi5rmY6Zi05Y6/XCIsXG5cdCAgICBcIjQzMDYyNlwiOiBcIuW5s+axn+WOv1wiLFxuXHQgICAgXCI0MzA2ODFcIjogXCLmsajnvZfluIJcIixcblx0ICAgIFwiNDMwNjgyXCI6IFwi5Li05rmY5biCXCIsXG5cdCAgICBcIjQzMDY4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzA3MDBcIjogXCLluLjlvrfluIJcIixcblx0ICAgIFwiNDMwNzAyXCI6IFwi5q2m6Zm15Yy6XCIsXG5cdCAgICBcIjQzMDcwM1wiOiBcIum8juWfjuWMulwiLFxuXHQgICAgXCI0MzA3MjFcIjogXCLlronkuaHljr9cIixcblx0ICAgIFwiNDMwNzIyXCI6IFwi5rGJ5a+/5Y6/XCIsXG5cdCAgICBcIjQzMDcyM1wiOiBcIua+p+WOv1wiLFxuXHQgICAgXCI0MzA3MjRcIjogXCLkuLTmvqfljr9cIixcblx0ICAgIFwiNDMwNzI1XCI6IFwi5qGD5rqQ5Y6/XCIsXG5cdCAgICBcIjQzMDcyNlwiOiBcIuefs+mXqOWOv1wiLFxuXHQgICAgXCI0MzA3ODFcIjogXCLmtKXluILluIJcIixcblx0ICAgIFwiNDMwNzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDgwMFwiOiBcIuW8oOWutueVjOW4glwiLFxuXHQgICAgXCI0MzA4MDJcIjogXCLmsLjlrprljLpcIixcblx0ICAgIFwiNDMwODExXCI6IFwi5q2m6Zm15rqQ5Yy6XCIsXG5cdCAgICBcIjQzMDgyMVwiOiBcIuaFiOWIqeWOv1wiLFxuXHQgICAgXCI0MzA4MjJcIjogXCLmoZHmpI3ljr9cIixcblx0ICAgIFwiNDMwODIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDkwMFwiOiBcIuebiumYs+W4glwiLFxuXHQgICAgXCI0MzA5MDJcIjogXCLotYTpmLPljLpcIixcblx0ICAgIFwiNDMwOTAzXCI6IFwi6LWr5bGx5Yy6XCIsXG5cdCAgICBcIjQzMDkyMVwiOiBcIuWNl+WOv1wiLFxuXHQgICAgXCI0MzA5MjJcIjogXCLmoYPmsZ/ljr9cIixcblx0ICAgIFwiNDMwOTIzXCI6IFwi5a6J5YyW5Y6/XCIsXG5cdCAgICBcIjQzMDk4MVwiOiBcIuayheaxn+W4glwiLFxuXHQgICAgXCI0MzA5ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMxMDAwXCI6IFwi6YO05bee5biCXCIsXG5cdCAgICBcIjQzMTAwMlwiOiBcIuWMl+a5luWMulwiLFxuXHQgICAgXCI0MzEwMDNcIjogXCLoi4/ku5nljLpcIixcblx0ICAgIFwiNDMxMDIxXCI6IFwi5qGC6Ziz5Y6/XCIsXG5cdCAgICBcIjQzMTAyMlwiOiBcIuWunOeroOWOv1wiLFxuXHQgICAgXCI0MzEwMjNcIjogXCLmsLjlhbTljr9cIixcblx0ICAgIFwiNDMxMDI0XCI6IFwi5ZiJ56a+5Y6/XCIsXG5cdCAgICBcIjQzMTAyNVwiOiBcIuS4tOatpuWOv1wiLFxuXHQgICAgXCI0MzEwMjZcIjogXCLmsZ3ln47ljr9cIixcblx0ICAgIFwiNDMxMDI3XCI6IFwi5qGC5Lic5Y6/XCIsXG5cdCAgICBcIjQzMTAyOFwiOiBcIuWuieS7geWOv1wiLFxuXHQgICAgXCI0MzEwODFcIjogXCLotYTlhbTluIJcIixcblx0ICAgIFwiNDMxMDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMTEwMFwiOiBcIuawuOW3nuW4glwiLFxuXHQgICAgXCI0MzExMDJcIjogXCLpm7bpmbXljLpcIixcblx0ICAgIFwiNDMxMTAzXCI6IFwi5Ya35rC05rup5Yy6XCIsXG5cdCAgICBcIjQzMTEyMVwiOiBcIuelgemYs+WOv1wiLFxuXHQgICAgXCI0MzExMjJcIjogXCLkuJzlronljr9cIixcblx0ICAgIFwiNDMxMTIzXCI6IFwi5Y+M54mM5Y6/XCIsXG5cdCAgICBcIjQzMTEyNFwiOiBcIumBk+WOv1wiLFxuXHQgICAgXCI0MzExMjVcIjogXCLmsZ/msLjljr9cIixcblx0ICAgIFwiNDMxMTI2XCI6IFwi5a6B6L+c5Y6/XCIsXG5cdCAgICBcIjQzMTEyN1wiOiBcIuiTneWxseWOv1wiLFxuXHQgICAgXCI0MzExMjhcIjogXCLmlrDnlLDljr9cIixcblx0ICAgIFwiNDMxMTI5XCI6IFwi5rGf5Y2O55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQzMTEzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzEyMDBcIjogXCLmgIDljJbluIJcIixcblx0ICAgIFwiNDMxMjAyXCI6IFwi6bmk5Z+O5Yy6XCIsXG5cdCAgICBcIjQzMTIyMVwiOiBcIuS4reaWueWOv1wiLFxuXHQgICAgXCI0MzEyMjJcIjogXCLmsoXpmbXljr9cIixcblx0ICAgIFwiNDMxMjIzXCI6IFwi6L6w5rqq5Y6/XCIsXG5cdCAgICBcIjQzMTIyNFwiOiBcIua6hua1puWOv1wiLFxuXHQgICAgXCI0MzEyMjVcIjogXCLkvJrlkIzljr9cIixcblx0ICAgIFwiNDMxMjI2XCI6IFwi6bq76Ziz6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQzMTIyN1wiOiBcIuaWsOaZg+S+l+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MzEyMjhcIjogXCLoirfmsZ/kvpfml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDMxMjI5XCI6IFwi6Z2W5bee6IuX5peP5L6X5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQzMTIzMFwiOiBcIumAmumBk+S+l+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MzEyODFcIjogXCLmtKrmsZ/luIJcIixcblx0ICAgIFwiNDMxMjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMTMwMFwiOiBcIuWohOW6leW4glwiLFxuXHQgICAgXCI0MzEzMDJcIjogXCLlqITmmJ/ljLpcIixcblx0ICAgIFwiNDMxMzIxXCI6IFwi5Y+M5bOw5Y6/XCIsXG5cdCAgICBcIjQzMTMyMlwiOiBcIuaWsOWMluWOv1wiLFxuXHQgICAgXCI0MzEzODFcIjogXCLlhrfmsLTmsZ/luIJcIixcblx0ICAgIFwiNDMxMzgyXCI6IFwi5raf5rqQ5biCXCIsXG5cdCAgICBcIjQzMTM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzMxMDBcIjogXCLmuZjopb/lnJ/lrrbml4/oi5fml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNDMzMTAxXCI6IFwi5ZCJ6aaW5biCXCIsXG5cdCAgICBcIjQzMzEyMlwiOiBcIuazuOa6quWOv1wiLFxuXHQgICAgXCI0MzMxMjNcIjogXCLlh6Tlh7Dljr9cIixcblx0ICAgIFwiNDMzMTI0XCI6IFwi6Iqx5Z6j5Y6/XCIsXG5cdCAgICBcIjQzMzEyNVwiOiBcIuS/nemdluWOv1wiLFxuXHQgICAgXCI0MzMxMjZcIjogXCLlj6TkuIjljr9cIixcblx0ICAgIFwiNDMzMTI3XCI6IFwi5rC46aG65Y6/XCIsXG5cdCAgICBcIjQzMzEzMFwiOiBcIum+meWxseWOv1wiLFxuXHQgICAgXCI0MzMxMzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwMDAwXCI6IFwi5bm/5Lic55yBXCIsXG5cdCAgICBcIjQ0MDEwMFwiOiBcIuW5v+W3nuW4glwiLFxuXHQgICAgXCI0NDAxMDNcIjogXCLojZTmub7ljLpcIixcblx0ICAgIFwiNDQwMTA0XCI6IFwi6LaK56eA5Yy6XCIsXG5cdCAgICBcIjQ0MDEwNVwiOiBcIua1t+ePoOWMulwiLFxuXHQgICAgXCI0NDAxMDZcIjogXCLlpKnmsrPljLpcIixcblx0ICAgIFwiNDQwMTExXCI6IFwi55m95LqR5Yy6XCIsXG5cdCAgICBcIjQ0MDExMlwiOiBcIum7hOWflOWMulwiLFxuXHQgICAgXCI0NDAxMTNcIjogXCLnlarnprrljLpcIixcblx0ICAgIFwiNDQwMTE0XCI6IFwi6Iqx6YO95Yy6XCIsXG5cdCAgICBcIjQ0MDExNVwiOiBcIuWNl+aymeWMulwiLFxuXHQgICAgXCI0NDAxMTZcIjogXCLokJ3lspfljLpcIixcblx0ICAgIFwiNDQwMTgzXCI6IFwi5aKe5Z+O5biCXCIsXG5cdCAgICBcIjQ0MDE4NFwiOiBcIuS7juWMluW4glwiLFxuXHQgICAgXCI0NDAxODlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwMjAwXCI6IFwi6Z+25YWz5biCXCIsXG5cdCAgICBcIjQ0MDIwM1wiOiBcIuatpuaxn+WMulwiLFxuXHQgICAgXCI0NDAyMDRcIjogXCLmtYjmsZ/ljLpcIixcblx0ICAgIFwiNDQwMjA1XCI6IFwi5puy5rGf5Yy6XCIsXG5cdCAgICBcIjQ0MDIyMlwiOiBcIuWni+WFtOWOv1wiLFxuXHQgICAgXCI0NDAyMjRcIjogXCLku4HljJbljr9cIixcblx0ICAgIFwiNDQwMjI5XCI6IFwi57+B5rqQ5Y6/XCIsXG5cdCAgICBcIjQ0MDIzMlwiOiBcIuS5s+a6kOeRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NDAyMzNcIjogXCLmlrDkuLDljr9cIixcblx0ICAgIFwiNDQwMjgxXCI6IFwi5LmQ5piM5biCXCIsXG5cdCAgICBcIjQ0MDI4MlwiOiBcIuWNl+mbhOW4glwiLFxuXHQgICAgXCI0NDAyODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwMzAwXCI6IFwi5rex5Zyz5biCXCIsXG5cdCAgICBcIjQ0MDMwM1wiOiBcIue9l+a5luWMulwiLFxuXHQgICAgXCI0NDAzMDRcIjogXCLnpo/nlLDljLpcIixcblx0ICAgIFwiNDQwMzA1XCI6IFwi5Y2X5bGx5Yy6XCIsXG5cdCAgICBcIjQ0MDMwNlwiOiBcIuWuneWuieWMulwiLFxuXHQgICAgXCI0NDAzMDdcIjogXCLpvpnlspfljLpcIixcblx0ICAgIFwiNDQwMzA4XCI6IFwi55uQ55Sw5Yy6XCIsXG5cdCAgICBcIjQ0MDMwOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDAzMjBcIjogXCLlhYnmmI7mlrDljLpcIixcblx0ICAgIFwiNDQwMzIxXCI6IFwi5Z2q5bGx5paw5Yy6XCIsXG5cdCAgICBcIjQ0MDMyMlwiOiBcIuWkp+m5j+aWsOWMulwiLFxuXHQgICAgXCI0NDAzMjNcIjogXCLpvpnljY7mlrDljLpcIixcblx0ICAgIFwiNDQwNDAwXCI6IFwi54+g5rW35biCXCIsXG5cdCAgICBcIjQ0MDQwMlwiOiBcIummmea0suWMulwiLFxuXHQgICAgXCI0NDA0MDNcIjogXCLmlpfpl6jljLpcIixcblx0ICAgIFwiNDQwNDA0XCI6IFwi6YeR5rm+5Yy6XCIsXG5cdCAgICBcIjQ0MDQ4OFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDA1MDBcIjogXCLmsZXlpLTluIJcIixcblx0ICAgIFwiNDQwNTA3XCI6IFwi6b6Z5rmW5Yy6XCIsXG5cdCAgICBcIjQ0MDUxMVwiOiBcIumHkeW5s+WMulwiLFxuXHQgICAgXCI0NDA1MTJcIjogXCLmv6DmsZ/ljLpcIixcblx0ICAgIFwiNDQwNTEzXCI6IFwi5r2u6Ziz5Yy6XCIsXG5cdCAgICBcIjQ0MDUxNFwiOiBcIua9ruWNl+WMulwiLFxuXHQgICAgXCI0NDA1MTVcIjogXCLmvoTmtbfljLpcIixcblx0ICAgIFwiNDQwNTIzXCI6IFwi5Y2X5r6z5Y6/XCIsXG5cdCAgICBcIjQ0MDUyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDA2MDBcIjogXCLkvZvlsbHluIJcIixcblx0ICAgIFwiNDQwNjA0XCI6IFwi56aF5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0MDYwNVwiOiBcIuWNl+a1t+WMulwiLFxuXHQgICAgXCI0NDA2MDZcIjogXCLpobrlvrfljLpcIixcblx0ICAgIFwiNDQwNjA3XCI6IFwi5LiJ5rC05Yy6XCIsXG5cdCAgICBcIjQ0MDYwOFwiOiBcIumrmOaYjuWMulwiLFxuXHQgICAgXCI0NDA2MDlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwNzAwXCI6IFwi5rGf6Zeo5biCXCIsXG5cdCAgICBcIjQ0MDcwM1wiOiBcIuiTrOaxn+WMulwiLFxuXHQgICAgXCI0NDA3MDRcIjogXCLmsZ/mtbfljLpcIixcblx0ICAgIFwiNDQwNzA1XCI6IFwi5paw5Lya5Yy6XCIsXG5cdCAgICBcIjQ0MDc4MVwiOiBcIuWPsOWxseW4glwiLFxuXHQgICAgXCI0NDA3ODNcIjogXCLlvIDlubPluIJcIixcblx0ICAgIFwiNDQwNzg0XCI6IFwi6bmk5bGx5biCXCIsXG5cdCAgICBcIjQ0MDc4NVwiOiBcIuaBqeW5s+W4glwiLFxuXHQgICAgXCI0NDA3ODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwODAwXCI6IFwi5rmb5rGf5biCXCIsXG5cdCAgICBcIjQ0MDgwMlwiOiBcIui1pOWdjuWMulwiLFxuXHQgICAgXCI0NDA4MDNcIjogXCLpnJ7lsbHljLpcIixcblx0ICAgIFwiNDQwODA0XCI6IFwi5Z2h5aS05Yy6XCIsXG5cdCAgICBcIjQ0MDgxMVwiOiBcIum6u+eroOWMulwiLFxuXHQgICAgXCI0NDA4MjNcIjogXCLpgYLmuqrljr9cIixcblx0ICAgIFwiNDQwODI1XCI6IFwi5b6Q6Ze75Y6/XCIsXG5cdCAgICBcIjQ0MDg4MVwiOiBcIuW7ieaxn+W4glwiLFxuXHQgICAgXCI0NDA4ODJcIjogXCLpm7flt57luIJcIixcblx0ICAgIFwiNDQwODgzXCI6IFwi5ZC05bed5biCXCIsXG5cdCAgICBcIjQ0MDg4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDA5MDBcIjogXCLojILlkI3luIJcIixcblx0ICAgIFwiNDQwOTAyXCI6IFwi6IyC5Y2X5Yy6XCIsXG5cdCAgICBcIjQ0MDkwM1wiOiBcIuiMgua4r+WMulwiLFxuXHQgICAgXCI0NDA5MjNcIjogXCLnlLXnmb3ljr9cIixcblx0ICAgIFwiNDQwOTgxXCI6IFwi6auY5bee5biCXCIsXG5cdCAgICBcIjQ0MDk4MlwiOiBcIuWMluW3nuW4glwiLFxuXHQgICAgXCI0NDA5ODNcIjogXCLkv6HlrpzluIJcIixcblx0ICAgIFwiNDQwOTg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTIwMFwiOiBcIuiCh+W6huW4glwiLFxuXHQgICAgXCI0NDEyMDJcIjogXCLnq6/lt57ljLpcIixcblx0ICAgIFwiNDQxMjAzXCI6IFwi6byO5rmW5Yy6XCIsXG5cdCAgICBcIjQ0MTIyM1wiOiBcIuW5v+WugeWOv1wiLFxuXHQgICAgXCI0NDEyMjRcIjogXCLmgIDpm4bljr9cIixcblx0ICAgIFwiNDQxMjI1XCI6IFwi5bCB5byA5Y6/XCIsXG5cdCAgICBcIjQ0MTIyNlwiOiBcIuW+t+W6huWOv1wiLFxuXHQgICAgXCI0NDEyODNcIjogXCLpq5jopoHluIJcIixcblx0ICAgIFwiNDQxMjg0XCI6IFwi5Zub5Lya5biCXCIsXG5cdCAgICBcIjQ0MTI4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDEzMDBcIjogXCLmg6Dlt57luIJcIixcblx0ICAgIFwiNDQxMzAyXCI6IFwi5oOg5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0MTMwM1wiOiBcIuaDoOmYs+WMulwiLFxuXHQgICAgXCI0NDEzMjJcIjogXCLljZrnvZfljr9cIixcblx0ICAgIFwiNDQxMzIzXCI6IFwi5oOg5Lic5Y6/XCIsXG5cdCAgICBcIjQ0MTMyNFwiOiBcIum+memXqOWOv1wiLFxuXHQgICAgXCI0NDEzMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxNDAwXCI6IFwi5qKF5bee5biCXCIsXG5cdCAgICBcIjQ0MTQwMlwiOiBcIuaiheaxn+WMulwiLFxuXHQgICAgXCI0NDE0MjFcIjogXCLmooXljr9cIixcblx0ICAgIFwiNDQxNDIyXCI6IFwi5aSn5Z+U5Y6/XCIsXG5cdCAgICBcIjQ0MTQyM1wiOiBcIuS4sOmhuuWOv1wiLFxuXHQgICAgXCI0NDE0MjRcIjogXCLkupTljY7ljr9cIixcblx0ICAgIFwiNDQxNDI2XCI6IFwi5bmz6L+c5Y6/XCIsXG5cdCAgICBcIjQ0MTQyN1wiOiBcIuiVieWyreWOv1wiLFxuXHQgICAgXCI0NDE0ODFcIjogXCLlhbTlroHluIJcIixcblx0ICAgIFwiNDQxNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTUwMFwiOiBcIuaxleWwvuW4glwiLFxuXHQgICAgXCI0NDE1MDJcIjogXCLln47ljLpcIixcblx0ICAgIFwiNDQxNTIxXCI6IFwi5rW35Liw5Y6/XCIsXG5cdCAgICBcIjQ0MTUyM1wiOiBcIumZhuays+WOv1wiLFxuXHQgICAgXCI0NDE1ODFcIjogXCLpmYbkuLDluIJcIixcblx0ICAgIFwiNDQxNTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTYwMFwiOiBcIuays+a6kOW4glwiLFxuXHQgICAgXCI0NDE2MDJcIjogXCLmupDln47ljLpcIixcblx0ICAgIFwiNDQxNjIxXCI6IFwi57Sr6YeR5Y6/XCIsXG5cdCAgICBcIjQ0MTYyMlwiOiBcIum+meW3neWOv1wiLFxuXHQgICAgXCI0NDE2MjNcIjogXCLov57lubPljr9cIixcblx0ICAgIFwiNDQxNjI0XCI6IFwi5ZKM5bmz5Y6/XCIsXG5cdCAgICBcIjQ0MTYyNVwiOiBcIuS4nOa6kOWOv1wiLFxuXHQgICAgXCI0NDE2MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxNzAwXCI6IFwi6Ziz5rGf5biCXCIsXG5cdCAgICBcIjQ0MTcwMlwiOiBcIuaxn+WfjuWMulwiLFxuXHQgICAgXCI0NDE3MjFcIjogXCLpmLPopb/ljr9cIixcblx0ICAgIFwiNDQxNzIzXCI6IFwi6Ziz5Lic5Y6/XCIsXG5cdCAgICBcIjQ0MTc4MVwiOiBcIumYs+aYpeW4glwiLFxuXHQgICAgXCI0NDE3ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxODAwXCI6IFwi5riF6L+c5biCXCIsXG5cdCAgICBcIjQ0MTgwMlwiOiBcIua4heWfjuWMulwiLFxuXHQgICAgXCI0NDE4MjFcIjogXCLkvZvlhojljr9cIixcblx0ICAgIFwiNDQxODIzXCI6IFwi6Ziz5bGx5Y6/XCIsXG5cdCAgICBcIjQ0MTgyNVwiOiBcIui/nuWxseWjruaXj+eRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NDE4MjZcIjogXCLov57ljZfnkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDQxODI3XCI6IFwi5riF5paw5Yy6XCIsXG5cdCAgICBcIjQ0MTg4MVwiOiBcIuiLseW+t+W4glwiLFxuXHQgICAgXCI0NDE4ODJcIjogXCLov57lt57luIJcIixcblx0ICAgIFwiNDQxODgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTkwMFwiOiBcIuS4nOiOnuW4glwiLFxuXHQgICAgXCI0NDIwMDBcIjogXCLkuK3lsbHluIJcIixcblx0ICAgIFwiNDQyMTAxXCI6IFwi5Lic5rKZ576k5bKbXCIsXG5cdCAgICBcIjQ0NTEwMFwiOiBcIua9ruW3nuW4glwiLFxuXHQgICAgXCI0NDUxMDJcIjogXCLmuZjmoaXljLpcIixcblx0ICAgIFwiNDQ1MTIxXCI6IFwi5r2u5a6J5Yy6XCIsXG5cdCAgICBcIjQ0NTEyMlwiOiBcIumltuW5s+WOv1wiLFxuXHQgICAgXCI0NDUxODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQ1MjAwXCI6IFwi5o+t6Ziz5biCXCIsXG5cdCAgICBcIjQ0NTIwMlwiOiBcIuamleWfjuWMulwiLFxuXHQgICAgXCI0NDUyMjFcIjogXCLmj63kuJzljLpcIixcblx0ICAgIFwiNDQ1MjIyXCI6IFwi5o+t6KW/5Y6/XCIsXG5cdCAgICBcIjQ0NTIyNFwiOiBcIuaDoOadpeWOv1wiLFxuXHQgICAgXCI0NDUyODFcIjogXCLmma7lroHluIJcIixcblx0ICAgIFwiNDQ1Mjg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0NTMwMFwiOiBcIuS6kea1ruW4glwiLFxuXHQgICAgXCI0NDUzMDJcIjogXCLkupHln47ljLpcIixcblx0ICAgIFwiNDQ1MzIxXCI6IFwi5paw5YW05Y6/XCIsXG5cdCAgICBcIjQ0NTMyMlwiOiBcIumDgeWNl+WOv1wiLFxuXHQgICAgXCI0NDUzMjNcIjogXCLkupHlronljr9cIixcblx0ICAgIFwiNDQ1MzgxXCI6IFwi572X5a6a5biCXCIsXG5cdCAgICBcIjQ0NTM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTAwMDBcIjogXCLlub/opb/lo67ml4/oh6rmsrvljLpcIixcblx0ICAgIFwiNDUwMTAwXCI6IFwi5Y2X5a6B5biCXCIsXG5cdCAgICBcIjQ1MDEwMlwiOiBcIuWFtOWugeWMulwiLFxuXHQgICAgXCI0NTAxMDNcIjogXCLpnZLnp4DljLpcIixcblx0ICAgIFwiNDUwMTA1XCI6IFwi5rGf5Y2X5Yy6XCIsXG5cdCAgICBcIjQ1MDEwN1wiOiBcIuilv+S5oeWhmOWMulwiLFxuXHQgICAgXCI0NTAxMDhcIjogXCLoia/luobljLpcIixcblx0ICAgIFwiNDUwMTA5XCI6IFwi6YKV5a6B5Yy6XCIsXG5cdCAgICBcIjQ1MDEyMlwiOiBcIuatpum4o+WOv1wiLFxuXHQgICAgXCI0NTAxMjNcIjogXCLpmoblronljr9cIixcblx0ICAgIFwiNDUwMTI0XCI6IFwi6ams5bGx5Y6/XCIsXG5cdCAgICBcIjQ1MDEyNVwiOiBcIuS4iuael+WOv1wiLFxuXHQgICAgXCI0NTAxMjZcIjogXCLlrr7pmLPljr9cIixcblx0ICAgIFwiNDUwMTI3XCI6IFwi5qiq5Y6/XCIsXG5cdCAgICBcIjQ1MDEyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTAyMDBcIjogXCLmn7Plt57luIJcIixcblx0ICAgIFwiNDUwMjAyXCI6IFwi5Z+O5Lit5Yy6XCIsXG5cdCAgICBcIjQ1MDIwM1wiOiBcIumxvOWzsOWMulwiLFxuXHQgICAgXCI0NTAyMDRcIjogXCLmn7PljZfljLpcIixcblx0ICAgIFwiNDUwMjA1XCI6IFwi5p+z5YyX5Yy6XCIsXG5cdCAgICBcIjQ1MDIyMVwiOiBcIuafs+axn+WOv1wiLFxuXHQgICAgXCI0NTAyMjJcIjogXCLmn7Pln47ljr9cIixcblx0ICAgIFwiNDUwMjIzXCI6IFwi6bm/5a+o5Y6/XCIsXG5cdCAgICBcIjQ1MDIyNFwiOiBcIuiejeWuieWOv1wiLFxuXHQgICAgXCI0NTAyMjVcIjogXCLono3msLToi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUwMjI2XCI6IFwi5LiJ5rGf5L6X5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MDIyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTAzMDBcIjogXCLmoYLmnpfluIJcIixcblx0ICAgIFwiNDUwMzAyXCI6IFwi56eA5bOw5Yy6XCIsXG5cdCAgICBcIjQ1MDMwM1wiOiBcIuWPoOW9qeWMulwiLFxuXHQgICAgXCI0NTAzMDRcIjogXCLosaHlsbHljLpcIixcblx0ICAgIFwiNDUwMzA1XCI6IFwi5LiD5pif5Yy6XCIsXG5cdCAgICBcIjQ1MDMxMVwiOiBcIumbgeWxseWMulwiLFxuXHQgICAgXCI0NTAzMjFcIjogXCLpmLPmnJTljr9cIixcblx0ICAgIFwiNDUwMzIyXCI6IFwi5Li05qGC5Yy6XCIsXG5cdCAgICBcIjQ1MDMyM1wiOiBcIueBteW3neWOv1wiLFxuXHQgICAgXCI0NTAzMjRcIjogXCLlhajlt57ljr9cIixcblx0ICAgIFwiNDUwMzI1XCI6IFwi5YW05a6J5Y6/XCIsXG5cdCAgICBcIjQ1MDMyNlwiOiBcIuawuOemj+WOv1wiLFxuXHQgICAgXCI0NTAzMjdcIjogXCLngYzpmLPljr9cIixcblx0ICAgIFwiNDUwMzI4XCI6IFwi6b6Z6IOc5ZCE5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MDMyOVwiOiBcIui1hOa6kOWOv1wiLFxuXHQgICAgXCI0NTAzMzBcIjogXCLlubPkuZDljr9cIixcblx0ICAgIFwiNDUwMzMxXCI6IFwi6I2U5rWm5Y6/XCIsXG5cdCAgICBcIjQ1MDMzMlwiOiBcIuaBreWfjueRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTAzMzNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwNDAwXCI6IFwi5qKn5bee5biCXCIsXG5cdCAgICBcIjQ1MDQwM1wiOiBcIuS4h+engOWMulwiLFxuXHQgICAgXCI0NTA0MDVcIjogXCLplb/mtLLljLpcIixcblx0ICAgIFwiNDUwNDA2XCI6IFwi6b6Z5Zyp5Yy6XCIsXG5cdCAgICBcIjQ1MDQyMVwiOiBcIuiLjeaip+WOv1wiLFxuXHQgICAgXCI0NTA0MjJcIjogXCLol6Tljr9cIixcblx0ICAgIFwiNDUwNDIzXCI6IFwi6JKZ5bGx5Y6/XCIsXG5cdCAgICBcIjQ1MDQ4MVwiOiBcIuWykea6quW4glwiLFxuXHQgICAgXCI0NTA0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwNTAwXCI6IFwi5YyX5rW35biCXCIsXG5cdCAgICBcIjQ1MDUwMlwiOiBcIua1t+WfjuWMulwiLFxuXHQgICAgXCI0NTA1MDNcIjogXCLpk7bmtbfljLpcIixcblx0ICAgIFwiNDUwNTEyXCI6IFwi6ZOB5bGx5riv5Yy6XCIsXG5cdCAgICBcIjQ1MDUyMVwiOiBcIuWQiOa1puWOv1wiLFxuXHQgICAgXCI0NTA1MjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwNjAwXCI6IFwi6Ziy5Z+O5riv5biCXCIsXG5cdCAgICBcIjQ1MDYwMlwiOiBcIua4r+WPo+WMulwiLFxuXHQgICAgXCI0NTA2MDNcIjogXCLpmLLln47ljLpcIixcblx0ICAgIFwiNDUwNjIxXCI6IFwi5LiK5oCd5Y6/XCIsXG5cdCAgICBcIjQ1MDY4MVwiOiBcIuS4nOWFtOW4glwiLFxuXHQgICAgXCI0NTA2ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwNzAwXCI6IFwi6ZKm5bee5biCXCIsXG5cdCAgICBcIjQ1MDcwMlwiOiBcIumSpuWNl+WMulwiLFxuXHQgICAgXCI0NTA3MDNcIjogXCLpkqbljJfljLpcIixcblx0ICAgIFwiNDUwNzIxXCI6IFwi54G15bGx5Y6/XCIsXG5cdCAgICBcIjQ1MDcyMlwiOiBcIua1puWMl+WOv1wiLFxuXHQgICAgXCI0NTA3MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwODAwXCI6IFwi6LS15riv5biCXCIsXG5cdCAgICBcIjQ1MDgwMlwiOiBcIua4r+WMl+WMulwiLFxuXHQgICAgXCI0NTA4MDNcIjogXCLmuK/ljZfljLpcIixcblx0ICAgIFwiNDUwODA0XCI6IFwi6KaD5aGY5Yy6XCIsXG5cdCAgICBcIjQ1MDgyMVwiOiBcIuW5s+WNl+WOv1wiLFxuXHQgICAgXCI0NTA4ODFcIjogXCLmoYLlubPluIJcIixcblx0ICAgIFwiNDUwODgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDkwMFwiOiBcIueOieael+W4glwiLFxuXHQgICAgXCI0NTA5MDJcIjogXCLnjonlt57ljLpcIixcblx0ICAgIFwiNDUwOTAzXCI6IFwi56aP57u15Yy6XCIsXG5cdCAgICBcIjQ1MDkyMVwiOiBcIuWuueWOv1wiLFxuXHQgICAgXCI0NTA5MjJcIjogXCLpmYblt53ljr9cIixcblx0ICAgIFwiNDUwOTIzXCI6IFwi5Y2a55m95Y6/XCIsXG5cdCAgICBcIjQ1MDkyNFwiOiBcIuWFtOS4muWOv1wiLFxuXHQgICAgXCI0NTA5ODFcIjogXCLljJfmtYHluIJcIixcblx0ICAgIFwiNDUwOTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MTAwMFwiOiBcIueZvuiJsuW4glwiLFxuXHQgICAgXCI0NTEwMDJcIjogXCLlj7PmsZ/ljLpcIixcblx0ICAgIFwiNDUxMDIxXCI6IFwi55Sw6Ziz5Y6/XCIsXG5cdCAgICBcIjQ1MTAyMlwiOiBcIueUsOS4nOWOv1wiLFxuXHQgICAgXCI0NTEwMjNcIjogXCLlubPmnpzljr9cIixcblx0ICAgIFwiNDUxMDI0XCI6IFwi5b635L+d5Y6/XCIsXG5cdCAgICBcIjQ1MTAyNVwiOiBcIumdluilv+WOv1wiLFxuXHQgICAgXCI0NTEwMjZcIjogXCLpgqPlnaHljr9cIixcblx0ICAgIFwiNDUxMDI3XCI6IFwi5YeM5LqR5Y6/XCIsXG5cdCAgICBcIjQ1MTAyOFwiOiBcIuS5kOS4muWOv1wiLFxuXHQgICAgXCI0NTEwMjlcIjogXCLnlLDmnpfljr9cIixcblx0ICAgIFwiNDUxMDMwXCI6IFwi6KW/5p6X5Y6/XCIsXG5cdCAgICBcIjQ1MTAzMVwiOiBcIumahuael+WQhOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTEwMzJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUxMTAwXCI6IFwi6LS65bee5biCXCIsXG5cdCAgICBcIjQ1MTEwMlwiOiBcIuWFq+atpeWMulwiLFxuXHQgICAgXCI0NTExMTlcIjogXCLlubPmoYLnrqHnkIbljLpcIixcblx0ICAgIFwiNDUxMTIxXCI6IFwi5pit5bmz5Y6/XCIsXG5cdCAgICBcIjQ1MTEyMlwiOiBcIumSn+WxseWOv1wiLFxuXHQgICAgXCI0NTExMjNcIjogXCLlr4zlt53nkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MTIwMFwiOiBcIuays+axoOW4glwiLFxuXHQgICAgXCI0NTEyMDJcIjogXCLph5Hln47msZ/ljLpcIixcblx0ICAgIFwiNDUxMjIxXCI6IFwi5Y2X5Li55Y6/XCIsXG5cdCAgICBcIjQ1MTIyMlwiOiBcIuWkqeWzqOWOv1wiLFxuXHQgICAgXCI0NTEyMjNcIjogXCLlh6TlsbHljr9cIixcblx0ICAgIFwiNDUxMjI0XCI6IFwi5Lic5YWw5Y6/XCIsXG5cdCAgICBcIjQ1MTIyNVwiOiBcIue9l+WfjuS7q+S9rOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTEyMjZcIjogXCLnjq/msZ/mr5vljZfml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMjI3XCI6IFwi5be06ams55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTIyOFwiOiBcIumDveWuieeRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTEyMjlcIjogXCLlpKfljJbnkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMjgxXCI6IFwi5a6c5bee5biCXCIsXG5cdCAgICBcIjQ1MTI4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTEzMDBcIjogXCLmnaXlrr7luIJcIixcblx0ICAgIFwiNDUxMzAyXCI6IFwi5YW05a6+5Yy6XCIsXG5cdCAgICBcIjQ1MTMyMVwiOiBcIuW/u+WfjuWOv1wiLFxuXHQgICAgXCI0NTEzMjJcIjogXCLosaHlt57ljr9cIixcblx0ICAgIFwiNDUxMzIzXCI6IFwi5q2m5a6j5Y6/XCIsXG5cdCAgICBcIjQ1MTMyNFwiOiBcIumHkeengOeRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTEzODFcIjogXCLlkIjlsbHluIJcIixcblx0ICAgIFwiNDUxMzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MTQwMFwiOiBcIuW0h+W3puW4glwiLFxuXHQgICAgXCI0NTE0MDJcIjogXCLmsZ/lt57ljLpcIixcblx0ICAgIFwiNDUxNDIxXCI6IFwi5om257ul5Y6/XCIsXG5cdCAgICBcIjQ1MTQyMlwiOiBcIuWugeaYjuWOv1wiLFxuXHQgICAgXCI0NTE0MjNcIjogXCLpvpnlt57ljr9cIixcblx0ICAgIFwiNDUxNDI0XCI6IFwi5aSn5paw5Y6/XCIsXG5cdCAgICBcIjQ1MTQyNVwiOiBcIuWkqeetieWOv1wiLFxuXHQgICAgXCI0NTE0ODFcIjogXCLlh63npaXluIJcIixcblx0ICAgIFwiNDUxNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ2MDAwMFwiOiBcIua1t+WNl+ecgVwiLFxuXHQgICAgXCI0NjAxMDBcIjogXCLmtbflj6PluIJcIixcblx0ICAgIFwiNDYwMTA1XCI6IFwi56eA6Iux5Yy6XCIsXG5cdCAgICBcIjQ2MDEwNlwiOiBcIum+meWNjuWMulwiLFxuXHQgICAgXCI0NjAxMDdcIjogXCLnkLzlsbHljLpcIixcblx0ICAgIFwiNDYwMTA4XCI6IFwi576O5YWw5Yy6XCIsXG5cdCAgICBcIjQ2MDEwOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NjAyMDBcIjogXCLkuInkuprluIJcIixcblx0ICAgIFwiNDYwMzAwXCI6IFwi5LiJ5rKZ5biCXCIsXG5cdCAgICBcIjQ2MDMyMVwiOiBcIuilv+aymee+pOWym1wiLFxuXHQgICAgXCI0NjAzMjJcIjogXCLljZfmspnnvqTlsptcIixcblx0ICAgIFwiNDYwMzIzXCI6IFwi5Lit5rKZ576k5bKb55qE5bKb56SB5Y+K5YW25rW35Z+fXCIsXG5cdCAgICBcIjQ2OTAwMVwiOiBcIuS6lOaMh+WxseW4glwiLFxuXHQgICAgXCI0NjkwMDJcIjogXCLnkLzmtbfluIJcIixcblx0ICAgIFwiNDY5MDAzXCI6IFwi5YSL5bee5biCXCIsXG5cdCAgICBcIjQ2OTAwNVwiOiBcIuaWh+aYjOW4glwiLFxuXHQgICAgXCI0NjkwMDZcIjogXCLkuIflroHluIJcIixcblx0ICAgIFwiNDY5MDA3XCI6IFwi5Lic5pa55biCXCIsXG5cdCAgICBcIjQ2OTAyNVwiOiBcIuWumuWuieWOv1wiLFxuXHQgICAgXCI0NjkwMjZcIjogXCLlsa/mmIzljr9cIixcblx0ICAgIFwiNDY5MDI3XCI6IFwi5r6E6L+I5Y6/XCIsXG5cdCAgICBcIjQ2OTAyOFwiOiBcIuS4tOmrmOWOv1wiLFxuXHQgICAgXCI0NjkwMzBcIjogXCLnmb3mspnpu47ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDY5MDMxXCI6IFwi5piM5rGf6buO5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ2OTAzM1wiOiBcIuS5kOS4nOm7juaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NjkwMzRcIjogXCLpmbXmsLTpu47ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDY5MDM1XCI6IFwi5L+d5Lqt6buO5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ2OTAzNlwiOiBcIueQvOS4rem7juaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NzEwMDVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTAwMDAwXCI6IFwi6YeN5bqGXCIsXG5cdCAgICBcIjUwMDEwMFwiOiBcIumHjeW6huW4glwiLFxuXHQgICAgXCI1MDAxMDFcIjogXCLkuIflt57ljLpcIixcblx0ICAgIFwiNTAwMTAyXCI6IFwi5raq6Zm15Yy6XCIsXG5cdCAgICBcIjUwMDEwM1wiOiBcIua4neS4reWMulwiLFxuXHQgICAgXCI1MDAxMDRcIjogXCLlpKfmuKHlj6PljLpcIixcblx0ICAgIFwiNTAwMTA1XCI6IFwi5rGf5YyX5Yy6XCIsXG5cdCAgICBcIjUwMDEwNlwiOiBcIuaymeWdquWdneWMulwiLFxuXHQgICAgXCI1MDAxMDdcIjogXCLkuZ3pvpnlnaHljLpcIixcblx0ICAgIFwiNTAwMTA4XCI6IFwi5Y2X5bK45Yy6XCIsXG5cdCAgICBcIjUwMDEwOVwiOiBcIuWMl+eimuWMulwiLFxuXHQgICAgXCI1MDAxMTBcIjogXCLkuIfnm5vljLpcIixcblx0ICAgIFwiNTAwMTExXCI6IFwi5Y+M5qGl5Yy6XCIsXG5cdCAgICBcIjUwMDExMlwiOiBcIua4neWMl+WMulwiLFxuXHQgICAgXCI1MDAxMTNcIjogXCLlt7TljZfljLpcIixcblx0ICAgIFwiNTAwMTE0XCI6IFwi6buU5rGf5Yy6XCIsXG5cdCAgICBcIjUwMDExNVwiOiBcIumVv+Wvv+WMulwiLFxuXHQgICAgXCI1MDAyMjJcIjogXCLntqbmsZ/ljLpcIixcblx0ICAgIFwiNTAwMjIzXCI6IFwi5r285Y2X5Y6/XCIsXG5cdCAgICBcIjUwMDIyNFwiOiBcIumTnOaigeWOv1wiLFxuXHQgICAgXCI1MDAyMjVcIjogXCLlpKfotrPljLpcIixcblx0ICAgIFwiNTAwMjI2XCI6IFwi6I2j5piM5Y6/XCIsXG5cdCAgICBcIjUwMDIyN1wiOiBcIueSp+WxseWOv1wiLFxuXHQgICAgXCI1MDAyMjhcIjogXCLmooHlubPljr9cIixcblx0ICAgIFwiNTAwMjI5XCI6IFwi5Z+O5Y+j5Y6/XCIsXG5cdCAgICBcIjUwMDIzMFwiOiBcIuS4sOmDveWOv1wiLFxuXHQgICAgXCI1MDAyMzFcIjogXCLlnqvmsZ/ljr9cIixcblx0ICAgIFwiNTAwMjMyXCI6IFwi5q2m6ZqG5Y6/XCIsXG5cdCAgICBcIjUwMDIzM1wiOiBcIuW/oOWOv1wiLFxuXHQgICAgXCI1MDAyMzRcIjogXCLlvIDljr9cIixcblx0ICAgIFwiNTAwMjM1XCI6IFwi5LqR6Ziz5Y6/XCIsXG5cdCAgICBcIjUwMDIzNlwiOiBcIuWlieiKguWOv1wiLFxuXHQgICAgXCI1MDAyMzdcIjogXCLlt6vlsbHljr9cIixcblx0ICAgIFwiNTAwMjM4XCI6IFwi5ber5rqq5Y6/XCIsXG5cdCAgICBcIjUwMDI0MFwiOiBcIuefs+afseWcn+WutuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MDAyNDFcIjogXCLnp4DlsbHlnJ/lrrbml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTAwMjQyXCI6IFwi6YWJ6Ziz5Zyf5a625peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUwMDI0M1wiOiBcIuW9reawtOiLl+aXj+Wcn+WutuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MDAzODFcIjogXCLmsZ/mtKXljLpcIixcblx0ICAgIFwiNTAwMzgyXCI6IFwi5ZCI5bed5Yy6XCIsXG5cdCAgICBcIjUwMDM4M1wiOiBcIuawuOW3neWMulwiLFxuXHQgICAgXCI1MDAzODRcIjogXCLljZflt53ljLpcIixcblx0ICAgIFwiNTAwMzg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDAwMFwiOiBcIuWbm+W3neecgVwiLFxuXHQgICAgXCI1MTAxMDBcIjogXCLmiJDpg73luIJcIixcblx0ICAgIFwiNTEwMTA0XCI6IFwi6ZSm5rGf5Yy6XCIsXG5cdCAgICBcIjUxMDEwNVwiOiBcIumdkue+iuWMulwiLFxuXHQgICAgXCI1MTAxMDZcIjogXCLph5HniZvljLpcIixcblx0ICAgIFwiNTEwMTA3XCI6IFwi5q2m5L6v5Yy6XCIsXG5cdCAgICBcIjUxMDEwOFwiOiBcIuaIkOWNjuWMulwiLFxuXHQgICAgXCI1MTAxMTJcIjogXCLpvpnms4npqb/ljLpcIixcblx0ICAgIFwiNTEwMTEzXCI6IFwi6Z2S55m95rGf5Yy6XCIsXG5cdCAgICBcIjUxMDExNFwiOiBcIuaWsOmDveWMulwiLFxuXHQgICAgXCI1MTAxMTVcIjogXCLmuKnmsZ/ljLpcIixcblx0ICAgIFwiNTEwMTIxXCI6IFwi6YeR5aCC5Y6/XCIsXG5cdCAgICBcIjUxMDEyMlwiOiBcIuWPjOa1geWOv1wiLFxuXHQgICAgXCI1MTAxMjRcIjogXCLpg6vljr9cIixcblx0ICAgIFwiNTEwMTI5XCI6IFwi5aSn6YKR5Y6/XCIsXG5cdCAgICBcIjUxMDEzMVwiOiBcIuiSsuaxn+WOv1wiLFxuXHQgICAgXCI1MTAxMzJcIjogXCLmlrDmtKXljr9cIixcblx0ICAgIFwiNTEwMTgxXCI6IFwi6YO95rGf5aCw5biCXCIsXG5cdCAgICBcIjUxMDE4MlwiOiBcIuW9reW3nuW4glwiLFxuXHQgICAgXCI1MTAxODNcIjogXCLpgpvltIPluIJcIixcblx0ICAgIFwiNTEwMTg0XCI6IFwi5bSH5bee5biCXCIsXG5cdCAgICBcIjUxMDE4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTAzMDBcIjogXCLoh6rotKHluIJcIixcblx0ICAgIFwiNTEwMzAyXCI6IFwi6Ieq5rWB5LqV5Yy6XCIsXG5cdCAgICBcIjUxMDMwM1wiOiBcIui0oeS6leWMulwiLFxuXHQgICAgXCI1MTAzMDRcIjogXCLlpKflronljLpcIixcblx0ICAgIFwiNTEwMzExXCI6IFwi5rK/5rup5Yy6XCIsXG5cdCAgICBcIjUxMDMyMVwiOiBcIuiNo+WOv1wiLFxuXHQgICAgXCI1MTAzMjJcIjogXCLlr4zpobrljr9cIixcblx0ICAgIFwiNTEwMzIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDQwMFwiOiBcIuaUgOaeneiKseW4glwiLFxuXHQgICAgXCI1MTA0MDJcIjogXCLkuJzljLpcIixcblx0ICAgIFwiNTEwNDAzXCI6IFwi6KW/5Yy6XCIsXG5cdCAgICBcIjUxMDQxMVwiOiBcIuS7geWSjOWMulwiLFxuXHQgICAgXCI1MTA0MjFcIjogXCLnsbPmmJPljr9cIixcblx0ICAgIFwiNTEwNDIyXCI6IFwi55uQ6L655Y6/XCIsXG5cdCAgICBcIjUxMDQyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTA1MDBcIjogXCLms7jlt57luIJcIixcblx0ICAgIFwiNTEwNTAyXCI6IFwi5rGf6Ziz5Yy6XCIsXG5cdCAgICBcIjUxMDUwM1wiOiBcIue6s+a6quWMulwiLFxuXHQgICAgXCI1MTA1MDRcIjogXCLpvpnpqazmva3ljLpcIixcblx0ICAgIFwiNTEwNTIxXCI6IFwi5rO45Y6/XCIsXG5cdCAgICBcIjUxMDUyMlwiOiBcIuWQiOaxn+WOv1wiLFxuXHQgICAgXCI1MTA1MjRcIjogXCLlj5nmsLjljr9cIixcblx0ICAgIFwiNTEwNTI1XCI6IFwi5Y+k6JS65Y6/XCIsXG5cdCAgICBcIjUxMDUyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTA2MDBcIjogXCLlvrfpmLPluIJcIixcblx0ICAgIFwiNTEwNjAzXCI6IFwi5peM6Ziz5Yy6XCIsXG5cdCAgICBcIjUxMDYyM1wiOiBcIuS4reaxn+WOv1wiLFxuXHQgICAgXCI1MTA2MjZcIjogXCLnvZfmsZ/ljr9cIixcblx0ICAgIFwiNTEwNjgxXCI6IFwi5bm/5rGJ5biCXCIsXG5cdCAgICBcIjUxMDY4MlwiOiBcIuS7gOmCoeW4glwiLFxuXHQgICAgXCI1MTA2ODNcIjogXCLnu7Xnq7nluIJcIixcblx0ICAgIFwiNTEwNjg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDcwMFwiOiBcIue7temYs+W4glwiLFxuXHQgICAgXCI1MTA3MDNcIjogXCLmtqrln47ljLpcIixcblx0ICAgIFwiNTEwNzA0XCI6IFwi5ri45LuZ5Yy6XCIsXG5cdCAgICBcIjUxMDcyMlwiOiBcIuS4ieWPsOWOv1wiLFxuXHQgICAgXCI1MTA3MjNcIjogXCLnm5Dkuq3ljr9cIixcblx0ICAgIFwiNTEwNzI0XCI6IFwi5a6J5Y6/XCIsXG5cdCAgICBcIjUxMDcyNVwiOiBcIuaik+a9vOWOv1wiLFxuXHQgICAgXCI1MTA3MjZcIjogXCLljJflt53nvozml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTEwNzI3XCI6IFwi5bmz5q2m5Y6/XCIsXG5cdCAgICBcIjUxMDc4MVwiOiBcIuaxn+ayueW4glwiLFxuXHQgICAgXCI1MTA3ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwODAwXCI6IFwi5bm/5YWD5biCXCIsXG5cdCAgICBcIjUxMDgwMlwiOiBcIuWIqeW3nuWMulwiLFxuXHQgICAgXCI1MTA4MTFcIjogXCLmmK3ljJbljLpcIixcblx0ICAgIFwiNTEwODEyXCI6IFwi5pyd5aSp5Yy6XCIsXG5cdCAgICBcIjUxMDgyMVwiOiBcIuaXuuiLjeWOv1wiLFxuXHQgICAgXCI1MTA4MjJcIjogXCLpnZLlt53ljr9cIixcblx0ICAgIFwiNTEwODIzXCI6IFwi5YmR6ZiB5Y6/XCIsXG5cdCAgICBcIjUxMDgyNFwiOiBcIuiLjea6quWOv1wiLFxuXHQgICAgXCI1MTA4MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwOTAwXCI6IFwi6YGC5a6B5biCXCIsXG5cdCAgICBcIjUxMDkwM1wiOiBcIuiIueWxseWMulwiLFxuXHQgICAgXCI1MTA5MDRcIjogXCLlronlsYXljLpcIixcblx0ICAgIFwiNTEwOTIxXCI6IFwi6JOs5rqq5Y6/XCIsXG5cdCAgICBcIjUxMDkyMlwiOiBcIuWwhOa0quWOv1wiLFxuXHQgICAgXCI1MTA5MjNcIjogXCLlpKfoi7Hljr9cIixcblx0ICAgIFwiNTEwOTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTAwMFwiOiBcIuWGheaxn+W4glwiLFxuXHQgICAgXCI1MTEwMDJcIjogXCLluILkuK3ljLpcIixcblx0ICAgIFwiNTExMDExXCI6IFwi5Lic5YW05Yy6XCIsXG5cdCAgICBcIjUxMTAyNFwiOiBcIuWogei/nOWOv1wiLFxuXHQgICAgXCI1MTEwMjVcIjogXCLotYTkuK3ljr9cIixcblx0ICAgIFwiNTExMDI4XCI6IFwi6ZqG5piM5Y6/XCIsXG5cdCAgICBcIjUxMTAyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTExMDBcIjogXCLkuZDlsbHluIJcIixcblx0ICAgIFwiNTExMTAyXCI6IFwi5biC5Lit5Yy6XCIsXG5cdCAgICBcIjUxMTExMVwiOiBcIuaymea5vuWMulwiLFxuXHQgICAgXCI1MTExMTJcIjogXCLkupTpgJrmoaXljLpcIixcblx0ICAgIFwiNTExMTEzXCI6IFwi6YeR5Y+j5rKz5Yy6XCIsXG5cdCAgICBcIjUxMTEyM1wiOiBcIueKjeS4uuWOv1wiLFxuXHQgICAgXCI1MTExMjRcIjogXCLkupXnoJTljr9cIixcblx0ICAgIFwiNTExMTI2XCI6IFwi5aS55rGf5Y6/XCIsXG5cdCAgICBcIjUxMTEyOVwiOiBcIuaykOW3neWOv1wiLFxuXHQgICAgXCI1MTExMzJcIjogXCLls6jovrnlvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTExMTMzXCI6IFwi6ams6L655b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUxMTE4MVwiOiBcIuWzqOecieWxseW4glwiLFxuXHQgICAgXCI1MTExODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExMzAwXCI6IFwi5Y2X5YWF5biCXCIsXG5cdCAgICBcIjUxMTMwMlwiOiBcIumhuuW6huWMulwiLFxuXHQgICAgXCI1MTEzMDNcIjogXCLpq5jlnarljLpcIixcblx0ICAgIFwiNTExMzA0XCI6IFwi5ZiJ6Zm15Yy6XCIsXG5cdCAgICBcIjUxMTMyMVwiOiBcIuWNl+mDqOWOv1wiLFxuXHQgICAgXCI1MTEzMjJcIjogXCLokKXlsbHljr9cIixcblx0ICAgIFwiNTExMzIzXCI6IFwi6JOs5a6J5Y6/XCIsXG5cdCAgICBcIjUxMTMyNFwiOiBcIuS7qumZh+WOv1wiLFxuXHQgICAgXCI1MTEzMjVcIjogXCLopb/lhYXljr9cIixcblx0ICAgIFwiNTExMzgxXCI6IFwi6ZiG5Lit5biCXCIsXG5cdCAgICBcIjUxMTM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTE0MDBcIjogXCLnnInlsbHluIJcIixcblx0ICAgIFwiNTExNDAyXCI6IFwi5Lic5Z2h5Yy6XCIsXG5cdCAgICBcIjUxMTQyMVwiOiBcIuS7geWvv+WOv1wiLFxuXHQgICAgXCI1MTE0MjJcIjogXCLlva3lsbHljr9cIixcblx0ICAgIFwiNTExNDIzXCI6IFwi5rSq6ZuF5Y6/XCIsXG5cdCAgICBcIjUxMTQyNFwiOiBcIuS4ueajseWOv1wiLFxuXHQgICAgXCI1MTE0MjVcIjogXCLpnZLnpZ7ljr9cIixcblx0ICAgIFwiNTExNDI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTUwMFwiOiBcIuWunOWuvuW4glwiLFxuXHQgICAgXCI1MTE1MDJcIjogXCLnv6DlsY/ljLpcIixcblx0ICAgIFwiNTExNTIxXCI6IFwi5a6c5a6+5Y6/XCIsXG5cdCAgICBcIjUxMTUyMlwiOiBcIuWNl+a6quWMulwiLFxuXHQgICAgXCI1MTE1MjNcIjogXCLmsZ/lronljr9cIixcblx0ICAgIFwiNTExNTI0XCI6IFwi6ZW/5a6B5Y6/XCIsXG5cdCAgICBcIjUxMTUyNVwiOiBcIumrmOWOv1wiLFxuXHQgICAgXCI1MTE1MjZcIjogXCLnj5nljr9cIixcblx0ICAgIFwiNTExNTI3XCI6IFwi562g6L+e5Y6/XCIsXG5cdCAgICBcIjUxMTUyOFwiOiBcIuWFtOaWh+WOv1wiLFxuXHQgICAgXCI1MTE1MjlcIjogXCLlsY/lsbHljr9cIixcblx0ICAgIFwiNTExNTMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTYwMFwiOiBcIuW5v+WuieW4glwiLFxuXHQgICAgXCI1MTE2MDJcIjogXCLlub/lronljLpcIixcblx0ICAgIFwiNTExNjAzXCI6IFwi5YmN6ZSL5Yy6XCIsXG5cdCAgICBcIjUxMTYyMVwiOiBcIuWys+axoOWOv1wiLFxuXHQgICAgXCI1MTE2MjJcIjogXCLmrabog5zljr9cIixcblx0ICAgIFwiNTExNjIzXCI6IFwi6YK75rC05Y6/XCIsXG5cdCAgICBcIjUxMTY4MVwiOiBcIuWNjuiTpeW4glwiLFxuXHQgICAgXCI1MTE2ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExNzAwXCI6IFwi6L6+5bee5biCXCIsXG5cdCAgICBcIjUxMTcwMlwiOiBcIumAmuW3neWMulwiLFxuXHQgICAgXCI1MTE3MjFcIjogXCLovr7lt53ljLpcIixcblx0ICAgIFwiNTExNzIyXCI6IFwi5a6j5rGJ5Y6/XCIsXG5cdCAgICBcIjUxMTcyM1wiOiBcIuW8gOaxn+WOv1wiLFxuXHQgICAgXCI1MTE3MjRcIjogXCLlpKfnq7nljr9cIixcblx0ICAgIFwiNTExNzI1XCI6IFwi5rig5Y6/XCIsXG5cdCAgICBcIjUxMTc4MVwiOiBcIuS4h+a6kOW4glwiLFxuXHQgICAgXCI1MTE3ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExODAwXCI6IFwi6ZuF5a6J5biCXCIsXG5cdCAgICBcIjUxMTgwMlwiOiBcIumbqOWfjuWMulwiLFxuXHQgICAgXCI1MTE4MjFcIjogXCLlkI3lsbHljLpcIixcblx0ICAgIFwiNTExODIyXCI6IFwi6I2l57uP5Y6/XCIsXG5cdCAgICBcIjUxMTgyM1wiOiBcIuaxiea6kOWOv1wiLFxuXHQgICAgXCI1MTE4MjRcIjogXCLnn7Pmo4nljr9cIixcblx0ICAgIFwiNTExODI1XCI6IFwi5aSp5YWo5Y6/XCIsXG5cdCAgICBcIjUxMTgyNlwiOiBcIuiKpuWxseWOv1wiLFxuXHQgICAgXCI1MTE4MjdcIjogXCLlrp3lhbTljr9cIixcblx0ICAgIFwiNTExODI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTkwMFwiOiBcIuW3tOS4reW4glwiLFxuXHQgICAgXCI1MTE5MDJcIjogXCLlt7Tlt57ljLpcIixcblx0ICAgIFwiNTExOTAzXCI6IFwi5oGp6Ziz5Yy6XCIsXG5cdCAgICBcIjUxMTkyMVwiOiBcIumAmuaxn+WOv1wiLFxuXHQgICAgXCI1MTE5MjJcIjogXCLljZfmsZ/ljr9cIixcblx0ICAgIFwiNTExOTIzXCI6IFwi5bmz5piM5Y6/XCIsXG5cdCAgICBcIjUxMTkyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTIwMDBcIjogXCLotYTpmLPluIJcIixcblx0ICAgIFwiNTEyMDAyXCI6IFwi6ZuB5rGf5Yy6XCIsXG5cdCAgICBcIjUxMjAyMVwiOiBcIuWuieWys+WOv1wiLFxuXHQgICAgXCI1MTIwMjJcIjogXCLkuZDoh7Pljr9cIixcblx0ICAgIFwiNTEyMDgxXCI6IFwi566A6Ziz5biCXCIsXG5cdCAgICBcIjUxMjA4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTMyMDBcIjogXCLpmL/lnZ3ol4/ml4/nvozml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTEzMjIxXCI6IFwi5rG25bed5Y6/XCIsXG5cdCAgICBcIjUxMzIyMlwiOiBcIueQhuWOv1wiLFxuXHQgICAgXCI1MTMyMjNcIjogXCLojILljr9cIixcblx0ICAgIFwiNTEzMjI0XCI6IFwi5p2+5r2Y5Y6/XCIsXG5cdCAgICBcIjUxMzIyNVwiOiBcIuS5neWvqOayn+WOv1wiLFxuXHQgICAgXCI1MTMyMjZcIjogXCLph5Hlt53ljr9cIixcblx0ICAgIFwiNTEzMjI3XCI6IFwi5bCP6YeR5Y6/XCIsXG5cdCAgICBcIjUxMzIyOFwiOiBcIum7keawtOWOv1wiLFxuXHQgICAgXCI1MTMyMjlcIjogXCLpqazlsJTlurfljr9cIixcblx0ICAgIFwiNTEzMjMwXCI6IFwi5aOk5aGY5Y6/XCIsXG5cdCAgICBcIjUxMzIzMVwiOiBcIumYv+WdneWOv1wiLFxuXHQgICAgXCI1MTMyMzJcIjogXCLoi6XlsJTnm5bljr9cIixcblx0ICAgIFwiNTEzMjMzXCI6IFwi57qi5Y6f5Y6/XCIsXG5cdCAgICBcIjUxMzIzNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTMzMDBcIjogXCLnlJjlrZzol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTEzMzIxXCI6IFwi5bq35a6a5Y6/XCIsXG5cdCAgICBcIjUxMzMyMlwiOiBcIuazuOWumuWOv1wiLFxuXHQgICAgXCI1MTMzMjNcIjogXCLkuLnlt7Tljr9cIixcblx0ICAgIFwiNTEzMzI0XCI6IFwi5Lmd6b6Z5Y6/XCIsXG5cdCAgICBcIjUxMzMyNVwiOiBcIumbheaxn+WOv1wiLFxuXHQgICAgXCI1MTMzMjZcIjogXCLpgZPlrZrljr9cIixcblx0ICAgIFwiNTEzMzI3XCI6IFwi54KJ6ZyN5Y6/XCIsXG5cdCAgICBcIjUxMzMyOFwiOiBcIueUmOWtnOWOv1wiLFxuXHQgICAgXCI1MTMzMjlcIjogXCLmlrDpvpnljr9cIixcblx0ICAgIFwiNTEzMzMwXCI6IFwi5b635qC85Y6/XCIsXG5cdCAgICBcIjUxMzMzMVwiOiBcIueZveeOieWOv1wiLFxuXHQgICAgXCI1MTMzMzJcIjogXCLnn7PmuKDljr9cIixcblx0ICAgIFwiNTEzMzMzXCI6IFwi6Imy6L6+5Y6/XCIsXG5cdCAgICBcIjUxMzMzNFwiOiBcIueQhuWhmOWOv1wiLFxuXHQgICAgXCI1MTMzMzVcIjogXCLlt7TloZjljr9cIixcblx0ICAgIFwiNTEzMzM2XCI6IFwi5Lmh5Z+O5Y6/XCIsXG5cdCAgICBcIjUxMzMzN1wiOiBcIueou+WfjuWOv1wiLFxuXHQgICAgXCI1MTMzMzhcIjogXCLlvpfojaPljr9cIixcblx0ICAgIFwiNTEzMzM5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMzQwMFwiOiBcIuWHieWxseW9neaXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MTM0MDFcIjogXCLopb/mmIzluIJcIixcblx0ICAgIFwiNTEzNDIyXCI6IFwi5pyo6YeM6JeP5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUxMzQyM1wiOiBcIuebkOa6kOWOv1wiLFxuXHQgICAgXCI1MTM0MjRcIjogXCLlvrfmmIzljr9cIixcblx0ICAgIFwiNTEzNDI1XCI6IFwi5Lya55CG5Y6/XCIsXG5cdCAgICBcIjUxMzQyNlwiOiBcIuS8muS4nOWOv1wiLFxuXHQgICAgXCI1MTM0MjdcIjogXCLlroHljZfljr9cIixcblx0ICAgIFwiNTEzNDI4XCI6IFwi5pmu5qC85Y6/XCIsXG5cdCAgICBcIjUxMzQyOVwiOiBcIuW4g+aLluWOv1wiLFxuXHQgICAgXCI1MTM0MzBcIjogXCLph5HpmLPljr9cIixcblx0ICAgIFwiNTEzNDMxXCI6IFwi5pit6KeJ5Y6/XCIsXG5cdCAgICBcIjUxMzQzMlwiOiBcIuWWnOW+t+WOv1wiLFxuXHQgICAgXCI1MTM0MzNcIjogXCLlhpXlroHljr9cIixcblx0ICAgIFwiNTEzNDM0XCI6IFwi6LaK6KW/5Y6/XCIsXG5cdCAgICBcIjUxMzQzNVwiOiBcIueUmOa0m+WOv1wiLFxuXHQgICAgXCI1MTM0MzZcIjogXCLnvo7lp5Hljr9cIixcblx0ICAgIFwiNTEzNDM3XCI6IFwi6Zu35rOi5Y6/XCIsXG5cdCAgICBcIjUxMzQzOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjAwMDBcIjogXCLotLXlt57nnIFcIixcblx0ICAgIFwiNTIwMTAwXCI6IFwi6LS16Ziz5biCXCIsXG5cdCAgICBcIjUyMDEwMlwiOiBcIuWNl+aYjuWMulwiLFxuXHQgICAgXCI1MjAxMDNcIjogXCLkupHlsqnljLpcIixcblx0ICAgIFwiNTIwMTExXCI6IFwi6Iqx5rqq5Yy6XCIsXG5cdCAgICBcIjUyMDExMlwiOiBcIuS5jOW9k+WMulwiLFxuXHQgICAgXCI1MjAxMTNcIjogXCLnmb3kupHljLpcIixcblx0ICAgIFwiNTIwMTIxXCI6IFwi5byA6Ziz5Y6/XCIsXG5cdCAgICBcIjUyMDEyMlwiOiBcIuaBr+eDveWOv1wiLFxuXHQgICAgXCI1MjAxMjNcIjogXCLkv67mlofljr9cIixcblx0ICAgIFwiNTIwMTUxXCI6IFwi6KeC5bGx5rmW5Yy6XCIsXG5cdCAgICBcIjUyMDE4MVwiOiBcIua4hemVh+W4glwiLFxuXHQgICAgXCI1MjAxODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIwMjAwXCI6IFwi5YWt55uY5rC05biCXCIsXG5cdCAgICBcIjUyMDIwMVwiOiBcIumSn+WxseWMulwiLFxuXHQgICAgXCI1MjAyMDNcIjogXCLlha3mnp3nibnljLpcIixcblx0ICAgIFwiNTIwMjIxXCI6IFwi5rC05Z+O5Y6/XCIsXG5cdCAgICBcIjUyMDIyMlwiOiBcIuebmOWOv1wiLFxuXHQgICAgXCI1MjAyMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIwMzAwXCI6IFwi6YG15LmJ5biCXCIsXG5cdCAgICBcIjUyMDMwMlwiOiBcIue6ouiKseWyl+WMulwiLFxuXHQgICAgXCI1MjAzMDNcIjogXCLmsYflt53ljLpcIixcblx0ICAgIFwiNTIwMzIxXCI6IFwi6YG15LmJ5Y6/XCIsXG5cdCAgICBcIjUyMDMyMlwiOiBcIuahkOaik+WOv1wiLFxuXHQgICAgXCI1MjAzMjNcIjogXCLnu6XpmLPljr9cIixcblx0ICAgIFwiNTIwMzI0XCI6IFwi5q2j5a6J5Y6/XCIsXG5cdCAgICBcIjUyMDMyNVwiOiBcIumBk+ecn+S7oeS9rOaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjAzMjZcIjogXCLliqHlt53ku6Hkvazml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIwMzI3XCI6IFwi5Yek5YaI5Y6/XCIsXG5cdCAgICBcIjUyMDMyOFwiOiBcIua5hOa9reWOv1wiLFxuXHQgICAgXCI1MjAzMjlcIjogXCLkvZnluobljr9cIixcblx0ICAgIFwiNTIwMzMwXCI6IFwi5Lmg5rC05Y6/XCIsXG5cdCAgICBcIjUyMDM4MVwiOiBcIui1pOawtOW4glwiLFxuXHQgICAgXCI1MjAzODJcIjogXCLku4HmgIDluIJcIixcblx0ICAgIFwiNTIwMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMDQwMFwiOiBcIuWuiemhuuW4glwiLFxuXHQgICAgXCI1MjA0MDJcIjogXCLopb/np4DljLpcIixcblx0ICAgIFwiNTIwNDIxXCI6IFwi5bmz5Z2d5Y6/XCIsXG5cdCAgICBcIjUyMDQyMlwiOiBcIuaZruWumuWOv1wiLFxuXHQgICAgXCI1MjA0MjNcIjogXCLplYflroHluIPkvp3ml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIwNDI0XCI6IFwi5YWz5bKt5biD5L6d5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMDQyNVwiOiBcIue0q+S6keiLl+aXj+W4g+S+neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjA0MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIyMjAwXCI6IFwi6ZOc5LuB5biCXCIsXG5cdCAgICBcIjUyMjIwMVwiOiBcIueip+axn+WMulwiLFxuXHQgICAgXCI1MjIyMjJcIjogXCLmsZ/lj6Pljr9cIixcblx0ICAgIFwiNTIyMjIzXCI6IFwi546J5bGP5L6X5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMjIyNFwiOiBcIuefs+mYoeWOv1wiLFxuXHQgICAgXCI1MjIyMjVcIjogXCLmgJ3ljZfljr9cIixcblx0ICAgIFwiNTIyMjI2XCI6IFwi5Y2w5rGf5Zyf5a625peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMjIyN1wiOiBcIuW+t+axn+WOv1wiLFxuXHQgICAgXCI1MjIyMjhcIjogXCLmsr/msrPlnJ/lrrbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIyMjI5XCI6IFwi5p2+5qGD6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMjIzMFwiOiBcIuS4h+WxseWMulwiLFxuXHQgICAgXCI1MjIyMzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIyMzAwXCI6IFwi6buU6KW/5Y2X5biD5L6d5peP6IuX5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUyMjMwMVwiOiBcIuWFtOS5ieW4glwiLFxuXHQgICAgXCI1MjIzMjJcIjogXCLlhbTku4Hljr9cIixcblx0ICAgIFwiNTIyMzIzXCI6IFwi5pmu5a6J5Y6/XCIsXG5cdCAgICBcIjUyMjMyNFwiOiBcIuaZtOmahuWOv1wiLFxuXHQgICAgXCI1MjIzMjVcIjogXCLotJ7kuLDljr9cIixcblx0ICAgIFwiNTIyMzI2XCI6IFwi5pyb6LCf5Y6/XCIsXG5cdCAgICBcIjUyMjMyN1wiOiBcIuWGjOS6qOWOv1wiLFxuXHQgICAgXCI1MjIzMjhcIjogXCLlronpvpnljr9cIixcblx0ICAgIFwiNTIyMzI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMjQwMFwiOiBcIuavleiKguW4glwiLFxuXHQgICAgXCI1MjI0MDFcIjogXCLkuIPmmJ/lhbPljLpcIixcblx0ICAgIFwiNTIyNDIyXCI6IFwi5aSn5pa55Y6/XCIsXG5cdCAgICBcIjUyMjQyM1wiOiBcIum7lOilv+WOv1wiLFxuXHQgICAgXCI1MjI0MjRcIjogXCLph5Hmspnljr9cIixcblx0ICAgIFwiNTIyNDI1XCI6IFwi57uH6YeR5Y6/XCIsXG5cdCAgICBcIjUyMjQyNlwiOiBcIue6s+mbjeWOv1wiLFxuXHQgICAgXCI1MjI0MjdcIjogXCLlqIHlroHlvZ3ml4/lm57ml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIyNDI4XCI6IFwi6LWr56ug5Y6/XCIsXG5cdCAgICBcIjUyMjQyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjI2MDBcIjogXCLpu5TkuJzljZfoi5fml4/kvpfml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTIyNjAxXCI6IFwi5Yev6YeM5biCXCIsXG5cdCAgICBcIjUyMjYyMlwiOiBcIum7hOW5s+WOv1wiLFxuXHQgICAgXCI1MjI2MjNcIjogXCLmlr3np4nljr9cIixcblx0ICAgIFwiNTIyNjI0XCI6IFwi5LiJ56mX5Y6/XCIsXG5cdCAgICBcIjUyMjYyNVwiOiBcIumVh+i/nOWOv1wiLFxuXHQgICAgXCI1MjI2MjZcIjogXCLlspHlt6nljr9cIixcblx0ICAgIFwiNTIyNjI3XCI6IFwi5aSp5p+x5Y6/XCIsXG5cdCAgICBcIjUyMjYyOFwiOiBcIumUpuWxj+WOv1wiLFxuXHQgICAgXCI1MjI2MjlcIjogXCLliZHmsrPljr9cIixcblx0ICAgIFwiNTIyNjMwXCI6IFwi5Y+w5rGf5Y6/XCIsXG5cdCAgICBcIjUyMjYzMVwiOiBcIum7juW5s+WOv1wiLFxuXHQgICAgXCI1MjI2MzJcIjogXCLmppXmsZ/ljr9cIixcblx0ICAgIFwiNTIyNjMzXCI6IFwi5LuO5rGf5Y6/XCIsXG5cdCAgICBcIjUyMjYzNFwiOiBcIumbt+WxseWOv1wiLFxuXHQgICAgXCI1MjI2MzVcIjogXCLpurvmsZ/ljr9cIixcblx0ICAgIFwiNTIyNjM2XCI6IFwi5Li55a+o5Y6/XCIsXG5cdCAgICBcIjUyMjYzN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjI3MDBcIjogXCLpu5TljZfluIPkvp3ml4/oi5fml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTIyNzAxXCI6IFwi6YO95YyA5biCXCIsXG5cdCAgICBcIjUyMjcwMlwiOiBcIuemj+azieW4glwiLFxuXHQgICAgXCI1MjI3MjJcIjogXCLojZTms6Lljr9cIixcblx0ICAgIFwiNTIyNzIzXCI6IFwi6LS15a6a5Y6/XCIsXG5cdCAgICBcIjUyMjcyNVwiOiBcIueTruWuieWOv1wiLFxuXHQgICAgXCI1MjI3MjZcIjogXCLni6zlsbHljr9cIixcblx0ICAgIFwiNTIyNzI3XCI6IFwi5bmz5aGY5Y6/XCIsXG5cdCAgICBcIjUyMjcyOFwiOiBcIue9l+eUuOWOv1wiLFxuXHQgICAgXCI1MjI3MjlcIjogXCLplb/pobrljr9cIixcblx0ICAgIFwiNTIyNzMwXCI6IFwi6b6Z6YeM5Y6/XCIsXG5cdCAgICBcIjUyMjczMVwiOiBcIuaDoOawtOWOv1wiLFxuXHQgICAgXCI1MjI3MzJcIjogXCLkuInpg73msLTml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIyNzMzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDAwMFwiOiBcIuS6keWNl+ecgVwiLFxuXHQgICAgXCI1MzAxMDBcIjogXCLmmIbmmI7luIJcIixcblx0ICAgIFwiNTMwMTAyXCI6IFwi5LqU5Y2O5Yy6XCIsXG5cdCAgICBcIjUzMDEwM1wiOiBcIuebmOm+meWMulwiLFxuXHQgICAgXCI1MzAxMTFcIjogXCLlrpjmuKHljLpcIixcblx0ICAgIFwiNTMwMTEyXCI6IFwi6KW/5bGx5Yy6XCIsXG5cdCAgICBcIjUzMDExM1wiOiBcIuS4nOW3neWMulwiLFxuXHQgICAgXCI1MzAxMjFcIjogXCLlkYjotKHljLpcIixcblx0ICAgIFwiNTMwMTIyXCI6IFwi5pmL5a6B5Y6/XCIsXG5cdCAgICBcIjUzMDEyNFwiOiBcIuWvjOawkeWOv1wiLFxuXHQgICAgXCI1MzAxMjVcIjogXCLlrpzoia/ljr9cIixcblx0ICAgIFwiNTMwMTI2XCI6IFwi55+z5p6X5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDEyN1wiOiBcIuW1qeaYjuWOv1wiLFxuXHQgICAgXCI1MzAxMjhcIjogXCLnpoTlip3lvZ3ml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwMTI5XCI6IFwi5a+755S45Zue5peP5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDE4MVwiOiBcIuWuieWugeW4glwiLFxuXHQgICAgXCI1MzAxODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwMzAwXCI6IFwi5puy6Z2W5biCXCIsXG5cdCAgICBcIjUzMDMwMlwiOiBcIum6kum6n+WMulwiLFxuXHQgICAgXCI1MzAzMjFcIjogXCLpqazpvpnljr9cIixcblx0ICAgIFwiNTMwMzIyXCI6IFwi6ZmG6Imv5Y6/XCIsXG5cdCAgICBcIjUzMDMyM1wiOiBcIuW4iOWul+WOv1wiLFxuXHQgICAgXCI1MzAzMjRcIjogXCLnvZflubPljr9cIixcblx0ICAgIFwiNTMwMzI1XCI6IFwi5a+M5rqQ5Y6/XCIsXG5cdCAgICBcIjUzMDMyNlwiOiBcIuS8muazveWOv1wiLFxuXHQgICAgXCI1MzAzMjhcIjogXCLmsr7nm4rljr9cIixcblx0ICAgIFwiNTMwMzgxXCI6IFwi5a6j5aiB5biCXCIsXG5cdCAgICBcIjUzMDM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzA0MDBcIjogXCLnjonmuqrluIJcIixcblx0ICAgIFwiNTMwNDAyXCI6IFwi57qi5aGU5Yy6XCIsXG5cdCAgICBcIjUzMDQyMVwiOiBcIuaxn+W3neWOv1wiLFxuXHQgICAgXCI1MzA0MjJcIjogXCLmvoTmsZ/ljr9cIixcblx0ICAgIFwiNTMwNDIzXCI6IFwi6YCa5rW35Y6/XCIsXG5cdCAgICBcIjUzMDQyNFwiOiBcIuWNjuWugeWOv1wiLFxuXHQgICAgXCI1MzA0MjVcIjogXCLmmJPpl6jljr9cIixcblx0ICAgIFwiNTMwNDI2XCI6IFwi5bOo5bGx5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDQyN1wiOiBcIuaWsOW5s+W9neaXj+WCo+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA0MjhcIjogXCLlhYPmsZ/lk4jlsLzml4/lvZ3ml4/lgqPml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwNDI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDUwMFwiOiBcIuS/neWxseW4glwiLFxuXHQgICAgXCI1MzA1MDJcIjogXCLpmobpmLPljLpcIixcblx0ICAgIFwiNTMwNTIxXCI6IFwi5pa955S45Y6/XCIsXG5cdCAgICBcIjUzMDUyMlwiOiBcIuiFvuWGsuWOv1wiLFxuXHQgICAgXCI1MzA1MjNcIjogXCLpvpnpmbXljr9cIixcblx0ICAgIFwiNTMwNTI0XCI6IFwi5piM5a6B5Y6/XCIsXG5cdCAgICBcIjUzMDUyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzA2MDBcIjogXCLmmK3pgJrluIJcIixcblx0ICAgIFwiNTMwNjAyXCI6IFwi5pit6Ziz5Yy6XCIsXG5cdCAgICBcIjUzMDYyMVwiOiBcIumygeeUuOWOv1wiLFxuXHQgICAgXCI1MzA2MjJcIjogXCLlt6flrrbljr9cIixcblx0ICAgIFwiNTMwNjIzXCI6IFwi55uQ5rSl5Y6/XCIsXG5cdCAgICBcIjUzMDYyNFwiOiBcIuWkp+WFs+WOv1wiLFxuXHQgICAgXCI1MzA2MjVcIjogXCLmsLjlloTljr9cIixcblx0ICAgIFwiNTMwNjI2XCI6IFwi57ul5rGf5Y6/XCIsXG5cdCAgICBcIjUzMDYyN1wiOiBcIumVh+mbhOWOv1wiLFxuXHQgICAgXCI1MzA2MjhcIjogXCLlvZ3oia/ljr9cIixcblx0ICAgIFwiNTMwNjI5XCI6IFwi5aiB5L+h5Y6/XCIsXG5cdCAgICBcIjUzMDYzMFwiOiBcIuawtOWvjOWOv1wiLFxuXHQgICAgXCI1MzA2MzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwNzAwXCI6IFwi5Li95rGf5biCXCIsXG5cdCAgICBcIjUzMDcwMlwiOiBcIuWPpOWfjuWMulwiLFxuXHQgICAgXCI1MzA3MjFcIjogXCLnjonpvpnnurPopb/ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwNzIyXCI6IFwi5rC46IOc5Y6/XCIsXG5cdCAgICBcIjUzMDcyM1wiOiBcIuWNjuWdquWOv1wiLFxuXHQgICAgXCI1MzA3MjRcIjogXCLlroHokpflvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwNzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDgwMFwiOiBcIuaZrua0seW4glwiLFxuXHQgICAgXCI1MzA4MDJcIjogXCLmgJ3ojIXljLpcIixcblx0ICAgIFwiNTMwODIxXCI6IFwi5a6B5rSx5ZOI5bC85peP5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyMlwiOiBcIuWiqOaxn+WTiOWwvOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjNcIjogXCLmma/kuJzlvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODI0XCI6IFwi5pmv6LC35YKj5peP5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyNVwiOiBcIumVh+ayheW9neaXj+WTiOWwvOaXj+aLieelnOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjZcIjogXCLmsZ/ln47lk4jlsLzml4/lvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODI3XCI6IFwi5a2f6L+e5YKj5peP5ouJ56Wc5peP5L2k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyOFwiOiBcIua+nOayp+aLieelnOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjlcIjogXCLopb/nm5/kvaTml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDkwMFwiOiBcIuS4tOayp+W4glwiLFxuXHQgICAgXCI1MzA5MDJcIjogXCLkuLTnv5TljLpcIixcblx0ICAgIFwiNTMwOTIxXCI6IFwi5Yek5bqG5Y6/XCIsXG5cdCAgICBcIjUzMDkyMlwiOiBcIuS6keWOv1wiLFxuXHQgICAgXCI1MzA5MjNcIjogXCLmsLjlvrfljr9cIixcblx0ICAgIFwiNTMwOTI0XCI6IFwi6ZWH5bq35Y6/XCIsXG5cdCAgICBcIjUzMDkyNVwiOiBcIuWPjOaxn+aLieelnOaXj+S9pOaXj+W4g+acl+aXj+WCo+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA5MjZcIjogXCLogL/pqazlgqPml4/kvaTml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwOTI3XCI6IFwi5rKn5rqQ5L2k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDkyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzIzMDBcIjogXCLmpZrpm4TlvZ3ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMyMzAxXCI6IFwi5qWa6ZuE5biCXCIsXG5cdCAgICBcIjUzMjMyMlwiOiBcIuWPjOafj+WOv1wiLFxuXHQgICAgXCI1MzIzMjNcIjogXCLniZ/lrprljr9cIixcblx0ICAgIFwiNTMyMzI0XCI6IFwi5Y2X5Y2O5Y6/XCIsXG5cdCAgICBcIjUzMjMyNVwiOiBcIuWnmuWuieWOv1wiLFxuXHQgICAgXCI1MzIzMjZcIjogXCLlpKflp5rljr9cIixcblx0ICAgIFwiNTMyMzI3XCI6IFwi5rC45LuB5Y6/XCIsXG5cdCAgICBcIjUzMjMyOFwiOiBcIuWFg+iwi+WOv1wiLFxuXHQgICAgXCI1MzIzMjlcIjogXCLmrablrprljr9cIixcblx0ICAgIFwiNTMyMzMxXCI6IFwi56aE5Liw5Y6/XCIsXG5cdCAgICBcIjUzMjMzMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzI1MDBcIjogXCLnuqLmsrPlk4jlsLzml4/lvZ3ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMyNTAxXCI6IFwi5Liq5pen5biCXCIsXG5cdCAgICBcIjUzMjUwMlwiOiBcIuW8gOi/nOW4glwiLFxuXHQgICAgXCI1MzI1MjJcIjogXCLokpnoh6rluIJcIixcblx0ICAgIFwiNTMyNTIzXCI6IFwi5bGP6L656IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMjUyNFwiOiBcIuW7uuawtOWOv1wiLFxuXHQgICAgXCI1MzI1MjVcIjogXCLnn7PlsY/ljr9cIixcblx0ICAgIFwiNTMyNTI2XCI6IFwi5byl5YuS5biCXCIsXG5cdCAgICBcIjUzMjUyN1wiOiBcIuazuOilv+WOv1wiLFxuXHQgICAgXCI1MzI1MjhcIjogXCLlhYPpmLPljr9cIixcblx0ICAgIFwiNTMyNTI5XCI6IFwi57qi5rKz5Y6/XCIsXG5cdCAgICBcIjUzMjUzMFwiOiBcIumHkeW5s+iLl+aXj+eRtuaXj+WCo+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzI1MzFcIjogXCLnu7/mmKXljr9cIixcblx0ICAgIFwiNTMyNTMyXCI6IFwi5rKz5Y+j55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMjUzM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzI2MDBcIjogXCLmloflsbHlo67ml4/oi5fml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMyNjIxXCI6IFwi5paH5bGx5biCXCIsXG5cdCAgICBcIjUzMjYyMlwiOiBcIuegmuWxseWOv1wiLFxuXHQgICAgXCI1MzI2MjNcIjogXCLopb/nlbTljr9cIixcblx0ICAgIFwiNTMyNjI0XCI6IFwi6bq75qCX5Z2h5Y6/XCIsXG5cdCAgICBcIjUzMjYyNVwiOiBcIumprOWFs+WOv1wiLFxuXHQgICAgXCI1MzI2MjZcIjogXCLkuJjljJfljr9cIixcblx0ICAgIFwiNTMyNjI3XCI6IFwi5bm/5Y2X5Y6/XCIsXG5cdCAgICBcIjUzMjYyOFwiOiBcIuWvjOWugeWOv1wiLFxuXHQgICAgXCI1MzI2MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMyODAwXCI6IFwi6KW/5Y+M54mI57qz5YKj5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMjgwMVwiOiBcIuaZr+a0quW4glwiLFxuXHQgICAgXCI1MzI4MjJcIjogXCLli5Dmtbfljr9cIixcblx0ICAgIFwiNTMyODIzXCI6IFwi5YuQ6IWK5Y6/XCIsXG5cdCAgICBcIjUzMjgyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzI5MDBcIjogXCLlpKfnkIbnmb3ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMyOTAxXCI6IFwi5aSn55CG5biCXCIsXG5cdCAgICBcIjUzMjkyMlwiOiBcIua8vua/nuW9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzI5MjNcIjogXCLnpaXkupHljr9cIixcblx0ICAgIFwiNTMyOTI0XCI6IFwi5a6+5bed5Y6/XCIsXG5cdCAgICBcIjUzMjkyNVwiOiBcIuW8pea4oeWOv1wiLFxuXHQgICAgXCI1MzI5MjZcIjogXCLljZfmtqflvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMyOTI3XCI6IFwi5beN5bGx5b2d5peP5Zue5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMjkyOFwiOiBcIuawuOW5s+WOv1wiLFxuXHQgICAgXCI1MzI5MjlcIjogXCLkupHpvpnljr9cIixcblx0ICAgIFwiNTMyOTMwXCI6IFwi5rSx5rqQ5Y6/XCIsXG5cdCAgICBcIjUzMjkzMVwiOiBcIuWJkeW3neWOv1wiLFxuXHQgICAgXCI1MzI5MzJcIjogXCLpuaTluobljr9cIixcblx0ICAgIFwiNTMyOTMzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMzEwMFwiOiBcIuW+t+Wuj+WCo+aXj+aZr+mih+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzMxMDJcIjogXCLnkZ7kuL3luIJcIixcblx0ICAgIFwiNTMzMTAzXCI6IFwi6IqS5biCXCIsXG5cdCAgICBcIjUzMzEyMlwiOiBcIuaigeays+WOv1wiLFxuXHQgICAgXCI1MzMxMjNcIjogXCLnm4jmsZ/ljr9cIixcblx0ICAgIFwiNTMzMTI0XCI6IFwi6ZmH5bed5Y6/XCIsXG5cdCAgICBcIjUzMzEyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzMzMDBcIjogXCLmgJLmsZ/lgojlg7Pml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMzMzIxXCI6IFwi5rO45rC05Y6/XCIsXG5cdCAgICBcIjUzMzMyM1wiOiBcIuemj+i0oeWOv1wiLFxuXHQgICAgXCI1MzMzMjRcIjogXCLotKHlsbHni6zpvpnml4/mgJLml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMzMzI1XCI6IFwi5YWw5Z2q55m95peP5pmu57Gz5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMzMyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzM0MDBcIjogXCLov6rluobol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMzNDIxXCI6IFwi6aaZ5qC86YeM5ouJ5Y6/XCIsXG5cdCAgICBcIjUzMzQyMlwiOiBcIuW+t+mSpuWOv1wiLFxuXHQgICAgXCI1MzM0MjNcIjogXCLnu7Topb/lgojlg7Pml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMzNDI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjU0MDAwMFwiOiBcIuilv+iXj+iHquayu+WMulwiLFxuXHQgICAgXCI1NDAxMDBcIjogXCLmi4nokKjluIJcIixcblx0ICAgIFwiNTQwMTAyXCI6IFwi5Z+O5YWz5Yy6XCIsXG5cdCAgICBcIjU0MDEyMVwiOiBcIuael+WRqOWOv1wiLFxuXHQgICAgXCI1NDAxMjJcIjogXCLlvZPpm4Tljr9cIixcblx0ICAgIFwiNTQwMTIzXCI6IFwi5bC85pyo5Y6/XCIsXG5cdCAgICBcIjU0MDEyNFwiOiBcIuabsuawtOWOv1wiLFxuXHQgICAgXCI1NDAxMjVcIjogXCLloIbpvpnlvrfluobljr9cIixcblx0ICAgIFwiNTQwMTI2XCI6IFwi6L6+5a2c5Y6/XCIsXG5cdCAgICBcIjU0MDEyN1wiOiBcIuWiqOerueW3peWNoeWOv1wiLFxuXHQgICAgXCI1NDAxMjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTQyMTAwXCI6IFwi5piM6YO95Zyw5Yy6XCIsXG5cdCAgICBcIjU0MjEyMVwiOiBcIuaYjOmDveWOv1wiLFxuXHQgICAgXCI1NDIxMjJcIjogXCLmsZ/ovr7ljr9cIixcblx0ICAgIFwiNTQyMTIzXCI6IFwi6LSh6KeJ5Y6/XCIsXG5cdCAgICBcIjU0MjEyNFwiOiBcIuexu+S5jOm9kOWOv1wiLFxuXHQgICAgXCI1NDIxMjVcIjogXCLkuIHpnZLljr9cIixcblx0ICAgIFwiNTQyMTI2XCI6IFwi5a+f6ZuF5Y6/XCIsXG5cdCAgICBcIjU0MjEyN1wiOiBcIuWFq+Wuv+WOv1wiLFxuXHQgICAgXCI1NDIxMjhcIjogXCLlt6botKHljr9cIixcblx0ICAgIFwiNTQyMTI5XCI6IFwi6IqS5bq35Y6/XCIsXG5cdCAgICBcIjU0MjEzMlwiOiBcIua0m+mahuWOv1wiLFxuXHQgICAgXCI1NDIxMzNcIjogXCLovrnlnZ3ljr9cIixcblx0ICAgIFwiNTQyMTM0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjU0MjIwMFwiOiBcIuWxseWNl+WcsOWMulwiLFxuXHQgICAgXCI1NDIyMjFcIjogXCLkuYPkuJzljr9cIixcblx0ICAgIFwiNTQyMjIyXCI6IFwi5omO5ZuK5Y6/XCIsXG5cdCAgICBcIjU0MjIyM1wiOiBcIui0oeWYjuWOv1wiLFxuXHQgICAgXCI1NDIyMjRcIjogXCLmoZHml6Xljr9cIixcblx0ICAgIFwiNTQyMjI1XCI6IFwi55C857uT5Y6/XCIsXG5cdCAgICBcIjU0MjIyNlwiOiBcIuabsuadvuWOv1wiLFxuXHQgICAgXCI1NDIyMjdcIjogXCLmjqrnvo7ljr9cIixcblx0ICAgIFwiNTQyMjI4XCI6IFwi5rSb5omO5Y6/XCIsXG5cdCAgICBcIjU0MjIyOVwiOiBcIuWKoOafpeWOv1wiLFxuXHQgICAgXCI1NDIyMzFcIjogXCLpmoblrZDljr9cIixcblx0ICAgIFwiNTQyMjMyXCI6IFwi6ZSZ6YKj5Y6/XCIsXG5cdCAgICBcIjU0MjIzM1wiOiBcIua1quWNoeWtkOWOv1wiLFxuXHQgICAgXCI1NDIyMzRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTQyMzAwXCI6IFwi5pel5ZaA5YiZ5Zyw5Yy6XCIsXG5cdCAgICBcIjU0MjMwMVwiOiBcIuaXpeWWgOWImeW4glwiLFxuXHQgICAgXCI1NDIzMjJcIjogXCLljZfmnKjmnpfljr9cIixcblx0ICAgIFwiNTQyMzIzXCI6IFwi5rGf5a2c5Y6/XCIsXG5cdCAgICBcIjU0MjMyNFwiOiBcIuWumuaXpeWOv1wiLFxuXHQgICAgXCI1NDIzMjVcIjogXCLokKjov6bljr9cIixcblx0ICAgIFwiNTQyMzI2XCI6IFwi5ouJ5a2c5Y6/XCIsXG5cdCAgICBcIjU0MjMyN1wiOiBcIuaYguS7geWOv1wiLFxuXHQgICAgXCI1NDIzMjhcIjogXCLosKLpgJrpl6jljr9cIixcblx0ICAgIFwiNTQyMzI5XCI6IFwi55m95pyX5Y6/XCIsXG5cdCAgICBcIjU0MjMzMFwiOiBcIuS7geW4g+WOv1wiLFxuXHQgICAgXCI1NDIzMzFcIjogXCLlurfpqazljr9cIixcblx0ICAgIFwiNTQyMzMyXCI6IFwi5a6a57uT5Y6/XCIsXG5cdCAgICBcIjU0MjMzM1wiOiBcIuS7suW3tOWOv1wiLFxuXHQgICAgXCI1NDIzMzRcIjogXCLkuprkuJzljr9cIixcblx0ICAgIFwiNTQyMzM1XCI6IFwi5ZCJ6ZqG5Y6/XCIsXG5cdCAgICBcIjU0MjMzNlwiOiBcIuiBguaLieacqOWOv1wiLFxuXHQgICAgXCI1NDIzMzdcIjogXCLokKjlmI7ljr9cIixcblx0ICAgIFwiNTQyMzM4XCI6IFwi5bKX5be05Y6/XCIsXG5cdCAgICBcIjU0MjMzOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1NDI0MDBcIjogXCLpgqPmm7LlnLDljLpcIixcblx0ICAgIFwiNTQyNDIxXCI6IFwi6YKj5puy5Y6/XCIsXG5cdCAgICBcIjU0MjQyMlwiOiBcIuWYiem7juWOv1wiLFxuXHQgICAgXCI1NDI0MjNcIjogXCLmr5TlpoLljr9cIixcblx0ICAgIFwiNTQyNDI0XCI6IFwi6IGC6I2j5Y6/XCIsXG5cdCAgICBcIjU0MjQyNVwiOiBcIuWuieWkmuWOv1wiLFxuXHQgICAgXCI1NDI0MjZcIjogXCLnlLPmiY7ljr9cIixcblx0ICAgIFwiNTQyNDI3XCI6IFwi57Si5Y6/XCIsXG5cdCAgICBcIjU0MjQyOFwiOiBcIuePreaIiOWOv1wiLFxuXHQgICAgXCI1NDI0MjlcIjogXCLlt7TpnZLljr9cIixcblx0ICAgIFwiNTQyNDMwXCI6IFwi5bC8546b5Y6/XCIsXG5cdCAgICBcIjU0MjQzMVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1NDI0MzJcIjogXCLlj4zmuZbljr9cIixcblx0ICAgIFwiNTQyNTAwXCI6IFwi6Zi/6YeM5Zyw5Yy6XCIsXG5cdCAgICBcIjU0MjUyMVwiOiBcIuaZruWFsOWOv1wiLFxuXHQgICAgXCI1NDI1MjJcIjogXCLmnK3ovr7ljr9cIixcblx0ICAgIFwiNTQyNTIzXCI6IFwi5Zm25bCU5Y6/XCIsXG5cdCAgICBcIjU0MjUyNFwiOiBcIuaXpeWcn+WOv1wiLFxuXHQgICAgXCI1NDI1MjVcIjogXCLpnanlkInljr9cIixcblx0ICAgIFwiNTQyNTI2XCI6IFwi5pS55YiZ5Y6/XCIsXG5cdCAgICBcIjU0MjUyN1wiOiBcIuaOquWLpOWOv1wiLFxuXHQgICAgXCI1NDI1MjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTQyNjAwXCI6IFwi5p6X6Iqd5Zyw5Yy6XCIsXG5cdCAgICBcIjU0MjYyMVwiOiBcIuael+iKneWOv1wiLFxuXHQgICAgXCI1NDI2MjJcIjogXCLlt6XluIPmsZ/ovr7ljr9cIixcblx0ICAgIFwiNTQyNjIzXCI6IFwi57Gz5p6X5Y6/XCIsXG5cdCAgICBcIjU0MjYyNFwiOiBcIuWiqOiEseWOv1wiLFxuXHQgICAgXCI1NDI2MjVcIjogXCLms6Llr4bljr9cIixcblx0ICAgIFwiNTQyNjI2XCI6IFwi5a+f6ZqF5Y6/XCIsXG5cdCAgICBcIjU0MjYyN1wiOiBcIuacl+WOv1wiLFxuXHQgICAgXCI1NDI2MjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwMDAwXCI6IFwi6ZmV6KW/55yBXCIsXG5cdCAgICBcIjYxMDEwMFwiOiBcIuilv+WuieW4glwiLFxuXHQgICAgXCI2MTAxMDJcIjogXCLmlrDln47ljLpcIixcblx0ICAgIFwiNjEwMTAzXCI6IFwi56KR5p6X5Yy6XCIsXG5cdCAgICBcIjYxMDEwNFwiOiBcIuiOsua5luWMulwiLFxuXHQgICAgXCI2MTAxMTFcIjogXCLngZ7moaXljLpcIixcblx0ICAgIFwiNjEwMTEyXCI6IFwi5pyq5aSu5Yy6XCIsXG5cdCAgICBcIjYxMDExM1wiOiBcIumbgeWhlOWMulwiLFxuXHQgICAgXCI2MTAxMTRcIjogXCLpmI7oia/ljLpcIixcblx0ICAgIFwiNjEwMTE1XCI6IFwi5Li05r285Yy6XCIsXG5cdCAgICBcIjYxMDExNlwiOiBcIumVv+WuieWMulwiLFxuXHQgICAgXCI2MTAxMjJcIjogXCLok53nlLDljr9cIixcblx0ICAgIFwiNjEwMTI0XCI6IFwi5ZGo6Iez5Y6/XCIsXG5cdCAgICBcIjYxMDEyNVwiOiBcIuaIt+WOv1wiLFxuXHQgICAgXCI2MTAxMjZcIjogXCLpq5jpmbXljr9cIixcblx0ICAgIFwiNjEwMTI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDIwMFwiOiBcIumTnOW3neW4glwiLFxuXHQgICAgXCI2MTAyMDJcIjogXCLnjovnm4rljLpcIixcblx0ICAgIFwiNjEwMjAzXCI6IFwi5Y2w5Y+w5Yy6XCIsXG5cdCAgICBcIjYxMDIwNFwiOiBcIuiAgOW3nuWMulwiLFxuXHQgICAgXCI2MTAyMjJcIjogXCLlrpzlkJvljr9cIixcblx0ICAgIFwiNjEwMjIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDMwMFwiOiBcIuWunem4oeW4glwiLFxuXHQgICAgXCI2MTAzMDJcIjogXCLmuK3mu6jljLpcIixcblx0ICAgIFwiNjEwMzAzXCI6IFwi6YeR5Y+w5Yy6XCIsXG5cdCAgICBcIjYxMDMwNFwiOiBcIumZiOS7k+WMulwiLFxuXHQgICAgXCI2MTAzMjJcIjogXCLlh6Tnv5Tljr9cIixcblx0ICAgIFwiNjEwMzIzXCI6IFwi5bKQ5bGx5Y6/XCIsXG5cdCAgICBcIjYxMDMyNFwiOiBcIuaJtumjjuWOv1wiLFxuXHQgICAgXCI2MTAzMjZcIjogXCLnnInljr9cIixcblx0ICAgIFwiNjEwMzI3XCI6IFwi6ZmH5Y6/XCIsXG5cdCAgICBcIjYxMDMyOFwiOiBcIuWNg+mYs+WOv1wiLFxuXHQgICAgXCI2MTAzMjlcIjogXCLpup/muLjljr9cIixcblx0ICAgIFwiNjEwMzMwXCI6IFwi5Yek5Y6/XCIsXG5cdCAgICBcIjYxMDMzMVwiOiBcIuWkqueZveWOv1wiLFxuXHQgICAgXCI2MTAzMzJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwNDAwXCI6IFwi5ZK46Ziz5biCXCIsXG5cdCAgICBcIjYxMDQwMlwiOiBcIuenpumDveWMulwiLFxuXHQgICAgXCI2MTA0MDNcIjogXCLmnajpmbXljLpcIixcblx0ICAgIFwiNjEwNDA0XCI6IFwi5rit5Z+O5Yy6XCIsXG5cdCAgICBcIjYxMDQyMlwiOiBcIuS4ieWOn+WOv1wiLFxuXHQgICAgXCI2MTA0MjNcIjogXCLms77pmLPljr9cIixcblx0ICAgIFwiNjEwNDI0XCI6IFwi5Lm+5Y6/XCIsXG5cdCAgICBcIjYxMDQyNVwiOiBcIuekvOazieWOv1wiLFxuXHQgICAgXCI2MTA0MjZcIjogXCLmsLjlr7/ljr9cIixcblx0ICAgIFwiNjEwNDI3XCI6IFwi5b2s5Y6/XCIsXG5cdCAgICBcIjYxMDQyOFwiOiBcIumVv+atpuWOv1wiLFxuXHQgICAgXCI2MTA0MjlcIjogXCLml6zpgpHljr9cIixcblx0ICAgIFwiNjEwNDMwXCI6IFwi5rez5YyW5Y6/XCIsXG5cdCAgICBcIjYxMDQzMVwiOiBcIuatpuWKn+WOv1wiLFxuXHQgICAgXCI2MTA0ODFcIjogXCLlhbTlubPluIJcIixcblx0ICAgIFwiNjEwNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDUwMFwiOiBcIua4reWNl+W4glwiLFxuXHQgICAgXCI2MTA1MDJcIjogXCLkuLTmuK3ljLpcIixcblx0ICAgIFwiNjEwNTIxXCI6IFwi5Y2O5Y6/XCIsXG5cdCAgICBcIjYxMDUyMlwiOiBcIua9vOWFs+WOv1wiLFxuXHQgICAgXCI2MTA1MjNcIjogXCLlpKfojZTljr9cIixcblx0ICAgIFwiNjEwNTI0XCI6IFwi5ZCI6Ziz5Y6/XCIsXG5cdCAgICBcIjYxMDUyNVwiOiBcIua+hOWfjuWOv1wiLFxuXHQgICAgXCI2MTA1MjZcIjogXCLokrLln47ljr9cIixcblx0ICAgIFwiNjEwNTI3XCI6IFwi55m95rC05Y6/XCIsXG5cdCAgICBcIjYxMDUyOFwiOiBcIuWvjOW5s+WOv1wiLFxuXHQgICAgXCI2MTA1ODFcIjogXCLpn6nln47luIJcIixcblx0ICAgIFwiNjEwNTgyXCI6IFwi5Y2O6Zi05biCXCIsXG5cdCAgICBcIjYxMDU4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTA2MDBcIjogXCLlu7blronluIJcIixcblx0ICAgIFwiNjEwNjAyXCI6IFwi5a6d5aGU5Yy6XCIsXG5cdCAgICBcIjYxMDYyMVwiOiBcIuW7tumVv+WOv1wiLFxuXHQgICAgXCI2MTA2MjJcIjogXCLlu7blt53ljr9cIixcblx0ICAgIFwiNjEwNjIzXCI6IFwi5a2Q6ZW/5Y6/XCIsXG5cdCAgICBcIjYxMDYyNFwiOiBcIuWuieWhnuWOv1wiLFxuXHQgICAgXCI2MTA2MjVcIjogXCLlv5fkuLnljr9cIixcblx0ICAgIFwiNjEwNjI2XCI6IFwi5ZC06LW35Y6/XCIsXG5cdCAgICBcIjYxMDYyN1wiOiBcIueUmOazieWOv1wiLFxuXHQgICAgXCI2MTA2MjhcIjogXCLlr4zljr9cIixcblx0ICAgIFwiNjEwNjI5XCI6IFwi5rSb5bed5Y6/XCIsXG5cdCAgICBcIjYxMDYzMFwiOiBcIuWunOW3neWOv1wiLFxuXHQgICAgXCI2MTA2MzFcIjogXCLpu4Tpvpnljr9cIixcblx0ICAgIFwiNjEwNjMyXCI6IFwi6buE6Zm15Y6/XCIsXG5cdCAgICBcIjYxMDYzM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTA3MDBcIjogXCLmsYnkuK3luIJcIixcblx0ICAgIFwiNjEwNzAyXCI6IFwi5rGJ5Y+w5Yy6XCIsXG5cdCAgICBcIjYxMDcyMVwiOiBcIuWNl+mDkeWOv1wiLFxuXHQgICAgXCI2MTA3MjJcIjogXCLln47lm7rljr9cIixcblx0ICAgIFwiNjEwNzIzXCI6IFwi5rSL5Y6/XCIsXG5cdCAgICBcIjYxMDcyNFwiOiBcIuilv+S5oeWOv1wiLFxuXHQgICAgXCI2MTA3MjVcIjogXCLli4nljr9cIixcblx0ICAgIFwiNjEwNzI2XCI6IFwi5a6B5by65Y6/XCIsXG5cdCAgICBcIjYxMDcyN1wiOiBcIueVpemYs+WOv1wiLFxuXHQgICAgXCI2MTA3MjhcIjogXCLplYflt7Tljr9cIixcblx0ICAgIFwiNjEwNzI5XCI6IFwi55WZ5Z2d5Y6/XCIsXG5cdCAgICBcIjYxMDczMFwiOiBcIuS9m+WdquWOv1wiLFxuXHQgICAgXCI2MTA3MzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwODAwXCI6IFwi5qaG5p6X5biCXCIsXG5cdCAgICBcIjYxMDgwMlwiOiBcIuamhumYs+WMulwiLFxuXHQgICAgXCI2MTA4MjFcIjogXCLnpZ7mnKjljr9cIixcblx0ICAgIFwiNjEwODIyXCI6IFwi5bqc6LC35Y6/XCIsXG5cdCAgICBcIjYxMDgyM1wiOiBcIuaoquWxseWOv1wiLFxuXHQgICAgXCI2MTA4MjRcIjogXCLpnZbovrnljr9cIixcblx0ICAgIFwiNjEwODI1XCI6IFwi5a6a6L655Y6/XCIsXG5cdCAgICBcIjYxMDgyNlwiOiBcIue7peW+t+WOv1wiLFxuXHQgICAgXCI2MTA4MjdcIjogXCLnsbPohILljr9cIixcblx0ICAgIFwiNjEwODI4XCI6IFwi5L2z5Y6/XCIsXG5cdCAgICBcIjYxMDgyOVwiOiBcIuWQtOWgoeWOv1wiLFxuXHQgICAgXCI2MTA4MzBcIjogXCLmuIXmtqfljr9cIixcblx0ICAgIFwiNjEwODMxXCI6IFwi5a2Q5rSy5Y6/XCIsXG5cdCAgICBcIjYxMDgzMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTA5MDBcIjogXCLlronlurfluIJcIixcblx0ICAgIFwiNjEwOTAyXCI6IFwi5rGJ5ruo5Yy6XCIsXG5cdCAgICBcIjYxMDkyMVwiOiBcIuaxiemYtOWOv1wiLFxuXHQgICAgXCI2MTA5MjJcIjogXCLnn7Pms4nljr9cIixcblx0ICAgIFwiNjEwOTIzXCI6IFwi5a6B6ZmV5Y6/XCIsXG5cdCAgICBcIjYxMDkyNFwiOiBcIue0q+mYs+WOv1wiLFxuXHQgICAgXCI2MTA5MjVcIjogXCLlsprnmovljr9cIixcblx0ICAgIFwiNjEwOTI2XCI6IFwi5bmz5Yip5Y6/XCIsXG5cdCAgICBcIjYxMDkyN1wiOiBcIumVh+WdquWOv1wiLFxuXHQgICAgXCI2MTA5MjhcIjogXCLml6zpmLPljr9cIixcblx0ICAgIFwiNjEwOTI5XCI6IFwi55m95rKz5Y6/XCIsXG5cdCAgICBcIjYxMDkzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTEwMDBcIjogXCLllYbmtJvluIJcIixcblx0ICAgIFwiNjExMDAyXCI6IFwi5ZWG5bee5Yy6XCIsXG5cdCAgICBcIjYxMTAyMVwiOiBcIua0m+WNl+WOv1wiLFxuXHQgICAgXCI2MTEwMjJcIjogXCLkuLnlh6Tljr9cIixcblx0ICAgIFwiNjExMDIzXCI6IFwi5ZWG5Y2X5Y6/XCIsXG5cdCAgICBcIjYxMTAyNFwiOiBcIuWxsemYs+WOv1wiLFxuXHQgICAgXCI2MTEwMjVcIjogXCLplYflronljr9cIixcblx0ICAgIFwiNjExMDI2XCI6IFwi5p+e5rC05Y6/XCIsXG5cdCAgICBcIjYxMTAyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjAwMDBcIjogXCLnlJjogoPnnIFcIixcblx0ICAgIFwiNjIwMTAwXCI6IFwi5YWw5bee5biCXCIsXG5cdCAgICBcIjYyMDEwMlwiOiBcIuWfjuWFs+WMulwiLFxuXHQgICAgXCI2MjAxMDNcIjogXCLkuIPph4zmsrPljLpcIixcblx0ICAgIFwiNjIwMTA0XCI6IFwi6KW/5Zu65Yy6XCIsXG5cdCAgICBcIjYyMDEwNVwiOiBcIuWuieWugeWMulwiLFxuXHQgICAgXCI2MjAxMTFcIjogXCLnuqLlj6TljLpcIixcblx0ICAgIFwiNjIwMTIxXCI6IFwi5rC455m75Y6/XCIsXG5cdCAgICBcIjYyMDEyMlwiOiBcIueai+WFsOWOv1wiLFxuXHQgICAgXCI2MjAxMjNcIjogXCLmpobkuK3ljr9cIixcblx0ICAgIFwiNjIwMTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDIwMFwiOiBcIuWYieWzquWFs+W4glwiLFxuXHQgICAgXCI2MjAzMDBcIjogXCLph5HmmIzluIJcIixcblx0ICAgIFwiNjIwMzAyXCI6IFwi6YeR5bed5Yy6XCIsXG5cdCAgICBcIjYyMDMyMVwiOiBcIuawuOaYjOWOv1wiLFxuXHQgICAgXCI2MjAzMjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwNDAwXCI6IFwi55m96ZO25biCXCIsXG5cdCAgICBcIjYyMDQwMlwiOiBcIueZvemTtuWMulwiLFxuXHQgICAgXCI2MjA0MDNcIjogXCLlubPlt53ljLpcIixcblx0ICAgIFwiNjIwNDIxXCI6IFwi6Z2W6L+c5Y6/XCIsXG5cdCAgICBcIjYyMDQyMlwiOiBcIuS8muWugeWOv1wiLFxuXHQgICAgXCI2MjA0MjNcIjogXCLmma/ms7Dljr9cIixcblx0ICAgIFwiNjIwNDI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDUwMFwiOiBcIuWkqeawtOW4glwiLFxuXHQgICAgXCI2MjA1MDJcIjogXCLnp6blt57ljLpcIixcblx0ICAgIFwiNjIwNTAzXCI6IFwi6bqm56ev5Yy6XCIsXG5cdCAgICBcIjYyMDUyMVwiOiBcIua4heawtOWOv1wiLFxuXHQgICAgXCI2MjA1MjJcIjogXCLnp6blronljr9cIixcblx0ICAgIFwiNjIwNTIzXCI6IFwi55SY6LC35Y6/XCIsXG5cdCAgICBcIjYyMDUyNFwiOiBcIuatpuWxseWOv1wiLFxuXHQgICAgXCI2MjA1MjVcIjogXCLlvKDlrrblt53lm57ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjIwNTI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDYwMFwiOiBcIuatpuWogeW4glwiLFxuXHQgICAgXCI2MjA2MDJcIjogXCLlh4nlt57ljLpcIixcblx0ICAgIFwiNjIwNjIxXCI6IFwi5rCR5Yuk5Y6/XCIsXG5cdCAgICBcIjYyMDYyMlwiOiBcIuWPpOa1quWOv1wiLFxuXHQgICAgXCI2MjA2MjNcIjogXCLlpKnnpZ3ol4/ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjIwNjI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDcwMFwiOiBcIuW8oOaOluW4glwiLFxuXHQgICAgXCI2MjA3MDJcIjogXCLnlJjlt57ljLpcIixcblx0ICAgIFwiNjIwNzIxXCI6IFwi6IKD5Y2X6KOV5Zu65peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYyMDcyMlwiOiBcIuawkeS5kOWOv1wiLFxuXHQgICAgXCI2MjA3MjNcIjogXCLkuLTms73ljr9cIixcblx0ICAgIFwiNjIwNzI0XCI6IFwi6auY5Y+w5Y6/XCIsXG5cdCAgICBcIjYyMDcyNVwiOiBcIuWxseS4ueWOv1wiLFxuXHQgICAgXCI2MjA3MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwODAwXCI6IFwi5bmz5YeJ5biCXCIsXG5cdCAgICBcIjYyMDgwMlwiOiBcIuW0huWzkuWMulwiLFxuXHQgICAgXCI2MjA4MjFcIjogXCLms77lt53ljr9cIixcblx0ICAgIFwiNjIwODIyXCI6IFwi54G15Y+w5Y6/XCIsXG5cdCAgICBcIjYyMDgyM1wiOiBcIuW0h+S/oeWOv1wiLFxuXHQgICAgXCI2MjA4MjRcIjogXCLljY7kuq3ljr9cIixcblx0ICAgIFwiNjIwODI1XCI6IFwi5bqE5rWq5Y6/XCIsXG5cdCAgICBcIjYyMDgyNlwiOiBcIumdmeWugeWOv1wiLFxuXHQgICAgXCI2MjA4MjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwOTAwXCI6IFwi6YWS5rOJ5biCXCIsXG5cdCAgICBcIjYyMDkwMlwiOiBcIuiCg+W3nuWMulwiLFxuXHQgICAgXCI2MjA5MjFcIjogXCLph5HloZTljr9cIixcblx0ICAgIFwiNjIwOTIyXCI6IFwi55Oc5bee5Y6/XCIsXG5cdCAgICBcIjYyMDkyM1wiOiBcIuiCg+WMl+iSmeWPpOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MjA5MjRcIjogXCLpmL/lhYvloZ7lk4jokKjlhYvml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjIwOTgxXCI6IFwi546J6Zeo5biCXCIsXG5cdCAgICBcIjYyMDk4MlwiOiBcIuaVpueFjOW4glwiLFxuXHQgICAgXCI2MjA5ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIxMDAwXCI6IFwi5bqG6Ziz5biCXCIsXG5cdCAgICBcIjYyMTAwMlwiOiBcIuilv+WzsOWMulwiLFxuXHQgICAgXCI2MjEwMjFcIjogXCLluobln47ljr9cIixcblx0ICAgIFwiNjIxMDIyXCI6IFwi546v5Y6/XCIsXG5cdCAgICBcIjYyMTAyM1wiOiBcIuWNjuaxoOWOv1wiLFxuXHQgICAgXCI2MjEwMjRcIjogXCLlkIjmsLTljr9cIixcblx0ICAgIFwiNjIxMDI1XCI6IFwi5q2j5a6B5Y6/XCIsXG5cdCAgICBcIjYyMTAyNlwiOiBcIuWugeWOv1wiLFxuXHQgICAgXCI2MjEwMjdcIjogXCLplYfljp/ljr9cIixcblx0ICAgIFwiNjIxMDI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMTEwMFwiOiBcIuWumuilv+W4glwiLFxuXHQgICAgXCI2MjExMDJcIjogXCLlronlrprljLpcIixcblx0ICAgIFwiNjIxMTIxXCI6IFwi6YCa5rit5Y6/XCIsXG5cdCAgICBcIjYyMTEyMlwiOiBcIumZh+ilv+WOv1wiLFxuXHQgICAgXCI2MjExMjNcIjogXCLmuK3mupDljr9cIixcblx0ICAgIFwiNjIxMTI0XCI6IFwi5Li05rSu5Y6/XCIsXG5cdCAgICBcIjYyMTEyNVwiOiBcIua8s+WOv1wiLFxuXHQgICAgXCI2MjExMjZcIjogXCLlsrfljr9cIixcblx0ICAgIFwiNjIxMTI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMTIwMFwiOiBcIumZh+WNl+W4glwiLFxuXHQgICAgXCI2MjEyMDJcIjogXCLmrabpg73ljLpcIixcblx0ICAgIFwiNjIxMjIxXCI6IFwi5oiQ5Y6/XCIsXG5cdCAgICBcIjYyMTIyMlwiOiBcIuaWh+WOv1wiLFxuXHQgICAgXCI2MjEyMjNcIjogXCLlrpXmmIzljr9cIixcblx0ICAgIFwiNjIxMjI0XCI6IFwi5bq35Y6/XCIsXG5cdCAgICBcIjYyMTIyNVwiOiBcIuilv+WSjOWOv1wiLFxuXHQgICAgXCI2MjEyMjZcIjogXCLnpLzljr9cIixcblx0ICAgIFwiNjIxMjI3XCI6IFwi5b695Y6/XCIsXG5cdCAgICBcIjYyMTIyOFwiOiBcIuS4pOW9k+WOv1wiLFxuXHQgICAgXCI2MjEyMjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIyOTAwXCI6IFwi5Li05aSP5Zue5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYyMjkwMVwiOiBcIuS4tOWkj+W4glwiLFxuXHQgICAgXCI2MjI5MjFcIjogXCLkuLTlpI/ljr9cIixcblx0ICAgIFwiNjIyOTIyXCI6IFwi5bq35LmQ5Y6/XCIsXG5cdCAgICBcIjYyMjkyM1wiOiBcIuawuOmdluWOv1wiLFxuXHQgICAgXCI2MjI5MjRcIjogXCLlub/msrPljr9cIixcblx0ICAgIFwiNjIyOTI1XCI6IFwi5ZKM5pS/5Y6/XCIsXG5cdCAgICBcIjYyMjkyNlwiOiBcIuS4nOS5oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MjI5MjdcIjogXCLnp6/nn7PlsbHkv53lronml4/kuJzkuaHml4/mkpLmi4nml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjIyOTI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMzAwMFwiOiBcIueUmOWNl+iXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MjMwMDFcIjogXCLlkIjkvZzluIJcIixcblx0ICAgIFwiNjIzMDIxXCI6IFwi5Li05r2t5Y6/XCIsXG5cdCAgICBcIjYyMzAyMlwiOiBcIuWNk+WwvOWOv1wiLFxuXHQgICAgXCI2MjMwMjNcIjogXCLoiJ/mm7Lljr9cIixcblx0ICAgIFwiNjIzMDI0XCI6IFwi6L+t6YOo5Y6/XCIsXG5cdCAgICBcIjYyMzAyNVwiOiBcIueOm+absuWOv1wiLFxuXHQgICAgXCI2MjMwMjZcIjogXCLnoozmm7Lljr9cIixcblx0ICAgIFwiNjIzMDI3XCI6IFwi5aSP5rKz5Y6/XCIsXG5cdCAgICBcIjYyMzAyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzAwMDBcIjogXCLpnZLmtbfnnIFcIixcblx0ICAgIFwiNjMwMTAwXCI6IFwi6KW/5a6B5biCXCIsXG5cdCAgICBcIjYzMDEwMlwiOiBcIuWfjuS4nOWMulwiLFxuXHQgICAgXCI2MzAxMDNcIjogXCLln47kuK3ljLpcIixcblx0ICAgIFwiNjMwMTA0XCI6IFwi5Z+O6KW/5Yy6XCIsXG5cdCAgICBcIjYzMDEwNVwiOiBcIuWfjuWMl+WMulwiLFxuXHQgICAgXCI2MzAxMjFcIjogXCLlpKfpgJrlm57ml4/lnJ/ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjMwMTIyXCI6IFwi5rmf5Lit5Y6/XCIsXG5cdCAgICBcIjYzMDEyM1wiOiBcIua5n+a6kOWOv1wiLFxuXHQgICAgXCI2MzAxMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMyMTAwXCI6IFwi5rW35Lic5biCXCIsXG5cdCAgICBcIjYzMjEyMVwiOiBcIuW5s+WuieWOv1wiLFxuXHQgICAgXCI2MzIxMjJcIjogXCLmsJHlkozlm57ml4/lnJ/ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjMyMTIzXCI6IFwi5LmQ6YO95Yy6XCIsXG5cdCAgICBcIjYzMjEyNlwiOiBcIuS6kuWKqeWcn+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MzIxMjdcIjogXCLljJbpmoblm57ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjMyMTI4XCI6IFwi5b6q5YyW5pKS5ouJ5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYzMjEyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzIyMDBcIjogXCLmtbfljJfol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjMyMjIxXCI6IFwi6Zeo5rqQ5Zue5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYzMjIyMlwiOiBcIuelgei/nuWOv1wiLFxuXHQgICAgXCI2MzIyMjNcIjogXCLmtbfmmY/ljr9cIixcblx0ICAgIFwiNjMyMjI0XCI6IFwi5Yia5a+f5Y6/XCIsXG5cdCAgICBcIjYzMjIyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzIzMDBcIjogXCLpu4TljZfol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjMyMzIxXCI6IFwi5ZCM5LuB5Y6/XCIsXG5cdCAgICBcIjYzMjMyMlwiOiBcIuWwluaJjuWOv1wiLFxuXHQgICAgXCI2MzIzMjNcIjogXCLms73lupPljr9cIixcblx0ICAgIFwiNjMyMzI0XCI6IFwi5rKz5Y2X6JKZ5Y+k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYzMjMyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzI1MDBcIjogXCLmtbfljZfol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjMyNTIxXCI6IFwi5YWx5ZKM5Y6/XCIsXG5cdCAgICBcIjYzMjUyMlwiOiBcIuWQjOW+t+WOv1wiLFxuXHQgICAgXCI2MzI1MjNcIjogXCLotLXlvrfljr9cIixcblx0ICAgIFwiNjMyNTI0XCI6IFwi5YW05rW35Y6/XCIsXG5cdCAgICBcIjYzMjUyNVwiOiBcIui0teWNl+WOv1wiLFxuXHQgICAgXCI2MzI1MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMyNjAwXCI6IFwi5p6c5rSb6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYzMjYyMVwiOiBcIueOm+aygeWOv1wiLFxuXHQgICAgXCI2MzI2MjJcIjogXCLnj63njpvljr9cIixcblx0ICAgIFwiNjMyNjIzXCI6IFwi55SY5b635Y6/XCIsXG5cdCAgICBcIjYzMjYyNFwiOiBcIui+vuaXpeWOv1wiLFxuXHQgICAgXCI2MzI2MjVcIjogXCLkuYXmsrvljr9cIixcblx0ICAgIFwiNjMyNjI2XCI6IFwi546b5aSa5Y6/XCIsXG5cdCAgICBcIjYzMjYyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzI3MDBcIjogXCLnjonmoJHol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjMyNzIxXCI6IFwi546J5qCR5biCXCIsXG5cdCAgICBcIjYzMjcyMlwiOiBcIuadguWkmuWOv1wiLFxuXHQgICAgXCI2MzI3MjNcIjogXCLnp7DlpJrljr9cIixcblx0ICAgIFwiNjMyNzI0XCI6IFwi5rK75aSa5Y6/XCIsXG5cdCAgICBcIjYzMjcyNVwiOiBcIuWbiuiwpuWOv1wiLFxuXHQgICAgXCI2MzI3MjZcIjogXCLmm7LpurvojrHljr9cIixcblx0ICAgIFwiNjMyNzI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMjgwMFwiOiBcIua1t+ilv+iSmeWPpOaXj+iXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MzI4MDFcIjogXCLmoLzlsJTmnKjluIJcIixcblx0ICAgIFwiNjMyODAyXCI6IFwi5b635Luk5ZOI5biCXCIsXG5cdCAgICBcIjYzMjgyMVwiOiBcIuS5jOWFsOWOv1wiLFxuXHQgICAgXCI2MzI4MjJcIjogXCLpg73lhbDljr9cIixcblx0ICAgIFwiNjMyODIzXCI6IFwi5aSp5bO75Y6/XCIsXG5cdCAgICBcIjYzMjgyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NDAwMDBcIjogXCLlroHlpI/lm57ml4/oh6rmsrvljLpcIixcblx0ICAgIFwiNjQwMTAwXCI6IFwi6ZO25bed5biCXCIsXG5cdCAgICBcIjY0MDEwNFwiOiBcIuWFtOW6huWMulwiLFxuXHQgICAgXCI2NDAxMDVcIjogXCLopb/lpI/ljLpcIixcblx0ICAgIFwiNjQwMTA2XCI6IFwi6YeR5Yek5Yy6XCIsXG5cdCAgICBcIjY0MDEyMVwiOiBcIuawuOWugeWOv1wiLFxuXHQgICAgXCI2NDAxMjJcIjogXCLotLrlhbDljr9cIixcblx0ICAgIFwiNjQwMTgxXCI6IFwi54G15q2m5biCXCIsXG5cdCAgICBcIjY0MDE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NDAyMDBcIjogXCLnn7PlmLTlsbHluIJcIixcblx0ICAgIFwiNjQwMjAyXCI6IFwi5aSn5q2m5Y+j5Yy6XCIsXG5cdCAgICBcIjY0MDIwNVwiOiBcIuaDoOWGnOWMulwiLFxuXHQgICAgXCI2NDAyMjFcIjogXCLlubPnvZfljr9cIixcblx0ICAgIFwiNjQwMjIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY0MDMwMFwiOiBcIuWQtOW/oOW4glwiLFxuXHQgICAgXCI2NDAzMDJcIjogXCLliKnpgJrljLpcIixcblx0ICAgIFwiNjQwMzAzXCI6IFwi57qi5a+65aCh5Yy6XCIsXG5cdCAgICBcIjY0MDMyM1wiOiBcIuebkOaxoOWOv1wiLFxuXHQgICAgXCI2NDAzMjRcIjogXCLlkIzlv4Pljr9cIixcblx0ICAgIFwiNjQwMzgxXCI6IFwi6Z2S6ZOc5bOh5biCXCIsXG5cdCAgICBcIjY0MDM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NDA0MDBcIjogXCLlm7rljp/luIJcIixcblx0ICAgIFwiNjQwNDAyXCI6IFwi5Y6f5bee5Yy6XCIsXG5cdCAgICBcIjY0MDQyMlwiOiBcIuilv+WQieWOv1wiLFxuXHQgICAgXCI2NDA0MjNcIjogXCLpmoblvrfljr9cIixcblx0ICAgIFwiNjQwNDI0XCI6IFwi5rO+5rqQ5Y6/XCIsXG5cdCAgICBcIjY0MDQyNVwiOiBcIuW9remYs+WOv1wiLFxuXHQgICAgXCI2NDA0MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjQwNTAwXCI6IFwi5Lit5Y2r5biCXCIsXG5cdCAgICBcIjY0MDUwMlwiOiBcIuaymeWdoeWktOWMulwiLFxuXHQgICAgXCI2NDA1MjFcIjogXCLkuK3lroHljr9cIixcblx0ICAgIFwiNjQwNTIyXCI6IFwi5rW35Y6f5Y6/XCIsXG5cdCAgICBcIjY0MDUyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTAwMDBcIjogXCLmlrDnlobnu7TlkL7lsJToh6rmsrvljLpcIixcblx0ICAgIFwiNjUwMTAwXCI6IFwi5LmM6bKB5pyo6b2Q5biCXCIsXG5cdCAgICBcIjY1MDEwMlwiOiBcIuWkqeWxseWMulwiLFxuXHQgICAgXCI2NTAxMDNcIjogXCLmspnkvp3lt7TlhYvljLpcIixcblx0ICAgIFwiNjUwMTA0XCI6IFwi5paw5biC5Yy6XCIsXG5cdCAgICBcIjY1MDEwNVwiOiBcIuawtOejqOayn+WMulwiLFxuXHQgICAgXCI2NTAxMDZcIjogXCLlpLTlsa/msrPljLpcIixcblx0ICAgIFwiNjUwMTA3XCI6IFwi6L6+5Z2C5Z+O5Yy6XCIsXG5cdCAgICBcIjY1MDEwOVwiOiBcIuexs+S4nOWMulwiLFxuXHQgICAgXCI2NTAxMjFcIjogXCLkuYzpsoHmnKjpvZDljr9cIixcblx0ICAgIFwiNjUwMTIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MDIwMFwiOiBcIuWFi+aLieeOm+S+neW4glwiLFxuXHQgICAgXCI2NTAyMDJcIjogXCLni6zlsbHlrZDljLpcIixcblx0ICAgIFwiNjUwMjAzXCI6IFwi5YWL5ouJ546b5L6d5Yy6XCIsXG5cdCAgICBcIjY1MDIwNFwiOiBcIueZveeisea7qeWMulwiLFxuXHQgICAgXCI2NTAyMDVcIjogXCLkuYzlsJTnpr7ljLpcIixcblx0ICAgIFwiNjUwMjA2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MjEwMFwiOiBcIuWQkOmygeeVquWcsOWMulwiLFxuXHQgICAgXCI2NTIxMDFcIjogXCLlkJDpsoHnlarluIJcIixcblx0ICAgIFwiNjUyMTIyXCI6IFwi6YSv5ZaE5Y6/XCIsXG5cdCAgICBcIjY1MjEyM1wiOiBcIuaJmOWFi+mAiuWOv1wiLFxuXHQgICAgXCI2NTIxMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUyMjAwXCI6IFwi5ZOI5a+G5Zyw5Yy6XCIsXG5cdCAgICBcIjY1MjIwMVwiOiBcIuWTiOWvhuW4glwiLFxuXHQgICAgXCI2NTIyMjJcIjogXCLlt7Tph4zlnaTlk4jokKjlhYvoh6rmsrvljr9cIixcblx0ICAgIFwiNjUyMjIzXCI6IFwi5LyK5ZC+5Y6/XCIsXG5cdCAgICBcIjY1MjIyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTIzMDBcIjogXCLmmIzlkInlm57ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjUyMzAxXCI6IFwi5piM5ZCJ5biCXCIsXG5cdCAgICBcIjY1MjMwMlwiOiBcIumYnOW6t+W4glwiLFxuXHQgICAgXCI2NTIzMjNcIjogXCLlkbzlm77lo4Hljr9cIixcblx0ICAgIFwiNjUyMzI0XCI6IFwi546b57qz5pav5Y6/XCIsXG5cdCAgICBcIjY1MjMyNVwiOiBcIuWlh+WPsOWOv1wiLFxuXHQgICAgXCI2NTIzMjdcIjogXCLlkInmnKjokKjlsJTljr9cIixcblx0ICAgIFwiNjUyMzI4XCI6IFwi5pyo5Z6S5ZOI6JCo5YWL6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjY1MjMyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTI3MDBcIjogXCLljZrlsJTloZTmi4nokpnlj6Toh6rmsrvlt55cIixcblx0ICAgIFwiNjUyNzAxXCI6IFwi5Y2a5LmQ5biCXCIsXG5cdCAgICBcIjY1MjcwMlwiOiBcIumYv+aLieWxseWPo+W4glwiLFxuXHQgICAgXCI2NTI3MjJcIjogXCLnsr7msrPljr9cIixcblx0ICAgIFwiNjUyNzIzXCI6IFwi5rip5rOJ5Y6/XCIsXG5cdCAgICBcIjY1MjcyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTI4MDBcIjogXCLlt7Tpn7Ppg63mpZ7okpnlj6Toh6rmsrvlt55cIixcblx0ICAgIFwiNjUyODAxXCI6IFwi5bqT5bCU5YuS5biCXCIsXG5cdCAgICBcIjY1MjgyMlwiOiBcIui9ruWPsOWOv1wiLFxuXHQgICAgXCI2NTI4MjNcIjogXCLlsInnioHljr9cIixcblx0ICAgIFwiNjUyODI0XCI6IFwi6Iul576M5Y6/XCIsXG5cdCAgICBcIjY1MjgyNVwiOiBcIuS4lOacq+WOv1wiLFxuXHQgICAgXCI2NTI4MjZcIjogXCLnhInogIblm57ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjUyODI3XCI6IFwi5ZKM6Z2Z5Y6/XCIsXG5cdCAgICBcIjY1MjgyOFwiOiBcIuWSjOehleWOv1wiLFxuXHQgICAgXCI2NTI4MjlcIjogXCLljZrmuZbljr9cIixcblx0ICAgIFwiNjUyODMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MjkwMFwiOiBcIumYv+WFi+iLj+WcsOWMulwiLFxuXHQgICAgXCI2NTI5MDFcIjogXCLpmL/lhYvoi4/luIJcIixcblx0ICAgIFwiNjUyOTIyXCI6IFwi5rip5a6/5Y6/XCIsXG5cdCAgICBcIjY1MjkyM1wiOiBcIuW6k+i9puWOv1wiLFxuXHQgICAgXCI2NTI5MjRcIjogXCLmspnpm4Xljr9cIixcblx0ICAgIFwiNjUyOTI1XCI6IFwi5paw5ZKM5Y6/XCIsXG5cdCAgICBcIjY1MjkyNlwiOiBcIuaLnOWfjuWOv1wiLFxuXHQgICAgXCI2NTI5MjdcIjogXCLkuYzku4Dljr9cIixcblx0ICAgIFwiNjUyOTI4XCI6IFwi6Zi/55Om5o+Q5Y6/XCIsXG5cdCAgICBcIjY1MjkyOVwiOiBcIuafr+WdquWOv1wiLFxuXHQgICAgXCI2NTI5MzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUzMDAwXCI6IFwi5YWL5a2c5YuS6IuP5p+v5bCU5YWL5a2c6Ieq5rK75beeXCIsXG5cdCAgICBcIjY1MzAwMVwiOiBcIumYv+WbvuS7gOW4glwiLFxuXHQgICAgXCI2NTMwMjJcIjogXCLpmL/lhYvpmbbljr9cIixcblx0ICAgIFwiNjUzMDIzXCI6IFwi6Zi/5ZCI5aWH5Y6/XCIsXG5cdCAgICBcIjY1MzAyNFwiOiBcIuS5jOaBsOWOv1wiLFxuXHQgICAgXCI2NTMwMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUzMTAwXCI6IFwi5ZaA5LuA5Zyw5Yy6XCIsXG5cdCAgICBcIjY1MzEwMVwiOiBcIuWWgOS7gOW4glwiLFxuXHQgICAgXCI2NTMxMjFcIjogXCLnlo/pmYTljr9cIixcblx0ICAgIFwiNjUzMTIyXCI6IFwi55aP5YuS5Y6/XCIsXG5cdCAgICBcIjY1MzEyM1wiOiBcIuiLseWQieaymeWOv1wiLFxuXHQgICAgXCI2NTMxMjRcIjogXCLms73mma7ljr9cIixcblx0ICAgIFwiNjUzMTI1XCI6IFwi6I6O6L2m5Y6/XCIsXG5cdCAgICBcIjY1MzEyNlwiOiBcIuWPtuWfjuWOv1wiLFxuXHQgICAgXCI2NTMxMjdcIjogXCLpuqbnm5bmj5Dljr9cIixcblx0ICAgIFwiNjUzMTI4XCI6IFwi5bKz5pmu5rmW5Y6/XCIsXG5cdCAgICBcIjY1MzEyOVwiOiBcIuS8veW4iOWOv1wiLFxuXHQgICAgXCI2NTMxMzBcIjogXCLlt7TmpZrljr9cIixcblx0ICAgIFwiNjUzMTMxXCI6IFwi5aGU5LuA5bqT5bCU5bmy5aGU5ZCJ5YWL6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjY1MzEzMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTMyMDBcIjogXCLlkoznlLDlnLDljLpcIixcblx0ICAgIFwiNjUzMjAxXCI6IFwi5ZKM55Sw5biCXCIsXG5cdCAgICBcIjY1MzIyMVwiOiBcIuWSjOeUsOWOv1wiLFxuXHQgICAgXCI2NTMyMjJcIjogXCLloqjnjonljr9cIixcblx0ICAgIFwiNjUzMjIzXCI6IFwi55qu5bGx5Y6/XCIsXG5cdCAgICBcIjY1MzIyNFwiOiBcIua0m+a1puWOv1wiLFxuXHQgICAgXCI2NTMyMjVcIjogXCLnrZbli5Lljr9cIixcblx0ICAgIFwiNjUzMjI2XCI6IFwi5LqO55Sw5Y6/XCIsXG5cdCAgICBcIjY1MzIyN1wiOiBcIuawkeS4sOWOv1wiLFxuXHQgICAgXCI2NTMyMjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjU0MDAwXCI6IFwi5LyK54qB5ZOI6JCo5YWL6Ieq5rK75beeXCIsXG5cdCAgICBcIjY1NDAwMlwiOiBcIuS8iuWugeW4glwiLFxuXHQgICAgXCI2NTQwMDNcIjogXCLlpY7lsa/luIJcIixcblx0ICAgIFwiNjU0MDIxXCI6IFwi5LyK5a6B5Y6/XCIsXG5cdCAgICBcIjY1NDAyMlwiOiBcIuWvn+W4g+afpeWwlOmUoeS8r+iHquayu+WOv1wiLFxuXHQgICAgXCI2NTQwMjNcIjogXCLpnI3ln47ljr9cIixcblx0ICAgIFwiNjU0MDI0XCI6IFwi5bep55WZ5Y6/XCIsXG5cdCAgICBcIjY1NDAyNVwiOiBcIuaWsOa6kOWOv1wiLFxuXHQgICAgXCI2NTQwMjZcIjogXCLmmK3oi4/ljr9cIixcblx0ICAgIFwiNjU0MDI3XCI6IFwi54m55YWL5pav5Y6/XCIsXG5cdCAgICBcIjY1NDAyOFwiOiBcIuWwvOWLkuWFi+WOv1wiLFxuXHQgICAgXCI2NTQwMjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjU0MjAwXCI6IFwi5aGU5Z+O5Zyw5Yy6XCIsXG5cdCAgICBcIjY1NDIwMVwiOiBcIuWhlOWfjuW4glwiLFxuXHQgICAgXCI2NTQyMDJcIjogXCLkuYzoi4/luIJcIixcblx0ICAgIFwiNjU0MjIxXCI6IFwi6aKd5pWP5Y6/XCIsXG5cdCAgICBcIjY1NDIyM1wiOiBcIuaymea5vuWOv1wiLFxuXHQgICAgXCI2NTQyMjRcIjogXCLmiZjph4zljr9cIixcblx0ICAgIFwiNjU0MjI1XCI6IFwi6KOV5rCR5Y6/XCIsXG5cdCAgICBcIjY1NDIyNlwiOiBcIuWSjOW4g+WFi+i1m+WwlOiSmeWPpOiHquayu+WOv1wiLFxuXHQgICAgXCI2NTQyMjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjU0MzAwXCI6IFwi6Zi/5YuS5rOw5Zyw5Yy6XCIsXG5cdCAgICBcIjY1NDMwMVwiOiBcIumYv+WLkuazsOW4glwiLFxuXHQgICAgXCI2NTQzMjFcIjogXCLluIPlsJTmtKXljr9cIixcblx0ICAgIFwiNjU0MzIyXCI6IFwi5a+M6JW05Y6/XCIsXG5cdCAgICBcIjY1NDMyM1wiOiBcIuemj+a1t+WOv1wiLFxuXHQgICAgXCI2NTQzMjRcIjogXCLlk4jlt7TmsrPljr9cIixcblx0ICAgIFwiNjU0MzI1XCI6IFwi6Z2S5rKz5Y6/XCIsXG5cdCAgICBcIjY1NDMyNlwiOiBcIuWQieacqOS5g+WOv1wiLFxuXHQgICAgXCI2NTQzMjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjU5MDAxXCI6IFwi55+z5rKz5a2Q5biCXCIsXG5cdCAgICBcIjY1OTAwMlwiOiBcIumYv+aLieWwlOW4glwiLFxuXHQgICAgXCI2NTkwMDNcIjogXCLlm77mnKjoiJLlhYvluIJcIixcblx0ICAgIFwiNjU5MDA0XCI6IFwi5LqU5a625rig5biCXCIsXG5cdCAgICBcIjcxMDAwMFwiOiBcIuWPsOa5vlwiLFxuXHQgICAgXCI3MTAxMDBcIjogXCLlj7DljJfluIJcIixcblx0ICAgIFwiNzEwMTAxXCI6IFwi5Lit5q2j5Yy6XCIsXG5cdCAgICBcIjcxMDEwMlwiOiBcIuWkp+WQjOWMulwiLFxuXHQgICAgXCI3MTAxMDNcIjogXCLkuK3lsbHljLpcIixcblx0ICAgIFwiNzEwMTA0XCI6IFwi5p2+5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDEwNVwiOiBcIuWkp+WuieWMulwiLFxuXHQgICAgXCI3MTAxMDZcIjogXCLkuIfljY7ljLpcIixcblx0ICAgIFwiNzEwMTA3XCI6IFwi5L+h5LmJ5Yy6XCIsXG5cdCAgICBcIjcxMDEwOFwiOiBcIuWjq+ael+WMulwiLFxuXHQgICAgXCI3MTAxMDlcIjogXCLljJfmipXljLpcIixcblx0ICAgIFwiNzEwMTEwXCI6IFwi5YaF5rmW5Yy6XCIsXG5cdCAgICBcIjcxMDExMVwiOiBcIuWNl+a4r+WMulwiLFxuXHQgICAgXCI3MTAxMTJcIjogXCLmloflsbHljLpcIixcblx0ICAgIFwiNzEwMTEzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjcxMDIwMFwiOiBcIumrmOmbhOW4glwiLFxuXHQgICAgXCI3MTAyMDFcIjogXCLmlrDlhbTljLpcIixcblx0ICAgIFwiNzEwMjAyXCI6IFwi5YmN6YeR5Yy6XCIsXG5cdCAgICBcIjcxMDIwM1wiOiBcIuiKqembheWMulwiLFxuXHQgICAgXCI3MTAyMDRcIjogXCLnm5Dln5XljLpcIixcblx0ICAgIFwiNzEwMjA1XCI6IFwi6byT5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDIwNlwiOiBcIuaXl+a0peWMulwiLFxuXHQgICAgXCI3MTAyMDdcIjogXCLliY3plYfljLpcIixcblx0ICAgIFwiNzEwMjA4XCI6IFwi5LiJ5rCR5Yy6XCIsXG5cdCAgICBcIjcxMDIwOVwiOiBcIuW3puiQpeWMulwiLFxuXHQgICAgXCI3MTAyMTBcIjogXCLmpaDmopPljLpcIixcblx0ICAgIFwiNzEwMjExXCI6IFwi5bCP5riv5Yy6XCIsXG5cdCAgICBcIjcxMDIxMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI3MTAyNDFcIjogXCLoi5Ppm4XljLpcIixcblx0ICAgIFwiNzEwMjQyXCI6IFwi5LuB5q2m5Yy6XCIsXG5cdCAgICBcIjcxMDI0M1wiOiBcIuWkp+ekvuWMulwiLFxuXHQgICAgXCI3MTAyNDRcIjogXCLlhojlsbHljLpcIixcblx0ICAgIFwiNzEwMjQ1XCI6IFwi6Lev56u55Yy6XCIsXG5cdCAgICBcIjcxMDI0NlwiOiBcIumYv+iOsuWMulwiLFxuXHQgICAgXCI3MTAyNDdcIjogXCLnlLDlr67ljLpcIixcblx0ICAgIFwiNzEwMjQ4XCI6IFwi54eV5bei5Yy6XCIsXG5cdCAgICBcIjcxMDI0OVwiOiBcIuahpeWktOWMulwiLFxuXHQgICAgXCI3MTAyNTBcIjogXCLmopPlrpjljLpcIixcblx0ICAgIFwiNzEwMjUxXCI6IFwi5byl6ZmA5Yy6XCIsXG5cdCAgICBcIjcxMDI1MlwiOiBcIuawuOWuieWMulwiLFxuXHQgICAgXCI3MTAyNTNcIjogXCLmuZblhoXljLpcIixcblx0ICAgIFwiNzEwMjU0XCI6IFwi5Yek5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDI1NVwiOiBcIuWkp+WvruWMulwiLFxuXHQgICAgXCI3MTAyNTZcIjogXCLmnpflm63ljLpcIixcblx0ICAgIFwiNzEwMjU3XCI6IFwi6bif5p2+5Yy6XCIsXG5cdCAgICBcIjcxMDI1OFwiOiBcIuWkp+agkeWMulwiLFxuXHQgICAgXCI3MTAyNTlcIjogXCLml5flsbHljLpcIixcblx0ICAgIFwiNzEwMjYwXCI6IFwi576O5rWT5Yy6XCIsXG5cdCAgICBcIjcxMDI2MVwiOiBcIuWFrem+n+WMulwiLFxuXHQgICAgXCI3MTAyNjJcIjogXCLlhoXpl6jljLpcIixcblx0ICAgIFwiNzEwMjYzXCI6IFwi5p2J5p6X5Yy6XCIsXG5cdCAgICBcIjcxMDI2NFwiOiBcIueUsuS7meWMulwiLFxuXHQgICAgXCI3MTAyNjVcIjogXCLmoYPmupDljLpcIixcblx0ICAgIFwiNzEwMjY2XCI6IFwi6YKj546b5aSP5Yy6XCIsXG5cdCAgICBcIjcxMDI2N1wiOiBcIuiMguael+WMulwiLFxuXHQgICAgXCI3MTAyNjhcIjogXCLojITokKPljLpcIixcblx0ICAgIFwiNzEwMzAwXCI6IFwi5Y+w5Y2X5biCXCIsXG5cdCAgICBcIjcxMDMwMVwiOiBcIuS4reilv+WMulwiLFxuXHQgICAgXCI3MTAzMDJcIjogXCLkuJzljLpcIixcblx0ICAgIFwiNzEwMzAzXCI6IFwi5Y2X5Yy6XCIsXG5cdCAgICBcIjcxMDMwNFwiOiBcIuWMl+WMulwiLFxuXHQgICAgXCI3MTAzMDVcIjogXCLlronlubPljLpcIixcblx0ICAgIFwiNzEwMzA2XCI6IFwi5a6J5Y2X5Yy6XCIsXG5cdCAgICBcIjcxMDMwN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI3MTAzMzlcIjogXCLmsLjlurfljLpcIixcblx0ICAgIFwiNzEwMzQwXCI6IFwi5b2S5LuB5Yy6XCIsXG5cdCAgICBcIjcxMDM0MVwiOiBcIuaWsOWMluWMulwiLFxuXHQgICAgXCI3MTAzNDJcIjogXCLlt6bplYfljLpcIixcblx0ICAgIFwiNzEwMzQzXCI6IFwi546J5LqV5Yy6XCIsXG5cdCAgICBcIjcxMDM0NFwiOiBcIualoOilv+WMulwiLFxuXHQgICAgXCI3MTAzNDVcIjogXCLljZfljJbljLpcIixcblx0ICAgIFwiNzEwMzQ2XCI6IFwi5LuB5b635Yy6XCIsXG5cdCAgICBcIjcxMDM0N1wiOiBcIuWFs+W6meWMulwiLFxuXHQgICAgXCI3MTAzNDhcIjogXCLpvpnltI7ljLpcIixcblx0ICAgIFwiNzEwMzQ5XCI6IFwi5a6Y55Sw5Yy6XCIsXG5cdCAgICBcIjcxMDM1MFwiOiBcIum6u+ixhuWMulwiLFxuXHQgICAgXCI3MTAzNTFcIjogXCLkvbPph4zljLpcIixcblx0ICAgIFwiNzEwMzUyXCI6IFwi6KW/5riv5Yy6XCIsXG5cdCAgICBcIjcxMDM1M1wiOiBcIuS4g+iCoeWMulwiLFxuXHQgICAgXCI3MTAzNTRcIjogXCLlsIblhpvljLpcIixcblx0ICAgIFwiNzEwMzU1XCI6IFwi5a2m55Sy5Yy6XCIsXG5cdCAgICBcIjcxMDM1NlwiOiBcIuWMl+mXqOWMulwiLFxuXHQgICAgXCI3MTAzNTdcIjogXCLmlrDokKXljLpcIixcblx0ICAgIFwiNzEwMzU4XCI6IFwi5ZCO5aOB5Yy6XCIsXG5cdCAgICBcIjcxMDM1OVwiOiBcIueZveays+WMulwiLFxuXHQgICAgXCI3MTAzNjBcIjogXCLkuJzlsbHljLpcIixcblx0ICAgIFwiNzEwMzYxXCI6IFwi5YWt55Sy5Yy6XCIsXG5cdCAgICBcIjcxMDM2MlwiOiBcIuS4i+iQpeWMulwiLFxuXHQgICAgXCI3MTAzNjNcIjogXCLmn7PokKXljLpcIixcblx0ICAgIFwiNzEwMzY0XCI6IFwi55uQ5rC05Yy6XCIsXG5cdCAgICBcIjcxMDM2NVwiOiBcIuWWhOWMluWMulwiLFxuXHQgICAgXCI3MTAzNjZcIjogXCLlpKflhoXljLpcIixcblx0ICAgIFwiNzEwMzY3XCI6IFwi5bGx5LiK5Yy6XCIsXG5cdCAgICBcIjcxMDM2OFwiOiBcIuaWsOW4guWMulwiLFxuXHQgICAgXCI3MTAzNjlcIjogXCLlronlrprljLpcIixcblx0ICAgIFwiNzEwNDAwXCI6IFwi5Y+w5Lit5biCXCIsXG5cdCAgICBcIjcxMDQwMVwiOiBcIuS4reWMulwiLFxuXHQgICAgXCI3MTA0MDJcIjogXCLkuJzljLpcIixcblx0ICAgIFwiNzEwNDAzXCI6IFwi5Y2X5Yy6XCIsXG5cdCAgICBcIjcxMDQwNFwiOiBcIuilv+WMulwiLFxuXHQgICAgXCI3MTA0MDVcIjogXCLljJfljLpcIixcblx0ICAgIFwiNzEwNDA2XCI6IFwi5YyX5bGv5Yy6XCIsXG5cdCAgICBcIjcxMDQwN1wiOiBcIuilv+Wxr+WMulwiLFxuXHQgICAgXCI3MTA0MDhcIjogXCLljZflsa/ljLpcIixcblx0ICAgIFwiNzEwNDA5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjcxMDQzMVwiOiBcIuWkquW5s+WMulwiLFxuXHQgICAgXCI3MTA0MzJcIjogXCLlpKfph4zljLpcIixcblx0ICAgIFwiNzEwNDMzXCI6IFwi6Zu+5bOw5Yy6XCIsXG5cdCAgICBcIjcxMDQzNFwiOiBcIuS5jOaXpeWMulwiLFxuXHQgICAgXCI3MTA0MzVcIjogXCLkuLDljp/ljLpcIixcblx0ICAgIFwiNzEwNDM2XCI6IFwi5ZCO6YeM5Yy6XCIsXG5cdCAgICBcIjcxMDQzN1wiOiBcIuefs+WGiOWMulwiLFxuXHQgICAgXCI3MTA0MzhcIjogXCLkuJzlir/ljLpcIixcblx0ICAgIFwiNzEwNDM5XCI6IFwi5ZKM5bmz5Yy6XCIsXG5cdCAgICBcIjcxMDQ0MFwiOiBcIuaWsOekvuWMulwiLFxuXHQgICAgXCI3MTA0NDFcIjogXCLmva3lrZDljLpcIixcblx0ICAgIFwiNzEwNDQyXCI6IFwi5aSn6ZuF5Yy6XCIsXG5cdCAgICBcIjcxMDQ0M1wiOiBcIuelnuWGiOWMulwiLFxuXHQgICAgXCI3MTA0NDRcIjogXCLlpKfogprljLpcIixcblx0ICAgIFwiNzEwNDQ1XCI6IFwi5rKZ6bm/5Yy6XCIsXG5cdCAgICBcIjcxMDQ0NlwiOiBcIum+meS6leWMulwiLFxuXHQgICAgXCI3MTA0NDdcIjogXCLmoqfmoJbljLpcIixcblx0ICAgIFwiNzEwNDQ4XCI6IFwi5riF5rC05Yy6XCIsXG5cdCAgICBcIjcxMDQ0OVwiOiBcIuWkp+eUsuWMulwiLFxuXHQgICAgXCI3MTA0NTBcIjogXCLlpJbln5TljLpcIixcblx0ICAgIFwiNzEwNDUxXCI6IFwi5aSn5a6J5Yy6XCIsXG5cdCAgICBcIjcxMDUwMFwiOiBcIumHkemXqOWOv1wiLFxuXHQgICAgXCI3MTA1MDdcIjogXCLph5HmspnplYdcIixcblx0ICAgIFwiNzEwNTA4XCI6IFwi6YeR5rmW6ZWHXCIsXG5cdCAgICBcIjcxMDUwOVwiOiBcIumHkeWugeS5oVwiLFxuXHQgICAgXCI3MTA1MTBcIjogXCLph5Hln47plYdcIixcblx0ICAgIFwiNzEwNTExXCI6IFwi54OI5bG/5LmhXCIsXG5cdCAgICBcIjcxMDUxMlwiOiBcIuS5jOWdteS5oVwiLFxuXHQgICAgXCI3MTA2MDBcIjogXCLljZfmipXljr9cIixcblx0ICAgIFwiNzEwNjE0XCI6IFwi5Y2X5oqV5biCXCIsXG5cdCAgICBcIjcxMDYxNVwiOiBcIuS4reWvruS5oVwiLFxuXHQgICAgXCI3MTA2MTZcIjogXCLojYnlsa/plYdcIixcblx0ICAgIFwiNzEwNjE3XCI6IFwi5Zu95aeT5LmhXCIsXG5cdCAgICBcIjcxMDYxOFwiOiBcIuWflOmHjOmVh1wiLFxuXHQgICAgXCI3MTA2MTlcIjogXCLku4HniLHkuaFcIixcblx0ICAgIFwiNzEwNjIwXCI6IFwi5ZCN6Ze05LmhXCIsXG5cdCAgICBcIjcxMDYyMVwiOiBcIumbhumbhumVh1wiLFxuXHQgICAgXCI3MTA2MjJcIjogXCLmsLTph4zkuaFcIixcblx0ICAgIFwiNzEwNjIzXCI6IFwi6bG85rGg5LmhXCIsXG5cdCAgICBcIjcxMDYyNFwiOiBcIuS/oeS5ieS5oVwiLFxuXHQgICAgXCI3MTA2MjVcIjogXCLnq7nlsbHplYdcIixcblx0ICAgIFwiNzEwNjI2XCI6IFwi6bm/6LC35LmhXCIsXG5cdCAgICBcIjcxMDcwMFwiOiBcIuWfuumahuW4glwiLFxuXHQgICAgXCI3MTA3MDFcIjogXCLku4HniLHljLpcIixcblx0ICAgIFwiNzEwNzAyXCI6IFwi5L+h5LmJ5Yy6XCIsXG5cdCAgICBcIjcxMDcwM1wiOiBcIuS4reato+WMulwiLFxuXHQgICAgXCI3MTA3MDRcIjogXCLkuK3lsbHljLpcIixcblx0ICAgIFwiNzEwNzA1XCI6IFwi5a6J5LmQ5Yy6XCIsXG5cdCAgICBcIjcxMDcwNlwiOiBcIuaaluaaluWMulwiLFxuXHQgICAgXCI3MTA3MDdcIjogXCLkuIPloLXljLpcIixcblx0ICAgIFwiNzEwNzA4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjcxMDgwMFwiOiBcIuaWsOerueW4glwiLFxuXHQgICAgXCI3MTA4MDFcIjogXCLkuJzljLpcIixcblx0ICAgIFwiNzEwODAyXCI6IFwi5YyX5Yy6XCIsXG5cdCAgICBcIjcxMDgwM1wiOiBcIummmeWxseWMulwiLFxuXHQgICAgXCI3MTA4MDRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNzEwOTAwXCI6IFwi5ZiJ5LmJ5biCXCIsXG5cdCAgICBcIjcxMDkwMVwiOiBcIuS4nOWMulwiLFxuXHQgICAgXCI3MTA5MDJcIjogXCLopb/ljLpcIixcblx0ICAgIFwiNzEwOTAzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjcxMTEwMFwiOiBcIuaWsOWMl+W4glwiLFxuXHQgICAgXCI3MTExMzBcIjogXCLkuIfph4zljLpcIixcblx0ICAgIFwiNzExMTMxXCI6IFwi6YeR5bGx5Yy6XCIsXG5cdCAgICBcIjcxMTEzMlwiOiBcIuadv+ahpeWMulwiLFxuXHQgICAgXCI3MTExMzNcIjogXCLmsZDmraLljLpcIixcblx0ICAgIFwiNzExMTM0XCI6IFwi5rex5Z2R5Yy6XCIsXG5cdCAgICBcIjcxMTEzNVwiOiBcIuefs+eih+WMulwiLFxuXHQgICAgXCI3MTExMzZcIjogXCLnkZ7oirPljLpcIixcblx0ICAgIFwiNzExMTM3XCI6IFwi5bmz5rqq5Yy6XCIsXG5cdCAgICBcIjcxMTEzOFwiOiBcIuWPjOa6quWMulwiLFxuXHQgICAgXCI3MTExMzlcIjogXCLotKHlr67ljLpcIixcblx0ICAgIFwiNzExMTQwXCI6IFwi5paw5bqX5Yy6XCIsXG5cdCAgICBcIjcxMTE0MVwiOiBcIuWdquael+WMulwiLFxuXHQgICAgXCI3MTExNDJcIjogXCLkuYzmnaXljLpcIixcblx0ICAgIFwiNzExMTQzXCI6IFwi5rC45ZKM5Yy6XCIsXG5cdCAgICBcIjcxMTE0NFwiOiBcIuS4reWSjOWMulwiLFxuXHQgICAgXCI3MTExNDVcIjogXCLlnJ/ln47ljLpcIixcblx0ICAgIFwiNzExMTQ2XCI6IFwi5LiJ5bOh5Yy6XCIsXG5cdCAgICBcIjcxMTE0N1wiOiBcIuagkeael+WMulwiLFxuXHQgICAgXCI3MTExNDhcIjogXCLojrrmrYzljLpcIixcblx0ICAgIFwiNzExMTQ5XCI6IFwi5LiJ6YeN5Yy6XCIsXG5cdCAgICBcIjcxMTE1MFwiOiBcIuaWsOW6hOWMulwiLFxuXHQgICAgXCI3MTExNTFcIjogXCLms7DlsbHljLpcIixcblx0ICAgIFwiNzExMTUyXCI6IFwi5p6X5Y+j5Yy6XCIsXG5cdCAgICBcIjcxMTE1M1wiOiBcIuiKpua0suWMulwiLFxuXHQgICAgXCI3MTExNTRcIjogXCLkupTogqHljLpcIixcblx0ICAgIFwiNzExMTU1XCI6IFwi5YWr6YeM5Yy6XCIsXG5cdCAgICBcIjcxMTE1NlwiOiBcIua3oeawtOWMulwiLFxuXHQgICAgXCI3MTExNTdcIjogXCLkuInoip3ljLpcIixcblx0ICAgIFwiNzExMTU4XCI6IFwi55+z6Zeo5Yy6XCIsXG5cdCAgICBcIjcxMTIwMFwiOiBcIuWunOWFsOWOv1wiLFxuXHQgICAgXCI3MTEyMTRcIjogXCLlrpzlhbDluIJcIixcblx0ICAgIFwiNzExMjE1XCI6IFwi5aS05Z+O6ZWHXCIsXG5cdCAgICBcIjcxMTIxNlwiOiBcIuekgea6quS5oVwiLFxuXHQgICAgXCI3MTEyMTdcIjogXCLlo67lm7TkuaFcIixcblx0ICAgIFwiNzExMjE4XCI6IFwi5ZGY5bGx5LmhXCIsXG5cdCAgICBcIjcxMTIxOVwiOiBcIue9l+S4nOmVh1wiLFxuXHQgICAgXCI3MTEyMjBcIjogXCLkuInmmJ/kuaFcIixcblx0ICAgIFwiNzExMjIxXCI6IFwi5aSn5ZCM5LmhXCIsXG5cdCAgICBcIjcxMTIyMlwiOiBcIuS6lOe7k+S5oVwiLFxuXHQgICAgXCI3MTEyMjNcIjogXCLlhqzlsbHkuaFcIixcblx0ICAgIFwiNzExMjI0XCI6IFwi6IuP5r6z6ZWHXCIsXG5cdCAgICBcIjcxMTIyNVwiOiBcIuWNl+a+s+S5oVwiLFxuXHQgICAgXCI3MTEyMjZcIjogXCLpkpPpsbzlj7BcIixcblx0ICAgIFwiNzExMzAwXCI6IFwi5paw56u55Y6/XCIsXG5cdCAgICBcIjcxMTMxNFwiOiBcIuerueWMl+W4glwiLFxuXHQgICAgXCI3MTEzMTVcIjogXCLmuZblj6PkuaFcIixcblx0ICAgIFwiNzExMzE2XCI6IFwi5paw5Liw5LmhXCIsXG5cdCAgICBcIjcxMTMxN1wiOiBcIuaWsOWflOmVh1wiLFxuXHQgICAgXCI3MTEzMThcIjogXCLlhbPopb/plYdcIixcblx0ICAgIFwiNzExMzE5XCI6IFwi6IqO5p6X5LmhXCIsXG5cdCAgICBcIjcxMTMyMFwiOiBcIuWuneWxseS5oVwiLFxuXHQgICAgXCI3MTEzMjFcIjogXCLnq7nkuJzplYdcIixcblx0ICAgIFwiNzExMzIyXCI6IFwi5LqU5bOw5LmhXCIsXG5cdCAgICBcIjcxMTMyM1wiOiBcIuaoquWxseS5oVwiLFxuXHQgICAgXCI3MTEzMjRcIjogXCLlsJbnn7PkuaFcIixcblx0ICAgIFwiNzExMzI1XCI6IFwi5YyX5Z+U5LmhXCIsXG5cdCAgICBcIjcxMTMyNlwiOiBcIuWzqOecieS5oVwiLFxuXHQgICAgXCI3MTE0MDBcIjogXCLmoYPlm63ljr9cIixcblx0ICAgIFwiNzExNDE0XCI6IFwi5Lit5Z2c5biCXCIsXG5cdCAgICBcIjcxMTQxNVwiOiBcIuW5s+mVh+W4glwiLFxuXHQgICAgXCI3MTE0MTZcIjogXCLpvpnmva3kuaFcIixcblx0ICAgIFwiNzExNDE3XCI6IFwi5p2o5qKF5biCXCIsXG5cdCAgICBcIjcxMTQxOFwiOiBcIuaWsOWxi+S5oVwiLFxuXHQgICAgXCI3MTE0MTlcIjogXCLop4Lpn7PkuaFcIixcblx0ICAgIFwiNzExNDIwXCI6IFwi5qGD5Zut5biCXCIsXG5cdCAgICBcIjcxMTQyMVwiOiBcIum+n+WxseS5oVwiLFxuXHQgICAgXCI3MTE0MjJcIjogXCLlhavlvrfluIJcIixcblx0ICAgIFwiNzExNDIzXCI6IFwi5aSn5rqq6ZWHXCIsXG5cdCAgICBcIjcxMTQyNFwiOiBcIuWkjeWFtOS5oVwiLFxuXHQgICAgXCI3MTE0MjVcIjogXCLlpKflm63kuaFcIixcblx0ICAgIFwiNzExNDI2XCI6IFwi6Iqm56u55LmhXCIsXG5cdCAgICBcIjcxMTUwMFwiOiBcIuiLl+agl+WOv1wiLFxuXHQgICAgXCI3MTE1MTlcIjogXCLnq7nljZfplYdcIixcblx0ICAgIFwiNzExNTIwXCI6IFwi5aS05Lu96ZWHXCIsXG5cdCAgICBcIjcxMTUyMVwiOiBcIuS4iea5vuS5oVwiLFxuXHQgICAgXCI3MTE1MjJcIjogXCLljZfluoTkuaFcIixcblx0ICAgIFwiNzExNTIzXCI6IFwi54uu5r2t5LmhXCIsXG5cdCAgICBcIjcxMTUyNFwiOiBcIuWQjum+memVh1wiLFxuXHQgICAgXCI3MTE1MjVcIjogXCLpgJrpnITplYdcIixcblx0ICAgIFwiNzExNTI2XCI6IFwi6IuR6YeM6ZWHXCIsXG5cdCAgICBcIjcxMTUyN1wiOiBcIuiLl+agl+W4glwiLFxuXHQgICAgXCI3MTE1MjhcIjogXCLpgKDmoaXkuaFcIixcblx0ICAgIFwiNzExNTI5XCI6IFwi5aS05bGL5LmhXCIsXG5cdCAgICBcIjcxMTUzMFwiOiBcIuWFrOmmhuS5oVwiLFxuXHQgICAgXCI3MTE1MzFcIjogXCLlpKfmuZbkuaFcIixcblx0ICAgIFwiNzExNTMyXCI6IFwi5rOw5a6J5LmhXCIsXG5cdCAgICBcIjcxMTUzM1wiOiBcIumTnOmUo+S5oVwiLFxuXHQgICAgXCI3MTE1MzRcIjogXCLkuInkuYnkuaFcIixcblx0ICAgIFwiNzExNTM1XCI6IFwi6KW/5rmW5LmhXCIsXG5cdCAgICBcIjcxMTUzNlwiOiBcIuWNk+WFsOmVh1wiLFxuXHQgICAgXCI3MTE3MDBcIjogXCLlvbDljJbljr9cIixcblx0ICAgIFwiNzExNzI3XCI6IFwi5b2w5YyW5biCXCIsXG5cdCAgICBcIjcxMTcyOFwiOiBcIuiKrOWbreS5oVwiLFxuXHQgICAgXCI3MTE3MjlcIjogXCLoirHlnZvkuaFcIixcblx0ICAgIFwiNzExNzMwXCI6IFwi56eA5rC05LmhXCIsXG5cdCAgICBcIjcxMTczMVwiOiBcIum5v+a4r+mVh1wiLFxuXHQgICAgXCI3MTE3MzJcIjogXCLnpo/lhbTkuaFcIixcblx0ICAgIFwiNzExNzMzXCI6IFwi57q/6KW/5LmhXCIsXG5cdCAgICBcIjcxMTczNFwiOiBcIuWSjOe+jumVh1wiLFxuXHQgICAgXCI3MTE3MzVcIjogXCLkvLjmuK/kuaFcIixcblx0ICAgIFwiNzExNzM2XCI6IFwi5ZGY5p6X6ZWHXCIsXG5cdCAgICBcIjcxMTczN1wiOiBcIuekvuWktOS5oVwiLFxuXHQgICAgXCI3MTE3MzhcIjogXCLmsLjpnZbkuaFcIixcblx0ICAgIFwiNzExNzM5XCI6IFwi5Z+U5b+D5LmhXCIsXG5cdCAgICBcIjcxMTc0MFwiOiBcIua6qua5lumVh1wiLFxuXHQgICAgXCI3MTE3NDFcIjogXCLlpKfmnZHkuaFcIixcblx0ICAgIFwiNzExNzQyXCI6IFwi5Z+U55uQ5LmhXCIsXG5cdCAgICBcIjcxMTc0M1wiOiBcIueUsOS4remVh1wiLFxuXHQgICAgXCI3MTE3NDRcIjogXCLljJfmlpfplYdcIixcblx0ICAgIFwiNzExNzQ1XCI6IFwi55Sw5bC+5LmhXCIsXG5cdCAgICBcIjcxMTc0NlwiOiBcIuWfpOWktOS5oVwiLFxuXHQgICAgXCI3MTE3NDdcIjogXCLmuqrlt57kuaFcIixcblx0ICAgIFwiNzExNzQ4XCI6IFwi56u55aGY5LmhXCIsXG5cdCAgICBcIjcxMTc0OVwiOiBcIuS6jOael+mVh1wiLFxuXHQgICAgXCI3MTE3NTBcIjogXCLlpKfln47kuaFcIixcblx0ICAgIFwiNzExNzUxXCI6IFwi6Iqz6IuR5LmhXCIsXG5cdCAgICBcIjcxMTc1MlwiOiBcIuS6jOawtOS5oVwiLFxuXHQgICAgXCI3MTE5MDBcIjogXCLlmInkuYnljr9cIixcblx0ICAgIFwiNzExOTE5XCI6IFwi55Wq6Lev5LmhXCIsXG5cdCAgICBcIjcxMTkyMFwiOiBcIuaiheWxseS5oVwiLFxuXHQgICAgXCI3MTE5MjFcIjogXCLnq7nltI7kuaFcIixcblx0ICAgIFwiNzExOTIyXCI6IFwi6Zi/6YeM5bGx5LmhXCIsXG5cdCAgICBcIjcxMTkyM1wiOiBcIuS4reWflOS5oVwiLFxuXHQgICAgXCI3MTE5MjRcIjogXCLlpKfln5TkuaFcIixcblx0ICAgIFwiNzExOTI1XCI6IFwi5rC05LiK5LmhXCIsXG5cdCAgICBcIjcxMTkyNlwiOiBcIum5v+iNieS5oVwiLFxuXHQgICAgXCI3MTE5MjdcIjogXCLlpKrkv53luIJcIixcblx0ICAgIFwiNzExOTI4XCI6IFwi5py05a2Q5biCXCIsXG5cdCAgICBcIjcxMTkyOVwiOiBcIuS4nOefs+S5oVwiLFxuXHQgICAgXCI3MTE5MzBcIjogXCLlha3ohJrkuaFcIixcblx0ICAgIFwiNzExOTMxXCI6IFwi5paw5riv5LmhXCIsXG5cdCAgICBcIjcxMTkzMlwiOiBcIuawkembhOS5oVwiLFxuXHQgICAgXCI3MTE5MzNcIjogXCLlpKfmnpfplYdcIixcblx0ICAgIFwiNzExOTM0XCI6IFwi5rqq5Y+j5LmhXCIsXG5cdCAgICBcIjcxMTkzNVwiOiBcIuS5ieerueS5oVwiLFxuXHQgICAgXCI3MTE5MzZcIjogXCLluIPooovplYdcIixcblx0ICAgIFwiNzEyMTAwXCI6IFwi5LqR5p6X5Y6/XCIsXG5cdCAgICBcIjcxMjEyMVwiOiBcIuaWl+WNl+mVh1wiLFxuXHQgICAgXCI3MTIxMjJcIjogXCLlpKfln6TkuaFcIixcblx0ICAgIFwiNzEyMTIzXCI6IFwi6JmO5bC+6ZWHXCIsXG5cdCAgICBcIjcxMjEyNFwiOiBcIuWcn+W6k+mVh1wiLFxuXHQgICAgXCI3MTIxMjVcIjogXCLopJLlv6DkuaFcIixcblx0ICAgIFwiNzEyMTI2XCI6IFwi5Lic5Yq/5LmhXCIsXG5cdCAgICBcIjcxMjEyN1wiOiBcIuWPsOilv+S5oVwiLFxuXHQgICAgXCI3MTIxMjhcIjogXCLku5Hog4zkuaFcIixcblx0ICAgIFwiNzEyMTI5XCI6IFwi6bqm5a+u5LmhXCIsXG5cdCAgICBcIjcxMjEzMFwiOiBcIuaWl+WFreW4glwiLFxuXHQgICAgXCI3MTIxMzFcIjogXCLmnpflhoXkuaFcIixcblx0ICAgIFwiNzEyMTMyXCI6IFwi5Y+k5Z2R5LmhXCIsXG5cdCAgICBcIjcxMjEzM1wiOiBcIuiOv+ahkOS5oVwiLFxuXHQgICAgXCI3MTIxMzRcIjogXCLopb/onrrplYdcIixcblx0ICAgIFwiNzEyMTM1XCI6IFwi5LqM5LuR5LmhXCIsXG5cdCAgICBcIjcxMjEzNlwiOiBcIuWMl+a4r+mVh1wiLFxuXHQgICAgXCI3MTIxMzdcIjogXCLmsLTmnpfkuaFcIixcblx0ICAgIFwiNzEyMTM4XCI6IFwi5Y+j5rmW5LmhXCIsXG5cdCAgICBcIjcxMjEzOVwiOiBcIuWbm+a5luS5oVwiLFxuXHQgICAgXCI3MTIxNDBcIjogXCLlhYPplb/kuaFcIixcblx0ICAgIFwiNzEyNDAwXCI6IFwi5bGP5Lic5Y6/XCIsXG5cdCAgICBcIjcxMjQzNFwiOiBcIuWxj+S4nOW4glwiLFxuXHQgICAgXCI3MTI0MzVcIjogXCLkuInlnLDpl6jkuaFcIixcblx0ICAgIFwiNzEyNDM2XCI6IFwi6Zu+5Y+w5LmhXCIsXG5cdCAgICBcIjcxMjQzN1wiOiBcIueOm+WutuS5oVwiLFxuXHQgICAgXCI3MTI0MzhcIjogXCLkuZ3lpoLkuaFcIixcblx0ICAgIFwiNzEyNDM5XCI6IFwi6YeM5riv5LmhXCIsXG5cdCAgICBcIjcxMjQ0MFwiOiBcIumrmOagkeS5oVwiLFxuXHQgICAgXCI3MTI0NDFcIjogXCLnm5Dln5TkuaFcIixcblx0ICAgIFwiNzEyNDQyXCI6IFwi6ZW/5rK75LmhXCIsXG5cdCAgICBcIjcxMjQ0M1wiOiBcIum6n+a0m+S5oVwiLFxuXHQgICAgXCI3MTI0NDRcIjogXCLnq7nnlLDkuaFcIixcblx0ICAgIFwiNzEyNDQ1XCI6IFwi5YaF5Z+U5LmhXCIsXG5cdCAgICBcIjcxMjQ0NlwiOiBcIuS4h+S4ueS5oVwiLFxuXHQgICAgXCI3MTI0NDdcIjogXCLmva7lt57plYdcIixcblx0ICAgIFwiNzEyNDQ4XCI6IFwi5rOw5q2m5LmhXCIsXG5cdCAgICBcIjcxMjQ0OVwiOiBcIuadpeS5ieS5oVwiLFxuXHQgICAgXCI3MTI0NTBcIjogXCLkuIfls6bkuaFcIixcblx0ICAgIFwiNzEyNDUxXCI6IFwi5bSB6aG25LmhXCIsXG5cdCAgICBcIjcxMjQ1MlwiOiBcIuaWsOWfpOS5oVwiLFxuXHQgICAgXCI3MTI0NTNcIjogXCLljZflt57kuaFcIixcblx0ICAgIFwiNzEyNDU0XCI6IFwi5p6X6L655LmhXCIsXG5cdCAgICBcIjcxMjQ1NVwiOiBcIuS4nOa4r+mVh1wiLFxuXHQgICAgXCI3MTI0NTZcIjogXCLnkInnkIPkuaFcIixcblx0ICAgIFwiNzEyNDU3XCI6IFwi5L2z5Yas5LmhXCIsXG5cdCAgICBcIjcxMjQ1OFwiOiBcIuaWsOWbreS5oVwiLFxuXHQgICAgXCI3MTI0NTlcIjogXCLmnovlr67kuaFcIixcblx0ICAgIFwiNzEyNDYwXCI6IFwi5p6L5bGx5LmhXCIsXG5cdCAgICBcIjcxMjQ2MVwiOiBcIuaYpeaXpeS5oVwiLFxuXHQgICAgXCI3MTI0NjJcIjogXCLni67lrZDkuaFcIixcblx0ICAgIFwiNzEyNDYzXCI6IFwi6L2m5Z+O5LmhXCIsXG5cdCAgICBcIjcxMjQ2NFwiOiBcIueJoeS4ueS5oVwiLFxuXHQgICAgXCI3MTI0NjVcIjogXCLmgZLmmKXplYdcIixcblx0ICAgIFwiNzEyNDY2XCI6IFwi5ruh5bee5LmhXCIsXG5cdCAgICBcIjcxMjUwMFwiOiBcIuWPsOS4nOWOv1wiLFxuXHQgICAgXCI3MTI1MTdcIjogXCLlj7DkuJzluIJcIixcblx0ICAgIFwiNzEyNTE4XCI6IFwi57u/5bKb5LmhXCIsXG5cdCAgICBcIjcxMjUxOVwiOiBcIuWFsOWxv+S5oVwiLFxuXHQgICAgXCI3MTI1MjBcIjogXCLlu7blubPkuaFcIixcblx0ICAgIFwiNzEyNTIxXCI6IFwi5Y2R5Y2X5LmhXCIsXG5cdCAgICBcIjcxMjUyMlwiOiBcIum5v+mHjuS5oVwiLFxuXHQgICAgXCI3MTI1MjNcIjogXCLlhbPlsbHplYdcIixcblx0ICAgIFwiNzEyNTI0XCI6IFwi5rW356uv5LmhXCIsXG5cdCAgICBcIjcxMjUyNVwiOiBcIuaxoOS4iuS5oVwiLFxuXHQgICAgXCI3MTI1MjZcIjogXCLkuJzmsrPkuaFcIixcblx0ICAgIFwiNzEyNTI3XCI6IFwi5oiQ5Yqf6ZWHXCIsXG5cdCAgICBcIjcxMjUyOFwiOiBcIumVv+a7qOS5oVwiLFxuXHQgICAgXCI3MTI1MjlcIjogXCLph5Hls7DkuaFcIixcblx0ICAgIFwiNzEyNTMwXCI6IFwi5aSn5q2m5LmhXCIsXG5cdCAgICBcIjcxMjUzMVwiOiBcIui+vuS7geS5oVwiLFxuXHQgICAgXCI3MTI1MzJcIjogXCLlpKrpurvph4zkuaFcIixcblx0ICAgIFwiNzEyNjAwXCI6IFwi6Iqx6I6y5Y6/XCIsXG5cdCAgICBcIjcxMjYxNVwiOiBcIuiKseiOsuW4glwiLFxuXHQgICAgXCI3MTI2MTZcIjogXCLmlrDln47kuaFcIixcblx0ICAgIFwiNzEyNjE3XCI6IFwi5aSq6bKB6ZiBXCIsXG5cdCAgICBcIjcxMjYxOFwiOiBcIuengOael+S5oVwiLFxuXHQgICAgXCI3MTI2MTlcIjogXCLlkInlronkuaFcIixcblx0ICAgIFwiNzEyNjIwXCI6IFwi5a+/5Liw5LmhXCIsXG5cdCAgICBcIjcxMjYyMVwiOiBcIuWHpOael+mVh1wiLFxuXHQgICAgXCI3MTI2MjJcIjogXCLlhYnlpI3kuaFcIixcblx0ICAgIFwiNzEyNjIzXCI6IFwi5Liw5ruo5LmhXCIsXG5cdCAgICBcIjcxMjYyNFwiOiBcIueRnuepl+S5oVwiLFxuXHQgICAgXCI3MTI2MjVcIjogXCLkuIfojaPkuaFcIixcblx0ICAgIFwiNzEyNjI2XCI6IFwi546J6YeM6ZWHXCIsXG5cdCAgICBcIjcxMjYyN1wiOiBcIuWNk+a6quS5oVwiLFxuXHQgICAgXCI3MTI2MjhcIjogXCLlr4zph4zkuaFcIixcblx0ICAgIFwiNzEyNzAwXCI6IFwi5r6O5rmW5Y6/XCIsXG5cdCAgICBcIjcxMjcwN1wiOiBcIumprOWFrOW4glwiLFxuXHQgICAgXCI3MTI3MDhcIjogXCLopb/lsb/kuaFcIixcblx0ICAgIFwiNzEyNzA5XCI6IFwi5pyb5a6J5LmhXCIsXG5cdCAgICBcIjcxMjcxMFwiOiBcIuS4g+e+juS5oVwiLFxuXHQgICAgXCI3MTI3MTFcIjogXCLnmb3mspnkuaFcIixcblx0ICAgIFwiNzEyNzEyXCI6IFwi5rmW6KW/5LmhXCIsXG5cdCAgICBcIjcxMjgwMFwiOiBcIui/nuaxn+WOv1wiLFxuXHQgICAgXCI3MTI4MDVcIjogXCLljZfnq7/kuaFcIixcblx0ICAgIFwiNzEyODA2XCI6IFwi5YyX56u/5LmhXCIsXG5cdCAgICBcIjcxMjgwN1wiOiBcIuiOkuWFieS5oVwiLFxuXHQgICAgXCI3MTI4MDhcIjogXCLkuJzlvJXkuaFcIixcblx0ICAgIFwiODEwMDAwXCI6IFwi6aaZ5riv54m55Yir6KGM5pS/5Yy6XCIsXG5cdCAgICBcIjgxMDEwMFwiOiBcIummmea4r+Wym1wiLFxuXHQgICAgXCI4MTAxMDFcIjogXCLkuK3opb/ljLpcIixcblx0ICAgIFwiODEwMTAyXCI6IFwi5rm+5LuUXCIsXG5cdCAgICBcIjgxMDEwM1wiOiBcIuS4nOWMulwiLFxuXHQgICAgXCI4MTAxMDRcIjogXCLljZfljLpcIixcblx0ICAgIFwiODEwMjAwXCI6IFwi5Lmd6b6ZXCIsXG5cdCAgICBcIjgxMDIwMVwiOiBcIuS5nem+meWfjuWMulwiLFxuXHQgICAgXCI4MTAyMDJcIjogXCLmsrnlsJbml7rljLpcIixcblx0ICAgIFwiODEwMjAzXCI6IFwi5rex5rC05Z+X5Yy6XCIsXG5cdCAgICBcIjgxMDIwNFwiOiBcIum7hOWkp+S7meWMulwiLFxuXHQgICAgXCI4MTAyMDVcIjogXCLop4LloZjljLpcIixcblx0ICAgIFwiODEwMzAwXCI6IFwi5paw55WMXCIsXG5cdCAgICBcIjgxMDMwMVwiOiBcIuWMl+WMulwiLFxuXHQgICAgXCI4MTAzMDJcIjogXCLlpKfln5TljLpcIixcblx0ICAgIFwiODEwMzAzXCI6IFwi5rKZ55Sw5Yy6XCIsXG5cdCAgICBcIjgxMDMwNFwiOiBcIuilv+i0oeWMulwiLFxuXHQgICAgXCI4MTAzMDVcIjogXCLlhYPmnJfljLpcIixcblx0ICAgIFwiODEwMzA2XCI6IFwi5bGv6Zeo5Yy6XCIsXG5cdCAgICBcIjgxMDMwN1wiOiBcIuiNg+a5vuWMulwiLFxuXHQgICAgXCI4MTAzMDhcIjogXCLokbXpnZLljLpcIixcblx0ICAgIFwiODEwMzA5XCI6IFwi56a75bKb5Yy6XCIsXG5cdCAgICBcIjgyMDAwMFwiOiBcIua+s+mXqOeJueWIq+ihjOaUv+WMulwiLFxuXHQgICAgXCI4MjAxMDBcIjogXCLmvrPpl6jljYrlsptcIixcblx0ICAgIFwiODIwMjAwXCI6IFwi56a75bKbXCIsXG5cdCAgICBcIjk5MDAwMFwiOiBcIua1t+WkllwiLFxuXHQgICAgXCI5OTAxMDBcIjogXCLmtbflpJZcIlxuXHR9XG5cblx0Ly8gaWQgcGlkL3BhcmVudElkIG5hbWUgY2hpbGRyZW5cblx0ZnVuY3Rpb24gdHJlZShsaXN0KSB7XG5cdCAgICB2YXIgbWFwcGVkID0ge31cblx0ICAgIGZvciAodmFyIGkgPSAwLCBpdGVtOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIGl0ZW0gPSBsaXN0W2ldXG5cdCAgICAgICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlkKSBjb250aW51ZVxuXHQgICAgICAgIG1hcHBlZFtpdGVtLmlkXSA9IGl0ZW1cblx0ICAgIH1cblxuXHQgICAgdmFyIHJlc3VsdCA9IFtdXG5cdCAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbGlzdC5sZW5ndGg7IGlpKyspIHtcblx0ICAgICAgICBpdGVtID0gbGlzdFtpaV1cblxuXHQgICAgICAgIGlmICghaXRlbSkgY29udGludWVcblx0ICAgICAgICAgICAgLyoganNoaW50IC1XMDQxICovXG5cdCAgICAgICAgaWYgKGl0ZW0ucGlkID09IHVuZGVmaW5lZCAmJiBpdGVtLnBhcmVudElkID09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcGFyZW50ID0gbWFwcGVkW2l0ZW0ucGlkXSB8fCBtYXBwZWRbaXRlbS5wYXJlbnRJZF1cblx0ICAgICAgICBpZiAoIXBhcmVudCkgY29udGludWVcblx0ICAgICAgICBpZiAoIXBhcmVudC5jaGlsZHJlbikgcGFyZW50LmNoaWxkcmVuID0gW11cblx0ICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChpdGVtKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0dmFyIERJQ1RfRklYRUQgPSBmdW5jdGlvbigpIHtcblx0ICAgIHZhciBmaXhlZCA9IFtdXG5cdCAgICBmb3IgKHZhciBpZCBpbiBESUNUKSB7XG5cdCAgICAgICAgdmFyIHBpZCA9IGlkLnNsaWNlKDIsIDYpID09PSAnMDAwMCcgPyB1bmRlZmluZWQgOlxuXHQgICAgICAgICAgICBpZC5zbGljZSg0LCA2KSA9PSAnMDAnID8gKGlkLnNsaWNlKDAsIDIpICsgJzAwMDAnKSA6XG5cdCAgICAgICAgICAgIGlkLnNsaWNlKDAsIDQpICsgJzAwJ1xuXHQgICAgICAgIGZpeGVkLnB1c2goe1xuXHQgICAgICAgICAgICBpZDogaWQsXG5cdCAgICAgICAgICAgIHBpZDogcGlkLFxuXHQgICAgICAgICAgICBuYW1lOiBESUNUW2lkXVxuXHQgICAgICAgIH0pXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdHJlZShmaXhlZClcblx0fSgpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBESUNUX0ZJWEVEXG5cbi8qKiovIH0sXG4vKiAxOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIE1pc2NlbGxhbmVvdXNcblx0Ki9cblx0dmFyIERJQ1QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KVxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHQvLyBEaWNlXG5cdFx0ZDQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubmF0dXJhbCgxLCA0KVxuXHRcdH0sXG5cdFx0ZDY6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubmF0dXJhbCgxLCA2KVxuXHRcdH0sXG5cdFx0ZDg6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubmF0dXJhbCgxLCA4KVxuXHRcdH0sXG5cdFx0ZDEyOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMTIpXG5cdFx0fSxcblx0XHRkMjA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubmF0dXJhbCgxLCAyMClcblx0XHR9LFxuXHRcdGQxMDA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubmF0dXJhbCgxLCAxMDApXG5cdFx0fSxcblx0XHQvKlxuXHRcdCAgICDpmo/mnLrnlJ/miJDkuIDkuKogR1VJROOAglxuXG5cdFx0ICAgIGh0dHA6Ly93d3cuYnJvb2ZhLmNvbS8yMDA4LzA5L2phdmFzY3JpcHQtdXVpZC1mdW5jdGlvbi9cblx0XHQgICAgW1VVSUQg6KeE6IyDXShodHRwOi8vd3d3LmlldGYub3JnL3JmYy9yZmM0MTIyLnR4dClcblx0XHQgICAgICAgIFVVSURzIChVbml2ZXJzYWxseSBVbmlxdWUgSURlbnRpZmllcilcblx0XHQgICAgICAgIEdVSURzIChHbG9iYWxseSBVbmlxdWUgSURlbnRpZmllcilcblx0XHQgICAgICAgIFRoZSBmb3JtYWwgZGVmaW5pdGlvbiBvZiB0aGUgVVVJRCBzdHJpbmcgcmVwcmVzZW50YXRpb24gaXMgcHJvdmlkZWQgYnkgdGhlIGZvbGxvd2luZyBBQk5GIFs3XTpcblx0XHQgICAgICAgICAgICBVVUlEICAgICAgICAgICAgICAgICAgID0gdGltZS1sb3cgXCItXCIgdGltZS1taWQgXCItXCJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUtaGlnaC1hbmQtdmVyc2lvbiBcIi1cIlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2stc2VxLWFuZC1yZXNlcnZlZFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2stc2VxLWxvdyBcIi1cIiBub2RlXG5cdFx0ICAgICAgICAgICAgdGltZS1sb3cgICAgICAgICAgICAgICA9IDRoZXhPY3RldFxuXHRcdCAgICAgICAgICAgIHRpbWUtbWlkICAgICAgICAgICAgICAgPSAyaGV4T2N0ZXRcblx0XHQgICAgICAgICAgICB0aW1lLWhpZ2gtYW5kLXZlcnNpb24gID0gMmhleE9jdGV0XG5cdFx0ICAgICAgICAgICAgY2xvY2stc2VxLWFuZC1yZXNlcnZlZCA9IGhleE9jdGV0XG5cdFx0ICAgICAgICAgICAgY2xvY2stc2VxLWxvdyAgICAgICAgICA9IGhleE9jdGV0XG5cdFx0ICAgICAgICAgICAgbm9kZSAgICAgICAgICAgICAgICAgICA9IDZoZXhPY3RldFxuXHRcdCAgICAgICAgICAgIGhleE9jdGV0ICAgICAgICAgICAgICAgPSBoZXhEaWdpdCBoZXhEaWdpdFxuXHRcdCAgICAgICAgICAgIGhleERpZ2l0ID1cblx0XHQgICAgICAgICAgICAgICAgXCIwXCIgLyBcIjFcIiAvIFwiMlwiIC8gXCIzXCIgLyBcIjRcIiAvIFwiNVwiIC8gXCI2XCIgLyBcIjdcIiAvIFwiOFwiIC8gXCI5XCIgL1xuXHRcdCAgICAgICAgICAgICAgICBcImFcIiAvIFwiYlwiIC8gXCJjXCIgLyBcImRcIiAvIFwiZVwiIC8gXCJmXCIgL1xuXHRcdCAgICAgICAgICAgICAgICBcIkFcIiAvIFwiQlwiIC8gXCJDXCIgLyBcIkRcIiAvIFwiRVwiIC8gXCJGXCJcblx0XHQgICAgXG5cdFx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS92aWN0b3JxdWlubi9jaGFuY2Vqcy9ibG9iL2RldmVsb3AvY2hhbmNlLmpzI0wxMzQ5XG5cdFx0Ki9cblx0XHRndWlkOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBwb29sID0gXCJhYmNkZWZBQkNERUYxMjM0NTY3ODkwXCIsXG5cdFx0XHRcdGd1aWQgPSB0aGlzLnN0cmluZyhwb29sLCA4KSArICctJyArXG5cdFx0XHRcdHRoaXMuc3RyaW5nKHBvb2wsIDQpICsgJy0nICtcblx0XHRcdFx0dGhpcy5zdHJpbmcocG9vbCwgNCkgKyAnLScgK1xuXHRcdFx0XHR0aGlzLnN0cmluZyhwb29sLCA0KSArICctJyArXG5cdFx0XHRcdHRoaXMuc3RyaW5nKHBvb2wsIDEyKTtcblx0XHRcdHJldHVybiBndWlkXG5cdFx0fSxcblx0XHR1dWlkOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmd1aWQoKVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgICAg6ZqP5py655Sf5oiQ5LiA5LiqIDE4IOS9jei6q+S7veivgeOAglxuXG5cdFx0ICAgIFvouqvku73or4FdKGh0dHA6Ly9iYWlrZS5iYWlkdS5jb20vdmlldy8xNjk3Lmh0bSM0KVxuXHRcdCAgICAgICAg5Zyw5Z2A56CBIDYgKyDlh7rnlJ/ml6XmnJ/noIEgOCArIOmhuuW6j+eggSAzICsg5qCh6aqM56CBIDFcblx0XHQgICAgW+OAiuS4reWNjuS6uuawkeWFseWSjOWbveihjOaUv+WMuuWIkuS7o+eggeOAi+WbveWutuagh+WHhihHQi9UMjI2MCldKGh0dHA6Ly96aGlkYW8uYmFpZHUuY29tL3F1ZXN0aW9uLzE5NTQ1NjEuaHRtbClcblx0XHQqL1xuXHRcdGlkOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpZCxcblx0XHRcdFx0c3VtID0gMCxcblx0XHRcdFx0cmFuayA9IFtcblx0XHRcdFx0XHRcIjdcIiwgXCI5XCIsIFwiMTBcIiwgXCI1XCIsIFwiOFwiLCBcIjRcIiwgXCIyXCIsIFwiMVwiLCBcIjZcIiwgXCIzXCIsIFwiN1wiLCBcIjlcIiwgXCIxMFwiLCBcIjVcIiwgXCI4XCIsIFwiNFwiLCBcIjJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRsYXN0ID0gW1xuXHRcdFx0XHRcdFwiMVwiLCBcIjBcIiwgXCJYXCIsIFwiOVwiLCBcIjhcIiwgXCI3XCIsIFwiNlwiLCBcIjVcIiwgXCI0XCIsIFwiM1wiLCBcIjJcIlxuXHRcdFx0XHRdXG5cblx0XHRcdGlkID0gdGhpcy5waWNrKERJQ1QpLmlkICtcblx0XHRcdFx0dGhpcy5kYXRlKCd5eXl5TU1kZCcpICtcblx0XHRcdFx0dGhpcy5zdHJpbmcoJ251bWJlcicsIDMpXG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0c3VtICs9IGlkW2ldICogcmFua1tpXTtcblx0XHRcdH1cblx0XHRcdGlkICs9IGxhc3Rbc3VtICUgMTFdO1xuXG5cdFx0XHRyZXR1cm4gaWRcblx0XHR9LFxuXG5cdFx0Lypcblx0XHQgICAg55Sf5oiQ5LiA5Liq5YWo5bGA55qE6Ieq5aKe5pW05pWw44CCXG5cdFx0ICAgIOexu+S8vOiHquWinuS4u+mUru+8iGF1dG8gaW5jcmVtZW50IHByaW1hcnkga2V577yJ44CCXG5cdFx0Ki9cblx0XHRpbmNyZW1lbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGtleSA9IDBcblx0XHRcdHJldHVybiBmdW5jdGlvbihzdGVwKSB7XG5cdFx0XHRcdHJldHVybiBrZXkgKz0gKCtzdGVwIHx8IDEpIC8vIHN0ZXA/XG5cdFx0XHR9XG5cdFx0fSgpLFxuXHRcdGluYzogZnVuY3Rpb24oc3RlcCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5jcmVtZW50KHN0ZXApXG5cdFx0fVxuXHR9XG5cbi8qKiovIH0sXG4vKiAyMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpXG5cdHZhciBIYW5kbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMilcblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0UGFyc2VyOiBQYXJzZXIsXG5cdFx0SGFuZGxlcjogSGFuZGxlclxuXHR9XG5cbi8qKiovIH0sXG4vKiAyMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL251eXNvZnQvcmVnZXhwXG5cdC8vIGZvcmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9Gb3JiZXNMaW5kZXNheS9yZWdleHBcblxuXHRmdW5jdGlvbiBwYXJzZShuKSB7XG5cdCAgICBpZiAoXCJzdHJpbmdcIiAhPSB0eXBlb2Ygbikge1xuXHQgICAgICAgIHZhciBsID0gbmV3IFR5cGVFcnJvcihcIlRoZSByZWdleHAgdG8gcGFyc2UgbXVzdCBiZSByZXByZXNlbnRlZCBhcyBhIHN0cmluZy5cIik7XG5cdCAgICAgICAgdGhyb3cgbDtcblx0ICAgIH1cblx0ICAgIHJldHVybiBpbmRleCA9IDEsIGNncyA9IHt9LCBwYXJzZXIucGFyc2Uobik7XG5cdH1cblxuXHRmdW5jdGlvbiBUb2tlbihuKSB7XG5cdCAgICB0aGlzLnR5cGUgPSBuLCB0aGlzLm9mZnNldCA9IFRva2VuLm9mZnNldCgpLCB0aGlzLnRleHQgPSBUb2tlbi50ZXh0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBBbHRlcm5hdGUobiwgbCkge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcImFsdGVybmF0ZVwiKSwgdGhpcy5sZWZ0ID0gbiwgdGhpcy5yaWdodCA9IGw7XG5cdH1cblxuXHRmdW5jdGlvbiBNYXRjaChuKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwibWF0Y2hcIiksIHRoaXMuYm9keSA9IG4uZmlsdGVyKEJvb2xlYW4pO1xuXHR9XG5cblx0ZnVuY3Rpb24gR3JvdXAobiwgbCkge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBuKSwgdGhpcy5ib2R5ID0gbDtcblx0fVxuXG5cdGZ1bmN0aW9uIENhcHR1cmVHcm91cChuKSB7XG5cdCAgICBHcm91cC5jYWxsKHRoaXMsIFwiY2FwdHVyZS1ncm91cFwiKSwgdGhpcy5pbmRleCA9IGNnc1t0aGlzLm9mZnNldF0gfHwgKGNnc1t0aGlzLm9mZnNldF0gPSBpbmRleCsrKSwgXG5cdCAgICB0aGlzLmJvZHkgPSBuO1xuXHR9XG5cblx0ZnVuY3Rpb24gUXVhbnRpZmllZChuLCBsKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwicXVhbnRpZmllZFwiKSwgdGhpcy5ib2R5ID0gbiwgdGhpcy5xdWFudGlmaWVyID0gbDtcblx0fVxuXG5cdGZ1bmN0aW9uIFF1YW50aWZpZXIobiwgbCkge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcInF1YW50aWZpZXJcIiksIHRoaXMubWluID0gbiwgdGhpcy5tYXggPSBsLCB0aGlzLmdyZWVkeSA9ICEwO1xuXHR9XG5cblx0ZnVuY3Rpb24gQ2hhclNldChuLCBsKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwiY2hhcnNldFwiKSwgdGhpcy5pbnZlcnQgPSBuLCB0aGlzLmJvZHkgPSBsO1xuXHR9XG5cblx0ZnVuY3Rpb24gQ2hhcmFjdGVyUmFuZ2UobiwgbCkge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcInJhbmdlXCIpLCB0aGlzLnN0YXJ0ID0gbiwgdGhpcy5lbmQgPSBsO1xuXHR9XG5cblx0ZnVuY3Rpb24gTGl0ZXJhbChuKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwibGl0ZXJhbFwiKSwgdGhpcy5ib2R5ID0gbiwgdGhpcy5lc2NhcGVkID0gdGhpcy5ib2R5ICE9IHRoaXMudGV4dDtcblx0fVxuXG5cdGZ1bmN0aW9uIFVuaWNvZGUobikge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcInVuaWNvZGVcIiksIHRoaXMuY29kZSA9IG4udG9VcHBlckNhc2UoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIEhleChuKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwiaGV4XCIpLCB0aGlzLmNvZGUgPSBuLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBPY3RhbChuKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwib2N0YWxcIiksIHRoaXMuY29kZSA9IG4udG9VcHBlckNhc2UoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIEJhY2tSZWZlcmVuY2Uobikge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcImJhY2stcmVmZXJlbmNlXCIpLCB0aGlzLmNvZGUgPSBuLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBDb250cm9sQ2hhcmFjdGVyKG4pIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJjb250cm9sLWNoYXJhY3RlclwiKSwgdGhpcy5jb2RlID0gbi50b1VwcGVyQ2FzZSgpO1xuXHR9XG5cblx0dmFyIHBhcnNlciA9IGZ1bmN0aW9uKCkge1xuXHQgICAgZnVuY3Rpb24gbihuLCBsKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gdSgpIHtcblx0ICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciA9IG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHUucHJvdG90eXBlID0gbC5wcm90b3R5cGUsIG4ucHJvdG90eXBlID0gbmV3IHUoKTtcblx0ICAgIH1cblx0ICAgIGZ1bmN0aW9uIGwobiwgbCwgdSwgdCwgcikge1xuXHQgICAgICAgIGZ1bmN0aW9uIGUobiwgbCkge1xuXHQgICAgICAgICAgICBmdW5jdGlvbiB1KG4pIHtcblx0ICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGwobikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBuLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbi5yZXBsYWNlKC9cXFxcL2csIFwiXFxcXFxcXFxcIikucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xceDA4L2csIFwiXFxcXGJcIikucmVwbGFjZSgvXFx0L2csIFwiXFxcXHRcIikucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIikucmVwbGFjZSgvXFxmL2csIFwiXFxcXGZcIikucmVwbGFjZSgvXFxyL2csIFwiXFxcXHJcIikucmVwbGFjZSgvW1xceDAwLVxceDA3XFx4MEJcXHgwRVxceDBGXS9nLCBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXFxcXHgwXCIgKyBsKG4pO1xuXHQgICAgICAgICAgICAgICAgfSkucmVwbGFjZSgvW1xceDEwLVxceDFGXFx4ODAtXFx4RkZdL2csIGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcXFxceFwiICsgbChuKTtcblx0ICAgICAgICAgICAgICAgIH0pLnJlcGxhY2UoL1tcXHUwMTgwLVxcdTBGRkZdL2csIGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcXFxcdTBcIiArIGwobik7XG5cdCAgICAgICAgICAgICAgICB9KS5yZXBsYWNlKC9bXFx1MTA4MC1cXHVGRkZGXS9nLCBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXFxcXHVcIiArIGwobik7XG5cdCAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgdCwgcjtcblx0ICAgICAgICAgICAgc3dpdGNoIChuLmxlbmd0aCkge1xuXHQgICAgICAgICAgICAgIGNhc2UgMDpcblx0ICAgICAgICAgICAgICAgIHQgPSBcImVuZCBvZiBpbnB1dFwiO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cblx0ICAgICAgICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgICAgICB0ID0gblswXTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cdCAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHQgPSBuLnNsaWNlKDAsIC0xKS5qb2luKFwiLCBcIikgKyBcIiBvciBcIiArIG5bbi5sZW5ndGggLSAxXTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gciA9IGwgPyAnXCInICsgdShsKSArICdcIicgOiBcImVuZCBvZiBpbnB1dFwiLCBcIkV4cGVjdGVkIFwiICsgdCArIFwiIGJ1dCBcIiArIHIgKyBcIiBmb3VuZC5cIjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5leHBlY3RlZCA9IG4sIHRoaXMuZm91bmQgPSBsLCB0aGlzLm9mZnNldCA9IHUsIHRoaXMubGluZSA9IHQsIHRoaXMuY29sdW1uID0gciwgXG5cdCAgICAgICAgdGhpcy5uYW1lID0gXCJTeW50YXhFcnJvclwiLCB0aGlzLm1lc3NhZ2UgPSBlKG4sIGwpO1xuXHQgICAgfVxuXHQgICAgZnVuY3Rpb24gdShuKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gdSgpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG4uc3Vic3RyaW5nKEx0LCBxdCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHQoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBMdDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gcihsKSB7XG5cdCAgICAgICAgICAgIGZ1bmN0aW9uIHUobCwgdSwgdCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHIsIGU7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHIgPSB1OyB0ID4gcjsgcisrKSBlID0gbi5jaGFyQXQociksIFwiXFxuXCIgPT09IGUgPyAobC5zZWVuQ1IgfHwgbC5saW5lKyssIGwuY29sdW1uID0gMSwgXG5cdCAgICAgICAgICAgICAgICBsLnNlZW5DUiA9ICExKSA6IFwiXFxyXCIgPT09IGUgfHwgXCJcXHUyMDI4XCIgPT09IGUgfHwgXCJcXHUyMDI5XCIgPT09IGUgPyAobC5saW5lKyssIGwuY29sdW1uID0gMSwgXG5cdCAgICAgICAgICAgICAgICBsLnNlZW5DUiA9ICEwKSA6IChsLmNvbHVtbisrLCBsLnNlZW5DUiA9ICExKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gTXQgIT09IGwgJiYgKE10ID4gbCAmJiAoTXQgPSAwLCBEdCA9IHtcblx0ICAgICAgICAgICAgICAgIGxpbmU6IDEsXG5cdCAgICAgICAgICAgICAgICBjb2x1bW46IDEsXG5cdCAgICAgICAgICAgICAgICBzZWVuQ1I6ICExXG5cdCAgICAgICAgICAgIH0pLCB1KER0LCBNdCwgbCksIE10ID0gbCksIER0O1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBlKG4pIHtcblx0ICAgICAgICAgICAgSHQgPiBxdCB8fCAocXQgPiBIdCAmJiAoSHQgPSBxdCwgT3QgPSBbXSksIE90LnB1c2gobikpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBvKG4pIHtcblx0ICAgICAgICAgICAgdmFyIGwgPSAwO1xuXHQgICAgICAgICAgICBmb3IgKG4uc29ydCgpOyBsIDwgbi5sZW5ndGg7ICkgbltsIC0gMV0gPT09IG5bbF0gPyBuLnNwbGljZShsLCAxKSA6IGwrKztcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gYygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHIsIG87XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIHUgPSBpKCksIG51bGwgIT09IHUgPyAodCA9IHF0LCAxMjQgPT09IG4uY2hhckNvZGVBdChxdCkgPyAociA9IGZsLCBcblx0ICAgICAgICAgICAgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUoc2wpKSwgbnVsbCAhPT0gciA/IChvID0gYygpLCBudWxsICE9PSBvID8gKHIgPSBbIHIsIG8gXSwgXG5cdCAgICAgICAgICAgIHQgPSByKSA6IChxdCA9IHQsIHQgPSBpbCkpIDogKHF0ID0gdCwgdCA9IGlsKSwgbnVsbCA9PT0gdCAmJiAodCA9IGFsKSwgbnVsbCAhPT0gdCA/IChMdCA9IGwsIFxuXHQgICAgICAgICAgICB1ID0gaGwodSwgdCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBpKCkge1xuXHQgICAgICAgICAgICB2YXIgbiwgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgaWYgKG4gPSBxdCwgbCA9IGYoKSwgbnVsbCA9PT0gbCAmJiAobCA9IGFsKSwgbnVsbCAhPT0gbCkgaWYgKHUgPSBxdCwgV3QrKywgdCA9IGQoKSwgXG5cdCAgICAgICAgICAgIFd0LS0sIG51bGwgPT09IHQgPyB1ID0gYWwgOiAocXQgPSB1LCB1ID0gaWwpLCBudWxsICE9PSB1KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHQgPSBbXSwgciA9IGgoKSwgbnVsbCA9PT0gciAmJiAociA9IGEoKSk7IG51bGwgIT09IHI7ICkgdC5wdXNoKHIpLCByID0gaCgpLCBcblx0ICAgICAgICAgICAgICAgIG51bGwgPT09IHIgJiYgKHIgPSBhKCkpO1xuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gdCA/IChyID0gcygpLCBudWxsID09PSByICYmIChyID0gYWwpLCBudWxsICE9PSByID8gKEx0ID0gbiwgbCA9IGRsKGwsIHQsIHIpLCBcblx0ICAgICAgICAgICAgICAgIG51bGwgPT09IGwgPyAocXQgPSBuLCBuID0gbCkgOiBuID0gbCkgOiAocXQgPSBuLCBuID0gaWwpKSA6IChxdCA9IG4sIG4gPSBpbCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSBxdCA9IG4sIG4gPSBpbDsgZWxzZSBxdCA9IG4sIG4gPSBpbDtcblx0ICAgICAgICAgICAgcmV0dXJuIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGEoKSB7XG5cdCAgICAgICAgICAgIHZhciBuO1xuXHQgICAgICAgICAgICByZXR1cm4gbiA9IHgoKSwgbnVsbCA9PT0gbiAmJiAobiA9IFEoKSwgbnVsbCA9PT0gbiAmJiAobiA9IEIoKSkpLCBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBmKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgOTQgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IHBsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh2bCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gd2woKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gcygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDM2ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBBbCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoQ2wpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IGdsKCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGgoKSB7XG5cdCAgICAgICAgICAgIHZhciBuLCBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbiA9IHF0LCBsID0gYSgpLCBudWxsICE9PSBsID8gKHUgPSBkKCksIG51bGwgIT09IHUgPyAoTHQgPSBuLCBsID0gYmwobCwgdSksIFxuXHQgICAgICAgICAgICBudWxsID09PSBsID8gKHF0ID0gbiwgbiA9IGwpIDogbiA9IGwpIDogKHF0ID0gbiwgbiA9IGlsKSkgOiAocXQgPSBuLCBuID0gaWwpLCBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBkKCkge1xuXHQgICAgICAgICAgICB2YXIgbiwgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIFd0KyssIG4gPSBxdCwgbCA9IHAoKSwgbnVsbCAhPT0gbCA/ICh1ID0gaygpLCBudWxsID09PSB1ICYmICh1ID0gYWwpLCBudWxsICE9PSB1ID8gKEx0ID0gbiwgXG5cdCAgICAgICAgICAgIGwgPSBUbChsLCB1KSwgbnVsbCA9PT0gbCA/IChxdCA9IG4sIG4gPSBsKSA6IG4gPSBsKSA6IChxdCA9IG4sIG4gPSBpbCkpIDogKHF0ID0gbiwgXG5cdCAgICAgICAgICAgIG4gPSBpbCksIFd0LS0sIG51bGwgPT09IG4gJiYgKGwgPSBudWxsLCAwID09PSBXdCAmJiBlKGtsKSksIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHAoKSB7XG5cdCAgICAgICAgICAgIHZhciBuO1xuXHQgICAgICAgICAgICByZXR1cm4gbiA9IHYoKSwgbnVsbCA9PT0gbiAmJiAobiA9IHcoKSwgbnVsbCA9PT0gbiAmJiAobiA9IEEoKSwgbnVsbCA9PT0gbiAmJiAobiA9IEMoKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBnKCksIG51bGwgPT09IG4gJiYgKG4gPSBiKCkpKSkpKSwgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gdigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHIsIG8sIGM7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDEyMyA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0geGwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHlsKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKHQgPSBUKCksIG51bGwgIT09IHQgPyAoNDQgPT09IG4uY2hhckNvZGVBdChxdCkgPyAociA9IG1sLCBxdCsrKSA6IChyID0gbnVsbCwgXG5cdCAgICAgICAgICAgIDAgPT09IFd0ICYmIGUoUmwpKSwgbnVsbCAhPT0gciA/IChvID0gVCgpLCBudWxsICE9PSBvID8gKDEyNSA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/IChjID0gRmwsIFxuXHQgICAgICAgICAgICBxdCsrKSA6IChjID0gbnVsbCwgMCA9PT0gV3QgJiYgZShRbCkpLCBudWxsICE9PSBjID8gKEx0ID0gbCwgdSA9IFNsKHQsIG8pLCBudWxsID09PSB1ID8gKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHcoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCAxMjMgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IHhsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh5bCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/ICh0ID0gVCgpLCBudWxsICE9PSB0ID8gKG4uc3Vic3RyKHF0LCAyKSA9PT0gVWwgPyAociA9IFVsLCBxdCArPSAyKSA6IChyID0gbnVsbCwgXG5cdCAgICAgICAgICAgIDAgPT09IFd0ICYmIGUoRWwpKSwgbnVsbCAhPT0gciA/IChMdCA9IGwsIHUgPSBHbCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gQSgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDEyMyA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0geGwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHlsKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKHQgPSBUKCksIG51bGwgIT09IHQgPyAoMTI1ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHIgPSBGbCwgcXQrKykgOiAociA9IG51bGwsIFxuXHQgICAgICAgICAgICAwID09PSBXdCAmJiBlKFFsKSksIG51bGwgIT09IHIgPyAoTHQgPSBsLCB1ID0gQmwodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEMoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA0MyA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gamwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKCRsKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBxbCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBnKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgNDIgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IExsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShNbCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gRGwoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gYigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDYzID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBIbCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoT2wpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IFdsKCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGsoKSB7XG5cdCAgICAgICAgICAgIHZhciBsO1xuXHQgICAgICAgICAgICByZXR1cm4gNjMgPT09IG4uY2hhckNvZGVBdChxdCkgPyAobCA9IEhsLCBxdCsrKSA6IChsID0gbnVsbCwgMCA9PT0gV3QgJiYgZShPbCkpLCBcblx0ICAgICAgICAgICAgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gVCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQ7XG5cdCAgICAgICAgICAgIGlmIChsID0gcXQsIHUgPSBbXSwgemwudGVzdChuLmNoYXJBdChxdCkpID8gKHQgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHQgPSBudWxsLCBcblx0ICAgICAgICAgICAgMCA9PT0gV3QgJiYgZShJbCkpLCBudWxsICE9PSB0KSBmb3IgKDtudWxsICE9PSB0OyApIHUucHVzaCh0KSwgemwudGVzdChuLmNoYXJBdChxdCkpID8gKHQgPSBuLmNoYXJBdChxdCksIFxuXHQgICAgICAgICAgICBxdCsrKSA6ICh0ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShJbCkpOyBlbHNlIHUgPSBpbDtcblx0ICAgICAgICAgICAgcmV0dXJuIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IEpsKHUpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBcblx0ICAgICAgICAgICAgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24geCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDQwID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBLbCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoTmwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAodCA9IFIoKSwgbnVsbCA9PT0gdCAmJiAodCA9IEYoKSwgbnVsbCA9PT0gdCAmJiAodCA9IG0oKSwgbnVsbCA9PT0gdCAmJiAodCA9IHkoKSkpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHQgPyAoNDEgPT09IG4uY2hhckNvZGVBdChxdCkgPyAociA9IFBsLCBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShWbCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gciA/IChMdCA9IGwsIHUgPSBYbCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24geSgpIHtcblx0ICAgICAgICAgICAgdmFyIG4sIGw7XG5cdCAgICAgICAgICAgIHJldHVybiBuID0gcXQsIGwgPSBjKCksIG51bGwgIT09IGwgJiYgKEx0ID0gbiwgbCA9IFlsKGwpKSwgbnVsbCA9PT0gbCA/IChxdCA9IG4sIFxuXHQgICAgICAgICAgICBuID0gbCkgOiBuID0gbCwgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gbSgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQ7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gWmwgPyAodSA9IFpsLCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShfbCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/ICh0ID0gYygpLCBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IG51KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gUigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQ7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gbHUgPyAodSA9IGx1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh1dSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/ICh0ID0gYygpLCBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IHR1KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gRigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQ7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gcnUgPyAodSA9IHJ1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShldSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/ICh0ID0gYygpLCBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IG91KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gUSgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHIsIG87XG5cdCAgICAgICAgICAgIGlmIChXdCsrLCBsID0gcXQsIDkxID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBpdSwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoYXUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUpIGlmICg5NCA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh0ID0gcGwsIHF0KyspIDogKHQgPSBudWxsLCAwID09PSBXdCAmJiBlKHZsKSksIFxuXHQgICAgICAgICAgICBudWxsID09PSB0ICYmICh0ID0gYWwpLCBudWxsICE9PSB0KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHIgPSBbXSwgbyA9IFMoKSwgbnVsbCA9PT0gbyAmJiAobyA9IFUoKSk7IG51bGwgIT09IG87ICkgci5wdXNoKG8pLCBvID0gUygpLCBcblx0ICAgICAgICAgICAgICAgIG51bGwgPT09IG8gJiYgKG8gPSBVKCkpO1xuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gciA/ICg5MyA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/IChvID0gZnUsIHF0KyspIDogKG8gPSBudWxsLCAwID09PSBXdCAmJiBlKHN1KSksIFxuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gbyA/IChMdCA9IGwsIHUgPSBodSh0LCByKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpO1xuXHQgICAgICAgICAgICB9IGVsc2UgcXQgPSBsLCBsID0gaWw7IGVsc2UgcXQgPSBsLCBsID0gaWw7XG5cdCAgICAgICAgICAgIHJldHVybiBXdC0tLCBudWxsID09PSBsICYmICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShjdSkpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBTKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgcmV0dXJuIFd0KyssIGwgPSBxdCwgdSA9IFUoKSwgbnVsbCAhPT0gdSA/ICg0NSA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh0ID0gcHUsIHF0KyspIDogKHQgPSBudWxsLCBcblx0ICAgICAgICAgICAgMCA9PT0gV3QgJiYgZSh2dSkpLCBudWxsICE9PSB0ID8gKHIgPSBVKCksIG51bGwgIT09IHIgPyAoTHQgPSBsLCB1ID0gd3UodSwgciksIG51bGwgPT09IHUgPyAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIFd0LS0sIFxuXHQgICAgICAgICAgICBudWxsID09PSBsICYmICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShkdSkpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBVKCkge1xuXHQgICAgICAgICAgICB2YXIgbiwgbDtcblx0ICAgICAgICAgICAgcmV0dXJuIFd0KyssIG4gPSBHKCksIG51bGwgPT09IG4gJiYgKG4gPSBFKCkpLCBXdC0tLCBudWxsID09PSBuICYmIChsID0gbnVsbCwgMCA9PT0gV3QgJiYgZShBdSkpLCBcblx0ICAgICAgICAgICAgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gRSgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIEN1LnRlc3Qobi5jaGFyQXQocXQpKSA/ICh1ID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShndSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gYnUodSkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEcoKSB7XG5cdCAgICAgICAgICAgIHZhciBuO1xuXHQgICAgICAgICAgICByZXR1cm4gbiA9IEwoKSwgbnVsbCA9PT0gbiAmJiAobiA9IFkoKSwgbnVsbCA9PT0gbiAmJiAobiA9IEgoKSwgbnVsbCA9PT0gbiAmJiAobiA9IE8oKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBXKCksIG51bGwgPT09IG4gJiYgKG4gPSB6KCksIG51bGwgPT09IG4gJiYgKG4gPSBJKCksIG51bGwgPT09IG4gJiYgKG4gPSBKKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gSygpLCBudWxsID09PSBuICYmIChuID0gTigpLCBudWxsID09PSBuICYmIChuID0gUCgpLCBudWxsID09PSBuICYmIChuID0gVigpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IFgoKSwgbnVsbCA9PT0gbiAmJiAobiA9IF8oKSwgbnVsbCA9PT0gbiAmJiAobiA9IG5sKCksIG51bGwgPT09IG4gJiYgKG4gPSBsbCgpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IHVsKCksIG51bGwgPT09IG4gJiYgKG4gPSB0bCgpKSkpKSkpKSkpKSkpKSkpKSksIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEIoKSB7XG5cdCAgICAgICAgICAgIHZhciBuO1xuXHQgICAgICAgICAgICByZXR1cm4gbiA9IGooKSwgbnVsbCA9PT0gbiAmJiAobiA9IHEoKSwgbnVsbCA9PT0gbiAmJiAobiA9ICQoKSkpLCBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBqKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgNDYgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IGt1LCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShUdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0geHUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gJCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBXdCsrLCBsID0gcXQsIG11LnRlc3Qobi5jaGFyQXQocXQpKSA/ICh1ID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6ICh1ID0gbnVsbCwgXG5cdCAgICAgICAgICAgIDAgPT09IFd0ICYmIGUoUnUpKSwgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gYnUodSkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIFxuXHQgICAgICAgICAgICBXdC0tLCBudWxsID09PSBsICYmICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh5dSkpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBxKCkge1xuXHQgICAgICAgICAgICB2YXIgbjtcblx0ICAgICAgICAgICAgcmV0dXJuIG4gPSBNKCksIG51bGwgPT09IG4gJiYgKG4gPSBEKCksIG51bGwgPT09IG4gJiYgKG4gPSBZKCksIG51bGwgPT09IG4gJiYgKG4gPSBIKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gTygpLCBudWxsID09PSBuICYmIChuID0gVygpLCBudWxsID09PSBuICYmIChuID0geigpLCBudWxsID09PSBuICYmIChuID0gSSgpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IEooKSwgbnVsbCA9PT0gbiAmJiAobiA9IEsoKSwgbnVsbCA9PT0gbiAmJiAobiA9IE4oKSwgbnVsbCA9PT0gbiAmJiAobiA9IFAoKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBWKCksIG51bGwgPT09IG4gJiYgKG4gPSBYKCksIG51bGwgPT09IG4gJiYgKG4gPSBaKCksIG51bGwgPT09IG4gJiYgKG4gPSBfKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gbmwoKSwgbnVsbCA9PT0gbiAmJiAobiA9IGxsKCksIG51bGwgPT09IG4gJiYgKG4gPSB1bCgpLCBudWxsID09PSBuICYmIChuID0gdGwoKSkpKSkpKSkpKSkpKSkpKSkpKSksIFxuXHQgICAgICAgICAgICBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBMKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBGdSA/ICh1ID0gRnUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKFF1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBTdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBNKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBGdSA/ICh1ID0gRnUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKFF1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBVdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBEKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBFdSA/ICh1ID0gRXUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKEd1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBCdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBIKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBqdSA/ICh1ID0ganUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKCR1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBxdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBPKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBMdSA/ICh1ID0gTHUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKE11KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBEdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBXKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBIdSA/ICh1ID0gSHUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKE91KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBXdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB6KCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSB6dSA/ICh1ID0genUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKEl1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBKdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBJKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBLdSA/ICh1ID0gS3UsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKE51KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBQdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBKKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBWdSA/ICh1ID0gVnUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKFh1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBZdSgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBLKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBadSA/ICh1ID0gWnUsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKF91KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBudCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBOKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBsdCA/ICh1ID0gbHQsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHV0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSB0dCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBQKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBydCA/ICh1ID0gcnQsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKGV0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBvdCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBWKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBjdCA/ICh1ID0gY3QsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKGl0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBhdCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBYKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBmdCA/ICh1ID0gZnQsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHN0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBodCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBZKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdDtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBkdCA/ICh1ID0gZHQsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHB0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKG4ubGVuZ3RoID4gcXQgPyAodCA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAodCA9IG51bGwsIDAgPT09IFd0ICYmIGUodnQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0gd3QodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBaKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdDtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgOTIgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IEF0LCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShDdCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/IChndC50ZXN0KG4uY2hhckF0KHF0KSkgPyAodCA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAodCA9IG51bGwsIDAgPT09IFd0ICYmIGUoYnQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0ga3QodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBfKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgaWYgKGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBUdCA/ICh1ID0gVHQsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHh0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodCA9IFtdLCB5dC50ZXN0KG4uY2hhckF0KHF0KSkgPyAociA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUobXQpKSwgXG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSByKSBmb3IgKDtudWxsICE9PSByOyApIHQucHVzaChyKSwgeXQudGVzdChuLmNoYXJBdChxdCkpID8gKHIgPSBuLmNoYXJBdChxdCksIFxuXHQgICAgICAgICAgICAgICAgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUobXQpKTsgZWxzZSB0ID0gaWw7XG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IFJ0KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgICAgICBsID0gaWwpO1xuXHQgICAgICAgICAgICB9IGVsc2UgcXQgPSBsLCBsID0gaWw7XG5cdCAgICAgICAgICAgIHJldHVybiBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBubCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIGlmIChsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gRnQgPyAodSA9IEZ0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShRdCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHQgPSBbXSwgU3QudGVzdChuLmNoYXJBdChxdCkpID8gKHIgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKFV0KSksIFxuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gcikgZm9yICg7bnVsbCAhPT0gcjsgKSB0LnB1c2gociksIFN0LnRlc3Qobi5jaGFyQXQocXQpKSA/IChyID0gbi5jaGFyQXQocXQpLCBcblx0ICAgICAgICAgICAgICAgIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKFV0KSk7IGVsc2UgdCA9IGlsO1xuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSBFdCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICAgICAgbCA9IGlsKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHF0ID0gbCwgbCA9IGlsO1xuXHQgICAgICAgICAgICByZXR1cm4gbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gbGwoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICBpZiAobCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEd0ID8gKHUgPSBHdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoQnQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUpIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0ID0gW10sIFN0LnRlc3Qobi5jaGFyQXQocXQpKSA/IChyID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShVdCkpLCBcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHIpIGZvciAoO251bGwgIT09IHI7ICkgdC5wdXNoKHIpLCBTdC50ZXN0KG4uY2hhckF0KHF0KSkgPyAociA9IG4uY2hhckF0KHF0KSwgXG5cdCAgICAgICAgICAgICAgICBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShVdCkpOyBlbHNlIHQgPSBpbDtcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0ganQodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgICAgIGwgPSBpbCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSBxdCA9IGwsIGwgPSBpbDtcblx0ICAgICAgICAgICAgcmV0dXJuIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHVsKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBUdCA/ICh1ID0gVHQsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKHh0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSAkdCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB0bCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQ7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDkyID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBBdCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoQ3QpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAobi5sZW5ndGggPiBxdCA/ICh0ID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6ICh0ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh2dCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSBidSh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBybCwgZWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHt9LCBvbCA9IHtcblx0ICAgICAgICAgICAgcmVnZXhwOiBjXG5cdCAgICAgICAgfSwgY2wgPSBjLCBpbCA9IG51bGwsIGFsID0gXCJcIiwgZmwgPSBcInxcIiwgc2wgPSAnXCJ8XCInLCBobCA9IGZ1bmN0aW9uKG4sIGwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPyBuZXcgQWx0ZXJuYXRlKG4sIGxbMV0pIDogbjtcblx0ICAgICAgICB9LCBkbCA9IGZ1bmN0aW9uKG4sIGwsIHUpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXRjaChbIG4gXS5jb25jYXQobCkuY29uY2F0KFsgdSBdKSk7XG5cdCAgICAgICAgfSwgcGwgPSBcIl5cIiwgdmwgPSAnXCJeXCInLCB3bCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwic3RhcnRcIik7XG5cdCAgICAgICAgfSwgQWwgPSBcIiRcIiwgQ2wgPSAnXCIkXCInLCBnbCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwiZW5kXCIpO1xuXHQgICAgICAgIH0sIGJsID0gZnVuY3Rpb24obiwgbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFF1YW50aWZpZWQobiwgbCk7XG5cdCAgICAgICAgfSwga2wgPSBcIlF1YW50aWZpZXJcIiwgVGwgPSBmdW5jdGlvbihuLCBsKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBsICYmIChuLmdyZWVkeSA9ICExKSwgbjtcblx0ICAgICAgICB9LCB4bCA9IFwie1wiLCB5bCA9ICdcIntcIicsIG1sID0gXCIsXCIsIFJsID0gJ1wiLFwiJywgRmwgPSBcIn1cIiwgUWwgPSAnXCJ9XCInLCBTbCA9IGZ1bmN0aW9uKG4sIGwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWFudGlmaWVyKG4sIGwpO1xuXHQgICAgICAgIH0sIFVsID0gXCIsfVwiLCBFbCA9ICdcIix9XCInLCBHbCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWFudGlmaWVyKG4sIDEvMCk7XG5cdCAgICAgICAgfSwgQmwgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUXVhbnRpZmllcihuLCBuKTtcblx0ICAgICAgICB9LCBqbCA9IFwiK1wiLCAkbCA9ICdcIitcIicsIHFsID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUXVhbnRpZmllcigxLCAxLzApO1xuXHQgICAgICAgIH0sIExsID0gXCIqXCIsIE1sID0gJ1wiKlwiJywgRGwgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWFudGlmaWVyKDAsIDEvMCk7XG5cdCAgICAgICAgfSwgSGwgPSBcIj9cIiwgT2wgPSAnXCI/XCInLCBXbCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFF1YW50aWZpZXIoMCwgMSk7XG5cdCAgICAgICAgfSwgemwgPSAvXlswLTldLywgSWwgPSBcIlswLTldXCIsIEpsID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gK24uam9pbihcIlwiKTtcblx0ICAgICAgICB9LCBLbCA9IFwiKFwiLCBObCA9ICdcIihcIicsIFBsID0gXCIpXCIsIFZsID0gJ1wiKVwiJywgWGwgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuO1xuXHQgICAgICAgIH0sIFlsID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IENhcHR1cmVHcm91cChuKTtcblx0ICAgICAgICB9LCBabCA9IFwiPzpcIiwgX2wgPSAnXCI/OlwiJywgbnUgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgR3JvdXAoXCJub24tY2FwdHVyZS1ncm91cFwiLCBuKTtcblx0ICAgICAgICB9LCBsdSA9IFwiPz1cIiwgdXUgPSAnXCI/PVwiJywgdHUgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgR3JvdXAoXCJwb3NpdGl2ZS1sb29rYWhlYWRcIiwgbik7XG5cdCAgICAgICAgfSwgcnUgPSBcIj8hXCIsIGV1ID0gJ1wiPyFcIicsIG91ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IEdyb3VwKFwibmVnYXRpdmUtbG9va2FoZWFkXCIsIG4pO1xuXHQgICAgICAgIH0sIGN1ID0gXCJDaGFyYWN0ZXJTZXRcIiwgaXUgPSBcIltcIiwgYXUgPSAnXCJbXCInLCBmdSA9IFwiXVwiLCBzdSA9ICdcIl1cIicsIGh1ID0gZnVuY3Rpb24obiwgbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IENoYXJTZXQoISFuLCBsKTtcblx0ICAgICAgICB9LCBkdSA9IFwiQ2hhcmFjdGVyUmFuZ2VcIiwgcHUgPSBcIi1cIiwgdnUgPSAnXCItXCInLCB3dSA9IGZ1bmN0aW9uKG4sIGwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFyYWN0ZXJSYW5nZShuLCBsKTtcblx0ICAgICAgICB9LCBBdSA9IFwiQ2hhcmFjdGVyXCIsIEN1ID0gL15bXlxcXFxcXF1dLywgZ3UgPSBcIlteXFxcXFxcXFxcXFxcXV1cIiwgYnUgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgTGl0ZXJhbChuKTtcblx0ICAgICAgICB9LCBrdSA9IFwiLlwiLCBUdSA9ICdcIi5cIicsIHh1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJhbnktY2hhcmFjdGVyXCIpO1xuXHQgICAgICAgIH0sIHl1ID0gXCJMaXRlcmFsXCIsIG11ID0gL15bXnxcXFxcXFwvLlsoKT8rKiRcXF5dLywgUnUgPSBcIltefFxcXFxcXFxcXFxcXC8uWygpPysqJFxcXFxeXVwiLCBGdSA9IFwiXFxcXGJcIiwgUXUgPSAnXCJcXFxcXFxcXGJcIicsIFN1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJiYWNrc3BhY2VcIik7XG5cdCAgICAgICAgfSwgVXUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIndvcmQtYm91bmRhcnlcIik7XG5cdCAgICAgICAgfSwgRXUgPSBcIlxcXFxCXCIsIEd1ID0gJ1wiXFxcXFxcXFxCXCInLCBCdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwibm9uLXdvcmQtYm91bmRhcnlcIik7XG5cdCAgICAgICAgfSwganUgPSBcIlxcXFxkXCIsICR1ID0gJ1wiXFxcXFxcXFxkXCInLCBxdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwiZGlnaXRcIik7XG5cdCAgICAgICAgfSwgTHUgPSBcIlxcXFxEXCIsIE11ID0gJ1wiXFxcXFxcXFxEXCInLCBEdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwibm9uLWRpZ2l0XCIpO1xuXHQgICAgICAgIH0sIEh1ID0gXCJcXFxcZlwiLCBPdSA9ICdcIlxcXFxcXFxcZlwiJywgV3UgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcImZvcm0tZmVlZFwiKTtcblx0ICAgICAgICB9LCB6dSA9IFwiXFxcXG5cIiwgSXUgPSAnXCJcXFxcXFxcXG5cIicsIEp1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJsaW5lLWZlZWRcIik7XG5cdCAgICAgICAgfSwgS3UgPSBcIlxcXFxyXCIsIE51ID0gJ1wiXFxcXFxcXFxyXCInLCBQdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwiY2FycmlhZ2UtcmV0dXJuXCIpO1xuXHQgICAgICAgIH0sIFZ1ID0gXCJcXFxcc1wiLCBYdSA9ICdcIlxcXFxcXFxcc1wiJywgWXUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIndoaXRlLXNwYWNlXCIpO1xuXHQgICAgICAgIH0sIFp1ID0gXCJcXFxcU1wiLCBfdSA9ICdcIlxcXFxcXFxcU1wiJywgbnQgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIm5vbi13aGl0ZS1zcGFjZVwiKTtcblx0ICAgICAgICB9LCBsdCA9IFwiXFxcXHRcIiwgdXQgPSAnXCJcXFxcXFxcXHRcIicsIHR0ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJ0YWJcIik7XG5cdCAgICAgICAgfSwgcnQgPSBcIlxcXFx2XCIsIGV0ID0gJ1wiXFxcXFxcXFx2XCInLCBvdCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwidmVydGljYWwtdGFiXCIpO1xuXHQgICAgICAgIH0sIGN0ID0gXCJcXFxcd1wiLCBpdCA9ICdcIlxcXFxcXFxcd1wiJywgYXQgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIndvcmRcIik7XG5cdCAgICAgICAgfSwgZnQgPSBcIlxcXFxXXCIsIHN0ID0gJ1wiXFxcXFxcXFxXXCInLCBodCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwibm9uLXdvcmRcIik7XG5cdCAgICAgICAgfSwgZHQgPSBcIlxcXFxjXCIsIHB0ID0gJ1wiXFxcXFxcXFxjXCInLCB2dCA9IFwiYW55IGNoYXJhY3RlclwiLCB3dCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBDb250cm9sQ2hhcmFjdGVyKG4pO1xuXHQgICAgICAgIH0sIEF0ID0gXCJcXFxcXCIsIEN0ID0gJ1wiXFxcXFxcXFxcIicsIGd0ID0gL15bMS05XS8sIGJ0ID0gXCJbMS05XVwiLCBrdCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBCYWNrUmVmZXJlbmNlKG4pO1xuXHQgICAgICAgIH0sIFR0ID0gXCJcXFxcMFwiLCB4dCA9ICdcIlxcXFxcXFxcMFwiJywgeXQgPSAvXlswLTddLywgbXQgPSBcIlswLTddXCIsIFJ0ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IE9jdGFsKG4uam9pbihcIlwiKSk7XG5cdCAgICAgICAgfSwgRnQgPSBcIlxcXFx4XCIsIFF0ID0gJ1wiXFxcXFxcXFx4XCInLCBTdCA9IC9eWzAtOWEtZkEtRl0vLCBVdCA9IFwiWzAtOWEtZkEtRl1cIiwgRXQgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgSGV4KG4uam9pbihcIlwiKSk7XG5cdCAgICAgICAgfSwgR3QgPSBcIlxcXFx1XCIsIEJ0ID0gJ1wiXFxcXFxcXFx1XCInLCBqdCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBVbmljb2RlKG4uam9pbihcIlwiKSk7XG5cdCAgICAgICAgfSwgJHQgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIm51bGwtY2hhcmFjdGVyXCIpO1xuXHQgICAgICAgIH0sIHF0ID0gMCwgTHQgPSAwLCBNdCA9IDAsIER0ID0ge1xuXHQgICAgICAgICAgICBsaW5lOiAxLFxuXHQgICAgICAgICAgICBjb2x1bW46IDEsXG5cdCAgICAgICAgICAgIHNlZW5DUjogITFcblx0ICAgICAgICB9LCBIdCA9IDAsIE90ID0gW10sIFd0ID0gMDtcblx0ICAgICAgICBpZiAoXCJzdGFydFJ1bGVcIiBpbiBlbCkge1xuXHQgICAgICAgICAgICBpZiAoIShlbC5zdGFydFJ1bGUgaW4gb2wpKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzdGFydCBwYXJzaW5nIGZyb20gcnVsZSBcXFwiXCIgKyBlbC5zdGFydFJ1bGUgKyAnXCIuJyk7XG5cdCAgICAgICAgICAgIGNsID0gb2xbZWwuc3RhcnRSdWxlXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKFRva2VuLm9mZnNldCA9IHQsIFRva2VuLnRleHQgPSB1LCBybCA9IGNsKCksIG51bGwgIT09IHJsICYmIHF0ID09PSBuLmxlbmd0aCkgcmV0dXJuIHJsO1xuXHQgICAgICAgIHRocm93IG8oT3QpLCBMdCA9IE1hdGgubWF4KHF0LCBIdCksIG5ldyBsKE90LCBMdCA8IG4ubGVuZ3RoID8gbi5jaGFyQXQoTHQpIDogbnVsbCwgTHQsIHIoTHQpLmxpbmUsIHIoTHQpLmNvbHVtbik7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gbihsLCBFcnJvciksIHtcblx0ICAgICAgICBTeW50YXhFcnJvcjogbCxcblx0ICAgICAgICBwYXJzZTogdVxuXHQgICAgfTtcblx0fSgpLCBpbmRleCA9IDEsIGNncyA9IHt9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gcGFyc2VyXG5cbi8qKiovIH0sXG4vKiAyMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIFJlZ0V4cCBIYW5kbGVyXG5cblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9Gb3JiZXNMaW5kZXNheS9yZWdleHBcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9kbWFqZGEvcGVnanNcblx0ICAgIGh0dHA6Ly93d3cucmVnZXhwZXIuY29tL1xuXG5cdCAgICDmr4/kuKroioLngrnnmoTnu5PmnoRcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIHR5cGU6ICcnLFxuXHQgICAgICAgICAgICBvZmZzZXQ6IG51bWJlcixcblx0ICAgICAgICAgICAgdGV4dDogJycsXG5cdCAgICAgICAgICAgIGJvZHk6IHt9LFxuXHQgICAgICAgICAgICBlc2NhcGVkOiB0cnVlL2ZhbHNlXG5cdCAgICAgICAgfVxuXG5cdCAgICB0eXBlIOWPr+mAieWAvFxuXHQgICAgICAgIGFsdGVybmF0ZSAgICAgICAgICAgICB8ICAgICAgICAg6YCJ5oupXG5cdCAgICAgICAgbWF0Y2ggICAgICAgICAgICAgICAgIOWMuemFjVxuXHQgICAgICAgIGNhcHR1cmUtZ3JvdXAgICAgICAgICAoKSAgICAgICAg5o2V6I6357uEXG5cdCAgICAgICAgbm9uLWNhcHR1cmUtZ3JvdXAgICAgICg/Oi4uLikgICDpnZ7mjZXojrfnu4Rcblx0ICAgICAgICBwb3NpdGl2ZS1sb29rYWhlYWQgICAgKD89cCkgICAgIOmbtuWuveato+WQkeWFiOihjOaWreiogFxuXHQgICAgICAgIG5lZ2F0aXZlLWxvb2thaGVhZCAgICAoPyFwKSAgICAg6Zu25a696LSf5ZCR5YWI6KGM5pat6KiAXG5cdCAgICAgICAgcXVhbnRpZmllZCAgICAgICAgICAgIGEqICAgICAgICDph43lpI3oioLngrlcblx0ICAgICAgICBxdWFudGlmaWVyICAgICAgICAgICAgKiAgICAgICAgIOmHj+ivjVxuXHQgICAgICAgIGNoYXJzZXQgICAgICAgICAgICAgICBbXSAgICAgICAg5a2X56ym6ZuGXG5cdCAgICAgICAgcmFuZ2UgICAgICAgICAgICAgICAgIHttLCBufSAgICDojIPlm7Rcblx0ICAgICAgICBsaXRlcmFsICAgICAgICAgICAgICAgYSAgICAgICAgIOebtOaOpemHj+Wtl+esplxuXHQgICAgICAgIHVuaWNvZGUgICAgICAgICAgICAgICBcXHV4eHh4ICAgIFVuaWNvZGVcblx0ICAgICAgICBoZXggICAgICAgICAgICAgICAgICAgXFx4ICAgICAgICDljYHlha3ov5vliLZcblx0ICAgICAgICBvY3RhbCAgICAgICAgICAgICAgICAg5YWr6L+b5Yi2XG5cdCAgICAgICAgYmFjay1yZWZlcmVuY2UgICAgICAgIFxcbiAgICAgICAg5Y+N5ZCR5byV55SoXG5cdCAgICAgICAgY29udHJvbC1jaGFyYWN0ZXIgICAgIFxcY1ggICAgICAg5o6n5Yi25a2X56ymXG5cblx0ICAgICAgICAvLyBUb2tlblxuXHQgICAgICAgIHN0YXJ0ICAgICAgICAgICAgICAgXiAgICAgICDlvIDlpLRcblx0ICAgICAgICBlbmQgICAgICAgICAgICAgICAgICQgICAgICAg57uT5bC+XG5cdCAgICAgICAgYW55LWNoYXJhY3RlciAgICAgICAuICAgICAgIOS7u+aEj+Wtl+esplxuXHQgICAgICAgIGJhY2tzcGFjZSAgICAgICAgICAgW1xcYl0gICAg6YCA5qC855u05o6l6YePXG5cdCAgICAgICAgd29yZC1ib3VuZGFyeSAgICAgICBcXGIgICAgICDljZXor43ovrnnlYxcblx0ICAgICAgICBub24td29yZC1ib3VuZGFyeSAgIFxcQiAgICAgIOmdnuWNleivjei+ueeVjFxuXHQgICAgICAgIGRpZ2l0ICAgICAgICAgICAgICAgXFxkICAgICAgQVNDSUkg5pWw5a2X77yMWzAtOV1cblx0ICAgICAgICBub24tZGlnaXQgICAgICAgICAgIFxcRCAgICAgIOmdniBBU0NJSSDmlbDlrZfvvIxbXjAtOV1cblx0ICAgICAgICBmb3JtLWZlZWQgICAgICAgICAgIFxcZiAgICAgIOaNoumhteesplxuXHQgICAgICAgIGxpbmUtZmVlZCAgICAgICAgICAgXFxuICAgICAg5o2i6KGM56ymXG5cdCAgICAgICAgY2FycmlhZ2UtcmV0dXJuICAgICBcXHIgICAgICDlm57ovabnrKZcblx0ICAgICAgICB3aGl0ZS1zcGFjZSAgICAgICAgIFxccyAgICAgIOepuueZveesplxuXHQgICAgICAgIG5vbi13aGl0ZS1zcGFjZSAgICAgXFxTICAgICAg6Z2e56m655m956ymXG5cdCAgICAgICAgdGFiICAgICAgICAgICAgICAgICBcXHQgICAgICDliLbooajnrKZcblx0ICAgICAgICB2ZXJ0aWNhbC10YWIgICAgICAgIFxcdiAgICAgIOWeguebtOWItuihqOesplxuXHQgICAgICAgIHdvcmQgICAgICAgICAgICAgICAgXFx3ICAgICAgQVNDSUkg5a2X56ym77yMW2EtekEtWjAtOV1cblx0ICAgICAgICBub24td29yZCAgICAgICAgICAgIFxcVyAgICAgIOmdniBBU0NJSSDlrZfnrKbvvIxbXmEtekEtWjAtOV1cblx0ICAgICAgICBudWxsLWNoYXJhY3RlciAgICAgIFxcbyAgICAgIE5VTCDlrZfnrKZcblx0ICovXG5cblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cdHZhciBSYW5kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cdCAgICAvKlxuXHQgICAgICAgIFxuXHQgICAgKi9cblx0dmFyIEhhbmRsZXIgPSB7XG5cdCAgICBleHRlbmQ6IFV0aWwuZXh0ZW5kXG5cdH1cblxuXHQvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FTQ0lJI0FTQ0lJX3ByaW50YWJsZV9jb2RlX2NoYXJ0XG5cdC8qdmFyIEFTQ0lJX0NPTlRST0xfQ09ERV9DSEFSVCA9IHtcblx0ICAgICdAJzogWydcXHUwMDAwJ10sXG5cdCAgICBBOiBbJ1xcdTAwMDEnXSxcblx0ICAgIEI6IFsnXFx1MDAwMiddLFxuXHQgICAgQzogWydcXHUwMDAzJ10sXG5cdCAgICBEOiBbJ1xcdTAwMDQnXSxcblx0ICAgIEU6IFsnXFx1MDAwNSddLFxuXHQgICAgRjogWydcXHUwMDA2J10sXG5cdCAgICBHOiBbJ1xcdTAwMDcnLCAnXFxhJ10sXG5cdCAgICBIOiBbJ1xcdTAwMDgnLCAnXFxiJ10sXG5cdCAgICBJOiBbJ1xcdTAwMDknLCAnXFx0J10sXG5cdCAgICBKOiBbJ1xcdTAwMEEnLCAnXFxuJ10sXG5cdCAgICBLOiBbJ1xcdTAwMEInLCAnXFx2J10sXG5cdCAgICBMOiBbJ1xcdTAwMEMnLCAnXFxmJ10sXG5cdCAgICBNOiBbJ1xcdTAwMEQnLCAnXFxyJ10sXG5cdCAgICBOOiBbJ1xcdTAwMEUnXSxcblx0ICAgIE86IFsnXFx1MDAwRiddLFxuXHQgICAgUDogWydcXHUwMDEwJ10sXG5cdCAgICBROiBbJ1xcdTAwMTEnXSxcblx0ICAgIFI6IFsnXFx1MDAxMiddLFxuXHQgICAgUzogWydcXHUwMDEzJ10sXG5cdCAgICBUOiBbJ1xcdTAwMTQnXSxcblx0ICAgIFU6IFsnXFx1MDAxNSddLFxuXHQgICAgVjogWydcXHUwMDE2J10sXG5cdCAgICBXOiBbJ1xcdTAwMTcnXSxcblx0ICAgIFg6IFsnXFx1MDAxOCddLFxuXHQgICAgWTogWydcXHUwMDE5J10sXG5cdCAgICBaOiBbJ1xcdTAwMUEnXSxcblx0ICAgICdbJzogWydcXHUwMDFCJywgJ1xcZSddLFxuXHQgICAgJ1xcXFwnOiBbJ1xcdTAwMUMnXSxcblx0ICAgICddJzogWydcXHUwMDFEJ10sXG5cdCAgICAnXic6IFsnXFx1MDAxRSddLFxuXHQgICAgJ18nOiBbJ1xcdTAwMUYnXVxuXHR9Ki9cblxuXHQvLyBBU0NJSSBwcmludGFibGUgY29kZSBjaGFydFxuXHQvLyB2YXIgTE9XRVIgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonXG5cdC8vIHZhciBVUFBFUiA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWidcblx0Ly8gdmFyIE5VTUJFUiA9ICcwMTIzNDU2Nzg5J1xuXHQvLyB2YXIgU1lNQk9MID0gJyAhXCIjJCUmXFwnKCkqKywtLi8nICsgJzo7PD0+P0AnICsgJ1tcXFxcXV5fYCcgKyAne3x9fidcblx0dmFyIExPV0VSID0gYXNjaWkoOTcsIDEyMilcblx0dmFyIFVQUEVSID0gYXNjaWkoNjUsIDkwKVxuXHR2YXIgTlVNQkVSID0gYXNjaWkoNDgsIDU3KVxuXHR2YXIgT1RIRVIgPSBhc2NpaSgzMiwgNDcpICsgYXNjaWkoNTgsIDY0KSArIGFzY2lpKDkxLCA5NikgKyBhc2NpaSgxMjMsIDEyNikgLy8g5o6S6ZmkIDk1IF8gYXNjaWkoOTEsIDk0KSArIGFzY2lpKDk2LCA5Nilcblx0dmFyIFBSSU5UQUJMRSA9IGFzY2lpKDMyLCAxMjYpXG5cdHZhciBTUEFDRSA9ICcgXFxmXFxuXFxyXFx0XFx2XFx1MDBBMFxcdTIwMjhcXHUyMDI5J1xuXHR2YXIgQ0hBUkFDVEVSX0NMQVNTRVMgPSB7XG5cdCAgICAnXFxcXHcnOiBMT1dFUiArIFVQUEVSICsgTlVNQkVSICsgJ18nLCAvLyBhc2NpaSg5NSwgOTUpXG5cdCAgICAnXFxcXFcnOiBPVEhFUi5yZXBsYWNlKCdfJywgJycpLFxuXHQgICAgJ1xcXFxzJzogU1BBQ0UsXG5cdCAgICAnXFxcXFMnOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gUFJJTlRBQkxFXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTUEFDRS5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShTUEFDRVtpXSwgJycpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0oKSxcblx0ICAgICdcXFxcZCc6IE5VTUJFUixcblx0ICAgICdcXFxcRCc6IExPV0VSICsgVVBQRVIgKyBPVEhFUlxuXHR9XG5cblx0ZnVuY3Rpb24gYXNjaWkoZnJvbSwgdG8pIHtcblx0ICAgIHZhciByZXN1bHQgPSAnJ1xuXHQgICAgZm9yICh2YXIgaSA9IGZyb207IGkgPD0gdG87IGkrKykge1xuXHQgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmVzdWx0XG5cdH1cblxuXHQvLyB2YXIgYXN0ID0gUmVnRXhwUGFyc2VyLnBhcnNlKHJlZ2V4cC5zb3VyY2UpXG5cdEhhbmRsZXIuZ2VuID0gZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgY2FjaGUgPSBjYWNoZSB8fCB7XG5cdCAgICAgICAgZ3VpZDogMVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIEhhbmRsZXJbbm9kZS50eXBlXSA/IEhhbmRsZXJbbm9kZS50eXBlXShub2RlLCByZXN1bHQsIGNhY2hlKSA6XG5cdCAgICAgICAgSGFuZGxlci50b2tlbihub2RlLCByZXN1bHQsIGNhY2hlKVxuXHR9XG5cblx0SGFuZGxlci5leHRlbmQoe1xuXHQgICAgLyoganNoaW50IHVudXNlZDpmYWxzZSAqL1xuXHQgICAgdG9rZW46IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlICdzdGFydCc6XG5cdCAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gJydcblx0ICAgICAgICAgICAgY2FzZSAnYW55LWNoYXJhY3Rlcic6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLmNoYXJhY3RlcigpXG5cdCAgICAgICAgICAgIGNhc2UgJ2JhY2tzcGFjZSc6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gJydcblx0ICAgICAgICAgICAgY2FzZSAnd29yZC1ib3VuZGFyeSc6IC8vIFRPRE9cblx0ICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuXHQgICAgICAgICAgICBjYXNlICdub24td29yZC1ib3VuZGFyeSc6IC8vIFRPRE9cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ2RpZ2l0Jzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcblx0ICAgICAgICAgICAgICAgICAgICBOVU1CRVIuc3BsaXQoJycpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIGNhc2UgJ25vbi1kaWdpdCc6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG5cdCAgICAgICAgICAgICAgICAgICAgKExPV0VSICsgVVBQRVIgKyBPVEhFUikuc3BsaXQoJycpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIGNhc2UgJ2Zvcm0tZmVlZCc6XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICdsaW5lLWZlZWQnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuYm9keSB8fCBub2RlLnRleHRcblx0ICAgICAgICAgICAgY2FzZSAnY2FycmlhZ2UtcmV0dXJuJzpcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ3doaXRlLXNwYWNlJzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcblx0ICAgICAgICAgICAgICAgICAgICBTUEFDRS5zcGxpdCgnJylcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgY2FzZSAnbm9uLXdoaXRlLXNwYWNlJzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcblx0ICAgICAgICAgICAgICAgICAgICAoTE9XRVIgKyBVUFBFUiArIE5VTUJFUikuc3BsaXQoJycpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIGNhc2UgJ3RhYic6XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICd2ZXJ0aWNhbC10YWInOlxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAnd29yZCc6IC8vIFxcdyBbYS16QS1aMC05XVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuXHQgICAgICAgICAgICAgICAgICAgIChMT1dFUiArIFVQUEVSICsgTlVNQkVSKS5zcGxpdCgnJylcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgY2FzZSAnbm9uLXdvcmQnOiAvLyBcXFcgW15hLXpBLVowLTldXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG5cdCAgICAgICAgICAgICAgICAgICAgT1RIRVIucmVwbGFjZSgnXycsICcnKS5zcGxpdCgnJylcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgY2FzZSAnbnVsbC1jaGFyYWN0ZXInOlxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIG5vZGUuYm9keSB8fCBub2RlLnRleHRcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgdHlwZTogJ2FsdGVybmF0ZScsXG5cdCAgICAgICAgICAgIG9mZnNldDogMCxcblx0ICAgICAgICAgICAgdGV4dDogJycsXG5cdCAgICAgICAgICAgIGxlZnQ6IHtcblx0ICAgICAgICAgICAgICAgIGJveWQ6IFtdXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHJpZ2h0OiB7XG5cdCAgICAgICAgICAgICAgICBib3lkOiBbXVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgKi9cblx0ICAgIGFsdGVybmF0ZTogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIC8vIG5vZGUubGVmdC9yaWdodCB7fVxuXHQgICAgICAgIHJldHVybiB0aGlzLmdlbihcblx0ICAgICAgICAgICAgUmFuZG9tLmJvb2xlYW4oKSA/IG5vZGUubGVmdCA6IG5vZGUucmlnaHQsXG5cdCAgICAgICAgICAgIHJlc3VsdCxcblx0ICAgICAgICAgICAgY2FjaGVcblx0ICAgICAgICApXG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIHR5cGU6ICdtYXRjaCcsXG5cdCAgICAgICAgICAgIG9mZnNldDogMCxcblx0ICAgICAgICAgICAgdGV4dDogJycsXG5cdCAgICAgICAgICAgIGJvZHk6IFtdXG5cdCAgICAgICAgfVxuXHQgICAgKi9cblx0ICAgIG1hdGNoOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmVzdWx0ID0gJydcblx0ICAgICAgICAgICAgLy8gbm9kZS5ib2R5IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmJvZHkubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuZ2VuKG5vZGUuYm9keVtpXSwgcmVzdWx0LCBjYWNoZSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIC8vICgpXG5cdCAgICAnY2FwdHVyZS1ncm91cCc6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICAvLyBub2RlLmJvZHkge31cblx0ICAgICAgICByZXN1bHQgPSB0aGlzLmdlbihub2RlLmJvZHksIHJlc3VsdCwgY2FjaGUpXG5cdCAgICAgICAgY2FjaGVbY2FjaGUuZ3VpZCsrXSA9IHJlc3VsdFxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICAvLyAoPzouLi4pXG5cdCAgICAnbm9uLWNhcHR1cmUtZ3JvdXAnOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgLy8gbm9kZS5ib2R5IHt9XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZ2VuKG5vZGUuYm9keSwgcmVzdWx0LCBjYWNoZSlcblx0ICAgIH0sXG5cdCAgICAvLyAoPz1wKVxuXHQgICAgJ3Bvc2l0aXZlLWxvb2thaGVhZCc6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICAvLyBub2RlLmJvZHlcblx0ICAgICAgICByZXR1cm4gdGhpcy5nZW4obm9kZS5ib2R5LCByZXN1bHQsIGNhY2hlKVxuXHQgICAgfSxcblx0ICAgIC8vICg/IXApXG5cdCAgICAnbmVnYXRpdmUtbG9va2FoZWFkJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIC8vIG5vZGUuYm9keVxuXHQgICAgICAgIHJldHVybiAnJ1xuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICB0eXBlOiAncXVhbnRpZmllZCcsXG5cdCAgICAgICAgICAgIG9mZnNldDogMyxcblx0ICAgICAgICAgICAgdGV4dDogJ2MqJyxcblx0ICAgICAgICAgICAgYm9keToge1xuXHQgICAgICAgICAgICAgICAgdHlwZTogJ2xpdGVyYWwnLFxuXHQgICAgICAgICAgICAgICAgb2Zmc2V0OiAzLFxuXHQgICAgICAgICAgICAgICAgdGV4dDogJ2MnLFxuXHQgICAgICAgICAgICAgICAgYm9keTogJ2MnLFxuXHQgICAgICAgICAgICAgICAgZXNjYXBlZDogZmFsc2Vcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgcXVhbnRpZmllcjoge1xuXHQgICAgICAgICAgICAgICAgdHlwZTogJ3F1YW50aWZpZXInLFxuXHQgICAgICAgICAgICAgICAgb2Zmc2V0OiA0LFxuXHQgICAgICAgICAgICAgICAgdGV4dDogJyonLFxuXHQgICAgICAgICAgICAgICAgbWluOiAwLFxuXHQgICAgICAgICAgICAgICAgbWF4OiBJbmZpbml0eSxcblx0ICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgKi9cblx0ICAgIHF1YW50aWZpZWQ6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXN1bHQgPSAnJ1xuXHQgICAgICAgICAgICAvLyBub2RlLnF1YW50aWZpZXIge31cblx0ICAgICAgICB2YXIgY291bnQgPSB0aGlzLnF1YW50aWZpZXIobm9kZS5xdWFudGlmaWVyKTtcblx0ICAgICAgICAvLyBub2RlLmJvZHkge31cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuZ2VuKG5vZGUuYm9keSwgcmVzdWx0LCBjYWNoZSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAgcXVhbnRpZmllcjoge1xuXHQgICAgICAgICAgICB0eXBlOiAncXVhbnRpZmllcicsXG5cdCAgICAgICAgICAgIG9mZnNldDogNCxcblx0ICAgICAgICAgICAgdGV4dDogJyonLFxuXHQgICAgICAgICAgICBtaW46IDAsXG5cdCAgICAgICAgICAgIG1heDogSW5maW5pdHksXG5cdCAgICAgICAgICAgIGdyZWVkeTogdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgICovXG5cdCAgICBxdWFudGlmaWVyOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgdmFyIG1pbiA9IE1hdGgubWF4KG5vZGUubWluLCAwKVxuXHQgICAgICAgIHZhciBtYXggPSBpc0Zpbml0ZShub2RlLm1heCkgPyBub2RlLm1heCA6XG5cdCAgICAgICAgICAgIG1pbiArIFJhbmRvbS5pbnRlZ2VyKDMsIDcpXG5cdCAgICAgICAgcmV0dXJuIFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KVxuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAgXG5cdCAgICAqL1xuXHQgICAgY2hhcnNldDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIC8vIG5vZGUuaW52ZXJ0XG5cdCAgICAgICAgaWYgKG5vZGUuaW52ZXJ0KSByZXR1cm4gdGhpc1snaW52ZXJ0LWNoYXJzZXQnXShub2RlLCByZXN1bHQsIGNhY2hlKVxuXG5cdCAgICAgICAgLy8gbm9kZS5ib2R5IFtdXG5cdCAgICAgICAgdmFyIGxpdGVyYWwgPSBSYW5kb20ucGljayhub2RlLmJvZHkpXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZ2VuKGxpdGVyYWwsIHJlc3VsdCwgY2FjaGUpXG5cdCAgICB9LFxuXHQgICAgJ2ludmVydC1jaGFyc2V0JzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHZhciBwb29sID0gUFJJTlRBQkxFXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDAsIGl0ZW07IGkgPCBub2RlLmJvZHkubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgaXRlbSA9IG5vZGUuYm9keVtpXVxuXHQgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuXHQgICAgICAgICAgICAgICAgY2FzZSAnbGl0ZXJhbCc6XG5cdCAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHBvb2wucmVwbGFjZShpdGVtLmJvZHksICcnKVxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICBjYXNlICdyYW5nZSc6XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMuZ2VuKGl0ZW0uc3RhcnQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBtYXggPSB0aGlzLmdlbihpdGVtLmVuZCwgcmVzdWx0LCBjYWNoZSkuY2hhckNvZGVBdCgpXG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaWkgPSBtaW47IGlpIDw9IG1heDsgaWkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBwb29sID0gcG9vbC5yZXBsYWNlKFN0cmluZy5mcm9tQ2hhckNvZGUoaWkpLCAnJylcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuXHQgICAgICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVycyA9IENIQVJBQ1RFUl9DTEFTU0VTW2l0ZW0udGV4dF1cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVycykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpaWkgPSAwOyBpaWkgPD0gY2hhcmFjdGVycy5sZW5ndGg7IGlpaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb29sID0gcG9vbC5yZXBsYWNlKGNoYXJhY3RlcnNbaWlpXSwgJycpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKHBvb2wuc3BsaXQoJycpKVxuXHQgICAgfSxcblx0ICAgIHJhbmdlOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgLy8gbm9kZS5zdGFydCwgbm9kZS5lbmRcblx0ICAgICAgICB2YXIgbWluID0gdGhpcy5nZW4obm9kZS5zdGFydCwgcmVzdWx0LCBjYWNoZSkuY2hhckNvZGVBdCgpXG5cdCAgICAgICAgdmFyIG1heCA9IHRoaXMuZ2VuKG5vZGUuZW5kLCByZXN1bHQsIGNhY2hlKS5jaGFyQ29kZUF0KClcblx0ICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0ICAgICAgICAgICAgUmFuZG9tLmludGVnZXIobWluLCBtYXgpXG5cdCAgICAgICAgKVxuXHQgICAgfSxcblx0ICAgIGxpdGVyYWw6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXR1cm4gbm9kZS5lc2NhcGVkID8gbm9kZS5ib2R5IDogbm9kZS50ZXh0XG5cdCAgICB9LFxuXHQgICAgLy8gVW5pY29kZSBcXHVcblx0ICAgIHVuaWNvZGU6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0ICAgICAgICAgICAgcGFyc2VJbnQobm9kZS5jb2RlLCAxNilcblx0ICAgICAgICApXG5cdCAgICB9LFxuXHQgICAgLy8g5Y2B5YWt6L+b5Yi2IFxceEZGXG5cdCAgICBoZXg6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0ICAgICAgICAgICAgcGFyc2VJbnQobm9kZS5jb2RlLCAxNilcblx0ICAgICAgICApXG5cdCAgICB9LFxuXHQgICAgLy8g5YWr6L+b5Yi2IFxcMFxuXHQgICAgb2N0YWw6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0ICAgICAgICAgICAgcGFyc2VJbnQobm9kZS5jb2RlLCA4KVxuXHQgICAgICAgIClcblx0ICAgIH0sXG5cdCAgICAvLyDlj43lkJHlvJXnlKhcblx0ICAgICdiYWNrLXJlZmVyZW5jZSc6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXR1cm4gY2FjaGVbbm9kZS5jb2RlXSB8fCAnJ1xuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DMF9hbmRfQzFfY29udHJvbF9jb2Rlc1xuXHQgICAgKi9cblx0ICAgIENPTlRST0xfQ0hBUkFDVEVSX01BUDogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIENPTlRST0xfQ0hBUkFDVEVSID0gJ0AgQSBCIEMgRCBFIEYgRyBIIEkgSiBLIEwgTSBOIE8gUCBRIFIgUyBUIFUgViBXIFggWSBaIFsgXFxcXCBdIF4gXycuc3BsaXQoJyAnKVxuXHQgICAgICAgIHZhciBDT05UUk9MX0NIQVJBQ1RFUl9VTklDT0RFID0gJ1xcdTAwMDAgXFx1MDAwMSBcXHUwMDAyIFxcdTAwMDMgXFx1MDAwNCBcXHUwMDA1IFxcdTAwMDYgXFx1MDAwNyBcXHUwMDA4IFxcdTAwMDkgXFx1MDAwQSBcXHUwMDBCIFxcdTAwMEMgXFx1MDAwRCBcXHUwMDBFIFxcdTAwMEYgXFx1MDAxMCBcXHUwMDExIFxcdTAwMTIgXFx1MDAxMyBcXHUwMDE0IFxcdTAwMTUgXFx1MDAxNiBcXHUwMDE3IFxcdTAwMTggXFx1MDAxOSBcXHUwMDFBIFxcdTAwMUIgXFx1MDAxQyBcXHUwMDFEIFxcdTAwMUUgXFx1MDAxRicuc3BsaXQoJyAnKVxuXHQgICAgICAgIHZhciBtYXAgPSB7fVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ09OVFJPTF9DSEFSQUNURVIubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgbWFwW0NPTlRST0xfQ0hBUkFDVEVSW2ldXSA9IENPTlRST0xfQ0hBUkFDVEVSX1VOSUNPREVbaV1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIG1hcFxuXHQgICAgfSgpLFxuXHQgICAgJ2NvbnRyb2wtY2hhcmFjdGVyJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLkNPTlRST0xfQ0hBUkFDVEVSX01BUFtub2RlLmNvZGVdXG5cdCAgICB9XG5cdH0pXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBIYW5kbGVyXG5cbi8qKiovIH0sXG4vKiAyMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KVxuXG4vKioqLyB9LFxuLyogMjQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyB0b0pTT05TY2hlbWFcblxuXHQgICAg5oqKIE1vY2suanMg6aOO5qC855qE5pWw5o2u5qih5p2/6L2s5o2i5oiQIEpTT04gU2NoZW1h44CCXG5cblx0ICAgID4gW0pTT04gU2NoZW1hXShodHRwOi8vanNvbi1zY2hlbWEub3JnLylcblx0ICovXG5cdHZhciBDb25zdGFudCA9IF9fd2VicGFja19yZXF1aXJlX18oMilcblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cdHZhciBQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXG5cblx0ZnVuY3Rpb24gdG9KU09OU2NoZW1hKHRlbXBsYXRlLCBuYW1lLCBwYXRoIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuXHQgICAgLy8gdHlwZSBydWxlIHByb3BlcnRpZXMgaXRlbXNcblx0ICAgIHBhdGggPSBwYXRoIHx8IFtdXG5cdCAgICB2YXIgcmVzdWx0ID0ge1xuXHQgICAgICAgIG5hbWU6IHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJyA/IG5hbWUucmVwbGFjZShDb25zdGFudC5SRV9LRVksICckMScpIDogbmFtZSxcblx0ICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG5cdCAgICAgICAgdHlwZTogVXRpbC50eXBlKHRlbXBsYXRlKSwgLy8g5Y+v6IO95LiN5YeG56Gu77yM5L6L5aaCIHsgJ25hbWV8MSc6IFt7fSwge30gLi4uXSB9XG5cdCAgICAgICAgcnVsZTogUGFyc2VyLnBhcnNlKG5hbWUpXG5cdCAgICB9XG5cdCAgICByZXN1bHQucGF0aCA9IHBhdGguc2xpY2UoMClcblx0ICAgIHJlc3VsdC5wYXRoLnB1c2gobmFtZSA9PT0gdW5kZWZpbmVkID8gJ1JPT1QnIDogcmVzdWx0Lm5hbWUpXG5cblx0ICAgIHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0ICAgICAgICBjYXNlICdhcnJheSc6XG5cdCAgICAgICAgICAgIHJlc3VsdC5pdGVtcyA9IFtdXG5cdCAgICAgICAgICAgIFV0aWwuZWFjaCh0ZW1wbGF0ZSwgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG5cdCAgICAgICAgICAgICAgICByZXN1bHQuaXRlbXMucHVzaChcblx0ICAgICAgICAgICAgICAgICAgICB0b0pTT05TY2hlbWEodmFsdWUsIGluZGV4LCByZXN1bHQucGF0aClcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICBjYXNlICdvYmplY3QnOlxuXHQgICAgICAgICAgICByZXN1bHQucHJvcGVydGllcyA9IFtdXG5cdCAgICAgICAgICAgIFV0aWwuZWFjaCh0ZW1wbGF0ZSwgZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcblx0ICAgICAgICAgICAgICAgIHJlc3VsdC5wcm9wZXJ0aWVzLnB1c2goXG5cdCAgICAgICAgICAgICAgICAgICAgdG9KU09OU2NoZW1hKHZhbHVlLCBuYW1lLCByZXN1bHQucGF0aClcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHJlc3VsdFxuXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHRvSlNPTlNjaGVtYVxuXG5cbi8qKiovIH0sXG4vKiAyNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KVxuXG4vKioqLyB9LFxuLyogMjYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyB2YWxpZCh0ZW1wbGF0ZSwgZGF0YSlcblxuXHQgICAg5qCh6aqM55yf5a6e5pWw5o2uIGRhdGEg5piv5ZCm5LiO5pWw5o2u5qih5p2/IHRlbXBsYXRlIOWMuemFjeOAglxuXHQgICAgXG5cdCAgICDlrp7njrDmgJ3ot6/vvJpcblx0ICAgIDEuIOino+aekOinhOWImeOAglxuXHQgICAgICAgIOWFiOaKiuaVsOaNruaooeadvyB0ZW1wbGF0ZSDop6PmnpDkuLrmm7Tmlrnkvr/mnLrlmajop6PmnpDnmoQgSlNPTi1TY2hhbWVcblx0ICAgICAgICBuYW1lICAgICAgICAgICAgICAg5bGe5oCn5ZCNIFxuXHQgICAgICAgIHR5cGUgICAgICAgICAgICAgICDlsZ7mgKflgLznsbvlnotcblx0ICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAg5bGe5oCn5YC85qih5p2/XG5cdCAgICAgICAgcHJvcGVydGllcyAgICAgICAgIOWvueixoeWxnuaAp+aVsOe7hFxuXHQgICAgICAgIGl0ZW1zICAgICAgICAgICAgICDmlbDnu4TlhYPntKDmlbDnu4Rcblx0ICAgICAgICBydWxlICAgICAgICAgICAgICAg5bGe5oCn5YC855Sf5oiQ6KeE5YiZXG5cdCAgICAyLiDpgJLlvZLpqozor4Hop4TliJnjgIJcblx0ICAgICAgICDnhLblkI7nlKggSlNPTi1TY2hlbWEg5qCh6aqM55yf5a6e5pWw5o2u77yM5qCh6aqM6aG55YyF5ous5bGe5oCn5ZCN44CB5YC857G75Z6L44CB5YC844CB5YC855Sf5oiQ6KeE5YiZ44CCXG5cblx0ICAgIOaPkOekuuS/oeaBryBcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9mZ2UvanNvbi1zY2hlbWEtdmFsaWRhdG9yL2Jsb2IvbWFzdGVyL3NyYy9tYWluL3Jlc291cmNlcy9jb20vZ2l0aHViL2ZnZS9qc29uc2NoZW1hL3ZhbGlkYXRvci92YWxpZGF0aW9uLnByb3BlcnRpZXNcblx0ICAgIFtKU09OLVNjaGFtYSB2YWxpZGF0b3JdKGh0dHA6Ly9qc29uLXNjaGVtYS12YWxpZGF0b3IuaGVyb2t1YXBwLmNvbS8pXG5cdCAgICBbUmVnZXhwIERlbW9dKGh0dHA6Ly9kZW1vcy5mb3JiZXNsaW5kZXNheS5jby51ay9yZWdleHAvKVxuXHQqL1xuXHR2YXIgQ29uc3RhbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXHR2YXIgdG9KU09OU2NoZW1hID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMylcblxuXHRmdW5jdGlvbiB2YWxpZCh0ZW1wbGF0ZSwgZGF0YSkge1xuXHQgICAgdmFyIHNjaGVtYSA9IHRvSlNPTlNjaGVtYSh0ZW1wbGF0ZSlcblx0ICAgIHZhciByZXN1bHQgPSBEaWZmLmRpZmYoc2NoZW1hLCBkYXRhKVxuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZW1wbGF0ZSwgZGF0YSlcblx0ICAgICAgICAvLyBjb25zb2xlLndhcm4oQXNzZXJ0Lm1lc3NhZ2UocmVzdWx0W2ldKSlcblx0ICAgIH1cblx0ICAgIHJldHVybiByZXN1bHRcblx0fVxuXG5cdC8qXG5cdCAgICAjIyBuYW1lXG5cdCAgICAgICAg5pyJ55Sf5oiQ6KeE5YiZ77ya5q+U6L6D6Kej5p6Q5ZCO55qEIG5hbWVcblx0ICAgICAgICDml6DnlJ/miJDop4TliJnvvJrnm7TmjqXmr5TovoNcblx0ICAgICMjIHR5cGVcblx0ICAgICAgICDml6DnsbvlnovovazmjaLvvJrnm7TmjqXmr5TovoNcblx0ICAgICAgICDmnInnsbvlnovovazmjaLvvJrlhYjor5XnnYDop6PmnpAgdGVtcGxhdGXvvIznhLblkI7lho3mo4Dmn6XvvJ9cblx0ICAgICMjIHZhbHVlIHZzLiB0ZW1wbGF0ZVxuXHQgICAgICAgIOWfuuacrOexu+Wei1xuXHQgICAgICAgICAgICDml6DnlJ/miJDop4TliJnvvJrnm7TmjqXmr5TovoNcblx0ICAgICAgICAgICAg5pyJ55Sf5oiQ6KeE5YiZ77yaXG5cdCAgICAgICAgICAgICAgICBudW1iZXJcblx0ICAgICAgICAgICAgICAgICAgICBtaW4tbWF4LmRtaW4tZG1heFxuXHQgICAgICAgICAgICAgICAgICAgIG1pbi1tYXguZGNvdW50XG5cdCAgICAgICAgICAgICAgICAgICAgY291bnQuZG1pbi1kbWF4XG5cdCAgICAgICAgICAgICAgICAgICAgY291bnQuZGNvdW50XG5cdCAgICAgICAgICAgICAgICAgICAgK3N0ZXBcblx0ICAgICAgICAgICAgICAgICAgICDmlbTmlbDpg6jliIZcblx0ICAgICAgICAgICAgICAgICAgICDlsI/mlbDpg6jliIZcblx0ICAgICAgICAgICAgICAgIGJvb2xlYW4gXG5cdCAgICAgICAgICAgICAgICBzdHJpbmcgIFxuXHQgICAgICAgICAgICAgICAgICAgIG1pbi1tYXhcblx0ICAgICAgICAgICAgICAgICAgICBjb3VudFxuXHQgICAgIyMgcHJvcGVydGllc1xuXHQgICAgICAgIOWvueixoVxuXHQgICAgICAgICAgICDmnInnlJ/miJDop4TliJnvvJrmo4DmtYvmnJ/mnJvnmoTlsZ7mgKfkuKrmlbDvvIznu6fnu63pgJLlvZJcblx0ICAgICAgICAgICAg5peg55Sf5oiQ6KeE5YiZ77ya5qOA5rWL5YWo6YOo55qE5bGe5oCn5Liq5pWw77yM57un57ut6YCS5b2SXG5cdCAgICAjIyBpdGVtc1xuXHQgICAgICAgIOaVsOe7hFxuXHQgICAgICAgICAgICDmnInnlJ/miJDop4TliJnvvJpcblx0ICAgICAgICAgICAgICAgIGAnbmFtZXwxJzogW3t9LCB7fSAuLi5dYCAgICAgICAgICAgIOWFtuS4reS5i+S4gO+8jOe7p+e7remAkuW9klxuXHQgICAgICAgICAgICAgICAgYCduYW1lfCsxJzogW3t9LCB7fSAuLi5dYCAgICAgICAgICAg6aG65bqP5qOA5rWL77yM57un57ut6YCS5b2SXG5cdCAgICAgICAgICAgICAgICBgJ25hbWV8bWluLW1heCc6IFt7fSwge30gLi4uXWAgICAgICDmo4DmtYvkuKrmlbDvvIznu6fnu63pgJLlvZJcblx0ICAgICAgICAgICAgICAgIGAnbmFtZXxjb3VudCc6IFt7fSwge30gLi4uXWAgICAgICAgIOajgOa1i+S4quaVsO+8jOe7p+e7remAkuW9klxuXHQgICAgICAgICAgICDml6DnlJ/miJDop4TliJnvvJrmo4DmtYvlhajpg6jnmoTlhYPntKDkuKrmlbDvvIznu6fnu63pgJLlvZJcblx0Ki9cblx0dmFyIERpZmYgPSB7XG5cdCAgICBkaWZmOiBmdW5jdGlvbiBkaWZmKHNjaGVtYSwgZGF0YSwgbmFtZSAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW11cblxuXHQgICAgICAgIC8vIOWFiOajgOa1i+WQjeensCBuYW1lIOWSjOexu+WeiyB0eXBl77yM5aaC5p6c5Yy56YWN77yM5omN5pyJ5b+F6KaB57un57ut5qOA5rWLXG5cdCAgICAgICAgaWYgKFxuXHQgICAgICAgICAgICB0aGlzLm5hbWUoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpICYmXG5cdCAgICAgICAgICAgIHRoaXMudHlwZShzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdClcblx0ICAgICAgICApIHtcblx0ICAgICAgICAgICAgdGhpcy52YWx1ZShzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdClcblx0ICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KVxuXHQgICAgICAgICAgICB0aGlzLml0ZW1zKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICAvKiBqc2hpbnQgdW51c2VkOmZhbHNlICovXG5cdCAgICBuYW1lOiBmdW5jdGlvbihzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkge1xuXHQgICAgICAgIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoXG5cblx0ICAgICAgICBBc3NlcnQuZXF1YWwoJ25hbWUnLCBzY2hlbWEucGF0aCwgbmFtZSArICcnLCBzY2hlbWEubmFtZSArICcnLCByZXN1bHQpXG5cblx0ICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICB9LFxuXHQgICAgdHlwZTogZnVuY3Rpb24oc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpIHtcblx0ICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aFxuXG5cdCAgICAgICAgc3dpdGNoIChzY2hlbWEudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuXHQgICAgICAgICAgICAgICAgLy8g6Lez6L+H5ZCr5pyJ44CO5Y2g5L2N56ym44CP55qE5bGe5oCn5YC877yM5Zug5Li644CO5Y2g5L2N56ym44CP6L+U5Zue5YC855qE57G75Z6L5Y+v6IO95ZKM5qih5p2/5LiN5LiA6Ie077yM5L6L5aaCICdAaW50JyDkvJrov5Tlm57kuIDkuKrmlbTlvaLlgLxcblx0ICAgICAgICAgICAgICAgIGlmIChzY2hlbWEudGVtcGxhdGUubWF0Y2goQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIpKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuXHQgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS5ydWxlLnBhcmFtZXRlcnMpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBuYW1lfGNvdW50OiBhcnJheVxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWEucnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBzY2hlbWEucnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyDot7Pov4cgbmFtZXwxOiBhcnJhee+8jOWboOS4uuacgOe7iOWAvOeahOexu+Wei++8iOW+iOWPr+iDve+8ieS4jeaYr+aVsOe7hO+8jOS5n+S4jeS4gOWumuS4jiBgYXJyYXlgIOS4reeahOexu+Wei+S4gOiHtFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnJ1bGUuY291bnQgPT09IDEpIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIC8vIOi3s+i/hyBuYW1lfCtpbmM6IGFycmF5XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS5ydWxlLnBhcmFtZXRlcnNbMl0pIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG5cdCAgICAgICAgICAgICAgICAvLyDot7Pov4cgYCduYW1lJzogZnVuY3Rpb25g77yM5Zug5Li65Ye95pWw5Y+v5Lul6L+U5Zue5Lu75L2V57G75Z6L55qE5YC844CCXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIEFzc2VydC5lcXVhbCgndHlwZScsIHNjaGVtYS5wYXRoLCBVdGlsLnR5cGUoZGF0YSksIHNjaGVtYS50eXBlLCByZXN1bHQpXG5cblx0ICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICB9LFxuXHQgICAgdmFsdWU6IGZ1bmN0aW9uKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KSB7XG5cdCAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGhcblxuXHQgICAgICAgIHZhciBydWxlID0gc2NoZW1hLnJ1bGVcblx0ICAgICAgICB2YXIgdGVtcGxhdGVUeXBlID0gc2NoZW1hLnR5cGVcblx0ICAgICAgICBpZiAodGVtcGxhdGVUeXBlID09PSAnb2JqZWN0JyB8fCB0ZW1wbGF0ZVR5cGUgPT09ICdhcnJheScgfHwgdGVtcGxhdGVUeXBlID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdHJ1ZVxuXG5cdCAgICAgICAgLy8g5peg55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgaWYgKCFydWxlLnBhcmFtZXRlcnMpIHtcblx0ICAgICAgICAgICAgc3dpdGNoICh0ZW1wbGF0ZVR5cGUpIHtcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ3JlZ2V4cCc6XG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0Lm1hdGNoKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBkYXRhLCBzY2hlbWEudGVtcGxhdGUsIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuXHQgICAgICAgICAgICAgICAgICAgIC8vIOWQjOagt+i3s+i/h+WQq+acieOAjuWNoOS9jeespuOAj+eahOWxnuaAp+WAvO+8jOWboOS4uuOAjuWNoOS9jeespuOAj+eahOi/lOWbnuWAvOS8mumAmuW4uOS8muS4juaooeadv+S4jeS4gOiHtFxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWEudGVtcGxhdGUubWF0Y2goQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIpKSByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIGRhdGEsIHNjaGVtYS50ZW1wbGF0ZSwgcmVzdWx0KVxuXHQgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5pyJ55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgdmFyIGFjdHVhbFJlcGVhdENvdW50XG5cdCAgICAgICAgc3dpdGNoICh0ZW1wbGF0ZVR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcblx0ICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IChkYXRhICsgJycpLnNwbGl0KCcuJylcblx0ICAgICAgICAgICAgICAgIHBhcnRzWzBdID0gK3BhcnRzWzBdXG5cblx0ICAgICAgICAgICAgICAgIC8vIOaVtOaVsOmDqOWIhlxuXHQgICAgICAgICAgICAgICAgLy8gfG1pbi1tYXhcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzBdLCBNYXRoLm1pbihydWxlLm1pbiwgcnVsZS5tYXgpLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vICwgJ251bWVyaWMgaW5zdGFuY2UgaXMgbG93ZXIgdGhhbiB0aGUgcmVxdWlyZWQgbWluaW11bSAobWluaW11bToge2V4cGVjdGVkfSwgZm91bmQ6IHthY3R1YWx9KScpXG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBwYXJ0c1swXSwgTWF0aC5tYXgocnVsZS5taW4sIHJ1bGUubWF4KSwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy8gfGNvdW50XG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBwYXJ0c1swXSwgcnVsZS5taW4sIHJlc3VsdCwgJ1t2YWx1ZV0gJyArIG5hbWUpXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIOWwj+aVsOmDqOWIhlxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUuZGVjaW1hbCkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIHxkbWluLWRtYXhcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5kbWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5kbWF4ICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBwYXJ0c1sxXS5sZW5ndGgsIHJ1bGUuZG1pbiwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzFdLmxlbmd0aCwgcnVsZS5kbWF4LCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIC8vIHxkY291bnRcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5kbWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5kbWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBwYXJ0c1sxXS5sZW5ndGgsIHJ1bGUuZG1pbiwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblxuXHQgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cblx0ICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcblx0ICAgICAgICAgICAgICAgIC8vICdhYWEnLm1hdGNoKC9hL2cpXG5cdCAgICAgICAgICAgICAgICBhY3R1YWxSZXBlYXRDb3VudCA9IGRhdGEubWF0Y2gobmV3IFJlZ0V4cChzY2hlbWEudGVtcGxhdGUsICdnJykpXG5cdCAgICAgICAgICAgICAgICBhY3R1YWxSZXBlYXRDb3VudCA9IGFjdHVhbFJlcGVhdENvdW50ID8gYWN0dWFsUmVwZWF0Q291bnQubGVuZ3RoIDogMFxuXG5cdCAgICAgICAgICAgICAgICAvLyB8bWluLW1heFxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygncmVwZWF0IGNvdW50Jywgc2NoZW1hLnBhdGgsIGFjdHVhbFJlcGVhdENvdW50LCBydWxlLm1pbiwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygncmVwZWF0IGNvdW50Jywgc2NoZW1hLnBhdGgsIGFjdHVhbFJlcGVhdENvdW50LCBydWxlLm1heCwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy8gfGNvdW50XG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWluLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cblx0ICAgICAgICAgICAgY2FzZSAncmVnZXhwJzpcblx0ICAgICAgICAgICAgICAgIGFjdHVhbFJlcGVhdENvdW50ID0gZGF0YS5tYXRjaChuZXcgUmVnRXhwKHNjaGVtYS50ZW1wbGF0ZS5zb3VyY2UucmVwbGFjZSgvXlxcXnxcXCQkL2csICcnKSwgJ2cnKSlcblx0ICAgICAgICAgICAgICAgIGFjdHVhbFJlcGVhdENvdW50ID0gYWN0dWFsUmVwZWF0Q291bnQgPyBhY3R1YWxSZXBlYXRDb3VudC5sZW5ndGggOiAwXG5cblx0ICAgICAgICAgICAgICAgIC8vIHxtaW4tbWF4XG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWluLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWF4LCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvLyB8Y291bnRcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5taW4sIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgfSxcblx0ICAgIHByb3BlcnRpZXM6IGZ1bmN0aW9uKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KSB7XG5cdCAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGhcblxuXHQgICAgICAgIHZhciBydWxlID0gc2NoZW1hLnJ1bGVcblx0ICAgICAgICB2YXIga2V5cyA9IFV0aWwua2V5cyhkYXRhKVxuXHQgICAgICAgIGlmICghc2NoZW1hLnByb3BlcnRpZXMpIHJldHVyblxuXG5cdCAgICAgICAgLy8g5peg55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgaWYgKCFzY2hlbWEucnVsZS5wYXJhbWV0ZXJzKSB7XG5cdCAgICAgICAgICAgIEFzc2VydC5lcXVhbCgncHJvcGVydGllcyBsZW5ndGgnLCBzY2hlbWEucGF0aCwga2V5cy5sZW5ndGgsIHNjaGVtYS5wcm9wZXJ0aWVzLmxlbmd0aCwgcmVzdWx0KVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8vIOacieeUn+aIkOinhOWImVxuXHQgICAgICAgICAgICAvLyB8bWluLW1heFxuXHQgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3Byb3BlcnRpZXMgbGVuZ3RoJywgc2NoZW1hLnBhdGgsIGtleXMubGVuZ3RoLCBNYXRoLm1pbihydWxlLm1pbiwgcnVsZS5tYXgpLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ3Byb3BlcnRpZXMgbGVuZ3RoJywgc2NoZW1hLnBhdGgsIGtleXMubGVuZ3RoLCBNYXRoLm1heChydWxlLm1pbiwgcnVsZS5tYXgpLCByZXN1bHQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gfGNvdW50XG5cdCAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIHwxLCB8PjFcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLmNvdW50ICE9PSAxKSBBc3NlcnQuZXF1YWwoJ3Byb3BlcnRpZXMgbGVuZ3RoJywgc2NoZW1hLnBhdGgsIGtleXMubGVuZ3RoLCBydWxlLm1pbiwgcmVzdWx0KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlXG5cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2guYXBwbHkoXG5cdCAgICAgICAgICAgICAgICByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICB0aGlzLmRpZmYoXG5cdCAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmVhY2goc2NoZW1hLnByb3BlcnRpZXMsIGZ1bmN0aW9uKGl0ZW0gLyosIGluZGV4Ki8gKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSBrZXlzW2ldKSBwcm9wZXJ0eSA9IGl0ZW1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IHx8IHNjaGVtYS5wcm9wZXJ0aWVzW2ldXG5cdCAgICAgICAgICAgICAgICAgICAgfSgpLFxuXHQgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5c1tpXV0sXG5cdCAgICAgICAgICAgICAgICAgICAga2V5c1tpXVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICApXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgfSxcblx0ICAgIGl0ZW1zOiBmdW5jdGlvbihzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkge1xuXHQgICAgICAgIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoXG5cblx0ICAgICAgICBpZiAoIXNjaGVtYS5pdGVtcykgcmV0dXJuXG5cblx0ICAgICAgICB2YXIgcnVsZSA9IHNjaGVtYS5ydWxlXG5cblx0ICAgICAgICAvLyDml6DnlJ/miJDop4TliJlcblx0ICAgICAgICBpZiAoIXNjaGVtYS5ydWxlLnBhcmFtZXRlcnMpIHtcblx0ICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCdpdGVtcyBsZW5ndGgnLCBzY2hlbWEucGF0aCwgZGF0YS5sZW5ndGgsIHNjaGVtYS5pdGVtcy5sZW5ndGgsIHJlc3VsdClcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvLyDmnInnlJ/miJDop4TliJlcblx0ICAgICAgICAgICAgLy8gfG1pbi1tYXhcblx0ICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgQXNzZXJ0LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCdpdGVtcycsIHNjaGVtYS5wYXRoLCBkYXRhLmxlbmd0aCwgKE1hdGgubWluKHJ1bGUubWluLCBydWxlLm1heCkgKiBzY2hlbWEuaXRlbXMubGVuZ3RoKSwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICdbe3V0eXBlfV0gYXJyYXkgaXMgdG9vIHNob3J0OiB7cGF0aH0gbXVzdCBoYXZlIGF0IGxlYXN0IHtleHBlY3RlZH0gZWxlbWVudHMgYnV0IGluc3RhbmNlIGhhcyB7YWN0dWFsfSBlbGVtZW50cycpXG5cdCAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ2l0ZW1zJywgc2NoZW1hLnBhdGgsIGRhdGEubGVuZ3RoLCAoTWF0aC5tYXgocnVsZS5taW4sIHJ1bGUubWF4KSAqIHNjaGVtYS5pdGVtcy5sZW5ndGgpLCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgJ1t7dXR5cGV9XSBhcnJheSBpcyB0b28gbG9uZzoge3BhdGh9IG11c3QgaGF2ZSBhdCBtb3N0IHtleHBlY3RlZH0gZWxlbWVudHMgYnV0IGluc3RhbmNlIGhhcyB7YWN0dWFsfSBlbGVtZW50cycpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gfGNvdW50XG5cdCAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIHwxLCB8PjFcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLmNvdW50ID09PSAxKSByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICAgICAgICAgICAgICBlbHNlIEFzc2VydC5lcXVhbCgnaXRlbXMgbGVuZ3RoJywgc2NoZW1hLnBhdGgsIGRhdGEubGVuZ3RoLCAocnVsZS5taW4gKiBzY2hlbWEuaXRlbXMubGVuZ3RoKSwgcmVzdWx0KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIHwraW5jXG5cdCAgICAgICAgICAgIGlmIChydWxlLnBhcmFtZXRlcnNbMl0pIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gbGVuZ3RoKSByZXR1cm4gZmFsc2VcblxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaC5hcHBseShcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgIHRoaXMuZGlmZihcblx0ICAgICAgICAgICAgICAgICAgICBzY2hlbWEuaXRlbXNbaSAlIHNjaGVtYS5pdGVtcy5sZW5ndGhdLFxuXHQgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0sXG5cdCAgICAgICAgICAgICAgICAgICAgaSAlIHNjaGVtYS5pdGVtcy5sZW5ndGhcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgIH1cblx0fVxuXG5cdC8qXG5cdCAgICDlrozlloTjgIHlj4vlpb3nmoTmj5DnpLrkv6Hmga9cblx0ICAgIFxuXHQgICAgRXF1YWwsIG5vdCBlcXVhbCB0bywgZ3JlYXRlciB0aGFuLCBsZXNzIHRoYW4sIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0bywgbGVzcyB0aGFuIG9yIGVxdWFsIHRvXG5cdCAgICDot6/lvoQg6aqM6K+B57G75Z6LIOaPj+i/sCBcblxuXHQgICAgRXhwZWN0IHBhdGgubmFtZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gZXhwZWN0ZWQsIGJ1dCBwYXRoLm5hbWUgaXMgYWN0dWFsLlxuXG5cdCAgICBFeHBlY3QgcGF0aC5uYW1lIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBleHBlY3RlZCwgYnV0IHBhdGgubmFtZSBpcyBhY3R1YWwuXG5cdCAgICBFeHBlY3QgcGF0aC5uYW1lIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBleHBlY3RlZCwgYnV0IHBhdGgubmFtZSBpcyBhY3R1YWwuXG5cblx0Ki9cblx0dmFyIEFzc2VydCA9IHtcblx0ICAgIG1lc3NhZ2U6IGZ1bmN0aW9uKGl0ZW0pIHtcblx0ICAgICAgICByZXR1cm4gKGl0ZW0ubWVzc2FnZSB8fFxuXHQgICAgICAgICAgICAgICAgJ1t7dXR5cGV9XSBFeHBlY3Qge3BhdGh9XFwne2x0eXBlfSB7YWN0aW9ufSB7ZXhwZWN0ZWR9LCBidXQgaXMge2FjdHVhbH0nKVxuXHQgICAgICAgICAgICAucmVwbGFjZSgne3V0eXBlfScsIGl0ZW0udHlwZS50b1VwcGVyQ2FzZSgpKVxuXHQgICAgICAgICAgICAucmVwbGFjZSgne2x0eXBlfScsIGl0ZW0udHlwZS50b0xvd2VyQ2FzZSgpKVxuXHQgICAgICAgICAgICAucmVwbGFjZSgne3BhdGh9JywgVXRpbC5pc0FycmF5KGl0ZW0ucGF0aCkgJiYgaXRlbS5wYXRoLmpvaW4oJy4nKSB8fCBpdGVtLnBhdGgpXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKCd7YWN0aW9ufScsIGl0ZW0uYWN0aW9uKVxuXHQgICAgICAgICAgICAucmVwbGFjZSgne2V4cGVjdGVkfScsIGl0ZW0uZXhwZWN0ZWQpXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKCd7YWN0dWFsfScsIGl0ZW0uYWN0dWFsKVxuXHQgICAgfSxcblx0ICAgIGVxdWFsOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkgcmV0dXJuIHRydWVcblx0ICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSAndHlwZSc6XG5cdCAgICAgICAgICAgICAgICAvLyDmraPliJnmqKHmnb8gPT09IOWtl+espuS4suacgOe7iOWAvFxuXHQgICAgICAgICAgICAgICAgaWYgKGV4cGVjdGVkID09PSAncmVnZXhwJyAmJiBhY3R1YWwgPT09ICdzdHJpbmcnKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICAgICAgcGF0aDogcGF0aCxcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG5cdCAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgICAgICAgICAgYWN0aW9uOiAnaXMgZXF1YWwgdG8nLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGl0ZW0ubWVzc2FnZSA9IEFzc2VydC5tZXNzYWdlKGl0ZW0pXG5cdCAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH0sXG5cdCAgICAvLyBhY3R1YWwgbWF0Y2hlcyBleHBlY3RlZFxuXHQgICAgbWF0Y2g6IGZ1bmN0aW9uKHR5cGUsIHBhdGgsIGFjdHVhbCwgZXhwZWN0ZWQsIHJlc3VsdCwgbWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChleHBlY3RlZC50ZXN0KGFjdHVhbCkpIHJldHVybiB0cnVlXG5cblx0ICAgICAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICAgICAgcGF0aDogcGF0aCxcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG5cdCAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgICAgICAgICAgYWN0aW9uOiAnbWF0Y2hlcycsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Vcblx0ICAgICAgICB9XG5cdCAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcblx0ICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfSxcblx0ICAgIG5vdEVxdWFsOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkgcmV0dXJuIHRydWVcblx0ICAgICAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICAgICAgcGF0aDogcGF0aCxcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG5cdCAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgICAgICAgICAgYWN0aW9uOiAnaXMgbm90IGVxdWFsIHRvJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuXHQgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9LFxuXHQgICAgZ3JlYXRlclRoYW46IGZ1bmN0aW9uKHR5cGUsIHBhdGgsIGFjdHVhbCwgZXhwZWN0ZWQsIHJlc3VsdCwgbWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChhY3R1YWwgPiBleHBlY3RlZCkgcmV0dXJuIHRydWVcblx0ICAgICAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICAgICAgcGF0aDogcGF0aCxcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG5cdCAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgICAgICAgICAgYWN0aW9uOiAnaXMgZ3JlYXRlciB0aGFuJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuXHQgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9LFxuXHQgICAgbGVzc1RoYW46IGZ1bmN0aW9uKHR5cGUsIHBhdGgsIGFjdHVhbCwgZXhwZWN0ZWQsIHJlc3VsdCwgbWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChhY3R1YWwgPCBleHBlY3RlZCkgcmV0dXJuIHRydWVcblx0ICAgICAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICAgICAgcGF0aDogcGF0aCxcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG5cdCAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgICAgICAgICAgYWN0aW9uOiAnaXMgbGVzcyB0bycsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Vcblx0ICAgICAgICB9XG5cdCAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcblx0ICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfSxcblx0ICAgIGdyZWF0ZXJUaGFuT3JFcXVhbFRvOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAoYWN0dWFsID49IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIHZhciBpdGVtID0ge1xuXHQgICAgICAgICAgICBwYXRoOiBwYXRoLFxuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcblx0ICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuXHQgICAgICAgICAgICBhY3Rpb246ICdpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8nLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGl0ZW0ubWVzc2FnZSA9IEFzc2VydC5tZXNzYWdlKGl0ZW0pXG5cdCAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH0sXG5cdCAgICBsZXNzVGhhbk9yRXF1YWxUbzogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG5cdCAgICAgICAgaWYgKGFjdHVhbCA8PSBleHBlY3RlZCkgcmV0dXJuIHRydWVcblx0ICAgICAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICAgICAgcGF0aDogcGF0aCxcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG5cdCAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgICAgICAgICAgYWN0aW9uOiAnaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuXHQgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9XG5cdH1cblxuXHR2YWxpZC5EaWZmID0gRGlmZlxuXHR2YWxpZC5Bc3NlcnQgPSBBc3NlcnRcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHZhbGlkXG5cbi8qKiovIH0sXG4vKiAyNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuXG4vKioqLyB9LFxuLyogMjggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIGdsb2JhbCB3aW5kb3csIGRvY3VtZW50LCBsb2NhdGlvbiwgRXZlbnQsIHNldFRpbWVvdXQgKi9cblx0Lypcblx0ICAgICMjIE1vY2tYTUxIdHRwUmVxdWVzdFxuXG5cdCAgICDmnJ/mnJvnmoTlip/og73vvJpcblx0ICAgIDEuIOWujOaVtOWcsOimhuebluWOn+eUnyBYSFIg55qE6KGM5Li6XG5cdCAgICAyLiDlrozmlbTlnLDmqKHmi5/ljp/nlJ8gWEhSIOeahOihjOS4ulxuXHQgICAgMy4g5Zyo5Y+R6LW36K+35rGC5pe277yM6Ieq5Yqo5qOA5rWL5piv5ZCm6ZyA6KaB5oum5oiqXG5cdCAgICA0LiDlpoLmnpzkuI3lv4Xmi6bmiKrvvIzliJnmiafooYzljp/nlJ8gWEhSIOeahOihjOS4ulxuXHQgICAgNS4g5aaC5p6c6ZyA6KaB5oum5oiq77yM5YiZ5omn6KGM6Jma5oufIFhIUiDnmoTooYzkuLpcblx0ICAgIDYuIOWFvOWuuSBYTUxIdHRwUmVxdWVzdCDlkowgQWN0aXZlWE9iamVjdFxuXHQgICAgICAgIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuXHQgICAgICAgIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpXG5cblx0ICAgIOWFs+mUruaWueazleeahOmAu+i+ke+8mlxuXHQgICAgKiBuZXcgICDmraTml7blsJrml6Dms5Xnoa7lrprmmK/lkKbpnIDopoHmi6bmiKrvvIzmiYDku6XliJvlu7rljp/nlJ8gWEhSIOWvueixoeaYr+W/hemhu+eahOOAglxuXHQgICAgKiBvcGVuICDmraTml7blj6/ku6Xlj5bliLAgVVJM77yM5Y+v5Lul5Yaz5a6a5piv5ZCm6L+b6KGM5oum5oiq44CCXG5cdCAgICAqIHNlbmQgIOatpOaXtuW3sue7j+ehruWumuS6huivt+axguaWueW8j+OAglxuXG5cdCAgICDop4TojIPvvJpcblx0ICAgIGh0dHA6Ly94aHIuc3BlYy53aGF0d2cub3JnL1xuXHQgICAgaHR0cDovL3d3dy53My5vcmcvVFIvWE1MSHR0cFJlcXVlc3QyL1xuXG5cdCAgICDlj4LogIPlrp7njrDvvJpcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9waGlsaWtvbi9Nb2NrSHR0cFJlcXVlc3QvYmxvYi9tYXN0ZXIvbGliL21vY2suanNcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS90cmVrL0Zha2VYTUxIdHRwUmVxdWVzdC9ibG9iL21hc3Rlci9mYWtlX3htbF9odHRwX3JlcXVlc3QuanNcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pbGluc2t5L3htbGh0dHByZXF1ZXN0L2Jsb2IvbWFzdGVyL1hNTEh0dHBSZXF1ZXN0LmpzXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vZmlyZWJ1Zy9maXJlYnVnLWxpdGUvYmxvYi9tYXN0ZXIvY29udGVudC9saXRlL3hoci5qc1xuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL3RoeC9SQVAvYmxvYi9tYXN0ZXIvbGFiL3JhcC5wbHVnaW4ueGluZ2xpZS5qc1xuXG5cdCAgICAqKumcgOS4jemcgOimgeWFqOmdoumHjeWGmSBYTUxIdHRwUmVxdWVzdO+8nyoqXG5cdCAgICAgICAgaHR0cDovL3hoci5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS14bWxodHRwcmVxdWVzdFxuXHQgICAgICAgIOWFs+mUruWxnuaApyByZWFkeVN0YXRl44CBc3RhdHVz44CBc3RhdHVzVGV4dOOAgXJlc3BvbnNl44CBcmVzcG9uc2VUZXh044CBcmVzcG9uc2VYTUwg5pivIHJlYWRvbmx577yM5omA5Lul77yM6K+V5Zu+6YCa6L+H5L+u5pS56L+Z5Lqb54q25oCB77yM5p2l5qih5ouf5ZON5bqU5piv5LiN5Y+v6KGM55qE44CCXG5cdCAgICAgICAg5Zug5q2k77yM5ZSv5LiA55qE5Yqe5rOV5piv5qih5ouf5pW05LiqIFhNTEh0dHBSZXF1ZXN077yM5bCx5YOPIGpRdWVyeSDlr7nkuovku7bmqKHlnovnmoTlsIHoo4XjgIJcblxuXHQgICAgLy8gRXZlbnQgaGFuZGxlcnNcblx0ICAgIG9ubG9hZHN0YXJ0ICAgICAgICAgbG9hZHN0YXJ0XG5cdCAgICBvbnByb2dyZXNzICAgICAgICAgIHByb2dyZXNzXG5cdCAgICBvbmFib3J0ICAgICAgICAgICAgIGFib3J0XG5cdCAgICBvbmVycm9yICAgICAgICAgICAgIGVycm9yXG5cdCAgICBvbmxvYWQgICAgICAgICAgICAgIGxvYWRcblx0ICAgIG9udGltZW91dCAgICAgICAgICAgdGltZW91dFxuXHQgICAgb25sb2FkZW5kICAgICAgICAgICBsb2FkZW5kXG5cdCAgICBvbnJlYWR5c3RhdGVjaGFuZ2UgIHJlYWR5c3RhdGVjaGFuZ2Vcblx0ICovXG5cblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cblx0Ly8g5aSH5Lu95Y6f55SfIFhNTEh0dHBSZXF1ZXN0XG5cdHdpbmRvdy5fWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3Rcblx0d2luZG93Ll9BY3RpdmVYT2JqZWN0ID0gd2luZG93LkFjdGl2ZVhPYmplY3RcblxuXHQvKlxuXHQgICAgUGhhbnRvbUpTXG5cdCAgICBUeXBlRXJyb3I6ICdbb2JqZWN0IEV2ZW50Q29uc3RydWN0b3JdJyBpcyBub3QgYSBjb25zdHJ1Y3RvciAoZXZhbHVhdGluZyAnbmV3IEV2ZW50KFwicmVhZHlzdGF0ZWNoYW5nZVwiKScpXG5cblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlcmFpbC90d2l0dGVyLWJvb3RzdHJhcC1yYWlscy1jb25maXJtL2lzc3Vlcy8xOFxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2FyaXlhL3BoYW50b21qcy9pc3N1ZXMvMTEyODlcblx0Ki9cblx0dHJ5IHtcblx0ICAgIG5ldyB3aW5kb3cuRXZlbnQoJ2N1c3RvbScpXG5cdH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuXHQgICAgd2luZG93LkV2ZW50ID0gZnVuY3Rpb24odHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGV0YWlsKSB7XG5cdCAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JykgLy8gTVVTVCBiZSAnQ3VzdG9tRXZlbnQnXG5cdCAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbClcblx0ICAgICAgICByZXR1cm4gZXZlbnRcblx0ICAgIH1cblx0fVxuXG5cdHZhciBYSFJfU1RBVEVTID0ge1xuXHQgICAgLy8gVGhlIG9iamVjdCBoYXMgYmVlbiBjb25zdHJ1Y3RlZC5cblx0ICAgIFVOU0VOVDogMCxcblx0ICAgIC8vIFRoZSBvcGVuKCkgbWV0aG9kIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBpbnZva2VkLlxuXHQgICAgT1BFTkVEOiAxLFxuXHQgICAgLy8gQWxsIHJlZGlyZWN0cyAoaWYgYW55KSBoYXZlIGJlZW4gZm9sbG93ZWQgYW5kIGFsbCBIVFRQIGhlYWRlcnMgb2YgdGhlIHJlc3BvbnNlIGhhdmUgYmVlbiByZWNlaXZlZC5cblx0ICAgIEhFQURFUlNfUkVDRUlWRUQ6IDIsXG5cdCAgICAvLyBUaGUgcmVzcG9uc2UncyBib2R5IGlzIGJlaW5nIHJlY2VpdmVkLlxuXHQgICAgTE9BRElORzogMyxcblx0ICAgIC8vIFRoZSBkYXRhIHRyYW5zZmVyIGhhcyBiZWVuIGNvbXBsZXRlZCBvciBzb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgdGhlIHRyYW5zZmVyIChlLmcuIGluZmluaXRlIHJlZGlyZWN0cykuXG5cdCAgICBET05FOiA0XG5cdH1cblxuXHR2YXIgWEhSX0VWRU5UUyA9ICdyZWFkeXN0YXRlY2hhbmdlIGxvYWRzdGFydCBwcm9ncmVzcyBhYm9ydCBlcnJvciBsb2FkIHRpbWVvdXQgbG9hZGVuZCcuc3BsaXQoJyAnKVxuXHR2YXIgWEhSX1JFUVVFU1RfUFJPUEVSVElFUyA9ICd0aW1lb3V0IHdpdGhDcmVkZW50aWFscycuc3BsaXQoJyAnKVxuXHR2YXIgWEhSX1JFU1BPTlNFX1BST1BFUlRJRVMgPSAncmVhZHlTdGF0ZSByZXNwb25zZVVSTCBzdGF0dXMgc3RhdHVzVGV4dCByZXNwb25zZVR5cGUgcmVzcG9uc2UgcmVzcG9uc2VUZXh0IHJlc3BvbnNlWE1MJy5zcGxpdCgnICcpXG5cblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3RyZWsvRmFrZVhNTEh0dHBSZXF1ZXN0L2Jsb2IvbWFzdGVyL2Zha2VfeG1sX2h0dHBfcmVxdWVzdC5qcyNMMzJcblx0dmFyIEhUVFBfU1RBVFVTX0NPREVTID0ge1xuXHQgICAgMTAwOiBcIkNvbnRpbnVlXCIsXG5cdCAgICAxMDE6IFwiU3dpdGNoaW5nIFByb3RvY29sc1wiLFxuXHQgICAgMjAwOiBcIk9LXCIsXG5cdCAgICAyMDE6IFwiQ3JlYXRlZFwiLFxuXHQgICAgMjAyOiBcIkFjY2VwdGVkXCIsXG5cdCAgICAyMDM6IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcblx0ICAgIDIwNDogXCJObyBDb250ZW50XCIsXG5cdCAgICAyMDU6IFwiUmVzZXQgQ29udGVudFwiLFxuXHQgICAgMjA2OiBcIlBhcnRpYWwgQ29udGVudFwiLFxuXHQgICAgMzAwOiBcIk11bHRpcGxlIENob2ljZVwiLFxuXHQgICAgMzAxOiBcIk1vdmVkIFBlcm1hbmVudGx5XCIsXG5cdCAgICAzMDI6IFwiRm91bmRcIixcblx0ICAgIDMwMzogXCJTZWUgT3RoZXJcIixcblx0ICAgIDMwNDogXCJOb3QgTW9kaWZpZWRcIixcblx0ICAgIDMwNTogXCJVc2UgUHJveHlcIixcblx0ICAgIDMwNzogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcblx0ICAgIDQwMDogXCJCYWQgUmVxdWVzdFwiLFxuXHQgICAgNDAxOiBcIlVuYXV0aG9yaXplZFwiLFxuXHQgICAgNDAyOiBcIlBheW1lbnQgUmVxdWlyZWRcIixcblx0ICAgIDQwMzogXCJGb3JiaWRkZW5cIixcblx0ICAgIDQwNDogXCJOb3QgRm91bmRcIixcblx0ICAgIDQwNTogXCJNZXRob2QgTm90IEFsbG93ZWRcIixcblx0ICAgIDQwNjogXCJOb3QgQWNjZXB0YWJsZVwiLFxuXHQgICAgNDA3OiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG5cdCAgICA0MDg6IFwiUmVxdWVzdCBUaW1lb3V0XCIsXG5cdCAgICA0MDk6IFwiQ29uZmxpY3RcIixcblx0ICAgIDQxMDogXCJHb25lXCIsXG5cdCAgICA0MTE6IFwiTGVuZ3RoIFJlcXVpcmVkXCIsXG5cdCAgICA0MTI6IFwiUHJlY29uZGl0aW9uIEZhaWxlZFwiLFxuXHQgICAgNDEzOiBcIlJlcXVlc3QgRW50aXR5IFRvbyBMYXJnZVwiLFxuXHQgICAgNDE0OiBcIlJlcXVlc3QtVVJJIFRvbyBMb25nXCIsXG5cdCAgICA0MTU6IFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiLFxuXHQgICAgNDE2OiBcIlJlcXVlc3RlZCBSYW5nZSBOb3QgU2F0aXNmaWFibGVcIixcblx0ICAgIDQxNzogXCJFeHBlY3RhdGlvbiBGYWlsZWRcIixcblx0ICAgIDQyMjogXCJVbnByb2Nlc3NhYmxlIEVudGl0eVwiLFxuXHQgICAgNTAwOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuXHQgICAgNTAxOiBcIk5vdCBJbXBsZW1lbnRlZFwiLFxuXHQgICAgNTAyOiBcIkJhZCBHYXRld2F5XCIsXG5cdCAgICA1MDM6IFwiU2VydmljZSBVbmF2YWlsYWJsZVwiLFxuXHQgICAgNTA0OiBcIkdhdGV3YXkgVGltZW91dFwiLFxuXHQgICAgNTA1OiBcIkhUVFAgVmVyc2lvbiBOb3QgU3VwcG9ydGVkXCJcblx0fVxuXG5cdC8qXG5cdCAgICBNb2NrWE1MSHR0cFJlcXVlc3Rcblx0Ki9cblxuXHRmdW5jdGlvbiBNb2NrWE1MSHR0cFJlcXVlc3QoKSB7XG5cdCAgICAvLyDliJ3lp4vljJYgY3VzdG9tIOWvueixoe+8jOeUqOS6juWtmOWCqOiHquWumuS5ieWxnuaAp1xuXHQgICAgdGhpcy5jdXN0b20gPSB7XG5cdCAgICAgICAgZXZlbnRzOiB7fSxcblx0ICAgICAgICByZXF1ZXN0SGVhZGVyczoge30sXG5cdCAgICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7fVxuXHQgICAgfVxuXHR9XG5cblx0TW9ja1hNTEh0dHBSZXF1ZXN0Ll9zZXR0aW5ncyA9IHtcblx0ICAgIHRpbWVvdXQ6ICcxMC0xMDAnLFxuXHQgICAgLypcblx0ICAgICAgICB0aW1lb3V0OiA1MCxcblx0ICAgICAgICB0aW1lb3V0OiAnMTAtMTAwJyxcblx0ICAgICAqL1xuXHR9XG5cblx0TW9ja1hNTEh0dHBSZXF1ZXN0LnNldHVwID0gZnVuY3Rpb24oc2V0dGluZ3MpIHtcblx0ICAgIFV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdC5fc2V0dGluZ3MsIHNldHRpbmdzKVxuXHQgICAgcmV0dXJuIE1vY2tYTUxIdHRwUmVxdWVzdC5fc2V0dGluZ3Ncblx0fVxuXG5cdFV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdCwgWEhSX1NUQVRFUylcblx0VXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgWEhSX1NUQVRFUylcblxuXHQvLyDmoIforrDlvZPliY3lr7nosaHkuLogTW9ja1hNTEh0dHBSZXF1ZXN0XG5cdE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUubW9jayA9IHRydWVcblxuXHQvLyDmmK/lkKbmi6bmiKogQWpheCDor7fmsYJcblx0TW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5tYXRjaCA9IGZhbHNlXG5cblx0Ly8g5Yid5aeL5YyWIFJlcXVlc3Qg55u45YWz55qE5bGe5oCn5ZKM5pa55rOVXG5cdFV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsIHtcblx0ICAgIC8vIGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLW9wZW4oKS1tZXRob2Rcblx0ICAgIC8vIFNldHMgdGhlIHJlcXVlc3QgbWV0aG9kLCByZXF1ZXN0IFVSTCwgYW5kIHN5bmNocm9ub3VzIGZsYWcuXG5cdCAgICBvcGVuOiBmdW5jdGlvbihtZXRob2QsIHVybCwgYXN5bmMsIHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXHQgICAgICAgIHZhciB0aGF0ID0gdGhpc1xuXG5cdCAgICAgICAgVXRpbC5leHRlbmQodGhpcy5jdXN0b20sIHtcblx0ICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG5cdCAgICAgICAgICAgIHVybDogdXJsLFxuXHQgICAgICAgICAgICBhc3luYzogdHlwZW9mIGFzeW5jID09PSAnYm9vbGVhbicgPyBhc3luYyA6IHRydWUsXG5cdCAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcblx0ICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuXHQgICAgICAgICAgICBvcHRpb25zOiB7XG5cdCAgICAgICAgICAgICAgICB1cmw6IHVybCxcblx0ICAgICAgICAgICAgICAgIHR5cGU6IG1ldGhvZFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSlcblxuXHQgICAgICAgIHRoaXMuY3VzdG9tLnRpbWVvdXQgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZW91dCA9PT0gJ251bWJlcicpIHJldHVybiB0aW1lb3V0XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZW91dCA9PT0gJ3N0cmluZycgJiYgIX50aW1lb3V0LmluZGV4T2YoJy0nKSkgcmV0dXJuIHBhcnNlSW50KHRpbWVvdXQsIDEwKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgPT09ICdzdHJpbmcnICYmIH50aW1lb3V0LmluZGV4T2YoJy0nKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRpbWVvdXQuc3BsaXQoJy0nKVxuXHQgICAgICAgICAgICAgICAgdmFyIG1pbiA9IHBhcnNlSW50KHRtcFswXSwgMTApXG5cdCAgICAgICAgICAgICAgICB2YXIgbWF4ID0gcGFyc2VJbnQodG1wWzFdLCAxMClcblx0ICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0oTW9ja1hNTEh0dHBSZXF1ZXN0Ll9zZXR0aW5ncy50aW1lb3V0KVxuXG5cdCAgICAgICAgLy8g5p+l5om+5LiO6K+35rGC5Y+C5pWw5Yy56YWN55qE5pWw5o2u5qih5p2/XG5cdCAgICAgICAgdmFyIGl0ZW0gPSBmaW5kKHRoaXMuY3VzdG9tLm9wdGlvbnMpXG5cblx0ICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZXZlbnQpIHtcblx0ICAgICAgICAgICAgLy8g5ZCM5q2l5bGe5oCnIE5hdGl2ZVhNTEh0dHBSZXF1ZXN0ID0+IE1vY2tYTUxIdHRwUmVxdWVzdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFhIUl9SRVNQT05TRV9QUk9QRVJUSUVTLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoYXRbWEhSX1JFU1BPTlNFX1BST1BFUlRJRVNbaV1dID0geGhyW1hIUl9SRVNQT05TRV9QUk9QRVJUSUVTW2ldXVxuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAvLyDop6blj5EgTW9ja1hNTEh0dHBSZXF1ZXN0IOS4iueahOWQjOWQjeS6i+S7tlxuXHQgICAgICAgICAgICB0aGF0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGV2ZW50LnR5cGUgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5aaC5p6c5pyq5om+5Yiw5Yy56YWN55qE5pWw5o2u5qih5p2/77yM5YiZ6YeH55So5Y6f55SfIFhIUiDlj5HpgIHor7fmsYLjgIJcblx0ICAgICAgICBpZiAoIWl0ZW0pIHtcblx0ICAgICAgICAgICAgLy8g5Yib5bu65Y6f55SfIFhIUiDlr7nosaHvvIzosIPnlKjljp/nlJ8gb3Blbigp77yM55uR5ZCs5omA5pyJ5Y6f55Sf5LqL5Lu2XG5cdCAgICAgICAgICAgIHZhciB4aHIgPSBjcmVhdGVOYXRpdmVYTUxIdHRwUmVxdWVzdCgpXG5cdCAgICAgICAgICAgIHRoaXMuY3VzdG9tLnhociA9IHhoclxuXG5cdCAgICAgICAgICAgIC8vIOWIneWni+WMluaJgOacieS6i+S7tu+8jOeUqOS6juebkeWQrOWOn+eUnyBYSFIg5a+56LGh55qE5LqL5Lu2XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgWEhSX0VWRU5UUy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoWEhSX0VWRU5UU1tpXSwgaGFuZGxlKVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8geGhyLm9wZW4oKVxuXHQgICAgICAgICAgICBpZiAodXNlcm5hbWUpIHhoci5vcGVuKG1ldGhvZCwgdXJsLCBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkKVxuXHQgICAgICAgICAgICBlbHNlIHhoci5vcGVuKG1ldGhvZCwgdXJsLCBhc3luYylcblxuXHQgICAgICAgICAgICAvLyDlkIzmraXlsZ7mgKcgTW9ja1hNTEh0dHBSZXF1ZXN0ID0+IE5hdGl2ZVhNTEh0dHBSZXF1ZXN0XG5cdCAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgWEhSX1JFUVVFU1RfUFJPUEVSVElFUy5sZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICB4aHJbWEhSX1JFUVVFU1RfUFJPUEVSVElFU1tqXV0gPSB0aGF0W1hIUl9SRVFVRVNUX1BST1BFUlRJRVNbal1dXG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5om+5Yiw5LqG5Yy56YWN55qE5pWw5o2u5qih5p2/77yM5byA5aeL5oum5oiqIFhIUiDor7fmsYJcblx0ICAgICAgICB0aGlzLm1hdGNoID0gdHJ1ZVxuXHQgICAgICAgIHRoaXMuY3VzdG9tLnRlbXBsYXRlID0gaXRlbVxuXHQgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IE1vY2tYTUxIdHRwUmVxdWVzdC5PUEVORURcblx0ICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZWFkeXN0YXRlY2hhbmdlJyAvKiwgZmFsc2UsIGZhbHNlLCB0aGlzKi8gKSlcblx0ICAgIH0sXG5cdCAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1zZXRyZXF1ZXN0aGVhZGVyKCktbWV0aG9kXG5cdCAgICAvLyBDb21iaW5lcyBhIGhlYWRlciBpbiBhdXRob3IgcmVxdWVzdCBoZWFkZXJzLlxuXHQgICAgc2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcblx0ICAgICAgICAvLyDljp/nlJ8gWEhSXG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuY3VzdG9tLnhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDmi6bmiKogWEhSXG5cdCAgICAgICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gdGhpcy5jdXN0b20ucmVxdWVzdEhlYWRlcnNcblx0ICAgICAgICBpZiAocmVxdWVzdEhlYWRlcnNbbmFtZV0pIHJlcXVlc3RIZWFkZXJzW25hbWVdICs9ICcsJyArIHZhbHVlXG5cdCAgICAgICAgZWxzZSByZXF1ZXN0SGVhZGVyc1tuYW1lXSA9IHZhbHVlXG5cdCAgICB9LFxuXHQgICAgdGltZW91dDogMCxcblx0ICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG5cdCAgICB1cGxvYWQ6IHt9LFxuXHQgICAgLy8gaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtc2VuZCgpLW1ldGhvZFxuXHQgICAgLy8gSW5pdGlhdGVzIHRoZSByZXF1ZXN0LlxuXHQgICAgc2VuZDogZnVuY3Rpb24gc2VuZChkYXRhKSB7XG5cdCAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG5cdCAgICAgICAgdGhpcy5jdXN0b20ub3B0aW9ucy5ib2R5ID0gZGF0YVxuXG5cdCAgICAgICAgLy8g5Y6f55SfIFhIUlxuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCkge1xuXHQgICAgICAgICAgICB0aGlzLmN1c3RvbS54aHIuc2VuZChkYXRhKVxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDmi6bmiKogWEhSXG5cblx0ICAgICAgICAvLyBYLVJlcXVlc3RlZC1XaXRoIGhlYWRlclxuXHQgICAgICAgIHRoaXMuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdNb2NrWE1MSHR0cFJlcXVlc3QnKVxuXG5cdCAgICAgICAgLy8gbG9hZHN0YXJ0IFRoZSBmZXRjaCBpbml0aWF0ZXMuXG5cdCAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZHN0YXJ0JyAvKiwgZmFsc2UsIGZhbHNlLCB0aGlzKi8gKSlcblxuXHQgICAgICAgIGlmICh0aGlzLmN1c3RvbS5hc3luYykgc2V0VGltZW91dChkb25lLCB0aGlzLmN1c3RvbS50aW1lb3V0KSAvLyDlvILmraVcblx0ICAgICAgICBlbHNlIGRvbmUoKSAvLyDlkIzmraVcblxuXHQgICAgICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG5cdCAgICAgICAgICAgIHRoYXQucmVhZHlTdGF0ZSA9IE1vY2tYTUxIdHRwUmVxdWVzdC5IRUFERVJTX1JFQ0VJVkVEXG5cdCAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKVxuXHQgICAgICAgICAgICB0aGF0LnJlYWR5U3RhdGUgPSBNb2NrWE1MSHR0cFJlcXVlc3QuTE9BRElOR1xuXHQgICAgICAgICAgICB0aGF0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZWFkeXN0YXRlY2hhbmdlJyAvKiwgZmFsc2UsIGZhbHNlLCB0aGF0Ki8gKSlcblxuXHQgICAgICAgICAgICB0aGF0LnN0YXR1cyA9IDIwMFxuXHQgICAgICAgICAgICB0aGF0LnN0YXR1c1RleHQgPSBIVFRQX1NUQVRVU19DT0RFU1syMDBdXG5cblx0ICAgICAgICAgICAgLy8gZml4ICM5MiAjOTMgYnkgQHFkZGVndHlhXG5cdCAgICAgICAgICAgIHRoYXQucmVzcG9uc2UgPSB0aGF0LnJlc3BvbnNlVGV4dCA9IEpTT04uc3RyaW5naWZ5KFxuXHQgICAgICAgICAgICAgICAgY29udmVydCh0aGF0LmN1c3RvbS50ZW1wbGF0ZSwgdGhhdC5jdXN0b20ub3B0aW9ucyksXG5cdCAgICAgICAgICAgICAgICBudWxsLCA0XG5cdCAgICAgICAgICAgIClcblxuXHQgICAgICAgICAgICB0aGF0LnJlYWR5U3RhdGUgPSBNb2NrWE1MSHR0cFJlcXVlc3QuRE9ORVxuXHQgICAgICAgICAgICB0aGF0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZWFkeXN0YXRlY2hhbmdlJyAvKiwgZmFsc2UsIGZhbHNlLCB0aGF0Ki8gKSlcblx0ICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZCcgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpO1xuXHQgICAgICAgICAgICB0aGF0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2FkZW5kJyAvKiwgZmFsc2UsIGZhbHNlLCB0aGF0Ki8gKSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIC8vIGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLWFib3J0KCktbWV0aG9kXG5cdCAgICAvLyBDYW5jZWxzIGFueSBuZXR3b3JrIGFjdGl2aXR5LlxuXHQgICAgYWJvcnQ6IGZ1bmN0aW9uIGFib3J0KCkge1xuXHQgICAgICAgIC8vIOWOn+eUnyBYSFJcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2gpIHtcblx0ICAgICAgICAgICAgdGhpcy5jdXN0b20ueGhyLmFib3J0KClcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5oum5oiqIFhIUlxuXHQgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IE1vY2tYTUxIdHRwUmVxdWVzdC5VTlNFTlRcblx0ICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdhYm9ydCcsIGZhbHNlLCBmYWxzZSwgdGhpcykpXG5cdCAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZXJyb3InLCBmYWxzZSwgZmFsc2UsIHRoaXMpKVxuXHQgICAgfVxuXHR9KVxuXG5cdC8vIOWIneWni+WMliBSZXNwb25zZSDnm7jlhbPnmoTlsZ7mgKflkozmlrnms5Vcblx0VXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHQgICAgcmVzcG9uc2VVUkw6ICcnLFxuXHQgICAgc3RhdHVzOiBNb2NrWE1MSHR0cFJlcXVlc3QuVU5TRU5ULFxuXHQgICAgc3RhdHVzVGV4dDogJycsXG5cdCAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1nZXRyZXNwb25zZWhlYWRlcigpLW1ldGhvZFxuXHQgICAgZ2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKG5hbWUpIHtcblx0ICAgICAgICAvLyDljp/nlJ8gWEhSXG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbS54aHIuZ2V0UmVzcG9uc2VIZWFkZXIobmFtZSlcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDmi6bmiKogWEhSXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tLnJlc3BvbnNlSGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldXG5cdCAgICB9LFxuXHQgICAgLy8gaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtZ2V0YWxscmVzcG9uc2VoZWFkZXJzKCktbWV0aG9kXG5cdCAgICAvLyBodHRwOi8vd3d3LnV0ZjgtY2hhcnRhYmxlLmRlL1xuXHQgICAgZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICAvLyDljp/nlJ8gWEhSXG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbS54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDmi6bmiKogWEhSXG5cdCAgICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9IHRoaXMuY3VzdG9tLnJlc3BvbnNlSGVhZGVyc1xuXHQgICAgICAgIHZhciBoZWFkZXJzID0gJydcblx0ICAgICAgICBmb3IgKHZhciBoIGluIHJlc3BvbnNlSGVhZGVycykge1xuXHQgICAgICAgICAgICBpZiAoIXJlc3BvbnNlSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoKSkgY29udGludWVcblx0ICAgICAgICAgICAgaGVhZGVycyArPSBoICsgJzogJyArIHJlc3BvbnNlSGVhZGVyc1toXSArICdcXHJcXG4nXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBoZWFkZXJzXG5cdCAgICB9LFxuXHQgICAgb3ZlcnJpZGVNaW1lVHlwZTogZnVuY3Rpb24oIC8qbWltZSovICkge30sXG5cdCAgICByZXNwb25zZVR5cGU6ICcnLCAvLyAnJywgJ3RleHQnLCAnYXJyYXlidWZmZXInLCAnYmxvYicsICdkb2N1bWVudCcsICdqc29uJ1xuXHQgICAgcmVzcG9uc2U6IG51bGwsXG5cdCAgICByZXNwb25zZVRleHQ6ICcnLFxuXHQgICAgcmVzcG9uc2VYTUw6IG51bGxcblx0fSlcblxuXHQvLyBFdmVudFRhcmdldFxuXHRVdGlsLmV4dGVuZChNb2NrWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCB7XG5cdCAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZSkge1xuXHQgICAgICAgIHZhciBldmVudHMgPSB0aGlzLmN1c3RvbS5ldmVudHNcblx0ICAgICAgICBpZiAoIWV2ZW50c1t0eXBlXSkgZXZlbnRzW3R5cGVdID0gW11cblx0ICAgICAgICBldmVudHNbdHlwZV0ucHVzaChoYW5kbGUpXG5cdCAgICB9LFxuXHQgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGUpIHtcblx0ICAgICAgICB2YXIgaGFuZGxlcyA9IHRoaXMuY3VzdG9tLmV2ZW50c1t0eXBlXSB8fCBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBpZiAoaGFuZGxlc1tpXSA9PT0gaGFuZGxlKSB7XG5cdCAgICAgICAgICAgICAgICBoYW5kbGVzLnNwbGljZShpLS0sIDEpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZGlzcGF0Y2hFdmVudDogZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudCkge1xuXHQgICAgICAgIHZhciBoYW5kbGVzID0gdGhpcy5jdXN0b20uZXZlbnRzW2V2ZW50LnR5cGVdIHx8IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGhhbmRsZXNbaV0uY2FsbCh0aGlzLCBldmVudClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgb250eXBlID0gJ29uJyArIGV2ZW50LnR5cGVcblx0ICAgICAgICBpZiAodGhpc1tvbnR5cGVdKSB0aGlzW29udHlwZV0oZXZlbnQpXG5cdCAgICB9XG5cdH0pXG5cblx0Ly8gSW5zcGlyZWQgYnkgalF1ZXJ5XG5cdGZ1bmN0aW9uIGNyZWF0ZU5hdGl2ZVhNTEh0dHBSZXF1ZXN0KCkge1xuXHQgICAgdmFyIGlzTG9jYWwgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgcmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokL1xuXHQgICAgICAgIHZhciBydXJsID0gL14oW1xcdy4rLV0rOikoPzpcXC9cXC8oW15cXC8/IzpdKikoPzo6KFxcZCspfCl8KS9cblx0ICAgICAgICB2YXIgYWpheExvY2F0aW9uID0gbG9jYXRpb24uaHJlZlxuXHQgICAgICAgIHZhciBhamF4TG9jUGFydHMgPSBydXJsLmV4ZWMoYWpheExvY2F0aW9uLnRvTG93ZXJDYXNlKCkpIHx8IFtdXG5cdCAgICAgICAgcmV0dXJuIHJsb2NhbFByb3RvY29sLnRlc3QoYWpheExvY1BhcnRzWzFdKVxuXHQgICAgfSgpXG5cblx0ICAgIHJldHVybiB3aW5kb3cuQWN0aXZlWE9iamVjdCA/XG5cdCAgICAgICAgKCFpc0xvY2FsICYmIGNyZWF0ZVN0YW5kYXJkWEhSKCkgfHwgY3JlYXRlQWN0aXZlWEhSKCkpIDogY3JlYXRlU3RhbmRhcmRYSFIoKVxuXG5cdCAgICBmdW5jdGlvbiBjcmVhdGVTdGFuZGFyZFhIUigpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5fWE1MSHR0cFJlcXVlc3QoKTtcblx0ICAgICAgICB9IGNhdGNoIChlKSB7fVxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBjcmVhdGVBY3RpdmVYSFIoKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuX0FjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcblx0ICAgICAgICB9IGNhdGNoIChlKSB7fVxuXHQgICAgfVxuXHR9XG5cblxuXHQvLyDmn6Xmib7kuI7or7fmsYLlj4LmlbDljLnphY3nmoTmlbDmja7mqKHmnb/vvJpVUkzvvIxUeXBlXG5cdGZ1bmN0aW9uIGZpbmQob3B0aW9ucykge1xuXG5cdCAgICBmb3IgKHZhciBzVXJsVHlwZSBpbiBNb2NrWE1MSHR0cFJlcXVlc3QuTW9jay5fbW9ja2VkKSB7XG5cdCAgICAgICAgdmFyIGl0ZW0gPSBNb2NrWE1MSHR0cFJlcXVlc3QuTW9jay5fbW9ja2VkW3NVcmxUeXBlXVxuXHQgICAgICAgIGlmIChcblx0ICAgICAgICAgICAgKCFpdGVtLnJ1cmwgfHwgbWF0Y2goaXRlbS5ydXJsLCBvcHRpb25zLnVybCkpICYmXG5cdCAgICAgICAgICAgICghaXRlbS5ydHlwZSB8fCBtYXRjaChpdGVtLnJ0eXBlLCBvcHRpb25zLnR5cGUudG9Mb3dlckNhc2UoKSkpXG5cdCAgICAgICAgKSB7XG5cdCAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbbW9ja10nLCBvcHRpb25zLnVybCwgJz4nLCBpdGVtLnJ1cmwpXG5cdCAgICAgICAgICAgIHJldHVybiBpdGVtXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBtYXRjaChleHBlY3RlZCwgYWN0dWFsKSB7XG5cdCAgICAgICAgaWYgKFV0aWwudHlwZShleHBlY3RlZCkgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBleHBlY3RlZCA9PT0gYWN0dWFsXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChVdGlsLnR5cGUoZXhwZWN0ZWQpID09PSAncmVnZXhwJykge1xuXHQgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdH1cblxuXHQvLyDmlbDmja7mqKHmnb8g77ydPiDlk43lupTmlbDmja5cblx0ZnVuY3Rpb24gY29udmVydChpdGVtLCBvcHRpb25zKSB7XG5cdCAgICByZXR1cm4gVXRpbC5pc0Z1bmN0aW9uKGl0ZW0udGVtcGxhdGUpID9cblx0ICAgICAgICBpdGVtLnRlbXBsYXRlKG9wdGlvbnMpIDogTW9ja1hNTEh0dHBSZXF1ZXN0Lk1vY2subW9jayhpdGVtLnRlbXBsYXRlKVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBNb2NrWE1MSHR0cFJlcXVlc3RcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21vY2tqcy9kaXN0L21vY2suanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMub3V0aWxzPXQoKTplLm91dGlscz10KCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChvKXtpZihuW29dKXJldHVybiBuW29dLmV4cG9ydHM7dmFyIHI9bltvXT17aTpvLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbb10uY2FsbChyLmV4cG9ydHMscixyLmV4cG9ydHMsdCksci5sPSEwLHIuZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixvKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Om99KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTUpfShbZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7cmV0dXJuIG5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIit0K1wiKFxcXFxzfCQpXCIpLnRlc3QoZS5jbGFzc05hbWUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0LG4pe3ZhciBvPW5ldyBEYXRlO28uc2V0RGF0ZShvLmdldERhdGUoKStuKSxkb2N1bWVudC5jb29raWU9ZStcIj1cIit0K1wiO2V4cGlyZXM9XCIrb31lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4gd2luZG93LnNjcm9sbFRvKDAsZSksZX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4sbyl7ZnVuY3Rpb24gcigpe2Z1bmN0aW9uIHIoKXthPU51bWJlcihuZXcgRGF0ZSksbi5hcHBseShmLHMpfWZ1bmN0aW9uIHUoKXtpPXZvaWQgMH12YXIgZj10aGlzLGM9TnVtYmVyKG5ldyBEYXRlKS1hLHM9YXJndW1lbnRzO28mJiFpJiZyKCksaSYmY2xlYXJUaW1lb3V0KGkpLHZvaWQgMD09PW8mJmM+ZT9yKCk6ITAhPT10JiYoaT1zZXRUaW1lb3V0KG8/dTpyLHZvaWQgMD09PW8/ZS1jOmUpKX12YXIgaSxhPTA7cmV0dXJuXCJib29sZWFuXCIhPXR5cGVvZiB0JiYobz1uLG49dCx0PXZvaWQgMCkscn19LGZ1bmN0aW9uKGUsdCxuKXt2YXIgbz1uKDYpLHI9big3KSxpPW4oMCksYT1uKDgpLHU9big5KSxmPW4oMTApLGM9bigxKSxzPW4oMTEpLHA9bigxMiksZD1uKDIpLGw9bigxMyksbT1uKDE0KSx2PW4oMyksdz1uKDE1KSxnPW4oMTYpLHk9big0KSxoPW4oMTcpLHg9bigxOCksYj1uKDE5KSxDPW4oMjApLE49bigyMSksUz1uKDIyKSxNPW4oMjMpLEU9bigyNCksRj1uKDI1KSxEPW4oMjYpLEk9bigyNyksVD1uKDI4KSxrPW4oMjkpLFI9bigzMCksQT1uKDMxKTtlLmV4cG9ydHM9e2FycmF5RXF1YWw6byxhZGRDbGFzczpyLGhhc0NsYXNzOmkscmVtb3ZlQ2xhc3M6YSxnZXRDb29raWU6dSxyZW1vdmVDb29raWU6ZixzZXRDb29raWU6YyxnZXRPUzpzLGdldEV4cGxvcmU6cCxnZXRTY3JvbGxUb3A6ZCxvZmZzZXQ6bCxzY3JvbGxUbzptLHNldFNjcm9sbFRvcDp2LHdpbmRvd1Jlc2l6ZTp3LGRlYm91bmNlOmcsdGhyb3R0bGU6eSxnZXRLZXlOYW1lOmgsZGVlcENsb25lOngsaXNFbXB0eU9iamVjdDpiLHJhbmRvbUNvbG9yOkMscmFuZG9tTnVtOk4saXNFbWFpbDpTLGlzSWRDYXJkOk0saXNQaG9uZU51bTpFLGlzVXJsOkYsZGlnaXRVcHBlcmNhc2U6RCxpc1N1cHBvcnRXZWJQOkksZm9ybWF0UGFzc1RpbWU6VCxmb3JtYXRSZW1haW5UaW1lOmsscGFyc2VRdWVyeVN0cmluZzpSLHN0cmluZ2Z5UXVlcnlTdHJpbmc6QX19LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe2lmKGU9PT10KXJldHVybiEwO2lmKGUubGVuZ3RoIT10Lmxlbmd0aClyZXR1cm4hMTtmb3IodmFyIG49MDtuPGUubGVuZ3RoOysrbilpZihlW25dIT09dFtuXSlyZXR1cm4hMTtyZXR1cm4hMH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtyKGUsdCl8fChlLmNsYXNzTmFtZSs9XCIgXCIrdCl9dmFyIHI9bigwKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtpZihyKGUsdCkpe3ZhciBuPW5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIit0K1wiKFxcXFxzfCQpXCIpO2UuY2xhc3NOYW1lPWUuY2xhc3NOYW1lLnJlcGxhY2UobixcIiBcIil9fXZhciByPW4oMCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9ZG9jdW1lbnQuY29va2llLnJlcGxhY2UoL1xccy9nLFwiXCIpLnNwbGl0KFwiO1wiKSxuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBvPXRbbl0uc3BsaXQoXCI9XCIpO2lmKG9bMF09PWUpcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChvWzFdKX1yZXR1cm5cIlwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlKXtyKGUsXCIxXCIsLTEpfXZhciByPW4oMSk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3ZhciBlPVwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwidXNlckFnZW50XCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKXx8XCJcIix0PShcIm5hdmlnYXRvclwiaW4gd2luZG93JiZcInZlbmRvclwiaW4gbmF2aWdhdG9yJiZuYXZpZ2F0b3IudmVuZG9yLnRvTG93ZXJDYXNlKCksXCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJhcHBWZXJzaW9uXCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5hcHBWZXJzaW9uLnRvTG93ZXJDYXNlKCl8fFwiXCIpO3JldHVybi9tYWMvaS50ZXN0KHQpP1wiTWFjT1NYXCI6L3dpbi9pLnRlc3QodCk/XCJ3aW5kb3dzXCI6L2xpbnV4L2kudGVzdCh0KT9cImxpbnV4XCI6KC9pcGhvbmUvaS50ZXN0KGUpfHwvaXBhZC9pLnRlc3QoZSl8fC9pcG9kL2kudGVzdChlKSwvYW5kcm9pZC9pLnRlc3QoZSk/XCJhbmRyb2lkXCI6L3dpbi9pLnRlc3QodCkmJi9waG9uZS9pLnRlc3QoZSk/XCJ3aW5kb3dzUGhvbmVcIjp2b2lkIDApfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXt2YXIgZSx0PXt9LG49bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO3JldHVybihlPW4ubWF0Y2goL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLykpP3QuaWU9ZVsxXTooZT1uLm1hdGNoKC9tc2llIChbXFxkXFwuXSspLykpP3QuaWU9ZVsxXTooZT1uLm1hdGNoKC9lZGdlXFwvKFtcXGRcXC5dKykvKSk/dC5lZGdlPWVbMV06KGU9bi5tYXRjaCgvZmlyZWZveFxcLyhbXFxkXFwuXSspLykpP3QuZmlyZWZveD1lWzFdOihlPW4ubWF0Y2goLyg/Om9wZXJhfG9wcikuKFtcXGRcXC5dKykvKSk/dC5vcGVyYT1lWzFdOihlPW4ubWF0Y2goL2Nocm9tZVxcLyhbXFxkXFwuXSspLykpP3QuY2hyb21lPWVbMV06KGU9bi5tYXRjaCgvdmVyc2lvblxcLyhbXFxkXFwuXSspLipzYWZhcmkvKSkmJih0LnNhZmFyaT1lWzFdKSx0LmllP1wiSUU6IFwiK3QuaWU6dC5lZGdlP1wiRURHRTogXCIrdC5lZGdlOnQuZmlyZWZveD9cIkZpcmVmb3g6IFwiK3QuZmlyZWZveDp0LmNocm9tZT9cIkNocm9tZTogXCIrdC5jaHJvbWU6dC5vcGVyYT9cIk9wZXJhOiBcIit0Lm9wZXJhOnQuc2FmYXJpP1wiU2FmYXJpOiBcIit0LnNhZmFyaTpcIlVua29ud25cIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD17bGVmdDowLHRvcDowfTtlOyl0LmxlZnQrPWUub2Zmc2V0TGVmdCx0LnRvcCs9ZS5vZmZzZXRUb3AsZT1lLm9mZnNldFBhcmVudDtyZXR1cm4gdH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtpZih0PDApcmV0dXJuIHZvaWQgaShlKTt2YXIgbj1lLXIoKTtpZigwIT09bil7dmFyIGE9bi90KjEwO3JlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2lmKE1hdGguYWJzKGEpPk1hdGguYWJzKG4pKXJldHVybiB2b2lkIGkocigpK24pO2kocigpK2EpLG4+MCYmcigpPj1lfHxuPDAmJnIoKTw9ZXx8byhlLHQtMTYpfSl9fXZhciByPW4oMiksaT1uKDMpOyFmdW5jdGlvbigpe3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV9KCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3ZhciBuPXdpbmRvdy5pbm5lckhlaWdodDtlPVwiZnVuY3Rpb25cIj09dHlwZW9mIGU/ZTpmdW5jdGlvbigpe30sdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6ZnVuY3Rpb24oKXt9LHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsZnVuY3Rpb24oKXt2YXIgbz13aW5kb3cuaW5uZXJIZWlnaHQ7bz09PW4mJmUoKSxvPG4mJnQoKX0pfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQsbil7cmV0dXJuIHZvaWQgMD09PW4/cihlLHQsITEpOnIoZSxuLCExIT09dCl9dmFyIHI9big0KTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiBvW2VdP29bZV06KGNvbnNvbGUubG9nKFwiVW5rbm93IEtleShLZXkgQ29kZTpcIitlK1wiKVwiKSxcIlwiKX12YXIgbz17ODpcIkJhY2tzcGFjZVwiLDk6XCJUYWJcIiwxMzpcIkVudGVyXCIsMTY6XCJTaGlmdFwiLDE3OlwiQ3RybFwiLDE4OlwiQWx0XCIsMTk6XCJQYXVzZVwiLDIwOlwiQ2FwcyBMb2NrXCIsMjc6XCJFc2NhcGVcIiwzMjpcIlNwYWNlXCIsMzM6XCJQYWdlIFVwXCIsMzQ6XCJQYWdlIERvd25cIiwzNTpcIkVuZFwiLDM2OlwiSG9tZVwiLDM3OlwiTGVmdFwiLDM4OlwiVXBcIiwzOTpcIlJpZ2h0XCIsNDA6XCJEb3duXCIsNDI6XCJQcmludCBTY3JlZW5cIiw0NTpcIkluc2VydFwiLDQ2OlwiRGVsZXRlXCIsNDg6XCIwXCIsNDk6XCIxXCIsNTA6XCIyXCIsNTE6XCIzXCIsNTI6XCI0XCIsNTM6XCI1XCIsNTQ6XCI2XCIsNTU6XCI3XCIsNTY6XCI4XCIsNTc6XCI5XCIsNjU6XCJBXCIsNjY6XCJCXCIsNjc6XCJDXCIsNjg6XCJEXCIsNjk6XCJFXCIsNzA6XCJGXCIsNzE6XCJHXCIsNzI6XCJIXCIsNzM6XCJJXCIsNzQ6XCJKXCIsNzU6XCJLXCIsNzY6XCJMXCIsNzc6XCJNXCIsNzg6XCJOXCIsNzk6XCJPXCIsODA6XCJQXCIsODE6XCJRXCIsODI6XCJSXCIsODM6XCJTXCIsODQ6XCJUXCIsODU6XCJVXCIsODY6XCJWXCIsODc6XCJXXCIsODg6XCJYXCIsODk6XCJZXCIsOTA6XCJaXCIsOTE6XCJXaW5kb3dzXCIsOTM6XCJSaWdodCBDbGlja1wiLDk2OlwiTnVtcGFkIDBcIiw5NzpcIk51bXBhZCAxXCIsOTg6XCJOdW1wYWQgMlwiLDk5OlwiTnVtcGFkIDNcIiwxMDA6XCJOdW1wYWQgNFwiLDEwMTpcIk51bXBhZCA1XCIsMTAyOlwiTnVtcGFkIDZcIiwxMDM6XCJOdW1wYWQgN1wiLDEwNDpcIk51bXBhZCA4XCIsMTA1OlwiTnVtcGFkIDlcIiwxMDY6XCJOdW1wYWQgKlwiLDEwNzpcIk51bXBhZCArXCIsMTA5OlwiTnVtcGFkIC1cIiwxMTA6XCJOdW1wYWQgLlwiLDExMTpcIk51bXBhZCAvXCIsMTEyOlwiRjFcIiwxMTM6XCJGMlwiLDExNDpcIkYzXCIsMTE1OlwiRjRcIiwxMTY6XCJGNVwiLDExNzpcIkY2XCIsMTE4OlwiRjdcIiwxMTk6XCJGOFwiLDEyMDpcIkY5XCIsMTIxOlwiRjEwXCIsMTIyOlwiRjExXCIsMTIzOlwiRjEyXCIsMTQ0OlwiTnVtIExvY2tcIiwxNDU6XCJTY3JvbGwgTG9ja1wiLDE4MjpcIk15IENvbXB1dGVyXCIsMTgzOlwiTXkgQ2FsY3VsYXRvclwiLDE4NjpcIjtcIiwxODc6XCI9XCIsMTg4OlwiLFwiLDE4OTpcIi1cIiwxOTA6XCIuXCIsMTkxOlwiL1wiLDE5MjpcImBcIiwyMTk6XCJbXCIsMjIwOlwiXFxcXFwiLDIyMTpcIl1cIiwyMjI6XCInXCJ9O2UuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ7aWYobnVsbD09ZXx8XCJvYmplY3RcIiE9KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpvKGUpKSlyZXR1cm4gZTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gdD1uZXcgRGF0ZSx0LnNldFRpbWUoZS5nZXRUaW1lKCkpLHQ7aWYoZSBpbnN0YW5jZW9mIEFycmF5KXt0PVtdO2Zvcih2YXIgcj0wLGk9ZS5sZW5ndGg7cjxpO3IrKyl0W3JdPW4oZVtyXSk7cmV0dXJuIHR9aWYoZSBpbnN0YW5jZW9mIE9iamVjdCl7dD17fTtmb3IodmFyIGEgaW4gZSllLmhhc093blByb3BlcnR5KGEpJiYodFthXT1uKGVbYV0pKTtyZXR1cm4gdH10aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29weSB2YWx1ZXMhIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIil9dmFyIG89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4hKCFlfHxcIm9iamVjdFwiIT09KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpvKGUpKXx8QXJyYXkuaXNBcnJheShlKSkmJiFPYmplY3Qua2V5cyhlKS5sZW5ndGh9dmFyIG89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3JldHVyblwiI1wiKyhcIjAwMDAwXCIrKDE2Nzc3MjE2Kk1hdGgucmFuZG9tKCk8PDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTYpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKih0LWUrMSkpK2V9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXFx3KyhbLSsuXVxcdyspKkBcXHcrKFstLl1cXHcrKSpcXC5cXHcrKFstLl1cXHcrKSovLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXiheWzEtOV1cXGR7N30oKDBcXGQpfCgxWzAtMl0pKSgoWzB8MXwyXVxcZCl8M1swLTFdKVxcZHszfSQpfCheWzEtOV1cXGR7NX1bMS05XVxcZHszfSgoMFxcZCl8KDFbMC0yXSkpKChbMHwxfDJdXFxkKXwzWzAtMV0pKChcXGR7NH0pfFxcZHszfVtYeF0pJCkkLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL14oMHw4NnwxNzk1MSk/KDEzWzAtOV18MTVbMDEyMzU2Nzg5XXwxN1s2NzhdfDE4WzAtOV18MTRbNTddKVswLTldezh9JC8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDZ9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mXFwvXFwvPV0qKS9pLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1bXCLop5JcIixcIuWIhlwiXSxuPVtcIumbtlwiLFwi5aO5XCIsXCLotLBcIixcIuWPgVwiLFwi6IKGXCIsXCLkvI1cIixcIumZhlwiLFwi5p+SXCIsXCLmjYxcIixcIueOllwiXSxvPVtbXCLlhYNcIixcIuS4h1wiLFwi5Lq/XCJdLFtcIlwiLFwi5ou+XCIsXCLkvbBcIixcIuS7n1wiXV0scj1lPDA/XCLmrKBcIjpcIlwiO2U9TWF0aC5hYnMoZSk7Zm9yKHZhciBpPVwiXCIsYT0wO2E8dC5sZW5ndGg7YSsrKWkrPShuW01hdGguZmxvb3IoMTAqZSpNYXRoLnBvdygxMCxhKSklMTBdK3RbYV0pLnJlcGxhY2UoL+mbti4vLFwiXCIpO2k9aXx8XCLmlbRcIixlPU1hdGguZmxvb3IoZSk7Zm9yKHZhciBhPTA7YTxvWzBdLmxlbmd0aCYmZT4wO2ErKyl7Zm9yKHZhciB1PVwiXCIsZj0wO2Y8b1sxXS5sZW5ndGgmJmU+MDtmKyspdT1uW2UlMTBdK29bMV1bZl0rdSxlPU1hdGguZmxvb3IoZS8xMCk7aT11LnJlcGxhY2UoLyjpm7YuKSrpm7YkLyxcIlwiKS5yZXBsYWNlKC9eJC8sXCLpm7ZcIikrb1swXVthXStpfXJldHVybiByK2kucmVwbGFjZSgvKOmbti4pKumbtuWFgy8sXCLlhYNcIikucmVwbGFjZSgvKOmbti4pKy9nLFwi6Zu2XCIpLnJlcGxhY2UoL17mlbQkLyxcIumbtuWFg+aVtFwiKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuISFbXS5tYXAmJjA9PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikudG9EYXRhVVJMKFwiaW1hZ2Uvd2VicFwiKS5pbmRleE9mKFwiZGF0YTppbWFnZS93ZWJwXCIpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9RGF0ZS5wYXJzZShuZXcgRGF0ZSksbj10LWUsbz1wYXJzZUludChuLzg2NGU1KSxyPXBhcnNlSW50KG4vMzZlNSksaT1wYXJzZUludChuLzZlNCksYT1wYXJzZUludChvLzMwKSx1PXBhcnNlSW50KGEvMTIpO3JldHVybiB1P3UrXCLlubTliY1cIjphP2ErXCLkuKrmnIjliY1cIjpvP28rXCLlpKnliY1cIjpyP3IrXCLlsI/ml7bliY1cIjppP2krXCLliIbpkp/liY1cIjpcIuWImuWImlwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9bmV3IERhdGUsbj1uZXcgRGF0ZShlKSxvPW4uZ2V0VGltZSgpLXQuZ2V0VGltZSgpLHI9MCxpPTAsYT0wLHU9MDtyZXR1cm4gbz49MCYmKHI9TWF0aC5mbG9vcihvLzFlMy8zNjAwLzI0KSxpPU1hdGguZmxvb3Ioby8xZTMvNjAvNjAlMjQpLGE9TWF0aC5mbG9vcihvLzFlMy82MCU2MCksdT1NYXRoLmZsb29yKG8vMWUzJTYwKSkscitcIuWkqSBcIitpK1wi5bCP5pe2IFwiK2ErXCLliIbpkp8gXCIrdStcIuenklwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7ZT1udWxsPT1lP3dpbmRvdy5sb2NhdGlvbi5ocmVmOmU7dmFyIHQ9ZS5zdWJzdHJpbmcoZS5sYXN0SW5kZXhPZihcIj9cIikrMSk7cmV0dXJuIHQ/SlNPTi5wYXJzZSgne1wiJytkZWNvZGVVUklDb21wb25lbnQodCkucmVwbGFjZSgvXCIvZywnXFxcXFwiJykucmVwbGFjZSgvJi9nLCdcIixcIicpLnJlcGxhY2UoLz0vZywnXCI6XCInKSsnXCJ9Jyk6e319ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtpZighZSlyZXR1cm5cIlwiO3ZhciB0PVtdO2Zvcih2YXIgbiBpbiBlKXt2YXIgbz1lW25dO2lmKG8gaW5zdGFuY2VvZiBBcnJheSlmb3IodmFyIHI9MDtyPG8ubGVuZ3RoOysrcil0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG4rXCJbXCIrcitcIl1cIikrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KG9bcl0pKTtlbHNlIHQucHVzaChlbmNvZGVVUklDb21wb25lbnQobikrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGVbbl0pKX1yZXR1cm4gdC5qb2luKFwiJlwiKX1lLmV4cG9ydHM9bn1dKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==