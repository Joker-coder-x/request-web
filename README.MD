# request 是一个轻量级的web端请求库
  - 支持ajax和jsonp请求
  
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

# 拦截器

# 自定义请求适配器

# API
request.get(config)
request.post(config)
request.jsonp(config)
