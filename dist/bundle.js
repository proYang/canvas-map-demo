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
                $container.addEventListener('mouseleave', mouseupListener);
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1MmRhODA4ODc5MzJiMzIzNTRiMCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qcyJdLCJuYW1lcyI6WyIkYXBwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJGJnIiwiJHBlb3BsZSIsIiRydWxlciIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJwZW9wbGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJnZXRBdHRyaWJ1dGUiLCJwZW9wbGVJbWFnZSIsImFwcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsIngiLCJ5IiwicHVzaCIsIm5hbWUiLCJjb2xvciIsIm1vdmUiLCJ1cGRhdGVDYW52YXMiLCJzaG93UGF0aCIsImNvbnNvbGUiLCJsb2ciLCJpbm5lckhUTUwiLCJpbWdTY2FsZSIsImFuaW1hdGlvbiIsInN0ZXAiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb2NrU2VydmVyMSIsInNldEludGVydmFsIiwiZm9yRWFjaCIsInBlcnNvbiIsImluZGV4IiwibGVuZ3RoIiwibGFzdCIsIm5leHQiLCJtb2NrU2VydmVyMiIsIm1vY2tTZXJ2ZXIzIiwiZHJhd0xpbmUiLCJjdHgiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInN0cm9rZVN0eWxlIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiY2xvc2VQYXRoIiwiZGVmYXVsdE9wdGlvbnMiLCJ1bmRlZmluZWQiLCJpbWdYIiwiaW1nWSIsIkFwcCIsImlzU2hvd1BhdGgiLCJyZW5kZXIiLCJsb2FkQmdJbWciLCJsb2FkUGVvcGxlSW1nIiwiZHJhd01vdmUiLCJhZGRFdmVudCIsImNvbnRleHQiLCJkcmF3TWFwIiwiZHJhd1Blb3BsZSIsImNsZWFyQ2FudmFzIiwibW92ZUNhbnZhcyIsImdldENvbnRleHQiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJsaW5lSGVpZ2h0Iiwib3ZlcmZsb3ciLCJiYWNrZ3JvdW5kQ29sb3IiLCJiZ0NvbG9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwibWFwQ2FudmFzIiwic2V0QXR0cmlidXRlIiwiY2xvbmVOb2RlIiwicGVvcGxlQ2FudmFzIiwiJGNvbnRhaW5lciIsImp1ZGdlQm9yZGVyIiwiYmdJbWciLCJwb3MiLCJ3aW5kb3dUb0NhbnZhcyIsImV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJ3aGVlbERlbHRhIiwiZGVsdGFZIiwidGhhdCIsIm1vdXNlbW92ZUxpc3RlbmVyIiwiY3Vyc29yIiwicG9zMSIsIm1vdXNldXBMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjYW52YXMiLCJiYm94IiwiaW1nIiwiSW1hZ2UiLCJzcmMiLCJkcmF3SW1hZ2UiLCJjdXJyZW50IiwiY2xlYXJSZWN0IiwidmFsIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxh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b250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1bmRsZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJidW5kbGVcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MmRhODA4ODc5MzJiMzIzNTRiMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4zJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBBcHAgZnJvbSAnLi9kcmF3LmpzJ1xyXG5pbXBvcnQge1xyXG4gICAgcmFuZG9tTnVtLFxyXG4gICAgcmFuZG9tQ29sb3JcclxufSBmcm9tICdvdXRpbHMnO1xyXG5jb25zdCAkYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcCcpXHJcbmNvbnN0ICRiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiZycpXHJcbmNvbnN0ICRwZW9wbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVvcGxlJylcclxuY29uc3QgJHJ1bGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpfcnVsZXInKVxyXG5cclxuXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBjb250YWluZXI6ICRhcHAsXHJcbiAgICBwZW9wbGU6IFtdLFxyXG4gICAgYmFja2dyb3VuZEltYWdlOiAkYmcuZ2V0QXR0cmlidXRlKCdzcmMnKSxcclxuICAgIHBlb3BsZUltYWdlOiAkcGVvcGxlLmdldEF0dHJpYnV0ZSgnc3JjJylcclxufVxyXG5sZXQgYXBwID0gbmV3IEFwcChvcHRpb25zKVxyXG5cclxuLy8g5re75Yqg5py65Zmo5Lq6XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX2FkZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbGV0IHtcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHRcclxuICAgIH0gPSAkYXBwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHggPSByYW5kb21OdW0oMCwgd2lkdGgpXHJcbiAgICBsZXQgeSA9IHJhbmRvbU51bSgwLCBoZWlnaHQpXHJcbiAgICBvcHRpb25zLnBlb3BsZS5wdXNoKHtcclxuICAgICAgICBuYW1lOiAneXhsJyxcclxuICAgICAgICBjb2xvcjogcmFuZG9tQ29sb3IoKSxcclxuICAgICAgICBtb3ZlOiBbe1xyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5XHJcbiAgICAgICAgfV1cclxuICAgIH0pXHJcbiAgICAvLyDph43nu5jovajov7nvvIzkurpcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ3Blb3BsZScpXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOaYr+WQpuWxleekuui/kOWKqOi9qOi/uVxyXG5hcHAuc2hvd1BhdGggPSB0cnVlXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KX3Nob3cnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGFwcC5vcHRpb25zLnBlb3BsZSlcclxuICAgIGFwcC5zaG93UGF0aCA9IHRydWVcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSl9oaWRkZW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFwcC5zaG93UGF0aCA9IGZhbHNlXHJcbiAgICBhcHAudXBkYXRlQ2FudmFzKCdtb3ZlJylcclxufSlcclxuXHJcbi8vIOavlOS+i+WwulxyXG4kcnVsZXIuaW5uZXJIVE1MID0gYHgke2FwcC5vcHRpb25zLmltZ1NjYWxlfSDlgI1gXHJcbiRhcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsICgpID0+IHtcclxuICAgICRydWxlci5pbm5lckhUTUwgPSBgeCR7YXBwLm9wdGlvbnMuaW1nU2NhbGV9IOWAjWBcclxufSlcclxuXHJcbi8vIOWKqOeUu1xyXG5sZXQgYW5pbWF0aW9uXHJcbmxldCBzdGVwID0gKCkgPT4ge1xyXG4gICAgYXBwLnVwZGF0ZUNhbnZhcygncGVvcGxlJylcclxuICAgIGFwcC51cGRhdGVDYW52YXMoJ21vdmUnKVxyXG4gICAgYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXHJcbn1cclxuYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApXHJcblxyXG5cclxuLy8g5pWw5o2u5qih5ouf5ZmoXHJcbmxldCBtb2NrU2VydmVyMSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIGFwcC5vcHRpb25zLnBlb3BsZS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IHBlcnNvbi5tb3ZlLmxlbmd0aFxyXG4gICAgICAgIGxldCBsYXN0ID0gcGVyc29uLm1vdmVbLS1sZW5ndGhdXHJcbiAgICAgICAgbGV0IG5leHQgPSB7XHJcbiAgICAgICAgICAgIHg6IGxhc3QueCArIHJhbmRvbU51bSgtMTAsIDEwKSxcclxuICAgICAgICAgICAgeTogbGFzdC55ICsgcmFuZG9tTnVtKC0xMCwgMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcC5vcHRpb25zLnBlb3BsZVtpbmRleF0ubW92ZS5wdXNoKG5leHQpXHJcbiAgICB9KTtcclxufSwgNTAwKVxyXG5sZXQgbW9ja1NlcnZlcjIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICBhcHAub3B0aW9ucy5wZW9wbGUuZm9yRWFjaCgocGVyc29uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBwZXJzb24ubW92ZS5sZW5ndGhcclxuICAgICAgICBsZXQgbGFzdCA9IHBlcnNvbi5tb3ZlWy0tbGVuZ3RoXVxyXG4gICAgICAgIGxldCBuZXh0ID0ge1xyXG4gICAgICAgICAgICB4OiBsYXN0LnggKyByYW5kb21OdW0oLTEwLCAxMCksXHJcbiAgICAgICAgICAgIHk6IGxhc3QueSArIHJhbmRvbU51bSgtMTAsIDEwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcHAub3B0aW9ucy5wZW9wbGVbaW5kZXhdLm1vdmUucHVzaChuZXh0KVxyXG4gICAgfSk7XHJcbn0sIDMwMClcclxubGV0IG1vY2tTZXJ2ZXIzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgYXBwLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gcGVyc29uLm1vdmUubGVuZ3RoXHJcbiAgICAgICAgbGV0IGxhc3QgPSBwZXJzb24ubW92ZVstLWxlbmd0aF1cclxuICAgICAgICBsZXQgbmV4dCA9IHtcclxuICAgICAgICAgICAgeDogbGFzdC54ICsgcmFuZG9tTnVtKC0xMCwgMTApLFxyXG4gICAgICAgICAgICB5OiBsYXN0LnkgKyByYW5kb21OdW0oLTEwLCAxMClcclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwLm9wdGlvbnMucGVvcGxlW2luZGV4XS5tb3ZlLnB1c2gobmV4dClcclxuICAgIH0pO1xyXG59LCAxMDAwKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIi8v55S757q/5q61XHJcbmZ1bmN0aW9uIGRyYXdMaW5lKGN0eCwgY29sb3IsIHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcclxuICAgIGN0eC5saW5lVG8oeDIsIHkyKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICBjb250YWluZXI6IG51bGwsIC8v5Yib5bu6Y2FudmFz55qE5a655Zmo77yM5aaC5p6c5LiN5aGr77yM6Ieq5Yqo5ZyoIGJvZHkg5LiK5Yib5bu66KaG55uW5YWo5bGP55qE5bGCXHJcbiAgICBwZW9wbGU6IFtdLCAvLyDkurpcclxuICAgIGJhY2tncm91bmRJbWFnZTogdW5kZWZpbmVkLCAvLyDog4zmma/lm75cclxuICAgIGltZ1NjYWxlOiAxLFxyXG4gICAgaW1nWDogMCxcclxuICAgIGltZ1k6IDBcclxufTtcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuaXNTaG93UGF0aCA9IGZhbHNlOyAvLyDmmK/lkKbmmL7npLog6L+Q5Yqo6L2o6L+5XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLmxvYWRCZ0ltZygpO1xyXG4gICAgICAgIHRoaXMubG9hZFBlb3BsZUltZygpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzaG93UGF0aCh2YWwpIHtcclxuICAgICAgICB0aGlzLmlzU2hvd1BhdGggPSB2YWxcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDYW52YXMoY29udGV4dCkge1xyXG4gICAgICAgIC8vIOmHjee7mENhbnZhc1xyXG4gICAgICAgIHN3aXRjaCAoY29udGV4dCkge1xyXG4gICAgICAgICAgICBjYXNlICdtYXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGVvcGxlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21vdmUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhbGwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dQYXRoKSB0aGlzLmRyYXdNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGlmICghb3B0aW9ucy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb250YWluZXIuc3R5bGUsIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iZ0NvbG9yXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIC8v55S75Zyw5Zu+55qEIGNhbnZhc1xyXG4gICAgICAgIGxldCBtYXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKG1hcENhbnZhcy5zdHlsZSwge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgdG9wOiAnMCcsXHJcbiAgICAgICAgICAgIGxlZnQ6ICcwJyxcclxuICAgICAgICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFwQ2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBgJHt3aWR0aH1weGApXHJcbiAgICAgICAgbWFwQ2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YClcclxuXHJcbiAgICAgICAgLy/nlLvovajov7nnur/mnaHnmoQgY2FudmFzXHJcbiAgICAgICAgbGV0IG1vdmVDYW52YXMgPSBtYXBDYW52YXMuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAvL+eUu+S6uueahCBjYW52YXNcclxuICAgICAgICBsZXQgcGVvcGxlQ2FudmFzID0gbWFwQ2FudmFzLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1hcENhbnZhcyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1vdmVDYW52YXMpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwZW9wbGVDYW52YXMpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcENhbnZhcyA9IG1hcENhbnZhcztcclxuICAgICAgICB0aGlzLm1vdmVDYW52YXMgPSBtb3ZlQ2FudmFzO1xyXG4gICAgICAgIHRoaXMucGVvcGxlQ2FudmFzID0gcGVvcGxlQ2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50KCkge1xyXG4gICAgICAgIGxldCAkY29udGFpbmVyID0gdGhpcy5jb250YWluZXJcclxuICAgICAgICBsZXQganVkZ2VCb3JkZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOi+ueeVjOajgOa1i1xyXG4gICAgICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHRcclxuICAgICAgICAgICAgfSA9IHRoaXMubWFwQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmltZ1ggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaW1nWSAtIGhlaWdodCA8IC10aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgPSAtdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbWdYIC0gd2lkdGggPCAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSAtdGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWcsOWbvue8qeaUvlxyXG4gICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMud2luZG93VG9DYW52YXModGhpcy5tYXBDYW52YXMsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xyXG4gICAgICAgICAgICBsZXQgd2hlZWxEZWx0YSA9IGV2ZW50LndoZWVsRGVsdGEgPyBldmVudC53aGVlbERlbHRhIDogKGV2ZW50LmRlbHRhWSAqICgtNDApKTtcclxuICAgICAgICAgICAgaWYgKHdoZWVsRGVsdGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmlL7lpKdcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJnSW1nLndpZHRoICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICogMiA8PSB0aGlzLmJnSW1nLndpZHRoICogOCB8fCB0aGlzLmJnSW1nLmhlaWdodCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAqIDIgPD0gdGhpcy5iZ0ltZy5oZWlnaHQgKiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pS+5aSn6L6555WM5Yik5patXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1NjYWxlICo9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1ggPSB0aGlzLm9wdGlvbnMuaW1nWCAqIDIgLSBwb3MueDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMiAtIHBvcy55O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g57yp5bCPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iZ0ltZy53aWR0aCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvIDIgPj0gd2lkdGggfHwgdGhpcy5iZ0ltZy5oZWlnaHQgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgLyAyID49IGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOe8qeWwj+i+ueeVjOWIpOaWrVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdTY2FsZSAvPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbWdYID0gdGhpcy5vcHRpb25zLmltZ1ggKiAwLjUgKyBwb3MueCAqIDAuNTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWSA9IHRoaXMub3B0aW9ucy5pbWdZICogMC41ICsgcG9zLnkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAganVkZ2VCb3JkZXIoKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDYW52YXModGhpcy5tb3ZlQ2FudmFzLmdldENvbnRleHQoJzJkJykpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDlnLDlm77np7vliqhcclxuICAgICAgICAkY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLndpbmRvd1RvQ2FudmFzKHRoaXMubWFwQ2FudmFzLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcclxuICAgICAgICAgICAgbGV0IG1vdXNlbW92ZUxpc3RlbmVyID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcIm1vdmVcIjtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MxID0gdGhpcy53aW5kb3dUb0NhbnZhcyh0aGlzLm1hcENhbnZhcywgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBvczEueCAtIHBvcy54O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwb3MxLnkgLSBwb3MueTtcclxuICAgICAgICAgICAgICAgIHBvcyA9IHBvczE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuaW1nWCArPSB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmltZ1kgKz0geTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGVvcGxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMubW92ZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaG93UGF0aCkgdGhpcy5kcmF3TW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtb3VzZXVwTGlzdGVuZXIgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBqdWRnZUJvcmRlcigpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Blb3BsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd1BhdGgpIHRoaXMuZHJhd01vdmUoKTtcclxuICAgICAgICAgICAgICAgICRjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2Vtb3ZlTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXBMaXN0ZW5lcilcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2V1cExpc3RlbmVyKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93VG9DYW52YXMoY2FudmFzLCB4LCB5KSB7XHJcbiAgICAgICAgbGV0IGJib3ggPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogeCAtIGJib3gubGVmdCAtIChiYm94LndpZHRoIC0gY2FudmFzLndpZHRoKSAvIDIsXHJcbiAgICAgICAgICAgIHk6IHkgLSBiYm94LnRvcCAtIChiYm94LmhlaWdodCAtIGNhbnZhcy5oZWlnaHQpIC8gMlxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEJnSW1nKCkge1xyXG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gdGhpcy5vcHRpb25zLmJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICB0aGlzLmJnSW1nID0gaW1nXHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01hcCgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGxvYWRQZW9wbGVJbWcoKSB7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSB0aGlzLm9wdGlvbnMucGVvcGxlSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVJbWFnZSA9IGltZ1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdQZW9wbGUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIOeUu+iDjOaZr+WcsOWbvlxyXG4gICAgICovXHJcbiAgICBkcmF3TWFwKCkge1xyXG4gICAgICAgIGxldCBpbWdTY2FsZSA9IHRoaXMub3B0aW9ucy5pbWdTY2FsZTtcclxuICAgICAgICBsZXQgaW1nWCA9IHRoaXMub3B0aW9ucy5pbWdYO1xyXG4gICAgICAgIGxldCBpbWdZID0gdGhpcy5vcHRpb25zLmltZ1k7XHJcbiAgICAgICAgbGV0IGltZyA9IHRoaXMuYmdJbWc7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMubWFwQ2FudmFzO1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy5tYXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGNvbnRleHQpXHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQsIGltZ1gsIGltZ1ksIGltZy53aWR0aCAqIGltZ1NjYWxlLCBpbWcuaGVpZ2h0ICogaW1nU2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNb3ZlKCkge1xyXG4gICAgICAgIC8v55S756e75Yqo6L2o6L+5XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm1vdmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZSxcclxuICAgICAgICAgICAgY29sb3JcclxuICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50LCBsYXN0O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gbW92ZVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09ICcwJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3QgPSBtb3ZlW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0ID0gbW92ZVstLWluZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgJ3JlZCdcclxuICAgICAgICAgICAgICAgIGRyYXdMaW5lKGNvbnRleHQsIGNvbG9yLCBsYXN0LnggKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWCwgbGFzdC55ICogdGhpcy5vcHRpb25zLmltZ1NjYWxlICsgdGhpcy5vcHRpb25zLmltZ1ksIGN1cnJlbnQueCAqIHRoaXMub3B0aW9ucy5pbWdTY2FsZSArIHRoaXMub3B0aW9ucy5pbWdYLCBjdXJyZW50LnkgKiB0aGlzLm9wdGlvbnMuaW1nU2NhbGUgKyB0aGlzLm9wdGlvbnMuaW1nWSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdQZW9wbGUoKSB7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLFxyXG4gICAgICAgICAgICBwZW9wbGVJbWFnZVxyXG4gICAgICAgIH0gPSB0aGlzXHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSBwZW9wbGVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKGNvbnRleHQpO1xyXG4gICAgICAgIG9wdGlvbnMucGVvcGxlLmZvckVhY2goKHtcclxuICAgICAgICAgICAgbW92ZVxyXG4gICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgLy8gbGV0IHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAvLyAgICAgeCxcclxuICAgICAgICAgICAgLy8gICAgIHlcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBtb3ZlW21vdmUubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UocGVvcGxlSW1hZ2UsIHBvc2l0aW9uLnggKiBvcHRpb25zLmltZ1NjYWxlIC0gMTYgKyB0aGlzLm9wdGlvbnMuaW1nWCwgcG9zaXRpb24ueSAqIG9wdGlvbnMuaW1nU2NhbGUgLSAxNiArIHRoaXMub3B0aW9ucy5pbWdZLCAzMCwgNDMpO1xyXG4gICAgICAgICAgICAvLyBjb250ZXh0LmRyYXdJbWFnZShwZW9wbGVJbWFnZSwgMCwgMCwgcGVvcGxlSW1hZ2Uud2lkdGggKiBvcHRpb25zLmltZ1NjYWxlLCBwZW9wbGVJbWFnZS5oZWlnaHQgKiBvcHRpb25zLmltZ1NjYWxlLCBwZXJzb24ueCAqIG9wdGlvbnMuaW1nU2NhbGUsIHBlcnNvbi55ICogb3B0aW9ucy5pbWdTY2FsZSwgcGVvcGxlSW1hZ2Uud2lkdGggKiBvcHRpb25zLmltZ1NjYWxlLCBwZW9wbGVJbWFnZS5oZWlnaHQgKiBvcHRpb25zLmltZ1NjYWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2Mg5riF6Zmke2NvbnRleHR955S75biDXHJcbiAgICAgKiBAcGFyYW0geyp9IGNvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIGNsZWFyQ2FudmFzKGNvbnRleHQpIHtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBtYXBDYW52YXMsXHJcbiAgICAgICAgICAgIG1vdmVDYW52YXMsXHJcbiAgICAgICAgICAgIHBlb3BsZUNhbnZhc1xyXG4gICAgICAgIH0gPSB0aGlzXHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodFxyXG4gICAgICAgIH0gPSB0aGlzLm1hcENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBpZiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXBDYW52YXMuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBtb3ZlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgcGVvcGxlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kcmF3LmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMub3V0aWxzPXQoKTplLm91dGlscz10KCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChvKXtpZihuW29dKXJldHVybiBuW29dLmV4cG9ydHM7dmFyIHI9bltvXT17aTpvLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbb10uY2FsbChyLmV4cG9ydHMscixyLmV4cG9ydHMsdCksci5sPSEwLHIuZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixvKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Om99KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTUpfShbZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7cmV0dXJuIG5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIit0K1wiKFxcXFxzfCQpXCIpLnRlc3QoZS5jbGFzc05hbWUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0LG4pe3ZhciBvPW5ldyBEYXRlO28uc2V0RGF0ZShvLmdldERhdGUoKStuKSxkb2N1bWVudC5jb29raWU9ZStcIj1cIit0K1wiO2V4cGlyZXM9XCIrb31lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4gd2luZG93LnNjcm9sbFRvKDAsZSksZX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4sbyl7ZnVuY3Rpb24gcigpe2Z1bmN0aW9uIHIoKXthPU51bWJlcihuZXcgRGF0ZSksbi5hcHBseShmLHMpfWZ1bmN0aW9uIHUoKXtpPXZvaWQgMH12YXIgZj10aGlzLGM9TnVtYmVyKG5ldyBEYXRlKS1hLHM9YXJndW1lbnRzO28mJiFpJiZyKCksaSYmY2xlYXJUaW1lb3V0KGkpLHZvaWQgMD09PW8mJmM+ZT9yKCk6ITAhPT10JiYoaT1zZXRUaW1lb3V0KG8/dTpyLHZvaWQgMD09PW8/ZS1jOmUpKX12YXIgaSxhPTA7cmV0dXJuXCJib29sZWFuXCIhPXR5cGVvZiB0JiYobz1uLG49dCx0PXZvaWQgMCkscn19LGZ1bmN0aW9uKGUsdCxuKXt2YXIgbz1uKDYpLHI9big3KSxpPW4oMCksYT1uKDgpLHU9big5KSxmPW4oMTApLGM9bigxKSxzPW4oMTEpLHA9bigxMiksZD1uKDIpLGw9bigxMyksbT1uKDE0KSx2PW4oMyksdz1uKDE1KSxnPW4oMTYpLHk9big0KSxoPW4oMTcpLHg9bigxOCksYj1uKDE5KSxDPW4oMjApLE49bigyMSksUz1uKDIyKSxNPW4oMjMpLEU9bigyNCksRj1uKDI1KSxEPW4oMjYpLEk9bigyNyksVD1uKDI4KSxrPW4oMjkpLFI9bigzMCksQT1uKDMxKTtlLmV4cG9ydHM9e2FycmF5RXF1YWw6byxhZGRDbGFzczpyLGhhc0NsYXNzOmkscmVtb3ZlQ2xhc3M6YSxnZXRDb29raWU6dSxyZW1vdmVDb29raWU6ZixzZXRDb29raWU6YyxnZXRPUzpzLGdldEV4cGxvcmU6cCxnZXRTY3JvbGxUb3A6ZCxvZmZzZXQ6bCxzY3JvbGxUbzptLHNldFNjcm9sbFRvcDp2LHdpbmRvd1Jlc2l6ZTp3LGRlYm91bmNlOmcsdGhyb3R0bGU6eSxnZXRLZXlOYW1lOmgsZGVlcENsb25lOngsaXNFbXB0eU9iamVjdDpiLHJhbmRvbUNvbG9yOkMscmFuZG9tTnVtOk4saXNFbWFpbDpTLGlzSWRDYXJkOk0saXNQaG9uZU51bTpFLGlzVXJsOkYsZGlnaXRVcHBlcmNhc2U6RCxpc1N1cHBvcnRXZWJQOkksZm9ybWF0UGFzc1RpbWU6VCxmb3JtYXRSZW1haW5UaW1lOmsscGFyc2VRdWVyeVN0cmluZzpSLHN0cmluZ2Z5UXVlcnlTdHJpbmc6QX19LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe2lmKGU9PT10KXJldHVybiEwO2lmKGUubGVuZ3RoIT10Lmxlbmd0aClyZXR1cm4hMTtmb3IodmFyIG49MDtuPGUubGVuZ3RoOysrbilpZihlW25dIT09dFtuXSlyZXR1cm4hMTtyZXR1cm4hMH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtyKGUsdCl8fChlLmNsYXNzTmFtZSs9XCIgXCIrdCl9dmFyIHI9bigwKTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtpZihyKGUsdCkpe3ZhciBuPW5ldyBSZWdFeHAoXCIoXFxcXHN8XilcIit0K1wiKFxcXFxzfCQpXCIpO2UuY2xhc3NOYW1lPWUuY2xhc3NOYW1lLnJlcGxhY2UobixcIiBcIil9fXZhciByPW4oMCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9ZG9jdW1lbnQuY29va2llLnJlcGxhY2UoL1xccy9nLFwiXCIpLnNwbGl0KFwiO1wiKSxuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBvPXRbbl0uc3BsaXQoXCI9XCIpO2lmKG9bMF09PWUpcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChvWzFdKX1yZXR1cm5cIlwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlKXtyKGUsXCIxXCIsLTEpfXZhciByPW4oMSk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3ZhciBlPVwibmF2aWdhdG9yXCJpbiB3aW5kb3cmJlwidXNlckFnZW50XCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKXx8XCJcIix0PShcIm5hdmlnYXRvclwiaW4gd2luZG93JiZcInZlbmRvclwiaW4gbmF2aWdhdG9yJiZuYXZpZ2F0b3IudmVuZG9yLnRvTG93ZXJDYXNlKCksXCJuYXZpZ2F0b3JcImluIHdpbmRvdyYmXCJhcHBWZXJzaW9uXCJpbiBuYXZpZ2F0b3ImJm5hdmlnYXRvci5hcHBWZXJzaW9uLnRvTG93ZXJDYXNlKCl8fFwiXCIpO3JldHVybi9tYWMvaS50ZXN0KHQpP1wiTWFjT1NYXCI6L3dpbi9pLnRlc3QodCk/XCJ3aW5kb3dzXCI6L2xpbnV4L2kudGVzdCh0KT9cImxpbnV4XCI6KC9pcGhvbmUvaS50ZXN0KGUpfHwvaXBhZC9pLnRlc3QoZSl8fC9pcG9kL2kudGVzdChlKSwvYW5kcm9pZC9pLnRlc3QoZSk/XCJhbmRyb2lkXCI6L3dpbi9pLnRlc3QodCkmJi9waG9uZS9pLnRlc3QoZSk/XCJ3aW5kb3dzUGhvbmVcIjp2b2lkIDApfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oKXt2YXIgZSx0PXt9LG49bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO3JldHVybihlPW4ubWF0Y2goL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLykpP3QuaWU9ZVsxXTooZT1uLm1hdGNoKC9tc2llIChbXFxkXFwuXSspLykpP3QuaWU9ZVsxXTooZT1uLm1hdGNoKC9lZGdlXFwvKFtcXGRcXC5dKykvKSk/dC5lZGdlPWVbMV06KGU9bi5tYXRjaCgvZmlyZWZveFxcLyhbXFxkXFwuXSspLykpP3QuZmlyZWZveD1lWzFdOihlPW4ubWF0Y2goLyg/Om9wZXJhfG9wcikuKFtcXGRcXC5dKykvKSk/dC5vcGVyYT1lWzFdOihlPW4ubWF0Y2goL2Nocm9tZVxcLyhbXFxkXFwuXSspLykpP3QuY2hyb21lPWVbMV06KGU9bi5tYXRjaCgvdmVyc2lvblxcLyhbXFxkXFwuXSspLipzYWZhcmkvKSkmJih0LnNhZmFyaT1lWzFdKSx0LmllP1wiSUU6IFwiK3QuaWU6dC5lZGdlP1wiRURHRTogXCIrdC5lZGdlOnQuZmlyZWZveD9cIkZpcmVmb3g6IFwiK3QuZmlyZWZveDp0LmNocm9tZT9cIkNocm9tZTogXCIrdC5jaHJvbWU6dC5vcGVyYT9cIk9wZXJhOiBcIit0Lm9wZXJhOnQuc2FmYXJpP1wiU2FmYXJpOiBcIit0LnNhZmFyaTpcIlVua29ud25cIn1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD17bGVmdDowLHRvcDowfTtlOyl0LmxlZnQrPWUub2Zmc2V0TGVmdCx0LnRvcCs9ZS5vZmZzZXRUb3AsZT1lLm9mZnNldFBhcmVudDtyZXR1cm4gdH1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIG8oZSx0KXtpZih0PDApcmV0dXJuIHZvaWQgaShlKTt2YXIgbj1lLXIoKTtpZigwIT09bil7dmFyIGE9bi90KjEwO3JlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe2lmKE1hdGguYWJzKGEpPk1hdGguYWJzKG4pKXJldHVybiB2b2lkIGkocigpK24pO2kocigpK2EpLG4+MCYmcigpPj1lfHxuPDAmJnIoKTw9ZXx8byhlLHQtMTYpfSl9fXZhciByPW4oMiksaT1uKDMpOyFmdW5jdGlvbigpe3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV9KCk7ZS5leHBvcnRzPW99LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQpe3ZhciBuPXdpbmRvdy5pbm5lckhlaWdodDtlPVwiZnVuY3Rpb25cIj09dHlwZW9mIGU/ZTpmdW5jdGlvbigpe30sdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6ZnVuY3Rpb24oKXt9LHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsZnVuY3Rpb24oKXt2YXIgbz13aW5kb3cuaW5uZXJIZWlnaHQ7bz09PW4mJmUoKSxvPG4mJnQoKX0pfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQsbil7ZnVuY3Rpb24gbyhlLHQsbil7cmV0dXJuIHZvaWQgMD09PW4/cihlLHQsITEpOnIoZSxuLCExIT09dCl9dmFyIHI9big0KTtlLmV4cG9ydHM9b30sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybiBvW2VdP29bZV06KGNvbnNvbGUubG9nKFwiVW5rbm93IEtleShLZXkgQ29kZTpcIitlK1wiKVwiKSxcIlwiKX12YXIgbz17ODpcIkJhY2tzcGFjZVwiLDk6XCJUYWJcIiwxMzpcIkVudGVyXCIsMTY6XCJTaGlmdFwiLDE3OlwiQ3RybFwiLDE4OlwiQWx0XCIsMTk6XCJQYXVzZVwiLDIwOlwiQ2FwcyBMb2NrXCIsMjc6XCJFc2NhcGVcIiwzMjpcIlNwYWNlXCIsMzM6XCJQYWdlIFVwXCIsMzQ6XCJQYWdlIERvd25cIiwzNTpcIkVuZFwiLDM2OlwiSG9tZVwiLDM3OlwiTGVmdFwiLDM4OlwiVXBcIiwzOTpcIlJpZ2h0XCIsNDA6XCJEb3duXCIsNDI6XCJQcmludCBTY3JlZW5cIiw0NTpcIkluc2VydFwiLDQ2OlwiRGVsZXRlXCIsNDg6XCIwXCIsNDk6XCIxXCIsNTA6XCIyXCIsNTE6XCIzXCIsNTI6XCI0XCIsNTM6XCI1XCIsNTQ6XCI2XCIsNTU6XCI3XCIsNTY6XCI4XCIsNTc6XCI5XCIsNjU6XCJBXCIsNjY6XCJCXCIsNjc6XCJDXCIsNjg6XCJEXCIsNjk6XCJFXCIsNzA6XCJGXCIsNzE6XCJHXCIsNzI6XCJIXCIsNzM6XCJJXCIsNzQ6XCJKXCIsNzU6XCJLXCIsNzY6XCJMXCIsNzc6XCJNXCIsNzg6XCJOXCIsNzk6XCJPXCIsODA6XCJQXCIsODE6XCJRXCIsODI6XCJSXCIsODM6XCJTXCIsODQ6XCJUXCIsODU6XCJVXCIsODY6XCJWXCIsODc6XCJXXCIsODg6XCJYXCIsODk6XCJZXCIsOTA6XCJaXCIsOTE6XCJXaW5kb3dzXCIsOTM6XCJSaWdodCBDbGlja1wiLDk2OlwiTnVtcGFkIDBcIiw5NzpcIk51bXBhZCAxXCIsOTg6XCJOdW1wYWQgMlwiLDk5OlwiTnVtcGFkIDNcIiwxMDA6XCJOdW1wYWQgNFwiLDEwMTpcIk51bXBhZCA1XCIsMTAyOlwiTnVtcGFkIDZcIiwxMDM6XCJOdW1wYWQgN1wiLDEwNDpcIk51bXBhZCA4XCIsMTA1OlwiTnVtcGFkIDlcIiwxMDY6XCJOdW1wYWQgKlwiLDEwNzpcIk51bXBhZCArXCIsMTA5OlwiTnVtcGFkIC1cIiwxMTA6XCJOdW1wYWQgLlwiLDExMTpcIk51bXBhZCAvXCIsMTEyOlwiRjFcIiwxMTM6XCJGMlwiLDExNDpcIkYzXCIsMTE1OlwiRjRcIiwxMTY6XCJGNVwiLDExNzpcIkY2XCIsMTE4OlwiRjdcIiwxMTk6XCJGOFwiLDEyMDpcIkY5XCIsMTIxOlwiRjEwXCIsMTIyOlwiRjExXCIsMTIzOlwiRjEyXCIsMTQ0OlwiTnVtIExvY2tcIiwxNDU6XCJTY3JvbGwgTG9ja1wiLDE4MjpcIk15IENvbXB1dGVyXCIsMTgzOlwiTXkgQ2FsY3VsYXRvclwiLDE4NjpcIjtcIiwxODc6XCI9XCIsMTg4OlwiLFwiLDE4OTpcIi1cIiwxOTA6XCIuXCIsMTkxOlwiL1wiLDE5MjpcImBcIiwyMTk6XCJbXCIsMjIwOlwiXFxcXFwiLDIyMTpcIl1cIiwyMjI6XCInXCJ9O2UuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ7aWYobnVsbD09ZXx8XCJvYmplY3RcIiE9KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpvKGUpKSlyZXR1cm4gZTtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gdD1uZXcgRGF0ZSx0LnNldFRpbWUoZS5nZXRUaW1lKCkpLHQ7aWYoZSBpbnN0YW5jZW9mIEFycmF5KXt0PVtdO2Zvcih2YXIgcj0wLGk9ZS5sZW5ndGg7cjxpO3IrKyl0W3JdPW4oZVtyXSk7cmV0dXJuIHR9aWYoZSBpbnN0YW5jZW9mIE9iamVjdCl7dD17fTtmb3IodmFyIGEgaW4gZSllLmhhc093blByb3BlcnR5KGEpJiYodFthXT1uKGVbYV0pKTtyZXR1cm4gdH10aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29weSB2YWx1ZXMhIEl0cyB0eXBlIGlzbid0IHN1cHBvcnRlZC5cIil9dmFyIG89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4hKCFlfHxcIm9iamVjdFwiIT09KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpvKGUpKXx8QXJyYXkuaXNBcnJheShlKSkmJiFPYmplY3Qua2V5cyhlKS5sZW5ndGh9dmFyIG89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbigpe3JldHVyblwiI1wiKyhcIjAwMDAwXCIrKDE2Nzc3MjE2Kk1hdGgucmFuZG9tKCk8PDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTYpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKih0LWUrMSkpK2V9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXFx3KyhbLSsuXVxcdyspKkBcXHcrKFstLl1cXHcrKSpcXC5cXHcrKFstLl1cXHcrKSovLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtyZXR1cm4vXiheWzEtOV1cXGR7N30oKDBcXGQpfCgxWzAtMl0pKSgoWzB8MXwyXVxcZCl8M1swLTFdKVxcZHszfSQpfCheWzEtOV1cXGR7NX1bMS05XVxcZHszfSgoMFxcZCl8KDFbMC0yXSkpKChbMHwxfDJdXFxkKXwzWzAtMV0pKChcXGR7NH0pfFxcZHszfVtYeF0pJCkkLy50ZXN0KGUpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuL14oMHw4NnwxNzk1MSk/KDEzWzAtOV18MTVbMDEyMzU2Nzg5XXwxN1s2NzhdfDE4WzAtOV18MTRbNTddKVswLTldezh9JC8udGVzdChlKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUpe3JldHVybi9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDZ9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mXFwvXFwvPV0qKS9pLnRlc3QoZSl9ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXt2YXIgdD1bXCLop5JcIixcIuWIhlwiXSxuPVtcIumbtlwiLFwi5aO5XCIsXCLotLBcIixcIuWPgVwiLFwi6IKGXCIsXCLkvI1cIixcIumZhlwiLFwi5p+SXCIsXCLmjYxcIixcIueOllwiXSxvPVtbXCLlhYNcIixcIuS4h1wiLFwi5Lq/XCJdLFtcIlwiLFwi5ou+XCIsXCLkvbBcIixcIuS7n1wiXV0scj1lPDA/XCLmrKBcIjpcIlwiO2U9TWF0aC5hYnMoZSk7Zm9yKHZhciBpPVwiXCIsYT0wO2E8dC5sZW5ndGg7YSsrKWkrPShuW01hdGguZmxvb3IoMTAqZSpNYXRoLnBvdygxMCxhKSklMTBdK3RbYV0pLnJlcGxhY2UoL+mbti4vLFwiXCIpO2k9aXx8XCLmlbRcIixlPU1hdGguZmxvb3IoZSk7Zm9yKHZhciBhPTA7YTxvWzBdLmxlbmd0aCYmZT4wO2ErKyl7Zm9yKHZhciB1PVwiXCIsZj0wO2Y8b1sxXS5sZW5ndGgmJmU+MDtmKyspdT1uW2UlMTBdK29bMV1bZl0rdSxlPU1hdGguZmxvb3IoZS8xMCk7aT11LnJlcGxhY2UoLyjpm7YuKSrpm7YkLyxcIlwiKS5yZXBsYWNlKC9eJC8sXCLpm7ZcIikrb1swXVthXStpfXJldHVybiByK2kucmVwbGFjZSgvKOmbti4pKumbtuWFgy8sXCLlhYNcIikucmVwbGFjZSgvKOmbti4pKy9nLFwi6Zu2XCIpLnJlcGxhY2UoL17mlbQkLyxcIumbtuWFg+aVtFwiKX1lLmV4cG9ydHM9bn0sZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKCl7cmV0dXJuISFbXS5tYXAmJjA9PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikudG9EYXRhVVJMKFwiaW1hZ2Uvd2VicFwiKS5pbmRleE9mKFwiZGF0YTppbWFnZS93ZWJwXCIpfWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9RGF0ZS5wYXJzZShuZXcgRGF0ZSksbj10LWUsbz1wYXJzZUludChuLzg2NGU1KSxyPXBhcnNlSW50KG4vMzZlNSksaT1wYXJzZUludChuLzZlNCksYT1wYXJzZUludChvLzMwKSx1PXBhcnNlSW50KGEvMTIpO3JldHVybiB1P3UrXCLlubTliY1cIjphP2ErXCLkuKrmnIjliY1cIjpvP28rXCLlpKnliY1cIjpyP3IrXCLlsI/ml7bliY1cIjppP2krXCLliIbpkp/liY1cIjpcIuWImuWImlwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7dmFyIHQ9bmV3IERhdGUsbj1uZXcgRGF0ZShlKSxvPW4uZ2V0VGltZSgpLXQuZ2V0VGltZSgpLHI9MCxpPTAsYT0wLHU9MDtyZXR1cm4gbz49MCYmKHI9TWF0aC5mbG9vcihvLzFlMy8zNjAwLzI0KSxpPU1hdGguZmxvb3Ioby8xZTMvNjAvNjAlMjQpLGE9TWF0aC5mbG9vcihvLzFlMy82MCU2MCksdT1NYXRoLmZsb29yKG8vMWUzJTYwKSkscitcIuWkqSBcIitpK1wi5bCP5pe2IFwiK2ErXCLliIbpkp8gXCIrdStcIuenklwifWUuZXhwb3J0cz1ufSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7ZT1udWxsPT1lP3dpbmRvdy5sb2NhdGlvbi5ocmVmOmU7dmFyIHQ9ZS5zdWJzdHJpbmcoZS5sYXN0SW5kZXhPZihcIj9cIikrMSk7cmV0dXJuIHQ/SlNPTi5wYXJzZSgne1wiJytkZWNvZGVVUklDb21wb25lbnQodCkucmVwbGFjZSgvXCIvZywnXFxcXFwiJykucmVwbGFjZSgvJi9nLCdcIixcIicpLnJlcGxhY2UoLz0vZywnXCI6XCInKSsnXCJ9Jyk6e319ZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlKXtpZighZSlyZXR1cm5cIlwiO3ZhciB0PVtdO2Zvcih2YXIgbiBpbiBlKXt2YXIgbz1lW25dO2lmKG8gaW5zdGFuY2VvZiBBcnJheSlmb3IodmFyIHI9MDtyPG8ubGVuZ3RoOysrcil0LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG4rXCJbXCIrcitcIl1cIikrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KG9bcl0pKTtlbHNlIHQucHVzaChlbmNvZGVVUklDb21wb25lbnQobikrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGVbbl0pKX1yZXR1cm4gdC5qb2luKFwiJlwiKX1lLmV4cG9ydHM9bn1dKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL291dGlscy9taW4vb3V0aWxzLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==