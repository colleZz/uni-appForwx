
<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
	  <swiper-item v-for="(item, i) in swiperList" :key="i">
	    <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
	  	<!-- 动态绑定图片的 src 属性 -->
	  	<image :src="item.image_src"></image>
	    </navigator>
	  </swiper-item>
    </swiper>
	<view class="nav-list">
		<!-- 分类导航 -->
		  <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
			  <image :src="item.image_src" class="nav_img"></image>
		  </view>
	</view>
	<!-- 楼层区域 -->
	<view class="floor-list">
	  <!-- 楼层 item 项 -->
	  <view class="floor-item" v-for="(item, i) in floorList" :key="i">
	    <!-- 楼层标题 -->
	    <image :src="item.floor_title.image_src" class="floor-title"></image>
			<!-- 楼层图片区域 -->
			<view class="floor-img-box">
			  <!-- 左侧大图片的盒子 -->
			  <view class="left-img-box">
				<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
			  </view>
			  <!-- 右侧 4 个小图片的盒子 -->
			  <view class="right-img-box">
				<view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
				  <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
				</view>
			  </view>
			</view>
	  </view>
	</view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图的数据列表
				swiperList:[],
				//分类导航
				navList:[],
				//楼层数据列表
				floorList:[]
			};
		},
		//页面加载时所调用的方法
		onLoad(){
			//调用获取轮播图方法 
			this.getSwiperList(),
			//调用获取分类导航的方法
			this.getNavList(),
			//调用获取楼层数据的方法
			this.getFloorList()
		},
		methods:{
			//发起请求，async，await？   const结构花括号，以key：value方式赋值	 
			async getSwiperList(){
				const { data: res }=await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(data)
				console.log(res)
				//请求失败
				if (res.meta.status !== 200)return uni.$showMsg()
				this.swiperList=res.message
			},
			//发起请求：获取分类导航
			async getNavList(){
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
				console.log(res)
			},
			//点击事件
			navClickHandler(item){
				// console.log(item)
				if(item.name=="分类")
					uni.switchTab({
					  url: '/pages/cate/cate'
					})
			},
			async getFloorList(){
				const { data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				console.log(res)
				this.floorList = res.message
			}
		}
	}
</script>
<style lang="scss">

swiper {
 height: 330rpx;

 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
}
 .nav-list {
   display: flex;
   justify-content: space-around;
   margin: 15px 0;
   .nav_img {
     width: 128rpx;
     height: 140rpx;
   }
 }
 .floor-title {
   height: 60rpx;
   width: 100%;
   display: flex;
 }
 .right-img-box {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
 }
 .floor-img-box {
   display: flex;
   padding-left: 10rpx;
 }
</style>
