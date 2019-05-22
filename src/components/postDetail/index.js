import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {getAxios, postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'
import PostEditor from "../../comom/postEditor";
import PostView from "../../comom/postView";
import CommentList from '../../comom/comments'


class PostsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comments: null,
      editing: false,
      isLike: false,
    }

  }

  componentDidMount() {
    this._refreshComments();
    this._refreshPostDetail()
  }

  /**
   * 获取评论
   * @private
   */
  _refreshComments = () => {
    const postId = this.props.match.params.id;
    getAxios(url.getCommentList(), postId).then(data => {
      if (data.success && data.data.length > 0) {
        this.setState({
          comments: data.data[0],
        })
      } else {
        this.setState({
          comments: [],
        })
      }
    })
  }
  /**
   * 获取详情内容
   * @private
   */
  _refreshPostDetail = () => {
    const postId = this.props.match.params.id;
    getAxios(url.getPostById(), postId).then(data => {
      if (data.success) {
        //判断这个帖子是否我已经点赞过
        const index = data.data.votes.indexOf(this.props.userId);
        this.setState({
          post: data.data,
          isLike: index === -1 ? false : true
        })
      } else {
        alert(data.msg)
      }
    })
  }

  /**
   * 保存帖子
   * @private
   */
  _handlePostSave(data) {
    const id = this.props.match.params.id;
    this._savePost(id, data)
  }

  /**
   * 保存帖子
   * @private
   */
  _savePost(id, post) {
    getAxios(url.updatePost(), id, post).then(data => {
      if (data.success) {
        const newPost = {...data, author: this.state.post.author};
        this.setState({
          post: newPost,
          editing: false
        })
      }
    })
  }

  /**
   * 退出帖子编辑
   * @private
   */
  _handlePostCancel = () => {
    this.setState({
      editing: true
    })
  }

  /**
   * 提交评论
   * @private
   */
  _handleCommentSubmit = (content) => {
    const postId = this.props.match.params.id;
    const comment = {
      userid: this.props.userId,
      username: this.props.username,
      id: postId,
      content: content
    }
    console.log(comment)

    this._saveComment(comment)

  }

  _saveComment(comment) {
    postAxios(url.createComment(), comment).then(data => {
      if (data.success) {
        console.log('评论提交完成')
        this.commentRef.clearValue();
        this._refreshComments();
      } else {
        alert(data.msg)
      }
    })
  }

  /**
   * 点击编辑提交
   * @private
   */
  _handelEditClick = () => {

  }
  /**
   * 点赞按钮
   * @private
   */
  _handleClickVote = () => {
    const bool = this.state.isLike;
    const postId = this.props.match.params.id;
    const params = {
      userId: this.props.userId,
      postId: postId,
      isLike: !bool
    }
    postAxios(url.clickvote(), params)
      .then(data => {
      if (data.success) {
        this.setState({
          isLike: !bool
        })
        //刷新
        this._refreshPostDetail()
      } else {
        alert(data.msg)
      }
    })
      .catch(e => {
        alert(e)
      })

  }

  render() {
    const {post, comments, editing, isLike} = this.state;
    const {userId} = this.props;
    if (!post) {
      return null;
    }
    // const editable =  userId === post.author.id;
    const editable = false;
    return (
      <div className="post">
        {
          editable ? (
              <PostEditor
                post={post}
                onSave={this._handlePostSave}
                onCancel={this._handlePostCancel}
              />
            )
            : (
              <PostView
                post={post}
                isLike={isLike}
                editable={editable}
                onEditClick={this._handelEditClick}
                onClickVote={this._handleClickVote}
              />
            )
        }
        <CommentList
          ref={ref => this.commentRef = ref}
          comments={comments}
          editable={editable}
          onSubmit={this._handleCommentSubmit}
        />
      </div>
    )
  }
}


export default CSSModules(PostsDetail, styles)


// math参数
// isExact: true
// params: {id: "123"}
// path: "/posts/:id"
// url: "/posts/123"
