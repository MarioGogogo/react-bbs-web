import React, {Component} from 'react'
import {getAxios, postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'
import CommentView from '../commentView'

class CommentList extends Component{
  constructor(props) {
    super(props);
    this.state={
      value:""
    }
  }

  /**
   * 提交评论
   * @private
   */
  _handleClick=()=>{
    this.props.onSubmit(this.state.value)
  }

  clearValue(){
    this.setState({
      value:''
    })
  }

  _handleOnChange=(e)=>{
    this.setState({
       value:e.target.value,
    })
  }
  render() {
    const {comments,editable} = this.props;
    return (
      <div styleName="commentlist">
        <div styleName="title">评论</div>
        {
          editable || 1==1 ? (
            <div styleName="editor">
               <textarea
                 name="text"
                 styleName="textarea"
                 placeholder="说说你的看法"
                 onChange={this._handleOnChange}
                 value={this.state.value}
                 cols="30" rows="10"
               />
               <button styleName="btn"  onClick={this._handleClick}>提交评论</button>
            </div>
          ):null
        }
        {
          comments.contents && <CommentView comments={comments} />
        }

      </div>


    )
  }

}


export default CSSModules(CommentList,styles)
