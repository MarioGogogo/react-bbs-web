## BBS项目实战
一口一口来  胖子不是一下子就吃的胖的........
#登录
![](http://book.52react.cn/20190522185832.png)
#首页
![](http://book.52react.cn/20190523122006.png)
#详情
![](http://book.52react.cn/20190522185913.png)
* [x] 登录
* [x] 注册
* [x] 列表
* [x] 帖子详情
* [x] 创建帖子
* [ ] 更新帖子
* [x] 留言
* [x] 留言列表
* [x] 点赞
* [ ] 消息推送

TODO
后期再增加后台功能

#安装


```javascript
yarn

yarn start
```




### 跨域本地端口3000  要访问api端口4000


```javascript
//ctx.headers.origin === "http://localhost:3000"
  app.use(async (ctx, next) => {
    if(whitelist.includes(ctx.headers.origin)){
      ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
      ctx.set("Access-Control-Allow-Headers",  " Origin, X-Requested-With, Content-Type, Accept,Authorization");
      ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
      ctx.set('Access-Control-Allow-Credentials', true);
    }``
    await next();
  });
```



### 对请求header带上token

```javascript
 if(config.method === "post"){
    const $token = sessionStorage.getItem('userToken')
    console.log($token)
    if ($token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${$token}`;
    }
  }
```



### 解决登录后浏览器返回到又回登录界面
系统分四个路由：
根路由
登陆路由
主页路由
404 路由

其中，根路由和 /home 路由，都定向到了主页路由。
以上是一个基本的路由定义，可以在登陆/主页和 404 页面之间来回跳转，但也有一些问题：
非登陆状态下，可以直接跳转到主页
登陆状态下，也可以输入 /login 路由跳转到登录页

参考 
https://www.jianshu.com/p/677433245697
https://blog.csdn.net/weixin_34323858/article/details/87963999
