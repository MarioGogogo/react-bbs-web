import React, {Component} from 'react'
import {Link} from "react-router-dom";

import CSSModules from 'react-css-modules';
import styles from './index.less'
import { FaHandPeace} from 'react-icons/fa';

class PostView extends Component{

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('为什么跑三次')
    if(nextProps.post.author){
      return true
    }
    return false
  }

  render() {
    const {post,onClickVote,isLike} = this.props;
    return (
      <li styleName="postView">
        <div styleName="viewheader">{post.title}</div>
        <div styleName="viewinfo">
          <img styleName="avatorurl" src="http://hbimg.b0.upaiyun.com/bed85651994d533bc5c670982f0aa050a9bbd5917601-ZBT63p_fw658" alt="avator"/>
          {post.author && post.author.username} 创建于:{post.meta && post.meta.updatedAt}
        </div>
        <div styleName="viewcontent">{post.content}</div>
        <div styleName="like">
          <span onClick={onClickVote}>
            <FaHandPeace styleName={isLike ? "active" : "vote"}   />
          </span>
          <span styleName="votetitle">    {post.vote}</span>
        </div>
      </li>
    );
  }
}

export default CSSModules(PostView,styles);
