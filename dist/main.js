/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/adapters/helper.js":
/*!********************************!*\
  !*** ./src/adapters/helper.js ***!
  \********************************/
/*! exports provided: buildJSONPResponseData, buildResponseData, serialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildJSONPResponseData\", function() { return buildJSONPResponseData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildResponseData\", function() { return buildResponseData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serialize\", function() { return serialize; });\nfunction parseResponseHeader (xhr) {\r\n  const headerArr = xhr.getAllResponseHeaders().trim().split('\\r\\n');\r\n  return headerArr.reduce((map, item) => {\r\n    const [key, value] = item.split(':');\r\n    map[key.trim()] = value.trim();\r\n\r\n    return map;\r\n  }, {});\r\n}\r\n\r\nfunction buildJSONPResponseData (data, config) {\r\n  return {\r\n    data: data,\r\n    config: config,\r\n    status: 200,\r\n    statusText: 'OK',\r\n    headers: null,\r\n    request: null\r\n  };\r\n}\r\n\r\nfunction buildResponseData (data, config, xhr) {\r\n  const responseHeaders = parseResponseHeader(xhr);\r\n\r\n  return {\r\n    data: data,\r\n    status: xhr.status,\r\n    statusText: xhr.statusText,\r\n    headers: responseHeaders,\r\n    config: config,\r\n    request: xhr\r\n  };\r\n};\r\n\r\n/**\r\n * 序列化请求体负载\r\n * @param {Object} data \r\n */\r\nvar serialize = (function (){\r\n  var toString = Object.prototype.toString;\r\n  var isObject = function (obj){\r\n      return obj !== null && typeof(obj) === 'object';\r\n  };\r\n  var isArray = function (obj){\r\n      return toString.call(obj) === '[object Array]';\r\n  };\r\n  var resoleReturnValueAEncode = function (str){\r\n      return encodeURIComponent(str);\r\n  };\r\n\r\n  return function  _serialize (data){\r\n      var index = arguments.length > 1 && arguments[1] !==undefined ? arguments[1] : 0,\r\n          sourceKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '',\r\n          str = '';\r\n      \r\n      var _doSerialize = function (key, val){\r\n          if(typeof(val) === 'function'){\r\n              val = '' + undefined;\r\n          }else if(val === null){\r\n              val = '';\r\n          }else if(val === undefined){\r\n              return;\r\n          }else if(toString.call(val) === '[object RegExp]'){\r\n              val = '' + val;\r\n          }\r\n          \r\n          if(index === 0){\r\n              str += isObject(val) ? \r\n                  (_serialize(val, index + 1, key) + '&') : \r\n                  (key + '=' + val + '&');\r\n          }else{\r\n              str += isObject(val) ? \r\n                  (_serialize(val, index + 1, sourceKey + '[' + key + ']') + '&') :\r\n                  (sourceKey + '[' + key + ']=' + val + '&');\r\n          }\r\n      };\r\n\r\n      if(isObject(data)){\r\n          if(isArray(data)){\r\n              if(index === 0){\r\n                  throw new TypeError('root data must plain object');\r\n              }\r\n\r\n              var val;\r\n              for(var i = 0, l = data.length; i < l; i ++){\r\n                  val = data[i];\r\n                  _doSerialize(isObject(val) ? i : '', data[i]);\r\n              }\r\n          }else{\r\n              for (var key in data) {\r\n                  if (Object.hasOwnProperty.call(data, key)) {\r\n                      _doSerialize(key, data[key]);\r\n                  }\r\n              }\r\n          }\r\n      \r\n          str = index === 0 ? resoleReturnValueAEncode(str.replace(/\\&$/, '')) : str.replace(/\\&$/, '');\r\n      }else if(typeof(data) === 'string'){\r\n          // 如果传入的参数是一个字符串那么就假设它已经被序列化了，这里就不做任何处理了，直接把这个字符串返回出去\r\n          str = data;\r\n      }\r\n\r\n      return str;\r\n  }\r\n})();\r\n\r\n\n\n//# sourceURL=webpack:///./src/adapters/helper.js?");

/***/ }),

/***/ "./src/adapters/jsonp.js":
/*!*******************************!*\
  !*** ./src/adapters/jsonp.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Canceller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Canceller.js */ \"./src/core/Canceller.js\");\n/* harmony import */ var _core_RequestError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/RequestError.js */ \"./src/core/RequestError.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/index.js */ \"./src/utils/index.js\");\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper.js */ \"./src/adapters/helper.js\");\n\r\n\r\n\r\n\r\n\r\nfunction jsonpAdapter (config) {\r\n  return new Promise((resolve, reject) => {\r\n    var url = config.url,\r\n        jsonpFlag = config.jsonpFlag || 'cb',\r\n        jsonpCallback = 'Request' + '_' + Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_2__[\"genRandomStr\"])(),\r\n        timeout = config.timeout,\r\n        validateStatus = config.validateStatus,\r\n        isTimeout = false,\r\n        t = null,\r\n        canceller = config.canceller;\r\n\r\n    var clearEffect =  () => {\r\n      clearTimeout(t);\r\n      t = null;\r\n    };\r\n\r\n    window[jsonpCallback] = function (data) {\r\n        if (isTimeout) return;\r\n        clearEffect();\r\n\r\n        if (validateStatus(200)) { \r\n          resolve(Object(_helper_js__WEBPACK_IMPORTED_MODULE_3__[\"buildJSONPResponseData\"])(data, config));\r\n        } else {\r\n          reject(new _core_RequestError_js__WEBPACK_IMPORTED_MODULE_1__[\"RequestError\"]({\r\n            message: 'Request failed!',\r\n            config: config,\r\n            data: Object(_helper_js__WEBPACK_IMPORTED_MODULE_3__[\"buildJSONPResponseData\"])(data, config)\r\n          }));\r\n        }\r\n        \r\n        setTimeout(() => window[jsonpCallback] = null);\r\n    };\r\n\r\n    if (canceller && Object(_core_Canceller_js__WEBPACK_IMPORTED_MODULE_0__[\"isCanceller\"])(canceller)) {\r\n      canceller.promise.then(\r\n        () => {\r\n          clearEffect();\r\n          isTimeout = true;\r\n          reject(canceller);\r\n        },\r\n        reject\r\n      );\r\n    };\r\n    \r\n    var oScript = document.createElement('script');\r\n    oScript.src = url.indexOf('?') === -1 \r\n                ? url + '?' + jsonpFlag + '=' + jsonpCallback\r\n                : url + '&' + jsonpFlag + '=' + jsonpCallback;\r\n\r\n\r\n    document.body.appendChild(oScript);\r\n    document.body.removeChild(oScript);\r\n\r\n    if (timeout !== 0) {\r\n      setTimeout(() => {\r\n        reject(new _core_RequestError_js__WEBPACK_IMPORTED_MODULE_1__[\"RequestError\"]({\r\n          message: 'Request timeout!!!',\r\n          config: config\r\n        }));\r\n\r\n        isTimeout = true;\r\n        clearEffect();\r\n      }, timeout);\r\n    }\r\n  });\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (jsonpAdapter);\n\n//# sourceURL=webpack:///./src/adapters/jsonp.js?");

/***/ }),

/***/ "./src/adapters/xhr.js":
/*!*****************************!*\
  !*** ./src/adapters/xhr.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index.js */ \"./src/utils/index.js\");\n/* harmony import */ var _defaultConfig_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../defaultConfig.js */ \"./src/defaultConfig.js\");\n/* harmony import */ var _core_Canceller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Canceller.js */ \"./src/core/Canceller.js\");\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper.js */ \"./src/adapters/helper.js\");\n/* harmony import */ var _core_RequestError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/RequestError.js */ \"./src/core/RequestError.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction resolveDataType(responseType, xhr){\r\n  var result;\r\n  switch(responseType){\r\n      case 'TEXT':\r\n          result = xhr.responseText;\r\n          break;\r\n      case 'XML':\r\n          result = xhr.responseXML;\r\n          break;\r\n      case 'JSON':\r\n      default:\r\n        try{\r\n          result = JSON.parse(xhr.responseText);\r\n        } catch(e) {\r\n          return xhr.responseText;\r\n        }\r\n        break;    \r\n  }\r\n\r\n  return result;\r\n}\r\n\r\nfunction xhrAdapter (config) {\r\n  return new Promise((resolve, reject) => {\r\n    var xhr = new (window.XMLHttpRequest || window.ActiveXObject('Microsoft.XMLHTTP')),\r\n      method = config.method,\r\n      url = config.url,\r\n      data = config.data || null,\r\n      responseType = config.responseType.toUpperCase(),\r\n      timeout = config.timeout,\r\n      headers = config.headers || {},\r\n      validateStatus = config.validateStatus,\r\n      t = null;\r\n\r\n    if (!xhr) {\r\n      reject(new _core_RequestError_js__WEBPACK_IMPORTED_MODULE_4__[\"RequestError\"]({\r\n        message: '您的浏览器不支持异步发起HTTP请求，请更新您的浏览器版本！',\r\n        config: config\r\n      }));\r\n    }\r\n\r\n    // 初始化请求xhr对象\r\n    xhr.open(method, url, true);\r\n\r\n    // 设置请求头\r\n    for (var key in headers) {\r\n      if (Object.hasOwnProperty.call(headers, key)) {\r\n        xhr.setRequestHeader(key, headers[key]);\r\n      }\r\n    }\r\n\r\n    /**\r\n     * 设置表单提交的Content-type\r\n     * 如果data为FormData实例的情况下浏览器会根据数据类型自行设置Content-type\r\n     */\r\n    if (method === 'POST' && !Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_0__[\"isFormData\"])(data) && !(\"Content-type\" in headers)) {\r\n      xhr.setRequestHeader('Content-type', _defaultConfig_js__WEBPACK_IMPORTED_MODULE_1__[\"DEFAULT_CONTENT_TYPE\"]);\r\n    }\r\n\r\n    /**\r\n     * 处理请求错误的回调函数\r\n     * 注意：这个API的兼容性不是特别好\r\n     */\r\n    xhr.onerror = function () {\r\n      reject(new _core_RequestError_js__WEBPACK_IMPORTED_MODULE_4__[\"RequestError\"]({\r\n        message: 'Network Error!',\r\n        config: config\r\n      }));\r\n      xhr = null;\r\n      clearTimeout(t);\r\n      t = null;\r\n    }\r\n\r\n    // Handle progress if needed\r\n    if (Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_0__[\"isFunction\"])(config.onDownloadProgress)) {\r\n      request.addEventListener('progress', config.onDownloadProgress);\r\n    }\r\n\r\n    // 不是所以的浏览器都支持这个upload事件\r\n    if (Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_0__[\"isFunction\"])(config.onUploadProgress) && request.upload) {\r\n      request.upload.addEventListener('progress', config.onUploadProgress);\r\n    }\r\n\r\n    // 监听状态改变\r\n    xhr.onreadystatechange = function (){\r\n      if(xhr.readyState === 4){\r\n          clearTimeout(t);\r\n          t = null;\r\n\r\n          if (validateStatus(xhr.status)) {\r\n            resolve(Object(_helper_js__WEBPACK_IMPORTED_MODULE_3__[\"buildResponseData\"])(resolveDataType(responseType, xhr), config, xhr));\r\n          } else {\r\n            reject(Object(_helper_js__WEBPACK_IMPORTED_MODULE_3__[\"buildResponseData\"])(resolveDataType(responseType, xhr), config, xhr));\r\n          }\r\n      }\r\n    };\r\n\r\n    var canceller = config.canceller;\r\n    if (canceller && Object(_core_Canceller_js__WEBPACK_IMPORTED_MODULE_2__[\"isCanceller\"])(canceller)) {\r\n      canceller.promise.then(\r\n        () => {\r\n          if (!xhr) {\r\n            return;\r\n          };\r\n\r\n          xhr.abort();\r\n          xhr = null;\r\n          clearTimeout(t);\r\n          t = null;\r\n          reject(canceller);\r\n        },\r\n        reject\r\n      );\r\n    }\r\n\r\n    if (timeout !== 0) {\r\n      // 请求超时：部分浏览器不支持ontimeout事件，所以这里做兼容性处理。 \r\n      t = setTimeout(function (){\r\n        xhr.abort();\r\n        clearTimeout(t);\r\n        t = null;\r\n        xhr = null;\r\n        reject(new _core_RequestError_js__WEBPACK_IMPORTED_MODULE_4__[\"RequestError\"]({\r\n          message: '请求超时了',\r\n          config: config\r\n        }));\r\n      }, timeout);\r\n    }\r\n\r\n    // 发送请求\r\n    xhr.send((method === 'POST' ? Object(_helper_js__WEBPACK_IMPORTED_MODULE_3__[\"serialize\"])(data) : data));\r\n  });\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (xhrAdapter);\n\n//# sourceURL=webpack:///./src/adapters/xhr.js?");

/***/ }),

/***/ "./src/core/Canceller.js":
/*!*******************************!*\
  !*** ./src/core/Canceller.js ***!
  \*******************************/
/*! exports provided: Canceller, isCanceller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Canceller\", function() { return Canceller; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isCanceller\", function() { return isCanceller; });\nclass Canceller {\r\n  constructor () {\r\n    this.promise = new Promise(resolve => {\r\n      this.resolvePromise = resolve;\r\n    });\r\n  }\r\n\r\n  cancel (message) {\r\n    this.message = message;\r\n    this.resolvePromise(message);\r\n  }\r\n\r\n  toString () {\r\n    return 'Cancel' + (this.message ? ': ' + this.message : 'Request is canceled!');\r\n  }\r\n}\r\n\r\nObject.defineProperty(Canceller.prototype, '__CANCELLER__', {\r\n  enumerable: true,\r\n  configurable: false,\r\n  writable: false,\r\n  value: true\r\n});\r\n\r\nfunction isCanceller (obj) {\r\n  return obj instanceof Canceller && obj.__CANCELLER__;\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/core/Canceller.js?");

/***/ }),

/***/ "./src/core/Interceptor.js":
/*!*********************************!*\
  !*** ./src/core/Interceptor.js ***!
  \*********************************/
/*! exports provided: Interceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Interceptor\", function() { return Interceptor; });\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index.js */ \"./src/utils/index.js\");\n\r\n\r\nlet uid = 0;\r\n\r\nclass Interceptor {\r\n  constructor () {\r\n    this.handlers = [];\r\n  }\r\n\r\n  use (onFulfilled, onRejected) {\r\n    this.handlers.push({\r\n      id: uid ++,\r\n      onFulfilled,\r\n      onRejected \r\n    });\r\n  }\r\n\r\n  remove (id) {\r\n    this.handlers = this.handlers.filter(c => c.id !== id);\r\n  }\r\n\r\n  exec (payload, isRequest) {\r\n    let handler;\r\n    for (let i = 0, l = this.handlers.length; i < l; i ++) {\r\n      handler = this.handlers[i];\r\n\r\n      if (handler.onFulfilled) {\r\n        payload = handler.onFulfilled(payload);\r\n\r\n        if (isRequest && !Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_0__[\"isPlainObject\"])(payload)) {\r\n          return false;\r\n        }\r\n      }\r\n    }\r\n\r\n    return payload;\r\n  }\r\n\r\n  clear () {\r\n    this.handlers.length = 0;\r\n  }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/core/Interceptor.js?");

/***/ }),

/***/ "./src/core/Request.js":
/*!*****************************!*\
  !*** ./src/core/Request.js ***!
  \*****************************/
/*! exports provided: Request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Request\", function() { return Request; });\n/* harmony import */ var _adapters_xhr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapters/xhr.js */ \"./src/adapters/xhr.js\");\n/* harmony import */ var _adapters_jsonp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../adapters/jsonp.js */ \"./src/adapters/jsonp.js\");\n/* harmony import */ var _defaultConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../defaultConfig.js */ \"./src/defaultConfig.js\");\n/* harmony import */ var _utils_constant_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constant.js */ \"./src/utils/constant.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index.js */ \"./src/utils/index.js\");\n/* harmony import */ var _Interceptor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Interceptor.js */ \"./src/core/Interceptor.js\");\n/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./merge.js */ \"./src/core/merge.js\");\n/* harmony import */ var _RequestError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RequestError.js */ \"./src/core/RequestError.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction Request (config) {\r\n  this.defaultConfig = config;\r\n\r\n  // 初始化拦截器\r\n  this.interceptors = {\r\n    request:  new _Interceptor_js__WEBPACK_IMPORTED_MODULE_5__[\"Interceptor\"](),\r\n    response: new _Interceptor_js__WEBPACK_IMPORTED_MODULE_5__[\"Interceptor\"]()\r\n  };\r\n}\r\n\r\nconst _request = Request.prototype.request = function (config) {\r\n  return new Promise((resolve, reject) => {\r\n    const context = this;\r\n\r\n    config = getConfig.apply(this, arguments);\r\n    config = Object(_merge_js__WEBPACK_IMPORTED_MODULE_6__[\"mergeConfig\"])(context.defaultConfig, config);\r\n  \r\n    if (!('method' in config)) {\r\n      config.method = 'GET';\r\n    } else {\r\n      config.method = (isAllowMethod(config.method) ? \r\n        config.method : \r\n        context.defaultConfig.method).toUpperCase();\r\n    }\r\n\r\n    /**\r\n     * 合并baseURL和url\r\n     */\r\n    config.url = Object(_merge_js__WEBPACK_IMPORTED_MODULE_6__[\"combineURL\"])(config);\r\n    if (!config.url) {\r\n      reject(new _RequestError_js__WEBPACK_IMPORTED_MODULE_7__[\"RequestError\"]({\r\n        message: 'The url option must be set!',\r\n        config: config\r\n      }));\r\n      return;\r\n    }\r\n\r\n    /**\r\n     * 合并params\r\n     * { a: 10, b: 20 } -> http://xxx/xxx?a=10&b=20\r\n     */\r\n    const params = config.params;\r\n    if (params && Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_4__[\"isPlainObject\"])(params)) {\r\n      Object(_merge_js__WEBPACK_IMPORTED_MODULE_6__[\"combineParams\"])(config, params);\r\n    }\r\n\r\n    /**\r\n     * 检查并设置validateStatus\r\n     */\r\n    const validateStatus = config.validateStatus;\r\n    if (typeof(validateStatus) !== 'function') {\r\n      /**\r\n       * 如果手动将validateStatus设置成了其他类型，那么默认在改回默认配置中的validateStatus\r\n       */\r\n      config.validateStatus = _defaultConfig_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].validateStatus;\r\n    }\r\n\r\n    /**\r\n     * 调用请求拦截器处理函数\r\n     */\r\n    config = invokeRequestInterceptorHandlers(context, config, true);\r\n    if (config === false) {\r\n      reject(new _RequestError_js__WEBPACK_IMPORTED_MODULE_7__[\"RequestError\"]({\r\n        message: \"Request canceled!\",\r\n        config: config\r\n      }));\r\n      return;\r\n    } else if (!Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_4__[\"isPlainObject\"])(config)) {\r\n      reject(new _RequestError_js__WEBPACK_IMPORTED_MODULE_7__[\"RequestError\"]({\r\n        message: \"Request Interceptor must return config Object!\",\r\n        config: config\r\n      }));\r\n      return;\r\n    } \r\n\r\n    /**\r\n     * 检查用户用没用手动设置请求适配器，如果没有那么设置默认的请求适配器\r\n     */\r\n    let adapter = config.adapter;\r\n    if (!(adapter && Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_4__[\"isFunction\"])(adapter))) {\r\n      config.adapter = adapter = !!config.JSONP ? _adapters_jsonp_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] : _adapters_xhr_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n    }\r\n\r\n    /**\r\n     * 启动请求适配器发起请求\r\n     */\r\n    adapter(config).then(\r\n      (res) => {\r\n        resolve(invokeResponseInterceptorHandlers(context, res))\r\n      }, \r\n      reject\r\n    );\r\n  });\r\n}\r\n\r\nRequest.prototype.get = function (config) {\r\n  config = getConfig.apply(this, arguments);\r\n  config.method = 'GET';\r\n\r\n  return _request.call(this, config);\r\n}\r\n\r\nRequest.prototype.post = function (config) {\r\n  config = getConfig.apply(this, arguments);\r\n  config.method = 'POST';\r\n\r\n  return _request.call(this, config);\r\n}\r\n\r\nRequest.prototype.jsonp = function (config) {\r\n  config = getConfig.apply(this, arguments);\r\n  config.JSONP = true;\r\n\r\n  return _request.call(this, config);\r\n}\r\n\r\nfunction getConfig (config) {\r\n  if (typeof(config) === 'string') {\r\n    config = arguments[1] || {};\r\n    config.url = arguments[0];\r\n  } else if (!Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_4__[\"isPlainObject\"])(config)) {\r\n    config = {};\r\n  }\r\n\r\n  return config;\r\n}\r\n\r\nfunction isAllowMethod (method) {\r\n  method = method.trim().toUpperCase();\r\n  return _utils_constant_js__WEBPACK_IMPORTED_MODULE_3__[\"METHODS\"].some(m => method === m);\r\n}\r\n\r\nfunction invokeRequestInterceptorHandlers (req, ...args) {\r\n  const interceptor = req.interceptors.request;\r\n  return interceptor.exec.apply(interceptor, args);\r\n}\r\n\r\nfunction invokeResponseInterceptorHandlers (req, ...args) {\r\n  const interceptor = req.interceptors.response;\r\n  return interceptor.exec.apply(interceptor, args);\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/core/Request.js?");

/***/ }),

/***/ "./src/core/RequestError.js":
/*!**********************************!*\
  !*** ./src/core/RequestError.js ***!
  \**********************************/
/*! exports provided: RequestError, isRequestError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RequestError\", function() { return RequestError; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isRequestError\", function() { return isRequestError; });\nclass RequestError {\r\n  constructor (opts) {\r\n    if (typeof(opts) === 'string') {\r\n      this.message = opts;\r\n      this.config = null;\r\n      this.data = null\r\n    } else {\r\n      this.message = opts.message || 'Request Error!!!';\r\n      this.config = opts.config || null;\r\n      this.data = opts.data || null;\r\n    }\r\n  }\r\n\r\n  toJSON () {\r\n    const { message, config, data } = this;\r\n\r\n    return {\r\n      message,\r\n      config,\r\n      data\r\n    };\r\n  };\r\n\r\n  toString () {\r\n    return '' + JSON.stringify(this);\r\n  }\r\n};\r\n\r\n\r\nfunction isRequestError (obj) {\r\n  return obj instanceof RequestError;\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/core/RequestError.js?");

/***/ }),

/***/ "./src/core/merge.js":
/*!***************************!*\
  !*** ./src/core/merge.js ***!
  \***************************/
/*! exports provided: mergeConfig, combineURL, combineParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mergeConfig\", function() { return mergeConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"combineURL\", function() { return combineURL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"combineParams\", function() { return combineParams; });\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index.js */ \"./src/utils/index.js\");\n\r\n\r\nfunction mergeConfig(origin, target) {\r\n\r\n  var config = {};\r\n  for (const key in origin) {\r\n    if (Object.hasOwnProperty.call(origin, key)) {\r\n      if (key === 'headers') {\r\n        config[key] = JSON.parse(JSON.stringify(origin[key]));\r\n      } else {\r\n        config[key] = origin[key];\r\n      }\r\n    }\r\n  }\r\n\r\n  for (const key in target) {\r\n    if (Object.hasOwnProperty.call(target, key)) {\r\n      if (key === 'headers') {\r\n        config[key] = Object.assign(config[key], target[key]);\r\n      } else {\r\n        config[key] = target[key];\r\n      }\r\n    }\r\n  }\r\n\r\n  return config;\r\n}\r\n\r\nfunction combineURL (config) {\r\n  const baseURL = config.baseURL || '',\r\n        url = config.url || '';\r\n        \r\n  return baseURL + url;\r\n}\r\n\r\nfunction combineParams (config, params) {\r\n  const url = config.url,\r\n        paramString = parseParams(params);\r\n    \r\n  if (parseParams.length > 0) {\r\n    config.url =url + (url.indexOf('?') === -1 ? '?' : '&') + paramString;\r\n  }\r\n}\r\n\r\nfunction parseParams (params) {\r\n  let str = '';\r\n\r\n  if (!Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_0__[\"isPlainObject\"])(params)) {\r\n    return '';\r\n  };\r\n\r\n  for (const key in params) {\r\n    if (Object.hasOwnProperty.call(params, key)) {\r\n       str += `${key}=${params[key]}&`;\r\n    }\r\n  }\r\n\r\n  return str.replace(/&$/, '');\r\n}\n\n//# sourceURL=webpack:///./src/core/merge.js?");

/***/ }),

/***/ "./src/defaultConfig.js":
/*!******************************!*\
  !*** ./src/defaultConfig.js ***!
  \******************************/
/*! exports provided: DEFAULT_CONTENT_TYPE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_CONTENT_TYPE\", function() { return DEFAULT_CONTENT_TYPE; });\n/**\r\n *  该文件里面存放默认的请求配置信息\r\n */\r\nconst DEFAULT_CONTENT_TYPE = \"application/x-www-form-urlencoded\";\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  method: 'get',\r\n  responseType: 'JSON',\r\n  timeout: 0,\r\n  baseURL: '',\r\n  validateStatus: function (status) {\r\n    return status >= 200 && status < 300; \r\n  }\r\n});\n\n//# sourceURL=webpack:///./src/defaultConfig.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Canceller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Canceller.js */ \"./src/core/Canceller.js\");\n/* harmony import */ var _core_merge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/merge.js */ \"./src/core/merge.js\");\n/* harmony import */ var _core_Request_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/Request.js */ \"./src/core/Request.js\");\n/* harmony import */ var _core_RequestError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/RequestError.js */ \"./src/core/RequestError.js\");\n/* harmony import */ var _defaultConfig_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaultConfig.js */ \"./src/defaultConfig.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/index.js */ \"./src/utils/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction createInstance (defaultConfig) {\r\n  const context  = new _core_Request_js__WEBPACK_IMPORTED_MODULE_2__[\"Request\"](defaultConfig);\r\n  const instance = _core_Request_js__WEBPACK_IMPORTED_MODULE_2__[\"Request\"].prototype.request.bind(context);\r\n\r\n  /**\r\n   * 让instance继承Request.prototype和Request的实例的属性和方法集合\r\n   */\r\n  Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_5__[\"extend\"])(instance, _core_Request_js__WEBPACK_IMPORTED_MODULE_2__[\"Request\"].prototype, context);\r\n  Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_5__[\"extend\"])(instance, context);\r\n\r\n  instance.create = function (instanceConfig) {\r\n    return createInstance(Object(_core_merge_js__WEBPACK_IMPORTED_MODULE_1__[\"mergeConfig\"])(defaultConfig, instanceConfig));\r\n  };\r\n\r\n  instance.all = function (promises) {\r\n    return Promise.all(promises);\r\n  };\r\n\r\n  instance.race = function (promises) {\r\n    return Promise.race(promises);\r\n  };\r\n\r\n  return instance;\r\n}\r\n\r\nconst request = createInstance(_defaultConfig_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\r\n\r\nrequest.Canceller = _core_Canceller_js__WEBPACK_IMPORTED_MODULE_0__[\"Canceller\"];\r\nrequest.isCanceller = _core_Canceller_js__WEBPACK_IMPORTED_MODULE_0__[\"isCanceller\"];\r\nrequest.isRequestError = _core_RequestError_js__WEBPACK_IMPORTED_MODULE_3__[\"isRequestError\"];\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (request);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/constant.js":
/*!*******************************!*\
  !*** ./src/utils/constant.js ***!
  \*******************************/
/*! exports provided: METHODS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"METHODS\", function() { return METHODS; });\nconst METHODS = [\r\n  'GET',\r\n  'POST',\r\n  'PUT',\r\n  'PATCH',\r\n  'DELETE',\r\n  'OPTIONS',\r\n  'TRACE',\r\n  'HEAD',\r\n  'DELETE'\r\n];\r\n\r\n\n\n//# sourceURL=webpack:///./src/utils/constant.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: noop, isObject, isPlainObject, isFunction, genRandomStr, extend, isFormData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noop\", function() { return noop; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isObject\", function() { return isObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isPlainObject\", function() { return isPlainObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFunction\", function() { return isFunction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"genRandomStr\", function() { return genRandomStr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extend\", function() { return extend; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFormData\", function() { return isFormData; });\nfunction noop () {};\r\n\r\nfunction isObject (obj) {\r\n  return obj !== null && typeof(obj) === 'object';\r\n}\r\n\r\nfunction isPlainObject (obj) {\r\n  return Object.prototype.toString.call(obj) === '[object Object]';\r\n}\r\n\r\nfunction isFunction (obj) {\r\n  return typeof(obj) === 'function';\r\n}\r\n\r\nfunction genRandomStr(len){\r\n  var tokens = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';\r\n\r\n  var len = len || 20,\r\n      str = '';\r\n  for(var i = 0; i < len; i ++){\r\n      str += tokens[Math.floor(tokens.length * Math.random())];\r\n  }\r\n\r\n  return str + '_' + new Date().getTime();\r\n}\r\n\r\n/**\r\n * Extends object a by mutably adding to it the properties of object b.\r\n *\r\n * @param {Object} a The object to be extended\r\n * @param {Object} b The object to copy properties from\r\n * @param {Object} thisArg The object to bind function to\r\n * @return {Object} The resulting value of object a\r\n */\r\nfunction extend(a, b, thisArg) {\r\n  Object.keys(b).forEach(key => {\r\n    const val = b[key];\r\n\r\n    if (thisArg && typeof(val) === 'function') {\r\n      a[key] = val.bind(thisArg);\r\n    } else {\r\n      a[key] = val;\r\n    }\r\n  });\r\n  return a;\r\n};\r\n\r\n/**\r\n * Determine if a value is a FormData\r\n *\r\n * @param {Object} val The value to test\r\n * @returns {boolean} True if value is an FormData, otherwise false\r\n */\r\nfunction isFormData(val) {\r\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ })

/******/ });