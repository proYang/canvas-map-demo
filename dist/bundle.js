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

var _mockjs = __webpack_require__(46);

var _outils = __webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $app = document.querySelector('#app');

var options = {
    container: $app,
    people: [],
    backgroundImage: './assert/images/map.jpg',
    peopleImage: './assert/images/people1.jpg'
};
var app = new _app2.default(options);

function mockPeopleServer() {
    var people = [];

    var _$app$getBoundingClie = $app.getBoundingClientRect(),
        width = _$app$getBoundingClie.width,
        height = _$app$getBoundingClie.height;

    var peopleNum = (0, _outils.randomNum)(5, 15);
    // 添加人
    var id = 1000;
    for (var i = 0; i < peopleNum; i++) {
        var x = (0, _outils.randomNum)(0, width);
        var y = (0, _outils.randomNum)(0, height);
        people.push({
            id: id++,
            name: _mockjs.Random.cname(),
            color: (0, _outils.randomColor)(),
            move: [{
                x: x,
                y: y
            }]
        });
    }
    // 模拟运动轨迹
    people.forEach(function (person, index) {
        var moveNum = (0, _outils.randomNum)(50, 100);
        for (var _i = 0; _i < moveNum; _i++) {
            var last = person.move[person.move.length - 1];
            var next = {
                x: last.x + (0, _outils.randomNum)(-12, 12),
                y: last.y + (0, _outils.randomNum)(-12, 12)
            };
            people[index].move.push(next);
        }
    });
    return people;
}
var mockPeople = mockPeopleServer();
// 实时位置
document.querySelector('.J_add').addEventListener('click', function () {

    app.options.people = mockPeople;
    // 重绘轨迹，人
    // app.updateCanvas('people')
    // app.updateCanvas('move')
});

// 是否展示运动轨迹
var mockServer4 = void 0;
document.querySelector('.J_show').addEventListener('click', function () {
    document.querySelector('.J_add').click();
    clearInterval(mockServer4);
    app.showPath = !app.showPath;

    var people = (0, _outils.deepClone)(app.options.people);
    app.options.people.forEach(function (person, index, array) {
        array[index].move = [];
    });
    mockServer4 = setInterval(function () {
        people.forEach(function (person, index, array) {
            var point = array[index].move.shift();
            if (point === undefined) return;
            app.options.people[index].move.push(point);
        });
    }, 200);
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
// let mockServer1 = setInterval(() => {
//     app.options.people.forEach((person, index) => {
//         let length = person.move.length
//         let last = person.move[--length]
//         let next = {
//             x: last.x + randomNum(-10, 10),
//             y: last.y + randomNum(-10, 10)
//         }
//         app.options.people[index].move.push(next)
//     });
// }, 500)
// let mockServer2 = setInterval(() => {
//     app.options.people.forEach((person, index) => {
//         let length = person.move.length
//         let last = person.move[--length]
//         let next = {
//             x: last.x + randomNum(-10, 10),
//             y: last.y + randomNum(-10, 10)
//         }
//         app.options.people[index].move.push(next)
//     });
// }, 300)
// let mockServer3 = setInterval(() => {
//     app.options.people.forEach((person, index) => {
//         let length = person.move.length
//         let last = person.move[--length]
//         let next = {
//             x: last.x + randomNum(-10, 10),
//             y: last.y + randomNum(-10, 10)
//         }
//         app.options.people[index].move.push(next)
//     });
// }, 1000)

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

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.outils=t():e.outils=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t){function n(e,t){return new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)}e.exports=n},function(e,t){function n(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=e+"="+t+";expires="+o}e.exports=n},function(e,t){function n(){return document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop}e.exports=n},function(e,t){function n(e){return window.scrollTo(0,e),e}e.exports=n},function(e,t){e.exports=function(e,t,n,o){function r(){function r(){a=Number(new Date),n.apply(f,s)}function u(){i=void 0}var f=this,c=Number(new Date)-a,s=arguments;o&&!i&&r(),i&&clearTimeout(i),void 0===o&&c>e?r():!0!==t&&(i=setTimeout(o?u:r,void 0===o?e-c:e))}var i,a=0;return"boolean"!=typeof t&&(o=n,n=t,t=void 0),r}},function(e,t,n){var o=n(6),r=n(7),i=n(0),a=n(8),u=n(9),f=n(10),c=n(1),s=n(11),p=n(12),d=n(2),l=n(13),m=n(14),v=n(3),w=n(15),g=n(16),y=n(4),h=n(17),x=n(18),b=n(19),C=n(20),N=n(21),S=n(22),M=n(23),E=n(24),F=n(25),D=n(26),I=n(27),T=n(28),k=n(29),R=n(30),A=n(31);e.exports={arrayEqual:o,addClass:r,hasClass:i,removeClass:a,getCookie:u,removeCookie:f,setCookie:c,getOS:s,getExplore:p,getScrollTop:d,offset:l,scrollTo:m,setScrollTop:v,windowResize:w,debounce:g,throttle:y,getKeyName:h,deepClone:x,isEmptyObject:b,randomColor:C,randomNum:N,isEmail:S,isIdCard:M,isPhoneNum:E,isUrl:F,digitUppercase:D,isSupportWebP:I,formatPassTime:T,formatRemainTime:k,parseQueryString:R,stringfyQueryString:A}},function(e,t){function n(e,t){if(e===t)return!0;if(e.length!=t.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}e.exports=n},function(e,t,n){function o(e,t){r(e,t)||(e.className+=" "+t)}var r=n(0);e.exports=o},function(e,t,n){function o(e,t){if(r(e,t)){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ")}}var r=n(0);e.exports=o},function(e,t){function n(e){for(var t=document.cookie.replace(/\s/g,"").split(";"),n=0;n<t.length;n++){var o=t[n].split("=");if(o[0]==e)return decodeURIComponent(o[1])}return""}e.exports=n},function(e,t,n){function o(e){r(e,"1",-1)}var r=n(1);e.exports=o},function(e,t){function n(){var e="navigator"in window&&"userAgent"in navigator&&navigator.userAgent.toLowerCase()||"",t=("navigator"in window&&"vendor"in navigator&&navigator.vendor.toLowerCase(),"navigator"in window&&"appVersion"in navigator&&navigator.appVersion.toLowerCase()||"");return/mac/i.test(t)?"MacOSX":/win/i.test(t)?"windows":/linux/i.test(t)?"linux":(/iphone/i.test(e)||/ipad/i.test(e)||/ipod/i.test(e),/android/i.test(e)?"android":/win/i.test(t)&&/phone/i.test(e)?"windowsPhone":void 0)}e.exports=n},function(e,t){function n(){var e,t={},n=navigator.userAgent.toLowerCase();return(e=n.match(/rv:([\d.]+)\) like gecko/))?t.ie=e[1]:(e=n.match(/msie ([\d\.]+)/))?t.ie=e[1]:(e=n.match(/edge\/([\d\.]+)/))?t.edge=e[1]:(e=n.match(/firefox\/([\d\.]+)/))?t.firefox=e[1]:(e=n.match(/(?:opera|opr).([\d\.]+)/))?t.opera=e[1]:(e=n.match(/chrome\/([\d\.]+)/))?t.chrome=e[1]:(e=n.match(/version\/([\d\.]+).*safari/))&&(t.safari=e[1]),t.ie?"IE: "+t.ie:t.edge?"EDGE: "+t.edge:t.firefox?"Firefox: "+t.firefox:t.chrome?"Chrome: "+t.chrome:t.opera?"Opera: "+t.opera:t.safari?"Safari: "+t.safari:"Unkonwn"}e.exports=n},function(e,t){function n(e){for(var t={left:0,top:0};e;)t.left+=e.offsetLeft,t.top+=e.offsetTop,e=e.offsetParent;return t}e.exports=n},function(e,t,n){function o(e,t){if(t<0)return void i(e);var n=e-r();if(0!==n){var a=n/t*10;requestAnimationFrame(function(){if(Math.abs(a)>Math.abs(n))return void i(r()+n);i(r()+a),n>0&&r()>=e||n<0&&r()<=e||o(e,t-16)})}}var r=n(2),i=n(3);!function(){window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}();e.exports=o},function(e,t){function n(e,t){var n=window.innerHeight;e="function"==typeof e?e:function(){},t="function"==typeof t?t:function(){},window.addEventListener("resize",function(){var o=window.innerHeight;o===n&&e(),o<n&&t()})}e.exports=n},function(e,t,n){function o(e,t,n){return void 0===n?r(e,t,!1):r(e,n,!1!==t)}var r=n(4);e.exports=o},function(e,t){function n(e){return o[e]?o[e]:(console.log("Unknow Key(Key Code:"+e+")"),"")}var o={8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"Caps Lock",27:"Escape",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",42:"Print Screen",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"};e.exports=n},function(e,t){function n(e){var t;if(null==e||"object"!=(void 0===e?"undefined":o(e)))return e;if(e instanceof Date)return t=new Date,t.setTime(e.getTime()),t;if(e instanceof Array){t=[];for(var r=0,i=e.length;r<i;r++)t[r]=n(e[r]);return t}if(e instanceof Object){t={};for(var a in e)e.hasOwnProperty(a)&&(t[a]=n(e[a]));return t}throw new Error("Unable to copy values! Its type isn't supported.")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=n},function(e,t){function n(e){return!(!e||"object"!==(void 0===e?"undefined":o(e))||Array.isArray(e))&&!Object.keys(e).length}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=n},function(e,t){function n(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)}e.exports=n},function(e,t){function n(e,t){return Math.floor(Math.random()*(t-e+1))+e}e.exports=n},function(e,t){function n(e){return/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(e)}e.exports=n},function(e,t){function n(e){return/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(e)}e.exports=n},function(e,t){function n(e){return/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(e)}e.exports=n},function(e,t){function n(e){return/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/i.test(e)}e.exports=n},function(e,t){function n(e){var t=["角","分"],n=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],o=[["元","万","亿"],["","拾","佰","仟"]],r=e<0?"欠":"";e=Math.abs(e);for(var i="",a=0;a<t.length;a++)i+=(n[Math.floor(10*e*Math.pow(10,a))%10]+t[a]).replace(/零./,"");i=i||"整",e=Math.floor(e);for(var a=0;a<o[0].length&&e>0;a++){for(var u="",f=0;f<o[1].length&&e>0;f++)u=n[e%10]+o[1][f]+u,e=Math.floor(e/10);i=u.replace(/(零.)*零$/,"").replace(/^$/,"零")+o[0][a]+i}return r+i.replace(/(零.)*零元/,"元").replace(/(零.)+/g,"零").replace(/^整$/,"零元整")}e.exports=n},function(e,t){function n(){return!![].map&&0==document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")}e.exports=n},function(e,t){function n(e){var t=Date.parse(new Date),n=t-e,o=parseInt(n/864e5),r=parseInt(n/36e5),i=parseInt(n/6e4),a=parseInt(o/30),u=parseInt(a/12);return u?u+"年前":a?a+"个月前":o?o+"天前":r?r+"小时前":i?i+"分钟前":"刚刚"}e.exports=n},function(e,t){function n(e){var t=new Date,n=new Date(e),o=n.getTime()-t.getTime(),r=0,i=0,a=0,u=0;return o>=0&&(r=Math.floor(o/1e3/3600/24),i=Math.floor(o/1e3/60/60%24),a=Math.floor(o/1e3/60%60),u=Math.floor(o/1e3%60)),r+"天 "+i+"小时 "+a+"分钟 "+u+"秒"}e.exports=n},function(e,t){function n(e){e=null==e?window.location.href:e;var t=e.substring(e.lastIndexOf("?")+1);return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}e.exports=n},function(e,t){function n(e){if(!e)return"";var t=[];for(var n in e){var o=e[n];if(o instanceof Array)for(var r=0;r<o.length;++r)t.push(encodeURIComponent(n+"["+r+"]")+"="+encodeURIComponent(o[r]));else t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]))}return t.join("&")}e.exports=n}])});

/***/ }),
/* 46 */
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlZTFmYzAyMDhkMDgxNWY1NzBiMiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9ja2pzL2Rpc3QvbW9jay5qcyJdLCJuYW1lcyI6WyIkYXBwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwib3B0aW9ucyIsImNvbnRhaW5lciIsInBlb3BsZSIsImJhY2tncm91bmRJbWFnZSIsInBlb3BsZUltYWdlIiwiYXBwIiwibW9ja1Blb3BsZVNlcnZlciIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwicGVvcGxlTnVtIiwiaWQiLCJpIiwieCIsInkiLCJwdXNoIiwibmFtZSIsImNuYW1lIiwiY29sb3IiLCJtb3ZlIiwiZm9yRWFjaCIsInBlcnNvbiIsImluZGV4IiwibW92ZU51bSIsImxhc3QiLCJsZW5ndGgiLCJuZXh0IiwibW9ja1Blb3BsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJtb2NrU2VydmVyNCIsImNsaWNrIiwiY2xlYXJJbnRlcnZhbCIsInNob3dQYXRoIiwiYXJyYXkiLCJzZXRJbnRlcnZhbCIsInBvaW50Iiwic2hpZnQiLCJ1bmRlZmluZWQiLCIkcnVsZXIiLCJpbm5lckhUTUwiLCJpbWdTY2FsZSIsIiRwb2ludGVyWCIsIiRwb2ludGVyWSIsInBvaW50ZXJYIiwicG9pbnRlclkiLCIkbWVhc3VyZSIsIm1lYXN1cmUiLCIkbWVhc3VyZUNhbmNlbCIsInVwZGF0ZUNhbnZhcyIsImRlZmF1bHRPcHRpb25zIiwiaW1nWCIsImltZ1kiLCJhbmltYXRpb24iLCJpc01lYXN1cmluZyIsImlzTW92ZU1hcCIsIkFwcCIsImlzU2hvd1BhdGgiLCJyZW5kZXIiLCJsb2FkQmdJbWciLCJsb2FkUGVvcGxlSW1nIiwiZHJhd01vdmUiLCJhZGRFdmVudCIsInJ1biIsImJpbmRNZWFzdXJlRXZlbnQiLCJjb250ZXh0IiwiZHJhd01hcCIsImRyYXdQZW9wbGUiLCJjbGVhckNhbnZhcyIsIm1vdmVDYW52YXMiLCJnZXRDb250ZXh0IiwibWVhc3VyZUNhbnZhcyIsImRyYXdNZWFzdXJlIiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwibGluZUhlaWdodCIsIm92ZXJmbG93IiwiYmFja2dyb3VuZENvbG9yIiwiYmdDb2xvciIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm1hcENhbnZhcyIsInNldEF0dHJpYnV0ZSIsImNsb25lTm9kZSIsInBlb3BsZUNhbnZhcyIsIiRjb250YWluZXIiLCJjbGlja1RpbWUiLCJjbGlja051bSIsIm1vdXNlbW92ZUxpc3RlbmVyIiwiY3Vyc29yIiwicG9zIiwid2luZG93VG9DYW52YXMiLCJldmVudCIsImNsaWVudFgiLCJjbGllbnRZIiwibW92ZUFyciIsImxhc3RQb2ludCIsImNsaWNrTGlzdGVuZXIiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwicG9wIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9iaiIsImFyciIsImp1ZGdlQm9yZGVyIiwiYmdJbWciLCJ3aGVlbERlbHRhIiwiZGVsdGFZIiwidGhhdCIsInBvczEiLCJtb3VzZXVwTGlzdGVuZXIiLCJzZXRUaW1lb3V0Iiwic2hvd0luZm8iLCJjYW52YXMiLCJiYm94IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJkcmF3SW1hZ2UiLCJjdXJyZW50IiwicGVvcGxlSW1nV2lkdGgiLCJwZW9wbGVJbWdIZWlnaHQiLCJ0b3RhbExlbmd0aCIsInRleHQiLCJ0b0ZpeGVkIiwiY2xlYXJSZWN0Iiwic3RlcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInZhbCIsImRyYXdMaW5lIiwiZHJhd0NpcmNsZSIsImRyYXdNZWFzdXJlSW5mbyIsImRyYXdQZW9wbGVJbmZvIiwiY2FsY3VsYXRlTGVuZ3RoIiwiZGlyZWN0UGVvcGxlIiwiY3R4IiwieDEiLCJ5MSIsIngyIiwieTIiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImNsb3NlUGF0aCIsInJhZGl1cyIsImFyYyIsImZpbGxTdHlsZSIsImZpbGwiLCJmaWxsUmVjdCIsInN0cm9rZVJlY3QiLCJmb250IiwiZmlsbFRleHQiLCJpbmZvIiwiTWF0aCIsInNxcnQiLCJwb3ciLCJyIiwicGVvcGxlSW5kZXgiLCJwZW9wbGVQb3MiLCJwb2ludExlbmd0aCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVEsbUJBQW1C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OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLG9CQUFvQixHQUFHLG9CQUFvQjtBQUNoRTtBQUNBLHdCQUF3Qiw2QkFBNkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGtDQUFrQyxJQUFJO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEIsd0NBQXdDO0FBQ3hDLGdDQUFnQyx3QkFBd0I7QUFDeEQsNENBQTRDLElBQUk7QUFDaEQscUNBQXFDLDhCQUE4QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSx3QkFBd0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCOztBQUVBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3Qix3QkFBd0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtR0FBbUc7QUFDbkc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qyx1Q0FBdUM7QUFDL0UsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtDQUFrQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxZQUFZO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBLE1BQU07QUFDTixvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsb0I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsWUFBWTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsTUFBTTtBQUNOO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQSx1QkFBdUIsY0FBYztBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDRCQUE0QjtBQUM1QiwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHNDQUFzQztBQUN0QyxvQ0FBb0M7QUFDcEMsNkJBQTZCO0FBQzdCLDRCQUE0QjtBQUM1Qjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsWUFBWTtBQUMzRTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsV0FBVztBQUM5RCxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELFlBQVk7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFdBQVc7QUFDOUMsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsV0FBVztBQUM5Qyx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxXQUFXO0FBQzlDLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVLFNBQVMsV0FBVyxpQ0FBaUMsV0FBVztBQUMxRTtBQUNBLFVBQVUsVUFBVSxZQUFZO0FBQ2hDO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHVCQUF1QixFQUFFO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFdBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLDhCQUE4QixzQkFBc0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxXQUFXO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywwQkFBMEI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDhCQUE4QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGNBQWMsSUFBSTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLElBQUk7QUFDbkMsZ0NBQWdDLElBQUk7QUFDcEMscUNBQXFDLElBQUk7QUFDekMsbUNBQW1DLElBQUk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhGQUE4RixTQUFTLFVBQVUsT0FBTztBQUN4SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE1BQU0sdUJBQXVCLEtBQUsscUJBQXFCLFNBQVMsNEJBQTRCLE9BQU87QUFDM0g7QUFDQSx3QkFBd0IsTUFBTSxzQkFBc0IsS0FBSyxvQkFBb0IsU0FBUyw0QkFBNEIsT0FBTztBQUN6SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsTUFBTSxVQUFVLEtBQUssR0FBRyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsVUFBVSxPQUFPO0FBQ3ZGLHdCQUF3QixNQUFNO0FBQzlCLHdCQUF3QixNQUFNO0FBQzlCLHdCQUF3QixLQUFLO0FBQzdCLHdCQUF3QixPQUFPO0FBQy9CLHdCQUF3QixTQUFTO0FBQ2pDLHdCQUF3QixPQUFPO0FBQy9CLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLG9DQUFvQztBQUNoRTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJidW5kbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYnVuZGxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWUxZmMwMjA4ZDA4MTVmNTcwYjIiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQXBwIGZyb20gJy4vYXBwLmpzJ1xyXG5pbXBvcnQge1xyXG4gICAgUmFuZG9tXHJcbn0gZnJvbSAnbW9ja2pzJ1xyXG5pbXBvcnQge1xyXG4gICAgcmFuZG9tTnVtLFxyXG4gICAgcmFuZG9tQ29sb3IsXHJcbiAgICBkZWVwQ2xvbmVcclxufSBmcm9tICdvdXRpbHMnO1xyXG5jb25zdCAkYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpXHJcblxyXG5jb25zdCBvcHRpb25zID0ge1xyXG4gICAgY29udGFpbmVyOiAkYXBwLFxyXG4gICAgcGVvcGxlOiBbXSxcclxuICAgIGJhY2tncm91bmRJbWFnZTogJy4vYXNzZXJ0L2ltYWdlcy9tYXAuanBnJyxcclxuICAgIHBlb3BsZUltYWdlOiAnLi9hc3NlcnQvaW1hZ2VzL3Blb3BsZTEuanBnJ1xyXG59XHJcbmxldCBhcHAgPSBuZXcgQXBwKG9wdGlvbnMpXHJcblxyXG5mdW5jdGlvbiBtb2NrUGVvcGxlU2VydmVyKCkge1xyXG4gICAgbGV0IHBlb3BsZSA9IFtdXHJcbiAgICBsZXQge1xyXG4gICAgICAgIHdpZHRoLFxyXG4gICAgICAgIGhlaWdodFxyXG4gICAgfSA9ICRhcHAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgcGVvcGxlTnVtID0gcmFuZG9tTnVtKDUsIDE1KVxyXG4gICAgLy8g5re75Yqg5Lq6XHJcbiAgICBsZXQgaWQgPSAxMDAwXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBlb3BsZU51bTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHggPSByYW5kb21OdW0oMCwgd2lkdGgpXHJcbiAgICAgICAgbGV0IHkgPSByYW5kb21OdW0oMCwgaGVpZ2h0KVxyXG4gICAgICAgIHBlb3BsZS5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IGlkKyssXHJcbiAgICAgICAgICAgIG5hbWU6IFJhbmRvbS5jbmFtZSgpLFxyXG4gICAgICAgICAgICBjb2xvcjogcmFuZG9tQ29sb3IoKSxcclxuICAgICAgICAgICAgbW92ZTogW3tcclxuICAgICAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgICAgICB5XHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOaooeaLn+i/kOWKqOi9qOi/uVxyXG4gICAgcGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbW92ZU51bSA9IHJhbmRvbU51bSg1MCwgMTAwKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW92ZU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbcGVyc29uLm1vdmUubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTEyLCAxMiksXHJcbiAgICAgICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTEyLCAxMilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHBlb3BsZVxyXG59XHJcbmxldCBtb2NrUGVvcGxlID0gbW9ja1Blb3BsZVNlcnZlcigpXHJcbi8vIOWunuaXtuS9jee9rlxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9hZGQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUgPSBtb2NrUGVvcGxlXHJcbiAgICAvLyDph43nu5jovajov7nvvIzkurpcclxuICAgIC8vIGFwcC51cGRhdGVDYW52YXMoJ3Blb3BsZScpXHJcbiAgICAvLyBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOaYr+WQpuWxleekuui/kOWKqOi9qOi/uVxyXG5sZXQgbW9ja1NlcnZlcjRcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfc2hvdycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfYWRkJykuY2xpY2soKVxyXG4gICAgY2xlYXJJbnRlcnZhbChtb2NrU2VydmVyNClcclxuICAgIGFwcC5zaG93UGF0aCA9ICFhcHAuc2hvd1BhdGhcclxuXHJcbiAgICBsZXQgcGVvcGxlID0gZGVlcENsb25lKGFwcC5vcHRpb25zLnBlb3BsZSk7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICBhcnJheVtpbmRleF0ubW92ZSA9IFtdXHJcbiAgICB9KVxyXG4gICAgbW9ja1NlcnZlcjQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgcGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwb2ludCA9IGFycmF5W2luZGV4XS5tb3ZlLnNoaWZ0KClcclxuICAgICAgICAgICAgaWYgKHBvaW50ID09PSB1bmRlZmluZWQpIHJldHVyblxyXG4gICAgICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChwb2ludClcclxuICAgICAgICB9KVxyXG4gICAgfSwgMjAwKVxyXG4gICAgLy8gYXBwLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbn0pXHJcblxyXG4vLyDmr5TkvovlsLpcclxuY29uc3QgJHJ1bGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfcnVsZXInKVxyXG4kcnVsZXIuaW5uZXJIVE1MID0gYHgke2FwcC5vcHRpb25zLmltZ1NjYWxlfSDlgI1gXHJcbiRhcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsICgpID0+IHtcclxuICAgICRydWxlci5pbm5lckhUTUwgPSBgeCR7YXBwLm9wdGlvbnMuaW1nU2NhbGV9IOWAjWBcclxufSlcclxuXHJcbi8vIOm8oOagh+WdkOagh1xyXG5jb25zdCAkcG9pbnRlclggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9wb2ludGVyLXgnKVxyXG5jb25zdCAkcG9pbnRlclkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9wb2ludGVyLXknKVxyXG4kYXBwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcclxuICAgICRwb2ludGVyWC5pbm5lckhUTUwgPSBgWDoke2FwcC5vcHRpb25zLnBvaW50ZXJYfWBcclxuICAgICRwb2ludGVyWS5pbm5lckhUTUwgPSBgWToke2FwcC5vcHRpb25zLnBvaW50ZXJZfWBcclxufSlcclxuXHJcblxyXG5jb25zdCAkbWVhc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX21lYXN1cmUnKVxyXG4kbWVhc3VyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFwcC5tZWFzdXJlKClcclxufSlcclxuY29uc3QgJG1lYXN1cmVDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9tZWFzdXJlLWNhbmNlbCcpXHJcbiRtZWFzdXJlQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMubWVhc3VyZSA9IFtdXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtZWFzdXJlJylcclxufSlcclxuXHJcbi8vIOaVsOaNruaooeaLn+WZqFxyXG4vLyBsZXQgbW9ja1NlcnZlcjEgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbi8vICAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4vLyAgICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuLy8gICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4vLyAgICAgICAgIGxldCBuZXh0ID0ge1xyXG4vLyAgICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTEwLCAxMCksXHJcbi8vICAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtMTAsIDEwKVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4vLyAgICAgfSk7XHJcbi8vIH0sIDUwMClcclxuLy8gbGV0IG1vY2tTZXJ2ZXIyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4vLyAgICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuLy8gICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbi8vICAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuLy8gICAgICAgICBsZXQgbmV4dCA9IHtcclxuLy8gICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC0xMCwgMTApLFxyXG4vLyAgICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTEwLCAxMClcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuLy8gICAgIH0pO1xyXG4vLyB9LCAzMDApXHJcbi8vIGxldCBtb2NrU2VydmVyMyA9IHNldEludGVydmFsKCgpID0+IHtcclxuLy8gICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbi8vICAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4vLyAgICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbi8vICAgICAgICAgbGV0IG5leHQgPSB7XHJcbi8vICAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtMTAsIDEwKSxcclxuLy8gICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC0xMCwgMTApXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbi8vICAgICB9KTtcclxuLy8gfSwgMTAwMClcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQge1xyXG4gICAgZHJhd0NpcmNsZSxcclxuICAgIGRyYXdMaW5lLFxyXG4gICAgZHJhd01lYXN1cmVJbmZvLFxyXG4gICAgZHJhd1Blb3BsZUluZm8sXHJcbiAgICBjYWxjdWxhdGVMZW5ndGgsXHJcbiAgICBkaXJlY3RQZW9wbGVcclxufSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBjb250YWluZXI6IG51bGwsIC8v5Yib5bu6Y2FudmFz55qE5a655Zmo77yM5aaC5p6c5LiN5aGr77yM6Ieq5Yqo5ZyoIGJvZHkg5LiK5Yib5bu66KaG55uW5YWo5bGP55qE5bGCXHJcbiAgICBwZW9wbGU6IFtdLCAvLyDkurpcclxuICAgIG1lYXN1cmU6IFtdLCAvLyDmtYvot53orrDlvZVcclxuICAgIGJhY2tncm91bmRJbWFnZTogdW5kZWZpbmVkLCAvLyDog4zmma/lm75cclxuICAgIGltZ1NjYWxlOiAxLCAvLyDpu5jorqTmlL7lpKflgI3mlbBcclxuICAgIGltZ1g6IDAsIC8vIOiDjOaZr+WbvuaLkmNhbnZhc+WOn+eCuVjmlrnlkJHot53nprtcclxuICAgIGltZ1k6IDAsIC8vIOiDjOaZr+WbvuaLkmNhbnZhc+WOn+eCuVnmlrnlkJHot53nprtcclxuICAgIHBvaW50ZXJYOiAwLFxyXG4gICAgcG9pbnRlclk6IDAsXHJcbiAgICBhbmltYXRpb246IHVuZGVmaW5lZCxcclxuICAgIGlzTWVhc3VyaW5nOiBmYWxzZSAvL+ato+WcqOa1i+i3nVxyXG59O1xyXG5cclxubGV0IGlzTW92ZU1hcCA9IGZhbHNlIC8vIOato+WcqOaLluaLveenu+WKqOWcsOWbvlxyXG5cclxuY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dQYXRoID0gZmFsc2U7IC8vIOaYr+WQpuaYvuekuiDov5Dliqjovajov7lcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubG9hZEJnSW1nKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUGVvcGxlSW1nKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQoKTtcclxuICAgICAgICB0aGlzLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICovXHJcbiAgICBzZXQgc2hvd1BhdGgodmFsKSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dQYXRoID0gdmFsXHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd1BhdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTaG93UGF0aFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHB1YmxpY1xyXG4gICAgICogQGRlc2Mg5byA5aeL5rWL6LedXHJcbiAgICAgKi9cclxuICAgIG1lYXN1cmUoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5pc1Nob3dQYXRoID0gdmFsXHJcbiAgICAgICAgLy8g57uR5a6a5rWL6Led5LqL5Lu2XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc01lYXN1cmluZyA9PT0gdHJ1ZSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5iaW5kTWVhc3VyZUV2ZW50KClcclxuICAgICAgICB0aGlzLm9wdGlvbnMuaXNNZWFzdXJpbmcgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHVibGljIFxyXG4gICAgICogQGRlc2Mg5Y2V5qyh6YeN57uYY2FudmFzXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUNhbnZhcyhjb250ZXh0KSB7XHJcbiAgICAgICAgLy8g6YeN57uYQ2FudmFzXHJcbiAgICAgICAgc3dpdGNoIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwZW9wbGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbW92ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21lYXN1cmUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01lYXN1cmUoKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRhaW5lci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBvcHRpb25zLmJnQ29sb3JcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgLy/nlLvlnLDlm77nmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IG1hcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24obWFwQ2FudmFzLnN0eWxlLCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6ICcwJyxcclxuICAgICAgICAgICAgbGVmdDogJzAnLFxyXG4gICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXBDYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGAke3dpZHRofXB4YClcclxuICAgICAgICBtYXBDYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKVxyXG5cclxuICAgICAgICAvL+eUu+i9qOi/uee6v+adoeeahCBjYW52YXNcclxuICAgICAgICBsZXQgbW92ZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v55S75Lq655qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBwZW9wbGVDYW52YXMgPSBtYXBDYW52YXMuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIC8vIOa1i+i3nSBjYW52YXNcclxuICAgICAgICBsZXQgbWVhc3VyZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYXBDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtb3ZlQ2FudmFzKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGVvcGxlQ2FudmFzKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVhc3VyZUNhbnZhcyk7XHJcblxyXG4gICAgICAgIHRoaXMubWFwQ2FudmFzID0gbWFwQ2FudmFzO1xyXG4gICAgICAgIHRoaXMubW92ZUNhbnZhcyA9IG1vdmVDYW52YXM7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVDYW52YXMgPSBwZW9wbGVDYW52YXM7XHJcbiAgICAgICAgdGhpcy5tZWFzdXJlQ2FudmFzID0gbWVhc3VyZUNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBiaW5kTWVhc3VyZUV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQgY2xpY2tUaW1lID0gMDtcclxuICAgICAgICBsZXQgY2xpY2tOdW0gPSAwO1xyXG4gICAgICAgIGxldCBtb3ZlTnVtID0gMDtcclxuICAgICAgICBsZXQgbW91c2Vtb3ZlTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIHBvcyA9IHtcclxuICAgICAgICAgICAgICAgIHg6IChwb3MueCAtIHRoaXMub3B0aW9ucy5pbWdYKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSxcclxuICAgICAgICAgICAgICAgIHk6IChwb3MueSAtIHRoaXMub3B0aW9ucy5pbWdZKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOacqumAieaLqeesrOS4gOS4queCue+8jOebtOaOpXJldHVyblxyXG4gICAgICAgICAgICBpZiAoY2xpY2tOdW0gPT09IDApIHJldHVyblxyXG4gICAgICAgICAgICBsZXQgbW92ZUFyciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW3RoaXMub3B0aW9ucy5tZWFzdXJlLmxlbmd0aCAtIDFdLm1vdmVcclxuICAgICAgICAgICAgbGV0IGxhc3RQb2ludCA9IG1vdmVBcnJbbW92ZUFyci5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICBpZiAobW92ZU51bSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbW92ZUFyci5wdXNoKHBvcylcclxuICAgICAgICAgICAgICAgIG1vdmVOdW0gPSAxXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlQXJyW21vdmVBcnIubGVuZ3RoIC0gMV0gPSBwb3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2xpY2tMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzTW92ZU1hcCkgcmV0dXJuXHJcbiAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZSAtIGNsaWNrVGltZSA8PSAzMDAgJiYgY3VycmVudFRpbWUgLSBjbGlja1RpbWUgPj0gMTUwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlj4zlh7vnu5PmnZ/mtYvot51cclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlQXJyID0gdGhpcy5vcHRpb25zLm1lYXN1cmVbdGhpcy5vcHRpb25zLm1lYXN1cmUubGVuZ3RoIC0gMV0ubW92ZVxyXG4gICAgICAgICAgICAgICAgbW92ZUFyci5wb3AoKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlzTWVhc3VyaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGNsaWNrTnVtID0gMFxyXG4gICAgICAgICAgICAgICAgY2xpY2tUaW1lID0gMFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgICAgIC8vIOWNleWHu+W8gOWni+a1i+i3nVxyXG4gICAgICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IChwb3MueCAtIHRoaXMub3B0aW9ucy5pbWdYKSAvIHRoaXMub3B0aW9ucy5pbWdTY2FsZSxcclxuICAgICAgICAgICAgICAgICAgICB5OiAocG9zLnkgLSB0aGlzLm9wdGlvbnMuaW1nWSkgLyB0aGlzLm9wdGlvbnMuaW1nU2NhbGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjbGlja051bSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOesrOS4gOasoeWNleWHu1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmU6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHBvcy55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tZWFzdXJlLnB1c2gob2JqKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrTnVtKytcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5aSa5qyh6YCJ54K5XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5vcHRpb25zLm1lYXN1cmUubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMub3B0aW9ucy5tZWFzdXJlW2luZGV4IC0gMV0ubW92ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UG9pbnQgPSBhcnJbYXJyLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogcG9zLnksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHBvcylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xpY2tUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB9XHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrTGlzdGVuZXIpXHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgIH1cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQganVkZ2VCb3JkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOi+ueeVjOajgOa1i1xyXG4gICAgICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1ggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWSAtIGhlaWdodCA8IC10aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAtdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdYIC0gd2lkdGggPCAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWcsOWbvue8qeaUvlxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgd2hlZWxEZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgPyBldmVudC53aGVlbERlbHRhIDogKGV2ZW50LmRlbHRhWSAqICgtNDApKTtcclxuICAgICAgICAgICAgaWYgKHdoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlL7lpKdcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICogMiA8PSB0aGlzLmJnSW1nLndpZHRoICogOCB8fCB0aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqIDIgPD0gdGhpcy5iZ0ltZy5oZWlnaHQgKiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pS+5aSn6L6555WM5Yik5patXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1NjYWxlICo9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWCAqIDIgLSBwb3MueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMiAtIHBvcy55O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g57yp5bCPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvIDIgPj0gd2lkdGggfHwgdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLyAyID49IGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOe8qeWwj+i+ueeVjOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gdGhpcy5vcHRpb25zLmltZ1ggKiAwLjUgKyBwb3MueCAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMC41ICsgcG9zLnkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAganVkZ2VCb3JkZXIoKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgIC8vIOmHjee7mOa1i+i3neWbvuWxglxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNZWFzdXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01vdmUoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDlnLDlm77np7vliqhcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgbGV0IG1vdXNlbW92ZUxpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcIm1vdmVcIjtcclxuICAgICAgICAgICAgICAgIGlzTW92ZU1hcCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGxldCBwb3MxID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBvczEueCAtIHBvcy54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwb3MxLnkgLSBwb3MueTtcclxuICAgICAgICAgICAgICAgIHBvcyA9IHBvczE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCArPSB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgKz0geTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDph43nu5jmtYvot53lm77lsYJcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tZWFzdXJlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNZWFzdXJlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtb3VzZXVwTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBqdWRnZUJvcmRlcigpXHJcbiAgICAgICAgICAgICAgICAvLyDlsY/olL3np7vliqjlnLDlm77lkI7op6blj5HnmoTmtYvot53ngrnlh7vkuovku7ZcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZU1hcCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCAyMDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8g6YeN57uY5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZW1vdmVMaXN0ZW5lcilcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDpvKDmoIfmjIfpkojlnZDmoIdcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcclxuICAgICAgICAgICAgLy8g5a6e5pe26byg5qCH5L2N572uXHJcbiAgICAgICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWCA9IHBvcy54XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWSA9IGhlaWdodCAtIHBvcy55XHJcblxyXG5cclxuICAgICAgICAgICAgLy8g6byg5qCH56e75Yqo5pi+56S65Lq654mp5L+h5oGvXHJcblxyXG4gICAgICAgICAgICAvLyDovazmjaLkuLrlt6bkuIvop5LlnZDmoIfns7tcclxuICAgICAgICAgICAgcG9zID0ge1xyXG4gICAgICAgICAgICAgICAgeDogKHBvcy54IC0gdGhpcy5vcHRpb25zLmltZ1gpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlLFxyXG4gICAgICAgICAgICAgICAgeTogaGVpZ2h0IC0gKHBvcy55IC0gdGhpcy5vcHRpb25zLmltZ1kpIC8gdGhpcy5vcHRpb25zLmltZ1NjYWxlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGksIHBlb3BsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGVyc29uLnNob3dJbmZvID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gZGlyZWN0UGVvcGxlKHBvcywgdGhpcy5vcHRpb25zLnBlb3BsZSwgMTAgLyB0aGlzLm9wdGlvbnMuaW1nU2NhbGUpXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBlb3BsZVtpbmRleF0uc2hvd0luZm8gPSB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3dUb0NhbnZhcyhjYW52YXMsIHgsIHkpIHtcclxuICAgICAgICBsZXQgYmJveCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiB4IC0gYmJveC5sZWZ0IC0gKGJib3gud2lkdGggLSBjYW52YXMud2lkdGgpIC8gMixcclxuICAgICAgICAgICAgeTogeSAtIGJib3gudG9wIC0gKGJib3guaGVpZ2h0IC0gY2FudmFzLmhlaWdodCkgLyAyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQmdJbWcoKSB7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgIHRoaXMuYmdJbWcgPSBpbWdcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgbG9hZFBlb3BsZUltZygpIHtcclxuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMub3B0aW9ucy5wZW9wbGVJbWFnZTtcclxuICAgICAgICB0aGlzLnBlb3BsZUltYWdlID0gaW1nXHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg55S76IOM5pmv5Zyw5Zu+XHJcbiAgICAgKi9cclxuICAgIGRyYXdNYXAoKSB7XHJcbiAgICAgICAgbGV0IGltZ1NjYWxlID0gdGhpcy5vcHRpb25zLmltZ1NjYWxlO1xyXG4gICAgICAgIGxldCBpbWdYID0gdGhpcy5vcHRpb25zLmltZ1g7XHJcbiAgICAgICAgbGV0IGltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWTtcclxuICAgICAgICBsZXQgaW1nID0gdGhpcy5iZ0ltZztcclxuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5tYXBDYW52YXM7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1hcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoY29udGV4dClcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCwgaW1nWCwgaW1nWSwgaW1nLndpZHRoICogaW1nU2NhbGUsIGltZy5oZWlnaHQgKiBpbWdTY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd01vdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93UGF0aCAhPT0gdHJ1ZSkgcmV0dXJuXHJcbiAgICAgICAgLy/nlLvnp7vliqjovajov7lcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZSxcclxuICAgICAgICAgICAgY29sb3JcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50LCBsYXN0O1xyXG4gICAgICAgICAgICBpZiAobW92ZS5sZW5ndGggPT09IDApIHJldHVyblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW92ZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbW92ZVstLWluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgJ3JlZCdcclxuICAgICAgICAgICAgICAgIC8vIOWIh+aNouW3puS4i+inkuS4uuWdkOagh+WOn+eCuVxyXG4gICAgICAgICAgICAgICAgbGFzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBsYXN0LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAoaGVpZ2h0IC0gbGFzdC55KSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChoZWlnaHQgLSBjdXJyZW50LnkpICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRyYXdMaW5lKGNvbnRleHQsIGNvbG9yLCBsYXN0LngsIGxhc3QueSwgY3VycmVudC54LCBjdXJyZW50LnksIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3UGVvcGxlKCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBlb3BsZUNhbnZhcyxcclxuICAgICAgICAgICAgcGVvcGxlSW1hZ2VcclxuICAgICAgICB9ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IHBlb3BsZUltZ1dpZHRoID0gMTY7XHJcbiAgICAgICAgbGV0IHBlb3BsZUltZ0hlaWdodCA9IDE4O1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gcGVvcGxlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoY29udGV4dCk7XHJcbiAgICAgICAgb3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgoe1xyXG4gICAgICAgICAgICBtb3ZlLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgc2hvd0luZm9cclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG1vdmVbbW92ZS5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAvLyDliIfmjaLlt6bkuIvop5LkuLrlnZDmoIfljp/ngrlcclxuICAgICAgICAgICAgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBwb3NpdGlvbi54ICogb3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYIC0gcGVvcGxlSW1nV2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgeTogKGhlaWdodCAtIHBvc2l0aW9uLnkpICogb3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZIC0gcGVvcGxlSW1nSGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaG93SW5mbykge1xyXG4gICAgICAgICAgICAgICAgZHJhd1Blb3BsZUluZm8oY29udGV4dCwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UocGVvcGxlSW1hZ2UsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBlb3BsZUltZ1dpZHRoLCBwZW9wbGVJbWdIZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNZWFzdXJlKCkge1xyXG4gICAgICAgIC8vIOeUu+a1i+i3nei9qOi/uVxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzLFxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIC8v55S756e75Yqo6L2o6L+5XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1lYXN1cmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMubWVhc3VyZS5mb3JFYWNoKCh7XHJcbiAgICAgICAgICAgIG1vdmVcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50LCBsYXN0LCB0b3RhbExlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb3ZlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG1vdmVbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlWy0taW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGxhc3QueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGxhc3QueSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGN1cnJlbnQueSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkcmF3TGluZShjb250ZXh0LCAnI2ZmNjkyMicsIGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSwgMilcclxuICAgICAgICAgICAgICAgIGRyYXdDaXJjbGUoY29udGV4dCwgJyNmZjY5MjInLCBjdXJyZW50LngsIGN1cnJlbnQueSwgNSlcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gJydcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6LW354K5XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICfotbfngrknXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsTGVuZ3RoID0gdG90YWxMZW5ndGggKyBjYWxjdWxhdGVMZW5ndGgobGFzdC54LCBsYXN0LnksIGN1cnJlbnQueCwgY3VycmVudC55KVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBgJHsodG90YWxMZW5ndGgvdGhpcy5vcHRpb25zLmltZ1NjYWxlKS50b0ZpeGVkKDIpfSBtYFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHJhd01lYXN1cmVJbmZvKGNvbnRleHQsIGN1cnJlbnQueCwgY3VycmVudC55LCB0ZXh0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZGVzYyDmuIXpmaR7Y29udGV4dH3nlLvluINcclxuICAgICAqIEBwYXJhbSB7Kn0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgY2xlYXJDYW52YXMoY29udGV4dCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcyxcclxuICAgICAgICAgICAgbW92ZUNhbnZhcyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLFxyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzXHJcbiAgICAgICAgfSA9IHRoaXNcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIG1vdmVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBtZWFzdXJlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgLy8g5Yqo55S7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pIHJldHVyblxyXG4gICAgICAgIGxldCBzdGVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhcygncGVvcGxlJylcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG4gICAgICAgICAgICAvLyDmm7TmlrAg5rWL6Led5Zu+5bGCXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzKCdtZWFzdXJlJylcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy/nlLvnur/mrrVcclxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdMaW5lKGN0eCwgY29sb3IsIHgxLCB5MSwgeDIsIHkyLCBsaW5lV2lkdGgpIHtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcclxuICAgIGN0eC5saW5lVG8oeDIsIHkyKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxufVxyXG4vL+eUu+WchlxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0NpcmNsZShjdHgsIGNvbG9yLCB4LCB5LCByYWRpdXMpIHtcclxuICAgIC8v55S75LiA5Liq56m65b+D5ZyGXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgMzYwLCBmYWxzZSk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7IC8v5aGr5YWF6aKc6ImyXHJcbiAgICBjdHguZmlsbCgpOyAvL+eUu+WunuW/g+WchlxyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5zdHJva2UoKTsgLy/nlLvnqbrlv4PlnIZcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxufVxyXG5cclxuLy8g55S75paH5a2XXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3TWVhc3VyZUluZm8oY3R4LCB4LCB5LCB0ZXh0KSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnXHJcbiAgICBjdHguZmlsbFJlY3QoeCArIDgsIHkgLSAzMCwgNzUsIDI1KTtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZWVlJ1xyXG4gICAgY3R4LnN0cm9rZVJlY3QoeCArIDgsIHkgLSAzMCwgNzUsIDI1KVxyXG4gICAgY3R4LmZvbnQgPSAnMTRweCBBcmlhbCc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDk5Q0MnO1xyXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIHggKyAxMiwgeSAtIDEyKTtcclxufVxyXG5cclxuLy8g55S755So5oi35L+h5oGvXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3UGVvcGxlSW5mbyhjdHgsIHgsIHksIGluZm8pIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZidcclxuICAgIGN0eC5maWxsUmVjdCh4ICsgMTgsIHkgLSAzMCwgMTAwLCA1MCk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2VlZSdcclxuICAgIGN0eC5zdHJva2VSZWN0KHggKyAxOCwgeSAtIDMwLCAxMDAsIDUwKVxyXG4gICAgY3R4LmZvbnQgPSAnMTRweCBBcmlhbCc7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDk5Q0MnO1xyXG4gICAgY3R4LmZpbGxUZXh0KGDnvJblj7fvvJoke2luZm8uaWR9YCwgeCArIDIzLCB5IC0gMTApO1xyXG4gICAgY3R4LmZpbGxUZXh0KGDlp5PlkI3vvJoke2luZm8ubmFtZX1gLCB4ICsgMjMsIHkgKyAxMCk7XHJcbn1cclxuXHJcblxyXG4vLyDli77ogqHlrprnkIbnrpfkuKTngrnot53nprtcclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUxlbmd0aCh4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgbGV0IHggPSB4MSAtIHgyO1xyXG4gICAgbGV0IHkgPSB5MSAtIHkyO1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdFBlb3BsZShwb3MsIHBlb3BsZSwgcikge1xyXG4gICAgbGV0IHBlb3BsZUluZGV4XHJcbiAgICBwZW9wbGUuZm9yRWFjaCgoe1xyXG4gICAgICAgIG1vdmVcclxuICAgIH0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYgKG1vdmUubGVuZ3RoIDw9IDApIHJldHVyblxyXG4gICAgICAgIGxldCBwZW9wbGVQb3MgPSBtb3ZlW21vdmUubGVuZ3RoIC0gMV1cclxuICAgICAgICBsZXQgcG9pbnRMZW5ndGggPSBjYWxjdWxhdGVMZW5ndGgocG9zLngsIHBvcy55LCBwZW9wbGVQb3MueCwgcGVvcGxlUG9zLnkpXHJcbiAgICAgICAgaWYgKHBvaW50TGVuZ3RoIDwgcikgcGVvcGxlSW5kZXggPSBpbmRleFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBlb3BsZUluZGV4XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLm91dGlscz10KCk6ZS5vdXRpbHM9dCgpfSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQobyl7aWYobltvXSlyZXR1cm4gbltvXS5leHBvcnRzO3ZhciByPW5bb109e2k6byxsOiExLGV4cG9ydHM6e319O3JldHVybiBlW29dLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLHQpLHIubD0hMCxyLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4sbyl7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpvfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz01KX0oW2Z1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3JldHVybiBuZXcgUmVnRXhwKFwiKFxcXFxzfF4pXCIrdCtcIihcXFxcc3wkKVwiKS50ZXN0KGUuY2xhc3NOYW1lKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCxuKXt2YXIgbz1uZXcgRGF0ZTtvLnNldERhdGUoby5nZXREYXRlKCkrbiksZG9jdW1lbnQuY29va2llPWUrXCI9XCIrdCtcIjtleHBpcmVzPVwiK299ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3JldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQmJmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuIHdpbmRvdy5zY3JvbGxUbygwLGUpLGV9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLG8pe2Z1bmN0aW9uIHIoKXtmdW5jdGlvbiByKCl7YT1OdW1iZXIobmV3IERhdGUpLG4uYXBwbHkoZixzKX1mdW5jdGlvbiB1KCl7aT12b2lkIDB9dmFyIGY9dGhpcyxjPU51bWJlcihuZXcgRGF0ZSktYSxzPWFyZ3VtZW50cztvJiYhaSYmcigpLGkmJmNsZWFyVGltZW91dChpKSx2b2lkIDA9PT1vJiZjPmU/cigpOiEwIT09dCYmKGk9c2V0VGltZW91dChvP3U6cix2b2lkIDA9PT1vP2UtYzplKSl9dmFyIGksYT0wO3JldHVyblwiYm9vbGVhblwiIT10eXBlb2YgdCYmKG89bixuPXQsdD12b2lkIDApLHJ9fSxmdW5jdGlvbihlLHQsbil7dmFyIG89big2KSxyPW4oNyksaT1uKDApLGE9big4KSx1PW4oOSksZj1uKDEwKSxjPW4oMSkscz1uKDExKSxwPW4oMTIpLGQ9bigyKSxsPW4oMTMpLG09bigxNCksdj1uKDMpLHc9bigxNSksZz1uKDE2KSx5PW4oNCksaD1uKDE3KSx4PW4oMTgpLGI9bigxOSksQz1uKDIwKSxOPW4oMjEpLFM9bigyMiksTT1uKDIzKSxFPW4oMjQpLEY9bigyNSksRD1uKDI2KSxJPW4oMjcpLFQ9bigyOCksaz1uKDI5KSxSPW4oMzApLEE9bigzMSk7ZS5leHBvcnRzPXthcnJheUVxdWFsOm8sYWRkQ2xhc3M6cixoYXNDbGFzczppLHJlbW92ZUNsYXNzOmEsZ2V0Q29va2llOnUscmVtb3ZlQ29va2llOmYsc2V0Q29va2llOmMsZ2V0T1M6cyxnZXRFeHBsb3JlOnAsZ2V0U2Nyb2xsVG9wOmQsb2Zmc2V0Omwsc2Nyb2xsVG86bSxzZXRTY3JvbGxUb3A6dix3aW5kb3dSZXNpemU6dyxkZWJvdW5jZTpnLHRocm90dGxlOnksZ2V0S2V5TmFtZTpoLGRlZXBDbG9uZTp4LGlzRW1wdHlPYmplY3Q6YixyYW5kb21Db2xvcjpDLHJhbmRvbU51bTpOLGlzRW1haWw6Uyxpc0lkQ2FyZDpNLGlzUGhvbmVOdW06RSxpc1VybDpGLGRpZ2l0VXBwZXJjYXNlOkQsaXNTdXBwb3J0V2ViUDpJLGZvcm1hdFBhc3NUaW1lOlQsZm9ybWF0UmVtYWluVGltZTprLHBhcnNlUXVlcnlTdHJpbmc6UixzdHJpbmdmeVF1ZXJ5U3RyaW5nOkF9fSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtpZihlPT09dClyZXR1cm4hMDtpZihlLmxlbmd0aCE9dC5sZW5ndGgpcmV0dXJuITE7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDsrK24paWYoZVtuXSE9PXRbbl0pcmV0dXJuITE7cmV0dXJuITB9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCl7cihlLHQpfHwoZS5jbGFzc05hbWUrPVwiIFwiK3QpfXZhciByPW4oMCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCl7aWYocihlLHQpKXt2YXIgbj1uZXcgUmVnRXhwKFwiKFxcXFxzfF4pXCIrdCtcIihcXFxcc3wkKVwiKTtlLmNsYXNzTmFtZT1lLmNsYXNzTmFtZS5yZXBsYWNlKG4sXCIgXCIpfX12YXIgcj1uKDApO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7Zm9yKHZhciB0PWRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC9cXHMvZyxcIlwiKS5zcGxpdChcIjtcIiksbj0wO248dC5sZW5ndGg7bisrKXt2YXIgbz10W25dLnNwbGl0KFwiPVwiKTtpZihvWzBdPT1lKXJldHVybiBkZWNvZGVVUklDb21wb25lbnQob1sxXSl9cmV0dXJuXCJcIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSl7cihlLFwiMVwiLC0xKX12YXIgcj1uKDEpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXt2YXIgZT1cIm5hdmlnYXRvclwiaW4gd2luZG93JiZcInVzZXJBZ2VudFwiaW4gbmF2aWdhdG9yJiZuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCl8fFwiXCIsdD0oXCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJ2ZW5kb3JcImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLnZlbmRvci50b0xvd2VyQ2FzZSgpLFwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwiYXBwVmVyc2lvblwiaW4gbmF2aWdhdG9yJiZuYXZpZ2F0b3IuYXBwVmVyc2lvbi50b0xvd2VyQ2FzZSgpfHxcIlwiKTtyZXR1cm4vbWFjL2kudGVzdCh0KT9cIk1hY09TWFwiOi93aW4vaS50ZXN0KHQpP1wid2luZG93c1wiOi9saW51eC9pLnRlc3QodCk/XCJsaW51eFwiOigvaXBob25lL2kudGVzdChlKXx8L2lwYWQvaS50ZXN0KGUpfHwvaXBvZC9pLnRlc3QoZSksL2FuZHJvaWQvaS50ZXN0KGUpP1wiYW5kcm9pZFwiOi93aW4vaS50ZXN0KHQpJiYvcGhvbmUvaS50ZXN0KGUpP1wid2luZG93c1Bob25lXCI6dm9pZCAwKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7dmFyIGUsdD17fSxuPW5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtyZXR1cm4oZT1uLm1hdGNoKC9ydjooW1xcZC5dKylcXCkgbGlrZSBnZWNrby8pKT90LmllPWVbMV06KGU9bi5tYXRjaCgvbXNpZSAoW1xcZFxcLl0rKS8pKT90LmllPWVbMV06KGU9bi5tYXRjaCgvZWRnZVxcLyhbXFxkXFwuXSspLykpP3QuZWRnZT1lWzFdOihlPW4ubWF0Y2goL2ZpcmVmb3hcXC8oW1xcZFxcLl0rKS8pKT90LmZpcmVmb3g9ZVsxXTooZT1uLm1hdGNoKC8oPzpvcGVyYXxvcHIpLihbXFxkXFwuXSspLykpP3Qub3BlcmE9ZVsxXTooZT1uLm1hdGNoKC9jaHJvbWVcXC8oW1xcZFxcLl0rKS8pKT90LmNocm9tZT1lWzFdOihlPW4ubWF0Y2goL3ZlcnNpb25cXC8oW1xcZFxcLl0rKS4qc2FmYXJpLykpJiYodC5zYWZhcmk9ZVsxXSksdC5pZT9cIklFOiBcIit0LmllOnQuZWRnZT9cIkVER0U6IFwiK3QuZWRnZTp0LmZpcmVmb3g/XCJGaXJlZm94OiBcIit0LmZpcmVmb3g6dC5jaHJvbWU/XCJDaHJvbWU6IFwiK3QuY2hyb21lOnQub3BlcmE/XCJPcGVyYTogXCIrdC5vcGVyYTp0LnNhZmFyaT9cIlNhZmFyaTogXCIrdC5zYWZhcmk6XCJVbmtvbnduXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9e2xlZnQ6MCx0b3A6MH07ZTspdC5sZWZ0Kz1lLm9mZnNldExlZnQsdC50b3ArPWUub2Zmc2V0VG9wLGU9ZS5vZmZzZXRQYXJlbnQ7cmV0dXJuIHR9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCl7aWYodDwwKXJldHVybiB2b2lkIGkoZSk7dmFyIG49ZS1yKCk7aWYoMCE9PW4pe3ZhciBhPW4vdCoxMDtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtpZihNYXRoLmFicyhhKT5NYXRoLmFicyhuKSlyZXR1cm4gdm9pZCBpKHIoKStuKTtpKHIoKSthKSxuPjAmJnIoKT49ZXx8bjwwJiZyKCk8PWV8fG8oZSx0LTE2KX0pfX12YXIgcj1uKDIpLGk9bigzKTshZnVuY3Rpb24oKXt3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfSgpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXt2YXIgbj13aW5kb3cuaW5uZXJIZWlnaHQ7ZT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2U6ZnVuY3Rpb24oKXt9LHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgdD90OmZ1bmN0aW9uKCl7fSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGZ1bmN0aW9uKCl7dmFyIG89d2luZG93LmlubmVySGVpZ2h0O289PT1uJiZlKCksbzxuJiZ0KCl9KX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0LG4pe3JldHVybiB2b2lkIDA9PT1uP3IoZSx0LCExKTpyKGUsbiwhMSE9PXQpfXZhciByPW4oNCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4gb1tlXT9vW2VdOihjb25zb2xlLmxvZyhcIlVua25vdyBLZXkoS2V5IENvZGU6XCIrZStcIilcIiksXCJcIil9dmFyIG89ezg6XCJCYWNrc3BhY2VcIiw5OlwiVGFiXCIsMTM6XCJFbnRlclwiLDE2OlwiU2hpZnRcIiwxNzpcIkN0cmxcIiwxODpcIkFsdFwiLDE5OlwiUGF1c2VcIiwyMDpcIkNhcHMgTG9ja1wiLDI3OlwiRXNjYXBlXCIsMzI6XCJTcGFjZVwiLDMzOlwiUGFnZSBVcFwiLDM0OlwiUGFnZSBEb3duXCIsMzU6XCJFbmRcIiwzNjpcIkhvbWVcIiwzNzpcIkxlZnRcIiwzODpcIlVwXCIsMzk6XCJSaWdodFwiLDQwOlwiRG93blwiLDQyOlwiUHJpbnQgU2NyZWVuXCIsNDU6XCJJbnNlcnRcIiw0NjpcIkRlbGV0ZVwiLDQ4OlwiMFwiLDQ5OlwiMVwiLDUwOlwiMlwiLDUxOlwiM1wiLDUyOlwiNFwiLDUzOlwiNVwiLDU0OlwiNlwiLDU1OlwiN1wiLDU2OlwiOFwiLDU3OlwiOVwiLDY1OlwiQVwiLDY2OlwiQlwiLDY3OlwiQ1wiLDY4OlwiRFwiLDY5OlwiRVwiLDcwOlwiRlwiLDcxOlwiR1wiLDcyOlwiSFwiLDczOlwiSVwiLDc0OlwiSlwiLDc1OlwiS1wiLDc2OlwiTFwiLDc3OlwiTVwiLDc4OlwiTlwiLDc5OlwiT1wiLDgwOlwiUFwiLDgxOlwiUVwiLDgyOlwiUlwiLDgzOlwiU1wiLDg0OlwiVFwiLDg1OlwiVVwiLDg2OlwiVlwiLDg3OlwiV1wiLDg4OlwiWFwiLDg5OlwiWVwiLDkwOlwiWlwiLDkxOlwiV2luZG93c1wiLDkzOlwiUmlnaHQgQ2xpY2tcIiw5NjpcIk51bXBhZCAwXCIsOTc6XCJOdW1wYWQgMVwiLDk4OlwiTnVtcGFkIDJcIiw5OTpcIk51bXBhZCAzXCIsMTAwOlwiTnVtcGFkIDRcIiwxMDE6XCJOdW1wYWQgNVwiLDEwMjpcIk51bXBhZCA2XCIsMTAzOlwiTnVtcGFkIDdcIiwxMDQ6XCJOdW1wYWQgOFwiLDEwNTpcIk51bXBhZCA5XCIsMTA2OlwiTnVtcGFkICpcIiwxMDc6XCJOdW1wYWQgK1wiLDEwOTpcIk51bXBhZCAtXCIsMTEwOlwiTnVtcGFkIC5cIiwxMTE6XCJOdW1wYWQgL1wiLDExMjpcIkYxXCIsMTEzOlwiRjJcIiwxMTQ6XCJGM1wiLDExNTpcIkY0XCIsMTE2OlwiRjVcIiwxMTc6XCJGNlwiLDExODpcIkY3XCIsMTE5OlwiRjhcIiwxMjA6XCJGOVwiLDEyMTpcIkYxMFwiLDEyMjpcIkYxMVwiLDEyMzpcIkYxMlwiLDE0NDpcIk51bSBMb2NrXCIsMTQ1OlwiU2Nyb2xsIExvY2tcIiwxODI6XCJNeSBDb21wdXRlclwiLDE4MzpcIk15IENhbGN1bGF0b3JcIiwxODY6XCI7XCIsMTg3OlwiPVwiLDE4ODpcIixcIiwxODk6XCItXCIsMTkwOlwiLlwiLDE5MTpcIi9cIiwxOTI6XCJgXCIsMjE5OlwiW1wiLDIyMDpcIlxcXFxcIiwyMjE6XCJdXCIsMjIyOlwiJ1wifTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0O2lmKG51bGw9PWV8fFwib2JqZWN0XCIhPSh2b2lkIDA9PT1lP1widW5kZWZpbmVkXCI6byhlKSkpcmV0dXJuIGU7aWYoZSBpbnN0YW5jZW9mIERhdGUpcmV0dXJuIHQ9bmV3IERhdGUsdC5zZXRUaW1lKGUuZ2V0VGltZSgpKSx0O2lmKGUgaW5zdGFuY2VvZiBBcnJheSl7dD1bXTtmb3IodmFyIHI9MCxpPWUubGVuZ3RoO3I8aTtyKyspdFtyXT1uKGVbcl0pO3JldHVybiB0fWlmKGUgaW5zdGFuY2VvZiBPYmplY3Qpe3Q9e307Zm9yKHZhciBhIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShhKSYmKHRbYV09bihlW2FdKSk7cmV0dXJuIHR9dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGNvcHkgdmFsdWVzISBJdHMgdHlwZSBpc24ndCBzdXBwb3J0ZWQuXCIpfXZhciBvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9O2UuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuISghZXx8XCJvYmplY3RcIiE9PSh2b2lkIDA9PT1lP1widW5kZWZpbmVkXCI6byhlKSl8fEFycmF5LmlzQXJyYXkoZSkpJiYhT2JqZWN0LmtleXMoZSkubGVuZ3RofXZhciBvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9O2UuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm5cIiNcIisoXCIwMDAwMFwiKygxNjc3NzIxNipNYXRoLnJhbmRvbSgpPDwwKS50b1N0cmluZygxNikpLnNsaWNlKC02KX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoodC1lKzEpKStlfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL1xcdysoWy0rLl1cXHcrKSpAXFx3KyhbLS5dXFx3KykqXFwuXFx3KyhbLS5dXFx3KykqLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL14oXlsxLTldXFxkezd9KCgwXFxkKXwoMVswLTJdKSkoKFswfDF8Ml1cXGQpfDNbMC0xXSlcXGR7M30kKXwoXlsxLTldXFxkezV9WzEtOV1cXGR7M30oKDBcXGQpfCgxWzAtMl0pKSgoWzB8MXwyXVxcZCl8M1swLTFdKSgoXFxkezR9KXxcXGR7M31bWHhdKSQpJC8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9eKDB8ODZ8MTc5NTEpPygxM1swLTldfDE1WzAxMjM1Njc4OV18MTdbNjc4XXwxOFswLTldfDE0WzU3XSlbMC05XXs4fSQvLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vWy1hLXpBLVowLTlAOiUuX1xcK34jPV17MiwyNTZ9XFwuW2Etel17Miw2fVxcYihbLWEtekEtWjAtOUA6JV9cXCsufiM/JlxcL1xcLz1dKikvaS50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9W1wi6KeSXCIsXCLliIZcIl0sbj1bXCLpm7ZcIixcIuWjuVwiLFwi6LSwXCIsXCLlj4FcIixcIuiChlwiLFwi5LyNXCIsXCLpmYZcIixcIuafklwiLFwi5o2MXCIsXCLnjpZcIl0sbz1bW1wi5YWDXCIsXCLkuIdcIixcIuS6v1wiXSxbXCJcIixcIuaLvlwiLFwi5L2wXCIsXCLku59cIl1dLHI9ZTwwP1wi5qygXCI6XCJcIjtlPU1hdGguYWJzKGUpO2Zvcih2YXIgaT1cIlwiLGE9MDthPHQubGVuZ3RoO2ErKylpKz0obltNYXRoLmZsb29yKDEwKmUqTWF0aC5wb3coMTAsYSkpJTEwXSt0W2FdKS5yZXBsYWNlKC/pm7YuLyxcIlwiKTtpPWl8fFwi5pW0XCIsZT1NYXRoLmZsb29yKGUpO2Zvcih2YXIgYT0wO2E8b1swXS5sZW5ndGgmJmU+MDthKyspe2Zvcih2YXIgdT1cIlwiLGY9MDtmPG9bMV0ubGVuZ3RoJiZlPjA7ZisrKXU9bltlJTEwXStvWzFdW2ZdK3UsZT1NYXRoLmZsb29yKGUvMTApO2k9dS5yZXBsYWNlKC8o6Zu2Likq6Zu2JC8sXCJcIikucmVwbGFjZSgvXiQvLFwi6Zu2XCIpK29bMF1bYV0raX1yZXR1cm4gcitpLnJlcGxhY2UoLyjpm7YuKSrpm7blhYMvLFwi5YWDXCIpLnJlcGxhY2UoLyjpm7YuKSsvZyxcIumbtlwiKS5yZXBsYWNlKC9e5pW0JC8sXCLpm7blhYPmlbRcIil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3JldHVybiEhW10ubWFwJiYwPT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLnRvRGF0YVVSTChcImltYWdlL3dlYnBcIikuaW5kZXhPZihcImRhdGE6aW1hZ2Uvd2VicFwiKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PURhdGUucGFyc2UobmV3IERhdGUpLG49dC1lLG89cGFyc2VJbnQobi84NjRlNSkscj1wYXJzZUludChuLzM2ZTUpLGk9cGFyc2VJbnQobi82ZTQpLGE9cGFyc2VJbnQoby8zMCksdT1wYXJzZUludChhLzEyKTtyZXR1cm4gdT91K1wi5bm05YmNXCI6YT9hK1wi5Liq5pyI5YmNXCI6bz9vK1wi5aSp5YmNXCI6cj9yK1wi5bCP5pe25YmNXCI6aT9pK1wi5YiG6ZKf5YmNXCI6XCLliJrliJpcIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PW5ldyBEYXRlLG49bmV3IERhdGUoZSksbz1uLmdldFRpbWUoKS10LmdldFRpbWUoKSxyPTAsaT0wLGE9MCx1PTA7cmV0dXJuIG8+PTAmJihyPU1hdGguZmxvb3Ioby8xZTMvMzYwMC8yNCksaT1NYXRoLmZsb29yKG8vMWUzLzYwLzYwJTI0KSxhPU1hdGguZmxvb3Ioby8xZTMvNjAlNjApLHU9TWF0aC5mbG9vcihvLzFlMyU2MCkpLHIrXCLlpKkgXCIraStcIuWwj+aXtiBcIithK1wi5YiG6ZKfIFwiK3UrXCLnp5JcIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2U9bnVsbD09ZT93aW5kb3cubG9jYXRpb24uaHJlZjplO3ZhciB0PWUuc3Vic3RyaW5nKGUubGFzdEluZGV4T2YoXCI/XCIpKzEpO3JldHVybiB0P0pTT04ucGFyc2UoJ3tcIicrZGVjb2RlVVJJQ29tcG9uZW50KHQpLnJlcGxhY2UoL1wiL2csJ1xcXFxcIicpLnJlcGxhY2UoLyYvZywnXCIsXCInKS5yZXBsYWNlKC89L2csJ1wiOlwiJykrJ1wifScpOnt9fWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7aWYoIWUpcmV0dXJuXCJcIjt2YXIgdD1bXTtmb3IodmFyIG4gaW4gZSl7dmFyIG89ZVtuXTtpZihvIGluc3RhbmNlb2YgQXJyYXkpZm9yKHZhciByPTA7cjxvLmxlbmd0aDsrK3IpdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuK1wiW1wiK3IrXCJdXCIpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChvW3JdKSk7ZWxzZSB0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG4pK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChlW25dKSl9cmV0dXJuIHQuam9pbihcIiZcIil9ZS5leHBvcnRzPW59XSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vdXRpbHMvbWluL291dGlscy5taW4uanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk1vY2tcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTW9ja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBnbG9iYWwgcmVxdWlyZSwgbW9kdWxlLCB3aW5kb3cgKi9cblx0dmFyIEhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXHR2YXIgUmFuZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuXHR2YXIgUkUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXHR2YXIgdG9KU09OU2NoZW1hID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMylcblx0dmFyIHZhbGlkID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSlcblxuXHR2YXIgWEhSXG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgWEhSID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNylcblxuXHQvKiFcblx0ICAgIE1vY2sgLSDmqKHmi5/or7fmsYIgJiDmqKHmi5/mlbDmja5cblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9udXlzb2Z0L01vY2tcblx0ICAgIOWiqOaZuiBtb3poaS5neXlAdGFvYmFvLmNvbSBudXlzb2Z0QGdtYWlsLmNvbVxuXHQqL1xuXHR2YXIgTW9jayA9IHtcblx0ICAgIEhhbmRsZXI6IEhhbmRsZXIsXG5cdCAgICBSYW5kb206IFJhbmRvbSxcblx0ICAgIFV0aWw6IFV0aWwsXG5cdCAgICBYSFI6IFhIUixcblx0ICAgIFJFOiBSRSxcblx0ICAgIHRvSlNPTlNjaGVtYTogdG9KU09OU2NoZW1hLFxuXHQgICAgdmFsaWQ6IHZhbGlkLFxuXHQgICAgaGVyZWRvYzogVXRpbC5oZXJlZG9jLFxuXHQgICAgc2V0dXA6IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG5cdCAgICAgICAgcmV0dXJuIFhIUi5zZXR1cChzZXR0aW5ncylcblx0ICAgIH0sXG5cdCAgICBfbW9ja2VkOiB7fVxuXHR9XG5cblx0TW9jay52ZXJzaW9uID0gJzEuMC4xLWJldGEzJ1xuXG5cdC8vIOmBv+WFjeW+queOr+S+nei1llxuXHRpZiAoWEhSKSBYSFIuTW9jayA9IE1vY2tcblxuXHQvKlxuXHQgICAgKiBNb2NrLm1vY2soIHRlbXBsYXRlIClcblx0ICAgICogTW9jay5tb2NrKCBmdW5jdGlvbigpIClcblx0ICAgICogTW9jay5tb2NrKCBydXJsLCB0ZW1wbGF0ZSApXG5cdCAgICAqIE1vY2subW9jayggcnVybCwgZnVuY3Rpb24ob3B0aW9ucykgKVxuXHQgICAgKiBNb2NrLm1vY2soIHJ1cmwsIHJ0eXBlLCB0ZW1wbGF0ZSApXG5cdCAgICAqIE1vY2subW9jayggcnVybCwgcnR5cGUsIGZ1bmN0aW9uKG9wdGlvbnMpIClcblxuXHQgICAg5qC55o2u5pWw5o2u5qih5p2/55Sf5oiQ5qih5ouf5pWw5o2u44CCXG5cdCovXG5cdE1vY2subW9jayA9IGZ1bmN0aW9uKHJ1cmwsIHJ0eXBlLCB0ZW1wbGF0ZSkge1xuXHQgICAgLy8gTW9jay5tb2NrKHRlbXBsYXRlKVxuXHQgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0ICAgICAgICByZXR1cm4gSGFuZGxlci5nZW4ocnVybClcblx0ICAgIH1cblx0ICAgIC8vIE1vY2subW9jayhydXJsLCB0ZW1wbGF0ZSlcblx0ICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG5cdCAgICAgICAgdGVtcGxhdGUgPSBydHlwZVxuXHQgICAgICAgIHJ0eXBlID0gdW5kZWZpbmVkXG5cdCAgICB9XG5cdCAgICAvLyDmi6bmiKogWEhSXG5cdCAgICBpZiAoWEhSKSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBYSFJcblx0ICAgIE1vY2suX21vY2tlZFtydXJsICsgKHJ0eXBlIHx8ICcnKV0gPSB7XG5cdCAgICAgICAgcnVybDogcnVybCxcblx0ICAgICAgICBydHlwZTogcnR5cGUsXG5cdCAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlXG5cdCAgICB9XG5cdCAgICByZXR1cm4gTW9ja1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBNb2NrXG5cbi8qKiovIH0sXG4vKiAxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBcblx0ICAgICMjIEhhbmRsZXJcblxuXHQgICAg5aSE55CG5pWw5o2u5qih5p2/44CCXG5cdCAgICBcblx0ICAgICogSGFuZGxlci5nZW4oIHRlbXBsYXRlLCBuYW1lPywgY29udGV4dD8gKVxuXG5cdCAgICAgICAg5YWl5Y+j5pa55rOV44CCXG5cblx0ICAgICogRGF0YSBUZW1wbGF0ZSBEZWZpbml0aW9uLCBEVERcblx0ICAgICAgICBcblx0ICAgICAgICDlpITnkIbmlbDmja7mqKHmnb/lrprkuYnjgIJcblxuXHQgICAgICAgICogSGFuZGxlci5hcnJheSggb3B0aW9ucyApXG5cdCAgICAgICAgKiBIYW5kbGVyLm9iamVjdCggb3B0aW9ucyApXG5cdCAgICAgICAgKiBIYW5kbGVyLm51bWJlciggb3B0aW9ucyApXG5cdCAgICAgICAgKiBIYW5kbGVyLmJvb2xlYW4oIG9wdGlvbnMgKVxuXHQgICAgICAgICogSGFuZGxlci5zdHJpbmcoIG9wdGlvbnMgKVxuXHQgICAgICAgICogSGFuZGxlci5mdW5jdGlvbiggb3B0aW9ucyApXG5cdCAgICAgICAgKiBIYW5kbGVyLnJlZ2V4cCggb3B0aW9ucyApXG5cdCAgICAgICAgXG5cdCAgICAgICAg5aSE55CG6Lev5b6E77yI55u45a+55ZKM57ud5a+577yJ44CCXG5cblx0ICAgICAgICAqIEhhbmRsZXIuZ2V0VmFsdWVCeUtleVBhdGgoIGtleSwgb3B0aW9ucyApXG5cblx0ICAgICogRGF0YSBQbGFjZWhvbGRlciBEZWZpbml0aW9uLCBEUERcblxuXHQgICAgICAgIOWkhOeQhuaVsOaNruWNoOS9jeespuWumuS5iVxuXG5cdCAgICAgICAgKiBIYW5kbGVyLnBsYWNlaG9sZGVyKCBwbGFjZWhvbGRlciwgY29udGV4dCwgdGVtcGxhdGVDb250ZXh0LCBvcHRpb25zIClcblxuXHQqL1xuXG5cdHZhciBDb25zdGFudCA9IF9fd2VicGFja19yZXF1aXJlX18oMilcblx0dmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cdHZhciBQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXG5cdHZhciBSYW5kb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cdHZhciBSRSA9IF9fd2VicGFja19yZXF1aXJlX18oMjApXG5cblx0dmFyIEhhbmRsZXIgPSB7XG5cdCAgICBleHRlbmQ6IFV0aWwuZXh0ZW5kXG5cdH1cblxuXHQvKlxuXHQgICAgdGVtcGxhdGUgICAgICAgIOWxnuaAp+WAvO+8iOWNs+aVsOaNruaooeadv++8iVxuXHQgICAgbmFtZSAgICAgICAgICAgIOWxnuaAp+WQjVxuXHQgICAgY29udGV4dCAgICAgICAgIOaVsOaNruS4iuS4i+aWh++8jOeUn+aIkOWQjueahOaVsOaNrlxuXHQgICAgdGVtcGxhdGVDb250ZXh0IOaooeadv+S4iuS4i+aWh++8jFxuXG5cdCAgICBIYW5kbGUuZ2VuKHRlbXBsYXRlLCBuYW1lLCBvcHRpb25zKVxuXHQgICAgY29udGV4dFxuXHQgICAgICAgIGN1cnJlbnRDb250ZXh0LCB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0LCBcblx0ICAgICAgICBwYXRoLCB0ZW1wbGF0ZVBhdGhcblx0ICAgICAgICByb290LCB0ZW1wbGF0ZVJvb3Rcblx0Ki9cblx0SGFuZGxlci5nZW4gPSBmdW5jdGlvbih0ZW1wbGF0ZSwgbmFtZSwgY29udGV4dCkge1xuXHQgICAgLyoganNoaW50IC1XMDQxICovXG5cdCAgICBuYW1lID0gbmFtZSA9PSB1bmRlZmluZWQgPyAnJyA6IChuYW1lICsgJycpXG5cblx0ICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9XG5cdCAgICBjb250ZXh0ID0ge1xuXHQgICAgICAgICAgICAvLyDlvZPliY3orr/pl67ot6/lvoTvvIzlj6rmnInlsZ7mgKflkI3vvIzkuI3ljIXmi6znlJ/miJDop4TliJlcblx0ICAgICAgICAgICAgcGF0aDogY29udGV4dC5wYXRoIHx8IFtDb25zdGFudC5HVUlEXSxcblx0ICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBjb250ZXh0LnRlbXBsYXRlUGF0aCB8fCBbQ29uc3RhbnQuR1VJRCsrXSxcblx0ICAgICAgICAgICAgLy8g5pyA57uI5bGe5oCn5YC855qE5LiK5LiL5paHXG5cdCAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiBjb250ZXh0LmN1cnJlbnRDb250ZXh0LFxuXHQgICAgICAgICAgICAvLyDlsZ7mgKflgLzmqKHmnb/nmoTkuIrkuIvmlodcblx0ICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogY29udGV4dC50ZW1wbGF0ZUN1cnJlbnRDb250ZXh0IHx8IHRlbXBsYXRlLFxuXHQgICAgICAgICAgICAvLyDmnIDnu4jlgLznmoTmoLlcblx0ICAgICAgICAgICAgcm9vdDogY29udGV4dC5yb290IHx8IGNvbnRleHQuY3VycmVudENvbnRleHQsXG5cdCAgICAgICAgICAgIC8vIOaooeadv+eahOaguVxuXHQgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IGNvbnRleHQudGVtcGxhdGVSb290IHx8IGNvbnRleHQudGVtcGxhdGVDdXJyZW50Q29udGV4dCB8fCB0ZW1wbGF0ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBjb25zb2xlLmxvZygncGF0aDonLCBjb250ZXh0LnBhdGguam9pbignLicpLCB0ZW1wbGF0ZSlcblxuXHQgICAgdmFyIHJ1bGUgPSBQYXJzZXIucGFyc2UobmFtZSlcblx0ICAgIHZhciB0eXBlID0gVXRpbC50eXBlKHRlbXBsYXRlKVxuXHQgICAgdmFyIGRhdGFcblxuXHQgICAgaWYgKEhhbmRsZXJbdHlwZV0pIHtcblx0ICAgICAgICBkYXRhID0gSGFuZGxlclt0eXBlXSh7XG5cdCAgICAgICAgICAgIC8vIOWxnuaAp+WAvOexu+Wei1xuXHQgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICAvLyDlsZ7mgKflgLzmqKHmnb9cblx0ICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuXHQgICAgICAgICAgICAvLyDlsZ7mgKflkI0gKyDnlJ/miJDop4TliJlcblx0ICAgICAgICAgICAgbmFtZTogbmFtZSxcblx0ICAgICAgICAgICAgLy8g5bGe5oCn5ZCNXG5cdCAgICAgICAgICAgIHBhcnNlZE5hbWU6IG5hbWUgPyBuYW1lLnJlcGxhY2UoQ29uc3RhbnQuUkVfS0VZLCAnJDEnKSA6IG5hbWUsXG5cblx0ICAgICAgICAgICAgLy8g6Kej5p6Q5ZCO55qE55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgICAgIHJ1bGU6IHJ1bGUsXG5cdCAgICAgICAgICAgIC8vIOebuOWFs+S4iuS4i+aWh1xuXHQgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG5cdCAgICAgICAgfSlcblxuXHQgICAgICAgIGlmICghY29udGV4dC5yb290KSBjb250ZXh0LnJvb3QgPSBkYXRhXG5cdCAgICAgICAgcmV0dXJuIGRhdGFcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHRlbXBsYXRlXG5cdH1cblxuXHRIYW5kbGVyLmV4dGVuZCh7XG5cdCAgICBhcnJheTogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXSxcblx0ICAgICAgICAgICAgaSwgaWk7XG5cblx0ICAgICAgICAvLyAnbmFtZXwxJzogW11cblx0ICAgICAgICAvLyAnbmFtZXxjb3VudCc6IFtdXG5cdCAgICAgICAgLy8gJ25hbWV8bWluLW1heCc6IFtdXG5cdCAgICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzdWx0XG5cblx0ICAgICAgICAvLyAnYXJyJzogW3sgJ2VtYWlsJzogJ0BFTUFJTCcgfSwgeyAnZW1haWwnOiAnQEVNQUlMJyB9XVxuXHQgICAgICAgIGlmICghb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnMpIHtcblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2goaSlcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChpKVxuXHQgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXG5cdCAgICAgICAgICAgICAgICAgICAgSGFuZGxlci5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtpXSwgaSwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICByb290OiBvcHRpb25zLmNvbnRleHQucm9vdCB8fCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnBvcCgpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvLyAnbWV0aG9kfDEnOiBbJ0dFVCcsICdQT1NUJywgJ0hFQUQnLCAnREVMRVRFJ11cblx0ICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5taW4gPT09IDEgJiYgb3B0aW9ucy5ydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBmaXggIzE3XG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKG9wdGlvbnMubmFtZSlcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChvcHRpb25zLm5hbWUpXG5cdCAgICAgICAgICAgICAgICByZXN1bHQgPSBSYW5kb20ucGljayhcblx0ICAgICAgICAgICAgICAgICAgICBIYW5kbGVyLmdlbihvcHRpb25zLnRlbXBsYXRlLCB1bmRlZmluZWQsIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcm9vdDogb3B0aW9ucy5jb250ZXh0LnJvb3QgfHwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gJ2RhdGF8KzEnOiBbe30sIHt9XVxuXHQgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzWzJdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZS5fX29yZGVyX2luZGV4ID0gb3B0aW9ucy50ZW1wbGF0ZS5fX29yZGVyX2luZGV4IHx8IDBcblxuXHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gob3B0aW9ucy5uYW1lKVxuXHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChvcHRpb25zLm5hbWUpXG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gSGFuZGxlci5nZW4ob3B0aW9ucy50ZW1wbGF0ZSwgdW5kZWZpbmVkLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgICAgICB9KVtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZS5fX29yZGVyX2luZGV4ICUgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGhcblx0ICAgICAgICAgICAgICAgICAgICBdXG5cblx0ICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlLl9fb3JkZXJfaW5kZXggKz0gK29wdGlvbnMucnVsZS5wYXJhbWV0ZXJzWzJdXG5cblx0ICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucG9wKClcblxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyAnZGF0YXwxLTEwJzogW3t9XVxuXHQgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLnJ1bGUuY291bnQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyAnZGF0YXwxLTEwJzogW3t9LCB7fV1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpaSA9IDA7IGlpIDwgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGg7IGlpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gocmVzdWx0Lmxlbmd0aClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChpaSlcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGVbaWldLCByZXN1bHQubGVuZ3RoLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgb2JqZWN0OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IHt9LFxuXHQgICAgICAgICAgICBrZXlzLCBmbktleXMsIGtleSwgcGFyc2VkS2V5LCBpbmMsIGk7XG5cblx0ICAgICAgICAvLyAnb2JqfG1pbi1tYXgnOiB7fVxuXHQgICAgICAgIC8qIGpzaGludCAtVzA0MSAqL1xuXHQgICAgICAgIGlmIChvcHRpb25zLnJ1bGUubWluICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICBrZXlzID0gVXRpbC5rZXlzKG9wdGlvbnMudGVtcGxhdGUpXG5cdCAgICAgICAgICAgIGtleXMgPSBSYW5kb20uc2h1ZmZsZShrZXlzKVxuXHQgICAgICAgICAgICBrZXlzID0ga2V5cy5zbGljZSgwLCBvcHRpb25zLnJ1bGUuY291bnQpXG5cdCAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBrZXkgPSBrZXlzW2ldXG5cdCAgICAgICAgICAgICAgICBwYXJzZWRLZXkgPSBrZXkucmVwbGFjZShDb25zdGFudC5SRV9LRVksICckMScpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHBhcnNlZEtleSlcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChrZXkpXG5cdCAgICAgICAgICAgICAgICByZXN1bHRbcGFyc2VkS2V5XSA9IEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XG5cdCAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcblx0ICAgICAgICAgICAgICAgICAgICByb290OiBvcHRpb25zLmNvbnRleHQucm9vdCB8fCByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvLyAnb2JqJzoge31cblx0ICAgICAgICAgICAga2V5cyA9IFtdXG5cdCAgICAgICAgICAgIGZuS2V5cyA9IFtdIC8vICMyNSDmlLnlj5jkuobpnZ7lh73mlbDlsZ7mgKfnmoTpobrluo/vvIzmn6Xmib7otbfmnaXkuI3mlrnkvr9cblx0ICAgICAgICAgICAgZm9yIChrZXkgaW4gb3B0aW9ucy50ZW1wbGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgKHR5cGVvZiBvcHRpb25zLnRlbXBsYXRlW2tleV0gPT09ICdmdW5jdGlvbicgPyBmbktleXMgOiBrZXlzKS5wdXNoKGtleSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZm5LZXlzKVxuXG5cdCAgICAgICAgICAgIC8qXG5cdCAgICAgICAgICAgICAgICDkvJrmlLnlj5jpnZ7lh73mlbDlsZ7mgKfnmoTpobrluo9cblx0ICAgICAgICAgICAgICAgIGtleXMgPSBVdGlsLmtleXMob3B0aW9ucy50ZW1wbGF0ZSlcblx0ICAgICAgICAgICAgICAgIGtleXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGFmbiA9IHR5cGVvZiBvcHRpb25zLnRlbXBsYXRlW2FdID09PSAnZnVuY3Rpb24nXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGJmbiA9IHR5cGVvZiBvcHRpb25zLnRlbXBsYXRlW2JdID09PSAnZnVuY3Rpb24nXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGFmbiA9PT0gYmZuKSByZXR1cm4gMFxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChhZm4gJiYgIWJmbikgcmV0dXJuIDFcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIWFmbiAmJiBiZm4pIHJldHVybiAtMVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgKi9cblxuXHQgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0ga2V5c1tpXVxuXHQgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0ga2V5LnJlcGxhY2UoQ29uc3RhbnQuUkVfS0VZLCAnJDEnKVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChwYXJzZWRLZXkpXG5cdCAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnB1c2goa2V5KVxuXHQgICAgICAgICAgICAgICAgcmVzdWx0W3BhcnNlZEtleV0gPSBIYW5kbGVyLmdlbihvcHRpb25zLnRlbXBsYXRlW2tleV0sIGtleSwge1xuXHQgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aCxcblx0ICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG5cdCAgICAgICAgICAgICAgICAgICAgcm9vdDogb3B0aW9ucy5jb250ZXh0LnJvb3QgfHwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucG9wKClcblx0ICAgICAgICAgICAgICAgICAgICAvLyAnaWR8KzEnOiAxXG5cdCAgICAgICAgICAgICAgICBpbmMgPSBrZXkubWF0Y2goQ29uc3RhbnQuUkVfS0VZKVxuXHQgICAgICAgICAgICAgICAgaWYgKGluYyAmJiBpbmNbMl0gJiYgVXRpbC50eXBlKG9wdGlvbnMudGVtcGxhdGVba2V5XSkgPT09ICdudW1iZXInKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZVtrZXldICs9IHBhcnNlSW50KGluY1syXSwgMTApXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIG51bWJlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgICAgIHZhciByZXN1bHQsIHBhcnRzO1xuXHQgICAgICAgIGlmIChvcHRpb25zLnJ1bGUuZGVjaW1hbCkgeyAvLyBmbG9hdFxuXHQgICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlICs9ICcnXG5cdCAgICAgICAgICAgIHBhcnRzID0gb3B0aW9ucy50ZW1wbGF0ZS5zcGxpdCgnLicpXG5cdCAgICAgICAgICAgICAgICAvLyAnZmxvYXQxfC4xLTEwJzogMTAsXG5cdCAgICAgICAgICAgICAgICAvLyAnZmxvYXQyfDEtMTAwLjEtMTAnOiAxLFxuXHQgICAgICAgICAgICAgICAgLy8gJ2Zsb2F0M3w5OTkuMS0xMCc6IDEsXG5cdCAgICAgICAgICAgICAgICAvLyAnZmxvYXQ0fC4zLTEwJzogMTIzLjEyMyxcblx0ICAgICAgICAgICAgcGFydHNbMF0gPSBvcHRpb25zLnJ1bGUucmFuZ2UgPyBvcHRpb25zLnJ1bGUuY291bnQgOiBwYXJ0c1swXVxuXHQgICAgICAgICAgICBwYXJ0c1sxXSA9IChwYXJ0c1sxXSB8fCAnJykuc2xpY2UoMCwgb3B0aW9ucy5ydWxlLmRjb3VudClcblx0ICAgICAgICAgICAgd2hpbGUgKHBhcnRzWzFdLmxlbmd0aCA8IG9wdGlvbnMucnVsZS5kY291bnQpIHtcblx0ICAgICAgICAgICAgICAgIHBhcnRzWzFdICs9IChcblx0ICAgICAgICAgICAgICAgICAgICAvLyDmnIDlkI7kuIDkvY3kuI3og73kuLogMO+8muWmguaenOacgOWQjuS4gOS9jeS4uiAw77yM5Lya6KKrIEpTIOW8leaTjuW/veeVpeaOieOAglxuXHQgICAgICAgICAgICAgICAgICAgIChwYXJ0c1sxXS5sZW5ndGggPCBvcHRpb25zLnJ1bGUuZGNvdW50IC0gMSkgPyBSYW5kb20uY2hhcmFjdGVyKCdudW1iZXInKSA6IFJhbmRvbS5jaGFyYWN0ZXIoJzEyMzQ1Njc4OScpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmVzdWx0ID0gcGFyc2VGbG9hdChwYXJ0cy5qb2luKCcuJyksIDEwKVxuXHQgICAgICAgIH0gZWxzZSB7IC8vIGludGVnZXJcblx0ICAgICAgICAgICAgLy8gJ2dyYWRlMXwxLTEwMCc6IDEsXG5cdCAgICAgICAgICAgIHJlc3VsdCA9IG9wdGlvbnMucnVsZS5yYW5nZSAmJiAhb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnNbMl0gPyBvcHRpb25zLnJ1bGUuY291bnQgOiBvcHRpb25zLnRlbXBsYXRlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICBib29sZWFuOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIHJlc3VsdDtcblx0ICAgICAgICAvLyAncHJvcHxtdWx0aXBsZSc6IGZhbHNlLCDlvZPliY3lgLzmmK/nm7jlj43lgLznmoTmpoLnjoflgI3mlbBcblx0ICAgICAgICAvLyAncHJvcHxwcm9iYWJpbGl0eS1wcm9iYWJpbGl0eSc6IGZhbHNlLCDlvZPliY3lgLzkuI7nm7jlj43lgLznmoTmpoLnjodcblx0ICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucGFyYW1ldGVycyA/IFJhbmRvbS5ib29sKG9wdGlvbnMucnVsZS5taW4sIG9wdGlvbnMucnVsZS5tYXgsIG9wdGlvbnMudGVtcGxhdGUpIDogb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICBzdHJpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gJycsXG5cdCAgICAgICAgICAgIGksIHBsYWNlaG9sZGVycywgcGgsIHBoZWQ7XG5cdCAgICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoKSB7XG5cblx0ICAgICAgICAgICAgLy8gICdmb28nOiAn4piFJyxcblx0ICAgICAgICAgICAgLyoganNoaW50IC1XMDQxICovXG5cdCAgICAgICAgICAgIGlmIChvcHRpb25zLnJ1bGUuY291bnQgPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICByZXN1bHQgKz0gb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gJ3N0YXJ8MS01JzogJ+KYhScsXG5cdCAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLnJ1bGUuY291bnQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0ICs9IG9wdGlvbnMudGVtcGxhdGVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAvLyAnZW1haWx8MS0xMCc6ICdARU1BSUwsICcsXG5cdCAgICAgICAgICAgIHBsYWNlaG9sZGVycyA9IHJlc3VsdC5tYXRjaChDb25zdGFudC5SRV9QTEFDRUhPTERFUikgfHwgW10gLy8gQS1aXzAtOSA+IFxcd19cblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBsYWNlaG9sZGVycy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgcGggPSBwbGFjZWhvbGRlcnNbaV1cblxuXHQgICAgICAgICAgICAgICAgLy8g6YGH5Yiw6L2s5LmJ5pac5p2g77yM5LiN6ZyA6KaB6Kej5p6Q5Y2g5L2N56ymXG5cdCAgICAgICAgICAgICAgICBpZiAoL15cXFxcLy50ZXN0KHBoKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVycy5zcGxpY2UoaS0tLCAxKVxuXHQgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHBoZWQgPSBIYW5kbGVyLnBsYWNlaG9sZGVyKHBoLCBvcHRpb25zLmNvbnRleHQuY3VycmVudENvbnRleHQsIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZUN1cnJlbnRDb250ZXh0LCBvcHRpb25zKVxuXG5cdCAgICAgICAgICAgICAgICAvLyDlj6rmnInkuIDkuKrljaDkvY3nrKbvvIzlubbkuJTmsqHmnInlhbbku5blrZfnrKZcblx0ICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcnMubGVuZ3RoID09PSAxICYmIHBoID09PSByZXN1bHQgJiYgdHlwZW9mIHBoZWQgIT09IHR5cGVvZiByZXN1bHQpIHsgLy8gXG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGhlZFxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc051bWVyaWMocGhlZCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGFyc2VGbG9hdChwaGVkLCAxMClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKC9eKHRydWV8ZmFsc2UpJC8udGVzdChwaGVkKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwaGVkID09PSAndHJ1ZScgPyB0cnVlIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBoZWQgPT09ICdmYWxzZScgPyBmYWxzZSA6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaGVkIC8vIOW3sue7j+aYr+W4g+WwlOWAvFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHBoLCBwaGVkKVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvLyAnQVNDSUl8MS0xMCc6ICcnLFxuXHQgICAgICAgICAgICAvLyAnQVNDSUknOiAnJyxcblx0ICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnJhbmdlID8gUmFuZG9tLnN0cmluZyhvcHRpb25zLnJ1bGUuY291bnQpIDogb3B0aW9ucy50ZW1wbGF0ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgJ2Z1bmN0aW9uJzogZnVuY3Rpb24ob3B0aW9ucykge1xuXHQgICAgICAgIC8vICggY29udGV4dCwgb3B0aW9ucyApXG5cdCAgICAgICAgcmV0dXJuIG9wdGlvbnMudGVtcGxhdGUuY2FsbChvcHRpb25zLmNvbnRleHQuY3VycmVudENvbnRleHQsIG9wdGlvbnMpXG5cdCAgICB9LFxuXHQgICAgJ3JlZ2V4cCc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0ICAgICAgICB2YXIgc291cmNlID0gJydcblxuXHQgICAgICAgIC8vICduYW1lJzogL3JlZ2V4cC8sXG5cdCAgICAgICAgLyoganNoaW50IC1XMDQxICovXG5cdCAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5jb3VudCA9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgc291cmNlICs9IG9wdGlvbnMudGVtcGxhdGUuc291cmNlIC8vIHJlZ2V4cC5zb3VyY2Vcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyAnbmFtZXwxLTUnOiAvcmVnZXhwLyxcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHNvdXJjZSArPSBvcHRpb25zLnRlbXBsYXRlLnNvdXJjZVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiBSRS5IYW5kbGVyLmdlbihcblx0ICAgICAgICAgICAgUkUuUGFyc2VyLnBhcnNlKFxuXHQgICAgICAgICAgICAgICAgc291cmNlXG5cdCAgICAgICAgICAgIClcblx0ICAgICAgICApXG5cdCAgICB9XG5cdH0pXG5cblx0SGFuZGxlci5leHRlbmQoe1xuXHQgICAgX2FsbDogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIHJlID0ge307XG5cdCAgICAgICAgZm9yICh2YXIga2V5IGluIFJhbmRvbSkgcmVba2V5LnRvTG93ZXJDYXNlKCldID0ga2V5XG5cdCAgICAgICAgcmV0dXJuIHJlXG5cdCAgICB9LFxuXHQgICAgLy8g5aSE55CG5Y2g5L2N56ym77yM6L2s5o2i5Li65pyA57uI5YC8XG5cdCAgICBwbGFjZWhvbGRlcjogZnVuY3Rpb24ocGxhY2Vob2xkZXIsIG9iaiwgdGVtcGxhdGVDb250ZXh0LCBvcHRpb25zKSB7XG5cdCAgICAgICAgLy8gY29uc29sZS5sb2cob3B0aW9ucy5jb250ZXh0LnBhdGgpXG5cdCAgICAgICAgLy8gMSBrZXksIDIgcGFyYW1zXG5cdCAgICAgICAgQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIuZXhlYygnJylcblx0ICAgICAgICB2YXIgcGFydHMgPSBDb25zdGFudC5SRV9QTEFDRUhPTERFUi5leGVjKHBsYWNlaG9sZGVyKSxcblx0ICAgICAgICAgICAga2V5ID0gcGFydHMgJiYgcGFydHNbMV0sXG5cdCAgICAgICAgICAgIGxrZXkgPSBrZXkgJiYga2V5LnRvTG93ZXJDYXNlKCksXG5cdCAgICAgICAgICAgIG9rZXkgPSB0aGlzLl9hbGwoKVtsa2V5XSxcblx0ICAgICAgICAgICAgcGFyYW1zID0gcGFydHMgJiYgcGFydHNbMl0gfHwgJydcblx0ICAgICAgICB2YXIgcGF0aFBhcnRzID0gdGhpcy5zcGxpdFBhdGhUb0FycmF5KGtleSlcblxuXHQgICAgICAgIC8vIOino+aekOWNoOS9jeespueahOWPguaVsFxuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIC8vIDEuIOWwneivleS/neaMgeWPguaVsOeahOexu+Wei1xuXHQgICAgICAgICAgICAvKlxuXHQgICAgICAgICAgICAgICAgIzI0IFtXaW5kb3cgRmlyZWZveCAzMC4wIOW8leeUqCDljaDkvY3nrKYg5oqb6ZSZXShodHRwczovL2dpdGh1Yi5jb20vbnV5c29mdC9Nb2NrL2lzc3Vlcy8yNClcblx0ICAgICAgICAgICAgICAgIFtCWDkwNTY6IOWQhOa1j+iniOWZqOS4iyB3aW5kb3cuZXZhbCDmlrnms5XnmoTmiafooYzkuIrkuIvmloflrZjlnKjlt67lvIJdKGh0dHA6Ly93d3cudzNoZWxwLm9yZy96aC1jbi9jYXVzZXMvQlg5MDU2KVxuXHQgICAgICAgICAgICAgICAg5bqU6K+l5bGe5LqOIFdpbmRvdyBGaXJlZm94IDMwLjAg55qEIEJVR1xuXHQgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICAvKiBqc2hpbnQgLVcwNjEgKi9cblx0ICAgICAgICAgICAgcGFyYW1zID0gZXZhbCgnKGZ1bmN0aW9uKCl7IHJldHVybiBbXS5zcGxpY2UuY2FsbChhcmd1bWVudHMsIDAgKSB9KSgnICsgcGFyYW1zICsgJyknKVxuXHQgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cdCAgICAgICAgICAgIC8vIDIuIOWmguaenOWksei0pe+8jOWPquiDveino+aekOS4uuWtl+espuS4slxuXHQgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKVxuXHQgICAgICAgICAgICAvLyBpZiAoZXJyb3IgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikgcGFyYW1zID0gcGFydHNbMl0uc3BsaXQoLyxcXHMqLyk7XG5cdCAgICAgICAgICAgIC8vIGVsc2UgdGhyb3cgZXJyb3Jcblx0ICAgICAgICAgICAgcGFyYW1zID0gcGFydHNbMl0uc3BsaXQoLyxcXHMqLylcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyDljaDkvY3nrKbkvJjlhYjlvJXnlKjmlbDmja7mqKHmnb/kuK3nmoTlsZ7mgKdcblx0ICAgICAgICBpZiAob2JqICYmIChrZXkgaW4gb2JqKSkgcmV0dXJuIG9ialtrZXldXG5cblx0ICAgICAgICAvLyBAaW5kZXggQGtleVxuXHQgICAgICAgIC8vIGlmIChDb25zdGFudC5SRV9JTkRFWC50ZXN0KGtleSkpIHJldHVybiArb3B0aW9ucy5uYW1lXG5cdCAgICAgICAgLy8gaWYgKENvbnN0YW50LlJFX0tFWS50ZXN0KGtleSkpIHJldHVybiBvcHRpb25zLm5hbWVcblxuXHQgICAgICAgIC8vIOe7neWvuei3r+W+hCBvciDnm7jlr7not6/lvoRcblx0ICAgICAgICBpZiAoXG5cdCAgICAgICAgICAgIGtleS5jaGFyQXQoMCkgPT09ICcvJyB8fFxuXHQgICAgICAgICAgICBwYXRoUGFydHMubGVuZ3RoID4gMVxuXHQgICAgICAgICkgcmV0dXJuIHRoaXMuZ2V0VmFsdWVCeUtleVBhdGgoa2V5LCBvcHRpb25zKVxuXG5cdCAgICAgICAgLy8g6YCS5b2S5byV55So5pWw5o2u5qih5p2/5Lit55qE5bGe5oCnXG5cdCAgICAgICAgaWYgKHRlbXBsYXRlQ29udGV4dCAmJlxuXHQgICAgICAgICAgICAodHlwZW9mIHRlbXBsYXRlQ29udGV4dCA9PT0gJ29iamVjdCcpICYmXG5cdCAgICAgICAgICAgIChrZXkgaW4gdGVtcGxhdGVDb250ZXh0KSAmJlxuXHQgICAgICAgICAgICAocGxhY2Vob2xkZXIgIT09IHRlbXBsYXRlQ29udGV4dFtrZXldKSAvLyBmaXggIzE1IOmBv+WFjeiHquW3seS+nei1luiHquW3sVxuXHQgICAgICAgICkge1xuXHQgICAgICAgICAgICAvLyDlhYjorqHnrpfooqvlvJXnlKjnmoTlsZ7mgKflgLxcblx0ICAgICAgICAgICAgdGVtcGxhdGVDb250ZXh0W2tleV0gPSBIYW5kbGVyLmdlbih0ZW1wbGF0ZUNvbnRleHRba2V5XSwga2V5LCB7XG5cdCAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogb2JqLFxuXHQgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogdGVtcGxhdGVDb250ZXh0XG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZUNvbnRleHRba2V5XVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOWmguaenOacquaJvuWIsO+8jOWImeWOn+agt+i/lOWbnlxuXHQgICAgICAgIGlmICghKGtleSBpbiBSYW5kb20pICYmICEobGtleSBpbiBSYW5kb20pICYmICEob2tleSBpbiBSYW5kb20pKSByZXR1cm4gcGxhY2Vob2xkZXJcblxuXHQgICAgICAgIC8vIOmAkuW9kuino+aekOWPguaVsOS4reeahOWNoOS9jeesplxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIENvbnN0YW50LlJFX1BMQUNFSE9MREVSLmV4ZWMoJycpXG5cdCAgICAgICAgICAgIGlmIChDb25zdGFudC5SRV9QTEFDRUhPTERFUi50ZXN0KHBhcmFtc1tpXSkpIHtcblx0ICAgICAgICAgICAgICAgIHBhcmFtc1tpXSA9IEhhbmRsZXIucGxhY2Vob2xkZXIocGFyYW1zW2ldLCBvYmosIHRlbXBsYXRlQ29udGV4dCwgb3B0aW9ucylcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBoYW5kbGUgPSBSYW5kb21ba2V5XSB8fCBSYW5kb21bbGtleV0gfHwgUmFuZG9tW29rZXldXG5cdCAgICAgICAgc3dpdGNoIChVdGlsLnR5cGUoaGFuZGxlKSkge1xuXHQgICAgICAgICAgICBjYXNlICdhcnJheSc6XG5cdCAgICAgICAgICAgICAgICAvLyDoh6rliqjku47mlbDnu4TkuK3lj5bkuIDkuKrvvIzkvovlpoIgQGFyZWFzXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soaGFuZGxlKVxuXHQgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG5cdCAgICAgICAgICAgICAgICAvLyDmiafooYzljaDkvY3nrKbmlrnms5XvvIjlpKflpJrmlbDmg4XlhrXvvIlcblx0ICAgICAgICAgICAgICAgIGhhbmRsZS5vcHRpb25zID0gb3B0aW9uc1xuXHQgICAgICAgICAgICAgICAgdmFyIHJlID0gaGFuZGxlLmFwcGx5KFJhbmRvbSwgcGFyYW1zKVxuXHQgICAgICAgICAgICAgICAgaWYgKHJlID09PSB1bmRlZmluZWQpIHJlID0gJycgLy8g5Zug5Li65piv5Zyo5a2X56ym5Liy5Lit77yM5omA5Lul6buY6K6k5Li656m65a2X56ym5Liy44CCXG5cdCAgICAgICAgICAgICAgICBkZWxldGUgaGFuZGxlLm9wdGlvbnNcblx0ICAgICAgICAgICAgICAgIHJldHVybiByZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBnZXRWYWx1ZUJ5S2V5UGF0aDogZnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG5cdCAgICAgICAgdmFyIG9yaWdpbmFsS2V5ID0ga2V5XG5cdCAgICAgICAgdmFyIGtleVBhdGhQYXJ0cyA9IHRoaXMuc3BsaXRQYXRoVG9BcnJheShrZXkpXG5cdCAgICAgICAgdmFyIGFic29sdXRlUGF0aFBhcnRzID0gW11cblxuXHQgICAgICAgIC8vIOe7neWvuei3r+W+hFxuXHQgICAgICAgIGlmIChrZXkuY2hhckF0KDApID09PSAnLycpIHtcblx0ICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMgPSBbb3B0aW9ucy5jb250ZXh0LnBhdGhbMF1dLmNvbmNhdChcblx0ICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsaXplUGF0aChrZXlQYXRoUGFydHMpXG5cdCAgICAgICAgICAgIClcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvLyDnm7jlr7not6/lvoRcblx0ICAgICAgICAgICAgaWYgKGtleVBhdGhQYXJ0cy5sZW5ndGggPiAxKSB7XG5cdCAgICAgICAgICAgICAgICBhYnNvbHV0ZVBhdGhQYXJ0cyA9IG9wdGlvbnMuY29udGV4dC5wYXRoLnNsaWNlKDApXG5cdCAgICAgICAgICAgICAgICBhYnNvbHV0ZVBhdGhQYXJ0cy5wb3AoKVxuXHQgICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMgPSB0aGlzLm5vcm1hbGl6ZVBhdGgoXG5cdCAgICAgICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMuY29uY2F0KGtleVBhdGhQYXJ0cylcblx0ICAgICAgICAgICAgICAgIClcblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAga2V5ID0ga2V5UGF0aFBhcnRzW2tleVBhdGhQYXJ0cy5sZW5ndGggLSAxXVxuXHQgICAgICAgIHZhciBjdXJyZW50Q29udGV4dCA9IG9wdGlvbnMuY29udGV4dC5yb290XG5cdCAgICAgICAgdmFyIHRlbXBsYXRlQ3VycmVudENvbnRleHQgPSBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhYnNvbHV0ZVBhdGhQYXJ0cy5sZW5ndGggLSAxOyBpKyspIHtcblx0ICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFthYnNvbHV0ZVBhdGhQYXJ0c1tpXV1cblx0ICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dCA9IHRlbXBsYXRlQ3VycmVudENvbnRleHRbYWJzb2x1dGVQYXRoUGFydHNbaV1dXG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIOW8leeUqOeahOWAvOW3sue7j+iuoeeul+WlvVxuXHQgICAgICAgIGlmIChjdXJyZW50Q29udGV4dCAmJiAoa2V5IGluIGN1cnJlbnRDb250ZXh0KSkgcmV0dXJuIGN1cnJlbnRDb250ZXh0W2tleV1cblxuXHQgICAgICAgIC8vIOWwmuacquiuoeeul++8jOmAkuW9kuW8leeUqOaVsOaNruaooeadv+S4reeahOWxnuaAp1xuXHQgICAgICAgIGlmICh0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0ICYmXG5cdCAgICAgICAgICAgICh0eXBlb2YgdGVtcGxhdGVDdXJyZW50Q29udGV4dCA9PT0gJ29iamVjdCcpICYmXG5cdCAgICAgICAgICAgIChrZXkgaW4gdGVtcGxhdGVDdXJyZW50Q29udGV4dCkgJiZcblx0ICAgICAgICAgICAgKG9yaWdpbmFsS2V5ICE9PSB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0W2tleV0pIC8vIGZpeCAjMTUg6YG/5YWN6Ieq5bex5L6d6LWW6Ieq5bexXG5cdCAgICAgICAgKSB7XG5cdCAgICAgICAgICAgIC8vIOWFiOiuoeeul+iiq+W8leeUqOeahOWxnuaAp+WAvFxuXHQgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0W2tleV0gPSBIYW5kbGVyLmdlbih0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0W2tleV0sIGtleSwge1xuXHQgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IGN1cnJlbnRDb250ZXh0LFxuXHQgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogdGVtcGxhdGVDdXJyZW50Q29udGV4dFxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGVDdXJyZW50Q29udGV4dFtrZXldXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9raXNzeXRlYW0va2lzc3kvYmxvYi9tYXN0ZXIvc3JjL3BhdGgvc3JjL3BhdGguanNcblx0ICAgIG5vcm1hbGl6ZVBhdGg6IGZ1bmN0aW9uKHBhdGhQYXJ0cykge1xuXHQgICAgICAgIHZhciBuZXdQYXRoUGFydHMgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aFBhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHN3aXRjaCAocGF0aFBhcnRzW2ldKSB7XG5cdCAgICAgICAgICAgICAgICBjYXNlICcuLic6XG5cdCAgICAgICAgICAgICAgICAgICAgbmV3UGF0aFBhcnRzLnBvcCgpXG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgIGNhc2UgJy4nOlxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgICAgIG5ld1BhdGhQYXJ0cy5wdXNoKHBhdGhQYXJ0c1tpXSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gbmV3UGF0aFBhcnRzXG5cdCAgICB9LFxuXHQgICAgc3BsaXRQYXRoVG9BcnJheTogZnVuY3Rpb24ocGF0aCkge1xuXHQgICAgICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoL1xcLysvKTtcblx0ICAgICAgICBpZiAoIXBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKSBwYXJ0cyA9IHBhcnRzLnNsaWNlKDAsIC0xKVxuXHQgICAgICAgIGlmICghcGFydHNbMF0pIHBhcnRzID0gcGFydHMuc2xpY2UoMSlcblx0ICAgICAgICByZXR1cm4gcGFydHM7XG5cdCAgICB9XG5cdH0pXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBIYW5kbGVyXG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgQ29uc3RhbnRcblxuXHQgICAg5bi46YeP6ZuG5ZCI44CCXG5cdCAqL1xuXHQvKlxuXHQgICAgUkVfS0VZXG5cdCAgICAgICAgJ25hbWV8bWluLW1heCc6IHZhbHVlXG5cdCAgICAgICAgJ25hbWV8Y291bnQnOiB2YWx1ZVxuXHQgICAgICAgICduYW1lfG1pbi1tYXguZG1pbi1kbWF4JzogdmFsdWVcblx0ICAgICAgICAnbmFtZXxtaW4tbWF4LmRjb3VudCc6IHZhbHVlXG5cdCAgICAgICAgJ25hbWV8Y291bnQuZG1pbi1kbWF4JzogdmFsdWVcblx0ICAgICAgICAnbmFtZXxjb3VudC5kY291bnQnOiB2YWx1ZVxuXHQgICAgICAgICduYW1lfCtzdGVwJzogdmFsdWVcblxuXHQgICAgICAgIDEgbmFtZSwgMiBzdGVwLCAzIHJhbmdlIFsgbWluLCBtYXggXSwgNCBkcmFuZ2UgWyBkbWluLCBkbWF4IF1cblxuXHQgICAgUkVfUExBQ0VIT0xERVJcblx0ICAgICAgICBwbGFjZWhvbGRlcigqKVxuXG5cdCAgICBb5q2j5YiZ5p+l55yL5bel5YW3XShodHRwOi8vd3d3LnJlZ2V4cGVyLmNvbS8pXG5cblx0ICAgICMyNiDnlJ/miJDop4TliJkg5pSv5oyBIOi0n+aVsO+8jOS+i+WmgiBudW1iZXJ8LTEwMC0xMDBcblx0Ki9cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICBHVUlEOiAxLFxuXHQgICAgUkVfS0VZOiAvKC4rKVxcfCg/OlxcKyhcXGQrKXwoW1xcK1xcLV0/XFxkKy0/W1xcK1xcLV0/XFxkKik/KD86XFwuKFxcZCstP1xcZCopKT8pLyxcblx0ICAgIFJFX1JBTkdFOiAvKFtcXCtcXC1dP1xcZCspLT8oW1xcK1xcLV0/XFxkKyk/Lyxcblx0ICAgIFJFX1BMQUNFSE9MREVSOiAvXFxcXCpAKFteQCMlJigpXFw/XFxzXSspKD86XFwoKC4qPylcXCkpPy9nXG5cdCAgICAvLyAvXFxcXCpAKFteQCMlJigpXFw/XFxzXFwvXFwuXSspKD86XFwoKC4qPylcXCkpPy9nXG5cdCAgICAvLyBSRV9JTkRFWDogL15pbmRleCQvLFxuXHQgICAgLy8gUkVfS0VZOiAvXmtleSQvXG5cdH1cblxuLyoqKi8gfSxcbi8qIDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBVdGlsaXRpZXNcblx0Ki9cblx0dmFyIFV0aWwgPSB7fVxuXG5cdFV0aWwuZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHQgICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcblx0ICAgICAgICBpID0gMSxcblx0ICAgICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHQgICAgICAgIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY2xvbmVcblxuXHQgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuXHQgICAgICAgIHRhcmdldCA9IHRoaXNcblx0ICAgICAgICBpID0gMFxuXHQgICAgfVxuXG5cdCAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1tpXVxuXHQgICAgICAgIGlmICghb3B0aW9ucykgY29udGludWVcblxuXHQgICAgICAgIGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdCAgICAgICAgICAgIHNyYyA9IHRhcmdldFtuYW1lXVxuXHQgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1tuYW1lXVxuXG5cdCAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIGlmIChjb3B5ID09PSB1bmRlZmluZWQpIGNvbnRpbnVlXG5cblx0ICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjb3B5KSB8fCBVdGlsLmlzT2JqZWN0KGNvcHkpKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGNvcHkpKSBjbG9uZSA9IHNyYyAmJiBVdGlsLmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdXG5cdCAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc09iamVjdChjb3B5KSkgY2xvbmUgPSBzcmMgJiYgVXRpbC5pc09iamVjdChzcmMpID8gc3JjIDoge31cblxuXHQgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gVXRpbC5leHRlbmQoY2xvbmUsIGNvcHkpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBjb3B5XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiB0YXJnZXRcblx0fVxuXG5cdFV0aWwuZWFjaCA9IGZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuXHQgICAgdmFyIGksIGtleVxuXHQgICAgaWYgKHRoaXMudHlwZShvYmopID09PSAnbnVtYmVyJykge1xuXHQgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvYmo7IGkrKykge1xuXHQgICAgICAgICAgICBpdGVyYXRvcihpLCBpKVxuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcblx0ICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gZmFsc2UpIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcblx0ICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKSA9PT0gZmFsc2UpIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0VXRpbC50eXBlID0gZnVuY3Rpb24gdHlwZShvYmopIHtcblx0ICAgIHJldHVybiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSA/IFN0cmluZyhvYmopIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikubWF0Y2goL1xcW29iamVjdCAoXFx3KylcXF0vKVsxXS50b0xvd2VyQ2FzZSgpXG5cdH1cblxuXHRVdGlsLmVhY2goJ1N0cmluZyBPYmplY3QgQXJyYXkgUmVnRXhwIEZ1bmN0aW9uJy5zcGxpdCgnICcpLCBmdW5jdGlvbih2YWx1ZSkge1xuXHQgICAgVXRpbFsnaXMnICsgdmFsdWVdID0gZnVuY3Rpb24ob2JqKSB7XG5cdCAgICAgICAgcmV0dXJuIFV0aWwudHlwZShvYmopID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpXG5cdCAgICB9XG5cdH0pXG5cblx0VXRpbC5pc09iamVjdE9yQXJyYXkgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHQgICAgcmV0dXJuIFV0aWwuaXNPYmplY3QodmFsdWUpIHx8IFV0aWwuaXNBcnJheSh2YWx1ZSlcblx0fVxuXG5cdFV0aWwuaXNOdW1lcmljID0gZnVuY3Rpb24odmFsdWUpIHtcblx0ICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKVxuXHR9XG5cblx0VXRpbC5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG5cdCAgICB2YXIga2V5cyA9IFtdO1xuXHQgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuXHQgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkga2V5cy5wdXNoKGtleSlcblx0ICAgIH1cblx0ICAgIHJldHVybiBrZXlzO1xuXHR9XG5cdFV0aWwudmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XG5cdCAgICB2YXIgdmFsdWVzID0gW107XG5cdCAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdCAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB2YWx1ZXMucHVzaChvYmpba2V5XSlcblx0ICAgIH1cblx0ICAgIHJldHVybiB2YWx1ZXM7XG5cdH1cblxuXHQvKlxuXHQgICAgIyMjIE1vY2suaGVyZWRvYyhmbilcblxuXHQgICAgKiBNb2NrLmhlcmVkb2MoZm4pXG5cblx0ICAgIOS7peebtOinguOAgeWuieWFqOeahOaWueW8j+S5puWGme+8iOWkmuihjO+8iUhUTUwg5qih5p2/44CCXG5cblx0ICAgICoq5L2/55So56S65L6LKirlpoLkuIvmiYDnpLrvvJpcblxuXHQgICAgICAgIHZhciB0cGwgPSBNb2NrLmhlcmVkb2MoZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIC8qIVxuXHQgICAgICAgIHt7ZW1haWx9fXt7YWdlfX1cblx0ICAgICAgICA8IS0tIE1vY2sgeyBcblx0ICAgICAgICAgICAgZW1haWw6ICdARU1BSUwnLFxuXHQgICAgICAgICAgICBhZ2U6ICdASU5UKDEsMTAwKSdcblx0ICAgICAgICB9IC0tPlxuXHQgICAgICAgICAgICAqXFwvXG5cdCAgICAgICAgfSlcblx0ICAgIFxuXHQgICAgKirnm7jlhbPpmIXor7sqKlxuXHQgICAgKiBbQ3JlYXRpbmcgbXVsdGlsaW5lIHN0cmluZ3MgaW4gSmF2YVNjcmlwdF0oaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84MDUxMDcvY3JlYXRpbmctbXVsdGlsaW5lLXN0cmluZ3MtaW4tamF2YXNjcmlwdCnjgIFcblx0Ki9cblx0VXRpbC5oZXJlZG9jID0gZnVuY3Rpb24gaGVyZWRvYyhmbikge1xuXHQgICAgLy8gMS4g56e76Zmk6LW35aeL55qEIGZ1bmN0aW9uKCl7IC8qIVxuXHQgICAgLy8gMi4g56e76Zmk5pyr5bC+55qEICovIH1cblx0ICAgIC8vIDMuIOenu+mZpOi1t+Wni+WSjOacq+WwvueahOepuuagvFxuXHQgICAgcmV0dXJuIGZuLnRvU3RyaW5nKClcblx0ICAgICAgICAucmVwbGFjZSgvXlteXFwvXStcXC9cXCohPy8sICcnKVxuXHQgICAgICAgIC5yZXBsYWNlKC9cXCpcXC9bXlxcL10rJC8sICcnKVxuXHQgICAgICAgIC5yZXBsYWNlKC9eW1xcc1xceEEwXSsvLCAnJykucmVwbGFjZSgvW1xcc1xceEEwXSskLywgJycpIC8vIC50cmltKClcblx0fVxuXG5cdFV0aWwubm9vcCA9IGZ1bmN0aW9uKCkge31cblxuXHRtb2R1bGUuZXhwb3J0cyA9IFV0aWxcblxuLyoqKi8gfSxcbi8qIDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdFx0IyMgUGFyc2VyXG5cblx0XHTop6PmnpDmlbDmja7mqKHmnb/vvIjlsZ7mgKflkI3pg6jliIbvvInjgIJcblxuXHRcdCogUGFyc2VyLnBhcnNlKCBuYW1lIClcblx0XHRcdFxuXHRcdFx0YGBganNvblxuXHRcdFx0e1xuXHRcdFx0XHRwYXJhbWV0ZXJzOiBbIG5hbWUsIGluYywgcmFuZ2UsIGRlY2ltYWwgXSxcblx0XHRcdFx0cm5hZ2U6IFsgbWluICwgbWF4IF0sXG5cblx0XHRcdFx0bWluOiBtaW4sXG5cdFx0XHRcdG1heDogbWF4LFxuXHRcdFx0XHRjb3VudCA6IGNvdW50LFxuXG5cdFx0XHRcdGRlY2ltYWw6IGRlY2ltYWwsXG5cdFx0XHRcdGRtaW46IGRtaW4sXG5cdFx0XHRcdGRtYXg6IGRtYXgsXG5cdFx0XHRcdGRjb3VudDogZGNvdW50XG5cdFx0XHR9XG5cdFx0XHRgYGBcblx0ICovXG5cblx0dmFyIENvbnN0YW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKVxuXHR2YXIgUmFuZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuXG5cdC8qIGpzaGludCAtVzA0MSAqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHRwYXJzZTogZnVuY3Rpb24obmFtZSkge1xuXHRcdFx0bmFtZSA9IG5hbWUgPT0gdW5kZWZpbmVkID8gJycgOiAobmFtZSArICcnKVxuXG5cdFx0XHR2YXIgcGFyYW1ldGVycyA9IChuYW1lIHx8ICcnKS5tYXRjaChDb25zdGFudC5SRV9LRVkpXG5cblx0XHRcdHZhciByYW5nZSA9IHBhcmFtZXRlcnMgJiYgcGFyYW1ldGVyc1szXSAmJiBwYXJhbWV0ZXJzWzNdLm1hdGNoKENvbnN0YW50LlJFX1JBTkdFKVxuXHRcdFx0dmFyIG1pbiA9IHJhbmdlICYmIHJhbmdlWzFdICYmIHBhcnNlSW50KHJhbmdlWzFdLCAxMCkgLy8gfHwgMVxuXHRcdFx0dmFyIG1heCA9IHJhbmdlICYmIHJhbmdlWzJdICYmIHBhcnNlSW50KHJhbmdlWzJdLCAxMCkgLy8gfHwgMVxuXHRcdFx0XHQvLyByZXBlYXQgfHwgbWluLW1heCB8fCAxXG5cdFx0XHRcdC8vIHZhciBjb3VudCA9IHJhbmdlID8gIXJhbmdlWzJdICYmIHBhcnNlSW50KHJhbmdlWzFdLCAxMCkgfHwgUmFuZG9tLmludGVnZXIobWluLCBtYXgpIDogMVxuXHRcdFx0dmFyIGNvdW50ID0gcmFuZ2UgPyAhcmFuZ2VbMl0gPyBwYXJzZUludChyYW5nZVsxXSwgMTApIDogUmFuZG9tLmludGVnZXIobWluLCBtYXgpIDogdW5kZWZpbmVkXG5cblx0XHRcdHZhciBkZWNpbWFsID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzRdICYmIHBhcmFtZXRlcnNbNF0ubWF0Y2goQ29uc3RhbnQuUkVfUkFOR0UpXG5cdFx0XHR2YXIgZG1pbiA9IGRlY2ltYWwgJiYgZGVjaW1hbFsxXSAmJiBwYXJzZUludChkZWNpbWFsWzFdLCAxMCkgLy8gfHwgMCxcblx0XHRcdHZhciBkbWF4ID0gZGVjaW1hbCAmJiBkZWNpbWFsWzJdICYmIHBhcnNlSW50KGRlY2ltYWxbMl0sIDEwKSAvLyB8fCAwLFxuXHRcdFx0XHQvLyBpbnQgfHwgZG1pbi1kbWF4IHx8IDBcblx0XHRcdHZhciBkY291bnQgPSBkZWNpbWFsID8gIWRlY2ltYWxbMl0gJiYgcGFyc2VJbnQoZGVjaW1hbFsxXSwgMTApIHx8IFJhbmRvbS5pbnRlZ2VyKGRtaW4sIGRtYXgpIDogdW5kZWZpbmVkXG5cblx0XHRcdHZhciByZXN1bHQgPSB7XG5cdFx0XHRcdC8vIDEgbmFtZSwgMiBpbmMsIDMgcmFuZ2UsIDQgZGVjaW1hbFxuXHRcdFx0XHRwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLFxuXHRcdFx0XHQvLyAxIG1pbiwgMiBtYXhcblx0XHRcdFx0cmFuZ2U6IHJhbmdlLFxuXHRcdFx0XHRtaW46IG1pbixcblx0XHRcdFx0bWF4OiBtYXgsXG5cdFx0XHRcdC8vIG1pbi1tYXhcblx0XHRcdFx0Y291bnQ6IGNvdW50LFxuXHRcdFx0XHQvLyDmmK/lkKbmnIkgZGVjaW1hbFxuXHRcdFx0XHRkZWNpbWFsOiBkZWNpbWFsLFxuXHRcdFx0XHRkbWluOiBkbWluLFxuXHRcdFx0XHRkbWF4OiBkbWF4LFxuXHRcdFx0XHQvLyBkbWluLWRpbWF4XG5cdFx0XHRcdGRjb3VudDogZGNvdW50XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIHIgaW4gcmVzdWx0KSB7XG5cdFx0XHRcdGlmIChyZXN1bHRbcl0gIT0gdW5kZWZpbmVkKSByZXR1cm4gcmVzdWx0XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7fVxuXHRcdH1cblx0fVxuXG4vKioqLyB9LFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIE1vY2suUmFuZG9tXG5cdCAgICBcblx0ICAgIOW3peWFt+exu++8jOeUqOS6jueUn+aIkOWQhOenjemaj+acuuaVsOaNruOAglxuXHQqL1xuXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXG5cdHZhciBSYW5kb20gPSB7XG5cdCAgICBleHRlbmQ6IFV0aWwuZXh0ZW5kXG5cdH1cblxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oNikpXG5cdFJhbmRvbS5leHRlbmQoX193ZWJwYWNrX3JlcXVpcmVfXyg3KSlcblx0UmFuZG9tLmV4dGVuZChfX3dlYnBhY2tfcmVxdWlyZV9fKDgpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oMTApKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oMTMpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oMTUpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oMTYpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oMTcpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oMTQpKVxuXHRSYW5kb20uZXh0ZW5kKF9fd2VicGFja19yZXF1aXJlX18oMTkpKVxuXG5cdG1vZHVsZS5leHBvcnRzID0gUmFuZG9tXG5cbi8qKiovIH0sXG4vKiA2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgQmFzaWNzXG5cdCovXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE5biD5bCU5YC844CCXG5cdCAgICBib29sZWFuOiBmdW5jdGlvbihtaW4sIG1heCwgY3VyKSB7XG5cdCAgICAgICAgaWYgKGN1ciAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmICFpc05hTihtaW4pID8gcGFyc2VJbnQobWluLCAxMCkgOiAxXG5cdCAgICAgICAgICAgIG1heCA9IHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnICYmICFpc05hTihtYXgpID8gcGFyc2VJbnQobWF4LCAxMCkgOiAxXG5cdCAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMS4wIC8gKG1pbiArIG1heCkgKiBtaW4gPyAhY3VyIDogY3VyXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPj0gMC41XG5cdCAgICB9LFxuXHQgICAgYm9vbDogZnVuY3Rpb24obWluLCBtYXgsIGN1cikge1xuXHQgICAgICAgIHJldHVybiB0aGlzLmJvb2xlYW4obWluLCBtYXgsIGN1cilcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoToh6rnhLbmlbDvvIjlpKfkuo7nrYnkuo4gMCDnmoTmlbTmlbDvvInjgIJcblx0ICAgIG5hdHVyYWw6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgbWluID0gdHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgPyBwYXJzZUludChtaW4sIDEwKSA6IDBcblx0ICAgICAgICBtYXggPSB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJyA/IHBhcnNlSW50KG1heCwgMTApIDogOTAwNzE5OTI1NDc0MDk5MiAvLyAyXjUzXG5cdCAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuueahOaVtOaVsOOAglxuXHQgICAgaW50ZWdlcjogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICBtaW4gPSB0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyA/IHBhcnNlSW50KG1pbiwgMTApIDogLTkwMDcxOTkyNTQ3NDA5OTJcblx0ICAgICAgICBtYXggPSB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJyA/IHBhcnNlSW50KG1heCwgMTApIDogOTAwNzE5OTI1NDc0MDk5MiAvLyAyXjUzXG5cdCAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxuXHQgICAgfSxcblx0ICAgIGludDogZnVuY3Rpb24obWluLCBtYXgpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyKG1pbiwgbWF4KVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuueahOa1rueCueaVsOOAglxuXHQgICAgZmxvYXQ6IGZ1bmN0aW9uKG1pbiwgbWF4LCBkbWluLCBkbWF4KSB7XG5cdCAgICAgICAgZG1pbiA9IGRtaW4gPT09IHVuZGVmaW5lZCA/IDAgOiBkbWluXG5cdCAgICAgICAgZG1pbiA9IE1hdGgubWF4KE1hdGgubWluKGRtaW4sIDE3KSwgMClcblx0ICAgICAgICBkbWF4ID0gZG1heCA9PT0gdW5kZWZpbmVkID8gMTcgOiBkbWF4XG5cdCAgICAgICAgZG1heCA9IE1hdGgubWF4KE1hdGgubWluKGRtYXgsIDE3KSwgMClcblx0ICAgICAgICB2YXIgcmV0ID0gdGhpcy5pbnRlZ2VyKG1pbiwgbWF4KSArICcuJztcblx0ICAgICAgICBmb3IgKHZhciBpID0gMCwgZGNvdW50ID0gdGhpcy5uYXR1cmFsKGRtaW4sIGRtYXgpOyBpIDwgZGNvdW50OyBpKyspIHtcblx0ICAgICAgICAgICAgcmV0ICs9IChcblx0ICAgICAgICAgICAgICAgIC8vIOacgOWQjuS4gOS9jeS4jeiDveS4uiAw77ya5aaC5p6c5pyA5ZCO5LiA5L2N5Li6IDDvvIzkvJrooqsgSlMg5byV5pOO5b+955Wl5o6J44CCXG5cdCAgICAgICAgICAgICAgICAoaSA8IGRjb3VudCAtIDEpID8gdGhpcy5jaGFyYWN0ZXIoJ251bWJlcicpIDogdGhpcy5jaGFyYWN0ZXIoJzEyMzQ1Njc4OScpXG5cdCAgICAgICAgICAgIClcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocmV0LCAxMClcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrlrZfnrKbjgIJcblx0ICAgIGNoYXJhY3RlcjogZnVuY3Rpb24ocG9vbCkge1xuXHQgICAgICAgIHZhciBwb29scyA9IHtcblx0ICAgICAgICAgICAgbG93ZXI6ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicsXG5cdCAgICAgICAgICAgIHVwcGVyOiAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonLFxuXHQgICAgICAgICAgICBudW1iZXI6ICcwMTIzNDU2Nzg5Jyxcblx0ICAgICAgICAgICAgc3ltYm9sOiAnIUAjJCVeJiooKVtdJ1xuXHQgICAgICAgIH1cblx0ICAgICAgICBwb29scy5hbHBoYSA9IHBvb2xzLmxvd2VyICsgcG9vbHMudXBwZXJcblx0ICAgICAgICBwb29sc1sndW5kZWZpbmVkJ10gPSBwb29scy5sb3dlciArIHBvb2xzLnVwcGVyICsgcG9vbHMubnVtYmVyICsgcG9vbHMuc3ltYm9sXG5cblx0ICAgICAgICBwb29sID0gcG9vbHNbKCcnICsgcG9vbCkudG9Mb3dlckNhc2UoKV0gfHwgcG9vbFxuXHQgICAgICAgIHJldHVybiBwb29sLmNoYXJBdCh0aGlzLm5hdHVyYWwoMCwgcG9vbC5sZW5ndGggLSAxKSlcblx0ICAgIH0sXG5cdCAgICBjaGFyOiBmdW5jdGlvbihwb29sKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyKHBvb2wpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py65a2X56ym5Liy44CCXG5cdCAgICBzdHJpbmc6IGZ1bmN0aW9uKHBvb2wsIG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlblxuXHQgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHQgICAgICAgICAgICBjYXNlIDA6IC8vICgpXG5cdCAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLm5hdHVyYWwoMywgNylcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMTogLy8gKCBsZW5ndGggKVxuXHQgICAgICAgICAgICAgICAgbGVuID0gcG9vbFxuXHQgICAgICAgICAgICAgICAgcG9vbCA9IHVuZGVmaW5lZFxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAyOlxuXHQgICAgICAgICAgICAgICAgLy8gKCBwb29sLCBsZW5ndGggKVxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGVuID0gbWluXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vICggbWluLCBtYXggKVxuXHQgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubmF0dXJhbChwb29sLCBtaW4pXG5cdCAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHVuZGVmaW5lZFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5uYXR1cmFsKG1pbiwgbWF4KVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgdGV4dCA9ICcnXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICB0ZXh0ICs9IHRoaXMuY2hhcmFjdGVyKHBvb2wpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHRleHRcblx0ICAgIH0sXG5cdCAgICBzdHI6IGZ1bmN0aW9uKCAvKnBvb2wsIG1pbiwgbWF4Ki8gKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrmlbTlnovmlbDnu4TjgIJcblx0ICAgIHJhbmdlOiBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuXHQgICAgICAgIC8vIHJhbmdlKCBzdG9wIClcblx0ICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG5cdCAgICAgICAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuXHQgICAgICAgICAgICBzdGFydCA9IDA7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIHJhbmdlKCBzdGFydCwgc3RvcCApXG5cdCAgICAgICAgc3RlcCA9IGFyZ3VtZW50c1syXSB8fCAxO1xuXG5cdCAgICAgICAgc3RhcnQgPSArc3RhcnRcblx0ICAgICAgICBzdG9wID0gK3N0b3Bcblx0ICAgICAgICBzdGVwID0gK3N0ZXBcblxuXHQgICAgICAgIHZhciBsZW4gPSBNYXRoLm1heChNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSwgMCk7XG5cdCAgICAgICAgdmFyIGlkeCA9IDA7XG5cdCAgICAgICAgdmFyIHJhbmdlID0gbmV3IEFycmF5KGxlbik7XG5cblx0ICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG5cdCAgICAgICAgICAgIHJhbmdlW2lkeCsrXSA9IHN0YXJ0O1xuXHQgICAgICAgICAgICBzdGFydCArPSBzdGVwO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiByYW5nZTtcblx0ICAgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIERhdGVcblx0Ki9cblx0dmFyIHBhdHRlcm5MZXR0ZXJzID0ge1xuXHQgICAgeXl5eTogJ2dldEZ1bGxZZWFyJyxcblx0ICAgIHl5OiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgcmV0dXJuICgnJyArIGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoMilcblx0ICAgIH0sXG5cdCAgICB5OiAneXknLFxuXG5cdCAgICBNTTogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNb250aCgpICsgMVxuXHQgICAgICAgIHJldHVybiBtIDwgMTAgPyAnMCcgKyBtIDogbVxuXHQgICAgfSxcblx0ICAgIE06IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMVxuXHQgICAgfSxcblxuXHQgICAgZGQ6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICB2YXIgZCA9IGRhdGUuZ2V0RGF0ZSgpXG5cdCAgICAgICAgcmV0dXJuIGQgPCAxMCA/ICcwJyArIGQgOiBkXG5cdCAgICB9LFxuXHQgICAgZDogJ2dldERhdGUnLFxuXG5cdCAgICBISDogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpXG5cdCAgICAgICAgcmV0dXJuIGggPCAxMCA/ICcwJyArIGggOiBoXG5cdCAgICB9LFxuXHQgICAgSDogJ2dldEhvdXJzJyxcblx0ICAgIGhoOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKCkgJSAxMlxuXHQgICAgICAgIHJldHVybiBoIDwgMTAgPyAnMCcgKyBoIDogaFxuXHQgICAgfSxcblx0ICAgIGg6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpICUgMTJcblx0ICAgIH0sXG5cblx0ICAgIG1tOiBmdW5jdGlvbihkYXRlKSB7XG5cdCAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1pbnV0ZXMoKVxuXHQgICAgICAgIHJldHVybiBtIDwgMTAgPyAnMCcgKyBtIDogbVxuXHQgICAgfSxcblx0ICAgIG06ICdnZXRNaW51dGVzJyxcblxuXHQgICAgc3M6IGZ1bmN0aW9uKGRhdGUpIHtcblx0ICAgICAgICB2YXIgcyA9IGRhdGUuZ2V0U2Vjb25kcygpXG5cdCAgICAgICAgcmV0dXJuIHMgPCAxMCA/ICcwJyArIHMgOiBzXG5cdCAgICB9LFxuXHQgICAgczogJ2dldFNlY29uZHMnLFxuXG5cdCAgICBTUzogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHZhciBtcyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcblx0ICAgICAgICByZXR1cm4gbXMgPCAxMCAmJiAnMDAnICsgbXMgfHwgbXMgPCAxMDAgJiYgJzAnICsgbXMgfHwgbXNcblx0ICAgIH0sXG5cdCAgICBTOiAnZ2V0TWlsbGlzZWNvbmRzJyxcblxuXHQgICAgQTogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/ICdBTScgOiAnUE0nXG5cdCAgICB9LFxuXHQgICAgYTogZnVuY3Rpb24oZGF0ZSkge1xuXHQgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/ICdhbScgOiAncG0nXG5cdCAgICB9LFxuXHQgICAgVDogJ2dldFRpbWUnXG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAvLyDml6XmnJ/ljaDkvY3nrKbpm4blkIjjgIJcblx0ICAgIF9wYXR0ZXJuTGV0dGVyczogcGF0dGVybkxldHRlcnMsXG5cdCAgICAvLyDml6XmnJ/ljaDkvY3nrKbmraPliJnjgIJcblx0ICAgIF9yZm9ybWF0OiBuZXcgUmVnRXhwKChmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgcmUgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgaW4gcGF0dGVybkxldHRlcnMpIHJlLnB1c2goaSlcblx0ICAgICAgICByZXR1cm4gJygnICsgcmUuam9pbignfCcpICsgJyknXG5cdCAgICB9KSgpLCAnZycpLFxuXHQgICAgLy8g5qC85byP5YyW5pel5pyf44CCXG5cdCAgICBfZm9ybWF0RGF0ZTogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0KSB7XG5cdCAgICAgICAgcmV0dXJuIGZvcm1hdC5yZXBsYWNlKHRoaXMuX3Jmb3JtYXQsIGZ1bmN0aW9uIGNyZWF0TmV3U3ViU3RyaW5nKCQwLCBmbGFnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF0dGVybkxldHRlcnNbZmxhZ10gPT09ICdmdW5jdGlvbicgPyBwYXR0ZXJuTGV0dGVyc1tmbGFnXShkYXRlKSA6XG5cdCAgICAgICAgICAgICAgICBwYXR0ZXJuTGV0dGVyc1tmbGFnXSBpbiBwYXR0ZXJuTGV0dGVycyA/IGNyZWF0TmV3U3ViU3RyaW5nKCQwLCBwYXR0ZXJuTGV0dGVyc1tmbGFnXSkgOlxuXHQgICAgICAgICAgICAgICAgZGF0ZVtwYXR0ZXJuTGV0dGVyc1tmbGFnXV0oKVxuXHQgICAgICAgIH0pXG5cdCAgICB9LFxuXHQgICAgLy8g55Sf5oiQ5LiA5Liq6ZqP5py655qEIERhdGUg5a+56LGh44CCXG5cdCAgICBfcmFuZG9tRGF0ZTogZnVuY3Rpb24obWluLCBtYXgpIHsgLy8gbWluLCBtYXhcblx0ICAgICAgICBtaW4gPSBtaW4gPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKDApIDogbWluXG5cdCAgICAgICAgbWF4ID0gbWF4ID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgpIDogbWF4XG5cdCAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE1hdGgucmFuZG9tKCkgKiAobWF4LmdldFRpbWUoKSAtIG1pbi5nZXRUaW1lKCkpKVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuueahOaXpeacn+Wtl+espuS4suOAglxuXHQgICAgZGF0ZTogZnVuY3Rpb24oZm9ybWF0KSB7XG5cdCAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkJ1xuXHQgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXREYXRlKHRoaXMuX3JhbmRvbURhdGUoKSwgZm9ybWF0KVxuXHQgICAgfSxcblx0ICAgIC8vIOi/lOWbnuS4gOS4qumaj+acuueahOaXtumXtOWtl+espuS4suOAglxuXHQgICAgdGltZTogZnVuY3Rpb24oZm9ybWF0KSB7XG5cdCAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICdISDptbTpzcydcblx0ICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0RGF0ZSh0aGlzLl9yYW5kb21EYXRlKCksIGZvcm1hdClcblx0ICAgIH0sXG5cdCAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTml6XmnJ/lkozml7bpl7TlrZfnrKbkuLLjgIJcblx0ICAgIGRhdGV0aW1lOiBmdW5jdGlvbihmb3JtYXQpIHtcblx0ICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ3l5eXktTU0tZGQgSEg6bW06c3MnXG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fcmFuZG9tRGF0ZSgpLCBmb3JtYXQpXG5cdCAgICB9LFxuXHQgICAgLy8g6L+U5Zue5b2T5YmN55qE5pel5pyf5ZKM5pe26Ze05a2X56ym5Liy44CCXG5cdCAgICBub3c6IGZ1bmN0aW9uKHVuaXQsIGZvcm1hdCkge1xuXHQgICAgICAgIC8vIG5vdyh1bml0KSBub3coZm9ybWF0KVxuXHQgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdCAgICAgICAgICAgIC8vIG5vdyhmb3JtYXQpXG5cdCAgICAgICAgICAgIGlmICghL3llYXJ8bW9udGh8ZGF5fGhvdXJ8bWludXRlfHNlY29uZHx3ZWVrLy50ZXN0KHVuaXQpKSB7XG5cdCAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bml0XG5cdCAgICAgICAgICAgICAgICB1bml0ID0gJydcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB1bml0ID0gKHVuaXQgfHwgJycpLnRvTG93ZXJDYXNlKClcblx0ICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ3l5eXktTU0tZGQgSEg6bW06c3MnXG5cblx0ICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcblxuXHQgICAgICAgIC8qIGpzaGludCAtVzA4NiAqL1xuXHQgICAgICAgIC8vIOWPguiAg+iHqiBodHRwOi8vbW9tZW50anMuY24vZG9jcy8jL21hbmlwdWxhdGluZy9zdGFydC1vZi9cblx0ICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcblx0ICAgICAgICAgICAgY2FzZSAneWVhcic6XG5cdCAgICAgICAgICAgICAgICBkYXRlLnNldE1vbnRoKDApXG5cdCAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcblx0ICAgICAgICAgICAgICAgIGRhdGUuc2V0RGF0ZSgxKVxuXHQgICAgICAgICAgICBjYXNlICd3ZWVrJzpcblx0ICAgICAgICAgICAgY2FzZSAnZGF5Jzpcblx0ICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoMClcblx0ICAgICAgICAgICAgY2FzZSAnaG91cic6XG5cdCAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMoMClcblx0ICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcblx0ICAgICAgICAgICAgICAgIGRhdGUuc2V0U2Vjb25kcygwKVxuXHQgICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuXHQgICAgICAgICAgICAgICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMClcblx0ICAgICAgICB9XG5cdCAgICAgICAgc3dpdGNoICh1bml0KSB7XG5cdCAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuXHQgICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGF0ZS5nZXREYXkoKSlcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQpXG5cdCAgICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihtb2R1bGUpIHsvKiBnbG9iYWwgZG9jdW1lbnQgICovXG5cdC8qXG5cdCAgICAjIyBJbWFnZVxuXHQqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8vIOW4uOingeeahOW5v+WRiuWuvemrmFxuXHQgICAgX2FkU2l6ZTogW1xuXHQgICAgICAgICczMDB4MjUwJywgJzI1MHgyNTAnLCAnMjQweDQwMCcsICczMzZ4MjgwJywgJzE4MHgxNTAnLFxuXHQgICAgICAgICc3MjB4MzAwJywgJzQ2OHg2MCcsICcyMzR4NjAnLCAnODh4MzEnLCAnMTIweDkwJyxcblx0ICAgICAgICAnMTIweDYwJywgJzEyMHgyNDAnLCAnMTI1eDEyNScsICc3Mjh4OTAnLCAnMTYweDYwMCcsXG5cdCAgICAgICAgJzEyMHg2MDAnLCAnMzAweDYwMCdcblx0ICAgIF0sXG5cdCAgICAvLyDluLjop4HnmoTlsY/luZXlrr3pq5hcblx0ICAgIF9zY3JlZW5TaXplOiBbXG5cdCAgICAgICAgJzMyMHgyMDAnLCAnMzIweDI0MCcsICc2NDB4NDgwJywgJzgwMHg0ODAnLCAnODAweDQ4MCcsXG5cdCAgICAgICAgJzEwMjR4NjAwJywgJzEwMjR4NzY4JywgJzEyODB4ODAwJywgJzE0NDB4OTAwJywgJzE5MjB4MTIwMCcsXG5cdCAgICAgICAgJzI1NjB4MTYwMCdcblx0ICAgIF0sXG5cdCAgICAvLyDluLjop4HnmoTop4bpopHlrr3pq5hcblx0ICAgIF92aWRlb1NpemU6IFsnNzIweDQ4MCcsICc3Njh4NTc2JywgJzEyODB4NzIwJywgJzE5MjB4MTA4MCddLFxuXHQgICAgLypcblx0ICAgICAgICDnlJ/miJDkuIDkuKrpmo/mnLrnmoTlm77niYflnLDlnYDjgIJcblxuXHQgICAgICAgIOabv+S7o+WbvueJh+a6kFxuXHQgICAgICAgICAgICBodHRwOi8vZnBvaW1nLmNvbS9cblx0ICAgICAgICDlj4LogIPoh6ogXG5cdCAgICAgICAgICAgIGh0dHA6Ly9yZW5zYW5uaW5nLml0ZXllLmNvbS9ibG9nLzE5MzMzMTBcblx0ICAgICAgICAgICAgaHR0cDovL2NvZGUudHV0c3BsdXMuY29tL2FydGljbGVzL3RoZS10b3AtOC1wbGFjZWhvbGRlcnMtZm9yLXdlYi1kZXNpZ25lcnMtLW5ldC0xOTQ4NVxuXHQgICAgKi9cblx0ICAgIGltYWdlOiBmdW5jdGlvbihzaXplLCBiYWNrZ3JvdW5kLCBmb3JlZ3JvdW5kLCBmb3JtYXQsIHRleHQpIHtcblx0ICAgICAgICAvLyBSYW5kb20uaW1hZ2UoIHNpemUsIGJhY2tncm91bmQsIGZvcmVncm91bmQsIHRleHQgKVxuXHQgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG5cdCAgICAgICAgICAgIHRleHQgPSBmb3JtYXRcblx0ICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkXG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vIFJhbmRvbS5pbWFnZSggc2l6ZSwgYmFja2dyb3VuZCwgdGV4dCApXG5cdCAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcblx0ICAgICAgICAgICAgdGV4dCA9IGZvcmVncm91bmRcblx0ICAgICAgICAgICAgZm9yZWdyb3VuZCA9IHVuZGVmaW5lZFxuXHQgICAgICAgIH1cblx0ICAgICAgICAvLyBSYW5kb20uaW1hZ2UoKVxuXHQgICAgICAgIGlmICghc2l6ZSkgc2l6ZSA9IHRoaXMucGljayh0aGlzLl9hZFNpemUpXG5cblx0ICAgICAgICBpZiAoYmFja2dyb3VuZCAmJiB+YmFja2dyb3VuZC5pbmRleE9mKCcjJykpIGJhY2tncm91bmQgPSBiYWNrZ3JvdW5kLnNsaWNlKDEpXG5cdCAgICAgICAgaWYgKGZvcmVncm91bmQgJiYgfmZvcmVncm91bmQuaW5kZXhPZignIycpKSBmb3JlZ3JvdW5kID0gZm9yZWdyb3VuZC5zbGljZSgxKVxuXG5cdCAgICAgICAgLy8gaHR0cDovL2R1bW15aW1hZ2UuY29tLzYwMHg0MDAvY2MwMGNjLzQ3MDA0Ny5wbmcmdGV4dD1oZWxsb1xuXHQgICAgICAgIHJldHVybiAnaHR0cDovL2R1bW15aW1hZ2UuY29tLycgKyBzaXplICtcblx0ICAgICAgICAgICAgKGJhY2tncm91bmQgPyAnLycgKyBiYWNrZ3JvdW5kIDogJycpICtcblx0ICAgICAgICAgICAgKGZvcmVncm91bmQgPyAnLycgKyBmb3JlZ3JvdW5kIDogJycpICtcblx0ICAgICAgICAgICAgKGZvcm1hdCA/ICcuJyArIGZvcm1hdCA6ICcnKSArXG5cdCAgICAgICAgICAgICh0ZXh0ID8gJyZ0ZXh0PScgKyB0ZXh0IDogJycpXG5cdCAgICB9LFxuXHQgICAgaW1nOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5pbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdCAgICB9LFxuXG5cdCAgICAvKlxuXHQgICAgICAgIEJyYW5kQ29sb3JzXG5cdCAgICAgICAgaHR0cDovL2JyYW5kY29sb3JzLm5ldC9cblx0ICAgICAgICBBIGNvbGxlY3Rpb24gb2YgbWFqb3IgYnJhbmQgY29sb3IgY29kZXMgY3VyYXRlZCBieSBHYWxlbiBHaWRtYW4uXG5cdCAgICAgICAg5aSn54mM5YWs5Y+455qE6aKc6Imy6ZuG5ZCIXG5cblx0ICAgICAgICAvLyDojrflj5blk4HniYzlkozpopzoibJcblx0ICAgICAgICAkKCdoMicpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGl0ZW0pe1xuXHQgICAgICAgICAgICBpdGVtID0gJChpdGVtKVxuXHQgICAgICAgICAgICBjb25zb2xlLmxvZygnXFwnJyArIGl0ZW0udGV4dCgpICsgJ1xcJycsICc6JywgJ1xcJycgKyBpdGVtLm5leHQoKS50ZXh0KCkgKyAnXFwnJywgJywnKVxuXHQgICAgICAgIH0pXG5cdCAgICAqL1xuXHQgICAgX2JyYW5kQ29sb3JzOiB7XG5cdCAgICAgICAgJzRvcm1hdCc6ICcjZmIwYTJhJyxcblx0ICAgICAgICAnNTAwcHgnOiAnIzAyYWRlYScsXG5cdCAgICAgICAgJ0Fib3V0Lm1lIChibHVlKSc6ICcjMDA0MDVkJyxcblx0ICAgICAgICAnQWJvdXQubWUgKHllbGxvdyknOiAnI2ZmY2MzMycsXG5cdCAgICAgICAgJ0FkZHZvY2F0ZSc6ICcjZmY2MTM4Jyxcblx0ICAgICAgICAnQWRvYmUnOiAnI2ZmMDAwMCcsXG5cdCAgICAgICAgJ0FpbSc6ICcjZmNkMjBiJyxcblx0ICAgICAgICAnQW1hem9uJzogJyNlNDc5MTEnLFxuXHQgICAgICAgICdBbmRyb2lkJzogJyNhNGM2MzknLFxuXHQgICAgICAgICdBbmdpZVxcJ3MgTGlzdCc6ICcjN2ZiYjAwJyxcblx0ICAgICAgICAnQU9MJzogJyMwMDYwYTMnLFxuXHQgICAgICAgICdBdGxhc3NpYW4nOiAnIzAwMzM2NicsXG5cdCAgICAgICAgJ0JlaGFuY2UnOiAnIzA1M2VmZicsXG5cdCAgICAgICAgJ0JpZyBDYXJ0ZWwnOiAnIzk3YjUzOCcsXG5cdCAgICAgICAgJ2JpdGx5JzogJyNlZTYxMjMnLFxuXHQgICAgICAgICdCbG9nZ2VyJzogJyNmYzRmMDgnLFxuXHQgICAgICAgICdCb2VpbmcnOiAnIzAwMzlhNicsXG5cdCAgICAgICAgJ0Jvb2tpbmcuY29tJzogJyMwMDM1ODAnLFxuXHQgICAgICAgICdDYXJib25tYWRlJzogJyM2MTM4NTQnLFxuXHQgICAgICAgICdDaGVkZGFyJzogJyNmZjcyNDMnLFxuXHQgICAgICAgICdDb2RlIFNjaG9vbCc6ICcjM2Q0OTQ0Jyxcblx0ICAgICAgICAnRGVsaWNpb3VzJzogJyMyMDVjYzAnLFxuXHQgICAgICAgICdEZWxsJzogJyMzMjg3YzEnLFxuXHQgICAgICAgICdEZXNpZ25tb28nOiAnI2U1NGE0ZicsXG5cdCAgICAgICAgJ0RldmlhbnRhcnQnOiAnIzRlNjI1MicsXG5cdCAgICAgICAgJ0Rlc2lnbmVyIE5ld3MnOiAnIzJkNzJkYScsXG5cdCAgICAgICAgJ0Rldm91cic6ICcjZmQwMDAxJyxcblx0ICAgICAgICAnREVXQUxUJzogJyNmZWJkMTcnLFxuXHQgICAgICAgICdEaXNxdXMgKGJsdWUpJzogJyM1OWEzZmMnLFxuXHQgICAgICAgICdEaXNxdXMgKG9yYW5nZSknOiAnI2RiNzEzMicsXG5cdCAgICAgICAgJ0RyaWJiYmxlJzogJyNlYTRjODknLFxuXHQgICAgICAgICdEcm9wYm94JzogJyMzZDlhZTgnLFxuXHQgICAgICAgICdEcnVwYWwnOiAnIzBjNzZhYicsXG5cdCAgICAgICAgJ0R1bmtlZCc6ICcjMmEzMjNhJyxcblx0ICAgICAgICAnZUJheSc6ICcjODljNTA3Jyxcblx0ICAgICAgICAnRW1iZXInOiAnI2YwNWUxYicsXG5cdCAgICAgICAgJ0VuZ2FkZ2V0JzogJyMwMGJkZjYnLFxuXHQgICAgICAgICdFbnZhdG8nOiAnIzUyODAzNicsXG5cdCAgICAgICAgJ0V0c3knOiAnI2ViNmQyMCcsXG5cdCAgICAgICAgJ0V2ZXJub3RlJzogJyM1YmE1MjUnLFxuXHQgICAgICAgICdGYWIuY29tJzogJyNkZDAwMTcnLFxuXHQgICAgICAgICdGYWNlYm9vayc6ICcjM2I1OTk4Jyxcblx0ICAgICAgICAnRmlyZWZveCc6ICcjZTY2MDAwJyxcblx0ICAgICAgICAnRmxpY2tyIChibHVlKSc6ICcjMDA2M2RjJyxcblx0ICAgICAgICAnRmxpY2tyIChwaW5rKSc6ICcjZmYwMDg0Jyxcblx0ICAgICAgICAnRm9ycnN0JzogJyM1YjlhNjgnLFxuXHQgICAgICAgICdGb3Vyc3F1YXJlJzogJyMyNWEwY2EnLFxuXHQgICAgICAgICdHYXJtaW4nOiAnIzAwN2NjMycsXG5cdCAgICAgICAgJ0dldEdsdWUnOiAnIzJkNzVhMicsXG5cdCAgICAgICAgJ0dpbW1lYmFyJzogJyNmNzAwNzgnLFxuXHQgICAgICAgICdHaXRIdWInOiAnIzE3MTUxNScsXG5cdCAgICAgICAgJ0dvb2dsZSBCbHVlJzogJyMwMTQwY2EnLFxuXHQgICAgICAgICdHb29nbGUgR3JlZW4nOiAnIzE2YTYxZScsXG5cdCAgICAgICAgJ0dvb2dsZSBSZWQnOiAnI2RkMTgxMicsXG5cdCAgICAgICAgJ0dvb2dsZSBZZWxsb3cnOiAnI2ZjY2EwMycsXG5cdCAgICAgICAgJ0dvb2dsZSsnOiAnI2RkNGIzOScsXG5cdCAgICAgICAgJ0dyb292ZXNoYXJrJzogJyNmNzdmMDAnLFxuXHQgICAgICAgICdHcm91cG9uJzogJyM4MmI1NDgnLFxuXHQgICAgICAgICdIYWNrZXIgTmV3cyc6ICcjZmY2NjAwJyxcblx0ICAgICAgICAnSGVsbG9XYWxsZXQnOiAnIzAwODVjYScsXG5cdCAgICAgICAgJ0hlcm9rdSAobGlnaHQpJzogJyNjN2M1ZTYnLFxuXHQgICAgICAgICdIZXJva3UgKGRhcmspJzogJyM2NTY3YTUnLFxuXHQgICAgICAgICdIb290U3VpdGUnOiAnIzAwMzM2NicsXG5cdCAgICAgICAgJ0hvdXp6JzogJyM3M2JhMzcnLFxuXHQgICAgICAgICdIVE1MNSc6ICcjZWM2MjMxJyxcblx0ICAgICAgICAnSUtFQSc6ICcjZmZjYzMzJyxcblx0ICAgICAgICAnSU1EYic6ICcjZjNjZTEzJyxcblx0ICAgICAgICAnSW5zdGFncmFtJzogJyMzZjcyOWInLFxuXHQgICAgICAgICdJbnRlbCc6ICcjMDA3MWM1Jyxcblx0ICAgICAgICAnSW50dWl0JzogJyMzNjVlYmYnLFxuXHQgICAgICAgICdLaWNrc3RhcnRlcic6ICcjNzZjYzFlJyxcblx0ICAgICAgICAna2lwcHQnOiAnI2UwMzUwMCcsXG5cdCAgICAgICAgJ0tvZGVyeSc6ICcjMDBhZjgxJyxcblx0ICAgICAgICAnTGFzdEZNJzogJyNjMzAwMGQnLFxuXHQgICAgICAgICdMaW5rZWRJbic6ICcjMGU3NmE4Jyxcblx0ICAgICAgICAnTGl2ZXN0cmVhbSc6ICcjY2YwMDA1Jyxcblx0ICAgICAgICAnTHVtbyc6ICcjNTc2Mzk2Jyxcblx0ICAgICAgICAnTWl4cGFuZWwnOiAnI2EwODZkMycsXG5cdCAgICAgICAgJ01lZXR1cCc6ICcjZTUxOTM3Jyxcblx0ICAgICAgICAnTm9raWEnOiAnIzE4MzY5MycsXG5cdCAgICAgICAgJ05WSURJQSc6ICcjNzZiOTAwJyxcblx0ICAgICAgICAnT3BlcmEnOiAnI2NjMGYxNicsXG5cdCAgICAgICAgJ1BhdGgnOiAnI2U0MWYxMScsXG5cdCAgICAgICAgJ1BheVBhbCAoZGFyayknOiAnIzFlNDc3YScsXG5cdCAgICAgICAgJ1BheVBhbCAobGlnaHQpJzogJyMzYjdiYmYnLFxuXHQgICAgICAgICdQaW5ib2FyZCc6ICcjMDAwMGU2Jyxcblx0ICAgICAgICAnUGludGVyZXN0JzogJyNjODIzMmMnLFxuXHQgICAgICAgICdQbGF5U3RhdGlvbic6ICcjNjY1Y2JlJyxcblx0ICAgICAgICAnUG9ja2V0JzogJyNlZTQwNTYnLFxuXHQgICAgICAgICdQcmV6aSc6ICcjMzE4YmZmJyxcblx0ICAgICAgICAnUHVzaGEnOiAnIzBmNzFiNCcsXG5cdCAgICAgICAgJ1F1b3JhJzogJyNhODI0MDAnLFxuXHQgICAgICAgICdRVU9URS5mbSc6ICcjNjZjZWZmJyxcblx0ICAgICAgICAnUmRpbyc6ICcjMDA4ZmQ1Jyxcblx0ICAgICAgICAnUmVhZGFiaWxpdHknOiAnIzljMDAwMCcsXG5cdCAgICAgICAgJ1JlZCBIYXQnOiAnI2NjMDAwMCcsXG5cdCAgICAgICAgJ1Jlc291cmNlJzogJyM3ZWI0MDAnLFxuXHQgICAgICAgICdSb2NrcGFjayc6ICcjMGJhNmFiJyxcblx0ICAgICAgICAnUm9vbic6ICcjNjJiMGQ5Jyxcblx0ICAgICAgICAnUlNTJzogJyNlZTgwMmYnLFxuXHQgICAgICAgICdTYWxlc2ZvcmNlJzogJyMxNzk4YzEnLFxuXHQgICAgICAgICdTYW1zdW5nJzogJyMwYzRkYTInLFxuXHQgICAgICAgICdTaG9waWZ5JzogJyM5NmJmNDgnLFxuXHQgICAgICAgICdTa3lwZSc6ICcjMDBhZmYwJyxcblx0ICAgICAgICAnU25hZ2Fqb2InOiAnI2Y0N2EyMCcsXG5cdCAgICAgICAgJ1NvZnRvbmljJzogJyMwMDhhY2UnLFxuXHQgICAgICAgICdTb3VuZENsb3VkJzogJyNmZjc3MDAnLFxuXHQgICAgICAgICdTcGFjZSBCb3gnOiAnI2Y4Njk2MCcsXG5cdCAgICAgICAgJ1Nwb3RpZnknOiAnIzgxYjcxYScsXG5cdCAgICAgICAgJ1NwcmludCc6ICcjZmVlMTAwJyxcblx0ICAgICAgICAnU3F1YXJlc3BhY2UnOiAnIzEyMTIxMicsXG5cdCAgICAgICAgJ1N0YWNrT3ZlcmZsb3cnOiAnI2VmODIzNicsXG5cdCAgICAgICAgJ1N0YXBsZXMnOiAnI2NjMDAwMCcsXG5cdCAgICAgICAgJ1N0YXR1cyBDaGFydCc6ICcjZDc1ODRmJyxcblx0ICAgICAgICAnU3RyaXBlJzogJyMwMDhjZGQnLFxuXHQgICAgICAgICdTdHVkeUJsdWUnOiAnIzAwYWZlMScsXG5cdCAgICAgICAgJ1N0dW1ibGVVcG9uJzogJyNmNzQ0MjUnLFxuXHQgICAgICAgICdULU1vYmlsZSc6ICcjZWEwYThlJyxcblx0ICAgICAgICAnVGVjaG5vcmF0aSc6ICcjNDBhODAwJyxcblx0ICAgICAgICAnVGhlIE5leHQgV2ViJzogJyNlZjQ0MjMnLFxuXHQgICAgICAgICdUcmVlaG91c2UnOiAnIzVjYjg2OCcsXG5cdCAgICAgICAgJ1RydWxpYSc6ICcjNWVhYjFmJyxcblx0ICAgICAgICAnVHVtYmxyJzogJyMzNDUyNmYnLFxuXHQgICAgICAgICdUd2l0Y2gudHYnOiAnIzY0NDFhNScsXG5cdCAgICAgICAgJ1R3aXR0ZXInOiAnIzAwYWNlZScsXG5cdCAgICAgICAgJ1RZUE8zJzogJyNmZjg3MDAnLFxuXHQgICAgICAgICdVYnVudHUnOiAnI2RkNDgxNCcsXG5cdCAgICAgICAgJ1VzdHJlYW0nOiAnIzMzODhmZicsXG5cdCAgICAgICAgJ1Zlcml6b24nOiAnI2VmMWQxZCcsXG5cdCAgICAgICAgJ1ZpbWVvJzogJyM4NmM5ZWYnLFxuXHQgICAgICAgICdWaW5lJzogJyMwMGE0NzgnLFxuXHQgICAgICAgICdWaXJiJzogJyMwNmFmZDgnLFxuXHQgICAgICAgICdWaXJnaW4gTWVkaWEnOiAnI2NjMDAwMCcsXG5cdCAgICAgICAgJ1dvb2dhJzogJyM1YjAwOWMnLFxuXHQgICAgICAgICdXb3JkUHJlc3MgKGJsdWUpJzogJyMyMTc1OWInLFxuXHQgICAgICAgICdXb3JkUHJlc3MgKG9yYW5nZSknOiAnI2Q1NGUyMScsXG5cdCAgICAgICAgJ1dvcmRQcmVzcyAoZ3JleSknOiAnIzQ2NDY0NicsXG5cdCAgICAgICAgJ1d1bmRlcmxpc3QnOiAnIzJiODhkOScsXG5cdCAgICAgICAgJ1hCT1gnOiAnIzliYzg0OCcsXG5cdCAgICAgICAgJ1hJTkcnOiAnIzEyNjU2NycsXG5cdCAgICAgICAgJ1lhaG9vISc6ICcjNzIwZTllJyxcblx0ICAgICAgICAnWWFuZGV4JzogJyNmZmNjMDAnLFxuXHQgICAgICAgICdZZWxwJzogJyNjNDEyMDAnLFxuXHQgICAgICAgICdZb3VUdWJlJzogJyNjNDMwMmInLFxuXHQgICAgICAgICdaYWxvbmdvJzogJyM1NDk4ZGMnLFxuXHQgICAgICAgICdaZW5kZXNrJzogJyM3OGEzMDAnLFxuXHQgICAgICAgICdaZXJwbHknOiAnIzlkY2M3YScsXG5cdCAgICAgICAgJ1pvb3Rvb2wnOiAnIzVlOGIxZCdcblx0ICAgIH0sXG5cdCAgICBfYnJhbmROYW1lczogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIGJyYW5kcyA9IFtdO1xuXHQgICAgICAgIGZvciAodmFyIGIgaW4gdGhpcy5fYnJhbmRDb2xvcnMpIHtcblx0ICAgICAgICAgICAgYnJhbmRzLnB1c2goYilcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGJyYW5kc1xuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAg55Sf5oiQ5LiA5q616ZqP5py655qEIEJhc2U2NCDlm77niYfnvJbnoIHjgIJcblxuXHQgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pbXNreS9ob2xkZXJcblx0ICAgICAgICBIb2xkZXIgcmVuZGVycyBpbWFnZSBwbGFjZWhvbGRlcnMgZW50aXJlbHkgb24gdGhlIGNsaWVudCBzaWRlLlxuXG5cdCAgICAgICAgZGF0YUltYWdlSG9sZGVyOiBmdW5jdGlvbihzaXplKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAnaG9sZGVyLmpzLycgKyBzaXplXG5cdCAgICAgICAgfSxcblx0ICAgICovXG5cdCAgICBkYXRhSW1hZ2U6IGZ1bmN0aW9uKHNpemUsIHRleHQpIHtcblx0ICAgICAgICB2YXIgY2FudmFzXG5cdCAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvKlxuXHQgICAgICAgICAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvbm9kZS1jYW52YXNcblx0ICAgICAgICAgICAgICAgICAgICBucG0gaW5zdGFsbCBjYW52YXMgLS1zYXZlXG5cdCAgICAgICAgICAgICAgICDlronoo4Xpl67popjvvJpcblx0ICAgICAgICAgICAgICAgICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMjk1MzIwNi9ndWxwLWlzc3Vlcy13aXRoLWNhcmlvLWluc3RhbGwtY29tbWFuZC1ub3QtZm91bmQtd2hlbi10cnlpbmctdG8taW5zdGFsbGluZy1jYW52YVxuXHQgICAgICAgICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9ub2RlLWNhbnZhcy9pc3N1ZXMvNDE1XG5cdCAgICAgICAgICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL25vZGUtY2FudmFzL3dpa2kvX3BhZ2VzXG5cblx0ICAgICAgICAgICAgICAgIFBT77yabm9kZS1jYW52YXMg55qE5a6J6KOF6L+H56iL5a6e5Zyo5piv5aSq57mB55CQ5LqG77yM5omA5Lul5LiN5pS+5YWlIHBhY2thZ2UuanNvbiDnmoQgZGVwZW5kZW5jaWVz44CCXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICB2YXIgQ2FudmFzID0gbW9kdWxlLnJlcXVpcmUoJ2NhbnZhcycpXG5cdCAgICAgICAgICAgIGNhbnZhcyA9IG5ldyBDYW52YXMoKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBjdHggPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQgJiYgY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuXHQgICAgICAgIGlmICghY2FudmFzIHx8ICFjdHgpIHJldHVybiAnJ1xuXG5cdCAgICAgICAgaWYgKCFzaXplKSBzaXplID0gdGhpcy5waWNrKHRoaXMuX2FkU2l6ZSlcblx0ICAgICAgICB0ZXh0ID0gdGV4dCAhPT0gdW5kZWZpbmVkID8gdGV4dCA6IHNpemVcblxuXHQgICAgICAgIHNpemUgPSBzaXplLnNwbGl0KCd4JylcblxuXHQgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50KHNpemVbMF0sIDEwKSxcblx0ICAgICAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoc2l6ZVsxXSwgMTApLFxuXHQgICAgICAgICAgICBiYWNrZ3JvdW5kID0gdGhpcy5fYnJhbmRDb2xvcnNbdGhpcy5waWNrKHRoaXMuX2JyYW5kTmFtZXMoKSldLFxuXHQgICAgICAgICAgICBmb3JlZ3JvdW5kID0gJyNGRkYnLFxuXHQgICAgICAgICAgICB0ZXh0X2hlaWdodCA9IDE0LFxuXHQgICAgICAgICAgICBmb250ID0gJ3NhbnMtc2VyaWYnO1xuXG5cdCAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGhcblx0ICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG5cdCAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInXG5cdCAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnXG5cdCAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRcblx0ICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodClcblx0ICAgICAgICBjdHguZmlsbFN0eWxlID0gZm9yZWdyb3VuZFxuXHQgICAgICAgIGN0eC5mb250ID0gJ2JvbGQgJyArIHRleHRfaGVpZ2h0ICsgJ3B4ICcgKyBmb250XG5cdCAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsICh3aWR0aCAvIDIpLCAoaGVpZ2h0IC8gMiksIHdpZHRoKVxuXHQgICAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuXHQgICAgfVxuXHR9XG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpKG1vZHVsZSkpKVxuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRcdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBtb2R1bGU7XHJcblx0fVxyXG5cblxuLyoqKi8gfSxcbi8qIDEwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgQ29sb3JcblxuXHQgICAgaHR0cDovL2xsbGxsbC5saS9yYW5kb21Db2xvci9cblx0ICAgICAgICBBIGNvbG9yIGdlbmVyYXRvciBmb3IgSmF2YVNjcmlwdC5cblx0ICAgICAgICByYW5kb21Db2xvciBnZW5lcmF0ZXMgYXR0cmFjdGl2ZSBjb2xvcnMgYnkgZGVmYXVsdC4gTW9yZSBzcGVjaWZpY2FsbHksIHJhbmRvbUNvbG9yIHByb2R1Y2VzIGJyaWdodCBjb2xvcnMgd2l0aCBhIHJlYXNvbmFibHkgaGlnaCBzYXR1cmF0aW9uLiBUaGlzIG1ha2VzIHJhbmRvbUNvbG9yIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIGRhdGEgdmlzdWFsaXphdGlvbnMgYW5kIGdlbmVyYXRpdmUgYXJ0LlxuXG5cdCAgICBodHRwOi8vcmFuZG9tY29sb3VyLmNvbS9cblx0ICAgICAgICB2YXIgYmdfY29sb3VyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTUpLnRvU3RyaW5nKDE2KTtcblx0ICAgICAgICBiZ19jb2xvdXIgPSBcIiNcIiArIChcIjAwMDAwMFwiICsgYmdfY29sb3VyKS5zbGljZSgtNik7XG5cdCAgICAgICAgZG9jdW1lbnQuYmdDb2xvciA9IGJnX2NvbG91cjtcblx0ICAgIFxuXHQgICAgaHR0cDovL21hcnRpbi5hbmtlcmwuY29tLzIwMDkvMTIvMDkvaG93LXRvLWNyZWF0ZS1yYW5kb20tY29sb3JzLXByb2dyYW1tYXRpY2FsbHkvXG5cdCAgICAgICAgQ3JlYXRpbmcgcmFuZG9tIGNvbG9ycyBpcyBhY3R1YWxseSBtb3JlIGRpZmZpY3VsdCB0aGFuIGl0IHNlZW1zLiBUaGUgcmFuZG9tbmVzcyBpdHNlbGYgaXMgZWFzeSwgYnV0IGFlc3RoZXRpY2FsbHkgcGxlYXNpbmcgcmFuZG9tbmVzcyBpcyBtb3JlIGRpZmZpY3VsdC5cblx0ICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vZGV2b25nb3ZldHQvY29sb3ItZ2VuZXJhdG9yXG5cblx0ICAgIGh0dHA6Ly93d3cucGF1bGlyaXNoLmNvbS8yMDA5L3JhbmRvbS1oZXgtY29sb3ItY29kZS1zbmlwcGV0cy9cblx0ICAgICAgICBSYW5kb20gSGV4IENvbG9yIENvZGUgR2VuZXJhdG9yIGluIEphdmFTY3JpcHRcblxuXHQgICAgaHR0cDovL2NoYW5jZWpzLmNvbS8jY29sb3Jcblx0ICAgICAgICBjaGFuY2UuY29sb3IoKVxuXHQgICAgICAgIC8vID0+ICcjNzljMTU3J1xuXHQgICAgICAgIGNoYW5jZS5jb2xvcih7Zm9ybWF0OiAnaGV4J30pXG5cdCAgICAgICAgLy8gPT4gJyNkNjcxMTgnXG5cdCAgICAgICAgY2hhbmNlLmNvbG9yKHtmb3JtYXQ6ICdzaG9ydGhleCd9KVxuXHQgICAgICAgIC8vID0+ICcjNjBmJ1xuXHQgICAgICAgIGNoYW5jZS5jb2xvcih7Zm9ybWF0OiAncmdiJ30pXG5cdCAgICAgICAgLy8gPT4gJ3JnYigxMTAsNTIsMTY0KSdcblxuXHQgICAgaHR0cDovL3Rvb2wuYzdza3kuY29tL3dlYmNvbG9yXG5cdCAgICAgICAg572R6aG16K6+6K6h5bi455So6Imy5b2p5pCt6YWN6KGoXG5cdCAgICBcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9PbmUtY29tL29uZS1jb2xvclxuXHQgICAgICAgIEFuIE9PLWJhc2VkIEphdmFTY3JpcHQgY29sb3IgcGFyc2VyL2NvbXB1dGF0aW9uIHRvb2xraXQgd2l0aCBzdXBwb3J0IGZvciBSR0IsIEhTViwgSFNMLCBDTVlLLCBhbmQgYWxwaGEgY2hhbm5lbHMuXG5cdCAgICAgICAgQVBJIOW+iOi1nlxuXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vaGFydGh1ci9jb2xvclxuXHQgICAgICAgIEphdmFTY3JpcHQgY29sb3IgY29udmVyc2lvbiBhbmQgbWFuaXB1bGF0aW9uIGxpYnJhcnlcblxuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2xlYXZlcm91L2Nzcy1jb2xvcnNcblx0ICAgICAgICBTaGFyZSAmIGNvbnZlcnQgQ1NTIGNvbG9yc1xuXHQgICAgaHR0cDovL2xlYXZlcm91LmdpdGh1Yi5pby9jc3MtY29sb3JzLyNzbGF0ZWdyYXlcblx0ICAgICAgICBUeXBlIGEgQ1NTIGNvbG9yIGtleXdvcmQsICNoZXgsIGhzbCgpLCByZ2JhKCksIHdoYXRldmVyOlxuXG5cdCAgICDoibLosIMgaHVlXG5cdCAgICAgICAgaHR0cDovL2JhaWtlLmJhaWR1LmNvbS92aWV3LzIzMzY4Lmh0bVxuXHQgICAgICAgIOiJsuiwg+aMh+eahOaYr+S4gOW5heeUu+S4reeUu+mdouiJsuW9qeeahOaAu+S9k+WAvuWQke+8jOaYr+Wkp+eahOiJsuW9qeaViOaenOOAglxuXHQgICAg6aWx5ZKM5bqmIHNhdHVyYXRpb25cblx0ICAgICAgICBodHRwOi8vYmFpa2UuYmFpZHUuY29tL3ZpZXcvMTg5NjQ0Lmh0bVxuXHQgICAgICAgIOmlseWSjOW6puaYr+aMh+iJsuW9qeeahOmynOiJs+eoi+W6pu+8jOS5n+ensOiJsuW9qeeahOe6r+W6puOAgumlseWSjOW6puWPluWGs+S6juivpeiJsuS4reWQq+iJsuaIkOWIhuWSjOa2iOiJsuaIkOWIhu+8iOeBsOiJsu+8ieeahOavlOS+i+OAguWQq+iJsuaIkOWIhui2iuWkp++8jOmlseWSjOW6pui2iuWkp++8m+a2iOiJsuaIkOWIhui2iuWkp++8jOmlseWSjOW6pui2iuWwj+OAglxuXHQgICAg5Lqu5bqmIGJyaWdodG5lc3Ncblx0ICAgICAgICBodHRwOi8vYmFpa2UuYmFpZHUuY29tL3ZpZXcvMzQ3NzMuaHRtXG5cdCAgICAgICAg5Lqu5bqm5piv5oyH5Y+R5YWJ5L2T77yI5Y+N5YWJ5L2T77yJ6KGo6Z2i5Y+R5YWJ77yI5Y+N5YWJ77yJ5by65byx55qE54mp55CG6YeP44CCXG5cdCAgICDnhafluqYgbHVtaW5vc2l0eVxuXHQgICAgICAgIOeJqeS9k+iiq+eFp+S6rueahOeoi+W6pizph4fnlKjljZXkvY3pnaLnp6/miYDmjqXlj5fnmoTlhYnpgJrph4/mnaXooajnpLos6KGo56S65Y2V5L2N5Li65YuSW+WFi+aWr10oTHV4LGx4KSAs5Y2zIDFtIC8gbTIg44CCXG5cblx0ICAgIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTQ4NDUwNi9yYW5kb20tY29sb3ItZ2VuZXJhdG9yLWluLWphdmFzY3JpcHRcblx0ICAgICAgICB2YXIgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJy5zcGxpdCgnJylcblx0ICAgICAgICB2YXIgY29sb3IgPSAnIydcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xuXHQgICAgICAgICAgICBjb2xvciArPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KV1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGNvbG9yXG5cdCAgICBcblx0ICAgICAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrml6DohJHnmoTpopzoibLvvIzmoLzlvI/kuLogJyNSUkdHQkIn44CCXG5cdCAgICAgICAgLy8gX2JyYWlubGVzc0NvbG9yKClcblx0ICAgICAgICB2YXIgY29sb3IgPSBNYXRoLmZsb29yKFxuXHQgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcblx0ICAgICAgICAgICAgKDE2ICogMTYgKiAxNiAqIDE2ICogMTYgKiAxNiAtIDEpXG5cdCAgICAgICAgKS50b1N0cmluZygxNilcblx0ICAgICAgICBjb2xvciA9IFwiI1wiICsgKFwiMDAwMDAwXCIgKyBjb2xvcikuc2xpY2UoLTYpXG5cdCAgICAgICAgcmV0dXJuIGNvbG9yLnRvVXBwZXJDYXNlKClcblx0Ki9cblxuXHR2YXIgQ29udmVydCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpXG5cdHZhciBESUNUID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quacieWQuOW8leWKm+eahOminOiJsu+8jOagvOW8j+S4uiAnI1JSR0dCQifjgIJcblx0ICAgIGNvbG9yOiBmdW5jdGlvbihuYW1lKSB7XG5cdCAgICAgICAgaWYgKG5hbWUgfHwgRElDVFtuYW1lXSkgcmV0dXJuIERJQ1RbbmFtZV0ubmljZXJcblx0ICAgICAgICByZXR1cm4gdGhpcy5oZXgoKVxuXHQgICAgfSxcblx0ICAgIC8vICNEQUMwREVcblx0ICAgIGhleDogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIGhzdiA9IHRoaXMuX2dvbGRlblJhdGlvQ29sb3IoKVxuXHQgICAgICAgIHZhciByZ2IgPSBDb252ZXJ0LmhzdjJyZ2IoaHN2KVxuXHQgICAgICAgIHZhciBoZXggPSBDb252ZXJ0LnJnYjJoZXgocmdiWzBdLCByZ2JbMV0sIHJnYlsyXSlcblx0ICAgICAgICByZXR1cm4gaGV4XG5cdCAgICB9LFxuXHQgICAgLy8gcmdiKDEyOCwyNTUsMjU1KVxuXHQgICAgcmdiOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG5cdCAgICAgICAgdmFyIHJnYiA9IENvbnZlcnQuaHN2MnJnYihoc3YpXG5cdCAgICAgICAgcmV0dXJuICdyZ2IoJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KHJnYlswXSwgMTApICsgJywgJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KHJnYlsxXSwgMTApICsgJywgJyArXG5cdCAgICAgICAgICAgIHBhcnNlSW50KHJnYlsyXSwgMTApICsgJyknXG5cdCAgICB9LFxuXHQgICAgLy8gcmdiYSgxMjgsMjU1LDI1NSwwLjMpXG5cdCAgICByZ2JhOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICB2YXIgaHN2ID0gdGhpcy5fZ29sZGVuUmF0aW9Db2xvcigpXG5cdCAgICAgICAgdmFyIHJnYiA9IENvbnZlcnQuaHN2MnJnYihoc3YpXG5cdCAgICAgICAgcmV0dXJuICdyZ2JhKCcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChyZ2JbMF0sIDEwKSArICcsICcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChyZ2JbMV0sIDEwKSArICcsICcgK1xuXHQgICAgICAgICAgICBwYXJzZUludChyZ2JbMl0sIDEwKSArICcsICcgK1xuXHQgICAgICAgICAgICBNYXRoLnJhbmRvbSgpLnRvRml4ZWQoMikgKyAnKSdcblx0ICAgIH0sXG5cdCAgICAvLyBoc2woMzAwLDgwJSw5MCUpXG5cdCAgICBoc2w6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciBoc3YgPSB0aGlzLl9nb2xkZW5SYXRpb0NvbG9yKClcblx0ICAgICAgICB2YXIgaHNsID0gQ29udmVydC5oc3YyaHNsKGhzdilcblx0ICAgICAgICByZXR1cm4gJ2hzbCgnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQoaHNsWzBdLCAxMCkgKyAnLCAnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQoaHNsWzFdLCAxMCkgKyAnLCAnICtcblx0ICAgICAgICAgICAgcGFyc2VJbnQoaHNsWzJdLCAxMCkgKyAnKSdcblx0ICAgIH0sXG5cdCAgICAvLyBodHRwOi8vbWFydGluLmFua2VybC5jb20vMjAwOS8xMi8wOS9ob3ctdG8tY3JlYXRlLXJhbmRvbS1jb2xvcnMtcHJvZ3JhbW1hdGljYWxseS9cblx0ICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZvbmdvdmV0dC9jb2xvci1nZW5lcmF0b3IvYmxvYi9tYXN0ZXIvaW5kZXguanNcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quacieWQuOW8leWKm+eahOminOiJsuOAglxuXHQgICAgX2dvbGRlblJhdGlvQ29sb3I6IGZ1bmN0aW9uKHNhdHVyYXRpb24sIHZhbHVlKSB7XG5cdCAgICAgICAgdGhpcy5fZ29sZGVuUmF0aW8gPSAwLjYxODAzMzk4ODc0OTg5NVxuXHQgICAgICAgIHRoaXMuX2h1ZSA9IHRoaXMuX2h1ZSB8fCBNYXRoLnJhbmRvbSgpXG5cdCAgICAgICAgdGhpcy5faHVlICs9IHRoaXMuX2dvbGRlblJhdGlvXG5cdCAgICAgICAgdGhpcy5faHVlICU9IDFcblxuXHQgICAgICAgIGlmICh0eXBlb2Ygc2F0dXJhdGlvbiAhPT0gXCJudW1iZXJcIikgc2F0dXJhdGlvbiA9IDAuNTtcblx0ICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB2YWx1ZSA9IDAuOTU7XG5cblx0ICAgICAgICByZXR1cm4gW1xuXHQgICAgICAgICAgICB0aGlzLl9odWUgKiAzNjAsXG5cdCAgICAgICAgICAgIHNhdHVyYXRpb24gKiAxMDAsXG5cdCAgICAgICAgICAgIHZhbHVlICogMTAwXG5cdCAgICAgICAgXVxuXHQgICAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIENvbG9yIENvbnZlcnRcblxuXHQgICAgaHR0cDovL2Jsb2cuY3Nkbi5uZXQvaWRmYXlhL2FydGljbGUvZGV0YWlscy82NzcwNDE0XG5cdCAgICAgICAg6aKc6Imy56m66Ze0UkdC5LiOSFNWKEhTTCnnmoTovazmjaJcblx0Ki9cblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2hhcnRodXIvY29sb3ItY29udmVydC9ibG9iL21hc3Rlci9jb252ZXJzaW9ucy5qc1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0XHRyZ2IyaHNsOiBmdW5jdGlvbiByZ2IyaHNsKHJnYikge1xuXHRcdFx0dmFyIHIgPSByZ2JbMF0gLyAyNTUsXG5cdFx0XHRcdGcgPSByZ2JbMV0gLyAyNTUsXG5cdFx0XHRcdGIgPSByZ2JbMl0gLyAyNTUsXG5cdFx0XHRcdG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuXHRcdFx0XHRtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcblx0XHRcdFx0ZGVsdGEgPSBtYXggLSBtaW4sXG5cdFx0XHRcdGgsIHMsIGw7XG5cblx0XHRcdGlmIChtYXggPT0gbWluKVxuXHRcdFx0XHRoID0gMDtcblx0XHRcdGVsc2UgaWYgKHIgPT0gbWF4KVxuXHRcdFx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHRcdFx0ZWxzZSBpZiAoZyA9PSBtYXgpXG5cdFx0XHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHRcdFx0ZWxzZSBpZiAoYiA9PSBtYXgpXG5cdFx0XHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXG5cdFx0XHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdFx0XHRpZiAoaCA8IDApXG5cdFx0XHRcdGggKz0gMzYwO1xuXG5cdFx0XHRsID0gKG1pbiArIG1heCkgLyAyO1xuXG5cdFx0XHRpZiAobWF4ID09IG1pbilcblx0XHRcdFx0cyA9IDA7XG5cdFx0XHRlbHNlIGlmIChsIDw9IDAuNSlcblx0XHRcdFx0cyA9IGRlbHRhIC8gKG1heCArIG1pbik7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblxuXHRcdFx0cmV0dXJuIFtoLCBzICogMTAwLCBsICogMTAwXTtcblx0XHR9LFxuXHRcdHJnYjJoc3Y6IGZ1bmN0aW9uIHJnYjJoc3YocmdiKSB7XG5cdFx0XHR2YXIgciA9IHJnYlswXSxcblx0XHRcdFx0ZyA9IHJnYlsxXSxcblx0XHRcdFx0YiA9IHJnYlsyXSxcblx0XHRcdFx0bWluID0gTWF0aC5taW4ociwgZywgYiksXG5cdFx0XHRcdG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuXHRcdFx0XHRkZWx0YSA9IG1heCAtIG1pbixcblx0XHRcdFx0aCwgcywgdjtcblxuXHRcdFx0aWYgKG1heCA9PT0gMClcblx0XHRcdFx0cyA9IDA7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHMgPSAoZGVsdGEgLyBtYXggKiAxMDAwKSAvIDEwO1xuXG5cdFx0XHRpZiAobWF4ID09IG1pbilcblx0XHRcdFx0aCA9IDA7XG5cdFx0XHRlbHNlIGlmIChyID09IG1heClcblx0XHRcdFx0aCA9IChnIC0gYikgLyBkZWx0YTtcblx0XHRcdGVsc2UgaWYgKGcgPT0gbWF4KVxuXHRcdFx0XHRoID0gMiArIChiIC0gcikgLyBkZWx0YTtcblx0XHRcdGVsc2UgaWYgKGIgPT0gbWF4KVxuXHRcdFx0XHRoID0gNCArIChyIC0gZykgLyBkZWx0YTtcblxuXHRcdFx0aCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuXHRcdFx0aWYgKGggPCAwKVxuXHRcdFx0XHRoICs9IDM2MDtcblxuXHRcdFx0diA9ICgobWF4IC8gMjU1KSAqIDEwMDApIC8gMTA7XG5cblx0XHRcdHJldHVybiBbaCwgcywgdl07XG5cdFx0fSxcblx0XHRoc2wycmdiOiBmdW5jdGlvbiBoc2wycmdiKGhzbCkge1xuXHRcdFx0dmFyIGggPSBoc2xbMF0gLyAzNjAsXG5cdFx0XHRcdHMgPSBoc2xbMV0gLyAxMDAsXG5cdFx0XHRcdGwgPSBoc2xbMl0gLyAxMDAsXG5cdFx0XHRcdHQxLCB0MiwgdDMsIHJnYiwgdmFsO1xuXG5cdFx0XHRpZiAocyA9PT0gMCkge1xuXHRcdFx0XHR2YWwgPSBsICogMjU1O1xuXHRcdFx0XHRyZXR1cm4gW3ZhbCwgdmFsLCB2YWxdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobCA8IDAuNSlcblx0XHRcdFx0dDIgPSBsICogKDEgKyBzKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dDIgPSBsICsgcyAtIGwgKiBzO1xuXHRcdFx0dDEgPSAyICogbCAtIHQyO1xuXG5cdFx0XHRyZ2IgPSBbMCwgMCwgMF07XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdFx0XHR0MyA9IGggKyAxIC8gMyAqIC0oaSAtIDEpO1xuXHRcdFx0XHRpZiAodDMgPCAwKSB0MysrO1xuXHRcdFx0XHRpZiAodDMgPiAxKSB0My0tO1xuXG5cdFx0XHRcdGlmICg2ICogdDMgPCAxKVxuXHRcdFx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzO1xuXHRcdFx0XHRlbHNlIGlmICgyICogdDMgPCAxKVxuXHRcdFx0XHRcdHZhbCA9IHQyO1xuXHRcdFx0XHRlbHNlIGlmICgzICogdDMgPCAyKVxuXHRcdFx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHZhbCA9IHQxO1xuXG5cdFx0XHRcdHJnYltpXSA9IHZhbCAqIDI1NTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJnYjtcblx0XHR9LFxuXHRcdGhzbDJoc3Y6IGZ1bmN0aW9uIGhzbDJoc3YoaHNsKSB7XG5cdFx0XHR2YXIgaCA9IGhzbFswXSxcblx0XHRcdFx0cyA9IGhzbFsxXSAvIDEwMCxcblx0XHRcdFx0bCA9IGhzbFsyXSAvIDEwMCxcblx0XHRcdFx0c3YsIHY7XG5cdFx0XHRsICo9IDI7XG5cdFx0XHRzICo9IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRcdFx0diA9IChsICsgcykgLyAyO1xuXHRcdFx0c3YgPSAoMiAqIHMpIC8gKGwgKyBzKTtcblx0XHRcdHJldHVybiBbaCwgc3YgKiAxMDAsIHYgKiAxMDBdO1xuXHRcdH0sXG5cdFx0aHN2MnJnYjogZnVuY3Rpb24gaHN2MnJnYihoc3YpIHtcblx0XHRcdHZhciBoID0gaHN2WzBdIC8gNjBcblx0XHRcdHZhciBzID0gaHN2WzFdIC8gMTAwXG5cdFx0XHR2YXIgdiA9IGhzdlsyXSAvIDEwMFxuXHRcdFx0dmFyIGhpID0gTWF0aC5mbG9vcihoKSAlIDZcblxuXHRcdFx0dmFyIGYgPSBoIC0gTWF0aC5mbG9vcihoKVxuXHRcdFx0dmFyIHAgPSAyNTUgKiB2ICogKDEgLSBzKVxuXHRcdFx0dmFyIHEgPSAyNTUgKiB2ICogKDEgLSAocyAqIGYpKVxuXHRcdFx0dmFyIHQgPSAyNTUgKiB2ICogKDEgLSAocyAqICgxIC0gZikpKVxuXG5cdFx0XHR2ID0gMjU1ICogdlxuXG5cdFx0XHRzd2l0Y2ggKGhpKSB7XG5cdFx0XHRcdGNhc2UgMDpcblx0XHRcdFx0XHRyZXR1cm4gW3YsIHQsIHBdXG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRyZXR1cm4gW3EsIHYsIHBdXG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRyZXR1cm4gW3AsIHYsIHRdXG5cdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRyZXR1cm4gW3AsIHEsIHZdXG5cdFx0XHRcdGNhc2UgNDpcblx0XHRcdFx0XHRyZXR1cm4gW3QsIHAsIHZdXG5cdFx0XHRcdGNhc2UgNTpcblx0XHRcdFx0XHRyZXR1cm4gW3YsIHAsIHFdXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRoc3YyaHNsOiBmdW5jdGlvbiBoc3YyaHNsKGhzdikge1xuXHRcdFx0dmFyIGggPSBoc3ZbMF0sXG5cdFx0XHRcdHMgPSBoc3ZbMV0gLyAxMDAsXG5cdFx0XHRcdHYgPSBoc3ZbMl0gLyAxMDAsXG5cdFx0XHRcdHNsLCBsO1xuXG5cdFx0XHRsID0gKDIgLSBzKSAqIHY7XG5cdFx0XHRzbCA9IHMgKiB2O1xuXHRcdFx0c2wgLz0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG5cdFx0XHRsIC89IDI7XG5cdFx0XHRyZXR1cm4gW2gsIHNsICogMTAwLCBsICogMTAwXTtcblx0XHR9LFxuXHRcdC8vIGh0dHA6Ly93d3cuMTQwYnl0LmVzL2tleXdvcmRzL2NvbG9yXG5cdFx0cmdiMmhleDogZnVuY3Rpb24oXG5cdFx0XHRhLCAvLyByZWQsIGFzIGEgbnVtYmVyIGZyb20gMCB0byAyNTVcblx0XHRcdGIsIC8vIGdyZWVuLCBhcyBhIG51bWJlciBmcm9tIDAgdG8gMjU1XG5cdFx0XHRjIC8vIGJsdWUsIGFzIGEgbnVtYmVyIGZyb20gMCB0byAyNTVcblx0XHQpIHtcblx0XHRcdHJldHVybiBcIiNcIiArICgoMjU2ICsgYSA8PCA4IHwgYikgPDwgOCB8IGMpLnRvU3RyaW5nKDE2KS5zbGljZSgxKVxuXHRcdH0sXG5cdFx0aGV4MnJnYjogZnVuY3Rpb24oXG5cdFx0XHRhIC8vIHRha2UgYSBcIiN4eHh4eHhcIiBoZXggc3RyaW5nLFxuXHRcdCkge1xuXHRcdFx0YSA9ICcweCcgKyBhLnNsaWNlKDEpLnJlcGxhY2UoYS5sZW5ndGggPiA0ID8gYSA6IC8uL2csICckJiQmJykgfCAwO1xuXHRcdFx0cmV0dXJuIFthID4+IDE2LCBhID4+IDggJiAyNTUsIGEgJiAyNTVdXG5cdFx0fVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIENvbG9yIOWtl+WFuOaVsOaNrlxuXG5cdCAgICDlrZflhbjmlbDmja7mnaXmupAgW0EgbmljZXIgY29sb3IgcGFsZXR0ZSBmb3IgdGhlIHdlYl0oaHR0cDovL2NscnMuY2MvKVxuXHQqL1xuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8vIG5hbWUgdmFsdWUgbmljZXJcblx0ICAgIG5hdnk6IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMDAwODAnLFxuXHQgICAgICAgIG5pY2VyOiAnIzAwMUYzRidcblx0ICAgIH0sXG5cdCAgICBibHVlOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDAwMGZmJyxcblx0ICAgICAgICBuaWNlcjogJyMwMDc0RDknXG5cdCAgICB9LFxuXHQgICAgYXF1YToge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwZmZmZicsXG5cdCAgICAgICAgbmljZXI6ICcjN0ZEQkZGJ1xuXHQgICAgfSxcblx0ICAgIHRlYWw6IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMDgwODAnLFxuXHQgICAgICAgIG5pY2VyOiAnIzM5Q0NDQydcblx0ICAgIH0sXG5cdCAgICBvbGl2ZToge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwODAwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjM0Q5OTcwJ1xuXHQgICAgfSxcblx0ICAgIGdyZWVuOiB7XG5cdCAgICAgICAgdmFsdWU6ICcjMDA4MDAwJyxcblx0ICAgICAgICBuaWNlcjogJyMyRUNDNDAnXG5cdCAgICB9LFxuXHQgICAgbGltZToge1xuXHQgICAgICAgIHZhbHVlOiAnIzAwZmYwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjMDFGRjcwJ1xuXHQgICAgfSxcblx0ICAgIHllbGxvdzoge1xuXHQgICAgICAgIHZhbHVlOiAnI2ZmZmYwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjRkZEQzAwJ1xuXHQgICAgfSxcblx0ICAgIG9yYW5nZToge1xuXHQgICAgICAgIHZhbHVlOiAnI2ZmYTUwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjRkY4NTFCJ1xuXHQgICAgfSxcblx0ICAgIHJlZDoge1xuXHQgICAgICAgIHZhbHVlOiAnI2ZmMDAwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjRkY0MTM2J1xuXHQgICAgfSxcblx0ICAgIG1hcm9vbjoge1xuXHQgICAgICAgIHZhbHVlOiAnIzgwMDAwMCcsXG5cdCAgICAgICAgbmljZXI6ICcjODUxNDRCJ1xuXHQgICAgfSxcblx0ICAgIGZ1Y2hzaWE6IHtcblx0ICAgICAgICB2YWx1ZTogJyNmZjAwZmYnLFxuXHQgICAgICAgIG5pY2VyOiAnI0YwMTJCRSdcblx0ICAgIH0sXG5cdCAgICBwdXJwbGU6IHtcblx0ICAgICAgICB2YWx1ZTogJyM4MDAwODAnLFxuXHQgICAgICAgIG5pY2VyOiAnI0IxMERDOSdcblx0ICAgIH0sXG5cdCAgICBzaWx2ZXI6IHtcblx0ICAgICAgICB2YWx1ZTogJyNjMGMwYzAnLFxuXHQgICAgICAgIG5pY2VyOiAnI0RERERERCdcblx0ICAgIH0sXG5cdCAgICBncmF5OiB7XG5cdCAgICAgICAgdmFsdWU6ICcjODA4MDgwJyxcblx0ICAgICAgICBuaWNlcjogJyNBQUFBQUEnXG5cdCAgICB9LFxuXHQgICAgYmxhY2s6IHtcblx0ICAgICAgICB2YWx1ZTogJyMwMDAwMDAnLFxuXHQgICAgICAgIG5pY2VyOiAnIzExMTExMSdcblx0ICAgIH0sXG5cdCAgICB3aGl0ZToge1xuXHQgICAgICAgIHZhbHVlOiAnI0ZGRkZGRicsXG5cdCAgICAgICAgbmljZXI6ICcjRkZGRkZGJ1xuXHQgICAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Lypcblx0ICAgICMjIFRleHRcblxuXHQgICAgaHR0cDovL3d3dy5saXBzdW0uY29tL1xuXHQqL1xuXHR2YXIgQmFzaWMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpXG5cdHZhciBIZWxwZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuXG5cdGZ1bmN0aW9uIHJhbmdlKGRlZmF1bHRNaW4sIGRlZmF1bHRNYXgsIG1pbiwgbWF4KSB7XG5cdCAgICByZXR1cm4gbWluID09PSB1bmRlZmluZWQgPyBCYXNpYy5uYXR1cmFsKGRlZmF1bHRNaW4sIGRlZmF1bHRNYXgpIDogLy8gKClcblx0ICAgICAgICBtYXggPT09IHVuZGVmaW5lZCA/IG1pbiA6IC8vICggbGVuIClcblx0ICAgICAgICBCYXNpYy5uYXR1cmFsKHBhcnNlSW50KG1pbiwgMTApLCBwYXJzZUludChtYXgsIDEwKSkgLy8gKCBtaW4sIG1heCApXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOauteaWh+acrOOAglxuXHQgICAgcGFyYWdyYXBoOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW4gPSByYW5nZSgzLCA3LCBtaW4sIG1heClcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuc2VudGVuY2UoKSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcgJylcblx0ICAgIH0sXG5cdCAgICAvLyBcblx0ICAgIGNwYXJhZ3JhcGg6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDcsIG1pbiwgbWF4KVxuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jc2VudGVuY2UoKSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quWPpeWtkO+8jOesrOS4gOS4quWNleivjeeahOmmluWtl+avjeWkp+WGmeOAglxuXHQgICAgc2VudGVuY2U6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDEyLCAxOCwgbWluLCBtYXgpXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLndvcmQoKSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIEhlbHBlci5jYXBpdGFsaXplKHJlc3VsdC5qb2luKCcgJykpICsgJy4nXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5Lit5paH5Y+l5a2Q44CCXG5cdCAgICBjc2VudGVuY2U6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDEyLCAxOCwgbWluLCBtYXgpXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmN3b3JkKCkpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKSArICfjgIInXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5Y2V6K+N44CCXG5cdCAgICB3b3JkOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW4gPSByYW5nZSgzLCAxMCwgbWluLCBtYXgpXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0ICs9IEJhc2ljLmNoYXJhY3RlcignbG93ZXInKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5oiW5aSa5Liq5rGJ5a2X44CCXG5cdCAgICBjd29yZDogZnVuY3Rpb24ocG9vbCwgbWluLCBtYXgpIHtcblx0ICAgICAgICAvLyDmnIDluLjnlKjnmoQgNTAwIOS4quaxieWtlyBodHRwOi8vYmFpa2UuYmFpZHUuY29tL3ZpZXcvNTY4NDM2Lmh0bVxuXHQgICAgICAgIHZhciBESUNUX0tBTlpJID0gJ+eahOS4gOaYr+WcqOS4jeS6huacieWSjOS6uui/meS4reWkp+S4uuS4iuS4quWbveaIkeS7peimgeS7luaXtuadpeeUqOS7rOeUn+WIsOS9nOWcsOS6juWHuuWwseWIhuWvueaIkOS8muWPr+S4u+WPkeW5tOWKqOWQjOW3peS5n+iDveS4i+i/h+WtkOivtOS6p+enjemdouiAjOaWueWQjuWkmuWumuihjOWtpuazleaJgOawkeW+l+e7j+WNgeS4ieS5i+i/m+edgOetiemDqOW6puWutueUteWKm+mHjOWmguawtOWMlumrmOiHquS6jOeQhui1t+Wwj+eJqeeOsOWunuWKoOmHj+mDveS4pOS9k+WItuacuuW9k+S9v+eCueS7juS4muacrOWOu+aKiuaAp+WlveW6lOW8gOWug+WQiOi/mOWboOeUseWFtuS6m+eEtuWJjeWkluWkqeaUv+Wbm+aXpemCo+ekvuS5ieS6i+W5s+W9ouebuOWFqOihqOmXtOagt+S4juWFs+WQhOmHjeaWsOe6v+WGheaVsOato+W/g+WPjeS9oOaYjueci+WOn+WPiOS5iOWIqeavlOaIluS9hui0qOawlOesrOWQkemBk+WRveatpOWPmOadoeWPquayoee7k+ino+mXruaEj+W7uuaciOWFrOaXoOezu+WGm+W+iOaDheiAheacgOeri+S7o+aDs+W3sumAmuW5tuaPkOebtOmimOWFmueoi+WxleS6lOaenOaWmeixoeWRmOmdqeS9jeWFpeW4uOaWh+aAu+asoeWTgeW8j+a0u+iuvuWPiueuoeeJueS7tumVv+axguiAgeWktOWfuui1hOi+uea1gei3r+e6p+WwkeWbvuWxsee7n+aOpeefpei+g+Wwhue7hOingeiuoeWIq+WlueaJi+inkuacn+agueiuuui/kOWGnOaMh+WHoOS5neWMuuW8uuaUvuWGs+ilv+iiq+W5suWBmuW/heaImOWFiOWbnuWImeS7u+WPluaNruWkhOmYn+WNl+e7meiJsuWFiemXqOWNs+S/neayu+WMl+mAoOeZvuinhOeDremihuS4g+a1t+WPo+S4nOWvvOWZqOWOi+W/l+S4lumHkeWinuS6iea1jumYtuayueaAneacr+aegeS6pOWPl+iBlOS7gOiupOWFreWFseadg+aUtuivgeaUuea4heW3see+juWGjemHh+i9rOabtOWNlemjjuWIh+aJk+eZveaVmemAn+iKseW4puWuieWcuui6q+i9puS+i+ecn+WKoeWFt+S4h+avj+ebruiHs+i+vui1sOenr+ekuuiuruWjsOaKpeaWl+WujOexu+WFq+emu+WNjuWQjeehruaJjeenkeW8oOS/oemprOiKguivneexs+aVtOepuuWFg+WGteS7iumbhua4qeS8oOWcn+iuuOatpee+pOW5v+efs+iusOmcgOauteeglOeVjOaLieael+W+i+WPq+S4lOeptuingui2iue7h+ijheW9seeul+S9juaMgemfs+S8l+S5puW4g+WkjeWuueWEv+mhu+mZheWVhumdnumqjOi/nuaWrea3semavui/keefv+WNg+WRqOWnlOe0oOaKgOWkh+WNiuWKnumdkuecgeWIl+S5oOWTjee6puaUr+iIrOWPsuaEn+WKs+S+v+WbouW+gOmFuOWOhuW4guWFi+S9lemZpOa2iOaehOW6nOensOWkquWHhueyvuWAvOWPt+eOh+aXj+e7tOWIkumAieagh+WGmeWtmOWAmeavm+S6suW/q+aViOaWr+mZouafpeaxn+Wei+ecvOeOi+aMieagvOWFu+aYk+e9rua0vuWxgueJh+Wni+WNtOS4k+eKtuiCsuWOguS6rOivhumAguWxnuWchuWMheeBq+S9j+iwg+a7oeWOv+WxgOeFp+WPgue6oue7huW8leWQrOivpemTgeS7t+S4pem+memjnidcblxuXHQgICAgICAgIHZhciBsZW5cblx0ICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgY2FzZSAwOiAvLyAoKVxuXHQgICAgICAgICAgICAgICAgcG9vbCA9IERJQ1RfS0FOWklcblx0ICAgICAgICAgICAgICAgIGxlbiA9IDFcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMTogLy8gKCBwb29sIClcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxlbiA9IDFcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gKCBsZW5ndGggKVxuXHQgICAgICAgICAgICAgICAgICAgIGxlbiA9IHBvb2xcblx0ICAgICAgICAgICAgICAgICAgICBwb29sID0gRElDVF9LQU5aSVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAyOlxuXHQgICAgICAgICAgICAgICAgLy8gKCBwb29sLCBsZW5ndGggKVxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGVuID0gbWluXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vICggbWluLCBtYXggKVxuXHQgICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubmF0dXJhbChwb29sLCBtaW4pXG5cdCAgICAgICAgICAgICAgICAgICAgcG9vbCA9IERJQ1RfS0FOWklcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMzpcblx0ICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMubmF0dXJhbChtaW4sIG1heClcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIHJlc3VsdCA9ICcnXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHQgKz0gcG9vbC5jaGFyQXQodGhpcy5uYXR1cmFsKDAsIHBvb2wubGVuZ3RoIC0gMSkpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDlj6XmoIfpopjvvIzlhbbkuK3mr4/kuKrljZXor43nmoTpppblrZfmr43lpKflhpnjgIJcblx0ICAgIHRpdGxlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuXHQgICAgICAgIHZhciBsZW4gPSByYW5nZSgzLCA3LCBtaW4sIG1heClcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY2FwaXRhbGl6ZSh0aGlzLndvcmQoKSkpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpXG5cdCAgICB9LFxuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Y+l5Lit5paH5qCH6aKY44CCXG5cdCAgICBjdGl0bGU6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG5cdCAgICAgICAgdmFyIGxlbiA9IHJhbmdlKDMsIDcsIG1pbiwgbWF4KVxuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jd29yZCgpKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpXG5cdCAgICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDE0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgSGVscGVyc1xuXHQqL1xuXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHRcdC8vIOaKiuWtl+espuS4sueahOesrOS4gOS4quWtl+avjei9rOaNouS4uuWkp+WGmeOAglxuXHRcdGNhcGl0YWxpemU6IGZ1bmN0aW9uKHdvcmQpIHtcblx0XHRcdHJldHVybiAod29yZCArICcnKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArICh3b3JkICsgJycpLnN1YnN0cigxKVxuXHRcdH0sXG5cdFx0Ly8g5oqK5a2X56ym5Liy6L2s5o2i5Li65aSn5YaZ44CCXG5cdFx0dXBwZXI6IGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0cmV0dXJuIChzdHIgKyAnJykudG9VcHBlckNhc2UoKVxuXHRcdH0sXG5cdFx0Ly8g5oqK5a2X56ym5Liy6L2s5o2i5Li65bCP5YaZ44CCXG5cdFx0bG93ZXI6IGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0cmV0dXJuIChzdHIgKyAnJykudG9Mb3dlckNhc2UoKVxuXHRcdH0sXG5cdFx0Ly8g5LuO5pWw57uE5Lit6ZqP5py66YCJ5Y+W5LiA5Liq5YWD57Sg77yM5bm26L+U5Zue44CCXG5cdFx0cGljazogZnVuY3Rpb24gcGljayhhcnIsIG1pbiwgbWF4KSB7XG5cdFx0XHQvLyBwaWNrKCBpdGVtMSwgaXRlbTIgLi4uIClcblx0XHRcdGlmICghVXRpbC5pc0FycmF5KGFycikpIHtcblx0XHRcdFx0YXJyID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG5cdFx0XHRcdG1pbiA9IDFcblx0XHRcdFx0bWF4ID0gMVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0gKVxuXHRcdFx0XHRpZiAobWluID09PSB1bmRlZmluZWQpIG1pbiA9IDFcblxuXHRcdFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSwgY291bnQgKVxuXHRcdFx0XHRpZiAobWF4ID09PSB1bmRlZmluZWQpIG1heCA9IG1pblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobWluID09PSAxICYmIG1heCA9PT0gMSkgcmV0dXJuIGFyclt0aGlzLm5hdHVyYWwoMCwgYXJyLmxlbmd0aCAtIDEpXVxuXG5cdFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSwgbWluLCBtYXggKVxuXHRcdFx0cmV0dXJuIHRoaXMuc2h1ZmZsZShhcnIsIG1pbiwgbWF4KVxuXG5cdFx0XHQvLyDpgJrov4flj4LmlbDkuKrmlbDliKTmlq3mlrnms5Xnrb7lkI3vvIzmianlsZXmgKflpKrlt67vvIEjOTBcblx0XHRcdC8vIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0Ly8gXHRjYXNlIDE6XG5cdFx0XHQvLyBcdFx0Ly8gcGljayggWyBpdGVtMSwgaXRlbTIgLi4uIF0gKVxuXHRcdFx0Ly8gXHRcdHJldHVybiBhcnJbdGhpcy5uYXR1cmFsKDAsIGFyci5sZW5ndGggLSAxKV1cblx0XHRcdC8vIFx0Y2FzZSAyOlxuXHRcdFx0Ly8gXHRcdC8vIHBpY2soIFsgaXRlbTEsIGl0ZW0yIC4uLiBdLCBjb3VudCApXG5cdFx0XHQvLyBcdFx0bWF4ID0gbWluXG5cdFx0XHQvLyBcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXG5cdFx0XHQvLyBcdGNhc2UgMzpcblx0XHRcdC8vIFx0XHQvLyBwaWNrKCBbIGl0ZW0xLCBpdGVtMiAuLi4gXSwgbWluLCBtYXggKVxuXHRcdFx0Ly8gXHRcdHJldHVybiB0aGlzLnNodWZmbGUoYXJyLCBtaW4sIG1heClcblx0XHRcdC8vIH1cblx0XHR9LFxuXHRcdC8qXG5cdFx0ICAgIOaJk+S5seaVsOe7hOS4reWFg+e0oOeahOmhuuW6j++8jOW5tui/lOWbnuOAglxuXHRcdCAgICBHaXZlbiBhbiBhcnJheSwgc2NyYW1ibGUgdGhlIG9yZGVyIGFuZCByZXR1cm4gaXQuXG5cblx0XHQgICAg5YW25LuW55qE5a6e546w5oCd6Lev77yaXG5cdFx0ICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2pzbGlicy93aWtpL0phdmFzY3JpcHRUaXBzXG5cdFx0ICAgICAgICByZXN1bHQgPSByZXN1bHQuc29ydChmdW5jdGlvbigpIHtcblx0XHQgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAtIDAuNVxuXHRcdCAgICAgICAgfSlcblx0XHQqL1xuXHRcdHNodWZmbGU6IGZ1bmN0aW9uIHNodWZmbGUoYXJyLCBtaW4sIG1heCkge1xuXHRcdFx0YXJyID0gYXJyIHx8IFtdXG5cdFx0XHR2YXIgb2xkID0gYXJyLnNsaWNlKDApLFxuXHRcdFx0XHRyZXN1bHQgPSBbXSxcblx0XHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0XHRsZW5ndGggPSBvbGQubGVuZ3RoO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpbmRleCA9IHRoaXMubmF0dXJhbCgwLCBvbGQubGVuZ3RoIC0gMSlcblx0XHRcdFx0cmVzdWx0LnB1c2gob2xkW2luZGV4XSlcblx0XHRcdFx0b2xkLnNwbGljZShpbmRleCwgMSlcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRtYXggPSBtaW5cblx0XHRcdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdG1pbiA9IHBhcnNlSW50KG1pbiwgMTApXG5cdFx0XHRcdFx0bWF4ID0gcGFyc2VJbnQobWF4LCAxMClcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0LnNsaWNlKDAsIHRoaXMubmF0dXJhbChtaW4sIG1heCkpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKlxuXHRcdCAgICAqIFJhbmRvbS5vcmRlcihpdGVtLCBpdGVtKVxuXHRcdCAgICAqIFJhbmRvbS5vcmRlcihbaXRlbSwgaXRlbSAuLi5dKVxuXG5cdFx0ICAgIOmhuuW6j+iOt+WPluaVsOe7hOS4reeahOWFg+e0oFxuXG5cdFx0ICAgIFtKU09O5a+85YWl5pWw57uE5pSv5oyB5pWw57uE5pWw5o2u5b2V5YWlXShodHRwczovL2dpdGh1Yi5jb20vdGh4L1JBUC9pc3N1ZXMvMjIpXG5cblx0XHQgICAg5LiN5pSv5oyB5Y2V54us6LCD55So77yBXG5cdFx0Ki9cblx0XHRvcmRlcjogZnVuY3Rpb24gb3JkZXIoYXJyYXkpIHtcblx0XHRcdG9yZGVyLmNhY2hlID0gb3JkZXIuY2FjaGUgfHwge31cblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSBhcnJheSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuXG5cdFx0XHQvLyBvcHRpb25zLmNvbnRleHQucGF0aC90ZW1wbGF0ZVBhdGhcblx0XHRcdHZhciBvcHRpb25zID0gb3JkZXIub3B0aW9uc1xuXHRcdFx0dmFyIHRlbXBsYXRlUGF0aCA9IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGguam9pbignLicpXG5cblx0XHRcdHZhciBjYWNoZSA9IChcblx0XHRcdFx0b3JkZXIuY2FjaGVbdGVtcGxhdGVQYXRoXSA9IG9yZGVyLmNhY2hlW3RlbXBsYXRlUGF0aF0gfHwge1xuXHRcdFx0XHRcdGluZGV4OiAwLFxuXHRcdFx0XHRcdGFycmF5OiBhcnJheVxuXHRcdFx0XHR9XG5cdFx0XHQpXG5cblx0XHRcdHJldHVybiBjYWNoZS5hcnJheVtjYWNoZS5pbmRleCsrICUgY2FjaGUuYXJyYXkubGVuZ3RoXVxuXHRcdH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAgICAjIyBOYW1lXG5cblx0ICAgIFtCZXlvbmQgdGhlIFRvcCAxMDAwIE5hbWVzXShodHRwOi8vd3d3LnNzYS5nb3Yvb2FjdC9iYWJ5bmFtZXMvbGltaXRzLmh0bWwpXG5cdCovXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHRcdC8vIOmaj+acuueUn+aIkOS4gOS4quW4uOingeeahOiLseaWh+WQjeOAglxuXHRcdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuYW1lcyA9IFtcblx0XHRcdFx0Ly8gbWFsZVxuXHRcdFx0XHRcIkphbWVzXCIsIFwiSm9oblwiLCBcIlJvYmVydFwiLCBcIk1pY2hhZWxcIiwgXCJXaWxsaWFtXCIsXG5cdFx0XHRcdFwiRGF2aWRcIiwgXCJSaWNoYXJkXCIsIFwiQ2hhcmxlc1wiLCBcIkpvc2VwaFwiLCBcIlRob21hc1wiLFxuXHRcdFx0XHRcIkNocmlzdG9waGVyXCIsIFwiRGFuaWVsXCIsIFwiUGF1bFwiLCBcIk1hcmtcIiwgXCJEb25hbGRcIixcblx0XHRcdFx0XCJHZW9yZ2VcIiwgXCJLZW5uZXRoXCIsIFwiU3RldmVuXCIsIFwiRWR3YXJkXCIsIFwiQnJpYW5cIixcblx0XHRcdFx0XCJSb25hbGRcIiwgXCJBbnRob255XCIsIFwiS2V2aW5cIiwgXCJKYXNvblwiLCBcIk1hdHRoZXdcIixcblx0XHRcdFx0XCJHYXJ5XCIsIFwiVGltb3RoeVwiLCBcIkpvc2VcIiwgXCJMYXJyeVwiLCBcIkplZmZyZXlcIixcblx0XHRcdFx0XCJGcmFua1wiLCBcIlNjb3R0XCIsIFwiRXJpY1wiXG5cdFx0XHRdLmNvbmNhdChbXG5cdFx0XHRcdC8vIGZlbWFsZVxuXHRcdFx0XHRcIk1hcnlcIiwgXCJQYXRyaWNpYVwiLCBcIkxpbmRhXCIsIFwiQmFyYmFyYVwiLCBcIkVsaXphYmV0aFwiLFxuXHRcdFx0XHRcIkplbm5pZmVyXCIsIFwiTWFyaWFcIiwgXCJTdXNhblwiLCBcIk1hcmdhcmV0XCIsIFwiRG9yb3RoeVwiLFxuXHRcdFx0XHRcIkxpc2FcIiwgXCJOYW5jeVwiLCBcIkthcmVuXCIsIFwiQmV0dHlcIiwgXCJIZWxlblwiLFxuXHRcdFx0XHRcIlNhbmRyYVwiLCBcIkRvbm5hXCIsIFwiQ2Fyb2xcIiwgXCJSdXRoXCIsIFwiU2hhcm9uXCIsXG5cdFx0XHRcdFwiTWljaGVsbGVcIiwgXCJMYXVyYVwiLCBcIlNhcmFoXCIsIFwiS2ltYmVybHlcIiwgXCJEZWJvcmFoXCIsXG5cdFx0XHRcdFwiSmVzc2ljYVwiLCBcIlNoaXJsZXlcIiwgXCJDeW50aGlhXCIsIFwiQW5nZWxhXCIsIFwiTWVsaXNzYVwiLFxuXHRcdFx0XHRcIkJyZW5kYVwiLCBcIkFteVwiLCBcIkFubmFcIlxuXHRcdFx0XSlcblx0XHRcdHJldHVybiB0aGlzLnBpY2sobmFtZXMpXG5cdFx0XHRcdC8vIG9yIHRoaXMuY2FwaXRhbGl6ZSh0aGlzLndvcmQoKSlcblx0XHR9LFxuXHRcdC8vIOmaj+acuueUn+aIkOS4gOS4quW4uOingeeahOiLseaWh+Wnk+OAglxuXHRcdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5hbWVzID0gW1xuXHRcdFx0XHRcIlNtaXRoXCIsIFwiSm9obnNvblwiLCBcIldpbGxpYW1zXCIsIFwiQnJvd25cIiwgXCJKb25lc1wiLFxuXHRcdFx0XHRcIk1pbGxlclwiLCBcIkRhdmlzXCIsIFwiR2FyY2lhXCIsIFwiUm9kcmlndWV6XCIsIFwiV2lsc29uXCIsXG5cdFx0XHRcdFwiTWFydGluZXpcIiwgXCJBbmRlcnNvblwiLCBcIlRheWxvclwiLCBcIlRob21hc1wiLCBcIkhlcm5hbmRlelwiLFxuXHRcdFx0XHRcIk1vb3JlXCIsIFwiTWFydGluXCIsIFwiSmFja3NvblwiLCBcIlRob21wc29uXCIsIFwiV2hpdGVcIixcblx0XHRcdFx0XCJMb3BlelwiLCBcIkxlZVwiLCBcIkdvbnphbGV6XCIsIFwiSGFycmlzXCIsIFwiQ2xhcmtcIixcblx0XHRcdFx0XCJMZXdpc1wiLCBcIlJvYmluc29uXCIsIFwiV2Fsa2VyXCIsIFwiUGVyZXpcIiwgXCJIYWxsXCIsXG5cdFx0XHRcdFwiWW91bmdcIiwgXCJBbGxlblwiXG5cdFx0XHRdXG5cdFx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHRcdFx0XHQvLyBvciB0aGlzLmNhcGl0YWxpemUodGhpcy53b3JkKCkpXG5cdFx0fSxcblx0XHQvLyDpmo/mnLrnlJ/miJDkuIDkuKrluLjop4HnmoToi7Hmloflp5PlkI3jgIJcblx0XHRuYW1lOiBmdW5jdGlvbihtaWRkbGUpIHtcblx0XHRcdHJldHVybiB0aGlzLmZpcnN0KCkgKyAnICcgK1xuXHRcdFx0XHQobWlkZGxlID8gdGhpcy5maXJzdCgpICsgJyAnIDogJycpICtcblx0XHRcdFx0dGhpcy5sYXN0KClcblx0XHR9LFxuXHRcdC8qXG5cdFx0ICAgIOmaj+acuueUn+aIkOS4gOS4quW4uOingeeahOS4reaWh+Wnk+OAglxuXHRcdCAgICBb5LiW55WM5bi455So5aeT5rCP5o6S6KGMXShodHRwOi8vYmFpa2UuYmFpZHUuY29tL3ZpZXcvMTcxOTExNS5odG0pXG5cdFx0ICAgIFvnjoTmtL7nvZEgLSDnvZHnu5zlsI/or7TliJvkvZzovoXliqnlubPlj7BdKGh0dHA6Ly94dWFucGFpLnNpbmFhcHAuY29tLylcblx0XHQgKi9cblx0XHRjZmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5hbWVzID0gKFxuXHRcdFx0XHQn546LIOadjiDlvKAg5YiYIOmZiCDmnagg6LW1IOm7hCDlkagg5ZC0ICcgK1xuXHRcdFx0XHQn5b6QIOWtmSDog6Eg5pyxIOmrmCDmnpcg5L2VIOmDrSDpqawg572XICcgK1xuXHRcdFx0XHQn5qKBIOWuiyDpg5Eg6LCiIOmfqSDllJAg5YavIOS6jiDokaMg6JCnICcgK1xuXHRcdFx0XHQn56iLIOabuSDoooEg6YKTIOiuuCDlgoUg5rKIIOabviDlva0g5ZCVICcgK1xuXHRcdFx0XHQn6IuPIOWNoiDokosg6JShIOi0viDkuIEg6a2PIOiWmyDlj7Yg6ZiOICcgK1xuXHRcdFx0XHQn5L2ZIOa9mCDmnZwg5oi0IOWkjyDplLog5rGqIOeUsCDku7sg5aecICcgK1xuXHRcdFx0XHQn6IyDIOaWuSDnn7Mg5aeaIOiwrSDlu5Yg6YK5IOeGiiDph5Eg6ZmGICcgK1xuXHRcdFx0XHQn6YOdIOWtlCDnmb0g5bSUIOW6tyDmr5sg6YKxIOenpiDmsZ8g5Y+yICcgK1xuXHRcdFx0XHQn6aG+IOS+ryDpgrUg5a2fIOm+mSDkuIcg5q61IOmbtyDpkrEg5rGkICcgK1xuXHRcdFx0XHQn5bC5IOm7jiDmmJMg5bi4IOatpiDkuZQg6LS6IOi1liDpvpog5paHJ1xuXHRcdFx0KS5zcGxpdCgnICcpXG5cdFx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgICAg6ZqP5py655Sf5oiQ5LiA5Liq5bi46KeB55qE5Lit5paH5ZCN44CCXG5cdFx0ICAgIFvkuK3lm73mnIDluLjop4HlkI3lrZfliY01MOWQjV/kuInkuZ3nrpflkb3nvZFdKGh0dHA6Ly93d3cubmFtZTk5OS5uZXQveGluZ21pbmcveGluZ3NoaS8yMDEzMTAwNC80OC5odG1sKVxuXHRcdCAqL1xuXHRcdGNsYXN0OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuYW1lcyA9IChcblx0XHRcdFx0J+S8nyDoirMg5aicIOengOiLsSDmlY8g6Z2ZIOS4vSDlvLog56OKIOWGmyAnICtcblx0XHRcdFx0J+a0iyDli4cg6ImzIOadsCDlqJ8g5rabIOaYjiDotoUg56eA5YWwIOmcniAnICtcblx0XHRcdFx0J+W5syDliJog5qGC6IuxJ1xuXHRcdFx0KS5zcGxpdCgnICcpXG5cdFx0XHRyZXR1cm4gdGhpcy5waWNrKG5hbWVzKVxuXHRcdH0sXG5cdFx0Ly8g6ZqP5py655Sf5oiQ5LiA5Liq5bi46KeB55qE5Lit5paH5aeT5ZCN44CCXG5cdFx0Y25hbWU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY2ZpcnN0KCkgKyB0aGlzLmNsYXN0KClcblx0XHR9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDE2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgICAgIyMgV2ViXG5cdCovXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLypcblx0ICAgICAgICDpmo/mnLrnlJ/miJDkuIDkuKogVVJM44CCXG5cblx0ICAgICAgICBbVVJMIOinhOiMg10oaHR0cDovL3d3dy53My5vcmcvQWRkcmVzc2luZy9VUkwvdXJsLXNwZWMudHh0KVxuXHQgICAgICAgICAgICBodHRwICAgICAgICAgICAgICAgICAgICBIeXBlcnRleHQgVHJhbnNmZXIgUHJvdG9jb2wgXG5cdCAgICAgICAgICAgIGZ0cCAgICAgICAgICAgICAgICAgICAgIEZpbGUgVHJhbnNmZXIgcHJvdG9jb2wgXG5cdCAgICAgICAgICAgIGdvcGhlciAgICAgICAgICAgICAgICAgIFRoZSBHb3BoZXIgcHJvdG9jb2wgXG5cdCAgICAgICAgICAgIG1haWx0byAgICAgICAgICAgICAgICAgIEVsZWN0cm9uaWMgbWFpbCBhZGRyZXNzIFxuXHQgICAgICAgICAgICBtaWQgICAgICAgICAgICAgICAgICAgICBNZXNzYWdlIGlkZW50aWZpZXJzIGZvciBlbGVjdHJvbmljIG1haWwgXG5cdCAgICAgICAgICAgIGNpZCAgICAgICAgICAgICAgICAgICAgIENvbnRlbnQgaWRlbnRpZmllcnMgZm9yIE1JTUUgYm9keSBwYXJ0IFxuXHQgICAgICAgICAgICBuZXdzICAgICAgICAgICAgICAgICAgICBVc2VuZXQgbmV3cyBcblx0ICAgICAgICAgICAgbm50cCAgICAgICAgICAgICAgICAgICAgVXNlbmV0IG5ld3MgZm9yIGxvY2FsIE5OVFAgYWNjZXNzIG9ubHkgXG5cdCAgICAgICAgICAgIHByb3NwZXJvICAgICAgICAgICAgICAgIEFjY2VzcyB1c2luZyB0aGUgcHJvc3Blcm8gcHJvdG9jb2xzIFxuXHQgICAgICAgICAgICB0ZWxuZXQgcmxvZ2luIHRuMzI3MCAgICBSZWZlcmVuY2UgdG8gaW50ZXJhY3RpdmUgc2Vzc2lvbnNcblx0ICAgICAgICAgICAgd2FpcyAgICAgICAgICAgICAgICAgICAgV2lkZSBBcmVhIEluZm9ybWF0aW9uIFNlcnZlcnMgXG5cdCAgICAqL1xuXHQgICAgdXJsOiBmdW5jdGlvbihwcm90b2NvbCwgaG9zdCkge1xuXHQgICAgICAgIHJldHVybiAocHJvdG9jb2wgfHwgdGhpcy5wcm90b2NvbCgpKSArICc6Ly8nICsgLy8gcHJvdG9jb2w/XG5cdCAgICAgICAgICAgIChob3N0IHx8IHRoaXMuZG9tYWluKCkpICsgLy8gaG9zdD9cblx0ICAgICAgICAgICAgJy8nICsgdGhpcy53b3JkKClcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKogVVJMIOWNj+iuruOAglxuXHQgICAgcHJvdG9jb2w6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnBpY2soXG5cdCAgICAgICAgICAgIC8vIOWNj+iuruewh1xuXHQgICAgICAgICAgICAnaHR0cCBmdHAgZ29waGVyIG1haWx0byBtaWQgY2lkIG5ld3Mgbm50cCBwcm9zcGVybyB0ZWxuZXQgcmxvZ2luIHRuMzI3MCB3YWlzJy5zcGxpdCgnICcpXG5cdCAgICAgICAgKVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quWfn+WQjeOAglxuXHQgICAgZG9tYWluOiBmdW5jdGlvbih0bGQpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy53b3JkKCkgKyAnLicgKyAodGxkIHx8IHRoaXMudGxkKCkpXG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICDpmo/mnLrnlJ/miJDkuIDkuKrpobbnuqfln5/lkI3jgIJcblx0ICAgICAgICDlm73pmYXpobbnuqfln5/lkI0gaW50ZXJuYXRpb25hbCB0b3AtbGV2ZWwgZG9tYWluLW5hbWVzLCBpVExEc1xuXHQgICAgICAgIOWbveWutumhtue6p+Wfn+WQjSBuYXRpb25hbCB0b3AtbGV2ZWwgZG9tYWlubmFtZXMsIG5UTERzXG5cdCAgICAgICAgW+Wfn+WQjeWQjue8gOWkp+WFqF0oaHR0cDovL3d3dy4xNjNucy5jb20veml4dW4vcG9zdC80NDE3Lmh0bWwpXG5cdCAgICAqL1xuXHQgICAgdGxkOiBmdW5jdGlvbigpIHsgLy8gVG9wIExldmVsIERvbWFpblxuXHQgICAgICAgIHJldHVybiB0aGlzLnBpY2soXG5cdCAgICAgICAgICAgIChcblx0ICAgICAgICAgICAgICAgIC8vIOWfn+WQjeWQjue8gFxuXHQgICAgICAgICAgICAgICAgJ2NvbSBuZXQgb3JnIGVkdSBnb3YgaW50IG1pbCBjbiAnICtcblx0ICAgICAgICAgICAgICAgIC8vIOWbveWGheWfn+WQjVxuXHQgICAgICAgICAgICAgICAgJ2NvbS5jbiBuZXQuY24gZ292LmNuIG9yZy5jbiAnICtcblx0ICAgICAgICAgICAgICAgIC8vIOS4reaWh+WbveWGheWfn+WQjVxuXHQgICAgICAgICAgICAgICAgJ+S4reWbvSDkuK3lm73kupLogZQu5YWs5Y+4IOS4reWbveS6kuiBlC7nvZHnu5wgJyArXG5cdCAgICAgICAgICAgICAgICAvLyDmlrDlm73pmYXln5/lkI1cblx0ICAgICAgICAgICAgICAgICd0ZWwgYml6IGNjIHR2IGluZm8gbmFtZSBoayBtb2JpIGFzaWEgY2QgdHJhdmVsIHBybyBtdXNldW0gY29vcCBhZXJvICcgK1xuXHQgICAgICAgICAgICAgICAgLy8g5LiW55WM5ZCE5Zu95Z+f5ZCN5ZCO57yAXG5cdCAgICAgICAgICAgICAgICAnYWQgYWUgYWYgYWcgYWkgYWwgYW0gYW4gYW8gYXEgYXIgYXMgYXQgYXUgYXcgYXogYmEgYmIgYmQgYmUgYmYgYmcgYmggYmkgYmogYm0gYm4gYm8gYnIgYnMgYnQgYnYgYncgYnkgYnogY2EgY2MgY2YgY2cgY2ggY2kgY2sgY2wgY20gY24gY28gY3EgY3IgY3UgY3YgY3ggY3kgY3ogZGUgZGogZGsgZG0gZG8gZHogZWMgZWUgZWcgZWggZXMgZXQgZXYgZmkgZmogZmsgZm0gZm8gZnIgZ2EgZ2IgZ2QgZ2UgZ2YgZ2ggZ2kgZ2wgZ20gZ24gZ3AgZ3IgZ3QgZ3UgZ3cgZ3kgaGsgaG0gaG4gaHIgaHQgaHUgaWQgaWUgaWwgaW4gaW8gaXEgaXIgaXMgaXQgam0gam8ganAga2Uga2cga2gga2kga20ga24ga3Aga3Iga3cga3kga3ogbGEgbGIgbGMgbGkgbGsgbHIgbHMgbHQgbHUgbHYgbHkgbWEgbWMgbWQgbWcgbWggbWwgbW0gbW4gbW8gbXAgbXEgbXIgbXMgbXQgbXYgbXcgbXggbXkgbXogbmEgbmMgbmUgbmYgbmcgbmkgbmwgbm8gbnAgbnIgbnQgbnUgbnogb20gcWEgcGEgcGUgcGYgcGcgcGggcGsgcGwgcG0gcG4gcHIgcHQgcHcgcHkgcmUgcm8gcnUgcncgc2Egc2Igc2Mgc2Qgc2Ugc2cgc2ggc2kgc2ogc2sgc2wgc20gc24gc28gc3Igc3Qgc3Ugc3kgc3ogdGMgdGQgdGYgdGcgdGggdGogdGsgdG0gdG4gdG8gdHAgdHIgdHQgdHYgdHcgdHogdWEgdWcgdWsgdXMgdXkgdmEgdmMgdmUgdmcgdm4gdnUgd2Ygd3MgeWUgeXUgemEgem0genIgencnXG5cdCAgICAgICAgICAgICkuc3BsaXQoJyAnKVxuXHQgICAgICAgIClcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrpgq7ku7blnLDlnYDjgIJcblx0ICAgIGVtYWlsOiBmdW5jdGlvbihkb21haW4pIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXIoJ2xvd2VyJykgKyAnLicgKyB0aGlzLndvcmQoKSArICdAJyArXG5cdCAgICAgICAgICAgIChcblx0ICAgICAgICAgICAgICAgIGRvbWFpbiB8fFxuXHQgICAgICAgICAgICAgICAgKHRoaXMud29yZCgpICsgJy4nICsgdGhpcy50bGQoKSlcblx0ICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5jaGFyYWN0ZXIoJ2xvd2VyJykgKyAnLicgKyB0aGlzLmxhc3QoKS50b0xvd2VyQ2FzZSgpICsgJ0AnICsgdGhpcy5sYXN0KCkudG9Mb3dlckNhc2UoKSArICcuJyArIHRoaXMudGxkKClcblx0ICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMud29yZCgpICsgJ0AnICsgKGRvbWFpbiB8fCB0aGlzLmRvbWFpbigpKVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qiBJUCDlnLDlnYDjgIJcblx0ICAgIGlwOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDAsIDI1NSkgKyAnLicgK1xuXHQgICAgICAgICAgICB0aGlzLm5hdHVyYWwoMCwgMjU1KSArICcuJyArXG5cdCAgICAgICAgICAgIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgJy4nICtcblx0ICAgICAgICAgICAgdGhpcy5uYXR1cmFsKDAsIDI1NSlcblx0ICAgIH1cblx0fVxuXG4vKioqLyB9LFxuLyogMTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyBBZGRyZXNzXG5cdCovXG5cblx0dmFyIERJQ1QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KVxuXHR2YXIgUkVHSU9OID0gWyfkuJzljJcnLCAn5Y2O5YyXJywgJ+WNjuS4nCcsICfljY7kuK0nLCAn5Y2O5Y2XJywgJ+ilv+WNlycsICfopb/ljJcnXVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq5aSn5Yy644CCXG5cdCAgICByZWdpb246IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnBpY2soUkVHSU9OKVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qu+8iOS4reWbve+8ieecge+8iOaIluebtOi+luW4guOAgeiHquayu+WMuuOAgeeJueWIq+ihjOaUv+WMuu+8ieOAglxuXHQgICAgcHJvdmluY2U6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnBpY2soRElDVCkubmFtZVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qu+8iOS4reWbve+8ieW4guOAglxuXHQgICAgY2l0eTogZnVuY3Rpb24ocHJlZml4KSB7XG5cdCAgICAgICAgdmFyIHByb3ZpbmNlID0gdGhpcy5waWNrKERJQ1QpXG5cdCAgICAgICAgdmFyIGNpdHkgPSB0aGlzLnBpY2socHJvdmluY2UuY2hpbGRyZW4pXG5cdCAgICAgICAgcmV0dXJuIHByZWZpeCA/IFtwcm92aW5jZS5uYW1lLCBjaXR5Lm5hbWVdLmpvaW4oJyAnKSA6IGNpdHkubmFtZVxuXHQgICAgfSxcblx0ICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qu+8iOS4reWbve+8ieWOv+OAglxuXHQgICAgY291bnR5OiBmdW5jdGlvbihwcmVmaXgpIHtcblx0ICAgICAgICB2YXIgcHJvdmluY2UgPSB0aGlzLnBpY2soRElDVClcblx0ICAgICAgICB2YXIgY2l0eSA9IHRoaXMucGljayhwcm92aW5jZS5jaGlsZHJlbilcblx0ICAgICAgICB2YXIgY291bnR5ID0gdGhpcy5waWNrKGNpdHkuY2hpbGRyZW4pIHx8IHtcblx0ICAgICAgICAgICAgbmFtZTogJy0nXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBwcmVmaXggPyBbcHJvdmluY2UubmFtZSwgY2l0eS5uYW1lLCBjb3VudHkubmFtZV0uam9pbignICcpIDogY291bnR5Lm5hbWVcblx0ICAgIH0sXG5cdCAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrpgq7mlL/nvJbnoIHvvIjlha3kvY3mlbDlrZfvvInjgIJcblx0ICAgIHppcDogZnVuY3Rpb24obGVuKSB7XG5cdCAgICAgICAgdmFyIHppcCA9ICcnXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAobGVuIHx8IDYpOyBpKyspIHppcCArPSB0aGlzLm5hdHVyYWwoMCwgOSlcblx0ICAgICAgICByZXR1cm4gemlwXG5cdCAgICB9XG5cblx0ICAgIC8vIGFkZHJlc3M6IGZ1bmN0aW9uKCkge30sXG5cdCAgICAvLyBwaG9uZTogZnVuY3Rpb24oKSB7fSxcblx0ICAgIC8vIGFyZWFjb2RlOiBmdW5jdGlvbigpIHt9LFxuXHQgICAgLy8gc3RyZWV0OiBmdW5jdGlvbigpIHt9LFxuXHQgICAgLy8gc3RyZWV0X3N1ZmZpeGVzOiBmdW5jdGlvbigpIHt9LFxuXHQgICAgLy8gc3RyZWV0X3N1ZmZpeDogZnVuY3Rpb24oKSB7fSxcblx0ICAgIC8vIHN0YXRlczogZnVuY3Rpb24oKSB7fSxcblx0ICAgIC8vIHN0YXRlOiBmdW5jdGlvbigpIHt9LFxuXHR9XG5cbi8qKiovIH0sXG4vKiAxOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICAgICMjIEFkZHJlc3Mg5a2X5YW45pWw5o2uXG5cblx0ICAgIOWtl+WFuOaVsOaNruadpea6kCBodHRwOi8vd3d3LmF0YXRlY2gub3JnL2FydGljbGVzLzMwMDI4P3JuZD0yNTQyNTk4NTZcblxuXHQgICAg5Zu95qCHIOecge+8iOW4gu+8iee6p+ihjOaUv+WMuuWIkueggeihqFxuXG5cdCAgICDljY7ljJcgICDljJfkuqzluIIg5aSp5rSl5biCIOays+WMl+ecgSDlsbHopb/nnIEg5YaF6JKZ5Y+k6Ieq5rK75Yy6XG5cdCAgICDkuJzljJcgICDovr3lroHnnIEg5ZCJ5p6X55yBIOm7kem+meaxn+ecgVxuXHQgICAg5Y2O5LicICAg5LiK5rW35biCIOaxn+iLj+ecgSDmtZnmsZ/nnIEg5a6J5b6955yBIOemj+W7uuecgSDmsZ/opb/nnIEg5bGx5Lic55yBXG5cdCAgICDljY7ljZcgICDlub/kuJznnIEg5bm/6KW/5aOu5peP6Ieq5rK75Yy6IOa1t+WNl+ecgVxuXHQgICAg5Y2O5LitICAg5rKz5Y2X55yBIOa5luWMl+ecgSDmuZbljZfnnIFcblx0ICAgIOilv+WNlyAgIOmHjeW6huW4giDlm5vlt53nnIEg6LS15bee55yBIOS6keWNl+ecgSDopb/ol4/oh6rmsrvljLpcblx0ICAgIOilv+WMlyAgIOmZleilv+ecgSDnlJjogoPnnIEg6Z2S5rW355yBIOWugeWkj+WbnuaXj+iHquayu+WMuiDmlrDnlobnu7TlkL7lsJToh6rmsrvljLpcblx0ICAgIOa4r+a+s+WPsCDpppnmuK/nibnliKvooYzmlL/ljLog5r6z6Zeo54m55Yir6KGM5pS/5Yy6IOWPsOa5vuecgVxuXHQgICAgXG5cdCAgICAqKuaOkuW6jyoqXG5cdCAgICBcblx0ICAgIGBgYGpzXG5cdCAgICB2YXIgbWFwID0ge31cblx0ICAgIF8uZWFjaChfLmtleXMoUkVHSU9OUyksZnVuY3Rpb24oaWQpe1xuXHQgICAgICBtYXBbaWRdID0gUkVHSU9OU1tJRF1cblx0ICAgIH0pXG5cdCAgICBKU09OLnN0cmluZ2lmeShtYXApXG5cdCAgICBgYGBcblx0Ki9cblx0dmFyIERJQ1QgPSB7XG5cdCAgICBcIjExMDAwMFwiOiBcIuWMl+S6rFwiLFxuXHQgICAgXCIxMTAxMDBcIjogXCLljJfkuqzluIJcIixcblx0ICAgIFwiMTEwMTAxXCI6IFwi5Lic5Z+O5Yy6XCIsXG5cdCAgICBcIjExMDEwMlwiOiBcIuilv+WfjuWMulwiLFxuXHQgICAgXCIxMTAxMDVcIjogXCLmnJ3pmLPljLpcIixcblx0ICAgIFwiMTEwMTA2XCI6IFwi5Liw5Y+w5Yy6XCIsXG5cdCAgICBcIjExMDEwN1wiOiBcIuefs+aZr+WxseWMulwiLFxuXHQgICAgXCIxMTAxMDhcIjogXCLmtbfmt4DljLpcIixcblx0ICAgIFwiMTEwMTA5XCI6IFwi6Zeo5aS05rKf5Yy6XCIsXG5cdCAgICBcIjExMDExMVwiOiBcIuaIv+WxseWMulwiLFxuXHQgICAgXCIxMTAxMTJcIjogXCLpgJrlt57ljLpcIixcblx0ICAgIFwiMTEwMTEzXCI6IFwi6aG65LmJ5Yy6XCIsXG5cdCAgICBcIjExMDExNFwiOiBcIuaYjOW5s+WMulwiLFxuXHQgICAgXCIxMTAxMTVcIjogXCLlpKflhbTljLpcIixcblx0ICAgIFwiMTEwMTE2XCI6IFwi5oCA5p+U5Yy6XCIsXG5cdCAgICBcIjExMDExN1wiOiBcIuW5s+iwt+WMulwiLFxuXHQgICAgXCIxMTAyMjhcIjogXCLlr4bkupHljr9cIixcblx0ICAgIFwiMTEwMjI5XCI6IFwi5bu25bqG5Y6/XCIsXG5cdCAgICBcIjExMDIzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMjAwMDBcIjogXCLlpKnmtKVcIixcblx0ICAgIFwiMTIwMTAwXCI6IFwi5aSp5rSl5biCXCIsXG5cdCAgICBcIjEyMDEwMVwiOiBcIuWSjOW5s+WMulwiLFxuXHQgICAgXCIxMjAxMDJcIjogXCLmsrPkuJzljLpcIixcblx0ICAgIFwiMTIwMTAzXCI6IFwi5rKz6KW/5Yy6XCIsXG5cdCAgICBcIjEyMDEwNFwiOiBcIuWNl+W8gOWMulwiLFxuXHQgICAgXCIxMjAxMDVcIjogXCLmsrPljJfljLpcIixcblx0ICAgIFwiMTIwMTA2XCI6IFwi57qi5qGl5Yy6XCIsXG5cdCAgICBcIjEyMDExMFwiOiBcIuS4nOS4veWMulwiLFxuXHQgICAgXCIxMjAxMTFcIjogXCLopb/pnZLljLpcIixcblx0ICAgIFwiMTIwMTEyXCI6IFwi5rSl5Y2X5Yy6XCIsXG5cdCAgICBcIjEyMDExM1wiOiBcIuWMl+i+sOWMulwiLFxuXHQgICAgXCIxMjAxMTRcIjogXCLmrabmuIXljLpcIixcblx0ICAgIFwiMTIwMTE1XCI6IFwi5a6d5Z275Yy6XCIsXG5cdCAgICBcIjEyMDExNlwiOiBcIua7qOa1t+aWsOWMulwiLFxuXHQgICAgXCIxMjAyMjFcIjogXCLlroHmsrPljr9cIixcblx0ICAgIFwiMTIwMjIzXCI6IFwi6Z2Z5rW35Y6/XCIsXG5cdCAgICBcIjEyMDIyNVwiOiBcIuiTn+WOv1wiLFxuXHQgICAgXCIxMjAyMjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwMDAwXCI6IFwi5rKz5YyX55yBXCIsXG5cdCAgICBcIjEzMDEwMFwiOiBcIuefs+WutuW6hOW4glwiLFxuXHQgICAgXCIxMzAxMDJcIjogXCLplb/lronljLpcIixcblx0ICAgIFwiMTMwMTAzXCI6IFwi5qGl5Lic5Yy6XCIsXG5cdCAgICBcIjEzMDEwNFwiOiBcIuahpeilv+WMulwiLFxuXHQgICAgXCIxMzAxMDVcIjogXCLmlrDljY7ljLpcIixcblx0ICAgIFwiMTMwMTA3XCI6IFwi5LqV6ZmJ55+/5Yy6XCIsXG5cdCAgICBcIjEzMDEwOFwiOiBcIuijleWNjuWMulwiLFxuXHQgICAgXCIxMzAxMjFcIjogXCLkupXpmYnljr9cIixcblx0ICAgIFwiMTMwMTIzXCI6IFwi5q2j5a6a5Y6/XCIsXG5cdCAgICBcIjEzMDEyNFwiOiBcIuagvuWfjuWOv1wiLFxuXHQgICAgXCIxMzAxMjVcIjogXCLooYzllJDljr9cIixcblx0ICAgIFwiMTMwMTI2XCI6IFwi54G15a+/5Y6/XCIsXG5cdCAgICBcIjEzMDEyN1wiOiBcIumrmOmCkeWOv1wiLFxuXHQgICAgXCIxMzAxMjhcIjogXCLmt7Hms73ljr9cIixcblx0ICAgIFwiMTMwMTI5XCI6IFwi6LWe55qH5Y6/XCIsXG5cdCAgICBcIjEzMDEzMFwiOiBcIuaXoOaegeWOv1wiLFxuXHQgICAgXCIxMzAxMzFcIjogXCLlubPlsbHljr9cIixcblx0ICAgIFwiMTMwMTMyXCI6IFwi5YWD5rCP5Y6/XCIsXG5cdCAgICBcIjEzMDEzM1wiOiBcIui1teWOv1wiLFxuXHQgICAgXCIxMzAxODFcIjogXCLovpvpm4bluIJcIixcblx0ICAgIFwiMTMwMTgyXCI6IFwi6JeB5Z+O5biCXCIsXG5cdCAgICBcIjEzMDE4M1wiOiBcIuaZi+W3nuW4glwiLFxuXHQgICAgXCIxMzAxODRcIjogXCLmlrDkuZDluIJcIixcblx0ICAgIFwiMTMwMTg1XCI6IFwi6bm/5rOJ5biCXCIsXG5cdCAgICBcIjEzMDE4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzAyMDBcIjogXCLllJDlsbHluIJcIixcblx0ICAgIFwiMTMwMjAyXCI6IFwi6Lev5Y2X5Yy6XCIsXG5cdCAgICBcIjEzMDIwM1wiOiBcIui3r+WMl+WMulwiLFxuXHQgICAgXCIxMzAyMDRcIjogXCLlj6TlhrbljLpcIixcblx0ICAgIFwiMTMwMjA1XCI6IFwi5byA5bmz5Yy6XCIsXG5cdCAgICBcIjEzMDIwN1wiOiBcIuS4sOWNl+WMulwiLFxuXHQgICAgXCIxMzAyMDhcIjogXCLkuLDmtqbljLpcIixcblx0ICAgIFwiMTMwMjIzXCI6IFwi5rum5Y6/XCIsXG5cdCAgICBcIjEzMDIyNFwiOiBcIua7puWNl+WOv1wiLFxuXHQgICAgXCIxMzAyMjVcIjogXCLkuZDkuq3ljr9cIixcblx0ICAgIFwiMTMwMjI3XCI6IFwi6L+B6KW/5Y6/XCIsXG5cdCAgICBcIjEzMDIyOVwiOiBcIueOieeUsOWOv1wiLFxuXHQgICAgXCIxMzAyMzBcIjogXCLmm7nlpoPnlLjljLpcIixcblx0ICAgIFwiMTMwMjgxXCI6IFwi6YG15YyW5biCXCIsXG5cdCAgICBcIjEzMDI4M1wiOiBcIui/geWuieW4glwiLFxuXHQgICAgXCIxMzAyODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwMzAwXCI6IFwi56em55qH5bKb5biCXCIsXG5cdCAgICBcIjEzMDMwMlwiOiBcIua1t+a4r+WMulwiLFxuXHQgICAgXCIxMzAzMDNcIjogXCLlsbHmtbflhbPljLpcIixcblx0ICAgIFwiMTMwMzA0XCI6IFwi5YyX5oi05rKz5Yy6XCIsXG5cdCAgICBcIjEzMDMyMVwiOiBcIumdkum+mea7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIxMzAzMjJcIjogXCLmmIzpu47ljr9cIixcblx0ICAgIFwiMTMwMzIzXCI6IFwi5oqa5a6B5Y6/XCIsXG5cdCAgICBcIjEzMDMyNFwiOiBcIuWNoum+meWOv1wiLFxuXHQgICAgXCIxMzAzOThcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwNDAwXCI6IFwi6YKv6YO45biCXCIsXG5cdCAgICBcIjEzMDQwMlwiOiBcIumCr+WxseWMulwiLFxuXHQgICAgXCIxMzA0MDNcIjogXCLkuJvlj7DljLpcIixcblx0ICAgIFwiMTMwNDA0XCI6IFwi5aSN5YW05Yy6XCIsXG5cdCAgICBcIjEzMDQwNlwiOiBcIuWzsOWzsOefv+WMulwiLFxuXHQgICAgXCIxMzA0MjFcIjogXCLpgq/pg7jljr9cIixcblx0ICAgIFwiMTMwNDIzXCI6IFwi5Li05ryz5Y6/XCIsXG5cdCAgICBcIjEzMDQyNFwiOiBcIuaIkOWuieWOv1wiLFxuXHQgICAgXCIxMzA0MjVcIjogXCLlpKflkI3ljr9cIixcblx0ICAgIFwiMTMwNDI2XCI6IFwi5raJ5Y6/XCIsXG5cdCAgICBcIjEzMDQyN1wiOiBcIuejgeWOv1wiLFxuXHQgICAgXCIxMzA0MjhcIjogXCLogqXkuaHljr9cIixcblx0ICAgIFwiMTMwNDI5XCI6IFwi5rC45bm05Y6/XCIsXG5cdCAgICBcIjEzMDQzMFwiOiBcIumCseWOv1wiLFxuXHQgICAgXCIxMzA0MzFcIjogXCLpuKHms73ljr9cIixcblx0ICAgIFwiMTMwNDMyXCI6IFwi5bm/5bmz5Y6/XCIsXG5cdCAgICBcIjEzMDQzM1wiOiBcIummhumZtuWOv1wiLFxuXHQgICAgXCIxMzA0MzRcIjogXCLprY/ljr9cIixcblx0ICAgIFwiMTMwNDM1XCI6IFwi5puy5ZGo5Y6/XCIsXG5cdCAgICBcIjEzMDQ4MVwiOiBcIuatpuWuieW4glwiLFxuXHQgICAgXCIxMzA0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwNTAwXCI6IFwi6YKi5Y+w5biCXCIsXG5cdCAgICBcIjEzMDUwMlwiOiBcIuahpeS4nOWMulwiLFxuXHQgICAgXCIxMzA1MDNcIjogXCLmoaXopb/ljLpcIixcblx0ICAgIFwiMTMwNTIxXCI6IFwi6YKi5Y+w5Y6/XCIsXG5cdCAgICBcIjEzMDUyMlwiOiBcIuS4tOWfjuWOv1wiLFxuXHQgICAgXCIxMzA1MjNcIjogXCLlhoXkuJjljr9cIixcblx0ICAgIFwiMTMwNTI0XCI6IFwi5p+P5Lmh5Y6/XCIsXG5cdCAgICBcIjEzMDUyNVwiOiBcIumahuWwp+WOv1wiLFxuXHQgICAgXCIxMzA1MjZcIjogXCLku7vljr9cIixcblx0ICAgIFwiMTMwNTI3XCI6IFwi5Y2X5ZKM5Y6/XCIsXG5cdCAgICBcIjEzMDUyOFwiOiBcIuWugeaZi+WOv1wiLFxuXHQgICAgXCIxMzA1MjlcIjogXCLlt6jpub/ljr9cIixcblx0ICAgIFwiMTMwNTMwXCI6IFwi5paw5rKz5Y6/XCIsXG5cdCAgICBcIjEzMDUzMVwiOiBcIuW5v+Wul+WOv1wiLFxuXHQgICAgXCIxMzA1MzJcIjogXCLlubPkuaHljr9cIixcblx0ICAgIFwiMTMwNTMzXCI6IFwi5aiB5Y6/XCIsXG5cdCAgICBcIjEzMDUzNFwiOiBcIua4heays+WOv1wiLFxuXHQgICAgXCIxMzA1MzVcIjogXCLkuLTopb/ljr9cIixcblx0ICAgIFwiMTMwNTgxXCI6IFwi5Y2X5a6r5biCXCIsXG5cdCAgICBcIjEzMDU4MlwiOiBcIuaymeays+W4glwiLFxuXHQgICAgXCIxMzA1ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwNjAwXCI6IFwi5L+d5a6a5biCXCIsXG5cdCAgICBcIjEzMDYwMlwiOiBcIuaWsOW4guWMulwiLFxuXHQgICAgXCIxMzA2MDNcIjogXCLljJfluILljLpcIixcblx0ICAgIFwiMTMwNjA0XCI6IFwi5Y2X5biC5Yy6XCIsXG5cdCAgICBcIjEzMDYyMVwiOiBcIua7oeWfjuWOv1wiLFxuXHQgICAgXCIxMzA2MjJcIjogXCLmuIXoi5Hljr9cIixcblx0ICAgIFwiMTMwNjIzXCI6IFwi5rae5rC05Y6/XCIsXG5cdCAgICBcIjEzMDYyNFwiOiBcIumYnOW5s+WOv1wiLFxuXHQgICAgXCIxMzA2MjVcIjogXCLlvpDmsLTljr9cIixcblx0ICAgIFwiMTMwNjI2XCI6IFwi5a6a5YW05Y6/XCIsXG5cdCAgICBcIjEzMDYyN1wiOiBcIuWUkOWOv1wiLFxuXHQgICAgXCIxMzA2MjhcIjogXCLpq5jpmLPljr9cIixcblx0ICAgIFwiMTMwNjI5XCI6IFwi5a655Z+O5Y6/XCIsXG5cdCAgICBcIjEzMDYzMFwiOiBcIua2nua6kOWOv1wiLFxuXHQgICAgXCIxMzA2MzFcIjogXCLmnJvpg73ljr9cIixcblx0ICAgIFwiMTMwNjMyXCI6IFwi5a6J5paw5Y6/XCIsXG5cdCAgICBcIjEzMDYzM1wiOiBcIuaYk+WOv1wiLFxuXHQgICAgXCIxMzA2MzRcIjogXCLmm7LpmLPljr9cIixcblx0ICAgIFwiMTMwNjM1XCI6IFwi6KCh5Y6/XCIsXG5cdCAgICBcIjEzMDYzNlwiOiBcIumhuuW5s+WOv1wiLFxuXHQgICAgXCIxMzA2MzdcIjogXCLljZrph47ljr9cIixcblx0ICAgIFwiMTMwNjM4XCI6IFwi6ZuE5Y6/XCIsXG5cdCAgICBcIjEzMDY4MVwiOiBcIua2v+W3nuW4glwiLFxuXHQgICAgXCIxMzA2ODJcIjogXCLlrprlt57luIJcIixcblx0ICAgIFwiMTMwNjgzXCI6IFwi5a6J5Zu95biCXCIsXG5cdCAgICBcIjEzMDY4NFwiOiBcIumrmOeikeW6l+W4glwiLFxuXHQgICAgXCIxMzA2OTlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTMwNzAwXCI6IFwi5byg5a625Y+j5biCXCIsXG5cdCAgICBcIjEzMDcwMlwiOiBcIuahpeS4nOWMulwiLFxuXHQgICAgXCIxMzA3MDNcIjogXCLmoaXopb/ljLpcIixcblx0ICAgIFwiMTMwNzA1XCI6IFwi5a6j5YyW5Yy6XCIsXG5cdCAgICBcIjEzMDcwNlwiOiBcIuS4i+iKseWbreWMulwiLFxuXHQgICAgXCIxMzA3MjFcIjogXCLlrqPljJbljr9cIixcblx0ICAgIFwiMTMwNzIyXCI6IFwi5byg5YyX5Y6/XCIsXG5cdCAgICBcIjEzMDcyM1wiOiBcIuW6t+S/neWOv1wiLFxuXHQgICAgXCIxMzA3MjRcIjogXCLmsr3mupDljr9cIixcblx0ICAgIFwiMTMwNzI1XCI6IFwi5bCa5LmJ5Y6/XCIsXG5cdCAgICBcIjEzMDcyNlwiOiBcIuiUmuWOv1wiLFxuXHQgICAgXCIxMzA3MjdcIjogXCLpmLPljp/ljr9cIixcblx0ICAgIFwiMTMwNzI4XCI6IFwi5oCA5a6J5Y6/XCIsXG5cdCAgICBcIjEzMDcyOVwiOiBcIuS4h+WFqOWOv1wiLFxuXHQgICAgXCIxMzA3MzBcIjogXCLmgIDmnaXljr9cIixcblx0ICAgIFwiMTMwNzMxXCI6IFwi5ra/6bm/5Y6/XCIsXG5cdCAgICBcIjEzMDczMlwiOiBcIui1pOWfjuWOv1wiLFxuXHQgICAgXCIxMzA3MzNcIjogXCLltIfnpLzljr9cIixcblx0ICAgIFwiMTMwNzM0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjEzMDgwMFwiOiBcIuaJv+W+t+W4glwiLFxuXHQgICAgXCIxMzA4MDJcIjogXCLlj4zmoaXljLpcIixcblx0ICAgIFwiMTMwODAzXCI6IFwi5Y+M5rum5Yy6XCIsXG5cdCAgICBcIjEzMDgwNFwiOiBcIum5sOaJi+iQpeWtkOefv+WMulwiLFxuXHQgICAgXCIxMzA4MjFcIjogXCLmib/lvrfljr9cIixcblx0ICAgIFwiMTMwODIyXCI6IFwi5YW06ZqG5Y6/XCIsXG5cdCAgICBcIjEzMDgyM1wiOiBcIuW5s+azieWOv1wiLFxuXHQgICAgXCIxMzA4MjRcIjogXCLmu6blubPljr9cIixcblx0ICAgIFwiMTMwODI1XCI6IFwi6ZqG5YyW5Y6/XCIsXG5cdCAgICBcIjEzMDgyNlwiOiBcIuS4sOWugea7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIxMzA4MjdcIjogXCLlrr3ln47mu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMTMwODI4XCI6IFwi5Zu05Zy65ruh5peP6JKZ5Y+k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjEzMDgyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzA5MDBcIjogXCLmsqflt57luIJcIixcblx0ICAgIFwiMTMwOTAyXCI6IFwi5paw5Y2O5Yy6XCIsXG5cdCAgICBcIjEzMDkwM1wiOiBcIui/kOays+WMulwiLFxuXHQgICAgXCIxMzA5MjFcIjogXCLmsqfljr9cIixcblx0ICAgIFwiMTMwOTIyXCI6IFwi6Z2S5Y6/XCIsXG5cdCAgICBcIjEzMDkyM1wiOiBcIuS4nOWFieWOv1wiLFxuXHQgICAgXCIxMzA5MjRcIjogXCLmtbflhbTljr9cIixcblx0ICAgIFwiMTMwOTI1XCI6IFwi55uQ5bGx5Y6/XCIsXG5cdCAgICBcIjEzMDkyNlwiOiBcIuiCg+WugeWOv1wiLFxuXHQgICAgXCIxMzA5MjdcIjogXCLljZfnmq7ljr9cIixcblx0ICAgIFwiMTMwOTI4XCI6IFwi5ZC05qGl5Y6/XCIsXG5cdCAgICBcIjEzMDkyOVwiOiBcIueMruWOv1wiLFxuXHQgICAgXCIxMzA5MzBcIjogXCLlrZ/mnZHlm57ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMTMwOTgxXCI6IFwi5rOK5aS05biCXCIsXG5cdCAgICBcIjEzMDk4MlwiOiBcIuS7u+S4mOW4glwiLFxuXHQgICAgXCIxMzA5ODNcIjogXCLpu4TpqoXluIJcIixcblx0ICAgIFwiMTMwOTg0XCI6IFwi5rKz6Ze05biCXCIsXG5cdCAgICBcIjEzMDk4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzEwMDBcIjogXCLlu4rlnYrluIJcIixcblx0ICAgIFwiMTMxMDAyXCI6IFwi5a6J5qyh5Yy6XCIsXG5cdCAgICBcIjEzMTAwM1wiOiBcIuW5v+mYs+WMulwiLFxuXHQgICAgXCIxMzEwMjJcIjogXCLlm7rlronljr9cIixcblx0ICAgIFwiMTMxMDIzXCI6IFwi5rC45riF5Y6/XCIsXG5cdCAgICBcIjEzMTAyNFwiOiBcIummmeays+WOv1wiLFxuXHQgICAgXCIxMzEwMjVcIjogXCLlpKfln47ljr9cIixcblx0ICAgIFwiMTMxMDI2XCI6IFwi5paH5a6J5Y6/XCIsXG5cdCAgICBcIjEzMTAyOFwiOiBcIuWkp+WOguWbnuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIxMzEwODFcIjogXCLpnLjlt57luIJcIixcblx0ICAgIFwiMTMxMDgyXCI6IFwi5LiJ5rKz5biCXCIsXG5cdCAgICBcIjEzMTA4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxMzExMDBcIjogXCLooaHmsLTluIJcIixcblx0ICAgIFwiMTMxMTAyXCI6IFwi5qGD5Z+O5Yy6XCIsXG5cdCAgICBcIjEzMTEyMVwiOiBcIuaeo+W8uuWOv1wiLFxuXHQgICAgXCIxMzExMjJcIjogXCLmrabpgpHljr9cIixcblx0ICAgIFwiMTMxMTIzXCI6IFwi5q2m5by65Y6/XCIsXG5cdCAgICBcIjEzMTEyNFwiOiBcIumltumYs+WOv1wiLFxuXHQgICAgXCIxMzExMjVcIjogXCLlronlubPljr9cIixcblx0ICAgIFwiMTMxMTI2XCI6IFwi5pWF5Z+O5Y6/XCIsXG5cdCAgICBcIjEzMTEyN1wiOiBcIuaZr+WOv1wiLFxuXHQgICAgXCIxMzExMjhcIjogXCLpmJzln47ljr9cIixcblx0ICAgIFwiMTMxMTgxXCI6IFwi5YaA5bee5biCXCIsXG5cdCAgICBcIjEzMTE4MlwiOiBcIua3seW3nuW4glwiLFxuXHQgICAgXCIxMzExODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwMDAwXCI6IFwi5bGx6KW/55yBXCIsXG5cdCAgICBcIjE0MDEwMFwiOiBcIuWkquWOn+W4glwiLFxuXHQgICAgXCIxNDAxMDVcIjogXCLlsI/lupfljLpcIixcblx0ICAgIFwiMTQwMTA2XCI6IFwi6L+O5rO95Yy6XCIsXG5cdCAgICBcIjE0MDEwN1wiOiBcIuadj+iKseWyreWMulwiLFxuXHQgICAgXCIxNDAxMDhcIjogXCLlsJbojYnlnarljLpcIixcblx0ICAgIFwiMTQwMTA5XCI6IFwi5LiH5p+P5p6X5Yy6XCIsXG5cdCAgICBcIjE0MDExMFwiOiBcIuaZi+a6kOWMulwiLFxuXHQgICAgXCIxNDAxMjFcIjogXCLmuIXlvpDljr9cIixcblx0ICAgIFwiMTQwMTIyXCI6IFwi6Ziz5puy5Y6/XCIsXG5cdCAgICBcIjE0MDEyM1wiOiBcIuWohOeDpuWOv1wiLFxuXHQgICAgXCIxNDAxODFcIjogXCLlj6TkuqTluIJcIixcblx0ICAgIFwiMTQwMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDIwMFwiOiBcIuWkp+WQjOW4glwiLFxuXHQgICAgXCIxNDAyMDJcIjogXCLln47ljLpcIixcblx0ICAgIFwiMTQwMjAzXCI6IFwi55+/5Yy6XCIsXG5cdCAgICBcIjE0MDIxMVwiOiBcIuWNl+mDiuWMulwiLFxuXHQgICAgXCIxNDAyMTJcIjogXCLmlrDojaPljLpcIixcblx0ICAgIFwiMTQwMjIxXCI6IFwi6Ziz6auY5Y6/XCIsXG5cdCAgICBcIjE0MDIyMlwiOiBcIuWkqemVh+WOv1wiLFxuXHQgICAgXCIxNDAyMjNcIjogXCLlub/ngbXljr9cIixcblx0ICAgIFwiMTQwMjI0XCI6IFwi54G15LiY5Y6/XCIsXG5cdCAgICBcIjE0MDIyNVwiOiBcIua1kea6kOWOv1wiLFxuXHQgICAgXCIxNDAyMjZcIjogXCLlt6bkupHljr9cIixcblx0ICAgIFwiMTQwMjI3XCI6IFwi5aSn5ZCM5Y6/XCIsXG5cdCAgICBcIjE0MDIyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDAzMDBcIjogXCLpmLPms4nluIJcIixcblx0ICAgIFwiMTQwMzAyXCI6IFwi5Z+O5Yy6XCIsXG5cdCAgICBcIjE0MDMwM1wiOiBcIuefv+WMulwiLFxuXHQgICAgXCIxNDAzMTFcIjogXCLpg4rljLpcIixcblx0ICAgIFwiMTQwMzIxXCI6IFwi5bmz5a6a5Y6/XCIsXG5cdCAgICBcIjE0MDMyMlwiOiBcIuebguWOv1wiLFxuXHQgICAgXCIxNDAzMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwNDAwXCI6IFwi6ZW/5rK75biCXCIsXG5cdCAgICBcIjE0MDQyMVwiOiBcIumVv+ayu+WOv1wiLFxuXHQgICAgXCIxNDA0MjNcIjogXCLopYTlnqPljr9cIixcblx0ICAgIFwiMTQwNDI0XCI6IFwi5bGv55WZ5Y6/XCIsXG5cdCAgICBcIjE0MDQyNVwiOiBcIuW5s+mhuuWOv1wiLFxuXHQgICAgXCIxNDA0MjZcIjogXCLpu47ln47ljr9cIixcblx0ICAgIFwiMTQwNDI3XCI6IFwi5aO25YWz5Y6/XCIsXG5cdCAgICBcIjE0MDQyOFwiOiBcIumVv+WtkOWOv1wiLFxuXHQgICAgXCIxNDA0MjlcIjogXCLmrabkuaHljr9cIixcblx0ICAgIFwiMTQwNDMwXCI6IFwi5rKB5Y6/XCIsXG5cdCAgICBcIjE0MDQzMVwiOiBcIuaygea6kOWOv1wiLFxuXHQgICAgXCIxNDA0ODFcIjogXCLmvZ7ln47luIJcIixcblx0ICAgIFwiMTQwNDgyXCI6IFwi5Z+O5Yy6XCIsXG5cdCAgICBcIjE0MDQ4M1wiOiBcIumDiuWMulwiLFxuXHQgICAgXCIxNDA0ODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQwNTAwXCI6IFwi5pmL5Z+O5biCXCIsXG5cdCAgICBcIjE0MDUwMlwiOiBcIuWfjuWMulwiLFxuXHQgICAgXCIxNDA1MjFcIjogXCLmsoHmsLTljr9cIixcblx0ICAgIFwiMTQwNTIyXCI6IFwi6Ziz5Z+O5Y6/XCIsXG5cdCAgICBcIjE0MDUyNFwiOiBcIumZteW3neWOv1wiLFxuXHQgICAgXCIxNDA1MjVcIjogXCLms73lt57ljr9cIixcblx0ICAgIFwiMTQwNTgxXCI6IFwi6auY5bmz5biCXCIsXG5cdCAgICBcIjE0MDU4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDA2MDBcIjogXCLmnJTlt57luIJcIixcblx0ICAgIFwiMTQwNjAyXCI6IFwi5pyU5Z+O5Yy6XCIsXG5cdCAgICBcIjE0MDYwM1wiOiBcIuW5s+mygeWMulwiLFxuXHQgICAgXCIxNDA2MjFcIjogXCLlsbHpmLTljr9cIixcblx0ICAgIFwiMTQwNjIyXCI6IFwi5bqU5Y6/XCIsXG5cdCAgICBcIjE0MDYyM1wiOiBcIuWPs+eOieWOv1wiLFxuXHQgICAgXCIxNDA2MjRcIjogXCLmgIDku4Hljr9cIixcblx0ICAgIFwiMTQwNjI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MDcwMFwiOiBcIuaZi+S4reW4glwiLFxuXHQgICAgXCIxNDA3MDJcIjogXCLmpobmrKHljLpcIixcblx0ICAgIFwiMTQwNzIxXCI6IFwi5qaG56S+5Y6/XCIsXG5cdCAgICBcIjE0MDcyMlwiOiBcIuW3puadg+WOv1wiLFxuXHQgICAgXCIxNDA3MjNcIjogXCLlkozpobrljr9cIixcblx0ICAgIFwiMTQwNzI0XCI6IFwi5piU6Ziz5Y6/XCIsXG5cdCAgICBcIjE0MDcyNVwiOiBcIuWvv+mYs+WOv1wiLFxuXHQgICAgXCIxNDA3MjZcIjogXCLlpKrosLfljr9cIixcblx0ICAgIFwiMTQwNzI3XCI6IFwi56WB5Y6/XCIsXG5cdCAgICBcIjE0MDcyOFwiOiBcIuW5s+mBpeWOv1wiLFxuXHQgICAgXCIxNDA3MjlcIjogXCLngbXnn7Pljr9cIixcblx0ICAgIFwiMTQwNzgxXCI6IFwi5LuL5LyR5biCXCIsXG5cdCAgICBcIjE0MDc4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDA4MDBcIjogXCLov5Dln47luIJcIixcblx0ICAgIFwiMTQwODAyXCI6IFwi55uQ5rmW5Yy6XCIsXG5cdCAgICBcIjE0MDgyMVwiOiBcIuS4tOeMl+WOv1wiLFxuXHQgICAgXCIxNDA4MjJcIjogXCLkuIfojaPljr9cIixcblx0ICAgIFwiMTQwODIzXCI6IFwi6Ze75Zac5Y6/XCIsXG5cdCAgICBcIjE0MDgyNFwiOiBcIueot+WxseWOv1wiLFxuXHQgICAgXCIxNDA4MjVcIjogXCLmlrDnu5vljr9cIixcblx0ICAgIFwiMTQwODI2XCI6IFwi57ub5Y6/XCIsXG5cdCAgICBcIjE0MDgyN1wiOiBcIuWeo+absuWOv1wiLFxuXHQgICAgXCIxNDA4MjhcIjogXCLlpI/ljr9cIixcblx0ICAgIFwiMTQwODI5XCI6IFwi5bmz6ZmG5Y6/XCIsXG5cdCAgICBcIjE0MDgzMFwiOiBcIuiKruWfjuWOv1wiLFxuXHQgICAgXCIxNDA4ODFcIjogXCLmsLjmtY7luIJcIixcblx0ICAgIFwiMTQwODgyXCI6IFwi5rKz5rSl5biCXCIsXG5cdCAgICBcIjE0MDg4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNDA5MDBcIjogXCLlv7vlt57luIJcIixcblx0ICAgIFwiMTQwOTAyXCI6IFwi5b+75bqc5Yy6XCIsXG5cdCAgICBcIjE0MDkyMVwiOiBcIuWumuilhOWOv1wiLFxuXHQgICAgXCIxNDA5MjJcIjogXCLkupTlj7Dljr9cIixcblx0ICAgIFwiMTQwOTIzXCI6IFwi5Luj5Y6/XCIsXG5cdCAgICBcIjE0MDkyNFwiOiBcIue5geWzmeWOv1wiLFxuXHQgICAgXCIxNDA5MjVcIjogXCLlroHmrabljr9cIixcblx0ICAgIFwiMTQwOTI2XCI6IFwi6Z2Z5LmQ5Y6/XCIsXG5cdCAgICBcIjE0MDkyN1wiOiBcIuelnuaxoOWOv1wiLFxuXHQgICAgXCIxNDA5MjhcIjogXCLkupTlr6jljr9cIixcblx0ICAgIFwiMTQwOTI5XCI6IFwi5bKi5bKa5Y6/XCIsXG5cdCAgICBcIjE0MDkzMFwiOiBcIuays+absuWOv1wiLFxuXHQgICAgXCIxNDA5MzFcIjogXCLkv53lvrfljr9cIixcblx0ICAgIFwiMTQwOTMyXCI6IFwi5YGP5YWz5Y6/XCIsXG5cdCAgICBcIjE0MDk4MVwiOiBcIuWOn+W5s+W4glwiLFxuXHQgICAgXCIxNDA5ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTQxMDAwXCI6IFwi5Li05rG+5biCXCIsXG5cdCAgICBcIjE0MTAwMlwiOiBcIuWwp+mDveWMulwiLFxuXHQgICAgXCIxNDEwMjFcIjogXCLmm7LmsoPljr9cIixcblx0ICAgIFwiMTQxMDIyXCI6IFwi57+85Z+O5Y6/XCIsXG5cdCAgICBcIjE0MTAyM1wiOiBcIuilhOaxvuWOv1wiLFxuXHQgICAgXCIxNDEwMjRcIjogXCLmtKrmtJ7ljr9cIixcblx0ICAgIFwiMTQxMDI1XCI6IFwi5Y+k5Y6/XCIsXG5cdCAgICBcIjE0MTAyNlwiOiBcIuWuieazveWOv1wiLFxuXHQgICAgXCIxNDEwMjdcIjogXCLmta7lsbHljr9cIixcblx0ICAgIFwiMTQxMDI4XCI6IFwi5ZCJ5Y6/XCIsXG5cdCAgICBcIjE0MTAyOVwiOiBcIuS5oeWugeWOv1wiLFxuXHQgICAgXCIxNDEwMzBcIjogXCLlpKflroHljr9cIixcblx0ICAgIFwiMTQxMDMxXCI6IFwi6Zqw5Y6/XCIsXG5cdCAgICBcIjE0MTAzMlwiOiBcIuawuOWSjOWOv1wiLFxuXHQgICAgXCIxNDEwMzNcIjogXCLokrLljr9cIixcblx0ICAgIFwiMTQxMDM0XCI6IFwi5rG+6KW/5Y6/XCIsXG5cdCAgICBcIjE0MTA4MVwiOiBcIuS+r+mprOW4glwiLFxuXHQgICAgXCIxNDEwODJcIjogXCLpnI3lt57luIJcIixcblx0ICAgIFwiMTQxMDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE0MTEwMFwiOiBcIuWQleaigeW4glwiLFxuXHQgICAgXCIxNDExMDJcIjogXCLnprvnn7PljLpcIixcblx0ICAgIFwiMTQxMTIxXCI6IFwi5paH5rC05Y6/XCIsXG5cdCAgICBcIjE0MTEyMlwiOiBcIuS6pOWfjuWOv1wiLFxuXHQgICAgXCIxNDExMjNcIjogXCLlhbTljr9cIixcblx0ICAgIFwiMTQxMTI0XCI6IFwi5Li05Y6/XCIsXG5cdCAgICBcIjE0MTEyNVwiOiBcIuafs+ael+WOv1wiLFxuXHQgICAgXCIxNDExMjZcIjogXCLnn7Pmpbzljr9cIixcblx0ICAgIFwiMTQxMTI3XCI6IFwi5bKa5Y6/XCIsXG5cdCAgICBcIjE0MTEyOFwiOiBcIuaWueWxseWOv1wiLFxuXHQgICAgXCIxNDExMjlcIjogXCLkuK3pmLPljr9cIixcblx0ICAgIFwiMTQxMTMwXCI6IFwi5Lqk5Y+j5Y6/XCIsXG5cdCAgICBcIjE0MTE4MVwiOiBcIuWtneS5ieW4glwiLFxuXHQgICAgXCIxNDExODJcIjogXCLmsb7pmLPluIJcIixcblx0ICAgIFwiMTQxMTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDAwMFwiOiBcIuWGheiSmeWPpOiHquayu+WMulwiLFxuXHQgICAgXCIxNTAxMDBcIjogXCLlkbzlkozmtannibnluIJcIixcblx0ICAgIFwiMTUwMTAyXCI6IFwi5paw5Z+O5Yy6XCIsXG5cdCAgICBcIjE1MDEwM1wiOiBcIuWbnuawkeWMulwiLFxuXHQgICAgXCIxNTAxMDRcIjogXCLnjonms4nljLpcIixcblx0ICAgIFwiMTUwMTA1XCI6IFwi6LWb572V5Yy6XCIsXG5cdCAgICBcIjE1MDEyMVwiOiBcIuWcn+m7mOeJueW3puaXl1wiLFxuXHQgICAgXCIxNTAxMjJcIjogXCLmiZjlhYvmiZjljr9cIixcblx0ICAgIFwiMTUwMTIzXCI6IFwi5ZKM5p6X5qC85bCU5Y6/XCIsXG5cdCAgICBcIjE1MDEyNFwiOiBcIua4heawtOays+WOv1wiLFxuXHQgICAgXCIxNTAxMjVcIjogXCLmrablt53ljr9cIixcblx0ICAgIFwiMTUwMTI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDIwMFwiOiBcIuWMheWktOW4glwiLFxuXHQgICAgXCIxNTAyMDJcIjogXCLkuJzmsrPljLpcIixcblx0ICAgIFwiMTUwMjAzXCI6IFwi5piG6YO95LuR5Yy6XCIsXG5cdCAgICBcIjE1MDIwNFwiOiBcIumdkuWxseWMulwiLFxuXHQgICAgXCIxNTAyMDVcIjogXCLnn7Pmi5DljLpcIixcblx0ICAgIFwiMTUwMjA2XCI6IFwi55m95LqR6YSC5Y2a55+/5Yy6XCIsXG5cdCAgICBcIjE1MDIwN1wiOiBcIuS5neWOn+WMulwiLFxuXHQgICAgXCIxNTAyMjFcIjogXCLlnJ/pu5jnibnlj7Pml5dcIixcblx0ICAgIFwiMTUwMjIyXCI6IFwi5Zu66Ziz5Y6/XCIsXG5cdCAgICBcIjE1MDIyM1wiOiBcIui+vuWwlOe9leiMguaYjuWuieiBlOWQiOaXl1wiLFxuXHQgICAgXCIxNTAyMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwMzAwXCI6IFwi5LmM5rW35biCXCIsXG5cdCAgICBcIjE1MDMwMlwiOiBcIua1t+WLg+a5vuWMulwiLFxuXHQgICAgXCIxNTAzMDNcIjogXCLmtbfljZfljLpcIixcblx0ICAgIFwiMTUwMzA0XCI6IFwi5LmM6L6+5Yy6XCIsXG5cdCAgICBcIjE1MDMwNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTA0MDBcIjogXCLotaTls7DluIJcIixcblx0ICAgIFwiMTUwNDAyXCI6IFwi57qi5bGx5Yy6XCIsXG5cdCAgICBcIjE1MDQwM1wiOiBcIuWFg+WuneWxseWMulwiLFxuXHQgICAgXCIxNTA0MDRcIjogXCLmnb7lsbHljLpcIixcblx0ICAgIFwiMTUwNDIxXCI6IFwi6Zi/6bKB56eR5bCU5rKB5peXXCIsXG5cdCAgICBcIjE1MDQyMlwiOiBcIuW3tOael+W3puaXl1wiLFxuXHQgICAgXCIxNTA0MjNcIjogXCLlt7Tmnpflj7Pml5dcIixcblx0ICAgIFwiMTUwNDI0XCI6IFwi5p6X6KW/5Y6/XCIsXG5cdCAgICBcIjE1MDQyNVwiOiBcIuWFi+S7gOWFi+iFvuaXl1wiLFxuXHQgICAgXCIxNTA0MjZcIjogXCLnv4HniZvnibnml5dcIixcblx0ICAgIFwiMTUwNDI4XCI6IFwi5ZaA5ZaH5rKB5peXXCIsXG5cdCAgICBcIjE1MDQyOVwiOiBcIuWugeWfjuWOv1wiLFxuXHQgICAgXCIxNTA0MzBcIjogXCLmlZbmsYnml5dcIixcblx0ICAgIFwiMTUwNDMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDUwMFwiOiBcIumAmui+veW4glwiLFxuXHQgICAgXCIxNTA1MDJcIjogXCLnp5HlsJTmsoHljLpcIixcblx0ICAgIFwiMTUwNTIxXCI6IFwi56eR5bCU5rKB5bem57+85Lit5peXXCIsXG5cdCAgICBcIjE1MDUyMlwiOiBcIuenkeWwlOaygeW3pue/vOWQjuaXl1wiLFxuXHQgICAgXCIxNTA1MjNcIjogXCLlvIDpsoHljr9cIixcblx0ICAgIFwiMTUwNTI0XCI6IFwi5bqT5Lym5peXXCIsXG5cdCAgICBcIjE1MDUyNVwiOiBcIuWliOabvOaXl1wiLFxuXHQgICAgXCIxNTA1MjZcIjogXCLmiY7psoHnibnml5dcIixcblx0ICAgIFwiMTUwNTgxXCI6IFwi6ZyN5p6X6YOt5YuS5biCXCIsXG5cdCAgICBcIjE1MDU4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTA2MDBcIjogXCLphILlsJTlpJrmlq/luIJcIixcblx0ICAgIFwiMTUwNjAyXCI6IFwi5Lic6IOc5Yy6XCIsXG5cdCAgICBcIjE1MDYyMVwiOiBcIui+vuaLieeJueaXl1wiLFxuXHQgICAgXCIxNTA2MjJcIjogXCLlh4bmoLzlsJTml5dcIixcblx0ICAgIFwiMTUwNjIzXCI6IFwi6YSC5omY5YWL5YmN5peXXCIsXG5cdCAgICBcIjE1MDYyNFwiOiBcIumEguaJmOWFi+aXl1wiLFxuXHQgICAgXCIxNTA2MjVcIjogXCLmna3plKbml5dcIixcblx0ICAgIFwiMTUwNjI2XCI6IFwi5LmM5a6h5peXXCIsXG5cdCAgICBcIjE1MDYyN1wiOiBcIuS8iumHkemcjea0m+aXl1wiLFxuXHQgICAgXCIxNTA2MjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUwNzAwXCI6IFwi5ZG85Lym6LSd5bCU5biCXCIsXG5cdCAgICBcIjE1MDcwMlwiOiBcIua1t+aLieWwlOWMulwiLFxuXHQgICAgXCIxNTA3MDNcIjogXCLmiY7otYnor7rlsJTljLpcIixcblx0ICAgIFwiMTUwNzIxXCI6IFwi6Zi/6I2j5peXXCIsXG5cdCAgICBcIjE1MDcyMlwiOiBcIuiOq+WKm+i+vueTpui+vuaWoeWwlOaXj+iHquayu+aXl1wiLFxuXHQgICAgXCIxNTA3MjNcIjogXCLphILkvKbmmKXoh6rmsrvml5dcIixcblx0ICAgIFwiMTUwNzI0XCI6IFwi6YSC5rip5YWL5peP6Ieq5rK75peXXCIsXG5cdCAgICBcIjE1MDcyNVwiOiBcIumZiOW3tOWwlOiZjuaXl1wiLFxuXHQgICAgXCIxNTA3MjZcIjogXCLmlrDlt7TlsJTomY7lt6bml5dcIixcblx0ICAgIFwiMTUwNzI3XCI6IFwi5paw5be05bCU6JmO5Y+z5peXXCIsXG5cdCAgICBcIjE1MDc4MVwiOiBcIua7oea0sumHjOW4glwiLFxuXHQgICAgXCIxNTA3ODJcIjogXCLniZnlhYvnn7PluIJcIixcblx0ICAgIFwiMTUwNzgzXCI6IFwi5omO5YWw5bGv5biCXCIsXG5cdCAgICBcIjE1MDc4NFwiOiBcIumineWwlOWPpOe6s+W4glwiLFxuXHQgICAgXCIxNTA3ODVcIjogXCLmoLnmsrPluIJcIixcblx0ICAgIFwiMTUwNzg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDgwMFwiOiBcIuW3tOW9pua3luWwlOW4glwiLFxuXHQgICAgXCIxNTA4MDJcIjogXCLkuLTmsrPljLpcIixcblx0ICAgIFwiMTUwODIxXCI6IFwi5LqU5Y6f5Y6/XCIsXG5cdCAgICBcIjE1MDgyMlwiOiBcIuejtOWPo+WOv1wiLFxuXHQgICAgXCIxNTA4MjNcIjogXCLkuYzmi4nnibnliY3ml5dcIixcblx0ICAgIFwiMTUwODI0XCI6IFwi5LmM5ouJ54m55Lit5peXXCIsXG5cdCAgICBcIjE1MDgyNVwiOiBcIuS5jOaLieeJueWQjuaXl1wiLFxuXHQgICAgXCIxNTA4MjZcIjogXCLmna3plKblkI7ml5dcIixcblx0ICAgIFwiMTUwODI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MDkwMFwiOiBcIuS5jOWFsOWvn+W4g+W4glwiLFxuXHQgICAgXCIxNTA5MDJcIjogXCLpm4blroHljLpcIixcblx0ICAgIFwiMTUwOTIxXCI6IFwi5Y2T6LWE5Y6/XCIsXG5cdCAgICBcIjE1MDkyMlwiOiBcIuWMluW+t+WOv1wiLFxuXHQgICAgXCIxNTA5MjNcIjogXCLllYbpg73ljr9cIixcblx0ICAgIFwiMTUwOTI0XCI6IFwi5YW05ZKM5Y6/XCIsXG5cdCAgICBcIjE1MDkyNVwiOiBcIuWHieWfjuWOv1wiLFxuXHQgICAgXCIxNTA5MjZcIjogXCLlr5/lk4jlsJTlj7Pnv7zliY3ml5dcIixcblx0ICAgIFwiMTUwOTI3XCI6IFwi5a+f5ZOI5bCU5Y+z57+85Lit5peXXCIsXG5cdCAgICBcIjE1MDkyOFwiOiBcIuWvn+WTiOWwlOWPs+e/vOWQjuaXl1wiLFxuXHQgICAgXCIxNTA5MjlcIjogXCLlm5vlrZDnjovml5dcIixcblx0ICAgIFwiMTUwOTgxXCI6IFwi5Liw6ZWH5biCXCIsXG5cdCAgICBcIjE1MDk4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIxNTIyMDBcIjogXCLlhbTlronnm59cIixcblx0ICAgIFwiMTUyMjAxXCI6IFwi5LmM5YWw5rWp54m55biCXCIsXG5cdCAgICBcIjE1MjIwMlwiOiBcIumYv+WwlOWxseW4glwiLFxuXHQgICAgXCIxNTIyMjFcIjogXCLnp5HlsJTmsoHlj7Pnv7zliY3ml5dcIixcblx0ICAgIFwiMTUyMjIyXCI6IFwi56eR5bCU5rKB5Y+z57+85Lit5peXXCIsXG5cdCAgICBcIjE1MjIyM1wiOiBcIuaJjui1ieeJueaXl1wiLFxuXHQgICAgXCIxNTIyMjRcIjogXCLnqoHms4nljr9cIixcblx0ICAgIFwiMTUyMjI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjE1MjUwMFwiOiBcIumUoeael+mDreWLkuebn1wiLFxuXHQgICAgXCIxNTI1MDFcIjogXCLkuozov57mtannibnluIJcIixcblx0ICAgIFwiMTUyNTAyXCI6IFwi6ZSh5p6X5rWp54m55biCXCIsXG5cdCAgICBcIjE1MjUyMlwiOiBcIumYv+W3tOWYjuaXl1wiLFxuXHQgICAgXCIxNTI1MjNcIjogXCLoi4/lsLznibnlt6bml5dcIixcblx0ICAgIFwiMTUyNTI0XCI6IFwi6IuP5bC854m55Y+z5peXXCIsXG5cdCAgICBcIjE1MjUyNVwiOiBcIuS4nOS5jOePoOephuaygeaXl1wiLFxuXHQgICAgXCIxNTI1MjZcIjogXCLopb/kuYznj6DnqYbmsoHml5dcIixcblx0ICAgIFwiMTUyNTI3XCI6IFwi5aSq5LuG5a+65peXXCIsXG5cdCAgICBcIjE1MjUyOFwiOiBcIumVtum7hOaXl1wiLFxuXHQgICAgXCIxNTI1MjlcIjogXCLmraPplbbnmb3ml5dcIixcblx0ICAgIFwiMTUyNTMwXCI6IFwi5q2j6JOd5peXXCIsXG5cdCAgICBcIjE1MjUzMVwiOiBcIuWkmuS8puWOv1wiLFxuXHQgICAgXCIxNTI1MzJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMTUyOTAwXCI6IFwi6Zi/5ouJ5ZaE55ufXCIsXG5cdCAgICBcIjE1MjkyMVwiOiBcIumYv+aLieWWhOW3puaXl1wiLFxuXHQgICAgXCIxNTI5MjJcIjogXCLpmL/mi4nlloTlj7Pml5dcIixcblx0ICAgIFwiMTUyOTIzXCI6IFwi6aKd5rWO57qz5peXXCIsXG5cdCAgICBcIjE1MjkyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTAwMDBcIjogXCLovr3lroHnnIFcIixcblx0ICAgIFwiMjEwMTAwXCI6IFwi5rKI6Ziz5biCXCIsXG5cdCAgICBcIjIxMDEwMlwiOiBcIuWSjOW5s+WMulwiLFxuXHQgICAgXCIyMTAxMDNcIjogXCLmsojmsrPljLpcIixcblx0ICAgIFwiMjEwMTA0XCI6IFwi5aSn5Lic5Yy6XCIsXG5cdCAgICBcIjIxMDEwNVwiOiBcIueah+WnkeWMulwiLFxuXHQgICAgXCIyMTAxMDZcIjogXCLpk4Hopb/ljLpcIixcblx0ICAgIFwiMjEwMTExXCI6IFwi6IuP5a625bGv5Yy6XCIsXG5cdCAgICBcIjIxMDExMlwiOiBcIuS4nOmZteWMulwiLFxuXHQgICAgXCIyMTAxMTNcIjogXCLmlrDln47lrZDljLpcIixcblx0ICAgIFwiMjEwMTE0XCI6IFwi5LqO5rSq5Yy6XCIsXG5cdCAgICBcIjIxMDEyMlwiOiBcIui+veS4reWOv1wiLFxuXHQgICAgXCIyMTAxMjNcIjogXCLlurflubPljr9cIixcblx0ICAgIFwiMjEwMTI0XCI6IFwi5rOV5bqT5Y6/XCIsXG5cdCAgICBcIjIxMDE4MVwiOiBcIuaWsOawkeW4glwiLFxuXHQgICAgXCIyMTAxODRcIjogXCLmsojljJfmlrDljLpcIixcblx0ICAgIFwiMjEwMTg1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDIwMFwiOiBcIuWkp+i/nuW4glwiLFxuXHQgICAgXCIyMTAyMDJcIjogXCLkuK3lsbHljLpcIixcblx0ICAgIFwiMjEwMjAzXCI6IFwi6KW/5bKX5Yy6XCIsXG5cdCAgICBcIjIxMDIwNFwiOiBcIuaymeays+WPo+WMulwiLFxuXHQgICAgXCIyMTAyMTFcIjogXCLnlJjkupXlrZDljLpcIixcblx0ICAgIFwiMjEwMjEyXCI6IFwi5peF6aG65Y+j5Yy6XCIsXG5cdCAgICBcIjIxMDIxM1wiOiBcIumHkeW3nuWMulwiLFxuXHQgICAgXCIyMTAyMjRcIjogXCLplb/mtbfljr9cIixcblx0ICAgIFwiMjEwMjgxXCI6IFwi55Om5oi/5bqX5biCXCIsXG5cdCAgICBcIjIxMDI4MlwiOiBcIuaZruWFsOW6l+W4glwiLFxuXHQgICAgXCIyMTAyODNcIjogXCLluoTmsrPluIJcIixcblx0ICAgIFwiMjEwMjk4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDMwMFwiOiBcIumejeWxseW4glwiLFxuXHQgICAgXCIyMTAzMDJcIjogXCLpk4HkuJzljLpcIixcblx0ICAgIFwiMjEwMzAzXCI6IFwi6ZOB6KW/5Yy6XCIsXG5cdCAgICBcIjIxMDMwNFwiOiBcIueri+WxseWMulwiLFxuXHQgICAgXCIyMTAzMTFcIjogXCLljYPlsbHljLpcIixcblx0ICAgIFwiMjEwMzIxXCI6IFwi5Y+w5a6J5Y6/XCIsXG5cdCAgICBcIjIxMDMyM1wiOiBcIuWyq+Wyqea7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTAzODFcIjogXCLmtbfln47luIJcIixcblx0ICAgIFwiMjEwMzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDQwMFwiOiBcIuaKmumhuuW4glwiLFxuXHQgICAgXCIyMTA0MDJcIjogXCLmlrDmiprljLpcIixcblx0ICAgIFwiMjEwNDAzXCI6IFwi5Lic5rSy5Yy6XCIsXG5cdCAgICBcIjIxMDQwNFwiOiBcIuacm+iKseWMulwiLFxuXHQgICAgXCIyMTA0MTFcIjogXCLpobrln47ljLpcIixcblx0ICAgIFwiMjEwNDIxXCI6IFwi5oqa6aG65Y6/XCIsXG5cdCAgICBcIjIxMDQyMlwiOiBcIuaWsOWuvua7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTA0MjNcIjogXCLmuIXljp/mu6Hml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjEwNDI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDUwMFwiOiBcIuacrOa6quW4glwiLFxuXHQgICAgXCIyMTA1MDJcIjogXCLlubPlsbHljLpcIixcblx0ICAgIFwiMjEwNTAzXCI6IFwi5rqq5rmW5Yy6XCIsXG5cdCAgICBcIjIxMDUwNFwiOiBcIuaYjuWxseWMulwiLFxuXHQgICAgXCIyMTA1MDVcIjogXCLljZfoiqzljLpcIixcblx0ICAgIFwiMjEwNTIxXCI6IFwi5pys5rqq5ruh5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMDUyMlwiOiBcIuahk+S7gea7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTA1MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjEwNjAwXCI6IFwi5Li55Lic5biCXCIsXG5cdCAgICBcIjIxMDYwMlwiOiBcIuWFg+WuneWMulwiLFxuXHQgICAgXCIyMTA2MDNcIjogXCLmjK/lhbTljLpcIixcblx0ICAgIFwiMjEwNjA0XCI6IFwi5oyv5a6J5Yy6XCIsXG5cdCAgICBcIjIxMDYyNFwiOiBcIuWuveeUuOa7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTA2ODFcIjogXCLkuJzmuK/luIJcIixcblx0ICAgIFwiMjEwNjgyXCI6IFwi5Yek5Z+O5biCXCIsXG5cdCAgICBcIjIxMDY4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTA3MDBcIjogXCLplKblt57luIJcIixcblx0ICAgIFwiMjEwNzAyXCI6IFwi5Y+k5aGU5Yy6XCIsXG5cdCAgICBcIjIxMDcwM1wiOiBcIuWHjOays+WMulwiLFxuXHQgICAgXCIyMTA3MTFcIjogXCLlpKrlkozljLpcIixcblx0ICAgIFwiMjEwNzI2XCI6IFwi6buR5bGx5Y6/XCIsXG5cdCAgICBcIjIxMDcyN1wiOiBcIuS5ieWOv1wiLFxuXHQgICAgXCIyMTA3ODFcIjogXCLlh4zmtbfluIJcIixcblx0ICAgIFwiMjEwNzgyXCI6IFwi5YyX6ZWH5biCXCIsXG5cdCAgICBcIjIxMDc4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMTA4MDBcIjogXCLokKXlj6PluIJcIixcblx0ICAgIFwiMjEwODAyXCI6IFwi56uZ5YmN5Yy6XCIsXG5cdCAgICBcIjIxMDgwM1wiOiBcIuilv+W4guWMulwiLFxuXHQgICAgXCIyMTA4MDRcIjogXCLpsoXpsbzlnIjljLpcIixcblx0ICAgIFwiMjEwODExXCI6IFwi6ICB6L655Yy6XCIsXG5cdCAgICBcIjIxMDg4MVwiOiBcIuebluW3nuW4glwiLFxuXHQgICAgXCIyMTA4ODJcIjogXCLlpKfnn7PmoaXluIJcIixcblx0ICAgIFwiMjEwODgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMDkwMFwiOiBcIumYnOaWsOW4glwiLFxuXHQgICAgXCIyMTA5MDJcIjogXCLmtbflt57ljLpcIixcblx0ICAgIFwiMjEwOTAzXCI6IFwi5paw6YKx5Yy6XCIsXG5cdCAgICBcIjIxMDkwNFwiOiBcIuWkquW5s+WMulwiLFxuXHQgICAgXCIyMTA5MDVcIjogXCLmuIXmsrPpl6jljLpcIixcblx0ICAgIFwiMjEwOTExXCI6IFwi57uG5rKz5Yy6XCIsXG5cdCAgICBcIjIxMDkyMVwiOiBcIumYnOaWsOiSmeWPpOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMTA5MjJcIjogXCLlvbDmrabljr9cIixcblx0ICAgIFwiMjEwOTIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMTAwMFwiOiBcIui+vemYs+W4glwiLFxuXHQgICAgXCIyMTEwMDJcIjogXCLnmb3loZTljLpcIixcblx0ICAgIFwiMjExMDAzXCI6IFwi5paH5Zyj5Yy6XCIsXG5cdCAgICBcIjIxMTAwNFwiOiBcIuWuj+S8n+WMulwiLFxuXHQgICAgXCIyMTEwMDVcIjogXCLlvJPplb/lsq3ljLpcIixcblx0ICAgIFwiMjExMDExXCI6IFwi5aSq5a2Q5rKz5Yy6XCIsXG5cdCAgICBcIjIxMTAyMVwiOiBcIui+vemYs+WOv1wiLFxuXHQgICAgXCIyMTEwODFcIjogXCLnga/loZTluIJcIixcblx0ICAgIFwiMjExMDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMTEwMFwiOiBcIuebmOmUpuW4glwiLFxuXHQgICAgXCIyMTExMDJcIjogXCLlj4zlj7DlrZDljLpcIixcblx0ICAgIFwiMjExMTAzXCI6IFwi5YW06ZqG5Y+w5Yy6XCIsXG5cdCAgICBcIjIxMTEyMVwiOiBcIuWkp+a0vOWOv1wiLFxuXHQgICAgXCIyMTExMjJcIjogXCLnm5jlsbHljr9cIixcblx0ICAgIFwiMjExMTIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMTIwMFwiOiBcIumTgeWyreW4glwiLFxuXHQgICAgXCIyMTEyMDJcIjogXCLpk7blt57ljLpcIixcblx0ICAgIFwiMjExMjA0XCI6IFwi5riF5rKz5Yy6XCIsXG5cdCAgICBcIjIxMTIyMVwiOiBcIumTgeWyreWOv1wiLFxuXHQgICAgXCIyMTEyMjNcIjogXCLopb/kuLDljr9cIixcblx0ICAgIFwiMjExMjI0XCI6IFwi5piM5Zu+5Y6/XCIsXG5cdCAgICBcIjIxMTI4MVwiOiBcIuiwg+WFteWxseW4glwiLFxuXHQgICAgXCIyMTEyODJcIjogXCLlvIDljp/luIJcIixcblx0ICAgIFwiMjExMjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMTMwMFwiOiBcIuacnemYs+W4glwiLFxuXHQgICAgXCIyMTEzMDJcIjogXCLlj4zloZTljLpcIixcblx0ICAgIFwiMjExMzAzXCI6IFwi6b6Z5Z+O5Yy6XCIsXG5cdCAgICBcIjIxMTMyMVwiOiBcIuacnemYs+WOv1wiLFxuXHQgICAgXCIyMTEzMjJcIjogXCLlu7rlubPljr9cIixcblx0ICAgIFwiMjExMzI0XCI6IFwi5ZaA5ZaH5rKB5bem57+86JKZ5Y+k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIxMTM4MVwiOiBcIuWMl+elqOW4glwiLFxuXHQgICAgXCIyMTEzODJcIjogXCLlh4zmupDluIJcIixcblx0ICAgIFwiMjExMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIxMTQwMFwiOiBcIuiRq+iKpuWym+W4glwiLFxuXHQgICAgXCIyMTE0MDJcIjogXCLov57lsbHljLpcIixcblx0ICAgIFwiMjExNDAzXCI6IFwi6b6Z5riv5Yy6XCIsXG5cdCAgICBcIjIxMTQwNFwiOiBcIuWNl+elqOWMulwiLFxuXHQgICAgXCIyMTE0MjFcIjogXCLnu6XkuK3ljr9cIixcblx0ICAgIFwiMjExNDIyXCI6IFwi5bu65piM5Y6/XCIsXG5cdCAgICBcIjIxMTQ4MVwiOiBcIuWFtOWfjuW4glwiLFxuXHQgICAgXCIyMTE0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwMDAwXCI6IFwi5ZCJ5p6X55yBXCIsXG5cdCAgICBcIjIyMDEwMFwiOiBcIumVv+aYpeW4glwiLFxuXHQgICAgXCIyMjAxMDJcIjogXCLljZflhbPljLpcIixcblx0ICAgIFwiMjIwMTAzXCI6IFwi5a695Z+O5Yy6XCIsXG5cdCAgICBcIjIyMDEwNFwiOiBcIuacnemYs+WMulwiLFxuXHQgICAgXCIyMjAxMDVcIjogXCLkuozpgZPljLpcIixcblx0ICAgIFwiMjIwMTA2XCI6IFwi57u/5Zut5Yy6XCIsXG5cdCAgICBcIjIyMDExMlwiOiBcIuWPjOmYs+WMulwiLFxuXHQgICAgXCIyMjAxMjJcIjogXCLlhpzlronljr9cIixcblx0ICAgIFwiMjIwMTgxXCI6IFwi5Lmd5Y+w5biCXCIsXG5cdCAgICBcIjIyMDE4MlwiOiBcIuamhuagkeW4glwiLFxuXHQgICAgXCIyMjAxODNcIjogXCLlvrfmg6DluIJcIixcblx0ICAgIFwiMjIwMTg4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDIwMFwiOiBcIuWQieael+W4glwiLFxuXHQgICAgXCIyMjAyMDJcIjogXCLmmIzpgpHljLpcIixcblx0ICAgIFwiMjIwMjAzXCI6IFwi6b6Z5r2t5Yy6XCIsXG5cdCAgICBcIjIyMDIwNFwiOiBcIuiIueiQpeWMulwiLFxuXHQgICAgXCIyMjAyMTFcIjogXCLkuLDmu6HljLpcIixcblx0ICAgIFwiMjIwMjIxXCI6IFwi5rC45ZCJ5Y6/XCIsXG5cdCAgICBcIjIyMDI4MVwiOiBcIuibn+ays+W4glwiLFxuXHQgICAgXCIyMjAyODJcIjogXCLmoabnlLjluIJcIixcblx0ICAgIFwiMjIwMjgzXCI6IFwi6IiS5YWw5biCXCIsXG5cdCAgICBcIjIyMDI4NFwiOiBcIuejkOefs+W4glwiLFxuXHQgICAgXCIyMjAyODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIwMzAwXCI6IFwi5Zub5bmz5biCXCIsXG5cdCAgICBcIjIyMDMwMlwiOiBcIumTgeilv+WMulwiLFxuXHQgICAgXCIyMjAzMDNcIjogXCLpk4HkuJzljLpcIixcblx0ICAgIFwiMjIwMzIyXCI6IFwi5qKo5qCR5Y6/XCIsXG5cdCAgICBcIjIyMDMyM1wiOiBcIuS8iumAmua7oeaXj+iHquayu+WOv1wiLFxuXHQgICAgXCIyMjAzODFcIjogXCLlhazkuLvlsq3luIJcIixcblx0ICAgIFwiMjIwMzgyXCI6IFwi5Y+M6L695biCXCIsXG5cdCAgICBcIjIyMDM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjA0MDBcIjogXCLovr3mupDluIJcIixcblx0ICAgIFwiMjIwNDAyXCI6IFwi6b6Z5bGx5Yy6XCIsXG5cdCAgICBcIjIyMDQwM1wiOiBcIuilv+WuieWMulwiLFxuXHQgICAgXCIyMjA0MjFcIjogXCLkuJzkuLDljr9cIixcblx0ICAgIFwiMjIwNDIyXCI6IFwi5Lic6L695Y6/XCIsXG5cdCAgICBcIjIyMDQyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjA1MDBcIjogXCLpgJrljJbluIJcIixcblx0ICAgIFwiMjIwNTAyXCI6IFwi5Lic5piM5Yy6XCIsXG5cdCAgICBcIjIyMDUwM1wiOiBcIuS6jOmBk+axn+WMulwiLFxuXHQgICAgXCIyMjA1MjFcIjogXCLpgJrljJbljr9cIixcblx0ICAgIFwiMjIwNTIzXCI6IFwi6L6J5Y2X5Y6/XCIsXG5cdCAgICBcIjIyMDUyNFwiOiBcIuafs+ays+WOv1wiLFxuXHQgICAgXCIyMjA1ODFcIjogXCLmooXmsrPlj6PluIJcIixcblx0ICAgIFwiMjIwNTgyXCI6IFwi6ZuG5a6J5biCXCIsXG5cdCAgICBcIjIyMDU4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjA2MDBcIjogXCLnmb3lsbHluIJcIixcblx0ICAgIFwiMjIwNjAyXCI6IFwi5rWR5rGf5Yy6XCIsXG5cdCAgICBcIjIyMDYyMVwiOiBcIuaKmuadvuWOv1wiLFxuXHQgICAgXCIyMjA2MjJcIjogXCLpnZblrofljr9cIixcblx0ICAgIFwiMjIwNjIzXCI6IFwi6ZW/55m95pyd6bKc5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIyMDYyNVwiOiBcIuaxn+a6kOWMulwiLFxuXHQgICAgXCIyMjA2ODFcIjogXCLkuLTmsZ/luIJcIixcblx0ICAgIFwiMjIwNjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIyMDcwMFwiOiBcIuadvuWOn+W4glwiLFxuXHQgICAgXCIyMjA3MDJcIjogXCLlroHmsZ/ljLpcIixcblx0ICAgIFwiMjIwNzIxXCI6IFwi5YmN6YOt5bCU572X5pav6JKZ5Y+k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjIyMDcyMlwiOiBcIumVv+WyreWOv1wiLFxuXHQgICAgXCIyMjA3MjNcIjogXCLkub7lronljr9cIixcblx0ICAgIFwiMjIwNzI0XCI6IFwi5om25L2Z5biCXCIsXG5cdCAgICBcIjIyMDcyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMjA4MDBcIjogXCLnmb3ln47luIJcIixcblx0ICAgIFwiMjIwODAyXCI6IFwi5rSu5YyX5Yy6XCIsXG5cdCAgICBcIjIyMDgyMVwiOiBcIumVh+i1ieWOv1wiLFxuXHQgICAgXCIyMjA4MjJcIjogXCLpgJrmpobljr9cIixcblx0ICAgIFwiMjIwODgxXCI6IFwi5rSu5Y2X5biCXCIsXG5cdCAgICBcIjIyMDg4MlwiOiBcIuWkp+WuieW4glwiLFxuXHQgICAgXCIyMjA4ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjIyNDAwXCI6IFwi5bu26L655pyd6bKc5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjIyMjQwMVwiOiBcIuW7tuWQieW4glwiLFxuXHQgICAgXCIyMjI0MDJcIjogXCLlm77ku6zluIJcIixcblx0ICAgIFwiMjIyNDAzXCI6IFwi5pWm5YyW5biCXCIsXG5cdCAgICBcIjIyMjQwNFwiOiBcIuePsuaYpeW4glwiLFxuXHQgICAgXCIyMjI0MDVcIjogXCLpvpnkupXluIJcIixcblx0ICAgIFwiMjIyNDA2XCI6IFwi5ZKM6b6Z5biCXCIsXG5cdCAgICBcIjIyMjQyNFwiOiBcIuaxqua4heWOv1wiLFxuXHQgICAgXCIyMjI0MjZcIjogXCLlronlm77ljr9cIixcblx0ICAgIFwiMjIyNDI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDAwMFwiOiBcIum7kem+meaxn+ecgVwiLFxuXHQgICAgXCIyMzAxMDBcIjogXCLlk4jlsJTmu6jluIJcIixcblx0ICAgIFwiMjMwMTAyXCI6IFwi6YGT6YeM5Yy6XCIsXG5cdCAgICBcIjIzMDEwM1wiOiBcIuWNl+Wyl+WMulwiLFxuXHQgICAgXCIyMzAxMDRcIjogXCLpgZPlpJbljLpcIixcblx0ICAgIFwiMjMwMTA2XCI6IFwi6aaZ5Z2K5Yy6XCIsXG5cdCAgICBcIjIzMDEwOFwiOiBcIuW5s+aIv+WMulwiLFxuXHQgICAgXCIyMzAxMDlcIjogXCLmnb7ljJfljLpcIixcblx0ICAgIFwiMjMwMTExXCI6IFwi5ZG85YWw5Yy6XCIsXG5cdCAgICBcIjIzMDEyM1wiOiBcIuS+neWFsOWOv1wiLFxuXHQgICAgXCIyMzAxMjRcIjogXCLmlrnmraPljr9cIixcblx0ICAgIFwiMjMwMTI1XCI6IFwi5a6+5Y6/XCIsXG5cdCAgICBcIjIzMDEyNlwiOiBcIuW3tOW9puWOv1wiLFxuXHQgICAgXCIyMzAxMjdcIjogXCLmnKjlhbDljr9cIixcblx0ICAgIFwiMjMwMTI4XCI6IFwi6YCa5rKz5Y6/XCIsXG5cdCAgICBcIjIzMDEyOVwiOiBcIuW7tuWvv+WOv1wiLFxuXHQgICAgXCIyMzAxODFcIjogXCLpmL/ln47ljLpcIixcblx0ICAgIFwiMjMwMTgyXCI6IFwi5Y+M5Z+O5biCXCIsXG5cdCAgICBcIjIzMDE4M1wiOiBcIuWwmuW/l+W4glwiLFxuXHQgICAgXCIyMzAxODRcIjogXCLkupTluLjluIJcIixcblx0ICAgIFwiMjMwMTg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDIwMFwiOiBcIum9kOm9kOWTiOWwlOW4glwiLFxuXHQgICAgXCIyMzAyMDJcIjogXCLpvpnmspnljLpcIixcblx0ICAgIFwiMjMwMjAzXCI6IFwi5bu65Y2O5Yy6XCIsXG5cdCAgICBcIjIzMDIwNFwiOiBcIumTgemUi+WMulwiLFxuXHQgICAgXCIyMzAyMDVcIjogXCLmmILmmILmuqrljLpcIixcblx0ICAgIFwiMjMwMjA2XCI6IFwi5a+M5ouJ5bCU5Z+65Yy6XCIsXG5cdCAgICBcIjIzMDIwN1wiOiBcIueivuWtkOWxseWMulwiLFxuXHQgICAgXCIyMzAyMDhcIjogXCLmooXph4zmlq/ovr7mlqHlsJTml4/ljLpcIixcblx0ICAgIFwiMjMwMjIxXCI6IFwi6b6Z5rGf5Y6/XCIsXG5cdCAgICBcIjIzMDIyM1wiOiBcIuS+neWuieWOv1wiLFxuXHQgICAgXCIyMzAyMjRcIjogXCLms7DmnaXljr9cIixcblx0ICAgIFwiMjMwMjI1XCI6IFwi55SY5Y2X5Y6/XCIsXG5cdCAgICBcIjIzMDIyN1wiOiBcIuWvjOijleWOv1wiLFxuXHQgICAgXCIyMzAyMjlcIjogXCLlhYvlsbHljr9cIixcblx0ICAgIFwiMjMwMjMwXCI6IFwi5YWL5Lic5Y6/XCIsXG5cdCAgICBcIjIzMDIzMVwiOiBcIuaLnOazieWOv1wiLFxuXHQgICAgXCIyMzAyODFcIjogXCLorrfmsrPluIJcIixcblx0ICAgIFwiMjMwMjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDMwMFwiOiBcIum4oeilv+W4glwiLFxuXHQgICAgXCIyMzAzMDJcIjogXCLpuKHlhqDljLpcIixcblx0ICAgIFwiMjMwMzAzXCI6IFwi5oGS5bGx5Yy6XCIsXG5cdCAgICBcIjIzMDMwNFwiOiBcIua7tOmBk+WMulwiLFxuXHQgICAgXCIyMzAzMDVcIjogXCLmoqjmoJHljLpcIixcblx0ICAgIFwiMjMwMzA2XCI6IFwi5Z+O5a2Q5rKz5Yy6XCIsXG5cdCAgICBcIjIzMDMwN1wiOiBcIum6u+WxseWMulwiLFxuXHQgICAgXCIyMzAzMjFcIjogXCLpuKHkuJzljr9cIixcblx0ICAgIFwiMjMwMzgxXCI6IFwi6JmO5p6X5biCXCIsXG5cdCAgICBcIjIzMDM4MlwiOiBcIuWvhuWxseW4glwiLFxuXHQgICAgXCIyMzAzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMjMwNDAwXCI6IFwi6bmk5bKX5biCXCIsXG5cdCAgICBcIjIzMDQwMlwiOiBcIuWQkemYs+WMulwiLFxuXHQgICAgXCIyMzA0MDNcIjogXCLlt6XlhpzljLpcIixcblx0ICAgIFwiMjMwNDA0XCI6IFwi5Y2X5bGx5Yy6XCIsXG5cdCAgICBcIjIzMDQwNVwiOiBcIuWFtOWuieWMulwiLFxuXHQgICAgXCIyMzA0MDZcIjogXCLkuJzlsbHljLpcIixcblx0ICAgIFwiMjMwNDA3XCI6IFwi5YW05bGx5Yy6XCIsXG5cdCAgICBcIjIzMDQyMVwiOiBcIuiQneWMl+WOv1wiLFxuXHQgICAgXCIyMzA0MjJcIjogXCLnu6Xmu6jljr9cIixcblx0ICAgIFwiMjMwNDIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDUwMFwiOiBcIuWPjOm4reWxseW4glwiLFxuXHQgICAgXCIyMzA1MDJcIjogXCLlsJblsbHljLpcIixcblx0ICAgIFwiMjMwNTAzXCI6IFwi5bKt5Lic5Yy6XCIsXG5cdCAgICBcIjIzMDUwNVwiOiBcIuWbm+aWueWPsOWMulwiLFxuXHQgICAgXCIyMzA1MDZcIjogXCLlrp3lsbHljLpcIixcblx0ICAgIFwiMjMwNTIxXCI6IFwi6ZuG6LSk5Y6/XCIsXG5cdCAgICBcIjIzMDUyMlwiOiBcIuWPi+iwiuWOv1wiLFxuXHQgICAgXCIyMzA1MjNcIjogXCLlrp3muIXljr9cIixcblx0ICAgIFwiMjMwNTI0XCI6IFwi6aW25rKz5Y6/XCIsXG5cdCAgICBcIjIzMDUyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzA2MDBcIjogXCLlpKfluobluIJcIixcblx0ICAgIFwiMjMwNjAyXCI6IFwi6JCo5bCU5Zu+5Yy6XCIsXG5cdCAgICBcIjIzMDYwM1wiOiBcIum+meWHpOWMulwiLFxuXHQgICAgXCIyMzA2MDRcIjogXCLorqnog6Hot6/ljLpcIixcblx0ICAgIFwiMjMwNjA1XCI6IFwi57qi5bKX5Yy6XCIsXG5cdCAgICBcIjIzMDYwNlwiOiBcIuWkp+WQjOWMulwiLFxuXHQgICAgXCIyMzA2MjFcIjogXCLogoflt57ljr9cIixcblx0ICAgIFwiMjMwNjIyXCI6IFwi6IKH5rqQ5Y6/XCIsXG5cdCAgICBcIjIzMDYyM1wiOiBcIuael+eUuOWOv1wiLFxuXHQgICAgXCIyMzA2MjRcIjogXCLmnZzlsJTkvK/nibnokpnlj6Tml4/oh6rmsrvljr9cIixcblx0ICAgIFwiMjMwNjI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMDcwMFwiOiBcIuS8iuaYpeW4glwiLFxuXHQgICAgXCIyMzA3MDJcIjogXCLkvIrmmKXljLpcIixcblx0ICAgIFwiMjMwNzAzXCI6IFwi5Y2X5bKU5Yy6XCIsXG5cdCAgICBcIjIzMDcwNFwiOiBcIuWPi+WlveWMulwiLFxuXHQgICAgXCIyMzA3MDVcIjogXCLopb/mnpfljLpcIixcblx0ICAgIFwiMjMwNzA2XCI6IFwi57+g5bOm5Yy6XCIsXG5cdCAgICBcIjIzMDcwN1wiOiBcIuaWsOmdkuWMulwiLFxuXHQgICAgXCIyMzA3MDhcIjogXCLnvo7muqrljLpcIixcblx0ICAgIFwiMjMwNzA5XCI6IFwi6YeR5bGx5bGv5Yy6XCIsXG5cdCAgICBcIjIzMDcxMFwiOiBcIuS6lOiQpeWMulwiLFxuXHQgICAgXCIyMzA3MTFcIjogXCLkuYzpqazmsrPljLpcIixcblx0ICAgIFwiMjMwNzEyXCI6IFwi5rGk5pe65rKz5Yy6XCIsXG5cdCAgICBcIjIzMDcxM1wiOiBcIuW4puWyreWMulwiLFxuXHQgICAgXCIyMzA3MTRcIjogXCLkuYzkvIrlsq3ljLpcIixcblx0ICAgIFwiMjMwNzE1XCI6IFwi57qi5pif5Yy6XCIsXG5cdCAgICBcIjIzMDcxNlwiOiBcIuS4iueUmOWyreWMulwiLFxuXHQgICAgXCIyMzA3MjJcIjogXCLlmInojavljr9cIixcblx0ICAgIFwiMjMwNzgxXCI6IFwi6ZOB5Yqb5biCXCIsXG5cdCAgICBcIjIzMDc4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzA4MDBcIjogXCLkvbPmnKjmlq/luIJcIixcblx0ICAgIFwiMjMwODAzXCI6IFwi5ZCR6Ziz5Yy6XCIsXG5cdCAgICBcIjIzMDgwNFwiOiBcIuWJjei/m+WMulwiLFxuXHQgICAgXCIyMzA4MDVcIjogXCLkuJzpo47ljLpcIixcblx0ICAgIFwiMjMwODExXCI6IFwi6YOK5Yy6XCIsXG5cdCAgICBcIjIzMDgyMlwiOiBcIuahpuWNl+WOv1wiLFxuXHQgICAgXCIyMzA4MjZcIjogXCLmoablt53ljr9cIixcblx0ICAgIFwiMjMwODI4XCI6IFwi5rGk5Y6f5Y6/XCIsXG5cdCAgICBcIjIzMDgzM1wiOiBcIuaKmui/nOWOv1wiLFxuXHQgICAgXCIyMzA4ODFcIjogXCLlkIzmsZ/luIJcIixcblx0ICAgIFwiMjMwODgyXCI6IFwi5a+M6ZSm5biCXCIsXG5cdCAgICBcIjIzMDg4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzA5MDBcIjogXCLkuIPlj7DmsrPluIJcIixcblx0ICAgIFwiMjMwOTAyXCI6IFwi5paw5YW05Yy6XCIsXG5cdCAgICBcIjIzMDkwM1wiOiBcIuahg+WxseWMulwiLFxuXHQgICAgXCIyMzA5MDRcIjogXCLojITlrZDmsrPljLpcIixcblx0ICAgIFwiMjMwOTIxXCI6IFwi5YuD5Yip5Y6/XCIsXG5cdCAgICBcIjIzMDkyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzEwMDBcIjogXCLniaHkuLnmsZ/luIJcIixcblx0ICAgIFwiMjMxMDAyXCI6IFwi5Lic5a6J5Yy6XCIsXG5cdCAgICBcIjIzMTAwM1wiOiBcIumYs+aYjuWMulwiLFxuXHQgICAgXCIyMzEwMDRcIjogXCLniLHmsJHljLpcIixcblx0ICAgIFwiMjMxMDA1XCI6IFwi6KW/5a6J5Yy6XCIsXG5cdCAgICBcIjIzMTAyNFwiOiBcIuS4nOWugeWOv1wiLFxuXHQgICAgXCIyMzEwMjVcIjogXCLmnpflj6Pljr9cIixcblx0ICAgIFwiMjMxMDgxXCI6IFwi57ul6Iqs5rKz5biCXCIsXG5cdCAgICBcIjIzMTA4M1wiOiBcIua1t+ael+W4glwiLFxuXHQgICAgXCIyMzEwODRcIjogXCLlroHlronluIJcIixcblx0ICAgIFwiMjMxMDg1XCI6IFwi56mG5qOx5biCXCIsXG5cdCAgICBcIjIzMTA4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIyMzExMDBcIjogXCLpu5HmsrPluIJcIixcblx0ICAgIFwiMjMxMTAyXCI6IFwi54ix6L6J5Yy6XCIsXG5cdCAgICBcIjIzMTEyMVwiOiBcIuWrqeaxn+WOv1wiLFxuXHQgICAgXCIyMzExMjNcIjogXCLpgIrlhYvljr9cIixcblx0ICAgIFwiMjMxMTI0XCI6IFwi5a2Z5ZC05Y6/XCIsXG5cdCAgICBcIjIzMTE4MVwiOiBcIuWMl+WuieW4glwiLFxuXHQgICAgXCIyMzExODJcIjogXCLkupTlpKfov57msaDluIJcIixcblx0ICAgIFwiMjMxMTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMTIwMFwiOiBcIue7peWMluW4glwiLFxuXHQgICAgXCIyMzEyMDJcIjogXCLljJfmnpfljLpcIixcblx0ICAgIFwiMjMxMjIxXCI6IFwi5pyb5aWO5Y6/XCIsXG5cdCAgICBcIjIzMTIyMlwiOiBcIuWFsOilv+WOv1wiLFxuXHQgICAgXCIyMzEyMjNcIjogXCLpnZLlhojljr9cIixcblx0ICAgIFwiMjMxMjI0XCI6IFwi5bqG5a6J5Y6/XCIsXG5cdCAgICBcIjIzMTIyNVwiOiBcIuaYjuawtOWOv1wiLFxuXHQgICAgXCIyMzEyMjZcIjogXCLnu6Xmo7Hljr9cIixcblx0ICAgIFwiMjMxMjgxXCI6IFwi5a6J6L6+5biCXCIsXG5cdCAgICBcIjIzMTI4MlwiOiBcIuiCh+S4nOW4glwiLFxuXHQgICAgXCIyMzEyODNcIjogXCLmtbfkvKbluIJcIixcblx0ICAgIFwiMjMxMjg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjIzMjcwMFwiOiBcIuWkp+WFtOWuieWyreWcsOWMulwiLFxuXHQgICAgXCIyMzI3MDJcIjogXCLmnb7lsq3ljLpcIixcblx0ICAgIFwiMjMyNzAzXCI6IFwi5paw5p6X5Yy6XCIsXG5cdCAgICBcIjIzMjcwNFwiOiBcIuWRvOS4reWMulwiLFxuXHQgICAgXCIyMzI3MjFcIjogXCLlkbznjpvljr9cIixcblx0ICAgIFwiMjMyNzIyXCI6IFwi5aGU5rKz5Y6/XCIsXG5cdCAgICBcIjIzMjcyM1wiOiBcIua8oOays+WOv1wiLFxuXHQgICAgXCIyMzI3MjRcIjogXCLliqDmoLzovr7lpYfljLpcIixcblx0ICAgIFwiMjMyNzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMxMDAwMFwiOiBcIuS4iua1t1wiLFxuXHQgICAgXCIzMTAxMDBcIjogXCLkuIrmtbfluIJcIixcblx0ICAgIFwiMzEwMTAxXCI6IFwi6buE5rWm5Yy6XCIsXG5cdCAgICBcIjMxMDEwNFwiOiBcIuW+kOaxh+WMulwiLFxuXHQgICAgXCIzMTAxMDVcIjogXCLplb/lroHljLpcIixcblx0ICAgIFwiMzEwMTA2XCI6IFwi6Z2Z5a6J5Yy6XCIsXG5cdCAgICBcIjMxMDEwN1wiOiBcIuaZrumZgOWMulwiLFxuXHQgICAgXCIzMTAxMDhcIjogXCLpl7jljJfljLpcIixcblx0ICAgIFwiMzEwMTA5XCI6IFwi6Jm55Y+j5Yy6XCIsXG5cdCAgICBcIjMxMDExMFwiOiBcIuadqOa1puWMulwiLFxuXHQgICAgXCIzMTAxMTJcIjogXCLpl7XooYzljLpcIixcblx0ICAgIFwiMzEwMTEzXCI6IFwi5a6d5bGx5Yy6XCIsXG5cdCAgICBcIjMxMDExNFwiOiBcIuWYieWumuWMulwiLFxuXHQgICAgXCIzMTAxMTVcIjogXCLmtabkuJzmlrDljLpcIixcblx0ICAgIFwiMzEwMTE2XCI6IFwi6YeR5bGx5Yy6XCIsXG5cdCAgICBcIjMxMDExN1wiOiBcIuadvuaxn+WMulwiLFxuXHQgICAgXCIzMTAxMThcIjogXCLpnZLmtabljLpcIixcblx0ICAgIFwiMzEwMTIwXCI6IFwi5aWJ6LSk5Yy6XCIsXG5cdCAgICBcIjMxMDIzMFwiOiBcIuW0h+aYjuWOv1wiLFxuXHQgICAgXCIzMTAyMzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwMDAwXCI6IFwi5rGf6IuP55yBXCIsXG5cdCAgICBcIjMyMDEwMFwiOiBcIuWNl+S6rOW4glwiLFxuXHQgICAgXCIzMjAxMDJcIjogXCLnjoTmrabljLpcIixcblx0ICAgIFwiMzIwMTA0XCI6IFwi56em5reu5Yy6XCIsXG5cdCAgICBcIjMyMDEwNVwiOiBcIuW7uumCuuWMulwiLFxuXHQgICAgXCIzMjAxMDZcIjogXCLpvJPmpbzljLpcIixcblx0ICAgIFwiMzIwMTExXCI6IFwi5rWm5Y+j5Yy6XCIsXG5cdCAgICBcIjMyMDExM1wiOiBcIuaglumcnuWMulwiLFxuXHQgICAgXCIzMjAxMTRcIjogXCLpm6joirHlj7DljLpcIixcblx0ICAgIFwiMzIwMTE1XCI6IFwi5rGf5a6B5Yy6XCIsXG5cdCAgICBcIjMyMDExNlwiOiBcIuWFreWQiOWMulwiLFxuXHQgICAgXCIzMjAxMjRcIjogXCLmuqfmsLTljLpcIixcblx0ICAgIFwiMzIwMTI1XCI6IFwi6auY5rez5Yy6XCIsXG5cdCAgICBcIjMyMDEyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjAyMDBcIjogXCLml6DplKHluIJcIixcblx0ICAgIFwiMzIwMjAyXCI6IFwi5bSH5a6J5Yy6XCIsXG5cdCAgICBcIjMyMDIwM1wiOiBcIuWNl+mVv+WMulwiLFxuXHQgICAgXCIzMjAyMDRcIjogXCLljJfloZjljLpcIixcblx0ICAgIFwiMzIwMjA1XCI6IFwi6ZSh5bGx5Yy6XCIsXG5cdCAgICBcIjMyMDIwNlwiOiBcIuaDoOWxseWMulwiLFxuXHQgICAgXCIzMjAyMTFcIjogXCLmu6jmuZbljLpcIixcblx0ICAgIFwiMzIwMjgxXCI6IFwi5rGf6Zi05biCXCIsXG5cdCAgICBcIjMyMDI4MlwiOiBcIuWunOWFtOW4glwiLFxuXHQgICAgXCIzMjAyOTdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwMzAwXCI6IFwi5b6Q5bee5biCXCIsXG5cdCAgICBcIjMyMDMwMlwiOiBcIum8k+alvOWMulwiLFxuXHQgICAgXCIzMjAzMDNcIjogXCLkupHpvpnljLpcIixcblx0ICAgIFwiMzIwMzA1XCI6IFwi6LS+5rGq5Yy6XCIsXG5cdCAgICBcIjMyMDMxMVwiOiBcIuazieWxseWMulwiLFxuXHQgICAgXCIzMjAzMjFcIjogXCLkuLDljr9cIixcblx0ICAgIFwiMzIwMzIyXCI6IFwi5rKb5Y6/XCIsXG5cdCAgICBcIjMyMDMyM1wiOiBcIumTnOWxseWMulwiLFxuXHQgICAgXCIzMjAzMjRcIjogXCLnnaLlroHljr9cIixcblx0ICAgIFwiMzIwMzgxXCI6IFwi5paw5rKC5biCXCIsXG5cdCAgICBcIjMyMDM4MlwiOiBcIumCs+W3nuW4glwiLFxuXHQgICAgXCIzMjAzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwNDAwXCI6IFwi5bi45bee5biCXCIsXG5cdCAgICBcIjMyMDQwMlwiOiBcIuWkqeWugeWMulwiLFxuXHQgICAgXCIzMjA0MDRcIjogXCLpkp/mpbzljLpcIixcblx0ICAgIFwiMzIwNDA1XCI6IFwi5oia5aKF5aCw5Yy6XCIsXG5cdCAgICBcIjMyMDQxMVwiOiBcIuaWsOWMl+WMulwiLFxuXHQgICAgXCIzMjA0MTJcIjogXCLmrabov5vljLpcIixcblx0ICAgIFwiMzIwNDgxXCI6IFwi5rqn6Ziz5biCXCIsXG5cdCAgICBcIjMyMDQ4MlwiOiBcIumHkeWdm+W4glwiLFxuXHQgICAgXCIzMjA0ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwNTAwXCI6IFwi6IuP5bee5biCXCIsXG5cdCAgICBcIjMyMDUwNVwiOiBcIuiZjuS4mOWMulwiLFxuXHQgICAgXCIzMjA1MDZcIjogXCLlkLTkuK3ljLpcIixcblx0ICAgIFwiMzIwNTA3XCI6IFwi55u45Z+O5Yy6XCIsXG5cdCAgICBcIjMyMDUwOFwiOiBcIuWnkeiLj+WMulwiLFxuXHQgICAgXCIzMjA1ODFcIjogXCLluLjnhp/luIJcIixcblx0ICAgIFwiMzIwNTgyXCI6IFwi5byg5a625riv5biCXCIsXG5cdCAgICBcIjMyMDU4M1wiOiBcIuaYhuWxseW4glwiLFxuXHQgICAgXCIzMjA1ODRcIjogXCLlkLTmsZ/ljLpcIixcblx0ICAgIFwiMzIwNTg1XCI6IFwi5aSq5LuT5biCXCIsXG5cdCAgICBcIjMyMDU5NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjA2MDBcIjogXCLljZfpgJrluIJcIixcblx0ICAgIFwiMzIwNjAyXCI6IFwi5bSH5bed5Yy6XCIsXG5cdCAgICBcIjMyMDYxMVwiOiBcIua4r+mXuOWMulwiLFxuXHQgICAgXCIzMjA2MTJcIjogXCLpgJrlt57ljLpcIixcblx0ICAgIFwiMzIwNjIxXCI6IFwi5rW35a6J5Y6/XCIsXG5cdCAgICBcIjMyMDYyM1wiOiBcIuWmguS4nOWOv1wiLFxuXHQgICAgXCIzMjA2ODFcIjogXCLlkK/kuJzluIJcIixcblx0ICAgIFwiMzIwNjgyXCI6IFwi5aaC55qL5biCXCIsXG5cdCAgICBcIjMyMDY4NFwiOiBcIua1t+mXqOW4glwiLFxuXHQgICAgXCIzMjA2OTRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwNzAwXCI6IFwi6L+e5LqR5riv5biCXCIsXG5cdCAgICBcIjMyMDcwM1wiOiBcIui/nuS6keWMulwiLFxuXHQgICAgXCIzMjA3MDVcIjogXCLmlrDmtabljLpcIixcblx0ICAgIFwiMzIwNzA2XCI6IFwi5rW35bee5Yy6XCIsXG5cdCAgICBcIjMyMDcyMVwiOiBcIui1o+amhuWOv1wiLFxuXHQgICAgXCIzMjA3MjJcIjogXCLkuJzmtbfljr9cIixcblx0ICAgIFwiMzIwNzIzXCI6IFwi54GM5LqR5Y6/XCIsXG5cdCAgICBcIjMyMDcyNFwiOiBcIueBjOWNl+WOv1wiLFxuXHQgICAgXCIzMjA3MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIwODAwXCI6IFwi5reu5a6J5biCXCIsXG5cdCAgICBcIjMyMDgwMlwiOiBcIua4heays+WMulwiLFxuXHQgICAgXCIzMjA4MDNcIjogXCLmt67lronljLpcIixcblx0ICAgIFwiMzIwODA0XCI6IFwi5reu6Zi05Yy6XCIsXG5cdCAgICBcIjMyMDgxMVwiOiBcIua4hea1puWMulwiLFxuXHQgICAgXCIzMjA4MjZcIjogXCLmtp/msLTljr9cIixcblx0ICAgIFwiMzIwODI5XCI6IFwi5rSq5rO95Y6/XCIsXG5cdCAgICBcIjMyMDgzMFwiOiBcIuebseecmeWOv1wiLFxuXHQgICAgXCIzMjA4MzFcIjogXCLph5HmuZbljr9cIixcblx0ICAgIFwiMzIwODMyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMDkwMFwiOiBcIuebkOWfjuW4glwiLFxuXHQgICAgXCIzMjA5MDJcIjogXCLkuq3muZbljLpcIixcblx0ICAgIFwiMzIwOTAzXCI6IFwi55uQ6YO95Yy6XCIsXG5cdCAgICBcIjMyMDkyMVwiOiBcIuWTjeawtOWOv1wiLFxuXHQgICAgXCIzMjA5MjJcIjogXCLmu6jmtbfljr9cIixcblx0ICAgIFwiMzIwOTIzXCI6IFwi6Zic5a6B5Y6/XCIsXG5cdCAgICBcIjMyMDkyNFwiOiBcIuWwhOmYs+WOv1wiLFxuXHQgICAgXCIzMjA5MjVcIjogXCLlu7rmuZbljr9cIixcblx0ICAgIFwiMzIwOTgxXCI6IFwi5Lic5Y+w5biCXCIsXG5cdCAgICBcIjMyMDk4MlwiOiBcIuWkp+S4sOW4glwiLFxuXHQgICAgXCIzMjA5ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIxMDAwXCI6IFwi5oms5bee5biCXCIsXG5cdCAgICBcIjMyMTAwMlwiOiBcIuW5v+mZteWMulwiLFxuXHQgICAgXCIzMjEwMDNcIjogXCLpgpfmsZ/ljLpcIixcblx0ICAgIFwiMzIxMDIzXCI6IFwi5a6d5bqU5Y6/XCIsXG5cdCAgICBcIjMyMTA4MVwiOiBcIuS7quW+geW4glwiLFxuXHQgICAgXCIzMjEwODRcIjogXCLpq5jpgq7luIJcIixcblx0ICAgIFwiMzIxMDg4XCI6IFwi5rGf6YO95Yy6XCIsXG5cdCAgICBcIjMyMTA5M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMjExMDBcIjogXCLplYfmsZ/luIJcIixcblx0ICAgIFwiMzIxMTAyXCI6IFwi5Lqs5Y+j5Yy6XCIsXG5cdCAgICBcIjMyMTExMVwiOiBcIua2puW3nuWMulwiLFxuXHQgICAgXCIzMjExMTJcIjogXCLkuLnlvpLljLpcIixcblx0ICAgIFwiMzIxMTgxXCI6IFwi5Li56Ziz5biCXCIsXG5cdCAgICBcIjMyMTE4MlwiOiBcIuaJrOS4reW4glwiLFxuXHQgICAgXCIzMjExODNcIjogXCLlj6XlrrnluIJcIixcblx0ICAgIFwiMzIxMTg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMyMTIwMFwiOiBcIuazsOW3nuW4glwiLFxuXHQgICAgXCIzMjEyMDJcIjogXCLmtbfpmbXljLpcIixcblx0ICAgIFwiMzIxMjAzXCI6IFwi6auY5riv5Yy6XCIsXG5cdCAgICBcIjMyMTI4MVwiOiBcIuWFtOWMluW4glwiLFxuXHQgICAgXCIzMjEyODJcIjogXCLpnZbmsZ/luIJcIixcblx0ICAgIFwiMzIxMjgzXCI6IFwi5rOw5YW05biCXCIsXG5cdCAgICBcIjMyMTI4NFwiOiBcIuWnnOWgsOWMulwiLFxuXHQgICAgXCIzMjEyODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzIxMzAwXCI6IFwi5a6/6L+B5biCXCIsXG5cdCAgICBcIjMyMTMwMlwiOiBcIuWuv+WfjuWMulwiLFxuXHQgICAgXCIzMjEzMTFcIjogXCLlrr/osavljLpcIixcblx0ICAgIFwiMzIxMzIyXCI6IFwi5rKt6Ziz5Y6/XCIsXG5cdCAgICBcIjMyMTMyM1wiOiBcIuazl+mYs+WOv1wiLFxuXHQgICAgXCIzMjEzMjRcIjogXCLms5fmtKrljr9cIixcblx0ICAgIFwiMzIxMzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDAwMFwiOiBcIua1meaxn+ecgVwiLFxuXHQgICAgXCIzMzAxMDBcIjogXCLmna3lt57luIJcIixcblx0ICAgIFwiMzMwMTAyXCI6IFwi5LiK5Z+O5Yy6XCIsXG5cdCAgICBcIjMzMDEwM1wiOiBcIuS4i+WfjuWMulwiLFxuXHQgICAgXCIzMzAxMDRcIjogXCLmsZ/lubLljLpcIixcblx0ICAgIFwiMzMwMTA1XCI6IFwi5oux5aKF5Yy6XCIsXG5cdCAgICBcIjMzMDEwNlwiOiBcIuilv+a5luWMulwiLFxuXHQgICAgXCIzMzAxMDhcIjogXCLmu6jmsZ/ljLpcIixcblx0ICAgIFwiMzMwMTA5XCI6IFwi6JCn5bGx5Yy6XCIsXG5cdCAgICBcIjMzMDExMFwiOiBcIuS9meadreWMulwiLFxuXHQgICAgXCIzMzAxMjJcIjogXCLmoZDlupDljr9cIixcblx0ICAgIFwiMzMwMTI3XCI6IFwi5rez5a6J5Y6/XCIsXG5cdCAgICBcIjMzMDE4MlwiOiBcIuW7uuW+t+W4glwiLFxuXHQgICAgXCIzMzAxODNcIjogXCLlr4zpmLPluIJcIixcblx0ICAgIFwiMzMwMTg1XCI6IFwi5Li05a6J5biCXCIsXG5cdCAgICBcIjMzMDE4NlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzAyMDBcIjogXCLlroHms6LluIJcIixcblx0ICAgIFwiMzMwMjAzXCI6IFwi5rW35puZ5Yy6XCIsXG5cdCAgICBcIjMzMDIwNFwiOiBcIuaxn+S4nOWMulwiLFxuXHQgICAgXCIzMzAyMDVcIjogXCLmsZ/ljJfljLpcIixcblx0ICAgIFwiMzMwMjA2XCI6IFwi5YyX5LuR5Yy6XCIsXG5cdCAgICBcIjMzMDIxMVwiOiBcIumVh+a1t+WMulwiLFxuXHQgICAgXCIzMzAyMTJcIjogXCLphJ7lt57ljLpcIixcblx0ICAgIFwiMzMwMjI1XCI6IFwi6LGh5bGx5Y6/XCIsXG5cdCAgICBcIjMzMDIyNlwiOiBcIuWugea1t+WOv1wiLFxuXHQgICAgXCIzMzAyODFcIjogXCLkvZnlp5rluIJcIixcblx0ICAgIFwiMzMwMjgyXCI6IFwi5oWI5rqq5biCXCIsXG5cdCAgICBcIjMzMDI4M1wiOiBcIuWlieWMluW4glwiLFxuXHQgICAgXCIzMzAyODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwMzAwXCI6IFwi5rip5bee5biCXCIsXG5cdCAgICBcIjMzMDMwMlwiOiBcIum5v+WfjuWMulwiLFxuXHQgICAgXCIzMzAzMDNcIjogXCLpvpnmub7ljLpcIixcblx0ICAgIFwiMzMwMzA0XCI6IFwi55Ov5rW35Yy6XCIsXG5cdCAgICBcIjMzMDMyMlwiOiBcIua0nuWktOWOv1wiLFxuXHQgICAgXCIzMzAzMjRcIjogXCLmsLjlmInljr9cIixcblx0ICAgIFwiMzMwMzI2XCI6IFwi5bmz6Ziz5Y6/XCIsXG5cdCAgICBcIjMzMDMyN1wiOiBcIuiLjeWNl+WOv1wiLFxuXHQgICAgXCIzMzAzMjhcIjogXCLmlofmiJDljr9cIixcblx0ICAgIFwiMzMwMzI5XCI6IFwi5rOw6aG65Y6/XCIsXG5cdCAgICBcIjMzMDM4MVwiOiBcIueRnuWuieW4glwiLFxuXHQgICAgXCIzMzAzODJcIjogXCLkuZDmuIXluIJcIixcblx0ICAgIFwiMzMwMzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDQwMFwiOiBcIuWYieWFtOW4glwiLFxuXHQgICAgXCIzMzA0MDJcIjogXCLljZfmuZbljLpcIixcblx0ICAgIFwiMzMwNDExXCI6IFwi56eA5rSy5Yy6XCIsXG5cdCAgICBcIjMzMDQyMVwiOiBcIuWYieWWhOWOv1wiLFxuXHQgICAgXCIzMzA0MjRcIjogXCLmtbfnm5Dljr9cIixcblx0ICAgIFwiMzMwNDgxXCI6IFwi5rW35a6B5biCXCIsXG5cdCAgICBcIjMzMDQ4MlwiOiBcIuW5s+a5luW4glwiLFxuXHQgICAgXCIzMzA0ODNcIjogXCLmoZDkuaHluIJcIixcblx0ICAgIFwiMzMwNDg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDUwMFwiOiBcIua5luW3nuW4glwiLFxuXHQgICAgXCIzMzA1MDJcIjogXCLlkLTlhbTljLpcIixcblx0ICAgIFwiMzMwNTAzXCI6IFwi5Y2X5rWU5Yy6XCIsXG5cdCAgICBcIjMzMDUyMVwiOiBcIuW+t+a4heWOv1wiLFxuXHQgICAgXCIzMzA1MjJcIjogXCLplb/lhbTljr9cIixcblx0ICAgIFwiMzMwNTIzXCI6IFwi5a6J5ZCJ5Y6/XCIsXG5cdCAgICBcIjMzMDUyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzA2MDBcIjogXCLnu43lhbTluIJcIixcblx0ICAgIFwiMzMwNjAyXCI6IFwi6LaK5Z+O5Yy6XCIsXG5cdCAgICBcIjMzMDYyMVwiOiBcIue7jeWFtOWOv1wiLFxuXHQgICAgXCIzMzA2MjRcIjogXCLmlrDmmIzljr9cIixcblx0ICAgIFwiMzMwNjgxXCI6IFwi6K+45pqo5biCXCIsXG5cdCAgICBcIjMzMDY4MlwiOiBcIuS4iuiZnuW4glwiLFxuXHQgICAgXCIzMzA2ODNcIjogXCLltYrlt57luIJcIixcblx0ICAgIFwiMzMwNjg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMDcwMFwiOiBcIumHkeWNjuW4glwiLFxuXHQgICAgXCIzMzA3MDJcIjogXCLlqbrln47ljLpcIixcblx0ICAgIFwiMzMwNzAzXCI6IFwi6YeR5Lic5Yy6XCIsXG5cdCAgICBcIjMzMDcyM1wiOiBcIuatpuS5ieWOv1wiLFxuXHQgICAgXCIzMzA3MjZcIjogXCLmtabmsZ/ljr9cIixcblx0ICAgIFwiMzMwNzI3XCI6IFwi56OQ5a6J5Y6/XCIsXG5cdCAgICBcIjMzMDc4MVwiOiBcIuWFsOa6quW4glwiLFxuXHQgICAgXCIzMzA3ODJcIjogXCLkuYnkuYzluIJcIixcblx0ICAgIFwiMzMwNzgzXCI6IFwi5Lic6Ziz5biCXCIsXG5cdCAgICBcIjMzMDc4NFwiOiBcIuawuOW6t+W4glwiLFxuXHQgICAgXCIzMzA3ODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzMwODAwXCI6IFwi6KGi5bee5biCXCIsXG5cdCAgICBcIjMzMDgwMlwiOiBcIuafr+WfjuWMulwiLFxuXHQgICAgXCIzMzA4MDNcIjogXCLooaLmsZ/ljLpcIixcblx0ICAgIFwiMzMwODIyXCI6IFwi5bi45bGx5Y6/XCIsXG5cdCAgICBcIjMzMDgyNFwiOiBcIuW8gOWMluWOv1wiLFxuXHQgICAgXCIzMzA4MjVcIjogXCLpvpnmuLjljr9cIixcblx0ICAgIFwiMzMwODgxXCI6IFwi5rGf5bGx5biCXCIsXG5cdCAgICBcIjMzMDg4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzA5MDBcIjogXCLoiJ/lsbHluIJcIixcblx0ICAgIFwiMzMwOTAyXCI6IFwi5a6a5rW35Yy6XCIsXG5cdCAgICBcIjMzMDkwM1wiOiBcIuaZrumZgOWMulwiLFxuXHQgICAgXCIzMzA5MjFcIjogXCLlsrHlsbHljr9cIixcblx0ICAgIFwiMzMwOTIyXCI6IFwi5bWK5rOX5Y6/XCIsXG5cdCAgICBcIjMzMDkyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzMzEwMDBcIjogXCLlj7Dlt57luIJcIixcblx0ICAgIFwiMzMxMDAyXCI6IFwi5qSS5rGf5Yy6XCIsXG5cdCAgICBcIjMzMTAwM1wiOiBcIum7hOWyqeWMulwiLFxuXHQgICAgXCIzMzEwMDRcIjogXCLot6/moaXljLpcIixcblx0ICAgIFwiMzMxMDIxXCI6IFwi546J546v5Y6/XCIsXG5cdCAgICBcIjMzMTAyMlwiOiBcIuS4iemXqOWOv1wiLFxuXHQgICAgXCIzMzEwMjNcIjogXCLlpKnlj7Dljr9cIixcblx0ICAgIFwiMzMxMDI0XCI6IFwi5LuZ5bGF5Y6/XCIsXG5cdCAgICBcIjMzMTA4MVwiOiBcIua4qeWyreW4glwiLFxuXHQgICAgXCIzMzEwODJcIjogXCLkuLTmtbfluIJcIixcblx0ICAgIFwiMzMxMDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjMzMTEwMFwiOiBcIuS4veawtOW4glwiLFxuXHQgICAgXCIzMzExMDJcIjogXCLojrLpg73ljLpcIixcblx0ICAgIFwiMzMxMTIxXCI6IFwi6Z2S55Sw5Y6/XCIsXG5cdCAgICBcIjMzMTEyMlwiOiBcIue8meS6keWOv1wiLFxuXHQgICAgXCIzMzExMjNcIjogXCLpgYLmmIzljr9cIixcblx0ICAgIFwiMzMxMTI0XCI6IFwi5p2+6Ziz5Y6/XCIsXG5cdCAgICBcIjMzMTEyNVwiOiBcIuS6keWSjOWOv1wiLFxuXHQgICAgXCIzMzExMjZcIjogXCLluoblhYPljr9cIixcblx0ICAgIFwiMzMxMTI3XCI6IFwi5pmv5a6B55Wy5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjMzMTE4MVwiOiBcIum+meazieW4glwiLFxuXHQgICAgXCIzMzExODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwMDAwXCI6IFwi5a6J5b6955yBXCIsXG5cdCAgICBcIjM0MDEwMFwiOiBcIuWQiOiCpeW4glwiLFxuXHQgICAgXCIzNDAxMDJcIjogXCLnkbbmtbfljLpcIixcblx0ICAgIFwiMzQwMTAzXCI6IFwi5bqQ6Ziz5Yy6XCIsXG5cdCAgICBcIjM0MDEwNFwiOiBcIuicgOWxseWMulwiLFxuXHQgICAgXCIzNDAxMTFcIjogXCLljIXmsrPljLpcIixcblx0ICAgIFwiMzQwMTIxXCI6IFwi6ZW/5Liw5Y6/XCIsXG5cdCAgICBcIjM0MDEyMlwiOiBcIuiCpeS4nOWOv1wiLFxuXHQgICAgXCIzNDAxMjNcIjogXCLogqXopb/ljr9cIixcblx0ICAgIFwiMzQwMTkyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDIwMFwiOiBcIuiKnOa5luW4glwiLFxuXHQgICAgXCIzNDAyMDJcIjogXCLplZzmuZbljLpcIixcblx0ICAgIFwiMzQwMjAzXCI6IFwi5byL5rGf5Yy6XCIsXG5cdCAgICBcIjM0MDIwN1wiOiBcIum4oOaxn+WMulwiLFxuXHQgICAgXCIzNDAyMDhcIjogXCLkuInlsbHljLpcIixcblx0ICAgIFwiMzQwMjIxXCI6IFwi6Iqc5rmW5Y6/XCIsXG5cdCAgICBcIjM0MDIyMlwiOiBcIue5geaYjOWOv1wiLFxuXHQgICAgXCIzNDAyMjNcIjogXCLljZfpmbXljr9cIixcblx0ICAgIFwiMzQwMjI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDMwMFwiOiBcIuiajOWfoOW4glwiLFxuXHQgICAgXCIzNDAzMDJcIjogXCLpvpnlrZDmuZbljLpcIixcblx0ICAgIFwiMzQwMzAzXCI6IFwi6JqM5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDMwNFwiOiBcIuemueS8muWMulwiLFxuXHQgICAgXCIzNDAzMTFcIjogXCLmt67kuIrljLpcIixcblx0ICAgIFwiMzQwMzIxXCI6IFwi5oCA6L+c5Y6/XCIsXG5cdCAgICBcIjM0MDMyMlwiOiBcIuS6lOays+WOv1wiLFxuXHQgICAgXCIzNDAzMjNcIjogXCLlm7rplYfljr9cIixcblx0ICAgIFwiMzQwMzI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MDQwMFwiOiBcIua3ruWNl+W4glwiLFxuXHQgICAgXCIzNDA0MDJcIjogXCLlpKfpgJrljLpcIixcblx0ICAgIFwiMzQwNDAzXCI6IFwi55Sw5a625bq15Yy6XCIsXG5cdCAgICBcIjM0MDQwNFwiOiBcIuiwouWutumbhuWMulwiLFxuXHQgICAgXCIzNDA0MDVcIjogXCLlhavlhazlsbHljLpcIixcblx0ICAgIFwiMzQwNDA2XCI6IFwi5r2Y6ZuG5Yy6XCIsXG5cdCAgICBcIjM0MDQyMVwiOiBcIuWHpOWPsOWOv1wiLFxuXHQgICAgXCIzNDA0MjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwNTAwXCI6IFwi6ams6Z6N5bGx5biCXCIsXG5cdCAgICBcIjM0MDUwM1wiOiBcIuiKseWxseWMulwiLFxuXHQgICAgXCIzNDA1MDRcIjogXCLpm6jlsbHljLpcIixcblx0ICAgIFwiMzQwNTA2XCI6IFwi5Y2a5pyb5Yy6XCIsXG5cdCAgICBcIjM0MDUyMVwiOiBcIuW9k+a2guWOv1wiLFxuXHQgICAgXCIzNDA1MjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwNjAwXCI6IFwi5reu5YyX5biCXCIsXG5cdCAgICBcIjM0MDYwMlwiOiBcIuadnOmbhuWMulwiLFxuXHQgICAgXCIzNDA2MDNcIjogXCLnm7jlsbHljLpcIixcblx0ICAgIFwiMzQwNjA0XCI6IFwi54OI5bGx5Yy6XCIsXG5cdCAgICBcIjM0MDYyMVwiOiBcIua/iea6quWOv1wiLFxuXHQgICAgXCIzNDA2MjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwNzAwXCI6IFwi6ZOc6Zm15biCXCIsXG5cdCAgICBcIjM0MDcwMlwiOiBcIumTnOWumOWxseWMulwiLFxuXHQgICAgXCIzNDA3MDNcIjogXCLni67lrZDlsbHljLpcIixcblx0ICAgIFwiMzQwNzExXCI6IFwi6YOK5Yy6XCIsXG5cdCAgICBcIjM0MDcyMVwiOiBcIumTnOmZteWOv1wiLFxuXHQgICAgXCIzNDA3MjJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQwODAwXCI6IFwi5a6J5bqG5biCXCIsXG5cdCAgICBcIjM0MDgwMlwiOiBcIui/juaxn+WMulwiLFxuXHQgICAgXCIzNDA4MDNcIjogXCLlpKfop4LljLpcIixcblx0ICAgIFwiMzQwODExXCI6IFwi5a6c56eA5Yy6XCIsXG5cdCAgICBcIjM0MDgyMlwiOiBcIuaAgOWugeWOv1wiLFxuXHQgICAgXCIzNDA4MjNcIjogXCLmnp7pmLPljr9cIixcblx0ICAgIFwiMzQwODI0XCI6IFwi5r2c5bGx5Y6/XCIsXG5cdCAgICBcIjM0MDgyNVwiOiBcIuWkqua5luWOv1wiLFxuXHQgICAgXCIzNDA4MjZcIjogXCLlrr/mnb7ljr9cIixcblx0ICAgIFwiMzQwODI3XCI6IFwi5pyb5rGf5Y6/XCIsXG5cdCAgICBcIjM0MDgyOFwiOiBcIuWys+ilv+WOv1wiLFxuXHQgICAgXCIzNDA4ODFcIjogXCLmoZDln47luIJcIixcblx0ICAgIFwiMzQwODgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTAwMFwiOiBcIum7hOWxseW4glwiLFxuXHQgICAgXCIzNDEwMDJcIjogXCLlsa/muqrljLpcIixcblx0ICAgIFwiMzQxMDAzXCI6IFwi6buE5bGx5Yy6XCIsXG5cdCAgICBcIjM0MTAwNFwiOiBcIuW+veW3nuWMulwiLFxuXHQgICAgXCIzNDEwMjFcIjogXCLmrZnljr9cIixcblx0ICAgIFwiMzQxMDIyXCI6IFwi5LyR5a6B5Y6/XCIsXG5cdCAgICBcIjM0MTAyM1wiOiBcIum7n+WOv1wiLFxuXHQgICAgXCIzNDEwMjRcIjogXCLnpYHpl6jljr9cIixcblx0ICAgIFwiMzQxMDI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTEwMFwiOiBcIua7geW3nuW4glwiLFxuXHQgICAgXCIzNDExMDJcIjogXCLnkIXnkIrljLpcIixcblx0ICAgIFwiMzQxMTAzXCI6IFwi5Y2X6LCv5Yy6XCIsXG5cdCAgICBcIjM0MTEyMlwiOiBcIuadpeWuieWOv1wiLFxuXHQgICAgXCIzNDExMjRcIjogXCLlhajmpJLljr9cIixcblx0ICAgIFwiMzQxMTI1XCI6IFwi5a6a6L+c5Y6/XCIsXG5cdCAgICBcIjM0MTEyNlwiOiBcIuWHpOmYs+WOv1wiLFxuXHQgICAgXCIzNDExODFcIjogXCLlpKnplb/luIJcIixcblx0ICAgIFwiMzQxMTgyXCI6IFwi5piO5YWJ5biCXCIsXG5cdCAgICBcIjM0MTE4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNDEyMDBcIjogXCLpmJzpmLPluIJcIixcblx0ICAgIFwiMzQxMjAyXCI6IFwi6aKN5bee5Yy6XCIsXG5cdCAgICBcIjM0MTIwM1wiOiBcIumijeS4nOWMulwiLFxuXHQgICAgXCIzNDEyMDRcIjogXCLpoo3ms4nljLpcIixcblx0ICAgIFwiMzQxMjIxXCI6IFwi5Li05rOJ5Y6/XCIsXG5cdCAgICBcIjM0MTIyMlwiOiBcIuWkquWSjOWOv1wiLFxuXHQgICAgXCIzNDEyMjVcIjogXCLpmJzljZfljr9cIixcblx0ICAgIFwiMzQxMjI2XCI6IFwi6aKN5LiK5Y6/XCIsXG5cdCAgICBcIjM0MTI4MlwiOiBcIueVjOmmluW4glwiLFxuXHQgICAgXCIzNDEyODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxMzAwXCI6IFwi5a6/5bee5biCXCIsXG5cdCAgICBcIjM0MTMwMlwiOiBcIuWfh+ahpeWMulwiLFxuXHQgICAgXCIzNDEzMjFcIjogXCLnoIDlsbHljr9cIixcblx0ICAgIFwiMzQxMzIyXCI6IFwi6JCn5Y6/XCIsXG5cdCAgICBcIjM0MTMyM1wiOiBcIueBteeSp+WOv1wiLFxuXHQgICAgXCIzNDEzMjRcIjogXCLms5fljr9cIixcblx0ICAgIFwiMzQxMzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM0MTQwMFwiOiBcIuW3oua5luW4glwiLFxuXHQgICAgXCIzNDE0MjFcIjogXCLlupDmsZ/ljr9cIixcblx0ICAgIFwiMzQxNDIyXCI6IFwi5peg5Li65Y6/XCIsXG5cdCAgICBcIjM0MTQyM1wiOiBcIuWQq+WxseWOv1wiLFxuXHQgICAgXCIzNDE0MjRcIjogXCLlkozljr9cIixcblx0ICAgIFwiMzQxNTAwXCI6IFwi5YWt5a6J5biCXCIsXG5cdCAgICBcIjM0MTUwMlwiOiBcIumHkeWuieWMulwiLFxuXHQgICAgXCIzNDE1MDNcIjogXCLoo5XlronljLpcIixcblx0ICAgIFwiMzQxNTIxXCI6IFwi5a+/5Y6/XCIsXG5cdCAgICBcIjM0MTUyMlwiOiBcIumcjemCseWOv1wiLFxuXHQgICAgXCIzNDE1MjNcIjogXCLoiJLln47ljr9cIixcblx0ICAgIFwiMzQxNTI0XCI6IFwi6YeR5a+o5Y6/XCIsXG5cdCAgICBcIjM0MTUyNVwiOiBcIumcjeWxseWOv1wiLFxuXHQgICAgXCIzNDE1MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxNjAwXCI6IFwi5Lqz5bee5biCXCIsXG5cdCAgICBcIjM0MTYwMlwiOiBcIuiwr+WfjuWMulwiLFxuXHQgICAgXCIzNDE2MjFcIjogXCLmtqHpmLPljr9cIixcblx0ICAgIFwiMzQxNjIyXCI6IFwi6JKZ5Z+O5Y6/XCIsXG5cdCAgICBcIjM0MTYyM1wiOiBcIuWIqei+m+WOv1wiLFxuXHQgICAgXCIzNDE2MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxNzAwXCI6IFwi5rGg5bee5biCXCIsXG5cdCAgICBcIjM0MTcwMlwiOiBcIui0teaxoOWMulwiLFxuXHQgICAgXCIzNDE3MjFcIjogXCLkuJzoh7Pljr9cIixcblx0ICAgIFwiMzQxNzIyXCI6IFwi55+z5Y+w5Y6/XCIsXG5cdCAgICBcIjM0MTcyM1wiOiBcIumdkumYs+WOv1wiLFxuXHQgICAgXCIzNDE3MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzQxODAwXCI6IFwi5a6j5Z+O5biCXCIsXG5cdCAgICBcIjM0MTgwMlwiOiBcIuWuo+W3nuWMulwiLFxuXHQgICAgXCIzNDE4MjFcIjogXCLpg47muqrljr9cIixcblx0ICAgIFwiMzQxODIyXCI6IFwi5bm/5b635Y6/XCIsXG5cdCAgICBcIjM0MTgyM1wiOiBcIuazvuWOv1wiLFxuXHQgICAgXCIzNDE4MjRcIjogXCLnu6nmuqrljr9cIixcblx0ICAgIFwiMzQxODI1XCI6IFwi5peM5b635Y6/XCIsXG5cdCAgICBcIjM0MTg4MVwiOiBcIuWugeWbveW4glwiLFxuXHQgICAgXCIzNDE4ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwMDAwXCI6IFwi56aP5bu655yBXCIsXG5cdCAgICBcIjM1MDEwMFwiOiBcIuemj+W3nuW4glwiLFxuXHQgICAgXCIzNTAxMDJcIjogXCLpvJPmpbzljLpcIixcblx0ICAgIFwiMzUwMTAzXCI6IFwi5Y+w5rGf5Yy6XCIsXG5cdCAgICBcIjM1MDEwNFwiOiBcIuS7k+WxseWMulwiLFxuXHQgICAgXCIzNTAxMDVcIjogXCLpqazlsL7ljLpcIixcblx0ICAgIFwiMzUwMTExXCI6IFwi5pmL5a6J5Yy6XCIsXG5cdCAgICBcIjM1MDEyMVwiOiBcIumXveS+r+WOv1wiLFxuXHQgICAgXCIzNTAxMjJcIjogXCLov57msZ/ljr9cIixcblx0ICAgIFwiMzUwMTIzXCI6IFwi572X5rqQ5Y6/XCIsXG5cdCAgICBcIjM1MDEyNFwiOiBcIumXvea4heWOv1wiLFxuXHQgICAgXCIzNTAxMjVcIjogXCLmsLjms7Dljr9cIixcblx0ICAgIFwiMzUwMTI4XCI6IFwi5bmz5r2t5Y6/XCIsXG5cdCAgICBcIjM1MDE4MVwiOiBcIuemj+a4heW4glwiLFxuXHQgICAgXCIzNTAxODJcIjogXCLplb/kuZDluIJcIixcblx0ICAgIFwiMzUwMTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDIwMFwiOiBcIuWOpumXqOW4glwiLFxuXHQgICAgXCIzNTAyMDNcIjogXCLmgJ3mmI7ljLpcIixcblx0ICAgIFwiMzUwMjA1XCI6IFwi5rW35rKn5Yy6XCIsXG5cdCAgICBcIjM1MDIwNlwiOiBcIua5lumHjOWMulwiLFxuXHQgICAgXCIzNTAyMTFcIjogXCLpm4bnvo7ljLpcIixcblx0ICAgIFwiMzUwMjEyXCI6IFwi5ZCM5a6J5Yy6XCIsXG5cdCAgICBcIjM1MDIxM1wiOiBcIue/lOWuieWMulwiLFxuXHQgICAgXCIzNTAyMTRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwMzAwXCI6IFwi6I6G55Sw5biCXCIsXG5cdCAgICBcIjM1MDMwMlwiOiBcIuWfjuWOouWMulwiLFxuXHQgICAgXCIzNTAzMDNcIjogXCLmtrXmsZ/ljLpcIixcblx0ICAgIFwiMzUwMzA0XCI6IFwi6I2U5Z+O5Yy6XCIsXG5cdCAgICBcIjM1MDMwNVwiOiBcIuengOWxv+WMulwiLFxuXHQgICAgXCIzNTAzMjJcIjogXCLku5nmuLjljr9cIixcblx0ICAgIFwiMzUwMzIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM1MDQwMFwiOiBcIuS4ieaYjuW4glwiLFxuXHQgICAgXCIzNTA0MDJcIjogXCLmooXliJfljLpcIixcblx0ICAgIFwiMzUwNDAzXCI6IFwi5LiJ5YWD5Yy6XCIsXG5cdCAgICBcIjM1MDQyMVwiOiBcIuaYjua6quWOv1wiLFxuXHQgICAgXCIzNTA0MjNcIjogXCLmuIXmtYHljr9cIixcblx0ICAgIFwiMzUwNDI0XCI6IFwi5a6B5YyW5Y6/XCIsXG5cdCAgICBcIjM1MDQyNVwiOiBcIuWkp+eUsOWOv1wiLFxuXHQgICAgXCIzNTA0MjZcIjogXCLlsKTmuqrljr9cIixcblx0ICAgIFwiMzUwNDI3XCI6IFwi5rKZ5Y6/XCIsXG5cdCAgICBcIjM1MDQyOFwiOiBcIuWwhuS5kOWOv1wiLFxuXHQgICAgXCIzNTA0MjlcIjogXCLms7DlroHljr9cIixcblx0ICAgIFwiMzUwNDMwXCI6IFwi5bu65a6B5Y6/XCIsXG5cdCAgICBcIjM1MDQ4MVwiOiBcIuawuOWuieW4glwiLFxuXHQgICAgXCIzNTA0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwNTAwXCI6IFwi5rOJ5bee5biCXCIsXG5cdCAgICBcIjM1MDUwMlwiOiBcIumypOWfjuWMulwiLFxuXHQgICAgXCIzNTA1MDNcIjogXCLkuLDms73ljLpcIixcblx0ICAgIFwiMzUwNTA0XCI6IFwi5rSb5rGf5Yy6XCIsXG5cdCAgICBcIjM1MDUwNVwiOiBcIuaziea4r+WMulwiLFxuXHQgICAgXCIzNTA1MjFcIjogXCLmg6Dlronljr9cIixcblx0ICAgIFwiMzUwNTI0XCI6IFwi5a6J5rqq5Y6/XCIsXG5cdCAgICBcIjM1MDUyNVwiOiBcIuawuOaYpeWOv1wiLFxuXHQgICAgXCIzNTA1MjZcIjogXCLlvrfljJbljr9cIixcblx0ICAgIFwiMzUwNTI3XCI6IFwi6YeR6Zeo5Y6/XCIsXG5cdCAgICBcIjM1MDU4MVwiOiBcIuefs+eLruW4glwiLFxuXHQgICAgXCIzNTA1ODJcIjogXCLmmYvmsZ/luIJcIixcblx0ICAgIFwiMzUwNTgzXCI6IFwi5Y2X5a6J5biCXCIsXG5cdCAgICBcIjM1MDU4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNTA2MDBcIjogXCLmvLPlt57luIJcIixcblx0ICAgIFwiMzUwNjAyXCI6IFwi6IqX5Z+O5Yy6XCIsXG5cdCAgICBcIjM1MDYwM1wiOiBcIum+meaWh+WMulwiLFxuXHQgICAgXCIzNTA2MjJcIjogXCLkupHpnITljr9cIixcblx0ICAgIFwiMzUwNjIzXCI6IFwi5ryz5rWm5Y6/XCIsXG5cdCAgICBcIjM1MDYyNFwiOiBcIuivj+WuieWOv1wiLFxuXHQgICAgXCIzNTA2MjVcIjogXCLplb/ms7Dljr9cIixcblx0ICAgIFwiMzUwNjI2XCI6IFwi5Lic5bGx5Y6/XCIsXG5cdCAgICBcIjM1MDYyN1wiOiBcIuWNl+mdluWOv1wiLFxuXHQgICAgXCIzNTA2MjhcIjogXCLlubPlkozljr9cIixcblx0ICAgIFwiMzUwNjI5XCI6IFwi5Y2O5a6J5Y6/XCIsXG5cdCAgICBcIjM1MDY4MVwiOiBcIum+mea1t+W4glwiLFxuXHQgICAgXCIzNTA2ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwNzAwXCI6IFwi5Y2X5bmz5biCXCIsXG5cdCAgICBcIjM1MDcwMlwiOiBcIuW7tuW5s+WMulwiLFxuXHQgICAgXCIzNTA3MjFcIjogXCLpobrmmIzljr9cIixcblx0ICAgIFwiMzUwNzIyXCI6IFwi5rWm5Z+O5Y6/XCIsXG5cdCAgICBcIjM1MDcyM1wiOiBcIuWFieazveWOv1wiLFxuXHQgICAgXCIzNTA3MjRcIjogXCLmnb7muqrljr9cIixcblx0ICAgIFwiMzUwNzI1XCI6IFwi5pS/5ZKM5Y6/XCIsXG5cdCAgICBcIjM1MDc4MVwiOiBcIumCteatpuW4glwiLFxuXHQgICAgXCIzNTA3ODJcIjogXCLmrablpLflsbHluIJcIixcblx0ICAgIFwiMzUwNzgzXCI6IFwi5bu655Ov5biCXCIsXG5cdCAgICBcIjM1MDc4NFwiOiBcIuW7uumYs+W4glwiLFxuXHQgICAgXCIzNTA3ODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwODAwXCI6IFwi6b6Z5bKp5biCXCIsXG5cdCAgICBcIjM1MDgwMlwiOiBcIuaWsOe9l+WMulwiLFxuXHQgICAgXCIzNTA4MjFcIjogXCLplb/msYDljr9cIixcblx0ICAgIFwiMzUwODIyXCI6IFwi5rC45a6a5Y6/XCIsXG5cdCAgICBcIjM1MDgyM1wiOiBcIuS4iuadreWOv1wiLFxuXHQgICAgXCIzNTA4MjRcIjogXCLmrablubPljr9cIixcblx0ICAgIFwiMzUwODI1XCI6IFwi6L+e5Z+O5Y6/XCIsXG5cdCAgICBcIjM1MDg4MVwiOiBcIua8s+W5s+W4glwiLFxuXHQgICAgXCIzNTA4ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzUwOTAwXCI6IFwi5a6B5b635biCXCIsXG5cdCAgICBcIjM1MDkwMlwiOiBcIuiVieWfjuWMulwiLFxuXHQgICAgXCIzNTA5MjFcIjogXCLpnJ7mtabljr9cIixcblx0ICAgIFwiMzUwOTIyXCI6IFwi5Y+k55Sw5Y6/XCIsXG5cdCAgICBcIjM1MDkyM1wiOiBcIuWxj+WNl+WOv1wiLFxuXHQgICAgXCIzNTA5MjRcIjogXCLlr7/lroHljr9cIixcblx0ICAgIFwiMzUwOTI1XCI6IFwi5ZGo5a6B5Y6/XCIsXG5cdCAgICBcIjM1MDkyNlwiOiBcIuafmOiNo+WOv1wiLFxuXHQgICAgXCIzNTA5ODFcIjogXCLnpo/lronluIJcIixcblx0ICAgIFwiMzUwOTgyXCI6IFwi56aP6byO5biCXCIsXG5cdCAgICBcIjM1MDk4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjAwMDBcIjogXCLmsZ/opb/nnIFcIixcblx0ICAgIFwiMzYwMTAwXCI6IFwi5Y2X5piM5biCXCIsXG5cdCAgICBcIjM2MDEwMlwiOiBcIuS4nOa5luWMulwiLFxuXHQgICAgXCIzNjAxMDNcIjogXCLopb/muZbljLpcIixcblx0ICAgIFwiMzYwMTA0XCI6IFwi6Z2S5LqR6LCx5Yy6XCIsXG5cdCAgICBcIjM2MDEwNVwiOiBcIua5vumHjOWMulwiLFxuXHQgICAgXCIzNjAxMTFcIjogXCLpnZLlsbHmuZbljLpcIixcblx0ICAgIFwiMzYwMTIxXCI6IFwi5Y2X5piM5Y6/XCIsXG5cdCAgICBcIjM2MDEyMlwiOiBcIuaWsOW7uuWOv1wiLFxuXHQgICAgXCIzNjAxMjNcIjogXCLlronkuYnljr9cIixcblx0ICAgIFwiMzYwMTI0XCI6IFwi6L+b6LSk5Y6/XCIsXG5cdCAgICBcIjM2MDEyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjAyMDBcIjogXCLmma/lvrfplYfluIJcIixcblx0ICAgIFwiMzYwMjAyXCI6IFwi5piM5rGf5Yy6XCIsXG5cdCAgICBcIjM2MDIwM1wiOiBcIuePoOWxseWMulwiLFxuXHQgICAgXCIzNjAyMjJcIjogXCLmta7mooHljr9cIixcblx0ICAgIFwiMzYwMjgxXCI6IFwi5LmQ5bmz5biCXCIsXG5cdCAgICBcIjM2MDI4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjAzMDBcIjogXCLokI3kuaHluIJcIixcblx0ICAgIFwiMzYwMzAyXCI6IFwi5a6J5rqQ5Yy6XCIsXG5cdCAgICBcIjM2MDMxM1wiOiBcIua5mOS4nOWMulwiLFxuXHQgICAgXCIzNjAzMjFcIjogXCLojrLoirHljr9cIixcblx0ICAgIFwiMzYwMzIyXCI6IFwi5LiK5qCX5Y6/XCIsXG5cdCAgICBcIjM2MDMyM1wiOiBcIuiKpua6quWOv1wiLFxuXHQgICAgXCIzNjAzMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwNDAwXCI6IFwi5Lmd5rGf5biCXCIsXG5cdCAgICBcIjM2MDQwMlwiOiBcIuW6kOWxseWMulwiLFxuXHQgICAgXCIzNjA0MDNcIjogXCLmtZTpmLPljLpcIixcblx0ICAgIFwiMzYwNDIxXCI6IFwi5Lmd5rGf5Y6/XCIsXG5cdCAgICBcIjM2MDQyM1wiOiBcIuatpuWugeWOv1wiLFxuXHQgICAgXCIzNjA0MjRcIjogXCLkv67msLTljr9cIixcblx0ICAgIFwiMzYwNDI1XCI6IFwi5rC45L+u5Y6/XCIsXG5cdCAgICBcIjM2MDQyNlwiOiBcIuW+t+WuieWOv1wiLFxuXHQgICAgXCIzNjA0MjdcIjogXCLmmJ/lrZDljr9cIixcblx0ICAgIFwiMzYwNDI4XCI6IFwi6YO95piM5Y6/XCIsXG5cdCAgICBcIjM2MDQyOVwiOiBcIua5luWPo+WOv1wiLFxuXHQgICAgXCIzNjA0MzBcIjogXCLlva3ms73ljr9cIixcblx0ICAgIFwiMzYwNDgxXCI6IFwi55Ge5piM5biCXCIsXG5cdCAgICBcIjM2MDQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjA0ODNcIjogXCLlhbHpnZLln47luIJcIixcblx0ICAgIFwiMzYwNTAwXCI6IFwi5paw5L2Z5biCXCIsXG5cdCAgICBcIjM2MDUwMlwiOiBcIua4neawtOWMulwiLFxuXHQgICAgXCIzNjA1MjFcIjogXCLliIblrpzljr9cIixcblx0ICAgIFwiMzYwNTIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM2MDYwMFwiOiBcIum5sOa9reW4glwiLFxuXHQgICAgXCIzNjA2MDJcIjogXCLmnIjmuZbljLpcIixcblx0ICAgIFwiMzYwNjIyXCI6IFwi5L2Z5rGf5Y6/XCIsXG5cdCAgICBcIjM2MDY4MVwiOiBcIui0tea6quW4glwiLFxuXHQgICAgXCIzNjA2ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYwNzAwXCI6IFwi6LWj5bee5biCXCIsXG5cdCAgICBcIjM2MDcwMlwiOiBcIueroOi0oeWMulwiLFxuXHQgICAgXCIzNjA3MjFcIjogXCLotaPljr9cIixcblx0ICAgIFwiMzYwNzIyXCI6IFwi5L+h5Liw5Y6/XCIsXG5cdCAgICBcIjM2MDcyM1wiOiBcIuWkp+S9meWOv1wiLFxuXHQgICAgXCIzNjA3MjRcIjogXCLkuIrnirnljr9cIixcblx0ICAgIFwiMzYwNzI1XCI6IFwi5bSH5LmJ5Y6/XCIsXG5cdCAgICBcIjM2MDcyNlwiOiBcIuWuiei/nOWOv1wiLFxuXHQgICAgXCIzNjA3MjdcIjogXCLpvpnljZfljr9cIixcblx0ICAgIFwiMzYwNzI4XCI6IFwi5a6a5Y2X5Y6/XCIsXG5cdCAgICBcIjM2MDcyOVwiOiBcIuWFqOWNl+WOv1wiLFxuXHQgICAgXCIzNjA3MzBcIjogXCLlroHpg73ljr9cIixcblx0ICAgIFwiMzYwNzMxXCI6IFwi5LqO6YO95Y6/XCIsXG5cdCAgICBcIjM2MDczMlwiOiBcIuWFtOWbveWOv1wiLFxuXHQgICAgXCIzNjA3MzNcIjogXCLkvJrmmIzljr9cIixcblx0ICAgIFwiMzYwNzM0XCI6IFwi5a+75LmM5Y6/XCIsXG5cdCAgICBcIjM2MDczNVwiOiBcIuefs+WfjuWOv1wiLFxuXHQgICAgXCIzNjA3ODFcIjogXCLnkZ7ph5HluIJcIixcblx0ICAgIFwiMzYwNzgyXCI6IFwi5Y2X5bq35biCXCIsXG5cdCAgICBcIjM2MDc4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjA4MDBcIjogXCLlkInlronluIJcIixcblx0ICAgIFwiMzYwODAyXCI6IFwi5ZCJ5bee5Yy6XCIsXG5cdCAgICBcIjM2MDgwM1wiOiBcIumdkuWOn+WMulwiLFxuXHQgICAgXCIzNjA4MjFcIjogXCLlkInlronljr9cIixcblx0ICAgIFwiMzYwODIyXCI6IFwi5ZCJ5rC05Y6/XCIsXG5cdCAgICBcIjM2MDgyM1wiOiBcIuWzoeaxn+WOv1wiLFxuXHQgICAgXCIzNjA4MjRcIjogXCLmlrDlubLljr9cIixcblx0ICAgIFwiMzYwODI1XCI6IFwi5rC45Liw5Y6/XCIsXG5cdCAgICBcIjM2MDgyNlwiOiBcIuazsOWSjOWOv1wiLFxuXHQgICAgXCIzNjA4MjdcIjogXCLpgYLlt53ljr9cIixcblx0ICAgIFwiMzYwODI4XCI6IFwi5LiH5a6J5Y6/XCIsXG5cdCAgICBcIjM2MDgyOVwiOiBcIuWuieemj+WOv1wiLFxuXHQgICAgXCIzNjA4MzBcIjogXCLmsLjmlrDljr9cIixcblx0ICAgIFwiMzYwODgxXCI6IFwi5LqV5YaI5bGx5biCXCIsXG5cdCAgICBcIjM2MDg4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjA5MDBcIjogXCLlrpzmmKXluIJcIixcblx0ICAgIFwiMzYwOTAyXCI6IFwi6KKB5bee5Yy6XCIsXG5cdCAgICBcIjM2MDkyMVwiOiBcIuWlieaWsOWOv1wiLFxuXHQgICAgXCIzNjA5MjJcIjogXCLkuIfovb3ljr9cIixcblx0ICAgIFwiMzYwOTIzXCI6IFwi5LiK6auY5Y6/XCIsXG5cdCAgICBcIjM2MDkyNFwiOiBcIuWunOS4sOWOv1wiLFxuXHQgICAgXCIzNjA5MjVcIjogXCLpnZblronljr9cIixcblx0ICAgIFwiMzYwOTI2XCI6IFwi6ZOc6byT5Y6/XCIsXG5cdCAgICBcIjM2MDk4MVwiOiBcIuS4sOWfjuW4glwiLFxuXHQgICAgXCIzNjA5ODJcIjogXCLmqJ/moJHluIJcIixcblx0ICAgIFwiMzYwOTgzXCI6IFwi6auY5a6J5biCXCIsXG5cdCAgICBcIjM2MDk4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNjEwMDBcIjogXCLmiprlt57luIJcIixcblx0ICAgIFwiMzYxMDAyXCI6IFwi5Li05bed5Yy6XCIsXG5cdCAgICBcIjM2MTAyMVwiOiBcIuWNl+WfjuWOv1wiLFxuXHQgICAgXCIzNjEwMjJcIjogXCLpu47lt53ljr9cIixcblx0ICAgIFwiMzYxMDIzXCI6IFwi5Y2X5Liw5Y6/XCIsXG5cdCAgICBcIjM2MTAyNFwiOiBcIuW0h+S7geWOv1wiLFxuXHQgICAgXCIzNjEwMjVcIjogXCLkuZDlronljr9cIixcblx0ICAgIFwiMzYxMDI2XCI6IFwi5a6c6buE5Y6/XCIsXG5cdCAgICBcIjM2MTAyN1wiOiBcIumHkea6quWOv1wiLFxuXHQgICAgXCIzNjEwMjhcIjogXCLotYTmuqrljr9cIixcblx0ICAgIFwiMzYxMDI5XCI6IFwi5Lic5Lmh5Y6/XCIsXG5cdCAgICBcIjM2MTAzMFwiOiBcIuW5v+aYjOWOv1wiLFxuXHQgICAgXCIzNjEwMzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzYxMTAwXCI6IFwi5LiK6aW25biCXCIsXG5cdCAgICBcIjM2MTEwMlwiOiBcIuS/oeW3nuWMulwiLFxuXHQgICAgXCIzNjExMjFcIjogXCLkuIrppbbljr9cIixcblx0ICAgIFwiMzYxMTIyXCI6IFwi5bm/5Liw5Y6/XCIsXG5cdCAgICBcIjM2MTEyM1wiOiBcIueOieWxseWOv1wiLFxuXHQgICAgXCIzNjExMjRcIjogXCLpk4XlsbHljr9cIixcblx0ICAgIFwiMzYxMTI1XCI6IFwi5qiq5bOw5Y6/XCIsXG5cdCAgICBcIjM2MTEyNlwiOiBcIuW8i+mYs+WOv1wiLFxuXHQgICAgXCIzNjExMjdcIjogXCLkvZnlubLljr9cIixcblx0ICAgIFwiMzYxMTI4XCI6IFwi6YSx6Ziz5Y6/XCIsXG5cdCAgICBcIjM2MTEyOVwiOiBcIuS4h+W5tOWOv1wiLFxuXHQgICAgXCIzNjExMzBcIjogXCLlqbrmupDljr9cIixcblx0ICAgIFwiMzYxMTgxXCI6IFwi5b635YW05biCXCIsXG5cdCAgICBcIjM2MTE4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzAwMDBcIjogXCLlsbHkuJznnIFcIixcblx0ICAgIFwiMzcwMTAwXCI6IFwi5rWO5Y2X5biCXCIsXG5cdCAgICBcIjM3MDEwMlwiOiBcIuWOhuS4i+WMulwiLFxuXHQgICAgXCIzNzAxMDNcIjogXCLluILkuK3ljLpcIixcblx0ICAgIFwiMzcwMTA0XCI6IFwi5qeQ6I2r5Yy6XCIsXG5cdCAgICBcIjM3MDEwNVwiOiBcIuWkqeahpeWMulwiLFxuXHQgICAgXCIzNzAxMTJcIjogXCLljobln47ljLpcIixcblx0ICAgIFwiMzcwMTEzXCI6IFwi6ZW/5riF5Yy6XCIsXG5cdCAgICBcIjM3MDEyNFwiOiBcIuW5s+mYtOWOv1wiLFxuXHQgICAgXCIzNzAxMjVcIjogXCLmtY7pmLPljr9cIixcblx0ICAgIFwiMzcwMTI2XCI6IFwi5ZWG5rKz5Y6/XCIsXG5cdCAgICBcIjM3MDE4MVwiOiBcIueroOS4mOW4glwiLFxuXHQgICAgXCIzNzAxODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwMjAwXCI6IFwi6Z2S5bKb5biCXCIsXG5cdCAgICBcIjM3MDIwMlwiOiBcIuW4guWNl+WMulwiLFxuXHQgICAgXCIzNzAyMDNcIjogXCLluILljJfljLpcIixcblx0ICAgIFwiMzcwMjExXCI6IFwi6buE5bKb5Yy6XCIsXG5cdCAgICBcIjM3MDIxMlwiOiBcIuW0guWxseWMulwiLFxuXHQgICAgXCIzNzAyMTNcIjogXCLmnY7msqfljLpcIixcblx0ICAgIFwiMzcwMjE0XCI6IFwi5Z+O6Ziz5Yy6XCIsXG5cdCAgICBcIjM3MDI4MVwiOiBcIuiDtuW3nuW4glwiLFxuXHQgICAgXCIzNzAyODJcIjogXCLljbPloqjluIJcIixcblx0ICAgIFwiMzcwMjgzXCI6IFwi5bmz5bqm5biCXCIsXG5cdCAgICBcIjM3MDI4NVwiOiBcIuiOseilv+W4glwiLFxuXHQgICAgXCIzNzAyODZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwMzAwXCI6IFwi5reE5Y2a5biCXCIsXG5cdCAgICBcIjM3MDMwMlwiOiBcIua3hOW3neWMulwiLFxuXHQgICAgXCIzNzAzMDNcIjogXCLlvKDlupfljLpcIixcblx0ICAgIFwiMzcwMzA0XCI6IFwi5Y2a5bGx5Yy6XCIsXG5cdCAgICBcIjM3MDMwNVwiOiBcIuS4tOa3hOWMulwiLFxuXHQgICAgXCIzNzAzMDZcIjogXCLlkajmnZHljLpcIixcblx0ICAgIFwiMzcwMzIxXCI6IFwi5qGT5Y+w5Y6/XCIsXG5cdCAgICBcIjM3MDMyMlwiOiBcIumrmOmdkuWOv1wiLFxuXHQgICAgXCIzNzAzMjNcIjogXCLmsoLmupDljr9cIixcblx0ICAgIFwiMzcwMzI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDQwMFwiOiBcIuaeo+W6hOW4glwiLFxuXHQgICAgXCIzNzA0MDJcIjogXCLluILkuK3ljLpcIixcblx0ICAgIFwiMzcwNDAzXCI6IFwi6Jab5Z+O5Yy6XCIsXG5cdCAgICBcIjM3MDQwNFwiOiBcIuWzhOWfjuWMulwiLFxuXHQgICAgXCIzNzA0MDVcIjogXCLlj7DlhL/luoTljLpcIixcblx0ICAgIFwiMzcwNDA2XCI6IFwi5bGx5Lqt5Yy6XCIsXG5cdCAgICBcIjM3MDQ4MVwiOiBcIua7leW3nuW4glwiLFxuXHQgICAgXCIzNzA0ODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwNTAwXCI6IFwi5Lic6JCl5biCXCIsXG5cdCAgICBcIjM3MDUwMlwiOiBcIuS4nOiQpeWMulwiLFxuXHQgICAgXCIzNzA1MDNcIjogXCLmsrPlj6PljLpcIixcblx0ICAgIFwiMzcwNTIxXCI6IFwi5Z6m5Yip5Y6/XCIsXG5cdCAgICBcIjM3MDUyMlwiOiBcIuWIqea0peWOv1wiLFxuXHQgICAgXCIzNzA1MjNcIjogXCLlub/ppbbljr9cIixcblx0ICAgIFwiMzcwNTkxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDYwMFwiOiBcIueDn+WPsOW4glwiLFxuXHQgICAgXCIzNzA2MDJcIjogXCLoip3nvZjljLpcIixcblx0ICAgIFwiMzcwNjExXCI6IFwi56aP5bGx5Yy6XCIsXG5cdCAgICBcIjM3MDYxMlwiOiBcIueJn+W5s+WMulwiLFxuXHQgICAgXCIzNzA2MTNcIjogXCLojrHlsbHljLpcIixcblx0ICAgIFwiMzcwNjM0XCI6IFwi6ZW/5bKb5Y6/XCIsXG5cdCAgICBcIjM3MDY4MVwiOiBcIum+meWPo+W4glwiLFxuXHQgICAgXCIzNzA2ODJcIjogXCLojrHpmLPluIJcIixcblx0ICAgIFwiMzcwNjgzXCI6IFwi6I6x5bee5biCXCIsXG5cdCAgICBcIjM3MDY4NFwiOiBcIuiTrOiOseW4glwiLFxuXHQgICAgXCIzNzA2ODVcIjogXCLmi5vov5zluIJcIixcblx0ICAgIFwiMzcwNjg2XCI6IFwi5qCW6Zye5biCXCIsXG5cdCAgICBcIjM3MDY4N1wiOiBcIua1t+mYs+W4glwiLFxuXHQgICAgXCIzNzA2ODhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcwNzAwXCI6IFwi5r2N5Z2K5biCXCIsXG5cdCAgICBcIjM3MDcwMlwiOiBcIua9jeWfjuWMulwiLFxuXHQgICAgXCIzNzA3MDNcIjogXCLlr5Lkuq3ljLpcIixcblx0ICAgIFwiMzcwNzA0XCI6IFwi5Z2K5a2Q5Yy6XCIsXG5cdCAgICBcIjM3MDcwNVwiOiBcIuWljuaWh+WMulwiLFxuXHQgICAgXCIzNzA3MjRcIjogXCLkuLTmnJDljr9cIixcblx0ICAgIFwiMzcwNzI1XCI6IFwi5piM5LmQ5Y6/XCIsXG5cdCAgICBcIjM3MDc4MVwiOiBcIumdkuW3nuW4glwiLFxuXHQgICAgXCIzNzA3ODJcIjogXCLor7jln47luIJcIixcblx0ICAgIFwiMzcwNzgzXCI6IFwi5a+/5YWJ5biCXCIsXG5cdCAgICBcIjM3MDc4NFwiOiBcIuWuieS4mOW4glwiLFxuXHQgICAgXCIzNzA3ODVcIjogXCLpq5jlr4bluIJcIixcblx0ICAgIFwiMzcwNzg2XCI6IFwi5piM6YKR5biCXCIsXG5cdCAgICBcIjM3MDc4N1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzA4MDBcIjogXCLmtY7lroHluIJcIixcblx0ICAgIFwiMzcwODAyXCI6IFwi5biC5Lit5Yy6XCIsXG5cdCAgICBcIjM3MDgxMVwiOiBcIuS7u+WfjuWMulwiLFxuXHQgICAgXCIzNzA4MjZcIjogXCLlvq7lsbHljr9cIixcblx0ICAgIFwiMzcwODI3XCI6IFwi6bG85Y+w5Y6/XCIsXG5cdCAgICBcIjM3MDgyOFwiOiBcIumHkeS5oeWOv1wiLFxuXHQgICAgXCIzNzA4MjlcIjogXCLlmInnpaXljr9cIixcblx0ICAgIFwiMzcwODMwXCI6IFwi5rG25LiK5Y6/XCIsXG5cdCAgICBcIjM3MDgzMVwiOiBcIuazl+awtOWOv1wiLFxuXHQgICAgXCIzNzA4MzJcIjogXCLmooHlsbHljr9cIixcblx0ICAgIFwiMzcwODgxXCI6IFwi5puy6Zic5biCXCIsXG5cdCAgICBcIjM3MDg4MlwiOiBcIuWFluW3nuW4glwiLFxuXHQgICAgXCIzNzA4ODNcIjogXCLpgrnln47luIJcIixcblx0ICAgIFwiMzcwODg0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MDkwMFwiOiBcIuazsOWuieW4glwiLFxuXHQgICAgXCIzNzA5MDJcIjogXCLms7DlsbHljLpcIixcblx0ICAgIFwiMzcwOTAzXCI6IFwi5bKx5bKz5Yy6XCIsXG5cdCAgICBcIjM3MDkyMVwiOiBcIuWugemYs+WOv1wiLFxuXHQgICAgXCIzNzA5MjNcIjogXCLkuJzlubPljr9cIixcblx0ICAgIFwiMzcwOTgyXCI6IFwi5paw5rOw5biCXCIsXG5cdCAgICBcIjM3MDk4M1wiOiBcIuiCpeWfjuW4glwiLFxuXHQgICAgXCIzNzA5ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxMDAwXCI6IFwi5aiB5rW35biCXCIsXG5cdCAgICBcIjM3MTAwMlwiOiBcIueOr+e/oOWMulwiLFxuXHQgICAgXCIzNzEwODFcIjogXCLmlofnmbvluIJcIixcblx0ICAgIFwiMzcxMDgyXCI6IFwi6I2j5oiQ5biCXCIsXG5cdCAgICBcIjM3MTA4M1wiOiBcIuS5s+WxseW4glwiLFxuXHQgICAgXCIzNzEwODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxMTAwXCI6IFwi5pel54Wn5biCXCIsXG5cdCAgICBcIjM3MTEwMlwiOiBcIuS4nOa4r+WMulwiLFxuXHQgICAgXCIzNzExMDNcIjogXCLlsprlsbHljLpcIixcblx0ICAgIFwiMzcxMTIxXCI6IFwi5LqU6I6y5Y6/XCIsXG5cdCAgICBcIjM3MTEyMlwiOiBcIuiOkuWOv1wiLFxuXHQgICAgXCIzNzExMjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxMjAwXCI6IFwi6I6x6Iqc5biCXCIsXG5cdCAgICBcIjM3MTIwMlwiOiBcIuiOseWfjuWMulwiLFxuXHQgICAgXCIzNzEyMDNcIjogXCLpkqLln47ljLpcIixcblx0ICAgIFwiMzcxMjA0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTMwMFwiOiBcIuS4tOayguW4glwiLFxuXHQgICAgXCIzNzEzMDJcIjogXCLlhbDlsbHljLpcIixcblx0ICAgIFwiMzcxMzExXCI6IFwi572X5bqE5Yy6XCIsXG5cdCAgICBcIjM3MTMxMlwiOiBcIuays+S4nOWMulwiLFxuXHQgICAgXCIzNzEzMjFcIjogXCLmsoLljZfljr9cIixcblx0ICAgIFwiMzcxMzIyXCI6IFwi6YOv5Z+O5Y6/XCIsXG5cdCAgICBcIjM3MTMyM1wiOiBcIuayguawtOWOv1wiLFxuXHQgICAgXCIzNzEzMjRcIjogXCLoi43lsbHljr9cIixcblx0ICAgIFwiMzcxMzI1XCI6IFwi6LS55Y6/XCIsXG5cdCAgICBcIjM3MTMyNlwiOiBcIuW5s+mCkeWOv1wiLFxuXHQgICAgXCIzNzEzMjdcIjogXCLojpLljZfljr9cIixcblx0ICAgIFwiMzcxMzI4XCI6IFwi6JKZ6Zi05Y6/XCIsXG5cdCAgICBcIjM3MTMyOVwiOiBcIuS4tOayreWOv1wiLFxuXHQgICAgXCIzNzEzMzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiMzcxNDAwXCI6IFwi5b635bee5biCXCIsXG5cdCAgICBcIjM3MTQwMlwiOiBcIuW+t+WfjuWMulwiLFxuXHQgICAgXCIzNzE0MjFcIjogXCLpmbXljr9cIixcblx0ICAgIFwiMzcxNDIyXCI6IFwi5a6B5rSl5Y6/XCIsXG5cdCAgICBcIjM3MTQyM1wiOiBcIuW6huS6keWOv1wiLFxuXHQgICAgXCIzNzE0MjRcIjogXCLkuLTpgpHljr9cIixcblx0ICAgIFwiMzcxNDI1XCI6IFwi6b2Q5rKz5Y6/XCIsXG5cdCAgICBcIjM3MTQyNlwiOiBcIuW5s+WOn+WOv1wiLFxuXHQgICAgXCIzNzE0MjdcIjogXCLlpI/mtKXljr9cIixcblx0ICAgIFwiMzcxNDI4XCI6IFwi5q2m5Z+O5Y6/XCIsXG5cdCAgICBcIjM3MTQ4MVwiOiBcIuS5kOmZteW4glwiLFxuXHQgICAgXCIzNzE0ODJcIjogXCLnprnln47luIJcIixcblx0ICAgIFwiMzcxNDgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjM3MTUwMFwiOiBcIuiBiuWfjuW4glwiLFxuXHQgICAgXCIzNzE1MDJcIjogXCLkuJzmmIzlupzljLpcIixcblx0ICAgIFwiMzcxNTIxXCI6IFwi6Ziz6LC35Y6/XCIsXG5cdCAgICBcIjM3MTUyMlwiOiBcIuiOmOWOv1wiLFxuXHQgICAgXCIzNzE1MjNcIjogXCLojIzlubPljr9cIixcblx0ICAgIFwiMzcxNTI0XCI6IFwi5Lic6Zi/5Y6/XCIsXG5cdCAgICBcIjM3MTUyNVwiOiBcIuWGoOWOv1wiLFxuXHQgICAgXCIzNzE1MjZcIjogXCLpq5jllJDljr9cIixcblx0ICAgIFwiMzcxNTgxXCI6IFwi5Li05riF5biCXCIsXG5cdCAgICBcIjM3MTU4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzE2MDBcIjogXCLmu6jlt57luIJcIixcblx0ICAgIFwiMzcxNjAyXCI6IFwi5ruo5Z+O5Yy6XCIsXG5cdCAgICBcIjM3MTYyMVwiOiBcIuaDoOawkeWOv1wiLFxuXHQgICAgXCIzNzE2MjJcIjogXCLpmLPkv6Hljr9cIixcblx0ICAgIFwiMzcxNjIzXCI6IFwi5peg5qOj5Y6/XCIsXG5cdCAgICBcIjM3MTYyNFwiOiBcIuayvuWMluWOv1wiLFxuXHQgICAgXCIzNzE2MjVcIjogXCLljZrlhbTljr9cIixcblx0ICAgIFwiMzcxNjI2XCI6IFwi6YK55bmz5Y6/XCIsXG5cdCAgICBcIjM3MTYyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCIzNzE3MDBcIjogXCLoj4/ms73luIJcIixcblx0ICAgIFwiMzcxNzAyXCI6IFwi54mh5Li55Yy6XCIsXG5cdCAgICBcIjM3MTcyMVwiOiBcIuabueWOv1wiLFxuXHQgICAgXCIzNzE3MjJcIjogXCLljZXljr9cIixcblx0ICAgIFwiMzcxNzIzXCI6IFwi5oiQ5q2m5Y6/XCIsXG5cdCAgICBcIjM3MTcyNFwiOiBcIuW3qOmHjuWOv1wiLFxuXHQgICAgXCIzNzE3MjVcIjogXCLpg5Pln47ljr9cIixcblx0ICAgIFwiMzcxNzI2XCI6IFwi6YSE5Z+O5Y6/XCIsXG5cdCAgICBcIjM3MTcyN1wiOiBcIuWumumZtuWOv1wiLFxuXHQgICAgXCIzNzE3MjhcIjogXCLkuJzmmI7ljr9cIixcblx0ICAgIFwiMzcxNzI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDAwMFwiOiBcIuays+WNl+ecgVwiLFxuXHQgICAgXCI0MTAxMDBcIjogXCLpg5Hlt57luIJcIixcblx0ICAgIFwiNDEwMTAyXCI6IFwi5Lit5Y6f5Yy6XCIsXG5cdCAgICBcIjQxMDEwM1wiOiBcIuS6jOS4g+WMulwiLFxuXHQgICAgXCI0MTAxMDRcIjogXCLnrqHln47lm57ml4/ljLpcIixcblx0ICAgIFwiNDEwMTA1XCI6IFwi6YeR5rC05Yy6XCIsXG5cdCAgICBcIjQxMDEwNlwiOiBcIuS4iuihl+WMulwiLFxuXHQgICAgXCI0MTAxMDhcIjogXCLmg6DmtY7ljLpcIixcblx0ICAgIFwiNDEwMTIyXCI6IFwi5Lit54mf5Y6/XCIsXG5cdCAgICBcIjQxMDE4MVwiOiBcIuW3qeS5ieW4glwiLFxuXHQgICAgXCI0MTAxODJcIjogXCLojaXpmLPluIJcIixcblx0ICAgIFwiNDEwMTgzXCI6IFwi5paw5a+G5biCXCIsXG5cdCAgICBcIjQxMDE4NFwiOiBcIuaWsOmDkeW4glwiLFxuXHQgICAgXCI0MTAxODVcIjogXCLnmbvlsIHluIJcIixcblx0ICAgIFwiNDEwMTg4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDIwMFwiOiBcIuW8gOWwgeW4glwiLFxuXHQgICAgXCI0MTAyMDJcIjogXCLpvpnkuq3ljLpcIixcblx0ICAgIFwiNDEwMjAzXCI6IFwi6aG65rKz5Zue5peP5Yy6XCIsXG5cdCAgICBcIjQxMDIwNFwiOiBcIum8k+alvOWMulwiLFxuXHQgICAgXCI0MTAyMDVcIjogXCLnprnnjovlj7DljLpcIixcblx0ICAgIFwiNDEwMjExXCI6IFwi6YeR5piO5Yy6XCIsXG5cdCAgICBcIjQxMDIyMVwiOiBcIuadnuWOv1wiLFxuXHQgICAgXCI0MTAyMjJcIjogXCLpgJrorrjljr9cIixcblx0ICAgIFwiNDEwMjIzXCI6IFwi5bCJ5rCP5Y6/XCIsXG5cdCAgICBcIjQxMDIyNFwiOiBcIuW8gOWwgeWOv1wiLFxuXHQgICAgXCI0MTAyMjVcIjogXCLlhbDogIPljr9cIixcblx0ICAgIFwiNDEwMjI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDMwMFwiOiBcIua0m+mYs+W4glwiLFxuXHQgICAgXCI0MTAzMDJcIjogXCLogIHln47ljLpcIixcblx0ICAgIFwiNDEwMzAzXCI6IFwi6KW/5bel5Yy6XCIsXG5cdCAgICBcIjQxMDMwNFwiOiBcIueAjeays+WbnuaXj+WMulwiLFxuXHQgICAgXCI0MTAzMDVcIjogXCLmtqfopb/ljLpcIixcblx0ICAgIFwiNDEwMzA2XCI6IFwi5ZCJ5Yip5Yy6XCIsXG5cdCAgICBcIjQxMDMwN1wiOiBcIua0m+m+meWMulwiLFxuXHQgICAgXCI0MTAzMjJcIjogXCLlrZ/mtKXljr9cIixcblx0ICAgIFwiNDEwMzIzXCI6IFwi5paw5a6J5Y6/XCIsXG5cdCAgICBcIjQxMDMyNFwiOiBcIuagvuW3neWOv1wiLFxuXHQgICAgXCI0MTAzMjVcIjogXCLltanljr9cIixcblx0ICAgIFwiNDEwMzI2XCI6IFwi5rGd6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMDMyN1wiOiBcIuWunOmYs+WOv1wiLFxuXHQgICAgXCI0MTAzMjhcIjogXCLmtJvlroHljr9cIixcblx0ICAgIFwiNDEwMzI5XCI6IFwi5LyK5bed5Y6/XCIsXG5cdCAgICBcIjQxMDM4MVwiOiBcIuWBg+W4iOW4glwiLFxuXHQgICAgXCI0MTA0MDBcIjogXCLlubPpobblsbHluIJcIixcblx0ICAgIFwiNDEwNDAyXCI6IFwi5paw5Y2O5Yy6XCIsXG5cdCAgICBcIjQxMDQwM1wiOiBcIuWNq+S4nOWMulwiLFxuXHQgICAgXCI0MTA0MDRcIjogXCLnn7PpvpnljLpcIixcblx0ICAgIFwiNDEwNDExXCI6IFwi5rmb5rKz5Yy6XCIsXG5cdCAgICBcIjQxMDQyMVwiOiBcIuWuneS4sOWOv1wiLFxuXHQgICAgXCI0MTA0MjJcIjogXCLlj7bljr9cIixcblx0ICAgIFwiNDEwNDIzXCI6IFwi6bKB5bGx5Y6/XCIsXG5cdCAgICBcIjQxMDQyNVwiOiBcIumDj+WOv1wiLFxuXHQgICAgXCI0MTA0ODFcIjogXCLoiJ7pkqLluIJcIixcblx0ICAgIFwiNDEwNDgyXCI6IFwi5rGd5bee5biCXCIsXG5cdCAgICBcIjQxMDQ4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTA1MDBcIjogXCLlronpmLPluIJcIixcblx0ICAgIFwiNDEwNTAyXCI6IFwi5paH5bOw5Yy6XCIsXG5cdCAgICBcIjQxMDUwM1wiOiBcIuWMl+WFs+WMulwiLFxuXHQgICAgXCI0MTA1MDVcIjogXCLmrrfpg73ljLpcIixcblx0ICAgIFwiNDEwNTA2XCI6IFwi6b6Z5a6J5Yy6XCIsXG5cdCAgICBcIjQxMDUyMlwiOiBcIuWuiemYs+WOv1wiLFxuXHQgICAgXCI0MTA1MjNcIjogXCLmsaTpmLTljr9cIixcblx0ICAgIFwiNDEwNTI2XCI6IFwi5ruR5Y6/XCIsXG5cdCAgICBcIjQxMDUyN1wiOiBcIuWGhem7hOWOv1wiLFxuXHQgICAgXCI0MTA1ODFcIjogXCLmnpflt57luIJcIixcblx0ICAgIFwiNDEwNTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDYwMFwiOiBcIum5pOWjgeW4glwiLFxuXHQgICAgXCI0MTA2MDJcIjogXCLpuaTlsbHljLpcIixcblx0ICAgIFwiNDEwNjAzXCI6IFwi5bGx5Z+O5Yy6XCIsXG5cdCAgICBcIjQxMDYxMVwiOiBcIua3h+a7qOWMulwiLFxuXHQgICAgXCI0MTA2MjFcIjogXCLmtZrljr9cIixcblx0ICAgIFwiNDEwNjIyXCI6IFwi5reH5Y6/XCIsXG5cdCAgICBcIjQxMDYyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTA3MDBcIjogXCLmlrDkuaHluIJcIixcblx0ICAgIFwiNDEwNzAyXCI6IFwi57qi5peX5Yy6XCIsXG5cdCAgICBcIjQxMDcwM1wiOiBcIuWNq+a7qOWMulwiLFxuXHQgICAgXCI0MTA3MDRcIjogXCLlh6Tms4nljLpcIixcblx0ICAgIFwiNDEwNzExXCI6IFwi54mn6YeO5Yy6XCIsXG5cdCAgICBcIjQxMDcyMVwiOiBcIuaWsOS5oeWOv1wiLFxuXHQgICAgXCI0MTA3MjRcIjogXCLojrflmInljr9cIixcblx0ICAgIFwiNDEwNzI1XCI6IFwi5Y6f6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMDcyNlwiOiBcIuW7tua0peWOv1wiLFxuXHQgICAgXCI0MTA3MjdcIjogXCLlsIHkuJjljr9cIixcblx0ICAgIFwiNDEwNzI4XCI6IFwi6ZW/5Z6j5Y6/XCIsXG5cdCAgICBcIjQxMDc4MVwiOiBcIuWNq+i+ieW4glwiLFxuXHQgICAgXCI0MTA3ODJcIjogXCLovonljr/luIJcIixcblx0ICAgIFwiNDEwNzgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMDgwMFwiOiBcIueEpuS9nOW4glwiLFxuXHQgICAgXCI0MTA4MDJcIjogXCLop6PmlL7ljLpcIixcblx0ICAgIFwiNDEwODAzXCI6IFwi5Lit56uZ5Yy6XCIsXG5cdCAgICBcIjQxMDgwNFwiOiBcIumprOadkeWMulwiLFxuXHQgICAgXCI0MTA4MTFcIjogXCLlsbHpmLPljLpcIixcblx0ICAgIFwiNDEwODIxXCI6IFwi5L+u5q2m5Y6/XCIsXG5cdCAgICBcIjQxMDgyMlwiOiBcIuWNmueIseWOv1wiLFxuXHQgICAgXCI0MTA4MjNcIjogXCLmrabpmZ/ljr9cIixcblx0ICAgIFwiNDEwODI1XCI6IFwi5rip5Y6/XCIsXG5cdCAgICBcIjQxMDg4MVwiOiBcIua1jua6kOW4glwiLFxuXHQgICAgXCI0MTA4ODJcIjogXCLmsoHpmLPluIJcIixcblx0ICAgIFwiNDEwODgzXCI6IFwi5a2f5bee5biCXCIsXG5cdCAgICBcIjQxMDg4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTA5MDBcIjogXCLmv67pmLPluIJcIixcblx0ICAgIFwiNDEwOTAyXCI6IFwi5Y2O6b6Z5Yy6XCIsXG5cdCAgICBcIjQxMDkyMlwiOiBcIua4heS4sOWOv1wiLFxuXHQgICAgXCI0MTA5MjNcIjogXCLljZfkuZDljr9cIixcblx0ICAgIFwiNDEwOTI2XCI6IFwi6IyD5Y6/XCIsXG5cdCAgICBcIjQxMDkyN1wiOiBcIuWPsOWJjeWOv1wiLFxuXHQgICAgXCI0MTA5MjhcIjogXCLmv67pmLPljr9cIixcblx0ICAgIFwiNDEwOTI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTAwMFwiOiBcIuiuuOaYjOW4glwiLFxuXHQgICAgXCI0MTEwMDJcIjogXCLprY/pg73ljLpcIixcblx0ICAgIFwiNDExMDIzXCI6IFwi6K645piM5Y6/XCIsXG5cdCAgICBcIjQxMTAyNFwiOiBcIumEoumZteWOv1wiLFxuXHQgICAgXCI0MTEwMjVcIjogXCLopYTln47ljr9cIixcblx0ICAgIFwiNDExMDgxXCI6IFwi56a55bee5biCXCIsXG5cdCAgICBcIjQxMTA4MlwiOiBcIumVv+iRm+W4glwiLFxuXHQgICAgXCI0MTEwODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExMTAwXCI6IFwi5ryv5rKz5biCXCIsXG5cdCAgICBcIjQxMTEwMlwiOiBcIua6kOaxh+WMulwiLFxuXHQgICAgXCI0MTExMDNcIjogXCLpg77ln47ljLpcIixcblx0ICAgIFwiNDExMTA0XCI6IFwi5Y+s6Zm15Yy6XCIsXG5cdCAgICBcIjQxMTEyMVwiOiBcIuiInumYs+WOv1wiLFxuXHQgICAgXCI0MTExMjJcIjogXCLkuLTpoo3ljr9cIixcblx0ICAgIFwiNDExMTIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQxMTIwMFwiOiBcIuS4iemXqOWzoeW4glwiLFxuXHQgICAgXCI0MTEyMDJcIjogXCLmuZbmu6jljLpcIixcblx0ICAgIFwiNDExMjIxXCI6IFwi5riR5rGg5Y6/XCIsXG5cdCAgICBcIjQxMTIyMlwiOiBcIumZleWOv1wiLFxuXHQgICAgXCI0MTEyMjRcIjogXCLljaLmsI/ljr9cIixcblx0ICAgIFwiNDExMjgxXCI6IFwi5LmJ6ams5biCXCIsXG5cdCAgICBcIjQxMTI4MlwiOiBcIueBteWuneW4glwiLFxuXHQgICAgXCI0MTEyODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExMzAwXCI6IFwi5Y2X6Ziz5biCXCIsXG5cdCAgICBcIjQxMTMwMlwiOiBcIuWum+WfjuWMulwiLFxuXHQgICAgXCI0MTEzMDNcIjogXCLljafpvpnljLpcIixcblx0ICAgIFwiNDExMzIxXCI6IFwi5Y2X5Y+s5Y6/XCIsXG5cdCAgICBcIjQxMTMyMlwiOiBcIuaWueWfjuWOv1wiLFxuXHQgICAgXCI0MTEzMjNcIjogXCLopb/ls6Hljr9cIixcblx0ICAgIFwiNDExMzI0XCI6IFwi6ZWH5bmz5Y6/XCIsXG5cdCAgICBcIjQxMTMyNVwiOiBcIuWGheS5oeWOv1wiLFxuXHQgICAgXCI0MTEzMjZcIjogXCLmt4Xlt53ljr9cIixcblx0ICAgIFwiNDExMzI3XCI6IFwi56S+5peX5Y6/XCIsXG5cdCAgICBcIjQxMTMyOFwiOiBcIuWUkOays+WOv1wiLFxuXHQgICAgXCI0MTEzMjlcIjogXCLmlrDph47ljr9cIixcblx0ICAgIFwiNDExMzMwXCI6IFwi5qGQ5p+P5Y6/XCIsXG5cdCAgICBcIjQxMTM4MVwiOiBcIumCk+W3nuW4glwiLFxuXHQgICAgXCI0MTEzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDExNDAwXCI6IFwi5ZWG5LiY5biCXCIsXG5cdCAgICBcIjQxMTQwMlwiOiBcIuaigeWbreWMulwiLFxuXHQgICAgXCI0MTE0MDNcIjogXCLnnaLpmLPljLpcIixcblx0ICAgIFwiNDExNDIxXCI6IFwi5rCR5p2D5Y6/XCIsXG5cdCAgICBcIjQxMTQyMlwiOiBcIuedouWOv1wiLFxuXHQgICAgXCI0MTE0MjNcIjogXCLlroHpmbXljr9cIixcblx0ICAgIFwiNDExNDI0XCI6IFwi5p+Y5Z+O5Y6/XCIsXG5cdCAgICBcIjQxMTQyNVwiOiBcIuiZnuWfjuWOv1wiLFxuXHQgICAgXCI0MTE0MjZcIjogXCLlpI/pgpHljr9cIixcblx0ICAgIFwiNDExNDgxXCI6IFwi5rC45Z+O5biCXCIsXG5cdCAgICBcIjQxMTQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTE1MDBcIjogXCLkv6HpmLPluIJcIixcblx0ICAgIFwiNDExNTAyXCI6IFwi5rWJ5rKz5Yy6XCIsXG5cdCAgICBcIjQxMTUwM1wiOiBcIuW5s+ahpeWMulwiLFxuXHQgICAgXCI0MTE1MjFcIjogXCLnvZflsbHljr9cIixcblx0ICAgIFwiNDExNTIyXCI6IFwi5YWJ5bGx5Y6/XCIsXG5cdCAgICBcIjQxMTUyM1wiOiBcIuaWsOWOv1wiLFxuXHQgICAgXCI0MTE1MjRcIjogXCLllYbln47ljr9cIixcblx0ICAgIFwiNDExNTI1XCI6IFwi5Zu65aeL5Y6/XCIsXG5cdCAgICBcIjQxMTUyNlwiOiBcIua9ouW3neWOv1wiLFxuXHQgICAgXCI0MTE1MjdcIjogXCLmt67mu6jljr9cIixcblx0ICAgIFwiNDExNTI4XCI6IFwi5oGv5Y6/XCIsXG5cdCAgICBcIjQxMTUyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTE2MDBcIjogXCLlkajlj6PluIJcIixcblx0ICAgIFwiNDExNjAyXCI6IFwi5bed5rGH5Yy6XCIsXG5cdCAgICBcIjQxMTYyMVwiOiBcIuaJtuayn+WOv1wiLFxuXHQgICAgXCI0MTE2MjJcIjogXCLopb/ljY7ljr9cIixcblx0ICAgIFwiNDExNjIzXCI6IFwi5ZWG5rC05Y6/XCIsXG5cdCAgICBcIjQxMTYyNFwiOiBcIuayiOS4mOWOv1wiLFxuXHQgICAgXCI0MTE2MjVcIjogXCLpg7jln47ljr9cIixcblx0ICAgIFwiNDExNjI2XCI6IFwi5reu6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMTYyN1wiOiBcIuWkquW6t+WOv1wiLFxuXHQgICAgXCI0MTE2MjhcIjogXCLpub/pgpHljr9cIixcblx0ICAgIFwiNDExNjgxXCI6IFwi6aG55Z+O5biCXCIsXG5cdCAgICBcIjQxMTY4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MTE3MDBcIjogXCLpqbvpqazlupfluIJcIixcblx0ICAgIFwiNDExNzAyXCI6IFwi6am/5Z+O5Yy6XCIsXG5cdCAgICBcIjQxMTcyMVwiOiBcIuilv+W5s+WOv1wiLFxuXHQgICAgXCI0MTE3MjJcIjogXCLkuIrolKHljr9cIixcblx0ICAgIFwiNDExNzIzXCI6IFwi5bmz6IiG5Y6/XCIsXG5cdCAgICBcIjQxMTcyNFwiOiBcIuato+mYs+WOv1wiLFxuXHQgICAgXCI0MTE3MjVcIjogXCLnoa7lsbHljr9cIixcblx0ICAgIFwiNDExNzI2XCI6IFwi5rOM6Ziz5Y6/XCIsXG5cdCAgICBcIjQxMTcyN1wiOiBcIuaxneWNl+WOv1wiLFxuXHQgICAgXCI0MTE3MjhcIjogXCLpgYLlubPljr9cIixcblx0ICAgIFwiNDExNzI5XCI6IFwi5paw6JSh5Y6/XCIsXG5cdCAgICBcIjQxMTczMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjAwMDBcIjogXCLmuZbljJfnnIFcIixcblx0ICAgIFwiNDIwMTAwXCI6IFwi5q2m5rGJ5biCXCIsXG5cdCAgICBcIjQyMDEwMlwiOiBcIuaxn+WyuOWMulwiLFxuXHQgICAgXCI0MjAxMDNcIjogXCLmsZ/msYnljLpcIixcblx0ICAgIFwiNDIwMTA0XCI6IFwi56Ga5Y+j5Yy6XCIsXG5cdCAgICBcIjQyMDEwNVwiOiBcIuaxiemYs+WMulwiLFxuXHQgICAgXCI0MjAxMDZcIjogXCLmrabmmIzljLpcIixcblx0ICAgIFwiNDIwMTA3XCI6IFwi6Z2S5bGx5Yy6XCIsXG5cdCAgICBcIjQyMDExMVwiOiBcIua0quWxseWMulwiLFxuXHQgICAgXCI0MjAxMTJcIjogXCLkuJzopb/muZbljLpcIixcblx0ICAgIFwiNDIwMTEzXCI6IFwi5rGJ5Y2X5Yy6XCIsXG5cdCAgICBcIjQyMDExNFwiOiBcIuiUoeeUuOWMulwiLFxuXHQgICAgXCI0MjAxMTVcIjogXCLmsZ/lpI/ljLpcIixcblx0ICAgIFwiNDIwMTE2XCI6IFwi6buE6ZmC5Yy6XCIsXG5cdCAgICBcIjQyMDExN1wiOiBcIuaWsOa0suWMulwiLFxuXHQgICAgXCI0MjAxMThcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwMjAwXCI6IFwi6buE55+z5biCXCIsXG5cdCAgICBcIjQyMDIwMlwiOiBcIum7hOefs+a4r+WMulwiLFxuXHQgICAgXCI0MjAyMDNcIjogXCLopb/loZ7lsbHljLpcIixcblx0ICAgIFwiNDIwMjA0XCI6IFwi5LiL6ZmG5Yy6XCIsXG5cdCAgICBcIjQyMDIwNVwiOiBcIumTgeWxseWMulwiLFxuXHQgICAgXCI0MjAyMjJcIjogXCLpmLPmlrDljr9cIixcblx0ICAgIFwiNDIwMjgxXCI6IFwi5aSn5Ya25biCXCIsXG5cdCAgICBcIjQyMDI4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjAzMDBcIjogXCLljYHloLDluIJcIixcblx0ICAgIFwiNDIwMzAyXCI6IFwi6IyF566t5Yy6XCIsXG5cdCAgICBcIjQyMDMwM1wiOiBcIuW8oOa5vuWMulwiLFxuXHQgICAgXCI0MjAzMjFcIjogXCLpg6fljr9cIixcblx0ICAgIFwiNDIwMzIyXCI6IFwi6YOn6KW/5Y6/XCIsXG5cdCAgICBcIjQyMDMyM1wiOiBcIuerueWxseWOv1wiLFxuXHQgICAgXCI0MjAzMjRcIjogXCLnq7nmuqrljr9cIixcblx0ICAgIFwiNDIwMzI1XCI6IFwi5oi/5Y6/XCIsXG5cdCAgICBcIjQyMDM4MVwiOiBcIuS4ueaxn+WPo+W4glwiLFxuXHQgICAgXCI0MjAzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwNTAwXCI6IFwi5a6c5piM5biCXCIsXG5cdCAgICBcIjQyMDUwMlwiOiBcIuilv+mZteWMulwiLFxuXHQgICAgXCI0MjA1MDNcIjogXCLkvI3lrrblspfljLpcIixcblx0ICAgIFwiNDIwNTA0XCI6IFwi54K55Yab5Yy6XCIsXG5cdCAgICBcIjQyMDUwNVwiOiBcIueMh+S6reWMulwiLFxuXHQgICAgXCI0MjA1MDZcIjogXCLlpLfpmbXljLpcIixcblx0ICAgIFwiNDIwNTI1XCI6IFwi6L+c5a6J5Y6/XCIsXG5cdCAgICBcIjQyMDUyNlwiOiBcIuWFtOWxseWOv1wiLFxuXHQgICAgXCI0MjA1MjdcIjogXCLnp63lvZLljr9cIixcblx0ICAgIFwiNDIwNTI4XCI6IFwi6ZW/6Ziz5Zyf5a625peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQyMDUyOVwiOiBcIuS6lOWzsOWcn+WutuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MjA1ODFcIjogXCLlrpzpg73luIJcIixcblx0ICAgIFwiNDIwNTgyXCI6IFwi5b2T6Ziz5biCXCIsXG5cdCAgICBcIjQyMDU4M1wiOiBcIuaeneaxn+W4glwiLFxuXHQgICAgXCI0MjA1ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIwNjAwXCI6IFwi6KWE6Ziz5biCXCIsXG5cdCAgICBcIjQyMDYwMlwiOiBcIuilhOWfjuWMulwiLFxuXHQgICAgXCI0MjA2MDZcIjogXCLmqIrln47ljLpcIixcblx0ICAgIFwiNDIwNjA3XCI6IFwi6KWE5bee5Yy6XCIsXG5cdCAgICBcIjQyMDYyNFwiOiBcIuWNl+a8s+WOv1wiLFxuXHQgICAgXCI0MjA2MjVcIjogXCLosLfln47ljr9cIixcblx0ICAgIFwiNDIwNjI2XCI6IFwi5L+d5bq35Y6/XCIsXG5cdCAgICBcIjQyMDY4MlwiOiBcIuiAgeays+WPo+W4glwiLFxuXHQgICAgXCI0MjA2ODNcIjogXCLmnqPpmLPluIJcIixcblx0ICAgIFwiNDIwNjg0XCI6IFwi5a6c5Z+O5biCXCIsXG5cdCAgICBcIjQyMDY4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjA3MDBcIjogXCLphILlt57luIJcIixcblx0ICAgIFwiNDIwNzAyXCI6IFwi5qKB5a2Q5rmW5Yy6XCIsXG5cdCAgICBcIjQyMDcwM1wiOiBcIuWNjuWuueWMulwiLFxuXHQgICAgXCI0MjA3MDRcIjogXCLphILln47ljLpcIixcblx0ICAgIFwiNDIwNzA1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMDgwMFwiOiBcIuiNhumXqOW4glwiLFxuXHQgICAgXCI0MjA4MDJcIjogXCLkuJzlrp3ljLpcIixcblx0ICAgIFwiNDIwODA0XCI6IFwi5o6H5YiA5Yy6XCIsXG5cdCAgICBcIjQyMDgyMVwiOiBcIuS6rOWxseWOv1wiLFxuXHQgICAgXCI0MjA4MjJcIjogXCLmspnmtIvljr9cIixcblx0ICAgIFwiNDIwODgxXCI6IFwi6ZKf56Wl5biCXCIsXG5cdCAgICBcIjQyMDg4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjA5MDBcIjogXCLlrZ3mhJ/luIJcIixcblx0ICAgIFwiNDIwOTAyXCI6IFwi5a2d5Y2X5Yy6XCIsXG5cdCAgICBcIjQyMDkyMVwiOiBcIuWtneaYjOWOv1wiLFxuXHQgICAgXCI0MjA5MjJcIjogXCLlpKfmgp/ljr9cIixcblx0ICAgIFwiNDIwOTIzXCI6IFwi5LqR5qKm5Y6/XCIsXG5cdCAgICBcIjQyMDk4MVwiOiBcIuW6lOWfjuW4glwiLFxuXHQgICAgXCI0MjA5ODJcIjogXCLlronpmYbluIJcIixcblx0ICAgIFwiNDIwOTg0XCI6IFwi5rGJ5bed5biCXCIsXG5cdCAgICBcIjQyMDk4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjEwMDBcIjogXCLojYblt57luIJcIixcblx0ICAgIFwiNDIxMDAyXCI6IFwi5rKZ5biC5Yy6XCIsXG5cdCAgICBcIjQyMTAwM1wiOiBcIuiNhuW3nuWMulwiLFxuXHQgICAgXCI0MjEwMjJcIjogXCLlhazlronljr9cIixcblx0ICAgIFwiNDIxMDIzXCI6IFwi55uR5Yip5Y6/XCIsXG5cdCAgICBcIjQyMTAyNFwiOiBcIuaxn+mZteWOv1wiLFxuXHQgICAgXCI0MjEwODFcIjogXCLnn7PpppbluIJcIixcblx0ICAgIFwiNDIxMDgzXCI6IFwi5rSq5rmW5biCXCIsXG5cdCAgICBcIjQyMTA4N1wiOiBcIuadvua7i+W4glwiLFxuXHQgICAgXCI0MjEwODhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIxMTAwXCI6IFwi6buE5YaI5biCXCIsXG5cdCAgICBcIjQyMTEwMlwiOiBcIum7hOW3nuWMulwiLFxuXHQgICAgXCI0MjExMjFcIjogXCLlm6Lpo47ljr9cIixcblx0ICAgIFwiNDIxMTIyXCI6IFwi57qi5a6J5Y6/XCIsXG5cdCAgICBcIjQyMTEyM1wiOiBcIue9l+eUsOWOv1wiLFxuXHQgICAgXCI0MjExMjRcIjogXCLoi7HlsbHljr9cIixcblx0ICAgIFwiNDIxMTI1XCI6IFwi5rWg5rC05Y6/XCIsXG5cdCAgICBcIjQyMTEyNlwiOiBcIuiVsuaYpeWOv1wiLFxuXHQgICAgXCI0MjExMjdcIjogXCLpu4TmooXljr9cIixcblx0ICAgIFwiNDIxMTgxXCI6IFwi6bq75Z+O5biCXCIsXG5cdCAgICBcIjQyMTE4MlwiOiBcIuatpueptOW4glwiLFxuXHQgICAgXCI0MjExODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDIxMjAwXCI6IFwi5ZK45a6B5biCXCIsXG5cdCAgICBcIjQyMTIwMlwiOiBcIuWSuOWuieWMulwiLFxuXHQgICAgXCI0MjEyMjFcIjogXCLlmInpsbzljr9cIixcblx0ICAgIFwiNDIxMjIyXCI6IFwi6YCa5Z+O5Y6/XCIsXG5cdCAgICBcIjQyMTIyM1wiOiBcIuW0h+mYs+WOv1wiLFxuXHQgICAgXCI0MjEyMjRcIjogXCLpgJrlsbHljr9cIixcblx0ICAgIFwiNDIxMjgxXCI6IFwi6LWk5aOB5biCXCIsXG5cdCAgICBcIjQyMTI4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjEzMDBcIjogXCLpmo/lt57luIJcIixcblx0ICAgIFwiNDIxMzAyXCI6IFwi5pu+6YO95Yy6XCIsXG5cdCAgICBcIjQyMTMyMVwiOiBcIumaj+WOv1wiLFxuXHQgICAgXCI0MjEzODFcIjogXCLlub/msLTluIJcIixcblx0ICAgIFwiNDIxMzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQyMjgwMFwiOiBcIuaBqeaWveWcn+WutuaXj+iLl+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI0MjI4MDFcIjogXCLmganmlr3luIJcIixcblx0ICAgIFwiNDIyODAyXCI6IFwi5Yip5bed5biCXCIsXG5cdCAgICBcIjQyMjgyMlwiOiBcIuW7uuWni+WOv1wiLFxuXHQgICAgXCI0MjI4MjNcIjogXCLlt7TkuJzljr9cIixcblx0ICAgIFwiNDIyODI1XCI6IFwi5a6j5oGp5Y6/XCIsXG5cdCAgICBcIjQyMjgyNlwiOiBcIuWSuOS4sOWOv1wiLFxuXHQgICAgXCI0MjI4MjdcIjogXCLmnaXlh6Tljr9cIixcblx0ICAgIFwiNDIyODI4XCI6IFwi6bmk5bOw5Y6/XCIsXG5cdCAgICBcIjQyMjgyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MjkwMDRcIjogXCLku5nmoYPluIJcIixcblx0ICAgIFwiNDI5MDA1XCI6IFwi5r2c5rGf5biCXCIsXG5cdCAgICBcIjQyOTAwNlwiOiBcIuWkqemXqOW4glwiLFxuXHQgICAgXCI0MjkwMjFcIjogXCLnpZ7lhpzmnrbmnpfljLpcIixcblx0ICAgIFwiNDMwMDAwXCI6IFwi5rmW5Y2X55yBXCIsXG5cdCAgICBcIjQzMDEwMFwiOiBcIumVv+aymeW4glwiLFxuXHQgICAgXCI0MzAxMDJcIjogXCLoipnok4nljLpcIixcblx0ICAgIFwiNDMwMTAzXCI6IFwi5aSp5b+D5Yy6XCIsXG5cdCAgICBcIjQzMDEwNFwiOiBcIuWys+m6k+WMulwiLFxuXHQgICAgXCI0MzAxMDVcIjogXCLlvIDnpo/ljLpcIixcblx0ICAgIFwiNDMwMTExXCI6IFwi6Zuo6Iqx5Yy6XCIsXG5cdCAgICBcIjQzMDEyMVwiOiBcIumVv+aymeWOv1wiLFxuXHQgICAgXCI0MzAxMjJcIjogXCLmnJvln47ljLpcIixcblx0ICAgIFwiNDMwMTI0XCI6IFwi5a6B5Lmh5Y6/XCIsXG5cdCAgICBcIjQzMDE4MVwiOiBcIua1j+mYs+W4glwiLFxuXHQgICAgXCI0MzAxODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwMjAwXCI6IFwi5qCq5rSy5biCXCIsXG5cdCAgICBcIjQzMDIwMlwiOiBcIuiNt+WhmOWMulwiLFxuXHQgICAgXCI0MzAyMDNcIjogXCLoiqbmt57ljLpcIixcblx0ICAgIFwiNDMwMjA0XCI6IFwi55+z5bOw5Yy6XCIsXG5cdCAgICBcIjQzMDIxMVwiOiBcIuWkqeWFg+WMulwiLFxuXHQgICAgXCI0MzAyMjFcIjogXCLmoKrmtLLljr9cIixcblx0ICAgIFwiNDMwMjIzXCI6IFwi5pS45Y6/XCIsXG5cdCAgICBcIjQzMDIyNFwiOiBcIuiMtumZteWOv1wiLFxuXHQgICAgXCI0MzAyMjVcIjogXCLngo7pmbXljr9cIixcblx0ICAgIFwiNDMwMjgxXCI6IFwi6Ya06Zm15biCXCIsXG5cdCAgICBcIjQzMDI4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzAzMDBcIjogXCLmuZjmva3luIJcIixcblx0ICAgIFwiNDMwMzAyXCI6IFwi6Zuo5rmW5Yy6XCIsXG5cdCAgICBcIjQzMDMwNFwiOiBcIuWys+WhmOWMulwiLFxuXHQgICAgXCI0MzAzMjFcIjogXCLmuZjmva3ljr9cIixcblx0ICAgIFwiNDMwMzgxXCI6IFwi5rmY5Lmh5biCXCIsXG5cdCAgICBcIjQzMDM4MlwiOiBcIumftuWxseW4glwiLFxuXHQgICAgXCI0MzAzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwNDAwXCI6IFwi6KGh6Ziz5biCXCIsXG5cdCAgICBcIjQzMDQwNVwiOiBcIuePoOaZluWMulwiLFxuXHQgICAgXCI0MzA0MDZcIjogXCLpm4Hls7DljLpcIixcblx0ICAgIFwiNDMwNDA3XCI6IFwi55+z6byT5Yy6XCIsXG5cdCAgICBcIjQzMDQwOFwiOiBcIuiSuOa5mOWMulwiLFxuXHQgICAgXCI0MzA0MTJcIjogXCLljZflsrPljLpcIixcblx0ICAgIFwiNDMwNDIxXCI6IFwi6KGh6Ziz5Y6/XCIsXG5cdCAgICBcIjQzMDQyMlwiOiBcIuihoeWNl+WOv1wiLFxuXHQgICAgXCI0MzA0MjNcIjogXCLooaHlsbHljr9cIixcblx0ICAgIFwiNDMwNDI0XCI6IFwi6KGh5Lic5Y6/XCIsXG5cdCAgICBcIjQzMDQyNlwiOiBcIuelgeS4nOWOv1wiLFxuXHQgICAgXCI0MzA0ODFcIjogXCLogJLpmLPluIJcIixcblx0ICAgIFwiNDMwNDgyXCI6IFwi5bi45a6B5biCXCIsXG5cdCAgICBcIjQzMDQ4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzA1MDBcIjogXCLpgrXpmLPluIJcIixcblx0ICAgIFwiNDMwNTAyXCI6IFwi5Y+M5riF5Yy6XCIsXG5cdCAgICBcIjQzMDUwM1wiOiBcIuWkp+elpeWMulwiLFxuXHQgICAgXCI0MzA1MTFcIjogXCLljJfloZTljLpcIixcblx0ICAgIFwiNDMwNTIxXCI6IFwi6YK15Lic5Y6/XCIsXG5cdCAgICBcIjQzMDUyMlwiOiBcIuaWsOmCteWOv1wiLFxuXHQgICAgXCI0MzA1MjNcIjogXCLpgrXpmLPljr9cIixcblx0ICAgIFwiNDMwNTI0XCI6IFwi6ZqG5Zue5Y6/XCIsXG5cdCAgICBcIjQzMDUyNVwiOiBcIua0nuWPo+WOv1wiLFxuXHQgICAgXCI0MzA1MjdcIjogXCLnu6XlroHljr9cIixcblx0ICAgIFwiNDMwNTI4XCI6IFwi5paw5a6B5Y6/XCIsXG5cdCAgICBcIjQzMDUyOVwiOiBcIuWfjuatpeiLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MzA1ODFcIjogXCLmrablhojluIJcIixcblx0ICAgIFwiNDMwNTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMDYwMFwiOiBcIuWys+mYs+W4glwiLFxuXHQgICAgXCI0MzA2MDJcIjogXCLlsrPpmLPmpbzljLpcIixcblx0ICAgIFwiNDMwNjAzXCI6IFwi5LqR5rqq5Yy6XCIsXG5cdCAgICBcIjQzMDYxMVwiOiBcIuWQm+WxseWMulwiLFxuXHQgICAgXCI0MzA2MjFcIjogXCLlsrPpmLPljr9cIixcblx0ICAgIFwiNDMwNjIzXCI6IFwi5Y2O5a655Y6/XCIsXG5cdCAgICBcIjQzMDYyNFwiOiBcIua5mOmYtOWOv1wiLFxuXHQgICAgXCI0MzA2MjZcIjogXCLlubPmsZ/ljr9cIixcblx0ICAgIFwiNDMwNjgxXCI6IFwi5rGo572X5biCXCIsXG5cdCAgICBcIjQzMDY4MlwiOiBcIuS4tOa5mOW4glwiLFxuXHQgICAgXCI0MzA2ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMwNzAwXCI6IFwi5bi45b635biCXCIsXG5cdCAgICBcIjQzMDcwMlwiOiBcIuatpumZteWMulwiLFxuXHQgICAgXCI0MzA3MDNcIjogXCLpvI7ln47ljLpcIixcblx0ICAgIFwiNDMwNzIxXCI6IFwi5a6J5Lmh5Y6/XCIsXG5cdCAgICBcIjQzMDcyMlwiOiBcIuaxieWvv+WOv1wiLFxuXHQgICAgXCI0MzA3MjNcIjogXCLmvqfljr9cIixcblx0ICAgIFwiNDMwNzI0XCI6IFwi5Li05r6n5Y6/XCIsXG5cdCAgICBcIjQzMDcyNVwiOiBcIuahg+a6kOWOv1wiLFxuXHQgICAgXCI0MzA3MjZcIjogXCLnn7Ppl6jljr9cIixcblx0ICAgIFwiNDMwNzgxXCI6IFwi5rSl5biC5biCXCIsXG5cdCAgICBcIjQzMDc4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzA4MDBcIjogXCLlvKDlrrbnlYzluIJcIixcblx0ICAgIFwiNDMwODAyXCI6IFwi5rC45a6a5Yy6XCIsXG5cdCAgICBcIjQzMDgxMVwiOiBcIuatpumZtea6kOWMulwiLFxuXHQgICAgXCI0MzA4MjFcIjogXCLmhYjliKnljr9cIixcblx0ICAgIFwiNDMwODIyXCI6IFwi5qGR5qSN5Y6/XCIsXG5cdCAgICBcIjQzMDgyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzA5MDBcIjogXCLnm4rpmLPluIJcIixcblx0ICAgIFwiNDMwOTAyXCI6IFwi6LWE6Ziz5Yy6XCIsXG5cdCAgICBcIjQzMDkwM1wiOiBcIui1q+WxseWMulwiLFxuXHQgICAgXCI0MzA5MjFcIjogXCLljZfljr9cIixcblx0ICAgIFwiNDMwOTIyXCI6IFwi5qGD5rGf5Y6/XCIsXG5cdCAgICBcIjQzMDkyM1wiOiBcIuWuieWMluWOv1wiLFxuXHQgICAgXCI0MzA5ODFcIjogXCLmsoXmsZ/luIJcIixcblx0ICAgIFwiNDMwOTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQzMTAwMFwiOiBcIumDtOW3nuW4glwiLFxuXHQgICAgXCI0MzEwMDJcIjogXCLljJfmuZbljLpcIixcblx0ICAgIFwiNDMxMDAzXCI6IFwi6IuP5LuZ5Yy6XCIsXG5cdCAgICBcIjQzMTAyMVwiOiBcIuahgumYs+WOv1wiLFxuXHQgICAgXCI0MzEwMjJcIjogXCLlrpznq6Dljr9cIixcblx0ICAgIFwiNDMxMDIzXCI6IFwi5rC45YW05Y6/XCIsXG5cdCAgICBcIjQzMTAyNFwiOiBcIuWYieemvuWOv1wiLFxuXHQgICAgXCI0MzEwMjVcIjogXCLkuLTmrabljr9cIixcblx0ICAgIFwiNDMxMDI2XCI6IFwi5rGd5Z+O5Y6/XCIsXG5cdCAgICBcIjQzMTAyN1wiOiBcIuahguS4nOWOv1wiLFxuXHQgICAgXCI0MzEwMjhcIjogXCLlronku4Hljr9cIixcblx0ICAgIFwiNDMxMDgxXCI6IFwi6LWE5YW05biCXCIsXG5cdCAgICBcIjQzMTA4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzExMDBcIjogXCLmsLjlt57luIJcIixcblx0ICAgIFwiNDMxMTAyXCI6IFwi6Zu26Zm15Yy6XCIsXG5cdCAgICBcIjQzMTEwM1wiOiBcIuWGt+awtOa7qeWMulwiLFxuXHQgICAgXCI0MzExMjFcIjogXCLnpYHpmLPljr9cIixcblx0ICAgIFwiNDMxMTIyXCI6IFwi5Lic5a6J5Y6/XCIsXG5cdCAgICBcIjQzMTEyM1wiOiBcIuWPjOeJjOWOv1wiLFxuXHQgICAgXCI0MzExMjRcIjogXCLpgZPljr9cIixcblx0ICAgIFwiNDMxMTI1XCI6IFwi5rGf5rC45Y6/XCIsXG5cdCAgICBcIjQzMTEyNlwiOiBcIuWugei/nOWOv1wiLFxuXHQgICAgXCI0MzExMjdcIjogXCLok53lsbHljr9cIixcblx0ICAgIFwiNDMxMTI4XCI6IFwi5paw55Sw5Y6/XCIsXG5cdCAgICBcIjQzMTEyOVwiOiBcIuaxn+WNjueRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MzExMzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMxMjAwXCI6IFwi5oCA5YyW5biCXCIsXG5cdCAgICBcIjQzMTIwMlwiOiBcIum5pOWfjuWMulwiLFxuXHQgICAgXCI0MzEyMjFcIjogXCLkuK3mlrnljr9cIixcblx0ICAgIFwiNDMxMjIyXCI6IFwi5rKF6Zm15Y6/XCIsXG5cdCAgICBcIjQzMTIyM1wiOiBcIui+sOa6quWOv1wiLFxuXHQgICAgXCI0MzEyMjRcIjogXCLmuobmtabljr9cIixcblx0ICAgIFwiNDMxMjI1XCI6IFwi5Lya5ZCM5Y6/XCIsXG5cdCAgICBcIjQzMTIyNlwiOiBcIum6u+mYs+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MzEyMjdcIjogXCLmlrDmmYPkvpfml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDMxMjI4XCI6IFwi6Iq35rGf5L6X5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQzMTIyOVwiOiBcIumdluW3nuiLl+aXj+S+l+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0MzEyMzBcIjogXCLpgJrpgZPkvpfml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDMxMjgxXCI6IFwi5rSq5rGf5biCXCIsXG5cdCAgICBcIjQzMTI4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0MzEzMDBcIjogXCLlqITlupXluIJcIixcblx0ICAgIFwiNDMxMzAyXCI6IFwi5aiE5pif5Yy6XCIsXG5cdCAgICBcIjQzMTMyMVwiOiBcIuWPjOWzsOWOv1wiLFxuXHQgICAgXCI0MzEzMjJcIjogXCLmlrDljJbljr9cIixcblx0ICAgIFwiNDMxMzgxXCI6IFwi5Ya35rC05rGf5biCXCIsXG5cdCAgICBcIjQzMTM4MlwiOiBcIua2n+a6kOW4glwiLFxuXHQgICAgXCI0MzEzODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDMzMTAwXCI6IFwi5rmY6KW/5Zyf5a625peP6IuX5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjQzMzEwMVwiOiBcIuWQiemmluW4glwiLFxuXHQgICAgXCI0MzMxMjJcIjogXCLms7jmuqrljr9cIixcblx0ICAgIFwiNDMzMTIzXCI6IFwi5Yek5Yew5Y6/XCIsXG5cdCAgICBcIjQzMzEyNFwiOiBcIuiKseWeo+WOv1wiLFxuXHQgICAgXCI0MzMxMjVcIjogXCLkv53pnZbljr9cIixcblx0ICAgIFwiNDMzMTI2XCI6IFwi5Y+k5LiI5Y6/XCIsXG5cdCAgICBcIjQzMzEyN1wiOiBcIuawuOmhuuWOv1wiLFxuXHQgICAgXCI0MzMxMzBcIjogXCLpvpnlsbHljr9cIixcblx0ICAgIFwiNDMzMTMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDAwMFwiOiBcIuW5v+S4nOecgVwiLFxuXHQgICAgXCI0NDAxMDBcIjogXCLlub/lt57luIJcIixcblx0ICAgIFwiNDQwMTAzXCI6IFwi6I2U5rm+5Yy6XCIsXG5cdCAgICBcIjQ0MDEwNFwiOiBcIui2iuengOWMulwiLFxuXHQgICAgXCI0NDAxMDVcIjogXCLmtbfnj6DljLpcIixcblx0ICAgIFwiNDQwMTA2XCI6IFwi5aSp5rKz5Yy6XCIsXG5cdCAgICBcIjQ0MDExMVwiOiBcIueZveS6keWMulwiLFxuXHQgICAgXCI0NDAxMTJcIjogXCLpu4Tln5TljLpcIixcblx0ICAgIFwiNDQwMTEzXCI6IFwi55Wq56a65Yy6XCIsXG5cdCAgICBcIjQ0MDExNFwiOiBcIuiKsemDveWMulwiLFxuXHQgICAgXCI0NDAxMTVcIjogXCLljZfmspnljLpcIixcblx0ICAgIFwiNDQwMTE2XCI6IFwi6JCd5bKX5Yy6XCIsXG5cdCAgICBcIjQ0MDE4M1wiOiBcIuWinuWfjuW4glwiLFxuXHQgICAgXCI0NDAxODRcIjogXCLku47ljJbluIJcIixcblx0ICAgIFwiNDQwMTg5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDIwMFwiOiBcIumftuWFs+W4glwiLFxuXHQgICAgXCI0NDAyMDNcIjogXCLmrabmsZ/ljLpcIixcblx0ICAgIFwiNDQwMjA0XCI6IFwi5rWI5rGf5Yy6XCIsXG5cdCAgICBcIjQ0MDIwNVwiOiBcIuabsuaxn+WMulwiLFxuXHQgICAgXCI0NDAyMjJcIjogXCLlp4vlhbTljr9cIixcblx0ICAgIFwiNDQwMjI0XCI6IFwi5LuB5YyW5Y6/XCIsXG5cdCAgICBcIjQ0MDIyOVwiOiBcIue/gea6kOWOv1wiLFxuXHQgICAgXCI0NDAyMzJcIjogXCLkubPmupDnkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDQwMjMzXCI6IFwi5paw5Liw5Y6/XCIsXG5cdCAgICBcIjQ0MDI4MVwiOiBcIuS5kOaYjOW4glwiLFxuXHQgICAgXCI0NDAyODJcIjogXCLljZfpm4TluIJcIixcblx0ICAgIFwiNDQwMjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDMwMFwiOiBcIua3seWcs+W4glwiLFxuXHQgICAgXCI0NDAzMDNcIjogXCLnvZfmuZbljLpcIixcblx0ICAgIFwiNDQwMzA0XCI6IFwi56aP55Sw5Yy6XCIsXG5cdCAgICBcIjQ0MDMwNVwiOiBcIuWNl+WxseWMulwiLFxuXHQgICAgXCI0NDAzMDZcIjogXCLlrp3lronljLpcIixcblx0ICAgIFwiNDQwMzA3XCI6IFwi6b6Z5bKX5Yy6XCIsXG5cdCAgICBcIjQ0MDMwOFwiOiBcIuebkOeUsOWMulwiLFxuXHQgICAgXCI0NDAzMDlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwMzIwXCI6IFwi5YWJ5piO5paw5Yy6XCIsXG5cdCAgICBcIjQ0MDMyMVwiOiBcIuWdquWxseaWsOWMulwiLFxuXHQgICAgXCI0NDAzMjJcIjogXCLlpKfpuY/mlrDljLpcIixcblx0ICAgIFwiNDQwMzIzXCI6IFwi6b6Z5Y2O5paw5Yy6XCIsXG5cdCAgICBcIjQ0MDQwMFwiOiBcIuePoOa1t+W4glwiLFxuXHQgICAgXCI0NDA0MDJcIjogXCLpppnmtLLljLpcIixcblx0ICAgIFwiNDQwNDAzXCI6IFwi5paX6Zeo5Yy6XCIsXG5cdCAgICBcIjQ0MDQwNFwiOiBcIumHkea5vuWMulwiLFxuXHQgICAgXCI0NDA0ODhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwNTAwXCI6IFwi5rGV5aS05biCXCIsXG5cdCAgICBcIjQ0MDUwN1wiOiBcIum+mea5luWMulwiLFxuXHQgICAgXCI0NDA1MTFcIjogXCLph5HlubPljLpcIixcblx0ICAgIFwiNDQwNTEyXCI6IFwi5r+g5rGf5Yy6XCIsXG5cdCAgICBcIjQ0MDUxM1wiOiBcIua9rumYs+WMulwiLFxuXHQgICAgXCI0NDA1MTRcIjogXCLmva7ljZfljLpcIixcblx0ICAgIFwiNDQwNTE1XCI6IFwi5r6E5rW35Yy6XCIsXG5cdCAgICBcIjQ0MDUyM1wiOiBcIuWNl+a+s+WOv1wiLFxuXHQgICAgXCI0NDA1MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwNjAwXCI6IFwi5L2b5bGx5biCXCIsXG5cdCAgICBcIjQ0MDYwNFwiOiBcIuemheWfjuWMulwiLFxuXHQgICAgXCI0NDA2MDVcIjogXCLljZfmtbfljLpcIixcblx0ICAgIFwiNDQwNjA2XCI6IFwi6aG65b635Yy6XCIsXG5cdCAgICBcIjQ0MDYwN1wiOiBcIuS4ieawtOWMulwiLFxuXHQgICAgXCI0NDA2MDhcIjogXCLpq5jmmI7ljLpcIixcblx0ICAgIFwiNDQwNjA5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDcwMFwiOiBcIuaxn+mXqOW4glwiLFxuXHQgICAgXCI0NDA3MDNcIjogXCLok6zmsZ/ljLpcIixcblx0ICAgIFwiNDQwNzA0XCI6IFwi5rGf5rW35Yy6XCIsXG5cdCAgICBcIjQ0MDcwNVwiOiBcIuaWsOS8muWMulwiLFxuXHQgICAgXCI0NDA3ODFcIjogXCLlj7DlsbHluIJcIixcblx0ICAgIFwiNDQwNzgzXCI6IFwi5byA5bmz5biCXCIsXG5cdCAgICBcIjQ0MDc4NFwiOiBcIum5pOWxseW4glwiLFxuXHQgICAgXCI0NDA3ODVcIjogXCLmganlubPluIJcIixcblx0ICAgIFwiNDQwNzg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MDgwMFwiOiBcIua5m+axn+W4glwiLFxuXHQgICAgXCI0NDA4MDJcIjogXCLotaTlnY7ljLpcIixcblx0ICAgIFwiNDQwODAzXCI6IFwi6Zye5bGx5Yy6XCIsXG5cdCAgICBcIjQ0MDgwNFwiOiBcIuWdoeWktOWMulwiLFxuXHQgICAgXCI0NDA4MTFcIjogXCLpurvnq6DljLpcIixcblx0ICAgIFwiNDQwODIzXCI6IFwi6YGC5rqq5Y6/XCIsXG5cdCAgICBcIjQ0MDgyNVwiOiBcIuW+kOmXu+WOv1wiLFxuXHQgICAgXCI0NDA4ODFcIjogXCLlu4nmsZ/luIJcIixcblx0ICAgIFwiNDQwODgyXCI6IFwi6Zu35bee5biCXCIsXG5cdCAgICBcIjQ0MDg4M1wiOiBcIuWQtOW3neW4glwiLFxuXHQgICAgXCI0NDA4ODRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQwOTAwXCI6IFwi6IyC5ZCN5biCXCIsXG5cdCAgICBcIjQ0MDkwMlwiOiBcIuiMguWNl+WMulwiLFxuXHQgICAgXCI0NDA5MDNcIjogXCLojILmuK/ljLpcIixcblx0ICAgIFwiNDQwOTIzXCI6IFwi55S155m95Y6/XCIsXG5cdCAgICBcIjQ0MDk4MVwiOiBcIumrmOW3nuW4glwiLFxuXHQgICAgXCI0NDA5ODJcIjogXCLljJblt57luIJcIixcblx0ICAgIFwiNDQwOTgzXCI6IFwi5L+h5a6c5biCXCIsXG5cdCAgICBcIjQ0MDk4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDEyMDBcIjogXCLogofluobluIJcIixcblx0ICAgIFwiNDQxMjAyXCI6IFwi56uv5bee5Yy6XCIsXG5cdCAgICBcIjQ0MTIwM1wiOiBcIum8jua5luWMulwiLFxuXHQgICAgXCI0NDEyMjNcIjogXCLlub/lroHljr9cIixcblx0ICAgIFwiNDQxMjI0XCI6IFwi5oCA6ZuG5Y6/XCIsXG5cdCAgICBcIjQ0MTIyNVwiOiBcIuWwgeW8gOWOv1wiLFxuXHQgICAgXCI0NDEyMjZcIjogXCLlvrfluobljr9cIixcblx0ICAgIFwiNDQxMjgzXCI6IFwi6auY6KaB5biCXCIsXG5cdCAgICBcIjQ0MTI4NFwiOiBcIuWbm+S8muW4glwiLFxuXHQgICAgXCI0NDEyODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDQxMzAwXCI6IFwi5oOg5bee5biCXCIsXG5cdCAgICBcIjQ0MTMwMlwiOiBcIuaDoOWfjuWMulwiLFxuXHQgICAgXCI0NDEzMDNcIjogXCLmg6DpmLPljLpcIixcblx0ICAgIFwiNDQxMzIyXCI6IFwi5Y2a572X5Y6/XCIsXG5cdCAgICBcIjQ0MTMyM1wiOiBcIuaDoOS4nOWOv1wiLFxuXHQgICAgXCI0NDEzMjRcIjogXCLpvpnpl6jljr9cIixcblx0ICAgIFwiNDQxMzI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTQwMFwiOiBcIuaiheW3nuW4glwiLFxuXHQgICAgXCI0NDE0MDJcIjogXCLmooXmsZ/ljLpcIixcblx0ICAgIFwiNDQxNDIxXCI6IFwi5qKF5Y6/XCIsXG5cdCAgICBcIjQ0MTQyMlwiOiBcIuWkp+WflOWOv1wiLFxuXHQgICAgXCI0NDE0MjNcIjogXCLkuLDpobrljr9cIixcblx0ICAgIFwiNDQxNDI0XCI6IFwi5LqU5Y2O5Y6/XCIsXG5cdCAgICBcIjQ0MTQyNlwiOiBcIuW5s+i/nOWOv1wiLFxuXHQgICAgXCI0NDE0MjdcIjogXCLolYnlsq3ljr9cIixcblx0ICAgIFwiNDQxNDgxXCI6IFwi5YW05a6B5biCXCIsXG5cdCAgICBcIjQ0MTQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDE1MDBcIjogXCLmsZXlsL7luIJcIixcblx0ICAgIFwiNDQxNTAyXCI6IFwi5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0MTUyMVwiOiBcIua1t+S4sOWOv1wiLFxuXHQgICAgXCI0NDE1MjNcIjogXCLpmYbmsrPljr9cIixcblx0ICAgIFwiNDQxNTgxXCI6IFwi6ZmG5Liw5biCXCIsXG5cdCAgICBcIjQ0MTU4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDE2MDBcIjogXCLmsrPmupDluIJcIixcblx0ICAgIFwiNDQxNjAyXCI6IFwi5rqQ5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0MTYyMVwiOiBcIue0q+mHkeWOv1wiLFxuXHQgICAgXCI0NDE2MjJcIjogXCLpvpnlt53ljr9cIixcblx0ICAgIFwiNDQxNjIzXCI6IFwi6L+e5bmz5Y6/XCIsXG5cdCAgICBcIjQ0MTYyNFwiOiBcIuWSjOW5s+WOv1wiLFxuXHQgICAgXCI0NDE2MjVcIjogXCLkuJzmupDljr9cIixcblx0ICAgIFwiNDQxNjI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTcwMFwiOiBcIumYs+axn+W4glwiLFxuXHQgICAgXCI0NDE3MDJcIjogXCLmsZ/ln47ljLpcIixcblx0ICAgIFwiNDQxNzIxXCI6IFwi6Ziz6KW/5Y6/XCIsXG5cdCAgICBcIjQ0MTcyM1wiOiBcIumYs+S4nOWOv1wiLFxuXHQgICAgXCI0NDE3ODFcIjogXCLpmLPmmKXluIJcIixcblx0ICAgIFwiNDQxNzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0MTgwMFwiOiBcIua4hei/nOW4glwiLFxuXHQgICAgXCI0NDE4MDJcIjogXCLmuIXln47ljLpcIixcblx0ICAgIFwiNDQxODIxXCI6IFwi5L2b5YaI5Y6/XCIsXG5cdCAgICBcIjQ0MTgyM1wiOiBcIumYs+WxseWOv1wiLFxuXHQgICAgXCI0NDE4MjVcIjogXCLov57lsbHlo67ml4/nkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDQxODI2XCI6IFwi6L+e5Y2X55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ0MTgyN1wiOiBcIua4heaWsOWMulwiLFxuXHQgICAgXCI0NDE4ODFcIjogXCLoi7HlvrfluIJcIixcblx0ICAgIFwiNDQxODgyXCI6IFwi6L+e5bee5biCXCIsXG5cdCAgICBcIjQ0MTg4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDE5MDBcIjogXCLkuJzojp7luIJcIixcblx0ICAgIFwiNDQyMDAwXCI6IFwi5Lit5bGx5biCXCIsXG5cdCAgICBcIjQ0MjEwMVwiOiBcIuS4nOaymee+pOWym1wiLFxuXHQgICAgXCI0NDUxMDBcIjogXCLmva7lt57luIJcIixcblx0ICAgIFwiNDQ1MTAyXCI6IFwi5rmY5qGl5Yy6XCIsXG5cdCAgICBcIjQ0NTEyMVwiOiBcIua9ruWuieWMulwiLFxuXHQgICAgXCI0NDUxMjJcIjogXCLppbblubPljr9cIixcblx0ICAgIFwiNDQ1MTg2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ0NTIwMFwiOiBcIuaPremYs+W4glwiLFxuXHQgICAgXCI0NDUyMDJcIjogXCLmppXln47ljLpcIixcblx0ICAgIFwiNDQ1MjIxXCI6IFwi5o+t5Lic5Yy6XCIsXG5cdCAgICBcIjQ0NTIyMlwiOiBcIuaPreilv+WOv1wiLFxuXHQgICAgXCI0NDUyMjRcIjogXCLmg6DmnaXljr9cIixcblx0ICAgIFwiNDQ1MjgxXCI6IFwi5pmu5a6B5biCXCIsXG5cdCAgICBcIjQ0NTI4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NDUzMDBcIjogXCLkupHmta7luIJcIixcblx0ICAgIFwiNDQ1MzAyXCI6IFwi5LqR5Z+O5Yy6XCIsXG5cdCAgICBcIjQ0NTMyMVwiOiBcIuaWsOWFtOWOv1wiLFxuXHQgICAgXCI0NDUzMjJcIjogXCLpg4HljZfljr9cIixcblx0ICAgIFwiNDQ1MzIzXCI6IFwi5LqR5a6J5Y6/XCIsXG5cdCAgICBcIjQ0NTM4MVwiOiBcIue9l+WumuW4glwiLFxuXHQgICAgXCI0NDUzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwMDAwXCI6IFwi5bm/6KW/5aOu5peP6Ieq5rK75Yy6XCIsXG5cdCAgICBcIjQ1MDEwMFwiOiBcIuWNl+WugeW4glwiLFxuXHQgICAgXCI0NTAxMDJcIjogXCLlhbTlroHljLpcIixcblx0ICAgIFwiNDUwMTAzXCI6IFwi6Z2S56eA5Yy6XCIsXG5cdCAgICBcIjQ1MDEwNVwiOiBcIuaxn+WNl+WMulwiLFxuXHQgICAgXCI0NTAxMDdcIjogXCLopb/kuaHloZjljLpcIixcblx0ICAgIFwiNDUwMTA4XCI6IFwi6Imv5bqG5Yy6XCIsXG5cdCAgICBcIjQ1MDEwOVwiOiBcIumCleWugeWMulwiLFxuXHQgICAgXCI0NTAxMjJcIjogXCLmrabpuKPljr9cIixcblx0ICAgIFwiNDUwMTIzXCI6IFwi6ZqG5a6J5Y6/XCIsXG5cdCAgICBcIjQ1MDEyNFwiOiBcIumprOWxseWOv1wiLFxuXHQgICAgXCI0NTAxMjVcIjogXCLkuIrmnpfljr9cIixcblx0ICAgIFwiNDUwMTI2XCI6IFwi5a6+6Ziz5Y6/XCIsXG5cdCAgICBcIjQ1MDEyN1wiOiBcIuaoquWOv1wiLFxuXHQgICAgXCI0NTAxMjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwMjAwXCI6IFwi5p+z5bee5biCXCIsXG5cdCAgICBcIjQ1MDIwMlwiOiBcIuWfjuS4reWMulwiLFxuXHQgICAgXCI0NTAyMDNcIjogXCLpsbzls7DljLpcIixcblx0ICAgIFwiNDUwMjA0XCI6IFwi5p+z5Y2X5Yy6XCIsXG5cdCAgICBcIjQ1MDIwNVwiOiBcIuafs+WMl+WMulwiLFxuXHQgICAgXCI0NTAyMjFcIjogXCLmn7PmsZ/ljr9cIixcblx0ICAgIFwiNDUwMjIyXCI6IFwi5p+z5Z+O5Y6/XCIsXG5cdCAgICBcIjQ1MDIyM1wiOiBcIum5v+WvqOWOv1wiLFxuXHQgICAgXCI0NTAyMjRcIjogXCLono3lronljr9cIixcblx0ICAgIFwiNDUwMjI1XCI6IFwi6J6N5rC06IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MDIyNlwiOiBcIuS4ieaxn+S+l+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTAyMjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUwMzAwXCI6IFwi5qGC5p6X5biCXCIsXG5cdCAgICBcIjQ1MDMwMlwiOiBcIuengOWzsOWMulwiLFxuXHQgICAgXCI0NTAzMDNcIjogXCLlj6DlvanljLpcIixcblx0ICAgIFwiNDUwMzA0XCI6IFwi6LGh5bGx5Yy6XCIsXG5cdCAgICBcIjQ1MDMwNVwiOiBcIuS4g+aYn+WMulwiLFxuXHQgICAgXCI0NTAzMTFcIjogXCLpm4HlsbHljLpcIixcblx0ICAgIFwiNDUwMzIxXCI6IFwi6Ziz5pyU5Y6/XCIsXG5cdCAgICBcIjQ1MDMyMlwiOiBcIuS4tOahguWMulwiLFxuXHQgICAgXCI0NTAzMjNcIjogXCLngbXlt53ljr9cIixcblx0ICAgIFwiNDUwMzI0XCI6IFwi5YWo5bee5Y6/XCIsXG5cdCAgICBcIjQ1MDMyNVwiOiBcIuWFtOWuieWOv1wiLFxuXHQgICAgXCI0NTAzMjZcIjogXCLmsLjnpo/ljr9cIixcblx0ICAgIFwiNDUwMzI3XCI6IFwi54GM6Ziz5Y6/XCIsXG5cdCAgICBcIjQ1MDMyOFwiOiBcIum+meiDnOWQhOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTAzMjlcIjogXCLotYTmupDljr9cIixcblx0ICAgIFwiNDUwMzMwXCI6IFwi5bmz5LmQ5Y6/XCIsXG5cdCAgICBcIjQ1MDMzMVwiOiBcIuiNlOa1puWOv1wiLFxuXHQgICAgXCI0NTAzMzJcIjogXCLmga3ln47nkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUwMzMzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDQwMFwiOiBcIuaip+W3nuW4glwiLFxuXHQgICAgXCI0NTA0MDNcIjogXCLkuIfnp4DljLpcIixcblx0ICAgIFwiNDUwNDA1XCI6IFwi6ZW/5rSy5Yy6XCIsXG5cdCAgICBcIjQ1MDQwNlwiOiBcIum+meWcqeWMulwiLFxuXHQgICAgXCI0NTA0MjFcIjogXCLoi43moqfljr9cIixcblx0ICAgIFwiNDUwNDIyXCI6IFwi6Jek5Y6/XCIsXG5cdCAgICBcIjQ1MDQyM1wiOiBcIuiSmeWxseWOv1wiLFxuXHQgICAgXCI0NTA0ODFcIjogXCLlspHmuqrluIJcIixcblx0ICAgIFwiNDUwNDgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDUwMFwiOiBcIuWMl+a1t+W4glwiLFxuXHQgICAgXCI0NTA1MDJcIjogXCLmtbfln47ljLpcIixcblx0ICAgIFwiNDUwNTAzXCI6IFwi6ZO25rW35Yy6XCIsXG5cdCAgICBcIjQ1MDUxMlwiOiBcIumTgeWxsea4r+WMulwiLFxuXHQgICAgXCI0NTA1MjFcIjogXCLlkIjmtabljr9cIixcblx0ICAgIFwiNDUwNTIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDYwMFwiOiBcIumYsuWfjua4r+W4glwiLFxuXHQgICAgXCI0NTA2MDJcIjogXCLmuK/lj6PljLpcIixcblx0ICAgIFwiNDUwNjAzXCI6IFwi6Ziy5Z+O5Yy6XCIsXG5cdCAgICBcIjQ1MDYyMVwiOiBcIuS4iuaAneWOv1wiLFxuXHQgICAgXCI0NTA2ODFcIjogXCLkuJzlhbTluIJcIixcblx0ICAgIFwiNDUwNjgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDcwMFwiOiBcIumSpuW3nuW4glwiLFxuXHQgICAgXCI0NTA3MDJcIjogXCLpkqbljZfljLpcIixcblx0ICAgIFwiNDUwNzAzXCI6IFwi6ZKm5YyX5Yy6XCIsXG5cdCAgICBcIjQ1MDcyMVwiOiBcIueBteWxseWOv1wiLFxuXHQgICAgXCI0NTA3MjJcIjogXCLmtabljJfljr9cIixcblx0ICAgIFwiNDUwNzIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MDgwMFwiOiBcIui0tea4r+W4glwiLFxuXHQgICAgXCI0NTA4MDJcIjogXCLmuK/ljJfljLpcIixcblx0ICAgIFwiNDUwODAzXCI6IFwi5riv5Y2X5Yy6XCIsXG5cdCAgICBcIjQ1MDgwNFwiOiBcIuimg+WhmOWMulwiLFxuXHQgICAgXCI0NTA4MjFcIjogXCLlubPljZfljr9cIixcblx0ICAgIFwiNDUwODgxXCI6IFwi5qGC5bmz5biCXCIsXG5cdCAgICBcIjQ1MDg4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTA5MDBcIjogXCLnjonmnpfluIJcIixcblx0ICAgIFwiNDUwOTAyXCI6IFwi546J5bee5Yy6XCIsXG5cdCAgICBcIjQ1MDkwM1wiOiBcIuemj+e7teWMulwiLFxuXHQgICAgXCI0NTA5MjFcIjogXCLlrrnljr9cIixcblx0ICAgIFwiNDUwOTIyXCI6IFwi6ZmG5bed5Y6/XCIsXG5cdCAgICBcIjQ1MDkyM1wiOiBcIuWNmueZveWOv1wiLFxuXHQgICAgXCI0NTA5MjRcIjogXCLlhbTkuJrljr9cIixcblx0ICAgIFwiNDUwOTgxXCI6IFwi5YyX5rWB5biCXCIsXG5cdCAgICBcIjQ1MDk4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTEwMDBcIjogXCLnmb7oibLluIJcIixcblx0ICAgIFwiNDUxMDAyXCI6IFwi5Y+z5rGf5Yy6XCIsXG5cdCAgICBcIjQ1MTAyMVwiOiBcIueUsOmYs+WOv1wiLFxuXHQgICAgXCI0NTEwMjJcIjogXCLnlLDkuJzljr9cIixcblx0ICAgIFwiNDUxMDIzXCI6IFwi5bmz5p6c5Y6/XCIsXG5cdCAgICBcIjQ1MTAyNFwiOiBcIuW+t+S/neWOv1wiLFxuXHQgICAgXCI0NTEwMjVcIjogXCLpnZbopb/ljr9cIixcblx0ICAgIFwiNDUxMDI2XCI6IFwi6YKj5Z2h5Y6/XCIsXG5cdCAgICBcIjQ1MTAyN1wiOiBcIuWHjOS6keWOv1wiLFxuXHQgICAgXCI0NTEwMjhcIjogXCLkuZDkuJrljr9cIixcblx0ICAgIFwiNDUxMDI5XCI6IFwi55Sw5p6X5Y6/XCIsXG5cdCAgICBcIjQ1MTAzMFwiOiBcIuilv+ael+WOv1wiLFxuXHQgICAgXCI0NTEwMzFcIjogXCLpmobmnpflkITml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMDMyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjQ1MTEwMFwiOiBcIui0uuW3nuW4glwiLFxuXHQgICAgXCI0NTExMDJcIjogXCLlhavmraXljLpcIixcblx0ICAgIFwiNDUxMTE5XCI6IFwi5bmz5qGC566h55CG5Yy6XCIsXG5cdCAgICBcIjQ1MTEyMVwiOiBcIuaYreW5s+WOv1wiLFxuXHQgICAgXCI0NTExMjJcIjogXCLpkp/lsbHljr9cIixcblx0ICAgIFwiNDUxMTIzXCI6IFwi5a+M5bed55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTEyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTEyMDBcIjogXCLmsrPmsaDluIJcIixcblx0ICAgIFwiNDUxMjAyXCI6IFwi6YeR5Z+O5rGf5Yy6XCIsXG5cdCAgICBcIjQ1MTIyMVwiOiBcIuWNl+S4ueWOv1wiLFxuXHQgICAgXCI0NTEyMjJcIjogXCLlpKnls6jljr9cIixcblx0ICAgIFwiNDUxMjIzXCI6IFwi5Yek5bGx5Y6/XCIsXG5cdCAgICBcIjQ1MTIyNFwiOiBcIuS4nOWFsOWOv1wiLFxuXHQgICAgXCI0NTEyMjVcIjogXCLnvZfln47ku6vkvazml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMjI2XCI6IFwi546v5rGf5q+b5Y2X5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTIyN1wiOiBcIuW3tOmprOeRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NTEyMjhcIjogXCLpg73lronnkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMjI5XCI6IFwi5aSn5YyW55G25peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ1MTI4MVwiOiBcIuWunOW3nuW4glwiLFxuXHQgICAgXCI0NTEyODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDUxMzAwXCI6IFwi5p2l5a6+5biCXCIsXG5cdCAgICBcIjQ1MTMwMlwiOiBcIuWFtOWuvuWMulwiLFxuXHQgICAgXCI0NTEzMjFcIjogXCLlv7vln47ljr9cIixcblx0ICAgIFwiNDUxMzIyXCI6IFwi6LGh5bee5Y6/XCIsXG5cdCAgICBcIjQ1MTMyM1wiOiBcIuatpuWuo+WOv1wiLFxuXHQgICAgXCI0NTEzMjRcIjogXCLph5Hnp4Dnkbbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDUxMzgxXCI6IFwi5ZCI5bGx5biCXCIsXG5cdCAgICBcIjQ1MTM4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NTE0MDBcIjogXCLltIflt6bluIJcIixcblx0ICAgIFwiNDUxNDAyXCI6IFwi5rGf5bee5Yy6XCIsXG5cdCAgICBcIjQ1MTQyMVwiOiBcIuaJtue7peWOv1wiLFxuXHQgICAgXCI0NTE0MjJcIjogXCLlroHmmI7ljr9cIixcblx0ICAgIFwiNDUxNDIzXCI6IFwi6b6Z5bee5Y6/XCIsXG5cdCAgICBcIjQ1MTQyNFwiOiBcIuWkp+aWsOWOv1wiLFxuXHQgICAgXCI0NTE0MjVcIjogXCLlpKnnrYnljr9cIixcblx0ICAgIFwiNDUxNDgxXCI6IFwi5Yet56Wl5biCXCIsXG5cdCAgICBcIjQ1MTQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI0NjAwMDBcIjogXCLmtbfljZfnnIFcIixcblx0ICAgIFwiNDYwMTAwXCI6IFwi5rW35Y+j5biCXCIsXG5cdCAgICBcIjQ2MDEwNVwiOiBcIuengOiLseWMulwiLFxuXHQgICAgXCI0NjAxMDZcIjogXCLpvpnljY7ljLpcIixcblx0ICAgIFwiNDYwMTA3XCI6IFwi55C85bGx5Yy6XCIsXG5cdCAgICBcIjQ2MDEwOFwiOiBcIue+juWFsOWMulwiLFxuXHQgICAgXCI0NjAxMDlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNDYwMjAwXCI6IFwi5LiJ5Lqa5biCXCIsXG5cdCAgICBcIjQ2MDMwMFwiOiBcIuS4ieaymeW4glwiLFxuXHQgICAgXCI0NjAzMjFcIjogXCLopb/mspnnvqTlsptcIixcblx0ICAgIFwiNDYwMzIyXCI6IFwi5Y2X5rKZ576k5bKbXCIsXG5cdCAgICBcIjQ2MDMyM1wiOiBcIuS4reaymee+pOWym+eahOWym+ekgeWPiuWFtua1t+Wfn1wiLFxuXHQgICAgXCI0NjkwMDFcIjogXCLkupTmjIflsbHluIJcIixcblx0ICAgIFwiNDY5MDAyXCI6IFwi55C85rW35biCXCIsXG5cdCAgICBcIjQ2OTAwM1wiOiBcIuWEi+W3nuW4glwiLFxuXHQgICAgXCI0NjkwMDVcIjogXCLmlofmmIzluIJcIixcblx0ICAgIFwiNDY5MDA2XCI6IFwi5LiH5a6B5biCXCIsXG5cdCAgICBcIjQ2OTAwN1wiOiBcIuS4nOaWueW4glwiLFxuXHQgICAgXCI0NjkwMjVcIjogXCLlrprlronljr9cIixcblx0ICAgIFwiNDY5MDI2XCI6IFwi5bGv5piM5Y6/XCIsXG5cdCAgICBcIjQ2OTAyN1wiOiBcIua+hOi/iOWOv1wiLFxuXHQgICAgXCI0NjkwMjhcIjogXCLkuLTpq5jljr9cIixcblx0ICAgIFwiNDY5MDMwXCI6IFwi55m95rKZ6buO5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ2OTAzMVwiOiBcIuaYjOaxn+m7juaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NjkwMzNcIjogXCLkuZDkuJzpu47ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDY5MDM0XCI6IFwi6Zm15rC06buO5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjQ2OTAzNVwiOiBcIuS/neS6rem7juaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI0NjkwMzZcIjogXCLnkLzkuK3pu47ml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNDcxMDA1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUwMDAwMFwiOiBcIumHjeW6hlwiLFxuXHQgICAgXCI1MDAxMDBcIjogXCLph43luobluIJcIixcblx0ICAgIFwiNTAwMTAxXCI6IFwi5LiH5bee5Yy6XCIsXG5cdCAgICBcIjUwMDEwMlwiOiBcIua2qumZteWMulwiLFxuXHQgICAgXCI1MDAxMDNcIjogXCLmuJ3kuK3ljLpcIixcblx0ICAgIFwiNTAwMTA0XCI6IFwi5aSn5rih5Y+j5Yy6XCIsXG5cdCAgICBcIjUwMDEwNVwiOiBcIuaxn+WMl+WMulwiLFxuXHQgICAgXCI1MDAxMDZcIjogXCLmspnlnarlnZ3ljLpcIixcblx0ICAgIFwiNTAwMTA3XCI6IFwi5Lmd6b6Z5Z2h5Yy6XCIsXG5cdCAgICBcIjUwMDEwOFwiOiBcIuWNl+WyuOWMulwiLFxuXHQgICAgXCI1MDAxMDlcIjogXCLljJfnoprljLpcIixcblx0ICAgIFwiNTAwMTEwXCI6IFwi5LiH55ub5Yy6XCIsXG5cdCAgICBcIjUwMDExMVwiOiBcIuWPjOahpeWMulwiLFxuXHQgICAgXCI1MDAxMTJcIjogXCLmuJ3ljJfljLpcIixcblx0ICAgIFwiNTAwMTEzXCI6IFwi5be05Y2X5Yy6XCIsXG5cdCAgICBcIjUwMDExNFwiOiBcIum7lOaxn+WMulwiLFxuXHQgICAgXCI1MDAxMTVcIjogXCLplb/lr7/ljLpcIixcblx0ICAgIFwiNTAwMjIyXCI6IFwi57am5rGf5Yy6XCIsXG5cdCAgICBcIjUwMDIyM1wiOiBcIua9vOWNl+WOv1wiLFxuXHQgICAgXCI1MDAyMjRcIjogXCLpk5zmooHljr9cIixcblx0ICAgIFwiNTAwMjI1XCI6IFwi5aSn6Laz5Yy6XCIsXG5cdCAgICBcIjUwMDIyNlwiOiBcIuiNo+aYjOWOv1wiLFxuXHQgICAgXCI1MDAyMjdcIjogXCLnkqflsbHljr9cIixcblx0ICAgIFwiNTAwMjI4XCI6IFwi5qKB5bmz5Y6/XCIsXG5cdCAgICBcIjUwMDIyOVwiOiBcIuWfjuWPo+WOv1wiLFxuXHQgICAgXCI1MDAyMzBcIjogXCLkuLDpg73ljr9cIixcblx0ICAgIFwiNTAwMjMxXCI6IFwi5Z6r5rGf5Y6/XCIsXG5cdCAgICBcIjUwMDIzMlwiOiBcIuatpumahuWOv1wiLFxuXHQgICAgXCI1MDAyMzNcIjogXCLlv6Dljr9cIixcblx0ICAgIFwiNTAwMjM0XCI6IFwi5byA5Y6/XCIsXG5cdCAgICBcIjUwMDIzNVwiOiBcIuS6kemYs+WOv1wiLFxuXHQgICAgXCI1MDAyMzZcIjogXCLlpYnoioLljr9cIixcblx0ICAgIFwiNTAwMjM3XCI6IFwi5ber5bGx5Y6/XCIsXG5cdCAgICBcIjUwMDIzOFwiOiBcIuW3q+a6quWOv1wiLFxuXHQgICAgXCI1MDAyNDBcIjogXCLnn7Pmn7HlnJ/lrrbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTAwMjQxXCI6IFwi56eA5bGx5Zyf5a625peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUwMDI0MlwiOiBcIumFiemYs+Wcn+WutuaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MDAyNDNcIjogXCLlva3msLToi5fml4/lnJ/lrrbml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTAwMzgxXCI6IFwi5rGf5rSl5Yy6XCIsXG5cdCAgICBcIjUwMDM4MlwiOiBcIuWQiOW3neWMulwiLFxuXHQgICAgXCI1MDAzODNcIjogXCLmsLjlt53ljLpcIixcblx0ICAgIFwiNTAwMzg0XCI6IFwi5Y2X5bed5Yy6XCIsXG5cdCAgICBcIjUwMDM4NVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTAwMDBcIjogXCLlm5vlt53nnIFcIixcblx0ICAgIFwiNTEwMTAwXCI6IFwi5oiQ6YO95biCXCIsXG5cdCAgICBcIjUxMDEwNFwiOiBcIumUpuaxn+WMulwiLFxuXHQgICAgXCI1MTAxMDVcIjogXCLpnZLnvorljLpcIixcblx0ICAgIFwiNTEwMTA2XCI6IFwi6YeR54mb5Yy6XCIsXG5cdCAgICBcIjUxMDEwN1wiOiBcIuatpuS+r+WMulwiLFxuXHQgICAgXCI1MTAxMDhcIjogXCLmiJDljY7ljLpcIixcblx0ICAgIFwiNTEwMTEyXCI6IFwi6b6Z5rOJ6am/5Yy6XCIsXG5cdCAgICBcIjUxMDExM1wiOiBcIumdkueZveaxn+WMulwiLFxuXHQgICAgXCI1MTAxMTRcIjogXCLmlrDpg73ljLpcIixcblx0ICAgIFwiNTEwMTE1XCI6IFwi5rip5rGf5Yy6XCIsXG5cdCAgICBcIjUxMDEyMVwiOiBcIumHkeWgguWOv1wiLFxuXHQgICAgXCI1MTAxMjJcIjogXCLlj4zmtYHljr9cIixcblx0ICAgIFwiNTEwMTI0XCI6IFwi6YOr5Y6/XCIsXG5cdCAgICBcIjUxMDEyOVwiOiBcIuWkp+mCkeWOv1wiLFxuXHQgICAgXCI1MTAxMzFcIjogXCLokrLmsZ/ljr9cIixcblx0ICAgIFwiNTEwMTMyXCI6IFwi5paw5rSl5Y6/XCIsXG5cdCAgICBcIjUxMDE4MVwiOiBcIumDveaxn+WgsOW4glwiLFxuXHQgICAgXCI1MTAxODJcIjogXCLlva3lt57luIJcIixcblx0ICAgIFwiNTEwMTgzXCI6IFwi6YKb5bSD5biCXCIsXG5cdCAgICBcIjUxMDE4NFwiOiBcIuW0h+W3nuW4glwiLFxuXHQgICAgXCI1MTAxODVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwMzAwXCI6IFwi6Ieq6LSh5biCXCIsXG5cdCAgICBcIjUxMDMwMlwiOiBcIuiHqua1geS6leWMulwiLFxuXHQgICAgXCI1MTAzMDNcIjogXCLotKHkupXljLpcIixcblx0ICAgIFwiNTEwMzA0XCI6IFwi5aSn5a6J5Yy6XCIsXG5cdCAgICBcIjUxMDMxMVwiOiBcIuayv+a7qeWMulwiLFxuXHQgICAgXCI1MTAzMjFcIjogXCLojaPljr9cIixcblx0ICAgIFwiNTEwMzIyXCI6IFwi5a+M6aG65Y6/XCIsXG5cdCAgICBcIjUxMDMyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTA0MDBcIjogXCLmlIDmnp3oirHluIJcIixcblx0ICAgIFwiNTEwNDAyXCI6IFwi5Lic5Yy6XCIsXG5cdCAgICBcIjUxMDQwM1wiOiBcIuilv+WMulwiLFxuXHQgICAgXCI1MTA0MTFcIjogXCLku4HlkozljLpcIixcblx0ICAgIFwiNTEwNDIxXCI6IFwi57Gz5piT5Y6/XCIsXG5cdCAgICBcIjUxMDQyMlwiOiBcIuebkOi+ueWOv1wiLFxuXHQgICAgXCI1MTA0MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwNTAwXCI6IFwi5rO45bee5biCXCIsXG5cdCAgICBcIjUxMDUwMlwiOiBcIuaxn+mYs+WMulwiLFxuXHQgICAgXCI1MTA1MDNcIjogXCLnurPmuqrljLpcIixcblx0ICAgIFwiNTEwNTA0XCI6IFwi6b6Z6ams5r2t5Yy6XCIsXG5cdCAgICBcIjUxMDUyMVwiOiBcIuazuOWOv1wiLFxuXHQgICAgXCI1MTA1MjJcIjogXCLlkIjmsZ/ljr9cIixcblx0ICAgIFwiNTEwNTI0XCI6IFwi5Y+Z5rC45Y6/XCIsXG5cdCAgICBcIjUxMDUyNVwiOiBcIuWPpOiUuuWOv1wiLFxuXHQgICAgXCI1MTA1MjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEwNjAwXCI6IFwi5b636Ziz5biCXCIsXG5cdCAgICBcIjUxMDYwM1wiOiBcIuaXjOmYs+WMulwiLFxuXHQgICAgXCI1MTA2MjNcIjogXCLkuK3msZ/ljr9cIixcblx0ICAgIFwiNTEwNjI2XCI6IFwi572X5rGf5Y6/XCIsXG5cdCAgICBcIjUxMDY4MVwiOiBcIuW5v+axieW4glwiLFxuXHQgICAgXCI1MTA2ODJcIjogXCLku4DpgqHluIJcIixcblx0ICAgIFwiNTEwNjgzXCI6IFwi57u156u55biCXCIsXG5cdCAgICBcIjUxMDY4NFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTA3MDBcIjogXCLnu7XpmLPluIJcIixcblx0ICAgIFwiNTEwNzAzXCI6IFwi5raq5Z+O5Yy6XCIsXG5cdCAgICBcIjUxMDcwNFwiOiBcIua4uOS7meWMulwiLFxuXHQgICAgXCI1MTA3MjJcIjogXCLkuInlj7Dljr9cIixcblx0ICAgIFwiNTEwNzIzXCI6IFwi55uQ5Lqt5Y6/XCIsXG5cdCAgICBcIjUxMDcyNFwiOiBcIuWuieWOv1wiLFxuXHQgICAgXCI1MTA3MjVcIjogXCLmopPmvbzljr9cIixcblx0ICAgIFwiNTEwNzI2XCI6IFwi5YyX5bed576M5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUxMDcyN1wiOiBcIuW5s+atpuWOv1wiLFxuXHQgICAgXCI1MTA3ODFcIjogXCLmsZ/msrnluIJcIixcblx0ICAgIFwiNTEwNzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDgwMFwiOiBcIuW5v+WFg+W4glwiLFxuXHQgICAgXCI1MTA4MDJcIjogXCLliKnlt57ljLpcIixcblx0ICAgIFwiNTEwODExXCI6IFwi5pit5YyW5Yy6XCIsXG5cdCAgICBcIjUxMDgxMlwiOiBcIuacneWkqeWMulwiLFxuXHQgICAgXCI1MTA4MjFcIjogXCLml7roi43ljr9cIixcblx0ICAgIFwiNTEwODIyXCI6IFwi6Z2S5bed5Y6/XCIsXG5cdCAgICBcIjUxMDgyM1wiOiBcIuWJkemYgeWOv1wiLFxuXHQgICAgXCI1MTA4MjRcIjogXCLoi43muqrljr9cIixcblx0ICAgIFwiNTEwODI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMDkwMFwiOiBcIumBguWugeW4glwiLFxuXHQgICAgXCI1MTA5MDNcIjogXCLoiLnlsbHljLpcIixcblx0ICAgIFwiNTEwOTA0XCI6IFwi5a6J5bGF5Yy6XCIsXG5cdCAgICBcIjUxMDkyMVwiOiBcIuiTrOa6quWOv1wiLFxuXHQgICAgXCI1MTA5MjJcIjogXCLlsITmtKrljr9cIixcblx0ICAgIFwiNTEwOTIzXCI6IFwi5aSn6Iux5Y6/XCIsXG5cdCAgICBcIjUxMDkyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTEwMDBcIjogXCLlhoXmsZ/luIJcIixcblx0ICAgIFwiNTExMDAyXCI6IFwi5biC5Lit5Yy6XCIsXG5cdCAgICBcIjUxMTAxMVwiOiBcIuS4nOWFtOWMulwiLFxuXHQgICAgXCI1MTEwMjRcIjogXCLlqIHov5zljr9cIixcblx0ICAgIFwiNTExMDI1XCI6IFwi6LWE5Lit5Y6/XCIsXG5cdCAgICBcIjUxMTAyOFwiOiBcIumahuaYjOWOv1wiLFxuXHQgICAgXCI1MTEwMjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExMTAwXCI6IFwi5LmQ5bGx5biCXCIsXG5cdCAgICBcIjUxMTEwMlwiOiBcIuW4guS4reWMulwiLFxuXHQgICAgXCI1MTExMTFcIjogXCLmspnmub7ljLpcIixcblx0ICAgIFwiNTExMTEyXCI6IFwi5LqU6YCa5qGl5Yy6XCIsXG5cdCAgICBcIjUxMTExM1wiOiBcIumHkeWPo+ays+WMulwiLFxuXHQgICAgXCI1MTExMjNcIjogXCLnio3kuLrljr9cIixcblx0ICAgIFwiNTExMTI0XCI6IFwi5LqV56CU5Y6/XCIsXG5cdCAgICBcIjUxMTEyNlwiOiBcIuWkueaxn+WOv1wiLFxuXHQgICAgXCI1MTExMjlcIjogXCLmspDlt53ljr9cIixcblx0ICAgIFwiNTExMTMyXCI6IFwi5bOo6L655b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUxMTEzM1wiOiBcIumprOi+ueW9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MTExODFcIjogXCLls6jnnInlsbHluIJcIixcblx0ICAgIFwiNTExMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTMwMFwiOiBcIuWNl+WFheW4glwiLFxuXHQgICAgXCI1MTEzMDJcIjogXCLpobrluobljLpcIixcblx0ICAgIFwiNTExMzAzXCI6IFwi6auY5Z2q5Yy6XCIsXG5cdCAgICBcIjUxMTMwNFwiOiBcIuWYiemZteWMulwiLFxuXHQgICAgXCI1MTEzMjFcIjogXCLljZfpg6jljr9cIixcblx0ICAgIFwiNTExMzIyXCI6IFwi6JCl5bGx5Y6/XCIsXG5cdCAgICBcIjUxMTMyM1wiOiBcIuiTrOWuieWOv1wiLFxuXHQgICAgXCI1MTEzMjRcIjogXCLku6rpmYfljr9cIixcblx0ICAgIFwiNTExMzI1XCI6IFwi6KW/5YWF5Y6/XCIsXG5cdCAgICBcIjUxMTM4MVwiOiBcIumYhuS4reW4glwiLFxuXHQgICAgXCI1MTEzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTExNDAwXCI6IFwi55yJ5bGx5biCXCIsXG5cdCAgICBcIjUxMTQwMlwiOiBcIuS4nOWdoeWMulwiLFxuXHQgICAgXCI1MTE0MjFcIjogXCLku4Hlr7/ljr9cIixcblx0ICAgIFwiNTExNDIyXCI6IFwi5b2t5bGx5Y6/XCIsXG5cdCAgICBcIjUxMTQyM1wiOiBcIua0qumbheWOv1wiLFxuXHQgICAgXCI1MTE0MjRcIjogXCLkuLnmo7Hljr9cIixcblx0ICAgIFwiNTExNDI1XCI6IFwi6Z2S56We5Y6/XCIsXG5cdCAgICBcIjUxMTQyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTE1MDBcIjogXCLlrpzlrr7luIJcIixcblx0ICAgIFwiNTExNTAyXCI6IFwi57+g5bGP5Yy6XCIsXG5cdCAgICBcIjUxMTUyMVwiOiBcIuWunOWuvuWOv1wiLFxuXHQgICAgXCI1MTE1MjJcIjogXCLljZfmuqrljLpcIixcblx0ICAgIFwiNTExNTIzXCI6IFwi5rGf5a6J5Y6/XCIsXG5cdCAgICBcIjUxMTUyNFwiOiBcIumVv+WugeWOv1wiLFxuXHQgICAgXCI1MTE1MjVcIjogXCLpq5jljr9cIixcblx0ICAgIFwiNTExNTI2XCI6IFwi54+Z5Y6/XCIsXG5cdCAgICBcIjUxMTUyN1wiOiBcIuetoOi/nuWOv1wiLFxuXHQgICAgXCI1MTE1MjhcIjogXCLlhbTmlofljr9cIixcblx0ICAgIFwiNTExNTI5XCI6IFwi5bGP5bGx5Y6/XCIsXG5cdCAgICBcIjUxMTUzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTE2MDBcIjogXCLlub/lronluIJcIixcblx0ICAgIFwiNTExNjAyXCI6IFwi5bm/5a6J5Yy6XCIsXG5cdCAgICBcIjUxMTYwM1wiOiBcIuWJjemUi+WMulwiLFxuXHQgICAgXCI1MTE2MjFcIjogXCLlsrPmsaDljr9cIixcblx0ICAgIFwiNTExNjIyXCI6IFwi5q2m6IOc5Y6/XCIsXG5cdCAgICBcIjUxMTYyM1wiOiBcIumCu+awtOWOv1wiLFxuXHQgICAgXCI1MTE2ODFcIjogXCLljY7ok6XluIJcIixcblx0ICAgIFwiNTExNjgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTcwMFwiOiBcIui+vuW3nuW4glwiLFxuXHQgICAgXCI1MTE3MDJcIjogXCLpgJrlt53ljLpcIixcblx0ICAgIFwiNTExNzIxXCI6IFwi6L6+5bed5Yy6XCIsXG5cdCAgICBcIjUxMTcyMlwiOiBcIuWuo+axieWOv1wiLFxuXHQgICAgXCI1MTE3MjNcIjogXCLlvIDmsZ/ljr9cIixcblx0ICAgIFwiNTExNzI0XCI6IFwi5aSn56u55Y6/XCIsXG5cdCAgICBcIjUxMTcyNVwiOiBcIua4oOWOv1wiLFxuXHQgICAgXCI1MTE3ODFcIjogXCLkuIfmupDluIJcIixcblx0ICAgIFwiNTExNzgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUxMTgwMFwiOiBcIumbheWuieW4glwiLFxuXHQgICAgXCI1MTE4MDJcIjogXCLpm6jln47ljLpcIixcblx0ICAgIFwiNTExODIxXCI6IFwi5ZCN5bGx5Yy6XCIsXG5cdCAgICBcIjUxMTgyMlwiOiBcIuiNpee7j+WOv1wiLFxuXHQgICAgXCI1MTE4MjNcIjogXCLmsYnmupDljr9cIixcblx0ICAgIFwiNTExODI0XCI6IFwi55+z5qOJ5Y6/XCIsXG5cdCAgICBcIjUxMTgyNVwiOiBcIuWkqeWFqOWOv1wiLFxuXHQgICAgXCI1MTE4MjZcIjogXCLoiqblsbHljr9cIixcblx0ICAgIFwiNTExODI3XCI6IFwi5a6d5YW05Y6/XCIsXG5cdCAgICBcIjUxMTgyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTE5MDBcIjogXCLlt7TkuK3luIJcIixcblx0ICAgIFwiNTExOTAyXCI6IFwi5be05bee5Yy6XCIsXG5cdCAgICBcIjUxMTkwM1wiOiBcIuaBqemYs+WMulwiLFxuXHQgICAgXCI1MTE5MjFcIjogXCLpgJrmsZ/ljr9cIixcblx0ICAgIFwiNTExOTIyXCI6IFwi5Y2X5rGf5Y6/XCIsXG5cdCAgICBcIjUxMTkyM1wiOiBcIuW5s+aYjOWOv1wiLFxuXHQgICAgXCI1MTE5MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEyMDAwXCI6IFwi6LWE6Ziz5biCXCIsXG5cdCAgICBcIjUxMjAwMlwiOiBcIumbgeaxn+WMulwiLFxuXHQgICAgXCI1MTIwMjFcIjogXCLlronlsrPljr9cIixcblx0ICAgIFwiNTEyMDIyXCI6IFwi5LmQ6Iez5Y6/XCIsXG5cdCAgICBcIjUxMjA4MVwiOiBcIueugOmYs+W4glwiLFxuXHQgICAgXCI1MTIwODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEzMjAwXCI6IFwi6Zi/5Z2d6JeP5peP576M5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUxMzIyMVwiOiBcIuaxtuW3neWOv1wiLFxuXHQgICAgXCI1MTMyMjJcIjogXCLnkIbljr9cIixcblx0ICAgIFwiNTEzMjIzXCI6IFwi6IyC5Y6/XCIsXG5cdCAgICBcIjUxMzIyNFwiOiBcIuadvua9mOWOv1wiLFxuXHQgICAgXCI1MTMyMjVcIjogXCLkuZ3lr6jmsp/ljr9cIixcblx0ICAgIFwiNTEzMjI2XCI6IFwi6YeR5bed5Y6/XCIsXG5cdCAgICBcIjUxMzIyN1wiOiBcIuWwj+mHkeWOv1wiLFxuXHQgICAgXCI1MTMyMjhcIjogXCLpu5HmsLTljr9cIixcblx0ICAgIFwiNTEzMjI5XCI6IFwi6ams5bCU5bq35Y6/XCIsXG5cdCAgICBcIjUxMzIzMFwiOiBcIuWjpOWhmOWOv1wiLFxuXHQgICAgXCI1MTMyMzFcIjogXCLpmL/lnZ3ljr9cIixcblx0ICAgIFwiNTEzMjMyXCI6IFwi6Iul5bCU55uW5Y6/XCIsXG5cdCAgICBcIjUxMzIzM1wiOiBcIue6ouWOn+WOv1wiLFxuXHQgICAgXCI1MTMyMzRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTEzMzAwXCI6IFwi55SY5a2c6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUxMzMyMVwiOiBcIuW6t+WumuWOv1wiLFxuXHQgICAgXCI1MTMzMjJcIjogXCLms7jlrprljr9cIixcblx0ICAgIFwiNTEzMzIzXCI6IFwi5Li55be05Y6/XCIsXG5cdCAgICBcIjUxMzMyNFwiOiBcIuS5nem+meWOv1wiLFxuXHQgICAgXCI1MTMzMjVcIjogXCLpm4XmsZ/ljr9cIixcblx0ICAgIFwiNTEzMzI2XCI6IFwi6YGT5a2a5Y6/XCIsXG5cdCAgICBcIjUxMzMyN1wiOiBcIueCiemcjeWOv1wiLFxuXHQgICAgXCI1MTMzMjhcIjogXCLnlJjlrZzljr9cIixcblx0ICAgIFwiNTEzMzI5XCI6IFwi5paw6b6Z5Y6/XCIsXG5cdCAgICBcIjUxMzMzMFwiOiBcIuW+t+agvOWOv1wiLFxuXHQgICAgXCI1MTMzMzFcIjogXCLnmb3njonljr9cIixcblx0ICAgIFwiNTEzMzMyXCI6IFwi55+z5rig5Y6/XCIsXG5cdCAgICBcIjUxMzMzM1wiOiBcIuiJsui+vuWOv1wiLFxuXHQgICAgXCI1MTMzMzRcIjogXCLnkIbloZjljr9cIixcblx0ICAgIFwiNTEzMzM1XCI6IFwi5be05aGY5Y6/XCIsXG5cdCAgICBcIjUxMzMzNlwiOiBcIuS5oeWfjuWOv1wiLFxuXHQgICAgXCI1MTMzMzdcIjogXCLnqLvln47ljr9cIixcblx0ICAgIFwiNTEzMzM4XCI6IFwi5b6X6I2j5Y6/XCIsXG5cdCAgICBcIjUxMzMzOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MTM0MDBcIjogXCLlh4nlsbHlvZ3ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTEzNDAxXCI6IFwi6KW/5piM5biCXCIsXG5cdCAgICBcIjUxMzQyMlwiOiBcIuacqOmHjOiXj+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MTM0MjNcIjogXCLnm5DmupDljr9cIixcblx0ICAgIFwiNTEzNDI0XCI6IFwi5b635piM5Y6/XCIsXG5cdCAgICBcIjUxMzQyNVwiOiBcIuS8mueQhuWOv1wiLFxuXHQgICAgXCI1MTM0MjZcIjogXCLkvJrkuJzljr9cIixcblx0ICAgIFwiNTEzNDI3XCI6IFwi5a6B5Y2X5Y6/XCIsXG5cdCAgICBcIjUxMzQyOFwiOiBcIuaZruagvOWOv1wiLFxuXHQgICAgXCI1MTM0MjlcIjogXCLluIPmi5bljr9cIixcblx0ICAgIFwiNTEzNDMwXCI6IFwi6YeR6Ziz5Y6/XCIsXG5cdCAgICBcIjUxMzQzMVwiOiBcIuaYreinieWOv1wiLFxuXHQgICAgXCI1MTM0MzJcIjogXCLllpzlvrfljr9cIixcblx0ICAgIFwiNTEzNDMzXCI6IFwi5YaV5a6B5Y6/XCIsXG5cdCAgICBcIjUxMzQzNFwiOiBcIui2iuilv+WOv1wiLFxuXHQgICAgXCI1MTM0MzVcIjogXCLnlJjmtJvljr9cIixcblx0ICAgIFwiNTEzNDM2XCI6IFwi576O5aeR5Y6/XCIsXG5cdCAgICBcIjUxMzQzN1wiOiBcIumbt+azouWOv1wiLFxuXHQgICAgXCI1MTM0MzhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIwMDAwXCI6IFwi6LS15bee55yBXCIsXG5cdCAgICBcIjUyMDEwMFwiOiBcIui0temYs+W4glwiLFxuXHQgICAgXCI1MjAxMDJcIjogXCLljZfmmI7ljLpcIixcblx0ICAgIFwiNTIwMTAzXCI6IFwi5LqR5bKp5Yy6XCIsXG5cdCAgICBcIjUyMDExMVwiOiBcIuiKsea6quWMulwiLFxuXHQgICAgXCI1MjAxMTJcIjogXCLkuYzlvZPljLpcIixcblx0ICAgIFwiNTIwMTEzXCI6IFwi55m95LqR5Yy6XCIsXG5cdCAgICBcIjUyMDEyMVwiOiBcIuW8gOmYs+WOv1wiLFxuXHQgICAgXCI1MjAxMjJcIjogXCLmga/ng73ljr9cIixcblx0ICAgIFwiNTIwMTIzXCI6IFwi5L+u5paH5Y6/XCIsXG5cdCAgICBcIjUyMDE1MVwiOiBcIuinguWxsea5luWMulwiLFxuXHQgICAgXCI1MjAxODFcIjogXCLmuIXplYfluIJcIixcblx0ICAgIFwiNTIwMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMDIwMFwiOiBcIuWFreebmOawtOW4glwiLFxuXHQgICAgXCI1MjAyMDFcIjogXCLpkp/lsbHljLpcIixcblx0ICAgIFwiNTIwMjAzXCI6IFwi5YWt5p6d54m55Yy6XCIsXG5cdCAgICBcIjUyMDIyMVwiOiBcIuawtOWfjuWOv1wiLFxuXHQgICAgXCI1MjAyMjJcIjogXCLnm5jljr9cIixcblx0ICAgIFwiNTIwMjIzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMDMwMFwiOiBcIumBteS5ieW4glwiLFxuXHQgICAgXCI1MjAzMDJcIjogXCLnuqLoirHlspfljLpcIixcblx0ICAgIFwiNTIwMzAzXCI6IFwi5rGH5bed5Yy6XCIsXG5cdCAgICBcIjUyMDMyMVwiOiBcIumBteS5ieWOv1wiLFxuXHQgICAgXCI1MjAzMjJcIjogXCLmoZDmopPljr9cIixcblx0ICAgIFwiNTIwMzIzXCI6IFwi57ul6Ziz5Y6/XCIsXG5cdCAgICBcIjUyMDMyNFwiOiBcIuato+WuieWOv1wiLFxuXHQgICAgXCI1MjAzMjVcIjogXCLpgZPnnJ/ku6Hkvazml4/oi5fml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIwMzI2XCI6IFwi5Yqh5bed5Luh5L2s5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMDMyN1wiOiBcIuWHpOWGiOWOv1wiLFxuXHQgICAgXCI1MjAzMjhcIjogXCLmuYTmva3ljr9cIixcblx0ICAgIFwiNTIwMzI5XCI6IFwi5L2Z5bqG5Y6/XCIsXG5cdCAgICBcIjUyMDMzMFwiOiBcIuS5oOawtOWOv1wiLFxuXHQgICAgXCI1MjAzODFcIjogXCLotaTmsLTluIJcIixcblx0ICAgIFwiNTIwMzgyXCI6IFwi5LuB5oCA5biCXCIsXG5cdCAgICBcIjUyMDM4M1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjA0MDBcIjogXCLlronpobrluIJcIixcblx0ICAgIFwiNTIwNDAyXCI6IFwi6KW/56eA5Yy6XCIsXG5cdCAgICBcIjUyMDQyMVwiOiBcIuW5s+WdneWOv1wiLFxuXHQgICAgXCI1MjA0MjJcIjogXCLmma7lrprljr9cIixcblx0ICAgIFwiNTIwNDIzXCI6IFwi6ZWH5a6B5biD5L6d5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMDQyNFwiOiBcIuWFs+WyreW4g+S+neaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjA0MjVcIjogXCLntKvkupHoi5fml4/luIPkvp3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTIwNDI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMjIwMFwiOiBcIumTnOS7geW4glwiLFxuXHQgICAgXCI1MjIyMDFcIjogXCLnoqfmsZ/ljLpcIixcblx0ICAgIFwiNTIyMjIyXCI6IFwi5rGf5Y+j5Y6/XCIsXG5cdCAgICBcIjUyMjIyM1wiOiBcIueOieWxj+S+l+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjIyMjRcIjogXCLnn7PpmKHljr9cIixcblx0ICAgIFwiNTIyMjI1XCI6IFwi5oCd5Y2X5Y6/XCIsXG5cdCAgICBcIjUyMjIyNlwiOiBcIuWNsOaxn+Wcn+WutuaXj+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjIyMjdcIjogXCLlvrfmsZ/ljr9cIixcblx0ICAgIFwiNTIyMjI4XCI6IFwi5rK/5rKz5Zyf5a625peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMjIyOVwiOiBcIuadvuahg+iLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MjIyMzBcIjogXCLkuIflsbHljLpcIixcblx0ICAgIFwiNTIyMjMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUyMjMwMFwiOiBcIum7lOilv+WNl+W4g+S+neaXj+iLl+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MjIzMDFcIjogXCLlhbTkuYnluIJcIixcblx0ICAgIFwiNTIyMzIyXCI6IFwi5YW05LuB5Y6/XCIsXG5cdCAgICBcIjUyMjMyM1wiOiBcIuaZruWuieWOv1wiLFxuXHQgICAgXCI1MjIzMjRcIjogXCLmmbTpmobljr9cIixcblx0ICAgIFwiNTIyMzI1XCI6IFwi6LSe5Liw5Y6/XCIsXG5cdCAgICBcIjUyMjMyNlwiOiBcIuacm+iwn+WOv1wiLFxuXHQgICAgXCI1MjIzMjdcIjogXCLlhozkuqjljr9cIixcblx0ICAgIFwiNTIyMzI4XCI6IFwi5a6J6b6Z5Y6/XCIsXG5cdCAgICBcIjUyMjMyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MjI0MDBcIjogXCLmr5XoioLluIJcIixcblx0ICAgIFwiNTIyNDAxXCI6IFwi5LiD5pif5YWz5Yy6XCIsXG5cdCAgICBcIjUyMjQyMlwiOiBcIuWkp+aWueWOv1wiLFxuXHQgICAgXCI1MjI0MjNcIjogXCLpu5Topb/ljr9cIixcblx0ICAgIFwiNTIyNDI0XCI6IFwi6YeR5rKZ5Y6/XCIsXG5cdCAgICBcIjUyMjQyNVwiOiBcIue7h+mHkeWOv1wiLFxuXHQgICAgXCI1MjI0MjZcIjogXCLnurPpm43ljr9cIixcblx0ICAgIFwiNTIyNDI3XCI6IFwi5aiB5a6B5b2d5peP5Zue5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMjQyOFwiOiBcIui1q+eroOWOv1wiLFxuXHQgICAgXCI1MjI0MjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIyNjAwXCI6IFwi6buU5Lic5Y2X6IuX5peP5L6X5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUyMjYwMVwiOiBcIuWHr+mHjOW4glwiLFxuXHQgICAgXCI1MjI2MjJcIjogXCLpu4TlubPljr9cIixcblx0ICAgIFwiNTIyNjIzXCI6IFwi5pa956eJ5Y6/XCIsXG5cdCAgICBcIjUyMjYyNFwiOiBcIuS4ieepl+WOv1wiLFxuXHQgICAgXCI1MjI2MjVcIjogXCLplYfov5zljr9cIixcblx0ICAgIFwiNTIyNjI2XCI6IFwi5bKR5bep5Y6/XCIsXG5cdCAgICBcIjUyMjYyN1wiOiBcIuWkqeafseWOv1wiLFxuXHQgICAgXCI1MjI2MjhcIjogXCLplKblsY/ljr9cIixcblx0ICAgIFwiNTIyNjI5XCI6IFwi5YmR5rKz5Y6/XCIsXG5cdCAgICBcIjUyMjYzMFwiOiBcIuWPsOaxn+WOv1wiLFxuXHQgICAgXCI1MjI2MzFcIjogXCLpu47lubPljr9cIixcblx0ICAgIFwiNTIyNjMyXCI6IFwi5qaV5rGf5Y6/XCIsXG5cdCAgICBcIjUyMjYzM1wiOiBcIuS7juaxn+WOv1wiLFxuXHQgICAgXCI1MjI2MzRcIjogXCLpm7flsbHljr9cIixcblx0ICAgIFwiNTIyNjM1XCI6IFwi6bq75rGf5Y6/XCIsXG5cdCAgICBcIjUyMjYzNlwiOiBcIuS4ueWvqOWOv1wiLFxuXHQgICAgXCI1MjI2MzdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTIyNzAwXCI6IFwi6buU5Y2X5biD5L6d5peP6IuX5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUyMjcwMVwiOiBcIumDveWMgOW4glwiLFxuXHQgICAgXCI1MjI3MDJcIjogXCLnpo/ms4nluIJcIixcblx0ICAgIFwiNTIyNzIyXCI6IFwi6I2U5rOi5Y6/XCIsXG5cdCAgICBcIjUyMjcyM1wiOiBcIui0teWumuWOv1wiLFxuXHQgICAgXCI1MjI3MjVcIjogXCLnk67lronljr9cIixcblx0ICAgIFwiNTIyNzI2XCI6IFwi54us5bGx5Y6/XCIsXG5cdCAgICBcIjUyMjcyN1wiOiBcIuW5s+WhmOWOv1wiLFxuXHQgICAgXCI1MjI3MjhcIjogXCLnvZfnlLjljr9cIixcblx0ICAgIFwiNTIyNzI5XCI6IFwi6ZW/6aG65Y6/XCIsXG5cdCAgICBcIjUyMjczMFwiOiBcIum+memHjOWOv1wiLFxuXHQgICAgXCI1MjI3MzFcIjogXCLmg6DmsLTljr9cIixcblx0ICAgIFwiNTIyNzMyXCI6IFwi5LiJ6YO95rC05peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUyMjczM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzAwMDBcIjogXCLkupHljZfnnIFcIixcblx0ICAgIFwiNTMwMTAwXCI6IFwi5piG5piO5biCXCIsXG5cdCAgICBcIjUzMDEwMlwiOiBcIuS6lOWNjuWMulwiLFxuXHQgICAgXCI1MzAxMDNcIjogXCLnm5jpvpnljLpcIixcblx0ICAgIFwiNTMwMTExXCI6IFwi5a6Y5rih5Yy6XCIsXG5cdCAgICBcIjUzMDExMlwiOiBcIuilv+WxseWMulwiLFxuXHQgICAgXCI1MzAxMTNcIjogXCLkuJzlt53ljLpcIixcblx0ICAgIFwiNTMwMTIxXCI6IFwi5ZGI6LSh5Yy6XCIsXG5cdCAgICBcIjUzMDEyMlwiOiBcIuaZi+WugeWOv1wiLFxuXHQgICAgXCI1MzAxMjRcIjogXCLlr4zmsJHljr9cIixcblx0ICAgIFwiNTMwMTI1XCI6IFwi5a6c6Imv5Y6/XCIsXG5cdCAgICBcIjUzMDEyNlwiOiBcIuefs+ael+W9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzAxMjdcIjogXCLltanmmI7ljr9cIixcblx0ICAgIFwiNTMwMTI4XCI6IFwi56aE5Yqd5b2d5peP6IuX5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDEyOVwiOiBcIuWvu+eUuOWbnuaXj+W9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzAxODFcIjogXCLlronlroHluIJcIixcblx0ICAgIFwiNTMwMTgyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDMwMFwiOiBcIuabsumdluW4glwiLFxuXHQgICAgXCI1MzAzMDJcIjogXCLpupLpup/ljLpcIixcblx0ICAgIFwiNTMwMzIxXCI6IFwi6ams6b6Z5Y6/XCIsXG5cdCAgICBcIjUzMDMyMlwiOiBcIumZhuiJr+WOv1wiLFxuXHQgICAgXCI1MzAzMjNcIjogXCLluIjlrpfljr9cIixcblx0ICAgIFwiNTMwMzI0XCI6IFwi572X5bmz5Y6/XCIsXG5cdCAgICBcIjUzMDMyNVwiOiBcIuWvjOa6kOWOv1wiLFxuXHQgICAgXCI1MzAzMjZcIjogXCLkvJrms73ljr9cIixcblx0ICAgIFwiNTMwMzI4XCI6IFwi5rK+55uK5Y6/XCIsXG5cdCAgICBcIjUzMDM4MVwiOiBcIuWuo+WogeW4glwiLFxuXHQgICAgXCI1MzAzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwNDAwXCI6IFwi546J5rqq5biCXCIsXG5cdCAgICBcIjUzMDQwMlwiOiBcIue6ouWhlOWMulwiLFxuXHQgICAgXCI1MzA0MjFcIjogXCLmsZ/lt53ljr9cIixcblx0ICAgIFwiNTMwNDIyXCI6IFwi5r6E5rGf5Y6/XCIsXG5cdCAgICBcIjUzMDQyM1wiOiBcIumAmua1t+WOv1wiLFxuXHQgICAgXCI1MzA0MjRcIjogXCLljY7lroHljr9cIixcblx0ICAgIFwiNTMwNDI1XCI6IFwi5piT6Zeo5Y6/XCIsXG5cdCAgICBcIjUzMDQyNlwiOiBcIuWzqOWxseW9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA0MjdcIjogXCLmlrDlubPlvZ3ml4/lgqPml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwNDI4XCI6IFwi5YWD5rGf5ZOI5bC85peP5b2d5peP5YKj5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDQyOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzA1MDBcIjogXCLkv53lsbHluIJcIixcblx0ICAgIFwiNTMwNTAyXCI6IFwi6ZqG6Ziz5Yy6XCIsXG5cdCAgICBcIjUzMDUyMVwiOiBcIuaWveeUuOWOv1wiLFxuXHQgICAgXCI1MzA1MjJcIjogXCLohb7lhrLljr9cIixcblx0ICAgIFwiNTMwNTIzXCI6IFwi6b6Z6Zm15Y6/XCIsXG5cdCAgICBcIjUzMDUyNFwiOiBcIuaYjOWugeWOv1wiLFxuXHQgICAgXCI1MzA1MjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMwNjAwXCI6IFwi5pit6YCa5biCXCIsXG5cdCAgICBcIjUzMDYwMlwiOiBcIuaYremYs+WMulwiLFxuXHQgICAgXCI1MzA2MjFcIjogXCLpsoHnlLjljr9cIixcblx0ICAgIFwiNTMwNjIyXCI6IFwi5ben5a625Y6/XCIsXG5cdCAgICBcIjUzMDYyM1wiOiBcIuebkOa0peWOv1wiLFxuXHQgICAgXCI1MzA2MjRcIjogXCLlpKflhbPljr9cIixcblx0ICAgIFwiNTMwNjI1XCI6IFwi5rC45ZaE5Y6/XCIsXG5cdCAgICBcIjUzMDYyNlwiOiBcIue7peaxn+WOv1wiLFxuXHQgICAgXCI1MzA2MjdcIjogXCLplYfpm4Tljr9cIixcblx0ICAgIFwiNTMwNjI4XCI6IFwi5b2d6Imv5Y6/XCIsXG5cdCAgICBcIjUzMDYyOVwiOiBcIuWogeS/oeWOv1wiLFxuXHQgICAgXCI1MzA2MzBcIjogXCLmsLTlr4zljr9cIixcblx0ICAgIFwiNTMwNjMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMDcwMFwiOiBcIuS4veaxn+W4glwiLFxuXHQgICAgXCI1MzA3MDJcIjogXCLlj6Tln47ljLpcIixcblx0ICAgIFwiNTMwNzIxXCI6IFwi546J6b6Z57qz6KW/5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDcyMlwiOiBcIuawuOiDnOWOv1wiLFxuXHQgICAgXCI1MzA3MjNcIjogXCLljY7lnarljr9cIixcblx0ICAgIFwiNTMwNzI0XCI6IFwi5a6B6JKX5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDcyNVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzA4MDBcIjogXCLmma7mtLHluIJcIixcblx0ICAgIFwiNTMwODAyXCI6IFwi5oCd6IyF5Yy6XCIsXG5cdCAgICBcIjUzMDgyMVwiOiBcIuWugea0seWTiOWwvOaXj+W9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjJcIjogXCLloqjmsZ/lk4jlsLzml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODIzXCI6IFwi5pmv5Lic5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyNFwiOiBcIuaZr+iwt+WCo+aXj+W9neaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjVcIjogXCLplYfmsoXlvZ3ml4/lk4jlsLzml4/mi4nnpZzml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODI2XCI6IFwi5rGf5Z+O5ZOI5bC85peP5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgyN1wiOiBcIuWtn+i/nuWCo+aXj+aLieelnOaXj+S9pOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA4MjhcIjogXCLmvpzmsqfmi4nnpZzml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwODI5XCI6IFwi6KW/55uf5L2k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDgzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzA5MDBcIjogXCLkuLTmsqfluIJcIixcblx0ICAgIFwiNTMwOTAyXCI6IFwi5Li057+U5Yy6XCIsXG5cdCAgICBcIjUzMDkyMVwiOiBcIuWHpOW6huWOv1wiLFxuXHQgICAgXCI1MzA5MjJcIjogXCLkupHljr9cIixcblx0ICAgIFwiNTMwOTIzXCI6IFwi5rC45b635Y6/XCIsXG5cdCAgICBcIjUzMDkyNFwiOiBcIumVh+W6t+WOv1wiLFxuXHQgICAgXCI1MzA5MjVcIjogXCLlj4zmsZ/mi4nnpZzml4/kvaTml4/luIPmnJfml4/lgqPml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMwOTI2XCI6IFwi6IC/6ams5YKj5peP5L2k5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMDkyN1wiOiBcIuayp+a6kOS9pOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzA5MjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMyMzAwXCI6IFwi5qWa6ZuE5b2d5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMjMwMVwiOiBcIualmumbhOW4glwiLFxuXHQgICAgXCI1MzIzMjJcIjogXCLlj4zmn4/ljr9cIixcblx0ICAgIFwiNTMyMzIzXCI6IFwi54mf5a6a5Y6/XCIsXG5cdCAgICBcIjUzMjMyNFwiOiBcIuWNl+WNjuWOv1wiLFxuXHQgICAgXCI1MzIzMjVcIjogXCLlp5rlronljr9cIixcblx0ICAgIFwiNTMyMzI2XCI6IFwi5aSn5aea5Y6/XCIsXG5cdCAgICBcIjUzMjMyN1wiOiBcIuawuOS7geWOv1wiLFxuXHQgICAgXCI1MzIzMjhcIjogXCLlhYPosIvljr9cIixcblx0ICAgIFwiNTMyMzI5XCI6IFwi5q2m5a6a5Y6/XCIsXG5cdCAgICBcIjUzMjMzMVwiOiBcIuemhOS4sOWOv1wiLFxuXHQgICAgXCI1MzIzMzJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMyNTAwXCI6IFwi57qi5rKz5ZOI5bC85peP5b2d5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMjUwMVwiOiBcIuS4quaXp+W4glwiLFxuXHQgICAgXCI1MzI1MDJcIjogXCLlvIDov5zluIJcIixcblx0ICAgIFwiNTMyNTIyXCI6IFwi6JKZ6Ieq5biCXCIsXG5cdCAgICBcIjUzMjUyM1wiOiBcIuWxj+i+ueiLl+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzI1MjRcIjogXCLlu7rmsLTljr9cIixcblx0ICAgIFwiNTMyNTI1XCI6IFwi55+z5bGP5Y6/XCIsXG5cdCAgICBcIjUzMjUyNlwiOiBcIuW8peWLkuW4glwiLFxuXHQgICAgXCI1MzI1MjdcIjogXCLms7jopb/ljr9cIixcblx0ICAgIFwiNTMyNTI4XCI6IFwi5YWD6Ziz5Y6/XCIsXG5cdCAgICBcIjUzMjUyOVwiOiBcIue6ouays+WOv1wiLFxuXHQgICAgXCI1MzI1MzBcIjogXCLph5HlubPoi5fml4/nkbbml4/lgqPml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMyNTMxXCI6IFwi57u/5pil5Y6/XCIsXG5cdCAgICBcIjUzMjUzMlwiOiBcIuays+WPo+eRtuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzI1MzNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMyNjAwXCI6IFwi5paH5bGx5aOu5peP6IuX5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMjYyMVwiOiBcIuaWh+WxseW4glwiLFxuXHQgICAgXCI1MzI2MjJcIjogXCLnoJrlsbHljr9cIixcblx0ICAgIFwiNTMyNjIzXCI6IFwi6KW/55W05Y6/XCIsXG5cdCAgICBcIjUzMjYyNFwiOiBcIum6u+agl+WdoeWOv1wiLFxuXHQgICAgXCI1MzI2MjVcIjogXCLpqazlhbPljr9cIixcblx0ICAgIFwiNTMyNjI2XCI6IFwi5LiY5YyX5Y6/XCIsXG5cdCAgICBcIjUzMjYyN1wiOiBcIuW5v+WNl+WOv1wiLFxuXHQgICAgXCI1MzI2MjhcIjogXCLlr4zlroHljr9cIixcblx0ICAgIFwiNTMyNjI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjUzMjgwMFwiOiBcIuilv+WPjOeJiOe6s+WCo+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI1MzI4MDFcIjogXCLmma/mtKrluIJcIixcblx0ICAgIFwiNTMyODIyXCI6IFwi5YuQ5rW35Y6/XCIsXG5cdCAgICBcIjUzMjgyM1wiOiBcIuWLkOiFiuWOv1wiLFxuXHQgICAgXCI1MzI4MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMyOTAwXCI6IFwi5aSn55CG55m95peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMjkwMVwiOiBcIuWkp+eQhuW4glwiLFxuXHQgICAgXCI1MzI5MjJcIjogXCLmvL7mv57lvZ3ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNTMyOTIzXCI6IFwi56Wl5LqR5Y6/XCIsXG5cdCAgICBcIjUzMjkyNFwiOiBcIuWuvuW3neWOv1wiLFxuXHQgICAgXCI1MzI5MjVcIjogXCLlvKXmuKHljr9cIixcblx0ICAgIFwiNTMyOTI2XCI6IFwi5Y2X5ran5b2d5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMjkyN1wiOiBcIuW3jeWxseW9neaXj+WbnuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzI5MjhcIjogXCLmsLjlubPljr9cIixcblx0ICAgIFwiNTMyOTI5XCI6IFwi5LqR6b6Z5Y6/XCIsXG5cdCAgICBcIjUzMjkzMFwiOiBcIua0sea6kOWOv1wiLFxuXHQgICAgXCI1MzI5MzFcIjogXCLliZHlt53ljr9cIixcblx0ICAgIFwiNTMyOTMyXCI6IFwi6bmk5bqG5Y6/XCIsXG5cdCAgICBcIjUzMjkzM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1MzMxMDBcIjogXCLlvrflro/lgqPml4/mma/poofml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNTMzMTAyXCI6IFwi55Ge5Li95biCXCIsXG5cdCAgICBcIjUzMzEwM1wiOiBcIuiKkuW4glwiLFxuXHQgICAgXCI1MzMxMjJcIjogXCLmooHmsrPljr9cIixcblx0ICAgIFwiNTMzMTIzXCI6IFwi55uI5rGf5Y6/XCIsXG5cdCAgICBcIjUzMzEyNFwiOiBcIumZh+W3neWOv1wiLFxuXHQgICAgXCI1MzMxMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMzMzAwXCI6IFwi5oCS5rGf5YKI5YOz5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMzMyMVwiOiBcIuazuOawtOWOv1wiLFxuXHQgICAgXCI1MzMzMjNcIjogXCLnpo/otKHljr9cIixcblx0ICAgIFwiNTMzMzI0XCI6IFwi6LSh5bGx54us6b6Z5peP5oCS5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMzMyNVwiOiBcIuWFsOWdqueZveaXj+aZruexs+aXj+iHquayu+WOv1wiLFxuXHQgICAgXCI1MzMzMjZcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTMzNDAwXCI6IFwi6L+q5bqG6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjUzMzQyMVwiOiBcIummmeagvOmHjOaLieWOv1wiLFxuXHQgICAgXCI1MzM0MjJcIjogXCLlvrfpkqbljr9cIixcblx0ICAgIFwiNTMzNDIzXCI6IFwi57u06KW/5YKI5YOz5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjUzMzQyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1NDAwMDBcIjogXCLopb/ol4/oh6rmsrvljLpcIixcblx0ICAgIFwiNTQwMTAwXCI6IFwi5ouJ6JCo5biCXCIsXG5cdCAgICBcIjU0MDEwMlwiOiBcIuWfjuWFs+WMulwiLFxuXHQgICAgXCI1NDAxMjFcIjogXCLmnpflkajljr9cIixcblx0ICAgIFwiNTQwMTIyXCI6IFwi5b2T6ZuE5Y6/XCIsXG5cdCAgICBcIjU0MDEyM1wiOiBcIuWwvOacqOWOv1wiLFxuXHQgICAgXCI1NDAxMjRcIjogXCLmm7LmsLTljr9cIixcblx0ICAgIFwiNTQwMTI1XCI6IFwi5aCG6b6Z5b635bqG5Y6/XCIsXG5cdCAgICBcIjU0MDEyNlwiOiBcIui+vuWtnOWOv1wiLFxuXHQgICAgXCI1NDAxMjdcIjogXCLloqjnq7nlt6XljaHljr9cIixcblx0ICAgIFwiNTQwMTI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjU0MjEwMFwiOiBcIuaYjOmDveWcsOWMulwiLFxuXHQgICAgXCI1NDIxMjFcIjogXCLmmIzpg73ljr9cIixcblx0ICAgIFwiNTQyMTIyXCI6IFwi5rGf6L6+5Y6/XCIsXG5cdCAgICBcIjU0MjEyM1wiOiBcIui0oeinieWOv1wiLFxuXHQgICAgXCI1NDIxMjRcIjogXCLnsbvkuYzpvZDljr9cIixcblx0ICAgIFwiNTQyMTI1XCI6IFwi5LiB6Z2S5Y6/XCIsXG5cdCAgICBcIjU0MjEyNlwiOiBcIuWvn+mbheWOv1wiLFxuXHQgICAgXCI1NDIxMjdcIjogXCLlhavlrr/ljr9cIixcblx0ICAgIFwiNTQyMTI4XCI6IFwi5bem6LSh5Y6/XCIsXG5cdCAgICBcIjU0MjEyOVwiOiBcIuiKkuW6t+WOv1wiLFxuXHQgICAgXCI1NDIxMzJcIjogXCLmtJvpmobljr9cIixcblx0ICAgIFwiNTQyMTMzXCI6IFwi6L655Z2d5Y6/XCIsXG5cdCAgICBcIjU0MjEzNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI1NDIyMDBcIjogXCLlsbHljZflnLDljLpcIixcblx0ICAgIFwiNTQyMjIxXCI6IFwi5LmD5Lic5Y6/XCIsXG5cdCAgICBcIjU0MjIyMlwiOiBcIuaJjuWbiuWOv1wiLFxuXHQgICAgXCI1NDIyMjNcIjogXCLotKHlmI7ljr9cIixcblx0ICAgIFwiNTQyMjI0XCI6IFwi5qGR5pel5Y6/XCIsXG5cdCAgICBcIjU0MjIyNVwiOiBcIueQvOe7k+WOv1wiLFxuXHQgICAgXCI1NDIyMjZcIjogXCLmm7Lmnb7ljr9cIixcblx0ICAgIFwiNTQyMjI3XCI6IFwi5o6q576O5Y6/XCIsXG5cdCAgICBcIjU0MjIyOFwiOiBcIua0m+aJjuWOv1wiLFxuXHQgICAgXCI1NDIyMjlcIjogXCLliqDmn6Xljr9cIixcblx0ICAgIFwiNTQyMjMxXCI6IFwi6ZqG5a2Q5Y6/XCIsXG5cdCAgICBcIjU0MjIzMlwiOiBcIumUmemCo+WOv1wiLFxuXHQgICAgXCI1NDIyMzNcIjogXCLmtarljaHlrZDljr9cIixcblx0ICAgIFwiNTQyMjM0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjU0MjMwMFwiOiBcIuaXpeWWgOWImeWcsOWMulwiLFxuXHQgICAgXCI1NDIzMDFcIjogXCLml6XlloDliJnluIJcIixcblx0ICAgIFwiNTQyMzIyXCI6IFwi5Y2X5pyo5p6X5Y6/XCIsXG5cdCAgICBcIjU0MjMyM1wiOiBcIuaxn+WtnOWOv1wiLFxuXHQgICAgXCI1NDIzMjRcIjogXCLlrprml6Xljr9cIixcblx0ICAgIFwiNTQyMzI1XCI6IFwi6JCo6L+m5Y6/XCIsXG5cdCAgICBcIjU0MjMyNlwiOiBcIuaLieWtnOWOv1wiLFxuXHQgICAgXCI1NDIzMjdcIjogXCLmmILku4Hljr9cIixcblx0ICAgIFwiNTQyMzI4XCI6IFwi6LCi6YCa6Zeo5Y6/XCIsXG5cdCAgICBcIjU0MjMyOVwiOiBcIueZveacl+WOv1wiLFxuXHQgICAgXCI1NDIzMzBcIjogXCLku4HluIPljr9cIixcblx0ICAgIFwiNTQyMzMxXCI6IFwi5bq36ams5Y6/XCIsXG5cdCAgICBcIjU0MjMzMlwiOiBcIuWumue7k+WOv1wiLFxuXHQgICAgXCI1NDIzMzNcIjogXCLku7Llt7Tljr9cIixcblx0ICAgIFwiNTQyMzM0XCI6IFwi5Lqa5Lic5Y6/XCIsXG5cdCAgICBcIjU0MjMzNVwiOiBcIuWQiemahuWOv1wiLFxuXHQgICAgXCI1NDIzMzZcIjogXCLogYLmi4nmnKjljr9cIixcblx0ICAgIFwiNTQyMzM3XCI6IFwi6JCo5ZiO5Y6/XCIsXG5cdCAgICBcIjU0MjMzOFwiOiBcIuWyl+W3tOWOv1wiLFxuXHQgICAgXCI1NDIzMzlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTQyNDAwXCI6IFwi6YKj5puy5Zyw5Yy6XCIsXG5cdCAgICBcIjU0MjQyMVwiOiBcIumCo+absuWOv1wiLFxuXHQgICAgXCI1NDI0MjJcIjogXCLlmInpu47ljr9cIixcblx0ICAgIFwiNTQyNDIzXCI6IFwi5q+U5aaC5Y6/XCIsXG5cdCAgICBcIjU0MjQyNFwiOiBcIuiBguiNo+WOv1wiLFxuXHQgICAgXCI1NDI0MjVcIjogXCLlronlpJrljr9cIixcblx0ICAgIFwiNTQyNDI2XCI6IFwi55Sz5omO5Y6/XCIsXG5cdCAgICBcIjU0MjQyN1wiOiBcIue0ouWOv1wiLFxuXHQgICAgXCI1NDI0MjhcIjogXCLnj63miIjljr9cIixcblx0ICAgIFwiNTQyNDI5XCI6IFwi5be06Z2S5Y6/XCIsXG5cdCAgICBcIjU0MjQzMFwiOiBcIuWwvOeOm+WOv1wiLFxuXHQgICAgXCI1NDI0MzFcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNTQyNDMyXCI6IFwi5Y+M5rmW5Y6/XCIsXG5cdCAgICBcIjU0MjUwMFwiOiBcIumYv+mHjOWcsOWMulwiLFxuXHQgICAgXCI1NDI1MjFcIjogXCLmma7lhbDljr9cIixcblx0ICAgIFwiNTQyNTIyXCI6IFwi5pyt6L6+5Y6/XCIsXG5cdCAgICBcIjU0MjUyM1wiOiBcIuWZtuWwlOWOv1wiLFxuXHQgICAgXCI1NDI1MjRcIjogXCLml6XlnJ/ljr9cIixcblx0ICAgIFwiNTQyNTI1XCI6IFwi6Z2p5ZCJ5Y6/XCIsXG5cdCAgICBcIjU0MjUyNlwiOiBcIuaUueWImeWOv1wiLFxuXHQgICAgXCI1NDI1MjdcIjogXCLmjqrli6Tljr9cIixcblx0ICAgIFwiNTQyNTI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjU0MjYwMFwiOiBcIuael+iKneWcsOWMulwiLFxuXHQgICAgXCI1NDI2MjFcIjogXCLmnpfoip3ljr9cIixcblx0ICAgIFwiNTQyNjIyXCI6IFwi5bel5biD5rGf6L6+5Y6/XCIsXG5cdCAgICBcIjU0MjYyM1wiOiBcIuexs+ael+WOv1wiLFxuXHQgICAgXCI1NDI2MjRcIjogXCLloqjohLHljr9cIixcblx0ICAgIFwiNTQyNjI1XCI6IFwi5rOi5a+G5Y6/XCIsXG5cdCAgICBcIjU0MjYyNlwiOiBcIuWvn+maheWOv1wiLFxuXHQgICAgXCI1NDI2MjdcIjogXCLmnJfljr9cIixcblx0ICAgIFwiNTQyNjI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDAwMFwiOiBcIumZleilv+ecgVwiLFxuXHQgICAgXCI2MTAxMDBcIjogXCLopb/lronluIJcIixcblx0ICAgIFwiNjEwMTAyXCI6IFwi5paw5Z+O5Yy6XCIsXG5cdCAgICBcIjYxMDEwM1wiOiBcIueikeael+WMulwiLFxuXHQgICAgXCI2MTAxMDRcIjogXCLojrLmuZbljLpcIixcblx0ICAgIFwiNjEwMTExXCI6IFwi54Ge5qGl5Yy6XCIsXG5cdCAgICBcIjYxMDExMlwiOiBcIuacquWkruWMulwiLFxuXHQgICAgXCI2MTAxMTNcIjogXCLpm4HloZTljLpcIixcblx0ICAgIFwiNjEwMTE0XCI6IFwi6ZiO6Imv5Yy6XCIsXG5cdCAgICBcIjYxMDExNVwiOiBcIuS4tOa9vOWMulwiLFxuXHQgICAgXCI2MTAxMTZcIjogXCLplb/lronljLpcIixcblx0ICAgIFwiNjEwMTIyXCI6IFwi6JOd55Sw5Y6/XCIsXG5cdCAgICBcIjYxMDEyNFwiOiBcIuWRqOiHs+WOv1wiLFxuXHQgICAgXCI2MTAxMjVcIjogXCLmiLfljr9cIixcblx0ICAgIFwiNjEwMTI2XCI6IFwi6auY6Zm15Y6/XCIsXG5cdCAgICBcIjYxMDEyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTAyMDBcIjogXCLpk5zlt53luIJcIixcblx0ICAgIFwiNjEwMjAyXCI6IFwi546L55uK5Yy6XCIsXG5cdCAgICBcIjYxMDIwM1wiOiBcIuWNsOWPsOWMulwiLFxuXHQgICAgXCI2MTAyMDRcIjogXCLogIDlt57ljLpcIixcblx0ICAgIFwiNjEwMjIyXCI6IFwi5a6c5ZCb5Y6/XCIsXG5cdCAgICBcIjYxMDIyM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTAzMDBcIjogXCLlrp3puKHluIJcIixcblx0ICAgIFwiNjEwMzAyXCI6IFwi5rit5ruo5Yy6XCIsXG5cdCAgICBcIjYxMDMwM1wiOiBcIumHkeWPsOWMulwiLFxuXHQgICAgXCI2MTAzMDRcIjogXCLpmYjku5PljLpcIixcblx0ICAgIFwiNjEwMzIyXCI6IFwi5Yek57+U5Y6/XCIsXG5cdCAgICBcIjYxMDMyM1wiOiBcIuWykOWxseWOv1wiLFxuXHQgICAgXCI2MTAzMjRcIjogXCLmibbpo47ljr9cIixcblx0ICAgIFwiNjEwMzI2XCI6IFwi55yJ5Y6/XCIsXG5cdCAgICBcIjYxMDMyN1wiOiBcIumZh+WOv1wiLFxuXHQgICAgXCI2MTAzMjhcIjogXCLljYPpmLPljr9cIixcblx0ICAgIFwiNjEwMzI5XCI6IFwi6bqf5ri45Y6/XCIsXG5cdCAgICBcIjYxMDMzMFwiOiBcIuWHpOWOv1wiLFxuXHQgICAgXCI2MTAzMzFcIjogXCLlpKrnmb3ljr9cIixcblx0ICAgIFwiNjEwMzMyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDQwMFwiOiBcIuWSuOmYs+W4glwiLFxuXHQgICAgXCI2MTA0MDJcIjogXCLnp6bpg73ljLpcIixcblx0ICAgIFwiNjEwNDAzXCI6IFwi5p2o6Zm15Yy6XCIsXG5cdCAgICBcIjYxMDQwNFwiOiBcIua4reWfjuWMulwiLFxuXHQgICAgXCI2MTA0MjJcIjogXCLkuInljp/ljr9cIixcblx0ICAgIFwiNjEwNDIzXCI6IFwi5rO+6Ziz5Y6/XCIsXG5cdCAgICBcIjYxMDQyNFwiOiBcIuS5vuWOv1wiLFxuXHQgICAgXCI2MTA0MjVcIjogXCLnpLzms4nljr9cIixcblx0ICAgIFwiNjEwNDI2XCI6IFwi5rC45a+/5Y6/XCIsXG5cdCAgICBcIjYxMDQyN1wiOiBcIuW9rOWOv1wiLFxuXHQgICAgXCI2MTA0MjhcIjogXCLplb/mrabljr9cIixcblx0ICAgIFwiNjEwNDI5XCI6IFwi5pes6YKR5Y6/XCIsXG5cdCAgICBcIjYxMDQzMFwiOiBcIua3s+WMluWOv1wiLFxuXHQgICAgXCI2MTA0MzFcIjogXCLmrablip/ljr9cIixcblx0ICAgIFwiNjEwNDgxXCI6IFwi5YW05bmz5biCXCIsXG5cdCAgICBcIjYxMDQ4MlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MTA1MDBcIjogXCLmuK3ljZfluIJcIixcblx0ICAgIFwiNjEwNTAyXCI6IFwi5Li05rit5Yy6XCIsXG5cdCAgICBcIjYxMDUyMVwiOiBcIuWNjuWOv1wiLFxuXHQgICAgXCI2MTA1MjJcIjogXCLmvbzlhbPljr9cIixcblx0ICAgIFwiNjEwNTIzXCI6IFwi5aSn6I2U5Y6/XCIsXG5cdCAgICBcIjYxMDUyNFwiOiBcIuWQiOmYs+WOv1wiLFxuXHQgICAgXCI2MTA1MjVcIjogXCLmvoTln47ljr9cIixcblx0ICAgIFwiNjEwNTI2XCI6IFwi6JKy5Z+O5Y6/XCIsXG5cdCAgICBcIjYxMDUyN1wiOiBcIueZveawtOWOv1wiLFxuXHQgICAgXCI2MTA1MjhcIjogXCLlr4zlubPljr9cIixcblx0ICAgIFwiNjEwNTgxXCI6IFwi6Z+p5Z+O5biCXCIsXG5cdCAgICBcIjYxMDU4MlwiOiBcIuWNjumYtOW4glwiLFxuXHQgICAgXCI2MTA1ODNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwNjAwXCI6IFwi5bu25a6J5biCXCIsXG5cdCAgICBcIjYxMDYwMlwiOiBcIuWuneWhlOWMulwiLFxuXHQgICAgXCI2MTA2MjFcIjogXCLlu7bplb/ljr9cIixcblx0ICAgIFwiNjEwNjIyXCI6IFwi5bu25bed5Y6/XCIsXG5cdCAgICBcIjYxMDYyM1wiOiBcIuWtkOmVv+WOv1wiLFxuXHQgICAgXCI2MTA2MjRcIjogXCLlronloZ7ljr9cIixcblx0ICAgIFwiNjEwNjI1XCI6IFwi5b+X5Li55Y6/XCIsXG5cdCAgICBcIjYxMDYyNlwiOiBcIuWQtOi1t+WOv1wiLFxuXHQgICAgXCI2MTA2MjdcIjogXCLnlJjms4nljr9cIixcblx0ICAgIFwiNjEwNjI4XCI6IFwi5a+M5Y6/XCIsXG5cdCAgICBcIjYxMDYyOVwiOiBcIua0m+W3neWOv1wiLFxuXHQgICAgXCI2MTA2MzBcIjogXCLlrpzlt53ljr9cIixcblx0ICAgIFwiNjEwNjMxXCI6IFwi6buE6b6Z5Y6/XCIsXG5cdCAgICBcIjYxMDYzMlwiOiBcIum7hOmZteWOv1wiLFxuXHQgICAgXCI2MTA2MzNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwNzAwXCI6IFwi5rGJ5Lit5biCXCIsXG5cdCAgICBcIjYxMDcwMlwiOiBcIuaxieWPsOWMulwiLFxuXHQgICAgXCI2MTA3MjFcIjogXCLljZfpg5Hljr9cIixcblx0ICAgIFwiNjEwNzIyXCI6IFwi5Z+O5Zu65Y6/XCIsXG5cdCAgICBcIjYxMDcyM1wiOiBcIua0i+WOv1wiLFxuXHQgICAgXCI2MTA3MjRcIjogXCLopb/kuaHljr9cIixcblx0ICAgIFwiNjEwNzI1XCI6IFwi5YuJ5Y6/XCIsXG5cdCAgICBcIjYxMDcyNlwiOiBcIuWugeW8uuWOv1wiLFxuXHQgICAgXCI2MTA3MjdcIjogXCLnlaXpmLPljr9cIixcblx0ICAgIFwiNjEwNzI4XCI6IFwi6ZWH5be05Y6/XCIsXG5cdCAgICBcIjYxMDcyOVwiOiBcIueVmeWdneWOv1wiLFxuXHQgICAgXCI2MTA3MzBcIjogXCLkvZvlnarljr9cIixcblx0ICAgIFwiNjEwNzMxXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYxMDgwMFwiOiBcIuamhuael+W4glwiLFxuXHQgICAgXCI2MTA4MDJcIjogXCLmpobpmLPljLpcIixcblx0ICAgIFwiNjEwODIxXCI6IFwi56We5pyo5Y6/XCIsXG5cdCAgICBcIjYxMDgyMlwiOiBcIuW6nOiwt+WOv1wiLFxuXHQgICAgXCI2MTA4MjNcIjogXCLmqKrlsbHljr9cIixcblx0ICAgIFwiNjEwODI0XCI6IFwi6Z2W6L655Y6/XCIsXG5cdCAgICBcIjYxMDgyNVwiOiBcIuWumui+ueWOv1wiLFxuXHQgICAgXCI2MTA4MjZcIjogXCLnu6Xlvrfljr9cIixcblx0ICAgIFwiNjEwODI3XCI6IFwi57Gz6ISC5Y6/XCIsXG5cdCAgICBcIjYxMDgyOFwiOiBcIuS9s+WOv1wiLFxuXHQgICAgXCI2MTA4MjlcIjogXCLlkLTloKHljr9cIixcblx0ICAgIFwiNjEwODMwXCI6IFwi5riF5ran5Y6/XCIsXG5cdCAgICBcIjYxMDgzMVwiOiBcIuWtkOa0suWOv1wiLFxuXHQgICAgXCI2MTA4MzJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjEwOTAwXCI6IFwi5a6J5bq35biCXCIsXG5cdCAgICBcIjYxMDkwMlwiOiBcIuaxiea7qOWMulwiLFxuXHQgICAgXCI2MTA5MjFcIjogXCLmsYnpmLTljr9cIixcblx0ICAgIFwiNjEwOTIyXCI6IFwi55+z5rOJ5Y6/XCIsXG5cdCAgICBcIjYxMDkyM1wiOiBcIuWugemZleWOv1wiLFxuXHQgICAgXCI2MTA5MjRcIjogXCLntKvpmLPljr9cIixcblx0ICAgIFwiNjEwOTI1XCI6IFwi5bKa55qL5Y6/XCIsXG5cdCAgICBcIjYxMDkyNlwiOiBcIuW5s+WIqeWOv1wiLFxuXHQgICAgXCI2MTA5MjdcIjogXCLplYflnarljr9cIixcblx0ICAgIFwiNjEwOTI4XCI6IFwi5pes6Ziz5Y6/XCIsXG5cdCAgICBcIjYxMDkyOVwiOiBcIueZveays+WOv1wiLFxuXHQgICAgXCI2MTA5MzBcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjExMDAwXCI6IFwi5ZWG5rSb5biCXCIsXG5cdCAgICBcIjYxMTAwMlwiOiBcIuWVhuW3nuWMulwiLFxuXHQgICAgXCI2MTEwMjFcIjogXCLmtJvljZfljr9cIixcblx0ICAgIFwiNjExMDIyXCI6IFwi5Li55Yek5Y6/XCIsXG5cdCAgICBcIjYxMTAyM1wiOiBcIuWVhuWNl+WOv1wiLFxuXHQgICAgXCI2MTEwMjRcIjogXCLlsbHpmLPljr9cIixcblx0ICAgIFwiNjExMDI1XCI6IFwi6ZWH5a6J5Y6/XCIsXG5cdCAgICBcIjYxMTAyNlwiOiBcIuafnuawtOWOv1wiLFxuXHQgICAgXCI2MTEwMjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjIwMDAwXCI6IFwi55SY6IKD55yBXCIsXG5cdCAgICBcIjYyMDEwMFwiOiBcIuWFsOW3nuW4glwiLFxuXHQgICAgXCI2MjAxMDJcIjogXCLln47lhbPljLpcIixcblx0ICAgIFwiNjIwMTAzXCI6IFwi5LiD6YeM5rKz5Yy6XCIsXG5cdCAgICBcIjYyMDEwNFwiOiBcIuilv+WbuuWMulwiLFxuXHQgICAgXCI2MjAxMDVcIjogXCLlronlroHljLpcIixcblx0ICAgIFwiNjIwMTExXCI6IFwi57qi5Y+k5Yy6XCIsXG5cdCAgICBcIjYyMDEyMVwiOiBcIuawuOeZu+WOv1wiLFxuXHQgICAgXCI2MjAxMjJcIjogXCLnmovlhbDljr9cIixcblx0ICAgIFwiNjIwMTIzXCI6IFwi5qaG5Lit5Y6/XCIsXG5cdCAgICBcIjYyMDEyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjAyMDBcIjogXCLlmInls6rlhbPluIJcIixcblx0ICAgIFwiNjIwMzAwXCI6IFwi6YeR5piM5biCXCIsXG5cdCAgICBcIjYyMDMwMlwiOiBcIumHkeW3neWMulwiLFxuXHQgICAgXCI2MjAzMjFcIjogXCLmsLjmmIzljr9cIixcblx0ICAgIFwiNjIwMzIyXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDQwMFwiOiBcIueZvemTtuW4glwiLFxuXHQgICAgXCI2MjA0MDJcIjogXCLnmb3pk7bljLpcIixcblx0ICAgIFwiNjIwNDAzXCI6IFwi5bmz5bed5Yy6XCIsXG5cdCAgICBcIjYyMDQyMVwiOiBcIumdlui/nOWOv1wiLFxuXHQgICAgXCI2MjA0MjJcIjogXCLkvJrlroHljr9cIixcblx0ICAgIFwiNjIwNDIzXCI6IFwi5pmv5rOw5Y6/XCIsXG5cdCAgICBcIjYyMDQyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjA1MDBcIjogXCLlpKnmsLTluIJcIixcblx0ICAgIFwiNjIwNTAyXCI6IFwi56em5bee5Yy6XCIsXG5cdCAgICBcIjYyMDUwM1wiOiBcIum6puenr+WMulwiLFxuXHQgICAgXCI2MjA1MjFcIjogXCLmuIXmsLTljr9cIixcblx0ICAgIFwiNjIwNTIyXCI6IFwi56em5a6J5Y6/XCIsXG5cdCAgICBcIjYyMDUyM1wiOiBcIueUmOiwt+WOv1wiLFxuXHQgICAgXCI2MjA1MjRcIjogXCLmrablsbHljr9cIixcblx0ICAgIFwiNjIwNTI1XCI6IFwi5byg5a625bed5Zue5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYyMDUyNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjA2MDBcIjogXCLmrablqIHluIJcIixcblx0ICAgIFwiNjIwNjAyXCI6IFwi5YeJ5bee5Yy6XCIsXG5cdCAgICBcIjYyMDYyMVwiOiBcIuawkeWLpOWOv1wiLFxuXHQgICAgXCI2MjA2MjJcIjogXCLlj6Tmtarljr9cIixcblx0ICAgIFwiNjIwNjIzXCI6IFwi5aSp56Wd6JeP5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYyMDYyNFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjA3MDBcIjogXCLlvKDmjpbluIJcIixcblx0ICAgIFwiNjIwNzAyXCI6IFwi55SY5bee5Yy6XCIsXG5cdCAgICBcIjYyMDcyMVwiOiBcIuiCg+WNl+ijleWbuuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MjA3MjJcIjogXCLmsJHkuZDljr9cIixcblx0ICAgIFwiNjIwNzIzXCI6IFwi5Li05rO95Y6/XCIsXG5cdCAgICBcIjYyMDcyNFwiOiBcIumrmOWPsOWOv1wiLFxuXHQgICAgXCI2MjA3MjVcIjogXCLlsbHkuLnljr9cIixcblx0ICAgIFwiNjIwNzI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDgwMFwiOiBcIuW5s+WHieW4glwiLFxuXHQgICAgXCI2MjA4MDJcIjogXCLltIbls5LljLpcIixcblx0ICAgIFwiNjIwODIxXCI6IFwi5rO+5bed5Y6/XCIsXG5cdCAgICBcIjYyMDgyMlwiOiBcIueBteWPsOWOv1wiLFxuXHQgICAgXCI2MjA4MjNcIjogXCLltIfkv6Hljr9cIixcblx0ICAgIFwiNjIwODI0XCI6IFwi5Y2O5Lqt5Y6/XCIsXG5cdCAgICBcIjYyMDgyNVwiOiBcIuW6hOa1quWOv1wiLFxuXHQgICAgXCI2MjA4MjZcIjogXCLpnZnlroHljr9cIixcblx0ICAgIFwiNjIwODI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMDkwMFwiOiBcIumFkuazieW4glwiLFxuXHQgICAgXCI2MjA5MDJcIjogXCLogoPlt57ljLpcIixcblx0ICAgIFwiNjIwOTIxXCI6IFwi6YeR5aGU5Y6/XCIsXG5cdCAgICBcIjYyMDkyMlwiOiBcIueTnOW3nuWOv1wiLFxuXHQgICAgXCI2MjA5MjNcIjogXCLogoPljJfokpnlj6Tml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjIwOTI0XCI6IFwi6Zi/5YWL5aGe5ZOI6JCo5YWL5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYyMDk4MVwiOiBcIueOiemXqOW4glwiLFxuXHQgICAgXCI2MjA5ODJcIjogXCLmlabnhYzluIJcIixcblx0ICAgIFwiNjIwOTgzXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMTAwMFwiOiBcIuW6humYs+W4glwiLFxuXHQgICAgXCI2MjEwMDJcIjogXCLopb/ls7DljLpcIixcblx0ICAgIFwiNjIxMDIxXCI6IFwi5bqG5Z+O5Y6/XCIsXG5cdCAgICBcIjYyMTAyMlwiOiBcIueOr+WOv1wiLFxuXHQgICAgXCI2MjEwMjNcIjogXCLljY7msaDljr9cIixcblx0ICAgIFwiNjIxMDI0XCI6IFwi5ZCI5rC05Y6/XCIsXG5cdCAgICBcIjYyMTAyNVwiOiBcIuato+WugeWOv1wiLFxuXHQgICAgXCI2MjEwMjZcIjogXCLlroHljr9cIixcblx0ICAgIFwiNjIxMDI3XCI6IFwi6ZWH5Y6f5Y6/XCIsXG5cdCAgICBcIjYyMTAyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjExMDBcIjogXCLlrpropb/luIJcIixcblx0ICAgIFwiNjIxMTAyXCI6IFwi5a6J5a6a5Yy6XCIsXG5cdCAgICBcIjYyMTEyMVwiOiBcIumAmua4reWOv1wiLFxuXHQgICAgXCI2MjExMjJcIjogXCLpmYfopb/ljr9cIixcblx0ICAgIFwiNjIxMTIzXCI6IFwi5rit5rqQ5Y6/XCIsXG5cdCAgICBcIjYyMTEyNFwiOiBcIuS4tOa0ruWOv1wiLFxuXHQgICAgXCI2MjExMjVcIjogXCLmvLPljr9cIixcblx0ICAgIFwiNjIxMTI2XCI6IFwi5bK35Y6/XCIsXG5cdCAgICBcIjYyMTEyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjEyMDBcIjogXCLpmYfljZfluIJcIixcblx0ICAgIFwiNjIxMjAyXCI6IFwi5q2m6YO95Yy6XCIsXG5cdCAgICBcIjYyMTIyMVwiOiBcIuaIkOWOv1wiLFxuXHQgICAgXCI2MjEyMjJcIjogXCLmlofljr9cIixcblx0ICAgIFwiNjIxMjIzXCI6IFwi5a6V5piM5Y6/XCIsXG5cdCAgICBcIjYyMTIyNFwiOiBcIuW6t+WOv1wiLFxuXHQgICAgXCI2MjEyMjVcIjogXCLopb/lkozljr9cIixcblx0ICAgIFwiNjIxMjI2XCI6IFwi56S85Y6/XCIsXG5cdCAgICBcIjYyMTIyN1wiOiBcIuW+veWOv1wiLFxuXHQgICAgXCI2MjEyMjhcIjogXCLkuKTlvZPljr9cIixcblx0ICAgIFwiNjIxMjI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYyMjkwMFwiOiBcIuS4tOWkj+WbnuaXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MjI5MDFcIjogXCLkuLTlpI/luIJcIixcblx0ICAgIFwiNjIyOTIxXCI6IFwi5Li05aSP5Y6/XCIsXG5cdCAgICBcIjYyMjkyMlwiOiBcIuW6t+S5kOWOv1wiLFxuXHQgICAgXCI2MjI5MjNcIjogXCLmsLjpnZbljr9cIixcblx0ICAgIFwiNjIyOTI0XCI6IFwi5bm/5rKz5Y6/XCIsXG5cdCAgICBcIjYyMjkyNVwiOiBcIuWSjOaUv+WOv1wiLFxuXHQgICAgXCI2MjI5MjZcIjogXCLkuJzkuaHml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjIyOTI3XCI6IFwi56ev55+z5bGx5L+d5a6J5peP5Lic5Lmh5peP5pKS5ouJ5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYyMjkyOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MjMwMDBcIjogXCLnlJjljZfol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjIzMDAxXCI6IFwi5ZCI5L2c5biCXCIsXG5cdCAgICBcIjYyMzAyMVwiOiBcIuS4tOa9reWOv1wiLFxuXHQgICAgXCI2MjMwMjJcIjogXCLljZPlsLzljr9cIixcblx0ICAgIFwiNjIzMDIzXCI6IFwi6Iif5puy5Y6/XCIsXG5cdCAgICBcIjYyMzAyNFwiOiBcIui/remDqOWOv1wiLFxuXHQgICAgXCI2MjMwMjVcIjogXCLnjpvmm7Lljr9cIixcblx0ICAgIFwiNjIzMDI2XCI6IFwi56KM5puy5Y6/XCIsXG5cdCAgICBcIjYyMzAyN1wiOiBcIuWkj+ays+WOv1wiLFxuXHQgICAgXCI2MjMwMjhcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMwMDAwXCI6IFwi6Z2S5rW355yBXCIsXG5cdCAgICBcIjYzMDEwMFwiOiBcIuilv+WugeW4glwiLFxuXHQgICAgXCI2MzAxMDJcIjogXCLln47kuJzljLpcIixcblx0ICAgIFwiNjMwMTAzXCI6IFwi5Z+O5Lit5Yy6XCIsXG5cdCAgICBcIjYzMDEwNFwiOiBcIuWfjuilv+WMulwiLFxuXHQgICAgXCI2MzAxMDVcIjogXCLln47ljJfljLpcIixcblx0ICAgIFwiNjMwMTIxXCI6IFwi5aSn6YCa5Zue5peP5Zyf5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYzMDEyMlwiOiBcIua5n+S4reWOv1wiLFxuXHQgICAgXCI2MzAxMjNcIjogXCLmuZ/mupDljr9cIixcblx0ICAgIFwiNjMwMTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMjEwMFwiOiBcIua1t+S4nOW4glwiLFxuXHQgICAgXCI2MzIxMjFcIjogXCLlubPlronljr9cIixcblx0ICAgIFwiNjMyMTIyXCI6IFwi5rCR5ZKM5Zue5peP5Zyf5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYzMjEyM1wiOiBcIuS5kOmDveWMulwiLFxuXHQgICAgXCI2MzIxMjZcIjogXCLkupLliqnlnJ/ml4/oh6rmsrvljr9cIixcblx0ICAgIFwiNjMyMTI3XCI6IFwi5YyW6ZqG5Zue5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjYzMjEyOFwiOiBcIuW+quWMluaSkuaLieaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MzIxMjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMyMjAwXCI6IFwi5rW35YyX6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYzMjIyMVwiOiBcIumXqOa6kOWbnuaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MzIyMjJcIjogXCLnpYHov57ljr9cIixcblx0ICAgIFwiNjMyMjIzXCI6IFwi5rW35pmP5Y6/XCIsXG5cdCAgICBcIjYzMjIyNFwiOiBcIuWImuWvn+WOv1wiLFxuXHQgICAgXCI2MzIyMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMyMzAwXCI6IFwi6buE5Y2X6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYzMjMyMVwiOiBcIuWQjOS7geWOv1wiLFxuXHQgICAgXCI2MzIzMjJcIjogXCLlsJbmiY7ljr9cIixcblx0ICAgIFwiNjMyMzIzXCI6IFwi5rO95bqT5Y6/XCIsXG5cdCAgICBcIjYzMjMyNFwiOiBcIuays+WNl+iSmeWPpOaXj+iHquayu+WOv1wiLFxuXHQgICAgXCI2MzIzMjVcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMyNTAwXCI6IFwi5rW35Y2X6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYzMjUyMVwiOiBcIuWFseWSjOWOv1wiLFxuXHQgICAgXCI2MzI1MjJcIjogXCLlkIzlvrfljr9cIixcblx0ICAgIFwiNjMyNTIzXCI6IFwi6LS15b635Y6/XCIsXG5cdCAgICBcIjYzMjUyNFwiOiBcIuWFtOa1t+WOv1wiLFxuXHQgICAgXCI2MzI1MjVcIjogXCLotLXljZfljr9cIixcblx0ICAgIFwiNjMyNTI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjYzMjYwMFwiOiBcIuaenOa0m+iXj+aXj+iHquayu+W3nlwiLFxuXHQgICAgXCI2MzI2MjFcIjogXCLnjpvmsoHljr9cIixcblx0ICAgIFwiNjMyNjIyXCI6IFwi54+t546b5Y6/XCIsXG5cdCAgICBcIjYzMjYyM1wiOiBcIueUmOW+t+WOv1wiLFxuXHQgICAgXCI2MzI2MjRcIjogXCLovr7ml6Xljr9cIixcblx0ICAgIFwiNjMyNjI1XCI6IFwi5LmF5rK75Y6/XCIsXG5cdCAgICBcIjYzMjYyNlwiOiBcIueOm+WkmuWOv1wiLFxuXHQgICAgXCI2MzI2MjdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjMyNzAwXCI6IFwi546J5qCR6JeP5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjYzMjcyMVwiOiBcIueOieagkeW4glwiLFxuXHQgICAgXCI2MzI3MjJcIjogXCLmnYLlpJrljr9cIixcblx0ICAgIFwiNjMyNzIzXCI6IFwi56ew5aSa5Y6/XCIsXG5cdCAgICBcIjYzMjcyNFwiOiBcIuayu+WkmuWOv1wiLFxuXHQgICAgXCI2MzI3MjVcIjogXCLlm4rosKbljr9cIixcblx0ICAgIFwiNjMyNzI2XCI6IFwi5puy6bq76I6x5Y6/XCIsXG5cdCAgICBcIjYzMjcyN1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2MzI4MDBcIjogXCLmtbfopb/okpnlj6Tml4/ol4/ml4/oh6rmsrvlt55cIixcblx0ICAgIFwiNjMyODAxXCI6IFwi5qC85bCU5pyo5biCXCIsXG5cdCAgICBcIjYzMjgwMlwiOiBcIuW+t+S7pOWTiOW4glwiLFxuXHQgICAgXCI2MzI4MjFcIjogXCLkuYzlhbDljr9cIixcblx0ICAgIFwiNjMyODIyXCI6IFwi6YO95YWw5Y6/XCIsXG5cdCAgICBcIjYzMjgyM1wiOiBcIuWkqeWzu+WOv1wiLFxuXHQgICAgXCI2MzI4MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjQwMDAwXCI6IFwi5a6B5aSP5Zue5peP6Ieq5rK75Yy6XCIsXG5cdCAgICBcIjY0MDEwMFwiOiBcIumTtuW3neW4glwiLFxuXHQgICAgXCI2NDAxMDRcIjogXCLlhbTluobljLpcIixcblx0ICAgIFwiNjQwMTA1XCI6IFwi6KW/5aSP5Yy6XCIsXG5cdCAgICBcIjY0MDEwNlwiOiBcIumHkeWHpOWMulwiLFxuXHQgICAgXCI2NDAxMjFcIjogXCLmsLjlroHljr9cIixcblx0ICAgIFwiNjQwMTIyXCI6IFwi6LS65YWw5Y6/XCIsXG5cdCAgICBcIjY0MDE4MVwiOiBcIueBteatpuW4glwiLFxuXHQgICAgXCI2NDAxODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjQwMjAwXCI6IFwi55+z5Zi05bGx5biCXCIsXG5cdCAgICBcIjY0MDIwMlwiOiBcIuWkp+atpuWPo+WMulwiLFxuXHQgICAgXCI2NDAyMDVcIjogXCLmg6DlhpzljLpcIixcblx0ICAgIFwiNjQwMjIxXCI6IFwi5bmz572X5Y6/XCIsXG5cdCAgICBcIjY0MDIyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NDAzMDBcIjogXCLlkLTlv6DluIJcIixcblx0ICAgIFwiNjQwMzAyXCI6IFwi5Yip6YCa5Yy6XCIsXG5cdCAgICBcIjY0MDMwM1wiOiBcIue6ouWvuuWgoeWMulwiLFxuXHQgICAgXCI2NDAzMjNcIjogXCLnm5DmsaDljr9cIixcblx0ICAgIFwiNjQwMzI0XCI6IFwi5ZCM5b+D5Y6/XCIsXG5cdCAgICBcIjY0MDM4MVwiOiBcIumdkumTnOWzoeW4glwiLFxuXHQgICAgXCI2NDAzODJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjQwNDAwXCI6IFwi5Zu65Y6f5biCXCIsXG5cdCAgICBcIjY0MDQwMlwiOiBcIuWOn+W3nuWMulwiLFxuXHQgICAgXCI2NDA0MjJcIjogXCLopb/lkInljr9cIixcblx0ICAgIFwiNjQwNDIzXCI6IFwi6ZqG5b635Y6/XCIsXG5cdCAgICBcIjY0MDQyNFwiOiBcIuazvua6kOWOv1wiLFxuXHQgICAgXCI2NDA0MjVcIjogXCLlva3pmLPljr9cIixcblx0ICAgIFwiNjQwNDI2XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY0MDUwMFwiOiBcIuS4reWNq+W4glwiLFxuXHQgICAgXCI2NDA1MDJcIjogXCLmspnlnaHlpLTljLpcIixcblx0ICAgIFwiNjQwNTIxXCI6IFwi5Lit5a6B5Y6/XCIsXG5cdCAgICBcIjY0MDUyMlwiOiBcIua1t+WOn+WOv1wiLFxuXHQgICAgXCI2NDA1MjNcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUwMDAwXCI6IFwi5paw55aG57u05ZC+5bCU6Ieq5rK75Yy6XCIsXG5cdCAgICBcIjY1MDEwMFwiOiBcIuS5jOmygeacqOm9kOW4glwiLFxuXHQgICAgXCI2NTAxMDJcIjogXCLlpKnlsbHljLpcIixcblx0ICAgIFwiNjUwMTAzXCI6IFwi5rKZ5L6d5be05YWL5Yy6XCIsXG5cdCAgICBcIjY1MDEwNFwiOiBcIuaWsOW4guWMulwiLFxuXHQgICAgXCI2NTAxMDVcIjogXCLmsLTno6jmsp/ljLpcIixcblx0ICAgIFwiNjUwMTA2XCI6IFwi5aS05bGv5rKz5Yy6XCIsXG5cdCAgICBcIjY1MDEwN1wiOiBcIui+vuWdguWfjuWMulwiLFxuXHQgICAgXCI2NTAxMDlcIjogXCLnsbPkuJzljLpcIixcblx0ICAgIFwiNjUwMTIxXCI6IFwi5LmM6bKB5pyo6b2Q5Y6/XCIsXG5cdCAgICBcIjY1MDEyMlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTAyMDBcIjogXCLlhYvmi4nnjpvkvp3luIJcIixcblx0ICAgIFwiNjUwMjAyXCI6IFwi54us5bGx5a2Q5Yy6XCIsXG5cdCAgICBcIjY1MDIwM1wiOiBcIuWFi+aLieeOm+S+neWMulwiLFxuXHQgICAgXCI2NTAyMDRcIjogXCLnmb3norHmu6nljLpcIixcblx0ICAgIFwiNjUwMjA1XCI6IFwi5LmM5bCU56a+5Yy6XCIsXG5cdCAgICBcIjY1MDIwNlwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTIxMDBcIjogXCLlkJDpsoHnlarlnLDljLpcIixcblx0ICAgIFwiNjUyMTAxXCI6IFwi5ZCQ6bKB55Wq5biCXCIsXG5cdCAgICBcIjY1MjEyMlwiOiBcIumEr+WWhOWOv1wiLFxuXHQgICAgXCI2NTIxMjNcIjogXCLmiZjlhYvpgIrljr9cIixcblx0ICAgIFwiNjUyMTI0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MjIwMFwiOiBcIuWTiOWvhuWcsOWMulwiLFxuXHQgICAgXCI2NTIyMDFcIjogXCLlk4jlr4bluIJcIixcblx0ICAgIFwiNjUyMjIyXCI6IFwi5be06YeM5Z2k5ZOI6JCo5YWL6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjY1MjIyM1wiOiBcIuS8iuWQvuWOv1wiLFxuXHQgICAgXCI2NTIyMjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUyMzAwXCI6IFwi5piM5ZCJ5Zue5peP6Ieq5rK75beeXCIsXG5cdCAgICBcIjY1MjMwMVwiOiBcIuaYjOWQieW4glwiLFxuXHQgICAgXCI2NTIzMDJcIjogXCLpmJzlurfluIJcIixcblx0ICAgIFwiNjUyMzIzXCI6IFwi5ZG85Zu+5aOB5Y6/XCIsXG5cdCAgICBcIjY1MjMyNFwiOiBcIueOm+e6s+aWr+WOv1wiLFxuXHQgICAgXCI2NTIzMjVcIjogXCLlpYflj7Dljr9cIixcblx0ICAgIFwiNjUyMzI3XCI6IFwi5ZCJ5pyo6JCo5bCU5Y6/XCIsXG5cdCAgICBcIjY1MjMyOFwiOiBcIuacqOWekuWTiOiQqOWFi+iHquayu+WOv1wiLFxuXHQgICAgXCI2NTIzMjlcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUyNzAwXCI6IFwi5Y2a5bCU5aGU5ouJ6JKZ5Y+k6Ieq5rK75beeXCIsXG5cdCAgICBcIjY1MjcwMVwiOiBcIuWNmuS5kOW4glwiLFxuXHQgICAgXCI2NTI3MDJcIjogXCLpmL/mi4nlsbHlj6PluIJcIixcblx0ICAgIFwiNjUyNzIyXCI6IFwi57K+5rKz5Y6/XCIsXG5cdCAgICBcIjY1MjcyM1wiOiBcIua4qeazieWOv1wiLFxuXHQgICAgXCI2NTI3MjRcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUyODAwXCI6IFwi5be06Z+z6YOt5qWe6JKZ5Y+k6Ieq5rK75beeXCIsXG5cdCAgICBcIjY1MjgwMVwiOiBcIuW6k+WwlOWLkuW4glwiLFxuXHQgICAgXCI2NTI4MjJcIjogXCLova7lj7Dljr9cIixcblx0ICAgIFwiNjUyODIzXCI6IFwi5bCJ54qB5Y6/XCIsXG5cdCAgICBcIjY1MjgyNFwiOiBcIuiLpee+jOWOv1wiLFxuXHQgICAgXCI2NTI4MjVcIjogXCLkuJTmnKvljr9cIixcblx0ICAgIFwiNjUyODI2XCI6IFwi54SJ6ICG5Zue5peP6Ieq5rK75Y6/XCIsXG5cdCAgICBcIjY1MjgyN1wiOiBcIuWSjOmdmeWOv1wiLFxuXHQgICAgXCI2NTI4MjhcIjogXCLlkoznoZXljr9cIixcblx0ICAgIFwiNjUyODI5XCI6IFwi5Y2a5rmW5Y6/XCIsXG5cdCAgICBcIjY1MjgzMFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI2NTI5MDBcIjogXCLpmL/lhYvoi4/lnLDljLpcIixcblx0ICAgIFwiNjUyOTAxXCI6IFwi6Zi/5YWL6IuP5biCXCIsXG5cdCAgICBcIjY1MjkyMlwiOiBcIua4qeWuv+WOv1wiLFxuXHQgICAgXCI2NTI5MjNcIjogXCLlupPovabljr9cIixcblx0ICAgIFwiNjUyOTI0XCI6IFwi5rKZ6ZuF5Y6/XCIsXG5cdCAgICBcIjY1MjkyNVwiOiBcIuaWsOWSjOWOv1wiLFxuXHQgICAgXCI2NTI5MjZcIjogXCLmi5zln47ljr9cIixcblx0ICAgIFwiNjUyOTI3XCI6IFwi5LmM5LuA5Y6/XCIsXG5cdCAgICBcIjY1MjkyOFwiOiBcIumYv+eTpuaPkOWOv1wiLFxuXHQgICAgXCI2NTI5MjlcIjogXCLmn6/lnarljr9cIixcblx0ICAgIFwiNjUyOTMwXCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MzAwMFwiOiBcIuWFi+WtnOWLkuiLj+afr+WwlOWFi+WtnOiHquayu+W3nlwiLFxuXHQgICAgXCI2NTMwMDFcIjogXCLpmL/lm77ku4DluIJcIixcblx0ICAgIFwiNjUzMDIyXCI6IFwi6Zi/5YWL6Zm25Y6/XCIsXG5cdCAgICBcIjY1MzAyM1wiOiBcIumYv+WQiOWlh+WOv1wiLFxuXHQgICAgXCI2NTMwMjRcIjogXCLkuYzmgbDljr9cIixcblx0ICAgIFwiNjUzMDI1XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1MzEwMFwiOiBcIuWWgOS7gOWcsOWMulwiLFxuXHQgICAgXCI2NTMxMDFcIjogXCLlloDku4DluIJcIixcblx0ICAgIFwiNjUzMTIxXCI6IFwi55aP6ZmE5Y6/XCIsXG5cdCAgICBcIjY1MzEyMlwiOiBcIueWj+WLkuWOv1wiLFxuXHQgICAgXCI2NTMxMjNcIjogXCLoi7HlkInmspnljr9cIixcblx0ICAgIFwiNjUzMTI0XCI6IFwi5rO95pmu5Y6/XCIsXG5cdCAgICBcIjY1MzEyNVwiOiBcIuiOjui9puWOv1wiLFxuXHQgICAgXCI2NTMxMjZcIjogXCLlj7bln47ljr9cIixcblx0ICAgIFwiNjUzMTI3XCI6IFwi6bqm55uW5o+Q5Y6/XCIsXG5cdCAgICBcIjY1MzEyOFwiOiBcIuWys+aZrua5luWOv1wiLFxuXHQgICAgXCI2NTMxMjlcIjogXCLkvL3luIjljr9cIixcblx0ICAgIFwiNjUzMTMwXCI6IFwi5be05qWa5Y6/XCIsXG5cdCAgICBcIjY1MzEzMVwiOiBcIuWhlOS7gOW6k+WwlOW5suWhlOWQieWFi+iHquayu+WOv1wiLFxuXHQgICAgXCI2NTMxMzJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNjUzMjAwXCI6IFwi5ZKM55Sw5Zyw5Yy6XCIsXG5cdCAgICBcIjY1MzIwMVwiOiBcIuWSjOeUsOW4glwiLFxuXHQgICAgXCI2NTMyMjFcIjogXCLlkoznlLDljr9cIixcblx0ICAgIFwiNjUzMjIyXCI6IFwi5aKo546J5Y6/XCIsXG5cdCAgICBcIjY1MzIyM1wiOiBcIuearuWxseWOv1wiLFxuXHQgICAgXCI2NTMyMjRcIjogXCLmtJvmtabljr9cIixcblx0ICAgIFwiNjUzMjI1XCI6IFwi562W5YuS5Y6/XCIsXG5cdCAgICBcIjY1MzIyNlwiOiBcIuS6jueUsOWOv1wiLFxuXHQgICAgXCI2NTMyMjdcIjogXCLmsJHkuLDljr9cIixcblx0ICAgIFwiNjUzMjI4XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1NDAwMFwiOiBcIuS8iueKgeWTiOiQqOWFi+iHquayu+W3nlwiLFxuXHQgICAgXCI2NTQwMDJcIjogXCLkvIrlroHluIJcIixcblx0ICAgIFwiNjU0MDAzXCI6IFwi5aWO5bGv5biCXCIsXG5cdCAgICBcIjY1NDAyMVwiOiBcIuS8iuWugeWOv1wiLFxuXHQgICAgXCI2NTQwMjJcIjogXCLlr5/luIPmn6XlsJTplKHkvK/oh6rmsrvljr9cIixcblx0ICAgIFwiNjU0MDIzXCI6IFwi6ZyN5Z+O5Y6/XCIsXG5cdCAgICBcIjY1NDAyNFwiOiBcIuW3qeeVmeWOv1wiLFxuXHQgICAgXCI2NTQwMjVcIjogXCLmlrDmupDljr9cIixcblx0ICAgIFwiNjU0MDI2XCI6IFwi5pit6IuP5Y6/XCIsXG5cdCAgICBcIjY1NDAyN1wiOiBcIueJueWFi+aWr+WOv1wiLFxuXHQgICAgXCI2NTQwMjhcIjogXCLlsLzli5LlhYvljr9cIixcblx0ICAgIFwiNjU0MDI5XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1NDIwMFwiOiBcIuWhlOWfjuWcsOWMulwiLFxuXHQgICAgXCI2NTQyMDFcIjogXCLloZTln47luIJcIixcblx0ICAgIFwiNjU0MjAyXCI6IFwi5LmM6IuP5biCXCIsXG5cdCAgICBcIjY1NDIyMVwiOiBcIumineaVj+WOv1wiLFxuXHQgICAgXCI2NTQyMjNcIjogXCLmspnmub7ljr9cIixcblx0ICAgIFwiNjU0MjI0XCI6IFwi5omY6YeM5Y6/XCIsXG5cdCAgICBcIjY1NDIyNVwiOiBcIuijleawkeWOv1wiLFxuXHQgICAgXCI2NTQyMjZcIjogXCLlkozluIPlhYvotZvlsJTokpnlj6Toh6rmsrvljr9cIixcblx0ICAgIFwiNjU0MjI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1NDMwMFwiOiBcIumYv+WLkuazsOWcsOWMulwiLFxuXHQgICAgXCI2NTQzMDFcIjogXCLpmL/li5Lms7DluIJcIixcblx0ICAgIFwiNjU0MzIxXCI6IFwi5biD5bCU5rSl5Y6/XCIsXG5cdCAgICBcIjY1NDMyMlwiOiBcIuWvjOiVtOWOv1wiLFxuXHQgICAgXCI2NTQzMjNcIjogXCLnpo/mtbfljr9cIixcblx0ICAgIFwiNjU0MzI0XCI6IFwi5ZOI5be05rKz5Y6/XCIsXG5cdCAgICBcIjY1NDMyNVwiOiBcIumdkuays+WOv1wiLFxuXHQgICAgXCI2NTQzMjZcIjogXCLlkInmnKjkuYPljr9cIixcblx0ICAgIFwiNjU0MzI3XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjY1OTAwMVwiOiBcIuefs+ays+WtkOW4glwiLFxuXHQgICAgXCI2NTkwMDJcIjogXCLpmL/mi4nlsJTluIJcIixcblx0ICAgIFwiNjU5MDAzXCI6IFwi5Zu+5pyo6IiS5YWL5biCXCIsXG5cdCAgICBcIjY1OTAwNFwiOiBcIuS6lOWutua4oOW4glwiLFxuXHQgICAgXCI3MTAwMDBcIjogXCLlj7Dmub5cIixcblx0ICAgIFwiNzEwMTAwXCI6IFwi5Y+w5YyX5biCXCIsXG5cdCAgICBcIjcxMDEwMVwiOiBcIuS4reato+WMulwiLFxuXHQgICAgXCI3MTAxMDJcIjogXCLlpKflkIzljLpcIixcblx0ICAgIFwiNzEwMTAzXCI6IFwi5Lit5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDEwNFwiOiBcIuadvuWxseWMulwiLFxuXHQgICAgXCI3MTAxMDVcIjogXCLlpKflronljLpcIixcblx0ICAgIFwiNzEwMTA2XCI6IFwi5LiH5Y2O5Yy6XCIsXG5cdCAgICBcIjcxMDEwN1wiOiBcIuS/oeS5ieWMulwiLFxuXHQgICAgXCI3MTAxMDhcIjogXCLlo6vmnpfljLpcIixcblx0ICAgIFwiNzEwMTA5XCI6IFwi5YyX5oqV5Yy6XCIsXG5cdCAgICBcIjcxMDExMFwiOiBcIuWGhea5luWMulwiLFxuXHQgICAgXCI3MTAxMTFcIjogXCLljZfmuK/ljLpcIixcblx0ICAgIFwiNzEwMTEyXCI6IFwi5paH5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDExM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI3MTAyMDBcIjogXCLpq5jpm4TluIJcIixcblx0ICAgIFwiNzEwMjAxXCI6IFwi5paw5YW05Yy6XCIsXG5cdCAgICBcIjcxMDIwMlwiOiBcIuWJjemHkeWMulwiLFxuXHQgICAgXCI3MTAyMDNcIjogXCLoiqnpm4XljLpcIixcblx0ICAgIFwiNzEwMjA0XCI6IFwi55uQ5Z+V5Yy6XCIsXG5cdCAgICBcIjcxMDIwNVwiOiBcIum8k+WxseWMulwiLFxuXHQgICAgXCI3MTAyMDZcIjogXCLml5fmtKXljLpcIixcblx0ICAgIFwiNzEwMjA3XCI6IFwi5YmN6ZWH5Yy6XCIsXG5cdCAgICBcIjcxMDIwOFwiOiBcIuS4ieawkeWMulwiLFxuXHQgICAgXCI3MTAyMDlcIjogXCLlt6bokKXljLpcIixcblx0ICAgIFwiNzEwMjEwXCI6IFwi5qWg5qKT5Yy6XCIsXG5cdCAgICBcIjcxMDIxMVwiOiBcIuWwj+a4r+WMulwiLFxuXHQgICAgXCI3MTAyMTJcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNzEwMjQxXCI6IFwi6IuT6ZuF5Yy6XCIsXG5cdCAgICBcIjcxMDI0MlwiOiBcIuS7geatpuWMulwiLFxuXHQgICAgXCI3MTAyNDNcIjogXCLlpKfnpL7ljLpcIixcblx0ICAgIFwiNzEwMjQ0XCI6IFwi5YaI5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDI0NVwiOiBcIui3r+erueWMulwiLFxuXHQgICAgXCI3MTAyNDZcIjogXCLpmL/ojrLljLpcIixcblx0ICAgIFwiNzEwMjQ3XCI6IFwi55Sw5a+u5Yy6XCIsXG5cdCAgICBcIjcxMDI0OFwiOiBcIueHleW3ouWMulwiLFxuXHQgICAgXCI3MTAyNDlcIjogXCLmoaXlpLTljLpcIixcblx0ICAgIFwiNzEwMjUwXCI6IFwi5qKT5a6Y5Yy6XCIsXG5cdCAgICBcIjcxMDI1MVwiOiBcIuW8pemZgOWMulwiLFxuXHQgICAgXCI3MTAyNTJcIjogXCLmsLjlronljLpcIixcblx0ICAgIFwiNzEwMjUzXCI6IFwi5rmW5YaF5Yy6XCIsXG5cdCAgICBcIjcxMDI1NFwiOiBcIuWHpOWxseWMulwiLFxuXHQgICAgXCI3MTAyNTVcIjogXCLlpKflr67ljLpcIixcblx0ICAgIFwiNzEwMjU2XCI6IFwi5p6X5Zut5Yy6XCIsXG5cdCAgICBcIjcxMDI1N1wiOiBcIum4n+advuWMulwiLFxuXHQgICAgXCI3MTAyNThcIjogXCLlpKfmoJHljLpcIixcblx0ICAgIFwiNzEwMjU5XCI6IFwi5peX5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDI2MFwiOiBcIue+jua1k+WMulwiLFxuXHQgICAgXCI3MTAyNjFcIjogXCLlha3pvp/ljLpcIixcblx0ICAgIFwiNzEwMjYyXCI6IFwi5YaF6Zeo5Yy6XCIsXG5cdCAgICBcIjcxMDI2M1wiOiBcIuadieael+WMulwiLFxuXHQgICAgXCI3MTAyNjRcIjogXCLnlLLku5nljLpcIixcblx0ICAgIFwiNzEwMjY1XCI6IFwi5qGD5rqQ5Yy6XCIsXG5cdCAgICBcIjcxMDI2NlwiOiBcIumCo+eOm+Wkj+WMulwiLFxuXHQgICAgXCI3MTAyNjdcIjogXCLojILmnpfljLpcIixcblx0ICAgIFwiNzEwMjY4XCI6IFwi6IyE6JCj5Yy6XCIsXG5cdCAgICBcIjcxMDMwMFwiOiBcIuWPsOWNl+W4glwiLFxuXHQgICAgXCI3MTAzMDFcIjogXCLkuK3opb/ljLpcIixcblx0ICAgIFwiNzEwMzAyXCI6IFwi5Lic5Yy6XCIsXG5cdCAgICBcIjcxMDMwM1wiOiBcIuWNl+WMulwiLFxuXHQgICAgXCI3MTAzMDRcIjogXCLljJfljLpcIixcblx0ICAgIFwiNzEwMzA1XCI6IFwi5a6J5bmz5Yy6XCIsXG5cdCAgICBcIjcxMDMwNlwiOiBcIuWuieWNl+WMulwiLFxuXHQgICAgXCI3MTAzMDdcIjogXCLlhbblroPljLpcIixcblx0ICAgIFwiNzEwMzM5XCI6IFwi5rC45bq35Yy6XCIsXG5cdCAgICBcIjcxMDM0MFwiOiBcIuW9kuS7geWMulwiLFxuXHQgICAgXCI3MTAzNDFcIjogXCLmlrDljJbljLpcIixcblx0ICAgIFwiNzEwMzQyXCI6IFwi5bem6ZWH5Yy6XCIsXG5cdCAgICBcIjcxMDM0M1wiOiBcIueOieS6leWMulwiLFxuXHQgICAgXCI3MTAzNDRcIjogXCLmpaDopb/ljLpcIixcblx0ICAgIFwiNzEwMzQ1XCI6IFwi5Y2X5YyW5Yy6XCIsXG5cdCAgICBcIjcxMDM0NlwiOiBcIuS7geW+t+WMulwiLFxuXHQgICAgXCI3MTAzNDdcIjogXCLlhbPlupnljLpcIixcblx0ICAgIFwiNzEwMzQ4XCI6IFwi6b6Z5bSO5Yy6XCIsXG5cdCAgICBcIjcxMDM0OVwiOiBcIuWumOeUsOWMulwiLFxuXHQgICAgXCI3MTAzNTBcIjogXCLpurvosYbljLpcIixcblx0ICAgIFwiNzEwMzUxXCI6IFwi5L2z6YeM5Yy6XCIsXG5cdCAgICBcIjcxMDM1MlwiOiBcIuilv+a4r+WMulwiLFxuXHQgICAgXCI3MTAzNTNcIjogXCLkuIPogqHljLpcIixcblx0ICAgIFwiNzEwMzU0XCI6IFwi5bCG5Yab5Yy6XCIsXG5cdCAgICBcIjcxMDM1NVwiOiBcIuWtpueUsuWMulwiLFxuXHQgICAgXCI3MTAzNTZcIjogXCLljJfpl6jljLpcIixcblx0ICAgIFwiNzEwMzU3XCI6IFwi5paw6JCl5Yy6XCIsXG5cdCAgICBcIjcxMDM1OFwiOiBcIuWQjuWjgeWMulwiLFxuXHQgICAgXCI3MTAzNTlcIjogXCLnmb3msrPljLpcIixcblx0ICAgIFwiNzEwMzYwXCI6IFwi5Lic5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDM2MVwiOiBcIuWFreeUsuWMulwiLFxuXHQgICAgXCI3MTAzNjJcIjogXCLkuIvokKXljLpcIixcblx0ICAgIFwiNzEwMzYzXCI6IFwi5p+z6JCl5Yy6XCIsXG5cdCAgICBcIjcxMDM2NFwiOiBcIuebkOawtOWMulwiLFxuXHQgICAgXCI3MTAzNjVcIjogXCLlloTljJbljLpcIixcblx0ICAgIFwiNzEwMzY2XCI6IFwi5aSn5YaF5Yy6XCIsXG5cdCAgICBcIjcxMDM2N1wiOiBcIuWxseS4iuWMulwiLFxuXHQgICAgXCI3MTAzNjhcIjogXCLmlrDluILljLpcIixcblx0ICAgIFwiNzEwMzY5XCI6IFwi5a6J5a6a5Yy6XCIsXG5cdCAgICBcIjcxMDQwMFwiOiBcIuWPsOS4reW4glwiLFxuXHQgICAgXCI3MTA0MDFcIjogXCLkuK3ljLpcIixcblx0ICAgIFwiNzEwNDAyXCI6IFwi5Lic5Yy6XCIsXG5cdCAgICBcIjcxMDQwM1wiOiBcIuWNl+WMulwiLFxuXHQgICAgXCI3MTA0MDRcIjogXCLopb/ljLpcIixcblx0ICAgIFwiNzEwNDA1XCI6IFwi5YyX5Yy6XCIsXG5cdCAgICBcIjcxMDQwNlwiOiBcIuWMl+Wxr+WMulwiLFxuXHQgICAgXCI3MTA0MDdcIjogXCLopb/lsa/ljLpcIixcblx0ICAgIFwiNzEwNDA4XCI6IFwi5Y2X5bGv5Yy6XCIsXG5cdCAgICBcIjcxMDQwOVwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI3MTA0MzFcIjogXCLlpKrlubPljLpcIixcblx0ICAgIFwiNzEwNDMyXCI6IFwi5aSn6YeM5Yy6XCIsXG5cdCAgICBcIjcxMDQzM1wiOiBcIumbvuWzsOWMulwiLFxuXHQgICAgXCI3MTA0MzRcIjogXCLkuYzml6XljLpcIixcblx0ICAgIFwiNzEwNDM1XCI6IFwi5Liw5Y6f5Yy6XCIsXG5cdCAgICBcIjcxMDQzNlwiOiBcIuWQjumHjOWMulwiLFxuXHQgICAgXCI3MTA0MzdcIjogXCLnn7PlhojljLpcIixcblx0ICAgIFwiNzEwNDM4XCI6IFwi5Lic5Yq/5Yy6XCIsXG5cdCAgICBcIjcxMDQzOVwiOiBcIuWSjOW5s+WMulwiLFxuXHQgICAgXCI3MTA0NDBcIjogXCLmlrDnpL7ljLpcIixcblx0ICAgIFwiNzEwNDQxXCI6IFwi5r2t5a2Q5Yy6XCIsXG5cdCAgICBcIjcxMDQ0MlwiOiBcIuWkp+mbheWMulwiLFxuXHQgICAgXCI3MTA0NDNcIjogXCLnpZ7lhojljLpcIixcblx0ICAgIFwiNzEwNDQ0XCI6IFwi5aSn6IKa5Yy6XCIsXG5cdCAgICBcIjcxMDQ0NVwiOiBcIuaymem5v+WMulwiLFxuXHQgICAgXCI3MTA0NDZcIjogXCLpvpnkupXljLpcIixcblx0ICAgIFwiNzEwNDQ3XCI6IFwi5qKn5qCW5Yy6XCIsXG5cdCAgICBcIjcxMDQ0OFwiOiBcIua4heawtOWMulwiLFxuXHQgICAgXCI3MTA0NDlcIjogXCLlpKfnlLLljLpcIixcblx0ICAgIFwiNzEwNDUwXCI6IFwi5aSW5Z+U5Yy6XCIsXG5cdCAgICBcIjcxMDQ1MVwiOiBcIuWkp+WuieWMulwiLFxuXHQgICAgXCI3MTA1MDBcIjogXCLph5Hpl6jljr9cIixcblx0ICAgIFwiNzEwNTA3XCI6IFwi6YeR5rKZ6ZWHXCIsXG5cdCAgICBcIjcxMDUwOFwiOiBcIumHkea5lumVh1wiLFxuXHQgICAgXCI3MTA1MDlcIjogXCLph5HlroHkuaFcIixcblx0ICAgIFwiNzEwNTEwXCI6IFwi6YeR5Z+O6ZWHXCIsXG5cdCAgICBcIjcxMDUxMVwiOiBcIueDiOWxv+S5oVwiLFxuXHQgICAgXCI3MTA1MTJcIjogXCLkuYzlnbXkuaFcIixcblx0ICAgIFwiNzEwNjAwXCI6IFwi5Y2X5oqV5Y6/XCIsXG5cdCAgICBcIjcxMDYxNFwiOiBcIuWNl+aKleW4glwiLFxuXHQgICAgXCI3MTA2MTVcIjogXCLkuK3lr67kuaFcIixcblx0ICAgIFwiNzEwNjE2XCI6IFwi6I2J5bGv6ZWHXCIsXG5cdCAgICBcIjcxMDYxN1wiOiBcIuWbveWnk+S5oVwiLFxuXHQgICAgXCI3MTA2MThcIjogXCLln5Tph4zplYdcIixcblx0ICAgIFwiNzEwNjE5XCI6IFwi5LuB54ix5LmhXCIsXG5cdCAgICBcIjcxMDYyMFwiOiBcIuWQjemXtOS5oVwiLFxuXHQgICAgXCI3MTA2MjFcIjogXCLpm4bpm4bplYdcIixcblx0ICAgIFwiNzEwNjIyXCI6IFwi5rC06YeM5LmhXCIsXG5cdCAgICBcIjcxMDYyM1wiOiBcIumxvOaxoOS5oVwiLFxuXHQgICAgXCI3MTA2MjRcIjogXCLkv6HkuYnkuaFcIixcblx0ICAgIFwiNzEwNjI1XCI6IFwi56u55bGx6ZWHXCIsXG5cdCAgICBcIjcxMDYyNlwiOiBcIum5v+iwt+S5oVwiLFxuXHQgICAgXCI3MTA3MDBcIjogXCLln7rpmobluIJcIixcblx0ICAgIFwiNzEwNzAxXCI6IFwi5LuB54ix5Yy6XCIsXG5cdCAgICBcIjcxMDcwMlwiOiBcIuS/oeS5ieWMulwiLFxuXHQgICAgXCI3MTA3MDNcIjogXCLkuK3mraPljLpcIixcblx0ICAgIFwiNzEwNzA0XCI6IFwi5Lit5bGx5Yy6XCIsXG5cdCAgICBcIjcxMDcwNVwiOiBcIuWuieS5kOWMulwiLFxuXHQgICAgXCI3MTA3MDZcIjogXCLmmpbmmpbljLpcIixcblx0ICAgIFwiNzEwNzA3XCI6IFwi5LiD5aC15Yy6XCIsXG5cdCAgICBcIjcxMDcwOFwiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI3MTA4MDBcIjogXCLmlrDnq7nluIJcIixcblx0ICAgIFwiNzEwODAxXCI6IFwi5Lic5Yy6XCIsXG5cdCAgICBcIjcxMDgwMlwiOiBcIuWMl+WMulwiLFxuXHQgICAgXCI3MTA4MDNcIjogXCLpppnlsbHljLpcIixcblx0ICAgIFwiNzEwODA0XCI6IFwi5YW25a6D5Yy6XCIsXG5cdCAgICBcIjcxMDkwMFwiOiBcIuWYieS5ieW4glwiLFxuXHQgICAgXCI3MTA5MDFcIjogXCLkuJzljLpcIixcblx0ICAgIFwiNzEwOTAyXCI6IFwi6KW/5Yy6XCIsXG5cdCAgICBcIjcxMDkwM1wiOiBcIuWFtuWug+WMulwiLFxuXHQgICAgXCI3MTExMDBcIjogXCLmlrDljJfluIJcIixcblx0ICAgIFwiNzExMTMwXCI6IFwi5LiH6YeM5Yy6XCIsXG5cdCAgICBcIjcxMTEzMVwiOiBcIumHkeWxseWMulwiLFxuXHQgICAgXCI3MTExMzJcIjogXCLmnb/moaXljLpcIixcblx0ICAgIFwiNzExMTMzXCI6IFwi5rGQ5q2i5Yy6XCIsXG5cdCAgICBcIjcxMTEzNFwiOiBcIua3seWdkeWMulwiLFxuXHQgICAgXCI3MTExMzVcIjogXCLnn7PnoofljLpcIixcblx0ICAgIFwiNzExMTM2XCI6IFwi55Ge6Iqz5Yy6XCIsXG5cdCAgICBcIjcxMTEzN1wiOiBcIuW5s+a6quWMulwiLFxuXHQgICAgXCI3MTExMzhcIjogXCLlj4zmuqrljLpcIixcblx0ICAgIFwiNzExMTM5XCI6IFwi6LSh5a+u5Yy6XCIsXG5cdCAgICBcIjcxMTE0MFwiOiBcIuaWsOW6l+WMulwiLFxuXHQgICAgXCI3MTExNDFcIjogXCLlnarmnpfljLpcIixcblx0ICAgIFwiNzExMTQyXCI6IFwi5LmM5p2l5Yy6XCIsXG5cdCAgICBcIjcxMTE0M1wiOiBcIuawuOWSjOWMulwiLFxuXHQgICAgXCI3MTExNDRcIjogXCLkuK3lkozljLpcIixcblx0ICAgIFwiNzExMTQ1XCI6IFwi5Zyf5Z+O5Yy6XCIsXG5cdCAgICBcIjcxMTE0NlwiOiBcIuS4ieWzoeWMulwiLFxuXHQgICAgXCI3MTExNDdcIjogXCLmoJHmnpfljLpcIixcblx0ICAgIFwiNzExMTQ4XCI6IFwi6I665q2M5Yy6XCIsXG5cdCAgICBcIjcxMTE0OVwiOiBcIuS4iemHjeWMulwiLFxuXHQgICAgXCI3MTExNTBcIjogXCLmlrDluoTljLpcIixcblx0ICAgIFwiNzExMTUxXCI6IFwi5rOw5bGx5Yy6XCIsXG5cdCAgICBcIjcxMTE1MlwiOiBcIuael+WPo+WMulwiLFxuXHQgICAgXCI3MTExNTNcIjogXCLoiqbmtLLljLpcIixcblx0ICAgIFwiNzExMTU0XCI6IFwi5LqU6IKh5Yy6XCIsXG5cdCAgICBcIjcxMTE1NVwiOiBcIuWFq+mHjOWMulwiLFxuXHQgICAgXCI3MTExNTZcIjogXCLmt6HmsLTljLpcIixcblx0ICAgIFwiNzExMTU3XCI6IFwi5LiJ6Iqd5Yy6XCIsXG5cdCAgICBcIjcxMTE1OFwiOiBcIuefs+mXqOWMulwiLFxuXHQgICAgXCI3MTEyMDBcIjogXCLlrpzlhbDljr9cIixcblx0ICAgIFwiNzExMjE0XCI6IFwi5a6c5YWw5biCXCIsXG5cdCAgICBcIjcxMTIxNVwiOiBcIuWktOWfjumVh1wiLFxuXHQgICAgXCI3MTEyMTZcIjogXCLnpIHmuqrkuaFcIixcblx0ICAgIFwiNzExMjE3XCI6IFwi5aOu5Zu05LmhXCIsXG5cdCAgICBcIjcxMTIxOFwiOiBcIuWRmOWxseS5oVwiLFxuXHQgICAgXCI3MTEyMTlcIjogXCLnvZfkuJzplYdcIixcblx0ICAgIFwiNzExMjIwXCI6IFwi5LiJ5pif5LmhXCIsXG5cdCAgICBcIjcxMTIyMVwiOiBcIuWkp+WQjOS5oVwiLFxuXHQgICAgXCI3MTEyMjJcIjogXCLkupTnu5PkuaFcIixcblx0ICAgIFwiNzExMjIzXCI6IFwi5Yas5bGx5LmhXCIsXG5cdCAgICBcIjcxMTIyNFwiOiBcIuiLj+a+s+mVh1wiLFxuXHQgICAgXCI3MTEyMjVcIjogXCLljZfmvrPkuaFcIixcblx0ICAgIFwiNzExMjI2XCI6IFwi6ZKT6bG85Y+wXCIsXG5cdCAgICBcIjcxMTMwMFwiOiBcIuaWsOerueWOv1wiLFxuXHQgICAgXCI3MTEzMTRcIjogXCLnq7nljJfluIJcIixcblx0ICAgIFwiNzExMzE1XCI6IFwi5rmW5Y+j5LmhXCIsXG5cdCAgICBcIjcxMTMxNlwiOiBcIuaWsOS4sOS5oVwiLFxuXHQgICAgXCI3MTEzMTdcIjogXCLmlrDln5TplYdcIixcblx0ICAgIFwiNzExMzE4XCI6IFwi5YWz6KW/6ZWHXCIsXG5cdCAgICBcIjcxMTMxOVwiOiBcIuiKjuael+S5oVwiLFxuXHQgICAgXCI3MTEzMjBcIjogXCLlrp3lsbHkuaFcIixcblx0ICAgIFwiNzExMzIxXCI6IFwi56u55Lic6ZWHXCIsXG5cdCAgICBcIjcxMTMyMlwiOiBcIuS6lOWzsOS5oVwiLFxuXHQgICAgXCI3MTEzMjNcIjogXCLmqKrlsbHkuaFcIixcblx0ICAgIFwiNzExMzI0XCI6IFwi5bCW55+z5LmhXCIsXG5cdCAgICBcIjcxMTMyNVwiOiBcIuWMl+WflOS5oVwiLFxuXHQgICAgXCI3MTEzMjZcIjogXCLls6jnnInkuaFcIixcblx0ICAgIFwiNzExNDAwXCI6IFwi5qGD5Zut5Y6/XCIsXG5cdCAgICBcIjcxMTQxNFwiOiBcIuS4reWdnOW4glwiLFxuXHQgICAgXCI3MTE0MTVcIjogXCLlubPplYfluIJcIixcblx0ICAgIFwiNzExNDE2XCI6IFwi6b6Z5r2t5LmhXCIsXG5cdCAgICBcIjcxMTQxN1wiOiBcIuadqOaiheW4glwiLFxuXHQgICAgXCI3MTE0MThcIjogXCLmlrDlsYvkuaFcIixcblx0ICAgIFwiNzExNDE5XCI6IFwi6KeC6Z+z5LmhXCIsXG5cdCAgICBcIjcxMTQyMFwiOiBcIuahg+WbreW4glwiLFxuXHQgICAgXCI3MTE0MjFcIjogXCLpvp/lsbHkuaFcIixcblx0ICAgIFwiNzExNDIyXCI6IFwi5YWr5b635biCXCIsXG5cdCAgICBcIjcxMTQyM1wiOiBcIuWkp+a6qumVh1wiLFxuXHQgICAgXCI3MTE0MjRcIjogXCLlpI3lhbTkuaFcIixcblx0ICAgIFwiNzExNDI1XCI6IFwi5aSn5Zut5LmhXCIsXG5cdCAgICBcIjcxMTQyNlwiOiBcIuiKpuerueS5oVwiLFxuXHQgICAgXCI3MTE1MDBcIjogXCLoi5fmoJfljr9cIixcblx0ICAgIFwiNzExNTE5XCI6IFwi56u55Y2X6ZWHXCIsXG5cdCAgICBcIjcxMTUyMFwiOiBcIuWktOS7vemVh1wiLFxuXHQgICAgXCI3MTE1MjFcIjogXCLkuInmub7kuaFcIixcblx0ICAgIFwiNzExNTIyXCI6IFwi5Y2X5bqE5LmhXCIsXG5cdCAgICBcIjcxMTUyM1wiOiBcIueLrua9reS5oVwiLFxuXHQgICAgXCI3MTE1MjRcIjogXCLlkI7pvpnplYdcIixcblx0ICAgIFwiNzExNTI1XCI6IFwi6YCa6ZyE6ZWHXCIsXG5cdCAgICBcIjcxMTUyNlwiOiBcIuiLkemHjOmVh1wiLFxuXHQgICAgXCI3MTE1MjdcIjogXCLoi5fmoJfluIJcIixcblx0ICAgIFwiNzExNTI4XCI6IFwi6YCg5qGl5LmhXCIsXG5cdCAgICBcIjcxMTUyOVwiOiBcIuWktOWxi+S5oVwiLFxuXHQgICAgXCI3MTE1MzBcIjogXCLlhazppobkuaFcIixcblx0ICAgIFwiNzExNTMxXCI6IFwi5aSn5rmW5LmhXCIsXG5cdCAgICBcIjcxMTUzMlwiOiBcIuazsOWuieS5oVwiLFxuXHQgICAgXCI3MTE1MzNcIjogXCLpk5zplKPkuaFcIixcblx0ICAgIFwiNzExNTM0XCI6IFwi5LiJ5LmJ5LmhXCIsXG5cdCAgICBcIjcxMTUzNVwiOiBcIuilv+a5luS5oVwiLFxuXHQgICAgXCI3MTE1MzZcIjogXCLljZPlhbDplYdcIixcblx0ICAgIFwiNzExNzAwXCI6IFwi5b2w5YyW5Y6/XCIsXG5cdCAgICBcIjcxMTcyN1wiOiBcIuW9sOWMluW4glwiLFxuXHQgICAgXCI3MTE3MjhcIjogXCLoiqzlm63kuaFcIixcblx0ICAgIFwiNzExNzI5XCI6IFwi6Iqx5Z2b5LmhXCIsXG5cdCAgICBcIjcxMTczMFwiOiBcIuengOawtOS5oVwiLFxuXHQgICAgXCI3MTE3MzFcIjogXCLpub/muK/plYdcIixcblx0ICAgIFwiNzExNzMyXCI6IFwi56aP5YW05LmhXCIsXG5cdCAgICBcIjcxMTczM1wiOiBcIue6v+ilv+S5oVwiLFxuXHQgICAgXCI3MTE3MzRcIjogXCLlkoznvo7plYdcIixcblx0ICAgIFwiNzExNzM1XCI6IFwi5Ly45riv5LmhXCIsXG5cdCAgICBcIjcxMTczNlwiOiBcIuWRmOael+mVh1wiLFxuXHQgICAgXCI3MTE3MzdcIjogXCLnpL7lpLTkuaFcIixcblx0ICAgIFwiNzExNzM4XCI6IFwi5rC46Z2W5LmhXCIsXG5cdCAgICBcIjcxMTczOVwiOiBcIuWflOW/g+S5oVwiLFxuXHQgICAgXCI3MTE3NDBcIjogXCLmuqrmuZbplYdcIixcblx0ICAgIFwiNzExNzQxXCI6IFwi5aSn5p2R5LmhXCIsXG5cdCAgICBcIjcxMTc0MlwiOiBcIuWflOebkOS5oVwiLFxuXHQgICAgXCI3MTE3NDNcIjogXCLnlLDkuK3plYdcIixcblx0ICAgIFwiNzExNzQ0XCI6IFwi5YyX5paX6ZWHXCIsXG5cdCAgICBcIjcxMTc0NVwiOiBcIueUsOWwvuS5oVwiLFxuXHQgICAgXCI3MTE3NDZcIjogXCLln6TlpLTkuaFcIixcblx0ICAgIFwiNzExNzQ3XCI6IFwi5rqq5bee5LmhXCIsXG5cdCAgICBcIjcxMTc0OFwiOiBcIuerueWhmOS5oVwiLFxuXHQgICAgXCI3MTE3NDlcIjogXCLkuozmnpfplYdcIixcblx0ICAgIFwiNzExNzUwXCI6IFwi5aSn5Z+O5LmhXCIsXG5cdCAgICBcIjcxMTc1MVwiOiBcIuiKs+iLkeS5oVwiLFxuXHQgICAgXCI3MTE3NTJcIjogXCLkuozmsLTkuaFcIixcblx0ICAgIFwiNzExOTAwXCI6IFwi5ZiJ5LmJ5Y6/XCIsXG5cdCAgICBcIjcxMTkxOVwiOiBcIueVqui3r+S5oVwiLFxuXHQgICAgXCI3MTE5MjBcIjogXCLmooXlsbHkuaFcIixcblx0ICAgIFwiNzExOTIxXCI6IFwi56u55bSO5LmhXCIsXG5cdCAgICBcIjcxMTkyMlwiOiBcIumYv+mHjOWxseS5oVwiLFxuXHQgICAgXCI3MTE5MjNcIjogXCLkuK3ln5TkuaFcIixcblx0ICAgIFwiNzExOTI0XCI6IFwi5aSn5Z+U5LmhXCIsXG5cdCAgICBcIjcxMTkyNVwiOiBcIuawtOS4iuS5oVwiLFxuXHQgICAgXCI3MTE5MjZcIjogXCLpub/ojYnkuaFcIixcblx0ICAgIFwiNzExOTI3XCI6IFwi5aSq5L+d5biCXCIsXG5cdCAgICBcIjcxMTkyOFwiOiBcIuactOWtkOW4glwiLFxuXHQgICAgXCI3MTE5MjlcIjogXCLkuJznn7PkuaFcIixcblx0ICAgIFwiNzExOTMwXCI6IFwi5YWt6ISa5LmhXCIsXG5cdCAgICBcIjcxMTkzMVwiOiBcIuaWsOa4r+S5oVwiLFxuXHQgICAgXCI3MTE5MzJcIjogXCLmsJHpm4TkuaFcIixcblx0ICAgIFwiNzExOTMzXCI6IFwi5aSn5p6X6ZWHXCIsXG5cdCAgICBcIjcxMTkzNFwiOiBcIua6quWPo+S5oVwiLFxuXHQgICAgXCI3MTE5MzVcIjogXCLkuYnnq7nkuaFcIixcblx0ICAgIFwiNzExOTM2XCI6IFwi5biD6KKL6ZWHXCIsXG5cdCAgICBcIjcxMjEwMFwiOiBcIuS6keael+WOv1wiLFxuXHQgICAgXCI3MTIxMjFcIjogXCLmlpfljZfplYdcIixcblx0ICAgIFwiNzEyMTIyXCI6IFwi5aSn5Z+k5LmhXCIsXG5cdCAgICBcIjcxMjEyM1wiOiBcIuiZjuWwvumVh1wiLFxuXHQgICAgXCI3MTIxMjRcIjogXCLlnJ/lupPplYdcIixcblx0ICAgIFwiNzEyMTI1XCI6IFwi6KSS5b+g5LmhXCIsXG5cdCAgICBcIjcxMjEyNlwiOiBcIuS4nOWKv+S5oVwiLFxuXHQgICAgXCI3MTIxMjdcIjogXCLlj7Dopb/kuaFcIixcblx0ICAgIFwiNzEyMTI4XCI6IFwi5LuR6IOM5LmhXCIsXG5cdCAgICBcIjcxMjEyOVwiOiBcIum6puWvruS5oVwiLFxuXHQgICAgXCI3MTIxMzBcIjogXCLmlpflha3luIJcIixcblx0ICAgIFwiNzEyMTMxXCI6IFwi5p6X5YaF5LmhXCIsXG5cdCAgICBcIjcxMjEzMlwiOiBcIuWPpOWdkeS5oVwiLFxuXHQgICAgXCI3MTIxMzNcIjogXCLojr/moZDkuaFcIixcblx0ICAgIFwiNzEyMTM0XCI6IFwi6KW/6J666ZWHXCIsXG5cdCAgICBcIjcxMjEzNVwiOiBcIuS6jOS7keS5oVwiLFxuXHQgICAgXCI3MTIxMzZcIjogXCLljJfmuK/plYdcIixcblx0ICAgIFwiNzEyMTM3XCI6IFwi5rC05p6X5LmhXCIsXG5cdCAgICBcIjcxMjEzOFwiOiBcIuWPo+a5luS5oVwiLFxuXHQgICAgXCI3MTIxMzlcIjogXCLlm5vmuZbkuaFcIixcblx0ICAgIFwiNzEyMTQwXCI6IFwi5YWD6ZW/5LmhXCIsXG5cdCAgICBcIjcxMjQwMFwiOiBcIuWxj+S4nOWOv1wiLFxuXHQgICAgXCI3MTI0MzRcIjogXCLlsY/kuJzluIJcIixcblx0ICAgIFwiNzEyNDM1XCI6IFwi5LiJ5Zyw6Zeo5LmhXCIsXG5cdCAgICBcIjcxMjQzNlwiOiBcIumbvuWPsOS5oVwiLFxuXHQgICAgXCI3MTI0MzdcIjogXCLnjpvlrrbkuaFcIixcblx0ICAgIFwiNzEyNDM4XCI6IFwi5Lmd5aaC5LmhXCIsXG5cdCAgICBcIjcxMjQzOVwiOiBcIumHjOa4r+S5oVwiLFxuXHQgICAgXCI3MTI0NDBcIjogXCLpq5jmoJHkuaFcIixcblx0ICAgIFwiNzEyNDQxXCI6IFwi55uQ5Z+U5LmhXCIsXG5cdCAgICBcIjcxMjQ0MlwiOiBcIumVv+ayu+S5oVwiLFxuXHQgICAgXCI3MTI0NDNcIjogXCLpup/mtJvkuaFcIixcblx0ICAgIFwiNzEyNDQ0XCI6IFwi56u555Sw5LmhXCIsXG5cdCAgICBcIjcxMjQ0NVwiOiBcIuWGheWflOS5oVwiLFxuXHQgICAgXCI3MTI0NDZcIjogXCLkuIfkuLnkuaFcIixcblx0ICAgIFwiNzEyNDQ3XCI6IFwi5r2u5bee6ZWHXCIsXG5cdCAgICBcIjcxMjQ0OFwiOiBcIuazsOatpuS5oVwiLFxuXHQgICAgXCI3MTI0NDlcIjogXCLmnaXkuYnkuaFcIixcblx0ICAgIFwiNzEyNDUwXCI6IFwi5LiH5bOm5LmhXCIsXG5cdCAgICBcIjcxMjQ1MVwiOiBcIuW0gemhtuS5oVwiLFxuXHQgICAgXCI3MTI0NTJcIjogXCLmlrDln6TkuaFcIixcblx0ICAgIFwiNzEyNDUzXCI6IFwi5Y2X5bee5LmhXCIsXG5cdCAgICBcIjcxMjQ1NFwiOiBcIuael+i+ueS5oVwiLFxuXHQgICAgXCI3MTI0NTVcIjogXCLkuJzmuK/plYdcIixcblx0ICAgIFwiNzEyNDU2XCI6IFwi55CJ55CD5LmhXCIsXG5cdCAgICBcIjcxMjQ1N1wiOiBcIuS9s+WGrOS5oVwiLFxuXHQgICAgXCI3MTI0NThcIjogXCLmlrDlm63kuaFcIixcblx0ICAgIFwiNzEyNDU5XCI6IFwi5p6L5a+u5LmhXCIsXG5cdCAgICBcIjcxMjQ2MFwiOiBcIuaei+WxseS5oVwiLFxuXHQgICAgXCI3MTI0NjFcIjogXCLmmKXml6XkuaFcIixcblx0ICAgIFwiNzEyNDYyXCI6IFwi54uu5a2Q5LmhXCIsXG5cdCAgICBcIjcxMjQ2M1wiOiBcIui9puWfjuS5oVwiLFxuXHQgICAgXCI3MTI0NjRcIjogXCLniaHkuLnkuaFcIixcblx0ICAgIFwiNzEyNDY1XCI6IFwi5oGS5pil6ZWHXCIsXG5cdCAgICBcIjcxMjQ2NlwiOiBcIua7oeW3nuS5oVwiLFxuXHQgICAgXCI3MTI1MDBcIjogXCLlj7DkuJzljr9cIixcblx0ICAgIFwiNzEyNTE3XCI6IFwi5Y+w5Lic5biCXCIsXG5cdCAgICBcIjcxMjUxOFwiOiBcIue7v+Wym+S5oVwiLFxuXHQgICAgXCI3MTI1MTlcIjogXCLlhbDlsb/kuaFcIixcblx0ICAgIFwiNzEyNTIwXCI6IFwi5bu25bmz5LmhXCIsXG5cdCAgICBcIjcxMjUyMVwiOiBcIuWNkeWNl+S5oVwiLFxuXHQgICAgXCI3MTI1MjJcIjogXCLpub/ph47kuaFcIixcblx0ICAgIFwiNzEyNTIzXCI6IFwi5YWz5bGx6ZWHXCIsXG5cdCAgICBcIjcxMjUyNFwiOiBcIua1t+err+S5oVwiLFxuXHQgICAgXCI3MTI1MjVcIjogXCLmsaDkuIrkuaFcIixcblx0ICAgIFwiNzEyNTI2XCI6IFwi5Lic5rKz5LmhXCIsXG5cdCAgICBcIjcxMjUyN1wiOiBcIuaIkOWKn+mVh1wiLFxuXHQgICAgXCI3MTI1MjhcIjogXCLplb/mu6jkuaFcIixcblx0ICAgIFwiNzEyNTI5XCI6IFwi6YeR5bOw5LmhXCIsXG5cdCAgICBcIjcxMjUzMFwiOiBcIuWkp+atpuS5oVwiLFxuXHQgICAgXCI3MTI1MzFcIjogXCLovr7ku4HkuaFcIixcblx0ICAgIFwiNzEyNTMyXCI6IFwi5aSq6bq76YeM5LmhXCIsXG5cdCAgICBcIjcxMjYwMFwiOiBcIuiKseiOsuWOv1wiLFxuXHQgICAgXCI3MTI2MTVcIjogXCLoirHojrLluIJcIixcblx0ICAgIFwiNzEyNjE2XCI6IFwi5paw5Z+O5LmhXCIsXG5cdCAgICBcIjcxMjYxN1wiOiBcIuWkqumygemYgVwiLFxuXHQgICAgXCI3MTI2MThcIjogXCLnp4DmnpfkuaFcIixcblx0ICAgIFwiNzEyNjE5XCI6IFwi5ZCJ5a6J5LmhXCIsXG5cdCAgICBcIjcxMjYyMFwiOiBcIuWvv+S4sOS5oVwiLFxuXHQgICAgXCI3MTI2MjFcIjogXCLlh6TmnpfplYdcIixcblx0ICAgIFwiNzEyNjIyXCI6IFwi5YWJ5aSN5LmhXCIsXG5cdCAgICBcIjcxMjYyM1wiOiBcIuS4sOa7qOS5oVwiLFxuXHQgICAgXCI3MTI2MjRcIjogXCLnkZ7nqZfkuaFcIixcblx0ICAgIFwiNzEyNjI1XCI6IFwi5LiH6I2j5LmhXCIsXG5cdCAgICBcIjcxMjYyNlwiOiBcIueOiemHjOmVh1wiLFxuXHQgICAgXCI3MTI2MjdcIjogXCLljZPmuqrkuaFcIixcblx0ICAgIFwiNzEyNjI4XCI6IFwi5a+M6YeM5LmhXCIsXG5cdCAgICBcIjcxMjcwMFwiOiBcIua+jua5luWOv1wiLFxuXHQgICAgXCI3MTI3MDdcIjogXCLpqazlhazluIJcIixcblx0ICAgIFwiNzEyNzA4XCI6IFwi6KW/5bG/5LmhXCIsXG5cdCAgICBcIjcxMjcwOVwiOiBcIuacm+WuieS5oVwiLFxuXHQgICAgXCI3MTI3MTBcIjogXCLkuIPnvo7kuaFcIixcblx0ICAgIFwiNzEyNzExXCI6IFwi55m95rKZ5LmhXCIsXG5cdCAgICBcIjcxMjcxMlwiOiBcIua5luilv+S5oVwiLFxuXHQgICAgXCI3MTI4MDBcIjogXCLov57msZ/ljr9cIixcblx0ICAgIFwiNzEyODA1XCI6IFwi5Y2X56u/5LmhXCIsXG5cdCAgICBcIjcxMjgwNlwiOiBcIuWMl+erv+S5oVwiLFxuXHQgICAgXCI3MTI4MDdcIjogXCLojpLlhYnkuaFcIixcblx0ICAgIFwiNzEyODA4XCI6IFwi5Lic5byV5LmhXCIsXG5cdCAgICBcIjgxMDAwMFwiOiBcIummmea4r+eJueWIq+ihjOaUv+WMulwiLFxuXHQgICAgXCI4MTAxMDBcIjogXCLpppnmuK/lsptcIixcblx0ICAgIFwiODEwMTAxXCI6IFwi5Lit6KW/5Yy6XCIsXG5cdCAgICBcIjgxMDEwMlwiOiBcIua5vuS7lFwiLFxuXHQgICAgXCI4MTAxMDNcIjogXCLkuJzljLpcIixcblx0ICAgIFwiODEwMTA0XCI6IFwi5Y2X5Yy6XCIsXG5cdCAgICBcIjgxMDIwMFwiOiBcIuS5nem+mVwiLFxuXHQgICAgXCI4MTAyMDFcIjogXCLkuZ3pvpnln47ljLpcIixcblx0ICAgIFwiODEwMjAyXCI6IFwi5rK55bCW5pe65Yy6XCIsXG5cdCAgICBcIjgxMDIwM1wiOiBcIua3seawtOWfl+WMulwiLFxuXHQgICAgXCI4MTAyMDRcIjogXCLpu4TlpKfku5nljLpcIixcblx0ICAgIFwiODEwMjA1XCI6IFwi6KeC5aGY5Yy6XCIsXG5cdCAgICBcIjgxMDMwMFwiOiBcIuaWsOeVjFwiLFxuXHQgICAgXCI4MTAzMDFcIjogXCLljJfljLpcIixcblx0ICAgIFwiODEwMzAyXCI6IFwi5aSn5Z+U5Yy6XCIsXG5cdCAgICBcIjgxMDMwM1wiOiBcIuaymeeUsOWMulwiLFxuXHQgICAgXCI4MTAzMDRcIjogXCLopb/otKHljLpcIixcblx0ICAgIFwiODEwMzA1XCI6IFwi5YWD5pyX5Yy6XCIsXG5cdCAgICBcIjgxMDMwNlwiOiBcIuWxr+mXqOWMulwiLFxuXHQgICAgXCI4MTAzMDdcIjogXCLojYPmub7ljLpcIixcblx0ICAgIFwiODEwMzA4XCI6IFwi6JG16Z2S5Yy6XCIsXG5cdCAgICBcIjgxMDMwOVwiOiBcIuemu+Wym+WMulwiLFxuXHQgICAgXCI4MjAwMDBcIjogXCLmvrPpl6jnibnliKvooYzmlL/ljLpcIixcblx0ICAgIFwiODIwMTAwXCI6IFwi5r6z6Zeo5Y2K5bKbXCIsXG5cdCAgICBcIjgyMDIwMFwiOiBcIuemu+Wym1wiLFxuXHQgICAgXCI5OTAwMDBcIjogXCLmtbflpJZcIixcblx0ICAgIFwiOTkwMTAwXCI6IFwi5rW35aSWXCJcblx0fVxuXG5cdC8vIGlkIHBpZC9wYXJlbnRJZCBuYW1lIGNoaWxkcmVuXG5cdGZ1bmN0aW9uIHRyZWUobGlzdCkge1xuXHQgICAgdmFyIG1hcHBlZCA9IHt9XG5cdCAgICBmb3IgKHZhciBpID0gMCwgaXRlbTsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICBpdGVtID0gbGlzdFtpXVxuXHQgICAgICAgIGlmICghaXRlbSB8fCAhaXRlbS5pZCkgY29udGludWVcblx0ICAgICAgICBtYXBwZWRbaXRlbS5pZF0gPSBpdGVtXG5cdCAgICB9XG5cblx0ICAgIHZhciByZXN1bHQgPSBbXVxuXHQgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGxpc3QubGVuZ3RoOyBpaSsrKSB7XG5cdCAgICAgICAgaXRlbSA9IGxpc3RbaWldXG5cblx0ICAgICAgICBpZiAoIWl0ZW0pIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIC8qIGpzaGludCAtVzA0MSAqL1xuXHQgICAgICAgIGlmIChpdGVtLnBpZCA9PSB1bmRlZmluZWQgJiYgaXRlbS5wYXJlbnRJZCA9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHBhcmVudCA9IG1hcHBlZFtpdGVtLnBpZF0gfHwgbWFwcGVkW2l0ZW0ucGFyZW50SWRdXG5cdCAgICAgICAgaWYgKCFwYXJlbnQpIGNvbnRpbnVlXG5cdCAgICAgICAgaWYgKCFwYXJlbnQuY2hpbGRyZW4pIHBhcmVudC5jaGlsZHJlbiA9IFtdXG5cdCAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaXRlbSlcblx0ICAgIH1cblx0ICAgIHJldHVybiByZXN1bHRcblx0fVxuXG5cdHZhciBESUNUX0ZJWEVEID0gZnVuY3Rpb24oKSB7XG5cdCAgICB2YXIgZml4ZWQgPSBbXVxuXHQgICAgZm9yICh2YXIgaWQgaW4gRElDVCkge1xuXHQgICAgICAgIHZhciBwaWQgPSBpZC5zbGljZSgyLCA2KSA9PT0gJzAwMDAnID8gdW5kZWZpbmVkIDpcblx0ICAgICAgICAgICAgaWQuc2xpY2UoNCwgNikgPT0gJzAwJyA/IChpZC5zbGljZSgwLCAyKSArICcwMDAwJykgOlxuXHQgICAgICAgICAgICBpZC5zbGljZSgwLCA0KSArICcwMCdcblx0ICAgICAgICBmaXhlZC5wdXNoKHtcblx0ICAgICAgICAgICAgaWQ6IGlkLFxuXHQgICAgICAgICAgICBwaWQ6IHBpZCxcblx0ICAgICAgICAgICAgbmFtZTogRElDVFtpZF1cblx0ICAgICAgICB9KVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRyZWUoZml4ZWQpXG5cdH0oKVxuXG5cdG1vZHVsZS5leHBvcnRzID0gRElDVF9GSVhFRFxuXG4vKioqLyB9LFxuLyogMTkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyBNaXNjZWxsYW5lb3VzXG5cdCovXG5cdHZhciBESUNUID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOClcblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdFx0Ly8gRGljZVxuXHRcdGQ0OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgNClcblx0XHR9LFxuXHRcdGQ2OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgNilcblx0XHR9LFxuXHRcdGQ4OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgOClcblx0XHR9LFxuXHRcdGQxMjogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDEyKVxuXHRcdH0sXG5cdFx0ZDIwOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMjApXG5cdFx0fSxcblx0XHRkMTAwOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMTAwKVxuXHRcdH0sXG5cdFx0Lypcblx0XHQgICAg6ZqP5py655Sf5oiQ5LiA5LiqIEdVSUTjgIJcblxuXHRcdCAgICBodHRwOi8vd3d3LmJyb29mYS5jb20vMjAwOC8wOS9qYXZhc2NyaXB0LXV1aWQtZnVuY3Rpb24vXG5cdFx0ICAgIFtVVUlEIOinhOiMg10oaHR0cDovL3d3dy5pZXRmLm9yZy9yZmMvcmZjNDEyMi50eHQpXG5cdFx0ICAgICAgICBVVUlEcyAoVW5pdmVyc2FsbHkgVW5pcXVlIElEZW50aWZpZXIpXG5cdFx0ICAgICAgICBHVUlEcyAoR2xvYmFsbHkgVW5pcXVlIElEZW50aWZpZXIpXG5cdFx0ICAgICAgICBUaGUgZm9ybWFsIGRlZmluaXRpb24gb2YgdGhlIFVVSUQgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGlzIHByb3ZpZGVkIGJ5IHRoZSBmb2xsb3dpbmcgQUJORiBbN106XG5cdFx0ICAgICAgICAgICAgVVVJRCAgICAgICAgICAgICAgICAgICA9IHRpbWUtbG93IFwiLVwiIHRpbWUtbWlkIFwiLVwiXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lLWhpZ2gtYW5kLXZlcnNpb24gXCItXCJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb2NrLXNlcS1hbmQtcmVzZXJ2ZWRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb2NrLXNlcS1sb3cgXCItXCIgbm9kZVxuXHRcdCAgICAgICAgICAgIHRpbWUtbG93ICAgICAgICAgICAgICAgPSA0aGV4T2N0ZXRcblx0XHQgICAgICAgICAgICB0aW1lLW1pZCAgICAgICAgICAgICAgID0gMmhleE9jdGV0XG5cdFx0ICAgICAgICAgICAgdGltZS1oaWdoLWFuZC12ZXJzaW9uICA9IDJoZXhPY3RldFxuXHRcdCAgICAgICAgICAgIGNsb2NrLXNlcS1hbmQtcmVzZXJ2ZWQgPSBoZXhPY3RldFxuXHRcdCAgICAgICAgICAgIGNsb2NrLXNlcS1sb3cgICAgICAgICAgPSBoZXhPY3RldFxuXHRcdCAgICAgICAgICAgIG5vZGUgICAgICAgICAgICAgICAgICAgPSA2aGV4T2N0ZXRcblx0XHQgICAgICAgICAgICBoZXhPY3RldCAgICAgICAgICAgICAgID0gaGV4RGlnaXQgaGV4RGlnaXRcblx0XHQgICAgICAgICAgICBoZXhEaWdpdCA9XG5cdFx0ICAgICAgICAgICAgICAgIFwiMFwiIC8gXCIxXCIgLyBcIjJcIiAvIFwiM1wiIC8gXCI0XCIgLyBcIjVcIiAvIFwiNlwiIC8gXCI3XCIgLyBcIjhcIiAvIFwiOVwiIC9cblx0XHQgICAgICAgICAgICAgICAgXCJhXCIgLyBcImJcIiAvIFwiY1wiIC8gXCJkXCIgLyBcImVcIiAvIFwiZlwiIC9cblx0XHQgICAgICAgICAgICAgICAgXCJBXCIgLyBcIkJcIiAvIFwiQ1wiIC8gXCJEXCIgLyBcIkVcIiAvIFwiRlwiXG5cdFx0ICAgIFxuXHRcdCAgICBodHRwczovL2dpdGh1Yi5jb20vdmljdG9ycXVpbm4vY2hhbmNlanMvYmxvYi9kZXZlbG9wL2NoYW5jZS5qcyNMMTM0OVxuXHRcdCovXG5cdFx0Z3VpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcG9vbCA9IFwiYWJjZGVmQUJDREVGMTIzNDU2Nzg5MFwiLFxuXHRcdFx0XHRndWlkID0gdGhpcy5zdHJpbmcocG9vbCwgOCkgKyAnLScgK1xuXHRcdFx0XHR0aGlzLnN0cmluZyhwb29sLCA0KSArICctJyArXG5cdFx0XHRcdHRoaXMuc3RyaW5nKHBvb2wsIDQpICsgJy0nICtcblx0XHRcdFx0dGhpcy5zdHJpbmcocG9vbCwgNCkgKyAnLScgK1xuXHRcdFx0XHR0aGlzLnN0cmluZyhwb29sLCAxMik7XG5cdFx0XHRyZXR1cm4gZ3VpZFxuXHRcdH0sXG5cdFx0dXVpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ndWlkKClcblx0XHR9LFxuXHRcdC8qXG5cdFx0ICAgIOmaj+acuueUn+aIkOS4gOS4qiAxOCDkvY3ouqvku73or4HjgIJcblxuXHRcdCAgICBb6Lqr5Lu96K+BXShodHRwOi8vYmFpa2UuYmFpZHUuY29tL3ZpZXcvMTY5Ny5odG0jNClcblx0XHQgICAgICAgIOWcsOWdgOeggSA2ICsg5Ye655Sf5pel5pyf56CBIDggKyDpobrluo/noIEgMyArIOagoemqjOeggSAxXG5cdFx0ICAgIFvjgIrkuK3ljY7kurrmsJHlhbHlkozlm73ooYzmlL/ljLrliJLku6PnoIHjgIvlm73lrrbmoIflh4YoR0IvVDIyNjApXShodHRwOi8vemhpZGFvLmJhaWR1LmNvbS9xdWVzdGlvbi8xOTU0NTYxLmh0bWwpXG5cdFx0Ki9cblx0XHRpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaWQsXG5cdFx0XHRcdHN1bSA9IDAsXG5cdFx0XHRcdHJhbmsgPSBbXG5cdFx0XHRcdFx0XCI3XCIsIFwiOVwiLCBcIjEwXCIsIFwiNVwiLCBcIjhcIiwgXCI0XCIsIFwiMlwiLCBcIjFcIiwgXCI2XCIsIFwiM1wiLCBcIjdcIiwgXCI5XCIsIFwiMTBcIiwgXCI1XCIsIFwiOFwiLCBcIjRcIiwgXCIyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0bGFzdCA9IFtcblx0XHRcdFx0XHRcIjFcIiwgXCIwXCIsIFwiWFwiLCBcIjlcIiwgXCI4XCIsIFwiN1wiLCBcIjZcIiwgXCI1XCIsIFwiNFwiLCBcIjNcIiwgXCIyXCJcblx0XHRcdFx0XVxuXG5cdFx0XHRpZCA9IHRoaXMucGljayhESUNUKS5pZCArXG5cdFx0XHRcdHRoaXMuZGF0ZSgneXl5eU1NZGQnKSArXG5cdFx0XHRcdHRoaXMuc3RyaW5nKCdudW1iZXInLCAzKVxuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHN1bSArPSBpZFtpXSAqIHJhbmtbaV07XG5cdFx0XHR9XG5cdFx0XHRpZCArPSBsYXN0W3N1bSAlIDExXTtcblxuXHRcdFx0cmV0dXJuIGlkXG5cdFx0fSxcblxuXHRcdC8qXG5cdFx0ICAgIOeUn+aIkOS4gOS4quWFqOWxgOeahOiHquWinuaVtOaVsOOAglxuXHRcdCAgICDnsbvkvLzoh6rlop7kuLvplK7vvIhhdXRvIGluY3JlbWVudCBwcmltYXJ5IGtlee+8ieOAglxuXHRcdCovXG5cdFx0aW5jcmVtZW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBrZXkgPSAwXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oc3RlcCkge1xuXHRcdFx0XHRyZXR1cm4ga2V5ICs9ICgrc3RlcCB8fCAxKSAvLyBzdGVwP1xuXHRcdFx0fVxuXHRcdH0oKSxcblx0XHRpbmM6IGZ1bmN0aW9uKHN0ZXApIHtcblx0XHRcdHJldHVybiB0aGlzLmluY3JlbWVudChzdGVwKVxuXHRcdH1cblx0fVxuXG4vKioqLyB9LFxuLyogMjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBQYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuXHR2YXIgSGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHRcdFBhcnNlcjogUGFyc2VyLFxuXHRcdEhhbmRsZXI6IEhhbmRsZXJcblx0fVxuXG4vKioqLyB9LFxuLyogMjEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9udXlzb2Z0L3JlZ2V4cFxuXHQvLyBmb3JrZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vRm9yYmVzTGluZGVzYXkvcmVnZXhwXG5cblx0ZnVuY3Rpb24gcGFyc2Uobikge1xuXHQgICAgaWYgKFwic3RyaW5nXCIgIT0gdHlwZW9mIG4pIHtcblx0ICAgICAgICB2YXIgbCA9IG5ldyBUeXBlRXJyb3IoXCJUaGUgcmVnZXhwIHRvIHBhcnNlIG11c3QgYmUgcmVwcmVzZW50ZWQgYXMgYSBzdHJpbmcuXCIpO1xuXHQgICAgICAgIHRocm93IGw7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gaW5kZXggPSAxLCBjZ3MgPSB7fSwgcGFyc2VyLnBhcnNlKG4pO1xuXHR9XG5cblx0ZnVuY3Rpb24gVG9rZW4obikge1xuXHQgICAgdGhpcy50eXBlID0gbiwgdGhpcy5vZmZzZXQgPSBUb2tlbi5vZmZzZXQoKSwgdGhpcy50ZXh0ID0gVG9rZW4udGV4dCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gQWx0ZXJuYXRlKG4sIGwpIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJhbHRlcm5hdGVcIiksIHRoaXMubGVmdCA9IG4sIHRoaXMucmlnaHQgPSBsO1xuXHR9XG5cblx0ZnVuY3Rpb24gTWF0Y2gobikge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcIm1hdGNoXCIpLCB0aGlzLmJvZHkgPSBuLmZpbHRlcihCb29sZWFuKTtcblx0fVxuXG5cdGZ1bmN0aW9uIEdyb3VwKG4sIGwpIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgbiksIHRoaXMuYm9keSA9IGw7XG5cdH1cblxuXHRmdW5jdGlvbiBDYXB0dXJlR3JvdXAobikge1xuXHQgICAgR3JvdXAuY2FsbCh0aGlzLCBcImNhcHR1cmUtZ3JvdXBcIiksIHRoaXMuaW5kZXggPSBjZ3NbdGhpcy5vZmZzZXRdIHx8IChjZ3NbdGhpcy5vZmZzZXRdID0gaW5kZXgrKyksIFxuXHQgICAgdGhpcy5ib2R5ID0gbjtcblx0fVxuXG5cdGZ1bmN0aW9uIFF1YW50aWZpZWQobiwgbCkge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcInF1YW50aWZpZWRcIiksIHRoaXMuYm9keSA9IG4sIHRoaXMucXVhbnRpZmllciA9IGw7XG5cdH1cblxuXHRmdW5jdGlvbiBRdWFudGlmaWVyKG4sIGwpIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJxdWFudGlmaWVyXCIpLCB0aGlzLm1pbiA9IG4sIHRoaXMubWF4ID0gbCwgdGhpcy5ncmVlZHkgPSAhMDtcblx0fVxuXG5cdGZ1bmN0aW9uIENoYXJTZXQobiwgbCkge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcImNoYXJzZXRcIiksIHRoaXMuaW52ZXJ0ID0gbiwgdGhpcy5ib2R5ID0gbDtcblx0fVxuXG5cdGZ1bmN0aW9uIENoYXJhY3RlclJhbmdlKG4sIGwpIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJyYW5nZVwiKSwgdGhpcy5zdGFydCA9IG4sIHRoaXMuZW5kID0gbDtcblx0fVxuXG5cdGZ1bmN0aW9uIExpdGVyYWwobikge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcImxpdGVyYWxcIiksIHRoaXMuYm9keSA9IG4sIHRoaXMuZXNjYXBlZCA9IHRoaXMuYm9keSAhPSB0aGlzLnRleHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBVbmljb2RlKG4pIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJ1bmljb2RlXCIpLCB0aGlzLmNvZGUgPSBuLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBIZXgobikge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcImhleFwiKSwgdGhpcy5jb2RlID0gbi50b1VwcGVyQ2FzZSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gT2N0YWwobikge1xuXHQgICAgVG9rZW4uY2FsbCh0aGlzLCBcIm9jdGFsXCIpLCB0aGlzLmNvZGUgPSBuLnRvVXBwZXJDYXNlKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBCYWNrUmVmZXJlbmNlKG4pIHtcblx0ICAgIFRva2VuLmNhbGwodGhpcywgXCJiYWNrLXJlZmVyZW5jZVwiKSwgdGhpcy5jb2RlID0gbi50b1VwcGVyQ2FzZSgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gQ29udHJvbENoYXJhY3RlcihuKSB7XG5cdCAgICBUb2tlbi5jYWxsKHRoaXMsIFwiY29udHJvbC1jaGFyYWN0ZXJcIiksIHRoaXMuY29kZSA9IG4udG9VcHBlckNhc2UoKTtcblx0fVxuXG5cdHZhciBwYXJzZXIgPSBmdW5jdGlvbigpIHtcblx0ICAgIGZ1bmN0aW9uIG4obiwgbCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIHUoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IgPSBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB1LnByb3RvdHlwZSA9IGwucHJvdG90eXBlLCBuLnByb3RvdHlwZSA9IG5ldyB1KCk7XG5cdCAgICB9XG5cdCAgICBmdW5jdGlvbiBsKG4sIGwsIHUsIHQsIHIpIHtcblx0ICAgICAgICBmdW5jdGlvbiBlKG4sIGwpIHtcblx0ICAgICAgICAgICAgZnVuY3Rpb24gdShuKSB7XG5cdCAgICAgICAgICAgICAgICBmdW5jdGlvbiBsKG4pIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gbi5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG4ucmVwbGFjZSgvXFxcXC9nLCBcIlxcXFxcXFxcXCIpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXHgwOC9nLCBcIlxcXFxiXCIpLnJlcGxhY2UoL1xcdC9nLCBcIlxcXFx0XCIpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLnJlcGxhY2UoL1xcZi9nLCBcIlxcXFxmXCIpLnJlcGxhY2UoL1xcci9nLCBcIlxcXFxyXCIpLnJlcGxhY2UoL1tcXHgwMC1cXHgwN1xceDBCXFx4MEVcXHgwRl0vZywgZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlxcXFx4MFwiICsgbChuKTtcblx0ICAgICAgICAgICAgICAgIH0pLnJlcGxhY2UoL1tcXHgxMC1cXHgxRlxceDgwLVxceEZGXS9nLCBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXFxcXHhcIiArIGwobik7XG5cdCAgICAgICAgICAgICAgICB9KS5yZXBsYWNlKC9bXFx1MDE4MC1cXHUwRkZGXS9nLCBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXFxcXHUwXCIgKyBsKG4pO1xuXHQgICAgICAgICAgICAgICAgfSkucmVwbGFjZSgvW1xcdTEwODAtXFx1RkZGRl0vZywgZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlxcXFx1XCIgKyBsKG4pO1xuXHQgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHQsIHI7XG5cdCAgICAgICAgICAgIHN3aXRjaCAobi5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICBjYXNlIDA6XG5cdCAgICAgICAgICAgICAgICB0ID0gXCJlbmQgb2YgaW5wdXRcIjtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cdCAgICAgICAgICAgICAgY2FzZSAxOlxuXHQgICAgICAgICAgICAgICAgdCA9IG5bMF07XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblxuXHQgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICB0ID0gbi5zbGljZSgwLCAtMSkuam9pbihcIiwgXCIpICsgXCIgb3IgXCIgKyBuW24ubGVuZ3RoIC0gMV07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIHIgPSBsID8gJ1wiJyArIHUobCkgKyAnXCInIDogXCJlbmQgb2YgaW5wdXRcIiwgXCJFeHBlY3RlZCBcIiArIHQgKyBcIiBidXQgXCIgKyByICsgXCIgZm91bmQuXCI7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuZXhwZWN0ZWQgPSBuLCB0aGlzLmZvdW5kID0gbCwgdGhpcy5vZmZzZXQgPSB1LCB0aGlzLmxpbmUgPSB0LCB0aGlzLmNvbHVtbiA9IHIsIFxuXHQgICAgICAgIHRoaXMubmFtZSA9IFwiU3ludGF4RXJyb3JcIiwgdGhpcy5tZXNzYWdlID0gZShuLCBsKTtcblx0ICAgIH1cblx0ICAgIGZ1bmN0aW9uIHUobikge1xuXHQgICAgICAgIGZ1bmN0aW9uIHUoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuLnN1YnN0cmluZyhMdCwgcXQpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB0KCkge1xuXHQgICAgICAgICAgICByZXR1cm4gTHQ7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHIobCkge1xuXHQgICAgICAgICAgICBmdW5jdGlvbiB1KGwsIHUsIHQpIHtcblx0ICAgICAgICAgICAgICAgIHZhciByLCBlO1xuXHQgICAgICAgICAgICAgICAgZm9yIChyID0gdTsgdCA+IHI7IHIrKykgZSA9IG4uY2hhckF0KHIpLCBcIlxcblwiID09PSBlID8gKGwuc2VlbkNSIHx8IGwubGluZSsrLCBsLmNvbHVtbiA9IDEsIFxuXHQgICAgICAgICAgICAgICAgbC5zZWVuQ1IgPSAhMSkgOiBcIlxcclwiID09PSBlIHx8IFwiXFx1MjAyOFwiID09PSBlIHx8IFwiXFx1MjAyOVwiID09PSBlID8gKGwubGluZSsrLCBsLmNvbHVtbiA9IDEsIFxuXHQgICAgICAgICAgICAgICAgbC5zZWVuQ1IgPSAhMCkgOiAobC5jb2x1bW4rKywgbC5zZWVuQ1IgPSAhMSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIE10ICE9PSBsICYmIChNdCA+IGwgJiYgKE10ID0gMCwgRHQgPSB7XG5cdCAgICAgICAgICAgICAgICBsaW5lOiAxLFxuXHQgICAgICAgICAgICAgICAgY29sdW1uOiAxLFxuXHQgICAgICAgICAgICAgICAgc2VlbkNSOiAhMVxuXHQgICAgICAgICAgICB9KSwgdShEdCwgTXQsIGwpLCBNdCA9IGwpLCBEdDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gZShuKSB7XG5cdCAgICAgICAgICAgIEh0ID4gcXQgfHwgKHF0ID4gSHQgJiYgKEh0ID0gcXQsIE90ID0gW10pLCBPdC5wdXNoKG4pKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gbyhuKSB7XG5cdCAgICAgICAgICAgIHZhciBsID0gMDtcblx0ICAgICAgICAgICAgZm9yIChuLnNvcnQoKTsgbCA8IG4ubGVuZ3RoOyApIG5bbCAtIDFdID09PSBuW2xdID8gbi5zcGxpY2UobCwgMSkgOiBsKys7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGMoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByLCBvO1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCB1ID0gaSgpLCBudWxsICE9PSB1ID8gKHQgPSBxdCwgMTI0ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHIgPSBmbCwgXG5cdCAgICAgICAgICAgIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKHNsKSksIG51bGwgIT09IHIgPyAobyA9IGMoKSwgbnVsbCAhPT0gbyA/IChyID0gWyByLCBvIF0sIFxuXHQgICAgICAgICAgICB0ID0gcikgOiAocXQgPSB0LCB0ID0gaWwpKSA6IChxdCA9IHQsIHQgPSBpbCksIG51bGwgPT09IHQgJiYgKHQgPSBhbCksIG51bGwgIT09IHQgPyAoTHQgPSBsLCBcblx0ICAgICAgICAgICAgdSA9IGhsKHUsIHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gaSgpIHtcblx0ICAgICAgICAgICAgdmFyIG4sIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIGlmIChuID0gcXQsIGwgPSBmKCksIG51bGwgPT09IGwgJiYgKGwgPSBhbCksIG51bGwgIT09IGwpIGlmICh1ID0gcXQsIFd0KyssIHQgPSBkKCksIFxuXHQgICAgICAgICAgICBXdC0tLCBudWxsID09PSB0ID8gdSA9IGFsIDogKHF0ID0gdSwgdSA9IGlsKSwgbnVsbCAhPT0gdSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh0ID0gW10sIHIgPSBoKCksIG51bGwgPT09IHIgJiYgKHIgPSBhKCkpOyBudWxsICE9PSByOyApIHQucHVzaChyKSwgciA9IGgoKSwgXG5cdCAgICAgICAgICAgICAgICBudWxsID09PSByICYmIChyID0gYSgpKTtcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHQgPyAociA9IHMoKSwgbnVsbCA9PT0gciAmJiAociA9IGFsKSwgbnVsbCAhPT0gciA/IChMdCA9IG4sIGwgPSBkbChsLCB0LCByKSwgXG5cdCAgICAgICAgICAgICAgICBudWxsID09PSBsID8gKHF0ID0gbiwgbiA9IGwpIDogbiA9IGwpIDogKHF0ID0gbiwgbiA9IGlsKSkgOiAocXQgPSBuLCBuID0gaWwpO1xuXHQgICAgICAgICAgICB9IGVsc2UgcXQgPSBuLCBuID0gaWw7IGVsc2UgcXQgPSBuLCBuID0gaWw7XG5cdCAgICAgICAgICAgIHJldHVybiBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBhKCkge1xuXHQgICAgICAgICAgICB2YXIgbjtcblx0ICAgICAgICAgICAgcmV0dXJuIG4gPSB4KCksIG51bGwgPT09IG4gJiYgKG4gPSBRKCksIG51bGwgPT09IG4gJiYgKG4gPSBCKCkpKSwgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gZigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDk0ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBwbCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUodmwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IHdsKCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHMoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCAzNiA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gQWwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKENsKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBnbCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBoKCkge1xuXHQgICAgICAgICAgICB2YXIgbiwgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIG4gPSBxdCwgbCA9IGEoKSwgbnVsbCAhPT0gbCA/ICh1ID0gZCgpLCBudWxsICE9PSB1ID8gKEx0ID0gbiwgbCA9IGJsKGwsIHUpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbCA/IChxdCA9IG4sIG4gPSBsKSA6IG4gPSBsKSA6IChxdCA9IG4sIG4gPSBpbCkpIDogKHF0ID0gbiwgbiA9IGlsKSwgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gZCgpIHtcblx0ICAgICAgICAgICAgdmFyIG4sIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBXdCsrLCBuID0gcXQsIGwgPSBwKCksIG51bGwgIT09IGwgPyAodSA9IGsoKSwgbnVsbCA9PT0gdSAmJiAodSA9IGFsKSwgbnVsbCAhPT0gdSA/IChMdCA9IG4sIFxuXHQgICAgICAgICAgICBsID0gVGwobCwgdSksIG51bGwgPT09IGwgPyAocXQgPSBuLCBuID0gbCkgOiBuID0gbCkgOiAocXQgPSBuLCBuID0gaWwpKSA6IChxdCA9IG4sIFxuXHQgICAgICAgICAgICBuID0gaWwpLCBXdC0tLCBudWxsID09PSBuICYmIChsID0gbnVsbCwgMCA9PT0gV3QgJiYgZShrbCkpLCBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBwKCkge1xuXHQgICAgICAgICAgICB2YXIgbjtcblx0ICAgICAgICAgICAgcmV0dXJuIG4gPSB2KCksIG51bGwgPT09IG4gJiYgKG4gPSB3KCksIG51bGwgPT09IG4gJiYgKG4gPSBBKCksIG51bGwgPT09IG4gJiYgKG4gPSBDKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gZygpLCBudWxsID09PSBuICYmIChuID0gYigpKSkpKSksIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHYoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByLCBvLCBjO1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCAxMjMgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IHhsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh5bCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/ICh0ID0gVCgpLCBudWxsICE9PSB0ID8gKDQ0ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHIgPSBtbCwgcXQrKykgOiAociA9IG51bGwsIFxuXHQgICAgICAgICAgICAwID09PSBXdCAmJiBlKFJsKSksIG51bGwgIT09IHIgPyAobyA9IFQoKSwgbnVsbCAhPT0gbyA/ICgxMjUgPT09IG4uY2hhckNvZGVBdChxdCkgPyAoYyA9IEZsLCBcblx0ICAgICAgICAgICAgcXQrKykgOiAoYyA9IG51bGwsIDAgPT09IFd0ICYmIGUoUWwpKSwgbnVsbCAhPT0gYyA/IChMdCA9IGwsIHUgPSBTbCh0LCBvKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB3KCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgMTIzID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSB4bCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoeWwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAodCA9IFQoKSwgbnVsbCAhPT0gdCA/IChuLnN1YnN0cihxdCwgMikgPT09IFVsID8gKHIgPSBVbCwgcXQgKz0gMikgOiAociA9IG51bGwsIFxuXHQgICAgICAgICAgICAwID09PSBXdCAmJiBlKEVsKSksIG51bGwgIT09IHIgPyAoTHQgPSBsLCB1ID0gR2wodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEEoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCAxMjMgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IHhsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh5bCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/ICh0ID0gVCgpLCBudWxsICE9PSB0ID8gKDEyNSA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/IChyID0gRmwsIHF0KyspIDogKHIgPSBudWxsLCBcblx0ICAgICAgICAgICAgMCA9PT0gV3QgJiYgZShRbCkpLCBudWxsICE9PSByID8gKEx0ID0gbCwgdSA9IEJsKHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBDKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdTtcblx0ICAgICAgICAgICAgcmV0dXJuIGwgPSBxdCwgNDMgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodSA9IGpsLCBxdCsrKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSgkbCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gcWwoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gZygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDQyID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBMbCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoTWwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IERsKCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGIoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA2MyA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gSGwsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKE9sKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBXbCgpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBrKCkge1xuXHQgICAgICAgICAgICB2YXIgbDtcblx0ICAgICAgICAgICAgcmV0dXJuIDYzID09PSBuLmNoYXJDb2RlQXQocXQpID8gKGwgPSBIbCwgcXQrKykgOiAobCA9IG51bGwsIDAgPT09IFd0ICYmIGUoT2wpKSwgXG5cdCAgICAgICAgICAgIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFQoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0O1xuXHQgICAgICAgICAgICBpZiAobCA9IHF0LCB1ID0gW10sIHpsLnRlc3Qobi5jaGFyQXQocXQpKSA/ICh0ID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6ICh0ID0gbnVsbCwgXG5cdCAgICAgICAgICAgIDAgPT09IFd0ICYmIGUoSWwpKSwgbnVsbCAhPT0gdCkgZm9yICg7bnVsbCAhPT0gdDsgKSB1LnB1c2godCksIHpsLnRlc3Qobi5jaGFyQXQocXQpKSA/ICh0ID0gbi5jaGFyQXQocXQpLCBcblx0ICAgICAgICAgICAgcXQrKykgOiAodCA9IG51bGwsIDAgPT09IFd0ICYmIGUoSWwpKTsgZWxzZSB1ID0gaWw7XG5cdCAgICAgICAgICAgIHJldHVybiBudWxsICE9PSB1ICYmIChMdCA9IGwsIHUgPSBKbCh1KSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgXG5cdCAgICAgICAgICAgIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHgoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA0MCA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gS2wsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKE5sKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKHQgPSBSKCksIG51bGwgPT09IHQgJiYgKHQgPSBGKCksIG51bGwgPT09IHQgJiYgKHQgPSBtKCksIG51bGwgPT09IHQgJiYgKHQgPSB5KCkpKSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB0ID8gKDQxID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHIgPSBQbCwgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUoVmwpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHIgPyAoTHQgPSBsLCB1ID0gWGwodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIHkoKSB7XG5cdCAgICAgICAgICAgIHZhciBuLCBsO1xuXHQgICAgICAgICAgICByZXR1cm4gbiA9IHF0LCBsID0gYygpLCBudWxsICE9PSBsICYmIChMdCA9IG4sIGwgPSBZbChsKSksIG51bGwgPT09IGwgPyAocXQgPSBuLCBcblx0ICAgICAgICAgICAgbiA9IGwpIDogbiA9IGwsIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIG0oKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IFpsID8gKHUgPSBabCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoX2wpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAodCA9IGMoKSwgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSBudSh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFIoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IGx1ID8gKHUgPSBsdSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUodXUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAodCA9IGMoKSwgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSB0dSh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IHJ1ID8gKHUgPSBydSwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoZXUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAodCA9IGMoKSwgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSBvdSh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICBsID0gaWwpKSA6IChxdCA9IGwsIGwgPSBpbCksIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIFEoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByLCBvO1xuXHQgICAgICAgICAgICBpZiAoV3QrKywgbCA9IHF0LCA5MSA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gaXUsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKGF1KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1KSBpZiAoOTQgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodCA9IHBsLCBxdCsrKSA6ICh0ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh2bCkpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gdCAmJiAodCA9IGFsKSwgbnVsbCAhPT0gdCkge1xuXHQgICAgICAgICAgICAgICAgZm9yIChyID0gW10sIG8gPSBTKCksIG51bGwgPT09IG8gJiYgKG8gPSBVKCkpOyBudWxsICE9PSBvOyApIHIucHVzaChvKSwgbyA9IFMoKSwgXG5cdCAgICAgICAgICAgICAgICBudWxsID09PSBvICYmIChvID0gVSgpKTtcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHIgPyAoOTMgPT09IG4uY2hhckNvZGVBdChxdCkgPyAobyA9IGZ1LCBxdCsrKSA6IChvID0gbnVsbCwgMCA9PT0gV3QgJiYgZShzdSkpLCBcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IG8gPyAoTHQgPSBsLCB1ID0gaHUodCwgciksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHF0ID0gbCwgbCA9IGlsOyBlbHNlIHF0ID0gbCwgbCA9IGlsO1xuXHQgICAgICAgICAgICByZXR1cm4gV3QtLSwgbnVsbCA9PT0gbCAmJiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoY3UpKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gUygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIHJldHVybiBXdCsrLCBsID0gcXQsIHUgPSBVKCksIG51bGwgIT09IHUgPyAoNDUgPT09IG4uY2hhckNvZGVBdChxdCkgPyAodCA9IHB1LCBxdCsrKSA6ICh0ID0gbnVsbCwgXG5cdCAgICAgICAgICAgIDAgPT09IFd0ICYmIGUodnUpKSwgbnVsbCAhPT0gdCA/IChyID0gVSgpLCBudWxsICE9PSByID8gKEx0ID0gbCwgdSA9IHd1KHUsIHIpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBXdC0tLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbCAmJiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoZHUpKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gVSgpIHtcblx0ICAgICAgICAgICAgdmFyIG4sIGw7XG5cdCAgICAgICAgICAgIHJldHVybiBXdCsrLCBuID0gRygpLCBudWxsID09PSBuICYmIChuID0gRSgpKSwgV3QtLSwgbnVsbCA9PT0gbiAmJiAobCA9IG51bGwsIDAgPT09IFd0ICYmIGUoQXUpKSwgXG5cdCAgICAgICAgICAgIG47XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIEUoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCBDdS50ZXN0KG4uY2hhckF0KHF0KSkgPyAodSA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoZ3UpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IGJ1KHUpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBHKCkge1xuXHQgICAgICAgICAgICB2YXIgbjtcblx0ICAgICAgICAgICAgcmV0dXJuIG4gPSBMKCksIG51bGwgPT09IG4gJiYgKG4gPSBZKCksIG51bGwgPT09IG4gJiYgKG4gPSBIKCksIG51bGwgPT09IG4gJiYgKG4gPSBPKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gVygpLCBudWxsID09PSBuICYmIChuID0geigpLCBudWxsID09PSBuICYmIChuID0gSSgpLCBudWxsID09PSBuICYmIChuID0gSigpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IEsoKSwgbnVsbCA9PT0gbiAmJiAobiA9IE4oKSwgbnVsbCA9PT0gbiAmJiAobiA9IFAoKSwgbnVsbCA9PT0gbiAmJiAobiA9IFYoKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBYKCksIG51bGwgPT09IG4gJiYgKG4gPSBfKCksIG51bGwgPT09IG4gJiYgKG4gPSBubCgpLCBudWxsID09PSBuICYmIChuID0gbGwoKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSB1bCgpLCBudWxsID09PSBuICYmIChuID0gdGwoKSkpKSkpKSkpKSkpKSkpKSkpLCBuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBCKCkge1xuXHQgICAgICAgICAgICB2YXIgbjtcblx0ICAgICAgICAgICAgcmV0dXJuIG4gPSBqKCksIG51bGwgPT09IG4gJiYgKG4gPSBxKCksIG51bGwgPT09IG4gJiYgKG4gPSAkKCkpKSwgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gaigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDQ2ID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBrdSwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoVHUpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IHh1KCkpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUsIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uICQoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1O1xuXHQgICAgICAgICAgICByZXR1cm4gV3QrKywgbCA9IHF0LCBtdS50ZXN0KG4uY2hhckF0KHF0KSkgPyAodSA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAodSA9IG51bGwsIFxuXHQgICAgICAgICAgICAwID09PSBXdCAmJiBlKFJ1KSksIG51bGwgIT09IHUgJiYgKEx0ID0gbCwgdSA9IGJ1KHUpKSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1LCBcblx0ICAgICAgICAgICAgV3QtLSwgbnVsbCA9PT0gbCAmJiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoeXUpKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gcSgpIHtcblx0ICAgICAgICAgICAgdmFyIG47XG5cdCAgICAgICAgICAgIHJldHVybiBuID0gTSgpLCBudWxsID09PSBuICYmIChuID0gRCgpLCBudWxsID09PSBuICYmIChuID0gWSgpLCBudWxsID09PSBuICYmIChuID0gSCgpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IE8oKSwgbnVsbCA9PT0gbiAmJiAobiA9IFcoKSwgbnVsbCA9PT0gbiAmJiAobiA9IHooKSwgbnVsbCA9PT0gbiAmJiAobiA9IEkoKSwgXG5cdCAgICAgICAgICAgIG51bGwgPT09IG4gJiYgKG4gPSBKKCksIG51bGwgPT09IG4gJiYgKG4gPSBLKCksIG51bGwgPT09IG4gJiYgKG4gPSBOKCksIG51bGwgPT09IG4gJiYgKG4gPSBQKCksIFxuXHQgICAgICAgICAgICBudWxsID09PSBuICYmIChuID0gVigpLCBudWxsID09PSBuICYmIChuID0gWCgpLCBudWxsID09PSBuICYmIChuID0gWigpLCBudWxsID09PSBuICYmIChuID0gXygpLCBcblx0ICAgICAgICAgICAgbnVsbCA9PT0gbiAmJiAobiA9IG5sKCksIG51bGwgPT09IG4gJiYgKG4gPSBsbCgpLCBudWxsID09PSBuICYmIChuID0gdWwoKSwgbnVsbCA9PT0gbiAmJiAobiA9IHRsKCkpKSkpKSkpKSkpKSkpKSkpKSkpLCBcblx0ICAgICAgICAgICAgbjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gTCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gRnUgPyAodSA9IEZ1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShRdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gU3UoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gTSgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gRnUgPyAodSA9IEZ1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShRdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gVXUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gRCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gRXUgPyAodSA9IEV1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShHdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gQnUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gSCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0ganUgPyAodSA9IGp1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSgkdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gcXUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gTygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gTHUgPyAodSA9IEx1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShNdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gRHUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gVygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gSHUgPyAodSA9IEh1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShPdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gV3UoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24geigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0genUgPyAodSA9IHp1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShJdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gSnUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gSSgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gS3UgPyAodSA9IEt1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShOdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gUHUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gSigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gVnUgPyAodSA9IFZ1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShYdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gWXUoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gSygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gWnUgPyAodSA9IFp1LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShfdSkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gbnQoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gTigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gbHQgPyAodSA9IGx0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh1dCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gdHQoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gUCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gcnQgPyAodSA9IHJ0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShldCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gb3QoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gVigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gY3QgPyAodSA9IGN0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShpdCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gYXQoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gWCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gZnQgPyAodSA9IGZ0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShzdCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gaHQoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gWSgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQ7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gZHQgPyAodSA9IGR0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZShwdCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSA/IChuLmxlbmd0aCA+IHF0ID8gKHQgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHQgPSBudWxsLCAwID09PSBXdCAmJiBlKHZ0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IHd0KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gWigpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQ7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIDkyID09PSBuLmNoYXJDb2RlQXQocXQpID8gKHUgPSBBdCwgcXQrKykgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoQ3QpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUgPyAoZ3QudGVzdChuLmNoYXJBdChxdCkpID8gKHQgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHQgPSBudWxsLCAwID09PSBXdCAmJiBlKGJ0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IGt0KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgIGwgPSBpbCkpIDogKHF0ID0gbCwgbCA9IGlsKSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gXygpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHUsIHQsIHI7XG5cdCAgICAgICAgICAgIGlmIChsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gVHQgPyAodSA9IFR0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh4dCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHQgPSBbXSwgeXQudGVzdChuLmNoYXJBdChxdCkpID8gKHIgPSBuLmNoYXJBdChxdCksIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKG10KSksIFxuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gcikgZm9yICg7bnVsbCAhPT0gcjsgKSB0LnB1c2gociksIHl0LnRlc3Qobi5jaGFyQXQocXQpKSA/IChyID0gbi5jaGFyQXQocXQpLCBcblx0ICAgICAgICAgICAgICAgIHF0KyspIDogKHIgPSBudWxsLCAwID09PSBXdCAmJiBlKG10KSk7IGVsc2UgdCA9IGlsO1xuXHQgICAgICAgICAgICAgICAgbnVsbCAhPT0gdCA/IChMdCA9IGwsIHUgPSBSdCh0KSwgbnVsbCA9PT0gdSA/IChxdCA9IGwsIGwgPSB1KSA6IGwgPSB1KSA6IChxdCA9IGwsIFxuXHQgICAgICAgICAgICAgICAgbCA9IGlsKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHF0ID0gbCwgbCA9IGlsO1xuXHQgICAgICAgICAgICByZXR1cm4gbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gbmwoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0LCByO1xuXHQgICAgICAgICAgICBpZiAobCA9IHF0LCBuLnN1YnN0cihxdCwgMikgPT09IEZ0ID8gKHUgPSBGdCwgcXQgKz0gMikgOiAodSA9IG51bGwsIDAgPT09IFd0ICYmIGUoUXQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHUpIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0ID0gW10sIFN0LnRlc3Qobi5jaGFyQXQocXQpKSA/IChyID0gbi5jaGFyQXQocXQpLCBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShVdCkpLCBcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHIpIGZvciAoO251bGwgIT09IHI7ICkgdC5wdXNoKHIpLCBTdC50ZXN0KG4uY2hhckF0KHF0KSkgPyAociA9IG4uY2hhckF0KHF0KSwgXG5cdCAgICAgICAgICAgICAgICBxdCsrKSA6IChyID0gbnVsbCwgMCA9PT0gV3QgJiYgZShVdCkpOyBlbHNlIHQgPSBpbDtcblx0ICAgICAgICAgICAgICAgIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0gRXQodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgICAgIGwgPSBpbCk7XG5cdCAgICAgICAgICAgIH0gZWxzZSBxdCA9IGwsIGwgPSBpbDtcblx0ICAgICAgICAgICAgcmV0dXJuIGw7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGxsKCkge1xuXHQgICAgICAgICAgICB2YXIgbCwgdSwgdCwgcjtcblx0ICAgICAgICAgICAgaWYgKGwgPSBxdCwgbi5zdWJzdHIocXQsIDIpID09PSBHdCA/ICh1ID0gR3QsIHF0ICs9IDIpIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKEJ0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodCA9IFtdLCBTdC50ZXN0KG4uY2hhckF0KHF0KSkgPyAociA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUoVXQpKSwgXG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSByKSBmb3IgKDtudWxsICE9PSByOyApIHQucHVzaChyKSwgU3QudGVzdChuLmNoYXJBdChxdCkpID8gKHIgPSBuLmNoYXJBdChxdCksIFxuXHQgICAgICAgICAgICAgICAgcXQrKykgOiAociA9IG51bGwsIDAgPT09IFd0ICYmIGUoVXQpKTsgZWxzZSB0ID0gaWw7XG5cdCAgICAgICAgICAgICAgICBudWxsICE9PSB0ID8gKEx0ID0gbCwgdSA9IGp0KHQpLCBudWxsID09PSB1ID8gKHF0ID0gbCwgbCA9IHUpIDogbCA9IHUpIDogKHF0ID0gbCwgXG5cdCAgICAgICAgICAgICAgICBsID0gaWwpO1xuXHQgICAgICAgICAgICB9IGVsc2UgcXQgPSBsLCBsID0gaWw7XG5cdCAgICAgICAgICAgIHJldHVybiBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiB1bCgpIHtcblx0ICAgICAgICAgICAgdmFyIGwsIHU7XG5cdCAgICAgICAgICAgIHJldHVybiBsID0gcXQsIG4uc3Vic3RyKHF0LCAyKSA9PT0gVHQgPyAodSA9IFR0LCBxdCArPSAyKSA6ICh1ID0gbnVsbCwgMCA9PT0gV3QgJiYgZSh4dCkpLCBcblx0ICAgICAgICAgICAgbnVsbCAhPT0gdSAmJiAoTHQgPSBsLCB1ID0gJHQoKSksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSwgbDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnVuY3Rpb24gdGwoKSB7XG5cdCAgICAgICAgICAgIHZhciBsLCB1LCB0O1xuXHQgICAgICAgICAgICByZXR1cm4gbCA9IHF0LCA5MiA9PT0gbi5jaGFyQ29kZUF0KHF0KSA/ICh1ID0gQXQsIHF0KyspIDogKHUgPSBudWxsLCAwID09PSBXdCAmJiBlKEN0KSksIFxuXHQgICAgICAgICAgICBudWxsICE9PSB1ID8gKG4ubGVuZ3RoID4gcXQgPyAodCA9IG4uY2hhckF0KHF0KSwgcXQrKykgOiAodCA9IG51bGwsIDAgPT09IFd0ICYmIGUodnQpKSwgXG5cdCAgICAgICAgICAgIG51bGwgIT09IHQgPyAoTHQgPSBsLCB1ID0gYnUodCksIG51bGwgPT09IHUgPyAocXQgPSBsLCBsID0gdSkgOiBsID0gdSkgOiAocXQgPSBsLCBcblx0ICAgICAgICAgICAgbCA9IGlsKSkgOiAocXQgPSBsLCBsID0gaWwpLCBsO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcmwsIGVsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB7fSwgb2wgPSB7XG5cdCAgICAgICAgICAgIHJlZ2V4cDogY1xuXHQgICAgICAgIH0sIGNsID0gYywgaWwgPSBudWxsLCBhbCA9IFwiXCIsIGZsID0gXCJ8XCIsIHNsID0gJ1wifFwiJywgaGwgPSBmdW5jdGlvbihuLCBsKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBsID8gbmV3IEFsdGVybmF0ZShuLCBsWzFdKSA6IG47XG5cdCAgICAgICAgfSwgZGwgPSBmdW5jdGlvbihuLCBsLCB1KSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgTWF0Y2goWyBuIF0uY29uY2F0KGwpLmNvbmNhdChbIHUgXSkpO1xuXHQgICAgICAgIH0sIHBsID0gXCJeXCIsIHZsID0gJ1wiXlwiJywgd2wgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcInN0YXJ0XCIpO1xuXHQgICAgICAgIH0sIEFsID0gXCIkXCIsIENsID0gJ1wiJFwiJywgZ2wgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcImVuZFwiKTtcblx0ICAgICAgICB9LCBibCA9IGZ1bmN0aW9uKG4sIGwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWFudGlmaWVkKG4sIGwpO1xuXHQgICAgICAgIH0sIGtsID0gXCJRdWFudGlmaWVyXCIsIFRsID0gZnVuY3Rpb24obiwgbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbCAmJiAobi5ncmVlZHkgPSAhMSksIG47XG5cdCAgICAgICAgfSwgeGwgPSBcIntcIiwgeWwgPSAnXCJ7XCInLCBtbCA9IFwiLFwiLCBSbCA9ICdcIixcIicsIEZsID0gXCJ9XCIsIFFsID0gJ1wifVwiJywgU2wgPSBmdW5jdGlvbihuLCBsKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUXVhbnRpZmllcihuLCBsKTtcblx0ICAgICAgICB9LCBVbCA9IFwiLH1cIiwgRWwgPSAnXCIsfVwiJywgR2wgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUXVhbnRpZmllcihuLCAxLzApO1xuXHQgICAgICAgIH0sIEJsID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFF1YW50aWZpZXIobiwgbik7XG5cdCAgICAgICAgfSwgamwgPSBcIitcIiwgJGwgPSAnXCIrXCInLCBxbCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFF1YW50aWZpZXIoMSwgMS8wKTtcblx0ICAgICAgICB9LCBMbCA9IFwiKlwiLCBNbCA9ICdcIipcIicsIERsID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgUXVhbnRpZmllcigwLCAxLzApO1xuXHQgICAgICAgIH0sIEhsID0gXCI/XCIsIE9sID0gJ1wiP1wiJywgV2wgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWFudGlmaWVyKDAsIDEpO1xuXHQgICAgICAgIH0sIHpsID0gL15bMC05XS8sIElsID0gXCJbMC05XVwiLCBKbCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuICtuLmpvaW4oXCJcIik7XG5cdCAgICAgICAgfSwgS2wgPSBcIihcIiwgTmwgPSAnXCIoXCInLCBQbCA9IFwiKVwiLCBWbCA9ICdcIilcIicsIFhsID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbjtcblx0ICAgICAgICB9LCBZbCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBDYXB0dXJlR3JvdXAobik7XG5cdCAgICAgICAgfSwgWmwgPSBcIj86XCIsIF9sID0gJ1wiPzpcIicsIG51ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IEdyb3VwKFwibm9uLWNhcHR1cmUtZ3JvdXBcIiwgbik7XG5cdCAgICAgICAgfSwgbHUgPSBcIj89XCIsIHV1ID0gJ1wiPz1cIicsIHR1ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IEdyb3VwKFwicG9zaXRpdmUtbG9va2FoZWFkXCIsIG4pO1xuXHQgICAgICAgIH0sIHJ1ID0gXCI/IVwiLCBldSA9ICdcIj8hXCInLCBvdSA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBHcm91cChcIm5lZ2F0aXZlLWxvb2thaGVhZFwiLCBuKTtcblx0ICAgICAgICB9LCBjdSA9IFwiQ2hhcmFjdGVyU2V0XCIsIGl1ID0gXCJbXCIsIGF1ID0gJ1wiW1wiJywgZnUgPSBcIl1cIiwgc3UgPSAnXCJdXCInLCBodSA9IGZ1bmN0aW9uKG4sIGwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGFyU2V0KCEhbiwgbCk7XG5cdCAgICAgICAgfSwgZHUgPSBcIkNoYXJhY3RlclJhbmdlXCIsIHB1ID0gXCItXCIsIHZ1ID0gJ1wiLVwiJywgd3UgPSBmdW5jdGlvbihuLCBsKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgQ2hhcmFjdGVyUmFuZ2UobiwgbCk7XG5cdCAgICAgICAgfSwgQXUgPSBcIkNoYXJhY3RlclwiLCBDdSA9IC9eW15cXFxcXFxdXS8sIGd1ID0gXCJbXlxcXFxcXFxcXFxcXF1dXCIsIGJ1ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IExpdGVyYWwobik7XG5cdCAgICAgICAgfSwga3UgPSBcIi5cIiwgVHUgPSAnXCIuXCInLCB4dSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwiYW55LWNoYXJhY3RlclwiKTtcblx0ICAgICAgICB9LCB5dSA9IFwiTGl0ZXJhbFwiLCBtdSA9IC9eW158XFxcXFxcLy5bKCk/KyokXFxeXS8sIFJ1ID0gXCJbXnxcXFxcXFxcXFxcXFwvLlsoKT8rKiRcXFxcXl1cIiwgRnUgPSBcIlxcXFxiXCIsIFF1ID0gJ1wiXFxcXFxcXFxiXCInLCBTdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwiYmFja3NwYWNlXCIpO1xuXHQgICAgICAgIH0sIFV1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJ3b3JkLWJvdW5kYXJ5XCIpO1xuXHQgICAgICAgIH0sIEV1ID0gXCJcXFxcQlwiLCBHdSA9ICdcIlxcXFxcXFxcQlwiJywgQnUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIm5vbi13b3JkLWJvdW5kYXJ5XCIpO1xuXHQgICAgICAgIH0sIGp1ID0gXCJcXFxcZFwiLCAkdSA9ICdcIlxcXFxcXFxcZFwiJywgcXUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcImRpZ2l0XCIpO1xuXHQgICAgICAgIH0sIEx1ID0gXCJcXFxcRFwiLCBNdSA9ICdcIlxcXFxcXFxcRFwiJywgRHUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIm5vbi1kaWdpdFwiKTtcblx0ICAgICAgICB9LCBIdSA9IFwiXFxcXGZcIiwgT3UgPSAnXCJcXFxcXFxcXGZcIicsIFd1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJmb3JtLWZlZWRcIik7XG5cdCAgICAgICAgfSwgenUgPSBcIlxcXFxuXCIsIEl1ID0gJ1wiXFxcXFxcXFxuXCInLCBKdSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwibGluZS1mZWVkXCIpO1xuXHQgICAgICAgIH0sIEt1ID0gXCJcXFxcclwiLCBOdSA9ICdcIlxcXFxcXFxcclwiJywgUHUgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcImNhcnJpYWdlLXJldHVyblwiKTtcblx0ICAgICAgICB9LCBWdSA9IFwiXFxcXHNcIiwgWHUgPSAnXCJcXFxcXFxcXHNcIicsIFl1ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJ3aGl0ZS1zcGFjZVwiKTtcblx0ICAgICAgICB9LCBadSA9IFwiXFxcXFNcIiwgX3UgPSAnXCJcXFxcXFxcXFNcIicsIG50ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJub24td2hpdGUtc3BhY2VcIik7XG5cdCAgICAgICAgfSwgbHQgPSBcIlxcXFx0XCIsIHV0ID0gJ1wiXFxcXFxcXFx0XCInLCB0dCA9IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFRva2VuKFwidGFiXCIpO1xuXHQgICAgICAgIH0sIHJ0ID0gXCJcXFxcdlwiLCBldCA9ICdcIlxcXFxcXFxcdlwiJywgb3QgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcInZlcnRpY2FsLXRhYlwiKTtcblx0ICAgICAgICB9LCBjdCA9IFwiXFxcXHdcIiwgaXQgPSAnXCJcXFxcXFxcXHdcIicsIGF0ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJ3b3JkXCIpO1xuXHQgICAgICAgIH0sIGZ0ID0gXCJcXFxcV1wiLCBzdCA9ICdcIlxcXFxcXFxcV1wiJywgaHQgPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBUb2tlbihcIm5vbi13b3JkXCIpO1xuXHQgICAgICAgIH0sIGR0ID0gXCJcXFxcY1wiLCBwdCA9ICdcIlxcXFxcXFxcY1wiJywgdnQgPSBcImFueSBjaGFyYWN0ZXJcIiwgd3QgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJvbENoYXJhY3RlcihuKTtcblx0ICAgICAgICB9LCBBdCA9IFwiXFxcXFwiLCBDdCA9ICdcIlxcXFxcXFxcXCInLCBndCA9IC9eWzEtOV0vLCBidCA9IFwiWzEtOV1cIiwga3QgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgQmFja1JlZmVyZW5jZShuKTtcblx0ICAgICAgICB9LCBUdCA9IFwiXFxcXDBcIiwgeHQgPSAnXCJcXFxcXFxcXDBcIicsIHl0ID0gL15bMC03XS8sIG10ID0gXCJbMC03XVwiLCBSdCA9IGZ1bmN0aW9uKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBPY3RhbChuLmpvaW4oXCJcIikpO1xuXHQgICAgICAgIH0sIEZ0ID0gXCJcXFxceFwiLCBRdCA9ICdcIlxcXFxcXFxceFwiJywgU3QgPSAvXlswLTlhLWZBLUZdLywgVXQgPSBcIlswLTlhLWZBLUZdXCIsIEV0ID0gZnVuY3Rpb24obikge1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IEhleChuLmpvaW4oXCJcIikpO1xuXHQgICAgICAgIH0sIEd0ID0gXCJcXFxcdVwiLCBCdCA9ICdcIlxcXFxcXFxcdVwiJywganQgPSBmdW5jdGlvbihuKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVW5pY29kZShuLmpvaW4oXCJcIikpO1xuXHQgICAgICAgIH0sICR0ID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4oXCJudWxsLWNoYXJhY3RlclwiKTtcblx0ICAgICAgICB9LCBxdCA9IDAsIEx0ID0gMCwgTXQgPSAwLCBEdCA9IHtcblx0ICAgICAgICAgICAgbGluZTogMSxcblx0ICAgICAgICAgICAgY29sdW1uOiAxLFxuXHQgICAgICAgICAgICBzZWVuQ1I6ICExXG5cdCAgICAgICAgfSwgSHQgPSAwLCBPdCA9IFtdLCBXdCA9IDA7XG5cdCAgICAgICAgaWYgKFwic3RhcnRSdWxlXCIgaW4gZWwpIHtcblx0ICAgICAgICAgICAgaWYgKCEoZWwuc3RhcnRSdWxlIGluIG9sKSkgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc3RhcnQgcGFyc2luZyBmcm9tIHJ1bGUgXFxcIlwiICsgZWwuc3RhcnRSdWxlICsgJ1wiLicpO1xuXHQgICAgICAgICAgICBjbCA9IG9sW2VsLnN0YXJ0UnVsZV07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChUb2tlbi5vZmZzZXQgPSB0LCBUb2tlbi50ZXh0ID0gdSwgcmwgPSBjbCgpLCBudWxsICE9PSBybCAmJiBxdCA9PT0gbi5sZW5ndGgpIHJldHVybiBybDtcblx0ICAgICAgICB0aHJvdyBvKE90KSwgTHQgPSBNYXRoLm1heChxdCwgSHQpLCBuZXcgbChPdCwgTHQgPCBuLmxlbmd0aCA/IG4uY2hhckF0KEx0KSA6IG51bGwsIEx0LCByKEx0KS5saW5lLCByKEx0KS5jb2x1bW4pO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIG4obCwgRXJyb3IpLCB7XG5cdCAgICAgICAgU3ludGF4RXJyb3I6IGwsXG5cdCAgICAgICAgcGFyc2U6IHVcblx0ICAgIH07XG5cdH0oKSwgaW5kZXggPSAxLCBjZ3MgPSB7fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHBhcnNlclxuXG4vKioqLyB9LFxuLyogMjIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAgICAjIyBSZWdFeHAgSGFuZGxlclxuXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vRm9yYmVzTGluZGVzYXkvcmVnZXhwXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vZG1hamRhL3BlZ2pzXG5cdCAgICBodHRwOi8vd3d3LnJlZ2V4cGVyLmNvbS9cblxuXHQgICAg5q+P5Liq6IqC54K555qE57uT5p6EXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICB0eXBlOiAnJyxcblx0ICAgICAgICAgICAgb2Zmc2V0OiBudW1iZXIsXG5cdCAgICAgICAgICAgIHRleHQ6ICcnLFxuXHQgICAgICAgICAgICBib2R5OiB7fSxcblx0ICAgICAgICAgICAgZXNjYXBlZDogdHJ1ZS9mYWxzZVxuXHQgICAgICAgIH1cblxuXHQgICAgdHlwZSDlj6/pgInlgLxcblx0ICAgICAgICBhbHRlcm5hdGUgICAgICAgICAgICAgfCAgICAgICAgIOmAieaLqVxuXHQgICAgICAgIG1hdGNoICAgICAgICAgICAgICAgICDljLnphY1cblx0ICAgICAgICBjYXB0dXJlLWdyb3VwICAgICAgICAgKCkgICAgICAgIOaNleiOt+e7hFxuXHQgICAgICAgIG5vbi1jYXB0dXJlLWdyb3VwICAgICAoPzouLi4pICAg6Z2e5o2V6I6357uEXG5cdCAgICAgICAgcG9zaXRpdmUtbG9va2FoZWFkICAgICg/PXApICAgICDpm7blrr3mraPlkJHlhYjooYzmlq3oqIBcblx0ICAgICAgICBuZWdhdGl2ZS1sb29rYWhlYWQgICAgKD8hcCkgICAgIOmbtuWuvei0n+WQkeWFiOihjOaWreiogFxuXHQgICAgICAgIHF1YW50aWZpZWQgICAgICAgICAgICBhKiAgICAgICAg6YeN5aSN6IqC54K5XG5cdCAgICAgICAgcXVhbnRpZmllciAgICAgICAgICAgICogICAgICAgICDph4/or41cblx0ICAgICAgICBjaGFyc2V0ICAgICAgICAgICAgICAgW10gICAgICAgIOWtl+espumbhlxuXHQgICAgICAgIHJhbmdlICAgICAgICAgICAgICAgICB7bSwgbn0gICAg6IyD5Zu0XG5cdCAgICAgICAgbGl0ZXJhbCAgICAgICAgICAgICAgIGEgICAgICAgICDnm7TmjqXph4/lrZfnrKZcblx0ICAgICAgICB1bmljb2RlICAgICAgICAgICAgICAgXFx1eHh4eCAgICBVbmljb2RlXG5cdCAgICAgICAgaGV4ICAgICAgICAgICAgICAgICAgIFxceCAgICAgICAg5Y2B5YWt6L+b5Yi2XG5cdCAgICAgICAgb2N0YWwgICAgICAgICAgICAgICAgIOWFq+i/m+WItlxuXHQgICAgICAgIGJhY2stcmVmZXJlbmNlICAgICAgICBcXG4gICAgICAgIOWPjeWQkeW8leeUqFxuXHQgICAgICAgIGNvbnRyb2wtY2hhcmFjdGVyICAgICBcXGNYICAgICAgIOaOp+WItuWtl+esplxuXG5cdCAgICAgICAgLy8gVG9rZW5cblx0ICAgICAgICBzdGFydCAgICAgICAgICAgICAgIF4gICAgICAg5byA5aS0XG5cdCAgICAgICAgZW5kICAgICAgICAgICAgICAgICAkICAgICAgIOe7k+WwvlxuXHQgICAgICAgIGFueS1jaGFyYWN0ZXIgICAgICAgLiAgICAgICDku7vmhI/lrZfnrKZcblx0ICAgICAgICBiYWNrc3BhY2UgICAgICAgICAgIFtcXGJdICAgIOmAgOagvOebtOaOpemHj1xuXHQgICAgICAgIHdvcmQtYm91bmRhcnkgICAgICAgXFxiICAgICAg5Y2V6K+N6L6555WMXG5cdCAgICAgICAgbm9uLXdvcmQtYm91bmRhcnkgICBcXEIgICAgICDpnZ7ljZXor43ovrnnlYxcblx0ICAgICAgICBkaWdpdCAgICAgICAgICAgICAgIFxcZCAgICAgIEFTQ0lJIOaVsOWtl++8jFswLTldXG5cdCAgICAgICAgbm9uLWRpZ2l0ICAgICAgICAgICBcXEQgICAgICDpnZ4gQVNDSUkg5pWw5a2X77yMW14wLTldXG5cdCAgICAgICAgZm9ybS1mZWVkICAgICAgICAgICBcXGYgICAgICDmjaLpobXnrKZcblx0ICAgICAgICBsaW5lLWZlZWQgICAgICAgICAgIFxcbiAgICAgIOaNouihjOesplxuXHQgICAgICAgIGNhcnJpYWdlLXJldHVybiAgICAgXFxyICAgICAg5Zue6L2m56ymXG5cdCAgICAgICAgd2hpdGUtc3BhY2UgICAgICAgICBcXHMgICAgICDnqbrnmb3nrKZcblx0ICAgICAgICBub24td2hpdGUtc3BhY2UgICAgIFxcUyAgICAgIOmdnuepuueZveesplxuXHQgICAgICAgIHRhYiAgICAgICAgICAgICAgICAgXFx0ICAgICAg5Yi26KGo56ymXG5cdCAgICAgICAgdmVydGljYWwtdGFiICAgICAgICBcXHYgICAgICDlnoLnm7TliLbooajnrKZcblx0ICAgICAgICB3b3JkICAgICAgICAgICAgICAgIFxcdyAgICAgIEFTQ0lJIOWtl+espu+8jFthLXpBLVowLTldXG5cdCAgICAgICAgbm9uLXdvcmQgICAgICAgICAgICBcXFcgICAgICDpnZ4gQVNDSUkg5a2X56ym77yMW15hLXpBLVowLTldXG5cdCAgICAgICAgbnVsbC1jaGFyYWN0ZXIgICAgICBcXG8gICAgICBOVUwg5a2X56ymXG5cdCAqL1xuXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXHR2YXIgUmFuZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KVxuXHQgICAgLypcblx0ICAgICAgICBcblx0ICAgICovXG5cdHZhciBIYW5kbGVyID0ge1xuXHQgICAgZXh0ZW5kOiBVdGlsLmV4dGVuZFxuXHR9XG5cblx0Ly8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BU0NJSSNBU0NJSV9wcmludGFibGVfY29kZV9jaGFydFxuXHQvKnZhciBBU0NJSV9DT05UUk9MX0NPREVfQ0hBUlQgPSB7XG5cdCAgICAnQCc6IFsnXFx1MDAwMCddLFxuXHQgICAgQTogWydcXHUwMDAxJ10sXG5cdCAgICBCOiBbJ1xcdTAwMDInXSxcblx0ICAgIEM6IFsnXFx1MDAwMyddLFxuXHQgICAgRDogWydcXHUwMDA0J10sXG5cdCAgICBFOiBbJ1xcdTAwMDUnXSxcblx0ICAgIEY6IFsnXFx1MDAwNiddLFxuXHQgICAgRzogWydcXHUwMDA3JywgJ1xcYSddLFxuXHQgICAgSDogWydcXHUwMDA4JywgJ1xcYiddLFxuXHQgICAgSTogWydcXHUwMDA5JywgJ1xcdCddLFxuXHQgICAgSjogWydcXHUwMDBBJywgJ1xcbiddLFxuXHQgICAgSzogWydcXHUwMDBCJywgJ1xcdiddLFxuXHQgICAgTDogWydcXHUwMDBDJywgJ1xcZiddLFxuXHQgICAgTTogWydcXHUwMDBEJywgJ1xcciddLFxuXHQgICAgTjogWydcXHUwMDBFJ10sXG5cdCAgICBPOiBbJ1xcdTAwMEYnXSxcblx0ICAgIFA6IFsnXFx1MDAxMCddLFxuXHQgICAgUTogWydcXHUwMDExJ10sXG5cdCAgICBSOiBbJ1xcdTAwMTInXSxcblx0ICAgIFM6IFsnXFx1MDAxMyddLFxuXHQgICAgVDogWydcXHUwMDE0J10sXG5cdCAgICBVOiBbJ1xcdTAwMTUnXSxcblx0ICAgIFY6IFsnXFx1MDAxNiddLFxuXHQgICAgVzogWydcXHUwMDE3J10sXG5cdCAgICBYOiBbJ1xcdTAwMTgnXSxcblx0ICAgIFk6IFsnXFx1MDAxOSddLFxuXHQgICAgWjogWydcXHUwMDFBJ10sXG5cdCAgICAnWyc6IFsnXFx1MDAxQicsICdcXGUnXSxcblx0ICAgICdcXFxcJzogWydcXHUwMDFDJ10sXG5cdCAgICAnXSc6IFsnXFx1MDAxRCddLFxuXHQgICAgJ14nOiBbJ1xcdTAwMUUnXSxcblx0ICAgICdfJzogWydcXHUwMDFGJ11cblx0fSovXG5cblx0Ly8gQVNDSUkgcHJpbnRhYmxlIGNvZGUgY2hhcnRcblx0Ly8gdmFyIExPV0VSID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXHQvLyB2YXIgVVBQRVIgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonXG5cdC8vIHZhciBOVU1CRVIgPSAnMDEyMzQ1Njc4OSdcblx0Ly8gdmFyIFNZTUJPTCA9ICcgIVwiIyQlJlxcJygpKissLS4vJyArICc6Ozw9Pj9AJyArICdbXFxcXF1eX2AnICsgJ3t8fX4nXG5cdHZhciBMT1dFUiA9IGFzY2lpKDk3LCAxMjIpXG5cdHZhciBVUFBFUiA9IGFzY2lpKDY1LCA5MClcblx0dmFyIE5VTUJFUiA9IGFzY2lpKDQ4LCA1Nylcblx0dmFyIE9USEVSID0gYXNjaWkoMzIsIDQ3KSArIGFzY2lpKDU4LCA2NCkgKyBhc2NpaSg5MSwgOTYpICsgYXNjaWkoMTIzLCAxMjYpIC8vIOaOkumZpCA5NSBfIGFzY2lpKDkxLCA5NCkgKyBhc2NpaSg5NiwgOTYpXG5cdHZhciBQUklOVEFCTEUgPSBhc2NpaSgzMiwgMTI2KVxuXHR2YXIgU1BBQ0UgPSAnIFxcZlxcblxcclxcdFxcdlxcdTAwQTBcXHUyMDI4XFx1MjAyOSdcblx0dmFyIENIQVJBQ1RFUl9DTEFTU0VTID0ge1xuXHQgICAgJ1xcXFx3JzogTE9XRVIgKyBVUFBFUiArIE5VTUJFUiArICdfJywgLy8gYXNjaWkoOTUsIDk1KVxuXHQgICAgJ1xcXFxXJzogT1RIRVIucmVwbGFjZSgnXycsICcnKSxcblx0ICAgICdcXFxccyc6IFNQQUNFLFxuXHQgICAgJ1xcXFxTJzogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFBSSU5UQUJMRVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU1BBQ0UubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoU1BBQ0VbaV0sICcnKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9KCksXG5cdCAgICAnXFxcXGQnOiBOVU1CRVIsXG5cdCAgICAnXFxcXEQnOiBMT1dFUiArIFVQUEVSICsgT1RIRVJcblx0fVxuXG5cdGZ1bmN0aW9uIGFzY2lpKGZyb20sIHRvKSB7XG5cdCAgICB2YXIgcmVzdWx0ID0gJydcblx0ICAgIGZvciAodmFyIGkgPSBmcm9tOyBpIDw9IHRvOyBpKyspIHtcblx0ICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShpKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0Ly8gdmFyIGFzdCA9IFJlZ0V4cFBhcnNlci5wYXJzZShyZWdleHAuc291cmNlKVxuXHRIYW5kbGVyLmdlbiA9IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgIGNhY2hlID0gY2FjaGUgfHwge1xuXHQgICAgICAgIGd1aWQ6IDFcblx0ICAgIH1cblx0ICAgIHJldHVybiBIYW5kbGVyW25vZGUudHlwZV0gPyBIYW5kbGVyW25vZGUudHlwZV0obm9kZSwgcmVzdWx0LCBjYWNoZSkgOlxuXHQgICAgICAgIEhhbmRsZXIudG9rZW4obm9kZSwgcmVzdWx0LCBjYWNoZSlcblx0fVxuXG5cdEhhbmRsZXIuZXh0ZW5kKHtcblx0ICAgIC8qIGpzaGludCB1bnVzZWQ6ZmFsc2UgKi9cblx0ICAgIHRva2VuOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuXHQgICAgICAgICAgICBjYXNlICdlbmQnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuICcnXG5cdCAgICAgICAgICAgIGNhc2UgJ2FueS1jaGFyYWN0ZXInOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5jaGFyYWN0ZXIoKVxuXHQgICAgICAgICAgICBjYXNlICdiYWNrc3BhY2UnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuICcnXG5cdCAgICAgICAgICAgIGNhc2UgJ3dvcmQtYm91bmRhcnknOiAvLyBUT0RPXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gJydcblx0ICAgICAgICAgICAgY2FzZSAnbm9uLXdvcmQtYm91bmRhcnknOiAvLyBUT0RPXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICdkaWdpdCc6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG5cdCAgICAgICAgICAgICAgICAgICAgTlVNQkVSLnNwbGl0KCcnKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICBjYXNlICdub24tZGlnaXQnOlxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuXHQgICAgICAgICAgICAgICAgICAgIChMT1dFUiArIFVQUEVSICsgT1RIRVIpLnNwbGl0KCcnKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICBjYXNlICdmb3JtLWZlZWQnOlxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAnbGluZS1mZWVkJzpcblx0ICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmJvZHkgfHwgbm9kZS50ZXh0XG5cdCAgICAgICAgICAgIGNhc2UgJ2NhcnJpYWdlLXJldHVybic6XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICd3aGl0ZS1zcGFjZSc6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG5cdCAgICAgICAgICAgICAgICAgICAgU1BBQ0Uuc3BsaXQoJycpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIGNhc2UgJ25vbi13aGl0ZS1zcGFjZSc6XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG5cdCAgICAgICAgICAgICAgICAgICAgKExPV0VSICsgVVBQRVIgKyBOVU1CRVIpLnNwbGl0KCcnKVxuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgICAgICBjYXNlICd0YWInOlxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAndmVydGljYWwtdGFiJzpcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ3dvcmQnOiAvLyBcXHcgW2EtekEtWjAtOV1cblx0ICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcblx0ICAgICAgICAgICAgICAgICAgICAoTE9XRVIgKyBVUFBFUiArIE5VTUJFUikuc3BsaXQoJycpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIGNhc2UgJ25vbi13b3JkJzogLy8gXFxXIFteYS16QS1aMC05XVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuXHQgICAgICAgICAgICAgICAgICAgIE9USEVSLnJlcGxhY2UoJ18nLCAnJykuc3BsaXQoJycpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIGNhc2UgJ251bGwtY2hhcmFjdGVyJzpcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBub2RlLmJvZHkgfHwgbm9kZS50ZXh0XG5cdCAgICB9LFxuXHQgICAgLypcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIHR5cGU6ICdhbHRlcm5hdGUnLFxuXHQgICAgICAgICAgICBvZmZzZXQ6IDAsXG5cdCAgICAgICAgICAgIHRleHQ6ICcnLFxuXHQgICAgICAgICAgICBsZWZ0OiB7XG5cdCAgICAgICAgICAgICAgICBib3lkOiBbXVxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICByaWdodDoge1xuXHQgICAgICAgICAgICAgICAgYm95ZDogW11cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICovXG5cdCAgICBhbHRlcm5hdGU6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICAvLyBub2RlLmxlZnQvcmlnaHQge31cblx0ICAgICAgICByZXR1cm4gdGhpcy5nZW4oXG5cdCAgICAgICAgICAgIFJhbmRvbS5ib29sZWFuKCkgPyBub2RlLmxlZnQgOiBub2RlLnJpZ2h0LFxuXHQgICAgICAgICAgICByZXN1bHQsXG5cdCAgICAgICAgICAgIGNhY2hlXG5cdCAgICAgICAgKVxuXHQgICAgfSxcblx0ICAgIC8qXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICB0eXBlOiAnbWF0Y2gnLFxuXHQgICAgICAgICAgICBvZmZzZXQ6IDAsXG5cdCAgICAgICAgICAgIHRleHQ6ICcnLFxuXHQgICAgICAgICAgICBib2R5OiBbXVxuXHQgICAgICAgIH1cblx0ICAgICovXG5cdCAgICBtYXRjaDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHJlc3VsdCA9ICcnXG5cdCAgICAgICAgICAgIC8vIG5vZGUuYm9keSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5ib2R5Lmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLmdlbihub2RlLmJvZHlbaV0sIHJlc3VsdCwgY2FjaGUpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICAvLyAoKVxuXHQgICAgJ2NhcHR1cmUtZ3JvdXAnOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgLy8gbm9kZS5ib2R5IHt9XG5cdCAgICAgICAgcmVzdWx0ID0gdGhpcy5nZW4obm9kZS5ib2R5LCByZXN1bHQsIGNhY2hlKVxuXHQgICAgICAgIGNhY2hlW2NhY2hlLmd1aWQrK10gPSByZXN1bHRcblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgLy8gKD86Li4uKVxuXHQgICAgJ25vbi1jYXB0dXJlLWdyb3VwJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIC8vIG5vZGUuYm9keSB7fVxuXHQgICAgICAgIHJldHVybiB0aGlzLmdlbihub2RlLmJvZHksIHJlc3VsdCwgY2FjaGUpXG5cdCAgICB9LFxuXHQgICAgLy8gKD89cClcblx0ICAgICdwb3NpdGl2ZS1sb29rYWhlYWQnOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgLy8gbm9kZS5ib2R5XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuZ2VuKG5vZGUuYm9keSwgcmVzdWx0LCBjYWNoZSlcblx0ICAgIH0sXG5cdCAgICAvLyAoPyFwKVxuXHQgICAgJ25lZ2F0aXZlLWxvb2thaGVhZCc6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICAvLyBub2RlLmJvZHlcblx0ICAgICAgICByZXR1cm4gJydcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgdHlwZTogJ3F1YW50aWZpZWQnLFxuXHQgICAgICAgICAgICBvZmZzZXQ6IDMsXG5cdCAgICAgICAgICAgIHRleHQ6ICdjKicsXG5cdCAgICAgICAgICAgIGJvZHk6IHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6ICdsaXRlcmFsJyxcblx0ICAgICAgICAgICAgICAgIG9mZnNldDogMyxcblx0ICAgICAgICAgICAgICAgIHRleHQ6ICdjJyxcblx0ICAgICAgICAgICAgICAgIGJvZHk6ICdjJyxcblx0ICAgICAgICAgICAgICAgIGVzY2FwZWQ6IGZhbHNlXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHF1YW50aWZpZXI6IHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6ICdxdWFudGlmaWVyJyxcblx0ICAgICAgICAgICAgICAgIG9mZnNldDogNCxcblx0ICAgICAgICAgICAgICAgIHRleHQ6ICcqJyxcblx0ICAgICAgICAgICAgICAgIG1pbjogMCxcblx0ICAgICAgICAgICAgICAgIG1heDogSW5maW5pdHksXG5cdCAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICovXG5cdCAgICBxdWFudGlmaWVkOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmVzdWx0ID0gJydcblx0ICAgICAgICAgICAgLy8gbm9kZS5xdWFudGlmaWVyIHt9XG5cdCAgICAgICAgdmFyIGNvdW50ID0gdGhpcy5xdWFudGlmaWVyKG5vZGUucXVhbnRpZmllcik7XG5cdCAgICAgICAgLy8gbm9kZS5ib2R5IHt9XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLmdlbihub2RlLmJvZHksIHJlc3VsdCwgY2FjaGUpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIHF1YW50aWZpZXI6IHtcblx0ICAgICAgICAgICAgdHlwZTogJ3F1YW50aWZpZXInLFxuXHQgICAgICAgICAgICBvZmZzZXQ6IDQsXG5cdCAgICAgICAgICAgIHRleHQ6ICcqJyxcblx0ICAgICAgICAgICAgbWluOiAwLFxuXHQgICAgICAgICAgICBtYXg6IEluZmluaXR5LFxuXHQgICAgICAgICAgICBncmVlZHk6IHRydWVcblx0ICAgICAgICB9XG5cdCAgICAqL1xuXHQgICAgcXVhbnRpZmllcjogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIHZhciBtaW4gPSBNYXRoLm1heChub2RlLm1pbiwgMClcblx0ICAgICAgICB2YXIgbWF4ID0gaXNGaW5pdGUobm9kZS5tYXgpID8gbm9kZS5tYXggOlxuXHQgICAgICAgICAgICBtaW4gKyBSYW5kb20uaW50ZWdlcigzLCA3KVxuXHQgICAgICAgIHJldHVybiBSYW5kb20uaW50ZWdlcihtaW4sIG1heClcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIFxuXHQgICAgKi9cblx0ICAgIGNoYXJzZXQ6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICAvLyBub2RlLmludmVydFxuXHQgICAgICAgIGlmIChub2RlLmludmVydCkgcmV0dXJuIHRoaXNbJ2ludmVydC1jaGFyc2V0J10obm9kZSwgcmVzdWx0LCBjYWNoZSlcblxuXHQgICAgICAgIC8vIG5vZGUuYm9keSBbXVxuXHQgICAgICAgIHZhciBsaXRlcmFsID0gUmFuZG9tLnBpY2sobm9kZS5ib2R5KVxuXHQgICAgICAgIHJldHVybiB0aGlzLmdlbihsaXRlcmFsLCByZXN1bHQsIGNhY2hlKVxuXHQgICAgfSxcblx0ICAgICdpbnZlcnQtY2hhcnNldCc6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICB2YXIgcG9vbCA9IFBSSU5UQUJMRVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwLCBpdGVtOyBpIDwgbm9kZS5ib2R5Lmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGl0ZW0gPSBub2RlLmJvZHlbaV1cblx0ICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcblx0ICAgICAgICAgICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxuXHQgICAgICAgICAgICAgICAgICAgIHBvb2wgPSBwb29sLnJlcGxhY2UoaXRlbS5ib2R5LCAnJylcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgY2FzZSAncmFuZ2UnOlxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBtaW4gPSB0aGlzLmdlbihpdGVtLnN0YXJ0LCByZXN1bHQsIGNhY2hlKS5jaGFyQ29kZUF0KClcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5nZW4oaXRlbS5lbmQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuXHQgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlpID0gbWluOyBpaSA8PSBtYXg7IGlpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHBvb2wucmVwbGFjZShTdHJpbmcuZnJvbUNoYXJDb2RlKGlpKSwgJycpXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cblx0ICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlcnMgPSBDSEFSQUNURVJfQ0xBU1NFU1tpdGVtLnRleHRdXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJhY3RlcnMpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaWlpID0gMDsgaWlpIDw9IGNoYXJhY3RlcnMubGVuZ3RoOyBpaWkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHBvb2wucmVwbGFjZShjaGFyYWN0ZXJzW2lpaV0sICcnKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBSYW5kb20ucGljayhwb29sLnNwbGl0KCcnKSlcblx0ICAgIH0sXG5cdCAgICByYW5nZTogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuXHQgICAgICAgIC8vIG5vZGUuc3RhcnQsIG5vZGUuZW5kXG5cdCAgICAgICAgdmFyIG1pbiA9IHRoaXMuZ2VuKG5vZGUuc3RhcnQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuXHQgICAgICAgIHZhciBtYXggPSB0aGlzLmdlbihub2RlLmVuZCwgcmVzdWx0LCBjYWNoZSkuY2hhckNvZGVBdCgpXG5cdCAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdCAgICAgICAgICAgIFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KVxuXHQgICAgICAgIClcblx0ICAgIH0sXG5cdCAgICBsaXRlcmFsOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmV0dXJuIG5vZGUuZXNjYXBlZCA/IG5vZGUuYm9keSA6IG5vZGUudGV4dFxuXHQgICAgfSxcblx0ICAgIC8vIFVuaWNvZGUgXFx1XG5cdCAgICB1bmljb2RlOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdCAgICAgICAgICAgIHBhcnNlSW50KG5vZGUuY29kZSwgMTYpXG5cdCAgICAgICAgKVxuXHQgICAgfSxcblx0ICAgIC8vIOWNgeWFrei/m+WItiBcXHhGRlxuXHQgICAgaGV4OiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdCAgICAgICAgICAgIHBhcnNlSW50KG5vZGUuY29kZSwgMTYpXG5cdCAgICAgICAgKVxuXHQgICAgfSxcblx0ICAgIC8vIOWFq+i/m+WItiBcXDBcblx0ICAgIG9jdGFsOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdCAgICAgICAgICAgIHBhcnNlSW50KG5vZGUuY29kZSwgOClcblx0ICAgICAgICApXG5cdCAgICB9LFxuXHQgICAgLy8g5Y+N5ZCR5byV55SoXG5cdCAgICAnYmFjay1yZWZlcmVuY2UnOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG5cdCAgICAgICAgcmV0dXJuIGNhY2hlW25vZGUuY29kZV0gfHwgJydcblx0ICAgIH0sXG5cdCAgICAvKlxuXHQgICAgICAgIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQzBfYW5kX0MxX2NvbnRyb2xfY29kZXNcblx0ICAgICovXG5cdCAgICBDT05UUk9MX0NIQVJBQ1RFUl9NQVA6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIHZhciBDT05UUk9MX0NIQVJBQ1RFUiA9ICdAIEEgQiBDIEQgRSBGIEcgSCBJIEogSyBMIE0gTiBPIFAgUSBSIFMgVCBVIFYgVyBYIFkgWiBbIFxcXFwgXSBeIF8nLnNwbGl0KCcgJylcblx0ICAgICAgICB2YXIgQ09OVFJPTF9DSEFSQUNURVJfVU5JQ09ERSA9ICdcXHUwMDAwIFxcdTAwMDEgXFx1MDAwMiBcXHUwMDAzIFxcdTAwMDQgXFx1MDAwNSBcXHUwMDA2IFxcdTAwMDcgXFx1MDAwOCBcXHUwMDA5IFxcdTAwMEEgXFx1MDAwQiBcXHUwMDBDIFxcdTAwMEQgXFx1MDAwRSBcXHUwMDBGIFxcdTAwMTAgXFx1MDAxMSBcXHUwMDEyIFxcdTAwMTMgXFx1MDAxNCBcXHUwMDE1IFxcdTAwMTYgXFx1MDAxNyBcXHUwMDE4IFxcdTAwMTkgXFx1MDAxQSBcXHUwMDFCIFxcdTAwMUMgXFx1MDAxRCBcXHUwMDFFIFxcdTAwMUYnLnNwbGl0KCcgJylcblx0ICAgICAgICB2YXIgbWFwID0ge31cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IENPTlRST0xfQ0hBUkFDVEVSLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIG1hcFtDT05UUk9MX0NIQVJBQ1RFUltpXV0gPSBDT05UUk9MX0NIQVJBQ1RFUl9VTklDT0RFW2ldXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBtYXBcblx0ICAgIH0oKSxcblx0ICAgICdjb250cm9sLWNoYXJhY3Rlcic6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5DT05UUk9MX0NIQVJBQ1RFUl9NQVBbbm9kZS5jb2RlXVxuXHQgICAgfVxuXHR9KVxuXG5cdG1vZHVsZS5leHBvcnRzID0gSGFuZGxlclxuXG4vKioqLyB9LFxuLyogMjMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNClcblxuLyoqKi8gfSxcbi8qIDI0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgdG9KU09OU2NoZW1hXG5cblx0ICAgIOaKiiBNb2NrLmpzIOmjjuagvOeahOaVsOaNruaooeadv+i9rOaNouaIkCBKU09OIFNjaGVtYeOAglxuXG5cdCAgICA+IFtKU09OIFNjaGVtYV0oaHR0cDovL2pzb24tc2NoZW1hLm9yZy8pXG5cdCAqL1xuXHR2YXIgQ29uc3RhbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXHR2YXIgUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KVxuXG5cdGZ1bmN0aW9uIHRvSlNPTlNjaGVtYSh0ZW1wbGF0ZSwgbmFtZSwgcGF0aCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0ICAgIC8vIHR5cGUgcnVsZSBwcm9wZXJ0aWVzIGl0ZW1zXG5cdCAgICBwYXRoID0gcGF0aCB8fCBbXVxuXHQgICAgdmFyIHJlc3VsdCA9IHtcblx0ICAgICAgICBuYW1lOiB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgPyBuYW1lLnJlcGxhY2UoQ29uc3RhbnQuUkVfS0VZLCAnJDEnKSA6IG5hbWUsXG5cdCAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuXHQgICAgICAgIHR5cGU6IFV0aWwudHlwZSh0ZW1wbGF0ZSksIC8vIOWPr+iDveS4jeWHhuehru+8jOS+i+WmgiB7ICduYW1lfDEnOiBbe30sIHt9IC4uLl0gfVxuXHQgICAgICAgIHJ1bGU6IFBhcnNlci5wYXJzZShuYW1lKVxuXHQgICAgfVxuXHQgICAgcmVzdWx0LnBhdGggPSBwYXRoLnNsaWNlKDApXG5cdCAgICByZXN1bHQucGF0aC5wdXNoKG5hbWUgPT09IHVuZGVmaW5lZCA/ICdST09UJyA6IHJlc3VsdC5uYW1lKVxuXG5cdCAgICBzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG5cdCAgICAgICAgY2FzZSAnYXJyYXknOlxuXHQgICAgICAgICAgICByZXN1bHQuaXRlbXMgPSBbXVxuXHQgICAgICAgICAgICBVdGlsLmVhY2godGVtcGxhdGUsIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuXHQgICAgICAgICAgICAgICAgcmVzdWx0Lml0ZW1zLnB1c2goXG5cdCAgICAgICAgICAgICAgICAgICAgdG9KU09OU2NoZW1hKHZhbHVlLCBpbmRleCwgcmVzdWx0LnBhdGgpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgY2FzZSAnb2JqZWN0Jzpcblx0ICAgICAgICAgICAgcmVzdWx0LnByb3BlcnRpZXMgPSBbXVxuXHQgICAgICAgICAgICBVdGlsLmVhY2godGVtcGxhdGUsIGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG5cdCAgICAgICAgICAgICAgICByZXN1bHQucHJvcGVydGllcy5wdXNoKFxuXHQgICAgICAgICAgICAgICAgICAgIHRvSlNPTlNjaGVtYSh2YWx1ZSwgbmFtZSwgcmVzdWx0LnBhdGgpXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICB9XG5cblx0ICAgIHJldHVybiByZXN1bHRcblxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB0b0pTT05TY2hlbWFcblxuXG4vKioqLyB9LFxuLyogMjUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNilcblxuLyoqKi8gfSxcbi8qIDI2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgICAgIyMgdmFsaWQodGVtcGxhdGUsIGRhdGEpXG5cblx0ICAgIOagoemqjOecn+WunuaVsOaNriBkYXRhIOaYr+WQpuS4juaVsOaNruaooeadvyB0ZW1wbGF0ZSDljLnphY3jgIJcblx0ICAgIFxuXHQgICAg5a6e546w5oCd6Lev77yaXG5cdCAgICAxLiDop6PmnpDop4TliJnjgIJcblx0ICAgICAgICDlhYjmiormlbDmja7mqKHmnb8gdGVtcGxhdGUg6Kej5p6Q5Li65pu05pa55L6/5py65Zmo6Kej5p6Q55qEIEpTT04tU2NoYW1lXG5cdCAgICAgICAgbmFtZSAgICAgICAgICAgICAgIOWxnuaAp+WQjSBcblx0ICAgICAgICB0eXBlICAgICAgICAgICAgICAg5bGe5oCn5YC857G75Z6LXG5cdCAgICAgICAgdGVtcGxhdGUgICAgICAgICAgIOWxnuaAp+WAvOaooeadv1xuXHQgICAgICAgIHByb3BlcnRpZXMgICAgICAgICDlr7nosaHlsZ7mgKfmlbDnu4Rcblx0ICAgICAgICBpdGVtcyAgICAgICAgICAgICAg5pWw57uE5YWD57Sg5pWw57uEXG5cdCAgICAgICAgcnVsZSAgICAgICAgICAgICAgIOWxnuaAp+WAvOeUn+aIkOinhOWImVxuXHQgICAgMi4g6YCS5b2S6aqM6K+B6KeE5YiZ44CCXG5cdCAgICAgICAg54S25ZCO55SoIEpTT04tU2NoZW1hIOagoemqjOecn+WunuaVsOaNru+8jOagoemqjOmhueWMheaLrOWxnuaAp+WQjeOAgeWAvOexu+Wei+OAgeWAvOOAgeWAvOeUn+aIkOinhOWImeOAglxuXG5cdCAgICDmj5DnpLrkv6Hmga8gXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vZmdlL2pzb24tc2NoZW1hLXZhbGlkYXRvci9ibG9iL21hc3Rlci9zcmMvbWFpbi9yZXNvdXJjZXMvY29tL2dpdGh1Yi9mZ2UvanNvbnNjaGVtYS92YWxpZGF0b3IvdmFsaWRhdGlvbi5wcm9wZXJ0aWVzXG5cdCAgICBbSlNPTi1TY2hhbWEgdmFsaWRhdG9yXShodHRwOi8vanNvbi1zY2hlbWEtdmFsaWRhdG9yLmhlcm9rdWFwcC5jb20vKVxuXHQgICAgW1JlZ2V4cCBEZW1vXShodHRwOi8vZGVtb3MuZm9yYmVzbGluZGVzYXkuY28udWsvcmVnZXhwLylcblx0Ki9cblx0dmFyIENvbnN0YW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKVxuXHR2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblx0dmFyIHRvSlNPTlNjaGVtYSA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpXG5cblx0ZnVuY3Rpb24gdmFsaWQodGVtcGxhdGUsIGRhdGEpIHtcblx0ICAgIHZhciBzY2hlbWEgPSB0b0pTT05TY2hlbWEodGVtcGxhdGUpXG5cdCAgICB2YXIgcmVzdWx0ID0gRGlmZi5kaWZmKHNjaGVtYSwgZGF0YSlcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgLy8gY29uc29sZS5sb2codGVtcGxhdGUsIGRhdGEpXG5cdCAgICAgICAgLy8gY29uc29sZS53YXJuKEFzc2VydC5tZXNzYWdlKHJlc3VsdFtpXSkpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmVzdWx0XG5cdH1cblxuXHQvKlxuXHQgICAgIyMgbmFtZVxuXHQgICAgICAgIOacieeUn+aIkOinhOWIme+8muavlOi+g+ino+aekOWQjueahCBuYW1lXG5cdCAgICAgICAg5peg55Sf5oiQ6KeE5YiZ77ya55u05o6l5q+U6L6DXG5cdCAgICAjIyB0eXBlXG5cdCAgICAgICAg5peg57G75Z6L6L2s5o2i77ya55u05o6l5q+U6L6DXG5cdCAgICAgICAg5pyJ57G75Z6L6L2s5o2i77ya5YWI6K+V552A6Kej5p6QIHRlbXBsYXRl77yM54S25ZCO5YaN5qOA5p+l77yfXG5cdCAgICAjIyB2YWx1ZSB2cy4gdGVtcGxhdGVcblx0ICAgICAgICDln7rmnKznsbvlnotcblx0ICAgICAgICAgICAg5peg55Sf5oiQ6KeE5YiZ77ya55u05o6l5q+U6L6DXG5cdCAgICAgICAgICAgIOacieeUn+aIkOinhOWIme+8mlxuXHQgICAgICAgICAgICAgICAgbnVtYmVyXG5cdCAgICAgICAgICAgICAgICAgICAgbWluLW1heC5kbWluLWRtYXhcblx0ICAgICAgICAgICAgICAgICAgICBtaW4tbWF4LmRjb3VudFxuXHQgICAgICAgICAgICAgICAgICAgIGNvdW50LmRtaW4tZG1heFxuXHQgICAgICAgICAgICAgICAgICAgIGNvdW50LmRjb3VudFxuXHQgICAgICAgICAgICAgICAgICAgICtzdGVwXG5cdCAgICAgICAgICAgICAgICAgICAg5pW05pWw6YOo5YiGXG5cdCAgICAgICAgICAgICAgICAgICAg5bCP5pWw6YOo5YiGXG5cdCAgICAgICAgICAgICAgICBib29sZWFuIFxuXHQgICAgICAgICAgICAgICAgc3RyaW5nICBcblx0ICAgICAgICAgICAgICAgICAgICBtaW4tbWF4XG5cdCAgICAgICAgICAgICAgICAgICAgY291bnRcblx0ICAgICMjIHByb3BlcnRpZXNcblx0ICAgICAgICDlr7nosaFcblx0ICAgICAgICAgICAg5pyJ55Sf5oiQ6KeE5YiZ77ya5qOA5rWL5pyf5pyb55qE5bGe5oCn5Liq5pWw77yM57un57ut6YCS5b2SXG5cdCAgICAgICAgICAgIOaXoOeUn+aIkOinhOWIme+8muajgOa1i+WFqOmDqOeahOWxnuaAp+S4quaVsO+8jOe7p+e7remAkuW9klxuXHQgICAgIyMgaXRlbXNcblx0ICAgICAgICDmlbDnu4Rcblx0ICAgICAgICAgICAg5pyJ55Sf5oiQ6KeE5YiZ77yaXG5cdCAgICAgICAgICAgICAgICBgJ25hbWV8MSc6IFt7fSwge30gLi4uXWAgICAgICAgICAgICDlhbbkuK3kuYvkuIDvvIznu6fnu63pgJLlvZJcblx0ICAgICAgICAgICAgICAgIGAnbmFtZXwrMSc6IFt7fSwge30gLi4uXWAgICAgICAgICAgIOmhuuW6j+ajgOa1i++8jOe7p+e7remAkuW9klxuXHQgICAgICAgICAgICAgICAgYCduYW1lfG1pbi1tYXgnOiBbe30sIHt9IC4uLl1gICAgICAg5qOA5rWL5Liq5pWw77yM57un57ut6YCS5b2SXG5cdCAgICAgICAgICAgICAgICBgJ25hbWV8Y291bnQnOiBbe30sIHt9IC4uLl1gICAgICAgICDmo4DmtYvkuKrmlbDvvIznu6fnu63pgJLlvZJcblx0ICAgICAgICAgICAg5peg55Sf5oiQ6KeE5YiZ77ya5qOA5rWL5YWo6YOo55qE5YWD57Sg5Liq5pWw77yM57un57ut6YCS5b2SXG5cdCovXG5cdHZhciBEaWZmID0ge1xuXHQgICAgZGlmZjogZnVuY3Rpb24gZGlmZihzY2hlbWEsIGRhdGEsIG5hbWUgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IFtdXG5cblx0ICAgICAgICAvLyDlhYjmo4DmtYvlkI3np7AgbmFtZSDlkoznsbvlnosgdHlwZe+8jOWmguaenOWMuemFje+8jOaJjeacieW/heimgee7p+e7reajgOa1i1xuXHQgICAgICAgIGlmIChcblx0ICAgICAgICAgICAgdGhpcy5uYW1lKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KSAmJlxuXHQgICAgICAgICAgICB0aGlzLnR5cGUoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpXG5cdCAgICAgICAgKSB7XG5cdCAgICAgICAgICAgIHRoaXMudmFsdWUoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpXG5cdCAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyhzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdClcblx0ICAgICAgICAgICAgdGhpcy5pdGVtcyhzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9LFxuXHQgICAgLyoganNoaW50IHVudXNlZDpmYWxzZSAqL1xuXHQgICAgbmFtZTogZnVuY3Rpb24oc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpIHtcblx0ICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aFxuXG5cdCAgICAgICAgQXNzZXJ0LmVxdWFsKCduYW1lJywgc2NoZW1hLnBhdGgsIG5hbWUgKyAnJywgc2NoZW1hLm5hbWUgKyAnJywgcmVzdWx0KVxuXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgfSxcblx0ICAgIHR5cGU6IGZ1bmN0aW9uKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KSB7XG5cdCAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGhcblxuXHQgICAgICAgIHN3aXRjaCAoc2NoZW1hLnR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcblx0ICAgICAgICAgICAgICAgIC8vIOi3s+i/h+WQq+acieOAjuWNoOS9jeespuOAj+eahOWxnuaAp+WAvO+8jOWboOS4uuOAjuWNoOS9jeespuOAj+i/lOWbnuWAvOeahOexu+Wei+WPr+iDveWSjOaooeadv+S4jeS4gOiHtO+8jOS+i+WmgiAnQGludCcg5Lya6L+U5Zue5LiA5Liq5pW05b2i5YC8XG5cdCAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnRlbXBsYXRlLm1hdGNoKENvbnN0YW50LlJFX1BMQUNFSE9MREVSKSkgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ2FycmF5Jzpcblx0ICAgICAgICAgICAgICAgIGlmIChzY2hlbWEucnVsZS5wYXJhbWV0ZXJzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gbmFtZXxjb3VudDogYXJyYXlcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgc2NoZW1hLnJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L+HIG5hbWV8MTogYXJyYXnvvIzlm6DkuLrmnIDnu4jlgLznmoTnsbvlnovvvIjlvojlj6/og73vvInkuI3mmK/mlbDnu4TvvIzkuZ/kuI3kuIDlrprkuI4gYGFycmF5YCDkuK3nmoTnsbvlnovkuIDoh7Rcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS5ydWxlLmNvdW50ID09PSAxKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAvLyDot7Pov4cgbmFtZXwraW5jOiBhcnJheVxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWEucnVsZS5wYXJhbWV0ZXJzWzJdKSByZXR1cm4gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuXHQgICAgICAgICAgICAgICAgLy8g6Lez6L+HIGAnbmFtZSc6IGZ1bmN0aW9uYO+8jOWboOS4uuWHveaVsOWPr+S7pei/lOWbnuS7u+S9leexu+Wei+eahOWAvOOAglxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBBc3NlcnQuZXF1YWwoJ3R5cGUnLCBzY2hlbWEucGF0aCwgVXRpbC50eXBlKGRhdGEpLCBzY2hlbWEudHlwZSwgcmVzdWx0KVxuXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgfSxcblx0ICAgIHZhbHVlOiBmdW5jdGlvbihzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkge1xuXHQgICAgICAgIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoXG5cblx0ICAgICAgICB2YXIgcnVsZSA9IHNjaGVtYS5ydWxlXG5cdCAgICAgICAgdmFyIHRlbXBsYXRlVHlwZSA9IHNjaGVtYS50eXBlXG5cdCAgICAgICAgaWYgKHRlbXBsYXRlVHlwZSA9PT0gJ29iamVjdCcgfHwgdGVtcGxhdGVUeXBlID09PSAnYXJyYXknIHx8IHRlbXBsYXRlVHlwZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHRydWVcblxuXHQgICAgICAgIC8vIOaXoOeUn+aIkOinhOWImVxuXHQgICAgICAgIGlmICghcnVsZS5wYXJhbWV0ZXJzKSB7XG5cdCAgICAgICAgICAgIHN3aXRjaCAodGVtcGxhdGVUeXBlKSB7XG5cdCAgICAgICAgICAgICAgICBjYXNlICdyZWdleHAnOlxuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5tYXRjaCgndmFsdWUnLCBzY2hlbWEucGF0aCwgZGF0YSwgc2NoZW1hLnRlbXBsYXRlLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcblx0ICAgICAgICAgICAgICAgICAgICAvLyDlkIzmoLfot7Pov4flkKvmnInjgI7ljaDkvY3nrKbjgI/nmoTlsZ7mgKflgLzvvIzlm6DkuLrjgI7ljaDkvY3nrKbjgI/nmoTov5Tlm57lgLzkvJrpgJrluLjkvJrkuI7mqKHmnb/kuI3kuIDoh7Rcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnRlbXBsYXRlLm1hdGNoKENvbnN0YW50LlJFX1BMQUNFSE9MREVSKSkgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBkYXRhLCBzY2hlbWEudGVtcGxhdGUsIHJlc3VsdClcblx0ICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOacieeUn+aIkOinhOWImVxuXHQgICAgICAgIHZhciBhY3R1YWxSZXBlYXRDb3VudFxuXHQgICAgICAgIHN3aXRjaCAodGVtcGxhdGVUeXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG5cdCAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSAoZGF0YSArICcnKS5zcGxpdCgnLicpXG5cdCAgICAgICAgICAgICAgICBwYXJ0c1swXSA9ICtwYXJ0c1swXVxuXG5cdCAgICAgICAgICAgICAgICAvLyDmlbTmlbDpg6jliIZcblx0ICAgICAgICAgICAgICAgIC8vIHxtaW4tbWF4XG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBwYXJ0c1swXSwgTWF0aC5taW4ocnVsZS5taW4sIHJ1bGUubWF4KSwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyAsICdudW1lcmljIGluc3RhbmNlIGlzIGxvd2VyIHRoYW4gdGhlIHJlcXVpcmVkIG1pbmltdW0gKG1pbmltdW06IHtleHBlY3RlZH0sIGZvdW5kOiB7YWN0dWFsfSknKVxuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMF0sIE1hdGgubWF4KHJ1bGUubWluLCBydWxlLm1heCksIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIC8vIHxjb3VudFxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5lcXVhbCgndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMF0sIHJ1bGUubWluLCByZXN1bHQsICdbdmFsdWVdICcgKyBuYW1lKVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyDlsI/mlbDpg6jliIZcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLmRlY2ltYWwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyB8ZG1pbi1kbWF4XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUuZG1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUuZG1heCAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMV0ubGVuZ3RoLCBydWxlLmRtaW4sIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCd2YWx1ZScsIHNjaGVtYS5wYXRoLCBwYXJ0c1sxXS5sZW5ndGgsIHJ1bGUuZG1heCwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAvLyB8ZGNvdW50XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUuZG1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUuZG1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIEFzc2VydC5lcXVhbCgndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMV0ubGVuZ3RoLCBydWxlLmRtaW4sIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cblx0ICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXG5cdCAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG5cdCAgICAgICAgICAgICAgICAvLyAnYWFhJy5tYXRjaCgvYS9nKVxuXHQgICAgICAgICAgICAgICAgYWN0dWFsUmVwZWF0Q291bnQgPSBkYXRhLm1hdGNoKG5ldyBSZWdFeHAoc2NoZW1hLnRlbXBsYXRlLCAnZycpKVxuXHQgICAgICAgICAgICAgICAgYWN0dWFsUmVwZWF0Q291bnQgPSBhY3R1YWxSZXBlYXRDb3VudCA/IGFjdHVhbFJlcGVhdENvdW50Lmxlbmd0aCA6IDBcblxuXHQgICAgICAgICAgICAgICAgLy8gfG1pbi1tYXhcblx0ICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5taW4sIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5tYXgsIHJlc3VsdClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIC8vIHxjb3VudFxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5lcXVhbCgncmVwZWF0IGNvdW50Jywgc2NoZW1hLnBhdGgsIGFjdHVhbFJlcGVhdENvdW50LCBydWxlLm1pbiwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXG5cdCAgICAgICAgICAgIGNhc2UgJ3JlZ2V4cCc6XG5cdCAgICAgICAgICAgICAgICBhY3R1YWxSZXBlYXRDb3VudCA9IGRhdGEubWF0Y2gobmV3IFJlZ0V4cChzY2hlbWEudGVtcGxhdGUuc291cmNlLnJlcGxhY2UoL15cXF58XFwkJC9nLCAnJyksICdnJykpXG5cdCAgICAgICAgICAgICAgICBhY3R1YWxSZXBlYXRDb3VudCA9IGFjdHVhbFJlcGVhdENvdW50ID8gYWN0dWFsUmVwZWF0Q291bnQubGVuZ3RoIDogMFxuXG5cdCAgICAgICAgICAgICAgICAvLyB8bWluLW1heFxuXHQgICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygncmVwZWF0IGNvdW50Jywgc2NoZW1hLnBhdGgsIGFjdHVhbFJlcGVhdENvdW50LCBydWxlLm1pbiwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygncmVwZWF0IGNvdW50Jywgc2NoZW1hLnBhdGgsIGFjdHVhbFJlcGVhdENvdW50LCBydWxlLm1heCwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy8gfGNvdW50XG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWluLCByZXN1bHQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgIH0sXG5cdCAgICBwcm9wZXJ0aWVzOiBmdW5jdGlvbihzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkge1xuXHQgICAgICAgIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoXG5cblx0ICAgICAgICB2YXIgcnVsZSA9IHNjaGVtYS5ydWxlXG5cdCAgICAgICAgdmFyIGtleXMgPSBVdGlsLmtleXMoZGF0YSlcblx0ICAgICAgICBpZiAoIXNjaGVtYS5wcm9wZXJ0aWVzKSByZXR1cm5cblxuXHQgICAgICAgIC8vIOaXoOeUn+aIkOinhOWImVxuXHQgICAgICAgIGlmICghc2NoZW1hLnJ1bGUucGFyYW1ldGVycykge1xuXHQgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ3Byb3BlcnRpZXMgbGVuZ3RoJywgc2NoZW1hLnBhdGgsIGtleXMubGVuZ3RoLCBzY2hlbWEucHJvcGVydGllcy5sZW5ndGgsIHJlc3VsdClcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvLyDmnInnlJ/miJDop4TliJlcblx0ICAgICAgICAgICAgLy8gfG1pbi1tYXhcblx0ICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgQXNzZXJ0LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCdwcm9wZXJ0aWVzIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBrZXlzLmxlbmd0aCwgTWF0aC5taW4ocnVsZS5taW4sIHJ1bGUubWF4KSwgcmVzdWx0KVxuXHQgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCdwcm9wZXJ0aWVzIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBrZXlzLmxlbmd0aCwgTWF0aC5tYXgocnVsZS5taW4sIHJ1bGUubWF4KSwgcmVzdWx0KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIHxjb3VudFxuXHQgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB8MSwgfD4xXG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5jb3VudCAhPT0gMSkgQXNzZXJ0LmVxdWFsKCdwcm9wZXJ0aWVzIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBrZXlzLmxlbmd0aCwgcnVsZS5taW4sIHJlc3VsdClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSBsZW5ndGgpIHJldHVybiBmYWxzZVxuXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdC5wdXNoLmFwcGx5KFxuXHQgICAgICAgICAgICAgICAgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgdGhpcy5kaWZmKFxuXHQgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlcblx0ICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5lYWNoKHNjaGVtYS5wcm9wZXJ0aWVzLCBmdW5jdGlvbihpdGVtIC8qLCBpbmRleCovICkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0ga2V5c1tpXSkgcHJvcGVydHkgPSBpdGVtXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eSB8fCBzY2hlbWEucHJvcGVydGllc1tpXVxuXHQgICAgICAgICAgICAgICAgICAgIH0oKSxcblx0ICAgICAgICAgICAgICAgICAgICBkYXRhW2tleXNbaV1dLFxuXHQgICAgICAgICAgICAgICAgICAgIGtleXNbaV1cblx0ICAgICAgICAgICAgICAgIClcblx0ICAgICAgICAgICAgKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcblx0ICAgIH0sXG5cdCAgICBpdGVtczogZnVuY3Rpb24oc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpIHtcblx0ICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aFxuXG5cdCAgICAgICAgaWYgKCFzY2hlbWEuaXRlbXMpIHJldHVyblxuXG5cdCAgICAgICAgdmFyIHJ1bGUgPSBzY2hlbWEucnVsZVxuXG5cdCAgICAgICAgLy8g5peg55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgaWYgKCFzY2hlbWEucnVsZS5wYXJhbWV0ZXJzKSB7XG5cdCAgICAgICAgICAgIEFzc2VydC5lcXVhbCgnaXRlbXMgbGVuZ3RoJywgc2NoZW1hLnBhdGgsIGRhdGEubGVuZ3RoLCBzY2hlbWEuaXRlbXMubGVuZ3RoLCByZXN1bHQpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgLy8g5pyJ55Sf5oiQ6KeE5YiZXG5cdCAgICAgICAgICAgIC8vIHxtaW4tbWF4XG5cdCAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygnaXRlbXMnLCBzY2hlbWEucGF0aCwgZGF0YS5sZW5ndGgsIChNYXRoLm1pbihydWxlLm1pbiwgcnVsZS5tYXgpICogc2NoZW1hLml0ZW1zLmxlbmd0aCksIHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgICAgICAnW3t1dHlwZX1dIGFycmF5IGlzIHRvbyBzaG9ydDoge3BhdGh9IG11c3QgaGF2ZSBhdCBsZWFzdCB7ZXhwZWN0ZWR9IGVsZW1lbnRzIGJ1dCBpbnN0YW5jZSBoYXMge2FjdHVhbH0gZWxlbWVudHMnKVxuXHQgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCdpdGVtcycsIHNjaGVtYS5wYXRoLCBkYXRhLmxlbmd0aCwgKE1hdGgubWF4KHJ1bGUubWluLCBydWxlLm1heCkgKiBzY2hlbWEuaXRlbXMubGVuZ3RoKSwgcmVzdWx0LFxuXHQgICAgICAgICAgICAgICAgICAgICdbe3V0eXBlfV0gYXJyYXkgaXMgdG9vIGxvbmc6IHtwYXRofSBtdXN0IGhhdmUgYXQgbW9zdCB7ZXhwZWN0ZWR9IGVsZW1lbnRzIGJ1dCBpbnN0YW5jZSBoYXMge2FjdHVhbH0gZWxlbWVudHMnKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIHxjb3VudFxuXHQgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICAvLyB8MSwgfD4xXG5cdCAgICAgICAgICAgICAgICBpZiAocnVsZS5jb3VudCA9PT0gMSkgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuXHQgICAgICAgICAgICAgICAgZWxzZSBBc3NlcnQuZXF1YWwoJ2l0ZW1zIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBkYXRhLmxlbmd0aCwgKHJ1bGUubWluICogc2NoZW1hLml0ZW1zLmxlbmd0aCksIHJlc3VsdClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAvLyB8K2luY1xuXHQgICAgICAgICAgICBpZiAocnVsZS5wYXJhbWV0ZXJzWzJdKSByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlXG5cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgcmVzdWx0LnB1c2guYXBwbHkoXG5cdCAgICAgICAgICAgICAgICByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICB0aGlzLmRpZmYoXG5cdCAgICAgICAgICAgICAgICAgICAgc2NoZW1hLml0ZW1zW2kgJSBzY2hlbWEuaXRlbXMubGVuZ3RoXSxcblx0ICAgICAgICAgICAgICAgICAgICBkYXRhW2ldLFxuXHQgICAgICAgICAgICAgICAgICAgIGkgJSBzY2hlbWEuaXRlbXMubGVuZ3RoXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgICAgIClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG5cdCAgICB9XG5cdH1cblxuXHQvKlxuXHQgICAg5a6M5ZaE44CB5Y+L5aW955qE5o+Q56S65L+h5oGvXG5cdCAgICBcblx0ICAgIEVxdWFsLCBub3QgZXF1YWwgdG8sIGdyZWF0ZXIgdGhhbiwgbGVzcyB0aGFuLCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8sIGxlc3MgdGhhbiBvciBlcXVhbCB0b1xuXHQgICAg6Lev5b6EIOmqjOivgeexu+WeiyDmj4/ov7AgXG5cblx0ICAgIEV4cGVjdCBwYXRoLm5hbWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGV4cGVjdGVkLCBidXQgcGF0aC5uYW1lIGlzIGFjdHVhbC5cblxuXHQgICAgRXhwZWN0IHBhdGgubmFtZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gZXhwZWN0ZWQsIGJ1dCBwYXRoLm5hbWUgaXMgYWN0dWFsLlxuXHQgICAgRXhwZWN0IHBhdGgubmFtZSBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gZXhwZWN0ZWQsIGJ1dCBwYXRoLm5hbWUgaXMgYWN0dWFsLlxuXG5cdCovXG5cdHZhciBBc3NlcnQgPSB7XG5cdCAgICBtZXNzYWdlOiBmdW5jdGlvbihpdGVtKSB7XG5cdCAgICAgICAgcmV0dXJuIChpdGVtLm1lc3NhZ2UgfHxcblx0ICAgICAgICAgICAgICAgICdbe3V0eXBlfV0gRXhwZWN0IHtwYXRofVxcJ3tsdHlwZX0ge2FjdGlvbn0ge2V4cGVjdGVkfSwgYnV0IGlzIHthY3R1YWx9Jylcblx0ICAgICAgICAgICAgLnJlcGxhY2UoJ3t1dHlwZX0nLCBpdGVtLnR5cGUudG9VcHBlckNhc2UoKSlcblx0ICAgICAgICAgICAgLnJlcGxhY2UoJ3tsdHlwZX0nLCBpdGVtLnR5cGUudG9Mb3dlckNhc2UoKSlcblx0ICAgICAgICAgICAgLnJlcGxhY2UoJ3twYXRofScsIFV0aWwuaXNBcnJheShpdGVtLnBhdGgpICYmIGl0ZW0ucGF0aC5qb2luKCcuJykgfHwgaXRlbS5wYXRoKVxuXHQgICAgICAgICAgICAucmVwbGFjZSgne2FjdGlvbn0nLCBpdGVtLmFjdGlvbilcblx0ICAgICAgICAgICAgLnJlcGxhY2UoJ3tleHBlY3RlZH0nLCBpdGVtLmV4cGVjdGVkKVxuXHQgICAgICAgICAgICAucmVwbGFjZSgne2FjdHVhbH0nLCBpdGVtLmFjdHVhbClcblx0ICAgIH0sXG5cdCAgICBlcXVhbDogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG5cdCAgICAgICAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHJldHVybiB0cnVlXG5cdCAgICAgICAgc3dpdGNoICh0eXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuXHQgICAgICAgICAgICAgICAgLy8g5q2j5YiZ5qih5p2/ID09PSDlrZfnrKbkuLLmnIDnu4jlgLxcblx0ICAgICAgICAgICAgICAgIGlmIChleHBlY3RlZCA9PT0gJ3JlZ2V4cCcgJiYgYWN0dWFsID09PSAnc3RyaW5nJykgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgICAgIHBhdGg6IHBhdGgsXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG5cdCAgICAgICAgICAgIGFjdGlvbjogJ2lzIGVxdWFsIHRvJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuXHQgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9LFxuXHQgICAgLy8gYWN0dWFsIG1hdGNoZXMgZXhwZWN0ZWRcblx0ICAgIG1hdGNoOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAoZXhwZWN0ZWQudGVzdChhY3R1YWwpKSByZXR1cm4gdHJ1ZVxuXG5cdCAgICAgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgICAgIHBhdGg6IHBhdGgsXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG5cdCAgICAgICAgICAgIGFjdGlvbjogJ21hdGNoZXMnLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGl0ZW0ubWVzc2FnZSA9IEFzc2VydC5tZXNzYWdlKGl0ZW0pXG5cdCAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH0sXG5cdCAgICBub3RFcXVhbDogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG5cdCAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHJldHVybiB0cnVlXG5cdCAgICAgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgICAgIHBhdGg6IHBhdGgsXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG5cdCAgICAgICAgICAgIGFjdGlvbjogJ2lzIG5vdCBlcXVhbCB0bycsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Vcblx0ICAgICAgICB9XG5cdCAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcblx0ICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfSxcblx0ICAgIGdyZWF0ZXJUaGFuOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAoYWN0dWFsID4gZXhwZWN0ZWQpIHJldHVybiB0cnVlXG5cdCAgICAgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgICAgIHBhdGg6IHBhdGgsXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG5cdCAgICAgICAgICAgIGFjdGlvbjogJ2lzIGdyZWF0ZXIgdGhhbicsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Vcblx0ICAgICAgICB9XG5cdCAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcblx0ICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfSxcblx0ICAgIGxlc3NUaGFuOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcblx0ICAgICAgICBpZiAoYWN0dWFsIDwgZXhwZWN0ZWQpIHJldHVybiB0cnVlXG5cdCAgICAgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgICAgIHBhdGg6IHBhdGgsXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG5cdCAgICAgICAgICAgIGFjdGlvbjogJ2lzIGxlc3MgdG8nLFxuXHQgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGl0ZW0ubWVzc2FnZSA9IEFzc2VydC5tZXNzYWdlKGl0ZW0pXG5cdCAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH0sXG5cdCAgICBncmVhdGVyVGhhbk9yRXF1YWxUbzogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG5cdCAgICAgICAgaWYgKGFjdHVhbCA+PSBleHBlY3RlZCkgcmV0dXJuIHRydWVcblx0ICAgICAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICAgICAgcGF0aDogcGF0aCxcblx0ICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG5cdCAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcblx0ICAgICAgICAgICAgYWN0aW9uOiAnaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuXHQgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9LFxuXHQgICAgbGVzc1RoYW5PckVxdWFsVG86IGZ1bmN0aW9uKHR5cGUsIHBhdGgsIGFjdHVhbCwgZXhwZWN0ZWQsIHJlc3VsdCwgbWVzc2FnZSkge1xuXHQgICAgICAgIGlmIChhY3R1YWwgPD0gZXhwZWN0ZWQpIHJldHVybiB0cnVlXG5cdCAgICAgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgICAgIHBhdGg6IHBhdGgsXG5cdCAgICAgICAgICAgIHR5cGU6IHR5cGUsXG5cdCAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuXHQgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG5cdCAgICAgICAgICAgIGFjdGlvbjogJ2lzIGxlc3MgdGhhbiBvciBlcXVhbCB0bycsXG5cdCAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Vcblx0ICAgICAgICB9XG5cdCAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcblx0ICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfVxuXHR9XG5cblx0dmFsaWQuRGlmZiA9IERpZmZcblx0dmFsaWQuQXNzZXJ0ID0gQXNzZXJ0XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB2YWxpZFxuXG4vKioqLyB9LFxuLyogMjcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOClcblxuLyoqKi8gfSxcbi8qIDI4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBnbG9iYWwgd2luZG93LCBkb2N1bWVudCwgbG9jYXRpb24sIEV2ZW50LCBzZXRUaW1lb3V0ICovXG5cdC8qXG5cdCAgICAjIyBNb2NrWE1MSHR0cFJlcXVlc3RcblxuXHQgICAg5pyf5pyb55qE5Yqf6IO977yaXG5cdCAgICAxLiDlrozmlbTlnLDopobnm5bljp/nlJ8gWEhSIOeahOihjOS4ulxuXHQgICAgMi4g5a6M5pW05Zyw5qih5ouf5Y6f55SfIFhIUiDnmoTooYzkuLpcblx0ICAgIDMuIOWcqOWPkei1t+ivt+axguaXtu+8jOiHquWKqOajgOa1i+aYr+WQpumcgOimgeaLpuaIqlxuXHQgICAgNC4g5aaC5p6c5LiN5b+F5oum5oiq77yM5YiZ5omn6KGM5Y6f55SfIFhIUiDnmoTooYzkuLpcblx0ICAgIDUuIOWmguaenOmcgOimgeaLpuaIqu+8jOWImeaJp+ihjOiZmuaLnyBYSFIg55qE6KGM5Li6XG5cdCAgICA2LiDlhbzlrrkgWE1MSHR0cFJlcXVlc3Qg5ZKMIEFjdGl2ZVhPYmplY3Rcblx0ICAgICAgICBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcblx0ICAgICAgICBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKVxuXG5cdCAgICDlhbPplK7mlrnms5XnmoTpgLvovpHvvJpcblx0ICAgICogbmV3ICAg5q2k5pe25bCa5peg5rOV56Gu5a6a5piv5ZCm6ZyA6KaB5oum5oiq77yM5omA5Lul5Yib5bu65Y6f55SfIFhIUiDlr7nosaHmmK/lv4XpobvnmoTjgIJcblx0ICAgICogb3BlbiAg5q2k5pe25Y+v5Lul5Y+W5YiwIFVSTO+8jOWPr+S7peWGs+WumuaYr+WQpui/m+ihjOaLpuaIquOAglxuXHQgICAgKiBzZW5kICDmraTml7blt7Lnu4/noa7lrprkuobor7fmsYLmlrnlvI/jgIJcblxuXHQgICAg6KeE6IyD77yaXG5cdCAgICBodHRwOi8veGhyLnNwZWMud2hhdHdnLm9yZy9cblx0ICAgIGh0dHA6Ly93d3cudzMub3JnL1RSL1hNTEh0dHBSZXF1ZXN0Mi9cblxuXHQgICAg5Y+C6ICD5a6e546w77yaXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vcGhpbGlrb24vTW9ja0h0dHBSZXF1ZXN0L2Jsb2IvbWFzdGVyL2xpYi9tb2NrLmpzXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vdHJlay9GYWtlWE1MSHR0cFJlcXVlc3QvYmxvYi9tYXN0ZXIvZmFrZV94bWxfaHR0cF9yZXF1ZXN0LmpzXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vaWxpbnNreS94bWxodHRwcmVxdWVzdC9ibG9iL21hc3Rlci9YTUxIdHRwUmVxdWVzdC5qc1xuXHQgICAgaHR0cHM6Ly9naXRodWIuY29tL2ZpcmVidWcvZmlyZWJ1Zy1saXRlL2Jsb2IvbWFzdGVyL2NvbnRlbnQvbGl0ZS94aHIuanNcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS90aHgvUkFQL2Jsb2IvbWFzdGVyL2xhYi9yYXAucGx1Z2luLnhpbmdsaWUuanNcblxuXHQgICAgKirpnIDkuI3pnIDopoHlhajpnaLph43lhpkgWE1MSHR0cFJlcXVlc3TvvJ8qKlxuXHQgICAgICAgIGh0dHA6Ly94aHIuc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UteG1saHR0cHJlcXVlc3Rcblx0ICAgICAgICDlhbPplK7lsZ7mgKcgcmVhZHlTdGF0ZeOAgXN0YXR1c+OAgXN0YXR1c1RleHTjgIFyZXNwb25zZeOAgXJlc3BvbnNlVGV4dOOAgXJlc3BvbnNlWE1MIOaYryByZWFkb25see+8jOaJgOS7pe+8jOivleWbvumAmui/h+S/ruaUuei/meS6m+eKtuaAge+8jOadpeaooeaLn+WTjeW6lOaYr+S4jeWPr+ihjOeahOOAglxuXHQgICAgICAgIOWboOatpO+8jOWUr+S4gOeahOWKnuazleaYr+aooeaLn+aVtOS4qiBYTUxIdHRwUmVxdWVzdO+8jOWwseWDjyBqUXVlcnkg5a+55LqL5Lu25qih5Z6L55qE5bCB6KOF44CCXG5cblx0ICAgIC8vIEV2ZW50IGhhbmRsZXJzXG5cdCAgICBvbmxvYWRzdGFydCAgICAgICAgIGxvYWRzdGFydFxuXHQgICAgb25wcm9ncmVzcyAgICAgICAgICBwcm9ncmVzc1xuXHQgICAgb25hYm9ydCAgICAgICAgICAgICBhYm9ydFxuXHQgICAgb25lcnJvciAgICAgICAgICAgICBlcnJvclxuXHQgICAgb25sb2FkICAgICAgICAgICAgICBsb2FkXG5cdCAgICBvbnRpbWVvdXQgICAgICAgICAgIHRpbWVvdXRcblx0ICAgIG9ubG9hZGVuZCAgICAgICAgICAgbG9hZGVuZFxuXHQgICAgb25yZWFkeXN0YXRlY2hhbmdlICByZWFkeXN0YXRlY2hhbmdlXG5cdCAqL1xuXG5cdHZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVxuXG5cdC8vIOWkh+S7veWOn+eUnyBYTUxIdHRwUmVxdWVzdFxuXHR3aW5kb3cuX1hNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0XG5cdHdpbmRvdy5fQWN0aXZlWE9iamVjdCA9IHdpbmRvdy5BY3RpdmVYT2JqZWN0XG5cblx0Lypcblx0ICAgIFBoYW50b21KU1xuXHQgICAgVHlwZUVycm9yOiAnW29iamVjdCBFdmVudENvbnN0cnVjdG9yXScgaXMgbm90IGEgY29uc3RydWN0b3IgKGV2YWx1YXRpbmcgJ25ldyBFdmVudChcInJlYWR5c3RhdGVjaGFuZ2VcIiknKVxuXG5cdCAgICBodHRwczovL2dpdGh1Yi5jb20vYmx1ZXJhaWwvdHdpdHRlci1ib290c3RyYXAtcmFpbHMtY29uZmlybS9pc3N1ZXMvMThcblx0ICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzExMjg5XG5cdCovXG5cdHRyeSB7XG5cdCAgICBuZXcgd2luZG93LkV2ZW50KCdjdXN0b20nKVxuXHR9IGNhdGNoIChleGNlcHRpb24pIHtcblx0ICAgIHdpbmRvdy5FdmVudCA9IGZ1bmN0aW9uKHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbCkge1xuXHQgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpIC8vIE1VU1QgYmUgJ0N1c3RvbUV2ZW50J1xuXHQgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudCh0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkZXRhaWwpXG5cdCAgICAgICAgcmV0dXJuIGV2ZW50XG5cdCAgICB9XG5cdH1cblxuXHR2YXIgWEhSX1NUQVRFUyA9IHtcblx0ICAgIC8vIFRoZSBvYmplY3QgaGFzIGJlZW4gY29uc3RydWN0ZWQuXG5cdCAgICBVTlNFTlQ6IDAsXG5cdCAgICAvLyBUaGUgb3BlbigpIG1ldGhvZCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgaW52b2tlZC5cblx0ICAgIE9QRU5FRDogMSxcblx0ICAgIC8vIEFsbCByZWRpcmVjdHMgKGlmIGFueSkgaGF2ZSBiZWVuIGZvbGxvd2VkIGFuZCBhbGwgSFRUUCBoZWFkZXJzIG9mIHRoZSByZXNwb25zZSBoYXZlIGJlZW4gcmVjZWl2ZWQuXG5cdCAgICBIRUFERVJTX1JFQ0VJVkVEOiAyLFxuXHQgICAgLy8gVGhlIHJlc3BvbnNlJ3MgYm9keSBpcyBiZWluZyByZWNlaXZlZC5cblx0ICAgIExPQURJTkc6IDMsXG5cdCAgICAvLyBUaGUgZGF0YSB0cmFuc2ZlciBoYXMgYmVlbiBjb21wbGV0ZWQgb3Igc29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIHRoZSB0cmFuc2ZlciAoZS5nLiBpbmZpbml0ZSByZWRpcmVjdHMpLlxuXHQgICAgRE9ORTogNFxuXHR9XG5cblx0dmFyIFhIUl9FVkVOVFMgPSAncmVhZHlzdGF0ZWNoYW5nZSBsb2Fkc3RhcnQgcHJvZ3Jlc3MgYWJvcnQgZXJyb3IgbG9hZCB0aW1lb3V0IGxvYWRlbmQnLnNwbGl0KCcgJylcblx0dmFyIFhIUl9SRVFVRVNUX1BST1BFUlRJRVMgPSAndGltZW91dCB3aXRoQ3JlZGVudGlhbHMnLnNwbGl0KCcgJylcblx0dmFyIFhIUl9SRVNQT05TRV9QUk9QRVJUSUVTID0gJ3JlYWR5U3RhdGUgcmVzcG9uc2VVUkwgc3RhdHVzIHN0YXR1c1RleHQgcmVzcG9uc2VUeXBlIHJlc3BvbnNlIHJlc3BvbnNlVGV4dCByZXNwb25zZVhNTCcuc3BsaXQoJyAnKVxuXG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90cmVrL0Zha2VYTUxIdHRwUmVxdWVzdC9ibG9iL21hc3Rlci9mYWtlX3htbF9odHRwX3JlcXVlc3QuanMjTDMyXG5cdHZhciBIVFRQX1NUQVRVU19DT0RFUyA9IHtcblx0ICAgIDEwMDogXCJDb250aW51ZVwiLFxuXHQgICAgMTAxOiBcIlN3aXRjaGluZyBQcm90b2NvbHNcIixcblx0ICAgIDIwMDogXCJPS1wiLFxuXHQgICAgMjAxOiBcIkNyZWF0ZWRcIixcblx0ICAgIDIwMjogXCJBY2NlcHRlZFwiLFxuXHQgICAgMjAzOiBcIk5vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uXCIsXG5cdCAgICAyMDQ6IFwiTm8gQ29udGVudFwiLFxuXHQgICAgMjA1OiBcIlJlc2V0IENvbnRlbnRcIixcblx0ICAgIDIwNjogXCJQYXJ0aWFsIENvbnRlbnRcIixcblx0ICAgIDMwMDogXCJNdWx0aXBsZSBDaG9pY2VcIixcblx0ICAgIDMwMTogXCJNb3ZlZCBQZXJtYW5lbnRseVwiLFxuXHQgICAgMzAyOiBcIkZvdW5kXCIsXG5cdCAgICAzMDM6IFwiU2VlIE90aGVyXCIsXG5cdCAgICAzMDQ6IFwiTm90IE1vZGlmaWVkXCIsXG5cdCAgICAzMDU6IFwiVXNlIFByb3h5XCIsXG5cdCAgICAzMDc6IFwiVGVtcG9yYXJ5IFJlZGlyZWN0XCIsXG5cdCAgICA0MDA6IFwiQmFkIFJlcXVlc3RcIixcblx0ICAgIDQwMTogXCJVbmF1dGhvcml6ZWRcIixcblx0ICAgIDQwMjogXCJQYXltZW50IFJlcXVpcmVkXCIsXG5cdCAgICA0MDM6IFwiRm9yYmlkZGVuXCIsXG5cdCAgICA0MDQ6IFwiTm90IEZvdW5kXCIsXG5cdCAgICA0MDU6IFwiTWV0aG9kIE5vdCBBbGxvd2VkXCIsXG5cdCAgICA0MDY6IFwiTm90IEFjY2VwdGFibGVcIixcblx0ICAgIDQwNzogXCJQcm94eSBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZFwiLFxuXHQgICAgNDA4OiBcIlJlcXVlc3QgVGltZW91dFwiLFxuXHQgICAgNDA5OiBcIkNvbmZsaWN0XCIsXG5cdCAgICA0MTA6IFwiR29uZVwiLFxuXHQgICAgNDExOiBcIkxlbmd0aCBSZXF1aXJlZFwiLFxuXHQgICAgNDEyOiBcIlByZWNvbmRpdGlvbiBGYWlsZWRcIixcblx0ICAgIDQxMzogXCJSZXF1ZXN0IEVudGl0eSBUb28gTGFyZ2VcIixcblx0ICAgIDQxNDogXCJSZXF1ZXN0LVVSSSBUb28gTG9uZ1wiLFxuXHQgICAgNDE1OiBcIlVuc3VwcG9ydGVkIE1lZGlhIFR5cGVcIixcblx0ICAgIDQxNjogXCJSZXF1ZXN0ZWQgUmFuZ2UgTm90IFNhdGlzZmlhYmxlXCIsXG5cdCAgICA0MTc6IFwiRXhwZWN0YXRpb24gRmFpbGVkXCIsXG5cdCAgICA0MjI6IFwiVW5wcm9jZXNzYWJsZSBFbnRpdHlcIixcblx0ICAgIDUwMDogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcblx0ICAgIDUwMTogXCJOb3QgSW1wbGVtZW50ZWRcIixcblx0ICAgIDUwMjogXCJCYWQgR2F0ZXdheVwiLFxuXHQgICAgNTAzOiBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIixcblx0ICAgIDUwNDogXCJHYXRld2F5IFRpbWVvdXRcIixcblx0ICAgIDUwNTogXCJIVFRQIFZlcnNpb24gTm90IFN1cHBvcnRlZFwiXG5cdH1cblxuXHQvKlxuXHQgICAgTW9ja1hNTEh0dHBSZXF1ZXN0XG5cdCovXG5cblx0ZnVuY3Rpb24gTW9ja1hNTEh0dHBSZXF1ZXN0KCkge1xuXHQgICAgLy8g5Yid5aeL5YyWIGN1c3RvbSDlr7nosaHvvIznlKjkuo7lrZjlgqjoh6rlrprkuYnlsZ7mgKdcblx0ICAgIHRoaXMuY3VzdG9tID0ge1xuXHQgICAgICAgIGV2ZW50czoge30sXG5cdCAgICAgICAgcmVxdWVzdEhlYWRlcnM6IHt9LFxuXHQgICAgICAgIHJlc3BvbnNlSGVhZGVyczoge31cblx0ICAgIH1cblx0fVxuXG5cdE1vY2tYTUxIdHRwUmVxdWVzdC5fc2V0dGluZ3MgPSB7XG5cdCAgICB0aW1lb3V0OiAnMTAtMTAwJyxcblx0ICAgIC8qXG5cdCAgICAgICAgdGltZW91dDogNTAsXG5cdCAgICAgICAgdGltZW91dDogJzEwLTEwMCcsXG5cdCAgICAgKi9cblx0fVxuXG5cdE1vY2tYTUxIdHRwUmVxdWVzdC5zZXR1cCA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG5cdCAgICBVdGlsLmV4dGVuZChNb2NrWE1MSHR0cFJlcXVlc3QuX3NldHRpbmdzLCBzZXR0aW5ncylcblx0ICAgIHJldHVybiBNb2NrWE1MSHR0cFJlcXVlc3QuX3NldHRpbmdzXG5cdH1cblxuXHRVdGlsLmV4dGVuZChNb2NrWE1MSHR0cFJlcXVlc3QsIFhIUl9TVEFURVMpXG5cdFV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsIFhIUl9TVEFURVMpXG5cblx0Ly8g5qCH6K6w5b2T5YmN5a+56LGh5Li6IE1vY2tYTUxIdHRwUmVxdWVzdFxuXHRNb2NrWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm1vY2sgPSB0cnVlXG5cblx0Ly8g5piv5ZCm5oum5oiqIEFqYXgg6K+35rGCXG5cdE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUubWF0Y2ggPSBmYWxzZVxuXG5cdC8vIOWIneWni+WMliBSZXF1ZXN0IOebuOWFs+eahOWxnuaAp+WSjOaWueazlVxuXHRVdGlsLmV4dGVuZChNb2NrWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCB7XG5cdCAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1vcGVuKCktbWV0aG9kXG5cdCAgICAvLyBTZXRzIHRoZSByZXF1ZXN0IG1ldGhvZCwgcmVxdWVzdCBVUkwsIGFuZCBzeW5jaHJvbm91cyBmbGFnLlxuXHQgICAgb3BlbjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGFzeW5jLCB1c2VybmFtZSwgcGFzc3dvcmQpIHtcblx0ICAgICAgICB2YXIgdGhhdCA9IHRoaXNcblxuXHQgICAgICAgIFV0aWwuZXh0ZW5kKHRoaXMuY3VzdG9tLCB7XG5cdCAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuXHQgICAgICAgICAgICB1cmw6IHVybCxcblx0ICAgICAgICAgICAgYXN5bmM6IHR5cGVvZiBhc3luYyA9PT0gJ2Jvb2xlYW4nID8gYXN5bmMgOiB0cnVlLFxuXHQgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG5cdCAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcblx0ICAgICAgICAgICAgb3B0aW9uczoge1xuXHQgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG5cdCAgICAgICAgICAgICAgICB0eXBlOiBtZXRob2Rcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pXG5cblx0ICAgICAgICB0aGlzLmN1c3RvbS50aW1lb3V0ID0gZnVuY3Rpb24odGltZW91dCkge1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgPT09ICdudW1iZXInKSByZXR1cm4gdGltZW91dFxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgPT09ICdzdHJpbmcnICYmICF+dGltZW91dC5pbmRleE9mKCctJykpIHJldHVybiBwYXJzZUludCh0aW1lb3V0LCAxMClcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnc3RyaW5nJyAmJiB+dGltZW91dC5pbmRleE9mKCctJykpIHtcblx0ICAgICAgICAgICAgICAgIHZhciB0bXAgPSB0aW1lb3V0LnNwbGl0KCctJylcblx0ICAgICAgICAgICAgICAgIHZhciBtaW4gPSBwYXJzZUludCh0bXBbMF0sIDEwKVxuXHQgICAgICAgICAgICAgICAgdmFyIG1heCA9IHBhcnNlSW50KHRtcFsxXSwgMTApXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KE1vY2tYTUxIdHRwUmVxdWVzdC5fc2V0dGluZ3MudGltZW91dClcblxuXHQgICAgICAgIC8vIOafpeaJvuS4juivt+axguWPguaVsOWMuemFjeeahOaVsOaNruaooeadv1xuXHQgICAgICAgIHZhciBpdGVtID0gZmluZCh0aGlzLmN1c3RvbS5vcHRpb25zKVxuXG5cdCAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGV2ZW50KSB7XG5cdCAgICAgICAgICAgIC8vIOWQjOatpeWxnuaApyBOYXRpdmVYTUxIdHRwUmVxdWVzdCA9PiBNb2NrWE1MSHR0cFJlcXVlc3Rcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBYSFJfUkVTUE9OU0VfUFJPUEVSVElFUy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGF0W1hIUl9SRVNQT05TRV9QUk9QRVJUSUVTW2ldXSA9IHhocltYSFJfUkVTUE9OU0VfUFJPUEVSVElFU1tpXV1cblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8g6Kem5Y+RIE1vY2tYTUxIdHRwUmVxdWVzdCDkuIrnmoTlkIzlkI3kuovku7Zcblx0ICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChldmVudC50eXBlIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOWmguaenOacquaJvuWIsOWMuemFjeeahOaVsOaNruaooeadv++8jOWImemHh+eUqOWOn+eUnyBYSFIg5Y+R6YCB6K+35rGC44CCXG5cdCAgICAgICAgaWYgKCFpdGVtKSB7XG5cdCAgICAgICAgICAgIC8vIOWIm+W7uuWOn+eUnyBYSFIg5a+56LGh77yM6LCD55So5Y6f55SfIG9wZW4oKe+8jOebkeWQrOaJgOacieWOn+eUn+S6i+S7tlxuXHQgICAgICAgICAgICB2YXIgeGhyID0gY3JlYXRlTmF0aXZlWE1MSHR0cFJlcXVlc3QoKVxuXHQgICAgICAgICAgICB0aGlzLmN1c3RvbS54aHIgPSB4aHJcblxuXHQgICAgICAgICAgICAvLyDliJ3lp4vljJbmiYDmnInkuovku7bvvIznlKjkuo7nm5HlkKzljp/nlJ8gWEhSIOWvueixoeeahOS6i+S7tlxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFhIUl9FVkVOVFMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFhIUl9FVkVOVFNbaV0sIGhhbmRsZSlcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIHhoci5vcGVuKClcblx0ICAgICAgICAgICAgaWYgKHVzZXJuYW1lKSB4aHIub3BlbihtZXRob2QsIHVybCwgYXN5bmMsIHVzZXJuYW1lLCBwYXNzd29yZClcblx0ICAgICAgICAgICAgZWxzZSB4aHIub3BlbihtZXRob2QsIHVybCwgYXN5bmMpXG5cblx0ICAgICAgICAgICAgLy8g5ZCM5q2l5bGe5oCnIE1vY2tYTUxIdHRwUmVxdWVzdCA9PiBOYXRpdmVYTUxIdHRwUmVxdWVzdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IFhIUl9SRVFVRVNUX1BST1BFUlRJRVMubGVuZ3RoOyBqKyspIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgeGhyW1hIUl9SRVFVRVNUX1BST1BFUlRJRVNbal1dID0gdGhhdFtYSFJfUkVRVUVTVF9QUk9QRVJUSUVTW2pdXVxuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOaJvuWIsOS6huWMuemFjeeahOaVsOaNruaooeadv++8jOW8gOWni+aLpuaIqiBYSFIg6K+35rGCXG5cdCAgICAgICAgdGhpcy5tYXRjaCA9IHRydWVcblx0ICAgICAgICB0aGlzLmN1c3RvbS50ZW1wbGF0ZSA9IGl0ZW1cblx0ICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBNb2NrWE1MSHR0cFJlcXVlc3QuT1BFTkVEXG5cdCAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVhZHlzdGF0ZWNoYW5nZScgLyosIGZhbHNlLCBmYWxzZSwgdGhpcyovICkpXG5cdCAgICB9LFxuXHQgICAgLy8gaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtc2V0cmVxdWVzdGhlYWRlcigpLW1ldGhvZFxuXHQgICAgLy8gQ29tYmluZXMgYSBoZWFkZXIgaW4gYXV0aG9yIHJlcXVlc3QgaGVhZGVycy5cblx0ICAgIHNldFJlcXVlc3RIZWFkZXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG5cdCAgICAgICAgLy8g5Y6f55SfIFhIUlxuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCkge1xuXHQgICAgICAgICAgICB0aGlzLmN1c3RvbS54aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5oum5oiqIFhIUlxuXHQgICAgICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IHRoaXMuY3VzdG9tLnJlcXVlc3RIZWFkZXJzXG5cdCAgICAgICAgaWYgKHJlcXVlc3RIZWFkZXJzW25hbWVdKSByZXF1ZXN0SGVhZGVyc1tuYW1lXSArPSAnLCcgKyB2YWx1ZVxuXHQgICAgICAgIGVsc2UgcmVxdWVzdEhlYWRlcnNbbmFtZV0gPSB2YWx1ZVxuXHQgICAgfSxcblx0ICAgIHRpbWVvdXQ6IDAsXG5cdCAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuXHQgICAgdXBsb2FkOiB7fSxcblx0ICAgIC8vIGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLXNlbmQoKS1tZXRob2Rcblx0ICAgIC8vIEluaXRpYXRlcyB0aGUgcmVxdWVzdC5cblx0ICAgIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoZGF0YSkge1xuXHQgICAgICAgIHZhciB0aGF0ID0gdGhpc1xuXHQgICAgICAgIHRoaXMuY3VzdG9tLm9wdGlvbnMuYm9keSA9IGRhdGFcblxuXHQgICAgICAgIC8vIOWOn+eUnyBYSFJcblx0ICAgICAgICBpZiAoIXRoaXMubWF0Y2gpIHtcblx0ICAgICAgICAgICAgdGhpcy5jdXN0b20ueGhyLnNlbmQoZGF0YSlcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5oum5oiqIFhIUlxuXG5cdCAgICAgICAgLy8gWC1SZXF1ZXN0ZWQtV2l0aCBoZWFkZXJcblx0ICAgICAgICB0aGlzLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnTW9ja1hNTEh0dHBSZXF1ZXN0JylcblxuXHQgICAgICAgIC8vIGxvYWRzdGFydCBUaGUgZmV0Y2ggaW5pdGlhdGVzLlxuXHQgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvYWRzdGFydCcgLyosIGZhbHNlLCBmYWxzZSwgdGhpcyovICkpXG5cblx0ICAgICAgICBpZiAodGhpcy5jdXN0b20uYXN5bmMpIHNldFRpbWVvdXQoZG9uZSwgdGhpcy5jdXN0b20udGltZW91dCkgLy8g5byC5q2lXG5cdCAgICAgICAgZWxzZSBkb25lKCkgLy8g5ZCM5q2lXG5cblx0ICAgICAgICBmdW5jdGlvbiBkb25lKCkge1xuXHQgICAgICAgICAgICB0aGF0LnJlYWR5U3RhdGUgPSBNb2NrWE1MSHR0cFJlcXVlc3QuSEVBREVSU19SRUNFSVZFRFxuXHQgICAgICAgICAgICB0aGF0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZWFkeXN0YXRlY2hhbmdlJyAvKiwgZmFsc2UsIGZhbHNlLCB0aGF0Ki8gKSlcblx0ICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0LkxPQURJTkdcblx0ICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVhZHlzdGF0ZWNoYW5nZScgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpXG5cblx0ICAgICAgICAgICAgdGhhdC5zdGF0dXMgPSAyMDBcblx0ICAgICAgICAgICAgdGhhdC5zdGF0dXNUZXh0ID0gSFRUUF9TVEFUVVNfQ09ERVNbMjAwXVxuXG5cdCAgICAgICAgICAgIC8vIGZpeCAjOTIgIzkzIGJ5IEBxZGRlZ3R5YVxuXHQgICAgICAgICAgICB0aGF0LnJlc3BvbnNlID0gdGhhdC5yZXNwb25zZVRleHQgPSBKU09OLnN0cmluZ2lmeShcblx0ICAgICAgICAgICAgICAgIGNvbnZlcnQodGhhdC5jdXN0b20udGVtcGxhdGUsIHRoYXQuY3VzdG9tLm9wdGlvbnMpLFxuXHQgICAgICAgICAgICAgICAgbnVsbCwgNFxuXHQgICAgICAgICAgICApXG5cblx0ICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0LkRPTkVcblx0ICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVhZHlzdGF0ZWNoYW5nZScgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpXG5cdCAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvYWQnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKTtcblx0ICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZGVuZCcgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpO1xuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1hYm9ydCgpLW1ldGhvZFxuXHQgICAgLy8gQ2FuY2VscyBhbnkgbmV0d29yayBhY3Rpdml0eS5cblx0ICAgIGFib3J0OiBmdW5jdGlvbiBhYm9ydCgpIHtcblx0ICAgICAgICAvLyDljp/nlJ8gWEhSXG5cdCAgICAgICAgaWYgKCF0aGlzLm1hdGNoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuY3VzdG9tLnhoci5hYm9ydCgpXG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIOaLpuaIqiBYSFJcblx0ICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBNb2NrWE1MSHR0cFJlcXVlc3QuVU5TRU5UXG5cdCAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnYWJvcnQnLCBmYWxzZSwgZmFsc2UsIHRoaXMpKVxuXHQgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Vycm9yJywgZmFsc2UsIGZhbHNlLCB0aGlzKSlcblx0ICAgIH1cblx0fSlcblxuXHQvLyDliJ3lp4vljJYgUmVzcG9uc2Ug55u45YWz55qE5bGe5oCn5ZKM5pa55rOVXG5cdFV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsIHtcblx0ICAgIHJlc3BvbnNlVVJMOiAnJyxcblx0ICAgIHN0YXR1czogTW9ja1hNTEh0dHBSZXF1ZXN0LlVOU0VOVCxcblx0ICAgIHN0YXR1c1RleHQ6ICcnLFxuXHQgICAgLy8gaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtZ2V0cmVzcG9uc2VoZWFkZXIoKS1tZXRob2Rcblx0ICAgIGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbihuYW1lKSB7XG5cdCAgICAgICAgLy8g5Y6f55SfIFhIUlxuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXN0b20ueGhyLmdldFJlc3BvbnNlSGVhZGVyKG5hbWUpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5oum5oiqIFhIUlxuXHQgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbS5yZXNwb25zZUhlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXVxuXHQgICAgfSxcblx0ICAgIC8vIGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLWdldGFsbHJlc3BvbnNlaGVhZGVycygpLW1ldGhvZFxuXHQgICAgLy8gaHR0cDovL3d3dy51dGY4LWNoYXJ0YWJsZS5kZS9cblx0ICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgLy8g5Y6f55SfIFhIUlxuXHQgICAgICAgIGlmICghdGhpcy5tYXRjaCkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXN0b20ueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8g5oum5oiqIFhIUlxuXHQgICAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSB0aGlzLmN1c3RvbS5yZXNwb25zZUhlYWRlcnNcblx0ICAgICAgICB2YXIgaGVhZGVycyA9ICcnXG5cdCAgICAgICAgZm9yICh2YXIgaCBpbiByZXNwb25zZUhlYWRlcnMpIHtcblx0ICAgICAgICAgICAgaWYgKCFyZXNwb25zZUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaCkpIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIGhlYWRlcnMgKz0gaCArICc6ICcgKyByZXNwb25zZUhlYWRlcnNbaF0gKyAnXFxyXFxuJ1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gaGVhZGVyc1xuXHQgICAgfSxcblx0ICAgIG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCAvKm1pbWUqLyApIHt9LFxuXHQgICAgcmVzcG9uc2VUeXBlOiAnJywgLy8gJycsICd0ZXh0JywgJ2FycmF5YnVmZmVyJywgJ2Jsb2InLCAnZG9jdW1lbnQnLCAnanNvbidcblx0ICAgIHJlc3BvbnNlOiBudWxsLFxuXHQgICAgcmVzcG9uc2VUZXh0OiAnJyxcblx0ICAgIHJlc3BvbnNlWE1MOiBudWxsXG5cdH0pXG5cblx0Ly8gRXZlbnRUYXJnZXRcblx0VXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwge1xuXHQgICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGUpIHtcblx0ICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5jdXN0b20uZXZlbnRzXG5cdCAgICAgICAgaWYgKCFldmVudHNbdHlwZV0pIGV2ZW50c1t0eXBlXSA9IFtdXG5cdCAgICAgICAgZXZlbnRzW3R5cGVdLnB1c2goaGFuZGxlKVxuXHQgICAgfSxcblx0ICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlKSB7XG5cdCAgICAgICAgdmFyIGhhbmRsZXMgPSB0aGlzLmN1c3RvbS5ldmVudHNbdHlwZV0gfHwgW11cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgaWYgKGhhbmRsZXNbaV0gPT09IGhhbmRsZSkge1xuXHQgICAgICAgICAgICAgICAgaGFuZGxlcy5zcGxpY2UoaS0tLCAxKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGRpc3BhdGNoRXZlbnQ6IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcblx0ICAgICAgICB2YXIgaGFuZGxlcyA9IHRoaXMuY3VzdG9tLmV2ZW50c1tldmVudC50eXBlXSB8fCBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBoYW5kbGVzW2ldLmNhbGwodGhpcywgZXZlbnQpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmFyIG9udHlwZSA9ICdvbicgKyBldmVudC50eXBlXG5cdCAgICAgICAgaWYgKHRoaXNbb250eXBlXSkgdGhpc1tvbnR5cGVdKGV2ZW50KVxuXHQgICAgfVxuXHR9KVxuXG5cdC8vIEluc3BpcmVkIGJ5IGpRdWVyeVxuXHRmdW5jdGlvbiBjcmVhdGVOYXRpdmVYTUxIdHRwUmVxdWVzdCgpIHtcblx0ICAgIHZhciBpc0xvY2FsID0gZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgdmFyIHJsb2NhbFByb3RvY29sID0gL14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC9cblx0ICAgICAgICB2YXIgcnVybCA9IC9eKFtcXHcuKy1dKzopKD86XFwvXFwvKFteXFwvPyM6XSopKD86OihcXGQrKXwpfCkvXG5cdCAgICAgICAgdmFyIGFqYXhMb2NhdGlvbiA9IGxvY2F0aW9uLmhyZWZcblx0ICAgICAgICB2YXIgYWpheExvY1BhcnRzID0gcnVybC5leGVjKGFqYXhMb2NhdGlvbi50b0xvd2VyQ2FzZSgpKSB8fCBbXVxuXHQgICAgICAgIHJldHVybiBybG9jYWxQcm90b2NvbC50ZXN0KGFqYXhMb2NQYXJ0c1sxXSlcblx0ICAgIH0oKVxuXG5cdCAgICByZXR1cm4gd2luZG93LkFjdGl2ZVhPYmplY3QgP1xuXHQgICAgICAgICghaXNMb2NhbCAmJiBjcmVhdGVTdGFuZGFyZFhIUigpIHx8IGNyZWF0ZUFjdGl2ZVhIUigpKSA6IGNyZWF0ZVN0YW5kYXJkWEhSKClcblxuXHQgICAgZnVuY3Rpb24gY3JlYXRlU3RhbmRhcmRYSFIoKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuX1hNTEh0dHBSZXF1ZXN0KCk7XG5cdCAgICAgICAgfSBjYXRjaCAoZSkge31cblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gY3JlYXRlQWN0aXZlWEhSKCkge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgd2luZG93Ll9BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XG5cdCAgICAgICAgfSBjYXRjaCAoZSkge31cblx0ICAgIH1cblx0fVxuXG5cblx0Ly8g5p+l5om+5LiO6K+35rGC5Y+C5pWw5Yy56YWN55qE5pWw5o2u5qih5p2/77yaVVJM77yMVHlwZVxuXHRmdW5jdGlvbiBmaW5kKG9wdGlvbnMpIHtcblxuXHQgICAgZm9yICh2YXIgc1VybFR5cGUgaW4gTW9ja1hNTEh0dHBSZXF1ZXN0Lk1vY2suX21vY2tlZCkge1xuXHQgICAgICAgIHZhciBpdGVtID0gTW9ja1hNTEh0dHBSZXF1ZXN0Lk1vY2suX21vY2tlZFtzVXJsVHlwZV1cblx0ICAgICAgICBpZiAoXG5cdCAgICAgICAgICAgICghaXRlbS5ydXJsIHx8IG1hdGNoKGl0ZW0ucnVybCwgb3B0aW9ucy51cmwpKSAmJlxuXHQgICAgICAgICAgICAoIWl0ZW0ucnR5cGUgfHwgbWF0Y2goaXRlbS5ydHlwZSwgb3B0aW9ucy50eXBlLnRvTG93ZXJDYXNlKCkpKVxuXHQgICAgICAgICkge1xuXHQgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnW21vY2tdJywgb3B0aW9ucy51cmwsICc+JywgaXRlbS5ydXJsKVxuXHQgICAgICAgICAgICByZXR1cm4gaXRlbVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gbWF0Y2goZXhwZWN0ZWQsIGFjdHVhbCkge1xuXHQgICAgICAgIGlmIChVdGlsLnR5cGUoZXhwZWN0ZWQpID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWQgPT09IGFjdHVhbFxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoVXRpbC50eXBlKGV4cGVjdGVkKSA9PT0gJ3JlZ2V4cCcpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHR9XG5cblx0Ly8g5pWw5o2u5qih5p2/IO+8nT4g5ZON5bqU5pWw5o2uXG5cdGZ1bmN0aW9uIGNvbnZlcnQoaXRlbSwgb3B0aW9ucykge1xuXHQgICAgcmV0dXJuIFV0aWwuaXNGdW5jdGlvbihpdGVtLnRlbXBsYXRlKSA/XG5cdCAgICAgICAgaXRlbS50ZW1wbGF0ZShvcHRpb25zKSA6IE1vY2tYTUxIdHRwUmVxdWVzdC5Nb2NrLm1vY2soaXRlbS50ZW1wbGF0ZSlcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gTW9ja1hNTEh0dHBSZXF1ZXN0XG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9tb2NranMvZGlzdC9tb2NrLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9