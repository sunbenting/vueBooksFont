import request from '@/utils/request'
import qs from 'qs'

//test
  //获取图书类别
  const  getSjlb=()=> {
    return request({
      url: '/union-web/bookManagementAction.do?method=getSjlb',
      method: 'get'   
    })
  }
//获取书籍管理列表
const  getBookList=(params)=> {
  return request({
    url: '/union-web/bookManagementAction.do?method=getBookList',
    method: 'get',
    params   
  })
}
//书籍详情

const  getBookInfo=(params)=> {
    return request({
      url: '/union-web/tsglAction.do?method=getBookInfo',
      method: 'get',
      params
    })
  }
//书籍普通评论

const  getComReviewList=(params)=> {
  return request({
    url: '/union-web/reviewManagementAction.do?method=getGeneral',
    method: 'get',
    params
    
  })
}
//书籍精选评论

const  getFineReviewList=(params)=> {
  return request({
    url: '/union-web/tsglAction.do?method=getChoiceness',
    method: 'get',
    params
    
  })
}
//保存订单信息

const  addOrderInfo=(params)=> {
  return request({
    url: '/union-web/orderManagementAction.do?method=saveOrderInfo',
    method: 'get',
    params
    
  })
}
//个人批次下待提交订单信息

const  UnSubOrderList=(params)=> {
  return request({
    url: '/union-web/orderManagementAction.do?method=getUnSubOrderListById',
    method: 'get',
    params 
  })
}

//点赞
const  aadReviewSupport=(params)=> {
  return request({
    url: '/union-web/reviewManagementAction.do?method=aadReviewSupport',
    method: 'get',
    params
  })
}
  //获取用户信息
  const  UserInfo=(params)=> {
    return request({
      url: '/union-web/batchManagementAction.do?method=getPcInfo',
      method: 'get',
      params   
    })
  }

  // 获取评论数量

  const  getPlCount=(params)=> {
    return request({
      url: '/union-web/tsglAction.do?method=getPlCount',
      method: 'get',
      params   
    })
  }

// development

//   //获取图书类别
//   const  getSjlb=()=> {
//     return request({
//       url: '/api/bookManagementAction.do?method=getSjlb',
//       method: 'get'   
//     })
//   }
// //获取书籍管理列表
// const  getBookList=(params)=> {
//   return request({
//     url: '/api/bookManagementAction.do?method=getBookList',
//     method: 'get',
//     params   
//   })
// }
// //书籍详情

// const  getBookInfo=(params)=> {
//     return request({
//       url: '/api/tsglAction.do?method=getBookInfo',
//       method: 'get',
//       params
      
//     })
//   }
// //书籍普通评论

// const  getComReviewList=(params)=> {
//   return request({
//     url: '/api/reviewManagementAction.do?method=getGeneral',
//     method: 'get',
//     params
    
//   })
// }
// //书籍精选评论

// const  getFineReviewList=(params)=> {
//   return request({
//     url: '/api/tsglAction.do?method=getChoiceness',
//     method: 'get',
//     params
    
//   })
// }
// //保存订单信息

// const  addOrderInfo=(params)=> {
//   return request({
//     url: '/api/orderManagementAction.do?method=saveOrderInfo',
//     method: 'get',
//     params
    
//   })
// }
// //个人批次下待提交订单信息

// const  UnSubOrderList=(params)=> {
//   return request({
//     url: '/api/orderManagementAction.do?method=getUnSubOrderListById',
//     method: 'get',
//     params 
//   })
// }


// //点赞
// const  aadReviewSupport=(params)=> {
//   return request({
//     url: '/api/reviewManagementAction.do?method=aadReviewSupport',
//     method: 'get',
//     params
//   })
// }
//   //获取用户信息
//   const  UserInfo=(params)=> {
//     return request({
//       url: '/api/batchManagementAction.do?method=getPcInfo',
//       method: 'get',
//       params   
//     })
//   }
//   // 获取评论数量

// const  getPlCount=(params)=> {
//   return request({
//     url: '/api/tsglAction.do?method=getPlCount',
//     method: 'get',
//     params   
//   })
// }

export { 
    getSjlb,
    getBookList,
    getBookInfo,
    getComReviewList,
    getFineReviewList,
    addOrderInfo,
    UnSubOrderList,
    UserInfo,
    aadReviewSupport,
    getPlCount
}
