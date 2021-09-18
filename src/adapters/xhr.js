import { isFormData, isFunction } from "../utils/index.js";
import { DEFAULT_CONTENT_TYPE } from "../defaultConfig.js";
import { isCanceller } from "../core/Canceller.js";
import { buildResponseData, serialize } from "./helper.js";
import { RequestError } from "../core/RequestError.js";

function resolveDataType(responseType, xhr){
  var result;
  switch(responseType){
      case 'TEXT':
          result = xhr.responseText;
          break;
      case 'XML':
          result = xhr.responseXML;
          break;
      case 'JSON':
      default:
        try{
          result = JSON.parse(xhr.responseText);
        } catch(e) {
          return xhr.responseText;
        }
        break;    
  }

  return result;
}

function xhrAdapter (config) {
  return new Promise((resolve, reject) => {
    var xhr = new (window.XMLHttpRequest || window.ActiveXObject('Microsoft.XMLHTTP')),
      method = config.method,
      url = config.url,
      data = config.data || null,
      responseType = config.responseType.toUpperCase(),
      timeout = config.timeout,
      headers = config.headers || {},
      validateStatus = config.validateStatus,
      t = null;

    if (!xhr) {
      reject(new RequestError({
        message: '您的浏览器不支持异步发起HTTP请求，请更新您的浏览器版本！',
        config: config
      }));
    }

    // 初始化请求xhr对象
    xhr.open(method, url, true);

    // 设置请求头
    for (var key in headers) {
      if (Object.hasOwnProperty.call(headers, key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    /**
     * 设置表单提交的Content-type
     * 如果data为FormData实例的情况下浏览器会根据数据类型自行设置Content-type
     */
    if (method === 'POST' && !isFormData(data) && !("Content-type" in headers)) {
      xhr.setRequestHeader('Content-type', DEFAULT_CONTENT_TYPE);
    }

    /**
     * 处理请求错误的回调函数
     * 注意：这个API的兼容性不是特别好
     */
    xhr.onerror = function () {
      reject(new RequestError({
        message: 'Network Error!',
        config: config
      }));
      xhr = null;
      clearTimeout(t);
      t = null;
    }

    // Handle progress if needed
    if (isFunction(config.onDownloadProgress)) {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // 不是所以的浏览器都支持这个upload事件
    if (isFunction(config.onUploadProgress) && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    // 监听状态改变
    xhr.onreadystatechange = function (){
      if(xhr.readyState === 4){
          clearTimeout(t);
          t = null;

          if (validateStatus(xhr.status)) {
            resolve(buildResponseData(resolveDataType(responseType, xhr), config, xhr));
          } else {
            reject(buildResponseData(resolveDataType(responseType, xhr), config, xhr));
          }
      }
    };

    var canceller = config.canceller;
    if (canceller && isCanceller(canceller)) {
      canceller.promise.then(
        () => {
          if (!xhr) {
            return;
          };

          xhr.abort();
          xhr = null;
          clearTimeout(t);
          t = null;
          reject(canceller);
        },
        reject
      );
    }

    if (timeout !== 0) {
      // 请求超时：部分浏览器不支持ontimeout事件，所以这里做兼容性处理。 
      t = setTimeout(function (){
        xhr.abort();
        clearTimeout(t);
        t = null;
        xhr = null;
        reject(new RequestError({
          message: '请求超时了',
          config: config
        }));
      }, timeout);
    }

    // 发送请求
    xhr.send((method === 'POST' ? serialize(data) : data));
  });
}

export default xhrAdapter;