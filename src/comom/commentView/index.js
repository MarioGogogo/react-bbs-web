import React, {Component} from 'react'
import {getAxios, postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'


class CommentView extends Component{

  render() {
    const {comments} = this.props;
    const items = comments.contents;
    return (
       <ul>
         {
           items.map((item,index)=>{
              return (
                  <li key={item.commentid} styleName="commentitem">
                    <div styleName="left">
                      <img styleName="avatorurl" src="http://img.52z.com/upload/news/image/20180108/20180108122831_73637.jpg" alt="avator"/>
                    </div>
                    <div styleName="right">
                       <div styleName="info">
                         <span>{item.author.username}</span><span styleName="time">{item.time}</span>
                       </div>
                         <div>{item.content}</div>
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
