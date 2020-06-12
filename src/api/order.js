import request from '@/utils/request'
import qs from 'qs'



//个人批次下待提交订单信息（查询）
const  getUnSubOrderListById=(params)=> {
  return request({
    url: '/union-web/orderManagementAction.do?method=getUnSubOrderListById',
    method: 'get',
    params   
  })
}
//个人批次下已提交订单信息
const  getSubOrderListById=(params)=> {
  return request({
    url: '/union-web/orderManagementAction.do?method=getSubOrderListById',
    method: 'get',
    params   
  })
}
//获取订单数量
const  getDdCount=(params)=> {
  return request({
    url: '/union-web/orderManagementAction.do?method=getDdCount',
    method: 'get',
    params   
  })
}
  //获取订单数量
  const  subOrders=(params)=> {
    return request({
      url: '/union-web/tsglAction.do?method=submitOrder',
      method: 'get',
      params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }       
    })
  }

  //添加评论
 
  const  subReviewInfo=(params)=> {
    return request({
      url: '/union-web/reviewManagementAction.do?method=subReviewInfo',
      method: 'get',
      params   
    })
  }
  // 添加订单数量
  const  updDdsl=(params)=> {
    return request({
      url: '/union-web/tsglAction.do?method=updDdsl',
      method: 'get',
      params   
    })
  }
    // 删除订单数量
    
    const  delOrderInfos=(params)=> {
      return request({
        url: '/union-web/orderManagementAction.do?method=delOrderInfos',
        method: 'get',
        params,
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }       
      })
    }








// development

// //个人批次下待提交订单信息（查询）
// const  getUnSubOrderListById=(params)=> {
//     return request({
//       url: '/api/orderManagementAction.do?method=getUnSubOrderListById',
//       method: 'get',
//       params   
//     })
//   }
//   //个人批次下已提交订单信息
//   const  getSubOrderListById=(params)=> {
//     return request({
//       url: '/api/orderManagementAction.do?method=getSubOrderListById',
//       method: 'get',
//       params   
//     })
//   }
//   //获取订单数量
//   const  getDdCount=(params)=> {
//     return request({
//       url: '/api/orderManagementAction.do?method=getDdCount',
//       method: 'get',
//       params   
//     })
//   }
//     //获取订单数量
//     const  subOrders=(params)=> {
//       return request({
//         url: '/api/tsglAction.do?method=submitOrder',
//         method: 'get',
//         params,
//         paramsSerializer: params => {
//           return qs.stringify(params, { indices: false })
//         }       
//       })
//     }
  
//     //添加评论
   
//     const  subReviewInfo=(params)=> {
//       return request({
//         url: '/api/reviewManagementAction.do?method=subReviewInfo',
//         method: 'get',
//         params   
//       })
//     }
//     // 添加订单数量
//     const  updDdsl=(params)=> {
//       return request({
//         url: '/api/tsglAction.do?method=updDdsl',
//         method: 'get',
//         params   
//       })
//     }
//     //删除订单数量
    
//     const  delOrderInfos=(params)=> {
//       return request({
//         url: '/api/orderManagementAction.do?method=delOrderInfos',
//         method: 'get',
//         params,
//         paramsSerializer: params => {
//           return qs.stringify(params, { indices: false })
//         }       
//       })
//     }
    
export {
  getUnSubOrderListById,
  getSubOrderListById,
  getDdCount,
  subOrders,
  subReviewInfo,
  updDdsl,
  delOrderInfos
}
