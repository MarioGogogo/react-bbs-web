import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {getAxios, postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'
import { FaThumbsUp,FaHandPeace,FaComment} from "react-icons/fa"


class PostItem extends Component{
  render() {
      const {post} = this.props;
    return (
       <li styleName="postItem">
           <div styleName="left">
             <div styleName="top">
               <div styleName="title">
                 {post.title}
               </div>
              <div styleName="tags"><span styleName="tagthink">想法交流</span><span styleName="taghelp">求助</span><span styleName="tagclose">已解决</span></div>
             </div>
             <div>
               <span>#55332 {post.author.username} 创建于{post.meta.updatedAt}</span>
             </div>
             <div>

             </div>
           </div>
            <div styleName="right">
              <img styleName="avatorurl" src="http://hbimg.b0.upaiyun.com/bed85651994d533bc5c670982f0aa050a9bbd5917601-ZBT63p_fw658" alt="avator"/>
              <div styleName="like">
                <FaHandPeace styleName="vote"/>
                <span styleName="voteTitle">{post.vote}</span>
              </div>
              <div styleName="comment">
                <FaComment styleName="msg"/>
                <span styleName="commentTitle">10</span>
              </div>
           </div>


       </li>
    );
  }
}

export default CSSModules(PostItem,styles);
