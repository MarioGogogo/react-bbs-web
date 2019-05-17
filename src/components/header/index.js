import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './index.less'
import { FaHome,FaHeart } from 'react-icons/fa';


class Header extends Component{
  render() {
    const {username,onLogOut,location} = this.props;

    return (
        <div styleName="header">
            <div styleName="nav">
               <span styleName="left">
                 <Link to="/"><FaHome styleName="home"/></Link>
               </span>
              {username && username.length >0 ? (
                 <span styleName="user">
                    当前用户：{username}&nbsp;
                     <button onClick={onLogOut}>退出</button>
                 </span>
              ) :(
                <span styleName="right">
                  <Link  styleName="btn" to={{pathname:"/login",state:{from:location}}}>登录</Link>
                </span>
              )}
            </div>
        </div>
    )
  }
}





export default CSSModules(Header,styles)
