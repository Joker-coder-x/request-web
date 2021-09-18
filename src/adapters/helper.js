function parseResponseHeader (xhr) {
  const headerArr = xhr.getAllResponseHeaders().trim().split('\r\n');
  return headerArr.reduce((map, item) => {
    const [key, value] = item.split(':');
    map[key.trim()] = value.trim();

    return map;
  }, {});
}

export function buildJSONPResponseData (data, config) {
  return {
    data: data,
    config: config,
    status: 200,
    statusText: 'OK',
    headers: null,
    request: null
  };
}

export function buildResponseData (data, config, xhr) {
  const responseHeaders = parseResponseHeader(xhr);

  return {
    data: data,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: responseHeaders,
    config: config,
    request: xhr
  };
};

/**
 * 序列化请求体负载
 * @param {Object} data 
 */
export var serialize = (function (){
  var toString = Object.prototype.toString;
  var isObject = function (obj){
      return obj !== null && typeof(obj) === 'object';
  };
  var isArray = function (obj){
      return toString.call(obj) === '[object Array]';
  };
  var resoleReturnValueAEncode = function (str){
      return encodeURIComponent(str);
  };

  return function  _serialize (data){
      var index = arguments.length > 1 && arguments[1] !==undefined ? arguments[1] : 0,
          sourceKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '',
          str = '';
      
      var _doSerialize = function (key, val){
          if(typeof(val) === 'function'){
              val = '' + undefined;
          }else if(val === null){
              val = '';
          }else if(val === undefined){
              return;
          }else if(toString.call(val) === '[object RegExp]'){
              val = '' + val;
          }
          
          if(index === 0){
              str += isObject(val) ? 
                  (_serialize(val, index + 1, key) + '&') : 
                  (key + '=' + val + '&');
          }else{
              str += isObject(val) ? 
                  (_serialize(val, index + 1, sourceKey + '[' + key + ']') + '&') :
                  (sourceKey + '[' + key + ']=' + val + '&');
          }
      };

      if(isObject(data)){
          if(isArray(data)){
              if(index === 0){
                  throw new TypeError('root data must plain object');
              }

              var val;
              for(var i = 0, l = data.length; i < l; i ++){
                  val = data[i];
                  _doSerialize(isObject(val) ? i : '', data[i]);
              }
          }else{
              for (var key in data) {
                  if (Object.hasOwnProperty.call(data, key)) {
                      _doSerialize(key, data[key]);
                  }
              }
          }
      
          str = index === 0 ? resoleReturnValueAEncode(str.replace(/\&$/, '')) : str.replace(/\&$/, '');
      }else if(typeof(data) === 'string'){
          // 如果传入的参数是一个字符串那么就假设它已经被序列化了，这里就不做任何处理了，直接把这个字符串返回出去
          str = data;
      }

      return str;
  }
})();

