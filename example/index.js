import request from "../src/index.js";

request.interceptors.request.use(config => {
  console.warn(config);
  return config;
  // return false; // 阻止请求
});

request.interceptors.response.use(res => {
  console.warn(res);
  res.msg += "!!!";

  return res;
});

const canceller = new  request.Canceller();
// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=
// https://jsonplaceholder.typicode.com/todos/1
request.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=娃娃' , {
  canceller: canceller,
  timeout: 1000 * 3,
  params: {
    a: 10,
    b: 20
  },
  adapter: function (config) {
    console.warn('custom adater');
    console.warn(config);
    
    return new Promise((resolve, reject) => {
      resolve({ msg: '这是一条测试消息' });
    });
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