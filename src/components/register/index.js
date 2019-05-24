import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import {Link} from "react-router-dom";
import styles from './index.less'
import {FaUser, FaLock} from "react-icons/fa"

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRegister: false,
      username: "",
      password: ""
    }
  }

  _handleSubmit = (e) => {
    //阻止默认事件
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const reppassword =this.state.reppassword
    if (username.length === 0 || password.length === 0) {
      alert('用户名或密码不能为空')
      return
    }else if(password !== reppassword){
      alert('二次输入密码不一致，请重新输入')
      return
    }
    const params = {
      username,
      password
    }
    postAxios(url.register(), params).then(data => {
      console.log('data', data)
      if (!data.success) {
        alert(data.msg || "register failled")
        this.setState({
          username: "",
          password: "",
          reppassword:"",
        })
        return;
      }
      //判断如果登录保存密码则加入token
      alert('恭喜你注册成功！')
      //保存登录信息
      sessionStorage.setItem('userid', data.data.id)
      sessionStorage.setItem('username', data.data.username)
      sessionStorage.setItem('role', data.data.role)
      sessionStorage.setItem('userToken', data.data.token)
      //注册成功改变状态
      this.setState({
        isRegister: true
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
    } else if (e.target.name === "reppassword") {
      this.setState({
        reppassword: e.target.value
      })
    }

  }

  render() {
    const {from} = this.props.location.state || {from: {pathname: "/"}};
    const {isRegister} = this.state;
    if (isRegister) {
      return <Redirect to={from}/>
    }
    return (
      <div styleName="login">
        <div styleName="wrapper">
          <div styleName="header">BBS注册</div>
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
              <li>
                <div>
                  <FaLock styleName="mima"/>
                  <input type="text" name="reppassword" placeholder="repeat password" value={this.state.reppassword}
                         onChange={this._handleChange}/>
                </div>
              </li>
              <li styleName="remember">
                <Link to={"/login"}><span styleName="register" >返回登录</span></Link>
              </li>
              <li>
                <input type="button" value="注册" onClick={this._handleSubmit}/>
              </li>
            </ul>
          </div>
        </div>
      </div>

    )

  }
}

export default CSSModules(Register, styles)

