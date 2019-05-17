import React, {Component} from 'react'
import {getAxios, postAxios} from '../../request/http'
import url from '../../request/api';
import CSSModules from 'react-css-modules';
import styles from './index.less'


class PostEditor extends Component {
  constructor(props) {
    super(props);
    const {post} = this.props;
    this.state = {
      title: (post && post.title) || "",
      content: (post && post.content) || ""
    }
  }

  _handleChange=(e)=>{
     const name = e.target.name;
     if(name === "title"){
       this.setState({
         title:e.target.value
       })
     }else if(name === "content"){
       this.setState({
          content:e.target.value
       })
     }
  }

  _handleCancelClick=(e)=>{
    this.props.onCancel()
  }

  _handleSaveClcik=()=>{
     const data={
        title:this.state.title,
        content:this.state.content
     }
     //调用父组件方法
     this.props.onSave(data);
  }



  render() {
    return (
      <div styleName="postEditor">
        <input type="text"
               name="title"
               placeholder="标题"
               styleName="title"
               value={this.state.title}
               onChange={this._handleChange}
        />
        <textarea
          styleName="content"
          name="content"
          placeholder="内容"
          value={this.state.content}
          onChange={this._handleChange}
        />
        <button styleName="cancelBtn" onClick={this._handleCancelClick}>取消</button>
        <button styleName="saveBtn" onClick={this._handleSaveClick} >保存</button>
      </div>
    )
  }

}

export default CSSModules(PostEditor,styles)

