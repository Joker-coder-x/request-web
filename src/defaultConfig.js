/**
 *  该文件里面存放默认的请求配置信息
 */
export const DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded";

export default {
  method: 'get',
  responseType: 'JSON',
  timeout: 0,
  baseURL: '',
  validateStatus: function (status) {
    return status >= 200 && status < 300; 
  }
};