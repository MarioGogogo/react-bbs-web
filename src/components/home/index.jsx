import React, {Component} from 'react';
import Header from '../header'
import {Route,Redirect} from 'react-router-dom'
import PostsList from "../posts";
import PostsDetail from "../postDetail";

import CSSModules from 'react-css-modules';
import styles from './index.less'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state={
      username:null,
      userId:null,
      redirectToReferrer: false,
    }

  }

  componentDidMount() {
    this._getSessionStorage();
  }
  _getSessionStorage = async()=>{
    const username = await sessionStorage.getItem('username');
    const userId = await sessionStorage.getItem('userid');
    this.setState({
      username:username,
      userId:userId
    })
  }

  _handleLogOut = () => {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('userid')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('userToken')
    //判断当前路径是否是权限判断
    const {match, location} = this.props;
    if (location.pathname.lastIndexOf('/')>0) {
      this.setState({
        username:null,
        userId:null,
        redirectToReferrer:true
      })
    }else{
      this.setState({
        username:null,
        userId:null,
      })
    }
    

    

    
  }

  render() {
    const {match, location} = this.props;
    const {username,userId,redirectToReferrer} = this.state;
    // console.log('match', match)c
    // console.log('location', location)
    if(redirectToReferrer){
      return <Redirect
          to={{
            pathname: "/login",
            state: { from:location.pathname }
          }}
        />
    }
    return (
      <div styleName="home">
        <Header
          username={username}
          onLogout={this._handleLogOut}
          location={location}
        />
        <div styleName="content">
          <Route path={match.url} exact render={props => <PostsList username={username} userId={userId}  {...props} />} />
          <Route path={`${match.url}/:id`} render={props => <PostsDetail username={username} userId={userId} {...props}/>}  />
          
        </div>
      </div>
    )

  }
}

export default CSSModules(Home,styles)
