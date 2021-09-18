# request 是一个轻量级的web端请求库
  - 支持ajax和jsonp请求
  

# 安装
```bash
  npm install request-web --save
```

# 用法
```javascript
  request.get(url, config)
    .then(
      response => {
        console.log(response);
      },
      reason => {
        console.error(reason)
      }
    );
```

# 请求配置
这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。

```javascript
  {
     // `url` 是用于请求的服务器 URL
    url: '/user',

    // `method` 是创建请求时使用的方法
    method: 'get', // default

    /**
     * 该配置项是jsonp请求专用，普通ajax请求直接忽略该配置就行
     * jsonp请求的url上的键名标识: http://xxx/xxx?cb=fnName
     */
    jsonpFlag: 'cb', // default

    /*
     * 该配置项是jsonp请求专用，普通ajax请求直接忽略该配置就行
     * 发起jsonp请求的标识，true为发送jsonp请求, falsy则发送XMLHttpRequest请求
     */
    JSONP: false, // default

    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: 'https://some-domain.com/api/',

    // `headers` 是即将被发送的自定义请求头
    headers: {},

    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {
      ID: 12345
    },

    // `data` 是作为请求主体被发送的数据
    data: {
      name: 'mile'
    },

    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 0, // default


    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 
    adapter: function (config) {
      /* ... */
    },

     // `responseType` 表示服务器响应的数据类型，可以是 'xml',  'json', 'text',
    responseType: 'json', // default

     // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },

    // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },

    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },

    // 用于取消请求的Canceller实例对象
    canceller: canceller
  }
```
# 响应结构

某个请求的响应包含以下信息
```javascript
  {
    // `data` 由服务器提供的响应
    data: {},

    // `status` 来自服务器响应的 HTTP 状态码
    status: 200,

    // `statusText` 来自服务器响应的 HTTP 状态信息
    statusText: 'OK',

    // `headers` 服务器响应的头
    headers: {},

     // `config` 是为请求提供的配置信息
    config: {},
   // 'request'
    // `request` is the request that generated this response
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request: {}
  }
```

使用 then 时，你将接收下面这样的响应 :
```javascript
  request.get('/user/12345')
    .then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
```


# 发送JSONP请求
`request.jsonp(url, [config])`

> 注意JSONP请求的method只能是GET

### 方法一
```javascript
  request.json({
    url: '/user/1',
    jsonpFlag: 'cb', // default
  })
    .then(
      response => {
        // logic...
      },
      reason => {
        // logic
      }
    );
```

### 方法二
```javascript
  request({
    url: '/user/1',
    JOSNP: true,
    jsonpFlag: 'cb', // default
  })
    .then(
      response => {
        // logic...
      },
      reason => {
        // logic
      }
    );
```

# 实例
创建实例
可以使用自定义配置新建一个 request 实例，该功能类似函数式编程中柯里化函数的思想。

`request.create([config])`

```javascript
  const instance = request.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
``` 


# 拦截器

拦截器
在请求或响应被 then 或 catch 处理前拦截它们。

```javascript
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你现在请求拦截器中过滤请求你可以在拦截器中返回falsy值，阻止该请求发送
```javascript
    // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 阻止发送该请求
    return false;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```

如果你想在稍后移除拦截器，可以这样：
```javascript
  const myInterceptor = request.interceptors.request.use(function () {/*...*/});
  request.interceptors.request.remove(myInterceptor);
```



# 自定义请求适配器
可以用该配置来自定义您的请求适配器。

```javascript
  request({
    url: '/user/1',
    /**
     * adapter必须是一个函数
     * config，您传入的请求配置项
     */
    adapter: function (config) {
      // 必须返回一个Promise，否则会报错
      return Promise ((resolve, reject) => {
        // write logic...
      });
    }
  });
```

# 取消
使用Canceller取消请求


可以使用 request.Canceller 构造器创建 canceller 像这样：
```javascript
  const canceller = new request.Canceller();
  const isCanceller = request.isCanceller;

  request.get('/user/12345', {
    canceller
  }).catch(function(thrown) {
    if (isCanceller(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      // 处理错误
    }
  });

  // 取消请求（message 参数是可选的）
  canceller.cancel('message');
```



# API
可以通过向 axios 传递相关配置来创建请求。
- `request.get(url, [config])`
- `request.post(url, [config])`
- `request.jsonp(url, [config])`



## request(config)

```javascript
  // 发送 POST 请求
  request({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });
```

## request(url, [config])
// 发送 GET 请求（默认的方法）
```javascript
  request('/user/12345');
```
