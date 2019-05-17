/**
 * 全局唯一的Loading显示隐藏工具类。
 * use:
 导入：import LoadingUtil from "./LoadingUtil";

 显示：LoadingUtil.showLoading();
 隐藏：LoadingUtil.dismissLoading();
 */

let LoadingUtil = {
  showLoading(timeOut = 1000){
    global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
    this.timerLoading = setTimeout(() => {
      this.dismissLoading();
      console.log('加载弹框出现把 啦啦啦')
    }, timeOut);

  },
  dismissLoading(){
    global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
    this.timerLoading && clearTimeout(this.timerLoading);

  },
};

export default LoadingUtil;

