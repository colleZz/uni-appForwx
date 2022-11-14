<template>
	<view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		methods:{
			// 点击了结算按钮
			settlement() {
			  // 1. 先判断是否勾选了要结算的商品
			  if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
			
			  // 2. 再判断用户是否选择了收货地址
			  if (!this.addstr) return uni.$showMsg('请选择收货地址！')
			
			  // 3. 最后判断用户是否登录了
			  if (!this.token) return uni.$showMsg('请先登录！')
			}
		}
	}
</script>

<style lang="scss">

</style>