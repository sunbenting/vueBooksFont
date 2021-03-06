import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Accept':'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  timeout: 5000 ,// request timeout
  dataType: 'json'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.data = qs.stringify(config.data);
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // // do something with request error
    // console.log(error,11) // for debug
    // return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
 
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      return  res
     
    } else {
      return  res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service


