import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './loading.less'


const modalRoot = document.getElementById('modal-root');

class Loading extends Component{
  constructor(props){
    super(props)
    this.state={
      isLoading:false
    }
    this.el = document.createElement('div');
  }
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  showLoading = () => {
     this.setState({
        isLoading:true
     })
  };
  dismissLoading = () => {
    this.setState({
      isLoading:false
    })
  };

  render(){
    if(this.state.isLoading){
       return ReactDOM.createPortal(
        <NewChild/>,
        this.el,
      )
    }else{
       return null
    }

   }
}

function  Child(){
  return (
    <div styleName="loading">
       <div styleName="box">
         <p styleName="title">请稍后正在加载...</p>
       </div>
    </div>
  );
}

const NewChild = CSSModules(Child,styles)


export default Loading;

