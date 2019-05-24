import React, {Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import {postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'
import {FaUser, FaLock} from "react-icons/fa"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    console.log('是否重来',this.state.redirectToReferrer)
  }

  _handleSubmit = (e) => {
    //阻止默认事件
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    if (username.length === 0 || password.length === 0) {
      alert('用户名或密码不能为空')
      return
    }
    const params = {
      username,
      password
    }
    postAxios(url.login(), params).then(data => {
      console.log('data', data)
      if (!data.success) {
        alert(data.msg || "login failled")
        this.setState({
          username: "",
          password: ""
        })
        return;
      }
      //判断如果登录保存密码则加入token

      //保存登录信息
      sessionStorage.setItem('userid', data.data.id)
      sessionStorage.setItem('username', data.data.username)
      sessionStorage.setItem('role', data.data.role)
      sessionStorage.setItem('userToken', data.data.token)

      //登录成功改变状态
      this.setState({
        redirectToReferrer: true
      })
    })

  }

  _handleChange = (e) => {
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value
      })
    } else if (e.target.name === "password") {
      this.setState({
        password: e.target.value
      })
    }

  }

  render() {
    const {from} = this.props.location.state || {from: {pathname: "/"}};
    const {redirectToReferrer} = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from}/>
    }
    return (
      <div styleName="login">
        <div styleName="wrapper">
          <div styleName="header">BBS登录</div>
          <div styleName="form">
            <ul>
              <li>
                <div>
                  <FaUser styleName="name"/>
                  <input type="text" name="username" placeholder="username" value={this.state.username}
                         onChange={this._handleChange}/>
                </div>
              </li>
              <li>
                <div>
                  <FaLock styleName="mima"/>
                  <input type="text" name="password" placeholder="password" value={this.state.password}
                         onChange={this._handleChange}/>
                </div>
              </li>
              <li styleName="remember">
                <input type="checkbox"/>
                <label htmlFor="checkbox">
                </label>
                <span styleName="title">
                    Remember Me
                </span>
                <Link to={"/register"}><span styleName="register" >注册</span></Link>
              </li>
              <li>
                <input type="button" value="登录" onClick={this._handleSubmit}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const NewLogin = CSSModules(Login, styles)

export default NewLogin

