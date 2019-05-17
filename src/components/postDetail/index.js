import React ,{Component} from 'react';



export default class PostsDetail extends Component{
  render() {
    console.log(this.props.match)
    return <div>详情</div>
  }
}






// math参数
// isExact: true
// params: {id: "123"}
// path: "/posts/:id"
// url: "/posts/123"
