import React, {Component} from 'react'
import {Link} from "react-router-dom";

import CSSModules from 'react-css-modules';
import styles from './index.less'
import PostItem from '../postItem';

class PostsView extends Component{
  render() {
    const {posts} = this.props;
    return (
       <ul styleName="postsView">
         {posts.map((item,index)=>{
           return <Link key={item.id}  to={`/posts/${item.id}`}>
              <PostItem post={item}/>
           </Link>
         })}
       </ul>
    );
  }
}

export default CSSModules(PostsView,styles);




