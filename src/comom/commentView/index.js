import React, {Component} from 'react'
import {getAxios, postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'


class CommentView extends Component{

  render() {
    const {comments} = this.props;
    return (
       <ul className="commentsview">
         {
           comments.map((item,index)=>{
              return (
                  <li key={item.author.id}>
                    <div>{item.content}</div>
                     <div className="sub">
                        <span>{item.author.username}</span>
                        <span>-</span>
                        <span>{item.updatedAt}</span>
                     </div>
                  </li>
              )
           })
         }
       </ul>
    );
  }
}

export default CSSModules(CommentView,styles)
