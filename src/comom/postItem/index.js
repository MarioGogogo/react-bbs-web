import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {getAxios, postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'
import { FaThumbsUp} from 'react-icons/fa';


class PostItem extends Component{
  render() {
      const {post} = this.props;
    return (
       <li styleName="postItem">
           <div styleName="title">{post.title}</div>
            <div>
               创建人：<span>{post.author.username}</span>
            </div>
         <div>
           更新时间：<span>{post.updatedAt}</span>
         </div>
         <div styleName="like">
             <FaThumbsUp styleName="vote"/>
             <span styleName="voteTitle">{post.vote}</span>
         </div>
       </li>
    );
  }
}

export default CSSModules(PostItem,styles);
