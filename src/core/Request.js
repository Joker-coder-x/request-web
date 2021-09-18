import xhrAdapter from "../adapters/xhr.js";
import jsonpAdapter from "../adapters/jsonp.js";
import defaultConfig from "../defaultConfig.js";
import { METHODS } from "../utils/constant.js";
import { isPlainObject, isFunction } from "../utils/index.js";
import { Interceptor } from "./Interceptor.js";
import { combineParams, combineURL, mergeConfig } from "./merge.js";
import { RequestError } from "./RequestError.js";

function Request (config) {
  this.defaultConfig = config;

  // 初始化拦截器
  this.interceptors = {
    request:  new Interceptor(),
    response: new Interceptor()
  };
}

const _request = Request.prototype.request = function (config) {
  return new Promise((resolve, reject) => {
    const context = this;

    config = getConfig.apply(this, arguments);
    config = mergeConfig(context.defaultConfig, config);
  
    if (!('method' in config)) {
      config.method = 'GET';
    } else {
      config.method = (isAllowMethod(config.method) ? 
        config.method : 
        context.defaultConfig.method).toUpperCase();
    }

    /**
     * 合并baseURL和url
     */
    config.url = combineURL(config);
    if (!config.url) {
      reject(new RequestError({
        message: 'The url option must be set!',
        config: config
      }));
      return;
    }

    /**
     * 合并params
     * { a: 10, b: 20 } -> http://xxx/xxx?a=10&b=20
     */
    const params = config.params;
    if (params && isPlainObject(params)) {
      combineParams(config, params);
    }

    /**
     * 检查并设置validateStatus
     */
    const validateStatus = config.validateStatus;
    if (typeof(validateStatus) !== 'function') {
      /**
       * 如果手动将validateStatus设置成了其他类型，那么默认在改回默认配置中的validateStatus
       */
      config.validateStatus = defaultConfig.validateStatus;
    }

    /**
     * 调用请求拦截器处理函数
     */
    config = invokeRequestInterceptorHandlers(context, config, true);
    if (config === false) {
      reject(new RequestError({
        message: "Request canceled!",
        config: config
      }));
      return;
    } else if (!isPlainObject(config)) {
      reject(new RequestError({
        message: "Request Interceptor must return config Object!",
        config: config
      }));
      return;
    } 

    /**
     * 检查用户用没用手动设置请求适配器，如果没有那么设置默认的请求适配器
     */
    let adapter = config.adapter;
    if (!(adapter && isFunction(adapter))) {
      config.adapter = adapter = !!config.JSONP ? jsonpAdapter : xhrAdapter;
    }

    /**
     * 启动请求适配器发起请求
     */
    adapter(config).then(
      (res) => {
        resolve(invokeResponseInterceptorHandlers(context, res))
      }, 
      reject
    );
  });
}

Request.prototype.get = function (config) {
  config = getConfig.apply(this, arguments);
  config.method = 'GET';

  return _request.call(this, config);
}

Request.prototype.post = function (config) {
  config = getConfig.apply(this, arguments);
  config.method = 'POST';

  return _request.call(this, config);
}

Request.prototype.jsonp = function (config) {
  config = getConfig.apply(this, arguments);
  config.JSONP = true;

  return _request.call(this, config);
}

function getConfig (config) {
  if (typeof(config) === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else if (!isPlainObject(config)) {
    config = {};
  }

  return config;
}

function isAllowMethod (method) {
  method = method.trim().toUpperCase();
  return METHODS.some(m => method === m);
}

function invokeRequestInterceptorHandlers (req, ...args) {
  const interceptor = req.interceptors.request;
  return interceptor.exec.apply(interceptor, args);
}

function invokeResponseInterceptorHandlers (req, ...args) {
  const interceptor = req.interceptors.response;
  return interceptor.exec.apply(interceptor, args);
}

export { Request };