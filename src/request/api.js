/**
 * API接口列表
 */
// export default {
//     //注册
//     register: () => "https://easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/regist#!method=post",
//     //登录
//     login: () => "https://easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/login#!method=post",
//     //获取列表
//     getPostList: () => "https://easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/postslist#!method=get",
//     //创建列表
//     createPost: () => "https://easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/saveposts#!method=post",
//     //更新列表
//     updatePost: () => "https://easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/updatepost#!method=post",
//     //获取列表详情
//     getPostById: () => "https://www.easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/postsbyid",
//     //获取评论列表
//     getCommentList: () => "https://www.easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/msglist",
//     //创建评论
//     createComment:()=>"https://easy-mock.com/mock/5cde2b36fcc0f0303ee63a0f/bbs/api/savemsg"
// }

console.log('服务环境',process.env.NODE_ENV)


export default {
  //注册
  register: () => "/register",
  //登录
  login: () => "/login",
  //获取列表
  getPostList: () => "/allpost",
  //创建列表
  createPost: () => "/createpost",
  //更新列表
  updatePost: () => "/updatepost",
  //获取列表详情
  getPostById: () => "/postbyid",
  //获取评论列表
  getCommentList: () => "/allcomment",
  //创建评论
  createComment:()=>"/createcomment",
  // 点赞
  clickvote:()=>"/clickvote"
}
