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
      posts:null,
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
           posts:data.data,
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
          id:this.props.userId,
          username:this.props.username
      }
      console.log(postData)
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
              <div styleName="contentheader">
                <div styleName="left">
                  <span styleName="title">讨论区</span>
                </div>
                <div styleName="right">
                  <input styleName="input" type="text" placeholder="输入搜索关键字"/>
                  {userId ? (<button styleName="btn" onClick={this._handleNewPost}>发帖</button>) : null}
                </div>
              </div>
            </div>
          {this.state.newPost && userId ? (<PostEditor onSave={this._handleSave} onCancel={this._handleCancel} />) : null}
          {
            this.state.posts && <PostsView posts={this.state.posts}/>
          }
        </div>
    )
  }
}

export default CSSModules(PostsList,styles)
