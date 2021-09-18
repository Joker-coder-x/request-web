import { isPlainObject } from "../utils/index.js";

export function mergeConfig(origin, target) {

  var config = {};
  for (const key in origin) {
    if (Object.hasOwnProperty.call(origin, key)) {
      if (key === 'headers') {
        config[key] = JSON.parse(JSON.stringify(origin[key]));
      } else {
        config[key] = origin[key];
      }
    }
  }

  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      if (key === 'headers') {
        config[key] = Object.assign(config[key], target[key]);
      } else {
        config[key] = target[key];
      }
    }
  }

  return config;
}

export function combineURL (config) {
  const baseURL = config.baseURL || '',
        url = config.url || '';
        
  return baseURL + url;
}

export function combineParams (config, params) {
  const url = config.url,
        paramString = parseParams(params);
    
  if (parseParams.length > 0) {
    config.url =url + (url.indexOf('?') === -1 ? '?' : '&') + paramString;
  }
}

function parseParams (params) {
  let str = '';

  if (!isPlainObject(params)) {
    return '';
  };

  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
       str += `${key}=${params[key]}&`;
    }
  }

  return str.replace(/&$/, '');
}