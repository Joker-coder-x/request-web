import request from "../src/index.js";

request.interceptors.request.use(config => {
  console.warn(config);
  return config;
  // return false; // 阻止请求
});


request.interceptors.response.use(res => {
  console.warn(res);

  return res;
});

request.defaultConfig.headers['Test'] = "this is test msg";
request.defaultConfig.timeout = 1500;

const canceller = new  request.Canceller();
// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=
// https://jsonplaceholder.typicode.com/todos/1
request.get('https://jsonplaceholder.typicode.com/todos/10' , {
  canceller: canceller,
  // timeout: 1000 * 3,
  params: {
    a: 10,
    b: 20
  },
  validateStatus (status) {
    console.log(status);
    return true;
  }
})
  .then(
    res => {
      console.log(res);
    },
    reason => {
      if (request.isCanceller(reason)) {
        /**
         * 手动取消了请求
         */
        console.error('' + reason);
      }

      console.error(reason);
    }
  );

console.dir(request);

setTimeout(() => {
  // canceller.cancel("我手动取消了");
}, 10);