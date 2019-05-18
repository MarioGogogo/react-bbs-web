import React ,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {postAxios}  from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'


 class Login extends Component{
   constructor(props){
     super(props)
     this.state={
       redirectToReferrer:false,
       username:"",
       password:""
     }
   }
  _handleSubmit = (e)=>{
     //阻止默认事件
     e.preventDefault();
     const username = this.state.username;
     const password = this.state.password;
     if(username.length === 0 || password.length === 0){
        alert('用户名或密码不能为空')
        return
     }
     const params = {
        username,
        password
     }
    postAxios(url.login(),params).then(data=>{
        if(!data.success){
          alert(data.data.msg || "login failled")
          this.setState({
            username:"",
            password:""
          })
          return;
        }
        //保存登录信息
        sessionStorage.setItem('userId',data.userId)
        sessionStorage.setItem('userName',data.userName)
        sessionStorage.setItem('userToken',data.token)
        //登录成功改变状态
        this.setState({
          redirectToReferrer:true
        })
    })

  }

  _handleChange = (e)=>{
     if(e.target.name === "username"){
        this.setState({
           username:e.target.value
        })
     }else if(e.target.name === "password"){
       this.setState({
         password:e.target.value
       })
     }

  }

    render() {
       const {from } = this.props.location.state || {from:{pathname:"/"}};
       const {redirectToReferrer} = this.state;
      if(redirectToReferrer){
        return <Redirect to={from} />
       }
       return (
          <form styleName="login" onSubmit={this._handleSubmit}>
             <div styleName="content">
               <label styleName="username">
                 用户名：<input type="text" name="username" value={this.state.username} onChange={this._handleChange}/>
               </label>
               <br/>
               <label styleName="password">
                 密码：<input type="text" name="password" value={this.state.password} onChange={this._handleChange}/>
               </label>
               <br/>
               <input type="submit" value="登录"/>
             </div>
          </form>
       )

    }
}

export default CSSModules(Login, styles)
