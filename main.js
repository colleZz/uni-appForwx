import App from './App'

// #ifndef VUE3
import Vue from 'vue'

//导入网络请求的包
import {$http} from '@escook/request-miniprogram'

uni.$http =$http

//注册组件
// import my_search from './components/my_search/my_search.vue'
// Vue.component('my_search',my_search)
//设置请求的根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function(options){
}
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  // do something...

}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif