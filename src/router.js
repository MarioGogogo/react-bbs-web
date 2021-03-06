import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import ErrorPage from "./components/errorPage";
import About from "./components/about";
import PrivateRoute from './comom/privateRoute';

const routeConfig = [
  {
    path:'/',
    component:Home,
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/register',
    component:Register,
  },
  {
    path:'/posts',
    component:Home,
  },
  {
    path:'/about',
    component:About,
    auth:true       //代表需要登录权限
  },
  {
    path:'/404',
    component:ErrorPage,
  },
]


function Routers() {
  return (
    <main>
      <Switch>
        <PrivateRoute  config={routeConfig}  />
        {/* <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/posts" component={Home} /> */}
        {/* <Route path='/about' component={About} /> */}
        {/* <PrivateRoute path="/about" component={About} />
        <Route path="/404" component={ErrorPage} />
        <Redirect to={"/404"} /> */}
      </Switch>
    </main>
  );
}

//路由守卫
// function PrivateRoute({ component: Component, ...rest }) {
//   //  render和component是二选一的
//  const auth = {
//     isLogin: false
//   };
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         auth.isLogin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location.pathname }
//             }}
//           />
//         )
//       }
//     />
//   );
 
// }

// const Posts = ({match}) =>{
//     return (<React.Fragment>
//          <Route path={`${match.url}/:id`} component={PostsDetail} />
//          <Route exact path={match.url} component={PostList} />
//          </React.Fragment>
//     )
// }

export default Routers;
