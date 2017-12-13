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


var _stringify = __webpack_require__(45);

var _stringify2 = _interopRequireDefault(_stringify);

var _draw = __webpack_require__(12);

var _draw2 = _interopRequireDefault(_draw);

var _outils = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $app = document.querySelector('#app');
var $bg = document.querySelector('#bg');
var $people = document.querySelector('#people');
var $ruler = document.querySelector('.J_ruler');

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
$ruler.innerHTML = 'x' + app.options.imgScale + ' \u500D';
$app.addEventListener('mousewheel', function () {
    $ruler.innerHTML = 'x' + app.options.imgScale + ' \u500D';
});

// 动画
var animation = void 0;
var step = function step() {
    app.updateCanvas('people');
    app.updateCanvas('move');
    animation = requestAnimationFrame(step);
};
animation = requestAnimationFrame(step);

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

setTimeout(function () {
    console.log((0, _stringify2.default)(app.options.people));
}, 5000);

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
    imgScale: 1,
    imgX: 0,
    imgY: 0
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
    }

    (0, _createClass3.default)(App, [{
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
                    drawLine(context, color, last.x * _this4.options.imgScale + _this4.options.imgX, last.y * _this4.options.imgScale + _this4.options.imgY, current.x * _this4.options.imgScale + _this4.options.imgX, current.y * _this4.options.imgScale + _this4.options.imgY);
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

            var context = peopleCanvas.getContext('2d');
            this.clearCanvas(context);
            options.people.forEach(function (_ref2) {
                var move = _ref2.move;

                // let position = {
                //     x,
                //     y
                // }
                var position = move[move.length - 1];
                context.drawImage(peopleImage, position.x * options.imgScale - 16 + _this5.options.imgX, position.y * options.imgScale - 16 + _this5.options.imgY, 30, 43);
                // context.drawImage(peopleImage, 0, 0, peopleImage.width * options.imgScale, peopleImage.height * options.imgScale, person.x * options.imgScale, person.y * options.imgScale, peopleImage.width * options.imgScale, peopleImage.height * options.imgScale);
            });
        }
        /**
         * @desc 清除{context}画布
         * @param {*} context 
         */

    }, {
        key: 'clearCanvas',
        value: function clearCanvas(context) {
            var mapCanvas = this.mapCanvas,
                moveCanvas = this.moveCanvas,
                peopleCanvas = this.peopleCanvas;

            var _mapCanvas$getBoundin3 = this.mapCanvas.getBoundingClientRect(),
                width = _mapCanvas$getBoundin3.width,
                height = _mapCanvas$getBoundin3.height;

            if (context) {
                context.clearRect(0, 0, width, height);
            } else {
                mapCanvas.clearRect(0, 0, width, height);
                moveCanvas.clearRect(0, 0, width, height);
                peopleCanvas.clearRect(0, 0, width, height);
            }
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

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZmY5NWQwM2ExNWY0YmY4NzNkZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiXSwibmFtZXMiOlsiJGFwcCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRiZyIsIiRwZW9wbGUiLCIkcnVsZXIiLCJvcHRpb25zIiwiY29udGFpbmVyIiwicGVvcGxlIiwiYmFja2dyb3VuZEltYWdlIiwiZ2V0QXR0cmlidXRlIiwicGVvcGxlSW1hZ2UiLCJhcHAiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJ4IiwieSIsInB1c2giLCJuYW1lIiwiY29sb3IiLCJtb3ZlIiwidXBkYXRlQ2FudmFzIiwic2hvd1BhdGgiLCJjb25zb2xlIiwibG9nIiwiaW5uZXJIVE1MIiwiaW1nU2NhbGUiLCJhbmltYXRpb24iLCJzdGVwIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW9ja1NlcnZlcjEiLCJzZXRJbnRlcnZhbCIsImZvckVhY2giLCJwZXJzb24iLCJpbmRleCIsImxlbmd0aCIsImxhc3QiLCJuZXh0IiwibW9ja1NlcnZlcjIiLCJtb2NrU2VydmVyMyIsInNldFRpbWVvdXQiLCJkcmF3TGluZSIsImN0eCIsIngxIiwieTEiLCJ4MiIsInkyIiwic3Ryb2tlU3R5bGUiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJjbG9zZVBhdGgiLCJkZWZhdWx0T3B0aW9ucyIsInVuZGVmaW5lZCIsImltZ1giLCJpbWdZIiwiQXBwIiwiaXNTaG93UGF0aCIsInJlbmRlciIsImxvYWRCZ0ltZyIsImxvYWRQZW9wbGVJbWciLCJkcmF3TW92ZSIsImFkZEV2ZW50IiwiY29udGV4dCIsImRyYXdNYXAiLCJkcmF3UGVvcGxlIiwiY2xlYXJDYW52YXMiLCJtb3ZlQ2FudmFzIiwiZ2V0Q29udGV4dCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImxpbmVIZWlnaHQiLCJvdmVyZmxvdyIsImJhY2tncm91bmRDb2xvciIsImJnQ29sb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJtYXBDYW52YXMiLCJzZXRBdHRyaWJ1dGUiLCJjbG9uZU5vZGUiLCJwZW9wbGVDYW52YXMiLCIkY29udGFpbmVyIiwianVkZ2VCb3JkZXIiLCJiZ0ltZyIsInBvcyIsIndpbmRvd1RvQ2FudmFzIiwiZXZlbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsIndoZWVsRGVsdGEiLCJkZWx0YVkiLCJ0aGF0IiwibW91c2Vtb3ZlTGlzdGVuZXIiLCJjdXJzb3IiLCJwb3MxIiwibW91c2V1cExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImJib3giLCJpbWciLCJJbWFnZSIsInNyYyIsImRyYXdJbWFnZSIsImN1cnJlbnQiLCJjbGVhclJlY3QiLCJ2YWwiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBLGlDQUFpQyxRQUFRLG1CQUFtQixVQUFVLEVBQUUsRUFBRTtBQUMxRSxDQUFDOzs7Ozs7O0FDSEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qzs7Ozs7OztBQ0x6Qyw2QkFBNkI7QUFDN0IsdUNBQXVDOzs7Ozs7O0FDRHZDO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0Esa0ZBQWtGO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGNBQWM7QUFDZCxjQUFjO0FBQ2QsY0FBYztBQUNkLGVBQWU7QUFDZixlQUFlO0FBQ2YsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQjs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTEE7Ozs7QUFDQTs7OztBQUlBLElBQU1BLE9BQU9DLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtBQUNBLElBQU1DLE1BQU1GLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLElBQU1FLFVBQVVILFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBaEI7QUFDQSxJQUFNRyxTQUFTSixTQUFTQyxhQUFULENBQXVCLFVBQXZCLENBQWY7O0FBR0EsSUFBTUksVUFBVTtBQUNaQyxlQUFXUCxJQURDO0FBRVpRLFlBQVEsRUFGSTtBQUdaQyxxQkFBaUJOLElBQUlPLFlBQUosQ0FBaUIsS0FBakIsQ0FITDtBQUlaQyxpQkFBYVAsUUFBUU0sWUFBUixDQUFxQixLQUFyQjtBQUpELENBQWhCO0FBTUEsSUFBSUUsTUFBTSxtQkFBUU4sT0FBUixDQUFWOztBQUVBO0FBQ0FMLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUNXLGdCQUFqQyxDQUFrRCxPQUFsRCxFQUEyRCxZQUFNO0FBQUEsZ0NBSXpEYixLQUFLYyxxQkFBTCxFQUp5RDtBQUFBLFFBRXpEQyxLQUZ5RCx5QkFFekRBLEtBRnlEO0FBQUEsUUFHekRDLE1BSHlELHlCQUd6REEsTUFIeUQ7O0FBSzdELFFBQUlDLElBQUksdUJBQVUsQ0FBVixFQUFhRixLQUFiLENBQVI7QUFDQSxRQUFJRyxJQUFJLHVCQUFVLENBQVYsRUFBYUYsTUFBYixDQUFSO0FBQ0FWLFlBQVFFLE1BQVIsQ0FBZVcsSUFBZixDQUFvQjtBQUNoQkMsY0FBTSxLQURVO0FBRWhCQyxlQUFPLDBCQUZTO0FBR2hCQyxjQUFNLENBQUM7QUFDSEwsZ0JBREc7QUFFSEM7QUFGRyxTQUFEO0FBSFUsS0FBcEI7QUFRQTtBQUNBTixRQUFJVyxZQUFKLENBQWlCLFFBQWpCO0FBQ0FYLFFBQUlXLFlBQUosQ0FBaUIsTUFBakI7QUFDSCxDQWxCRDs7QUFvQkE7QUFDQVgsSUFBSVksUUFBSixHQUFlLElBQWY7QUFDQXZCLFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0NXLGdCQUFsQyxDQUFtRCxPQUFuRCxFQUE0RCxZQUFNO0FBQzlEWSxZQUFRQyxHQUFSLENBQVlkLElBQUlOLE9BQUosQ0FBWUUsTUFBeEI7QUFDQUksUUFBSVksUUFBSixHQUFlLElBQWY7QUFDQVosUUFBSVcsWUFBSixDQUFpQixNQUFqQjtBQUNILENBSkQ7QUFLQXRCLFNBQVNDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0NXLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxZQUFNO0FBQ2hFRCxRQUFJWSxRQUFKLEdBQWUsS0FBZjtBQUNBWixRQUFJVyxZQUFKLENBQWlCLE1BQWpCO0FBQ0gsQ0FIRDs7QUFLQTtBQUNBbEIsT0FBT3NCLFNBQVAsU0FBdUJmLElBQUlOLE9BQUosQ0FBWXNCLFFBQW5DO0FBQ0E1QixLQUFLYSxnQkFBTCxDQUFzQixZQUF0QixFQUFvQyxZQUFNO0FBQ3RDUixXQUFPc0IsU0FBUCxTQUF1QmYsSUFBSU4sT0FBSixDQUFZc0IsUUFBbkM7QUFDSCxDQUZEOztBQUlBO0FBQ0EsSUFBSUMsa0JBQUo7QUFDQSxJQUFJQyxPQUFPLFNBQVBBLElBQU8sR0FBTTtBQUNibEIsUUFBSVcsWUFBSixDQUFpQixRQUFqQjtBQUNBWCxRQUFJVyxZQUFKLENBQWlCLE1BQWpCO0FBQ0FNLGdCQUFZRSxzQkFBc0JELElBQXRCLENBQVo7QUFDSCxDQUpEO0FBS0FELFlBQVlFLHNCQUFzQkQsSUFBdEIsQ0FBWjs7QUFHQTtBQUNBLElBQUlFLGNBQWNDLFlBQVksWUFBTTtBQUNoQ3JCLFFBQUlOLE9BQUosQ0FBWUUsTUFBWixDQUFtQjBCLE9BQW5CLENBQTJCLFVBQUNDLE1BQUQsRUFBU0MsS0FBVCxFQUFtQjtBQUMxQyxZQUFJQyxTQUFTRixPQUFPYixJQUFQLENBQVllLE1BQXpCO0FBQ0EsWUFBSUMsT0FBT0gsT0FBT2IsSUFBUCxDQUFZLEVBQUVlLE1BQWQsQ0FBWDtBQUNBLFlBQUlFLE9BQU87QUFDUHRCLGVBQUdxQixLQUFLckIsQ0FBTCxHQUFTLHVCQUFVLENBQUMsRUFBWCxFQUFlLEVBQWYsQ0FETDtBQUVQQyxlQUFHb0IsS0FBS3BCLENBQUwsR0FBUyx1QkFBVSxDQUFDLEVBQVgsRUFBZSxFQUFmO0FBRkwsU0FBWDtBQUlBTixZQUFJTixPQUFKLENBQVlFLE1BQVosQ0FBbUI0QixLQUFuQixFQUEwQmQsSUFBMUIsQ0FBK0JILElBQS9CLENBQW9Db0IsSUFBcEM7QUFDSCxLQVJEO0FBU0gsQ0FWaUIsRUFVZixHQVZlLENBQWxCO0FBV0EsSUFBSUMsY0FBY1AsWUFBWSxZQUFNO0FBQ2hDckIsUUFBSU4sT0FBSixDQUFZRSxNQUFaLENBQW1CMEIsT0FBbkIsQ0FBMkIsVUFBQ0MsTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQzFDLFlBQUlDLFNBQVNGLE9BQU9iLElBQVAsQ0FBWWUsTUFBekI7QUFDQSxZQUFJQyxPQUFPSCxPQUFPYixJQUFQLENBQVksRUFBRWUsTUFBZCxDQUFYO0FBQ0EsWUFBSUUsT0FBTztBQUNQdEIsZUFBR3FCLEtBQUtyQixDQUFMLEdBQVMsdUJBQVUsQ0FBQyxFQUFYLEVBQWUsRUFBZixDQURMO0FBRVBDLGVBQUdvQixLQUFLcEIsQ0FBTCxHQUFTLHVCQUFVLENBQUMsRUFBWCxFQUFlLEVBQWY7QUFGTCxTQUFYO0FBSUFOLFlBQUlOLE9BQUosQ0FBWUUsTUFBWixDQUFtQjRCLEtBQW5CLEVBQTBCZCxJQUExQixDQUErQkgsSUFBL0IsQ0FBb0NvQixJQUFwQztBQUNILEtBUkQ7QUFTSCxDQVZpQixFQVVmLEdBVmUsQ0FBbEI7QUFXQSxJQUFJRSxjQUFjUixZQUFZLFlBQU07QUFDaENyQixRQUFJTixPQUFKLENBQVlFLE1BQVosQ0FBbUIwQixPQUFuQixDQUEyQixVQUFDQyxNQUFELEVBQVNDLEtBQVQsRUFBbUI7QUFDMUMsWUFBSUMsU0FBU0YsT0FBT2IsSUFBUCxDQUFZZSxNQUF6QjtBQUNBLFlBQUlDLE9BQU9ILE9BQU9iLElBQVAsQ0FBWSxFQUFFZSxNQUFkLENBQVg7QUFDQSxZQUFJRSxPQUFPO0FBQ1B0QixlQUFHcUIsS0FBS3JCLENBQUwsR0FBUyx1QkFBVSxDQUFDLEVBQVgsRUFBZSxFQUFmLENBREw7QUFFUEMsZUFBR29CLEtBQUtwQixDQUFMLEdBQVMsdUJBQVUsQ0FBQyxFQUFYLEVBQWUsRUFBZjtBQUZMLFNBQVg7QUFJQU4sWUFBSU4sT0FBSixDQUFZRSxNQUFaLENBQW1CNEIsS0FBbkIsRUFBMEJkLElBQTFCLENBQStCSCxJQUEvQixDQUFvQ29CLElBQXBDO0FBQ0gsS0FSRDtBQVNILENBVmlCLEVBVWYsSUFWZSxDQUFsQjs7QUFZQUcsV0FBVyxZQUFZO0FBQ25CakIsWUFBUUMsR0FBUixDQUFZLHlCQUFlZCxJQUFJTixPQUFKLENBQVlFLE1BQTNCLENBQVo7QUFDSCxDQUZELEVBRUcsSUFGSCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2R0E7QUFDQSxTQUFTbUMsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUJ2QixLQUF2QixFQUE4QndCLEVBQTlCLEVBQWtDQyxFQUFsQyxFQUFzQ0MsRUFBdEMsRUFBMENDLEVBQTFDLEVBQThDO0FBQzFDSixRQUFJSyxXQUFKLEdBQWtCNUIsS0FBbEI7QUFDQXVCLFFBQUlNLFNBQUo7QUFDQU4sUUFBSU8sTUFBSixDQUFXTixFQUFYLEVBQWVDLEVBQWY7QUFDQUYsUUFBSVEsTUFBSixDQUFXTCxFQUFYLEVBQWVDLEVBQWY7QUFDQUosUUFBSVMsTUFBSjtBQUNBVCxRQUFJVSxTQUFKO0FBQ0g7O0FBRUQsSUFBTUMsaUJBQWlCO0FBQ25CaEQsZUFBVyxJQURRLEVBQ0Y7QUFDakJDLFlBQVEsRUFGVyxFQUVQO0FBQ1pDLHFCQUFpQitDLFNBSEUsRUFHUztBQUM1QjVCLGNBQVUsQ0FKUztBQUtuQjZCLFVBQU0sQ0FMYTtBQU1uQkMsVUFBTTtBQU5hLENBQXZCOztJQVNNQyxHO0FBQ0YsbUJBQTBCO0FBQUEsWUFBZHJELE9BQWMsdUVBQUosRUFBSTtBQUFBOztBQUN0QkEsa0JBQVUsc0JBQWMsRUFBZCxFQUFrQmlELGNBQWxCLEVBQWtDakQsT0FBbEMsQ0FBVjtBQUNBLGFBQUtzRCxVQUFMLEdBQWtCLEtBQWxCLENBRnNCLENBRUc7QUFDekIsYUFBS3RELE9BQUwsR0FBZUEsT0FBZjs7QUFFQSxhQUFLdUQsTUFBTDtBQUNBLGFBQUtDLFNBQUw7QUFDQSxhQUFLQyxhQUFMO0FBQ0EsWUFBSSxLQUFLSCxVQUFULEVBQXFCLEtBQUtJLFFBQUw7QUFDckIsYUFBS0MsUUFBTDtBQUVIOzs7O3FDQU1ZQyxPLEVBQVM7QUFDbEI7QUFDQSxvQkFBUUEsT0FBUjtBQUNJLHFCQUFLLEtBQUw7QUFDSSx5QkFBS0MsT0FBTDtBQUNBO0FBQ0oscUJBQUssUUFBTDtBQUNJLHlCQUFLQyxVQUFMO0FBQ0E7QUFDSixxQkFBSyxNQUFMO0FBQ0kseUJBQUtDLFdBQUwsQ0FBaUIsS0FBS0MsVUFBTCxDQUFnQkMsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBakI7QUFDQSx3QkFBSSxLQUFLWCxVQUFULEVBQXFCLEtBQUtJLFFBQUw7QUFDckI7QUFDSixxQkFBSyxLQUFMO0FBQ0kseUJBQUtHLE9BQUw7QUFDQSx5QkFBS0MsVUFBTDtBQUNBLHlCQUFLQyxXQUFMLENBQWlCLEtBQUtDLFVBQUwsQ0FBZ0JDLFVBQWhCLENBQTJCLElBQTNCLENBQWpCO0FBQ0Esd0JBQUksS0FBS1gsVUFBVCxFQUFxQixLQUFLSSxRQUFMO0FBQ3JCO0FBQ0o7QUFDSTtBQWxCUjtBQW9CSDs7O2lDQUVRO0FBQ0wsZ0JBQUkxRCxVQUFVLEtBQUtBLE9BQW5CO0FBQ0EsZ0JBQUlDLFlBQVlELFFBQVFDLFNBQVIsSUFBcUJOLFNBQVN1RSxhQUFULENBQXVCLEtBQXZCLENBQXJDO0FBQ0EsZ0JBQUksQ0FBQ2xFLFFBQVFDLFNBQWIsRUFBd0I7QUFDcEIsc0NBQWNBLFVBQVVrRSxLQUF4QixFQUErQjtBQUMzQkMsOEJBQVUsVUFEaUI7QUFFM0JDLHlCQUFLLENBRnNCO0FBRzNCQywwQkFBTSxDQUhxQjtBQUkzQjdELDJCQUFPLE1BSm9CO0FBSzNCQyw0QkFBUSxNQUxtQjtBQU0zQjZELGdDQUFZLE1BTmU7QUFPM0JDLDhCQUFVLFFBUGlCO0FBUTNCQyxxQ0FBaUJ6RSxRQUFRMEU7QUFSRSxpQkFBL0I7QUFVQS9FLHlCQUFTZ0YsSUFBVCxDQUFjQyxXQUFkLENBQTBCM0UsU0FBMUI7QUFDSDs7QUFFRCxpQkFBS0EsU0FBTCxHQUFpQkEsU0FBakI7O0FBakJLLHdDQXNCREEsVUFBVU8scUJBQVYsRUF0QkM7QUFBQSxnQkFvQkRDLEtBcEJDLHlCQW9CREEsS0FwQkM7QUFBQSxnQkFxQkRDLE1BckJDLHlCQXFCREEsTUFyQkM7O0FBd0JMOzs7QUFDQSxnQkFBSW1FLFlBQVlsRixTQUFTdUUsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBLGtDQUFjVyxVQUFVVixLQUF4QixFQUErQjtBQUMzQkMsMEJBQVUsVUFEaUI7QUFFM0JDLHFCQUFLLEdBRnNCO0FBRzNCQyxzQkFBTSxHQUhxQjtBQUkzQjdELHVCQUFVQSxLQUFWLE9BSjJCO0FBSzNCQyx3QkFBV0EsTUFBWDtBQUwyQixhQUEvQjtBQU9BbUUsc0JBQVVDLFlBQVYsQ0FBdUIsT0FBdkIsRUFBbUNyRSxLQUFuQztBQUNBb0Usc0JBQVVDLFlBQVYsQ0FBdUIsUUFBdkIsRUFBb0NwRSxNQUFwQzs7QUFFQTtBQUNBLGdCQUFJc0QsYUFBYWEsVUFBVUUsU0FBVixDQUFvQixJQUFwQixDQUFqQjs7QUFFQTtBQUNBLGdCQUFJQyxlQUFlSCxVQUFVRSxTQUFWLENBQW9CLElBQXBCLENBQW5COztBQUVBOUUsc0JBQVUyRSxXQUFWLENBQXNCQyxTQUF0QjtBQUNBNUUsc0JBQVUyRSxXQUFWLENBQXNCWixVQUF0QjtBQUNBL0Qsc0JBQVUyRSxXQUFWLENBQXNCSSxZQUF0Qjs7QUFFQSxpQkFBS0gsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxpQkFBS2IsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxpQkFBS2dCLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0g7OzttQ0FFVTtBQUFBOztBQUNQLGdCQUFJQyxhQUFhLEtBQUtoRixTQUF0QjtBQUNBLGdCQUFJaUYsY0FBYyxTQUFkQSxXQUFjLEdBQU07QUFDcEI7QUFEb0IsNENBS2hCLE1BQUtMLFNBQUwsQ0FBZXJFLHFCQUFmLEVBTGdCO0FBQUEsb0JBR2hCQyxLQUhnQix5QkFHaEJBLEtBSGdCO0FBQUEsb0JBSWhCQyxNQUpnQix5QkFJaEJBLE1BSmdCOztBQU1wQixvQkFBSSxNQUFLVixPQUFMLENBQWFtRCxJQUFiLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLDBCQUFLbkQsT0FBTCxDQUFhbUQsSUFBYixHQUFvQixDQUFwQjtBQUNIO0FBQ0Qsb0JBQUksTUFBS25ELE9BQUwsQ0FBYW9ELElBQWIsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkIsMEJBQUtwRCxPQUFMLENBQWFvRCxJQUFiLEdBQW9CLENBQXBCO0FBQ0g7QUFDRCxvQkFBSSxNQUFLcEQsT0FBTCxDQUFhb0QsSUFBYixHQUFvQjFDLE1BQXBCLEdBQTZCLENBQUMsTUFBS3lFLEtBQUwsQ0FBV3pFLE1BQVosR0FBcUIsTUFBS1YsT0FBTCxDQUFhc0IsUUFBbkUsRUFBNkU7QUFDekUsMEJBQUt0QixPQUFMLENBQWFvRCxJQUFiLEdBQW9CLENBQUMsTUFBSytCLEtBQUwsQ0FBV3pFLE1BQVosR0FBcUIsTUFBS1YsT0FBTCxDQUFhc0IsUUFBbEMsR0FBNkNaLE1BQWpFO0FBQ0g7QUFDRCxvQkFBSSxNQUFLVixPQUFMLENBQWFtRCxJQUFiLEdBQW9CMUMsS0FBcEIsR0FBNEIsQ0FBQyxNQUFLMEUsS0FBTCxDQUFXMUUsS0FBWixHQUFvQixNQUFLVCxPQUFMLENBQWFzQixRQUFqRSxFQUEyRTtBQUN2RSwwQkFBS3RCLE9BQUwsQ0FBYW1ELElBQWIsR0FBb0IsQ0FBQyxNQUFLZ0MsS0FBTCxDQUFXMUUsS0FBWixHQUFvQixNQUFLVCxPQUFMLENBQWFzQixRQUFqQyxHQUE0Q2IsS0FBaEU7QUFDSDtBQUNKLGFBbEJEO0FBbUJBO0FBQ0F3RSx1QkFBVzFFLGdCQUFYLENBQTRCLFlBQTVCLEVBQTBDLGlCQUFTO0FBQUEsNkNBSTNDLE1BQUtzRSxTQUFMLENBQWVyRSxxQkFBZixFQUoyQztBQUFBLG9CQUUzQ0MsS0FGMkMsMEJBRTNDQSxLQUYyQztBQUFBLG9CQUczQ0MsTUFIMkMsMEJBRzNDQSxNQUgyQzs7QUFLL0Msb0JBQUkwRSxNQUFNLE1BQUtDLGNBQUwsQ0FBb0IsTUFBS1IsU0FBekIsRUFBb0NTLE1BQU1DLE9BQTFDLEVBQW1ERCxNQUFNRSxPQUF6RCxDQUFWO0FBQ0Esb0JBQUlDLGFBQWFILE1BQU1HLFVBQU4sR0FBbUJILE1BQU1HLFVBQXpCLEdBQXVDSCxNQUFNSSxNQUFOLEdBQWdCLENBQUMsRUFBekU7QUFDQSxvQkFBSUQsYUFBYSxDQUFqQixFQUFvQjtBQUNoQjtBQUNBLHdCQUFJLE1BQUtOLEtBQUwsQ0FBVzFFLEtBQVgsR0FBbUIsTUFBS1QsT0FBTCxDQUFhc0IsUUFBaEMsR0FBMkMsQ0FBM0MsSUFBZ0QsTUFBSzZELEtBQUwsQ0FBVzFFLEtBQVgsR0FBbUIsQ0FBbkUsSUFBd0UsTUFBSzBFLEtBQUwsQ0FBV3pFLE1BQVgsR0FBb0IsTUFBS1YsT0FBTCxDQUFhc0IsUUFBakMsR0FBNEMsQ0FBNUMsSUFBaUQsTUFBSzZELEtBQUwsQ0FBV3pFLE1BQVgsR0FBb0IsQ0FBakosRUFBb0o7QUFDaEo7QUFDQSw4QkFBS1YsT0FBTCxDQUFhc0IsUUFBYixJQUF5QixDQUF6QjtBQUNBLDhCQUFLdEIsT0FBTCxDQUFhbUQsSUFBYixHQUFvQixNQUFLbkQsT0FBTCxDQUFhbUQsSUFBYixHQUFvQixDQUFwQixHQUF3QmlDLElBQUl6RSxDQUFoRDtBQUNBLDhCQUFLWCxPQUFMLENBQWFvRCxJQUFiLEdBQW9CLE1BQUtwRCxPQUFMLENBQWFvRCxJQUFiLEdBQW9CLENBQXBCLEdBQXdCZ0MsSUFBSXhFLENBQWhEO0FBQ0gscUJBTEQsTUFLTztBQUNWLGlCQVJELE1BUU87QUFDSDtBQUNBLHdCQUFJLE1BQUt1RSxLQUFMLENBQVcxRSxLQUFYLEdBQW1CLE1BQUtULE9BQUwsQ0FBYXNCLFFBQWhDLEdBQTJDLENBQTNDLElBQWdEYixLQUFoRCxJQUF5RCxNQUFLMEUsS0FBTCxDQUFXekUsTUFBWCxHQUFvQixNQUFLVixPQUFMLENBQWFzQixRQUFqQyxHQUE0QyxDQUE1QyxJQUFpRFosTUFBOUcsRUFBc0g7QUFDbEg7QUFDQSw4QkFBS1YsT0FBTCxDQUFhc0IsUUFBYixJQUF5QixDQUF6QjtBQUNBLDhCQUFLdEIsT0FBTCxDQUFhbUQsSUFBYixHQUFvQixNQUFLbkQsT0FBTCxDQUFhbUQsSUFBYixHQUFvQixHQUFwQixHQUEwQmlDLElBQUl6RSxDQUFKLEdBQVEsR0FBdEQ7QUFDQSw4QkFBS1gsT0FBTCxDQUFhb0QsSUFBYixHQUFvQixNQUFLcEQsT0FBTCxDQUFhb0QsSUFBYixHQUFvQixHQUFwQixHQUEwQmdDLElBQUl4RSxDQUFKLEdBQVEsR0FBdEQ7QUFDSCxxQkFMRCxNQUtPO0FBQ1Y7QUFDRHNFO0FBQ0Esc0JBQUtyQixPQUFMO0FBQ0Esc0JBQUtDLFVBQUw7QUFDQSxzQkFBS0MsV0FBTCxDQUFpQixNQUFLQyxVQUFMLENBQWdCQyxVQUFoQixDQUEyQixJQUEzQixDQUFqQjtBQUNBLG9CQUFJLE1BQUtYLFVBQVQsRUFBcUIsTUFBS0ksUUFBTDtBQUV4QixhQTlCRDtBQStCQTtBQUNBdUIsdUJBQVcxRSxnQkFBWCxDQUE0QixXQUE1QixFQUF5QyxpQkFBUztBQUM5QyxvQkFBSW9GLFlBQUo7QUFDQSxvQkFBSVAsTUFBTSxNQUFLQyxjQUFMLENBQW9CLE1BQUtSLFNBQXpCLEVBQW9DUyxNQUFNQyxPQUExQyxFQUFtREQsTUFBTUUsT0FBekQsQ0FBVjtBQUNBLG9CQUFJSSxvQkFBb0IsU0FBcEJBLGlCQUFvQixRQUFTO0FBQzdCWCwrQkFBV2QsS0FBWCxDQUFpQjBCLE1BQWpCLEdBQTBCLE1BQTFCO0FBQ0Esd0JBQUlDLE9BQU8sTUFBS1QsY0FBTCxDQUFvQixNQUFLUixTQUF6QixFQUFvQ1MsTUFBTUMsT0FBMUMsRUFBbURELE1BQU1FLE9BQXpELENBQVg7QUFDQSx3QkFBSTdFLElBQUltRixLQUFLbkYsQ0FBTCxHQUFTeUUsSUFBSXpFLENBQXJCO0FBQ0Esd0JBQUlDLElBQUlrRixLQUFLbEYsQ0FBTCxHQUFTd0UsSUFBSXhFLENBQXJCO0FBQ0F3RSwwQkFBTVUsSUFBTjtBQUNBLDBCQUFLOUYsT0FBTCxDQUFhbUQsSUFBYixJQUFxQnhDLENBQXJCO0FBQ0EsMEJBQUtYLE9BQUwsQ0FBYW9ELElBQWIsSUFBcUJ4QyxDQUFyQjtBQUNBLDBCQUFLaUQsT0FBTDtBQUNBLDBCQUFLQyxVQUFMO0FBQ0EsMEJBQUtDLFdBQUwsQ0FBaUIsTUFBS0MsVUFBTCxDQUFnQkMsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FBakI7QUFDQSx3QkFBSSxNQUFLWCxVQUFULEVBQXFCLE1BQUtJLFFBQUw7QUFDeEIsaUJBWkQ7QUFhQSxvQkFBSXFDLGtCQUFrQixTQUFsQkEsZUFBa0IsUUFBUztBQUMzQmI7QUFDQSwwQkFBS3JCLE9BQUw7QUFDQSwwQkFBS0MsVUFBTDtBQUNBLDBCQUFLQyxXQUFMLENBQWlCLE1BQUtDLFVBQUwsQ0FBZ0JDLFVBQWhCLENBQTJCLElBQTNCLENBQWpCO0FBQ0Esd0JBQUksTUFBS1gsVUFBVCxFQUFxQixNQUFLSSxRQUFMO0FBQ3JCdUIsK0JBQVdlLG1CQUFYLENBQStCLFdBQS9CLEVBQTRDSixpQkFBNUM7QUFDQVgsK0JBQVdlLG1CQUFYLENBQStCLFNBQS9CLEVBQTBDRCxlQUExQztBQUNBZCwrQkFBV2QsS0FBWCxDQUFpQjBCLE1BQWpCLEdBQTBCLFNBQTFCO0FBQ0gsaUJBVEQ7QUFVQVosMkJBQVcxRSxnQkFBWCxDQUE0QixXQUE1QixFQUF5Q3FGLGlCQUF6QztBQUNBWCwyQkFBVzFFLGdCQUFYLENBQTRCLFNBQTVCLEVBQXVDd0YsZUFBdkM7QUFDSCxhQTVCRDtBQTZCSDs7O3VDQUVjRSxNLEVBQVF0RixDLEVBQUdDLEMsRUFBRztBQUN6QixnQkFBSXNGLE9BQU9ELE9BQU96RixxQkFBUCxFQUFYO0FBQ0EsbUJBQU87QUFDSEcsbUJBQUdBLElBQUl1RixLQUFLNUIsSUFBVCxHQUFnQixDQUFDNEIsS0FBS3pGLEtBQUwsR0FBYXdGLE9BQU94RixLQUFyQixJQUE4QixDQUQ5QztBQUVIRyxtQkFBR0EsSUFBSXNGLEtBQUs3QixHQUFULEdBQWUsQ0FBQzZCLEtBQUt4RixNQUFMLEdBQWN1RixPQUFPdkYsTUFBdEIsSUFBZ0M7QUFGL0MsYUFBUDtBQUlIOzs7b0NBRVc7QUFBQTs7QUFDUixnQkFBSXlGLE1BQU0sSUFBSUMsS0FBSixFQUFWO0FBQ0FELGdCQUFJRSxHQUFKLEdBQVUsS0FBS3JHLE9BQUwsQ0FBYUcsZUFBdkI7QUFDQSxpQkFBS2dGLEtBQUwsR0FBYWdCLEdBQWI7QUFDQUEsZ0JBQUk1RixnQkFBSixDQUFxQixNQUFyQixFQUE2QixZQUFNO0FBQy9CLHVCQUFLc0QsT0FBTDtBQUNILGFBRkQ7QUFHSDs7O3dDQUNlO0FBQUE7O0FBQ1osZ0JBQUlzQyxNQUFNLElBQUlDLEtBQUosRUFBVjtBQUNBRCxnQkFBSUUsR0FBSixHQUFVLEtBQUtyRyxPQUFMLENBQWFLLFdBQXZCO0FBQ0EsaUJBQUtBLFdBQUwsR0FBbUI4RixHQUFuQjtBQUNBQSxnQkFBSTVGLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLFlBQU07QUFDL0IsdUJBQUt1RCxVQUFMO0FBQ0gsYUFGRDtBQUdIO0FBQ0Q7Ozs7OztrQ0FHVTtBQUNOLGdCQUFJeEMsV0FBVyxLQUFLdEIsT0FBTCxDQUFhc0IsUUFBNUI7QUFDQSxnQkFBSTZCLE9BQU8sS0FBS25ELE9BQUwsQ0FBYW1ELElBQXhCO0FBQ0EsZ0JBQUlDLE9BQU8sS0FBS3BELE9BQUwsQ0FBYW9ELElBQXhCO0FBQ0EsZ0JBQUkrQyxNQUFNLEtBQUtoQixLQUFmO0FBQ0EsZ0JBQUljLFNBQVMsS0FBS3BCLFNBQWxCO0FBQ0EsZ0JBQUlqQixVQUFVLEtBQUtpQixTQUFMLENBQWVaLFVBQWYsQ0FBMEIsSUFBMUIsQ0FBZDtBQUNBLGlCQUFLRixXQUFMLENBQWlCSCxPQUFqQjtBQUNBQSxvQkFBUTBDLFNBQVIsQ0FBa0JILEdBQWxCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCQSxJQUFJMUYsS0FBakMsRUFBd0MwRixJQUFJekYsTUFBNUMsRUFBb0R5QyxJQUFwRCxFQUEwREMsSUFBMUQsRUFBZ0UrQyxJQUFJMUYsS0FBSixHQUFZYSxRQUE1RSxFQUFzRjZFLElBQUl6RixNQUFKLEdBQWFZLFFBQW5HO0FBQ0g7OzttQ0FFVTtBQUFBOztBQUNQO0FBQ0EsZ0JBQUlzQyxVQUFVLEtBQUtJLFVBQUwsQ0FBZ0JDLFVBQWhCLENBQTJCLElBQTNCLENBQWQ7QUFDQSxpQkFBS2pFLE9BQUwsQ0FBYUUsTUFBYixDQUFvQjBCLE9BQXBCLENBQTRCLGdCQUd0QjtBQUFBLG9CQUZGWixJQUVFLFFBRkZBLElBRUU7QUFBQSxvQkFERkQsS0FDRSxRQURGQSxLQUNFOztBQUNGLG9CQUFJd0YsZ0JBQUo7QUFBQSxvQkFBYXZFLGFBQWI7QUFDQSxxQkFBSyxJQUFJRixLQUFULElBQWtCZCxJQUFsQixFQUF3QjtBQUNwQnVGLDhCQUFVdkYsS0FBS2MsS0FBTCxDQUFWO0FBQ0Esd0JBQUlBLFVBQVUsR0FBZCxFQUFtQjtBQUNmRSwrQkFBT2hCLEtBQUtjLEtBQUwsQ0FBUDtBQUNILHFCQUZELE1BRU87QUFDSEUsK0JBQU9oQixLQUFLLEVBQUVjLEtBQVAsQ0FBUDtBQUNIO0FBQ0Qsd0JBQUksQ0FBQ2YsS0FBTCxFQUFZO0FBQ1pzQiw2QkFBU3VCLE9BQVQsRUFBa0I3QyxLQUFsQixFQUF5QmlCLEtBQUtyQixDQUFMLEdBQVMsT0FBS1gsT0FBTCxDQUFhc0IsUUFBdEIsR0FBaUMsT0FBS3RCLE9BQUwsQ0FBYW1ELElBQXZFLEVBQTZFbkIsS0FBS3BCLENBQUwsR0FBUyxPQUFLWixPQUFMLENBQWFzQixRQUF0QixHQUFpQyxPQUFLdEIsT0FBTCxDQUFhb0QsSUFBM0gsRUFBaUltRCxRQUFRNUYsQ0FBUixHQUFZLE9BQUtYLE9BQUwsQ0FBYXNCLFFBQXpCLEdBQW9DLE9BQUt0QixPQUFMLENBQWFtRCxJQUFsTCxFQUF3TG9ELFFBQVEzRixDQUFSLEdBQVksT0FBS1osT0FBTCxDQUFhc0IsUUFBekIsR0FBb0MsT0FBS3RCLE9BQUwsQ0FBYW9ELElBQXpPO0FBQ0g7QUFDSixhQWZEO0FBZ0JIOzs7cUNBRVk7QUFBQTs7QUFBQSxnQkFFTHBELE9BRkssR0FLTCxJQUxLLENBRUxBLE9BRks7QUFBQSxnQkFHTGdGLFlBSEssR0FLTCxJQUxLLENBR0xBLFlBSEs7QUFBQSxnQkFJTDNFLFdBSkssR0FLTCxJQUxLLENBSUxBLFdBSks7O0FBTVQsZ0JBQUl1RCxVQUFVb0IsYUFBYWYsVUFBYixDQUF3QixJQUF4QixDQUFkO0FBQ0EsaUJBQUtGLFdBQUwsQ0FBaUJILE9BQWpCO0FBQ0E1RCxvQkFBUUUsTUFBUixDQUFlMEIsT0FBZixDQUF1QixpQkFFakI7QUFBQSxvQkFERlosSUFDRSxTQURGQSxJQUNFOztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQUlvRCxXQUFXcEQsS0FBS0EsS0FBS2UsTUFBTCxHQUFjLENBQW5CLENBQWY7QUFDQTZCLHdCQUFRMEMsU0FBUixDQUFrQmpHLFdBQWxCLEVBQStCK0QsU0FBU3pELENBQVQsR0FBYVgsUUFBUXNCLFFBQXJCLEdBQWdDLEVBQWhDLEdBQXFDLE9BQUt0QixPQUFMLENBQWFtRCxJQUFqRixFQUF1RmlCLFNBQVN4RCxDQUFULEdBQWFaLFFBQVFzQixRQUFyQixHQUFnQyxFQUFoQyxHQUFxQyxPQUFLdEIsT0FBTCxDQUFhb0QsSUFBekksRUFBK0ksRUFBL0ksRUFBbUosRUFBbko7QUFDQTtBQUNILGFBVkQ7QUFXSDtBQUNEOzs7Ozs7O29DQUlZUSxPLEVBQVM7QUFBQSxnQkFFYmlCLFNBRmEsR0FLYixJQUxhLENBRWJBLFNBRmE7QUFBQSxnQkFHYmIsVUFIYSxHQUtiLElBTGEsQ0FHYkEsVUFIYTtBQUFBLGdCQUliZ0IsWUFKYSxHQUtiLElBTGEsQ0FJYkEsWUFKYTs7QUFBQSx5Q0FTYixLQUFLSCxTQUFMLENBQWVyRSxxQkFBZixFQVRhO0FBQUEsZ0JBT2JDLEtBUGEsMEJBT2JBLEtBUGE7QUFBQSxnQkFRYkMsTUFSYSwwQkFRYkEsTUFSYTs7QUFVakIsZ0JBQUlrRCxPQUFKLEVBQWE7QUFDVEEsd0JBQVE0QyxTQUFSLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCL0YsS0FBeEIsRUFBK0JDLE1BQS9CO0FBQ0gsYUFGRCxNQUVPO0FBQ0htRSwwQkFBVTJCLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIvRixLQUExQixFQUFpQ0MsTUFBakM7QUFDQXNELDJCQUFXd0MsU0FBWCxDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQi9GLEtBQTNCLEVBQWtDQyxNQUFsQztBQUNBc0UsNkJBQWF3QixTQUFiLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCL0YsS0FBN0IsRUFBb0NDLE1BQXBDO0FBQ0g7QUFDSjs7OzBCQXhRWStGLEcsRUFBSztBQUNkLGlCQUFLbkQsVUFBTCxHQUFrQm1ELEdBQWxCO0FBQ0g7Ozs7O2tCQXlRVXBELEc7Ozs7OztBQzVTZixrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBOzs7Ozs7O0FDREE7QUFDQTs7QUFFQSwwQ0FBMEMsa0NBQXNDOzs7Ozs7O0FDSGhGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQSxxRUFBc0UsbUJBQW1CLFVBQVUsRUFBRSxFQUFFO0FBQ3ZHLENBQUM7Ozs7Ozs7QUNGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFVBQVUsRUFBRTtBQUNoRCxtQkFBbUIsc0NBQXNDO0FBQ3pELENBQUMscUNBQXFDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOzs7Ozs7O0FDakNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxZQUFZLGVBQWU7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSx1Q0FBdUM7QUFDdkM7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTs7Ozs7OztBQ0FBLGNBQWM7Ozs7Ozs7QUNBZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0pBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ1JBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHOzs7Ozs7QUMxQkQsa0JBQWtCLHdEOzs7Ozs7QUNBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQSxvRUFBdUUsMkNBQTRDOzs7Ozs7O0FDRm5ILGVBQWUscUlBQWlMLGlCQUFpQixtQkFBbUIsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELFNBQVMsdUNBQXVDLHFDQUFxQyxvQ0FBb0MsRUFBRSxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsaUJBQWlCLGdCQUFnQixnQkFBZ0IsMkRBQTJELFlBQVksZUFBZSxrQkFBa0IsZUFBZSxtREFBbUQsWUFBWSxZQUFZLGVBQWUsYUFBYSw2RkFBNkYsWUFBWSxlQUFlLGNBQWMsOEJBQThCLFlBQVksZUFBZSw0QkFBNEIsYUFBYSxhQUFhLGdDQUFnQyxhQUFhLFNBQVMsNENBQTRDLGlHQUFpRyxVQUFVLGlEQUFpRCxpQkFBaUIsbVBBQW1QLFdBQVcsZ2FBQWdhLGVBQWUsZ0JBQWdCLGtCQUFrQiwrQkFBK0IsWUFBWSxXQUFXLDRCQUE0QixTQUFTLFlBQVksaUJBQWlCLGdCQUFnQiw2QkFBNkIsV0FBVyxZQUFZLGlCQUFpQixnQkFBZ0IsV0FBVyx3Q0FBd0Msd0NBQXdDLFdBQVcsWUFBWSxlQUFlLGNBQWMsb0RBQW9ELE9BQU8sV0FBVyxLQUFLLHNCQUFzQiwyQ0FBMkMsU0FBUyxZQUFZLGlCQUFpQixjQUFjLFlBQVksV0FBVyxZQUFZLGVBQWUsYUFBYSxpUUFBaVEsME5BQTBOLFlBQVksZUFBZSxhQUFhLFVBQVUscUNBQXFDLGdnQkFBZ2dCLFlBQVksZUFBZSxjQUFjLFdBQVcsY0FBYyxFQUFFLDBEQUEwRCxTQUFTLFlBQVksaUJBQWlCLGdCQUFnQix3QkFBd0IsWUFBWSxVQUFVLGFBQWEsaUNBQWlDLGdEQUFnRCw2Q0FBNkMsR0FBRyxrQkFBa0IsWUFBWSxrR0FBa0csR0FBRyxZQUFZLGVBQWUsZ0JBQWdCLHlCQUF5QixxQ0FBcUMsc0NBQXNDLDZDQUE2Qyx5QkFBeUIsb0JBQW9CLEVBQUUsWUFBWSxpQkFBaUIsa0JBQWtCLDBDQUEwQyxXQUFXLFlBQVksZUFBZSxjQUFjLGdFQUFnRSxPQUFPLG02QkFBbTZCLG9GQUFvRixZQUFZLGVBQWUsY0FBYyxNQUFNLDZEQUE2RCxnRUFBZ0UsdUJBQXVCLEtBQUssdUJBQXVCLElBQUksaUJBQWlCLFNBQVMsd0JBQXdCLEtBQUssbURBQW1ELFNBQVMsb0VBQW9FLDhFQUE4RSxnQkFBZ0IsYUFBYSxxR0FBcUcsWUFBWSxlQUFlLGNBQWMsZ0dBQWdHLDhFQUE4RSxnQkFBZ0IsYUFBYSxxR0FBcUcsWUFBWSxlQUFlLGFBQWEsdUVBQXVFLFlBQVksZUFBZSxnQkFBZ0IsMkNBQTJDLFlBQVksZUFBZSxjQUFjLDREQUE0RCxZQUFZLGVBQWUsY0FBYyxrQkFBa0IsRUFBRSx1Q0FBdUMsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLHlDQUF5QyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsWUFBWSxlQUFlLGNBQWMseUVBQXlFLEVBQUUsV0FBVyxZQUFZLGVBQWUsY0FBYyw4QkFBOEIsTUFBTSxRQUFRLElBQUksNENBQTRDLFlBQVksZUFBZSxjQUFjLDRHQUE0RyxjQUFjLGlCQUFpQixXQUFXLHFFQUFxRSx5QkFBeUIsWUFBWSxtQkFBbUIsS0FBSyxpQkFBaUIsbUJBQW1CLDJDQUEyQyxzREFBc0QsNkVBQTZFLFlBQVksZUFBZSxhQUFhLHVHQUF1RyxZQUFZLGVBQWUsY0FBYyw0SEFBNEgsNERBQTRELFlBQVksZUFBZSxjQUFjLHVFQUF1RSxzSkFBc0osWUFBWSxlQUFlLGNBQWMsaUNBQWlDLHdDQUF3QyxzQkFBc0Isd0ZBQXdGLE1BQU0sWUFBWSxlQUFlLGNBQWMsZUFBZSxTQUFTLGdCQUFnQixXQUFXLGtDQUFrQyxXQUFXLHlFQUF5RSxnRUFBZ0UsbUJBQW1CLFlBQVksR0FBRyxFOzs7Ozs7QUNBdmhTLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0EsdUNBQXVDLDRCQUE0QjtBQUNuRSx5Q0FBeUM7QUFDekM7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJidW5kbGVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYnVuZGxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2ZmOTVkMDNhMTVmNGJmODczZGUiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQXBwIGZyb20gJy4vZHJhdy5qcydcclxuaW1wb3J0IHtcclxuICAgIHJhbmRvbU51bSxcclxuICAgIHJhbmRvbUNvbG9yXHJcbn0gZnJvbSAnb3V0aWxzJztcclxuY29uc3QgJGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAnKVxyXG5jb25zdCAkYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmcnKVxyXG5jb25zdCAkcGVvcGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Blb3BsZScpXHJcbmNvbnN0ICRydWxlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3J1bGVyJylcclxuXHJcblxyXG5jb25zdCBvcHRpb25zID0ge1xyXG4gICAgY29udGFpbmVyOiAkYXBwLFxyXG4gICAgcGVvcGxlOiBbXSxcclxuICAgIGJhY2tncm91bmRJbWFnZTogJGJnLmdldEF0dHJpYnV0ZSgnc3JjJyksXHJcbiAgICBwZW9wbGVJbWFnZTogJHBlb3BsZS5nZXRBdHRyaWJ1dGUoJ3NyYycpXHJcbn1cclxubGV0IGFwcCA9IG5ldyBBcHAob3B0aW9ucylcclxuXHJcbi8vIOa3u+WKoOacuuWZqOS6ulxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9hZGQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGxldCB7XHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0XHJcbiAgICB9ID0gJGFwcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCB4ID0gcmFuZG9tTnVtKDAsIHdpZHRoKVxyXG4gICAgbGV0IHkgPSByYW5kb21OdW0oMCwgaGVpZ2h0KVxyXG4gICAgb3B0aW9ucy5wZW9wbGUucHVzaCh7XHJcbiAgICAgICAgbmFtZTogJ3l4bCcsXHJcbiAgICAgICAgY29sb3I6IHJhbmRvbUNvbG9yKCksXHJcbiAgICAgICAgbW92ZTogW3tcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeVxyXG4gICAgICAgIH1dXHJcbiAgICB9KVxyXG4gICAgLy8g6YeN57uY6L2o6L+577yM5Lq6XHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdwZW9wbGUnKVxyXG4gICAgYXBwLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbn0pXHJcblxyXG4vLyDmmK/lkKblsZXnpLrov5Dliqjovajov7lcclxuYXBwLnNob3dQYXRoID0gdHJ1ZVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9zaG93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhhcHAub3B0aW9ucy5wZW9wbGUpXHJcbiAgICBhcHAuc2hvd1BhdGggPSB0cnVlXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfaGlkZGVuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBhcHAuc2hvd1BhdGggPSBmYWxzZVxyXG4gICAgYXBwLnVwZGF0ZUNhbnZhcygnbW92ZScpXHJcbn0pXHJcblxyXG4vLyDmr5TkvovlsLpcclxuJHJ1bGVyLmlubmVySFRNTCA9IGB4JHthcHAub3B0aW9ucy5pbWdTY2FsZX0g5YCNYFxyXG4kYXBwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCAoKSA9PiB7XHJcbiAgICAkcnVsZXIuaW5uZXJIVE1MID0gYHgke2FwcC5vcHRpb25zLmltZ1NjYWxlfSDlgI1gXHJcbn0pXHJcblxyXG4vLyDliqjnlLtcclxubGV0IGFuaW1hdGlvblxyXG5sZXQgc3RlcCA9ICgpID0+IHtcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ3Blb3BsZScpXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxuICAgIGFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxyXG59XHJcbmFuaW1hdGlvbiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxyXG5cclxuXHJcbi8vIOaVsOaNruaooeaLn+WZqFxyXG5sZXQgbW9ja1NlcnZlcjEgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4gICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTEwLCAxMCksXHJcbiAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtMTAsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgfSk7XHJcbn0sIDUwMClcclxubGV0IG1vY2tTZXJ2ZXIyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbiAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC0xMCwgMTApLFxyXG4gICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTEwLCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuICAgIH0pO1xyXG59LCAzMDApXHJcbmxldCBtb2NrU2VydmVyMyA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4gICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbiAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtMTAsIDEwKSxcclxuICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC0xMCwgMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbiAgICB9KTtcclxufSwgMTAwMClcclxuXHJcbnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXBwLm9wdGlvbnMucGVvcGxlKSlcclxufSwgNTAwMClcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvL+eUu+e6v+autVxyXG5mdW5jdGlvbiBkcmF3TGluZShjdHgsIGNvbG9yLCB4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKHgxLCB5MSk7XHJcbiAgICBjdHgubGluZVRvKHgyLCB5Mik7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgY29udGFpbmVyOiBudWxsLCAvL+WIm+W7umNhbnZhc+eahOWuueWZqO+8jOWmguaenOS4jeWhq++8jOiHquWKqOWcqCBib2R5IOS4iuWIm+W7uuimhuebluWFqOWxj+eahOWxglxyXG4gICAgcGVvcGxlOiBbXSwgLy8g5Lq6XHJcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6IHVuZGVmaW5lZCwgLy8g6IOM5pmv5Zu+XHJcbiAgICBpbWdTY2FsZTogMSxcclxuICAgIGltZ1g6IDAsXHJcbiAgICBpbWdZOiAwXHJcbn07XHJcblxyXG5jbGFzcyBBcHAge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICB0aGlzLmlzU2hvd1BhdGggPSBmYWxzZTsgLy8g5piv5ZCm5pi+56S6IOi/kOWKqOi9qOi/uVxyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkQmdJbWcoKTtcclxuICAgICAgICB0aGlzLmxvYWRQZW9wbGVJbWcoKTtcclxuICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2hvd1BhdGgodmFsKSB7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dQYXRoID0gdmFsXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2FudmFzKGNvbnRleHQpIHtcclxuICAgICAgICAvLyDph43nu5hDYW52YXNcclxuICAgICAgICBzd2l0Y2ggKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgY2FzZSAnbWFwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Blb3BsZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb3ZlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaG93UGF0aCkgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpZiAoIW9wdGlvbnMuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMuYmdDb2xvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICB9ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAvL+eUu+WcsOWbvueahCBjYW52YXNcclxuICAgICAgICBsZXQgbWFwQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihtYXBDYW52YXMuc3R5bGUsIHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIHRvcDogJzAnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnMCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXHJcbiAgICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcENhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgYCR7d2lkdGh9cHhgKVxyXG4gICAgICAgIG1hcENhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGAke2hlaWdodH1weGApXHJcblxyXG4gICAgICAgIC8v55S76L2o6L+557q/5p2h55qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBtb3ZlQ2FudmFzID0gbWFwQ2FudmFzLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy/nlLvkurrnmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IHBlb3BsZUNhbnZhcyA9IG1hcENhbnZhcy5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYXBDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtb3ZlQ2FudmFzKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGVvcGxlQ2FudmFzKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXBDYW52YXMgPSBtYXBDYW52YXM7XHJcbiAgICAgICAgdGhpcy5tb3ZlQ2FudmFzID0gbW92ZUNhbnZhcztcclxuICAgICAgICB0aGlzLnBlb3BsZUNhbnZhcyA9IHBlb3BsZUNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudCgpIHtcclxuICAgICAgICBsZXQgJGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyXHJcbiAgICAgICAgbGV0IGp1ZGdlQm9yZGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyDovrnnlYzmo4DmtYtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdYID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1kgLSBoZWlnaHQgPCAtdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZID0gLXRoaXMuYmdJbWcuaGVpZ2h0ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWCAtIHdpZHRoIDwgLXRoaXMuYmdJbWcud2lkdGggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gLXRoaXMuYmdJbWcud2lkdGggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB3aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlnLDlm77nvKnmlL5cclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgICAgICB9ID0gdGhpcy5tYXBDYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgbGV0IHdoZWVsRGVsdGEgPSBldmVudC53aGVlbERlbHRhID8gZXZlbnQud2hlZWxEZWx0YSA6IChldmVudC5kZWx0YVkgKiAoLTQwKSk7XHJcbiAgICAgICAgICAgIGlmICh3aGVlbERlbHRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5pS+5aSnXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqIDIgPD0gdGhpcy5iZ0ltZy53aWR0aCAqIDggfHwgdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKiAyIDw9IHRoaXMuYmdJbWcuaGVpZ2h0ICogOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaUvuWkp+i+ueeVjOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gdGhpcy5vcHRpb25zLmltZ1ggKiAyIC0gcG9zLng7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWSAqIDIgLSBwb3MueTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOe8qeWwj1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmdJbWcud2lkdGggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLyAyID49IHdpZHRoIHx8IHRoaXMuYmdJbWcuaGVpZ2h0ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlIC8gMiA+PSBoZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDnvKnlsI/ovrnnlYzliKTmlq1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLz0gMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IHRoaXMub3B0aW9ucy5pbWdYICogMC41ICsgcG9zLnggKiAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWSAqIDAuNSArIHBvcy55ICogMC41O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGp1ZGdlQm9yZGVyKClcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5Zyw5Zu+56e75YqoXHJcbiAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZW1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIuc3R5bGUuY3Vyc29yID0gXCJtb3ZlXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zMSA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBwb3MxLnggLSBwb3MueDtcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gcG9zMS55IC0gcG9zLnk7XHJcbiAgICAgICAgICAgICAgICBwb3MgPSBwb3MxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggKz0geDtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdZICs9IHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbW91c2V1cExpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAganVkZ2VCb3JkZXIoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUxpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlbW92ZUxpc3RlbmVyKVxyXG4gICAgICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3dUb0NhbnZhcyhjYW52YXMsIHgsIHkpIHtcclxuICAgICAgICBsZXQgYmJveCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiB4IC0gYmJveC5sZWZ0IC0gKGJib3gud2lkdGggLSBjYW52YXMud2lkdGgpIC8gMixcclxuICAgICAgICAgICAgeTogeSAtIGJib3gudG9wIC0gKGJib3guaGVpZ2h0IC0gY2FudmFzLmhlaWdodCkgLyAyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQmdJbWcoKSB7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZEltYWdlO1xyXG4gICAgICAgIHRoaXMuYmdJbWcgPSBpbWdcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWFwKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgbG9hZFBlb3BsZUltZygpIHtcclxuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMub3B0aW9ucy5wZW9wbGVJbWFnZTtcclxuICAgICAgICB0aGlzLnBlb3BsZUltYWdlID0gaW1nXHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg55S76IOM5pmv5Zyw5Zu+XHJcbiAgICAgKi9cclxuICAgIGRyYXdNYXAoKSB7XHJcbiAgICAgICAgbGV0IGltZ1NjYWxlID0gdGhpcy5vcHRpb25zLmltZ1NjYWxlO1xyXG4gICAgICAgIGxldCBpbWdYID0gdGhpcy5vcHRpb25zLmltZ1g7XHJcbiAgICAgICAgbGV0IGltZ1kgPSB0aGlzLm9wdGlvbnMuaW1nWTtcclxuICAgICAgICBsZXQgaW1nID0gdGhpcy5iZ0ltZztcclxuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5tYXBDYW52YXM7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1hcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoY29udGV4dClcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCwgaW1nWCwgaW1nWSwgaW1nLndpZHRoICogaW1nU2NhbGUsIGltZy5oZWlnaHQgKiBpbWdTY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd01vdmUoKSB7XHJcbiAgICAgICAgLy/nlLvnp7vliqjovajov7lcclxuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgoe1xyXG4gICAgICAgICAgICBtb3ZlLFxyXG4gICAgICAgICAgICBjb2xvclxyXG4gICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnQsIGxhc3Q7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBtb3ZlW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdCA9IG1vdmVbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlWy0taW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSAncmVkJ1xyXG4gICAgICAgICAgICAgICAgZHJhd0xpbmUoY29udGV4dCwgY29sb3IsIGxhc3QueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLCBsYXN0LnkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWSwgY3VycmVudC54ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1gsIGN1cnJlbnQueSAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdZKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1Blb3BsZSgpIHtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMsXHJcbiAgICAgICAgICAgIHBlb3BsZUltYWdlXHJcbiAgICAgICAgfSA9IHRoaXNcclxuICAgICAgICBsZXQgY29udGV4dCA9IHBlb3BsZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoY29udGV4dCk7XHJcbiAgICAgICAgb3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgoe1xyXG4gICAgICAgICAgICBtb3ZlXHJcbiAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBsZXQgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgIC8vICAgICB4LFxyXG4gICAgICAgICAgICAvLyAgICAgeVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG1vdmVbbW92ZS5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShwZW9wbGVJbWFnZSwgcG9zaXRpb24ueCAqIG9wdGlvbnMuaW1nU2NhbGUgLSAxNiArIHRoaXMub3B0aW9ucy5pbWdYLCBwb3NpdGlvbi55ICogb3B0aW9ucy5pbWdTY2FsZSAtIDE2ICsgdGhpcy5vcHRpb25zLmltZ1ksIDMwLCA0Myk7XHJcbiAgICAgICAgICAgIC8vIGNvbnRleHQuZHJhd0ltYWdlKHBlb3BsZUltYWdlLCAwLCAwLCBwZW9wbGVJbWFnZS53aWR0aCAqIG9wdGlvbnMuaW1nU2NhbGUsIHBlb3BsZUltYWdlLmhlaWdodCAqIG9wdGlvbnMuaW1nU2NhbGUsIHBlcnNvbi54ICogb3B0aW9ucy5pbWdTY2FsZSwgcGVyc29uLnkgKiBvcHRpb25zLmltZ1NjYWxlLCBwZW9wbGVJbWFnZS53aWR0aCAqIG9wdGlvbnMuaW1nU2NhbGUsIHBlb3BsZUltYWdlLmhlaWdodCAqIG9wdGlvbnMuaW1nU2NhbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyDmuIXpmaR7Y29udGV4dH3nlLvluINcclxuICAgICAqIEBwYXJhbSB7Kn0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgY2xlYXJDYW52YXMoY29udGV4dCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcyxcclxuICAgICAgICAgICAgbW92ZUNhbnZhcyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzXHJcbiAgICAgICAgfSA9IHRoaXNcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hcENhbnZhcy5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIG1vdmVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBwZW9wbGVDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RyYXcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5vdXRpbHM9dCgpOmUub3V0aWxzPXQoKX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KG8pe2lmKG5bb10pcmV0dXJuIG5bb10uZXhwb3J0czt2YXIgcj1uW29dPXtpOm8sbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtvXS5jYWxsKHIuZXhwb3J0cyxyLHIuZXhwb3J0cyx0KSxyLmw9ITAsci5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLG8pe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6b30pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9NSl9KFtmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtyZXR1cm4gbmV3IFJlZ0V4cChcIihcXFxcc3xeKVwiK3QrXCIoXFxcXHN8JClcIikudGVzdChlLmNsYXNzTmFtZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQsbil7dmFyIG89bmV3IERhdGU7by5zZXREYXRlKG8uZ2V0RGF0ZSgpK24pLGRvY3VtZW50LmNvb2tpZT1lK1wiPVwiK3QrXCI7ZXhwaXJlcz1cIitvfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiB3aW5kb3cuc2Nyb2xsVG8oMCxlKSxlfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixvKXtmdW5jdGlvbiByKCl7ZnVuY3Rpb24gcigpe2E9TnVtYmVyKG5ldyBEYXRlKSxuLmFwcGx5KGYscyl9ZnVuY3Rpb24gdSgpe2k9dm9pZCAwfXZhciBmPXRoaXMsYz1OdW1iZXIobmV3IERhdGUpLWEscz1hcmd1bWVudHM7byYmIWkmJnIoKSxpJiZjbGVhclRpbWVvdXQoaSksdm9pZCAwPT09byYmYz5lP3IoKTohMCE9PXQmJihpPXNldFRpbWVvdXQobz91OnIsdm9pZCAwPT09bz9lLWM6ZSkpfXZhciBpLGE9MDtyZXR1cm5cImJvb2xlYW5cIiE9dHlwZW9mIHQmJihvPW4sbj10LHQ9dm9pZCAwKSxyfX0sZnVuY3Rpb24oZSx0LG4pe3ZhciBvPW4oNikscj1uKDcpLGk9bigwKSxhPW4oOCksdT1uKDkpLGY9bigxMCksYz1uKDEpLHM9bigxMSkscD1uKDEyKSxkPW4oMiksbD1uKDEzKSxtPW4oMTQpLHY9bigzKSx3PW4oMTUpLGc9bigxNikseT1uKDQpLGg9bigxNykseD1uKDE4KSxiPW4oMTkpLEM9bigyMCksTj1uKDIxKSxTPW4oMjIpLE09bigyMyksRT1uKDI0KSxGPW4oMjUpLEQ9bigyNiksST1uKDI3KSxUPW4oMjgpLGs9bigyOSksUj1uKDMwKSxBPW4oMzEpO2UuZXhwb3J0cz17YXJyYXlFcXVhbDpvLGFkZENsYXNzOnIsaGFzQ2xhc3M6aSxyZW1vdmVDbGFzczphLGdldENvb2tpZTp1LHJlbW92ZUNvb2tpZTpmLHNldENvb2tpZTpjLGdldE9TOnMsZ2V0RXhwbG9yZTpwLGdldFNjcm9sbFRvcDpkLG9mZnNldDpsLHNjcm9sbFRvOm0sc2V0U2Nyb2xsVG9wOnYsd2luZG93UmVzaXplOncsZGVib3VuY2U6Zyx0aHJvdHRsZTp5LGdldEtleU5hbWU6aCxkZWVwQ2xvbmU6eCxpc0VtcHR5T2JqZWN0OmIscmFuZG9tQ29sb3I6QyxyYW5kb21OdW06Tixpc0VtYWlsOlMsaXNJZENhcmQ6TSxpc1Bob25lTnVtOkUsaXNVcmw6RixkaWdpdFVwcGVyY2FzZTpELGlzU3VwcG9ydFdlYlA6SSxmb3JtYXRQYXNzVGltZTpULGZvcm1hdFJlbWFpblRpbWU6ayxwYXJzZVF1ZXJ5U3RyaW5nOlIsc3RyaW5nZnlRdWVyeVN0cmluZzpBfX0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7aWYoZT09PXQpcmV0dXJuITA7aWYoZS5sZW5ndGghPXQubGVuZ3RoKXJldHVybiExO2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7KytuKWlmKGVbbl0hPT10W25dKXJldHVybiExO3JldHVybiEwfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe3IoZSx0KXx8KGUuY2xhc3NOYW1lKz1cIiBcIit0KX12YXIgcj1uKDApO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe2lmKHIoZSx0KSl7dmFyIG49bmV3IFJlZ0V4cChcIihcXFxcc3xeKVwiK3QrXCIoXFxcXHN8JClcIik7ZS5jbGFzc05hbWU9ZS5jbGFzc05hbWUucmVwbGFjZShuLFwiIFwiKX19dmFyIHI9bigwKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD1kb2N1bWVudC5jb29raWUucmVwbGFjZSgvXFxzL2csXCJcIikuc3BsaXQoXCI7XCIpLG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIG89dFtuXS5zcGxpdChcIj1cIik7aWYob1swXT09ZSlyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KG9bMV0pfXJldHVyblwiXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUpe3IoZSxcIjFcIiwtMSl9dmFyIHI9bigxKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7dmFyIGU9XCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJ1c2VyQWdlbnRcImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpfHxcIlwiLHQ9KFwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwidmVuZG9yXCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci52ZW5kb3IudG9Mb3dlckNhc2UoKSxcIm5hdmlnYXRvclwiaW4gd2luZG93JiZcImFwcFZlcnNpb25cImluIG5hdmlnYXRvciYmbmF2aWdhdG9yLmFwcFZlcnNpb24udG9Mb3dlckNhc2UoKXx8XCJcIik7cmV0dXJuL21hYy9pLnRlc3QodCk/XCJNYWNPU1hcIjovd2luL2kudGVzdCh0KT9cIndpbmRvd3NcIjovbGludXgvaS50ZXN0KHQpP1wibGludXhcIjooL2lwaG9uZS9pLnRlc3QoZSl8fC9pcGFkL2kudGVzdChlKXx8L2lwb2QvaS50ZXN0KGUpLC9hbmRyb2lkL2kudGVzdChlKT9cImFuZHJvaWRcIjovd2luL2kudGVzdCh0KSYmL3Bob25lL2kudGVzdChlKT9cIndpbmRvd3NQaG9uZVwiOnZvaWQgMCl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3ZhciBlLHQ9e30sbj1uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7cmV0dXJuKGU9bi5tYXRjaCgvcnY6KFtcXGQuXSspXFwpIGxpa2UgZ2Vja28vKSk/dC5pZT1lWzFdOihlPW4ubWF0Y2goL21zaWUgKFtcXGRcXC5dKykvKSk/dC5pZT1lWzFdOihlPW4ubWF0Y2goL2VkZ2VcXC8oW1xcZFxcLl0rKS8pKT90LmVkZ2U9ZVsxXTooZT1uLm1hdGNoKC9maXJlZm94XFwvKFtcXGRcXC5dKykvKSk/dC5maXJlZm94PWVbMV06KGU9bi5tYXRjaCgvKD86b3BlcmF8b3ByKS4oW1xcZFxcLl0rKS8pKT90Lm9wZXJhPWVbMV06KGU9bi5tYXRjaCgvY2hyb21lXFwvKFtcXGRcXC5dKykvKSk/dC5jaHJvbWU9ZVsxXTooZT1uLm1hdGNoKC92ZXJzaW9uXFwvKFtcXGRcXC5dKykuKnNhZmFyaS8pKSYmKHQuc2FmYXJpPWVbMV0pLHQuaWU/XCJJRTogXCIrdC5pZTp0LmVkZ2U/XCJFREdFOiBcIit0LmVkZ2U6dC5maXJlZm94P1wiRmlyZWZveDogXCIrdC5maXJlZm94OnQuY2hyb21lP1wiQ2hyb21lOiBcIit0LmNocm9tZTp0Lm9wZXJhP1wiT3BlcmE6IFwiK3Qub3BlcmE6dC5zYWZhcmk/XCJTYWZhcmk6IFwiK3Quc2FmYXJpOlwiVW5rb253blwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7Zm9yKHZhciB0PXtsZWZ0OjAsdG9wOjB9O2U7KXQubGVmdCs9ZS5vZmZzZXRMZWZ0LHQudG9wKz1lLm9mZnNldFRvcCxlPWUub2Zmc2V0UGFyZW50O3JldHVybiB0fWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQpe2lmKHQ8MClyZXR1cm4gdm9pZCBpKGUpO3ZhciBuPWUtcigpO2lmKDAhPT1uKXt2YXIgYT1uL3QqMTA7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7aWYoTWF0aC5hYnMoYSk+TWF0aC5hYnMobikpcmV0dXJuIHZvaWQgaShyKCkrbik7aShyKCkrYSksbj4wJiZyKCk+PWV8fG48MCYmcigpPD1lfHxvKGUsdC0xNil9KX19dmFyIHI9bigyKSxpPW4oMyk7IWZ1bmN0aW9uKCl7d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZX0oKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7dmFyIG49d2luZG93LmlubmVySGVpZ2h0O2U9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lOmZ1bmN0aW9uKCl7fSx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dDpmdW5jdGlvbigpe30sd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbigpe3ZhciBvPXdpbmRvdy5pbm5lckhlaWdodDtvPT09biYmZSgpLG88biYmdCgpfSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtmdW5jdGlvbiBvKGUsdCxuKXtyZXR1cm4gdm9pZCAwPT09bj9yKGUsdCwhMSk6cihlLG4sITEhPT10KX12YXIgcj1uKDQpO2UuZXhwb3J0cz1vfSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuIG9bZV0/b1tlXTooY29uc29sZS5sb2coXCJVbmtub3cgS2V5KEtleSBDb2RlOlwiK2UrXCIpXCIpLFwiXCIpfXZhciBvPXs4OlwiQmFja3NwYWNlXCIsOTpcIlRhYlwiLDEzOlwiRW50ZXJcIiwxNjpcIlNoaWZ0XCIsMTc6XCJDdHJsXCIsMTg6XCJBbHRcIiwxOTpcIlBhdXNlXCIsMjA6XCJDYXBzIExvY2tcIiwyNzpcIkVzY2FwZVwiLDMyOlwiU3BhY2VcIiwzMzpcIlBhZ2UgVXBcIiwzNDpcIlBhZ2UgRG93blwiLDM1OlwiRW5kXCIsMzY6XCJIb21lXCIsMzc6XCJMZWZ0XCIsMzg6XCJVcFwiLDM5OlwiUmlnaHRcIiw0MDpcIkRvd25cIiw0MjpcIlByaW50IFNjcmVlblwiLDQ1OlwiSW5zZXJ0XCIsNDY6XCJEZWxldGVcIiw0ODpcIjBcIiw0OTpcIjFcIiw1MDpcIjJcIiw1MTpcIjNcIiw1MjpcIjRcIiw1MzpcIjVcIiw1NDpcIjZcIiw1NTpcIjdcIiw1NjpcIjhcIiw1NzpcIjlcIiw2NTpcIkFcIiw2NjpcIkJcIiw2NzpcIkNcIiw2ODpcIkRcIiw2OTpcIkVcIiw3MDpcIkZcIiw3MTpcIkdcIiw3MjpcIkhcIiw3MzpcIklcIiw3NDpcIkpcIiw3NTpcIktcIiw3NjpcIkxcIiw3NzpcIk1cIiw3ODpcIk5cIiw3OTpcIk9cIiw4MDpcIlBcIiw4MTpcIlFcIiw4MjpcIlJcIiw4MzpcIlNcIiw4NDpcIlRcIiw4NTpcIlVcIiw4NjpcIlZcIiw4NzpcIldcIiw4ODpcIlhcIiw4OTpcIllcIiw5MDpcIlpcIiw5MTpcIldpbmRvd3NcIiw5MzpcIlJpZ2h0IENsaWNrXCIsOTY6XCJOdW1wYWQgMFwiLDk3OlwiTnVtcGFkIDFcIiw5ODpcIk51bXBhZCAyXCIsOTk6XCJOdW1wYWQgM1wiLDEwMDpcIk51bXBhZCA0XCIsMTAxOlwiTnVtcGFkIDVcIiwxMDI6XCJOdW1wYWQgNlwiLDEwMzpcIk51bXBhZCA3XCIsMTA0OlwiTnVtcGFkIDhcIiwxMDU6XCJOdW1wYWQgOVwiLDEwNjpcIk51bXBhZCAqXCIsMTA3OlwiTnVtcGFkICtcIiwxMDk6XCJOdW1wYWQgLVwiLDExMDpcIk51bXBhZCAuXCIsMTExOlwiTnVtcGFkIC9cIiwxMTI6XCJGMVwiLDExMzpcIkYyXCIsMTE0OlwiRjNcIiwxMTU6XCJGNFwiLDExNjpcIkY1XCIsMTE3OlwiRjZcIiwxMTg6XCJGN1wiLDExOTpcIkY4XCIsMTIwOlwiRjlcIiwxMjE6XCJGMTBcIiwxMjI6XCJGMTFcIiwxMjM6XCJGMTJcIiwxNDQ6XCJOdW0gTG9ja1wiLDE0NTpcIlNjcm9sbCBMb2NrXCIsMTgyOlwiTXkgQ29tcHV0ZXJcIiwxODM6XCJNeSBDYWxjdWxhdG9yXCIsMTg2OlwiO1wiLDE4NzpcIj1cIiwxODg6XCIsXCIsMTg5OlwiLVwiLDE5MDpcIi5cIiwxOTE6XCIvXCIsMTkyOlwiYFwiLDIxOTpcIltcIiwyMjA6XCJcXFxcXCIsMjIxOlwiXVwiLDIyMjpcIidcIn07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdDtpZihudWxsPT1lfHxcIm9iamVjdFwiIT0odm9pZCAwPT09ZT9cInVuZGVmaW5lZFwiOm8oZSkpKXJldHVybiBlO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiB0PW5ldyBEYXRlLHQuc2V0VGltZShlLmdldFRpbWUoKSksdDtpZihlIGluc3RhbmNlb2YgQXJyYXkpe3Q9W107Zm9yKHZhciByPTAsaT1lLmxlbmd0aDtyPGk7cisrKXRbcl09bihlW3JdKTtyZXR1cm4gdH1pZihlIGluc3RhbmNlb2YgT2JqZWN0KXt0PXt9O2Zvcih2YXIgYSBpbiBlKWUuaGFzT3duUHJvcGVydHkoYSkmJih0W2FdPW4oZVthXSkpO3JldHVybiB0fXRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBjb3B5IHZhbHVlcyEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKX12YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiEoIWV8fFwib2JqZWN0XCIhPT0odm9pZCAwPT09ZT9cInVuZGVmaW5lZFwiOm8oZSkpfHxBcnJheS5pc0FycmF5KGUpKSYmIU9iamVjdC5rZXlzKGUpLmxlbmd0aH12YXIgbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtlLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuXCIjXCIrKFwiMDAwMDBcIisoMTY3NzcyMTYqTWF0aC5yYW5kb20oKTw8MCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3JldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHQtZSsxKSkrZX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9cXHcrKFstKy5dXFx3KykqQFxcdysoWy0uXVxcdyspKlxcLlxcdysoWy0uXVxcdyspKi8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9eKF5bMS05XVxcZHs3fSgoMFxcZCl8KDFbMC0yXSkpKChbMHwxfDJdXFxkKXwzWzAtMV0pXFxkezN9JCl8KF5bMS05XVxcZHs1fVsxLTldXFxkezN9KCgwXFxkKXwoMVswLTJdKSkoKFswfDF8Ml1cXGQpfDNbMC0xXSkoKFxcZHs0fSl8XFxkezN9W1h4XSkkKSQvLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXigwfDg2fDE3OTUxKT8oMTNbMC05XXwxNVswMTIzNTY3ODldfDE3WzY3OF18MThbMC05XXwxNFs1N10pWzAtOV17OH0kLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL1stYS16QS1aMC05QDolLl9cXCt+Iz1dezIsMjU2fVxcLlthLXpdezIsNn1cXGIoWy1hLXpBLVowLTlAOiVfXFwrLn4jPyZcXC9cXC89XSopL2kudGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3ZhciB0PVtcIuinklwiLFwi5YiGXCJdLG49W1wi6Zu2XCIsXCLlo7lcIixcIui0sFwiLFwi5Y+BXCIsXCLogoZcIixcIuS8jVwiLFwi6ZmGXCIsXCLmn5JcIixcIuaNjFwiLFwi546WXCJdLG89W1tcIuWFg1wiLFwi5LiHXCIsXCLkur9cIl0sW1wiXCIsXCLmi75cIixcIuS9sFwiLFwi5LufXCJdXSxyPWU8MD9cIuasoFwiOlwiXCI7ZT1NYXRoLmFicyhlKTtmb3IodmFyIGk9XCJcIixhPTA7YTx0Lmxlbmd0aDthKyspaSs9KG5bTWF0aC5mbG9vcigxMCplKk1hdGgucG93KDEwLGEpKSUxMF0rdFthXSkucmVwbGFjZSgv6Zu2Li8sXCJcIik7aT1pfHxcIuaVtFwiLGU9TWF0aC5mbG9vcihlKTtmb3IodmFyIGE9MDthPG9bMF0ubGVuZ3RoJiZlPjA7YSsrKXtmb3IodmFyIHU9XCJcIixmPTA7ZjxvWzFdLmxlbmd0aCYmZT4wO2YrKyl1PW5bZSUxMF0rb1sxXVtmXSt1LGU9TWF0aC5mbG9vcihlLzEwKTtpPXUucmVwbGFjZSgvKOmbti4pKumbtiQvLFwiXCIpLnJlcGxhY2UoL14kLyxcIumbtlwiKStvWzBdW2FdK2l9cmV0dXJuIHIraS5yZXBsYWNlKC8o6Zu2Likq6Zu25YWDLyxcIuWFg1wiKS5yZXBsYWNlKC8o6Zu2LikrL2csXCLpm7ZcIikucmVwbGFjZSgvXuaVtCQvLFwi6Zu25YWD5pW0XCIpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXtyZXR1cm4hIVtdLm1hcCYmMD09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIpLmluZGV4T2YoXCJkYXRhOmltYWdlL3dlYnBcIil9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1EYXRlLnBhcnNlKG5ldyBEYXRlKSxuPXQtZSxvPXBhcnNlSW50KG4vODY0ZTUpLHI9cGFyc2VJbnQobi8zNmU1KSxpPXBhcnNlSW50KG4vNmU0KSxhPXBhcnNlSW50KG8vMzApLHU9cGFyc2VJbnQoYS8xMik7cmV0dXJuIHU/dStcIuW5tOWJjVwiOmE/YStcIuS4quaciOWJjVwiOm8/bytcIuWkqeWJjVwiOnI/citcIuWwj+aXtuWJjVwiOmk/aStcIuWIhumSn+WJjVwiOlwi5Yia5YiaXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1uZXcgRGF0ZSxuPW5ldyBEYXRlKGUpLG89bi5nZXRUaW1lKCktdC5nZXRUaW1lKCkscj0wLGk9MCxhPTAsdT0wO3JldHVybiBvPj0wJiYocj1NYXRoLmZsb29yKG8vMWUzLzM2MDAvMjQpLGk9TWF0aC5mbG9vcihvLzFlMy82MC82MCUyNCksYT1NYXRoLmZsb29yKG8vMWUzLzYwJTYwKSx1PU1hdGguZmxvb3Ioby8xZTMlNjApKSxyK1wi5aSpIFwiK2krXCLlsI/ml7YgXCIrYStcIuWIhumSnyBcIit1K1wi56eSXCJ9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtlPW51bGw9PWU/d2luZG93LmxvY2F0aW9uLmhyZWY6ZTt2YXIgdD1lLnN1YnN0cmluZyhlLmxhc3RJbmRleE9mKFwiP1wiKSsxKTtyZXR1cm4gdD9KU09OLnBhcnNlKCd7XCInK2RlY29kZVVSSUNvbXBvbmVudCh0KS5yZXBsYWNlKC9cIi9nLCdcXFxcXCInKS5yZXBsYWNlKC8mL2csJ1wiLFwiJykucmVwbGFjZSgvPS9nLCdcIjpcIicpKydcIn0nKTp7fX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2lmKCFlKXJldHVyblwiXCI7dmFyIHQ9W107Zm9yKHZhciBuIGluIGUpe3ZhciBvPWVbbl07aWYobyBpbnN0YW5jZW9mIEFycmF5KWZvcih2YXIgcj0wO3I8by5sZW5ndGg7KytyKXQucHVzaChlbmNvZGVVUklDb21wb25lbnQobitcIltcIityK1wiXVwiKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQob1tyXSkpO2Vsc2UgdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQoZVtuXSkpfXJldHVybiB0LmpvaW4oXCImXCIpfWUuZXhwb3J0cz1ufV0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvb3V0aWxzL21pbi9vdXRpbHMubWluLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpO1xudmFyICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7IHN0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnkgfSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9