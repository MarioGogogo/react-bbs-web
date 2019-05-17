import React, {Component} from 'react';
import Header from '../header'
import {Route} from 'react-router-dom'
import PostsList from "../posts";
import PostsDetail from "../postDetail";


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null
    }
  }

  _handleLogOut = () => {
    alert('推出')
  }

  render() {
    const {match, location} = this.props;
    const username = this.state;

    return (
      <div>
        <Header
          username={username}
          onLogout={this._handleLogOut}
          location={location}
        />
        <Route path={match.url} exact render={props => <PostsList username={username}  {...props} />} />
        <Route path={`${match.url}/:id`} render={props => <PostsDetail username={username} {...props}/>}  />
      </div>
    )

  }
}

export default Home
