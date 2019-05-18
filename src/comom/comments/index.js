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
    this.props.onSubmit()
  }

  _handleOnChange=(e)=>{
    this.setState({
       value:e.target.value,
    })
  }
  render() {
    const {comments,editable} = this.props;
    return (
      <div className="commentlist">
        <div className="title">评论</div>
        {
          editable ? (
            <div className="editor">
               <textarea
                 name="text"
                 placeholder="说说你的看法"
                 onChange={this._onChange}
                 value={this.state.value}
                 cols="30" rows="10"
               />
               <button onClick={this._handleClick}></button>
            </div>
          )
            :(
              <CommentView comments={comments} />
            )
        }
      </div>


    )
  }

}


export default CSSModules(CommentList,styles)
