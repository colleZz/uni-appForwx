<template>
  <view>
	<view class="goods-list">
	  <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
		<!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
		<my-goods :goods="item"></my-goods>
	  </view>
</view>
  </view>
</template>

<script>
	export default {

		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				// 请求参数对象
				queryObj: {
				  // 查询关键词
				  query: '',
				  // 商品分类Id
				  cid: '',
				  // 页码值
				  pagenum: 1,
				  // 每页显示多少条数据
				  pagesize: 10,
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0,
				isloading:false
			};
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
		  // 1. 重置关键数据
		  this.queryObj.pagenum = 1
		  this.total = 0
		  this.isloading = false
		  this.goodsList = []
		  // 2. 重新发起请求
		  this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		  // 触底的事件
		  onReachBottom() {
			// 判断是否还有下一页数据
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
		    // 判断是否正在请求其它数据，如果是，则不发起额外的请求
		    if (this.isloading) return
		    this.queryObj.pagenum += 1
		    this.getGoodsList()
		  },
		onLoad(options) {
		  // 将页面参数转存到 this.queryObj 对象中
		  this.queryObj.query = options.query || ''
		  this.queryObj.cid = options.cid || ''
		  // 调用获取商品列表数据的方法
		  this.getGoodsList()
		},
		methods: {
		  // 获取商品列表数据的方法
		  async getGoodsList(cb) {
			  // 打开节流阀
			  this.isloading=true
			  // 发起请求
			  const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
			  //关闭节流阀
			  this.isloading=false
			  cb&&cb()
			  if (res.meta.status !== 200) return uni.$showMsg()
			  // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
			  this.goodsList = [...this.goodsList, ...res.message.goods]
			  this.total = res.message.total
		  },
		  gotoDetail(item){
			  uni.navigateTo({
				   url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			  })
		  }

		}
	}
</script>

<style lang="scss">

</style>
