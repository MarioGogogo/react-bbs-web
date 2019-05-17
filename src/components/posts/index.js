import React ,{Component} from 'react';
import {getAxios,postAxios}  from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'
import PostEditor from '../../comom/postEditor'
import PostsView from '../../comom/postsView'



 class PostsList extends Component{
  constructor(props) {
    super(props);
    this.state={
      posts:[],
      newPost:false
    }
  }


  componentDidMount() {
     this._refreshPostList()
  }

  _refreshPostList = ()=>{
    //调用后台Api请求列表
    getAxios(url.getPostList()).then(data=>{
       if(data.success){
         this.setState({
           posts:data.data.list,
           newPost:false
         })
       }
    })
  }

   /**
    * 新建帖子
    * @private
    */
   _handleNewPost = ()=>{
      this.setState({
          newPost:true
      })
  }

   /**
    * 保存帖子
    * @private
    */
   _handleSave = (data)=>{
      const postData = {
          ...data,
          author:this.props.userId,
          vote:0,
      }
      postAxios(url.createPost(),postData).then(data =>{
         if(data.success){
           //刷新帖子
           this._refreshPostList();
         }
      })
   }
   /**
    * 退出
    * @private
    */
   _handleCancel = ()=>{
      this.setState({
        newPost:false
      })
   }

  render() {
    const {userId} = this.props;
    return (
        <div styleName="postList">
            <div>
               <h2 styleName="title">话题列表</h2>
              {userId ? ( <div styleName="btnWrapper"><button styleName="btn" onClick={this._handleNewPost}>发帖</button></div>) : null}
            </div>
          {this.state.newPost ? (<PostEditor onSave={this._handleSave} onCancel={this._handleCancel} />) : null}
          <PostsView posts={this.state.posts}/>
        </div>
    )
  }
}

export default CSSModules(PostsList,styles)
