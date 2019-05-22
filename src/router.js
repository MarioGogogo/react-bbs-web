import  React from 'react'
import {Switch,Route}  from 'react-router-dom'
import Login from './components/login'
import Home from './components/home';

function Routers() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home} />
         <Route path='/login' component={Login} />
        <Route path='/posts' component={Home} />
      </Switch>
    </main>
  );
}

// const Posts = ({match}) =>{
//     return (<React.Fragment>
//          <Route path={`${match.url}/:id`} component={PostsDetail} />
//          <Route exact path={match.url} component={PostList} />
//          </React.Fragment>
//     )
// }


export default Routers;

