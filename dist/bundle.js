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
    console.log(app.options.people);
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
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

var defaultOptions = {
    container: null, //创建canvas的容器，如果不填，自动在 body 上创建覆盖全屏的层
    people: [], // 人
    backgroundImage: undefined, // 背景图
    imgScale: 1, // 放大倍数
    imgX: 0, // 背景图拒canvas原点X方向距离
    imgY: 0, // 背景图拒canvas原点Y方向距离
    pointerX: 0,
    pointerY: 0,
    animation: undefined
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
        key: 'updateCanvas',


        /**
         * @public 
         * @desc 单次重绘canvas
         * @param {*} context 
         */
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

            container.appendChild(mapCanvas);
            container.appendChild(moveCanvas);
            container.appendChild(peopleCanvas);

            this.mapCanvas = mapCanvas;
            this.moveCanvas = moveCanvas;
            this.peopleCanvas = peopleCanvas;
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            var _this = this;

            var $container = this.container;
            var judgeBorder = function judgeBorder() {
                // 边界检测
                var _mapCanvas$getBoundin = _this.mapCanvas.getBoundingClientRect(),
                    width = _mapCanvas$getBoundin.width,
                    height = _mapCanvas$getBoundin.height;

                if (_this.options.imgX > 0) {
                    _this.options.imgX = 0;
                }
                if (_this.options.imgY > 0) {
                    _this.options.imgY = 0;
                }
                if (_this.options.imgY - height < -_this.bgImg.height * _this.options.imgScale) {
                    _this.options.imgY = -_this.bgImg.height * _this.options.imgScale + height;
                }
                if (_this.options.imgX - width < -_this.bgImg.width * _this.options.imgScale) {
                    _this.options.imgX = -_this.bgImg.width * _this.options.imgScale + width;
                }
            };
            // 地图缩放
            $container.addEventListener('mousewheel', function (event) {
                var _mapCanvas$getBoundin2 = _this.mapCanvas.getBoundingClientRect(),
                    width = _mapCanvas$getBoundin2.width,
                    height = _mapCanvas$getBoundin2.height;

                var pos = _this.windowToCanvas(_this.mapCanvas, event.clientX, event.clientY);
                var wheelDelta = event.wheelDelta ? event.wheelDelta : event.deltaY * -40;
                if (wheelDelta > 0) {
                    // 放大
                    if (_this.bgImg.width * _this.options.imgScale * 2 <= _this.bgImg.width * 8 || _this.bgImg.height * _this.options.imgScale * 2 <= _this.bgImg.height * 8) {
                        // 放大边界判断
                        _this.options.imgScale *= 2;
                        _this.options.imgX = _this.options.imgX * 2 - pos.x;
                        _this.options.imgY = _this.options.imgY * 2 - pos.y;
                    } else return;
                } else {
                    // 缩小
                    if (_this.bgImg.width * _this.options.imgScale / 2 >= width || _this.bgImg.height * _this.options.imgScale / 2 >= height) {
                        // 缩小边界判断
                        _this.options.imgScale /= 2;
                        _this.options.imgX = _this.options.imgX * 0.5 + pos.x * 0.5;
                        _this.options.imgY = _this.options.imgY * 0.5 + pos.y * 0.5;
                    } else return;
                }
                judgeBorder();
                _this.drawMap();
                _this.drawPeople();
                _this.clearCanvas(_this.moveCanvas.getContext('2d'));
                if (_this.isShowPath) _this.drawMove();
            });
            // 地图移动
            $container.addEventListener('mousedown', function (event) {
                var that = _this;
                var pos = _this.windowToCanvas(_this.mapCanvas, event.clientX, event.clientY);
                var mousemoveListener = function mousemoveListener(event) {
                    $container.style.cursor = "move";
                    var pos1 = _this.windowToCanvas(_this.mapCanvas, event.clientX, event.clientY);
                    var x = pos1.x - pos.x;
                    var y = pos1.y - pos.y;
                    pos = pos1;
                    _this.options.imgX += x;
                    _this.options.imgY += y;
                    _this.drawMap();
                    _this.drawPeople();
                    _this.clearCanvas(_this.moveCanvas.getContext('2d'));
                    if (_this.isShowPath) _this.drawMove();
                };
                var mouseupListener = function mouseupListener(event) {
                    judgeBorder();
                    _this.drawMap();
                    _this.drawPeople();
                    _this.clearCanvas(_this.moveCanvas.getContext('2d'));
                    if (_this.isShowPath) _this.drawMove();
                    $container.removeEventListener('mousemove', mousemoveListener);
                    $container.removeEventListener('mouseup', mouseupListener);
                    $container.style.cursor = "default";
                };
                $container.addEventListener('mousemove', mousemoveListener);
                $container.addEventListener('mouseup', mouseupListener);
                $container.addEventListener('mouseleave', mouseupListener);
            });
            $container.addEventListener('mousemove', function () {
                var _mapCanvas$getBoundin3 = _this.mapCanvas.getBoundingClientRect(),
                    height = _mapCanvas$getBoundin3.height;

                var pos = _this.windowToCanvas(_this.mapCanvas, event.clientX, event.clientY);
                _this.options.pointerX = pos.x;
                _this.options.pointerY = pos.y;
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
            var _this2 = this;

            var img = new Image();
            img.src = this.options.backgroundImage;
            this.bgImg = img;
            img.addEventListener('load', function () {
                _this2.drawMap();
            });
        }
    }, {
        key: 'loadPeopleImg',
        value: function loadPeopleImg() {
            var _this3 = this;

            var img = new Image();
            img.src = this.options.peopleImage;
            this.peopleImage = img;
            img.addEventListener('load', function () {
                _this3.drawPeople();
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
            var _this4 = this;

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
                    // last = {
                    //     x: last.x * this.options.imgScale + this.options.imgX,
                    //     y: last.y * this.options.imgScale + this.options.imgY
                    // }
                    // current = {
                    //     x: current.x * this.options.imgScale + this.options.imgX,
                    //     y: current.y * this.options.imgScale + this.options.imgY
                    // }
                    // 切换左下角为坐标原点
                    last = {
                        x: last.x * _this4.options.imgScale + _this4.options.imgX,
                        y: (height - last.y) * _this4.options.imgScale + _this4.options.imgY
                    };
                    current = {
                        x: current.x * _this4.options.imgScale + _this4.options.imgX,
                        y: (height - current.y) * _this4.options.imgScale + _this4.options.imgY
                    };
                    console.log(last);
                    console.log(current);
                    drawLine(context, color, last.x, last.y, current.x, current.y);
                }
            });
        }
    }, {
        key: 'drawPeople',
        value: function drawPeople() {
            var _this5 = this;

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
                // position = {
                //     x: position.x * options.imgScale - peopleImgWidth / 2 + this.options.imgX,
                //     y: position.y * options.imgScale - peopleImgHeight / 2 + this.options.imgY
                // }
                // 切换左下角为坐标原点
                position = {
                    x: position.x * options.imgScale + _this5.options.imgX - peopleImgWidth / 2,
                    y: (height - position.y) * options.imgScale + _this5.options.imgY - peopleImgHeight / 2
                };
                context.drawImage(peopleImage, position.x, position.y, peopleImgWidth, peopleImgHeight);
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
                peopleCanvas = this.peopleCanvas;

            var _mapCanvas$getBoundin6 = this.mapCanvas.getBoundingClientRect(),
                width = _mapCanvas$getBoundin6.width,
                height = _mapCanvas$getBoundin6.height;

            if (context) {
                context.clearRect(0, 0, width, height);
            } else {
                mapCanvas.clearRect(0, 0, width, height);
                moveCanvas.clearRect(0, 0, width, height);
                peopleCanvas.clearRect(0, 0, width, height);
            }
        }
    }, {
        key: 'run',
        value: function run() {
            var _this6 = this;

            // 动画
            if (this.options.animation) return;
            var step = function step() {
                _this6.updateCanvas('people');
                _this6.updateCanvas('move');
                _this6.options.animation = requestAnimationFrame(step);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3NjQ0NmQyODY3Njk5YzhjMzNlNCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyJdLCJuYW1lcyI6WyIkYXBwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJGJnIiwiJHBlb3BsZSIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJwZW9wbGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJnZXRBdHRyaWJ1dGUiLCJwZW9wbGVJbWFnZSIsImFwcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsIngiLCJ5IiwicHVzaCIsIm5hbWUiLCJjb2xvciIsIm1vdmUiLCJ1cGRhdGVDYW52YXMiLCJzaG93UGF0aCIsImNvbnNvbGUiLCJsb2ciLCIkcnVsZXIiLCJpbm5lckhUTUwiLCJpbWdTY2FsZSIsIiRwb2ludGVyWCIsIiRwb2ludGVyWSIsInBvaW50ZXJYIiwicG9pbnRlclkiLCJtb2NrU2VydmVyMSIsInNldEludGVydmFsIiwiZm9yRWFjaCIsInBlcnNvbiIsImluZGV4IiwibGVuZ3RoIiwibGFzdCIsIm5leHQiLCJtb2NrU2VydmVyMiIsIm1vY2tTZXJ2ZXIzIiwiZHJhd0xpbmUiLCJjdHgiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInN0cm9rZVN0eWxlIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiY2xvc2VQYXRoIiwiZGVmYXVsdE9wdGlvbnMiLCJ1bmRlZmluZWQiLCJpbWdYIiwiaW1nWSIsImFuaW1hdGlvbiIsIkFwcCIsImlzU2hvd1BhdGgiLCJyZW5kZXIiLCJsb2FkQmdJbWciLCJsb2FkUGVvcGxlSW1nIiwiZHJhd01vdmUiLCJhZGRFdmVudCIsInJ1biIsImNvbnRleHQiLCJkcmF3TWFwIiwiZHJhd1Blb3BsZSIsImNsZWFyQ2FudmFzIiwibW92ZUNhbnZhcyIsImdldENvbnRleHQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJsaW5lSGVpZ2h0Iiwib3ZlcmZsb3ciLCJiYWNrZ3JvdW5kQ29sb3IiLCJiZ0NvbG9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwibWFwQ2FudmFzIiwic2V0QXR0cmlidXRlIiwiY2xvbmVOb2RlIiwicGVvcGxlQ2FudmFzIiwiJGNvbnRhaW5lciIsImp1ZGdlQm9yZGVyIiwiYmdJbWciLCJwb3MiLCJ3aW5kb3dUb0NhbnZhcyIsImV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJ3aGVlbERlbHRhIiwiZGVsdGFZIiwidGhhdCIsIm1vdXNlbW92ZUxpc3RlbmVyIiwiY3Vyc29yIiwicG9zMSIsIm1vdXNldXBMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYW52YXMiLCJiYm94IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJkcmF3SW1hZ2UiLCJjdXJyZW50IiwicGVvcGxlSW1nV2lkdGgiLCJwZW9wbGVJbWdIZWlnaHQiLCJjbGVhclJlY3QiLCJzdGVwIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidmFsIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVB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dUVBQXVFLFlBQVksZUFBZSxnQkFBZ0IsMkNBQTJDLFlBQVksZUFBZSxjQUFjLDREQUE0RCxZQUFZLGVBQWUsY0FBYyxrQkFBa0IsRUFBRSx1Q0FBdUMsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLHlDQUF5QyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsWUFBWSxlQUFlLGNBQWMseUVBQXlFLEVBQUUsV0FBVyxZQUFZLGVBQWUsY0FBYyw4QkFBOEIsTUFBTSxRQUFRLElBQUksNENBQTRDLFlBQVksZUFBZSxjQUFjLDRHQUE0RyxjQUFjLGlCQUFpQixXQUFXLHFFQUFxRSx5QkFBeUIsWUFBWSxtQkFBbUIsS0FBSyxpQkFBaUIsbUJBQW1CLDJDQUEyQyxzREFBc0QsNkVBQTZFLFlBQVksZUFBZSxhQUFhLHVHQUF1RyxZQUFZLGVBQWUsY0FBYyw0SEFBNEgsNERBQTRELFlBQVksZUFBZSxjQUFjLHVFQUF1RSxzSkFBc0osWUFBWSxlQUFlLGNBQWMsaUNBQWlDLHdDQUF3QyxzQkFBc0Isd0ZBQXdGLE1BQU0sWUFBWSxlQUFlLGNBQWMsZUFBZSxTQUFTLGdCQUFnQixXQUFXLGtDQUFrQyxXQUFXLHlFQUF5RSxnRUFBZ0UsbUJBQW1CLFlBQVksR0FBRyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1bmRsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJidW5kbGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NjQ0NmQyODY3Njk5YzhjMzNlNCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4zJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBBcHAgZnJvbSAnLi9kcmF3LmpzJ1xyXG5pbXBvcnQge1xyXG4gICAgcmFuZG9tTnVtLFxyXG4gICAgcmFuZG9tQ29sb3JcclxufSBmcm9tICdvdXRpbHMnO1xyXG5jb25zdCAkYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpXHJcbmNvbnN0ICRiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiZycpXHJcbmNvbnN0ICRwZW9wbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVvcGxlJylcclxuXHJcblxyXG5jb25zdCBvcHRpb25zID0ge1xyXG4gICAgY29udGFpbmVyOiAkYXBwLFxyXG4gICAgcGVvcGxlOiBbXSxcclxuICAgIGJhY2tncm91bmRJbWFnZTogJGJnLmdldEF0dHJpYnV0ZSgnc3JjJyksXHJcbiAgICBwZW9wbGVJbWFnZTogJHBlb3BsZS5nZXRBdHRyaWJ1dGUoJ3NyYycpXHJcbn1cclxubGV0IGFwcCA9IG5ldyBBcHAob3B0aW9ucylcclxuXHJcbi8vIOa3u+WKoOacuuWZqOS6ulxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9hZGQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGxldCB7XHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0XHJcbiAgICB9ID0gJGFwcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCB4ID0gcmFuZG9tTnVtKDAsIHdpZHRoKVxyXG4gICAgbGV0IHkgPSByYW5kb21OdW0oMCwgaGVpZ2h0KVxyXG4gICAgb3B0aW9ucy5wZW9wbGUucHVzaCh7XHJcbiAgICAgICAgbmFtZTogJ3l4bCcsXHJcbiAgICAgICAgY29sb3I6IHJhbmRvbUNvbG9yKCksXHJcbiAgICAgICAgbW92ZTogW3tcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeVxyXG4gICAgICAgIH1dXHJcbiAgICB9KVxyXG4gICAgLy8g6YeN57uY6L2o6L+577yM5Lq6XHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdwZW9wbGUnKVxyXG4gICAgYXBwLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbn0pXHJcblxyXG4vLyDmmK/lkKblsZXnpLrov5Dliqjovajov7lcclxuYXBwLnNob3dQYXRoID0gdHJ1ZVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9zaG93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhhcHAub3B0aW9ucy5wZW9wbGUpXHJcbiAgICBhcHAuc2hvd1BhdGggPSB0cnVlXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfaGlkZGVuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhcHAuc2hvd1BhdGggPSBmYWxzZVxyXG4gICAgYXBwLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbn0pXHJcblxyXG4vLyDmr5TkvovlsLpcclxuY29uc3QgJHJ1bGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfcnVsZXInKVxyXG4kcnVsZXIuaW5uZXJIVE1MID0gYHgke2FwcC5vcHRpb25zLmltZ1NjYWxlfSDlgI1gXHJcbiRhcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsICgpID0+IHtcclxuICAgICRydWxlci5pbm5lckhUTUwgPSBgeCR7YXBwLm9wdGlvbnMuaW1nU2NhbGV9IOWAjWBcclxufSlcclxuXHJcbi8vIOm8oOagh+WdkOagh1xyXG5jb25zdCAkcG9pbnRlclggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9wb2ludGVyLXgnKVxyXG5jb25zdCAkcG9pbnRlclkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9wb2ludGVyLXknKVxyXG4kYXBwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcclxuICAgICRwb2ludGVyWC5pbm5lckhUTUwgPSBgWDoke2FwcC5vcHRpb25zLnBvaW50ZXJYfWBcclxuICAgICRwb2ludGVyWS5pbm5lckhUTUwgPSBgWToke2FwcC5vcHRpb25zLnBvaW50ZXJZfWBcclxufSlcclxuXHJcbi8vIOaVsOaNruaooeaLn+WZqFxyXG5sZXQgbW9ja1NlcnZlcjEgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4gICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTEwLCAxMCksXHJcbiAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtMTAsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgfSk7XHJcbn0sIDUwMClcclxubGV0IG1vY2tTZXJ2ZXIyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbiAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC0xMCwgMTApLFxyXG4gICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTEwLCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuICAgIH0pO1xyXG59LCAzMDApXHJcbmxldCBtb2NrU2VydmVyMyA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4gICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbiAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtMTAsIDEwKSxcclxuICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC0xMCwgMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbiAgICB9KTtcclxufSwgMTAwMClcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvL+eUu+e6v+autVxyXG5mdW5jdGlvbiBkcmF3TGluZShjdHgsIGNvbG9yLCB4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKHgxLCB5MSk7XHJcbiAgICBjdHgubGluZVRvKHgyLCB5Mik7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgY29udGFpbmVyOiBudWxsLCAvL+WIm+W7umNhbnZhc+eahOWuueWZqO+8jOWmguaenOS4jeWhq++8jOiHquWKqOWcqCBib2R5IOS4iuWIm+W7uuimhuebluWFqOWxj+eahOWxglxyXG4gICAgcGVvcGxlOiBbXSwgLy8g5Lq6XHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6IHVuZGVmaW5lZCwgLy8g6IOM5pmv5Zu+XHJcbiAgICBpbWdTY2FsZTogMSwgLy8g5pS+5aSn5YCN5pWwXHJcbiAgICBpbWdYOiAwLCAvLyDog4zmma/lm77mi5JjYW52YXPljp/ngrlY5pa55ZCR6Led56a7XHJcbiAgICBpbWdZOiAwLCAvLyDog4zmma/lm77mi5JjYW52YXPljp/ngrlZ5pa55ZCR6Led56a7XHJcbiAgICBwb2ludGVyWDogMCxcclxuICAgIHBvaW50ZXJZOiAwLFxyXG4gICAgYW5pbWF0aW9uOiB1bmRlZmluZWRcclxufTtcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93UGF0aCA9IGZhbHNlOyAvLyDmmK/lkKbmmL7npLog6L+Q5Yqo6L2o6L+5XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLmxvYWRCZ0ltZygpO1xyXG4gICAgICAgIHRoaXMubG9hZFBlb3BsZUltZygpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwdWJsaWNcclxuICAgICAqL1xyXG4gICAgc2V0IHNob3dQYXRoKHZhbCkge1xyXG4gICAgICAgIHRoaXMuaXNTaG93UGF0aCA9IHZhbFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHB1YmxpYyBcclxuICAgICAqIEBkZXNjIOWNleasoemHjee7mGNhbnZhc1xyXG4gICAgICogQHBhcmFtIHsqfSBjb250ZXh0IFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVDYW52YXMoY29udGV4dCkge1xyXG4gICAgICAgIC8vIOmHjee7mENhbnZhc1xyXG4gICAgICAgIHN3aXRjaCAoY29udGV4dCkge1xyXG4gICAgICAgICAgICBjYXNlICdtYXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGVvcGxlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21vdmUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhbGwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGlmICghb3B0aW9ucy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb250YWluZXIuc3R5bGUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iZ0NvbG9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIC8v55S75Zyw5Zu+55qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBtYXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKG1hcENhbnZhcy5zdHlsZSwge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgdG9wOiAnMCcsXHJcbiAgICAgICAgICAgIGxlZnQ6ICcwJyxcclxuICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFwQ2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBgJHt3aWR0aH1weGApXHJcbiAgICAgICAgbWFwQ2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YClcclxuXHJcbiAgICAgICAgLy/nlLvovajov7nnur/mnaHnmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IG1vdmVDYW52YXMgPSBtYXBDYW52YXMuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAvL+eUu+S6uueahCBjYW52YXNcclxuICAgICAgICBsZXQgcGVvcGxlQ2FudmFzID0gbWFwQ2FudmFzLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1hcENhbnZhcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwZW9wbGVDYW52YXMpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcENhbnZhcyA9IG1hcENhbnZhcztcclxuICAgICAgICB0aGlzLm1vdmVDYW52YXMgPSBtb3ZlQ2FudmFzO1xyXG4gICAgICAgIHRoaXMucGVvcGxlQ2FudmFzID0gcGVvcGxlQ2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQganVkZ2VCb3JkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOi+ueeVjOajgOa1i1xyXG4gICAgICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1ggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWSAtIGhlaWdodCA8IC10aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAtdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdYIC0gd2lkdGggPCAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWcsOWbvue8qeaUvlxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgd2hlZWxEZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgPyBldmVudC53aGVlbERlbHRhIDogKGV2ZW50LmRlbHRhWSAqICgtNDApKTtcclxuICAgICAgICAgICAgaWYgKHdoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlL7lpKdcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICogMiA8PSB0aGlzLmJnSW1nLndpZHRoICogOCB8fCB0aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqIDIgPD0gdGhpcy5iZ0ltZy5oZWlnaHQgKiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pS+5aSn6L6555WM5Yik5patXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1NjYWxlICo9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWCAqIDIgLSBwb3MueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMiAtIHBvcy55O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g57yp5bCPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvIDIgPj0gd2lkdGggfHwgdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLyAyID49IGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOe8qeWwj+i+ueeVjOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gdGhpcy5vcHRpb25zLmltZ1ggKiAwLjUgKyBwb3MueCAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMC41ICsgcG9zLnkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAganVkZ2VCb3JkZXIoKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDlnLDlm77np7vliqhcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgbGV0IG1vdXNlbW92ZUxpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcIm1vdmVcIjtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MxID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBvczEueCAtIHBvcy54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwb3MxLnkgLSBwb3MueTtcclxuICAgICAgICAgICAgICAgIHBvcyA9IHBvczE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCArPSB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgKz0geTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaG93UGF0aCkgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtb3VzZXVwTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBqdWRnZUJvcmRlcigpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBMaXN0ZW5lcilcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWCA9IHBvcy54XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2ludGVyWSA9IHBvcy55XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3dUb0NhbnZhcyhjYW52YXMsIHgsIHkpIHtcclxuICAgICAgICBsZXQgYmJveCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiB4IC0gYmJveC5sZWZ0IC0gKGJib3gud2lkdGggLSBjYW52YXMud2lkdGgpIC8gMixcclxuICAgICAgICAgICAgeTogeSAtIGJib3gudG9wIC0gKGJib3guaGVpZ2h0IC0gY2FudmFzLmhlaWdodCkgLyAyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQmdJbWcoKSB7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgIHRoaXMuYmdJbWcgPSBpbWdcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgbG9hZFBlb3BsZUltZygpIHtcclxuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMub3B0aW9ucy5wZW9wbGVJbWFnZTtcclxuICAgICAgICB0aGlzLnBlb3BsZUltYWdlID0gaW1nXHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg55S76IOM5pmv5Zyw5Zu+XHJcbiAgICAgKi9cclxuICAgIGRyYXdNYXAoKSB7XHJcbiAgICAgICAgbGV0IGltZ1NjYWxlID0gdGhpcy5vcHRpb25zLmltZ1NjYWxlO1xyXG4gICAgICAgIGxldCBpbWdYID0gdGhpcy5vcHRpb25zLmltZ1g7XHJcbiAgICAgICAgbGV0IGltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWTtcclxuICAgICAgICBsZXQgaW1nID0gdGhpcy5iZ0ltZztcclxuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5tYXBDYW52YXM7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1hcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoY29udGV4dClcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCwgaW1nWCwgaW1nWSwgaW1nLndpZHRoICogaW1nU2NhbGUsIGltZy5oZWlnaHQgKiBpbWdTY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd01vdmUoKSB7XHJcbiAgICAgICAgLy/nlLvnp7vliqjovajov7lcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZSxcclxuICAgICAgICAgICAgY29sb3JcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50LCBsYXN0O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW92ZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbW92ZVstLWluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgJ3JlZCdcclxuICAgICAgICAgICAgICAgIC8vIGxhc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeDogbGFzdC54ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1gsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeTogbGFzdC55ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1lcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGN1cnJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeDogY3VycmVudC54ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1gsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgeTogY3VycmVudC55ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1lcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIOWIh+aNouW3puS4i+inkuS4uuWdkOagh+WOn+eCuVxyXG4gICAgICAgICAgICAgICAgbGFzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBsYXN0LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiAoaGVpZ2h0IC0gbGFzdC55KSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnQueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IChoZWlnaHQgLSBjdXJyZW50LnkpICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1lcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhc3QpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50KVxyXG4gICAgICAgICAgICAgICAgZHJhd0xpbmUoY29udGV4dCwgY29sb3IsIGxhc3QueCwgbGFzdC55LCBjdXJyZW50LngsIGN1cnJlbnQueSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQZW9wbGUoKSB7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLFxyXG4gICAgICAgICAgICBwZW9wbGVJbWFnZVxyXG4gICAgICAgIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBwZW9wbGVJbWdXaWR0aCA9IDMwO1xyXG4gICAgICAgIGxldCBwZW9wbGVJbWdIZWlnaHQgPSA0MztcclxuICAgICAgICBsZXQgY29udGV4dCA9IHBlb3BsZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGNvbnRleHQpO1xyXG4gICAgICAgIG9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZVxyXG4gICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gbW92ZVttb3ZlLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAvLyAgICAgeDogcG9zaXRpb24ueCAqIG9wdGlvbnMuaW1nU2NhbGUgLSBwZW9wbGVJbWdXaWR0aCAvIDIgKyB0aGlzLm9wdGlvbnMuaW1nWCxcclxuICAgICAgICAgICAgLy8gICAgIHk6IHBvc2l0aW9uLnkgKiBvcHRpb25zLmltZ1NjYWxlIC0gcGVvcGxlSW1nSGVpZ2h0IC8gMiArIHRoaXMub3B0aW9ucy5pbWdZXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8g5YiH5o2i5bem5LiL6KeS5Li65Z2Q5qCH5Y6f54K5XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeDogcG9zaXRpb24ueCAqIG9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCAtIHBlb3BsZUltZ1dpZHRoIC8gMixcclxuICAgICAgICAgICAgICAgIHk6IChoZWlnaHQgLSBwb3NpdGlvbi55KSAqIG9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWSAtIHBlb3BsZUltZ0hlaWdodCAvIDJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShwZW9wbGVJbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcGVvcGxlSW1nV2lkdGgsIHBlb3BsZUltZ0hlaWdodCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZGVzYyDmuIXpmaR7Y29udGV4dH3nlLvluINcclxuICAgICAqIEBwYXJhbSB7Kn0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgY2xlYXJDYW52YXMoY29udGV4dCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcyxcclxuICAgICAgICAgICAgbW92ZUNhbnZhcyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzXHJcbiAgICAgICAgfSA9IHRoaXNcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIG1vdmVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICAvLyDliqjnlLtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbikgcmV0dXJuXHJcbiAgICAgICAgbGV0IHN0ZXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FudmFzKCdwZW9wbGUnKVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmltYXRpb24gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZHJhdy5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSx0KTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLm91dGlscz10KCk6ZS5vdXRpbHM9dCgpfSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQobyl7aWYobltvXSlyZXR1cm4gbltvXS5leHBvcnRzO3ZhciByPW5bb109e2k6byxsOiExLGV4cG9ydHM6e319O3JldHVybiBlW29dLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLHQpLHIubD0hMCxyLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4sbyl7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpvfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz01KX0oW2Z1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3JldHVybiBuZXcgUmVnRXhwKFwiKFxcXFxzfF4pXCIrdCtcIihcXFxcc3wkKVwiKS50ZXN0KGUuY2xhc3NOYW1lKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCxuKXt2YXIgbz1uZXcgRGF0ZTtvLnNldERhdGUoby5nZXREYXRlKCkrbiksZG9jdW1lbnQuY29va2llPWUrXCI9XCIrdCtcIjtleHBpcmVzPVwiK299ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3JldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQmJmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuIHdpbmRvdy5zY3JvbGxUbygwLGUpLGV9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLG8pe2Z1bmN0aW9uIHIoKXtmdW5jdGlvbiByKCl7YT1OdW1iZXIobmV3IERhdGUpLG4uYXBwbHkoZixzKX1mdW5jdGlvbiB1KCl7aT12b2lkIDB9dmFyIGY9dGhpcyxjPU51bWJlcihuZXcgRGF0ZSktYSxzPWFyZ3VtZW50cztvJiYhaSYmcigpLGkmJmNsZWFyVGltZW91dChpKSx2b2lkIDA9PT1vJiZjPmU/cigpOiEwIT09dCYmKGk9c2V0VGltZW91dChvP3U6cix2b2lkIDA9PT1vP2UtYzplKSl9dmFyIGksYT0wO3JldHVyblwiYm9vbGVhblwiIT10eXBlb2YgdCYmKG89bixuPXQsdD12b2lkIDApLHJ9fSxmdW5jdGlvbihlLHQsbil7dmFyIG89big2KSxyPW4oNyksaT1uKDApLGE9big4KSx1PW4oOSksZj1uKDEwKSxjPW4oMSkscz1uKDExKSxwPW4oMTIpLGQ9bigyKSxsPW4oMTMpLG09bigxNCksdj1uKDMpLHc9bigxNSksZz1uKDE2KSx5PW4oNCksaD1uKDE3KSx4PW4oMTgpLGI9bigxOSksQz1uKDIwKSxOPW4oMjEpLFM9bigyMiksTT1uKDIzKSxFPW4oMjQpLEY9bigyNSksRD1uKDI2KSxJPW4oMjcpLFQ9bigyOCksaz1uKDI5KSxSPW4oMzApLEE9bigzMSk7ZS5leHBvcnRzPXthcnJheUVxdWFsOm8sYWRkQ2xhc3M6cixoYXNDbGFzczppLHJlbW92ZUNsYXNzOmEsZ2V0Q29va2llOnUscmVtb3ZlQ29va2llOmYsc2V0Q29va2llOmMsZ2V0T1M6cyxnZXRFeHBsb3JlOnAsZ2V0U2Nyb2xsVG9wOmQsb2Zmc2V0Omwsc2Nyb2xsVG86bSxzZXRTY3JvbGxUb3A6dix3aW5kb3dSZXNpemU6dyxkZWJvdW5jZTpnLHRocm90dGxlOnksZ2V0S2V5TmFtZTpoLGRlZXBDbG9uZTp4LGlzRW1wdHlPYmplY3Q6YixyYW5kb21Db2xvcjpDLHJhbmRvbU51bTpOLGlzRW1haWw6Uyxpc0lkQ2FyZDpNLGlzUGhvbmVOdW06RSxpc1VybDpGLGRpZ2l0VXBwZXJjYXNlOkQsaXNTdXBwb3J0V2ViUDpJLGZvcm1hdFBhc3NUaW1lOlQsZm9ybWF0UmVtYWluVGltZTprLHBhcnNlUXVlcnlTdHJpbmc6UixzdHJpbmdmeVF1ZXJ5U3RyaW5nOkF9fSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtpZihlPT09dClyZXR1cm4hMDtpZihlLmxlbmd0aCE9dC5sZW5ndGgpcmV0dXJuITE7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDsrK24paWYoZVtuXSE9PXRbbl0pcmV0dXJuITE7cmV0dXJuITB9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCl7cihlLHQpfHwoZS5jbGFzc05hbWUrPVwiIFwiK3QpfXZhciByPW4oMCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCl7aWYocihlLHQpKXt2YXIgbj1uZXcgUmVnRXhwKFwiKFxcXFxzfF4pXCIrdCtcIihcXFxcc3wkKVwiKTtlLmNsYXNzTmFtZT1lLmNsYXNzTmFtZS5yZXBsYWNlKG4sXCIgXCIpfX12YXIgcj1uKDApO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7Zm9yKHZhciB0PWRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC9cXHMvZyxcIlwiKS5zcGxpdChcIjtcIiksbj0wO248dC5sZW5ndGg7bisrKXt2YXIgbz10W25dLnNwbGl0KFwiPVwiKTtpZihvWzBdPT1lKXJldHVybiBkZWNvZGVVUklDb21wb25lbnQob1sxXSl9cmV0dXJuXCJcIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSl7cihlLFwiMVwiLC0xKX12YXIgcj1uKDEpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXt2YXIgZT1cIm5hdmlnYXRvclwiaW4gd2luZG93JiZcInVzZXJBZ2VudFwiaW4gbmF2aWdhdG9yJiZuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCl8fFwiXCIsdD0oXCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJ2ZW5kb3JcImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLnZlbmRvci50b0xvd2VyQ2FzZSgpLFwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwiYXBwVmVyc2lvblwiaW4gbmF2aWdhdG9yJiZuYXZpZ2F0b3IuYXBwVmVyc2lvbi50b0xvd2VyQ2FzZSgpfHxcIlwiKTtyZXR1cm4vbWFjL2kudGVzdCh0KT9cIk1hY09TWFwiOi93aW4vaS50ZXN0KHQpP1wid2luZG93c1wiOi9saW51eC9pLnRlc3QodCk/XCJsaW51eFwiOigvaXBob25lL2kudGVzdChlKXx8L2lwYWQvaS50ZXN0KGUpfHwvaXBvZC9pLnRlc3QoZSksL2FuZHJvaWQvaS50ZXN0KGUpP1wiYW5kcm9pZFwiOi93aW4vaS50ZXN0KHQpJiYvcGhvbmUvaS50ZXN0KGUpP1wid2luZG93c1Bob25lXCI6dm9pZCAwKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7dmFyIGUsdD17fSxuPW5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtyZXR1cm4oZT1uLm1hdGNoKC9ydjooW1xcZC5dKylcXCkgbGlrZSBnZWNrby8pKT90LmllPWVbMV06KGU9bi5tYXRjaCgvbXNpZSAoW1xcZFxcLl0rKS8pKT90LmllPWVbMV06KGU9bi5tYXRjaCgvZWRnZVxcLyhbXFxkXFwuXSspLykpP3QuZWRnZT1lWzFdOihlPW4ubWF0Y2goL2ZpcmVmb3hcXC8oW1xcZFxcLl0rKS8pKT90LmZpcmVmb3g9ZVsxXTooZT1uLm1hdGNoKC8oPzpvcGVyYXxvcHIpLihbXFxkXFwuXSspLykpP3Qub3BlcmE9ZVsxXTooZT1uLm1hdGNoKC9jaHJvbWVcXC8oW1xcZFxcLl0rKS8pKT90LmNocm9tZT1lWzFdOihlPW4ubWF0Y2goL3ZlcnNpb25cXC8oW1xcZFxcLl0rKS4qc2FmYXJpLykpJiYodC5zYWZhcmk9ZVsxXSksdC5pZT9cIklFOiBcIit0LmllOnQuZWRnZT9cIkVER0U6IFwiK3QuZWRnZTp0LmZpcmVmb3g/XCJGaXJlZm94OiBcIit0LmZpcmVmb3g6dC5jaHJvbWU/XCJDaHJvbWU6IFwiK3QuY2hyb21lOnQub3BlcmE/XCJPcGVyYTogXCIrdC5vcGVyYTp0LnNhZmFyaT9cIlNhZmFyaTogXCIrdC5zYWZhcmk6XCJVbmtvbnduXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9e2xlZnQ6MCx0b3A6MH07ZTspdC5sZWZ0Kz1lLm9mZnNldExlZnQsdC50b3ArPWUub2Zmc2V0VG9wLGU9ZS5vZmZzZXRQYXJlbnQ7cmV0dXJuIHR9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCl7aWYodDwwKXJldHVybiB2b2lkIGkoZSk7dmFyIG49ZS1yKCk7aWYoMCE9PW4pe3ZhciBhPW4vdCoxMDtyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtpZihNYXRoLmFicyhhKT5NYXRoLmFicyhuKSlyZXR1cm4gdm9pZCBpKHIoKStuKTtpKHIoKSthKSxuPjAmJnIoKT49ZXx8bjwwJiZyKCk8PWV8fG8oZSx0LTE2KX0pfX12YXIgcj1uKDIpLGk9bigzKTshZnVuY3Rpb24oKXt3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfSgpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXt2YXIgbj13aW5kb3cuaW5uZXJIZWlnaHQ7ZT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2U6ZnVuY3Rpb24oKXt9LHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgdD90OmZ1bmN0aW9uKCl7fSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGZ1bmN0aW9uKCl7dmFyIG89d2luZG93LmlubmVySGVpZ2h0O289PT1uJiZlKCksbzxuJiZ0KCl9KX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0LG4pe3JldHVybiB2b2lkIDA9PT1uP3IoZSx0LCExKTpyKGUsbiwhMSE9PXQpfXZhciByPW4oNCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4gb1tlXT9vW2VdOihjb25zb2xlLmxvZyhcIlVua25vdyBLZXkoS2V5IENvZGU6XCIrZStcIilcIiksXCJcIil9dmFyIG89ezg6XCJCYWNrc3BhY2VcIiw5OlwiVGFiXCIsMTM6XCJFbnRlclwiLDE2OlwiU2hpZnRcIiwxNzpcIkN0cmxcIiwxODpcIkFsdFwiLDE5OlwiUGF1c2VcIiwyMDpcIkNhcHMgTG9ja1wiLDI3OlwiRXNjYXBlXCIsMzI6XCJTcGFjZVwiLDMzOlwiUGFnZSBVcFwiLDM0OlwiUGFnZSBEb3duXCIsMzU6XCJFbmRcIiwzNjpcIkhvbWVcIiwzNzpcIkxlZnRcIiwzODpcIlVwXCIsMzk6XCJSaWdodFwiLDQwOlwiRG93blwiLDQyOlwiUHJpbnQgU2NyZWVuXCIsNDU6XCJJbnNlcnRcIiw0NjpcIkRlbGV0ZVwiLDQ4OlwiMFwiLDQ5OlwiMVwiLDUwOlwiMlwiLDUxOlwiM1wiLDUyOlwiNFwiLDUzOlwiNVwiLDU0OlwiNlwiLDU1OlwiN1wiLDU2OlwiOFwiLDU3OlwiOVwiLDY1OlwiQVwiLDY2OlwiQlwiLDY3OlwiQ1wiLDY4OlwiRFwiLDY5OlwiRVwiLDcwOlwiRlwiLDcxOlwiR1wiLDcyOlwiSFwiLDczOlwiSVwiLDc0OlwiSlwiLDc1OlwiS1wiLDc2OlwiTFwiLDc3OlwiTVwiLDc4OlwiTlwiLDc5OlwiT1wiLDgwOlwiUFwiLDgxOlwiUVwiLDgyOlwiUlwiLDgzOlwiU1wiLDg0OlwiVFwiLDg1OlwiVVwiLDg2OlwiVlwiLDg3OlwiV1wiLDg4OlwiWFwiLDg5OlwiWVwiLDkwOlwiWlwiLDkxOlwiV2luZG93c1wiLDkzOlwiUmlnaHQgQ2xpY2tcIiw5NjpcIk51bXBhZCAwXCIsOTc6XCJOdW1wYWQgMVwiLDk4OlwiTnVtcGFkIDJcIiw5OTpcIk51bXBhZCAzXCIsMTAwOlwiTnVtcGFkIDRcIiwxMDE6XCJOdW1wYWQgNVwiLDEwMjpcIk51bXBhZCA2XCIsMTAzOlwiTnVtcGFkIDdcIiwxMDQ6XCJOdW1wYWQgOFwiLDEwNTpcIk51bXBhZCA5XCIsMTA2OlwiTnVtcGFkICpcIiwxMDc6XCJOdW1wYWQgK1wiLDEwOTpcIk51bXBhZCAtXCIsMTEwOlwiTnVtcGFkIC5cIiwxMTE6XCJOdW1wYWQgL1wiLDExMjpcIkYxXCIsMTEzOlwiRjJcIiwxMTQ6XCJGM1wiLDExNTpcIkY0XCIsMTE2OlwiRjVcIiwxMTc6XCJGNlwiLDExODpcIkY3XCIsMTE5OlwiRjhcIiwxMjA6XCJGOVwiLDEyMTpcIkYxMFwiLDEyMjpcIkYxMVwiLDEyMzpcIkYxMlwiLDE0NDpcIk51bSBMb2NrXCIsMTQ1OlwiU2Nyb2xsIExvY2tcIiwxODI6XCJNeSBDb21wdXRlclwiLDE4MzpcIk15IENhbGN1bGF0b3JcIiwxODY6XCI7XCIsMTg3OlwiPVwiLDE4ODpcIixcIiwxODk6XCItXCIsMTkwOlwiLlwiLDE5MTpcIi9cIiwxOTI6XCJgXCIsMjE5OlwiW1wiLDIyMDpcIlxcXFxcIiwyMjE6XCJdXCIsMjIyOlwiJ1wifTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0O2lmKG51bGw9PWV8fFwib2JqZWN0XCIhPSh2b2lkIDA9PT1lP1widW5kZWZpbmVkXCI6byhlKSkpcmV0dXJuIGU7aWYoZSBpbnN0YW5jZW9mIERhdGUpcmV0dXJuIHQ9bmV3IERhdGUsdC5zZXRUaW1lKGUuZ2V0VGltZSgpKSx0O2lmKGUgaW5zdGFuY2VvZiBBcnJheSl7dD1bXTtmb3IodmFyIHI9MCxpPWUubGVuZ3RoO3I8aTtyKyspdFtyXT1uKGVbcl0pO3JldHVybiB0fWlmKGUgaW5zdGFuY2VvZiBPYmplY3Qpe3Q9e307Zm9yKHZhciBhIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShhKSYmKHRbYV09bihlW2FdKSk7cmV0dXJuIHR9dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGNvcHkgdmFsdWVzISBJdHMgdHlwZSBpc24ndCBzdXBwb3J0ZWQuXCIpfXZhciBvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9O2UuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuISghZXx8XCJvYmplY3RcIiE9PSh2b2lkIDA9PT1lP1widW5kZWZpbmVkXCI6byhlKSl8fEFycmF5LmlzQXJyYXkoZSkpJiYhT2JqZWN0LmtleXMoZSkubGVuZ3RofXZhciBvPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9O2UuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm5cIiNcIisoXCIwMDAwMFwiKygxNjc3NzIxNipNYXRoLnJhbmRvbSgpPDwwKS50b1N0cmluZygxNikpLnNsaWNlKC02KX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoodC1lKzEpKStlfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL1xcdysoWy0rLl1cXHcrKSpAXFx3KyhbLS5dXFx3KykqXFwuXFx3KyhbLS5dXFx3KykqLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL14oXlsxLTldXFxkezd9KCgwXFxkKXwoMVswLTJdKSkoKFswfDF8Ml1cXGQpfDNbMC0xXSlcXGR7M30kKXwoXlsxLTldXFxkezV9WzEtOV1cXGR7M30oKDBcXGQpfCgxWzAtMl0pKSgoWzB8MXwyXVxcZCl8M1swLTFdKSgoXFxkezR9KXxcXGR7M31bWHhdKSQpJC8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9eKDB8ODZ8MTc5NTEpPygxM1swLTldfDE1WzAxMjM1Njc4OV18MTdbNjc4XXwxOFswLTldfDE0WzU3XSlbMC05XXs4fSQvLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vWy1hLXpBLVowLTlAOiUuX1xcK34jPV17MiwyNTZ9XFwuW2Etel17Miw2fVxcYihbLWEtekEtWjAtOUA6JV9cXCsufiM/JlxcL1xcLz1dKikvaS50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9W1wi6KeSXCIsXCLliIZcIl0sbj1bXCLpm7ZcIixcIuWjuVwiLFwi6LSwXCIsXCLlj4FcIixcIuiChlwiLFwi5LyNXCIsXCLpmYZcIixcIuafklwiLFwi5o2MXCIsXCLnjpZcIl0sbz1bW1wi5YWDXCIsXCLkuIdcIixcIuS6v1wiXSxbXCJcIixcIuaLvlwiLFwi5L2wXCIsXCLku59cIl1dLHI9ZTwwP1wi5qygXCI6XCJcIjtlPU1hdGguYWJzKGUpO2Zvcih2YXIgaT1cIlwiLGE9MDthPHQubGVuZ3RoO2ErKylpKz0obltNYXRoLmZsb29yKDEwKmUqTWF0aC5wb3coMTAsYSkpJTEwXSt0W2FdKS5yZXBsYWNlKC/pm7YuLyxcIlwiKTtpPWl8fFwi5pW0XCIsZT1NYXRoLmZsb29yKGUpO2Zvcih2YXIgYT0wO2E8b1swXS5sZW5ndGgmJmU+MDthKyspe2Zvcih2YXIgdT1cIlwiLGY9MDtmPG9bMV0ubGVuZ3RoJiZlPjA7ZisrKXU9bltlJTEwXStvWzFdW2ZdK3UsZT1NYXRoLmZsb29yKGUvMTApO2k9dS5yZXBsYWNlKC8o6Zu2Likq6Zu2JC8sXCJcIikucmVwbGFjZSgvXiQvLFwi6Zu2XCIpK29bMF1bYV0raX1yZXR1cm4gcitpLnJlcGxhY2UoLyjpm7YuKSrpm7blhYMvLFwi5YWDXCIpLnJlcGxhY2UoLyjpm7YuKSsvZyxcIumbtlwiKS5yZXBsYWNlKC9e5pW0JC8sXCLpm7blhYPmlbRcIil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3JldHVybiEhW10ubWFwJiYwPT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLnRvRGF0YVVSTChcImltYWdlL3dlYnBcIikuaW5kZXhPZihcImRhdGE6aW1hZ2Uvd2VicFwiKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PURhdGUucGFyc2UobmV3IERhdGUpLG49dC1lLG89cGFyc2VJbnQobi84NjRlNSkscj1wYXJzZUludChuLzM2ZTUpLGk9cGFyc2VJbnQobi82ZTQpLGE9cGFyc2VJbnQoby8zMCksdT1wYXJzZUludChhLzEyKTtyZXR1cm4gdT91K1wi5bm05YmNXCI6YT9hK1wi5Liq5pyI5YmNXCI6bz9vK1wi5aSp5YmNXCI6cj9yK1wi5bCP5pe25YmNXCI6aT9pK1wi5YiG6ZKf5YmNXCI6XCLliJrliJpcIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PW5ldyBEYXRlLG49bmV3IERhdGUoZSksbz1uLmdldFRpbWUoKS10LmdldFRpbWUoKSxyPTAsaT0wLGE9MCx1PTA7cmV0dXJuIG8+PTAmJihyPU1hdGguZmxvb3Ioby8xZTMvMzYwMC8yNCksaT1NYXRoLmZsb29yKG8vMWUzLzYwLzYwJTI0KSxhPU1hdGguZmxvb3Ioby8xZTMvNjAlNjApLHU9TWF0aC5mbG9vcihvLzFlMyU2MCkpLHIrXCLlpKkgXCIraStcIuWwj+aXtiBcIithK1wi5YiG6ZKfIFwiK3UrXCLnp5JcIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2U9bnVsbD09ZT93aW5kb3cubG9jYXRpb24uaHJlZjplO3ZhciB0PWUuc3Vic3RyaW5nKGUubGFzdEluZGV4T2YoXCI/XCIpKzEpO3JldHVybiB0P0pTT04ucGFyc2UoJ3tcIicrZGVjb2RlVVJJQ29tcG9uZW50KHQpLnJlcGxhY2UoL1wiL2csJ1xcXFxcIicpLnJlcGxhY2UoLyYvZywnXCIsXCInKS5yZXBsYWNlKC89L2csJ1wiOlwiJykrJ1wifScpOnt9fWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7aWYoIWUpcmV0dXJuXCJcIjt2YXIgdD1bXTtmb3IodmFyIG4gaW4gZSl7dmFyIG89ZVtuXTtpZihvIGluc3RhbmNlb2YgQXJyYXkpZm9yKHZhciByPTA7cjxvLmxlbmd0aDsrK3IpdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuK1wiW1wiK3IrXCJdXCIpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChvW3JdKSk7ZWxzZSB0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG4pK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChlW25dKSl9cmV0dXJuIHQuam9pbihcIiZcIil9ZS5leHBvcnRzPW59XSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vdXRpbHMvbWluL291dGlscy5taW4uanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=