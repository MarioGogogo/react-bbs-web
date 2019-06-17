import React from "react";
import { Route, Redirect } from "react-router-dom";
// 这个组件将根据登录的情况, 返回一个路由
const PrivateRoute = ({ component: Component, ...props }) => {
  const { location, config } = props;
  let { pathname } = location
  const isLogin = sessionStorage.getItem('userid')
  let add = false

  console.log(pathname.lastIndexOf("/"));
  if(pathname.lastIndexOf("/") > 0){
      pathname = pathname.slice(0,pathname.lastIndexOf("/"))
      add = true
  }

  const targetRouterConfig = config.find(v => v.path === pathname);
  if(add){
    targetRouterConfig.auth = true
  }


   console.log('看看',pathname,location, config,targetRouterConfig); 
  if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
    const { component } = targetRouterConfig;
    return <Route exact path={pathname} component={component} />;
  }

  if (isLogin) {
    // 如果是登陆状态，想要跳转到登陆，重定向到主页
    if (pathname === "/login") {
      return <Redirect to="/" />;
    } else {
      // 如果路由合法，就跳转到相应的路由
      if (targetRouterConfig) {
        return (
          <Route path={pathname} component={targetRouterConfig.component} />
        );
      } else {
        // 如果路由不合法，重定向到 404 页面
        return <Redirect to="/404" />;
      }
    }
  } else {
    // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
    if (targetRouterConfig && targetRouterConfig.auth) {
      return  <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location.pathname }
                  }}
                />
    } else {
      // 非登陆状态下，路由不合法时，重定向至 404
      return <Redirect to="/404" />;
    }
  }
};
export default PrivateRoute;
