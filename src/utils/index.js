export function noop () {};

export function isObject (obj) {
  return obj !== null && typeof(obj) === 'object';
}

export function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isFunction (obj) {
  return typeof(obj) === 'function';
}

export function genRandomStr(len){
  var tokens = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  var len = len || 20,
      str = '';
  for(var i = 0; i < len; i ++){
      str += tokens[Math.floor(tokens.length * Math.random())];
  }

  return str + '_' + new Date().getTime();
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
export function extend(a, b, thisArg) {
  Object.keys(b).forEach(key => {
    const val = b[key];

    if (thisArg && typeof(val) === 'function') {
      a[key] = val.bind(thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
};

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
export function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
};
